var _excluded = ["parsed", "timestamp"];
function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var FALLBACK_STRONG_SEARCH_MATCH_TYPES = new Set(['exactKey', 'keyPrefix', 'keySubset']);
if (typeof globalThis !== 'undefined' && typeof globalThis.STRONG_SEARCH_MATCH_TYPES === 'undefined') {
  globalThis.STRONG_SEARCH_MATCH_TYPES = FALLBACK_STRONG_SEARCH_MATCH_TYPES;
}
var FORCE_RELOAD_OFFLINE_NOTICE_FALLBACK = 'Force reload requires an internet connection. Try again once you are back online.';
function getSessionCloneScope() {
  if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE) {
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
function resolveSessionRuntimeFunction(name) {
  if (typeof name !== 'string' || !name) {
    return null;
  }
  var candidates = [];
  var seen = new Set();
  var enqueue = function enqueue(scope) {
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      return;
    }
    if (seen.has(scope)) {
      return;
    }
    seen.add(scope);
    candidates.push(scope);
  };
  try {
    enqueue(typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : null);
  } catch (_unused) {}
  try {
    enqueue(typeof globalThis !== 'undefined' ? globalThis : null);
  } catch (_unused2) {}
  try {
    enqueue(typeof window !== 'undefined' ? window : null);
  } catch (_unused3) {}
  try {
    enqueue(typeof self !== 'undefined' ? self : null);
  } catch (_unused4) {}
  try {
    enqueue(typeof global !== 'undefined' ? global : null);
  } catch (_unused5) {}
  for (var index = 0; index < candidates.length; index += 1) {
    var scope = candidates[index];
    if (!scope) {
      continue;
    }
    try {
      var directCandidate = scope[name];
      if (typeof directCandidate === 'function') {
        return directCandidate;
      }
    } catch (directError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('resolveSessionRuntimeFunction: failed to read candidate from scope', name, directError);
      }
    }
    try {
      var nestedScope = scope.CORE_GLOBAL_SCOPE || scope.core || scope.__cineRuntimeState;
      if (nestedScope && !seen.has(nestedScope)) {
        enqueue(nestedScope);
        var nestedCandidate = nestedScope[name];
        if (typeof nestedCandidate === 'function') {
          return nestedCandidate;
        }
      }
    } catch (nestedError) {
      if (typeof console !== 'undefined' && typeof console.debug === 'function') {
        console.debug('resolveSessionRuntimeFunction: nested scope probe failed', name, nestedError);
      }
    }
  }
  return null;
}
function isNavigatorExplicitlyOffline(navigatorLike) {
  if (!navigatorLike || _typeof(navigatorLike) !== 'object') {
    return false;
  }
  if (typeof navigatorLike.onLine !== 'boolean') {
    return false;
  }
  return navigatorLike.onLine === false;
}
function resolveForceReloadOfflineNotice() {
  var notice = '';
  if (typeof document !== 'undefined' && document && typeof document.getElementById === 'function') {
    var indicator = document.getElementById('offlineIndicator');
    if (indicator) {
      var dataset = indicator.dataset || {};
      var dataNotice = typeof dataset.forceReloadNotice === 'string' && dataset.forceReloadNotice.trim() ? dataset.forceReloadNotice.trim() : null;
      var dataHelp = typeof dataset.reloadNotice === 'string' && dataset.reloadNotice.trim() ? dataset.reloadNotice.trim() : null;
      var helpAttr = typeof indicator.getAttribute === 'function' ? indicator.getAttribute('data-help') : null;
      var helpAttrNormalized = typeof helpAttr === 'string' && helpAttr.trim() ? helpAttr.trim() : null;
      var textContent = typeof indicator.textContent === 'string' && indicator.textContent.trim() ? indicator.textContent.trim() : null;
      notice = dataNotice || dataHelp || helpAttrNormalized || textContent || '';
      if (!notice) {
        var baseLabel = typeof dataset.baseLabel === 'string' && dataset.baseLabel.trim() ? dataset.baseLabel.trim() : null;
        if (baseLabel) {
          notice = baseLabel;
        }
      }
      if (notice) {
        return notice;
      }
    }
  }
  var resolveLocale = resolveSessionRuntimeFunction('resolveLocaleString');
  if (typeof resolveLocale === 'function') {
    try {
      var localized = resolveLocale('reloadAppOfflineNotice');
      if (typeof localized === 'string' && localized.trim()) {
        return localized.trim();
      }
    } catch (localeError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('resolveForceReloadOfflineNotice: failed to resolve locale string', localeError);
      }
    }
  }
  return FORCE_RELOAD_OFFLINE_NOTICE_FALLBACK;
}
function announceForceReloadOfflineNotice() {
  var notice = resolveForceReloadOfflineNotice();
  var handled = false;
  if (typeof document !== 'undefined' && document && typeof document.getElementById === 'function') {
    var indicator = document.getElementById('offlineIndicator');
    if (indicator) {
      handled = true;
      if (indicator.dataset) {
        indicator.dataset.forceReloadNotice = notice;
        indicator.dataset.reloadNotice = notice;
      }
      if (typeof indicator.setAttribute === 'function') {
        indicator.setAttribute('data-help', notice);
        indicator.setAttribute('role', 'status');
        indicator.setAttribute('aria-live', 'polite');
      }
      if (typeof indicator.removeAttribute === 'function') {
        indicator.removeAttribute('hidden');
      }
      if (typeof indicator.textContent === 'string' || _typeof(indicator.textContent) === 'object') {
        indicator.textContent = notice;
      }
    }
  }
  if (!handled && typeof window !== 'undefined' && typeof window.alert === 'function') {
    try {
      window.alert(notice);
    } catch (alertError) {
      void alertError;
    }
  }
}
try {
  if (typeof globalThis !== 'undefined' && globalThis) {
    if (typeof globalThis.announceForceReloadOfflineNotice !== 'function') {
      globalThis.announceForceReloadOfflineNotice = announceForceReloadOfflineNotice;
    }
  }
} catch (exposeError) {
  void exposeError;
}
function safeGetCurrentProjectName() {
  var defaultValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var resolver = resolveSessionRuntimeFunction('getCurrentProjectName');
  if (typeof resolver !== 'function') {
    return defaultValue;
  }
  try {
    var resolved = resolver();
    if (typeof resolved === 'string' && resolved.trim()) {
      return resolved;
    }
  } catch (projectNameError) {
    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      console.warn('safeGetCurrentProjectName: runtime call failed, using fallback', projectNameError);
    }
  }
  return defaultValue;
}
function resolveSetLanguageFn() {
  return resolveSessionRuntimeFunction('setLanguage');
}
function applySetLanguage(languageCode) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var setLanguageFn = resolveSetLanguageFn();
  if (typeof setLanguageFn !== 'function') {
    if (!(options !== null && options !== void 0 && options.silent) && typeof console !== 'undefined' && typeof console.warn === 'function') {
      console.warn('applySetLanguage: setLanguage runtime function not available');
    }
    return false;
  }
  try {
    setLanguageFn(languageCode);
    return true;
  } catch (setLanguageError) {
    if (!(options !== null && options !== void 0 && options.silent) && typeof console !== 'undefined' && typeof console.error === 'function') {
      console.error('applySetLanguage: setLanguage execution failed', setLanguageError);
    }
    return false;
  }
}
function sessionJsonDeepClone(value) {
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
function sessionResolveStructuredClone(scope) {
  if (typeof structuredClone === 'function') {
    return structuredClone;
  }
  if (scope && typeof scope.structuredClone === 'function') {
    try {
      return scope.structuredClone.bind(scope);
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
function sessionCreateResilientDeepClone(scope) {
  var structuredCloneImpl = sessionResolveStructuredClone(scope);
  if (!structuredCloneImpl) {
    return sessionJsonDeepClone;
  }
  return function sessionResilientDeepClone(value) {
    if (value === null || _typeof(value) !== 'object') {
      return value;
    }
    try {
      return structuredCloneImpl(value);
    } catch (structuredCloneError) {
      void structuredCloneError;
    }
    return sessionJsonDeepClone(value);
  };
}
var sensorModeDropdown;
var recordingResolutionDropdown;
var slowMotionSensorModeDropdown;
var slowMotionRecordingResolutionDropdown;
var slowMotionAspectRatioSelect;
var slowMotionRecordingFrameRateInput;
var slowMotionRecordingFrameRateHint;
var slowMotionRecordingFrameRateOptionsList;
var SESSION_DEEP_CLONE = CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE.__cineDeepClone === 'function' ? CORE_GLOBAL_SCOPE.__cineDeepClone : sessionCreateResilientDeepClone(getSessionCloneScope());
if (CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE.__cineDeepClone !== 'function') {
  try {
    CORE_GLOBAL_SCOPE.__cineDeepClone = SESSION_DEEP_CLONE;
  } catch (sessionDeepCloneError) {
    void sessionDeepCloneError;
  }
}
var missingMountVoltageWarnings = null;
function resolveMissingMountVoltageWarnings() {
  if (missingMountVoltageWarnings instanceof Set) {
    return missingMountVoltageWarnings;
  }
  var candidateScopes = [typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && (typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object' ? CORE_GLOBAL_SCOPE : null, typeof globalThis !== 'undefined' && (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object' ? globalThis : null, typeof window !== 'undefined' && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' ? window : null, typeof self !== 'undefined' && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object' ? self : null, typeof global !== 'undefined' && (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object' ? global : null].filter(Boolean);
  for (var index = 0; index < candidateScopes.length; index += 1) {
    var scope = candidateScopes[index];
    try {
      var existing = scope.__cineMissingMountVoltageWarnings;
      if (existing instanceof Set) {
        missingMountVoltageWarnings = existing;
        return existing;
      }
    } catch (readError) {
      void readError;
    }
  }
  var created = new Set();
  for (var _index = 0; _index < candidateScopes.length; _index += 1) {
    var _scope = candidateScopes[_index];
    try {
      _scope.__cineMissingMountVoltageWarnings = created;
      break;
    } catch (assignError) {
      void assignError;
    }
  }
  missingMountVoltageWarnings = created;
  return created;
}
function warnMissingMountVoltageHelper(helperName, error) {
  var warnings = resolveMissingMountVoltageWarnings();
  var key = typeof helperName === 'string' && helperName ? helperName : 'unknown';
  if (warnings.has(key)) {
    return;
  }
  warnings.add(key);
  if (typeof console !== 'undefined' && typeof console.warn === 'function') {
    var message = "Mount voltage helper \"".concat(key, "\" is unavailable; using defaults to protect user data.");
    if (error) {
      console.warn(message, error);
    } else {
      console.warn(message);
    }
  }
}
function ensureSessionRuntimePlaceholder(name, fallbackValue) {
  var scope = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
  var fallbackProvider = typeof fallbackValue === 'function' ? fallbackValue : function () {
    return fallbackValue;
  };
  if (!scope || _typeof(scope) !== 'object') {
    return fallbackProvider();
  }
  try {
    if (typeof scope[name] === 'undefined') {
      scope[name] = fallbackProvider();
    }
    return scope[name];
  } catch (placeholderError) {
    void placeholderError;
    return fallbackProvider();
  }
}
function detectPrimaryGlobalScope() {
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
function whenGlobalValueAvailable(name, validator, onResolve) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  if (typeof name !== 'string' || !name) {
    return false;
  }
  if (typeof validator !== 'function' || typeof onResolve !== 'function') {
    return false;
  }
  var scope = detectPrimaryGlobalScope();
  if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
    return false;
  }
  var attemptsLimit = typeof options.maxAttempts === 'number' ? options.maxAttempts : 150;
  var continueIndefinitely = attemptsLimit < 0;
  var interval = typeof options.interval === 'number' && options.interval > 0 ? options.interval : 200;
  var invokeResolve = function invokeResolve(value) {
    try {
      onResolve(value);
    } catch (handlerError) {
      if (typeof console !== 'undefined' && console && typeof console.error === 'function') {
        console.error("whenGlobalValueAvailable: handler for ".concat(name, " threw."), handlerError);
      }
    }
  };
  var attempt = function attempt(value) {
    if (!validator(value)) {
      return false;
    }
    invokeResolve(value);
    return true;
  };
  var initialCandidate = function () {
    try {
      return scope[name];
    } catch (accessError) {
      if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
        console.warn("whenGlobalValueAvailable: unable to read ".concat(name, " during initial attempt."), accessError);
      }
      return undefined;
    }
  }();
  if (attempt(initialCandidate)) {
    return true;
  }
  var attempts = 0;
  var cancelled = false;
  var timers = [];
  var clearTimers = function clearTimers() {
    cancelled = true;
    for (var index = 0; index < timers.length; index += 1) {
      try {
        clearTimeout(timers[index]);
      } catch (clearError) {
        void clearError;
      }
    }
    timers.length = 0;
  };
  var handleTimeout = function handleTimeout() {
    if (typeof options.onTimeout === 'function') {
      try {
        options.onTimeout();
      } catch (timeoutError) {
        if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
          console.warn("whenGlobalValueAvailable: timeout handler for ".concat(name, " failed."), timeoutError);
        }
      }
    }
  };
  var _poll = function poll() {
    if (cancelled) {
      return;
    }
    attempts += 1;
    var candidate = undefined;
    try {
      candidate = scope[name];
    } catch (accessError) {
      if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
        console.warn("whenGlobalValueAvailable: unable to read ".concat(name, " during polling."), accessError);
      }
      candidate = undefined;
    }
    if (attempt(candidate)) {
      clearTimers();
      return;
    }
    if (!continueIndefinitely && attempts >= attemptsLimit) {
      clearTimers();
      handleTimeout();
      return;
    }
    var handle = setTimeout(_poll, interval);
    timers.push(handle);
  };
  var initialHandle = setTimeout(_poll, interval);
  timers.push(initialHandle);
  return true;
}
function getSessionRuntimeScopes() {
  var scopes = [];
  var addScope = function addScope(candidate) {
    if (!candidate || _typeof(candidate) !== 'object') {
      return;
    }
    if (scopes.indexOf(candidate) === -1) {
      scopes.push(candidate);
    }
  };
  try {
    if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE) {
      addScope(CORE_GLOBAL_SCOPE);
    }
  } catch (coreScopeError) {
    void coreScopeError;
  }
  addScope(typeof globalThis !== 'undefined' ? globalThis : null);
  addScope(typeof window !== 'undefined' ? window : null);
  addScope(typeof self !== 'undefined' ? self : null);
  addScope(typeof global !== 'undefined' ? global : null);
  return scopes;
}
function resolveModuleApi(name, validator) {
  if (typeof name !== 'string' || !name) {
    return null;
  }
  var validate = typeof validator === 'function' ? validator : function (value) {
    return !!value;
  };
  var seen = new Set();
  var queue = [];
  var enqueueScope = function enqueueScope(candidate) {
    if (!candidate || _typeof(candidate) !== 'object' && typeof candidate !== 'function') {
      return;
    }
    if (seen.has(candidate)) {
      return;
    }
    seen.add(candidate);
    queue.push(candidate);
  };
  var nestedKeys = ['CORE_SHARED', 'CORE_GLOBAL_SCOPE', 'CORE_AGGREGATED_EXPORTS', 'CORE_RUNTIME_SCOPE', 'CORE_PART2_RUNTIME_SCOPE', 'CORE_SCOPE', 'CORE_SHARED_SCOPE_PART2', 'cine', 'cineGlobals', 'cineModuleGlobals', 'cineModuleBase', 'cineModuleContext', 'cineRuntime', 'cinePersistence', 'cineOffline', 'cineUi', 'APP', 'app', '__cineGlobal', '__cineScope', '__cineModules', '__cineExports', '__cineRuntime'];
  var checkCandidate = function checkCandidate(candidate) {
    if (!candidate) {
      return null;
    }
    try {
      if (validate(candidate)) {
        return candidate;
      }
    } catch (validationError) {
      void validationError;
    }
    return null;
  };
  var tryResolveFromScope = function tryResolveFromScope(scope) {
    var directCandidate;
    try {
      directCandidate = scope[name];
    } catch (directError) {
      void directError;
      directCandidate = undefined;
    }
    var validatedDirect = checkCandidate(directCandidate);
    if (validatedDirect) {
      return validatedDirect;
    }
    var moduleGlobals;
    try {
      moduleGlobals = scope.cineModuleGlobals;
    } catch (globalsError) {
      void globalsError;
      moduleGlobals = null;
    }
    if (moduleGlobals && typeof moduleGlobals.getModule === 'function') {
      try {
        var viaGlobals = moduleGlobals.getModule(name);
        var validatedGlobal = checkCandidate(viaGlobals);
        if (validatedGlobal) {
          return validatedGlobal;
        }
      } catch (globalLookupError) {
        void globalLookupError;
      }
    }
    var registry;
    try {
      registry = scope.cineModules;
    } catch (registryError) {
      void registryError;
      registry = null;
    }
    if (registry && typeof registry.get === 'function') {
      try {
        var viaRegistry = registry.get(name);
        var validatedRegistry = checkCandidate(viaRegistry);
        if (validatedRegistry) {
          return validatedRegistry;
        }
      } catch (registryLookupError) {
        void registryLookupError;
      }
    }
    return null;
  };
  enqueueScope(detectPrimaryGlobalScope());
  var runtimeScopes = getSessionRuntimeScopes();
  for (var index = 0; index < runtimeScopes.length; index += 1) {
    enqueueScope(runtimeScopes[index]);
  }
  while (queue.length) {
    var scope = queue.shift();
    if (!scope) {
      continue;
    }
    var resolved = tryResolveFromScope(scope);
    if (resolved) {
      return resolved;
    }
    for (var _index2 = 0; _index2 < nestedKeys.length; _index2 += 1) {
      var key = nestedKeys[_index2];
      var nested = void 0;
      try {
        nested = scope[key];
      } catch (nestedError) {
        void nestedError;
        nested = undefined;
      }
      if (nested) {
        enqueueScope(nested);
      }
    }
  }
  return null;
}
function normalizeVersionValue(value) {
  if (typeof value !== 'string') {
    return null;
  }
  var trimmed = value.trim();
  return trimmed ? trimmed : null;
}
function resolveKnownAppVersion(explicitVersion) {
  var normalizedExplicit = normalizeVersionValue(explicitVersion);
  if (normalizedExplicit) {
    return normalizedExplicit;
  }
  try {
    if (typeof APP_VERSION === 'string') {
      var normalized = normalizeVersionValue(APP_VERSION);
      if (normalized) {
        return normalized;
      }
    }
  } catch (appVersionError) {
    void appVersionError;
  }
  var seen = new Set();
  var queue = [];
  var enqueueCandidate = function enqueueCandidate(value) {
    if (!value) {
      return;
    }
    var type = _typeof(value);
    if (type !== 'object' && type !== 'function') {
      return;
    }
    if (seen.has(value)) {
      return;
    }
    seen.add(value);
    queue.push(value);
  };
  var scopes = getSessionRuntimeScopes();
  for (var index = 0; index < scopes.length; index += 1) {
    enqueueCandidate(scopes[index]);
  }
  try {
    if (typeof CORE_SHARED !== 'undefined' && CORE_SHARED) {
      enqueueCandidate(CORE_SHARED);
    }
  } catch (coreSharedError) {
    void coreSharedError;
  }
  try {
    if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE) {
      enqueueCandidate(CORE_GLOBAL_SCOPE);
    }
  } catch (coreGlobalError) {
    void coreGlobalError;
  }
  var versionKeys = ['APP_VERSION', 'appVersion', 'applicationVersion', 'version'];
  var nestedKeys = ['CORE_SHARED', 'CORE_GLOBAL_SCOPE', 'CORE_AGGREGATED_EXPORTS', 'CORE_RUNTIME_SCOPE', 'CORE_PART2_RUNTIME_SCOPE', 'CORE_SCOPE', 'CORE_SHARED_SCOPE_PART2', 'cineCoreShared', 'cineModules', 'cineModuleGlobals', 'cineModuleBase', 'cineModuleContext', 'cineRuntime', 'cinePersistence', 'cineOffline', 'cineUi', 'cineGlobals', 'cine', 'APP', 'app', 'globalScope', 'scope', 'exports', 'module', 'modules', 'environment', 'context', 'runtime', 'shared', 'globals', '__cineGlobal', '__cineScope', '__cineModules', '__cineExports', '__cineRuntime', 'details', 'meta', 'metadata', 'build', 'buildInfo'];
  while (queue.length) {
    var candidate = queue.shift();
    if (!candidate) {
      continue;
    }
    for (var _index3 = 0; _index3 < versionKeys.length; _index3 += 1) {
      var key = versionKeys[_index3];
      var value = void 0;
      try {
        value = candidate[key];
      } catch (readError) {
        value = undefined;
        void readError;
      }
      var _normalized = normalizeVersionValue(value);
      if (_normalized) {
        return _normalized;
      }
    }
    for (var _index4 = 0; _index4 < nestedKeys.length; _index4 += 1) {
      var nestedKey = nestedKeys[_index4];
      var nestedValue = void 0;
      try {
        nestedValue = candidate[nestedKey];
      } catch (nestedError) {
        nestedValue = null;
        void nestedError;
      }
      enqueueCandidate(nestedValue);
    }
    var keys = [];
    try {
      keys = Object.keys(candidate);
    } catch (keysError) {
      keys = [];
      void keysError;
    }
    var limitedKeys = keys.length > 50 ? keys.slice(0, 50) : keys;
    for (var _index5 = 0; _index5 < limitedKeys.length; _index5 += 1) {
      var _key = limitedKeys[_index5];
      if (!/(version|core|cine|shared|global|app)/i.test(_key)) {
        continue;
      }
      var nested = void 0;
      try {
        nested = candidate[_key];
      } catch (valueError) {
        nested = null;
        void valueError;
      }
      enqueueCandidate(nested);
    }
  }
  return null;
}
var ACTIVE_APP_VERSION = resolveKnownAppVersion(typeof APP_VERSION === 'string' ? APP_VERSION : null);
function resolveMountVoltageNamespace() {
  var scopes = getSessionRuntimeScopes();
  for (var index = 0; index < scopes.length; index += 1) {
    var scope = scopes[index];
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      continue;
    }
    try {
      var namespace = scope.cineCoreMountVoltage;
      if (namespace && _typeof(namespace) === 'object') {
        return namespace;
      }
    } catch (resolveError) {
      void resolveError;
    }
  }
  return null;
}
function resolveMountVoltageRuntimeExports() {
  var scopes = getSessionRuntimeScopes();
  for (var index = 0; index < scopes.length; index += 1) {
    var scope = scopes[index];
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      continue;
    }
    try {
      var exports = scope.MOUNT_VOLTAGE_RUNTIME_EXPORTS;
      if (exports && _typeof(exports) === 'object') {
        return exports;
      }
    } catch (resolveError) {
      void resolveError;
    }
  }
  return null;
}
function getSessionRuntimeFunction(name) {
  if (typeof name !== 'string' || !name) {
    return null;
  }
  var mountNamespace = resolveMountVoltageNamespace();
  if (mountNamespace && typeof mountNamespace[name] === 'function') {
    return mountNamespace[name];
  }
  var mountRuntimeExports = resolveMountVoltageRuntimeExports();
  if (mountRuntimeExports && typeof mountRuntimeExports[name] === 'function') {
    return mountRuntimeExports[name];
  }
  var scopes = getSessionRuntimeScopes();
  for (var index = 0; index < scopes.length; index += 1) {
    var scope = scopes[index];
    var candidate = null;
    try {
      candidate = scope[name];
    } catch (resolveError) {
      candidate = null;
      void resolveError;
    }
    if (typeof candidate === 'function') {
      return candidate;
    }
  }
  return null;
}
function resolveSettingsLoggingResolver() {
  if (typeof require === 'function') {
    try {
      var required = require('./modules/logging-resolver.js');
      if (required && typeof required.resolveLogger === 'function') {
        return required;
      }
    } catch (error) {
      void error;
    }
  }
  var scopes = getSessionRuntimeScopes();
  for (var index = 0; index < scopes.length; index += 1) {
    var scope = scopes[index];
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      continue;
    }
    try {
      var resolver = scope.cineLoggingResolver;
      if (resolver && typeof resolver.resolveLogger === 'function') {
        return resolver;
      }
    } catch (resolveError) {
      void resolveError;
    }
  }
  return null;
}
function resolveLegacySettingsLogger() {
  var scopes = getSessionRuntimeScopes();
  for (var index = 0; index < scopes.length; index += 1) {
    var scope = scopes[index];
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      continue;
    }
    try {
      var logging = scope.cineLogging;
      if (logging && typeof logging.createLogger === 'function') {
        try {
          return logging.createLogger('settings', {
            meta: {
              source: 'app-session'
            }
          });
        } catch (creationError) {
          try {
            if (typeof logging.error === 'function') {
              logging.error('Failed to create settings logger', creationError, {
                namespace: 'settings-bootstrap'
              });
            }
          } catch (logError) {
            void logError;
          }
        }
      }
    } catch (resolveError) {
      void resolveError;
    }
  }
  return null;
}
var settingsLogger = function () {
  var resolver = resolveSettingsLoggingResolver();
  if (resolver && typeof resolver.resolveLogger === 'function') {
    try {
      var logger = resolver.resolveLogger('settings', {
        meta: {
          source: 'app-session'
        }
      });
      if (logger) {
        return logger;
      }
    } catch (resolverError) {
      void resolverError;
    }
  }
  return resolveLegacySettingsLogger();
}();
function logSettingsEvent(level, message, detail, meta) {
  var normalizedLevel = typeof level === 'string' && level ? level.toLowerCase() : 'info';
  var handled = false;
  if (settingsLogger && typeof settingsLogger[normalizedLevel] === 'function') {
    try {
      settingsLogger[normalizedLevel](message, detail, meta);
      handled = true;
    } catch (loggingError) {
      handled = false;
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Settings logger invocation failed', loggingError);
      }
    }
  }
  if (handled || typeof console === 'undefined' || !console) {
    return;
  }
  var fallback = null;
  if (normalizedLevel === 'error' && typeof console.error === 'function') {
    fallback = console.error;
  } else if (normalizedLevel === 'warn' && typeof console.warn === 'function') {
    fallback = console.warn;
  } else if (typeof console.info === 'function') {
    fallback = console.info;
  } else if (typeof console.log === 'function') {
    fallback = console.log;
  }
  if (typeof fallback === 'function') {
    try {
      fallback.call(console, "[settings] ".concat(message), detail || null, meta || null);
    } catch (consoleError) {
      void consoleError;
    }
  }
}
var pendingSettingsOpenContext = null;
function prepareSettingsOpenContext(context) {
  if (context && _typeof(context) === 'object') {
    pendingSettingsOpenContext = _objectSpread({}, context);
  } else {
    pendingSettingsOpenContext = null;
  }
}
function consumeSettingsOpenContext(defaultContext) {
  var context = pendingSettingsOpenContext;
  pendingSettingsOpenContext = null;
  if (context && _typeof(context) === 'object') {
    return _objectSpread({}, context);
  }
  if (defaultContext && _typeof(defaultContext) === 'object') {
    return _objectSpread({}, defaultContext);
  }
  return {
    reason: 'settings-button'
  };
}
function resolveSettingsDialog() {
  if (typeof settingsDialog !== 'undefined' && settingsDialog) {
    return settingsDialog;
  }
  if (typeof document !== 'undefined' && document) {
    try {
      return document.getElementById('settingsDialog');
    } catch (resolveError) {
      void resolveError;
    }
  }
  return null;
}
function resolveSettingsButton() {
  if (typeof settingsButton !== 'undefined' && settingsButton) {
    return settingsButton;
  }
  if (typeof document !== 'undefined' && document) {
    try {
      return document.getElementById('settingsButton');
    } catch (resolveError) {
      void resolveError;
    }
  }
  return null;
}
function ensureDeferredScriptsLoaded(reason) {
  var scope = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
  if (!scope) return null;
  var result = null;
  try {
    if (typeof scope.cineEnsureDeferredScriptsLoaded === 'function') {
      result = scope.cineEnsureDeferredScriptsLoaded({
        reason: reason
      });
    }
  } catch (ensureError) {
    void ensureError;
    result = null;
  }
  if (!result) {
    try {
      result = scope.cineDeferredScriptsReady;
    } catch (readError) {
      void readError;
      result = null;
    }
  }
  return result;
}
function ensureOnboardingTourReady(reason) {
  var scope = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
  if (!scope) {
    return null;
  }
  var loader = null;
  try {
    if (typeof scope.cineEnsureOnboardingTourLoaded === 'function') {
      loader = scope.cineEnsureOnboardingTourLoaded(reason);
    }
  } catch (error) {
    void error;
    loader = null;
  }
  if (loader && typeof loader.then === 'function') {
    loader.catch(function (loadError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Onboarding tour module failed to pre-load for help interactions.', loadError);
      }
    });
  }
  return loader;
}
function requestSettingsOpen(context) {
  var dialog = resolveSettingsDialog();
  var trigger = resolveSettingsButton();
  var openBefore = dialog ? typeof isDialogOpen === 'function' ? isDialogOpen(dialog) : !!(dialog && dialog.open) : false;
  var detail = context && _typeof(context) === 'object' ? _objectSpread({}, context) : {};
  if (typeof detail.openBefore !== 'boolean') {
    detail.openBefore = openBefore;
  }
  ensureDeferredScriptsLoaded('settings-open');
  if (trigger && typeof trigger.click === 'function') {
    prepareSettingsOpenContext(detail);
    try {
      trigger.click();
    } catch (clickError) {
      prepareSettingsOpenContext(null);
      logSettingsEvent('error', 'Settings dialog open request failed during click', _objectSpread(_objectSpread({}, detail), {}, {
        buttonAvailable: true
      }), {
        action: 'open-request'
      });
      throw clickError;
    }
    return true;
  }
  logSettingsEvent('warn', 'Settings dialog open request unavailable', _objectSpread(_objectSpread({}, detail), {}, {
    buttonAvailable: false
  }), {
    action: 'open-request'
  });
  return false;
}
function resolveCompatibilityTexts(langTexts, fallbackTexts) {
  var translations = (typeof texts === "undefined" ? "undefined" : _typeof(texts)) === 'object' && texts ? texts : {};
  var resolvedFallback = fallbackTexts || translations.en || {};
  var lang = typeof currentLang === 'string' && translations[currentLang] ? currentLang : 'en';
  var resolvedLang = langTexts || translations[lang] || resolvedFallback;
  return {
    lang: lang,
    langTexts: resolvedLang,
    fallbackTexts: resolvedFallback
  };
}
function ensureMeaningfulValue(value) {
  if (value === null || value === undefined) {
    return false;
  }
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return true;
  }
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  if (_typeof(value) === 'object') {
    return Object.keys(value).length > 0;
  }
  return false;
}
var formatNumberForComparison = ensureSessionRuntimePlaceholder('formatNumberForComparison', function () {
  var formatterCache = new Map();
  var getFormatter = function getFormatter(lang, hasFraction) {
    var cacheKey = "".concat(lang, "|").concat(hasFraction ? 'fraction' : 'integer');
    if (formatterCache.has(cacheKey)) {
      return formatterCache.get(cacheKey);
    }
    if (typeof Intl !== 'undefined' && typeof Intl.NumberFormat === 'function') {
      try {
        var formatter = new Intl.NumberFormat(lang, {
          maximumFractionDigits: hasFraction ? 2 : 0
        });
        formatterCache.set(cacheKey, formatter);
        return formatter;
      } catch (error) {
        console.warn('Unable to create comparison number formatter', error);
      }
    }
    formatterCache.set(cacheKey, null);
    return null;
  };
  return function (input) {
    if (input === null || input === undefined) {
      return '';
    }
    var numeric = typeof input === 'number' ? input : Number(typeof input === 'string' ? input.trim() : input);
    if (!Number.isFinite(numeric)) {
      return typeof input === 'string' ? input : String(input);
    }
    var _resolveCompatibility = resolveCompatibilityTexts(),
      lang = _resolveCompatibility.lang;
    var hasFraction = Math.abs(numeric % 1) > Number.EPSILON;
    var formatter = getFormatter(lang, hasFraction);
    if (formatter) {
      try {
        return formatter.format(numeric);
      } catch (error) {
        console.warn('Comparison number formatting failed', error);
      }
    }
    try {
      return numeric.toLocaleString(lang);
    } catch (localeError) {
      void localeError;
    }
    return String(numeric);
  };
});
var getManualDownloadFallbackMessage = ensureSessionRuntimePlaceholder('getManualDownloadFallbackMessage', function () {
  return function () {
    var _resolveCompatibility2 = resolveCompatibilityTexts(),
      langTexts = _resolveCompatibility2.langTexts,
      fallbackTexts = _resolveCompatibility2.fallbackTexts;
    return langTexts.manualDownloadFallback || fallbackTexts.manualDownloadFallback || 'The download did not start automatically. A new tab opened with the file contents so you can copy or save them manually.';
  };
});
var getManualDownloadCopyHint = ensureSessionRuntimePlaceholder('getManualDownloadCopyHint', function () {
  return function () {
    var _resolveCompatibility3 = resolveCompatibilityTexts(),
      langTexts = _resolveCompatibility3.langTexts,
      fallbackTexts = _resolveCompatibility3.fallbackTexts;
    return langTexts.manualDownloadCopyHint || fallbackTexts.manualDownloadCopyHint || 'Select all the text below and copy it to keep the file safe.';
  };
});
var backupDiffOptionsCache = ensureSessionRuntimePlaceholder('backupDiffOptionsCache', function () {
  return [];
});
var backupDiffState = ensureSessionRuntimePlaceholder('backupDiffState', function () {
  return {
    baseline: '',
    comparison: ''
  };
});
var RESTORE_COMPATIBILITY_CORE_KEYS = ['devices', 'setups', 'project', 'projects', 'gearList', 'favorites'];
var RESTORE_COMPATIBILITY_OPTIONAL_KEYS = ['autoGearRules', 'autoGearPresets', 'autoGearBackups', 'autoGearMonitorDefaults', 'autoGearActivePresetId', 'autoGearAutoPresetId', 'autoGearShowBackups', 'autoGearBackupRetention', 'fullBackups', 'fullBackupHistory', 'session'];
var RESTORE_COMPATIBILITY_STORAGE_KEYS = ['accentColor', 'fontSize', 'fontFamily', 'language', 'showAutoBackups', 'customLogo', 'customFonts'];
var RESTORE_SECTION_LABEL_OVERRIDES = {
  autoGearRules: 'Automatic gear rules',
  autoGearPresets: 'Automatic gear presets',
  autoGearBackups: 'Automatic gear backups',
  autoGearMonitorDefaults: 'Monitor defaults',
  autoGearActivePresetId: 'Active auto gear preset',
  autoGearAutoPresetId: 'Auto gear auto preset',
  autoGearShowBackups: 'Auto gear backup visibility',
  autoGearBackupRetention: 'Auto gear backup retention',
  fullBackups: 'Full backups',
  fullBackupHistory: 'Full backup history',
  showAutoBackups: 'Automatic backup visibility'
};
function humanizeRestoreSectionKey(key) {
  if (RESTORE_SECTION_LABEL_OVERRIDES[key]) {
    return RESTORE_SECTION_LABEL_OVERRIDES[key];
  }
  if (typeof key !== 'string') {
    return String(key);
  }
  var spaced = key.replace(/[_\s-]+/g, ' ').replace(/([a-z\d])([A-Z])/g, '$1 $2').trim();
  if (!spaced) {
    return key;
  }
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}
function evaluateRestoreCompatibilitySections(_ref) {
  var data = _ref.data,
    settingsSnapshot = _ref.settingsSnapshot,
    sessionSnapshot = _ref.sessionSnapshot;
  var normalizedData = data && _typeof(data) === 'object' ? data : null;
  var normalizedSettings = settingsSnapshot && _typeof(settingsSnapshot) === 'object' ? settingsSnapshot : null;
  var normalizedSession = sessionSnapshot && _typeof(sessionSnapshot) === 'object' ? sessionSnapshot : null;
  var missingCore = [];
  var missingOptional = [];
  var missingStorage = [];
  var checkDataKey = function checkDataKey(key, bucket) {
    if (!normalizedData || !Object.prototype.hasOwnProperty.call(normalizedData, key)) {
      bucket.push(key);
      return;
    }
    if (!ensureMeaningfulValue(normalizedData[key])) {
      bucket.push(key);
    }
  };
  RESTORE_COMPATIBILITY_CORE_KEYS.forEach(function (key) {
    return checkDataKey(key, missingCore);
  });
  RESTORE_COMPATIBILITY_OPTIONAL_KEYS.forEach(function (key) {
    return checkDataKey(key, missingOptional);
  });
  if (!normalizedSession || !ensureMeaningfulValue(normalizedSession)) {
    if (!missingOptional.includes('session')) {
      missingOptional.push('session');
    }
  }
  RESTORE_COMPATIBILITY_STORAGE_KEYS.forEach(function (key) {
    if (!normalizedSettings || !Object.prototype.hasOwnProperty.call(normalizedSettings, key)) {
      missingStorage.push(key);
      return;
    }
    if (!ensureMeaningfulValue(normalizedSettings[key])) {
      missingStorage.push(key);
    }
  });
  return {
    missingCore: missingCore,
    missingOptional: missingOptional,
    missingStorage: missingStorage
  };
}
function describeMissingSections(label, items) {
  if (!label || !Array.isArray(items) || !items.length) {
    return '';
  }
  var bulletList = items.map(function (item) {
    return "\u2022 ".concat(humanizeRestoreSectionKey(item));
  }).join('\n');
  return "".concat(label, "\n").concat(bulletList);
}
function buildRestoreCompatibilityReport() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var providedLangTexts = options.langTexts,
    providedFallbackTexts = options.fallbackTexts,
    fileVersion = options.fileVersion,
    targetVersion = options.targetVersion,
    data = options.data,
    settingsSnapshot = options.settingsSnapshot,
    sessionSnapshot = options.sessionSnapshot,
    backupFileName = options.backupFileName;
  var _resolveCompatibility4 = resolveCompatibilityTexts(providedLangTexts, providedFallbackTexts),
    langTexts = _resolveCompatibility4.langTexts,
    fallbackTexts = _resolveCompatibility4.fallbackTexts;
  var evaluation = evaluateRestoreCompatibilitySections({
    data: data,
    settingsSnapshot: settingsSnapshot,
    sessionSnapshot: sessionSnapshot
  });
  var getText = function getText(key, fallback) {
    if (langTexts && typeof langTexts[key] === 'string') {
      return langTexts[key];
    }
    if (fallbackTexts && typeof fallbackTexts[key] === 'string') {
      return fallbackTexts[key];
    }
    return fallback || '';
  };
  var messageParts = [];
  var summaryTitle = getText('restoreVersionSummaryTitle');
  if (summaryTitle) {
    messageParts.push(summaryTitle);
  }
  var unknownVersion = getText('restoreVersionUnknownVersion', 'unknown version');
  var headingTemplate = getText('restoreVersionSummaryHeading', 'This backup was created with {oldVersion} and you are running {newVersion}.');
  var normalizedFileVersion = normalizeVersionValue(fileVersion);
  var normalizedTargetVersion = resolveKnownAppVersion(targetVersion) || ACTIVE_APP_VERSION || normalizeVersionValue(targetVersion);
  var heading = headingTemplate.replace('{oldVersion}', normalizedFileVersion || unknownVersion).replace('{newVersion}', normalizedTargetVersion || unknownVersion);
  messageParts.push(heading);
  var warning = getText('restoreVersionWarning');
  if (warning) {
    messageParts.push(warning);
  }
  var coreSection = describeMissingSections(getText('restoreVersionCoreMissing', 'Not included in this backup:'), evaluation.missingCore);
  if (coreSection) {
    messageParts.push(coreSection);
  }
  var storageSection = describeMissingSections(getText('restoreVersionStorageMissing', 'Stored preferences not included:'), evaluation.missingStorage);
  if (storageSection) {
    messageParts.push(storageSection);
  }
  var optionalSection = describeMissingSections(getText('restoreVersionOptionalMissing', 'Optional items you may need to recreate:'), evaluation.missingOptional);
  if (optionalSection) {
    messageParts.push(optionalSection);
  }
  if (!evaluation.missingCore.length && !evaluation.missingStorage.length && !evaluation.missingOptional.length) {
    var noIssues = getText('restoreVersionNoIssues');
    if (noIssues) {
      messageParts.push(noIssues);
    }
  }
  if (backupFileName) {
    var backupLabel = getText('restoreVersionBackupLabel');
    if (backupLabel) {
      messageParts.push(backupLabel.replace('{fileName}', backupFileName));
    }
  }
  var tip = getText('restoreVersionTip');
  if (tip) {
    messageParts.push(tip);
  }
  var footer = getText('restoreVersionFooter');
  if (footer) {
    messageParts.push(footer);
  }
  return {
    evaluation: evaluation,
    message: messageParts.filter(Boolean).join('\n\n'),
    langTexts: langTexts,
    fallbackTexts: fallbackTexts
  };
}
var buildRestoreVersionCompatibilityMessage = ensureSessionRuntimePlaceholder('buildRestoreVersionCompatibilityMessage', function () {
  return function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return buildRestoreCompatibilityReport(options).message;
  };
});
var verifyRestoredBackupIntegrity = ensureSessionRuntimePlaceholder('verifyRestoredBackupIntegrity', function () {
  return function (payload) {
    var options = payload && _typeof(payload) === 'object' && !Array.isArray(payload) && (payload.data || payload.settingsSnapshot || payload.sessionSnapshot) ? payload : {
      data: payload
    };
    var report = buildRestoreCompatibilityReport(options);
    var evaluation = report.evaluation,
      message = report.message,
      langTexts = report.langTexts,
      fallbackTexts = report.fallbackTexts;
    var missingCount = evaluation.missingCore.length + evaluation.missingStorage.length + evaluation.missingOptional.length;
    var warning = langTexts && langTexts.restoreVersionWarning || fallbackTexts && fallbackTexts.restoreVersionWarning || 'Backup created with a different version. Some features might not transfer.';
    var success = langTexts && langTexts.restoreVersionNoIssues || fallbackTexts && fallbackTexts.restoreVersionNoIssues || 'All modern data sections were found in this backup.';
    if (missingCount === 0) {
      return {
        notificationType: 'success',
        notificationMessage: success,
        alertMessage: ''
      };
    }
    return {
      notificationType: 'warning',
      notificationMessage: warning,
      alertMessage: message
    };
  };
});
function invokeSessionRevertAccentColor() {
  var revertFn = getSessionRuntimeFunction('revertAccentColor');
  if (typeof revertFn !== 'function') {
    return;
  }
  try {
    revertFn();
  } catch (revertError) {
    console.warn('Failed to revert accent color', revertError);
  }
}
function invokeSessionOpenAutoGearEditor() {
  var openFn = getSessionRuntimeFunction('openAutoGearEditor');
  if (typeof openFn !== 'function') {
    console.warn('Auto Gear editor runtime is not available yet.');
    return;
  }
  try {
    openFn.apply(void 0, arguments);
  } catch (openError) {
    console.warn('Failed to open Auto Gear editor', openError);
  }
}
ensureSessionRuntimePlaceholder('autoGearScenarioModeSelect', null);
var normalizeAccentValueSafe = ensureSessionRuntimePlaceholder('normalizeAccentValue', function () {
  return function (value) {
    return typeof value === 'string' ? value.trim().toLowerCase() : '';
  };
});
var isPlainObjectFallback = function isPlainObjectFallback(value) {
  if (value === null || _typeof(value) !== 'object') {
    return false;
  }
  if (Array.isArray(value)) {
    return false;
  }
  var prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
};
var isPlainObject = ensureSessionRuntimePlaceholder('isPlainObject', function () {
  return isPlainObjectFallback;
});
var applyFontSizeSafe = ensureSessionRuntimePlaceholder('applyFontSize', function () {
  var defaultUIScaleValues = {
    '--page-padding': 20,
    '--gap-size': 10,
    '--button-size': 32,
    '--border-radius': 5,
    '--form-label-width': 150,
    '--form-label-min-width': 120,
    '--form-action-width': 110
  };
  var uiScaleProperties = Object.keys(defaultUIScaleValues);
  var baseUIScaleValues = _objectSpread({}, defaultUIScaleValues);
  var baseFontSize = null;
  var resolveBaseMetrics = function resolveBaseMetrics() {
    if (baseFontSize !== null) {
      return;
    }
    baseFontSize = 16;
    var root = typeof document !== 'undefined' && document ? document.documentElement : null;
    if (!root) {
      return;
    }
    try {
      var computed = typeof window !== 'undefined' && window && typeof window.getComputedStyle === 'function' ? window.getComputedStyle(root) : null;
      if (!computed) {
        return;
      }
      var computedFontSize = parseFloat(computed.fontSize);
      if (Number.isFinite(computedFontSize) && computedFontSize > 0) {
        baseFontSize = computedFontSize;
      }
      for (var index = 0; index < uiScaleProperties.length; index += 1) {
        var prop = uiScaleProperties[index];
        var rawValue = computed.getPropertyValue(prop);
        var numericValue = parseFloat(rawValue);
        if (Number.isFinite(numericValue) && numericValue > 0) {
          baseUIScaleValues[prop] = numericValue;
        }
      }
    } catch (metricsError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unable to capture base UI scale metrics', metricsError);
      }
    }
  };
  return function (size) {
    var root = typeof document !== 'undefined' && document ? document.documentElement : null;
    if (!root) {
      return;
    }
    var numericSize = Number.parseFloat(size);
    if (!Number.isFinite(numericSize) || numericSize <= 0) {
      return;
    }
    resolveBaseMetrics();
    root.style.fontSize = "".concat(numericSize, "px");
    var referenceFontSize = Number.isFinite(baseFontSize) && baseFontSize > 0 ? baseFontSize : numericSize;
    var rawScale = referenceFontSize > 0 ? numericSize / referenceFontSize : 1;
    var scale = Number.isFinite(rawScale) && rawScale > 0 ? rawScale : 1;
    for (var index = 0; index < uiScaleProperties.length; index += 1) {
      var prop = uiScaleProperties[index];
      var baseValue = baseUIScaleValues[prop];
      if (Number.isFinite(baseValue) && baseValue > 0) {
        root.style.setProperty(prop, "".concat(baseValue * scale, "px"));
      }
    }
    root.style.setProperty('--ui-scale', String(scale));
  };
});
var applyFontFamilySafe = ensureSessionRuntimePlaceholder('applyFontFamily', function () {
  return function (family) {
    var root = typeof document !== 'undefined' && document ? document.documentElement : null;
    if (!root) {
      return;
    }
    try {
      root.style.setProperty('--font-family', family || '');
    } catch (fontFamilyError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unable to apply font family', fontFamilyError);
      }
    }
  };
});
var downloadDiagramButton = ensureSessionRuntimePlaceholder('downloadDiagramBtn', function () {
  if (typeof document === 'undefined' || !document || typeof document.getElementById !== 'function') {
    return null;
  }
  try {
    return document.getElementById('downloadDiagram');
  } catch (resolveError) {
    void resolveError;
    return null;
  }
});
var gridSnapToggleButton = ensureSessionRuntimePlaceholder('gridSnapToggleBtn', function () {
  if (typeof document === 'undefined' || !document || typeof document.getElementById !== 'function') {
    return null;
  }
  try {
    return document.getElementById('gridSnapToggle');
  } catch (resolveError) {
    void resolveError;
    return null;
  }
});
var GRID_SNAP_STORAGE_KEY = '__cineGridSnapState';
var readGridSnapState = function readGridSnapState() {
  try {
    if (typeof getGridSnapState === 'function') {
      return Boolean(getGridSnapState());
    }
  } catch (gridSnapReadError) {
    void gridSnapReadError;
  }
  if (typeof gridSnap !== 'undefined') {
    try {
      return Boolean(gridSnap);
    } catch (legacyGridSnapError) {
      void legacyGridSnapError;
    }
  }
  var scopes = getSessionRuntimeScopes();
  for (var index = 0; index < scopes.length; index += 1) {
    var scope = scopes[index];
    if (!scope || _typeof(scope) !== 'object') {
      continue;
    }
    try {
      var stored = scope[GRID_SNAP_STORAGE_KEY];
      if (typeof stored === 'boolean') {
        return stored;
      }
    } catch (storedReadError) {
      void storedReadError;
    }
    try {
      var legacy = scope.gridSnap;
      if (typeof legacy === 'boolean') {
        return legacy;
      }
    } catch (legacyScopeError) {
      void legacyScopeError;
    }
  }
  return false;
};
var writeGridSnapState = function writeGridSnapState(value) {
  var desired = value === true;
  try {
    if (typeof setGridSnapState === 'function') {
      return Boolean(setGridSnapState(desired));
    }
  } catch (gridSnapWriteError) {
    void gridSnapWriteError;
  }
  var scopes = getSessionRuntimeScopes();
  for (var index = 0; index < scopes.length; index += 1) {
    var scope = scopes[index];
    if (!scope || _typeof(scope) !== 'object') {
      continue;
    }
    try {
      scope[GRID_SNAP_STORAGE_KEY] = desired;
    } catch (assignStorageError) {
      try {
        Object.defineProperty(scope, GRID_SNAP_STORAGE_KEY, {
          configurable: true,
          writable: true,
          value: desired
        });
      } catch (defineStorageError) {
        void defineStorageError;
      }
    }
    try {
      scope.gridSnap = desired;
    } catch (assignLegacyError) {
      try {
        Object.defineProperty(scope, 'gridSnap', {
          configurable: true,
          writable: true,
          value: desired
        });
      } catch (defineLegacyError) {
        void defineLegacyError;
      }
    }
  }
  try {
    if (typeof applyLegacyGridSnapValue === 'function') {
      return Boolean(applyLegacyGridSnapValue(desired));
    }
  } catch (legacyGridSnapError) {
    void legacyGridSnapError;
  }
  return desired;
};
var resolveDiagramContainer = function resolveDiagramContainer() {
  if (typeof setupDiagramContainer !== 'undefined' && setupDiagramContainer) {
    return setupDiagramContainer;
  }
  if (typeof document !== 'undefined' && document && typeof document.getElementById === 'function') {
    try {
      return document.getElementById('diagramArea');
    } catch (diagramResolveError) {
      void diagramResolveError;
    }
  }
  return null;
};
var applyGridSnapUiState = function applyGridSnapUiState(enabled) {
  var diagramContainer = resolveDiagramContainer();
  if (gridSnapToggleButton) {
    gridSnapToggleButton.classList.toggle('active', enabled);
    gridSnapToggleButton.setAttribute('aria-pressed', enabled ? 'true' : 'false');
  }
  if (diagramContainer) {
    diagramContainer.classList.toggle('grid-snap', enabled);
  }
};
applyGridSnapUiState(readGridSnapState());
function getGlobalCineUi() {
  var scope = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
  if (!scope || _typeof(scope) !== 'object') {
    return null;
  }
  try {
    var candidate = scope.cineUi;
    return candidate && _typeof(candidate) === 'object' ? candidate : null;
  } catch (error) {
    void error;
    return null;
  }
}
function isCineUiEntryRegistered(registry, name) {
  if (!registry || _typeof(registry) !== 'object') {
    return false;
  }
  if (typeof registry.get === 'function') {
    try {
      return Boolean(registry.get(name));
    } catch (error) {
      void error;
    }
  }
  if (typeof registry.list === 'function') {
    try {
      var entries = registry.list();
      return Array.isArray(entries) && entries.indexOf(name) !== -1;
    } catch (error) {
      void error;
    }
  }
  return false;
}
function registerCineUiEntries(registry, entries, warningMessage) {
  if (!registry || typeof registry.register !== 'function') {
    return;
  }
  for (var index = 0; index < entries.length; index += 1) {
    var entry = entries[index];
    if (!entry || typeof entry.name !== 'string') {
      continue;
    }
    if (isCineUiEntryRegistered(registry, entry.name)) {
      continue;
    }
    try {
      registry.register(entry.name, entry.value);
    } catch (error) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn(warningMessage, error);
      }
    }
  }
}
function safeLoadStoredLogoPreview() {
  if (typeof loadStoredLogoPreview !== 'function') {
    return;
  }
  try {
    loadStoredLogoPreview();
  } catch (error) {
    console.warn('Failed to load stored logo preview', error);
  }
}
function areSessionEntriesRegistered(cineUi) {
  if (!cineUi || _typeof(cineUi) !== 'object') {
    return false;
  }
  var controllers = cineUi.controllers;
  var interactions = cineUi.interactions;
  var help = cineUi.help;
  return isCineUiEntryRegistered(controllers, 'backupSettings') && isCineUiEntryRegistered(controllers, 'restoreSettings') && isCineUiEntryRegistered(interactions, 'performBackup') && isCineUiEntryRegistered(interactions, 'openRestorePicker') && isCineUiEntryRegistered(interactions, 'applyRestoreFile') && isCineUiEntryRegistered(help, 'backupSettings') && isCineUiEntryRegistered(help, 'restoreSettings');
}
var sessionCineUiRegistered = areSessionEntriesRegistered(getGlobalCineUi());
function enqueueCineUiRegistration(callback) {
  var scope = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
  if (!scope || typeof callback !== 'function') {
    return;
  }
  try {
    var existing = scope.cineUi && _typeof(scope.cineUi) === 'object' ? scope.cineUi : null;
    if (existing) {
      callback(existing);
      return;
    }
  } catch (callbackError) {
    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      console.warn('cineUi registration callback (session) failed', callbackError);
    }
    return;
  }
  var key = '__cineUiReadyQueue';
  if (!Array.isArray(scope[key])) {
    scope[key] = [];
  }
  scope[key].push(callback);
}
enqueueCineUiRegistration(registerSessionCineUiInternal);
var SESSION_GLOBAL_SCOPE = (typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object' && CORE_GLOBAL_SCOPE || (typeof globalThis !== 'undefined' ? globalThis : null) || (typeof window !== 'undefined' ? window : null) || (typeof self !== 'undefined' ? self : null) || (typeof global !== 'undefined' ? global : null) || null;
var SESSION_DEFAULT_ACCENT_COLOR_FALLBACK = '#001589';
var SESSION_HIGH_CONTRAST_ACCENT_COLOR_FALLBACK = '#ffffff';
var resolvedDefaultAccentColor = function () {
  if (SESSION_GLOBAL_SCOPE && typeof SESSION_GLOBAL_SCOPE.DEFAULT_ACCENT_COLOR === 'string') {
    var candidate = SESSION_GLOBAL_SCOPE.DEFAULT_ACCENT_COLOR.trim();
    if (candidate) {
      return candidate;
    }
  }
  if (SESSION_GLOBAL_SCOPE && typeof SESSION_GLOBAL_SCOPE.accentColor === 'string') {
    var seeded = SESSION_GLOBAL_SCOPE.accentColor.trim();
    if (seeded) {
      return seeded;
    }
  }
  return SESSION_DEFAULT_ACCENT_COLOR_FALLBACK;
}();
var resolvedDefaultAccentNormalized = typeof resolvedDefaultAccentColor === 'string' ? resolvedDefaultAccentColor.toLowerCase() : SESSION_DEFAULT_ACCENT_COLOR_FALLBACK.toLowerCase();
var resolvedHighContrastAccentColor = function () {
  if (SESSION_GLOBAL_SCOPE && typeof SESSION_GLOBAL_SCOPE.HIGH_CONTRAST_ACCENT_COLOR === 'string') {
    var candidate = SESSION_GLOBAL_SCOPE.HIGH_CONTRAST_ACCENT_COLOR.trim();
    if (candidate) {
      return candidate;
    }
  }
  return SESSION_HIGH_CONTRAST_ACCENT_COLOR_FALLBACK;
}();
var resolvedAccentColor = function () {
  if (SESSION_GLOBAL_SCOPE && typeof SESSION_GLOBAL_SCOPE.accentColor === 'string') {
    var candidate = SESSION_GLOBAL_SCOPE.accentColor.trim();
    if (candidate) {
      return candidate;
    }
  }
  return resolvedDefaultAccentColor;
}();
var hasDefaultAccentColor = typeof DEFAULT_ACCENT_COLOR === 'string' && DEFAULT_ACCENT_COLOR.trim();
if (!hasDefaultAccentColor) {
  try {
    DEFAULT_ACCENT_COLOR = resolvedDefaultAccentColor;
  } catch (assignDefaultAccentError) {
    if (SESSION_GLOBAL_SCOPE && _typeof(SESSION_GLOBAL_SCOPE) === 'object') {
      SESSION_GLOBAL_SCOPE.DEFAULT_ACCENT_COLOR = resolvedDefaultAccentColor;
    }
    void assignDefaultAccentError;
  }
}
var hasDefaultAccentNormalized = typeof DEFAULT_ACCENT_NORMALIZED === 'string' && DEFAULT_ACCENT_NORMALIZED;
if (!hasDefaultAccentNormalized) {
  try {
    DEFAULT_ACCENT_NORMALIZED = resolvedDefaultAccentNormalized;
  } catch (assignNormalizedAccentError) {
    if (SESSION_GLOBAL_SCOPE && _typeof(SESSION_GLOBAL_SCOPE) === 'object') {
      SESSION_GLOBAL_SCOPE.DEFAULT_ACCENT_NORMALIZED = resolvedDefaultAccentNormalized;
    }
    void assignNormalizedAccentError;
  }
}
var hasHighContrastAccent = typeof HIGH_CONTRAST_ACCENT_COLOR === 'string' && HIGH_CONTRAST_ACCENT_COLOR.trim();
if (!hasHighContrastAccent) {
  try {
    HIGH_CONTRAST_ACCENT_COLOR = resolvedHighContrastAccentColor;
  } catch (assignHighContrastAccentError) {
    if (SESSION_GLOBAL_SCOPE && _typeof(SESSION_GLOBAL_SCOPE) === 'object') {
      SESSION_GLOBAL_SCOPE.HIGH_CONTRAST_ACCENT_COLOR = resolvedHighContrastAccentColor;
    }
    void assignHighContrastAccentError;
  }
}
var hasAccentColor = typeof accentColor === 'string' && accentColor.trim();
if (!hasAccentColor) {
  try {
    accentColor = resolvedAccentColor;
  } catch (assignAccentColorError) {
    if (SESSION_GLOBAL_SCOPE && _typeof(SESSION_GLOBAL_SCOPE) === 'object') {
      SESSION_GLOBAL_SCOPE.accentColor = resolvedAccentColor;
    }
    void assignAccentColorError;
  }
}
var hasPrevAccentColor = typeof prevAccentColor === 'string' && prevAccentColor.trim();
if (!hasPrevAccentColor) {
  try {
    prevAccentColor = resolvedAccentColor;
  } catch (assignPrevAccentError) {
    if (SESSION_GLOBAL_SCOPE && _typeof(SESSION_GLOBAL_SCOPE) === 'object') {
      SESSION_GLOBAL_SCOPE.prevAccentColor = resolvedAccentColor;
    }
    void assignPrevAccentError;
  }
}
if (typeof restoringSession !== 'boolean') {
  try {
    restoringSession = false;
  } catch (assignRestoringSessionError) {
    if (SESSION_GLOBAL_SCOPE && _typeof(SESSION_GLOBAL_SCOPE) === 'object') {
      SESSION_GLOBAL_SCOPE.restoringSession = false;
    }
    void assignRestoringSessionError;
  }
}
if (typeof filterSelectElem === 'undefined') {
  try {
    filterSelectElem = null;
  } catch (assignFilterSelectError) {
    if (SESSION_GLOBAL_SCOPE && _typeof(SESSION_GLOBAL_SCOPE) === 'object') {
      SESSION_GLOBAL_SCOPE.filterSelectElem = null;
    }
    void assignFilterSelectError;
  }
}
function resolveFilterSelectElement() {
  if (filterSelectElem && (typeof filterSelectElem === "undefined" ? "undefined" : _typeof(filterSelectElem)) === 'object' && typeof filterSelectElem.tagName === 'string') {
    return filterSelectElem;
  }
  if (typeof document === 'undefined' || !document) {
    return null;
  }
  try {
    var resolved = document.getElementById('filter');
    if (resolved) {
      filterSelectElem = resolved;
      return resolved;
    }
  } catch (resolveFilterSelectError) {
    void resolveFilterSelectError;
  }
  return filterSelectElem;
}
function callSessionCoreFunction(functionName) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (typeof callCoreFunctionIfAvailable === 'function') {
    return callCoreFunctionIfAvailable(functionName, args, options);
  }
  var scope = (typeof globalThis !== 'undefined' ? globalThis : null) || (typeof window !== 'undefined' ? window : null) || (typeof self !== 'undefined' ? self : null) || (typeof global !== 'undefined' ? global : null);
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
  if (options && options.defer === true) {
    var queue = scope && Array.isArray(scope.CORE_BOOT_QUEUE) ? scope.CORE_BOOT_QUEUE : null;
    if (queue) {
      queue.push(function () {
        callSessionCoreFunction(functionName, args, _objectSpread(_objectSpread({}, options), {}, {
          defer: false
        }));
      });
    }
  }
  return options && Object.prototype.hasOwnProperty.call(options, 'defaultValue') ? options.defaultValue : undefined;
}
function ensureSessionRuntimeFunction(functionName) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return ensureSessionRuntimePlaceholder(functionName, function () {
    var proxy = function proxy() {
      for (var _len = arguments.length, invocationArgs = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
        invocationArgs[_key2] = arguments[_key2];
      }
      return callSessionCoreFunction(functionName, invocationArgs, options);
    };
    try {
      Object.defineProperty(proxy, '__cineSessionProxy__', {
        value: true,
        writable: false,
        enumerable: false
      });
    } catch (defineProxyFlagError) {
      void defineProxyFlagError;
      try {
        proxy.__cineSessionProxy__ = true;
      } catch (assignProxyFlagError) {
        void assignProxyFlagError;
      }
    }
    return proxy;
  });
}
var AUTO_GEAR_RUNTIME_HANDLERS = ['handleAutoGearImportSelection', 'handleAutoGearPresetSelection', 'handleAutoGearSavePreset', 'handleAutoGearDeletePreset', 'handleAutoGearShowBackupsToggle', 'handleAutoGearConditionShortcut', 'saveAutoGearRuleFromEditor'];
for (var index = 0; index < AUTO_GEAR_RUNTIME_HANDLERS.length; index += 1) {
  var handlerName = AUTO_GEAR_RUNTIME_HANDLERS[index];
  ensureSessionRuntimeFunction(handlerName, {
    defer: true
  });
}
var AUTO_GEAR_RUNTIME_FUNCTIONS = ['setAutoGearSummaryFocus', 'focusAutoGearRuleById', 'setAutoGearSearchQuery', 'setAutoGearScenarioFilter', 'clearAutoGearFilters'];
for (var _index6 = 0; _index6 < AUTO_GEAR_RUNTIME_FUNCTIONS.length; _index6 += 1) {
  var functionName = AUTO_GEAR_RUNTIME_FUNCTIONS[_index6];
  ensureSessionRuntimeFunction(functionName, {
    defer: true
  });
}
function getSessionCoreValue(functionName) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var defaultValue = Object.prototype.hasOwnProperty.call(options, 'defaultValue') ? options.defaultValue : '';
  var value = callSessionCoreFunction(functionName, [], {
    defaultValue: defaultValue
  });
  if (typeof value === 'string') {
    return value;
  }
  if (value === null || value === undefined) {
    return defaultValue;
  }
  try {
    return String(value);
  } catch (coerceError) {
    void coerceError;
    return defaultValue;
  }
}
function deriveSessionProjectInfo(info) {
  var fallback = info && _typeof(info) === 'object' ? _objectSpread({}, info) : {};
  var derived = callSessionCoreFunction('deriveProjectInfo', [info], {
    defaultValue: fallback
  });
  if (derived && _typeof(derived) === 'object') {
    return derived;
  }
  return fallback;
}
var temperaturePreferenceStorageKey = typeof TEMPERATURE_STORAGE_KEY === 'string' ? TEMPERATURE_STORAGE_KEY : typeof resolveTemperatureStorageKey === 'function' ? resolveTemperatureStorageKey() : 'cameraPowerPlanner_temperatureUnit';
var sessionGlobalScope = getSessionCloneScope();
function normalizeTemperatureUnitValue(value) {
  if (value === 'fahrenheit' || value === 'celsius') {
    return value;
  }
  return value && typeof value === 'string' ? value.toLowerCase() : 'celsius';
}
function resolveInitialTemperatureUnit() {
  if (sessionGlobalScope && typeof sessionGlobalScope.temperatureUnit === 'string') {
    return normalizeTemperatureUnitValue(sessionGlobalScope.temperatureUnit);
  }
  try {
    if (typeof localStorage !== 'undefined' && localStorage) {
      var stored = localStorage.getItem(temperaturePreferenceStorageKey);
      if (typeof stored === 'string' && stored) {
        return normalizeTemperatureUnitValue(stored);
      }
    }
  } catch (temperatureStorageError) {
    console.warn('Unable to read stored temperature unit preference', temperatureStorageError);
  }
  return 'celsius';
}
var localTemperatureUnit = resolveInitialTemperatureUnit();
function resolveTemperatureUnitPreferenceController() {
  if (typeof applyTemperatureUnitPreference === 'function') {
    return applyTemperatureUnitPreference;
  }
  if (sessionGlobalScope && typeof sessionGlobalScope.applyTemperatureUnitPreference === 'function') {
    return sessionGlobalScope.applyTemperatureUnitPreference;
  }
  if (typeof globalThis !== 'undefined') {
    try {
      var candidate = globalThis.applyTemperatureUnitPreference;
      if (typeof candidate === 'function') {
        return candidate;
      }
    } catch (globalReadError) {
      void globalReadError;
    }
  }
  return null;
}
function applyTemperatureUnitPreferenceWithFallback(preferredUnit) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var normalized = normalizeTemperatureUnitValue(preferredUnit);
  var shouldPersist = !(options && _typeof(options) === 'object' && Object.prototype.hasOwnProperty.call(options, 'persist') && options.persist === false);
  var controller = resolveTemperatureUnitPreferenceController();
  if (controller) {
    try {
      controller(preferredUnit, options);
    } catch (controllerError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Could not apply temperature unit preference via controller', controllerError);
      }
    }
  }
  try {
    localTemperatureUnit = normalized;
  } catch (assignError) {
    void assignError;
  }
  if (sessionGlobalScope && _typeof(sessionGlobalScope) === 'object') {
    try {
      sessionGlobalScope.temperatureUnit = normalized;
    } catch (temperatureScopeError) {
      if (typeof console !== 'undefined' && typeof console.debug === 'function') {
        console.debug('Unable to propagate temperature unit preference to session scope', temperatureScopeError);
      }
    }
  }
  if (shouldPersist) {
    try {
      if (typeof localStorage !== 'undefined' && localStorage) {
        localStorage.setItem(temperaturePreferenceStorageKey, normalized);
      }
    } catch (temperaturePersistError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Could not save temperature unit preference', temperaturePersistError);
      }
    }
  }
  return normalized;
}
if (sessionGlobalScope && _typeof(sessionGlobalScope) === 'object') {
  try {
    Object.defineProperty(sessionGlobalScope, 'temperatureUnit', {
      configurable: true,
      enumerable: true,
      get: function get() {
        return localTemperatureUnit;
      },
      set: function set(value) {
        localTemperatureUnit = normalizeTemperatureUnitValue(value);
      }
    });
  } catch (defineTemperaturePropertyError) {
    void defineTemperaturePropertyError;
    try {
      sessionGlobalScope.temperatureUnit = localTemperatureUnit;
    } catch (sessionTemperatureExposeError) {
      void sessionTemperatureExposeError;
    }
  }
}
var recordFullBackupHistoryEntryFn = function recordFullBackupHistoryEntryFn() {};
var ensureCriticalStorageBackupsFn = function ensureCriticalStorageBackupsFn() {
  return {
    ensured: [],
    skipped: [],
    errors: []
  };
};
try {
  var _require = require('./storage.js');
  recordFullBackupHistoryEntryFn = _require.recordFullBackupHistoryEntry;
  ensureCriticalStorageBackupsFn = _require.ensureCriticalStorageBackups;
} catch (error) {
  if (typeof window !== 'undefined' && window && typeof window.recordFullBackupHistoryEntry === 'function') {
    recordFullBackupHistoryEntryFn = window.recordFullBackupHistoryEntry;
  }
  if (typeof window !== 'undefined' && window && typeof window.ensureCriticalStorageBackups === 'function') {
    ensureCriticalStorageBackupsFn = window.ensureCriticalStorageBackups;
  } else {
    void error;
  }
}
var createBackupDiffRefs = function createBackupDiffRefs() {
  var doc = typeof document !== 'undefined' ? document : null;
  if (!doc) {
    return {
      toggleButton: null,
      section: null,
      primarySelect: null,
      secondarySelect: null,
      emptyState: null,
      summary: null,
      list: null,
      listContainer: null,
      notes: null,
      exportButton: null,
      closeButton: null
    };
  }
  return {
    toggleButton: doc.getElementById('backupDiffToggleButton'),
    section: doc.getElementById('backupDiffSection'),
    primarySelect: doc.getElementById('backupDiffPrimary'),
    secondarySelect: doc.getElementById('backupDiffSecondary'),
    emptyState: doc.getElementById('backupDiffEmptyState'),
    summary: doc.getElementById('backupDiffSummary'),
    list: doc.getElementById('backupDiffList'),
    listContainer: doc.getElementById('backupDiffListContainer'),
    notes: doc.getElementById('backupDiffNotes'),
    exportButton: doc.getElementById('backupDiffExport'),
    closeButton: doc.getElementById('backupDiffClose')
  };
};
var _createBackupDiffRefs = createBackupDiffRefs(),
  backupDiffToggleButtonEl = _createBackupDiffRefs.toggleButton,
  backupDiffSectionEl = _createBackupDiffRefs.section,
  backupDiffPrimarySelectEl = _createBackupDiffRefs.primarySelect,
  backupDiffSecondarySelectEl = _createBackupDiffRefs.secondarySelect,
  backupDiffEmptyStateEl = _createBackupDiffRefs.emptyState,
  backupDiffSummaryEl = _createBackupDiffRefs.summary,
  backupDiffListEl = _createBackupDiffRefs.list,
  backupDiffListContainerEl = _createBackupDiffRefs.listContainer,
  backupDiffNotesEl = _createBackupDiffRefs.notes,
  backupDiffExportButtonEl = _createBackupDiffRefs.exportButton,
  backupDiffCloseButtonEl = _createBackupDiffRefs.closeButton;
function createRestoreRehearsalRefs() {
  var doc = typeof document !== 'undefined' ? document : null;
  if (!doc) {
    return {
      button: null,
      section: null,
      heading: null,
      closeButton: null,
      input: null,
      browseButton: null,
      fileName: null,
      status: null,
      table: null,
      tableBody: null,
      ruleSection: null,
      ruleHeading: null,
      ruleIntro: null,
      ruleEmpty: null,
      ruleList: null,
      actions: null,
      proceedButton: null,
      abortButton: null,
      modeInputs: []
    };
  }
  var modeInputs = [doc.getElementById('restoreRehearsalModeBackup'), doc.getElementById('restoreRehearsalModeProject')].filter(Boolean);
  return {
    button: doc.getElementById('restoreRehearsalButton'),
    section: doc.getElementById('restoreRehearsalSection'),
    heading: doc.getElementById('restoreRehearsalHeading'),
    closeButton: doc.getElementById('restoreRehearsalClose'),
    input: doc.getElementById('restoreRehearsalInput'),
    browseButton: doc.getElementById('restoreRehearsalBrowse'),
    fileName: doc.getElementById('restoreRehearsalFileName'),
    status: doc.getElementById('restoreRehearsalStatus'),
    table: doc.getElementById('restoreRehearsalTable'),
    tableBody: doc.getElementById('restoreRehearsalTableBody'),
    ruleSection: doc.getElementById('restoreRehearsalRuleSection'),
    ruleHeading: doc.getElementById('restoreRehearsalRuleHeading'),
    ruleIntro: doc.getElementById('restoreRehearsalRuleIntro'),
    ruleEmpty: doc.getElementById('restoreRehearsalRuleEmpty'),
    ruleList: doc.getElementById('restoreRehearsalRuleList'),
    actions: doc.getElementById('restoreRehearsalActions'),
    proceedButton: doc.getElementById('restoreRehearsalProceed'),
    abortButton: doc.getElementById('restoreRehearsalAbort'),
    modeInputs: modeInputs
  };
}
var _createRestoreRehears = createRestoreRehearsalRefs(),
  restoreRehearsalButtonEl = _createRestoreRehears.button,
  restoreRehearsalSectionEl = _createRestoreRehears.section,
  restoreRehearsalHeadingEl = _createRestoreRehears.heading,
  restoreRehearsalCloseButtonEl = _createRestoreRehears.closeButton,
  restoreRehearsalInputEl = _createRestoreRehears.input,
  restoreRehearsalBrowseButtonEl = _createRestoreRehears.browseButton,
  restoreRehearsalFileNameEl = _createRestoreRehears.fileName,
  restoreRehearsalStatusEl = _createRestoreRehears.status,
  restoreRehearsalTableEl = _createRestoreRehears.table,
  restoreRehearsalTableBodyEl = _createRestoreRehears.tableBody,
  restoreRehearsalRuleSectionEl = _createRestoreRehears.ruleSection,
  restoreRehearsalRuleHeadingEl = _createRestoreRehears.ruleHeading,
  restoreRehearsalRuleIntroEl = _createRestoreRehears.ruleIntro,
  restoreRehearsalRuleEmptyEl = _createRestoreRehears.ruleEmpty,
  restoreRehearsalRuleListEl = _createRestoreRehears.ruleList,
  restoreRehearsalActionsEl = _createRestoreRehears.actions,
  restoreRehearsalProceedButtonEl = _createRestoreRehears.proceedButton,
  restoreRehearsalAbortButtonEl = _createRestoreRehears.abortButton,
  restoreRehearsalModeInputs = _createRestoreRehears.modeInputs;
var restoreRehearsalLastSnapshot = null;
function createEmptyRestoreRehearsalCounts() {
  return RESTORE_REHEARSAL_METRICS.reduce(function (acc, metric) {
    acc[metric.key] = 0;
    return acc;
  }, {});
}
function countProjectsFromSetups(setups) {
  if (Array.isArray(setups)) {
    return setups.length;
  }
  if (isPlainObject(setups)) {
    return Object.keys(setups).length;
  }
  if (typeof setups === 'string' && setups.trim()) {
    return 1;
  }
  return 0;
}
function countFavoritesEntries(favorites) {
  if (!isPlainObject(favorites)) return 0;
  return Object.values(favorites).reduce(function (count, entry) {
    if (Array.isArray(entry)) {
      return count + entry.filter(Boolean).length;
    }
    if (isPlainObject(entry) && Array.isArray(entry.entries)) {
      return count + entry.entries.filter(Boolean).length;
    }
    return count;
  }, 0);
}
function projectInfoValueHasData(value) {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (typeof value === 'number') return !Number.isNaN(value);
  if (typeof value === 'boolean') return value;
  if (Array.isArray(value)) {
    return value.some(function (item) {
      return projectInfoValueHasData(item);
    });
  }
  if (isPlainObject(value)) {
    return Object.keys(value).some(function (key) {
      return projectInfoValueHasData(value[key]);
    });
  }
  return false;
}
function countCrewEntries(value) {
  if (!value) return 0;
  if (Array.isArray(value)) {
    return value.reduce(function (total, entry) {
      return total + countCrewEntries(entry);
    }, 0);
  }
  if (typeof value === 'string') {
    return value.split(/\r?\n+/).map(function (line) {
      return line.trim();
    }).filter(Boolean).length;
  }
  if (isPlainObject(value)) {
    if (Array.isArray(value.people)) {
      return countCrewEntries(value.people);
    }
    if (Array.isArray(value.entries)) {
      return countCrewEntries(value.entries);
    }
    if (typeof value.text === 'string') {
      return countCrewEntries(value.text);
    }
    if (typeof value.name === 'string' || typeof value.role === 'string' || typeof value.phone === 'string' || typeof value.email === 'string' || typeof value.website === 'string' || typeof value.text === 'string') {
      var name = typeof value.name === 'string' ? value.name.trim() : '';
      var role = typeof value.role === 'string' ? value.role.trim() : '';
      var phone = typeof value.phone === 'string' ? value.phone.trim() : '';
      var email = typeof value.email === 'string' ? value.email.trim() : '';
      var website = typeof value.website === 'string' ? value.website.trim() : '';
      var text = typeof value.text === 'string' ? value.text.trim() : '';
      return name || role || phone || email || website || text ? 1 : 0;
    }
    var nestedKeys = Object.keys(value).filter(function (key) {
      return key !== '__html';
    });
    if (nestedKeys.length) {
      return countCrewEntries(nestedKeys.map(function (key) {
        return value[key];
      }));
    }
  }
  return 0;
}
function countScheduleEntries(value) {
  if (!value) return 0;
  if (Array.isArray(value)) {
    return value.reduce(function (total, entry) {
      return total + countScheduleEntries(entry);
    }, 0);
  }
  if (typeof value === 'string') {
    return value.split(/\r?\n+/).map(function (line) {
      return line.trim();
    }).filter(Boolean).length;
  }
  if (isPlainObject(value)) {
    if (Array.isArray(value.entries)) {
      return countScheduleEntries(value.entries);
    }
    if (typeof value.text === 'string') {
      return countScheduleEntries(value.text);
    }
    if (typeof value.label === 'string' || typeof value.value === 'string') {
      var label = typeof value.label === 'string' ? value.label.trim() : '';
      var val = typeof value.value === 'string' ? value.value.trim() : '';
      return label || val ? 1 : 0;
    }
    var nestedKeys = Object.keys(value).filter(function (key) {
      return key !== '__html';
    });
    if (nestedKeys.length) {
      return countScheduleEntries(nestedKeys.map(function (key) {
        return value[key];
      }));
    }
  }
  return 0;
}
function summarizeProjectInfoStats(projectInfo) {
  if (typeof projectInfo === 'string') {
    try {
      var parsed = JSON.parse(projectInfo);
      if (isPlainObject(parsed)) {
        return summarizeProjectInfoStats(parsed);
      }
    } catch (parseError) {
      void parseError;
    }
  }
  if (!projectInfo || _typeof(projectInfo) !== 'object' || Array.isArray(projectInfo)) {
    var _hasDetails = projectInfoValueHasData(projectInfo);
    return {
      details: _hasDetails ? 1 : 0,
      crew: 0,
      schedule: 0,
      hasDetails: _hasDetails
    };
  }
  var details = 0;
  var crew = 0;
  var schedule = 0;
  var hasDetails = false;
  Object.entries(projectInfo).forEach(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
      key = _ref3[0],
      value = _ref3[1];
    if (key === 'projectName') return;
    if (projectInfoValueHasData(value)) {
      details += 1;
      hasDetails = true;
    }
    if (key === 'crew' || key === 'people') {
      var crewCount = countCrewEntries(value);
      if (crewCount > 0) {
        crew += crewCount;
        hasDetails = true;
      }
    }
    if (key === 'prepDays' || key === 'shootingDays' || key === 'returnDays') {
      var scheduleCount = countScheduleEntries(value);
      if (scheduleCount > 0) {
        schedule += scheduleCount;
        hasDetails = true;
      }
    }
  });
  return {
    details: details,
    crew: crew,
    schedule: schedule,
    hasDetails: hasDetails
  };
}
function summarizeProjectCollection(collection) {
  var result = {
    details: 0,
    crew: 0,
    schedule: 0,
    hasProjectInfo: false
  };
  if (!collection) {
    return result;
  }
  var entries = Array.isArray(collection) ? collection : isPlainObject(collection) ? Object.values(collection) : [];
  entries.forEach(function (entry) {
    if (!entry) return;
    var info = null;
    if (isPlainObject(entry) && Object.prototype.hasOwnProperty.call(entry, 'projectInfo')) {
      info = entry.projectInfo;
    } else if (isPlainObject(entry) && isPlainObject(entry.project) && Object.prototype.hasOwnProperty.call(entry.project, 'projectInfo')) {
      info = entry.project.projectInfo;
    }
    if (!info) return;
    if (!result.hasProjectInfo) {
      result.hasProjectInfo = true;
    }
    var stats = summarizeProjectInfoStats(info);
    if (stats.hasDetails) {
      result.hasProjectInfo = true;
    }
    result.details += stats.details;
    result.crew += stats.crew;
    result.schedule += stats.schedule;
  });
  return result;
}
function summarizeCountsFromData(data) {
  var counts = createEmptyRestoreRehearsalCounts();
  var setups = isPlainObject(data) && isPlainObject(data.setups) ? data.setups : {};
  var rules = isPlainObject(data) && Array.isArray(data.autoGearRules) ? data.autoGearRules : [];
  var favorites = isPlainObject(data) && isPlainObject(data.favorites) ? data.favorites : {};
  var storedProjects = isPlainObject(data) ? summarizeProjectCollection(data.project) : {
    details: 0,
    crew: 0,
    schedule: 0,
    hasProjectInfo: false
  };
  var setupProjects = summarizeProjectCollection(setups);
  var projectDetails = Math.max(storedProjects.details, setupProjects.details);
  var projectCrew = Math.max(storedProjects.crew, setupProjects.crew);
  var projectSchedule = Math.max(storedProjects.schedule, setupProjects.schedule);
  counts.projects = countProjectsFromSetups(setups);
  counts.projectDetails = projectDetails;
  counts.projectCrew = projectCrew;
  counts.projectSchedules = projectSchedule;
  counts.rules = rules.length;
  counts.favorites = countFavoritesEntries(favorites);
  counts.deviceLibrary = countRestoreRehearsalDeviceEntries(isPlainObject(data) ? data.devices : null);
  var sessionState = isPlainObject(data) ? data.session : null;
  counts.sessionSnapshots = isPlainObject(sessionState) && Object.keys(sessionState).length ? 1 : 0;
  counts.feedbackDrafts = countRestoreRehearsalFeedbackDrafts(isPlainObject(data) ? data.feedback : null);
  counts.autoGearPresets = Array.isArray(data === null || data === void 0 ? void 0 : data.autoGearPresets) ? data.autoGearPresets.filter(Boolean).length : 0;
  counts.autoGearBackups = Array.isArray(data === null || data === void 0 ? void 0 : data.autoGearBackups) ? data.autoGearBackups.filter(Boolean).length : 0;
  counts.fullBackupHistory = Array.isArray(data === null || data === void 0 ? void 0 : data.fullBackupHistory) ? data.fullBackupHistory.filter(Boolean).length : 0;
  counts.customFonts = Array.isArray(data === null || data === void 0 ? void 0 : data.customFonts) ? data.customFonts.filter(function (entry) {
    if (!entry) return false;
    if (typeof entry === 'string') {
      return entry.trim().length > 0;
    }
    if (isPlainObject(entry)) {
      return Object.keys(entry).length > 0;
    }
    return false;
  }).length : 0;
  counts.customLogo = typeof (data === null || data === void 0 ? void 0 : data.customLogo) === 'string' && data.customLogo.trim() ? 1 : 0;
  var storedPreferences = isPlainObject(data === null || data === void 0 ? void 0 : data.preferences) ? data.preferences : null;
  counts.storedPreferences = storedPreferences && Object.keys(storedPreferences).length ? 1 : 0;
  var schemaCache = data === null || data === void 0 ? void 0 : data.schemaCache;
  if (typeof schemaCache === 'string') {
    counts.schemaCache = schemaCache.trim() ? 1 : 0;
  } else if (isPlainObject(schemaCache)) {
    counts.schemaCache = Object.keys(schemaCache).length ? 1 : 0;
  }
  return counts;
}
function bundleHasProject(bundle) {
  if (!isPlainObject(bundle)) return false;
  if (typeof bundle.setupName === 'string' && bundle.setupName.trim()) return true;
  if (typeof bundle.projectHtml === 'string' && bundle.projectHtml.trim()) return true;
  if (typeof bundle.gearList === 'string' && bundle.gearList.trim()) return true;
  if (isPlainObject(bundle.projectInfo) && Object.keys(bundle.projectInfo).length) return true;
  if (isPlainObject(bundle.gearSelectors) && Object.keys(bundle.gearSelectors).length) return true;
  var deviceFields = ['camera', 'monitor', 'video', 'cage', 'distance', 'batteryPlate', 'battery', 'batteryHotswap'];
  if (deviceFields.some(function (field) {
    return typeof bundle[field] === 'string' && bundle[field].trim();
  })) {
    return true;
  }
  if (Array.isArray(bundle.motors) && bundle.motors.some(Boolean)) return true;
  if (Array.isArray(bundle.controllers) && bundle.controllers.some(Boolean)) return true;
  return false;
}
var RESTORE_REHEARSAL_BACKUP_HINT_KEYS = ['data', 'payload', 'plannerData', 'allData', 'devices', 'setups', 'session', 'sessions', 'sessionStorage', 'sessionState', 'customLogo', 'customFonts', 'preferences', 'schemaCache', 'fullBackupHistory'];
var RESTORE_REHEARSAL_METRICS = [{
  key: 'projects',
  translationKey: 'restoreRehearsalMetricProjects',
  fallback: 'Projects',
  modes: ['backup', 'project']
}, {
  key: 'projectDetails',
  translationKey: 'restoreRehearsalMetricProjectDetails',
  fallback: 'Project details',
  modes: ['backup', 'project']
}, {
  key: 'projectCrew',
  translationKey: 'restoreRehearsalMetricCrew',
  fallback: 'Crew entries',
  modes: ['backup', 'project']
}, {
  key: 'projectSchedules',
  translationKey: 'restoreRehearsalMetricSchedule',
  fallback: 'Schedule entries',
  modes: ['backup', 'project']
}, {
  key: 'rules',
  translationKey: 'restoreRehearsalMetricRules',
  fallback: 'Rules',
  modes: ['backup', 'project']
}, {
  key: 'favorites',
  translationKey: 'restoreRehearsalMetricFavorites',
  fallback: 'Favorites',
  modes: ['backup', 'project']
}, {
  key: 'deviceLibrary',
  translationKey: 'restoreRehearsalMetricDeviceLibrary',
  fallback: 'Device library entries',
  modes: ['backup']
}, {
  key: 'sessionSnapshots',
  translationKey: 'restoreRehearsalMetricSession',
  fallback: 'Stored session snapshot',
  modes: ['backup']
}, {
  key: 'feedbackDrafts',
  translationKey: 'restoreRehearsalMetricFeedback',
  fallback: 'Feedback drafts',
  modes: ['backup']
}, {
  key: 'autoGearPresets',
  translationKey: 'restoreRehearsalMetricAutoPresets',
  fallback: 'Automatic gear presets',
  modes: ['backup']
}, {
  key: 'autoGearBackups',
  translationKey: 'restoreRehearsalMetricAutoBackups',
  fallback: 'Automatic gear backups',
  modes: ['backup']
}, {
  key: 'fullBackupHistory',
  translationKey: 'restoreRehearsalMetricBackupHistory',
  fallback: 'Backup history entries',
  modes: ['backup']
}, {
  key: 'customFonts',
  translationKey: 'restoreRehearsalMetricCustomFonts',
  fallback: 'Custom fonts',
  modes: ['backup']
}, {
  key: 'customLogo',
  translationKey: 'restoreRehearsalMetricCustomLogo',
  fallback: 'Custom logo saved',
  modes: ['backup']
}, {
  key: 'storedPreferences',
  translationKey: 'restoreRehearsalMetricPreferences',
  fallback: 'Stored preferences',
  modes: ['backup']
}, {
  key: 'schemaCache',
  translationKey: 'restoreRehearsalMetricSchemaCache',
  fallback: 'Device schema cache',
  modes: ['backup']
}];
var RESTORE_REHEARSAL_PROJECT_HINT_KEYS = ['setupName', 'camera', 'monitor', 'video', 'cage', 'distance', 'batteryPlate', 'battery', 'batteryHotswap', 'motors', 'controllers', 'project', 'projectInfo', 'projectHtml', 'gearList', 'gearSelectors', 'autoGearRules', 'favorites', 'feedback', 'changedDevices'];
function hasAnyRestoreRehearsalKeys(source, keys) {
  if (!isPlainObject(source)) {
    return false;
  }
  for (var _index7 = 0; _index7 < keys.length; _index7 += 1) {
    var key = keys[_index7];
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      return true;
    }
  }
  return false;
}
function looksLikeRestoreRehearsalProjectBundle(bundle) {
  if (!isPlainObject(bundle)) {
    return false;
  }
  if (bundleHasProject(bundle)) {
    return true;
  }
  if (hasAnyRestoreRehearsalKeys(bundle, RESTORE_REHEARSAL_PROJECT_HINT_KEYS)) {
    return true;
  }
  var nestedProject = isPlainObject(bundle.project) ? bundle.project : null;
  if (hasAnyRestoreRehearsalKeys(nestedProject, RESTORE_REHEARSAL_PROJECT_HINT_KEYS)) {
    return true;
  }
  return false;
}
function looksLikeRestoreRehearsalBackupPayload(payload) {
  if (!isPlainObject(payload)) {
    return false;
  }
  if (hasAnyRestoreRehearsalKeys(payload, RESTORE_REHEARSAL_BACKUP_HINT_KEYS)) {
    return true;
  }
  var candidateKeys = ['data', 'payload', 'plannerData', 'allData'];
  for (var i = 0; i < candidateKeys.length; i += 1) {
    var key = candidateKeys[i];
    if (hasAnyRestoreRehearsalKeys(payload[key], RESTORE_REHEARSAL_BACKUP_HINT_KEYS)) {
      return true;
    }
  }
  return false;
}
function summarizeProjectBundle(bundle) {
  var summary = createEmptyRestoreRehearsalCounts();
  if (!isPlainObject(bundle)) {
    return summary;
  }
  var favorites = isPlainObject(bundle.favorites) ? bundle.favorites : {};
  var projectInfo = null;
  if (isPlainObject(bundle.projectInfo) || typeof bundle.projectInfo === 'string') {
    projectInfo = bundle.projectInfo;
  } else if (isPlainObject(bundle.project) && (isPlainObject(bundle.project.projectInfo) || typeof bundle.project.projectInfo === 'string')) {
    projectInfo = bundle.project.projectInfo;
  }
  var projectStats = summarizeProjectInfoStats(projectInfo);
  summary.projects = bundleHasProject(bundle) ? 1 : 0;
  summary.projectDetails = projectStats.details;
  summary.projectCrew = projectStats.crew;
  summary.projectSchedules = projectStats.schedule;
  summary.rules = Array.isArray(bundle.autoGearRules) ? bundle.autoGearRules.length : 0;
  summary.favorites = countFavoritesEntries(favorites);
  return summary;
}
function getRestoreRehearsalLiveCounts() {
  var snapshot = getRestoreRehearsalLiveSnapshot();
  return snapshot && snapshot.counts ? snapshot.counts : {};
}
function getSelectedRestoreRehearsalMode() {
  if (!Array.isArray(restoreRehearsalModeInputs) || !restoreRehearsalModeInputs.length) {
    return 'backup';
  }
  var selected = restoreRehearsalModeInputs.find(function (input) {
    return input && input.checked;
  });
  return selected && typeof selected.value === 'string' ? selected.value : 'backup';
}
function buildRestoreRehearsalRows(liveCounts, sandboxCounts) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var lang = typeof currentLang === 'string' && texts[currentLang] ? currentLang : 'en';
  var langTexts = texts[lang] || texts.en || {};
  var mode = typeof options.mode === 'string' ? options.mode : 'backup';
  var metrics = RESTORE_REHEARSAL_METRICS.filter(function (metric) {
    return metric.modes.includes(mode);
  }).map(function (metric) {
    return {
      key: metric.key,
      label: langTexts[metric.translationKey] || metric.fallback
    };
  });
  return metrics.map(function (metric) {
    var live = typeof liveCounts[metric.key] === 'number' ? liveCounts[metric.key] : 0;
    var sandbox = typeof sandboxCounts[metric.key] === 'number' ? sandboxCounts[metric.key] : 0;
    return {
      key: metric.key,
      label: metric.label,
      live: live,
      sandbox: sandbox,
      diff: sandbox - live
    };
  });
}
function normalizeRestoreRehearsalScenarioLogic(value) {
  if (typeof value !== 'string') {
    return 'all';
  }
  var normalized = value.trim().toLowerCase();
  if (!normalized) {
    return 'all';
  }
  if (normalized === 'any' || normalized === 'or') {
    return 'any';
  }
  if (normalized === 'multiplier' || normalized === 'multiply') {
    return 'multiplier';
  }
  return 'all';
}
function normalizeRestoreRehearsalScenarioMultiplier(value) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === 'string') {
    var trimmed = value.trim();
    if (trimmed) {
      var parsed = Number(trimmed);
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
  }
  return 1;
}
function normalizeRestoreRehearsalRuleItems(items) {
  if (!Array.isArray(items)) {
    return [];
  }
  var normalizedItems = items.map(function (item) {
    if (!isPlainObject(item)) return null;
    var name = typeof item.name === 'string' ? item.name.trim() : '';
    if (!name) return null;
    var category = typeof item.category === 'string' ? item.category.trim() : '';
    var quantity = 1;
    if (typeof item.quantity === 'number' && Number.isFinite(item.quantity)) {
      quantity = item.quantity;
    } else if (typeof item.quantity === 'string') {
      var trimmedQuantity = item.quantity.trim();
      if (trimmedQuantity) {
        var parsedQuantity = Number(trimmedQuantity);
        if (Number.isFinite(parsedQuantity)) {
          quantity = parsedQuantity;
        }
      }
    }
    var notes = typeof item.notes === 'string' ? item.notes.trim() : '';
    var screenSize = typeof item.screenSize === 'string' ? item.screenSize.trim() : '';
    var selectorType = typeof item.selectorType === 'string' ? item.selectorType.trim() : '';
    var selectorDefault = typeof item.selectorDefault === 'string' ? item.selectorDefault.trim() : '';
    var selectorEnabled = Boolean(item.selectorEnabled);
    var contextNotes = Array.isArray(item.contextNotes) ? item.contextNotes.map(function (note) {
      return typeof note === 'string' ? note.trim() : '';
    }).filter(Boolean) : [];
    contextNotes.sort(function (a, b) {
      return a.localeCompare(b);
    });
    var normalized = {
      id: typeof item.id === 'string' ? item.id : '',
      name: name,
      category: category,
      quantity: quantity,
      notes: notes,
      screenSize: screenSize,
      selectorType: selectorType,
      selectorDefault: selectorDefault,
      selectorEnabled: selectorEnabled,
      contextNotes: contextNotes
    };
    var signatureSource = {
      name: name,
      category: category,
      quantity: quantity,
      notes: notes,
      screenSize: screenSize,
      selectorType: selectorType,
      selectorDefault: selectorDefault,
      selectorEnabled: selectorEnabled,
      contextNotes: contextNotes
    };
    normalized.signature = JSON.stringify(signatureSource);
    return normalized;
  }).filter(Boolean);
  normalizedItems.sort(function (a, b) {
    var categoryA = a.category || '';
    var categoryB = b.category || '';
    if (categoryA !== categoryB) {
      return categoryA.localeCompare(categoryB);
    }
    return a.name.localeCompare(b.name);
  });
  return normalizedItems;
}
function formatRestoreRehearsalRuleItem(item) {
  if (!item) {
    return '';
  }
  var quantity = item.quantity;
  var hasQuantity = quantity !== undefined && quantity !== null && quantity !== 1;
  var displayQuantity = hasQuantity ? " \xD7".concat(formatNumberForComparison(quantity)) : '';
  var categorySuffix = item.category ? " (".concat(item.category, ")") : '';
  var notesSuffix = item.notes ? " \u2014 ".concat(item.notes) : '';
  var contextSuffix = Array.isArray(item.contextNotes) && item.contextNotes.length ? " (".concat(item.contextNotes.join(', '), ")") : '';
  var screenSuffix = item.screenSize ? " [".concat(item.screenSize, "]") : '';
  var selectorParts = [];
  if (item.selectorType && item.selectorType !== 'none') {
    selectorParts.push(item.selectorType);
  }
  if (item.selectorDefault) {
    selectorParts.push(item.selectorDefault);
  }
  var selectorSuffix = selectorParts.length ? " {".concat(selectorParts.join(': '), "}") : '';
  return "".concat(item.name).concat(categorySuffix).concat(displayQuantity).concat(notesSuffix).concat(contextSuffix).concat(screenSuffix).concat(selectorSuffix);
}
function normalizeRestoreRehearsalRule(rule, index, origin) {
  if (!isPlainObject(rule)) {
    return null;
  }
  var normalized = {
    id: typeof rule.id === 'string' ? rule.id : '',
    label: typeof rule.label === 'string' ? rule.label.trim() : '',
    always: Boolean(rule.always)
  };
  normalized.scenarioLogic = normalizeRestoreRehearsalScenarioLogic(rule.scenarioLogic);
  normalized.scenarioMultiplier = normalizeRestoreRehearsalScenarioMultiplier(rule.scenarioMultiplier);
  if (normalized.scenarioLogic !== 'multiplier') {
    normalized.scenarioMultiplier = 1;
  }
  normalized.scenarioPrimary = typeof rule.scenarioPrimary === 'string' ? rule.scenarioPrimary.trim() : '';
  var scenarios = Array.isArray(rule.scenarios) ? rule.scenarios.map(function (value) {
    return typeof value === 'string' ? value.trim() : '';
  }).filter(Boolean) : [];
  var scenarioSet = new Set(scenarios);
  normalized.scenarios = Array.from(scenarioSet).sort(function (a, b) {
    return a.localeCompare(b);
  });
  normalized.addItems = normalizeRestoreRehearsalRuleItems(rule.add);
  normalized.removeItems = normalizeRestoreRehearsalRuleItems(rule.remove);
  var addSignatures = normalized.addItems.map(function (item) {
    return item.signature;
  }).sort();
  var removeSignatures = normalized.removeItems.map(function (item) {
    return item.signature;
  }).sort();
  normalized.signature = JSON.stringify({
    always: normalized.always,
    scenarioLogic: normalized.scenarioLogic,
    scenarioPrimary: normalized.scenarioPrimary,
    scenarioMultiplier: normalized.scenarioMultiplier,
    scenarios: normalized.scenarios,
    add: addSignatures,
    remove: removeSignatures
  });
  var fallbackParts = [normalized.label.toLowerCase(), normalized.scenarios.join('|').toLowerCase(), normalized.addItems.map(function (item) {
    return item.name.toLowerCase();
  }).join('|'), normalized.removeItems.map(function (item) {
    return item.name.toLowerCase();
  }).join('|')].filter(Boolean);
  var fallbackSignature = fallbackParts.join('::');
  normalized.matchKey = normalized.id ? "id:".concat(normalized.id) : fallbackSignature ? "fallback:".concat(fallbackSignature) : "index:".concat(origin, ":").concat(index);
  normalized.entryKey = "".concat(normalized.matchKey, "|").concat(origin, "|").concat(index);
  if (normalized.label) {
    normalized.displayName = normalized.label;
  } else if (normalized.scenarios.length) {
    normalized.displayName = normalized.scenarios.join(' + ');
  } else if (normalized.id) {
    normalized.displayName = normalized.id;
  } else {
    normalized.displayName = "Rule ".concat(index + 1);
  }
  return normalized;
}
function normalizeRestoreRehearsalRules(value) {
  var origin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'sandbox';
  if (!Array.isArray(value)) {
    return [];
  }
  return value.map(function (rule, index) {
    return normalizeRestoreRehearsalRule(rule, index, origin);
  }).filter(Boolean);
}
function indexRestoreRehearsalRules(rules) {
  var map = new Map();
  if (!Array.isArray(rules)) {
    return map;
  }
  rules.forEach(function (rule) {
    if (!rule || !rule.matchKey) return;
    var bucket = map.get(rule.matchKey);
    if (bucket) {
      bucket.push(rule);
    } else {
      map.set(rule.matchKey, [rule]);
    }
  });
  return map;
}
function buildRestoreRehearsalRuleDiff(liveRules, sandboxRules) {
  var liveList = Array.isArray(liveRules) ? liveRules : [];
  var sandboxList = Array.isArray(sandboxRules) ? sandboxRules : [];
  var liveIndex = indexRestoreRehearsalRules(liveList);
  var unmatchedLive = new Set(liveList.filter(Boolean));
  var differences = [];
  sandboxList.forEach(function (sandboxRule) {
    if (!sandboxRule) return;
    var liveRule = null;
    var bucket = sandboxRule.matchKey ? liveIndex.get(sandboxRule.matchKey) : null;
    if (bucket && bucket.length) {
      liveRule = bucket.shift();
      if (!bucket.length) {
        liveIndex.delete(sandboxRule.matchKey);
      }
    }
    if (liveRule) {
      unmatchedLive.delete(liveRule);
      if (liveRule.signature !== sandboxRule.signature) {
        differences.push({
          status: 'changed',
          label: sandboxRule.displayName || liveRule.displayName,
          live: liveRule,
          sandbox: sandboxRule,
          key: "changed:".concat(sandboxRule.entryKey)
        });
      }
    } else {
      differences.push({
        status: 'added',
        label: sandboxRule.displayName,
        live: null,
        sandbox: sandboxRule,
        key: "added:".concat(sandboxRule.entryKey)
      });
    }
  });
  unmatchedLive.forEach(function (liveRule) {
    if (!liveRule) return;
    differences.push({
      status: 'removed',
      label: liveRule.displayName,
      live: liveRule,
      sandbox: null,
      key: "removed:".concat(liveRule.entryKey)
    });
  });
  var compareStrings = typeof localeSort === 'function' ? function (a, b) {
    return localeSort(a, b);
  } : function (a, b) {
    return a.localeCompare(b);
  };
  var statusPriority = {
    changed: 0,
    removed: 1,
    added: 2
  };
  return differences.sort(function (a, b) {
    var _statusPriority$a$sta, _statusPriority$b$sta;
    var priorityA = (_statusPriority$a$sta = statusPriority[a.status]) !== null && _statusPriority$a$sta !== void 0 ? _statusPriority$a$sta : Number.MAX_SAFE_INTEGER;
    var priorityB = (_statusPriority$b$sta = statusPriority[b.status]) !== null && _statusPriority$b$sta !== void 0 ? _statusPriority$b$sta : Number.MAX_SAFE_INTEGER;
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }
    return compareStrings(a.label || '', b.label || '');
  });
}
function formatRestoreRehearsalRuleScenarioLines(rule, langTexts) {
  var _texts$currentLang, _fallbackTexts$projec;
  if (!rule) {
    return [];
  }
  var fallbackTexts = texts.en || {};
  var logicLabel = langTexts.restoreRehearsalRuleLogicLabel || fallbackTexts.restoreRehearsalRuleLogicLabel || 'Scenario logic';
  var baseLabel = langTexts.restoreRehearsalRuleBaseLabel || fallbackTexts.restoreRehearsalRuleBaseLabel || 'Base scenario';
  var multiplierLabel = langTexts.restoreRehearsalRuleMultiplierLabel || fallbackTexts.restoreRehearsalRuleMultiplierLabel || 'Multiplier';
  var requiredLabel = langTexts.restoreRehearsalRuleRequiredLabel || ((_texts$currentLang = texts[currentLang]) === null || _texts$currentLang === void 0 || (_texts$currentLang = _texts$currentLang.projectFields) === null || _texts$currentLang === void 0 ? void 0 : _texts$currentLang.requiredScenarios) || ((_fallbackTexts$projec = fallbackTexts.projectFields) === null || _fallbackTexts$projec === void 0 ? void 0 : _fallbackTexts$projec.requiredScenarios) || 'Required scenarios';
  var alwaysLabel = langTexts.restoreRehearsalRuleAlwaysLabel || fallbackTexts.restoreRehearsalRuleAlwaysLabel || 'Always active';
  var noneLabel = langTexts.restoreRehearsalRuleNone || fallbackTexts.restoreRehearsalRuleNone || 'None';
  var logicText = fallbackTexts.autoGearScenarioModeAll || 'Require every selected scenario';
  if (rule.scenarioLogic === 'any') {
    var _texts$currentLang2;
    logicText = ((_texts$currentLang2 = texts[currentLang]) === null || _texts$currentLang2 === void 0 ? void 0 : _texts$currentLang2.autoGearScenarioModeAny) || fallbackTexts.autoGearScenarioModeAny || 'Match any selected scenario';
  } else if (rule.scenarioLogic === 'multiplier') {
    var _texts$currentLang3;
    logicText = ((_texts$currentLang3 = texts[currentLang]) === null || _texts$currentLang3 === void 0 ? void 0 : _texts$currentLang3.autoGearScenarioModeMultiplier) || fallbackTexts.autoGearScenarioModeMultiplier || 'Multiply when combined';
  } else {
    var _texts$currentLang4;
    logicText = ((_texts$currentLang4 = texts[currentLang]) === null || _texts$currentLang4 === void 0 ? void 0 : _texts$currentLang4.autoGearScenarioModeAll) || fallbackTexts.autoGearScenarioModeAll || 'Require every selected scenario';
  }
  var lines = ["".concat(logicLabel, ": ").concat(logicText)];
  if (rule.scenarioPrimary) {
    lines.push("".concat(baseLabel, ": ").concat(rule.scenarioPrimary));
  }
  if (rule.scenarioLogic === 'multiplier' && rule.scenarioMultiplier !== 1) {
    lines.push("".concat(multiplierLabel, ": \xD7").concat(formatNumberForComparison(rule.scenarioMultiplier)));
  }
  if (rule.scenarios && rule.scenarios.length) {
    lines.push("".concat(requiredLabel, ": ").concat(rule.scenarios.join(' + ')));
  } else {
    lines.push("".concat(requiredLabel, ": ").concat(noneLabel));
  }
  if (rule.always) {
    lines.push(alwaysLabel);
  }
  return lines;
}
function createRestoreRehearsalRuleList(entries, emptyText) {
  var list = document.createElement('ul');
  list.className = 'restore-rehearsal-rule-list';
  var lines = Array.isArray(entries) ? entries.filter(function (line) {
    return typeof line === 'string' && line.trim();
  }) : [];
  if (!lines.length) {
    var emptyItem = document.createElement('li');
    emptyItem.textContent = emptyText;
    list.appendChild(emptyItem);
    return list;
  }
  lines.forEach(function (line) {
    var item = document.createElement('li');
    item.textContent = line;
    list.appendChild(item);
  });
  return list;
}
function createRestoreRehearsalRuleSection(label, entries, emptyText) {
  var section = document.createElement('div');
  section.className = 'restore-rehearsal-rule-section';
  var heading = document.createElement('span');
  heading.className = 'restore-rehearsal-rule-section-label';
  heading.textContent = label;
  section.appendChild(heading);
  section.appendChild(createRestoreRehearsalRuleList(entries, emptyText));
  return section;
}
function createRestoreRehearsalRuleColumn(title, rule, variant, langTexts, emptyText) {
  var _texts$en, _texts$en2, _texts$en3;
  var column = document.createElement('div');
  column.className = 'restore-rehearsal-rule-column';
  if (variant) {
    column.classList.add("restore-rehearsal-rule-column--".concat(variant));
  }
  var heading = document.createElement('div');
  heading.className = 'restore-rehearsal-rule-column-title';
  heading.textContent = title;
  column.appendChild(heading);
  var additions = rule ? rule.addItems.map(function (item) {
    return formatRestoreRehearsalRuleItem(item);
  }).filter(Boolean) : [];
  column.appendChild(createRestoreRehearsalRuleSection(langTexts.restoreRehearsalRuleAddsLabel || ((_texts$en = texts.en) === null || _texts$en === void 0 ? void 0 : _texts$en.restoreRehearsalRuleAddsLabel) || 'Automatic additions', additions, emptyText));
  var removals = rule ? rule.removeItems.map(function (item) {
    return formatRestoreRehearsalRuleItem(item);
  }).filter(Boolean) : [];
  column.appendChild(createRestoreRehearsalRuleSection(langTexts.restoreRehearsalRuleRemovesLabel || ((_texts$en2 = texts.en) === null || _texts$en2 === void 0 ? void 0 : _texts$en2.restoreRehearsalRuleRemovesLabel) || 'Automatic removals', removals, emptyText));
  var scenarioLines = formatRestoreRehearsalRuleScenarioLines(rule, langTexts);
  column.appendChild(createRestoreRehearsalRuleSection(langTexts.restoreRehearsalRuleScenariosLabel || ((_texts$en3 = texts.en) === null || _texts$en3 === void 0 ? void 0 : _texts$en3.restoreRehearsalRuleScenariosLabel) || 'Scenario scope', scenarioLines, emptyText));
  return column;
}
function renderRestoreRehearsalRuleDiff(differences) {
  var _texts$en5, _texts$en6, _texts$en7;
  if (!restoreRehearsalRuleSectionEl || !restoreRehearsalRuleListEl || !restoreRehearsalRuleEmptyEl) {
    return;
  }
  var lang = typeof currentLang === 'string' && texts[currentLang] ? currentLang : 'en';
  var langTexts = texts[lang] || texts.en || {};
  restoreRehearsalRuleListEl.innerHTML = '';
  var hasDifferences = Array.isArray(differences) && differences.length > 0;
  if (!hasDifferences) {
    if (restoreRehearsalRuleEmptyEl) {
      var _texts$en4;
      restoreRehearsalRuleEmptyEl.textContent = langTexts.restoreRehearsalRuleEmpty || ((_texts$en4 = texts.en) === null || _texts$en4 === void 0 ? void 0 : _texts$en4.restoreRehearsalRuleEmpty) || 'No automatic gear rule differences found.';
      restoreRehearsalRuleEmptyEl.removeAttribute('hidden');
    }
    restoreRehearsalRuleSectionEl.removeAttribute('hidden');
    if (restoreRehearsalActionsEl) {
      restoreRehearsalActionsEl.removeAttribute('hidden');
    }
    return;
  }
  restoreRehearsalRuleEmptyEl.setAttribute('hidden', '');
  var liveTitle = langTexts.restoreRehearsalLiveColumn || ((_texts$en5 = texts.en) === null || _texts$en5 === void 0 ? void 0 : _texts$en5.restoreRehearsalLiveColumn) || 'Live profile';
  var sandboxTitle = langTexts.restoreRehearsalSandboxColumn || ((_texts$en6 = texts.en) === null || _texts$en6 === void 0 ? void 0 : _texts$en6.restoreRehearsalSandboxColumn) || 'Sandbox import';
  var emptyText = langTexts.restoreRehearsalRuleNone || ((_texts$en7 = texts.en) === null || _texts$en7 === void 0 ? void 0 : _texts$en7.restoreRehearsalRuleNone) || 'None';
  differences.forEach(function (entry) {
    var _entry$sandbox, _entry$live, _texts$en8;
    if (!entry) return;
    var item = document.createElement('li');
    var typeClass = entry.status ? " diff-".concat(entry.status) : '';
    item.className = "diff-entry".concat(typeClass);
    var header = document.createElement('div');
    header.className = 'diff-entry-header';
    var path = document.createElement('div');
    path.className = 'diff-path';
    var fallbackLabel = entry.label || ((_entry$sandbox = entry.sandbox) === null || _entry$sandbox === void 0 ? void 0 : _entry$sandbox.displayName) || ((_entry$live = entry.live) === null || _entry$live === void 0 ? void 0 : _entry$live.displayName) || langTexts.restoreRehearsalRuleFallback || ((_texts$en8 = texts.en) === null || _texts$en8 === void 0 ? void 0 : _texts$en8.restoreRehearsalRuleFallback) || 'Automatic rule change';
    path.textContent = fallbackLabel;
    header.appendChild(path);
    header.appendChild(createDiffStatusBadge(entry.status || 'changed'));
    item.appendChild(header);
    var columns = document.createElement('div');
    columns.className = 'restore-rehearsal-rule-columns';
    if (entry.status === 'changed') {
      columns.classList.add('restore-rehearsal-rule-columns--split');
    }
    if (entry.live) {
      var variant = entry.status === 'added' ? null : 'removed';
      columns.appendChild(createRestoreRehearsalRuleColumn(liveTitle, entry.live, variant, langTexts, emptyText));
    }
    if (entry.sandbox) {
      var _variant = entry.status === 'removed' ? null : 'added';
      columns.appendChild(createRestoreRehearsalRuleColumn(sandboxTitle, entry.sandbox, _variant, langTexts, emptyText));
    }
    item.appendChild(columns);
    restoreRehearsalRuleListEl.appendChild(item);
  });
  restoreRehearsalRuleSectionEl.removeAttribute('hidden');
  if (restoreRehearsalActionsEl) {
    restoreRehearsalActionsEl.removeAttribute('hidden');
  }
}
function getRestoreRehearsalLiveSnapshot() {
  var snapshot = typeof exportAllData === 'function' ? exportAllData() : {};
  var data = isPlainObject(snapshot) ? snapshot : {};
  return {
    counts: summarizeCountsFromData(data),
    rules: normalizeRestoreRehearsalRules(data.autoGearRules, 'live')
  };
}
function resetRestoreRehearsalState() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _ref4 = options || {},
    _ref4$keepStatus = _ref4.keepStatus,
    keepStatus = _ref4$keepStatus === void 0 ? false : _ref4$keepStatus;
  if (restoreRehearsalFileNameEl) {
    var _texts$en9, _texts$lang;
    var lang = typeof currentLang === 'string' && texts[currentLang] ? currentLang : 'en';
    var fallback = ((_texts$en9 = texts.en) === null || _texts$en9 === void 0 ? void 0 : _texts$en9.restoreRehearsalNoFile) || 'No file selected yet.';
    var message = ((_texts$lang = texts[lang]) === null || _texts$lang === void 0 ? void 0 : _texts$lang.restoreRehearsalNoFile) || fallback;
    restoreRehearsalFileNameEl.textContent = message;
  }
  if (!keepStatus && restoreRehearsalStatusEl) {
    var _texts$en0, _texts$_lang;
    var _lang = typeof currentLang === 'string' && texts[currentLang] ? currentLang : 'en';
    var _fallback = ((_texts$en0 = texts.en) === null || _texts$en0 === void 0 ? void 0 : _texts$en0.restoreRehearsalReady) || '';
    restoreRehearsalStatusEl.textContent = ((_texts$_lang = texts[_lang]) === null || _texts$_lang === void 0 ? void 0 : _texts$_lang.restoreRehearsalReady) || _fallback;
  }
  if (restoreRehearsalTableEl) {
    restoreRehearsalTableEl.setAttribute('hidden', '');
  }
  if (restoreRehearsalTableBodyEl) {
    while (restoreRehearsalTableBodyEl.firstChild) {
      restoreRehearsalTableBodyEl.removeChild(restoreRehearsalTableBodyEl.firstChild);
    }
  }
  if (restoreRehearsalRuleSectionEl) {
    restoreRehearsalRuleSectionEl.setAttribute('hidden', '');
  }
  if (restoreRehearsalRuleListEl) {
    restoreRehearsalRuleListEl.innerHTML = '';
  }
  if (restoreRehearsalRuleEmptyEl) {
    restoreRehearsalRuleEmptyEl.setAttribute('hidden', '');
  }
  if (restoreRehearsalActionsEl) {
    restoreRehearsalActionsEl.setAttribute('hidden', '');
  }
  restoreRehearsalLastSnapshot = null;
  if (restoreRehearsalInputEl) {
    restoreRehearsalInputEl.value = '';
  }
}
function openRestoreRehearsal() {
  if (!restoreRehearsalSectionEl) return;
  restoreRehearsalSectionEl.removeAttribute('hidden');
  resetRestoreRehearsalState();
  if (restoreRehearsalHeadingEl && typeof restoreRehearsalHeadingEl.focus === 'function') {
    restoreRehearsalHeadingEl.focus({
      preventScroll: true
    });
  }
}
function closeRestoreRehearsal() {
  resetRestoreRehearsalState();
  if (restoreRehearsalSectionEl) {
    restoreRehearsalSectionEl.setAttribute('hidden', '');
  }
}
function readFileAsText(file) {
  if (!file) {
    return Promise.reject(new Error('No file provided'));
  }
  if (typeof file.text === 'function') {
    return Promise.resolve().then(function () {
      return file.text();
    });
  }
  return new Promise(function (resolve, reject) {
    if (typeof FileReader !== 'function') {
      reject(new Error('No supported file reader available'));
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
      reader.readAsText(file);
    } catch (error) {
      reject(error);
    }
  });
}
function formatRestoreRehearsalSummary(rows) {
  var _texts$en10;
  var lang = typeof currentLang === 'string' && texts[currentLang] ? currentLang : 'en';
  var langTexts = texts[lang] || texts.en || {};
  var joiner = langTexts.restoreRehearsalDifferenceListJoin || ', ';
  var diffs = rows.filter(function (row) {
    return row.diff !== 0;
  }).map(function (row) {
    return "".concat(row.label, " (").concat(row.diff > 0 ? '+' : '−').concat(Math.abs(row.diff), ")");
  });
  if (!diffs.length) {
    var _texts$en1;
    return langTexts.restoreRehearsalMatch || ((_texts$en1 = texts.en) === null || _texts$en1 === void 0 ? void 0 : _texts$en1.restoreRehearsalMatch) || 'All counts match. The sandbox was cleared automatically.';
  }
  var template = langTexts.restoreRehearsalMismatch || ((_texts$en10 = texts.en) === null || _texts$en10 === void 0 ? void 0 : _texts$en10.restoreRehearsalMismatch) || 'Differences detected: %s. The sandbox was cleared automatically.';
  return template.replace('%s', diffs.join(joiner));
}
function applyRestoreRehearsalDifferenceCell(cell, label, diff) {
  var _texts$en12, _texts$en13;
  if (!cell) return;
  var lang = typeof currentLang === 'string' && texts[currentLang] ? currentLang : 'en';
  var langTexts = texts[lang] || texts.en || {};
  cell.textContent = '';
  cell.classList.remove('restore-rehearsal-diff-match', 'restore-rehearsal-diff-positive', 'restore-rehearsal-diff-negative');
  if (diff === 0) {
    var _texts$en11;
    var text = langTexts.restoreRehearsalMatchLabel || ((_texts$en11 = texts.en) === null || _texts$en11 === void 0 ? void 0 : _texts$en11.restoreRehearsalMatchLabel) || 'Match';
    cell.textContent = text;
    cell.classList.add('restore-rehearsal-diff-match');
    cell.setAttribute('aria-label', "".concat(label, " ").concat(text));
    return;
  }
  var abs = Math.abs(diff);
  var template = diff > 0 ? langTexts.restoreRehearsalIncreaseLabel || ((_texts$en12 = texts.en) === null || _texts$en12 === void 0 ? void 0 : _texts$en12.restoreRehearsalIncreaseLabel) || 'Sandbox includes %d more %s.' : langTexts.restoreRehearsalDecreaseLabel || ((_texts$en13 = texts.en) === null || _texts$en13 === void 0 ? void 0 : _texts$en13.restoreRehearsalDecreaseLabel) || 'Sandbox includes %d fewer %s.';
  var display = "".concat(diff > 0 ? '+' : '−').concat(abs);
  cell.textContent = display;
  cell.setAttribute('aria-label', template.replace('%d', abs).replace('%s', label));
  cell.classList.add(diff > 0 ? 'restore-rehearsal-diff-positive' : 'restore-rehearsal-diff-negative');
}
function renderRestoreRehearsalResults(rows, ruleDiff) {
  if (!restoreRehearsalTableBodyEl || !restoreRehearsalStatusEl) return;
  while (restoreRehearsalTableBodyEl.firstChild) {
    restoreRehearsalTableBodyEl.removeChild(restoreRehearsalTableBodyEl.firstChild);
  }
  rows.forEach(function (row) {
    var tr = document.createElement('tr');
    var metricCell = document.createElement('th');
    metricCell.scope = 'row';
    metricCell.textContent = row.label;
    tr.appendChild(metricCell);
    var liveCell = document.createElement('td');
    liveCell.textContent = String(row.live);
    tr.appendChild(liveCell);
    var sandboxCell = document.createElement('td');
    sandboxCell.textContent = String(row.sandbox);
    tr.appendChild(sandboxCell);
    var diffCell = document.createElement('td');
    applyRestoreRehearsalDifferenceCell(diffCell, row.label, row.diff);
    tr.appendChild(diffCell);
    restoreRehearsalTableBodyEl.appendChild(tr);
  });
  if (restoreRehearsalTableEl) {
    restoreRehearsalTableEl.removeAttribute('hidden');
  }
  restoreRehearsalStatusEl.textContent = formatRestoreRehearsalSummary(rows);
  renderRestoreRehearsalRuleDiff(Array.isArray(ruleDiff) ? ruleDiff : []);
}
function countRestoreRehearsalDeviceEntries(devices) {
  if (typeof countDeviceDatabaseEntries === 'function') {
    try {
      var direct = countDeviceDatabaseEntries(devices);
      if (typeof direct === 'number' && Number.isFinite(direct)) {
        return direct;
      }
    } catch (deviceCountError) {
      console.warn('Primary device counting failed during restore rehearsal', deviceCountError);
    }
  }
  var skipKeys = new Set(['filterOptions', 'None']);
  var isEntryObject = function isEntryObject(value) {
    if (!isPlainObject(value)) {
      return false;
    }
    return Object.values(value).some(function (entry) {
      return entry === null || _typeof(entry) !== 'object' || Array.isArray(entry);
    });
  };
  var _fallbackCount = function fallbackCount(collection) {
    if (!isPlainObject(collection)) {
      return 0;
    }
    var total = 0;
    Object.entries(collection).forEach(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
        name = _ref6[0],
        value = _ref6[1];
      if (!name || skipKeys.has(name)) {
        return;
      }
      if (isEntryObject(value)) {
        total += 1;
        return;
      }
      total += _fallbackCount(value);
    });
    return total;
  };
  return _fallbackCount(devices);
}
function countRestoreRehearsalFeedbackDrafts(feedback) {
  if (!isPlainObject(feedback)) {
    return 0;
  }
  return Object.values(feedback).reduce(function (total, entry) {
    if (!entry) {
      return total;
    }
    if (Array.isArray(entry)) {
      return total + entry.filter(Boolean).length;
    }
    if (typeof entry === 'string') {
      return entry.trim() ? total + 1 : total;
    }
    if (isPlainObject(entry)) {
      return Object.keys(entry).length ? total + 1 : total;
    }
    return total + 1;
  }, 0);
}
function runRestoreRehearsal(file) {
  if (!file) return;
  var lang = typeof currentLang === 'string' && texts[currentLang] ? currentLang : 'en';
  var langTexts = texts[lang] || texts.en || {};
  if (restoreRehearsalStatusEl) {
    var _texts$en14;
    var processingText = langTexts.restoreRehearsalProcessing || ((_texts$en14 = texts.en) === null || _texts$en14 === void 0 ? void 0 : _texts$en14.restoreRehearsalProcessing) || 'Loading file in an isolated sandbox…';
    restoreRehearsalStatusEl.textContent = processingText;
  }
  readFileAsText(file).then(function (raw) {
    var mode = getSelectedRestoreRehearsalMode();
    var sandboxCounts;
    var sandboxRules = [];
    if (mode === 'project') {
      var sanitizedPayload = sanitizeBackupPayload(raw);
      if (!sanitizedPayload || !sanitizedPayload.trim()) {
        var mismatchError = new Error('Restore rehearsal received an empty project bundle.');
        mismatchError.code = 'restore-rehearsal-project-mismatch';
        throw mismatchError;
      }
      var parsed = JSON.parse(sanitizedPayload);
      if (!looksLikeRestoreRehearsalProjectBundle(parsed)) {
        var _mismatchError = new Error('Restore rehearsal received an unrecognized project bundle.');
        _mismatchError.code = 'restore-rehearsal-project-mismatch';
        throw _mismatchError;
      }
      sandboxCounts = summarizeProjectBundle(parsed);
      sandboxRules = normalizeRestoreRehearsalRules(parsed.autoGearRules, 'sandbox');
    } else {
      var _sanitizedPayload = sanitizeBackupPayload(raw);
      if (!_sanitizedPayload || !_sanitizedPayload.trim()) {
        throw new Error('Backup payload empty');
      }
      var _parsed = JSON.parse(_sanitizedPayload);
      if (!looksLikeRestoreRehearsalBackupPayload(_parsed)) {
        var _mismatchError2 = new Error('Restore rehearsal received an unrecognized backup payload.');
        _mismatchError2.code = 'restore-rehearsal-backup-mismatch';
        throw _mismatchError2;
      }
      var _extractBackupSection = extractBackupSections(_parsed),
        data = _extractBackupSection.data;
      var normalizedData = isPlainObject(data) ? data : {};
      sandboxCounts = summarizeCountsFromData(normalizedData);
      sandboxRules = normalizeRestoreRehearsalRules(normalizedData.autoGearRules, 'sandbox');
    }
    var liveSnapshot = getRestoreRehearsalLiveSnapshot();
    var liveCounts = liveSnapshot && isPlainObject(liveSnapshot.counts) ? liveSnapshot.counts : {};
    var liveRules = liveSnapshot && Array.isArray(liveSnapshot.rules) ? liveSnapshot.rules : [];
    var rows = buildRestoreRehearsalRows(liveCounts, sandboxCounts, {
      mode: mode
    });
    var ruleDiff = buildRestoreRehearsalRuleDiff(liveRules, sandboxRules);
    renderRestoreRehearsalResults(rows, ruleDiff);
    restoreRehearsalLastSnapshot = {
      fileName: typeof file.name === 'string' ? file.name : '',
      mode: mode,
      processedAt: Date.now(),
      live: {
        counts: liveCounts,
        rules: liveRules
      },
      sandbox: {
        counts: sandboxCounts,
        rules: sandboxRules
      },
      diff: ruleDiff
    };
    if (restoreRehearsalInputEl) {
      restoreRehearsalInputEl.value = '';
    }
  }).catch(function (error) {
    console.warn('Restore rehearsal failed', error);
    restoreRehearsalLastSnapshot = null;
    if (restoreRehearsalStatusEl) {
      var failureMessage;
      if (error && error.code === 'restore-rehearsal-project-mismatch') {
        var _texts$en15;
        failureMessage = langTexts.restoreRehearsalProjectMismatch || ((_texts$en15 = texts.en) === null || _texts$en15 === void 0 ? void 0 : _texts$en15.restoreRehearsalProjectMismatch);
      } else if (error && error.code === 'restore-rehearsal-backup-mismatch') {
        var _texts$en16;
        failureMessage = langTexts.restoreRehearsalBackupMismatch || ((_texts$en16 = texts.en) === null || _texts$en16 === void 0 ? void 0 : _texts$en16.restoreRehearsalBackupMismatch);
      }
      if (!failureMessage) {
        var _texts$en17;
        failureMessage = langTexts.restoreRehearsalError || ((_texts$en17 = texts.en) === null || _texts$en17 === void 0 ? void 0 : _texts$en17.restoreRehearsalError) || 'Restore rehearsal failed. Check the file and try again.';
      }
      restoreRehearsalStatusEl.textContent = failureMessage;
    }
    if (restoreRehearsalTableEl) {
      restoreRehearsalTableEl.setAttribute('hidden', '');
    }
    if (restoreRehearsalRuleSectionEl) {
      restoreRehearsalRuleSectionEl.setAttribute('hidden', '');
    }
    if (restoreRehearsalActionsEl) {
      restoreRehearsalActionsEl.setAttribute('hidden', '');
    }
  }).finally(function () {
    if (restoreRehearsalInputEl) {
      try {
        restoreRehearsalInputEl.value = '';
      } catch (resetError) {
        void resetError;
      }
    }
  });
}
function handleRestoreRehearsalProceed() {
  var _texts$en19;
  var lang = typeof currentLang === 'string' && texts[currentLang] ? currentLang : 'en';
  var langTexts = texts[lang] || texts.en || {};
  if (!restoreRehearsalLastSnapshot) {
    if (restoreRehearsalStatusEl) {
      var _texts$en18;
      var readyText = langTexts.restoreRehearsalReady || ((_texts$en18 = texts.en) === null || _texts$en18 === void 0 ? void 0 : _texts$en18.restoreRehearsalReady) || '';
      restoreRehearsalStatusEl.textContent = readyText;
    }
    return;
  }
  var message = langTexts.restoreRehearsalProceedMessage || ((_texts$en19 = texts.en) === null || _texts$en19 === void 0 ? void 0 : _texts$en19.restoreRehearsalProceedMessage) || 'Sandbox snapshot staged. Live data remains untouched until you perform a full restore.';
  if (restoreRehearsalStatusEl) {
    restoreRehearsalStatusEl.textContent = message;
  }
  if (typeof document !== 'undefined' && typeof document.dispatchEvent === 'function') {
    try {
      var _restoreRehearsalLast;
      document.dispatchEvent(new CustomEvent('restoreRehearsalProceed', {
        detail: {
          fileName: restoreRehearsalLastSnapshot.fileName,
          mode: restoreRehearsalLastSnapshot.mode,
          processedAt: restoreRehearsalLastSnapshot.processedAt,
          sandboxCounts: ((_restoreRehearsalLast = restoreRehearsalLastSnapshot.sandbox) === null || _restoreRehearsalLast === void 0 ? void 0 : _restoreRehearsalLast.counts) || {},
          ruleChanges: Array.isArray(restoreRehearsalLastSnapshot.diff) ? restoreRehearsalLastSnapshot.diff.length : 0
        }
      }));
    } catch (eventError) {
      console.warn('Restore rehearsal proceed notification failed', eventError);
    }
  }
}
function handleRestoreRehearsalAbort() {
  var _texts$en20;
  var lang = typeof currentLang === 'string' && texts[currentLang] ? currentLang : 'en';
  var langTexts = texts[lang] || texts.en || {};
  var message = langTexts.restoreRehearsalAbortMessage || ((_texts$en20 = texts.en) === null || _texts$en20 === void 0 ? void 0 : _texts$en20.restoreRehearsalAbortMessage) || 'Rehearsal sandbox cleared. Live data remains untouched.';
  restoreRehearsalLastSnapshot = null;
  resetRestoreRehearsalState({
    keepStatus: true
  });
  if (restoreRehearsalStatusEl) {
    restoreRehearsalStatusEl.textContent = message;
  }
}
function saveCurrentSession() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (restoringSession || factoryResetInProgress) return;
  if (typeof isProjectPersistenceSuspended === 'function' && isProjectPersistenceSuspended()) {
    return;
  }
  var info = projectForm ? collectProjectFormData() : {};
  info.sliderBowl = getSessionCoreValue('getSliderBowlValue');
  info.easyrig = getSessionCoreValue('getEasyrigValue');
  currentProjectInfo = deriveSessionProjectInfo(info);
  var batteryValue = batterySelect ? batterySelect.value : '';
  var batteryPlateValue = batteryPlateSelect ? batteryPlateSelect.value : '';
  var state = {
    setupName: setupNameInput ? setupNameInput.value : '',
    setupSelect: setupSelect ? setupSelect.value : '',
    camera: cameraSelect ? cameraSelect.value : '',
    monitor: monitorSelect ? monitorSelect.value : '',
    video: videoSelect ? videoSelect.value : '',
    cage: cageSelect ? cageSelect.value : '',
    motors: motorSelects.map(function (sel) {
      return sel ? sel.value : '';
    }),
    controllers: controllerSelects.map(function (sel) {
      return sel ? sel.value : '';
    }),
    distance: distanceSelect ? distanceSelect.value : '',
    batteryPlate: normalizeBatteryPlateValue(batteryPlateValue, batteryValue),
    battery: batteryValue,
    batteryHotswap: hotswapSelect ? hotswapSelect.value : '',
    sliderBowl: info.sliderBowl,
    easyrig: info.easyrig,
    projectInfo: currentProjectInfo,
    autoGearHighlight: typeof isAutoGearHighlightEnabled === 'function' ? !!isAutoGearHighlightEnabled() : false
  };
  if (typeof getDiagramManualPositions === 'function') {
    var diagramPositions = getDiagramManualPositions();
    if (diagramPositions && Object.keys(diagramPositions).length) {
      state.diagramPositions = diagramPositions;
    }
  }
  storeSession(state);
  if (!options.skipGearList) {
    saveCurrentGearList();
  }
}
function autoSaveCurrentSetup() {
  if (factoryResetInProgress) return;
  if (!setupNameInput) return;
  var name = setupNameInput.value.trim();
  if (!name) {
    saveCurrentSession({
      skipGearList: true
    });
    checkSetupChanged();
    return false;
  }
  var selectedName = setupSelect ? setupSelect.value : '';
  if (setupSelect && (!selectedName || name !== selectedName)) {
    saveCurrentSession({
      skipGearList: true
    });
    checkSetupChanged();
    return false;
  }
  var setups = getSetups();
  var existingSetup = setups && _typeof(setups) === 'object' ? setups[name] : undefined;
  var existingSetupSignature = existingSetup ? stableStringify(existingSetup) : '';
  var currentSetup = _objectSpread({}, getCurrentSetupState());
  var gearListHtml = getCurrentGearListHtml();
  if (gearListHtml) {
    currentSetup.gearList = gearListHtml;
  }
  if (typeof getDiagramManualPositions === 'function') {
    var diagramPositions = getDiagramManualPositions();
    if (diagramPositions && Object.keys(diagramPositions).length) {
      currentSetup.diagramPositions = diagramPositions;
    } else if (Object.prototype.hasOwnProperty.call(currentSetup, 'diagramPositions')) {
      delete currentSetup.diagramPositions;
    }
  }
  setups[name] = currentSetup;
  storeSetups(setups);
  populateSetupSelect();
  if (setupSelect) setupSelect.value = name;
  saveCurrentSession();
  storeLoadedSetupState(getCurrentSetupState());
  checkSetupChanged();
  var updatedSignature = stableStringify(currentSetup);
  return existingSetupSignature !== updatedSignature;
}
var PROJECT_AUTOSAVE_BASE_DELAY_MS = 300;
var PROJECT_AUTOSAVE_RETRY_DELAY_MS = 900;
var PROJECT_AUTOSAVE_RETRY_CAP_MS = 5000;
var PROJECT_AUTOSAVE_MAX_RETRIES = 4;
var projectAutoSaveTimer = null;
var projectAutoSaveFailureCount = 0;
var projectAutoSavePendingWhileRestoring = null;
var factoryResetInProgress = false;
var projectAutoSaveOverrides = null;
var projectAutoSaveLastRequestContext = null;
function notifyAutoBackupChange(details) {
  try {
    var scope = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : null;
    var notifier = scope && typeof scope.__cineNoteAutoBackupChange === 'function' ? scope.__cineNoteAutoBackupChange : null;
    if (notifier) {
      notifier(details || {});
    }
  } catch (changeError) {
    console.warn('Failed to record auto backup change context', changeError);
  }
}
function setProjectAutoSaveOverrides(overrides) {
  if (!overrides || _typeof(overrides) !== 'object') {
    projectAutoSaveOverrides = null;
    return;
  }
  var context = {};
  if (overrides.setupNameState && _typeof(overrides.setupNameState) === 'object') {
    var state = overrides.setupNameState;
    var typedName = typeof state.typedName === 'string' ? state.typedName : '';
    var selectedName = typeof state.selectedName === 'string' ? state.selectedName : '';
    var storageKey = typeof state.storageKey === 'string' ? state.storageKey : '';
    var renameInProgress = typeof state.renameInProgress === 'boolean' ? state.renameInProgress : Boolean(selectedName && typedName && typedName !== selectedName);
    context.setupNameState = {
      typedName: typedName,
      selectedName: selectedName,
      storageKey: storageKey,
      renameInProgress: renameInProgress
    };
  }
  projectAutoSaveOverrides = context.setupNameState ? context : null;
}
function getProjectAutoSaveOverrides() {
  return projectAutoSaveOverrides;
}
function clearProjectAutoSaveOverrides() {
  projectAutoSaveOverrides = null;
}
function getProjectAutoSaveDelay() {
  if (projectAutoSaveFailureCount <= 0) {
    return PROJECT_AUTOSAVE_BASE_DELAY_MS;
  }
  var scaledDelay = PROJECT_AUTOSAVE_BASE_DELAY_MS + PROJECT_AUTOSAVE_RETRY_DELAY_MS * (projectAutoSaveFailureCount - 1);
  return Math.min(scaledDelay, PROJECT_AUTOSAVE_RETRY_CAP_MS);
}
function runProjectAutoSave() {
  if (factoryResetInProgress) {
    if (projectAutoSaveTimer) {
      clearTimeout(projectAutoSaveTimer);
      projectAutoSaveTimer = null;
    }
    clearProjectAutoSaveOverrides();
    return;
  }
  if (restoringSession) {
    projectAutoSaveTimer = null;
    if (projectAutoSavePendingWhileRestoring !== 'immediate') {
      projectAutoSavePendingWhileRestoring = projectAutoSavePendingWhileRestoring || 'queued';
    }
    return;
  }
  projectAutoSaveTimer = null;
  projectAutoSavePendingWhileRestoring = null;
  var pendingRequestContext = projectAutoSaveLastRequestContext;
  projectAutoSaveLastRequestContext = null;
  var encounteredError = false;
  var guard = function guard(fn, context, onSuccess) {
    if (typeof fn !== 'function') {
      return {
        ok: true,
        result: undefined
      };
    }
    try {
      var result = fn();
      if (typeof onSuccess === 'function') {
        try {
          onSuccess(result);
        } catch (callbackError) {
          console.warn('Auto backup mutation observer callback failed', callbackError);
        }
      }
      return {
        ok: true,
        result: result
      };
    } catch (error) {
      encounteredError = true;
      console.error("Project autosave failed while ".concat(context, "."), error);
      return {
        ok: false,
        result: undefined
      };
    }
  };
  var setupMutationDetected = false;
  var gearListMutationDetected = false;
  var hasSetupName = Boolean(setupNameInput && typeof setupNameInput.value === 'string' && setupNameInput.value.trim());
  if (!hasSetupName) {
    guard(function () {
      return saveCurrentSession();
    }, 'saving the current session state');
  }
  var setupSaveResult = guard(autoSaveCurrentSetup, 'saving the current setup', function (result) {
    if (result === true) {
      setupMutationDetected = true;
    }
  });
  if (!setupSaveResult.ok) {
    guard(function () {
      return saveCurrentSession({
        skipGearList: true
      });
    }, 'saving the current session state as a fallback');
  }
  guard(saveCurrentGearList, 'saving the gear list', function (result) {
    if (result === true) {
      gearListMutationDetected = true;
    }
  });
  if (encounteredError) {
    if (projectAutoSaveFailureCount < PROJECT_AUTOSAVE_MAX_RETRIES) {
      projectAutoSaveFailureCount += 1;
      scheduleProjectAutoSave();
    } else if (projectAutoSaveFailureCount === PROJECT_AUTOSAVE_MAX_RETRIES) {
      console.warn('Project autosave retries have been paused after repeated failures.');
    }
    clearProjectAutoSaveOverrides();
    return;
  }
  projectAutoSaveFailureCount = 0;
  clearProjectAutoSaveOverrides();
  if (!encounteredError && (setupMutationDetected || gearListMutationDetected)) {
    var contextNow = Date.now();
    var requestTimestamp = pendingRequestContext && typeof pendingRequestContext.requestedAt === 'number' && Number.isFinite(pendingRequestContext.requestedAt) ? pendingRequestContext.requestedAt : contextNow;
    notifyAutoBackupChange({
      commit: true,
      context: {
        immediate: Boolean(pendingRequestContext && pendingRequestContext.immediate),
        overrides: Boolean(pendingRequestContext && pendingRequestContext.overrides),
        requestedAt: requestTimestamp,
        completedAt: contextNow
      }
    });
  }
}
function scheduleProjectAutoSave() {
  var immediateOrOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var immediate = false;
  var overrides;
  if (_typeof(immediateOrOptions) === 'object' && immediateOrOptions !== null) {
    immediate = Boolean(immediateOrOptions.immediate);
    overrides = immediateOrOptions.overrides;
  } else {
    immediate = Boolean(immediateOrOptions);
    overrides = undefined;
  }
  var overridesProvided = overrides !== undefined;
  if (overridesProvided) {
    setProjectAutoSaveOverrides(overrides);
  }
  if (factoryResetInProgress) {
    if (projectAutoSaveTimer) {
      clearTimeout(projectAutoSaveTimer);
      projectAutoSaveTimer = null;
    }
    clearProjectAutoSaveOverrides();
    return;
  }
  if (restoringSession) {
    if (projectAutoSaveTimer) {
      clearTimeout(projectAutoSaveTimer);
      projectAutoSaveTimer = null;
    }
    var pendingState = immediate ? 'immediate' : 'queued';
    if (projectAutoSavePendingWhileRestoring !== 'immediate') {
      projectAutoSavePendingWhileRestoring = pendingState;
    }
    return;
  }
  projectAutoSavePendingWhileRestoring = null;
  var requestTimestamp = Date.now();
  projectAutoSaveLastRequestContext = {
    immediate: immediate,
    overrides: overridesProvided,
    requestedAt: requestTimestamp
  };
  notifyAutoBackupChange({
    immediate: immediate,
    overrides: overridesProvided,
    pending: true
  });
  if (immediate) {
    if (projectAutoSaveTimer) {
      clearTimeout(projectAutoSaveTimer);
      projectAutoSaveTimer = null;
    }
    runProjectAutoSave();
    return;
  }
  if (projectAutoSaveTimer) {
    clearTimeout(projectAutoSaveTimer);
  }
  var delay = getProjectAutoSaveDelay();
  projectAutoSaveTimer = setTimeout(runProjectAutoSave, delay);
  if (projectAutoSaveTimer && _typeof(projectAutoSaveTimer) === 'object' && typeof projectAutoSaveTimer.unref === 'function') {
    projectAutoSaveTimer.unref();
  }
}
if (projectForm) {
  var resolveOptionFromEvent = function resolveOptionFromEvent(event, select) {
    var findClosestSelect = function findClosestSelect(node) {
      if (!node || _typeof(node) !== 'object') {
        return null;
      }
      if (typeof node.closest === 'function') {
        return node.closest('select');
      }
      var parent = node.parentElement;
      while (parent && parent.tagName !== 'SELECT') {
        parent = parent.parentElement;
      }
      return parent && parent.tagName === 'SELECT' ? parent : null;
    };
    var isOption = function isOption(node) {
      return node && _typeof(node) === 'object' && node.tagName === 'OPTION' && findClosestSelect(node) === select;
    };
    if (isOption(event.target)) {
      return event.target;
    }
    if (typeof event.composedPath === 'function') {
      var optionFromPath = event.composedPath().find(isOption);
      if (optionFromPath) {
        return optionFromPath;
      }
    }
    if (event.target && typeof event.target.closest === 'function') {
      var optionFromTarget = event.target.closest('option');
      if (isOption(optionFromTarget)) {
        return optionFromTarget;
      }
    }
    var point = function () {
      if (event.type && event.type.startsWith('touch') && event.touches && event.touches[0]) {
        return {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY
        };
      }
      if (typeof event.clientX === 'number' && typeof event.clientY === 'number') {
        return {
          x: event.clientX,
          y: event.clientY
        };
      }
      return null;
    }();
    if (point && typeof document !== 'undefined' && typeof document.elementFromPoint === 'function') {
      var element = document.elementFromPoint(point.x, point.y);
      if (isOption(element)) {
        return element;
      }
      if (element && typeof element.closest === 'function') {
        var optionFromPoint = element.closest('option');
        if (isOption(optionFromPoint)) {
          return optionFromPoint;
        }
      }
    }
    return null;
  };
  var attachMultiSelectToggle = function attachMultiSelectToggle(sel) {
    if (!sel) {
      return;
    }
    var toggleSelection = function toggleSelection(event) {
      if (typeof event.button === 'number' && event.button !== 0) {
        return;
      }
      var option = resolveOptionFromEvent(event, sel);
      if (!option || option.disabled) {
        return;
      }
      event.preventDefault();
      var scrollTop = sel.scrollTop;
      var newSelected = !option.selected;
      option.selected = newSelected;
      if (newSelected) {
        option.setAttribute('selected', '');
      } else {
        option.removeAttribute('selected');
      }
      var changeEvent = new Event('change', {
        bubbles: true
      });
      sel.dispatchEvent(changeEvent);
      if (typeof sel.focus === 'function') {
        try {
          sel.focus({
            preventScroll: true
          });
        } catch (focusError) {
          sel.focus();
          void focusError;
        }
      }
      sel.scrollTop = scrollTop;
    };
    var pointerSupported = typeof window !== 'undefined' && typeof window.PointerEvent === 'function';
    if (pointerSupported) {
      sel.addEventListener('pointerdown', toggleSelection);
    } else {
      sel.addEventListener('mousedown', toggleSelection);
      sel.addEventListener('touchstart', function (event) {
        toggleSelection(event);
      }, {
        passive: false
      });
    }
    sel.addEventListener('dblclick', function (event) {
      event.preventDefault();
    });
  };
  projectForm.querySelectorAll('select[multiple]').forEach(function (sel) {
    attachMultiSelectToggle(sel);
  });
  var safeUpdateSelectIconBoxes = function safeUpdateSelectIconBoxes(selectElement) {
    if (!selectElement) {
      return;
    }
    var localFn = typeof updateSelectIconBoxes === 'function' ? updateSelectIconBoxes : null;
    var globalFn = typeof globalThis !== 'undefined' && globalThis && typeof globalThis.updateSelectIconBoxes === 'function' ? globalThis.updateSelectIconBoxes : null;
    var target = localFn || globalFn;
    if (typeof target !== 'function') {
      return;
    }
    try {
      target(selectElement);
    } catch (error) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('updateSelectIconBoxes handler failed', error);
      }
    }
  };
  projectForm.querySelectorAll('select').forEach(function (sel) {
    var handleUpdate = function handleUpdate() {
      return safeUpdateSelectIconBoxes(sel);
    };
    sel.addEventListener('change', handleUpdate);
    handleUpdate();
  });
  var noteProjectFormDirty = function noteProjectFormDirty() {
    if (typeof markProjectFormDataDirty === 'function') {
      markProjectFormDataDirty();
    }
  };
  var queueProjectAutoSave = function queueProjectAutoSave() {
    noteProjectFormDirty();
    scheduleProjectAutoSave();
  };
  var flushProjectAutoSave = function flushProjectAutoSave() {
    noteProjectFormDirty();
    scheduleProjectAutoSave(true);
  };
  projectForm.addEventListener('input', queueProjectAutoSave);
  projectForm.addEventListener('change', flushProjectAutoSave);
  projectForm.querySelectorAll('input, textarea, select').forEach(function (el) {
    el.addEventListener('change', function (event) {
      noteProjectFormDirty();
      saveCurrentSession(event);
    });
  });
}
function setSelectValue(select, value) {
  if (!select) return;
  if (value === undefined) return;
  var normalized = value === null ? '' : value;
  select.value = normalized;
  if (select.value !== normalized) {
    var options = Array.from(select.options || []);
    var noneOption = options.find(function (opt) {
      return opt.value === 'None';
    });
    if (normalized === '' && !options.length) {
      select.value = '';
    } else if (normalized === '') {
      if (noneOption) {
        select.value = 'None';
      } else {
        select.selectedIndex = -1;
      }
    } else if (noneOption) {
      select.value = 'None';
    } else {
      select.selectedIndex = -1;
    }
  }
  if (typeof updateFavoriteButton === 'function') {
    updateFavoriteButton(select);
  } else if (typeof enqueueCoreBootTask === 'function') {
    enqueueCoreBootTask(function () {
      if (typeof updateFavoriteButton === 'function') {
        updateFavoriteButton(select);
      }
    });
  }
  if (select === cameraSelect && typeof callCoreFunctionIfAvailable === 'function') {
    callCoreFunctionIfAvailable('updateRecordingMediaOptions');
  }
  if (typeof adjustGearListSelectWidth === 'function') {
    adjustGearListSelectWidth(select);
  } else if (typeof enqueueCoreBootTask === 'function') {
    enqueueCoreBootTask(function () {
      if (typeof adjustGearListSelectWidth === 'function') {
        adjustGearListSelectWidth(select);
      }
    });
  }
}
function resetSelectsToNone(selects) {
  selects.forEach(function (select) {
    if (!select) return;
    var options = Array.from(select.options || []);
    var noneOption = options.find(function (opt) {
      return opt.value === 'None';
    });
    if (noneOption) {
      select.value = 'None';
    } else if (!options.length) {
      select.value = '';
    } else {
      select.selectedIndex = -1;
    }
  });
}
function restoreSessionState() {
  restoringSession = true;
  var loadedState = loadSession();
  var state = loadedState && _typeof(loadedState) === 'object' ? _objectSpread({}, loadedState) : null;
  if (state) {
    var savedBattery = typeof state.battery === 'string' ? state.battery : '';
    var savedPlate = typeof state.batteryPlate === 'string' ? state.batteryPlate : '';
    var derivedPlate = typeof normalizeBatteryPlateValue === 'function' ? normalizeBatteryPlateValue(savedPlate, savedBattery) : savedPlate;
    state.batteryPlate = derivedPlate;
  }
  storeLoadedSetupState(state || null);
  var sessionDiagramPositions = {};
  if (state && _typeof(state.diagramPositions) === 'object' && typeof normalizeDiagramPositionsInput === 'function') {
    sessionDiagramPositions = normalizeDiagramPositionsInput(state.diagramPositions);
  }
  if (typeof setManualDiagramPositions === 'function') {
    setManualDiagramPositions(sessionDiagramPositions, {
      render: false
    });
  }
  resetSelectsToNone(motorSelects);
  resetSelectsToNone(controllerSelects);
  if (state) {
    if (setupNameInput) {
      setupNameInput.value = state.setupName || '';
      setupNameInput.dispatchEvent(new Event('input'));
    }
    setSelectValue(cameraSelect, state.camera);
    updateBatteryPlateVisibility();
    setSelectValue(batteryPlateSelect, state.batteryPlate);
    applyBatteryPlateSelectionFromBattery(state.battery, batteryPlateSelect ? batteryPlateSelect.value : '');
    updateBatteryOptions();
    setSelectValue(monitorSelect, state.monitor);
    setSelectValue(videoSelect, state.video);
    if (typeof updateCageSelectOptions === 'function') {
      updateCageSelectOptions(state.cage);
    } else {
      setSelectValue(cageSelect, state.cage);
    }
    setSelectValue(distanceSelect, state.distance);
    if (Array.isArray(state.motors)) {
      state.motors.forEach(function (val, i) {
        if (motorSelects[i]) setSelectValue(motorSelects[i], val);
      });
    }
    if (Array.isArray(state.controllers)) {
      state.controllers.forEach(function (val, i) {
        if (controllerSelects[i]) setSelectValue(controllerSelects[i], val);
      });
    }
    setSelectValue(batterySelect, state.battery);
    applyBatteryPlateSelectionFromBattery(state.battery, batteryPlateSelect ? batteryPlateSelect.value : '');
    setSelectValue(hotswapSelect, state.batteryHotswap);
    if (state && typeof state.battery === 'string' && state.battery.trim() || state && typeof state.batteryHotswap === 'string' && state.batteryHotswap.trim()) {
      updateBatteryOptions();
    }
    setSelectValue(setupSelect, state.setupSelect);
    currentProjectInfo = state.projectInfo || null;
    if (projectForm) populateProjectForm(currentProjectInfo || {});
  } else {
    if (gearListOutput) {
      gearListOutput.innerHTML = '';
      gearListOutput.classList.add('hidden');
    }
    if (projectRequirementsOutput) {
      projectRequirementsOutput.innerHTML = '';
      projectRequirementsOutput.classList.add('hidden');
    }
  }
  if (typeof markProjectFormDataDirty === 'function') {
    markProjectFormDataDirty();
  }
  if (gearListOutput || projectRequirementsOutput) {
    var typedName = safeGetCurrentProjectName();
    var storageKey = getCurrentProjectStorageKey();
    var fetchStoredProject = function fetchStoredProject(name) {
      return typeof loadProject === 'function' && typeof name === 'string' ? loadProject(name) : null;
    };
    var hasProjectPayload = function hasProjectPayload(project) {
      if (!project || _typeof(project) !== 'object') {
        return false;
      }
      if (Object.prototype.hasOwnProperty.call(project, 'gearList')) {
        return true;
      }
      if (Object.prototype.hasOwnProperty.call(project, 'gearSelectors')) {
        var selectors = project.gearSelectors;
        if (selectors && _typeof(selectors) === 'object' && Object.keys(selectors).length) {
          return true;
        }
      }
      if (Object.prototype.hasOwnProperty.call(project, 'gearListAndProjectRequirementsGenerated')) {
        return true;
      }
      return Boolean(project.projectInfo || project.powerSelection || project.autoGearRules && project.autoGearRules.length || project.diagramPositions && Object.keys(project.diagramPositions).length);
    };
    var candidateNames = [];
    if (typedName) {
      candidateNames.push(typedName);
    }
    if (storageKey || storageKey === '') {
      if (!candidateNames.includes(storageKey)) {
        candidateNames.push(storageKey);
      }
    }
    var storedProject = null;
    for (var _i = 0, _candidateNames = candidateNames; _i < _candidateNames.length; _i++) {
      var name = _candidateNames[_i];
      storedProject = fetchStoredProject(name);
      if (hasProjectPayload(storedProject)) {
        break;
      }
    }
    if (!hasProjectPayload(storedProject) && state) {
      var fallbackName = typeof state.setupSelect === 'string' ? state.setupSelect.trim() : '';
      if (fallbackName && !candidateNames.includes(fallbackName)) {
        var fallbackProject = fetchStoredProject(fallbackName);
        if (hasProjectPayload(fallbackProject)) {
          storedProject = fallbackProject;
        }
      }
    }
    if (hasProjectPayload(storedProject)) {
      if (storedProject && storedProject.powerSelection && typeof applyStoredPowerSelection === 'function') {
        var applied = applyStoredPowerSelection(storedProject.powerSelection);
        if (applied) {
          updateBatteryOptions();
        }
      }
      var storedHasProjectInfo = Object.prototype.hasOwnProperty.call(storedProject, 'projectInfo');
      var storedProjectInfo = storedHasProjectInfo && storedProject.projectInfo && _typeof(storedProject.projectInfo) === 'object' ? storedProject.projectInfo : null;
      var sessionProjectInfo = currentProjectInfo && (typeof currentProjectInfo === "undefined" ? "undefined" : _typeof(currentProjectInfo)) === 'object' ? currentProjectInfo : null;
      var nextProjectInfo = null;
      if (storedHasProjectInfo) {
        if (storedProjectInfo && sessionProjectInfo) {
          nextProjectInfo = _objectSpread(_objectSpread({}, storedProjectInfo), sessionProjectInfo);
        } else if (storedProjectInfo) {
          nextProjectInfo = _objectSpread({}, storedProjectInfo);
        } else {
          nextProjectInfo = null;
        }
      } else if (sessionProjectInfo) {
        nextProjectInfo = _objectSpread({}, sessionProjectInfo);
      }
      currentProjectInfo = nextProjectInfo;
      if (projectForm) populateProjectForm(currentProjectInfo || {});
      if (typeof normalizeDiagramPositionsInput === 'function' && typeof setManualDiagramPositions === 'function') {
        var storedDiagramPositions = normalizeDiagramPositionsInput(storedProject.diagramPositions);
        var combinedDiagramPositions = Object.keys(storedDiagramPositions).length ? _objectSpread(_objectSpread({}, storedDiagramPositions), sessionDiagramPositions) : sessionDiagramPositions;
        setManualDiagramPositions(combinedDiagramPositions, {
          render: false
        });
        sessionDiagramPositions = combinedDiagramPositions;
      }
      displayGearAndRequirements(storedProject.gearList);
      if (gearListOutput && storedProject.gearList) {
        gearListOutput.classList.remove('hidden');
        skipNextGearListRefresh = true;
      }
      if (gearListOutput) {
        ensureGearListActions();
        bindGearListCageListener();
        bindGearListEasyrigListener();
        bindGearListSliderBowlListener();
        bindGearListEyeLeatherListener();
        bindGearListProGaffTapeListener();
        bindGearListDirectorMonitorListener();
        if (storedProject && isPlainObject(storedProject.gearSelectors) && Object.keys(storedProject.gearSelectors).length) {
          applyGearListSelectors(storedProject.gearSelectors);
        }
        if (state) {
          setSliderBowlValue(state.sliderBowl);
          setEasyrigValue(state.easyrig);
        }
        updateGearListButtonVisibility();
      }
    } else if (currentProjectInfo && typeof generateGearListHtml === 'function') {
      var regeneratedHtml = generateGearListHtml(currentProjectInfo || {});
      if (regeneratedHtml) {
        displayGearAndRequirements(regeneratedHtml);
        if (gearListOutput) {
          gearListOutput.classList.remove('hidden');
          skipNextGearListRefresh = true;
          ensureGearListActions();
          bindGearListCageListener();
          bindGearListEasyrigListener();
          bindGearListSliderBowlListener();
          bindGearListEyeLeatherListener();
          bindGearListProGaffTapeListener();
          bindGearListDirectorMonitorListener();
          if (state) {
            setSliderBowlValue(state.sliderBowl);
            setEasyrigValue(state.easyrig);
          }
          updateGearListButtonVisibility();
        }
      }
    }
  }
  var highlightPreference = state && Object.prototype.hasOwnProperty.call(state, 'autoGearHighlight') ? Boolean(state.autoGearHighlight) : false;
  if (typeof setAutoGearHighlightEnabled === 'function') {
    setAutoGearHighlightEnabled(highlightPreference);
  } else if (gearListOutput && gearListOutput.classList) {
    gearListOutput.classList.toggle('show-auto-gear-highlight', highlightPreference);
    callSessionCoreFunction('updateAutoGearHighlightToggleButton', [], {
      defer: true
    });
  }
  lastSetupName = setupSelect ? setupSelect.value : '';
  if (typeof setActiveProjectCompressionHold === 'function') {
    var compressionHoldKey = '';
    if (typeof getCurrentProjectStorageKey === 'function') {
      try {
        compressionHoldKey = getCurrentProjectStorageKey({
          allowTyped: true
        }) || '';
      } catch (holdError) {
        console.warn('Unable to determine active project key for compression hold after session restore', holdError);
        compressionHoldKey = setupSelect && typeof setupSelect.value === 'string' ? setupSelect.value : '';
      }
    } else if (setupSelect && typeof setupSelect.value === 'string') {
      compressionHoldKey = setupSelect.value;
    }
    setActiveProjectCompressionHold(compressionHoldKey);
  }
  restoringSession = false;
  saveCurrentSession();
  var pendingAutoSaveState = projectAutoSavePendingWhileRestoring;
  projectAutoSavePendingWhileRestoring = null;
  if (pendingAutoSaveState === 'immediate') {
    scheduleProjectAutoSave(true);
  } else if (pendingAutoSaveState === 'queued') {
    scheduleProjectAutoSave();
  }
}
function ensureImportedProjectBaseNameSession(rawName) {
  var trimmed = typeof rawName === 'string' ? rawName.trim() : '';
  if (!trimmed) {
    return 'Project-imported';
  }
  var importedMatch = trimmed.match(/^(.*?)-imported(?:-(\d+))?$/i);
  if (importedMatch) {
    var prefix = typeof importedMatch[1] === 'string' ? importedMatch[1].trim() : '';
    return prefix ? "".concat(prefix, "-imported") : 'Project-imported';
  }
  if (trimmed.toLowerCase().endsWith('-imported')) {
    return trimmed;
  }
  return "".concat(trimmed, "-imported");
}
function resolveImportedProjectNamingContextSession(rawName) {
  var trimmed = typeof rawName === 'string' ? rawName.trim() : '';
  var base = ensureImportedProjectBaseNameSession(rawName);
  if (!trimmed) {
    return {
      base: base,
      initialCandidate: base,
      suffixStart: 2
    };
  }
  var importedMatch = trimmed.match(/^(.*?)-imported(?:-(\d+))?$/i);
  var parsedSuffix = importedMatch && importedMatch[2] ? Number(importedMatch[2]) : NaN;
  var suffixStart = Number.isFinite(parsedSuffix) ? parsedSuffix + 1 : 2;
  if (importedMatch) {
    return {
      base: base,
      initialCandidate: trimmed,
      suffixStart: suffixStart
    };
  }
  return {
    base: base,
    initialCandidate: base,
    suffixStart: 2
  };
}
function generateUniqueImportedProjectNameSession(baseName, usedNames, normalizedNames) {
  var normalized = normalizedNames || new Set(_toConsumableArray(usedNames).map(function (name) {
    return typeof name === 'string' ? name.trim().toLowerCase() : '';
  }).filter(function (name) {
    return name;
  }));
  var context = resolveImportedProjectNamingContextSession(baseName);
  var candidate = typeof context.initialCandidate === 'string' ? context.initialCandidate.trim() : '';
  if (!candidate) {
    candidate = context.base || 'Project-imported';
  }
  var normalizedCandidate = candidate.trim().toLowerCase();
  var suffix = context.suffixStart;
  while (normalizedCandidate && normalized.has(normalizedCandidate)) {
    var base = context.base || 'Project-imported';
    candidate = "".concat(base, "-").concat(suffix++);
    normalizedCandidate = candidate.trim().toLowerCase();
  }
  usedNames.add(candidate);
  if (normalizedCandidate) {
    normalized.add(normalizedCandidate);
  }
  return candidate;
}
function persistImportedProjectWithFallback(payload, nameCandidates) {
  if (!payload || typeof saveProject !== 'function') {
    return '';
  }
  var usedNames = new Set();
  var normalizedNames = new Set();
  if (typeof loadProject === 'function') {
    try {
      var existingProjects = loadProject();
      if (existingProjects && _typeof(existingProjects) === 'object') {
        var entries = Object.keys(existingProjects);
        usedNames = new Set(entries);
        normalizedNames = new Set(entries.map(function (name) {
          return typeof name === 'string' ? name.trim().toLowerCase() : '';
        }).filter(function (name) {
          return name;
        }));
      }
    } catch (projectReadError) {
      console.warn('Unable to read existing projects while generating fallback name for imported project', projectReadError);
    }
  }
  var candidates = Array.isArray(nameCandidates) ? nameCandidates : [];
  var baseName = '';
  for (var _index8 = 0; _index8 < candidates.length; _index8 += 1) {
    var candidate = typeof candidates[_index8] === 'string' ? candidates[_index8].trim() : '';
    if (candidate) {
      baseName = candidate;
      break;
    }
  }
  if (!baseName) {
    baseName = 'Imported project';
  }
  var storageKey = generateUniqueImportedProjectNameSession(baseName, usedNames, normalizedNames);
  saveProject(storageKey, payload, {
    skipOverwriteBackup: true
  });
  return storageKey;
}
function clearOwnedGearExportArtifacts(element) {
  if (!element || typeof element.querySelectorAll !== 'function') {
    return;
  }
  element.removeAttribute('data-gear-owned-export-label');
  var badges = element.querySelectorAll('[data-gear-owned-export]');
  badges.forEach(function (badge) {
    if (badge && badge.parentElement) {
      badge.parentElement.removeChild(badge);
    }
  });
}
function applyImportedOwnedGearMarkers(markers) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (!Array.isArray(markers) || !markers.length) {
    return false;
  }
  var root = options && options.root ? options.root : gearListOutput;
  if (!root || typeof root.querySelector !== 'function') {
    return false;
  }
  var userProfile = typeof getUserProfileSnapshot === 'function' ? getUserProfileSnapshot() : null;
  var importerProfileName = userProfile && typeof userProfile.name === 'string' ? userProfile.name.trim() : '';
  var importerProfileNameLower = importerProfileName ? importerProfileName.toLowerCase() : '';
  var importerDisplayName = typeof formatUserProfileProviderName === 'function' ? formatUserProfileProviderName(importerProfileName) : importerProfileName;
  var importerDisplayNameLower = importerDisplayName ? importerDisplayName.toLowerCase() : '';
  var applied = false;
  markers.forEach(function (marker) {
    if (!marker || !marker.ownedId) {
      return;
    }
    var selectorId = typeof CSS !== 'undefined' && CSS && typeof CSS.escape === 'function' ? CSS.escape(marker.ownedId) : String(marker.ownedId).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    var element = root.querySelector("[data-gear-own-gear-id=\"".concat(selectorId, "\"]"));
    if (!element) {
      return;
    }
    clearOwnedGearExportArtifacts(element);
    var ownerDisplayName = typeof marker.ownerDisplayName === 'string' ? marker.ownerDisplayName.trim() : '';
    var ownerDisplayLower = ownerDisplayName ? ownerDisplayName.toLowerCase() : '';
    var ownerProfileName = typeof marker.ownerProfileName === 'string' ? marker.ownerProfileName.trim() : '';
    var ownerProfileLower = ownerProfileName ? ownerProfileName.toLowerCase() : '';
    var providerLabelFallback = typeof marker.providerLabel === 'string' ? marker.providerLabel.trim() : ownerDisplayName;
    var matchesImporter = Boolean(importerProfileNameLower && ownerProfileLower && importerProfileNameLower === ownerProfileLower || importerDisplayNameLower && ownerDisplayLower && importerDisplayNameLower === ownerDisplayLower || importerProfileNameLower && ownerDisplayLower && importerProfileNameLower === ownerDisplayLower);
    var providerValue = '';
    var providerLabel = providerLabelFallback;
    if (matchesImporter) {
      providerValue = 'user';
      providerLabel = '';
    } else if (marker.ownerType === 'contact' || ownerDisplayName) {
      var ensuredContact = typeof ensureContactForImportedOwner === 'function' ? ensureContactForImportedOwner(ownerDisplayName || providerLabelFallback, {
        contactId: marker.contactId,
        fallbackLabel: providerLabelFallback
      }) : null;
      if (ensuredContact && ensuredContact.value) {
        providerValue = ensuredContact.value;
        providerLabel = ensuredContact.label || providerLabelFallback;
      } else if (typeof marker.providerValue === 'string' && marker.providerValue.startsWith('contact:')) {
        providerValue = marker.providerValue;
      } else if (marker.providerValue && marker.providerValue !== 'user') {
        providerValue = marker.providerValue;
      }
    } else if (typeof marker.providerValue === 'string' && marker.providerValue) {
      providerValue = marker.providerValue;
    }
    if (typeof setGearItemProvider === 'function') {
      setGearItemProvider(element, providerValue, {
        label: providerLabel
      });
    } else {
      if (providerValue) {
        element.setAttribute('data-gear-provider', providerValue);
      } else {
        element.removeAttribute('data-gear-provider');
      }
      if (providerLabel) {
        element.setAttribute('data-gear-provider-label', providerLabel);
      } else {
        element.removeAttribute('data-gear-provider-label');
      }
    }
    applied = true;
  });
  if (applied && typeof dispatchGearProviderDataChanged === 'function') {
    dispatchGearProviderDataChanged('owned-gear-import');
  }
  return applied;
}
function mergeSharedContactsIntoCache(sharedContacts) {
  if (!Array.isArray(sharedContacts) || !sharedContacts.length) {
    return {
      added: 0,
      updated: 0
    };
  }
  if (typeof contactsCache === 'undefined') {
    return {
      added: 0,
      updated: 0
    };
  }
  var sanitize = function sanitize(value) {
    if (typeof sanitizeContactValue === 'function') {
      return sanitizeContactValue(value);
    }
    return typeof value === 'string' ? value.trim() : '';
  };
  var existingContacts = Array.isArray(contactsCache) ? contactsCache.slice() : [];
  var added = 0;
  var updated = 0;
  sharedContacts.forEach(function (entry) {
    if (!entry || _typeof(entry) !== 'object') {
      return;
    }
    var normalized = typeof normalizeContactEntry === 'function' ? normalizeContactEntry(entry) : _objectSpread({}, entry);
    if (!normalized || _typeof(normalized) !== 'object') {
      return;
    }
    var id = sanitize(normalized.id || entry.id);
    if (!id) {
      return;
    }
    var existingIndex = existingContacts.findIndex(function (contact) {
      return contact && contact.id === id;
    });
    var createdAt = Number.isFinite(normalized.createdAt) ? normalized.createdAt : Number.isFinite(entry.createdAt) ? entry.createdAt : Date.now();
    var updatedAtCandidate = Number.isFinite(normalized.updatedAt) ? normalized.updatedAt : Number.isFinite(entry.updatedAt) ? entry.updatedAt : createdAt;
    if (existingIndex !== -1) {
      var existing = existingContacts[existingIndex];
      var changed = false;
      ['name', 'role', 'phone', 'email', 'website', 'notes'].forEach(function (field) {
        var incoming = sanitize(Object.prototype.hasOwnProperty.call(normalized, field) ? normalized[field] : entry[field]);
        if (!incoming) {
          return;
        }
        var currentValue = sanitize(existing[field]);
        if (!currentValue) {
          existing[field] = incoming;
          changed = true;
        }
      });
      var incomingAvatar = sanitize(normalized.avatar || entry.avatar);
      if (incomingAvatar && !sanitize(existing.avatar)) {
        existing.avatar = incomingAvatar;
        changed = true;
      }
      if (!Number.isFinite(existing.createdAt) && Number.isFinite(createdAt)) {
        existing.createdAt = createdAt;
        changed = true;
      }
      if (Number.isFinite(updatedAtCandidate) && (!Number.isFinite(existing.updatedAt) || existing.updatedAt < updatedAtCandidate)) {
        existing.updatedAt = updatedAtCandidate;
        changed = true;
      } else if (changed && Number.isFinite(existing.updatedAt)) {
        existing.updatedAt = Date.now();
      } else if (changed && !Number.isFinite(existing.updatedAt)) {
        existing.updatedAt = Date.now();
      }
      if (changed) {
        updated += 1;
      }
      return;
    }
    var newContact = {
      id: id,
      name: sanitize(normalized.name || entry.name),
      role: sanitize(normalized.role || entry.role),
      phone: sanitize(normalized.phone || entry.phone),
      email: sanitize(normalized.email || entry.email),
      website: sanitize(normalized.website || entry.website),
      notes: sanitize(normalized.notes || entry.notes),
      avatar: sanitize(normalized.avatar || entry.avatar),
      createdAt: createdAt,
      updatedAt: updatedAtCandidate
    };
    if (!newContact.avatar) {
      delete newContact.avatar;
    }
    existingContacts.push(newContact);
    added += 1;
  });
  if (!added && !updated) {
    return {
      added: 0,
      updated: 0
    };
  }
  try {
    if (typeof sortContacts === 'function') {
      contactsCache = sortContacts(existingContacts);
    } else {
      contactsCache = existingContacts.filter(Boolean);
    }
  } catch (sortError) {
    console.warn('Shared contact merge could not sort contacts', sortError);
    contactsCache = existingContacts.filter(Boolean);
  }
  if (typeof saveContactsToStorage === 'function') {
    try {
      saveContactsToStorage(contactsCache);
    } catch (saveError) {
      console.warn('Shared contact merge could not persist contacts', saveError);
    }
  }
  if (typeof renderContactsList === 'function') {
    try {
      renderContactsList();
    } catch (renderError) {
      void renderError;
    }
  }
  if (typeof updateContactPickers === 'function') {
    try {
      updateContactPickers();
    } catch (pickerError) {
      void pickerError;
    }
  }
  return {
    added: added,
    updated: updated
  };
}
function applySharedSetup(shared) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  try {
    var decoded = decodeSharedSetup(typeof shared === 'string' ? JSON.parse(shared) : shared);
    if (decoded && decoded.contacts) {
      mergeSharedContactsIntoCache(decoded.contacts);
    }
    deactivateSharedImportProjectPreset();
    var sharedRulesFromData = Array.isArray(decoded.autoGearRules) ? decoded.autoGearRules : null;
    var providedRules = Array.isArray(options.sharedAutoGearRules) && options.sharedAutoGearRules.length ? options.sharedAutoGearRules : sharedRulesFromData;
    var hasProvidedRules = Array.isArray(providedRules) && providedRules.length > 0;
    var providedMode = options.autoGearMode;
    var modes = Array.isArray(providedMode) ? providedMode.slice() : typeof providedMode === 'string' ? [providedMode] : [];
    modes = modes.filter(function (value, index, arr) {
      return (value === 'none' || value === 'project' || value === 'global') && arr.indexOf(value) === index;
    });
    if (!modes.length) {
      modes = hasProvidedRules ? ['project'] : ['none'];
    }
    if (modes.length > 1 && modes.includes('none')) {
      modes = modes.filter(function (value) {
        return value !== 'none';
      });
    }
    if (!modes.length) {
      modes = hasProvidedRules ? ['project'] : ['none'];
    }
    var applyGlobal = modes.includes('global');
    var applyProject = modes.includes('project');
    var applyNoneOnly = modes.length === 1 && modes[0] === 'none';
    var autoGearUpdated = false;
    if (applyGlobal) {
      if (hasProvidedRules) {
        var merged = mergeAutoGearRules(getBaseAutoGearRules(), providedRules);
        var preset = ensureSharedAutoGearPreset(merged, decoded);
        if (preset) {
          setActiveAutoGearPresetId(preset.id, {
            persist: true,
            skipRender: true
          });
        }
        setAutoGearRules(merged);
        autoGearUpdated = true;
      } else if (usingProjectAutoGearRules()) {
        clearProjectAutoGearRules();
        autoGearUpdated = true;
      }
    }
    if (applyProject) {
      if (hasProvidedRules) {
        var _preset = ensureSharedAutoGearPreset(providedRules, decoded);
        if (_preset) {
          activateSharedImportProjectPreset(_preset.id);
        }
        useProjectAutoGearRules(providedRules);
      } else {
        clearProjectAutoGearRules();
        deactivateSharedImportProjectPreset();
      }
      autoGearUpdated = true;
    } else if (!applyGlobal && (applyNoneOnly || !hasProvidedRules)) {
      if (usingProjectAutoGearRules()) {
        clearProjectAutoGearRules();
        deactivateSharedImportProjectPreset();
        autoGearUpdated = true;
      }
    }
    if (autoGearUpdated) {
      renderAutoGearRulesList();
      updateAutoGearCatalogOptions();
    }
    if (decoded.changedDevices) {
      applyDeviceChanges(decoded.changedDevices);
    }
    if (setupNameInput && decoded.setupName) {
      setupNameInput.value = decoded.setupName;
      setupNameInput.dispatchEvent(new Event('input'));
    }
    resetSelectsToNone(motorSelects);
    resetSelectsToNone(controllerSelects);
    setSelectValue(cameraSelect, decoded.camera);
    updateBatteryPlateVisibility();
    setSelectValue(batteryPlateSelect, decoded.batteryPlate);
    applyBatteryPlateSelectionFromBattery(decoded.battery, batteryPlateSelect ? batteryPlateSelect.value : '');
    updateBatteryOptions();
    setSelectValue(monitorSelect, decoded.monitor);
    setSelectValue(videoSelect, decoded.video);
    if (typeof updateCageSelectOptions === 'function') {
      updateCageSelectOptions(decoded.cage);
    } else {
      setSelectValue(cageSelect, decoded.cage);
    }
    setSelectValue(distanceSelect, decoded.distance);
    if (Array.isArray(decoded.motors)) {
      decoded.motors.forEach(function (val, i) {
        if (motorSelects[i]) setSelectValue(motorSelects[i], val);
      });
    }
    if (Array.isArray(decoded.controllers)) {
      decoded.controllers.forEach(function (val, i) {
        if (controllerSelects[i]) setSelectValue(controllerSelects[i], val);
      });
    }
    setSelectValue(batterySelect, decoded.battery);
    applyBatteryPlateSelectionFromBattery(decoded.battery, batteryPlateSelect ? batteryPlateSelect.value : '');
    setSelectValue(hotswapSelect, decoded.batteryHotswap);
    var sharedPowerApplied = false;
    if (decoded.powerSelection && typeof applyStoredPowerSelection === 'function') {
      sharedPowerApplied = applyStoredPowerSelection(decoded.powerSelection);
    }
    if (typeof decoded.battery === 'string' && decoded.battery.trim() || typeof decoded.batteryHotswap === 'string' && decoded.batteryHotswap.trim()) {
      updateBatteryOptions();
    } else if (sharedPowerApplied) {
      updateBatteryOptions();
    }
    if (typeof setManualDiagramPositions === 'function') {
      var sharedDiagramPositions = {};
      if (typeof normalizeDiagramPositionsInput === 'function' && decoded.diagramPositions) {
        sharedDiagramPositions = normalizeDiagramPositionsInput(decoded.diagramPositions);
      }
      setManualDiagramPositions(sharedDiagramPositions, {
        render: false
      });
    }
    saveCurrentSession();
    if (Array.isArray(decoded.feedback) && decoded.feedback.length) {
      var key = getCurrentSetupKey();
      var fb = loadFeedbackSafe();
      fb[key] = (fb[key] || []).concat(decoded.feedback);
      saveFeedbackSafe(fb);
    }
    currentProjectInfo = decoded.projectInfo || null;
    if (projectForm) populateProjectForm(currentProjectInfo || {});
    var gearDisplayed = false;
    var combinedHtml = '';
    if (decoded.projectHtml || decoded.gearList) {
      combinedHtml = "".concat(decoded.projectHtml || '').concat(decoded.gearList || '');
    }
    if (!combinedHtml && decoded.projectInfo && typeof generateGearListHtml === 'function') {
      combinedHtml = generateGearListHtml(decoded.projectInfo || {});
    }
    if (!combinedHtml && typeof generateGearListHtml === 'function') {
      combinedHtml = generateGearListHtml(currentProjectInfo || {});
    }
    if (combinedHtml) {
      displayGearAndRequirements(combinedHtml);
      ensureGearListActions();
      bindGearListCageListener();
      bindGearListEasyrigListener();
      bindGearListSliderBowlListener();
      bindGearListProGaffTapeListener();
      bindGearListDirectorMonitorListener();
      gearDisplayed = true;
    }
    if (decoded.gearSelectors && gearDisplayed) {
      applyGearListSelectors(decoded.gearSelectors);
    }
    if (gearDisplayed && Array.isArray(decoded.ownedGearMarkers) && decoded.ownedGearMarkers.length) {
      applyImportedOwnedGearMarkers(decoded.ownedGearMarkers, {
        root: gearListOutput
      });
    }
    if (decoded.projectInfo || decoded.gearSelectors || decoded.gearList || Object.prototype.hasOwnProperty.call(decoded, 'gearListAndProjectRequirementsGenerated')) {
      var currentGearList = getCurrentGearListHtml();
      var payload = {
        projectInfo: decoded.projectInfo || null,
        gearListAndProjectRequirementsGenerated: Boolean(currentGearList)
      };
      if (decoded.gearSelectors && Object.keys(decoded.gearSelectors).length) {
        payload.gearSelectors = decoded.gearSelectors;
      }
      if (typeof getDiagramManualPositions === 'function') {
        var diagramPositions = getDiagramManualPositions();
        if (diagramPositions && Object.keys(diagramPositions).length) {
          payload.diagramPositions = diagramPositions;
        }
      }
      var activeRules = getProjectScopedAutoGearRules();
      if (activeRules && activeRules.length) {
        payload.autoGearRules = activeRules;
      }
      var selectedName = setupSelect && typeof setupSelect.value === 'string' ? setupSelect.value.trim() : '';
      var typedName = setupNameInput && typeof setupNameInput.value === 'string' ? setupNameInput.value.trim() : '';
      var storageKey = selectedName || typedName;
      var hasSelectors = Object.prototype.hasOwnProperty.call(payload, 'gearSelectors');
      var hasAutoRules = payload.autoGearRules && payload.autoGearRules.length;
      if (typeof storageKey === 'string' && (payload.projectInfo || hasSelectors || payload.gearListAndProjectRequirementsGenerated || hasAutoRules || payload.diagramPositions)) {
        if (!hasAutoRules) {
          delete payload.autoGearRules;
        }
        saveProject(storageKey, payload, {
          skipOverwriteBackup: true
        });
      } else if (payload && (payload.projectInfo || hasSelectors || payload.gearListAndProjectRequirementsGenerated || hasAutoRules || payload.diagramPositions)) {
        if (!hasAutoRules) {
          delete payload.autoGearRules;
        }
        var fallbackNames = [decoded.setupName, decoded.projectInfo && decoded.projectInfo.projectName, payload.projectInfo && payload.projectInfo.projectName];
        var generatedKey = persistImportedProjectWithFallback(payload, fallbackNames);
        if (generatedKey) {
          if (setupNameInput && setupNameInput.value !== generatedKey) {
            setupNameInput.value = generatedKey;
            setupNameInput.dispatchEvent(new Event('input'));
          }
          if (typeof populateSetupSelect === 'function') {
            try {
              populateSetupSelect();
            } catch (refreshError) {
              console.warn('Unable to refresh project selector after saving imported project without a provided name', refreshError);
            }
          }
        }
      }
    }
  } catch (e) {
    console.error('Failed to apply shared setup', e);
    alert(texts[currentLang].invalidSharedLink);
  }
}
var manualQueryParamWarningShown = false;
function getQueryParam(search, key) {
  if (!key) {
    return null;
  }
  if (typeof URLSearchParams === 'function') {
    try {
      return new URLSearchParams(search).get(key);
    } catch (error) {
      if (!manualQueryParamWarningShown && typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Falling back to manual query parameter parsing.', error);
      }
      manualQueryParamWarningShown = true;
    }
  }
  if (typeof search !== 'string' || search.length === 0) {
    return null;
  }
  var query = search.charAt(0) === '?' ? search.slice(1) : search;
  if (!query) {
    return null;
  }
  var pairs = query.split('&');
  for (var i = 0; i < pairs.length; i += 1) {
    if (!pairs[i]) {
      continue;
    }
    var _pairs$i$split = pairs[i].split('='),
      _pairs$i$split2 = _slicedToArray(_pairs$i$split, 2),
      rawName = _pairs$i$split2[0],
      _pairs$i$split2$ = _pairs$i$split2[1],
      rawValue = _pairs$i$split2$ === void 0 ? '' : _pairs$i$split2$;
    if (!rawName) {
      continue;
    }
    var decodedName = void 0;
    try {
      decodedName = decodeURIComponent(rawName.replace(/\+/g, ' '));
    } catch (error) {
      if (!manualQueryParamWarningShown && typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unable to decode query parameter name', rawName, error);
      }
      manualQueryParamWarningShown = true;
      continue;
    }
    if (decodedName !== key) {
      continue;
    }
    try {
      return decodeURIComponent(rawValue.replace(/\+/g, ' '));
    } catch (error) {
      if (!manualQueryParamWarningShown && typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unable to decode query parameter value', rawValue, error);
      }
      manualQueryParamWarningShown = true;
      return rawValue;
    }
  }
  return null;
}
function buildSearchWithoutShared(search) {
  if (typeof search !== 'string' || search.length === 0) {
    return '';
  }
  var query = search.charAt(0) === '?' ? search.slice(1) : search;
  if (!query) {
    return '';
  }
  var preserved = [];
  var pairs = query.split('&');
  for (var _index9 = 0; _index9 < pairs.length; _index9 += 1) {
    var pair = pairs[_index9];
    if (!pair) {
      continue;
    }
    var _pair$split = pair.split('='),
      _pair$split2 = _slicedToArray(_pair$split, 1),
      rawName = _pair$split2[0];
    if (!rawName) {
      preserved.push(pair);
      continue;
    }
    var decodedName = void 0;
    try {
      decodedName = decodeURIComponent(rawName.replace(/\+/g, ' '));
    } catch (error) {
      if (!manualQueryParamWarningShown && typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unable to decode query parameter name', rawName, error);
      }
      manualQueryParamWarningShown = true;
      decodedName = rawName;
    }
    if (decodedName === 'shared') {
      continue;
    }
    preserved.push(pair);
  }
  if (preserved.length === 0) {
    return '';
  }
  return "?".concat(preserved.join('&'));
}
function removeSharedQueryParamFromLocation() {
  if (typeof window === 'undefined') {
    return;
  }
  var _window = window,
    location = _window.location,
    history = _window.history;
  if (!location || !history || typeof history.replaceState !== 'function') {
    return;
  }
  var pathname = typeof location.pathname === 'string' && location.pathname ? location.pathname : '/';
  var search = typeof location.search === 'string' ? location.search : '';
  var hash = typeof location.hash === 'string' ? location.hash : '';
  var updatedSearch = '';
  var handledWithNativeApi = false;
  if (typeof URLSearchParams === 'function') {
    try {
      var params = new URLSearchParams(search);
      params.delete('shared');
      var serialized = params.toString();
      updatedSearch = serialized ? "?".concat(serialized) : '';
      handledWithNativeApi = true;
    } catch (error) {
      if (!manualQueryParamWarningShown && typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unable to rewrite query string with URLSearchParams', error);
      }
      manualQueryParamWarningShown = true;
    }
  }
  if (!handledWithNativeApi) {
    updatedSearch = buildSearchWithoutShared(search);
  }
  var currentSearch = search || '';
  var nextSearch = typeof updatedSearch === 'string' ? updatedSearch : '';
  var currentUrl = "".concat(pathname).concat(currentSearch).concat(hash);
  var nextUrl = "".concat(pathname).concat(nextSearch).concat(hash);
  if (currentUrl !== nextUrl) {
    history.replaceState(null, '', nextUrl);
  }
}
function applySharedSetupFromUrl() {
  var hasSearch = typeof window !== 'undefined' && window.location && typeof window.location.search === 'string';
  var search = hasSearch ? window.location.search : '';
  var shared = getQueryParam(search, 'shared');
  if (!shared) return;
  try {
    var decompressed = LZString.decompressFromEncodedURIComponent(shared);
    if (typeof decompressed !== 'string') {
      throw new Error('Shared payload could not be decompressed');
    }
    var data = JSON.parse(decompressed);
    applySharedSetup(data);
    if (typeof updateCalculations === 'function') {
      updateCalculations();
    }
    removeSharedQueryParamFromLocation();
  } catch (e) {
    console.error('Failed to apply shared setup from URL', e);
  }
}
function getTrackedPowerSelects() {
  var maybeHotswap = typeof hotswapSelect === 'undefined' ? null : hotswapSelect;
  return [cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, maybeHotswap, batteryPlateSelect].filter(Boolean);
}
function getTrackedPowerSelectsWithSetup() {
  var selects = getTrackedPowerSelects();
  var maybeSetup = typeof setupSelect === 'undefined' ? null : setupSelect;
  if (maybeSetup) {
    selects.push(maybeSetup);
  }
  return selects;
}
function forEachTrackedSelect(collection, handler) {
  if (!collection || typeof handler !== 'function') {
    return;
  }
  if (typeof collection.forEach === 'function') {
    collection.forEach(handler);
    return;
  }
  var list = Array.isArray(collection) ? collection : Array.from(collection || []);
  list.forEach(handler);
}
forEachTrackedSelect(getTrackedPowerSelects(), function (sel) {
  sel.addEventListener('change', updateCalculations);
});
if (cameraSelect) {
  cameraSelect.addEventListener('change', function () {
    updateBatteryPlateVisibility();
    updateBatteryOptions();
    if (typeof updateCageSelectOptions === 'function') {
      updateCageSelectOptions();
    }
    var desiredFrameRate = currentProjectInfo && currentProjectInfo.recordingFrameRate;
    var desiredSlowMotionFrameRate = currentProjectInfo && currentProjectInfo.slowMotionRecordingFrameRate;
    populateRecordingResolutionDropdown(currentProjectInfo && currentProjectInfo.recordingResolution);
    populateSensorModeDropdown(currentProjectInfo && currentProjectInfo.sensorMode);
    populateSlowMotionRecordingResolutionDropdown(currentProjectInfo && currentProjectInfo.slowMotionRecordingResolution);
    populateSlowMotionSensorModeDropdown(currentProjectInfo && currentProjectInfo.slowMotionSensorMode);
    if (typeof populateFrameRateDropdown === 'function') {
      populateFrameRateDropdown(desiredFrameRate);
    }
    if (typeof populateSlowMotionFrameRateDropdown === 'function') {
      populateSlowMotionFrameRateDropdown(desiredSlowMotionFrameRate);
    }
    if (typeof updateStorageRequirementTypeOptions === 'function') {
      updateStorageRequirementTypeOptions();
    }
    if (typeof document !== 'undefined' && typeof document.dispatchEvent === 'function' && typeof CustomEvent === 'function') {
      try {
        document.dispatchEvent(new CustomEvent('camera-selection-changed'));
      } catch (error) {
        void error;
      }
    }
  });
}
if (sensorModeDropdown) {
  sensorModeDropdown.addEventListener('change', function () {
    if (typeof populateFrameRateDropdown === 'function') {
      populateFrameRateDropdown(getCurrentFrameRateInputValue());
    }
  });
}
if (recordingResolutionDropdown) {
  recordingResolutionDropdown.addEventListener('change', function () {
    if (typeof populateFrameRateDropdown === 'function') {
      populateFrameRateDropdown(getCurrentFrameRateInputValue());
    }
  });
}
if (slowMotionSensorModeDropdown) {
  slowMotionSensorModeDropdown.addEventListener('change', function () {
    if (typeof populateSlowMotionFrameRateDropdown === 'function') {
      populateSlowMotionFrameRateDropdown(getFrameRateInputValue(slowMotionRecordingFrameRateInput));
    }
  });
}
if (slowMotionRecordingResolutionDropdown) {
  slowMotionRecordingResolutionDropdown.addEventListener('change', function () {
    if (typeof populateSlowMotionFrameRateDropdown === 'function') {
      populateSlowMotionFrameRateDropdown(getFrameRateInputValue(slowMotionRecordingFrameRateInput));
    }
  });
}
if (slowMotionAspectRatioSelect) {
  slowMotionAspectRatioSelect.addEventListener('change', function () {
    if (typeof populateSlowMotionFrameRateDropdown === 'function') {
      populateSlowMotionFrameRateDropdown(getFrameRateInputValue(slowMotionRecordingFrameRateInput));
    }
  });
}
if (monitoringConfigurationSelect) {
  monitoringConfigurationSelect.addEventListener('change', function () {
    monitoringConfigurationUserChanged = true;
    updateViewfinderSettingsVisibility();
  });
}
if (monitorSelect) {
  monitorSelect.addEventListener('change', updateMonitoringConfigurationOptions);
}
if (batteryPlateSelect) batteryPlateSelect.addEventListener('change', updateBatteryOptions);
if (batterySelect) batterySelect.addEventListener('change', updateBatteryOptions);
if (hotswapSelect) hotswapSelect.addEventListener('change', updateCalculations);
forEachTrackedSelect(motorSelects, function (sel) {
  if (sel) sel.addEventListener('change', updateCalculations);
});
forEachTrackedSelect(controllerSelects, function (sel) {
  if (sel) sel.addEventListener('change', updateCalculations);
});
forEachTrackedSelect(getTrackedPowerSelectsWithSetup(), function (sel) {
  sel.addEventListener('change', saveCurrentSession);
});
forEachTrackedSelect(motorSelects, function (sel) {
  if (sel) sel.addEventListener('change', saveCurrentSession);
});
forEachTrackedSelect(controllerSelects, function (sel) {
  if (sel) sel.addEventListener('change', saveCurrentSession);
});
if (setupNameInput) {
  var handleSetupNameInput = function handleSetupNameInput() {
    var typedName = setupNameInput.value ? setupNameInput.value.trim() : '';
    var selectedName = setupSelect ? setupSelect.value : '';
    var renameInProgress = Boolean(selectedName && typedName && typedName !== selectedName);
    saveCurrentSession({
      skipGearList: renameInProgress
    });
  };
  setupNameInput.addEventListener("input", handleSetupNameInput);
}
forEachTrackedSelect(getTrackedPowerSelects(), function (sel) {
  sel.addEventListener('change', saveCurrentGearList);
});
forEachTrackedSelect(motorSelects, function (sel) {
  if (sel) sel.addEventListener('change', saveCurrentGearList);
});
forEachTrackedSelect(controllerSelects, function (sel) {
  if (sel) sel.addEventListener('change', saveCurrentGearList);
});
forEachTrackedSelect(getTrackedPowerSelects(), function (sel) {
  sel.addEventListener('change', checkSetupChanged);
});
forEachTrackedSelect(motorSelects, function (sel) {
  if (sel) sel.addEventListener('change', checkSetupChanged);
});
forEachTrackedSelect(controllerSelects, function (sel) {
  if (sel) sel.addEventListener('change', checkSetupChanged);
});
if (setupNameInput) setupNameInput.addEventListener('input', checkSetupChanged);
forEachTrackedSelect(getTrackedPowerSelects(), function (sel) {
  sel.addEventListener('change', autoSaveCurrentSetup);
});
forEachTrackedSelect(motorSelects, function (sel) {
  if (sel) sel.addEventListener('change', autoSaveCurrentSetup);
});
forEachTrackedSelect(controllerSelects, function (sel) {
  if (sel) sel.addEventListener('change', autoSaveCurrentSetup);
});
if (setupNameInput) setupNameInput.addEventListener('change', autoSaveCurrentSetup);
function flushProjectAutoSaveOnExit(eventOrOptions) {
  if (factoryResetInProgress) return;
  var event = null;
  var options = null;
  if (eventOrOptions && _typeof(eventOrOptions) === 'object') {
    if (typeof eventOrOptions.type === 'string') {
      event = eventOrOptions;
    } else {
      options = eventOrOptions;
    }
  }
  var providedReason = options && typeof options.reason === 'string' && options.reason.trim() ? options.reason.trim() : null;
  var eventReason = event && typeof event.type === 'string' && event.type ? "before-".concat(event.type) : null;
  var flushReason = providedReason || eventReason || 'before-exit';
  var scope = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : null;
  var hideIndicator = null;
  if (scope && typeof scope.__cineShowAutoBackupIndicator === 'function') {
    try {
      var langTexts = texts[currentLang] || {};
      var fallbackTexts = texts.en || {};
      var message = langTexts.autoBackupInProgressNotice || fallbackTexts.autoBackupInProgressNotice || 'Auto backup in progress. Performance may pause briefly.';
      hideIndicator = scope.__cineShowAutoBackupIndicator(message);
    } catch (indicatorError) {
      console.warn('Failed to show auto backup indicator before exit', indicatorError);
      hideIndicator = null;
    }
  }
  notifyAutoBackupChange({
    immediate: true,
    reason: flushReason,
    pending: true
  });
  try {
    if (scope && typeof scope.autoBackup === 'function') {
      scope.autoBackup({
        suppressSuccess: true,
        triggerAutoSaveNotification: true,
        reason: 'before-reload'
      });
    }
  } catch (backupError) {
    console.warn('Failed to auto backup before exit', backupError);
  } finally {
    if (hideIndicator) {
      try {
        hideIndicator();
      } catch (hideError) {
        console.warn('Failed to hide auto backup indicator after exit flush', hideError);
      }
    }
  }
  scheduleProjectAutoSave(true);
}
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') {
      flushProjectAutoSaveOnExit({
        reason: 'before-visibility-hidden'
      });
    }
  });
}
if (typeof window !== 'undefined') {
  ['pagehide', 'beforeunload', 'freeze'].forEach(function (eventName) {
    window.addEventListener(eventName, flushProjectAutoSaveOnExit);
  });
}
// Enable Save button only when a setup name is entered. Enter saves only after
// the input is finalized (no active composition), aligning with the IME guard.
if (setupNameInput && saveSetupBtn) {
  var toggleSaveSetupBtn = function toggleSaveSetupBtn() {
    saveSetupBtn.disabled = !setupNameInput.value.trim();
  };
  toggleSaveSetupBtn();
  setupNameInput.addEventListener("input", toggleSaveSetupBtn);
  setupNameInput.addEventListener("keydown", function (e) {
    if (e.isComposing || e.keyCode === 229) {
      return;
    }
    if (e.key === "Enter" && !saveSetupBtn.disabled) {
      saveSetupBtn.click();
    }
  });
}
var warnMountVoltageHelper = typeof warnMissingMountVoltageHelper === 'function' ? warnMissingMountVoltageHelper : function () {};
var updateThemeColor = function updateThemeColor() {};
var setToggleIcon = function setToggleIcon() {};
var applyDarkMode = function applyDarkMode() {};
var applyHighContrast = function applyHighContrast() {};
var applyReduceMotion = function applyReduceMotion() {};
var applyRelaxedSpacing = function applyRelaxedSpacing() {};
var applyPinkMode = function applyPinkMode() {};
var persistPinkModePreference = function persistPinkModePreference() {};
var rememberSettingsPinkModeBaseline = function rememberSettingsPinkModeBaseline() {};
var revertSettingsPinkModeIfNeeded = function revertSettingsPinkModeIfNeeded() {};
var rememberSettingsTemperatureUnitBaseline = function rememberSettingsTemperatureUnitBaseline() {};
var revertSettingsTemperatureUnitIfNeeded = function revertSettingsTemperatureUnitIfNeeded() {};
var rememberSettingsFocusScaleBaseline = function rememberSettingsFocusScaleBaseline() {};
var revertSettingsFocusScaleIfNeeded = function revertSettingsFocusScaleIfNeeded() {};
var applyShowAutoBackupsPreference = function applyShowAutoBackupsPreference() {};
var rememberSettingsShowAutoBackupsBaseline = function rememberSettingsShowAutoBackupsBaseline() {};
var revertSettingsShowAutoBackupsIfNeeded = function revertSettingsShowAutoBackupsIfNeeded() {};
var rememberSettingsMountVoltagesBaseline = function rememberSettingsMountVoltagesBaseline() {};
var revertSettingsMountVoltagesIfNeeded = function revertSettingsMountVoltagesIfNeeded() {};
var handlePinkModeIconPress = function handlePinkModeIconPress() {};
var triggerPinkModeIconAnimation = function triggerPinkModeIconAnimation() {};
var pendingPinkModeSupportCalls = [];
var pinkModeSupportFlushScheduled = false;
var PINK_MODE_SUPPORT_QUEUE_LIMIT = 25;
function clonePinkModeSupportArgs(args) {
  if (!Array.isArray(args)) {
    return args;
  }
  try {
    return args.slice();
  } catch (error) {
    void error;
  }
  return args;
}
function invokePinkModeSupport(methodName, args, warningMessage) {
  if (typeof PINK_MODE_SUPPORT_API === 'undefined' || !PINK_MODE_SUPPORT_API) {
    return undefined;
  }
  var method = PINK_MODE_SUPPORT_API[methodName];
  if (typeof method !== 'function') {
    return undefined;
  }
  try {
    return method.apply(PINK_MODE_SUPPORT_API, Array.isArray(args) ? args : []);
  } catch (error) {
    if (typeof console !== 'undefined' && console && typeof console.warn === 'function' && warningMessage) {
      console.warn(warningMessage, error);
    }
  }
  return undefined;
}
function flushPendingPinkModeSupportCalls() {
  pinkModeSupportFlushScheduled = false;
  if (typeof PINK_MODE_SUPPORT_API === 'undefined' || !PINK_MODE_SUPPORT_API) {
    if (pendingPinkModeSupportCalls.length && typeof setTimeout === 'function') {
      pinkModeSupportFlushScheduled = true;
      setTimeout(flushPendingPinkModeSupportCalls, 50);
    }
    return;
  }
  while (pendingPinkModeSupportCalls.length) {
    var entry = pendingPinkModeSupportCalls.shift();
    if (!entry) {
      continue;
    }
    try {
      invokePinkModeSupport(entry.methodName, entry.args, entry.warningMessage);
    } catch (error) {
      void error;
    }
  }
}
function schedulePinkModeSupportFlush() {
  if (pinkModeSupportFlushScheduled || typeof setTimeout !== 'function') {
    return;
  }
  pinkModeSupportFlushScheduled = true;
  setTimeout(flushPendingPinkModeSupportCalls, 0);
}
function enqueuePinkModeSupportCall(methodName, args, warningMessage) {
  if (pendingPinkModeSupportCalls.length >= PINK_MODE_SUPPORT_QUEUE_LIMIT) {
    pendingPinkModeSupportCalls.shift();
  }
  pendingPinkModeSupportCalls.push({
    methodName: methodName,
    args: clonePinkModeSupportArgs(args),
    warningMessage: warningMessage
  });
  schedulePinkModeSupportFlush();
}
function callPinkModeSupport(methodName, args, warningMessage) {
  var apiReady = typeof PINK_MODE_SUPPORT_API !== 'undefined' && PINK_MODE_SUPPORT_API;
  if (!apiReady) {
    enqueuePinkModeSupportCall(methodName, args, warningMessage);
    return undefined;
  }
  var result = invokePinkModeSupport(methodName, args, warningMessage);
  if (pendingPinkModeSupportCalls.length) {
    flushPendingPinkModeSupportCalls();
  }
  return result;
}
var FALLBACK_TRIGGER_PINK_MODE_ICON_RAIN = function FALLBACK_TRIGGER_PINK_MODE_ICON_RAIN() {
  return callPinkModeSupport('triggerPinkModeIconRain', null, 'cineSession: triggerPinkModeIconRain failed.');
};
var sessionTriggerPinkModeIconRain = typeof window !== 'undefined' && typeof window.triggerPinkModeIconRain === 'function' ? window.triggerPinkModeIconRain : FALLBACK_TRIGGER_PINK_MODE_ICON_RAIN;
var startPinkModeIconRotation = function startPinkModeIconRotation() {};
var stopPinkModeIconRotation = function stopPinkModeIconRotation() {};
var FALLBACK_START_PINK_MODE_ANIMATED_ICONS = function FALLBACK_START_PINK_MODE_ANIMATED_ICONS() {
  return callPinkModeSupport('startPinkModeAnimatedIcons', null, 'cineSession: startPinkModeAnimatedIcons failed.');
};
var sessionStartPinkModeAnimatedIcons = typeof window !== 'undefined' && typeof window.startPinkModeAnimatedIcons === 'function' ? window.startPinkModeAnimatedIcons : FALLBACK_START_PINK_MODE_ANIMATED_ICONS;
var FALLBACK_STOP_PINK_MODE_ANIMATED_ICONS = function FALLBACK_STOP_PINK_MODE_ANIMATED_ICONS() {
  return callPinkModeSupport('stopPinkModeAnimatedIcons', null, 'cineSession: stopPinkModeAnimatedIcons failed.');
};
var sessionStopPinkModeAnimatedIcons = typeof window !== 'undefined' && typeof window.stopPinkModeAnimatedIcons === 'function' ? window.stopPinkModeAnimatedIcons : FALLBACK_STOP_PINK_MODE_ANIMATED_ICONS;
var startPinkModeAnimatedIconRotation = function startPinkModeAnimatedIconRotation() {};
var stopPinkModeAnimatedIconRotation = function stopPinkModeAnimatedIconRotation() {};
var applyPinkModeIcon = function applyPinkModeIcon() {};
var isPinkModeActive = function isPinkModeActive() {
  return !!(typeof document !== 'undefined' && document.body && document.body.classList.contains('pink-mode'));
};
var appearanceModuleFactoryPlaceholder = ensureSessionRuntimePlaceholder('cineSettingsAppearance', function () {
  return null;
});
var appearanceModuleValidator = function appearanceModuleValidator(candidate) {
  return !!candidate && typeof candidate.initialize === 'function';
};
var appearanceModule = null;
var themePreferenceController = null;
var appearanceModuleInitialized = false;
var appearanceModuleUnavailableWarningHandle = null;
function clearAppearanceModuleUnavailableWarning() {
  if (appearanceModuleUnavailableWarningHandle === null) {
    return;
  }
  try {
    clearTimeout(appearanceModuleUnavailableWarningHandle);
  } catch (clearError) {
    void clearError;
  }
  appearanceModuleUnavailableWarningHandle = null;
}
function warnAppearanceModuleUnavailable() {
  if (appearanceModuleInitialized) {
    return;
  }
  if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
    console.warn('cineSettingsAppearance module is not available; settings appearance features are limited.');
  }
}
function scheduleAppearanceModuleUnavailableWarning() {
  if (appearanceModuleUnavailableWarningHandle !== null) {
    return;
  }
  if (typeof setTimeout !== 'function') {
    warnAppearanceModuleUnavailable();
    return;
  }
  appearanceModuleUnavailableWarningHandle = setTimeout(function () {
    appearanceModuleUnavailableWarningHandle = null;
    warnAppearanceModuleUnavailable();
  }, 1500);
}
var appearanceContext = {
  document: typeof document !== 'undefined' ? document : null,
  window: typeof window !== 'undefined' ? window : null,
  elements: {
    darkModeToggle: typeof darkModeToggle !== 'undefined' ? darkModeToggle : null,
    pinkModeToggle: typeof pinkModeToggle !== 'undefined' ? pinkModeToggle : null,
    pinkModeHelpIcon: typeof pinkModeHelpIcon !== 'undefined' ? pinkModeHelpIcon : null
  },
  settings: {
    darkMode: typeof settingsDarkMode !== 'undefined' ? settingsDarkMode : null,
    highContrast: typeof settingsHighContrast !== 'undefined' ? settingsHighContrast : null,
    pinkMode: typeof settingsPinkMode !== 'undefined' ? settingsPinkMode : null,
    reduceMotion: typeof settingsReduceMotion !== 'undefined' ? settingsReduceMotion : null,
    relaxedSpacing: typeof settingsRelaxedSpacing !== 'undefined' ? settingsRelaxedSpacing : null,
    showAutoBackups: typeof settingsShowAutoBackups !== 'undefined' ? settingsShowAutoBackups : null,
    temperatureUnit: typeof settingsTemperatureUnit !== 'undefined' ? settingsTemperatureUnit : null,
    focusScale: typeof settingsFocusScale !== 'undefined' ? settingsFocusScale : null
  },
  accent: {
    accentColorInput: typeof accentColorInput !== 'undefined' ? accentColorInput : null,
    getAccentColor: function getAccentColor() {
      return accentColor;
    },
    setAccentColor: function setAccentColor(value) {
      accentColor = value;
    },
    getPrevAccentColor: function getPrevAccentColor() {
      return prevAccentColor;
    },
    setPrevAccentColor: function setPrevAccentColor(value) {
      prevAccentColor = value;
    },
    getHighContrastAccentColor: function getHighContrastAccentColor() {
      return HIGH_CONTRAST_ACCENT_COLOR;
    },
    clearAccentColorOverrides: function (_clearAccentColorOverrides) {
      function clearAccentColorOverrides() {
        return _clearAccentColorOverrides.apply(this, arguments);
      }
      clearAccentColorOverrides.toString = function () {
        return _clearAccentColorOverrides.toString();
      };
      return clearAccentColorOverrides;
    }(function () {
      if (typeof clearAccentColorOverrides === 'function') {
        clearAccentColorOverrides();
      }
    }),
    applyAccentColor: function (_applyAccentColor) {
      function applyAccentColor(_x) {
        return _applyAccentColor.apply(this, arguments);
      }
      applyAccentColor.toString = function () {
        return _applyAccentColor.toString();
      };
      return applyAccentColor;
    }(function (value) {
      if (typeof applyAccentColor === 'function') {
        applyAccentColor(value);
      }
    }),
    updateAccentColorResetButtonState: function (_updateAccentColorResetButtonState) {
      function updateAccentColorResetButtonState() {
        return _updateAccentColorResetButtonState.apply(this, arguments);
      }
      updateAccentColorResetButtonState.toString = function () {
        return _updateAccentColorResetButtonState.toString();
      };
      return updateAccentColorResetButtonState;
    }(function () {
      if (typeof updateAccentColorResetButtonState === 'function') {
        updateAccentColorResetButtonState();
      }
    }),
    refreshDarkModeAccentBoost: function (_refreshDarkModeAccentBoost) {
      function refreshDarkModeAccentBoost(_x2) {
        return _refreshDarkModeAccentBoost.apply(this, arguments);
      }
      refreshDarkModeAccentBoost.toString = function () {
        return _refreshDarkModeAccentBoost.toString();
      };
      return refreshDarkModeAccentBoost;
    }(function (payload) {
      if (typeof refreshDarkModeAccentBoost === 'function') {
        refreshDarkModeAccentBoost(payload);
      }
    }),
    isHighContrastActive: function (_isHighContrastActive) {
      function isHighContrastActive() {
        return _isHighContrastActive.apply(this, arguments);
      }
      isHighContrastActive.toString = function () {
        return _isHighContrastActive.toString();
      };
      return isHighContrastActive;
    }(function () {
      return typeof isHighContrastActive === 'function' ? isHighContrastActive() : false;
    })
  },
  cameraColors: {
    getColors: function getColors() {
      return getCameraLetterColorsSafeSession();
    },
    setColors: function setColors(palette) {
      return applyCameraLetterColors(palette);
    }
  },
  icons: {
    registry: (typeof ICON_GLYPHS === "undefined" ? "undefined" : _typeof(ICON_GLYPHS)) === 'object' ? ICON_GLYPHS : null,
    applyIconGlyph: typeof applyIconGlyph === 'function' ? function (element, glyph) {
      return applyIconGlyph(element, glyph);
    } : null,
    ensureSvgHasAriaHidden: typeof ensureSvgHasAriaHidden === 'function' ? ensureSvgHasAriaHidden : null,
    pinkModeIcons: (typeof pinkModeIcons === "undefined" ? "undefined" : _typeof(pinkModeIcons)) === 'object' ? pinkModeIcons : null,
    startPinkModeAnimatedIcons: function startPinkModeAnimatedIcons() {
      var impl = (typeof window !== 'undefined' && typeof window.startPinkModeAnimatedIcons === 'function' ? window.startPinkModeAnimatedIcons : null) || sessionStartPinkModeAnimatedIcons;
      return typeof impl === 'function' ? impl.apply(void 0, arguments) : undefined;
    },
    stopPinkModeAnimatedIcons: function stopPinkModeAnimatedIcons() {
      var impl = (typeof window !== 'undefined' && typeof window.stopPinkModeAnimatedIcons === 'function' ? window.stopPinkModeAnimatedIcons : null) || sessionStopPinkModeAnimatedIcons;
      return typeof impl === 'function' ? impl.apply(void 0, arguments) : undefined;
    },
    triggerPinkModeIconRain: function triggerPinkModeIconRain() {
      var impl = (typeof window !== 'undefined' && typeof window.triggerPinkModeIconRain === 'function' ? window.triggerPinkModeIconRain : null) || sessionTriggerPinkModeIconRain;
      return typeof impl === 'function' ? impl.apply(void 0, arguments) : undefined;
    }
  },
  storage: {
    getLocalStorage: function getLocalStorage() {
      try {
        return typeof localStorage !== 'undefined' ? localStorage : null;
      } catch (storageError) {
        void storageError;
        return null;
      }
    },
    getSafeLocalStorage: function (_getSafeLocalStorage) {
      function getSafeLocalStorage() {
        return _getSafeLocalStorage.apply(this, arguments);
      }
      getSafeLocalStorage.toString = function () {
        return _getSafeLocalStorage.toString();
      };
      return getSafeLocalStorage;
    }(function () {
      try {
        if (typeof getSafeLocalStorage === 'function') {
          return getSafeLocalStorage();
        }
      } catch (storageError) {
        console.warn('cineSettingsAppearance: getSafeLocalStorage threw while building context', storageError);
      }
      return null;
    }),
    resolveSafeLocalStorage: function (_resolveSafeLocalStorage) {
      function resolveSafeLocalStorage() {
        return _resolveSafeLocalStorage.apply(this, arguments);
      }
      resolveSafeLocalStorage.toString = function () {
        return _resolveSafeLocalStorage.toString();
      };
      return resolveSafeLocalStorage;
    }(function () {
      try {
        if (typeof resolveSafeLocalStorage === 'function') {
          return resolveSafeLocalStorage();
        }
      } catch (storageError) {
        console.warn('cineSettingsAppearance: resolveSafeLocalStorage threw while building context', storageError);
      }
      return null;
    })
  },
  preferences: {
    getTemperatureUnit: function getTemperatureUnit() {
      return localTemperatureUnit;
    },
    setTemperatureUnit: function setTemperatureUnit(value) {
      localTemperatureUnit = normalizeTemperatureUnitValue(value);
    },
    applyTemperatureUnitPreference: applyTemperatureUnitPreferenceWithFallback,
    getFocusScale: function getFocusScale() {
      var globalScale = typeof focusScalePreference === 'string' ? focusScalePreference : sessionFocusScale;
      sessionFocusScale = typeof normalizeFocusScale === 'function' ? normalizeFocusScale(globalScale) : globalScale;
      return sessionFocusScale;
    },
    setFocusScale: function setFocusScale(value) {
      sessionFocusScale = typeof normalizeFocusScale === 'function' ? normalizeFocusScale(value) : value;
    },
    applyFocusScalePreference: typeof applyFocusScalePreference === 'function' ? function (value, opts) {
      applyFocusScalePreference(value, opts);
      sessionFocusScale = typeof normalizeFocusScale === 'function' ? normalizeFocusScale(value) : value;
    } : null,
    getShowAutoBackups: function getShowAutoBackups() {
      return showAutoBackups;
    },
    setShowAutoBackups: function setShowAutoBackups(value) {
      showAutoBackups = Boolean(value);
    },
    ensureAutoBackupsFromProjects: typeof ensureAutoBackupsFromProjects === 'function' ? ensureAutoBackupsFromProjects : null
  },
  autoBackups: {
    populateSetupSelect: typeof populateSetupSelect === 'function' ? populateSetupSelect : null,
    setupSelect: typeof setupSelect !== 'undefined' ? setupSelect : null,
    setupNameInput: typeof setupNameInput !== 'undefined' ? setupNameInput : null
  },
  mountVoltages: {
    getPreferencesClone: function getPreferencesClone() {
      return getSessionMountVoltagePreferencesClone();
    },
    applyPreferences: function applyPreferences(preferences, options) {
      return applySessionMountVoltagePreferences(preferences, options);
    },
    supportedTypes: typeof SUPPORTED_MOUNT_VOLTAGE_TYPES !== 'undefined' ? SUPPORTED_MOUNT_VOLTAGE_TYPES : [],
    defaultVoltages: typeof DEFAULT_MOUNT_VOLTAGES !== 'undefined' ? DEFAULT_MOUNT_VOLTAGES : {},
    updateInputsFromState: function updateInputsFromState() {
      var updateFn = getSessionRuntimeFunction('updateMountVoltageInputsFromState');
      if (updateFn) {
        try {
          updateFn();
        } catch (updateError) {
          warnMountVoltageHelper('updateMountVoltageInputsFromState', updateError);
        }
      } else {
        warnMountVoltageHelper('updateMountVoltageInputsFromState');
      }
    },
    warnMissingHelper: function warnMissingHelper(name, error) {
      warnMountVoltageHelper(name, error);
    }
  }
};
function detectSystemThemePreference() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return null;
  }
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch (error) {
    if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
      console.warn('cineSettingsAppearance: detectSystemPreference failed', error);
    }
  }
  return null;
}
function buildThemePreferenceController(module) {
  if (!module || typeof module.createThemePreferenceController !== 'function') {
    return null;
  }
  try {
    return module.createThemePreferenceController({
      detectSystemPreference: detectSystemThemePreference
    });
  } catch (error) {
    if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
      console.warn('cineSettingsAppearance: failed to create theme preference controller.', error);
    }
  }
  return null;
}
function applyAppearanceModuleBindings(module) {
  if (!module || _typeof(module) !== 'object') {
    return false;
  }
  appearanceModule = module;
  clearAppearanceModuleUnavailableWarning();
  updateThemeColor = module.updateThemeColor || updateThemeColor;
  setToggleIcon = module.setToggleIcon || setToggleIcon;
  applyDarkMode = module.applyDarkMode || applyDarkMode;
  applyHighContrast = module.applyHighContrast || applyHighContrast;
  applyReduceMotion = module.applyReduceMotion || applyReduceMotion;
  applyRelaxedSpacing = module.applyRelaxedSpacing || applyRelaxedSpacing;
  applyPinkMode = module.applyPinkMode || applyPinkMode;
  persistPinkModePreference = module.persistPinkModePreference || persistPinkModePreference;
  rememberSettingsPinkModeBaseline = module.rememberSettingsPinkModeBaseline || rememberSettingsPinkModeBaseline;
  revertSettingsPinkModeIfNeeded = module.revertSettingsPinkModeIfNeeded || revertSettingsPinkModeIfNeeded;
  rememberSettingsTemperatureUnitBaseline = module.rememberSettingsTemperatureUnitBaseline || rememberSettingsTemperatureUnitBaseline;
  revertSettingsTemperatureUnitIfNeeded = module.revertSettingsTemperatureUnitIfNeeded || revertSettingsTemperatureUnitIfNeeded;
  rememberSettingsFocusScaleBaseline = module.rememberSettingsFocusScaleBaseline || rememberSettingsFocusScaleBaseline;
  revertSettingsFocusScaleIfNeeded = module.revertSettingsFocusScaleIfNeeded || revertSettingsFocusScaleIfNeeded;
  applyShowAutoBackupsPreference = module.applyShowAutoBackupsPreference || applyShowAutoBackupsPreference;
  rememberSettingsShowAutoBackupsBaseline = module.rememberSettingsShowAutoBackupsBaseline || rememberSettingsShowAutoBackupsBaseline;
  revertSettingsShowAutoBackupsIfNeeded = module.revertSettingsShowAutoBackupsIfNeeded || revertSettingsShowAutoBackupsIfNeeded;
  rememberSettingsMountVoltagesBaseline = module.rememberSettingsMountVoltagesBaseline || rememberSettingsMountVoltagesBaseline;
  revertSettingsMountVoltagesIfNeeded = module.revertSettingsMountVoltagesIfNeeded || revertSettingsMountVoltagesIfNeeded;
  handlePinkModeIconPress = module.handlePinkModeIconPress || handlePinkModeIconPress;
  triggerPinkModeIconAnimation = module.triggerPinkModeIconAnimation || triggerPinkModeIconAnimation;
  sessionTriggerPinkModeIconRain = module.triggerPinkModeIconRain || sessionTriggerPinkModeIconRain;
  startPinkModeIconRotation = module.startPinkModeIconRotation || startPinkModeIconRotation;
  stopPinkModeIconRotation = module.stopPinkModeIconRotation || stopPinkModeIconRotation;
  if (typeof module.startPinkModeAnimatedIcons === 'function') {
    var previousStart = sessionStartPinkModeAnimatedIcons;
    var moduleStart = module.startPinkModeAnimatedIcons;
    sessionStartPinkModeAnimatedIcons = function sessionStartPinkModeAnimatedIcons() {
      var iconsContext = appearanceContext && appearanceContext.icons ? appearanceContext.icons : null;
      var previousIconsStart = iconsContext ? iconsContext.startPinkModeAnimatedIcons : undefined;
      var hasWindow = typeof window !== 'undefined';
      var previousWindowStart = hasWindow ? window.startPinkModeAnimatedIcons : undefined;
      var fallbackInvoked = false;
      var fallbackResult;
      var trackFallbackStart = function trackFallbackStart() {
        fallbackInvoked = true;
        fallbackResult = previousStart.apply(void 0, arguments);
        return fallbackResult;
      };
      if (iconsContext) {
        iconsContext.startPinkModeAnimatedIcons = trackFallbackStart;
      }
      if (hasWindow) {
        window.startPinkModeAnimatedIcons = trackFallbackStart;
      }
      try {
        var result = moduleStart.apply(void 0, arguments);
        if (fallbackInvoked) {
          return fallbackResult;
        }
        if (typeof result === 'undefined') {
          return previousStart.apply(void 0, arguments);
        }
        return result;
      } catch (startError) {
        void startError;
        if (fallbackInvoked) {
          return fallbackResult;
        }
        return previousStart.apply(void 0, arguments);
      } finally {
        if (iconsContext) {
          iconsContext.startPinkModeAnimatedIcons = previousIconsStart;
        }
        if (hasWindow) {
          window.startPinkModeAnimatedIcons = previousWindowStart;
        }
      }
    };
  }
  if (typeof module.stopPinkModeAnimatedIcons === 'function') {
    var previousStop = sessionStopPinkModeAnimatedIcons;
    var moduleStop = module.stopPinkModeAnimatedIcons;
    sessionStopPinkModeAnimatedIcons = function sessionStopPinkModeAnimatedIcons() {
      var iconsContext = appearanceContext && appearanceContext.icons ? appearanceContext.icons : null;
      var previousIconsStop = iconsContext ? iconsContext.stopPinkModeAnimatedIcons : undefined;
      var hasWindow = typeof window !== 'undefined';
      var previousWindowStop = hasWindow ? window.stopPinkModeAnimatedIcons : undefined;
      var fallbackInvoked = false;
      var fallbackResult;
      var trackFallbackStop = function trackFallbackStop() {
        fallbackInvoked = true;
        fallbackResult = previousStop.apply(void 0, arguments);
        return fallbackResult;
      };
      if (iconsContext) {
        iconsContext.stopPinkModeAnimatedIcons = trackFallbackStop;
      }
      if (hasWindow) {
        window.stopPinkModeAnimatedIcons = trackFallbackStop;
      }
      try {
        var result = moduleStop.apply(void 0, arguments);
        if (fallbackInvoked) {
          return fallbackResult;
        }
        if (typeof result === 'undefined') {
          return previousStop.apply(void 0, arguments);
        }
        return result;
      } catch (stopError) {
        void stopError;
        if (fallbackInvoked) {
          return fallbackResult;
        }
        return previousStop.apply(void 0, arguments);
      } finally {
        if (iconsContext) {
          iconsContext.stopPinkModeAnimatedIcons = previousIconsStop;
        }
        if (hasWindow) {
          window.stopPinkModeAnimatedIcons = previousWindowStop;
        }
      }
    };
  }
  startPinkModeAnimatedIconRotation = module.startPinkModeAnimatedIconRotation || startPinkModeAnimatedIconRotation;
  stopPinkModeAnimatedIconRotation = module.stopPinkModeAnimatedIconRotation || stopPinkModeAnimatedIconRotation;
  applyPinkModeIcon = module.applyPinkModeIcon || applyPinkModeIcon;
  isPinkModeActive = module.isPinkModeActive || isPinkModeActive;
  if (typeof window !== 'undefined') {
    window.triggerPinkModeIconRain = sessionTriggerPinkModeIconRain;
    window.startPinkModeAnimatedIcons = sessionStartPinkModeAnimatedIcons;
    window.stopPinkModeAnimatedIcons = sessionStopPinkModeAnimatedIcons;
  }
  if (appearanceContext && appearanceContext.icons) {
    appearanceContext.icons.startPinkModeAnimatedIcons = sessionStartPinkModeAnimatedIcons;
    appearanceContext.icons.stopPinkModeAnimatedIcons = sessionStopPinkModeAnimatedIcons;
    appearanceContext.icons.triggerPinkModeIconRain = sessionTriggerPinkModeIconRain;
  }
  var controller = buildThemePreferenceController(module);
  if (controller) {
    themePreferenceController = controller;
  }
  return true;
}
function initializeAppearanceModule(factory) {
  if (!factory || typeof factory.initialize !== 'function') {
    return false;
  }
  var module = null;
  try {
    module = factory.initialize(appearanceContext) || null;
  } catch (error) {
    if (typeof console !== 'undefined' && console && typeof console.error === 'function') {
      console.error('cineSettingsAppearance: initialize() threw.', error);
    }
    return false;
  }
  if (!module || _typeof(module) !== 'object') {
    return false;
  }
  return applyAppearanceModuleBindings(module);
}
function attemptAppearanceModuleInitialization(moduleCandidate) {
  if (!appearanceModuleValidator(moduleCandidate)) {
    return false;
  }
  if (appearanceModuleInitialized) {
    return true;
  }
  var initialized = initializeAppearanceModule(moduleCandidate);
  if (initialized) {
    appearanceModuleInitialized = true;
    clearAppearanceModuleUnavailableWarning();
  }
  return initialized;
}
var resolvedAppearanceModuleFactory = appearanceModuleValidator(appearanceModuleFactoryPlaceholder) ? appearanceModuleFactoryPlaceholder : resolveModuleApi('cineSettingsAppearance', appearanceModuleValidator);
var appearanceModuleReady = attemptAppearanceModuleInitialization(resolvedAppearanceModuleFactory);
if (!appearanceModuleReady) {
  scheduleAppearanceModuleUnavailableWarning();
  var appearanceModuleWaitOptions = {
    interval: 200,
    maxAttempts: 300,
    onTimeout: function onTimeout() {
      if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
        console.warn('cineSettingsAppearance module failed to load after waiting. Appearance features remain limited.');
      }
      clearAppearanceModuleUnavailableWarning();
    }
  };
  var announceIfInitialized = function announceIfInitialized(moduleCandidate) {
    var wasInitialized = appearanceModuleInitialized;
    if (attemptAppearanceModuleInitialization(moduleCandidate) && !wasInitialized) {
      clearAppearanceModuleUnavailableWarning();
      if (typeof console !== 'undefined' && console && typeof console.info === 'function') {
        console.info('cineSettingsAppearance module became available after deferred load.');
      }
    }
  };
  whenGlobalValueAvailable('cineSettingsAppearance', appearanceModuleValidator, announceIfInitialized, appearanceModuleWaitOptions);
  whenGlobalValueAvailable('cineModuleGlobals', function (candidate) {
    return candidate && typeof candidate.whenModuleAvailable === 'function';
  }, function (moduleGlobals) {
    if (appearanceModuleInitialized) {
      return;
    }
    var resolvedModule = null;
    if (typeof moduleGlobals.getModule === 'function') {
      try {
        resolvedModule = moduleGlobals.getModule('cineSettingsAppearance');
      } catch (moduleLookupError) {
        void moduleLookupError;
        resolvedModule = null;
      }
    }
    if (appearanceModuleValidator(resolvedModule)) {
      announceIfInitialized(resolvedModule);
      return;
    }
    if (typeof moduleGlobals.whenModuleAvailable === 'function') {
      try {
        moduleGlobals.whenModuleAvailable('cineSettingsAppearance', function (moduleCandidate) {
          if (appearanceModuleValidator(moduleCandidate)) {
            announceIfInitialized(moduleCandidate);
          }
        });
      } catch (subscriptionError) {
        void subscriptionError;
      }
    }
  }, {
    interval: 200,
    maxAttempts: 150
  });
  whenGlobalValueAvailable('cineModules', function (candidate) {
    return candidate && typeof candidate.get === 'function';
  }, function (registry) {
    if (appearanceModuleInitialized) {
      return;
    }
    var resolvedModule = null;
    try {
      resolvedModule = registry.get('cineSettingsAppearance');
    } catch (registryLookupError) {
      void registryLookupError;
      resolvedModule = null;
    }
    if (appearanceModuleValidator(resolvedModule)) {
      announceIfInitialized(resolvedModule);
    }
  }, {
    interval: 200,
    maxAttempts: 150
  });
}
var CAMERA_LETTERS = ['A', 'B', 'C', 'D', 'E'];
var CAMERA_COLOR_STORAGE_KEY_SESSION = 'cameraPowerPlanner_cameraColors';
function normalizeCameraColorValue(value) {
  if (typeof value !== 'string') {
    return '';
  }
  var trimmed = value.trim();
  if (!trimmed) {
    return '';
  }
  if (/^#[0-9a-f]{6}$/i.test(trimmed)) {
    return trimmed.toLowerCase();
  }
  if (/^[0-9a-f]{6}$/i.test(trimmed)) {
    return "#".concat(trimmed.toLowerCase());
  }
  return '';
}
function generateDefaultCameraColor(letter) {
  if (letter !== 'E') {
    return '';
  }
  var generateChannel = function generateChannel() {
    var value = 0;
    if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
      var array = new Uint8Array(1);
      crypto.getRandomValues(array);
      value = array[0] / 255;
    } else {
      value = Math.random();
    }
    var channel = Math.floor(value * 200) + 28;
    return Math.max(24, Math.min(232, channel));
  };
  var components = [generateChannel(), generateChannel(), generateChannel()];
  return "#".concat(components.map(function (component) {
    return component.toString(16).padStart(2, '0');
  }).join(''));
}
function getDefaultCameraLetterColors() {
  var defaults = {
    A: '#d32f2f',
    B: '#1e88e5',
    C: '#fdd835',
    D: '#43a047',
    E: '#7b1fa2'
  };
  var generated = generateDefaultCameraColor('E');
  if (generated) {
    defaults.E = generated;
  }
  return defaults;
}
var cachedCameraLetterColors = null;
function loadCameraLetterColors() {
  if (cachedCameraLetterColors) {
    return cachedCameraLetterColors;
  }
  var defaults = getDefaultCameraLetterColors();
  var stored = null;
  try {
    var raw = localStorage.getItem(CAMERA_COLOR_STORAGE_KEY_SESSION);
    if (raw) {
      stored = JSON.parse(raw);
    }
  } catch (error) {
    console.warn('Failed to read stored camera colors', error);
    stored = null;
  }
  var resolved = _objectSpread({}, defaults);
  if (stored && _typeof(stored) === 'object') {
    CAMERA_LETTERS.forEach(function (letter) {
      var incoming = stored[letter] || stored[letter.toLowerCase()];
      var normalized = normalizeCameraColorValue(incoming);
      if (normalized) {
        resolved[letter] = normalized;
      }
    });
  } else {
    try {
      localStorage.setItem(CAMERA_COLOR_STORAGE_KEY_SESSION, JSON.stringify(resolved));
    } catch (persistError) {
      console.warn('Unable to persist default camera colors', persistError);
    }
  }
  cachedCameraLetterColors = resolved;
  return resolved;
}
function getCameraLetterColorsSafeSession() {
  var colors = loadCameraLetterColors();
  return _objectSpread({}, colors);
}
function applyCameraLetterColors() {
  var newColors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var current = _objectSpread({}, loadCameraLetterColors());
  var changed = false;
  CAMERA_LETTERS.forEach(function (letter) {
    var incoming = newColors[letter] || newColors[letter.toLowerCase()];
    var normalized = normalizeCameraColorValue(incoming);
    if (normalized && current[letter] !== normalized) {
      current[letter] = normalized;
      changed = true;
    }
  });
  if (!changed) {
    return current;
  }
  cachedCameraLetterColors = current;
  try {
    localStorage.setItem(CAMERA_COLOR_STORAGE_KEY_SESSION, JSON.stringify(current));
  } catch (storeError) {
    console.warn('Failed to persist camera color preferences', storeError);
  }
  if (typeof document !== 'undefined' && typeof document.dispatchEvent === 'function' && typeof CustomEvent === 'function') {
    try {
      document.dispatchEvent(new CustomEvent('camera-colors-changed'));
    } catch (dispatchError) {
      console.warn('Failed to broadcast camera color change', dispatchError);
    }
  }
  return current;
}
function getCameraColorInputElements() {
  if (typeof document === 'undefined') {
    return [];
  }
  return CAMERA_LETTERS.map(function (letter) {
    var id = "cameraColor".concat(letter);
    var element = null;
    try {
      element = typeof window !== 'undefined' && window[id] ? window[id] : document.getElementById(id);
    } catch (error) {
      void error;
      element = null;
    }
    return element ? {
      letter: letter,
      element: element
    } : null;
  }).filter(Boolean);
}
function updateCameraColorInputsFromState() {
  var colors = getCameraLetterColorsSafeSession();
  getCameraColorInputElements().forEach(function (entry) {
    if (!entry || !entry.element) {
      return;
    }
    var value = colors[entry.letter] || '';
    if (value) {
      entry.element.value = value;
    }
  });
}
function collectCameraColorInputValues() {
  var result = {};
  getCameraColorInputElements().forEach(function (entry) {
    if (!entry || !entry.element) return;
    var normalized = normalizeCameraColorValue(entry.element.value || '');
    if (normalized) {
      result[entry.letter] = normalized;
    }
  });
  return result;
}
try {
  if (typeof window !== 'undefined') {
    window.getCameraLetterColors = function () {
      return getCameraLetterColorsSafeSession();
    };
    window.setCameraLetterColors = function (palette) {
      return applyCameraLetterColors(palette);
    };
  }
} catch (cameraColorExposeError) {
  console.warn('Unable to expose camera color helpers', cameraColorExposeError);
}
var themePreferenceGlobalScope = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : typeof global !== 'undefined' ? global : null;
var setThemePreference = function setThemePreference(value) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var normalized = !!value;
  if (themePreferenceController && typeof themePreferenceController.setValue === 'function') {
    themePreferenceController.setValue(normalized, options);
    return;
  }
  applyDarkMode(normalized);
  var serialized = normalized ? 'true' : 'false';
  var persistTargets = [];
  try {
    if (typeof resolveSafeLocalStorage === 'function') {
      var safeStorage = resolveSafeLocalStorage();
      if (safeStorage && typeof safeStorage.setItem === 'function') {
        persistTargets.push({
          name: 'safeLocalStorage',
          storage: safeStorage
        });
      }
    }
  } catch (error) {
    console.warn('Could not resolve SafeLocalStorage while persisting dark mode preference', error);
  }
  try {
    if (typeof localStorage !== 'undefined') {
      persistTargets.push({
        name: 'localStorage',
        storage: localStorage
      });
    }
  } catch (error) {
    console.warn('Could not access localStorage while persisting dark mode preference', error);
  }
  persistTargets.forEach(function (entry) {
    if (!entry || !entry.storage || typeof entry.storage.setItem !== 'function') {
      return;
    }
    try {
      entry.storage.setItem('darkMode', serialized);
    } catch (persistError) {
      console.warn("Could not persist dark mode preference to ".concat(entry.name), persistError);
    }
  });
};
var getThemePreference = function getThemePreference() {
  if (themePreferenceController && typeof themePreferenceController.getValue === 'function') {
    return !!themePreferenceController.getValue();
  }
  return typeof document !== 'undefined' && document.body && typeof document.body.classList !== 'undefined' && document.body.classList.contains('dark-mode');
};
var registerThemeControl = function registerThemeControl(element, config) {
  if (!themePreferenceController || typeof themePreferenceController.registerControl !== 'function') {
    return function () {};
  }
  try {
    return themePreferenceController.registerControl(element, config);
  } catch (registrationError) {
    console.warn('Failed to register theme control', registrationError);
    return function () {};
  }
};
var unregisterHeaderThemeControl = function unregisterHeaderThemeControl() {};
var unregisterSettingsThemeControl = function unregisterSettingsThemeControl() {};
if (themePreferenceController) {
  if (darkModeToggle) {
    unregisterHeaderThemeControl = registerThemeControl(darkModeToggle, {
      type: 'button'
    });
  }
  if (settingsDarkMode) {
    unregisterSettingsThemeControl = registerThemeControl(settingsDarkMode, {
      type: 'checkbox'
    });
  }
} else {
  var fallbackDarkMode = false;
  try {
    var stored = typeof localStorage !== 'undefined' ? localStorage.getItem('darkMode') : null;
    if (stored !== null) {
      fallbackDarkMode = stored === 'true';
    } else if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      fallbackDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  } catch (loadError) {
    console.warn('Could not load dark mode preference', loadError);
  }
  applyDarkMode(fallbackDarkMode);
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function () {
      setThemePreference(!document.body.classList.contains('dark-mode'));
    });
  }
  if (settingsDarkMode) {
    settingsDarkMode.addEventListener('change', function () {
      setThemePreference(settingsDarkMode.checked);
    });
  }
}
if (themePreferenceGlobalScope) {
  try {
    themePreferenceGlobalScope.cineThemePreference = themePreferenceController ? {
      registerControl: function registerControl(element, options) {
        return registerThemeControl(element, options);
      },
      setValue: function setValue(value, options) {
        return setThemePreference(value, options);
      },
      getValue: function getValue() {
        return getThemePreference();
      },
      reloadFromStorage: function reloadFromStorage(options) {
        return themePreferenceController && typeof themePreferenceController.reloadFromStorage === 'function' ? themePreferenceController.reloadFromStorage(options) : getThemePreference();
      }
    } : null;
  } catch (exposeError) {
    console.warn('Unable to expose theme preference bridge', exposeError);
  }
}
var sessionFocusScale = typeof focusScalePreference === 'string' ? focusScalePreference : 'metric';
var highContrastEnabled = false;
try {
  highContrastEnabled = localStorage.getItem("highContrast") === "true";
} catch (e) {
  console.warn("Could not load high contrast preference", e);
}
applyHighContrast(highContrastEnabled);
if (typeof window !== 'undefined') {
  window.handlePinkModeIconPress = handlePinkModeIconPress;
  window.triggerPinkModeIconRain = sessionTriggerPinkModeIconRain;
  window.startPinkModeAnimatedIcons = sessionStartPinkModeAnimatedIcons;
  window.stopPinkModeAnimatedIcons = sessionStopPinkModeAnimatedIcons;
}
var pinkModeEnabled = false;
try {
  pinkModeEnabled = localStorage.getItem('pinkMode') === 'true';
} catch (e) {
  console.warn('Could not load pink mode preference', e);
}
applyPinkMode(pinkModeEnabled);
rememberSettingsPinkModeBaseline();
rememberSettingsTemperatureUnitBaseline();
rememberSettingsFocusScaleBaseline();
rememberSettingsShowAutoBackupsBaseline();
rememberSettingsMountVoltagesBaseline();
if (pinkModeToggle) {
  pinkModeToggle.addEventListener('click', function () {
    persistPinkModePreference(!document.body.classList.contains('pink-mode'));
  });
}
if (settingsPinkMode) {
  settingsPinkMode.addEventListener('change', function () {
    persistPinkModePreference(settingsPinkMode.checked);
  });
}
if (settingsShowAutoBackups) {
  settingsShowAutoBackups.addEventListener('change', function () {
    applyShowAutoBackupsPreference(settingsShowAutoBackups.checked);
  });
}
if (settingsTemperatureUnit) {
  settingsTemperatureUnit.addEventListener('change', function () {
    applyTemperatureUnitPreferenceWithFallback(settingsTemperatureUnit.value, {
      persist: false
    });
  });
}
if (typeof settingsFocusScale !== 'undefined' && settingsFocusScale) {
  settingsFocusScale.addEventListener('change', function () {
    if (typeof applyFocusScalePreference === 'function') {
      applyFocusScalePreference(settingsFocusScale.value, {
        persist: false
      });
      sessionFocusScale = typeof normalizeFocusScale === 'function' ? normalizeFocusScale(settingsFocusScale.value) : settingsFocusScale.value;
    }
    try {
      populateLensDropdown();
    } catch (focusScalePopulateError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Failed to refresh lens dropdown after focus scale change', focusScalePopulateError);
      }
    }
  });
}
if (typeof settingsFocusScale !== 'undefined' && settingsFocusScale) {
  settingsFocusScale.value = sessionFocusScale;
}
var mountVoltageInputNodes = Array.from(typeof document !== 'undefined' ? document.querySelectorAll('.mount-voltage-input') : []);
mountVoltageInputNodes.forEach(function (input) {
  input.addEventListener('change', handleMountVoltageInputChange);
  input.addEventListener('blur', handleMountVoltageInputChange);
});
var mountVoltageResetButtonRef = function () {
  var candidateScopes = [typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && (typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object' ? CORE_GLOBAL_SCOPE : null, typeof globalThis !== 'undefined' && (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object' ? globalThis : null, typeof window !== 'undefined' && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' ? window : null, typeof self !== 'undefined' && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object' ? self : null, typeof global !== 'undefined' && (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object' ? global : null].filter(Boolean);
  for (var _index0 = 0; _index0 < candidateScopes.length; _index0 += 1) {
    var scope = candidateScopes[_index0];
    var button = scope && scope.mountVoltageResetButton;
    if (button) {
      return button;
    }
  }
  return null;
}();
if (mountVoltageResetButtonRef) {
  mountVoltageResetButtonRef.addEventListener('click', function () {
    var resetMountVoltagePreferencesFn = getSessionRuntimeFunction('resetMountVoltagePreferences');
    if (resetMountVoltagePreferencesFn) {
      try {
        resetMountVoltagePreferencesFn({
          persist: false,
          triggerUpdate: true
        });
      } catch (resetError) {
        warnMissingMountVoltageHelper('resetMountVoltagePreferences', resetError);
      }
    } else {
      warnMissingMountVoltageHelper('resetMountVoltagePreferences');
    }
    var updateMountVoltageInputsFromStateFn = getSessionRuntimeFunction('updateMountVoltageInputsFromState');
    if (updateMountVoltageInputsFromStateFn) {
      try {
        updateMountVoltageInputsFromStateFn();
      } catch (updateError) {
        warnMissingMountVoltageHelper('updateMountVoltageInputsFromState', updateError);
      }
    } else {
      warnMissingMountVoltageHelper('updateMountVoltageInputsFromState');
    }
  });
}
if (settingsButton && settingsDialog) {
  settingsButton.addEventListener('click', function () {
    var context = consumeSettingsOpenContext({
      reason: 'settings-button'
    });
    var hiddenBefore = typeof settingsDialog.hasAttribute === 'function' ? settingsDialog.hasAttribute('hidden') : null;
    var openBefore = typeof isDialogOpen === 'function' ? isDialogOpen(settingsDialog) : !!(settingsDialog && settingsDialog.open);
    logSettingsEvent('info', 'Settings dialog open requested', _objectSpread(_objectSpread({}, context), {}, {
      openBefore: openBefore,
      hiddenBefore: hiddenBefore
    }), {
      action: 'open-request'
    });
    prevAccentColor = accentColor;
    rememberSettingsPinkModeBaseline();
    rememberSettingsTemperatureUnitBaseline();
    rememberSettingsFocusScaleBaseline();
    rememberSettingsShowAutoBackupsBaseline();
    rememberSettingsMountVoltagesBaseline();
    var updateMountVoltageInputsFromStateFn = getSessionRuntimeFunction('updateMountVoltageInputsFromState');
    if (updateMountVoltageInputsFromStateFn) {
      try {
        updateMountVoltageInputsFromStateFn();
      } catch (updateError) {
        warnMissingMountVoltageHelper('updateMountVoltageInputsFromState', updateError);
      }
    } else {
      warnMissingMountVoltageHelper('updateMountVoltageInputsFromState');
    }
    if (settingsLanguage) settingsLanguage.value = currentLang;
    if (settingsDarkMode) settingsDarkMode.checked = getThemePreference();
    if (settingsPinkMode) settingsPinkMode.checked = document.body.classList.contains('pink-mode');
    if (settingsHighContrast) settingsHighContrast.checked = document.body.classList.contains('high-contrast');
    if (settingsReduceMotion) {
      var reduceMotionActive = document.documentElement.classList.contains('reduce-motion');
      settingsReduceMotion.checked = reduceMotionActive;
    }
    if (settingsRelaxedSpacing) {
      var relaxedSpacingActive = document.documentElement.classList.contains('relaxed-spacing');
      settingsRelaxedSpacing.checked = relaxedSpacingActive;
    }
    if (settingsShowAutoBackups) settingsShowAutoBackups.checked = showAutoBackups;
    if (accentColorInput) {
      var _stored = localStorage.getItem('accentColor');
      accentColorInput.value = _stored || accentColor;
      if (typeof updateAccentColorResetButtonState === 'function') {
        updateAccentColorResetButtonState();
      }
    }
    updateCameraColorInputsFromState();
    if (settingsTemperatureUnit) settingsTemperatureUnit.value = localTemperatureUnit;
    if (settingsFontSize) settingsFontSize.value = fontSize;
    if (settingsFontFamily) settingsFontFamily.value = fontFamily;
    if (settingsLogo) settingsLogo.value = '';
    if (settingsLogoPreview) safeLoadStoredLogoPreview();
    updateStorageSummary();
    if (autoGearEditor) {
      closeAutoGearEditor();
      callSessionCoreFunction('refreshAutoGearScenarioOptions');
      callSessionCoreFunction('refreshAutoGearMatteboxOptions');
      callSessionCoreFunction('refreshAutoGearCameraHandleOptions');
      callSessionCoreFunction('refreshAutoGearViewfinderExtensionOptions');
      callSessionCoreFunction('refreshAutoGearVideoDistributionOptions');
      callSessionCoreFunction('refreshAutoGearCameraOptions', [], {
        defer: true
      });
      callSessionCoreFunction('refreshAutoGearMonitorOptions');
      callSessionCoreFunction('refreshAutoGearWirelessOptions');
      callSessionCoreFunction('refreshAutoGearMotorsOptions');
      callSessionCoreFunction('refreshAutoGearControllersOptions');
      callSessionCoreFunction('refreshAutoGearDistanceOptions');
      populateAutoGearCategorySelect(autoGearAddCategorySelect, '');
      populateAutoGearCategorySelect(autoGearRemoveCategorySelect, '');
      renderAutoGearRulesList();
      renderAutoGearDraftLists();
      updateAutoGearCatalogOptions();
      callSessionCoreFunction('renderAutoGearBackupControls', [], {
        defer: true
      });
      callSessionCoreFunction('applyAutoGearBackupVisibility', [], {
        defer: true
      });
    }
    if (activeSettingsTabId) {
      activateSettingsTab(activeSettingsTabId);
    }
    collapseBackupDiffSection();
    settingsDialog.removeAttribute('hidden');
    openDialog(settingsDialog);
    scheduleSettingsTabsOverflowUpdate();
    var activePanel = settingsDialog.querySelector('.settings-panel:not([hidden])');
    var first = activePanel === null || activePanel === void 0 ? void 0 : activePanel.querySelector('input:not([type="hidden"]), select:not(#settingsLanguage), textarea');
    if (first) {
      try {
        first.focus({
          preventScroll: true
        });
      } catch (_unused6) {
        first.focus();
      }
    }
    var hiddenAfter = typeof settingsDialog.hasAttribute === 'function' ? settingsDialog.hasAttribute('hidden') : null;
    var openAfter = typeof isDialogOpen === 'function' ? isDialogOpen(settingsDialog) : !!(settingsDialog && settingsDialog.open);
    var resultDetail = _objectSpread(_objectSpread({}, context), {}, {
      openBefore: openBefore,
      openAfter: openAfter,
      hiddenAfter: hiddenAfter
    });
    logSettingsEvent(openAfter ? 'info' : 'warn', openAfter ? 'Settings dialog opened' : 'Settings dialog did not open', resultDetail, {
      action: 'open-result'
    });
  });
  if (settingsCancel) {
    settingsCancel.addEventListener('click', function () {
      revertSettingsPinkModeIfNeeded();
      rememberSettingsPinkModeBaseline();
      revertSettingsTemperatureUnitIfNeeded();
      rememberSettingsTemperatureUnitBaseline();
      revertSettingsFocusScaleIfNeeded();
      rememberSettingsFocusScaleBaseline();
      revertSettingsShowAutoBackupsIfNeeded();
      rememberSettingsShowAutoBackupsBaseline();
      revertSettingsMountVoltagesIfNeeded();
      rememberSettingsMountVoltagesBaseline();
      invokeSessionRevertAccentColor();
      if (settingsLogo) settingsLogo.value = '';
      if (settingsLogoPreview) safeLoadStoredLogoPreview();
      closeAutoGearEditor();
      collapseBackupDiffSection();
      closeDialog(settingsDialog);
      settingsDialog.setAttribute('hidden', '');
    });
  }
  var applySettingsAndCloseDialog = function applySettingsAndCloseDialog() {
    if (!settingsDialog) {
      return;
    }
    if (settingsLanguage) {
      applySetLanguage(settingsLanguage.value);
      if (typeof populateUserButtonDropdowns === 'function') {
        try {
          populateUserButtonDropdowns();
        } catch (userButtonError) {
          console.warn('Failed to refresh user button selectors after language change', userButtonError);
        }
      }
    }
    if (settingsDarkMode) {
      setThemePreference(settingsDarkMode.checked, {
        persist: true
      });
    }
    if (settingsPinkMode) {
      persistPinkModePreference(settingsPinkMode.checked);
    }
    if (settingsHighContrast) {
      var enabled = settingsHighContrast.checked;
      applyHighContrast(enabled);
      try {
        localStorage.setItem('highContrast', enabled);
      } catch (e) {
        console.warn('Could not save high contrast preference', e);
      }
    }
    if (settingsReduceMotion) {
      var _enabled = settingsReduceMotion.checked;
      applyReduceMotion(_enabled);
      try {
        localStorage.setItem('reduceMotion', _enabled);
      } catch (e) {
        console.warn('Could not save reduce motion preference', e);
      }
    }
    if (settingsRelaxedSpacing) {
      var _enabled2 = settingsRelaxedSpacing.checked;
      applyRelaxedSpacing(_enabled2);
      try {
        localStorage.setItem('relaxedSpacing', _enabled2);
      } catch (e) {
        console.warn('Could not save relaxed spacing preference', e);
      }
    }
    if (settingsShowAutoBackups) {
      applyShowAutoBackupsPreference(settingsShowAutoBackups.checked);
    }
    var autoGearShowBackupsToggle = typeof document !== 'undefined' && typeof document.getElementById === 'function' ? document.getElementById('autoGearShowBackups') : null;
    if (autoGearShowBackupsToggle) {
      callSessionCoreFunction('setAutoGearBackupsVisible', [Boolean(autoGearShowBackupsToggle.checked)]);
    }
    if (accentColorInput) {
      var color = accentColorInput.value;
      if (!document.body.classList.contains('pink-mode')) {
        applyAccentColor(color);
      }
      try {
        if (normalizeAccentValueSafe(color) === DEFAULT_ACCENT_NORMALIZED) {
          localStorage.removeItem('accentColor');
        } else {
          localStorage.setItem('accentColor', color);
        }
      } catch (e) {
        console.warn('Could not save accent color', e);
      }
      accentColor = color;
      prevAccentColor = color;
      if (typeof updateAccentColorResetButtonState === 'function') {
        updateAccentColorResetButtonState();
      }
    }
    var cameraPalette = collectCameraColorInputValues();
    var normalizedPalette = applyCameraLetterColors(cameraPalette);
    var colorEntries = getCameraColorInputElements();
    colorEntries.forEach(function (entry) {
      var normalized = normalizedPalette[entry.letter];
      if (normalized) {
        entry.element.value = normalized;
      }
    });
    if (settingsTemperatureUnit) {
      var selectedTemperatureUnit = typeof settingsTemperatureUnit.value === 'string' ? settingsTemperatureUnit.value : 'celsius';
      applyTemperatureUnitPreferenceWithFallback(selectedTemperatureUnit);
      rememberSettingsTemperatureUnitBaseline();
    }
    if (typeof settingsFocusScale !== 'undefined' && settingsFocusScale) {
      if (typeof applyFocusScalePreference === 'function') {
        applyFocusScalePreference(settingsFocusScale.value);
      }
      rememberSettingsFocusScaleBaseline();
      sessionFocusScale = typeof normalizeFocusScale === 'function' ? normalizeFocusScale(settingsFocusScale.value) : settingsFocusScale.value;
    }
    applySessionMountVoltagePreferences(collectMountVoltageFormValues(), {
      persist: true,
      triggerUpdate: true
    });
    rememberSettingsMountVoltagesBaseline();
    if (settingsFontSize) {
      var size = settingsFontSize.value;
      applyFontSizeSafe(size);
      try {
        localStorage.setItem('fontSize', size);
      } catch (e) {
        console.warn('Could not save font size', e);
      }
      fontSize = size;
    }
    if (settingsFontFamily) {
      var family = settingsFontFamily.value;
      applyFontFamilySafe(family);
      try {
        localStorage.setItem('fontFamily', family);
      } catch (e) {
        console.warn('Could not save font family', e);
      }
      fontFamily = family;
    }
    if (settingsLogo && settingsLogo.files && settingsLogo.files[0]) {
      var file = settingsLogo.files[0];
      if (file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg')) {
        var reader = new FileReader();
        reader.onload = function () {
          try {
            localStorage.setItem('customLogo', reader.result);
          } catch (e) {
            console.warn('Could not save custom logo', e);
          }
          renderSettingsLogoPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        showNotification('error', texts[currentLang].logoFormatError || 'Unsupported logo format');
        if (settingsLogo) settingsLogo.value = '';
        safeLoadStoredLogoPreview();
      }
    }
    closeAutoGearEditor();
    collapseBackupDiffSection();
    rememberSettingsPinkModeBaseline();
    rememberSettingsTemperatureUnitBaseline();
    rememberSettingsFocusScaleBaseline();
    rememberSettingsShowAutoBackupsBaseline();
    rememberSettingsMountVoltagesBaseline();
    closeDialog(settingsDialog);
    settingsDialog.setAttribute('hidden', '');
  };
  if (settingsSave) {
    settingsSave.addEventListener('click', function () {
      applySettingsAndCloseDialog();
    });
  }
  settingsDialog.addEventListener('click', function (e) {
    if (e.target === settingsDialog) {
      applySettingsAndCloseDialog();
    }
  });
  settingsDialog.addEventListener('cancel', function (e) {
    e.preventDefault();
    revertSettingsPinkModeIfNeeded();
    rememberSettingsPinkModeBaseline();
    revertSettingsTemperatureUnitIfNeeded();
    rememberSettingsTemperatureUnitBaseline();
    revertSettingsFocusScaleIfNeeded();
    rememberSettingsFocusScaleBaseline();
    revertSettingsShowAutoBackupsIfNeeded();
    rememberSettingsShowAutoBackupsBaseline();
    revertSettingsMountVoltagesIfNeeded();
    rememberSettingsMountVoltagesBaseline();
    invokeSessionRevertAccentColor();
    if (settingsLogo) settingsLogo.value = '';
    if (settingsLogoPreview) safeLoadStoredLogoPreview();
    closeAutoGearEditor();
    collapseBackupDiffSection();
    closeDialog(settingsDialog);
    settingsDialog.setAttribute('hidden', '');
  });
  if (autoGearAddRuleBtn) {
    autoGearAddRuleBtn.addEventListener('click', function () {
      invokeSessionOpenAutoGearEditor();
    });
  }
  if (autoGearConditionSelect) {
    autoGearConditionSelect.addEventListener('change', function () {
      updateAutoGearConditionAddButtonState();
    });
  }
  if (autoGearConditionAddButton) {
    autoGearConditionAddButton.addEventListener('click', function () {
      addAutoGearConditionFromPicker();
    });
  }
  var autoGearScenarioModeSelectHandle = function () {
    var resolvedHandle = null;
    try {
      if (typeof autoGearScenarioModeSelect !== 'undefined') {
        resolvedHandle = autoGearScenarioModeSelect;
      }
    } catch (resolveAutoGearScenarioModeSelectError) {
      void resolveAutoGearScenarioModeSelectError;
    }
    if (!resolvedHandle) {
      var scope = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
      if (scope && _typeof(scope) === 'object' && 'autoGearScenarioModeSelect' in scope) {
        resolvedHandle = scope.autoGearScenarioModeSelect || null;
      }
    }
    if (!resolvedHandle && typeof document !== 'undefined' && document && typeof document.getElementById === 'function') {
      try {
        resolvedHandle = document.getElementById('autoGearScenarioMode') || null;
      } catch (resolveAutoGearScenarioModeSelectElementError) {
        void resolveAutoGearScenarioModeSelectElementError;
      }
    }
    return resolvedHandle;
  }();
  if (autoGearScenarioModeSelectHandle && typeof autoGearScenarioModeSelectHandle.addEventListener === 'function') {
    autoGearScenarioModeSelectHandle.addEventListener('change', function () {
      if (autoGearEditorDraft) {
        var selectValue = typeof autoGearScenarioModeSelectHandle.value === 'string' ? autoGearScenarioModeSelectHandle.value : '';
        autoGearEditorDraft.scenarioLogic = normalizeAutoGearScenarioLogic(selectValue);
      }
      applyAutoGearScenarioSettings(getAutoGearScenarioSelectedValues());
    });
  }
  if (autoGearScenarioBaseSelect) {
    autoGearScenarioBaseSelect.addEventListener('change', function () {
      if (autoGearEditorDraft) {
        autoGearEditorDraft.scenarioPrimary = normalizeAutoGearScenarioPrimary(autoGearScenarioBaseSelect.value);
      }
    });
  }
  if (autoGearScenarioFactorInput) {
    var handleFactorUpdate = function handleFactorUpdate() {
      if (autoGearEditorDraft) {
        autoGearEditorDraft.scenarioMultiplier = normalizeAutoGearScenarioMultiplier(autoGearScenarioFactorInput.value);
      }
    };
    autoGearScenarioFactorInput.addEventListener('change', handleFactorUpdate);
    autoGearScenarioFactorInput.addEventListener('input', handleFactorUpdate);
  }
  if (autoGearConditionList) {
    autoGearConditionList.addEventListener('click', function (event) {
      var target = event.target instanceof HTMLElement ? event.target.closest('button') : null;
      if (!target) return;
      if (target.classList.contains('auto-gear-condition-remove')) {
        var condition = target.dataset.condition || '';
        if (condition) {
          removeAutoGearCondition(condition, {
            focusPicker: true
          });
        }
        return;
      }
      if (target.classList.contains('auto-gear-condition-add')) {
        handleAutoGearConditionShortcut();
      }
    });
  }
  var resolveResetAutoGearRulesHandler = function resolveResetAutoGearRulesHandler() {
    if (typeof resetAutoGearRulesToFactoryAdditions === 'function') {
      return resetAutoGearRulesToFactoryAdditions;
    }
    if (typeof globalThis !== 'undefined' && typeof globalThis.resetAutoGearRulesToFactoryAdditions === 'function') {
      return globalThis.resetAutoGearRulesToFactoryAdditions;
    }
    var moduleApi = resolveModuleApi('cineFeatureAutoGearRules', function (candidate) {
      return candidate && typeof candidate.resetAutoGearRulesToFactoryAdditions === 'function';
    });
    if (moduleApi && typeof moduleApi.resetAutoGearRulesToFactoryAdditions === 'function') {
      return moduleApi.resetAutoGearRulesToFactoryAdditions;
    }
    return null;
  };
  if (autoGearResetFactoryButton) {
    var autoGearResetUnavailableWarningHandle = null;
    var clearAutoGearResetUnavailableWarning = function clearAutoGearResetUnavailableWarning() {
      if (autoGearResetUnavailableWarningHandle === null) {
        return;
      }
      try {
        clearTimeout(autoGearResetUnavailableWarningHandle);
      } catch (clearError) {
        void clearError;
      }
      autoGearResetUnavailableWarningHandle = null;
    };
    var warnAutoGearResetUnavailable = function warnAutoGearResetUnavailable() {
      if (typeof console !== 'undefined' && typeof console.warn === 'function' && !resetHandlerAttached) {
        console.warn('Automatic gear reset action unavailable: reset handler missing.');
      }
    };
    var scheduleAutoGearResetUnavailableWarning = function scheduleAutoGearResetUnavailableWarning() {
      if (autoGearResetUnavailableWarningHandle !== null) {
        return;
      }
      if (typeof setTimeout !== 'function') {
        warnAutoGearResetUnavailable();
        return;
      }
      autoGearResetUnavailableWarningHandle = setTimeout(function () {
        autoGearResetUnavailableWarningHandle = null;
        warnAutoGearResetUnavailable();
      }, 1500);
    };
    var enableResetButton = function enableResetButton() {
      autoGearResetFactoryButton.disabled = false;
      autoGearResetFactoryButton.setAttribute('aria-disabled', 'false');
    };
    var disableResetButton = function disableResetButton() {
      autoGearResetFactoryButton.disabled = true;
      autoGearResetFactoryButton.setAttribute('aria-disabled', 'true');
    };
    var resetHandlerAttached = false;
    var attachResetHandler = function attachResetHandler(handler) {
      if (resetHandlerAttached || typeof handler !== 'function') {
        return false;
      }
      autoGearResetFactoryButton.addEventListener('click', handler);
      enableResetButton();
      resetHandlerAttached = true;
      clearAutoGearResetUnavailableWarning();
      return true;
    };
    var initialHandler = resolveResetAutoGearRulesHandler();
    var attachHandlerIfAvailable = function attachHandlerIfAvailable(handler) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!attachResetHandler(handler)) {
        return false;
      }
      if (options.logReenabledReason === 'deferredModuleLoad' && typeof console !== 'undefined' && typeof console.info === 'function') {
        console.info('Automatic gear reset action re-enabled after deferred module load.');
      }
      return true;
    };
    if (!attachHandlerIfAvailable(initialHandler)) {
      disableResetButton();
      scheduleAutoGearResetUnavailableWarning();
      whenGlobalValueAvailable('resetAutoGearRulesToFactoryAdditions', function (candidate) {
        return typeof candidate === 'function';
      }, function (candidate) {
        attachHandlerIfAvailable(candidate, {
          logReenabledReason: 'deferredModuleLoad'
        });
      }, {
        interval: 200,
        maxAttempts: 300,
        onTimeout: function onTimeout() {
          clearAutoGearResetUnavailableWarning();
          if (typeof console !== 'undefined' && typeof console.warn === 'function') {
            console.warn('Automatic gear reset action unavailable after waiting for handler registration.');
          }
        }
      });
      whenGlobalValueAvailable('cineModuleGlobals', function (candidate) {
        return candidate && typeof candidate.whenModuleAvailable === 'function';
      }, function (moduleGlobals) {
        if (resetHandlerAttached) {
          return;
        }
        var attachFromModule = function attachFromModule(moduleApi) {
          if (moduleApi && typeof moduleApi.resetAutoGearRulesToFactoryAdditions === 'function') {
            attachHandlerIfAvailable(moduleApi.resetAutoGearRulesToFactoryAdditions, {
              logReenabledReason: 'deferredModuleLoad'
            });
          }
        };
        if (typeof moduleGlobals.getModule === 'function') {
          try {
            var moduleApi = moduleGlobals.getModule('cineFeatureAutoGearRules');
            attachFromModule(moduleApi);
          } catch (moduleLookupError) {
            void moduleLookupError;
          }
        }
        if (!resetHandlerAttached && typeof moduleGlobals.whenModuleAvailable === 'function') {
          try {
            moduleGlobals.whenModuleAvailable('cineFeatureAutoGearRules', function (moduleApi) {
              attachFromModule(moduleApi);
            });
          } catch (subscriptionError) {
            void subscriptionError;
          }
        }
      }, {
        interval: 200,
        maxAttempts: 150
      });
      whenGlobalValueAvailable('cineModules', function (candidate) {
        return candidate && typeof candidate.get === 'function';
      }, function (registry) {
        if (resetHandlerAttached) {
          return;
        }
        try {
          var moduleApi = registry.get('cineFeatureAutoGearRules');
          if (moduleApi && typeof moduleApi.resetAutoGearRulesToFactoryAdditions === 'function') {
            attachHandlerIfAvailable(moduleApi.resetAutoGearRulesToFactoryAdditions);
          }
        } catch (registryLookupError) {
          void registryLookupError;
        }
      }, {
        interval: 200,
        maxAttempts: 150
      });
    }
  }
  if (autoGearExportButton) {
    autoGearExportButton.addEventListener('click', function () {
      callSessionCoreFunction('exportAutoGearRules', [], {
        defer: true
      });
    });
  }
  if (autoGearImportButton && autoGearImportInput) {
    autoGearImportButton.addEventListener('click', function () {
      autoGearImportInput.click();
    });
    autoGearImportInput.addEventListener('change', handleAutoGearImportSelection);
  }
  if (autoGearSearchInput) {
    var updateQuery = function updateQuery(event) {
      var _event$target;
      setAutoGearSearchQuery((event === null || event === void 0 || (_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.value) || '');
    };
    autoGearSearchInput.addEventListener('input', updateQuery);
    autoGearSearchInput.addEventListener('search', updateQuery);
  }
  if (autoGearFilterScenarioSelect) {
    autoGearFilterScenarioSelect.addEventListener('change', function (event) {
      var _event$target2;
      setAutoGearScenarioFilter((event === null || event === void 0 || (_event$target2 = event.target) === null || _event$target2 === void 0 ? void 0 : _event$target2.value) || 'all');
    });
  }
  if (autoGearFilterClearButton) {
    autoGearFilterClearButton.addEventListener('click', clearAutoGearFilters);
  }
  if (autoGearSummaryCards) {
    autoGearSummaryCards.addEventListener('click', function (event) {
      var target = event.target instanceof HTMLElement ? event.target.closest('.auto-gear-summary-action') : null;
      if (!target || target.disabled) return;
      var focus = target.dataset.focus || 'all';
      setAutoGearSummaryFocus(focus);
    });
  }
  if (autoGearSummaryDetails) {
    autoGearSummaryDetails.addEventListener('click', function (event) {
      var element = event.target instanceof HTMLElement ? event.target : null;
      if (!element) return;
      var scenarioButton = element.closest('button[data-auto-gear-scenario]');
      if (scenarioButton) {
        var scenario = scenarioButton.dataset.autoGearScenario || '';
        if (scenario) {
          setAutoGearSummaryFocus('all');
          setAutoGearScenarioFilter(scenario);
        }
        return;
      }
      var ruleButton = element.closest('button[data-auto-gear-rule]');
      if (ruleButton) {
        focusAutoGearRuleById(ruleButton.dataset.autoGearRule || '');
        return;
      }
      var resetButton = element.closest('button[data-auto-gear-summary-reset]');
      if (resetButton) {
        setAutoGearSummaryFocus('all');
      }
    });
  }
  if (autoGearPresetSelect) {
    autoGearPresetSelect.addEventListener('change', handleAutoGearPresetSelection);
  }
  if (autoGearSavePresetButton) {
    autoGearSavePresetButton.addEventListener('click', handleAutoGearSavePreset);
  }
  if (autoGearDeletePresetButton) {
    autoGearDeletePresetButton.addEventListener('click', handleAutoGearDeletePreset);
  }
  if (autoGearAddItemButton) {
    autoGearAddItemButton.addEventListener('click', function () {
      return addAutoGearDraftItem('add');
    });
  }
  if (autoGearRemoveItemButton) {
    autoGearRemoveItemButton.addEventListener('click', function () {
      return addAutoGearDraftItem('remove');
    });
  }
  if (autoGearSaveRuleButton) {
    autoGearSaveRuleButton.addEventListener('click', saveAutoGearRuleFromEditor);
  }
  if (autoGearCancelEditButton) {
    autoGearCancelEditButton.addEventListener('click', function () {
      closeAutoGearEditor();
      renderAutoGearDraftLists();
    });
  }
  if (autoGearRulesList) {
    autoGearRulesList.addEventListener('click', function (event) {
      var targetElement = event.target;
      var button = targetElement && typeof targetElement.closest === 'function' ? targetElement.closest('button') : null;
      if (!button) return;
      if (button.classList.contains('auto-gear-edit')) {
        var ruleId = button.dataset.ruleId || '';
        var ruleIndex = button.dataset.ruleIndex;
        var options = {};
        if (ruleIndex !== undefined) {
          options.ruleIndex = ruleIndex;
        }
        invokeSessionOpenAutoGearEditor(ruleId, options);
      } else if (button.classList.contains('auto-gear-duplicate')) {
        var _ruleId = button.dataset.ruleId || '';
        duplicateAutoGearRule(_ruleId, button.dataset.ruleIndex);
      } else if (button.classList.contains('auto-gear-delete')) {
        var _ruleId2 = button.dataset.ruleId || '';
        var _ruleIndex = button.dataset.ruleIndex;
        var args = _ruleIndex !== undefined ? [_ruleId2, _ruleIndex] : [_ruleId2];
        callSessionCoreFunction('deleteAutoGearRule', args);
      }
    });
  }
  if (autoGearBackupSelect) {
    autoGearBackupSelect.addEventListener('change', function () {
      updateAutoGearBackupRestoreButtonState();
    });
  }
  if (autoGearShowBackupsCheckbox) {
    autoGearShowBackupsCheckbox.addEventListener('change', handleAutoGearShowBackupsToggle);
  }
  if (autoGearBackupRestoreButton) {
    autoGearBackupRestoreButton.addEventListener('click', function () {
      if (!autoGearBackupSelect) return;
      var backupId = autoGearBackupSelect.value;
      if (backupId) {
        restoreAutoGearBackup(backupId);
      }
    });
  }
  if (autoGearAddCategorySelect) {
    autoGearAddCategorySelect.addEventListener('change', syncAutoGearMonitorFieldVisibility);
  }
  if (autoGearRemoveCategorySelect) {
    autoGearRemoveCategorySelect.addEventListener('change', syncAutoGearMonitorFieldVisibility);
  }
  var bindAutoGearSelectorCatalogSync = function bindAutoGearSelectorCatalogSync(typeSelect, defaultInput) {
    if (!typeSelect) return;
    var refreshCatalog = function refreshCatalog() {
      updateAutoGearMonitorCatalogOptions(typeSelect.value, defaultInput);
    };
    typeSelect.addEventListener('change', refreshCatalog);
    if (defaultInput) {
      defaultInput.addEventListener('focus', refreshCatalog);
      defaultInput.addEventListener('click', refreshCatalog);
    }
    refreshCatalog();
  };
  bindAutoGearSelectorCatalogSync(autoGearAddSelectorTypeSelect, autoGearAddSelectorDefaultInput);
  bindAutoGearSelectorCatalogSync(autoGearRemoveSelectorTypeSelect, autoGearRemoveSelectorDefaultInput);
  if (autoGearEditor) {
    autoGearEditor.addEventListener('click', function (event) {
      var target = event.target;
      if (!target) return;
      if (target.classList.contains('auto-gear-remove-entry')) {
        var listType = target.dataset.listType;
        var normalizedType = listType === 'remove' ? 'remove' : 'add';
        var itemId = target.dataset.itemId;
        if (!autoGearEditorDraft || !itemId) return;
        var list = normalizedType === 'remove' ? autoGearEditorDraft.remove : autoGearEditorDraft.add;
        var _index1 = list.findIndex(function (item) {
          return item.id === itemId;
        });
        if (_index1 >= 0) {
          list.splice(_index1, 1);
          if (autoGearEditorActiveItem && autoGearEditorActiveItem.listType === normalizedType && autoGearEditorActiveItem.itemId === itemId) {
            clearAutoGearDraftItemEdit(normalizedType, {
              skipRender: true
            });
          }
          renderAutoGearDraftLists();
          updateAutoGearCatalogOptions();
        }
        return;
      }
      if (target.classList.contains('auto-gear-edit-entry')) {
        beginAutoGearDraftItemEdit(target.dataset.listType, target.dataset.itemId);
      }
    });
  }
}
syncAutoGearMonitorFieldVisibility();
var removeNode = function removeNode(node) {
  if (!node || _typeof(node) !== 'object') {
    return;
  }
  try {
    if (typeof node.remove === 'function') {
      node.remove();
      return;
    }
  } catch (removeError) {
    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      console.warn('Failed to remove node via native remove()', removeError);
    }
  }
  var parent = node.parentNode;
  if (parent && typeof parent.removeChild === 'function') {
    parent.removeChild(node);
  }
};
var createAccentTint = function createAccentTint() {
  var alpha = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.16;
  var accentFallback = typeof accentColor === 'string' ? accentColor : DEFAULT_ACCENT_COLOR;
  var accentSource = getCssVariableValue('--accent-color', accentFallback);
  var rgb = parseColorToRgb(accentSource);
  if (!rgb) return null;
  return "rgba(".concat(rgb.r, ", ").concat(rgb.g, ", ").concat(rgb.b, ", ").concat(alpha, ")");
};
var getNotificationAccentColor = function getNotificationAccentColor() {
  var fallback = typeof accentColor === 'string' && accentColor ? accentColor : DEFAULT_ACCENT_COLOR;
  var resolved = getCssVariableValue('--accent-color', fallback);
  return resolved || fallback;
};
var getNotificationTextColor = function getNotificationTextColor(backgroundColor) {
  try {
    if (typeof computeRelativeLuminance === 'function') {
      var rgb = parseColorToRgb(backgroundColor);
      if (rgb) {
        var luminance = computeRelativeLuminance(rgb);
        return luminance > 0.55 ? '#000000' : '#ffffff';
      }
    }
  } catch (colorError) {
    console.warn('Failed to determine notification text color', colorError);
  }
  return '#ffffff';
};
var getNotificationTopOffset = function getNotificationTopOffset() {
  var baseOffset = 16;
  var offset = baseOffset;
  try {
    var topBar = document.getElementById('topBar');
    if (topBar && typeof topBar.getBoundingClientRect === 'function') {
      var rect = topBar.getBoundingClientRect();
      if (rect && typeof rect.bottom === 'number' && rect.bottom > 0) {
        offset = Math.max(offset, rect.bottom + baseOffset);
      }
    }
  } catch (measureError) {
    console.warn('Failed to measure top bar for notifications', measureError);
  }
  return "".concat(Math.ceil(offset), "px");
};
var notificationContainerEnsureScheduled = false;
var scheduleNotificationContainerEnsure = function scheduleNotificationContainerEnsure() {
  if (notificationContainerEnsureScheduled) {
    return;
  }
  notificationContainerEnsureScheduled = true;
  var trigger = function trigger() {
    notificationContainerEnsureScheduled = false;
    try {
      _ensureNotificationContainer();
    } catch (scheduleError) {
      console.warn('Failed to ensure notification container after scheduling', scheduleError);
    }
  };
  if (typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(trigger);
  } else if (typeof setTimeout === 'function') {
    setTimeout(trigger, 16);
  }
};
var _ensureNotificationContainer = function ensureNotificationContainer() {
  if (typeof document === 'undefined') return null;
  var id = 'backupNotificationContainer';
  var container = document.getElementById(id);
  var isNew = false;
  if (!container && typeof window !== 'undefined') {
    var bootstrapNotice = window.__cineLoadingNotice;
    if (bootstrapNotice && typeof bootstrapNotice.ensureContainer === 'function') {
      try {
        container = bootstrapNotice.ensureContainer();
      } catch (noticeError) {
        console.warn('Failed to reuse bootstrap notification container', noticeError);
        container = null;
      }
    }
  }
  if (!container) {
    container = document.createElement('div');
    container.id = id;
    container.style.position = 'fixed';
    container.style.right = '1rem';
    container.style.zIndex = '10000';
    isNew = true;
  }
  if (container.classList && !container.classList.contains('cine-notification-stack')) {
    container.classList.add('cine-notification-stack');
  }
  if (container.dataset && container.dataset.bootstrap) {
    delete container.dataset.bootstrap;
  }
  var preferredParent = typeof document.body !== 'undefined' && document.body ? document.body : typeof document.documentElement !== 'undefined' ? document.documentElement : null;
  if (preferredParent) {
    if (container.parentNode !== preferredParent) {
      preferredParent.appendChild(container);
    }
    container.style.top = getNotificationTopOffset();
  } else if (!container.parentNode) {
    scheduleNotificationContainerEnsure();
  }
  if (isNew && typeof document.addEventListener === 'function') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        try {
          _ensureNotificationContainer();
        } catch (ensureError) {
          console.warn('Failed to ensure notification container after DOMContentLoaded', ensureError);
        }
      }, {
        once: true
      });
    } else {
      scheduleNotificationContainerEnsure();
    }
  }
  if (typeof window !== 'undefined') {
    var _bootstrapNotice = window.__cineLoadingNotice;
    if (_bootstrapNotice && _typeof(_bootstrapNotice) === 'object') {
      _bootstrapNotice.container = container;
    }
  }
  return container;
};
function showNotification(type, message) {
  if (typeof document === 'undefined') return;
  var container = _ensureNotificationContainer();
  if (!container) {
    return;
  }
  var note = document.createElement('div');
  note.textContent = message;
  note.style.padding = '0.75rem 1.25rem';
  note.style.marginTop = '0.5rem';
  note.style.borderRadius = '0.75rem';
  note.style.border = 'none';
  note.style.boxShadow = '0 0.75rem 2.5rem rgba(0, 0, 0, 0.14)';
  var background = getNotificationAccentColor();
  var textColor = getNotificationTextColor(background);
  note.style.background = background;
  note.style.color = textColor;
  container.appendChild(note);
  setTimeout(function () {
    removeNode(note);
    if (!container.children.length) {
      removeNode(container);
    }
  }, 4000);
}
var AUTO_BACKUP_INDICATOR_ID = 'cineAutoBackupIndicator';
var AUTO_BACKUP_INDICATOR_SPINNER_STYLE_ID = 'cineAutoBackupSpinnerStyles';
var autoBackupIndicatorRefCount = 0;
var ensureAutoBackupSpinnerStyles = function ensureAutoBackupSpinnerStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(AUTO_BACKUP_INDICATOR_SPINNER_STYLE_ID)) {
    return;
  }
  var style = document.createElement('style');
  style.id = AUTO_BACKUP_INDICATOR_SPINNER_STYLE_ID;
  style.textContent = "@keyframes cineAutoBackupSpinnerRotate {\n    0% { transform: rotate(0deg); }\n    100% { transform: rotate(360deg); }\n  }";
  document.head.appendChild(style);
};
var showAutoBackupActivityIndicator = function showAutoBackupActivityIndicator(message) {
  if (typeof document === 'undefined') {
    return function () {};
  }
  var container = _ensureNotificationContainer();
  if (!container) {
    return function () {};
  }
  ensureAutoBackupSpinnerStyles();
  var indicator = document.getElementById(AUTO_BACKUP_INDICATOR_ID);
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.id = AUTO_BACKUP_INDICATOR_ID;
    indicator.style.display = 'flex';
    indicator.style.alignItems = 'center';
    indicator.style.gap = '0.75rem';
    indicator.style.padding = '0.75rem 1.25rem';
    indicator.style.marginTop = '0.5rem';
    indicator.style.borderRadius = '0.75rem';
    indicator.style.border = 'none';
    indicator.style.boxShadow = '0 0.75rem 2.5rem rgba(0, 0, 0, 0.14)';
    indicator.style.background = 'rgba(32, 40, 62, 0.92)';
    indicator.style.color = '#ffffff';
    indicator.setAttribute('role', 'status');
    indicator.setAttribute('aria-live', 'polite');
    var spinner = document.createElement('span');
    spinner.style.display = 'inline-block';
    spinner.style.width = '1.5rem';
    spinner.style.height = '1.5rem';
    spinner.style.borderRadius = '50%';
    spinner.style.border = '0.2rem solid rgba(255, 255, 255, 0.3)';
    spinner.style.borderTopColor = '#ffffff';
    spinner.style.animation = 'cineAutoBackupSpinnerRotate 1s linear infinite';
    spinner.setAttribute('aria-hidden', 'true');
    indicator.appendChild(spinner);
    var textNode = document.createElement('span');
    textNode.className = 'auto-backup-indicator-text';
    indicator.appendChild(textNode);
    container.appendChild(indicator);
  }
  var textTarget = indicator.querySelector('.auto-backup-indicator-text');
  if (textTarget) {
    textTarget.textContent = message;
  }
  autoBackupIndicatorRefCount += 1;
  indicator.dataset.count = String(autoBackupIndicatorRefCount);
  indicator.style.display = 'flex';
  return function () {
    autoBackupIndicatorRefCount = Math.max(0, autoBackupIndicatorRefCount - 1);
    if (autoBackupIndicatorRefCount === 0) {
      removeNode(indicator);
      if (!container.children.length) {
        removeNode(container);
      }
    }
  };
};
var GLOBAL_LOADING_INDICATOR_ID = 'cineGlobalLoadingIndicator';
var globalLoadingIndicatorRefCount = 0;
var GLOBAL_LOADING_INDICATOR_MESSAGE_KEYS = {
  default: 'globalLoadingIndicator',
  preparing: 'globalLoadingIndicatorPreparing',
  modules: 'globalLoadingIndicatorModules',
  data: 'globalLoadingIndicatorData',
  almost: 'globalLoadingIndicatorAlmostReady'
};
var resolveGlobalLoadingIndicatorMessage = function resolveGlobalLoadingIndicatorMessage(fallbackMessage) {
  if (typeof fallbackMessage === 'string' && fallbackMessage.trim()) {
    return fallbackMessage.trim();
  }
  var langTexts = texts && typeof currentLang === 'string' && currentLang && texts[currentLang] ? texts[currentLang] : null;
  var fallbackTexts = texts && _typeof(texts.en) === 'object' && texts.en ? texts.en : null;
  var localized = langTexts && typeof langTexts.globalLoadingIndicator === 'string' ? langTexts.globalLoadingIndicator.trim() : '';
  if (localized) {
    return localized;
  }
  var fallback = fallbackTexts && typeof fallbackTexts.globalLoadingIndicator === 'string' ? fallbackTexts.globalLoadingIndicator.trim() : '';
  if (fallback) {
    return fallback;
  }
  return 'Loading…';
};
var resolveGlobalLoadingIndicatorMessageByKey = function resolveGlobalLoadingIndicatorMessageByKey(key, fallbackMessage) {
  var normalizedKey = typeof key === 'string' && key.trim() ? key.trim() : '';
  var translationKey = normalizedKey && GLOBAL_LOADING_INDICATOR_MESSAGE_KEYS[normalizedKey] ? GLOBAL_LOADING_INDICATOR_MESSAGE_KEYS[normalizedKey] : GLOBAL_LOADING_INDICATOR_MESSAGE_KEYS.default;
  var langTexts = texts && typeof currentLang === 'string' && currentLang && texts[currentLang] ? texts[currentLang] : null;
  var fallbackTexts = texts && _typeof(texts.en) === 'object' && texts.en ? texts.en : null;
  var localized = '';
  if (translationKey && langTexts && typeof langTexts[translationKey] === 'string') {
    localized = langTexts[translationKey].trim();
  }
  if (!localized && translationKey && fallbackTexts && typeof fallbackTexts[translationKey] === 'string') {
    localized = fallbackTexts[translationKey].trim();
  }
  var fallback = typeof fallbackMessage === 'string' && fallbackMessage.trim() ? fallbackMessage.trim() : '';
  if (!localized && fallback) {
    localized = fallback;
  }
  if (!localized) {
    localized = resolveGlobalLoadingIndicatorMessage(fallback);
  }
  return localized || 'Loading…';
};
var syncBootstrapLoadingNoticeLocalization = function syncBootstrapLoadingNoticeLocalization() {
  if (typeof window === 'undefined') {
    return;
  }
  var notice = window.__cineLoadingNotice;
  if (!notice || typeof notice.applyLocalization !== 'function') {
    return;
  }
  var fallback = typeof notice.getFallbackMessages === 'function' ? notice.getFallbackMessages() : {};
  notice.applyLocalization({
    preparing: resolveGlobalLoadingIndicatorMessageByKey('preparing', fallback.preparing || ''),
    modules: resolveGlobalLoadingIndicatorMessageByKey('modules', fallback.modules || ''),
    data: resolveGlobalLoadingIndicatorMessageByKey('data', fallback.data || ''),
    almost: resolveGlobalLoadingIndicatorMessageByKey('almost', fallback.almost || '')
  });
};
var refreshGlobalLoadingIndicatorText = function refreshGlobalLoadingIndicatorText() {
  if (typeof document === 'undefined') {
    return;
  }
  var indicator = document.getElementById(GLOBAL_LOADING_INDICATOR_ID);
  if (!indicator) {
    return;
  }
  var textTarget = indicator.querySelector('.global-loading-indicator-text');
  if (!textTarget) {
    return;
  }
  syncBootstrapLoadingNoticeLocalization();
  var mode = indicator.dataset.messageMode || 'auto';
  if (mode === 'custom') {
    var customMessage = indicator.dataset.customMessage || '';
    if (customMessage) {
      textTarget.textContent = customMessage;
    }
    return;
  }
  if (mode === 'key') {
    var messageKey = indicator.dataset.messageKey || 'default';
    var fallback = indicator.dataset.fallbackMessage || '';
    var _message = resolveGlobalLoadingIndicatorMessageByKey(messageKey, fallback);
    if (_message) {
      textTarget.textContent = _message;
      indicator.dataset.currentMessage = _message;
    }
    return;
  }
  var message = resolveGlobalLoadingIndicatorMessage();
  textTarget.textContent = message;
  indicator.dataset.currentMessage = message;
};
var GLOBAL_LOADING_INDICATOR_MIN_DISPLAY_MS = 260;
var setGlobalLoadingIndicatorMessageByKey = function setGlobalLoadingIndicatorMessageByKey(key, fallbackMessage) {
  if (typeof document === 'undefined') {
    return;
  }
  var indicator = document.getElementById(GLOBAL_LOADING_INDICATOR_ID);
  if (!indicator) {
    return;
  }
  var normalizedKey = typeof key === 'string' && key.trim() ? key.trim() : 'default';
  var resolvedMessage = resolveGlobalLoadingIndicatorMessageByKey(normalizedKey, fallbackMessage || '');
  var textTarget = indicator.querySelector('.global-loading-indicator-text');
  indicator.dataset.messageMode = 'key';
  indicator.dataset.messageKey = normalizedKey;
  if (typeof fallbackMessage === 'string' && fallbackMessage.trim()) {
    indicator.dataset.fallbackMessage = fallbackMessage.trim();
  } else {
    delete indicator.dataset.fallbackMessage;
  }
  indicator.dataset.currentMessage = resolvedMessage;
  if (textTarget) {
    textTarget.textContent = resolvedMessage;
  }
  syncBootstrapLoadingNoticeLocalization();
};
var getHighResolutionTimestamp = function getHighResolutionTimestamp() {
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    return performance.now();
  }
  return Date.now();
};
var showGlobalLoadingIndicator = function showGlobalLoadingIndicator(message) {
  if (typeof document === 'undefined') {
    return function () {};
  }
  var container = _ensureNotificationContainer();
  if (!container) {
    return function () {};
  }
  ensureAutoBackupSpinnerStyles();
  var bootstrapNotice = typeof window !== 'undefined' ? window.__cineLoadingNotice : null;
  var indicator = document.getElementById(GLOBAL_LOADING_INDICATOR_ID);
  if (!indicator && bootstrapNotice && typeof bootstrapNotice.ensureIndicator === 'function') {
    try {
      indicator = bootstrapNotice.ensureIndicator();
    } catch (bootstrapIndicatorError) {
      console.warn('Failed to adopt bootstrap loading indicator', bootstrapIndicatorError);
      indicator = null;
    }
  }
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.id = GLOBAL_LOADING_INDICATOR_ID;
  }
  indicator.setAttribute('role', 'status');
  indicator.setAttribute('aria-live', 'polite');
  indicator.setAttribute('aria-busy', 'true');
  if (indicator.dataset && indicator.dataset.bootstrap) {
    delete indicator.dataset.bootstrap;
  }
  if (indicator.classList) {
    indicator.classList.add('cine-notification', 'cine-notification--loading');
  } else {
    indicator.className = [indicator.className || '', 'cine-notification', 'cine-notification--loading'].join(' ').trim();
  }
  var spinner = indicator.querySelector('.cine-notification__spinner');
  if (!spinner) {
    spinner = document.createElement('span');
    spinner.className = 'cine-notification__spinner';
    spinner.setAttribute('aria-hidden', 'true');
    indicator.insertBefore(spinner, indicator.firstChild);
  }
  var textTarget = indicator.querySelector('.global-loading-indicator-text');
  if (!textTarget) {
    textTarget = document.createElement('span');
    textTarget.className = 'global-loading-indicator-text';
    indicator.appendChild(textTarget);
  }
  if (indicator.parentNode !== container) {
    container.appendChild(indicator);
  }
  if (bootstrapNotice && typeof bootstrapNotice.setBusy === 'function') {
    try {
      bootstrapNotice.setBusy(true);
    } catch (bootstrapBusyError) {
      console.warn('Failed to mark bootstrap loading indicator busy', bootstrapBusyError);
    }
  }
  syncBootstrapLoadingNoticeLocalization();
  var isCustomMessage = Boolean(message && typeof message === 'string' && message.trim());
  var resolvedMessage;
  if (isCustomMessage) {
    resolvedMessage = resolveGlobalLoadingIndicatorMessage(message);
    indicator.dataset.messageMode = 'custom';
    indicator.dataset.customMessage = resolvedMessage;
  } else if (indicator.dataset.messageMode === 'key' && indicator.dataset.messageKey) {
    resolvedMessage = resolveGlobalLoadingIndicatorMessageByKey(indicator.dataset.messageKey, indicator.dataset.fallbackMessage || '');
    indicator.dataset.currentMessage = resolvedMessage;
    indicator.dataset.customMessage = '';
  } else {
    resolvedMessage = resolveGlobalLoadingIndicatorMessage();
    indicator.dataset.messageMode = 'auto';
    indicator.dataset.customMessage = '';
    indicator.dataset.currentMessage = resolvedMessage;
  }
  if (textTarget) {
    textTarget.textContent = resolvedMessage;
  }
  if (bootstrapNotice && typeof bootstrapNotice.ensureIndicator === 'function') {
    bootstrapNotice.indicator = indicator;
  }
  globalLoadingIndicatorRefCount = Math.max(0, globalLoadingIndicatorRefCount);
  globalLoadingIndicatorRefCount += 1;
  indicator.dataset.count = String(globalLoadingIndicatorRefCount);
  indicator.style.display = 'flex';
  var displayedAt = getHighResolutionTimestamp();
  var finalized = false;
  var finalizeHide = function finalizeHide() {
    if (finalized) {
      return;
    }
    finalized = true;
    globalLoadingIndicatorRefCount = Math.max(0, globalLoadingIndicatorRefCount - 1);
    indicator.dataset.count = String(globalLoadingIndicatorRefCount);
    if (globalLoadingIndicatorRefCount === 0) {
      indicator.setAttribute('aria-busy', 'false');
      if (bootstrapNotice && typeof bootstrapNotice.setBusy === 'function') {
        try {
          bootstrapNotice.setBusy(false);
        } catch (bootstrapBusyResetError) {
          console.warn('Failed to clear bootstrap loading indicator busy state', bootstrapBusyResetError);
        }
      }
      removeNode(indicator);
      if (!container.children.length) {
        removeNode(container);
      }
      if (bootstrapNotice && _typeof(bootstrapNotice) === 'object') {
        bootstrapNotice.indicator = null;
      }
    }
  };
  return function () {
    if (finalized) {
      return;
    }
    var elapsed = getHighResolutionTimestamp() - displayedAt;
    if (elapsed < GLOBAL_LOADING_INDICATOR_MIN_DISPLAY_MS) {
      var remaining = GLOBAL_LOADING_INDICATOR_MIN_DISPLAY_MS - elapsed;
      if (typeof setTimeout === 'function') {
        setTimeout(finalizeHide, Math.max(16, remaining));
        return;
      }
    }
    finalizeHide();
  };
};
try {
  var scope = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : null;
  if (scope) {
    scope.__cineShowAutoBackupIndicator = showAutoBackupActivityIndicator;
    scope.__cineShowGlobalLoadingIndicator = showGlobalLoadingIndicator;
    scope.__cineSetGlobalLoadingIndicatorMessageKey = setGlobalLoadingIndicatorMessageByKey;
  }
} catch (indicatorExposeError) {
  console.warn('Failed to expose auto backup indicator helper', indicatorExposeError);
}
var installGlobalFetchLoadingIndicator = function installGlobalFetchLoadingIndicator() {
  var scope = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : null;
  if (!scope || typeof scope.fetch !== 'function') {
    return;
  }
  if (scope.__cineFetchWithLoadingIndicatorInstalled) {
    return;
  }
  var originalFetch = scope.fetch;
  var getMessage = function getMessage() {
    return resolveGlobalLoadingIndicatorMessage();
  };
  var showIndicator = typeof scope.__cineShowGlobalLoadingIndicator === 'function' ? scope.__cineShowGlobalLoadingIndicator : showGlobalLoadingIndicator;
  var finalizeHide = function finalizeHide(hide) {
    if (typeof hide === 'function') {
      try {
        hide();
      } catch (hideError) {
        console.warn('Failed to hide global loading indicator after fetch', hideError);
      }
    }
  };
  scope.fetch = function fetchWithLoadingIndicator(input, init) {
    var hide = null;
    try {
      hide = showIndicator(getMessage());
    } catch (indicatorError) {
      console.warn('Failed to show global loading indicator before fetch', indicatorError);
      hide = null;
    }
    var response;
    try {
      response = originalFetch.apply(this, arguments);
    } catch (syncError) {
      finalizeHide(hide);
      throw syncError;
    }
    if (!response || typeof response.then !== 'function') {
      finalizeHide(hide);
      return response;
    }
    if (typeof response.finally === 'function') {
      return response.finally(function () {
        finalizeHide(hide);
      });
    }
    return response.then(function (value) {
      finalizeHide(hide);
      return value;
    }, function (error) {
      finalizeHide(hide);
      throw error;
    });
  };
  scope.__cineFetchWithLoadingIndicatorInstalled = true;
};
try {
  installGlobalFetchLoadingIndicator();
} catch (loadingInstallError) {
  console.warn('Failed to install global loading indicator for fetch', loadingInstallError);
}
if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
  window.addEventListener('languagechange', function () {
    try {
      refreshGlobalLoadingIndicatorText();
    } catch (languageIndicatorError) {
      console.warn('Failed to refresh global loading indicator after language change', languageIndicatorError);
    }
  });
}
var INITIAL_LOADING_INDICATOR_IDLE_TIMEOUT_MS = 480;
var initialLoadingIndicatorHide = null;
var initialLoadingIndicatorStarted = false;
var initialLoadingIndicatorSettled = false;
var ensureInitialLoadingIndicatorVisible = function ensureInitialLoadingIndicatorVisible() {
  if (initialLoadingIndicatorStarted || initialLoadingIndicatorSettled) {
    return;
  }
  if (typeof showGlobalLoadingIndicator !== 'function') {
    return;
  }
  try {
    var hide = showGlobalLoadingIndicator();
    if (typeof hide === 'function') {
      initialLoadingIndicatorHide = hide;
    } else {
      initialLoadingIndicatorHide = null;
    }
    initialLoadingIndicatorStarted = true;
  } catch (initialIndicatorError) {
    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      console.warn('Failed to show initial global loading indicator', initialIndicatorError);
    }
    initialLoadingIndicatorHide = null;
    initialLoadingIndicatorStarted = false;
  }
};
var hideInitialLoadingIndicatorSafely = function hideInitialLoadingIndicatorSafely() {
  var hide = initialLoadingIndicatorHide;
  initialLoadingIndicatorHide = null;
  initialLoadingIndicatorStarted = false;
  if (typeof hide === 'function') {
    try {
      hide();
    } catch (initialIndicatorHideError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Failed to hide initial global loading indicator', initialIndicatorHideError);
      }
    }
  }
};
var finalizeInitialLoadingIndicator = function finalizeInitialLoadingIndicator() {
  if (initialLoadingIndicatorSettled) {
    return;
  }
  initialLoadingIndicatorSettled = true;
  if (!initialLoadingIndicatorStarted && !initialLoadingIndicatorHide) {
    return;
  }
  var scheduleHide = function scheduleHide() {
    if (typeof requestIdleCallback === 'function') {
      requestIdleCallback(hideInitialLoadingIndicatorSafely, {
        timeout: INITIAL_LOADING_INDICATOR_IDLE_TIMEOUT_MS
      });
      return;
    }
    if (typeof setTimeout === 'function') {
      setTimeout(hideInitialLoadingIndicatorSafely, GLOBAL_LOADING_INDICATOR_MIN_DISPLAY_MS);
      return;
    }
    hideInitialLoadingIndicatorSafely();
  };
  if (typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(scheduleHide);
  } else {
    scheduleHide();
  }
};
function getDiffText(key) {
  var fallbackValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  if (typeof key !== 'string' || !key) {
    return typeof fallbackValue === 'string' ? fallbackValue : "".concat(fallbackValue !== null && fallbackValue !== void 0 ? fallbackValue : '');
  }
  var normalizedFallback = typeof fallbackValue === 'string' ? fallbackValue : "".concat(fallbackValue !== null && fallbackValue !== void 0 ? fallbackValue : '');
  var langTexts = texts && typeof currentLang === 'string' && currentLang && texts[currentLang] ? texts[currentLang] : null;
  var defaultTexts = texts && _typeof(texts.en) === 'object' ? texts.en : null;
  var resolveCandidate = function resolveCandidate(source) {
    if (!source || _typeof(source) !== 'object') {
      return null;
    }
    if (!Object.prototype.hasOwnProperty.call(source, key)) {
      return null;
    }
    var value = source[key];
    if (typeof value !== 'string') {
      return null;
    }
    var trimmed = value.trim();
    return trimmed ? trimmed : null;
  };
  var localized = resolveCandidate(langTexts);
  if (localized) {
    return localized;
  }
  var fallbackLocalized = resolveCandidate(defaultTexts);
  if (fallbackLocalized) {
    return fallbackLocalized;
  }
  return normalizedFallback;
}
function formatTimestampForComparison(date, includeSeconds) {
  if (!(date instanceof Date) || Number.isNaN(date.valueOf())) {
    return '';
  }
  var lang = typeof currentLang === 'string' && currentLang ? currentLang : 'en';
  var options = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  };
  if (includeSeconds) {
    options.second = '2-digit';
  }
  try {
    return new Intl.DateTimeFormat(lang, options).format(date);
  } catch (error) {
    if (lang !== 'en') {
      try {
        return new Intl.DateTimeFormat('en', options).format(date);
      } catch (fallbackError) {
        console.warn('Date formatting failed for comparison timestamp', error, fallbackError);
      }
    } else {
      console.warn('Date formatting failed for comparison timestamp', error);
    }
  }
  return date.toISOString();
}
function formatComparisonOptionLabel(name, parsedDetails) {
  if (typeof name !== 'string') {
    return '';
  }
  var parsed = parsedDetails || parseAutoBackupName(name);
  if (!parsed) {
    var manualLabel = getDiffText('versionCompareManualLabel', 'Manual save');
    return "".concat(manualLabel, " \xB7 ").concat(name);
  }
  var typeLabel = parsed.type === 'auto-backup-before-delete' ? getDiffText('versionCompareAutoDeleteLabel', 'Auto backup before delete') : getDiffText('versionCompareAutoLabel', 'Auto backup');
  var timestamp = formatTimestampForComparison(parsed.date, parsed.includeSeconds);
  var suffix = parsed.label ? " \xB7 ".concat(parsed.label) : '';
  return timestamp ? "".concat(typeLabel, " \xB7 ").concat(timestamp).concat(suffix) : "".concat(typeLabel).concat(suffix ? " \xB7 ".concat(suffix) : '');
}
function collectBackupDiffOptions() {
  var options = [];
  var setups = getSetups();
  if (setups && _typeof(setups) === 'object') {
    var setupOptions = Object.keys(setups).filter(function (name) {
      return typeof name === 'string' && name;
    }).map(function (name) {
      var parsed = parseAutoBackupName(name);
      var label = formatComparisonOptionLabel(name, parsed);
      var hasValidDate = parsed && parsed.date instanceof Date && !Number.isNaN(parsed.date.valueOf());
      return {
        value: name,
        label: label,
        data: setups[name],
        parsed: parsed,
        timestamp: hasValidDate ? parsed.date.getTime() : null
      };
    }).sort(function (a, b) {
      var autoA = Boolean(a.parsed);
      var autoB = Boolean(b.parsed);
      if (autoA !== autoB) {
        return autoA ? 1 : -1;
      }
      if (autoA && autoB) {
        var timeA = typeof a.timestamp === 'number' ? a.timestamp : null;
        var timeB = typeof b.timestamp === 'number' ? b.timestamp : null;
        if (timeA !== null && timeB !== null && timeA !== timeB) {
          return timeB - timeA;
        }
        if (timeA !== null && timeB === null) {
          return -1;
        }
        if (timeA === null && timeB !== null) {
          return 1;
        }
      }
      return localeSort(a.label, b.label);
    }).map(function (_ref7) {
      var parsed = _ref7.parsed,
        timestamp = _ref7.timestamp,
        option = _objectWithoutProperties(_ref7, _excluded);
      return option;
    });
    options.push.apply(options, _toConsumableArray(setupOptions));
  }
  return options;
}
function fillBackupDiffSelect(select, options, selectedValue) {
  if (!select) return;
  var placeholderText = getDiffText('versionCompareSelectPlaceholder', 'Select a version');
  var fragment = document.createDocumentFragment();
  var placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = placeholderText;
  placeholder.disabled = options.length > 0;
  placeholder.selected = true;
  fragment.appendChild(placeholder);
  options.forEach(function (option) {
    var opt = document.createElement('option');
    opt.value = option.value;
    opt.textContent = option.label;
    fragment.appendChild(opt);
  });
  select.innerHTML = '';
  select.appendChild(fragment);
  if (selectedValue && options.some(function (option) {
    return option.value === selectedValue;
  })) {
    select.value = selectedValue;
    placeholder.selected = false;
  } else {
    select.value = '';
  }
}
function clearBackupDiffResults() {
  if (backupDiffListEl) {
    backupDiffListEl.innerHTML = '';
  }
  if (backupDiffListContainerEl) {
    backupDiffListContainerEl.hidden = true;
  }
}
function fallbackHumanizeDiffKey(key) {
  if (typeof key !== 'string') {
    return String(key);
  }
  var spaced = key.replace(/[_\s-]+/g, ' ').replace(/([a-z\d])([A-Z])/g, '$1 $2').replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2').trim();
  if (!spaced) {
    return key;
  }
  return spaced.split(' ').map(function (part) {
    if (!part) return part;
    if (part.length > 3 && part === part.toUpperCase()) {
      return part;
    }
    if (/^\d+$/.test(part)) {
      return formatNumberForComparison(Number(part));
    }
    return part.charAt(0).toUpperCase() + part.slice(1);
  }).join(' ');
}
function humanizeDiffKey(key) {
  if (typeof key !== 'string') {
    return String(key);
  }
  if (typeof humanizeKey === 'function') {
    try {
      var result = humanizeKey(key);
      if (typeof result === 'string' && result) {
        return result;
      }
    } catch (error) {
      console.warn('Failed to humanize diff key via humanizeKey', error);
    }
  }
  return fallbackHumanizeDiffKey(key);
}
var ARRAY_COMPARISON_KEY_CANDIDATES = ['name', 'label', 'title', 'id', 'uuid', 'key', 'slug'];
var ARRAY_COMPARISON_KEY_LABEL_OVERRIDES = {
  id: 'ID',
  uuid: 'UUID'
};
var ARRAY_COMPARISON_KEY_LABEL_OMIT = new Set(['name', 'label', 'title']);
function isDiffComparablePrimitive(value) {
  if (value === null) {
    return true;
  }
  var type = _typeof(value);
  return type === 'string' || type === 'number' || type === 'boolean';
}
function arrayHasOnlyComparablePrimitives(array) {
  if (!Array.isArray(array)) {
    return false;
  }
  for (var i = 0; i < array.length; i += 1) {
    if (!isDiffComparablePrimitive(array[i])) {
      return false;
    }
  }
  return true;
}
function createPrimitiveDiffKey(value) {
  if (value === null) {
    return 'primitive:null';
  }
  if (typeof value === 'number') {
    if (Number.isNaN(value)) {
      return 'primitive:number:NaN';
    }
    if (Object.is(value, -0)) {
      return 'primitive:number:-0';
    }
    return "primitive:number:".concat(value);
  }
  if (typeof value === 'string') {
    return "primitive:string:".concat(value);
  }
  if (typeof value === 'boolean') {
    return "primitive:boolean:".concat(value);
  }
  return "primitive:other:".concat(String(value));
}
function buildPrimitiveDiffIndex(array) {
  var counts = new Map();
  if (!Array.isArray(array)) {
    return counts;
  }
  for (var i = 0; i < array.length; i += 1) {
    var value = array[i];
    if (!isDiffComparablePrimitive(value)) {
      continue;
    }
    var key = createPrimitiveDiffKey(value);
    if (!counts.has(key)) {
      counts.set(key, {
        value: value,
        count: 0
      });
    }
    var entry = counts.get(key);
    entry.count += 1;
  }
  return counts;
}
function formatPrimitiveDiffPathValue(value) {
  if (typeof value === 'number') {
    if (Number.isNaN(value)) {
      return 'NaN';
    }
    if (!Number.isFinite(value)) {
      return value > 0 ? 'Infinity' : '-Infinity';
    }
    if (Object.is(value, -0)) {
      return '-0';
    }
  }
  return value;
}
function createKeyedDiffPathSegment(keyName, keyValue) {
  var serializedValue;
  try {
    serializedValue = JSON.stringify(keyValue);
  } catch (error) {
    console.warn('Failed to serialize keyed diff path value', error);
    try {
      serializedValue = JSON.stringify(String(keyValue));
    } catch (stringError) {
      console.warn('Failed to stringify keyed diff fallback value', stringError);
      serializedValue = '"?"';
    }
  }
  return "[".concat(keyName, "=").concat(serializedValue, "]");
}
function parseKeyedDiffPathSegment(segment) {
  if (typeof segment !== 'string') {
    return null;
  }
  var match = segment.match(/^\[([^=[\]]+)=([\s\S]+)\]$/);
  if (!match) {
    return null;
  }
  var keyName = match[1];
  var rawValue = match[2];
  try {
    return {
      key: keyName,
      value: JSON.parse(rawValue)
    };
  } catch (error) {
    console.warn('Failed to parse keyed diff path segment', segment, error);
    return {
      key: keyName,
      value: rawValue
    };
  }
}
function findArrayComparisonKey(baseArray, compareArray) {
  if (!Array.isArray(baseArray) || !Array.isArray(compareArray)) {
    return null;
  }
  var arrays = [baseArray, compareArray];
  var _iterator = _createForOfIteratorHelper(ARRAY_COMPARISON_KEY_CANDIDATES),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var candidate = _step.value;
      var hasValues = false;
      var valid = true;
      var seenByArray = arrays.map(function () {
        return new Set();
      });
      for (var arrayIndex = 0; arrayIndex < arrays.length && valid; arrayIndex += 1) {
        var currentArray = arrays[arrayIndex];
        for (var i = 0; i < currentArray.length; i += 1) {
          var item = currentArray[i];
          if (!isPlainObject(item)) {
            valid = false;
            break;
          }
          if (!Object.prototype.hasOwnProperty.call(item, candidate)) {
            valid = false;
            break;
          }
          var keyValue = item[candidate];
          if (keyValue === null || keyValue === undefined) {
            valid = false;
            break;
          }
          if (typeof keyValue !== 'string' && typeof keyValue !== 'number') {
            valid = false;
            break;
          }
          hasValues = true;
          var serialized = String(keyValue);
          var seen = seenByArray[arrayIndex];
          if (seen.has(serialized)) {
            valid = false;
            break;
          }
          seen.add(serialized);
        }
      }
      if (valid && hasValues) {
        return candidate;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return null;
}
function buildArrayKeyIndex(array, keyName) {
  var map = new Map();
  var order = [];
  if (!Array.isArray(array)) {
    return {
      map: map,
      order: order
    };
  }
  array.forEach(function (item) {
    if (!isPlainObject(item)) {
      return;
    }
    var keyValue = item[keyName];
    if (keyValue === null || keyValue === undefined) {
      return;
    }
    if (typeof keyValue !== 'string' && typeof keyValue !== 'number') {
      return;
    }
    var serialized = String(keyValue);
    if (map.has(serialized)) {
      return;
    }
    map.set(serialized, {
      value: item,
      keyValue: keyValue
    });
    order.push(serialized);
  });
  return {
    map: map,
    order: order
  };
}
function formatDiffListIndex(part) {
  if (typeof part !== 'string') {
    return null;
  }
  var indexMatch = part.match(/^\[(\d+)\]$/);
  if (indexMatch) {
    var _index10 = Number(indexMatch[1]);
    if (!Number.isFinite(_index10) || _index10 < 0) {
      return null;
    }
    var template = getDiffText('versionCompareListItemLabel', 'Item %s');
    return template.replace('%s', formatNumberForComparison(_index10 + 1));
  }
  var keyedSegment = parseKeyedDiffPathSegment(part);
  if (keyedSegment) {
    var key = keyedSegment.key,
      value = keyedSegment.value;
    var valueText;
    if (typeof value === 'number' && Number.isFinite(value)) {
      valueText = formatNumberForComparison(value);
    } else if (typeof value === 'string') {
      valueText = value;
    } else if (value === null) {
      valueText = 'null';
    } else {
      try {
        valueText = JSON.stringify(value);
      } catch (error) {
        console.warn('Failed to stringify keyed diff value', error);
        valueText = String(value);
      }
    }
    var _template = getDiffText('versionCompareListItemLabel', 'Item %s');
    var baseLabel = _template.replace('%s', valueText);
    if (ARRAY_COMPARISON_KEY_LABEL_OMIT.has(key)) {
      return baseLabel;
    }
    var overrideLabel = ARRAY_COMPARISON_KEY_LABEL_OVERRIDES[key];
    var keyLabel = overrideLabel || humanizeDiffKey(key);
    if (!keyLabel) {
      return baseLabel;
    }
    return "".concat(keyLabel, " \xB7 ").concat(baseLabel);
  }
  return null;
}
function formatDiffPathSegment(part) {
  var listLabel = formatDiffListIndex(part);
  if (listLabel) {
    return listLabel;
  }
  if (typeof part !== 'string') {
    return String(part);
  }
  return humanizeDiffKey(part);
}
function formatDiffPath(parts) {
  if (!Array.isArray(parts) || !parts.length) {
    return getDiffText('versionCompareRootPath', 'Entire setup');
  }
  return parts.map(formatDiffPathSegment).join(' › ');
}
function valuesEqual(a, b) {
  if (a === b) return true;
  return Number.isNaN(a) && Number.isNaN(b);
}
function computeSetupDiff(baseline, comparison) {
  var entries = [];
  function walk(baseValue, compareValue, path) {
    if (valuesEqual(baseValue, compareValue)) {
      return;
    }
    var baseIsObject = isPlainObject(baseValue);
    var compareIsObject = isPlainObject(compareValue);
    if (baseIsObject && compareIsObject) {
      var keys = new Set([].concat(_toConsumableArray(Object.keys(baseValue)), _toConsumableArray(Object.keys(compareValue))));
      keys.forEach(function (key) {
        var hasBase = Object.prototype.hasOwnProperty.call(baseValue, key);
        var hasCompare = Object.prototype.hasOwnProperty.call(compareValue, key);
        if (!hasBase) {
          entries.push({
            type: 'added',
            path: path.concat(key),
            before: undefined,
            after: compareValue[key]
          });
        } else if (!hasCompare) {
          entries.push({
            type: 'removed',
            path: path.concat(key),
            before: baseValue[key],
            after: undefined
          });
        } else {
          walk(baseValue[key], compareValue[key], path.concat(key));
        }
      });
      return;
    }
    var baseIsArray = Array.isArray(baseValue);
    var compareIsArray = Array.isArray(compareValue);
    if (baseIsArray && compareIsArray) {
      var comparisonKey = findArrayComparisonKey(baseValue, compareValue);
      if (comparisonKey) {
        var _buildArrayKeyIndex = buildArrayKeyIndex(baseValue, comparisonKey),
          baseIndex = _buildArrayKeyIndex.map,
          baseOrder = _buildArrayKeyIndex.order;
        var _buildArrayKeyIndex2 = buildArrayKeyIndex(compareValue, comparisonKey),
          compareIndex = _buildArrayKeyIndex2.map,
          compareOrder = _buildArrayKeyIndex2.order;
        var combinedOrder = [];
        var seenKeys = new Set();
        var appendKey = function appendKey(key) {
          if (!seenKeys.has(key)) {
            seenKeys.add(key);
            combinedOrder.push(key);
          }
        };
        baseOrder.forEach(appendKey);
        compareOrder.forEach(appendKey);
        combinedOrder.forEach(function (serializedKey) {
          var baseEntry = baseIndex.get(serializedKey) || null;
          var compareEntry = compareIndex.get(serializedKey) || null;
          var keyValue = baseEntry ? baseEntry.keyValue : compareEntry ? compareEntry.keyValue : serializedKey;
          var nextPath = path.concat(createKeyedDiffPathSegment(comparisonKey, keyValue));
          if (!baseEntry && compareEntry) {
            entries.push({
              type: 'added',
              path: nextPath,
              before: undefined,
              after: compareEntry.value
            });
          } else if (baseEntry && !compareEntry) {
            entries.push({
              type: 'removed',
              path: nextPath,
              before: baseEntry.value,
              after: undefined
            });
          } else if (baseEntry && compareEntry) {
            walk(baseEntry.value, compareEntry.value, nextPath);
          }
        });
        return;
      }
      if (arrayHasOnlyComparablePrimitives(baseValue) && arrayHasOnlyComparablePrimitives(compareValue)) {
        var _baseIndex = buildPrimitiveDiffIndex(baseValue);
        var _compareIndex = buildPrimitiveDiffIndex(compareValue);
        var _combinedOrder = [];
        var _seenKeys = new Set();
        var _appendKey = function _appendKey(key) {
          if (!_seenKeys.has(key)) {
            _seenKeys.add(key);
            _combinedOrder.push(key);
          }
        };
        for (var i = 0; i < baseValue.length; i += 1) {
          _appendKey(createPrimitiveDiffKey(baseValue[i]));
        }
        for (var _i2 = 0; _i2 < compareValue.length; _i2 += 1) {
          _appendKey(createPrimitiveDiffKey(compareValue[_i2]));
        }
        _combinedOrder.forEach(function (key) {
          var baseEntry = _baseIndex.get(key) || null;
          var compareEntry = _compareIndex.get(key) || null;
          var baseCount = baseEntry ? baseEntry.count : 0;
          var compareCount = compareEntry ? compareEntry.count : 0;
          if (compareCount > baseCount) {
            var addValue = compareEntry ? compareEntry.value : undefined;
            var diff = compareCount - baseCount;
            for (var _i3 = 0; _i3 < diff; _i3 += 1) {
              entries.push({
                type: 'added',
                path: path.concat(createKeyedDiffPathSegment('value', formatPrimitiveDiffPathValue(addValue))),
                before: undefined,
                after: addValue
              });
            }
          }
          if (baseCount > compareCount) {
            var removeValue = baseEntry ? baseEntry.value : undefined;
            var _diff = baseCount - compareCount;
            for (var _i4 = 0; _i4 < _diff; _i4 += 1) {
              entries.push({
                type: 'removed',
                path: path.concat(createKeyedDiffPathSegment('value', formatPrimitiveDiffPathValue(removeValue))),
                before: removeValue,
                after: undefined
              });
            }
          }
        });
        return;
      }
      var maxLength = Math.max(baseValue.length, compareValue.length);
      for (var _index11 = 0; _index11 < maxLength; _index11 += 1) {
        var hasBase = _index11 < baseValue.length;
        var hasCompare = _index11 < compareValue.length;
        var nextPath = path.concat("[".concat(_index11, "]"));
        if (!hasBase) {
          entries.push({
            type: 'added',
            path: nextPath,
            before: undefined,
            after: compareValue[_index11]
          });
        } else if (!hasCompare) {
          entries.push({
            type: 'removed',
            path: nextPath,
            before: baseValue[_index11],
            after: undefined
          });
        } else {
          walk(baseValue[_index11], compareValue[_index11], nextPath);
        }
      }
      return;
    }
    if (!baseIsObject && !baseIsArray && (compareIsObject || compareIsArray)) {
      entries.push({
        type: 'changed',
        path: path,
        before: baseValue,
        after: compareValue
      });
      return;
    }
    if ((baseIsObject || baseIsArray) && !compareIsObject && !compareIsArray) {
      entries.push({
        type: 'changed',
        path: path,
        before: baseValue,
        after: compareValue
      });
      return;
    }
    var changeType = baseValue === undefined ? 'added' : compareValue === undefined ? 'removed' : 'changed';
    entries.push({
      type: changeType,
      path: path,
      before: baseValue,
      after: compareValue
    });
  }
  walk(baseline, comparison, []);
  return entries;
}
function createDiffValueElement(value, variant) {
  var element = document.createElement('pre');
  element.className = 'diff-value';
  if (variant) {
    element.className += " diff-value-".concat(variant);
  }
  if (value === undefined) {
    element.textContent = getDiffText('versionCompareMissingValue', 'Not present');
    return element;
  }
  if (value === null) {
    element.textContent = 'null';
    return element;
  }
  if (typeof value === 'string') {
    element.textContent = value;
    return element;
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    element.textContent = String(value);
    return element;
  }
  try {
    element.textContent = JSON.stringify(value, null, 2);
  } catch (error) {
    console.warn('Failed to stringify diff value', error);
    element.textContent = String(value);
  }
  return element;
}
function createDiffChangeBlock(labelText, value, variant) {
  var block = document.createElement('div');
  block.className = 'diff-change';
  if (variant) {
    block.classList.add("diff-change-".concat(variant));
  }
  var label = document.createElement('span');
  label.className = 'diff-label';
  label.textContent = labelText;
  block.appendChild(label);
  block.appendChild(createDiffValueElement(value, variant));
  return block;
}
function createDiffStatusBadge(type) {
  var badge = document.createElement('span');
  badge.className = 'diff-label diff-status-badge';
  var variant = 'changed';
  var textKey = 'versionCompareChangeUpdated';
  var fallbackText = 'Updated';
  if (type === 'added') {
    variant = 'added';
    textKey = 'versionCompareChangeAdded';
    fallbackText = 'Added';
  } else if (type === 'removed') {
    variant = 'removed';
    textKey = 'versionCompareChangeRemoved';
    fallbackText = 'Removed';
  } else if (type === 'changed') {
    variant = 'changed';
    textKey = 'versionCompareChangeUpdated';
    fallbackText = 'Updated';
  }
  badge.classList.add("diff-status-".concat(variant));
  badge.textContent = getDiffText(textKey, fallbackText);
  return badge;
}
function sortDiffEntries(entries) {
  if (!Array.isArray(entries)) {
    return [];
  }
  var typeRank = {
    changed: 0,
    added: 1,
    removed: 2
  };
  var compareStrings = typeof localeSort === 'function' ? function (a, b) {
    return localeSort(a, b);
  } : function (a, b) {
    return a.localeCompare(b);
  };
  return entries.map(function (entry) {
    return {
      entry: entry,
      pathText: formatDiffPath(entry && entry.path),
      rank: entry && entry.type && Object.prototype.hasOwnProperty.call(typeRank, entry.type) ? typeRank[entry.type] : 3
    };
  }).sort(function (a, b) {
    if (a.rank !== b.rank) {
      return a.rank - b.rank;
    }
    return compareStrings(a.pathText, b.pathText);
  });
}
function renderBackupDiffEntries(entries) {
  if (!backupDiffListEl || !backupDiffListContainerEl) {
    return;
  }
  backupDiffListEl.innerHTML = '';
  if (!Array.isArray(entries) || !entries.length) {
    backupDiffListContainerEl.hidden = true;
    return;
  }
  backupDiffListContainerEl.hidden = false;
  var decoratedEntries = sortDiffEntries(entries);
  decoratedEntries.forEach(function (_ref8) {
    var entry = _ref8.entry,
      pathText = _ref8.pathText;
    if (!entry) {
      return;
    }
    var item = document.createElement('li');
    var typeClass = entry.type ? " diff-".concat(entry.type) : '';
    item.className = "diff-entry".concat(typeClass);
    var header = document.createElement('div');
    header.className = 'diff-entry-header';
    var path = document.createElement('div');
    path.className = 'diff-path';
    path.textContent = pathText;
    header.appendChild(path);
    header.appendChild(createDiffStatusBadge(entry.type));
    item.appendChild(header);
    var changeGroup = document.createElement('div');
    changeGroup.className = 'diff-change-group';
    if (entry.type === 'changed') {
      changeGroup.classList.add('diff-change-group--split');
      changeGroup.appendChild(createDiffChangeBlock(getDiffText('versionCompareChangeRemoved', 'Removed'), entry.before, 'removed'));
      changeGroup.appendChild(createDiffChangeBlock(getDiffText('versionCompareChangeAdded', 'Added'), entry.after, 'added'));
    } else if (entry.type === 'added') {
      changeGroup.appendChild(createDiffChangeBlock(getDiffText('versionCompareChangeAdded', 'Added'), entry.after, 'added'));
    } else if (entry.type === 'removed') {
      changeGroup.appendChild(createDiffChangeBlock(getDiffText('versionCompareChangeRemoved', 'Removed'), entry.before, 'removed'));
    } else {
      changeGroup.appendChild(createDiffChangeBlock(getDiffText('versionCompareChangeUpdated', 'Updated'), entry.after, 'changed'));
    }
    if (changeGroup.childNodes.length) {
      item.appendChild(changeGroup);
    }
    backupDiffListEl.appendChild(item);
  });
}
function formatDiffCount(count) {
  var key = count === 1 ? 'versionCompareDifferencesCountOne' : 'versionCompareDifferencesCountOther';
  var template = getDiffText(key, count === 1 ? '%s difference noted.' : '%s differences noted.');
  return template.replace('%s', formatNumberForComparison(count));
}
function formatDiffDetail(key, count) {
  var template = getDiffText(key, '%s');
  return template.replace('%s', formatNumberForComparison(count));
}
function updateBackupDiffSummary(entries) {
  if (!backupDiffSummaryEl) {
    return;
  }
  if (!Array.isArray(entries) || !entries.length) {
    backupDiffSummaryEl.textContent = getDiffText('versionCompareIdentical', 'Versions match—no changes detected.');
    return;
  }
  var totals = {
    added: 0,
    removed: 0,
    changed: 0
  };
  entries.forEach(function (entry) {
    if (entry && entry.type && Object.prototype.hasOwnProperty.call(totals, entry.type)) {
      totals[entry.type] += 1;
    }
  });
  var summaryText = formatDiffCount(entries.length);
  var breakdown = [];
  if (totals.added) {
    breakdown.push(formatDiffDetail('versionCompareSummaryAdded', totals.added));
  }
  if (totals.removed) {
    breakdown.push(formatDiffDetail('versionCompareSummaryRemoved', totals.removed));
  }
  if (totals.changed) {
    breakdown.push(formatDiffDetail('versionCompareSummaryChanged', totals.changed));
  }
  backupDiffSummaryEl.textContent = breakdown.length ? "".concat(summaryText, " (").concat(breakdown.join(' · '), ")") : summaryText;
}
function renderBackupDiff() {
  if (!backupDiffSummaryEl) {
    return;
  }
  if (!backupDiffOptionsCache.length) {
    clearBackupDiffResults();
    backupDiffSummaryEl.textContent = getDiffText('versionCompareEmpty', 'Save a project or wait for auto-backups to start comparing versions.');
    if (backupDiffExportButtonEl) backupDiffExportButtonEl.disabled = true;
    if (backupDiffNotesEl) backupDiffNotesEl.disabled = true;
    return;
  }
  if (backupDiffNotesEl) backupDiffNotesEl.disabled = false;
  var baseline = backupDiffState.baseline;
  var comparison = backupDiffState.comparison;
  if (!baseline || !comparison) {
    clearBackupDiffResults();
    backupDiffSummaryEl.textContent = getDiffText('versionCompareNoSelection', 'Choose two versions to generate a diff.');
    if (backupDiffExportButtonEl) backupDiffExportButtonEl.disabled = true;
    return;
  }
  if (baseline === comparison) {
    clearBackupDiffResults();
    backupDiffSummaryEl.textContent = getDiffText('versionCompareSameSelection', 'Select two different versions to compare.');
    if (backupDiffExportButtonEl) backupDiffExportButtonEl.disabled = true;
    return;
  }
  var optionsMap = new Map(backupDiffOptionsCache.map(function (option) {
    return [option.value, option];
  }));
  var baselineEntry = optionsMap.get(baseline);
  var comparisonEntry = optionsMap.get(comparison);
  if (!baselineEntry || !comparisonEntry) {
    clearBackupDiffResults();
    backupDiffSummaryEl.textContent = getDiffText('versionCompareMissingSelection', 'Select two versions before exporting a log.');
    if (backupDiffExportButtonEl) backupDiffExportButtonEl.disabled = true;
    return;
  }
  var diffEntries = computeSetupDiff(baselineEntry.data, comparisonEntry.data);
  renderBackupDiffEntries(diffEntries);
  updateBackupDiffSummary(diffEntries);
  if (backupDiffExportButtonEl) backupDiffExportButtonEl.disabled = false;
}
function populateBackupDiffSelectors() {
  backupDiffOptionsCache = collectBackupDiffOptions();
  fillBackupDiffSelect(backupDiffPrimarySelectEl, backupDiffOptionsCache, backupDiffState.baseline);
  fillBackupDiffSelect(backupDiffSecondarySelectEl, backupDiffOptionsCache, backupDiffState.comparison);
  if (backupDiffEmptyStateEl) {
    backupDiffEmptyStateEl.hidden = backupDiffOptionsCache.length > 0;
  }
  renderBackupDiff();
}
function collapseBackupDiffSection() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (!backupDiffSectionEl) {
    return;
  }
  if (!backupDiffSectionEl.hasAttribute('hidden')) {
    backupDiffSectionEl.setAttribute('hidden', '');
  }
  if (backupDiffToggleButtonEl) {
    backupDiffToggleButtonEl.setAttribute('aria-expanded', 'false');
  }
  if (options.resetSelections) {
    backupDiffState.baseline = '';
    backupDiffState.comparison = '';
  }
  if (options.resetNotes && backupDiffNotesEl) {
    backupDiffNotesEl.value = '';
  }
}
function showBackupDiffSection() {
  if (!backupDiffSectionEl) {
    return;
  }
  populateBackupDiffSelectors();
  backupDiffSectionEl.removeAttribute('hidden');
  if (backupDiffToggleButtonEl) {
    backupDiffToggleButtonEl.setAttribute('aria-expanded', 'true');
  }
  if (backupDiffPrimarySelectEl) {
    try {
      backupDiffPrimarySelectEl.focus({
        preventScroll: true
      });
    } catch (error) {
      backupDiffPrimarySelectEl.focus();
    }
  }
}
function handleBackupDiffToggle() {
  if (!backupDiffSectionEl) {
    return;
  }
  if (backupDiffSectionEl.hasAttribute('hidden')) {
    showBackupDiffSection();
  } else {
    collapseBackupDiffSection();
  }
}
function handleBackupDiffSelectionChange(event) {
  var target = event && event.target ? event.target : null;
  if (!target) {
    return;
  }
  var value = typeof target.value === 'string' ? target.value : '';
  if (target === backupDiffPrimarySelectEl) {
    backupDiffState.baseline = value;
  } else if (target === backupDiffSecondarySelectEl) {
    backupDiffState.comparison = value;
  }
  renderBackupDiff();
}
function getComparisonEntryType(name) {
  if (typeof name !== 'string') {
    return 'manual';
  }
  if (name.startsWith(SESSION_AUTO_BACKUP_DELETION_PREFIX)) {
    return 'auto-backup-before-delete';
  }
  if (name.startsWith(SESSION_AUTO_BACKUP_NAME_PREFIX)) {
    return 'auto-backup';
  }
  return 'manual';
}
function cloneValueForExport(value) {
  if (value === undefined) {
    return undefined;
  }
  try {
    return SESSION_DEEP_CLONE(value);
  } catch (error) {
    console.warn('Failed to clone comparison snapshot for export', error);
    return value;
  }
}
function handleBackupDiffExport() {
  if (!backupDiffOptionsCache.length) {
    showNotification('warning', getDiffText('versionCompareEmpty', 'Save a project or wait for auto-backups to start comparing versions.'));
    return;
  }
  var baseline = backupDiffState.baseline;
  var comparison = backupDiffState.comparison;
  if (!baseline || !comparison || baseline === comparison) {
    showNotification('warning', getDiffText('versionCompareMissingSelection', 'Select two versions before exporting a log.'));
    return;
  }
  var optionsMap = new Map(backupDiffOptionsCache.map(function (option) {
    return [option.value, option];
  }));
  var baselineEntry = optionsMap.get(baseline);
  var comparisonEntry = optionsMap.get(comparison);
  if (!baselineEntry || !comparisonEntry) {
    showNotification('warning', getDiffText('versionCompareMissingSelection', 'Select two versions before exporting a log.'));
    return;
  }
  var diffEntries = computeSetupDiff(baselineEntry.data, comparisonEntry.data);
  var totals = {
    added: 0,
    removed: 0,
    changed: 0
  };
  diffEntries.forEach(function (entry) {
    if (entry && entry.type && Object.prototype.hasOwnProperty.call(totals, entry.type)) {
      totals[entry.type] += 1;
    }
  });
  var note = backupDiffNotesEl && typeof backupDiffNotesEl.value === 'string' ? backupDiffNotesEl.value.trim() : '';
  var timestamp = new Date();
  var _formatFullBackupFile = formatFullBackupFilename(timestamp),
    iso = _formatFullBackupFile.iso;
  var safeIso = iso.replace(/[:]/g, '-');
  var fileName = "cine-power-planner-version-log-".concat(safeIso, ".json");
  var exportPayload = {
    type: 'cine-power-planner-version-log',
    version: 1,
    createdAt: new Date().toISOString(),
    appVersion: typeof ACTIVE_APP_VERSION === 'string' ? ACTIVE_APP_VERSION : normalizeVersionValue(typeof APP_VERSION === 'string' ? APP_VERSION : null),
    baseline: {
      id: baselineEntry.value,
      label: baselineEntry.label,
      type: getComparisonEntryType(baselineEntry.value),
      snapshot: cloneValueForExport(baselineEntry.data)
    },
    comparison: {
      id: comparisonEntry.value,
      label: comparisonEntry.label,
      type: getComparisonEntryType(comparisonEntry.value),
      snapshot: cloneValueForExport(comparisonEntry.data)
    },
    summary: {
      totalDifferences: diffEntries.length,
      added: totals.added,
      removed: totals.removed,
      updated: totals.changed
    },
    differences: diffEntries.map(function (entry) {
      return {
        type: entry.type,
        path: entry.path,
        before: entry.before,
        after: entry.after
      };
    })
  };
  if (note) {
    exportPayload.note = note;
  }
  var serialized;
  try {
    serialized = JSON.stringify(exportPayload, null, 2);
  } catch (error) {
    console.warn('Failed to serialize comparison export payload', error);
    showNotification('error', getDiffText('versionCompareExportFailure', 'Comparison export failed.'));
    return;
  }
  var downloadResult = downloadBackupPayload(serialized, fileName);
  if (downloadResult && downloadResult.success) {
    showNotification('success', getDiffText('versionCompareExportSuccess', 'Comparison log exported.'));
  } else {
    showNotification('error', getDiffText('versionCompareExportFailure', 'Comparison export failed.'));
  }
}
function applyPreferencesFromStorage(safeGetItem) {
  if (typeof safeGetItem !== 'function') {
    return {
      showAutoBackups: false,
      accentColor: null,
      language: null
    };
  }
  var restoredTemperatureUnit = safeGetItem(temperaturePreferenceStorageKey);
  if (restoredTemperatureUnit) {
    try {
      applyTemperatureUnitPreferenceWithFallback(restoredTemperatureUnit, {
        persist: false
      });
    } catch (error) {
      console.warn('Failed to apply restored temperature unit preference', error);
    }
  }
  var focusScaleStorageKey = typeof FOCUS_SCALE_STORAGE_KEY_NAME === 'string' && FOCUS_SCALE_STORAGE_KEY_NAME || typeof globalThis !== 'undefined' && globalThis && typeof globalThis.FOCUS_SCALE_STORAGE_KEY_NAME === 'string' && globalThis.FOCUS_SCALE_STORAGE_KEY_NAME || 'cameraPowerPlanner_focusScale';
  var storedFocusScale = safeGetItem(focusScaleStorageKey);
  var restoredFocusScale = null;
  if (storedFocusScale) {
    var normalizedFocusScale = null;
    if (typeof normalizeFocusScale === 'function') {
      try {
        normalizedFocusScale = normalizeFocusScale(storedFocusScale);
      } catch (error) {
        console.warn('Failed to normalize restored focus scale preference', error);
      }
    }
    if (typeof normalizedFocusScale !== 'string' || !normalizedFocusScale) {
      normalizedFocusScale = typeof storedFocusScale === 'string' ? storedFocusScale.trim().toLowerCase() : '';
    }
    if (normalizedFocusScale === 'metric' || normalizedFocusScale === 'imperial') {
      restoredFocusScale = normalizedFocusScale;
      try {
        if (typeof applyFocusScalePreference === 'function') {
          applyFocusScalePreference(normalizedFocusScale, {
            persist: false,
            forceUpdate: true
          });
        }
      } catch (error) {
        console.warn('Failed to apply restored focus scale preference', error);
      }
      sessionFocusScale = normalizedFocusScale;
      try {
        if (typeof settingsFocusScale !== 'undefined' && settingsFocusScale) {
          settingsFocusScale.value = normalizedFocusScale;
        }
      } catch (error) {
        console.warn('Failed to sync restored focus scale selection', error);
      }
      if (typeof rememberSettingsFocusScaleBaseline === 'function') {
        try {
          rememberSettingsFocusScaleBaseline();
        } catch (error) {
          console.warn('Failed to update focus scale baseline after restore', error);
        }
      }
      if (typeof globalThis !== 'undefined' && globalThis) {
        try {
          globalThis.focusScalePreference = normalizedFocusScale;
        } catch (error) {
          console.warn('Failed to update global focus scale preference', error);
        }
      }
      if (typeof focusScalePreference !== 'undefined') {
        try {
          focusScalePreference = normalizedFocusScale;
        } catch (error) {
          console.warn('Failed to update scoped focus scale preference', error);
        }
      }
    }
  }
  try {
    setThemePreference(safeGetItem('darkMode') === 'true', {
      persist: true
    });
  } catch (error) {
    console.warn('Failed to apply restored dark mode preference', error);
  }
  try {
    applyPinkMode(safeGetItem('pinkMode') === 'true');
  } catch (error) {
    console.warn('Failed to apply restored pink mode preference', error);
  }
  try {
    applyHighContrast(safeGetItem('highContrast') === 'true');
  } catch (error) {
    console.warn('Failed to apply restored high contrast preference', error);
  }
  try {
    applyReduceMotion(safeGetItem('reduceMotion') === 'true');
  } catch (error) {
    console.warn('Failed to apply restored reduce motion preference', error);
  }
  try {
    applyRelaxedSpacing(safeGetItem('relaxedSpacing') === 'true');
  } catch (error) {
    console.warn('Failed to apply restored relaxed spacing preference', error);
  }
  var showBackups = safeGetItem('showAutoBackups') === 'true';
  var color = safeGetItem('accentColor');
  if (color) {
    try {
      document.documentElement.style.setProperty('--accent-color', color);
      document.documentElement.style.setProperty('--link-color', color);
    } catch (error) {
      console.warn('Failed to apply restored accent color', error);
    }
    accentColor = color;
    prevAccentColor = color;
    if (accentColorInput) {
      accentColorInput.value = color;
    }
    if (typeof updateAccentColorResetButtonState === 'function') {
      updateAccentColorResetButtonState();
    }
  }
  var language = safeGetItem('language');
  try {
    var mountVoltageKeyName = typeof getMountVoltageStorageKeyName === 'function' ? getMountVoltageStorageKeyName() : 'cameraPowerPlanner_mountVoltages';
    var storedVoltages = safeGetItem(mountVoltageKeyName);
    var parsedVoltages = parseStoredMountVoltages(storedVoltages);
    var shouldPersistVoltages = false;
    if (!parsedVoltages) {
      var backupKey = typeof getMountVoltageStorageBackupKeyName === 'function' ? getMountVoltageStorageBackupKeyName() : "".concat(mountVoltageKeyName, "__backup");
      var backupVoltages = safeGetItem(backupKey);
      if (backupVoltages !== undefined && backupVoltages !== null) {
        var parsedBackupVoltages = parseStoredMountVoltages(backupVoltages);
        if (parsedBackupVoltages) {
          parsedVoltages = parsedBackupVoltages;
          shouldPersistVoltages = true;
        }
      }
    }
    if (parsedVoltages) {
      applySessionMountVoltagePreferences(parsedVoltages, {
        persist: shouldPersistVoltages,
        triggerUpdate: true
      });
      var updateMountVoltageInputsFromStateFn = getSessionRuntimeFunction('updateMountVoltageInputsFromState');
      if (updateMountVoltageInputsFromStateFn) {
        try {
          updateMountVoltageInputsFromStateFn();
        } catch (updateError) {
          warnMissingMountVoltageHelper('updateMountVoltageInputsFromState', updateError);
        }
      } else {
        warnMissingMountVoltageHelper('updateMountVoltageInputsFromState');
      }
      rememberSettingsMountVoltagesBaseline();
    }
  } catch (voltageError) {
    console.warn('Failed to apply restored mount voltage preferences', voltageError);
  }
  return {
    showAutoBackups: showBackups,
    accentColor: color || null,
    language: language || null,
    focusScale: restoredFocusScale
  };
}
function captureSetupSelection() {
  return {
    value: setupSelect ? setupSelect.value : '',
    name: setupNameInput ? setupNameInput.value : ''
  };
}
function restoreSetupSelection(previousSelection, shouldShowAutoBackups) {
  if (!previousSelection || _typeof(previousSelection) !== 'object') {
    return;
  }
  var _previousSelection$va = previousSelection.value,
    value = _previousSelection$va === void 0 ? '' : _previousSelection$va,
    _previousSelection$na = previousSelection.name,
    name = _previousSelection$na === void 0 ? '' : _previousSelection$na;
  if (setupSelect) {
    try {
      if (shouldShowAutoBackups || !value || !value.startsWith('auto-backup-')) {
        setupSelect.value = value;
      } else {
        setupSelect.value = '';
      }
    } catch (error) {
      console.warn('Failed to restore setup selection after restore', error);
    }
  }
  if (setupNameInput) {
    try {
      setupNameInput.value = name || '';
    } catch (error) {
      console.warn('Failed to restore setup name after restore', error);
    }
  }
}
var backupFallbackLoaders = [{
  key: 'devices',
  loaderName: 'loadDeviceData',
  isValid: function isValid(value) {
    return value === null || isPlainObject(value);
  },
  loader: function loader() {
    return typeof loadDeviceData === 'function' ? loadDeviceData() : undefined;
  }
}, {
  key: 'setups',
  loaderName: 'loadSetups',
  isValid: function isValid(value) {
    return isPlainObject(value);
  },
  loader: function loader() {
    return typeof loadSetups === 'function' ? loadSetups() : undefined;
  }
}, {
  key: 'session',
  loaderName: 'loadSessionState',
  isValid: function isValid(value) {
    return value === null || isPlainObject(value);
  },
  loader: function loader() {
    return typeof loadSessionState === 'function' ? loadSessionState() : undefined;
  }
}, {
  key: 'feedback',
  loaderName: 'loadFeedback',
  isValid: function isValid(value) {
    return value === null || isPlainObject(value);
  },
  loader: function loader() {
    return typeof loadFeedback === 'function' ? loadFeedback() : undefined;
  }
}, {
  key: 'project',
  loaderName: 'loadProject',
  isValid: function isValid(value) {
    return isPlainObject(value);
  },
  loader: function loader() {
    return typeof loadProject === 'function' ? loadProject() : undefined;
  }
}, {
  key: 'favorites',
  loaderName: 'loadFavorites',
  isValid: function isValid(value) {
    return isPlainObject(value);
  },
  loader: function loader() {
    return typeof loadFavorites === 'function' ? loadFavorites() : undefined;
  }
}, {
  key: 'documentationTracker',
  loaderName: 'loadDocumentationTracker',
  isValid: function isValid(value) {
    return value === null || isPlainObject(value) && Array.isArray(value.releases) || Array.isArray(value);
  },
  loader: function loader() {
    return typeof loadDocumentationTracker === 'function' ? loadDocumentationTracker() : undefined;
  }
}, {
  key: 'autoGearBackups',
  loaderName: 'loadAutoGearBackups',
  isValid: function isValid(value) {
    return Array.isArray(value);
  },
  loader: function loader() {
    return typeof loadAutoGearBackups === 'function' ? loadAutoGearBackups() : undefined;
  }
}, {
  key: 'autoGearPresets',
  loaderName: 'loadAutoGearPresets',
  isValid: function isValid(value) {
    return Array.isArray(value);
  },
  loader: function loader() {
    return typeof loadAutoGearPresets === 'function' ? loadAutoGearPresets() : undefined;
  }
}, {
  key: 'autoGearMonitorDefaults',
  loaderName: 'loadAutoGearMonitorDefaults',
  isValid: function isValid(value) {
    return isPlainObject(value);
  },
  loader: function loader() {
    return typeof loadAutoGearMonitorDefaults === 'function' ? loadAutoGearMonitorDefaults() : undefined;
  }
}, {
  key: 'autoGearSeeded',
  loaderName: 'loadAutoGearSeedFlag',
  isValid: function isValid(value) {
    return typeof value === 'boolean';
  },
  loader: function loader() {
    return typeof loadAutoGearSeedFlag === 'function' ? loadAutoGearSeedFlag() : undefined;
  }
}, {
  key: 'autoGearActivePresetId',
  loaderName: 'loadAutoGearActivePresetId',
  isValid: function isValid(value) {
    return typeof value === 'string';
  },
  loader: function loader() {
    return typeof loadAutoGearActivePresetId === 'function' ? loadAutoGearActivePresetId() : undefined;
  }
}, {
  key: 'autoGearAutoPresetId',
  loaderName: 'loadAutoGearAutoPresetId',
  isValid: function isValid(value) {
    return typeof value === 'string';
  },
  loader: function loader() {
    return typeof loadAutoGearAutoPresetId === 'function' ? loadAutoGearAutoPresetId() : undefined;
  }
}, {
  key: 'autoGearShowBackups',
  loaderName: 'loadAutoGearBackupVisibility',
  isValid: function isValid(value) {
    return typeof value === 'boolean';
  },
  loader: function loader() {
    return typeof loadAutoGearBackupVisibility === 'function' ? loadAutoGearBackupVisibility() : undefined;
  }
}, {
  key: 'autoGearBackupRetention',
  loaderName: 'loadAutoGearBackupRetention',
  isValid: function isValid(value) {
    return typeof value === 'number' && Number.isFinite(value);
  },
  loader: function loader() {
    return typeof loadAutoGearBackupRetention === 'function' ? loadAutoGearBackupRetention() : undefined;
  }
}, {
  key: 'fullBackupHistory',
  loaderName: 'loadFullBackupHistory',
  isValid: function isValid(value) {
    return Array.isArray(value);
  },
  loader: function loader() {
    return typeof loadFullBackupHistory === 'function' ? loadFullBackupHistory() : undefined;
  }
}];
function describeError(error) {
  if (!error) {
    return null;
  }
  if (typeof error === 'string') {
    return error;
  }
  if (typeof error.message === 'string' && error.message.trim()) {
    return error.message;
  }
  try {
    return JSON.stringify(error);
  } catch (serializationError) {
    void serializationError;
  }
  try {
    return String(error);
  } catch (stringifyError) {
    void stringifyError;
  }
  return null;
}
function recordDiagnostic(diagnostics, section, status) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  if (!Array.isArray(diagnostics)) {
    return;
  }
  var entry = {
    section: section,
    status: status
  };
  if (options.source && typeof options.source === 'string') {
    entry.source = options.source;
  }
  if (typeof options.message === 'string') {
    var trimmedMessage = options.message.trim();
    if (trimmedMessage) {
      entry.message = trimmedMessage;
    }
  }
  diagnostics.push(entry);
}
function applyBackupFallbacks(target, diagnostics) {
  if (!target || _typeof(target) !== 'object') {
    return;
  }
  backupFallbackLoaders.forEach(function (_ref9) {
    var key = _ref9.key,
      loader = _ref9.loader,
      loaderName = _ref9.loaderName,
      isValid = _ref9.isValid;
    var currentValue = target[key];
    if (isValid(currentValue)) {
      return;
    }
    if (typeof loader !== 'function') {
      return;
    }
    try {
      var fallbackValue = loader();
      if (fallbackValue === undefined) {
        recordDiagnostic(diagnostics, key, 'missing', {
          source: loaderName
        });
        return;
      }
      target[key] = fallbackValue;
      recordDiagnostic(diagnostics, key, 'recovered', {
        source: loaderName
      });
    } catch (error) {
      console.warn("Failed to recover ".concat(key, " for full backup"), error);
      var message = describeError(error);
      recordDiagnostic(diagnostics, key, 'error', {
        source: loaderName,
        message: message
      });
    }
  });
}
function mergeAutoGearRuleLists(primary, secondary) {
  var baseList = Array.isArray(primary) ? primary.slice() : [];
  if (!Array.isArray(secondary) || !secondary.length) {
    return {
      combined: baseList,
      changed: false
    };
  }
  var existingIds = new Set(baseList.map(function (entry) {
    return entry && typeof entry.id === 'string' ? entry.id : null;
  }).filter(Boolean));
  var changed = false;
  secondary.forEach(function (entry) {
    if (!entry) {
      return;
    }
    var identifier = entry && typeof entry.id === 'string' ? entry.id : null;
    if (identifier && existingIds.has(identifier)) {
      return;
    }
    if (identifier) {
      existingIds.add(identifier);
    }
    baseList.push(entry);
    changed = true;
  });
  return {
    combined: baseList,
    changed: changed
  };
}
function collectFullBackupData() {
  var diagnostics = [];
  var rawData = {};
  var exportAttempted = false;
  var exportFailed = false;
  if (typeof exportAllData === 'function') {
    exportAttempted = true;
    try {
      rawData = exportAllData();
    } catch (error) {
      exportFailed = true;
      console.warn('Failed to collect planner data for full backup', error);
      var message = describeError(error);
      recordDiagnostic(diagnostics, 'exportAllData', 'error', {
        source: 'exportAllData',
        message: message
      });
      rawData = {};
    }
  } else {
    recordDiagnostic(diagnostics, 'exportAllData', 'missing', {
      source: 'exportAllData'
    });
  }
  var data = {};
  if (isPlainObject(rawData)) {
    data = _objectSpread({}, rawData);
  } else if (exportAttempted && !exportFailed && rawData && _typeof(rawData) === 'object') {
    data = _objectSpread({}, rawData);
    recordDiagnostic(diagnostics, 'exportAllData', 'coerced', {
      source: 'exportAllData'
    });
  } else {
    if (exportAttempted && !exportFailed) {
      recordDiagnostic(diagnostics, 'exportAllData', 'invalid', {
        source: 'exportAllData'
      });
    }
    data = {};
  }
  applyBackupFallbacks(data, diagnostics);
  if (!Array.isArray(data.autoGearRules)) {
    var rules = null;
    var ruleSource = '';
    var recovered = false;
    if (typeof getBaseAutoGearRules === 'function') {
      try {
        var baseRules = getBaseAutoGearRules();
        if (Array.isArray(baseRules)) {
          rules = baseRules.slice();
          ruleSource = 'getBaseAutoGearRules';
          recovered = true;
        }
      } catch (error) {
        console.warn('Failed to capture automatic gear rules from state for full backup', error);
        var _message2 = describeError(error);
        recordDiagnostic(diagnostics, 'autoGearRules', 'error', {
          source: 'getBaseAutoGearRules',
          message: _message2
        });
      }
    }
    var storedRules = null;
    if (typeof loadAutoGearRules === 'function') {
      try {
        storedRules = loadAutoGearRules();
      } catch (error) {
        console.warn('Failed to load automatic gear rules from storage for full backup', error);
        var _message3 = describeError(error);
        recordDiagnostic(diagnostics, 'autoGearRules', 'error', {
          source: 'loadAutoGearRules',
          message: _message3
        });
      }
    }
    if (Array.isArray(storedRules) && storedRules.length) {
      if (!Array.isArray(rules) || !rules.length) {
        rules = storedRules;
        ruleSource = 'loadAutoGearRules';
        recovered = true;
      } else {
        var _mergeAutoGearRuleLis = mergeAutoGearRuleLists(rules, storedRules),
          combined = _mergeAutoGearRuleLis.combined,
          changed = _mergeAutoGearRuleLis.changed;
        rules = combined;
        if (changed) {
          recovered = true;
          ruleSource = ruleSource ? "".concat(ruleSource, "+loadAutoGearRules") : 'loadAutoGearRules';
        }
      }
    }
    if (Array.isArray(rules)) {
      data.autoGearRules = rules;
      recordDiagnostic(diagnostics, 'autoGearRules', recovered ? 'recovered' : 'preserved', {
        source: ruleSource || (Array.isArray(storedRules) && storedRules.length ? 'loadAutoGearRules' : '')
      });
    } else {
      data.autoGearRules = [];
      recordDiagnostic(diagnostics, 'autoGearRules', 'defaulted');
    }
  }
  return {
    data: data,
    diagnostics: diagnostics
  };
}
function buildSettingsBackupPackage() {
  var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
  var _formatFullBackupFile2 = formatFullBackupFilename(timestamp),
    iso = _formatFullBackupFile2.iso,
    fileName = _formatFullBackupFile2.fileName;
  var safeStorage = resolveSafeLocalStorage();
  var settings = captureStorageSnapshot(safeStorage);
  var sessionEntries = captureStorageSnapshot(typeof sessionStorage !== 'undefined' ? sessionStorage : null);
  var _collectFullBackupDat = collectFullBackupData(),
    backupData = _collectFullBackupDat.data,
    diagnostics = _collectFullBackupDat.diagnostics;
  var backupVersion = ACTIVE_APP_VERSION || normalizeVersionValue(typeof APP_VERSION === 'string' ? APP_VERSION : null);
  var backup = {
    version: backupVersion || undefined,
    generatedAt: iso,
    settings: settings,
    sessionStorage: Object.keys(sessionEntries).length ? sessionEntries : undefined,
    data: backupData
  };
  if (Array.isArray(diagnostics) && diagnostics.length) {
    backup.diagnostics = diagnostics;
  }
  var payload = JSON.stringify(backup);
  return {
    fileName: fileName,
    payload: payload,
    iso: iso,
    backup: backup,
    diagnostics: diagnostics
  };
}
function performSettingsBackup() {
  var notify = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var timestamp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  try {
    var config = _typeof(options) === 'object' && options !== null ? options : {};
    var isEvent = notify && _typeof(notify) === 'object' && typeof notify.type === 'string';
    var shouldNotify = config.deferDownload ? false : isEvent ? true : Boolean(notify);
    var _buildSettingsBackupP = buildSettingsBackupPackage(timestamp),
      fileName = _buildSettingsBackupP.fileName,
      payload = _buildSettingsBackupP.payload,
      iso = _buildSettingsBackupP.iso;
    if (config.deferDownload) {
      return {
        fileName: fileName,
        payload: payload,
        createdAt: iso
      };
    }
    var downloadResult = downloadBackupPayload(payload, fileName);
    if (!downloadResult || !downloadResult.success && !downloadResult.queued) {
      throw new Error('No supported download method available');
    }
    if (downloadResult.success) {
      try {
        recordFullBackupHistoryEntryFn({
          createdAt: iso,
          fileName: fileName
        });
      } catch (historyError) {
        console.warn('Failed to record full backup history entry', historyError);
      }
      if (downloadResult.method === 'window-fallback') {
        var manualMessage = getManualDownloadFallbackMessage();
        showNotification('warning', manualMessage);
        if (typeof alert === 'function') {
          alert(manualMessage);
        }
      } else if (shouldNotify) {
        showNotification('success', 'Full app backup downloaded');
      }
    } else if (downloadResult.queued && downloadResult.queueMessage) {
      showNotification('warning', downloadResult.queueMessage);
    }
    return {
      fileName: fileName,
      downloadResult: downloadResult
    };
  } catch (e) {
    console.warn('Backup failed', e);
    if (notify) {
      showNotification('error', 'Backup failed');
    }
    return null;
  }
}
function createSettingsBackup() {
  var notify = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var timestamp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
  var result = performSettingsBackup(notify, timestamp);
  return result ? result.fileName : null;
}
if (backupSettings) {
  backupSettings.addEventListener('click', createSettingsBackup);
}
var storageBackupNowControl = typeof document !== 'undefined' ? document.getElementById('storageBackupNow') : null;
if (storageBackupNowControl) {
  storageBackupNowControl.addEventListener('click', createSettingsBackup);
}
var storagePersistenceRequestButton = typeof document !== 'undefined' ? document.getElementById('storagePersistenceRequest') : null;
var storagePersistenceStatusEl = typeof document !== 'undefined' ? document.getElementById('storagePersistenceStatus') : null;
var loggingSectionEl = typeof document !== 'undefined' ? document.getElementById('loggingSection') : null;
var loggingHistoryListEl = typeof document !== 'undefined' ? document.getElementById('loggingHistory') : null;
var loggingStatusEl = typeof document !== 'undefined' ? document.getElementById('loggingStatus') : null;
var loggingEmptyEl = typeof document !== 'undefined' ? document.getElementById('loggingEmpty') : null;
var loggingUnavailableEl = typeof document !== 'undefined' ? document.getElementById('loggingUnavailable') : null;
var loggingLevelFilterEl = typeof document !== 'undefined' ? document.getElementById('loggingLevelFilter') : null;
var loggingNamespaceFilterEl = typeof document !== 'undefined' ? document.getElementById('loggingNamespaceFilter') : null;
var loggingNamespaceHelpEl = typeof document !== 'undefined' ? document.getElementById('loggingNamespaceFilterHelp') : null;
var loggingExportButton = typeof document !== 'undefined' ? document.getElementById('loggingExportBtn') : null;
var loggingHistoryLimitInput = typeof document !== 'undefined' ? document.getElementById('loggingHistoryLimit') : null;
var loggingHistoryLimitHelpEl = typeof document !== 'undefined' ? document.getElementById('loggingHistoryLimitHelp') : null;
var loggingConsoleOutputInput = typeof document !== 'undefined' ? document.getElementById('loggingConsoleOutput') : null;
var loggingCaptureConsoleInput = typeof document !== 'undefined' ? document.getElementById('loggingCaptureConsole') : null;
var loggingCaptureErrorsInput = typeof document !== 'undefined' ? document.getElementById('loggingCaptureErrors') : null;
var loggingPersistSessionInput = typeof document !== 'undefined' ? document.getElementById('loggingPersistSession') : null;
var storagePersistenceState = {
  supported: null,
  persisted: null,
  usage: null,
  quota: null,
  checking: false,
  requestInFlight: false,
  requestAttempted: false,
  lastRequestDenied: false,
  lastError: null,
  lastLoggedUsage: null,
  lastLoggedQuota: null,
  lastLoggedSupported: null,
  lastLoggedPersisted: null,
  lastLoggedSummary: null
};
var storagePersistenceCheckToken = 0;
function logStoragePersistenceEstimateUpdate() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _ref0 = options || {},
    _ref0$fromRequest = _ref0.fromRequest,
    fromRequest = _ref0$fromRequest === void 0 ? false : _ref0$fromRequest;
  var quota = typeof storagePersistenceState.quota === 'number' && Number.isFinite(storagePersistenceState.quota) ? storagePersistenceState.quota : null;
  if (quota === null) {
    return;
  }
  var usage = typeof storagePersistenceState.usage === 'number' && Number.isFinite(storagePersistenceState.usage) ? storagePersistenceState.usage : null;
  var supported = typeof storagePersistenceState.supported === 'boolean' ? storagePersistenceState.supported : null;
  var persisted = typeof storagePersistenceState.persisted === 'boolean' ? storagePersistenceState.persisted : null;
  var _getStoragePersistenc = getStoragePersistenceLangInfo(),
    lang = _getStoragePersistenc.lang,
    langTexts = _getStoragePersistenc.langTexts,
    fallbackTexts = _getStoragePersistenc.fallbackTexts;
  var quotaText = formatStoragePersistenceBytes(quota, lang);
  var usageText = usage !== null ? formatStoragePersistenceBytes(usage, lang) : '';
  var summary = '';
  if (usageText) {
    var template = langTexts && langTexts.storagePersistenceUsage || fallbackTexts && fallbackTexts.storagePersistenceUsage || '';
    summary = template.replace('{used}', usageText).replace('{quota}', quotaText);
  } else {
    var quotaTemplate = langTexts && langTexts.loggingStorageQuotaOnly || fallbackTexts && fallbackTexts.loggingStorageQuotaOnly || '';
    summary = quotaTemplate.replace('{quota}', quotaText);
  }
  var message = langTexts && langTexts.loggingStorageEstimateUpdated || fallbackTexts && fallbackTexts.loggingStorageEstimateUpdated || 'Storage estimate refreshed.';
  var unchanged = storagePersistenceState.lastLoggedUsage === usage && storagePersistenceState.lastLoggedQuota === quota && storagePersistenceState.lastLoggedSupported === supported && storagePersistenceState.lastLoggedPersisted === persisted && storagePersistenceState.lastLoggedSummary === summary;
  if (unchanged && !fromRequest) {
    return;
  }
  logSettingsEvent('info', message, {
    summary: summary || null,
    usageBytes: usage,
    usageDisplay: usageText || null,
    quotaBytes: quota,
    quotaDisplay: quotaText || null,
    supported: supported,
    persisted: persisted,
    trigger: fromRequest ? 'user-request' : 'auto-refresh'
  }, {
    source: 'storage-persistence'
  });
  storagePersistenceState.lastLoggedUsage = usage;
  storagePersistenceState.lastLoggedQuota = quota;
  storagePersistenceState.lastLoggedSupported = supported;
  storagePersistenceState.lastLoggedPersisted = persisted;
  storagePersistenceState.lastLoggedSummary = summary;
}
var LOGGING_LEVEL_PRIORITY = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40
};
var LOGGING_HISTORY_MIN = 50;
var LOGGING_HISTORY_MAX = 2000;
var LOGGING_EXPORT_STATUS_RESET_DELAY = 6000;
var loggingState = {
  initialized: false,
  loggingApi: null,
  unsubscribeHistory: null,
  unsubscribeConfig: null,
  retryTimer: null,
  renderScheduled: false,
  levelFilter: 'all',
  namespaceFilter: '',
  config: null,
  namespaceDebounce: null,
  statusResetTimer: null,
  degraded: false
};
function getLoggingLangInfo() {
  var fallbackTexts = texts && texts.en ? texts.en : {};
  var lang = typeof currentLang === 'string' && texts && texts[currentLang] ? currentLang : 'en';
  var langTexts = texts && texts[lang] || fallbackTexts;
  return {
    lang: lang,
    langTexts: langTexts,
    fallbackTexts: fallbackTexts
  };
}
function setLoggingStatusKey(key) {
  if (!loggingStatusEl) {
    return;
  }
  if (loggingState.statusResetTimer != null) {
    clearTimeout(loggingState.statusResetTimer);
    loggingState.statusResetTimer = null;
  }
  var _getLoggingLangInfo = getLoggingLangInfo(),
    langTexts = _getLoggingLangInfo.langTexts,
    fallbackTexts = _getLoggingLangInfo.fallbackTexts;
  var text = langTexts && langTexts[key] || fallbackTexts && fallbackTexts[key] || '';
  loggingStatusEl.textContent = text;
  if (text) {
    loggingStatusEl.setAttribute('data-help', text);
  } else {
    loggingStatusEl.removeAttribute('data-help');
  }
}
function scheduleLoggingStatusReset() {
  var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5000;
  var fallbackKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'loggingStatusIdle';
  if (loggingState.statusResetTimer != null) {
    clearTimeout(loggingState.statusResetTimer);
    loggingState.statusResetTimer = null;
  }
  if (typeof setTimeout !== 'function') {
    if (fallbackKey) {
      setLoggingStatusKey(fallbackKey);
    }
    return;
  }
  var timeout = typeof delay === 'number' && Number.isFinite(delay) ? Math.max(0, delay) : 5000;
  loggingState.statusResetTimer = setTimeout(function () {
    loggingState.statusResetTimer = null;
    if (fallbackKey) {
      setLoggingStatusKey(fallbackKey);
    }
  }, timeout);
}
function resolveLoggingApi() {
  if (loggingState.loggingApi && typeof loggingState.loggingApi.getHistory === 'function') {
    return loggingState.loggingApi;
  }
  var scopes = [];
  if (typeof globalThis !== 'undefined' && globalThis) scopes.push(globalThis);
  if (typeof window !== 'undefined' && window && scopes.indexOf(window) === -1) scopes.push(window);
  if (typeof self !== 'undefined' && self && scopes.indexOf(self) === -1) scopes.push(self);
  if (typeof global !== 'undefined' && global && scopes.indexOf(global) === -1) scopes.push(global);
  for (var _index12 = 0; _index12 < scopes.length; _index12 += 1) {
    var _scope2 = scopes[_index12];
    if (!_scope2 || _typeof(_scope2) !== 'object' && typeof _scope2 !== 'function') {
      continue;
    }
    try {
      var candidate = _scope2.cineLogging;
      if (candidate && _typeof(candidate) === 'object' && typeof candidate.getHistory === 'function' && typeof candidate.subscribe === 'function') {
        loggingState.loggingApi = candidate;
        return candidate;
      }
    } catch (error) {
      console.warn('Unable to resolve cineLogging', error);
    }
  }
  return null;
}
function detachLoggingSubscriptions() {
  if (loggingState.unsubscribeHistory) {
    try {
      loggingState.unsubscribeHistory();
    } catch (error) {
      console.warn('Failed to detach logging history subscription', error);
    }
  }
  if (loggingState.unsubscribeConfig) {
    try {
      loggingState.unsubscribeConfig();
    } catch (error) {
      console.warn('Failed to detach logging config subscription', error);
    }
  }
  loggingState.unsubscribeHistory = null;
  loggingState.unsubscribeConfig = null;
}
function setLoggingControlsDisabled(disabled) {
  var inputs = [loggingLevelFilterEl, loggingNamespaceFilterEl, loggingHistoryLimitInput, loggingConsoleOutputInput, loggingCaptureConsoleInput, loggingCaptureErrorsInput, loggingPersistSessionInput, loggingExportButton];
  inputs.forEach(function (input) {
    if (!input) return;
    input.disabled = !!disabled;
    if (disabled) {
      input.setAttribute('aria-disabled', 'true');
    } else {
      input.setAttribute('aria-disabled', 'false');
    }
  });
}
function formatLogDetailValue(value) {
  if (value == null) {
    return '';
  }
  if (typeof value === 'string') {
    return value;
  }
  try {
    return JSON.stringify(value, null, 2);
  } catch (error) {
    return String(value);
  }
}
function formatLogTimestamp(entry, langTexts, fallbackTexts) {
  var lang = typeof currentLang === 'string' && texts && texts[currentLang] ? currentLang : 'en';
  var timestamp = typeof entry.timestamp === 'number' && Number.isFinite(entry.timestamp) ? entry.timestamp : null;
  var localText = '';
  if (timestamp != null) {
    var date = new Date(timestamp);
    if (!Number.isNaN(date.getTime())) {
      try {
        if (typeof Intl !== 'undefined' && typeof Intl.DateTimeFormat === 'function') {
          var formatter = new Intl.DateTimeFormat(lang, {
            dateStyle: 'short',
            timeStyle: 'medium'
          });
          localText = formatter.format(date);
        } else {
          localText = date.toLocaleString();
        }
      } catch (error) {
        console.warn('Unable to format log timestamp', error);
        localText = date.toISOString();
      }
    }
  }
  var iso = typeof entry.isoTimestamp === 'string' && entry.isoTimestamp ? entry.isoTimestamp : timestamp != null ? new Date(timestamp).toISOString() : '';
  if (localText && iso && iso !== localText) {
    var template = langTexts.loggingTimestampCombined || fallbackTexts.loggingTimestampCombined || '{local} ({iso})';
    return template.replace('{local}', localText).replace('{iso}', iso);
  }
  return localText || iso || '';
}
function createLogDetailsElement(label, value) {
  var details = document.createElement('details');
  details.className = 'log-entry-details';
  var summary = document.createElement('summary');
  summary.textContent = label;
  var pre = document.createElement('pre');
  pre.className = 'log-entry-detail';
  pre.textContent = formatLogDetailValue(value);
  details.appendChild(summary);
  details.appendChild(pre);
  return details;
}
function sanitizeLoggingFileSegment(segment) {
  if (typeof segment !== 'string') {
    return '';
  }
  var trimmed = segment.trim();
  if (!trimmed) {
    return '';
  }
  return trimmed.replace(/[^A-Za-z0-9.-]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}
function buildLoggingExportMetadata() {
  var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
  var referenceDate = date instanceof Date && !Number.isNaN(date.getTime()) ? date : new Date();
  if (!(referenceDate instanceof Date) || Number.isNaN(referenceDate.getTime())) {
    referenceDate = new Date();
  }
  var isoTimestamp = '';
  if (referenceDate && typeof referenceDate.toISOString === 'function') {
    try {
      isoTimestamp = referenceDate.toISOString();
    } catch (isoError) {
      void isoError;
      isoTimestamp = '';
    }
  }
  if (!isoTimestamp) {
    var fallbackDate = new Date(Date.now());
    try {
      isoTimestamp = fallbackDate.toISOString();
      referenceDate = fallbackDate;
    } catch (fallbackIsoError) {
      void fallbackIsoError;
      isoTimestamp = String(Date.now());
    }
  }
  var stampSource = isoTimestamp || String(Date.now());
  var sanitizedStamp = sanitizeLoggingFileSegment(stampSource.replace(/[:.]/g, '-')) || sanitizeLoggingFileSegment(stampSource) || String(Date.now());
  var versionCandidate = typeof ACTIVE_APP_VERSION === 'string' && ACTIVE_APP_VERSION ? ACTIVE_APP_VERSION : typeof APP_VERSION === 'string' && APP_VERSION ? APP_VERSION : '';
  var sanitizedVersion = sanitizeLoggingFileSegment(versionCandidate);
  var parts = ['cine-power-planner-log'];
  if (sanitizedVersion) {
    parts.push("v".concat(sanitizedVersion));
  }
  parts.push(sanitizedStamp);
  var timezoneOffsetMinutes = typeof referenceDate.getTimezoneOffset === 'function' ? 0 - referenceDate.getTimezoneOffset() : null;
  return {
    isoTimestamp: isoTimestamp,
    timezoneOffsetMinutes: timezoneOffsetMinutes,
    fileName: "".concat(parts.join('-'), ".json")
  };
}
function cloneLoggingExportValue(value) {
  if (value === null || _typeof(value) !== 'object') {
    return value;
  }
  try {
    return SESSION_DEEP_CLONE(value);
  } catch (cloneError) {
    void cloneError;
  }
  try {
    return JSON.parse(JSON.stringify(value));
  } catch (jsonError) {
    void jsonError;
  }
  if (Array.isArray(value)) {
    return value.slice();
  }
  return _objectSpread({}, value);
}
function exportLoggingHistory() {
  var logging = resolveLoggingApi();
  var _getLoggingLangInfo2 = getLoggingLangInfo(),
    langTexts = _getLoggingLangInfo2.langTexts,
    fallbackTexts = _getLoggingLangInfo2.fallbackTexts;
  var unavailableMessage = langTexts && langTexts.loggingExportUnavailable || fallbackTexts && fallbackTexts.loggingExportUnavailable || '';
  var errorMessage = langTexts && langTexts.loggingExportError || fallbackTexts && fallbackTexts.loggingExportError || '';
  var successMessage = langTexts && langTexts.loggingExportSuccess || fallbackTexts && fallbackTexts.loggingExportSuccess || 'Diagnostics log exported.';
  var shouldRestoreDisabled = loggingExportButton && !loggingExportButton.disabled;
  if (loggingExportButton) {
    loggingExportButton.disabled = true;
    loggingExportButton.setAttribute('aria-disabled', 'true');
  }
  try {
    if (!logging || typeof logging.getHistory !== 'function') {
      if (unavailableMessage) {
        showNotification('error', unavailableMessage);
      }
      setLoggingStatusKey('loggingStatusError');
      scheduleLoggingStatusReset(LOGGING_EXPORT_STATUS_RESET_DELAY, 'loggingStatusIdle');
      return;
    }
    setLoggingStatusKey('loggingStatusExporting');
    var snapshot = logging.getHistory({}) || [];
    if (!Array.isArray(snapshot)) {
      throw new Error('Invalid diagnostics history snapshot.');
    }
    var historySource = snapshot;
    var historySnapshot = cloneLoggingExportValue(historySource);
    if (!Array.isArray(historySnapshot)) {
      historySnapshot = historySource.slice();
    }
    var configSnapshot = null;
    if (typeof logging.getConfig === 'function') {
      try {
        var config = logging.getConfig();
        if (config && _typeof(config) === 'object') {
          var clonedConfig = cloneLoggingExportValue(config);
          configSnapshot = clonedConfig && _typeof(clonedConfig) === 'object' ? clonedConfig : _objectSpread({}, config);
        }
      } catch (configError) {
        logSettingsEvent('warn', 'Diagnostics log export config capture failed', {
          message: describeError(configError)
        }, {
          namespace: 'logging-export'
        });
      }
    }
    var statsSnapshot = null;
    if (typeof logging.getStats === 'function') {
      try {
        var stats = logging.getStats();
        if (stats && _typeof(stats) === 'object') {
          var clonedStats = cloneLoggingExportValue(stats);
          statsSnapshot = clonedStats && _typeof(clonedStats) === 'object' ? clonedStats : _objectSpread({}, stats);
        }
      } catch (statsError) {
        logSettingsEvent('warn', 'Diagnostics log export stats capture failed', {
          message: describeError(statsError)
        }, {
          namespace: 'logging-export'
        });
      }
    }
    var metadata = buildLoggingExportMetadata(new Date());
    var exportPayload = {
      exportedAt: metadata.isoTimestamp,
      timezoneOffsetMinutes: metadata.timezoneOffsetMinutes,
      filters: {
        level: loggingState.levelFilter || 'all',
        namespace: loggingState.namespaceFilter || ''
      },
      history: historySnapshot,
      historyLength: historySnapshot.length
    };
    var appVersion = typeof ACTIVE_APP_VERSION === 'string' && ACTIVE_APP_VERSION ? ACTIVE_APP_VERSION : typeof APP_VERSION === 'string' && APP_VERSION ? APP_VERSION : null;
    if (appVersion) {
      exportPayload.appVersion = appVersion;
    }
    if (configSnapshot && _typeof(configSnapshot) === 'object') {
      exportPayload.config = configSnapshot;
    }
    if (statsSnapshot && _typeof(statsSnapshot) === 'object') {
      exportPayload.stats = statsSnapshot;
    }
    var serialized = JSON.stringify(exportPayload, null, 2);
    if (!serialized) {
      throw new Error('Empty diagnostics export payload.');
    }
    if (typeof downloadBackupPayload !== 'function') {
      throw new Error('downloadBackupPayload unavailable.');
    }
    var downloadResult = downloadBackupPayload(serialized, metadata.fileName);
    if (!downloadResult || !downloadResult.success) {
      throw new Error('Diagnostics log download failed.');
    }
    logSettingsEvent('info', 'Diagnostics log exported', {
      entries: historySnapshot.length,
      fileName: metadata.fileName
    }, {
      namespace: 'logging-export'
    });
    if (successMessage) {
      showNotification('success', successMessage);
    }
    setLoggingStatusKey('loggingStatusExported');
    scheduleLoggingStatusReset(LOGGING_EXPORT_STATUS_RESET_DELAY);
    if (downloadResult.method === 'manual' || downloadResult.method === 'window-fallback') {
      var manualMessage = getManualDownloadFallbackMessage();
      if (manualMessage) {
        showNotification('warning', manualMessage);
      }
    }
  } catch (error) {
    var message = describeError(error);
    logSettingsEvent('error', 'Diagnostics log export failed', {
      message: message || null
    }, {
      namespace: 'logging-export'
    });
    var failureMessage = errorMessage || message || 'Log export failed.';
    if (failureMessage) {
      showNotification('error', failureMessage);
    }
    setLoggingStatusKey('loggingStatusExportFailed');
    scheduleLoggingStatusReset(LOGGING_EXPORT_STATUS_RESET_DELAY);
  } finally {
    if (loggingExportButton && shouldRestoreDisabled) {
      loggingExportButton.disabled = false;
      loggingExportButton.setAttribute('aria-disabled', 'false');
    }
  }
}
function renderLoggingHistory() {
  loggingState.renderScheduled = false;
  if (!loggingSectionEl || !loggingHistoryListEl) {
    return;
  }
  var logging = resolveLoggingApi();
  var _getLoggingLangInfo3 = getLoggingLangInfo(),
    langTexts = _getLoggingLangInfo3.langTexts,
    fallbackTexts = _getLoggingLangInfo3.fallbackTexts;
  if (!logging || typeof logging.getHistory !== 'function') {
    setLoggingControlsDisabled(true);
    if (loggingUnavailableEl) {
      loggingUnavailableEl.removeAttribute('hidden');
    }
    if (loggingEmptyEl) {
      loggingEmptyEl.setAttribute('hidden', '');
    }
    if (loggingHistoryListEl) {
      loggingHistoryListEl.textContent = '';
    }
    setLoggingStatusKey('loggingStatusError');
    return;
  }
  setLoggingControlsDisabled(false);
  if (loggingUnavailableEl) {
    loggingUnavailableEl.setAttribute('hidden', '');
  }
  var history = [];
  try {
    var snapshot = logging.getHistory({});
    if (Array.isArray(snapshot)) {
      history = snapshot;
    }
  } catch (error) {
    console.warn('Unable to read logging history', error);
    var filtersDetail = {};
    if (Object.prototype.hasOwnProperty.call(loggingState, 'levelFilter')) {
      var levelValue = loggingState.levelFilter;
      filtersDetail.level = typeof levelValue === 'undefined' ? null : levelValue;
    }
    if (Object.prototype.hasOwnProperty.call(loggingState, 'namespaceFilter')) {
      var namespaceValue = loggingState.namespaceFilter;
      filtersDetail.namespace = typeof namespaceValue === 'undefined' ? null : namespaceValue;
    }
    var detail = {
      message: describeError(error)
    };
    if (Object.keys(filtersDetail).length > 0) {
      detail.filters = filtersDetail;
    }
    logSettingsEvent('error', 'Failed to read diagnostics history', detail, {
      namespace: 'logging-panel'
    });
    setLoggingStatusKey('loggingStatusError');
    history = [];
  }
  var namespaceQuery = typeof loggingState.namespaceFilter === 'string' ? loggingState.namespaceFilter.trim().toLowerCase() : '';
  var threshold = loggingState.levelFilter === 'all' ? -Infinity : LOGGING_LEVEL_PRIORITY[loggingState.levelFilter] || LOGGING_LEVEL_PRIORITY.warn;
  var entries = history.slice().reverse().filter(function (entry) {
    var _LOGGING_LEVEL_PRIORI;
    if (!entry || _typeof(entry) !== 'object') {
      return false;
    }
    var level = typeof entry.level === 'string' ? entry.level.toLowerCase() : 'info';
    var priority = (_LOGGING_LEVEL_PRIORI = LOGGING_LEVEL_PRIORITY[level]) !== null && _LOGGING_LEVEL_PRIORI !== void 0 ? _LOGGING_LEVEL_PRIORI : LOGGING_LEVEL_PRIORITY.info;
    if (priority < threshold) {
      return false;
    }
    if (namespaceQuery) {
      var namespace = typeof entry.namespace === 'string' ? entry.namespace.toLowerCase() : '';
      if (!namespace.includes(namespaceQuery)) {
        return false;
      }
    }
    return true;
  });
  var fragment = document.createDocumentFragment();
  var levelLabels = {
    debug: langTexts.loggingLevelDebug || fallbackTexts.loggingLevelDebug || 'Debug',
    info: langTexts.loggingLevelInfo || fallbackTexts.loggingLevelInfo || 'Info',
    warn: langTexts.loggingLevelWarn || fallbackTexts.loggingLevelWarn || 'Warn',
    error: langTexts.loggingLevelError || fallbackTexts.loggingLevelError || 'Error'
  };
  entries.forEach(function (entry) {
    var level = typeof entry.level === 'string' ? entry.level.toLowerCase() : 'info';
    var listItem = document.createElement('li');
    listItem.className = "log-entry level-".concat(level);
    var header = document.createElement('div');
    header.className = 'log-entry-header';
    var message = document.createElement('span');
    message.className = 'log-entry-message';
    message.textContent = typeof entry.message === 'string' ? entry.message : '';
    var levelBadge = document.createElement('span');
    levelBadge.className = 'log-entry-level';
    levelBadge.textContent = levelLabels[level] || levelLabels.info;
    header.appendChild(message);
    header.appendChild(levelBadge);
    listItem.appendChild(header);
    var metaList = document.createElement('dl');
    metaList.className = 'log-entry-meta';
    var timestampRow = document.createElement('div');
    timestampRow.className = 'log-entry-meta-row';
    var timestampLabel = document.createElement('dt');
    timestampLabel.textContent = langTexts.loggingEntryTimestampLabel || fallbackTexts.loggingEntryTimestampLabel || 'Time';
    var timestampValue = document.createElement('dd');
    timestampValue.textContent = formatLogTimestamp(entry, langTexts, fallbackTexts);
    timestampRow.appendChild(timestampLabel);
    timestampRow.appendChild(timestampValue);
    metaList.appendChild(timestampRow);
    var namespace = typeof entry.namespace === 'string' ? entry.namespace : '';
    if (namespace) {
      var namespaceRow = document.createElement('div');
      namespaceRow.className = 'log-entry-meta-row';
      var namespaceLabel = document.createElement('dt');
      namespaceLabel.textContent = langTexts.loggingEntryNamespaceLabel || fallbackTexts.loggingEntryNamespaceLabel || 'Namespace';
      var _namespaceValue = document.createElement('dd');
      _namespaceValue.textContent = namespace;
      namespaceRow.appendChild(namespaceLabel);
      namespaceRow.appendChild(_namespaceValue);
      metaList.appendChild(namespaceRow);
    }
    listItem.appendChild(metaList);
    if (entry.meta != null) {
      var metaDetails = createLogDetailsElement(langTexts.loggingEntryMetaLabel || fallbackTexts.loggingEntryMetaLabel || 'Meta', entry.meta);
      listItem.appendChild(metaDetails);
    }
    if (entry.detail != null) {
      var detailDetails = createLogDetailsElement(langTexts.loggingEntryDetailLabel || fallbackTexts.loggingEntryDetailLabel || 'Details', entry.detail);
      listItem.appendChild(detailDetails);
    }
    fragment.appendChild(listItem);
  });
  loggingHistoryListEl.textContent = '';
  loggingHistoryListEl.appendChild(fragment);
  if (loggingEmptyEl) {
    if (entries.length === 0) {
      var emptyKey = history.length > 0 ? 'loggingEmptyFiltered' : 'loggingEmptyState';
      var emptyMessage = langTexts && langTexts[emptyKey] || fallbackTexts && fallbackTexts[emptyKey] || (emptyKey === 'loggingEmptyFiltered' ? 'No log entries match the current filters.' : 'No log entries captured yet.');
      loggingEmptyEl.textContent = emptyMessage;
      loggingEmptyEl.removeAttribute('hidden');
      if (emptyMessage) {
        loggingEmptyEl.setAttribute('data-help', emptyMessage);
      }
    } else {
      loggingEmptyEl.setAttribute('hidden', '');
      loggingEmptyEl.removeAttribute('data-help');
    }
  }
  if (!loggingState.degraded) {
    setLoggingStatusKey('loggingStatusIdle');
  }
}
function scheduleLoggingRender() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (loggingState.renderScheduled && !options.immediate) {
    return;
  }
  if (options.immediate) {
    renderLoggingHistory();
    return;
  }
  loggingState.renderScheduled = true;
  var schedule = typeof requestAnimationFrame === 'function' ? requestAnimationFrame : function (callback) {
    return setTimeout(callback, 50);
  };
  schedule(function () {
    renderLoggingHistory();
  });
}
function applyLoggingConfig(config) {
  if (!config || _typeof(config) !== 'object') {
    return;
  }
  loggingState.config = config;
  var _getLoggingLangInfo4 = getLoggingLangInfo(),
    langTexts = _getLoggingLangInfo4.langTexts,
    fallbackTexts = _getLoggingLangInfo4.fallbackTexts;
  if (loggingHistoryLimitInput && typeof config.historyLimit === 'number') {
    loggingHistoryLimitInput.value = config.historyLimit;
    var template = langTexts.loggingHistoryLimitStatus || fallbackTexts.loggingHistoryLimitStatus || (loggingHistoryLimitHelpEl ? loggingHistoryLimitHelpEl.textContent : '');
    if (loggingHistoryLimitHelpEl && template) {
      loggingHistoryLimitHelpEl.textContent = template.replace('{count}', String(config.historyLimit));
    }
  }
  var setToggleState = function setToggleState(input, value) {
    if (!input) return;
    var checked = !!value;
    input.checked = checked;
    input.setAttribute('aria-checked', checked ? 'true' : 'false');
  };
  setToggleState(loggingConsoleOutputInput, config.consoleOutput !== false);
  setToggleState(loggingCaptureConsoleInput, config.captureConsole === true);
  setToggleState(loggingCaptureErrorsInput, config.captureGlobalErrors !== false);
  setToggleState(loggingPersistSessionInput, config.persistSession !== false);
}
function sanitizeLoggingConfigPartial(partial) {
  if (!partial || _typeof(partial) !== 'object') {
    return null;
  }
  var MAX_STRING_LENGTH = 64;
  var summary = {};
  try {
    var keys = Object.keys(partial);
    summary.keys = keys.slice(0, 20);
    summary.values = summary.keys.reduce(function (accumulator, key) {
      var value = partial[key];
      if (value == null || typeof value === 'boolean') {
        accumulator[key] = value;
        return accumulator;
      }
      if (typeof value === 'number') {
        accumulator[key] = Number.isFinite(value) ? value : '[number]';
        return accumulator;
      }
      if (typeof value === 'string') {
        var trimmed = value.length > MAX_STRING_LENGTH ? "".concat(value.slice(0, MAX_STRING_LENGTH), "\u2026") : value;
        accumulator[key] = trimmed;
        if (value.length > MAX_STRING_LENGTH) {
          accumulator["".concat(key, "Length")] = value.length;
        }
        return accumulator;
      }
      if (Array.isArray(value)) {
        accumulator[key] = "[array:".concat(value.length, "]");
        return accumulator;
      }
      if (_typeof(value) === 'object') {
        var objectSize = null;
        try {
          objectSize = Object.keys(value).length;
        } catch (objectSizeError) {
          void objectSizeError;
        }
        accumulator[key] = "[object".concat(objectSize != null ? ":".concat(objectSize) : '', "]");
        return accumulator;
      }
      accumulator[key] = "[".concat(_typeof(value), "]");
      return accumulator;
    }, {});
  } catch (sanitizationError) {
    summary.error = describeError(sanitizationError);
  }
  return summary;
}
function updateLoggingConfig(partial) {
  var logging = resolveLoggingApi();
  if (!logging || typeof logging.setConfig !== 'function' || !partial || _typeof(partial) !== 'object') {
    return;
  }
  try {
    logging.setConfig(partial);
  } catch (error) {
    console.warn('Unable to update logging config', error);
    logSettingsEvent('error', 'Failed to update diagnostics logging config', {
      message: describeError(error),
      partial: sanitizeLoggingConfigPartial(partial)
    }, {
      namespace: 'logging-config'
    });
    setLoggingStatusKey('loggingStatusError');
  }
}
function attachLoggingSubscriptions() {
  var logging = resolveLoggingApi();
  if (!logging) {
    detachLoggingSubscriptions();
    setLoggingControlsDisabled(true);
    if (loggingUnavailableEl) {
      loggingUnavailableEl.removeAttribute('hidden');
    }
    if (loggingState.retryTimer == null && typeof setTimeout === 'function') {
      loggingState.retryTimer = setTimeout(function () {
        loggingState.retryTimer = null;
        attachLoggingSubscriptions();
      }, 2000);
    }
    return;
  }
  if (loggingState.retryTimer != null) {
    clearTimeout(loggingState.retryTimer);
    loggingState.retryTimer = null;
  }
  try {
    var config = typeof logging.getConfig === 'function' ? logging.getConfig() : {};
    applyLoggingConfig(config);
    loggingState.degraded = false;
  } catch (error) {
    loggingState.degraded = true;
    setLoggingStatusKey('loggingStatusError');
    logSettingsEvent('warn', 'Failed to load diagnostics logging config snapshot', {
      message: describeError(error)
    }, {
      namespace: 'logging-panel'
    });
    if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
      console.warn('Unable to read logging config', error);
    }
  }
  detachLoggingSubscriptions();
  if (typeof logging.subscribe === 'function') {
    loggingState.unsubscribeHistory = logging.subscribe(function () {
      if (!loggingState.degraded) {
        setLoggingStatusKey('loggingStatusUpdating');
      }
      scheduleLoggingRender();
    });
  }
  if (typeof logging.subscribeConfig === 'function') {
    loggingState.unsubscribeConfig = logging.subscribeConfig(function (snapshot) {
      applyLoggingConfig(snapshot || {});
      if (loggingState.degraded) {
        loggingState.degraded = false;
        setLoggingStatusKey('loggingStatusIdle');
      }
    });
  }
  scheduleLoggingRender({
    immediate: true
  });
}
function initializeLoggingPanel() {
  if (!loggingSectionEl || loggingState.initialized) {
    return;
  }
  loggingState.initialized = true;
  if (loggingLevelFilterEl) {
    var value = typeof loggingLevelFilterEl.value === 'string' && loggingLevelFilterEl.value ? loggingLevelFilterEl.value : 'all';
    loggingState.levelFilter = value;
    loggingLevelFilterEl.addEventListener('change', function () {
      var selected = typeof loggingLevelFilterEl.value === 'string' ? loggingLevelFilterEl.value : 'all';
      loggingState.levelFilter = selected;
      if (!loggingState.degraded) {
        setLoggingStatusKey('loggingStatusUpdating');
      }
      scheduleLoggingRender({
        immediate: true
      });
    });
  }
  if (loggingNamespaceFilterEl) {
    loggingNamespaceFilterEl.value = '';
    var debounceDelay = 200;
    loggingNamespaceFilterEl.addEventListener('input', function () {
      if (loggingState.namespaceDebounce) {
        clearTimeout(loggingState.namespaceDebounce);
      }
      loggingState.namespaceDebounce = setTimeout(function () {
        loggingState.namespaceDebounce = null;
        loggingState.namespaceFilter = loggingNamespaceFilterEl.value || '';
        if (!loggingState.degraded) {
          setLoggingStatusKey('loggingStatusUpdating');
        }
        scheduleLoggingRender({
          immediate: true
        });
      }, debounceDelay);
    });
  }
  if (loggingHistoryLimitInput) {
    var applyLimitUpdate = function applyLimitUpdate() {
      var raw = loggingHistoryLimitInput.value;
      var parsed = parseInt(raw, 10);
      if (!Number.isFinite(parsed)) {
        if (loggingState.config && typeof loggingState.config.historyLimit === 'number') {
          loggingHistoryLimitInput.value = loggingState.config.historyLimit;
        }
        return;
      }
      var clamped = Math.min(Math.max(parsed, LOGGING_HISTORY_MIN), LOGGING_HISTORY_MAX);
      if (loggingState.config && loggingState.config.historyLimit === clamped) {
        if (parsed !== clamped) {
          loggingHistoryLimitInput.value = clamped;
        }
        return;
      }
      loggingHistoryLimitInput.value = clamped;
      if (!loggingState.degraded) {
        setLoggingStatusKey('loggingStatusUpdating');
      }
      updateLoggingConfig({
        historyLimit: clamped
      });
    };
    loggingHistoryLimitInput.addEventListener('change', applyLimitUpdate);
    loggingHistoryLimitInput.addEventListener('blur', applyLimitUpdate);
  }
  var registerToggleHandler = function registerToggleHandler(input, key) {
    if (!input) return;
    input.addEventListener('change', function () {
      var checked = !!input.checked;
      if (loggingState.config && loggingState.config[key] === checked) {
        input.setAttribute('aria-checked', checked ? 'true' : 'false');
        return;
      }
      input.setAttribute('aria-checked', checked ? 'true' : 'false');
      if (!loggingState.degraded) {
        setLoggingStatusKey('loggingStatusUpdating');
      }
      updateLoggingConfig(_defineProperty({}, key, checked));
    });
  };
  registerToggleHandler(loggingConsoleOutputInput, 'consoleOutput');
  registerToggleHandler(loggingCaptureConsoleInput, 'captureConsole');
  registerToggleHandler(loggingCaptureErrorsInput, 'captureGlobalErrors');
  registerToggleHandler(loggingPersistSessionInput, 'persistSession');
  if (loggingExportButton) {
    loggingExportButton.addEventListener('click', function () {
      exportLoggingHistory();
    });
  }
  if (loggingNamespaceHelpEl) {
    loggingNamespaceHelpEl.setAttribute('aria-live', 'polite');
  }
  attachLoggingSubscriptions();
}
function getStoragePersistenceLangInfo() {
  var fallbackTexts = texts && texts.en ? texts.en : {};
  var lang = typeof currentLang === 'string' && texts && texts[currentLang] ? currentLang : 'en';
  var langTexts = texts && texts[lang] || fallbackTexts;
  return {
    lang: lang,
    langTexts: langTexts,
    fallbackTexts: fallbackTexts
  };
}
function getStorageManagerInstance() {
  if (typeof navigator !== 'undefined' && navigator && _typeof(navigator.storage) === 'object') {
    return navigator.storage;
  }
  return null;
}
function formatStoragePersistenceBytes(bytes, lang) {
  if (typeof bytes !== 'number' || !Number.isFinite(bytes) || bytes < 0) {
    return '';
  }
  var units = ['B', 'KB', 'MB', 'GB', 'TB'];
  var index = 0;
  var value = bytes;
  while (value >= 1024 && index < units.length - 1) {
    value /= 1024;
    index += 1;
  }
  var formatted = '';
  if (typeof Intl !== 'undefined' && typeof Intl.NumberFormat === 'function') {
    try {
      var formatter = new Intl.NumberFormat(lang, {
        maximumFractionDigits: value >= 100 ? 0 : 1
      });
      formatted = formatter.format(value);
    } catch (error) {
      console.warn('Unable to format storage size', error);
      formatted = value.toFixed(value >= 100 ? 0 : 1);
    }
  } else {
    formatted = value.toFixed(value >= 100 ? 0 : 1);
  }
  return "".concat(formatted, " ").concat(units[index]);
}
function renderStoragePersistenceStatus() {
  if (!storagePersistenceStatusEl) return;
  var _getStoragePersistenc2 = getStoragePersistenceLangInfo(),
    lang = _getStoragePersistenc2.lang,
    langTexts = _getStoragePersistenc2.langTexts,
    fallbackTexts = _getStoragePersistenc2.fallbackTexts;
  var message = '';
  var state = 'idle';
  if (storagePersistenceState.requestInFlight) {
    state = 'requesting';
    message = langTexts.storagePersistenceStatusRequesting || fallbackTexts.storagePersistenceStatusRequesting || '';
  } else if (storagePersistenceState.checking) {
    state = 'checking';
    message = langTexts.storagePersistenceStatusChecking || fallbackTexts.storagePersistenceStatusChecking || '';
  } else if (storagePersistenceState.supported === false) {
    state = 'unsupported';
    message = langTexts.storagePersistenceStatusUnsupported || fallbackTexts.storagePersistenceStatusUnsupported || '';
  } else if (storagePersistenceState.persisted) {
    state = 'granted';
    message = langTexts.storagePersistenceStatusGranted || fallbackTexts.storagePersistenceStatusGranted || '';
  } else if (storagePersistenceState.lastError) {
    state = 'error';
    message = langTexts.storagePersistenceStatusError || fallbackTexts.storagePersistenceStatusError || '';
  } else if (storagePersistenceState.requestAttempted && storagePersistenceState.lastRequestDenied) {
    state = 'denied';
    message = langTexts.storagePersistenceStatusDenied || fallbackTexts.storagePersistenceStatusDenied || '';
  } else {
    state = 'idle';
    message = langTexts.storagePersistenceStatusIdle || fallbackTexts.storagePersistenceStatusIdle || '';
  }
  var parts = [message];
  if (typeof storagePersistenceState.usage === 'number') {
    var usedText = formatStoragePersistenceBytes(storagePersistenceState.usage, lang);
    if (usedText) {
      if (typeof storagePersistenceState.quota === 'number' && storagePersistenceState.quota > 0) {
        var quotaText = formatStoragePersistenceBytes(storagePersistenceState.quota, lang);
        var template = langTexts.storagePersistenceUsage || fallbackTexts.storagePersistenceUsage || '';
        if (template) {
          parts.push(template.replace('{used}', usedText).replace('{quota}', quotaText || ''));
        } else if (quotaText) {
          parts.push("".concat(usedText, " / ").concat(quotaText));
        } else {
          parts.push(usedText);
        }
      } else {
        var _template2 = langTexts.storagePersistenceUsageUnknown || fallbackTexts.storagePersistenceUsageUnknown || '';
        if (_template2) {
          parts.push(_template2.replace('{used}', usedText));
        } else {
          parts.push(usedText);
        }
      }
    }
  }
  var combined = parts.filter(Boolean).join(' ').trim();
  var output = combined || message || '';
  storagePersistenceStatusEl.textContent = output;
  storagePersistenceStatusEl.dataset.state = state;
  storagePersistenceStatusEl.setAttribute('data-state', state);
  if (output) {
    storagePersistenceStatusEl.setAttribute('data-help', output);
  } else {
    storagePersistenceStatusEl.removeAttribute('data-help');
  }
  if (storagePersistenceRequestButton) {
    var shouldDisable = !storagePersistenceStatusEl || storagePersistenceState.supported === false || storagePersistenceState.persisted || storagePersistenceState.requestInFlight || storagePersistenceState.checking;
    storagePersistenceRequestButton.disabled = shouldDisable;
    storagePersistenceRequestButton.setAttribute('aria-disabled', shouldDisable ? 'true' : 'false');
    var requestLabel = langTexts.storagePersistenceRequest || fallbackTexts.storagePersistenceRequest || storagePersistenceRequestButton.dataset.defaultLabel || storagePersistenceRequestButton.textContent || '';
    var requestHelp = langTexts.storagePersistenceRequestHelp || fallbackTexts.storagePersistenceRequestHelp || requestLabel;
    if (requestHelp) {
      storagePersistenceRequestButton.setAttribute('data-help', requestHelp);
      storagePersistenceRequestButton.setAttribute('title', requestHelp);
      storagePersistenceRequestButton.setAttribute('aria-label', requestHelp);
    }
  }
  if (typeof storagePersistenceStatusEl.dispatchEvent === 'function') {
    try {
      var event;
      var detail = {
        state: state,
        message: output,
        rawMessage: message
      };
      if (typeof CustomEvent === 'function') {
        event = new CustomEvent('storagepersistencechange', {
          detail: detail
        });
      } else if (storagePersistenceStatusEl.ownerDocument && typeof storagePersistenceStatusEl.ownerDocument.createEvent === 'function') {
        event = storagePersistenceStatusEl.ownerDocument.createEvent('CustomEvent');
        event.initCustomEvent('storagepersistencechange', false, false, detail);
      }
      if (event) {
        storagePersistenceStatusEl.dispatchEvent(event);
      }
    } catch (eventError) {
      console.warn('Unable to broadcast storage persistence status change', eventError);
    }
  }
}
function refreshStoragePersistenceStatus() {
  return _refreshStoragePersistenceStatus.apply(this, arguments);
}
function _refreshStoragePersistenceStatus() {
  _refreshStoragePersistenceStatus = _asyncToGenerator(_regenerator().m(function _callee2() {
    var options,
      _ref31,
      _ref31$fromRequest,
      fromRequest,
      checkToken,
      storageManager,
      supportsPersist,
      persistedValue,
      usageValue,
      quotaValue,
      estimate,
      _args2 = arguments,
      _t3,
      _t4;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          options = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
          if (storagePersistenceStatusEl) {
            _context2.n = 1;
            break;
          }
          return _context2.a(2);
        case 1:
          _ref31 = options || {}, _ref31$fromRequest = _ref31.fromRequest, fromRequest = _ref31$fromRequest === void 0 ? false : _ref31$fromRequest;
          checkToken = ++storagePersistenceCheckToken;
          storagePersistenceState.checking = true;
          if (!fromRequest) {
            storagePersistenceState.lastError = null;
          }
          renderStoragePersistenceStatus();
          storageManager = getStorageManagerInstance();
          if (storageManager) {
            _context2.n = 3;
            break;
          }
          if (!(checkToken !== storagePersistenceCheckToken)) {
            _context2.n = 2;
            break;
          }
          return _context2.a(2);
        case 2:
          storagePersistenceState.supported = false;
          storagePersistenceState.persisted = false;
          storagePersistenceState.usage = null;
          storagePersistenceState.quota = null;
          storagePersistenceState.checking = false;
          if (fromRequest) {
            storagePersistenceState.lastRequestDenied = true;
          }
          renderStoragePersistenceStatus();
          return _context2.a(2);
        case 3:
          supportsPersist = typeof storageManager.persist === 'function';
          storagePersistenceState.supported = supportsPersist;
          persistedValue = storagePersistenceState.persisted;
          if (!(typeof storageManager.persisted === 'function')) {
            _context2.n = 7;
            break;
          }
          _context2.p = 4;
          _context2.n = 5;
          return storageManager.persisted();
        case 5:
          persistedValue = _context2.v;
          _context2.n = 7;
          break;
        case 6:
          _context2.p = 6;
          _t3 = _context2.v;
          console.warn('Unable to determine persistent storage state', _t3);
        case 7:
          usageValue = storagePersistenceState.usage;
          quotaValue = storagePersistenceState.quota;
          if (!(typeof storageManager.estimate === 'function')) {
            _context2.n = 11;
            break;
          }
          _context2.p = 8;
          _context2.n = 9;
          return storageManager.estimate();
        case 9:
          estimate = _context2.v;
          if (estimate && _typeof(estimate) === 'object') {
            if (typeof estimate.usage === 'number' && Number.isFinite(estimate.usage)) {
              usageValue = estimate.usage;
            }
            if (typeof estimate.quota === 'number' && Number.isFinite(estimate.quota)) {
              quotaValue = estimate.quota;
            }
          }
          _context2.n = 11;
          break;
        case 10:
          _context2.p = 10;
          _t4 = _context2.v;
          console.warn('Unable to estimate storage usage', _t4);
        case 11:
          if (!(checkToken !== storagePersistenceCheckToken)) {
            _context2.n = 12;
            break;
          }
          return _context2.a(2);
        case 12:
          storagePersistenceState.persisted = Boolean(persistedValue);
          storagePersistenceState.usage = typeof usageValue === 'number' && Number.isFinite(usageValue) ? usageValue : null;
          storagePersistenceState.quota = typeof quotaValue === 'number' && Number.isFinite(quotaValue) ? quotaValue : null;
          storagePersistenceState.checking = false;
          if (fromRequest) {
            storagePersistenceState.lastRequestDenied = !storagePersistenceState.persisted;
          }
          logStoragePersistenceEstimateUpdate({
            fromRequest: fromRequest
          });
          renderStoragePersistenceStatus();
        case 13:
          return _context2.a(2);
      }
    }, _callee2, null, [[8, 10], [4, 6]]);
  }));
  return _refreshStoragePersistenceStatus.apply(this, arguments);
}
function handleStoragePersistenceRequest(_x3) {
  return _handleStoragePersistenceRequest.apply(this, arguments);
}
function _handleStoragePersistenceRequest() {
  _handleStoragePersistenceRequest = _asyncToGenerator(_regenerator().m(function _callee3(event) {
    var storageManager, supportsPersist, granted, alreadyGranted, result, _t5;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          if (event && typeof event.preventDefault === 'function') {
            event.preventDefault();
          }
          if (!(!storagePersistenceRequestButton || storagePersistenceState.requestInFlight)) {
            _context3.n = 1;
            break;
          }
          return _context3.a(2);
        case 1:
          storageManager = getStorageManagerInstance();
          storagePersistenceState.requestAttempted = true;
          supportsPersist = Boolean(storageManager && typeof storageManager.persist === 'function');
          if (supportsPersist) {
            _context3.n = 2;
            break;
          }
          storagePersistenceState.supported = supportsPersist;
          storagePersistenceState.lastRequestDenied = true;
          storagePersistenceState.lastError = null;
          renderStoragePersistenceStatus();
          return _context3.a(2);
        case 2:
          storagePersistenceState.requestInFlight = true;
          storagePersistenceState.lastError = null;
          renderStoragePersistenceStatus();
          granted = false;
          alreadyGranted = false;
          _context3.p = 3;
          if (!(typeof requestPersistentStorage === 'function')) {
            _context3.n = 5;
            break;
          }
          _context3.n = 4;
          return requestPersistentStorage();
        case 4:
          result = _context3.v;
          if (result && typeof result.supported === 'boolean') {
            storagePersistenceState.supported = result.supported;
          }
          if (result && typeof result.granted === 'boolean') {
            granted = result.granted;
          }
          if (result && typeof result.alreadyGranted === 'boolean') {
            alreadyGranted = result.alreadyGranted;
          }
          if (result && result.error) {
            storagePersistenceState.lastError = result.error;
            console.warn('Persistent storage request error', result.error);
          }
          _context3.n = 7;
          break;
        case 5:
          _context3.n = 6;
          return storageManager.persist();
        case 6:
          granted = _context3.v;
        case 7:
          _context3.n = 9;
          break;
        case 8:
          _context3.p = 8;
          _t5 = _context3.v;
          storagePersistenceState.lastError = _t5;
          console.warn('Persistent storage request failed', _t5);
        case 9:
          storagePersistenceState.requestInFlight = false;
          storagePersistenceState.lastRequestDenied = !(granted || alreadyGranted);
          if (granted || alreadyGranted) {
            storagePersistenceState.persisted = true;
          }
          renderStoragePersistenceStatus();
          refreshStoragePersistenceStatus({
            fromRequest: true
          }).catch(function (error) {
            console.warn('Persistent storage status refresh failed', error);
          });
        case 10:
          return _context3.a(2);
      }
    }, _callee3, null, [[3, 8]]);
  }));
  return _handleStoragePersistenceRequest.apply(this, arguments);
}
if (storagePersistenceRequestButton) {
  storagePersistenceRequestButton.addEventListener('click', handleStoragePersistenceRequest);
}
if (storagePersistenceStatusEl) {
  refreshStoragePersistenceStatus().catch(function (error) {
    console.warn('Persistent storage status initialization failed', error);
  });
}
initializeLoggingPanel();
if (typeof window !== 'undefined' && window && typeof window.addEventListener === 'function') {
  window.addEventListener('beforeunload', function () {
    detachLoggingSubscriptions();
    if (loggingState.retryTimer != null) {
      clearTimeout(loggingState.retryTimer);
      loggingState.retryTimer = null;
    }
  });
}
ensureSessionRuntimePlaceholder('renderStoragePersistenceStatus', function () {
  return renderStoragePersistenceStatus;
});
ensureSessionRuntimePlaceholder('refreshStoragePersistenceStatus', function () {
  return refreshStoragePersistenceStatus;
});
if (backupDiffToggleButtonEl) {
  backupDiffToggleButtonEl.addEventListener('click', handleBackupDiffToggle);
}
if (backupDiffCloseButtonEl) {
  backupDiffCloseButtonEl.addEventListener('click', function () {
    return collapseBackupDiffSection();
  });
}
if (backupDiffPrimarySelectEl) {
  backupDiffPrimarySelectEl.addEventListener('change', handleBackupDiffSelectionChange);
}
if (backupDiffSecondarySelectEl) {
  backupDiffSecondarySelectEl.addEventListener('change', handleBackupDiffSelectionChange);
}
if (backupDiffExportButtonEl) {
  backupDiffExportButtonEl.addEventListener('click', handleBackupDiffExport);
  backupDiffExportButtonEl.disabled = true;
}
if (backupDiffSummaryEl) {
  backupDiffSummaryEl.textContent = getDiffText('versionCompareNoSelection', 'Choose two versions to generate a diff.');
}
if (backupDiffNotesEl) {
  backupDiffNotesEl.disabled = true;
}
if (backupDiffSectionEl) {
  collapseBackupDiffSection();
}
function handleRestoreSettingsClick() {
  if (restoreSettingsInput) {
    restoreSettingsInput.click();
  }
}
function handleRestoreSettingsInputChange() {
  var file = restoreSettingsInput.files[0];
  if (!file) return;
  var langTexts = texts[currentLang] || {};
  var fallbackTexts = texts.en || {};
  var restoreFailureMessage = langTexts.restoreFailed || fallbackTexts.restoreFailed || 'Restore failed. Check the backup file and try again.';
  var backupFileName = null;
  try {
    backupFileName = createSettingsBackup(false, new Date());
  } catch (error) {
    console.error('Backup before restore failed', error);
  }
  if (!backupFileName) {
    var failureMessage = langTexts.restoreBackupFailed || fallbackTexts.restoreBackupFailed || 'Backup failed. Restore cancelled.';
    showNotification('error', failureMessage);
    alert(failureMessage);
    restoreSettingsInput.value = '';
    return;
  }
  showNotification('success', 'Full app backup downloaded');
  var safeStorage = resolveSafeLocalStorage();
  var storedSettingsSnapshot = captureStorageSnapshot(safeStorage);
  var storedSessionSnapshot = captureStorageSnapshot(typeof sessionStorage !== 'undefined' ? sessionStorage : null);
  var previousSelection = captureSetupSelection();
  var restoreMutated = false;
  var finalizeRestore = function finalizeRestore() {
    try {
      restoreSettingsInput.value = '';
    } catch (resetError) {
      void resetError;
    }
  };
  var revertAfterFailure = function revertAfterFailure() {
    try {
      restoreLocalStorageSnapshot(safeStorage, storedSettingsSnapshot);
    } catch (restoreError) {
      console.warn('Failed to restore localStorage snapshot after restore failure', restoreError);
    }
    try {
      restoreSessionStorageSnapshot(storedSessionSnapshot);
    } catch (sessionError) {
      console.warn('Failed to restore sessionStorage snapshot after restore failure', sessionError);
    }
    try {
      safeLoadStoredLogoPreview();
    } catch (logoError) {
      console.warn('Failed to refresh logo preview after restore failure', logoError);
    }
    try {
      syncAutoGearRulesFromStorage();
    } catch (rulesError) {
      console.warn('Failed to resync automatic gear rules after restore failure', rulesError);
    }
    var restoredPreferenceReader = createSafeStorageReader(safeStorage, 'Failed to read restored storage key');
    var restoredPreferences = applyPreferencesFromStorage(restoredPreferenceReader);
    showAutoBackups = restoredPreferences.showAutoBackups;
    try {
      populateSetupSelect();
    } catch (populateError) {
      console.warn('Failed to repopulate setup selector after restore failure', populateError);
    }
    restoreSetupSelection(previousSelection, showAutoBackups);
    if (settingsShowAutoBackups) {
      try {
        settingsShowAutoBackups.checked = showAutoBackups;
      } catch (checkboxError) {
        console.warn('Failed to restore automatic backup visibility toggle after restore failure', checkboxError);
      }
    }
    if (restoredPreferences.language) {
      try {
        applySetLanguage(restoredPreferences.language);
        if (typeof populateUserButtonDropdowns === 'function') {
          try {
            populateUserButtonDropdowns();
          } catch (userButtonError) {
            console.warn('Failed to refresh user button selectors after restoring language', userButtonError);
          }
        }
      } catch (languageError) {
        console.warn('Failed to restore language after restore failure', languageError);
      }
    }
  };
  var handleRestoreError = function handleRestoreError(error) {
    console.warn('Restore failed', error);
    showNotification('error', restoreFailureMessage);
    alert(restoreFailureMessage);
    finalizeRestore();
  };
  var processBackupPayload = function processBackupPayload(rawPayload) {
    try {
      var sanitizedPayload = sanitizeBackupPayload(rawPayload);
      if (!sanitizedPayload || !sanitizedPayload.trim()) {
        throw new Error('Backup payload empty');
      }
      var parsed = JSON.parse(sanitizedPayload);
      var _extractBackupSection2 = extractBackupSections(parsed),
        restoredSettings = _extractBackupSection2.settings,
        restoredSession = _extractBackupSection2.sessionStorage,
        data = _extractBackupSection2.data,
        fileVersion = _extractBackupSection2.fileVersion;
      var hasSettings = restoredSettings && Object.keys(restoredSettings).length > 0;
      var hasSessionEntries = restoredSession && Object.keys(restoredSession).length > 0;
      var hasDataEntries = data && Object.keys(data).length > 0;
      if (!hasSettings && !hasSessionEntries && !hasDataEntries) {
        throw new Error('Backup missing recognized sections');
      }
      var normalizedFileVersion = normalizeVersionValue(fileVersion);
      var normalizedAppVersion = ACTIVE_APP_VERSION || normalizeVersionValue(typeof APP_VERSION === 'string' ? APP_VERSION : null);
      if (normalizedFileVersion !== normalizedAppVersion) {
        var compatibilityMessage = buildRestoreVersionCompatibilityMessage({
          langTexts: langTexts,
          fallbackTexts: fallbackTexts,
          fileVersion: normalizedFileVersion,
          targetVersion: normalizedAppVersion,
          data: data,
          settingsSnapshot: restoredSettings,
          sessionSnapshot: restoredSession,
          backupFileName: backupFileName
        });
        alert(compatibilityMessage);
      }
      if (restoredSettings && _typeof(restoredSettings) === 'object') {
        if (safeStorage && typeof safeStorage.setItem === 'function') {
          restoreMutated = true;
          Object.entries(restoredSettings).forEach(function (_ref1) {
            var _ref10 = _slicedToArray(_ref1, 2),
              k = _ref10[0],
              v = _ref10[1];
            if (typeof k !== 'string') return;
            try {
              if (v === null || v === undefined) {
                if (typeof safeStorage.removeItem === 'function') {
                  safeStorage.removeItem(k);
                }
              } else {
                safeStorage.setItem(k, String(v));
              }
            } catch (storageError) {
              console.warn('Failed to restore storage entry', k, storageError);
            }
          });
        }
      }
      if (restoredSession && typeof sessionStorage !== 'undefined') {
        restoreMutated = true;
        Object.entries(restoredSession).forEach(function (_ref11) {
          var _ref12 = _slicedToArray(_ref11, 2),
            key = _ref12[0],
            value = _ref12[1];
          try {
            sessionStorage.setItem(key, value);
          } catch (sessionError) {
            console.warn('Failed to restore sessionStorage entry', key, sessionError);
          }
        });
      }
      try {
        safeLoadStoredLogoPreview();
      } catch (logoError) {
        console.warn('Failed to refresh logo preview after restore', logoError);
      }
      if (data && typeof importAllData === 'function') {
        restoreMutated = true;
        importAllData(data);
      }
      try {
        syncAutoGearRulesFromStorage(data === null || data === void 0 ? void 0 : data.autoGearRules);
      } catch (rulesError) {
        console.warn('Failed to sync automatic gear rules after restore', rulesError);
      }
      var preferenceReader = createSafeStorageReader(safeStorage, 'Failed to read restored storage key');
      var restoredPreferenceState = applyPreferencesFromStorage(preferenceReader);
      showAutoBackups = restoredPreferenceState.showAutoBackups;
      populateSetupSelect();
      restoreSetupSelection(previousSelection, showAutoBackups);
      if (settingsShowAutoBackups) {
        settingsShowAutoBackups.checked = showAutoBackups;
      }
      if (restoredPreferenceState.language) {
        applySetLanguage(restoredPreferenceState.language);
        if (typeof populateUserButtonDropdowns === 'function') {
          try {
            populateUserButtonDropdowns();
          } catch (userButtonError) {
            console.warn('Failed to refresh user button selectors after applying restored preferences', userButtonError);
          }
        }
      }
      if (restoredSession && typeof sessionStorage !== 'undefined') {
        Object.entries(restoredSession).forEach(function (_ref13) {
          var _ref14 = _slicedToArray(_ref13, 2),
            key = _ref14[0],
            value = _ref14[1];
          try {
            sessionStorage.setItem(key, value);
          } catch (sessionError) {
            console.warn('Failed to refresh sessionStorage entry after restore', key, sessionError);
          }
        });
      }
      var verificationResult = null;
      try {
        verificationResult = verifyRestoredBackupIntegrity(data);
      } catch (verificationError) {
        console.warn('Restore verification execution failed', verificationError);
        verificationResult = null;
      }
      if (verificationResult && verificationResult.notificationType && verificationResult.notificationMessage) {
        showNotification(verificationResult.notificationType, verificationResult.notificationMessage);
      }
      var successMessage = texts[currentLang].restoreSuccess;
      var alertSegments = [successMessage];
      if (verificationResult && verificationResult.alertMessage) {
        alertSegments.push(verificationResult.alertMessage);
      }
      alert(alertSegments.join('\n\n'));
      finalizeRestore();
    } catch (err) {
      if (restoreMutated) {
        try {
          revertAfterFailure();
        } catch (revertError) {
          console.warn('Failed to restore previous state after restore error', revertError);
        }
      }
      handleRestoreError(err);
    }
  };
  var attemptTextFallback = function attemptTextFallback(reason) {
    if (!file || typeof file.text !== 'function') {
      return false;
    }
    if (reason) {
      console.warn('FileReader unavailable for restore, using file.text()', reason);
    } else {
      console.warn('FileReader unavailable for restore, using file.text()');
    }
    Promise.resolve().then(function () {
      return file.text();
    }).then(processBackupPayload).catch(handleRestoreError);
    return true;
  };
  var reader = null;
  if (typeof FileReader === 'function') {
    try {
      reader = new FileReader();
    } catch (readerError) {
      console.warn('Failed to create FileReader for restore', readerError);
      reader = null;
    }
  }
  if (reader && typeof reader.readAsText === 'function') {
    reader.onload = function (event) {
      var result = event && event.target ? event.target.result : '';
      processBackupPayload(result);
    };
    reader.onerror = function () {
      var error = reader.error || new Error('Failed to read backup file');
      console.warn('FileReader failed while reading restore file', error);
      if (!attemptTextFallback(error)) {
        handleRestoreError(error);
      }
    };
    try {
      reader.readAsText(file);
      return;
    } catch (readError) {
      console.warn('Failed to read restore file', readError);
      if (!attemptTextFallback(readError)) {
        handleRestoreError(readError);
      }
      return;
    }
  }
  if (!attemptTextFallback()) {
    handleRestoreError(new Error('No supported file reader available'));
  }
}
if (restoreSettings && restoreSettingsInput) {
  restoreSettings.addEventListener('click', handleRestoreSettingsClick);
  restoreSettingsInput.addEventListener('change', handleRestoreSettingsInputChange);
}
function getSessionLanguageTexts() {
  var scope = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
  var allTexts = typeof texts !== 'undefined' && texts || (scope && _typeof(scope.texts) === 'object' ? scope.texts : null);
  var resolvedLang = typeof currentLang === 'string' && allTexts && _typeof(allTexts[currentLang]) === 'object' ? currentLang : 'en';
  var langTexts = allTexts && _typeof(allTexts[resolvedLang]) === 'object' && allTexts[resolvedLang] || {};
  var fallbackTexts = allTexts && _typeof(allTexts.en) === 'object' && allTexts.en || {};
  return {
    langTexts: langTexts,
    fallbackTexts: fallbackTexts
  };
}
function registerSessionCineUiInternal(cineUi) {
  if (!cineUi || sessionCineUiRegistered) {
    return;
  }
  registerCineUiEntries(cineUi.controllers, [{
    name: 'backupSettings',
    value: {
      execute: createSettingsBackup
    }
  }, {
    name: 'restoreSettings',
    value: {
      openPicker: handleRestoreSettingsClick,
      processFile: handleRestoreSettingsInputChange
    }
  }], 'cineUi controller registration (session) failed');
  registerCineUiEntries(cineUi.interactions, [{
    name: 'performBackup',
    value: createSettingsBackup
  }, {
    name: 'openRestorePicker',
    value: handleRestoreSettingsClick
  }, {
    name: 'applyRestoreFile',
    value: handleRestoreSettingsInputChange
  }], 'cineUi interaction registration (session) failed');
  registerCineUiEntries(cineUi.help, [{
    name: 'backupSettings',
    value: function value() {
      var _getSessionLanguageTe = getSessionLanguageTexts(),
        langTexts = _getSessionLanguageTe.langTexts,
        fallbackTexts = _getSessionLanguageTe.fallbackTexts;
      return langTexts.backupSettingsHelp || fallbackTexts.backupSettingsHelp || 'Download a full JSON backup containing every project, device edit, preference, auto-gear rule and runtime log stored on this device. Keep multiple copies in your offline archive.';
    }
  }, {
    name: 'restoreSettings',
    value: function value() {
      var _getSessionLanguageTe2 = getSessionLanguageTexts(),
        langTexts = _getSessionLanguageTe2.langTexts,
        fallbackTexts = _getSessionLanguageTe2.fallbackTexts;
      return langTexts.restoreSettingsHelp || fallbackTexts.restoreSettingsHelp || 'Restore a full JSON backup. The planner captures a fresh safety copy first, then applies the selected file so you can roll back immediately if anything looks wrong.';
    }
  }], 'cineUi help registration (session) failed');
  sessionCineUiRegistered = areSessionEntriesRegistered(cineUi);
}
function registerSessionCineUi() {
  var cineUi = typeof globalThis !== 'undefined' && globalThis.cineUi || typeof window !== 'undefined' && window.cineUi || typeof self !== 'undefined' && self.cineUi || null;
  if (!cineUi) {
    return false;
  }
  registerSessionCineUiInternal(cineUi);
  return true;
}
registerSessionCineUi();
if (restoreRehearsalButtonEl) {
  restoreRehearsalButtonEl.addEventListener('click', function () {
    openRestoreRehearsal();
  });
}
if (restoreRehearsalCloseButtonEl) {
  restoreRehearsalCloseButtonEl.addEventListener('click', function () {
    closeRestoreRehearsal();
  });
}
if (restoreRehearsalBrowseButtonEl && restoreRehearsalInputEl) {
  restoreRehearsalBrowseButtonEl.addEventListener('click', function () {
    restoreRehearsalInputEl.click();
  });
}
if (restoreRehearsalProceedButtonEl) {
  restoreRehearsalProceedButtonEl.addEventListener('click', function () {
    handleRestoreRehearsalProceed();
  });
}
if (restoreRehearsalAbortButtonEl) {
  restoreRehearsalAbortButtonEl.addEventListener('click', function () {
    handleRestoreRehearsalAbort();
  });
}
if (restoreRehearsalInputEl) {
  restoreRehearsalInputEl.addEventListener('change', function () {
    var file = restoreRehearsalInputEl.files && restoreRehearsalInputEl.files[0];
    if (!file) {
      resetRestoreRehearsalState({
        keepStatus: true
      });
      return;
    }
    if (restoreRehearsalFileNameEl) {
      restoreRehearsalFileNameEl.textContent = file.name || restoreRehearsalFileNameEl.textContent;
    }
    runRestoreRehearsal(file);
  });
}
function resetPlannerStateAfterFactoryReset() {
  var suspendable = typeof suspendProjectPersistence === 'function' && typeof resumeProjectPersistence === 'function';
  if (suspendable) {
    try {
      suspendProjectPersistence();
    } catch (error) {
      console.warn('Failed to suspend project persistence during factory reset cleanup', error);
    }
  }
  try {
    try {
      if (typeof storeLoadedSetupState === 'function') {
        storeLoadedSetupState(null);
      }
    } catch (error) {
      console.warn('Failed to reset loaded setup state during factory reset', error);
    }
    try {
      currentProjectInfo = null;
    } catch (error) {
      console.warn('Failed to clear in-memory project info during factory reset', error);
    }
    try {
      if (typeof populateProjectForm === 'function') {
        populateProjectForm({});
      } else if (projectForm && typeof projectForm.reset === 'function') {
        projectForm.reset();
      }
    } catch (error) {
      console.warn('Failed to reset project form during factory reset', error);
    }
    try {
      displayGearAndRequirements('');
    } catch (error) {
      console.warn('Failed to reset gear displays during factory reset', error);
      if (gearListOutput) {
        gearListOutput.innerHTML = '';
        gearListOutput.classList.add('hidden');
      }
      if (projectRequirementsOutput) {
        projectRequirementsOutput.innerHTML = '';
        projectRequirementsOutput.classList.add('hidden');
      }
    }
    var primarySelects = [cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect, batteryPlateSelect];
    primarySelects.forEach(function (select) {
      if (!select) return;
      try {
        var options = Array.from(select.options || []);
        var noneOption = options.find(function (opt) {
          return opt.value === 'None';
        });
        if (noneOption) {
          select.value = 'None';
        } else if (options.length) {
          select.selectedIndex = 0;
        } else {
          select.value = '';
        }
      } catch (selectError) {
        console.warn('Failed to reset selector during factory reset', selectError);
      }
    });
    try {
      resetSelectsToNone(motorSelects);
    } catch (error) {
      console.warn('Failed to reset motor selections during factory reset', error);
    }
    try {
      resetSelectsToNone(controllerSelects);
    } catch (error) {
      console.warn('Failed to reset controller selections during factory reset', error);
    }
    try {
      if (typeof getSliderBowlSelect === 'function') {
        var sliderSelect = getSliderBowlSelect();
        if (sliderSelect) sliderSelect.value = '';
      } else {
        console.warn('Skipping slider bowl selection reset during factory reset because helper is unavailable');
      }
    } catch (error) {
      console.warn('Failed to reset slider bowl selection during factory reset', error);
    }
    try {
      if (typeof getEasyrigSelect === 'function') {
        var easyrigSelect = getEasyrigSelect();
        if (easyrigSelect) easyrigSelect.value = '';
      } else {
        console.warn('Skipping Easyrig selection reset during factory reset because helper is unavailable');
      }
    } catch (error) {
      console.warn('Failed to reset Easyrig selection during factory reset', error);
    }
    try {
      if (setupNameInput) {
        setupNameInput.value = '';
      }
    } catch (error) {
      console.warn('Failed to clear setup name during factory reset', error);
    }
    try {
      if (setupSelect) {
        populateSetupSelect();
        setupSelect.value = '';
      }
    } catch (error) {
      console.warn('Failed to reset setup selector options during factory reset', error);
    }
    try {
      syncAutoGearRulesFromStorage();
    } catch (error) {
      console.warn('Failed to sync automatic gear rules during factory reset', error);
      try {
        clearProjectAutoGearRules();
      } catch (fallbackError) {
        console.warn('Failed to clear project automatic gear rules during factory reset', fallbackError);
      }
    }
    try {
      renderAutoGearRulesList();
    } catch (error) {
      console.warn('Failed to render automatic gear rules during factory reset', error);
    }
    try {
      resetSharedImportStateForFactoryReset();
    } catch (error) {
      console.warn('Failed to reset shared import state during factory reset', error);
    }
    try {
      updateAutoGearCatalogOptions();
    } catch (error) {
      console.warn('Failed to refresh automatic gear catalog during factory reset', error);
    }
    try {
      updateBatteryPlateVisibility();
    } catch (error) {
      console.warn('Failed to reset battery plate visibility during factory reset', error);
    }
    try {
      updateBatteryOptions();
    } catch (error) {
      console.warn('Failed to reset battery options during factory reset', error);
    }
    try {
      safeLoadStoredLogoPreview();
    } catch (error) {
      console.warn('Failed to reset custom logo preview during factory reset', error);
    }
    try {
      if (typeof resetCustomFontsForFactoryReset === 'function') {
        resetCustomFontsForFactoryReset();
      } else {
        console.warn('Skipping custom font reset during factory reset because helper is unavailable');
      }
    } catch (error) {
      console.warn('Failed to reset custom fonts during factory reset', error);
    }
    try {
      updateStorageSummary();
    } catch (error) {
      console.warn('Failed to update storage summary during factory reset', error);
    }
    try {
      ensureGearListActions();
    } catch (error) {
      console.warn('Failed to ensure gear list actions during factory reset', error);
    }
    try {
      checkSetupChanged();
    } catch (error) {
      console.warn('Failed to refresh setup state during factory reset', error);
    }
    try {
      updateCalculations();
    } catch (error) {
      console.warn('Failed to update calculations during factory reset', error);
    }
  } finally {
    if (suspendable) {
      try {
        resumeProjectPersistence();
      } catch (error) {
        console.warn('Failed to resume project persistence after factory reset cleanup', error);
      }
    }
  }
}
if (factoryResetButton) {
  factoryResetButton.addEventListener('click', _asyncToGenerator(_regenerator().m(function _callee() {
    var langTexts, confirmReset, confirmResetAgain, errorMsg, backupResult, backupFailedMsg, downloadPermissionState, finalDownloadPermissionState, downloadResult, permissionMonitor, deniedMsg, waitMsg, _deniedMsg, _deniedMsg2, _errorMsg, eventName, eventInstance, resetMountVoltagePreferencesFn, updateMountVoltageInputsFromStateFn, successMsg, _errorMsg2, _t, _t2;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          langTexts = texts[currentLang] || texts.en || {};
          confirmReset = langTexts.confirmFactoryReset || 'Create a backup and wipe all planner data?';
          if (confirm(confirmReset)) {
            _context.n = 1;
            break;
          }
          return _context.a(2);
        case 1:
          confirmResetAgain = langTexts.confirmFactoryResetAgain || 'This will permanently delete all saved planner data. Continue?';
          if (confirm(confirmResetAgain)) {
            _context.n = 2;
            break;
          }
          return _context.a(2);
        case 2:
          if (!(typeof performSettingsBackup !== 'function')) {
            _context.n = 3;
            break;
          }
          errorMsg = langTexts.factoryResetError || 'Factory reset failed. Please try again.';
          showNotification('error', errorMsg);
          return _context.a(2);
        case 3:
          backupResult = null;
          try {
            backupResult = performSettingsBackup(false, new Date());
          } catch (error) {
            console.error('Backup before factory reset failed', error);
          }
          if (!(!backupResult || !backupResult.fileName)) {
            _context.n = 4;
            break;
          }
          backupFailedMsg = langTexts.factoryResetBackupFailed || 'Backup failed. Data was not deleted.';
          showNotification('error', backupFailedMsg);
          return _context.a(2);
        case 4:
          downloadPermissionState = 'unknown';
          finalDownloadPermissionState = 'unknown';
          downloadResult = backupResult.downloadResult;
          permissionMonitor = downloadResult && downloadResult.permission ? downloadResult.permission : null;
          if (!(permissionMonitor && permissionMonitor.initial && typeof permissionMonitor.initial.then === 'function')) {
            _context.n = 8;
            break;
          }
          _context.p = 5;
          _context.n = 6;
          return permissionMonitor.initial;
        case 6:
          downloadPermissionState = _context.v;
          _context.n = 8;
          break;
        case 7:
          _context.p = 7;
          _t = _context.v;
          console.warn('Failed to inspect automatic download permission before factory reset', _t);
          downloadPermissionState = 'unknown';
        case 8:
          if (!(downloadPermissionState === 'denied')) {
            _context.n = 9;
            break;
          }
          deniedMsg = langTexts.factoryResetDownloadBlocked || 'The backup download was blocked. Data was not deleted.';
          showNotification('error', deniedMsg);
          if (typeof alert === 'function') {
            alert(deniedMsg);
          }
          return _context.a(2);
        case 9:
          if (downloadPermissionState === 'prompt') {
            waitMsg = langTexts.factoryResetAwaitDownload || 'Allow downloads to save your backup. The factory reset will continue after you accept the download.';
            showNotification('info', waitMsg);
            if (typeof alert === 'function') {
              alert(waitMsg);
            }
          }
          if (!(permissionMonitor && permissionMonitor.ready && typeof permissionMonitor.ready.then === 'function')) {
            _context.n = 14;
            break;
          }
          _context.p = 10;
          _context.n = 11;
          return permissionMonitor.ready;
        case 11:
          finalDownloadPermissionState = _context.v;
          _context.n = 13;
          break;
        case 12:
          _context.p = 12;
          _t2 = _context.v;
          console.warn('Failed to await automatic download permission before factory reset', _t2);
          finalDownloadPermissionState = 'unknown';
        case 13:
          _context.n = 15;
          break;
        case 14:
          finalDownloadPermissionState = downloadPermissionState;
        case 15:
          if (!(downloadPermissionState === 'prompt')) {
            _context.n = 17;
            break;
          }
          if (typeof finalDownloadPermissionState !== 'string' || !finalDownloadPermissionState) {
            finalDownloadPermissionState = 'unknown';
          }
          if (!(finalDownloadPermissionState !== 'granted')) {
            _context.n = 16;
            break;
          }
          _deniedMsg = langTexts.factoryResetDownloadBlocked || 'The backup download was blocked. Data was not deleted.';
          showNotification('error', _deniedMsg);
          if (typeof alert === 'function') {
            alert(_deniedMsg);
          }
          return _context.a(2);
        case 16:
          _context.n = 18;
          break;
        case 17:
          if (!(finalDownloadPermissionState === 'denied')) {
            _context.n = 18;
            break;
          }
          _deniedMsg2 = langTexts.factoryResetDownloadBlocked || 'The backup download was blocked. Data was not deleted.';
          showNotification('error', _deniedMsg2);
          if (typeof alert === 'function') {
            alert(_deniedMsg2);
          }
          return _context.a(2);
        case 18:
          if (!(typeof clearAllData !== 'function')) {
            _context.n = 19;
            break;
          }
          _errorMsg = langTexts.factoryResetError || 'Factory reset failed. Please try again.';
          showNotification('error', _errorMsg);
          return _context.a(2);
        case 19:
          try {
            factoryResetInProgress = true;
            if (typeof globalThis !== 'undefined') {
              try {
                globalThis.__cameraPowerPlannerFactoryResetting = true;
              } catch (flagError) {
                console.warn('Unable to flag factory reset on global scope', flagError);
              }
            }
            if (projectAutoSaveTimer) {
              clearTimeout(projectAutoSaveTimer);
              projectAutoSaveTimer = null;
            }
            try {
              stopPinkModeIconRotation();
              stopPinkModeAnimatedIcons();
            } catch (animationError) {
              console.warn('Failed to stop pink mode animations during factory reset', animationError);
            }
            clearAllData();
            try {
              if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
                eventName = 'cameraPowerPlannerFactoryReset';
                eventInstance = null;
                if (typeof window.CustomEvent === 'function') {
                  eventInstance = new window.CustomEvent(eventName);
                } else if (typeof document !== 'undefined' && typeof document.createEvent === 'function') {
                  eventInstance = document.createEvent('Event');
                  eventInstance.initEvent(eventName, false, false);
                }
                if (eventInstance) {
                  window.dispatchEvent(eventInstance);
                }
              }
            } catch (factoryResetEventError) {
              console.warn('Failed to dispatch factory reset event', factoryResetEventError);
            }
            try {
              resetPlannerStateAfterFactoryReset();
            } catch (resetError) {
              console.warn('Failed to reset planner state after factory reset', resetError);
            }
            try {
              setThemePreference(false, {
                persist: true
              });
            } catch (darkError) {
              console.warn('Failed to reset dark mode during factory reset', darkError);
            }
            try {
              highContrastEnabled = false;
              applyHighContrast(false);
              if (settingsHighContrast) {
                settingsHighContrast.checked = false;
              }
            } catch (contrastError) {
              console.warn('Failed to reset high contrast during factory reset', contrastError);
            }
            try {
              pinkModeEnabled = false;
              applyPinkMode(false);
              rememberSettingsPinkModeBaseline();
            } catch (pinkError) {
              console.warn('Failed to reset pink mode during factory reset', pinkError);
            }
            showAutoBackups = false;
            if (settingsShowAutoBackups) {
              settingsShowAutoBackups.checked = false;
            }
            try {
              accentColor = DEFAULT_ACCENT_COLOR;
              prevAccentColor = DEFAULT_ACCENT_COLOR;
              clearAccentColorOverrides();
              applyAccentColor(accentColor);
              if (accentColorInput) {
                accentColorInput.value = DEFAULT_ACCENT_COLOR;
              }
              if (typeof updateAccentColorResetButtonState === 'function') {
                updateAccentColorResetButtonState();
              }
            } catch (accentError) {
              console.warn('Failed to reset accent color during factory reset', accentError);
            }
            try {
              resetMountVoltagePreferencesFn = getSessionRuntimeFunction('resetMountVoltagePreferences');
              if (resetMountVoltagePreferencesFn) {
                resetMountVoltagePreferencesFn({
                  persist: true,
                  triggerUpdate: true
                });
              } else {
                warnMissingMountVoltageHelper('resetMountVoltagePreferences');
              }
              updateMountVoltageInputsFromStateFn = getSessionRuntimeFunction('updateMountVoltageInputsFromState');
              if (updateMountVoltageInputsFromStateFn) {
                updateMountVoltageInputsFromStateFn();
              } else {
                warnMissingMountVoltageHelper('updateMountVoltageInputsFromState');
              }
              rememberSettingsMountVoltagesBaseline();
            } catch (voltageResetError) {
              console.warn('Failed to reset mount voltages during factory reset', voltageResetError);
            }
            try {
              fontSize = '16';
              applyFontSizeSafe(fontSize);
              if (settingsFontSize) {
                settingsFontSize.value = fontSize;
              }
            } catch (fontSizeError) {
              console.warn('Failed to reset font size during factory reset', fontSizeError);
            }
            try {
              fontFamily = "'Ubuntu', sans-serif";
              applyFontFamilySafe(fontFamily);
              if (settingsFontFamily) {
                settingsFontFamily.value = fontFamily;
              }
            } catch (fontFamilyError) {
              console.warn('Failed to reset font family during factory reset', fontFamilyError);
            }
            if (settingsDialog) {
              settingsDialog.setAttribute('hidden', '');
            }
            successMsg = langTexts.factoryResetSuccess || 'Backup downloaded. All planner data cleared. Reloading…';
            showNotification('success', successMsg);
            setTimeout(function () {
              if (typeof window !== 'undefined' && window.location && window.location.reload) {
                window.location.reload();
              }
            }, 600);
          } catch (error) {
            console.error('Factory reset failed', error);
            factoryResetInProgress = false;
            if (typeof globalThis !== 'undefined') {
              try {
                delete globalThis.__cameraPowerPlannerFactoryResetting;
              } catch (cleanupError) {
                console.warn('Unable to clear factory reset flag from global scope', cleanupError);
              }
            }
            _errorMsg2 = langTexts.factoryResetError || 'Factory reset failed. Please try again.';
            showNotification('error', _errorMsg2);
          }
        case 20:
          return _context.a(2);
      }
    }, _callee, null, [[10, 12], [5, 7]]);
  })));
}
var UI_CACHE_STORAGE_KEYS_FOR_RELOAD = ['cameraPowerPlanner_schemaCache', 'cinePowerPlanner_schemaCache'];
var UI_CACHE_STORAGE_SUFFIXES_FOR_RELOAD = ['', '__backup', '__legacyMigrationBackup'];
var uiCacheFallbackWarningKeys = new Set();
function collectFallbackUiCacheStorages() {
  var storages = new Set();
  var registerStorage = function registerStorage(candidate, label) {
    if (!candidate || _typeof(candidate) !== 'object' && typeof candidate !== 'function') {
      return;
    }
    var hasRemove = typeof candidate.removeItem === 'function';
    var hasDelete = typeof candidate.delete === 'function';
    if (!hasRemove && !hasDelete) {
      return;
    }
    storages.add(candidate);
  };
  var _inspectScope = function inspectScope(scope, label) {
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      return;
    }
    try {
      registerStorage(scope.SAFE_LOCAL_STORAGE, "".concat(label, ".SAFE_LOCAL_STORAGE"));
    } catch (error) {
      if (!uiCacheFallbackWarningKeys.has("".concat(label, ".SAFE_LOCAL_STORAGE"))) {
        uiCacheFallbackWarningKeys.add("".concat(label, ".SAFE_LOCAL_STORAGE"));
        console.warn("Unable to inspect ".concat(label, ".SAFE_LOCAL_STORAGE while clearing UI caches"), error);
      }
    }
    try {
      registerStorage(scope.localStorage, "".concat(label, ".localStorage"));
    } catch (error) {
      if (!uiCacheFallbackWarningKeys.has("".concat(label, ".localStorage"))) {
        uiCacheFallbackWarningKeys.add("".concat(label, ".localStorage"));
        console.warn("Unable to inspect ".concat(label, ".localStorage while clearing UI caches"), error);
      }
    }
    try {
      registerStorage(scope.sessionStorage, "".concat(label, ".sessionStorage"));
    } catch (error) {
      if (!uiCacheFallbackWarningKeys.has("".concat(label, ".sessionStorage"))) {
        uiCacheFallbackWarningKeys.add("".concat(label, ".sessionStorage"));
        console.warn("Unable to inspect ".concat(label, ".sessionStorage while clearing UI caches"), error);
      }
    }
    var nested = null;
    try {
      nested = scope.__cineGlobal;
    } catch (error) {
      if (!uiCacheFallbackWarningKeys.has("".concat(label, ".__cineGlobal"))) {
        uiCacheFallbackWarningKeys.add("".concat(label, ".__cineGlobal"));
        console.warn("Unable to inspect ".concat(label, ".__cineGlobal while clearing UI caches"), error);
      }
    }
    if (nested && nested !== scope) {
      _inspectScope(nested, "".concat(label, ".__cineGlobal"));
    }
  };
  registerStorage(resolveSafeLocalStorage(), 'safeLocalStorage');
  if (typeof SAFE_LOCAL_STORAGE !== 'undefined') {
    try {
      registerStorage(SAFE_LOCAL_STORAGE, 'SAFE_LOCAL_STORAGE');
    } catch (error) {
      if (!uiCacheFallbackWarningKeys.has('SAFE_LOCAL_STORAGE')) {
        uiCacheFallbackWarningKeys.add('SAFE_LOCAL_STORAGE');
        console.warn('Unable to inspect SAFE_LOCAL_STORAGE while clearing UI caches', error);
      }
    }
  }
  var scopeCandidates = [{
    scope: typeof globalThis !== 'undefined' ? globalThis : null,
    label: 'globalThis'
  }, {
    scope: typeof window !== 'undefined' ? window : null,
    label: 'window'
  }, {
    scope: typeof self !== 'undefined' ? self : null,
    label: 'self'
  }, {
    scope: typeof global !== 'undefined' ? global : null,
    label: 'global'
  }];
  if (typeof __cineGlobal !== 'undefined') {
    scopeCandidates.push({
      scope: __cineGlobal,
      label: '__cineGlobal'
    });
  }
  scopeCandidates.forEach(function (_ref16) {
    var scope = _ref16.scope,
      label = _ref16.label;
    _inspectScope(scope, label);
  });
  if (typeof localStorage !== 'undefined') {
    registerStorage(localStorage, 'localStorage');
  }
  if (typeof sessionStorage !== 'undefined') {
    registerStorage(sessionStorage, 'sessionStorage');
  }
  return storages;
}
function clearUiCacheEntriesFallback() {
  var storages = collectFallbackUiCacheStorages();
  if (!storages || !storages.size) {
    return;
  }
  storages.forEach(function (storage) {
    UI_CACHE_STORAGE_KEYS_FOR_RELOAD.forEach(function (baseKey) {
      if (typeof baseKey !== 'string' || !baseKey) {
        return;
      }
      UI_CACHE_STORAGE_SUFFIXES_FOR_RELOAD.forEach(function (suffix) {
        var entryKey = suffix ? "".concat(baseKey).concat(suffix) : baseKey;
        try {
          if (typeof storage.removeItem === 'function') {
            storage.removeItem(entryKey);
          } else if (typeof storage.delete === 'function') {
            storage.delete(entryKey);
          }
        } catch (error) {
          console.warn('Failed to remove UI cache entry', entryKey, error);
        }
      });
    });
  });
}
var CACHE_KEY_TOKENS_FOR_RELOAD = ['cine-power-planner', 'cinepowerplanner'];
function resolveCineCacheNameForReload() {
  var scopes = [typeof globalThis !== 'undefined' ? globalThis : null, typeof window !== 'undefined' ? window : null, typeof self !== 'undefined' ? self : null, typeof global !== 'undefined' ? global : null];
  for (var _index13 = 0; _index13 < scopes.length; _index13 += 1) {
    var _scope3 = scopes[_index13];
    if (!_scope3 || _typeof(_scope3) !== 'object' && typeof _scope3 !== 'function') {
      continue;
    }
    try {
      var name = _scope3.CINE_CACHE_NAME;
      if (typeof name === 'string' && name) {
        return name;
      }
    } catch (error) {
      void error;
    }
  }
  return '';
}
function isRelevantCacheKeyForReload(key, explicitName, lowerExplicit) {
  if (typeof key !== 'string' || !key) {
    return false;
  }
  if (explicitName && (key === explicitName || key.toLowerCase() === lowerExplicit)) {
    return true;
  }
  var lowerKey = key.toLowerCase();
  for (var _index14 = 0; _index14 < CACHE_KEY_TOKENS_FOR_RELOAD.length; _index14 += 1) {
    if (lowerKey.includes(CACHE_KEY_TOKENS_FOR_RELOAD[_index14])) {
      return true;
    }
  }
  return false;
}
function readLocationHrefSafe(locationLike) {
  if (!locationLike || _typeof(locationLike) !== 'object') {
    return '';
  }
  try {
    var href = locationLike.href;
    return typeof href === 'string' ? href : '';
  } catch (error) {
    void error;
    return '';
  }
}
function readLocationPathnameSafe(locationLike) {
  if (!locationLike || _typeof(locationLike) !== 'object') {
    return '';
  }
  try {
    var pathname = locationLike.pathname;
    return typeof pathname === 'string' ? pathname : '';
  } catch (error) {
    void error;
    return '';
  }
}
function readLocationOriginSafe(locationLike) {
  if (!locationLike || _typeof(locationLike) !== 'object') {
    return '';
  }
  try {
    var origin = locationLike.origin;
    if (typeof origin === 'string' && origin) {
      return origin;
    }
  } catch (error) {
    void error;
  }
  var href = readLocationHrefSafe(locationLike);
  if (!href) {
    return '';
  }
  if (typeof URL === 'function') {
    try {
      return new URL(href).origin;
    } catch (originError) {
      void originError;
    }
  }
  var originMatch = href.match(/^([a-zA-Z][a-zA-Z\d+.-]*:\/\/[^/]+)/);
  return originMatch && originMatch[1] ? originMatch[1] : '';
}
function getForceReloadBaseCandidates(locationLike, originalHref) {
  var candidates = [];
  var unique = new Set();
  var addCandidate = function addCandidate(value) {
    if (typeof value !== 'string') {
      return;
    }
    var trimmed = value.trim();
    if (!trimmed || unique.has(trimmed)) {
      return;
    }
    unique.add(trimmed);
    candidates.push(trimmed);
  };
  var safeHref = readLocationHrefSafe(locationLike);
  if (safeHref) {
    addCandidate(safeHref);
  }
  if (typeof originalHref === 'string' && originalHref) {
    addCandidate(originalHref);
  }
  var origin = readLocationOriginSafe(locationLike);
  var pathname = readLocationPathnameSafe(locationLike);
  if (origin) {
    if (pathname) {
      addCandidate("".concat(origin).concat(pathname));
    }
    addCandidate("".concat(origin, "/"));
  }
  if (typeof window !== 'undefined' && window && window.location) {
    var windowHref = readLocationHrefSafe(window.location);
    if (windowHref) {
      addCandidate(windowHref);
    }
  }
  return candidates;
}
function normaliseForceReloadHref(value, baseHref) {
  if (typeof value !== 'string') {
    return '';
  }
  var trimmed = value.trim();
  if (!trimmed) {
    return '';
  }
  if (typeof URL === 'function') {
    try {
      return new URL(trimmed).toString();
    } catch (primaryError) {
      void primaryError;
      if (typeof baseHref === 'string' && baseHref) {
        try {
          return new URL(trimmed, baseHref).toString();
        } catch (secondaryError) {
          void secondaryError;
        }
      }
    }
  }
  return trimmed;
}
function buildForceReloadHref(locationLike, paramName) {
  var param = typeof paramName === 'string' && paramName ? paramName : 'forceReload';
  var timestamp = Date.now().toString(36);
  var originalHref = readLocationHrefSafe(locationLike);
  var baseCandidates = getForceReloadBaseCandidates(locationLike, originalHref);
  if (!originalHref) {
    return {
      originalHref: originalHref,
      nextHref: originalHref,
      param: param,
      timestamp: timestamp
    };
  }
  if (typeof URL === 'function') {
    var urlCandidates = [originalHref].concat(_toConsumableArray(baseCandidates));
    for (var _index15 = 0; _index15 < urlCandidates.length; _index15 += 1) {
      var candidate = urlCandidates[_index15];
      try {
        var url = _index15 === 0 ? new URL(candidate) : new URL(originalHref, candidate);
        url.searchParams.set(param, timestamp);
        return {
          originalHref: originalHref,
          nextHref: url.toString(),
          param: param,
          timestamp: timestamp
        };
      } catch (candidateError) {
        void candidateError;
      }
    }
  }
  var href = originalHref;
  var hash = '';
  var hashIndex = href.indexOf('#');
  if (hashIndex !== -1) {
    hash = href.slice(hashIndex);
    href = href.slice(0, hashIndex);
  }
  var pattern = new RegExp("([?&])".concat(param, "=[^&]*"));
  var replacement = "$1".concat(param, "=").concat(timestamp);
  if (pattern.test(href)) {
    href = href.replace(pattern, replacement);
  } else if (href.indexOf('?') !== -1) {
    href += "&".concat(param, "=").concat(timestamp);
  } else if (href) {
    href += "?".concat(param, "=").concat(timestamp);
  }
  if (typeof URL === 'function') {
    for (var _index16 = 0; _index16 < baseCandidates.length; _index16 += 1) {
      var _candidate = baseCandidates[_index16];
      try {
        var absolute = new URL(href + hash, _candidate).toString();
        return {
          originalHref: originalHref,
          nextHref: absolute,
          param: param,
          timestamp: timestamp
        };
      } catch (absoluteError) {
        void absoluteError;
      }
    }
  }
  return {
    originalHref: originalHref,
    nextHref: href ? href + hash : originalHref,
    param: param,
    timestamp: timestamp
  };
}
function waitForReloadNavigation(beforeHref) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (typeof window === 'undefined' || !window) {
    return Promise.resolve(false);
  }
  var win = window;
  var startHref = typeof beforeHref === 'string' ? beforeHref : '';
  var timeout = options && typeof options.timeout === 'number' && options.timeout > 0 ? options.timeout : 1500;
  var pollInterval = options && typeof options.interval === 'number' && options.interval > 0 ? options.interval : 60;
  var schedule = typeof win.setTimeout === 'function' ? win.setTimeout.bind(win) : setTimeout;
  var cancel = typeof win.clearTimeout === 'function' ? win.clearTimeout.bind(win) : clearTimeout;
  return new Promise(function (resolve) {
    var resolved = false;
    var pollTimer = null;
    var timeoutTimer = null;
    var cleanup = function cleanup() {
      if (pollTimer) {
        try {
          cancel(pollTimer);
        } catch (cancelError) {
          void cancelError;
        }
        pollTimer = null;
      }
      if (timeoutTimer) {
        try {
          cancel(timeoutTimer);
        } catch (timeoutCancelError) {
          void timeoutCancelError;
        }
        timeoutTimer = null;
      }
      if (typeof win.removeEventListener === 'function') {
        try {
          win.removeEventListener('beforeunload', handleUnload, true);
        } catch (removeBeforeUnloadError) {
          void removeBeforeUnloadError;
        }
        try {
          win.removeEventListener('pagehide', handleUnload, true);
        } catch (removePagehideError) {
          void removePagehideError;
        }
        try {
          win.removeEventListener('unload', handleUnload, true);
        } catch (removeUnloadError) {
          void removeUnloadError;
        }
      }
    };
    var finish = function finish(value) {
      if (resolved) {
        return;
      }
      resolved = true;
      cleanup();
      resolve(value);
    };
    var handleUnload = function handleUnload() {
      finish(true);
    };
    var _evaluate = function evaluate() {
      if (resolved) {
        return;
      }
      try {
        var currentHref = readLocationHrefSafe(win.location);
        if (startHref && currentHref && currentHref !== startHref) {
          finish(true);
          return;
        }
      } catch (readError) {
        void readError;
      }
      pollTimer = schedule(_evaluate, pollInterval);
    };
    if (typeof win.addEventListener === 'function') {
      try {
        win.addEventListener('beforeunload', handleUnload, true);
      } catch (beforeUnloadError) {
        void beforeUnloadError;
      }
      try {
        win.addEventListener('pagehide', handleUnload, true);
      } catch (pageHideError) {
        void pageHideError;
      }
      try {
        win.addEventListener('unload', handleUnload, true);
      } catch (unloadError) {
        void unloadError;
      }
    }
    _evaluate();
    timeoutTimer = schedule(function () {
      finish(false);
    }, timeout);
  });
}
function scheduleForceReloadNavigationWarning(locationLike, baseHref, description, before, expected, initialAfter) {
  var schedule = null;
  try {
    if (typeof window !== 'undefined' && window && typeof window.setTimeout === 'function') {
      schedule = window.setTimeout.bind(window);
    }
  } catch (error) {
    void error;
  }
  if (!schedule) {
    if (typeof setTimeout === 'function') {
      schedule = setTimeout;
    } else {
      console.warn('Forced reload navigation attempt did not update location', {
        description: description,
        before: before,
        after: initialAfter,
        expected: expected
      });
      return;
    }
  }
  var resolved = false;
  var evaluate = function evaluate() {
    var currentRaw = readLocationHrefSafe(locationLike);
    var current = normaliseForceReloadHref(currentRaw, baseHref);
    if (expected && (current === expected || current === "".concat(expected, "#")) || before !== current && current && (!expected || current === expected)) {
      resolved = true;
      return {
        matched: true,
        value: current
      };
    }
    return {
      matched: false,
      value: current
    };
  };
  var verifyDelays = [90, 240, 480];
  verifyDelays.forEach(function (delay, index) {
    var isFinalCheck = index === verifyDelays.length - 1;
    var runCheck = function runCheck() {
      if (resolved) {
        return;
      }
      var result = evaluate();
      if (result.matched) {
        return;
      }
      if (isFinalCheck) {
        resolved = true;
        console.warn('Forced reload navigation attempt did not update location', {
          description: description,
          before: before,
          after: result.value,
          expected: expected
        });
      }
    };
    try {
      schedule(runCheck, delay);
    } catch (scheduleError) {
      void scheduleError;
      if (isFinalCheck) {
        runCheck();
      }
    }
  });
}
function attemptForceReloadNavigation(locationLike, nextHref, baseHref, applyFn, description) {
  if (!locationLike || typeof applyFn !== 'function' || typeof nextHref !== 'string' || !nextHref) {
    return false;
  }
  var beforeRaw = readLocationHrefSafe(locationLike);
  var before = normaliseForceReloadHref(beforeRaw, baseHref);
  try {
    applyFn(nextHref);
  } catch (error) {
    console.warn('Forced reload navigation helper failed', {
      description: description,
      error: error
    });
    return false;
  }
  var afterRaw = readLocationHrefSafe(locationLike);
  var after = normaliseForceReloadHref(afterRaw, baseHref);
  var expected = normaliseForceReloadHref(nextHref, baseHref);
  if (expected && (after === expected || after === "".concat(expected, "#")) || before !== after && after && (!expected || after === expected)) {
    return true;
  }
  scheduleForceReloadNavigationWarning(locationLike, baseHref, description, before, expected, after);
  return false;
}
function attemptForceReloadHistoryFallback(win, locationLike, nextHref, baseHref) {
  if (!win || !locationLike || typeof nextHref !== 'string' || !nextHref) {
    return false;
  }
  var historyLike = null;
  try {
    historyLike = win.history || null;
  } catch (error) {
    console.warn('Forced reload history access failed', error);
    historyLike = null;
  }
  if (!historyLike || typeof historyLike.replaceState !== 'function') {
    return false;
  }
  var beforeRaw = readLocationHrefSafe(locationLike);
  var before = normaliseForceReloadHref(beforeRaw, baseHref);
  var expected = normaliseForceReloadHref(nextHref, baseHref);
  var replaceUrl = nextHref;
  try {
    var reference = beforeRaw || baseHref || undefined;
    var parsed = typeof URL === 'function' ? new URL(nextHref, reference) : null;
    if (parsed) {
      replaceUrl = "".concat(parsed.pathname || '').concat(parsed.search || '').concat(parsed.hash || '') || parsed.toString();
    }
  } catch (error) {
    console.warn('Forced reload history fallback URL parse failed', error);
    replaceUrl = nextHref;
  }
  var stateSnapshot = null;
  var hasStateSnapshot = false;
  try {
    stateSnapshot = historyLike.state;
    hasStateSnapshot = true;
  } catch (stateError) {
    console.warn('Forced reload history state snapshot failed', stateError);
  }
  try {
    historyLike.replaceState(hasStateSnapshot ? stateSnapshot : null, '', replaceUrl);
  } catch (replaceError) {
    console.warn('Forced reload history replaceState failed', replaceError);
    return false;
  }
  var afterRaw = readLocationHrefSafe(locationLike);
  var after = normaliseForceReloadHref(afterRaw, baseHref);
  var updated = expected && (after === expected || after === "".concat(expected, "#")) || before !== after && after && (!expected || after === expected);
  if (!updated) {
    scheduleForceReloadNavigationWarning(locationLike, baseHref, 'history.replaceState', before, expected, after);
    return false;
  }
  if (typeof locationLike.reload === 'function') {
    try {
      locationLike.reload();
      return true;
    } catch (reloadError) {
      console.warn('Forced reload via history replaceState reload failed', reloadError);
    }
  }
  return true;
}
function scheduleForceReloadFallbacks(win, locationLike) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (!win || !locationLike) {
    return;
  }
  var schedule = null;
  try {
    if (typeof win.setTimeout === 'function') {
      schedule = win.setTimeout.bind(win);
    }
  } catch (error) {
    void error;
  }
  if (!schedule) {
    if (typeof setTimeout === 'function') {
      schedule = setTimeout;
    } else {
      return;
    }
  }
  var hasReload = options.hasReload === true && typeof locationLike.reload === 'function';
  var baseHref = typeof options.baseHref === 'string' ? options.baseHref : '';
  var nextHref = typeof options.nextHref === 'string' ? options.nextHref : '';
  var originalHref = typeof options.originalHref === 'string' ? options.originalHref : '';
  var fallbackHref = nextHref || baseHref || originalHref || '';
  var hashBase = fallbackHref ? fallbackHref.split('#')[0] : baseHref || originalHref || '';
  var fallbackToken = typeof options.timestamp === 'string' && options.timestamp ? options.timestamp : Date.now().toString(36);
  var hashFallback = hashBase ? "".concat(hashBase, "#forceReload-").concat(fallbackToken) : '';
  var steps = [];
  var nextDelay = 120;
  var delayIncrement = 120;
  var queueStep = function queueStep(run) {
    steps.push({
      delay: nextDelay,
      run: run
    });
    nextDelay += delayIncrement;
  };
  if (fallbackHref) {
    if (typeof locationLike.assign === 'function') {
      queueStep(function () {
        try {
          locationLike.assign(fallbackHref);
        } catch (error) {
          console.warn('Forced reload fallback via location.assign failed', error);
        }
      });
    }
    if (typeof locationLike.replace === 'function') {
      queueStep(function () {
        try {
          locationLike.replace(fallbackHref);
        } catch (error) {
          console.warn('Forced reload fallback via location.replace failed', error);
        }
      });
    }
    queueStep(function () {
      try {
        locationLike.href = fallbackHref;
      } catch (error) {
        console.warn('Forced reload fallback via href assignment failed', error);
      }
    });
  }
  if (hashFallback && hashFallback !== fallbackHref) {
    queueStep(function () {
      try {
        locationLike.href = hashFallback;
      } catch (error) {
        console.warn('Forced reload fallback via hash injection failed', error);
      }
    });
  }
  if (hasReload) {
    var reloadDelay = steps.length ? Math.max(nextDelay, 280) : 280;
    steps.push({
      delay: reloadDelay,
      run: function run() {
        try {
          locationLike.reload();
        } catch (error) {
          console.warn('Timed force reload fallback failed', error);
        }
      }
    });
  }
  if (!steps.length) {
    return;
  }
  steps.forEach(function (step) {
    try {
      schedule(step.run, step.delay);
    } catch (scheduleError) {
      console.warn('Unable to schedule forced reload fallback', scheduleError);
    }
  });
}
function prepareForceReloadContext(win) {
  if (!win || !win.location) {
    return null;
  }
  var location = win.location;
  var hasReplace = typeof location.replace === 'function';
  var hasAssign = typeof location.assign === 'function';
  var hasReload = typeof location.reload === 'function';
  var forceReloadUrl = buildForceReloadHref(location, 'forceReload');
  var originalHref = forceReloadUrl.originalHref,
    nextHref = forceReloadUrl.nextHref,
    timestamp = forceReloadUrl.timestamp;
  var baseHref = normaliseForceReloadHref(originalHref, originalHref) || originalHref;
  return {
    win: win,
    location: location,
    hasReplace: hasReplace,
    hasAssign: hasAssign,
    hasReload: hasReload,
    originalHref: originalHref,
    nextHref: nextHref,
    timestamp: timestamp,
    baseHref: baseHref
  };
}
function executeForceReloadContext(context) {
  if (!context || !context.location) {
    return false;
  }
  var win = context.win,
    location = context.location,
    hasReplace = context.hasReplace,
    hasAssign = context.hasAssign,
    hasReload = context.hasReload,
    originalHref = context.originalHref,
    nextHref = context.nextHref,
    timestamp = context.timestamp,
    baseHref = context.baseHref;
  var navigationTriggered = false;
  if (hasReplace && nextHref) {
    navigationTriggered = attemptForceReloadNavigation(location, nextHref, baseHref, function (url) {
      return location.replace(url);
    }, 'location.replace');
  }
  if (!navigationTriggered && hasAssign && nextHref) {
    navigationTriggered = attemptForceReloadNavigation(location, nextHref, baseHref, function (url) {
      return location.assign(url);
    }, 'location.assign');
  }
  if (!navigationTriggered && nextHref && nextHref !== originalHref) {
    navigationTriggered = attemptForceReloadNavigation(location, nextHref, baseHref, function (url) {
      location.href = url;
    }, 'location.href assignment');
  }
  if (!navigationTriggered && win && nextHref) {
    navigationTriggered = attemptForceReloadHistoryFallback(win, location, nextHref, baseHref);
  }
  var canOnlyReload = !nextHref || nextHref === originalHref;
  if (!navigationTriggered && canOnlyReload && hasReload) {
    try {
      location.reload();
      navigationTriggered = true;
    } catch (reloadError) {
      console.warn('Forced reload via location.reload failed', reloadError);
    }
  }
  if (!navigationTriggered) {
    scheduleForceReloadFallbacks(win, location, {
      originalHref: originalHref,
      baseHref: baseHref,
      nextHref: nextHref,
      hasReload: hasReload,
      timestamp: timestamp
    });
  }
  return navigationTriggered;
}
function tryForceReload(win) {
  var context = prepareForceReloadContext(win);
  if (!context) {
    return false;
  }
  return executeForceReloadContext(context);
}
function createReloadFallback(win) {
  var delayMs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4500;
  if (!win) {
    return null;
  }
  var schedule = null;
  var cancel = null;
  try {
    if (typeof win.setTimeout === 'function') {
      schedule = win.setTimeout.bind(win);
    }
  } catch (scheduleError) {
    void scheduleError;
  }
  try {
    if (typeof win.clearTimeout === 'function') {
      cancel = win.clearTimeout.bind(win);
    }
  } catch (cancelError) {
    void cancelError;
  }
  if (!schedule) {
    if (typeof setTimeout === 'function') {
      schedule = setTimeout;
    } else {
      return {
        triggerNow: function triggerNow() {
          tryForceReload(win);
        }
      };
    }
  }
  if (!cancel) {
    cancel = typeof clearTimeout === 'function' ? clearTimeout : null;
  }
  var executed = false;
  var timerId = null;
  var run = function run() {
    if (executed) {
      return;
    }
    executed = true;
    timerId = null;
    try {
      if (!tryForceReload(win) && win && win.location && typeof win.location.reload === 'function') {
        win.location.reload();
      }
    } catch (error) {
      console.warn('Force reload fallback execution failed', error);
      try {
        if (win && win.location && typeof win.location.reload === 'function') {
          win.location.reload();
        }
      } catch (reloadError) {
        console.warn('Ultimate force reload fallback failed', reloadError);
      }
    }
  };
  try {
    timerId = schedule(run, delayMs);
  } catch (scheduleError) {
    console.warn('Unable to schedule reload fallback timer', scheduleError);
    run();
  }
  return {
    triggerNow: function triggerNow() {
      if (executed) {
        return;
      }
      if (timerId != null && typeof cancel === 'function') {
        try {
          cancel(timerId);
        } catch (cancelError) {
          void cancelError;
        }
      }
      run();
    }
  };
}
// Slower machines routinely need ~4s to finish the offline module's reload gate.
// Give it extra headroom so we do not fall back to the manual cache purge unless
// the service worker truly stalled.
var OFFLINE_RELOAD_TIMEOUT_MS = 5000;
var FORCE_RELOAD_CLEANUP_TIMEOUT_MS = 700;
function awaitPromiseWithSoftTimeout(promise, timeoutMs, onTimeout, onLateRejection) {
  if (!promise || typeof promise.then !== 'function') {
    return Promise.resolve({
      timedOut: false,
      result: promise
    });
  }
  var ms = typeof timeoutMs === 'number' && timeoutMs >= 0 ? timeoutMs : null;
  var schedule = typeof setTimeout === 'function' ? setTimeout : null;
  var cancel = typeof clearTimeout === 'function' ? clearTimeout : null;
  if (ms === null || !schedule) {
    return promise.then(function (result) {
      return {
        timedOut: false,
        result: result
      };
    });
  }
  var finished = false;
  var timerId = null;
  return new Promise(function (resolve, reject) {
    promise.then(function (value) {
      if (finished) {
        return value;
      }
      finished = true;
      if (timerId != null && cancel) {
        try {
          cancel(timerId);
        } catch (cancelError) {
          void cancelError;
        }
      }
      resolve({
        timedOut: false,
        result: value
      });
      return value;
    }, function (error) {
      if (finished) {
        if (typeof onLateRejection === 'function') {
          try {
            onLateRejection(error);
          } catch (lateError) {
            void lateError;
          }
        }
        return null;
      }
      finished = true;
      if (timerId != null && cancel) {
        try {
          cancel(timerId);
        } catch (cancelError) {
          void cancelError;
        }
      }
      reject(error);
      return null;
    });
    timerId = schedule(function () {
      if (finished) {
        return;
      }
      finished = true;
      if (typeof onTimeout === 'function') {
        try {
          onTimeout();
        } catch (timeoutError) {
          void timeoutError;
        }
      }
      resolve({
        timedOut: true,
        result: undefined
      });
    }, ms);
  });
}
function observeServiceWorkerControllerChangeForSession(navigatorLike) {
  var nav = navigatorLike && _typeof(navigatorLike) === 'object' ? navigatorLike : null;
  if (!nav || !nav.serviceWorker) {
    return null;
  }
  var serviceWorker = nav.serviceWorker;
  if (!serviceWorker) {
    return null;
  }
  var resolved = false;
  var detach = null;
  var resolver = null;
  var attached = false;
  var finalize = function finalize(value) {
    if (resolved) {
      return;
    }
    resolved = true;
    var currentResolver = resolver;
    resolver = null;
    if (typeof detach === 'function') {
      try {
        detach();
      } catch (error) {
        void error;
      }
      detach = null;
    }
    if (typeof currentResolver === 'function') {
      try {
        currentResolver(value);
      } catch (resolveError) {
        void resolveError;
      }
    }
  };
  var promise = new Promise(function (resolve) {
    resolver = resolve;
    if (serviceWorker.controller) {
      finalize(true);
      return;
    }
    var handler = function handler() {
      finalize(true);
    };
    try {
      if (typeof serviceWorker.addEventListener === 'function') {
        serviceWorker.addEventListener('controllerchange', handler);
        detach = function detach() {
          try {
            serviceWorker.removeEventListener('controllerchange', handler);
          } catch (removeError) {
            void removeError;
          }
        };
        attached = true;
      } else if ('oncontrollerchange' in serviceWorker) {
        var previous = serviceWorker.oncontrollerchange;
        serviceWorker.oncontrollerchange = function controllerchangeProxy(event) {
          if (typeof previous === 'function') {
            try {
              previous.call(this, event);
            } catch (previousError) {
              console.warn('Existing service worker controllerchange handler failed', previousError);
            }
          }
          handler(event);
        };
        detach = function detach() {
          try {
            serviceWorker.oncontrollerchange = previous;
          } catch (restoreError) {
            void restoreError;
          }
        };
        attached = true;
      } else {
        finalize(false);
      }
    } catch (error) {
      console.warn('Failed to observe service worker controllerchange', error);
      finalize(false);
    }
  });
  if (!attached && !serviceWorker.controller) {
    finalize(false);
    return null;
  }
  return {
    promise: promise,
    cancel: function cancel() {
      finalize(false);
    }
  };
}
function collectServiceWorkerRegistrationsForReload(_x4) {
  return _collectServiceWorkerRegistrationsForReload.apply(this, arguments);
}
function _collectServiceWorkerRegistrationsForReload() {
  _collectServiceWorkerRegistrationsForReload = _asyncToGenerator(_regenerator().m(function _callee4(serviceWorker) {
    var registrations, pushRegistration, regs, reg, readyReg, _t6, _t7;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          if (serviceWorker) {
            _context4.n = 1;
            break;
          }
          return _context4.a(2, []);
        case 1:
          registrations = [];
          pushRegistration = function pushRegistration(registration) {
            if (registration) {
              registrations.push(registration);
            }
          };
          _context4.p = 2;
          if (!(typeof serviceWorker.getRegistrations === 'function')) {
            _context4.n = 4;
            break;
          }
          _context4.n = 3;
          return serviceWorker.getRegistrations();
        case 3:
          regs = _context4.v;
          if (Array.isArray(regs)) {
            regs.forEach(pushRegistration);
          }
          _context4.n = 10;
          break;
        case 4:
          if (!(typeof serviceWorker.getRegistration === 'function')) {
            _context4.n = 6;
            break;
          }
          _context4.n = 5;
          return serviceWorker.getRegistration();
        case 5:
          reg = _context4.v;
          pushRegistration(reg);
          _context4.n = 10;
          break;
        case 6:
          if (!(serviceWorker.ready && typeof serviceWorker.ready.then === 'function')) {
            _context4.n = 10;
            break;
          }
          _context4.p = 7;
          _context4.n = 8;
          return serviceWorker.ready;
        case 8:
          readyReg = _context4.v;
          pushRegistration(readyReg);
          _context4.n = 10;
          break;
        case 9:
          _context4.p = 9;
          _t6 = _context4.v;
          console.warn('Failed to await active service worker', _t6);
        case 10:
          _context4.n = 12;
          break;
        case 11:
          _context4.p = 11;
          _t7 = _context4.v;
          console.warn('Failed to query service worker registrations', _t7);
        case 12:
          return _context4.a(2, registrations);
      }
    }, _callee4, null, [[7, 9], [2, 11]]);
  }));
  return _collectServiceWorkerRegistrationsForReload.apply(this, arguments);
}
function clearCachesAndReload() {
  return _clearCachesAndReload.apply(this, arguments);
}
function _clearCachesAndReload() {
  _clearCachesAndReload = _asyncToGenerator(_regenerator().m(function _callee7() {
    var sessionNavigator, reloadFallback, offlineModule, beforeReloadHref, sessionCaches, serviceWorkerLike, serviceWorkerRegistrationsPromise, reloadAttempt, _yield$awaitPromiseWi, timedOut, result, reloadHandled, navigationObserved, uiCacheCleared, serviceWorkerCleanupPromise, cacheCleanupPromise, controllerChangeWatcher, serviceWorkerGatePromise, win, _t0, _t1, _t10;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.p = _context7.n) {
        case 0:
          sessionNavigator = typeof navigator !== 'undefined' ? navigator : undefined;
          if (!isNavigatorExplicitlyOffline(sessionNavigator)) {
            _context7.n = 1;
            break;
          }
          announceForceReloadOfflineNotice();
          return _context7.a(2, {
            blocked: true,
            reason: 'offline'
          });
        case 1:
          try {
            flushProjectAutoSaveOnExit({
              reason: 'before-manual-reload'
            });
          } catch (flushError) {
            console.warn('Failed to flush auto save before manual reload', flushError);
          }
          reloadFallback = typeof window !== 'undefined' && window ? createReloadFallback(window) : null;
          offlineModule = typeof globalThis !== 'undefined' && globalThis && globalThis.cineOffline || typeof window !== 'undefined' && window && window.cineOffline || null;
          beforeReloadHref = typeof window !== 'undefined' && window && window.location ? readLocationHrefSafe(window.location) : '';
          sessionCaches = typeof caches !== 'undefined' ? caches : undefined;
          serviceWorkerLike = sessionNavigator && sessionNavigator.serviceWorker ? sessionNavigator.serviceWorker : null;
          serviceWorkerRegistrationsPromise = serviceWorkerLike ? collectServiceWorkerRegistrationsForReload(serviceWorkerLike) : Promise.resolve([]);
          if (!(offlineModule && typeof offlineModule.reloadApp === 'function')) {
            _context7.n = 7;
            break;
          }
          _context7.p = 2;
          reloadAttempt = offlineModule.reloadApp({
            window: window,
            navigator: sessionNavigator,
            caches: sessionCaches,
            onOfflineReloadBlocked: announceForceReloadOfflineNotice
          });
          _context7.n = 3;
          return awaitPromiseWithSoftTimeout(reloadAttempt, OFFLINE_RELOAD_TIMEOUT_MS, function () {
            console.warn('Offline module reload timed out; continuing with manual fallback after soft timeout.', {
              timeoutMs: OFFLINE_RELOAD_TIMEOUT_MS
            });
          }, function (lateError) {
            console.warn('Offline module reload promise rejected after timeout', lateError);
          });
        case 3:
          _yield$awaitPromiseWi = _context7.v;
          timedOut = _yield$awaitPromiseWi.timedOut;
          result = _yield$awaitPromiseWi.result;
          if (timedOut) {
            _context7.n = 5;
            break;
          }
          reloadHandled = result === true || result && _typeof(result) === 'object' && (result.reloadTriggered === true || result.navigationTriggered === true);
          if (!reloadHandled) {
            _context7.n = 5;
            break;
          }
          _context7.n = 4;
          return waitForReloadNavigation(beforeReloadHref).catch(function () {
            return false;
          });
        case 4:
          navigationObserved = _context7.v;
          if (!navigationObserved) {
            _context7.n = 5;
            break;
          }
          return _context7.a(2);
        case 5:
          _context7.n = 7;
          break;
        case 6:
          _context7.p = 6;
          _t0 = _context7.v;
          console.warn('Offline module reload failed, falling back to manual refresh', _t0);
        case 7:
          uiCacheCleared = false;
          try {
            if (typeof clearUiCacheStorageEntries === 'function') {
              clearUiCacheStorageEntries();
              uiCacheCleared = true;
            }
          } catch (uiCacheError) {
            console.warn('Failed to clear UI caches via storage helper', uiCacheError);
          }
          if (!uiCacheCleared) {
            try {
              clearUiCacheEntriesFallback();
              uiCacheCleared = true;
            } catch (fallbackError) {
              console.warn('Fallback UI cache clear failed', fallbackError);
            }
          }
          serviceWorkerCleanupPromise = Promise.resolve(false);
          cacheCleanupPromise = Promise.resolve(false);
          if (serviceWorkerLike) {
            serviceWorkerCleanupPromise = _asyncToGenerator(_regenerator().m(function _callee5() {
              var _registrations, _t8;
              return _regenerator().w(function (_context5) {
                while (1) switch (_context5.p = _context5.n) {
                  case 0:
                    _context5.p = 0;
                    _context5.n = 1;
                    return serviceWorkerRegistrationsPromise;
                  case 1:
                    _registrations = _context5.v;
                    if (_registrations.length) {
                      _context5.n = 2;
                      break;
                    }
                    return _context5.a(2, false);
                  case 2:
                    _context5.n = 3;
                    return Promise.all(_registrations.map(function (reg) {
                      if (!reg || typeof reg.unregister !== 'function') {
                        return Promise.resolve(false);
                      }
                      return reg.unregister().catch(function (unregisterError) {
                        console.warn('Service worker unregister failed', unregisterError);
                        return false;
                      });
                    }));
                  case 3:
                    return _context5.a(2, true);
                  case 4:
                    _context5.p = 4;
                    _t8 = _context5.v;
                    console.warn('Service worker cleanup failed', _t8);
                    return _context5.a(2, false);
                }
              }, _callee5, null, [[0, 4]]);
            }))();
          }
          if (sessionCaches && typeof sessionCaches.keys === 'function') {
            cacheCleanupPromise = _asyncToGenerator(_regenerator().m(function _callee6() {
              var keys, explicitName, lowerExplicit, relevantKeys, removedAny, _t9;
              return _regenerator().w(function (_context6) {
                while (1) switch (_context6.p = _context6.n) {
                  case 0:
                    _context6.p = 0;
                    _context6.n = 1;
                    return sessionCaches.keys();
                  case 1:
                    keys = _context6.v;
                    if (!(!Array.isArray(keys) || !keys.length)) {
                      _context6.n = 2;
                      break;
                    }
                    return _context6.a(2, false);
                  case 2:
                    explicitName = resolveCineCacheNameForReload();
                    lowerExplicit = explicitName ? explicitName.toLowerCase() : null;
                    relevantKeys = keys.filter(function (key) {
                      return isRelevantCacheKeyForReload(key, explicitName, lowerExplicit);
                    });
                    if (relevantKeys.length) {
                      _context6.n = 3;
                      break;
                    }
                    return _context6.a(2, false);
                  case 3:
                    removedAny = false;
                    _context6.n = 4;
                    return Promise.all(relevantKeys.map(function (key) {
                      if (!key || typeof sessionCaches.delete !== 'function') {
                        return Promise.resolve(false);
                      }
                      return sessionCaches.delete(key).then(function (result) {
                        removedAny = removedAny || !!result;
                        return result;
                      }).catch(function (cacheError) {
                        console.warn('Failed to delete cache', key, cacheError);
                        return false;
                      });
                    }));
                  case 4:
                    return _context6.a(2, removedAny);
                  case 5:
                    _context6.p = 5;
                    _t9 = _context6.v;
                    console.warn('Cache clear failed', _t9);
                    return _context6.a(2, false);
                }
              }, _callee6, null, [[0, 5]]);
            }))();
          }
          controllerChangeWatcher = null;
          serviceWorkerGatePromise = serviceWorkerCleanupPromise;
          if (sessionNavigator && sessionNavigator.serviceWorker) {
            controllerChangeWatcher = observeServiceWorkerControllerChangeForSession(sessionNavigator);
            if (controllerChangeWatcher && controllerChangeWatcher.promise && serviceWorkerCleanupPromise && typeof serviceWorkerCleanupPromise.then === 'function') {
              serviceWorkerGatePromise = Promise.race([serviceWorkerCleanupPromise, controllerChangeWatcher.promise]);
            }
          }
          _context7.p = 8;
          _context7.n = 9;
          return awaitPromiseWithSoftTimeout(serviceWorkerGatePromise, FORCE_RELOAD_CLEANUP_TIMEOUT_MS, function () {
            console.warn('Service worker cleanup timed out before reload; continuing anyway.', {
              timeoutMs: FORCE_RELOAD_CLEANUP_TIMEOUT_MS
            });
          }, function (lateError) {
            console.warn('Service worker cleanup failed after reload triggered', lateError);
          });
        case 9:
          _context7.n = 11;
          break;
        case 10:
          _context7.p = 10;
          _t1 = _context7.v;
          console.warn('Service worker cleanup failed', _t1);
        case 11:
          _context7.p = 11;
          if (controllerChangeWatcher && typeof controllerChangeWatcher.cancel === 'function') {
            try {
              controllerChangeWatcher.cancel();
            } catch (controllerCleanupError) {
              void controllerCleanupError;
            }
          }
          return _context7.f(11);
        case 12:
          try {
            if (reloadFallback && typeof reloadFallback.triggerNow === 'function') {
              reloadFallback.triggerNow();
            } else {
              win = typeof window !== 'undefined' ? window : null;
              if (!tryForceReload(win) && win && win.location && typeof win.location.reload === 'function') {
                win.location.reload();
              }
            }
          } catch (reloadError) {
            console.warn('Forced reload failed', reloadError);
            if (typeof window !== 'undefined' && window.location && typeof window.location.reload === 'function') {
              window.location.reload();
            }
          }
          _context7.p = 13;
          _context7.n = 14;
          return cacheCleanupPromise;
        case 14:
          _context7.n = 16;
          break;
        case 15:
          _context7.p = 15;
          _t10 = _context7.v;
          console.warn('Cache clear failed', _t10);
        case 16:
          return _context7.a(2);
      }
    }, _callee7, null, [[13, 15], [8, 10, 11, 12], [2, 6]]);
  }));
  return _clearCachesAndReload.apply(this, arguments);
}
if (reloadButton) {
  reloadButton.addEventListener("click", clearCachesAndReload);
}
function exportDiagramSvg() {
  if (!setupDiagramContainer) return '';
  var svgEl = setupDiagramContainer.querySelector('svg');
  if (!svgEl) return '';
  var clone = svgEl.cloneNode(true);
  var labels = svgEl.querySelectorAll('.edge-label');
  var cloneLabels = clone.querySelectorAll('.edge-label');
  labels.forEach(function (lbl, idx) {
    if (cloneLabels[idx]) {
      cloneLabels[idx].textContent = lbl.textContent;
    }
  });
  var style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
  style.textContent = getDiagramCss(false);
  clone.insertBefore(style, clone.firstChild);
  var serializer = new XMLSerializer();
  return serializer.serializeToString(clone);
}
function copyTextToClipboardBestEffort(text) {
  if (typeof text !== 'string' || !text) {
    return;
  }
  if (typeof navigator !== 'undefined' && navigator && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    navigator.clipboard.writeText(text).catch(function () {});
    return;
  }
  if (typeof document === 'undefined' || !document || !document.body || typeof document.createElement !== 'function') {
    return;
  }
  var textarea = null;
  var previousActiveElement = document.activeElement;
  try {
    textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    try {
      textarea.focus();
    } catch (_unused7) {}
    try {
      textarea.select();
      if (typeof textarea.setSelectionRange === 'function') {
        textarea.setSelectionRange(0, textarea.value.length);
      }
    } catch (_unused8) {}
    if (typeof document.execCommand === 'function') {
      try {
        document.execCommand('copy');
      } catch (_unused9) {}
    }
  } catch (_unused0) {} finally {
    if (textarea && textarea.parentNode) {
      textarea.parentNode.removeChild(textarea);
    }
    if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
      try {
        previousActiveElement.focus();
      } catch (_unused1) {}
    }
  }
}
if (downloadDiagramButton) {
  downloadDiagramButton.addEventListener('click', function (e) {
    var source = exportDiagramSvg();
    if (!source) return;
    copyTextToClipboardBestEffort(source);
    var pad = function pad(n) {
      return String(n).padStart(2, '0');
    };
    var now = new Date();
    var datePart = "".concat(now.getFullYear(), "-").concat(pad(now.getMonth() + 1), "-").concat(pad(now.getDate()), "_").concat(pad(now.getHours()), "-").concat(pad(now.getMinutes()));
    var namePart = (safeGetCurrentProjectName('setup') || 'setup').replace(/\s+/g, '-').replace(/[^a-z0-9-_]/gi, '');
    var baseName = "".concat(datePart, "_").concat(namePart, "_diagram");
    var saveSvg = function saveSvg() {
      var blob = new Blob([source], {
        type: 'image/svg+xml;charset=utf-8'
      });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = "".concat(baseName, ".svg");
      a.click();
      URL.revokeObjectURL(url);
    };
    if (e.shiftKey) {
      var img = new Image();
      img.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(function (blob) {
          var url = URL.createObjectURL(blob);
          var a = document.createElement('a');
          a.href = url;
          a.download = "".concat(baseName, ".jpg");
          a.click();
          URL.revokeObjectURL(url);
        }, 'image/jpeg', 0.95);
      };
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);
    } else {
      saveSvg();
    }
  });
}
if (gridSnapToggleButton) {
  gridSnapToggleButton.addEventListener('click', function () {
    var nextState = !readGridSnapState();
    var finalState = writeGridSnapState(nextState);
    applyGridSnapUiState(finalState);
  });
}
if (helpButton && helpDialog) {
  var helpContent = helpDialog.querySelector('.help-content');
  var helpQuickLinkItems = new Map();
  var helpSectionHighlightTimers = new Map();
  var appTargetHighlightTimers = new Map();
  var featureSearchHighlightTimers = new Map();
  var ensureHelpLinksUseButtonStyle = function ensureHelpLinksUseButtonStyle() {
    if (!helpContent) return;
    var helpLinks = helpContent.querySelectorAll('a.help-link');
    helpLinks.forEach(function (link) {
      link.classList.add('button-link');
    });
  };
  ensureHelpLinksUseButtonStyle();
  var highlightAppTarget = function highlightAppTarget(element) {
    if (!element) return;
    var target = element;
    var existing = appTargetHighlightTimers.get(target);
    if (existing) {
      clearTimeout(existing);
    }
    target.classList.add('help-target-focus');
    var timeout = setTimeout(function () {
      target.classList.remove('help-target-focus');
      appTargetHighlightTimers.delete(target);
    }, 2000);
    appTargetHighlightTimers.set(target, timeout);
  };
  var highlightFeatureSearchTargets = function highlightFeatureSearchTargets(targets) {
    if (!Array.isArray(targets) || targets.length === 0) return;
    var seen = new Set();
    targets.forEach(function (target) {
      var _target$classList;
      if (!target || typeof ((_target$classList = target.classList) === null || _target$classList === void 0 ? void 0 : _target$classList.add) !== 'function') return;
      if (seen.has(target)) return;
      seen.add(target);
      var existing = featureSearchHighlightTimers.get(target);
      if (existing) {
        clearTimeout(existing);
      }
      target.classList.add('feature-search-focus');
      var timeout = setTimeout(function () {
        target.classList.remove('feature-search-focus');
        featureSearchHighlightTimers.delete(target);
      }, 2500);
      featureSearchHighlightTimers.set(target, timeout);
    });
  };
  var findAssociatedLabelElements = function findAssociatedLabelElements(element) {
    if (!element) return [];
    var labels = new Set();
    var doc = element.ownerDocument || (typeof document !== 'undefined' ? document : null);
    if (element.labels && _typeof(element.labels) === 'object') {
      Array.from(element.labels).forEach(function (label) {
        if (label) labels.add(label);
      });
    }
    if (typeof element.closest === 'function') {
      var wrappingLabel = element.closest('label');
      if (wrappingLabel) labels.add(wrappingLabel);
    }
    if (doc && typeof element.getAttribute === 'function') {
      var collectIdRefs = function collectIdRefs(attrValue) {
        if (!attrValue) return;
        attrValue.split(/\s+/).filter(Boolean).forEach(function (id) {
          var ref = doc.getElementById(id);
          if (ref) labels.add(ref);
        });
      };
      collectIdRefs(element.getAttribute('aria-labelledby'));
      collectIdRefs(element.getAttribute('aria-describedby'));
    }
    return Array.from(labels);
  };
  var ensureFeatureSearchVisibility = function ensureFeatureSearchVisibility(element) {
    if (!element || _typeof(element) !== 'object' || typeof element.nodeType !== 'number') return;
    if (backupDiffSectionEl && backupDiffSectionEl.contains(element) && backupDiffSectionEl.hasAttribute('hidden')) {
      if (typeof showBackupDiffSection === 'function') {
        try {
          showBackupDiffSection();
        } catch (error) {
          console.warn('Unable to open backup diff section for feature search target', error);
          backupDiffSectionEl.removeAttribute('hidden');
        }
      } else {
        backupDiffSectionEl.removeAttribute('hidden');
      }
    }
    if (restoreRehearsalSectionEl && restoreRehearsalSectionEl.contains(element) && restoreRehearsalSectionEl.hasAttribute('hidden')) {
      if (typeof openRestoreRehearsal === 'function') {
        try {
          openRestoreRehearsal();
        } catch (error) {
          console.warn('Unable to open restore rehearsal section for feature search target', error);
          restoreRehearsalSectionEl.removeAttribute('hidden');
        }
      } else {
        restoreRehearsalSectionEl.removeAttribute('hidden');
      }
    }
  };
  var focusFeatureElement = function focusFeatureElement(element) {
    if (!element) return;
    ensureFeatureSearchVisibility(element);
    var settingsSection = element.closest('#settingsDialog');
    var settingsPanel = element.closest('.settings-panel');
    if (settingsPanel) {
      var labelledBy = settingsPanel.getAttribute('aria-labelledby') || '';
      var tabIds = labelledBy.split(/\s+/).map(function (id) {
        return id.trim();
      }).filter(Boolean);
      var matchingTabId = tabIds.find(function (id) {
        return document.getElementById(id);
      });
      if (matchingTabId) {
        activateSettingsTab(matchingTabId);
      }
    }
    if (settingsSection && !isDialogOpen(settingsDialog)) {
      var context = {
        reason: 'feature-search',
        targetId: typeof element.id === 'string' && element.id ? element.id : null
      };
      if (typeof element.getAttribute === 'function') {
        var label = element.getAttribute('aria-label') || element.getAttribute('data-help') || element.getAttribute('data-feature-key');
        if (label) {
          context.targetLabel = label;
        }
        var role = element.getAttribute('role');
        if (role) {
          context.targetRole = role;
        }
      }
      requestSettingsOpen(context);
    }
    var dialog = element.closest('dialog');
    if (dialog && !isDialogOpen(dialog)) {
      if (dialog.id === 'projectDialog') {
        var _generateGearListBtn, _generateGearListBtn$;
        (_generateGearListBtn = generateGearListBtn) === null || _generateGearListBtn === void 0 || (_generateGearListBtn$ = _generateGearListBtn.click) === null || _generateGearListBtn$ === void 0 || _generateGearListBtn$.call(_generateGearListBtn);
      } else if (dialog.id === 'feedbackDialog') {
        var _runtimeFeedbackBtn, _runtimeFeedbackBtn$c;
        (_runtimeFeedbackBtn = runtimeFeedbackBtn) === null || _runtimeFeedbackBtn === void 0 || (_runtimeFeedbackBtn$c = _runtimeFeedbackBtn.click) === null || _runtimeFeedbackBtn$c === void 0 || _runtimeFeedbackBtn$c.call(_runtimeFeedbackBtn);
      } else if (dialog.id === 'overviewDialog') {
        var _generateOverviewBtn, _generateOverviewBtn$;
        (_generateOverviewBtn = generateOverviewBtn) === null || _generateOverviewBtn === void 0 || (_generateOverviewBtn$ = _generateOverviewBtn.click) === null || _generateOverviewBtn$ === void 0 || _generateOverviewBtn$.call(_generateOverviewBtn);
      } else {
        openDialog(dialog);
      }
    }
    var deviceManager = element.closest('#device-manager');
    if (deviceManager) {
      showDeviceManagerSection();
    }
    if (typeof element.scrollIntoView === 'function') {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
    var hadTabIndex = element.hasAttribute('tabindex');
    var addedTabIndex = false;
    if (!hadTabIndex) {
      var tabIndex = element.tabIndex;
      if (typeof tabIndex === 'number' && tabIndex < 0) {
        element.setAttribute('tabindex', '-1');
        addedTabIndex = true;
      }
    }
    if (typeof element.focus === 'function') {
      try {
        element.focus({
          preventScroll: true
        });
      } catch (_unused10) {
        element.focus();
      }
    }
    if (addedTabIndex) {
      element.addEventListener('blur', function () {
        return element.removeAttribute('tabindex');
      }, {
        once: true
      });
    }
  };
  var focusHelpSectionHeading = function focusHelpSectionHeading(section) {
    if (!section) return;
    var heading = section.querySelector('h3, summary, h4, h5, h6') || section.querySelector('button, a');
    if (!heading) return;
    var hadTabIndex = heading.hasAttribute('tabindex');
    if (!hadTabIndex) heading.setAttribute('tabindex', '-1');
    try {
      heading.focus({
        preventScroll: true
      });
    } catch (_unused11) {
      heading.focus();
    }
    if (!hadTabIndex) {
      heading.addEventListener('blur', function () {
        return heading.removeAttribute('tabindex');
      }, {
        once: true
      });
    }
  };
  var highlightHelpSection = function highlightHelpSection(section) {
    if (!section) return;
    var existingTimer = helpSectionHighlightTimers.get(section);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }
    section.classList.add('help-section-focus');
    var timer = setTimeout(function () {
      section.classList.remove('help-section-focus');
      helpSectionHighlightTimers.delete(section);
    }, 1500);
    helpSectionHighlightTimers.set(section, timer);
  };
  var helpQuickLinksArrangeFrame = null;
  var helpQuickLinksResizeTimer = null;
  var arrangeHelpQuickLinksByLineCount = function arrangeHelpQuickLinksByLineCount() {
    if (!helpQuickLinksList || !helpQuickLinksList.childElementCount) {
      return;
    }
    var applyGrouping = function applyGrouping() {
      helpQuickLinksList.querySelectorAll('li[data-quick-link-spacer="true"]').forEach(removeNode);
      var items = Array.from(helpQuickLinksList.children);
      if (!items.length) return;
      var multiLineItems = [];
      var singleLineItems = [];
      var hiddenItems = [];
      items.forEach(function (item, index) {
        var button = item.querySelector('.help-quick-link');
        if (!button) {
          hiddenItems.push({
            index: index,
            node: item
          });
          return;
        }
        if (item.hasAttribute('hidden')) {
          hiddenItems.push({
            index: index,
            node: item,
            button: button
          });
          button.classList.remove('help-quick-link-multiline');
          return;
        }
        var label = button.querySelector('.help-quick-link-label');
        if (!label) {
          singleLineItems.push({
            index: index,
            node: item,
            button: button
          });
          button.classList.remove('help-quick-link-multiline');
          return;
        }
        var computed = window.getComputedStyle(label);
        var lineHeight = Number.parseFloat(computed.lineHeight);
        if (!lineHeight || Number.isNaN(lineHeight)) {
          lineHeight = Number.parseFloat(computed.fontSize) || 0;
        }
        var labelHeight = label.offsetHeight || label.getBoundingClientRect().height;
        var lineCount = lineHeight ? Math.round(labelHeight / lineHeight) : 1;
        var isMultiLine = lineCount > 1;
        button.classList.toggle('help-quick-link-multiline', isMultiLine);
        if (isMultiLine) {
          multiLineItems.push({
            index: index,
            node: item,
            button: button
          });
        } else {
          singleLineItems.push({
            index: index,
            node: item,
            button: button
          });
        }
      });
      if (!multiLineItems.length && !singleLineItems.length) {
        return;
      }
      var fragment = document.createDocumentFragment();
      var sortedMulti = multiLineItems.sort(function (a, b) {
        return a.index - b.index;
      });
      var sortedSingle = singleLineItems.sort(function (a, b) {
        return a.index - b.index;
      });
      var totalPairs = Math.max(Math.ceil(sortedMulti.length / 2), Math.ceil(sortedSingle.length / 2));
      for (var pairIndex = 0; pairIndex < totalPairs; pairIndex += 1) {
        var multiStart = pairIndex * 2;
        if (multiStart < sortedMulti.length) {
          fragment.appendChild(sortedMulti[multiStart].node);
          if (multiStart + 1 < sortedMulti.length) {
            fragment.appendChild(sortedMulti[multiStart + 1].node);
          } else if (sortedSingle.length) {
            var spacer = document.createElement('li');
            spacer.dataset.quickLinkSpacer = 'true';
            spacer.setAttribute('aria-hidden', 'true');
            spacer.setAttribute('role', 'presentation');
            spacer.className = 'help-quick-link-spacer';
            fragment.appendChild(spacer);
          }
        }
        var singleStart = pairIndex * 2;
        if (singleStart < sortedSingle.length) {
          fragment.appendChild(sortedSingle[singleStart].node);
          if (singleStart + 1 < sortedSingle.length) {
            fragment.appendChild(sortedSingle[singleStart + 1].node);
          }
        }
      }
      hiddenItems.sort(function (a, b) {
        return a.index - b.index;
      }).forEach(function (_ref17) {
        var node = _ref17.node;
        return fragment.appendChild(node);
      });
      if (fragment.childNodes.length) {
        helpQuickLinksList.appendChild(fragment);
      }
    };
    if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
      if (helpQuickLinksArrangeFrame) {
        window.cancelAnimationFrame(helpQuickLinksArrangeFrame);
      }
      helpQuickLinksArrangeFrame = window.requestAnimationFrame(function () {
        helpQuickLinksArrangeFrame = null;
        applyGrouping();
      });
    } else {
      applyGrouping();
    }
  };
  var scheduleHelpQuickLinksArrangement = function scheduleHelpQuickLinksArrangement() {
    if (helpQuickLinksResizeTimer) {
      clearTimeout(helpQuickLinksResizeTimer);
    }
    helpQuickLinksResizeTimer = setTimeout(function () {
      helpQuickLinksResizeTimer = null;
      arrangeHelpQuickLinksByLineCount();
    }, 150);
  };
  var syncHelpQuickLinksVisibility = function syncHelpQuickLinksVisibility() {
    if (!helpQuickLinksNav || !helpQuickLinksList || !helpQuickLinkItems.size) {
      if (helpQuickLinksNav) helpQuickLinksNav.setAttribute('hidden', '');
      return;
    }
    var hasVisible = false;
    helpQuickLinkItems.forEach(function (_ref18) {
      var section = _ref18.section,
        listItem = _ref18.listItem,
        button = _ref18.button;
      if (section && !section.hasAttribute('hidden')) {
        listItem.removeAttribute('hidden');
        hasVisible = true;
      } else {
        listItem.setAttribute('hidden', '');
        if (button) button.classList.remove('active');
      }
    });
    if (hasVisible) {
      helpQuickLinksNav.removeAttribute('hidden');
      arrangeHelpQuickLinksByLineCount();
    } else {
      helpQuickLinksNav.setAttribute('hidden', '');
    }
  };
  var applyQuickLinkLanguage = function applyQuickLinkLanguage(lang) {
    if (!helpQuickLinksNav) return;
    var langTexts = texts && texts[lang] || {};
    var fallbackTexts = texts && texts.en || {};
    var headingText = langTexts.helpQuickLinksHeading || fallbackTexts.helpQuickLinksHeading;
    if (helpQuickLinksHeading && headingText) {
      helpQuickLinksHeading.textContent = headingText;
    }
    var ariaLabel = langTexts.helpQuickLinksAriaLabel || headingText || fallbackTexts.helpQuickLinksAriaLabel || 'Help topics quick navigation';
    helpQuickLinksNav.setAttribute('aria-label', ariaLabel);
    var helpDescription = langTexts.helpQuickLinksHelp || fallbackTexts.helpQuickLinksHelp;
    if (helpDescription) {
      helpQuickLinksNav.setAttribute('data-help', helpDescription);
    } else {
      helpQuickLinksNav.removeAttribute('data-help');
    }
    var template = langTexts.helpQuickLinkButtonHelp || fallbackTexts.helpQuickLinkButtonHelp;
    helpQuickLinkItems.forEach(function (_ref19) {
      var button = _ref19.button,
        label = _ref19.label;
      if (!button) return;
      if (template) {
        var helpText = template.replace('%s', label);
        button.setAttribute('data-help', helpText);
        button.setAttribute('aria-label', helpText);
      } else {
        button.removeAttribute('data-help');
        button.setAttribute('aria-label', label);
      }
    });
    arrangeHelpQuickLinksByLineCount();
  };
  updateHelpQuickLinksForLanguage = applyQuickLinkLanguage;
  var buildHelpQuickLinks = function buildHelpQuickLinks() {
    if (!helpQuickLinksNav || !helpQuickLinksList || !helpSectionsContainer) {
      helpQuickLinkItems.clear();
      if (helpQuickLinksNav) helpQuickLinksNav.setAttribute('hidden', '');
      return;
    }
    helpQuickLinkItems.clear();
    helpQuickLinksList.textContent = '';
    var fragment = document.createDocumentFragment();
    var sections = Array.from(helpSectionsContainer.querySelectorAll('section[data-help-section]'));
    sections.forEach(function (section) {
      var id = section.id;
      if (!id) return;
      var heading = section.querySelector('h3');
      if (!heading) return;
      var headingIcon = heading.querySelector('.help-icon.icon-glyph');
      var label = heading.textContent || '';
      if (headingIcon) {
        var iconText = headingIcon.textContent || '';
        if (iconText) {
          var iconIndex = label.indexOf(iconText);
          if (iconIndex > -1) {
            label = label.slice(0, iconIndex) + label.slice(iconIndex + iconText.length);
          }
        }
      }
      label = label.trim();
      if (!label) return;
      var li = document.createElement('li');
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'help-quick-link button-link';
      button.dataset.targetId = id;
      button.setAttribute('aria-label', label);
      if (headingIcon) {
        var icon = headingIcon.cloneNode(true);
        icon.classList.remove('help-icon');
        icon.classList.add('help-quick-link-icon');
        button.appendChild(icon);
      }
      var labelSpan = document.createElement('span');
      labelSpan.className = 'help-quick-link-label';
      labelSpan.textContent = label;
      button.appendChild(labelSpan);
      button.addEventListener('click', function () {
        if (section.hasAttribute('hidden')) return;
        if (helpQuickLinksList) {
          helpQuickLinksList.querySelectorAll('.help-quick-link.active').forEach(function (btn) {
            return btn.classList.remove('active');
          });
        }
        button.classList.add('active');
        if (typeof section.scrollIntoView === 'function') {
          section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
        highlightHelpSection(section);
        focusHelpSectionHeading(section);
        var quickLinkHeading = section.querySelector('h3, summary, h4, h5, h6, [role="heading"]') || section.querySelector('button, a');
        if (quickLinkHeading) {
          highlightFeatureSearchTargets([quickLinkHeading]);
        } else {
          highlightFeatureSearchTargets([section]);
        }
      });
      li.appendChild(button);
      fragment.appendChild(li);
      helpQuickLinkItems.set(id, {
        section: section,
        button: button,
        listItem: li,
        label: label
      });
    });
    if (!fragment.childNodes.length) {
      helpQuickLinksNav.setAttribute('hidden', '');
      return;
    }
    helpQuickLinksList.appendChild(fragment);
    applyQuickLinkLanguage(currentLang);
    syncHelpQuickLinksVisibility();
  };
  buildHelpQuickLinks();
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', function () {
      var _helpQuickLinksNav;
      if (!helpQuickLinksList || (_helpQuickLinksNav = helpQuickLinksNav) !== null && _helpQuickLinksNav !== void 0 && _helpQuickLinksNav.hasAttribute('hidden')) {
        return;
      }
      scheduleHelpQuickLinksArrangement();
    }, {
      passive: true
    });
  }
  if (helpDialog) {
    helpDialog.addEventListener('click', function (e) {
      var link = e.target.closest('a[data-help-target]');
      if (!link) return;
      var rawSelector = link.dataset.helpTarget || link.getAttribute('href') || '';
      var selector = rawSelector.trim();
      if (!selector) return;
      var focusEl;
      try {
        focusEl = document.querySelector(selector);
      } catch (_unused12) {
        focusEl = null;
      }
      if (!focusEl) return;
      e.preventDefault();
      var highlightSelector = link.dataset.helpHighlight || '';
      var highlightEl = focusEl;
      if (highlightSelector) {
        try {
          var candidate = document.querySelector(highlightSelector);
          if (candidate) {
            highlightEl = candidate;
          }
        } catch (_unused13) {}
      }
      var targetInsideHelp = helpDialog.contains(focusEl);
      var runFocus = function runFocus() {
        focusFeatureElement(focusEl);
        if (highlightEl) {
          highlightAppTarget(highlightEl);
        }
        var extraTargets = findAssociatedLabelElements(highlightEl || focusEl);
        if (extraTargets.length) {
          highlightFeatureSearchTargets(extraTargets);
        }
      };
      if (targetInsideHelp) {
        runFocus();
        return;
      }
      closeHelp(null);
      requestAnimationFrame(function () {
        requestAnimationFrame(runFocus);
      });
    });
  }
  var HELP_SEARCH_ACCENT_VARIANTS = new Map([['a', 'àáâãäåāăąǎȁȃȧậắằẵẳấầẫẩảạæ'], ['b', 'ḃɓ'], ['c', 'çćĉċčƈ'], ['d', 'ďđḍḑḓ'], ['e', 'èéêëēĕėęěȅȇẹẻẽếềểễệ'], ['f', 'ƒḟ'], ['g', 'ğģĝġǵḡ'], ['h', 'ĥħḣḥḧẖ'], ['i', 'ìíîïĩīĭįıỉị'], ['j', 'ĵǰ'], ['k', 'ķƙḱḳḵ'], ['l', 'ĺļľłḷḽ'], ['m', 'ḿṁṃ'], ['n', 'ñńņňǹṅṇṋ'], ['o', 'òóôõöōŏőøǒȍȏơộớờỡởợọỏœ'], ['p', 'ṕṗ'], ['q', 'ʠ'], ['r', 'ŕŗřȑȓṛṙ'], ['s', 'śŝşšșṡṣ'], ['t', 'ţťțṫṭṯ'], ['u', 'ùúûüũūŭůűųǔȕȗưựứừữửụủ'], ['v', 'ṽṿ'], ['w', 'ŵẁẃẅẇẉ'], ['x', 'ẋẍ'], ['y', 'ýÿŷỳỷỹỵ'], ['z', 'źżžẑẓẕ']]);
  var normaliseHelpSearchText = function normaliseHelpSearchText(str) {
    if (!str) return '';
    var normalized = String(str).toLowerCase();
    if (typeof normalized.normalize === 'function') {
      normalized = normalized.normalize('NFD');
    }
    normalized = normalized.replace(/[\u0300-\u036f]/g, '').replace(/ß/g, 'ss').replace(/æ/g, 'ae').replace(/œ/g, 'oe').replace(/ø/g, 'o').replace(/&/g, 'and').replace(/\+/g, 'plus').replace(/[°º˚]/g, 'deg').replace(/\bdegrees?\b/g, 'deg').replace(/[×✕✖✗✘]/g, 'x');
    if (typeof normalizeSpellingVariants === 'function') {
      normalized = normalizeSpellingVariants(normalized);
    }
    normalized = normaliseMarkVariants(normalized);
    return normalized.replace(/[^a-z0-9]+/g, '');
  };
  var buildHelpHighlightPattern = function buildHelpHighlightPattern(normalized) {
    if (!normalized) return null;
    var escapeRegExp = function escapeRegExp(str) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };
    var parts = [];
    var addLetterPattern = function addLetterPattern(char) {
      var variants = HELP_SEARCH_ACCENT_VARIANTS.get(char) || '';
      var chars = new Set();
      var all = "".concat(char).concat(variants);
      var _iterator2 = _createForOfIteratorHelper(all),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var ch = _step2.value;
          chars.add(ch);
          var upper = ch.toUpperCase();
          if (upper) chars.add(upper);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      var escaped = Array.from(chars).map(escapeRegExp).join('');
      return "[".concat(escaped, "]");
    };
    var letters = Array.from(normalized);
    letters.forEach(function (char, index) {
      if (index > 0) parts.push('\\s*');
      if (/[a-z]/.test(char)) {
        parts.push(addLetterPattern(char));
      } else if (/[0-9]/.test(char)) {
        parts.push(char);
      } else {
        parts.push(escapeRegExp(char));
      }
    });
    return "(".concat(parts.join(''), ")");
  };
  updateHelpResultsSummaryText = function updateHelpResultsSummaryText() {
    var _ref20 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      totalCount = _ref20.totalCount,
      visibleCount = _ref20.visibleCount,
      hasQuery = _ref20.hasQuery,
      queryText = _ref20.queryText;
    var hideAssist = function hideAssist() {
      if (!helpResultsAssist) return;
      helpResultsAssist.textContent = '';
      helpResultsAssist.setAttribute('hidden', '');
    };
    if (!helpResultsSummary) {
      hideAssist();
      return;
    }
    if (typeof totalCount === 'number' && Number.isFinite(totalCount)) {
      helpResultsSummary.dataset.totalCount = String(totalCount);
    }
    if (typeof visibleCount === 'number' && Number.isFinite(visibleCount)) {
      helpResultsSummary.dataset.visibleCount = String(visibleCount);
    }
    if (typeof hasQuery === 'boolean') {
      helpResultsSummary.dataset.hasQuery = hasQuery ? 'true' : 'false';
    }
    if (typeof queryText === 'string') {
      helpResultsSummary.dataset.query = queryText;
    }
    var storedTotal = Number(helpResultsSummary.dataset.totalCount || 0);
    if (!storedTotal) {
      helpResultsSummary.textContent = '';
      helpResultsSummary.setAttribute('hidden', '');
      hideAssist();
      return;
    }
    var storedVisible = Number(helpResultsSummary.dataset.visibleCount || 0);
    var storedHasQuery = helpResultsSummary.dataset.hasQuery === 'true';
    var storedQuery = helpResultsSummary.dataset.query || '';
    var langTexts = texts && texts[currentLang] || {};
    var fallbackTexts = texts && texts.en || {};
    var summaryText = '';
    if (storedHasQuery) {
      var template = langTexts.helpResultsSummaryFiltered || fallbackTexts.helpResultsSummaryFiltered;
      if (template) {
        summaryText = template.replace('%1$s', storedVisible).replace('%2$s', storedTotal).replace('%3$s', storedQuery);
      } else if (storedQuery) {
        summaryText = "Showing ".concat(storedVisible, " of ").concat(storedTotal, " help topics for \u201C").concat(storedQuery, "\u201D.");
      } else {
        summaryText = "Showing ".concat(storedVisible, " of ").concat(storedTotal, " help topics.");
      }
    } else {
      var _template3 = langTexts.helpResultsSummaryAll || fallbackTexts.helpResultsSummaryAll;
      if (_template3) {
        summaryText = _template3.replace('%s', storedTotal);
      } else {
        summaryText = "All ".concat(storedTotal, " help topics are shown.");
      }
    }
    helpResultsSummary.textContent = summaryText;
    helpResultsSummary.removeAttribute('hidden');
    if (helpResultsAssist) {
      if (storedVisible > 0) {
        var assistTemplate = langTexts.helpResultsAssist || fallbackTexts.helpResultsAssist;
        var assistText = assistTemplate || 'Tip: Press Tab to move into the quick links, or press Enter to open the top visible topic.';
        helpResultsAssist.textContent = assistText;
        helpResultsAssist.removeAttribute('hidden');
      } else {
        hideAssist();
      }
    }
  };
  var filterHelp = function filterHelp() {
    if (!helpSearch) {
      if (helpResultsSummary) helpResultsSummary.setAttribute('hidden', '');
      return;
    }
    var rawQuery = helpSearch.value.trim();
    var normalizedQuery = normaliseHelpSearchText(rawQuery);
    var hasQuery = normalizedQuery.length > 0;
    var sections = Array.from(helpDialog.querySelectorAll('[data-help-section]'));
    var items = Array.from(helpDialog.querySelectorAll('.faq-item'));
    var elements = sections.concat(items);
    var totalCount = elements.length;
    var visibleCount = 0;
    var highlightPattern = hasQuery ? buildHelpHighlightPattern(normalizedQuery) : null;
    var highlightMatches = function highlightMatches(root, pattern) {
      if (!pattern || typeof document.createTreeWalker !== 'function' || typeof NodeFilter === 'undefined') {
        return;
      }
      var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
      var textNodes = [];
      while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
      }
      textNodes.forEach(function (node) {
        var text = node.textContent;
        if (!text) return;
        var regex = new RegExp(pattern, 'giu');
        var firstMatch = regex.exec(text);
        if (!firstMatch) return;
        var frag = document.createDocumentFragment();
        var lastIndex = 0;
        var match = firstMatch;
        do {
          var start = match.index;
          var end = start + match[0].length;
          if (start > lastIndex) {
            frag.appendChild(document.createTextNode(text.slice(lastIndex, start)));
          }
          var mark = document.createElement('mark');
          mark.textContent = text.slice(start, end);
          frag.appendChild(mark);
          lastIndex = end;
          if (regex.lastIndex === start) {
            regex.lastIndex++;
          }
        } while ((match = regex.exec(text)) !== null);
        if (lastIndex < text.length) {
          frag.appendChild(document.createTextNode(text.slice(lastIndex)));
        }
        if (node.parentNode) {
          node.parentNode.replaceChild(frag, node);
        }
      });
    };
    elements.forEach(function (el) {
      var isFaqItem = el.classList.contains('faq-item');
      if (!el.dataset.origHtml) {
        el.dataset.origHtml = el.innerHTML;
        if (isFaqItem) {
          el.dataset.defaultOpen = el.hasAttribute('open') ? 'true' : 'false';
        }
      } else {
        el.innerHTML = el.dataset.origHtml;
      }
      var text = normaliseHelpSearchText(el.textContent || '');
      var keywordText = normaliseHelpSearchText(el.dataset.helpKeywords || '');
      var matches = !hasQuery || text.includes(normalizedQuery) || keywordText.includes(normalizedQuery);
      if (matches) {
        if (hasQuery && highlightPattern) {
          highlightMatches(el, highlightPattern);
        }
        el.removeAttribute('hidden');
        if (isFaqItem) {
          if (hasQuery) {
            el.setAttribute('open', '');
          } else if (el.dataset.defaultOpen === 'true') {
            el.setAttribute('open', '');
          } else {
            el.removeAttribute('open');
          }
        }
        visibleCount += 1;
      } else {
        el.setAttribute('hidden', '');
        if (isFaqItem) {
          el.removeAttribute('open');
        }
      }
    });
    if (typeof updateHelpResultsSummaryText === 'function') {
      updateHelpResultsSummaryText({
        totalCount: totalCount,
        visibleCount: visibleCount,
        hasQuery: hasQuery,
        queryText: rawQuery || normalizedQuery
      });
    }
    var showNoResults = hasQuery && visibleCount === 0;
    if (helpNoResults) {
      if (!showNoResults) {
        helpNoResults.setAttribute('hidden', '');
      } else {
        helpNoResults.removeAttribute('hidden');
      }
    }
    if (typeof helpNoResultsSuggestions !== 'undefined' && helpNoResultsSuggestions) {
      if (!showNoResults) {
        helpNoResultsSuggestions.setAttribute('hidden', '');
      } else {
        helpNoResultsSuggestions.removeAttribute('hidden');
      }
    }
    if (helpSearchClear) {
      if (hasQuery) {
        helpSearchClear.removeAttribute('hidden');
      } else {
        helpSearchClear.setAttribute('hidden', '');
      }
    }
    syncHelpQuickLinksVisibility();
  };
  var openHelp = function openHelp() {
    ensureOnboardingTourReady('help-open');
    closeSideMenu();
    helpDialog.removeAttribute('hidden');
    openDialog(helpDialog);
    if (helpSearch) {
      helpSearch.value = '';
      filterHelp();
      if (helpQuickLinksList) {
        helpQuickLinksList.querySelectorAll('.help-quick-link.active').forEach(function (btn) {
          return btn.classList.remove('active');
        });
      }
      if (helpContent) {
        helpContent.scrollTop = 0;
      }
      helpSearch.focus();
    } else {
      try {
        helpDialog.focus({
          preventScroll: true
        });
      } catch (_unused14) {
        helpDialog.focus();
      }
    }
  };
  var closeHelp = function closeHelp() {
    var returnFocusEl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : helpButton;
    closeDialog(helpDialog);
    helpDialog.setAttribute('hidden', '');
    if (returnFocusEl && typeof returnFocusEl.focus === 'function') {
      try {
        returnFocusEl.focus({
          preventScroll: true
        });
      } catch (_unused15) {
        returnFocusEl.focus();
      }
    }
  };
  var toggleHelp = function toggleHelp() {
    if (!isDialogOpen(helpDialog)) {
      openHelp();
    } else {
      closeHelp();
    }
  };
  var hoverHelpActive = false;
  var hoverHelpTooltip;
  var hoverHelpCurrentTarget = null;
  var hoverHelpHighlightedTarget = null;
  var hoverHelpPointerClientX = null;
  var hoverHelpPointerClientY = null;
  var parseHoverHelpSelectorList = function parseHoverHelpSelectorList(value) {
    if (typeof value !== 'string') return [];
    return value.split(',').map(function (selector) {
      return selector.trim();
    }).filter(Boolean);
  };
  var parseHoverHelpIdList = function parseHoverHelpIdList(value) {
    if (typeof value !== 'string') return [];
    return value.split(/\s+/).map(function (id) {
      return id.trim();
    }).filter(Boolean);
  };
  var getHoverHelpReferenceElements = function getHoverHelpReferenceElements(element) {
    var _document;
    if (!element || !((_document = document) !== null && _document !== void 0 && _document.querySelector)) return [];
    var references = [];
    var seen = new Set();
    var addCandidate = function addCandidate(candidate) {
      if (!candidate || !(candidate instanceof Element)) return;
      if (candidate === element) return;
      if (seen.has(candidate)) return;
      seen.add(candidate);
      references.push(candidate);
    };
    var addFromSelectors = function addFromSelectors(raw) {
      parseHoverHelpSelectorList(raw).forEach(function (selector) {
        try {
          var match = document.querySelector(selector);
          addCandidate(match);
        } catch (_unused16) {}
      });
    };
    var addFromIds = function addFromIds(raw) {
      parseHoverHelpIdList(raw).forEach(function (id) {
        var match = document.getElementById(id);
        addCandidate(match);
      });
    };
    addFromSelectors(element.getAttribute('data-hover-help-target'));
    addFromSelectors(element.getAttribute('data-hover-help-source'));
    if (!element.hasAttribute('data-hover-help-skip-help-target')) {
      addFromSelectors(element.getAttribute('data-help-target'));
    }
    addFromIds(element.getAttribute('data-hover-help-targets'));
    return references;
  };
  var HOVER_HELP_TARGET_SELECTOR = '[data-help], [aria-label], [title], [aria-labelledby], [alt], [aria-describedby]';
  var findHoverHelpTarget = function findHoverHelpTarget(start) {
    if (!start) return null;
    var el = start.closest(HOVER_HELP_TARGET_SELECTOR);
    if (!el || el.tagName === 'SECTION') {
      return null;
    }
    return el;
  };
  var HOVER_HELP_SHORTCUT_TOKEN_MAP = {
    control: 'Ctrl',
    ctrl: 'Ctrl',
    meta: 'Cmd',
    cmd: 'Cmd',
    command: 'Cmd',
    option: 'Alt',
    alt: 'Alt',
    shift: 'Shift',
    enter: 'Enter',
    return: 'Enter',
    escape: 'Esc',
    esc: 'Esc',
    space: 'Space',
    spacebar: 'Space',
    tab: 'Tab',
    slash: '/',
    question: '?',
    backslash: '\\',
    minus: '−',
    dash: '−',
    plus: '+',
    period: '.',
    comma: ',',
    semicolon: ';',
    colon: ':',
    arrowup: '↑',
    arrowdown: '↓',
    arrowleft: '←',
    arrowright: '→',
    pageup: 'Page Up',
    pagedown: 'Page Down',
    home: 'Home',
    end: 'End',
    delete: 'Delete',
    backspace: 'Backspace',
    insert: 'Insert'
  };
  var formatHoverHelpShortcutToken = function formatHoverHelpShortcutToken(token) {
    if (typeof token !== 'string') return '';
    var clean = token.trim();
    if (!clean) return '';
    var lower = clean.toLowerCase();
    if (HOVER_HELP_SHORTCUT_TOKEN_MAP[lower]) {
      return HOVER_HELP_SHORTCUT_TOKEN_MAP[lower];
    }
    if (/^f\d{1,2}$/i.test(clean)) {
      return clean.toUpperCase();
    }
    if (/^key[a-z]$/i.test(clean)) {
      return clean.slice(3).toUpperCase();
    }
    if (/^digit\d$/i.test(clean)) {
      return clean.slice(5);
    }
    if (/^numpad\d$/i.test(clean)) {
      return "Numpad ".concat(clean.slice(6));
    }
    if (/^numpad(add|subtract|multiply|divide)$/i.test(lower)) {
      var op = lower.slice(6);
      var symbolMap = {
        add: '+',
        subtract: '−',
        multiply: '×',
        divide: '÷'
      };
      return "Numpad ".concat(symbolMap[op] || op);
    }
    if (clean.length === 1) {
      return clean.toUpperCase();
    }
    return clean.replace(/^[a-z]/, function (c) {
      return c.toUpperCase();
    });
  };
  var formatHoverHelpShortcut = function formatHoverHelpShortcut(shortcut) {
    if (typeof shortcut !== 'string') return '';
    var parts = shortcut.split('+').map(formatHoverHelpShortcutToken).filter(Boolean);
    if (!parts.length) {
      return '';
    }
    return parts.join(' + ');
  };
  var splitHoverHelpShortcutList = function splitHoverHelpShortcutList(value) {
    if (typeof value !== 'string') return [];
    return value.split(/[;,\n\u2022\u2027\u00b7]+/).map(function (part) {
      return part.trim();
    }).filter(Boolean);
  };
  var gatherHoverHelpShortcuts = function gatherHoverHelpShortcuts(element) {
    if (!element) return [];
    var shortcuts = [];
    var attrValues = [element.getAttribute('data-shortcut'), element.getAttribute('data-shortcuts'), element.getAttribute('data-help-shortcut'), element.getAttribute('data-help-shortcuts')];
    attrValues.forEach(function (value) {
      splitHoverHelpShortcutList(value).forEach(function (item) {
        if (item) shortcuts.push(item);
      });
    });
    var ariaShortcuts = element.getAttribute('aria-keyshortcuts');
    if (ariaShortcuts) {
      ariaShortcuts.split(/\s+/).map(formatHoverHelpShortcut).filter(Boolean).forEach(function (item) {
        return shortcuts.push(item);
      });
    }
    return shortcuts;
  };
  var getHoverHelpLocaleValue = function getHoverHelpLocaleValue(key) {
    if (!texts || (typeof texts === "undefined" ? "undefined" : _typeof(texts)) !== 'object') return '';
    var fallback = _typeof(texts.en) === 'object' ? texts.en[key] : '';
    if (typeof currentLang === 'string' && texts[currentLang]) {
      var value = texts[currentLang][key];
      if (typeof value === 'string' && value.trim()) {
        return value;
      }
    }
    return typeof fallback === 'string' ? fallback : '';
  };
  var getHoverHelpFallbackKeys = function getHoverHelpFallbackKeys(element) {
    var _element$matches, _element$matches2, _element$matches3;
    if (!element) return [];
    var keys = [];
    var push = function push(key) {
      if (!key || keys.includes(key)) return;
      keys.push(key);
    };
    var role = (element.getAttribute('role') || '').toLowerCase();
    var tagName = element.tagName ? element.tagName.toLowerCase() : '';
    var typeAttr = (element.getAttribute('type') || '').toLowerCase();
    var elementType = typeof element.type === 'string' ? element.type.toLowerCase() : '';
    var inputType = typeAttr || elementType;
    var ariaHasPopup = (element.getAttribute('aria-haspopup') || '').toLowerCase();
    var ariaPressed = (element.getAttribute('aria-pressed') || '').toLowerCase();
    if (role === 'dialog' || role === 'alertdialog') {
      push('hoverHelpFallbackDialog');
    }
    if (role === 'alertdialog') {
      push('hoverHelpFallbackAlert');
    }
    if (role === 'tablist') {
      push('hoverHelpFallbackTablist');
    }
    if (role === 'tab') {
      push('hoverHelpFallbackTab');
    }
    if (role === 'menu') {
      push('hoverHelpFallbackMenu');
    }
    if (role === 'menuitem') {
      push('hoverHelpFallbackMenu');
    }
    if (role === 'listbox') {
      push('hoverHelpFallbackSelect');
    }
    if (role === 'link') {
      push('hoverHelpFallbackLink');
    }
    if (role === 'progressbar') {
      push('hoverHelpFallbackProgress');
    }
    if (role === 'status') {
      push('hoverHelpFallbackStatus');
    }
    if (role === 'alert') {
      push('hoverHelpFallbackAlert');
    }
    if (role === 'switch') {
      push('hoverHelpFallbackSwitch');
    }
    if (role === 'checkbox' || role === 'menuitemcheckbox') {
      push('hoverHelpFallbackCheckbox');
    }
    if (role === 'radio' || role === 'menuitemradio') {
      push('hoverHelpFallbackRadio');
    }
    if (role === 'slider') {
      push('hoverHelpFallbackSlider');
    }
    if (role === 'spinbutton') {
      push('hoverHelpFallbackNumberInput');
    }
    if (role === 'textbox' || role === 'searchbox') {
      push('hoverHelpFallbackTextInput');
    }
    if (role === 'combobox') {
      push('hoverHelpFallbackSelect');
    }
    if (tagName === 'button' || role === 'button' || (_element$matches = element.matches) !== null && _element$matches !== void 0 && _element$matches.call(element, "input[type='button']") || (_element$matches2 = element.matches) !== null && _element$matches2 !== void 0 && _element$matches2.call(element, "input[type='submit']") || (_element$matches3 = element.matches) !== null && _element$matches3 !== void 0 && _element$matches3.call(element, "input[type='reset']")) {
      if (ariaHasPopup && ariaHasPopup !== 'false') {
        push('hoverHelpFallbackMenuButton');
      }
      if (ariaPressed === 'true' || ariaPressed === 'mixed' || ariaPressed === 'false') {
        push('hoverHelpFallbackToggleButton');
      }
      push('hoverHelpFallbackButton');
    } else if (tagName === 'a' && element.hasAttribute('href')) {
      push('hoverHelpFallbackLink');
    } else if (tagName === 'select') {
      push('hoverHelpFallbackSelect');
    } else if (tagName === 'textarea') {
      push('hoverHelpFallbackTextarea');
    } else if (tagName === 'details') {
      push('hoverHelpFallbackDetails');
    } else if (tagName === 'input') {
      switch (inputType) {
        case 'checkbox':
          push('hoverHelpFallbackCheckbox');
          break;
        case 'radio':
          push('hoverHelpFallbackRadio');
          break;
        case 'range':
          push('hoverHelpFallbackSlider');
          break;
        case 'number':
          push('hoverHelpFallbackNumberInput');
          break;
        case 'file':
          push('hoverHelpFallbackFileInput');
          break;
        case 'color':
          push('hoverHelpFallbackColorInput');
          break;
        default:
          push('hoverHelpFallbackTextInput');
          break;
      }
    } else if (element.isContentEditable) {
      push('hoverHelpFallbackTextarea');
    }
    push('hoverHelpFallbackGeneric');
    return keys;
  };
  var collectHoverHelpContent = function collectHoverHelpContent(el) {
    if (!el) {
      return {
        label: '',
        details: []
      };
    }
    var seen = new Set();
    var labelParts = [];
    var detailParts = [];
    var shortcutParts = [];
    var addUnique = function addUnique(value, bucket) {
      if (typeof value !== 'string') return;
      var trimmed = value.replace(/\s+/g, ' ').trim();
      if (!trimmed || seen.has(trimmed)) return;
      seen.add(trimmed);
      bucket.push(trimmed);
    };
    var addLabelText = function addLabelText(value) {
      return addUnique(value, labelParts);
    };
    var addDetailText = function addDetailText(value) {
      return addUnique(value, detailParts);
    };
    var addShortcutText = function addShortcutText(value) {
      return addUnique(value, shortcutParts);
    };
    var addTextFromElement = function addTextFromElement(element) {
      var _ref21 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref21$includeTextCon = _ref21.includeTextContent,
        includeTextContent = _ref21$includeTextCon === void 0 ? false : _ref21$includeTextCon,
        _ref21$preferTextAsLa = _ref21.preferTextAsLabel,
        preferTextAsLabel = _ref21$preferTextAsLa === void 0 ? false : _ref21$preferTextAsLa;
      if (!element) return;
      addDetailText(element.getAttribute('data-help'));
      addDetailText(element.getAttribute('aria-description'));
      addDetailText(element.getAttribute('title'));
      addDetailText(element.getAttribute('aria-placeholder'));
      addLabelText(element.getAttribute('aria-label'));
      addLabelText(element.getAttribute('alt'));
      var placeholderAttr = element.getAttribute('placeholder');
      addDetailText(placeholderAttr);
      if (element.placeholder && element.placeholder !== placeholderAttr) {
        addDetailText(element.placeholder);
      }
      var roleDescription = element.getAttribute('aria-roledescription');
      if (roleDescription) {
        if (preferTextAsLabel) {
          addLabelText(roleDescription);
        } else {
          addDetailText(roleDescription);
        }
      }
      gatherHoverHelpShortcuts(element).forEach(addShortcutText);
      if (includeTextContent) {
        var text = element.textContent;
        if (preferTextAsLabel) {
          addLabelText(text);
        } else {
          addDetailText(text);
        }
      }
    };
    var applyFromIds = function applyFromIds(ids) {
      var _ref22 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref22$preferTextAsLa = _ref22.preferTextAsLabel,
        preferTextAsLabel = _ref22$preferTextAsLa === void 0 ? false : _ref22$preferTextAsLa;
      if (!ids) return;
      ids.split(/\s+/).map(function (id) {
        return id.trim();
      }).filter(Boolean).forEach(function (id) {
        var ref = document.getElementById(id);
        if (!ref) return;
        addTextFromElement(ref, {
          includeTextContent: true,
          preferTextAsLabel: preferTextAsLabel
        });
      });
    };
    var visitedElements = new Set();
    var queue = [{
      element: el,
      preferTextAsLabel: true,
      includeTextContent: false
    }];
    while (queue.length) {
      var _queue$shift = queue.shift(),
        current = _queue$shift.element,
        preferTextAsLabel = _queue$shift.preferTextAsLabel,
        includeTextContent = _queue$shift.includeTextContent;
      if (!current || visitedElements.has(current)) {
        continue;
      }
      visitedElements.add(current);
      addTextFromElement(current, {
        includeTextContent: includeTextContent,
        preferTextAsLabel: preferTextAsLabel
      });
      applyFromIds(current.getAttribute('aria-labelledby'), {
        preferTextAsLabel: true
      });
      applyFromIds(current.getAttribute('aria-describedby'));
      applyFromIds(current.getAttribute('aria-details'));
      applyFromIds(current.getAttribute('aria-errormessage'));
      applyFromIds(current.getAttribute('aria-controls'));
      findAssociatedLabelElements(current).forEach(function (labelEl) {
        addTextFromElement(labelEl, {
          includeTextContent: true,
          preferTextAsLabel: true
        });
      });
      getHoverHelpReferenceElements(current).forEach(function (proxyEl) {
        queue.push({
          element: proxyEl,
          preferTextAsLabel: false,
          includeTextContent: true
        });
      });
    }
    if (!labelParts.length) {
      addLabelText(el.textContent);
    }
    if (!detailParts.length && labelParts.length > 1) {
      labelParts.slice(1).forEach(function (text) {
        return addDetailText(text);
      });
    }
    if (!detailParts.length) {
      var fallbackKeys = getHoverHelpFallbackKeys(el);
      var addedFallback = false;
      fallbackKeys.forEach(function (key) {
        var text = getHoverHelpLocaleValue(key);
        if (!text) return;
        addedFallback = true;
        addDetailText(text);
      });
      if (!addedFallback) {
        addDetailText(getHoverHelpLocaleValue('hoverHelpFallbackGeneric'));
      }
    }
    return {
      label: labelParts[0] || '',
      details: detailParts,
      shortcuts: shortcutParts
    };
  };
  var clearHoverHelpHighlight = function clearHoverHelpHighlight() {
    if (hoverHelpHighlightedTarget && hoverHelpHighlightedTarget.classList) {
      hoverHelpHighlightedTarget.classList.remove('hover-help-highlight');
    }
    hoverHelpHighlightedTarget = null;
  };
  var setHoverHelpHighlight = function setHoverHelpHighlight(target) {
    if (hoverHelpHighlightedTarget === target) return;
    clearHoverHelpHighlight();
    if (target && target.classList && typeof target.classList.add === 'function') {
      target.classList.add('hover-help-highlight');
      hoverHelpHighlightedTarget = target;
    }
  };
  var usingPointerAnchor = function usingPointerAnchor() {
    return hoverHelpActive && hoverHelpTooltip && typeof hoverHelpPointerClientX === 'number' && typeof hoverHelpPointerClientY === 'number' && Number.isFinite(hoverHelpPointerClientX) && Number.isFinite(hoverHelpPointerClientY);
  };
  var extractPointerClientCoords = function extractPointerClientCoords(event) {
    if (!event) return null;
    var hasClient = typeof event.clientX === 'number' && typeof event.clientY === 'number' && Number.isFinite(event.clientX) && Number.isFinite(event.clientY);
    if (hasClient) {
      return [event.clientX, event.clientY];
    }
    var hasPage = typeof event.pageX === 'number' && typeof event.pageY === 'number' && Number.isFinite(event.pageX) && Number.isFinite(event.pageY);
    if (hasPage) {
      var scrollX = window.scrollX || window.pageXOffset || 0;
      var scrollY = window.scrollY || window.pageYOffset || 0;
      return [event.pageX - scrollX, event.pageY - scrollY];
    }
    return null;
  };
  var recordPointerFromEvent = function recordPointerFromEvent(event) {
    if (!hoverHelpActive || !hoverHelpTooltip) return false;
    var coords = extractPointerClientCoords(event);
    if (!coords) return false;
    var _coords = _slicedToArray(coords, 2),
      clientX = _coords[0],
      clientY = _coords[1];
    hoverHelpPointerClientX = clientX;
    hoverHelpPointerClientY = clientY;
    return true;
  };
  var positionHoverHelpTooltip = function positionHoverHelpTooltip(target) {
    if (!hoverHelpTooltip || !target) return;
    var rect = target.getBoundingClientRect();
    var docEl = document.documentElement;
    var viewportWidth = Math.max((docEl === null || docEl === void 0 ? void 0 : docEl.clientWidth) || 0, window.innerWidth || 0);
    var viewportHeight = Math.max((docEl === null || docEl === void 0 ? void 0 : docEl.clientHeight) || 0, window.innerHeight || 0);
    var scrollX = window.scrollX || window.pageXOffset || 0;
    var scrollY = window.scrollY || window.pageYOffset || 0;
    var horizontalOffset = 12;
    var verticalOffset = 10;
    var viewportPadding = 8;
    var safeLeft = Number.isFinite(rect.left) ? rect.left : 0;
    var safeRight = Number.isFinite(rect.right) ? rect.right : safeLeft + (rect.width || 0);
    var safeTop = Number.isFinite(rect.top) ? rect.top : 0;
    var safeBottom = Number.isFinite(rect.bottom) ? rect.bottom : safeTop;
    var tooltipRect = hoverHelpTooltip.getBoundingClientRect();
    var tooltipWidth = tooltipRect.width || hoverHelpTooltip.offsetWidth || 0;
    var tooltipHeight = tooltipRect.height || hoverHelpTooltip.offsetHeight || 0;
    var pointerAnchored = usingPointerAnchor();
    var pointerClientX = function () {
      if (pointerAnchored && typeof hoverHelpPointerClientX === 'number') {
        return hoverHelpPointerClientX;
      }
      if (Number.isFinite(rect.left)) {
        return safeLeft + (rect.width || 0) / 2;
      }
      return viewportWidth / 2;
    }();
    var preferLeftSide = function () {
      if (tooltipWidth) {
        var requiredSpace = tooltipWidth + horizontalOffset + viewportPadding;
        var availableRight = viewportWidth - pointerClientX;
        var availableLeft = pointerClientX;
        if (availableRight < requiredSpace && availableLeft >= requiredSpace) {
          return true;
        }
      }
      var rightSideThreshold = viewportWidth * 0.6;
      return pointerClientX >= rightSideThreshold;
    }();
    var top = pointerAnchored ? hoverHelpPointerClientY + scrollY + verticalOffset : safeBottom + scrollY + verticalOffset;
    var left;
    if (pointerAnchored) {
      left = hoverHelpPointerClientX + scrollX + horizontalOffset;
      if (preferLeftSide) {
        left = hoverHelpPointerClientX + scrollX - tooltipWidth - horizontalOffset;
      }
    } else {
      var baseAnchor = preferLeftSide ? safeRight : safeLeft;
      left = baseAnchor + scrollX + (preferLeftSide ? -horizontalOffset : horizontalOffset);
      if (preferLeftSide) {
        left -= tooltipWidth;
      }
    }
    if (tooltipWidth) {
      var viewportRightLimit = scrollX + viewportWidth - viewportPadding;
      var defaultRight = left + tooltipWidth;
      if (defaultRight > viewportRightLimit) {
        if (pointerAnchored) {
          left = hoverHelpPointerClientX + scrollX - tooltipWidth - horizontalOffset;
        } else {
          left = safeRight + scrollX - tooltipWidth - horizontalOffset;
        }
      } else if (left < scrollX + viewportPadding && preferLeftSide) {
        left = Math.max(left, scrollX + viewportPadding);
      }
      var minLeft = scrollX + viewportPadding;
      var maxLeft = scrollX + Math.max(viewportWidth - tooltipWidth - viewportPadding, viewportPadding);
      if (left < minLeft) {
        left = minLeft;
      } else if (left > maxLeft) {
        left = maxLeft;
      }
    }
    if (tooltipHeight) {
      var minTop = scrollY + viewportPadding;
      var maxTop = scrollY + Math.max(viewportHeight - tooltipHeight - viewportPadding, viewportPadding);
      if (top > maxTop) {
        var aboveTop = pointerAnchored ? hoverHelpPointerClientY + scrollY - tooltipHeight - verticalOffset : safeTop + scrollY - tooltipHeight - verticalOffset;
        if (aboveTop >= minTop) {
          top = aboveTop;
        } else {
          top = Math.min(Math.max(top, minTop), maxTop);
        }
      } else if (top < minTop) {
        top = minTop;
      }
    }
    hoverHelpTooltip.style.top = "".concat(top, "px");
    hoverHelpTooltip.style.left = "".concat(left, "px");
  };
  var hideHoverHelpTooltip = function hideHoverHelpTooltip() {
    if (!hoverHelpTooltip) return;
    hoverHelpTooltip.setAttribute('hidden', '');
    hoverHelpTooltip.style.removeProperty('visibility');
    hoverHelpPointerClientX = null;
    hoverHelpPointerClientY = null;
    clearHoverHelpHighlight();
  };
  var createHoverHelpDetailsFragment = function createHoverHelpDetailsFragment(detailText) {
    var fragment = document.createDocumentFragment();
    if (!Array.isArray(detailText) || detailText.length === 0) {
      return fragment;
    }
    var addParagraph = function addParagraph(text) {
      if (!text) return;
      var paragraph = document.createElement('p');
      paragraph.textContent = text;
      fragment.appendChild(paragraph);
    };
    var listBuffer = [];
    var flushList = function flushList() {
      if (!listBuffer.length) return;
      var list = document.createElement('ul');
      listBuffer.forEach(function (itemText) {
        var item = document.createElement('li');
        item.textContent = itemText;
        list.appendChild(item);
      });
      fragment.appendChild(list);
      listBuffer = [];
    };
    var addListItem = function addListItem(text) {
      if (!text) return;
      listBuffer.push(text);
    };
    detailText.forEach(function (part) {
      if (typeof part !== 'string') return;
      var normalisedPart = part.replace(/\r\n/g, '\n').replace(/\s*[•‣▪◦⋅·]\s*/g, '\n• ');
      var lines = normalisedPart.split(/\n+/).map(function (line) {
        return line.trim();
      }).filter(Boolean);
      lines.forEach(function (line) {
        var bulletMatch = line.match(/^[•\-–—]\s*(.+)$/);
        if (bulletMatch) {
          addListItem(bulletMatch[1].trim());
          return;
        }
        flushList();
        addParagraph(line);
      });
      flushList();
    });
    flushList();
    if (!fragment.childElementCount) {
      addParagraph(detailText.filter(Boolean).join(' '));
    }
    return fragment;
  };
  var updateHoverHelpTooltip = function updateHoverHelpTooltip(target) {
    hoverHelpCurrentTarget = target || null;
    setHoverHelpHighlight(target || null);
    if (!hoverHelpActive || !hoverHelpTooltip || !target) {
      hideHoverHelpTooltip();
      return;
    }
    var _collectHoverHelpCont = collectHoverHelpContent(target),
      label = _collectHoverHelpCont.label,
      details = _collectHoverHelpCont.details,
      shortcuts = _collectHoverHelpCont.shortcuts;
    var hasLabel = typeof label === 'string' && label.trim().length > 0;
    var detailText = Array.isArray(details) ? details.filter(Boolean) : [];
    var shortcutList = Array.isArray(shortcuts) ? shortcuts.filter(Boolean) : [];
    if (!hasLabel && detailText.length === 0 && shortcutList.length === 0) {
      hideHoverHelpTooltip();
      return;
    }
    hoverHelpTooltip.textContent = '';
    if (hasLabel) {
      var titleEl = document.createElement('div');
      titleEl.className = 'hover-help-heading';
      titleEl.textContent = label.trim();
      hoverHelpTooltip.appendChild(titleEl);
    }
    if (detailText.length) {
      var bodyEl = document.createElement('div');
      bodyEl.className = 'hover-help-details';
      bodyEl.appendChild(createHoverHelpDetailsFragment(detailText));
      hoverHelpTooltip.appendChild(bodyEl);
    }
    if (shortcutList.length) {
      var shortcutsWrapper = document.createElement('div');
      shortcutsWrapper.className = 'hover-help-shortcuts';
      var headingText = getHoverHelpLocaleValue('hoverHelpShortcutsHeading');
      if (headingText) {
        var headingEl = document.createElement('div');
        headingEl.className = 'hover-help-shortcuts-heading';
        headingEl.textContent = headingText;
        shortcutsWrapper.appendChild(headingEl);
      }
      var listEl = document.createElement('ul');
      listEl.className = 'hover-help-shortcuts-list';
      shortcutList.forEach(function (shortcutText) {
        if (!shortcutText) return;
        var item = document.createElement('li');
        item.className = 'hover-help-shortcut';
        item.textContent = shortcutText;
        listEl.appendChild(item);
      });
      if (listEl.childElementCount) {
        shortcutsWrapper.appendChild(listEl);
        hoverHelpTooltip.appendChild(shortcutsWrapper);
      }
    }
    var exitHint = getHoverHelpLocaleValue('hoverHelpExitHint');
    if (exitHint) {
      var hintEl = document.createElement('div');
      hintEl.className = 'hover-help-hint';
      hintEl.textContent = exitHint;
      hoverHelpTooltip.appendChild(hintEl);
    }
    var wasHidden = hoverHelpTooltip.hasAttribute('hidden');
    if (wasHidden) {
      hoverHelpTooltip.style.visibility = 'hidden';
      hoverHelpTooltip.removeAttribute('hidden');
    }
    positionHoverHelpTooltip(target);
    if (wasHidden) {
      hoverHelpTooltip.style.removeProperty('visibility');
    }
    hoverHelpTooltip.removeAttribute('hidden');
  };
  var canInteractDuringHoverHelp = function canInteractDuringHoverHelp(target) {
    if (!hoverHelpActive || !target) return false;
    return !!target.closest('[data-allow-hover-help], #settingsButton, #settingsDialog');
  };
  var stopHoverHelp = function stopHoverHelp() {
    hoverHelpActive = false;
    hoverHelpCurrentTarget = null;
    if (hoverHelpTooltip) {
      removeNode(hoverHelpTooltip);
      hoverHelpTooltip = null;
    }
    clearHoverHelpHighlight();
    document.body.style.cursor = '';
    document.body.classList.remove('hover-help-active');
  };
  var startHoverHelp = function startHoverHelp() {
    hoverHelpActive = true;
    closeHelp();
    document.body.style.cursor = 'help';
    document.body.classList.add('hover-help-active');
    clearHoverHelpHighlight();
    hoverHelpTooltip = document.createElement('div');
    hoverHelpTooltip.id = 'hoverHelpTooltip';
    hoverHelpTooltip.setAttribute('role', 'tooltip');
    hoverHelpTooltip.setAttribute('hidden', '');
    document.body.appendChild(hoverHelpTooltip);
  };
  var refreshTooltipPosition = function refreshTooltipPosition() {
    if (hoverHelpActive && hoverHelpTooltip && hoverHelpCurrentTarget) {
      positionHoverHelpTooltip(hoverHelpCurrentTarget);
    }
  };
  document.addEventListener('mouseover', function (e) {
    if (!hoverHelpActive || !hoverHelpTooltip) return;
    recordPointerFromEvent(e);
    var target = findHoverHelpTarget(e.target);
    updateHoverHelpTooltip(target);
  });
  document.addEventListener('focusin', function (e) {
    if (!hoverHelpActive || !hoverHelpTooltip) return;
    hoverHelpPointerClientX = null;
    hoverHelpPointerClientY = null;
    var target = findHoverHelpTarget(e.target);
    updateHoverHelpTooltip(target);
  });
  document.addEventListener('focusout', function (e) {
    if (!hoverHelpActive || !hoverHelpTooltip) return;
    if (!e.relatedTarget || !findHoverHelpTarget(e.relatedTarget)) {
      hoverHelpCurrentTarget = null;
      hideHoverHelpTooltip();
    }
  });
  window.addEventListener('scroll', refreshTooltipPosition, true);
  window.addEventListener('resize', refreshTooltipPosition);
  var updatePointerPosition = function updatePointerPosition(e) {
    if (!recordPointerFromEvent(e)) return;
    if (hoverHelpCurrentTarget) {
      positionHoverHelpTooltip(hoverHelpCurrentTarget);
    }
  };
  if (typeof window !== 'undefined' && 'PointerEvent' in window) {
    window.addEventListener('pointermove', updatePointerPosition, true);
    window.addEventListener('pointerdown', updatePointerPosition, true);
  } else {
    window.addEventListener('mousemove', updatePointerPosition, true);
    window.addEventListener('mousedown', updatePointerPosition, true);
  }
  document.addEventListener('mousedown', function (e) {
    if (hoverHelpActive && !canInteractDuringHoverHelp(e.target)) {
      e.preventDefault();
    }
  }, true);
  document.addEventListener('click', function (e) {
    if (!hoverHelpActive) return;
    if (canInteractDuringHoverHelp(e.target)) {
      return;
    }
    e.preventDefault();
    stopHoverHelp();
  });
  if (hoverHelpButton) {
    hoverHelpButton.addEventListener('click', function (e) {
      e.stopPropagation();
      startHoverHelp();
    });
  }
  var focusFeatureSearchInput = function focusFeatureSearchInput() {
    if (!featureSearch) return;
    var sideMenu = document.getElementById('sideMenu');
    if (sideMenu !== null && sideMenu !== void 0 && sideMenu.contains(featureSearch)) {
      openSideMenu();
    }
    if (typeof featureSearch.scrollIntoView === 'function') {
      featureSearch.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
    try {
      featureSearch.focus({
        preventScroll: true
      });
    } catch (_unused17) {
      featureSearch.focus();
    }
    if (typeof featureSearch.select === 'function') {
      featureSearch.select();
    }
    if (!featureSearch.hasAttribute('data-skip-native-picker')) {
      safeShowPicker(featureSearch);
    }
  };
  runFeatureSearch = function runFeatureSearch(query) {
    var _featureSearch;
    var rawQuery = typeof query === 'string' ? query : ((_featureSearch = featureSearch) === null || _featureSearch === void 0 ? void 0 : _featureSearch.value) || '';
    var originalNormalized = normalizeSearchValue(rawQuery);
    var value = rawQuery.trim();
    if (!value) return;
    var hasFilterHelper = typeof extractFeatureSearchFilter === 'function';
    var filterData = hasFilterHelper ? extractFeatureSearchFilter(value) : {
      filterType: null,
      queryText: value
    };
    var filterType = (filterData === null || filterData === void 0 ? void 0 : filterData.filterType) || null;
    var filteredQuery = filterType ? filterData.queryText : value;
    var normalizedFiltered = typeof filteredQuery === 'string' ? filteredQuery.trim() : '';
    var lower = value.toLowerCase();
    var isHelpSuggestion = lower.endsWith(' (help)');
    var cleanSource = isHelpSuggestion ? value.slice(0, -7).trim() : normalizedFiltered || (typeof filteredQuery === 'string' ? filteredQuery.trim() : '');
    if (filterType === 'help' && !isHelpSuggestion && !cleanSource) {
      openHelp();
      if (helpSearch) {
        helpSearch.value = '';
        filterHelp();
        helpSearch.focus();
      }
      return;
    }
    var clean = cleanSource || (filterType ? '' : value);
    var cleanKey = searchKey(clean);
    var cleanTokens = searchTokens(clean);
    var helpMatch = findBestSearchMatch(helpMap, cleanKey, cleanTokens);
    var deviceMatch = findBestSearchMatch(deviceMap, cleanKey, cleanTokens);
    var featureMatch = findBestSearchMatch(featureMap, cleanKey, cleanTokens);
    var helpScore = (helpMatch === null || helpMatch === void 0 ? void 0 : helpMatch.score) || 0;
    var deviceScore = (deviceMatch === null || deviceMatch === void 0 ? void 0 : deviceMatch.score) || 0;
    var strongSearchMatchTypes = typeof STRONG_SEARCH_MATCH_TYPES !== 'undefined' && STRONG_SEARCH_MATCH_TYPES instanceof Set ? STRONG_SEARCH_MATCH_TYPES : FALLBACK_STRONG_SEARCH_MATCH_TYPES;
    var deviceStrong = deviceMatch ? strongSearchMatchTypes.has(deviceMatch.matchType) : false;
    var filterTargetsDevices = filterType === 'device';
    var filterTargetsActions = filterType === 'action';
    var filterTargetsFeatures = filterType === 'feature';
    var filterBlocksDevices = filterTargetsFeatures || filterTargetsActions;
    var normalizedFeatureMatch = function () {
      if (!featureMatch) return null;
      var entry = featureMatch.value;
      if (!entry) return null;
      var entryType = entry.entryType || 'feature';
      if (entryType === 'device') return null;
      if (filterTargetsDevices) return null;
      if (filterTargetsFeatures && entryType !== 'feature') return null;
      if (filterTargetsActions && entryType !== 'action') return null;
      return {
        match: featureMatch,
        entryType: entryType,
        entry: entry
      };
    }();
    var fallbackFeatureMatch = featureMatch && featureMatch.value && featureMatch.value.entryType !== 'device' ? featureMatch : null;
    var featureMatchForComparison = (normalizedFeatureMatch === null || normalizedFeatureMatch === void 0 ? void 0 : normalizedFeatureMatch.match) || fallbackFeatureMatch;
    var featureScore = (featureMatchForComparison === null || featureMatchForComparison === void 0 ? void 0 : featureMatchForComparison.score) || 0;
    var featureStrong = featureMatchForComparison ? strongSearchMatchTypes.has(featureMatchForComparison.matchType) : false;
    var bestNonHelpScore = Math.max(deviceScore, featureScore);
    var hasStrongNonHelp = deviceStrong || featureStrong;
    var preferHelp = !!helpMatch && (isHelpSuggestion || filterType === 'help' || !hasStrongNonHelp && helpScore > bestNonHelpScore);
    if (!isHelpSuggestion && !preferHelp) {
      var featureMatchType = featureMatchForComparison === null || featureMatchForComparison === void 0 ? void 0 : featureMatchForComparison.matchType;
      var shouldUseDevice = !filterBlocksDevices && !!deviceMatch && (!featureMatchForComparison || deviceStrong && !featureStrong || deviceStrong === featureStrong && (deviceScore > featureScore || deviceScore === featureScore && featureMatchType !== 'exactKey')) || filterTargetsDevices && !!deviceMatch;
      if (shouldUseDevice) {
        var device = deviceMatch.value;
        if (device && device.select) {
          device.select.value = device.value;
          device.select.dispatchEvent(new Event('change', {
            bubbles: true
          }));
          if (device.label) {
            updateFeatureSearchValue(device.label, originalNormalized);
          }
          if (typeof recordFeatureSearchUsage === 'function') {
            var deviceLabel = device.label;
            if (!deviceLabel && device.select) {
              var selectedOption = Array.from(device.select.options || []).find(function (opt) {
                return opt.value === device.value;
              });
              if (selectedOption && selectedOption.textContent) {
                deviceLabel = selectedOption.textContent.trim();
              }
            }
            recordFeatureSearchUsage(deviceMatch.key, 'device', deviceLabel);
          }
          focusFeatureElement(device.select);
          var highlightTargets = [device.select].concat(_toConsumableArray(findAssociatedLabelElements(device.select)));
          highlightFeatureSearchTargets(highlightTargets);
          return;
        }
      }
      if (normalizedFeatureMatch) {
        var feature = normalizedFeatureMatch.entry;
        var featureEl = (feature === null || feature === void 0 ? void 0 : feature.element) || feature;
        if (featureEl) {
          var _featureEl$textConten;
          var label = (feature === null || feature === void 0 ? void 0 : feature.label) || ((_featureEl$textConten = featureEl.textContent) === null || _featureEl$textConten === void 0 ? void 0 : _featureEl$textConten.trim());
          if (label) {
            updateFeatureSearchValue(label, originalNormalized);
          }
          if (typeof recordFeatureSearchUsage === 'function') {
            var _normalizedFeatureMat;
            var type = normalizedFeatureMatch.entryType || 'feature';
            var usageKey = ((_normalizedFeatureMat = normalizedFeatureMatch.match) === null || _normalizedFeatureMat === void 0 ? void 0 : _normalizedFeatureMat.key) || (featureMatch === null || featureMatch === void 0 ? void 0 : featureMatch.key);
            recordFeatureSearchUsage(usageKey, type, label);
          }
          focusFeatureElement(featureEl);
          var _highlightTargets = [featureEl].concat(_toConsumableArray(findAssociatedLabelElements(featureEl)));
          highlightFeatureSearchTargets(_highlightTargets);
          return;
        }
      }
    }
    if (helpMatch) {
      var helpEntry = helpMatch.value || {};
      var section = helpEntry.section;
      if (typeof recordFeatureSearchUsage === 'function') {
        recordFeatureSearchUsage(helpMatch.key, 'help', helpEntry.label);
      }
      openHelp();
      if (helpSearch) {
        helpSearch.value = clean;
        filterHelp();
      }
      if (section) {
        if (section.hasAttribute('hidden')) {
          section.removeAttribute('hidden');
          if (helpNoResults) {
            helpNoResults.setAttribute('hidden', '');
          }
          if (typeof helpNoResultsSuggestions !== 'undefined' && helpNoResultsSuggestions) {
            helpNoResultsSuggestions.setAttribute('hidden', '');
          }
          syncHelpQuickLinksVisibility();
        }
        if (typeof section.scrollIntoView === 'function') {
          section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
        highlightHelpSection(section);
        var sectionHeading = section.querySelector('h3, summary, h4, h5, h6, [role="heading"]') || section.querySelector('button, a');
        if (sectionHeading) {
          highlightFeatureSearchTargets([sectionHeading]);
        } else {
          highlightFeatureSearchTargets([section]);
        }
        var quickLink = section.id ? helpQuickLinkItems.get(section.id) : null;
        if (helpQuickLinksList) {
          helpQuickLinksList.querySelectorAll('.help-quick-link.active').forEach(function (btn) {
            return btn.classList.remove('active');
          });
        }
        if (quickLink && quickLink.button) {
          quickLink.button.classList.add('active');
        }
      }
      return;
    }
    openHelp();
    if (helpSearch) {
      helpSearch.value = clean;
      filterHelp();
      highlightFeatureSearchTargets([helpSearch]);
    }
  };
  if (featureSearch) {
    var featureSearchDropdown = document.getElementById('featureSearchDropdown');
    var getDropdownOptions = function getDropdownOptions() {
      if (!featureSearchDropdown) return [];
      return Array.from(featureSearchDropdown.querySelectorAll('[role="option"]') || []);
    };
    var clearFeatureSearchActiveState = function clearFeatureSearchActiveState() {
      var options = getDropdownOptions();
      options.forEach(function (option) {
        option.setAttribute('tabindex', '-1');
        option.setAttribute('aria-selected', 'false');
      });
      if (featureSearch && featureSearch.hasAttribute('aria-activedescendant')) {
        featureSearch.removeAttribute('aria-activedescendant');
      }
    };
    var setActiveDropdownOption = function setActiveDropdownOption(index) {
      var _ref23 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref23$focusOption = _ref23.focusOption,
        focusOption = _ref23$focusOption === void 0 ? false : _ref23$focusOption;
      var options = getDropdownOptions();
      if (!options.length) {
        if (featureSearch && featureSearch.hasAttribute('aria-activedescendant')) {
          featureSearch.removeAttribute('aria-activedescendant');
        }
        return null;
      }
      var bounded = Math.max(0, Math.min(index, options.length - 1));
      options.forEach(function (option, optIndex) {
        var isActive = optIndex === bounded;
        option.setAttribute('tabindex', isActive ? '0' : '-1');
        option.setAttribute('aria-selected', isActive ? 'true' : 'false');
        if (isActive) {
          if (featureSearch) {
            if (option.id) {
              featureSearch.setAttribute('aria-activedescendant', option.id);
            } else if (featureSearch.hasAttribute('aria-activedescendant')) {
              featureSearch.removeAttribute('aria-activedescendant');
            }
          }
          if (focusOption) {
            option.focus();
          }
        }
      });
      if (featureSearchDropdown) {
        featureSearchDropdown.dataset.activeIndex = String(bounded);
      }
      return options[bounded];
    };
    var closeFeatureSearchDropdown = function closeFeatureSearchDropdown() {
      if (!featureSearchDropdown) return;
      clearFeatureSearchActiveState();
      featureSearchDropdown.dataset.open = 'false';
      featureSearchDropdown.hidden = true;
      featureSearchDropdown.setAttribute('aria-expanded', 'false');
      featureSearchDropdown.dataset.activeIndex = '';
      if (featureSearch) {
        featureSearch.setAttribute('aria-expanded', 'false');
      }
      var container = featureSearchDropdown.closest('.feature-search');
      if (container) container.classList.remove('feature-search-open');
    };
    var openFeatureSearchDropdown = function openFeatureSearchDropdown() {
      if (!featureSearchDropdown) return;
      if (featureSearchDropdown.dataset.count === '0') {
        closeFeatureSearchDropdown();
        return;
      }
      featureSearchDropdown.dataset.open = 'true';
      featureSearchDropdown.hidden = false;
      featureSearchDropdown.setAttribute('aria-expanded', 'true');
      if (featureSearch) {
        featureSearch.setAttribute('aria-expanded', 'true');
      }
      var container = featureSearchDropdown.closest('.feature-search');
      if (container) container.classList.add('feature-search-open');
      var options = getDropdownOptions();
      if (!options.length) {
        if (featureSearch && featureSearch.hasAttribute('aria-activedescendant')) {
          featureSearch.removeAttribute('aria-activedescendant');
        }
        return;
      }
      var activeIndexAttr = featureSearchDropdown.dataset.activeIndex;
      var parsedIndex = typeof activeIndexAttr === 'string' && activeIndexAttr !== '' ? Number(activeIndexAttr) : NaN;
      var shouldFocusOption = document.activeElement && document.activeElement !== featureSearch;
      if (Number.isNaN(parsedIndex)) {
        setActiveDropdownOption(0, {
          focusOption: shouldFocusOption
        });
      } else {
        setActiveDropdownOption(parsedIndex, {
          focusOption: shouldFocusOption
        });
      }
    };
    var applyFeatureSearchSuggestion = function applyFeatureSearchSuggestion(value) {
      var _featureSearch$setSel, _featureSearch2;
      if (!featureSearch || !value) return;
      featureSearch.value = value;
      try {
        featureSearch.focus({
          preventScroll: true
        });
      } catch (_unused18) {
        featureSearch.focus();
      }
      (_featureSearch$setSel = (_featureSearch2 = featureSearch).setSelectionRange) === null || _featureSearch$setSel === void 0 || _featureSearch$setSel.call(_featureSearch2, value.length, value.length);
      updateFeatureSearchSuggestions(value);
      runFeatureSearch(value);
      closeFeatureSearchDropdown();
    };
    var handle = function handle() {
      closeFeatureSearchDropdown();
      runFeatureSearch(featureSearch.value);
    };
    featureSearch.addEventListener('change', handle);
    featureSearch.addEventListener('focus', function () {
      openFeatureSearchDropdown();
    });
    featureSearch.addEventListener('blur', function () {
      window.setTimeout(function () {
        if (!featureSearchDropdown || featureSearchDropdown.contains(document.activeElement)) {
          return;
        }
        closeFeatureSearchDropdown();
      }, 100);
    });
    featureSearch.addEventListener('input', function () {
      updateFeatureSearchSuggestions(featureSearch.value);
      openFeatureSearchDropdown();
    });
    featureSearch.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        handle();
      } else if (e.key === 'Escape') {
        if (featureSearch.value) {
          featureSearch.value = '';
          restoreFeatureSearchDefaults();
        }
        closeFeatureSearchDropdown();
        e.preventDefault();
      } else if (e.key === 'ArrowDown') {
        if (!featureSearchDropdown || featureSearchDropdown.dataset.count === '0') {
          return;
        }
        e.preventDefault();
        openFeatureSearchDropdown();
        var options = getDropdownOptions();
        var activeIndex = featureSearchDropdown.dataset.activeIndex;
        var nextIndex = activeIndex ? Number(activeIndex) + 1 : 0;
        setActiveDropdownOption(nextIndex >= options.length ? 0 : nextIndex, {
          focusOption: false
        });
      } else if (e.key === 'ArrowUp') {
        if (!featureSearchDropdown || featureSearchDropdown.dataset.count === '0') {
          return;
        }
        e.preventDefault();
        openFeatureSearchDropdown();
        var _options = getDropdownOptions();
        if (!_options.length) return;
        var _activeIndex = featureSearchDropdown.dataset.activeIndex;
        if (!_activeIndex) {
          setActiveDropdownOption(_options.length - 1, {
            focusOption: false
          });
        } else {
          var prevIndex = Number(_activeIndex) - 1;
          setActiveDropdownOption(prevIndex >= 0 ? prevIndex : _options.length - 1, {
            focusOption: false
          });
        }
      }
    });
    if (featureSearchDropdown) {
      featureSearchDropdown.addEventListener('mousedown', function (e) {
        var option = e.target.closest('[data-value]');
        if (option) {
          e.preventDefault();
        }
      });
      featureSearchDropdown.addEventListener('click', function (e) {
        var option = e.target.closest('[data-value]');
        if (!option) return;
        var value = option.getAttribute('data-value') || '';
        if (!value) return;
        applyFeatureSearchSuggestion(value);
      });
      featureSearchDropdown.addEventListener('keydown', function (e) {
        var options = getDropdownOptions();
        if (!options.length) return;
        var activeElement = document.activeElement;
        var currentIndex = options.indexOf(activeElement);
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          var nextIndex = currentIndex >= 0 ? currentIndex + 1 : 0;
          setActiveDropdownOption(nextIndex >= options.length ? 0 : nextIndex, {
            focusOption: true
          });
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          var prevIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
          setActiveDropdownOption(prevIndex, {
            focusOption: true
          });
        } else if (e.key === 'Home') {
          e.preventDefault();
          setActiveDropdownOption(0, {
            focusOption: true
          });
        } else if (e.key === 'End') {
          e.preventDefault();
          setActiveDropdownOption(options.length - 1, {
            focusOption: true
          });
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (currentIndex >= 0 && options[currentIndex]) {
            var value = options[currentIndex].getAttribute('data-value') || '';
            if (value) {
              applyFeatureSearchSuggestion(value);
            }
          }
        } else if (e.key === 'Escape') {
          e.preventDefault();
          closeFeatureSearchDropdown();
          focusFeatureSearchInput();
        } else if (e.key === 'Tab') {
          closeFeatureSearchDropdown();
        }
      });
      featureSearchDropdown.addEventListener('focusout', function () {
        window.setTimeout(function () {
          if (document.activeElement === featureSearch || featureSearchDropdown && featureSearchDropdown.contains(document.activeElement)) {
            return;
          }
          closeFeatureSearchDropdown();
        }, 100);
      });
    }
  }
  helpButton.addEventListener('click', toggleHelp);
  if (closeHelpBtn) closeHelpBtn.addEventListener('click', closeHelp);
  if (helpSearch) helpSearch.addEventListener('input', filterHelp);
  if (helpSearchClear) helpSearchClear.addEventListener('click', function () {
    if (helpSearch) {
      helpSearch.value = '';
      filterHelp();
      helpSearch.focus();
    }
  });
  function safeShowPicker(input) {
    if (!input || typeof input.showPicker !== 'function') return;
    try {
      input.showPicker();
    } catch (err) {
      if (err && err.name === 'NotAllowedError') return;
      console.warn('Unable to show picker', err);
    }
  }
  document.addEventListener('keydown', function (e) {
    var tag = document.activeElement.tagName;
    var isTextField = tag === 'INPUT' || tag === 'TEXTAREA';
    var key = typeof e.key === 'string' ? e.key : '';
    var lowerKey = key.toLowerCase();
    if (hoverHelpActive && e.key === 'Escape') {
      stopHoverHelp();
    } else if (e.key === 'Escape' && isDialogOpen(helpDialog)) {
      e.preventDefault();
      closeHelp();
    } else if (e.key === 'Escape' && settingsDialog && isDialogOpen(settingsDialog)) {
      e.preventDefault();
      revertSettingsPinkModeIfNeeded();
      rememberSettingsPinkModeBaseline();
      revertSettingsTemperatureUnitIfNeeded();
      rememberSettingsTemperatureUnitBaseline();
      revertSettingsFocusScaleIfNeeded();
      rememberSettingsFocusScaleBaseline();
      invokeSessionRevertAccentColor();
      closeDialog(settingsDialog);
      settingsDialog.setAttribute('hidden', '');
    } else if (e.key === 'F1' || (e.key === '/' || e.key === '?') && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      toggleHelp();
    } else if (e.key === '/' && !isTextField && (!helpDialog || !isDialogOpen(helpDialog))) {
      e.preventDefault();
      focusFeatureSearchInput();
    } else if (e.key === '?' && !isTextField || lowerKey === 'h' && !isTextField) {
      e.preventDefault();
      toggleHelp();
    } else if (isDialogOpen(helpDialog) && (e.key === '/' && !isTextField || lowerKey === 'f' && (e.ctrlKey || e.metaKey))) {
      e.preventDefault();
      if (helpSearch) helpSearch.focus();
    } else if (key === ',' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      requestSettingsOpen({
        reason: 'keyboard-shortcut',
        key: key,
        ctrl: !!e.ctrlKey,
        meta: !!e.metaKey,
        shift: !!e.shiftKey
      });
    } else if (lowerKey === 'k' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      focusFeatureSearchInput();
    } else if (lowerKey === 'd' && !isTextField) {
      setThemePreference(!getThemePreference());
    } else if (lowerKey === 's' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (saveSetupBtn && !saveSetupBtn.disabled) {
        saveSetupBtn.click();
      }
    } else if (lowerKey === 'p' && !isTextField) {
      persistPinkModePreference(!document.body.classList.contains('pink-mode'));
    }
  });
  helpDialog.addEventListener('click', function (e) {
    if (e.target === helpDialog) closeHelp();
  });
  helpDialog.addEventListener('cancel', function (e) {
    e.preventDefault();
    closeHelp();
  });
}
var scenarioIcons = {
  Indoor: iconGlyph("\uF194", ICON_FONT_KEYS.ESSENTIAL),
  Outdoor: iconGlyph("\uF278", ICON_FONT_KEYS.ESSENTIAL),
  Studio: iconGlyph("\uF128", ICON_FONT_KEYS.FILM),
  Tripod: iconGlyph("\uF12C", ICON_FONT_KEYS.FILM),
  Handheld: iconGlyph("\uE93B", ICON_FONT_KEYS.UICONS),
  Easyrig: iconGlyph("\uE15B", ICON_FONT_KEYS.UICONS),
  'Cine Saddle': iconGlyph("\uF01B", ICON_FONT_KEYS.UICONS),
  Steadybag: iconGlyph("\uE925", ICON_FONT_KEYS.UICONS),
  Dolly: iconGlyph("\uF109", ICON_FONT_KEYS.FILM),
  Slider: iconGlyph("\uE112", ICON_FONT_KEYS.UICONS),
  Steadicam: iconGlyph("\uEFBD", ICON_FONT_KEYS.UICONS),
  Gimbal: iconGlyph("\uEA9C", ICON_FONT_KEYS.UICONS),
  Trinity: iconGlyph("\uEA4E", ICON_FONT_KEYS.UICONS),
  Rollcage: iconGlyph("\uF04C", ICON_FONT_KEYS.UICONS),
  'Car Mount': iconGlyph("\uE35B", ICON_FONT_KEYS.UICONS),
  Jib: iconGlyph("\uE553", ICON_FONT_KEYS.UICONS),
  'Undersling mode': iconGlyph("\uE0D8", ICON_FONT_KEYS.UICONS),
  Crane: iconGlyph("\uE554", ICON_FONT_KEYS.UICONS),
  'Remote Head': ICON_GLYPHS.controller,
  'Extreme cold (snow)': iconGlyph("\uF0FB", ICON_FONT_KEYS.UICONS),
  'Extreme rain': iconGlyph("\uE4A6", ICON_FONT_KEYS.UICONS),
  'Extreme heat': iconGlyph("\uE80F", ICON_FONT_KEYS.UICONS),
  'Rain Machine': iconGlyph("\uF153", ICON_FONT_KEYS.UICONS),
  'Slow Motion': iconGlyph("\uF373", ICON_FONT_KEYS.UICONS),
  'Battery Belt': ICON_GLYPHS.batteryBolt
};
function registerRequiredScenarioOptionEntriesGetter(getter) {
  if (typeof getter !== 'function') {
    return;
  }
  var scopes = getSessionRuntimeScopes();
  for (var _index17 = 0; _index17 < scopes.length; _index17 += 1) {
    var _scope4 = scopes[_index17];
    if (!_scope4 || _typeof(_scope4) !== 'object') {
      continue;
    }
    try {
      _scope4.getRequiredScenarioOptionEntries = getter;
    } catch (assignError) {
      try {
        Object.defineProperty(_scope4, 'getRequiredScenarioOptionEntries', {
          configurable: true,
          writable: true,
          value: getter
        });
      } catch (defineError) {
        void defineError;
      }
    }
  }
}
function getRequiredScenarioOptionEntries() {
  var options = new Map();
  if (requiredScenariosSelect && requiredScenariosSelect.options) {
    Array.from(requiredScenariosSelect.options).forEach(function (option) {
      if (!option) return;
      if (option.disabled) return;
      var value = typeof option.value === 'string' ? option.value.trim() : '';
      if (!value) return;
      var label = typeof option.textContent === 'string' && option.textContent.trim() ? option.textContent.trim() : value;
      if (!options.has(value)) {
        options.set(value, label);
      }
    });
  }
  Object.keys(scenarioIcons).forEach(function (key) {
    if (typeof key !== 'string') return;
    var value = key.trim();
    if (!value || options.has(value)) {
      return;
    }
    options.set(value, value);
  });
  return Array.from(options.entries()).map(function (_ref24) {
    var _ref25 = _slicedToArray(_ref24, 2),
      value = _ref25[0],
      label = _ref25[1];
    return {
      value: value,
      label: label
    };
  }).sort(function (a, b) {
    return a.label.localeCompare(b.label, undefined, {
      sensitivity: 'base'
    });
  });
}
registerRequiredScenarioOptionEntriesGetter(getRequiredScenarioOptionEntries);
function updateRequiredScenariosSummary() {
  if (!requiredScenariosSelect || !requiredScenariosSummary) return;
  requiredScenariosSummary.innerHTML = '';
  var selected = Array.from(requiredScenariosSelect.selectedOptions).map(function (o) {
    return o.value;
  });
  var hasDolly = selected.includes('Dolly');
  if (remoteHeadOption) {
    if (!hasDolly) {
      remoteHeadOption.hidden = true;
      remoteHeadOption.selected = false;
      selected = selected.filter(function (v) {
        return v !== 'Remote Head';
      });
    } else {
      remoteHeadOption.hidden = false;
    }
  }
  if (hasDolly && monitorSelect && (!monitorSelect.value || monitorSelect.value === 'None')) {
    var _devices;
    var defaultMonitor = 'SmallHD Ultra 7';
    if ((_devices = devices) !== null && _devices !== void 0 && (_devices = _devices.monitors) !== null && _devices !== void 0 && _devices[defaultMonitor]) {
      if (!Array.from(monitorSelect.options).some(function (o) {
        return o.value === defaultMonitor;
      })) {
        var opt = document.createElement('option');
        opt.value = defaultMonitor;
        opt.textContent = defaultMonitor;
        monitorSelect.appendChild(opt);
      }
      monitorSelect.value = defaultMonitor;
      monitorSelect.dispatchEvent(new Event('change'));
    }
  }
  if (videoDistributionSelect) {
    var ensureOption = function ensureOption(val) {
      var opt = Array.from(videoDistributionSelect.options).find(function (o) {
        return o.value === val;
      });
      if (!opt) {
        opt = document.createElement('option');
        opt.value = val;
        opt.textContent = val;
        videoDistributionSelect.appendChild(opt);
      }
    };
    ensureOption('DoP Monitor 7" handheld');
    ensureOption('DoP Monitor 15-21"');
  }
  selected.forEach(function (val) {
    var box = document.createElement('span');
    box.className = 'scenario-box';
    var iconSpan = document.createElement('span');
    iconSpan.className = 'scenario-icon icon-glyph';
    applyIconGlyph(iconSpan, scenarioIcons[val] || ICON_GLYPHS.pin);
    box.appendChild(iconSpan);
    box.appendChild(document.createTextNode(val));
    requiredScenariosSummary.appendChild(box);
  });
  if (tripodPreferencesRow) {
    if (selected.includes('Tripod')) {
      tripodPreferencesRow.classList.remove('hidden');
      if (tripodPreferencesHeading) tripodPreferencesHeading.classList.remove('hidden');
      if (tripodPreferencesSection) tripodPreferencesSection.classList.remove('hidden');
    } else {
      tripodPreferencesRow.classList.add('hidden');
      if (tripodPreferencesHeading) tripodPreferencesHeading.classList.add('hidden');
      if (tripodPreferencesSection) tripodPreferencesSection.classList.add('hidden');
      if (tripodHeadBrandSelect) tripodHeadBrandSelect.value = '';
      if (tripodBowlSelect) tripodBowlSelect.value = '';
      if (tripodTypesSelect) Array.from(tripodTypesSelect.options).forEach(function (o) {
        o.selected = false;
      });
      if (tripodSpreaderSelect) tripodSpreaderSelect.value = '';
      updateTripodOptions();
    }
  }
}
function initApp() {
  try {
    ensureCriticalStorageBackupsFn();
  } catch (criticalGuardError) {
    if (typeof console !== 'undefined' && typeof console.error === 'function') {
      console.error('Critical storage backup guard failed during initialization', criticalGuardError);
    }
  }
  var resolvedFilterSelect = resolveFilterSelectElement();
  if (sharedLinkRow) {
    sharedLinkRow.classList.remove('hidden');
  }
  applySetLanguage(currentLang);
  populateEnvironmentDropdowns();
  populateLensDropdown();
  populateFilterDropdown();
  if (resolvedFilterSelect) {
    resolvedFilterSelect.addEventListener('change', renderFilterDetails);
    resolvedFilterSelect.addEventListener('change', function () {
      saveCurrentSession();
      saveCurrentGearList();
      checkSetupChanged();
    });
    renderFilterDetails();
  }
  populateUserButtonDropdowns();
  schedulePostRenderTask(function () {
    document.querySelectorAll('#projectForm select').forEach(function (sel) {
      attachSelectSearch(sel);
      callSessionCoreFunction('initFavoritableSelect', [sel], {
        defer: true
      });
    });
  });
  schedulePostRenderTask(function () {
    if (typeof globalThis !== 'undefined' && typeof globalThis.setupInstallBanner === 'function') {
      try {
        globalThis.setupInstallBanner();
      } catch (installError) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('Failed to set up install banner', installError);
        }
      }
    }
    if (typeof maybeShowIosPwaHelp === 'function') {
      try {
        maybeShowIosPwaHelp();
      } catch (iosHelpError) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('Failed to display iOS PWA help prompt', iosHelpError);
        }
      }
    }
  });
  resetDeviceForm();
  ensureDefaultProjectInfoSnapshot();
  restoreSessionState();
  applySharedSetupFromUrl();
  if (requiredScenariosSelect) {
    requiredScenariosSelect.addEventListener('change', updateRequiredScenariosSummary);
    updateRequiredScenariosSummary();
  }
  if (tripodHeadBrandSelect) {
    tripodHeadBrandSelect.addEventListener('change', updateTripodOptions);
  }
  if (tripodBowlSelect) {
    tripodBowlSelect.addEventListener('change', updateTripodOptions);
  }
  updateTripodOptions();
  updateViewfinderExtensionVisibility();
  updateCalculations();
  applyFilters();
}
function ensureFeedbackTemperatureOptionsSafe(select) {
  if (!select) return;
  if (typeof ensureFeedbackTemperatureOptions === 'function') {
    ensureFeedbackTemperatureOptions(select);
    return;
  }
  var minTemp = typeof FEEDBACK_TEMPERATURE_MIN === 'number' ? FEEDBACK_TEMPERATURE_MIN : -20;
  var maxTemp = typeof FEEDBACK_TEMPERATURE_MAX === 'number' ? FEEDBACK_TEMPERATURE_MAX : 50;
  var expectedOptions = maxTemp - minTemp + 2;
  if (select.options.length === expectedOptions) {
    return;
  }
  var previousValue = select.value;
  select.innerHTML = '';
  var emptyOpt = document.createElement('option');
  emptyOpt.value = '';
  emptyOpt.textContent = '';
  select.appendChild(emptyOpt);
  for (var temp = minTemp; temp <= maxTemp; temp += 1) {
    var opt = document.createElement('option');
    opt.value = String(temp);
    opt.textContent = String(temp);
    select.appendChild(opt);
  }
  if (previousValue) {
    var previousOption = Array.from(select.options).find(function (option) {
      return option.value === previousValue;
    });
    if (previousOption) {
      select.value = previousValue;
    }
  }
}
function updateFeedbackTemperatureOptionsSafe() {
  if (typeof updateFeedbackTemperatureOptions === 'function') {
    updateFeedbackTemperatureOptions();
    return;
  }
  var tempSelect = document.getElementById('fbTemperature');
  if (!tempSelect) return;
  ensureFeedbackTemperatureOptionsSafe(tempSelect);
  Array.from(tempSelect.options).forEach(function (option) {
    if (!option) return;
    if (option.value === '') {
      option.textContent = '';
      return;
    }
    option.textContent = "".concat(option.value, "\xB0C");
  });
}
var POST_RENDER_TIMEOUT_MS = 120;
function schedulePostRenderTask(task) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (typeof task !== 'function') {
    return;
  }
  var timeout = typeof options.timeout === 'number' && options.timeout >= 0 ? options.timeout : POST_RENDER_TIMEOUT_MS;
  var runTaskSafely = function runTaskSafely(deadline) {
    try {
      task(deadline);
    } catch (taskError) {
      if (typeof console !== 'undefined' && typeof console.error === 'function') {
        console.error('Deferred task failed during post-render scheduling', taskError);
      }
    }
  };
  var scheduleIdle = function scheduleIdle() {
    if (typeof requestIdleCallback === 'function') {
      requestIdleCallback(runTaskSafely, {
        timeout: timeout
      });
      return;
    }
    setTimeout(runTaskSafely, timeout);
  };
  if (typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(scheduleIdle);
  } else {
    scheduleIdle();
  }
}
function populateEnvironmentDropdowns() {
  var tempSelect = document.getElementById('fbTemperature');
  if (tempSelect) {
    ensureFeedbackTemperatureOptionsSafe(tempSelect);
    updateFeedbackTemperatureOptionsSafe();
  }
}
function populateLensDropdown() {
  if (!lensSelect) return;
  var normalizeFocusScaleValue = function normalizeFocusScaleValue(value) {
    if (typeof value !== 'string') {
      return '';
    }
    var normalized = value.trim().toLowerCase();
    return normalized === 'imperial' || normalized === 'metric' ? normalized : '';
  };
  var resolveFocusScaleMode = function resolveFocusScaleMode() {
    var scope = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
    var scopePreference = scope && typeof scope.focusScalePreference === 'string' ? scope.focusScalePreference : null;
    var fallbackPreference = typeof sessionFocusScale !== 'undefined' && sessionFocusScale ? sessionFocusScale : typeof focusScalePreference === 'string' ? focusScalePreference : null;
    var rawPreference = scopePreference || fallbackPreference || 'metric';
    if (typeof normalizeFocusScale === 'function') {
      try {
        var _normalized2 = normalizeFocusScale(rawPreference);
        if (_normalized2 === 'imperial' || _normalized2 === 'metric') {
          return _normalized2;
        }
      } catch (normalizeError) {
        void normalizeError;
      }
    }
    var normalized = normalizeFocusScaleValue(rawPreference);
    return normalized || 'metric';
  };
  var focusScaleMode = resolveFocusScaleMode();
  var useImperialFocusScale = focusScaleMode === 'imperial';
  var resolveLensFocusScaleMode = function resolveLensFocusScaleMode(lens) {
    if (!lens || _typeof(lens) !== 'object') {
      return focusScaleMode;
    }
    if (typeof normalizeFocusScale === 'function') {
      try {
        var normalized = normalizeFocusScale(lens.focusScale);
        if (normalized === 'imperial' || normalized === 'metric') {
          return normalized;
        }
      } catch (lensNormalizeError) {
        void lensNormalizeError;
      }
    }
    var override = normalizeFocusScaleValue(lens.focusScale);
    return override || focusScaleMode;
  };
  var _resolveCompatibility5 = resolveCompatibilityTexts(),
    focusScaleLang = _resolveCompatibility5.lang;
  var formatLensNumber = function formatLensNumber(value) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var numeric = typeof value === 'string' ? Number(value) : value;
    if (!Number.isFinite(numeric)) {
      return '';
    }
    var maximumFractionDigits = typeof options.maximumFractionDigits === 'number' ? options.maximumFractionDigits : 0;
    var minimumFractionDigits = typeof options.minimumFractionDigits === 'number' ? options.minimumFractionDigits : Math.min(0, maximumFractionDigits);
    if (typeof Intl !== 'undefined' && typeof Intl.NumberFormat === 'function') {
      try {
        return new Intl.NumberFormat(focusScaleLang, {
          maximumFractionDigits: maximumFractionDigits,
          minimumFractionDigits: minimumFractionDigits
        }).format(numeric);
      } catch (formatError) {
        void formatError;
      }
    }
    var digits = Math.max(minimumFractionDigits, Math.min(20, maximumFractionDigits));
    try {
      return numeric.toFixed(digits);
    } catch (toFixedError) {
      void toFixedError;
    }
    return String(numeric);
  };
  var formatLensWeight = function formatLensWeight(value) {
    var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : focusScaleMode;
    var numeric = typeof value === 'string' ? Number(value) : value;
    if (!Number.isFinite(numeric)) {
      return '';
    }
    var useImperial = mode === 'imperial';
    if (useImperial) {
      var pounds = numeric / 453.59237;
      var digits = pounds >= 10 ? 1 : 2;
      var _formatted = formatLensNumber(pounds, {
        maximumFractionDigits: digits,
        minimumFractionDigits: 0
      });
      return _formatted ? "".concat(_formatted, " lb") : '';
    }
    var formatted = formatLensNumber(numeric, {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0
    });
    return formatted ? "".concat(formatted, " g") : '';
  };
  var formatLensDiameter = function formatLensDiameter(value) {
    var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : focusScaleMode;
    var numeric = typeof value === 'string' ? Number(value) : value;
    if (!Number.isFinite(numeric)) {
      return '';
    }
    var useImperial = mode === 'imperial';
    if (useImperial) {
      var inches = numeric / 25.4;
      var digits = inches >= 10 ? 1 : 2;
      var _formatted2 = formatLensNumber(inches, {
        maximumFractionDigits: digits,
        minimumFractionDigits: 0
      });
      return _formatted2 ? "".concat(_formatted2, " in") : '';
    }
    var formatted = formatLensNumber(numeric, {
      maximumFractionDigits: 1,
      minimumFractionDigits: 0
    });
    return formatted ? "".concat(formatted, " mm") : '';
  };
  var formatLensMinFocus = function formatLensMinFocus(value) {
    var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : focusScaleMode;
    var numeric = typeof value === 'string' ? Number(value) : value;
    if (!Number.isFinite(numeric)) {
      return '';
    }
    var useImperial = mode === 'imperial';
    if (useImperial) {
      var feet = numeric * 3.280839895;
      var _digits = feet < 10 ? 2 : 1;
      var _formatted3 = formatLensNumber(feet, {
        maximumFractionDigits: _digits,
        minimumFractionDigits: _digits
      });
      return _formatted3 ? "".concat(_formatted3, " ft") : '';
    }
    var digits = numeric < 1 ? 2 : 1;
    var formatted = formatLensNumber(numeric, {
      maximumFractionDigits: digits,
      minimumFractionDigits: digits
    });
    return formatted ? "".concat(formatted, " m") : '';
  };
  var lensData = (devices && devices.lenses && Object.keys(devices.lenses).length ? devices.lenses : null) || devices && devices.accessories && devices.accessories.lenses || null;
  if (!lensData || Object.keys(lensData).length === 0) {
    return;
  }
  var previousSelection = new Set(Array.from(lensSelect.selectedOptions || []).map(function (opt) {
    return opt.value;
  }));
  var fragment = document.createDocumentFragment();
  if (!lensSelect.multiple) {
    var emptyOpt = document.createElement('option');
    emptyOpt.value = '';
    fragment.appendChild(emptyOpt);
  }
  var lensNames = Object.keys(lensData);
  var sortFn = typeof localeSort === 'function' ? localeSort : undefined;
  lensNames.sort(sortFn);
  for (var _index18 = 0; _index18 < lensNames.length; _index18 += 1) {
    var _ref26, _lens$minFocusMeters;
    var name = lensNames[_index18];
    var opt = document.createElement('option');
    opt.value = name;
    var lens = lensData[name] || {};
    var lensFocusScaleMode = resolveLensFocusScaleMode(lens);
    var attrs = [];
    var formattedWeight = formatLensWeight(lens.weight_g, lensFocusScaleMode);
    if (formattedWeight) attrs.push(formattedWeight);
    if (lens.clampOn) {
      if (lens.frontDiameterMm) {
        var formattedDiameter = formatLensDiameter(lens.frontDiameterMm, lensFocusScaleMode);
        attrs.push(formattedDiameter ? "".concat(formattedDiameter, " clamp-on") : 'clamp-on');
      } else attrs.push('clamp-on');
    } else if (lens.clampOn === false) {
      attrs.push('no clamp-on');
    }
    var minFocus = (_ref26 = (_lens$minFocusMeters = lens.minFocusMeters) !== null && _lens$minFocusMeters !== void 0 ? _lens$minFocusMeters : lens.minFocus) !== null && _ref26 !== void 0 ? _ref26 : lens.minFocusCm ? lens.minFocusCm / 100 : null;
    if (Number.isFinite(minFocus) && minFocus > 0) {
      var formattedMinFocus = formatLensMinFocus(minFocus, lensFocusScaleMode);
      if (formattedMinFocus) {
        attrs.push("".concat(formattedMinFocus, " min focus"));
      }
    }
    opt.textContent = attrs.length ? "".concat(name, " (").concat(attrs.join(', '), ")") : name;
    if (previousSelection.has(name)) {
      opt.selected = true;
    }
    fragment.appendChild(opt);
  }
  lensSelect.innerHTML = '';
  lensSelect.appendChild(fragment);
  if (typeof updateLensWorkflowCatalog === 'function') {
    try {
      updateLensWorkflowCatalog({
        preserveSelections: true,
        skipEvent: true,
        skipDirty: true
      });
    } catch (catalogError) {
      void catalogError;
    }
  }
}
function populateCameraPropertyDropdown(selectId, property) {
  var selected = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var dropdown = document.getElementById(selectId);
  if (!dropdown) return;
  dropdown.innerHTML = '';
  var emptyOpt = document.createElement('option');
  emptyOpt.value = '';
  dropdown.appendChild(emptyOpt);
  var camKey = cameraSelect && cameraSelect.value;
  var values = camKey && devices && devices.cameras && devices.cameras[camKey] ? devices.cameras[camKey][property] : null;
  if (Array.isArray(values)) {
    values.forEach(function (v) {
      var opt = document.createElement('option');
      opt.value = v;
      opt.textContent = v;
      if (v === selected) opt.selected = true;
      dropdown.appendChild(opt);
    });
  }
}
function populateRecordingResolutionDropdown() {
  var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  populateCameraPropertyDropdown('recordingResolution', 'resolutions', selected);
}
var recordingFrameRateInput = typeof document !== 'undefined' ? document.getElementById('recordingFrameRate') : null;
var recordingFrameRateHint = typeof document !== 'undefined' ? document.getElementById('recordingFrameRateHint') : null;
var recordingFrameRateOptionsList = typeof document !== 'undefined' ? document.getElementById('recordingFrameRateOptions') : null;
slowMotionRecordingFrameRateInput = typeof document !== 'undefined' ? document.getElementById('slowMotionRecordingFrameRate') : null;
slowMotionRecordingFrameRateHint = typeof document !== 'undefined' ? document.getElementById('slowMotionRecordingFrameRateHint') : null;
slowMotionRecordingFrameRateOptionsList = typeof document !== 'undefined' ? document.getElementById('slowMotionRecordingFrameRateOptions') : null;
sensorModeDropdown = typeof document !== 'undefined' ? document.getElementById('sensorMode') : null;
slowMotionSensorModeDropdown = typeof document !== 'undefined' ? document.getElementById('slowMotionSensorMode') : null;
recordingResolutionDropdown = typeof document !== 'undefined' ? document.getElementById('recordingResolution') : null;
slowMotionRecordingResolutionDropdown = typeof document !== 'undefined' ? document.getElementById('slowMotionRecordingResolution') : null;
slowMotionAspectRatioSelect = typeof document !== 'undefined' ? document.getElementById('slowMotionAspectRatio') : null;
var PREFERRED_FRAME_RATE_VALUES = Object.freeze([0.75, 1, 8, 12, 12.5, 15, 23.976, 24, 25, 29.97, 30, 47.952, 48, 50, 59.94, 60, 72, 75, 90, 96, 100, 110, 112, 120, 144, 150, 160, 170, 180, 200, 240]);
var FALLBACK_FRAME_RATE_VALUES = Object.freeze(['0.75', '1', '8', '12', '12.5', '15', '23.976', '24', '25', '29.97', '30', '48', '50', '59.94', '60', '72', '75', '90', '96', '100', '110', '112', '120', '144', '150', '160', '170', '180', '200', '240']);
var MIN_RECORDING_FRAME_RATE = 1;
var FRAME_RATE_RANGE_TOLERANCE = 0.0005;
function formatFrameRateValue(value) {
  var numeric = typeof value === 'number' ? value : Number.parseFloat(value);
  if (!Number.isFinite(numeric)) return '';
  var rounded = Math.round(numeric * 1000) / 1000;
  if (Number.isInteger(rounded)) {
    return String(rounded);
  }
  return rounded.toFixed(3).replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');
}
function tokenizeFrameRateContext(value) {
  if (typeof value !== 'string' || !value) return [];
  return value.toLowerCase().replace(/[\u2013\u2014]/g, '-').replace(/[()]/g, ' ').replace(/[[\]]/g, ' ').split(/[\s,/]+/).map(function (token) {
    return token.replace(/[^a-z0-9:.+-]/g, '').replace(/^[:.+-]+|[:.+-]+$/g, '');
  }).filter(function (token) {
    return token && token !== 'fps';
  });
}
function normalizeMatchTarget(value) {
  if (typeof value !== 'string' || !value) {
    return '';
  }
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}
function includePreferredValuesForRange(minValue, maxValue, set) {
  if (!Number.isFinite(minValue) || !Number.isFinite(maxValue) || !set) {
    return;
  }
  var low = Math.min(minValue, maxValue);
  var high = Math.max(minValue, maxValue);
  PREFERRED_FRAME_RATE_VALUES.forEach(function (candidate) {
    if (candidate >= low - 0.0005 && candidate <= high + 0.0005) {
      var formatted = formatFrameRateValue(candidate);
      if (formatted) {
        set.add(formatted);
      }
    }
  });
}
function parseFrameRateNumericValues(entry) {
  if (typeof entry !== 'string' || !entry.trim()) {
    return [];
  }
  var normalized = entry.replace(/[\u2013\u2014]/g, '-');
  var parts = normalized.split(':');
  var numericSection = parts.length > 1 ? parts.slice(1).join(':') : normalized;
  var values = new Set();
  var rangePattern = /(\d+(?:\.\d+)?)(?:\s*(?:-|to)\s*)(\d+(?:\.\d+)?)(?=\s*(?:fps|FPS))/g;
  var match = rangePattern.exec(numericSection);
  while (match) {
    var minStr = match[1];
    var maxStr = match[2];
    var minVal = Number.parseFloat(minStr);
    var maxVal = Number.parseFloat(maxStr);
    var minFormatted = formatFrameRateValue(minVal);
    var maxFormatted = formatFrameRateValue(maxVal);
    if (minFormatted) values.add(minFormatted);
    if (maxFormatted) values.add(maxFormatted);
    includePreferredValuesForRange(minVal, maxVal, values);
    match = rangePattern.exec(numericSection);
  }
  var upToPattern = /(?:up to|≤|<=|less than|max(?:imum)?(?:\s*of)?)\s*(\d+(?:\.\d+)?)(?=\s*(?:fps|FPS))/gi;
  while (match = upToPattern.exec(numericSection)) {
    var formatted = formatFrameRateValue(match[1]);
    if (formatted) {
      values.add(formatted);
      includePreferredValuesForRange(0, Number.parseFloat(match[1]), values);
    }
  }
  var explicitPattern = /(\d+(?:\.\d+)?)(?=\s*(?:fps|FPS))/g;
  while (match = explicitPattern.exec(numericSection)) {
    var _formatted4 = formatFrameRateValue(match[1]);
    if (_formatted4) {
      values.add(_formatted4);
    }
  }
  if (!values.size) {
    var commaSection = numericSection.split('fps')[0] || numericSection;
    var listPattern = /(\d+(?:\.\d+)?)/g;
    while (match = listPattern.exec(commaSection)) {
      var _formatted5 = formatFrameRateValue(match[1]);
      if (_formatted5) {
        values.add(_formatted5);
      }
    }
  }
  return Array.from(values);
}
function normalizeRecordingFrameRateValue(value) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return formatFrameRateValue(value);
  }
  if (typeof value !== 'string') return '';
  var trimmed = value.trim();
  if (!trimmed) return '';
  var numericMatch = trimmed.match(/-?\d+(?:\.\d+)?/);
  if (!numericMatch) {
    return trimmed;
  }
  return formatFrameRateValue(numericMatch[0]) || trimmed;
}
function buildFrameRateSuggestions(entries, contextTokens) {
  var suggestions = new Map();
  var groups = contextTokens.filter(function (group) {
    return Array.isArray(group) && group.length;
  });
  entries.forEach(function (entry) {
    if (typeof entry !== 'string') return;
    var cleaned = entry.trim();
    if (!cleaned) return;
    var _cleaned$split = cleaned.split(':'),
      _cleaned$split2 = _slicedToArray(_cleaned$split, 1),
      label = _cleaned$split2[0];
    var entryTokens = tokenizeFrameRateContext(label);
    var numericValues = parseFrameRateNumericValues(cleaned);
    var baseScore = entryTokens.length ? 1 : 0;
    var score = baseScore;
    if (groups.length && entryTokens.length) {
      var tokenSet = new Set(entryTokens);
      groups.forEach(function (group) {
        var matches = 0;
        group.forEach(function (token) {
          if (tokenSet.has(token)) {
            matches += 1;
          }
        });
        if (matches) {
          score += matches * 3;
          if (matches === group.length) {
            score += 2;
          }
        }
      });
    }
    numericValues.forEach(function (rawValue) {
      var formatted = formatFrameRateValue(rawValue);
      if (!formatted) return;
      var existing = suggestions.get(formatted);
      if (!existing || score > existing.score) {
        suggestions.set(formatted, {
          score: score,
          label: cleaned,
          tokens: entryTokens
        });
      }
    });
  });
  if (!suggestions.size) {
    return {
      values: Array.from(FALLBACK_FRAME_RATE_VALUES),
      metadata: new Map()
    };
  }
  var sortedEntries = Array.from(suggestions.entries()).sort(function (a, b) {
    if (b[1].score !== a[1].score) {
      return b[1].score - a[1].score;
    }
    var aNum = Number.parseFloat(a[0]);
    var bNum = Number.parseFloat(b[0]);
    if (Number.isFinite(aNum) && Number.isFinite(bNum)) {
      return aNum - bNum;
    }
    return a[0].localeCompare(b[0]);
  });
  return {
    values: sortedEntries.map(function (_ref27) {
      var _ref28 = _slicedToArray(_ref27, 1),
        value = _ref28[0];
      return value;
    }),
    metadata: new Map(sortedEntries)
  };
}
function findMaxFrameRateForSensor(entries, sensorTokens) {
  var sensorLabel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  if (!Array.isArray(entries) || !entries.length) {
    return null;
  }
  if (!Array.isArray(sensorTokens) || !sensorTokens.length) {
    return null;
  }
  var sensorTokenSet = new Set(sensorTokens);
  if (!sensorTokenSet.size) {
    return null;
  }
  var normalizedSensorLabel = normalizeMatchTarget(sensorLabel);
  var normalizedSensorTokens = new Set(sensorTokens.map(normalizeMatchTarget).filter(Boolean));
  var bestMatchScore = 0;
  var bestMaxValue = Number.NEGATIVE_INFINITY;
  entries.forEach(function (entry) {
    if (typeof entry !== 'string') return;
    var cleaned = entry.trim();
    if (!cleaned) return;
    var _cleaned$split3 = cleaned.split(':'),
      _cleaned$split4 = _slicedToArray(_cleaned$split3, 1),
      label = _cleaned$split4[0];
    var entryTokens = tokenizeFrameRateContext(label);
    var numericValues = parseFrameRateNumericValues(cleaned).map(function (value) {
      return Number.parseFloat(value);
    }).filter(Number.isFinite);
    if (!numericValues.length) {
      return;
    }
    var matchScore = 0;
    var normalizedEntryLabel = normalizeMatchTarget(label);
    var normalizedEntryTokens = entryTokens.map(normalizeMatchTarget).filter(Boolean);
    entryTokens.forEach(function (token) {
      if (sensorTokenSet.has(token)) {
        matchScore += 4;
      }
    });
    normalizedEntryTokens.forEach(function (entryToken) {
      if (normalizedSensorTokens.has(entryToken)) {
        matchScore += 2;
        return;
      }
      var _iterator3 = _createForOfIteratorHelper(normalizedSensorTokens),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var sensorToken = _step3.value;
          if (sensorToken && entryToken.includes(sensorToken)) {
            matchScore += 1;
            break;
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    });
    if (normalizedSensorLabel && normalizedEntryLabel && normalizedEntryLabel.includes(normalizedSensorLabel)) {
      matchScore += Math.max(sensorTokenSet.size * 4, 8);
    }
    if (!matchScore) {
      return;
    }
    var entryMaxValue = Math.max.apply(Math, _toConsumableArray(numericValues));
    if (matchScore > bestMatchScore || matchScore === bestMatchScore && entryMaxValue > bestMaxValue) {
      bestMatchScore = matchScore;
      bestMaxValue = entryMaxValue;
    }
  });
  if (!bestMatchScore || !Number.isFinite(bestMaxValue)) {
    return null;
  }
  return bestMaxValue;
}
function getFrameRateInputValue(input) {
  if (!input) return '';
  var raw = input.value;
  return typeof raw === 'string' ? raw.trim() : '';
}
function getCurrentFrameRateInputValue() {
  return getFrameRateInputValue(recordingFrameRateInput);
}
function collectFrameRateContextTokens(select) {
  if (!select) {
    return [];
  }
  if (select.multiple) {
    var combined = [];
    Array.prototype.slice.call(select.selectedOptions || []).forEach(function (option) {
      var tokens = tokenizeFrameRateContext(option && option.value);
      if (tokens && tokens.length) {
        combined = combined.concat(tokens);
      }
    });
    return combined;
  }
  var value = typeof select.value === 'string' ? select.value : '';
  return tokenizeFrameRateContext(value);
}
function populateFrameRateDropdownFor(config) {
  var options = typeof config === 'object' && config ? config : {};
  var selected = typeof options.selected === 'string' ? options.selected : options.selected || '';
  var recordingInput = options.recordingInput;
  var optionsList = options.optionsList;
  var sensorSelect = options.sensorSelect;
  var resolutionSelect = options.resolutionSelect;
  var aspectSelect = options.aspectSelect;
  var hintElement = options.hintElement;
  if (!recordingInput || !optionsList) {
    return;
  }
  var normalizedSelected = normalizeRecordingFrameRateValue(selected);
  var currentValue = normalizedSelected || getFrameRateInputValue(recordingInput);
  var camKey = cameraSelect && cameraSelect.value;
  var frameRateEntries = camKey && devices && devices.cameras && devices.cameras[camKey] ? devices.cameras[camKey].frameRates : null;
  var sensorValue = sensorSelect && typeof sensorSelect.value === 'string' ? sensorSelect.value : '';
  var sensorTokens = tokenizeFrameRateContext(sensorValue);
  var resolutionValue = resolutionSelect && typeof resolutionSelect.value === 'string' ? resolutionSelect.value : '';
  var resolutionTokens = tokenizeFrameRateContext(resolutionValue);
  var aspectTokens = collectFrameRateContextTokens(aspectSelect);
  var sensorModeMaxFrameRate = findMaxFrameRateForSensor(Array.isArray(frameRateEntries) ? frameRateEntries : [], sensorTokens, sensorValue);
  var suggestionResult = buildFrameRateSuggestions(Array.isArray(frameRateEntries) ? frameRateEntries : [], [sensorTokens, resolutionTokens, aspectTokens]);
  var suggestions = suggestionResult.values;
  optionsList.innerHTML = '';
  var uniqueValues = new Set();
  var filteredSuggestions = [];
  var numericCandidates = [];
  var allowedMaxFrameRate = Number.isFinite(sensorModeMaxFrameRate) ? sensorModeMaxFrameRate : null;
  suggestions.forEach(function (originalValue) {
    if (!originalValue) return;
    var value = originalValue;
    var numeric = Number.parseFloat(value);
    if (Number.isFinite(numeric)) {
      if (numeric + FRAME_RATE_RANGE_TOLERANCE < MIN_RECORDING_FRAME_RATE) {
        return;
      }
      if (allowedMaxFrameRate !== null && numeric > allowedMaxFrameRate + FRAME_RATE_RANGE_TOLERANCE) {
        return;
      }
      var formatted = formatFrameRateValue(numeric);
      if (formatted) {
        value = formatted;
      }
      numericCandidates.push({
        numeric: numeric,
        formatted: value
      });
    }
    if (uniqueValues.has(value)) return;
    uniqueValues.add(value);
    filteredSuggestions.push(value);
    var opt = document.createElement('option');
    opt.value = value;
    optionsList.appendChild(opt);
  });
  if (currentValue && !uniqueValues.has(currentValue)) {
    var numericForList = Number.parseFloat(currentValue);
    if (!Number.isFinite(numericForList) || numericForList + FRAME_RATE_RANGE_TOLERANCE >= MIN_RECORDING_FRAME_RATE) {
      var existingOpt = document.createElement('option');
      existingOpt.value = currentValue;
      optionsList.appendChild(existingOpt);
    }
  }
  var maxCandidate = numericCandidates.reduce(function (best, entry) {
    return entry.numeric > best.numeric ? entry : best;
  }, {
    numeric: Number.NEGATIVE_INFINITY,
    formatted: ''
  });
  var maxFrameRate = maxCandidate.numeric;
  if (Number.isFinite(allowedMaxFrameRate)) {
    maxFrameRate = Number.isFinite(maxFrameRate) ? Math.min(maxFrameRate, allowedMaxFrameRate) : allowedMaxFrameRate;
  }
  var formattedMaxFrameRate = Number.isFinite(maxFrameRate) ? maxCandidate.formatted || formatFrameRateValue(maxFrameRate) : '';
  var minValue = formatFrameRateValue(MIN_RECORDING_FRAME_RATE);
  var numericCurrent = Number.parseFloat(currentValue);
  var adjustedValue = currentValue;
  var valueChanged = false;
  if (Number.isFinite(maxFrameRate) && Number.isFinite(numericCurrent) && numericCurrent > maxFrameRate + FRAME_RATE_RANGE_TOLERANCE) {
    var clampedValue = formattedMaxFrameRate || formatFrameRateValue(maxFrameRate);
    if (clampedValue) {
      adjustedValue = clampedValue;
      if (adjustedValue !== currentValue) {
        valueChanged = true;
      }
    }
  }
  if (minValue && Number.isFinite(numericCurrent) && numericCurrent + FRAME_RATE_RANGE_TOLERANCE < MIN_RECORDING_FRAME_RATE) {
    adjustedValue = minValue;
    if (adjustedValue !== currentValue) {
      valueChanged = true;
    }
  }
  if (valueChanged) {
    recordingInput.value = adjustedValue;
    currentValue = adjustedValue;
    recordingInput.dispatchEvent(new Event('input', {
      bubbles: true
    }));
  } else {
    recordingInput.value = currentValue;
  }
  var placeholderCandidate = filteredSuggestions[0];
  if (!currentValue && placeholderCandidate) {
    recordingInput.placeholder = placeholderCandidate;
  } else if (recordingInput.placeholder) {
    recordingInput.placeholder = '';
  }
  if (minValue) {
    recordingInput.min = minValue;
  }
  if (formattedMaxFrameRate) {
    recordingInput.setAttribute('max', formattedMaxFrameRate);
  } else {
    recordingInput.removeAttribute('max');
  }
  if (hintElement) {
    var hintMessage = '';
    if (formattedMaxFrameRate) {
      var template = hintElement.getAttribute('data-range-template');
      hintMessage = template ? template.replace('{max}', formattedMaxFrameRate) : "Enter a recording frame rate from ".concat(minValue, " to ").concat(formattedMaxFrameRate, " fps.");
    } else {
      hintMessage = hintElement.getAttribute('data-default-message') || '';
    }
    hintElement.textContent = hintMessage;
    hintElement.hidden = !hintMessage;
  }
}
function populateFrameRateDropdown() {
  var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  populateFrameRateDropdownFor({
    selected: selected,
    recordingInput: recordingFrameRateInput,
    optionsList: recordingFrameRateOptionsList,
    sensorSelect: sensorModeDropdown,
    resolutionSelect: recordingResolutionDropdown,
    hintElement: recordingFrameRateHint
  });
}
function populateSlowMotionFrameRateDropdown() {
  var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  populateFrameRateDropdownFor({
    selected: selected,
    recordingInput: slowMotionRecordingFrameRateInput,
    optionsList: slowMotionRecordingFrameRateOptionsList,
    sensorSelect: slowMotionSensorModeDropdown,
    resolutionSelect: slowMotionRecordingResolutionDropdown,
    aspectSelect: slowMotionAspectRatioSelect,
    hintElement: slowMotionRecordingFrameRateHint
  });
}
function populateSlowMotionRecordingResolutionDropdown() {
  var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  populateCameraPropertyDropdown('slowMotionRecordingResolution', 'resolutions', selected);
}
function populateSlowMotionSensorModeDropdown() {
  var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  populateCameraPropertyDropdown('slowMotionSensorMode', 'sensorModes', selected);
}
function populateSensorModeDropdown() {
  var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  populateCameraPropertyDropdown('sensorMode', 'sensorModes', selected);
}
function populateCodecDropdown() {
  var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  populateCameraPropertyDropdown('codec', 'recordingCodecs', selected);
}
function populateFilterDropdown() {
  var select = resolveFilterSelectElement();
  if (select && devices && Array.isArray(devices.filterOptions)) {
    var fragment = document.createDocumentFragment();
    if (!select.multiple) {
      var emptyOpt = document.createElement('option');
      emptyOpt.value = '';
      fragment.appendChild(emptyOpt);
    }
    for (var _index19 = 0; _index19 < devices.filterOptions.length; _index19 += 1) {
      var value = devices.filterOptions[_index19];
      var opt = document.createElement('option');
      opt.value = value;
      opt.textContent = value;
      fragment.appendChild(opt);
    }
    select.innerHTML = '';
    select.appendChild(fragment);
  }
}
var filterId = function filterId(t) {
  return t.replace(/[^a-z0-9]/gi, '_');
};
function getFilterValueConfig(type) {
  switch (type) {
    case 'IRND':
      return {
        opts: ['0.3', '0.6', '0.9', '1.2', '1.5', '1.8', '2.1', '2.5'],
        defaults: ['0.3', '1.2']
      };
    case 'Diopter':
      return {
        opts: ['+1/4', '+1/2', '+1', '+2', '+3', '+4'],
        defaults: ['+1/2', '+1', '+2', '+4']
      };
    case 'ND Grad HE':
      return {
        opts: ['0.3 HE Vertical', '0.6 HE Vertical', '0.9 HE Vertical', '1.2 HE Vertical', '0.3 HE Horizontal', '0.6 HE Horizontal', '0.9 HE Horizontal', '1.2 HE Horizontal'],
        defaults: ['0.3 HE Horizontal', '0.6 HE Horizontal', '0.9 HE Horizontal']
      };
    case 'ND Grad SE':
      return {
        opts: ['0.3 SE Vertical', '0.6 SE Vertical', '0.9 SE Vertical', '1.2 SE Vertical', '0.3 SE Horizontal', '0.6 SE Horizontal', '0.9 SE Horizontal', '1.2 SE Horizontal'],
        defaults: ['0.3 SE Horizontal', '0.6 SE Horizontal', '0.9 SE Horizontal']
      };
    default:
      return {
        opts: ['1', '1/2', '1/4', '1/8', '1/16'],
        defaults: ['1/2', '1/4', '1/8']
      };
  }
}
var SESSION_DEFAULT_FILTER_SIZE = ensureSessionRuntimePlaceholder('DEFAULT_FILTER_SIZE', function () {
  return '4x5.65';
});
function createFilterSizeSelect(type) {
  var selected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SESSION_DEFAULT_FILTER_SIZE;
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var _options$includeId = options.includeId,
    includeId = _options$includeId === void 0 ? true : _options$includeId,
    _options$idPrefix = options.idPrefix,
    idPrefix = _options$idPrefix === void 0 ? 'filter-size-' : _options$idPrefix;
  var sel = document.createElement('select');
  if (includeId) {
    sel.id = "".concat(idPrefix).concat(filterId(type));
  }
  var sizes = [SESSION_DEFAULT_FILTER_SIZE, '4x4', '6x6', '95mm'];
  if (type === 'Rota-Pol') sizes = [SESSION_DEFAULT_FILTER_SIZE, '6x6', '95mm'];
  sizes.forEach(function (s) {
    var o = document.createElement('option');
    o.value = s;
    o.textContent = s;
    if (s === selected) o.selected = true;
    sel.appendChild(o);
  });
  return sel;
}
function createFilterValueSelect(type, selected) {
  var sel = document.createElement('select');
  sel.id = "filter-values-".concat(filterId(type));
  sel.multiple = true;
  sel.setAttribute('multiple', '');
  var _getFilterValueConfig = getFilterValueConfig(type),
    opts = _getFilterValueConfig.opts,
    _getFilterValueConfig2 = _getFilterValueConfig.defaults,
    defaults = _getFilterValueConfig2 === void 0 ? [] : _getFilterValueConfig2;
  var selectedVals = Array.isArray(selected) ? selected.slice() : defaults.slice();
  var syncOption = function syncOption(option, isSelected) {
    option.selected = isSelected;
    if (isSelected) {
      option.setAttribute('selected', '');
    } else {
      option.removeAttribute('selected');
    }
  };
  var syncCheckbox = function syncCheckbox(checkbox, isChecked) {
    checkbox.checked = isChecked;
    if (isChecked) {
      checkbox.setAttribute('checked', '');
    } else {
      checkbox.removeAttribute('checked');
    }
  };
  var optionsByValue = new Map();
  var optionFragment = document.createDocumentFragment();
  for (var _index20 = 0; _index20 < opts.length; _index20 += 1) {
    var value = opts[_index20];
    var opt = document.createElement('option');
    opt.value = value;
    opt.textContent = value;
    syncOption(opt, selectedVals.includes(value));
    optionsByValue.set(value, opt);
    optionFragment.appendChild(opt);
  }
  sel.appendChild(optionFragment);
  sel.size = opts.length;
  sel.style.display = 'none';
  var container = document.createElement('span');
  container.className = 'filter-values-container';
  var checkboxName = "filterValues-".concat(filterId(type));
  var checkboxFragment = document.createDocumentFragment();
  var checkboxesByValue = new Map();
  var _loop = function _loop() {
    var value = opts[_index21];
    var lbl = document.createElement('label');
    lbl.className = 'filter-value-option';
    var cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.name = checkboxName;
    cb.value = value;
    syncCheckbox(cb, selectedVals.includes(value));
    cb.addEventListener('change', function () {
      var opt = optionsByValue.get(value);
      if (opt) {
        syncOption(opt, cb.checked);
      }
      syncCheckbox(cb, cb.checked);
      sel.dispatchEvent(new Event('change'));
    });
    lbl.appendChild(cb);
    lbl.appendChild(document.createTextNode(value));
    checkboxesByValue.set(value, cb);
    checkboxFragment.appendChild(lbl);
  };
  for (var _index21 = 0; _index21 < opts.length; _index21 += 1) {
    _loop();
  }
  container.appendChild(checkboxFragment);
  sel.addEventListener('change', function () {
    optionsByValue.forEach(function (opt, value) {
      var selected = !!opt && opt.selected;
      syncOption(opt, selected);
      var checkbox = checkboxesByValue.get(value);
      if (checkbox) {
        syncCheckbox(checkbox, selected);
      }
    });
  });
  container.appendChild(sel);
  return {
    container: container,
    select: sel
  };
}
function resolveFilterDisplayInfo(type) {
  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SESSION_DEFAULT_FILTER_SIZE;
  switch (type) {
    case 'Diopter':
      return {
        label: 'Schneider CF DIOPTER FULL GEN2',
        gearName: 'Schneider CF DIOPTER FULL GEN2'
      };
    case 'Clear':
      return {
        label: 'Clear Filter',
        gearName: 'Clear Filter'
      };
    case 'IRND':
      return {
        label: 'IRND Filter Set',
        gearName: 'IRND Filter Set',
        hideDetails: false
      };
    case 'Pol':
      return {
        label: 'Pol Filter',
        gearName: 'Pol Filter'
      };
    case 'Rota-Pol':
      {
        if (size === '6x6') {
          return {
            label: 'ARRI Rota Pola Filter Frame (6x6)',
            gearName: 'ARRI Rota Pola Filter Frame (6x6)'
          };
        }
        if (size === '95mm') {
          return {
            label: 'Tilta 95mm Polarizer Filter for Tilta Mirage',
            gearName: 'Tilta 95mm Polarizer Filter for Tilta Mirage'
          };
        }
        return {
          label: 'ARRI Rota Pola Filter Frame',
          gearName: 'ARRI Rota Pola Filter Frame'
        };
      }
    case 'ND Grad HE':
      return {
        label: 'ND Grad HE Filter Set',
        gearName: 'ND Grad HE Filter Set',
        hideDetails: false
      };
    case 'ND Grad SE':
      return {
        label: 'ND Grad SE Filter Set',
        gearName: 'ND Grad SE Filter Set',
        hideDetails: false
      };
    default:
      return {
        label: "".concat(type, " Filter Set"),
        gearName: "".concat(type, " Filter Set"),
        hideDetails: true
      };
  }
}
function buildFilterGearEntries() {
  var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var entries = [];
  filters.forEach(function (_ref29) {
    var type = _ref29.type,
      _ref29$size = _ref29.size,
      size = _ref29$size === void 0 ? SESSION_DEFAULT_FILTER_SIZE : _ref29$size,
      values = _ref29.values;
    if (!type) return;
    var sizeValue = size || SESSION_DEFAULT_FILTER_SIZE;
    var idBase = "filter-".concat(filterId(type));
    switch (type) {
      case 'Diopter':
        {
          entries.push({
            id: "".concat(idBase, "-frame"),
            gearName: 'ARRI Diopter Frame 138mm',
            label: 'ARRI Diopter Frame 138mm',
            type: '',
            size: '',
            values: []
          });
          var diopterValues = values == null ? (getFilterValueConfig(type).defaults || []).slice() : Array.isArray(values) ? values.slice() : [];
          entries.push({
            id: "".concat(idBase, "-set"),
            gearName: 'Schneider CF DIOPTER FULL GEN2',
            label: 'Schneider CF DIOPTER FULL GEN2',
            type: type,
            size: '',
            values: diopterValues
          });
          break;
        }
      case 'Clear':
        {
          var _resolveFilterDisplay = resolveFilterDisplayInfo(type, sizeValue),
            label = _resolveFilterDisplay.label,
            gearName = _resolveFilterDisplay.gearName;
          entries.push({
            id: idBase,
            gearName: gearName,
            label: label,
            type: type,
            size: sizeValue,
            values: []
          });
          break;
        }
      case 'Pol':
        {
          var _resolveFilterDisplay2 = resolveFilterDisplayInfo(type, sizeValue),
            _label = _resolveFilterDisplay2.label,
            _gearName = _resolveFilterDisplay2.gearName;
          entries.push({
            id: idBase,
            gearName: _gearName,
            label: _label,
            type: type,
            size: sizeValue,
            values: []
          });
          break;
        }
      case 'Rota-Pol':
        {
          var _resolveFilterDisplay3 = resolveFilterDisplayInfo(type, sizeValue),
            _label2 = _resolveFilterDisplay3.label,
            _gearName2 = _resolveFilterDisplay3.gearName;
          var displaySize = _label2.includes(sizeValue) ? '' : sizeValue;
          entries.push({
            id: idBase,
            gearName: _gearName2,
            label: _label2,
            type: type,
            size: displaySize,
            values: []
          });
          break;
        }
      case 'ND Grad HE':
      case 'ND Grad SE':
        {
          var _resolveFilterDisplay4 = resolveFilterDisplayInfo(type, sizeValue),
            _label3 = _resolveFilterDisplay4.label,
            _gearName3 = _resolveFilterDisplay4.gearName,
            hideDetails = _resolveFilterDisplay4.hideDetails;
          var gradValues = values == null ? (getFilterValueConfig(type).defaults || []).slice() : Array.isArray(values) ? values.slice() : [];
          entries.push({
            id: idBase,
            gearName: _gearName3,
            label: _label3,
            hideDetails: hideDetails,
            type: type,
            size: sizeValue,
            values: gradValues
          });
          break;
        }
      default:
        {
          var _resolveFilterDisplay5 = resolveFilterDisplayInfo(type, sizeValue),
            _label4 = _resolveFilterDisplay5.label,
            _gearName4 = _resolveFilterDisplay5.gearName,
            _hideDetails = _resolveFilterDisplay5.hideDetails;
          var filterValues = values == null ? (getFilterValueConfig(type).defaults || []).slice() : Array.isArray(values) ? values.slice() : [];
          entries.push({
            id: idBase,
            gearName: _gearName4,
            label: _label4,
            hideDetails: _hideDetails,
            type: type,
            size: sizeValue,
            values: filterValues
          });
        }
    }
  });
  return entries;
}
function updateGearListFilterEntries() {
  var entries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  if (!gearListOutput) return;
  var entryMap = new Map(entries.map(function (entry) {
    return [entry.id, entry];
  }));
  gearListOutput.querySelectorAll('[data-filter-entry]').forEach(function (span) {
    var entryId = span.getAttribute('data-filter-entry');
    if (!entryId) return;
    var entry = entryMap.get(entryId);
    if (!entry) return;
    var labelText = typeof (entry === null || entry === void 0 ? void 0 : entry.label) === 'string' ? entry.label : '';
    span.textContent = labelText ? "1x ".concat(labelText) : '';
    span.setAttribute('data-gear-name', entry.gearName);
    span.setAttribute('data-filter-label', entry.label);
    if (entry.type) {
      span.setAttribute('data-filter-type', entry.type);
    } else {
      span.removeAttribute('data-filter-type');
    }
  });
}
function getGearListFilterDetailsContainer() {
  return gearListOutput ? gearListOutput.querySelector('#gearListFilterDetails') : null;
}
function filterTypeNeedsValueSelect(type) {
  return type === 'Diopter' || type === 'IRND' || type === 'ND Grad HE' || type === 'ND Grad SE' || type !== 'Clear' && type !== 'Pol' && type !== 'Rota-Pol';
}
function createFilterStorageValueSelect(type, selected) {
  var select = document.createElement('select');
  select.id = "filter-values-".concat(filterId(type));
  select.multiple = true;
  select.setAttribute('multiple', '');
  select.hidden = true;
  select.setAttribute('aria-hidden', 'true');
  var _getFilterValueConfig3 = getFilterValueConfig(type),
    opts = _getFilterValueConfig3.opts,
    _getFilterValueConfig4 = _getFilterValueConfig3.defaults,
    defaults = _getFilterValueConfig4 === void 0 ? [] : _getFilterValueConfig4;
  var chosen = Array.isArray(selected) ? selected.slice() : defaults.slice();
  opts.forEach(function (value) {
    var opt = document.createElement('option');
    opt.value = value;
    opt.textContent = value;
    if (chosen.includes(value)) {
      opt.selected = true;
      opt.setAttribute('selected', '');
    }
    select.appendChild(opt);
  });
  return select;
}
function resolveFilterDetailsStorageElement() {
  if (typeof filterDetailsStorage !== 'undefined' && filterDetailsStorage) {
    return filterDetailsStorage;
  }
  if (typeof document === 'undefined') return null;
  var element = document.getElementById('filterDetails');
  if (!element) return null;
  try {
    if (typeof globalThis !== 'undefined' && globalThis) {
      globalThis.filterDetailsStorage = element;
    } else if (typeof window !== 'undefined' && window) {
      window.filterDetailsStorage = element;
    }
  } catch (ex) {
    void ex;
  }
  return element;
}
function renderFilterDetailsStorage(details) {
  var storageRoot = resolveFilterDetailsStorageElement();
  if (!storageRoot) return;
  storageRoot.innerHTML = '';
  if (!details.length) {
    storageRoot.hidden = true;
    return;
  }
  storageRoot.hidden = true;
  details.forEach(function (detail) {
    var type = detail.type,
      size = detail.size,
      values = detail.values,
      needsSize = detail.needsSize,
      needsValues = detail.needsValues;
    if (needsSize) {
      var sizeSelect = createFilterSizeSelect(type, size);
      sizeSelect.hidden = true;
      sizeSelect.setAttribute('aria-hidden', 'true');
      sizeSelect.addEventListener('change', handleFilterDetailChange);
      storageRoot.appendChild(sizeSelect);
    }
    if (needsValues) {
      var valuesSelect = createFilterStorageValueSelect(type, values);
      valuesSelect.addEventListener('change', handleFilterDetailChange);
      storageRoot.appendChild(valuesSelect);
    }
  });
}
function resolveGlobalScope() {
  if (typeof globalThis !== 'undefined') return globalThis;
  if (typeof window !== 'undefined') return window;
  if (typeof self !== 'undefined') return self;
  if (typeof global !== 'undefined') return global;
  return null;
}
function ensureFilterDetailEditButton(element) {
  if (!element) return null;
  var existing = element.querySelector('.gear-item-edit-btn');
  if (existing) return existing;
  var doc = element.ownerDocument || (typeof document !== 'undefined' ? document : null);
  if (!doc) return null;
  var scope = resolveGlobalScope();
  var editLabel = 'Edit item';
  var textGetter = scope && typeof scope.getGearItemEditTexts === 'function' ? scope.getGearItemEditTexts : null;
  if (textGetter) {
    try {
      var _texts = textGetter.call(scope) || {};
      if (_texts.editButtonLabel && typeof _texts.editButtonLabel === 'string') {
        var trimmed = _texts.editButtonLabel.trim();
        if (trimmed) {
          editLabel = trimmed;
        }
      }
    } catch (_unused19) {}
  }
  var button = doc.createElement('button');
  button.type = 'button';
  button.className = 'gear-item-edit-btn';
  button.setAttribute('data-gear-edit', '');
  if (editLabel) {
    button.setAttribute('aria-label', editLabel);
    button.setAttribute('title', editLabel);
  }
  var setLabelWithIcon = scope && typeof scope.setButtonLabelWithIcon === 'function' ? scope.setButtonLabelWithIcon : null;
  var iconRegistry = scope && scope.ICON_GLYPHS ? scope.ICON_GLYPHS : null;
  var editGlyph = iconRegistry ? iconRegistry.sliders || iconRegistry.gears || iconRegistry.gearList || iconRegistry.settingsGeneral || iconRegistry.note || null : null;
  if (setLabelWithIcon && editGlyph) {
    setLabelWithIcon.call(scope, button, '', editGlyph);
  } else if (editLabel) {
    button.textContent = editLabel;
  }
  var noteSpan = element.querySelector('.gear-item-note');
  if (noteSpan && noteSpan.parentNode === element) {
    element.insertBefore(button, noteSpan.nextSibling);
  } else {
    element.appendChild(button);
  }
  return button;
}
function renderGearListFilterDetails(details) {
  var container = getGearListFilterDetailsContainer();
  if (!container) return;
  container.innerHTML = '';
  if (!details.length) {
    container.classList.add('hidden');
    return;
  }
  container.classList.remove('hidden');
  details.forEach(function (detail) {
    var type = detail.type,
      label = detail.label,
      gearName = detail.gearName,
      entryId = detail.entryId,
      size = detail.size,
      values = detail.values,
      needsSize = detail.needsSize,
      needsValues = detail.needsValues;
    var row = document.createElement('div');
    row.className = 'filter-detail';
    if (gearName) {
      row.setAttribute('data-gear-name', gearName);
    }
    if (type) {
      row.setAttribute('data-filter-type', type);
    }
    var heading = document.createElement('div');
    heading.className = 'filter-detail-label gear-item';
    if (entryId) heading.setAttribute('data-filter-entry', entryId);
    if (gearName) heading.setAttribute('data-gear-name', gearName);
    if (label) {
      heading.setAttribute('data-filter-label', label);
      heading.setAttribute('data-gear-label', label);
    }
    if (type) heading.setAttribute('data-filter-type', type);
    var shouldHideSize = !!needsSize;
    if (shouldHideSize) {
      heading.setAttribute('data-filter-hide-size', '');
    } else {
      heading.removeAttribute('data-filter-hide-size');
    }
    heading.textContent = label ? "1x ".concat(label) : '';
    row.appendChild(heading);
    if (typeof enhanceGearItemElement === 'function') {
      enhanceGearItemElement(heading);
    }
    ensureFilterDetailEditButton(heading);
    var controls = document.createElement('div');
    controls.className = 'filter-detail-controls';
    if (needsSize) {
      var sizeLabel = document.createElement('label');
      sizeLabel.className = 'filter-detail-size';
      var sizeText = document.createElement('span');
      sizeText.className = 'filter-detail-sublabel';
      sizeText.textContent = 'Size';
      var sizeWrapper = document.createElement('span');
      sizeWrapper.className = 'select-wrapper';
      var sizeSelect = createFilterSizeSelect(type, size, {
        includeId: false
      });
      sizeSelect.setAttribute('data-storage-id', "filter-size-".concat(filterId(type)));
      sizeSelect.addEventListener('change', function () {
        var storageId = sizeSelect.getAttribute('data-storage-id');
        if (!storageId) return;
        syncGearListFilterSize(storageId, sizeSelect.value);
      });
      sizeWrapper.appendChild(sizeSelect);
      sizeLabel.append(sizeText, sizeWrapper);
      controls.appendChild(sizeLabel);
    }
    if (needsValues) {
      var valuesWrap = document.createElement('div');
      valuesWrap.className = 'filter-detail-values';
      var valueLabel = document.createElement('span');
      valueLabel.className = 'filter-detail-sublabel';
      valueLabel.textContent = 'Strengths';
      var optionsWrap = document.createElement('span');
      optionsWrap.className = 'filter-values-container';
      optionsWrap.setAttribute('data-storage-values', "filter-values-".concat(filterId(type)));
      var storageValuesId = optionsWrap.getAttribute('data-storage-values');
      var _getFilterValueConfig5 = getFilterValueConfig(type),
        opts = _getFilterValueConfig5.opts,
        _getFilterValueConfig6 = _getFilterValueConfig5.defaults,
        defaults = _getFilterValueConfig6 === void 0 ? [] : _getFilterValueConfig6;
      var checkboxName = "filterValues-".concat(filterId(type));
      var currentValues = values == null ? defaults : Array.isArray(values) ? values : [];
      opts.forEach(function (value) {
        var lbl = document.createElement('label');
        lbl.className = 'filter-value-option';
        var cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.name = checkboxName;
        cb.value = value;
        if (currentValues.includes(value)) {
          cb.checked = true;
          cb.setAttribute('checked', '');
        }
        cb.addEventListener('change', function () {
          if (!storageValuesId) return;
          syncGearListFilterValue(storageValuesId, value, cb.checked);
        });
        lbl.append(cb, document.createTextNode(value));
        optionsWrap.appendChild(lbl);
      });
      valuesWrap.append(valueLabel, optionsWrap);
      controls.appendChild(valuesWrap);
    }
    row.appendChild(controls);
    container.appendChild(row);
  });
  adjustGearListSelectWidths(container);
}
function syncGearListFilterSize(storageId, value) {
  var storageSelect = document.getElementById(storageId);
  if (!storageSelect) return;
  if (storageSelect.value !== value) {
    storageSelect.value = value;
  }
  if (typeof markProjectFormDataDirty === 'function') {
    markProjectFormDataDirty();
  }
  storageSelect.dispatchEvent(new Event('change'));
}
function syncGearListFilterValue(storageId, value, isSelected) {
  var storageSelect = document.getElementById(storageId);
  if (!storageSelect) return;
  var changed = false;
  Array.from(storageSelect.options).forEach(function (opt) {
    if (opt.value !== value) return;
    if (opt.selected !== isSelected) {
      opt.selected = isSelected;
      changed = true;
      if (isSelected) {
        opt.setAttribute('selected', '');
      } else {
        opt.removeAttribute('selected');
      }
    }
  });
  if (changed) {
    if (typeof markProjectFormDataDirty === 'function') {
      markProjectFormDataDirty();
    }
    storageSelect.dispatchEvent(new Event('change'));
  }
}
function renderFilterDetails(providedTokens) {
  var select = resolveFilterSelectElement();
  if (!select) return;
  var selected = Array.from(select.selectedOptions).map(function (o) {
    return o.value;
  }).filter(Boolean);
  var existingTokens;
  if (Array.isArray(providedTokens)) {
    existingTokens = providedTokens.filter(function (token) {
      return token && token.type;
    }).map(function (token) {
      return {
        type: token.type,
        size: token.size,
        values: token.values === undefined ? undefined : Array.isArray(token.values) ? token.values.slice() : token.values
      };
    });
  } else {
    var existingSelections = collectFilterSelections();
    if (existingSelections) {
      existingTokens = parseFilterTokens(existingSelections);
    } else if (currentProjectInfo && currentProjectInfo.filter) {
      existingTokens = parseFilterTokens(currentProjectInfo.filter);
    } else {
      existingTokens = [];
    }
  }
  var existingMap = new Map(existingTokens.map(function (token) {
    return [token.type, token];
  }));
  var details = selected.map(function (type) {
    var prev = existingMap.get(type) || {};
    var size = prev.size || SESSION_DEFAULT_FILTER_SIZE;
    var needsSize = type !== 'Diopter';
    var needsValues = filterTypeNeedsValueSelect(type);
    var _resolveFilterDisplay6 = resolveFilterDisplayInfo(type, size),
      label = _resolveFilterDisplay6.label,
      gearName = _resolveFilterDisplay6.gearName,
      hideDetails = _resolveFilterDisplay6.hideDetails;
    var entryId = "filter-".concat(filterId(type));
    if (type === 'Diopter') entryId = "".concat(entryId, "-set");
    return {
      type: type,
      label: label,
      gearName: gearName,
      entryId: entryId,
      size: size,
      values: Array.isArray(prev.values) ? prev.values.slice() : [],
      needsSize: needsSize,
      needsValues: needsValues,
      hideDetails: hideDetails
    };
  });
  renderFilterDetailsStorage(details);
  renderGearListFilterDetails(details);
  var gearEntries = buildFilterGearEntries(existingTokens);
  if (!gearEntries.length) {
    gearEntries = details.map(function (detail) {
      return {
        id: detail.entryId,
        gearName: detail.gearName,
        label: detail.label,
        type: detail.type,
        hideDetails: detail.hideDetails
      };
    }).filter(function (entry) {
      return entry.id && entry.label;
    });
  }
  updateGearListFilterEntries(gearEntries);
  var matteboxTarget = typeof matteboxSelect !== 'undefined' ? matteboxSelect : typeof document !== 'undefined' ? document.getElementById('mattebox') : null;
  if (matteboxTarget) {
    var needsSwing = selected.some(function (t) {
      return t === 'ND Grad HE' || t === 'ND Grad SE';
    });
    if (needsSwing) matteboxTarget.value = 'Swing Away';
  }
}
function handleFilterDetailChange() {
  if (!resolveFilterSelectElement()) return;
  var filterStr = collectFilterSelections();
  var entries = buildFilterGearEntries(parseFilterTokens(filterStr));
  updateGearListFilterEntries(entries);
  if (gearListOutput) adjustGearListSelectWidths(gearListOutput);
  saveCurrentSession();
  saveCurrentGearList();
  checkSetupChanged();
  renderFilterDetails();
}
function collectFilterSelections() {
  var select = resolveFilterSelectElement();
  if (!select) return '';
  var selected = Array.from(select.selectedOptions).map(function (option) {
    return typeof option.value === 'string' ? option.value.trim() : '';
  }).filter(Boolean);
  var existingSelectionString = currentProjectInfo && typeof currentProjectInfo.filter === 'string' ? currentProjectInfo.filter : '';
  var existingTokens = existingSelectionString ? parseFilterTokens(existingSelectionString) : [];
  var existingMap = Object.fromEntries(existingTokens.map(function (token) {
    return [token.type, token];
  }));
  var existingStringMap = {};
  if (existingSelectionString) {
    existingSelectionString.split(',').forEach(function (tokenStr) {
      var _trimmed$split$;
      var trimmed = typeof tokenStr === 'string' ? tokenStr.trim() : '';
      if (!trimmed) return;
      var type = (_trimmed$split$ = trimmed.split(':')[0]) === null || _trimmed$split$ === void 0 ? void 0 : _trimmed$split$.trim();
      if (type) {
        existingStringMap[type] = trimmed;
      }
    });
  }
  var selectedTokens = selected.map(function (type) {
    var sizeSel = document.getElementById("filter-size-".concat(filterId(type)));
    var valSel = document.getElementById("filter-values-".concat(filterId(type)));
    var prev = existingMap[type] || {};
    var size = sizeSel ? sizeSel.value : prev.size || SESSION_DEFAULT_FILTER_SIZE;
    var vals;
    var needsValues = filterTypeNeedsValueSelect(type);
    if (valSel) {
      vals = Array.from(valSel.selectedOptions).map(function (o) {
        return o.value;
      });
    } else if (Array.isArray(prev.values) && prev.values.length) {
      vals = prev.values.slice();
    } else {
      vals = [];
    }
    var valueSegment = '';
    if (needsValues) {
      valueSegment = vals.length ? ":".concat(vals.join('|')) : ':!';
    }
    return "".concat(type, ":").concat(size).concat(valueSegment);
  });
  var availableTypes = new Set(Array.from(select.options).map(function (option) {
    return typeof option.value === 'string' ? option.value.trim() : '';
  }).filter(Boolean));
  var selectedTypes = new Set(selected);
  existingTokens.forEach(function (token) {
    if (!token || !token.type) return;
    if (selectedTypes.has(token.type)) return;
    if (availableTypes.has(token.type)) return;
    var preserved = existingStringMap[token.type] || function () {
      var size = token.size || SESSION_DEFAULT_FILTER_SIZE;
      var values = Array.isArray(token.values) ? token.values.filter(Boolean) : [];
      var segment = '';
      if (filterTypeNeedsValueSelect(token.type)) {
        segment = values.length ? ":".concat(values.join('|')) : ':!';
      }
      return "".concat(token.type, ":").concat(size).concat(segment);
    }();
    selectedTokens.push(preserved);
  });
  return selectedTokens.join(',');
}
function parseFilterTokens(str) {
  if (!str) return [];
  return str.split(',').map(function (s) {
    var parts = s.split(':').map(function (p) {
      return p.trim();
    });
    var type = parts[0];
    var size = parts[1] || SESSION_DEFAULT_FILTER_SIZE;
    var vals = parts.length > 2 ? parts[2] : undefined;
    var values;
    if (vals === undefined) {
      values = undefined;
    } else if (vals === '' || vals === '!') {
      values = [];
    } else {
      values = vals.split('|').map(function (v) {
        return v.trim();
      }).filter(Boolean);
    }
    return {
      type: type,
      size: size,
      values: values
    };
  }).filter(function (t) {
    return t.type;
  });
}
function applyFilterSelectionsToGearList() {
  var info = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : currentProjectInfo;
  if (!gearListOutput) return;
  resolveFilterSelectElement();
  var tokens = info && info.filter ? parseFilterTokens(info.filter) : [];
  var entries = buildFilterGearEntries(tokens);
  updateGearListFilterEntries(entries);
  adjustGearListSelectWidths(gearListOutput);
}
function normalizeGearNameForComparison(name) {
  if (!name) return '';
  var normalized = String(name);
  if (typeof normalized.normalize === 'function') {
    normalized = normalized.normalize('NFD');
  } else if (typeof String.prototype.normalize === 'function') {
    normalized = String.prototype.normalize.call(normalized, 'NFD');
  }
  normalized = normalized.replace(/[\u0300-\u036f]/g, '');
  normalized = normalized.replace(/\bfuer\b/gi, 'for');
  normalized = normalized.replace(/\bfur\b/gi, 'for');
  normalized = normalized.toLowerCase();
  return normalized.replace(/[^a-z0-9]+/g, '');
}
function buildFilterSelectHtml() {
  return '<div id="gearListFilterDetails" class="hidden" aria-live="polite"></div>';
}
function collectFilterAccessories() {
  var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var items = [];
  filters.forEach(function (_ref30) {
    var type = _ref30.type;
    switch (type) {
      case 'ND Grad HE':
      case 'ND Grad SE':
        break;
      default:
        break;
    }
  });
  return items;
}
var USER_BUTTON_FUNCTION_ITEMS = [{
  key: 'user1',
  value: 'User 1'
}, {
  key: 'user2',
  value: 'User 2'
}, {
  key: 'user3',
  value: 'User 3'
}, {
  key: 'user4',
  value: 'User 4'
}, {
  key: 'toggleLut',
  value: 'Toggle LUT'
}, {
  key: 'falseColor',
  value: 'False Color'
}, {
  key: 'peaking',
  value: 'Peaking'
}, {
  key: 'anamorphicDesqueeze',
  value: 'Anamorphic Desqueeze'
}, {
  key: 'surroundView',
  value: 'Surround View'
}, {
  key: 'oneToOneZoom',
  value: '1:1 Zoom'
}, {
  key: 'waveform',
  value: 'Waveform'
}, {
  key: 'histogram',
  value: 'Histogram'
}, {
  key: 'vectorscope',
  value: 'Vectorscope'
}, {
  key: 'zebra',
  value: 'Zebra'
}, {
  key: 'playback',
  value: 'Playback'
}, {
  key: 'record',
  value: 'Record'
}, {
  key: 'zoom',
  value: 'Zoom'
}, {
  key: 'frameLines',
  value: 'Frame Lines'
}, {
  key: 'frameGrab',
  value: 'Frame Grab'
}, {
  key: 'wb',
  value: 'WB'
}, {
  key: 'iso',
  value: 'ISO'
}, {
  key: 'nd',
  value: 'ND'
}, {
  key: 'fps',
  value: 'FPS'
}, {
  key: 'shutter',
  value: 'Shutter'
}];
function populateUserButtonDropdowns() {
  var _texts2, _texts3;
  var lang = typeof currentLang === 'string' && texts[currentLang] ? currentLang : 'en';
  var fallbackProjectForm = ((_texts2 = texts) === null || _texts2 === void 0 || (_texts2 = _texts2.en) === null || _texts2 === void 0 ? void 0 : _texts2.projectForm) || {};
  var langProjectForm = ((_texts3 = texts) === null || _texts3 === void 0 || (_texts3 = _texts3[lang]) === null || _texts3 === void 0 ? void 0 : _texts3.projectForm) || fallbackProjectForm;
  var labels = langProjectForm.userButtonFunctions || {};
  var fallbackLabels = fallbackProjectForm.userButtonFunctions || {};
  var items = USER_BUTTON_FUNCTION_ITEMS.map(function (item) {
    var label = labels[item.key] || fallbackLabels[item.key] || item.value;
    return _objectSpread(_objectSpread({}, item), {}, {
      label: label
    });
  });
  var knownValues = new Set(items.map(function (item) {
    return item.value;
  }));
  ['monitorUserButtons', 'cameraUserButtons', 'viewfinderUserButtons'].forEach(function (id) {
    var sel = document.getElementById(id);
    if (!sel) return;
    var previouslySelected = new Set(Array.from(sel.selectedOptions || []).map(function (opt) {
      return opt.value;
    }));
    var fragment = document.createDocumentFragment();
    for (var _index22 = 0; _index22 < items.length; _index22 += 1) {
      var _items$_index = items[_index22],
        value = _items$_index.value,
        label = _items$_index.label;
      if (!value) {
        continue;
      }
      var opt = document.createElement('option');
      opt.value = value;
      opt.textContent = label;
      if (previouslySelected.has(value)) {
        opt.selected = true;
      }
      fragment.appendChild(opt);
    }
    previouslySelected.forEach(function (value) {
      if (knownValues.has(value)) {
        return;
      }
      var opt = document.createElement('option');
      opt.value = value;
      opt.textContent = value;
      opt.selected = true;
      fragment.appendChild(opt);
    });
    sel.innerHTML = '';
    sel.appendChild(fragment);
    var optionCount = sel.options ? sel.options.length : 0;
    sel.size = optionCount > 0 ? optionCount : USER_BUTTON_FUNCTION_ITEMS.length;
  });
}
var runInitAppWithInitialLoadingIndicator = function runInitAppWithInitialLoadingIndicator() {
  ensureInitialLoadingIndicatorVisible();
  try {
    initApp();
  } finally {
    finalizeInitialLoadingIndicator();
  }
};
ensureInitialLoadingIndicatorVisible();
if (typeof document !== 'undefined' && typeof document.addEventListener === 'function') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runInitAppWithInitialLoadingIndicator);
  } else {
    runInitAppWithInitialLoadingIndicator();
  }
} else {
  finalizeInitialLoadingIndicator();
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    APP_VERSION: typeof ACTIVE_APP_VERSION === 'string' ? ACTIVE_APP_VERSION : APP_VERSION,
    closeSideMenu: closeSideMenu,
    openSideMenu: openSideMenu,
    setupSideMenu: setupSideMenu,
    setupResponsiveControls: setupResponsiveControls,
    setLanguage: applySetLanguage,
    applySetLanguage: applySetLanguage,
    safeGetCurrentProjectName: safeGetCurrentProjectName,
    updateCalculations: updateCalculations,
    setBatteryPlates: setBatteryPlates,
    getBatteryPlates: getBatteryPlates,
    setRecordingMedia: setRecordingMedia,
    getRecordingMedia: getRecordingMedia,
    applyDarkMode: applyDarkMode,
    applyPinkMode: applyPinkMode,
    applyHighContrast: applyHighContrast,
    generatePrintableOverview: generatePrintableOverview,
    generateGearListHtml: generateGearListHtml,
    ensureZoomRemoteSetup: ensureZoomRemoteSetup,
    encodeSharedSetup: encodeSharedSetup,
    decodeSharedSetup: decodeSharedSetup,
    applySharedSetupFromUrl: applySharedSetupFromUrl,
    applySharedSetup: applySharedSetup,
    updateBatteryPlateVisibility: updateBatteryPlateVisibility,
    updateBatteryOptions: updateBatteryOptions,
    renderSetupDiagram: renderSetupDiagram,
    enableDiagramInteractions: enableDiagramInteractions,
    updateDiagramLegend: updateDiagramLegend,
    cameraFizPort: cameraFizPort,
    controllerCamPort: controllerCamPort,
    controllerDistancePort: controllerDistancePort,
    detectBrand: detectBrand,
    connectionLabel: connectionLabel,
    generateConnectorSummary: generateConnectorSummary,
    exportDiagramSvg: exportDiagramSvg,
    fixPowerInput: fixPowerInput,
    ensureList: ensureList,
    normalizeVideoType: normalizeVideoType,
    normalizeFizConnectorType: normalizeFizConnectorType,
    normalizeViewfinderType: normalizeViewfinderType,
    normalizePowerPortType: normalizePowerPortType,
    getCurrentSetupKey: getCurrentSetupKey,
    renderFeedbackTable: renderFeedbackTable,
    saveCurrentGearList: saveCurrentGearList,
    getPowerSelectionSnapshot: getPowerSelectionSnapshot,
    applyStoredPowerSelection: applyStoredPowerSelection,
    getGearListSelectors: getGearListSelectors,
    applyGearListSelectors: applyGearListSelectors,
    setSelectValue: setSelectValue,
    autoSaveCurrentSetup: autoSaveCurrentSetup,
    saveCurrentSession: saveCurrentSession,
    restoreSessionState: restoreSessionState,
    displayGearAndRequirements: displayGearAndRequirements,
    deleteCurrentGearList: deleteCurrentGearList,
    ensureGearListActions: ensureGearListActions,
    bindGearListEasyrigListener: bindGearListEasyrigListener,
    populateSelect: populateSelect,
    populateLensDropdown: populateLensDropdown,
    populateCameraPropertyDropdown: populateCameraPropertyDropdown,
    populateRecordingResolutionDropdown: populateRecordingResolutionDropdown,
    populateSlowMotionRecordingResolutionDropdown: populateSlowMotionRecordingResolutionDropdown,
    populateFrameRateDropdown: populateFrameRateDropdown,
    populateSlowMotionFrameRateDropdown: populateSlowMotionFrameRateDropdown,
    populateSensorModeDropdown: populateSensorModeDropdown,
    populateSlowMotionSensorModeDropdown: populateSlowMotionSensorModeDropdown,
    populateCodecDropdown: populateCodecDropdown,
    updateRequiredScenariosSummary: updateRequiredScenariosSummary,
    getRequiredScenarioOptionEntries: getRequiredScenarioOptionEntries,
    updateMonitoringConfigurationOptions: updateMonitoringConfigurationOptions,
    updateViewfinderExtensionVisibility: updateViewfinderExtensionVisibility,
    scenarioIcons: scenarioIcons,
    collectProjectFormData: collectProjectFormData,
    populateProjectForm: populateProjectForm,
    renderFilterDetails: renderFilterDetails,
    collectFilterSelections: collectFilterSelections,
    parseFilterTokens: parseFilterTokens,
    applyFilterSelectionsToGearList: applyFilterSelectionsToGearList,
    setCurrentProjectInfo: setCurrentProjectInfo,
    getCurrentProjectInfo: getCurrentProjectInfo,
    crewRoles: crewRoles,
    formatFullBackupFilename: formatFullBackupFilename,
    computeGearListCount: computeGearListCount,
    autoBackup: autoBackup,
    createSettingsBackup: createSettingsBackup,
    buildSettingsBackupPackage: buildSettingsBackupPackage,
    captureStorageSnapshot: captureStorageSnapshot,
    sanitizeBackupPayload: sanitizeBackupPayload,
    extractBackupSections: extractBackupSections,
    searchKey: searchKey,
    searchTokens: searchTokens,
    findBestSearchMatch: findBestSearchMatch,
    runFeatureSearch: runFeatureSearch,
    computeSetupDiff: computeSetupDiff,
    __versionCompareInternals: {
      formatDiffPath: formatDiffPath,
      formatDiffListIndex: formatDiffListIndex,
      createKeyedDiffPathSegment: createKeyedDiffPathSegment,
      parseKeyedDiffPathSegment: parseKeyedDiffPathSegment,
      findArrayComparisonKey: findArrayComparisonKey
    },
    __featureSearchInternals: {
      featureMap: featureMap,
      deviceMap: deviceMap,
      helpMap: helpMap,
      featureSearchEntries: featureSearchEntries,
      featureSearchDefaultOptions: featureSearchDefaultOptions,
      featureSearchInput: featureSearch,
      featureListElement: featureList,
      restoreFeatureSearchDefaults: restoreFeatureSearchDefaults,
      updateFeatureSearchSuggestions: updateFeatureSearchSuggestions
    },
    __customFontInternals: {
      addFromData: function addFromData(name, dataUrl, options) {
        return addCustomFontFromData(name, dataUrl, options);
      },
      getEntries: function getEntries() {
        return Array.from(customFontEntries.values());
      }
    },
    __sharedImportInternals: {
      getLastSharedSetupData: function getLastSharedSetupData() {
        return lastSharedSetupData;
      },
      setLastSharedSetupDataForTest: function setLastSharedSetupDataForTest(value) {
        lastSharedSetupData = value;
      },
      getLastSharedAutoGearRules: function getLastSharedAutoGearRules() {
        return lastSharedAutoGearRules;
      },
      setLastSharedAutoGearRulesForTest: function setLastSharedAutoGearRulesForTest(value) {
        lastSharedAutoGearRules = value;
      },
      isProjectPresetActive: function isProjectPresetActive() {
        return sharedImportProjectPresetActive;
      },
      setProjectPresetActiveForTest: function setProjectPresetActiveForTest(value) {
        sharedImportProjectPresetActive = !!value;
      },
      getPreviousPresetId: function getPreviousPresetId() {
        return sharedImportPreviousPresetId;
      },
      setPreviousPresetIdForTest: function setPreviousPresetIdForTest(value) {
        sharedImportPreviousPresetId = typeof value === 'string' ? value : '';
      },
      isPromptActive: function isPromptActive() {
        return sharedImportPromptActive;
      },
      setPromptActiveForTest: function setPromptActiveForTest(value) {
        sharedImportPromptActive = !!value;
      },
      getPendingSharedLinkListener: function getPendingSharedLinkListener() {
        return pendingSharedLinkListener;
      },
      setPendingSharedLinkListenerForTest: function setPendingSharedLinkListenerForTest(listener) {
        pendingSharedLinkListener = typeof listener === 'function' ? listener : null;
      }
    },
    __mountVoltageInternals: {
      getSessionMountVoltagePreferencesClone: getSessionMountVoltagePreferencesClone,
      applySessionMountVoltagePreferences: applySessionMountVoltagePreferences,
      cloneMountVoltageDefaultsForSession: cloneMountVoltageDefaultsForSession
    },
    collectAutoGearCatalogNames: collectAutoGearCatalogNames,
    buildDefaultVideoDistributionAutoGearRules: buildDefaultVideoDistributionAutoGearRules,
    applyAutoGearRulesToTableHtml: applyAutoGearRulesToTableHtml,
    exportAutoGearRules: exportAutoGearRules,
    importAutoGearRulesFromData: importAutoGearRulesFromData,
    createAutoGearBackup: createAutoGearBackup,
    restoreAutoGearBackup: restoreAutoGearBackup,
    getAutoGearRules: getAutoGearRules,
    syncAutoGearRulesFromStorage: syncAutoGearRulesFromStorage,
    parseDeviceDatabaseImport: parseDeviceDatabaseImport,
    countDeviceDatabaseEntries: countDeviceDatabaseEntries,
    sanitizeShareFilename: sanitizeShareFilename,
    ensureJsonExtension: ensureJsonExtension,
    getDefaultShareFilename: getDefaultShareFilename,
    promptForSharedFilename: promptForSharedFilename,
    downloadSharedProject: downloadSharedProject,
    confirmAutoGearSelection: confirmAutoGearSelection,
    configureSharedImportOptions: configureSharedImportOptions,
    resolveSharedImportMode: resolveSharedImportMode,
    resetPlannerStateAfterFactoryReset: resetPlannerStateAfterFactoryReset,
    __autoGearInternals: {
      buildDefaultVideoDistributionAutoGearRules: buildDefaultVideoDistributionAutoGearRules,
      buildVideoDistributionAutoRules: buildVideoDistributionAutoRules,
      buildAutoGearRulesFromBaseInfo: buildAutoGearRulesFromBaseInfo,
      seedAutoGearRulesFromCurrentProject: seedAutoGearRulesFromCurrentProject,
      clearAutoGearDefaultsSeeded: clearAutoGearDefaultsSeeded
    }
  };
}
function fallbackParseVoltageValue(value, fallback) {
  var toNumeric = function toNumeric(candidate) {
    if (typeof candidate === 'number') {
      return candidate;
    }
    if (typeof candidate === 'string') {
      var normalized = candidate.replace(',', '.');
      return Number.parseFloat(normalized);
    }
    return Number.NaN;
  };
  var clampVoltage = function clampVoltage(numeric) {
    var clamped = Math.min(1000, Math.max(0.1, numeric));
    return Math.round(clamped * 100) / 100;
  };
  var numeric = toNumeric(value);
  if (Number.isFinite(numeric) && numeric > 0) {
    return clampVoltage(numeric);
  }
  var fallbackNumeric = toNumeric(fallback);
  if (Number.isFinite(fallbackNumeric) && fallbackNumeric > 0) {
    return clampVoltage(fallbackNumeric);
  }
  return 0;
}
function resolveSupportedMountVoltageTypes() {
  if (Array.isArray(SUPPORTED_MOUNT_VOLTAGE_TYPES) && SUPPORTED_MOUNT_VOLTAGE_TYPES.length > 0) {
    return SUPPORTED_MOUNT_VOLTAGE_TYPES;
  }
  var inputKeys = mountVoltageInputs && (typeof mountVoltageInputs === "undefined" ? "undefined" : _typeof(mountVoltageInputs)) === 'object' ? Object.keys(mountVoltageInputs) : [];
  if (inputKeys.length > 0) {
    return inputKeys;
  }
  if (DEFAULT_MOUNT_VOLTAGES && (typeof DEFAULT_MOUNT_VOLTAGES === "undefined" ? "undefined" : _typeof(DEFAULT_MOUNT_VOLTAGES)) === 'object') {
    try {
      return Object.keys(DEFAULT_MOUNT_VOLTAGES);
    } catch (defaultKeysError) {
      void defaultKeysError;
    }
  }
  return [];
}
function cloneMountVoltageDefaultsForSession() {
  var runtimeCloneMountVoltageMap = getSessionRuntimeFunction('cloneMountVoltageMap');
  if (runtimeCloneMountVoltageMap) {
    try {
      return runtimeCloneMountVoltageMap(DEFAULT_MOUNT_VOLTAGES);
    } catch (cloneError) {
      warnMissingMountVoltageHelper('cloneMountVoltageMap', cloneError);
    }
  } else {
    warnMissingMountVoltageHelper('cloneMountVoltageMap');
  }
  if (DEFAULT_MOUNT_VOLTAGES && (typeof DEFAULT_MOUNT_VOLTAGES === "undefined" ? "undefined" : _typeof(DEFAULT_MOUNT_VOLTAGES)) === 'object') {
    try {
      return SESSION_DEEP_CLONE(DEFAULT_MOUNT_VOLTAGES);
    } catch (serializationError) {
      void serializationError;
    }
  }
  var clone = {};
  var parse = typeof parseVoltageValue === 'function' ? function (value, fallback) {
    return parseVoltageValue(value, fallback);
  } : function (value, fallback) {
    return fallbackParseVoltageValue(value, fallback);
  };
  resolveSupportedMountVoltageTypes().forEach(function (type) {
    var _DEFAULT_MOUNT_VOLTAG;
    var defaults = ((_DEFAULT_MOUNT_VOLTAG = DEFAULT_MOUNT_VOLTAGES) === null || _DEFAULT_MOUNT_VOLTAG === void 0 ? void 0 : _DEFAULT_MOUNT_VOLTAG[type]) || {};
    clone[type] = {
      high: parse(defaults.high, defaults.high),
      low: parse(defaults.low, defaults.low)
    };
  });
  return clone;
}
function getSessionMountVoltagePreferencesClone() {
  var getMountVoltagePreferencesCloneFn = getSessionRuntimeFunction('getMountVoltagePreferencesClone');
  if (getMountVoltagePreferencesCloneFn) {
    try {
      var clone = getMountVoltagePreferencesCloneFn();
      if (clone && _typeof(clone) === 'object') {
        return clone;
      }
    } catch (helperError) {
      warnMissingMountVoltageHelper('getMountVoltagePreferencesClone', helperError);
    }
  } else {
    warnMissingMountVoltageHelper('getMountVoltagePreferencesClone');
  }
  return cloneMountVoltageDefaultsForSession();
}
function applySessionMountVoltagePreferences(preferences) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var applyMountVoltagePreferencesFn = getSessionRuntimeFunction('applyMountVoltagePreferences');
  if (applyMountVoltagePreferencesFn) {
    try {
      applyMountVoltagePreferencesFn(preferences, options);
      return;
    } catch (helperError) {
      warnMissingMountVoltageHelper('applyMountVoltagePreferences', helperError);
    }
  } else {
    warnMissingMountVoltageHelper('applyMountVoltagePreferences');
  }
  if (options && options.triggerUpdate) {
    var updateMountVoltageInputsFromStateFn = getSessionRuntimeFunction('updateMountVoltageInputsFromState');
    if (updateMountVoltageInputsFromStateFn) {
      try {
        updateMountVoltageInputsFromStateFn();
      } catch (updateError) {
        void updateError;
      }
    }
  }
}
function collectMountVoltageFormValues() {
  var updated = getSessionMountVoltagePreferencesClone();
  var parse = typeof parseVoltageValue === 'function' ? function (value, fallback) {
    return parseVoltageValue(value, fallback);
  } : function (value, fallback) {
    return fallbackParseVoltageValue(value, fallback);
  };
  var defaultClones = cloneMountVoltageDefaultsForSession();
  var supportedTypes = resolveSupportedMountVoltageTypes();
  supportedTypes.forEach(function (type) {
    var _mountVoltageInputs, _DEFAULT_MOUNT_VOLTAG2;
    var fields = (_mountVoltageInputs = mountVoltageInputs) === null || _mountVoltageInputs === void 0 ? void 0 : _mountVoltageInputs[type];
    if (!fields) return;
    var defaults = ((_DEFAULT_MOUNT_VOLTAG2 = DEFAULT_MOUNT_VOLTAGES) === null || _DEFAULT_MOUNT_VOLTAG2 === void 0 ? void 0 : _DEFAULT_MOUNT_VOLTAG2[type]) || {
      high: 0,
      low: 0
    };
    var target = updated[type];
    if (!target || _typeof(target) !== 'object') {
      target = defaultClones[type] ? _objectSpread({}, defaultClones[type]) : {
        high: defaults.high,
        low: defaults.low
      };
      updated[type] = target;
    }
    if (fields.high) {
      var _target$high;
      target.high = parse(fields.high.value, (_target$high = target.high) !== null && _target$high !== void 0 ? _target$high : defaults.high);
    }
    if (fields.low) {
      var _target$low;
      target.low = parse(fields.low.value, (_target$low = target.low) !== null && _target$low !== void 0 ? _target$low : defaults.low);
    }
  });
  return updated;
}
function handleMountVoltageInputChange() {
  var values = collectMountVoltageFormValues();
  applySessionMountVoltagePreferences(values, {
    persist: true,
    triggerUpdate: true
  });
}