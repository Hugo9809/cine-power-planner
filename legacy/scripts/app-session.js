var _excluded = ["parsed", "timestamp"];
function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
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
var SESSION_DEEP_CLONE = CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE.__cineDeepClone === 'function' ? CORE_GLOBAL_SCOPE.__cineDeepClone : function sessionFallbackDeepClone(value) {
  if (value === null || _typeof(value) !== 'object') {
    return value;
  }
  try {
    return JSON.parse(JSON.stringify(value));
  } catch (cloneError) {
    void cloneError;
  }
  return value;
};
if (CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE.__cineDeepClone !== 'function') {
  try {
    CORE_GLOBAL_SCOPE.__cineDeepClone = SESSION_DEEP_CLONE;
  } catch (sessionDeepCloneError) {
    void sessionDeepCloneError;
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
function getSessionRuntimeFunction(name) {
  if (typeof name !== 'string' || !name) {
    return null;
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
var settingsLogger = function () {
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
function requestSettingsOpen(context) {
  var dialog = resolveSettingsDialog();
  var trigger = resolveSettingsButton();
  var openBefore = dialog ? typeof isDialogOpen === 'function' ? isDialogOpen(dialog) : !!(dialog && dialog.open) : false;
  var detail = context && _typeof(context) === 'object' ? _objectSpread({}, context) : {};
  if (typeof detail.openBefore !== 'boolean') {
    detail.openBefore = openBefore;
  }
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
  var heading = headingTemplate.replace('{oldVersion}', fileVersion || unknownVersion).replace('{newVersion}', targetVersion || unknownVersion);
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
    '--button-size': 24,
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
    return function () {
      for (var _len = arguments.length, invocationArgs = new Array(_len), _key = 0; _key < _len; _key++) {
        invocationArgs[_key] = arguments[_key];
      }
      return callSessionCoreFunction(functionName, invocationArgs, options);
    };
  });
}
var AUTO_GEAR_RUNTIME_HANDLERS = ['handleAutoGearImportSelection', 'handleAutoGearPresetSelection', 'handleAutoGearSavePreset', 'handleAutoGearDeletePreset', 'handleAutoGearShowBackupsToggle', 'handleAutoGearConditionShortcut'];
for (var index = 0; index < AUTO_GEAR_RUNTIME_HANDLERS.length; index += 1) {
  var handlerName = AUTO_GEAR_RUNTIME_HANDLERS[index];
  ensureSessionRuntimeFunction(handlerName, {
    defer: true
  });
}
var AUTO_GEAR_RUNTIME_FUNCTIONS = ['setAutoGearSummaryFocus', 'focusAutoGearRuleById', 'setAutoGearSearchQuery', 'setAutoGearScenarioFilter', 'clearAutoGearFilters'];
for (var _index = 0; _index < AUTO_GEAR_RUNTIME_FUNCTIONS.length; _index += 1) {
  var functionName = AUTO_GEAR_RUNTIME_FUNCTIONS[_index];
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
var temperaturePreferenceStorageKey = typeof TEMPERATURE_STORAGE_KEY === 'string' ? TEMPERATURE_STORAGE_KEY : typeof resolveTemperatureStorageKey === 'function' ? resolveTemperatureStorageKey() : 'cameraPowerPlanner_temperatureUnit';
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
    if (typeof value.name === 'string' || typeof value.role === 'string' || typeof value.phone === 'string' || typeof value.email === 'string' || typeof value.text === 'string') {
      var name = typeof value.name === 'string' ? value.name.trim() : '';
      var role = typeof value.role === 'string' ? value.role.trim() : '';
      var phone = typeof value.phone === 'string' ? value.phone.trim() : '';
      var email = typeof value.email === 'string' ? value.email.trim() : '';
      var text = typeof value.text === 'string' ? value.text.trim() : '';
      return name || role || phone || email || text ? 1 : 0;
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
    if (key === 'prepDays' || key === 'shootingDays') {
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
  for (var _index2 = 0; _index2 < keys.length; _index2 += 1) {
    var key = keys[_index2];
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
  currentProjectInfo = deriveProjectInfo(info);
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
  if (typeof getDiagramManualPositions === 'function') {
    var diagramPositions = getDiagramManualPositions();
    if (diagramPositions && Object.keys(diagramPositions).length) {
      currentSetup.diagramPositions = diagramPositions;
    } else if (Object.prototype.hasOwnProperty.call(currentSetup, 'diagramPositions')) {
      delete currentSetup.diagramPositions;
    }
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
var PROJECT_AUTOSAVE_BASE_DELAY_MS = 300;
var PROJECT_AUTOSAVE_RETRY_DELAY_MS = 900;
var PROJECT_AUTOSAVE_RETRY_CAP_MS = 5000;
var PROJECT_AUTOSAVE_MAX_RETRIES = 4;
var projectAutoSaveTimer = null;
var projectAutoSaveFailureCount = 0;
var projectAutoSavePendingWhileRestoring = null;
var factoryResetInProgress = false;
var projectAutoSaveOverrides = null;
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
  var encounteredError = false;
  var guard = function guard(fn, context) {
    if (typeof fn !== 'function') {
      return true;
    }
    try {
      fn();
      return true;
    } catch (error) {
      encounteredError = true;
      console.error("Project autosave failed while ".concat(context, "."), error);
      return false;
    }
  };
  var hasSetupName = Boolean(setupNameInput && typeof setupNameInput.value === 'string' && setupNameInput.value.trim());
  if (!hasSetupName) {
    guard(function () {
      return saveCurrentSession();
    }, 'saving the current session state');
  }
  var setupSaved = guard(autoSaveCurrentSetup, 'saving the current setup');
  if (!setupSaved) {
    guard(function () {
      return saveCurrentSession({
        skipGearList: true
      });
    }, 'saving the current session state as a fallback');
  }
  guard(saveCurrentGearList, 'saving the gear list');
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
  if (overrides !== undefined) {
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
  var noteAutoBackupChange = function noteAutoBackupChange() {
    try {
      var scope = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : null;
      var notifier = scope && typeof scope.__cineNoteAutoBackupChange === 'function' ? scope.__cineNoteAutoBackupChange : null;
      if (notifier) {
        notifier({
          immediate: immediate,
          overrides: overrides !== undefined
        });
      }
    } catch (changeError) {
      console.warn('Failed to record auto backup change context', changeError);
    }
  };
  noteAutoBackupChange();
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
  projectForm.querySelectorAll('select').forEach(function (sel) {
    var handleUpdate = function handleUpdate() {
      return updateSelectIconBoxes(sel);
    };
    sel.addEventListener('change', handleUpdate);
    handleUpdate();
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
  if (gearListOutput || projectRequirementsOutput) {
    var typedName = getCurrentProjectName();
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
        saveProject(storageKey, payload);
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
  for (var _index3 = 0; _index3 < pairs.length; _index3 += 1) {
    var pair = pairs[_index3];
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
    populateRecordingResolutionDropdown(currentProjectInfo && currentProjectInfo.recordingResolution);
    populateSensorModeDropdown(currentProjectInfo && currentProjectInfo.sensorMode);
    if (typeof updateStorageRequirementTypeOptions === 'function') {
      updateStorageRequirementTypeOptions();
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
var flushProjectAutoSaveOnExit = function flushProjectAutoSaveOnExit() {
  if (factoryResetInProgress) return;
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
  try {
    if (scope && typeof scope.__cineNoteAutoBackupChange === 'function') {
      scope.__cineNoteAutoBackupChange({
        immediate: true,
        reason: 'before-exit'
      });
    }
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
var applyShowAutoBackupsPreference = function applyShowAutoBackupsPreference() {};
var rememberSettingsShowAutoBackupsBaseline = function rememberSettingsShowAutoBackupsBaseline() {};
var revertSettingsShowAutoBackupsIfNeeded = function revertSettingsShowAutoBackupsIfNeeded() {};
var rememberSettingsMountVoltagesBaseline = function rememberSettingsMountVoltagesBaseline() {};
var revertSettingsMountVoltagesIfNeeded = function revertSettingsMountVoltagesIfNeeded() {};
var handlePinkModeIconPress = function handlePinkModeIconPress() {};
var triggerPinkModeIconAnimation = function triggerPinkModeIconAnimation() {};
var startPinkModeIconRotation = function startPinkModeIconRotation() {};
var stopPinkModeIconRotation = function stopPinkModeIconRotation() {};
var startPinkModeAnimatedIconRotation = function startPinkModeAnimatedIconRotation() {};
var stopPinkModeAnimatedIconRotation = function stopPinkModeAnimatedIconRotation() {};
var applyPinkModeIcon = function applyPinkModeIcon() {};
var isPinkModeActive = function isPinkModeActive() {
  return !!(typeof document !== 'undefined' && document.body && document.body.classList.contains('pink-mode'));
};
var appearanceModuleFactory = ensureSessionRuntimePlaceholder('cineSettingsAppearance', function () {
  return null;
});
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
    temperatureUnit: typeof settingsTemperatureUnit !== 'undefined' ? settingsTemperatureUnit : null
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
  icons: {
    registry: (typeof ICON_GLYPHS === "undefined" ? "undefined" : _typeof(ICON_GLYPHS)) === 'object' ? ICON_GLYPHS : null,
    applyIconGlyph: typeof applyIconGlyph === 'function' ? function (element, glyph) {
      return applyIconGlyph(element, glyph);
    } : null,
    ensureSvgHasAriaHidden: typeof ensureSvgHasAriaHidden === 'function' ? ensureSvgHasAriaHidden : null,
    pinkModeIcons: (typeof pinkModeIcons === "undefined" ? "undefined" : _typeof(pinkModeIcons)) === 'object' ? pinkModeIcons : null,
    startPinkModeAnimatedIcons: typeof startPinkModeAnimatedIcons === 'function' ? startPinkModeAnimatedIcons : null,
    stopPinkModeAnimatedIcons: typeof stopPinkModeAnimatedIcons === 'function' ? stopPinkModeAnimatedIcons : null,
    triggerPinkModeIconRain: typeof triggerPinkModeIconRain === 'function' ? triggerPinkModeIconRain : null
  },
  storage: {
    getLocalStorage: function getLocalStorage() {
      try {
        return typeof localStorage !== 'undefined' ? localStorage : null;
      } catch (storageError) {
        void storageError;
        return null;
      }
    }
  },
  preferences: {
    getTemperatureUnit: function getTemperatureUnit() {
      return temperatureUnit;
    },
    setTemperatureUnit: function setTemperatureUnit(value) {
      temperatureUnit = value;
    },
    applyTemperatureUnitPreference: typeof applyTemperatureUnitPreference === 'function' ? applyTemperatureUnitPreference : null,
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
var appearanceModule = appearanceModuleFactory && typeof appearanceModuleFactory.initialize === 'function' ? appearanceModuleFactory.initialize(appearanceContext) : null;
if (appearanceModule) {
  updateThemeColor = appearanceModule.updateThemeColor || updateThemeColor;
  setToggleIcon = appearanceModule.setToggleIcon || setToggleIcon;
  applyDarkMode = appearanceModule.applyDarkMode || applyDarkMode;
  applyHighContrast = appearanceModule.applyHighContrast || applyHighContrast;
  applyReduceMotion = appearanceModule.applyReduceMotion || applyReduceMotion;
  applyRelaxedSpacing = appearanceModule.applyRelaxedSpacing || applyRelaxedSpacing;
  applyPinkMode = appearanceModule.applyPinkMode || applyPinkMode;
  persistPinkModePreference = appearanceModule.persistPinkModePreference || persistPinkModePreference;
  rememberSettingsPinkModeBaseline = appearanceModule.rememberSettingsPinkModeBaseline || rememberSettingsPinkModeBaseline;
  revertSettingsPinkModeIfNeeded = appearanceModule.revertSettingsPinkModeIfNeeded || revertSettingsPinkModeIfNeeded;
  rememberSettingsTemperatureUnitBaseline = appearanceModule.rememberSettingsTemperatureUnitBaseline || rememberSettingsTemperatureUnitBaseline;
  revertSettingsTemperatureUnitIfNeeded = appearanceModule.revertSettingsTemperatureUnitIfNeeded || revertSettingsTemperatureUnitIfNeeded;
  applyShowAutoBackupsPreference = appearanceModule.applyShowAutoBackupsPreference || applyShowAutoBackupsPreference;
  rememberSettingsShowAutoBackupsBaseline = appearanceModule.rememberSettingsShowAutoBackupsBaseline || rememberSettingsShowAutoBackupsBaseline;
  revertSettingsShowAutoBackupsIfNeeded = appearanceModule.revertSettingsShowAutoBackupsIfNeeded || revertSettingsShowAutoBackupsIfNeeded;
  rememberSettingsMountVoltagesBaseline = appearanceModule.rememberSettingsMountVoltagesBaseline || rememberSettingsMountVoltagesBaseline;
  revertSettingsMountVoltagesIfNeeded = appearanceModule.revertSettingsMountVoltagesIfNeeded || revertSettingsMountVoltagesIfNeeded;
  handlePinkModeIconPress = appearanceModule.handlePinkModeIconPress || handlePinkModeIconPress;
  triggerPinkModeIconAnimation = appearanceModule.triggerPinkModeIconAnimation || triggerPinkModeIconAnimation;
  startPinkModeIconRotation = appearanceModule.startPinkModeIconRotation || startPinkModeIconRotation;
  stopPinkModeIconRotation = appearanceModule.stopPinkModeIconRotation || stopPinkModeIconRotation;
  startPinkModeAnimatedIconRotation = appearanceModule.startPinkModeAnimatedIconRotation || startPinkModeAnimatedIconRotation;
  stopPinkModeAnimatedIconRotation = appearanceModule.stopPinkModeAnimatedIconRotation || stopPinkModeAnimatedIconRotation;
  applyPinkModeIcon = appearanceModule.applyPinkModeIcon || applyPinkModeIcon;
  isPinkModeActive = appearanceModule.isPinkModeActive || isPinkModeActive;
} else if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
  console.warn('cineSettingsAppearance module is not available; settings appearance features are limited.');
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
var highContrastEnabled = false;
try {
  highContrastEnabled = localStorage.getItem("highContrast") === "true";
} catch (e) {
  console.warn("Could not load high contrast preference", e);
}
applyHighContrast(highContrastEnabled);
if (typeof window !== 'undefined') {
  window.handlePinkModeIconPress = function () {
    handlePinkModeIconPress();
  };
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
rememberSettingsShowAutoBackupsBaseline();
rememberSettingsMountVoltagesBaseline();
if (pinkModeToggle) {
  pinkModeToggle.addEventListener("click", function (event) {
    if (event && event.isTrusted) {
      handlePinkModeIconPress();
    }
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
    if (typeof applyTemperatureUnitPreference === 'function') {
      applyTemperatureUnitPreference(settingsTemperatureUnit.value, {
        persist: false
      });
    }
  });
}
var mountVoltageInputNodes = Array.from(typeof document !== 'undefined' ? document.querySelectorAll('.mount-voltage-input') : []);
mountVoltageInputNodes.forEach(function (input) {
  input.addEventListener('change', handleMountVoltageInputChange);
  input.addEventListener('blur', handleMountVoltageInputChange);
});
var mountVoltageResetButtonRef = function () {
  var candidateScopes = [typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && (typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object' ? CORE_GLOBAL_SCOPE : null, typeof globalThis !== 'undefined' && (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object' ? globalThis : null, typeof window !== 'undefined' && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' ? window : null, typeof self !== 'undefined' && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object' ? self : null, typeof global !== 'undefined' && (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object' ? global : null].filter(Boolean);
  for (var _index4 = 0; _index4 < candidateScopes.length; _index4 += 1) {
    var scope = candidateScopes[_index4];
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
    if (settingsDarkMode) settingsDarkMode.checked = document.body.classList.contains('dark-mode');
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
    if (settingsTemperatureUnit) settingsTemperatureUnit.value = temperatureUnit;
    if (settingsFontSize) settingsFontSize.value = fontSize;
    if (settingsFontFamily) settingsFontFamily.value = fontFamily;
    if (settingsLogo) settingsLogo.value = '';
    if (settingsLogoPreview) safeLoadStoredLogoPreview();
    updateStorageSummary();
    if (autoGearEditor) {
      closeAutoGearEditor();
      refreshAutoGearScenarioOptions();
      refreshAutoGearMatteboxOptions();
      refreshAutoGearCameraHandleOptions();
      refreshAutoGearViewfinderExtensionOptions();
      refreshAutoGearVideoDistributionOptions();
      callSessionCoreFunction('refreshAutoGearCameraOptions', [], {
        defer: true
      });
      refreshAutoGearMonitorOptions();
      refreshAutoGearWirelessOptions();
      refreshAutoGearMotorsOptions();
      refreshAutoGearControllersOptions();
      refreshAutoGearDistanceOptions();
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
      } catch (_unused) {
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
  if (settingsSave) {
    settingsSave.addEventListener('click', function () {
      if (settingsLanguage) {
        setLanguage(settingsLanguage.value);
        if (typeof populateUserButtonDropdowns === 'function') {
          try {
            populateUserButtonDropdowns();
          } catch (userButtonError) {
            console.warn('Failed to refresh user button selectors after language change', userButtonError);
          }
        }
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
      if (settingsReduceMotion) {
        var _enabled2 = settingsReduceMotion.checked;
        applyReduceMotion(_enabled2);
        try {
          localStorage.setItem('reduceMotion', _enabled2);
        } catch (e) {
          console.warn('Could not save reduce motion preference', e);
        }
      }
      if (settingsRelaxedSpacing) {
        var _enabled3 = settingsRelaxedSpacing.checked;
        applyRelaxedSpacing(_enabled3);
        try {
          localStorage.setItem('relaxedSpacing', _enabled3);
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
      if (settingsTemperatureUnit) {
        applyTemperatureUnitPreference(settingsTemperatureUnit.value);
        rememberSettingsTemperatureUnitBaseline();
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
      rememberSettingsShowAutoBackupsBaseline();
      rememberSettingsMountVoltagesBaseline();
      closeDialog(settingsDialog);
      settingsDialog.setAttribute('hidden', '');
    });
  }
  settingsDialog.addEventListener('click', function (e) {
    if (e.target === settingsDialog) {
      revertSettingsPinkModeIfNeeded();
      rememberSettingsPinkModeBaseline();
      revertSettingsTemperatureUnitIfNeeded();
      rememberSettingsTemperatureUnitBaseline();
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
    }
  });
  settingsDialog.addEventListener('cancel', function (e) {
    e.preventDefault();
    revertSettingsPinkModeIfNeeded();
    rememberSettingsPinkModeBaseline();
    revertSettingsTemperatureUnitIfNeeded();
    rememberSettingsTemperatureUnitBaseline();
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
    return null;
  };
  if (autoGearResetFactoryButton) {
    var resetAutoGearRulesHandler = resolveResetAutoGearRulesHandler();
    if (resetAutoGearRulesHandler) {
      autoGearResetFactoryButton.addEventListener('click', resetAutoGearRulesHandler);
    } else {
      autoGearResetFactoryButton.disabled = true;
      autoGearResetFactoryButton.setAttribute('aria-disabled', 'true');
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Automatic gear reset action unavailable: reset handler missing.');
      }
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
        var _index5 = list.findIndex(function (item) {
          return item.id === itemId;
        });
        if (_index5 >= 0) {
          list.splice(_index5, 1);
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
var ensureNotificationContainer = function ensureNotificationContainer() {
  if (typeof document === 'undefined') return null;
  var id = 'backupNotificationContainer';
  var container = document.getElementById(id);
  if (!container) {
    container = document.createElement('div');
    container.id = id;
    container.style.position = 'fixed';
    container.style.right = '1rem';
    container.style.zIndex = '10000';
    document.body.appendChild(container);
  }
  container.style.top = getNotificationTopOffset();
  return container;
};
function showNotification(type, message) {
  if (typeof document === 'undefined') return;
  var container = ensureNotificationContainer();
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
    note.remove();
    if (!container.children.length) {
      container.remove();
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
  var container = ensureNotificationContainer();
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
      indicator.remove();
      if (!container.children.length) {
        container.remove();
      }
    }
  };
};
try {
  var scope = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : null;
  if (scope) {
    scope.__cineShowAutoBackupIndicator = showAutoBackupActivityIndicator;
  }
} catch (indicatorExposeError) {
  console.warn('Failed to expose auto backup indicator helper', indicatorExposeError);
}
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
    var _index6 = Number(indexMatch[1]);
    if (!Number.isFinite(_index6) || _index6 < 0) {
      return null;
    }
    var template = getDiffText('versionCompareListItemLabel', 'Item %s');
    return template.replace('%s', formatNumberForComparison(_index6 + 1));
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
      for (var _index7 = 0; _index7 < maxLength; _index7 += 1) {
        var hasBase = _index7 < baseValue.length;
        var hasCompare = _index7 < compareValue.length;
        var nextPath = path.concat("[".concat(_index7, "]"));
        if (!hasBase) {
          entries.push({
            type: 'added',
            path: nextPath,
            before: undefined,
            after: compareValue[_index7]
          });
        } else if (!hasCompare) {
          entries.push({
            type: 'removed',
            path: nextPath,
            before: baseValue[_index7],
            after: undefined
          });
        } else {
          walk(baseValue[_index7], compareValue[_index7], nextPath);
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
    appVersion: typeof APP_VERSION === 'string' ? APP_VERSION : null,
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
      applyTemperatureUnitPreference(restoredTemperatureUnit, {
        persist: false
      });
    } catch (error) {
      console.warn('Failed to apply restored temperature unit preference', error);
    }
  }
  try {
    applyDarkMode(safeGetItem('darkMode') === 'true');
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
    language: language || null
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
        var _message = describeError(error);
        recordDiagnostic(diagnostics, 'autoGearRules', 'error', {
          source: 'getBaseAutoGearRules',
          message: _message
        });
      }
    }
    var storedRules = null;
    if (typeof loadAutoGearRules === 'function') {
      try {
        storedRules = loadAutoGearRules();
      } catch (error) {
        console.warn('Failed to load automatic gear rules from storage for full backup', error);
        var _message2 = describeError(error);
        recordDiagnostic(diagnostics, 'autoGearRules', 'error', {
          source: 'loadAutoGearRules',
          message: _message2
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
    var _collectFullBackupDat = collectFullBackupData(),
      backupData = _collectFullBackupDat.data,
      diagnostics = _collectFullBackupDat.diagnostics;
    var backup = {
      version: APP_VERSION,
      generatedAt: iso,
      settings: settings,
      sessionStorage: Object.keys(sessionEntries).length ? sessionEntries : undefined,
      data: backupData
    };
    if (Array.isArray(diagnostics) && diagnostics.length) {
      backup.diagnostics = diagnostics;
    }
    var payload = JSON.stringify(backup);
    var downloadResult = downloadBackupPayload(payload, fileName);
    if (!downloadResult || !downloadResult.success) {
      throw new Error('No supported download method available');
    }
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
  namespaceDebounce: null
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
function resolveLoggingApi() {
  if (loggingState.loggingApi && typeof loggingState.loggingApi.getHistory === 'function') {
    return loggingState.loggingApi;
  }
  var scopes = [];
  if (typeof globalThis !== 'undefined' && globalThis) scopes.push(globalThis);
  if (typeof window !== 'undefined' && window && scopes.indexOf(window) === -1) scopes.push(window);
  if (typeof self !== 'undefined' && self && scopes.indexOf(self) === -1) scopes.push(self);
  if (typeof global !== 'undefined' && global && scopes.indexOf(global) === -1) scopes.push(global);
  for (var _index8 = 0; _index8 < scopes.length; _index8 += 1) {
    var _scope = scopes[_index8];
    if (!_scope || _typeof(_scope) !== 'object' && typeof _scope !== 'function') {
      continue;
    }
    try {
      var candidate = _scope.cineLogging;
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
  var inputs = [loggingLevelFilterEl, loggingNamespaceFilterEl, loggingHistoryLimitInput, loggingConsoleOutputInput, loggingCaptureConsoleInput, loggingCaptureErrorsInput, loggingPersistSessionInput];
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
function renderLoggingHistory() {
  loggingState.renderScheduled = false;
  if (!loggingSectionEl || !loggingHistoryListEl) {
    return;
  }
  var logging = resolveLoggingApi();
  var _getLoggingLangInfo2 = getLoggingLangInfo(),
    langTexts = _getLoggingLangInfo2.langTexts,
    fallbackTexts = _getLoggingLangInfo2.fallbackTexts;
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
      var namespaceValue = document.createElement('dd');
      namespaceValue.textContent = namespace;
      namespaceRow.appendChild(namespaceLabel);
      namespaceRow.appendChild(namespaceValue);
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
  setLoggingStatusKey('loggingStatusIdle');
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
  var _getLoggingLangInfo3 = getLoggingLangInfo(),
    langTexts = _getLoggingLangInfo3.langTexts,
    fallbackTexts = _getLoggingLangInfo3.fallbackTexts;
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
function updateLoggingConfig(partial) {
  var logging = resolveLoggingApi();
  if (!logging || typeof logging.setConfig !== 'function' || !partial || _typeof(partial) !== 'object') {
    return;
  }
  try {
    logging.setConfig(partial);
  } catch (error) {
    console.warn('Unable to update logging config', error);
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
    applyLoggingConfig(typeof logging.getConfig === 'function' ? logging.getConfig() : {});
  } catch (error) {
    console.warn('Unable to read logging config', error);
  }
  detachLoggingSubscriptions();
  if (typeof logging.subscribe === 'function') {
    loggingState.unsubscribeHistory = logging.subscribe(function () {
      setLoggingStatusKey('loggingStatusUpdating');
      scheduleLoggingRender();
    });
  }
  if (typeof logging.subscribeConfig === 'function') {
    loggingState.unsubscribeConfig = logging.subscribeConfig(function (snapshot) {
      applyLoggingConfig(snapshot || {});
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
      setLoggingStatusKey('loggingStatusUpdating');
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
        setLoggingStatusKey('loggingStatusUpdating');
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
      setLoggingStatusKey('loggingStatusUpdating');
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
      setLoggingStatusKey('loggingStatusUpdating');
      updateLoggingConfig(_defineProperty({}, key, checked));
    });
  };
  registerToggleHandler(loggingConsoleOutputInput, 'consoleOutput');
  registerToggleHandler(loggingCaptureConsoleInput, 'captureConsole');
  registerToggleHandler(loggingCaptureErrorsInput, 'captureGlobalErrors');
  registerToggleHandler(loggingPersistSessionInput, 'persistSession');
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
  if (storagePersistenceState.requestInFlight) {
    message = langTexts.storagePersistenceStatusRequesting || fallbackTexts.storagePersistenceStatusRequesting || '';
  } else if (storagePersistenceState.checking) {
    message = langTexts.storagePersistenceStatusChecking || fallbackTexts.storagePersistenceStatusChecking || '';
  } else if (storagePersistenceState.supported === false) {
    message = langTexts.storagePersistenceStatusUnsupported || fallbackTexts.storagePersistenceStatusUnsupported || '';
  } else if (storagePersistenceState.persisted) {
    message = langTexts.storagePersistenceStatusGranted || fallbackTexts.storagePersistenceStatusGranted || '';
  } else if (storagePersistenceState.lastError) {
    message = langTexts.storagePersistenceStatusError || fallbackTexts.storagePersistenceStatusError || '';
  } else if (storagePersistenceState.requestAttempted && storagePersistenceState.lastRequestDenied) {
    message = langTexts.storagePersistenceStatusDenied || fallbackTexts.storagePersistenceStatusDenied || '';
  } else {
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
}
function refreshStoragePersistenceStatus() {
  return _refreshStoragePersistenceStatus.apply(this, arguments);
}
function _refreshStoragePersistenceStatus() {
  _refreshStoragePersistenceStatus = _asyncToGenerator(_regenerator().m(function _callee() {
    var options,
      _ref27,
      _ref27$fromRequest,
      fromRequest,
      checkToken,
      storageManager,
      persistedValue,
      usageValue,
      quotaValue,
      estimate,
      _args = arguments,
      _t,
      _t2;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
          if (storagePersistenceStatusEl) {
            _context.n = 1;
            break;
          }
          return _context.a(2);
        case 1:
          _ref27 = options || {}, _ref27$fromRequest = _ref27.fromRequest, fromRequest = _ref27$fromRequest === void 0 ? false : _ref27$fromRequest;
          checkToken = ++storagePersistenceCheckToken;
          storagePersistenceState.checking = true;
          if (!fromRequest) {
            storagePersistenceState.lastError = null;
          }
          renderStoragePersistenceStatus();
          storageManager = getStorageManagerInstance();
          if (storageManager) {
            _context.n = 3;
            break;
          }
          if (!(checkToken !== storagePersistenceCheckToken)) {
            _context.n = 2;
            break;
          }
          return _context.a(2);
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
          return _context.a(2);
        case 3:
          storagePersistenceState.supported = true;
          persistedValue = storagePersistenceState.persisted;
          if (!(typeof storageManager.persisted === 'function')) {
            _context.n = 7;
            break;
          }
          _context.p = 4;
          _context.n = 5;
          return storageManager.persisted();
        case 5:
          persistedValue = _context.v;
          _context.n = 7;
          break;
        case 6:
          _context.p = 6;
          _t = _context.v;
          console.warn('Unable to determine persistent storage state', _t);
        case 7:
          usageValue = storagePersistenceState.usage;
          quotaValue = storagePersistenceState.quota;
          if (!(typeof storageManager.estimate === 'function')) {
            _context.n = 11;
            break;
          }
          _context.p = 8;
          _context.n = 9;
          return storageManager.estimate();
        case 9:
          estimate = _context.v;
          if (estimate && _typeof(estimate) === 'object') {
            if (typeof estimate.usage === 'number' && Number.isFinite(estimate.usage)) {
              usageValue = estimate.usage;
            }
            if (typeof estimate.quota === 'number' && Number.isFinite(estimate.quota)) {
              quotaValue = estimate.quota;
            }
          }
          _context.n = 11;
          break;
        case 10:
          _context.p = 10;
          _t2 = _context.v;
          console.warn('Unable to estimate storage usage', _t2);
        case 11:
          if (!(checkToken !== storagePersistenceCheckToken)) {
            _context.n = 12;
            break;
          }
          return _context.a(2);
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
          return _context.a(2);
      }
    }, _callee, null, [[8, 10], [4, 6]]);
  }));
  return _refreshStoragePersistenceStatus.apply(this, arguments);
}
function handleStoragePersistenceRequest(_x3) {
  return _handleStoragePersistenceRequest.apply(this, arguments);
}
function _handleStoragePersistenceRequest() {
  _handleStoragePersistenceRequest = _asyncToGenerator(_regenerator().m(function _callee2(event) {
    var storageManager, granted, alreadyGranted, result, _t3;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          if (event && typeof event.preventDefault === 'function') {
            event.preventDefault();
          }
          if (!(!storagePersistenceRequestButton || storagePersistenceState.requestInFlight)) {
            _context2.n = 1;
            break;
          }
          return _context2.a(2);
        case 1:
          storageManager = getStorageManagerInstance();
          storagePersistenceState.requestAttempted = true;
          if (!(!storageManager || typeof storageManager.persist !== 'function')) {
            _context2.n = 2;
            break;
          }
          storagePersistenceState.supported = Boolean(storageManager);
          storagePersistenceState.lastRequestDenied = true;
          storagePersistenceState.lastError = null;
          renderStoragePersistenceStatus();
          return _context2.a(2);
        case 2:
          storagePersistenceState.requestInFlight = true;
          storagePersistenceState.lastError = null;
          renderStoragePersistenceStatus();
          granted = false;
          alreadyGranted = false;
          _context2.p = 3;
          if (!(typeof requestPersistentStorage === 'function')) {
            _context2.n = 5;
            break;
          }
          _context2.n = 4;
          return requestPersistentStorage();
        case 4:
          result = _context2.v;
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
          _context2.n = 7;
          break;
        case 5:
          _context2.n = 6;
          return storageManager.persist();
        case 6:
          granted = _context2.v;
        case 7:
          _context2.n = 9;
          break;
        case 8:
          _context2.p = 8;
          _t3 = _context2.v;
          storagePersistenceState.lastError = _t3;
          console.warn('Persistent storage request failed', _t3);
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
          return _context2.a(2);
      }
    }, _callee2, null, [[3, 8]]);
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
        setLanguage(restoredPreferences.language);
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
      if (fileVersion !== APP_VERSION) {
        var compatibilityMessage = buildRestoreVersionCompatibilityMessage({
          langTexts: langTexts,
          fallbackTexts: fallbackTexts,
          fileVersion: fileVersion,
          targetVersion: APP_VERSION,
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
        setLanguage(restoredPreferenceState.language);
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
      var sliderSelect = getSliderBowlSelect();
      if (sliderSelect) sliderSelect.value = '';
    } catch (error) {
      console.warn('Failed to reset slider bowl selection during factory reset', error);
    }
    try {
      var easyrigSelect = getEasyrigSelect();
      if (easyrigSelect) easyrigSelect.value = '';
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
      resetCustomFontsForFactoryReset();
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
      var _errorMsg = langTexts.factoryResetError || 'Factory reset failed. Please try again.';
      showNotification('error', _errorMsg);
      return;
    }
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
        resetPlannerStateAfterFactoryReset();
      } catch (resetError) {
        console.warn('Failed to reset planner state after factory reset', resetError);
      }
      try {
        darkModeEnabled = false;
        applyDarkMode(false);
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
        var resetMountVoltagePreferencesFn = getSessionRuntimeFunction('resetMountVoltagePreferences');
        if (resetMountVoltagePreferencesFn) {
          resetMountVoltagePreferencesFn({
            persist: true,
            triggerUpdate: true
          });
        } else {
          warnMissingMountVoltageHelper('resetMountVoltagePreferences');
        }
        var updateMountVoltageInputsFromStateFn = getSessionRuntimeFunction('updateMountVoltageInputsFromState');
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
      var successMsg = langTexts.factoryResetSuccess || 'Backup downloaded. All planner data cleared. Reloading…';
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
      var _errorMsg2 = langTexts.factoryResetError || 'Factory reset failed. Please try again.';
      showNotification('error', _errorMsg2);
    }
  });
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
  scopeCandidates.forEach(function (_ref15) {
    var scope = _ref15.scope,
      label = _ref15.label;
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
  if (!originalHref) {
    return {
      originalHref: originalHref,
      nextHref: originalHref,
      param: param,
      timestamp: timestamp
    };
  }
  if (typeof URL === 'function') {
    try {
      var url = new URL(originalHref);
      url.searchParams.set(param, timestamp);
      return {
        originalHref: originalHref,
        nextHref: url.toString(),
        param: param,
        timestamp: timestamp
      };
    } catch (urlError) {
      void urlError;
      try {
        var derived = new URL(originalHref, originalHref);
        derived.searchParams.set(param, timestamp);
        return {
          originalHref: originalHref,
          nextHref: derived.toString(),
          param: param,
          timestamp: timestamp
        };
      } catch (fallbackError) {
        void fallbackError;
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
  console.warn('Forced reload navigation attempt did not update location', {
    description: description,
    before: before,
    after: after,
    expected: expected
  });
  return false;
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
  var hashFallback = hashBase ? "".concat(hashBase, "#forceReload-").concat(Date.now().toString(36)) : '';
  var steps = [];
  if (hasReload) {
    steps.push({
      delay: 350,
      run: function run() {
        try {
          locationLike.reload();
        } catch (error) {
          console.warn('Timed force reload fallback failed', error);
        }
      }
    });
  }
  if (fallbackHref) {
    if (typeof locationLike.assign === 'function') {
      steps.push({
        delay: hasReload ? 850 : 350,
        run: function run() {
          try {
            locationLike.assign(fallbackHref);
          } catch (error) {
            console.warn('Forced reload fallback via location.assign failed', error);
          }
        }
      });
    }
    if (typeof locationLike.replace === 'function') {
      steps.push({
        delay: hasReload ? 1150 : 650,
        run: function run() {
          try {
            locationLike.replace(fallbackHref);
          } catch (error) {
            console.warn('Forced reload fallback via location.replace failed', error);
          }
        }
      });
    }
    steps.push({
      delay: hasReload ? 1450 : 950,
      run: function run() {
        try {
          locationLike.href = fallbackHref;
        } catch (error) {
          console.warn('Forced reload fallback via href assignment failed', error);
        }
      }
    });
  }
  if (hashFallback && hashFallback !== fallbackHref) {
    steps.push({
      delay: hasReload ? 1750 : 1250,
      run: function run() {
        try {
          locationLike.href = hashFallback;
        } catch (error) {
          console.warn('Forced reload fallback via hash injection failed', error);
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
  var originalHref = forceReloadUrl.originalHref;
  var nextHref = forceReloadUrl.nextHref;
  var baseHref = normaliseForceReloadHref(originalHref, originalHref) || originalHref;
  return {
    win: win,
    location: location,
    hasReplace: hasReplace,
    hasAssign: hasAssign,
    hasReload: hasReload,
    originalHref: originalHref,
    nextHref: nextHref,
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
  if (!navigationTriggered && hasReload) {
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
      hasReload: hasReload
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
function clearCachesAndReload() {
  return _clearCachesAndReload.apply(this, arguments);
}
function _clearCachesAndReload() {
  _clearCachesAndReload = _asyncToGenerator(_regenerator().m(function _callee3() {
    var reloadFallback, offlineModule, beforeReloadHref, result, reloadHandled, navigationObserved, uiCacheCleared, registrations, _navigator, serviceWorker, regs, reg, readyReg, keys, win, _t4, _t5, _t6, _t7;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          reloadFallback = typeof window !== 'undefined' && window ? createReloadFallback(window) : null;
          offlineModule = typeof globalThis !== 'undefined' && globalThis && globalThis.cineOffline || typeof window !== 'undefined' && window && window.cineOffline || null;
          beforeReloadHref = typeof window !== 'undefined' && window && window.location ? readLocationHrefSafe(window.location) : '';
          if (!(offlineModule && typeof offlineModule.reloadApp === 'function')) {
            _context3.n = 6;
            break;
          }
          _context3.p = 1;
          _context3.n = 2;
          return offlineModule.reloadApp({
            window: window,
            navigator: typeof navigator !== 'undefined' ? navigator : undefined,
            caches: typeof caches !== 'undefined' ? caches : undefined
          });
        case 2:
          result = _context3.v;
          reloadHandled = result === true || result && _typeof(result) === 'object' && (result.reloadTriggered === true || result.navigationTriggered === true);
          if (!reloadHandled) {
            _context3.n = 4;
            break;
          }
          _context3.n = 3;
          return waitForReloadNavigation(beforeReloadHref).catch(function () {
            return false;
          });
        case 3:
          navigationObserved = _context3.v;
          if (!navigationObserved) {
            _context3.n = 4;
            break;
          }
          return _context3.a(2);
        case 4:
          _context3.n = 6;
          break;
        case 5:
          _context3.p = 5;
          _t4 = _context3.v;
          console.warn('Offline module reload failed, falling back to manual refresh', _t4);
        case 6:
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
          _context3.p = 7;
          if (!(typeof navigator !== 'undefined' && navigator.serviceWorker)) {
            _context3.n = 19;
            break;
          }
          registrations = [];
          _navigator = navigator, serviceWorker = _navigator.serviceWorker;
          _context3.p = 8;
          if (!(typeof serviceWorker.getRegistrations === 'function')) {
            _context3.n = 10;
            break;
          }
          _context3.n = 9;
          return serviceWorker.getRegistrations();
        case 9:
          regs = _context3.v;
          if (Array.isArray(regs)) {
            regs.forEach(function (reg) {
              return registrations.push(reg);
            });
          }
          _context3.n = 16;
          break;
        case 10:
          if (!(typeof serviceWorker.getRegistration === 'function')) {
            _context3.n = 12;
            break;
          }
          _context3.n = 11;
          return serviceWorker.getRegistration();
        case 11:
          reg = _context3.v;
          if (reg) {
            registrations.push(reg);
          }
          _context3.n = 16;
          break;
        case 12:
          if (!(serviceWorker.ready && typeof serviceWorker.ready.then === 'function')) {
            _context3.n = 16;
            break;
          }
          _context3.p = 13;
          _context3.n = 14;
          return serviceWorker.ready;
        case 14:
          readyReg = _context3.v;
          if (readyReg) {
            registrations.push(readyReg);
          }
          _context3.n = 16;
          break;
        case 15:
          _context3.p = 15;
          _t5 = _context3.v;
          console.warn('Failed to await active service worker', _t5);
        case 16:
          _context3.n = 18;
          break;
        case 17:
          _context3.p = 17;
          _t6 = _context3.v;
          console.warn('Failed to query service worker registrations', _t6);
        case 18:
          if (!registrations.length) {
            _context3.n = 19;
            break;
          }
          _context3.n = 19;
          return Promise.all(registrations.map(function (reg) {
            if (!reg || typeof reg.unregister !== 'function') {
              return Promise.resolve();
            }
            return reg.unregister().catch(function (unregisterError) {
              console.warn('Service worker unregister failed', unregisterError);
            });
          }));
        case 19:
          if (!(typeof caches !== 'undefined' && caches && typeof caches.keys === 'function')) {
            _context3.n = 21;
            break;
          }
          _context3.n = 20;
          return caches.keys();
        case 20:
          keys = _context3.v;
          _context3.n = 21;
          return Promise.all(keys.map(function (key) {
            if (!key || typeof caches.delete !== 'function') {
              return Promise.resolve(false);
            }
            return caches.delete(key).catch(function (cacheError) {
              console.warn('Failed to delete cache', key, cacheError);
              return false;
            });
          }));
        case 21:
          _context3.n = 23;
          break;
        case 22:
          _context3.p = 22;
          _t7 = _context3.v;
          console.warn('Cache clear failed', _t7);
        case 23:
          _context3.p = 23;
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
          return _context3.f(23);
        case 24:
          return _context3.a(2);
      }
    }, _callee3, null, [[13, 15], [8, 17], [7, 22, 23, 24], [1, 5]]);
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
    } catch (_unused2) {}
    try {
      textarea.select();
      if (typeof textarea.setSelectionRange === 'function') {
        textarea.setSelectionRange(0, textarea.value.length);
      }
    } catch (_unused3) {}
    if (typeof document.execCommand === 'function') {
      try {
        document.execCommand('copy');
      } catch (_unused4) {}
    }
  } catch (_unused5) {} finally {
    if (textarea && textarea.parentNode) {
      textarea.parentNode.removeChild(textarea);
    }
    if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
      try {
        previousActiveElement.focus();
      } catch (_unused6) {}
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
    if (!element) return;
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
    helpQuickLinkItems.forEach(function (_ref16) {
      var section = _ref16.section,
        listItem = _ref16.listItem,
        button = _ref16.button;
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
    helpQuickLinkItems.forEach(function (_ref17) {
      var button = _ref17.button,
        label = _ref17.label;
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
    var _ref18 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      totalCount = _ref18.totalCount,
      visibleCount = _ref18.visibleCount,
      hasQuery = _ref18.hasQuery,
      queryText = _ref18.queryText;
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
        } catch (_unused11) {}
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
      var _ref19 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref19$includeTextCon = _ref19.includeTextContent,
        includeTextContent = _ref19$includeTextCon === void 0 ? false : _ref19$includeTextCon,
        _ref19$preferTextAsLa = _ref19.preferTextAsLabel,
        preferTextAsLabel = _ref19$preferTextAsLa === void 0 ? false : _ref19$preferTextAsLa;
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
      var _ref20 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref20$preferTextAsLa = _ref20.preferTextAsLabel,
        preferTextAsLabel = _ref20$preferTextAsLa === void 0 ? false : _ref20$preferTextAsLa;
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
      hoverHelpTooltip.remove();
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
    if (typeof (e === null || e === void 0 ? void 0 : e.clientX) === 'number' && typeof (e === null || e === void 0 ? void 0 : e.clientY) === 'number') {
      hoverHelpPointerClientX = e.clientX;
      hoverHelpPointerClientY = e.clientY;
    }
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
    if (!hoverHelpActive || !hoverHelpTooltip) return;
    hoverHelpPointerClientX = e.clientX;
    hoverHelpPointerClientY = e.clientY;
    if (hoverHelpCurrentTarget) {
      positionHoverHelpTooltip(hoverHelpCurrentTarget);
    }
  };
  window.addEventListener('pointermove', updatePointerPosition, true);
  window.addEventListener('pointerdown', updatePointerPosition, true);
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
    } catch (_unused12) {
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
    var setActiveDropdownOption = function setActiveDropdownOption(index) {
      var options = getDropdownOptions();
      if (!options.length) return null;
      var bounded = Math.max(0, Math.min(index, options.length - 1));
      options.forEach(function (option, optIndex) {
        option.setAttribute('tabindex', optIndex === bounded ? '0' : '-1');
      });
      options[bounded].focus();
      if (featureSearchDropdown) {
        featureSearchDropdown.dataset.activeIndex = String(bounded);
      }
      return options[bounded];
    };
    var closeFeatureSearchDropdown = function closeFeatureSearchDropdown() {
      if (!featureSearchDropdown) return;
      featureSearchDropdown.dataset.open = 'false';
      featureSearchDropdown.hidden = true;
      featureSearchDropdown.setAttribute('aria-expanded', 'false');
      featureSearchDropdown.dataset.activeIndex = '';
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
      var container = featureSearchDropdown.closest('.feature-search');
      if (container) container.classList.add('feature-search-open');
    };
    var applyFeatureSearchSuggestion = function applyFeatureSearchSuggestion(value) {
      var _featureSearch$setSel, _featureSearch2;
      if (!featureSearch || !value) return;
      featureSearch.value = value;
      try {
        featureSearch.focus({
          preventScroll: true
        });
      } catch (_unused13) {
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
        setActiveDropdownOption(nextIndex >= options.length ? 0 : nextIndex);
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
          setActiveDropdownOption(_options.length - 1);
        } else {
          var prevIndex = Number(_activeIndex) - 1;
          setActiveDropdownOption(prevIndex >= 0 ? prevIndex : _options.length - 1);
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
          setActiveDropdownOption(nextIndex >= options.length ? 0 : nextIndex);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          var prevIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
          setActiveDropdownOption(prevIndex);
        } else if (e.key === 'Home') {
          e.preventDefault();
          setActiveDropdownOption(0);
        } else if (e.key === 'End') {
          e.preventDefault();
          setActiveDropdownOption(options.length - 1);
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
      darkModeEnabled = !document.body.classList.contains('dark-mode');
      applyDarkMode(darkModeEnabled);
      try {
        localStorage.setItem('darkMode', darkModeEnabled);
      } catch (err) {
        console.warn('Could not save dark mode preference', err);
      }
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
  for (var _index9 = 0; _index9 < scopes.length; _index9 += 1) {
    var _scope2 = scopes[_index9];
    if (!_scope2 || _typeof(_scope2) !== 'object') {
      continue;
    }
    try {
      _scope2.getRequiredScenarioOptionEntries = getter;
    } catch (assignError) {
      try {
        Object.defineProperty(_scope2, 'getRequiredScenarioOptionEntries', {
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
  return Array.from(options.entries()).map(function (_ref21) {
    var _ref22 = _slicedToArray(_ref21, 2),
      value = _ref22[0],
      label = _ref22[1];
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
  document.querySelectorAll('#projectForm select').forEach(function (sel) {
    attachSelectSearch(sel);
    callSessionCoreFunction('initFavoritableSelect', [sel], {
      defer: true
    });
  });
  if (typeof globalThis !== 'undefined' && typeof globalThis.setupInstallBanner === 'function') {
    globalThis.setupInstallBanner();
  }
  setLanguage(currentLang);
  if (typeof populateUserButtonDropdowns === 'function') {
    try {
      populateUserButtonDropdowns();
    } catch (userButtonError) {
      console.warn('Failed to refresh user button selectors after applying current language', userButtonError);
    }
  }
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
function populateEnvironmentDropdowns() {
  var tempSelect = document.getElementById('fbTemperature');
  if (tempSelect) {
    ensureFeedbackTemperatureOptionsSafe(tempSelect);
    updateFeedbackTemperatureOptionsSafe();
  }
}
function populateLensDropdown() {
  if (!lensSelect) return;
  var lensData = (devices && devices.lenses && Object.keys(devices.lenses).length ? devices.lenses : null) || devices && devices.accessories && devices.accessories.lenses || null;
  if (!lensData || Object.keys(lensData).length === 0) {
    return;
  }
  var previousSelection = new Set(Array.from(lensSelect.selectedOptions || []).map(function (opt) {
    return opt.value;
  }));
  lensSelect.innerHTML = '';
  if (!lensSelect.multiple) {
    var emptyOpt = document.createElement('option');
    emptyOpt.value = '';
    lensSelect.appendChild(emptyOpt);
  }
  Object.keys(lensData).sort(localeSort).forEach(function (name) {
    var _ref23, _lens$minFocusMeters;
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
    var minFocus = (_ref23 = (_lens$minFocusMeters = lens.minFocusMeters) !== null && _lens$minFocusMeters !== void 0 ? _lens$minFocusMeters : lens.minFocus) !== null && _ref23 !== void 0 ? _ref23 : lens.minFocusCm ? lens.minFocusCm / 100 : null;
    if (minFocus) attrs.push("".concat(minFocus, "m min focus"));
    opt.textContent = attrs.length ? "".concat(name, " (").concat(attrs.join(', '), ")") : name;
    if (previousSelection.has(name)) {
      opt.selected = true;
    }
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
  var select = resolveFilterSelectElement();
  if (select && devices && Array.isArray(devices.filterOptions)) {
    if (!select.multiple) {
      var emptyOpt = document.createElement('option');
      emptyOpt.value = '';
      select.appendChild(emptyOpt);
    }
    devices.filterOptions.forEach(function (f) {
      var opt = document.createElement('option');
      opt.value = f;
      opt.textContent = f;
      select.appendChild(opt);
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
  var checkboxName = "filterValues-".concat(filterId(type));
  opts.forEach(function (o) {
    var lbl = document.createElement('label');
    lbl.className = 'filter-value-option';
    var cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.name = checkboxName;
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
  filters.forEach(function (_ref24) {
    var type = _ref24.type,
      _ref24$size = _ref24.size,
      size = _ref24$size === void 0 ? SESSION_DEFAULT_FILTER_SIZE : _ref24$size,
      values = _ref24.values;
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
    if (label) heading.setAttribute('data-filter-label', label);
    if (type) heading.setAttribute('data-filter-type', type);
    var shouldHideSize = !!needsSize;
    if (shouldHideSize) {
      heading.setAttribute('data-filter-hide-size', '');
    } else {
      heading.removeAttribute('data-filter-hide-size');
    }
    heading.textContent = label ? "1x ".concat(label) : '';
    row.appendChild(heading);
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
  var select = resolveFilterSelectElement();
  if (!select) return;
  var selected = Array.from(select.selectedOptions).map(function (o) {
    return o.value;
  }).filter(Boolean);
  var existingSelections = collectFilterSelections();
  var existingTokens = existingSelections ? parseFilterTokens(existingSelections) : currentProjectInfo && currentProjectInfo.filter ? parseFilterTokens(currentProjectInfo.filter) : [];
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
  var selected = Array.from(select.selectedOptions).map(function (o) {
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
  return tokens.join(',');
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
  filters.forEach(function (_ref25) {
    var type = _ref25.type;
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
  var _texts, _texts2;
  var lang = typeof currentLang === 'string' && texts[currentLang] ? currentLang : 'en';
  var fallbackProjectForm = ((_texts = texts) === null || _texts === void 0 || (_texts = _texts.en) === null || _texts === void 0 ? void 0 : _texts.projectForm) || {};
  var langProjectForm = ((_texts2 = texts) === null || _texts2 === void 0 || (_texts2 = _texts2[lang]) === null || _texts2 === void 0 ? void 0 : _texts2.projectForm) || fallbackProjectForm;
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
    sel.innerHTML = '';
    items.forEach(function (_ref26) {
      var value = _ref26.value,
        label = _ref26.label;
      if (!value) {
        return;
      }
      var opt = document.createElement('option');
      opt.value = value;
      opt.textContent = label;
      if (previouslySelected.has(value)) {
        opt.selected = true;
      }
      sel.appendChild(opt);
    });
    previouslySelected.forEach(function (value) {
      if (knownValues.has(value)) {
        return;
      }
      var opt = document.createElement('option');
      opt.value = value;
      opt.textContent = value;
      opt.selected = true;
      sel.appendChild(opt);
    });
    var optionCount = sel.options.length;
    sel.size = optionCount > 0 ? optionCount : USER_BUTTON_FUNCTION_ITEMS.length;
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
    populateSensorModeDropdown: populateSensorModeDropdown,
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
var missingMountVoltageWarnings = new Set();
function warnMissingMountVoltageHelper(helperName, error) {
  var key = typeof helperName === 'string' && helperName ? helperName : 'unknown';
  if (missingMountVoltageWarnings.has(key)) {
    return;
  }
  missingMountVoltageWarnings.add(key);
  if (typeof console !== 'undefined' && typeof console.warn === 'function') {
    var message = "Mount voltage helper \"".concat(key, "\" is unavailable; using defaults to protect user data.");
    if (error) {
      console.warn(message, error);
    } else {
      console.warn(message);
    }
  }
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
    var numeric = Number(value);
    if (Number.isFinite(numeric)) {
      return numeric;
    }
    var fallbackNumeric = Number(fallback);
    return Number.isFinite(fallbackNumeric) ? fallbackNumeric : 0;
  };
  if (Array.isArray(SUPPORTED_MOUNT_VOLTAGE_TYPES)) {
    SUPPORTED_MOUNT_VOLTAGE_TYPES.forEach(function (type) {
      var _DEFAULT_MOUNT_VOLTAG;
      var defaults = ((_DEFAULT_MOUNT_VOLTAG = DEFAULT_MOUNT_VOLTAGES) === null || _DEFAULT_MOUNT_VOLTAG === void 0 ? void 0 : _DEFAULT_MOUNT_VOLTAG[type]) || {};
      clone[type] = {
        high: parse(defaults.high, defaults.high),
        low: parse(defaults.low, defaults.low)
      };
    });
  }
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
    var numeric = Number(value);
    if (Number.isFinite(numeric)) {
      return numeric;
    }
    var fallbackNumeric = Number(fallback);
    return Number.isFinite(fallbackNumeric) ? fallbackNumeric : 0;
  };
  var defaultClones = cloneMountVoltageDefaultsForSession();
  SUPPORTED_MOUNT_VOLTAGE_TYPES.forEach(function (type) {
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
    persist: false,
    triggerUpdate: true
  });
}