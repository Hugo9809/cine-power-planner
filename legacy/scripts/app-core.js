var _settingsButton$query, _autoGearConditionSec, _autoGearConditionSec2, _autoGearConditionSec3, _autoGearConditionSec4, _autoGearConditionSec5, _autoGearConditionSec6, _autoGearConditionSec7, _autoGearConditionSec8, _autoGearConditionSec9, _autoGearConditionSec0, _autoGearConditionSec1, _autoGearConditionSec10, _autoGearConditionSec11, _autoGearConditionSec12, _autoGearConditionSec13, _autoGearConditionSec14, _autoGearConditionSec15, _autoGearConditionSec16, _autoGearConditionSec17, _autoGearConditionSec18, _autoGearConditionSec19, _autoGearConditionSec20, _autoGearConditionSec21, _autoGearConditionSec22, _autoGearConditionSec23, _autoGearConditionSec24, _autoGearConditionSec25, _autoGearConditionSec26, _autoGearConditionSec27, _autoGearConditionSec28, _autoGearConditionSec29, _autoGearConditionSec30;
var _excluded = ["portType", "type"],
  _excluded2 = ["count"],
  _excluded3 = ["type"],
  _excluded4 = ["type"];
function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
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
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _asyncIterator(r) { var n, t, o, e = 2; for ("undefined" != typeof Symbol && (t = Symbol.asyncIterator, o = Symbol.iterator); e--;) { if (t && null != (n = r[t])) return n.call(r); if (o && null != (n = r[o])) return new AsyncFromSyncIterator(n.call(r)); t = "@@asyncIterator", o = "@@iterator"; } throw new TypeError("Object is not async iterable"); }
function AsyncFromSyncIterator(r) { function AsyncFromSyncIteratorContinuation(r) { if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object.")); var n = r.done; return Promise.resolve(r.value).then(function (r) { return { value: r, done: n }; }); } return AsyncFromSyncIterator = function AsyncFromSyncIterator(r) { this.s = r, this.n = r.next; }, AsyncFromSyncIterator.prototype = { s: null, n: null, next: function next() { return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments)); }, return: function _return(r) { var n = this.s.return; return void 0 === n ? Promise.resolve({ value: r, done: !0 }) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments)); }, throw: function _throw(r) { var n = this.s.return; return void 0 === n ? Promise.reject(r) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments)); } }, new AsyncFromSyncIterator(r); }
var LZString;
try {
  LZString = require('lz-string');
} catch (_unused) {
  if (typeof window !== 'undefined' && window.LZString) {
    LZString = window.LZString;
  } else {
    LZString = {
      compressToEncodedURIComponent: function compressToEncodedURIComponent(s) {
        return s;
      },
      decompressFromEncodedURIComponent: function decompressFromEncodedURIComponent(s) {
        return s;
      }
    };
  }
}
var generatePrintableOverview;
try {
  var _require = require('./overview.js');
  generatePrintableOverview = _require.generatePrintableOverview;
} catch (_unused2) {}
var cachedConnectorSummaryGenerator = null;
var connectorSummaryCachePrimed = false;
function resolveConnectorSummaryGenerator() {
  if (connectorSummaryCachePrimed && typeof cachedConnectorSummaryGenerator === 'function') {
    return cachedConnectorSummaryGenerator;
  }
  var scopes = [];
  if (typeof globalThis !== 'undefined') scopes.push(globalThis);
  if (typeof window !== 'undefined') scopes.push(window);
  if (typeof global !== 'undefined') scopes.push(global);
  if (typeof self !== 'undefined') scopes.push(self);
  for (var _i = 0, _scopes = scopes; _i < _scopes.length; _i++) {
    var scope = _scopes[_i];
    if (scope && typeof scope.generateConnectorSummary === 'function') {
      cachedConnectorSummaryGenerator = scope.generateConnectorSummary;
      connectorSummaryCachePrimed = true;
      return cachedConnectorSummaryGenerator;
    }
  }
  if (typeof generateConnectorSummary === 'function') {
    cachedConnectorSummaryGenerator = generateConnectorSummary;
    connectorSummaryCachePrimed = true;
    return cachedConnectorSummaryGenerator;
  }
  return null;
}
function safeGenerateConnectorSummary(device) {
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
}
if (typeof window !== 'undefined') {
  var lottie = window.lottie;
  if (lottie && typeof lottie.useWebWorker === 'function') {
    try {
      lottie.useWebWorker(false);
    } catch (error) {
      console.warn('Unable to disable Lottie web workers', error);
    }
  }
}
var APP_VERSION = "1.0.9";
var IOS_PWA_HELP_STORAGE_KEY = 'iosPwaHelpShown';
var INSTALL_BANNER_DISMISSED_KEY = 'installPromptDismissed';
var installBannerDismissedInSession = false;
var DEVICE_SCHEMA_PATH = 'src/data/schema.json';
var DEVICE_SCHEMA_STORAGE_KEY = 'cameraPowerPlanner_schemaCache';
var AUTO_GEAR_RULES_KEY = typeof AUTO_GEAR_RULES_STORAGE_KEY !== 'undefined' ? AUTO_GEAR_RULES_STORAGE_KEY : 'cameraPowerPlanner_autoGearRules';
var AUTO_GEAR_SEEDED_KEY = typeof AUTO_GEAR_SEEDED_STORAGE_KEY !== 'undefined' ? AUTO_GEAR_SEEDED_STORAGE_KEY : 'cameraPowerPlanner_autoGearSeeded';
var AUTO_GEAR_BACKUPS_KEY = typeof AUTO_GEAR_BACKUPS_STORAGE_KEY !== 'undefined' ? AUTO_GEAR_BACKUPS_STORAGE_KEY : 'cameraPowerPlanner_autoGearBackups';
var AUTO_GEAR_PRESETS_KEY = typeof AUTO_GEAR_PRESETS_STORAGE_KEY !== 'undefined' ? AUTO_GEAR_PRESETS_STORAGE_KEY : 'cameraPowerPlanner_autoGearPresets';
var AUTO_GEAR_ACTIVE_PRESET_KEY = typeof AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY !== 'undefined' ? AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY : 'cameraPowerPlanner_autoGearActivePreset';
var AUTO_GEAR_AUTO_PRESET_KEY = typeof AUTO_GEAR_AUTO_PRESET_STORAGE_KEY !== 'undefined' ? AUTO_GEAR_AUTO_PRESET_STORAGE_KEY : 'cameraPowerPlanner_autoGearAutoPreset';
var AUTO_GEAR_BACKUP_VISIBILITY_KEY = typeof AUTO_GEAR_BACKUP_VISIBILITY_STORAGE_KEY !== 'undefined' ? AUTO_GEAR_BACKUP_VISIBILITY_STORAGE_KEY : 'cameraPowerPlanner_autoGearShowBackups';
var AUTO_GEAR_MONITOR_DEFAULTS_KEY = typeof AUTO_GEAR_MONITOR_DEFAULTS_STORAGE_KEY !== 'undefined' ? AUTO_GEAR_MONITOR_DEFAULTS_STORAGE_KEY : 'cameraPowerPlanner_autoGearMonitorDefaults';
var AUTO_GEAR_BACKUP_INTERVAL_MS = 10 * 60 * 1000;
var AUTO_GEAR_BACKUP_LIMIT = 12;
var AUTO_GEAR_MULTI_SELECT_MIN_ROWS = 8;
var AUTO_GEAR_MULTI_SELECT_MAX_ROWS = 12;
var AUTO_GEAR_FLEX_MULTI_SELECT_MIN_ROWS = 1;
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
try {
  if (typeof localStorage !== 'undefined') {
    var storedTemperatureUnit = localStorage.getItem(TEMPERATURE_STORAGE_KEY);
    if (storedTemperatureUnit) {
      temperatureUnit = normalizeTemperatureUnit(storedTemperatureUnit);
    }
  }
} catch (error) {
  console.warn('Could not load temperature unit preference', error);
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
  _loadDeviceSchemaFromCacheStorage = _asyncToGenerator(_regenerator().m(function _callee3() {
    var candidates, _iterator25, _step25, url, response, _t3, _t4;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          if (!(typeof caches === 'undefined' || !caches || typeof caches.match !== 'function')) {
            _context3.n = 1;
            break;
          }
          return _context3.a(2, null);
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
          _iterator25 = _createForOfIteratorHelper(candidates);
          _context3.p = 2;
          _iterator25.s();
        case 3:
          if ((_step25 = _iterator25.n()).done) {
            _context3.n = 10;
            break;
          }
          url = _step25.value;
          _context3.p = 4;
          _context3.n = 5;
          return caches.match(url, {
            ignoreSearch: true
          });
        case 5:
          response = _context3.v;
          if (!response) {
            _context3.n = 7;
            break;
          }
          _context3.n = 6;
          return response.clone().json();
        case 6:
          return _context3.a(2, _context3.v);
        case 7:
          _context3.n = 9;
          break;
        case 8:
          _context3.p = 8;
          _t3 = _context3.v;
          console.warn('Failed to read schema.json from cache entry', url, _t3);
        case 9:
          _context3.n = 3;
          break;
        case 10:
          _context3.n = 12;
          break;
        case 11:
          _context3.p = 11;
          _t4 = _context3.v;
          _iterator25.e(_t4);
        case 12:
          _context3.p = 12;
          _iterator25.f();
          return _context3.f(12);
        case 13:
          return _context3.a(2, null);
      }
    }, _callee3, null, [[4, 8], [2, 11, 12, 13]]);
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
  populateCategoryOptions();
}
var cachedDeviceSchema = loadCachedDeviceSchema();
var deviceSchema;
try {
  deviceSchema = require('../data/schema.json');
} catch (_unused3) {
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
var AUTO_GEAR_SELECTOR_TYPES = ['none', 'monitor', 'directorMonitor', 'tripodHeadBrand', 'tripodBowl', 'tripodTypes', 'tripodSpreader'];
var AUTO_GEAR_SELECTOR_TYPE_SET = new Set(AUTO_GEAR_SELECTOR_TYPES);
var AUTO_GEAR_MONITOR_FALLBACKS = ['SmallHD Ultra 7', 'SmallHD Focus', 'SmallHD Cine 7'];
var AUTO_GEAR_TRIPOD_SELECTOR_TYPES = new Set(['tripodHeadBrand', 'tripodBowl', 'tripodTypes', 'tripodSpreader']);
var AUTO_GEAR_TRIPOD_FIELD_IDS = {
  tripodHeadBrand: 'tripodHeadBrand',
  tripodBowl: 'tripodBowl',
  tripodTypes: 'tripodTypes',
  tripodSpreader: 'tripodSpreader'
};
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
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref$collapseWhitespa = _ref.collapseWhitespace,
    collapseWhitespace = _ref$collapseWhitespa === void 0 ? true : _ref$collapseWhitespa;
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
  return AUTO_GEAR_SELECTOR_TYPE_SET.has(candidate) ? candidate : 'none';
}
function normalizeAutoGearSelectorDefault(type, value) {
  var text = normalizeAutoGearText(value);
  if (!text) return '';
  var options = getAutoGearSelectorOptions(type);
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
function getAutoGearSelectorOptions(type) {
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
  if (AUTO_GEAR_TRIPOD_SELECTOR_TYPES.has(normalizedType)) {
    return collectTripodPreferenceOptions(normalizedType).map(function (option) {
      return option.value;
    });
  }
  return [];
}
function getAutoGearSelectorLabel(type) {
  var _texts$en7;
  var normalizedType = normalizeAutoGearSelectorType(type);
  var langTexts = texts[currentLang] || texts.en || {};
  if (normalizedType === 'monitor') {
    var _texts$en;
    return langTexts.autoGearSelectorMonitorOption || ((_texts$en = texts.en) === null || _texts$en === void 0 ? void 0 : _texts$en.autoGearSelectorMonitorOption) || 'Monitor selector';
  }
  if (normalizedType === 'directorMonitor') {
    var _texts$en2;
    return langTexts.autoGearSelectorDirectorOption || ((_texts$en2 = texts.en) === null || _texts$en2 === void 0 ? void 0 : _texts$en2.autoGearSelectorDirectorOption) || 'Director monitor selector';
  }
  if (normalizedType === 'tripodHeadBrand') {
    var _texts$en3;
    return langTexts.autoGearSelectorTripodHeadOption || ((_texts$en3 = texts.en) === null || _texts$en3 === void 0 ? void 0 : _texts$en3.autoGearSelectorTripodHeadOption) || 'Tripod head selector';
  }
  if (normalizedType === 'tripodBowl') {
    var _texts$en4;
    return langTexts.autoGearSelectorTripodBowlOption || ((_texts$en4 = texts.en) === null || _texts$en4 === void 0 ? void 0 : _texts$en4.autoGearSelectorTripodBowlOption) || 'Tripod bowl selector';
  }
  if (normalizedType === 'tripodTypes') {
    var _texts$en5;
    return langTexts.autoGearSelectorTripodTypesOption || ((_texts$en5 = texts.en) === null || _texts$en5 === void 0 ? void 0 : _texts$en5.autoGearSelectorTripodTypesOption) || 'Tripod type selector';
  }
  if (normalizedType === 'tripodSpreader') {
    var _texts$en6;
    return langTexts.autoGearSelectorTripodSpreaderOption || ((_texts$en6 = texts.en) === null || _texts$en6 === void 0 ? void 0 : _texts$en6.autoGearSelectorTripodSpreaderOption) || 'Tripod spreader selector';
  }
  return langTexts.autoGearSelectorNoneOption || ((_texts$en7 = texts.en) === null || _texts$en7 === void 0 ? void 0 : _texts$en7.autoGearSelectorNoneOption) || 'No selector';
}
function getAutoGearSelectorScrollHint() {
  var _texts$en8;
  var langTexts = texts[currentLang] || texts.en || {};
  return langTexts.autoGearSelectorScrollHint || ((_texts$en8 = texts.en) === null || _texts$en8 === void 0 ? void 0 : _texts$en8.autoGearSelectorScrollHint) || 'Scroll to see more devices.';
}
function getAutoGearSelectorDefaultPlaceholder() {
  var _texts$en9;
  var langTexts = texts[currentLang] || texts.en || {};
  return langTexts.autoGearSelectorDefaultPlaceholder || ((_texts$en9 = texts.en) === null || _texts$en9 === void 0 ? void 0 : _texts$en9.autoGearSelectorDefaultPlaceholder) || 'Choose a default device';
}
function getAutoGearMonitorDefaultPlaceholder() {
  var _texts$en0;
  var langTexts = texts[currentLang] || texts.en || {};
  return langTexts.autoGearMonitorDefaultPlaceholder || ((_texts$en0 = texts.en) === null || _texts$en0 === void 0 ? void 0 : _texts$en0.autoGearMonitorDefaultPlaceholder) || 'Use recommended automatically';
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
  if (typeof addArriKNumber === 'function' && (normalizedType === 'monitor' || normalizedType === 'directorMonitor')) {
    return addArriKNumber(normalizedValue);
  }
  return normalizedValue;
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
  if (!entry || _typeof(entry) !== 'object') return null;
  var rawName = normalizeAutoGearText(entry.name);
  if (!rawName) return null;
  var _extractAutoGearConte = extractAutoGearContextNotes(rawName),
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
  var selectorDefault = normalizeAutoGearSelectorDefault(selectorType, entry.selectorDefault);
  var selectorEnabled = !!entry.selectorEnabled;
  if (selectorType === 'none') {
    selectorEnabled = false;
  } else if (isAutoGearMonitoringCategory(category)) {
    selectorEnabled = true;
  }
  var notes = normalizeAutoGearText(entry.notes);
  return {
    id: id,
    name: name,
    category: category,
    quantity: quantity,
    screenSize: screenSize,
    selectorType: selectorType,
    selectorDefault: selectorDefault,
    selectorEnabled: selectorEnabled,
    notes: notes,
    contextNotes: contexts
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
    var _ref2, _ref3, _ref4, _setting$mode, _ref5, _ref6, _ref7, _ref8, _setting$value;
    var modeSource = (_ref2 = (_ref3 = (_ref4 = (_setting$mode = setting.mode) !== null && _setting$mode !== void 0 ? _setting$mode : setting.type) !== null && _ref4 !== void 0 ? _ref4 : setting.comparison) !== null && _ref3 !== void 0 ? _ref3 : setting.condition) !== null && _ref2 !== void 0 ? _ref2 : setting.kind;
    var mode = normalizeAutoGearShootingDayMode(modeSource);
    var valueSource = (_ref5 = (_ref6 = (_ref7 = (_ref8 = (_setting$value = setting.value) !== null && _setting$value !== void 0 ? _setting$value : setting.count) !== null && _ref8 !== void 0 ? _ref8 : setting.days) !== null && _ref7 !== void 0 ? _ref7 : setting.minimum) !== null && _ref6 !== void 0 ? _ref6 : setting.maximum) !== null && _ref5 !== void 0 ? _ref5 : setting.frequency;
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
  var monitor = normalizeAutoGearTriggerList(rule.monitor).sort(function (a, b) {
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
  if (!always && !scenarios.length && !shootingDays && !mattebox.length && !cameraHandle.length && !viewfinderExtension.length && !deliveryResolution.length && !videoDistribution.length && !camera.length && !monitor.length && !crewPresent.length && !crewAbsent.length && !wireless.length && !motors.length && !controllers.length && !distance.length) return null;
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
    monitor: monitor,
    crewPresent: crewPresent,
    crewAbsent: crewAbsent,
    wireless: wireless,
    motors: motors,
    controllers: controllers,
    distance: distance,
    shootingDays: shootingDays,
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
      notes: ''
    };
  }
  var name = normalized.name,
    category = normalized.category,
    quantity = normalized.quantity,
    screenSize = normalized.screenSize,
    selectorType = normalized.selectorType,
    selectorDefault = normalized.selectorDefault,
    selectorEnabled = normalized.selectorEnabled,
    notes = normalized.notes;
  return {
    name: name,
    category: category,
    quantity: normalizeAutoGearQuantity(quantity),
    screenSize: screenSize,
    selectorType: selectorType,
    selectorDefault: selectorDefault,
    selectorEnabled: selectorEnabled,
    notes: notes
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
  return "".concat(name, "|").concat(category, "|").concat(quantity, "|").concat(screenSize, "|").concat(selectorType, "|").concat(selectorEnabled, "|").concat(selectorDefault, "|").concat(notes);
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
    monitor: normalized.monitor.slice().sort(function (a, b) {
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
  var monitorKey = Array.isArray(rule.monitor) ? rule.monitor.join('|') : '';
  var crewPresentKey = Array.isArray(rule.crewPresent) ? rule.crewPresent.join('|') : '';
  var crewAbsentKey = Array.isArray(rule.crewAbsent) ? rule.crewAbsent.join('|') : '';
  var wirelessKey = Array.isArray(rule.wireless) ? rule.wireless.join('|') : '';
  var motorsKey = Array.isArray(rule.motors) ? rule.motors.join('|') : '';
  var controllersKey = Array.isArray(rule.controllers) ? rule.controllers.join('|') : '';
  var distanceKey = Array.isArray(rule.distance) ? rule.distance.join('|') : '';
  var shootingDaysCondition = normalizeAutoGearShootingDaysCondition(rule === null || rule === void 0 ? void 0 : rule.shootingDays);
  var shootingDaysKey = shootingDaysCondition ? "".concat(shootingDaysCondition.mode, ":").concat(shootingDaysCondition.value) : '';
  var addKey = Array.isArray(rule.add) ? rule.add.map(autoGearItemSortKey).join('|') : '';
  var removeKey = Array.isArray(rule.remove) ? rule.remove.map(autoGearItemSortKey).join('|') : '';
  return "".concat(alwaysKey, "|").concat(scenarioKey, "|").concat(matteboxKey, "|").concat(cameraHandleKey, "|").concat(viewfinderKey, "|").concat(deliveryResolutionKey, "|").concat(videoDistributionKey, "|").concat(cameraKey, "|").concat(monitorKey, "|").concat(crewPresentKey, "|").concat(crewAbsentKey, "|").concat(wirelessKey, "|").concat(motorsKey, "|").concat(controllersKey, "|").concat(distanceKey, "|").concat(shootingDaysKey, "|").concat(rule.label || '', "|").concat(addKey, "|").concat(removeKey);
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
  return {
    id: id,
    createdAt: createdAt,
    rules: rules,
    monitorDefaults: monitorDefaults
  };
}
function readAutoGearBackupsFromStorage() {
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
  return stored.map(normalizeAutoGearBackupEntry).filter(Boolean).sort(function (a, b) {
    if (a.createdAt === b.createdAt) return 0;
    return a.createdAt > b.createdAt ? -1 : 1;
  }).slice(0, AUTO_GEAR_BACKUP_LIMIT);
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
function persistAutoGearBackups(backups) {
  var payload = Array.isArray(backups) ? backups.map(function (entry) {
    return {
      id: entry.id,
      createdAt: entry.createdAt,
      rules: Array.isArray(entry.rules) ? entry.rules : [],
      monitorDefaults: normalizeAutoGearMonitorDefaults(entry.monitorDefaults)
    };
  }) : [];
  if (typeof saveAutoGearBackups === 'function') {
    saveAutoGearBackups(payload);
    return;
  }
  if (typeof localStorage === 'undefined') {
    throw new Error('Storage unavailable');
  }
  localStorage.setItem(AUTO_GEAR_BACKUPS_KEY, JSON.stringify(payload));
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
var baseAutoGearRules = autoGearRules.slice();
var projectScopedAutoGearRules = null;
var autoGearBackups = readAutoGearBackupsFromStorage();
var autoGearPresets = readAutoGearPresetsFromStorage();
var activeAutoGearPresetId = readActiveAutoGearPresetIdFromStorage();
var autoGearAutoPresetId = readAutoGearAutoPresetIdFromStorage();
var autoGearBackupsVisible = readAutoGearBackupVisibilityFromStorage();
var autoGearMonitorDefaults = readAutoGearMonitorDefaultsFromStorage();
var factoryAutoGearRulesSnapshot = null;
var factoryAutoGearSeedContext = null;
function getAutoGearBackupEntrySignature(entry) {
  if (!entry || _typeof(entry) !== 'object') return '';
  return stableStringify({
    rules: Array.isArray(entry.rules) ? entry.rules : [],
    monitorDefaults: normalizeAutoGearMonitorDefaults(entry.monitorDefaults)
  });
}
function getAutoGearConfigurationSignature() {
  var rules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : baseAutoGearRules;
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
var autoGearRulesLastBackupSignature = autoGearBackups.length ? getAutoGearBackupEntrySignature(autoGearBackups[0]) : initialAutoGearRulesSignature;
var autoGearRulesLastPersistedSignature = initialAutoGearRulesSignature;
var autoGearRulesDirtySinceBackup = autoGearRulesLastPersistedSignature !== autoGearRulesLastBackupSignature;
reconcileAutoGearAutoPresetState({
  persist: true,
  skipRender: true
});
alignActiveAutoGearPreset({
  skipRender: true
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
      updateAutoGearMonitorDefaultOptions();
      renderAutoGearMonitorDefaultsControls();
    }
    return autoGearMonitorDefaults;
  }
  autoGearMonitorDefaults = persistAutoGearMonitorDefaults(normalized);
  syncBaseAutoGearRulesState();
  if (!skipRender) {
    updateAutoGearMonitorDefaultOptions();
    renderAutoGearMonitorDefaultsControls();
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
      updateAutoGearMonitorDefaultOptions();
      renderAutoGearMonitorDefaultsControls();
    }
    return normalizedValue;
  }
  var nextDefaults = _objectSpread(_objectSpread({}, autoGearMonitorDefaults), {}, _defineProperty({}, key, normalizedValue));
  setAutoGearMonitorDefaults(nextDefaults, options);
  return normalizedValue;
}
function setAutoGearRules(rules) {
  var normalized = assignAutoGearRules(rules);
  baseAutoGearRules = normalized.slice();
  projectScopedAutoGearRules = null;
  persistAutoGearRules();
  syncBaseAutoGearRulesState();
  alignActiveAutoGearPreset({
    skipRender: true
  });
  syncAutoGearAutoPreset(normalized);
  renderAutoGearPresetsControls();
}
function getAutoGearRules() {
  return autoGearRules.slice();
}
function syncAutoGearRulesFromStorage(rules) {
  if (Array.isArray(rules)) {
    setAutoGearRules(rules);
  } else {
    baseAutoGearRules = readAutoGearRulesFromStorage();
    projectScopedAutoGearRules = null;
    assignAutoGearRules(baseAutoGearRules);
    syncBaseAutoGearRulesState();
  }
  autoGearBackups = readAutoGearBackupsFromStorage();
  autoGearPresets = readAutoGearPresetsFromStorage();
  activeAutoGearPresetId = readActiveAutoGearPresetIdFromStorage();
  autoGearAutoPresetId = readAutoGearAutoPresetIdFromStorage();
  autoGearBackupsVisible = readAutoGearBackupVisibilityFromStorage();
  autoGearMonitorDefaults = readAutoGearMonitorDefaultsFromStorage();
  autoGearRulesLastBackupSignature = autoGearBackups.length ? getAutoGearBackupEntrySignature(autoGearBackups[0]) : getAutoGearConfigurationSignature();
  autoGearRulesLastPersistedSignature = getAutoGearConfigurationSignature();
  autoGearRulesDirtySinceBackup = autoGearRulesLastPersistedSignature !== autoGearRulesLastBackupSignature;
  reconcileAutoGearAutoPresetState({
    persist: true,
    skipRender: true
  });
  syncAutoGearAutoPreset(baseAutoGearRules);
  alignActiveAutoGearPreset({
    skipRender: true
  });
  renderAutoGearBackupControls();
  renderAutoGearPresetsControls();
  closeAutoGearEditor();
  renderAutoGearRulesList();
  updateAutoGearCatalogOptions();
  renderAutoGearMonitorDefaultsControls();
}
function useProjectAutoGearRules(rules) {
  if (Array.isArray(rules) && rules.length) {
    projectScopedAutoGearRules = assignAutoGearRules(rules).slice();
  } else {
    projectScopedAutoGearRules = null;
    assignAutoGearRules(baseAutoGearRules);
  }
}
function clearProjectAutoGearRules() {
  if (!projectScopedAutoGearRules || !projectScopedAutoGearRules.length) {
    projectScopedAutoGearRules = null;
    assignAutoGearRules(baseAutoGearRules);
    return;
  }
  projectScopedAutoGearRules = null;
  assignAutoGearRules(baseAutoGearRules);
}
function getProjectScopedAutoGearRules() {
  return projectScopedAutoGearRules ? projectScopedAutoGearRules.slice() : null;
}
function usingProjectAutoGearRules() {
  return Array.isArray(projectScopedAutoGearRules) && projectScopedAutoGearRules.length > 0;
}
function getBaseAutoGearRules() {
  return baseAutoGearRules.slice();
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
function cloneAutoGearItems(items) {
  return items.map(function (item) {
    var normalized = normalizeAutoGearItem(item);
    if (!normalized) return null;
    return _objectSpread({}, normalized);
  }).filter(Boolean);
}
function cloneAutoGearRuleItem(item) {
  if (!item || _typeof(item) !== 'object') {
    return {
      id: '',
      name: '',
      category: '',
      quantity: 0,
      screenSize: '',
      selectorType: 'none',
      selectorDefault: '',
      selectorEnabled: false,
      notes: '',
      contextNotes: []
    };
  }
  return {
    id: typeof item.id === 'string' ? item.id : '',
    name: typeof item.name === 'string' ? item.name : '',
    category: typeof item.category === 'string' ? item.category : '',
    quantity: normalizeAutoGearQuantity(item.quantity),
    screenSize: typeof item.screenSize === 'string' ? item.screenSize : '',
    selectorType: typeof item.selectorType === 'string' ? item.selectorType : 'none',
    selectorDefault: typeof item.selectorDefault === 'string' ? item.selectorDefault : '',
    selectorEnabled: !!item.selectorEnabled,
    notes: typeof item.notes === 'string' ? item.notes : '',
    contextNotes: Array.isArray(item.contextNotes) ? item.contextNotes.filter(Boolean) : []
  };
}
function cloneAutoGearRule(rule) {
  if (!rule || _typeof(rule) !== 'object') return null;
  return {
    id: typeof rule.id === 'string' ? rule.id : '',
    label: typeof rule.label === 'string' ? rule.label : '',
    always: Boolean(rule.always),
    scenarios: Array.isArray(rule.scenarios) ? rule.scenarios.slice() : [],
    mattebox: Array.isArray(rule.mattebox) ? rule.mattebox.slice() : [],
    cameraHandle: Array.isArray(rule.cameraHandle) ? rule.cameraHandle.slice() : [],
    viewfinderExtension: Array.isArray(rule.viewfinderExtension) ? rule.viewfinderExtension.slice() : [],
    videoDistribution: Array.isArray(rule.videoDistribution) ? rule.videoDistribution.slice() : [],
    camera: Array.isArray(rule.camera) ? rule.camera.slice() : [],
    monitor: Array.isArray(rule.monitor) ? rule.monitor.slice() : [],
    crewPresent: Array.isArray(rule.crewPresent) ? rule.crewPresent.slice() : [],
    crewAbsent: Array.isArray(rule.crewAbsent) ? rule.crewAbsent.slice() : [],
    wireless: Array.isArray(rule.wireless) ? rule.wireless.slice() : [],
    motors: Array.isArray(rule.motors) ? rule.motors.slice() : [],
    controllers: Array.isArray(rule.controllers) ? rule.controllers.slice() : [],
    distance: Array.isArray(rule.distance) ? rule.distance.slice() : [],
    shootingDays: normalizeAutoGearShootingDaysCondition(rule.shootingDays),
    add: Array.isArray(rule.add) ? rule.add.map(cloneAutoGearRuleItem) : [],
    remove: Array.isArray(rule.remove) ? rule.remove.map(cloneAutoGearRuleItem) : []
  };
}
function cloneAutoGearRules(rules) {
  return Array.isArray(rules) ? rules.map(cloneAutoGearRule).filter(Boolean) : [];
}
function setFactoryAutoGearRulesSnapshot(rules) {
  if (!Array.isArray(rules)) {
    factoryAutoGearRulesSnapshot = null;
    return;
  }
  factoryAutoGearRulesSnapshot = cloneAutoGearRules(rules);
}
function subtractScenarioContributions(diff, scenarioKeys, scenarioDiffMap) {
  var adjust = function adjust(items, type) {
    return items.map(function (item) {
      var remaining = normalizeAutoGearQuantity(item.quantity);
      scenarioKeys.forEach(function (key) {
        var scenarioDiff = scenarioDiffMap.get(key);
        if (!scenarioDiff) return;
        var match = scenarioDiff[type].find(function (entry) {
          return entry.name === item.name && entry.category === item.category;
        });
        if (match) {
          remaining -= normalizeAutoGearQuantity(match.quantity);
        }
      });
      remaining = Math.max(remaining, 0);
      if (remaining <= 0) return null;
      var normalized = normalizeAutoGearItem(item);
      if (!normalized) return null;
      return _objectSpread(_objectSpread({}, normalized), {}, {
        quantity: remaining
      });
    }).filter(Boolean);
  };
  return {
    add: adjust(diff.add, 'add'),
    remove: adjust(diff.remove, 'remove')
  };
}
function extractAutoGearSelections(value) {
  if (typeof value !== 'string') return [];
  return value.split(',').map(function (part) {
    return part.trim();
  }).filter(Boolean);
}
function buildCameraHandleAutoRules(baseInfo, baselineMap) {
  if (!baselineMap || typeof generateGearListHtml !== 'function' || typeof parseGearTableForAutoRules !== 'function') {
    return [];
  }
  var selections = extractAutoGearSelections(baseInfo && baseInfo.cameraHandle);
  var selectionSet = new Set(selections);
  var optionValues = [];
  if (typeof document !== 'undefined') {
    var handleSelect = document.getElementById('cameraHandle');
    if (handleSelect) {
      Array.from(handleSelect.options || []).forEach(function (option) {
        var value = typeof option.value === 'string' ? option.value.trim() : '';
        if (value) optionValues.push(value);
      });
    }
  }
  var candidates = Array.from(new Set(selections.concat(optionValues).map(function (value) {
    return typeof value === 'string' ? value.trim() : '';
  }).filter(Boolean)));
  if (!candidates.length) return [];
  var rules = [];
  candidates.forEach(function (candidate) {
    var trimmed = candidate.trim();
    if (!trimmed) return;
    var variantHandles;
    var diff;
    if (selectionSet.has(trimmed)) {
      variantHandles = selections.filter(function (value) {
        return value !== trimmed;
      });
      var variantInfo = _objectSpread(_objectSpread({}, baseInfo), {}, {
        cameraHandle: variantHandles.join(', ')
      });
      var variantHtml = generateGearListHtml(_objectSpread(_objectSpread({}, variantInfo), {}, {
        requiredScenarios: ''
      }));
      var variantMap = parseGearTableForAutoRules(variantHtml);
      if (!variantMap) return;
      diff = diffGearTableMaps(variantMap, baselineMap);
    } else {
      variantHandles = selections.slice();
      variantHandles.push(trimmed);
      var _variantInfo = _objectSpread(_objectSpread({}, baseInfo), {}, {
        cameraHandle: variantHandles.join(', ')
      });
      var _variantHtml = generateGearListHtml(_objectSpread(_objectSpread({}, _variantInfo), {}, {
        requiredScenarios: ''
      }));
      var _variantMap = parseGearTableForAutoRules(_variantHtml);
      if (!_variantMap) return;
      diff = diffGearTableMaps(baselineMap, _variantMap);
    }
    if (!diff || !diff.add.length && !diff.remove.length) return;
    var additions = cloneAutoGearItems(diff.add);
    if (!additions.length) return;
    var removals = cloneAutoGearItems(diff.remove);
    rules.push({
      id: generateAutoGearId('rule'),
      label: trimmed,
      scenarios: [],
      mattebox: [],
      cameraHandle: [trimmed],
      viewfinderExtension: [],
      videoDistribution: [],
      add: additions,
      remove: removals
    });
  });
  return rules;
}
function buildViewfinderExtensionAutoRules(baseInfo, baselineMap) {
  if (!baselineMap || typeof generateGearListHtml !== 'function' || typeof parseGearTableForAutoRules !== 'function') {
    return [];
  }
  var selections = extractAutoGearSelections(baseInfo && baseInfo.viewfinderExtension);
  if (!selections.length) return [];
  var uniqueSelections = Array.from(new Set(selections));
  var rules = [];
  uniqueSelections.forEach(function (selection) {
    var trimmed = selection.trim();
    if (!trimmed) return;
    var remainingSelections = selections.filter(function (value) {
      return value !== trimmed;
    });
    var variantInfo = _objectSpread(_objectSpread({}, baseInfo), {}, {
      viewfinderExtension: remainingSelections.join(', ')
    });
    var variantHtml = generateGearListHtml(_objectSpread(_objectSpread({}, variantInfo), {}, {
      requiredScenarios: ''
    }));
    var variantMap = parseGearTableForAutoRules(variantHtml);
    if (!variantMap) return;
    var diff = diffGearTableMaps(variantMap, baselineMap);
    if (!diff.add.length && !diff.remove.length) return;
    var additions = cloneAutoGearItems(diff.add);
    if (!additions.length) return;
    var removals = cloneAutoGearItems(diff.remove);
    rules.push({
      id: generateAutoGearId('rule'),
      label: getViewfinderFallbackLabel(trimmed),
      scenarios: [],
      mattebox: [],
      cameraHandle: [],
      viewfinderExtension: [trimmed],
      videoDistribution: [],
      add: additions,
      remove: removals
    });
  });
  return rules;
}
function buildVideoDistributionAutoRules(baseInfo, baselineMap) {
  if (!baselineMap || typeof generateGearListHtml !== 'function' || typeof parseGearTableForAutoRules !== 'function') {
    return [];
  }
  var selections = extractAutoGearSelections(baseInfo && baseInfo.videoDistribution);
  if (!selections.length) return [];
  var uniqueSelections = Array.from(new Set(selections));
  var rules = [];
  uniqueSelections.forEach(function (selection) {
    var trimmed = selection.trim();
    if (!trimmed) return;
    var lower = trimmed.toLowerCase();
    if (lower === '__none__' || lower === 'none') return;
    var remainingSelections = selections.filter(function (value) {
      return value !== trimmed;
    });
    var variantInfo = _objectSpread(_objectSpread({}, baseInfo), {}, {
      videoDistribution: remainingSelections.join(', ')
    });
    var variantHtml = generateGearListHtml(_objectSpread(_objectSpread({}, variantInfo), {}, {
      requiredScenarios: ''
    }));
    var variantMap = parseGearTableForAutoRules(variantHtml);
    if (!variantMap) return;
    var diff = diffGearTableMaps(variantMap, baselineMap);
    if (!diff.add.length && !diff.remove.length) return;
    var additions = cloneAutoGearItems(diff.add);
    if (!additions.length) return;
    var removals = cloneAutoGearItems(diff.remove);
    rules.push({
      id: generateAutoGearId('rule'),
      label: getVideoDistributionFallbackLabel(trimmed),
      scenarios: [],
      mattebox: [],
      cameraHandle: [],
      viewfinderExtension: [],
      videoDistribution: [trimmed],
      add: additions,
      remove: removals
    });
  });
  return rules;
}
function buildDefaultVideoDistributionAutoGearRules() {
  var baseInfo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (typeof generateGearListHtml !== 'function' || typeof parseGearTableForAutoRules !== 'function') {
    return [];
  }
  var select = document.getElementById('videoDistribution');
  if (!select) return [];
  var optionValues = [];
  var seen = new Set();
  Array.from(select.options || []).forEach(function (option) {
    if (!option) return;
    var rawValue = typeof option.value === 'string' ? option.value.trim() : '';
    var normalized = normalizeVideoDistributionOptionValue(rawValue);
    if (!normalized || normalized === '__none__') return;
    if (seen.has(normalized)) return;
    seen.add(normalized);
    optionValues.push(rawValue);
  });
  if (!optionValues.length) return [];
  var baseProjectInfo = _objectSpread({}, baseInfo || {});
  delete baseProjectInfo.videoDistribution;
  var emptyHtml = generateGearListHtml(_objectSpread(_objectSpread({}, baseProjectInfo), {}, {
    requiredScenarios: ''
  }));
  var emptyMap = parseGearTableForAutoRules(emptyHtml);
  if (!emptyMap) return [];
  var generatedRules = [];
  var handledTriggers = new Set();
  optionValues.forEach(function (rawValue) {
    var trimmed = typeof rawValue === 'string' ? rawValue.trim() : '';
    if (!trimmed) return;
    var normalized = normalizeVideoDistributionOptionValue(trimmed);
    if (!normalized || handledTriggers.has(normalized)) return;
    handledTriggers.add(normalized);
    var infoForSelection = _objectSpread(_objectSpread({}, baseInfo || {}), {}, {
      videoDistribution: trimmed
    });
    var selectionHtml = generateGearListHtml(_objectSpread(_objectSpread({}, infoForSelection), {}, {
      requiredScenarios: ''
    }));
    var selectionMap = parseGearTableForAutoRules(selectionHtml);
    if (!selectionMap) return;
    var diff = diffGearTableMaps(emptyMap, selectionMap);
    var additions = cloneAutoGearItems(diff.add);
    var removals = cloneAutoGearItems(diff.remove);
    if (!additions.length && !removals.length) return;
    generatedRules.push({
      id: generateAutoGearId('rule'),
      label: getVideoDistributionFallbackLabel(trimmed),
      scenarios: [],
      mattebox: [],
      cameraHandle: [],
      viewfinderExtension: [],
      videoDistribution: [trimmed],
      add: additions,
      remove: removals
    });
  });
  var hasIosOption = optionValues.some(function (value) {
    return value && value.toLowerCase() === 'ios video';
  });
  if (hasIosOption) {
    var iosLabel = optionValues.find(function (value) {
      return value && value.toLowerCase() === 'ios video';
    }) || 'IOS Video';
    var normalizedIos = normalizeAutoGearTriggerValue(iosLabel);
    var hasGeneratedIosRule = generatedRules.some(function (rule) {
      return Array.isArray(rule.videoDistribution) && rule.videoDistribution.some(function (value) {
        return normalizeAutoGearTriggerValue(value) === normalizedIos;
      });
    });
    if (!hasGeneratedIosRule) {
      var createdNames = new Set();
      var createItem = function createItem(name, category) {
        var quantity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        if (!name || !category || quantity <= 0) return null;
        var key = "".concat(name, "|").concat(category);
        if (createdNames.has(key)) return null;
        createdNames.add(key);
        return {
          id: generateAutoGearId('item'),
          name: name,
          category: category,
          quantity: quantity,
          screenSize: '',
          selectorType: 'none',
          selectorDefault: '',
          selectorEnabled: false,
          notes: ''
        };
      };
      var additions = [];
      var iosDevices = devices && _typeof(devices) === 'object' ? devices.iosVideo : null;
      if (iosDevices && _typeof(iosDevices) === 'object') {
        Object.keys(iosDevices).forEach(function (deviceName) {
          var item = createItem(deviceName, 'Monitoring');
          if (item) additions.push(item);
        });
      }
      if (!additions.length) {
        var fallback = createItem('Teradek - Link AX WifiRouter/Access Point', 'Monitoring');
        if (fallback) additions.push(fallback);
      }
      var pushSupport = function pushSupport(name, category) {
        var quantity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var item = createItem(name, category, quantity);
        if (item) additions.push(item);
      };
      pushSupport('Apple iPad Air 5 or better', 'Monitoring', 1);
      pushSupport('USB-C Charger (iOS Video)', 'Monitoring support', 2);
      pushSupport('Wi-Fi Router (iOS Video Village)', 'Monitoring support');
      if (additions.length) {
        generatedRules.push({
          id: generateAutoGearId('rule'),
          label: getVideoDistributionFallbackLabel(iosLabel),
          scenarios: [],
          mattebox: [],
          cameraHandle: [],
          viewfinderExtension: [],
          videoDistribution: [iosLabel],
          add: additions,
          remove: []
        });
      }
    }
  }
  return generatedRules;
}
function buildDefaultMatteboxAutoGearRules() {
  var category = 'Matte box + filter';
  var createItems = function createItems(names) {
    return names.map(function (name) {
      return {
        id: generateAutoGearId('item'),
        name: name,
        category: category,
        quantity: 1
      };
    });
  };
  return [{
    id: generateAutoGearId('rule'),
    label: 'Mattebox: Swing Away',
    scenarios: [],
    mattebox: ['Swing Away'],
    add: createItems(['ARRI LMB 4x5 Pro Set', 'ARRI LMB 19mm Studio Rod Adapter', 'ARRI LMB 4x5 / LMB-6 Tray Catcher']),
    remove: []
  }, {
    id: generateAutoGearId('rule'),
    label: 'Mattebox: Rod based',
    scenarios: [],
    mattebox: ['Rod based'],
    add: createItems(['ARRI LMB 4x5 15mm LWS Set 3-Stage', 'ARRI LMB 19mm Studio Rod Adapter', 'ARRI LMB 4x5 / LMB-6 Tray Catcher', 'ARRI LMB 4x5 Side Flags', 'ARRI LMB Flag Holders', 'ARRI LMB 4x5 Set of Mattes spherical', 'ARRI LMB Accessory Adapter', 'ARRI Anti-Reflection Frame 4x5.65']),
    remove: []
  }, {
    id: generateAutoGearId('rule'),
    label: 'Mattebox: Clamp On',
    scenarios: [],
    mattebox: ['Clamp On'],
    add: createItems(['ARRI LMB 4x5 Clamp-On (3-Stage)', 'ARRI LMB 4x5 / LMB-6 Tray Catcher', 'ARRI LMB 4x5 Side Flags', 'ARRI LMB Flag Holders', 'ARRI LMB 4x5 Set of Mattes spherical', 'ARRI LMB Accessory Adapter', 'ARRI Anti-Reflection Frame 4x5.65', 'ARRI LMB 4x5 Clamp Adapter Set Pro']),
    remove: []
  }];
}
function buildAlwaysAutoGearRule() {
  var createItem = function createItem(name, category) {
    var quantity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    if (!name || !category || quantity <= 0) return null;
    return {
      id: generateAutoGearId('item'),
      name: name,
      category: category,
      quantity: quantity,
      screenSize: typeof options.screenSize === 'string' ? options.screenSize : '',
      selectorType: typeof options.selectorType === 'string' ? options.selectorType : 'none',
      selectorDefault: typeof options.selectorDefault === 'string' ? options.selectorDefault : '',
      selectorEnabled: options.selectorEnabled === true,
      notes: typeof options.notes === 'string' ? options.notes : ''
    };
  };
  var additions = [];
  var pushItem = function pushItem(name, category, quantity, options) {
    var item = createItem(name, category, quantity, options);
    if (item) additions.push(item);
  };
  [['BNC Cable 0.5 m', 'Monitoring support', 1], ['BNC Cable 1 m', 'Monitoring support', 1], ['BNC Cable 5 m', 'Monitoring support', 1], ['BNC Cable 10 m', 'Monitoring support', 1], ['BNC Drum 25 m', 'Monitoring support', 1], ['ULCS Bracket with 1/4" to 1/4"', 'Rigging', 2], ['ULCS Bracket with 3/8" to 1/4"', 'Rigging', 2], ['Noga Arm', 'Rigging', 2], ['Mini Magic Arm', 'Rigging', 2], ['Cine Quick Release', 'Rigging', 4], ['SmallRig - Super lightweight 15mm RailBlock', 'Rigging', 1], ['Spigot with male 3/8" and 1/4"', 'Rigging', 3], ['Clapper Stick', 'Rigging', 2], ['D-Tap Splitter', 'Rigging', 2], ['Magliner Senior - with quick release mount + tripod holder + utility tray + O‘Connor-Aufhängung', 'Carts and Transportation', 1], ['Securing Straps (25mm wide)', 'Carts and Transportation', 10], ['Loading Ramp (pair, 420kg)', 'Carts and Transportation', 1], ['Ring Fitting for Airline Rails', 'Carts and Transportation', 20]].forEach(function (_ref0) {
    var _ref1 = _slicedToArray(_ref0, 3),
      name = _ref1[0],
      category = _ref1[1],
      quantity = _ref1[2];
    return pushItem(name, category, quantity);
  });
  if (!additions.length) return null;
  return {
    id: generateAutoGearId('rule'),
    label: 'Always',
    always: true,
    scenarios: [],
    mattebox: [],
    cameraHandle: [],
    viewfinderExtension: [],
    videoDistribution: [],
    camera: [],
    monitor: [],
    wireless: [],
    motors: [],
    controllers: [],
    distance: [],
    add: additions,
    remove: []
  };
}
function ensureDefaultMatteboxAutoGearRules() {
  var defaults = buildDefaultMatteboxAutoGearRules();
  if (!defaults.length) return false;
  var existingKeys = new Set(autoGearRules.map(autoGearRuleMatteboxKey).filter(Boolean));
  var additions = defaults.filter(function (rule) {
    var key = autoGearRuleMatteboxKey(rule);
    if (!key) return false;
    if (existingKeys.has(key)) return false;
    existingKeys.add(key);
    return true;
  });
  if (!additions.length) return false;
  setAutoGearRules(autoGearRules.concat(additions));
  return true;
}
function captureSetupSelectValues() {
  var captureList = function captureList(list) {
    return list.map(function (sel) {
      return sel && typeof sel.value === 'string' ? sel.value : '';
    });
  };
  return {
    camera: cameraSelect && typeof cameraSelect.value === 'string' ? cameraSelect.value : '',
    monitor: monitorSelect && typeof monitorSelect.value === 'string' ? monitorSelect.value : '',
    video: videoSelect && typeof videoSelect.value === 'string' ? videoSelect.value : '',
    cage: cageSelect && typeof cageSelect.value === 'string' ? cageSelect.value : '',
    distance: distanceSelect && typeof distanceSelect.value === 'string' ? distanceSelect.value : '',
    battery: batterySelect && typeof batterySelect.value === 'string' ? batterySelect.value : '',
    batteryPlate: batteryPlateSelect && typeof batteryPlateSelect.value === 'string' ? batteryPlateSelect.value : '',
    hotswap: hotswapSelect && typeof hotswapSelect.value === 'string' ? hotswapSelect.value : '',
    motors: captureList(motorSelects),
    controllers: captureList(controllerSelects),
    sliderBowl: typeof getSliderBowlValue === 'function' ? getSliderBowlValue() : '',
    easyrig: typeof getEasyrigValue === 'function' ? getEasyrigValue() : ''
  };
}
function applySetupSelectValues(values) {
  if (!values || _typeof(values) !== 'object') return;
  if (cameraSelect) {
    setSelectValue(cameraSelect, values.camera);
    if (typeof updateBatteryPlateVisibility === 'function') {
      updateBatteryPlateVisibility();
    }
    if (typeof updateBatteryOptions === 'function') {
      updateBatteryOptions();
    }
  }
  if (batteryPlateSelect) setSelectValue(batteryPlateSelect, values.batteryPlate);
  if (monitorSelect) setSelectValue(monitorSelect, values.monitor);
  if (videoSelect) setSelectValue(videoSelect, values.video);
  if (cageSelect) setSelectValue(cageSelect, values.cage);
  if (distanceSelect) setSelectValue(distanceSelect, values.distance);
  if (Array.isArray(values.motors)) {
    values.motors.forEach(function (val, index) {
      if (motorSelects[index]) setSelectValue(motorSelects[index], val);
    });
  }
  if (Array.isArray(values.controllers)) {
    values.controllers.forEach(function (val, index) {
      if (controllerSelects[index]) setSelectValue(controllerSelects[index], val);
    });
  }
  if (batterySelect) setSelectValue(batterySelect, values.battery);
  if (hotswapSelect) setSelectValue(hotswapSelect, values.hotswap);
  if (typeof setSliderBowlValue === 'function') setSliderBowlValue(values.sliderBowl);
  if (typeof setEasyrigValue === 'function') setEasyrigValue(values.easyrig);
}
function captureAutoGearSeedContext() {
  if (factoryAutoGearSeedContext) return;
  if (typeof collectProjectFormData !== 'function') return;
  var baseInfo = collectProjectFormData() || {};
  var projectDataClone;
  try {
    projectDataClone = JSON.parse(JSON.stringify(baseInfo));
  } catch (cloneError) {
    void cloneError;
    projectDataClone = _objectSpread({}, baseInfo);
  }
  var scenarioValues = requiredScenariosSelect ? Array.from(requiredScenariosSelect.options || []).map(function (opt) {
    return opt && typeof opt.value === 'string' ? opt.value : '';
  }).filter(function (value) {
    return value;
  }) : [];
  factoryAutoGearSeedContext = {
    projectFormData: projectDataClone,
    scenarioValues: scenarioValues,
    setupValues: captureSetupSelectValues()
  };
}
function buildAutoGearRulesFromBaseInfo(baseInfo, scenarioValues) {
  var rules = [];
  var canGenerateRules = typeof generateGearListHtml === 'function' && typeof parseGearTableForAutoRules === 'function';
  var scenarios = Array.isArray(scenarioValues) ? scenarioValues.filter(function (value) {
    return typeof value === 'string' && value;
  }) : [];
  var baselineMap = null;
  if (canGenerateRules) {
    var baselineHtml = generateGearListHtml(_objectSpread(_objectSpread({}, baseInfo), {}, {
      requiredScenarios: ''
    }));
    baselineMap = parseGearTableForAutoRules(baselineHtml);
    if (baselineMap && scenarios.length) {
      var scenarioDiffMap = new Map();
      scenarios.forEach(function (value) {
        var scenarioHtml = generateGearListHtml(_objectSpread(_objectSpread({}, baseInfo), {}, {
          requiredScenarios: value
        }));
        var scenarioMap = parseGearTableForAutoRules(scenarioHtml);
        if (!scenarioMap) return;
        var diff = diffGearTableMaps(baselineMap, scenarioMap);
        var add = cloneAutoGearItems(diff.add);
        var remove = cloneAutoGearItems(diff.remove);
        if (!add.length && !remove.length) return;
        scenarioDiffMap.set(value, {
          add: add,
          remove: remove
        });
        rules.push({
          id: generateAutoGearId('rule'),
          label: value,
          scenarios: [value],
          add: add,
          remove: remove
        });
      });
      var comboCandidates = [['Handheld', 'Easyrig'], ['Slider', 'Undersling mode']].filter(function (combo) {
        return combo.every(function (value) {
          return scenarios.includes(value);
        });
      });
      comboCandidates.forEach(function (combo) {
        var combinedLabel = combo.join(' + ');
        var scenarioHtml = generateGearListHtml(_objectSpread(_objectSpread({}, baseInfo), {}, {
          requiredScenarios: combo.join(', ')
        }));
        var scenarioMap = parseGearTableForAutoRules(scenarioHtml);
        if (!scenarioMap) return;
        var diff = diffGearTableMaps(baselineMap, scenarioMap);
        var adjusted = subtractScenarioContributions({
          add: cloneAutoGearItems(diff.add),
          remove: cloneAutoGearItems(diff.remove)
        }, combo, scenarioDiffMap);
        if (!adjusted.add.length && !adjusted.remove.length) return;
        rules.push({
          id: generateAutoGearId('rule'),
          label: combinedLabel,
          scenarios: combo.slice(),
          add: adjusted.add,
          remove: adjusted.remove
        });
      });
      var rainOverlapKeys = ['Extreme rain', 'Rain Machine'];
      var hasRainOverlap = rainOverlapKeys.every(function (key) {
        return scenarioDiffMap.has(key);
      });
      if (hasRainOverlap) {
        var overlapRemovals = [{
          name: 'Schulz Sprayoff Micro',
          quantity: 1
        }, {
          name: 'Fischer RS to D-Tap cable 0,5m',
          quantity: 2
        }, {
          name: 'Spare Disc (Schulz Sprayoff Micro)',
          quantity: 1
        }].map(function (entry) {
          return {
            id: generateAutoGearId('item'),
            name: entry.name,
            category: 'Matte box + filter',
            quantity: entry.quantity
          };
        });
        rules.push({
          id: generateAutoGearId('rule'),
          label: 'Extreme rain + Rain Machine overlap',
          scenarios: rainOverlapKeys.slice(),
          add: [],
          remove: overlapRemovals
        });
      }
    }
  }
  if (baselineMap) {
    buildCameraHandleAutoRules(baseInfo, baselineMap).forEach(function (rule) {
      return rules.push(rule);
    });
    buildViewfinderExtensionAutoRules(baseInfo, baselineMap).forEach(function (rule) {
      return rules.push(rule);
    });
    buildVideoDistributionAutoRules(baseInfo, baselineMap).forEach(function (rule) {
      return rules.push(rule);
    });
    var defaultVideoDistributionRules = buildDefaultVideoDistributionAutoGearRules(baseInfo);
    if (defaultVideoDistributionRules.length) {
      var existingSignatures = new Set(rules.map(autoGearRuleSignature).filter(function (signature) {
        return typeof signature === 'string' && signature;
      }));
      defaultVideoDistributionRules.forEach(function (rule) {
        var signature = autoGearRuleSignature(rule);
        if (!signature || existingSignatures.has(signature)) return;
        rules.push(rule);
        existingSignatures.add(signature);
      });
    }
  }
  var alwaysRule = buildAlwaysAutoGearRule();
  if (alwaysRule) {
    rules.push(alwaysRule);
  }
  buildDefaultMatteboxAutoGearRules().forEach(function (rule) {
    return rules.push(rule);
  });
  return rules;
}
function computeFactoryAutoGearRules() {
  captureAutoGearSeedContext();
  var context = factoryAutoGearSeedContext;
  if (!context) return null;
  var previousSelectValues = captureSetupSelectValues();
  var seededBeforeCompute = hasSeededAutoGearDefaults();
  var savedAutoGearRules = autoGearRules.slice();
  var savedBaseAutoGearRules = baseAutoGearRules.slice();
  var savedProjectScopedRules = projectScopedAutoGearRules ? projectScopedAutoGearRules.slice() : null;
  var savedBackupSignature = autoGearRulesLastBackupSignature;
  var savedPersistedSignature = autoGearRulesLastPersistedSignature;
  var savedDirtyFlag = autoGearRulesDirtySinceBackup;
  try {
    if (seededBeforeCompute) {
      clearAutoGearDefaultsSeeded();
    }
    assignAutoGearRules([]);
    baseAutoGearRules = [];
    projectScopedAutoGearRules = null;
    autoGearRulesLastBackupSignature = savedBackupSignature;
    autoGearRulesLastPersistedSignature = savedPersistedSignature;
    autoGearRulesDirtySinceBackup = savedDirtyFlag;
    applySetupSelectValues(context.setupValues);
    var baseInfoSource = context.projectFormData || {};
    var baseInfo;
    try {
      baseInfo = JSON.parse(JSON.stringify(baseInfoSource));
    } catch (cloneErr) {
      void cloneErr;
      baseInfo = _objectSpread({}, baseInfoSource);
    }
    var rules = buildAutoGearRulesFromBaseInfo(baseInfo, context.scenarioValues || []);
    if (rules.length) {
      setFactoryAutoGearRulesSnapshot(rules);
    }
    return rules;
  } finally {
    applySetupSelectValues(previousSelectValues);
    assignAutoGearRules(savedAutoGearRules);
    baseAutoGearRules = savedBaseAutoGearRules.slice();
    projectScopedAutoGearRules = savedProjectScopedRules ? savedProjectScopedRules.slice() : null;
    autoGearRulesLastBackupSignature = savedBackupSignature;
    autoGearRulesLastPersistedSignature = savedPersistedSignature;
    autoGearRulesDirtySinceBackup = savedDirtyFlag;
    if (seededBeforeCompute) {
      markAutoGearDefaultsSeeded();
    }
  }
}
function seedAutoGearRulesFromCurrentProject() {
  captureAutoGearSeedContext();
  var seededBefore = hasSeededAutoGearDefaults();
  if (autoGearRules.length) {
    var addedDefaults = ensureDefaultMatteboxAutoGearRules();
    if (addedDefaults && !seededBefore) {
      markAutoGearDefaultsSeeded();
      setFactoryAutoGearRulesSnapshot(getAutoGearRules());
    } else if (!factoryAutoGearRulesSnapshot) {
      setFactoryAutoGearRulesSnapshot(getAutoGearRules());
    }
    return;
  }
  if (seededBefore) {
    var _addedDefaults = ensureDefaultMatteboxAutoGearRules();
    if (_addedDefaults && !factoryAutoGearRulesSnapshot) {
      setFactoryAutoGearRulesSnapshot(getAutoGearRules());
    }
    return;
  }
  var baseInfo = factoryAutoGearSeedContext && factoryAutoGearSeedContext.projectFormData ? _objectSpread({}, factoryAutoGearSeedContext.projectFormData) : collectProjectFormData ? collectProjectFormData() : {};
  var scenarioValues = factoryAutoGearSeedContext && Array.isArray(factoryAutoGearSeedContext.scenarioValues) ? factoryAutoGearSeedContext.scenarioValues : requiredScenariosSelect ? Array.from(requiredScenariosSelect.options || []).map(function (opt) {
    return opt && opt.value;
  }).filter(Boolean) : [];
  var rules = buildAutoGearRulesFromBaseInfo(baseInfo, scenarioValues);
  if (!rules.length) {
    var _addedDefaults2 = ensureDefaultMatteboxAutoGearRules();
    if (_addedDefaults2) {
      markAutoGearDefaultsSeeded();
      setFactoryAutoGearRulesSnapshot(getAutoGearRules());
    }
    return;
  }
  setAutoGearRules(rules);
  markAutoGearDefaultsSeeded();
  setFactoryAutoGearRulesSnapshot(rules);
}
function resetAutoGearRulesToFactoryAdditions() {
  var _texts$en1;
  var langTexts = texts[currentLang] || texts.en || {};
  var confirmation = langTexts.autoGearResetFactoryConfirm || ((_texts$en1 = texts.en) === null || _texts$en1 === void 0 ? void 0 : _texts$en1.autoGearResetFactoryConfirm) || 'Replace your automatic gear rules with the default additions?';
  if (typeof confirm === 'function' && !confirm(confirmation)) {
    return;
  }
  var backupName = ensureAutoBackupBeforeDeletion('reset automatic gear rules');
  if (!backupName) {
    return;
  }
  try {
    var _texts$en10;
    var factoryRules = computeFactoryAutoGearRules();
    var appliedRules = [];
    if (Array.isArray(factoryRules) && factoryRules.length) {
      setAutoGearRules(factoryRules);
      markAutoGearDefaultsSeeded();
      appliedRules = getAutoGearRules();
      setFactoryAutoGearRulesSnapshot(appliedRules);
    } else {
      setAutoGearRules([]);
      clearAutoGearDefaultsSeeded();
      setFactoryAutoGearRulesSnapshot([]);
    }
    closeAutoGearEditor();
    var updatedRules = appliedRules.length ? appliedRules : getAutoGearRules();
    renderAutoGearRulesList();
    renderAutoGearDraftLists();
    updateAutoGearCatalogOptions();
    var messageKey = updatedRules.length ? 'autoGearResetFactoryDone' : 'autoGearResetFactoryEmpty';
    var fallback = updatedRules.length ? 'Automatic gear rules restored to factory additions.' : 'Factory additions unavailable. Automatic gear rules cleared.';
    var message = langTexts[messageKey] || ((_texts$en10 = texts.en) === null || _texts$en10 === void 0 ? void 0 : _texts$en10[messageKey]) || fallback;
    var type = updatedRules.length ? 'success' : 'warning';
    showNotification(type, message);
  } catch (error) {
    var _texts$en11;
    console.error('Failed to reset automatic gear rules to factory additions', error);
    var errorMsg = langTexts.autoGearResetFactoryError || ((_texts$en11 = texts.en) === null || _texts$en11 === void 0 ? void 0 : _texts$en11.autoGearResetFactoryError) || 'Reset failed. Please try again.';
    showNotification('error', errorMsg);
  }
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
    Object.entries(obj).forEach(function (_ref10) {
      var _ref11 = _slicedToArray(_ref10, 2),
        key = _ref11[0],
        value = _ref11[1];
      if (!value || _typeof(value) !== 'object' || Array.isArray(value)) return;
      addName(key);
      _visit(value);
    });
  };
  if (_typeof(devices) === 'object' && devices) {
    _visit(devices);
  }
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
    navigator.serviceWorker.register('service-worker.js');
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
  var menu = document.getElementById('sideMenu');
  var overlay = document.getElementById('menuOverlay');
  var toggle = document.getElementById('menuToggle');
  if (!menu || !overlay || !toggle) return;
  menu.classList.remove('open');
  menu.setAttribute('hidden', '');
  overlay.classList.add('hidden');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Menu');
}
function openSideMenu() {
  var menu = document.getElementById('sideMenu');
  var overlay = document.getElementById('menuOverlay');
  var toggle = document.getElementById('menuToggle');
  if (!menu || !overlay || !toggle) return;
  if (menu.classList.contains('open')) return;
  menu.classList.add('open');
  menu.removeAttribute('hidden');
  overlay.classList.remove('hidden');
  toggle.setAttribute('aria-expanded', 'true');
  toggle.setAttribute('aria-label', 'Close menu');
}
function setupSideMenu() {
  var toggle = document.getElementById('menuToggle');
  var menu = document.getElementById('sideMenu');
  var overlay = document.getElementById('menuOverlay');
  if (!toggle || !menu || !overlay) return;
  toggle.addEventListener('click', function () {
    if (menu.classList.contains('open')) {
      closeSideMenu();
    } else {
      openSideMenu();
    }
  });
  overlay.addEventListener('click', closeSideMenu);
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
function initializeLayoutControls() {
  setupSideMenu();
  setupResponsiveControls();
}
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  var runLayoutInitialization = function runLayoutInitialization() {
    initializeLayoutControls();
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runLayoutInitialization, {
      once: true
    });
  } else {
    runLayoutInitialization();
  }
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
      snapshot.projectInfo = JSON.parse(JSON.stringify(projectInfo));
    } catch (error) {
      console.warn('Failed to clone project info for auto backup import', error);
      snapshot.projectInfo = projectInfo;
    }
  }
  if (typeof gearList === 'string' && gearList.trim()) {
    snapshot.gearList = gearList;
  }
  if (Array.isArray(autoGearRules) && autoGearRules.length) {
    try {
      snapshot.autoGearRules = JSON.parse(JSON.stringify(autoGearRules));
    } catch (error) {
      console.warn('Failed to clone auto gear rules for auto backup import', error);
      snapshot.autoGearRules = autoGearRules.slice();
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
    return dialog.open;
  }
  return dialog.hasAttribute('open');
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
  var match = VIDEO_TYPE_PATTERNS.find(function (_ref12) {
    var needles = _ref12.needles;
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
      var _ref13 = vo || {},
        count = _ref13.count,
        rest = _objectWithoutProperties(_ref13, _excluded2);
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
      var _ref14 = fc || {},
        type = _ref14.type,
        rest = _objectWithoutProperties(_ref14, _excluded3);
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
      var _ref15 = vf || {},
        type = _ref15.type,
        rest = _objectWithoutProperties(_ref15, _excluded4);
      return _objectSpread(_objectSpread({}, rest), {}, {
        type: normalizeViewfinderType(type)
      });
    });
    cam.recordingMedia = ensureList(cam.recordingMedia, {
      type: '',
      notes: ''
    }).map(function (m) {
      var _ref16 = m || {},
        _ref16$type = _ref16.type,
        type = _ref16$type === void 0 ? '' : _ref16$type,
        _ref16$notes = _ref16.notes,
        notes = _ref16$notes === void 0 ? '' : _ref16$notes;
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
  window.defaultDevices = JSON.parse(JSON.stringify(devices));
  unifyDevices(window.defaultDevices);
}
var storedDevices = loadDeviceData();
if (storedDevices) {
  var merged = JSON.parse(JSON.stringify(window.defaultDevices));
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
  for (var _i4 = 0, _Object$entries3 = Object.entries(devices.batteries); _i4 < _Object$entries3.length; _i4++) {
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
function getSelectedPlate() {
  var camName = cameraSelect.value;
  var plates = getAvailableBatteryPlates(camName);
  if (!plates.length) return null;
  return batteryPlateSelect.value || (plates.includes('V-Mount') ? 'V-Mount' : plates[0]);
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
  var _iterator2 = _createForOfIteratorHelper(preferredMatchers),
    _step2;
  try {
    var _loop = function _loop() {
        var matcher = _step2.value;
        var match = connectors.find(function (fc) {
          return matcher.test(fc.type);
        });
        if (match) return {
          v: firstConnector(match.type)
        };
      },
      _ret;
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      _ret = _loop();
      if (_ret) return _ret.v;
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
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
  var _devices;
  var cam = (_devices = devices) === null || _devices === void 0 || (_devices = _devices.cameras) === null || _devices === void 0 ? void 0 : _devices[cameraSelect === null || cameraSelect === void 0 ? void 0 : cameraSelect.value];
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
  var _devices2;
  if (!monitoringConfigurationSelect) return;
  var cam = (_devices2 = devices) === null || _devices2 === void 0 || (_devices2 = _devices2.cameras) === null || _devices2 === void 0 ? void 0 : _devices2[cameraSelect === null || cameraSelect === void 0 ? void 0 : cameraSelect.value];
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
  var _devices3;
  var cam = (_devices3 = devices) === null || _devices3 === void 0 || (_devices3 = _devices3.cameras) === null || _devices3 === void 0 ? void 0 : _devices3[cameraSelect === null || cameraSelect === void 0 ? void 0 : cameraSelect.value];
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
  label.setAttribute('data-help', texts[currentLang].batterySelectHelp);
  if (getSelectedPlate() === 'B-Mount') {
    label.textContent = texts[currentLang].batteryBMountLabel || 'B-Mount Battery:';
  } else {
    label.textContent = texts[currentLang].batteryLabel;
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
      bats = Object.fromEntries(Object.entries(bats).filter(function (_ref17) {
        var _ref18 = _slicedToArray(_ref17, 2),
          b = _ref18[1];
        return b.mount_type !== 'B-Mount';
      }));
    }
    if (!supportsGold) {
      bats = Object.fromEntries(Object.entries(bats).filter(function (_ref19) {
        var _ref20 = _slicedToArray(_ref19, 2),
          b = _ref20[1];
        return b.mount_type !== 'Gold-Mount';
      }));
    }
    populateSelect(batterySelect, bats, true);
    swaps = devices.batteryHotswaps || {};
    if (!supportsB) {
      swaps = Object.fromEntries(Object.entries(swaps).filter(function (_ref21) {
        var _ref22 = _slicedToArray(_ref21, 2),
          b = _ref22[1];
        return b.mount_type !== 'B-Mount';
      }));
    }
    if (!supportsGold) {
      swaps = Object.fromEntries(Object.entries(swaps).filter(function (_ref23) {
        var _ref24 = _slicedToArray(_ref23, 2),
          b = _ref24[1];
        return b.mount_type !== 'Gold-Mount';
      }));
    }
  }
  if (!/FXLion Nano/i.test(current)) {
    swaps = Object.fromEntries(Object.entries(swaps).filter(function (_ref25) {
      var _ref26 = _slicedToArray(_ref25, 1),
        name = _ref26[0];
      return name !== 'FX-Lion NANO Dual V-Mount Hot-Swap Plate';
    }));
  }
  var totalCurrentLow = parseFloat(totalCurrent12Elem.textContent);
  if (isFinite(totalCurrentLow) && totalCurrentLow > 0) {
    swaps = Object.fromEntries(Object.entries(swaps).filter(function (_ref27) {
      var _ref28 = _slicedToArray(_ref27, 2),
        info = _ref28[1];
      return typeof info.pinA !== 'number' || info.pinA >= totalCurrentLow;
    }));
  }
  populateSelect(hotswapSelect, swaps, true);
  if (Array.from(batterySelect.options).some(function (o) {
    return o.value === current;
  })) {
    batterySelect.value = current;
  }
  updateFavoriteButton(batterySelect);
  if (Array.from(hotswapSelect.options).some(function (o) {
    return o.value === currentSwap;
  })) {
    hotswapSelect.value = currentSwap;
  }
  updateFavoriteButton(hotswapSelect);
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
    var _match2 = _slicedToArray(match, 4),
      label = _match2[1],
      colonPart = _match2[2],
      trailingSpace = _match2[3];
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
    setStatusMessage(compatElem, texts[currentLang].incompatibleFIZWarning);
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
    setStatusMessage(compatElem, texts[currentLang].amiraCforceRemoteWarning);
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
    setStatusMessage(compatElem, texts[currentLang].missingFIZControllerWarning);
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
    msg = texts[currentLang].arriCLMNoUMC4Warning;
  } else if (usesUMC4 && motors.some(function (m) {
    return !clmRegex.test(m);
  })) {
    msg = texts[currentLang].arriUMC4Warning;
  } else if ((usesRIA1 || usesRF) && motors.some(function (m) {
    return clmRegex.test(m);
  })) {
    msg = texts[currentLang].arriRIA1Warning;
  } else if (distance && distance !== 'None' && !(usesUMC4 || usesRIA1 || usesRF || builtInController)) {
    msg = texts[currentLang].distanceControllerWarning;
  } else if (onlyMasterGrip && !usesRF) {
    msg = texts[currentLang].masterGripWirelessWarning;
  }
  if (msg) {
    setStatusMessage(compatElem, msg);
    if (msg === texts[currentLang].arriUMC4Warning) {
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
var currentLang = "en";
var updateHelpQuickLinksForLanguage;
var updateHelpResultsSummaryText;
var lastRuntimeHours = null;
try {
  var savedLang = localStorage.getItem("language");
  var supported = ["en", "de", "es", "fr", "it"];
  if (savedLang && supported.includes(savedLang)) {
    currentLang = savedLang;
  } else if (typeof navigator !== "undefined") {
    var navLangs = Array.isArray(navigator.languages) ? navigator.languages : [navigator.language];
    var _iterator3 = _createForOfIteratorHelper(navLangs),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var lang = _step3.value;
        var short = String(lang).slice(0, 2).toLowerCase();
        if (supported.includes(short)) {
          currentLang = short;
          break;
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  }
} catch (e) {
  console.warn("Could not load language from localStorage", e);
}
function setLanguage(lang) {
  var _texts$en32, _texts$en33, _texts$en34, _texts$en35, _texts$en36, _texts$en37, _texts$en38, _texts$en39, _texts$en40, _texts$en41, _texts$en42, _texts$en43, _texts$en44, _texts$en45, _texts$en46, _texts$en47, _texts$en48, _texts$en49, _texts$en50, _texts$en51;
  currentLang = lang;
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
  batteryComparisonHeadingElem.textContent = texts[lang].batteryComparisonHeading;
  batteryComparisonHeadingElem.setAttribute("data-help", texts[lang].batteryComparisonHeadingHelp);
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
      link.textContent = label;
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
  shareSetupBtn.setAttribute("title", texts[lang].shareSetupBtn);
  shareSetupBtn.setAttribute("data-help", texts[lang].shareSetupHelp);
  if (shareDialogHeadingElem) {
    var _texts$en12;
    var heading = texts[lang].shareDialogTitle || ((_texts$en12 = texts.en) === null || _texts$en12 === void 0 ? void 0 : _texts$en12.shareDialogTitle) || shareDialogHeadingElem.textContent;
    shareDialogHeadingElem.textContent = heading;
  }
  if (shareFilenameLabelElem) {
    var _texts$en13;
    var filenameLabel = texts[lang].shareFilenameLabel || ((_texts$en13 = texts.en) === null || _texts$en13 === void 0 ? void 0 : _texts$en13.shareFilenameLabel) || shareFilenameLabelElem.textContent;
    shareFilenameLabelElem.textContent = filenameLabel;
  }
  if (shareConfirmBtn) {
    var _texts$en14;
    var confirmLabel = texts[lang].shareDialogConfirm || ((_texts$en14 = texts.en) === null || _texts$en14 === void 0 ? void 0 : _texts$en14.shareDialogConfirm) || shareConfirmBtn.textContent;
    setButtonLabelWithIcon(shareConfirmBtn, confirmLabel, ICON_GLYPHS.fileExport);
    shareConfirmBtn.setAttribute('title', confirmLabel);
    shareConfirmBtn.setAttribute('aria-label', confirmLabel);
    shareConfirmBtn.setAttribute('data-help', texts[lang].shareSetupHelp);
  }
  if (shareCancelBtn) {
    var _texts$en15;
    var cancelLabel = texts[lang].shareDialogCancel || ((_texts$en15 = texts.en) === null || _texts$en15 === void 0 ? void 0 : _texts$en15.shareDialogCancel) || shareCancelBtn.textContent;
    setButtonLabelWithIcon(shareCancelBtn, cancelLabel, ICON_GLYPHS.circleX);
    shareCancelBtn.setAttribute('title', cancelLabel);
    shareCancelBtn.setAttribute('aria-label', cancelLabel);
  }
  if (shareIncludeAutoGearText) {
    var _texts$en16, _texts$en17;
    var label = texts[lang].shareIncludeAutoGearLabel || ((_texts$en16 = texts.en) === null || _texts$en16 === void 0 ? void 0 : _texts$en16.shareIncludeAutoGearLabel) || shareIncludeAutoGearText.textContent;
    shareIncludeAutoGearText.textContent = label;
    var help = texts[lang].shareIncludeAutoGearHelp || ((_texts$en17 = texts.en) === null || _texts$en17 === void 0 ? void 0 : _texts$en17.shareIncludeAutoGearHelp) || label;
    if (shareIncludeAutoGearLabelElem) {
      shareIncludeAutoGearLabelElem.setAttribute('data-help', help);
    }
    if (shareIncludeAutoGearCheckbox) {
      shareIncludeAutoGearCheckbox.setAttribute('aria-label', label);
    }
  }
  var sharedImportLegendText = sharedImportLegend ? sharedImportLegend.textContent : '';
  if (sharedImportDialogHeading) {
    var _texts$en18;
    var title = texts[lang].sharedImportDialogTitle || ((_texts$en18 = texts.en) === null || _texts$en18 === void 0 ? void 0 : _texts$en18.sharedImportDialogTitle) || sharedImportDialogHeading.textContent;
    sharedImportDialogHeading.textContent = title;
  }
  if (sharedImportDialogMessage) {
    var _texts$en19;
    var message = texts[lang].sharedImportDialogMessage || ((_texts$en19 = texts.en) === null || _texts$en19 === void 0 ? void 0 : _texts$en19.sharedImportDialogMessage) || sharedImportDialogMessage.textContent;
    sharedImportDialogMessage.textContent = message;
    sharedImportDialogMessage.setAttribute('data-help', message);
  }
  if (sharedImportConfirmBtn) {
    var _texts$en20;
    var _label = texts[lang].sharedImportDialogConfirm || ((_texts$en20 = texts.en) === null || _texts$en20 === void 0 ? void 0 : _texts$en20.sharedImportDialogConfirm) || sharedImportConfirmBtn.textContent;
    setButtonLabelWithIcon(sharedImportConfirmBtn, _label, ICON_GLYPHS.check);
    sharedImportConfirmBtn.setAttribute('data-help', _label);
  }
  if (sharedImportCancelBtn) {
    var _texts$en21;
    var _label2 = texts[lang].sharedImportDialogCancel || ((_texts$en21 = texts.en) === null || _texts$en21 === void 0 ? void 0 : _texts$en21.sharedImportDialogCancel) || sharedImportCancelBtn.textContent;
    setButtonLabelWithIcon(sharedImportCancelBtn, _label2, ICON_GLYPHS.circleX);
    sharedImportCancelBtn.setAttribute('data-help', _label2);
  }
  if (sharedImportLegend) {
    var _texts$en22;
    var legend = texts[lang].sharedImportAutoGearLabel || ((_texts$en22 = texts.en) === null || _texts$en22 === void 0 ? void 0 : _texts$en22.sharedImportAutoGearLabel) || sharedImportLegend.textContent;
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
    var _texts$en23, _texts$en24;
    var _label3 = texts[lang].sharedImportAutoGearNone || ((_texts$en23 = texts.en) === null || _texts$en23 === void 0 ? void 0 : _texts$en23.sharedImportAutoGearNone) || sharedImportModeNoneOption.textContent;
    sharedImportModeNoneOption.textContent = _label3;
    var _help = texts[lang].sharedImportAutoGearNoneHelp || ((_texts$en24 = texts.en) === null || _texts$en24 === void 0 ? void 0 : _texts$en24.sharedImportAutoGearNoneHelp) || _label3;
    sharedImportModeNoneOption.setAttribute('data-help', _help);
    sharedImportModeNoneOption.setAttribute('title', _help);
    sharedImportModeNoneOption.setAttribute('aria-label', _label3);
  }
  if (sharedImportModeProjectOption) {
    var _texts$en25, _texts$en26;
    var _label4 = texts[lang].sharedImportAutoGearProject || ((_texts$en25 = texts.en) === null || _texts$en25 === void 0 ? void 0 : _texts$en25.sharedImportAutoGearProject) || sharedImportModeProjectOption.textContent;
    sharedImportModeProjectOption.textContent = _label4;
    var _help2 = texts[lang].sharedImportAutoGearProjectHelp || ((_texts$en26 = texts.en) === null || _texts$en26 === void 0 ? void 0 : _texts$en26.sharedImportAutoGearProjectHelp) || _label4;
    sharedImportModeProjectOption.setAttribute('data-help', _help2);
    sharedImportModeProjectOption.setAttribute('title', _help2);
    sharedImportModeProjectOption.setAttribute('aria-label', _label4);
  }
  if (sharedImportModeGlobalOption) {
    var _texts$en27, _texts$en28;
    var _label5 = texts[lang].sharedImportAutoGearGlobal || ((_texts$en27 = texts.en) === null || _texts$en27 === void 0 ? void 0 : _texts$en27.sharedImportAutoGearGlobal) || sharedImportModeGlobalOption.textContent;
    sharedImportModeGlobalOption.textContent = _label5;
    var _help3 = texts[lang].sharedImportAutoGearGlobalHelp || ((_texts$en28 = texts.en) === null || _texts$en28 === void 0 ? void 0 : _texts$en28.sharedImportAutoGearGlobalHelp) || _label5;
    sharedImportModeGlobalOption.setAttribute('data-help', _help3);
    sharedImportModeGlobalOption.setAttribute('title', _help3);
    sharedImportModeGlobalOption.setAttribute('aria-label', _label5);
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
  if (breakdownListElem) breakdownListElem.setAttribute("data-help", texts[lang].breakdownListHelp);
  var totalPowerLabelElem = document.getElementById("totalPowerLabel");
  totalPowerLabelElem.textContent = texts[lang].totalPowerLabel;
  totalPowerLabelElem.setAttribute("data-help", texts[lang].totalPowerHelp);
  var totalCurrent144LabelElem = document.getElementById("totalCurrent144Label");
  totalCurrent144LabelElem.textContent = texts[lang].totalCurrent144Label;
  totalCurrent144LabelElem.setAttribute("data-help", texts[lang].totalCurrent144Help);
  var totalCurrent12LabelElem = document.getElementById("totalCurrent12Label");
  totalCurrent12LabelElem.textContent = texts[lang].totalCurrent12Label;
  totalCurrent12LabelElem.setAttribute("data-help", texts[lang].totalCurrent12Help);
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
    var _label6 = texts[lang].batteryLifeLabel;
    if (fb) {
      var userNote = texts[lang].runtimeUserCountNote.replace('{count}', fb.count);
      var idx = _label6.indexOf(')');
      if (idx !== -1) {
        _label6 = "".concat(_label6.slice(0, idx), ", ").concat(userNote).concat(_label6.slice(idx));
      }
    }
    batteryLifeLabelElem.textContent = _label6;
    batteryLifeLabelElem.setAttribute("data-help", texts[lang].batteryLifeHelp);
  }
  if (runtimeAverageNoteElem) {
    runtimeAverageNoteElem.textContent = fb && fb.count > 4 ? texts[lang].runtimeAverageNote : '';
  }
  renderTemperatureNote(lastRuntimeHours);
  updateFeedbackTemperatureLabel(lang, temperatureUnit);
  updateFeedbackTemperatureOptions(lang, temperatureUnit);
  var tempNoteElem = document.getElementById("temperatureNote");
  if (tempNoteElem) tempNoteElem.setAttribute("data-help", texts[lang].temperatureNoteHelp);
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
    var _texts$en29;
    var sectionsLabel = texts[lang].settingsSectionsLabel || ((_texts$en29 = texts.en) === null || _texts$en29 === void 0 ? void 0 : _texts$en29.settingsSectionsLabel) || settingsTablist.getAttribute('aria-label') || texts[lang].settingsHeading || 'Settings sections';
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
    var _texts$en30, _texts$en31;
    var generalLabel = texts[lang].settingsTabGeneral || ((_texts$en30 = texts.en) === null || _texts$en30 === void 0 ? void 0 : _texts$en30.settingsTabGeneral) || getSettingsTabLabelText(settingsTabGeneral) || 'General';
    var generalHelp = texts[lang].settingsTabGeneralHelp || ((_texts$en31 = texts.en) === null || _texts$en31 === void 0 ? void 0 : _texts$en31.settingsTabGeneralHelp) || texts[lang].settingsHeadingHelp || generalLabel;
    applySettingsTabLabel(settingsTabGeneral, generalLabel, generalHelp);
    if (generalSettingsHeading) {
      generalSettingsHeading.textContent = generalLabel;
      generalSettingsHeading.setAttribute('data-help', generalHelp);
    }
  }
  applySettingsTabLabel(settingsTabAutoGear, texts[lang].settingsTabAutoGear || ((_texts$en32 = texts.en) === null || _texts$en32 === void 0 ? void 0 : _texts$en32.settingsTabAutoGear) || texts[lang].autoGearHeading || ((_texts$en33 = texts.en) === null || _texts$en33 === void 0 ? void 0 : _texts$en33.autoGearHeading), texts[lang].settingsTabAutoGearHelp || ((_texts$en34 = texts.en) === null || _texts$en34 === void 0 ? void 0 : _texts$en34.settingsTabAutoGearHelp) || texts[lang].autoGearHeadingHelp || ((_texts$en35 = texts.en) === null || _texts$en35 === void 0 ? void 0 : _texts$en35.autoGearHeadingHelp));
  applySettingsTabLabel(settingsTabAccessibility, texts[lang].settingsTabAccessibility || ((_texts$en36 = texts.en) === null || _texts$en36 === void 0 ? void 0 : _texts$en36.settingsTabAccessibility) || texts[lang].accessibilityHeading || ((_texts$en37 = texts.en) === null || _texts$en37 === void 0 ? void 0 : _texts$en37.accessibilityHeading), texts[lang].settingsTabAccessibilityHelp || ((_texts$en38 = texts.en) === null || _texts$en38 === void 0 ? void 0 : _texts$en38.settingsTabAccessibilityHelp) || texts[lang].accessibilityHeadingHelp || ((_texts$en39 = texts.en) === null || _texts$en39 === void 0 ? void 0 : _texts$en39.accessibilityHeadingHelp));
  applySettingsTabLabel(settingsTabBackup, texts[lang].settingsTabBackup || ((_texts$en40 = texts.en) === null || _texts$en40 === void 0 ? void 0 : _texts$en40.settingsTabBackup) || texts[lang].backupHeading || ((_texts$en41 = texts.en) === null || _texts$en41 === void 0 ? void 0 : _texts$en41.backupHeading), texts[lang].settingsTabBackupHelp || ((_texts$en42 = texts.en) === null || _texts$en42 === void 0 ? void 0 : _texts$en42.settingsTabBackupHelp) || texts[lang].backupHeadingHelp || ((_texts$en43 = texts.en) === null || _texts$en43 === void 0 ? void 0 : _texts$en43.backupHeadingHelp));
  applySettingsTabLabel(settingsTabData, texts[lang].settingsTabData || ((_texts$en44 = texts.en) === null || _texts$en44 === void 0 ? void 0 : _texts$en44.settingsTabData) || texts[lang].dataHeading || ((_texts$en45 = texts.en) === null || _texts$en45 === void 0 ? void 0 : _texts$en45.dataHeading), texts[lang].settingsTabDataHelp || ((_texts$en46 = texts.en) === null || _texts$en46 === void 0 ? void 0 : _texts$en46.settingsTabDataHelp) || texts[lang].dataHeadingHelp || ((_texts$en47 = texts.en) === null || _texts$en47 === void 0 ? void 0 : _texts$en47.dataHeadingHelp));
  applySettingsTabLabel(settingsTabAbout, texts[lang].settingsTabAbout || ((_texts$en48 = texts.en) === null || _texts$en48 === void 0 ? void 0 : _texts$en48.settingsTabAbout) || texts[lang].aboutHeading || ((_texts$en49 = texts.en) === null || _texts$en49 === void 0 ? void 0 : _texts$en49.aboutHeading), texts[lang].settingsTabAboutHelp || ((_texts$en50 = texts.en) === null || _texts$en50 === void 0 ? void 0 : _texts$en50.settingsTabAboutHelp) || texts[lang].aboutHeadingHelp || ((_texts$en51 = texts.en) === null || _texts$en51 === void 0 ? void 0 : _texts$en51.aboutHeadingHelp));
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
    var _texts$en52, _texts$en53;
    autoGearHeadingElem.textContent = texts[lang].autoGearHeading || ((_texts$en52 = texts.en) === null || _texts$en52 === void 0 ? void 0 : _texts$en52.autoGearHeading) || 'Automatic Gear Rules';
    var headingHelp = texts[lang].autoGearHeadingHelp || ((_texts$en53 = texts.en) === null || _texts$en53 === void 0 ? void 0 : _texts$en53.autoGearHeadingHelp);
    if (headingHelp) autoGearHeadingElem.setAttribute('data-help', headingHelp);
  }
  if (autoGearDescriptionElem) {
    var _texts$en54;
    autoGearDescriptionElem.textContent = texts[lang].autoGearDescription || ((_texts$en54 = texts.en) === null || _texts$en54 === void 0 ? void 0 : _texts$en54.autoGearDescription) || '';
  }
  if (autoGearMonitorDefaultsHeading) {
    var _texts$en55;
    var _heading = texts[lang].autoGearMonitorDefaultsHeading || ((_texts$en55 = texts.en) === null || _texts$en55 === void 0 ? void 0 : _texts$en55.autoGearMonitorDefaultsHeading) || autoGearMonitorDefaultsHeading.textContent;
    autoGearMonitorDefaultsHeading.textContent = _heading;
  }
  if (autoGearMonitorDefaultsDescription) {
    var _texts$en56;
    var description = texts[lang].autoGearMonitorDefaultsDescription || ((_texts$en56 = texts.en) === null || _texts$en56 === void 0 ? void 0 : _texts$en56.autoGearMonitorDefaultsDescription) || autoGearMonitorDefaultsDescription.textContent;
    autoGearMonitorDefaultsDescription.textContent = description;
  }
  autoGearMonitorDefaultControls.forEach(function (control) {
    var _texts$en57, _control$label, _control$label2;
    if (!control) return;
    var labelKey = AUTO_GEAR_MONITOR_DEFAULT_LABEL_KEYS[control.key];
    var labelText = labelKey ? texts[lang][labelKey] || ((_texts$en57 = texts.en) === null || _texts$en57 === void 0 ? void 0 : _texts$en57[labelKey]) || ((_control$label = control.label) === null || _control$label === void 0 ? void 0 : _control$label.textContent) : (_control$label2 = control.label) === null || _control$label2 === void 0 ? void 0 : _control$label2.textContent;
    if (control.label && labelText) {
      control.label.textContent = labelText;
      control.label.setAttribute('data-help', labelText);
    }
    if (control.select && labelText) {
      control.select.setAttribute('aria-label', labelText);
      control.select.setAttribute('data-help', labelText);
    }
  });
  updateAutoGearMonitorDefaultOptions();
  renderAutoGearMonitorDefaultsControls();
  if (autoGearPresetDescription) {
    var _texts$en58;
    autoGearPresetDescription.textContent = texts[lang].autoGearPresetDescription || ((_texts$en58 = texts.en) === null || _texts$en58 === void 0 ? void 0 : _texts$en58.autoGearPresetDescription) || '';
  }
  if (autoGearPresetLabel) {
    var _texts$en59, _texts$en60;
    var _label7 = texts[lang].autoGearPresetLabel || ((_texts$en59 = texts.en) === null || _texts$en59 === void 0 ? void 0 : _texts$en59.autoGearPresetLabel) || autoGearPresetLabel.textContent;
    var _help4 = texts[lang].autoGearPresetDescription || ((_texts$en60 = texts.en) === null || _texts$en60 === void 0 ? void 0 : _texts$en60.autoGearPresetDescription) || _label7;
    autoGearPresetLabel.textContent = _label7;
    autoGearPresetLabel.setAttribute('data-help', _help4);
    if (autoGearPresetSelect) {
      autoGearPresetSelect.setAttribute('aria-label', _label7);
      autoGearPresetSelect.setAttribute('data-help', _help4);
    }
  }
  if (autoGearSavePresetButton) {
    var _texts$en61;
    var _label8 = texts[lang].autoGearSavePresetButton || ((_texts$en61 = texts.en) === null || _texts$en61 === void 0 ? void 0 : _texts$en61.autoGearSavePresetButton) || autoGearSavePresetButton.textContent;
    setButtonLabelWithIcon(autoGearSavePresetButton, _label8, ICON_GLYPHS.save);
    autoGearSavePresetButton.setAttribute('data-help', _label8);
    autoGearSavePresetButton.setAttribute('aria-label', _label8);
  }
  if (autoGearDeletePresetButton) {
    var _texts$en62;
    var _label9 = texts[lang].autoGearDeletePresetButton || ((_texts$en62 = texts.en) === null || _texts$en62 === void 0 ? void 0 : _texts$en62.autoGearDeletePresetButton) || autoGearDeletePresetButton.textContent;
    setButtonLabelWithIcon(autoGearDeletePresetButton, _label9, ICON_GLYPHS.trash);
    autoGearDeletePresetButton.setAttribute('data-help', _label9);
    autoGearDeletePresetButton.setAttribute('aria-label', _label9);
  }
  if (autoGearAddRuleBtn) {
    var _texts$en63, _texts$en64;
    var _label0 = texts[lang].autoGearAddRule || ((_texts$en63 = texts.en) === null || _texts$en63 === void 0 ? void 0 : _texts$en63.autoGearAddRule) || autoGearAddRuleBtn.textContent;
    setButtonLabelWithIcon(autoGearAddRuleBtn, _label0, ICON_GLYPHS.add);
    var _help5 = texts[lang].autoGearHeadingHelp || ((_texts$en64 = texts.en) === null || _texts$en64 === void 0 ? void 0 : _texts$en64.autoGearHeadingHelp) || _label0;
    autoGearAddRuleBtn.setAttribute('data-help', _help5);
  }
  if (autoGearResetFactoryButton) {
    var _texts$en65, _texts$en66;
    var _label1 = texts[lang].autoGearResetFactoryButton || ((_texts$en65 = texts.en) === null || _texts$en65 === void 0 ? void 0 : _texts$en65.autoGearResetFactoryButton) || autoGearResetFactoryButton.textContent;
    var _help6 = texts[lang].autoGearResetFactoryHelp || ((_texts$en66 = texts.en) === null || _texts$en66 === void 0 ? void 0 : _texts$en66.autoGearResetFactoryHelp) || _label1;
    setButtonLabelWithIcon(autoGearResetFactoryButton, _label1, ICON_GLYPHS.reload);
    autoGearResetFactoryButton.setAttribute('data-help', _help6);
    autoGearResetFactoryButton.setAttribute('title', _help6);
    autoGearResetFactoryButton.setAttribute('aria-label', _label1);
  }
  if (autoGearExportButton) {
    var _texts$en67, _texts$en68;
    var _label10 = texts[lang].autoGearExportButton || ((_texts$en67 = texts.en) === null || _texts$en67 === void 0 ? void 0 : _texts$en67.autoGearExportButton) || autoGearExportButton.textContent;
    var _help7 = texts[lang].autoGearExportHelp || ((_texts$en68 = texts.en) === null || _texts$en68 === void 0 ? void 0 : _texts$en68.autoGearExportHelp) || _label10;
    setButtonLabelWithIcon(autoGearExportButton, _label10, ICON_GLYPHS.fileExport);
    autoGearExportButton.setAttribute('data-help', _help7);
    autoGearExportButton.setAttribute('title', _help7);
    autoGearExportButton.setAttribute('aria-label', _label10);
  }
  if (autoGearImportButton) {
    var _texts$en69, _texts$en70;
    var _label11 = texts[lang].autoGearImportButton || ((_texts$en69 = texts.en) === null || _texts$en69 === void 0 ? void 0 : _texts$en69.autoGearImportButton) || autoGearImportButton.textContent;
    var _help8 = texts[lang].autoGearImportHelp || ((_texts$en70 = texts.en) === null || _texts$en70 === void 0 ? void 0 : _texts$en70.autoGearImportHelp) || _label11;
    setButtonLabelWithIcon(autoGearImportButton, _label11, ICON_GLYPHS.fileImport);
    autoGearImportButton.setAttribute('data-help', _help8);
    autoGearImportButton.setAttribute('title', _help8);
    autoGearImportButton.setAttribute('aria-label', _label11);
  }
  if (autoGearSearchLabel) {
    var _texts$en71, _texts$en72;
    var _label12 = texts[lang].autoGearSearchLabel || ((_texts$en71 = texts.en) === null || _texts$en71 === void 0 ? void 0 : _texts$en71.autoGearSearchLabel) || autoGearSearchLabel.textContent;
    var _help9 = texts[lang].autoGearSearchHelp || ((_texts$en72 = texts.en) === null || _texts$en72 === void 0 ? void 0 : _texts$en72.autoGearSearchHelp) || _label12;
    autoGearSearchLabel.textContent = _label12;
    autoGearSearchLabel.setAttribute('data-help', _help9);
    if (autoGearSearchInput) {
      var _texts$en73;
      var placeholder = texts[lang].autoGearSearchPlaceholder || ((_texts$en73 = texts.en) === null || _texts$en73 === void 0 ? void 0 : _texts$en73.autoGearSearchPlaceholder) || autoGearSearchInput.getAttribute('placeholder') || '';
      autoGearSearchInput.setAttribute('placeholder', placeholder);
      autoGearSearchInput.setAttribute('aria-label', _label12);
      autoGearSearchInput.setAttribute('data-help', _help9);
    }
  }
  if (autoGearFilterScenarioLabel) {
    var _texts$en74, _texts$en75;
    var _label13 = texts[lang].autoGearFilterScenarioLabel || ((_texts$en74 = texts.en) === null || _texts$en74 === void 0 ? void 0 : _texts$en74.autoGearFilterScenarioLabel) || autoGearFilterScenarioLabel.textContent;
    var _help0 = texts[lang].autoGearFilterScenarioHelp || ((_texts$en75 = texts.en) === null || _texts$en75 === void 0 ? void 0 : _texts$en75.autoGearFilterScenarioHelp) || _label13;
    autoGearFilterScenarioLabel.textContent = _label13;
    autoGearFilterScenarioLabel.setAttribute('data-help', _help0);
    if (autoGearFilterScenarioSelect) {
      autoGearFilterScenarioSelect.setAttribute('aria-label', _label13);
      autoGearFilterScenarioSelect.setAttribute('data-help', _help0);
    }
  }
  if (autoGearFilterClearButton) {
    var _texts$en76;
    var _label14 = texts[lang].autoGearFilterClear || ((_texts$en76 = texts.en) === null || _texts$en76 === void 0 ? void 0 : _texts$en76.autoGearFilterClear) || autoGearFilterClearButton.textContent;
    setButtonLabelWithIcon(autoGearFilterClearButton, _label14, ICON_GLYPHS.circleX);
    autoGearFilterClearButton.setAttribute('data-help', _label14);
    autoGearFilterClearButton.setAttribute('aria-label', _label14);
  }
  refreshAutoGearScenarioFilterOptions(getAutoGearRules());
  if (autoGearBackupsHeading) {
    var _texts$en77;
    autoGearBackupsHeading.textContent = texts[lang].autoGearBackupsHeading || ((_texts$en77 = texts.en) === null || _texts$en77 === void 0 ? void 0 : _texts$en77.autoGearBackupsHeading) || autoGearBackupsHeading.textContent;
  }
  if (autoGearBackupsDescription) {
    var _texts$en78;
    var _description = texts[lang].autoGearBackupsDescription || ((_texts$en78 = texts.en) === null || _texts$en78 === void 0 ? void 0 : _texts$en78.autoGearBackupsDescription) || '';
    autoGearBackupsDescription.textContent = _description;
    if (_description) {
      autoGearBackupsDescription.setAttribute('data-help', _description);
    }
  }
  if (autoGearShowBackupsLabel) {
    var _texts$en79, _texts$en80;
    var _label15 = texts[lang].autoGearShowBackupsLabel || ((_texts$en79 = texts.en) === null || _texts$en79 === void 0 ? void 0 : _texts$en79.autoGearShowBackupsLabel) || autoGearShowBackupsLabel.textContent;
    var _help1 = texts[lang].autoGearShowBackupsHelp || ((_texts$en80 = texts.en) === null || _texts$en80 === void 0 ? void 0 : _texts$en80.autoGearShowBackupsHelp) || _label15;
    autoGearShowBackupsLabel.textContent = _label15;
    autoGearShowBackupsLabel.setAttribute('data-help', _help1);
    if (autoGearShowBackupsCheckbox) {
      autoGearShowBackupsCheckbox.setAttribute('aria-label', _label15);
      autoGearShowBackupsCheckbox.setAttribute('data-help', _help1);
    }
  }
  if (autoGearBackupsHiddenNotice) {
    var _texts$en81;
    var hiddenText = texts[lang].autoGearBackupsHidden || ((_texts$en81 = texts.en) === null || _texts$en81 === void 0 ? void 0 : _texts$en81.autoGearBackupsHidden) || autoGearBackupsHiddenNotice.textContent;
    autoGearBackupsHiddenNotice.textContent = hiddenText;
  }
  if (autoGearBackupSelectLabel) {
    var _texts$en82;
    var _label16 = texts[lang].autoGearBackupSelectLabel || ((_texts$en82 = texts.en) === null || _texts$en82 === void 0 ? void 0 : _texts$en82.autoGearBackupSelectLabel) || autoGearBackupSelectLabel.textContent;
    autoGearBackupSelectLabel.textContent = _label16;
    if (autoGearBackupSelect) {
      autoGearBackupSelect.setAttribute('aria-label', _label16);
      autoGearBackupSelect.setAttribute('title', _label16);
    }
  }
  if (autoGearBackupRestoreButton) {
    var _texts$en83;
    var _label17 = texts[lang].autoGearBackupRestore || ((_texts$en83 = texts.en) === null || _texts$en83 === void 0 ? void 0 : _texts$en83.autoGearBackupRestore) || autoGearBackupRestoreButton.textContent;
    setButtonLabelWithIcon(autoGearBackupRestoreButton, _label17, ICON_GLYPHS.fileImport);
    autoGearBackupRestoreButton.setAttribute('aria-label', _label17);
    autoGearBackupRestoreButton.setAttribute('title', _label17);
  }
  if (autoGearBackupEmptyMessage) {
    var _texts$en84;
    var emptyText = texts[lang].autoGearBackupEmpty || ((_texts$en84 = texts.en) === null || _texts$en84 === void 0 ? void 0 : _texts$en84.autoGearBackupEmpty) || autoGearBackupEmptyMessage.textContent;
    autoGearBackupEmptyMessage.textContent = emptyText;
  }
  if (autoGearBackupSelect) {
    renderAutoGearBackupControls();
  }
  if (autoGearRuleNameLabel) {
    var _texts$en85, _texts$en86;
    var _label18 = texts[lang].autoGearRuleNameLabel || ((_texts$en85 = texts.en) === null || _texts$en85 === void 0 ? void 0 : _texts$en85.autoGearRuleNameLabel) || autoGearRuleNameLabel.textContent;
    autoGearRuleNameLabel.textContent = _label18;
    var _help10 = texts[lang].autoGearRuleNameHelp || ((_texts$en86 = texts.en) === null || _texts$en86 === void 0 ? void 0 : _texts$en86.autoGearRuleNameHelp) || _label18;
    autoGearRuleNameLabel.setAttribute('data-help', _help10);
    if (autoGearRuleNameInput) {
      autoGearRuleNameInput.setAttribute('data-help', _help10);
      autoGearRuleNameInput.setAttribute('aria-label', _label18);
    }
  }
  if (autoGearConditionSelectLabel) {
    var _texts$en87, _texts$en88;
    var _label19 = texts[lang].autoGearConditionSelectLabel || ((_texts$en87 = texts.en) === null || _texts$en87 === void 0 ? void 0 : _texts$en87.autoGearConditionSelectLabel) || autoGearConditionSelectLabel.textContent || 'Add a condition';
    var _help11 = texts[lang].autoGearConditionSelectHelp || ((_texts$en88 = texts.en) === null || _texts$en88 === void 0 ? void 0 : _texts$en88.autoGearConditionSelectHelp) || _label19;
    autoGearConditionSelectLabel.textContent = _label19;
    autoGearConditionSelectLabel.setAttribute('data-help', _help11);
    if (autoGearConditionSelect) {
      autoGearConditionSelect.setAttribute('aria-label', _label19);
      autoGearConditionSelect.setAttribute('data-help', _help11);
    }
  }
  if (autoGearConditionAddButton) {
    var _texts$en89;
    var _label20 = texts[lang].autoGearAddCondition || ((_texts$en89 = texts.en) === null || _texts$en89 === void 0 ? void 0 : _texts$en89.autoGearAddCondition) || autoGearConditionAddButton.textContent || 'Add condition';
    setButtonLabelWithIcon(autoGearConditionAddButton, _label20, ICON_GLYPHS.add);
    autoGearConditionAddButton.setAttribute('aria-label', _label20);
    autoGearConditionAddButton.setAttribute('data-help', _label20);
  }
  if (autoGearAlwaysLabel) {
    var _texts$en90, _texts$en91;
    var _label21 = texts[lang].autoGearAlwaysLabel || ((_texts$en90 = texts.en) === null || _texts$en90 === void 0 ? void 0 : _texts$en90.autoGearAlwaysLabel) || autoGearAlwaysLabel.textContent || 'Always include';
    var _help12 = texts[lang].autoGearAlwaysHelp || ((_texts$en91 = texts.en) === null || _texts$en91 === void 0 ? void 0 : _texts$en91.autoGearAlwaysHelp) || _label21;
    autoGearAlwaysLabel.textContent = _label21;
    autoGearAlwaysLabel.setAttribute('data-help', _help12);
    if (autoGearAlwaysHelp) {
      autoGearAlwaysHelp.textContent = _help12;
      autoGearAlwaysHelp.setAttribute('data-help', _help12);
    }
  }
  configureAutoGearConditionButtons();
  refreshAutoGearConditionPicker();
  updateAutoGearConditionAddButtonState();
  if (autoGearScenariosLabel) {
    var _texts$en92, _texts$en93;
    var _label22 = texts[lang].autoGearScenariosLabel || ((_texts$en92 = texts.en) === null || _texts$en92 === void 0 ? void 0 : _texts$en92.autoGearScenariosLabel) || autoGearScenariosLabel.textContent;
    autoGearScenariosLabel.textContent = _label22;
    var _help13 = texts[lang].autoGearScenariosHelp || ((_texts$en93 = texts.en) === null || _texts$en93 === void 0 ? void 0 : _texts$en93.autoGearScenariosHelp) || _label22;
    autoGearScenariosLabel.setAttribute('data-help', _help13);
    if (autoGearScenariosSelect) {
      autoGearScenariosSelect.setAttribute('data-help', _help13);
      autoGearScenariosSelect.setAttribute('aria-label', _label22);
    }
    if (autoGearScenarioModeLabel) {
      var _texts$en94, _texts$en95;
      var modeLabel = texts[lang].autoGearScenarioModeLabel || ((_texts$en94 = texts.en) === null || _texts$en94 === void 0 ? void 0 : _texts$en94.autoGearScenarioModeLabel) || autoGearScenarioModeLabel.textContent || 'Scenario matching';
      var modeHelp = texts[lang].autoGearScenarioModeHelp || ((_texts$en95 = texts.en) === null || _texts$en95 === void 0 ? void 0 : _texts$en95.autoGearScenarioModeHelp) || modeLabel;
      autoGearScenarioModeLabel.textContent = modeLabel;
      autoGearScenarioModeLabel.setAttribute('data-help', modeHelp);
      if (autoGearScenarioModeSelect) {
        autoGearScenarioModeSelect.setAttribute('data-help', modeHelp);
        autoGearScenarioModeSelect.setAttribute('aria-label', modeLabel);
      }
    }
    if (autoGearScenarioBaseLabel) {
      var _texts$en96, _texts$en97;
      var baseLabel = texts[lang].autoGearScenarioBaseLabel || ((_texts$en96 = texts.en) === null || _texts$en96 === void 0 ? void 0 : _texts$en96.autoGearScenarioBaseLabel) || autoGearScenarioBaseLabel.textContent || 'Base scenario';
      var baseHelp = texts[lang].autoGearScenarioBaseHelp || ((_texts$en97 = texts.en) === null || _texts$en97 === void 0 ? void 0 : _texts$en97.autoGearScenarioBaseHelp) || baseLabel;
      autoGearScenarioBaseLabel.textContent = baseLabel;
      autoGearScenarioBaseLabel.setAttribute('data-help', baseHelp);
      if (autoGearScenarioBaseSelect) {
        autoGearScenarioBaseSelect.setAttribute('data-help', baseHelp);
        autoGearScenarioBaseSelect.setAttribute('aria-label', baseLabel);
      }
    }
    if (autoGearScenarioFactorLabel) {
      var _texts$en98, _texts$en99;
      var factorLabel = texts[lang].autoGearScenarioFactorLabel || ((_texts$en98 = texts.en) === null || _texts$en98 === void 0 ? void 0 : _texts$en98.autoGearScenarioFactorLabel) || autoGearScenarioFactorLabel.textContent || 'Multiplier factor';
      var factorHelp = texts[lang].autoGearScenarioFactorHelp || ((_texts$en99 = texts.en) === null || _texts$en99 === void 0 ? void 0 : _texts$en99.autoGearScenarioFactorHelp) || factorLabel;
      autoGearScenarioFactorLabel.textContent = factorLabel;
      autoGearScenarioFactorLabel.setAttribute('data-help', factorHelp);
      if (autoGearScenarioFactorInput) {
        autoGearScenarioFactorInput.setAttribute('data-help', factorHelp);
        autoGearScenarioFactorInput.setAttribute('aria-label', factorLabel);
      }
    }
  }
  if (autoGearShootingDaysLabel) {
    var _texts$en100, _texts$en101, _texts$en102, _texts$en103, _texts$en104, _texts$en105;
    var _label23 = texts[lang].autoGearShootingDaysLabel || ((_texts$en100 = texts.en) === null || _texts$en100 === void 0 ? void 0 : _texts$en100.autoGearShootingDaysLabel) || autoGearShootingDaysLabel.textContent || 'Shooting days condition';
    var _help14 = texts[lang].autoGearShootingDaysHelp || ((_texts$en101 = texts.en) === null || _texts$en101 === void 0 ? void 0 : _texts$en101.autoGearShootingDaysHelp) || _label23;
    var minimumLabel = texts[lang].autoGearShootingDaysModeMinimum || ((_texts$en102 = texts.en) === null || _texts$en102 === void 0 ? void 0 : _texts$en102.autoGearShootingDaysModeMinimum) || 'Minimum';
    var maximumLabel = texts[lang].autoGearShootingDaysModeMaximum || ((_texts$en103 = texts.en) === null || _texts$en103 === void 0 ? void 0 : _texts$en103.autoGearShootingDaysModeMaximum) || 'Maximum';
    var everyLabel = texts[lang].autoGearShootingDaysModeEvery || ((_texts$en104 = texts.en) === null || _texts$en104 === void 0 ? void 0 : _texts$en104.autoGearShootingDaysModeEvery) || 'Every';
    var valueLabel = texts[lang].autoGearShootingDaysValueLabel || ((_texts$en105 = texts.en) === null || _texts$en105 === void 0 ? void 0 : _texts$en105.autoGearShootingDaysValueLabel) || 'Shooting days value';
    autoGearShootingDaysLabel.textContent = _label23;
    autoGearShootingDaysLabel.setAttribute('data-help', _help14);
    if (autoGearShootingDaysMode) {
      autoGearShootingDaysMode.setAttribute('data-help', _help14);
      autoGearShootingDaysMode.setAttribute('aria-label', _label23);
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
      autoGearShootingDaysValueLabel.setAttribute('data-help', _help14);
    }
    if (autoGearShootingDaysInput) {
      autoGearShootingDaysInput.setAttribute('data-help', _help14);
      autoGearShootingDaysInput.setAttribute('aria-label', valueLabel || _label23);
    }
    if (autoGearShootingDaysHelp) {
      autoGearShootingDaysHelp.textContent = _help14;
      autoGearShootingDaysHelp.setAttribute('data-help', _help14);
    }
  }
  if (autoGearMatteboxLabel) {
    var _texts$en106, _texts$en107;
    var _label24 = texts[lang].autoGearMatteboxLabel || ((_texts$en106 = texts.en) === null || _texts$en106 === void 0 ? void 0 : _texts$en106.autoGearMatteboxLabel) || autoGearMatteboxLabel.textContent;
    autoGearMatteboxLabel.textContent = _label24;
    var _help15 = texts[lang].autoGearMatteboxHelp || ((_texts$en107 = texts.en) === null || _texts$en107 === void 0 ? void 0 : _texts$en107.autoGearMatteboxHelp) || _label24;
    autoGearMatteboxLabel.setAttribute('data-help', _help15);
    if (autoGearMatteboxSelect) {
      autoGearMatteboxSelect.setAttribute('data-help', _help15);
      autoGearMatteboxSelect.setAttribute('aria-label', _label24);
    }
  }
  if (autoGearCameraHandleLabel) {
    var _texts$en108, _texts$en109;
    var _label25 = texts[lang].autoGearCameraHandleLabel || ((_texts$en108 = texts.en) === null || _texts$en108 === void 0 ? void 0 : _texts$en108.autoGearCameraHandleLabel) || autoGearCameraHandleLabel.textContent;
    autoGearCameraHandleLabel.textContent = _label25;
    var _help16 = texts[lang].autoGearCameraHandleHelp || ((_texts$en109 = texts.en) === null || _texts$en109 === void 0 ? void 0 : _texts$en109.autoGearCameraHandleHelp) || _label25;
    autoGearCameraHandleLabel.setAttribute('data-help', _help16);
    if (autoGearCameraHandleSelect) {
      autoGearCameraHandleSelect.setAttribute('data-help', _help16);
      autoGearCameraHandleSelect.setAttribute('aria-label', _label25);
    }
  }
  if (autoGearViewfinderExtensionLabel) {
    var _texts$en110, _texts$en111;
    var _label26 = texts[lang].autoGearViewfinderExtensionLabel || ((_texts$en110 = texts.en) === null || _texts$en110 === void 0 ? void 0 : _texts$en110.autoGearViewfinderExtensionLabel) || autoGearViewfinderExtensionLabel.textContent;
    autoGearViewfinderExtensionLabel.textContent = _label26;
    var _help17 = texts[lang].autoGearViewfinderExtensionHelp || ((_texts$en111 = texts.en) === null || _texts$en111 === void 0 ? void 0 : _texts$en111.autoGearViewfinderExtensionHelp) || _label26;
    autoGearViewfinderExtensionLabel.setAttribute('data-help', _help17);
    if (autoGearViewfinderExtensionSelect) {
      autoGearViewfinderExtensionSelect.setAttribute('data-help', _help17);
      autoGearViewfinderExtensionSelect.setAttribute('aria-label', _label26);
    }
  }
  if (autoGearDeliveryResolutionLabel) {
    var _texts$en112, _texts$en113;
    var _label27 = texts[lang].autoGearDeliveryResolutionLabel || ((_texts$en112 = texts.en) === null || _texts$en112 === void 0 ? void 0 : _texts$en112.autoGearDeliveryResolutionLabel) || autoGearDeliveryResolutionLabel.textContent;
    autoGearDeliveryResolutionLabel.textContent = _label27;
    var _help18 = texts[lang].autoGearDeliveryResolutionHelp || ((_texts$en113 = texts.en) === null || _texts$en113 === void 0 ? void 0 : _texts$en113.autoGearDeliveryResolutionHelp) || _label27;
    autoGearDeliveryResolutionLabel.setAttribute('data-help', _help18);
    if (autoGearDeliveryResolutionSelect) {
      autoGearDeliveryResolutionSelect.setAttribute('data-help', _help18);
      autoGearDeliveryResolutionSelect.setAttribute('aria-label', _label27);
    }
  }
  if (autoGearVideoDistributionLabel) {
    var _texts$en114, _texts$en115;
    var _label28 = texts[lang].autoGearVideoDistributionLabel || ((_texts$en114 = texts.en) === null || _texts$en114 === void 0 ? void 0 : _texts$en114.autoGearVideoDistributionLabel) || autoGearVideoDistributionLabel.textContent;
    autoGearVideoDistributionLabel.textContent = _label28;
    var _help19 = texts[lang].autoGearVideoDistributionHelp || ((_texts$en115 = texts.en) === null || _texts$en115 === void 0 ? void 0 : _texts$en115.autoGearVideoDistributionHelp) || _label28;
    autoGearVideoDistributionLabel.setAttribute('data-help', _help19);
    if (autoGearVideoDistributionSelect) {
      autoGearVideoDistributionSelect.setAttribute('data-help', _help19);
      autoGearVideoDistributionSelect.setAttribute('aria-label', _label28);
    }
  }
  if (autoGearCameraLabel) {
    var _texts$en116, _texts$en117;
    var _label29 = texts[lang].autoGearCameraLabel || ((_texts$en116 = texts.en) === null || _texts$en116 === void 0 ? void 0 : _texts$en116.autoGearCameraLabel) || autoGearCameraLabel.textContent;
    autoGearCameraLabel.textContent = _label29;
    var _help20 = texts[lang].autoGearCameraHelp || ((_texts$en117 = texts.en) === null || _texts$en117 === void 0 ? void 0 : _texts$en117.autoGearCameraHelp) || _label29;
    autoGearCameraLabel.setAttribute('data-help', _help20);
    if (autoGearCameraSelect) {
      autoGearCameraSelect.setAttribute('data-help', _help20);
      autoGearCameraSelect.setAttribute('aria-label', _label29);
    }
  }
  if (autoGearCameraWeightLabel) {
    var _texts$en118, _texts$en119;
    var cameraWeightLabel = texts[lang].autoGearCameraWeightLabel || ((_texts$en118 = texts.en) === null || _texts$en118 === void 0 ? void 0 : _texts$en118.autoGearCameraWeightLabel) || autoGearCameraWeightLabel.textContent || 'Camera weight';
    var cameraWeightHelp = texts[lang].autoGearCameraWeightHelp || ((_texts$en119 = texts.en) === null || _texts$en119 === void 0 ? void 0 : _texts$en119.autoGearCameraWeightHelp) || cameraWeightLabel;
    autoGearCameraWeightLabel.textContent = cameraWeightLabel;
    autoGearCameraWeightLabel.setAttribute('data-help', cameraWeightHelp);
  }
  if (autoGearCameraWeightOperatorLabel) {
    var _texts$en120, _texts$en121, _texts$en122, _texts$en123;
    var cameraWeightOperatorLabel = texts[lang].autoGearCameraWeightOperatorLabel || ((_texts$en120 = texts.en) === null || _texts$en120 === void 0 ? void 0 : _texts$en120.autoGearCameraWeightOperatorLabel) || autoGearCameraWeightOperatorLabel.textContent || 'Weight comparison';
    autoGearCameraWeightOperatorLabel.textContent = cameraWeightOperatorLabel;
    autoGearCameraWeightOperatorLabel.setAttribute('data-help', cameraWeightOperatorLabel);
    if (autoGearCameraWeightOperator) {
      autoGearCameraWeightOperator.setAttribute('data-help', cameraWeightOperatorLabel);
      autoGearCameraWeightOperator.setAttribute('aria-label', cameraWeightOperatorLabel);
      var cameraWeightGreater = texts[lang].autoGearCameraWeightOperatorGreater || ((_texts$en121 = texts.en) === null || _texts$en121 === void 0 ? void 0 : _texts$en121.autoGearCameraWeightOperatorGreater) || 'Heavier than';
      var cameraWeightLess = texts[lang].autoGearCameraWeightOperatorLess || ((_texts$en122 = texts.en) === null || _texts$en122 === void 0 ? void 0 : _texts$en122.autoGearCameraWeightOperatorLess) || 'Lighter than';
      var cameraWeightEqual = texts[lang].autoGearCameraWeightOperatorEqual || ((_texts$en123 = texts.en) === null || _texts$en123 === void 0 ? void 0 : _texts$en123.autoGearCameraWeightOperatorEqual) || 'Exactly';
      Array.from(autoGearCameraWeightOperator.options || []).forEach(function (option) {
        if (!option) return;
        if (option.value === 'greater') {
          option.textContent = cameraWeightGreater;
        } else if (option.value === 'less') {
          option.textContent = cameraWeightLess;
        } else if (option.value === 'equal') {
          option.textContent = cameraWeightEqual;
        }
      });
    }
  }
  if (autoGearCameraWeightValueLabel) {
    var _texts$en124, _texts$en125;
    var cameraWeightValueLabel = texts[lang].autoGearCameraWeightValueLabel || ((_texts$en124 = texts.en) === null || _texts$en124 === void 0 ? void 0 : _texts$en124.autoGearCameraWeightValueLabel) || autoGearCameraWeightValueLabel.textContent || 'Weight threshold (grams)';
    var cameraWeightValueHelp = texts[lang].autoGearCameraWeightHelp || ((_texts$en125 = texts.en) === null || _texts$en125 === void 0 ? void 0 : _texts$en125.autoGearCameraWeightHelp) || cameraWeightValueLabel;
    autoGearCameraWeightValueLabel.textContent = cameraWeightValueLabel;
    autoGearCameraWeightValueLabel.setAttribute('data-help', cameraWeightValueHelp);
    if (autoGearCameraWeightValueInput) {
      autoGearCameraWeightValueInput.setAttribute('data-help', cameraWeightValueHelp);
      autoGearCameraWeightValueInput.setAttribute('aria-label', cameraWeightValueLabel);
    }
  }
  if (autoGearCameraWeightHelp) {
    var _texts$en126;
    var cameraWeightHelpText = texts[lang].autoGearCameraWeightHelp || ((_texts$en126 = texts.en) === null || _texts$en126 === void 0 ? void 0 : _texts$en126.autoGearCameraWeightHelp) || autoGearCameraWeightHelp.textContent || '';
    autoGearCameraWeightHelp.textContent = cameraWeightHelpText;
    if (cameraWeightHelpText) {
      autoGearCameraWeightHelp.setAttribute('data-help', cameraWeightHelpText);
    }
  }
  if (autoGearMonitorLabel) {
    var _texts$en118, _texts$en119;
    var _label30 = texts[lang].autoGearMonitorLabel || ((_texts$en118 = texts.en) === null || _texts$en118 === void 0 ? void 0 : _texts$en118.autoGearMonitorLabel) || autoGearMonitorLabel.textContent;
    autoGearMonitorLabel.textContent = _label30;
    var _help21 = texts[lang].autoGearMonitorHelp || ((_texts$en119 = texts.en) === null || _texts$en119 === void 0 ? void 0 : _texts$en119.autoGearMonitorHelp) || _label30;
    autoGearMonitorLabel.setAttribute('data-help', _help21);
    if (autoGearMonitorSelect) {
      autoGearMonitorSelect.setAttribute('data-help', _help21);
      autoGearMonitorSelect.setAttribute('aria-label', _label30);
    }
  }
  if (autoGearCrewPresentLabel) {
    var _texts$en120, _texts$en121;
    var _label31 = texts[lang].autoGearCrewPresentLabel || ((_texts$en120 = texts.en) === null || _texts$en120 === void 0 ? void 0 : _texts$en120.autoGearCrewPresentLabel) || autoGearCrewPresentLabel.textContent;
    autoGearCrewPresentLabel.textContent = _label31;
    var _help22 = texts[lang].autoGearCrewPresentHelp || ((_texts$en121 = texts.en) === null || _texts$en121 === void 0 ? void 0 : _texts$en121.autoGearCrewPresentHelp) || _label31;
    autoGearCrewPresentLabel.setAttribute('data-help', _help22);
    if (autoGearCrewPresentSelect) {
      autoGearCrewPresentSelect.setAttribute('data-help', _help22);
      autoGearCrewPresentSelect.setAttribute('aria-label', _label31);
    }
  }
  if (autoGearCrewAbsentLabel) {
    var _texts$en122, _texts$en123;
    var _label32 = texts[lang].autoGearCrewAbsentLabel || ((_texts$en122 = texts.en) === null || _texts$en122 === void 0 ? void 0 : _texts$en122.autoGearCrewAbsentLabel) || autoGearCrewAbsentLabel.textContent;
    autoGearCrewAbsentLabel.textContent = _label32;
    var _help23 = texts[lang].autoGearCrewAbsentHelp || ((_texts$en123 = texts.en) === null || _texts$en123 === void 0 ? void 0 : _texts$en123.autoGearCrewAbsentHelp) || _label32;
    autoGearCrewAbsentLabel.setAttribute('data-help', _help23);
    if (autoGearCrewAbsentSelect) {
      autoGearCrewAbsentSelect.setAttribute('data-help', _help23);
      autoGearCrewAbsentSelect.setAttribute('aria-label', _label32);
    }
  }
  if (autoGearWirelessLabel) {
    var _texts$en124, _texts$en125;
    var _label33 = texts[lang].autoGearWirelessLabel || ((_texts$en124 = texts.en) === null || _texts$en124 === void 0 ? void 0 : _texts$en124.autoGearWirelessLabel) || autoGearWirelessLabel.textContent;
    autoGearWirelessLabel.textContent = _label33;
    var _help24 = texts[lang].autoGearWirelessHelp || ((_texts$en125 = texts.en) === null || _texts$en125 === void 0 ? void 0 : _texts$en125.autoGearWirelessHelp) || _label33;
    autoGearWirelessLabel.setAttribute('data-help', _help24);
    if (autoGearWirelessSelect) {
      autoGearWirelessSelect.setAttribute('data-help', _help24);
      autoGearWirelessSelect.setAttribute('aria-label', _label33);
    }
  }
  if (autoGearMotorsLabel) {
    var _texts$en126, _texts$en127;
    var _label34 = texts[lang].autoGearMotorsLabel || ((_texts$en126 = texts.en) === null || _texts$en126 === void 0 ? void 0 : _texts$en126.autoGearMotorsLabel) || autoGearMotorsLabel.textContent;
    autoGearMotorsLabel.textContent = _label34;
    var _help25 = texts[lang].autoGearMotorsHelp || ((_texts$en127 = texts.en) === null || _texts$en127 === void 0 ? void 0 : _texts$en127.autoGearMotorsHelp) || _label34;
    autoGearMotorsLabel.setAttribute('data-help', _help25);
    if (autoGearMotorsSelect) {
      autoGearMotorsSelect.setAttribute('data-help', _help25);
      autoGearMotorsSelect.setAttribute('aria-label', _label34);
    }
  }
  if (autoGearControllersLabel) {
    var _texts$en128, _texts$en129;
    var _label35 = texts[lang].autoGearControllersLabel || ((_texts$en128 = texts.en) === null || _texts$en128 === void 0 ? void 0 : _texts$en128.autoGearControllersLabel) || autoGearControllersLabel.textContent;
    autoGearControllersLabel.textContent = _label35;
    var _help26 = texts[lang].autoGearControllersHelp || ((_texts$en129 = texts.en) === null || _texts$en129 === void 0 ? void 0 : _texts$en129.autoGearControllersHelp) || _label35;
    autoGearControllersLabel.setAttribute('data-help', _help26);
    if (autoGearControllersSelect) {
      autoGearControllersSelect.setAttribute('data-help', _help26);
      autoGearControllersSelect.setAttribute('aria-label', _label35);
    }
  }
  if (autoGearDistanceLabel) {
    var _texts$en130, _texts$en131;
    var _label36 = texts[lang].autoGearDistanceLabel || ((_texts$en130 = texts.en) === null || _texts$en130 === void 0 ? void 0 : _texts$en130.autoGearDistanceLabel) || autoGearDistanceLabel.textContent;
    autoGearDistanceLabel.textContent = _label36;
    var _help27 = texts[lang].autoGearDistanceHelp || ((_texts$en131 = texts.en) === null || _texts$en131 === void 0 ? void 0 : _texts$en131.autoGearDistanceHelp) || _label36;
    autoGearDistanceLabel.setAttribute('data-help', _help27);
    if (autoGearDistanceSelect) {
      autoGearDistanceSelect.setAttribute('data-help', _help27);
      autoGearDistanceSelect.setAttribute('aria-label', _label36);
    }
  }
  if (autoGearAddItemsHeading) {
    var _texts$en132;
    autoGearAddItemsHeading.textContent = texts[lang].autoGearAddItemsHeading || ((_texts$en132 = texts.en) === null || _texts$en132 === void 0 ? void 0 : _texts$en132.autoGearAddItemsHeading) || autoGearAddItemsHeading.textContent;
  }
  if (autoGearAddItemLabel) {
    var _texts$en133, _texts$en134;
    var _label37 = texts[lang].autoGearAddItemLabel || ((_texts$en133 = texts.en) === null || _texts$en133 === void 0 ? void 0 : _texts$en133.autoGearAddItemLabel) || autoGearAddItemLabel.textContent;
    var hint = texts[lang].autoGearAddMultipleHint || ((_texts$en134 = texts.en) === null || _texts$en134 === void 0 ? void 0 : _texts$en134.autoGearAddMultipleHint) || '';
    var helpText = hint ? "".concat(_label37, " \u2013 ").concat(hint) : _label37;
    autoGearAddItemLabel.textContent = _label37;
    autoGearAddItemLabel.setAttribute('data-help', helpText);
    if (autoGearAddNameInput) {
      autoGearAddNameInput.setAttribute('aria-label', _label37);
      autoGearAddNameInput.setAttribute('data-help', helpText);
      if (hint) {
        autoGearAddNameInput.setAttribute('placeholder', hint);
      } else {
        autoGearAddNameInput.removeAttribute('placeholder');
      }
    }
  }
  if (autoGearAddCategoryLabel) {
    var _texts$en135;
    var _label38 = texts[lang].autoGearAddCategoryLabel || ((_texts$en135 = texts.en) === null || _texts$en135 === void 0 ? void 0 : _texts$en135.autoGearAddCategoryLabel) || autoGearAddCategoryLabel.textContent;
    autoGearAddCategoryLabel.textContent = _label38;
    if (autoGearAddCategorySelect) {
      autoGearAddCategorySelect.setAttribute('aria-label', _label38);
    }
  }
  if (autoGearAddQuantityLabel) {
    var _texts$en136;
    var _label39 = texts[lang].autoGearAddQuantityLabel || ((_texts$en136 = texts.en) === null || _texts$en136 === void 0 ? void 0 : _texts$en136.autoGearAddQuantityLabel) || autoGearAddQuantityLabel.textContent;
    autoGearAddQuantityLabel.textContent = _label39;
    if (autoGearAddQuantityInput) {
      autoGearAddQuantityInput.setAttribute('aria-label', _label39);
    }
  }
  if (autoGearAddScreenSizeLabel) {
    var _texts$en137;
    var _label40 = texts[lang].autoGearAddScreenSizeLabel || ((_texts$en137 = texts.en) === null || _texts$en137 === void 0 ? void 0 : _texts$en137.autoGearAddScreenSizeLabel) || autoGearAddScreenSizeLabel.textContent;
    autoGearAddScreenSizeLabel.textContent = _label40;
    if (autoGearAddScreenSizeInput) {
      autoGearAddScreenSizeInput.setAttribute('aria-label', _label40);
    }
  }
  if (autoGearAddSelectorTypeLabel) {
    var _texts$en138;
    var _label41 = texts[lang].autoGearAddSelectorTypeLabel || ((_texts$en138 = texts.en) === null || _texts$en138 === void 0 ? void 0 : _texts$en138.autoGearAddSelectorTypeLabel) || autoGearAddSelectorTypeLabel.textContent;
    autoGearAddSelectorTypeLabel.textContent = _label41;
    if (autoGearAddSelectorTypeSelect) {
      var _texts$en139, _texts$en140, _texts$en141, _texts$en142, _texts$en143, _texts$en144, _texts$en145;
      autoGearAddSelectorTypeSelect.setAttribute('aria-label', _label41);
      var noneLabel = texts[lang].autoGearSelectorNoneOption || ((_texts$en139 = texts.en) === null || _texts$en139 === void 0 ? void 0 : _texts$en139.autoGearSelectorNoneOption) || 'No selector';
      var monitorLabel = texts[lang].autoGearSelectorMonitorOption || ((_texts$en140 = texts.en) === null || _texts$en140 === void 0 ? void 0 : _texts$en140.autoGearSelectorMonitorOption) || 'Monitor selector';
      var directorLabel = texts[lang].autoGearSelectorDirectorOption || ((_texts$en141 = texts.en) === null || _texts$en141 === void 0 ? void 0 : _texts$en141.autoGearSelectorDirectorOption) || 'Director monitor selector';
      var tripodHeadLabel = texts[lang].autoGearSelectorTripodHeadOption || ((_texts$en142 = texts.en) === null || _texts$en142 === void 0 ? void 0 : _texts$en142.autoGearSelectorTripodHeadOption) || 'Tripod head selector';
      var _tripodBowlLabel = texts[lang].autoGearSelectorTripodBowlOption || ((_texts$en143 = texts.en) === null || _texts$en143 === void 0 ? void 0 : _texts$en143.autoGearSelectorTripodBowlOption) || 'Tripod bowl selector';
      var _tripodTypesLabel = texts[lang].autoGearSelectorTripodTypesOption || ((_texts$en144 = texts.en) === null || _texts$en144 === void 0 ? void 0 : _texts$en144.autoGearSelectorTripodTypesOption) || 'Tripod type selector';
      var _tripodSpreaderLabel = texts[lang].autoGearSelectorTripodSpreaderOption || ((_texts$en145 = texts.en) === null || _texts$en145 === void 0 ? void 0 : _texts$en145.autoGearSelectorTripodSpreaderOption) || 'Tripod spreader selector';
      var selectorLabels = new Map([['none', noneLabel], ['monitor', monitorLabel], ['directorMonitor', directorLabel], ['tripodHeadBrand', tripodHeadLabel], ['tripodBowl', _tripodBowlLabel], ['tripodTypes', _tripodTypesLabel], ['tripodSpreader', _tripodSpreaderLabel]]);
      Array.from(autoGearAddSelectorTypeSelect.options || []).forEach(function (opt) {
        var text = selectorLabels.get(opt.value);
        if (text) opt.textContent = text;
      });
    }
  }
  if (autoGearAddSelectorDefaultLabel) {
    var _texts$en146;
    var _label42 = texts[lang].autoGearAddSelectorDefaultLabel || ((_texts$en146 = texts.en) === null || _texts$en146 === void 0 ? void 0 : _texts$en146.autoGearAddSelectorDefaultLabel) || autoGearAddSelectorDefaultLabel.textContent;
    autoGearAddSelectorDefaultLabel.textContent = _label42;
    if (autoGearAddSelectorDefaultInput) {
      autoGearAddSelectorDefaultInput.setAttribute('aria-label', _label42);
    }
  }
  if (autoGearAddNotesLabel) {
    var _texts$en147;
    var _label43 = texts[lang].autoGearAddNotesLabel || ((_texts$en147 = texts.en) === null || _texts$en147 === void 0 ? void 0 : _texts$en147.autoGearAddNotesLabel) || autoGearAddNotesLabel.textContent;
    autoGearAddNotesLabel.textContent = _label43;
    if (autoGearAddNotesInput) {
      autoGearAddNotesInput.setAttribute('aria-label', _label43);
    }
  }
  if (autoGearAddItemButton) {
    updateAutoGearItemButtonState('add');
  }
  if (autoGearRemoveItemsHeading) {
    var _texts$en148;
    autoGearRemoveItemsHeading.textContent = texts[lang].autoGearRemoveItemsHeading || ((_texts$en148 = texts.en) === null || _texts$en148 === void 0 ? void 0 : _texts$en148.autoGearRemoveItemsHeading) || autoGearRemoveItemsHeading.textContent;
  }
  if (autoGearRemoveItemLabel) {
    var _texts$en149, _texts$en150;
    var _label44 = texts[lang].autoGearRemoveItemLabel || ((_texts$en149 = texts.en) === null || _texts$en149 === void 0 ? void 0 : _texts$en149.autoGearRemoveItemLabel) || autoGearRemoveItemLabel.textContent;
    var _hint = texts[lang].autoGearRemoveMultipleHint || ((_texts$en150 = texts.en) === null || _texts$en150 === void 0 ? void 0 : _texts$en150.autoGearRemoveMultipleHint) || '';
    var _helpText = _hint ? "".concat(_label44, " \u2013 ").concat(_hint) : _label44;
    autoGearRemoveItemLabel.textContent = _label44;
    autoGearRemoveItemLabel.setAttribute('data-help', _helpText);
    if (autoGearRemoveNameInput) {
      autoGearRemoveNameInput.setAttribute('aria-label', _label44);
      autoGearRemoveNameInput.setAttribute('data-help', _helpText);
      if (_hint) {
        autoGearRemoveNameInput.setAttribute('placeholder', _hint);
      } else {
        autoGearRemoveNameInput.removeAttribute('placeholder');
      }
    }
  }
  if (autoGearRemoveCategoryLabel) {
    var _texts$en151;
    var _label45 = texts[lang].autoGearRemoveCategoryLabel || ((_texts$en151 = texts.en) === null || _texts$en151 === void 0 ? void 0 : _texts$en151.autoGearRemoveCategoryLabel) || autoGearRemoveCategoryLabel.textContent;
    autoGearRemoveCategoryLabel.textContent = _label45;
    if (autoGearRemoveCategorySelect) {
      autoGearRemoveCategorySelect.setAttribute('aria-label', _label45);
    }
  }
  if (autoGearRemoveQuantityLabel) {
    var _texts$en152;
    var _label46 = texts[lang].autoGearRemoveQuantityLabel || ((_texts$en152 = texts.en) === null || _texts$en152 === void 0 ? void 0 : _texts$en152.autoGearRemoveQuantityLabel) || autoGearRemoveQuantityLabel.textContent;
    autoGearRemoveQuantityLabel.textContent = _label46;
    if (autoGearRemoveQuantityInput) {
      autoGearRemoveQuantityInput.setAttribute('aria-label', _label46);
    }
  }
  if (autoGearRemoveScreenSizeLabel) {
    var _texts$en153;
    var _label47 = texts[lang].autoGearRemoveScreenSizeLabel || ((_texts$en153 = texts.en) === null || _texts$en153 === void 0 ? void 0 : _texts$en153.autoGearRemoveScreenSizeLabel) || autoGearRemoveScreenSizeLabel.textContent;
    autoGearRemoveScreenSizeLabel.textContent = _label47;
    if (autoGearRemoveScreenSizeInput) {
      autoGearRemoveScreenSizeInput.setAttribute('aria-label', _label47);
    }
  }
  if (autoGearRemoveSelectorTypeLabel) {
    var _texts$en154;
    var _label48 = texts[lang].autoGearRemoveSelectorTypeLabel || ((_texts$en154 = texts.en) === null || _texts$en154 === void 0 ? void 0 : _texts$en154.autoGearRemoveSelectorTypeLabel) || autoGearRemoveSelectorTypeLabel.textContent;
    autoGearRemoveSelectorTypeLabel.textContent = _label48;
    if (autoGearRemoveSelectorTypeSelect) {
      var _texts$en155, _texts$en156, _texts$en157, _texts$en158, _texts$en159, _texts$en160, _texts$en161;
      autoGearRemoveSelectorTypeSelect.setAttribute('aria-label', _label48);
      var _noneLabel = texts[lang].autoGearSelectorNoneOption || ((_texts$en155 = texts.en) === null || _texts$en155 === void 0 ? void 0 : _texts$en155.autoGearSelectorNoneOption) || 'No selector';
      var _monitorLabel = texts[lang].autoGearSelectorMonitorOption || ((_texts$en156 = texts.en) === null || _texts$en156 === void 0 ? void 0 : _texts$en156.autoGearSelectorMonitorOption) || 'Monitor selector';
      var _directorLabel = texts[lang].autoGearSelectorDirectorOption || ((_texts$en157 = texts.en) === null || _texts$en157 === void 0 ? void 0 : _texts$en157.autoGearSelectorDirectorOption) || 'Director monitor selector';
      var _tripodHeadLabel = texts[lang].autoGearSelectorTripodHeadOption || ((_texts$en158 = texts.en) === null || _texts$en158 === void 0 ? void 0 : _texts$en158.autoGearSelectorTripodHeadOption) || 'Tripod head selector';
      var _tripodBowlLabel2 = texts[lang].autoGearSelectorTripodBowlOption || ((_texts$en159 = texts.en) === null || _texts$en159 === void 0 ? void 0 : _texts$en159.autoGearSelectorTripodBowlOption) || 'Tripod bowl selector';
      var _tripodTypesLabel2 = texts[lang].autoGearSelectorTripodTypesOption || ((_texts$en160 = texts.en) === null || _texts$en160 === void 0 ? void 0 : _texts$en160.autoGearSelectorTripodTypesOption) || 'Tripod type selector';
      var _tripodSpreaderLabel2 = texts[lang].autoGearSelectorTripodSpreaderOption || ((_texts$en161 = texts.en) === null || _texts$en161 === void 0 ? void 0 : _texts$en161.autoGearSelectorTripodSpreaderOption) || 'Tripod spreader selector';
      var _selectorLabels = new Map([['none', _noneLabel], ['monitor', _monitorLabel], ['directorMonitor', _directorLabel], ['tripodHeadBrand', _tripodHeadLabel], ['tripodBowl', _tripodBowlLabel2], ['tripodTypes', _tripodTypesLabel2], ['tripodSpreader', _tripodSpreaderLabel2]]);
      Array.from(autoGearRemoveSelectorTypeSelect.options || []).forEach(function (opt) {
        var text = _selectorLabels.get(opt.value);
        if (text) opt.textContent = text;
      });
    }
  }
  if (autoGearRemoveSelectorDefaultLabel) {
    var _texts$en162;
    var _label49 = texts[lang].autoGearRemoveSelectorDefaultLabel || ((_texts$en162 = texts.en) === null || _texts$en162 === void 0 ? void 0 : _texts$en162.autoGearRemoveSelectorDefaultLabel) || autoGearRemoveSelectorDefaultLabel.textContent;
    autoGearRemoveSelectorDefaultLabel.textContent = _label49;
    if (autoGearRemoveSelectorDefaultInput) {
      autoGearRemoveSelectorDefaultInput.setAttribute('aria-label', _label49);
    }
  }
  if (autoGearRemoveNotesLabel) {
    var _texts$en163;
    var _label50 = texts[lang].autoGearRemoveNotesLabel || ((_texts$en163 = texts.en) === null || _texts$en163 === void 0 ? void 0 : _texts$en163.autoGearRemoveNotesLabel) || autoGearRemoveNotesLabel.textContent;
    autoGearRemoveNotesLabel.textContent = _label50;
    if (autoGearRemoveNotesInput) {
      autoGearRemoveNotesInput.setAttribute('aria-label', _label50);
    }
  }
  if (autoGearRemoveItemButton) {
    updateAutoGearItemButtonState('remove');
  }
  if (autoGearSaveRuleButton) {
    var _texts$en164;
    var _label51 = texts[lang].autoGearSaveRule || ((_texts$en164 = texts.en) === null || _texts$en164 === void 0 ? void 0 : _texts$en164.autoGearSaveRule) || autoGearSaveRuleButton.textContent;
    setButtonLabelWithIcon(autoGearSaveRuleButton, _label51);
    autoGearSaveRuleButton.setAttribute('data-help', _label51);
  }
  if (autoGearCancelEditButton) {
    var _texts$en165;
    var _label52 = texts[lang].autoGearCancelEdit || ((_texts$en165 = texts.en) === null || _texts$en165 === void 0 ? void 0 : _texts$en165.autoGearCancelEdit) || autoGearCancelEditButton.textContent;
    setButtonLabelWithIcon(autoGearCancelEditButton, _label52, ICON_GLYPHS.circleX);
    autoGearCancelEditButton.setAttribute('data-help', _label52);
  }
  if (autoGearAddCategorySelect) {
    populateAutoGearCategorySelect(autoGearAddCategorySelect, autoGearAddCategorySelect.value);
  }
  if (autoGearRemoveCategorySelect) {
    populateAutoGearCategorySelect(autoGearRemoveCategorySelect, autoGearRemoveCategorySelect.value);
  }
  syncAutoGearMonitorFieldVisibility();
  if (autoGearScenariosSelect) {
    var _autoGearEditorDraft;
    refreshAutoGearScenarioOptions((_autoGearEditorDraft = autoGearEditorDraft) === null || _autoGearEditorDraft === void 0 ? void 0 : _autoGearEditorDraft.scenarios);
  }
  if (autoGearMatteboxSelect) {
    var _autoGearEditorDraft2;
    refreshAutoGearMatteboxOptions((_autoGearEditorDraft2 = autoGearEditorDraft) === null || _autoGearEditorDraft2 === void 0 ? void 0 : _autoGearEditorDraft2.mattebox);
  }
  if (autoGearCameraHandleSelect) {
    var _autoGearEditorDraft3;
    refreshAutoGearCameraHandleOptions((_autoGearEditorDraft3 = autoGearEditorDraft) === null || _autoGearEditorDraft3 === void 0 ? void 0 : _autoGearEditorDraft3.cameraHandle);
  }
  if (autoGearViewfinderExtensionSelect) {
    var _autoGearEditorDraft4;
    refreshAutoGearViewfinderExtensionOptions((_autoGearEditorDraft4 = autoGearEditorDraft) === null || _autoGearEditorDraft4 === void 0 ? void 0 : _autoGearEditorDraft4.viewfinderExtension);
  }
  if (autoGearDeliveryResolutionSelect) {
    var _autoGearEditorDraft5;
    refreshAutoGearDeliveryResolutionOptions((_autoGearEditorDraft5 = autoGearEditorDraft) === null || _autoGearEditorDraft5 === void 0 ? void 0 : _autoGearEditorDraft5.deliveryResolution);
  }
  if (autoGearVideoDistributionSelect) {
    var _autoGearEditorDraft6;
    refreshAutoGearVideoDistributionOptions((_autoGearEditorDraft6 = autoGearEditorDraft) === null || _autoGearEditorDraft6 === void 0 ? void 0 : _autoGearEditorDraft6.videoDistribution);
  }
  seedAutoGearRulesFromCurrentProject();
  renderAutoGearRulesList();
  renderAutoGearDraftLists();
  updateAutoGearCatalogOptions();
  renderAutoGearPresetsControls();
  applyAutoGearBackupVisibility();
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
  var showAutoBackupsLabel = document.getElementById("settingsShowAutoBackupsLabel");
  if (showAutoBackupsLabel) {
    showAutoBackupsLabel.textContent = texts[lang].showAutoBackupsSetting;
    var autoBackupsHelp = texts[lang].showAutoBackupsHelp || texts[lang].showAutoBackupsSetting;
    showAutoBackupsLabel.setAttribute("data-help", autoBackupsHelp);
    if (settingsShowAutoBackups) {
      settingsShowAutoBackups.setAttribute("data-help", autoBackupsHelp);
      settingsShowAutoBackups.setAttribute("aria-label", texts[lang].showAutoBackupsSetting);
    }
  }
  if (backupDiffToggleButton) {
    var compareLabel = texts[lang].versionCompareButton || 'Compare versions';
    setButtonLabelWithIcon(backupDiffToggleButton, compareLabel, ICON_GLYPHS.note);
    var compareHelp = texts[lang].versionCompareButtonHelp || compareLabel;
    backupDiffToggleButton.setAttribute('data-help', compareHelp);
    backupDiffToggleButton.setAttribute('title', compareHelp);
  }
  if (backupDiffHeading) {
    backupDiffHeading.textContent = texts[lang].versionCompareHeading || 'Version comparison';
  }
  if (backupDiffIntro) {
    backupDiffIntro.textContent = texts[lang].versionCompareIntro || '';
  }
  if (backupDiffPrimaryLabel) {
    var primaryLabel = texts[lang].versionComparePrimaryLabel || 'Baseline version';
    backupDiffPrimaryLabel.textContent = primaryLabel;
    if (backupDiffPrimarySelect) {
      backupDiffPrimarySelect.setAttribute('aria-label', primaryLabel);
    }
  }
  if (backupDiffSecondaryLabel) {
    var compareLabelText = texts[lang].versionCompareSecondaryLabel || 'Comparison version';
    backupDiffSecondaryLabel.textContent = compareLabelText;
    if (backupDiffSecondarySelect) {
      backupDiffSecondarySelect.setAttribute('aria-label', compareLabelText);
    }
  }
  if (backupDiffEmptyState) {
    backupDiffEmptyState.textContent = texts[lang].versionCompareEmpty || 'Save a project or wait for auto-backups to start comparing versions.';
  }
  if (backupDiffNotesLabel) {
    backupDiffNotesLabel.textContent = texts[lang].versionCompareNotesLabel || 'Incident notes';
  }
  if (backupDiffNotes) {
    var _placeholder = texts[lang].versionCompareNotesPlaceholder || 'Record context, on-set observations, or required follow-up.';
    backupDiffNotes.placeholder = _placeholder;
  }
  if (backupDiffExportButton) {
    var exportLabel = texts[lang].versionCompareExport || 'Export log';
    setButtonLabelWithIcon(backupDiffExportButton, exportLabel, ICON_GLYPHS.fileExport);
    var exportHelp = texts[lang].versionCompareExportHelp || exportLabel;
    backupDiffExportButton.setAttribute('data-help', exportHelp);
    backupDiffExportButton.setAttribute('title', exportHelp);
  }
  if (backupDiffCloseButton) {
    var closeLabel = texts[lang].versionCompareClose || texts[lang].cancelSettings || 'Close';
    setButtonLabelWithIcon(backupDiffCloseButton, closeLabel, ICON_GLYPHS.circleX);
  }
  if (backupSettings) {
    var backupLabel = texts[lang].backupSettings;
    setButtonLabelWithIcon(backupSettings, backupLabel, ICON_GLYPHS.fileExport);
    var backupHelp = texts[lang].backupSettingsHelp || backupLabel;
    backupSettings.setAttribute("data-help", backupHelp);
    backupSettings.setAttribute("title", backupHelp);
    backupSettings.setAttribute("aria-label", backupHelp);
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
  if (restoreRehearsalCloseButton) {
    var _closeLabel = texts[lang].restoreRehearsalClose || texts[lang].cancelSettings || 'Close';
    setButtonLabelWithIcon(restoreRehearsalCloseButton, _closeLabel, ICON_GLYPHS.circleX);
    restoreRehearsalCloseButton.setAttribute('title', _closeLabel);
    restoreRehearsalCloseButton.setAttribute('aria-label', _closeLabel);
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
  if (aboutVersionElem) aboutVersionElem.textContent = "".concat(texts[lang].versionLabel, " ").concat(APP_VERSION);
  if (supportLink) {
    supportLink.textContent = texts[lang].supportLink;
    var supportHelp = texts[lang].supportLinkHelp || texts[lang].supportLink;
    supportLink.setAttribute("data-help", supportHelp);
    supportLink.setAttribute("title", supportHelp);
  }
  if (settingsSave) {
    var _texts$en166;
    var _label53 = texts[lang].saveSettings || ((_texts$en166 = texts.en) === null || _texts$en166 === void 0 ? void 0 : _texts$en166.saveSettings) || settingsSave.textContent;
    setButtonLabelWithIcon(settingsSave, _label53);
    var saveHelp = texts[lang].saveSettingsHelp || texts[lang].saveSettings || _label53;
    settingsSave.setAttribute("data-help", saveHelp);
    settingsSave.setAttribute("title", saveHelp);
    settingsSave.setAttribute("aria-label", saveHelp);
  }
  if (settingsCancel) {
    var _texts$en167;
    var _cancelLabel = texts[lang].cancelSettings || ((_texts$en167 = texts.en) === null || _texts$en167 === void 0 ? void 0 : _texts$en167.cancelSettings) || settingsCancel.textContent;
    setButtonLabelWithIcon(settingsCancel, _cancelLabel, ICON_GLYPHS.circleX);
    var cancelHelp = texts[lang].cancelSettingsHelp || texts[lang].cancelSettings || _cancelLabel;
    settingsCancel.setAttribute("data-help", cancelHelp);
    settingsCancel.setAttribute("title", cancelHelp);
    settingsCancel.setAttribute("aria-label", cancelHelp);
  }
  var menuToggle = document.getElementById("menuToggle");
  if (menuToggle) {
    var _texts$en168;
    var menuLabel = texts[lang].menuToggleLabel || ((_texts$en168 = texts.en) === null || _texts$en168 === void 0 ? void 0 : _texts$en168.menuToggleLabel) || menuToggle.getAttribute("aria-label") || "Menu";
    menuToggle.setAttribute("title", menuLabel);
    menuToggle.setAttribute("aria-label", menuLabel);
    var menuHelp = texts[lang].menuToggleHelp || menuLabel;
    menuToggle.setAttribute("data-help", menuHelp);
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
    if (helpNoResults) helpNoResults.textContent = texts[lang].helpNoResults;
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
  if (downloadDiagramBtn) {
    downloadDiagramBtn.textContent = texts[lang].downloadDiagramBtn;
    downloadDiagramBtn.setAttribute("title", texts[lang].downloadDiagramBtn);
    downloadDiagramBtn.setAttribute("aria-label", texts[lang].downloadDiagramBtn);
    downloadDiagramBtn.setAttribute("data-help", texts[lang].downloadDiagramHelp);
  }
  if (gridSnapToggleBtn) {
    setButtonLabelWithIcon(gridSnapToggleBtn, texts[lang].gridSnapToggle, ICON_GLYPHS.magnet);
    gridSnapToggleBtn.setAttribute("title", texts[lang].gridSnapToggle);
    gridSnapToggleBtn.setAttribute("aria-label", texts[lang].gridSnapToggle);
    gridSnapToggleBtn.setAttribute("data-help", texts[lang].gridSnapToggleHelp);
    gridSnapToggleBtn.setAttribute("aria-pressed", gridSnap ? "true" : "false");
  }
  if (resetViewBtn) {
    setButtonLabelWithIcon(resetViewBtn, texts[lang].resetViewBtn, ICON_GLYPHS.resetView);
    resetViewBtn.setAttribute("title", texts[lang].resetViewBtn);
    resetViewBtn.setAttribute("aria-label", texts[lang].resetViewBtn);
    resetViewBtn.setAttribute("data-help", texts[lang].resetViewHelp);
  }
  if (zoomInBtn) {
    setButtonLabelWithIcon(zoomInBtn, '', ICON_GLYPHS.add);
    zoomInBtn.setAttribute("title", texts[lang].zoomInLabel);
    zoomInBtn.setAttribute("aria-label", texts[lang].zoomInLabel);
    zoomInBtn.setAttribute("data-help", texts[lang].zoomInHelp);
  }
  if (zoomOutBtn) {
    setButtonLabelWithIcon(zoomOutBtn, '', ICON_GLYPHS.minus);
    zoomOutBtn.setAttribute("title", texts[lang].zoomOutLabel);
    zoomOutBtn.setAttribute("aria-label", texts[lang].zoomOutLabel);
    zoomOutBtn.setAttribute("data-help", texts[lang].zoomOutHelp);
  }
  if (diagramHint) {
    diagramHint.textContent = texts[lang].diagramMoveHint;
  }
  var fallbackProjectForm = texts.en && texts.en.projectForm ? texts.en.projectForm : {};
  var projectFormTexts = texts[lang].projectForm || fallbackProjectForm;
  if (projectFormTexts) {
    var setLabelText = function setLabelText(element, key) {
      if (!element) return;
      var value = projectFormTexts[key] || fallbackProjectForm[key];
      if (value) element.textContent = value;
    };
    setLabelText(projectDialogHeading, 'heading');
    setLabelText(projectNameLabel, 'projectName');
    setLabelText(productionCompanyLabel, 'productionCompany');
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
    setLabelText(deliveryResolutionLabel, 'deliveryResolution');
    setLabelText(recordingResolutionLabel, 'recordingResolution');
    setLabelText(sensorModeLabel, 'sensorMode');
    setLabelText(aspectRatioLabel, 'aspectRatio');
    setLabelText(codecLabel, 'codec');
    setLabelText(baseFrameRateLabel, 'baseFrameRate');
    setLabelText(lensesHeadingElem, 'lensesHeading');
    setLabelText(lensesLabelElem, 'lensesLabel');
    setLabelText(riggingHeadingElem, 'riggingHeading');
    setLabelText(requiredScenariosLabel, 'requiredScenarios');
    setLabelText(cameraHandleLabel, 'cameraHandle');
    setLabelText(viewfinderExtensionLabel, 'viewfinderExtension');
    setLabelText(matteboxFilterHeadingElem, 'matteboxFilterHeading');
    setLabelText(matteboxLabel, 'mattebox');
    setLabelText(filterLabel, 'filter');
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
    var cancelText = projectFormTexts.cancel || fallbackProjectForm.cancel || (projectCancelBtn ? projectCancelBtn.textContent : projectDialogCloseBtn === null || projectDialogCloseBtn === void 0 ? void 0 : projectDialogCloseBtn.getAttribute('aria-label')) || 'Cancel';
    if (projectCancelBtn) {
      setButtonLabelWithIcon(projectCancelBtn, cancelText, ICON_GLYPHS.circleX);
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
      email: projectFormTexts.crewEmailPlaceholder || fallbackProjectForm.crewEmailPlaceholder
    };
    var crewRoleLabels = texts[lang].crewRoles || texts.en && texts.en.crewRoles || {};
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
    });
    var stripTrailingPunctuation = function stripTrailingPunctuation(value) {
      return typeof value === 'string' ? value.replace(/[\s\u00a0]*[:：]\s*$/, '') : value;
    };
    var addEntryLabel = projectFormTexts.addEntry || fallbackProjectForm.addEntry || 'Add';
    if (addPersonBtn) {
      var crewLabel = stripTrailingPunctuation(projectFormTexts.crewHeading || fallbackProjectForm.crewHeading || 'Crew');
      var _label54 = "".concat(addEntryLabel, " ").concat(crewLabel).trim();
      setButtonLabelWithIcon(addPersonBtn, _label54, ICON_GLYPHS.add);
      addPersonBtn.setAttribute('aria-label', _label54);
      addPersonBtn.setAttribute('data-help', _label54);
    }
    if (addPrepBtn) {
      var prepLabel = stripTrailingPunctuation(projectFormTexts.prepLabel || fallbackProjectForm.prepLabel || 'Prep');
      var _label55 = "".concat(addEntryLabel, " ").concat(prepLabel).trim();
      setButtonLabelWithIcon(addPrepBtn, _label55, ICON_GLYPHS.add);
      addPrepBtn.setAttribute('aria-label', _label55);
      addPrepBtn.setAttribute('data-help', _label55);
    }
    if (addShootBtn) {
      var shootLabel = stripTrailingPunctuation(projectFormTexts.shootLabel || fallbackProjectForm.shootLabel || 'Shoot');
      var _label56 = "".concat(addEntryLabel, " ").concat(shootLabel).trim();
      setButtonLabelWithIcon(addShootBtn, _label56, ICON_GLYPHS.add);
      addShootBtn.setAttribute('aria-label', _label56);
      addShootBtn.setAttribute('data-help', _label56);
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
  populateFeatureSearch();
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
var rentalHouseLabel = document.getElementById("rentalHouseLabel");
var crewHeadingElem = document.getElementById("crewHeading");
var crewLabelElem = document.getElementById("crewLabel");
var prepLabelElem = document.getElementById("prepLabel");
var shootLabelElem = document.getElementById("shootLabel");
var deliveryResolutionLabel = document.getElementById("deliveryResolutionLabel");
var deliveryResolutionSelect = document.getElementById("deliveryResolution");
var recordingResolutionLabel = document.getElementById("recordingResolutionLabel");
var sensorModeLabel = document.getElementById("sensorModeLabel");
var aspectRatioLabel = document.getElementById("aspectRatioLabel");
var codecLabel = document.getElementById("codecLabel");
var baseFrameRateLabel = document.getElementById("baseFrameRateLabel");
var lensesHeadingElem = document.getElementById("lensesHeading");
var lensesLabelElem = document.getElementById("lensesLabel");
var riggingHeadingElem = document.getElementById("riggingHeading");
var requiredScenariosLabel = document.getElementById("requiredScenariosLabel");
var cameraHandleLabel = document.getElementById("cameraHandleLabel");
var viewfinderExtensionLabel = document.getElementById("viewfinderExtensionLabel");
var viewfinderExtensionSelect = document.getElementById("viewfinderExtension");
var matteboxFilterHeadingElem = document.getElementById("matteboxFilterHeading");
var matteboxLabel = document.getElementById("matteboxLabel");
var filterLabel = document.getElementById("filterLabel");
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
var monitoringConfigurationUserChanged = false;
var crewRoles = ['Producer', 'Production Manager', 'Director', 'Assistant Director', 'Production Assistant', 'DoP', 'Camera Operator', 'B-Camera Operator', 'Steadicam Operator', 'Drone Operator', '1st AC', '2nd AC', 'DIT', 'Video Operator', 'Key Gaffer', 'Gaffer', 'Best Boy Electric', 'Electrician', 'Rigging Gaffer', 'Key Grip', 'Best Boy Grip', 'Grip', 'Dolly Grip', 'Rigging Grip'];
var ICON_FONT_KEYS = Object.freeze({
  ESSENTIAL: 'essential',
  FILM: 'film',
  GADGET: 'gadget',
  UICONS: 'uicons',
  TEXT: 'text'
});
var VALID_ICON_FONTS = new Set(Object.values(ICON_FONT_KEYS));
function iconGlyph(char) {
  var font = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ICON_FONT_KEYS.UICONS;
  var normalizedFont = VALID_ICON_FONTS.has(font) ? font : ICON_FONT_KEYS.UICONS;
  return Object.freeze({
    char: char,
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
      char: glyph,
      font: ICON_FONT_KEYS.UICONS,
      className: '',
      size: undefined
    };
  }
  if (_typeof(glyph) === 'object') {
    var char = typeof glyph.char === 'string' ? glyph.char : '';
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
var PRODUCTION_COMPANY_ICON = iconGlyph("\uE2D5", ICON_FONT_KEYS.UICONS);
var RENTAL_HOUSE_ICON = iconGlyph("\uEA09", ICON_FONT_KEYS.UICONS);
var ASPECT_RATIO_ICON = iconGlyph("\uE86E", ICON_FONT_KEYS.UICONS);
var REQUIRED_SCENARIOS_ICON = iconGlyph("\uF4D4", ICON_FONT_KEYS.UICONS);
var MONITORING_SUPPORT_ICON = iconGlyph("\uEFFC", ICON_FONT_KEYS.UICONS);
var STAR_ICON_SVG = "\n  <svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path\n      d=\"M12 17.25 6.545 20.2 7.9 13.975 3 9.45l6.272-.7L12 3l2.728 5.75L21 9.45l-4.9 4.525 1.355 6.225Z\"\n      fill=\"currentColor\"\n      stroke=\"currentColor\"\n      stroke-width=\"0\"\n    />\n  </svg>\n".trim();
var ICON_GLYPHS = Object.freeze({
  batteryBolt: iconGlyph("\uE1A6", ICON_FONT_KEYS.UICONS),
  batteryFull: iconGlyph("\uE1A9", ICON_FONT_KEYS.UICONS),
  bolt: iconGlyph("\uF1F8", ICON_FONT_KEYS.ESSENTIAL),
  plug: iconGlyph("\uEE75", ICON_FONT_KEYS.UICONS),
  sliders: iconGlyph("\uF143", ICON_FONT_KEYS.ESSENTIAL),
  screen: iconGlyph("\uF11D", ICON_FONT_KEYS.GADGET),
  brightness: iconGlyph("\uE2B3", ICON_FONT_KEYS.UICONS),
  wifi: iconGlyph("\uF4AC", ICON_FONT_KEYS.UICONS),
  gears: iconGlyph("\uE8AF", ICON_FONT_KEYS.UICONS),
  controller: iconGlyph("\uF117", ICON_FONT_KEYS.GADGET),
  distance: iconGlyph("\uEFB9", ICON_FONT_KEYS.UICONS),
  sensor: iconGlyph("\uEC2B", ICON_FONT_KEYS.UICONS),
  viewfinder: iconGlyph("\uF114", ICON_FONT_KEYS.FILM),
  camera: iconGlyph("\uE333", ICON_FONT_KEYS.UICONS),
  trash: iconGlyph("\uF254", ICON_FONT_KEYS.ESSENTIAL),
  reload: iconGlyph("\uF202", ICON_FONT_KEYS.ESSENTIAL),
  load: iconGlyph("\uE0E0", ICON_FONT_KEYS.UICONS),
  installApp: iconGlyph("\uE9D4", ICON_FONT_KEYS.UICONS),
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
  check: iconGlyph("\uE3D8", ICON_FONT_KEYS.UICONS),
  fileExport: iconGlyph("\uE7AB", ICON_FONT_KEYS.UICONS),
  fileImport: iconGlyph("\uE7C7", ICON_FONT_KEYS.UICONS),
  save: iconGlyph("\uF207", ICON_FONT_KEYS.ESSENTIAL),
  share: iconGlyph("\uF219", ICON_FONT_KEYS.ESSENTIAL),
  paperPlane: iconGlyph("\uED67", ICON_FONT_KEYS.UICONS),
  magnet: iconGlyph("\uF1B5", ICON_FONT_KEYS.ESSENTIAL),
  codec: iconGlyph("\uE4CD", ICON_FONT_KEYS.UICONS),
  timecode: iconGlyph("\uF10E", ICON_FONT_KEYS.FILM),
  audioIn: iconGlyph("\uF1C3", ICON_FONT_KEYS.ESSENTIAL),
  audioOut: iconGlyph("\uF22F", ICON_FONT_KEYS.ESSENTIAL),
  note: iconGlyph("\uF13E", ICON_FONT_KEYS.ESSENTIAL),
  overview: iconGlyph("\uF1F5", ICON_FONT_KEYS.UICONS),
  gearList: iconGlyph("\uE467", ICON_FONT_KEYS.UICONS),
  feedback: iconGlyph("\uE791", ICON_FONT_KEYS.UICONS),
  resetView: iconGlyph("\uEB6D", ICON_FONT_KEYS.UICONS),
  pin: iconGlyph("\uF1EF", ICON_FONT_KEYS.ESSENTIAL),
  sun: iconGlyph("\uF1FE", ICON_FONT_KEYS.UICONS),
  moon: iconGlyph("\uEC7E", ICON_FONT_KEYS.UICONS),
  circleX: iconGlyph("\uF131", ICON_FONT_KEYS.ESSENTIAL),
  settingsGeneral: iconGlyph("\uE5A3", ICON_FONT_KEYS.UICONS),
  settingsAutoGear: iconGlyph("\uE8AF", ICON_FONT_KEYS.UICONS),
  settingsAccessibility: iconGlyph("\uF392", ICON_FONT_KEYS.UICONS),
  settingsBackup: iconGlyph("\uE5BD", ICON_FONT_KEYS.UICONS),
  settingsData: iconGlyph("\uE5C7", ICON_FONT_KEYS.UICONS),
  settingsAbout: iconGlyph("\uEA4F", ICON_FONT_KEYS.UICONS),
  star: Object.freeze({
    markup: STAR_ICON_SVG,
    className: 'icon-svg favorite-star-icon'
  }),
  warning: iconGlyph("\uF26F", ICON_FONT_KEYS.ESSENTIAL)
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
var PINK_MODE_ICON_RAIN_MIN_COUNT = 12;
var PINK_MODE_ICON_RAIN_MAX_COUNT = 20;
var PINK_MODE_ICON_RAIN_MIN_DURATION_MS = 3600;
var PINK_MODE_ICON_RAIN_MAX_DURATION_MS = 5600;
var PINK_MODE_ICON_RAIN_MIN_SIZE_PX = 52;
var PINK_MODE_ICON_RAIN_MAX_SIZE_PX = 88;
var PINK_MODE_ICON_RAIN_VERTICAL_START_VH_MIN = 12;
var PINK_MODE_ICON_RAIN_VERTICAL_START_VH_MAX = 26;
var PINK_MODE_ICON_RAIN_HORIZONTAL_MARGIN_PERCENT = 0;
var PINK_MODE_ICON_RAIN_HORIZONTAL_DRIFT_VW_MIN = -12;
var PINK_MODE_ICON_RAIN_HORIZONTAL_DRIFT_VW_MAX = 12;
var PINK_MODE_ICON_RAIN_MIN_SCALE = 0.78;
var PINK_MODE_ICON_RAIN_MAX_SCALE = 1.12;
var PINK_MODE_ICON_RAIN_MAX_ACTIVE = 48;
var PINK_MODE_ICON_RAIN_COOLDOWN_MS = 12000;
var PINK_MODE_ICON_RAIN_DELAY_SPREAD_MS = 960;
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
    stopPinkModeIconRotation();
    pinkModeIconIndex = 0;
    applyPinkModeIcon(pinkModeIcons.onSequence[pinkModeIconIndex], {
      animate: false
    });
    startPinkModeIconRotation();
  }
  return true;
}
function loadPinkModeIconsFromFiles() {
  return _loadPinkModeIconsFromFiles.apply(this, arguments);
}
function _loadPinkModeIconsFromFiles() {
  _loadPinkModeIconsFromFiles = _asyncToGenerator(_regenerator().m(function _callee4() {
    var responses, markupList;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          if (!(typeof fetch !== 'function')) {
            _context4.n = 1;
            break;
          }
          return _context4.a(2);
        case 1:
          _context4.n = 2;
          return Promise.all(PINK_MODE_ICON_FILES.map(function (path) {
            return fetch(path).then(function (response) {
              return response.ok ? response.text() : null;
            }).catch(function () {
              return null;
            });
          }));
        case 2:
          responses = _context4.v;
          markupList = responses.filter(Boolean);
          if (markupList.length) {
            setPinkModeIconSequence(markupList);
          }
        case 3:
          return _context4.a(2);
      }
    }, _callee4);
  }));
  return _loadPinkModeIconsFromFiles.apply(this, arguments);
}
function loadPinkModeAnimatedIconTemplates() {
  return _loadPinkModeAnimatedIconTemplates.apply(this, arguments);
}
function _loadPinkModeAnimatedIconTemplates() {
  _loadPinkModeAnimatedIconTemplates = _asyncToGenerator(_regenerator().m(function _callee5() {
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          if (!pinkModeAnimatedIconTemplates) {
            _context5.n = 1;
            break;
          }
          return _context5.a(2, pinkModeAnimatedIconTemplates);
        case 1:
          if (!pinkModeAnimatedIconTemplatesPromise) {
            _context5.n = 2;
            break;
          }
          return _context5.a(2, pinkModeAnimatedIconTemplatesPromise);
        case 2:
          if (!(typeof fetch !== 'function')) {
            _context5.n = 3;
            break;
          }
          pinkModeAnimatedIconTemplates = Object.freeze([]);
          return _context5.a(2, pinkModeAnimatedIconTemplates);
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
          return _context5.a(2, pinkModeAnimatedIconTemplatesPromise);
      }
    }, _callee5);
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
function findPinkModeAnimationPlacement(_ref29) {
  var layer = _ref29.layer,
    hostRect = _ref29.hostRect,
    hostTop = _ref29.hostTop,
    visibleTop = _ref29.visibleTop,
    visibleBottom = _ref29.visibleBottom,
    horizontalPadding = _ref29.horizontalPadding,
    verticalPadding = _ref29.verticalPadding,
    hostWidth = _ref29.hostWidth,
    size = _ref29.size,
    avoidRegions = _ref29.avoidRegions,
    _ref29$leftMarginExte = _ref29.leftMarginExtension,
    leftMarginExtension = _ref29$leftMarginExte === void 0 ? 0 : _ref29$leftMarginExte,
    _ref29$rightMarginExt = _ref29.rightMarginExtension,
    rightMarginExtension = _ref29$rightMarginExt === void 0 ? 0 : _ref29$rightMarginExt;
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
  if (typeof window === 'undefined' || typeof document === 'undefined' || !document.body || pinkModeReduceMotionQuery && pinkModeReduceMotionQuery.matches) {
    return;
  }
  var now = Date.now();
  if (pinkModeIconRainLastTriggeredAt && now - pinkModeIconRainLastTriggeredAt < PINK_MODE_ICON_RAIN_COOLDOWN_MS) {
    return;
  }
  pinkModeIconRainLastTriggeredAt = now;
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
  var hostHeight = host && typeof host.scrollHeight === 'number' && host.scrollHeight > 0 ? host.scrollHeight : hostRect && hostRect.height ? hostRect.height : viewportHeight;
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
}
function startPinkModeAnimatedIcons() {
  if (pinkModeAnimatedIconsActive) {
    return;
  }
  if (!document || !document.body) {
    return;
  }
  if (pinkModeReduceMotionQuery && pinkModeReduceMotionQuery.matches) {
    return;
  }
  if (typeof window === 'undefined' || !window.lottie || typeof window.lottie.loadAnimation !== 'function') {
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
  rentalHouse: RENTAL_HOUSE_ICON,
  crew: iconGlyph("\uF404", ICON_FONT_KEYS.UICONS),
  prepDays: iconGlyph("\uE312", ICON_FONT_KEYS.UICONS),
  shootingDays: iconGlyph("\uE311", ICON_FONT_KEYS.UICONS),
  deliveryResolution: iconGlyph("\uEF69", ICON_FONT_KEYS.UICONS),
  recordingResolution: ICON_GLYPHS.camera,
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
  viewfinderUserButtons: iconGlyph("\uF0D1", ICON_FONT_KEYS.UICONS)
};
function updateSelectIconBoxes(sel) {
  if (!sel) return;
  var container = sel.parentNode.querySelector('.icon-box-summary');
  if (!container) {
    container = document.createElement('div');
    container.className = 'icon-box-summary';
    sel.parentNode.insertBefore(container, sel.nextSibling);
  }
  container.innerHTML = '';
  var opts = sel.multiple ? Array.from(sel.selectedOptions) : sel.value ? [sel.options[sel.selectedIndex]] : [];
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
function setButtonLabelWithIcon(button, label) {
  var glyph = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ICON_GLYPHS.save;
  if (!button) return;
  var safeLabel = typeof label === 'string' ? escapeHtml(label) : '';
  var iconHtml = iconMarkup(glyph, 'btn-icon');
  button.innerHTML = "".concat(iconHtml).concat(safeLabel);
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
  var _ref30 = options || {},
    _ref30$contextPaths = _ref30.contextPaths,
    contextPaths = _ref30$contextPaths === void 0 ? [] : _ref30$contextPaths,
    _ref30$fallbackContex = _ref30.fallbackContext,
    fallbackContext = _ref30$fallbackContex === void 0 ? '' : _ref30$fallbackContex,
    _ref30$actionKey = _ref30.actionKey,
    actionKey = _ref30$actionKey === void 0 ? 'addEntry' : _ref30$actionKey;
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
function createCrewRow() {
  var _texts$en170, _texts$currentLang2, _texts$currentLang3, _texts$en171, _texts$currentLang4, _texts$en172;
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (!crewContainer) return;
  var row = document.createElement('div');
  row.className = 'person-row';
  var roleSel = document.createElement('select');
  roleSel.name = 'crewRole';
  crewRoles.forEach(function (r) {
    var _texts$currentLang, _texts$en169;
    var opt = document.createElement('option');
    opt.value = r;
    var roleLabels = ((_texts$currentLang = texts[currentLang]) === null || _texts$currentLang === void 0 ? void 0 : _texts$currentLang.crewRoles) || ((_texts$en169 = texts.en) === null || _texts$en169 === void 0 ? void 0 : _texts$en169.crewRoles) || {};
    opt.textContent = roleLabels[r] || r;
    roleSel.appendChild(opt);
  });
  if (data.role) roleSel.value = data.role;
  var nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.name = 'crewName';
  var fallbackProjectForm = ((_texts$en170 = texts.en) === null || _texts$en170 === void 0 ? void 0 : _texts$en170.projectForm) || {};
  var projectFormTexts = ((_texts$currentLang2 = texts[currentLang]) === null || _texts$currentLang2 === void 0 ? void 0 : _texts$currentLang2.projectForm) || fallbackProjectForm;
  nameInput.placeholder = projectFormTexts.crewNamePlaceholder || fallbackProjectForm.crewNamePlaceholder || 'Name';
  nameInput.className = 'person-name';
  nameInput.value = data.name || '';
  var phoneInput = document.createElement('input');
  phoneInput.type = 'tel';
  phoneInput.name = 'crewPhone';
  phoneInput.placeholder = projectFormTexts.crewPhonePlaceholder || fallbackProjectForm.crewPhonePlaceholder || 'Phone';
  phoneInput.className = 'person-phone';
  phoneInput.value = data.phone || '';
  var emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.name = 'crewEmail';
  emailInput.placeholder = projectFormTexts.crewEmailPlaceholder || fallbackProjectForm.crewEmailPlaceholder || 'Email';
  emailInput.className = 'person-email';
  emailInput.value = data.email || '';
  var crewRoleLabelText = projectFormTexts.crewRoleLabel || fallbackProjectForm.crewRoleLabel || 'Crew role';
  var crewNameLabelText = projectFormTexts.crewNameLabel || fallbackProjectForm.crewNameLabel || 'Crew member name';
  var crewPhoneLabelText = projectFormTexts.crewPhoneLabel || fallbackProjectForm.crewPhoneLabel || 'Crew member phone';
  var crewEmailLabelText = projectFormTexts.crewEmailLabel || fallbackProjectForm.crewEmailLabel || 'Crew member email';
  var roleLabel = createHiddenLabel(ensureElementId(roleSel, crewRoleLabelText), crewRoleLabelText);
  var nameLabel = createHiddenLabel(ensureElementId(nameInput, crewNameLabelText), crewNameLabelText);
  var phoneLabel = createHiddenLabel(ensureElementId(phoneInput, crewPhoneLabelText), crewPhoneLabelText);
  var emailLabel = createHiddenLabel(ensureElementId(emailInput, crewEmailLabelText), crewEmailLabelText);
  var removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  var removeBase = ((_texts$currentLang3 = texts[currentLang]) === null || _texts$currentLang3 === void 0 || (_texts$currentLang3 = _texts$currentLang3.projectForm) === null || _texts$currentLang3 === void 0 ? void 0 : _texts$currentLang3.removeEntry) || ((_texts$en171 = texts.en) === null || _texts$en171 === void 0 || (_texts$en171 = _texts$en171.projectForm) === null || _texts$en171 === void 0 ? void 0 : _texts$en171.removeEntry) || 'Remove';
  var crewHeading = ((_texts$currentLang4 = texts[currentLang]) === null || _texts$currentLang4 === void 0 || (_texts$currentLang4 = _texts$currentLang4.projectForm) === null || _texts$currentLang4 === void 0 ? void 0 : _texts$currentLang4.crewHeading) || ((_texts$en172 = texts.en) === null || _texts$en172 === void 0 || (_texts$en172 = _texts$en172.projectForm) === null || _texts$en172 === void 0 ? void 0 : _texts$en172.crewHeading) || 'Crew';
  var removeCrewLabel = "".concat(removeBase, " ").concat(crewHeading).trim();
  removeBtn.innerHTML = iconMarkup(ICON_GLYPHS.minus, 'btn-icon');
  removeBtn.setAttribute('aria-label', removeCrewLabel);
  removeBtn.setAttribute('title', removeCrewLabel);
  removeBtn.setAttribute('data-help', removeCrewLabel);
  removeBtn.addEventListener('click', function () {
    row.remove();
    scheduleProjectAutoSave(true);
  });
  row.append(roleLabel, roleSel, nameLabel, nameInput, phoneLabel, phoneInput, emailLabel, emailInput, removeBtn);
  crewContainer.appendChild(row);
}
function createPrepRow() {
  var _texts$currentLang5, _texts$en173, _texts$currentLang6, _texts$en174;
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
  var removeBase = ((_texts$currentLang5 = texts[currentLang]) === null || _texts$currentLang5 === void 0 || (_texts$currentLang5 = _texts$currentLang5.projectForm) === null || _texts$currentLang5 === void 0 ? void 0 : _texts$currentLang5.removeEntry) || ((_texts$en173 = texts.en) === null || _texts$en173 === void 0 || (_texts$en173 = _texts$en173.projectForm) === null || _texts$en173 === void 0 ? void 0 : _texts$en173.removeEntry) || 'Remove';
  var prepLabelText = ((_texts$currentLang6 = texts[currentLang]) === null || _texts$currentLang6 === void 0 || (_texts$currentLang6 = _texts$currentLang6.projectForm) === null || _texts$currentLang6 === void 0 ? void 0 : _texts$currentLang6.prepLabel) || ((_texts$en174 = texts.en) === null || _texts$en174 === void 0 || (_texts$en174 = _texts$en174.projectForm) === null || _texts$en174 === void 0 ? void 0 : _texts$en174.prepLabel) || 'Prep';
  var removePrepLabel = "".concat(removeBase, " ").concat(prepLabelText).trim();
  removeBtn.innerHTML = iconMarkup(ICON_GLYPHS.minus, 'btn-icon');
  removeBtn.setAttribute('aria-label', removePrepLabel);
  removeBtn.setAttribute('title', removePrepLabel);
  removeBtn.setAttribute('data-help', removePrepLabel);
  removeBtn.addEventListener('click', function () {
    row.remove();
    scheduleProjectAutoSave(true);
  });
  row.append(start, span, end, removeBtn);
  prepContainer.appendChild(row);
}
function createShootRow() {
  var _texts$currentLang7, _texts$en175, _texts$currentLang8, _texts$en176;
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
  var removeBase = ((_texts$currentLang7 = texts[currentLang]) === null || _texts$currentLang7 === void 0 || (_texts$currentLang7 = _texts$currentLang7.projectForm) === null || _texts$currentLang7 === void 0 ? void 0 : _texts$currentLang7.removeEntry) || ((_texts$en175 = texts.en) === null || _texts$en175 === void 0 || (_texts$en175 = _texts$en175.projectForm) === null || _texts$en175 === void 0 ? void 0 : _texts$en175.removeEntry) || 'Remove';
  var shootLabelText = ((_texts$currentLang8 = texts[currentLang]) === null || _texts$currentLang8 === void 0 || (_texts$currentLang8 = _texts$currentLang8.projectForm) === null || _texts$currentLang8 === void 0 ? void 0 : _texts$currentLang8.shootLabel) || ((_texts$en176 = texts.en) === null || _texts$en176 === void 0 || (_texts$en176 = _texts$en176.projectForm) === null || _texts$en176 === void 0 ? void 0 : _texts$en176.shootLabel) || 'Shoot';
  var removeShootLabel = "".concat(removeBase, " ").concat(shootLabelText).trim();
  removeBtn.innerHTML = iconMarkup(ICON_GLYPHS.minus, 'btn-icon');
  removeBtn.setAttribute('aria-label', removeShootLabel);
  removeBtn.setAttribute('title', removeShootLabel);
  removeBtn.setAttribute('data-help', removeShootLabel);
  removeBtn.addEventListener('click', function () {
    row.remove();
    scheduleProjectAutoSave(true);
  });
  row.append(start, span, end, removeBtn);
  shootContainer.appendChild(row);
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
  var _texts$en177, _texts$en178, _texts$en179;
  if (!powerWarningDialog) return;
  var _ref31 = context || {},
    batteryName = _ref31.batteryName,
    current = _ref31.current,
    hasPinLimit = _ref31.hasPinLimit,
    pinLimit = _ref31.pinLimit,
    hasDtapRating = _ref31.hasDtapRating,
    dtapLimit = _ref31.dtapLimit,
    dtapAllowed = _ref31.dtapAllowed;
  var safeBatteryName = batteryName && batteryName.trim() ? batteryName.trim() : (batterySelect === null || batterySelect === void 0 ? void 0 : batterySelect.value) || '';
  var formattedCurrent = formatCurrentValue(Number(current) || 0);
  var langTexts = texts[currentLang] || texts.en || {};
  var messageTemplate = langTexts.powerWarningMessage || ((_texts$en177 = texts.en) === null || _texts$en177 === void 0 ? void 0 : _texts$en177.powerWarningMessage) || '';
  var message = messageTemplate ? messageTemplate.replace(/\{battery\}/g, safeBatteryName).replace(/\{current\}/g, formattedCurrent) : "".concat(safeBatteryName, " exceeds every available output (").concat(formattedCurrent, "A).");
  if (powerWarningMessageElem) {
    powerWarningMessageElem.textContent = message;
  }
  var pinsDetail = hasPinLimit ? (langTexts.powerWarningPinsDetail || ((_texts$en178 = texts.en) === null || _texts$en178 === void 0 ? void 0 : _texts$en178.powerWarningPinsDetail) || 'Pins limit: {max}A').replace(/\{max\}/g, formatCurrentValue(Number(pinLimit) || 0)) : langTexts.powerWarningPinsUnavailable || ((_texts$en179 = texts.en) === null || _texts$en179 === void 0 ? void 0 : _texts$en179.powerWarningPinsUnavailable) || 'Pins limit unavailable.';
  if (powerWarningPinsDetailElem) {
    powerWarningPinsDetailElem.textContent = pinsDetail;
  }
  var dtapDetail = '';
  if (hasDtapRating && dtapAllowed) {
    var _texts$en180;
    dtapDetail = (langTexts.powerWarningDtapDetail || ((_texts$en180 = texts.en) === null || _texts$en180 === void 0 ? void 0 : _texts$en180.powerWarningDtapDetail) || 'D-Tap limit: {max}A').replace(/\{max\}/g, formatCurrentValue(Number(dtapLimit) || 0));
  } else if (hasDtapRating && !dtapAllowed) {
    var _texts$en181;
    dtapDetail = langTexts.powerWarningDtapBlocked || ((_texts$en181 = texts.en) === null || _texts$en181 === void 0 ? void 0 : _texts$en181.powerWarningDtapBlocked) || 'D-Tap cannot be used with the current configuration.';
  } else {
    var _texts$en182;
    dtapDetail = langTexts.powerWarningDtapUnavailable || ((_texts$en182 = texts.en) === null || _texts$en182 === void 0 ? void 0 : _texts$en182.powerWarningDtapUnavailable) || 'No D-Tap output is available.';
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
  projectInfo: "i",
  projectHtml: "q",
  gearSelectors: "e",
  gearList: "l",
  changedDevices: "x",
  feedback: "f",
  autoGearRules: "a",
  diagramPositions: "y"
};
var lastSharedSetupData = null;
var lastSharedAutoGearRules = null;
var sharedImportPreviousPresetId = '';
var sharedImportProjectPresetActive = false;
var sharedImportPreparedForImport = false;
function cloneSharedImportValue(value) {
  if (value == null) return null;
  try {
    return JSON.parse(JSON.stringify(value));
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
  setActiveAutoGearPresetId(targetPresetId, {
    persist: false,
    skipRender: true
  });
  sharedImportProjectPresetActive = false;
  sharedImportPreviousPresetId = '';
  renderAutoGearPresetsControls();
}
function activateSharedImportProjectPreset(presetId) {
  if (!presetId) return;
  if (!sharedImportProjectPresetActive) {
    sharedImportPreviousPresetId = activeAutoGearPresetId || '';
  }
  sharedImportProjectPresetActive = true;
  setActiveAutoGearPresetId(presetId, {
    persist: false,
    skipRender: true
  });
  renderAutoGearPresetsControls();
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
  var _texts$en183, _texts$en184;
  var langTexts = texts[currentLang] || texts.en || {};
  var fallback = langTexts.sharedImportAutoGearPresetFallback || ((_texts$en183 = texts.en) === null || _texts$en183 === void 0 ? void 0 : _texts$en183.sharedImportAutoGearPresetFallback) || 'Shared automatic gear rules';
  var projectName = getSharedImportProjectName(sharedData);
  if (!projectName) {
    return fallback;
  }
  var template = langTexts.sharedImportAutoGearPresetName || ((_texts$en184 = texts.en) === null || _texts$en184 === void 0 ? void 0 : _texts$en184.sharedImportAutoGearPresetName) || '%s';
  if (template.includes('%s')) {
    return formatWithPlaceholders(template, projectName);
  }
  return "".concat(template, " ").concat(projectName).trim();
}
function ensureSharedAutoGearPreset(rules, sharedData) {
  var _texts$currentLang9, _texts$en185;
  var normalizedRules = Array.isArray(rules) ? rules.map(normalizeAutoGearRule).filter(Boolean) : [];
  if (!normalizedRules.length) return null;
  var label = getSharedImportPresetLabel(sharedData);
  var fingerprint = createAutoGearRulesFingerprint(normalizedRules);
  var preset = autoGearPresets.find(function (entry) {
    return entry.fingerprint === fingerprint;
  }) || null;
  var fallback = ((_texts$currentLang9 = texts[currentLang]) === null || _texts$currentLang9 === void 0 ? void 0 : _texts$currentLang9.sharedImportAutoGearPresetFallback) || ((_texts$en185 = texts.en) === null || _texts$en185 === void 0 ? void 0 : _texts$en185.sharedImportAutoGearPresetFallback) || 'Shared automatic gear rules';
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
      renderAutoGearPresetsControls();
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
  if (autoGearAutoPresetId) {
    setAutoGearAutoPresetId('', {
      persist: true,
      skipRender: true
    });
  }
  renderAutoGearPresetsControls();
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
  var out = {};
  Object.keys(sharedKeyMap).forEach(function (key) {
    if (setup[key] != null) out[sharedKeyMap[key]] = setup[key];
  });
  return out;
}
function decodeSharedSetup(setup) {
  if (setup.setupName || setup.camera) return setup;
  var out = {};
  Object.keys(sharedKeyMap).forEach(function (key) {
    var short = sharedKeyMap[key];
    if (setup[short] != null) out[key] = setup[short];
  });
  return out;
}
var deviceManagerSection = document.getElementById("device-manager");
var toggleDeviceBtn = document.getElementById("toggleDeviceManager");
var deviceListContainer = document.getElementById("deviceListContainer");
var deviceManagerLists = new Map();
var deviceManagerPreferredOrder = ["cameras", "viewfinders", "monitors", "video", "wirelessReceivers", "directorMonitors", "iosVideo", "lenses", "fiz.motors", "fiz.controllers", "fiz.handUnits", "fiz.distance", "batteries", "batteryHotswaps", "accessories.batteries", "accessories.powerPlates", "accessories.cables", "accessories.cages", "accessories.cameraSupport", "accessories.cameraStabiliser", "accessories.chargers", "accessories.videoAssist", "accessories.media", "accessories.filters", "accessories.matteboxes", "accessories.rigging", "accessories.grip", "accessories.sliders", "accessories.tripodHeads", "accessories.tripods", "accessories.carts"];
function normalizeCategoryKey(key) {
  var _devices4, _devices5;
  if (!key) return null;
  if (key === "accessories" || key === "fiz" || key === "filterOptions") return null;
  if (key.startsWith("accessories.cables.")) return "accessories.cables";
  if (key === "videoAssist" && (_devices4 = devices) !== null && _devices4 !== void 0 && (_devices4 = _devices4.accessories) !== null && _devices4 !== void 0 && _devices4.videoAssist) return "accessories.videoAssist";
  if (key === "media" && (_devices5 = devices) !== null && _devices5 !== void 0 && (_devices5 = _devices5.accessories) !== null && _devices5 !== void 0 && _devices5.media) return "accessories.media";
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
    Object.entries(node).forEach(function (_ref32) {
      var _ref33 = _slicedToArray(_ref32, 2),
        childKey = _ref33[0],
        value = _ref33[1];
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
    Object.entries(data).forEach(function (_ref34) {
      var _ref35 = _slicedToArray(_ref34, 2),
        key = _ref35[0],
        value = _ref35[1];
      if (key === 'accessories') {
        if (value && _typeof(value) === 'object') {
          Object.entries(value).forEach(function (_ref36) {
            var _ref37 = _slicedToArray(_ref36, 2),
              subKey = _ref37[0],
              subValue = _ref37[1];
            if (subValue && _typeof(subValue) === 'object' && !Array.isArray(subValue)) {
              addCategory("accessories.".concat(subKey));
            }
          });
        }
      } else if (key === 'fiz') {
        if (value && _typeof(value) === 'object') {
          Object.entries(value).forEach(function (_ref38) {
            var _ref39 = _slicedToArray(_ref38, 2),
              subKey = _ref39[0],
              subValue = _ref39[1];
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
  if (!deviceListContainer || deviceManagerLists.has(categoryKey)) return deviceManagerLists.get(categoryKey) || null;
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
  deviceListContainer.appendChild(section);
  bindFilterInput(filterInput, function () {
    return filterDeviceList(list, filterInput.value);
  });
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
  if (!deviceListContainer) return;
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
      deviceListContainer.appendChild(entry.section);
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
        _key = _Object$entries7$_i[0],
        _obj = _Object$entries7$_i[1];
      if (_key === 'accessories' || _key === 'fiz') continue;
      if (_obj && _obj.attributes) addOpt(_key);
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
    for (var _i0 = 0, _Object$entries9 = Object.entries(devices); _i0 < _Object$entries9.length; _i0++) {
      var _Object$entries9$_i = _slicedToArray(_Object$entries9[_i0], 2),
        _key2 = _Object$entries9$_i[0],
        _obj3 = _Object$entries9$_i[1];
      if (_key2 === 'accessories') {
        for (var _i1 = 0, _Object$keys = Object.keys(_obj3 || {}); _i1 < _Object$keys.length; _i1++) {
          var _sub3 = _Object$keys[_i1];
          addIfMissing("accessories.".concat(_sub3));
        }
      } else if (_key2 === 'fiz') {
        for (var _i10 = 0, _Object$keys2 = Object.keys(_obj3 || {}); _i10 < _Object$keys2.length; _i10++) {
          var _sub4 = _Object$keys2[_i10];
          addIfMissing("fiz.".concat(_sub4));
        }
      } else if (_obj3 && _typeof(_obj3) === 'object' && !Array.isArray(_obj3)) {
        addIfMissing(_key2);
      }
    }
  }
  syncDeviceManagerCategories();
}
populateCategoryOptions();
function getCategoryContainer(categoryKey, subcategory) {
  var _ref40 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    _ref40$create = _ref40.create,
    create = _ref40$create === void 0 ? false : _ref40$create;
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
var categoryExcludedAttrs = {
  batteries: ["capacity", "pinA", "dtapA"],
  batteryHotswaps: ["capacity", "pinA"],
  "accessories.batteries": ["capacity", "pinA"],
  cameras: ["powerDrawWatts", "power", "recordingMedia", "lensMount", "videoOutputs", "fizConnectors", "viewfinder", "timecode"],
  monitors: ["screenSizeInches", "brightnessNits", "power", "powerDrawWatts", "videoInputs", "videoOutputs", "wirelessTx", "latencyMs", "audioOutput"],
  viewfinders: ["screenSizeInches", "brightnessNits", "power", "powerDrawWatts", "videoInputs", "videoOutputs", "wirelessTx", "latencyMs"],
  video: ["powerDrawWatts", "power", "videoInputs", "videoOutputs", "frequency", "latencyMs"],
  wirelessReceivers: ["powerDrawWatts", "power", "videoInputs", "videoOutputs", "frequency", "latencyMs"],
  iosVideo: ["powerDrawWatts", "power", "videoInputs", "videoOutputs", "frequency", "latencyMs"],
  "fiz.motors": ["fizConnectors", "gearTypes", "internalController", "notes", "powerDrawWatts", "torqueNm"],
  "fiz.controllers": ["batteryType", "connectivity", "fizConnectors", "internalController", "notes", "powerDrawWatts", "powerSource"],
  "fiz.distance": ["accuracy", "connectionCompatibility", "measurementMethod", "measurementRange", "notes", "outputDisplay", "powerDrawWatts"]
};
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
    var _key3 = parts.join('.');
    if (schemaFieldConfigs[_key3] && schemaFieldConfigs[_key3][attr]) {
      return schemaFieldConfigs[_key3][attr];
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
    var _label57 = document.createElement('label');
    _label57.setAttribute('for', attrId);
    _label57.textContent = labelText;
    _row.appendChild(_label57);
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
    var _help28 = document.createElement('p');
    _help28.className = 'schema-field-help';
    _help28.textContent = config.help;
    controlContainer.appendChild(_help28);
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
    for (var _i11 = 0, _Object$keys3 = Object.keys(data); _i11 < _Object$keys3.length; _i11++) {
      var _key4 = _Object$keys3[_i11];
      if (skip(_key4)) continue;
      seen.add(_key4);
      attrs.push(_key4);
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
      var _value3 = data && data[attr] !== undefined ? data[attr] : undefined;
      list.appendChild(createSchemaField(category, attr, _value3));
    }
  } catch (err) {
    _iterator13.e(err);
  } finally {
    _iterator13.f();
  }
  dynamicFieldsDiv.appendChild(list);
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
  var result = {};
  var _iterator14 = _createForOfIteratorHelper(attrs),
    _step14;
  try {
    for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
      var attr = _step14.value;
      if (exclude.includes(attr)) continue;
      var el = document.getElementById("attr-".concat(attr));
      if (el) {
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
            } catch (_unused4) {
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
    }
  } catch (err) {
    _iterator14.e(err);
  } finally {
    _iterator14.f();
  }
  return result;
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
var helpResultsSummary = document.getElementById("helpResultsSummary");
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
var iosPwaHelpStep2 = document.getElementById("iosPwaHelpStep2");
var iosPwaHelpStep3 = document.getElementById("iosPwaHelpStep3");
setPinkModeIconSequence(PINK_MODE_ICON_FALLBACK_MARKUP);
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  loadPinkModeIconsFromFiles().catch(function () {});
}
var iosPwaHelpStep4 = document.getElementById("iosPwaHelpStep4");
var iosPwaHelpNote = document.getElementById("iosPwaHelpNote");
var iosPwaHelpClose = document.getElementById("iosPwaHelpClose");
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
    } catch (_unused5) {
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
    } catch (_unused6) {
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
settingsTabIconAssignments.forEach(function (_ref41) {
  var _button$querySelector4;
  var _ref42 = _slicedToArray(_ref41, 2),
    button = _ref42[0],
    glyph = _ref42[1];
  if (!button || !glyph) return;
  var iconElement = (_button$querySelector4 = button.querySelector) === null || _button$querySelector4 === void 0 ? void 0 : _button$querySelector4.call(button, '.settings-tab-icon');
  if (!iconElement) return;
  applyIconGlyph(iconElement, glyph);
  iconElement.setAttribute('aria-hidden', 'true');
});
var generalSettingsHeading = document.getElementById('generalSettingsHeading');
var settingsLanguage = document.getElementById("settingsLanguage");
var settingsDarkMode = document.getElementById("settingsDarkMode");
var settingsPinkMode = document.getElementById("settingsPinkMode");
var accentColorInput = document.getElementById("accentColorInput");
var accentColorResetButton = document.getElementById("accentColorReset");
var settingsTemperatureUnit = document.getElementById('settingsTemperatureUnit');
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
  var _ref43 = options || {},
    _ref43$focusTab = _ref43.focusTab,
    focusTab = _ref43$focusTab === void 0 ? false : _ref43$focusTab;
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
      } catch (_unused7) {
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
    } catch (_unused8) {
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
  monitor: document.getElementById('autoGearCondition-monitor'),
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
  monitor: ((_autoGearConditionSec0 = autoGearConditionSections.monitor) === null || _autoGearConditionSec0 === void 0 ? void 0 : _autoGearConditionSec0.querySelector('.auto-gear-condition-add')) || null,
  crewPresent: ((_autoGearConditionSec1 = autoGearConditionSections.crewPresent) === null || _autoGearConditionSec1 === void 0 ? void 0 : _autoGearConditionSec1.querySelector('.auto-gear-condition-add')) || null,
  crewAbsent: ((_autoGearConditionSec10 = autoGearConditionSections.crewAbsent) === null || _autoGearConditionSec10 === void 0 ? void 0 : _autoGearConditionSec10.querySelector('.auto-gear-condition-add')) || null,
  wireless: ((_autoGearConditionSec11 = autoGearConditionSections.wireless) === null || _autoGearConditionSec11 === void 0 ? void 0 : _autoGearConditionSec11.querySelector('.auto-gear-condition-add')) || null,
  motors: ((_autoGearConditionSec12 = autoGearConditionSections.motors) === null || _autoGearConditionSec12 === void 0 ? void 0 : _autoGearConditionSec12.querySelector('.auto-gear-condition-add')) || null,
  controllers: ((_autoGearConditionSec13 = autoGearConditionSections.controllers) === null || _autoGearConditionSec13 === void 0 ? void 0 : _autoGearConditionSec13.querySelector('.auto-gear-condition-add')) || null,
  distance: ((_autoGearConditionSec14 = autoGearConditionSections.distance) === null || _autoGearConditionSec14 === void 0 ? void 0 : _autoGearConditionSec14.querySelector('.auto-gear-condition-add')) || null
};
var autoGearConditionRemoveButtons = {
  always: ((_autoGearConditionSec15 = autoGearConditionSections.always) === null || _autoGearConditionSec15 === void 0 ? void 0 : _autoGearConditionSec15.querySelector('.auto-gear-condition-remove')) || null,
  scenarios: ((_autoGearConditionSec16 = autoGearConditionSections.scenarios) === null || _autoGearConditionSec16 === void 0 ? void 0 : _autoGearConditionSec16.querySelector('.auto-gear-condition-remove')) || null,
  shootingDays: ((_autoGearConditionSec17 = autoGearConditionSections.shootingDays) === null || _autoGearConditionSec17 === void 0 ? void 0 : _autoGearConditionSec17.querySelector('.auto-gear-condition-remove')) || null,
  mattebox: ((_autoGearConditionSec18 = autoGearConditionSections.mattebox) === null || _autoGearConditionSec18 === void 0 ? void 0 : _autoGearConditionSec18.querySelector('.auto-gear-condition-remove')) || null,
  cameraHandle: ((_autoGearConditionSec19 = autoGearConditionSections.cameraHandle) === null || _autoGearConditionSec19 === void 0 ? void 0 : _autoGearConditionSec19.querySelector('.auto-gear-condition-remove')) || null,
  viewfinderExtension: ((_autoGearConditionSec20 = autoGearConditionSections.viewfinderExtension) === null || _autoGearConditionSec20 === void 0 ? void 0 : _autoGearConditionSec20.querySelector('.auto-gear-condition-remove')) || null,
  deliveryResolution: ((_autoGearConditionSec21 = autoGearConditionSections.deliveryResolution) === null || _autoGearConditionSec21 === void 0 ? void 0 : _autoGearConditionSec21.querySelector('.auto-gear-condition-remove')) || null,
  videoDistribution: ((_autoGearConditionSec22 = autoGearConditionSections.videoDistribution) === null || _autoGearConditionSec22 === void 0 ? void 0 : _autoGearConditionSec22.querySelector('.auto-gear-condition-remove')) || null,
  camera: ((_autoGearConditionSec23 = autoGearConditionSections.camera) === null || _autoGearConditionSec23 === void 0 ? void 0 : _autoGearConditionSec23.querySelector('.auto-gear-condition-remove')) || null,
  monitor: ((_autoGearConditionSec24 = autoGearConditionSections.monitor) === null || _autoGearConditionSec24 === void 0 ? void 0 : _autoGearConditionSec24.querySelector('.auto-gear-condition-remove')) || null,
  crewPresent: ((_autoGearConditionSec25 = autoGearConditionSections.crewPresent) === null || _autoGearConditionSec25 === void 0 ? void 0 : _autoGearConditionSec25.querySelector('.auto-gear-condition-remove')) || null,
  crewAbsent: ((_autoGearConditionSec26 = autoGearConditionSections.crewAbsent) === null || _autoGearConditionSec26 === void 0 ? void 0 : _autoGearConditionSec26.querySelector('.auto-gear-condition-remove')) || null,
  wireless: ((_autoGearConditionSec27 = autoGearConditionSections.wireless) === null || _autoGearConditionSec27 === void 0 ? void 0 : _autoGearConditionSec27.querySelector('.auto-gear-condition-remove')) || null,
  motors: ((_autoGearConditionSec28 = autoGearConditionSections.motors) === null || _autoGearConditionSec28 === void 0 ? void 0 : _autoGearConditionSec28.querySelector('.auto-gear-condition-remove')) || null,
  controllers: ((_autoGearConditionSec29 = autoGearConditionSections.controllers) === null || _autoGearConditionSec29 === void 0 ? void 0 : _autoGearConditionSec29.querySelector('.auto-gear-condition-remove')) || null,
  distance: ((_autoGearConditionSec30 = autoGearConditionSections.distance) === null || _autoGearConditionSec30 === void 0 ? void 0 : _autoGearConditionSec30.querySelector('.auto-gear-condition-remove')) || null
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
var autoGearScenarioModeSelect = document.getElementById('autoGearScenarioMode');
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
var autoGearCameraHandleSelect = document.getElementById('autoGearCameraHandle');
var autoGearCameraHandleLabel = document.getElementById('autoGearCameraHandleLabel');
var autoGearViewfinderExtensionSelect = document.getElementById('autoGearViewfinderExtension');
var autoGearViewfinderExtensionLabel = document.getElementById('autoGearViewfinderExtensionLabel');
var autoGearDeliveryResolutionSelect = document.getElementById('autoGearDeliveryResolution');
var autoGearDeliveryResolutionLabel = document.getElementById('autoGearDeliveryResolutionLabel');
var autoGearVideoDistributionSelect = document.getElementById('autoGearVideoDistribution');
var autoGearVideoDistributionLabel = document.getElementById('autoGearVideoDistributionLabel');
var autoGearCameraSelect = document.getElementById('autoGearCamera');
var autoGearCameraLabel = document.getElementById('autoGearCameraLabel');
var autoGearMonitorSelect = document.getElementById('autoGearMonitor');
var autoGearMonitorLabel = document.getElementById('autoGearMonitorLabel');
var autoGearCrewPresentSelect = document.getElementById('autoGearCrewPresent');
var autoGearCrewPresentLabel = document.getElementById('autoGearCrewPresentLabel');
var autoGearCrewAbsentSelect = document.getElementById('autoGearCrewAbsent');
var autoGearCrewAbsentLabel = document.getElementById('autoGearCrewAbsentLabel');
var autoGearWirelessSelect = document.getElementById('autoGearWireless');
var autoGearWirelessLabel = document.getElementById('autoGearWirelessLabel');
var autoGearMotorsSelect = document.getElementById('autoGearMotors');
var autoGearMotorsLabel = document.getElementById('autoGearMotorsLabel');
var autoGearControllersSelect = document.getElementById('autoGearControllers');
var autoGearControllersLabel = document.getElementById('autoGearControllersLabel');
var autoGearDistanceSelect = document.getElementById('autoGearDistance');
var autoGearDistanceLabel = document.getElementById('autoGearDistanceLabel');
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
  monitor: autoGearMonitorLabel,
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
  monitor: autoGearMonitorSelect,
  crewPresent: autoGearCrewPresentSelect,
  crewAbsent: autoGearCrewAbsentSelect,
  wireless: autoGearWirelessSelect,
  motors: autoGearMotorsSelect,
  controllers: autoGearControllersSelect,
  distance: autoGearDistanceSelect
};
var AUTO_GEAR_CONDITION_KEYS = ['always', 'scenarios', 'shootingDays', 'mattebox', 'cameraHandle', 'viewfinderExtension', 'deliveryResolution', 'videoDistribution', 'camera', 'monitor', 'crewPresent', 'crewAbsent', 'wireless', 'motors', 'controllers', 'distance'];
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
  monitor: 'Onboard monitor',
  crewPresent: 'Crew present',
  crewAbsent: 'Crew absent',
  wireless: 'Wireless transmitter',
  motors: 'FIZ motors',
  controllers: 'FIZ controllers',
  distance: 'FIZ distance devices'
};
var autoGearConditionConfigs = AUTO_GEAR_CONDITION_KEYS.reduce(function (acc, key) {
  var section = autoGearConditionSections[key] || null;
  acc[key] = {
    key: key,
    section: section,
    label: autoGearConditionLabels[key] || null,
    select: autoGearConditionSelects[key] || null,
    addShortcut: autoGearConditionAddShortcuts[key] || null,
    removeButton: autoGearConditionRemoveButtons[key] || null
  };
  if (section) {
    section.setAttribute('aria-hidden', section.hidden ? 'true' : 'false');
  }
  return acc;
}, {});
var autoGearConditionRefreshers = {
  always: null,
  scenarios: refreshAutoGearScenarioOptions,
  shootingDays: refreshAutoGearShootingDaysValue,
  mattebox: refreshAutoGearMatteboxOptions,
  cameraHandle: refreshAutoGearCameraHandleOptions,
  viewfinderExtension: refreshAutoGearViewfinderExtensionOptions,
  deliveryResolution: refreshAutoGearDeliveryResolutionOptions,
  videoDistribution: refreshAutoGearVideoDistributionOptions,
  camera: refreshAutoGearCameraOptions,
  monitor: refreshAutoGearMonitorOptions,
  crewPresent: function crewPresent(selected) {
    return refreshAutoGearCrewOptions(autoGearCrewPresentSelect, selected, 'crewPresent');
  },
  crewAbsent: function crewAbsent(selected) {
    return refreshAutoGearCrewOptions(autoGearCrewAbsentSelect, selected, 'crewAbsent');
  },
  wireless: refreshAutoGearWirelessOptions,
  motors: refreshAutoGearMotorsOptions,
  controllers: refreshAutoGearControllersOptions,
  distance: refreshAutoGearDistanceOptions
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
  var _texts$currentLang0, _texts$en186;
  if (!autoGearConditionSelect) return;
  var previousValue = autoGearConditionSelect.value || '';
  var placeholderLabel = ((_texts$currentLang0 = texts[currentLang]) === null || _texts$currentLang0 === void 0 ? void 0 : _texts$currentLang0.autoGearConditionPlaceholder) || ((_texts$en186 = texts.en) === null || _texts$en186 === void 0 ? void 0 : _texts$en186.autoGearConditionPlaceholder) || 'Choose a condition';
  autoGearConditionSelect.innerHTML = '';
  var placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = placeholderLabel;
  autoGearConditionSelect.appendChild(placeholder);
  var available = AUTO_GEAR_CONDITION_KEYS.filter(function (key) {
    return !autoGearActiveConditions.has(key);
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
    return !autoGearActiveConditions.has(key);
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
    } catch (_unused9) {
      autoGearConditionSelect.focus();
    }
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
  var _texts$currentLang1, _texts$en187, _texts$currentLang10, _texts$en188;
  var addLabel = ((_texts$currentLang1 = texts[currentLang]) === null || _texts$currentLang1 === void 0 ? void 0 : _texts$currentLang1.autoGearConditionAddShortcut) || ((_texts$en187 = texts.en) === null || _texts$en187 === void 0 ? void 0 : _texts$en187.autoGearConditionAddShortcut) || 'Add another condition';
  var removeLabel = ((_texts$currentLang10 = texts[currentLang]) === null || _texts$currentLang10 === void 0 ? void 0 : _texts$currentLang10.autoGearConditionRemove) || ((_texts$en188 = texts.en) === null || _texts$en188 === void 0 ? void 0 : _texts$en188.autoGearConditionRemove) || 'Remove this condition';
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
    if (options.focus !== false && config.select) {
      try {
        config.select.focus({
          preventScroll: true
        });
      } catch (_unused0) {
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
    var _autoGearEditorDraft7;
    if (options.initialValues) {
      values = options.initialValues;
    } else if ((_autoGearEditorDraft7 = autoGearEditorDraft) !== null && _autoGearEditorDraft7 !== void 0 && _autoGearEditorDraft7.shootingDays) {
      values = autoGearEditorDraft.shootingDays;
    } else {
      values = null;
    }
  } else {
    var _autoGearEditorDraft8;
    values = Array.isArray(options.initialValues) ? options.initialValues : Array.isArray((_autoGearEditorDraft8 = autoGearEditorDraft) === null || _autoGearEditorDraft8 === void 0 ? void 0 : _autoGearEditorDraft8[key]) ? autoGearEditorDraft[key] : [];
  }
  var refresher = autoGearConditionRefreshers[key];
  if (typeof refresher === 'function') {
    refresher(values);
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
    } catch (_unused1) {
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
  var _ref44 = options || {},
    _ref44$preserveDraft = _ref44.preserveDraft,
    preserveDraft = _ref44$preserveDraft === void 0 ? false : _ref44$preserveDraft;
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
        var _autoGearEditorDraft9;
        var source = preserveDraft ? (_autoGearEditorDraft9 = autoGearEditorDraft) === null || _autoGearEditorDraft9 === void 0 ? void 0 : _autoGearEditorDraft9.shootingDays : null;
        refresher(source || null);
      } else {
        var _autoGearEditorDraft0;
        refresher(preserveDraft ? (_autoGearEditorDraft0 = autoGearEditorDraft) === null || _autoGearEditorDraft0 === void 0 ? void 0 : _autoGearEditorDraft0[key] : []);
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
    var _autoGearEditorDraft11;
    var hasValue = false;
    var values = [];
    if (key === 'always') {
      var _autoGearEditorDraft1;
      values = (_autoGearEditorDraft1 = autoGearEditorDraft) !== null && _autoGearEditorDraft1 !== void 0 && _autoGearEditorDraft1.always && autoGearEditorDraft.always.length ? ['always'] : [];
      hasValue = values.length > 0;
    } else if (key === 'shootingDays') {
      var _autoGearEditorDraft10;
      var condition = (_autoGearEditorDraft10 = autoGearEditorDraft) !== null && _autoGearEditorDraft10 !== void 0 && _autoGearEditorDraft10.shootingDays ? normalizeAutoGearShootingDaysCondition(autoGearEditorDraft.shootingDays) : null;
      if (condition) {
        values = condition;
        hasValue = true;
      }
    } else if (Array.isArray((_autoGearEditorDraft11 = autoGearEditorDraft) === null || _autoGearEditorDraft11 === void 0 ? void 0 : _autoGearEditorDraft11[key])) {
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
  if (autoGearScenarioModeSelect && autoGearEditorDraft) {
    autoGearScenarioModeSelect.value = normalizeAutoGearScenarioLogic(autoGearEditorDraft.scenarioLogic);
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
if (autoGearCameraWeightOperator) {
  var handleCameraWeightOperatorChange = function handleCameraWeightOperatorChange() {
    updateAutoGearCameraWeightDraft();
    renderAutoGearDraftImpact();
  };
  autoGearCameraWeightOperator.addEventListener('input', handleCameraWeightOperatorChange);
  autoGearCameraWeightOperator.addEventListener('change', handleCameraWeightOperatorChange);
}
if (autoGearCameraWeightValueInput) {
  var handleCameraWeightValueInput = function handleCameraWeightValueInput() {
    updateAutoGearCameraWeightDraft();
    renderAutoGearDraftImpact();
  };
  autoGearCameraWeightValueInput.addEventListener('input', handleCameraWeightValueInput);
  autoGearCameraWeightValueInput.addEventListener('change', handleCameraWeightValueInput);
  autoGearCameraWeightValueInput.addEventListener('blur', handleCameraWeightValueInput);
}
var autoGearAddItemsHeading = document.getElementById('autoGearAddItemsHeading');
var autoGearAddItemLabel = document.getElementById('autoGearAddItemLabel');
var autoGearAddCategoryLabel = document.getElementById('autoGearAddCategoryLabel');
var autoGearAddQuantityLabel = document.getElementById('autoGearAddQuantityLabel');
var autoGearAddScreenSizeLabel = document.getElementById('autoGearAddScreenSizeLabel');
var autoGearAddSelectorTypeLabel = document.getElementById('autoGearAddSelectorTypeLabel');
var autoGearAddSelectorDefaultLabel = document.getElementById('autoGearAddSelectorDefaultLabel');
var autoGearAddNotesLabel = document.getElementById('autoGearAddNotesLabel');
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
var autoGearRemoveItemLabel = document.getElementById('autoGearRemoveItemLabel');
var autoGearRemoveCategoryLabel = document.getElementById('autoGearRemoveCategoryLabel');
var autoGearRemoveQuantityLabel = document.getElementById('autoGearRemoveQuantityLabel');
var autoGearRemoveScreenSizeLabel = document.getElementById('autoGearRemoveScreenSizeLabel');
var autoGearRemoveSelectorTypeLabel = document.getElementById('autoGearRemoveSelectorTypeLabel');
var autoGearRemoveSelectorDefaultLabel = document.getElementById('autoGearRemoveSelectorDefaultLabel');
var autoGearRemoveNotesLabel = document.getElementById('autoGearRemoveNotesLabel');
var autoGearRemoveNameInput = document.getElementById('autoGearRemoveName');
var autoGearRemoveCategorySelect = document.getElementById('autoGearRemoveCategory');
var autoGearRemoveQuantityInput = document.getElementById('autoGearRemoveQuantity');
var autoGearRemoveScreenSizeInput = document.getElementById('autoGearRemoveScreenSize');
var autoGearRemoveSelectorTypeSelect = document.getElementById('autoGearRemoveSelectorType');
var autoGearRemoveSelectorDefaultInput = document.getElementById('autoGearRemoveSelectorDefault');
var autoGearRemoveNotesInput = document.getElementById('autoGearRemoveNotes');
var autoGearRemoveItemButton = document.getElementById('autoGearRemoveItemButton');
var autoGearRemoveList = document.getElementById('autoGearRemoveList');
var autoGearSaveRuleButton = document.getElementById('autoGearSaveRule');
var autoGearCancelEditButton = document.getElementById('autoGearCancelEdit');
var autoGearItemCatalog = document.getElementById('autoGearItemCatalog');
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
      } catch (_unused10) {
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
      } catch (_unused11) {
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
[autoGearScenariosSelect, autoGearMatteboxSelect, autoGearCameraHandleSelect, autoGearViewfinderExtensionSelect, autoGearVideoDistributionSelect, autoGearCameraSelect, autoGearMonitorSelect, autoGearCrewPresentSelect, autoGearCrewAbsentSelect, autoGearWirelessSelect, autoGearMotorsSelect, autoGearControllersSelect, autoGearDistanceSelect].forEach(enableAutoGearMultiSelectToggle);
var autoGearAddScreenSizeField = (autoGearAddScreenSizeInput === null || autoGearAddScreenSizeInput === void 0 ? void 0 : autoGearAddScreenSizeInput.closest('.auto-gear-field')) || (autoGearAddScreenSizeLabel === null || autoGearAddScreenSizeLabel === void 0 ? void 0 : autoGearAddScreenSizeLabel.closest('.auto-gear-field')) || null;
var autoGearAddSelectorTypeField = (autoGearAddSelectorTypeSelect === null || autoGearAddSelectorTypeSelect === void 0 ? void 0 : autoGearAddSelectorTypeSelect.closest('.auto-gear-field')) || (autoGearAddSelectorTypeLabel === null || autoGearAddSelectorTypeLabel === void 0 ? void 0 : autoGearAddSelectorTypeLabel.closest('.auto-gear-field')) || null;
var autoGearAddSelectorDefaultField = (autoGearAddSelectorDefaultInput === null || autoGearAddSelectorDefaultInput === void 0 ? void 0 : autoGearAddSelectorDefaultInput.closest('.auto-gear-field')) || (autoGearAddSelectorDefaultLabel === null || autoGearAddSelectorDefaultLabel === void 0 ? void 0 : autoGearAddSelectorDefaultLabel.closest('.auto-gear-field')) || null;
var autoGearRemoveScreenSizeField = (autoGearRemoveScreenSizeInput === null || autoGearRemoveScreenSizeInput === void 0 ? void 0 : autoGearRemoveScreenSizeInput.closest('.auto-gear-field')) || (autoGearRemoveScreenSizeLabel === null || autoGearRemoveScreenSizeLabel === void 0 ? void 0 : autoGearRemoveScreenSizeLabel.closest('.auto-gear-field')) || null;
var autoGearRemoveSelectorTypeField = (autoGearRemoveSelectorTypeSelect === null || autoGearRemoveSelectorTypeSelect === void 0 ? void 0 : autoGearRemoveSelectorTypeSelect.closest('.auto-gear-field')) || (autoGearRemoveSelectorTypeLabel === null || autoGearRemoveSelectorTypeLabel === void 0 ? void 0 : autoGearRemoveSelectorTypeLabel.closest('.auto-gear-field')) || null;
var autoGearRemoveSelectorDefaultField = (autoGearRemoveSelectorDefaultInput === null || autoGearRemoveSelectorDefaultInput === void 0 ? void 0 : autoGearRemoveSelectorDefaultInput.closest('.auto-gear-field')) || (autoGearRemoveSelectorDefaultLabel === null || autoGearRemoveSelectorDefaultLabel === void 0 ? void 0 : autoGearRemoveSelectorDefaultLabel.closest('.auto-gear-field')) || null;
var autoGearAddMonitorFieldGroup = {
  select: autoGearAddCategorySelect,
  screenSizeField: autoGearAddScreenSizeField,
  screenSizeInput: autoGearAddScreenSizeInput,
  selectorTypeField: autoGearAddSelectorTypeField,
  selectorTypeSelect: autoGearAddSelectorTypeSelect,
  selectorDefaultField: autoGearAddSelectorDefaultField,
  selectorDefaultInput: autoGearAddSelectorDefaultInput
};
var autoGearRemoveMonitorFieldGroup = {
  select: autoGearRemoveCategorySelect,
  screenSizeField: autoGearRemoveScreenSizeField,
  screenSizeInput: autoGearRemoveScreenSizeInput,
  selectorTypeField: autoGearRemoveSelectorTypeField,
  selectorTypeSelect: autoGearRemoveSelectorTypeSelect,
  selectorDefaultField: autoGearRemoveSelectorDefaultField,
  selectorDefaultInput: autoGearRemoveSelectorDefaultInput
};
var autoGearMonitorDefaultGroups = [{
  selectorTypeSelect: autoGearAddSelectorTypeSelect,
  selectorDefaultInput: autoGearAddSelectorDefaultInput
}, {
  selectorTypeSelect: autoGearRemoveSelectorTypeSelect,
  selectorDefaultInput: autoGearRemoveSelectorDefaultInput
}].filter(function (group) {
  return group.selectorDefaultInput;
});
function syncAutoGearMonitorFieldVisibility() {
  updateAutoGearMonitorFieldGroup(autoGearAddMonitorFieldGroup);
  updateAutoGearMonitorFieldGroup(autoGearRemoveMonitorFieldGroup);
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
var autoGearShowBackupsCheckbox = document.getElementById('autoGearShowBackups');
var autoGearShowBackupsLabel = document.getElementById('autoGearShowBackupsLabel');
var autoGearBackupsHiddenNotice = document.getElementById('autoGearBackupsHidden');
var dataHeading = document.getElementById("dataHeading");
var storageSummaryIntro = document.getElementById("storageSummaryIntro");
var storageSummaryList = document.getElementById("storageSummaryList");
var storageSummaryEmpty = document.getElementById("storageSummaryEmpty");
var storageSummaryFootnote = document.getElementById("storageSummaryFootnote");
function computeAutoGearMultiSelectSize(optionCount) {
  var _ref45 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    fallback = _ref45.fallback,
    _ref45$minRows = _ref45.minRows,
    minRows = _ref45$minRows === void 0 ? AUTO_GEAR_MULTI_SELECT_MIN_ROWS : _ref45$minRows,
    _ref45$maxRows = _ref45.maxRows,
    maxRows = _ref45$maxRows === void 0 ? AUTO_GEAR_MULTI_SELECT_MAX_ROWS : _ref45$maxRows;
  var effectiveFallback = Number.isFinite(fallback) && fallback >= minRows ? fallback : minRows;
  if (!Number.isFinite(optionCount) || optionCount <= 0) {
    return effectiveFallback;
  }
  var boundedMax = Number.isFinite(maxRows) && maxRows >= minRows ? maxRows : minRows;
  return Math.max(minRows, Math.min(optionCount, boundedMax));
}
var autoGearEditorDraft = null;
var autoGearEditorActiveItem = null;
var autoGearSearchQuery = '';
var autoGearScenarioFilter = 'all';
function setAutoGearSearchQuery(value) {
  var nextValue = typeof value === 'string' ? value : '';
  if (autoGearSearchQuery === nextValue) return;
  autoGearSearchQuery = nextValue;
  renderAutoGearRulesList();
}
function setAutoGearScenarioFilter(value) {
  var nextValue = typeof value === 'string' && value !== 'all' ? value : 'all';
  if (autoGearScenarioFilter === nextValue) return;
  autoGearScenarioFilter = nextValue;
  renderAutoGearRulesList();
}
function clearAutoGearFilters() {
  autoGearSearchQuery = '';
  autoGearScenarioFilter = 'all';
  if (autoGearSearchInput && autoGearSearchInput.value !== '') {
    autoGearSearchInput.value = '';
  }
  if (autoGearFilterScenarioSelect && autoGearFilterScenarioSelect.value !== 'all') {
    autoGearFilterScenarioSelect.value = 'all';
  }
  renderAutoGearRulesList();
  if (autoGearSearchInput && typeof autoGearSearchInput.focus === 'function') {
    try {
      autoGearSearchInput.focus({
        preventScroll: true
      });
    } catch (_unused12) {
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
    var _texts$currentLang11, _texts$en189;
    haystack.push('always');
    var alwaysText = ((_texts$currentLang11 = texts[currentLang]) === null || _texts$currentLang11 === void 0 ? void 0 : _texts$currentLang11.autoGearAlwaysMeta) || ((_texts$en189 = texts.en) === null || _texts$en189 === void 0 ? void 0 : _texts$en189.autoGearAlwaysMeta) || 'Always active';
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
    var _texts$currentLang12, _texts$en190, _texts$currentLang13, _texts$en191, _texts$currentLang14, _texts$en192, _texts$currentLang15, _texts$en193;
    var shootingLabel = ((_texts$currentLang12 = texts[currentLang]) === null || _texts$currentLang12 === void 0 ? void 0 : _texts$currentLang12.autoGearShootingDaysLabel) || ((_texts$en190 = texts.en) === null || _texts$en190 === void 0 ? void 0 : _texts$en190.autoGearShootingDaysLabel) || 'Shooting days condition';
    var minimumLabel = ((_texts$currentLang13 = texts[currentLang]) === null || _texts$currentLang13 === void 0 ? void 0 : _texts$currentLang13.autoGearShootingDaysModeMinimum) || ((_texts$en191 = texts.en) === null || _texts$en191 === void 0 ? void 0 : _texts$en191.autoGearShootingDaysModeMinimum) || 'Minimum';
    var maximumLabel = ((_texts$currentLang14 = texts[currentLang]) === null || _texts$currentLang14 === void 0 ? void 0 : _texts$currentLang14.autoGearShootingDaysModeMaximum) || ((_texts$en192 = texts.en) === null || _texts$en192 === void 0 ? void 0 : _texts$en192.autoGearShootingDaysModeMaximum) || 'Maximum';
    var everyLabel = ((_texts$currentLang15 = texts[currentLang]) === null || _texts$currentLang15 === void 0 ? void 0 : _texts$currentLang15.autoGearShootingDaysModeEvery) || ((_texts$en193 = texts.en) === null || _texts$en193 === void 0 ? void 0 : _texts$en193.autoGearShootingDaysModeEvery) || 'Every';
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
      haystack.push(formatAutoGearItemSummary(item));
    });
  };
  collectItems(rule === null || rule === void 0 ? void 0 : rule.add);
  collectItems(rule === null || rule === void 0 ? void 0 : rule.remove);
  return haystack.some(function (value) {
    return typeof value === 'string' && value.toLowerCase().includes(normalizedQuery);
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
  return Array.from(options.entries()).map(function (_ref46) {
    var _ref47 = _slicedToArray(_ref46, 2),
      value = _ref47[0],
      label = _ref47[1];
    return {
      value: value,
      label: label
    };
  }).sort(function (a, b) {
    return localeSort(a.label, b.label);
  });
}
function refreshAutoGearScenarioFilterOptions(rules) {
  var _texts$currentLang16, _texts$en194;
  if (!autoGearFilterScenarioSelect) return autoGearScenarioFilter;
  var options = collectAutoGearScenarioFilterOptions(rules);
  var anyLabel = ((_texts$currentLang16 = texts[currentLang]) === null || _texts$currentLang16 === void 0 ? void 0 : _texts$currentLang16.autoGearFilterScenarioAny) || ((_texts$en194 = texts.en) === null || _texts$en194 === void 0 ? void 0 : _texts$en194.autoGearFilterScenarioAny) || 'All scenarios';
  autoGearFilterScenarioSelect.innerHTML = '';
  var anyOption = document.createElement('option');
  anyOption.value = 'all';
  anyOption.textContent = anyLabel;
  autoGearFilterScenarioSelect.appendChild(anyOption);
  options.forEach(function (_ref48) {
    var value = _ref48.value,
      label = _ref48.label;
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
    notes: ''
  };
}
function createAutoGearDraft(rule) {
  if (rule) {
    return {
      id: rule.id,
      label: rule.label || '',
      always: rule.always ? ['always'] : [],
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
      shootingDays: normalizeAutoGearShootingDaysCondition(rule.shootingDays),
      add: Array.isArray(rule.add) ? rule.add.map(cloneAutoGearDraftItem) : [],
      remove: Array.isArray(rule.remove) ? rule.remove.map(cloneAutoGearDraftItem) : []
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
    monitor: [],
    crewPresent: [],
    crewAbsent: [],
    wireless: [],
    motors: [],
    controllers: [],
    distance: [],
    shootingDays: null,
    add: [],
    remove: []
  };
}
function refreshAutoGearShootingDaysValue(selected) {
  if (!autoGearShootingDaysInput) return;
  var condition = function (_autoGearEditorDraft12) {
    if (selected && _typeof(selected) === 'object' && !Array.isArray(selected)) {
      return normalizeAutoGearShootingDaysCondition(selected);
    }
    if (Array.isArray(selected) && selected.length) {
      return normalizeAutoGearShootingDaysCondition({
        mode: 'minimum',
        value: selected[0]
      });
    }
    if ((_autoGearEditorDraft12 = autoGearEditorDraft) !== null && _autoGearEditorDraft12 !== void 0 && _autoGearEditorDraft12.shootingDays) {
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
  var _autoGearEditorDraft13;
  if (!autoGearScenariosSelect) return;
  var candidateValues = Array.isArray(selected) ? selected : typeof selected === 'string' && selected ? [selected] : Array.isArray((_autoGearEditorDraft13 = autoGearEditorDraft) === null || _autoGearEditorDraft13 === void 0 ? void 0 : _autoGearEditorDraft13.scenarios) ? autoGearEditorDraft.scenarios : [];
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
    var _texts$currentLang17, _texts$en195;
    var placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = ((_texts$currentLang17 = texts[currentLang]) === null || _texts$currentLang17 === void 0 ? void 0 : _texts$currentLang17.autoGearScenarioPlaceholder) || ((_texts$en195 = texts.en) === null || _texts$en195 === void 0 ? void 0 : _texts$en195.autoGearScenarioPlaceholder) || 'Select scenarios';
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
  var values = Array.isArray(selectedValues) ? selectedValues.filter(function (value) {
    return typeof value === 'string' && value.trim();
  }) : [];
  var uniqueValues = Array.from(new Set(values));
  var desiredMode = autoGearEditorDraft ? normalizeAutoGearScenarioLogic(autoGearEditorDraft.scenarioLogic) : normalizeAutoGearScenarioLogic(autoGearScenarioModeSelect === null || autoGearScenarioModeSelect === void 0 ? void 0 : autoGearScenarioModeSelect.value);
  if (autoGearScenarioModeSelect) {
    var _texts$currentLang18, _texts$en196, _texts$currentLang19, _texts$en197, _texts$currentLang20, _texts$en198;
    var modeLabels = {
      all: ((_texts$currentLang18 = texts[currentLang]) === null || _texts$currentLang18 === void 0 ? void 0 : _texts$currentLang18.autoGearScenarioModeAll) || ((_texts$en196 = texts.en) === null || _texts$en196 === void 0 ? void 0 : _texts$en196.autoGearScenarioModeAll) || 'Require every selected scenario',
      any: ((_texts$currentLang19 = texts[currentLang]) === null || _texts$currentLang19 === void 0 ? void 0 : _texts$currentLang19.autoGearScenarioModeAny) || ((_texts$en197 = texts.en) === null || _texts$en197 === void 0 ? void 0 : _texts$en197.autoGearScenarioModeAny) || 'Match any selected scenario',
      multiplier: ((_texts$currentLang20 = texts[currentLang]) === null || _texts$currentLang20 === void 0 ? void 0 : _texts$currentLang20.autoGearScenarioModeMultiplier) || ((_texts$en198 = texts.en) === null || _texts$en198 === void 0 ? void 0 : _texts$en198.autoGearScenarioModeMultiplier) || 'Multiply when combined'
    };
    Array.from(autoGearScenarioModeSelect.options || []).forEach(function (option) {
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
    autoGearScenarioModeSelect.value = nextMode;
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
    var _texts$currentLang21, _texts$en199;
    var placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = ((_texts$currentLang21 = texts[currentLang]) === null || _texts$currentLang21 === void 0 ? void 0 : _texts$currentLang21.autoGearScenarioBasePlaceholder) || ((_texts$en199 = texts.en) === null || _texts$en199 === void 0 ? void 0 : _texts$en199.autoGearScenarioBasePlaceholder) || 'Select a base scenario';
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
  var _autoGearEditorDraft14;
  if (!autoGearMatteboxSelect) return;
  var candidateValues = Array.isArray(selected) ? selected : typeof selected === 'string' && selected ? [selected] : Array.isArray((_autoGearEditorDraft14 = autoGearEditorDraft) === null || _autoGearEditorDraft14 === void 0 ? void 0 : _autoGearEditorDraft14.mattebox) ? autoGearEditorDraft.mattebox : [];
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
    var _texts$currentLang22, _texts$en200;
    var placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = ((_texts$currentLang22 = texts[currentLang]) === null || _texts$currentLang22 === void 0 ? void 0 : _texts$currentLang22.autoGearMatteboxPlaceholder) || ((_texts$en200 = texts.en) === null || _texts$en200 === void 0 ? void 0 : _texts$en200.autoGearMatteboxPlaceholder) || 'Select mattebox options';
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
  var _autoGearEditorDraft15;
  if (!autoGearCameraHandleSelect) return;
  var candidateValues = Array.isArray(selected) ? selected : typeof selected === 'string' && selected ? [selected] : Array.isArray((_autoGearEditorDraft15 = autoGearEditorDraft) === null || _autoGearEditorDraft15 === void 0 ? void 0 : _autoGearEditorDraft15.cameraHandle) ? autoGearEditorDraft.cameraHandle : [];
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
    var _texts$currentLang23, _texts$en201;
    var placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = ((_texts$currentLang23 = texts[currentLang]) === null || _texts$currentLang23 === void 0 ? void 0 : _texts$currentLang23.autoGearCameraHandlePlaceholder) || ((_texts$en201 = texts.en) === null || _texts$en201 === void 0 ? void 0 : _texts$en201.autoGearCameraHandlePlaceholder) || 'Select camera handles';
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
    var _texts$currentLang24, _texts$en202;
    return ((_texts$currentLang24 = texts[currentLang]) === null || _texts$currentLang24 === void 0 ? void 0 : _texts$currentLang24.viewfinderExtensionNone) || ((_texts$en202 = texts.en) === null || _texts$en202 === void 0 ? void 0 : _texts$en202.viewfinderExtensionNone) || 'No';
  }
  return value;
}
function getVideoDistributionFallbackLabel(value) {
  if (value === '__none__') {
    var _texts$currentLang25, _texts$en203;
    return ((_texts$currentLang25 = texts[currentLang]) === null || _texts$currentLang25 === void 0 ? void 0 : _texts$currentLang25.autoGearVideoDistributionNone) || ((_texts$en203 = texts.en) === null || _texts$en203 === void 0 ? void 0 : _texts$en203.autoGearVideoDistributionNone) || 'No video distribution selected';
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
  var _autoGearEditorDraft16;
  if (!autoGearViewfinderExtensionSelect) return;
  var candidateValues = Array.isArray(selected) ? selected : typeof selected === 'string' && selected ? [selected] : Array.isArray((_autoGearEditorDraft16 = autoGearEditorDraft) === null || _autoGearEditorDraft16 === void 0 ? void 0 : _autoGearEditorDraft16.viewfinderExtension) ? autoGearEditorDraft.viewfinderExtension : [];
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
    var _texts$currentLang26, _texts$en204;
    var placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = ((_texts$currentLang26 = texts[currentLang]) === null || _texts$currentLang26 === void 0 ? void 0 : _texts$currentLang26.autoGearViewfinderExtensionPlaceholder) || ((_texts$en204 = texts.en) === null || _texts$en204 === void 0 ? void 0 : _texts$en204.autoGearViewfinderExtensionPlaceholder) || 'Select viewfinder extension options';
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
    var _texts$currentLang27, _texts$en205;
    var placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = ((_texts$currentLang27 = texts[currentLang]) === null || _texts$currentLang27 === void 0 ? void 0 : _texts$currentLang27.autoGearDeliveryResolutionPlaceholder) || ((_texts$en205 = texts.en) === null || _texts$en205 === void 0 ? void 0 : _texts$en205.autoGearDeliveryResolutionPlaceholder) || 'Select delivery resolutions';
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
  var _autoGearEditorDraft17;
  if (!autoGearVideoDistributionSelect) return;
  var candidateValues = Array.isArray(selected) ? selected : typeof selected === 'string' && selected ? [selected] : Array.isArray((_autoGearEditorDraft17 = autoGearEditorDraft) === null || _autoGearEditorDraft17 === void 0 ? void 0 : _autoGearEditorDraft17.videoDistribution) ? autoGearEditorDraft.videoDistribution : [];
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
    var _texts$currentLang28, _texts$en206;
    var placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = ((_texts$currentLang28 = texts[currentLang]) === null || _texts$currentLang28 === void 0 ? void 0 : _texts$currentLang28.autoGearVideoDistributionPlaceholder) || ((_texts$en206 = texts.en) === null || _texts$en206 === void 0 ? void 0 : _texts$en206.autoGearVideoDistributionPlaceholder) || 'Select video distribution options';
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
  var _autoGearEditorDraft18;
  var candidateValues = Array.isArray(selected) ? selected : typeof selected === 'string' && selected ? [selected] : Array.isArray((_autoGearEditorDraft18 = autoGearEditorDraft) === null || _autoGearEditorDraft18 === void 0 ? void 0 : _autoGearEditorDraft18[key]) ? autoGearEditorDraft[key] : [];
  return Array.from(new Set(candidateValues.filter(function (value) {
    return typeof value === 'string';
  }).map(function (value) {
    return value.trim();
  }).filter(Boolean)));
}
function getCrewRoleEntries() {
  var _texts$en207;
  var langTexts = texts[currentLang] || texts.en || {};
  var crewRoleMap = langTexts.crewRoles || ((_texts$en207 = texts.en) === null || _texts$en207 === void 0 ? void 0 : _texts$en207.crewRoles) || {};
  var seen = new Set();
  var entries = [];
  Object.entries(crewRoleMap).forEach(function (_ref49) {
    var _ref50 = _slicedToArray(_ref49, 2),
      value = _ref50[0],
      label = _ref50[1];
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
  var _texts$en208;
  if (typeof value !== 'string') return '';
  var trimmed = value.trim();
  if (!trimmed) return '';
  var langTexts = texts[currentLang] || texts.en || {};
  var crewRoleMap = langTexts.crewRoles || ((_texts$en208 = texts.en) === null || _texts$en208 === void 0 ? void 0 : _texts$en208.crewRoles) || {};
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
  autoGearMotorsSelect.innerHTML = '';
  autoGearMotorsSelect.multiple = true;
  var seen = new Set();
  var addOption = function addOption(value) {
    if (!value || seen.has(value)) return;
    var option = document.createElement('option');
    option.value = value;
    option.textContent = value;
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
  var _texts$currentLang29, _texts$en209;
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
  customOpt.textContent = ((_texts$currentLang29 = texts[currentLang]) === null || _texts$currentLang29 === void 0 ? void 0 : _texts$currentLang29.autoGearCustomCategory) || ((_texts$en209 = texts.en) === null || _texts$en209 === void 0 ? void 0 : _texts$en209.autoGearCustomCategory) || 'Custom Additions';
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
  var _texts$en211;
  var langTexts = texts[currentLang] || texts.en || {};
  if (count === 1) {
    var _texts$en210;
    var _template = langTexts[singularKey] || ((_texts$en210 = texts.en) === null || _texts$en210 === void 0 ? void 0 : _texts$en210[singularKey]);
    return _template ? _template.replace('%s', '1') : '1';
  }
  var template = langTexts[pluralKey] || ((_texts$en211 = texts.en) === null || _texts$en211 === void 0 ? void 0 : _texts$en211[pluralKey]);
  return template ? template.replace('%s', String(count)) : String(count);
}
function formatAutoGearItemSummary(item) {
  var _texts$en212;
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
  var categoryLabel = category ? category : langTexts.autoGearCustomCategory || ((_texts$en212 = texts.en) === null || _texts$en212 === void 0 ? void 0 : _texts$en212.autoGearCustomCategory) || '';
  var summary;
  if (includeCategory && categoryLabel) {
    var _texts$en213;
    var withCategoryTemplate = langTexts.autoGearItemSummaryWithCategory || ((_texts$en213 = texts.en) === null || _texts$en213 === void 0 ? void 0 : _texts$en213.autoGearItemSummaryWithCategory) || '%s × %s (%s)';
    summary = formatWithPlaceholders(withCategoryTemplate, quantityText, nameText, categoryLabel);
  } else {
    var _texts$en214;
    var baseTemplate = langTexts.autoGearItemSummary || ((_texts$en214 = texts.en) === null || _texts$en214 === void 0 ? void 0 : _texts$en214.autoGearItemSummary) || '%s × %s';
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
      var _texts$en215, _texts$en216;
      var selectorTemplate = formattedDefault ? langTexts.autoGearSelectorSummaryWithDefault || ((_texts$en215 = texts.en) === null || _texts$en215 === void 0 ? void 0 : _texts$en215.autoGearSelectorSummaryWithDefault) || '%s selector (default: %s)' : langTexts.autoGearSelectorSummary || ((_texts$en216 = texts.en) === null || _texts$en216 === void 0 ? void 0 : _texts$en216.autoGearSelectorSummary) || '%s selector';
      var selectorText = formattedDefault ? formatWithPlaceholders(selectorTemplate, selectorLabel, formattedDefault) : formatWithPlaceholders(selectorTemplate, selectorLabel);
      details.push(selectorText);
    } else if (formattedDefault) {
      var _texts$en217;
      var defaultTemplate = langTexts.autoGearSelectorSummaryNoSelector || ((_texts$en217 = texts.en) === null || _texts$en217 === void 0 ? void 0 : _texts$en217.autoGearSelectorSummaryNoSelector) || '%s default: %s';
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
  for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key5 = 1; _key5 < _len; _key5++) {
    values[_key5 - 1] = arguments[_key5];
  }
  if (typeof template !== 'string') {
    return values.join(' ');
  }
  return values.reduce(function (acc, value) {
    return acc.replace('%s', value);
  }, template);
}
function formatAutoGearRuleCount(count) {
  var _texts$en219;
  var langTexts = texts[currentLang] || texts.en || {};
  if (count === 1) {
    var _texts$en218;
    var _template2 = langTexts.autoGearRulesCountOne || ((_texts$en218 = texts.en) === null || _texts$en218 === void 0 ? void 0 : _texts$en218.autoGearRulesCountOne);
    return _template2 ? _template2.replace('%s', '1') : '1';
  }
  var template = langTexts.autoGearRulesCountOther || ((_texts$en219 = texts.en) === null || _texts$en219 === void 0 ? void 0 : _texts$en219.autoGearRulesCountOther);
  return template ? template.replace('%s', String(count)) : String(count);
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
  var _texts$en220, _texts$en221;
  if (!backup) return '';
  var langTexts = texts[currentLang] || texts.en || {};
  var timeLabel = formatAutoGearBackupTime(backup.createdAt);
  var ruleCount = Array.isArray(backup.rules) ? backup.rules.length : 0;
  var rulesLabel = ruleCount === 0 ? langTexts.autoGearBackupClearsRules || ((_texts$en220 = texts.en) === null || _texts$en220 === void 0 ? void 0 : _texts$en220.autoGearBackupClearsRules) || 'Clears all rules' : formatAutoGearRuleCount(ruleCount);
  var template = langTexts.autoGearBackupMeta || ((_texts$en221 = texts.en) === null || _texts$en221 === void 0 ? void 0 : _texts$en221.autoGearBackupMeta);
  if (template && template.includes('%s')) {
    return formatWithPlaceholders(template, timeLabel, rulesLabel);
  }
  return "".concat(timeLabel, " \xB7 ").concat(rulesLabel);
}
function getAutoGearBackupSelectPlaceholder() {
  var _texts$currentLang30, _texts$en222;
  return ((_texts$currentLang30 = texts[currentLang]) === null || _texts$currentLang30 === void 0 ? void 0 : _texts$currentLang30.autoGearBackupSelectPlaceholder) || ((_texts$en222 = texts.en) === null || _texts$en222 === void 0 ? void 0 : _texts$en222.autoGearBackupSelectPlaceholder) || 'Select a backup to restore';
}
function updateAutoGearBackupRestoreButtonState() {
  if (!autoGearBackupRestoreButton) return;
  var hasSelection = Boolean(autoGearBackupSelect && autoGearBackupSelect.value);
  autoGearBackupRestoreButton.disabled = !hasSelection;
}
function getAutoGearPresetById(presetId) {
  if (!presetId) return null;
  return autoGearPresets.find(function (preset) {
    return preset.id === presetId;
  }) || null;
}
function getAutoGearAutoPresetLabel() {
  var _texts$en223;
  var langTexts = texts[currentLang] || texts.en || {};
  return langTexts.autoGearAutoPresetLabel || ((_texts$en223 = texts.en) === null || _texts$en223 === void 0 ? void 0 : _texts$en223.autoGearAutoPresetLabel) || 'Autosaved rules';
}
function setAutoGearAutoPresetId(presetId) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var normalized = typeof presetId === 'string' ? presetId : '';
  var persist = options.persist !== false;
  var skipRender = options.skipRender === true;
  if (autoGearAutoPresetId === normalized) {
    if (!skipRender) renderAutoGearPresetsControls();
    return;
  }
  autoGearAutoPresetId = normalized;
  if (persist) {
    persistAutoGearAutoPresetId(autoGearAutoPresetId);
  }
  if (!skipRender) {
    renderAutoGearPresetsControls();
  }
}
function reconcileAutoGearAutoPresetState() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (!autoGearAutoPresetId) {
    if (options.persist !== false) {
      persistAutoGearAutoPresetId('');
    }
    return false;
  }
  var managedExists = autoGearPresets.some(function (preset) {
    return preset.id === autoGearAutoPresetId;
  });
  var otherExists = autoGearPresets.some(function (preset) {
    return preset.id !== autoGearAutoPresetId;
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
  if (!autoGearAutoPresetId) {
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
    return preset.id === autoGearAutoPresetId;
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
function alignActiveAutoGearPreset() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var skipRender = options.skipRender === true;
  var fingerprint = createAutoGearRulesFingerprint(baseAutoGearRules);
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
  var _texts$currentLang31, _texts$en224;
  if (!autoGearPresetSelect) return;
  var placeholderText = ((_texts$currentLang31 = texts[currentLang]) === null || _texts$currentLang31 === void 0 ? void 0 : _texts$currentLang31.autoGearPresetPlaceholder) || ((_texts$en224 = texts.en) === null || _texts$en224 === void 0 ? void 0 : _texts$en224.autoGearPresetPlaceholder) || 'Custom rules';
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
  var _texts$currentLang32, _texts$en225, _texts$currentLang33, _texts$en226;
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
  var confirmTemplate = ((_texts$currentLang32 = texts[currentLang]) === null || _texts$currentLang32 === void 0 ? void 0 : _texts$currentLang32.autoGearPresetApplyConfirm) || ((_texts$en225 = texts.en) === null || _texts$en225 === void 0 ? void 0 : _texts$en225.autoGearPresetApplyConfirm) || "Replace your automatic gear rules with the preset \"".concat(preset.label, "\"?");
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
  var appliedMessage = ((_texts$currentLang33 = texts[currentLang]) === null || _texts$currentLang33 === void 0 ? void 0 : _texts$currentLang33.autoGearPresetApplied) || ((_texts$en226 = texts.en) === null || _texts$en226 === void 0 ? void 0 : _texts$en226.autoGearPresetApplied) || 'Preset applied.';
  showNotification('success', appliedMessage);
}
function handleAutoGearSavePreset() {
  var _texts$currentLang34, _texts$en227, _texts$currentLang39, _texts$en232;
  var rules = getAutoGearRules();
  var activePreset = getAutoGearPresetById(activeAutoGearPresetId);
  var promptTemplate = ((_texts$currentLang34 = texts[currentLang]) === null || _texts$currentLang34 === void 0 ? void 0 : _texts$currentLang34.autoGearPresetNamePrompt) || ((_texts$en227 = texts.en) === null || _texts$en227 === void 0 ? void 0 : _texts$en227.autoGearPresetNamePrompt) || 'Name this preset';
  var defaultName = activePreset ? activePreset.label : '';
  if (typeof window === 'undefined' || typeof window.prompt !== 'function') {
    var _texts$currentLang35, _texts$en228;
    var requiredMessage = ((_texts$currentLang35 = texts[currentLang]) === null || _texts$currentLang35 === void 0 ? void 0 : _texts$currentLang35.autoGearPresetNameRequired) || ((_texts$en228 = texts.en) === null || _texts$en228 === void 0 ? void 0 : _texts$en228.autoGearPresetNameRequired) || 'Enter a preset name to continue.';
    if (typeof window !== 'undefined' && typeof window.alert === 'function') {
      window.alert(requiredMessage);
    }
    return;
  }
  var response = window.prompt(promptTemplate, defaultName);
  if (response === null) return;
  var trimmed = response.trim();
  if (!trimmed) {
    var _texts$currentLang36, _texts$en229;
    var _requiredMessage = ((_texts$currentLang36 = texts[currentLang]) === null || _texts$currentLang36 === void 0 ? void 0 : _texts$currentLang36.autoGearPresetNameRequired) || ((_texts$en229 = texts.en) === null || _texts$en229 === void 0 ? void 0 : _texts$en229.autoGearPresetNameRequired) || 'Enter a preset name to continue.';
    if (typeof window.alert === 'function') {
      window.alert(_requiredMessage);
    }
    return;
  }
  var normalizedName = trimmed;
  var existingByName = autoGearPresets.find(function (preset) {
    return preset.label.toLowerCase() === normalizedName.toLowerCase();
  });
  var targetId = (activePreset === null || activePreset === void 0 ? void 0 : activePreset.id) || '';
  if (existingByName && existingByName.id !== targetId) {
    var _texts$currentLang37, _texts$en230;
    var overwriteTemplate = ((_texts$currentLang37 = texts[currentLang]) === null || _texts$currentLang37 === void 0 ? void 0 : _texts$currentLang37.autoGearPresetOverwriteConfirm) || ((_texts$en230 = texts.en) === null || _texts$en230 === void 0 ? void 0 : _texts$en230.autoGearPresetOverwriteConfirm) || "Replace the existing preset \"".concat(normalizedName, "\"?");
    var overwriteMessage = overwriteTemplate.includes('%s') ? formatWithPlaceholders(overwriteTemplate, normalizedName) : overwriteTemplate;
    var overwriteConfirmed = true;
    if (typeof window.confirm === 'function') {
      overwriteConfirmed = window.confirm(overwriteMessage);
    }
    if (!overwriteConfirmed) {
      return;
    }
    targetId = existingByName.id;
  }
  var presetId = targetId || generateAutoGearId('preset');
  var normalizedPreset = normalizeAutoGearPreset({
    id: presetId,
    label: normalizedName,
    rules: rules
  });
  if (!normalizedPreset) {
    var _texts$currentLang38, _texts$en231;
    var _requiredMessage2 = ((_texts$currentLang38 = texts[currentLang]) === null || _texts$currentLang38 === void 0 ? void 0 : _texts$currentLang38.autoGearPresetNameRequired) || ((_texts$en231 = texts.en) === null || _texts$en231 === void 0 ? void 0 : _texts$en231.autoGearPresetNameRequired) || 'Enter a preset name to continue.';
    if (typeof window.alert === 'function') {
      window.alert(_requiredMessage2);
    }
    return;
  }
  if (autoGearAutoPresetId) {
    setAutoGearAutoPresetId('', {
      persist: true,
      skipRender: true
    });
  }
  var existingIndex = autoGearPresets.findIndex(function (preset) {
    return preset.id === normalizedPreset.id;
  });
  if (existingIndex >= 0) {
    autoGearPresets[existingIndex] = normalizedPreset;
  } else {
    autoGearPresets.push(normalizedPreset);
  }
  autoGearPresets = sortAutoGearPresets(autoGearPresets.slice());
  persistAutoGearPresets(autoGearPresets);
  setActiveAutoGearPresetId(normalizedPreset.id, {
    persist: true,
    skipRender: true
  });
  renderAutoGearPresetsControls();
  var savedMessage = ((_texts$currentLang39 = texts[currentLang]) === null || _texts$currentLang39 === void 0 ? void 0 : _texts$currentLang39.autoGearPresetSaved) || ((_texts$en232 = texts.en) === null || _texts$en232 === void 0 ? void 0 : _texts$en232.autoGearPresetSaved) || 'Automatic gear preset saved.';
  showNotification('success', savedMessage);
}
function handleAutoGearDeletePreset() {
  var _texts$currentLang40, _texts$en233, _texts$currentLang41, _texts$en234;
  if (!activeAutoGearPresetId) return;
  var preset = getAutoGearPresetById(activeAutoGearPresetId);
  var label = preset ? preset.label : '';
  var confirmTemplate = ((_texts$currentLang40 = texts[currentLang]) === null || _texts$currentLang40 === void 0 ? void 0 : _texts$currentLang40.autoGearPresetDeleteConfirm) || ((_texts$en233 = texts.en) === null || _texts$en233 === void 0 ? void 0 : _texts$en233.autoGearPresetDeleteConfirm) || 'Delete this preset?';
  var confirmMessage = label && confirmTemplate.includes('%s') ? formatWithPlaceholders(confirmTemplate, label) : confirmTemplate;
  var confirmed = true;
  if (typeof window !== 'undefined' && typeof window.confirm === 'function') {
    confirmed = window.confirm(confirmMessage);
  }
  if (!confirmed) return;
  if (autoGearAutoPresetId && autoGearAutoPresetId === activeAutoGearPresetId) {
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
  var deletedMessage = ((_texts$currentLang41 = texts[currentLang]) === null || _texts$currentLang41 === void 0 ? void 0 : _texts$currentLang41.autoGearPresetDeleted) || ((_texts$en234 = texts.en) === null || _texts$en234 === void 0 ? void 0 : _texts$en234.autoGearPresetDeleted) || 'Automatic gear preset deleted.';
  showNotification('success', deletedMessage);
}
function handleAutoGearShowBackupsToggle() {
  if (!autoGearShowBackupsCheckbox) return;
  setAutoGearBackupsVisible(autoGearShowBackupsCheckbox.checked);
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
}
function renderAutoGearRulesList() {
  if (!autoGearRulesList) return;
  if (autoGearEditor && !autoGearEditor.hidden && !autoGearEditorDraft) {
    closeAutoGearEditor();
  }
  autoGearRulesList.innerHTML = '';
  var rules = getAutoGearRules();
  var scenarioFilter = refreshAutoGearScenarioFilterOptions(rules);
  var rawSearch = typeof autoGearSearchQuery === 'string' ? autoGearSearchQuery : '';
  var normalizedQuery = rawSearch.trim().toLowerCase();
  var filteredRules = rules.filter(function (rule) {
    return autoGearRuleMatchesScenario(rule, scenarioFilter) && autoGearRuleMatchesSearch(rule, normalizedQuery);
  });
  var hasFilters = Boolean(normalizedQuery) || scenarioFilter !== 'all';
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
  if (!filteredRules.length) {
    var empty = document.createElement('p');
    empty.className = 'auto-gear-empty';
    if (!rules.length && !hasFilters) {
      var _texts$currentLang42, _texts$en235;
      empty.textContent = ((_texts$currentLang42 = texts[currentLang]) === null || _texts$currentLang42 === void 0 ? void 0 : _texts$currentLang42.autoGearNoRules) || ((_texts$en235 = texts.en) === null || _texts$en235 === void 0 ? void 0 : _texts$en235.autoGearNoRules) || 'No custom rules yet.';
    } else {
      var _texts$currentLang43, _texts$en236;
      empty.textContent = ((_texts$currentLang43 = texts[currentLang]) === null || _texts$currentLang43 === void 0 ? void 0 : _texts$currentLang43.autoGearNoMatches) || ((_texts$en236 = texts.en) === null || _texts$en236 === void 0 ? void 0 : _texts$en236.autoGearNoMatches) || 'No rules match your filters.';
    }
    autoGearRulesList.appendChild(empty);
    return;
  }
  filteredRules.forEach(function (rule) {
    var _texts$currentLang64, _texts$en257, _texts$currentLang65, _texts$en258, _texts$currentLang66, _texts$en259;
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
    var monitorList = Array.isArray(rule.monitor) ? rule.monitor : [];
    var crewPresentList = Array.isArray(rule.crewPresent) ? rule.crewPresent : [];
    var crewAbsentList = Array.isArray(rule.crewAbsent) ? rule.crewAbsent : [];
    var wirelessList = Array.isArray(rule.wireless) ? rule.wireless : [];
    var motorsList = Array.isArray(rule.motors) ? rule.motors : [];
    var controllersList = Array.isArray(rule.controllers) ? rule.controllers : [];
    var distanceList = Array.isArray(rule.distance) ? rule.distance : [];
    var shootingCondition = normalizeAutoGearShootingDaysCondition(rule.shootingDays);
    var shootingDaysDisplayList = shootingCondition ? [String(shootingCondition.value)] : [];
    var fallbackCandidates = [cameraList, monitorList, crewPresentList, crewAbsentList, wirelessList, motorsList, controllersList, distanceList, matteboxList, cameraHandleList, viewfinderDisplayList, deliveryResolutionList, videoDistributionDisplayList, shootingDaysDisplayList];
    var fallbackSource = scenarioList.length ? scenarioList : fallbackCandidates.find(function (list) {
      return Array.isArray(list) && list.length;
    }) || [];
    var fallbackTitle = fallbackSource.length ? fallbackSource.join(' + ') : '';
    title.textContent = rule.label || fallbackTitle;
    info.appendChild(title);
    if (rule.always) {
      var _texts$currentLang44, _texts$en237;
      var alwaysLabel = ((_texts$currentLang44 = texts[currentLang]) === null || _texts$currentLang44 === void 0 ? void 0 : _texts$currentLang44.autoGearAlwaysMeta) || ((_texts$en237 = texts.en) === null || _texts$en237 === void 0 ? void 0 : _texts$en237.autoGearAlwaysMeta) || 'Always active';
      var alwaysMeta = document.createElement('p');
      alwaysMeta.className = 'auto-gear-rule-meta';
      alwaysMeta.textContent = alwaysLabel;
      info.appendChild(alwaysMeta);
    }
    if (scenarioList.length) {
      var _texts$currentLang45, _texts$en238;
      var scenarioLabel = ((_texts$currentLang45 = texts[currentLang]) === null || _texts$currentLang45 === void 0 || (_texts$currentLang45 = _texts$currentLang45.projectFields) === null || _texts$currentLang45 === void 0 ? void 0 : _texts$currentLang45.requiredScenarios) || ((_texts$en238 = texts.en) === null || _texts$en238 === void 0 || (_texts$en238 = _texts$en238.projectFields) === null || _texts$en238 === void 0 ? void 0 : _texts$en238.requiredScenarios) || 'Required Scenarios';
      var scenarioMeta = document.createElement('p');
      scenarioMeta.className = 'auto-gear-rule-meta';
      scenarioMeta.textContent = "".concat(scenarioLabel, ": ").concat(scenarioList.join(' + '));
      info.appendChild(scenarioMeta);
    }
    if (cameraList.length) {
      var _texts$currentLang46, _texts$en239;
      var cameraLabelText = ((_texts$currentLang46 = texts[currentLang]) === null || _texts$currentLang46 === void 0 ? void 0 : _texts$currentLang46.autoGearCameraLabel) || ((_texts$en239 = texts.en) === null || _texts$en239 === void 0 ? void 0 : _texts$en239.autoGearCameraLabel) || 'Camera selection';
      var cameraMeta = document.createElement('p');
      cameraMeta.className = 'auto-gear-rule-meta';
      cameraMeta.textContent = "".concat(cameraLabelText, ": ").concat(cameraList.join(' + '));
      info.appendChild(cameraMeta);
    }
    if (monitorList.length) {
      var _texts$currentLang47, _texts$en240;
      var monitorLabelText = ((_texts$currentLang47 = texts[currentLang]) === null || _texts$currentLang47 === void 0 ? void 0 : _texts$currentLang47.autoGearMonitorLabel) || ((_texts$en240 = texts.en) === null || _texts$en240 === void 0 ? void 0 : _texts$en240.autoGearMonitorLabel) || 'Onboard monitors';
      var monitorMeta = document.createElement('p');
      monitorMeta.className = 'auto-gear-rule-meta';
      monitorMeta.textContent = "".concat(monitorLabelText, ": ").concat(monitorList.join(' + '));
      info.appendChild(monitorMeta);
    }
    if (crewPresentList.length) {
      var _texts$currentLang48, _texts$en241;
      var crewPresentLabelText = ((_texts$currentLang48 = texts[currentLang]) === null || _texts$currentLang48 === void 0 ? void 0 : _texts$currentLang48.autoGearCrewPresentLabel) || ((_texts$en241 = texts.en) === null || _texts$en241 === void 0 ? void 0 : _texts$en241.autoGearCrewPresentLabel) || 'Crew present';
      var crewMeta = document.createElement('p');
      crewMeta.className = 'auto-gear-rule-meta';
      var labels = crewPresentList.map(function (value) {
        return getCrewRoleLabel(value);
      }).filter(Boolean);
      crewMeta.textContent = "".concat(crewPresentLabelText, ": ").concat(labels.join(' + '));
      info.appendChild(crewMeta);
    }
    if (crewAbsentList.length) {
      var _texts$currentLang49, _texts$en242;
      var crewAbsentLabelText = ((_texts$currentLang49 = texts[currentLang]) === null || _texts$currentLang49 === void 0 ? void 0 : _texts$currentLang49.autoGearCrewAbsentLabel) || ((_texts$en242 = texts.en) === null || _texts$en242 === void 0 ? void 0 : _texts$en242.autoGearCrewAbsentLabel) || 'Crew absent';
      var crewAbsentMeta = document.createElement('p');
      crewAbsentMeta.className = 'auto-gear-rule-meta';
      var _labels = crewAbsentList.map(function (value) {
        return getCrewRoleLabel(value);
      }).filter(Boolean);
      crewAbsentMeta.textContent = "".concat(crewAbsentLabelText, ": ").concat(_labels.join(' + '));
      info.appendChild(crewAbsentMeta);
    }
    if (wirelessList.length) {
      var _texts$currentLang50, _texts$en243;
      var wirelessLabelText = ((_texts$currentLang50 = texts[currentLang]) === null || _texts$currentLang50 === void 0 ? void 0 : _texts$currentLang50.autoGearWirelessLabel) || ((_texts$en243 = texts.en) === null || _texts$en243 === void 0 ? void 0 : _texts$en243.autoGearWirelessLabel) || 'Wireless transmitters';
      var wirelessMeta = document.createElement('p');
      wirelessMeta.className = 'auto-gear-rule-meta';
      wirelessMeta.textContent = "".concat(wirelessLabelText, ": ").concat(wirelessList.join(' + '));
      info.appendChild(wirelessMeta);
    }
    if (motorsList.length) {
      var _texts$currentLang51, _texts$en244;
      var motorsLabelText = ((_texts$currentLang51 = texts[currentLang]) === null || _texts$currentLang51 === void 0 ? void 0 : _texts$currentLang51.autoGearMotorsLabel) || ((_texts$en244 = texts.en) === null || _texts$en244 === void 0 ? void 0 : _texts$en244.autoGearMotorsLabel) || 'FIZ motors';
      var motorsMeta = document.createElement('p');
      motorsMeta.className = 'auto-gear-rule-meta';
      motorsMeta.textContent = "".concat(motorsLabelText, ": ").concat(motorsList.join(' + '));
      info.appendChild(motorsMeta);
    }
    if (controllersList.length) {
      var _texts$currentLang52, _texts$en245;
      var controllersLabelText = ((_texts$currentLang52 = texts[currentLang]) === null || _texts$currentLang52 === void 0 ? void 0 : _texts$currentLang52.autoGearControllersLabel) || ((_texts$en245 = texts.en) === null || _texts$en245 === void 0 ? void 0 : _texts$en245.autoGearControllersLabel) || 'FIZ controllers';
      var controllersMeta = document.createElement('p');
      controllersMeta.className = 'auto-gear-rule-meta';
      controllersMeta.textContent = "".concat(controllersLabelText, ": ").concat(controllersList.join(' + '));
      info.appendChild(controllersMeta);
    }
    if (distanceList.length) {
      var _texts$currentLang53, _texts$en246;
      var distanceLabelText = ((_texts$currentLang53 = texts[currentLang]) === null || _texts$currentLang53 === void 0 ? void 0 : _texts$currentLang53.autoGearDistanceLabel) || ((_texts$en246 = texts.en) === null || _texts$en246 === void 0 ? void 0 : _texts$en246.autoGearDistanceLabel) || 'FIZ distance devices';
      var distanceMeta = document.createElement('p');
      distanceMeta.className = 'auto-gear-rule-meta';
      distanceMeta.textContent = "".concat(distanceLabelText, ": ").concat(distanceList.join(' + '));
      info.appendChild(distanceMeta);
    }
    if (shootingCondition) {
      var _texts$currentLang54, _texts$en247, _texts$currentLang55, _texts$en248, _texts$currentLang56, _texts$en249, _texts$currentLang57, _texts$en250;
      var shootingLabelText = ((_texts$currentLang54 = texts[currentLang]) === null || _texts$currentLang54 === void 0 ? void 0 : _texts$currentLang54.autoGearShootingDaysLabel) || ((_texts$en247 = texts.en) === null || _texts$en247 === void 0 ? void 0 : _texts$en247.autoGearShootingDaysLabel) || 'Shooting days condition';
      var minimumLabel = ((_texts$currentLang55 = texts[currentLang]) === null || _texts$currentLang55 === void 0 ? void 0 : _texts$currentLang55.autoGearShootingDaysModeMinimum) || ((_texts$en248 = texts.en) === null || _texts$en248 === void 0 ? void 0 : _texts$en248.autoGearShootingDaysModeMinimum) || 'Minimum';
      var maximumLabel = ((_texts$currentLang56 = texts[currentLang]) === null || _texts$currentLang56 === void 0 ? void 0 : _texts$currentLang56.autoGearShootingDaysModeMaximum) || ((_texts$en249 = texts.en) === null || _texts$en249 === void 0 ? void 0 : _texts$en249.autoGearShootingDaysModeMaximum) || 'Maximum';
      var everyLabel = ((_texts$currentLang57 = texts[currentLang]) === null || _texts$currentLang57 === void 0 ? void 0 : _texts$currentLang57.autoGearShootingDaysModeEvery) || ((_texts$en250 = texts.en) === null || _texts$en250 === void 0 ? void 0 : _texts$en250.autoGearShootingDaysModeEvery) || 'Every';
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
      var _texts$currentLang58, _texts$en251;
      var matteboxLabelText = ((_texts$currentLang58 = texts[currentLang]) === null || _texts$currentLang58 === void 0 ? void 0 : _texts$currentLang58.autoGearMatteboxLabel) || ((_texts$en251 = texts.en) === null || _texts$en251 === void 0 ? void 0 : _texts$en251.autoGearMatteboxLabel) || 'Mattebox options';
      var matteboxMeta = document.createElement('p');
      matteboxMeta.className = 'auto-gear-rule-meta';
      matteboxMeta.textContent = "".concat(matteboxLabelText, ": ").concat(matteboxList.join(' + '));
      info.appendChild(matteboxMeta);
    }
    if (cameraHandleList.length) {
      var _texts$currentLang59, _texts$en252;
      var cameraHandleLabelText = ((_texts$currentLang59 = texts[currentLang]) === null || _texts$currentLang59 === void 0 ? void 0 : _texts$currentLang59.autoGearCameraHandleLabel) || ((_texts$en252 = texts.en) === null || _texts$en252 === void 0 ? void 0 : _texts$en252.autoGearCameraHandleLabel) || 'Camera handles';
      var cameraHandleMeta = document.createElement('p');
      cameraHandleMeta.className = 'auto-gear-rule-meta';
      cameraHandleMeta.textContent = "".concat(cameraHandleLabelText, ": ").concat(cameraHandleList.join(' + '));
      info.appendChild(cameraHandleMeta);
    }
    if (rawViewfinderList.length) {
      var _texts$currentLang60, _texts$en253;
      var viewfinderLabelText = ((_texts$currentLang60 = texts[currentLang]) === null || _texts$currentLang60 === void 0 ? void 0 : _texts$currentLang60.autoGearViewfinderExtensionLabel) || ((_texts$en253 = texts.en) === null || _texts$en253 === void 0 ? void 0 : _texts$en253.autoGearViewfinderExtensionLabel) || 'Viewfinder extension';
      var viewfinderMeta = document.createElement('p');
      viewfinderMeta.className = 'auto-gear-rule-meta';
      viewfinderMeta.textContent = "".concat(viewfinderLabelText, ": ").concat(viewfinderDisplayList.join(' + '));
      info.appendChild(viewfinderMeta);
    }
    if (videoDistributionDisplayList.length) {
      var _texts$currentLang61, _texts$en254;
      var videoDistLabelText = ((_texts$currentLang61 = texts[currentLang]) === null || _texts$currentLang61 === void 0 ? void 0 : _texts$currentLang61.autoGearVideoDistributionLabel) || ((_texts$en254 = texts.en) === null || _texts$en254 === void 0 ? void 0 : _texts$en254.autoGearVideoDistributionLabel) || 'Video distribution';
      var videoDistMeta = document.createElement('p');
      videoDistMeta.className = 'auto-gear-rule-meta';
      videoDistMeta.textContent = "".concat(videoDistLabelText, ": ").concat(videoDistributionDisplayList.join(' + '));
      info.appendChild(videoDistMeta);
    }
    if (deliveryResolutionList.length) {
      var _texts$currentLang62, _texts$en255;
      var deliveryLabelText = ((_texts$currentLang62 = texts[currentLang]) === null || _texts$currentLang62 === void 0 ? void 0 : _texts$currentLang62.autoGearDeliveryResolutionLabel) || ((_texts$en255 = texts.en) === null || _texts$en255 === void 0 ? void 0 : _texts$en255.autoGearDeliveryResolutionLabel) || 'Delivery resolution';
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
      var _texts$currentLang63, _texts$en256;
      var addsLabel = document.createElement('p');
      addsLabel.className = 'auto-gear-rule-meta auto-gear-rule-items-label';
      addsLabel.textContent = ((_texts$currentLang63 = texts[currentLang]) === null || _texts$currentLang63 === void 0 ? void 0 : _texts$currentLang63.autoGearAddsListLabel) || ((_texts$en256 = texts.en) === null || _texts$en256 === void 0 ? void 0 : _texts$en256.autoGearAddsListLabel) || 'Adds';
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
    var editLabel = ((_texts$currentLang64 = texts[currentLang]) === null || _texts$currentLang64 === void 0 ? void 0 : _texts$currentLang64.editBtn) || ((_texts$en257 = texts.en) === null || _texts$en257 === void 0 ? void 0 : _texts$en257.editBtn) || 'Edit';
    editBtn.textContent = editLabel;
    editBtn.setAttribute('data-help', editLabel);
    actions.appendChild(editBtn);
    var duplicateBtn = document.createElement('button');
    duplicateBtn.type = 'button';
    duplicateBtn.className = 'auto-gear-duplicate';
    duplicateBtn.dataset.ruleId = rule.id;
    var duplicateLabel = ((_texts$currentLang65 = texts[currentLang]) === null || _texts$currentLang65 === void 0 ? void 0 : _texts$currentLang65.autoGearDuplicateRule) || ((_texts$en258 = texts.en) === null || _texts$en258 === void 0 ? void 0 : _texts$en258.autoGearDuplicateRule) || 'Duplicate';
    duplicateBtn.textContent = duplicateLabel;
    duplicateBtn.setAttribute('data-help', duplicateLabel);
    actions.appendChild(duplicateBtn);
    var deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'auto-gear-delete';
    deleteBtn.dataset.ruleId = rule.id;
    var deleteLabel = ((_texts$currentLang66 = texts[currentLang]) === null || _texts$currentLang66 === void 0 ? void 0 : _texts$currentLang66.autoGearDeleteRule) || ((_texts$en259 = texts.en) === null || _texts$en259 === void 0 ? void 0 : _texts$en259.autoGearDeleteRule) || 'Delete';
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
  var _autoGearEditorActive, _texts$en260, _texts$en261;
  var normalizedType = type === 'remove' ? 'remove' : 'add';
  var button = normalizedType === 'remove' ? autoGearRemoveItemButton : autoGearAddItemButton;
  if (!button) return;
  var langTexts = texts[currentLang] || texts.en || {};
  var isEditing = ((_autoGearEditorActive = autoGearEditorActiveItem) === null || _autoGearEditorActive === void 0 ? void 0 : _autoGearEditorActive.listType) === normalizedType;
  var defaultKey = normalizedType === 'remove' ? 'autoGearRemoveItemButton' : 'autoGearAddItemButton';
  var defaultLabel = langTexts[defaultKey] || ((_texts$en260 = texts.en) === null || _texts$en260 === void 0 ? void 0 : _texts$en260[defaultKey]) || button.textContent || '';
  var updateLabel = langTexts.autoGearUpdateItemButton || ((_texts$en261 = texts.en) === null || _texts$en261 === void 0 ? void 0 : _texts$en261.autoGearUpdateItemButton) || defaultLabel;
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
    } catch (_unused13) {
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
function renderAutoGearDraftLists() {
  updateAutoGearDraftActionState();
  if (!autoGearEditorDraft) {
    if (autoGearAddList) autoGearAddList.innerHTML = '';
    if (autoGearRemoveList) autoGearRemoveList.innerHTML = '';
    return;
  }
  var renderList = function renderList(element, items, type) {
    if (!element) return;
    element.innerHTML = '';
    if (!items.length) {
      var _texts$currentLang67, _texts$en262;
      var empty = document.createElement('li');
      empty.className = 'auto-gear-empty';
      empty.textContent = ((_texts$currentLang67 = texts[currentLang]) === null || _texts$currentLang67 === void 0 ? void 0 : _texts$currentLang67.autoGearEmptyList) || ((_texts$en262 = texts.en) === null || _texts$en262 === void 0 ? void 0 : _texts$en262.autoGearEmptyList) || 'No items yet.';
      element.appendChild(empty);
      return;
    }
    items.forEach(function (item) {
      var _texts$currentLang68, _texts$en263, _texts$currentLang69, _texts$en264;
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
      var editLabel = ((_texts$currentLang68 = texts[currentLang]) === null || _texts$currentLang68 === void 0 ? void 0 : _texts$currentLang68.autoGearListEdit) || ((_texts$en263 = texts.en) === null || _texts$en263 === void 0 ? void 0 : _texts$en263.autoGearListEdit) || 'Edit';
      editBtn.textContent = editLabel;
      editBtn.setAttribute('data-help', editLabel);
      editBtn.setAttribute('aria-pressed', autoGearEditorActiveItem && autoGearEditorActiveItem.listType === type && autoGearEditorActiveItem.itemId === item.id ? 'true' : 'false');
      actions.appendChild(editBtn);
      var removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'auto-gear-remove-entry';
      removeBtn.dataset.listType = type;
      removeBtn.dataset.itemId = item.id;
      var removeLabel = ((_texts$currentLang69 = texts[currentLang]) === null || _texts$currentLang69 === void 0 ? void 0 : _texts$currentLang69.autoGearListRemove) || ((_texts$en264 = texts.en) === null || _texts$en264 === void 0 ? void 0 : _texts$en264.autoGearListRemove) || 'Remove';
      removeBtn.textContent = removeLabel;
      removeBtn.setAttribute('data-help', removeLabel);
      actions.appendChild(removeBtn);
      li.appendChild(actions);
      element.appendChild(li);
    });
  };
  renderList(autoGearAddList, autoGearEditorDraft.add, 'add');
  renderList(autoGearRemoveList, autoGearEditorDraft.remove, 'remove');
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
      } catch (_unused14) {}
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
    var _texts$currentLang70, _texts$en265;
    var message = ((_texts$currentLang70 = texts[currentLang]) === null || _texts$currentLang70 === void 0 ? void 0 : _texts$currentLang70.autoGearItemNameRequired) || ((_texts$en265 = texts.en) === null || _texts$en265 === void 0 ? void 0 : _texts$en265.autoGearItemNameRequired) || 'Enter an item name first.';
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
      var _texts$currentLang71, _texts$en266;
      var warning = ((_texts$currentLang71 = texts[currentLang]) === null || _texts$currentLang71 === void 0 ? void 0 : _texts$currentLang71.autoGearEditSingleItemWarning) || ((_texts$en266 = texts.en) === null || _texts$en266 === void 0 ? void 0 : _texts$en266.autoGearEditSingleItemWarning) || 'Edit one item at a time.';
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
  var _texts$currentLang75, _texts$en270;
  if (!autoGearEditorDraft) return;
  var scenarios = isAutoGearConditionActive('scenarios') && autoGearScenariosSelect ? Array.from(autoGearScenariosSelect.selectedOptions || []).map(function (option) {
    return option.value;
  }).filter(Boolean) : [];
  var rawScenarioMode = autoGearScenarioModeSelect ? normalizeAutoGearScenarioLogic(autoGearScenarioModeSelect.value) : 'all';
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
  if (!alwaysActive && !scenarios.length && !matteboxSelections.length && !cameraHandleSelections.length && !viewfinderSelections.length && !deliveryResolutionSelections.length && !videoDistributionSelections.length && !cameraSelections.length && !monitorSelections.length && !crewPresentSelections.length && !crewAbsentSelections.length && !wirelessSelections.length && !motorSelections.length && !controllerSelections.length && !distanceSelections.length && !shootingDaysRequirement) {
    var _texts$currentLang72, _texts$en267, _texts$currentLang73, _texts$en268;
    var message = ((_texts$currentLang72 = texts[currentLang]) === null || _texts$currentLang72 === void 0 ? void 0 : _texts$currentLang72.autoGearRuleConditionRequired) || ((_texts$en267 = texts.en) === null || _texts$en267 === void 0 ? void 0 : _texts$en267.autoGearRuleConditionRequired) || ((_texts$currentLang73 = texts[currentLang]) === null || _texts$currentLang73 === void 0 ? void 0 : _texts$currentLang73.autoGearRuleScenarioRequired) || ((_texts$en268 = texts.en) === null || _texts$en268 === void 0 ? void 0 : _texts$en268.autoGearRuleScenarioRequired) || 'Select at least one scenario, mattebox option, camera handle, viewfinder extension, delivery resolution or video distribution before saving.';
    window.alert(message);
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
  autoGearEditorDraft.monitor = monitorSelections;
  autoGearEditorDraft.crewPresent = crewPresentSelections;
  autoGearEditorDraft.crewAbsent = crewAbsentSelections;
  autoGearEditorDraft.wireless = wirelessSelections;
  autoGearEditorDraft.motors = motorSelections;
  autoGearEditorDraft.controllers = controllerSelections;
  autoGearEditorDraft.distance = distanceSelections;
  autoGearEditorDraft.shootingDays = shootingDaysRequirement;
  if (!autoGearEditorDraft.add.length && !autoGearEditorDraft.remove.length) {
    var _texts$currentLang74, _texts$en269;
    var _message = ((_texts$currentLang74 = texts[currentLang]) === null || _texts$currentLang74 === void 0 ? void 0 : _texts$currentLang74.autoGearRuleNeedsItems) || ((_texts$en269 = texts.en) === null || _texts$en269 === void 0 ? void 0 : _texts$en269.autoGearRuleNeedsItems) || 'Add at least one item to add or remove.';
    window.alert(_message);
    return;
  }
  var draftRule = normalizeAutoGearRule(autoGearEditorDraft);
  if (!draftRule) return;
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
  var successMessage = ((_texts$currentLang75 = texts[currentLang]) === null || _texts$currentLang75 === void 0 ? void 0 : _texts$currentLang75.autoGearRuleSaved) || ((_texts$en270 = texts.en) === null || _texts$en270 === void 0 ? void 0 : _texts$en270.autoGearRuleSaved) || 'Automatic gear rule saved.';
  showNotification('success', successMessage);
  closeAutoGearEditor();
}
function duplicateAutoGearRule(ruleId) {
  var _texts$en271;
  if (!ruleId) return;
  var rules = getAutoGearRules();
  var original = rules.find(function (rule) {
    return rule && rule.id === ruleId;
  });
  if (!original) return;
  var langTexts = texts[currentLang] || texts.en || {};
  var suffixBase = typeof langTexts.autoGearDuplicateSuffix === 'string' ? langTexts.autoGearDuplicateSuffix.trim() : '';
  var fallbackSuffix = typeof ((_texts$en271 = texts.en) === null || _texts$en271 === void 0 ? void 0 : _texts$en271.autoGearDuplicateSuffix) === 'string' ? texts.en.autoGearDuplicateSuffix.trim() : '';
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
  var _texts$currentLang76, _texts$en272;
  var rules = getAutoGearRules();
  var index = rules.findIndex(function (rule) {
    return rule.id === ruleId;
  });
  if (index < 0) return;
  var confirmation = ((_texts$currentLang76 = texts[currentLang]) === null || _texts$currentLang76 === void 0 ? void 0 : _texts$currentLang76.autoGearDeleteConfirm) || ((_texts$en272 = texts.en) === null || _texts$en272 === void 0 ? void 0 : _texts$en272.autoGearDeleteConfirm) || 'Delete this rule?';
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
    } catch (_unused15) {
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
    return {
      rules: initialValue,
      monitorDefaults: null
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
          return {
            v: {
              rules: value,
              monitorDefaults: monitorDefaults
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
        return {
          v: {
            rules: rawAutoGearRules,
            monitorDefaults: fallbackDefaults
          }
        };
      }
      var rawRules = Object.prototype.hasOwnProperty.call(value, 'rules') ? _resolveValue(value.rules) : null;
      if (Array.isArray(rawRules)) {
        return {
          v: {
            rules: rawRules,
            monitorDefaults: fallbackDefaults
          }
        };
      }
      if (rawRules && _typeof(rawRules) === 'object') {
        var nestedAutoGearRules = Object.prototype.hasOwnProperty.call(rawRules, 'autoGearRules') ? _resolveValue(rawRules.autoGearRules) : null;
        if (Array.isArray(nestedAutoGearRules)) {
          var nestedDefaults = extractMonitorDefaults(rawRules) || fallbackDefaults;
          return {
            v: {
              rules: nestedAutoGearRules,
              monitorDefaults: nestedDefaults
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
    _ret2;
  while (queue.length) {
    _ret2 = _loop2();
    if (_ret2 === 0) continue;
    if (_ret2) return _ret2.v;
  }
  return null;
}
function importAutoGearRulesFromData(data) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var parsed = parseAutoGearImportPayload(data);
  if (!parsed || !Array.isArray(parsed.rules)) {
    throw new Error('Invalid automatic gear rules import payload');
  }
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
  if (!options.silent) {
    var _texts$currentLang77, _texts$en273;
    var message = ((_texts$currentLang77 = texts[currentLang]) === null || _texts$currentLang77 === void 0 ? void 0 : _texts$currentLang77.autoGearImportSuccess) || ((_texts$en273 = texts.en) === null || _texts$en273 === void 0 ? void 0 : _texts$en273.autoGearImportSuccess) || 'Automatic gear rules imported.';
    showNotification('success', message);
  }
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
    var _texts$currentLang78, _texts$en274;
    var rules = getBaseAutoGearRules();
    var monitorDefaults = getAutoGearMonitorDefaultsSnapshot();
    var payload = {
      type: 'camera-power-planner/auto-gear-rules',
      version: APP_VERSION,
      createdAt: new Date().toISOString(),
      rules: rules,
      monitorDefaults: monitorDefaults
    };
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
    var message = ((_texts$currentLang78 = texts[currentLang]) === null || _texts$currentLang78 === void 0 ? void 0 : _texts$currentLang78.autoGearExportSuccess) || ((_texts$en274 = texts.en) === null || _texts$en274 === void 0 ? void 0 : _texts$en274.autoGearExportSuccess) || 'Automatic gear rules downloaded.';
    showNotification('success', message);
    return fileName;
  } catch (error) {
    var _texts$currentLang79, _texts$en275;
    console.warn('Automatic gear rules export failed', error);
    var _message2 = ((_texts$currentLang79 = texts[currentLang]) === null || _texts$currentLang79 === void 0 ? void 0 : _texts$currentLang79.autoGearExportError) || ((_texts$en275 = texts.en) === null || _texts$en275 === void 0 ? void 0 : _texts$en275.autoGearExportError) || 'Automatic gear rules export failed.';
    showNotification('error', _message2);
    return null;
  }
}
function createAutoGearBackup() {
  if (!autoGearRulesDirtySinceBackup) return false;
  var rules = getBaseAutoGearRules();
  var monitorDefaultsSnapshot = getAutoGearMonitorDefaultsSnapshot();
  var signature = getAutoGearConfigurationSignature(rules, monitorDefaultsSnapshot);
  if (signature === autoGearRulesLastBackupSignature) {
    autoGearRulesDirtySinceBackup = false;
    return false;
  }
  var entry = {
    id: generateAutoGearId('backup'),
    createdAt: new Date().toISOString(),
    rules: rules,
    monitorDefaults: monitorDefaultsSnapshot
  };
  var updatedBackups = [entry].concat(_toConsumableArray(autoGearBackups)).slice(0, AUTO_GEAR_BACKUP_LIMIT);
  try {
    var _texts$currentLang80, _texts$en276;
    persistAutoGearBackups(updatedBackups);
    autoGearBackups = updatedBackups;
    autoGearRulesLastBackupSignature = signature;
    autoGearRulesLastPersistedSignature = signature;
    autoGearRulesDirtySinceBackup = false;
    renderAutoGearBackupControls();
    var message = ((_texts$currentLang80 = texts[currentLang]) === null || _texts$currentLang80 === void 0 ? void 0 : _texts$currentLang80.autoGearBackupSaved) || ((_texts$en276 = texts.en) === null || _texts$en276 === void 0 ? void 0 : _texts$en276.autoGearBackupSaved) || 'Automatic gear backup saved.';
    showNotification('success', message);
    return true;
  } catch (error) {
    var _texts$currentLang81, _texts$en277;
    console.warn('Automatic gear backup failed', error);
    autoGearRulesDirtySinceBackup = true;
    var _message3 = ((_texts$currentLang81 = texts[currentLang]) === null || _texts$currentLang81 === void 0 ? void 0 : _texts$currentLang81.autoGearBackupFailed) || ((_texts$en277 = texts.en) === null || _texts$en277 === void 0 ? void 0 : _texts$en277.autoGearBackupFailed) || 'Automatic gear backup failed.';
    showNotification('error', _message3);
    return false;
  }
}
function restoreAutoGearBackup(backupId) {
  var _texts$currentLang82, _texts$en278;
  if (!backupId) return false;
  var backup = autoGearBackups.find(function (entry) {
    return entry.id === backupId;
  });
  if (!backup) return false;
  var confirmation = ((_texts$currentLang82 = texts[currentLang]) === null || _texts$currentLang82 === void 0 ? void 0 : _texts$currentLang82.autoGearBackupRestoreConfirm) || ((_texts$en278 = texts.en) === null || _texts$en278 === void 0 ? void 0 : _texts$en278.autoGearBackupRestoreConfirm) || 'Replace your automatic gear rules with this backup?';
  if (typeof window !== 'undefined' && typeof window.confirm === 'function') {
    if (!window.confirm(confirmation)) return false;
  }
  try {
    var _texts$currentLang83, _texts$en279;
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
    autoGearRulesLastBackupSignature = getAutoGearBackupEntrySignature(backup);
    autoGearRulesLastPersistedSignature = autoGearRulesLastBackupSignature;
    autoGearRulesDirtySinceBackup = false;
    var message = ((_texts$currentLang83 = texts[currentLang]) === null || _texts$currentLang83 === void 0 ? void 0 : _texts$currentLang83.autoGearBackupRestoreSuccess) || ((_texts$en279 = texts.en) === null || _texts$en279 === void 0 ? void 0 : _texts$en279.autoGearBackupRestoreSuccess) || 'Automatic gear backup restored.';
    showNotification('success', message);
    return true;
  } catch (error) {
    var _texts$currentLang84, _texts$en280;
    console.warn('Failed to restore automatic gear backup', error);
    var _message4 = ((_texts$currentLang84 = texts[currentLang]) === null || _texts$currentLang84 === void 0 ? void 0 : _texts$currentLang84.autoGearBackupRestoreError) || ((_texts$en280 = texts.en) === null || _texts$en280 === void 0 ? void 0 : _texts$en280.autoGearBackupRestoreError) || 'Automatic gear backup restore failed.';
    showNotification('error', _message4);
    return false;
  }
}
function handleAutoGearImportSelection(event) {
  var _texts$currentLang85, _texts$en281;
  var input = event === null || event === void 0 ? void 0 : event.target;
  var file = input && input.files && input.files[0];
  if (!file) return;
  var confirmation = ((_texts$currentLang85 = texts[currentLang]) === null || _texts$currentLang85 === void 0 ? void 0 : _texts$currentLang85.autoGearImportConfirm) || ((_texts$en281 = texts.en) === null || _texts$en281 === void 0 ? void 0 : _texts$en281.autoGearImportConfirm) || 'Replace your automatic gear rules with the imported file?';
  if (typeof window !== 'undefined' && typeof window.confirm === 'function') {
    if (!window.confirm(confirmation)) {
      if (input) input.value = '';
      return;
    }
  }
  if (typeof FileReader === 'undefined') {
    var _texts$currentLang86, _texts$en282;
    var errorMsg = ((_texts$currentLang86 = texts[currentLang]) === null || _texts$currentLang86 === void 0 ? void 0 : _texts$currentLang86.autoGearImportError) || ((_texts$en282 = texts.en) === null || _texts$en282 === void 0 ? void 0 : _texts$en282.autoGearImportError) || 'Import failed. Please choose a valid automatic gear rules file.';
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
      var _texts$currentLang87, _texts$en283;
      console.warn('Automatic gear rules import failed', error);
      var _errorMsg = ((_texts$currentLang87 = texts[currentLang]) === null || _texts$currentLang87 === void 0 ? void 0 : _texts$currentLang87.autoGearImportError) || ((_texts$en283 = texts.en) === null || _texts$en283 === void 0 ? void 0 : _texts$en283.autoGearImportError) || 'Import failed. Please choose a valid automatic gear rules file.';
      showNotification('error', _errorMsg);
    } finally {
      if (input) input.value = '';
    }
  };
  reader.onerror = function () {
    var _texts$currentLang88, _texts$en284;
    var errorMsg = ((_texts$currentLang88 = texts[currentLang]) === null || _texts$currentLang88 === void 0 ? void 0 : _texts$currentLang88.autoGearImportError) || ((_texts$en284 = texts.en) === null || _texts$en284 === void 0 ? void 0 : _texts$en284.autoGearImportError) || 'Import failed. Please choose a valid automatic gear rules file.';
    showNotification('error', errorMsg);
    if (input) input.value = '';
  };
  reader.readAsText(file);
}
var lastActiveBeforeIosHelp = null;
var lastActiveBeforeInstallGuide = null;
var currentInstallGuidePlatform = null;
function isIosDevice() {
  if (typeof navigator === 'undefined') return false;
  var ua = navigator.userAgent || '';
  var platform = navigator.platform || '';
  var hasTouch = typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 1;
  return /iphone|ipad|ipod/i.test(ua) || platform === 'MacIntel' && hasTouch;
}
function isAndroidDevice() {
  if (typeof navigator === 'undefined') return false;
  var ua = navigator.userAgent || '';
  var vendor = navigator.vendor || '';
  return /android/i.test(ua) || /android/i.test(vendor);
}
function isStandaloneDisplayMode() {
  if (typeof window === 'undefined') return false;
  if (typeof window.matchMedia === 'function') {
    try {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return true;
      }
    } catch (error) {
      console.warn('matchMedia display-mode check failed', error);
    }
  }
  if (typeof navigator !== 'undefined' && typeof navigator.standalone === 'boolean') {
    return navigator.standalone;
  }
  return false;
}
function hasDismissedIosPwaHelp() {
  try {
    return localStorage.getItem(IOS_PWA_HELP_STORAGE_KEY) === '1';
  } catch (error) {
    console.warn('Could not read iOS PWA help dismissal flag', error);
    return false;
  }
}
function markIosPwaHelpDismissed() {
  try {
    localStorage.setItem(IOS_PWA_HELP_STORAGE_KEY, '1');
  } catch (error) {
    console.warn('Could not store iOS PWA help dismissal', error);
  }
}
function hasDismissedInstallBanner() {
  if (installBannerDismissedInSession) return true;
  if (typeof localStorage === 'undefined') return false;
  try {
    var storedValue = localStorage.getItem(INSTALL_BANNER_DISMISSED_KEY);
    var dismissed = storedValue === '1';
    if (dismissed) {
      installBannerDismissedInSession = true;
    }
    return dismissed;
  } catch (error) {
    console.warn('Could not read install banner dismissal flag', error);
    return installBannerDismissedInSession;
  }
}
function markInstallBannerDismissed() {
  installBannerDismissedInSession = true;
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
  if (shouldShowInstallBanner()) {
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
function shouldShowIosPwaHelp() {
  return !!iosPwaHelpDialog && isIosDevice() && isStandaloneDisplayMode() && !hasDismissedIosPwaHelp();
}
function openIosPwaHelp() {
  if (!iosPwaHelpDialog) return;
  if (!shouldShowIosPwaHelp()) return;
  lastActiveBeforeIosHelp = document.activeElement;
  iosPwaHelpDialog.removeAttribute('hidden');
  var focusTarget = iosPwaHelpClose || iosPwaHelpDialog.querySelector('button, [href], [tabindex]:not([tabindex="-1"])');
  if (focusTarget && typeof focusTarget.focus === 'function') {
    focusTarget.focus();
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
    lastActiveBeforeIosHelp.focus();
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
  for (var _i12 = 0, _Object$entries0 = Object.entries(collection); _i12 < _Object$entries0.length; _i12++) {
    var _Object$entries0$_i = _slicedToArray(_Object$entries0[_i12], 2),
      name = _Object$entries0$_i[0],
      _value4 = _Object$entries0$_i[1];
    if (name === 'filterOptions' || name === 'None') {
      continue;
    }
    if (!isPlainObjectValue(_value4)) {
      continue;
    }
    if (isDeviceEntryObject(_value4)) {
      total += 1;
    } else {
      total += countDeviceDatabaseEntries(_value4);
    }
  }
  return total;
}
function looksLikeDeviceDatabase(candidate) {
  if (!isPlainObjectValue(candidate)) {
    return false;
  }
  var matched = 0;
  for (var _i13 = 0, _REQUIRED_DEVICE_CATE = REQUIRED_DEVICE_CATEGORIES; _i13 < _REQUIRED_DEVICE_CATE.length; _i13++) {
    var _key6 = _REQUIRED_DEVICE_CATE[_i13];
    if (Object.prototype.hasOwnProperty.call(candidate, _key6)) {
      matched += 1;
    }
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
  for (var _i14 = 0, _REQUIRED_DEVICE_CATE2 = REQUIRED_DEVICE_CATEGORIES; _i14 < _REQUIRED_DEVICE_CATE2.length; _i14++) {
    var category = _REQUIRED_DEVICE_CATE2[_i14];
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
  if (missing.length) {
    errors.push("Missing categories: ".concat(missing.join(', ')));
  }
  if (candidate.accessories !== undefined) {
    if (!isPlainObjectValue(candidate.accessories)) {
      errors.push('Accessory collections must be objects.');
    } else {
      for (var _i15 = 0, _Object$entries1 = Object.entries(candidate.accessories); _i15 < _Object$entries1.length; _i15++) {
        var _Object$entries1$_i = _slicedToArray(_Object$entries1[_i15], 2),
          subKey = _Object$entries1$_i[0],
          subValue = _Object$entries1$_i[1];
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
    for (var _i16 = 0, _Object$entries10 = Object.entries(candidate.fiz); _i16 < _Object$entries10.length; _i16++) {
      var _Object$entries10$_i = _slicedToArray(_Object$entries10[_i16], 2),
        _subKey = _Object$entries10$_i[0],
        _subValue = _Object$entries10$_i[1];
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
    for (var _i17 = 0, _Object$entries11 = Object.entries(collection); _i17 < _Object$entries11.length; _i17++) {
      var _Object$entries11$_i = _slicedToArray(_Object$entries11[_i17], 2),
        name = _Object$entries11$_i[0],
        _value5 = _Object$entries11$_i[1];
      if (name === 'None' || name === 'filterOptions') {
        continue;
      }
      var nextPath = path.concat(name);
      if (!isPlainObjectValue(_value5)) {
        if (!Array.isArray(_value5)) {
          structureErrors.push("".concat(nextPath.join('.'), " must be an object."));
        }
      } else if (!isDeviceEntryObject(_value5)) {
        _inspectCollections(_value5, nextPath);
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
  for (var _i18 = 0, _errors = errors; _i18 < _errors.length; _i18++) {
    var message = _errors[_i18];
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
  for (var _i19 = 0, _Object$entries12 = Object.entries(options); _i19 < _Object$entries12.length; _i19++) {
    var _Object$entries12$_i = _slicedToArray(_Object$entries12[_i19], 2),
      _key7 = _Object$entries12$_i[0],
      _value6 = _Object$entries12$_i[1];
    if (typeof _value6 === 'undefined') continue;
    var normalizedValue = void 0;
    if (_value6 && _typeof(_value6) === 'object') {
      normalizedValue = serializeIntlOptions(_value6);
    } else {
      normalizedValue = String(_value6);
    }
    entries.push("".concat(_key7, ":").concat(normalizedValue));
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
  var _ref51 = options || {},
    _ref51$unit = _ref51.unit,
    unit = _ref51$unit === void 0 ? temperatureUnit : _ref51$unit,
    _ref51$lang = _ref51.lang,
    lang = _ref51$lang === void 0 ? currentLang : _ref51$lang,
    _ref51$includeSign = _ref51.includeSign,
    includeSign = _ref51$includeSign === void 0 ? true : _ref51$includeSign;
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
  Object.entries(diff).forEach(function (_ref52) {
    var _ref53 = _slicedToArray(_ref52, 2),
      cat = _ref53[0],
      entries = _ref53[1];
    if (!isPlainObjectValue(entries)) return;
    if (cat === 'fiz') {
      Object.entries(entries).forEach(function (_ref54) {
        var _ref55 = _slicedToArray(_ref54, 2),
          sub = _ref55[0],
          subEntries = _ref55[1];
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
    Object.entries(projectData).forEach(function (_ref56) {
      var _ref57 = _slicedToArray(_ref56, 2),
        name = _ref57[0],
        entry = _ref57[1];
      addCount(name, entry);
    });
  } else {
    addCount('', projectData);
  }
  if (isPlainObjectValue(setupsData)) {
    Object.entries(setupsData).forEach(function (_ref58) {
      var _ref59 = _slicedToArray(_ref58, 2),
        name = _ref59[0],
        setup = _ref59[1];
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
function estimateBackupSize(data) {
  if (typeof localStorage === 'undefined') return 0;
  try {
    var snapshot = {};
    for (var i = 0; i < localStorage.length; i += 1) {
      var _key8 = localStorage.key(i);
      if (typeof _key8 !== 'string') continue;
      snapshot[_key8] = localStorage.getItem(_key8);
    }
    var payload = {
      version: typeof APP_VERSION !== 'undefined' ? APP_VERSION : '',
      generatedAt: new Date().toISOString(),
      settings: snapshot,
      data: data
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
  var _texts$en286;
  var resolved = resolveLanguageCode(lang);
  if (!Number.isFinite(bytes) || bytes <= 0) {
    var _texts$en285;
    var zero = formatNumberForLang(resolved, 0, {
      maximumFractionDigits: 0
    });
    var _template3 = langTexts.storageTotalSizeValue || ((_texts$en285 = texts.en) === null || _texts$en285 === void 0 ? void 0 : _texts$en285.storageTotalSizeValue) || '~%s KB';
    return _template3.replace('%s', zero);
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
  var template = langTexts.storageTotalSizeValue || ((_texts$en286 = texts.en) === null || _texts$en286 === void 0 ? void 0 : _texts$en286.storageTotalSizeValue) || '~%s KB';
  return template.replace('%s', formatted);
}
function formatDeviceCategories(lang, categories) {
  if (!Array.isArray(categories) || !categories.length) return '';
  var resolved = resolveLanguageCode(lang);
  var lookup = typeof categoryNames !== 'undefined' && categoryNames || {};
  var localized = lookup[resolved] || lookup.en || {};
  var fallback = lookup.en || {};
  var items = categories.map(function (_ref60) {
    var key = _ref60.key,
      count = _ref60.count;
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
function updateStorageSummary() {
  var _texts$en287, _texts$en288, _texts$en289;
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
  var autoBackups = projectNames.filter(function (name) {
    return typeof name === 'string' && name.startsWith('auto-backup-');
  }).length;
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
    extra: deviceSummary.total > 0 && deviceSummary.categories.length ? (langTexts.storageDeviceCategories || ((_texts$en287 = texts.en) === null || _texts$en287 === void 0 ? void 0 : _texts$en287.storageDeviceCategories) || 'Affected categories: %s').replace('%s', formatDeviceCategories(lang, deviceSummary.categories)) : null
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
    value: hasSession ? langTexts.storageSessionStored || ((_texts$en288 = texts.en) === null || _texts$en288 === void 0 ? void 0 : _texts$en288.storageSessionStored) || 'Stored' : langTexts.storageSessionNotStored || ((_texts$en289 = texts.en) === null || _texts$en289 === void 0 ? void 0 : _texts$en289.storageSessionNotStored) || 'Not stored',
    description: langTexts.storageKeySessionDesc || ''
  }, {
    storageKey: 'cameraPowerPlanner_fullBackups',
    label: langTexts.storageKeyFullBackups || 'Full app backups',
    value: formatCountText(lang, langTexts, 'storageFullBackupsCount', fullBackupCount),
    description: langTexts.storageKeyFullBackupsDesc || ''
  }, {
    storageKey: 'localStorage',
    label: langTexts.storageKeyTotalSize || 'Approximate backup size',
    value: formatSizeText(lang, langTexts, approxBytes),
    description: langTexts.storageKeyTotalSizeDesc || ''
  }];
  items.forEach(function (item) {
    storageSummaryList.appendChild(createSummaryItemElement(item));
  });
  if (storageSummaryEmpty) {
    var hasData = Boolean(totalProjects || gearListCount || deviceSummary.total || favoritesCount || feedbackCount || hasSession || fullBackupCount);
    if (hasData) {
      storageSummaryEmpty.setAttribute('hidden', '');
    } else {
      storageSummaryEmpty.removeAttribute('hidden');
    }
  }
}
if (settingsLogo) {
  settingsLogo.addEventListener('change', function () {
    var file = settingsLogo.files && settingsLogo.files[0];
    if (!file) {
      loadStoredLogoPreview();
      return;
    }
    if (file.type !== 'image/svg+xml' && !file.name.toLowerCase().endsWith('.svg')) {
      showNotification('error', texts[currentLang].logoFormatError || 'Unsupported logo format');
      settingsLogo.value = '';
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
var featureSearch = document.getElementById("featureSearch");
var featureList = document.getElementById("featureList");
var featureMap = new Map();
var normalizeSearchValue = function normalizeSearchValue(value) {
  return typeof value === 'string' ? value.trim().toLowerCase() : '';
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
var renderFeatureListOptions = function renderFeatureListOptions(values) {
  if (!featureList || !Array.isArray(values)) return;
  var fragment = document.createDocumentFragment();
  var _iterator15 = _createForOfIteratorHelper(values),
    _step15;
  try {
    for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
      var _value7 = _step15.value;
      if (!_value7) continue;
      var option = document.createElement('option');
      option.value = _value7;
      fragment.appendChild(option);
    }
  } catch (err) {
    _iterator15.e(err);
  } finally {
    _iterator15.f();
  }
  featureList.innerHTML = '';
  featureList.appendChild(fragment);
};
function restoreFeatureSearchDefaults() {
  renderFeatureListOptions(featureSearchDefaultOptions);
}
var FEATURE_SEARCH_MATCH_PRIORITIES = {
  none: 1,
  partial: 2,
  keySubset: 3,
  keyPrefix: 4,
  token: 5,
  exactKey: 6
};
function scoreFeatureSearchEntry(entry, queryKey, queryTokens) {
  if (!entry || !entry.key) return null;
  var display = entry.display;
  if (!display) return null;
  var entryKey = entry.key;
  var entryTokens = Array.isArray(entry.tokens) ? entry.tokens : [];
  var validQueryTokens = Array.isArray(queryTokens) ? queryTokens.filter(Boolean) : [];
  var tokenDetails = validQueryTokens.length ? computeTokenMatchDetails(entryTokens, validQueryTokens) : {
    score: 0,
    matched: 0
  };
  var bestType = 'none';
  var bestPriority = FEATURE_SEARCH_MATCH_PRIORITIES.none;
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
  return {
    entry: entry,
    matchType: bestType,
    priority: bestPriority,
    tokenScore: tokenDetails.score,
    tokenMatches: tokenDetails.matched,
    keyDistance: queryKey ? Math.abs(entryKey.length - queryKey.length) : Number.POSITIVE_INFINITY,
    keyLength: entryKey.length
  };
}
function updateFeatureSearchSuggestions(query) {
  if (!featureList) return;
  var trimmed = typeof query === 'string' ? query.trim() : '';
  if (!trimmed) {
    restoreFeatureSearchDefaults();
    return;
  }
  var queryKey = searchKey(trimmed);
  var queryTokens = searchTokens(trimmed);
  if (!queryKey && (!Array.isArray(queryTokens) || queryTokens.length === 0)) {
    restoreFeatureSearchDefaults();
    return;
  }
  var scored = featureSearchEntries.map(function (entry) {
    return scoreFeatureSearchEntry(entry, queryKey, queryTokens);
  }).filter(Boolean);
  if (scored.length === 0) {
    restoreFeatureSearchDefaults();
    return;
  }
  var meaningful = scored.filter(function (item) {
    return item.priority > FEATURE_SEARCH_MATCH_PRIORITIES.none || item.tokenScore > 0;
  });
  var candidates = (meaningful.length > 0 ? meaningful : scored).sort(function (a, b) {
    if (b.priority !== a.priority) return b.priority - a.priority;
    if (b.tokenScore !== a.tokenScore) return b.tokenScore - a.tokenScore;
    if (b.tokenMatches !== a.tokenMatches) return b.tokenMatches - a.tokenMatches;
    if (a.keyDistance !== b.keyDistance) return a.keyDistance - b.keyDistance;
    if (a.keyLength !== b.keyLength) return a.keyLength - b.keyLength;
    return a.entry.display.localeCompare(b.entry.display, undefined, {
      sensitivity: 'base'
    });
  });
  var values = [];
  var seen = new Set();
  var _iterator16 = _createForOfIteratorHelper(candidates.slice(0, 25)),
    _step16;
  try {
    for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
      var item = _step16.value;
      var _value8 = item.entry.display;
      if (!_value8 || seen.has(_value8)) continue;
      seen.add(_value8);
      values.push(_value8);
    }
  } catch (err) {
    _iterator16.e(err);
  } finally {
    _iterator16.f();
  }
  if (values.length === 0) {
    restoreFeatureSearchDefaults();
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
var buildFeatureSearchEntry = function buildFeatureSearchEntry(element, _ref61) {
  var label = _ref61.label,
    _ref61$keywords = _ref61.keywords,
    keywords = _ref61$keywords === void 0 ? '' : _ref61$keywords;
  if (!element || !label) return null;
  var baseLabel = label.trim();
  if (!baseLabel) return null;
  var baseKey = searchKey(baseLabel);
  if (!baseKey) return null;
  var baseLabelLower = baseLabel.toLowerCase();
  var contextLabels = collectFeatureContexts(element, baseLabelLower);
  var combinedLabel = baseLabel;
  if (contextLabels.length) {
    combinedLabel = "".concat(baseLabel, " (").concat(contextLabels.join(' › '), ")");
  }
  var combinedKeywords = [baseLabel, contextLabels.join(' '), keywords].filter(Boolean).join(' ');
  var entry = {
    element: element,
    label: baseLabel,
    baseLabel: baseLabel,
    displayLabel: combinedLabel,
    context: contextLabels,
    tokens: searchTokens(combinedKeywords),
    key: baseKey,
    optionValue: combinedLabel
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
  var _iterator17 = _createForOfIteratorHelper(validQueryTokens),
    _step17;
  try {
    for (_iterator17.s(); !(_step17 = _iterator17.n()).done;) {
      var token = _step17.value;
      var best = 0;
      var _iterator18 = _createForOfIteratorHelper(entryTokens),
        _step18;
      try {
        for (_iterator18.s(); !(_step18 = _iterator18.n()).done;) {
          var entryToken = _step18.value;
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
        _iterator18.e(err);
      } finally {
        _iterator18.f();
      }
      if (best > 0) {
        matched += 1;
        total += best;
      }
    }
  } catch (err) {
    _iterator17.e(err);
  } finally {
    _iterator17.f();
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
function findBestSearchMatch(map, key) {
  var tokens = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var queryTokens = Array.isArray(tokens) ? tokens.filter(Boolean) : [];
  var hasKey = Boolean(key);
  if (!hasKey && queryTokens.length === 0) return null;
  var toResult = function toResult(entryKey, entryValue, matchType) {
    var score = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var matchedCount = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    return {
      key: entryKey,
      value: entryValue,
      matchType: matchType,
      score: score,
      matchedCount: matchedCount
    };
  };
  var flattened = [];
  var _iterator19 = _createForOfIteratorHelper(map.entries()),
    _step19;
  try {
    for (_iterator19.s(); !(_step19 = _iterator19.n()).done;) {
      var _step19$value = _slicedToArray(_step19.value, 2),
        _entryKey = _step19$value[0],
        _entryValue2 = _step19$value[1];
      if (!_entryValue2) continue;
      if (Array.isArray(_entryValue2)) {
        var _iterator21 = _createForOfIteratorHelper(_entryValue2),
          _step21;
        try {
          for (_iterator21.s(); !(_step21 = _iterator21.n()).done;) {
            var _value9 = _step21.value;
            if (_value9) flattened.push([_entryKey, _value9]);
          }
        } catch (err) {
          _iterator21.e(err);
        } finally {
          _iterator21.f();
        }
      } else {
        flattened.push([_entryKey, _entryValue2]);
      }
    }
  } catch (err) {
    _iterator19.e(err);
  } finally {
    _iterator19.f();
  }
  if (hasKey) {
    var exactCandidates = flattened.filter(function (_ref62) {
      var _ref63 = _slicedToArray(_ref62, 1),
        entryKey = _ref63[0];
      return entryKey === key;
    });
    if (exactCandidates.length) {
      var _bestEntry;
      var bestEntry = exactCandidates[0][1];
      var bestDetails = queryTokens.length > 0 ? computeTokenMatchDetails(((_bestEntry = bestEntry) === null || _bestEntry === void 0 ? void 0 : _bestEntry.tokens) || [], queryTokens) : {
        score: Number.POSITIVE_INFINITY,
        matched: queryTokens.length
      };
      var _iterator20 = _createForOfIteratorHelper(exactCandidates.slice(1)),
        _step20;
      try {
        for (_iterator20.s(); !(_step20 = _iterator20.n()).done;) {
          var _step20$value = _slicedToArray(_step20.value, 2),
            entryValue = _step20$value[1];
          if (!queryTokens.length) break;
          var details = computeTokenMatchDetails((entryValue === null || entryValue === void 0 ? void 0 : entryValue.tokens) || [], queryTokens);
          if (details.score > bestDetails.score || details.score === bestDetails.score && details.matched > bestDetails.matched) {
            bestDetails = details;
            bestEntry = entryValue;
          }
        }
      } catch (err) {
        _iterator20.e(err);
      } finally {
        _iterator20.f();
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
  var keyLength = hasKey ? key.length : 0;
  for (var _i20 = 0, _flattened = flattened; _i20 < _flattened.length; _i20++) {
    var _flattened$_i = _slicedToArray(_flattened[_i20], 2),
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
  return null;
}
var STRONG_SEARCH_MATCH_TYPES = new Set(['exactKey', 'keyPrefix', 'keySubset']);
var existingDevicesHeading = document.getElementById("existingDevicesHeading");
var batteryComparisonSection = document.getElementById("batteryComparison");
var batteryTableElem = document.getElementById("batteryTable");
var breakdownListElem = document.getElementById("breakdownList");
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
var updateAccentColorResetButtonState = function updateAccentColorResetButtonState() {
  if (!accentColorResetButton) return;
  var body = typeof document !== 'undefined' ? document.body : null;
  var pinkModeActive = !!(body && body.classList.contains('pink-mode'));
  var inputDisabled = !accentColorInput || accentColorInput.disabled;
  var currentValue = accentColorInput ? normalizeAccentValue(accentColorInput.value || '') : '';
  var isDefaultSelection = !currentValue || currentValue === DEFAULT_ACCENT_NORMALIZED;
  var shouldDisable = pinkModeActive || inputDisabled || isDefaultSelection;
  accentColorResetButton.disabled = shouldDisable;
  if (shouldDisable) {
    accentColorResetButton.setAttribute('aria-disabled', 'true');
  } else {
    accentColorResetButton.removeAttribute('aria-disabled');
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
  var _ref64 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    color = _ref64.color,
    highContrast = _ref64.highContrast;
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
if (accentColorInput) {
  accentColorInput.addEventListener('input', function () {
    if (typeof document !== 'undefined' && document.body && document.body.classList.contains('pink-mode')) {
      updateAccentColorResetButtonState();
      return;
    }
    var color = accentColorInput.value;
    applyAccentColor(color);
    updateAccentColorResetButtonState();
  });
}
if (accentColorResetButton && accentColorInput) {
  accentColorResetButton.addEventListener('click', function () {
    if (accentColorResetButton.disabled || accentColorInput.disabled) return;
    if (typeof document !== 'undefined' && document.body && document.body.classList.contains('pink-mode')) {
      updateAccentColorResetButtonState();
      return;
    }
    var currentValue = normalizeAccentValue(accentColorInput.value || '');
    if (currentValue === DEFAULT_ACCENT_NORMALIZED) {
      updateAccentColorResetButtonState();
      return;
    }
    accentColorInput.value = DEFAULT_ACCENT_COLOR;
    var eventHandled = false;
    try {
      var inputEvent = new Event('input', {
        bubbles: true
      });
      eventHandled = accentColorInput.dispatchEvent(inputEvent);
    } catch (error) {
      void error;
      if (typeof document !== 'undefined' && document.createEvent) {
        var legacyEvent = document.createEvent('Event');
        legacyEvent.initEvent('input', true, true);
        eventHandled = accentColorInput.dispatchEvent(legacyEvent);
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
    var _iterator22 = _createForOfIteratorHelper(uiScaleProperties),
      _step22;
    try {
      for (_iterator22.s(); !(_step22 = _iterator22.n()).done;) {
        var prop = _step22.value;
        var _value0 = parseFloat(computedStyle.getPropertyValue(prop));
        if (Number.isFinite(_value0) && _value0 > 0) {
          baseUIScaleValues[prop] = _value0;
        }
      }
    } catch (err) {
      _iterator22.e(err);
    } finally {
      _iterator22.f();
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
  _registerCustomFontSource = _asyncToGenerator(_regenerator().m(function _callee6(name, dataUrl, id) {
    var loaded, fontFace, safeId, styleId, styleElement, escapedName, _t5, _t6;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.p = _context6.n) {
        case 0:
          if (!(!name || !dataUrl || typeof document === 'undefined')) {
            _context6.n = 1;
            break;
          }
          return _context6.a(2, false);
        case 1:
          loaded = false;
          if (!(typeof FontFace === 'function' && document.fonts && typeof document.fonts.add === 'function')) {
            _context6.n = 5;
            break;
          }
          _context6.p = 2;
          fontFace = new FontFace(name, "url(".concat(dataUrl, ")"));
          _context6.n = 3;
          return fontFace.load();
        case 3:
          document.fonts.add(fontFace);
          loaded = true;
          _context6.n = 5;
          break;
        case 4:
          _context6.p = 4;
          _t5 = _context6.v;
          console.warn('Failed to load custom font via FontFace', _t5);
        case 5:
          if (loaded) {
            _context6.n = 8;
            break;
          }
          _context6.p = 6;
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
          _context6.n = 8;
          break;
        case 7:
          _context6.p = 7;
          _t6 = _context6.v;
          console.warn('Failed to inject custom font style', _t6);
          return _context6.a(2, false);
        case 8:
          return _context6.a(2, loaded);
      }
    }, _callee6, null, [[6, 7], [2, 4]]);
  }));
  return _registerCustomFontSource.apply(this, arguments);
}
function applyStoredCustomFont(_x4) {
  return _applyStoredCustomFont.apply(this, arguments);
}
function _applyStoredCustomFont() {
  _applyStoredCustomFont = _asyncToGenerator(_regenerator().m(function _callee7(entry) {
    var value, _ensureFontFamilyOpti, option;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.n) {
        case 0:
          if (!(!entry || !entry.id)) {
            _context7.n = 1;
            break;
          }
          return _context7.a(2, null);
        case 1:
          value = buildFontFamilyValue(entry.name);
          _ensureFontFamilyOpti = ensureFontFamilyOption(value, entry.name, localFontsGroup, 'uploaded'), option = _ensureFontFamilyOpti.option;
          if (option) {
            option.dataset.fontId = entry.id;
          }
          _context7.n = 2;
          return registerCustomFontSource(entry.name, entry.data, entry.id);
        case 2:
          return _context7.a(2, value);
      }
    }, _callee7);
  }));
  return _applyStoredCustomFont.apply(this, arguments);
}
function loadStoredCustomFonts() {
  return _loadStoredCustomFonts.apply(this, arguments);
}
function _loadStoredCustomFonts() {
  _loadStoredCustomFonts = _asyncToGenerator(_regenerator().m(function _callee8() {
    var stored, _iterator26, _step26, entry, normalized, _t7, _t8;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.p = _context8.n) {
        case 0:
          stored = loadCustomFontMetadataFromStorage();
          if (stored.length) {
            _context8.n = 1;
            break;
          }
          return _context8.a(2);
        case 1:
          _iterator26 = _createForOfIteratorHelper(stored);
          _context8.p = 2;
          _iterator26.s();
        case 3:
          if ((_step26 = _iterator26.n()).done) {
            _context8.n = 8;
            break;
          }
          entry = _step26.value;
          normalized = {
            id: entry.id,
            name: sanitizeCustomFontName(entry.name),
            data: entry.data
          };
          customFontEntries.set(normalized.id, normalized);
          _context8.p = 4;
          _context8.n = 5;
          return applyStoredCustomFont(normalized);
        case 5:
          _context8.n = 7;
          break;
        case 6:
          _context8.p = 6;
          _t7 = _context8.v;
          console.warn('Failed to restore custom font', normalized.name, _t7);
        case 7:
          _context8.n = 3;
          break;
        case 8:
          _context8.n = 10;
          break;
        case 9:
          _context8.p = 9;
          _t8 = _context8.v;
          _iterator26.e(_t8);
        case 10:
          _context8.p = 10;
          _iterator26.f();
          return _context8.f(10);
        case 11:
          return _context8.a(2);
      }
    }, _callee8, null, [[4, 6], [2, 9, 10, 11]]);
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
  _addCustomFontFromData = _asyncToGenerator(_regenerator().m(function _callee9(name, dataUrl) {
    var _ref88,
      _ref88$persist,
      persist,
      uniqueName,
      value,
      _ensureFontFamilyOpti2,
      option,
      entryId,
      entry,
      persisted,
      _args9 = arguments;
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.n) {
        case 0:
          _ref88 = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : {}, _ref88$persist = _ref88.persist, persist = _ref88$persist === void 0 ? true : _ref88$persist;
          uniqueName = ensureUniqueCustomFontName(name);
          value = buildFontFamilyValue(uniqueName);
          _ensureFontFamilyOpti2 = ensureFontFamilyOption(value, uniqueName, localFontsGroup, 'uploaded'), option = _ensureFontFamilyOpti2.option;
          if (option) {
            _context9.n = 1;
            break;
          }
          return _context9.a(2, {
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
          _context9.n = 2;
          return registerCustomFontSource(uniqueName, dataUrl, entryId);
        case 2:
          persisted = true;
          if (persist && !persistCustomFontsToStorage()) {
            persisted = false;
          }
          return _context9.a(2, {
            name: uniqueName,
            value: value,
            persisted: persisted
          });
      }
    }, _callee9);
  }));
  return _addCustomFontFromData.apply(this, arguments);
}
function handleLocalFontFiles(_x7) {
  return _handleLocalFontFiles.apply(this, arguments);
}
function _handleLocalFontFiles() {
  _handleLocalFontFiles = _asyncToGenerator(_regenerator().m(function _callee0(fileList) {
    var added, unsupported, failed, persistFailure, _i23, _Array$from, file, dataUrl, result, message, _message5, _message6, _t9;
    return _regenerator().w(function (_context0) {
      while (1) switch (_context0.p = _context0.n) {
        case 0:
          if (!(!fileList || fileList.length === 0)) {
            _context0.n = 1;
            break;
          }
          setLocalFontsStatus('localFontsNoFonts');
          return _context0.a(2);
        case 1:
          if (localFontsButton) {
            localFontsButton.disabled = true;
          }
          added = [];
          unsupported = [];
          failed = [];
          persistFailure = false;
          _i23 = 0, _Array$from = Array.from(fileList);
        case 2:
          if (!(_i23 < _Array$from.length)) {
            _context0.n = 9;
            break;
          }
          file = _Array$from[_i23];
          if (isSupportedFontFile(file)) {
            _context0.n = 3;
            break;
          }
          unsupported.push(file && typeof file.name === 'string' ? file.name : '');
          return _context0.a(3, 8);
        case 3:
          _context0.p = 3;
          _context0.n = 4;
          return readFileAsDataURL(file);
        case 4:
          dataUrl = _context0.v;
          if (dataUrl) {
            _context0.n = 5;
            break;
          }
          failed.push(file && file.name ? file.name : '');
          return _context0.a(3, 8);
        case 5:
          _context0.n = 6;
          return addCustomFontFromData(deriveFontNameFromFile(file), dataUrl);
        case 6:
          result = _context0.v;
          added.push(result);
          if (!result.persisted) {
            persistFailure = true;
          }
          _context0.n = 8;
          break;
        case 7:
          _context0.p = 7;
          _t9 = _context0.v;
          console.warn('Failed to import custom font', _t9);
          failed.push(file && typeof file.name === 'string' ? file.name : '');
        case 8:
          _i23++;
          _context0.n = 2;
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
            _message5 = getLocalizedText('localFontsUnsupportedFiles');
            if (_message5) {
              showNotification('warning', _message5.replace('%s', unsupported.join(', ')));
            }
          }
          if (failed.length > 0) {
            _message6 = getLocalizedText('localFontsError');
            if (_message6) {
              showNotification('error', _message6);
            }
          }
          if (localFontsButton) {
            localFontsButton.disabled = false;
          }
        case 10:
          return _context0.a(2);
      }
    }, _callee0, null, [[3, 7]]);
  }));
  return _handleLocalFontFiles.apply(this, arguments);
}
function normalizeFontResults(_x8) {
  return _normalizeFontResults.apply(this, arguments);
}
function _normalizeFontResults() {
  _normalizeFontResults = _asyncToGenerator(_regenerator().m(function _callee1(result) {
    var hasSymbol, asyncIteratorSymbol, fonts, _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, font, iteratorSymbol, _t0;
    return _regenerator().w(function (_context1) {
      while (1) switch (_context1.p = _context1.n) {
        case 0:
          if (result) {
            _context1.n = 1;
            break;
          }
          return _context1.a(2, []);
        case 1:
          if (!Array.isArray(result)) {
            _context1.n = 2;
            break;
          }
          return _context1.a(2, result);
        case 2:
          hasSymbol = typeof Symbol === 'function';
          asyncIteratorSymbol = hasSymbol && Symbol.asyncIterator;
          if (!(asyncIteratorSymbol && typeof result[asyncIteratorSymbol] === 'function')) {
            _context1.n = 15;
            break;
          }
          fonts = [];
          _iteratorAbruptCompletion = false;
          _didIteratorError = false;
          _context1.p = 3;
          _iterator = _asyncIterator(result);
        case 4:
          _context1.n = 5;
          return _iterator.next();
        case 5:
          if (!(_iteratorAbruptCompletion = !(_step = _context1.v).done)) {
            _context1.n = 7;
            break;
          }
          font = _step.value;
          fonts.push(font);
        case 6:
          _iteratorAbruptCompletion = false;
          _context1.n = 4;
          break;
        case 7:
          _context1.n = 9;
          break;
        case 8:
          _context1.p = 8;
          _t0 = _context1.v;
          _didIteratorError = true;
          _iteratorError = _t0;
        case 9:
          _context1.p = 9;
          _context1.p = 10;
          if (!(_iteratorAbruptCompletion && _iterator.return != null)) {
            _context1.n = 11;
            break;
          }
          _context1.n = 11;
          return _iterator.return();
        case 11:
          _context1.p = 11;
          if (!_didIteratorError) {
            _context1.n = 12;
            break;
          }
          throw _iteratorError;
        case 12:
          return _context1.f(11);
        case 13:
          return _context1.f(9);
        case 14:
          return _context1.a(2, fonts);
        case 15:
          iteratorSymbol = hasSymbol && Symbol.iterator;
          if (!(iteratorSymbol && typeof result[iteratorSymbol] === 'function')) {
            _context1.n = 16;
            break;
          }
          return _context1.a(2, Array.from(result));
        case 16:
          return _context1.a(2, []);
      }
    }, _callee1, null, [[10,, 11, 13], [3, 8, 9, 14]]);
  }));
  return _normalizeFontResults.apply(this, arguments);
}
var queryAvailableLocalFonts = function () {
  if (typeof window === 'undefined') return null;
  if (typeof window.queryLocalFonts === 'function') {
    return function () {
      var _ref65 = _asyncToGenerator(_regenerator().m(function _callee(options) {
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
        return _ref65.apply(this, arguments);
      };
    }();
  }
  if (typeof navigator !== 'undefined' && navigator && navigator.fonts && typeof navigator.fonts.query === 'function') {
    var _navigator = navigator,
      fonts = _navigator.fonts;
    return function () {
      var _ref66 = _asyncToGenerator(_regenerator().m(function _callee2(options) {
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
        return _ref66.apply(this, arguments);
      };
    }();
  }
  return null;
}();
var supportsLocalFonts = typeof queryAvailableLocalFonts === 'function';
var canUploadFontFiles = !!(localFontsInput && typeof window !== 'undefined' && typeof window.FileReader === 'function' && typeof localFontsInput.click === 'function');
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
  _requestLocalFonts = _asyncToGenerator(_regenerator().m(function _callee10() {
    var fonts, added, duplicates, seenValues, _iterator27, _step27, font, rawName, name, _value11, _ensureFontFamilyOpti3, option, created, _t1, _t10;
    return _regenerator().w(function (_context10) {
      while (1) switch (_context10.p = _context10.n) {
        case 0:
          if (!(!supportsLocalFonts || !localFontsButton || !queryAvailableLocalFonts)) {
            _context10.n = 1;
            break;
          }
          return _context10.a(2);
        case 1:
          localFontsButton.disabled = true;
          _context10.p = 2;
          _context10.n = 3;
          return queryAvailableLocalFonts();
        case 3:
          fonts = _context10.v;
          if (!(!Array.isArray(fonts) || fonts.length === 0)) {
            _context10.n = 4;
            break;
          }
          setLocalFontsStatus('localFontsNoFonts');
          return _context10.a(2);
        case 4:
          added = [];
          duplicates = [];
          seenValues = new Set();
          _iterator27 = _createForOfIteratorHelper(fonts);
          _context10.p = 5;
          _iterator27.s();
        case 6:
          if ((_step27 = _iterator27.n()).done) {
            _context10.n = 11;
            break;
          }
          font = _step27.value;
          rawName = font && (font.family || font.fullName || font.postscriptName);
          name = rawName ? String(rawName).trim() : '';
          if (name) {
            _context10.n = 7;
            break;
          }
          return _context10.a(3, 10);
        case 7:
          _value11 = buildFontFamilyValue(name);
          if (!seenValues.has(_value11)) {
            _context10.n = 8;
            break;
          }
          duplicates.push(name);
          return _context10.a(3, 10);
        case 8:
          _ensureFontFamilyOpti3 = ensureFontFamilyOption(_value11, name, localFontsGroup, 'local'), option = _ensureFontFamilyOpti3.option, created = _ensureFontFamilyOpti3.created;
          if (option) {
            _context10.n = 9;
            break;
          }
          return _context10.a(3, 10);
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
          _context10.n = 6;
          break;
        case 11:
          _context10.n = 13;
          break;
        case 12:
          _context10.p = 12;
          _t1 = _context10.v;
          _iterator27.e(_t1);
        case 13:
          _context10.p = 13;
          _iterator27.f();
          return _context10.f(13);
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
          _context10.n = 16;
          break;
        case 15:
          _context10.p = 15;
          _t10 = _context10.v;
          console.error('Could not access local fonts', _t10);
          if (_t10 && (_t10.name === 'NotAllowedError' || _t10.name === 'SecurityError') && canUploadFontFiles) {
            setLocalFontsStatus('localFontsPermissionNeeded');
          } else {
            setLocalFontsStatus('localFontsError');
          }
        case 16:
          _context10.p = 16;
          localFontsButton.disabled = false;
          return _context10.f(16);
        case 17:
          return _context10.a(2);
      }
    }, _callee10, null, [[5, 12, 13, 14], [2, 15, 16, 17]]);
  }));
  return _requestLocalFonts.apply(this, arguments);
}
if (localFontsButton) {
  if (supportsLocalFonts || canUploadFontFiles) {
    localFontsButton.removeAttribute('hidden');
    localFontsButton.addEventListener('click', function () {
      if (supportsLocalFonts) {
        requestLocalFonts();
      } else if (canUploadFontFiles && localFontsInput) {
        localFontsInput.click();
      }
    });
    if (!supportsLocalFonts && canUploadFontFiles) {
      setLocalFontsStatus('localFontsFileFallback');
    }
  } else {
    setLocalFontsStatus('localFontsUnsupported');
  }
}
if (localFontsInput) {
  localFontsInput.addEventListener('change', function () {
    if (localFontsInput.files && localFontsInput.files.length > 0) {
      handleLocalFontFiles(localFontsInput.files);
    } else {
      setLocalFontsStatus('localFontsNoFonts');
    }
    try {
      localFontsInput.value = '';
    } catch (_unused16) {}
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
  var _iterator23 = _createForOfIteratorHelper(uiScaleProperties),
    _step23;
  try {
    for (_iterator23.s(); !(_step23 = _iterator23.n()).done;) {
      var _prop = _step23.value;
      var baseValue = baseUIScaleValues[_prop];
      if (!Number.isFinite(baseValue) || baseValue <= 0) continue;
      document.documentElement.style.setProperty(_prop, "".concat(baseValue * scale, "px"));
    }
  } catch (err) {
    _iterator23.e(err);
  } finally {
    _iterator23.f();
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
  if (!featureList) return;
  featureMap.clear();
  helpMap.clear();
  deviceMap.clear();
  featureSearchEntries = [];
  featureSearchDefaultOptions = [];
  var registerOption = function registerOption(value) {
    if (value) featureSearchDefaultOptions.push(value);
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
    registerOption(display);
    featureSearchEntries.push({
      type: 'feature',
      key: entry.key,
      display: display,
      tokens: Array.isArray(entry.tokens) ? entry.tokens : [],
      value: entry
    });
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
      var helpEntry = {
        section: section,
        label: label,
        tokens: tokens
      };
      helpMap.set(key, helpEntry);
      var optionValue = "".concat(label, " (help)");
      registerOption(optionValue);
      featureSearchEntries.push({
        type: 'help',
        key: key,
        display: optionValue,
        tokens: tokens,
        value: helpEntry
      });
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
        var deviceEntry = {
          select: sel,
          value: opt.value,
          label: name,
          tokens: tokens
        };
        deviceMap.set(key, deviceEntry);
        registerOption(name);
        featureSearchEntries.push({
          type: 'device',
          key: key,
          display: name,
          tokens: tokens,
          value: deviceEntry
        });
      }
    });
  });
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
      var infoForDialog = currentProjectInfo ? _objectSpread({}, currentProjectInfo) : projectForm ? collectProjectFormData() : {};
      if (projectForm) {
        populateProjectForm(infoForDialog || {});
      }
      openDialog(projectDialog);
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
  var _iterator24 = _createForOfIteratorHelper(overviewCandidates),
    _step24;
  try {
    for (_iterator24.s(); !(_step24 = _iterator24.n()).done;) {
      var label = _step24.value;
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
    _iterator24.e(err);
  } finally {
    _iterator24.f();
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
if (typeof global !== 'undefined') {
  global.splitGearListHtml = splitGearListHtml;
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
        var _value1 = attribute.value || '';
        var parts = name === 'srcset' ? _value1.split(',').map(function (part) {
          return part.trim().split(/\s+/)[0];
        }).filter(Boolean) : [_value1];
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
          for (var _i21 = 0, _Object$entries13 = Object.entries(node); _i21 < _Object$entries13.length; _i21++) {
            var _Object$entries13$_i = _slicedToArray(_Object$entries13[_i21], 2),
              _key9 = _Object$entries13$_i[0],
              _value10 = _Object$entries13$_i[1];
            if (!isPlainObjectValue(_value10)) continue;
            var _result = _search(_value10, path.concat(_key9));
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
      var buildGearItemHelp = function buildGearItemHelp(_ref67) {
        var name = _ref67.name,
          countText = _ref67.countText,
          deviceInfo = _ref67.deviceInfo,
          libraryCategory = _ref67.libraryCategory,
          tableCategory = _ref67.tableCategory;
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
          var summary = safeGenerateConnectorSummary(deviceInfo);
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
  if (typeof updateAutoGearHighlightToggleButton === 'function') {
    updateAutoGearHighlightToggleButton();
  }
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
var currentProjectInfo = null;
var loadedSetupState = null;
var loadedSetupStateSignature = '';
var restoringSession = false;
var skipNextGearListRefresh = false;
var defaultProjectInfoSnapshot = null;
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
  Object.entries(info).forEach(function (_ref68) {
    var _ref69 = _slicedToArray(_ref68, 2),
      key = _ref69[0],
      value = _ref69[1];
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
function stableStringify(value) {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (Array.isArray(value)) {
    return "[".concat(value.map(function (item) {
      return stableStringify(item);
    }).join(','), "]");
  }
  if (_typeof(value) === 'object') {
    var keys = Object.keys(value).sort();
    var entries = keys.map(function (key) {
      return "".concat(JSON.stringify(key), ":").concat(stableStringify(value[key]));
    });
    return "{".concat(entries.join(','), "}");
  }
  return JSON.stringify(value);
}
function computeSetupSignature(state) {
  if (!state) return '';
  return [state.camera || '', state.monitor || '', state.video || '', state.cage || '', stableStringify(state.motors || []), stableStringify(state.controllers || []), state.distance || '', state.batteryPlate || '', state.battery || '', state.batteryHotswap || '', state.sliderBowl || '', state.easyrig || '', stableStringify(state.projectInfo || null), stableStringify(state.autoGearRules || null), stableStringify(state.diagramPositions || null)].join('||');
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
  var _feedbackCancelBtn$te, _texts$currentLang89, _texts$en290;
  var cancelLabel = ((_feedbackCancelBtn$te = feedbackCancelBtn.textContent) === null || _feedbackCancelBtn$te === void 0 ? void 0 : _feedbackCancelBtn$te.trim()) || ((_texts$currentLang89 = texts[currentLang]) === null || _texts$currentLang89 === void 0 ? void 0 : _texts$currentLang89.cancelEditBtn) || ((_texts$en290 = texts.en) === null || _texts$en290 === void 0 ? void 0 : _texts$en290.cancelEditBtn) || 'Cancel';
  setButtonLabelWithIcon(feedbackCancelBtn, cancelLabel, ICON_GLYPHS.circleX);
}
if (feedbackUseLocationBtn) {
  var _feedbackUseLocationB;
  var locationLabel = ((_feedbackUseLocationB = feedbackUseLocationBtn.textContent) === null || _feedbackUseLocationB === void 0 ? void 0 : _feedbackUseLocationB.trim()) || 'Use Current Location';
  setButtonLabelWithIcon(feedbackUseLocationBtn, locationLabel, ICON_GLYPHS.pin);
}
if (feedbackSubmitBtn) {
  var _feedbackSubmitBtn$te, _texts$currentLang90, _texts$en291;
  var submitLabel = ((_feedbackSubmitBtn$te = feedbackSubmitBtn.textContent) === null || _feedbackSubmitBtn$te === void 0 ? void 0 : _feedbackSubmitBtn$te.trim()) || ((_texts$currentLang90 = texts[currentLang]) === null || _texts$currentLang90 === void 0 ? void 0 : _texts$currentLang90.feedbackSubmit) || ((_texts$en291 = texts.en) === null || _texts$en291 === void 0 ? void 0 : _texts$en291.feedbackSubmit) || 'Save & Submit';
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
var manualPositions = {};
var lastDiagramPositions = {};
function normalizeDiagramPositionsInput(positions) {
  if (!positions || _typeof(positions) !== 'object') {
    return {};
  }
  var normalized = {};
  Object.entries(positions).forEach(function (_ref70) {
    var _ref71 = _slicedToArray(_ref70, 2),
      id = _ref71[0],
      value = _ref71[1];
    if (!value || _typeof(value) !== 'object') return;
    var x = Number(value.x);
    var y = Number(value.y);
    if (!Number.isFinite(x) || !Number.isFinite(y)) return;
    normalized[id] = {
      x: x,
      y: y
    };
  });
  return normalized;
}
function getDiagramManualPositions() {
  return normalizeDiagramPositionsInput(manualPositions);
}
function setManualDiagramPositions(positions) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  manualPositions = normalizeDiagramPositionsInput(positions);
  if (options && options.render === false) {
    return;
  }
  if (typeof renderSetupDiagram === 'function') {
    renderSetupDiagram();
  }
}
var gridSnap = false;
var cleanupDiagramInteractions = null;
var diagramCssLight = "\n.node-box{fill:#f0f0f0;stroke:none;}\n.node-box.first-fiz{stroke:none;}\n.first-fiz-highlight{stroke:url(#firstFizGrad);stroke-width:1px;fill:none;}\n.node-icon{font-size:var(--font-size-diagram-icon, 24px);font-family:'UiconsThinStraightV2',system-ui,sans-serif;font-style:normal;}\n.node-icon[data-icon-font='essential']{font-family:'EssentialIconsV2',system-ui,sans-serif;}\n.conn{stroke:none;}\n.conn.red{fill:#d33;}\n.conn.blue{fill:#369;}\n.conn.green{fill:#090;}\ntext{font-family:system-ui,sans-serif;}\n.edge-label{font-size:var(--font-size-diagram-label, 11px);}\nline{stroke:#333;stroke-width:2px;}\npath.edge-path{stroke:#333;stroke-width:2px;fill:none;}\npath.power{stroke:#d33;}\npath.video{stroke:#369;}\npath.fiz{stroke:#090;}\n.diagram-placeholder{font-style:italic;color:#666;margin:0;}\n";
var diagramCssDark = "\n.node-box{fill:#444;stroke:none;}\n.node-box.first-fiz{stroke:none;}\n.first-fiz-highlight{stroke:url(#firstFizGrad);}\n.node-icon{font-size:var(--font-size-diagram-icon, 24px);font-family:'UiconsThinStraightV2',system-ui,sans-serif;font-style:normal;}\n.node-icon[data-icon-font='essential']{font-family:'EssentialIconsV2',system-ui,sans-serif;}\ntext{fill:#fff;font-family:system-ui,sans-serif;}\n.edge-label{font-size:var(--font-size-diagram-label, 11px);}\nline{stroke:#fff;}\npath.edge-path{stroke:#fff;}\npath.power{stroke:#ff6666;}\npath.video{stroke:#7ec8ff;}\npath.fiz{stroke:#6f6;}\n.conn.red{fill:#ff6666;}\n.conn.blue{fill:#7ec8ff;}\n.conn.green{fill:#6f6;}\n.diagram-placeholder{color:#bbb;}\n";
function getDiagramCss() {
  var includeDark = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  return diagramCssLight + (includeDark ? "@media (prefers-color-scheme: dark){".concat(diagramCssDark, "}") : '');
}
var DIAGRAM_BATTERY_ICON = iconGlyph("\uE1A6");
var DIAGRAM_CAMERA_ICON = iconGlyph("\uE333");
var DIAGRAM_MONITOR_ICON = iconGlyph("\uEFFC");
var DIAGRAM_VIEWFINDER_ICON = iconGlyph("\uE338");
var DIAGRAM_VIDEO_ICON = iconGlyph("\uF42A");
var DIAGRAM_WIRELESS_ICON = iconGlyph("\uF4AC");
var DIAGRAM_MOTORS_ICON = iconGlyph("\uE8AF", ICON_FONT_KEYS.UICONS);
var DIAGRAM_CONTROLLER_ICON = iconGlyph("\uE52A");
var DIAGRAM_DISTANCE_ICON = iconGlyph("\uEFB9");
var DIAGRAM_POWER_OUTPUT_ICON = iconGlyph("\uE212");
var DIAGRAM_POWER_INPUT_ICON = iconGlyph("\uEE71");
var DIAGRAM_TIMECODE_ICON = iconGlyph("\uE46F");
var DIAGRAM_AUDIO_IN_ICON = iconGlyph("\uE6B7");
var DIAGRAM_AUDIO_OUT_ICON = iconGlyph("\uECB5");
var DIAGRAM_AUDIO_IO_ICON = iconGlyph("\uF487");
var diagramConnectorIcons = Object.freeze({
  powerOut: DIAGRAM_POWER_OUTPUT_ICON,
  powerIn: DIAGRAM_POWER_INPUT_ICON,
  fiz: DIAGRAM_MOTORS_ICON,
  video: DIAGRAM_VIDEO_ICON,
  timecode: DIAGRAM_TIMECODE_ICON,
  audioIn: DIAGRAM_AUDIO_IN_ICON,
  audioOut: DIAGRAM_AUDIO_OUT_ICON,
  audioIo: DIAGRAM_AUDIO_IO_ICON,
  torque: DIAGRAM_MOTORS_ICON,
  controller: DIAGRAM_CONTROLLER_ICON,
  powerSpec: DIAGRAM_POWER_OUTPUT_ICON,
  powerSource: DIAGRAM_POWER_INPUT_ICON
});
var diagramIcons = {
  battery: DIAGRAM_BATTERY_ICON,
  camera: DIAGRAM_CAMERA_ICON,
  monitor: DIAGRAM_MONITOR_ICON,
  viewfinder: DIAGRAM_VIEWFINDER_ICON,
  video: DIAGRAM_WIRELESS_ICON,
  motors: DIAGRAM_MOTORS_ICON,
  controllers: DIAGRAM_CONTROLLER_ICON,
  handle: DIAGRAM_CONTROLLER_ICON,
  distance: DIAGRAM_DISTANCE_ICON
};
var overviewSectionIcons = {
  category_batteries: diagramIcons.battery,
  category_batteryHotswaps: diagramIcons.battery,
  category_cameras: diagramIcons.camera,
  category_viewfinders: diagramIcons.viewfinder,
  category_monitors: diagramIcons.monitor,
  category_video: diagramIcons.video,
  category_fiz_motors: diagramIcons.motors,
  category_fiz_controllers: diagramIcons.controllers,
  category_fiz_distance: diagramIcons.distance
};
var cameraProjectLegendIcon = document.getElementById('cameraProjectLegendIcon');
if (cameraProjectLegendIcon) {
  applyIconGlyph(cameraProjectLegendIcon, DIAGRAM_CAMERA_ICON);
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
  var _devices$fiz12;
  var types = new Set();
  Object.values(((_devices$fiz12 = devices.fiz) === null || _devices$fiz12 === void 0 ? void 0 : _devices$fiz12.motors) || {}).forEach(function (m) {
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
  var _devices$fiz13;
  var types = new Set();
  Object.values(((_devices$fiz13 = devices.fiz) === null || _devices$fiz13 === void 0 ? void 0 : _devices$fiz13.controllers) || {}).forEach(function (c) {
    if (c && Array.isArray(c.fizConnectors)) {
      c.fizConnectors.forEach(function (fc) {
        if (fc && fc.type) types.add(fc.type);
      });
    }
  });
  return Array.from(types).filter(Boolean).sort(localeSort);
}
function getAllControllerPowerSources() {
  var _devices$fiz14;
  var types = new Set();
  Object.values(((_devices$fiz14 = devices.fiz) === null || _devices$fiz14 === void 0 ? void 0 : _devices$fiz14.controllers) || {}).forEach(function (c) {
    if (c && c.powerSource) types.add(c.powerSource);
  });
  return Array.from(types).filter(Boolean).sort(localeSort);
}
function getAllControllerBatteryTypes() {
  var _devices$fiz15;
  var types = new Set();
  Object.values(((_devices$fiz15 = devices.fiz) === null || _devices$fiz15 === void 0 ? void 0 : _devices$fiz15.controllers) || {}).forEach(function (c) {
    if (c && c.batteryType) types.add(c.batteryType);
  });
  return Array.from(types).filter(Boolean).sort(localeSort);
}
function getAllControllerConnectivity() {
  var _devices$fiz16;
  var types = new Set();
  Object.values(((_devices$fiz16 = devices.fiz) === null || _devices$fiz16 === void 0 ? void 0 : _devices$fiz16.controllers) || {}).forEach(function (c) {
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
  var _devices$fiz17;
  var types = new Set();
  Object.values(((_devices$fiz17 = devices.fiz) === null || _devices$fiz17 === void 0 ? void 0 : _devices$fiz17.distance) || {}).forEach(function (d) {
    if (d && d.connectionCompatibility) types.add(d.connectionCompatibility);
  });
  return Array.from(types).filter(Boolean).sort(localeSort);
}
function getAllDistanceMethods() {
  var _devices$fiz18;
  var types = new Set();
  Object.values(((_devices$fiz18 = devices.fiz) === null || _devices$fiz18 === void 0 ? void 0 : _devices$fiz18.distance) || {}).forEach(function (d) {
    if (d && d.measurementMethod) types.add(d.measurementMethod);
  });
  return Array.from(types).filter(Boolean).sort(localeSort);
}
function getAllDistanceDisplays() {
  var _devices$fiz19;
  var types = new Set();
  Object.values(((_devices$fiz19 = devices.fiz) === null || _devices$fiz19 === void 0 ? void 0 : _devices$fiz19.distance) || {}).forEach(function (d) {
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
function updateRecordingMediaOptions() {
  recordingMediaOptions = getAllRecordingMedia();
  document.querySelectorAll('.recording-media-select').forEach(function (sel) {
    var cur = sel.value;
    sel.innerHTML = '';
    addEmptyOption(sel);
    recordingMediaOptions.forEach(function (optVal) {
      var opt = document.createElement('option');
      opt.value = optVal;
      opt.textContent = optVal;
      sel.appendChild(opt);
    });
    if (recordingMediaOptions.includes(cur)) sel.value = cur;
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
  addEmptyOption(select);
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
function setRecordingMedia(list) {
  cameraMediaContainer.innerHTML = '';
  var filtered = filterNoneEntries(list);
  if (filtered.length) {
    filtered.forEach(function (item) {
      var _ref72 = item || {},
        _ref72$type = _ref72.type,
        type = _ref72$type === void 0 ? '' : _ref72$type,
        _ref72$notes = _ref72.notes,
        notes = _ref72$notes === void 0 ? '' : _ref72$notes;
      cameraMediaContainer.appendChild(createRecordingMediaRow(type, notes));
    });
  } else {
    cameraMediaContainer.appendChild(createRecordingMediaRow());
  }
}
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
function clearRecordingMedia() {
  setRecordingMedia([]);
}
function powerInputTypes(dev) {
  var _dev$power3;
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
  var inp = (_dev$power3 = dev.power) === null || _dev$power3 === void 0 ? void 0 : _dev$power3.input;
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
  var _devices$fiz20, _devices$fiz21, _devices$fiz22;
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
  Object.values(((_devices$fiz20 = devices.fiz) === null || _devices$fiz20 === void 0 ? void 0 : _devices$fiz20.motors) || {}).forEach(function (m) {
    return powerInputTypes(m).forEach(function (t) {
      return types.add(t);
    });
  });
  Object.values(((_devices$fiz21 = devices.fiz) === null || _devices$fiz21 === void 0 ? void 0 : _devices$fiz21.controllers) || {}).forEach(function (c) {
    return powerInputTypes(c).forEach(function (t) {
      return types.add(t);
    });
  });
  Object.values(((_devices$fiz22 = devices.fiz) === null || _devices$fiz22 === void 0 ? void 0 : _devices$fiz22.distance) || {}).forEach(function (d) {
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
    var _cam$power3;
    var list = (_cam$power3 = cam.power) === null || _cam$power3 === void 0 ? void 0 : _cam$power3.batteryPlateSupport;
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
function setBatteryPlates(list) {
  batteryPlatesContainer.innerHTML = '';
  var filtered = filterNoneEntries(list);
  if (filtered.length) {
    filtered.forEach(function (item) {
      var _ref73 = item || {},
        _ref73$type = _ref73.type,
        type = _ref73$type === void 0 ? '' : _ref73$type,
        _ref73$mount = _ref73.mount,
        mount = _ref73$mount === void 0 ? 'native' : _ref73$mount,
        _ref73$notes = _ref73.notes,
        notes = _ref73$notes === void 0 ? '' : _ref73$notes;
      batteryPlatesContainer.appendChild(createBatteryPlateRow(type, mount, notes));
    });
  } else {
    batteryPlatesContainer.appendChild(createBatteryPlateRow());
  }
}
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
function clearBatteryPlates() {
  setBatteryPlates([]);
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
    var _opt4 = document.createElement('option');
    _opt4.value = connector;
    _opt4.textContent = connector;
    connSelect.appendChild(_opt4);
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
      var _ref74 = item || {},
        _ref74$type = _ref74.type,
        type = _ref74$type === void 0 ? '' : _ref74$type,
        _ref74$resolution = _ref74.resolution,
        resolution = _ref74$resolution === void 0 ? '' : _ref74$resolution,
        _ref74$connector = _ref74.connector,
        connector = _ref74$connector === void 0 ? '' : _ref74$connector,
        _ref74$notes = _ref74.notes,
        notes = _ref74$notes === void 0 ? '' : _ref74$notes;
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
      var _ref75 = item || {},
        _ref75$type = _ref75.type,
        type = _ref75$type === void 0 ? '' : _ref75$type,
        _ref75$mount = _ref75.mount,
        mount = _ref75$mount === void 0 ? 'native' : _ref75$mount;
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
    var _cam$power4;
    var list = (_cam$power4 = cam.power) === null || _cam$power4 === void 0 ? void 0 : _cam$power4.powerDistributionOutputs;
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
    var _cam$power5;
    var list = (_cam$power5 = cam.power) === null || _cam$power5 === void 0 ? void 0 : _cam$power5.powerDistributionOutputs;
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
    var _cam$power6;
    var list = (_cam$power6 = cam.power) === null || _cam$power6 === void 0 ? void 0 : _cam$power6.powerDistributionOutputs;
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
    var _opt5 = document.createElement('option');
    _opt5.value = voltage;
    _opt5.textContent = voltage;
    voltSelect.appendChild(_opt5);
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
    var _opt6 = document.createElement('option');
    _opt6.value = current;
    _opt6.textContent = current;
    currSelect.appendChild(_opt6);
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
      var _ref76 = item || {},
        _ref76$type = _ref76.type,
        type = _ref76$type === void 0 ? '' : _ref76$type,
        _ref76$voltage = _ref76.voltage,
        voltage = _ref76$voltage === void 0 ? '' : _ref76$voltage,
        _ref76$current = _ref76.current,
        current = _ref76$current === void 0 ? '' : _ref76$current,
        _ref76$wattage = _ref76.wattage,
        wattage = _ref76$wattage === void 0 ? '' : _ref76$wattage,
        _ref76$notes = _ref76.notes,
        notes = _ref76$notes === void 0 ? '' : _ref76$notes;
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
      var _ref77 = item || {},
        _ref77$type = _ref77.type,
        type = _ref77$type === void 0 ? '' : _ref77$type,
        _ref77$notes = _ref77.notes,
        notes = _ref77$notes === void 0 ? '' : _ref77$notes;
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
function updateFavoriteButton(selectElem) {
  if (!selectElem || !selectElem._favButton) return;
  var favVals = getFavoriteValues(selectElem.id);
  var val = selectElem.value;
  var isFav = favVals.includes(val);
  selectElem._favButton.innerHTML = iconMarkup(ICON_GLYPHS.star, 'favorite-icon');
  selectElem._favButton.classList.toggle('favorited', isFav);
  selectElem._favButton.disabled = val === 'None';
  selectElem._favButton.setAttribute('aria-pressed', isFav ? 'true' : 'false');
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
    if (!btn) return;
    if (btn._favListener) {
      btn.removeEventListener('click', btn._favListener);
      btn._favListener = null;
    }
    btn.remove();
  }
  var favoriteButton = selectElem._favButton && selectElem._favButton.isConnected ? selectElem._favButton : null;
  if (wrapper) {
    var wrapperButtons = Array.from(wrapper.querySelectorAll('.favorite-toggle'));
    if (favoriteButton && !wrapperButtons.includes(favoriteButton)) {
      favoriteButton = null;
    }
    if (!favoriteButton && wrapperButtons.length > 0) {
      favoriteButton = wrapperButtons[0];
    }
    wrapperButtons.forEach(function (btn) {
      if (btn !== favoriteButton) cleanupFavoriteButton(btn);
    });
  }
  if (gearItem) {
    Array.from(gearItem.querySelectorAll('.favorite-toggle')).filter(function (btn) {
      return btn !== favoriteButton && btn.getAttribute('data-fav-select-id') === selectElem.id;
    }).forEach(cleanupFavoriteButton);
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
  if (favoriteButton._favListener) {
    favoriteButton.removeEventListener('click', favoriteButton._favListener);
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
  favoriteButton._favListener = clickHandler;
  if (!selectElem._favChangeListener) {
    var changeListener = function changeListener() {
      return updateFavoriteButton(selectElem);
    };
    selectElem.addEventListener('change', changeListener);
    selectElem._favChangeListener = changeListener;
  }
  selectElem._favButton = favoriteButton;
  selectElem._favInit = true;
  if (selectElem._favButton) {
    selectElem._favButton.setAttribute('data-fav-select-id', selectElem.id);
    selectElem._favButton.setAttribute('aria-label', texts[currentLang].favoriteToggleLabel);
    selectElem._favButton.setAttribute('title', texts[currentLang].favoriteToggleLabel);
    selectElem._favButton.setAttribute('data-help', texts[currentLang].favoriteToggleHelp || texts[currentLang].favoriteToggleLabel);
  }
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
  var filtered = Object.fromEntries(Object.entries(devices.monitors || {}).filter(function (_ref78) {
    var _ref79 = _slicedToArray(_ref78, 2),
      data = _ref79[1];
    return !(data.wirelessRX && !data.wirelessTx);
  }));
  populateSelect(monitorSelect, filtered, true);
}
function getCompatibleCagesForCamera(cameraName) {
  var _devices6;
  var allCages = ((_devices6 = devices) === null || _devices6 === void 0 || (_devices6 = _devices6.accessories) === null || _devices6 === void 0 ? void 0 : _devices6.cages) || {};
  if (!cameraName || cameraName === 'None') {
    return allCages;
  }
  return Object.fromEntries(Object.entries(allCages).filter(function (_ref80) {
    var _ref81 = _slicedToArray(_ref80, 2),
      cage = _ref81[1];
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
function applyFilters() {
  deviceManagerLists.forEach(function (_ref82) {
    var list = _ref82.list,
      filterInput = _ref82.filterInput;
    if (!list) return;
    var value = filterInput ? filterInput.value : '';
    filterDeviceList(list, value);
  });
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
setBatteryPlates([]);
setRecordingMedia([]);
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
function renderTemperatureNote(baseHours) {
  var container = document.getElementById("temperatureNote");
  if (!container) return;
  var heading = texts[currentLang].temperatureNoteHeading;
  var html = "<p>".concat(heading, "</p>");
  if (!baseHours || !isFinite(baseHours)) {
    container.innerHTML = html;
    return;
  }
  var temperatureHeader = getTemperatureColumnLabelForLang(currentLang, temperatureUnit);
  html += "<table><tr><th>".concat(temperatureHeader, "</th><th>").concat(texts[currentLang].runtimeLabel, "</th><th>").concat(texts[currentLang].batteryCountTempLabel, "</th></tr>");
  TEMPERATURE_SCENARIOS.forEach(function (scenario) {
    var runtime = baseHours * scenario.factor;
    var runtimeCell = Number.isFinite(runtime) ? runtime.toFixed(2) : '0.00';
    var batteries = '–';
    if (Number.isFinite(runtime) && runtime > 0) {
      batteries = Math.ceil(10 / runtime);
    }
    var temperatureCell = formatTemperatureForDisplay(scenario.celsius);
    html += "<tr><td style=\"color:".concat(scenario.color, "\">").concat(temperatureCell, "</td><td>").concat(runtimeCell, "</td><td>").concat(batteries, "</td></tr>");
  });
  html += "</table>";
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
  var labelTextElem = document.getElementById('fbTemperatureLabelText');
  var labelElem = document.getElementById('fbTemperatureLabel');
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
  var _ref83 = options || {},
    _ref83$persist = _ref83.persist,
    persist = _ref83$persist === void 0 ? true : _ref83$persist,
    _ref83$reRender = _ref83.reRender,
    reRender = _ref83$reRender === void 0 ? true : _ref83$reRender,
    _ref83$forceUpdate = _ref83.forceUpdate,
    forceUpdate = _ref83$forceUpdate === void 0 ? false : _ref83$forceUpdate;
  if (!forceUpdate && temperatureUnit === normalized) {
    return;
  }
  temperatureUnit = normalized;
  if (persist && typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(TEMPERATURE_STORAGE_KEY, temperatureUnit);
    } catch (error) {
      console.warn('Could not save temperature unit preference', error);
    }
  }
  if (typeof settingsTemperatureUnit !== 'undefined' && settingsTemperatureUnit) {
    settingsTemperatureUnit.value = temperatureUnit;
  }
  if (reRender) {
    updateFeedbackTemperatureLabel();
    updateFeedbackTemperatureOptions();
    renderTemperatureNote(lastRuntimeHours);
  }
}
function updateCalculations() {
  var camera = cameraSelect.value;
  var monitor = monitorSelect.value;
  var video = videoSelect.value;
  var motors = motorSelects.map(function (sel) {
    return sel.value;
  });
  var controllers = controllerSelects.map(function (sel) {
    return sel.value;
  });
  var distance = distanceSelect.value;
  var battery = batterySelect.value;
  var cameraW = 0;
  if (devices.cameras[camera] !== undefined) {
    var camData = devices.cameras[camera];
    cameraW = _typeof(camData) === 'object' ? camData.powerDrawWatts || 0 : camData;
  }
  var monitorW = 0;
  if (devices.monitors[monitor] !== undefined) {
    var mData = devices.monitors[monitor];
    monitorW = _typeof(mData) === 'object' ? mData.powerDrawWatts || 0 : mData;
  }
  var videoW = 0;
  if (devices.video[video] !== undefined) {
    var vData = devices.video[video];
    videoW = _typeof(vData) === 'object' ? vData.powerDrawWatts || 0 : vData;
  }
  var motorsW = 0;
  motors.forEach(function (m) {
    if (devices.fiz.motors[m] !== undefined) {
      var d = devices.fiz.motors[m];
      motorsW += _typeof(d) === 'object' ? d.powerDrawWatts || 0 : d;
    }
  });
  var controllersW = 0;
  controllers.forEach(function (c) {
    if (devices.fiz.controllers[c] !== undefined) {
      var d = devices.fiz.controllers[c];
      controllersW += _typeof(d) === 'object' ? d.powerDrawWatts || 0 : d;
    }
  });
  var distanceW = 0;
  if (devices.fiz.distance[distance] !== undefined) {
    var d = devices.fiz.distance[distance];
    distanceW = _typeof(d) === 'object' ? d.powerDrawWatts || 0 : d;
  }
  var totalWatt = cameraW + monitorW + videoW + motorsW + controllersW + distanceW;
  totalPowerElem.textContent = totalWatt.toFixed(1);
  var segments = [{
    power: cameraW,
    className: "camera",
    label: texts[currentLang].cameraLabel
  }, {
    power: monitorW,
    className: "monitor",
    label: texts[currentLang].monitorLabel
  }, {
    power: videoW,
    className: "video",
    label: texts[currentLang].videoLabel
  }, {
    power: motorsW,
    className: "motors",
    label: texts[currentLang].fizMotorsLabel
  }, {
    power: controllersW,
    className: "controllers",
    label: texts[currentLang].fizControllersLabel
  }, {
    power: distanceW,
    className: "distance",
    label: texts[currentLang].distanceLabel
  }].filter(function (s) {
    return s.power > 0;
  });
  breakdownListElem.innerHTML = "";
  if (cameraW > 0) {
    var li = document.createElement("li");
    li.innerHTML = "<strong>".concat(texts[currentLang].cameraLabel, "</strong> ").concat(cameraW.toFixed(1), " W");
    breakdownListElem.appendChild(li);
  }
  if (monitorW > 0) {
    var _li = document.createElement("li");
    _li.innerHTML = "<strong>".concat(texts[currentLang].monitorLabel, "</strong> ").concat(monitorW.toFixed(1), " W");
    breakdownListElem.appendChild(_li);
  }
  if (videoW > 0) {
    var _li2 = document.createElement("li");
    _li2.innerHTML = "<strong>".concat(texts[currentLang].videoLabel, "</strong> ").concat(videoW.toFixed(1), " W");
    breakdownListElem.appendChild(_li2);
  }
  if (motorsW > 0) {
    var _li3 = document.createElement("li");
    _li3.innerHTML = "<strong>".concat(texts[currentLang].fizMotorsLabel, "</strong> ").concat(motorsW.toFixed(1), " W");
    breakdownListElem.appendChild(_li3);
  }
  if (controllersW > 0) {
    var _li4 = document.createElement("li");
    _li4.innerHTML = "<strong>".concat(texts[currentLang].fizControllersLabel, "</strong> ").concat(controllersW.toFixed(1), " W");
    breakdownListElem.appendChild(_li4);
  }
  if (distanceW > 0) {
    var _li5 = document.createElement("li");
    _li5.innerHTML = "<strong>".concat(texts[currentLang].distanceLabel, "</strong> ").concat(distanceW.toFixed(1), " W");
    breakdownListElem.appendChild(_li5);
  }
  var bMountCam = getSelectedPlate() === 'B-Mount';
  var highV = bMountCam ? 33.6 : 14.4;
  var lowV = bMountCam ? 21.6 : 12.0;
  var totalCurrentHigh = 0;
  var totalCurrentLow = 0;
  if (totalWatt > 0) {
    totalCurrentHigh = totalWatt / highV;
    totalCurrentLow = totalWatt / lowV;
  }
  var currentHighLabel = document.getElementById("totalCurrent144Label");
  currentHighLabel.textContent = bMountCam ? texts[currentLang].totalCurrent336Label : texts[currentLang].totalCurrent144Label;
  currentHighLabel.setAttribute("data-help", bMountCam ? texts[currentLang].totalCurrent336Help : texts[currentLang].totalCurrent144Help);
  var currentLowLabel = document.getElementById("totalCurrent12Label");
  currentLowLabel.textContent = bMountCam ? texts[currentLang].totalCurrent216Label : texts[currentLang].totalCurrent12Label;
  currentLowLabel.setAttribute("data-help", bMountCam ? texts[currentLang].totalCurrent216Help : texts[currentLang].totalCurrent12Help);
  totalCurrent144Elem.textContent = totalCurrentHigh.toFixed(2);
  totalCurrent12Elem.textContent = totalCurrentLow.toFixed(2);
  updateBatteryOptions();
  battery = batterySelect.value;
  var hours = null;
  if (!battery || battery === "None" || !devices.batteries[battery]) {
    batteryLifeElem.textContent = "–";
    batteryCountElem.textContent = "–";
    setStatusMessage(pinWarnElem, '');
    setStatusLevel(pinWarnElem, null);
    setStatusMessage(dtapWarnElem, '');
    setStatusLevel(dtapWarnElem, null);
    if (hotswapWarnElem) {
      setStatusMessage(hotswapWarnElem, '');
      setStatusLevel(hotswapWarnElem, null);
    }
    closePowerWarningDialog();
    lastRuntimeHours = null;
    drawPowerDiagram(0, segments, 0);
  } else {
    var battData = devices.batteries[battery];
    var hsName = hotswapSelect.value;
    var hsData = devices.batteryHotswaps && devices.batteryHotswaps[hsName];
    var capacityWh = battData.capacity + ((hsData === null || hsData === void 0 ? void 0 : hsData.capacity) || 0);
    var maxPinA = battData.pinA;
    var maxDtapA = battData.dtapA;
    if (hsData && typeof hsData.pinA === 'number') {
      if (hsData.pinA < maxPinA) {
        setStatusMessage(hotswapWarnElem, texts[currentLang].warnHotswapLower.replace("{max}", hsData.pinA).replace("{batt}", battData.pinA));
        setStatusLevel(hotswapWarnElem, 'warning');
        maxPinA = hsData.pinA;
      } else {
        setStatusMessage(hotswapWarnElem, '');
        setStatusLevel(hotswapWarnElem, null);
      }
    } else {
      if (hotswapWarnElem) {
        setStatusMessage(hotswapWarnElem, '');
        setStatusLevel(hotswapWarnElem, null);
      }
    }
    var availableWatt = maxPinA * lowV;
    drawPowerDiagram(availableWatt, segments, maxPinA);
    totalCurrent144Elem.textContent = totalCurrentHigh.toFixed(2);
    totalCurrent12Elem.textContent = totalCurrentLow.toFixed(2);
    if (totalWatt === 0) {
      hours = Infinity;
      batteryLifeElem.textContent = "∞";
    } else {
      hours = capacityWh / totalWatt;
      batteryLifeElem.textContent = hours.toFixed(2);
    }
    lastRuntimeHours = hours;
    var batteriesNeeded = 1;
    if (Number.isFinite(hours) && hours > 0) {
      batteriesNeeded = Math.max(1, Math.ceil(10 / hours));
    }
    batteryCountElem.textContent = batteriesNeeded.toString();
    setStatusMessage(pinWarnElem, '');
    setStatusMessage(dtapWarnElem, '');
    var pinSeverity = "";
    var dtapSeverity = "";
    if (totalCurrentLow > maxPinA) {
      setStatusMessage(pinWarnElem, texts[currentLang].warnPinExceeded.replace("{current}", totalCurrentLow.toFixed(2)).replace("{max}", maxPinA));
      pinSeverity = 'danger';
    } else if (totalCurrentLow > maxPinA * 0.8) {
      setStatusMessage(pinWarnElem, texts[currentLang].warnPinNear.replace("{current}", totalCurrentLow.toFixed(2)).replace("{max}", maxPinA));
      pinSeverity = 'warning';
    }
    if (!bMountCam) {
      if (totalCurrentLow > maxDtapA) {
        setStatusMessage(dtapWarnElem, texts[currentLang].warnDTapExceeded.replace("{current}", totalCurrentLow.toFixed(2)).replace("{max}", maxDtapA));
        dtapSeverity = 'danger';
      } else if (totalCurrentLow > maxDtapA * 0.8) {
        setStatusMessage(dtapWarnElem, texts[currentLang].warnDTapNear.replace("{current}", totalCurrentLow.toFixed(2)).replace("{max}", maxDtapA));
        dtapSeverity = 'warning';
      }
    }
    var hasPinLimit = typeof maxPinA === 'number' && maxPinA > 0;
    var pinsInsufficient = !hasPinLimit || totalCurrentLow > maxPinA;
    var hasDtapRating = typeof maxDtapA === 'number' && maxDtapA > 0;
    var dtapAllowed = !bMountCam && hasDtapRating;
    var dtapInsufficient = !dtapAllowed || hasDtapRating && totalCurrentLow > maxDtapA;
    if (totalCurrentLow > 0 && pinsInsufficient && dtapInsufficient) {
      var option = batterySelect && batterySelect.options ? batterySelect.options[batterySelect.selectedIndex] : null;
      var labelText = option && typeof option.textContent === 'string' ? option.textContent.trim() : String(battery || '');
      showPowerWarningDialog({
        batteryName: labelText,
        current: totalCurrentLow,
        hasPinLimit: hasPinLimit,
        pinLimit: hasPinLimit ? maxPinA : null,
        hasDtapRating: hasDtapRating,
        dtapLimit: hasDtapRating ? maxDtapA : null,
        dtapAllowed: dtapAllowed
      });
    } else {
      closePowerWarningDialog();
    }
    if (pinWarnElem.textContent === "") {
      setStatusMessage(pinWarnElem, texts[currentLang].pinOk.replace("{max}", maxPinA));
      setStatusLevel(pinWarnElem, 'success');
    } else {
      setStatusLevel(pinWarnElem, pinSeverity || 'warning');
    }
    if (!bMountCam) {
      if (dtapWarnElem.textContent === "") {
        setStatusMessage(dtapWarnElem, texts[currentLang].dtapOk.replace("{max}", maxDtapA));
        setStatusLevel(dtapWarnElem, 'success');
      } else {
        setStatusLevel(dtapWarnElem, dtapSeverity || 'warning');
      }
    } else {
      setStatusMessage(dtapWarnElem, '');
      setStatusLevel(dtapWarnElem, null);
    }
  }
  if (totalWatt > 0) {
    var selectedBatteryName = batterySelect.value;
    var camName = cameraSelect.value;
    var plateFilter = getSelectedPlate();
    var supportsB = supportsBMountCamera(camName);
    var supportsGold = supportsGoldMountCamera(camName);
    var selectedCandidate = null;
    if (selectedBatteryName && selectedBatteryName !== "None" && devices.batteries[selectedBatteryName]) {
      var selData = devices.batteries[selectedBatteryName];
      if ((!plateFilter || selData.mount_type === plateFilter) && (supportsB || selData.mount_type !== 'B-Mount') && (supportsGold || selData.mount_type !== 'Gold-Mount')) {
        var pinOK_sel = totalCurrentLow <= selData.pinA;
        var dtapOK_sel = !bMountCam && totalCurrentLow <= selData.dtapA;
        if (pinOK_sel || dtapOK_sel) {
          var selHours = selData.capacity / totalWatt;
          var selMethod;
          if (pinOK_sel && dtapOK_sel) selMethod = "both pins and D-Tap";else if (pinOK_sel) selMethod = "pins";else selMethod = "dtap";
          selectedCandidate = {
            name: selectedBatteryName,
            hours: selHours,
            method: selMethod
          };
        }
      }
    }
    var pinsCandidates = [];
    var dtapCandidates = [];
    for (var battName in devices.batteries) {
      if (battName === "None") continue;
      if (selectedCandidate && battName === selectedCandidate.name) continue;
      var _battData = devices.batteries[battName];
      if (plateFilter && _battData.mount_type !== plateFilter) continue;
      if (!plateFilter && !supportsB && _battData.mount_type === 'B-Mount') continue;
      if (!plateFilter && !supportsGold && _battData.mount_type === 'Gold-Mount') continue;
      var canPin = totalCurrentLow <= _battData.pinA;
      var canDTap = !bMountCam && totalCurrentLow <= _battData.dtapA;
      if (canPin) {
        var _hours = _battData.capacity / totalWatt;
        var method = canDTap ? "both pins and D-Tap" : "pins";
        pinsCandidates.push({
          name: battName,
          hours: _hours,
          method: method
        });
      } else if (canDTap) {
        var _hours2 = _battData.capacity / totalWatt;
        dtapCandidates.push({
          name: battName,
          hours: _hours2,
          method: "dtap"
        });
      }
    }
    var sortByHoursThenName = function sortByHoursThenName(a, b) {
      var diff = b.hours - a.hours;
      return diff !== 0 ? diff : collator.compare(a.name, b.name);
    };
    pinsCandidates.sort(sortByHoursThenName);
    dtapCandidates.sort(sortByHoursThenName);
    var tableHtml = "<tr><th>".concat(texts[currentLang].batteryTableLabel, "</th><th>").concat(texts[currentLang].runtimeLabel, "</th><th></th></tr>");
    if ((selectedCandidate ? 1 : 0) + pinsCandidates.length + dtapCandidates.length === 0) {
      tableHtml += "<tr><td colspan=\"3\">".concat(texts[currentLang].noBatterySupports, "</td></tr>");
    } else {
      var allCandidatesForMax = (selectedCandidate ? [selectedCandidate] : []).concat(pinsCandidates, dtapCandidates);
      var maxHours = Math.max.apply(Math, _toConsumableArray(allCandidatesForMax.map(function (c) {
        return c.hours;
      }))) || 1;
      var getBarClass = function getBarClass(method) {
        return method === "pins" ? "bar bar-pins-only" : "bar";
      };
      var getMethodLabel = function getMethodLabel(method) {
        var colorMap = {
          pins: {
            var: '--warning-color',
            fallback: '#FF9800',
            text: texts[currentLang].methodPinsOnly
          },
          'both pins and D-Tap': {
            var: '--success-color',
            fallback: '#4CAF50',
            text: texts[currentLang].methodPinsAndDTap
          },
          infinite: {
            var: '--info-color',
            fallback: '#007bff',
            text: texts[currentLang].methodInfinite
          }
        };
        var entry = colorMap[method];
        if (entry) {
          var color = getCssVariableValue(entry.var, entry.fallback);
          return "<span style=\"color:".concat(color, ";\">").concat(entry.text, "</span>");
        }
        return method;
      };
      if (selectedCandidate) {
        tableHtml += "<tr class=\"selectedBatteryRow\">\n                        <td>".concat(escapeHtml(selectedCandidate.name), "</td>\n                        <td>").concat(selectedCandidate.hours.toFixed(2), "h (").concat(getMethodLabel(selectedCandidate.method), ")</td>\n                        <td>\n                          <div class=\"barContainer\">\n                            <div class=\"").concat(getBarClass(selectedCandidate.method), "\" style=\"width: ").concat(selectedCandidate.hours / maxHours * 100, "%;\"></div>\n                          </div>\n                        </td>\n                      </tr>");
      }
      pinsCandidates.forEach(function (candidate) {
        if (selectedCandidate && candidate.name === selectedCandidate.name) return;
        tableHtml += "<tr>\n                        <td>".concat(escapeHtml(candidate.name), "</td>\n                        <td>").concat(candidate.hours.toFixed(2), "h (").concat(getMethodLabel(candidate.method), ")</td>\n                        <td>\n                          <div class=\"barContainer\">\n                            <div class=\"").concat(getBarClass(candidate.method), "\" style=\"width: ").concat(candidate.hours / maxHours * 100, "%;\"></div>\n                          </div>\n                        </td>\n                      </tr>");
      });
      dtapCandidates.forEach(function (candidate) {
        if (selectedCandidate && candidate.name === selectedCandidate.name) return;
        var alreadyInPins = pinsCandidates.some(function (p) {
          return p.name === candidate.name;
        });
        if (!alreadyInPins) {
          tableHtml += "<tr>\n                            <td>".concat(escapeHtml(candidate.name), "</td>\n                            <td>").concat(candidate.hours.toFixed(2), "h (").concat(getMethodLabel(candidate.method), ")</td>\n                            <td>\n                              <div class=\"barContainer\">\n                                <div class=\"").concat(getBarClass(candidate.method), "\" style=\"width: ").concat(candidate.hours / maxHours * 100, "%;\"></div>\n                              </div>\n                            </td>\n                          </tr>");
        }
      });
    }
    batteryTableElem.innerHTML = tableHtml;
    batteryComparisonSection.style.display = "block";
  } else {
    batteryComparisonSection.style.display = "none";
  }
  var feedback = renderFeedbackTable(getCurrentSetupKey());
  if (feedback !== null) {
    var combinedRuntime = feedback.runtime;
    if (Number.isFinite(hours)) {
      combinedRuntime = (feedback.runtime * feedback.weight + hours) / (feedback.weight + 1);
    }
    batteryLifeElem.textContent = combinedRuntime.toFixed(2);
    lastRuntimeHours = combinedRuntime;
    if (batteryLifeLabelElem) {
      var label = texts[currentLang].batteryLifeLabel;
      var userNote = texts[currentLang].runtimeUserCountNote.replace('{count}', feedback.count);
      var idx = label.indexOf(')');
      if (idx !== -1) {
        label = "".concat(label.slice(0, idx), ", ").concat(userNote).concat(label.slice(idx));
      }
      batteryLifeLabelElem.textContent = label;
      batteryLifeLabelElem.setAttribute("data-help", texts[currentLang].batteryLifeHelp);
    }
    if (runtimeAverageNoteElem) {
      runtimeAverageNoteElem.textContent = feedback.count > 4 ? texts[currentLang].runtimeAverageNote : '';
    }
    var _batteriesNeeded = 1;
    if (Number.isFinite(combinedRuntime) && combinedRuntime > 0) {
      _batteriesNeeded = Math.max(1, Math.ceil(10 / combinedRuntime));
    }
    batteryCountElem.textContent = _batteriesNeeded.toString();
  } else {
    if (batteryLifeLabelElem) {
      batteryLifeLabelElem.textContent = texts[currentLang].batteryLifeLabel;
      batteryLifeLabelElem.setAttribute("data-help", texts[currentLang].batteryLifeHelp);
    }
    if (runtimeAverageNoteElem) {
      runtimeAverageNoteElem.textContent = '';
    }
  }
  renderTemperatureNote(lastRuntimeHours);
  checkFizCompatibility();
  checkFizController();
  checkArriCompatibility();
  if (setupDiagramContainer) renderSetupDiagram();
  refreshGearListIfVisible();
}
function getCurrentSetupKey() {
  var camera = cameraSelect.value || '';
  var monitor = monitorSelect.value || '';
  var video = videoSelect.value || '';
  var cage = cageSelect ? cageSelect.value : '';
  var motors = motorSelects.map(function (sel) {
    return sel.value;
  }).filter(function (v) {
    return v && v !== 'None';
  }).sort().join(',');
  var controllers = controllerSelects.map(function (sel) {
    return sel.value;
  }).filter(function (v) {
    return v && v !== 'None';
  }).sort().join(',');
  var distance = distanceSelect.value || '';
  var battery = batterySelect.value || '';
  var hotswap = hotswapSelect.value || '';
  var plate = getSelectedPlate() || '';
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
  var _devices7, _devices8, _devices9, _devices10, _devices11, _texts$currentLang91, _texts$en292;
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
  var camPower = ((_devices7 = devices) === null || _devices7 === void 0 || (_devices7 = _devices7.cameras) === null || _devices7 === void 0 || (_devices7 = _devices7[cameraSelect === null || cameraSelect === void 0 ? void 0 : cameraSelect.value]) === null || _devices7 === void 0 ? void 0 : _devices7.powerDrawWatts) || 0;
  var monitorPower = ((_devices8 = devices) === null || _devices8 === void 0 || (_devices8 = _devices8.monitors) === null || _devices8 === void 0 || (_devices8 = _devices8[monitorSelect === null || monitorSelect === void 0 ? void 0 : monitorSelect.value]) === null || _devices8 === void 0 ? void 0 : _devices8.powerDrawWatts) || 0;
  var videoPower = ((_devices9 = devices) === null || _devices9 === void 0 || (_devices9 = _devices9.video) === null || _devices9 === void 0 || (_devices9 = _devices9[videoSelect === null || videoSelect === void 0 ? void 0 : videoSelect.value]) === null || _devices9 === void 0 ? void 0 : _devices9.powerDrawWatts) || 0;
  var motorPower = motorSelects.reduce(function (sum, sel) {
    var _devices0;
    return sum + (((_devices0 = devices) === null || _devices0 === void 0 || (_devices0 = _devices0.fiz) === null || _devices0 === void 0 || (_devices0 = _devices0.motors) === null || _devices0 === void 0 || (_devices0 = _devices0[sel.value]) === null || _devices0 === void 0 ? void 0 : _devices0.powerDrawWatts) || 0);
  }, 0);
  var controllerPower = controllerSelects.reduce(function (sum, sel) {
    var _devices1;
    return sum + (((_devices1 = devices) === null || _devices1 === void 0 || (_devices1 = _devices1.fiz) === null || _devices1 === void 0 || (_devices1 = _devices1.controllers) === null || _devices1 === void 0 || (_devices1 = _devices1[sel.value]) === null || _devices1 === void 0 ? void 0 : _devices1.powerDrawWatts) || 0);
  }, 0);
  var distancePower = ((_devices10 = devices) === null || _devices10 === void 0 || (_devices10 = _devices10.fiz) === null || _devices10 === void 0 || (_devices10 = _devices10.distance) === null || _devices10 === void 0 || (_devices10 = _devices10[distanceSelect === null || distanceSelect === void 0 ? void 0 : distanceSelect.value]) === null || _devices10 === void 0 ? void 0 : _devices10.powerDrawWatts) || 0;
  var otherPower = videoPower + motorPower + controllerPower + distancePower;
  var totalPower = camPower + monitorPower + otherPower;
  var specBrightness = (_devices11 = devices) === null || _devices11 === void 0 || (_devices11 = _devices11.monitors) === null || _devices11 === void 0 || (_devices11 = _devices11[monitorSelect === null || monitorSelect === void 0 ? void 0 : monitorSelect.value]) === null || _devices11 === void 0 ? void 0 : _devices11.brightnessNits;
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
  var deleteFeedbackLabel = ((_texts$currentLang91 = texts[currentLang]) === null || _texts$currentLang91 === void 0 ? void 0 : _texts$currentLang91.deleteSetupBtn) || ((_texts$en292 = texts.en) === null || _texts$en292 === void 0 ? void 0 : _texts$en292.deleteSetupBtn) || 'Delete';
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
      if (!def || JSON.stringify(cur) !== JSON.stringify(def)) {
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
function renderSetupDiagram() {
  var _devices$batteries$ba2, _cam$videoOutputs;
  if (!setupDiagramContainer) return;
  var isTouchDevice = (navigator.maxTouchPoints || 0) > 0;
  var camName = cameraSelect.value;
  var cam = devices.cameras[camName];
  var monitorName = monitorSelect.value;
  var monitor = devices.monitors[monitorName];
  var videoName = videoSelect.value;
  var video = devices.video[videoName];
  var batteryName = batterySelect.value;
  var distanceName = distanceSelect.value;
  var motors = motorSelects.map(function (sel) {
    return sel.value;
  }).filter(function (v) {
    return v && v !== 'None';
  });
  motors.sort(function (a, b) {
    return motorPriority(a) - motorPriority(b);
  });
  var internalIdx = motors.findIndex(function (name) {
    var _devices$fiz23;
    return (_devices$fiz23 = devices.fiz) === null || _devices$fiz23 === void 0 || (_devices$fiz23 = _devices$fiz23.motors) === null || _devices$fiz23 === void 0 || (_devices$fiz23 = _devices$fiz23[name]) === null || _devices$fiz23 === void 0 ? void 0 : _devices$fiz23.internalController;
  });
  var hasInternalMotor = internalIdx !== -1;
  if (hasInternalMotor && internalIdx > 0) {
    var _motors$splice3 = motors.splice(internalIdx, 1),
      _motors$splice4 = _slicedToArray(_motors$splice3, 1),
      m = _motors$splice4[0];
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
  var inlineControllers = controllers;
  var nodes = [];
  var pos = {};
  var nodeMap = {};
  var step = 300;
  var VIDEO_LABEL_SPACING = 10;
  var EDGE_LABEL_GAP = 12;
  var EDGE_LABEL_VERTICAL_GAP = 8;
  var EDGE_ROUTE_LABEL_GAP = 10;
  var baseY = 220;
  var x = 80;
  if (batteryName && batteryName !== 'None') {
    var _devices$batteries$ba, _cam$power7;
    var batteryLabel = batteryName;
    var _battMount = (_devices$batteries$ba = devices.batteries[batteryName]) === null || _devices$batteries$ba === void 0 ? void 0 : _devices$batteries$ba.mount_type;
    if (cam && _battMount && (_cam$power7 = cam.power) !== null && _cam$power7 !== void 0 && (_cam$power7 = _cam$power7.batteryPlateSupport) !== null && _cam$power7 !== void 0 && _cam$power7.some(function (bp) {
      return bp.type === _battMount && bp.mount === 'native';
    })) {
      batteryLabel += " on native ".concat(_battMount, " plate via Pins");
    }
    pos.battery = {
      x: x,
      y: baseY,
      label: batteryLabel
    };
    nodes.push('battery');
    nodeMap.battery = {
      category: 'batteries',
      name: batteryName
    };
    x += step;
  }
  if (camName && camName !== 'None') {
    pos.camera = {
      x: x,
      y: baseY,
      label: camName
    };
    nodes.push('camera');
    nodeMap.camera = {
      category: 'cameras',
      name: camName
    };
    x += step;
  }
  var controllerIds = controllers.map(function (_, idx) {
    return "controller".concat(idx);
  });
  var motorIds = motors.map(function (_, idx) {
    return "motor".concat(idx);
  });
  var controllerNameMap = new Map();
  controllerIds.forEach(function (id, idx) {
    controllerNameMap.set(id, inlineControllers[idx] || controllers[idx]);
  });
  var motorNameMap = new Map();
  motorIds.forEach(function (id, idx) {
    motorNameMap.set(id, motors[idx]);
  });
  var hasMainCtrl = controllers.some(function (n) {
    return controllerPriority(n) === 0;
  });
  var useMotorFirst = !hasMainCtrl && hasInternalMotor || !controllerIds.length && motorIds.length && motorPriority(motors[0]) === 0;
  var addNode = function addNode(id, category, label) {
    pos[id] = {
      x: x,
      y: baseY,
      label: label
    };
    nodes.push(id);
    nodeMap[id] = {
      category: category,
      name: label
    };
    x += step;
  };
  if (useMotorFirst && motorIds.length) {
    addNode(motorIds[0], 'fiz.motors', motors[0]);
    controllerIds.forEach(function (id, idx) {
      addNode(id, 'fiz.controllers', inlineControllers[idx]);
    });
    motorIds.slice(1).forEach(function (id, idx) {
      addNode(id, 'fiz.motors', motors[idx + 1]);
    });
  } else {
    controllerIds.forEach(function (id, idx) {
      addNode(id, 'fiz.controllers', inlineControllers[idx]);
    });
    motorIds.forEach(function (id, idx) {
      addNode(id, 'fiz.motors', motors[idx]);
    });
  }
  if (monitorName && monitorName !== 'None') {
    pos.monitor = {
      x: pos.camera ? pos.camera.x : 60,
      y: baseY - step,
      label: monitorName
    };
    nodes.push('monitor');
    nodeMap.monitor = {
      category: 'monitors',
      name: monitorName
    };
  }
  if (videoName && videoName !== 'None') {
    pos.video = {
      x: pos.camera ? pos.camera.x : 60,
      y: baseY + step,
      label: videoName
    };
    nodes.push('video');
    nodeMap.video = {
      category: 'video',
      name: videoName
    };
  }
  var inlineDistance = false;
  var dedicatedDistance = false;
  if (distanceName && distanceName !== 'None') {
    var attach = inlineControllers.length ? controllerIds[0] : motorIds[0];
    if (attach) {
      var arriDevices = [].concat(_toConsumableArray(inlineControllers), _toConsumableArray(motors)).some(function (n) {
        return isArri(n);
      });
      var hasDedicatedPort = inlineControllers.some(function (n) {
        return /RIA-1/i.test(n) || /UMC-4/i.test(n);
      });
      dedicatedDistance = hasDedicatedPort && arriDevices;
      inlineDistance = arriDevices && !hasDedicatedPort && inlineControllers.length;
      if (inlineDistance && motorIds.length) {
        var nextId = motorIds[0];
        pos.distance = {
          x: (pos[attach].x + pos[nextId].x) / 2,
          y: baseY - step,
          label: distanceName
        };
      } else {
        pos.distance = {
          x: pos[attach].x,
          y: baseY - step,
          label: distanceName
        };
      }
      nodes.push('distance');
      nodeMap.distance = {
        category: 'fiz.distance',
        name: distanceName
      };
    }
  }
  Object.keys(manualPositions).forEach(function (id) {
    if (!pos[id]) delete manualPositions[id];
  });
  Object.entries(pos).forEach(function (_ref84) {
    var _ref85 = _slicedToArray(_ref84, 2),
      id = _ref85[0],
      p = _ref85[1];
    if (manualPositions[id]) {
      p.x = manualPositions[id].x;
      p.y = manualPositions[id].y;
    }
  });
  var firstFizId;
  if (hasInternalMotor && motorIds.length && !hasMainCtrl) {
    firstFizId = motorIds[0];
  } else {
    firstFizId = controllerIds.length ? controllerIds[0] : motorIds[0];
  }
  var DEFAULT_NODE_H = 120;
  var DEFAULT_NODE_W = 120;
  var nodeHeights = {};
  var nodeWidths = {};
  var diagramLabelFontSize = 'var(--font-size-diagram-label, 11px)';
  var diagramTextFontSize = 'var(--font-size-diagram-text, 13px)';
  var DIAGRAM_LABEL_LINE_HEIGHT = 13;
  var DIAGRAM_ICON_TEXT_GAP = 8;
  var DEFAULT_DIAGRAM_ICON_SIZE = 24;
  nodes.forEach(function (id) {
    var label = pos[id].label || id;
    var lines = wrapLabel(label);
    var hasIcon = diagramIcons[id] || id.startsWith('controller') || id.startsWith('motor');
    nodeHeights[id] = Math.max(DEFAULT_NODE_H, lines.length * DIAGRAM_LABEL_LINE_HEIGHT + (hasIcon ? 30 : 20));
    var longest = lines.reduce(function (m, l) {
      return Math.max(m, l.length);
    }, 0);
    nodeWidths[id] = Math.max(DEFAULT_NODE_W, longest * 9 + 20);
  });
  var NODE_W = Math.max.apply(Math, _toConsumableArray(Object.values(nodeWidths)).concat([DEFAULT_NODE_W]));
  var NODE_H = Math.max.apply(Math, _toConsumableArray(Object.values(nodeHeights)).concat([DEFAULT_NODE_H]));
  var getNodeHeight = function getNodeHeight(id) {
    return nodeHeights[id] || NODE_H;
  };
  var viewWidth;
  var chain = [];
  var edges = [];
  var usedConns = {};
  var markUsed = function markUsed(id, side) {
    usedConns["".concat(id, "|").concat(side)] = true;
  };
  var isUsed = function isUsed(id, side) {
    return usedConns["".concat(id, "|").concat(side)];
  };
  var pushEdge = function pushEdge(edge, type) {
    if (!edge.fromSide || !edge.toSide) {
      var pair = closestConnectorPair(edge.from, edge.to, usedConns);
      if (pair) {
        if (!edge.fromSide) edge.fromSide = pair.fromSide;
        if (!edge.toSide) edge.toSide = pair.toSide;
      }
    } else {
      if (isUsed(edge.from, edge.fromSide) || isUsed(edge.to, edge.toSide)) return;
    }
    markUsed(edge.from, edge.fromSide);
    markUsed(edge.to, edge.toSide);
    edges.push(_objectSpread(_objectSpread({}, edge), {}, {
      type: type
    }));
  };
  var battMount = (_devices$batteries$ba2 = devices.batteries[batteryName]) === null || _devices$batteries$ba2 === void 0 ? void 0 : _devices$batteries$ba2.mount_type;
  if (cam && batteryName && batteryName !== 'None') {
    var plateType = getSelectedPlate();
    var nativePlate = plateType && isSelectedPlateNative(camName);
    var camPort = firstPowerInputType(cam);
    var inLabel = camPort || plateType;
    var label = nativePlate ? '' : formatConnLabel(battMount, inLabel);
    pushEdge({
      from: 'battery',
      to: 'camera',
      label: label,
      fromSide: 'right',
      toSide: 'left'
    }, 'power');
  }
  if (monitor && firstPowerInputType(monitor)) {
    var mPort = firstPowerInputType(monitor);
    if (batteryName && batteryName !== 'None') {
      pushEdge({
        from: 'battery',
        to: 'monitor',
        label: formatConnLabel(battMount, mPort),
        fromSide: 'top',
        toSide: 'left'
      }, 'power');
    }
  }
  if (video && firstPowerInputType(video)) {
    var pPort = firstPowerInputType(video);
    if (batteryName && batteryName !== 'None') {
      pushEdge({
        from: 'battery',
        to: 'video',
        label: formatConnLabel(battMount, pPort),
        fromSide: 'bottom',
        toSide: 'left'
      }, 'power');
    }
  }
  if (cam && (_cam$videoOutputs = cam.videoOutputs) !== null && _cam$videoOutputs !== void 0 && _cam$videoOutputs.length) {
    var _monitor$video, _monitor$videoInputs, _video$videoInputs;
    var camOut = cam.videoOutputs[0].type;
    var monInObj = monitor && (((_monitor$video = monitor.video) === null || _monitor$video === void 0 || (_monitor$video = _monitor$video.inputs) === null || _monitor$video === void 0 ? void 0 : _monitor$video[0]) || ((_monitor$videoInputs = monitor.videoInputs) === null || _monitor$videoInputs === void 0 ? void 0 : _monitor$videoInputs[0]));
    var vidInObj = video && (((_video$videoInputs = video.videoInputs) === null || _video$videoInputs === void 0 ? void 0 : _video$videoInputs[0]) || (video.video ? video.video.inputs[0] : null));
    if (monitor && monInObj) {
      var monIn = monInObj.portType || monInObj.type || monInObj;
      pushEdge({
        from: 'camera',
        to: 'monitor',
        label: connectionLabel(camOut, monIn),
        fromSide: 'top',
        toSide: 'bottom',
        labelSpacing: VIDEO_LABEL_SPACING
      }, 'video');
    }
    if (video && vidInObj) {
      var vidIn = vidInObj.portType || vidInObj.type || vidInObj;
      pushEdge({
        from: 'camera',
        to: 'video',
        label: connectionLabel(camOut, vidIn),
        fromSide: 'bottom',
        toSide: 'top',
        labelSpacing: VIDEO_LABEL_SPACING
      }, 'video');
    }
  }
  useMotorFirst = !hasMainCtrl && hasInternalMotor || !controllerIds.length && motorIds.length && motorPriority(motors[0]) === 0;
  var distanceSelected = distanceName && distanceName !== 'None';
  var distanceInChain = distanceSelected && !dedicatedDistance;
  var firstController = false;
  var firstMotor = false;
  if (useMotorFirst && motorIds.length) {
    chain.push(motorIds[0]);
    firstMotor = true;
  } else if (controllerIds.length) {
    chain.push(controllerIds[0]);
    firstController = true;
  } else if (motorIds.length) {
    chain.push(motorIds[0]);
    firstMotor = true;
  }
  if (distanceInChain) chain.push('distance');
  if (controllerIds.length) chain = chain.concat(controllerIds.slice(firstController ? 1 : 0));
  if (motorIds.length) chain = chain.concat(motorIds.slice(firstMotor ? 1 : 0));
  if (cam && chain.length) {
    var first = chain[0];
    if (first === 'distance' && chain.length > 1 && (controllerIds.length || hasInternalMotor)) {
      first = chain[1];
    }
    var firstName = null;
    if (first.startsWith('controller')) {
      firstName = controllerNameMap.get(first);
    } else if (first.startsWith('motor')) {
      firstName = motorNameMap.get(first);
    }
    var port = first === 'distance' ? 'LBUS' : controllerCamPort(firstName);
    var _camPort = cameraFizPort(camName, port, firstName);
    pushEdge({
      from: 'camera',
      to: first,
      label: formatConnLabel(_camPort, port),
      noArrow: true
    }, 'fiz');
  } else if (motorIds.length && cam) {
    var _camPort2 = cameraFizPort(camName, motorFizPort(motors[0]), motors[0]);
    pushEdge({
      from: 'camera',
      to: motorIds[0],
      label: formatConnLabel(_camPort2, motorFizPort(motors[0])),
      noArrow: true
    }, 'fiz');
  }
  for (var i = 0; i < chain.length - 1; i++) {
    var a = chain[i];
    var b = chain[i + 1];
    var fromName = null,
      toName = null;
    if (a.startsWith('controller')) fromName = controllerNameMap.get(a);else if (a.startsWith('motor')) fromName = motorNameMap.get(a);
    if (b.startsWith('controller')) toName = controllerNameMap.get(b);else if (b.startsWith('motor')) toName = motorNameMap.get(b);
    pushEdge({
      from: a,
      to: b,
      label: formatConnLabel(fizPort(fromName), fizPort(toName)),
      noArrow: true
    }, 'fiz');
  }
  if (dedicatedDistance && controllerIds.length && distanceSelected) {
    var ctrlName = inlineControllers[0] || controllers[0];
    var distPort = controllerDistancePort(ctrlName);
    var portLabel = formatConnLabel(fizPort(ctrlName), distPort);
    pushEdge({
      from: controllerIds[0],
      to: 'distance',
      label: portLabel,
      noArrow: true,
      toSide: 'bottom-right'
    }, 'fiz');
  }
  var fizList = [];
  controllerIds.forEach(function (id, idx) {
    fizList.push({
      id: id,
      name: inlineControllers[idx] || controllers[idx]
    });
  });
  motorIds.forEach(function (id, idx) {
    fizList.push({
      id: id,
      name: motors[idx]
    });
  });
  var isMainCtrl = function isMainCtrl(name) {
    return /RIA-1/i.test(name) || /UMC-4/i.test(name) || /cforce.*rf/i.test(name);
  };
  var powerTarget = null;
  var main = fizList.find(function (d) {
    return isMainCtrl(d.name);
  });
  if (main) {
    powerTarget = main;
  } else {
    powerTarget = fizList.find(function (d) {
      return fizNeedsPower(d.name);
    });
  }
  if (powerTarget && fizNeedsPower(powerTarget.name)) {
    var _powerTarget = powerTarget,
      fizId = _powerTarget.id,
      name = _powerTarget.name;
    var powerSrc = batteryName && batteryName !== 'None' ? 'battery' : null;
    var _label58 = formatConnLabel('D-Tap', fizPowerPort(name));
    var skipBatt = isArri(camName) && isArriOrCmotion(name);
    if (powerSrc && !skipBatt) {
      pushEdge({
        from: powerSrc,
        to: fizId,
        label: _label58,
        fromSide: 'bottom-left',
        toSide: 'bottom',
        route: 'down-right-up'
      }, 'power');
    }
  }
  if (nodes.length === 0) {
    setupDiagramContainer.innerHTML = "<p class=\"diagram-placeholder\">".concat(texts[currentLang].setupDiagramPlaceholder, "</p>");
    return;
  }
  var xs = Object.values(pos).map(function (p) {
    return p.x;
  });
  var minX = Math.min.apply(Math, _toConsumableArray(xs));
  var maxX = Math.max.apply(Math, _toConsumableArray(xs));
  var contentWidth = maxX - minX;
  var baseViewWidth = Math.max(500, contentWidth + NODE_W);
  if (Object.keys(manualPositions).length === 0) {
    var shiftX = baseViewWidth / 2 - (minX + maxX) / 2;
    Object.values(pos).forEach(function (p) {
      p.x += shiftX;
    });
    xs = Object.values(pos).map(function (p) {
      return p.x;
    });
    minX = Math.min.apply(Math, _toConsumableArray(xs));
    maxX = Math.max.apply(Math, _toConsumableArray(xs));
  }
  var ys = Object.values(pos).map(function (p) {
    return p.y;
  });
  var minY = Math.min.apply(Math, _toConsumableArray(ys));
  var maxY = Math.max.apply(Math, _toConsumableArray(ys));
  var HORIZONTAL_MARGIN = Math.max(40, NODE_W * 0.25);
  var TOP_MARGIN = Math.max(40, NODE_H * 0.25);
  var BOTTOM_MARGIN = Math.max(120, NODE_H * 0.4);
  var minBoundX = minX - NODE_W / 2 - HORIZONTAL_MARGIN;
  var maxBoundX = maxX + NODE_W / 2 + HORIZONTAL_MARGIN;
  var minBoundY = minY - NODE_H / 2 - TOP_MARGIN;
  var maxBoundY = maxY + NODE_H / 2 + BOTTOM_MARGIN;
  var viewBoxX = Math.floor(Math.min(0, minBoundX));
  var viewBoxY = Math.floor(minBoundY);
  viewWidth = Math.max(baseViewWidth, Math.ceil(maxBoundX - viewBoxX));
  var baseViewHeight = maxY - minY + NODE_H + TOP_MARGIN + BOTTOM_MARGIN;
  var viewHeight = Math.max(Math.ceil(baseViewHeight), Math.ceil(maxBoundY - viewBoxY));
  function computePath(fromId, toId) {
    var labelSpacing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var from = connectorPos(fromId, opts.fromSide);
    var to = connectorPos(toId, opts.toSide);
    var path,
      lx,
      ly,
      angle = 0;
    if (opts.route === 'down-right-up') {
      var bottomY = maxY + NODE_H;
      path = "M ".concat(from.x, " ").concat(from.y, " V ").concat(bottomY, " H ").concat(to.x, " V ").concat(to.y);
      lx = (from.x + to.x) / 2;
      ly = bottomY - EDGE_ROUTE_LABEL_GAP - labelSpacing;
    } else {
      path = "M ".concat(from.x, " ").concat(from.y, " L ").concat(to.x, " ").concat(to.y);
      var dx = to.x - from.x;
      var dy = to.y - from.y;
      angle = Math.atan2(dy, dx) * 180 / Math.PI;
      var midX = (from.x + to.x) / 2;
      var midY = (from.y + to.y) / 2;
      var len = Math.hypot(dx, dy) || 1;
      var baseGap = Math.abs(dx) < Math.abs(dy) ? EDGE_LABEL_VERTICAL_GAP : EDGE_LABEL_GAP;
      var off = baseGap + labelSpacing;
      var perpX = dy / len * off;
      var perpY = -dx / len * off;
      lx = midX + perpX;
      ly = midY + perpY;
    }
    return {
      path: path,
      labelX: lx,
      labelY: ly,
      angle: angle
    };
  }
  var EDGE_LABEL_WRAP = 18;
  function wrapLabel(text) {
    var maxLen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 16;
    var words = text.split(' ');
    var lines = [];
    var line = '';
    words.forEach(function (w) {
      if ((line + ' ' + w).trim().length > maxLen && line) {
        lines.push(line.trim());
        line = w;
      } else {
        line += " ".concat(w);
      }
    });
    if (line.trim()) lines.push(line.trim());
    return lines;
  }
  var svg = "<svg viewBox=\"".concat(viewBoxX, " ").concat(viewBoxY, " ").concat(viewWidth, " ").concat(viewHeight, "\" xmlns=\"http://www.w3.org/2000/svg\">");
  svg += "<defs>\n    <linearGradient id=\"firstFizGrad\" x1=\"0%\" y1=\"0%\" x2=\"0%\" y2=\"100%\">\n      <stop offset=\"0%\" stop-color=\"#090\" />\n      <stop offset=\"100%\" stop-color=\"#d33\" />\n    </linearGradient>\n  </defs>";
  svg += "<g id=\"diagramRoot\">";
  edges.forEach(function (e) {
    if (!pos[e.from] || !pos[e.to]) return;
    var _computePath = computePath(e.from, e.to, e.labelSpacing || 0, e),
      path = _computePath.path,
      labelX = _computePath.labelX,
      labelY = _computePath.labelY,
      angle = _computePath.angle;
    if (!path) return;
    var cls = e.type ? "edge-path ".concat(e.type) : 'edge-path';
    svg += "<path class=\"".concat(cls, "\" d=\"").concat(path, "\" />");
    if (e.label) {
      var rot = " transform=\"rotate(".concat(angle, " ").concat(labelX, " ").concat(labelY, ")\"");
      var lines = wrapLabel(e.label, EDGE_LABEL_WRAP);
      if (lines.length <= 1) {
        svg += "<text class=\"edge-label\" x=\"".concat(labelX, "\" y=\"").concat(labelY, "\" text-anchor=\"middle\" dominant-baseline=\"middle\"").concat(rot, ">").concat(escapeHtml(e.label), "</text>");
      } else {
        var lineHeight = 12;
        var startDy = -((lines.length - 1) * lineHeight) / 2;
        svg += "<text class=\"edge-label\" x=\"".concat(labelX, "\" y=\"").concat(labelY, "\" text-anchor=\"middle\" dominant-baseline=\"middle\"").concat(rot, ">");
        lines.forEach(function (line, i) {
          var dy = i === 0 ? startDy : lineHeight;
          svg += "<tspan x=\"".concat(labelX, "\" dy=\"").concat(dy, "\">").concat(escapeHtml(line), "</tspan>");
        });
        svg += "</text>";
      }
    }
  });
  function connectorsFor(id) {
    switch (id) {
      case 'battery':
        return [{
          side: 'top',
          color: 'red'
        }, {
          side: 'right',
          color: 'red'
        }, {
          side: 'bottom',
          color: 'red'
        }, {
          side: 'bottom-left',
          color: 'red'
        }];
      case 'monitor':
        return [{
          side: 'left',
          color: 'red'
        }, {
          side: 'bottom',
          color: 'blue'
        }];
      case 'video':
        return [{
          side: 'left',
          color: 'red'
        }, {
          side: 'top',
          color: 'blue'
        }];
      case 'camera':
        return [{
          side: 'left',
          color: 'red'
        }, {
          side: 'top',
          color: 'blue'
        }, {
          side: 'bottom',
          color: 'blue'
        }, {
          side: 'right',
          color: 'green'
        }];
      case 'distance':
        return [{
          side: 'bottom',
          color: 'green'
        }, {
          side: 'bottom-right',
          color: 'green'
        }];
      default:
        if (id.startsWith('controller') || id.startsWith('motor')) {
          if (firstFizId && id === firstFizId) {
            return [{
              side: 'top',
              color: 'green'
            }, {
              side: 'left',
              color: 'green'
            }, {
              side: 'right',
              color: 'green'
            }, {
              side: 'bottom',
              color: 'red'
            }];
          }
          return [{
            side: 'left',
            color: 'green'
          }, {
            side: 'right',
            color: 'green'
          }];
        }
    }
    return [];
  }
  function connectorPos(nodeId, side) {
    var p = pos[nodeId];
    if (!p) return {
      x: 0,
      y: 0
    };
    var h = getNodeHeight(nodeId);
    switch (side) {
      case 'top':
        return {
          x: p.x,
          y: p.y - h / 2
        };
      case 'bottom':
        return {
          x: p.x,
          y: p.y + h / 2
        };
      case 'bottom-left':
        return {
          x: p.x - NODE_W / 2 + NODE_W / 3,
          y: p.y + h / 2
        };
      case 'bottom-right':
        return {
          x: p.x + NODE_W / 2 - NODE_W / 3,
          y: p.y + h / 2
        };
      case 'left':
        return {
          x: p.x - NODE_W / 2,
          y: p.y
        };
      case 'right':
        return {
          x: p.x + NODE_W / 2,
          y: p.y
        };
      default:
        return {
          x: p.x,
          y: p.y
        };
    }
  }
  function closestConnectorPair(idA, idB) {
    var used = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var aConns = connectorsFor(idA);
    var bConns = connectorsFor(idB);
    var best = null;
    var bestDist = Infinity;
    aConns.forEach(function (ac) {
      if (used["".concat(idA, "|").concat(ac.side)]) return;
      var ap = connectorPos(idA, ac.side);
      bConns.forEach(function (bc) {
        if (ac.color !== bc.color) return;
        if (used["".concat(idB, "|").concat(bc.side)]) return;
        var bp = connectorPos(idB, bc.side);
        var d = Math.hypot(ap.x - bp.x, ap.y - bp.y);
        if (d < bestDist) {
          bestDist = d;
          best = {
            fromSide: ac.side,
            toSide: bc.side
          };
        }
      });
    });
    return best;
  }
  nodes.forEach(function (id) {
    var p = pos[id];
    if (!p) return;
    var h = getNodeHeight(id);
    var nodeCls = id === firstFizId ? 'diagram-node first-fiz' : 'diagram-node';
    var rectCls = id === firstFizId ? 'node-box first-fiz' : 'node-box';
    svg += "<g class=\"".concat(nodeCls, "\" data-node=\"").concat(id, "\">");
    svg += "<rect class=\"".concat(rectCls, "\" x=\"").concat(p.x - NODE_W / 2, "\" y=\"").concat(p.y - h / 2, "\" width=\"").concat(NODE_W, "\" height=\"").concat(h, "\" rx=\"4\" ry=\"4\" />");
    if (id === firstFizId) {
      var xLeft = p.x - NODE_W / 2;
      var yBottom = p.y + h / 2;
      var r = 4;
      var highlight = "M ".concat(xLeft, " ").concat(p.y, " L ").concat(xLeft, " ").concat(yBottom - r, " A ").concat(r, " ").concat(r, " 0 0 1 ").concat(xLeft + r, " ").concat(yBottom, " L ").concat(p.x, " ").concat(yBottom);
      svg += "<path class=\"first-fiz-highlight\" d=\"".concat(highlight, "\" />");
    }
    var conns = connectorsFor(id);
    conns.forEach(function (c) {
      var cx = p.x,
        cy = p.y;
      if (c.side === 'top') {
        cx = p.x;
        cy = p.y - h / 2;
      } else if (c.side === 'bottom') {
        cx = p.x;
        cy = p.y + h / 2;
      } else if (c.side === 'bottom-left') {
        cx = p.x - NODE_W / 2 + NODE_W / 3;
        cy = p.y + h / 2;
      } else if (c.side === 'bottom-right') {
        cx = p.x + NODE_W / 2 - NODE_W / 3;
        cy = p.y + h / 2;
      } else if (c.side === 'left') {
        cx = p.x - NODE_W / 2;
        cy = p.y;
      } else if (c.side === 'right') {
        cx = p.x + NODE_W / 2;
        cy = p.y;
      }
      svg += "<circle class=\"conn ".concat(c.color, "\" cx=\"").concat(cx, "\" cy=\"").concat(cy, "\" r=\"4\" />");
    });
    var icon = diagramIcons[id];
    if (!icon) {
      if (id.startsWith('motor')) {
        icon = diagramIcons.motors;
      } else if (id.startsWith('controller')) {
        var _nodeMap$id;
        var _name = (((_nodeMap$id = nodeMap[id]) === null || _nodeMap$id === void 0 ? void 0 : _nodeMap$id.name) || '').toLowerCase();
        if (/handle|grip/.test(_name)) icon = diagramIcons.handle;else icon = diagramIcons.controllers;
      } else if (id === 'distance') {
        icon = diagramIcons.distance;
      }
    }
    var lines = wrapLabel(p.label || id);
    var resolvedIcon = icon ? resolveIconGlyph(icon) : null;
    var hasIconGlyph = Boolean(resolvedIcon && (resolvedIcon.markup || resolvedIcon.char));
    var iconSize = hasIconGlyph && Number.isFinite(resolvedIcon.size) ? resolvedIcon.size : DEFAULT_DIAGRAM_ICON_SIZE;
    var iconHeight = hasIconGlyph ? iconSize : 0;
    var textLineCount = lines.length;
    var textHeight = textLineCount ? textLineCount * DIAGRAM_LABEL_LINE_HEIGHT : 0;
    var iconGap = hasIconGlyph && textLineCount ? DIAGRAM_ICON_TEXT_GAP : 0;
    var contentHeight = iconHeight + iconGap + textHeight;
    var contentTop = p.y - contentHeight / 2;
    var centerX = formatSvgCoordinate(p.x);
    if (hasIconGlyph) {
      var iconCenterY = contentTop + iconHeight / 2;
      if (resolvedIcon.markup) {
        var positioned = positionSvgMarkup(ensureSvgHasAriaHidden(resolvedIcon.markup), p.x, iconCenterY, iconSize);
        if (positioned.markup) {
          var wrapperClasses = ['node-icon-svg'];
          if (resolvedIcon.className) wrapperClasses.push(resolvedIcon.className);
          svg += "<g class=\"".concat(wrapperClasses.join(' '), "\" transform=\"translate(").concat(positioned.x, ", ").concat(positioned.y, ")\">").concat(positioned.markup, "</g>");
        }
      } else if (resolvedIcon.char) {
        var fontAttr = " data-icon-font=\"".concat(resolvedIcon.font, "\"");
        svg += "<text class=\"node-icon\"".concat(fontAttr, " x=\"").concat(centerX, "\" y=\"").concat(formatSvgCoordinate(iconCenterY), "\" text-anchor=\"middle\" dominant-baseline=\"middle\">").concat(resolvedIcon.char, "</text>");
      }
    }
    if (textLineCount) {
      var textTop = contentTop + iconHeight + iconGap;
      var textY = formatSvgCoordinate(textTop);
      var _fontSize = hasIconGlyph ? diagramLabelFontSize : diagramTextFontSize;
      svg += "<text x=\"".concat(centerX, "\" y=\"").concat(textY, "\" text-anchor=\"middle\" dominant-baseline=\"hanging\" style=\"font-size: ").concat(_fontSize, ";\">");
      lines.forEach(function (line, i) {
        var dyAttr = i === 0 ? '' : " dy=\"".concat(DIAGRAM_LABEL_LINE_HEIGHT, "\"");
        svg += "<tspan x=\"".concat(centerX, "\"").concat(dyAttr, ">").concat(escapeHtml(line), "</tspan>");
      });
      svg += "</text>";
    }
    svg += "</g>";
  });
  svg += '</g></svg>';
  var popup = document.getElementById('diagramPopup');
  if (!popup) {
    popup = document.createElement('div');
    popup.id = 'diagramPopup';
    popup.className = 'diagram-popup';
  }
  setupDiagramContainer.innerHTML = '';
  setupDiagramContainer.appendChild(popup);
  setupDiagramContainer.insertAdjacentHTML('beforeend', svg);
  var svgEl = setupDiagramContainer.querySelector('svg');
  if (svgEl) {
    var _setupDiagramContaine;
    svgEl.style.width = '100%';
    svgEl.style.overflow = 'visible';
    svgEl.setAttribute('overflow', 'visible');
    var containerRect = setupDiagramContainer.getBoundingClientRect();
    var parentRect = (_setupDiagramContaine = setupDiagramContainer.parentElement) === null || _setupDiagramContaine === void 0 ? void 0 : _setupDiagramContaine.getBoundingClientRect();
    var containerWidth = (containerRect === null || containerRect === void 0 ? void 0 : containerRect.width) || setupDiagramContainer.clientWidth || 0;
    var parentWidth = (parentRect === null || parentRect === void 0 ? void 0 : parentRect.width) || 0;
    var maxWidthPx = 0;
    if (!isTouchDevice) {
      var bodyFontSize = parseFloat(getComputedStyle(document.body).fontSize) || 16;
      var diagramFontSizePx = Number.NaN;
      if (document.body) {
        var measureEl = document.createElement('span');
        measureEl.style.position = 'absolute';
        measureEl.style.visibility = 'hidden';
        measureEl.style.fontSize = 'var(--font-size-diagram-text)';
        measureEl.textContent = 'M';
        document.body.appendChild(measureEl);
        diagramFontSizePx = parseFloat(getComputedStyle(measureEl).fontSize);
        measureEl.remove();
      }
      var DEFAULT_MAX_NODE_FONT = 13;
      var referenceFontSize = Number.isFinite(diagramFontSizePx) && diagramFontSizePx > 0 ? diagramFontSizePx : DEFAULT_MAX_NODE_FONT;
      var maxAutoScale = bodyFontSize / referenceFontSize;
      var scaleFactor = Math.max(1, maxAutoScale);
      maxWidthPx = viewWidth * scaleFactor;
    } else {
      maxWidthPx = viewWidth;
    }
    var minTarget = Math.max(containerWidth, parentWidth);
    if (minTarget > 0 && (!Number.isFinite(maxWidthPx) || maxWidthPx < minTarget)) {
      maxWidthPx = minTarget;
    }
    if (Number.isFinite(maxWidthPx) && maxWidthPx > 0) {
      svgEl.style.maxWidth = "".concat(maxWidthPx, "px");
    } else {
      svgEl.style.maxWidth = '100%';
    }
    var rootEl = svgEl.querySelector('#diagramRoot');
    if (rootEl && typeof rootEl.getBBox === 'function') {
      var _svgEl$viewBox, _setupDiagramContaine2;
      var viewBox = (_svgEl$viewBox = svgEl.viewBox) === null || _svgEl$viewBox === void 0 ? void 0 : _svgEl$viewBox.baseVal;
      var viewBoxWidth = (viewBox === null || viewBox === void 0 ? void 0 : viewBox.width) || viewWidth || svgEl.getBoundingClientRect().width || 1;
      var viewBoxHeight = (viewBox === null || viewBox === void 0 ? void 0 : viewBox.height) || svgEl.getBoundingClientRect().height || 1;
      var _viewBoxX = (viewBox === null || viewBox === void 0 ? void 0 : viewBox.x) || 0;
      var _viewBoxY = (viewBox === null || viewBox === void 0 ? void 0 : viewBox.y) || 0;
      var bbox = rootEl.getBBox();
      var svgRect = svgEl.getBoundingClientRect();
      var renderedWidth = svgRect.width || svgEl.clientWidth || viewBoxWidth;
      var widthCandidates = [renderedWidth];
      var _parentRect = (_setupDiagramContaine2 = setupDiagramContainer.parentElement) === null || _setupDiagramContaine2 === void 0 ? void 0 : _setupDiagramContaine2.getBoundingClientRect();
      if (_parentRect && _parentRect.width > 0) widthCandidates.push(_parentRect.width - 32);
      if (typeof window !== 'undefined' && Number.isFinite(window.innerWidth) && window.innerWidth > 0) {
        widthCandidates.push(window.innerWidth - 80);
      }
      var positiveWidths = widthCandidates.filter(function (v) {
        return Number.isFinite(v) && v > 0;
      });
      var maxAvailable = positiveWidths.length ? Math.max.apply(Math, _toConsumableArray(positiveWidths)) : renderedWidth;
      var minAvailable = positiveWidths.length ? Math.min.apply(Math, _toConsumableArray(positiveWidths)) : renderedWidth;
      var MAX_TARGET_WIDTH = 1400;
      var desiredWidth = Math.max(minAvailable, Math.min(MAX_TARGET_WIDTH, maxAvailable));
      var baseScale = viewBoxWidth > 0 ? renderedWidth / viewBoxWidth : 1;
      var currentRootWidth = bbox.width * baseScale;
      var desiredScale = currentRootWidth > 0 ? desiredWidth / currentRootWidth : 1;
      if (!Number.isFinite(desiredScale) || desiredScale <= 0) desiredScale = 1;
      if (!isTouchDevice && desiredScale > 1) {
        var DESKTOP_SCALE_RELAXATION = 0.3;
        var DESKTOP_MAX_AUTO_SCALE = 1.2;
        desiredScale = 1 + (desiredScale - 1) * DESKTOP_SCALE_RELAXATION;
        if (desiredScale > DESKTOP_MAX_AUTO_SCALE) desiredScale = DESKTOP_MAX_AUTO_SCALE;
        var DESKTOP_AUTO_FILL_RATIO = 0.88;
        var MIN_DESKTOP_AUTO_SCALE = 0.82;
        var adjustedScale = desiredScale * DESKTOP_AUTO_FILL_RATIO;
        desiredScale = Math.max(MIN_DESKTOP_AUTO_SCALE, adjustedScale);
      }
      var MIN_AUTO_SCALE = isTouchDevice ? 0.4 : 0.35;
      var MAX_INITIAL_SCALE = isTouchDevice ? 3 : 1.6;
      var safeDesiredScale = Number.isFinite(desiredScale) && desiredScale > 0 ? desiredScale : 1;
      var initialScale = Math.min(MAX_INITIAL_SCALE, Math.max(MIN_AUTO_SCALE, safeDesiredScale));
      var centerX = bbox.x + bbox.width / 2;
      var centerY = bbox.y + bbox.height / 2;
      var targetCenterX = _viewBoxX + viewBoxWidth / 2;
      var targetCenterY = _viewBoxY + viewBoxHeight / 2;
      var initialPanX = targetCenterX / initialScale - centerX;
      var initialPanY = targetCenterY / initialScale - centerY;
      var roundedScale = Math.round(initialScale * 1000) / 1000;
      var roundedPan = {
        x: Math.round(initialPanX * 1000) / 1000,
        y: Math.round(initialPanY * 1000) / 1000
      };
      if (Number.isFinite(roundedScale) && roundedScale > 0) {
        setupDiagramContainer.dataset.initialScale = String(roundedScale);
      } else {
        delete setupDiagramContainer.dataset.initialScale;
      }
      if (Number.isFinite(roundedPan.x) && Number.isFinite(roundedPan.y)) {
        setupDiagramContainer.dataset.initialPan = JSON.stringify(roundedPan);
      } else {
        delete setupDiagramContainer.dataset.initialPan;
      }
    } else {
      delete setupDiagramContainer.dataset.initialScale;
      delete setupDiagramContainer.dataset.initialPan;
    }
  }
  lastDiagramPositions = JSON.parse(JSON.stringify(pos));
  attachDiagramPopups(nodeMap);
  enableDiagramInteractions();
}
function attachDiagramPopups(map) {
  if (!setupDiagramContainer) return;
  var popup = document.getElementById('diagramPopup');
  if (!popup) return;
  popup.style.display = 'none';
  var isTouchDevice = (navigator.maxTouchPoints || 0) > 0;
  setupDiagramContainer.querySelectorAll('.diagram-node').forEach(function (node) {
    var id = node.getAttribute('data-node');
    var info = map[id];
    if (!info) return;
    var deviceData;
    if (info.category === 'fiz.controllers') {
      var _devices$fiz24;
      deviceData = (_devices$fiz24 = devices.fiz) === null || _devices$fiz24 === void 0 || (_devices$fiz24 = _devices$fiz24.controllers) === null || _devices$fiz24 === void 0 ? void 0 : _devices$fiz24[info.name];
    } else if (info.category === 'fiz.motors') {
      var _devices$fiz25;
      deviceData = (_devices$fiz25 = devices.fiz) === null || _devices$fiz25 === void 0 || (_devices$fiz25 = _devices$fiz25.motors) === null || _devices$fiz25 === void 0 ? void 0 : _devices$fiz25[info.name];
    } else if (info.category === 'fiz.distance') {
      var _devices$fiz26;
      deviceData = (_devices$fiz26 = devices.fiz) === null || _devices$fiz26 === void 0 || (_devices$fiz26 = _devices$fiz26.distance) === null || _devices$fiz26 === void 0 ? void 0 : _devices$fiz26[info.name];
    } else {
      var _devices$info$categor;
      deviceData = (_devices$info$categor = devices[info.category]) === null || _devices$info$categor === void 0 ? void 0 : _devices$info$categor[info.name];
    }
    var connectors = safeGenerateConnectorSummary(deviceData);
    var infoHtml = (deviceData && deviceData.latencyMs ? "<div class=\"info-box video-conn\"><strong>Latency:</strong> ".concat(escapeHtml(String(deviceData.latencyMs)), "</div>") : '') + (deviceData && deviceData.frequency ? "<div class=\"info-box video-conn\"><strong>Frequency:</strong> ".concat(escapeHtml(String(deviceData.frequency)), "</div>") : '');
    var html = "<strong>".concat(escapeHtml(info.name), "</strong>") + connectors + infoHtml;
    var show = function show(e) {
      var _window$visualViewpor, _document$documentEle, _window$visualViewpor2, _document$documentEle2;
      e.stopPropagation();
      var pointer = e.touches && e.touches[0] ? e.touches[0] : e;
      popup.innerHTML = html;
      popup.style.display = 'block';
      var offset = 12;
      var viewportWidth = ((_window$visualViewpor = window.visualViewport) === null || _window$visualViewpor === void 0 ? void 0 : _window$visualViewpor.width) || window.innerWidth || ((_document$documentEle = document.documentElement) === null || _document$documentEle === void 0 ? void 0 : _document$documentEle.clientWidth) || 0;
      var viewportHeight = ((_window$visualViewpor2 = window.visualViewport) === null || _window$visualViewpor2 === void 0 ? void 0 : _window$visualViewpor2.height) || window.innerHeight || ((_document$documentEle2 = document.documentElement) === null || _document$documentEle2 === void 0 ? void 0 : _document$documentEle2.clientHeight) || 0;
      var popupWidth = popup.offsetWidth || 0;
      var popupHeight = popup.offsetHeight || 0;
      var pointerX = pointer.clientX;
      var pointerY = pointer.clientY;
      var left = pointerX + offset;
      if (viewportWidth > 0 && popupWidth > 0 && left + popupWidth + offset > viewportWidth) {
        left = Math.max(offset, pointerX - popupWidth - offset);
      }
      var top = pointerY + offset;
      if (viewportHeight > 0 && popupHeight > 0 && top + popupHeight + offset > viewportHeight) {
        top = Math.max(offset, pointerY - popupHeight - offset);
      }
      var maxLeft = viewportWidth > 0 && popupWidth > 0 ? Math.max(offset, viewportWidth - popupWidth - offset) : left;
      var maxTop = viewportHeight > 0 && popupHeight > 0 ? Math.max(offset, viewportHeight - popupHeight - offset) : top;
      popup.style.left = "".concat(Math.max(offset, Math.min(left, maxLeft)), "px");
      popup.style.top = "".concat(Math.max(offset, Math.min(top, maxTop)), "px");
    };
    var hide = function hide() {
      popup.style.display = 'none';
    };
    if (isTouchDevice) {
      node.addEventListener('touchstart', show);
      node.addEventListener('click', show);
    } else {
      node.addEventListener('mousemove', show);
      node.addEventListener('mouseout', hide);
      node.addEventListener('click', show);
    }
  });
  if (!setupDiagramContainer.dataset.popupOutsideListeners) {
    var hideOnOutside = function hideOnOutside(e) {
      if (!e.target.closest('.diagram-node')) popup.style.display = 'none';
    };
    if (isTouchDevice) {
      setupDiagramContainer.addEventListener('touchstart', hideOnOutside);
    } else {
      setupDiagramContainer.addEventListener('click', hideOnOutside);
    }
    setupDiagramContainer.dataset.popupOutsideListeners = 'true';
  }
}
function enableDiagramInteractions() {
  if (!setupDiagramContainer) return;
  var svg = setupDiagramContainer.querySelector('svg');
  if (!svg) return;
  if (cleanupDiagramInteractions) cleanupDiagramInteractions();
  var root = svg.querySelector('#diagramRoot') || svg;
  var isTouchDevice = (navigator.maxTouchPoints || 0) > 0;
  var MAX_SCALE = isTouchDevice ? Infinity : 3;
  var BASE_MIN_SCALE = isTouchDevice ? 0.55 : 0.6;
  var MIN_AUTO_SCALE = isTouchDevice ? 0.4 : 0.35;
  var dataScaleRaw = parseFloat(setupDiagramContainer.dataset.initialScale || '');
  var fallbackScale = isTouchDevice ? 0.95 : 0.85;
  var initialScaleRaw = Number.isFinite(dataScaleRaw) && dataScaleRaw > 0 ? dataScaleRaw : fallbackScale;
  var MIN_SCALE = Math.max(MIN_AUTO_SCALE, Math.min(BASE_MIN_SCALE, initialScaleRaw));
  var clampScale = function clampScale(value) {
    if (!Number.isFinite(value) || value <= 0) return MIN_SCALE;
    if (value > MAX_SCALE) return MAX_SCALE;
    if (value < MIN_SCALE) return MIN_SCALE;
    return value;
  };
  var INITIAL_SCALE = clampScale(initialScaleRaw);
  var initialPan = {
    x: 0,
    y: 0
  };
  if (setupDiagramContainer.dataset.initialPan) {
    try {
      var parsed = JSON.parse(setupDiagramContainer.dataset.initialPan);
      if (parsed && Number.isFinite(parsed.x) && Number.isFinite(parsed.y)) {
        initialPan = {
          x: parsed.x,
          y: parsed.y
        };
      }
    } catch (err) {}
  }
  var pan = _objectSpread({}, initialPan);
  var scale = INITIAL_SCALE;
  var panning = false;
  var panStart = _objectSpread({}, pan);
  var panPointerStart = null;
  var getPos = function getPos(e) {
    if (e.touches && e.touches[0]) return {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
    if (e.changedTouches && e.changedTouches[0]) return {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY
    };
    return {
      x: e.clientX,
      y: e.clientY
    };
  };
  var getMetrics = function getMetrics() {
    var _svg$viewBox, _svg$width, _svg$height;
    var rect = typeof svg.getBoundingClientRect === 'function' ? svg.getBoundingClientRect() : null;
    var viewBox = (_svg$viewBox = svg.viewBox) === null || _svg$viewBox === void 0 ? void 0 : _svg$viewBox.baseVal;
    var viewBoxWidth = viewBox && Number.isFinite(viewBox.width) && viewBox.width > 0 ? viewBox.width : ((_svg$width = svg.width) === null || _svg$width === void 0 || (_svg$width = _svg$width.baseVal) === null || _svg$width === void 0 ? void 0 : _svg$width.value) || (rect === null || rect === void 0 ? void 0 : rect.width) || 1;
    var viewBoxHeight = viewBox && Number.isFinite(viewBox.height) && viewBox.height > 0 ? viewBox.height : ((_svg$height = svg.height) === null || _svg$height === void 0 || (_svg$height = _svg$height.baseVal) === null || _svg$height === void 0 ? void 0 : _svg$height.value) || (rect === null || rect === void 0 ? void 0 : rect.height) || 1;
    var rectWidth = rect && Number.isFinite(rect.width) && rect.width > 0 ? rect.width : viewBoxWidth;
    var rectHeight = rect && Number.isFinite(rect.height) && rect.height > 0 ? rect.height : viewBoxHeight;
    var viewPerPxX = rectWidth > 0 ? viewBoxWidth / rectWidth : 1;
    var viewPerPxY = rectHeight > 0 ? viewBoxHeight / rectHeight : 1;
    return {
      rect: rect,
      viewPerPxX: viewPerPxX,
      viewPerPxY: viewPerPxY
    };
  };
  var convertPointerDeltaToView = function convertPointerDeltaToView(dxPx, dyPx) {
    var _getMetrics = getMetrics(),
      viewPerPxX = _getMetrics.viewPerPxX,
      viewPerPxY = _getMetrics.viewPerPxY;
    return {
      x: (Number.isFinite(dxPx) ? dxPx : 0) * viewPerPxX / (scale || 1),
      y: (Number.isFinite(dyPx) ? dyPx : 0) * viewPerPxY / (scale || 1)
    };
  };
  var apply = function apply() {
    scale = clampScale(scale);
    root.setAttribute('transform', "translate(".concat(pan.x, ",").concat(pan.y, ") scale(").concat(scale, ")"));
  };
  var zoomWithCenter = function zoomWithCenter(factor) {
    var currentScale = scale;
    if (!Number.isFinite(currentScale) || currentScale <= 0) return;
    var targetScale = clampScale(currentScale * factor);
    if (!Number.isFinite(targetScale) || targetScale <= 0 || targetScale === currentScale) {
      scale = targetScale;
      apply();
      return;
    }
    var _getMetrics2 = getMetrics(),
      rect = _getMetrics2.rect,
      viewPerPxX = _getMetrics2.viewPerPxX,
      viewPerPxY = _getMetrics2.viewPerPxY;
    if (rect && Number.isFinite(rect.width) && Number.isFinite(rect.height) && rect.width > 0 && rect.height > 0) {
      var centerX = rect.width / 2;
      var centerY = rect.height / 2;
      var inverseCurrent = 1 / currentScale;
      var inverseTarget = 1 / targetScale;
      pan.x += centerX * viewPerPxX * (inverseTarget - inverseCurrent);
      pan.y += centerY * viewPerPxY * (inverseTarget - inverseCurrent);
    }
    scale = targetScale;
    apply();
  };
  if (zoomInBtn) {
    zoomInBtn.onclick = function () {
      zoomWithCenter(1.1);
    };
  }
  if (zoomOutBtn) {
    zoomOutBtn.onclick = function () {
      zoomWithCenter(0.9);
    };
  }
  if (resetViewBtn) {
    resetViewBtn.onclick = function () {
      pan = _objectSpread({}, initialPan);
      scale = INITIAL_SCALE;
      apply();
      manualPositions = {};
      renderSetupDiagram();
      if (typeof scheduleProjectAutoSave === 'function') {
        scheduleProjectAutoSave();
      } else if (typeof saveCurrentSession === 'function') {
        saveCurrentSession();
      }
      if (typeof checkSetupChanged === 'function') {
        checkSetupChanged();
      }
    };
  }
  var onSvgMouseDown = function onSvgMouseDown(e) {
    if (e.target.closest('.diagram-node')) return;
    var pos = getPos(e);
    panning = true;
    panPointerStart = pos;
    panStart = _objectSpread({}, pan);
    if (e.touches) e.preventDefault();
  };
  var onPanMove = function onPanMove(e) {
    if (!panning || !panPointerStart) return;
    var pos = getPos(e);
    var delta = convertPointerDeltaToView(pos.x - panPointerStart.x, pos.y - panPointerStart.y);
    pan.x = panStart.x + delta.x;
    pan.y = panStart.y + delta.y;
    apply();
    if (e.touches) e.preventDefault();
  };
  var stopPanning = function stopPanning() {
    panning = false;
    panPointerStart = null;
  };
  var dragId = null;
  var dragPointerStart = null;
  var dragNode = null;
  var onDragStart = function onDragStart(e) {
    var node = e.target.closest('.diagram-node');
    if (!node) return;
    dragId = node.getAttribute('data-node');
    dragNode = node;
    dragPointerStart = getPos(e);
    if (e.touches) e.preventDefault();
    e.stopPropagation();
  };
  var onDragMove = function onDragMove(e) {
    if (!dragId || !dragPointerStart) return;
    var start = lastDiagramPositions[dragId];
    if (!start) return;
    var pos = getPos(e);
    var delta = convertPointerDeltaToView(pos.x - dragPointerStart.x, pos.y - dragPointerStart.y);
    var dx = delta.x;
    var dy = delta.y;
    var newX = start.x + dx;
    var newY = start.y + dy;
    if (gridSnap) {
      var g = 20;
      newX = Math.round(newX / g) * g;
      newY = Math.round(newY / g) * g;
    }
    var tx = newX - start.x;
    var ty = newY - start.y;
    if (dragNode) dragNode.setAttribute('transform', "translate(".concat(tx, ",").concat(ty, ")"));
    if (e.touches) e.preventDefault();
  };
  var onDragEnd = function onDragEnd(e) {
    if (!dragId || !dragPointerStart) return;
    var start = lastDiagramPositions[dragId];
    if (start) {
      var pos = getPos(e);
      var delta = convertPointerDeltaToView(pos.x - dragPointerStart.x, pos.y - dragPointerStart.y);
      var dx = delta.x;
      var dy = delta.y;
      var newX = start.x + dx;
      var newY = start.y + dy;
      if (gridSnap) {
        var g = 20;
        newX = Math.round(newX / g) * g;
        newY = Math.round(newY / g) * g;
      }
      manualPositions[dragId] = {
        x: newX,
        y: newY
      };
    }
    dragId = null;
    dragNode = null;
    dragPointerStart = null;
    renderSetupDiagram();
    if (typeof scheduleProjectAutoSave === 'function') {
      scheduleProjectAutoSave();
    } else if (typeof saveCurrentSession === 'function') {
      saveCurrentSession();
    }
    if (typeof checkSetupChanged === 'function') {
      checkSetupChanged();
    }
    if (e.touches) e.preventDefault();
  };
  svg.addEventListener('mousedown', onSvgMouseDown);
  svg.addEventListener('touchstart', onSvgMouseDown, {
    passive: false
  });
  window.addEventListener('mousemove', onPanMove);
  window.addEventListener('touchmove', onPanMove, {
    passive: false
  });
  window.addEventListener('mouseup', stopPanning);
  window.addEventListener('touchend', stopPanning);
  svg.addEventListener('mousedown', onDragStart);
  svg.addEventListener('touchstart', onDragStart, {
    passive: false
  });
  window.addEventListener('mousemove', onDragMove);
  window.addEventListener('touchmove', onDragMove, {
    passive: false
  });
  window.addEventListener('mouseup', onDragEnd);
  window.addEventListener('touchend', onDragEnd);
  cleanupDiagramInteractions = function cleanupDiagramInteractions() {
    svg.removeEventListener('mousedown', onSvgMouseDown);
    svg.removeEventListener('touchstart', onSvgMouseDown);
    window.removeEventListener('mousemove', onPanMove);
    window.removeEventListener('touchmove', onPanMove);
    window.removeEventListener('mouseup', stopPanning);
    window.removeEventListener('touchend', stopPanning);
    svg.removeEventListener('mousedown', onDragStart);
    svg.removeEventListener('touchstart', onDragStart);
    window.removeEventListener('mousemove', onDragMove);
    window.removeEventListener('touchmove', onDragMove);
    window.removeEventListener('mouseup', onDragEnd);
    window.removeEventListener('touchend', onDragEnd);
  };
  apply();
}
function updateDiagramLegend() {
  if (!diagramLegend) return;
  var legendItems = [{
    cls: 'power',
    text: texts[currentLang].diagramLegendPower
  }, {
    cls: 'video',
    text: texts[currentLang].diagramLegendVideo
  }, {
    cls: 'fiz',
    text: texts[currentLang].diagramLegendFIZ
  }];
  diagramLegend.innerHTML = legendItems.map(function (_ref86) {
    var cls = _ref86.cls,
      text = _ref86.text;
    return "<span><span class=\"swatch ".concat(cls, "\"></span>").concat(text, "</span>");
  }).join('');
}
function humanizeKey(key) {
  var map = {
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
  if (map[key]) return map[key];
  return key.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').replace(/^./, function (c) {
    return c.toUpperCase();
  });
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
      parts.push("".concat(humanizeKey(k), ": ").concat(formatValue(value[k])));
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
    label.textContent = humanizeKey(key) + ':';
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
    var _categoryKey$split3 = categoryKey.split('.'),
      _categoryKey$split4 = _slicedToArray(_categoryKey$split3, 2),
      mainCat = _categoryKey$split4[0],
      subCat = _categoryKey$split4[1];
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
    var summary = safeGenerateConnectorSummary(deviceData);
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
    for (var _i22 = 0, _Object$entries14 = Object.entries(categoryDevices); _i22 < _Object$entries14.length; _i22++) {
      var _Object$entries14$_i = _slicedToArray(_Object$entries14[_i22], 2),
        subcat = _Object$entries14$_i[0],
        devs = _Object$entries14$_i[1];
      for (var name in devs) {
        buildItem(name, devs[name], subcat);
      }
    }
  } else {
    for (var _name2 in categoryDevices) {
      buildItem(_name2, categoryDevices[_name2]);
    }
  }
}
function refreshDeviceLists() {
  syncDeviceManagerCategories();
  deviceManagerLists.forEach(function (_ref87, categoryKey) {
    var list = _ref87.list,
      filterInput = _ref87.filterInput;
    if (!list) return;
    renderDeviceList(categoryKey, list);
    var filterValue = filterInput ? filterInput.value : '';
    filterDeviceList(list, filterValue);
  });
}
refreshDeviceLists();