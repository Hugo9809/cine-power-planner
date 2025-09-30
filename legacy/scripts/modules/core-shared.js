function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  var GLOBAL_SCOPE = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : typeof global !== 'undefined' ? global : null;
  function tryRequire(modulePath) {
    if (typeof require !== 'function') {
      return null;
    }
    try {
      return require(modulePath);
    } catch (error) {
      void error;
      return null;
    }
  }
  function resolveModuleRegistry() {
    var required = tryRequire('./registry.js');
    if (required && _typeof(required) === 'object') {
      return required;
    }
    var scopes = [GLOBAL_SCOPE];
    if (typeof globalThis !== 'undefined' && scopes.indexOf(globalThis) === -1) scopes.push(globalThis);
    if (typeof window !== 'undefined' && scopes.indexOf(window) === -1) scopes.push(window);
    if (typeof self !== 'undefined' && scopes.indexOf(self) === -1) scopes.push(self);
    if (typeof global !== 'undefined' && scopes.indexOf(global) === -1) scopes.push(global);
    for (var index = 0; index < scopes.length; index += 1) {
      var scope = scopes[index];
      if (scope && _typeof(scope.cineModules) === 'object') {
        return scope.cineModules;
      }
    }
    return null;
  }
  var MODULE_REGISTRY = resolveModuleRegistry();
  var PENDING_QUEUE_KEY = '__cinePendingModuleRegistrations__';
  function queueModuleRegistration(name, api, options) {
    if (!GLOBAL_SCOPE || _typeof(GLOBAL_SCOPE) !== 'object') {
      return false;
    }
    var payload = Object.freeze({
      name: name,
      api: api,
      options: Object.freeze(_objectSpread({}, options || {}))
    });
    var queue = GLOBAL_SCOPE[PENDING_QUEUE_KEY];
    if (!Array.isArray(queue)) {
      try {
        Object.defineProperty(GLOBAL_SCOPE, PENDING_QUEUE_KEY, {
          configurable: true,
          enumerable: false,
          writable: true,
          value: []
        });
        queue = GLOBAL_SCOPE[PENDING_QUEUE_KEY];
      } catch (error) {
        void error;
        try {
          if (!Array.isArray(GLOBAL_SCOPE[PENDING_QUEUE_KEY])) {
            GLOBAL_SCOPE[PENDING_QUEUE_KEY] = [];
          }
          queue = GLOBAL_SCOPE[PENDING_QUEUE_KEY];
        } catch (assignmentError) {
          void assignmentError;
          return false;
        }
      }
    }
    try {
      queue.push(payload);
    } catch (error) {
      void error;
      queue[queue.length] = payload;
    }
    return true;
  }
  function registerOrQueueModule(name, api, options, onError) {
    if (MODULE_REGISTRY && typeof MODULE_REGISTRY.register === 'function') {
      try {
        MODULE_REGISTRY.register(name, api, options);
        return true;
      } catch (error) {
        if (typeof onError === 'function') {
          onError(error);
        } else {
          void error;
        }
      }
    }
    queueModuleRegistration(name, api, options);
    return false;
  }
  function freezeDeep(value) {
    var seen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new WeakSet();
    if (!value || _typeof(value) !== 'object') {
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
      freezeDeep(descriptor.value, seen);
    }
    return Object.freeze(value);
  }
  function createStableStringify() {
    if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.stableStringify === 'function') {
      return GLOBAL_SCOPE.stableStringify;
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
    if (GLOBAL_SCOPE && _typeof(GLOBAL_SCOPE) === 'object') {
      try {
        GLOBAL_SCOPE.stableStringify = stableStringify;
      } catch (error) {
        void error;
      }
    }
    return stableStringify;
  }
  var HUMANIZE_OVERRIDES = {
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
  function createHumanizeKey() {
    if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.humanizeKey === 'function') {
      return GLOBAL_SCOPE.humanizeKey;
    }
    function humanizeKey(key) {
      if (key && Object.prototype.hasOwnProperty.call(HUMANIZE_OVERRIDES, key)) {
        return HUMANIZE_OVERRIDES[key];
      }
      var stringValue = typeof key === 'string' ? key : String(key || '');
      return stringValue.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').replace(/^./, function (c) {
        return c.toUpperCase();
      });
    }
    if (GLOBAL_SCOPE && _typeof(GLOBAL_SCOPE) === 'object') {
      try {
        GLOBAL_SCOPE.humanizeKey = humanizeKey;
      } catch (error) {
        void error;
      }
    }
    return humanizeKey;
  }
  var stableStringify = createStableStringify();
  var humanizeKey = createHumanizeKey();
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
    if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.generateConnectorSummary === 'function') {
      cachedConnectorSummaryGenerator = GLOBAL_SCOPE.generateConnectorSummary;
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
  var autoGearWeightHelpers = null;
  if (typeof require === 'function') {
    try {
      autoGearWeightHelpers = require('../auto-gear-weight.js');
    } catch (error) {
      void error;
    }
  }
  var autoGearWeightScope = GLOBAL_SCOPE || {};
  var normalizeAutoGearWeightOperator = autoGearWeightHelpers && typeof autoGearWeightHelpers.normalizeAutoGearWeightOperator === 'function' ? autoGearWeightHelpers.normalizeAutoGearWeightOperator : typeof autoGearWeightScope.normalizeAutoGearWeightOperator === 'function' ? autoGearWeightScope.normalizeAutoGearWeightOperator : function normalizeAutoGearWeightOperator(value) {
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
  };
  var normalizeAutoGearWeightValue = autoGearWeightHelpers && typeof autoGearWeightHelpers.normalizeAutoGearWeightValue === 'function' ? autoGearWeightHelpers.normalizeAutoGearWeightValue : typeof autoGearWeightScope.normalizeAutoGearWeightValue === 'function' ? autoGearWeightScope.normalizeAutoGearWeightValue : function normalizeAutoGearWeightValue(value) {
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
  var normalizeAutoGearCameraWeightCondition = autoGearWeightHelpers && typeof autoGearWeightHelpers.normalizeAutoGearCameraWeightCondition === 'function' ? autoGearWeightHelpers.normalizeAutoGearCameraWeightCondition : typeof autoGearWeightScope.normalizeAutoGearCameraWeightCondition === 'function' ? autoGearWeightScope.normalizeAutoGearCameraWeightCondition : function normalizeAutoGearCameraWeightCondition() {
    return null;
  };
  var formatAutoGearWeight = autoGearWeightHelpers && typeof autoGearWeightHelpers.formatAutoGearWeight === 'function' ? autoGearWeightHelpers.formatAutoGearWeight : typeof autoGearWeightScope.formatAutoGearWeight === 'function' ? autoGearWeightScope.formatAutoGearWeight : function formatAutoGearWeight(value) {
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
  var getAutoGearCameraWeightOperatorLabel = autoGearWeightHelpers && typeof autoGearWeightHelpers.getAutoGearCameraWeightOperatorLabel === 'function' ? autoGearWeightHelpers.getAutoGearCameraWeightOperatorLabel : typeof autoGearWeightScope.getAutoGearCameraWeightOperatorLabel === 'function' ? autoGearWeightScope.getAutoGearCameraWeightOperatorLabel : function getAutoGearCameraWeightOperatorLabel(operator, langTexts) {
    var textsForLang = langTexts || {};
    var fallbackTexts = autoGearWeightScope && autoGearWeightScope.texts && autoGearWeightScope.texts.en || {};
    var normalized = normalizeAutoGearWeightOperator(operator);
    if (normalized === 'less') {
      return textsForLang.autoGearCameraWeightOperatorLess || fallbackTexts.autoGearCameraWeightOperatorLess || 'Lighter than';
    }
    if (normalized === 'equal') {
      return textsForLang.autoGearCameraWeightOperatorEqual || fallbackTexts.autoGearCameraWeightOperatorEqual || 'Exactly';
    }
    return textsForLang.autoGearCameraWeightOperatorGreater || fallbackTexts.autoGearCameraWeightOperatorGreater || 'Heavier than';
  };
  var formatAutoGearCameraWeight = autoGearWeightHelpers && typeof autoGearWeightHelpers.formatAutoGearCameraWeight === 'function' ? autoGearWeightHelpers.formatAutoGearCameraWeight : typeof autoGearWeightScope.formatAutoGearCameraWeight === 'function' ? autoGearWeightScope.formatAutoGearCameraWeight : function formatAutoGearCameraWeight(condition, langTexts) {
    if (!condition || !Number.isFinite(condition.value)) return '';
    var label = getAutoGearCameraWeightOperatorLabel(condition.operator, langTexts);
    var formattedValue = formatAutoGearWeight(condition.value);
    return "".concat(label, " ").concat(formattedValue, " g");
  };
  function resolveLzString() {
    if (GLOBAL_SCOPE && GLOBAL_SCOPE.LZString) {
      return GLOBAL_SCOPE.LZString;
    }
    var resolved = null;
    if (typeof require === 'function') {
      try {
        resolved = require('lz-string');
      } catch (error) {
        void error;
      }
    }
    if (!resolved && GLOBAL_SCOPE && GLOBAL_SCOPE.LZString) {
      resolved = GLOBAL_SCOPE.LZString;
    }
    if (!resolved) {
      resolved = {
        compressToEncodedURIComponent: function compressToEncodedURIComponent(s) {
          return s;
        },
        decompressFromEncodedURIComponent: function decompressFromEncodedURIComponent(s) {
          return s;
        },
        compressToUTF16: function compressToUTF16(s) {
          return s;
        },
        decompressFromUTF16: function decompressFromUTF16(s) {
          return s;
        }
      };
    }
    if (GLOBAL_SCOPE && _typeof(GLOBAL_SCOPE) === 'object') {
      try {
        GLOBAL_SCOPE.LZString = resolved;
      } catch (error) {
        void error;
      }
    }
    return resolved;
  }
  var LZString = resolveLzString();
  var APP_VERSION = '1.0.10';
  var shared = freezeDeep({
    APP_VERSION: APP_VERSION,
    stableStringify: stableStringify,
    humanizeKey: humanizeKey,
    resolveConnectorSummaryGenerator: resolveConnectorSummaryGenerator,
    safeGenerateConnectorSummary: safeGenerateConnectorSummary,
    normalizeAutoGearWeightOperator: normalizeAutoGearWeightOperator,
    normalizeAutoGearWeightValue: normalizeAutoGearWeightValue,
    normalizeAutoGearCameraWeightCondition: normalizeAutoGearCameraWeightCondition,
    formatAutoGearWeight: formatAutoGearWeight,
    getAutoGearCameraWeightOperatorLabel: getAutoGearCameraWeightOperatorLabel,
    formatAutoGearCameraWeight: formatAutoGearCameraWeight,
    LZString: LZString,
    getLZString: function getLZString() {
      return LZString;
    }
  });
  registerOrQueueModule('cineCoreShared', shared, {
    category: 'shared',
    description: 'Shared helpers for deterministic stringification, weights, and version markers.',
    replace: true
  });
  if (GLOBAL_SCOPE && _typeof(GLOBAL_SCOPE) === 'object') {
    try {
      if (!GLOBAL_SCOPE.APP_VERSION) {
        Object.defineProperty(GLOBAL_SCOPE, 'APP_VERSION', {
          configurable: true,
          enumerable: false,
          value: APP_VERSION,
          writable: false
        });
      }
    } catch (error) {
      void error;
      if (!GLOBAL_SCOPE.APP_VERSION) {
        GLOBAL_SCOPE.APP_VERSION = APP_VERSION;
      }
    }
    try {
      Object.defineProperty(GLOBAL_SCOPE, 'cineCoreShared', {
        configurable: true,
        enumerable: false,
        value: shared,
        writable: false
      });
    } catch (error) {
      void error;
      GLOBAL_SCOPE.cineCoreShared = shared;
    }
  }
  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = shared;
  }
})();