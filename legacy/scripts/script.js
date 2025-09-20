var _devices$accessories2;
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
var APP_VERSION = "1.0.2";
var IOS_PWA_HELP_STORAGE_KEY = 'iosPwaHelpShown';
var DEVICE_SCHEMA_PATH = 'src/data/schema.json';
var DEVICE_SCHEMA_STORAGE_KEY = 'cameraPowerPlanner_schemaCache';
var AUTO_GEAR_RULES_KEY = typeof AUTO_GEAR_RULES_STORAGE_KEY !== 'undefined' ? AUTO_GEAR_RULES_STORAGE_KEY : 'cameraPowerPlanner_autoGearRules';
var AUTO_GEAR_SEEDED_KEY = typeof AUTO_GEAR_SEEDED_STORAGE_KEY !== 'undefined' ? AUTO_GEAR_SEEDED_STORAGE_KEY : 'cameraPowerPlanner_autoGearSeeded';
var AUTO_GEAR_BACKUPS_KEY = typeof AUTO_GEAR_BACKUPS_STORAGE_KEY !== 'undefined' ? AUTO_GEAR_BACKUPS_STORAGE_KEY : 'cameraPowerPlanner_autoGearBackups';
var AUTO_GEAR_PRESETS_KEY = typeof AUTO_GEAR_PRESETS_STORAGE_KEY !== 'undefined' ? AUTO_GEAR_PRESETS_STORAGE_KEY : 'cameraPowerPlanner_autoGearPresets';
var AUTO_GEAR_ACTIVE_PRESET_KEY = typeof AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY !== 'undefined' ? AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY : 'cameraPowerPlanner_autoGearActivePreset';
var AUTO_GEAR_AUTO_PRESET_KEY = typeof AUTO_GEAR_AUTO_PRESET_STORAGE_KEY !== 'undefined' ? AUTO_GEAR_AUTO_PRESET_STORAGE_KEY : 'cameraPowerPlanner_autoGearAutoPreset';
var AUTO_GEAR_BACKUP_VISIBILITY_KEY = typeof AUTO_GEAR_BACKUP_VISIBILITY_STORAGE_KEY !== 'undefined' ? AUTO_GEAR_BACKUP_VISIBILITY_STORAGE_KEY : 'cameraPowerPlanner_autoGearShowBackups';
var AUTO_GEAR_BACKUP_INTERVAL_MS = 10 * 60 * 1000;
var AUTO_GEAR_BACKUP_LIMIT = 12;
var autoGearBackupDateFormatter = typeof Intl !== 'undefined' && typeof Intl.DateTimeFormat === 'function' ? new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short'
}) : null;
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
    var candidates, _iterator24, _step24, url, response, _t3, _t4;
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
          _iterator24 = _createForOfIteratorHelper(candidates);
          _context3.p = 2;
          _iterator24.s();
        case 3:
          if ((_step24 = _iterator24.n()).done) {
            _context3.n = 10;
            break;
          }
          url = _step24.value;
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
          _iterator24.e(_t4);
        case 12:
          _context3.p = 12;
          _iterator24.f();
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
    var quantityMatch = segment.match(/^(\d+)\s*[x×]\s*(.+)$/i);
    if (quantityMatch) {
      var name = quantityMatch[2].trim();
      if (!name) return null;
      return {
        name: name,
        quantity: normalizeAutoGearQuantity(quantityMatch[1])
      };
    }
    return {
      name: segment
    };
  }).filter(Boolean);
}
function normalizeAutoGearItem(entry) {
  if (!entry || _typeof(entry) !== 'object') return null;
  var name = typeof entry.name === 'string' ? entry.name.trim() : '';
  if (!name) return null;
  var category = typeof entry.category === 'string' ? entry.category.trim() : '';
  var quantity = normalizeAutoGearQuantity(entry.quantity);
  var id = typeof entry.id === 'string' && entry.id ? entry.id : generateAutoGearId('item');
  return {
    id: id,
    name: name,
    category: category,
    quantity: quantity
  };
}
function normalizeAutoGearRule(rule) {
  if (!rule || _typeof(rule) !== 'object') return null;
  var id = typeof rule.id === 'string' && rule.id ? rule.id : generateAutoGearId('rule');
  var label = typeof rule.label === 'string' ? rule.label.trim() : '';
  var scenarios = Array.isArray(rule.scenarios) ? Array.from(new Set(rule.scenarios.map(function (s) {
    return typeof s === 'string' ? s.trim() : '';
  }).filter(Boolean))) : [];
  if (!scenarios.length) return null;
  var add = Array.isArray(rule.add) ? rule.add.map(normalizeAutoGearItem).filter(Boolean) : [];
  var remove = Array.isArray(rule.remove) ? rule.remove.map(normalizeAutoGearItem).filter(Boolean) : [];
  if (!add.length && !remove.length) return null;
  return {
    id: id,
    label: label,
    scenarios: scenarios.sort(function (a, b) {
      return a.localeCompare(b);
    }),
    add: add,
    remove: remove
  };
}
function autoGearItemSnapshot(item) {
  if (!item || _typeof(item) !== 'object') {
    return {
      name: '',
      category: '',
      quantity: 0
    };
  }
  var name = typeof item.name === 'string' ? item.name.trim() : '';
  var category = typeof item.category === 'string' ? item.category.trim() : '';
  var quantity = normalizeAutoGearQuantity(item.quantity);
  return {
    name: name,
    category: category,
    quantity: quantity
  };
}
function autoGearItemSortKey(item) {
  return "".concat(item.name, "|").concat(item.category, "|").concat(normalizeAutoGearQuantity(item.quantity));
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
    scenarios: normalized.scenarios.slice().sort(function (a, b) {
      return a.localeCompare(b);
    }),
    add: mapItems(normalized.add),
    remove: mapItems(normalized.remove)
  };
}
function autoGearRuleSortKey(rule) {
  var scenarioKey = Array.isArray(rule.scenarios) ? rule.scenarios.join('|') : '';
  var addKey = Array.isArray(rule.add) ? rule.add.map(autoGearItemSortKey).join('|') : '';
  var removeKey = Array.isArray(rule.remove) ? rule.remove.map(autoGearItemSortKey).join('|') : '';
  return "".concat(scenarioKey, "|").concat(rule.label || '', "|").concat(addKey, "|").concat(removeKey);
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
  return {
    id: id,
    createdAt: createdAt,
    rules: rules
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
    var value = localStorage.getItem(AUTO_GEAR_AUTO_PRESET_KEY);
    return typeof value === 'string' ? value : '';
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
      rules: Array.isArray(entry.rules) ? entry.rules : []
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
var initialAutoGearRulesSignature = stableStringify(autoGearRules);
var autoGearRulesLastBackupSignature = autoGearBackups.length ? stableStringify(autoGearBackups[0].rules || []) : initialAutoGearRulesSignature;
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
  var signature = stableStringify(baseAutoGearRules);
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
  if (!rule || _typeof(rule) !== 'object') return '';
  var normalizeList = function normalizeList(list) {
    return Array.isArray(list) ? list.map(function (item) {
      return {
        name: typeof item.name === 'string' ? item.name : '',
        category: typeof item.category === 'string' ? item.category : '',
        quantity: normalizeAutoGearQuantity(item.quantity)
      };
    }) : [];
  };
  return stableStringify({
    label: typeof rule.label === 'string' ? rule.label : '',
    scenarios: Array.isArray(rule.scenarios) ? rule.scenarios : [],
    add: normalizeList(rule.add),
    remove: normalizeList(rule.remove)
  });
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
    return {
      name: item.name,
      category: item.category,
      quantity: normalizeAutoGearQuantity(item.quantity)
    };
  }).filter(function (entry) {
    return entry.name && (entry.quantity || entry.quantity === 0);
  });
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
      return remaining > 0 ? {
        name: item.name,
        category: item.category,
        quantity: remaining
      } : null;
    }).filter(Boolean);
  };
  return {
    add: adjust(diff.add, 'add'),
    remove: adjust(diff.remove, 'remove')
  };
}
function seedAutoGearRulesFromCurrentProject() {
  if (autoGearRules.length) return;
  if (hasSeededAutoGearDefaults()) return;
  if (typeof generateGearListHtml !== 'function' || typeof collectProjectFormData !== 'function') return;
  if (!requiredScenariosSelect) return;
  var baseInfo = collectProjectFormData ? collectProjectFormData() : {};
  if (!baseInfo || _typeof(baseInfo) !== 'object') return;
  var baselineHtml = generateGearListHtml(_objectSpread(_objectSpread({}, baseInfo), {}, {
    requiredScenarios: ''
  }));
  var baselineMap = parseGearTableForAutoRules(baselineHtml);
  if (!baselineMap) return;
  var scenarioValues = Array.from(requiredScenariosSelect.options || []).map(function (opt) {
    return opt.value;
  }).filter(Boolean);
  if (!scenarioValues.length) return;
  var scenarioDiffMap = new Map();
  var rules = [];
  scenarioValues.forEach(function (value) {
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
      return scenarioValues.includes(value);
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
  if (!rules.length) return;
  setAutoGearRules(rules);
  markAutoGearDefaultsSeeded();
}
function resetAutoGearRulesToFactoryAdditions() {
  var _texts$en;
  var langTexts = texts[currentLang] || texts.en || {};
  var confirmation = langTexts.autoGearResetFactoryConfirm || ((_texts$en = texts.en) === null || _texts$en === void 0 ? void 0 : _texts$en.autoGearResetFactoryConfirm) || 'Replace your automatic gear rules with the default additions?';
  if (typeof confirm === 'function' && !confirm(confirmation)) {
    return;
  }
  var backupName = ensureAutoBackupBeforeDeletion('reset automatic gear rules');
  if (!backupName) {
    return;
  }
  try {
    var _texts$en2;
    setAutoGearRules([]);
    clearAutoGearDefaultsSeeded();
    closeAutoGearEditor();
    seedAutoGearRulesFromCurrentProject();
    var updatedRules = getAutoGearRules();
    renderAutoGearRulesList();
    renderAutoGearDraftLists();
    updateAutoGearCatalogOptions();
    var messageKey = updatedRules.length ? 'autoGearResetFactoryDone' : 'autoGearResetFactoryEmpty';
    var fallback = updatedRules.length ? 'Automatic gear rules restored to factory additions.' : 'Factory additions unavailable. Automatic gear rules cleared.';
    var message = langTexts[messageKey] || ((_texts$en2 = texts.en) === null || _texts$en2 === void 0 ? void 0 : _texts$en2[messageKey]) || fallback;
    var type = updatedRules.length ? 'success' : 'warning';
    showNotification(type, message);
  } catch (error) {
    var _texts$en3;
    console.error('Failed to reset automatic gear rules to factory additions', error);
    var errorMsg = langTexts.autoGearResetFactoryError || ((_texts$en3 = texts.en) === null || _texts$en3 === void 0 ? void 0 : _texts$en3.autoGearResetFactoryError) || 'Reset failed. Please try again.';
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
    Object.entries(obj).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];
      if (!value || _typeof(value) !== 'object' || Array.isArray(value)) return;
      addName(key);
      _visit(value);
    });
  };
  if ((typeof devices === "undefined" ? "undefined" : _typeof(devices)) === 'object' && devices) {
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
function updateInstallBannerPosition() {
  if (typeof document === 'undefined') return;
  var installBanner = document.getElementById('installPromptBanner');
  if (!installBanner) return;
  var offlineIndicator = document.getElementById('offlineIndicator');
  if (offlineIndicator && offlineIndicator.style.display !== 'none') {
    var rect = typeof offlineIndicator.getBoundingClientRect === 'function' ? offlineIndicator.getBoundingClientRect() : null;
    var height = rect && typeof rect.height === 'number' && rect.height > 0 ? rect.height : offlineIndicator.offsetHeight || 0;
    installBanner.style.top = "".concat(height, "px");
  } else {
    installBanner.style.top = '0';
  }
}
function setupOfflineIndicator() {
  var offlineIndicator = document.getElementById('offlineIndicator');
  if (!offlineIndicator) return;
  var updateOnlineStatus = function updateOnlineStatus() {
    offlineIndicator.style.display = navigator.onLine ? 'none' : 'block';
    updateInstallBannerPosition();
  };
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
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
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () {
    setupSideMenu();
    setupResponsiveControls();
  });
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
var collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: 'base'
});
var localeSort = function localeSort(a, b) {
  return collator.compare(a, b);
};
var DEFAULT_FILTER_SIZE = '4x5.65';
var showAutoBackups = false;
try {
  if (typeof localStorage !== 'undefined') {
    showAutoBackups = localStorage.getItem('showAutoBackups') === 'true';
  }
} catch (e) {
  console.warn('Could not load auto backup visibility preference', e);
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
  var match = VIDEO_TYPE_PATTERNS.find(function (_ref3) {
    var needles = _ref3.needles;
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
      var _ref4 = vo || {},
        count = _ref4.count,
        rest = _objectWithoutProperties(_ref4, _excluded2);
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
      var _ref5 = fc || {},
        type = _ref5.type,
        rest = _objectWithoutProperties(_ref5, _excluded3);
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
      var _ref6 = vf || {},
        type = _ref6.type,
        rest = _objectWithoutProperties(_ref6, _excluded4);
      return _objectSpread(_objectSpread({}, rest), {}, {
        type: normalizeViewfinderType(type)
      });
    });
    cam.recordingMedia = ensureList(cam.recordingMedia, {
      type: '',
      notes: ''
    }).map(function (m) {
      var _ref7 = m || {},
        _ref7$type = _ref7.type,
        type = _ref7$type === void 0 ? '' : _ref7$type,
        _ref7$notes = _ref7.notes,
        notes = _ref7$notes === void 0 ? '' : _ref7$notes;
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
  for (var _i = 0, _Object$entries = Object.entries(storedDevices); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
      key = _Object$entries$_i[0],
      value = _Object$entries$_i[1];
    if (key === 'fiz' && value && _typeof(value) === 'object') {
      merged.fiz = merged.fiz || {};
      for (var _i2 = 0, _Object$entries2 = Object.entries(value); _i2 < _Object$entries2.length; _i2++) {
        var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
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
}
unifyDevices(devices);
function getBatteryPlateSupport(name) {
  var cam = devices.cameras[name];
  if (!cam || !cam.power || !Array.isArray(cam.power.batteryPlateSupport)) return [];
  return cam.power.batteryPlateSupport.filter(Boolean);
}
function getSupportedBatteryPlates(name) {
  return getBatteryPlateSupport(name)
    .map(function (bp) {
      return bp.type;
    })
    .filter(Boolean);
}
function getAvailableBatteryPlates(name) {
  var support = getBatteryPlateSupport(name);
  if (!support.length) return [];
  var nativeTypes = new Set(
    support
      .filter(function (bp) {
        return bp.mount === 'native' && bp.type;
      })
      .map(function (bp) {
        return bp.type;
      })
  );
  if (nativeTypes.size === 1 && nativeTypes.has('B-Mount')) {
    return ['B-Mount'];
  }
  return Array.from(new Set(getSupportedBatteryPlates(name)));
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
  for (var _i3 = 0, _Object$entries3 = Object.entries(devices.batteries); _i3 < _Object$entries3.length; _i3++) {
    var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2),
      name = _Object$entries3$_i[0],
      info = _Object$entries3$_i[1];
    if (info && info.mount_type === mountType) out[name] = info;
  }
  return out;
}
function getHotswapsByMount(mountType) {
  var out = {};
  for (var _i4 = 0, _Object$entries4 = Object.entries(devices.batteryHotswaps || {}); _i4 < _Object$entries4.length; _i4++) {
    var _Object$entries4$_i = _slicedToArray(_Object$entries4[_i4], 2),
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
      bats = Object.fromEntries(Object.entries(bats).filter(function (_ref8) {
        var _ref9 = _slicedToArray(_ref8, 2),
          b = _ref9[1];
        return b.mount_type !== 'B-Mount';
      }));
    }
    if (!supportsGold) {
      bats = Object.fromEntries(Object.entries(bats).filter(function (_ref0) {
        var _ref1 = _slicedToArray(_ref0, 2),
          b = _ref1[1];
        return b.mount_type !== 'Gold-Mount';
      }));
    }
    populateSelect(batterySelect, bats, true);
    swaps = devices.batteryHotswaps || {};
    if (!supportsB) {
      swaps = Object.fromEntries(Object.entries(swaps).filter(function (_ref10) {
        var _ref11 = _slicedToArray(_ref10, 2),
          b = _ref11[1];
        return b.mount_type !== 'B-Mount';
      }));
    }
    if (!supportsGold) {
      swaps = Object.fromEntries(Object.entries(swaps).filter(function (_ref12) {
        var _ref13 = _slicedToArray(_ref12, 2),
          b = _ref13[1];
        return b.mount_type !== 'Gold-Mount';
      }));
    }
  }
  if (!/FXLion Nano/i.test(current)) {
    swaps = Object.fromEntries(Object.entries(swaps).filter(function (_ref14) {
      var _ref15 = _slicedToArray(_ref14, 1),
        name = _ref15[0];
      return name !== 'FX-Lion NANO Dual V-Mount Hot-Swap Plate';
    }));
  }
  var totalCurrentLow = parseFloat(totalCurrent12Elem.textContent);
  if (isFinite(totalCurrentLow) && totalCurrentLow > 0) {
    swaps = Object.fromEntries(Object.entries(swaps).filter(function (_ref16) {
      var _ref17 = _slicedToArray(_ref16, 2),
        info = _ref17[1];
      return typeof info.pinA !== 'number' || info.pinA >= totalCurrentLow;
    }));
  }
  populateSelect(hotswapSelect, swaps, true);
  if (Array.from(batterySelect.options).some(function (o) {
    return o.value === current;
  })) {
    batterySelect.value = current;
  }
  if (Array.from(hotswapSelect.options).some(function (o) {
    return o.value === currentSwap;
  })) {
    hotswapSelect.value = currentSwap;
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
  for (var _i5 = 0, _Object$entries5 = Object.entries(BRAND_KEYWORDS); _i5 < _Object$entries5.length; _i5++) {
    var _Object$entries5$_i = _slicedToArray(_Object$entries5[_i5], 2),
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
function getStatusClassList() {
  var classes = [];
  for (var key in STATUS_CLASS_BY_LEVEL) {
    if (Object.prototype.hasOwnProperty.call(STATUS_CLASS_BY_LEVEL, key)) {
      classes.push(STATUS_CLASS_BY_LEVEL[key]);
    }
  }
  return classes;
}
function setStatusLevel(element, level) {
  if (!element) return;
  var severityClasses = getStatusClassList();
  if (element.classList) {
    severityClasses.forEach(function (cls) {
      element.classList.remove(cls);
    });
  } else if (typeof element.className === 'string') {
    var remaining = element.className.split(/\s+/).filter(Boolean).filter(function (cls) {
      return severityClasses.indexOf(cls) === -1;
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
      if (classes.indexOf('status-message') === -1) {
        classes.push('status-message');
      }
      classes.push(severityClass);
      var unique = [];
      classes.forEach(function (cls) {
        if (unique.indexOf(cls) === -1) unique.push(cls);
      });
      element.className = unique.join(' ');
    }
    if (element.dataset && typeof element.dataset === 'object') {
      element.dataset.statusLevel = normalized;
    } else if (element.setAttribute) {
      element.setAttribute('data-status-level', normalized);
    }
  } else if (element.dataset && element.dataset.statusLevel) {
    delete element.dataset.statusLevel;
  } else if (element.removeAttribute) {
    element.removeAttribute('data-status-level');
  }
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
    compatElem.textContent = texts[currentLang].incompatibleFIZWarning;
    setStatusLevel(compatElem, 'danger');
  } else {
    compatElem.textContent = '';
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
    compatElem.textContent = texts[currentLang].amiraCforceRemoteWarning;
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
    compatElem.textContent = texts[currentLang].missingFIZControllerWarning;
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
    compatElem.textContent = msg;
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
  setButtonLabelWithIcon(clearSetupBtn, texts[lang].clearSetupBtn, ICON_GLYPHS.circleX);
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
  var editProjectBtnElem = document.getElementById("editProjectBtn");
  if (editProjectBtnElem) {
    editProjectBtnElem.textContent = texts[lang].editProjectBtn;
    editProjectBtnElem.setAttribute("title", texts[lang].editProjectBtn);
    editProjectBtnElem.setAttribute("data-help", texts[lang].editProjectBtn);
  }
  shareSetupBtn.setAttribute("title", texts[lang].shareSetupBtn);
  shareSetupBtn.setAttribute("data-help", texts[lang].shareSetupHelp);
  if (shareDialogHeadingElem) {
    var _texts$en4;
    var heading = texts[lang].shareDialogTitle || ((_texts$en4 = texts.en) === null || _texts$en4 === void 0 ? void 0 : _texts$en4.shareDialogTitle) || shareDialogHeadingElem.textContent;
    shareDialogHeadingElem.textContent = heading;
  }
  if (shareFilenameLabelElem) {
    var _texts$en5;
    var filenameLabel = texts[lang].shareFilenameLabel || ((_texts$en5 = texts.en) === null || _texts$en5 === void 0 ? void 0 : _texts$en5.shareFilenameLabel) || shareFilenameLabelElem.textContent;
    shareFilenameLabelElem.textContent = filenameLabel;
  }
  if (shareConfirmBtn) {
    var _texts$en6;
    var confirmLabel = texts[lang].shareDialogConfirm || ((_texts$en6 = texts.en) === null || _texts$en6 === void 0 ? void 0 : _texts$en6.shareDialogConfirm) || shareConfirmBtn.textContent;
    shareConfirmBtn.textContent = confirmLabel;
    shareConfirmBtn.setAttribute('title', confirmLabel);
    shareConfirmBtn.setAttribute('aria-label', confirmLabel);
    shareConfirmBtn.setAttribute('data-help', texts[lang].shareSetupHelp);
  }
  if (shareCancelBtn) {
    var _texts$en7;
    var cancelLabel = texts[lang].shareDialogCancel || ((_texts$en7 = texts.en) === null || _texts$en7 === void 0 ? void 0 : _texts$en7.shareDialogCancel) || shareCancelBtn.textContent;
    shareCancelBtn.textContent = cancelLabel;
    shareCancelBtn.setAttribute('title', cancelLabel);
    shareCancelBtn.setAttribute('aria-label', cancelLabel);
  }
  if (shareIncludeAutoGearText) {
    var _texts$en8, _texts$en9;
    var label = texts[lang].shareIncludeAutoGearLabel || ((_texts$en8 = texts.en) === null || _texts$en8 === void 0 ? void 0 : _texts$en8.shareIncludeAutoGearLabel) || shareIncludeAutoGearText.textContent;
    shareIncludeAutoGearText.textContent = label;
    var help = texts[lang].shareIncludeAutoGearHelp || ((_texts$en9 = texts.en) === null || _texts$en9 === void 0 ? void 0 : _texts$en9.shareIncludeAutoGearHelp) || label;
    if (shareIncludeAutoGearLabelElem) {
      shareIncludeAutoGearLabelElem.setAttribute('data-help', help);
    }
    if (shareIncludeAutoGearCheckbox) {
      shareIncludeAutoGearCheckbox.setAttribute('aria-label', label);
    }
  }
  var sharedImportLegendText = sharedImportLegend ? sharedImportLegend.textContent : '';
  if (sharedImportDialogHeading) {
    var _texts$en0;
    var title = texts[lang].sharedImportDialogTitle || ((_texts$en0 = texts.en) === null || _texts$en0 === void 0 ? void 0 : _texts$en0.sharedImportDialogTitle) || sharedImportDialogHeading.textContent;
    sharedImportDialogHeading.textContent = title;
  }
  if (sharedImportDialogMessage) {
    var _texts$en1;
    var message = texts[lang].sharedImportDialogMessage || ((_texts$en1 = texts.en) === null || _texts$en1 === void 0 ? void 0 : _texts$en1.sharedImportDialogMessage) || sharedImportDialogMessage.textContent;
    sharedImportDialogMessage.textContent = message;
    sharedImportDialogMessage.setAttribute('data-help', message);
  }
  if (sharedImportConfirmBtn) {
    var _texts$en10;
    var _label = texts[lang].sharedImportDialogConfirm || ((_texts$en10 = texts.en) === null || _texts$en10 === void 0 ? void 0 : _texts$en10.sharedImportDialogConfirm) || sharedImportConfirmBtn.textContent;
    sharedImportConfirmBtn.textContent = _label;
    sharedImportConfirmBtn.setAttribute('data-help', _label);
  }
  if (sharedImportCancelBtn) {
    var _texts$en11;
    var _label2 = texts[lang].sharedImportDialogCancel || ((_texts$en11 = texts.en) === null || _texts$en11 === void 0 ? void 0 : _texts$en11.sharedImportDialogCancel) || sharedImportCancelBtn.textContent;
    sharedImportCancelBtn.textContent = _label2;
    sharedImportCancelBtn.setAttribute('data-help', _label2);
  }
  if (sharedImportLegend) {
    var _texts$en12;
    var legend = texts[lang].sharedImportAutoGearLabel || ((_texts$en12 = texts.en) === null || _texts$en12 === void 0 ? void 0 : _texts$en12.sharedImportAutoGearLabel) || sharedImportLegend.textContent;
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
    var _texts$en13, _texts$en14;
    var _label3 = texts[lang].sharedImportAutoGearNone || ((_texts$en13 = texts.en) === null || _texts$en13 === void 0 ? void 0 : _texts$en13.sharedImportAutoGearNone) || sharedImportModeNoneOption.textContent;
    sharedImportModeNoneOption.textContent = _label3;
    var _help = texts[lang].sharedImportAutoGearNoneHelp || ((_texts$en14 = texts.en) === null || _texts$en14 === void 0 ? void 0 : _texts$en14.sharedImportAutoGearNoneHelp) || _label3;
    sharedImportModeNoneOption.setAttribute('data-help', _help);
    sharedImportModeNoneOption.setAttribute('title', _help);
    sharedImportModeNoneOption.setAttribute('aria-label', _label3);
  }
  if (sharedImportModeProjectOption) {
    var _texts$en15, _texts$en16;
    var _label4 = texts[lang].sharedImportAutoGearProject || ((_texts$en15 = texts.en) === null || _texts$en15 === void 0 ? void 0 : _texts$en15.sharedImportAutoGearProject) || sharedImportModeProjectOption.textContent;
    sharedImportModeProjectOption.textContent = _label4;
    var _help2 = texts[lang].sharedImportAutoGearProjectHelp || ((_texts$en16 = texts.en) === null || _texts$en16 === void 0 ? void 0 : _texts$en16.sharedImportAutoGearProjectHelp) || _label4;
    sharedImportModeProjectOption.setAttribute('data-help', _help2);
    sharedImportModeProjectOption.setAttribute('title', _help2);
    sharedImportModeProjectOption.setAttribute('aria-label', _label4);
  }
  if (sharedImportModeGlobalOption) {
    var _texts$en17, _texts$en18;
    var _label5 = texts[lang].sharedImportAutoGearGlobal || ((_texts$en17 = texts.en) === null || _texts$en17 === void 0 ? void 0 : _texts$en17.sharedImportAutoGearGlobal) || sharedImportModeGlobalOption.textContent;
    sharedImportModeGlobalOption.textContent = _label5;
    var _help3 = texts[lang].sharedImportAutoGearGlobalHelp || ((_texts$en18 = texts.en) === null || _texts$en18 === void 0 ? void 0 : _texts$en18.sharedImportAutoGearGlobalHelp) || _label5;
    sharedImportModeGlobalOption.setAttribute('data-help', _help3);
    sharedImportModeGlobalOption.setAttribute('title', _help3);
    sharedImportModeGlobalOption.setAttribute('aria-label', _label5);
  }
  applySharedLinkBtn.setAttribute("title", texts[lang].loadSharedLinkBtn);
  applySharedLinkBtn.setAttribute("data-help", texts[lang].applySharedLinkHelp);
  clearSetupBtn.setAttribute("title", texts[lang].clearSetupBtn);
  clearSetupBtn.setAttribute("data-help", texts[lang].clearSetupHelp);
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
  if (addDeviceBtn.dataset.mode === "edit") {
    addDeviceBtn.textContent = texts[lang].updateDeviceBtn;
    addDeviceBtn.setAttribute('data-help', texts[lang].updateDeviceBtnHelp);
  } else {
    addDeviceBtn.textContent = texts[lang].addDeviceBtn;
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
    toggleDeviceBtn.textContent = texts[lang].toggleDeviceManager;
    toggleDeviceBtn.setAttribute("title", texts[lang].toggleDeviceManager);
    toggleDeviceBtn.setAttribute("data-help", texts[lang].toggleDeviceManagerHelp);
    toggleDeviceBtn.setAttribute("aria-expanded", "false");
  } else {
    toggleDeviceBtn.textContent = texts[lang].hideDeviceManager;
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
  if (accentLabel) {
    accentLabel.textContent = texts[lang].accentColorSetting;
    var accentHelp = texts[lang].accentColorHelp || texts[lang].accentColorSetting;
    accentLabel.setAttribute("data-help", accentHelp);
    if (accentColorInput) {
      accentColorInput.setAttribute("data-help", accentHelp);
      accentColorInput.setAttribute("aria-label", texts[lang].accentColorSetting);
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
      localFontsButton.textContent = localFontsLabel;
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
    var _texts$en19, _texts$en20;
    autoGearHeadingElem.textContent = texts[lang].autoGearHeading || ((_texts$en19 = texts.en) === null || _texts$en19 === void 0 ? void 0 : _texts$en19.autoGearHeading) || 'Automatic Gear Rules';
    var headingHelp = texts[lang].autoGearHeadingHelp || ((_texts$en20 = texts.en) === null || _texts$en20 === void 0 ? void 0 : _texts$en20.autoGearHeadingHelp);
    if (headingHelp) autoGearHeadingElem.setAttribute('data-help', headingHelp);
  }
  if (autoGearDescriptionElem) {
    var _texts$en21;
    autoGearDescriptionElem.textContent = texts[lang].autoGearDescription || ((_texts$en21 = texts.en) === null || _texts$en21 === void 0 ? void 0 : _texts$en21.autoGearDescription) || '';
  }
  if (autoGearPresetDescription) {
    var _texts$en22;
    autoGearPresetDescription.textContent = texts[lang].autoGearPresetDescription || ((_texts$en22 = texts.en) === null || _texts$en22 === void 0 ? void 0 : _texts$en22.autoGearPresetDescription) || '';
  }
  if (autoGearPresetLabel) {
    var _texts$en23, _texts$en24;
    var _label7 = texts[lang].autoGearPresetLabel || ((_texts$en23 = texts.en) === null || _texts$en23 === void 0 ? void 0 : _texts$en23.autoGearPresetLabel) || autoGearPresetLabel.textContent;
    var _help4 = texts[lang].autoGearPresetDescription || ((_texts$en24 = texts.en) === null || _texts$en24 === void 0 ? void 0 : _texts$en24.autoGearPresetDescription) || _label7;
    autoGearPresetLabel.textContent = _label7;
    autoGearPresetLabel.setAttribute('data-help', _help4);
    if (autoGearPresetSelect) {
      autoGearPresetSelect.setAttribute('aria-label', _label7);
      autoGearPresetSelect.setAttribute('data-help', _help4);
    }
  }
  if (autoGearSavePresetButton) {
    var _texts$en25;
    var _label8 = texts[lang].autoGearSavePresetButton || ((_texts$en25 = texts.en) === null || _texts$en25 === void 0 ? void 0 : _texts$en25.autoGearSavePresetButton) || autoGearSavePresetButton.textContent;
    autoGearSavePresetButton.textContent = _label8;
    autoGearSavePresetButton.setAttribute('data-help', _label8);
    autoGearSavePresetButton.setAttribute('aria-label', _label8);
  }
  if (autoGearDeletePresetButton) {
    var _texts$en26;
    var _label9 = texts[lang].autoGearDeletePresetButton || ((_texts$en26 = texts.en) === null || _texts$en26 === void 0 ? void 0 : _texts$en26.autoGearDeletePresetButton) || autoGearDeletePresetButton.textContent;
    autoGearDeletePresetButton.textContent = _label9;
    autoGearDeletePresetButton.setAttribute('data-help', _label9);
    autoGearDeletePresetButton.setAttribute('aria-label', _label9);
  }
  if (autoGearAddRuleBtn) {
    var _texts$en27, _texts$en28;
    var _label0 = texts[lang].autoGearAddRule || ((_texts$en27 = texts.en) === null || _texts$en27 === void 0 ? void 0 : _texts$en27.autoGearAddRule) || autoGearAddRuleBtn.textContent;
    autoGearAddRuleBtn.textContent = _label0;
    var _help5 = texts[lang].autoGearHeadingHelp || ((_texts$en28 = texts.en) === null || _texts$en28 === void 0 ? void 0 : _texts$en28.autoGearHeadingHelp) || _label0;
    autoGearAddRuleBtn.setAttribute('data-help', _help5);
  }
  if (autoGearResetFactoryButton) {
    var _texts$en29, _texts$en30;
    var _label1 = texts[lang].autoGearResetFactoryButton || ((_texts$en29 = texts.en) === null || _texts$en29 === void 0 ? void 0 : _texts$en29.autoGearResetFactoryButton) || autoGearResetFactoryButton.textContent;
    var _help6 = texts[lang].autoGearResetFactoryHelp || ((_texts$en30 = texts.en) === null || _texts$en30 === void 0 ? void 0 : _texts$en30.autoGearResetFactoryHelp) || _label1;
    autoGearResetFactoryButton.textContent = _label1;
    autoGearResetFactoryButton.setAttribute('data-help', _help6);
    autoGearResetFactoryButton.setAttribute('title', _help6);
    autoGearResetFactoryButton.setAttribute('aria-label', _label1);
  }
  if (autoGearExportButton) {
    var _texts$en31, _texts$en32;
    var _label10 = texts[lang].autoGearExportButton || ((_texts$en31 = texts.en) === null || _texts$en31 === void 0 ? void 0 : _texts$en31.autoGearExportButton) || autoGearExportButton.textContent;
    var _help7 = texts[lang].autoGearExportHelp || ((_texts$en32 = texts.en) === null || _texts$en32 === void 0 ? void 0 : _texts$en32.autoGearExportHelp) || _label10;
    autoGearExportButton.textContent = _label10;
    autoGearExportButton.setAttribute('data-help', _help7);
    autoGearExportButton.setAttribute('title', _help7);
    autoGearExportButton.setAttribute('aria-label', _label10);
  }
  if (autoGearImportButton) {
    var _texts$en33, _texts$en34;
    var _label11 = texts[lang].autoGearImportButton || ((_texts$en33 = texts.en) === null || _texts$en33 === void 0 ? void 0 : _texts$en33.autoGearImportButton) || autoGearImportButton.textContent;
    var _help8 = texts[lang].autoGearImportHelp || ((_texts$en34 = texts.en) === null || _texts$en34 === void 0 ? void 0 : _texts$en34.autoGearImportHelp) || _label11;
    autoGearImportButton.textContent = _label11;
    autoGearImportButton.setAttribute('data-help', _help8);
    autoGearImportButton.setAttribute('title', _help8);
    autoGearImportButton.setAttribute('aria-label', _label11);
  }
  if (autoGearBackupsHeading) {
    var _texts$en35;
    autoGearBackupsHeading.textContent = texts[lang].autoGearBackupsHeading || ((_texts$en35 = texts.en) === null || _texts$en35 === void 0 ? void 0 : _texts$en35.autoGearBackupsHeading) || autoGearBackupsHeading.textContent;
  }
  if (autoGearBackupsDescription) {
    var _texts$en36;
    var description = texts[lang].autoGearBackupsDescription || ((_texts$en36 = texts.en) === null || _texts$en36 === void 0 ? void 0 : _texts$en36.autoGearBackupsDescription) || '';
    autoGearBackupsDescription.textContent = description;
    if (description) {
      autoGearBackupsDescription.setAttribute('data-help', description);
    }
  }
  if (autoGearShowBackupsLabel) {
    var _texts$en37, _texts$en38;
    var _label12 = texts[lang].autoGearShowBackupsLabel || ((_texts$en37 = texts.en) === null || _texts$en37 === void 0 ? void 0 : _texts$en37.autoGearShowBackupsLabel) || autoGearShowBackupsLabel.textContent;
    var _help9 = texts[lang].autoGearShowBackupsHelp || ((_texts$en38 = texts.en) === null || _texts$en38 === void 0 ? void 0 : _texts$en38.autoGearShowBackupsHelp) || _label12;
    autoGearShowBackupsLabel.textContent = _label12;
    autoGearShowBackupsLabel.setAttribute('data-help', _help9);
    if (autoGearShowBackupsCheckbox) {
      autoGearShowBackupsCheckbox.setAttribute('aria-label', _label12);
      autoGearShowBackupsCheckbox.setAttribute('data-help', _help9);
    }
  }
  if (autoGearBackupsHiddenNotice) {
    var _texts$en39;
    var hiddenText = texts[lang].autoGearBackupsHidden || ((_texts$en39 = texts.en) === null || _texts$en39 === void 0 ? void 0 : _texts$en39.autoGearBackupsHidden) || autoGearBackupsHiddenNotice.textContent;
    autoGearBackupsHiddenNotice.textContent = hiddenText;
  }
  if (autoGearBackupSelectLabel) {
    var _texts$en40;
    var _label13 = texts[lang].autoGearBackupSelectLabel || ((_texts$en40 = texts.en) === null || _texts$en40 === void 0 ? void 0 : _texts$en40.autoGearBackupSelectLabel) || autoGearBackupSelectLabel.textContent;
    autoGearBackupSelectLabel.textContent = _label13;
    if (autoGearBackupSelect) {
      autoGearBackupSelect.setAttribute('aria-label', _label13);
      autoGearBackupSelect.setAttribute('title', _label13);
    }
  }
  if (autoGearBackupRestoreButton) {
    var _texts$en41;
    var _label14 = texts[lang].autoGearBackupRestore || ((_texts$en41 = texts.en) === null || _texts$en41 === void 0 ? void 0 : _texts$en41.autoGearBackupRestore) || autoGearBackupRestoreButton.textContent;
    autoGearBackupRestoreButton.textContent = _label14;
    autoGearBackupRestoreButton.setAttribute('aria-label', _label14);
    autoGearBackupRestoreButton.setAttribute('title', _label14);
  }
  if (autoGearBackupEmptyMessage) {
    var _texts$en42;
    var emptyText = texts[lang].autoGearBackupEmpty || ((_texts$en42 = texts.en) === null || _texts$en42 === void 0 ? void 0 : _texts$en42.autoGearBackupEmpty) || autoGearBackupEmptyMessage.textContent;
    autoGearBackupEmptyMessage.textContent = emptyText;
  }
  if (autoGearBackupSelect) {
    renderAutoGearBackupControls();
  }
  if (autoGearRuleNameLabel) {
    var _texts$en43, _texts$en44;
    var _label15 = texts[lang].autoGearRuleNameLabel || ((_texts$en43 = texts.en) === null || _texts$en43 === void 0 ? void 0 : _texts$en43.autoGearRuleNameLabel) || autoGearRuleNameLabel.textContent;
    autoGearRuleNameLabel.textContent = _label15;
    var _help0 = texts[lang].autoGearRuleNameHelp || ((_texts$en44 = texts.en) === null || _texts$en44 === void 0 ? void 0 : _texts$en44.autoGearRuleNameHelp) || _label15;
    autoGearRuleNameLabel.setAttribute('data-help', _help0);
    if (autoGearRuleNameInput) {
      autoGearRuleNameInput.setAttribute('data-help', _help0);
      autoGearRuleNameInput.setAttribute('aria-label', _label15);
    }
  }
  if (autoGearScenariosLabel) {
    var _texts$en45, _texts$en46;
    var _label16 = texts[lang].autoGearScenariosLabel || ((_texts$en45 = texts.en) === null || _texts$en45 === void 0 ? void 0 : _texts$en45.autoGearScenariosLabel) || autoGearScenariosLabel.textContent;
    autoGearScenariosLabel.textContent = _label16;
    var _help1 = texts[lang].autoGearScenariosHelp || ((_texts$en46 = texts.en) === null || _texts$en46 === void 0 ? void 0 : _texts$en46.autoGearScenariosHelp) || _label16;
    autoGearScenariosLabel.setAttribute('data-help', _help1);
    if (autoGearScenariosSelect) {
      autoGearScenariosSelect.setAttribute('data-help', _help1);
      autoGearScenariosSelect.setAttribute('aria-label', _label16);
    }
  }
  if (autoGearAddItemsHeading) {
    var _texts$en47;
    autoGearAddItemsHeading.textContent = texts[lang].autoGearAddItemsHeading || ((_texts$en47 = texts.en) === null || _texts$en47 === void 0 ? void 0 : _texts$en47.autoGearAddItemsHeading) || autoGearAddItemsHeading.textContent;
  }
  if (autoGearAddItemLabel) {
    var _texts$en48, _texts$en49;
    var _label17 = texts[lang].autoGearAddItemLabel || ((_texts$en48 = texts.en) === null || _texts$en48 === void 0 ? void 0 : _texts$en48.autoGearAddItemLabel) || autoGearAddItemLabel.textContent;
    var hint = texts[lang].autoGearAddMultipleHint || ((_texts$en49 = texts.en) === null || _texts$en49 === void 0 ? void 0 : _texts$en49.autoGearAddMultipleHint) || '';
    var helpText = hint ? "".concat(_label17, " \u2013 ").concat(hint) : _label17;
    autoGearAddItemLabel.textContent = _label17;
    autoGearAddItemLabel.setAttribute('data-help', helpText);
    if (autoGearAddNameInput) {
      autoGearAddNameInput.setAttribute('aria-label', _label17);
      autoGearAddNameInput.setAttribute('data-help', helpText);
      if (hint) {
        autoGearAddNameInput.setAttribute('placeholder', hint);
      } else {
        autoGearAddNameInput.removeAttribute('placeholder');
      }
    }
  }
  if (autoGearAddCategoryLabel) {
    var _texts$en50;
    var _label18 = texts[lang].autoGearAddCategoryLabel || ((_texts$en50 = texts.en) === null || _texts$en50 === void 0 ? void 0 : _texts$en50.autoGearAddCategoryLabel) || autoGearAddCategoryLabel.textContent;
    autoGearAddCategoryLabel.textContent = _label18;
    if (autoGearAddCategorySelect) {
      autoGearAddCategorySelect.setAttribute('aria-label', _label18);
    }
  }
  if (autoGearAddQuantityLabel) {
    var _texts$en51;
    var _label19 = texts[lang].autoGearAddQuantityLabel || ((_texts$en51 = texts.en) === null || _texts$en51 === void 0 ? void 0 : _texts$en51.autoGearAddQuantityLabel) || autoGearAddQuantityLabel.textContent;
    autoGearAddQuantityLabel.textContent = _label19;
    if (autoGearAddQuantityInput) {
      autoGearAddQuantityInput.setAttribute('aria-label', _label19);
    }
  }
  if (autoGearAddItemButton) {
    var _texts$en52;
    var _label20 = texts[lang].autoGearAddItemButton || ((_texts$en52 = texts.en) === null || _texts$en52 === void 0 ? void 0 : _texts$en52.autoGearAddItemButton) || autoGearAddItemButton.textContent;
    autoGearAddItemButton.textContent = _label20;
    autoGearAddItemButton.setAttribute('data-help', _label20);
  }
  if (autoGearRemoveItemsHeading) {
    var _texts$en53;
    autoGearRemoveItemsHeading.textContent = texts[lang].autoGearRemoveItemsHeading || ((_texts$en53 = texts.en) === null || _texts$en53 === void 0 ? void 0 : _texts$en53.autoGearRemoveItemsHeading) || autoGearRemoveItemsHeading.textContent;
  }
  if (autoGearRemoveItemLabel) {
    var _texts$en54, _texts$en55;
    var _label21 = texts[lang].autoGearRemoveItemLabel || ((_texts$en54 = texts.en) === null || _texts$en54 === void 0 ? void 0 : _texts$en54.autoGearRemoveItemLabel) || autoGearRemoveItemLabel.textContent;
    var _hint = texts[lang].autoGearRemoveMultipleHint || ((_texts$en55 = texts.en) === null || _texts$en55 === void 0 ? void 0 : _texts$en55.autoGearRemoveMultipleHint) || '';
    var _helpText = _hint ? "".concat(_label21, " \u2013 ").concat(_hint) : _label21;
    autoGearRemoveItemLabel.textContent = _label21;
    autoGearRemoveItemLabel.setAttribute('data-help', _helpText);
    if (autoGearRemoveNameInput) {
      autoGearRemoveNameInput.setAttribute('aria-label', _label21);
      autoGearRemoveNameInput.setAttribute('data-help', _helpText);
      if (_hint) {
        autoGearRemoveNameInput.setAttribute('placeholder', _hint);
      } else {
        autoGearRemoveNameInput.removeAttribute('placeholder');
      }
    }
  }
  if (autoGearRemoveCategoryLabel) {
    var _texts$en56;
    var _label22 = texts[lang].autoGearRemoveCategoryLabel || ((_texts$en56 = texts.en) === null || _texts$en56 === void 0 ? void 0 : _texts$en56.autoGearRemoveCategoryLabel) || autoGearRemoveCategoryLabel.textContent;
    autoGearRemoveCategoryLabel.textContent = _label22;
    if (autoGearRemoveCategorySelect) {
      autoGearRemoveCategorySelect.setAttribute('aria-label', _label22);
    }
  }
  if (autoGearRemoveQuantityLabel) {
    var _texts$en57;
    var _label23 = texts[lang].autoGearRemoveQuantityLabel || ((_texts$en57 = texts.en) === null || _texts$en57 === void 0 ? void 0 : _texts$en57.autoGearRemoveQuantityLabel) || autoGearRemoveQuantityLabel.textContent;
    autoGearRemoveQuantityLabel.textContent = _label23;
    if (autoGearRemoveQuantityInput) {
      autoGearRemoveQuantityInput.setAttribute('aria-label', _label23);
    }
  }
  if (autoGearRemoveItemButton) {
    var _texts$en58;
    var _label24 = texts[lang].autoGearRemoveItemButton || ((_texts$en58 = texts.en) === null || _texts$en58 === void 0 ? void 0 : _texts$en58.autoGearRemoveItemButton) || autoGearRemoveItemButton.textContent;
    autoGearRemoveItemButton.textContent = _label24;
    autoGearRemoveItemButton.setAttribute('data-help', _label24);
  }
  if (autoGearSaveRuleButton) {
    var _texts$en59;
    var _label25 = texts[lang].autoGearSaveRule || ((_texts$en59 = texts.en) === null || _texts$en59 === void 0 ? void 0 : _texts$en59.autoGearSaveRule) || autoGearSaveRuleButton.textContent;
    setButtonLabelWithIcon(autoGearSaveRuleButton, _label25);
    autoGearSaveRuleButton.setAttribute('data-help', _label25);
  }
  if (autoGearCancelEditButton) {
    var _texts$en60;
    var _label26 = texts[lang].autoGearCancelEdit || ((_texts$en60 = texts.en) === null || _texts$en60 === void 0 ? void 0 : _texts$en60.autoGearCancelEdit) || autoGearCancelEditButton.textContent;
    setButtonLabelWithIcon(autoGearCancelEditButton, _label26, ICON_GLYPHS.circleX);
    autoGearCancelEditButton.setAttribute('data-help', _label26);
  }
  if (autoGearAddCategorySelect) {
    populateAutoGearCategorySelect(autoGearAddCategorySelect, autoGearAddCategorySelect.value);
  }
  if (autoGearRemoveCategorySelect) {
    populateAutoGearCategorySelect(autoGearRemoveCategorySelect, autoGearRemoveCategorySelect.value);
  }
  if (autoGearScenariosSelect) {
    var _autoGearEditorDraft;
    refreshAutoGearScenarioOptions((_autoGearEditorDraft = autoGearEditorDraft) === null || _autoGearEditorDraft === void 0 ? void 0 : _autoGearEditorDraft.scenarios);
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
  if (backupSettings) {
    backupSettings.textContent = texts[lang].backupSettings;
    var backupHelp = texts[lang].backupSettingsHelp || texts[lang].backupSettings;
    backupSettings.setAttribute("data-help", backupHelp);
    backupSettings.setAttribute("title", backupHelp);
    backupSettings.setAttribute("aria-label", backupHelp);
  }
  if (restoreSettings) {
    restoreSettings.textContent = texts[lang].restoreSettings;
    var restoreHelp = texts[lang].restoreSettingsHelp || texts[lang].restoreSettings;
    restoreSettings.setAttribute("data-help", restoreHelp);
    restoreSettings.setAttribute("title", restoreHelp);
    restoreSettings.setAttribute("aria-label", restoreHelp);
  }
  if (factoryResetButton) {
    var resetLabel = texts[lang].factoryResetButton || "Factory reset";
    var resetHelp = texts[lang].factoryResetButtonHelp || resetLabel;
    factoryResetButton.textContent = resetLabel;
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
    var _texts$en61;
    var _label27 = texts[lang].saveSettings || ((_texts$en61 = texts.en) === null || _texts$en61 === void 0 ? void 0 : _texts$en61.saveSettings) || settingsSave.textContent;
    setButtonLabelWithIcon(settingsSave, _label27);
    var saveHelp = texts[lang].saveSettingsHelp || texts[lang].saveSettings || _label27;
    settingsSave.setAttribute("data-help", saveHelp);
    settingsSave.setAttribute("title", saveHelp);
    settingsSave.setAttribute("aria-label", saveHelp);
  }
  if (settingsCancel) {
    var _texts$en62;
    var _cancelLabel = texts[lang].cancelSettings || ((_texts$en62 = texts.en) === null || _texts$en62 === void 0 ? void 0 : _texts$en62.cancelSettings) || settingsCancel.textContent;
    setButtonLabelWithIcon(settingsCancel, _cancelLabel, ICON_GLYPHS.circleX);
    var cancelHelp = texts[lang].cancelSettingsHelp || texts[lang].cancelSettings || _cancelLabel;
    settingsCancel.setAttribute("data-help", cancelHelp);
    settingsCancel.setAttribute("title", cancelHelp);
    settingsCancel.setAttribute("aria-label", cancelHelp);
  }
  var menuToggle = document.getElementById("menuToggle");
  if (menuToggle) {
    var _texts$en63;
    var menuLabel = texts[lang].menuToggleLabel || ((_texts$en63 = texts.en) === null || _texts$en63 === void 0 ? void 0 : _texts$en63.menuToggleLabel) || menuToggle.getAttribute("aria-label") || "Menu";
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
  if (featureSearchClear) {
    featureSearchClear.setAttribute("title", texts[lang].featureSearchClear);
    featureSearchClear.setAttribute("aria-label", texts[lang].featureSearchClear);
    featureSearchClear.setAttribute("data-help", texts[lang].featureSearchClearHelp || texts[lang].featureSearchClear);
  }
  if (helpButton) {
    helpButton.setAttribute("title", texts[lang].helpButtonTitle || texts[lang].helpButtonLabel);
    helpButton.setAttribute("aria-label", texts[lang].helpButtonLabel);
    helpButton.setAttribute("data-help", texts[lang].helpButtonHelp || texts[lang].helpButtonTitle || texts[lang].helpButtonLabel);
    if (hoverHelpButton) {
      hoverHelpButton.textContent = texts[lang].hoverHelpButtonLabel;
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
      closeHelpBtn.textContent = texts[lang].helpClose;
      closeHelpBtn.setAttribute("title", texts[lang].helpClose);
      closeHelpBtn.setAttribute("aria-label", texts[lang].helpClose);
      closeHelpBtn.setAttribute("data-help", texts[lang].helpCloseHelp || texts[lang].helpClose);
    }
    if (document.getElementById("helpTitle")) {
      document.getElementById("helpTitle").textContent = texts[lang].helpTitle;
    }
    if (helpNoResults) helpNoResults.textContent = texts[lang].helpNoResults;
    if (typeof updateHelpQuickLinksForLanguage === 'function') {
      updateHelpQuickLinksForLanguage(lang);
    }
  }
  setButtonLabelWithIcon(document.getElementById("generateOverviewBtn"), texts[lang].generateOverviewBtn, ICON_GLYPHS.overview);
  setButtonLabelWithIcon(document.getElementById("generateGearListBtn"), texts[lang].generateGearListBtn, ICON_GLYPHS.gears);
  setButtonLabelWithIcon(document.getElementById("shareSetupBtn"), texts[lang].shareSetupBtn, ICON_GLYPHS.fileExport);
  var exportRevert = document.getElementById("exportAndRevertBtn");
  if (exportRevert) {
    exportRevert.textContent = texts[lang].exportAndRevertBtn;
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
    zoomInBtn.setAttribute("title", texts[lang].zoomInLabel);
    zoomInBtn.setAttribute("aria-label", texts[lang].zoomInLabel);
    zoomInBtn.setAttribute("data-help", texts[lang].zoomInHelp);
  }
  if (zoomOutBtn) {
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
      var noneLabel = projectFormTexts.viewfinderExtensionNone || fallbackProjectForm.viewfinderExtensionNone;
      var yesLabel = projectFormTexts.viewfinderExtensionYes || fallbackProjectForm.viewfinderExtensionYes;
      if (noneLabel) viewfinderExtensionSelect.options[0].textContent = noneLabel;
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
      if (submitText) projectSubmitBtn.textContent = submitText;
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
  }
  if (iosPwaHelpTitle) iosPwaHelpTitle.textContent = texts[lang].iosPwaHelpTitle;
  if (iosPwaHelpIntro) iosPwaHelpIntro.textContent = texts[lang].iosPwaHelpIntro;
  if (iosPwaHelpStep1) iosPwaHelpStep1.textContent = texts[lang].iosPwaHelpStep1;
  if (iosPwaHelpStep2) iosPwaHelpStep2.textContent = texts[lang].iosPwaHelpStep2;
  if (iosPwaHelpStep3) iosPwaHelpStep3.textContent = texts[lang].iosPwaHelpStep3;
  if (iosPwaHelpStep4) iosPwaHelpStep4.textContent = texts[lang].iosPwaHelpStep4;
  if (iosPwaHelpNote) iosPwaHelpNote.textContent = texts[lang].iosPwaHelpNote;
  if (iosPwaHelpClose) {
    iosPwaHelpClose.textContent = texts[lang].iosPwaHelpClose;
    iosPwaHelpClose.setAttribute('aria-label', texts[lang].iosPwaHelpClose);
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
  UICONS: 'uicons'
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
var FEEDBACK_ICON_SVG = "\n  <svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n    <path\n      d=\"M5 4.5H19Q21.5 4.5 21.5 7V13Q21.5 15.5 19 15.5H15.5L12 19 8.5 15.5H5Q2.5 15.5 2.5 13V7Q2.5 4.5 5 4.5Z\"\n      fill=\"none\"\n      stroke=\"currentColor\"\n      stroke-width=\"1.5\"\n      stroke-linecap=\"round\"\n      stroke-linejoin=\"round\"\n    />\n    <path\n      d=\"M8.5 10.5 10.5 12.5 14.5 8.5\"\n      fill=\"none\"\n      stroke=\"currentColor\"\n      stroke-width=\"1.5\"\n      stroke-linecap=\"round\"\n      stroke-linejoin=\"round\"\n    />\n  </svg>\n".trim();
var LOAD_ICON_SVG = "\n  <svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n    <path\n      d=\"M12 3v9.75\"\n      fill=\"none\"\n      stroke=\"currentColor\"\n      stroke-width=\"1.5\"\n      stroke-linecap=\"round\"\n      stroke-linejoin=\"round\"\n    />\n    <polyline\n      points=\"8.75 9.75 12 12.75 15.25 9.75\"\n      fill=\"none\"\n      stroke=\"currentColor\"\n      stroke-width=\"1.5\"\n      stroke-linecap=\"round\"\n      stroke-linejoin=\"round\"\n    />\n    <path\n      d=\"M4.75 11.5H8.6L10.4 9h8.85L21 11.5\"\n      fill=\"none\"\n      stroke=\"currentColor\"\n      stroke-width=\"1.5\"\n      stroke-linecap=\"round\"\n      stroke-linejoin=\"round\"\n    />\n    <rect\n      x=\"4.75\"\n      y=\"12.5\"\n      width=\"14.5\"\n      height=\"7.25\"\n      rx=\"1.75\"\n      fill=\"none\"\n      stroke=\"currentColor\"\n      stroke-width=\"1.5\"\n      stroke-linecap=\"round\"\n      stroke-linejoin=\"round\"\n    />\n  </svg>\n".trim();
var RESET_VIEW_ICON_SVG = "\n  <svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\">\n    <g\n      fill=\"none\"\n      stroke=\"currentColor\"\n      stroke-width=\"1.5\"\n      stroke-linecap=\"round\"\n      stroke-linejoin=\"round\"\n    >\n      <line x1=\"12\" y1=\"4.75\" x2=\"12\" y2=\"9.75\" />\n      <polyline points=\"10.75 8.5 12 9.75 13.25 8.5\" />\n      <line x1=\"12\" y1=\"19.25\" x2=\"12\" y2=\"14.25\" />\n      <polyline points=\"10.75 15.5 12 14.25 13.25 15.5\" />\n      <line x1=\"4.75\" y1=\"12\" x2=\"9.75\" y2=\"12\" />\n      <polyline points=\"8.5 10.75 9.75 12 8.5 13.25\" />\n      <line x1=\"19.25\" y1=\"12\" x2=\"14.25\" y2=\"12\" />\n      <polyline points=\"15.5 10.75 14.25 12 15.5 13.25\" />\n    </g>\n    <circle cx=\"12\" cy=\"12\" r=\"1.35\" fill=\"currentColor\" />\n  </svg>\n".trim();
var PRODUCTION_COMPANY_ICON = iconGlyph('\uE2D5', ICON_FONT_KEYS.UICONS);
var RENTAL_HOUSE_ICON = iconGlyph('\uEA09', ICON_FONT_KEYS.UICONS);
var ASPECT_RATIO_ICON = iconGlyph('\uE71D', ICON_FONT_KEYS.UICONS);
var REQUIRED_SCENARIOS_ICON = iconGlyph('\uF4D4', ICON_FONT_KEYS.UICONS);
var MONITORING_SUPPORT_ICON = iconGlyph('\uEF0F', ICON_FONT_KEYS.UICONS);
var STAR_ICON_SVG = "\n  <svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M12 17.25 6.545 20.2 7.9 13.975 3 9.45l6.272-.7L12 3l2.728 5.75L21 9.45l-4.9 4.525 1.355 6.225Z\" />\n  </svg>\n".trim();
var ICON_GLYPHS = Object.freeze({
  batteryBolt: iconGlyph("\uE1A6", ICON_FONT_KEYS.UICONS),
  batteryFull: iconGlyph("\uE1A9", ICON_FONT_KEYS.UICONS),
  bolt: iconGlyph("\uF1F8", ICON_FONT_KEYS.ESSENTIAL),
  plug: iconGlyph("\uEE75", ICON_FONT_KEYS.UICONS),
  sliders: iconGlyph("\uF143", ICON_FONT_KEYS.ESSENTIAL),
  screen: iconGlyph("\uF11D", ICON_FONT_KEYS.GADGET),
  brightness: iconGlyph("\uE2B3", ICON_FONT_KEYS.UICONS),
  wifi: iconGlyph("\uF4AC", ICON_FONT_KEYS.UICONS),
  gears: iconGlyph("\uF205", ICON_FONT_KEYS.ESSENTIAL),
  controller: iconGlyph("\uF117", ICON_FONT_KEYS.GADGET),
  distance: iconGlyph("\uEFB9", ICON_FONT_KEYS.UICONS),
  viewfinder: iconGlyph("\uF114", ICON_FONT_KEYS.FILM),
  camera: iconGlyph("\uE333", ICON_FONT_KEYS.UICONS),
  trash: iconGlyph("\uF254", ICON_FONT_KEYS.ESSENTIAL),
  reload: iconGlyph("\uF202", ICON_FONT_KEYS.ESSENTIAL),
  load: Object.freeze({
    markup: LOAD_ICON_SVG,
    className: 'icon-svg'
  }),
  fileExport: iconGlyph("\uE7AB", ICON_FONT_KEYS.UICONS),
  fileImport: iconGlyph("\uE7C7", ICON_FONT_KEYS.UICONS),
  save: iconGlyph("\uF207", ICON_FONT_KEYS.ESSENTIAL),
  share: iconGlyph("\uF219", ICON_FONT_KEYS.ESSENTIAL),
  magnet: iconGlyph("\uF1B5", ICON_FONT_KEYS.ESSENTIAL),
  timecode: iconGlyph("\uF10E", ICON_FONT_KEYS.FILM),
  audioIn: iconGlyph("\uF1C3", ICON_FONT_KEYS.ESSENTIAL),
  audioOut: iconGlyph("\uF22F", ICON_FONT_KEYS.ESSENTIAL),
  note: iconGlyph("\uF13E", ICON_FONT_KEYS.ESSENTIAL),
  overview: iconGlyph("\uF1F5", ICON_FONT_KEYS.UICONS),
  feedback: Object.freeze({
    markup: FEEDBACK_ICON_SVG,
    className: 'icon-svg'
  }),
  resetView: Object.freeze({
    markup: RESET_VIEW_ICON_SVG,
    className: 'icon-svg'
  }),
  pin: iconGlyph("\uF1EF", ICON_FONT_KEYS.ESSENTIAL),
  sun: iconGlyph("\uF1FE", ICON_FONT_KEYS.UICONS),
  moon: iconGlyph("\uEC7E", ICON_FONT_KEYS.UICONS),
  circleX: iconGlyph("\uF131", ICON_FONT_KEYS.ESSENTIAL),
  star: Object.freeze({
    markup: STAR_ICON_SVG,
    className: 'icon-svg favorite-star-icon'
  }),
  warning: iconGlyph("\uF26F", ICON_FONT_KEYS.ESSENTIAL)
});
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
var PINK_MODE_ANIMATED_ICON_FILES = Object.freeze(['src/animations/cat.json', 'src/animations/cup.json', 'src/animations/cupcake.json', 'src/animations/flamingo.json', 'src/animations/float.json', 'src/animations/float-2.json', 'src/animations/fox.json', 'src/animations/heart.json', 'src/animations/horn.json', 'src/animations/invitation.json', 'src/animations/mask.json', 'src/animations/rainbow.json', 'src/animations/rocking-horse.json', 'src/animations/slippers.json', 'src/animations/sunglasses.json', 'src/animations/unicorn.json']);
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
var PINK_MODE_ANIMATED_ICON_AVOID_SELECTOR = 'a, button, input, select, textarea, label, summary, h1, h2, h3, h4, h5, h6, p, li, td, th, [role="button"], [role="link"], [role="menu"], [role="dialog"], [role="listbox"], [role="combobox"], [role="textbox"], [contenteditable="true"], .form-row, .form-row-actions, .form-actions';
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
var pinkModeAnimatedIconTimeoutId = null;
var pinkModeAnimatedIconsActive = false;
var pinkModeAnimatedIconTemplates = null;
var pinkModeAnimatedIconTemplatesPromise = null;
var pinkModeAnimatedIconInstances = new Set();
var pinkModeAnimatedIconLastTemplateName = null;
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
function setPinkModeIconSequence(markupList) {
  if (!Array.isArray(markupList) || !markupList.length) {
    return false;
  }
  var configs = markupList.map(ensureSvgHasAriaHidden).filter(Boolean).map(function (markup) {
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
function ensurePinkModeAnimationLayer() {
  if (!document) {
    return null;
  }
  var host = document.getElementById('mainContent') || document.body;
  if (!host) {
    return null;
  }
  if (pinkModeAnimatedIconLayer && pinkModeAnimatedIconLayer.isConnected && host.contains(pinkModeAnimatedIconLayer)) {
    return pinkModeAnimatedIconLayer;
  }
  if (pinkModeAnimatedIconLayer && pinkModeAnimatedIconLayer.parentNode) {
    pinkModeAnimatedIconLayer.parentNode.removeChild(pinkModeAnimatedIconLayer);
  }
  var layer = document.createElement('div');
  layer.className = 'pink-mode-animation-layer';
  layer.setAttribute('aria-hidden', 'true');
  host.appendChild(layer);
  pinkModeAnimatedIconLayer = layer;
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
function findPinkModeAnimationPlacement(_ref18) {
  var layer = _ref18.layer,
    hostRect = _ref18.hostRect,
    hostTop = _ref18.hostTop,
    visibleTop = _ref18.visibleTop,
    visibleBottom = _ref18.visibleBottom,
    horizontalPadding = _ref18.horizontalPadding,
    verticalPadding = _ref18.verticalPadding,
    hostWidth = _ref18.hostWidth,
    size = _ref18.size,
    avoidRegions = _ref18.avoidRegions;
  var minY = Math.max(visibleTop - hostTop + verticalPadding, verticalPadding);
  var maxY = Math.max(visibleBottom - hostTop - verticalPadding, minY);
  var minX = horizontalPadding;
  var maxX = Math.max(hostWidth - horizontalPadding, minX);
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
}
function spawnPinkModeAnimatedIconInstance(templates) {
  if (!pinkModeAnimatedIconsActive || !Array.isArray(templates) || !templates.length || typeof window === 'undefined' || !window.lottie || typeof window.lottie.loadAnimation !== 'function') {
    return false;
  }
  var layer = ensurePinkModeAnimationLayer();
  if (!layer) {
    return false;
  }
  var availableTemplates = templates;
  if (templates.length > 1 && pinkModeAnimatedIconLastTemplateName) {
    var filteredTemplates = templates.filter(function (template) {
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
  var safeHorizontalRange = Math.max(hostWidth, size * 3);
  var safeVerticalRange = Math.max(hostHeight, size * 3);
  var horizontalPadding = Math.min(Math.max(size * 0.6 + 48, 48), safeHorizontalRange / 2);
  var verticalPadding = Math.min(Math.max(size * 0.6 + 64, 64), safeVerticalRange / 2);
  var avoidRegions = [].concat(_toConsumableArray(computePinkModeAnimationAvoidRegions(layer)), _toConsumableArray(collectPinkModeAnimationInstanceRegions(layer)));
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
    avoidRegions: avoidRegions
  });
  if (!placement) {
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
    return false;
  }
  var x = placement.x,
    y = placement.y;
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
    destroyed: false
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
  crew: iconGlyph("\uE638", ICON_FONT_KEYS.UICONS),
  prepDays: iconGlyph("\uE312", ICON_FONT_KEYS.UICONS),
  shootingDays: iconGlyph("\uE311", ICON_FONT_KEYS.UICONS),
  deliveryResolution: iconGlyph("\uE5BA", ICON_FONT_KEYS.UICONS),
  recordingResolution: ICON_GLYPHS.camera,
  aspectRatio: ASPECT_RATIO_ICON,
  codec: iconGlyph("\uE7C9", ICON_FONT_KEYS.UICONS),
  baseFrameRate: iconGlyph("\uE46F", ICON_FONT_KEYS.UICONS),
  sensorMode: iconGlyph("\uF034", ICON_FONT_KEYS.UICONS),
  requiredScenarios: REQUIRED_SCENARIOS_ICON,
  lenses: iconGlyph("\uE0A3", ICON_FONT_KEYS.UICONS),
  cameraHandle: iconGlyph("\uF2DC", ICON_FONT_KEYS.UICONS),
  viewfinderExtension: iconGlyph("\uE338", ICON_FONT_KEYS.UICONS),
  gimbal: iconGlyph("\uEA9C", ICON_FONT_KEYS.UICONS),
  monitoringSupport: MONITORING_SUPPORT_ICON,
  monitoringConfiguration: iconGlyph("\uF0D0", ICON_FONT_KEYS.UICONS),
  monitorUserButtons: iconGlyph("\uF0D1", ICON_FONT_KEYS.UICONS),
  cameraUserButtons: iconGlyph("\uF0D1", ICON_FONT_KEYS.UICONS),
  viewfinderUserButtons: iconGlyph("\uF0D2", ICON_FONT_KEYS.UICONS)
};
function setButtonLabelWithIcon(button, label) {
  var glyph = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ICON_GLYPHS.save;
  if (!button) return;
  var safeLabel = typeof label === 'string' ? escapeHtml(label) : '';
  var iconHtml = iconMarkup(glyph, 'btn-icon');
  button.innerHTML = "".concat(iconHtml).concat(safeLabel);
}
function createCrewRow() {
  var _texts$en65, _texts$currentLang2;
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (!crewContainer) return;
  var row = document.createElement('div');
  row.className = 'person-row';
  var roleSel = document.createElement('select');
  crewRoles.forEach(function (r) {
    var _texts$currentLang, _texts$en64;
    var opt = document.createElement('option');
    opt.value = r;
    var roleLabels = ((_texts$currentLang = texts[currentLang]) === null || _texts$currentLang === void 0 ? void 0 : _texts$currentLang.crewRoles) || ((_texts$en64 = texts.en) === null || _texts$en64 === void 0 ? void 0 : _texts$en64.crewRoles) || {};
    opt.textContent = roleLabels[r] || r;
    roleSel.appendChild(opt);
  });
  if (data.role) roleSel.value = data.role;
  var nameInput = document.createElement('input');
  nameInput.type = 'text';
  var fallbackProjectForm = ((_texts$en65 = texts.en) === null || _texts$en65 === void 0 ? void 0 : _texts$en65.projectForm) || {};
  var projectFormTexts = ((_texts$currentLang2 = texts[currentLang]) === null || _texts$currentLang2 === void 0 ? void 0 : _texts$currentLang2.projectForm) || fallbackProjectForm;
  nameInput.placeholder = projectFormTexts.crewNamePlaceholder || fallbackProjectForm.crewNamePlaceholder || 'Name';
  nameInput.className = 'person-name';
  nameInput.value = data.name || '';
  var phoneInput = document.createElement('input');
  phoneInput.type = 'tel';
  phoneInput.placeholder = projectFormTexts.crewPhonePlaceholder || fallbackProjectForm.crewPhonePlaceholder || 'Phone';
  phoneInput.className = 'person-phone';
  phoneInput.value = data.phone || '';
  var emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.placeholder = projectFormTexts.crewEmailPlaceholder || fallbackProjectForm.crewEmailPlaceholder || 'Email';
  emailInput.className = 'person-email';
  emailInput.value = data.email || '';
  var removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
  removeBtn.addEventListener('click', function () {
    row.remove();
    scheduleProjectAutoSave(true);
  });
  row.append(roleSel, nameInput, phoneInput, emailInput, removeBtn);
  crewContainer.appendChild(row);
}
function createPrepRow() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (!prepContainer) return;
  var row = document.createElement('div');
  row.className = 'period-row';
  var start = document.createElement('input');
  start.type = 'date';
  start.className = 'prep-start';
  start.value = data.start || '';
  start.setAttribute('aria-labelledby', 'prepLabel');
  var span = document.createElement('span');
  span.textContent = 'to';
  var end = document.createElement('input');
  end.type = 'date';
  end.className = 'prep-end';
  end.value = data.end || '';
  end.setAttribute('aria-labelledby', 'prepLabel');
  var removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
  removeBtn.addEventListener('click', function () {
    row.remove();
    scheduleProjectAutoSave(true);
  });
  row.append(start, span, end, removeBtn);
  prepContainer.appendChild(row);
}
function createShootRow() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (!shootContainer) return;
  var row = document.createElement('div');
  row.className = 'period-row';
  var start = document.createElement('input');
  start.type = 'date';
  start.className = 'shoot-start';
  start.value = data.start || '';
  start.setAttribute('aria-labelledby', 'shootLabel');
  var span = document.createElement('span');
  span.textContent = 'to';
  var end = document.createElement('input');
  end.type = 'date';
  end.className = 'shoot-end';
  end.value = data.end || '';
  end.setAttribute('aria-labelledby', 'shootLabel');
  var removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
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
var powerDiagramElem = document.getElementById("powerDiagram");
var powerDiagramBarElem = document.getElementById("powerDiagramBar");
var maxPowerTextElem = document.getElementById("maxPowerText");
var powerDiagramLegendElem = document.getElementById("powerDiagramLegend");
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
var clearSetupBtn = document.getElementById("clearSetupBtn");
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
  autoGearRules: "a"
};
var lastSharedSetupData = null;
var lastSharedAutoGearRules = null;
var sharedImportPreviousPresetId = '';
var sharedImportProjectPresetActive = false;
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
  var _texts$en66, _texts$en67;
  var langTexts = texts[currentLang] || texts.en || {};
  var fallback = langTexts.sharedImportAutoGearPresetFallback || ((_texts$en66 = texts.en) === null || _texts$en66 === void 0 ? void 0 : _texts$en66.sharedImportAutoGearPresetFallback) || 'Shared automatic gear rules';
  var projectName = getSharedImportProjectName(sharedData);
  if (!projectName) {
    return fallback;
  }
  var template = langTexts.sharedImportAutoGearPresetName || ((_texts$en67 = texts.en) === null || _texts$en67 === void 0 ? void 0 : _texts$en67.sharedImportAutoGearPresetName) || '%s';
  if (template.includes('%s')) {
    return formatWithPlaceholders(template, projectName);
  }
  return "".concat(template, " ").concat(projectName).trim();
}
function ensureSharedAutoGearPreset(rules, sharedData) {
  var _texts$currentLang3, _texts$en68;
  var normalizedRules = Array.isArray(rules) ? rules.map(normalizeAutoGearRule).filter(Boolean) : [];
  if (!normalizedRules.length) return null;
  var label = getSharedImportPresetLabel(sharedData);
  var fingerprint = createAutoGearRulesFingerprint(normalizedRules);
  var preset = autoGearPresets.find(function (entry) {
    return entry.fingerprint === fingerprint;
  }) || null;
  var fallback = ((_texts$currentLang3 = texts[currentLang]) === null || _texts$currentLang3 === void 0 ? void 0 : _texts$currentLang3.sharedImportAutoGearPresetFallback) || ((_texts$en68 = texts.en) === null || _texts$en68 === void 0 ? void 0 : _texts$en68.sharedImportAutoGearPresetFallback) || 'Shared automatic gear rules';
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
    Object.entries(node).forEach(function (_ref19) {
      var _ref20 = _slicedToArray(_ref19, 2),
        childKey = _ref20[0],
        value = _ref20[1];
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
    Object.entries(data).forEach(function (_ref21) {
      var _ref22 = _slicedToArray(_ref21, 2),
        key = _ref22[0],
        value = _ref22[1];
      if (key === 'accessories') {
        if (value && _typeof(value) === 'object') {
          Object.entries(value).forEach(function (_ref23) {
            var _ref24 = _slicedToArray(_ref23, 2),
              subKey = _ref24[0],
              subValue = _ref24[1];
            if (subValue && _typeof(subValue) === 'object' && !Array.isArray(subValue)) {
              addCategory("accessories.".concat(subKey));
            }
          });
        }
      } else if (key === 'fiz') {
        if (value && _typeof(value) === 'object') {
          Object.entries(value).forEach(function (_ref25) {
            var _ref26 = _slicedToArray(_ref25, 2),
              subKey = _ref26[0],
              subValue = _ref26[1];
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
function populateCategoryOptions() {
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
      for (var _i6 = 0, _Object$entries6 = Object.entries(deviceSchema.accessories); _i6 < _Object$entries6.length; _i6++) {
        var _Object$entries6$_i = _slicedToArray(_Object$entries6[_i6], 2),
          _sub = _Object$entries6$_i[0],
          obj = _Object$entries6$_i[1];
        if (_sub === 'cables') {
          addOpt('accessories.cables');
        } else if (obj && obj.attributes) {
          addOpt("accessories.".concat(_sub));
        }
      }
    }
    for (var _i7 = 0, _Object$entries7 = Object.entries(deviceSchema); _i7 < _Object$entries7.length; _i7++) {
      var _Object$entries7$_i = _slicedToArray(_Object$entries7[_i7], 2),
        _key = _Object$entries7$_i[0],
        _obj = _Object$entries7$_i[1];
      if (_key === 'accessories' || _key === 'fiz') continue;
      if (_obj && _obj.attributes) addOpt(_key);
    }
    if (deviceSchema.fiz) {
      for (var _i8 = 0, _Object$entries8 = Object.entries(deviceSchema.fiz); _i8 < _Object$entries8.length; _i8++) {
        var _Object$entries8$_i = _slicedToArray(_Object$entries8[_i8], 2),
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
    for (var _i9 = 0, _Object$entries9 = Object.entries(devices); _i9 < _Object$entries9.length; _i9++) {
      var _Object$entries9$_i = _slicedToArray(_Object$entries9[_i9], 2),
        _key2 = _Object$entries9$_i[0],
        _obj3 = _Object$entries9$_i[1];
      if (_key2 === 'accessories') {
        for (var _i0 = 0, _Object$keys = Object.keys(_obj3 || {}); _i0 < _Object$keys.length; _i0++) {
          var _sub3 = _Object$keys[_i0];
          addIfMissing("accessories.".concat(_sub3));
        }
      } else if (_key2 === 'fiz') {
        for (var _i1 = 0, _Object$keys2 = Object.keys(_obj3 || {}); _i1 < _Object$keys2.length; _i1++) {
          var _sub4 = _Object$keys2[_i1];
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
  var _ref27 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    _ref27$create = _ref27.create,
    create = _ref27$create === void 0 ? false : _ref27$create;
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
    var _label28 = document.createElement('label');
    _label28.setAttribute('for', attrId);
    _label28.textContent = labelText;
    _row.appendChild(_label28);
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
    var _help10 = document.createElement('p');
    _help10.className = 'schema-field-help';
    _help10.textContent = config.help;
    controlContainer.appendChild(_help10);
  }
  row.appendChild(controlContainer);
  return row;
}
function getSchemaAttributesForCategory(category) {
  if (!deviceSchema) return [];
  var parts = category.split('.');
  var node = deviceSchema;
  var _iterator9 = _createForOfIteratorHelper(parts),
    _step9;
  try {
    for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
      var p = _step9.value;
      node = node && node[p];
      if (!node) return [];
    }
  } catch (err) {
    _iterator9.e(err);
  } finally {
    _iterator9.f();
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
  var _iterator0 = _createForOfIteratorHelper(getSchemaAttributesForCategory(category)),
    _step0;
  try {
    for (_iterator0.s(); !(_step0 = _iterator0.n()).done;) {
      var attr = _step0.value;
      if (skip(attr)) continue;
      seen.add(attr);
      attrs.push(attr);
    }
  } catch (err) {
    _iterator0.e(err);
  } finally {
    _iterator0.f();
  }
  if (data && _typeof(data) === 'object' && !Array.isArray(data)) {
    for (var _i10 = 0, _Object$keys3 = Object.keys(data); _i10 < _Object$keys3.length; _i10++) {
      var _key4 = _Object$keys3[_i10];
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
  var _iterator1 = _createForOfIteratorHelper(attrs),
    _step1;
  try {
    for (_iterator1.s(); !(_step1 = _iterator1.n()).done;) {
      var attr = _step1.value;
      var _value2 = data && data[attr] !== undefined ? data[attr] : undefined;
      list.appendChild(createSchemaField(category, attr, _value2));
    }
  } catch (err) {
    _iterator1.e(err);
  } finally {
    _iterator1.f();
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
  var _iterator10 = _createForOfIteratorHelper(attrs),
    _step10;
  try {
    for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
      var attr = _step10.value;
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
    _iterator10.e(err);
  } finally {
    _iterator10.f();
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
var helpSearchClear = document.getElementById("helpSearchClear");
var helpSectionsContainer = document.getElementById("helpSections");
var helpQuickLinksNav = document.getElementById("helpQuickLinks");
var helpQuickLinksHeading = document.getElementById("helpQuickLinksHeading");
var helpQuickLinksList = document.getElementById("helpQuickLinksList");
var installPromptBanner = document.getElementById("installPromptBanner");
var installPromptBannerText = document.getElementById("installPromptBannerText");
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
var settingsDialog = document.getElementById("settingsDialog");
if (settingsButton) {
  settingsButton.setAttribute('data-allow-hover-help', '');
}
if (settingsDialog) {
  settingsDialog.setAttribute('data-allow-hover-help', '');
}
var settingsLanguage = document.getElementById("settingsLanguage");
var settingsDarkMode = document.getElementById("settingsDarkMode");
var settingsPinkMode = document.getElementById("settingsPinkMode");
var accentColorInput = document.getElementById("accentColorInput");
var settingsFontSize = document.getElementById("settingsFontSize");
var settingsFontFamily = document.getElementById("settingsFontFamily");
var localFontsButton = document.getElementById("localFontsButton");
var localFontsInput = document.getElementById("localFontsInput");
var localFontsStatus = document.getElementById("localFontsStatus");
var localFontsGroup = document.getElementById("localFontsGroup");
var bundledFontGroup = document.getElementById("bundledFontOptions");
var settingsLogo = document.getElementById("settingsLogo");
var settingsLogoPreview = document.getElementById("settingsLogoPreview");
var autoGearHeadingElem = document.getElementById('autoGearHeading');
var autoGearDescriptionElem = document.getElementById('autoGearDescription');
var autoGearRulesList = document.getElementById('autoGearRulesList');
var autoGearPresetDescription = document.getElementById('autoGearPresetDescription');
var autoGearPresetLabel = document.getElementById('autoGearPresetLabel');
var autoGearPresetSelect = document.getElementById('autoGearPresetSelect');
var autoGearSavePresetButton = document.getElementById('autoGearSavePreset');
var autoGearDeletePresetButton = document.getElementById('autoGearDeletePreset');
var autoGearAddRuleBtn = document.getElementById('autoGearAddRule');
var autoGearResetFactoryButton = document.getElementById('autoGearResetFactory');
var autoGearEditor = document.getElementById('autoGearEditor');
var autoGearRuleNameInput = document.getElementById('autoGearRuleName');
var autoGearRuleNameLabel = document.getElementById('autoGearRuleNameLabel');
var autoGearScenariosSelect = document.getElementById('autoGearScenarios');
var autoGearScenariosLabel = document.getElementById('autoGearScenariosLabel');
var autoGearAddItemsHeading = document.getElementById('autoGearAddItemsHeading');
var autoGearAddItemLabel = document.getElementById('autoGearAddItemLabel');
var autoGearAddCategoryLabel = document.getElementById('autoGearAddCategoryLabel');
var autoGearAddQuantityLabel = document.getElementById('autoGearAddQuantityLabel');
var autoGearAddNameInput = document.getElementById('autoGearAddName');
var autoGearAddCategorySelect = document.getElementById('autoGearAddCategory');
var autoGearAddQuantityInput = document.getElementById('autoGearAddQuantity');
var autoGearAddItemButton = document.getElementById('autoGearAddItemButton');
var autoGearAddList = document.getElementById('autoGearAddList');
var autoGearRemoveItemsHeading = document.getElementById('autoGearRemoveItemsHeading');
var autoGearRemoveItemLabel = document.getElementById('autoGearRemoveItemLabel');
var autoGearRemoveCategoryLabel = document.getElementById('autoGearRemoveCategoryLabel');
var autoGearRemoveQuantityLabel = document.getElementById('autoGearRemoveQuantityLabel');
var autoGearRemoveNameInput = document.getElementById('autoGearRemoveName');
var autoGearRemoveCategorySelect = document.getElementById('autoGearRemoveCategory');
var autoGearRemoveQuantityInput = document.getElementById('autoGearRemoveQuantity');
var autoGearRemoveItemButton = document.getElementById('autoGearRemoveItemButton');
var autoGearRemoveList = document.getElementById('autoGearRemoveList');
var autoGearSaveRuleButton = document.getElementById('autoGearSaveRule');
var autoGearCancelEditButton = document.getElementById('autoGearCancelEdit');
var autoGearItemCatalog = document.getElementById('autoGearItemCatalog');
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
var autoGearEditorDraft = null;
function createAutoGearDraft(rule) {
  if (rule) {
    return {
      id: rule.id,
      label: rule.label || '',
      scenarios: Array.isArray(rule.scenarios) ? rule.scenarios.slice() : [],
      add: Array.isArray(rule.add) ? rule.add.map(function (item) {
        return _objectSpread({}, item);
      }) : [],
      remove: Array.isArray(rule.remove) ? rule.remove.map(function (item) {
        return _objectSpread({}, item);
      }) : []
    };
  }
  return {
    id: generateAutoGearId('rule'),
    label: '',
    scenarios: [],
    add: [],
    remove: []
  };
}
function refreshAutoGearScenarioOptions(selected) {
  var _autoGearEditorDraft2;
  if (!autoGearScenariosSelect) return;
  var candidateValues = Array.isArray(selected) ? selected : typeof selected === 'string' && selected ? [selected] : Array.isArray((_autoGearEditorDraft2 = autoGearEditorDraft) === null || _autoGearEditorDraft2 === void 0 ? void 0 : _autoGearEditorDraft2.scenarios) ? autoGearEditorDraft.scenarios : [];
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
    var _texts$currentLang4, _texts$en69;
    var placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = ((_texts$currentLang4 = texts[currentLang]) === null || _texts$currentLang4 === void 0 ? void 0 : _texts$currentLang4.autoGearScenarioPlaceholder) || ((_texts$en69 = texts.en) === null || _texts$en69 === void 0 ? void 0 : _texts$en69.autoGearScenarioPlaceholder) || 'Select scenarios';
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
  var visibleCount = selectableOptions.length ? Math.min(6, Math.max(selectableOptions.length, 3)) : 1;
  autoGearScenariosSelect.size = visibleCount;
}
function populateAutoGearCategorySelect(select, currentValue) {
  var _texts$currentLang5, _texts$en70;
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
  customOpt.textContent = ((_texts$currentLang5 = texts[currentLang]) === null || _texts$currentLang5 === void 0 ? void 0 : _texts$currentLang5.autoGearCustomCategory) || ((_texts$en70 = texts.en) === null || _texts$en70 === void 0 ? void 0 : _texts$en70.autoGearCustomCategory) || 'Custom Additions';
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
}
function formatAutoGearCount(count, singularKey, pluralKey) {
  var _texts$en72;
  var langTexts = texts[currentLang] || texts.en || {};
  if (count === 1) {
    var _texts$en71;
    var _template = langTexts[singularKey] || ((_texts$en71 = texts.en) === null || _texts$en71 === void 0 ? void 0 : _texts$en71[singularKey]);
    return _template ? _template.replace('%s', '1') : '1';
  }
  var template = langTexts[pluralKey] || ((_texts$en72 = texts.en) === null || _texts$en72 === void 0 ? void 0 : _texts$en72[pluralKey]);
  return template ? template.replace('%s', String(count)) : String(count);
}
function formatAutoGearItemSummary(item) {
  var _texts$en73, _texts$en74, _texts$en75;
  if (!item || _typeof(item) !== 'object') return '';
  var langTexts = texts[currentLang] || texts.en || {};
  var quantity = normalizeAutoGearQuantity(item.quantity);
  var name = typeof item.name === 'string' ? item.name : '';
  var rawCategory = typeof item.category === 'string' ? item.category.trim() : '';
  var categoryLabel = rawCategory ? rawCategory : langTexts.autoGearCustomCategory || ((_texts$en73 = texts.en) === null || _texts$en73 === void 0 ? void 0 : _texts$en73.autoGearCustomCategory) || '';
  var quantityText = String(quantity);
  var nameText = name || '';
  if (!nameText) return quantityText;
  var withCategoryTemplate = langTexts.autoGearItemSummaryWithCategory || ((_texts$en74 = texts.en) === null || _texts$en74 === void 0 ? void 0 : _texts$en74.autoGearItemSummaryWithCategory) || '%s × %s (%s)';
  if (categoryLabel) {
    return formatWithPlaceholders(withCategoryTemplate, quantityText, nameText, categoryLabel);
  }
  var baseTemplate = langTexts.autoGearItemSummary || ((_texts$en75 = texts.en) === null || _texts$en75 === void 0 ? void 0 : _texts$en75.autoGearItemSummary) || '%s × %s';
  return formatWithPlaceholders(baseTemplate, quantityText, nameText);
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
  var _texts$en77;
  var langTexts = texts[currentLang] || texts.en || {};
  if (count === 1) {
    var _texts$en76;
    var _template2 = langTexts.autoGearRulesCountOne || ((_texts$en76 = texts.en) === null || _texts$en76 === void 0 ? void 0 : _texts$en76.autoGearRulesCountOne);
    return _template2 ? _template2.replace('%s', '1') : '1';
  }
  var template = langTexts.autoGearRulesCountOther || ((_texts$en77 = texts.en) === null || _texts$en77 === void 0 ? void 0 : _texts$en77.autoGearRulesCountOther);
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
  var _texts$en78, _texts$en79;
  if (!backup) return '';
  var langTexts = texts[currentLang] || texts.en || {};
  var timeLabel = formatAutoGearBackupTime(backup.createdAt);
  var ruleCount = Array.isArray(backup.rules) ? backup.rules.length : 0;
  var rulesLabel = ruleCount === 0 ? langTexts.autoGearBackupClearsRules || ((_texts$en78 = texts.en) === null || _texts$en78 === void 0 ? void 0 : _texts$en78.autoGearBackupClearsRules) || 'Clears all rules' : formatAutoGearRuleCount(ruleCount);
  var template = langTexts.autoGearBackupMeta || ((_texts$en79 = texts.en) === null || _texts$en79 === void 0 ? void 0 : _texts$en79.autoGearBackupMeta);
  if (template && template.includes('%s')) {
    return formatWithPlaceholders(template, timeLabel, rulesLabel);
  }
  return "".concat(timeLabel, " \xB7 ").concat(rulesLabel);
}
function getAutoGearBackupSelectPlaceholder() {
  var _texts$currentLang6, _texts$en80;
  return ((_texts$currentLang6 = texts[currentLang]) === null || _texts$currentLang6 === void 0 ? void 0 : _texts$currentLang6.autoGearBackupSelectPlaceholder) || ((_texts$en80 = texts.en) === null || _texts$en80 === void 0 ? void 0 : _texts$en80.autoGearBackupSelectPlaceholder) || 'Select a backup to restore';
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
  var langTexts = texts[currentLang] || texts.en || {};
  return langTexts.autoGearAutoPresetLabel || (texts.en || {}).autoGearAutoPresetLabel || 'Autosaved rules';
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
  var _texts$currentLang7, _texts$en81;
  if (!autoGearPresetSelect) return;
  var placeholderText = ((_texts$currentLang7 = texts[currentLang]) === null || _texts$currentLang7 === void 0 ? void 0 : _texts$currentLang7.autoGearPresetPlaceholder) || ((_texts$en81 = texts.en) === null || _texts$en81 === void 0 ? void 0 : _texts$en81.autoGearPresetPlaceholder) || 'Custom rules';
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
  var _texts$currentLang8, _texts$en82, _texts$currentLang9, _texts$en83;
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
  var confirmTemplate = ((_texts$currentLang8 = texts[currentLang]) === null || _texts$currentLang8 === void 0 ? void 0 : _texts$currentLang8.autoGearPresetApplyConfirm) || ((_texts$en82 = texts.en) === null || _texts$en82 === void 0 ? void 0 : _texts$en82.autoGearPresetApplyConfirm) || "Replace your automatic gear rules with the preset \"".concat(preset.label, "\"?");
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
  var appliedMessage = ((_texts$currentLang9 = texts[currentLang]) === null || _texts$currentLang9 === void 0 ? void 0 : _texts$currentLang9.autoGearPresetApplied) || ((_texts$en83 = texts.en) === null || _texts$en83 === void 0 ? void 0 : _texts$en83.autoGearPresetApplied) || 'Preset applied.';
  showNotification('success', appliedMessage);
}
function handleAutoGearSavePreset() {
  var _texts$currentLang0, _texts$en84, _texts$currentLang13, _texts$en89;
  var rules = getAutoGearRules();
  var activePreset = getAutoGearPresetById(activeAutoGearPresetId);
  var promptTemplate = ((_texts$currentLang0 = texts[currentLang]) === null || _texts$currentLang0 === void 0 ? void 0 : _texts$currentLang0.autoGearPresetNamePrompt) || ((_texts$en84 = texts.en) === null || _texts$en84 === void 0 ? void 0 : _texts$en84.autoGearPresetNamePrompt) || 'Name this preset';
  var defaultName = activePreset ? activePreset.label : '';
  if (typeof window === 'undefined' || typeof window.prompt !== 'function') {
    var _texts$currentLang1, _texts$en85;
    var requiredMessage = ((_texts$currentLang1 = texts[currentLang]) === null || _texts$currentLang1 === void 0 ? void 0 : _texts$currentLang1.autoGearPresetNameRequired) || ((_texts$en85 = texts.en) === null || _texts$en85 === void 0 ? void 0 : _texts$en85.autoGearPresetNameRequired) || 'Enter a preset name to continue.';
    if (typeof window !== 'undefined' && typeof window.alert === 'function') {
      window.alert(requiredMessage);
    }
    return;
  }
  var response = window.prompt(promptTemplate, defaultName);
  if (response === null) return;
  var trimmed = response.trim();
  if (!trimmed) {
    var _texts$currentLang10, _texts$en86;
    var _requiredMessage = ((_texts$currentLang10 = texts[currentLang]) === null || _texts$currentLang10 === void 0 ? void 0 : _texts$currentLang10.autoGearPresetNameRequired) || ((_texts$en86 = texts.en) === null || _texts$en86 === void 0 ? void 0 : _texts$en86.autoGearPresetNameRequired) || 'Enter a preset name to continue.';
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
    var _texts$currentLang11, _texts$en87;
    var overwriteTemplate = ((_texts$currentLang11 = texts[currentLang]) === null || _texts$currentLang11 === void 0 ? void 0 : _texts$currentLang11.autoGearPresetOverwriteConfirm) || ((_texts$en87 = texts.en) === null || _texts$en87 === void 0 ? void 0 : _texts$en87.autoGearPresetOverwriteConfirm) || "Replace the existing preset \"".concat(normalizedName, "\"?");
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
    var _texts$currentLang12, _texts$en88;
    var _requiredMessage2 = ((_texts$currentLang12 = texts[currentLang]) === null || _texts$currentLang12 === void 0 ? void 0 : _texts$currentLang12.autoGearPresetNameRequired) || ((_texts$en88 = texts.en) === null || _texts$en88 === void 0 ? void 0 : _texts$en88.autoGearPresetNameRequired) || 'Enter a preset name to continue.';
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
  var savedMessage = ((_texts$currentLang13 = texts[currentLang]) === null || _texts$currentLang13 === void 0 ? void 0 : _texts$currentLang13.autoGearPresetSaved) || ((_texts$en89 = texts.en) === null || _texts$en89 === void 0 ? void 0 : _texts$en89.autoGearPresetSaved) || 'Automatic gear preset saved.';
  showNotification('success', savedMessage);
}
function handleAutoGearDeletePreset() {
  var _texts$currentLang14, _texts$en90, _texts$currentLang15, _texts$en91;
  if (!activeAutoGearPresetId) return;
  var preset = getAutoGearPresetById(activeAutoGearPresetId);
  var label = preset ? preset.label : '';
  var confirmTemplate = ((_texts$currentLang14 = texts[currentLang]) === null || _texts$currentLang14 === void 0 ? void 0 : _texts$currentLang14.autoGearPresetDeleteConfirm) || ((_texts$en90 = texts.en) === null || _texts$en90 === void 0 ? void 0 : _texts$en90.autoGearPresetDeleteConfirm) || 'Delete this preset?';
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
  var deletedMessage = ((_texts$currentLang15 = texts[currentLang]) === null || _texts$currentLang15 === void 0 ? void 0 : _texts$currentLang15.autoGearPresetDeleted) || ((_texts$en91 = texts.en) === null || _texts$en91 === void 0 ? void 0 : _texts$en91.autoGearPresetDeleted) || 'Automatic gear preset deleted.';
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
  autoGearRulesList.innerHTML = '';
  var rules = getAutoGearRules();
  if (!rules.length) {
    var _texts$currentLang16, _texts$en92;
    var empty = document.createElement('p');
    empty.className = 'auto-gear-empty';
    empty.textContent = ((_texts$currentLang16 = texts[currentLang]) === null || _texts$currentLang16 === void 0 ? void 0 : _texts$currentLang16.autoGearNoRules) || ((_texts$en92 = texts.en) === null || _texts$en92 === void 0 ? void 0 : _texts$en92.autoGearNoRules) || 'No custom rules yet.';
    autoGearRulesList.appendChild(empty);
    return;
  }
  rules.forEach(function (rule) {
    var _texts$currentLang17, _texts$en93, _texts$currentLang19, _texts$en95, _texts$currentLang20, _texts$en96;
    var wrapper = document.createElement('div');
    wrapper.className = 'auto-gear-rule';
    wrapper.dataset.ruleId = rule.id;
    var info = document.createElement('div');
    info.className = 'auto-gear-rule-info';
    var title = document.createElement('p');
    title.className = 'auto-gear-rule-title';
    title.textContent = rule.label || rule.scenarios.join(' + ');
    info.appendChild(title);
    var scenarioLabel = ((_texts$currentLang17 = texts[currentLang]) === null || _texts$currentLang17 === void 0 || (_texts$currentLang17 = _texts$currentLang17.projectFields) === null || _texts$currentLang17 === void 0 ? void 0 : _texts$currentLang17.requiredScenarios) || ((_texts$en93 = texts.en) === null || _texts$en93 === void 0 || (_texts$en93 = _texts$en93.projectFields) === null || _texts$en93 === void 0 ? void 0 : _texts$en93.requiredScenarios) || 'Required Scenarios';
    var scenarioMeta = document.createElement('p');
    scenarioMeta.className = 'auto-gear-rule-meta';
    scenarioMeta.textContent = "".concat(scenarioLabel, ": ").concat(rule.scenarios.join(' + '));
    info.appendChild(scenarioMeta);
    var addSummary = formatAutoGearCount(rule.add.length, 'autoGearAddsCountOne', 'autoGearAddsCountOther');
    var removeSummary = formatAutoGearCount(rule.remove.length, 'autoGearRemovalsCountOne', 'autoGearRemovalsCountOther');
    var countsMeta = document.createElement('p');
    countsMeta.className = 'auto-gear-rule-meta';
    countsMeta.textContent = "".concat(addSummary, " \xB7 ").concat(removeSummary);
    info.appendChild(countsMeta);
    if (rule.add.length) {
      var _texts$currentLang18, _texts$en94;
      var addsLabel = document.createElement('p');
      addsLabel.className = 'auto-gear-rule-meta auto-gear-rule-items-label';
      addsLabel.textContent = ((_texts$currentLang18 = texts[currentLang]) === null || _texts$currentLang18 === void 0 ? void 0 : _texts$currentLang18.autoGearAddsListLabel) || ((_texts$en94 = texts.en) === null || _texts$en94 === void 0 ? void 0 : _texts$en94.autoGearAddsListLabel) || 'Adds';
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
    var editLabel = ((_texts$currentLang19 = texts[currentLang]) === null || _texts$currentLang19 === void 0 ? void 0 : _texts$currentLang19.editBtn) || ((_texts$en95 = texts.en) === null || _texts$en95 === void 0 ? void 0 : _texts$en95.editBtn) || 'Edit';
    editBtn.textContent = editLabel;
    editBtn.setAttribute('data-help', editLabel);
    actions.appendChild(editBtn);
    var deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'auto-gear-delete';
    deleteBtn.dataset.ruleId = rule.id;
    var deleteLabel = ((_texts$currentLang20 = texts[currentLang]) === null || _texts$currentLang20 === void 0 ? void 0 : _texts$currentLang20.autoGearDeleteRule) || ((_texts$en96 = texts.en) === null || _texts$en96 === void 0 ? void 0 : _texts$en96.autoGearDeleteRule) || 'Delete';
    deleteBtn.textContent = deleteLabel;
    deleteBtn.setAttribute('data-help', deleteLabel);
    actions.appendChild(deleteBtn);
    wrapper.appendChild(actions);
    autoGearRulesList.appendChild(wrapper);
  });
}
function renderAutoGearDraftLists() {
  if (!autoGearEditorDraft) {
    if (autoGearAddList) autoGearAddList.innerHTML = '';
    if (autoGearRemoveList) autoGearRemoveList.innerHTML = '';
    return;
  }
  var renderList = function renderList(element, items, type) {
    if (!element) return;
    element.innerHTML = '';
    if (!items.length) {
      var _texts$currentLang21, _texts$en97;
      var empty = document.createElement('li');
      empty.className = 'auto-gear-empty';
      empty.textContent = ((_texts$currentLang21 = texts[currentLang]) === null || _texts$currentLang21 === void 0 ? void 0 : _texts$currentLang21.autoGearEmptyList) || ((_texts$en97 = texts.en) === null || _texts$en97 === void 0 ? void 0 : _texts$en97.autoGearEmptyList) || 'No items yet.';
      element.appendChild(empty);
      return;
    }
    items.forEach(function (item) {
      var _texts$currentLang22, _texts$en98, _texts$currentLang23, _texts$en99;
      var li = document.createElement('li');
      li.className = 'auto-gear-item';
      var span = document.createElement('span');
      var categoryLabel = item.category && item.category.trim() ? item.category : ((_texts$currentLang22 = texts[currentLang]) === null || _texts$currentLang22 === void 0 ? void 0 : _texts$currentLang22.autoGearCustomCategory) || ((_texts$en98 = texts.en) === null || _texts$en98 === void 0 ? void 0 : _texts$en98.autoGearCustomCategory) || 'Custom Additions';
      span.textContent = "".concat(categoryLabel, " \u2013 ").concat(item.quantity, "x ").concat(item.name);
      li.appendChild(span);
      var removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'auto-gear-remove-entry';
      removeBtn.dataset.listType = type;
      removeBtn.dataset.itemId = item.id;
      var removeLabel = ((_texts$currentLang23 = texts[currentLang]) === null || _texts$currentLang23 === void 0 ? void 0 : _texts$currentLang23.autoGearListRemove) || ((_texts$en99 = texts.en) === null || _texts$en99 === void 0 ? void 0 : _texts$en99.autoGearListRemove) || 'Remove';
      removeBtn.textContent = removeLabel;
      removeBtn.setAttribute('data-help', removeLabel);
      li.appendChild(removeBtn);
      element.appendChild(li);
    });
  };
  renderList(autoGearAddList, autoGearEditorDraft.add, 'add');
  renderList(autoGearRemoveList, autoGearEditorDraft.remove, 'remove');
}
function openAutoGearEditor(ruleId) {
  var _autoGearEditorDraft$, _autoGearEditorDraft$2;
  if (!autoGearEditor) return;
  var rules = getAutoGearRules();
  var existing = ruleId ? rules.find(function (rule) {
    return rule.id === ruleId;
  }) : null;
  autoGearEditorDraft = createAutoGearDraft(existing);
  autoGearEditor.hidden = false;
  if (autoGearRuleNameInput) {
    autoGearRuleNameInput.value = autoGearEditorDraft.label || '';
  }
  refreshAutoGearScenarioOptions(autoGearEditorDraft.scenarios);
  populateAutoGearCategorySelect(autoGearAddCategorySelect, ((_autoGearEditorDraft$ = autoGearEditorDraft.add[0]) === null || _autoGearEditorDraft$ === void 0 ? void 0 : _autoGearEditorDraft$.category) || '');
  populateAutoGearCategorySelect(autoGearRemoveCategorySelect, ((_autoGearEditorDraft$2 = autoGearEditorDraft.remove[0]) === null || _autoGearEditorDraft$2 === void 0 ? void 0 : _autoGearEditorDraft$2.category) || '');
  if (autoGearAddNameInput) autoGearAddNameInput.value = '';
  if (autoGearAddQuantityInput) autoGearAddQuantityInput.value = '1';
  if (autoGearRemoveNameInput) autoGearRemoveNameInput.value = '';
  if (autoGearRemoveQuantityInput) autoGearRemoveQuantityInput.value = '1';
  renderAutoGearDraftLists();
  if (autoGearRuleNameInput) autoGearRuleNameInput.focus();
}
function closeAutoGearEditor() {
  if (!autoGearEditor) return;
  autoGearEditor.hidden = true;
  autoGearEditorDraft = null;
  if (autoGearRuleNameInput) autoGearRuleNameInput.value = '';
  refreshAutoGearScenarioOptions([]);
  if (autoGearAddNameInput) autoGearAddNameInput.value = '';
  if (autoGearAddQuantityInput) autoGearAddQuantityInput.value = '1';
  if (autoGearRemoveNameInput) autoGearRemoveNameInput.value = '';
  if (autoGearRemoveQuantityInput) autoGearRemoveQuantityInput.value = '1';
}
function addAutoGearDraftItem(type) {
  if (!autoGearEditorDraft) return;
  var isAdd = type === 'add';
  var nameInput = isAdd ? autoGearAddNameInput : autoGearRemoveNameInput;
  var categorySelect = isAdd ? autoGearAddCategorySelect : autoGearRemoveCategorySelect;
  var quantityInput = isAdd ? autoGearAddQuantityInput : autoGearRemoveQuantityInput;
  if (!nameInput || !categorySelect || !quantityInput) return;
  var parsedNames = parseAutoGearDraftNames(nameInput.value);
  if (!parsedNames.length) {
    var _texts$currentLang24, _texts$en100;
    var message = ((_texts$currentLang24 = texts[currentLang]) === null || _texts$currentLang24 === void 0 ? void 0 : _texts$currentLang24.autoGearItemNameRequired) || ((_texts$en100 = texts.en) === null || _texts$en100 === void 0 ? void 0 : _texts$en100.autoGearItemNameRequired) || 'Enter an item name first.';
    window.alert(message);
    return;
  }
  var category = categorySelect.value || '';
  var defaultQuantity = normalizeAutoGearQuantity(quantityInput.value);
  var list = isAdd ? autoGearEditorDraft.add : autoGearEditorDraft.remove;
  parsedNames.forEach(function (entry) {
    var quantity = Object.prototype.hasOwnProperty.call(entry, 'quantity') ? normalizeAutoGearQuantity(entry.quantity) : defaultQuantity;
    list.push({
      id: generateAutoGearId('item'),
      name: entry.name,
      category: category,
      quantity: quantity
    });
  });
  nameInput.value = '';
  quantityInput.value = '1';
  renderAutoGearDraftLists();
  updateAutoGearCatalogOptions();
}
function saveAutoGearRuleFromEditor() {
  var _texts$currentLang27, _texts$en103;
  if (!autoGearEditorDraft) return;
  var scenarios = autoGearScenariosSelect ? Array.from(autoGearScenariosSelect.selectedOptions || []).map(function (option) {
    return option.value;
  }).filter(Boolean) : [];
  if (!scenarios.length) {
    var _texts$currentLang25, _texts$en101;
    var message = ((_texts$currentLang25 = texts[currentLang]) === null || _texts$currentLang25 === void 0 ? void 0 : _texts$currentLang25.autoGearRuleScenarioRequired) || ((_texts$en101 = texts.en) === null || _texts$en101 === void 0 ? void 0 : _texts$en101.autoGearRuleScenarioRequired) || 'Select at least one scenario.';
    window.alert(message);
    return;
  }
  if (autoGearRuleNameInput) {
    autoGearEditorDraft.label = autoGearRuleNameInput.value.trim();
  }
  autoGearEditorDraft.scenarios = scenarios;
  if (!autoGearEditorDraft.add.length && !autoGearEditorDraft.remove.length) {
    var _texts$currentLang26, _texts$en102;
    var _message = ((_texts$currentLang26 = texts[currentLang]) === null || _texts$currentLang26 === void 0 ? void 0 : _texts$currentLang26.autoGearRuleNeedsItems) || ((_texts$en102 = texts.en) === null || _texts$en102 === void 0 ? void 0 : _texts$en102.autoGearRuleNeedsItems) || 'Add at least one item to add or remove.';
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
  var successMessage = ((_texts$currentLang27 = texts[currentLang]) === null || _texts$currentLang27 === void 0 ? void 0 : _texts$currentLang27.autoGearRuleSaved) || ((_texts$en103 = texts.en) === null || _texts$en103 === void 0 ? void 0 : _texts$en103.autoGearRuleSaved) || 'Automatic gear rule saved.';
  showNotification('success', successMessage);
  closeAutoGearEditor();
}
function deleteAutoGearRule(ruleId) {
  var _texts$currentLang28, _texts$en104;
  var rules = getAutoGearRules();
  var index = rules.findIndex(function (rule) {
    return rule.id === ruleId;
  });
  if (index < 0) return;
  var confirmation = ((_texts$currentLang28 = texts[currentLang]) === null || _texts$currentLang28 === void 0 ? void 0 : _texts$currentLang28.autoGearDeleteConfirm) || ((_texts$en104 = texts.en) === null || _texts$en104 === void 0 ? void 0 : _texts$en104.autoGearDeleteConfirm) || 'Delete this rule?';
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
  if (Array.isArray(data)) return data;
  if (!data || _typeof(data) !== 'object') return null;
  if (Array.isArray(data.rules)) return data.rules;
  if (Array.isArray(data.autoGearRules)) return data.autoGearRules;
  if (data.data && Array.isArray(data.data.autoGearRules)) {
    return data.data.autoGearRules;
  }
  return null;
}
function importAutoGearRulesFromData(data) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var parsed = parseAutoGearImportPayload(data);
  if (parsed === null) {
    throw new Error('Invalid automatic gear rules import payload');
  }
  setAutoGearRules(Array.isArray(parsed) ? parsed : []);
  closeAutoGearEditor();
  renderAutoGearRulesList();
  updateAutoGearCatalogOptions();
  if (!options.silent) {
    var _texts$currentLang29, _texts$en105;
    var message = ((_texts$currentLang29 = texts[currentLang]) === null || _texts$currentLang29 === void 0 ? void 0 : _texts$currentLang29.autoGearImportSuccess) || ((_texts$en105 = texts.en) === null || _texts$en105 === void 0 ? void 0 : _texts$en105.autoGearImportSuccess) || 'Automatic gear rules imported.';
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
    var _texts$currentLang30, _texts$en106;
    var rules = getBaseAutoGearRules();
    var payload = {
      type: 'camera-power-planner/auto-gear-rules',
      version: APP_VERSION,
      createdAt: new Date().toISOString(),
      rules: rules
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
    var message = ((_texts$currentLang30 = texts[currentLang]) === null || _texts$currentLang30 === void 0 ? void 0 : _texts$currentLang30.autoGearExportSuccess) || ((_texts$en106 = texts.en) === null || _texts$en106 === void 0 ? void 0 : _texts$en106.autoGearExportSuccess) || 'Automatic gear rules downloaded.';
    showNotification('success', message);
    return fileName;
  } catch (error) {
    var _texts$currentLang31, _texts$en107;
    console.warn('Automatic gear rules export failed', error);
    var _message2 = ((_texts$currentLang31 = texts[currentLang]) === null || _texts$currentLang31 === void 0 ? void 0 : _texts$currentLang31.autoGearExportError) || ((_texts$en107 = texts.en) === null || _texts$en107 === void 0 ? void 0 : _texts$en107.autoGearExportError) || 'Automatic gear rules export failed.';
    showNotification('error', _message2);
    return null;
  }
}
function createAutoGearBackup() {
  if (!autoGearRulesDirtySinceBackup) return false;
  var rules = getBaseAutoGearRules();
  var signature = stableStringify(rules);
  if (signature === autoGearRulesLastBackupSignature) {
    autoGearRulesDirtySinceBackup = false;
    return false;
  }
  var entry = {
    id: generateAutoGearId('backup'),
    createdAt: new Date().toISOString(),
    rules: rules
  };
  var updatedBackups = [entry].concat(_toConsumableArray(autoGearBackups)).slice(0, AUTO_GEAR_BACKUP_LIMIT);
  try {
    var _texts$currentLang32, _texts$en108;
    persistAutoGearBackups(updatedBackups);
    autoGearBackups = updatedBackups;
    autoGearRulesLastBackupSignature = signature;
    autoGearRulesLastPersistedSignature = signature;
    autoGearRulesDirtySinceBackup = false;
    renderAutoGearBackupControls();
    var message = ((_texts$currentLang32 = texts[currentLang]) === null || _texts$currentLang32 === void 0 ? void 0 : _texts$currentLang32.autoGearBackupSaved) || ((_texts$en108 = texts.en) === null || _texts$en108 === void 0 ? void 0 : _texts$en108.autoGearBackupSaved) || 'Automatic gear backup saved.';
    showNotification('success', message);
    return true;
  } catch (error) {
    var _texts$currentLang33, _texts$en109;
    console.warn('Automatic gear backup failed', error);
    autoGearRulesDirtySinceBackup = true;
    var _message3 = ((_texts$currentLang33 = texts[currentLang]) === null || _texts$currentLang33 === void 0 ? void 0 : _texts$currentLang33.autoGearBackupFailed) || ((_texts$en109 = texts.en) === null || _texts$en109 === void 0 ? void 0 : _texts$en109.autoGearBackupFailed) || 'Automatic gear backup failed.';
    showNotification('error', _message3);
    return false;
  }
}
function restoreAutoGearBackup(backupId) {
  var _texts$currentLang34, _texts$en110;
  if (!backupId) return false;
  var backup = autoGearBackups.find(function (entry) {
    return entry.id === backupId;
  });
  if (!backup) return false;
  var confirmation = ((_texts$currentLang34 = texts[currentLang]) === null || _texts$currentLang34 === void 0 ? void 0 : _texts$currentLang34.autoGearBackupRestoreConfirm) || ((_texts$en110 = texts.en) === null || _texts$en110 === void 0 ? void 0 : _texts$en110.autoGearBackupRestoreConfirm) || 'Replace your automatic gear rules with this backup?';
  if (typeof window !== 'undefined' && typeof window.confirm === 'function') {
    if (!window.confirm(confirmation)) return false;
  }
  try {
    var _texts$currentLang35, _texts$en111;
    setAutoGearRules(Array.isArray(backup.rules) ? backup.rules : []);
    closeAutoGearEditor();
    renderAutoGearRulesList();
    updateAutoGearCatalogOptions();
    autoGearRulesLastBackupSignature = stableStringify(backup.rules || []);
    autoGearRulesLastPersistedSignature = autoGearRulesLastBackupSignature;
    autoGearRulesDirtySinceBackup = false;
    var message = ((_texts$currentLang35 = texts[currentLang]) === null || _texts$currentLang35 === void 0 ? void 0 : _texts$currentLang35.autoGearBackupRestoreSuccess) || ((_texts$en111 = texts.en) === null || _texts$en111 === void 0 ? void 0 : _texts$en111.autoGearBackupRestoreSuccess) || 'Automatic gear backup restored.';
    showNotification('success', message);
    return true;
  } catch (error) {
    var _texts$currentLang36, _texts$en112;
    console.warn('Failed to restore automatic gear backup', error);
    var _message4 = ((_texts$currentLang36 = texts[currentLang]) === null || _texts$currentLang36 === void 0 ? void 0 : _texts$currentLang36.autoGearBackupRestoreError) || ((_texts$en112 = texts.en) === null || _texts$en112 === void 0 ? void 0 : _texts$en112.autoGearBackupRestoreError) || 'Automatic gear backup restore failed.';
    showNotification('error', _message4);
    return false;
  }
}
function handleAutoGearImportSelection(event) {
  var _texts$currentLang37, _texts$en113;
  var input = event === null || event === void 0 ? void 0 : event.target;
  var file = input && input.files && input.files[0];
  if (!file) return;
  var confirmation = ((_texts$currentLang37 = texts[currentLang]) === null || _texts$currentLang37 === void 0 ? void 0 : _texts$currentLang37.autoGearImportConfirm) || ((_texts$en113 = texts.en) === null || _texts$en113 === void 0 ? void 0 : _texts$en113.autoGearImportConfirm) || 'Replace your automatic gear rules with the imported file?';
  if (typeof window !== 'undefined' && typeof window.confirm === 'function') {
    if (!window.confirm(confirmation)) {
      if (input) input.value = '';
      return;
    }
  }
  if (typeof FileReader === 'undefined') {
    var _texts$currentLang38, _texts$en114;
    var errorMsg = ((_texts$currentLang38 = texts[currentLang]) === null || _texts$currentLang38 === void 0 ? void 0 : _texts$currentLang38.autoGearImportError) || ((_texts$en114 = texts.en) === null || _texts$en114 === void 0 ? void 0 : _texts$en114.autoGearImportError) || 'Import failed. Please choose a valid automatic gear rules file.';
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
      var _texts$currentLang39, _texts$en115;
      console.warn('Automatic gear rules import failed', error);
      var _errorMsg = ((_texts$currentLang39 = texts[currentLang]) === null || _texts$currentLang39 === void 0 ? void 0 : _texts$currentLang39.autoGearImportError) || ((_texts$en115 = texts.en) === null || _texts$en115 === void 0 ? void 0 : _texts$en115.autoGearImportError) || 'Import failed. Please choose a valid automatic gear rules file.';
      showNotification('error', _errorMsg);
    } finally {
      if (input) input.value = '';
    }
  };
  reader.onerror = function () {
    var _texts$currentLang40, _texts$en116;
    var errorMsg = ((_texts$currentLang40 = texts[currentLang]) === null || _texts$currentLang40 === void 0 ? void 0 : _texts$currentLang40.autoGearImportError) || ((_texts$en116 = texts.en) === null || _texts$en116 === void 0 ? void 0 : _texts$en116.autoGearImportError) || 'Import failed. Please choose a valid automatic gear rules file.';
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
function shouldShowInstallBanner() {
  if (!installPromptBanner) return false;
  if (isStandaloneDisplayMode()) return false;
  return isIosDevice() || isAndroidDevice();
}
function updateInstallBannerVisibility() {
  if (!installPromptBanner) return;
  if (shouldShowInstallBanner()) {
    installPromptBanner.removeAttribute('hidden');
    updateInstallBannerPosition();
  } else {
    installPromptBanner.setAttribute('hidden', '');
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
  installPromptBanner.addEventListener('click', function () {
    var platform = isIosDevice() ? 'ios' : 'android';
    openInstallGuide(platform);
  });
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
  if (installPromptBanner && bannerText) {
    installPromptBanner.setAttribute('aria-label', bannerText);
  }
  var closeLabel = langTexts.installHelpClose || fallbackTexts.installHelpClose;
  if (installGuideClose && closeLabel) {
    installGuideClose.textContent = closeLabel;
    installGuideClose.setAttribute('aria-label', closeLabel);
  }
  if (installGuideDialog && !installGuideDialog.hasAttribute('hidden') && currentInstallGuidePlatform) {
    renderInstallGuideContent(currentInstallGuidePlatform, lang);
  }
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
  for (var _i11 = 0, _Object$entries0 = Object.entries(collection); _i11 < _Object$entries0.length; _i11++) {
    var _Object$entries0$_i = _slicedToArray(_Object$entries0[_i11], 2),
      name = _Object$entries0$_i[0],
      _value3 = _Object$entries0$_i[1];
    if (name === 'filterOptions' || name === 'None') {
      continue;
    }
    if (!isPlainObjectValue(_value3)) {
      continue;
    }
    if (isDeviceEntryObject(_value3)) {
      total += 1;
    } else {
      total += countDeviceDatabaseEntries(_value3);
    }
  }
  return total;
}
function looksLikeDeviceDatabase(candidate) {
  if (!isPlainObjectValue(candidate)) {
    return false;
  }
  var matched = 0;
  var _iterator11 = _createForOfIteratorHelper(REQUIRED_DEVICE_CATEGORIES),
    _step11;
  try {
    for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
      var _key6 = _step11.value;
      if (Object.prototype.hasOwnProperty.call(candidate, _key6)) {
        matched += 1;
      }
    }
  } catch (err) {
    _iterator11.e(err);
  } finally {
    _iterator11.f();
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
  var _iterator12 = _createForOfIteratorHelper(REQUIRED_DEVICE_CATEGORIES),
    _step12;
  try {
    for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
      var category = _step12.value;
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
    _iterator12.e(err);
  } finally {
    _iterator12.f();
  }
  if (missing.length) {
    errors.push("Missing categories: ".concat(missing.join(', ')));
  }
  if (candidate.accessories !== undefined) {
    if (!isPlainObjectValue(candidate.accessories)) {
      errors.push('Accessory collections must be objects.');
    } else {
      for (var _i12 = 0, _Object$entries1 = Object.entries(candidate.accessories); _i12 < _Object$entries1.length; _i12++) {
        var _Object$entries1$_i = _slicedToArray(_Object$entries1[_i12], 2),
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
    for (var _i13 = 0, _Object$entries10 = Object.entries(candidate.fiz); _i13 < _Object$entries10.length; _i13++) {
      var _Object$entries10$_i = _slicedToArray(_Object$entries10[_i13], 2),
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
    for (var _i14 = 0, _Object$entries11 = Object.entries(collection); _i14 < _Object$entries11.length; _i14++) {
      var _Object$entries11$_i = _slicedToArray(_Object$entries11[_i14], 2),
        name = _Object$entries11$_i[0],
        _value4 = _Object$entries11$_i[1];
      if (name === 'None' || name === 'filterOptions') {
        continue;
      }
      var nextPath = path.concat(name);
      if (!isPlainObjectValue(_value4)) {
        if (!Array.isArray(_value4)) {
          structureErrors.push("".concat(nextPath.join('.'), " must be an object."));
        }
      } else if (!isDeviceEntryObject(_value4)) {
        _inspectCollections(_value4, nextPath);
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
  for (var _i15 = 0, _errors = errors; _i15 < _errors.length; _i15++) {
    var message = _errors[_i15];
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
  for (var _i16 = 0, _Object$entries12 = Object.entries(options); _i16 < _Object$entries12.length; _i16++) {
    var _Object$entries12$_i = _slicedToArray(_Object$entries12[_i16], 2),
      _key7 = _Object$entries12$_i[0],
      _value5 = _Object$entries12$_i[1];
    if (typeof _value5 === 'undefined') continue;
    var normalizedValue = void 0;
    if (_value5 && _typeof(_value5) === 'object') {
      normalizedValue = serializeIntlOptions(_value5);
    } else {
      normalizedValue = String(_value5);
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
  Object.entries(diff).forEach(function (_ref28) {
    var _ref29 = _slicedToArray(_ref28, 2),
      cat = _ref29[0],
      entries = _ref29[1];
    if (!isPlainObjectValue(entries)) return;
    if (cat === 'fiz') {
      Object.entries(entries).forEach(function (_ref30) {
        var _ref31 = _slicedToArray(_ref30, 2),
          sub = _ref31[0],
          subEntries = _ref31[1];
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
    Object.entries(projectData).forEach(function (_ref32) {
      var _ref33 = _slicedToArray(_ref32, 2),
        name = _ref33[0],
        entry = _ref33[1];
      addCount(name, entry);
    });
  } else {
    addCount('', projectData);
  }
  if (isPlainObjectValue(setupsData)) {
    Object.entries(setupsData).forEach(function (_ref34) {
      var _ref35 = _slicedToArray(_ref34, 2),
        name = _ref35[0],
        setup = _ref35[1];
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
  var _texts$en118;
  var resolved = resolveLanguageCode(lang);
  if (!Number.isFinite(bytes) || bytes <= 0) {
    var _texts$en117;
    var zero = formatNumberForLang(resolved, 0, {
      maximumFractionDigits: 0
    });
    var _template3 = langTexts.storageTotalSizeValue || ((_texts$en117 = texts.en) === null || _texts$en117 === void 0 ? void 0 : _texts$en117.storageTotalSizeValue) || '~%s KB';
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
  var template = langTexts.storageTotalSizeValue || ((_texts$en118 = texts.en) === null || _texts$en118 === void 0 ? void 0 : _texts$en118.storageTotalSizeValue) || '~%s KB';
  return template.replace('%s', formatted);
}
function formatDeviceCategories(lang, categories) {
  if (!Array.isArray(categories) || !categories.length) return '';
  var resolved = resolveLanguageCode(lang);
  var lookup = typeof categoryNames !== 'undefined' && categoryNames || {};
  var localized = lookup[resolved] || lookup.en || {};
  var fallback = lookup.en || {};
  var items = categories.map(function (_ref36) {
    var key = _ref36.key,
      count = _ref36.count;
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
  var _texts$en119, _texts$en120, _texts$en121;
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
  var items = [{
    storageKey: 'cameraPowerPlanner_setups',
    label: langTexts.storageKeyProjects || 'Saved projects',
    value: formatCountText(lang, langTexts, 'storageProjectsCount', totalProjects),
    description: langTexts.storageKeyProjectsDesc || '',
    extra: autoBackups > 0 ? formatCountText(lang, langTexts, 'storageAutoBackupsCount', autoBackups) : null
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
    extra: deviceSummary.total > 0 && deviceSummary.categories.length ? (langTexts.storageDeviceCategories || ((_texts$en119 = texts.en) === null || _texts$en119 === void 0 ? void 0 : _texts$en119.storageDeviceCategories) || 'Affected categories: %s').replace('%s', formatDeviceCategories(lang, deviceSummary.categories)) : null
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
    value: hasSession ? langTexts.storageSessionStored || ((_texts$en120 = texts.en) === null || _texts$en120 === void 0 ? void 0 : _texts$en120.storageSessionStored) || 'Stored' : langTexts.storageSessionNotStored || ((_texts$en121 = texts.en) === null || _texts$en121 === void 0 ? void 0 : _texts$en121.storageSessionNotStored) || 'Not stored',
    description: langTexts.storageKeySessionDesc || ''
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
    var hasData = Boolean(totalProjects || gearListCount || deviceSummary.total || favoritesCount || feedbackCount || hasSession);
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
var settingsShowAutoBackups = document.getElementById("settingsShowAutoBackups");
var aboutVersionElem = document.getElementById("aboutVersion");
var supportLink = document.getElementById("supportLink");
var settingsSave = document.getElementById("settingsSave");
var settingsCancel = document.getElementById("settingsCancel");
var featureSearch = document.getElementById("featureSearch");
var featureSearchClear = document.getElementById("featureSearchClear");
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
    return;
  }
  if (originalNormalized && trimmed.toLowerCase() === originalNormalized) {
    return;
  }
  featureSearch.value = newValue;
};
var helpMap = new Map();
var deviceMap = new Map();
var runFeatureSearch = function runFeatureSearch() {};
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
  var tokens = new Set();
  var addToken = function addToken(token) {
    if (!token) return;
    var cleaned = token.replace(/[^a-z0-9]+/g, '');
    if (cleaned) tokens.add(cleaned);
  };
  var processParts = function processParts(strToProcess) {
    strToProcess.split(/\s+/).forEach(function (part) {
      if (!part) return;
      addToken(part);
      part.split(/[^a-z0-9]+/).filter(Boolean).forEach(function (segment) {
        return addToken(segment);
      });
    });
  };
  processParts(normalized);
  var spellingNormalized = normalizeSpellingVariants(normalized);
  if (spellingNormalized !== normalized) {
    processParts(spellingNormalized);
  }
  var markNormalized = normaliseMarkVariants(spellingNormalized);
  if (markNormalized !== spellingNormalized) {
    processParts(markNormalized);
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
var buildFeatureSearchEntry = function buildFeatureSearchEntry(element, _ref37) {
  var label = _ref37.label,
    _ref37$keywords = _ref37.keywords,
    keywords = _ref37$keywords === void 0 ? '' : _ref37$keywords;
  if (!featureList || !element || !label) return null;
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
    tokens: searchTokens(combinedKeywords)
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
  var opt = document.createElement('option');
  opt.value = combinedLabel;
  featureList.appendChild(opt);
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
  var _iterator13 = _createForOfIteratorHelper(validQueryTokens),
    _step13;
  try {
    for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
      var token = _step13.value;
      var best = 0;
      var _iterator14 = _createForOfIteratorHelper(entryTokens),
        _step14;
      try {
        for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
          var entryToken = _step14.value;
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
        _iterator14.e(err);
      } finally {
        _iterator14.f();
      }
      if (best > 0) {
        matched += 1;
        total += best;
      }
    }
  } catch (err) {
    _iterator13.e(err);
  } finally {
    _iterator13.f();
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
  var _iterator15 = _createForOfIteratorHelper(map.entries()),
    _step15;
  try {
    for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
      var _step15$value = _slicedToArray(_step15.value, 2),
        _entryKey = _step15$value[0],
        _entryValue2 = _step15$value[1];
      if (!_entryValue2) continue;
      if (Array.isArray(_entryValue2)) {
        var _iterator17 = _createForOfIteratorHelper(_entryValue2),
          _step17;
        try {
          for (_iterator17.s(); !(_step17 = _iterator17.n()).done;) {
            var _value6 = _step17.value;
            if (_value6) flattened.push([_entryKey, _value6]);
          }
        } catch (err) {
          _iterator17.e(err);
        } finally {
          _iterator17.f();
        }
      } else {
        flattened.push([_entryKey, _entryValue2]);
      }
    }
  } catch (err) {
    _iterator15.e(err);
  } finally {
    _iterator15.f();
  }
  if (hasKey) {
    var exactCandidates = flattened.filter(function (_ref38) {
      var _ref39 = _slicedToArray(_ref38, 1),
        entryKey = _ref39[0];
      return entryKey === key;
    });
    if (exactCandidates.length) {
      var _bestEntry;
      var bestEntry = exactCandidates[0][1];
      var bestDetails = queryTokens.length > 0 ? computeTokenMatchDetails(((_bestEntry = bestEntry) === null || _bestEntry === void 0 ? void 0 : _bestEntry.tokens) || [], queryTokens) : {
        score: Number.POSITIVE_INFINITY,
        matched: queryTokens.length
      };
      var _iterator16 = _createForOfIteratorHelper(exactCandidates.slice(1)),
        _step16;
      try {
        for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
          var _step16$value = _slicedToArray(_step16.value, 2),
            entryValue = _step16$value[1];
          if (!queryTokens.length) break;
          var details = computeTokenMatchDetails((entryValue === null || entryValue === void 0 ? void 0 : entryValue.tokens) || [], queryTokens);
          if (details.score > bestDetails.score || details.score === bestDetails.score && details.matched > bestDetails.matched) {
            bestDetails = details;
            bestEntry = entryValue;
          }
        }
      } catch (err) {
        _iterator16.e(err);
      } finally {
        _iterator16.f();
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
  for (var _i17 = 0, _flattened = flattened; _i17 < _flattened.length; _i17++) {
    var _flattened$_i = _slicedToArray(_flattened[_i17], 2),
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
var gearListOutput = document.getElementById("gearListOutput");
var projectRequirementsOutput = document.getElementById("projectRequirementsOutput");
var accentColor = '#001589';
var prevAccentColor = accentColor;
var HIGH_CONTRAST_ACCENT_COLOR = '#ffffff';
var DARK_MODE_ACCENT_BOOST_CLASS = 'dark-accent-boost';
var PINK_REFERENCE_COLOR = '#ff69b4';
var PINK_LUMINANCE_TOLERANCE = 0.06;
var BRIGHT_ACCENT_LUMINANCE_THRESHOLD = 0.6;
var BRIGHT_ACCENT_MIN_SATURATION = 0.35;
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
  var _ref40 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    color = _ref40.color,
    highContrast = _ref40.highContrast;
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
}
var isHighContrastActive = function isHighContrastActive() {
  return typeof document !== 'undefined' && (document.documentElement.classList.contains('high-contrast') || document.body && document.body.classList.contains('high-contrast'));
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
if (accentColorInput) {
  accentColorInput.addEventListener('input', function () {
    if (document.body.classList.contains('pink-mode')) return;
    var color = accentColorInput.value;
    applyAccentColor(color);
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
    var _iterator18 = _createForOfIteratorHelper(uiScaleProperties),
      _step18;
    try {
      for (_iterator18.s(); !(_step18 = _iterator18.n()).done;) {
        var prop = _step18.value;
        var _value7 = parseFloat(computedStyle.getPropertyValue(prop));
        if (Number.isFinite(_value7) && _value7 > 0) {
          baseUIScaleValues[prop] = _value7;
        }
      }
    } catch (err) {
      _iterator18.e(err);
    } finally {
      _iterator18.f();
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
    var stored, _iterator25, _step25, entry, normalized, _t7, _t8;
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
          _iterator25 = _createForOfIteratorHelper(stored);
          _context8.p = 2;
          _iterator25.s();
        case 3:
          if ((_step25 = _iterator25.n()).done) {
            _context8.n = 8;
            break;
          }
          entry = _step25.value;
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
          _iterator25.e(_t8);
        case 10:
          _context8.p = 10;
          _iterator25.f();
          return _context8.f(10);
        case 11:
          return _context8.a(2);
      }
    }, _callee8, null, [[4, 6], [2, 9, 10, 11]]);
  }));
  return _loadStoredCustomFonts.apply(this, arguments);
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
    var _ref136,
      _ref136$persist,
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
          _ref136 = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : {}, _ref136$persist = _ref136.persist, persist = _ref136$persist === void 0 ? true : _ref136$persist;
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
    var added, unsupported, failed, persistFailure, _i58, _Array$from, file, dataUrl, result, message, _message5, _message6, _t9;
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
          _i58 = 0, _Array$from = Array.from(fileList);
        case 2:
          if (!(_i58 < _Array$from.length)) {
            _context0.n = 9;
            break;
          }
          file = _Array$from[_i58];
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
          _i58++;
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
    var fonts, _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, font, _t0;
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
          if (!(typeof result[Symbol.asyncIterator] === 'function')) {
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
          if (!(typeof result[Symbol.iterator] === 'function')) {
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
      var _ref41 = _asyncToGenerator(_regenerator().m(function _callee(options) {
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
        return _ref41.apply(this, arguments);
      };
    }();
  }
  if (typeof navigator !== 'undefined' && navigator && navigator.fonts && typeof navigator.fonts.query === 'function') {
    var _navigator = navigator,
      fonts = _navigator.fonts;
    return function () {
      var _ref42 = _asyncToGenerator(_regenerator().m(function _callee2(options) {
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
        return _ref42.apply(this, arguments);
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
    var fonts, added, duplicates, seenValues, _iterator26, _step26, font, rawName, name, _value9, _ensureFontFamilyOpti3, option, created, _t1, _t10;
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
          _iterator26 = _createForOfIteratorHelper(fonts);
          _context10.p = 5;
          _iterator26.s();
        case 6:
          if ((_step26 = _iterator26.n()).done) {
            _context10.n = 11;
            break;
          }
          font = _step26.value;
          rawName = font && (font.family || font.fullName || font.postscriptName);
          name = rawName ? String(rawName).trim() : '';
          if (name) {
            _context10.n = 7;
            break;
          }
          return _context10.a(3, 10);
        case 7:
          _value9 = buildFontFamilyValue(name);
          if (!seenValues.has(_value9)) {
            _context10.n = 8;
            break;
          }
          duplicates.push(name);
          return _context10.a(3, 10);
        case 8:
          _ensureFontFamilyOpti3 = ensureFontFamilyOption(_value9, name, localFontsGroup, 'local'), option = _ensureFontFamilyOpti3.option, created = _ensureFontFamilyOpti3.created;
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
          _iterator26.e(_t1);
        case 13:
          _context10.p = 13;
          _iterator26.f();
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
    } catch (_unused5) {}
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
  var _iterator19 = _createForOfIteratorHelper(uiScaleProperties),
    _step19;
  try {
    for (_iterator19.s(); !(_step19 = _iterator19.n()).done;) {
      var _prop = _step19.value;
      var baseValue = baseUIScaleValues[_prop];
      if (!Number.isFinite(baseValue) || baseValue <= 0) continue;
      document.documentElement.style.setProperty(_prop, "".concat(baseValue * scale, "px"));
    }
  } catch (err) {
    _iterator19.e(err);
  } finally {
    _iterator19.f();
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
    clearAccentColorOverrides();
    return;
  }
  applyAccentColor(prevAccentColor);
};
function populateFeatureSearch() {
  if (!featureList) return;
  featureMap.clear();
  helpMap.clear();
  deviceMap.clear();
  featureList.innerHTML = '';
  document.querySelectorAll('h2[id], legend[id], h3[id], h4[id]').forEach(function (el) {
    var _el$dataset;
    if (helpDialog && helpDialog.contains(el)) return;
    var name = el.textContent.trim();
    if (!name) return;
    var keywords = ((_el$dataset = el.dataset) === null || _el$dataset === void 0 ? void 0 : _el$dataset.searchKeywords) || el.getAttribute('data-search-keywords') || '';
    buildFeatureSearchEntry(el, {
      label: name,
      keywords: keywords
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
      helpMap.set(key, {
        section: section,
        label: label,
        tokens: searchTokens("".concat(label, " ").concat(keywords).trim())
      });
      var opt = document.createElement('option');
      opt.value = "".concat(label, " (help)");
      featureList.appendChild(opt);
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
        deviceMap.set(key, {
          select: sel,
          value: opt.value,
          label: name,
          tokens: searchTokens("".concat(name, " ").concat(keywords).trim())
        });
        var dlOpt = document.createElement('option');
        dlOpt.value = name;
        featureList.appendChild(dlOpt);
      }
    });
  });
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
    btn.addEventListener('click', function () {
      populateRecordingResolutionDropdown(currentProjectInfo && currentProjectInfo.recordingResolution);
      populateSensorModeDropdown(currentProjectInfo && currentProjectInfo.sensorMode);
      populateCodecDropdown(currentProjectInfo && currentProjectInfo.codec);
      openDialog(projectDialog);
    });
  }
  var title = container.querySelector('h2');
  if (title && btn.parentElement !== container) {
    title.insertAdjacentElement('afterend', btn);
  } else if (!title && btn.parentElement !== container) {
    container.prepend(btn);
  }
  setEditProjectBtnText();
}
function updateGearListButtonVisibility() {
  var hasGear = gearListOutput && !gearListOutput.classList.contains('hidden') && gearListOutput.innerHTML.trim() !== '';
  if (hasGear) {
    generateGearListBtn.classList.add('hidden');
    ensureEditProjectButton();
  } else {
    generateGearListBtn.classList.remove('hidden');
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
  var h3s = doc.querySelectorAll('h3');
  var reqHeading = h3s[0];
  var reqGrid = doc.querySelector('.requirements-grid');
  var titleHtml = title ? title.outerHTML : '';
  var projectHtml = reqHeading && reqGrid ? titleHtml + reqHeading.outerHTML + reqGrid.outerHTML : '';
  var projectName = title ? title.textContent : '';
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
  var gearHeadingHtml = projectName ? "<h2>Gear List: \u201C".concat(projectName, "\u201D</h2>") : '';
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
      if (reqHeading) {
        var cloneHeading = bodyClone.querySelector('h3');
        if (cloneHeading) cloneHeading.remove();
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
function displayGearAndRequirements(html) {
  var _splitGearListHtml = splitGearListHtml(html),
    projectHtml = _splitGearListHtml.projectHtml,
    gearHtml = _splitGearListHtml.gearHtml;
  if (projectRequirementsOutput) {
    if (projectHtml) {
      projectRequirementsOutput.innerHTML = projectHtml;
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
    if (gearHtml) {
      gearListOutput.innerHTML = gearHtml;
      gearListOutput.classList.remove('hidden');
      applyFilterSelectionsToGearList();
      renderFilterDetails();
      var findDevice = function findDevice(name) {
        for (var _i18 = 0, _Object$entries13 = Object.entries(devices); _i18 < _Object$entries13.length; _i18++) {
          var _Object$entries13$_i = _slicedToArray(_Object$entries13[_i18], 2),
            catName = _Object$entries13$_i[0],
            cat = _Object$entries13$_i[1];
          if (cat && _typeof(cat) === 'object') {
            if (cat[name]) return {
              info: cat[name],
              category: catName
            };
            for (var _i19 = 0, _Object$values = Object.values(cat); _i19 < _Object$values.length; _i19++) {
              var _sub5 = _Object$values[_i19];
              if (_sub5 && _sub5[name]) return {
                info: _sub5[name],
                category: catName
              };
            }
          }
        }
        return {
          info: null,
          category: ''
        };
      };
      gearListOutput.querySelectorAll('.gear-item').forEach(function (span) {
        var name = span.getAttribute('data-gear-name');
        var _findDevice = findDevice(name),
          info = _findDevice.info,
          category = _findDevice.category;
        var countMatch = span.textContent.trim().match(/^(\d+)x\s+/);
        var count = countMatch ? "".concat(countMatch[1], "x ") : '';
        var parts = [];
        parts.push("".concat(count).concat(name).trim());
        if (category) parts.push("Category: ".concat(category));
        if (info) {
          var summary = generateConnectorSummary(info);
          summary = summary ? summary.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : '';
          if (info.notes) summary = summary ? "".concat(summary, "; Notes: ").concat(info.notes) : info.notes;
          if (summary) parts.push(summary);
        }
        var desc = parts.join(' – ');
        span.setAttribute('title', desc);
        span.setAttribute('data-help', desc);
        span.querySelectorAll('select').forEach(function (sel) {
          sel.setAttribute('title', desc);
          sel.setAttribute('data-help', desc);
          initFavoritableSelect(sel);
        });
      });
      gearListOutput.querySelectorAll('select').forEach(function (sel) {
        if (sel.getAttribute('data-help')) return;
        var selected = sel.selectedOptions && sel.selectedOptions[0];
        var name = selected ? selected.textContent.trim() : sel.value;
        var _findDevice2 = findDevice(name),
          info = _findDevice2.info,
          category = _findDevice2.category;
        var parts = [];
        parts.push("1x ".concat(name).trim());
        if (category) parts.push("Category: ".concat(category));
        if (info) {
          var summary = generateConnectorSummary(info);
          summary = summary ? summary.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : '';
          if (info.notes) summary = summary ? "".concat(summary, "; Notes: ").concat(info.notes) : info.notes;
          if (summary) parts.push(summary);
        }
        var desc = parts.join(' – ');
        sel.setAttribute('title', desc);
        sel.setAttribute('data-help', desc);
        initFavoritableSelect(sel);
      });
      adjustGearListSelectWidths(gearListOutput);
    } else {
      gearListOutput.innerHTML = '';
      gearListOutput.classList.add('hidden');
    }
  }
  if (loadedSetupState) {
    setSliderBowlValue(loadedSetupState.sliderBowl || '');
    setEasyrigValue(loadedSetupState.easyrig || '');
  }
  updateGearListButtonVisibility();
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
  Object.entries(info).forEach(function (_ref43) {
    var _ref44 = _slicedToArray(_ref43, 2),
      key = _ref44[0],
      value = _ref44[1];
    var sanitized = sanitizeProjectInfoValue(value);
    if (sanitized !== undefined) {
      result[key] = sanitized;
    }
  });
  return Object.keys(result).length > 0 ? result : null;
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
  if (!projectForm) {
    defaultProjectInfoSnapshot = {};
    return;
  }
  var baseInfo = collectProjectFormData ? collectProjectFormData() : {};
  baseInfo.sliderBowl = getSliderBowlValue();
  baseInfo.easyrig = getEasyrigValue();
  defaultProjectInfoSnapshot = sanitizeProjectInfo(baseInfo) || {};
}
function deriveProjectInfo(info) {
  ensureDefaultProjectInfoSnapshot();
  var sanitized = sanitizeProjectInfo(info);
  if (!sanitized) return null;
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
  return [state.camera || '', state.monitor || '', state.video || '', state.cage || '', stableStringify(state.motors || []), stableStringify(state.controllers || []), state.distance || '', state.batteryPlate || '', state.battery || '', state.batteryHotswap || '', state.sliderBowl || '', state.easyrig || '', stableStringify(state.projectInfo || null), stableStringify(state.autoGearRules || null)].join('||');
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
  return state;
}
function checkSetupChanged() {
  if (!saveSetupBtn) return;
  var langTexts = texts[currentLang] || {};
  var fallbackTexts = texts.en || {};
  var saveLabel = langTexts.saveSetupBtn || fallbackTexts.saveSetupBtn || '';
  var updateLabel = langTexts.updateSetupBtn || fallbackTexts.updateSetupBtn || saveLabel;
  if (loadedSetupState && setupSelect.value && setupNameInput.value.trim() === setupSelect.value) {
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
if (feedbackCancelBtn) {
  var _feedbackCancelBtn$te, _texts$currentLang41, _texts$en122;
  var cancelLabel = ((_feedbackCancelBtn$te = feedbackCancelBtn.textContent) === null || _feedbackCancelBtn$te === void 0 ? void 0 : _feedbackCancelBtn$te.trim()) || ((_texts$currentLang41 = texts[currentLang]) === null || _texts$currentLang41 === void 0 ? void 0 : _texts$currentLang41.cancelEditBtn) || ((_texts$en122 = texts.en) === null || _texts$en122 === void 0 ? void 0 : _texts$en122.cancelEditBtn) || 'Cancel';
  setButtonLabelWithIcon(feedbackCancelBtn, cancelLabel, ICON_GLYPHS.circleX);
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
if (projectForm) {
  projectForm.querySelectorAll('select[multiple]').forEach(function (sel) {
    sel.addEventListener('mousedown', function (e) {
      if (e.target.tagName !== 'OPTION') return;
      e.preventDefault();
      var option = e.target;
      var scrollTop = sel.scrollTop;
      option.selected = !option.selected;
      sel.dispatchEvent(new Event('change'));
      sel.focus();
      sel.scrollTop = scrollTop;
    });
    sel.addEventListener('dblclick', function (e) {
      e.preventDefault();
    });
  });
  projectForm.querySelectorAll('select').forEach(function (sel) {
    if (sel.id === 'requiredScenarios') return;
    sel.addEventListener('change', function () {
      return updateSelectIconBoxes(sel);
    });
    updateSelectIconBoxes(sel);
  });
  var queueProjectAutoSave = function queueProjectAutoSave() {
    return scheduleProjectAutoSave();
  };
  var flushProjectAutoSave = function flushProjectAutoSave() {
    return scheduleProjectAutoSave(true);
  };
  projectForm.addEventListener('input', queueProjectAutoSave);
  projectForm.addEventListener('change', flushProjectAutoSave);
  projectForm.querySelectorAll('input, textarea, select').forEach(function (el) {
    el.addEventListener('change', saveCurrentSession);
  });
}
var manualPositions = {};
var lastDiagramPositions = {};
var gridSnap = false;
var cleanupDiagramInteractions = null;
var diagramCssLight = "\n.node-box{fill:#f0f0f0;stroke:none;}\n.node-box.first-fiz{stroke:none;}\n.first-fiz-highlight{stroke:url(#firstFizGrad);stroke-width:1px;fill:none;}\n.node-icon{font-size:var(--font-size-diagram-icon, 20px);font-family:'UiconsThinStraightV2',system-ui,sans-serif;font-style:normal;}\n.node-icon[data-icon-font='essential']{font-family:'EssentialIconsV2',system-ui,sans-serif;}\n.node-icon[data-icon-font='film']{font-family:'FilmIndustryIconsV2',system-ui,sans-serif;}\n.node-icon[data-icon-font='gadget']{font-family:'GadgetIconsV2',system-ui,sans-serif;}\n.node-icon-svg{color:#333;pointer-events:none;}\n.node-icon-svg svg{width:24px;height:24px;display:block;stroke:currentColor;stroke-width:1.5px;stroke-linecap:round;stroke-linejoin:round;fill:none;}\n.node-icon-svg svg .diagram-camera-icon__lens{fill:currentColor;fill-opacity:0.2;stroke:none;}\n.conn{stroke:none;}\n.conn.red{fill:#d33;}\n.conn.blue{fill:#369;}\n.conn.green{fill:#090;}\ntext{font-family:system-ui,sans-serif;}\n.edge-label{font-size:var(--font-size-diagram-label, 10px);}\nline{stroke:#333;stroke-width:2px;}\npath.edge-path{stroke:#333;stroke-width:2px;fill:none;}\npath.power{stroke:#d33;}\npath.video{stroke:#369;}\npath.fiz{stroke:#090;}\n.diagram-placeholder{font-style:italic;color:#666;margin:0;}\n";
var diagramCssDark = "\n.node-box{fill:#444;stroke:none;}\n.node-box.first-fiz{stroke:none;}\n.first-fiz-highlight{stroke:url(#firstFizGrad);}\n.node-icon{font-size:var(--font-size-diagram-icon, 20px);font-family:'UiconsThinStraightV2',system-ui,sans-serif;font-style:normal;}\n.node-icon[data-icon-font='essential']{font-family:'EssentialIconsV2',system-ui,sans-serif;}\n.node-icon[data-icon-font='film']{font-family:'FilmIndustryIconsV2',system-ui,sans-serif;}\n.node-icon[data-icon-font='gadget']{font-family:'GadgetIconsV2',system-ui,sans-serif;}\n.node-icon-svg{color:#fff;pointer-events:none;}\n.node-icon-svg svg{width:24px;height:24px;display:block;stroke:currentColor;stroke-width:1.5px;stroke-linecap:round;stroke-linejoin:round;fill:none;}\n.node-icon-svg svg .diagram-camera-icon__lens{fill:currentColor;fill-opacity:0.3;stroke:none;}\ntext{fill:#fff;font-family:system-ui,sans-serif;}\nline{stroke:#fff;}\npath.edge-path{stroke:#fff;}\npath.power{stroke:#ff6666;}\npath.video{stroke:#7ec8ff;}\npath.fiz{stroke:#6f6;}\n.conn.red{fill:#ff6666;}\n.conn.blue{fill:#7ec8ff;}\n.conn.green{fill:#6f6;}\n.diagram-placeholder{color:#bbb;}\n";
function getDiagramCss() {
  var includeDark = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  return diagramCssLight + (includeDark ? "@media (prefers-color-scheme: dark){".concat(diagramCssDark, "}") : '');
}
var CAMERA_DIAGRAM_ICON_SVG = "\n  <svg\n    viewBox=\"0 0 24 24\"\n    class=\"diagram-camera-icon-svg\"\n    aria-hidden=\"true\"\n    focusable=\"false\"\n    fill=\"none\"\n    stroke=\"currentColor\"\n    stroke-width=\"1.5\"\n    stroke-linecap=\"round\"\n    stroke-linejoin=\"round\"\n  >\n    <rect x=\"3\" y=\"7\" width=\"18\" height=\"12\" rx=\"2\" ry=\"2\" />\n    <path d=\"M7.5 7V5.75A1.75 1.75 0 0 1 9.25 4h2.8a1 1 0 0 1 .78.38L13.9 7\" />\n    <circle cx=\"12\" cy=\"13\" r=\"3.2\" />\n    <circle cx=\"12\" cy=\"13\" r=\"1.6\" class=\"diagram-camera-icon__lens\" />\n    <path d=\"M18.5 10.25 20.75 8.5A1 1 0 0 1 22 9.35v7.3a1 1 0 0 1-1.25.86L18.5 15.75\" />\n  </svg>\n".trim();
var diagramIcons = {
  battery: ICON_GLYPHS.batteryBolt,
  camera: Object.freeze({
    markup: CAMERA_DIAGRAM_ICON_SVG,
    className: 'icon-svg diagram-camera-icon',
    size: 24
  }),
  monitor: ICON_GLYPHS.screen,
  viewfinder: ICON_GLYPHS.viewfinder,
  video: ICON_GLYPHS.wifi,
  motors: ICON_GLYPHS.gears,
  controllers: ICON_GLYPHS.controller,
  handle: ICON_GLYPHS.controller,
  distance: ICON_GLYPHS.distance
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
  addBtn.textContent = '+';
  addBtn.addEventListener('click', function () {
    row.after(createVideoOutputRow());
  });
  row.appendChild(addBtn);
  var removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
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
  addBtn.textContent = '+';
  addBtn.addEventListener('click', function () {
    row.after(createMonitorVideoInputRow());
  });
  row.appendChild(addBtn);
  var removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
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
  addBtn.textContent = '+';
  addBtn.addEventListener('click', function () {
    row.after(createMonitorVideoOutputRow());
  });
  row.appendChild(addBtn);
  var removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
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
  addBtn.textContent = '+';
  addBtn.addEventListener('click', function () {
    row.after(createViewfinderVideoInputRow());
  });
  row.appendChild(addBtn);
  var removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
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
  addBtn.textContent = '+';
  addBtn.addEventListener('click', function () {
    row.after(createViewfinderVideoOutputRow());
  });
  row.appendChild(addBtn);
  var removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
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
  addBtn.textContent = '+';
  addBtn.addEventListener('click', function () {
    row.after(createVideoInputRow());
  });
  row.appendChild(addBtn);
  var removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
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
  addBtn.textContent = '+';
  addBtn.addEventListener('click', function () {
    row.after(createVideoIOOutputRow());
  });
  row.appendChild(addBtn);
  var removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
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
  addBtn.textContent = '+';
  addBtn.addEventListener('click', function () {
    row.after(createFizConnectorRow());
  });
  row.appendChild(addBtn);
  var removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
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
  addBtn.textContent = '+';
  addBtn.addEventListener('click', function () {
    row.after(createRecordingMediaRow());
  });
  row.appendChild(addBtn);
  var removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
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
      var _ref45 = item || {},
        _ref45$type = _ref45.type,
        type = _ref45$type === void 0 ? '' : _ref45$type,
        _ref45$notes = _ref45.notes,
        notes = _ref45$notes === void 0 ? '' : _ref45$notes;
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
  addBtn.textContent = '+';
  addBtn.addEventListener('click', function () {
    row.after(createBatteryPlateRow());
  });
  row.appendChild(addBtn);
  var removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
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
      var _ref46 = item || {},
        _ref46$type = _ref46.type,
        type = _ref46$type === void 0 ? '' : _ref46$type,
        _ref46$mount = _ref46.mount,
        mount = _ref46$mount === void 0 ? 'native' : _ref46$mount,
        _ref46$notes = _ref46.notes,
        notes = _ref46$notes === void 0 ? '' : _ref46$notes;
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
  addBtn.textContent = '+';
  addBtn.addEventListener('click', function () {
    row.after(createViewfinderRow());
  });
  row.appendChild(addBtn);
  var removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
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
      var _ref47 = item || {},
        _ref47$type = _ref47.type,
        type = _ref47$type === void 0 ? '' : _ref47$type,
        _ref47$resolution = _ref47.resolution,
        resolution = _ref47$resolution === void 0 ? '' : _ref47$resolution,
        _ref47$connector = _ref47.connector,
        connector = _ref47$connector === void 0 ? '' : _ref47$connector,
        _ref47$notes = _ref47.notes,
        notes = _ref47$notes === void 0 ? '' : _ref47$notes;
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
  addBtn.textContent = '+';
  addBtn.addEventListener('click', function () {
    row.after(createLensMountRow());
  });
  row.appendChild(addBtn);
  var removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
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
      var _ref48 = item || {},
        _ref48$type = _ref48.type,
        type = _ref48$type === void 0 ? '' : _ref48$type,
        _ref48$mount = _ref48.mount,
        mount = _ref48$mount === void 0 ? 'native' : _ref48$mount;
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
  addBtn.textContent = '+';
  addBtn.addEventListener('click', function () {
    row.after(createPowerDistRow());
  });
  row.appendChild(addBtn);
  var removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
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
      var _ref49 = item || {},
        _ref49$type = _ref49.type,
        type = _ref49$type === void 0 ? '' : _ref49$type,
        _ref49$voltage = _ref49.voltage,
        voltage = _ref49$voltage === void 0 ? '' : _ref49$voltage,
        _ref49$current = _ref49.current,
        current = _ref49$current === void 0 ? '' : _ref49$current,
        _ref49$wattage = _ref49.wattage,
        wattage = _ref49$wattage === void 0 ? '' : _ref49$wattage,
        _ref49$notes = _ref49.notes,
        notes = _ref49$notes === void 0 ? '' : _ref49$notes;
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
  addBtn.textContent = '+';
  addBtn.addEventListener('click', function () {
    row.after(createTimecodeRow());
  });
  row.appendChild(addBtn);
  var removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '−';
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
      var _ref50 = item || {},
        _ref50$type = _ref50.type,
        type = _ref50$type === void 0 ? '' : _ref50$type,
        _ref50$notes = _ref50.notes,
        notes = _ref50$notes === void 0 ? '' : _ref50$notes;
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
  var fontSize = parseFloat(styles.fontSize) || 16;
  var approxCharWidth = fontSize * 0.6;
  var textWidth = (optionText ? optionText.length : 1) * approxCharWidth;
  var paddingLeft = parseFloat(styles.paddingLeft) || 0;
  var paddingRight = parseFloat(styles.paddingRight) || 0;
  var borderLeft = parseFloat(styles.borderLeftWidth) || 0;
  var borderRight = parseFloat(styles.borderRightWidth) || 0;
  var arrowReserve = Math.max(fontSize, 16);
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
function initFavoritableSelect(selectElem) {
  if (!selectElem || !selectElem.id || selectElem.multiple || selectElem.hidden) return;
  if (!selectElem._favInit) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'favorite-toggle';
    btn.innerHTML = iconMarkup(ICON_GLYPHS.star, 'favorite-icon');
    btn.setAttribute('aria-pressed', 'false');
    btn.addEventListener('click', function () {
      return toggleFavorite(selectElem);
    });
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
    wrapper.appendChild(btn);
    selectElem._favButton = btn;
    selectElem._favInit = true;
    selectElem.addEventListener('change', function () {
      return updateFavoriteButton(selectElem);
    });
  }
  if (selectElem._favButton) {
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
  var filtered = Object.fromEntries(Object.entries(devices.monitors || {}).filter(function (_ref51) {
    var _ref52 = _slicedToArray(_ref51, 2),
      data = _ref52[1];
    return !(data.wirelessRX && !data.wirelessTx);
  }));
  populateSelect(monitorSelect, filtered, true);
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
  deviceManagerLists.forEach(function (_ref53) {
    var list = _ref53.list,
      filterInput = _ref53.filterInput;
    if (!list) return;
    var value = filterInput ? filterInput.value : '';
    filterDeviceList(list, value);
  });
}
populateSelect(cameraSelect, devices.cameras, true);
populateMonitorSelect();
populateSelect(videoSelect, devices.video, true);
if (cageSelect) populateSelect(cageSelect, ((_devices$accessories2 = devices.accessories) === null || _devices$accessories2 === void 0 ? void 0 : _devices$accessories2.cages) || {}, true);
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
[cameraSelect, monitorSelect, videoSelect, distanceSelect, batterySelect, hotswapSelect, lensSelect].forEach(function (sel) {
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
  var scenarios = [{
    t: "+40 \xB0C",
    factor: 1.0,
    color: "#d9534f"
  }, {
    t: "+25 \xB0C",
    factor: 1.0,
    color: "#5cb85c"
  }, {
    t: "0 \xB0C",
    factor: 0.8,
    color: "#f0ad4e"
  }, {
    t: "\u201310 \xB0C",
    factor: 0.625,
    color: "#5bc0de"
  }, {
    t: "\u201320 \xB0C",
    factor: 0.5,
    color: "#0275d8"
  }];
  html += "<table><tr><th>".concat(texts[currentLang].temperatureLabel, "</th><th>").concat(texts[currentLang].runtimeLabel, "</th><th>").concat(texts[currentLang].batteryCountTempLabel, "</th></tr>");
  scenarios.forEach(function (s) {
    var runtime = baseHours * s.factor;
    var batteries = Math.ceil(10 / runtime + 1);
    html += "<tr><td style=\"color:".concat(s.color, "\">").concat(s.t, "</td><td>").concat(runtime.toFixed(2), "</td><td>").concat(batteries, "</td></tr>");
  });
  html += "</table>";
  container.innerHTML = html;
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
    pinWarnElem.textContent = "";
    setStatusLevel(pinWarnElem, null);
    dtapWarnElem.textContent = "";
    setStatusLevel(dtapWarnElem, null);
    if (hotswapWarnElem) {
      hotswapWarnElem.textContent = "";
      setStatusLevel(hotswapWarnElem, null);
    }
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
        hotswapWarnElem.textContent = texts[currentLang].warnHotswapLower.replace("{max}", hsData.pinA).replace("{batt}", battData.pinA);
        setStatusLevel(hotswapWarnElem, 'warning');
        maxPinA = hsData.pinA;
      } else {
        hotswapWarnElem.textContent = "";
        setStatusLevel(hotswapWarnElem, null);
      }
    } else {
      if (hotswapWarnElem) {
        hotswapWarnElem.textContent = "";
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
    var batteriesNeeded = Math.ceil(10 / hours + 1);
    batteryCountElem.textContent = batteriesNeeded.toString();
    pinWarnElem.textContent = "";
    dtapWarnElem.textContent = "";
    var pinSeverity = "";
    var dtapSeverity = "";
    if (totalCurrentLow > maxPinA) {
      pinWarnElem.textContent = texts[currentLang].warnPinExceeded.replace("{current}", totalCurrentLow.toFixed(2)).replace("{max}", maxPinA);
      pinSeverity = 'danger';
    } else if (totalCurrentLow > maxPinA * 0.8) {
      pinWarnElem.textContent = texts[currentLang].warnPinNear.replace("{current}", totalCurrentLow.toFixed(2)).replace("{max}", maxPinA);
      pinSeverity = 'warning';
    }
    if (!bMountCam) {
      if (totalCurrentLow > maxDtapA) {
        dtapWarnElem.textContent = texts[currentLang].warnDTapExceeded.replace("{current}", totalCurrentLow.toFixed(2)).replace("{max}", maxDtapA);
        dtapSeverity = 'danger';
      } else if (totalCurrentLow > maxDtapA * 0.8) {
        dtapWarnElem.textContent = texts[currentLang].warnDTapNear.replace("{current}", totalCurrentLow.toFixed(2)).replace("{max}", maxDtapA);
        dtapSeverity = 'warning';
      }
    }
    if (pinWarnElem.textContent === "") {
      pinWarnElem.textContent = texts[currentLang].pinOk.replace("{max}", maxPinA);
      setStatusLevel(pinWarnElem, 'success');
    } else {
      setStatusLevel(pinWarnElem, pinSeverity || 'warning');
    }
    if (!bMountCam) {
      if (dtapWarnElem.textContent === "") {
        dtapWarnElem.textContent = texts[currentLang].dtapOk.replace("{max}", maxDtapA);
        setStatusLevel(dtapWarnElem, 'success');
      } else {
        setStatusLevel(dtapWarnElem, dtapSeverity || 'warning');
      }
    } else {
      dtapWarnElem.textContent = "";
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
    var _batteriesNeeded = Math.ceil(10 / combinedRuntime + 1);
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
  var _devices6, _devices7, _devices8, _devices1, _devices10;
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
  var camPower = ((_devices6 = devices) === null || _devices6 === void 0 || (_devices6 = _devices6.cameras) === null || _devices6 === void 0 || (_devices6 = _devices6[cameraSelect === null || cameraSelect === void 0 ? void 0 : cameraSelect.value]) === null || _devices6 === void 0 ? void 0 : _devices6.powerDrawWatts) || 0;
  var monitorPower = ((_devices7 = devices) === null || _devices7 === void 0 || (_devices7 = _devices7.monitors) === null || _devices7 === void 0 || (_devices7 = _devices7[monitorSelect === null || monitorSelect === void 0 ? void 0 : monitorSelect.value]) === null || _devices7 === void 0 ? void 0 : _devices7.powerDrawWatts) || 0;
  var videoPower = ((_devices8 = devices) === null || _devices8 === void 0 || (_devices8 = _devices8.video) === null || _devices8 === void 0 || (_devices8 = _devices8[videoSelect === null || videoSelect === void 0 ? void 0 : videoSelect.value]) === null || _devices8 === void 0 ? void 0 : _devices8.powerDrawWatts) || 0;
  var motorPower = motorSelects.reduce(function (sum, sel) {
    var _devices9;
    return sum + (((_devices9 = devices) === null || _devices9 === void 0 || (_devices9 = _devices9.fiz) === null || _devices9 === void 0 || (_devices9 = _devices9.motors) === null || _devices9 === void 0 || (_devices9 = _devices9[sel.value]) === null || _devices9 === void 0 ? void 0 : _devices9.powerDrawWatts) || 0);
  }, 0);
  var controllerPower = controllerSelects.reduce(function (sum, sel) {
    var _devices0;
    return sum + (((_devices0 = devices) === null || _devices0 === void 0 || (_devices0 = _devices0.fiz) === null || _devices0 === void 0 || (_devices0 = _devices0.controllers) === null || _devices0 === void 0 || (_devices0 = _devices0[sel.value]) === null || _devices0 === void 0 ? void 0 : _devices0.powerDrawWatts) || 0);
  }, 0);
  var distancePower = ((_devices1 = devices) === null || _devices1 === void 0 || (_devices1 = _devices1.fiz) === null || _devices1 === void 0 || (_devices1 = _devices1.distance) === null || _devices1 === void 0 || (_devices1 = _devices1[distanceSelect === null || distanceSelect === void 0 ? void 0 : distanceSelect.value]) === null || _devices1 === void 0 ? void 0 : _devices1.powerDrawWatts) || 0;
  var otherPower = videoPower + motorPower + controllerPower + distancePower;
  var totalPower = camPower + monitorPower + otherPower;
  var specBrightness = (_devices10 = devices) === null || _devices10 === void 0 || (_devices10 = _devices10.monitors) === null || _devices10 === void 0 || (_devices10 = _devices10[monitorSelect === null || monitorSelect === void 0 ? void 0 : monitorSelect.value]) === null || _devices10 === void 0 ? void 0 : _devices10.brightnessNits;
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
    html += "<td><button data-key=\"".concat(encodeURIComponent(currentKey), "\" data-index=\"").concat(index, "\" class=\"deleteFeedbackBtn\">Delete</button></td>");
    html += '</tr>';
  });
  table.innerHTML = html;
  table.classList.remove('hidden');
  if (container) container.classList.remove('hidden');
  table.querySelectorAll('.deleteFeedbackBtn').forEach(function (btn) {
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
  Object.entries(pos).forEach(function (_ref54) {
    var _ref55 = _slicedToArray(_ref54, 2),
      id = _ref55[0],
      p = _ref55[1];
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
  var diagramLabelFontSize = 'var(--font-size-diagram-label, 10px)';
  var diagramTextFontSize = 'var(--font-size-diagram-text, 12px)';
  var DIAGRAM_LABEL_LINE_HEIGHT = 12;
  var DIAGRAM_ICON_TEXT_GAP = 8;
  var DEFAULT_DIAGRAM_ICON_SIZE = 24;
  nodes.forEach(function (id) {
    var label = pos[id].label || id;
    var lines = wrapLabel(label);
    var hasIcon = diagramIcons[id] || id.startsWith('controller') || id.startsWith('motor');
    nodeHeights[id] = Math.max(DEFAULT_NODE_H, lines.length * 12 + (hasIcon ? 30 : 20));
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
    var _label29 = formatConnLabel('D-Tap', fizPowerPort(name));
    var skipBatt = isArri(camName) && isArriOrCmotion(name);
    if (powerSrc && !skipBatt) {
      pushEdge({
        from: powerSrc,
        to: fizId,
        label: _label29,
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
  viewWidth = Math.max(500, contentWidth + NODE_W);
  var shiftX = 0;
  if (Object.keys(manualPositions).length === 0) {
    shiftX = viewWidth / 2 - (minX + maxX) / 2;
    Object.values(pos).forEach(function (p) {
      p.x += shiftX;
    });
  }
  var ys = Object.values(pos).map(function (p) {
    return p.y;
  });
  var minY = Math.min.apply(Math, _toConsumableArray(ys));
  var maxY = Math.max.apply(Math, _toConsumableArray(ys));
  var viewHeight = maxY - minY + NODE_H + 120;
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
  var svg = "<svg viewBox=\"0 ".concat(minY - NODE_H / 2 - 20, " ").concat(viewWidth, " ").concat(viewHeight, "\" xmlns=\"http://www.w3.org/2000/svg\">");
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
    svgEl.style.width = '100%';
    if (!isTouchDevice) {
      var bodyFontSize = parseFloat(getComputedStyle(document.body).fontSize) || 16;
      var MAX_NODE_FONT = 12;
      var maxAutoScale = bodyFontSize / MAX_NODE_FONT;
      svgEl.style.maxWidth = "".concat(viewWidth * maxAutoScale, "px");
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
    var connectors = deviceData ? generateConnectorSummary(deviceData) : '';
    var infoHtml = (deviceData && deviceData.latencyMs ? "<div class=\"info-box video-conn\"><strong>Latency:</strong> ".concat(escapeHtml(String(deviceData.latencyMs)), "</div>") : '') + (deviceData && deviceData.frequency ? "<div class=\"info-box video-conn\"><strong>Frequency:</strong> ".concat(escapeHtml(String(deviceData.frequency)), "</div>") : '');
    var html = "<strong>".concat(escapeHtml(info.name), "</strong>") + connectors + infoHtml;
    var show = function show(e) {
      e.stopPropagation();
      var pointer = e.touches && e.touches[0] ? e.touches[0] : e;
      popup.innerHTML = html;
      popup.style.display = 'block';
      var rect = setupDiagramContainer.getBoundingClientRect();
      var relX = pointer.clientX - rect.left;
      var relY = pointer.clientY - rect.top;
      var offset = 10;
      var popupWidth = popup.offsetWidth;
      var left = relX + offset;
      if (relX + popupWidth + offset > rect.width) {
        left = Math.max(0, relX - popupWidth - offset);
      }
      popup.style.left = "".concat(left, "px");
      popup.style.top = "".concat(relY + offset, "px");
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
  var pan = {
    x: 0,
    y: 0
  };
  var scale = 1;
  var panning = false;
  var panStart = {
    x: 0,
    y: 0
  };
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
  var apply = function apply() {
    if (scale > MAX_SCALE) scale = MAX_SCALE;
    root.setAttribute('transform', "translate(".concat(pan.x, ",").concat(pan.y, ") scale(").concat(scale, ")"));
  };
  if (zoomInBtn) {
    zoomInBtn.onclick = function () {
      scale *= 1.1;
      apply();
    };
  }
  if (zoomOutBtn) {
    zoomOutBtn.onclick = function () {
      scale *= 0.9;
      apply();
    };
  }
  if (resetViewBtn) {
    resetViewBtn.onclick = function () {
      pan = {
        x: 0,
        y: 0
      };
      scale = 1;
      apply();
      manualPositions = {};
      renderSetupDiagram();
    };
  }
  var onSvgMouseDown = function onSvgMouseDown(e) {
    if (e.target.closest('.diagram-node')) return;
    var pos = getPos(e);
    panning = true;
    panStart = {
      x: pos.x - pan.x,
      y: pos.y - pan.y
    };
    if (e.touches) e.preventDefault();
  };
  var onPanMove = function onPanMove(e) {
    if (!panning) return;
    var pos = getPos(e);
    pan.x = pos.x - panStart.x;
    pan.y = pos.y - panStart.y;
    apply();
    if (e.touches) e.preventDefault();
  };
  var stopPanning = function stopPanning() {
    panning = false;
  };
  var dragId = null;
  var dragStart = null;
  var dragNode = null;
  var onDragStart = function onDragStart(e) {
    var node = e.target.closest('.diagram-node');
    if (!node) return;
    dragId = node.getAttribute('data-node');
    dragNode = node;
    var pos = getPos(e);
    dragStart = {
      x: pos.x,
      y: pos.y
    };
    if (e.touches) e.preventDefault();
    e.stopPropagation();
  };
  var onDragMove = function onDragMove(e) {
    if (!dragId) return;
    var start = lastDiagramPositions[dragId];
    if (!start) return;
    var pos = getPos(e);
    var dx = (pos.x - dragStart.x) / scale;
    var dy = (pos.y - dragStart.y) / scale;
    var newX = start.x + dx;
    var newY = start.y + dy;
    if (gridSnap) {
      var g = 20 / scale;
      newX = Math.round(newX / g) * g;
      newY = Math.round(newY / g) * g;
    }
    var tx = newX - start.x;
    var ty = newY - start.y;
    if (dragNode) dragNode.setAttribute('transform', "translate(".concat(tx, ",").concat(ty, ")"));
    if (e.touches) e.preventDefault();
  };
  var onDragEnd = function onDragEnd(e) {
    if (!dragId) return;
    var start = lastDiagramPositions[dragId];
    if (start) {
      var pos = getPos(e);
      var dx = (pos.x - dragStart.x) / scale;
      var dy = (pos.y - dragStart.y) / scale;
      var newX = start.x + dx;
      var newY = start.y + dy;
      if (gridSnap) {
        var g = 20 / scale;
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
    renderSetupDiagram();
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
  diagramLegend.innerHTML = legendItems.map(function (_ref56) {
    var cls = _ref56.cls,
      text = _ref56.text;
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
    var summary = generateConnectorSummary(deviceData);
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
    for (var _i20 = 0, _Object$entries14 = Object.entries(categoryDevices); _i20 < _Object$entries14.length; _i20++) {
      var _Object$entries14$_i = _slicedToArray(_Object$entries14[_i20], 2),
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
  deviceManagerLists.forEach(function (_ref57, categoryKey) {
    var list = _ref57.list,
      filterInput = _ref57.filterInput;
    if (!list) return;
    renderDeviceList(categoryKey, list);
    var filterValue = filterInput ? filterInput.value : '';
    filterDeviceList(list, filterValue);
  });
}
refreshDeviceLists();
languageSelect.addEventListener("change", function (event) {
  setLanguage(event.target.value);
});
if (skipLink) {
  skipLink.addEventListener("click", function () {
    var main = document.getElementById("mainContent");
    if (main) main.focus();
  });
}
saveSetupBtn.addEventListener("click", function () {
  var setupName = setupNameInput.value.trim();
  if (!setupName) {
    alert(texts[currentLang].alertSetupName);
    return;
  }
  var currentSetup = _objectSpread({}, getCurrentSetupState());
  var gearListHtml = getCurrentGearListHtml();
  if (gearListHtml) {
    currentSetup.gearList = gearListHtml;
  }
  var setups = getSetups();
  setups[setupName] = currentSetup;
  storeSetups(setups);
  populateSetupSelect();
  setupSelect.value = setupName;
  saveCurrentSession();
  storeLoadedSetupState(getCurrentSetupState());
  checkSetupChanged();
  saveCurrentGearList();
  alert(texts[currentLang].alertSetupSaved.replace("{name}", setupName));
});
deleteSetupBtn.addEventListener("click", function () {
  var setupName = setupSelect.value;
  if (!setupName) {
    alert(texts[currentLang].alertNoSetupSelected);
    return;
  }
  if (confirm(texts[currentLang].confirmDeleteSetup.replace("{name}", setupName)) && confirm(texts[currentLang].confirmDeleteSetupAgain)) {
    var backupName = ensureAutoBackupBeforeDeletion('delete setup');
    if (!backupName) {
      return;
    }
    var setups = getSetups();
    delete setups[setupName];
    storeSetups(setups);
    if (typeof deleteProject === 'function') {
      deleteProject(setupName);
    }
    populateSetupSelect();
    setupNameInput.value = "";
    [cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect].forEach(function (sel) {
      var noneOption = Array.from(sel.options).find(function (opt) {
        return opt.value === "None";
      });
      if (noneOption) {
        sel.value = "None";
      } else {
        sel.selectedIndex = 0;
      }
    });
    var sbSel = getSliderBowlSelect();
    if (sbSel) sbSel.value = '';
    motorSelects.forEach(function (sel) {
      if (sel.options.length) sel.value = "None";
    });
    controllerSelects.forEach(function (sel) {
      if (sel.options.length) sel.value = "None";
    });
    updateCalculations();
    alert(texts[currentLang].alertSetupDeleted.replace("{name}", setupName));
  }
});
clearSetupBtn.addEventListener("click", function () {
  if (confirm(texts[currentLang].confirmClearSetup) && confirm(texts[currentLang].confirmClearSetupAgain)) {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('cameraPowerPlanner_session');
    }
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem('cameraPowerPlanner_session');
    }
    setupSelect.value = "";
    setupNameInput.value = "";
    [cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect, batteryPlateSelect].forEach(function (sel) {
      if (!sel) return;
      var noneOption = Array.from(sel.options).find(function (opt) {
        return opt.value === "None";
      });
      if (noneOption) {
        sel.value = "None";
      } else {
        sel.selectedIndex = 0;
      }
    });
    var sbSel = getSliderBowlSelect();
    if (sbSel) sbSel.value = '';
    motorSelects.forEach(function (sel) {
      if (sel.options.length) sel.value = "None";
    });
    controllerSelects.forEach(function (sel) {
      if (sel.options.length) sel.value = "None";
    });
    updateBatteryPlateVisibility();
    updateBatteryOptions();
    clearProjectAutoGearRules();
    renderAutoGearRulesList();
    updateAutoGearCatalogOptions();
    updateCalculations();
  }
});
setupSelect.addEventListener("change", function (event) {
  var setupName = event.target.value;
  if (lastSetupName && typeof saveProject === 'function') {
    var previousRules = getProjectScopedAutoGearRules();
    var previousPayload = {
      projectInfo: currentProjectInfo,
      gearList: getCurrentGearListHtml()
    };
    if (previousRules && previousRules.length) {
      previousPayload.autoGearRules = previousRules;
    }
    saveProject(lastSetupName, previousPayload);
  }
  if (setupName === "") {
    setupNameInput.value = "";
    [cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect].forEach(function (sel) {
      var noneOption = Array.from(sel.options).find(function (opt) {
        return opt.value === "None";
      });
      if (noneOption) {
        sel.value = "None";
      } else {
        sel.selectedIndex = 0;
      }
    });
    var sbSel = getSliderBowlSelect();
    if (sbSel) sbSel.value = '';
    motorSelects.forEach(function (sel) {
      if (sel.options.length) sel.value = "None";
    });
    controllerSelects.forEach(function (sel) {
      if (sel.options.length) sel.value = "None";
    });
    updateBatteryPlateVisibility();
    updateBatteryOptions();
    storeLoadedSetupState(null);
    if (gearListOutput) {
      gearListOutput.innerHTML = '';
      gearListOutput.classList.add('hidden');
    }
    if (projectRequirementsOutput) {
      projectRequirementsOutput.innerHTML = '';
      projectRequirementsOutput.classList.add('hidden');
    }
    currentProjectInfo = null;
    if (projectForm) populateProjectForm({});
    clearProjectAutoGearRules();
  } else {
    var setups = getSetups();
    var setup = setups[setupName];
    if (setup) {
      setupNameInput.value = setupName;
      cameraSelect.value = setup.camera;
      updateBatteryPlateVisibility();
      batteryPlateSelect.value = setup.batteryPlate || batteryPlateSelect.value;
      monitorSelect.value = setup.monitor;
      videoSelect.value = setup.video;
      if (cageSelect) cageSelect.value = setup.cage || cageSelect.value;
      (setup.motors || []).forEach(function (val, i) {
        if (motorSelects[i]) motorSelects[i].value = val;
      });
      (setup.controllers || []).forEach(function (val, i) {
        if (controllerSelects[i]) controllerSelects[i].value = val;
      });
      distanceSelect.value = setup.distance;
      batterySelect.value = setup.battery;
      hotswapSelect.value = setup.batteryHotswap || hotswapSelect.value;
      setSliderBowlValue(setup.sliderBowl || '');
      setEasyrigValue(setup.easyrig || '');
      updateBatteryOptions();
      var storedProject = typeof loadProject === 'function' ? loadProject(setupName) : null;
      var html = setup.gearList || (storedProject === null || storedProject === void 0 ? void 0 : storedProject.gearList) || '';
      currentProjectInfo = setup.projectInfo || (storedProject === null || storedProject === void 0 ? void 0 : storedProject.projectInfo) || null;
      var projectRulesSource = Array.isArray(setup.autoGearRules) && setup.autoGearRules.length ? setup.autoGearRules : Array.isArray(storedProject === null || storedProject === void 0 ? void 0 : storedProject.autoGearRules) && storedProject.autoGearRules.length ? storedProject.autoGearRules : null;
      if (projectRulesSource) {
        useProjectAutoGearRules(projectRulesSource);
      } else {
        clearProjectAutoGearRules();
      }
      if (gearListOutput) {
        displayGearAndRequirements(html);
        populateProjectForm(currentProjectInfo || {});
        if (html) {
          ensureGearListActions();
          bindGearListCageListener();
          bindGearListEasyrigListener();
          bindGearListSliderBowlListener();
          bindGearListEyeLeatherListener();
          bindGearListProGaffTapeListener();
          bindGearListDirectorMonitorListener();
        }
        if (typeof saveProject === 'function') {
          var payload = {
            projectInfo: currentProjectInfo,
            gearList: html
          };
          var activeRules = getProjectScopedAutoGearRules();
          if (activeRules && activeRules.length) {
            payload.autoGearRules = activeRules;
          }
          saveProject(setupName, payload);
        }
      }
    } else {
      currentProjectInfo = null;
      if (projectForm) populateProjectForm({});
      displayGearAndRequirements('');
      clearProjectAutoGearRules();
    }
    storeLoadedSetupState(getCurrentSetupState());
  }
  renderAutoGearRulesList();
  updateAutoGearCatalogOptions();
  if (saveSetupBtn) {
    saveSetupBtn.disabled = !setupNameInput.value.trim();
  }
  updateCalculations();
  checkSetupChanged();
  lastSetupName = setupName;
});
function populateSetupSelect() {
  var setups = getSetups();
  setupSelect.innerHTML = "<option value=\"\">".concat(texts[currentLang].newSetupOption, "</option>");
  var names = Object.keys(setups).filter(function (name) {
    return showAutoBackups || !name.startsWith('auto-backup-');
  }).sort(function (a, b) {
    var autoA = a.startsWith('auto-backup-');
    var autoB = b.startsWith('auto-backup-');
    if (autoA !== autoB) return autoA ? 1 : -1;
    return localeSort(a, b);
  });
  var _iterator20 = _createForOfIteratorHelper(names),
    _step20;
  try {
    for (_iterator20.s(); !(_step20 = _iterator20.n()).done;) {
      var name = _step20.value;
      var opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      setupSelect.appendChild(opt);
    }
  } catch (err) {
    _iterator20.e(err);
  } finally {
    _iterator20.f();
  }
}
populateSetupSelect();
checkSetupChanged();
function autoBackup() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (!setupSelect) return null;
  var config = _typeof(options) === 'object' && options !== null ? options : {};
  var suppressSuccess = Boolean(config.suppressSuccess);
  var suppressError = Boolean(config.suppressError);
  var successMessage = typeof config.successMessage === 'string' && config.successMessage ? config.successMessage : 'Auto backup saved';
  var errorMessage = typeof config.errorMessage === 'string' && config.errorMessage ? config.errorMessage : 'Auto backup failed';
  try {
    var pad = function pad(n) {
      return String(n).padStart(2, '0');
    };
    var now = new Date();
    var baseName = "auto-backup-".concat(now.getFullYear(), "-").concat(pad(now.getMonth() + 1), "-").concat(pad(now.getDate()), "-").concat(pad(now.getHours()), "-").concat(pad(now.getMinutes()));
    var activeNameRaw = setupSelect.value || (setupNameInput && typeof setupNameInput.value === 'string' ? setupNameInput.value.trim() : '');
    var normalizedName = activeNameRaw ? activeNameRaw.replace(/\s+/g, ' ').trim() : '';
    var backupName = normalizedName ? "".concat(baseName, "-").concat(normalizedName) : baseName;
    var currentSetup = _objectSpread({}, getCurrentSetupState());
    var gearListHtml = getCurrentGearListHtml();
    if (gearListHtml) {
      currentSetup.gearList = gearListHtml;
    }
    var setups = getSetups();
    setups[backupName] = currentSetup;
    storeSetups(setups);
    if (typeof saveProject === 'function') {
      var payload = {
        gearList: gearListHtml || '',
        projectInfo: currentSetup.projectInfo || null
      };
      var activeRules = getProjectScopedAutoGearRules();
      if (activeRules && activeRules.length) {
        payload.autoGearRules = activeRules;
      }
      if (payload.gearList || payload.projectInfo || payload.autoGearRules) {
        saveProject(backupName, payload);
      }
    }
    var prevValue = setupSelect.value;
    var prevName = setupNameInput ? setupNameInput.value : '';
    populateSetupSelect();
    setupSelect.value = prevValue;
    if (setupNameInput) setupNameInput.value = prevName;
    if (!suppressSuccess) {
      showNotification('success', successMessage);
    }
    return backupName;
  } catch (e) {
    console.warn('Auto backup failed', e);
    if (!suppressError) {
      showNotification('error', errorMessage);
    }
    return null;
  }
}
function ensureAutoBackupBeforeDeletion(context) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var config = _typeof(options) === 'object' && options !== null ? options : {};
  var langTexts = texts[currentLang] || {};
  var fallbackTexts = texts.en || {};
  var successMessage = config.successMessage || langTexts.preDeleteBackupSuccess || fallbackTexts.preDeleteBackupSuccess || 'Automatic backup saved. Restore it anytime from Saved Projects.';
  var failureMessage = config.failureMessage || langTexts.preDeleteBackupFailed || fallbackTexts.preDeleteBackupFailed || 'Automatic backup failed. The action was cancelled.';
  var autoBackupOptions = _objectSpread({
    suppressSuccess: true,
    suppressError: true
  }, config.autoBackupOptions || {});
  var backupName = null;
  if (typeof autoBackup === 'function') {
    try {
      backupName = autoBackup(autoBackupOptions);
    } catch (error) {
      console.error("Automatic backup before ".concat(context || 'deletion', " failed"), error);
      backupName = null;
    }
  }
  if (!backupName) {
    showNotification('error', failureMessage);
    return null;
  }
  if (config.notifySuccess !== false) {
    showNotification('success', successMessage);
  }
  return backupName;
}
var autoBackupInterval = setInterval(autoBackup, 10 * 60 * 1000);
if (typeof autoBackupInterval.unref === 'function') {
  autoBackupInterval.unref();
}
var autoGearBackupInterval = setInterval(function () {
  if (!autoGearRulesDirtySinceBackup) return;
  createAutoGearBackup();
}, AUTO_GEAR_BACKUP_INTERVAL_MS);
if (typeof autoGearBackupInterval.unref === 'function') {
  autoGearBackupInterval.unref();
}
var hourlyBackupInterval = setInterval(function () {
  var fileName = createSettingsBackup(false);
  showNotification(fileName ? 'success' : 'error', fileName ? "Full app backup downloaded (".concat(fileName, ")") : 'Full app backup failed');
}, 60 * 60 * 1000);
if (typeof hourlyBackupInterval.unref === 'function') {
  hourlyBackupInterval.unref();
}
function showDeviceManagerSection() {
  if (!deviceManagerSection || !toggleDeviceBtn) return;
  if (!deviceManagerSection.classList.contains('hidden')) return;
  deviceManagerSection.classList.remove('hidden');
  toggleDeviceBtn.textContent = texts[currentLang].hideDeviceManager;
  toggleDeviceBtn.setAttribute('title', texts[currentLang].hideDeviceManager);
  toggleDeviceBtn.setAttribute('data-help', texts[currentLang].hideDeviceManagerHelp);
  toggleDeviceBtn.setAttribute('aria-expanded', 'true');
  refreshDeviceLists();
  updateCalculations();
}
function hideDeviceManagerSection() {
  if (!deviceManagerSection || !toggleDeviceBtn) return;
  if (deviceManagerSection.classList.contains('hidden')) return;
  deviceManagerSection.classList.add('hidden');
  toggleDeviceBtn.textContent = texts[currentLang].toggleDeviceManager;
  toggleDeviceBtn.setAttribute('title', texts[currentLang].toggleDeviceManager);
  toggleDeviceBtn.setAttribute('data-help', texts[currentLang].toggleDeviceManagerHelp);
  toggleDeviceBtn.setAttribute('aria-expanded', 'false');
}
if (toggleDeviceBtn) {
  toggleDeviceBtn.addEventListener('click', function () {
    if (deviceManagerSection.classList.contains('hidden')) {
      showDeviceManagerSection();
    } else {
      hideDeviceManagerSection();
    }
  });
}
function toggleDeviceDetails(button) {
  var details = button.closest('li').querySelector('.device-details');
  var expanded = button.getAttribute('aria-expanded') === 'true';
  if (expanded) {
    details.style.display = 'none';
    button.textContent = texts[currentLang].showDetails;
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('data-help', texts[currentLang].showDetails);
  } else {
    details.style.display = 'block';
    button.textContent = texts[currentLang].hideDetails;
    button.setAttribute('aria-expanded', 'true');
    button.setAttribute('data-help', texts[currentLang].hideDetails);
  }
}
function inferDeviceCategory(key, data) {
  var _data$power;
  if (key === "batteries" || key.endsWith('.batteries') || data.capacity !== undefined) return "batteries";
  if (key === "cameras" || data.recordingMedia || data.lensMount || (_data$power = data.power) !== null && _data$power !== void 0 && _data$power.batteryPlateSupport) return "cameras";
  if (key === "monitors" || data.screenSizeInches !== undefined && !key.includes("viewfinder")) return "monitors";
  if (key === "viewfinders" || key.includes("viewfinder")) return "viewfinders";
  if (key === "video" || key === "wirelessReceivers" || key === "iosVideo" || data.videoInputs || data.videoOutputs || data.frequency !== undefined) return "video";
  if (key === "fiz.motors" || data.torqueNm !== undefined || data.gearTypes) return "fiz.motors";
  if (key === "fiz.controllers" || data.powerSource || data.batteryType || data.connectivity) return "fiz.controllers";
  if (key === "fiz.distance" || data.measurementMethod || data.connectionCompatibility || data.measurementRange || data.accuracy) return "fiz.distance";
  return "generic";
}
function populateDeviceForm(categoryKey, deviceData, subcategory) {
  placeWattField(categoryKey, deviceData);
  var type = inferDeviceCategory(categoryKey, deviceData);
  if (wattFieldDiv) wattFieldDiv.style.display = "block";
  hideFormSection(batteryFieldsDiv);
  hideFormSection(cameraFieldsDiv);
  hideFormSection(monitorFieldsDiv);
  hideFormSection(viewfinderFieldsDiv);
  hideFormSection(videoFieldsDiv);
  hideFormSection(motorFieldsDiv);
  hideFormSection(controllerFieldsDiv);
  hideFormSection(distanceFieldsDiv);
  clearDynamicFields();
  if (type === "batteries") {
    if (wattFieldDiv) wattFieldDiv.style.display = "none";
    showFormSection(batteryFieldsDiv);
    newCapacityInput.value = deviceData.capacity || '';
    newPinAInput.value = deviceData.pinA || '';
    if (dtapRow) dtapRow.style.display = categoryKey === "batteryHotswaps" ? "none" : "";
    newDtapAInput.value = categoryKey === "batteryHotswaps" ? '' : deviceData.dtapA || '';
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "cameras") {
    var _deviceData$power, _deviceData$power2, _deviceData$power3;
    if (wattFieldDiv) wattFieldDiv.style.display = "none";
    showFormSection(cameraFieldsDiv);
    var tmp = firstPowerInputType(deviceData);
    cameraWattInput.value = deviceData.powerDrawWatts || '';
    cameraVoltageInput.value = ((_deviceData$power = deviceData.power) === null || _deviceData$power === void 0 || (_deviceData$power = _deviceData$power.input) === null || _deviceData$power === void 0 ? void 0 : _deviceData$power.voltageRange) || '';
    cameraPortTypeInput.value = tmp || "";
    setBatteryPlates(((_deviceData$power2 = deviceData.power) === null || _deviceData$power2 === void 0 ? void 0 : _deviceData$power2.batteryPlateSupport) || []);
    setRecordingMedia(deviceData.recordingMedia || []);
    setLensMounts(deviceData.lensMount || []);
    setPowerDistribution(((_deviceData$power3 = deviceData.power) === null || _deviceData$power3 === void 0 ? void 0 : _deviceData$power3.powerDistributionOutputs) || []);
    setVideoOutputs(deviceData.videoOutputs || []);
    setFizConnectors(deviceData.fizConnectors || []);
    setViewfinders(deviceData.viewfinder || []);
    setTimecodes(deviceData.timecode || []);
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "monitors") {
    var _deviceData$power4, _deviceData$video, _deviceData$video2, _deviceData$audioOutp, _deviceData$audioOutp2;
    showFormSection(monitorFieldsDiv);
    monitorScreenSizeInput.value = deviceData.screenSizeInches || '';
    monitorBrightnessInput.value = deviceData.brightnessNits || '';
    monitorWattInput.value = deviceData.powerDrawWatts || '';
    monitorVoltageInput.value = ((_deviceData$power4 = deviceData.power) === null || _deviceData$power4 === void 0 || (_deviceData$power4 = _deviceData$power4.input) === null || _deviceData$power4 === void 0 ? void 0 : _deviceData$power4.voltageRange) || '';
    var mpt = firstPowerInputType(deviceData);
    monitorPortTypeInput.value = mpt || "";
    setMonitorVideoInputs(deviceData.videoInputs || ((_deviceData$video = deviceData.video) === null || _deviceData$video === void 0 ? void 0 : _deviceData$video.inputs) || []);
    setMonitorVideoOutputs(deviceData.videoOutputs || ((_deviceData$video2 = deviceData.video) === null || _deviceData$video2 === void 0 ? void 0 : _deviceData$video2.outputs) || []);
    monitorWirelessTxInput.checked = !!deviceData.wirelessTx;
    monitorLatencyInput.value = deviceData.latencyMs || '';
    monitorAudioOutputInput.value = ((_deviceData$audioOutp = deviceData.audioOutput) === null || _deviceData$audioOutp === void 0 ? void 0 : _deviceData$audioOutp.portType) || ((_deviceData$audioOutp2 = deviceData.audioOutput) === null || _deviceData$audioOutp2 === void 0 ? void 0 : _deviceData$audioOutp2.type) || deviceData.audioOutput || '';
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "viewfinders") {
    var _deviceData$power5, _deviceData$video3, _deviceData$video4;
    showFormSection(viewfinderFieldsDiv);
    viewfinderScreenSizeInput.value = deviceData.screenSizeInches || '';
    viewfinderBrightnessInput.value = deviceData.brightnessNits || '';
    viewfinderWattInput.value = deviceData.powerDrawWatts || '';
    viewfinderVoltageInput.value = ((_deviceData$power5 = deviceData.power) === null || _deviceData$power5 === void 0 || (_deviceData$power5 = _deviceData$power5.input) === null || _deviceData$power5 === void 0 ? void 0 : _deviceData$power5.voltageRange) || '';
    var vfpt = firstPowerInputType(deviceData);
    viewfinderPortTypeInput.value = vfpt || "";
    setViewfinderVideoInputs(deviceData.videoInputs || ((_deviceData$video3 = deviceData.video) === null || _deviceData$video3 === void 0 ? void 0 : _deviceData$video3.inputs) || []);
    setViewfinderVideoOutputs(deviceData.videoOutputs || ((_deviceData$video4 = deviceData.video) === null || _deviceData$video4 === void 0 ? void 0 : _deviceData$video4.outputs) || []);
    viewfinderWirelessTxInput.checked = !!deviceData.wirelessTx;
    viewfinderLatencyInput.value = deviceData.latencyMs || '';
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "video") {
    var _deviceData$video5, _deviceData$video6;
    showFormSection(videoFieldsDiv);
    newWattInput.value = deviceData.powerDrawWatts || '';
    videoPowerInput.value = firstPowerInputType(deviceData);
    setVideoInputs(deviceData.videoInputs || ((_deviceData$video5 = deviceData.video) === null || _deviceData$video5 === void 0 ? void 0 : _deviceData$video5.inputs) || []);
    setVideoOutputsIO(deviceData.videoOutputs || ((_deviceData$video6 = deviceData.video) === null || _deviceData$video6 === void 0 ? void 0 : _deviceData$video6.outputs) || []);
    videoFrequencyInput.value = deviceData.frequency || '';
    videoLatencyInput.value = deviceData.latencyMs || '';
    motorConnectorInput.value = '';
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "fiz.motors") {
    showFormSection(motorFieldsDiv);
    newWattInput.value = deviceData.powerDrawWatts || '';
    motorConnectorInput.value = deviceData.fizConnector || '';
    motorInternalInput.checked = !!deviceData.internalController;
    motorTorqueInput.value = deviceData.torqueNm || '';
    motorGearInput.value = Array.isArray(deviceData.gearTypes) ? deviceData.gearTypes.join(', ') : '';
    motorNotesInput.value = deviceData.notes || '';
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "fiz.controllers") {
    showFormSection(controllerFieldsDiv);
    newWattInput.value = deviceData.powerDrawWatts || '';
    var cc = Array.isArray(deviceData.fizConnectors) ? deviceData.fizConnectors.map(function (fc) {
      return fc.type;
    }).join(', ') : deviceData.fizConnector || '';
    controllerConnectorInput.value = cc;
    controllerPowerInput.value = deviceData.powerSource || '';
    controllerBatteryInput.value = deviceData.batteryType || '';
    controllerConnectivityInput.value = deviceData.connectivity || '';
    controllerNotesInput.value = deviceData.notes || '';
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "fiz.distance") {
    showFormSection(distanceFieldsDiv);
    newWattInput.value = deviceData.powerDrawWatts || '';
    distanceConnectionInput.value = deviceData.connectionCompatibility || '';
    distanceMethodInput.value = deviceData.measurementMethod || '';
    distanceRangeInput.value = deviceData.measurementRange || '';
    distanceAccuracyInput.value = deviceData.accuracy || '';
    distanceOutputInput.value = deviceData.outputDisplay || '';
    distanceNotesInput.value = deviceData.notes || '';
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  } else if (type === "accessories.cables") {
    var _devices$accessories3;
    wattFieldDiv.style.display = "none";
    subcategoryFieldDiv.hidden = false;
    var subcats = Object.keys(((_devices$accessories3 = devices.accessories) === null || _devices$accessories3 === void 0 ? void 0 : _devices$accessories3.cables) || {});
    newSubcategorySelect.innerHTML = '';
    for (var _i21 = 0, _subcats = subcats; _i21 < _subcats.length; _i21++) {
      var sc = _subcats[_i21];
      var opt = document.createElement('option');
      opt.value = sc;
      opt.textContent = sc.charAt(0).toUpperCase() + sc.slice(1);
      newSubcategorySelect.appendChild(opt);
    }
    newSubcategorySelect.value = subcategory || '';
    newSubcategorySelect.disabled = false;
    buildDynamicFields("accessories.cables.".concat(subcategory), deviceData, categoryExcludedAttrs["accessories.cables.".concat(subcategory)] || []);
  } else {
    var watt = _typeof(deviceData) === 'object' ? deviceData.powerDrawWatts : deviceData;
    newWattInput.value = watt || '';
    buildDynamicFields(categoryKey, deviceData, categoryExcludedAttrs[categoryKey] || []);
  }
}
deviceManagerSection.addEventListener("click", function (event) {
  if (event.target.classList.contains("detail-toggle")) {
    toggleDeviceDetails(event.target);
  } else if (event.target.classList.contains("edit-btn")) {
    var name = event.target.dataset.name;
    var categoryKey = event.target.dataset.category;
    var subcategory = event.target.dataset.subcategory;
    if (!Array.from(newCategorySelect.options).some(function (opt) {
      return opt.value === categoryKey;
    })) {
      var _categoryNames$curren;
      var opt = document.createElement("option");
      opt.value = categoryKey;
      opt.textContent = ((_categoryNames$curren = categoryNames[currentLang]) === null || _categoryNames$curren === void 0 ? void 0 : _categoryNames$curren[categoryKey]) || categoryKey;
      newCategorySelect.appendChild(opt);
    }
    addDeviceBtn.dataset.mode = "edit";
    addDeviceBtn.dataset.originalName = name;
    addDeviceBtn.dataset.originalCategory = categoryKey;
    if (categoryKey === "accessories.cables" && subcategory) {
      addDeviceBtn.dataset.originalSubcategory = subcategory;
    } else {
      delete addDeviceBtn.dataset.originalSubcategory;
    }
    newCategorySelect.value = categoryKey;
    newNameInput.value = name;
    newCategorySelect.dispatchEvent(new Event('change'));
    var deviceData;
    if (categoryKey === "accessories.cables") {
      deviceData = devices.accessories.cables[subcategory][name];
    } else if (categoryKey.includes('.')) {
      var _categoryKey$split5 = categoryKey.split('.'),
        _categoryKey$split6 = _slicedToArray(_categoryKey$split5, 2),
        mainCat = _categoryKey$split6[0],
        subCat = _categoryKey$split6[1];
      deviceData = devices[mainCat][subCat][name];
    } else {
      deviceData = devices[categoryKey][name];
    }
    populateDeviceForm(categoryKey, deviceData, subcategory);
    addDeviceBtn.textContent = texts[currentLang].updateDeviceBtn;
    addDeviceBtn.setAttribute('data-help', texts[currentLang].updateDeviceBtnHelp);
    addDeviceBtn.dataset.mode = "edit";
    setButtonLabelWithIcon(cancelEditBtn, texts[currentLang].cancelEditBtn, ICON_GLYPHS.circleX);
    cancelEditBtn.setAttribute('data-help', texts[currentLang].cancelEditBtnHelp);
    showFormSection(cancelEditBtn);
    document.getElementById("addDeviceHeading").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  } else if (event.target.classList.contains("delete-btn")) {
    var _name3 = event.target.dataset.name;
    var _categoryKey = event.target.dataset.category;
    var _subcategory = event.target.dataset.subcategory;
    if (confirm(texts[currentLang].confirmDeleteDevice.replace("{name}", _name3))) {
      if (_categoryKey === "accessories.cables") {
        delete devices.accessories.cables[_subcategory][_name3];
      } else if (_categoryKey.includes('.')) {
        var _categoryKey$split7 = _categoryKey.split('.'),
          _categoryKey$split8 = _slicedToArray(_categoryKey$split7, 2),
          _mainCat = _categoryKey$split8[0],
          _subCat = _categoryKey$split8[1];
        delete devices[_mainCat][_subCat][_name3];
      } else {
        delete devices[_categoryKey][_name3];
      }
      storeDevices(devices);
      viewfinderTypeOptions = getAllViewfinderTypes();
      viewfinderConnectorOptions = getAllViewfinderConnectors();
      refreshDeviceLists();
      populateSelect(cameraSelect, devices.cameras, true);
      populateMonitorSelect();
      populateSelect(videoSelect, devices.video, true);
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
      updatePowerDistTypeOptions();
      updatePowerDistVoltageOptions();
      updatePowerDistCurrentOptions();
      updateTimecodeTypeOptions();
      updateDistanceConnectionOptions();
      updateDistanceMethodOptions();
      updateDistanceDisplayOptions();
      applyFilters();
      updateCalculations();
    }
  }
});
deviceManagerSection.addEventListener('keydown', function (event) {
  if (event.target.classList.contains('detail-toggle') && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    toggleDeviceDetails(event.target);
  }
});
newCategorySelect.addEventListener("change", function () {
  var wasEditing = (addDeviceBtn === null || addDeviceBtn === void 0 ? void 0 : addDeviceBtn.dataset.mode) === "edit";
  var previousName = newNameInput ? newNameInput.value : "";
  var val = newCategorySelect.value;
  placeWattField(val);
  clearDynamicFields();
  subcategoryFieldDiv.hidden = true;
  newSubcategorySelect.innerHTML = "";
  newSubcategorySelect.disabled = false;
  if (dtapRow) dtapRow.style.display = "";
  if (wattFieldDiv) wattFieldDiv.style.display = "block";
  hideFormSection(batteryFieldsDiv);
  hideFormSection(cameraFieldsDiv);
  hideFormSection(monitorFieldsDiv);
  hideFormSection(viewfinderFieldsDiv);
  hideFormSection(videoFieldsDiv);
  hideFormSection(motorFieldsDiv);
  hideFormSection(controllerFieldsDiv);
  hideFormSection(distanceFieldsDiv);
  if (val === "batteries" || val === "accessories.batteries" || val === "batteryHotswaps") {
    if (wattFieldDiv) wattFieldDiv.style.display = "none";
    showFormSection(batteryFieldsDiv);
    if (dtapRow) dtapRow.style.display = val === "batteryHotswaps" ? "none" : "";
  } else if (val === "cameras") {
    if (wattFieldDiv) wattFieldDiv.style.display = "none";
    showFormSection(cameraFieldsDiv);
  } else if (val === "monitors" || val === "directorMonitors") {
    if (wattFieldDiv) wattFieldDiv.style.display = "none";
    showFormSection(monitorFieldsDiv);
  } else if (val === "viewfinders") {
    if (wattFieldDiv) wattFieldDiv.style.display = "none";
    showFormSection(viewfinderFieldsDiv);
  } else if (val === "video" || val === "wirelessReceivers" || val === "iosVideo") {
    showFormSection(videoFieldsDiv);
  } else if (val === "fiz.motors") {
    showFormSection(motorFieldsDiv);
  } else if (val === "fiz.controllers") {
    showFormSection(controllerFieldsDiv);
  } else if (val === "fiz.distance") {
    showFormSection(distanceFieldsDiv);
  } else if (val === "accessories.cables") {
    var _devices$accessories4;
    if (wattFieldDiv) wattFieldDiv.style.display = "none";
    subcategoryFieldDiv.hidden = false;
    var subcats = Object.keys(((_devices$accessories4 = devices.accessories) === null || _devices$accessories4 === void 0 ? void 0 : _devices$accessories4.cables) || {});
    for (var _i22 = 0, _subcats2 = subcats; _i22 < _subcats2.length; _i22++) {
      var sc = _subcats2[_i22];
      var opt = document.createElement('option');
      opt.value = sc;
      opt.textContent = sc.charAt(0).toUpperCase() + sc.slice(1);
      newSubcategorySelect.appendChild(opt);
    }
    if (newSubcategorySelect.value) {
      buildDynamicFields("accessories.cables.".concat(newSubcategorySelect.value), {}, categoryExcludedAttrs["accessories.cables.".concat(newSubcategorySelect.value)] || []);
    }
  } else {
    buildDynamicFields(val, {}, categoryExcludedAttrs[val] || []);
  }
  newWattInput.value = "";
  newCapacityInput.value = "";
  newPinAInput.value = "";
  newDtapAInput.value = "";
  cameraWattInput.value = "";
  cameraVoltageInput.value = "";
  cameraPortTypeInput.value = "";
  monitorScreenSizeInput.value = "";
  monitorBrightnessInput.value = "";
  monitorWattInput.value = "";
  monitorVoltageInput.value = "";
  monitorPortTypeInput.value = "";
  monitorWirelessTxInput.checked = false;
  monitorLatencyInput.value = "";
  monitorAudioOutputInput.value = "";
  clearMonitorVideoInputs();
  clearMonitorVideoOutputs();
  viewfinderScreenSizeInput.value = "";
  viewfinderBrightnessInput.value = "";
  viewfinderWattInput.value = "";
  viewfinderVoltageInput.value = "";
  viewfinderPortTypeInput.value = "";
  viewfinderWirelessTxInput.checked = false;
  viewfinderLatencyInput.value = "";
  clearViewfinderVideoInputs();
  clearViewfinderVideoOutputs();
  clearBatteryPlates();
  clearRecordingMedia();
  clearLensMounts();
  clearPowerDistribution();
  clearVideoOutputs();
  clearFizConnectors();
  clearViewfinders();
  clearTimecodes();
  videoPowerInput.value = "";
  clearVideoInputs();
  clearVideoOutputsIO();
  videoFrequencyInput.value = "";
  videoLatencyInput.value = "";
  motorConnectorInput.value = "";
  motorInternalInput.checked = false;
  motorTorqueInput.value = "";
  motorGearInput.value = "";
  motorNotesInput.value = "";
  controllerConnectorInput.value = "";
  controllerPowerInput.value = "";
  controllerBatteryInput.value = "";
  controllerConnectivityInput.value = "";
  controllerNotesInput.value = "";
  distanceConnectionInput.value = "";
  distanceMethodInput.value = "";
  distanceRangeInput.value = "";
  distanceAccuracyInput.value = "";
  distanceOutputInput.value = "";
  distanceNotesInput.value = "";
  if (val !== 'accessories.cables') {
    buildDynamicFields(val, {}, categoryExcludedAttrs[val] || []);
  }
  if (newNameInput) {
    if (wasEditing) {
      newNameInput.value = previousName;
    } else {
      newNameInput.value = "";
    }
  }
  var cancelLabel = texts[currentLang].cancelEditBtn;
  if (wasEditing) {
    addDeviceBtn.textContent = texts[currentLang].updateDeviceBtn;
    addDeviceBtn.setAttribute('data-help', texts[currentLang].updateDeviceBtnHelp);
    setButtonLabelWithIcon(cancelEditBtn, cancelLabel, ICON_GLYPHS.circleX);
    cancelEditBtn.setAttribute('data-help', texts[currentLang].cancelEditBtnHelp);
    showFormSection(cancelEditBtn);
  } else {
    addDeviceBtn.textContent = texts[currentLang].addDeviceBtn;
    addDeviceBtn.setAttribute('data-help', texts[currentLang].addDeviceBtnHelp);
    addDeviceBtn.dataset.mode = "add";
    delete addDeviceBtn.dataset.originalName;
    delete addDeviceBtn.dataset.originalSubcategory;
    delete addDeviceBtn.dataset.originalCategory;
    setButtonLabelWithIcon(cancelEditBtn, cancelLabel, ICON_GLYPHS.circleX);
    cancelEditBtn.setAttribute('data-help', texts[currentLang].cancelEditBtnHelp);
    hideFormSection(cancelEditBtn);
  }
});
newSubcategorySelect.addEventListener('change', function () {
  if (newCategorySelect.value === 'accessories.cables') {
    buildDynamicFields("accessories.cables.".concat(newSubcategorySelect.value), {}, categoryExcludedAttrs["accessories.cables.".concat(newSubcategorySelect.value)] || []);
  }
});
function resetDeviceForm() {
  if (addDeviceBtn) {
    addDeviceBtn.dataset.mode = "add";
    delete addDeviceBtn.dataset.originalName;
    delete addDeviceBtn.dataset.originalSubcategory;
    delete addDeviceBtn.dataset.originalCategory;
  }
  if (cancelEditBtn) {
    hideFormSection(cancelEditBtn);
    setButtonLabelWithIcon(cancelEditBtn, texts[currentLang].cancelEditBtn, ICON_GLYPHS.circleX);
    cancelEditBtn.setAttribute('data-help', texts[currentLang].cancelEditBtnHelp);
  }
  if (newCategorySelect.isConnected) {
    try {
      newCategorySelect.dispatchEvent(new Event('change'));
    } catch (err) {
      console.warn('resetDeviceForm dispatch failed', err);
    }
  }
}
addDeviceBtn.addEventListener("click", function () {
  var name = newNameInput.value.trim();
  var category = newCategorySelect.value;
  var isEditing = addDeviceBtn.dataset.mode === "edit";
  var originalName = addDeviceBtn.dataset.originalName;
  var originalCategory = addDeviceBtn.dataset.originalCategory;
  var subcategory = category === "accessories.cables" ? newSubcategorySelect.value : null;
  var originalSubcategory = addDeviceBtn.dataset.originalSubcategory;
  if (!name) {
    alert(texts[currentLang].alertDeviceName);
    return;
  }
  if (category === "accessories.cables" && !subcategory) {
    alert(texts[currentLang].alertDeviceFields);
    return;
  }
  var targetCategory = getCategoryContainer(category, subcategory, {
    create: true
  });
  if (!targetCategory) {
    alert(texts[currentLang].alertDeviceFields);
    return;
  }
  var storedOriginalCategory = originalCategory || category;
  var storedOriginalSubcategory = originalSubcategory || null;
  var originalCollection = isEditing ? getCategoryContainer(storedOriginalCategory, storedOriginalCategory === "accessories.cables" ? storedOriginalSubcategory : null, {
    create: false
  }) : null;
  var originalDeviceData = isEditing && originalCollection ? originalCollection[originalName] : undefined;
  var editingSameCategory = isEditing && storedOriginalCategory === category;
  var editingSamePath = editingSameCategory && (category !== "accessories.cables" || storedOriginalSubcategory === subcategory);
  if (!isEditing && targetCategory[name] !== undefined || isEditing && (name !== originalName || category === "accessories.cables" && subcategory !== originalSubcategory) && targetCategory[name] !== undefined) {
    alert(texts[currentLang].alertDeviceExists);
    return;
  }
  if (category === "batteries" || category === "accessories.batteries" || category === "batteryHotswaps") {
    var capacity = parseFloat(newCapacityInput.value);
    var pinA = parseFloat(newPinAInput.value);
    var dtapA = category === "batteryHotswaps" ? undefined : parseFloat(newDtapAInput.value);
    if (isNaN(capacity) || isNaN(pinA) || capacity <= 0 || pinA <= 0 || category !== "batteryHotswaps" && (isNaN(dtapA) || dtapA < 0)) {
      alert(texts[currentLang].alertDeviceFields);
      return;
    }
    var existing = editingSamePath && originalDeviceData ? _objectSpread({}, originalDeviceData) : {};
    if (category === "batteryHotswaps") {
      targetCategory[name] = _objectSpread(_objectSpread({}, existing), {}, {
        capacity: capacity,
        pinA: pinA
      });
    } else {
      targetCategory[name] = _objectSpread(_objectSpread({}, existing), {}, {
        capacity: capacity,
        pinA: pinA,
        dtapA: dtapA
      });
    }
    Object.assign(targetCategory[name], collectDynamicFieldValues(category, categoryExcludedAttrs[category] || []));
  } else if (category === "accessories.cables") {
    var _existing = isEditing && originalDeviceData ? _objectSpread({}, originalDeviceData) : {};
    var attrs = collectDynamicFieldValues("accessories.cables.".concat(subcategory), categoryExcludedAttrs["accessories.cables.".concat(subcategory)] || []);
    targetCategory[name] = _objectSpread(_objectSpread({}, _existing), attrs);
  } else if (category === "cameras") {
    var watt = parseFloat(cameraWattInput.value);
    if (isNaN(watt) || watt <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    var powerDist, videoOut, fizCon, viewfinder, timecode, plateSupport;
    try {
      powerDist = getPowerDistribution();
      videoOut = getVideoOutputs();
      fizCon = getFizConnectors();
      viewfinder = getViewfinders();
      timecode = getTimecodes();
      plateSupport = getBatteryPlates();
    } catch (e) {
      console.error("Invalid camera JSON input:", e);
      alert(texts[currentLang].alertInvalidCameraJSON);
      return;
    }
    targetCategory[name] = {
      powerDrawWatts: watt,
      power: {
        input: {
          voltageRange: cameraVoltageInput.value,
          type: cameraPortTypeInput.value
        },
        batteryPlateSupport: plateSupport,
        powerDistributionOutputs: powerDist
      },
      videoOutputs: videoOut,
      fizConnectors: fizCon,
      recordingMedia: getRecordingMedia(),
      viewfinder: viewfinder,
      lensMount: getLensMounts(),
      timecode: timecode
    };
    Object.assign(targetCategory[name], collectDynamicFieldValues(category, categoryExcludedAttrs[category] || []));
  } else if (category === "monitors" || category === "directorMonitors") {
    var _watt = parseFloat(monitorWattInput.value);
    if (isNaN(_watt) || _watt <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    var screenSize = parseFloat(monitorScreenSizeInput.value);
    var brightness = parseFloat(monitorBrightnessInput.value);
    targetCategory[name] = {
      screenSizeInches: isNaN(screenSize) ? undefined : screenSize,
      brightnessNits: isNaN(brightness) ? undefined : brightness,
      powerDrawWatts: _watt,
      power: {
        input: {
          voltageRange: monitorVoltageInput.value,
          type: monitorPortTypeInput.value
        },
        output: null
      },
      video: {
        inputs: getMonitorVideoInputs(),
        outputs: getMonitorVideoOutputs()
      },
      wirelessTx: monitorWirelessTxInput.checked,
      latencyMs: monitorWirelessTxInput.checked ? monitorLatencyInput.value : undefined,
      audioOutput: monitorAudioOutputInput.value ? {
        portType: monitorAudioOutputInput.value
      } : undefined
    };
    Object.assign(targetCategory[name], collectDynamicFieldValues(category, categoryExcludedAttrs[category] || []));
  } else if (category === "viewfinders") {
    var _watt2 = parseFloat(viewfinderWattInput.value);
    if (isNaN(_watt2) || _watt2 <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    var _screenSize = parseFloat(viewfinderScreenSizeInput.value);
    var _brightness = parseFloat(viewfinderBrightnessInput.value);
    targetCategory[name] = {
      screenSizeInches: isNaN(_screenSize) ? undefined : _screenSize,
      brightnessNits: isNaN(_brightness) ? undefined : _brightness,
      powerDrawWatts: _watt2,
      power: {
        input: {
          voltageRange: viewfinderVoltageInput.value,
          type: viewfinderPortTypeInput.value
        },
        output: null
      },
      video: {
        inputs: getViewfinderVideoInputs(),
        outputs: getViewfinderVideoOutputs()
      },
      wirelessTx: viewfinderWirelessTxInput.checked,
      latencyMs: viewfinderWirelessTxInput.checked ? viewfinderLatencyInput.value : undefined
    };
    Object.assign(targetCategory[name], collectDynamicFieldValues(category, categoryExcludedAttrs[category] || []));
  } else if (category === "video" || category === "wirelessReceivers" || category === "iosVideo") {
    var _watt3 = parseFloat(newWattInput.value);
    if (isNaN(_watt3) || _watt3 <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    targetCategory[name] = {
      powerDrawWatts: _watt3,
      power: {
        input: {
          type: videoPowerInput.value
        }
      },
      videoInputs: getVideoInputs(),
      videoOutputs: getVideoOutputsIO(),
      frequency: videoFrequencyInput.value,
      latencyMs: videoLatencyInput.value
    };
    Object.assign(targetCategory[name], collectDynamicFieldValues(category, categoryExcludedAttrs[category] || []));
  } else if (category === "fiz.motors") {
    var _watt4 = parseFloat(newWattInput.value);
    if (isNaN(_watt4) || _watt4 <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    targetCategory[name] = {
      powerDrawWatts: _watt4,
      fizConnector: motorConnectorInput.value,
      internalController: motorInternalInput.checked,
      torqueNm: motorTorqueInput.value ? parseFloat(motorTorqueInput.value) : null,
      gearTypes: motorGearInput.value ? motorGearInput.value.split(',').map(function (s) {
        return s.trim();
      }).filter(Boolean) : [],
      notes: motorNotesInput.value
    };
    Object.assign(targetCategory[name], collectDynamicFieldValues(category, categoryExcludedAttrs[category] || []));
  } else if (category === "fiz.controllers") {
    var _watt5 = parseFloat(newWattInput.value);
    if (isNaN(_watt5) || _watt5 <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    targetCategory[name] = {
      powerDrawWatts: _watt5,
      fizConnector: controllerConnectorInput.value,
      powerSource: controllerPowerInput.value,
      batteryType: controllerBatteryInput.value,
      connectivity: controllerConnectivityInput.value,
      notes: controllerNotesInput.value
    };
    Object.assign(targetCategory[name], collectDynamicFieldValues(category, categoryExcludedAttrs[category] || []));
  } else if (category === "fiz.distance") {
    var _watt6 = parseFloat(newWattInput.value);
    if (isNaN(_watt6) || _watt6 <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    targetCategory[name] = {
      powerDrawWatts: _watt6,
      connectionCompatibility: distanceConnectionInput.value,
      measurementMethod: distanceMethodInput.value,
      measurementRange: distanceRangeInput.value,
      accuracy: distanceAccuracyInput.value,
      outputDisplay: distanceOutputInput.value,
      notes: distanceNotesInput.value
    };
    Object.assign(targetCategory[name], collectDynamicFieldValues(category, categoryExcludedAttrs[category] || []));
  } else {
    var _watt7 = parseFloat(newWattInput.value);
    if (isNaN(_watt7) || _watt7 <= 0) {
      alert(texts[currentLang].alertDeviceWatt);
      return;
    }
    var _existing2 = editingSamePath && originalDeviceData ? _objectSpread({}, originalDeviceData) : {};
    var _attrs = collectDynamicFieldValues(category, categoryExcludedAttrs[category] || []);
    targetCategory[name] = _objectSpread(_objectSpread(_objectSpread({}, _existing2), _attrs), {}, {
      powerDrawWatts: _watt7
    });
  }
  if (isEditing) {
    removeOriginalDeviceEntry(storedOriginalCategory, storedOriginalSubcategory, originalName, category, subcategory, name);
    addDeviceBtn.dataset.originalCategory = category;
    if (category === "accessories.cables" && subcategory) {
      addDeviceBtn.dataset.originalSubcategory = subcategory;
    } else {
      delete addDeviceBtn.dataset.originalSubcategory;
    }
    addDeviceBtn.dataset.originalName = name;
  }
  resetDeviceForm();
  storeDevices(devices);
  viewfinderTypeOptions = getAllViewfinderTypes();
  viewfinderConnectorOptions = getAllViewfinderConnectors();
  updatePlateTypeOptions();
  updatePowerPortOptions();
  updatePowerDistTypeOptions();
  updatePowerDistVoltageOptions();
  updatePowerDistCurrentOptions();
  updateRecordingMediaOptions();
  updateTimecodeTypeOptions();
  refreshDeviceLists();
  populateSelect(cameraSelect, devices.cameras, true);
  populateMonitorSelect();
  populateSelect(videoSelect, devices.video, true);
  motorSelects.forEach(function (sel) {
    return populateSelect(sel, devices.fiz.motors, true);
  });
  controllerSelects.forEach(function (sel) {
    return populateSelect(sel, devices.fiz.controllers, true);
  });
  populateSelect(distanceSelect, devices.fiz.distance, true);
  populateSelect(batterySelect, devices.batteries, true);
  updateFizConnectorOptions();
  applyFilters();
  updateCalculations();
  var categoryKey = category.replace(".", "_");
  var categoryDisplay = texts[currentLang]["category_" + categoryKey] || category;
  if (isEditing) {
    alert(texts[currentLang].alertDeviceUpdated.replace("{name}", name).replace("{category}", categoryDisplay));
  } else {
    alert(texts[currentLang].alertDeviceAdded.replace("{name}", name).replace("{category}", categoryDisplay));
  }
});
cancelEditBtn.addEventListener("click", function () {
  resetDeviceForm();
});
exportBtn.addEventListener("click", function () {
  var dataStr = JSON.stringify(devices, null, 2);
  exportOutput.style.display = "block";
  exportOutput.value = dataStr;
  var blob = new Blob([dataStr], {
    type: "application/json"
  });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = "device_data_export.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});
var exportAndRevertBtn = document.getElementById('exportAndRevertBtn');
if (exportAndRevertBtn) {
  exportAndRevertBtn.addEventListener('click', function () {
    if (confirm(texts[currentLang].confirmExportAndRevert)) {
      var dataStr = JSON.stringify(devices, null, 2);
      var blob = new Blob([dataStr], {
        type: "application/json"
      });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "device_data_backup_before_revert.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      var revertTimer = setTimeout(function () {
        localStorage.removeItem('cameraPowerPlanner_devices');
        alert(texts[currentLang].alertExportAndRevertSuccess);
        location.reload();
      }, 500);
      if (typeof revertTimer.unref === 'function') {
        revertTimer.unref();
      }
    }
  });
}
importDataBtn.addEventListener("click", function () {
  importFileInput.click();
});
importFileInput.addEventListener("change", function (event) {
  var file = event.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function (e) {
    try {
      var importedData = JSON.parse(e.target.result);
      var result = parseDeviceDatabaseImport(importedData);
      if (!result.devices) {
        var summary = formatDeviceImportErrors(result.errors);
        console.error('Device import validation failed:', result.errors);
        alert(summary ? "".concat(texts[currentLang].alertImportError, "\n").concat(summary) : texts[currentLang].alertImportError);
        return;
      }
      devices = result.devices;
      unifyDevices(devices);
      storeDevices(devices);
      viewfinderTypeOptions = getAllViewfinderTypes();
      viewfinderConnectorOptions = getAllViewfinderConnectors();
      refreshDeviceLists();
      populateSelect(cameraSelect, devices.cameras, true);
      populateMonitorSelect();
      populateSelect(videoSelect, devices.video, true);
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
      applyFilters();
      updateCalculations();
      var deviceCount = countDeviceDatabaseEntries(devices);
      alert(texts[currentLang].alertImportSuccess.replace("{num_devices}", deviceCount));
      exportOutput.style.display = "block";
      exportOutput.value = JSON.stringify(devices, null, 2);
    } catch (error) {
      console.error("Error parsing or importing data:", error);
      var errorMessage = error && error.message ? error.message : String(error);
      var _summary = formatDeviceImportErrors([errorMessage]);
      alert(_summary ? "".concat(texts[currentLang].alertImportError, "\n").concat(_summary) : texts[currentLang].alertImportError);
    }
  };
  reader.readAsText(file);
  event.target.value = '';
});
generateOverviewBtn.addEventListener('click', function () {
  if (!setupSelect.value) {
    alert(texts[currentLang].alertSelectSetupForOverview);
    return;
  }
  generatePrintableOverview();
});
function batteryPinsSufficient() {
  var batt = batterySelect && batterySelect.value;
  if (!batt || batt === 'None' || !devices.batteries[batt]) return true;
  var battData = devices.batteries[batt];
  var totalCurrentLow = parseFloat(totalCurrent12Elem.textContent);
  if (!isFinite(totalCurrentLow)) return true;
  return totalCurrentLow <= battData.pinA;
}
function alertPinExceeded() {
  var batt = batterySelect && batterySelect.value;
  if (!batt || batt === 'None' || !devices.batteries[batt]) return;
  var battData = devices.batteries[batt];
  var totalCurrentLow = parseFloat(totalCurrent12Elem.textContent);
  alert(texts[currentLang].warnPinExceeded.replace('{current}', totalCurrentLow.toFixed(2)).replace('{max}', battData.pinA));
}
generateGearListBtn.addEventListener('click', function () {
  if (!setupSelect.value) {
    alert(texts[currentLang].alertSelectSetupForOverview);
    return;
  }
  if (!batteryPinsSufficient()) {
    alertPinExceeded();
    return;
  }
  populateRecordingResolutionDropdown(currentProjectInfo && currentProjectInfo.recordingResolution);
  populateSensorModeDropdown(currentProjectInfo && currentProjectInfo.sensorMode);
  populateCodecDropdown(currentProjectInfo && currentProjectInfo.codec);
  openDialog(projectDialog);
});
if (projectCancelBtn) {
  projectCancelBtn.addEventListener('click', function () {
    closeDialog(projectDialog);
  });
}
if (projectDialogCloseBtn) {
  projectDialogCloseBtn.addEventListener('click', function () {
    if (projectCancelBtn) {
      projectCancelBtn.click();
    } else {
      closeDialog(projectDialog);
    }
  });
}
if (projectForm) {
  projectForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!batteryPinsSufficient()) {
      alertPinExceeded();
      return;
    }
    var info = collectProjectFormData();
    currentProjectInfo = info;
    ensureZoomRemoteSetup(info);
    var html = generateGearListHtml(info);
    displayGearAndRequirements(html);
    ensureGearListActions();
    bindGearListCageListener();
    bindGearListEasyrigListener();
    bindGearListSliderBowlListener();
    bindGearListEyeLeatherListener();
    bindGearListProGaffTapeListener();
    bindGearListDirectorMonitorListener();
    saveCurrentSession();
    scheduleProjectAutoSave(true);
    closeDialog(projectDialog);
  });
}
function downloadSharedProject(shareFileName, includeAutoGear) {
  if (!shareFileName) return;
  var setupName = getCurrentProjectName();
  var currentSetup = {
    setupName: setupName,
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
    batteryHotswap: hotswapSelect.value
  };
  if (currentProjectInfo) {
    currentSetup.projectInfo = currentProjectInfo;
  } else {
    var project = typeof loadProject === 'function' ? loadProject(setupName) : null;
    if (project && project.projectInfo) {
      currentSetup.projectInfo = project.projectInfo;
    }
  }
  var gearSelectors = getGearListSelectors();
  if (Object.keys(gearSelectors).length) {
    currentSetup.gearSelectors = gearSelectors;
  }
  var combinedHtml = getCurrentGearListHtml();
  if (combinedHtml) {
    var _splitGearListHtml2 = splitGearListHtml(combinedHtml),
      projectHtml = _splitGearListHtml2.projectHtml,
      gearHtml = _splitGearListHtml2.gearHtml;
    if (projectHtml) currentSetup.projectHtml = projectHtml;
    if (gearHtml) {
      currentSetup.gearList = projectHtml ? gearHtml.replace(/<h2[^>]*>.*?<\/h2>/, '') : gearHtml;
    }
  }
  var deviceChanges = getDeviceChanges();
  if (Object.keys(deviceChanges).length) {
    currentSetup.changedDevices = deviceChanges;
  }
  var key = getCurrentSetupKey();
  var feedback = loadFeedbackSafe()[key] || [];
  if (feedback.length) {
    currentSetup.feedback = feedback;
  }
  var rulesForShare = getAutoGearRules();
  var hasAutoGearRules = Array.isArray(rulesForShare) && rulesForShare.length > 0;
  if (includeAutoGear && hasAutoGearRules) {
    currentSetup.autoGearRules = rulesForShare;
  }
  var json = JSON.stringify(currentSetup, null, 2);
  var blob = new Blob([json], {
    type: 'application/json'
  });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = shareFileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  if (shareIncludeAutoGearCheckbox) {
    shareIncludeAutoGearCheckbox.checked = includeAutoGear && hasAutoGearRules;
  }
  if (shareLinkMessage) {
    shareLinkMessage.textContent = texts[currentLang].shareLinkCopied;
    setStatusLevel(shareLinkMessage, 'success');
    shareLinkMessage.classList.remove('hidden');
    setTimeout(function () {
      return shareLinkMessage.classList.add('hidden');
    }, 4000);
  }
}
shareSetupBtn.addEventListener('click', function () {
  saveCurrentGearList();
  var setupName = getCurrentProjectName();
  var defaultName = getDefaultShareFilename(setupName);
  var defaultFilename = ensureJsonExtension(defaultName);
  if (!shareDialog || !shareForm || !shareFilenameInput) {
    var shareFileName = promptForSharedFilename(setupName);
    if (!shareFileName) {
      return;
    }
    var _rulesForShare = getAutoGearRules();
    var _hasAutoGearRules = Array.isArray(_rulesForShare) && _rulesForShare.length > 0;
    var includeAutoGear = _hasAutoGearRules ? confirmAutoGearSelection(shareIncludeAutoGearCheckbox ? shareIncludeAutoGearCheckbox.checked : false) : false;
    if (shareIncludeAutoGearCheckbox) {
      shareIncludeAutoGearCheckbox.checked = includeAutoGear && _hasAutoGearRules;
    }
    downloadSharedProject(shareFileName, includeAutoGear);
    return;
  }
  shareFilenameInput.value = defaultFilename;
  shareFilenameInput.setCustomValidity('');
  if (shareFilenameMessage) {
    var template = getLocalizedText('shareFilenamePrompt') || '';
    shareFilenameMessage.textContent = template.includes('{defaultName}') ? template.replace('{defaultName}', defaultName) : template;
  }
  var rulesForShare = getAutoGearRules();
  var hasAutoGearRules = Array.isArray(rulesForShare) && rulesForShare.length > 0;
  if (shareIncludeAutoGearCheckbox) {
    shareIncludeAutoGearCheckbox.disabled = !hasAutoGearRules;
    shareIncludeAutoGearCheckbox.setAttribute('aria-disabled', hasAutoGearRules ? 'false' : 'true');
    if (!hasAutoGearRules) {
      shareIncludeAutoGearCheckbox.checked = false;
    }
  }
  if (shareIncludeAutoGearLabelElem) {
    shareIncludeAutoGearLabelElem.classList.toggle('disabled', !hasAutoGearRules);
    shareIncludeAutoGearLabelElem.setAttribute('aria-disabled', !hasAutoGearRules ? 'true' : 'false');
  }
  openDialog(shareDialog);
  if (typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(function () {
      if (shareFilenameInput) {
        shareFilenameInput.focus();
        shareFilenameInput.select();
      }
    });
  } else if (shareFilenameInput) {
    setTimeout(function () {
      shareFilenameInput.focus();
      shareFilenameInput.select();
    }, 0);
  }
});
if (shareForm) {
  shareForm.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!shareFilenameInput) return;
    var sanitized = sanitizeShareFilename(shareFilenameInput.value);
    if (!sanitized) {
      var invalidMessage = getLocalizedText('shareFilenameInvalid') || 'Please enter a valid file name to continue.';
      shareFilenameInput.setCustomValidity(invalidMessage);
      shareFilenameInput.reportValidity();
      return;
    }
    shareFilenameInput.setCustomValidity('');
    var shareFileName = ensureJsonExtension(sanitized);
    var includeAutoGear = !!(shareIncludeAutoGearCheckbox && !shareIncludeAutoGearCheckbox.disabled && shareIncludeAutoGearCheckbox.checked);
    closeDialog(shareDialog);
    downloadSharedProject(shareFileName, includeAutoGear);
  });
}
if (shareCancelBtn) {
  shareCancelBtn.addEventListener('click', function () {
    if (shareFilenameInput) {
      shareFilenameInput.setCustomValidity('');
    }
    closeDialog(shareDialog);
  });
}
if (shareDialog) {
  shareDialog.addEventListener('cancel', function (event) {
    event.preventDefault();
    if (shareFilenameInput) {
      shareFilenameInput.setCustomValidity('');
    }
    closeDialog(shareDialog);
  });
}
if (sharedLinkInput) {
  sharedLinkInput.addEventListener('change', function () {
    if (pendingSharedLinkListener) return;
    var file = sharedLinkInput.files && sharedLinkInput.files[0];
    if (file) {
      readSharedProjectFile(file);
    }
  });
}
if (applySharedLinkBtn && sharedLinkInput) {
  applySharedLinkBtn.addEventListener('click', function () {
    if (pendingSharedLinkListener) {
      sharedLinkInput.removeEventListener('change', pendingSharedLinkListener);
      pendingSharedLinkListener = null;
    }
    var _handleSelection = function handleSelection() {
      sharedLinkInput.removeEventListener('change', _handleSelection);
      pendingSharedLinkListener = null;
      var file = sharedLinkInput.files && sharedLinkInput.files[0];
      if (file) {
        readSharedProjectFile(file);
      }
    };
    pendingSharedLinkListener = _handleSelection;
    sharedLinkInput.addEventListener('change', _handleSelection);
    sharedLinkInput.value = '';
    sharedLinkInput.click();
    if (sharedLinkInput.files && sharedLinkInput.files.length) {
      _handleSelection();
    }
  });
}
if (sharedImportModeSelect) {
  sharedImportModeSelect.addEventListener('change', function () {
    if (sharedImportPromptActive) return;
    if (lastSharedSetupData === null) return;
    reapplySharedImportSelection();
  });
}
if (sharedImportForm) {
  sharedImportForm.addEventListener('submit', function (event) {
    event.preventDefault();
    finalizeSharedImportPrompt();
    applyStoredSharedImport();
  });
}
if (sharedImportCancelBtn) {
  sharedImportCancelBtn.addEventListener('click', function () {
    finalizeSharedImportPrompt();
    clearStoredSharedImportData();
  });
}
if (sharedImportDialog) {
  sharedImportDialog.addEventListener('cancel', function (event) {
    event.preventDefault();
    finalizeSharedImportPrompt();
    clearStoredSharedImportData();
  });
}
if (runtimeFeedbackBtn && feedbackDialog && feedbackForm) {
  runtimeFeedbackBtn.addEventListener('click', function () {
    var _devices11, _cam$resolutions, _cam$recordingCodecs;
    var today = new Date().toISOString().split('T')[0];
    var motVals = motorSelects.map(function (sel) {
      return sel.value;
    }).filter(function (v) {
      return v && v !== 'None';
    });
    var ctrlVals = controllerSelects.map(function (sel) {
      return sel.value;
    }).filter(function (v) {
      return v && v !== 'None';
    });
    document.getElementById('fbDate').value = today;
    document.getElementById('fbCamera').value = cameraSelect.value || '';
    document.getElementById('fbBatteryPlate').value = getSelectedPlate() || '';
    document.getElementById('fbBattery').value = batterySelect.value || '';
    document.getElementById('fbWirelessVideo').value = videoSelect.value || '';
    document.getElementById('fbMonitor').value = monitorSelect.value || '';
    var cam = (_devices11 = devices) === null || _devices11 === void 0 || (_devices11 = _devices11.cameras) === null || _devices11 === void 0 ? void 0 : _devices11[cameraSelect.value];
    document.getElementById('fbResolution').value = (cam === null || cam === void 0 || (_cam$resolutions = cam.resolutions) === null || _cam$resolutions === void 0 ? void 0 : _cam$resolutions[0]) || '';
    document.getElementById('fbCodec').value = (cam === null || cam === void 0 || (_cam$recordingCodecs = cam.recordingCodecs) === null || _cam$recordingCodecs === void 0 ? void 0 : _cam$recordingCodecs[0]) || '';
    document.getElementById('fbControllers').value = ctrlVals.join(', ');
    document.getElementById('fbMotors').value = motVals.join(', ');
    var fbDistance = document.getElementById('fbDistance');
    if (fbDistance && distanceSelect) {
      fbDistance.innerHTML = distanceSelect.innerHTML;
      fbDistance.value = distanceSelect.value || '';
    }
    openDialog(feedbackDialog);
  });
  feedbackCancelBtn.addEventListener('click', function () {
    closeDialog(feedbackDialog);
  });
  if (feedbackUseLocationBtn) {
    feedbackUseLocationBtn.addEventListener('click', function () {
      var locationInput = document.getElementById('fbLocation');
      if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
        return;
      }
      feedbackUseLocationBtn.disabled = true;
      navigator.geolocation.getCurrentPosition(function (pos) {
        var _pos$coords = pos.coords,
          latitude = _pos$coords.latitude,
          longitude = _pos$coords.longitude;
        locationInput.value = "".concat(latitude.toFixed(5), ", ").concat(longitude.toFixed(5));
        feedbackUseLocationBtn.disabled = false;
      }, function () {
        feedbackUseLocationBtn.disabled = false;
        alert('Unable to retrieve your location');
      });
    });
  }
  feedbackForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var entry = {
      username: document.getElementById('fbUsername').value.trim(),
      date: document.getElementById('fbDate').value,
      location: document.getElementById('fbLocation').value.trim(),
      camera: document.getElementById('fbCamera').value.trim(),
      batteryPlate: document.getElementById('fbBatteryPlate').value.trim(),
      lensMount: document.getElementById('fbLensMount').value.trim(),
      resolution: document.getElementById('fbResolution').value.trim(),
      codec: document.getElementById('fbCodec').value.trim(),
      framerate: document.getElementById('fbFramerate').value.trim(),
      cameraWifi: document.getElementById('fbWifi').value,
      firmware: document.getElementById('fbFirmware').value.trim(),
      battery: document.getElementById('fbBattery').value.trim(),
      batteryAge: document.getElementById('fbBatteryAge').value.trim(),
      wirelessVideo: document.getElementById('fbWirelessVideo').value.trim(),
      monitor: document.getElementById('fbMonitor').value.trim(),
      monitorBrightness: document.getElementById('fbMonitorBrightness').value.trim(),
      lens: document.getElementById('fbLens').value.trim(),
      lensData: document.getElementById('fbLensData').value.trim(),
      controllers: document.getElementById('fbControllers').value.trim(),
      motors: document.getElementById('fbMotors').value.trim(),
      distance: document.getElementById('fbDistance').value.trim(),
      temperature: document.getElementById('fbTemperature').value.trim(),
      charging: document.getElementById('fbCharging').value.trim(),
      runtime: document.getElementById('fbRuntime').value.trim(),
      batteriesPerDay: document.getElementById('fbBatteriesPerDay').value.trim()
    };
    var key = getCurrentSetupKey();
    var feedback = loadFeedbackSafe();
    if (!feedback[key]) feedback[key] = [];
    feedback[key].push(entry);
    saveFeedbackSafe(feedback);
    var lines = [];
    Object.entries(entry).forEach(function (_ref58) {
      var _ref59 = _slicedToArray(_ref58, 2),
        k = _ref59[0],
        v = _ref59[1];
      lines.push("".concat(k, ": ").concat(v));
    });
    var subject = encodeURIComponent('Cine Power Planner Runtime Feedback');
    var body = encodeURIComponent(lines.join('\n'));
    window.location.href = "mailto:info@lucazanner.de?subject=".concat(subject, "&body=").concat(body);
    closeDialog(feedbackDialog);
    updateCalculations();
  });
}
function summarizeByType(list) {
  if (!Array.isArray(list)) return {};
  return list.reduce(function (counts, it) {
    if (it !== null && it !== void 0 && it.type) {
      counts[it.type] = (counts[it.type] || 0) + 1;
    }
    return counts;
  }, {});
}
function iconMarkup(glyph) {
  var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'info-icon';
  if (!glyph) return '';
  var resolved = resolveIconGlyph(glyph);
  var classes = ['icon-glyph'];
  if (className) classes.unshift(className);
  if (resolved.markup) {
    if (resolved.className) classes.push(resolved.className);
    var markup = ensureSvgHasAriaHidden(resolved.markup);
    return "<span class=\"".concat(classes.join(' '), "\" aria-hidden=\"true\">").concat(markup, "</span>");
  }
  var char = resolved.char || '';
  if (!char) return '';
  return "<span class=\"".concat(classes.join(' '), "\" data-icon-font=\"").concat(resolved.font, "\" aria-hidden=\"true\">").concat(char, "</span>");
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
function connectorBlocks(items, icon) {
  var cls = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'neutral-conn';
  var label = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var dir = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
  if (!Array.isArray(items) || items.length === 0) return '';
  var counts = summarizeByType(items);
  var entries = Object.entries(counts).map(function (_ref60) {
    var _ref61 = _slicedToArray(_ref60, 2),
      type = _ref61[0],
      count = _ref61[1];
    return "".concat(escapeHtml(type)).concat(count > 1 ? " \xD7".concat(count) : '');
  });
  if (!entries.length) return '';
  var prefix = label ? "".concat(label).concat(dir ? " ".concat(dir) : '', ": ") : '';
  var iconHtml = iconMarkup(icon, 'connector-icon');
  return "<span class=\"connector-block ".concat(cls, "\">").concat(iconHtml).concat(prefix).concat(entries.join(', '), "</span>");
}
function generateConnectorSummary(device) {
  var _device$power, _device$video, _device$video2, _device$audioInput, _device$audioOutput, _device$audioIo, _device$power2, _device$power3;
  if (!device || _typeof(device) !== 'object') return '';
  var portHtml = '';
  var connectors = [{
    items: (_device$power = device.power) === null || _device$power === void 0 ? void 0 : _device$power.powerDistributionOutputs,
    icon: ICON_GLYPHS.bolt,
    cls: 'power-conn',
    label: 'Power',
    dir: 'Out'
  }, {
    items: powerInputTypes(device).map(function (t) {
      return {
        type: t
      };
    }),
    icon: ICON_GLYPHS.plug,
    cls: 'power-conn',
    label: 'Power',
    dir: 'In'
  }, {
    items: device.fizConnectors,
    icon: ICON_GLYPHS.gears,
    cls: 'fiz-conn',
    label: 'FIZ Port'
  }, {
    items: ((_device$video = device.video) === null || _device$video === void 0 ? void 0 : _device$video.inputs) || device.videoInputs,
    icon: ICON_GLYPHS.screen,
    cls: 'video-conn',
    label: 'Video',
    dir: 'In'
  }, {
    items: ((_device$video2 = device.video) === null || _device$video2 === void 0 ? void 0 : _device$video2.outputs) || device.videoOutputs,
    icon: ICON_GLYPHS.screen,
    cls: 'video-conn',
    label: 'Video',
    dir: 'Out'
  }, {
    items: device.timecode,
    icon: ICON_GLYPHS.timecode,
    cls: 'neutral-conn',
    label: 'Timecode'
  }, {
    items: (_device$audioInput = device.audioInput) !== null && _device$audioInput !== void 0 && _device$audioInput.portType ? [{
      type: device.audioInput.portType
    }] : undefined,
    icon: ICON_GLYPHS.audioIn,
    cls: 'neutral-conn',
    label: 'Audio',
    dir: 'In'
  }, {
    items: (_device$audioOutput = device.audioOutput) !== null && _device$audioOutput !== void 0 && _device$audioOutput.portType ? [{
      type: device.audioOutput.portType
    }] : undefined,
    icon: ICON_GLYPHS.audioOut,
    cls: 'neutral-conn',
    label: 'Audio',
    dir: 'Out'
  }, {
    items: (_device$audioIo = device.audioIo) !== null && _device$audioIo !== void 0 && _device$audioIo.portType ? [{
      type: device.audioIo.portType
    }] : undefined,
    icon: ICON_GLYPHS.sliders,
    cls: 'neutral-conn',
    label: 'Audio',
    dir: 'I/O'
  }];
  for (var _i23 = 0, _connectors = connectors; _i23 < _connectors.length; _i23++) {
    var _connectors$_i = _connectors[_i23],
      items = _connectors$_i.items,
      icon = _connectors$_i.icon,
      cls = _connectors$_i.cls,
      label = _connectors$_i.label,
      dir = _connectors$_i.dir;
    portHtml += connectorBlocks(items, icon, cls, label, dir);
  }
  var specHtml = '';
  if (typeof device.powerDrawWatts === 'number') {
    specHtml += "<span class=\"info-box power-conn\">".concat(iconMarkup(ICON_GLYPHS.bolt), "Power: ").concat(device.powerDrawWatts, " W</span>");
  }
  if ((_device$power2 = device.power) !== null && _device$power2 !== void 0 && (_device$power2 = _device$power2.input) !== null && _device$power2 !== void 0 && _device$power2.voltageRange) {
    specHtml += "<span class=\"info-box power-conn\">".concat(iconMarkup(ICON_GLYPHS.batteryBolt), "Voltage: ").concat(escapeHtml(String(device.power.input.voltageRange)), "V</span>");
  }
  if (typeof device.capacity === 'number') {
    specHtml += "<span class=\"info-box power-conn\">".concat(iconMarkup(ICON_GLYPHS.batteryFull), "Capacity: ").concat(device.capacity, " Wh</span>");
  }
  if (typeof device.pinA === 'number') {
    specHtml += "<span class=\"info-box power-conn\">Pins: ".concat(device.pinA, "A</span>");
  }
  if (typeof device.dtapA === 'number') {
    specHtml += "<span class=\"info-box power-conn\">D-Tap: ".concat(device.dtapA, "A</span>");
  }
  if (device.mount_type) {
    specHtml += "<span class=\"info-box power-conn\">Mount: ".concat(escapeHtml(String(device.mount_type)), "</span>");
  }
  if (typeof device.screenSizeInches === 'number') {
    specHtml += "<span class=\"info-box video-conn\">".concat(iconMarkup(ICON_GLYPHS.screen), "Screen: ").concat(device.screenSizeInches, "\"</span>");
  }
  if (typeof device.brightnessNits === 'number') {
    specHtml += "<span class=\"info-box video-conn\">".concat(iconMarkup(ICON_GLYPHS.brightness), "Brightness: ").concat(device.brightnessNits, " nits</span>");
  }
  if (typeof device.wirelessTx === 'boolean') {
    specHtml += "<span class=\"info-box video-conn\">".concat(iconMarkup(ICON_GLYPHS.wifi), "Wireless: ").concat(device.wirelessTx, "</span>");
  }
  if (device.internalController) {
    specHtml += "<span class=\"info-box fiz-conn\">".concat(iconMarkup(ICON_GLYPHS.controller), "Controller: Internal</span>");
  }
  if (typeof device.torqueNm === 'number') {
    specHtml += "<span class=\"info-box fiz-conn\">".concat(iconMarkup(ICON_GLYPHS.gears), "Torque: ").concat(device.torqueNm, " Nm</span>");
  }
  if (device.powerSource) {
    specHtml += "<span class=\"info-box power-conn\">".concat(iconMarkup(ICON_GLYPHS.plug), "Power Source: ").concat(escapeHtml(String(device.powerSource)), "</span>");
  }
  var extraHtml = '';
  if (Array.isArray((_device$power3 = device.power) === null || _device$power3 === void 0 ? void 0 : _device$power3.batteryPlateSupport) && device.power.batteryPlateSupport.length) {
    var types = device.power.batteryPlateSupport.map(function (p) {
      var mount = p.mount ? " (".concat(escapeHtml(p.mount), ")") : '';
      return "".concat(escapeHtml(p.type)).concat(mount);
    });
    extraHtml += "<span class=\"info-box power-conn\">Battery Plate: ".concat(types.join(', '), "</span>");
  }
  if (Array.isArray(device.recordingMedia) && device.recordingMedia.length) {
    var _types = device.recordingMedia.map(function (m) {
      return escapeHtml(m.type);
    });
    extraHtml += "<span class=\"info-box video-conn\">Media: ".concat(_types.join(', '), "</span>");
  }
  if (Array.isArray(device.viewfinder) && device.viewfinder.length) {
    var _types2 = device.viewfinder.map(function (v) {
      return escapeHtml(v.type);
    });
    extraHtml += "<span class=\"info-box video-conn\">Viewfinder: ".concat(_types2.join(', '), "</span>");
  }
  if (Array.isArray(device.gearTypes) && device.gearTypes.length) {
    var _types3 = device.gearTypes.map(function (g) {
      return escapeHtml(g);
    });
    extraHtml += "<span class=\"info-box fiz-conn\">Gear: ".concat(_types3.join(', '), "</span>");
  }
  if (device.connectivity) {
    extraHtml += "<span class=\"info-box video-conn\">Connectivity: ".concat(escapeHtml(String(device.connectivity)), "</span>");
  }
  if (device.notes) {
    extraHtml += "<span class=\"info-box neutral-conn\">Notes: ".concat(escapeHtml(String(device.notes)), "</span>");
  }
  var lensHtml = '';
  if (Array.isArray(device.lensMount)) {
    var boxes = device.lensMount.map(function (lm) {
      var mount = lm.mount ? " (".concat(escapeHtml(lm.mount), ")") : '';
      return "<span class=\"info-box neutral-conn\">".concat(escapeHtml(lm.type)).concat(mount, "</span>");
    }).join('');
    if (boxes) lensHtml = "<div class=\"lens-mount-box\">".concat(boxes, "</div>");
  }
  var html = '';
  var section = function section(label, content) {
    if (!content) return '';
    return "<div class=\"info-label\">".concat(label, "</div>").concat(content);
  };
  html += section('Ports', portHtml);
  html += section('Specs', specHtml);
  html += section('Extras', extraHtml);
  if (lensHtml) html += "<div class=\"info-label\">Lens Mount</div>".concat(lensHtml);
  return html ? "<div class=\"connector-summary\">".concat(html, "</div>") : '';
}
function suggestChargerCounts(total) {
  var quad = Math.floor(total / 4);
  var remainder = total % 4;
  var dual = 0;
  var single = 0;
  if (remainder === 0) {} else if (remainder === 3) {
    quad += 1;
  } else if (remainder > 0) {
    dual += 1;
  }
  return {
    quad: quad,
    dual: dual,
    single: single
  };
}
function addArriKNumber(name) {
  if (!name) return name;
  var d = typeof devices !== 'undefined' ? devices : {};
  var collections = [d.viewfinders, d.directorMonitors, d.iosVideo, d.videoAssist, d.media, d.lenses];
  for (var _i24 = 0, _collections = collections; _i24 < _collections.length; _i24++) {
    var col = _collections[_i24];
    if (col && col[name]) {
      var item = col[name];
      if (item.brand && item.brand.toUpperCase().includes('ARRI') && item.kNumber && !name.includes(item.kNumber)) {
        return name.replace(/^ARRI\s*/i, "ARRI ".concat(item.kNumber, " "));
      }
      return name;
    }
  }
  if (d.accessories) {
    var _findItem = function findItem(obj) {
      if (!obj) return null;
      if (obj[name]) return obj[name];
      for (var _i25 = 0, _Object$values2 = Object.values(obj); _i25 < _Object$values2.length; _i25++) {
        var val = _Object$values2[_i25];
        if (val && _typeof(val) === 'object') {
          var found = _findItem(val);
          if (found) return found;
        }
      }
      return null;
    };
    for (var _i26 = 0, _Object$values3 = Object.values(d.accessories); _i26 < _Object$values3.length; _i26++) {
      var _col = _Object$values3[_i26];
      var _item = _findItem(_col);
      if (_item) {
        if (_item.brand && _item.brand.toUpperCase().includes('ARRI') && _item.kNumber && !name.includes(_item.kNumber)) {
          return /^ARRI\s*/i.test(name) ? name.replace(/^ARRI\s*/i, "ARRI ".concat(_item.kNumber, " ")) : "ARRI ".concat(_item.kNumber, " ").concat(name);
        }
        return name;
      }
    }
  }
  return name;
}
var sanitizeFizContext = function sanitizeFizContext(context) {
  return (context || '').replace(/[()]/g, '').replace(/\s{2,}/g, ' ').trim();
};
var formatFizCable = function formatFizCable(name, context) {
  var cleaned = sanitizeFizContext(context);
  return cleaned ? "".concat(name, " (").concat(cleaned, ")") : name;
};
function suggestArriFizCables() {
  var CABLE_LBUS_05 = 'LBUS to LBUS 0,5m';
  var CABLE_UDM_SERIAL_4P = 'Cable UDM – SERIAL (4p) 0,5m';
  var CABLE_UDM_SERIAL_7P = 'Cable UDM – SERIAL (7p) 1,5m';
  var cables = [];
  var lbusLengths = [];
  var camSpare = [];
  var camera = (cameraSelect === null || cameraSelect === void 0 ? void 0 : cameraSelect.value) || '';
  var motors = motorSelects.map(function (sel) {
    return sel.value;
  }).filter(function (v) {
    return v && v !== 'None';
  });
  var controllers = controllerSelects.map(function (sel) {
    return sel.value;
  }).filter(function (v) {
    return v && v !== 'None';
  });
  var distance = (distanceSelect === null || distanceSelect === void 0 ? void 0 : distanceSelect.value) || '';
  var motor = motors[0] || '';
  var hasMasterGrip = controllers.includes('Arri Master Grip (single unit)');
  var hasRIA = controllers.includes('Arri RIA-1');
  var hasUDM = distance.includes('UDM');
  var hasLCube = distance.includes('LCube');
  if (hasLCube && (hasRIA || camera === 'Arri Alexa 35')) hasLCube = false;
  var isCforceMiniRF = /cforce mini rf/i.test(motor);
  var isCforceMini = /cforce mini/i.test(motor) && !isCforceMiniRF;
  var motorContext = motor ? "for ".concat(motor) : 'for FIZ motor';
  var masterGripContext = 'for Arri Master Grip (single unit)';
  var distanceContext = distance ? "for ".concat(distance) : 'for distance sensor';
  var controllersToCheck = [];
  if (hasRIA) controllersToCheck.push('Arri RIA-1');
  if (isCforceMiniRF) controllersToCheck.push('Arri cforce mini RF');
  var primaryController = controllersToCheck[0] || controllers[0] || '';
  var pushLbus = function pushLbus(len, contextOverride) {
    var formatted = String(len).replace('.', ',');
    var ctx = contextOverride || motorContext;
    cables.push(formatFizCable("LBUS to LBUS ".concat(formatted, "m"), ctx));
    lbusLengths.push(Number(len));
  };
  if ((camera === 'Arri Alexa Mini' || camera === 'Arri Alexa Mini LF') && isCforceMini) {
    pushLbus(0.3);
    if (hasLCube) pushLbus(0.4, distanceContext);
    if (hasMasterGrip) pushLbus(0.5, masterGripContext);
  } else if (camera === 'Arri Alexa 35' && isCforceMini) {
    pushLbus(0.3);
    if (hasMasterGrip) pushLbus(0.5, masterGripContext);
  } else if (isCforceMiniRF) {
    if (hasLCube) {
      pushLbus(0.4, distanceContext);
      if (hasMasterGrip) pushLbus(0.5, masterGripContext);
    } else if (hasMasterGrip) {
      pushLbus(0.5, masterGripContext);
    }
  } else if (hasRIA && isCforceMini) {
    pushLbus(0.4);
    if (hasMasterGrip) pushLbus(0.5, masterGripContext);
  }
  if (controllersToCheck.length) {
    var _devices$accessories5;
    var cablesData = ((_devices$accessories5 = devices.accessories) === null || _devices$accessories5 === void 0 ? void 0 : _devices$accessories5.cables) || {};
    var chosen = null;
    for (var _i27 = 0, _Object$entries15 = Object.entries(cablesData); _i27 < _Object$entries15.length; _i27++) {
      var _data$lengthM, _cablesData$chosen$le;
      var _Object$entries15$_i = _slicedToArray(_Object$entries15[_i27], 2),
        name = _Object$entries15$_i[0],
        data = _Object$entries15$_i[1];
      var connectors = [];
      if (Array.isArray(data.connectors)) connectors.push.apply(connectors, _toConsumableArray(data.connectors));
      if (data.from) connectors.push(data.from);
      if (data.to) connectors.push(data.to);
      if (!connectors.some(function (c) {
        return /CAM \(7-pin/i.test(c);
      })) continue;
      var ctrlOk = (data.compatibleControllers || []).some(function (cc) {
        return controllersToCheck.some(function (ct) {
          return cc.toLowerCase().includes(ct.toLowerCase());
        });
      });
      if (!ctrlOk) continue;
      var camOk = !data.compatibleCameras || data.compatibleCameras.some(function (c) {
        return c.toLowerCase() === camera.toLowerCase();
      });
      if (!camOk) continue;
      if (!chosen || ((_data$lengthM = data.lengthM) !== null && _data$lengthM !== void 0 ? _data$lengthM : Infinity) < ((_cablesData$chosen$le = cablesData[chosen].lengthM) !== null && _cablesData$chosen$le !== void 0 ? _cablesData$chosen$le : Infinity)) {
        chosen = name;
      }
    }
    if (chosen) {
      var camContext = camera ? "for ".concat(camera) : 'for camera control';
      cables.push(formatFizCable(chosen, camContext));
      camSpare.push(chosen);
    } else if (hasRIA && cablesData['Cable CAM (7-pin) – D-Tap 0,5m']) {
      var fallback = 'Cable CAM (7-pin) – D-Tap 0,5m';
      var fallbackContext = primaryController ? "for ".concat(primaryController, " power") : 'for controller power';
      cables.push(formatFizCable(fallback, fallbackContext));
      camSpare.push(fallback);
    }
  }
  if (hasUDM) {
    if (hasLCube) {
      cables.push(formatFizCable(CABLE_UDM_SERIAL_7P, distanceContext));
    } else {
      cables.push(formatFizCable(CABLE_UDM_SERIAL_4P, distanceContext));
      cables.push(formatFizCable(CABLE_UDM_SERIAL_4P, 'spare'));
    }
  }
  if (lbusLengths.length) {
    var shortest = Math.min.apply(Math, lbusLengths);
    var formattedShortest = String(shortest).replace('.', ',');
    cables.push(formatFizCable("LBUS to LBUS ".concat(formattedShortest, "m"), 'spare'));
    cables.push(formatFizCable(CABLE_LBUS_05, 'spare'));
  }
  camSpare.forEach(function (n) {
    return cables.push(formatFizCable(n, 'spare'));
  });
  return cables;
}
function collectAccessories() {
  var _acc$cables, _acc$cables2;
  var _ref62 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref62$hasMotor = _ref62.hasMotor,
    hasMotor = _ref62$hasMotor === void 0 ? false : _ref62$hasMotor,
    _ref62$videoDistPrefs = _ref62.videoDistPrefs,
    videoDistPrefs = _ref62$videoDistPrefs === void 0 ? [] : _ref62$videoDistPrefs;
  var cameraSupport = [];
  var misc = [];
  var monitoringSupport = ['BNC Cable 0.5 m', 'BNC Cable 1 m', 'BNC Cable 5 m', 'BNC Cable 10 m', 'BNC Drum 25 m'];
  var rigging = [];
  var chargers = [];
  var fizCables = [];
  var acc = devices.accessories || {};
  var excludedCables = new Set(['D-Tap to LEMO 2-pin', 'HDMI Cable']);
  if (batterySelect.value) {
    var _devices$batteries$ba3;
    var mount = (_devices$batteries$ba3 = devices.batteries[batterySelect.value]) === null || _devices$batteries$ba3 === void 0 ? void 0 : _devices$batteries$ba3.mount_type;
    if (acc.powerPlates) {
      for (var _i28 = 0, _Object$entries16 = Object.entries(acc.powerPlates); _i28 < _Object$entries16.length; _i28++) {
        var _Object$entries16$_i = _slicedToArray(_Object$entries16[_i28], 2),
          name = _Object$entries16$_i[0],
          plate = _Object$entries16$_i[1];
        if ((!plate.mount || plate.mount === mount) && (!plate.compatible || plate.compatible.includes(cameraSelect.value))) {
          cameraSupport.push(name);
        }
      }
    }
    if (acc.chargers) {
      var camCount = parseInt((batteryCountElem === null || batteryCountElem === void 0 ? void 0 : batteryCountElem.textContent) || '', 10);
      if (!Number.isFinite(camCount)) camCount = batterySelect.value ? 1 : 0;
      var monCount = 0;
      if (Array.isArray(videoDistPrefs)) {
        var handheldCount = videoDistPrefs.filter(function (v) {
          return /Monitor(?: \d+")? handheld$/.test(v);
        }).length;
        monCount += handheldCount * 3;
        var largeCount = videoDistPrefs.filter(function (v) {
          var m = v.match(/Monitor (\d+(?:\.\d+)?)/);
          return m && parseFloat(m[1]) > 10 && !/handheld$/.test(v);
        }).length;
        monCount += largeCount * 2;
      }
      if (hasMotor) monCount += 3;
      var total = camCount + monCount;
      if (total > 0) {
        var counts = suggestChargerCounts(total);
        var findName = function findName(slots) {
          for (var _i29 = 0, _Object$entries17 = Object.entries(acc.chargers); _i29 < _Object$entries17.length; _i29++) {
            var _Object$entries17$_i = _slicedToArray(_Object$entries17[_i29], 2),
              _name4 = _Object$entries17$_i[0],
              charger = _Object$entries17$_i[1];
            if (charger.mount === mount && charger.slots === slots) return _name4;
          }
          return null;
        };
        var pushCharger = function pushCharger(slots, count) {
          var n = findName(slots);
          if (!n) return;
          for (var i = 0; i < count; i++) chargers.push(n);
        };
        pushCharger(4, counts.quad);
        pushCharger(2, counts.dual);
        pushCharger(1, counts.single);
      }
    }
  }
  if (cameraSelect.value && acc.cages) {
    if (!cageSelect.value || cageSelect.value === 'None') {
      for (var _i30 = 0, _Object$entries18 = Object.entries(acc.cages); _i30 < _Object$entries18.length; _i30++) {
        var _Object$entries18$_i = _slicedToArray(_Object$entries18[_i30], 2),
          _name5 = _Object$entries18$_i[0],
          cage = _Object$entries18$_i[1];
        if (!cage.compatible || cage.compatible.includes(cameraSelect.value)) cameraSupport.push(_name5);
      }
    }
  }
  var powerCableDb = ((_acc$cables = acc.cables) === null || _acc$cables === void 0 ? void 0 : _acc$cables.power) || {};
  var gatherPower = function gatherPower(data) {
    var _data$power2;
    var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : misc;
    var includeExcluded = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var input = data === null || data === void 0 || (_data$power2 = data.power) === null || _data$power2 === void 0 || (_data$power2 = _data$power2.input) === null || _data$power2 === void 0 ? void 0 : _data$power2.type;
    var types = Array.isArray(input) ? input : input ? [input] : [];
    types.forEach(function (t) {
      for (var _i31 = 0, _Object$entries19 = Object.entries(powerCableDb); _i31 < _Object$entries19.length; _i31++) {
        var _Object$entries19$_i = _slicedToArray(_Object$entries19[_i31], 2),
          _name6 = _Object$entries19$_i[0],
          cable = _Object$entries19$_i[1];
        var isExcluded = excludedCables.has(_name6);
        if (cable.to === t && (!isExcluded || includeExcluded)) target.push(_name6);
      }
    });
  };
  gatherPower(devices.cameras[cameraSelect.value]);
  gatherPower(devices.video[videoSelect.value]);
  var onboardMonitor = devices.monitors[monitorSelect.value];
  if (onboardMonitor) {
    var _onboardMonitor$power;
    var monitorLabel = 'Onboard monitor';
    var powerType = onboardMonitor === null || onboardMonitor === void 0 || (_onboardMonitor$power = onboardMonitor.power) === null || _onboardMonitor$power === void 0 || (_onboardMonitor$power = _onboardMonitor$power.input) === null || _onboardMonitor$power === void 0 ? void 0 : _onboardMonitor$power.type;
    var hasLemo2 = Array.isArray(powerType) ? powerType.includes('LEMO 2-pin') : powerType === 'LEMO 2-pin';
    if (hasLemo2) {
      monitoringSupport.push("D-Tap to Lemo-2-pin Cable 0,5m (".concat(monitorLabel, ")"), "D-Tap to Lemo-2-pin Cable 0,5m (".concat(monitorLabel, ")"));
    }
    var cameraData = devices.cameras[cameraSelect.value];
    var camVideo = ((cameraData === null || cameraData === void 0 ? void 0 : cameraData.videoOutputs) || []).map(function (v) {
      var _v$type;
      return (_v$type = v.type) === null || _v$type === void 0 ? void 0 : _v$type.toUpperCase();
    });
    var monVideo = (onboardMonitor.videoInputs || []).map(function (v) {
      var _v$type2;
      return (_v$type2 = v.type) === null || _v$type2 === void 0 ? void 0 : _v$type2.toUpperCase();
    });
    var hasSDI = camVideo.some(function (t) {
      return t && t.includes('SDI');
    }) && monVideo.some(function (t) {
      return t && t.includes('SDI');
    });
    var hasHDMI = camVideo.includes('HDMI') && monVideo.includes('HDMI');
    if (hasSDI) {
      monitoringSupport.push("Ultraslim BNC Cable 0.5 m (".concat(monitorLabel, ")"), "Ultraslim BNC Cable 0.5 m (".concat(monitorLabel, ")"));
    } else if (hasHDMI) {
      monitoringSupport.push("Ultraslim HDMI 0.5 m (".concat(monitorLabel, ")"), "Ultraslim HDMI 0.5 m (".concat(monitorLabel, ")"));
    }
    rigging.push("ULCS Arm mit 3/8\" und 1/4\" double (".concat(monitorLabel, ")"));
  }
  if (videoSelect.value) {
    var rxName = videoSelect.value.replace(/ TX\b/, ' RX');
    if (devices.wirelessReceivers && devices.wirelessReceivers[rxName]) {
      gatherPower(devices.wirelessReceivers[rxName]);
    }
  }
  motorSelects.forEach(function (sel) {
    return gatherPower(devices.fiz.motors[sel.value]);
  });
  controllerSelects.forEach(function (sel) {
    return gatherPower(devices.fiz.controllers[sel.value]);
  });
  gatherPower(devices.fiz.distance[distanceSelect.value]);
  var fizCableDb = ((_acc$cables2 = acc.cables) === null || _acc$cables2 === void 0 ? void 0 : _acc$cables2.fiz) || {};
  var getFizConnectors = function getFizConnectors(data) {
    var list = [];
    if (!data) return list;
    if (Array.isArray(data.fizConnectors)) {
      data.fizConnectors.forEach(function (fc) {
        var type = fc && _typeof(fc) === 'object' ? fc.type : fc;
        if (type) list.push(type);
      });
    }
    if (data.fizConnector) list.push(data.fizConnector);
    return _toConsumableArray(new Set(list.filter(Boolean)));
  };
  var pushFizCable = function pushFizCable(name, context) {
    fizCables.push(formatFizCable(name, context));
  };
  var pairContextCounts = {};
  var buildPairContext = function buildPairContext(motorName, controllerName) {
    var parts = [sanitizeFizContext(motorName), sanitizeFizContext(controllerName)].filter(Boolean);
    if (!parts.length) return '';
    var base = parts.join(' ↔ ');
    var key = base.toLowerCase();
    var next = (pairContextCounts[key] || 0) + 1;
    pairContextCounts[key] = next;
    return next > 1 ? "".concat(base, " #").concat(next) : base;
  };
  var matchesCable = function matchesCable(cable, from, to) {
    if (!cable) return false;
    var fromToMatch = function fromToMatch(a, b) {
      return cable.from === a && cable.to === b || cable.from === b && cable.to === a;
    };
    if (cable.from && cable.to) {
      if (fromToMatch(from, to)) return true;
    }
    if (Array.isArray(cable.connectors)) {
      var connectors = cable.connectors;
      if (connectors.includes(from) && connectors.includes(to)) return true;
    }
    return false;
  };
  var motorEntries = motorSelects.map(function (sel) {
    return sel.value;
  }).filter(function (v) {
    return v && v !== 'None';
  }).map(function (name) {
    return {
      name: name,
      data: devices.fiz.motors[name]
    };
  }).filter(function (entry) {
    return entry.data;
  });
  var controllerEntries = controllerSelects.map(function (sel) {
    return sel.value;
  }).filter(function (v) {
    return v && v !== 'None';
  }).map(function (name) {
    return {
      name: name,
      data: devices.fiz.controllers[name]
    };
  }).filter(function (entry) {
    return entry.data;
  });
  motorEntries.forEach(function (motorEntry) {
    var motorConns = getFizConnectors(motorEntry.data);
    controllerEntries.forEach(function (controllerEntry) {
      var controllerConns = getFizConnectors(controllerEntry.data);
      motorConns.forEach(function (mConn) {
        controllerConns.forEach(function (cConn) {
          if (mConn !== cConn) return;
          for (var _i32 = 0, _Object$entries20 = Object.entries(fizCableDb); _i32 < _Object$entries20.length; _i32++) {
            var _Object$entries20$_i = _slicedToArray(_Object$entries20[_i32], 2),
              _name7 = _Object$entries20$_i[0],
              cable = _Object$entries20$_i[1];
            if (matchesCable(cable, mConn, cConn)) {
              var context = buildPairContext(motorEntry.name, controllerEntry.name);
              pushFizCable(_name7, context);
            }
          }
        });
      });
    });
  });
  suggestArriFizCables().forEach(function (name) {
    return fizCables.push(name);
  });
  var miscUnique = _toConsumableArray(new Set(misc));
  var monitoringSupportList = monitoringSupport.slice();
  var riggingUnique = _toConsumableArray(new Set(rigging));
  for (var i = 0; i < 4; i++) monitoringSupportList.push('BNC Connector');
  return {
    cameraSupport: _toConsumableArray(new Set(cameraSupport)),
    chargers: chargers,
    fizCables: fizCables,
    misc: miscUnique,
    monitoringSupport: monitoringSupportList,
    rigging: riggingUnique
  };
}
function collectProjectFormData() {
  if (!projectForm) return {};
  var formData = new FormData(projectForm);
  var getValue = function getValue(name) {
    var raw = formData.get(name);
    return typeof raw === 'string' ? raw.trim() : '';
  };
  var getMultiValue = function getMultiValue(name) {
    var values = formData.getAll(name);
    if (!values || values.length === 0) return '';
    return values.map(function (value) {
      return typeof value === 'string' ? value : String(value);
    }).join(', ');
  };
  var viewfinderSettings = getMultiValue('viewfinderSettings');
  var frameGuides = getMultiValue('frameGuides');
  var aspectMaskOpacity = getMultiValue('aspectMaskOpacity');
  var filterStr = collectFilterSelections();
  var filterTypes = filterStr ? filterStr.split(',').map(function (s) {
    return s.split(':')[0];
  }) : [];
  var matteboxVal = filterTypes.some(function (t) {
    return t === 'ND Grad HE' || t === 'ND Grad SE';
  }) ? 'Swing Away' : getValue('mattebox');
  var people = Array.from((crewContainer === null || crewContainer === void 0 ? void 0 : crewContainer.querySelectorAll('.person-row')) || []).map(function (row) {
    var _row$querySelector, _row$querySelector2, _row$querySelector3, _row$querySelector4;
    return {
      role: (_row$querySelector = row.querySelector('select')) === null || _row$querySelector === void 0 ? void 0 : _row$querySelector.value,
      name: (_row$querySelector2 = row.querySelector('.person-name')) === null || _row$querySelector2 === void 0 ? void 0 : _row$querySelector2.value.trim(),
      phone: (_row$querySelector3 = row.querySelector('.person-phone')) === null || _row$querySelector3 === void 0 ? void 0 : _row$querySelector3.value.trim(),
      email: (_row$querySelector4 = row.querySelector('.person-email')) === null || _row$querySelector4 === void 0 || (_row$querySelector4 = _row$querySelector4.value) === null || _row$querySelector4 === void 0 ? void 0 : _row$querySelector4.trim()
    };
  }).filter(function (person) {
    return person.role && person.name;
  });
  var collectRanges = function collectRanges(container, startSel, endSel) {
    return Array.from((container === null || container === void 0 ? void 0 : container.querySelectorAll('.period-row')) || []).map(function (row) {
      var _row$querySelector5, _row$querySelector6;
      var start = (_row$querySelector5 = row.querySelector(startSel)) === null || _row$querySelector5 === void 0 ? void 0 : _row$querySelector5.value;
      var end = (_row$querySelector6 = row.querySelector(endSel)) === null || _row$querySelector6 === void 0 ? void 0 : _row$querySelector6.value;
      return [start, end].filter(Boolean).join(' to ');
    }).filter(Boolean);
  };
  var prepDays = collectRanges(prepContainer, '.prep-start', '.prep-end');
  var shootingDays = collectRanges(shootContainer, '.shoot-start', '.shoot-end');
  var gearValues = gearListOutput ? function () {
    var ids = ['gearListDirectorMonitor', 'gearListDopMonitor', 'gearListGafferMonitor', 'gearListDirectorMonitor15', 'gearListComboMonitor15', 'gearListDopMonitor15', 'gearListFocusMonitor', 'gearListProGaffColor1', 'gearListProGaffWidth1', 'gearListProGaffColor2', 'gearListProGaffWidth2', 'gearListEyeLeatherColor'];
    var map = new Map();
    ids.forEach(function (id) {
      var el = gearListOutput.querySelector("#".concat(id));
      if (!el) return;
      var value = el.value;
      map.set(id, typeof value === 'string' ? value : value == null ? '' : String(value));
    });
    return map;
  }() : null;
  var getGearValue = function getGearValue(id) {
    return gearValues && gearValues.has(id) ? gearValues.get(id) : '';
  };
  var proGaffColor1 = getGearValue('gearListProGaffColor1');
  var proGaffWidth1 = getGearValue('gearListProGaffWidth1');
  var proGaffColor2 = getGearValue('gearListProGaffColor2');
  var proGaffWidth2 = getGearValue('gearListProGaffWidth2');
  var info = _objectSpread(_objectSpread({
    projectName: getValue('projectName'),
    productionCompany: getValue('productionCompany'),
    rentalHouse: getValue('rentalHouse')
  }, people.length ? {
    people: people
  } : {}), {}, {
    prepDays: prepDays,
    shootingDays: shootingDays,
    deliveryResolution: getValue('deliveryResolution'),
    recordingResolution: getValue('recordingResolution'),
    aspectRatio: getMultiValue('aspectRatio'),
    codec: getValue('codec'),
    baseFrameRate: getValue('baseFrameRate'),
    sensorMode: getValue('sensorMode'),
    lenses: getMultiValue('lenses'),
    requiredScenarios: getMultiValue('requiredScenarios'),
    cameraHandle: getMultiValue('cameraHandle'),
    viewfinderExtension: getValue('viewfinderExtension'),
    viewfinderEyeLeatherColor: getGearValue('gearListEyeLeatherColor') || getValue('viewfinderEyeLeatherColor'),
    mattebox: matteboxVal,
    gimbal: getMultiValue('gimbal'),
    viewfinderSettings: viewfinderSettings,
    frameGuides: frameGuides,
    aspectMaskOpacity: aspectMaskOpacity,
    videoDistribution: getMultiValue('videoDistribution'),
    monitoringConfiguration: getValue('monitoringConfiguration'),
    monitorUserButtons: getMultiValue('monitorUserButtons'),
    cameraUserButtons: getMultiValue('cameraUserButtons'),
    viewfinderUserButtons: getMultiValue('viewfinderUserButtons'),
    tripodHeadBrand: getValue('tripodHeadBrand'),
    tripodBowl: getValue('tripodBowl'),
    tripodTypes: getMultiValue('tripodTypes'),
    tripodSpreader: getValue('tripodSpreader'),
    sliderBowl: getSliderBowlValue(),
    easyrig: getEasyrigValue(),
    filter: filterStr
  });
  var assignGearField = function assignGearField(prop, id) {
    var value = getGearValue(id);
    if (value) {
      info[prop] = value;
    }
  };
  assignGearField('directorMonitor', 'gearListDirectorMonitor');
  assignGearField('dopMonitor', 'gearListDopMonitor');
  assignGearField('gafferMonitor', 'gearListGafferMonitor');
  assignGearField('directorMonitor15', 'gearListDirectorMonitor15');
  assignGearField('comboMonitor15', 'gearListComboMonitor15');
  assignGearField('dopMonitor15', 'gearListDopMonitor15');
  info.focusMonitor = getGearValue('gearListFocusMonitor') || '';
  if (proGaffColor1 || proGaffWidth1) {
    info.proGaffColor1 = proGaffColor1 || '';
    info.proGaffWidth1 = proGaffWidth1 || '';
  }
  if (proGaffColor2 || proGaffWidth2) {
    info.proGaffColor2 = proGaffColor2 || '';
    info.proGaffWidth2 = proGaffWidth2 || '';
  }
  return info;
}
function populateProjectForm() {
  var info = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (!projectForm) return;
  projectForm.reset();
  var setVal = function setVal(name, value) {
    if (value === undefined) return;
    var field = projectForm.querySelector("[name=\"".concat(name, "\"]"));
    if (field) field.value = value;
  };
  var setMulti = function setMulti(name, values) {
    var field = projectForm.querySelector("[name=\"".concat(name, "\"]"));
    if (!field || values === undefined) return;
    var arr = Array.isArray(values) ? values : values ? values.split(',').map(function (v) {
      return v.trim();
    }) : [];
    Array.from(field.options).forEach(function (opt) {
      opt.selected = arr.includes(opt.value);
    });
  };
  populateRecordingResolutionDropdown(info.recordingResolution);
  populateSensorModeDropdown(info.sensorMode);
  populateCodecDropdown(info.codec);
  setVal('projectName', info.projectName);
  setVal('productionCompany', info.productionCompany);
  setVal('rentalHouse', info.rentalHouse);
  if (crewContainer) {
    crewContainer.innerHTML = '';
    (info.people || []).forEach(function (p) {
      return createCrewRow(p);
    });
  }
  if (prepContainer) {
    prepContainer.innerHTML = '';
    var prepArr = Array.isArray(info.prepDays) ? info.prepDays : info.prepDays ? String(info.prepDays).split('\n') : [''];
    if (!prepArr.length) prepArr.push('');
    prepArr.forEach(function (r) {
      var _r$split = r.split(' to '),
        _r$split2 = _slicedToArray(_r$split, 2),
        start = _r$split2[0],
        end = _r$split2[1];
      createPrepRow({
        start: start,
        end: end
      });
    });
  }
  if (shootContainer) {
    shootContainer.innerHTML = '';
    var shootArr = Array.isArray(info.shootingDays) ? info.shootingDays : info.shootingDays ? String(info.shootingDays).split('\n') : [''];
    if (!shootArr.length) shootArr.push('');
    shootArr.forEach(function (r) {
      var _r$split3 = r.split(' to '),
        _r$split4 = _slicedToArray(_r$split3, 2),
        start = _r$split4[0],
        end = _r$split4[1];
      createShootRow({
        start: start,
        end: end
      });
    });
  }
  setVal('deliveryResolution', info.deliveryResolution);
  setMulti('aspectRatio', info.aspectRatio);
  setVal('baseFrameRate', info.baseFrameRate);
  setVal('sensorMode', info.sensorMode);
  setMulti('lenses', info.lenses);
  setMulti('requiredScenarios', info.requiredScenarios);
  setMulti('cameraHandle', info.cameraHandle);
  setVal('viewfinderExtension', info.viewfinderExtension);
  setVal('viewfinderEyeLeatherColor', info.viewfinderEyeLeatherColor);
  setVal('mattebox', info.mattebox);
  setMulti('gimbal', info.gimbal);
  setMulti('viewfinderSettings', info.viewfinderSettings);
  setMulti('frameGuides', info.frameGuides);
  setMulti('aspectMaskOpacity', info.aspectMaskOpacity);
  setMulti('videoDistribution', info.videoDistribution);
  setVal('monitoringConfiguration', info.monitoringConfiguration);
  setMulti('monitorUserButtons', info.monitorUserButtons);
  setMulti('cameraUserButtons', info.cameraUserButtons);
  setMulti('viewfinderUserButtons', info.viewfinderUserButtons);
  setVal('tripodHeadBrand', info.tripodHeadBrand);
  setVal('tripodBowl', info.tripodBowl);
  setMulti('tripodTypes', info.tripodTypes);
  setVal('tripodSpreader', info.tripodSpreader);
  setSliderBowlValue(info.sliderBowl || '');
  setEasyrigValue(info.easyrig || '');
  var filterTokens = parseFilterTokens(info.filter);
  setMulti('filter', filterTokens.map(function (t) {
    return t.type;
  }));
  renderFilterDetails();
  filterTokens.forEach(function (_ref63) {
    var type = _ref63.type,
      size = _ref63.size,
      values = _ref63.values;
    var sizeSel = document.getElementById("filter-size-".concat(filterId(type)));
    if (sizeSel) sizeSel.value = size;
    var valSel = document.getElementById("filter-values-".concat(filterId(type)));
    if (valSel) {
      var arr = Array.isArray(values) ? values : [];
      Array.from(valSel.options).forEach(function (opt) {
        opt.selected = arr.includes(opt.value);
      });
    }
  });
}
function ensureZoomRemoteSetup(info) {
  if (!info || !info.tripodPreferences || !info.tripodPreferences.includes('Zoom Remote handle')) return;
  var motors = motorSelects.map(function (sel) {
    return sel.value;
  }).filter(function (v) {
    return v && v !== 'None';
  });
  if (!motors.length) return;
  if (motors.length < 2 && motorSelects[1]) {
    var second = motors[0];
    if (/cforce.*rf/i.test(second) && devices.fiz.motors['Arri Cforce Mini']) {
      second = 'Arri Cforce Mini';
    }
    motorSelects[1].value = second;
    motors = motorSelects.map(function (sel) {
      return sel.value;
    }).filter(function (v) {
      return v && v !== 'None';
    });
  }
  var allowed = new Set(['Arri Master Grip (single unit)', 'Arri ZMU-4 (body only, wired)', 'Tilta Nucleus-M Hand Grip (single)', 'Tilta Nucleus-M II Handle (single)']);
  var controllers = controllerSelects.map(function (sel) {
    return sel.value;
  }).filter(function (v) {
    return v && v !== 'None';
  });
  if (!controllers.some(function (c) {
    return allowed.has(c);
  })) {
    var brand = detectBrand(motors[0]);
    var ctrl = null;
    if (brand === 'arri') {
      ctrl = 'Arri Master Grip (single unit)';
    } else if (brand === 'tilta') {
      ctrl = 'Tilta Nucleus-M Hand Grip (single)';
    }
    if (ctrl && controllerSelects[0]) {
      controllerSelects[0].value = ctrl;
    }
  }
  if (typeof updateCalculations === 'function') updateCalculations();
  if (typeof saveCurrentSession === 'function') saveCurrentSession();
}
function stripAutoGearContext(name) {
  return (name || '').replace(/\s*\([^)]*\)\s*$/, '').trim();
}
function normalizeAutoGearName(name) {
  return stripAutoGearContext(name).toLowerCase();
}
function matchesAutoGearItem(target, actual) {
  if (!target || !actual) return false;
  var normTarget = normalizeAutoGearName(target);
  var normActual = normalizeAutoGearName(actual);
  if (normTarget === normActual) return true;
  return normTarget === normalizeAutoGearName(actual.replace(/^\d+x\s+/, ''));
}
function getSpanCount(span) {
  if (!span) return 1;
  var text = span.textContent || '';
  var match = text.trim().match(/^(\d+)x\s+/);
  return match ? parseInt(match[1], 10) : 1;
}
function updateSpanCountInPlace(span, newCount) {
  if (!span) return;
  var walker = document.createTreeWalker(span, NodeFilter.SHOW_TEXT, null, false);
  var textNode = null;
  while (walker.nextNode()) {
    var node = walker.currentNode;
    if (/\d+x\s+/i.test(node.textContent)) {
      textNode = node;
      break;
    }
  }
  if (!textNode) {
    span.insertBefore(document.createTextNode("".concat(newCount, "x ")), span.firstChild);
    return;
  }
  var value = textNode.textContent || '';
  var match = value.match(/^(\s*)(\d+)x\s+(.*)$/);
  if (match) {
    textNode.textContent = "".concat(match[1]).concat(newCount, "x ").concat(match[3]);
  } else {
    textNode.textContent = value.replace(/^(\d+)x\s+/, "".concat(newCount, "x "));
  }
}
function cleanupAutoGearCell(cell) {
  if (!cell) return;
  var nodes = Array.from(cell.childNodes);
  var previousWasBreak = true;
  nodes.forEach(function (node) {
    if (node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) {
      cell.removeChild(node);
      return;
    }
    if (node.nodeName === 'BR') {
      if (previousWasBreak || !node.nextSibling) {
        cell.removeChild(node);
        return;
      }
      previousWasBreak = true;
    } else {
      previousWasBreak = false;
    }
  });
  while (cell.firstChild && cell.firstChild.nodeName === 'BR') {
    cell.removeChild(cell.firstChild);
  }
  while (cell.lastChild && cell.lastChild.nodeName === 'BR') {
    cell.removeChild(cell.lastChild);
  }
  var textContent = cell.textContent ? cell.textContent.trim() : '';
  if (!textContent && !cell.querySelector('.gear-item')) {
    var row = cell.closest('tr');
    var section = row ? row.closest('tbody') : null;
    if (section && section.classList.contains('auto-gear-category')) {
      section.remove();
    }
  }
}
function analyzeAutoGearSegment(nodes) {
  if (!nodes || !nodes.length) return null;
  var span = nodes.find(function (node) {
    return node.nodeType === 1 && node.classList && node.classList.contains('gear-item');
  });
  if (span) {
    var name = span.getAttribute('data-gear-name') || (span.textContent || '').replace(/^(\d+)x\s+/, '').trim();
    var _count = getSpanCount(span);
    return {
      span: span,
      name: name,
      count: _count
    };
  }
  var wrapper = document.createElement('div');
  nodes.forEach(function (node) {
    return wrapper.appendChild(node.cloneNode(true));
  });
  var text = wrapper.innerHTML.replace(/<select[\s\S]*?<\/select>/gi, '').replace(/<[^>]+>/g, '').trim();
  if (!text) return null;
  var match = text.match(/^(\d+)x\s+/);
  var count = 1;
  if (match) {
    count = parseInt(match[1], 10);
    text = text.slice(match[0].length).trim();
  }
  return {
    span: null,
    name: text,
    count: count,
    wrapper: wrapper
  };
}
function updateRawSegmentCount(nodes, info, newCount) {
  if (!nodes.length) return;
  var updated = false;
  var _iterator21 = _createForOfIteratorHelper(nodes),
    _step21;
  try {
    for (_iterator21.s(); !(_step21 = _iterator21.n()).done;) {
      var node = _step21.value;
      if (node.nodeType === Node.TEXT_NODE) {
        var _value8 = node.textContent || '';
        if (/\d+x\s+/i.test(_value8)) {
          node.textContent = _value8.replace(/^(\s*)(\d+)x\s+/, function (match, spaces) {
            return "".concat(spaces).concat(newCount, "x ");
          });
          updated = true;
          break;
        }
        if (_value8.trim()) {
          node.textContent = "".concat(newCount, "x ").concat(_value8.trim().replace(/^(\d+)x\s+/, ''));
          updated = true;
          break;
        }
      } else if (node.nodeType === 1) {
        var child = node.firstChild;
        if (child && child.nodeType === Node.TEXT_NODE && /\d+x\s+/i.test(child.textContent || '')) {
          child.textContent = (child.textContent || '').replace(/^(\s*)(\d+)x\s+/, function (match, spaces) {
            return "".concat(spaces).concat(newCount, "x ");
          });
          updated = true;
          break;
        }
      }
    }
  } catch (err) {
    _iterator21.e(err);
  } finally {
    _iterator21.f();
  }
  if (!updated) {
    var first = nodes[0];
    var parent = first.parentNode;
    if (parent) {
      parent.insertBefore(document.createTextNode("".concat(newCount, "x ").concat(info.name)), first);
    }
  }
}
function removeAutoGearItem(cell, item, remainingOverride) {
  if (!cell) return normalizeAutoGearQuantity(item.quantity);
  var remaining = typeof remainingOverride === 'number' ? remainingOverride : normalizeAutoGearQuantity(item.quantity);
  if (remaining <= 0) return remaining;
  var nodes = Array.from(cell.childNodes);
  if (!nodes.length) return remaining;
  var segments = [];
  var current = [];
  nodes.forEach(function (node) {
    if (node.nodeName === 'BR') {
      segments.push({
        nodes: current,
        separator: node
      });
      current = [];
    } else {
      current.push(node);
    }
  });
  segments.push({
    nodes: current,
    separator: null
  });
  var modified = false;
  segments.forEach(function (segment) {
    if (!segment.nodes.length || remaining <= 0) return;
    var info = analyzeAutoGearSegment(segment.nodes);
    if (!info || !info.name || !matchesAutoGearItem(item.name, info.name)) return;
    if (info.span) {
      var currentCount = info.count;
      if (currentCount > remaining) {
        updateSpanCountInPlace(info.span, currentCount - remaining);
        remaining = 0;
      } else {
        remaining -= currentCount;
        segment.nodes.forEach(function (node) {
          return node.remove();
        });
      }
      modified = true;
    } else {
      if (info.count > remaining && info.count > 1) {
        updateRawSegmentCount(segment.nodes, info, info.count - remaining);
        remaining = 0;
        modified = true;
      } else {
        remaining -= info.count;
        segment.nodes.forEach(function (node) {
          return node.remove();
        });
        modified = true;
      }
    }
  });
  if (modified) {
    cleanupAutoGearCell(cell);
  }
  return remaining;
}
function addAutoGearItem(cell, item) {
  if (!cell) return;
  var quantity = normalizeAutoGearQuantity(item.quantity);
  if (quantity <= 0) return;
  var name = item.name ? item.name.trim() : '';
  if (!name) return;
  var spans = Array.from(cell.querySelectorAll('.gear-item'));
  for (var _i33 = 0, _spans = spans; _i33 < _spans.length; _i33++) {
    var _span = _spans[_i33];
    var spanName = _span.getAttribute('data-gear-name') || (_span.textContent || '').replace(/^(\d+)x\s+/, '').trim();
    if (matchesAutoGearItem(name, spanName)) {
      var newCount = getSpanCount(_span) + quantity;
      updateSpanCountInPlace(_span, newCount);
      return;
    }
  }
  if (cell.childNodes.length) {
    cell.appendChild(document.createElement('br'));
  }
  var span = document.createElement('span');
  span.className = 'gear-item auto-gear-item';
  span.setAttribute('data-gear-name', name);
  var displayName = typeof addArriKNumber === 'function' ? addArriKNumber(name) : name;
  span.textContent = "".concat(quantity, "x ").concat(displayName);
  cell.appendChild(span);
}
function ensureAutoGearCategory(table, category) {
  var _texts$currentLang42, _texts$en123;
  var rawCategory = category && category.trim() ? category.trim() : '';
  var label = rawCategory || AUTO_GEAR_CUSTOM_CATEGORY;
  var existing = Array.from(table.querySelectorAll('tbody.category-group')).find(function (body) {
    if (body.dataset && Object.prototype.hasOwnProperty.call(body.dataset, 'autoCategory')) {
      return body.dataset.autoCategory === rawCategory;
    }
    var headerCell = body.querySelector('.category-row td');
    return headerCell && headerCell.textContent.trim() === label;
  });
  if (existing) {
    var cell = existing.querySelector('tr:not(.category-row) td');
    return cell || null;
  }
  var body = document.createElement('tbody');
  body.className = 'category-group auto-gear-category';
  body.dataset.autoCategory = rawCategory;
  var headerRow = document.createElement('tr');
  headerRow.className = 'category-row';
  var headerCell = document.createElement('td');
  var labelText = rawCategory ? rawCategory : ((_texts$currentLang42 = texts[currentLang]) === null || _texts$currentLang42 === void 0 ? void 0 : _texts$currentLang42.autoGearCustomCategory) || ((_texts$en123 = texts.en) === null || _texts$en123 === void 0 ? void 0 : _texts$en123.autoGearCustomCategory) || 'Custom Additions';
  headerCell.textContent = labelText;
  headerRow.appendChild(headerCell);
  body.appendChild(headerRow);
  var itemsRow = document.createElement('tr');
  var itemsCell = document.createElement('td');
  itemsRow.appendChild(itemsCell);
  body.appendChild(itemsRow);
  table.appendChild(body);
  return itemsCell;
}
function findAutoGearCategoryCell(table, category) {
  if (!table) return null;
  var rawCategory = category && category.trim() ? category.trim() : '';
  var label = rawCategory || AUTO_GEAR_CUSTOM_CATEGORY;
  var bodies = Array.from(table.querySelectorAll('tbody.category-group'));
  for (var _i34 = 0, _bodies = bodies; _i34 < _bodies.length; _i34++) {
    var body = _bodies[_i34];
    if (body.dataset && Object.prototype.hasOwnProperty.call(body.dataset, 'autoCategory')) {
      if (body.dataset.autoCategory === rawCategory) {
        var cell = body.querySelector('tr:not(.category-row) td');
        if (cell) return cell;
      }
      continue;
    }
    var headerCell = body.querySelector('.category-row td');
    if (!headerCell) continue;
    var headerLabel = headerCell.textContent.trim();
    if (rawCategory) {
      if (headerLabel === rawCategory) {
        var _cell = body.querySelector('tr:not(.category-row) td');
        if (_cell) return _cell;
      }
    } else if (body.classList.contains('auto-gear-category') || headerLabel === label) {
      var _cell2 = body.querySelector('tr:not(.category-row) td');
      if (_cell2) return _cell2;
    }
  }
  return null;
}
function applyAutoGearRulesToTableHtml(tableHtml, info) {
  if (!tableHtml || !autoGearRules.length || typeof document === 'undefined') return tableHtml;
  var scenarios = info && info.requiredScenarios ? info.requiredScenarios.split(',').map(function (s) {
    return s.trim();
  }).filter(Boolean) : [];
  if (!scenarios.length) {
    var hasRuleWithoutScenario = autoGearRules.some(function (rule) {
      return !rule.scenarios.length;
    });
    if (!hasRuleWithoutScenario) return tableHtml;
  }
  var triggered = autoGearRules.filter(function (rule) {
    return rule.scenarios.every(function (s) {
      return scenarios.includes(s);
    });
  });
  if (!triggered.length) return tableHtml;
  var container = document.createElement('div');
  container.innerHTML = tableHtml;
  var table = container.querySelector('.gear-table');
  if (!table) return tableHtml;
  triggered.forEach(function (rule) {
    rule.remove.forEach(function (item) {
      var remaining = normalizeAutoGearQuantity(item.quantity);
      if (remaining <= 0) return;
      var primaryCell = findAutoGearCategoryCell(table, item.category);
      if (primaryCell) {
        remaining = removeAutoGearItem(primaryCell, item, remaining);
      }
      if (remaining > 0) {
        var gearCells = Array.from(table.querySelectorAll('tbody.category-group tr:not(.category-row) td'));
        for (var _i35 = 0, _gearCells = gearCells; _i35 < _gearCells.length; _i35++) {
          var cell = _gearCells[_i35];
          if (cell === primaryCell) continue;
          remaining = removeAutoGearItem(cell, item, remaining);
          if (remaining <= 0) break;
        }
      }
    });
    rule.add.forEach(function (item) {
      var cell = ensureAutoGearCategory(table, item.category);
      if (cell) addAutoGearItem(cell, item);
    });
  });
  return container.innerHTML;
}
function generateGearListHtml() {
  var _devices$accessories6, _texts$currentLang43, _texts$en124, _texts$currentLang44, _texts$en125, _texts$currentLang45, _texts$en126, _devices$accessories8;
  var info = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var getText = function getText(sel) {
    return sel && sel.options && sel.selectedIndex >= 0 ? sel.options[sel.selectedIndex].text.trim() : '';
  };
  var selectedNames = {
    camera: cameraSelect && cameraSelect.value && cameraSelect.value !== 'None' ? getText(cameraSelect) : '',
    monitor: monitorSelect && monitorSelect.value && monitorSelect.value !== 'None' ? getText(monitorSelect) : '',
    video: videoSelect && videoSelect.value && videoSelect.value !== 'None' ? getText(videoSelect) : '',
    motors: motorSelects.map(function (sel) {
      return sel && sel.value && sel.value !== 'None' ? getText(sel) : '';
    }).filter(Boolean),
    controllers: controllerSelects.map(function (sel) {
      return sel && sel.value && sel.value !== 'None' ? getText(sel) : '';
    }).filter(Boolean),
    distance: distanceSelect && distanceSelect.value && distanceSelect.value !== 'None' ? getText(distanceSelect) : '',
    cage: cageSelect && cageSelect.value && cageSelect.value !== 'None' ? getText(cageSelect) : '',
    battery: batterySelect && batterySelect.value && batterySelect.value !== 'None' ? getText(batterySelect) : ''
  };
  var hasMotor = selectedNames.motors.length > 0;
  var videoDistPrefs = info.videoDistribution ? info.videoDistribution.split(',').map(function (s) {
    return s.trim();
  }).filter(Boolean) : [];
  var handheldPrefs = videoDistPrefs.map(function (p) {
    var m = p.match(/^(Director|Gaffer|DoP) Monitor (?:(\d+)" )?handheld$/);
    return m ? {
      role: m[1],
      size: m[2] ? parseFloat(m[2]) : undefined
    } : null;
  }).filter(Boolean);
  var largeMonitorPrefs = videoDistPrefs.map(function (p) {
    var m = p.match(/^(Director|Combo|DoP) Monitor 15-21"$/);
    return m ? {
      role: m[1]
    } : null;
  }).filter(Boolean);
  if (["Arri Alexa Mini", "Arri Amira"].includes(selectedNames.camera)) {
    selectedNames.viewfinder = "ARRI K2.75004.0 MVF-1 Viewfinder";
  } else {
    selectedNames.viewfinder = "";
  }
  var _collectAccessories = collectAccessories({
      hasMotor: hasMotor,
      videoDistPrefs: videoDistPrefs
    }),
    cameraSupportAcc = _collectAccessories.cameraSupport,
    chargersAcc = _collectAccessories.chargers,
    fizCableAcc = _collectAccessories.fizCables,
    miscAcc = _collectAccessories.misc,
    monitoringSupportAcc = _collectAccessories.monitoringSupport,
    riggingAcc = _collectAccessories.rigging;
  for (var i = 0; i < 2; i++) riggingAcc.push('ULCS Bracket with 1/4" to 1/4"');
  for (var _i36 = 0; _i36 < 2; _i36++) riggingAcc.push('ULCS Bracket with 3/8" to 1/4"');
  for (var _i37 = 0; _i37 < 2; _i37++) riggingAcc.push('Noga Arm');
  for (var _i38 = 0; _i38 < 2; _i38++) riggingAcc.push('Mini Magic Arm');
  for (var _i39 = 0; _i39 < 4; _i39++) riggingAcc.push('Cine Quick Release');
  riggingAcc.push('SmallRig - Super lightweight 15mm RailBlock');
  for (var _i40 = 0; _i40 < 3; _i40++) riggingAcc.push('Spigot with male 3/8" and 1/4"');
  for (var _i41 = 0; _i41 < 2; _i41++) riggingAcc.push('Clapper Stick');
  for (var _i42 = 0; _i42 < 2; _i42++) riggingAcc.push('D-Tap Splitter');
  var cagesDb = ((_devices$accessories6 = devices.accessories) === null || _devices$accessories6 === void 0 ? void 0 : _devices$accessories6.cages) || {};
  var compatibleCages = [];
  if (cameraSelect && cameraSelect.value && cameraSelect.value !== 'None') {
    for (var _i43 = 0, _Object$entries21 = Object.entries(cagesDb); _i43 < _Object$entries21.length; _i43++) {
      var _Object$entries21$_i = _slicedToArray(_Object$entries21[_i43], 2),
        name = _Object$entries21$_i[0],
        cage = _Object$entries21$_i[1];
      if (!cage.compatible || cage.compatible.includes(cameraSelect.value)) {
        compatibleCages.push(name);
      }
    }
  }
  var supportAccNoCages = cameraSupportAcc.filter(function (item) {
    return !compatibleCages.includes(item);
  });
  var scenarios = info.requiredScenarios ? info.requiredScenarios.split(',').map(function (s) {
    return s.trim();
  }).filter(Boolean) : [];
  var hasSeededScenarioRules = hasSeededAutoGearDefaults();
  var allowLegacyScenarioGear = autoGearRules.length === 0 && !hasSeededScenarioRules;
  var isScenarioActive = function isScenarioActive(scenario) {
    return allowLegacyScenarioGear && scenarios.includes(scenario);
  };
  var isAnyScenarioActive = function isAnyScenarioActive(list) {
    return allowLegacyScenarioGear && list.some(function (value) {
      return scenarios.includes(value);
    });
  };
  var hasGimbal = isScenarioActive('Gimbal');
  if (isAnyScenarioActive(['Trinity', 'Steadicam'])) {
    for (var _i44 = 0; _i44 < 2; _i44++) {
      riggingAcc.push('D-Tap Splitter');
      riggingAcc.push('D-Tap Extension 50 cm (Steadicam/Trinity)');
    }
  }
  var handleSelections = info.cameraHandle ? info.cameraHandle.split(',').map(function (r) {
    return r.trim();
  }).filter(Boolean) : [];
  var viewfinderExtSelections = info.viewfinderExtension ? info.viewfinderExtension.split(',').map(function (r) {
    return r.trim();
  }).filter(Boolean) : [];
  var monitoringSettings = [].concat(_toConsumableArray(info.viewfinderSettings ? info.viewfinderSettings.split(',').map(function (s) {
    return s.trim();
  }) : []), _toConsumableArray(info.frameGuides ? info.frameGuides.split(',').map(function (s) {
    return s.trim();
  }) : []), _toConsumableArray(info.aspectMaskOpacity ? info.aspectMaskOpacity.split(',').map(function (s) {
    return s.trim();
  }) : []), _toConsumableArray(info.monitoringSettings ? info.monitoringSettings.split(',').map(function (s) {
    return s.trim();
  }) : [])).filter(Boolean);
  var selectedLensNames = info.lenses ? info.lenses.split(',').map(function (s) {
    return s.trim();
  }).filter(Boolean) : [];
  var maxLensFront = selectedLensNames.reduce(function (max, name) {
    var lens = devices.lenses && devices.lenses[name];
    return Math.max(max, lens && lens.frontDiameterMm || 0);
  }, 0);
  var parsedFilters = parseFilterTokens(info.filter);
  var filterTypes = parsedFilters.map(function (f) {
    return f.type;
  });
  var needsSwingAway = filterTypes.some(function (t) {
    return t === 'ND Grad HE' || t === 'ND Grad SE';
  });
  var filterSelections = collectFilterAccessories(parsedFilters);
  var filterSelectHtml = buildFilterSelectHtml(parsedFilters);
  if (info.mattebox && !needsSwingAway) {
    var _devices$accessories7;
    var matteboxes = ((_devices$accessories7 = devices.accessories) === null || _devices$accessories7 === void 0 ? void 0 : _devices$accessories7.matteboxes) || {};
    for (var _i45 = 0, _Object$entries22 = Object.entries(matteboxes); _i45 < _Object$entries22.length; _i45++) {
      var _Object$entries22$_i = _slicedToArray(_Object$entries22[_i45], 2),
        _name8 = _Object$entries22$_i[0],
        mb = _Object$entries22$_i[1];
      var normalize = function normalize(s) {
        return s.replace(/[-\s]/g, '').toLowerCase();
      };
      if (mb.type && normalize(mb.type) === normalize(info.mattebox)) {
        filterSelections.unshift(_name8);
        if (_name8 === 'ARRI LMB 4x5 Pro Set') {
          filterSelections.push('ARRI LMB 19mm Studio Rod Adapter');
          filterSelections.push('ARRI LMB 4x5 / LMB-6 Tray Catcher');
        } else if (_name8 === 'ARRI LMB 4x5 15mm LWS Set 3-Stage') {
          filterSelections.push('ARRI LMB 19mm Studio Rod Adapter');
          filterSelections.push('ARRI LMB 4x5 / LMB-6 Tray Catcher');
          filterSelections.push('ARRI LMB 4x5 Side Flags');
          filterSelections.push('ARRI LMB Flag Holders');
          filterSelections.push('ARRI LMB 4x5 Set of Mattes spherical');
          filterSelections.push('ARRI LMB Accessory Adapter');
          filterSelections.push('ARRI Anti-Reflection Frame 4x5.65');
        } else if (_name8 === 'ARRI LMB 4x5 Clamp-On (3-Stage)') {
          filterSelections.push('ARRI LMB 4x5 / LMB-6 Tray Catcher');
          filterSelections.push('ARRI LMB 4x5 Side Flags');
          filterSelections.push('ARRI LMB Flag Holders');
          filterSelections.push('ARRI LMB 4x5 Set of Mattes spherical');
          filterSelections.push('ARRI LMB Accessory Adapter');
          filterSelections.push('ARRI Anti-Reflection Frame 4x5.65');
          filterSelections.push('ARRI LMB 4x5 Clamp Adapter Set Pro');
          var lensNames = info.lenses ? info.lenses.split(',').map(function (s) {
            return s.trim();
          }).filter(Boolean) : [];
          var diameters = _toConsumableArray(new Set(lensNames.map(function (n) {
            return devices.lenses && devices.lenses[n] && devices.lenses[n].frontDiameterMm;
          }).filter(Boolean)));
          diameters.forEach(function (d) {
            return filterSelections.push("ARRI LMB 4x5 Clamp Adapter ".concat(d, "mm"));
          });
        }
        break;
      }
    }
  }
  viewfinderExtSelections.forEach(function (vf) {
    return supportAccNoCages.push(vf);
  });
  if (isAnyScenarioActive(['Rain Machine', 'Extreme rain'])) {
    filterSelections.push('Schulz Sprayoff Micro');
    filterSelections.push('Fischer RS to D-Tap cable 0,5m');
    filterSelections.push('Fischer RS to D-Tap cable 0,5m');
    filterSelections.push('Spare Disc (Schulz Sprayoff Micro)');
  }
  var gimbalSelectionsFinal = [];
  var selectedGimbal = '';
  if (hasGimbal) {
    var gimbalSelections = info.gimbal ? info.gimbal.split(',').map(function (s) {
      return s.trim();
    }).filter(Boolean) : [];
    var bigLens = maxLensFront > 95;
    if (gimbalSelections.length) {
      gimbalSelectionsFinal = gimbalSelections.map(function (g) {
        return /Ronin RS4 Pro/i.test(g) && bigLens ? 'DJI Ronin 2' : g;
      });
      if (gimbalSelectionsFinal.length === 1) selectedGimbal = gimbalSelectionsFinal[0];
    } else {
      var _cam = devices && devices.cameras && devices.cameras[selectedNames.camera];
      var weight = _cam && _cam.weight_g;
      var isSmall = weight != null ? weight < 2000 : /(FX3|FX6|R5)/i.test(selectedNames.camera);
      selectedGimbal = bigLens ? 'DJI Ronin 2' : isSmall ? 'DJI Ronin RS4 Pro Combo' : 'DJI Ronin 2';
      gimbalSelectionsFinal = [selectedGimbal];
    }
    if (/Ronin RS4 Pro/i.test(selectedGimbal) && maxLensFront <= 95) {
      filterSelections.push('Tilta Mirage VND Kit');
      filterSelections.push('Tilta 95 mm Polarizer Filter für Tilta Mirage');
      filterSelections.push('Vaxis 95 mm IRND Filter 0.3 + 0.6 + 0.9 + 1.2 Filter');
      filterSelections.push('Vaxis 95mm Black Mist 1/4 + 1/8 Filter');
    } else {
      filterSelections.push('Arri KK.0038066 Flexible Sunshade Side Flag Holders Set');
    }
  }
  var receiverLabels = [];
  handheldPrefs.forEach(function (p) {
    return receiverLabels.push("".concat(p.role, " handheld"));
  });
  largeMonitorPrefs.forEach(function (p) {
    return receiverLabels.push("".concat(p.role, " 15-21\""));
  });
  if (hasMotor) receiverLabels.push('Focus');
  var receiverCount = receiverLabels.length;
  if (selectedNames.video) {
    monitoringSupportAcc.push('Antenna 5,8GHz 5dBi Long (spare)');
    var rxName = selectedNames.video.replace(/ TX\b/, ' RX');
    if (devices && devices.wirelessReceivers && devices.wirelessReceivers[rxName]) {
      var receivers = receiverCount || 1;
      for (var _i46 = 0; _i46 < receivers; _i46++) {
        monitoringSupportAcc.push('Antenna 5,8GHz 5dBi Long (spare)');
      }
    }
  }
  var addMonitorCables = function addMonitorCables(label) {
    monitoringSupportAcc.push("D-Tap to Lemo-2-pin Cable 0,3m (".concat(label, ")"), "D-Tap to Lemo-2-pin Cable 0,3m (".concat(label, ")"), "Ultraslim BNC Cable 0.3 m (".concat(label, ")"), "Ultraslim BNC Cable 0.3 m (".concat(label, ")"));
  };
  handheldPrefs.forEach(function (p) {
    return addMonitorCables("".concat(p.role, " handheld"));
  });
  var addLargeMonitorCables = function addLargeMonitorCables(label) {
    monitoringSupportAcc.push("D-Tap to Lemo-2-pin Cable 0,5m (".concat(label, ")"), "D-Tap to Lemo-2-pin Cable 0,5m (".concat(label, ")"), "Ultraslim BNC Cable 0.5 m (".concat(label, ")"), "Ultraslim BNC Cable 0.5 m (".concat(label, ")"));
  };
  largeMonitorPrefs.forEach(function (p) {
    return addLargeMonitorCables("".concat(p.role, " 15-21\""));
  });
  if (hasMotor) {
    monitoringSupportAcc.push('D-Tap to Mini XLR 3-pin Cable 0,3m (Focus)', 'D-Tap to Mini XLR 3-pin Cable 0,3m (Focus)', 'Ultraslim BNC Cable 0.3 m (Focus)', 'Ultraslim BNC Cable 0.3 m (Focus)');
  }
  var handleName = 'SHAPE Telescopic Handle ARRI Rosette Kit 12"';
  var addHandle = function addHandle() {
    if (!supportAccNoCages.includes(handleName)) {
      supportAccNoCages.push(handleName);
    }
  };
  if (isScenarioActive('Handheld') && isScenarioActive('Easyrig')) {
    addHandle();
  }
  if (handleSelections.includes('Hand Grips')) {
    addHandle();
  }
  if (handleSelections.includes('Handle Extension')) {
    supportAccNoCages.push('ARRI K2.0019797 HEX-3');
  }
  if (handleSelections.includes('L-Handle')) {
    supportAccNoCages.push('ARRI KK.0037820 Handle Extension Set');
  }
  var projectInfo = _objectSpread({}, info);
  var crewRoleLabels = ((_texts$currentLang43 = texts[currentLang]) === null || _texts$currentLang43 === void 0 ? void 0 : _texts$currentLang43.crewRoles) || ((_texts$en124 = texts.en) === null || _texts$en124 === void 0 ? void 0 : _texts$en124.crewRoles) || {};
  if (Array.isArray(info.people)) {
    var crewEntries = info.people.filter(function (p) {
      return p.role && p.name;
    }).map(function (p) {
      var details = [p.phone, p.email].filter(Boolean).join(', ');
      var roleLabel = crewRoleLabels[p.role] || p.role;
      return details ? "".concat(roleLabel, ": ").concat(p.name, " (").concat(details, ")") : "".concat(roleLabel, ": ").concat(p.name);
    });
    if (crewEntries.length) {
      projectInfo.crew = crewEntries.join('\n');
    }
  }
  delete projectInfo.people;
  if (Array.isArray(info.prepDays)) {
    projectInfo.prepDays = info.prepDays.join('\n');
  }
  if (Array.isArray(info.shootingDays)) {
    projectInfo.shootingDays = info.shootingDays.join('\n');
  }
  if (monitoringSettings.length) {
    projectInfo.monitoringSupport = monitoringSettings.join(', ');
  }
  delete projectInfo.monitoringSettings;
  delete projectInfo.viewfinderSettings;
  delete projectInfo.frameGuides;
  delete projectInfo.aspectMaskOpacity;
  var projectTitle = escapeHtml(info.projectName || setupNameInput.value);
  var projectLabels = ((_texts$currentLang44 = texts[currentLang]) === null || _texts$currentLang44 === void 0 ? void 0 : _texts$currentLang44.projectFields) || ((_texts$en125 = texts.en) === null || _texts$en125 === void 0 ? void 0 : _texts$en125.projectFields) || {};
  var projectFormTexts = ((_texts$currentLang45 = texts[currentLang]) === null || _texts$currentLang45 === void 0 ? void 0 : _texts$currentLang45.projectForm) || ((_texts$en126 = texts.en) === null || _texts$en126 === void 0 ? void 0 : _texts$en126.projectForm) || {};
  var excludedFields = new Set(['cameraHandle', 'viewfinderExtension', 'mattebox', 'videoDistribution', 'monitoringConfiguration', 'focusMonitor', 'tripodHeadBrand', 'tripodBowl', 'tripodTypes', 'tripodSpreader', 'sliderBowl', 'easyrig', 'lenses', 'viewfinderSettings', 'frameGuides', 'aspectMaskOpacity', 'filter', 'viewfinderEyeLeatherColor', 'directorMonitor', 'dopMonitor', 'gafferMonitor', 'directorMonitor15', 'comboMonitor15', 'dopMonitor15', 'proGaffColor1', 'proGaffWidth1', 'proGaffColor2', 'proGaffWidth2']);
  var infoEntries = Object.entries(projectInfo).filter(function (_ref64) {
    var _ref65 = _slicedToArray(_ref64, 2),
      k = _ref65[0],
      v = _ref65[1];
    return v && k !== 'projectName' && !excludedFields.has(k);
  });
  var boxesHtml = infoEntries.length ? '<div class="requirements-grid">' + infoEntries.map(function (_ref66) {
    var _ref67 = _slicedToArray(_ref66, 2),
      k = _ref67[0],
      v = _ref67[1];
    var value = escapeHtml(v).replace(/\n/g, '<br>');
    var label = projectLabels[k] || k;
    var iconHtml = iconMarkup(projectFieldIcons[k], 'req-icon');
    return "<div class=\"requirement-box\" data-field=\"".concat(k, "\">").concat(iconHtml, "<span class=\"req-label\">").concat(escapeHtml(label), "</span><span class=\"req-value\">").concat(value, "</span></div>");
  }).join('') + '</div>' : '';
  var requirementsHeading = projectFormTexts.heading || 'Project Requirements';
  var infoHtml = infoEntries.length ? "<h3>".concat(escapeHtml(requirementsHeading), "</h3>").concat(boxesHtml) : '';
  var formatItems = function formatItems(arr) {
    var counts = {};
    arr.filter(Boolean).map(addArriKNumber).forEach(function (item) {
      var match = item.trim().match(/^(.*?)(?: \(([^()]+)\))?$/);
      var base = match ? match[1].trim() : item.trim();
      var ctx = match && match[2] ? match[2].trim() : '';
      if (!counts[base]) {
        counts[base] = {
          total: 0,
          ctxCounts: {}
        };
      }
      counts[base].total++;
      counts[base].ctxCounts[ctx] = (counts[base].ctxCounts[ctx] || 0) + 1;
    });
    return Object.entries(counts).sort(function (_ref68, _ref69) {
      var _ref70 = _slicedToArray(_ref68, 1),
        a = _ref70[0];
      var _ref71 = _slicedToArray(_ref69, 1),
        b = _ref71[0];
      return a.localeCompare(b, undefined, {
        sensitivity: 'base'
      });
    }).map(function (_ref72) {
      var _gearItemTranslations;
      var _ref73 = _slicedToArray(_ref72, 2),
        base = _ref73[0],
        _ref73$ = _ref73[1],
        total = _ref73$.total,
        ctxCounts = _ref73$.ctxCounts;
      var ctxKeys = Object.keys(ctxCounts);
      var hasContext = ctxKeys.some(function (c) {
        return c;
      });
      var ctxParts = [];
      if (hasContext) {
        if (base === 'sand bag') {
          var realEntries = Object.entries(ctxCounts).filter(function (_ref74) {
            var _ref75 = _slicedToArray(_ref74, 1),
              c = _ref75[0];
            return c && c.toLowerCase() !== 'spare';
          }).sort(function (_ref76, _ref77) {
            var _ref78 = _slicedToArray(_ref76, 1),
              a = _ref78[0];
            var _ref79 = _slicedToArray(_ref77, 1),
              b = _ref79[0];
            return a.localeCompare(b, undefined, {
              sensitivity: 'base'
            });
          });
          var usedCount = realEntries.reduce(function (sum, _ref80) {
            var _ref81 = _slicedToArray(_ref80, 2),
              count = _ref81[1];
            return sum + count;
          }, 0);
          var spareCount = total - usedCount;
          ctxParts = realEntries.map(function (_ref82) {
            var _ref83 = _slicedToArray(_ref82, 2),
              c = _ref83[0],
              count = _ref83[1];
            return "".concat(count, "x ").concat(c);
          });
          if (spareCount > 0) ctxParts.push("".concat(spareCount, "x Spare"));
        } else if (base.startsWith('Bebob ')) {
          var _realEntries = Object.entries(ctxCounts).filter(function (_ref84) {
            var _ref85 = _slicedToArray(_ref84, 1),
              c = _ref85[0];
            return c && c.toLowerCase() !== 'spare';
          }).sort(function (_ref86, _ref87) {
            var _ref88 = _slicedToArray(_ref86, 1),
              a = _ref88[0];
            var _ref89 = _slicedToArray(_ref87, 1),
              b = _ref89[0];
            return a.localeCompare(b, undefined, {
              sensitivity: 'base'
            });
          });
          var _usedCount = _realEntries.reduce(function (sum, _ref90) {
            var _ref91 = _slicedToArray(_ref90, 2),
              count = _ref91[1];
            return sum + count;
          }, 0);
          var _spareCount = total - _usedCount;
          ctxParts = _realEntries.map(function (_ref92) {
            var _ref93 = _slicedToArray(_ref92, 2),
              c = _ref93[0],
              count = _ref93[1];
            return "".concat(count, "x ").concat(c);
          });
          if (_spareCount > 0) ctxParts.push("".concat(_spareCount, "x Spare"));
        } else {
          var _realEntries2 = Object.entries(ctxCounts).filter(function (_ref94) {
            var _ref95 = _slicedToArray(_ref94, 1),
              c = _ref95[0];
            return c && c.toLowerCase() !== 'spare';
          }).sort(function (_ref96, _ref97) {
            var _ref98 = _slicedToArray(_ref96, 1),
              a = _ref98[0];
            var _ref99 = _slicedToArray(_ref97, 1),
              b = _ref99[0];
            return a.localeCompare(b, undefined, {
              sensitivity: 'base'
            });
          });
          ctxParts = _realEntries2.map(function (_ref100) {
            var _ref101 = _slicedToArray(_ref100, 2),
              c = _ref101[0],
              count = _ref101[1];
            return "".concat(count, "x ").concat(c);
          });
          var _spareCount2 = Object.entries(ctxCounts).filter(function (_ref102) {
            var _ref103 = _slicedToArray(_ref102, 1),
              c = _ref103[0];
            return c && c.toLowerCase() === 'spare';
          }).reduce(function (sum, _ref104) {
            var _ref105 = _slicedToArray(_ref104, 2),
              count = _ref105[1];
            return sum + count;
          }, 0);
          if (_spareCount2 > 0) ctxParts.push("".concat(_spareCount2, "x Spare"));
        }
      }
      var ctxStr = ctxParts.length ? " (".concat(ctxParts.join(', '), ")") : '';
      var translatedBase = ((_gearItemTranslations = gearItemTranslations[currentLang]) === null || _gearItemTranslations === void 0 ? void 0 : _gearItemTranslations[base]) || base;
      var displayName = "".concat(translatedBase).concat(ctxStr);
      var dataName = "".concat(base).concat(ctxStr);
      return "<span class=\"gear-item\" data-gear-name=\"".concat(escapeHtml(dataName), "\">").concat(total, "x ").concat(escapeHtml(displayName), "</span>");
    }).join('<br>');
  };
  var ensureItems = function ensureItems(arr, categoryPath) {
    if (typeof registerDevice !== 'function') return;
    var entries = {};
    arr.filter(Boolean).forEach(function (item) {
      var match = item.trim().match(/^(.*?)(?: \(([^()]+)\))?$/);
      var base = match ? match[1].trim() : item.trim();
      entries[base] = entries[base] || {};
    });
    if (Object.keys(entries).length) {
      registerDevice(categoryPath, entries);
    }
  };
  var categoryGroups = [];
  var addRow = function addRow(cat, items) {
    categoryGroups.push("<tbody class=\"category-group\"><tr class=\"category-row\"><td>".concat(cat, "</td></tr><tr><td>").concat(items, "</td></tr></tbody>"));
  };
  addRow('Camera', formatItems([selectedNames.camera]));
  var cameraSupportText = formatItems(supportAccNoCages);
  var cageSelectHtml = '';
  if (compatibleCages.length) {
    var options = compatibleCages.map(function (c) {
      return "<option value=\"".concat(escapeHtml(c), "\"").concat(c === selectedNames.cage ? ' selected' : '', ">").concat(escapeHtml(addArriKNumber(c)), "</option>");
    }).join('');
    cageSelectHtml = "<span class=\"cage-select-wrapper\"><span>1x</span><select id=\"gearListCage\">".concat(options, "</select></span>");
  }
  addRow('Camera Support', [cameraSupportText, cageSelectHtml].filter(Boolean).join('<br>'));
  var mediaItems = '';
  var cam = devices && devices.cameras && selectedNames.camera ? devices.cameras[selectedNames.camera] : null;
  if (cam && Array.isArray(cam.recordingMedia) && cam.recordingMedia.length) {
    var sizeMap = {
      'CFexpress Type A': '320GB',
      'CFast 2.0': '512GB',
      'CFexpress Type B': '512GB',
      'Codex Compact Drive': '1TB',
      'AXS Memory A-Series slot': '1TB',
      'SD': '128GB',
      'SD Card': '128GB',
      'SDXC': '128GB',
      'XQD Card': '120GB',
      'RED MINI-MAG': '512GB',
      'REDMAG 1.8" SSD': '512GB',
      'Blackmagic Media Module': '8TB',
      'DJI PROSSD': '1TB',
      'USB-C 3.1 Gen 1 expansion port for external media': '1TB',
      'USB-C 3.1 Gen 2 expansion port for external media': '1TB',
      'USB-C to external SSD/HDD': '1TB'
    };
    mediaItems = cam.recordingMedia.slice(0, 1).map(function (m) {
      var type = m && m.type ? m.type : '';
      if (!type) return '';
      var size = '';
      if (m.notes) {
        var match = m.notes.match(/(\d+(?:\.\d+)?\s*(?:TB|GB))/i);
        if (match) size = match[1].toUpperCase();
      }
      if (!size) size = sizeMap[type] || '512GB';
      return "4x ".concat(escapeHtml(size), " ").concat(escapeHtml(type), "<br>2x ").concat(escapeHtml(type), " reader with USB-C");
    }).filter(Boolean).join('<br>');
  }
  addRow('Media', mediaItems);
  var lensDisplayNames = selectedLensNames.map(function (name) {
    var _ref106, _lens$minFocusMeters;
    var lens = devices.lenses && devices.lenses[name];
    var base = addArriKNumber(name);
    if (!lens) return base;
    var attrs = [];
    if (lens.weight_g) attrs.push("".concat(lens.weight_g, "g"));
    if (lens.clampOn) {
      if (lens.frontDiameterMm) attrs.push("".concat(lens.frontDiameterMm, "mm clamp-on"));else attrs.push('clamp-on');
    } else if (lens.clampOn === false) {
      attrs.push('no clamp-on');
    }
    var minFocus = (_ref106 = (_lens$minFocusMeters = lens.minFocusMeters) !== null && _lens$minFocusMeters !== void 0 ? _lens$minFocusMeters : lens.minFocus) !== null && _ref106 !== void 0 ? _ref106 : lens.minFocusCm ? lens.minFocusCm / 100 : null;
    if (minFocus) attrs.push("".concat(minFocus, "m min focus"));
    return attrs.length ? "".concat(base, " (").concat(attrs.join(', '), ")") : base;
  });
  addRow('Lens', formatItems(lensDisplayNames));
  var lensSupportItems = [];
  var requiredRodTypes = new Set();
  var addedRodPairs = new Set();
  selectedLensNames.forEach(function (name) {
    var lens = devices.lenses && devices.lenses[name];
    if (!lens) return;
    var rodType = lens.rodStandard || '15mm';
    var rodLength = lens.rodLengthCm || (rodType === '19mm' ? 45 : 30);
    var rodKey = "".concat(rodType, "-").concat(rodLength);
    if (!addedRodPairs.has(rodKey)) {
      lensSupportItems.push("".concat(rodType, " rods ").concat(rodLength, "cm"));
      addedRodPairs.add(rodKey);
    }
    requiredRodTypes.add(rodType);
    if (lens.needsLensSupport) {
      lensSupportItems.push("".concat(rodType, " lens support"));
    }
  });
  var cageRod = (_devices$accessories8 = devices.accessories) === null || _devices$accessories8 === void 0 || (_devices$accessories8 = _devices$accessories8.cages) === null || _devices$accessories8 === void 0 || (_devices$accessories8 = _devices$accessories8[selectedNames.cage]) === null || _devices$accessories8 === void 0 ? void 0 : _devices$accessories8.rodStandard;
  var cageRodTypes = cageRod ? Array.isArray(cageRod) ? cageRod : [cageRod] : [];
  requiredRodTypes.forEach(function (rt) {
    if (cageRodTypes.length && !cageRodTypes.includes(rt)) {
      lensSupportItems.push("".concat(glyphText(ICON_GLYPHS.warning), "\xA0cage incompatible with ").concat(rt, " rods"));
    }
  });
  addRow('Lens Support', formatItems(lensSupportItems));
  addRow('Matte box + filter', [filterSelectHtml, formatItems(filterSelections)].filter(Boolean).join('<br>'));
  var motorItems = [];
  var clmSpareAdded = {
    clm3: false,
    clm4: false,
    clm5: false
  };
  selectedNames.motors.forEach(function (name) {
    var lower = name.toLowerCase();
    if (/cforce\s*mini\s*rf|cforce\s*rf/.test(lower)) {
      motorItems.push('ARRI KK.0040345 CFORCE MINI RF Basic Set 2');
    } else if (/cforce\s*mini/.test(lower) && !/rf/.test(lower)) {
      motorItems.push('ARRI KK.0040344 Cforce Mini Basic Set 2');
    } else if (/cforce\s*plus/.test(lower)) {
      motorItems.push('Arri KK.0008824 cforce plus Basic Set');
      motorItems.push('ARRI K2.0009335 Cforce Plus Gear M0.8/32p, 60t');
    } else if (/clm-3/.test(lower)) {
      motorItems.push('Arri KK.0005854 Controlled Lens Motor CLM-3 Basic Set');
      if (!clmSpareAdded.clm3) {
        motorItems.push('Arri K2.65145.0, Cable CLM-3 (7p) - CLM/FIZ (12p) (0,8m/2.6ft) (spare)');
        clmSpareAdded.clm3 = true;
      }
    } else if (/clm-4/.test(lower)) {
      motorItems.push('ARRI Controlled Lens Motor CLM-4, Basic Kit (KK.0005855)');
      if (!clmSpareAdded.clm4) {
        motorItems.push('Arri K2.72099.0 CLM-4 Motor Cable (spare)');
        clmSpareAdded.clm4 = true;
      }
    } else if (/clm-5/.test(lower)) {
      motorItems.push('Arri K2.0006361 Controlled Lens Motor CLM-5 Basic Set');
      if (!clmSpareAdded.clm5) {
        motorItems.push('Arri K2.0006361 Controlled Lens Motor CLM-5 Basic Set (spare)');
        clmSpareAdded.clm5 = true;
      }
    } else {
      motorItems.push(name);
    }
  });
  var distanceItems = [];
  var distanceName = selectedNames.distance;
  if (distanceName) {
    var lowerName = distanceName.toLowerCase();
    if (lowerName === 'udm-1 + lcube') {
      distanceItems.push('Arri KK.0005853 Ultrasonic Distance Measure UDM-1 Basic Set');
      var hasRiaController = selectedNames.controllers.some(function (ctrl) {
        return /ria-1/i.test(ctrl);
      });
      var isAlexa35 = /alexa 35/i.test(selectedNames.camera || '');
      if (!hasRiaController && !isAlexa35) {
        distanceItems.push('Arri KK.0009001 LCUBE CUB-1 Basic Set');
      }
    } else {
      distanceItems.push(distanceName);
    }
  }
  addRow('LDS (FIZ)', formatItems([].concat(motorItems, _toConsumableArray(selectedNames.controllers), distanceItems, _toConsumableArray(fizCableAcc))));
  var batteryItems = '';
  if (selectedNames.battery) {
    var count = batteryCountElem ? parseInt(batteryCountElem.textContent, 10) : NaN;
    if (!count || isNaN(count)) count = 1;
    var safeBatt = escapeHtml(addArriKNumber(selectedNames.battery));
    batteryItems = "".concat(count, "x ").concat(safeBatt);
    var swapName = hotswapSelect && hotswapSelect.value && hotswapSelect.value !== 'None' ? getText(hotswapSelect) : '';
    if (swapName) {
      batteryItems += "<br>1x ".concat(escapeHtml(swapName));
    }
  }
  addRow('Camera Batteries', batteryItems);
  var monitoringItems = '';
  var monitorSizes = [];
  if (selectedNames.viewfinder) {
    monitoringItems += "1x <strong>Viewfinder</strong> - ".concat(escapeHtml(addArriKNumber(selectedNames.viewfinder)));
  }
  if (selectedNames.monitor) {
    var _devices12;
    var size = (_devices12 = devices) === null || _devices12 === void 0 || (_devices12 = _devices12.monitors) === null || _devices12 === void 0 || (_devices12 = _devices12[selectedNames.monitor]) === null || _devices12 === void 0 ? void 0 : _devices12.screenSizeInches;
    if (size) monitorSizes.push(size);
    var sizeHtml = size ? "".concat(size, "&quot; - ") : '';
    monitoringItems += (monitoringItems ? '<br>' : '') + "1x <strong>Onboard Monitor</strong> - ".concat(sizeHtml).concat(escapeHtml(addArriKNumber(selectedNames.monitor)), " - incl. Sunhood");
  }
  handheldPrefs.forEach(function (_ref107) {
    var role = _ref107.role,
      size = _ref107.size;
    var monitorsDb = devices && devices.monitors ? devices.monitors : {};
    var names = Object.keys(monitorsDb).filter(function (n) {
      return !monitorsDb[n].wirelessTx || monitorsDb[n].wirelessRX;
    }).sort(localeSort);
    var infoKey = role === 'DoP' ? 'dopMonitor' : "".concat(role.toLowerCase(), "Monitor");
    var defaultName = info[infoKey] && names.includes(info[infoKey]) ? info[infoKey] : names.includes('SmallHD Ultra 7') ? 'SmallHD Ultra 7' : names[0];
    if (!info[infoKey] && size) {
      var sized = names.find(function (n) {
        return monitorsDb[n].screenSizeInches === size;
      });
      if (size === 7 && names.includes('SmallHD Ultra 7')) {
        defaultName = 'SmallHD Ultra 7';
      } else if (sized) {
        defaultName = sized;
      }
    }
    var opts = names.map(function (n) {
      return "<option value=\"".concat(escapeHtml(n), "\"").concat(n === defaultName ? ' selected' : '', ">").concat(escapeHtml(addArriKNumber(n)), "</option>");
    }).join('');
    var idSuffix = role === 'DoP' ? 'Dop' : role;
    var labelRole = role.replace(/s$/, '');
    var selectedSize = devices && devices.monitors && devices.monitors[defaultName] ? devices.monitors[defaultName].screenSizeInches : '';
    monitoringItems += (monitoringItems ? '<br>' : '') + "1x <strong>".concat(labelRole, " Handheld Monitor</strong> - <span id=\"monitorSize").concat(idSuffix, "\">").concat(selectedSize, "&quot;</span> - <select id=\"gearList").concat(idSuffix, "Monitor\">").concat(opts, "</select> incl. Directors cage, shoulder strap, sunhood, rigging for teradeks");
    monitorSizes.push(selectedSize);
  });
  largeMonitorPrefs.forEach(function (_ref108) {
    var _dirDb$defaultName;
    var role = _ref108.role;
    var dirDb = devices && devices.directorMonitors ? devices.directorMonitors : {};
    var names = Object.keys(dirDb).filter(function (n) {
      return n !== 'None';
    }).sort(localeSort);
    var infoKey = role === 'DoP' ? 'dopMonitor15' : role === 'Combo' ? 'comboMonitor15' : 'directorMonitor15';
    var defaultName = info[infoKey] && names.includes(info[infoKey]) ? info[infoKey] : 'SmallHD Cine 24" 4K High-Bright Monitor';
    var opts = names.map(function (n) {
      return "<option value=\"".concat(escapeHtml(n), "\"").concat(n === defaultName ? ' selected' : '', ">").concat(escapeHtml(addArriKNumber(n)), "</option>");
    }).join('');
    var idSuffix = role === 'DoP' ? 'Dop' : role;
    var size = ((_dirDb$defaultName = dirDb[defaultName]) === null || _dirDb$defaultName === void 0 ? void 0 : _dirDb$defaultName.screenSizeInches) || '';
    monitoringItems += (monitoringItems ? '<br>' : '') + "1x <strong>".concat(role, " Monitor</strong> - <span id=\"monitorSize").concat(idSuffix, "15\">").concat(size, "&quot;</span> - <select id=\"gearList").concat(idSuffix, "Monitor15\">").concat(opts, "</select> incl. sunhood, V-Mount, AC Adapter and Wooden Camera Ultra QR Monitor Mount (Baby Pin, C-Stand)");
    if (size) monitorSizes.push(size);
  });
  if (hasMotor) {
    var _monitorsDb$defaultNa;
    var monitorsDb = devices && devices.monitors ? devices.monitors : {};
    var names = Object.keys(monitorsDb).filter(function (n) {
      return !monitorsDb[n].wirelessTx || monitorsDb[n].wirelessRX;
    }).sort(localeSort);
    var defaultName = info.focusMonitor && names.includes(info.focusMonitor) ? info.focusMonitor : names.includes('TV Logic F7HS') ? 'TV Logic F7HS' : names[0];
    var opts = names.map(function (n) {
      return "<option value=\"".concat(escapeHtml(n), "\"").concat(n === defaultName ? ' selected' : '', ">").concat(escapeHtml(addArriKNumber(n)), "</option>");
    }).join('');
    var selectedSize = ((_monitorsDb$defaultNa = monitorsDb[defaultName]) === null || _monitorsDb$defaultNa === void 0 ? void 0 : _monitorsDb$defaultNa.screenSizeInches) || '';
    monitoringItems += (monitoringItems ? '<br>' : '') + "1x <strong>Focus Monitor</strong> - <span id=\"monitorSizeFocus\">".concat(selectedSize, "&quot;</span> - <select id=\"gearListFocusMonitor\">").concat(opts, "</select> incl Directors cage, shoulder strap, sunhood, rigging for teradeks");
    if (selectedSize) monitorSizes.push(selectedSize);
  }
  var monitoringGear = [];
  var wirelessSize = monitorSizes.includes(5) ? 5 : 7;
  if (selectedNames.video) {
    monitoringGear.push("Wireless Transmitter - ".concat(wirelessSize, "&quot; - ").concat(addArriKNumber(selectedNames.video)));
    var _rxName = selectedNames.video.replace(/ TX\b/, ' RX');
    if (devices && devices.wirelessReceivers && devices.wirelessReceivers[_rxName]) {
      receiverLabels.forEach(function (label) {
        monitoringGear.push("Wireless Receiver - ".concat(wirelessSize, "&quot; - ").concat(addArriKNumber(_rxName), " (").concat(label, ")"));
      });
    }
  }
  if (monitoringGear.length) {
    var gearHtml = formatItems(monitoringGear).replace(/>(\d+x )Wireless Transmitter/g, '>$1<strong>Wireless Transmitter</strong>').replace(/>(\d+x )Wireless Receiver/g, '>$1<strong>Wireless Receiver</strong>').replace(/&amp;quot;/g, '&quot;');
    monitoringItems += (monitoringItems ? '<br>' : '') + gearHtml;
  }
  var monitoringBatteryItems = [];
  var bebob98 = Object.keys(devices.batteries || {}).find(function (n) {
    return /V98micro/i.test(n);
  }) || 'Bebob V98micro';
  handheldPrefs.forEach(function (p) {
    for (var _i47 = 0; _i47 < 3; _i47++) monitoringBatteryItems.push("".concat(bebob98, " (").concat(p.role, " handheld)"));
  });
  if (hasMotor) {
    var bebob150 = Object.keys(devices.batteries || {}).find(function (n) {
      return /V150micro/i.test(n);
    }) || 'Bebob V150micro';
    for (var _i48 = 0; _i48 < 3; _i48++) monitoringBatteryItems.push("".concat(bebob150, " (Focus)"));
  }
  var bebob290 = Object.keys(devices.batteries || {}).find(function (n) {
    return /V290RM-Cine/i.test(n);
  }) || 'Bebob V290RM-Cine';
  largeMonitorPrefs.forEach(function (p) {
    monitoringBatteryItems.push("".concat(bebob290, " (").concat(p.role, " 15-21\")"), "".concat(bebob290, " (").concat(p.role, " 15-21\")"));
  });
  addRow('Monitoring Batteries', formatItems(monitoringBatteryItems));
  addRow('Chargers', formatItems(chargersAcc));
  addRow('Monitoring', monitoringItems);
  ensureItems(monitoringSupportAcc, 'accessories.monitoringSupport');
  var monitoringSupportHardware = formatItems(monitoringSupportAcc);
  var monitoringSupportItems = monitoringSupportHardware;
  addRow('Monitoring support', monitoringSupportItems);
  var cartsTransportationItems = ['Magliner Senior - with quick release mount + tripod holder + utility tray + O‘Connor-Aufhängung'].concat(_toConsumableArray(Array(10).fill('Securing Straps (25mm wide)')), ['Loading Ramp (pair, 420kg)'], _toConsumableArray(Array(20).fill('Ring Fitting for Airline Rails')));
  ensureItems(cartsTransportationItems, 'accessories.carts');
  var gripItems = [];
  var needsStandardTripod = false;
  var sliderSelectHtml = '';
  var easyrigSelectHtml = '';
  handheldPrefs.forEach(function (p) {
    gripItems.push("Avenger C-Stand Sliding Leg 20\" (".concat(p.role, " handheld)"));
    gripItems.push("Steelfingers Wheel C-Stand 3er Set (".concat(p.role, " handheld)"));
    gripItems.push("Lite-Tite Swivel Aluminium Umbrella Adapter (".concat(p.role, " handheld)"));
    riggingAcc.push("Spigot with male 3/8\" and 1/4\" (".concat(p.role, " handheld)"));
  });
  largeMonitorPrefs.forEach(function (p) {
    gripItems.push("Matthews Monitor Stand II (249562) (".concat(p.role, " 15-21\")"));
    gripItems.push("Avenger C590 Conka Bonka Stativ-Verl\xE4ngerungen Set (".concat(p.role, " 15-21\")"));
    gripItems.push("Impact Baby to Junior Receiver Adapter (".concat(p.role, " 15-21\")"));
    gripItems.push("Matthews BIG F'ING Monitor Wheel Set (3 pieces) (".concat(p.role, " 15-21\")"));
    riggingAcc.push("ULCS Bracket with 1/4\" to 1/4\" (".concat(p.role, " 15-21\")"));
    gripItems.push("Manfrotto 635 Quick-Action Super Clamp (".concat(p.role, " 15-21\")"));
    riggingAcc.push("Spigot with male 3/8\" and 1/4\" (".concat(p.role, " 15-21\")"));
    riggingAcc.push("Cine Quick Release (".concat(p.role, " 15-21\")"));
    riggingAcc.push("D-Tap Splitter (".concat(p.role, " 15-21\")"));
    riggingAcc.push("D-Tap Splitter (".concat(p.role, " 15-21\")"));
  });
  if (hasMotor) {
    gripItems.push('Avenger C-Stand Sliding Leg 20" (Focus)');
    gripItems.push('Steelfingers Wheel C-Stand 3er Set (Focus)');
    gripItems.push('Lite-Tite Swivel Aluminium Umbrella Adapter (Focus)');
  }
  if (isScenarioActive('Easyrig')) {
    var stabiliser = devices && devices.accessories && devices.accessories.cameraStabiliser && devices.accessories.cameraStabiliser['Easyrig 5 Vario'];
    var _opts = stabiliser && Array.isArray(stabiliser.options) ? stabiliser.options : [];
    var _options = ['no further stabilisation'].concat(_toConsumableArray(_opts));
    var optsHtml = _options.map(function (o) {
      return "<option value=\"".concat(escapeHtml(o), "\">").concat(escapeHtml(addArriKNumber(o)), "</option>");
    }).join('');
    easyrigSelectHtml = "1x Easyrig 5 Vario <select id=\"gearListEasyrig\">".concat(optsHtml, "</select>");
  }
  if (hasGimbal) {
    gripItems.push.apply(gripItems, _toConsumableArray(gimbalSelectionsFinal));
  }
  var frictionArmCount = hasGimbal ? 2 : 1;
  gripItems.push.apply(gripItems, _toConsumableArray(Array(frictionArmCount).fill('Manfrotto 244N Friktion Arm')));
  if (hasGimbal) {
    gripItems.push('Avenger D200B Grip Head');
    gripItems.push('Spigot with male 3/8" and 1/4"');
  }
  if (isScenarioActive('Cine Saddle')) gripItems.push('Cinekinetic Cinesaddle');
  if (isScenarioActive('Steadybag')) gripItems.push('Steadybag');
  if (isScenarioActive('Jib')) {
    gripItems.push('Pro Sup EJIb-Arm');
    gripItems.push('Jib counter weights');
    needsStandardTripod = true;
  }
  if (isScenarioActive('Slider')) {
    var _options2 = ['', '75er bowl', '100er bowl', '150er bowl', 'Mitchell Mount'].map(function (o) {
      return "<option value=\"".concat(escapeHtml(o), "\"").concat(o === info.sliderBowl ? ' selected' : '', ">").concat(escapeHtml(addArriKNumber(o)), "</option>");
    }).join('');
    sliderSelectHtml = "1x Prosup Tango Roller <select id=\"gearListSliderBowl\">".concat(_options2, "</select>");
    gripItems.push('Avenger Combo Stand 10 A1010CS 64-100 cm black');
    gripItems.push('Avenger Combo Stand 10 A1010CS 64-100 cm black');
    gripItems.push('Avenger Combo Stand 20 A1020B 110-198 cm black');
    gripItems.push('Avenger Combo Stand 20 A1020B 110-198 cm black');
    gripItems.push('Apple Box Set / Bühnenkisten Set');
    gripItems.push('Apple Box Set / Bühnenkisten Set');
    gripItems.push('Paganini set');
    gripItems.push('Sand bag (Slider)');
    gripItems.push('Sand bag (Slider)');
    gripItems.push('Cable mat');
    gripItems.push('Cable mat');
    gripItems.push('Cable mat');
  }
  if (isScenarioActive('Slider') && isScenarioActive('Undersling mode')) {
    gripItems.push('Tango Beam');
  }
  if (isScenarioActive('Outdoor')) {
    riggingAcc.push('Spigot with male 3/8" and 1/4" (Focus Umbrella)');
  }
  if (isAnyScenarioActive(['Extreme heat', 'Extreme rain', 'Rain Machine'])) {
    gripItems.push('Large Umbrella');
    gripItems.push('Avenger A5036CS Roller 36 Low Base with Umbrella Mounting');
  }
  var tripodTypes = info.tripodTypes ? info.tripodTypes.split(',').map(function (s) {
    return s.trim();
  }).filter(Boolean) : [];
  var bowlType = info.tripodBowl;
  var spreader = info.tripodSpreader;
  var headBrand = info.tripodHeadBrand;
  var headMap = {
    'OConnor': {
      '100mm bowl': "O'Connor Ultimate 1040 Fluid-Head",
      '150mm bowl': "O'Connor Ultimate 2560 Fluid-Head",
      'Mitchell Mount': "O'Connor Ultimate 2560 Fluid-Head"
    },
    'Sachtler': {
      '75mm bowl': 'Sachtler aktiv8T S2068T',
      '100mm bowl': 'Sachtler aktiv18T S2088T',
      '150mm bowl': 'Sachtler Cine 30 3007'
    }
  };
  var headName = headMap[headBrand] && headMap[headBrand][bowlType];
  if (headName) {
    gripItems.push("".concat(headName, " ").concat(bowlType));
  }
  tripodTypes.forEach(function (t) {
    var base = bowlType ? "".concat(bowlType, " ").concat(t) : t;
    if (t === 'Hi-Head') {
      gripItems.push(base);
    } else if (spreader) {
      gripItems.push("".concat(base, " + ").concat(spreader));
    } else {
      gripItems.push(base);
    }
    if (t === 'Frog Tripod') {
      gripItems.push('Sand bag (Frog Tripod)');
    }
    if (t === 'Hi-Head') {
      gripItems.push('Sand bag (Hi-Head)');
    }
  });
  if (needsStandardTripod && !gripItems.some(function (item) {
    return /Standard Tripod/.test(item);
  })) {
    gripItems.push('Standard Tripod');
  }
  var standCount = gripItems.filter(function (item) {
    return /\bstand\b/i.test(item) && !/wheel/i.test(item);
  }).length;
  if (standCount) {
    gripItems.push.apply(gripItems, _toConsumableArray(Array(standCount * 3).fill('Tennis ball')));
  }
  var maglinerCount = cartsTransportationItems.filter(function (item) {
    return /Magliner/i.test(item);
  }).length;
  if (maglinerCount) {
    gripItems.push.apply(gripItems, _toConsumableArray(Array(maglinerCount * 2).fill('Wooden wedge')));
  }
  ensureItems(riggingAcc, 'accessories.rigging');
  ensureItems(gripItems, 'accessories.grip');
  var riggingItems = formatItems(riggingAcc);
  addRow('Rigging', riggingItems);
  var powerItems = ['Power Cable Drum 25-50 m'].concat(_toConsumableArray(Array(2).fill('Power Cable 10 m')), _toConsumableArray(Array(2).fill('Power Cable 5 m')), _toConsumableArray(Array(3).fill('Power Strip')), _toConsumableArray(Array(3).fill('PRCD-S (Portable Residual Current Device-Safety)')), _toConsumableArray(Array(3).fill('Power Three Way Splitter')));
  if (isScenarioActive('Studio')) {
    powerItems.push('Camera Power Supply');
  }
  ensureItems(powerItems, 'accessories.power');
  addRow('Power', formatItems(powerItems));
  addRow('Grip', [sliderSelectHtml, formatItems(gripItems), easyrigSelectHtml].filter(Boolean).join('<br>'));
  addRow('Carts and Transportation', formatItems(cartsTransportationItems));
  var miscExcluded = new Set(['D-Tap to LEMO 2-pin', 'HDMI Cable', 'BNC SDI Cable', 'Ultraslim BNC Cable 0.5 m']);
  var miscItems = _toConsumableArray(miscAcc).filter(function (item) {
    return !miscExcluded.has(item);
  });
  var consumables = [];
  var hasViewfinder = Array.isArray(cam === null || cam === void 0 ? void 0 : cam.viewfinder) && cam.viewfinder.length > 0;
  var eyeLeatherColor = info.viewfinderEyeLeatherColor || 'red';
  var gaffTapeSelections = [{
    id: 1,
    color: info.proGaffColor1 || 'red',
    width: info.proGaffWidth1 || '24mm'
  }, {
    id: 2,
    color: info.proGaffColor2 || 'blue',
    width: info.proGaffWidth2 || '24mm'
  }];
  var baseConsumables = [{
    name: 'Kimtech Wipes',
    count: 1
  }, {
    name: 'Sprigs Red 1/4"',
    count: 1,
    noScale: true
  }, {
    name: 'Clapper Stick',
    count: 2,
    klappen: true
  }];
  var eyeLeatherCount = hasViewfinder ? 2 : 0;
  var shootDays = 0;
  var isWinterShoot = false;
  var shootRanges = Array.isArray(info.shootingDays) ? info.shootingDays : info.shootingDays ? [info.shootingDays] : [];
  var winterMonths = new Set([9, 10, 11, 0, 1, 2, 3, 4]);
  shootRanges.forEach(function (r) {
    var parts = r.split(' to ');
    if (parts.length === 2) {
      var start = new Date(parts[0]);
      var end = new Date(parts[1]);
      if (!isNaN(start) && !isNaN(end)) {
        shootDays += Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
        if (!isWinterShoot) {
          var m = new Date(start);
          m.setHours(0, 0, 0, 0);
          while (m <= end) {
            if (winterMonths.has(m.getMonth())) {
              isWinterShoot = true;
              break;
            }
            m.setMonth(m.getMonth() + 1);
          }
        }
      }
    }
  });
  var multiplier = 1;
  if (shootDays > 21) {
    multiplier = 4;
  } else if (shootDays > 14) {
    multiplier = 3;
  } else if (shootDays > 7) {
    multiplier = 2;
  }
  var klappenMultiplier = multiplier % 2 === 0 ? multiplier : Math.max(1, multiplier - 1);
  for (var _i49 = 0, _baseConsumables = baseConsumables; _i49 < _baseConsumables.length; _i49++) {
    var item = _baseConsumables[_i49];
    var _count2 = item.count;
    if (item.noScale) {} else if (item.klappen) {
      _count2 *= klappenMultiplier;
    } else {
      _count2 *= multiplier;
    }
    for (var _i50 = 0; _i50 < _count2; _i50++) consumables.push(item.name);
  }
  if (eyeLeatherCount) eyeLeatherCount *= multiplier;
  var needsRainProtection = isAnyScenarioActive(['Outdoor', 'Extreme rain', 'Rain Machine']);
  if (needsRainProtection && selectedNames.camera) {
    miscItems.push("Rain Cover ".concat(addArriKNumber(selectedNames.camera)));
  }
  var needsUmbrellas = needsRainProtection || isScenarioActive('Extreme heat');
  if (needsUmbrellas) {
    if (!miscItems.includes('Umbrella for Focus Monitor')) miscItems.push('Umbrella for Focus Monitor');
    if (!miscItems.includes('Umbrella Magliner incl Mounting to Magliner')) miscItems.push('Umbrella Magliner incl Mounting to Magliner');
  }
  if (needsRainProtection) {
    var _monitorSizes = [];
    if (monitorSelect && monitorSelect.value) {
      var m = devices.monitors[monitorSelect.value];
      if (m && m.screenSizeInches) _monitorSizes.push(m.screenSizeInches);
    }
    var monitorsAbove10 = _monitorSizes.filter(function (s) {
      return s > 10;
    }).length;
    var monitorsUnder10 = _monitorSizes.filter(function (s) {
      return s <= 10;
    }).length;
    for (var _i51 = 0; _i51 < monitorsAbove10 + 2; _i51++) consumables.push('CapIt Large');
    for (var _i52 = 0; _i52 < monitorsUnder10 + 3; _i52++) consumables.push('CapIt Medium');
    for (var _i53 = 0; _i53 < 3; _i53++) consumables.push('CapIt Small');
    for (var _i54 = 0; _i54 < 10; _i54++) consumables.push('Duschhaube');
    consumables.push('Magliner Rain Cover Transparent');
  }
  var needsHairDryer = isWinterShoot && isScenarioActive('Outdoor') || isScenarioActive('Extreme cold (snow)');
  var needsHandAndFeetWarmers = isScenarioActive('Extreme cold (snow)');
  if (needsHairDryer) {
    miscItems.push('Hair Dryer');
    if (["Sony Venice 2", "Sony Venice"].includes(selectedNames.camera)) {
      miscItems.push('Denz C0100072 Shut-Eye Heater für Sony');
    } else if (["Arri Alexa Mini", "Arri Amira"].includes(selectedNames.camera)) {
      miscItems.push('Arri K2.0003898 Heated Eyecup HE-7 for the MVF-1');
    }
  }
  if (needsHandAndFeetWarmers) {
    var warmersCount = Math.max(shootDays, 1) * 2;
    for (var _i55 = 0; _i55 < warmersCount; _i55++) miscItems.push('Hand Warmers');
    for (var _i56 = 0; _i56 < warmersCount; _i56++) miscItems.push('Feet Warmers');
  }
  var gaffColors = [['red', 'Red'], ['blue', 'Blue'], ['green', 'Green'], ['yellow', 'Yellow'], ['black', 'Black'], ['pink', 'Pink'], ['orange', 'Orange'], ['violette', 'Violette'], ['white', 'White']];
  var gaffWidths = ['6mm', '12mm', '19mm', '24mm', '48mm'];
  var proGaffCount = multiplier;
  var proGaffHtml = gaffTapeSelections.map(function (_ref109) {
    var id = _ref109.id,
      color = _ref109.color,
      width = _ref109.width;
    var colorOpts = gaffColors.map(function (_ref110) {
      var _ref111 = _slicedToArray(_ref110, 2),
        val = _ref111[0],
        label = _ref111[1];
      return "<option value=\"".concat(val, "\"").concat(val === color ? ' selected' : '', ">").concat(label, "</option>");
    }).join('');
    var widthOpts = gaffWidths.map(function (val) {
      return "<option value=\"".concat(val, "\"").concat(val === width ? ' selected' : '', ">").concat(val, "</option>");
    }).join('');
    return "<span class=\"gear-item\" data-gear-name=\"Pro Gaff Tape\">".concat(proGaffCount, "x Pro Gaff Tape <select id=\"gearListProGaffColor").concat(id, "\">").concat(colorOpts, "</select> <select id=\"gearListProGaffWidth").concat(id, "\">").concat(widthOpts, "</select></span>");
  }).join('<br>');
  var eyeLeatherHtml = '';
  if (eyeLeatherCount) {
    var colors = [['red', 'Red'], ['blue', 'Blue'], ['natural', 'Natural'], ['green', 'Green'], ['purple', 'Purple'], ['orange', 'Orange'], ['gray', 'Gray'], ['yellow', 'Yellow'], ['jaguar', 'Jaguar'], ['killer bee', 'Killer Bee'], ['green rabbit', 'Green Rabbit'], ['black', 'Black']];
    var _options3 = colors.map(function (_ref112) {
      var _ref113 = _slicedToArray(_ref112, 2),
        val = _ref113[0],
        label = _ref113[1];
      return "<option value=\"".concat(val, "\"").concat(val === eyeLeatherColor ? ' selected' : '', ">").concat(label, "</option>");
    }).join('');
    eyeLeatherHtml = "<span class=\"gear-item\" data-gear-name=\"Bluestar eye leather made of microfiber oval, large\">".concat(eyeLeatherCount, "x Bluestar eye leather made of microfiber oval, large <select id=\"gearListEyeLeatherColor\">").concat(_options3, "</select></span>");
  }
  addRow('Miscellaneous', formatItems(miscItems));
  addRow('Consumables', [eyeLeatherHtml, proGaffHtml, formatItems(consumables)].filter(Boolean).join('<br>'));
  var body = "<h2>".concat(projectTitle, "</h2>");
  if (infoHtml) body += infoHtml;
  var tableHtml = '<table class="gear-table">' + categoryGroups.join('') + '</table>';
  var adjustedTable = applyAutoGearRulesToTableHtml(tableHtml, info);
  body += '<h3>Gear List</h3>' + adjustedTable;
  return body;
}
function getCurrentGearListHtml() {
  if (!gearListOutput && !projectRequirementsOutput) return '';
  var projHtml = '';
  if (projectRequirementsOutput) {
    var projClone = projectRequirementsOutput.cloneNode(true);
    var editBtn = projClone.querySelector('#editProjectBtn');
    if (editBtn) editBtn.remove();
    var t = projClone.querySelector('h2');
    if (t) t.remove();
    projHtml = projClone.innerHTML.trim();
  }
  var gearHtml = '';
  if (gearListOutput) {
    var clone = gearListOutput.cloneNode(true);
    var actions = clone.querySelector('#gearListActions');
    if (actions) actions.remove();
    var _editBtn = clone.querySelector('#editProjectBtn');
    if (_editBtn) _editBtn.remove();
    ['Director', 'Dop', 'Gaffer', 'Focus'].forEach(function (role) {
      var sel = clone.querySelector("#gearList".concat(role, "Monitor"));
      if (sel) {
        var originalSel = gearListOutput.querySelector("#gearList".concat(role, "Monitor"));
        var val = originalSel ? originalSel.value : sel.value;
        Array.from(sel.options).forEach(function (opt) {
          if (opt.value === val) {
            opt.setAttribute('selected', '');
          } else {
            opt.removeAttribute('selected');
          }
        });
      }
    });
    ['Director', 'Combo', 'Dop'].forEach(function (role) {
      var sel = clone.querySelector("#gearList".concat(role, "Monitor15"));
      if (sel) {
        var originalSel = gearListOutput.querySelector("#gearList".concat(role, "Monitor15"));
        var val = originalSel ? originalSel.value : sel.value;
        Array.from(sel.options).forEach(function (opt) {
          if (opt.value === val) {
            opt.setAttribute('selected', '');
          } else {
            opt.removeAttribute('selected');
          }
        });
      }
    });
    var cageSel = clone.querySelector('#gearListCage');
    if (cageSel) {
      var originalSel = gearListOutput.querySelector('#gearListCage');
      var val = originalSel ? originalSel.value : cageSel.value;
      Array.from(cageSel.options).forEach(function (opt) {
        if (opt.value === val) {
          opt.setAttribute('selected', '');
        } else {
          opt.removeAttribute('selected');
        }
      });
    }
    var easyrigSel = clone.querySelector('#gearListEasyrig');
    if (easyrigSel) {
      var _originalSel = gearListOutput.querySelector('#gearListEasyrig');
      var _val = _originalSel ? _originalSel.value : easyrigSel.value;
      Array.from(easyrigSel.options).forEach(function (opt) {
        if (opt.value === _val) {
          opt.setAttribute('selected', '');
        } else {
          opt.removeAttribute('selected');
        }
      });
    }
    var sliderSel = clone.querySelector('#gearListSliderBowl');
    if (sliderSel) {
      var _originalSel2 = gearListOutput.querySelector('#gearListSliderBowl');
      var _val2 = _originalSel2 ? _originalSel2.value : sliderSel.value;
      Array.from(sliderSel.options).forEach(function (opt) {
        if (opt.value === _val2) {
          opt.setAttribute('selected', '');
        } else {
          opt.removeAttribute('selected');
        }
      });
    }
    var eyeSel = clone.querySelector('#gearListEyeLeatherColor');
    if (eyeSel) {
      var _originalSel3 = gearListOutput.querySelector('#gearListEyeLeatherColor');
      var _val3 = _originalSel3 ? _originalSel3.value : eyeSel.value;
      Array.from(eyeSel.options).forEach(function (opt) {
        if (opt.value === _val3) {
          opt.setAttribute('selected', '');
        } else {
          opt.removeAttribute('selected');
        }
      });
    }
    [1, 2].forEach(function (i) {
      var colorSel = clone.querySelector("#gearListProGaffColor".concat(i));
      if (colorSel) {
        var _originalSel4 = gearListOutput.querySelector("#gearListProGaffColor".concat(i));
        var _val4 = _originalSel4 ? _originalSel4.value : colorSel.value;
        Array.from(colorSel.options).forEach(function (opt) {
          if (opt.value === _val4) {
            opt.setAttribute('selected', '');
          } else {
            opt.removeAttribute('selected');
          }
        });
      }
      var widthSel = clone.querySelector("#gearListProGaffWidth".concat(i));
      if (widthSel) {
        var _originalSel5 = gearListOutput.querySelector("#gearListProGaffWidth".concat(i));
        var _val5 = _originalSel5 ? _originalSel5.value : widthSel.value;
        Array.from(widthSel.options).forEach(function (opt) {
          if (opt.value === _val5) {
            opt.setAttribute('selected', '');
          } else {
            opt.removeAttribute('selected');
          }
        });
      }
    });
    clone.querySelectorAll('input[type="checkbox"]').forEach(function (cb) {
      if (cb.checked) {
        cb.setAttribute('checked', '');
      } else {
        cb.removeAttribute('checked');
      }
    });
    var table = clone.querySelector('.gear-table');
    gearHtml = table ? '<h3>Gear List</h3>' + table.outerHTML : '';
  }
  if (!projHtml && !gearHtml) return '';
  var projectName = getCurrentProjectName();
  var titleHtml = projectName ? "<h2>".concat(projectName, "</h2>") : '';
  return "".concat(titleHtml).concat(projHtml).concat(gearHtml).trim();
}
function getGearListSelectors() {
  if (!gearListOutput) return {};
  var selectors = {};
  gearListOutput.querySelectorAll('select[id]').forEach(function (sel) {
    selectors[sel.id] = sel.multiple ? Array.from(sel.selectedOptions).map(function (o) {
      return o.value;
    }) : sel.value;
  });
  return selectors;
}
function applyGearListSelectors(selectors) {
  if (!gearListOutput || !selectors) return;
  Object.entries(selectors).forEach(function (_ref114) {
    var _ref115 = _slicedToArray(_ref114, 2),
      id = _ref115[0],
      value = _ref115[1];
    var sel = gearListOutput.querySelector("#".concat(id));
    if (sel) {
      if (sel.multiple) {
        var vals = Array.isArray(value) ? value : [value];
        Array.from(sel.options).forEach(function (opt) {
          opt.selected = vals.includes(opt.value);
        });
        sel.dispatchEvent(new Event('change'));
      } else {
        sel.value = value;
        sel.dispatchEvent(new Event('change'));
      }
    }
  });
}
function saveCurrentGearList() {
  var html = getCurrentGearListHtml();
  var info = projectForm ? collectProjectFormData() : {};
  info.sliderBowl = getSliderBowlValue();
  info.easyrig = getEasyrigValue();
  currentProjectInfo = deriveProjectInfo(info);
  var projectName = getCurrentProjectName();
  var projectRules = getProjectScopedAutoGearRules();
  if (typeof saveProject === 'function') {
    var payload = {
      projectInfo: currentProjectInfo,
      gearList: html
    };
    if (projectRules && projectRules.length) {
      payload.autoGearRules = projectRules;
    }
    saveProject(projectName, payload);
  }
  if (!projectName) return;
  var setups = getSetups();
  var existing = setups[projectName];
  if (!existing && !html && !currentProjectInfo && !(projectRules && projectRules.length)) {
    return;
  }
  var setup = existing || {};
  var changed = false;
  if (html) {
    if (setup.gearList !== html) {
      setup.gearList = html;
      changed = true;
    }
  } else if (Object.prototype.hasOwnProperty.call(setup, 'gearList')) {
    delete setup.gearList;
    changed = true;
  }
  if (currentProjectInfo) {
    if (setup.projectInfo !== currentProjectInfo) {
      setup.projectInfo = currentProjectInfo;
      changed = true;
    }
  } else if (Object.prototype.hasOwnProperty.call(setup, 'projectInfo')) {
    delete setup.projectInfo;
    changed = true;
  }
  var existingRules = setup.autoGearRules;
  var existingRulesSig = existingRules && existingRules.length ? stableStringify(existingRules) : '';
  var newRulesSig = projectRules && projectRules.length ? stableStringify(projectRules) : '';
  if (newRulesSig) {
    if (existingRulesSig !== newRulesSig) {
      setup.autoGearRules = projectRules;
      changed = true;
    }
  } else if (Object.prototype.hasOwnProperty.call(setup, 'autoGearRules')) {
    delete setup.autoGearRules;
    changed = true;
  }
  if (!existing) {
    setups[projectName] = setup;
    storeSetups(setups);
  } else if (changed) {
    setups[projectName] = setup;
    storeSetups(setups);
  }
}
function deleteCurrentGearList() {
  if (!confirm(texts[currentLang].confirmDeleteGearList)) return;
  if (!confirm(texts[currentLang].confirmDeleteGearListAgain)) return;
  var backupName = ensureAutoBackupBeforeDeletion('delete gear list');
  if (!backupName) return;
  var projectName = getCurrentProjectName();
  var storageKey = typeof projectName === 'string' ? projectName : '';
  if (typeof deleteProject === 'function') {
    deleteProject(storageKey);
  } else if (typeof saveProject === 'function') {
    saveProject(storageKey, {
      projectInfo: null,
      gearList: ''
    });
  }
  var setups = getSetups();
  if (setups && _typeof(setups) === 'object') {
    var existingSetup = setups[storageKey];
    if (existingSetup && _typeof(existingSetup) === 'object') {
      var changed = false;
      if (Object.prototype.hasOwnProperty.call(existingSetup, 'gearList')) {
        delete existingSetup.gearList;
        changed = true;
      }
      if (Object.prototype.hasOwnProperty.call(existingSetup, 'projectInfo')) {
        delete existingSetup.projectInfo;
        changed = true;
      }
      if (Object.prototype.hasOwnProperty.call(existingSetup, 'autoGearRules')) {
        delete existingSetup.autoGearRules;
        changed = true;
      }
      if (changed) {
        storeSetups(setups);
      }
    }
  }
  if (gearListOutput) {
    gearListOutput.innerHTML = '';
    gearListOutput.classList.add('hidden');
  }
  if (projectRequirementsOutput) {
    projectRequirementsOutput.innerHTML = '';
    projectRequirementsOutput.classList.add('hidden');
  }
  currentProjectInfo = null;
  if (projectForm) populateProjectForm({});
  storeSession({
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
    batteryPlate: batteryPlateSelect ? batteryPlateSelect.value : '',
    battery: batterySelect ? batterySelect.value : '',
    batteryHotswap: hotswapSelect ? hotswapSelect.value : '',
    sliderBowl: getSliderBowlValue(),
    easyrig: getEasyrigValue(),
    projectInfo: null
  });
  if (typeof autoSaveCurrentSetup === 'function') {
    autoSaveCurrentSetup();
    if (storageKey) {
      var setupsAfterSave = getSetups();
      var savedSetup = setupsAfterSave && setupsAfterSave[storageKey];
      if (savedSetup && _typeof(savedSetup) === 'object') {
        var resaved = false;
        if (Object.prototype.hasOwnProperty.call(savedSetup, 'gearList')) {
          delete savedSetup.gearList;
          resaved = true;
        }
        if (Object.prototype.hasOwnProperty.call(savedSetup, 'projectInfo')) {
          delete savedSetup.projectInfo;
          resaved = true;
        }
        if (resaved) {
          storeSetups(setupsAfterSave);
        }
      }
    }
  }
  currentProjectInfo = null;
  updateGearListButtonVisibility();
}
function ensureGearListActions() {
  if (!gearListOutput) return;
  var actions = document.getElementById('gearListActions');
  if (!actions) {
    actions = document.createElement('div');
    actions.id = 'gearListActions';
    var _deleteBtn = document.createElement('button');
    _deleteBtn.id = 'deleteGearListBtn';
    var _autoSaveNote = document.createElement('p');
    _autoSaveNote.id = 'gearListAutosaveNote';
    _autoSaveNote.className = 'gear-list-autosave-note';
    actions.append(_deleteBtn, _autoSaveNote);
    gearListOutput.appendChild(actions);
    _deleteBtn.addEventListener('click', deleteCurrentGearList);
  }
  var deleteBtn = document.getElementById('deleteGearListBtn');
  var autoSaveNote = document.getElementById('gearListAutosaveNote');
  var deleteHelp = texts[currentLang].deleteGearListBtnHelp || texts[currentLang].deleteGearListBtn;
  if (autoSaveNote) {
    var noteText = texts[currentLang].gearListAutosaveNote || 'Gear lists save automatically with the project.';
    autoSaveNote.textContent = noteText;
    autoSaveNote.setAttribute('title', noteText);
    autoSaveNote.setAttribute('data-help', noteText);
  }
  if (deleteBtn) {
    deleteBtn.textContent = texts[currentLang].deleteGearListBtn;
    deleteBtn.setAttribute('title', deleteHelp);
    deleteBtn.setAttribute('data-help', deleteHelp);
  }
  if (!gearListOutput._filterListenerBound) {
    gearListOutput.addEventListener('change', function (e) {
      var target = e.target;
      if (target && target.matches('select')) {
        adjustGearListSelectWidth(target);
      }
      var shouldSync = false;
      if (target.matches('.filter-values-container input[type="checkbox"]')) {
        var container = target.closest('.filter-values-container');
        var storageId = container && container.getAttribute('data-storage-values');
        var sel = container && container.querySelector('select');
        if (target.checked) {
          target.setAttribute('checked', '');
        } else {
          target.removeAttribute('checked');
        }
        if (storageId) {
          syncGearListFilterValue(storageId, target.value, target.checked);
        } else if (sel) {
          var opt = Array.from(sel.options).find(function (opt) {
            return opt.value === target.value;
          });
          if (opt) opt.selected = target.checked;
          sel.dispatchEvent(new Event('change'));
        }
        shouldSync = true;
      } else if (target.matches('select[data-storage-id]')) {
        var _storageId = target.getAttribute('data-storage-id');
        if (_storageId) {
          syncGearListFilterSize(_storageId, target.value);
        }
        shouldSync = true;
      } else if (target.id && target.id.startsWith('filter-size-')) {
        shouldSync = true;
      } else if (target.id && target.id.startsWith('filter-values-')) {
        shouldSync = true;
      } else if (target.matches('input, select, textarea') && !target.closest('#gearListActions')) {
        shouldSync = true;
      }
      if (shouldSync) {
        saveCurrentGearList();
        saveCurrentSession();
        checkSetupChanged();
      }
    });
    gearListOutput._filterListenerBound = true;
  }
  if (!gearListOutput._inputListenerBound) {
    gearListOutput.addEventListener('input', function (e) {
      var target = e.target;
      if (!target) return;
      if (target.closest('#gearListActions')) return;
      if (target.matches('input, textarea')) {
        saveCurrentGearList();
        saveCurrentSession();
        checkSetupChanged();
      }
    });
    gearListOutput._inputListenerBound = true;
  }
}
function bindGearListCageListener() {
  if (!gearListOutput) return;
  var sel = gearListOutput.querySelector('#gearListCage');
  if (sel) {
    sel.addEventListener('change', function (e) {
      if (cageSelect) {
        cageSelect.value = e.target.value;
        cageSelect.dispatchEvent(new Event('change'));
      }
      saveCurrentGearList();
    });
  }
}
function bindGearListEasyrigListener() {
  if (!gearListOutput) return;
  var sel = gearListOutput.querySelector('#gearListEasyrig');
  if (sel) {
    sel.addEventListener('change', function () {
      saveCurrentGearList();
      saveCurrentSession();
      checkSetupChanged();
    });
  }
}
function bindGearListSliderBowlListener() {
  if (!gearListOutput) return;
  var sel = gearListOutput.querySelector('#gearListSliderBowl');
  if (sel) {
    sel.addEventListener('change', function () {
      saveCurrentGearList();
      saveCurrentSession();
      checkSetupChanged();
    });
  }
}
function bindGearListEyeLeatherListener() {
  if (!gearListOutput) return;
  var sel = gearListOutput.querySelector('#gearListEyeLeatherColor');
  if (sel) {
    sel.addEventListener('change', function () {
      saveCurrentGearList();
    });
  }
}
function bindGearListProGaffTapeListener() {
  if (!gearListOutput) return;
  [1, 2].forEach(function (i) {
    var colorSel = gearListOutput.querySelector("#gearListProGaffColor".concat(i));
    var widthSel = gearListOutput.querySelector("#gearListProGaffWidth".concat(i));
    [colorSel, widthSel].forEach(function (sel) {
      if (sel) {
        sel.addEventListener('change', function () {
          saveCurrentGearList();
        });
      }
    });
  });
}
function bindGearListDirectorMonitorListener() {
  if (!gearListOutput) return;
  ['Director', 'Dop', 'Gaffer', 'Focus'].forEach(function (role) {
    var sel = gearListOutput.querySelector("#gearList".concat(role, "Monitor"));
    if (sel) {
      sel.addEventListener('change', function () {
        var monitorInfo = devices && devices.monitors && devices.monitors[sel.value];
        var span = gearListOutput.querySelector("#monitorSize".concat(role));
        if (span && monitorInfo && monitorInfo.screenSizeInches) {
          span.textContent = "".concat(monitorInfo.screenSizeInches, "\"");
        }
        saveCurrentGearList();
        saveCurrentSession();
        checkSetupChanged();
      });
    }
  });
  ['Director', 'Combo', 'Dop'].forEach(function (role) {
    var sel = gearListOutput.querySelector("#gearList".concat(role, "Monitor15"));
    if (sel) {
      sel.addEventListener('change', function () {
        var monitorInfo = devices && devices.directorMonitors && devices.directorMonitors[sel.value];
        var span = gearListOutput.querySelector("#monitorSize".concat(role, "15"));
        if (span && monitorInfo && monitorInfo.screenSizeInches) {
          span.textContent = "".concat(monitorInfo.screenSizeInches, "\"");
        }
        saveCurrentGearList();
        saveCurrentSession();
        checkSetupChanged();
      });
    }
  });
}
function refreshGearListIfVisible() {
  if (!gearListOutput || gearListOutput.classList.contains('hidden')) return;
  if (restoringSession) return;
  if (skipNextGearListRefresh) {
    skipNextGearListRefresh = false;
    return;
  }
  if (projectForm) {
    populateRecordingResolutionDropdown(currentProjectInfo && currentProjectInfo.recordingResolution);
    populateSensorModeDropdown(currentProjectInfo && currentProjectInfo.sensorMode);
    populateCodecDropdown(currentProjectInfo && currentProjectInfo.codec);
    var info = collectProjectFormData();
    info.sliderBowl = getSliderBowlValue();
    info.easyrig = getEasyrigValue();
    currentProjectInfo = deriveProjectInfo(info);
  } else {
    var _info = {
      sliderBowl: getSliderBowlValue(),
      easyrig: getEasyrigValue()
    };
    currentProjectInfo = deriveProjectInfo(_info);
  }
  var html = generateGearListHtml(currentProjectInfo || {});
  if (currentProjectInfo) {
    displayGearAndRequirements(html);
  } else {
    var _splitGearListHtml3 = splitGearListHtml(html),
      gearHtml = _splitGearListHtml3.gearHtml;
    gearListOutput.innerHTML = gearHtml;
  }
  ensureGearListActions();
  bindGearListCageListener();
  bindGearListEasyrigListener();
  bindGearListSliderBowlListener();
  bindGearListEyeLeatherListener();
  bindGearListProGaffTapeListener();
  bindGearListDirectorMonitorListener();
  saveCurrentSession();
}
function saveCurrentSession() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (restoringSession) return;
  var info = projectForm ? collectProjectFormData() : {};
  info.sliderBowl = getSliderBowlValue();
  info.easyrig = getEasyrigValue();
  currentProjectInfo = deriveProjectInfo(info);
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
    batteryPlate: batteryPlateSelect ? batteryPlateSelect.value : '',
    battery: batterySelect ? batterySelect.value : '',
    batteryHotswap: hotswapSelect ? hotswapSelect.value : '',
    sliderBowl: info.sliderBowl,
    easyrig: info.easyrig,
    projectInfo: currentProjectInfo
  };
  storeSession(state);
  if (!options.skipGearList) {
    saveCurrentGearList();
  }
}
function autoSaveCurrentSetup() {
  if (!setupNameInput) return;
  var name = setupNameInput.value.trim();
  if (!name) {
    saveCurrentSession({
      skipGearList: true
    });
    checkSetupChanged();
    return;
  }
  var selectedName = setupSelect ? setupSelect.value : '';
  if (setupSelect && (!selectedName || name !== selectedName)) {
    saveCurrentSession({
      skipGearList: true
    });
    checkSetupChanged();
    return;
  }
  var currentSetup = _objectSpread({}, getCurrentSetupState());
  var gearListHtml = getCurrentGearListHtml();
  if (gearListHtml) {
    currentSetup.gearList = gearListHtml;
  }
  var setups = getSetups();
  setups[name] = currentSetup;
  storeSetups(setups);
  populateSetupSelect();
  if (setupSelect) setupSelect.value = name;
  saveCurrentSession();
  storeLoadedSetupState(getCurrentSetupState());
  checkSetupChanged();
}
var projectAutoSaveTimer = null;
function runProjectAutoSave() {
  if (restoringSession) return;
  projectAutoSaveTimer = null;
  var hasSetupName = Boolean(setupNameInput && setupNameInput.value.trim());
  if (!hasSetupName) {
    saveCurrentSession();
  }
  autoSaveCurrentSetup();
  saveCurrentGearList();
}
function scheduleProjectAutoSave() {
  var immediate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  if (restoringSession) {
    if (projectAutoSaveTimer) {
      clearTimeout(projectAutoSaveTimer);
      projectAutoSaveTimer = null;
    }
    return;
  }
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
  projectAutoSaveTimer = setTimeout(runProjectAutoSave, 300);
  if (projectAutoSaveTimer && _typeof(projectAutoSaveTimer) === 'object' && typeof projectAutoSaveTimer.unref === 'function') {
    projectAutoSaveTimer.unref();
  }
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
  updateFavoriteButton(select);
  adjustGearListSelectWidth(select);
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
  var state = loadSession();
  storeLoadedSetupState(state || null);
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
    updateBatteryOptions();
    setSelectValue(monitorSelect, state.monitor);
    setSelectValue(videoSelect, state.video);
    setSelectValue(cageSelect, state.cage);
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
    setSelectValue(hotswapSelect, state.batteryHotswap);
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
  if (gearListOutput || projectRequirementsOutput) {
    var projectName = getCurrentProjectName();
    var fetchStoredProject = function fetchStoredProject(name) {
      return typeof loadProject === 'function' && typeof name === 'string' ? loadProject(name) : null;
    };
    var hasProjectPayload = function hasProjectPayload(project) {
      return project && (project.gearList || project.projectInfo);
    };
    var storedProject = fetchStoredProject(projectName);
    if (!hasProjectPayload(storedProject) && state) {
      var fallbackName = typeof state.setupSelect === 'string' ? state.setupSelect.trim() : '';
      if (fallbackName && fallbackName !== projectName) {
        var fallbackProject = fetchStoredProject(fallbackName);
        if (hasProjectPayload(fallbackProject)) {
          storedProject = fallbackProject;
        }
      }
    }
    if (hasProjectPayload(storedProject)) {
      var mergedInfo = _objectSpread(_objectSpread({}, storedProject.projectInfo || {}), currentProjectInfo || {});
      currentProjectInfo = mergedInfo;
      if (projectForm) populateProjectForm(currentProjectInfo);
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
        if (state) {
          setSliderBowlValue(state.sliderBowl);
          setEasyrigValue(state.easyrig);
        }
        updateGearListButtonVisibility();
      }
    }
  }
  lastSetupName = setupSelect ? setupSelect.value : '';
  restoringSession = false;
  saveCurrentSession();
}
function applySharedSetup(shared) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  try {
    var decoded = decodeSharedSetup(typeof shared === 'string' ? JSON.parse(shared) : shared);
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
        var _merged = mergeAutoGearRules(getBaseAutoGearRules(), providedRules);
        var preset = ensureSharedAutoGearPreset(_merged, decoded);
        if (preset) {
          setActiveAutoGearPresetId(preset.id, {
            persist: true,
            skipRender: true
          });
        }
        setAutoGearRules(_merged);
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
    updateBatteryOptions();
    setSelectValue(monitorSelect, decoded.monitor);
    setSelectValue(videoSelect, decoded.video);
    setSelectValue(cageSelect, decoded.cage);
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
    setSelectValue(hotswapSelect, decoded.batteryHotswap);
    saveCurrentSession();
    if (Array.isArray(decoded.feedback) && decoded.feedback.length) {
      var _key9 = getCurrentSetupKey();
      var fb = loadFeedbackSafe();
      fb[_key9] = (fb[_key9] || []).concat(decoded.feedback);
      saveFeedbackSafe(fb);
    }
    currentProjectInfo = decoded.projectInfo || null;
    if (projectForm) populateProjectForm(currentProjectInfo || {});
    var gearDisplayed = false;
    var combinedHtml = (decoded.projectHtml || '') + (decoded.gearList || '');
    if (combinedHtml) {
      displayGearAndRequirements(combinedHtml);
      ensureGearListActions();
      bindGearListCageListener();
      bindGearListEasyrigListener();
      bindGearListSliderBowlListener();
      bindGearListProGaffTapeListener();
      bindGearListDirectorMonitorListener();
      gearDisplayed = true;
    } else if (decoded.projectInfo || decoded.gearSelectors) {
      var html = generateGearListHtml(decoded.projectInfo || {});
      displayGearAndRequirements(html);
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
    if (decoded.projectInfo || decoded.gearSelectors || decoded.gearList) {
      var payload = {
        gearList: getCurrentGearListHtml(),
        projectInfo: decoded.projectInfo || null
      };
      var activeRules = getProjectScopedAutoGearRules();
      if (activeRules && activeRules.length) {
        payload.autoGearRules = activeRules;
      }
      saveProject(getCurrentProjectName(), payload);
    }
  } catch (e) {
    console.error('Failed to apply shared setup', e);
    alert(texts[currentLang].invalidSharedLink);
  }
}
function applySharedSetupFromUrl() {
  var params = new URLSearchParams(window.location.search);
  var shared = params.get('shared');
  if (!shared) return;
  try {
    var data = JSON.parse(LZString.decompressFromEncodedURIComponent(shared));
    applySharedSetup(data);
    if (typeof updateCalculations === 'function') {
      updateCalculations();
    }
    if (window.history && window.history.replaceState) {
      history.replaceState(null, '', window.location.pathname);
    }
  } catch (e) {
    console.error('Failed to apply shared setup from URL', e);
  }
}
[cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect, batteryPlateSelect].forEach(function (sel) {
  if (sel) sel.addEventListener("change", updateCalculations);
});
if (cameraSelect) {
  cameraSelect.addEventListener('change', function () {
    updateBatteryPlateVisibility();
    updateBatteryOptions();
    populateRecordingResolutionDropdown(currentProjectInfo && currentProjectInfo.recordingResolution);
    populateSensorModeDropdown(currentProjectInfo && currentProjectInfo.sensorMode);
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
motorSelects.forEach(function (sel) {
  if (sel) sel.addEventListener("change", updateCalculations);
});
controllerSelects.forEach(function (sel) {
  if (sel) sel.addEventListener("change", updateCalculations);
});
[cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect, batteryPlateSelect, setupSelect].forEach(function (sel) {
  if (sel) sel.addEventListener("change", saveCurrentSession);
});
motorSelects.forEach(function (sel) {
  if (sel) sel.addEventListener("change", saveCurrentSession);
});
controllerSelects.forEach(function (sel) {
  if (sel) sel.addEventListener("change", saveCurrentSession);
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
[cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect, batteryPlateSelect].forEach(function (sel) {
  if (sel) sel.addEventListener("change", saveCurrentGearList);
});
motorSelects.forEach(function (sel) {
  if (sel) sel.addEventListener("change", saveCurrentGearList);
});
controllerSelects.forEach(function (sel) {
  if (sel) sel.addEventListener("change", saveCurrentGearList);
});
[cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect, batteryPlateSelect].forEach(function (sel) {
  if (sel) sel.addEventListener("change", checkSetupChanged);
});
motorSelects.forEach(function (sel) {
  if (sel) sel.addEventListener("change", checkSetupChanged);
});
controllerSelects.forEach(function (sel) {
  if (sel) sel.addEventListener("change", checkSetupChanged);
});
if (setupNameInput) setupNameInput.addEventListener("input", checkSetupChanged);
[cameraSelect, monitorSelect, videoSelect, cageSelect, distanceSelect, batterySelect, hotswapSelect, batteryPlateSelect].forEach(function (sel) {
  if (sel) sel.addEventListener("change", autoSaveCurrentSetup);
});
motorSelects.forEach(function (sel) {
  if (sel) sel.addEventListener("change", autoSaveCurrentSetup);
});
controllerSelects.forEach(function (sel) {
  if (sel) sel.addEventListener("change", autoSaveCurrentSetup);
});
if (setupNameInput) setupNameInput.addEventListener("change", autoSaveCurrentSetup);
var flushProjectAutoSaveOnExit = function flushProjectAutoSaveOnExit() {
  return scheduleProjectAutoSave(true);
};
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') {
      flushProjectAutoSaveOnExit();
    }
  });
}
if (typeof window !== 'undefined') {
  ['pagehide', 'beforeunload'].forEach(function (eventName) {
    window.addEventListener(eventName, flushProjectAutoSaveOnExit);
  });
}
if (setupNameInput && saveSetupBtn) {
  var toggleSaveSetupBtn = function toggleSaveSetupBtn() {
    saveSetupBtn.disabled = !setupNameInput.value.trim();
  };
  toggleSaveSetupBtn();
  setupNameInput.addEventListener("input", toggleSaveSetupBtn);
  setupNameInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !saveSetupBtn.disabled) {
      saveSetupBtn.click();
    }
  });
}
function updateThemeColor(isDark) {
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', isDark ? '#1c1c1e' : '#ffffff');
  }
}
function setToggleIcon(button, glyph) {
  if (!button) return;
  var iconSpan = button.querySelector('.icon-glyph');
  if (!iconSpan) {
    iconSpan = document.createElement('span');
    iconSpan.className = 'icon-glyph';
    iconSpan.setAttribute('aria-hidden', 'true');
    button.textContent = '';
    button.appendChild(iconSpan);
  }
  var glyphConfig = glyph && _typeof(glyph) === 'object' && (glyph.markup || glyph.className) ? glyph : {
    value: glyph
  };
  var classNames = ['icon-glyph'];
  if (glyphConfig.className) {
    classNames.push(glyphConfig.className);
  }
  iconSpan.className = classNames.join(' ');
  if (glyphConfig.markup) {
    iconSpan.innerHTML = ensureSvgHasAriaHidden(glyphConfig.markup);
    iconSpan.removeAttribute('data-icon-font');
  } else {
    applyIconGlyph(iconSpan, glyphConfig.value);
  }
}
function applyDarkMode(enabled) {
  if (enabled) {
    document.body.classList.add("dark-mode");
    document.documentElement.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
    document.documentElement.classList.remove("light-mode");
    if (darkModeToggle) {
      setToggleIcon(darkModeToggle, ICON_GLYPHS.sun);
      darkModeToggle.setAttribute("aria-pressed", "true");
    }
  } else {
    document.body.classList.remove("dark-mode");
    document.documentElement.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
    document.documentElement.classList.add("light-mode");
    if (darkModeToggle) {
      setToggleIcon(darkModeToggle, ICON_GLYPHS.moon);
      darkModeToggle.setAttribute("aria-pressed", "false");
    }
  }
  var highContrast = isHighContrastActive();
  var accentSource = highContrast ? HIGH_CONTRAST_ACCENT_COLOR : accentColor;
  refreshDarkModeAccentBoost({
    color: accentSource,
    highContrast: highContrast
  });
  updateThemeColor(enabled);
  if (settingsDarkMode) {
    settingsDarkMode.checked = enabled;
  }
}
var darkModeEnabled = false;
try {
  var stored = localStorage.getItem("darkMode");
  if (stored !== null) {
    darkModeEnabled = stored === "true";
  } else if (typeof window.matchMedia === "function") {
    darkModeEnabled = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
} catch (e) {
  console.warn("Could not load dark mode preference", e);
}
applyDarkMode(darkModeEnabled);
if (darkModeToggle) {
  darkModeToggle.addEventListener("click", function () {
    darkModeEnabled = !document.body.classList.contains("dark-mode");
    applyDarkMode(darkModeEnabled);
    try {
      localStorage.setItem("darkMode", darkModeEnabled);
    } catch (e) {
      console.warn("Could not save dark mode preference", e);
    }
  });
}
function applyHighContrast(enabled) {
  if (enabled) {
    if (document.body) {
      document.body.classList.add("high-contrast");
    }
    document.documentElement.classList.add("high-contrast");
    applyAccentColor(accentColor);
  } else {
    if (document.body) {
      document.body.classList.remove("high-contrast");
    }
    document.documentElement.classList.remove("high-contrast");
    if (document.body && document.body.classList.contains('pink-mode')) {
      clearAccentColorOverrides();
    } else {
      applyAccentColor(accentColor);
    }
  }
}
var highContrastEnabled = false;
try {
  highContrastEnabled = localStorage.getItem("highContrast") === "true";
} catch (e) {
  console.warn("Could not load high contrast preference", e);
}
applyHighContrast(highContrastEnabled);
function stopPinkModeIconRotation() {
  if (pinkModeIconRotationTimer) {
    clearInterval(pinkModeIconRotationTimer);
    pinkModeIconRotationTimer = null;
  }
}
function triggerPinkModeIconAnimation() {
  var targets = [];
  if (pinkModeToggle) {
    var toggleIcon = pinkModeToggle.querySelector('.pink-mode-icon');
    if (toggleIcon) {
      targets.push(toggleIcon);
    }
  }
  if (pinkModeHelpIcon) {
    targets.push(pinkModeHelpIcon);
  }
  if (!targets.length) {
    return;
  }
  targets.forEach(function (target) {
    target.classList.remove(PINK_MODE_ICON_ANIMATION_CLASS);
    target.getBoundingClientRect();
    target.classList.add(PINK_MODE_ICON_ANIMATION_CLASS);
    if (PINK_MODE_ICON_ANIMATION_RESET_DELAY > 0) {
      setTimeout(function () {
        target.classList.remove(PINK_MODE_ICON_ANIMATION_CLASS);
      }, PINK_MODE_ICON_ANIMATION_RESET_DELAY);
    }
  });
}
function applyPinkModeIcon(iconConfig) {
  var _ref116 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref116$animate = _ref116.animate,
    animate = _ref116$animate === void 0 ? false : _ref116$animate;
  if (!iconConfig) return;
  if (pinkModeToggle) {
    setToggleIcon(pinkModeToggle, iconConfig);
  }
  if (pinkModeHelpIcon) {
    pinkModeHelpIcon.className = 'help-icon icon-glyph icon-svg pink-mode-icon';
    pinkModeHelpIcon.innerHTML = iconConfig.markup || '';
  }
  if (animate) {
    triggerPinkModeIconAnimation();
  }
}
function startPinkModeIconRotation() {
  var sequence = Array.isArray(pinkModeIcons.onSequence) ? pinkModeIcons.onSequence : [];
  if (!sequence.length) {
    applyPinkModeIcon(pinkModeIcons.off, {
      animate: false
    });
    return;
  }
  stopPinkModeIconRotation();
  if (!pinkModeToggle && !pinkModeHelpIcon) {
    return;
  }
  pinkModeIconIndex = 0;
  applyPinkModeIcon(sequence[pinkModeIconIndex], {
    animate: true
  });
  pinkModeIconRotationTimer = setInterval(function () {
    pinkModeIconIndex = (pinkModeIconIndex + 1) % sequence.length;
    applyPinkModeIcon(sequence[pinkModeIconIndex], {
      animate: true
    });
  }, PINK_MODE_ICON_INTERVAL_MS);
}
function applyPinkMode(enabled) {
  if (enabled) {
    document.body.classList.add("pink-mode");
    if (accentColorInput) {
      accentColorInput.disabled = true;
    }
    clearAccentColorOverrides();
    if (pinkModeToggle) {
      pinkModeToggle.setAttribute("aria-pressed", "true");
    }
    startPinkModeIconRotation();
    startPinkModeAnimatedIcons();
  } else {
    stopPinkModeAnimatedIcons();
    document.body.classList.remove("pink-mode");
    if (accentColorInput) {
      accentColorInput.disabled = false;
    }
    applyAccentColor(accentColor);
    stopPinkModeIconRotation();
    applyPinkModeIcon(pinkModeIcons.off, {
      animate: false
    });
    if (pinkModeToggle) {
      pinkModeToggle.setAttribute("aria-pressed", "false");
    }
  }
  if (settingsPinkMode) {
    settingsPinkMode.checked = enabled;
  }
}
function isPinkModeActive() {
  return !!(document.body && document.body.classList.contains('pink-mode'));
}
var pinkModeEnabled = false;
var settingsInitialPinkMode = isPinkModeActive();
function persistPinkModePreference(enabled) {
  pinkModeEnabled = !!enabled;
  applyPinkMode(pinkModeEnabled);
  try {
    localStorage.setItem('pinkMode', pinkModeEnabled);
  } catch (e) {
    console.warn('Could not save pink mode preference', e);
  }
}
function rememberSettingsPinkModeBaseline() {
  settingsInitialPinkMode = isPinkModeActive();
}
function revertSettingsPinkModeIfNeeded() {
  if (isPinkModeActive() !== settingsInitialPinkMode) {
    persistPinkModePreference(settingsInitialPinkMode);
  }
}
try {
  pinkModeEnabled = localStorage.getItem('pinkMode') === 'true';
} catch (e) {
  console.warn('Could not load pink mode preference', e);
}
applyPinkMode(pinkModeEnabled);
rememberSettingsPinkModeBaseline();
if (pinkModeToggle) {
  pinkModeToggle.addEventListener("click", function () {
    persistPinkModePreference(!document.body.classList.contains('pink-mode'));
  });
}
if (settingsPinkMode) {
  settingsPinkMode.addEventListener('change', function () {
    persistPinkModePreference(settingsPinkMode.checked);
  });
}
if (settingsButton && settingsDialog) {
  settingsButton.addEventListener('click', function () {
    prevAccentColor = accentColor;
    rememberSettingsPinkModeBaseline();
    if (settingsLanguage) settingsLanguage.value = currentLang;
    if (settingsDarkMode) settingsDarkMode.checked = document.body.classList.contains('dark-mode');
    if (settingsPinkMode) settingsPinkMode.checked = document.body.classList.contains('pink-mode');
    if (settingsHighContrast) settingsHighContrast.checked = document.body.classList.contains('high-contrast');
    if (settingsShowAutoBackups) settingsShowAutoBackups.checked = showAutoBackups;
    if (accentColorInput) {
      var _stored = localStorage.getItem('accentColor');
      accentColorInput.value = _stored || accentColor;
    }
    if (settingsFontSize) settingsFontSize.value = fontSize;
    if (settingsFontFamily) settingsFontFamily.value = fontFamily;
    if (settingsLogo) settingsLogo.value = '';
    if (settingsLogoPreview) loadStoredLogoPreview();
    updateStorageSummary();
    if (autoGearEditor) {
      closeAutoGearEditor();
      refreshAutoGearScenarioOptions();
      populateAutoGearCategorySelect(autoGearAddCategorySelect, '');
      populateAutoGearCategorySelect(autoGearRemoveCategorySelect, '');
      renderAutoGearRulesList();
      renderAutoGearDraftLists();
      updateAutoGearCatalogOptions();
    }
    settingsDialog.removeAttribute('hidden');
    openDialog(settingsDialog);
    var first = settingsDialog.querySelector('input, select:not(#settingsLanguage)');
    if (first) {
      try {
        first.focus({
          preventScroll: true
        });
      } catch (_unused6) {
        first.focus();
      }
    }
  });
  if (settingsCancel) {
    settingsCancel.addEventListener('click', function () {
      revertSettingsPinkModeIfNeeded();
      rememberSettingsPinkModeBaseline();
      revertAccentColor();
      if (settingsLogo) settingsLogo.value = '';
      if (settingsLogoPreview) loadStoredLogoPreview();
      closeAutoGearEditor();
      closeDialog(settingsDialog);
      settingsDialog.setAttribute('hidden', '');
    });
  }
  if (settingsSave) {
    settingsSave.addEventListener('click', function () {
      if (settingsLanguage) {
        setLanguage(settingsLanguage.value);
      }
      if (settingsDarkMode) {
        var enabled = settingsDarkMode.checked;
        applyDarkMode(enabled);
        try {
          localStorage.setItem('darkMode', enabled);
        } catch (e) {
          console.warn('Could not save dark mode preference', e);
        }
      }
      if (settingsPinkMode) {
        persistPinkModePreference(settingsPinkMode.checked);
      }
      if (settingsHighContrast) {
        var _enabled = settingsHighContrast.checked;
        applyHighContrast(_enabled);
        try {
          localStorage.setItem('highContrast', _enabled);
        } catch (e) {
          console.warn('Could not save high contrast preference', e);
        }
      }
      if (settingsShowAutoBackups) {
        var _enabled2 = settingsShowAutoBackups.checked;
        var changed = _enabled2 !== showAutoBackups;
        showAutoBackups = _enabled2;
        try {
          localStorage.setItem('showAutoBackups', _enabled2);
        } catch (e) {
          console.warn('Could not save auto backup visibility preference', e);
        }
        if (changed) {
          var prevValue = setupSelect ? setupSelect.value : '';
          var prevName = setupNameInput ? setupNameInput.value : '';
          populateSetupSelect();
          if (setupSelect) {
            if (showAutoBackups || !prevValue.startsWith('auto-backup-')) {
              setupSelect.value = prevValue;
            } else {
              setupSelect.value = '';
            }
          }
          if (setupNameInput) {
            setupNameInput.value = prevName;
          }
        }
      }
      if (accentColorInput) {
        var color = accentColorInput.value;
        applyAccentColor(color);
        try {
          localStorage.setItem('accentColor', color);
        } catch (e) {
          console.warn('Could not save accent color', e);
        }
        accentColor = color;
        prevAccentColor = color;
      }
      if (settingsFontSize) {
        var size = settingsFontSize.value;
        applyFontSize(size);
        try {
          localStorage.setItem('fontSize', size);
        } catch (e) {
          console.warn('Could not save font size', e);
        }
        fontSize = size;
      }
      if (settingsFontFamily) {
        var family = settingsFontFamily.value;
        applyFontFamily(family);
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
          loadStoredLogoPreview();
        }
      }
      closeAutoGearEditor();
      rememberSettingsPinkModeBaseline();
      closeDialog(settingsDialog);
      settingsDialog.setAttribute('hidden', '');
    });
  }
  settingsDialog.addEventListener('click', function (e) {
    if (e.target === settingsDialog) {
      revertSettingsPinkModeIfNeeded();
      rememberSettingsPinkModeBaseline();
      revertAccentColor();
      if (settingsLogo) settingsLogo.value = '';
      if (settingsLogoPreview) loadStoredLogoPreview();
      closeAutoGearEditor();
      closeDialog(settingsDialog);
      settingsDialog.setAttribute('hidden', '');
    }
  });
  settingsDialog.addEventListener('cancel', function (e) {
    e.preventDefault();
    revertSettingsPinkModeIfNeeded();
    rememberSettingsPinkModeBaseline();
    revertAccentColor();
    if (settingsLogo) settingsLogo.value = '';
    if (settingsLogoPreview) loadStoredLogoPreview();
    closeAutoGearEditor();
    closeDialog(settingsDialog);
    settingsDialog.setAttribute('hidden', '');
  });
  if (autoGearAddRuleBtn) {
    autoGearAddRuleBtn.addEventListener('click', function () {
      openAutoGearEditor();
    });
  }
  if (autoGearResetFactoryButton) {
    autoGearResetFactoryButton.addEventListener('click', resetAutoGearRulesToFactoryAdditions);
  }
  if (autoGearExportButton) {
    autoGearExportButton.addEventListener('click', exportAutoGearRules);
  }
  if (autoGearImportButton && autoGearImportInput) {
    autoGearImportButton.addEventListener('click', function () {
      autoGearImportInput.click();
    });
    autoGearImportInput.addEventListener('change', handleAutoGearImportSelection);
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
      var target = event.target;
      if (!target) return;
      if (target.classList.contains('auto-gear-edit')) {
        openAutoGearEditor(target.dataset.ruleId || '');
      } else if (target.classList.contains('auto-gear-delete')) {
        deleteAutoGearRule(target.dataset.ruleId || '');
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
  if (autoGearEditor) {
    autoGearEditor.addEventListener('click', function (event) {
      var target = event.target;
      if (!target || !target.classList.contains('auto-gear-remove-entry')) return;
      var listType = target.dataset.listType;
      var itemId = target.dataset.itemId;
      if (!autoGearEditorDraft || !itemId) return;
      var list = listType === 'remove' ? autoGearEditorDraft.remove : autoGearEditorDraft.add;
      var index = list.findIndex(function (item) {
        return item.id === itemId;
      });
      if (index >= 0) {
        list.splice(index, 1);
        renderAutoGearDraftLists();
      }
    });
  }
}
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
var createAccentTint = function createAccentTint() {
  var alpha = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.16;
  var accentFallback = typeof accentColor === 'string' ? accentColor : '#001589';
  var accentSource = getCssVariableValue('--accent-color', accentFallback);
  var rgb = parseColorToRgb(accentSource);
  if (!rgb) return null;
  return "rgba(".concat(rgb.r, ", ").concat(rgb.g, ", ").concat(rgb.b, ", ").concat(alpha, ")");
};
function showNotification(type, message) {
  if (typeof document === 'undefined') return;
  var id = 'backupNotificationContainer';
  var container = document.getElementById(id);
  if (!container) {
    container = document.createElement('div');
    container.id = id;
    container.style.position = 'fixed';
    container.style.top = '1rem';
    container.style.right = '1rem';
    container.style.zIndex = '10000';
    document.body.appendChild(container);
  }
  var note = document.createElement('div');
  note.textContent = message;
  note.style.padding = '0.75rem 1.25rem';
  note.style.marginTop = '0.5rem';
  note.style.borderRadius = '0.75rem';
  note.style.border = 'none';
  note.style.boxShadow = '0 0.75rem 2.5rem rgba(0, 0, 0, 0.14)';
  var background;
  var textColor;
  if (type === 'error' || type === 'warning') {
    var backgroundVar = type === 'error' ? '--status-error-bg' : '--status-warning-bg';
    var fallbackBackground = type === 'error' ? '#fdd' : '#ffd';
    background = getCssVariableValue(backgroundVar, fallbackBackground);
    var textColorVar = type === 'error' ? '--status-error-text-color' : '--status-warning-text-color';
    textColor = getCssVariableValue(textColorVar, '#000');
  } else {
    background = createAccentTint() || getCssVariableValue('--status-success-bg', '#dfd');
    textColor = getCssVariableValue('--status-success-text-color', '#000');
  }
  note.style.background = background;
  note.style.color = textColor;
  container.appendChild(note);
  setTimeout(function () {
    note.remove();
    if (!container.children.length) {
      container.remove();
    }
  }, 4000);
}
function formatFullBackupFilename(date) {
  var safeDate = date instanceof Date && !Number.isNaN(date.valueOf()) ? date : new Date();
  var pad = function pad(n) {
    return String(n).padStart(2, '0');
  };
  var year = safeDate.getFullYear();
  var month = pad(safeDate.getMonth() + 1);
  var day = pad(safeDate.getDate());
  var hours = pad(safeDate.getHours());
  var minutes = pad(safeDate.getMinutes());
  var seconds = pad(safeDate.getSeconds());
  var offsetMinutes = safeDate.getTimezoneOffset();
  var offsetSuffix = 'Z';
  if (offsetMinutes !== 0) {
    var sign = offsetMinutes > 0 ? '-' : '+';
    var abs = Math.abs(offsetMinutes);
    var offsetHours = pad(Math.floor(abs / 60));
    var offsetMins = pad(abs % 60);
    offsetSuffix = "".concat(sign).concat(offsetHours, ":").concat(offsetMins);
  }
  var iso = "".concat(year, "-").concat(month, "-").concat(day, "T").concat(hours, ":").concat(minutes, ":").concat(seconds).concat(offsetSuffix);
  var safeIso = iso.replace(/[:]/g, '-');
  return {
    iso: iso,
    fileName: "".concat(safeIso, " full app backup.json")
  };
}
function resolveSafeLocalStorage() {
  if (typeof getSafeLocalStorage === 'function') {
    try {
      var storage = getSafeLocalStorage();
      if (storage) {
        return storage;
      }
    } catch (error) {
      console.warn('Unable to obtain safe local storage reference', error);
    }
  }
  if (typeof SAFE_LOCAL_STORAGE !== 'undefined') {
    return SAFE_LOCAL_STORAGE;
  }
  if (typeof localStorage !== 'undefined') {
    return localStorage;
  }
  return null;
}
function captureStorageSnapshot(storage) {
  var snapshot = Object.create(null);
  if (!storage) return snapshot;
  try {
    if (typeof storage.key === 'function' && typeof storage.length === 'number') {
      var length = storage.length;
      for (var i = 0; i < length; i++) {
        var _key0 = storage.key(i);
        if (typeof _key0 !== 'string') continue;
        snapshot[_key0] = storage.getItem(_key0);
      }
    } else if (typeof storage.keys === 'function') {
      var keys = storage.keys();
      keys.forEach(function (key) {
        if (typeof key !== 'string') return;
        snapshot[key] = storage.getItem(key);
      });
    } else if (typeof storage.forEach === 'function') {
      storage.forEach(function (value, key) {
        if (typeof key !== 'string') return;
        snapshot[key] = value;
      });
    }
  } catch (error) {
    console.warn('Failed to snapshot storage', error);
  }
  return snapshot;
}
var BACKUP_STORAGE_KEY_PREFIXES = ['cameraPowerPlanner_'];
var BACKUP_STORAGE_KNOWN_KEYS = new Set(['darkMode', 'pinkMode', 'highContrast', 'showAutoBackups', 'accentColor', 'fontSize', 'fontFamily', 'customLogo', 'language', IOS_PWA_HELP_STORAGE_KEY]);
var BACKUP_METADATA_BASE_KEYS = new Set(['settings', 'storage', 'localStorage', 'values', 'entries', 'sessionStorage', 'sessionState', 'sessionEntries', 'payload', 'plannerData', 'allData', 'generatedAt', 'version', 'appVersion', 'applicationVersion']);
var BACKUP_DATA_KEYS = ['devices', 'setups', 'session', 'feedback', 'project', 'projects', 'gearList', 'favorites', 'autoGearRules', 'autoGearSeeded', 'autoGearBackups', 'autoGearPresets', 'autoGearActivePresetId', 'autoGearAutoPresetId', 'autoGearShowBackups', 'customLogo', 'customFonts', 'preferences'];
function isPlainObject(value) {
  return value !== null && _typeof(value) === 'object' && !Array.isArray(value);
}
function normalizeStoredValue(value) {
  if (typeof value === 'string') return value;
  if (value === undefined || value === null) return '';
  try {
    return String(value);
  } catch (error) {
    console.warn('Failed to normalize stored value for backup compatibility', error);
    return '';
  }
}
function convertEntriesToSnapshot(section) {
  if (!section) return null;
  var snapshot = Object.create(null);
  var assignEntry = function assignEntry(key, value) {
    if (typeof key !== 'string' || !key) return;
    snapshot[key] = normalizeStoredValue(value);
  };
  if (Array.isArray(section)) {
    section.forEach(function (entry) {
      if (!entry) return;
      if (Array.isArray(entry)) {
        assignEntry(entry[0], entry[1]);
        return;
      }
      if (_typeof(entry) === 'object') {
        if (typeof entry.key === 'string') {
          var _ref117, _ref118, _ref119, _entry$value;
          assignEntry(entry.key, (_ref117 = (_ref118 = (_ref119 = (_entry$value = entry.value) !== null && _entry$value !== void 0 ? _entry$value : entry.val) !== null && _ref119 !== void 0 ? _ref119 : entry.data) !== null && _ref118 !== void 0 ? _ref118 : entry.content) !== null && _ref117 !== void 0 ? _ref117 : entry.string);
          return;
        }
        if (typeof entry.name === 'string') {
          var _ref120, _ref121, _ref122, _entry$value2;
          assignEntry(entry.name, (_ref120 = (_ref121 = (_ref122 = (_entry$value2 = entry.value) !== null && _entry$value2 !== void 0 ? _entry$value2 : entry.val) !== null && _ref122 !== void 0 ? _ref122 : entry.data) !== null && _ref121 !== void 0 ? _ref121 : entry.content) !== null && _ref120 !== void 0 ? _ref120 : entry.string);
          return;
        }
        if (Array.isArray(entry.entry)) {
          assignEntry(entry.entry[0], entry.entry[1]);
        }
      }
    });
  } else if (isPlainObject(section)) {
    Object.entries(section).forEach(function (_ref123) {
      var _ref124 = _slicedToArray(_ref123, 2),
        key = _ref124[0],
        value = _ref124[1];
      assignEntry(key, value);
    });
  } else {
    return null;
  }
  return Object.keys(snapshot).length ? snapshot : null;
}
function extractFirstMatchingSnapshot(source, keys) {
  if (!isPlainObject(source)) return {
    snapshot: null,
    keyUsed: null
  };
  var _iterator22 = _createForOfIteratorHelper(keys),
    _step22;
  try {
    for (_iterator22.s(); !(_step22 = _iterator22.n()).done;) {
      var _key1 = _step22.value;
      if (!Object.prototype.hasOwnProperty.call(source, _key1)) continue;
      var snapshot = convertEntriesToSnapshot(source[_key1]);
      if (snapshot) {
        return {
          snapshot: snapshot,
          keyUsed: _key1
        };
      }
    }
  } catch (err) {
    _iterator22.e(err);
  } finally {
    _iterator22.f();
  }
  return {
    snapshot: null,
    keyUsed: null
  };
}
function looksLikeStoredSettingKey(key) {
  if (BACKUP_STORAGE_KNOWN_KEYS.has(key)) {
    return true;
  }
  return BACKUP_STORAGE_KEY_PREFIXES.some(function (prefix) {
    return key.startsWith(prefix);
  });
}
function buildLegacyStorageFromRoot(source, metadataKeys) {
  if (!isPlainObject(source)) return null;
  var snapshot = Object.create(null);
  Object.entries(source).forEach(function (_ref125) {
    var _ref126 = _slicedToArray(_ref125, 2),
      key = _ref126[0],
      value = _ref126[1];
    if (metadataKeys.has(key)) return;
    if (!looksLikeStoredSettingKey(key)) return;
    snapshot[key] = normalizeStoredValue(value);
  });
  return Object.keys(snapshot).length ? snapshot : null;
}
function extractBackupSections(raw) {
  var parsed = isPlainObject(raw) ? raw : {};
  var versionValue = typeof parsed.version === 'string' ? parsed.version : typeof parsed.appVersion === 'string' ? parsed.appVersion : typeof parsed.applicationVersion === 'string' ? parsed.applicationVersion : undefined;
  var settingsResult = extractFirstMatchingSnapshot(parsed, ['settings', 'localStorage', 'storage', 'storedSettings', 'values', 'entries']);
  var sessionResult = extractFirstMatchingSnapshot(parsed, ['sessionStorage', 'session', 'sessions', 'sessionState', 'sessionEntries']);
  var metadataKeys = new Set(BACKUP_METADATA_BASE_KEYS);
  if (settingsResult.keyUsed) metadataKeys.add(settingsResult.keyUsed);
  if (sessionResult.keyUsed) metadataKeys.add(sessionResult.keyUsed);
  var settingsSnapshot = settingsResult.snapshot || buildLegacyStorageFromRoot(parsed, metadataKeys);
  var sessionSnapshot = sessionResult.snapshot;
  var dataSection = null;
  for (var _i57 = 0, _arr = ['data', 'payload', 'plannerData', 'allData']; _i57 < _arr.length; _i57++) {
    var _key10 = _arr[_i57];
    if (isPlainObject(parsed[_key10])) {
      dataSection = parsed[_key10];
      break;
    }
  }
  if (!dataSection) {
    var fallback = {};
    BACKUP_DATA_KEYS.forEach(function (key) {
      if (metadataKeys.has(key)) return;
      if (Object.prototype.hasOwnProperty.call(parsed, key)) {
        fallback[key] = parsed[key];
      }
    });
    if (Object.keys(fallback).length) {
      dataSection = fallback;
    }
  }
  return {
    fileVersion: versionValue,
    settings: settingsSnapshot,
    sessionStorage: sessionSnapshot,
    data: isPlainObject(dataSection) ? dataSection : null
  };
}
function createSettingsBackup() {
  var notify = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var timestamp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
  try {
    var isEvent = notify && _typeof(notify) === 'object' && typeof notify.type === 'string';
    var shouldNotify = isEvent ? true : Boolean(notify);
    var _formatFullBackupFile2 = formatFullBackupFilename(timestamp),
      iso = _formatFullBackupFile2.iso,
      fileName = _formatFullBackupFile2.fileName;
    var safeStorage = resolveSafeLocalStorage();
    var settings = captureStorageSnapshot(safeStorage);
    var sessionEntries = captureStorageSnapshot(typeof sessionStorage !== 'undefined' ? sessionStorage : null);
    var backup = {
      version: APP_VERSION,
      generatedAt: iso,
      settings: settings,
      sessionStorage: Object.keys(sessionEntries).length ? sessionEntries : undefined,
      data: typeof exportAllData === 'function' ? exportAllData() : {}
    };
    var blob = new Blob([JSON.stringify(backup)], {
      type: 'application/json'
    });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
    if (shouldNotify) {
      showNotification('success', 'Full app backup downloaded');
    }
    return fileName;
  } catch (e) {
    console.warn('Backup failed', e);
    if (notify) {
      showNotification('error', 'Backup failed');
    }
    return null;
  }
}
if (backupSettings) {
  backupSettings.addEventListener('click', createSettingsBackup);
}
if (restoreSettings && restoreSettingsInput) {
  restoreSettings.addEventListener('click', function () {
    return restoreSettingsInput.click();
  });
  restoreSettingsInput.addEventListener('change', function () {
    var file = restoreSettingsInput.files[0];
    if (!file) return;
    var langTexts = texts[currentLang] || {};
    var fallbackTexts = texts.en || {};
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
    var reader = new FileReader();
    var resetInput = function resetInput() {
      try {
        restoreSettingsInput.value = '';
      } catch (resetError) {
        void resetError;
      }
    };
    reader.onload = function (e) {
      try {
        var parsed = JSON.parse(e.target.result);
        var _extractBackupSection = extractBackupSections(parsed),
          restoredSettings = _extractBackupSection.settings,
          restoredSession = _extractBackupSection.sessionStorage,
          data = _extractBackupSection.data,
          fileVersion = _extractBackupSection.fileVersion;
        if (fileVersion !== APP_VERSION) {
          alert("".concat(texts[currentLang].restoreVersionWarning, " (").concat(fileVersion || 'unknown', " \u2192 ").concat(APP_VERSION, ")"));
        }
        if (restoredSettings && _typeof(restoredSettings) === 'object') {
          var _safeStorage = resolveSafeLocalStorage();
          if (_safeStorage && typeof _safeStorage.setItem === 'function') {
            Object.entries(restoredSettings).forEach(function (_ref127) {
              var _ref128 = _slicedToArray(_ref127, 2),
                k = _ref128[0],
                v = _ref128[1];
              if (typeof k !== 'string') return;
              try {
                if (v === null || v === undefined) {
                  if (typeof _safeStorage.removeItem === 'function') {
                    _safeStorage.removeItem(k);
                  }
                } else {
                  _safeStorage.setItem(k, String(v));
                }
              } catch (storageError) {
                console.warn('Failed to restore storage entry', k, storageError);
              }
            });
          }
        }
        if (restoredSession && typeof sessionStorage !== 'undefined') {
          Object.entries(restoredSession).forEach(function (_ref129) {
            var _ref130 = _slicedToArray(_ref129, 2),
              key = _ref130[0],
              value = _ref130[1];
            try {
              sessionStorage.setItem(key, value);
            } catch (sessionError) {
              console.warn('Failed to restore sessionStorage entry', key, sessionError);
            }
          });
        }
        loadStoredLogoPreview();
        if (data && typeof importAllData === 'function') {
          importAllData(data);
        }
        syncAutoGearRulesFromStorage(data === null || data === void 0 ? void 0 : data.autoGearRules);
        var safeStorage = resolveSafeLocalStorage();
        var safeGetItem = function safeGetItem(key) {
          if (!safeStorage || typeof safeStorage.getItem !== 'function') return null;
          try {
            return safeStorage.getItem(key);
          } catch (error) {
            console.warn('Failed to read restored storage key', key, error);
            return null;
          }
        };
        applyDarkMode(safeGetItem('darkMode') === 'true');
        applyPinkMode(safeGetItem('pinkMode') === 'true');
        applyHighContrast(safeGetItem('highContrast') === 'true');
        showAutoBackups = safeGetItem('showAutoBackups') === 'true';
        var prevValue = setupSelect ? setupSelect.value : '';
        var prevName = setupNameInput ? setupNameInput.value : '';
        populateSetupSelect();
        if (setupSelect) {
          if (showAutoBackups || !prevValue.startsWith('auto-backup-')) {
            setupSelect.value = prevValue;
          } else {
            setupSelect.value = '';
          }
        }
        if (setupNameInput) {
          setupNameInput.value = prevName;
        }
        if (settingsShowAutoBackups) {
          settingsShowAutoBackups.checked = showAutoBackups;
        }
        var color = safeGetItem('accentColor');
        if (color) {
          document.documentElement.style.setProperty('--accent-color', color);
          document.documentElement.style.setProperty('--link-color', color);
          accentColor = color;
          prevAccentColor = color;
        }
        var _lang = safeGetItem('language');
        if (_lang) setLanguage(_lang);
        alert(texts[currentLang].restoreSuccess);
      } catch (err) {
        console.warn('Restore failed', err);
      }
      resetInput();
    };
    reader.onerror = function (err) {
      console.warn('Failed to read restore file', err);
      resetInput();
    };
    reader.readAsText(file);
  });
}
if (factoryResetButton) {
  factoryResetButton.addEventListener('click', function () {
    var langTexts = texts[currentLang] || texts.en || {};
    var confirmReset = langTexts.confirmFactoryReset || 'Create a backup and wipe all planner data?';
    if (!confirm(confirmReset)) return;
    var confirmResetAgain = langTexts.confirmFactoryResetAgain || 'This will permanently delete all saved planner data. Continue?';
    if (!confirm(confirmResetAgain)) return;
    if (typeof createSettingsBackup !== 'function') {
      var errorMsg = langTexts.factoryResetError || 'Factory reset failed. Please try again.';
      showNotification('error', errorMsg);
      return;
    }
    var backupFileName = null;
    try {
      backupFileName = createSettingsBackup(false, new Date());
    } catch (error) {
      console.error('Backup before factory reset failed', error);
    }
    if (!backupFileName) {
      var backupFailedMsg = langTexts.factoryResetBackupFailed || 'Backup failed. Data was not deleted.';
      showNotification('error', backupFailedMsg);
      return;
    }
    if (typeof clearAllData !== 'function') {
      var _errorMsg2 = langTexts.factoryResetError || 'Factory reset failed. Please try again.';
      showNotification('error', _errorMsg2);
      return;
    }
    try {
      clearAllData();
      if (settingsDialog) {
        settingsDialog.setAttribute('hidden', '');
      }
      var successMsg = langTexts.factoryResetSuccess || 'Backup downloaded. All planner data cleared. Reloading…';
      showNotification('success', successMsg);
      setTimeout(function () {
        if (typeof window !== 'undefined' && window.location && window.location.reload) {
          window.location.reload();
        }
      }, 600);
    } catch (error) {
      console.error('Factory reset failed', error);
      var _errorMsg3 = langTexts.factoryResetError || 'Factory reset failed. Please try again.';
      showNotification('error', _errorMsg3);
    }
  });
}
function clearCachesAndReload() {
  return _clearCachesAndReload.apply(this, arguments);
}
function _clearCachesAndReload() {
  _clearCachesAndReload = _asyncToGenerator(_regenerator().m(function _callee11() {
    var registrations, _navigator, serviceWorker, regs, reg, readyReg, keys, _window, location, hasReplace, hasReload, paramName, timestamp, href, hash, hashIndex, pattern, replacement, _t11, _t12, _t13, _t14;
    return _regenerator().w(function (_context11) {
      while (1) switch (_context11.p = _context11.n) {
        case 0:
          _context11.p = 0;
          if (!(typeof navigator !== 'undefined' && navigator.serviceWorker)) {
            _context11.n = 12;
            break;
          }
          registrations = [];
          _navigator = navigator, serviceWorker = _navigator.serviceWorker;
          _context11.p = 1;
          if (!(typeof serviceWorker.getRegistrations === 'function')) {
            _context11.n = 3;
            break;
          }
          _context11.n = 2;
          return serviceWorker.getRegistrations();
        case 2:
          regs = _context11.v;
          if (Array.isArray(regs)) {
            regs.forEach(function (reg) {
              return registrations.push(reg);
            });
          }
          _context11.n = 9;
          break;
        case 3:
          if (!(typeof serviceWorker.getRegistration === 'function')) {
            _context11.n = 5;
            break;
          }
          _context11.n = 4;
          return serviceWorker.getRegistration();
        case 4:
          reg = _context11.v;
          if (reg) {
            registrations.push(reg);
          }
          _context11.n = 9;
          break;
        case 5:
          if (!(serviceWorker.ready && typeof serviceWorker.ready.then === 'function')) {
            _context11.n = 9;
            break;
          }
          _context11.p = 6;
          _context11.n = 7;
          return serviceWorker.ready;
        case 7:
          readyReg = _context11.v;
          if (readyReg) {
            registrations.push(readyReg);
          }
          _context11.n = 9;
          break;
        case 8:
          _context11.p = 8;
          _t11 = _context11.v;
          console.warn('Failed to await active service worker', _t11);
        case 9:
          _context11.n = 11;
          break;
        case 10:
          _context11.p = 10;
          _t12 = _context11.v;
          console.warn('Failed to query service worker registrations', _t12);
        case 11:
          if (!registrations.length) {
            _context11.n = 12;
            break;
          }
          _context11.n = 12;
          return Promise.all(registrations.map(function (reg) {
            if (!reg || typeof reg.unregister !== 'function') {
              return Promise.resolve();
            }
            return reg.unregister().catch(function (unregisterError) {
              console.warn('Service worker unregister failed', unregisterError);
            });
          }));
        case 12:
          if (!(typeof caches !== 'undefined' && caches && typeof caches.keys === 'function')) {
            _context11.n = 14;
            break;
          }
          _context11.n = 13;
          return caches.keys();
        case 13:
          keys = _context11.v;
          _context11.n = 14;
          return Promise.all(keys.map(function (key) {
            if (!key || typeof caches.delete !== 'function') {
              return Promise.resolve(false);
            }
            return caches.delete(key).catch(function (cacheError) {
              console.warn('Failed to delete cache', key, cacheError);
              return false;
            });
          }));
        case 14:
          _context11.n = 16;
          break;
        case 15:
          _context11.p = 15;
          _t13 = _context11.v;
          console.warn('Cache clear failed', _t13);
        case 16:
          _context11.p = 16;
          _context11.p = 17;
          if (!(typeof window !== 'undefined' && window.location)) {
            _context11.n = 19;
            break;
          }
          _window = window, location = _window.location;
          hasReplace = location && typeof location.replace === 'function';
          hasReload = location && typeof location.reload === 'function';
          if (!hasReplace) {
            _context11.n = 18;
            break;
          }
          paramName = 'forceReload';
          timestamp = Date.now().toString(36);
          href = location.href || '';
          hash = '';
          hashIndex = href.indexOf('#');
          if (hashIndex !== -1) {
            hash = href.slice(hashIndex);
            href = href.slice(0, hashIndex);
          }
          pattern = new RegExp('([?&])' + paramName + '=[^&]*');
          replacement = '$1' + paramName + '=' + timestamp;
          if (pattern.test(href)) {
            href = href.replace(pattern, replacement);
          } else if (href.indexOf('?') !== -1) {
            href += '&' + paramName + '=' + timestamp;
          } else if (href) {
            href += '?' + paramName + '=' + timestamp;
          }
          location.replace(href + hash);
          return _context11.a(2);
        case 18:
          if (hasReload) {
            location.reload();
          }
        case 19:
          _context11.n = 21;
          break;
        case 20:
          _context11.p = 20;
          _t14 = _context11.v;
          console.warn('Forced reload failed', _t14);
          if (typeof window !== 'undefined' && window.location && typeof window.location.reload === 'function') {
            window.location.reload();
          }
        case 21:
          return _context11.f(16);
        case 22:
          return _context11.a(2);
      }
    }, _callee11, null, [[17, 20], [6, 8], [1, 10], [0, 15, 16, 22]]);
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
    } catch (focusError) {}
    try {
      textarea.select();
      if (typeof textarea.setSelectionRange === 'function') {
        textarea.setSelectionRange(0, textarea.value.length);
      }
    } catch (selectionError) {}
    if (typeof document.execCommand === 'function') {
      try {
        document.execCommand('copy');
      } catch (execError) {}
    }
  } catch (error) {} finally {
    if (textarea && textarea.parentNode) {
      textarea.parentNode.removeChild(textarea);
    }
    if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
      try {
        previousActiveElement.focus();
      } catch (focusRestoreError) {}
    }
  }
}
if (downloadDiagramBtn) {
  downloadDiagramBtn.addEventListener('click', function (e) {
    var source = exportDiagramSvg();
    if (!source) return;
    copyTextToClipboardBestEffort(source);
    var pad = function pad(n) {
      return String(n).padStart(2, '0');
    };
    var now = new Date();
    var datePart = "".concat(now.getFullYear(), "-").concat(pad(now.getMonth() + 1), "-").concat(pad(now.getDate()), "_").concat(pad(now.getHours()), "-").concat(pad(now.getMinutes()));
    var namePart = (getCurrentProjectName() || 'setup').replace(/\s+/g, '-').replace(/[^a-z0-9-_]/gi, '');
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
if (gridSnapToggleBtn) {
  gridSnapToggleBtn.addEventListener('click', function () {
    gridSnap = !gridSnap;
    gridSnapToggleBtn.classList.toggle('active', gridSnap);
    gridSnapToggleBtn.setAttribute('aria-pressed', gridSnap ? 'true' : 'false');
    if (setupDiagramContainer) {
      setupDiagramContainer.classList.toggle('grid-snap', gridSnap);
    }
  });
}
if (helpButton && helpDialog) {
  var helpContent = helpDialog.querySelector('.help-content');
  var helpQuickLinkItems = new Map();
  var helpSectionHighlightTimers = new Map();
  var appTargetHighlightTimers = new Map();
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
  var focusFeatureElement = function focusFeatureElement(element) {
    if (!element) return;
    var settingsSection = element.closest('#settingsDialog');
    if (settingsSection && !isDialogOpen(settingsDialog)) {
      var _settingsButton$click;
      settingsButton === null || settingsButton === void 0 || (_settingsButton$click = settingsButton.click) === null || _settingsButton$click === void 0 || _settingsButton$click.call(settingsButton);
    }
    var dialog = element.closest('dialog');
    if (dialog && !isDialogOpen(dialog)) {
      if (dialog.id === 'projectDialog') {
        var _generateGearListBtn$;
        generateGearListBtn === null || generateGearListBtn === void 0 || (_generateGearListBtn$ = generateGearListBtn.click) === null || _generateGearListBtn$ === void 0 || _generateGearListBtn$.call(generateGearListBtn);
      } else if (dialog.id === 'feedbackDialog') {
        var _runtimeFeedbackBtn$c;
        runtimeFeedbackBtn === null || runtimeFeedbackBtn === void 0 || (_runtimeFeedbackBtn$c = runtimeFeedbackBtn.click) === null || _runtimeFeedbackBtn$c === void 0 || _runtimeFeedbackBtn$c.call(runtimeFeedbackBtn);
      } else if (dialog.id === 'overviewDialog') {
        var _generateOverviewBtn$;
        generateOverviewBtn === null || generateOverviewBtn === void 0 || (_generateOverviewBtn$ = generateOverviewBtn.click) === null || _generateOverviewBtn$ === void 0 || _generateOverviewBtn$.call(generateOverviewBtn);
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
      } catch (_unused7) {
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
    } catch (_unused8) {
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
  var syncHelpQuickLinksVisibility = function syncHelpQuickLinksVisibility() {
    if (!helpQuickLinksNav || !helpQuickLinksList || !helpQuickLinkItems.size) {
      if (helpQuickLinksNav) helpQuickLinksNav.setAttribute('hidden', '');
      return;
    }
    var hasVisible = false;
    helpQuickLinkItems.forEach(function (_ref131) {
      var section = _ref131.section,
        listItem = _ref131.listItem,
        button = _ref131.button;
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
    helpQuickLinkItems.forEach(function (_ref132) {
      var button = _ref132.button,
        label = _ref132.label;
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
      button.className = 'help-quick-link';
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
      } catch (_unused9) {
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
        } catch (_unused0) {}
      }
      var targetInsideHelp = helpDialog.contains(focusEl);
      var runFocus = function runFocus() {
        focusFeatureElement(focusEl);
        if (highlightEl) {
          highlightAppTarget(highlightEl);
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
    normalized = normalizeSpellingVariants(normalized);
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
      var _iterator23 = _createForOfIteratorHelper(all),
        _step23;
      try {
        for (_iterator23.s(); !(_step23 = _iterator23.n()).done;) {
          var ch = _step23.value;
          chars.add(ch);
          var upper = ch.toUpperCase();
          if (upper) chars.add(upper);
        }
      } catch (err) {
        _iterator23.e(err);
      } finally {
        _iterator23.f();
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
  var filterHelp = function filterHelp() {
    if (!helpSearch) return;
    var rawQuery = helpSearch.value.trim();
    var normalizedQuery = normaliseHelpSearchText(rawQuery);
    var hasQuery = normalizedQuery.length > 0;
    var sections = Array.from(helpDialog.querySelectorAll('[data-help-section]'));
    var items = Array.from(helpDialog.querySelectorAll('.faq-item'));
    var elements = sections.concat(items);
    var anyVisible = false;
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
        anyVisible = true;
      } else {
        el.setAttribute('hidden', '');
        if (isFaqItem) {
          el.removeAttribute('open');
        }
      }
    });
    if (helpNoResults) {
      if (anyVisible) {
        helpNoResults.setAttribute('hidden', '');
      } else {
        helpNoResults.removeAttribute('hidden');
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
      } catch (_unused1) {
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
      } catch (_unused10) {
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
  var HOVER_HELP_TARGET_SELECTOR = '[data-help], [aria-label], [title], [aria-labelledby], [alt], [aria-describedby]';
  var findHoverHelpTarget = function findHoverHelpTarget(start) {
    if (!start) return null;
    var el = start.closest(HOVER_HELP_TARGET_SELECTOR);
    if (!el || el.tagName === 'SECTION') {
      return null;
    }
    return el;
  };
  var collectHoverHelpText = function collectHoverHelpText(el) {
    if (!el) return [];
    var parts = [];
    var addText = function addText(value) {
      if (typeof value !== 'string') return;
      var trimmed = value.trim();
      if (!trimmed) return;
      if (!parts.includes(trimmed)) parts.push(trimmed);
    };
    addText(el.getAttribute('data-help'));
    addText(el.getAttribute('aria-label'));
    addText(el.getAttribute('title'));
    var applyFromIds = function applyFromIds(ids) {
      if (!ids) return;
      ids.split(/\s+/).filter(Boolean).forEach(function (id) {
        var ref = document.getElementById(id);
        if (!ref) return;
        addText(ref.getAttribute('data-help'));
        addText(ref.getAttribute('aria-label'));
        addText(ref.getAttribute('title'));
        addText(ref.textContent);
      });
    };
    applyFromIds(el.getAttribute('aria-labelledby'));
    addText(el.getAttribute('alt'));
    applyFromIds(el.getAttribute('aria-describedby'));
    return parts;
  };
  var positionHoverHelpTooltip = function positionHoverHelpTooltip(target) {
    if (!hoverHelpTooltip || !target) return;
    var rect = target.getBoundingClientRect();
    var topBase = Number.isFinite(rect.bottom) && rect.bottom ? rect.bottom : rect.top;
    var leftBase = Number.isFinite(rect.left) ? rect.left : 0;
    var top = (Number.isFinite(topBase) ? topBase : 0) + window.scrollY + 10;
    var left = leftBase + window.scrollX;
    hoverHelpTooltip.style.top = "".concat(top, "px");
    hoverHelpTooltip.style.left = "".concat(left, "px");
  };
  var hideHoverHelpTooltip = function hideHoverHelpTooltip() {
    if (!hoverHelpTooltip) return;
    hoverHelpTooltip.setAttribute('hidden', '');
  };
  var updateHoverHelpTooltip = function updateHoverHelpTooltip(target) {
    hoverHelpCurrentTarget = target || null;
    if (!hoverHelpActive || !hoverHelpTooltip || !target) {
      hideHoverHelpTooltip();
      return;
    }
    var textParts = collectHoverHelpText(target);
    if (!textParts.length) {
      hideHoverHelpTooltip();
      return;
    }
    hoverHelpTooltip.textContent = textParts.join(' ');
    positionHoverHelpTooltip(target);
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
      hoverHelpTooltip.remove();
      hoverHelpTooltip = null;
    }
    document.body.style.cursor = '';
    document.body.classList.remove('hover-help-active');
  };
  var startHoverHelp = function startHoverHelp() {
    hoverHelpActive = true;
    closeHelp();
    document.body.style.cursor = 'help';
    document.body.classList.add('hover-help-active');
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
    var target = findHoverHelpTarget(e.target);
    updateHoverHelpTooltip(target);
  });
  document.addEventListener('focusin', function (e) {
    if (!hoverHelpActive || !hoverHelpTooltip) return;
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
    var _featureSearch$showPi;
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
    } catch (_unused11) {
      featureSearch.focus();
    }
    if (typeof featureSearch.select === 'function') {
      featureSearch.select();
    }
    (_featureSearch$showPi = featureSearch.showPicker) === null || _featureSearch$showPi === void 0 || _featureSearch$showPi.call(featureSearch);
  };
  runFeatureSearch = function runFeatureSearch(query) {
    var rawQuery = typeof query === 'string' ? query : (featureSearch === null || featureSearch === void 0 ? void 0 : featureSearch.value) || '';
    var originalNormalized = normalizeSearchValue(rawQuery);
    var value = rawQuery.trim();
    if (!value) return;
    var lower = value.toLowerCase();
    var isHelp = lower.endsWith(' (help)');
    var clean = isHelp ? value.slice(0, -7).trim() : value;
    var cleanKey = searchKey(clean);
    var cleanTokens = searchTokens(clean);
    var helpMatch = findBestSearchMatch(helpMap, cleanKey, cleanTokens);
    var deviceMatch = findBestSearchMatch(deviceMap, cleanKey, cleanTokens);
    var featureMatch = findBestSearchMatch(featureMap, cleanKey, cleanTokens);
    var helpScore = (helpMatch === null || helpMatch === void 0 ? void 0 : helpMatch.score) || 0;
    var deviceScore = (deviceMatch === null || deviceMatch === void 0 ? void 0 : deviceMatch.score) || 0;
    var featureScore = (featureMatch === null || featureMatch === void 0 ? void 0 : featureMatch.score) || 0;
    var deviceStrong = deviceMatch ? STRONG_SEARCH_MATCH_TYPES.has(deviceMatch.matchType) : false;
    var featureStrong = featureMatch ? STRONG_SEARCH_MATCH_TYPES.has(featureMatch.matchType) : false;
    var bestNonHelpScore = Math.max(deviceScore, featureScore);
    var hasStrongNonHelp = deviceStrong || featureStrong;
    var preferHelp = !!helpMatch && (isHelp || !hasStrongNonHelp && helpScore > bestNonHelpScore);
    if (!isHelp && !preferHelp) {
      var shouldUseDevice = !!deviceMatch && (!featureMatch || deviceStrong && !featureStrong || deviceStrong === featureStrong && (deviceScore > featureScore || deviceScore === featureScore && (featureMatch === null || featureMatch === void 0 ? void 0 : featureMatch.matchType) !== 'exactKey'));
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
          focusFeatureElement(device.select);
          return;
        }
      }
      if (featureMatch) {
        var feature = featureMatch.value;
        var featureEl = (feature === null || feature === void 0 ? void 0 : feature.element) || feature;
        if (featureEl) {
          var _featureEl$textConten;
          var label = (feature === null || feature === void 0 ? void 0 : feature.label) || ((_featureEl$textConten = featureEl.textContent) === null || _featureEl$textConten === void 0 ? void 0 : _featureEl$textConten.trim());
          if (label) {
            updateFeatureSearchValue(label, originalNormalized);
          }
          focusFeatureElement(featureEl);
          return;
        }
      }
    }
    if (helpMatch) {
      var helpEntry = helpMatch.value || {};
      var section = helpEntry.section;
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
          syncHelpQuickLinksVisibility();
        }
        if (typeof section.scrollIntoView === 'function') {
          section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
        highlightHelpSection(section);
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
    }
  };
  if (featureSearch) {
    var handle = function handle() {
      return runFeatureSearch(featureSearch.value);
    };
    featureSearch.addEventListener('change', handle);
    featureSearch.addEventListener('input', function () {
      var _featureSearch$showPi2;
      (_featureSearch$showPi2 = featureSearch.showPicker) === null || _featureSearch$showPi2 === void 0 || _featureSearch$showPi2.call(featureSearch);
      if (featureSearchClear) {
        if (featureSearch.value) {
          featureSearchClear.removeAttribute('hidden');
        } else {
          featureSearchClear.setAttribute('hidden', '');
        }
      }
    });
    featureSearch.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        handle();
      } else if (e.key === 'Escape' && featureSearch.value) {
        featureSearch.value = '';
        if (featureSearchClear) {
          featureSearchClear.setAttribute('hidden', '');
        }
        e.preventDefault();
      }
    });
  }
  if (featureSearchClear) {
    featureSearchClear.addEventListener('click', function () {
      if (featureSearch) {
        featureSearch.value = '';
        featureSearchClear.setAttribute('hidden', '');
        focusFeatureSearchInput();
      }
    });
    if (featureSearch && featureSearch.value) {
      featureSearchClear.removeAttribute('hidden');
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
  document.addEventListener('keydown', function (e) {
    var tag = document.activeElement.tagName;
    var isTextField = tag === 'INPUT' || tag === 'TEXTAREA';
    if (hoverHelpActive && e.key === 'Escape') {
      stopHoverHelp();
    } else if (e.key === 'Escape' && isDialogOpen(helpDialog)) {
      e.preventDefault();
      closeHelp();
    } else if (e.key === 'Escape' && settingsDialog && isDialogOpen(settingsDialog)) {
      e.preventDefault();
      revertSettingsPinkModeIfNeeded();
      rememberSettingsPinkModeBaseline();
      revertAccentColor();
      closeDialog(settingsDialog);
      settingsDialog.setAttribute('hidden', '');
    } else if (e.key === 'F1' || (e.key === '/' || e.key === '?') && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      toggleHelp();
    } else if (e.key === '/' && !isTextField && (!helpDialog || !isDialogOpen(helpDialog))) {
      e.preventDefault();
      focusFeatureSearchInput();
    } else if (e.key === '?' && !isTextField || e.key.toLowerCase() === 'h' && !isTextField) {
      e.preventDefault();
      toggleHelp();
    } else if (isDialogOpen(helpDialog) && (e.key === '/' && !isTextField || e.key.toLowerCase() === 'f' && (e.ctrlKey || e.metaKey))) {
      e.preventDefault();
      if (helpSearch) helpSearch.focus();
    } else if (e.key === ',' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (settingsButton) settingsButton.click();
    } else if (e.key.toLowerCase() === 'k' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      focusFeatureSearchInput();
    } else if (e.key.toLowerCase() === 'd' && !isTextField) {
      darkModeEnabled = !document.body.classList.contains('dark-mode');
      applyDarkMode(darkModeEnabled);
      try {
        localStorage.setItem('darkMode', darkModeEnabled);
      } catch (err) {
        console.warn('Could not save dark mode preference', err);
      }
    } else if (e.key.toLowerCase() === 's' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (saveSetupBtn && !saveSetupBtn.disabled) {
        saveSetupBtn.click();
      }
    } else if (e.key.toLowerCase() === 'p' && !isTextField) {
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
    var _devices13;
    var defaultMonitor = 'SmallHD Ultra 7';
    if ((_devices13 = devices) !== null && _devices13 !== void 0 && (_devices13 = _devices13.monitors) !== null && _devices13 !== void 0 && _devices13[defaultMonitor]) {
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
  if (sharedLinkRow) {
    sharedLinkRow.classList.remove('hidden');
  }
  populateEnvironmentDropdowns();
  populateLensDropdown();
  populateFilterDropdown();
  if (filterSelectElem) {
    filterSelectElem.addEventListener('change', renderFilterDetails);
    filterSelectElem.addEventListener('change', function () {
      saveCurrentSession();
      saveCurrentGearList();
      checkSetupChanged();
    });
    renderFilterDetails();
  }
  populateUserButtonDropdowns();
  document.querySelectorAll('#projectForm select').forEach(function (sel) {
    attachSelectSearch(sel);
    initFavoritableSelect(sel);
  });
  setupInstallBanner();
  setLanguage(currentLang);
  maybeShowIosPwaHelp();
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
function populateEnvironmentDropdowns() {
  var tempSelect = document.getElementById('fbTemperature');
  if (tempSelect) {
    var emptyOpt = document.createElement('option');
    emptyOpt.value = '';
    tempSelect.appendChild(emptyOpt);
    for (var i = -20; i <= 50; i++) {
      var opt = document.createElement('option');
      opt.value = String(i);
      opt.textContent = i;
      tempSelect.appendChild(opt);
    }
  }
}
function populateLensDropdown() {
  if (!lensSelect) return;
  lensSelect.innerHTML = '';
  var lensData = devices && devices.lenses;
  if (!lensData || Object.keys(lensData).length === 0) {
    return;
  }
  if (!lensSelect.multiple) {
    var emptyOpt = document.createElement('option');
    emptyOpt.value = '';
    lensSelect.appendChild(emptyOpt);
  }
  Object.keys(lensData).sort(localeSort).forEach(function (name) {
    var _ref133, _lens$minFocusMeters2;
    var opt = document.createElement('option');
    opt.value = name;
    var lens = lensData[name] || {};
    var attrs = [];
    if (lens.weight_g) attrs.push("".concat(lens.weight_g, "g"));
    if (lens.clampOn) {
      if (lens.frontDiameterMm) attrs.push("".concat(lens.frontDiameterMm, "mm clamp-on"));else attrs.push('clamp-on');
    } else if (lens.clampOn === false) {
      attrs.push('no clamp-on');
    }
    var minFocus = (_ref133 = (_lens$minFocusMeters2 = lens.minFocusMeters) !== null && _lens$minFocusMeters2 !== void 0 ? _lens$minFocusMeters2 : lens.minFocus) !== null && _ref133 !== void 0 ? _ref133 : lens.minFocusCm ? lens.minFocusCm / 100 : null;
    if (minFocus) attrs.push("".concat(minFocus, "m min focus"));
    opt.textContent = attrs.length ? "".concat(name, " (").concat(attrs.join(', '), ")") : name;
    lensSelect.appendChild(opt);
  });
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
function populateSensorModeDropdown() {
  var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  populateCameraPropertyDropdown('sensorMode', 'sensorModes', selected);
}
function populateCodecDropdown() {
  var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  populateCameraPropertyDropdown('codec', 'recordingCodecs', selected);
}
function populateFilterDropdown() {
  if (filterSelectElem && devices && Array.isArray(devices.filterOptions)) {
    if (!filterSelectElem.multiple) {
      var emptyOpt = document.createElement('option');
      emptyOpt.value = '';
      filterSelectElem.appendChild(emptyOpt);
    }
    devices.filterOptions.forEach(function (f) {
      var opt = document.createElement('option');
      opt.value = f;
      opt.textContent = f;
      filterSelectElem.appendChild(opt);
    });
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
function createFilterSizeSelect(type) {
  var selected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_FILTER_SIZE;
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var _options$includeId = options.includeId,
    includeId = _options$includeId === void 0 ? true : _options$includeId,
    _options$idPrefix = options.idPrefix,
    idPrefix = _options$idPrefix === void 0 ? 'filter-size-' : _options$idPrefix;
  var sel = document.createElement('select');
  if (includeId) {
    sel.id = "".concat(idPrefix).concat(filterId(type));
  }
  var sizes = [DEFAULT_FILTER_SIZE, '4x4', '6x6', '95mm'];
  if (type === 'Rota-Pol') sizes = [DEFAULT_FILTER_SIZE, '6x6', '95mm'];
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
  var selectedVals = Array.isArray(selected) && selected.length ? selected.slice() : defaults.slice();
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
  opts.forEach(function (o) {
    var opt = document.createElement('option');
    opt.value = o;
    opt.textContent = o;
    syncOption(opt, selectedVals.includes(o));
    sel.appendChild(opt);
  });
  sel.size = opts.length;
  sel.style.display = 'none';
  var container = document.createElement('span');
  container.className = 'filter-values-container';
  opts.forEach(function (o) {
    var lbl = document.createElement('label');
    lbl.className = 'filter-value-option';
    var cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.value = o;
    syncCheckbox(cb, selectedVals.includes(o));
    cb.addEventListener('change', function () {
      var opt = Array.from(sel.options).find(function (opt) {
        return opt.value === o;
      });
      if (opt) syncOption(opt, cb.checked);
      syncCheckbox(cb, cb.checked);
      sel.dispatchEvent(new Event('change'));
    });
    lbl.appendChild(cb);
    lbl.appendChild(document.createTextNode(o));
    container.appendChild(lbl);
  });
  sel.addEventListener('change', function () {
    Array.from(container.querySelectorAll('input[type="checkbox"]')).forEach(function (cb) {
      var opt = Array.from(sel.options).find(function (opt) {
        return opt.value === cb.value;
      });
      if (opt) syncOption(opt, opt.selected);
      syncCheckbox(cb, !!opt && opt.selected);
    });
  });
  container.appendChild(sel);
  return {
    container: container,
    select: sel
  };
}
function resolveFilterDisplayInfo(type) {
  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_FILTER_SIZE;
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
        label: 'IRND Filter',
        gearName: 'IRND Filter'
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
        label: 'ND Grad HE Filter',
        gearName: 'ND Grad HE Filter'
      };
    case 'ND Grad SE':
      return {
        label: 'ND Grad SE Filter',
        gearName: 'ND Grad SE Filter'
      };
    default:
      return {
        label: "".concat(type, " Filter Set"),
        gearName: "".concat(type, " Filter Set")
      };
  }
}
function buildFilterGearEntries() {
  var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var entries = [];
  filters.forEach(function (_ref134) {
    var type = _ref134.type,
      _ref134$size = _ref134.size,
      size = _ref134$size === void 0 ? DEFAULT_FILTER_SIZE : _ref134$size,
      values = _ref134.values;
    if (!type) return;
    var sizeValue = size || DEFAULT_FILTER_SIZE;
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
          var diopterValues = Array.isArray(values) && values.length ? values.slice() : (getFilterValueConfig(type).defaults || []).slice();
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
            _label30 = _resolveFilterDisplay2.label,
            _gearName = _resolveFilterDisplay2.gearName;
          entries.push({
            id: idBase,
            gearName: _gearName,
            label: _label30,
            type: type,
            size: sizeValue,
            values: []
          });
          break;
        }
      case 'Rota-Pol':
        {
          var _resolveFilterDisplay3 = resolveFilterDisplayInfo(type, sizeValue),
            _label31 = _resolveFilterDisplay3.label,
            _gearName2 = _resolveFilterDisplay3.gearName;
          var displaySize = _label31.includes(sizeValue) ? '' : sizeValue;
          entries.push({
            id: idBase,
            gearName: _gearName2,
            label: _label31,
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
            _label32 = _resolveFilterDisplay4.label,
            _gearName3 = _resolveFilterDisplay4.gearName;
          var gradValues = values == null ? (getFilterValueConfig(type).defaults || []).slice() : Array.isArray(values) ? values.slice() : [];
          entries.push({
            id: idBase,
            gearName: _gearName3,
            label: _label32,
            type: type,
            size: sizeValue,
            values: gradValues
          });
          break;
        }
      default:
        {
          var _resolveFilterDisplay5 = resolveFilterDisplayInfo(type, sizeValue),
            _label33 = _resolveFilterDisplay5.label,
            _gearName4 = _resolveFilterDisplay5.gearName;
          var filterValues = values == null ? (getFilterValueConfig(type).defaults || []).slice() : Array.isArray(values) ? values.slice() : [];
          entries.push({
            id: idBase,
            gearName: _gearName4,
            label: _label33,
            type: type,
            size: sizeValue,
            values: filterValues
          });
        }
    }
  });
  return entries;
}
function formatFilterEntryText(entry) {
  var details = [];
  if (entry.size) details.push(entry.size);
  if (entry.values && entry.values.length) details.push(entry.values.join(', '));
  var suffix = details.length ? " (".concat(details.join(' • '), ")") : '';
  return "1x ".concat(entry.label).concat(suffix);
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
    span.textContent = formatFilterEntryText(entry);
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
  var chosen = Array.isArray(selected) && selected.length ? selected.slice() : defaults.slice();
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
function renderFilterDetailsStorage(details) {
  if (!filterDetailsStorage) return;
  filterDetailsStorage.innerHTML = '';
  if (!details.length) {
    filterDetailsStorage.hidden = true;
    return;
  }
  filterDetailsStorage.hidden = true;
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
      filterDetailsStorage.appendChild(sizeSelect);
    }
    if (needsValues) {
      var valuesSelect = createFilterStorageValueSelect(type, values);
      valuesSelect.addEventListener('change', handleFilterDetailChange);
      filterDetailsStorage.appendChild(valuesSelect);
    }
  });
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
      size = detail.size,
      values = detail.values,
      needsSize = detail.needsSize,
      needsValues = detail.needsValues;
    var row = document.createElement('div');
    row.className = 'filter-detail';
    var heading = document.createElement('div');
    heading.className = 'filter-detail-label';
    heading.textContent = label;
    row.appendChild(heading);
    var controls = document.createElement('div');
    controls.className = 'filter-detail-controls';
    if (needsSize) {
      var sizeLabel = document.createElement('label');
      sizeLabel.className = 'filter-detail-size';
      var sizeText = document.createElement('span');
      sizeText.className = 'filter-detail-sublabel';
      sizeText.textContent = 'Size';
      var sizeSelect = createFilterSizeSelect(type, size, {
        includeId: false
      });
      sizeSelect.setAttribute('data-storage-id', "filter-size-".concat(filterId(type)));
      sizeLabel.append(sizeText, sizeSelect);
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
      var _getFilterValueConfig5 = getFilterValueConfig(type),
        opts = _getFilterValueConfig5.opts,
        _getFilterValueConfig6 = _getFilterValueConfig5.defaults,
        defaults = _getFilterValueConfig6 === void 0 ? [] : _getFilterValueConfig6;
      var currentValues = Array.isArray(values) && values.length ? values : defaults;
      opts.forEach(function (value) {
        var lbl = document.createElement('label');
        lbl.className = 'filter-value-option';
        var cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.value = value;
        if (currentValues.includes(value)) {
          cb.checked = true;
          cb.setAttribute('checked', '');
        }
        lbl.append(cb, document.createTextNode(value));
        optionsWrap.appendChild(lbl);
      });
      valuesWrap.append(valueLabel, optionsWrap);
      controls.appendChild(valuesWrap);
    }
    row.appendChild(controls);
    container.appendChild(row);
  });
}
function syncGearListFilterSize(storageId, value) {
  var storageSelect = document.getElementById(storageId);
  if (!storageSelect) return;
  if (storageSelect.value !== value) {
    storageSelect.value = value;
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
    storageSelect.dispatchEvent(new Event('change'));
  }
}
function renderFilterDetails() {
  if (!filterSelectElem) return;
  var selected = Array.from(filterSelectElem.selectedOptions).map(function (o) {
    return o.value;
  }).filter(Boolean);
  var existingSelections = collectFilterSelections();
  var existingTokens = existingSelections ? parseFilterTokens(existingSelections) : currentProjectInfo && currentProjectInfo.filter ? parseFilterTokens(currentProjectInfo.filter) : [];
  var existingMap = new Map(existingTokens.map(function (token) {
    return [token.type, token];
  }));
  var details = selected.map(function (type) {
    var prev = existingMap.get(type) || {};
    var size = prev.size || DEFAULT_FILTER_SIZE;
    var needsSize = type !== 'Diopter';
    var needsValues = filterTypeNeedsValueSelect(type);
    var _resolveFilterDisplay6 = resolveFilterDisplayInfo(type, size),
      label = _resolveFilterDisplay6.label;
    return {
      type: type,
      label: label,
      size: size,
      values: Array.isArray(prev.values) ? prev.values.slice() : undefined,
      needsSize: needsSize,
      needsValues: needsValues
    };
  });
  renderFilterDetailsStorage(details);
  renderGearListFilterDetails(details);
  if (matteboxSelect) {
    var needsSwing = selected.some(function (t) {
      return t === 'ND Grad HE' || t === 'ND Grad SE';
    });
    if (needsSwing) matteboxSelect.value = 'Swing Away';
  }
}
function handleFilterDetailChange() {
  if (!filterSelectElem) return;
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
  if (!filterSelectElem) return '';
  var selected = Array.from(filterSelectElem.selectedOptions).map(function (o) {
    return o.value;
  });
  var existing = currentProjectInfo && currentProjectInfo.filter ? parseFilterTokens(currentProjectInfo.filter) : [];
  var existingMap = Object.fromEntries(existing.map(function (t) {
    return [t.type, t];
  }));
  var tokens = selected.map(function (type) {
    var sizeSel = document.getElementById("filter-size-".concat(filterId(type)));
    var valSel = document.getElementById("filter-values-".concat(filterId(type)));
    var prev = existingMap[type] || {};
    var size = sizeSel ? sizeSel.value : prev.size || DEFAULT_FILTER_SIZE;
    var vals;
    if (valSel) {
      vals = Array.from(valSel.selectedOptions).map(function (o) {
        return o.value;
      });
    } else if (Array.isArray(prev.values) && prev.values.length) {
      vals = prev.values;
    } else {
      vals = [];
    }
    return "".concat(type, ":").concat(size).concat(vals && vals.length ? ':' + vals.join('|') : '');
  });
  return tokens.join(',');
}
function parseFilterTokens(str) {
  if (!str) return [];
  return str.split(',').map(function (s) {
    var _s$split$map = s.split(':').map(function (p) {
        return p.trim();
      }),
      _s$split$map2 = _slicedToArray(_s$split$map, 3),
      type = _s$split$map2[0],
      _s$split$map2$ = _s$split$map2[1],
      size = _s$split$map2$ === void 0 ? DEFAULT_FILTER_SIZE : _s$split$map2$,
      vals = _s$split$map2[2];
    return {
      type: type,
      size: size,
      values: vals ? vals.split('|').map(function (v) {
        return v.trim();
      }) : undefined
    };
  }).filter(function (t) {
    return t.type;
  });
}
function applyFilterSelectionsToGearList() {
  var info = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : currentProjectInfo;
  if (!gearListOutput) return;
  var tokens = info && info.filter ? parseFilterTokens(info.filter) : [];
  var entries = buildFilterGearEntries(tokens);
  updateGearListFilterEntries(entries);
  adjustGearListSelectWidths(gearListOutput);
}
function buildFilterSelectHtml() {
  var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var entries = buildFilterGearEntries(filters);
  var summaryHtml = entries.map(function (entry) {
    var attrs = ['class="gear-item"', "data-gear-name=\"".concat(escapeHtml(entry.gearName), "\""), "data-filter-entry=\"".concat(escapeHtml(entry.id), "\""), "data-filter-label=\"".concat(escapeHtml(entry.label), "\"")];
    if (entry.type) attrs.push("data-filter-type=\"".concat(escapeHtml(entry.type), "\""));
    var text = formatFilterEntryText(entry);
    return "<span ".concat(attrs.join(' '), ">").concat(escapeHtml(text), "</span>");
  }).join('<br>');
  var detailsContainer = entries.length ? '<div id="gearListFilterDetails" class="hidden" aria-live="polite"></div>' : '';
  return [summaryHtml, detailsContainer].filter(Boolean).join('<br>');
}
function collectFilterAccessories() {
  var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var items = [];
  filters.forEach(function (_ref135) {
    var type = _ref135.type;
    switch (type) {
      case 'ND Grad HE':
      case 'ND Grad SE':
        items.push('ARRI LMB 4x5 Pro Set');
        items.push('ARRI LMB 19mm Studio Rod Adapter');
        items.push('ARRI LMB 4x5 / LMB-6 Tray Catcher');
        break;
      default:
        break;
    }
  });
  return items;
}
function populateUserButtonDropdowns() {
  var functions = ['Toggle LUT', 'False Color', 'Peaking', 'Anamorphic Desqueeze', 'Surround View', '1:1 Zoom', 'Playback', 'Record', 'Zoom', 'Frame Lines', 'Frame Grab'];
  ['monitorUserButtons', 'cameraUserButtons', 'viewfinderUserButtons'].forEach(function (id) {
    var sel = document.getElementById(id);
    if (!sel) return;
    functions.forEach(function (fn) {
      var opt = document.createElement('option');
      opt.value = fn;
      opt.textContent = fn;
      sel.appendChild(opt);
    });
    sel.size = functions.length;
  });
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    APP_VERSION: APP_VERSION,
    closeSideMenu: closeSideMenu,
    openSideMenu: openSideMenu,
    setupSideMenu: setupSideMenu,
    setupResponsiveControls: setupResponsiveControls,
    setLanguage: setLanguage,
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
    getGearListSelectors: getGearListSelectors,
    applyGearListSelectors: applyGearListSelectors,
    setSelectValue: setSelectValue,
    autoSaveCurrentSetup: autoSaveCurrentSetup,
    saveCurrentSession: saveCurrentSession,
    restoreSessionState: restoreSessionState,
    displayGearAndRequirements: displayGearAndRequirements,
    ensureGearListActions: ensureGearListActions,
    bindGearListEasyrigListener: bindGearListEasyrigListener,
    populateSelect: populateSelect,
    populateLensDropdown: populateLensDropdown,
    populateCameraPropertyDropdown: populateCameraPropertyDropdown,
    populateRecordingResolutionDropdown: populateRecordingResolutionDropdown,
    populateSensorModeDropdown: populateSensorModeDropdown,
    populateCodecDropdown: populateCodecDropdown,
    updateRequiredScenariosSummary: updateRequiredScenariosSummary,
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
    captureStorageSnapshot: captureStorageSnapshot,
    searchKey: searchKey,
    searchTokens: searchTokens,
    findBestSearchMatch: findBestSearchMatch,
    runFeatureSearch: runFeatureSearch,
    __featureSearchInternals: {
      featureMap: featureMap,
      deviceMap: deviceMap,
      helpMap: helpMap,
      featureSearchInput: featureSearch,
      featureSearchClearButton: featureSearchClear,
      featureListElement: featureList
    },
    collectAutoGearCatalogNames: collectAutoGearCatalogNames,
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
    confirmAutoGearSelection: confirmAutoGearSelection,
    configureSharedImportOptions: configureSharedImportOptions,
    resolveSharedImportMode: resolveSharedImportMode
  };
}