function __cineIsArray(value) {
  if (typeof Array !== 'undefined' && typeof Array.isArray === 'function') {
    return Array.isArray(value);
  }

  return Object.prototype.toString.call(value) === '[object Array]';
}

(function bootstrapCoreRuntimeGlobals() {
  var scope =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof window !== 'undefined' && window) ||
    (typeof self !== 'undefined' && self) ||
    (typeof global !== 'undefined' && global) ||
    null;

  if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
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
    if (!device || typeof device !== 'object') {
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
  ensureNullableObject('iosPwaHelpDialog');
  ensureNullableObject('iosPwaHelpClose');
  ensureNullableObject('totalPowerElem');
  ensureFunction('safeGenerateConnectorSummary', fallbackSafeGenerateConnectorSummary);
})();

function __cineResolveGlobalValue(name, fallback) {
  var scope =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof window !== 'undefined' && window) ||
    (typeof self !== 'undefined' && self) ||
    (typeof global !== 'undefined' && global) ||
    null;

  if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
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

function __cineCommitGlobalValue(name, value) {
  var scope =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof window !== 'undefined' && window) ||
    (typeof self !== 'undefined' && self) ||
    (typeof global !== 'undefined' && global) ||
    null;

  if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
    return value;
  }

  try {
    scope[name] = value;
  } catch (assignError) {
    void assignError;
  }

  return value;
}

var autoGearAutoPresetId =
  typeof autoGearAutoPresetId !== 'undefined' && typeof autoGearAutoPresetId === 'string'
    ? autoGearAutoPresetId
    : (function resolveAutoGearAutoPresetId() {
        var value = __cineResolveGlobalValue('autoGearAutoPresetId', '');
        var normalized = typeof value === 'string' ? value : '';
        return __cineCommitGlobalValue('autoGearAutoPresetId', normalized);
      })();

var baseAutoGearRules =
  typeof baseAutoGearRules !== 'undefined' && __cineIsArray(baseAutoGearRules)
    ? baseAutoGearRules
    : (function resolveBaseAutoGearRules() {
        var value = __cineResolveGlobalValue('baseAutoGearRules', []);
        var normalized = __cineIsArray(value) ? value : [];
        return __cineCommitGlobalValue('baseAutoGearRules', normalized);
      })();

var autoGearScenarioModeSelect =
  typeof autoGearScenarioModeSelect !== 'undefined' &&
  (autoGearScenarioModeSelect === null || typeof autoGearScenarioModeSelect === 'object')
    ? autoGearScenarioModeSelect
    : (function resolveAutoGearScenarioModeSelect() {
        var value = __cineResolveGlobalValue('autoGearScenarioModeSelect', null);
        var normalized =
          typeof value === 'undefined' || value === null || typeof value === 'object' ? value : null;
        return __cineCommitGlobalValue('autoGearScenarioModeSelect', normalized);
      })();

var autoGearRuleNameInput =
  typeof autoGearRuleNameInput !== 'undefined' &&
  (autoGearRuleNameInput === null || typeof autoGearRuleNameInput === 'object')
    ? autoGearRuleNameInput
    : (function resolveAutoGearRuleNameInput() {
        var value = __cineResolveGlobalValue('autoGearRuleNameInput', null);
        var normalized =
          typeof value === 'undefined' || value === null || typeof value === 'object' ? value : null;
        return __cineCommitGlobalValue('autoGearRuleNameInput', normalized);
      })();

var autoGearSummaryFocus =
  typeof autoGearSummaryFocus !== 'undefined' && typeof autoGearSummaryFocus === 'string'
    ? autoGearSummaryFocus
    : (function resolveAutoGearSummaryFocus() {
        var value = __cineResolveGlobalValue('autoGearSummaryFocus', 'all');
        var normalized = typeof value === 'string' ? value : 'all';
        return __cineCommitGlobalValue('autoGearSummaryFocus', normalized);
      })();

var autoGearMonitorDefaultControls =
  typeof autoGearMonitorDefaultControls !== 'undefined' &&
  __cineIsArray(autoGearMonitorDefaultControls)
    ? autoGearMonitorDefaultControls
    : (function resolveAutoGearMonitorDefaultControls() {
        var value = __cineResolveGlobalValue('autoGearMonitorDefaultControls', []);
        var normalized = __cineIsArray(value) ? value : [];
        return __cineCommitGlobalValue('autoGearMonitorDefaultControls', normalized);
      })();

var safeGenerateConnectorSummary =
  typeof safeGenerateConnectorSummary !== 'undefined' &&
  typeof safeGenerateConnectorSummary === 'function'
    ? safeGenerateConnectorSummary
    : (function resolveSafeGenerateConnectorSummary() {
        var value = __cineResolveGlobalValue('safeGenerateConnectorSummary', null);
        var normalized =
          typeof value === 'function'
            ? value
            : function fallbackSafeGenerateConnectorSummary(device) {
                if (!device || typeof device !== 'object') {
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

        return __cineCommitGlobalValue('safeGenerateConnectorSummary', normalized);
      })();

var totalPowerElem =
  typeof totalPowerElem !== 'undefined' &&
  (totalPowerElem === null || typeof totalPowerElem === 'object')
    ? totalPowerElem
    : (function resolveTotalPowerElem() {
        var value = __cineResolveGlobalValue('totalPowerElem', null);
        var normalized =
          typeof value === 'undefined' || value === null || typeof value === 'object' ? value : null;
        return __cineCommitGlobalValue('totalPowerElem', normalized);
      })();
