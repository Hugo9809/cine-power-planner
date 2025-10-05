(function ensureLegacyCoreGlobals() {
  var scope =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof window !== 'undefined' && window) ||
    (typeof self !== 'undefined' && self) ||
    (typeof global !== 'undefined' && global) ||
    null;

  if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
    return;
  }

  function fallbackSafeGenerateConnectorSummary(device) {
    if (!device || typeof device !== 'object') {
      return '';
    }

    try {
      var keys = Object.keys(device);
      if (!keys.length) {
        return '';
      }

      var primaryKey = keys[0];
      var value = device[primaryKey];
      var label = typeof primaryKey === 'string' ? primaryKey.replace(/_/g, ' ') : 'connector';
      return value ? label + ': ' + value : label;
    } catch (error) {
      void error;
      return '';
    }
  }

  function ensureBinding(name, validator, fallbackProvider) {
    var value;

    try {
      value = scope[name];
    } catch (readError) {
      void readError;
      value = undefined;
    }

    if (!validator(value)) {
      try {
        value = fallbackProvider();
      } catch (fallbackError) {
        void fallbackError;
        value = undefined;
      }
    }

    if (!validator(value)) {
      return;
    }

    try {
      scope[name] = value;
    } catch (assignError) {
      void assignError;
    }

    try {
      var bind = scope.Function || Function;
      bind(
        'value',
        "try { if (typeof " +
          name +
          " === 'undefined') { " +
          name +
          " = value; } } catch (bindingError) { try { " +
          name +
          " = value; } catch (assignError) { void assignError; } } return value;"
      )(value);
    } catch (bindingError) {
      void bindingError;
    }
  }

  ensureBinding(
    'autoGearAutoPresetId',
    function validateAutoPresetId(candidate) {
      return typeof candidate === 'string';
    },
    function provideAutoPresetIdFallback() {
      return '';
    }
  );

  ensureBinding(
    'baseAutoGearRules',
    function validateBaseRules(candidate) {
      return Array.isArray(candidate);
    },
    function provideBaseRulesFallback() {
      return [];
    }
  );

  ensureBinding(
    'autoGearScenarioModeSelect',
    function validateScenarioSelect(candidate) {
      return candidate === null || typeof candidate === 'object';
    },
    function provideScenarioSelectFallback() {
      return null;
    }
  );

  ensureBinding(
    'autoGearRuleNameInput',
    function validateAutoGearRuleNameInput(candidate) {
      return (
        typeof candidate === 'undefined' ||
        candidate === null ||
        typeof candidate === 'object'
      );
    },
    function provideAutoGearRuleNameInputFallback() {
      return null;
    }
  );

  ensureBinding(
    'autoGearSummaryFocus',
    function validateAutoGearSummaryFocus(candidate) {
      return typeof candidate === 'string';
    },
    function provideAutoGearSummaryFocusFallback() {
      return 'all';
    }
  );

  ensureBinding(
    'autoGearMonitorDefaultControls',
    function validateAutoGearMonitorDefaultControls(candidate) {
      return Array.isArray(candidate);
    },
    function provideAutoGearMonitorDefaultControlsFallback() {
      return [];
    }
  );

  ensureBinding(
    'safeGenerateConnectorSummary',
    function validateConnectorSummary(candidate) {
      return typeof candidate === 'function';
    },
    function provideConnectorSummaryFallback() {
      return fallbackSafeGenerateConnectorSummary;
    }
  );

  ensureBinding(
    'totalPowerElem',
    function validateTotalPowerElem(candidate) {
      return (
        typeof candidate === 'undefined' ||
        candidate === null ||
        typeof candidate === 'object'
      );
    },
    function provideTotalPowerElemFallback() {
      return null;
    }
  );
})();
