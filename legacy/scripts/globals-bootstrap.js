function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function __cineIsArray(value) {
  if (typeof Array !== 'undefined' && typeof Array.isArray === 'function') {
    return Array.isArray(value);
  }
  return Object.prototype.toString.call(value) === '[object Array]';
}
(function bootstrapCoreRuntimeGlobals() {
  var scope = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
  if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
    return;
  }
  function ensureString(name, fallback) {
    var value;
    try {
      value = scope[name];
    } catch (readError) {
      value = undefined;
      void readError;
    }
    if (typeof value !== 'string') {
      value = fallback;
    }
    try {
      scope[name] = value;
    } catch (assignError) {
      void assignError;
    }
    return value;
  }
  function ensureArray(name) {
    var value;
    try {
      value = scope[name];
    } catch (readError) {
      value = undefined;
      void readError;
    }
    if (!__cineIsArray(value)) {
      value = [];
    }
    try {
      scope[name] = value;
    } catch (assignError) {
      void assignError;
    }
    return value;
  }
  function ensureFunction(name, fallback) {
    var value;
    try {
      value = scope[name];
    } catch (readError) {
      value = undefined;
      void readError;
    }
    if (typeof value !== 'function') {
      value = fallback;
    }
    try {
      scope[name] = value;
    } catch (assignError) {
      void assignError;
    }
    return value;
  }
  function ensureNullableObject(name) {
    var value;
    try {
      value = scope[name];
    } catch (readError) {
      value = undefined;
      void readError;
    }
    if (typeof value === 'undefined') {
      value = null;
    }
    try {
      scope[name] = value;
    } catch (assignError) {
      void assignError;
    }
    return value;
  }
  function fallbackSafeGenerateConnectorSummary(device) {
    if (!device || _typeof(device) !== 'object') {
      return '';
    }
    var keys;
    try {
      keys = Object.keys(device);
    } catch (keyError) {
      void keyError;
      return '';
    }
    if (!keys || !keys.length) {
      return '';
    }
    var primaryKey = keys[0];
    var value = device[primaryKey];
    var label = typeof primaryKey === 'string' ? primaryKey.replace(/_/g, ' ') : 'connector';
    return value ? label + ': ' + value : label;
  }
  ensureString('autoGearAutoPresetId', '');
  ensureArray('baseAutoGearRules');
  ensureNullableObject('autoGearScenarioModeSelect');
  ensureNullableObject('autoGearRuleNameInput');
  ensureString('autoGearSummaryFocus', 'all');
  ensureArray('autoGearMonitorDefaultControls');
  ensureNullableObject('totalPowerElem');
  ensureFunction('safeGenerateConnectorSummary', fallbackSafeGenerateConnectorSummary);
})();
function __cineResolveGlobalValue(name, fallback) {
  var scope = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
  if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
    return fallback;
  }
  var value;
  try {
    value = scope[name];
  } catch (readError) {
    value = undefined;
    void readError;
  }
  return typeof value === 'undefined' ? fallback : value;
}
var autoGearAutoPresetId = typeof autoGearAutoPresetId !== 'undefined' ? autoGearAutoPresetId : function resolveAutoGearAutoPresetId() {
  var value = __cineResolveGlobalValue('autoGearAutoPresetId', '');
  return typeof value === 'string' ? value : '';
}();
var baseAutoGearRules = typeof baseAutoGearRules !== 'undefined' ? baseAutoGearRules : function resolveBaseAutoGearRules() {
  var value = __cineResolveGlobalValue('baseAutoGearRules', []);
  return __cineIsArray(value) ? value : [];
}();
var autoGearScenarioModeSelect = typeof autoGearScenarioModeSelect !== 'undefined' ? autoGearScenarioModeSelect : __cineResolveGlobalValue('autoGearScenarioModeSelect', null);
var autoGearRuleNameInput = typeof autoGearRuleNameInput !== 'undefined' ? autoGearRuleNameInput : __cineResolveGlobalValue('autoGearRuleNameInput', null);
var autoGearSummaryFocus = typeof autoGearSummaryFocus !== 'undefined' ? autoGearSummaryFocus : function resolveAutoGearSummaryFocus() {
  var value = __cineResolveGlobalValue('autoGearSummaryFocus', 'all');
  return typeof value === 'string' ? value : 'all';
}();
var autoGearMonitorDefaultControls = typeof autoGearMonitorDefaultControls !== 'undefined' ? autoGearMonitorDefaultControls : function resolveAutoGearMonitorDefaultControls() {
  var value = __cineResolveGlobalValue('autoGearMonitorDefaultControls', []);
  return __cineIsArray(value) ? value : [];
}();
var safeGenerateConnectorSummary = typeof safeGenerateConnectorSummary !== 'undefined' ? safeGenerateConnectorSummary : function resolveSafeGenerateConnectorSummary() {
  var value = __cineResolveGlobalValue('safeGenerateConnectorSummary', null);
  return typeof value === 'function' ? value : function fallbackSafeGenerateConnectorSummary(device) {
    if (!device || _typeof(device) !== 'object') {
      return '';
    }
    var keys;
    try {
      keys = Object.keys(device);
    } catch (keyError) {
      void keyError;
      return '';
    }
    if (!keys || !keys.length) {
      return '';
    }
    var primaryKey = keys[0];
    var result = device[primaryKey];
    var label = typeof primaryKey === 'string' ? primaryKey.replace(/_/g, ' ') : 'connector';
    return result ? label + ': ' + result : label;
  };
}();
var totalPowerElem = typeof totalPowerElem !== 'undefined' ? totalPowerElem : function resolveTotalPowerElem() {
  var value = __cineResolveGlobalValue('totalPowerElem', null);
  return typeof value === 'undefined' ? null : value;
}();