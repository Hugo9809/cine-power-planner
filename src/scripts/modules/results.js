/* global CORE_GLOBAL_SCOPE, cineModuleBase */

(function () {
  function detectGlobalScope() {
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
    return {};
  }

  var GLOBAL_SCOPE = detectGlobalScope();

  function resolveUiHelpers(scope) {
    var candidates = [];

    if (typeof require === 'function') {
      try {
        var required = require('../app-core-ui-helpers.js');
        if (required && typeof required === 'object') {
          candidates.push(required);
        }
      } catch (uiHelpersError) {
        void uiHelpersError;
      }
    }

    var scopes = [];

    if (scope && (typeof scope === 'object' || typeof scope === 'function')) {
      scopes.push(scope);
    }

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
      var scopeCandidate = scopes[index];
      if (!scopeCandidate || (typeof scopeCandidate !== 'object' && typeof scopeCandidate !== 'function')) {
        continue;
      }
      try {
        var helpers = scopeCandidate.cineCoreUiHelpers;
        if (helpers && typeof helpers === 'object') {
          candidates.push(helpers);
        }
      } catch (scopeLookupError) {
        void scopeLookupError;
      }
    }

    for (var candidateIndex = 0; candidateIndex < candidates.length; candidateIndex += 1) {
      var candidate = candidates[candidateIndex];
      if (candidate && typeof candidate === 'object') {
        return candidate;
      }
    }

    return {};
  }

  var UI_HELPERS = resolveUiHelpers(GLOBAL_SCOPE);

  var escapeHtmlHelper =
    typeof UI_HELPERS.escapeHtml === 'function'
      ? UI_HELPERS.escapeHtml
      : function escapeHtmlFallback(value) {
        return String(value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');
      };

  var setButtonLabelWithIconHelper =
    typeof UI_HELPERS.setButtonLabelWithIcon === 'function'
      ? UI_HELPERS.setButtonLabelWithIcon
      : null;

  function resolveModuleBase(scope) {
    if (typeof cineModuleBase === 'object' && cineModuleBase) {
      return cineModuleBase;
    }

    if (typeof require === 'function') {
      try {
        var required = require('./base.js');
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }

    if (scope && typeof scope.cineModuleBase === 'object') {
      return scope.cineModuleBase;
    }

    return null;
  }

  var MODULE_BASE = resolveModuleBase(GLOBAL_SCOPE);
  if (!MODULE_BASE) {
    return;
  }

  var moduleRegistry = typeof MODULE_BASE.getModuleRegistry === 'function'
    ? MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE)
    : null;

  var freezeDeep = typeof MODULE_BASE.freezeDeep === 'function'
    ? function freezeWithBase(value) {
      try {
        return MODULE_BASE.freezeDeep(value);
      } catch (error) {
        void error;
      }
      return value;
    }
    : function identity(value) {
      return value;
    };

  var exposeGlobal = typeof MODULE_BASE.exposeGlobal === 'function'
    ? function expose(name, value, options) {
      return MODULE_BASE.exposeGlobal(name, value, GLOBAL_SCOPE, options || {});
    }
    : function fallbackExpose(name, value) {
      try {
        GLOBAL_SCOPE[name] = value;
        return true;
      } catch (error) {
        void error;
      }
      return false;
    };

  var registerOrQueueModule = typeof MODULE_BASE.registerOrQueueModule === 'function'
    ? function register(name, api, options, onError) {
      return MODULE_BASE.registerOrQueueModule(
        name,
        api,
        options,
        onError,
        GLOBAL_SCOPE,
        moduleRegistry
      );
    }
    : function fallbackRegister() {
      return false;
    };

  var safeWarn = typeof MODULE_BASE.safeWarn === 'function'
    ? function warn(message, detail) {
      try {
        MODULE_BASE.safeWarn(message, detail);
      } catch (error) {
        void error;
      }
    }
    : function fallbackWarn(message, detail) {
      if (typeof console === 'undefined' || !console || typeof console.warn !== 'function') {
        return;
      }
      try {
        if (typeof detail === 'undefined') {
          console.warn(message);
        } else {
          console.warn(message, detail);
        }
      } catch (error) {
        void error;
      }
    };

  // Runtime state is tracked in a single bag so UI synchronisation logic is
  // easy to inspect. Keeping the references together helps future maintainers
  // understand which DOM nodes participate in the results view without chasing
  // implicit globals across modules.
  var runtimeFeedbackState = {
    elements: {},
    handlers: {},
    feedbackFieldCache: [],
    feedbackFieldCacheDoc: null,
    feedbackOptionFallbacks: Object.create(null),
    collatorCache: Object.create(null),
    fallbackCollator: null,
    sensorModeFrameRateMap: Object.create(null),
    allFrameRateOptions: [],
    selectedSensorMode: '',
    selectedFramerate: '',
    dependencies: {
      mailTarget: 'info@lucazanner.de',
      document: null,
      window: null,
      navigator: null,
      alert: null,
      openDialog: null,
      closeDialog: null,
      getCurrentSetupKey: null,
      loadFeedback: null,
      saveFeedback: null,
      updateCalculations: null,
      renderFeedbackTable: null,
      dispatchTemperatureNoteRender: null,
      refreshFeedbackTemperatureLabel: null,
      updateFeedbackTemperatureOptions: null,
      refreshTotalCurrentLabels: null,
      updateMountVoltageSettingLabels: null,
      setButtonLabelWithIcon: setButtonLabelWithIconHelper,
      iconGlyphs: null,
      getSelectedPlate: null,
      getMountVoltageConfig: null,
      updateBatteryOptions: null,
      setStatusMessage: null,
      setStatusLevel: null,
      closePowerWarningDialog: null,
      showPowerWarningDialog: null,
      drawPowerDiagram: null,
      renderTemperatureNote: null,
      checkFizCompatibility: null,
      checkFizController: null,
      checkArriCompatibility: null,
      renderSetupDiagram: null,
      refreshGearListIfVisible: null,
      supportsBMountCamera: null,
      supportsGoldMountCamera: null,
      getCssVariableValue: null,
      escapeHtml: escapeHtmlHelper,
      getLastRuntimeHours: null,
      setLastRuntimeHours: null,
      getDevices: null,
      getTexts: null,
      getCurrentLang: null,
      getCollator: null
    }
  };

  function refreshFeedbackFieldCache(doc) {
    if (!doc) {
      runtimeFeedbackState.feedbackFieldCache = [];
      runtimeFeedbackState.feedbackFieldCacheDoc = null;
      return runtimeFeedbackState.feedbackFieldCache;
    }

    var cache = [];
    for (var index = 0; index < FEEDBACK_FIELD_MAP.length; index += 1) {
      var map = FEEDBACK_FIELD_MAP[index];
      var element = null;
      try {
        element = doc.getElementById(map.id);
      } catch (error) {
        void error;
        element = null;
      }
      cache.push({ map: map, element: element });
    }

    runtimeFeedbackState.feedbackFieldCache = cache;
    runtimeFeedbackState.feedbackFieldCacheDoc = doc;
    return cache;
  }

  function getFeedbackFieldEntries(doc) {
    if (!doc) {
      return [];
    }

    if (runtimeFeedbackState.feedbackFieldCacheDoc !== doc ||
      !runtimeFeedbackState.feedbackFieldCache ||
      runtimeFeedbackState.feedbackFieldCache.length !== FEEDBACK_FIELD_MAP.length) {
      return refreshFeedbackFieldCache(doc);
    }

    var cache = runtimeFeedbackState.feedbackFieldCache;

    for (var index = 0; index < cache.length; index += 1) {
      var entry = cache[index];
      if (!entry || !entry.map) {
        return refreshFeedbackFieldCache(doc);
      }
      var element = entry.element;
      if (!element || (typeof element.isConnected === 'boolean' && !element.isConnected)) {
        var updatedElement = null;
        try {
          updatedElement = doc.getElementById(entry.map.id);
        } catch (error) {
          void error;
          updatedElement = null;
        }
        entry.element = updatedElement;
      }
    }

    return cache;
  }

  var FEEDBACK_FIELD_MAP = [
    { id: 'fbUsername', key: 'username', trim: true },
    { id: 'fbDate', key: 'date', trim: false },
    { id: 'fbLocation', key: 'location', trim: true },
    { id: 'fbCamera', key: 'camera', trim: true },
    { id: 'fbBatteryPlate', key: 'batteryPlate', trim: true },
    { id: 'fbLensMount', key: 'lensMount', trim: true },
    { id: 'fbResolution', key: 'resolution', trim: true },
    { id: 'fbCodec', key: 'codec', trim: true },
    { id: 'fbSensorMode', key: 'sensorMode', trim: true },
    { id: 'fbFramerate', key: 'framerate', trim: true },
    { id: 'fbWifi', key: 'cameraWifi', trim: false },
    { id: 'fbFirmware', key: 'firmware', trim: true },
    { id: 'fbBattery', key: 'battery', trim: true },
    { id: 'fbBatteryAge', key: 'batteryAge', trim: true },
    { id: 'fbWirelessVideo', key: 'wirelessVideo', trim: true },
    { id: 'fbMonitor', key: 'monitor', trim: true },
    { id: 'fbMonitorBrightness', key: 'monitorBrightness', trim: true },
    { id: 'fbLens', key: 'lens', trim: true },
    { id: 'fbLensData', key: 'lensData', trim: true },
    { id: 'fbControllers', key: 'controllers', trim: true },
    { id: 'fbMotors', key: 'motors', trim: true },
    { id: 'fbDistance', key: 'distance', trim: true },
    { id: 'fbTemperature', key: 'temperature', trim: true },
    { id: 'fbCharging', key: 'charging', trim: true },
    { id: 'fbRuntime', key: 'runtime', trim: true },
    { id: 'fbBatteriesPerDay', key: 'batteriesPerDay', trim: true }
  ];

  var FEEDBACK_OPTION_TARGETS = {
    lensMount: { elementName: 'feedbackMountOptions', elementId: 'mountOptions' },
    resolution: { elementName: 'feedbackResolutionOptions', elementId: 'resolutionOptions' },
    codec: { elementName: 'feedbackCodecOptions', elementId: 'codecOptions' }
  };

  function getFeedbackOptionFallbacks() {
    var fallbacks = runtimeFeedbackState.feedbackOptionFallbacks;
    if (!fallbacks || typeof fallbacks !== 'object') {
      fallbacks = Object.create(null);
      runtimeFeedbackState.feedbackOptionFallbacks = fallbacks;
    }
    return fallbacks;
  }

  function extractDatalistValues(element) {
    var values = [];
    if (!element) {
      return values;
    }

    var options = null;
    try {
      options = element.options;
    } catch (error) {
      void error;
      options = null;
    }

    if (options && typeof options.length === 'number') {
      for (var index = 0; index < options.length; index += 1) {
        var option = options[index];
        if (!option) {
          continue;
        }
        var value = '';
        if (typeof option.value === 'string' && option.value) {
          value = option.value;
        } else if (typeof option.getAttribute === 'function') {
          value = option.getAttribute('value') || '';
        } else if (typeof option.textContent === 'string' && option.textContent) {
          value = option.textContent;
        }
        if (value) {
          values.push(value);
        }
      }
      return values;
    }

    if (element.childNodes && typeof element.childNodes.length === 'number') {
      for (var childIndex = 0; childIndex < element.childNodes.length; childIndex += 1) {
        var child = element.childNodes[childIndex];
        if (!child) {
          continue;
        }
        var childValue = '';
        if (typeof child.value === 'string' && child.value) {
          childValue = child.value;
        } else if (typeof child.getAttribute === 'function') {
          childValue = child.getAttribute('value') || '';
        } else if (typeof child.textContent === 'string' && child.textContent) {
          childValue = child.textContent;
        }
        if (childValue) {
          values.push(childValue);
        }
      }
    }

    return values;
  }

  function storeFeedbackOptionFallback(name, element) {
    if (!name || !element) {
      return;
    }
    var fallbacks = getFeedbackOptionFallbacks();
    if (fallbacks[name]) {
      return;
    }
    fallbacks[name] = extractDatalistValues(element);
  }

  function escapeAttributeValue(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function replaceDatalistOptions(element, values) {
    if (!element) {
      return;
    }

    var normalizedValues = Array.isArray(values) ? values : [];
    var html = '';
    for (var index = 0; index < normalizedValues.length; index += 1) {
      html += '<option value="' + escapeAttributeValue(normalizedValues[index]) + '"></option>';
    }

    if (typeof element.innerHTML === 'string') {
      try {
        element.innerHTML = html;
        return;
      } catch (error) {
        void error;
      }
    }

    var doc = null;
    try {
      doc = element.ownerDocument || null;
    } catch (ownerError) {
      void ownerError;
      doc = null;
    }
    if (!doc) {
      doc = resolveDocument();
    }

    if (!doc || typeof doc.createElement !== 'function' || typeof element.appendChild !== 'function') {
      return;
    }

    try {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    } catch (clearError) {
      void clearError;
    }

    for (var valueIndex = 0; valueIndex < normalizedValues.length; valueIndex += 1) {
      var option = null;
      try {
        option = doc.createElement('option');
      } catch (createError) {
        void createError;
        option = null;
      }
      if (!option) {
        continue;
      }
      var text = normalizedValues[valueIndex];
      try {
        option.value = text;
      } catch (assignError) {
        void assignError;
        if (typeof option.setAttribute === 'function') {
          option.setAttribute('value', text);
        }
      }
      if (typeof option.textContent === 'string') {
        try {
          option.textContent = text;
        } catch (textError) {
          void textError;
        }
      }
      try {
        element.appendChild(option);
      } catch (appendError) {
        void appendError;
      }
    }
  }

  function getFeedbackSelectElement(name, id) {
    if (runtimeFeedbackState.elements[name]) {
      return runtimeFeedbackState.elements[name];
    }

    var doc = resolveDocument();
    if (!doc || !id) {
      return null;
    }

    var element = null;
    try {
      element = doc.getElementById(id);
    } catch (error) {
      void error;
      element = null;
    }

    if (element) {
      runtimeFeedbackState.elements[name] = element;
    }

    return element;
  }

  function escapeOptionText(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function replaceSelectOptions(select, values, preferredValue, defaultToFirst) {
    if (!select) {
      return '';
    }

    var seen = Object.create(null);
    var normalized = [];
    var list = Array.isArray(values) ? values : [];
    for (var index = 0; index < list.length; index += 1) {
      var raw = list[index];
      if (raw == null) {
        continue;
      }
      var text = String(raw);
      if (!text) {
        continue;
      }
      var trimmed = text.trim();
      if (!trimmed) {
        continue;
      }
      if (Object.prototype.hasOwnProperty.call(seen, trimmed)) {
        continue;
      }
      seen[trimmed] = true;
      normalized.push(trimmed);
    }

    var htmlParts = ['<option value="">--</option>'];
    for (var valueIndex = 0; valueIndex < normalized.length; valueIndex += 1) {
      var escapedValue = escapeOptionText(normalized[valueIndex]);
      htmlParts.push('<option value="' + escapedValue + '">' + escapedValue + '</option>');
    }
    var html = htmlParts.join('');

    var assigned = false;
    if (typeof select.innerHTML === 'string') {
      try {
        select.innerHTML = html;
        assigned = true;
      } catch (error) {
        void error;
        assigned = false;
      }
    }

    if (!assigned) {
      var doc = null;
      try {
        doc = select.ownerDocument || null;
      } catch (ownerError) {
        void ownerError;
        doc = null;
      }
      if (!doc) {
        doc = resolveDocument();
      }

      if (doc && typeof doc.createElement === 'function' && typeof select.appendChild === 'function') {
        try {
          while (select.firstChild) {
            select.removeChild(select.firstChild);
          }
        } catch (clearError) {
          void clearError;
        }

        var placeholder = null;
        try {
          placeholder = doc.createElement('option');
        } catch (placeholderError) {
          void placeholderError;
          placeholder = null;
        }
        if (placeholder) {
          try {
            placeholder.value = '';
          } catch (placeholderAssign) {
            void placeholderAssign;
            if (typeof placeholder.setAttribute === 'function') {
              placeholder.setAttribute('value', '');
            }
          }
          if (typeof placeholder.textContent === 'string') {
            try {
              placeholder.textContent = '--';
            } catch (placeholderTextError) {
              void placeholderTextError;
            }
          }
          try {
            select.appendChild(placeholder);
          } catch (appendPlaceholderError) {
            void appendPlaceholderError;
          }
        }

        for (var optionIndex = 0; optionIndex < normalized.length; optionIndex += 1) {
          var option = null;
          try {
            option = doc.createElement('option');
          } catch (createError) {
            void createError;
            option = null;
          }
          if (!option) {
            continue;
          }
          var optionValue = normalized[optionIndex];
          try {
            option.value = optionValue;
          } catch (optionAssignError) {
            void optionAssignError;
            if (typeof option.setAttribute === 'function') {
              option.setAttribute('value', optionValue);
            }
          }
          if (typeof option.textContent === 'string') {
            try {
              option.textContent = optionValue;
            } catch (optionTextError) {
              void optionTextError;
            }
          }
          try {
            select.appendChild(option);
          } catch (optionAppendError) {
            void optionAppendError;
          }
        }
      }
    }

    var preferred = typeof preferredValue === 'string' ? preferredValue : '';
    var nextValue = '';
    if (preferred && normalized.indexOf(preferred) !== -1) {
      nextValue = preferred;
    } else if (defaultToFirst && normalized.length) {
      nextValue = normalized[0];
    }

    try {
      select.value = nextValue;
    } catch (assignValueError) {
      void assignValueError;
      if (typeof select.setAttribute === 'function') {
        select.setAttribute('value', nextValue);
      }
    }

    var options = null;
    try {
      options = select.options || null;
    } catch (optionsError) {
      void optionsError;
      options = null;
    }

    if (options && typeof options.length === 'number') {
      for (var idx = 0; idx < options.length; idx += 1) {
        var opt = options[idx];
        if (!opt) {
          continue;
        }
        var optValue = '';
        try {
          optValue = typeof opt.value === 'string' ? opt.value : '';
        } catch (optValueError) {
          void optValueError;
          optValue = '';
        }
        var shouldSelect = optValue === nextValue;
        if (typeof opt.selected === 'boolean') {
          try {
            opt.selected = shouldSelect;
          } catch (optSelectError) {
            void optSelectError;
          }
        } else if (shouldSelect && typeof opt.setAttribute === 'function') {
          try {
            opt.setAttribute('selected', 'selected');
          } catch (optAttrError) {
            void optAttrError;
          }
        } else if (!shouldSelect && typeof opt.removeAttribute === 'function') {
          try {
            opt.removeAttribute('selected');
          } catch (optRemoveAttrError) {
            void optRemoveAttrError;
          }
        }
      }
    }

    if (typeof select.selectedIndex === 'number' && options && typeof options.length === 'number') {
      var selectedIndex = -1;
      for (var optionIdx = 0; optionIdx < options.length; optionIdx += 1) {
        var candidate = options[optionIdx];
        if (!candidate) {
          continue;
        }
        var candidateValue = '';
        try {
          candidateValue = typeof candidate.value === 'string' ? candidate.value : '';
        } catch (candidateValueError) {
          void candidateValueError;
          candidateValue = '';
        }
        if (candidateValue === nextValue) {
          selectedIndex = optionIdx;
          break;
        }
      }
      try {
        select.selectedIndex = selectedIndex;
      } catch (assignIndexError) {
        void assignIndexError;
      }
    }

    return nextValue;
  }

  function normalizeSensorModeKey(value) {
    if (typeof value !== 'string') {
      return '';
    }
    var trimmed = value.trim();
    if (!trimmed) {
      return '';
    }
    return trimmed.toLowerCase().replace(/\s+/g, ' ');
  }

  var CANONICAL_FRAME_RATE_VALUES = Object.freeze([
    0.75,
    1,
    8,
    12,
    12.5,
    15,
    23.976,
    24,
    25,
    29.97,
    30,
    36,
    40,
    47.952,
    48,
    50,
    59.94,
    60,
    72,
    75,
    80,
    90,
    96,
    100,
    110,
    112,
    120,
    144,
    150,
    160,
    168,
    170,
    180,
    200,
    240,
    290,
    300
  ]);

  function resolveCanonicalFrameRateValue(rawValue) {
    if (typeof rawValue !== 'number' || !Number.isFinite(rawValue)) {
      return rawValue;
    }

    var tolerance = 0.05;
    var nearest = rawValue;
    var smallestDiff = tolerance + 1;

    for (var index = 0; index < CANONICAL_FRAME_RATE_VALUES.length; index += 1) {
      var candidate = CANONICAL_FRAME_RATE_VALUES[index];
      var diff = Math.abs(candidate - rawValue);
      if (diff <= tolerance && diff < smallestDiff) {
        nearest = candidate;
        smallestDiff = diff;
      }
    }

    return nearest;
  }

  function formatFrameRateLabel(value) {
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      return '';
    }

    var rounded = Math.round(value);
    if (Math.abs(rounded - value) < 0.0005) {
      return String(rounded);
    }

    var fixed = value.toFixed(3).replace(/0+$/, '').replace(/\.$/, '');
    return fixed;
  }

  function appendFrameRateOption(results, seen, numericValue) {
    if (typeof numericValue !== 'number' || !Number.isFinite(numericValue)) {
      return;
    }

    var canonical = resolveCanonicalFrameRateValue(numericValue);
    var label = formatFrameRateLabel(canonical);
    if (!label) {
      return;
    }

    var optionLabel = label + ' fps';
    if (Object.prototype.hasOwnProperty.call(seen, optionLabel)) {
      return;
    }

    seen[optionLabel] = canonical;
    results.push({ numeric: canonical, label: optionLabel });
  }

  function appendFrameRateRange(results, seen, minValue, maxValue) {
    if (typeof minValue !== 'number' || !Number.isFinite(minValue) ||
      typeof maxValue !== 'number' || !Number.isFinite(maxValue)) {
      return;
    }

    var min = minValue;
    var max = maxValue;
    if (min > max) {
      var swap = min;
      min = max;
      max = swap;
    }

    var tolerance = 0.05;
    for (var index = 0; index < CANONICAL_FRAME_RATE_VALUES.length; index += 1) {
      var candidate = CANONICAL_FRAME_RATE_VALUES[index];
      if (candidate + tolerance < min) {
        continue;
      }
      if (candidate - tolerance > max) {
        break;
      }
      appendFrameRateOption(results, seen, candidate);
    }

    appendFrameRateOption(results, seen, min);
    appendFrameRateOption(results, seen, max);
  }

  function sortFrameRateOptionsInPlace(values) {
    if (!Array.isArray(values)) {
      return;
    }

    values.sort(function sortFrameRateOptions(a, b) {
      var aValue = parseFloat(a);
      var bValue = parseFloat(b);

      if (Number.isFinite(aValue) && Number.isFinite(bValue)) {
        if (aValue < bValue) {
          return -1;
        }
        if (aValue > bValue) {
          return 1;
        }
      }

      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });
  }

  function parseFrameRateOptions(frameRateValue) {
    if (typeof frameRateValue !== 'string') {
      return [];
    }

    var trimmed = frameRateValue.trim();
    if (!trimmed) {
      return [];
    }

    var colonIndex = trimmed.lastIndexOf(':');
    var detail = colonIndex !== -1 ? trimmed.slice(colonIndex + 1) : trimmed;
    var cleaned = detail.replace(/\([^)]*\)/g, ' ');

    var numbers = [];
    cleaned.replace(/([0-9]+(?:\.[0-9]+)?)/g, function parseMatch(_, match) {
      var numeric = parseFloat(match);
      if (Number.isFinite(numeric)) {
        numbers.push(numeric);
      }
      return match;
    });

    if (!numbers.length) {
      return [];
    }

    var results = [];
    var seen = Object.create(null);

    var hasSlashList = /[0-9]\s*\//.test(cleaned);
    var hasCommaList = /[0-9]\s*,\s*[0-9]/.test(cleaned);
    var hasListKeyword = /\b(?:or|and)\b/i.test(cleaned);
    var hasUpTo = /up to/i.test(cleaned) || /\bmax(?:imum)?\b/i.test(cleaned);
    var hasBetween = /\bbetween\b/i.test(cleaned);
    var hasRangeIndicator = /(?:–|-|\bto\b)/i.test(cleaned);

    if (hasUpTo) {
      var maxRange = Math.max.apply(Math, numbers);
      var minRange = numbers.length > 1 ? Math.min.apply(Math, numbers) : 1;
      appendFrameRateRange(results, seen, minRange, maxRange);
    } else if ((hasRangeIndicator || hasBetween) && numbers.length >= 2) {
      var minBound = Math.min.apply(Math, numbers);
      var maxBound = Math.max.apply(Math, numbers);
      appendFrameRateRange(results, seen, minBound, maxBound);
    } else if (hasSlashList || hasCommaList || (hasListKeyword && numbers.length > 1)) {
      for (var listIndex = 0; listIndex < numbers.length; listIndex += 1) {
        appendFrameRateOption(results, seen, numbers[listIndex]);
      }
    } else if (numbers.length === 1) {
      appendFrameRateOption(results, seen, numbers[0]);
    } else {
      var fallbackMin = Math.min.apply(Math, numbers);
      var fallbackMax = Math.max.apply(Math, numbers);
      appendFrameRateRange(results, seen, fallbackMin, fallbackMax);
    }

    results.sort(function sortFrameRateResult(a, b) {
      if (a.numeric < b.numeric) {
        return -1;
      }
      if (a.numeric > b.numeric) {
        return 1;
      }
      if (a.label < b.label) {
        return -1;
      }
      if (a.label > b.label) {
        return 1;
      }
      return 0;
    });

    var labels = [];
    for (var index = 0; index < results.length; index += 1) {
      labels.push(results[index].label);
    }

    return labels;
  }

  function collectAllFrameRateOptions(frameRates) {
    var options = [];
    var seen = Object.create(null);
    var list = Array.isArray(frameRates) ? frameRates : [];

    for (var index = 0; index < list.length; index += 1) {
      var parsed = parseFrameRateOptions(list[index]);
      for (var optionIndex = 0; optionIndex < parsed.length; optionIndex += 1) {
        var option = parsed[optionIndex];
        if (Object.prototype.hasOwnProperty.call(seen, option)) {
          continue;
        }
        seen[option] = true;
        options.push(option);
      }
    }

    sortFrameRateOptionsInPlace(options);
    return options;
  }

  function tokenizeComparisonValue(value) {
    if (typeof value !== 'string') {
      return [];
    }
    var withoutParens = value.replace(/\([^)]*\)/g, ' ');
    var normalized = withoutParens.replace(/[^0-9a-zA-Z]+/g, ' ').toLowerCase().trim();
    if (!normalized) {
      return [];
    }
    var rawTokens = normalized.split(/\s+/);
    var tokens = [];
    for (var index = 0; index < rawTokens.length; index += 1) {
      var token = rawTokens[index];
      if (!token) {
        continue;
      }
      if (/^\d$/.test(token)) {
        continue;
      }
      tokens.push(token);
    }
    return tokens;
  }

  function doesFrameRateMatchSensorMode(frameRateValue, sensorModeValue) {
    var sensorTokens = tokenizeComparisonValue(sensorModeValue);
    if (!sensorTokens.length) {
      return false;
    }
    var frameTokens = tokenizeComparisonValue(frameRateValue);
    if (!frameTokens.length) {
      return false;
    }
    var frameSet = Object.create(null);
    for (var frameIndex = 0; frameIndex < frameTokens.length; frameIndex += 1) {
      frameSet[frameTokens[frameIndex]] = true;
    }
    var matches = 0;
    for (var sensorIndex = 0; sensorIndex < sensorTokens.length; sensorIndex += 1) {
      if (frameSet[sensorTokens[sensorIndex]]) {
        matches += 1;
      }
    }
    if (!matches) {
      return false;
    }
    var requiredMatches = sensorTokens.length;
    if (sensorTokens.length >= 3) {
      requiredMatches = sensorTokens.length - 1;
    }
    return matches >= Math.max(1, requiredMatches);
  }

  function buildSensorModeFrameRateMap(sensorModes, frameRates) {
    var map = Object.create(null);
    var modes = Array.isArray(sensorModes) ? sensorModes : [];
    var rates = Array.isArray(frameRates) ? frameRates : [];

    for (var modeIndex = 0; modeIndex < modes.length; modeIndex += 1) {
      var modeValue = modes[modeIndex];
      if (typeof modeValue !== 'string') {
        continue;
      }
      var trimmed = modeValue.trim();
      if (!trimmed) {
        continue;
      }
      var key = normalizeSensorModeKey(trimmed);
      if (!key) {
        continue;
      }
      if (!map[key]) {
        map[key] = [];
      }
    }

    for (var rateIndex = 0; rateIndex < rates.length; rateIndex += 1) {
      var rateValue = rates[rateIndex];
      if (typeof rateValue !== 'string') {
        continue;
      }
      var rateTrimmed = rateValue.trim();
      if (!rateTrimmed) {
        continue;
      }
      var parsedOptions = parseFrameRateOptions(rateTrimmed);
      if (!parsedOptions.length) {
        continue;
      }
      for (var matchIndex = 0; matchIndex < modes.length; matchIndex += 1) {
        var matchValue = modes[matchIndex];
        if (typeof matchValue !== 'string') {
          continue;
        }
        var matchTrimmed = matchValue.trim();
        if (!matchTrimmed) {
          continue;
        }
        var modeKey = normalizeSensorModeKey(matchTrimmed);
        if (!modeKey) {
          continue;
        }
        if (!doesFrameRateMatchSensorMode(rateTrimmed, matchTrimmed)) {
          continue;
        }
        if (!map[modeKey]) {
          map[modeKey] = [];
        }
        for (var optionIndex = 0; optionIndex < parsedOptions.length; optionIndex += 1) {
          var option = parsedOptions[optionIndex];
          if (map[modeKey].indexOf(option) === -1) {
            map[modeKey].push(option);
          }
        }
      }
    }

    for (var mapKey in map) {
      if (!Object.prototype.hasOwnProperty.call(map, mapKey)) {
        continue;
      }
      sortFrameRateOptionsInPlace(map[mapKey]);
    }

    return map;
  }

  function updateSensorModeSelectOptions(values, preferredValue) {
    var select = getFeedbackSelectElement('sensorModeSelect', 'fbSensorMode');
    if (!select) {
      return '';
    }
    var preferred = typeof preferredValue === 'string' ? preferredValue : '';
    var selected = replaceSelectOptions(select, values, preferred, true);
    runtimeFeedbackState.selectedSensorMode = selected;
    return selected;
  }

  function updateFramerateSelectOptionsForSensorMode(sensorModeValue, preferredValue) {
    var select = getFeedbackSelectElement('framerateSelect', 'fbFramerate');
    if (!select) {
      return '';
    }

    var map = runtimeFeedbackState.sensorModeFrameRateMap || {};
    var allRates = Array.isArray(runtimeFeedbackState.allFrameRateOptions)
      ? runtimeFeedbackState.allFrameRateOptions
      : [];
    var normalizedKey = normalizeSensorModeKey(sensorModeValue);
    var targeted = normalizedKey && map[normalizedKey] && map[normalizedKey].length
      ? map[normalizedKey]
      : [];
    var preferred = typeof preferredValue === 'string' ? preferredValue : '';
    var shouldDefaultToFirst = !!normalizedKey && targeted.length > 0;
    var selected = replaceSelectOptions(
      select,
      normalizedKey ? targeted : allRates,
      preferred,
      shouldDefaultToFirst
    );
    runtimeFeedbackState.selectedFramerate = selected;
    return selected;
  }

  function resolveFeedbackOptionElement(config) {
    if (!config) {
      return null;
    }

    var existing = runtimeFeedbackState.elements[config.elementName];
    if (existing) {
      storeFeedbackOptionFallback(config.elementName, existing);
      return existing;
    }

    var doc = resolveDocument();
    if (!doc) {
      return null;
    }

    var element = null;
    try {
      element = doc.getElementById(config.elementId);
    } catch (error) {
      void error;
      element = null;
    }

    if (element) {
      runtimeFeedbackState.elements[config.elementName] = element;
      storeFeedbackOptionFallback(config.elementName, element);
    }

    return element;
  }

  function updateFeedbackOptionList(optionKey, values) {
    var config = FEEDBACK_OPTION_TARGETS[optionKey];
    if (!config) {
      return;
    }

    var element = resolveFeedbackOptionElement(config);
    if (!element) {
      return;
    }

    var fallbacks = getFeedbackOptionFallbacks();
    var fallbackValues = fallbacks[config.elementName] || [];

    var normalized = [];
    var seen = Object.create(null);
    if (Array.isArray(values)) {
      for (var index = 0; index < values.length; index += 1) {
        var raw = values[index];
        if (raw == null) {
          continue;
        }
        var text = String(raw).trim();
        if (!text) {
          continue;
        }
        if (Object.prototype.hasOwnProperty.call(seen, text)) {
          continue;
        }
        seen[text] = true;
        normalized.push(text);
      }
    }

    if (!normalized.length) {
      normalized = fallbackValues.slice();
    }

    replaceDatalistOptions(element, normalized);
  }

  function captureFeedbackOptionElements(doc) {
    if (!doc) {
      return;
    }
    for (var key in FEEDBACK_OPTION_TARGETS) {
      if (!Object.prototype.hasOwnProperty.call(FEEDBACK_OPTION_TARGETS, key)) {
        continue;
      }
      var config = FEEDBACK_OPTION_TARGETS[key];
      if (!config) {
        continue;
      }
      if (runtimeFeedbackState.elements[config.elementName]) {
        storeFeedbackOptionFallback(config.elementName, runtimeFeedbackState.elements[config.elementName]);
        continue;
      }
      var element = null;
      try {
        element = doc.getElementById(config.elementId);
      } catch (error) {
        void error;
        element = null;
      }
      if (element) {
        runtimeFeedbackState.elements[config.elementName] = element;
        storeFeedbackOptionFallback(config.elementName, element);
      }
    }
  }

  function normalizeCameraListValue(entry, preferredKeys) {
    if (entry == null) {
      return '';
    }
    if (typeof entry === 'string') {
      return entry.trim();
    }
    if (typeof entry === 'number' && Number.isFinite(entry)) {
      return String(entry);
    }
    if (entry && typeof entry === 'object') {
      var keys = Array.isArray(preferredKeys) ? preferredKeys : [];
      for (var index = 0; index < keys.length; index += 1) {
        var key = keys[index];
        if (!key) {
          continue;
        }
        var value = entry[key];
        if (typeof value === 'string' && value.trim()) {
          return value.trim();
        }
      }
    }
    return '';
  }

  function collectLensMountValues(cameraData) {
    if (!cameraData || typeof cameraData !== 'object') {
      return [];
    }

    var mounts = [];
    var lensMounts = cameraData.lensMount;
    if (Array.isArray(lensMounts)) {
      for (var index = 0; index < lensMounts.length; index += 1) {
        var lens = lensMounts[index];
        if (!lens) {
          continue;
        }
        var type = normalizeCameraListValue(lens.type || lens, []);
        if (!type) {
          continue;
        }
        var mountType = '';
        if (typeof lens.mount === 'string' && lens.mount.trim()) {
          mountType = lens.mount.trim();
        }
        var label = type;
        if (mountType) {
          label += ' (' + mountType + ')';
        }
        mounts.push(label);
      }
    }

    if (!mounts.length && Array.isArray(cameraData.mountOptions)) {
      var altMounts = cameraData.mountOptions;
      for (var altIndex = 0; altIndex < altMounts.length; altIndex += 1) {
        var alt = altMounts[altIndex];
        var altType = normalizeCameraListValue(alt, ['type', 'name']);
        if (!altType) {
          continue;
        }
        mounts.push(altType);
      }
    }

    return mounts;
  }

  function collectCameraValues(cameraData, key, preferredKeys) {
    if (!cameraData || typeof cameraData !== 'object') {
      return [];
    }
    var list = cameraData[key];
    if (!Array.isArray(list)) {
      return [];
    }
    var values = [];
    for (var index = 0; index < list.length; index += 1) {
      var value = normalizeCameraListValue(list[index], preferredKeys);
      if (value) {
        values.push(value);
      }
    }
    return values;
  }

  function updateRuntimeFeedbackCameraOptionLists(cameraDevices, cameraName) {
    var cameraData = null;
    if (cameraDevices && cameraName && typeof cameraDevices === 'object') {
      if (Object.prototype.hasOwnProperty.call(cameraDevices, cameraName)) {
        cameraData = cameraDevices[cameraName];
      }
    }

    var lensMountValues = collectLensMountValues(cameraData);
    var resolutionValues = collectCameraValues(cameraData, 'resolutions', ['label', 'name', 'value']);
    var codecValues = collectCameraValues(cameraData, 'recordingCodecs', ['label', 'name', 'codec', 'type']);
    var sensorModeValues = collectCameraValues(cameraData, 'sensorModes', ['label', 'name', 'mode']);
    var frameRateValues = collectCameraValues(cameraData, 'frameRates', ['label', 'name', 'rate', 'value']);

    updateFeedbackOptionList('lensMount', lensMountValues);
    updateFeedbackOptionList('resolution', resolutionValues);
    updateFeedbackOptionList('codec', codecValues);

    runtimeFeedbackState.allFrameRateOptions = collectAllFrameRateOptions(frameRateValues);
    runtimeFeedbackState.sensorModeFrameRateMap = buildSensorModeFrameRateMap(sensorModeValues, frameRateValues);

    var sensorModeSelect = getFeedbackSelectElement('sensorModeSelect', 'fbSensorMode');
    var framerateSelect = getFeedbackSelectElement('framerateSelect', 'fbFramerate');
    var preferredSensorMode = sensorModeSelect && typeof sensorModeSelect.value === 'string'
      ? sensorModeSelect.value
      : runtimeFeedbackState.selectedSensorMode;
    var selectedSensorMode = updateSensorModeSelectOptions(sensorModeValues, preferredSensorMode);
    var preferredFramerate = framerateSelect && typeof framerateSelect.value === 'string'
      ? framerateSelect.value
      : runtimeFeedbackState.selectedFramerate;
    updateFramerateSelectOptionsForSensorMode(selectedSensorMode, preferredFramerate);
  }

  function resolveDocument(options) {
    if (options && options.document && typeof options.document === 'object') {
      return options.document;
    }

    if (runtimeFeedbackState.dependencies.document) {
      return runtimeFeedbackState.dependencies.document;
    }

    if (typeof document !== 'undefined' && document) {
      return document;
    }

    if (GLOBAL_SCOPE && GLOBAL_SCOPE.document) {
      return GLOBAL_SCOPE.document;
    }

    return null;
  }

  function assignFunctionDependency(deps, options, name) {
    if (options && typeof options[name] === 'function') {
      deps[name] = options[name];
      return;
    }

    if (!deps[name] && GLOBAL_SCOPE && typeof GLOBAL_SCOPE[name] === 'function') {
      deps[name] = GLOBAL_SCOPE[name];
    }
  }

  function updateRuntimeDependencies(options) {
    var deps = runtimeFeedbackState.dependencies;
    var opts = options || {};

    var doc = resolveDocument(opts);
    if (doc) {
      deps.document = doc;
    }

    var win = null;
    if (opts.window && typeof opts.window === 'object') {
      win = opts.window;
    } else if (deps.window) {
      win = deps.window;
    } else if (typeof window !== 'undefined' && window) {
      win = window;
    } else if (GLOBAL_SCOPE && GLOBAL_SCOPE.window) {
      win = GLOBAL_SCOPE.window;
    }
    if (win) {
      deps.window = win;
    }

    var nav = null;
    if (opts.navigator && typeof opts.navigator === 'object') {
      nav = opts.navigator;
    } else if (deps.navigator) {
      nav = deps.navigator;
    } else if (win && win.navigator) {
      nav = win.navigator;
    } else if (typeof navigator !== 'undefined' && navigator) {
      nav = navigator;
    }
    if (nav) {
      deps.navigator = nav;
    }

    var alertFn = null;
    if (typeof opts.alert === 'function') {
      alertFn = opts.alert;
    } else if (deps.alert) {
      alertFn = deps.alert;
    } else if (win && typeof win.alert === 'function') {
      alertFn = win.alert;
    } else if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.alert === 'function') {
      alertFn = GLOBAL_SCOPE.alert;
    }
    if (alertFn) {
      deps.alert = alertFn;
    }

    assignFunctionDependency(deps, opts, 'openDialog');
    assignFunctionDependency(deps, opts, 'closeDialog');
    assignFunctionDependency(deps, opts, 'getCurrentSetupKey');
    assignFunctionDependency(deps, opts, 'loadFeedback');
    assignFunctionDependency(deps, opts, 'saveFeedback');
    assignFunctionDependency(deps, opts, 'updateCalculations');
    assignFunctionDependency(deps, opts, 'renderFeedbackTable');
    assignFunctionDependency(deps, opts, 'dispatchTemperatureNoteRender');
    assignFunctionDependency(deps, opts, 'refreshFeedbackTemperatureLabel');
    assignFunctionDependency(deps, opts, 'updateFeedbackTemperatureOptions');
    assignFunctionDependency(deps, opts, 'refreshTotalCurrentLabels');
    assignFunctionDependency(deps, opts, 'updateMountVoltageSettingLabels');
    assignFunctionDependency(deps, opts, 'setButtonLabelWithIcon');
    assignFunctionDependency(deps, opts, 'getSelectedPlate');
    assignFunctionDependency(deps, opts, 'getMountVoltageConfig');
    assignFunctionDependency(deps, opts, 'updateBatteryOptions');
    assignFunctionDependency(deps, opts, 'setStatusMessage');
    assignFunctionDependency(deps, opts, 'setStatusLevel');
    assignFunctionDependency(deps, opts, 'closePowerWarningDialog');
    assignFunctionDependency(deps, opts, 'showPowerWarningDialog');
    assignFunctionDependency(deps, opts, 'drawPowerDiagram');
    assignFunctionDependency(deps, opts, 'renderTemperatureNote');
    assignFunctionDependency(deps, opts, 'checkFizCompatibility');
    assignFunctionDependency(deps, opts, 'checkFizController');
    assignFunctionDependency(deps, opts, 'checkArriCompatibility');
    assignFunctionDependency(deps, opts, 'renderSetupDiagram');
    assignFunctionDependency(deps, opts, 'refreshGearListIfVisible');
    assignFunctionDependency(deps, opts, 'supportsBMountCamera');
    assignFunctionDependency(deps, opts, 'supportsGoldMountCamera');
    assignFunctionDependency(deps, opts, 'getCssVariableValue');
    assignFunctionDependency(deps, opts, 'escapeHtml');
    assignFunctionDependency(deps, opts, 'getLastRuntimeHours');
    assignFunctionDependency(deps, opts, 'setLastRuntimeHours');
    assignFunctionDependency(deps, opts, 'getDevices');
    assignFunctionDependency(deps, opts, 'getTexts');
    assignFunctionDependency(deps, opts, 'getCurrentLang');
    assignFunctionDependency(deps, opts, 'getCollator');

    if (opts.iconGlyphs && typeof opts.iconGlyphs === 'object') {
      deps.iconGlyphs = opts.iconGlyphs;
    } else if (!deps.iconGlyphs && GLOBAL_SCOPE && GLOBAL_SCOPE.ICON_GLYPHS) {
      deps.iconGlyphs = GLOBAL_SCOPE.ICON_GLYPHS;
    }

    if (typeof opts.mailTarget === 'string' && opts.mailTarget.trim()) {
      deps.mailTarget = opts.mailTarget.trim();
    } else if (!deps.mailTarget) {
      deps.mailTarget = 'info@lucazanner.de';
    }

    if (!deps.loadFeedback) {
      deps.loadFeedback = function loadFeedbackFallback() {
        return {};
      };
    }

    if (!deps.saveFeedback) {
      deps.saveFeedback = function saveFeedbackFallback() {
        return undefined;
      };
    }

    if (!deps.updateCalculations) {
      deps.updateCalculations = function updateCalculationsFallback() {
        return undefined;
      };
    }

    if (!deps.getCurrentSetupKey) {
      deps.getCurrentSetupKey = function fallbackGetCurrentSetupKey() {
        return '';
      };
    }

    return deps;
  }

  function resolveElementFromOptions(options, name, fallbackId, globalName) {
    var opts = options || {};
    var elements = opts.elements && typeof opts.elements === 'object' ? opts.elements : null;
    if (elements && elements[name]) {
      return elements[name];
    }

    if (opts[name]) {
      return opts[name];
    }

    if (runtimeFeedbackState.elements[name]) {
      return runtimeFeedbackState.elements[name];
    }

    var doc = resolveDocument(opts);
    if (doc && fallbackId) {
      var byId = null;
      try {
        byId = doc.getElementById(fallbackId);
      } catch (error) {
        void error;
        byId = null;
      }
      if (byId) {
        return byId;
      }
    }

    var globalLookup = globalName || name;
    if (GLOBAL_SCOPE && GLOBAL_SCOPE[globalLookup]) {
      return GLOBAL_SCOPE[globalLookup];
    }

    return null;
  }

  function getLocaleAwareCollator(collatorCandidate, lang) {
    if (collatorCandidate && typeof collatorCandidate.compare === 'function') {
      return collatorCandidate;
    }

    var cache = runtimeFeedbackState.collatorCache;
    if (!cache || typeof cache !== 'object') {
      cache = Object.create(null);
      runtimeFeedbackState.collatorCache = cache;
    }

    var normalizedLang = typeof lang === 'string' ? lang.trim() : '';
    var localeKey = normalizedLang || 'default';
    var cached = cache[localeKey];
    if (cached && typeof cached.compare === 'function') {
      return cached;
    }

    var resolvedCollator = null;
    if (typeof Intl !== 'undefined' && typeof Intl.Collator === 'function') {
      var localeCandidates = localeKey === 'default'
        ? [undefined]
        : [normalizedLang, undefined];
      for (var index = 0; index < localeCandidates.length; index += 1) {
        var localeCandidate = localeCandidates[index];
        if (typeof localeCandidate === 'string' && !localeCandidate) {
          continue;
        }
        try {
          resolvedCollator = new Intl.Collator(localeCandidate, { numeric: true, sensitivity: 'base' });
          break;
        } catch (error) {
          void error;
          resolvedCollator = null;
        }
      }
    }

    if (!resolvedCollator) {
      var fallback = runtimeFeedbackState.fallbackCollator;
      if (!fallback || typeof fallback.compare !== 'function') {
        fallback = {
          compare: function fallbackCompare(a, b) {
            return String(a).localeCompare(String(b));
          }
        };
        runtimeFeedbackState.fallbackCollator = fallback;
      }
      resolvedCollator = fallback;
    }

    cache[localeKey] = resolvedCollator;
    return resolvedCollator;
  }

  function toArray(value) {
    if (!value) {
      return [];
    }

    if (Array.isArray(value)) {
      return value.filter(Boolean);
    }

    if (typeof value.length === 'number') {
      return Array.prototype.slice.call(value).filter(Boolean);
    }

    return [value].filter(Boolean);
  }

  function resolveSelectCollection(options, name, fallbackIds, globalName) {
    var opts = options || {};
    var elements = opts.elements && typeof opts.elements === 'object' ? opts.elements : null;
    var collection = null;

    if (elements && elements[name]) {
      collection = elements[name];
    } else if (opts[name]) {
      collection = opts[name];
    } else if (runtimeFeedbackState.elements[name]) {
      collection = runtimeFeedbackState.elements[name];
    } else if (GLOBAL_SCOPE && globalName && GLOBAL_SCOPE[globalName]) {
      collection = GLOBAL_SCOPE[globalName];
    }

    var result = toArray(collection);
    if (result.length) {
      runtimeFeedbackState.elements[name] = result;
      return result;
    }

    var resolved = [];
    var doc = resolveDocument(opts);
    if (doc && Array.isArray(fallbackIds)) {
      for (var index = 0; index < fallbackIds.length; index += 1) {
        var id = fallbackIds[index];
        if (!id) {
          continue;
        }
        var element = null;
        try {
          element = doc.getElementById(id);
        } catch (error) {
          void error;
          element = null;
        }
        if (element) {
          resolved.push(element);
        }
      }
    }

    runtimeFeedbackState.elements[name] = resolved;
    return resolved;
  }

  function setHelpAttribute(element, text) {
    if (!element) {
      return;
    }

    if (text && typeof text === 'string' && text.trim()) {
      try {
        element.setAttribute('data-help', text);
      } catch (error) {
        void error;
      }
    } else {
      try {
        element.removeAttribute('data-help');
      } catch (error) {
        void error;
      }
    }
  }

  function getNonEmptyString(value) {
    if (typeof value !== 'string') {
      return '';
    }
    var trimmed = value.trim();
    return trimmed ? trimmed : '';
  }

  function replaceSummaryTokens(template, tokens) {
    if (typeof template !== 'string' || !template) {
      return '';
    }
    var result = template;
    for (var key in tokens) {
      if (!Object.prototype.hasOwnProperty.call(tokens, key)) {
        continue;
      }
      var tokenValue = tokens[key];
      var placeholder = '{' + key + '}';
      if (result.indexOf(placeholder) === -1) {
        continue;
      }
      var replacement = typeof tokenValue === 'undefined' ? '' : String(tokenValue);
      result = result.split(placeholder).join(replacement);
    }
    return result;
  }

  function selectSummaryBatteryName(labelText, batteryName, unnamedLabel) {
    var resolvedLabel = getNonEmptyString(labelText);
    if (resolvedLabel) {
      return resolvedLabel;
    }
    var resolvedBattery = getNonEmptyString(batteryName);
    if (resolvedBattery) {
      return resolvedBattery;
    }
    return getNonEmptyString(unnamedLabel);
  }

  function formatRuntimeHoursForSummary(runtimeHours) {
    if (!Number.isFinite(runtimeHours)) {
      return '';
    }
    return runtimeHours >= 10 ? runtimeHours.toFixed(1) : runtimeHours.toFixed(2);
  }

  function formatCurrentForSummary(current) {
    if (!Number.isFinite(current)) {
      return '0.00';
    }
    return current.toFixed(2);
  }

  function coerceCurrentLimit(rawValue) {
    if (typeof rawValue === 'number') {
      return Number.isFinite(rawValue) ? rawValue : null;
    }
    if (typeof rawValue === 'string') {
      var trimmed = rawValue.trim();
      if (!trimmed) {
        return null;
      }
      var normalized = trimmed.replace(/,/g, '.');
      var parsed = parseFloat(normalized);
      return Number.isFinite(parsed) ? parsed : null;
    }
    return null;
  }

  function resolvePinsStatusText(resolveText, options) {
    var current = Number.isFinite(options.current) ? options.current : 0;
    var limit = Number.isFinite(options.limit) ? options.limit : null;

    if (current <= 0) {
      return resolveText('resultsPlainSummaryPinsZero');
    }

    if (!Number.isFinite(limit) || limit <= 0) {
      var unknownTemplate = resolveText('resultsPlainSummaryPinsUnknown');
      return replaceSummaryTokens(unknownTemplate, {
        current: formatCurrentForSummary(current),
      });
    }

    var tokens = {
      current: formatCurrentForSummary(current),
      max: String(limit),
    };

    if (current > limit) {
      return replaceSummaryTokens(resolveText('resultsPlainSummaryPinsExceeded'), tokens);
    }

    if (current >= limit * 0.8) {
      return replaceSummaryTokens(resolveText('resultsPlainSummaryPinsNear'), tokens);
    }

    return replaceSummaryTokens(resolveText('resultsPlainSummaryPinsOk'), tokens);
  }

  function resolveDtapStatusText(resolveText, options) {
    var current = Number.isFinite(options.current) ? options.current : 0;
    var limit = Number.isFinite(options.limit) ? options.limit : null;
    var hasRating = options.hasRating;
    var allowed = options.allowed;
    var bMountCam = options.bMountCam;

    if (!allowed) {
      if (bMountCam) {
        return resolveText('resultsPlainSummaryDtapUnavailableBMount');
      }
      if (!hasRating) {
        var missingTemplate = resolveText('resultsPlainSummaryDtapUnknown');
        return replaceSummaryTokens(missingTemplate, {
          current: formatCurrentForSummary(current),
        });
      }
      return resolveText('resultsPlainSummaryDtapUnavailable');
    }

    if (current <= 0) {
      return resolveText('resultsPlainSummaryDtapZero');
    }

    if (!Number.isFinite(limit) || limit <= 0) {
      var unknownTemplate = resolveText('resultsPlainSummaryDtapUnknown');
      return replaceSummaryTokens(unknownTemplate, {
        current: formatCurrentForSummary(current),
      });
    }

    var tokens = {
      current: formatCurrentForSummary(current),
      max: String(limit),
    };

    if (current > limit) {
      return replaceSummaryTokens(resolveText('resultsPlainSummaryDtapExceeded'), tokens);
    }

    if (current >= limit * 0.8) {
      return replaceSummaryTokens(resolveText('resultsPlainSummaryDtapNear'), tokens);
    }

    return replaceSummaryTokens(resolveText('resultsPlainSummaryDtapOk'), tokens);
  }

  function buildPowerOutputSummaryText(resolveText, options) {
    if (typeof resolveText !== 'function') {
      return '';
    }

    var opts = options || {};
    var parts = [];
    var pinsText = resolvePinsStatusText(resolveText, {
      current: opts.current,
      limit: opts.pinLimit,
    });
    if (pinsText) {
      parts.push(pinsText);
    }

    var dtapText = resolveDtapStatusText(resolveText, {
      current: opts.current,
      limit: opts.dtapLimit,
      hasRating: opts.hasDtapRating,
      allowed: opts.dtapAllowed,
      bMountCam: opts.bMountCam,
    });
    if (dtapText) {
      parts.push(dtapText);
    }

    return parts.join(' ');
  }

  function buildPlainSummaryText(summaryOptions) {
    var opts = summaryOptions || {};
    var summaryPrompt = getNonEmptyString(opts.summaryPrompt);
    var needBatterySummary = getNonEmptyString(opts.needBatterySummary) || summaryPrompt;
    var unnamedBatteryLabel = getNonEmptyString(opts.unnamedBatteryLabel);
    var batteryNameSummary = selectSummaryBatteryName(opts.batteryLabelText, opts.battery, unnamedBatteryLabel);
    var totalPowerDisplay = Number.isFinite(opts.totalWatt) ? opts.totalWatt.toFixed(1) : '0.0';

    if (!opts.battery) {
      var promptWhenMissingBattery = opts.totalWatt > 0 ? needBatterySummary : summaryPrompt;
      return promptWhenMissingBattery || needBatterySummary || summaryPrompt || batteryNameSummary || '';
    }

    if (!Number.isFinite(opts.runtimeHoursValue)) {
      if (
        opts.unlimitedSummaryTemplate &&
        Number.isFinite(opts.totalWatt) &&
        opts.totalWatt === 0
      ) {
        var unlimitedSummary = replaceSummaryTokens(opts.unlimitedSummaryTemplate, {
          batteryName: batteryNameSummary || unnamedBatteryLabel || '',
          totalPower: totalPowerDisplay
        });
        if (unlimitedSummary) {
          return unlimitedSummary;
        }
      }
      return needBatterySummary || summaryPrompt || batteryNameSummary || '';
    }

    if (
      opts.runtimeSummaryTemplate &&
      opts.batteriesNeededValue !== null &&
      Number.isFinite(opts.batteriesNeededValue) &&
      opts.batteriesNeededValue > 0
    ) {
      var formattedHours = formatRuntimeHoursForSummary(opts.runtimeHoursValue);
      var runtimeSummary = replaceSummaryTokens(opts.runtimeSummaryTemplate, {
        batteryName: batteryNameSummary || unnamedBatteryLabel || '',
        hours: formattedHours,
        batteryCount: String(opts.batteriesNeededValue),
        totalPower: totalPowerDisplay
      });
      if (runtimeSummary) {
        return runtimeSummary;
      }
    }

    return summaryPrompt || needBatterySummary || batteryNameSummary || '';
  }

  function createTextResolver(langTexts, fallbackTexts) {
    var primary = langTexts && typeof langTexts === 'object' ? langTexts : {};
    var secondary = fallbackTexts && typeof fallbackTexts === 'object' ? fallbackTexts : {};
    return function resolveText(key) {
      if (!key) {
        return '';
      }
      var value = primary[key];
      if (typeof value === 'string') {
        var trimmed = value.trim();
        if (trimmed) {
          return trimmed;
        }
      }
      value = secondary[key];
      if (typeof value === 'string') {
        var fallbackTrimmed = value.trim();
        if (fallbackTrimmed) {
          return fallbackTrimmed;
        }
      }
      return '';
    };
  }

  var TEMPERATURE_NOTE_PROFILES = freezeDeep([
    { celsius: 25, multiplier: 1 },
    { celsius: 0, multiplier: 1.25 },
    { celsius: -10, multiplier: 1.6 },
    { celsius: -20, multiplier: 2 }
  ]);

  function resolveEscapeHtml() {
    var escapeHtmlFn = runtimeFeedbackState && runtimeFeedbackState.dependencies
      ? runtimeFeedbackState.dependencies.escapeHtml
      : null;
    if (!escapeHtmlFn && GLOBAL_SCOPE && typeof GLOBAL_SCOPE.escapeHtml === 'function') {
      escapeHtmlFn = GLOBAL_SCOPE.escapeHtml;
    }
    if (typeof escapeHtmlFn === 'function') {
      return escapeHtmlFn;
    }
    return function escapeHtmlFallback(value) {
      var text = value == null ? '' : String(value);
      return text.replace(/[&<>"']/g, function replaceChar(ch) {
        switch (ch) {
          case '&':
            return '&amp;';
          case '<':
            return '&lt;';
          case '>':
            return '&gt;';
          case '"':
            return '&quot;';
          case '\'':
            return '&#39;';
          default:
            return ch;
        }
      });
    };
  }

  function normaliseTemperatureUnitPreference(unit) {
    if (typeof unit !== 'string') {
      return 'celsius';
    }
    var value = unit.trim().toLowerCase();
    if (value === 'fahrenheit' || value === 'f' || value === '°f') {
      return 'fahrenheit';
    }
    if (value === 'kelvin' || value === 'k') {
      return 'kelvin';
    }
    return 'celsius';
  }

  function resolveTemperatureUnitPreference() {
    var candidates = [];
    if (runtimeFeedbackState && runtimeFeedbackState.dependencies) {
      if (typeof runtimeFeedbackState.dependencies.temperatureUnit === 'string') {
        candidates.push(runtimeFeedbackState.dependencies.temperatureUnit);
      }
      if (
        runtimeFeedbackState.dependencies.sessionGlobalScope &&
        typeof runtimeFeedbackState.dependencies.sessionGlobalScope.temperatureUnit === 'string'
      ) {
        candidates.push(runtimeFeedbackState.dependencies.sessionGlobalScope.temperatureUnit);
      }
    }
    if (GLOBAL_SCOPE) {
      if (typeof GLOBAL_SCOPE.temperatureUnit === 'string') {
        candidates.push(GLOBAL_SCOPE.temperatureUnit);
      }
      if (
        GLOBAL_SCOPE.sessionGlobalScope &&
        typeof GLOBAL_SCOPE.sessionGlobalScope.temperatureUnit === 'string'
      ) {
        candidates.push(GLOBAL_SCOPE.sessionGlobalScope.temperatureUnit);
      }
      if (typeof GLOBAL_SCOPE.localTemperatureUnit === 'string') {
        candidates.push(GLOBAL_SCOPE.localTemperatureUnit);
      }
    }

    for (var index = 0; index < candidates.length; index += 1) {
      var candidate = candidates[index];
      var normalised = normaliseTemperatureUnitPreference(candidate);
      if (normalised) {
        if (normalised === 'kelvin') {
          return 'celsius';
        }
        return normalised;
      }
    }

    return 'celsius';
  }

  function createNumberFormatter(lang, options, fallbackDigits) {
    try {
      var formatter = new Intl.NumberFormat(lang || 'en', options || {});
      return function formatNumber(value) {
        return formatter.format(value);
      };
    } catch (error) {
      void error;
    }

    var digits = typeof fallbackDigits === 'number' ? fallbackDigits : 0;
    return function fallbackFormatNumber(value) {
      if (typeof value !== 'number' || !Number.isFinite(value)) {
        return String(value);
      }
      try {
        return value.toFixed(digits);
      } catch (formatError) {
        void formatError;
      }
      return String(value);
    };
  }

  function resolveLanguageFromContext(doc) {
    var lang = null;
    if (runtimeFeedbackState && runtimeFeedbackState.dependencies) {
      var getCurrentLang = runtimeFeedbackState.dependencies.getCurrentLang;
      if (typeof getCurrentLang === 'function') {
        try {
          lang = getCurrentLang();
        } catch (langError) {
          void langError;
        }
      }
    }
    if (!lang && GLOBAL_SCOPE && typeof GLOBAL_SCOPE.currentLang === 'string') {
      lang = GLOBAL_SCOPE.currentLang;
    }
    if (!lang && doc && doc.documentElement && typeof doc.documentElement.lang === 'string') {
      lang = doc.documentElement.lang;
    }
    /* if (!lang && typeof navigator !== 'undefined' && navigator && typeof navigator.language === 'string') {
      lang = navigator.language;
    } */
    if (typeof lang !== 'string' || !lang) {
      return 'en';
    }
    return lang;
  }

  function resolveLanguageTexts(lang) {
    var dictionaries = null;
    if (runtimeFeedbackState && runtimeFeedbackState.dependencies) {
      var getTexts = runtimeFeedbackState.dependencies.getTexts;
      if (typeof getTexts === 'function') {
        try {
          dictionaries = getTexts();
        } catch (textsError) {
          void textsError;
        }
      }
    }
    if (!dictionaries && GLOBAL_SCOPE && GLOBAL_SCOPE.texts && typeof GLOBAL_SCOPE.texts === 'object') {
      dictionaries = GLOBAL_SCOPE.texts;
    }

    var fallback = (dictionaries && dictionaries.en) || {};
    if (!lang || !dictionaries) {
      return { langTexts: fallback, fallbackTexts: fallback };
    }

    if (dictionaries[lang]) {
      return { langTexts: dictionaries[lang], fallbackTexts: fallback };
    }

    var dashIndex = lang.indexOf('-');
    if (dashIndex !== -1) {
      var baseLang = lang.slice(0, dashIndex);
      if (dictionaries[baseLang]) {
        return { langTexts: dictionaries[baseLang], fallbackTexts: fallback };
      }
    }

    return { langTexts: fallback, fallbackTexts: fallback };
  }

  function convertCelsiusToUnit(celsius, unit) {
    if (unit === 'fahrenheit') {
      return (celsius * 9) / 5 + 32;
    }
    return celsius;
  }

  function renderTemperatureNote(hours) {
    var doc = resolveDocument({});
    var container = runtimeFeedbackState && runtimeFeedbackState.elements
      ? runtimeFeedbackState.elements.tempNote
      : null;
    if (!container && doc) {
      try {
        container = doc.getElementById('temperatureNote');
      } catch (lookupError) {
        void lookupError;
      }
      if (container && runtimeFeedbackState && runtimeFeedbackState.elements) {
        runtimeFeedbackState.elements.tempNote = container;
      }
    }

    if (!container || typeof container !== 'object') {
      return false;
    }

    var lang = resolveLanguageFromContext(doc);
    var textBundles = resolveLanguageTexts(lang);
    var resolveText = createTextResolver(textBundles.langTexts, textBundles.fallbackTexts);
    var escapeHtmlFn = resolveEscapeHtml();

    var headingText = resolveText('temperatureNoteHeading') || 'Temperature impact on runtime:';
    var temperatureLabel = resolveText('temperatureLabel') || 'Temperature';
    var runtimeLabel = resolveText('runtimeLabel') || 'Estimated Runtime (h)';
    var batteryCountLabel = resolveText('batteryCountTempLabel') || 'Batteries needed';
    var runtimeUnit = resolveText('batteryLifeUnit');

    var unitPreference = resolveTemperatureUnitPreference();
    var unitSymbolKey = unitPreference === 'fahrenheit'
      ? 'temperatureUnitSymbolFahrenheit'
      : 'temperatureUnitSymbolCelsius';
    var unitSymbol = resolveText(unitSymbolKey) || (unitPreference === 'fahrenheit' ? '°F' : '°C');

    var runtimeFormatter = createNumberFormatter(lang, { minimumFractionDigits: 2, maximumFractionDigits: 2 }, 2);
    var integerFormatter = createNumberFormatter(lang, { maximumFractionDigits: 0 }, 0);
    var temperatureFormatter = createNumberFormatter(
      lang,
      { maximumFractionDigits: unitPreference === 'fahrenheit' ? 0 : 0, signDisplay: 'exceptZero' },
      0
    );

    var rowsHtml = '';
    var numericHours = Number.isFinite(hours) ? hours : Number(hours);
    if (!Number.isFinite(numericHours) && hours !== Infinity) {
      numericHours = null;
    }
    var isInfinite = hours === Infinity;

    for (var index = 0; index < TEMPERATURE_NOTE_PROFILES.length; index += 1) {
      var profile = TEMPERATURE_NOTE_PROFILES[index];
      var displayTemp = convertCelsiusToUnit(profile.celsius, unitPreference);
      var formattedTemp = temperatureFormatter(displayTemp);
      var runtimeValue = null;
      var batteryValue = null;

      if (isInfinite) {
        runtimeValue = Infinity;
        batteryValue = 1;
      } else if (Number.isFinite(numericHours) && numericHours > 0) {
        var adjustedRuntime = numericHours / profile.multiplier;
        if (Number.isFinite(adjustedRuntime) && adjustedRuntime > 0) {
          runtimeValue = adjustedRuntime;
          var count = 10 / adjustedRuntime;
          if (Number.isFinite(count) && count > 0) {
            batteryValue = Math.max(1, Math.ceil(count));
          }
        }
      }

      var runtimeDisplay = '–';
      if (runtimeValue === Infinity) {
        runtimeDisplay = '∞';
      } else if (Number.isFinite(runtimeValue) && runtimeValue > 0) {
        runtimeDisplay = runtimeFormatter(runtimeValue);
        if (runtimeUnit) {
          runtimeDisplay += ' ' + runtimeUnit;
        }
      }

      var batteryDisplay = '–';
      if (Number.isFinite(batteryValue) && batteryValue > 0) {
        batteryDisplay = integerFormatter(batteryValue);
      }

      rowsHtml += '<tr>' +
        '<td>' + escapeHtmlFn(formattedTemp + ' ' + unitSymbol) + '</td>' +
        '<td>' + escapeHtmlFn(runtimeDisplay) + '</td>' +
        '<td>' + escapeHtmlFn(batteryDisplay) + '</td>' +
        '</tr>';
    }

    var tableHtml = '<table>' +
      '<thead><tr>' +
      '<th>' + escapeHtmlFn(temperatureLabel + ' (' + unitSymbol + ')') + '</th>' +
      '<th>' + escapeHtmlFn(runtimeLabel) + '</th>' +
      '<th>' + escapeHtmlFn(batteryCountLabel) + '</th>' +
      '</tr></thead>' +
      '<tbody>' + rowsHtml + '</tbody>' +
      '</table>';

    var headingHtml = '<h3>' + escapeHtmlFn(headingText) + '</h3>';

    try {
      container.innerHTML = headingHtml + tableHtml;
    } catch (assignError) {
      void assignError;
      container.innerHTML = headingHtml + tableHtml;
    }

    return true;
  }

  function localizeResultsSection(options) {
    var opts = options || {};
    var deps = updateRuntimeDependencies(opts);
    var doc = resolveDocument(opts);
    if (!doc) {
      return false;
    }

    var lang = typeof opts.lang === 'string' ? opts.lang : '';
    var langTexts = opts.langTexts && typeof opts.langTexts === 'object' ? opts.langTexts : {};
    var fallbackTexts = opts.fallbackTexts && typeof opts.fallbackTexts === 'object' ? opts.fallbackTexts : {};

    var resolveText = createTextResolver(langTexts, fallbackTexts);

    var breakdownList = resolveElementFromOptions(opts, 'breakdownListElem', 'breakdownList', 'breakdownListElem');
    if (breakdownList) {
      var breakdownHelp = resolveText('breakdownListHelp');
      setHelpAttribute(breakdownList, breakdownHelp);
    }

    var resultsPlainSummary = resolveElementFromOptions(
      opts,
      'resultsPlainSummaryElem',
      'resultsPlainSummary',
      'resultsPlainSummaryElem'
    );
    if (resultsPlainSummary) {
      setHelpAttribute(resultsPlainSummary, resolveText('resultsPlainSummaryHelp'));
    }

    var resultsPlainSummaryTitle = resolveElementFromOptions(
      opts,
      'resultsPlainSummaryTitleElem',
      'resultsPlainSummaryTitle',
      'resultsPlainSummaryTitleElem'
    );
    if (resultsPlainSummaryTitle) {
      try {
        resultsPlainSummaryTitle.textContent =
          resolveText('resultsPlainSummaryTitle') || resultsPlainSummaryTitle.textContent || '';
      } catch (error) {
        void error;
      }
    }

    var resultsPlainSummaryText = resolveElementFromOptions(
      opts,
      'resultsPlainSummaryTextElem',
      'resultsPlainSummaryText',
      'resultsPlainSummaryTextElem'
    );
    if (resultsPlainSummaryText) {
      var summaryPrompt = resolveText('resultsPlainSummaryPrompt');
      if (!summaryPrompt && typeof resultsPlainSummaryText.textContent === 'string') {
        summaryPrompt = resultsPlainSummaryText.textContent;
      }
      try {
        resultsPlainSummaryText.textContent = summaryPrompt;
      } catch (error) {
        void error;
      }
    }

    var resultsPlainSummaryNote = resolveElementFromOptions(
      opts,
      'resultsPlainSummaryNoteElem',
      'resultsPlainSummaryNote',
      'resultsPlainSummaryNoteElem'
    );
    if (resultsPlainSummaryNote) {
      try {
        resultsPlainSummaryNote.textContent =
          resolveText('resultsPlainSummaryNote') || resultsPlainSummaryNote.textContent || '';
      } catch (error) {
        void error;
      }
    }

    function applyLabel(element, labelKey, helpKey) {
      if (!element) {
        return;
      }
      var labelText = resolveText(labelKey);
      if (!labelText) {
        if (typeof element.textContent === 'string') {
          labelText = element.textContent;
        }
      }
      try {
        if (typeof element.textContent === 'string') {
          element.textContent = labelText;
        }
      } catch (error) {
        void error;
      }
      var helpText = resolveText(helpKey);
      setHelpAttribute(element, helpText);
    }

    var totalPowerLabel = resolveElementFromOptions(opts, 'totalPowerLabel', 'totalPowerLabel');
    applyLabel(totalPowerLabel, 'totalPowerLabel', 'totalPowerHelp');

    if (typeof deps.refreshTotalCurrentLabels === 'function') {
      try {
        deps.refreshTotalCurrentLabels(lang);
      } catch (error) {
        safeWarn('Unable to refresh total current labels via cineResults.', error);
      }
    }

    if (typeof deps.updateMountVoltageSettingLabels === 'function') {
      try {
        deps.updateMountVoltageSettingLabels(lang);
      } catch (error) {
        safeWarn('Unable to refresh mount voltage labels via cineResults.', error);
      }
    }

    var batteryCountLabel = resolveElementFromOptions(opts, 'batteryCountLabel', 'batteryCountLabel');
    applyLabel(batteryCountLabel, 'batteryCountLabel', 'batteryCountHelp');

    var pinWarning = resolveElementFromOptions(opts, 'pinWarning', null, 'pinWarnElem');
    setHelpAttribute(pinWarning, resolveText('pinWarningHelp'));

    var dtapWarning = resolveElementFromOptions(opts, 'dtapWarning', null, 'dtapWarnElem');
    setHelpAttribute(dtapWarning, resolveText('dtapWarningHelp'));

    var hotswapWarning = resolveElementFromOptions(opts, 'hotswapWarning', null, 'hotswapWarnElem');
    setHelpAttribute(hotswapWarning, resolveText('hotswapWarningHelp'));

    var powerWarningTitle = resolveElementFromOptions(opts, 'powerWarningTitle', null, 'powerWarningTitleElem');
    if (powerWarningTitle) {
      try {
        powerWarningTitle.textContent = resolveText('powerWarningTitle') || powerWarningTitle.textContent || '';
      } catch (error) {
        void error;
      }
    }

    var powerWarningLimitsHeading = resolveElementFromOptions(opts, 'powerWarningLimitsHeading', null, 'powerWarningLimitsHeadingElem');
    if (powerWarningLimitsHeading) {
      try {
        powerWarningLimitsHeading.textContent = resolveText('powerWarningLimitsHeading') || powerWarningLimitsHeading.textContent || '';
      } catch (error) {
        void error;
      }
    }

    var powerWarningAdvice = resolveElementFromOptions(opts, 'powerWarningAdvice', null, 'powerWarningAdviceElem');
    if (powerWarningAdvice) {
      try {
        powerWarningAdvice.textContent = resolveText('powerWarningAdvice') || powerWarningAdvice.textContent || '';
      } catch (error) {
        void error;
      }
    }

    var setButtonLabelWithIcon = deps.setButtonLabelWithIcon;
    var iconGlyphs = deps.iconGlyphs || {};
    var powerWarningCloseBtn = resolveElementFromOptions(opts, 'powerWarningCloseBtn', null, 'powerWarningCloseBtn');
    if (powerWarningCloseBtn && typeof setButtonLabelWithIcon === 'function' && iconGlyphs && iconGlyphs.check) {
      try {
        setButtonLabelWithIcon(powerWarningCloseBtn, resolveText('powerWarningClose') || powerWarningCloseBtn.textContent || '', iconGlyphs.check);
      } catch (error) {
        safeWarn('Unable to localize power warning close button via cineResults.', error);
      }
    }

    var batteryLifeUnit = resolveElementFromOptions(opts, 'batteryLifeUnit', 'batteryLifeUnit');
    if (batteryLifeUnit) {
      try {
        batteryLifeUnit.textContent = resolveText('batteryLifeUnit') || batteryLifeUnit.textContent || '';
      } catch (error) {
        void error;
      }
    }

    var getCurrentSetupKey = deps.getCurrentSetupKey;
    var renderFeedbackTable = deps.renderFeedbackTable;
    var feedbackSummary = null;
    if (typeof renderFeedbackTable === 'function' && typeof getCurrentSetupKey === 'function') {
      try {
        feedbackSummary = renderFeedbackTable(getCurrentSetupKey());
      } catch (error) {
        safeWarn('cineResults failed to render runtime feedback summary.', error);
        feedbackSummary = null;
      }
    }

    var batteryLifeLabel = resolveElementFromOptions(opts, 'batteryLifeLabel', 'batteryLifeLabel');
    if (batteryLifeLabel) {
      var batteryLabel = resolveText('batteryLifeLabel');
      if (!batteryLabel && typeof batteryLifeLabel.textContent === 'string') {
        batteryLabel = batteryLifeLabel.textContent;
      }
      if (feedbackSummary && feedbackSummary.count) {
        var template = resolveText('runtimeUserCountNote');
        if (template && template.indexOf('{count}') !== -1) {
          var userNote = template.replace('{count}', feedbackSummary.count);
          var closingIndex = batteryLabel.indexOf(')');
          if (closingIndex !== -1) {
            batteryLabel = batteryLabel.slice(0, closingIndex) + ', ' + userNote + batteryLabel.slice(closingIndex);
          } else if (batteryLabel) {
            batteryLabel = batteryLabel + ' (' + userNote + ')';
          } else {
            batteryLabel = userNote;
          }
        }
      }
      try {
        batteryLifeLabel.textContent = batteryLabel;
      } catch (error) {
        void error;
      }
      setHelpAttribute(batteryLifeLabel, resolveText('batteryLifeHelp'));
    }

    var runtimeAverageNote = resolveElementFromOptions(opts, 'runtimeAverageNote', 'runtimeAverageNote');
    if (runtimeAverageNote) {
      var averageNote = '';
      if (feedbackSummary && feedbackSummary.count > 4) {
        averageNote = resolveText('runtimeAverageNote');
      }
      try {
        runtimeAverageNote.textContent = averageNote;
      } catch (error) {
        void error;
      }
    }

    var lastRuntimeHours = typeof opts.lastRuntimeHours !== 'undefined' ? opts.lastRuntimeHours : (typeof GLOBAL_SCOPE.lastRuntimeHours !== 'undefined' ? GLOBAL_SCOPE.lastRuntimeHours : null);
    if (typeof deps.dispatchTemperatureNoteRender === 'function') {
      try {
        deps.dispatchTemperatureNoteRender(lastRuntimeHours);
      } catch (error) {
        safeWarn('Unable to dispatch temperature note render via cineResults.', error);
      }
    }

    var temperatureUnit = typeof opts.temperatureUnit !== 'undefined' ? opts.temperatureUnit : (typeof GLOBAL_SCOPE.temperatureUnit !== 'undefined' ? GLOBAL_SCOPE.temperatureUnit : null);

    if (typeof deps.refreshFeedbackTemperatureLabel === 'function') {
      try {
        deps.refreshFeedbackTemperatureLabel(lang, temperatureUnit);
      } catch (error) {
        safeWarn('Unable to refresh feedback temperature label via cineResults.', error);
      }
    }

    if (typeof deps.updateFeedbackTemperatureOptions === 'function') {
      try {
        deps.updateFeedbackTemperatureOptions(lang, temperatureUnit);
      } catch (error) {
        safeWarn('Unable to update feedback temperature options via cineResults.', error);
      }
    }

    var tempNote = resolveElementFromOptions(opts, 'tempNote', 'temperatureNote');
    setHelpAttribute(tempNote, resolveText('temperatureNoteHelp'));

    runtimeFeedbackState.elements.breakdownListElem = breakdownList;
    runtimeFeedbackState.elements.totalPowerLabel = totalPowerLabel;
    runtimeFeedbackState.elements.batteryCountLabel = batteryCountLabel;
    runtimeFeedbackState.elements.batteryLifeLabel = batteryLifeLabel;
    runtimeFeedbackState.elements.runtimeAverageNote = runtimeAverageNote;
    runtimeFeedbackState.elements.tempNote = tempNote;

    return true;
  }

  function localizeBatteryComparisonSection(options) {
    var opts = options || {};
    var doc = resolveDocument(opts);
    if (!doc) {
      return false;
    }

    var langTexts = opts.langTexts && typeof opts.langTexts === 'object' ? opts.langTexts : {};
    var fallbackTexts = opts.fallbackTexts && typeof opts.fallbackTexts === 'object' ? opts.fallbackTexts : {};
    var resolveText = createTextResolver(langTexts, fallbackTexts);

    var heading = resolveElementFromOptions(
      opts,
      'batteryComparisonHeading',
      'batteryComparisonHeading',
      'batteryComparisonHeading'
    );
    var description = resolveElementFromOptions(
      opts,
      'batteryComparisonDescription',
      'batteryComparisonDescription'
    );
    var table = resolveElementFromOptions(
      opts,
      'batteryComparisonTable',
      'batteryTable',
      'batteryTable'
    );

    var localized = false;

    if (heading) {
      var headingText = resolveText('batteryComparisonHeading');
      if (!headingText && typeof heading.textContent === 'string') {
        headingText = heading.textContent;
      }
      try {
        if (typeof heading.textContent === 'string') {
          heading.textContent = headingText;
        }
      } catch (error) {
        void error;
      }
      setHelpAttribute(heading, resolveText('batteryComparisonHeadingHelp'));
      localized = true;
    }

    if (description) {
      var descriptionText = resolveText('batteryComparisonDescription');
      if (!descriptionText && typeof description.textContent === 'string') {
        descriptionText = description.textContent;
      }
      try {
        if (typeof description.textContent === 'string') {
          description.textContent = descriptionText;
        }
      } catch (error) {
        void error;
      }
      setHelpAttribute(description, resolveText('batteryComparisonDescriptionHelp'));
      localized = true;
    }

    if (table) {
      setHelpAttribute(table, resolveText('batteryComparisonTableHelp'));
      localized = true;
    }

    runtimeFeedbackState.elements.batteryComparisonHeading = heading;
    runtimeFeedbackState.elements.batteryComparisonDescription = description;
    runtimeFeedbackState.elements.batteryComparisonTable = table;

    return localized;
  }

  function attachHandlerOnce(target, eventName, handlerKey, factory) {
    if (!target || !eventName || !handlerKey || typeof factory !== 'function') {
      return;
    }

    if (runtimeFeedbackState.handlers[handlerKey]) {
      return;
    }

    var handler = factory();
    if (typeof handler !== 'function') {
      return;
    }

    try {
      target.addEventListener(eventName, handler);
      runtimeFeedbackState.handlers[handlerKey] = handler;

    } catch (error) {
      safeWarn('cineResults could not attach runtime feedback handler.', error);
    }
  }

  function updateCalculations(options) {
    try {
      var opts = options || {};
      var deps = updateRuntimeDependencies(opts);
      var doc = resolveDocument(opts);

      function resolveFunctionDependency(name) {
        if (opts && typeof opts[name] === 'function') {
          return opts[name];
        }
        if (deps && typeof deps[name] === 'function') {
          return deps[name];
        }
        if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE[name] === 'function') {
          return GLOBAL_SCOPE[name];
        }
        return null;
      }

      function safeCall(fn) {
        if (typeof fn !== 'function') {
          return undefined;
        }
        try {
          return fn();
        } catch (error) {
          safeWarn('cineResults.updateCalculations dependency call failed.', error);
          return undefined;
        }
      }

      var devices = null;
      if (typeof opts.getDevices === 'function') {
        devices = safeCall(function () { return opts.getDevices(); });
      }
      if (!devices) {
        devices = safeCall(resolveFunctionDependency('getDevices'));
      }
      if (!devices && opts && typeof opts.devices === 'object') {
        devices = opts.devices;
      }
      if (!devices && GLOBAL_SCOPE && typeof GLOBAL_SCOPE.devices === 'object') {
        devices = GLOBAL_SCOPE.devices;
      }
      if (!devices || typeof devices !== 'object') {
        devices = {};
      }

      var texts = null;
      if (typeof opts.getTexts === 'function') {
        texts = safeCall(function () { return opts.getTexts(); });
      }
      if (!texts) {
        texts = safeCall(resolveFunctionDependency('getTexts'));
      }
      if (!texts && opts && typeof opts.texts === 'object') {
        texts = opts.texts;
      }
      if (!texts && GLOBAL_SCOPE && typeof GLOBAL_SCOPE.texts === 'object') {
        texts = GLOBAL_SCOPE.texts;
      }
      if (!texts || typeof texts !== 'object') {
        texts = {};
      }

      var currentLang = null;
      if (typeof opts.getCurrentLang === 'function') {
        currentLang = safeCall(function () { return opts.getCurrentLang(); });
      }
      if (!currentLang) {
        currentLang = safeCall(resolveFunctionDependency('getCurrentLang'));
      }
      if (!currentLang && typeof opts.currentLang === 'string') {
        currentLang = opts.currentLang;
      }
      if (!currentLang && typeof deps.currentLang === 'string') {
        currentLang = deps.currentLang;
      }
      if (!currentLang && typeof GLOBAL_SCOPE.currentLang === 'string') {
        currentLang = GLOBAL_SCOPE.currentLang;
      }
      if (typeof currentLang !== 'string' || !currentLang) {
        currentLang = 'en';
      }

      var collator = null;
      if (typeof opts.getCollator === 'function') {
        collator = safeCall(function () { return opts.getCollator(); });
      }
      if (!collator) {
        collator = safeCall(resolveFunctionDependency('getCollator'));
      }
      if (!collator && opts && opts.collator) {
        collator = opts.collator;
      }
      if (!collator && deps && deps.collator) {
        collator = deps.collator;
      }
      if (!collator && GLOBAL_SCOPE && GLOBAL_SCOPE.collator) {
        collator = GLOBAL_SCOPE.collator;
      }

      if (collator && deps && typeof deps === 'object') {
        deps.collator = collator;
      }

      var langTexts = texts && typeof texts === 'object' && texts[currentLang] && typeof texts[currentLang] === 'object'
        ? texts[currentLang]
        : null;
      var fallbackTexts = texts && typeof texts === 'object' && texts.en && typeof texts.en === 'object'
        ? texts.en
        : null;
      if (!langTexts) {
        langTexts = fallbackTexts || {};
      }
      if (!fallbackTexts) {
        fallbackTexts = {};
      }

      function resolveText(key) {
        if (!key) {
          return '';
        }
        var value = langTexts && Object.prototype.hasOwnProperty.call(langTexts, key)
          ? langTexts[key]
          : undefined;
        if (typeof value === 'undefined') {
          value = fallbackTexts && Object.prototype.hasOwnProperty.call(fallbackTexts, key)
            ? fallbackTexts[key]
            : undefined;
        }
        return typeof value === 'string' ? value : '';
      }

      var cameraSelect = resolveElementFromOptions(opts, 'cameraSelect', 'cameraSelect', 'cameraSelect');
      var monitorSelect = resolveElementFromOptions(opts, 'monitorSelect', 'monitorSelect', 'monitorSelect');
      var videoSelect = resolveElementFromOptions(opts, 'videoSelect', 'videoSelect', 'videoSelect');
      var distanceSelect = resolveElementFromOptions(opts, 'distanceSelect', 'distanceSelect', 'distanceSelect');
      var batterySelect = resolveElementFromOptions(opts, 'batterySelect', 'batterySelect', 'batterySelect');
      var batteryPlateSelect = resolveElementFromOptions(
        opts,
        'batteryPlateSelect',
        'batteryPlateSelect',
        'batteryPlateSelect'
      );
      var hotswapSelect = resolveElementFromOptions(opts, 'hotswapSelect', 'batteryHotswapSelect', 'hotswapSelect');

      var motorSelects = resolveSelectCollection(
        opts,
        'motorSelects',
        ['motor1Select', 'motor2Select', 'motor3Select', 'motor4Select'],
        'motorSelects'
      );
      var controllerSelects = resolveSelectCollection(
        opts,
        'controllerSelects',
        ['controller1Select', 'controller2Select', 'controller3Select', 'controller4Select'],
        'controllerSelects'
      );
      console.log('DEBUG: updateCalculations elements. cameraSelect:', !!cameraSelect, 'batterySelect:', !!batterySelect, 'motorSelects length:', motorSelects.length);

      var resultsPlainSummaryTarget = resolveElementFromOptions(
        opts,
        'resultsPlainSummaryElem',
        'resultsPlainSummary',
        'resultsPlainSummaryElem'
      );
      var resultsPlainSummaryTextTarget = resolveElementFromOptions(
        opts,
        'resultsPlainSummaryTextElem',
        'resultsPlainSummaryText',
        'resultsPlainSummaryTextElem'
      );
      var resultsPlainSummaryNoteTarget = resolveElementFromOptions(
        opts,
        'resultsPlainSummaryNoteElem',
        'resultsPlainSummaryNote',
        'resultsPlainSummaryNoteElem'
      );

      var totalPowerTarget = resolveElementFromOptions(opts, 'totalPowerElem', 'totalPower', 'totalPowerElem');
      var breakdownListTarget = resolveElementFromOptions(opts, 'breakdownListElem', 'breakdownList', 'breakdownListElem');
      var totalCurrent144Target = resolveElementFromOptions(opts, 'totalCurrent144Elem', 'totalCurrent144', 'totalCurrent144Elem');
      var totalCurrent12Target = resolveElementFromOptions(opts, 'totalCurrent12Elem', 'totalCurrent12', 'totalCurrent12Elem');
      var batteryLifeTarget = resolveElementFromOptions(opts, 'batteryLifeElem', 'batteryLife', 'batteryLifeElem');
      var batteryCountTarget = resolveElementFromOptions(opts, 'batteryCountElem', 'batteryCount', 'batteryCountElem');
      var batteryLifeLabelTarget = resolveElementFromOptions(opts, 'batteryLifeLabelElem', 'batteryLifeLabel', 'batteryLifeLabelElem');
      var runtimeAverageNoteTarget = resolveElementFromOptions(opts, 'runtimeAverageNoteElem', 'runtimeAverageNote', 'runtimeAverageNoteElem');
      var pinWarnTarget = resolveElementFromOptions(opts, 'pinWarnElem', 'pinWarning', 'pinWarnElem');
      var dtapWarnTarget = resolveElementFromOptions(opts, 'dtapWarnElem', 'dtapWarning', 'dtapWarnElem');
      var hotswapWarnTarget = resolveElementFromOptions(opts, 'hotswapWarnElem', 'hotswapWarning', 'hotswapWarnElem');
      var batteryComparisonSection = resolveElementFromOptions(opts, 'batteryComparisonSection', 'batteryComparison', 'batteryComparisonSection');
      var batteryTableElem = resolveElementFromOptions(opts, 'batteryTableElem', 'batteryTable', 'batteryTableElem');

      var setupDiagramContainer = resolveElementFromOptions(opts, 'setupDiagramContainer', 'diagramArea', 'setupDiagramContainer');
      var heroRuntimeTarget = doc && typeof doc.getElementById === 'function' ? doc.getElementById('heroRuntime') : null;
      var heroCurrent144Target = doc && typeof doc.getElementById === 'function' ? doc.getElementById('heroCurrent144') : null;
      var heroCurrent12Target = doc && typeof doc.getElementById === 'function' ? doc.getElementById('heroCurrent12') : null;
      var heroBatteryCountTarget = doc && typeof doc.getElementById === 'function' ? doc.getElementById('heroBatteryCount') : null;

      runtimeFeedbackState.elements.cameraSelect = cameraSelect;
      runtimeFeedbackState.elements.monitorSelect = monitorSelect;
      runtimeFeedbackState.elements.videoSelect = videoSelect;
      runtimeFeedbackState.elements.distanceSelect = distanceSelect;
      runtimeFeedbackState.elements.batterySelect = batterySelect;
      runtimeFeedbackState.elements.hotswapSelect = hotswapSelect;
      runtimeFeedbackState.elements.batteryPlateSelect = batteryPlateSelect;
      runtimeFeedbackState.elements.motorSelects = motorSelects;
      runtimeFeedbackState.elements.controllerSelects = controllerSelects;
      runtimeFeedbackState.elements.resultsPlainSummaryElem = resultsPlainSummaryTarget;
      runtimeFeedbackState.elements.resultsPlainSummaryTextElem = resultsPlainSummaryTextTarget;
      runtimeFeedbackState.elements.resultsPlainSummaryNoteElem = resultsPlainSummaryNoteTarget;
      runtimeFeedbackState.elements.totalPowerElem = totalPowerTarget;
      runtimeFeedbackState.elements.breakdownListElem = breakdownListTarget;
      runtimeFeedbackState.elements.totalCurrent144Elem = totalCurrent144Target;
      runtimeFeedbackState.elements.totalCurrent12Elem = totalCurrent12Target;
      runtimeFeedbackState.elements.batteryLifeElem = batteryLifeTarget;
      runtimeFeedbackState.elements.batteryCountElem = batteryCountTarget;
      runtimeFeedbackState.elements.batteryLifeLabelElem = batteryLifeLabelTarget;
      runtimeFeedbackState.elements.runtimeAverageNoteElem = runtimeAverageNoteTarget;
      runtimeFeedbackState.elements.pinWarnElem = pinWarnTarget;
      runtimeFeedbackState.elements.dtapWarnElem = dtapWarnTarget;
      runtimeFeedbackState.elements.hotswapWarnElem = hotswapWarnTarget;
      runtimeFeedbackState.elements.batteryComparisonSection = batteryComparisonSection;
      runtimeFeedbackState.elements.batteryTableElem = batteryTableElem;
      runtimeFeedbackState.elements.setupDiagramContainer = setupDiagramContainer;

      var previewSelections = opts && typeof opts.previewSelections === 'object' && opts.previewSelections
        ? opts.previewSelections
        : null;

      function normalizePreviewItem(value) {
        if (typeof value === 'string') {
          var trimmed = value.trim();
          return trimmed && trimmed !== 'None' ? trimmed : '';
        }
        if (value == null) {
          return '';
        }
        var stringified = String(value).trim();
        return stringified && stringified !== 'None' ? stringified : '';
      }

      function getPreviewValue(key) {
        if (!previewSelections || !key) {
          return '';
        }
        return normalizePreviewItem(previewSelections[key]);
      }

      function getPreviewList(key) {
        if (!previewSelections || !key) {
          return [];
        }
        var list = previewSelections[key];
        if (!Array.isArray(list)) {
          return [];
        }
        var normalized = [];
        for (var index = 0; index < list.length; index += 1) {
          var item = normalizePreviewItem(list[index]);
          if (item) {
            normalized.push(item);
          }
        }
        return normalized;
      }

      function safeSelectValue(select, previewKey) {
        var value = select && typeof select.value === 'string' ? select.value : '';
        if (value && value !== 'None') {
          return value;
        }
        var previewValue = getPreviewValue(previewKey);
        if (previewValue) {
          return previewValue;
        }
        return value;
      }

      function getSelectedOptionLabel(select) {
        if (!select || typeof select.selectedIndex !== 'number') {
          return '';
        }
        var options = select.options;
        if (!options || select.selectedIndex < 0 || select.selectedIndex >= options.length) {
          return '';
        }
        var option = options[select.selectedIndex];
        if (!option || typeof option.textContent !== 'string') {
          return '';
        }
        return option.textContent.trim();
      }

      var camera = safeSelectValue(cameraSelect, 'camera');
      var monitor = safeSelectValue(monitorSelect, 'monitor');
      var video = safeSelectValue(videoSelect, 'video');
      var distance = safeSelectValue(distanceSelect, 'distance');
      var battery = safeSelectValue(batterySelect, 'battery');
      var batteryLabelText = getSelectedOptionLabel(batterySelect);

      var motors = motorSelects.map(function mapMotor(select) {
        return safeSelectValue(select);
      });
      var controllers = controllerSelects.map(function mapController(select) {
        return safeSelectValue(select);
      });

      var previewMotors = getPreviewList('motors');
      if (previewMotors.length) {
        var hasMotorSelection = motors.some(function hasMotor(value) {
          return value && value !== 'None';
        });
        if (!hasMotorSelection) {
          motors = previewMotors.slice();
        }
      }

      var previewControllers = getPreviewList('controllers');
      if (previewControllers.length) {
        var hasControllerSelection = controllers.some(function hasController(value) {
          return value && value !== 'None';
        });
        if (!hasControllerSelection) {
          controllers = previewControllers.slice();
        }
      }

      if ((!batteryLabelText || !batteryLabelText.trim())) {
        var previewBatteryLabel = getPreviewValue('batteryLabel') || getPreviewValue('battery');
        if (previewBatteryLabel) {
          batteryLabelText = previewBatteryLabel;
        }
      }

      var cameraDevices = devices && typeof devices.cameras === 'object' && devices.cameras ? devices.cameras : {};
      updateRuntimeFeedbackCameraOptionLists(cameraDevices, camera);

      var monitorDevices = devices && typeof devices.monitors === 'object' && devices.monitors ? devices.monitors : {};
      var videoDevices = devices && typeof devices.video === 'object' && devices.video ? devices.video : {};
      var fizDevices = devices && typeof devices.fiz === 'object' && devices.fiz ? devices.fiz : {};
      var motorDevices = fizDevices && typeof fizDevices.motors === 'object' ? fizDevices.motors : {};
      var controllerDevices = fizDevices && typeof fizDevices.controllers === 'object' ? fizDevices.controllers : {};
      var distanceDevices = fizDevices && typeof fizDevices.distance === 'object' ? fizDevices.distance : {};

      function resolvePowerDraw(data) {
        if (typeof data === 'number' && Number.isFinite(data)) {
          return data;
        }
        if (data && typeof data === 'object' && typeof data.powerDrawWatts === 'number') {
          return data.powerDrawWatts || 0;
        }
        if (typeof data === 'string') {
          var numeric = Number(data);
          return Number.isFinite(numeric) ? numeric : 0;
        }
        return 0;
      }

      var cameraW = resolvePowerDraw(cameraDevices[camera]);
      var monitorW = resolvePowerDraw(monitorDevices[monitor]);
      var videoW = resolvePowerDraw(videoDevices[video]);
      var motorsW = 0;
      for (var motorIndex = 0; motorIndex < motors.length; motorIndex += 1) {
        motorsW += resolvePowerDraw(motorDevices[motors[motorIndex]]);
      }
      var controllersW = 0;
      for (var controllerIndex = 0; controllerIndex < controllers.length; controllerIndex += 1) {
        controllersW += resolvePowerDraw(controllerDevices[controllers[controllerIndex]]);
      }
      var distanceW = resolvePowerDraw(distanceDevices[distance]);

      var totalWatt = cameraW + monitorW + videoW + motorsW + controllersW + distanceW;

      if (totalPowerTarget && typeof totalPowerTarget.textContent !== 'undefined') {
        try {
          totalPowerTarget.textContent = totalWatt.toFixed(1);
        } catch (error) {
          void error;
        }
      }

      var segments = [
        { power: cameraW, className: 'camera', label: resolveText('cameraLabel') },
        { power: monitorW, className: 'monitor', label: resolveText('monitorLabel') },
        { power: videoW, className: 'video', label: resolveText('videoLabel') },
        { power: motorsW, className: 'motors', label: resolveText('fizMotorsLabel') },
        { power: controllersW, className: 'controllers', label: resolveText('fizControllersLabel') },
        { power: distanceW, className: 'distance', label: resolveText('distanceLabel') }
      ].filter(function filterSegments(segment) {
        return segment.power > 0;
      });

      var escapeHtmlFn = resolveFunctionDependency('escapeHtml');
      if (!escapeHtmlFn) {
        escapeHtmlFn = function escapeHtmlFallback(value) {
          var text = value == null ? '' : String(value);
          return text.replace(/[&<>"']/g, function replaceChar(ch) {
            switch (ch) {
              case '&':
                return '&amp;';
              case '<':
                return '&lt;';
              case '>':
                return '&gt;';
              case '"':
                return '&quot;';
              case '\'':
                return '&#39;';
              default:
                return ch;
            }
          });
        };
      }

      function resetBreakdownList(target) {
        if (!target) {
          return;
        }
        if (typeof target.innerHTML === 'string') {
          try {
            target.innerHTML = '';
            return;
          } catch (error) {
            void error;
          }
        }
        if (typeof target.replaceChildren === 'function') {
          try {
            target.replaceChildren();
            return;
          } catch (error) {
            void error;
          }
        }
        if (target.childNodes && target.childNodes.length) {
          try {
            while (target.firstChild) {
              target.removeChild(target.firstChild);
            }
          } catch (error) {
            void error;
          }
        }
      }

      function appendBreakdownEntry(target, label, value) {
        if (!target || !label || !(value > 0)) {
          return;
        }
        var text = '<strong>' + escapeHtmlFn(label) + '</strong> ' + value.toFixed(1) + ' W';
        if (typeof target.insertAdjacentHTML === 'function') {
          try {
            target.insertAdjacentHTML('beforeend', '<li>' + text + '</li>');
            return;
          } catch (error) {
            void error;
          }
        }
        if (doc && typeof doc.createElement === 'function' && typeof target.appendChild === 'function') {
          try {
            var li = doc.createElement('li');
            li.innerHTML = text;
            target.appendChild(li);
            return;
          } catch (error) {
            void error;
          }
        }
        if (typeof target.innerHTML === 'string') {
          try {
            target.innerHTML += '<li>' + text + '</li>';
          } catch (error) {
            void error;
          }
        }
      }

      if (breakdownListTarget) {
        resetBreakdownList(breakdownListTarget);
        appendBreakdownEntry(breakdownListTarget, resolveText('cameraLabel'), cameraW);
        appendBreakdownEntry(breakdownListTarget, resolveText('monitorLabel'), monitorW);
        appendBreakdownEntry(breakdownListTarget, resolveText('videoLabel'), videoW);
        appendBreakdownEntry(breakdownListTarget, resolveText('fizMotorsLabel'), motorsW);
        appendBreakdownEntry(breakdownListTarget, resolveText('fizControllersLabel'), controllersW);
        appendBreakdownEntry(breakdownListTarget, resolveText('distanceLabel'), distanceW);
      }

      var getSelectedPlateFn = resolveFunctionDependency('getSelectedPlate');
      var selectedPlate = '';
      if (typeof getSelectedPlateFn === 'function') {
        var plateResult = safeCall(getSelectedPlateFn);
        if (typeof plateResult === 'string') {
          selectedPlate = plateResult;
        }
      }

      if (!selectedPlate) {
        selectedPlate = getPreviewValue('plate') || getPreviewValue('batteryPlate') || '';
      }

      var getMountVoltageConfigFn = resolveFunctionDependency('getMountVoltageConfig');
      var mountVoltages = {};
      if (typeof getMountVoltageConfigFn === 'function') {
        var voltagesResult;
        try {
          voltagesResult = getMountVoltageConfigFn(selectedPlate);
        } catch (error) {
          safeWarn('cineResults.updateCalculations could not determine mount voltage configuration.', error);
          voltagesResult = null;
        }
        if (voltagesResult && typeof voltagesResult === 'object') {
          mountVoltages = voltagesResult;
        }
      }

      var bMountCam = selectedPlate === 'B-Mount';
      var highV = Number.isFinite(mountVoltages.high) ? mountVoltages.high : (bMountCam ? 33.6 : 14.4);
      var lowV = Number.isFinite(mountVoltages.low) ? mountVoltages.low : (bMountCam ? 21.6 : 12.0);

      var totalCurrentHigh = totalWatt > 0 ? totalWatt / highV : 0;
      var totalCurrentLow = totalWatt > 0 ? totalWatt / lowV : 0;

      var refreshTotalCurrentLabelsFn = resolveFunctionDependency('refreshTotalCurrentLabels');
      if (refreshTotalCurrentLabelsFn) {
        try {
          refreshTotalCurrentLabelsFn(currentLang, selectedPlate, mountVoltages);
        } catch (error) {
          safeWarn('cineResults.updateCalculations could not refresh total current labels.', error);
        }
      }

      if (totalCurrent144Target && typeof totalCurrent144Target.textContent !== 'undefined') {
        try {
          totalCurrent144Target.textContent = totalCurrentHigh.toFixed(2);
        } catch (error) {
          void error;
        }
      }
      if (totalCurrent12Target && typeof totalCurrent12Target.textContent !== 'undefined') {
        try {
          totalCurrent12Target.textContent = totalCurrentLow.toFixed(2);
        } catch (error) {
          void error;
        }
      }

      var updateBatteryOptionsFn = resolveFunctionDependency('updateBatteryOptions');
      if (updateBatteryOptionsFn) {
        try {
          updateBatteryOptionsFn();
        } catch (error) {
          safeWarn('cineResults.updateCalculations could not refresh battery options.', error);
        }
      }

      battery = safeSelectValue(batterySelect, 'battery');

      var setStatusMessageFn = resolveFunctionDependency('setStatusMessage');
      if (!setStatusMessageFn) {
        setStatusMessageFn = function fallbackSetStatusMessage(element, message) {
          if (!element) {
            return;
          }
          try {
            element.textContent = message || '';
          } catch (error) {
            void error;
          }
        };
      }

      var setStatusLevelFn = resolveFunctionDependency('setStatusLevel');
      if (!setStatusLevelFn) {
        setStatusLevelFn = function fallbackSetStatusLevel(element, level) {
          if (!element) {
            return;
          }
          var value = level || '';
          if (typeof element.setAttribute === 'function') {
            try {
              element.setAttribute('data-status', value);
              return;
            } catch (error) {
              void error;
            }
          }
          element.dataStatus = value;
        };
      }

      var closePowerWarningDialogFn = resolveFunctionDependency('closePowerWarningDialog');
      var showPowerWarningDialogFn = resolveFunctionDependency('showPowerWarningDialog');
      var drawPowerDiagramFn = resolveFunctionDependency('drawPowerDiagram');
      var renderFeedbackTableFn = resolveFunctionDependency('renderFeedbackTable');
      var getCurrentSetupKeyFn = resolveFunctionDependency('getCurrentSetupKey');
      var renderTemperatureNoteFn = resolveFunctionDependency('renderTemperatureNote');
      var checkFizCompatibilityFn = resolveFunctionDependency('checkFizCompatibility');
      var checkFizControllerFn = resolveFunctionDependency('checkFizController');
      var checkArriCompatibilityFn = resolveFunctionDependency('checkArriCompatibility');
      var renderSetupDiagramFn = resolveFunctionDependency('renderSetupDiagram');
      var supportsBMountCameraFn = resolveFunctionDependency('supportsBMountCamera');
      var supportsGoldMountCameraFn = resolveFunctionDependency('supportsGoldMountCamera');
      var getCssVariableValueFn = resolveFunctionDependency('getCssVariableValue');
      if (!getCssVariableValueFn) {
        getCssVariableValueFn = function fallbackGetCssVariableValue(name, fallbackValue) {
          void name;
          return typeof fallbackValue === 'string' ? fallbackValue : '';
        };
      }

      var getLastRuntimeHoursFn = resolveFunctionDependency('getLastRuntimeHours');
      if (!getLastRuntimeHoursFn) {
        getLastRuntimeHoursFn = function fallbackGetLastRuntimeHours() {
          if (typeof GLOBAL_SCOPE.lastRuntimeHours !== 'undefined') {
            return GLOBAL_SCOPE.lastRuntimeHours;
          }
          return null;
        };
      }

      var setLastRuntimeHoursFn = resolveFunctionDependency('setLastRuntimeHours');
      if (!setLastRuntimeHoursFn) {
        setLastRuntimeHoursFn = function fallbackSetLastRuntimeHours(value) {
          try {
            GLOBAL_SCOPE.lastRuntimeHours = value;
          } catch (error) {
            void error;
          }
        };
      }

      var hours = null;
      var runtimeHoursValue = null;
      var batteriesNeeded = null;
      var batteriesNeededValue = null;

      if (!battery || !devices.batteries || !devices.batteries[battery]) {
        if (batteryLifeTarget && typeof batteryLifeTarget.textContent !== 'undefined') {
          try {
            batteryLifeTarget.textContent = '–';
          } catch (error) {
            void error;
          }
        }
        if (heroRuntimeTarget) {
          heroRuntimeTarget.textContent = '–';
        }
        if (batteryCountTarget && typeof batteryCountTarget.textContent !== 'undefined') {
          try {
            batteryCountTarget.textContent = '–';
          } catch (error) {
            void error;
          }
        }
        setStatusMessageFn(pinWarnTarget, '');
        setStatusLevelFn(pinWarnTarget, null);
        setStatusMessageFn(dtapWarnTarget, '');
        setStatusLevelFn(dtapWarnTarget, null);
        if (hotswapWarnTarget) {
          setStatusMessageFn(hotswapWarnTarget, '');
          setStatusLevelFn(hotswapWarnTarget, null);
        }
        if (closePowerWarningDialogFn) {
          try {
            closePowerWarningDialogFn();
          } catch (error) {
            safeWarn('cineResults.updateCalculations could not close power warning dialog.', error);
          }
        }
        setLastRuntimeHoursFn(null);
        runtimeHoursValue = null;
        batteriesNeeded = null;
        batteriesNeededValue = null;
        if (drawPowerDiagramFn) {
          try {
            drawPowerDiagramFn(0, segments, 0);
          } catch (error) {
            safeWarn('cineResults.updateCalculations could not draw power diagram.', error);
          }
        }
      } else {
        var batteryData = devices.batteries[battery];
        var hsName = safeSelectValue(hotswapSelect, 'hotswap');
        var hotswapData = devices.batteryHotswaps && devices.batteryHotswaps[hsName] ? devices.batteryHotswaps[hsName] : null;
        var capacityWh = (batteryData && typeof batteryData.capacity === 'number' ? batteryData.capacity : 0)
          + (hotswapData && typeof hotswapData.capacity === 'number' ? hotswapData.capacity : 0);
        var maxPinA = coerceCurrentLimit(batteryData && batteryData.pinA);
        var maxDtapA = coerceCurrentLimit(batteryData && batteryData.dtapA);
        var hasPinLimit = Number.isFinite(maxPinA) && maxPinA > 0;
        var hasDtapRating = Number.isFinite(maxDtapA) && maxDtapA > 0;
        var hotswapPinLimit = coerceCurrentLimit(hotswapData && hotswapData.pinA);
        if (Number.isFinite(hotswapPinLimit)) {
          if (!hasPinLimit || hotswapPinLimit < maxPinA) {
            var hotswapMessage = resolveText('warnHotswapLower')
              .replace('{max}', String(hotswapPinLimit))
              .replace('{batt}', hasPinLimit ? String(maxPinA) : '?');
            setStatusMessageFn(hotswapWarnTarget, hotswapMessage);
            setStatusLevelFn(hotswapWarnTarget, 'warning');
          } else {
            setStatusMessageFn(hotswapWarnTarget, '');
            setStatusLevelFn(hotswapWarnTarget, null);
          }
          maxPinA = hotswapPinLimit;
          hasPinLimit = Number.isFinite(maxPinA) && maxPinA > 0;
        } else if (hotswapWarnTarget) {
          setStatusMessageFn(hotswapWarnTarget, '');
          setStatusLevelFn(hotswapWarnTarget, null);
        }
        var availableWatt = hasPinLimit ? maxPinA * lowV : 0;
        if (drawPowerDiagramFn) {
          try {
            drawPowerDiagramFn(availableWatt, segments, hasPinLimit ? maxPinA : null);
          } catch (error) {
            safeWarn('cineResults.updateCalculations could not draw power diagram.', error);
          }
        }
        if (totalCurrent144Target && typeof totalCurrent144Target.textContent !== 'undefined') {
          try {
            totalCurrent144Target.textContent = totalCurrentHigh.toFixed(2);
          } catch (error) {
            void error;
          }
        }
        if (heroCurrent144Target) {
          heroCurrent144Target.textContent = `${totalCurrentHigh.toFixed(2)} A`;
        }
        if (totalCurrent12Target && typeof totalCurrent12Target.textContent !== 'undefined') {
          try {
            totalCurrent12Target.textContent = totalCurrentLow.toFixed(2);
          } catch (error) {
            void error;
          }
        }
        if (heroCurrent12Target) {
          heroCurrent12Target.textContent = `${totalCurrentLow.toFixed(2)} A`;
        }
        if (totalWatt === 0) {
          hours = Infinity;
          if (batteryLifeTarget && typeof batteryLifeTarget.textContent !== 'undefined') {
            try {
              batteryLifeTarget.textContent = '∞';
            } catch (error) {
              void error;
            }
          }
          if (heroRuntimeTarget) {
            heroRuntimeTarget.textContent = '∞';
          }
        } else {
          hours = capacityWh / totalWatt;
          if (batteryLifeTarget && typeof batteryLifeTarget.textContent !== 'undefined') {
            try {
              batteryLifeTarget.textContent = hours.toFixed(2);
            } catch (error) {
              void error;
            }
          }
          if (heroRuntimeTarget) {
            var h = Math.floor(hours);
            var m = Math.round((hours - h) * 60);
            heroRuntimeTarget.textContent = `${h}h ${m} m`;
          }
        }
        setLastRuntimeHoursFn(hours);
        runtimeHoursValue = hours;
        batteriesNeeded = 1;
        if (Number.isFinite(hours) && hours > 0) {
          batteriesNeeded = Math.max(1, Math.ceil(10 / hours));
        }
        batteriesNeededValue = batteriesNeeded;
        if (batteryCountTarget && typeof batteryCountTarget.textContent !== 'undefined') {
          try {
            batteryCountTarget.textContent = String(batteriesNeeded);
          } catch (error) {
            void error;
          }
        }
        if (heroBatteryCountTarget) {
          heroBatteryCountTarget.textContent = String(batteriesNeeded);
        }
      }

      setStatusMessageFn(pinWarnTarget, '');
      setStatusMessageFn(dtapWarnTarget, '');
      var pinSeverity = '';
      var dtapSeverity = '';
      if (hasPinLimit && totalCurrentLow > maxPinA) {
        var pinExceeded = resolveText('warnPinExceeded')
          .replace('{current}', totalCurrentLow.toFixed(2))
          .replace('{max}', String(maxPinA));
        setStatusMessageFn(pinWarnTarget, pinExceeded);
        pinSeverity = 'danger';
      } else if (hasPinLimit && totalCurrentLow > maxPinA * 0.8) {
        var pinNear = resolveText('warnPinNear')
          .replace('{current}', totalCurrentLow.toFixed(2))
          .replace('{max}', String(maxPinA));
        setStatusMessageFn(pinWarnTarget, pinNear);
        pinSeverity = 'note';
      }
      if (!bMountCam) {
        if (hasDtapRating && totalCurrentLow > maxDtapA) {
          var dtapExceeded = resolveText('warnDTapExceeded')
            .replace('{current}', totalCurrentLow.toFixed(2))
            .replace('{max}', String(maxDtapA));
          setStatusMessageFn(dtapWarnTarget, dtapExceeded);
          dtapSeverity = 'danger';
        } else if (hasDtapRating && totalCurrentLow > maxDtapA * 0.8) {
          var dtapNear = resolveText('warnDTapNear')
            .replace('{current}', totalCurrentLow.toFixed(2))
            .replace('{max}', String(maxDtapA));
          setStatusMessageFn(dtapWarnTarget, dtapNear);
          dtapSeverity = 'note';
        }
      }
      var pinsInsufficient = hasPinLimit && totalCurrentLow > maxPinA;
      var dtapAllowed = !bMountCam && hasDtapRating;
      var dtapInsufficient = !dtapAllowed || (hasDtapRating && totalCurrentLow > maxDtapA);
      var batteryValue = typeof battery === 'string' ? battery.trim() : '';
      var hasBatterySelection =
        batteryValue !== '' && batteryValue.toLowerCase() !== 'none';
      if (totalCurrentLow > 0 && pinsInsufficient && dtapInsufficient && hasBatterySelection) {
        var option = batterySelect && batterySelect.options ? batterySelect.options[batterySelect.selectedIndex] : null;
        var labelText = option && typeof option.textContent === 'string' ? option.textContent.trim() : (battery || '');
        if (showPowerWarningDialogFn) {
          try {
            showPowerWarningDialogFn({
              batteryName: labelText,
              current: totalCurrentLow,
              hasPinLimit: hasPinLimit,
              pinLimit: hasPinLimit ? maxPinA : null,
              hasDtapRating: hasDtapRating,
              dtapLimit: hasDtapRating ? maxDtapA : null,
              dtapAllowed: dtapAllowed,
            });
          } catch (error) {
            safeWarn('cineResults.updateCalculations could not show power warning dialog.', error);
          }
        }
      } else if (closePowerWarningDialogFn) {
        try {
          closePowerWarningDialogFn();
        } catch (error) {
          safeWarn('cineResults.updateCalculations could not close power warning dialog.', error);
        }
      }
      if (hasPinLimit && pinWarnTarget && pinWarnTarget.textContent === '') {
        var pinOk = resolveText('pinOk').replace('{max}', String(maxPinA));
        setStatusMessageFn(pinWarnTarget, pinOk);
        setStatusLevelFn(pinWarnTarget, 'success');
      } else if (hasPinLimit) {
        setStatusLevelFn(pinWarnTarget, pinSeverity || 'warning');
      } else {
        setStatusLevelFn(pinWarnTarget, null);
      }
      if (!bMountCam) {
        if (hasDtapRating && dtapWarnTarget && dtapWarnTarget.textContent === '') {
          var dtapOk = resolveText('dtapOk').replace('{max}', String(maxDtapA));
          setStatusMessageFn(dtapWarnTarget, dtapOk);
          setStatusLevelFn(dtapWarnTarget, 'success');
        } else {
          setStatusLevelFn(dtapWarnTarget, dtapSeverity || 'warning');
        }
      } else {
        setStatusMessageFn(dtapWarnTarget, '');
        setStatusLevelFn(dtapWarnTarget, null);
      }

      var outputsSummaryText = buildPowerOutputSummaryText(resolveText, {
        current: totalCurrentLow,
        pinLimit: maxPinA,
        dtapLimit: maxDtapA,
        hasDtapRating: hasDtapRating,
        dtapAllowed: dtapAllowed,
        bMountCam: bMountCam,
      });
      if (resultsPlainSummaryNoteTarget) {
        try {
          resultsPlainSummaryNoteTarget.textContent = outputsSummaryText;
        } catch (error) {
          void error;
        }
      }


      if (typeof batteryComparisonSection !== 'undefined' && batteryComparisonSection && batteryComparisonSection.style) {
        batteryComparisonSection.style.display = totalWatt > 0 ? 'block' : 'none';
      }

      if (batteryTableElem && totalWatt > 0 && devices.batteries) {
        var batteryDevices = devices.batteries;
        var selectedBatteryName = safeSelectValue(batterySelect, 'battery');
        var camName = safeSelectValue(cameraSelect, 'camera');
        var plateFilter = selectedPlate;
        var supportsB = supportsBMountCameraFn ? !!supportsBMountCameraFn(camName) : false;
        var supportsGold = supportsGoldMountCameraFn ? !!supportsGoldMountCameraFn(camName) : false;
        var selectedCandidate = null;
        if (selectedBatteryName && selectedBatteryName !== 'None' && batteryDevices[selectedBatteryName]) {
          var selData = batteryDevices[selectedBatteryName];
          var matchesPlate = !plateFilter || selData.mount_type === plateFilter;
          var matchesBMount = supportsB || selData.mount_type !== 'B-Mount';
          var matchesGoldMount = supportsGold || selData.mount_type !== 'Gold-Mount';
          if (matchesPlate && matchesBMount && matchesGoldMount) {
            var selPinLimit = coerceCurrentLimit(selData.pinA);
            var selDtapLimit = coerceCurrentLimit(selData.dtapA);
            var pinOKSel = Number.isFinite(selPinLimit) && selPinLimit > 0 ? totalCurrentLow <= selPinLimit : false;
            var dtapOKSel = !bMountCam && Number.isFinite(selDtapLimit) && selDtapLimit > 0
              ? totalCurrentLow <= selDtapLimit
              : false;
            if (pinOKSel || dtapOKSel) {
              var selHours = totalWatt === 0 ? Infinity : selData.capacity / totalWatt;
              var selMethod;
              if (pinOKSel && dtapOKSel) {
                selMethod = 'both pins and D-Tap';
              } else if (pinOKSel) {
                selMethod = 'pins';
              } else {
                selMethod = 'dtap';
              }
              selectedCandidate = { name: selectedBatteryName, hours: selHours, method: selMethod };
            }
          }
        }

        var pinsCandidates = [];
        var dtapCandidates = [];
        var nameCollator = getLocaleAwareCollator(collator, currentLang);

        for (var batteryName in batteryDevices) {
          if (!Object.prototype.hasOwnProperty.call(batteryDevices, batteryName)) {
            continue;
          }
          if (batteryName === 'None') {
            continue;
          }
          if (selectedCandidate && batteryName === selectedCandidate.name) {
            continue;
          }
          var batteryInfo = batteryDevices[batteryName];
          if (plateFilter && batteryInfo.mount_type !== plateFilter) {
            continue;
          }
          if (!plateFilter && !supportsB && batteryInfo.mount_type === 'B-Mount') {
            continue;
          }
          if (!plateFilter && !supportsGold && batteryInfo.mount_type === 'Gold-Mount') {
            continue;
          }
          var pinLimit = coerceCurrentLimit(batteryInfo.pinA);
          var dtapLimit = coerceCurrentLimit(batteryInfo.dtapA);
          var canPin = Number.isFinite(pinLimit) && pinLimit > 0 ? totalCurrentLow <= pinLimit : false;
          var canDtap = !bMountCam && Number.isFinite(dtapLimit) && dtapLimit > 0
            ? totalCurrentLow <= dtapLimit
            : false;
          if (canPin) {
            var hoursPin = batteryInfo.capacity / totalWatt;
            var methodPin = canDtap ? 'both pins and D-Tap' : 'pins';
            pinsCandidates.push({ name: batteryName, hours: hoursPin, method: methodPin });
          } else if (canDtap) {
            var hoursDtap = batteryInfo.capacity / totalWatt;
            dtapCandidates.push({ name: batteryName, hours: hoursDtap, method: 'dtap' });
          }
        }

        function sortByHoursThenName(a, b) {
          var diff = b.hours - a.hours;
          return diff !== 0 ? diff : nameCollator.compare(a.name, b.name);
        }

        pinsCandidates.sort(sortByHoursThenName);
        dtapCandidates.sort(sortByHoursThenName);

        var batteryHeaderHelp = resolveText('batteryTableBatteryHelp');
        var runtimeHeaderHelp = resolveText('batteryTableRuntimeHelp');
        var graphHeaderHelp = resolveText('batteryTableGraphHelp');
        var graphHeaderLabel = resolveText('batteryTableGraphLabel');
        var batteryTableLabel = resolveText('batteryTableLabel');
        var runtimeLabel = resolveText('runtimeLabel');
        var noBatterySupports = resolveText('noBatterySupports');

        var batteryHelpAttr = batteryHeaderHelp ? ' data-help="' + escapeHtmlFn(batteryHeaderHelp) + '"' : '';
        var runtimeHelpAttr = runtimeHeaderHelp ? ' data-help="' + escapeHtmlFn(runtimeHeaderHelp) + '"' : '';
        var graphHelpAttr = graphHeaderHelp ? ' data-help="' + escapeHtmlFn(graphHeaderHelp) + '"' : '';
        var graphAriaAttr = graphHeaderLabel ? ' aria-label="' + escapeHtmlFn(graphHeaderLabel) + '"' : '';
        var graphHeaderContent = graphHeaderLabel
          ? '<span class="visually-hidden">' + escapeHtmlFn(graphHeaderLabel) + '</span>'
          : '';

        var tableHtml = '<tr>' +
          '<th' + batteryHelpAttr + '>' + escapeHtmlFn(batteryTableLabel) + '</th>' +
          '<th' + runtimeHelpAttr + '>' + escapeHtmlFn(runtimeLabel) + '</th>' +
          '<th' + graphHelpAttr + graphAriaAttr + '>' + graphHeaderContent + '</th>' +
          '</tr>';

        var allCandidatesForMax = [];
        if (selectedCandidate) {
          allCandidatesForMax.push(selectedCandidate);
        }
        Array.prototype.push.apply(allCandidatesForMax, pinsCandidates);
        Array.prototype.push.apply(allCandidatesForMax, dtapCandidates);
        var maxHours = 1;
        if (allCandidatesForMax.length) {
          var maxCandidateHours = allCandidatesForMax.map(function getHours(candidate) { return candidate.hours; });
          var computedMax = Math.max.apply(Math, maxCandidateHours);
          maxHours = Number.isFinite(computedMax) && computedMax > 0 ? computedMax : 1;
        }

        function getBarClass(method) {
          return method === 'pins' ? 'bar bar-pins-only' : 'bar';
        }

        function getMethodLabel(method) {
          var colorMap = {
            pins: { var: '--warning-color', fallback: '#FF9800', text: resolveText('methodPinsOnly') },
            'both pins and D-Tap': { var: '--success-color', fallback: '#4CAF50', text: resolveText('methodPinsAndDTap') },
            infinite: { var: '--info-color', fallback: '#007bff', text: resolveText('methodInfinite') }
          };
          var entry = colorMap[method];
          if (entry) {
            var colorValue = getCssVariableValueFn(entry.var, entry.fallback);
            return '<span style="color:' + escapeHtmlFn(colorValue) + ';">' + escapeHtmlFn(entry.text) + '</span>';
          }
          return escapeHtmlFn(method);
        }

        function addCandidateRow(candidate, cssClass) {
          var methodLabel = getMethodLabel(candidate.method);
          var width = maxHours > 0 ? (candidate.hours / maxHours) * 100 : 0;
          tableHtml += '<tr' + (cssClass ? ' class="' + cssClass + '"' : '') + '>' +
            '<td>' + escapeHtmlFn(candidate.name) + '</td>' +
            '<td>' + candidate.hours.toFixed(2) + 'h (' + methodLabel + ')</td>' +
            '<td><div class="barContainer"><div class="' + getBarClass(candidate.method) + '" style="width: ' + width + '%;"></div></div></td>' +
            '</tr>';
        }

        if ((selectedCandidate ? 1 : 0) + pinsCandidates.length + dtapCandidates.length === 0) {
          tableHtml += '<tr><td colspan="3">' + escapeHtmlFn(noBatterySupports) + '</td></tr>';
        } else {
          if (selectedCandidate) {
            addCandidateRow(selectedCandidate, 'selectedBatteryRow');
          }
          for (var pinIndex = 0; pinIndex < pinsCandidates.length; pinIndex += 1) {
            var pinCandidate = pinsCandidates[pinIndex];
            if (selectedCandidate && pinCandidate.name === selectedCandidate.name) {
              continue;
            }
            addCandidateRow(pinCandidate);
          }
          for (var dtapIndex = 0; dtapIndex < dtapCandidates.length; dtapIndex += 1) {
            var dtapCandidate = dtapCandidates[dtapIndex];
            if (selectedCandidate && dtapCandidate.name === selectedCandidate.name) {
              continue;
            }
            var alreadyInPins = pinsCandidates.some(function candidateMatches(pinCandidate) {
              return pinCandidate.name === dtapCandidate.name;
            });
            if (!alreadyInPins) {
              addCandidateRow(dtapCandidate);
            }
          }
        }

        try {
          batteryTableElem.innerHTML = tableHtml;
        } catch (error) {
          safeWarn('cineResults.updateCalculations could not render battery comparison table.', error);
        }
        var tableHelpText = resolveText('batteryComparisonTableHelp');
        if (tableHelpText) {
          try {
            batteryTableElem.setAttribute('data-help', tableHelpText);
          } catch (error) {
            void error;
          }
        }
      } else if (batteryComparisonSection && batteryComparisonSection.style) {
        batteryComparisonSection.style.display = 'none';
      }

      var feedback = null;
      if (renderFeedbackTableFn && getCurrentSetupKeyFn) {
        try {
          feedback = renderFeedbackTableFn(getCurrentSetupKeyFn());
        } catch (error) {
          safeWarn('cineResults.updateCalculations could not render runtime feedback table.', error);
          feedback = null;
        }
      }

      if (feedback !== null) {
        var combinedRuntime = feedback.runtime;
        if (Number.isFinite(hours)) {
          combinedRuntime = (feedback.runtime * feedback.weight + hours) / (feedback.weight + 1);
        }
        if (batteryLifeTarget && typeof batteryLifeTarget.textContent !== 'undefined') {
          try {
            batteryLifeTarget.textContent = combinedRuntime.toFixed(2);
          } catch (error) {
            void error;
          }
        }
        setLastRuntimeHoursFn(combinedRuntime);
        runtimeHoursValue = combinedRuntime;
        if (batteryLifeLabelTarget) {
          var label = resolveText('batteryLifeLabel');
          var runtimeUserCountNote = resolveText('runtimeUserCountNote');
          if (runtimeUserCountNote.indexOf('{count}') !== -1) {
            var userNote = runtimeUserCountNote.replace('{count}', feedback.count);
            var closingIndex = label.indexOf(')');
            if (closingIndex !== -1) {
              label = label.slice(0, closingIndex) + ', ' + userNote + label.slice(closingIndex);
            } else if (label) {
              label = label + ' (' + userNote + ')';
            } else {
              label = userNote;
            }
          }
          try {
            batteryLifeLabelTarget.textContent = label;
            batteryLifeLabelTarget.setAttribute('data-help', resolveText('batteryLifeHelp'));
          } catch (error) {
            void error;
          }
        }
        if (runtimeAverageNoteTarget) {
          var averageNote = feedback.count > 4 ? resolveText('runtimeAverageNote') : '';
          try {
            runtimeAverageNoteTarget.textContent = averageNote;
          } catch (error) {
            void error;
          }
        }
        var batteriesNeededFeedback = 1;
        if (Number.isFinite(combinedRuntime) && combinedRuntime > 0) {
          batteriesNeededFeedback = Math.max(1, Math.ceil(10 / combinedRuntime));
        }
        batteriesNeeded = batteriesNeededFeedback;
        batteriesNeededValue = batteriesNeededFeedback;
        if (batteryCountTarget && typeof batteryCountTarget.textContent !== 'undefined') {
          try {
            batteryCountTarget.textContent = String(batteriesNeededFeedback);
          } catch (error) {
            void error;
          }
        }
      } else {
        if (batteryLifeLabelTarget) {
          try {
            batteryLifeLabelTarget.textContent = resolveText('batteryLifeLabel');
            batteryLifeLabelTarget.setAttribute('data-help', resolveText('batteryLifeHelp'));
          } catch (error) {
            void error;
          }
        }
        if (runtimeAverageNoteTarget) {
          try {
            runtimeAverageNoteTarget.textContent = '';
          } catch (error) {
            void error;
          }
        }
      }

      if (resultsPlainSummaryTextTarget) {
        var summaryPrompt = resolveText('resultsPlainSummaryPrompt') || '';
        var summaryTextValue = buildPlainSummaryText({
          summaryPrompt: summaryPrompt,
          needBatterySummary: resolveText('resultsPlainSummaryNeedBattery'),
          runtimeSummaryTemplate: resolveText('resultsPlainSummaryRuntime'),
          unlimitedSummaryTemplate: resolveText('resultsPlainSummaryUnlimited'),
          unnamedBatteryLabel: resolveText('resultsPlainSummaryUnnamedBattery'),
          batteryLabelText: batteryLabelText,
          battery: battery,
          totalWatt: totalWatt,
          runtimeHoursValue: runtimeHoursValue,
          batteriesNeededValue: batteriesNeededValue
        });
        if (!summaryTextValue) {
          summaryTextValue = summaryPrompt;
        }
        try {
          resultsPlainSummaryTextTarget.textContent = summaryTextValue;
        } catch (error) {
          void error;
        }
      }

      if (renderTemperatureNoteFn) {
        try {
          renderTemperatureNoteFn(getLastRuntimeHoursFn());
        } catch (error) {
          safeWarn('cineResults.updateCalculations could not render temperature note.', error);
        }
      }
      if (checkFizCompatibilityFn) {
        try {
          checkFizCompatibilityFn();
        } catch (error) {
          safeWarn('cineResults.updateCalculations could not verify FIZ compatibility.', error);
        }
      }
      if (checkFizControllerFn) {
        try {
          checkFizControllerFn();
        } catch (error) {
          safeWarn('cineResults.updateCalculations could not verify controller compatibility.', error);
        }
      }
      if (checkArriCompatibilityFn) {
        try {
          checkArriCompatibilityFn();
        } catch (error) {
          safeWarn('cineResults.updateCalculations could not verify ARRI compatibility.', error);
        }
      }
      if (setupDiagramContainer && renderSetupDiagramFn) {
        try {
          renderSetupDiagramFn();
        } catch (error) {
          safeWarn('cineResults.updateCalculations could not render setup diagram.', error);
        }
      }

      var refreshGearListIfVisibleFn = resolveFunctionDependency('refreshGearListIfVisible');
      if (refreshGearListIfVisibleFn) {
        try {
          refreshGearListIfVisibleFn();
        } catch (error) {
          safeWarn('cineResults.updateCalculations could not refresh gear list.', error);
        }
      }
    } catch (error) {
      safeWarn('cineResults.updateCalculations total failure', error);
      throw error;
    }
  }

  function setupRuntimeFeedback(options) {
    var opts = options || {};
    var deps = updateRuntimeDependencies(opts);
    var doc = resolveDocument(opts);

    captureFeedbackOptionElements(doc);

    var button = resolveElementFromOptions(opts, 'runtimeFeedbackButton', 'runtimeFeedbackBtn', 'runtimeFeedbackBtn');
    var dialog = resolveElementFromOptions(opts, 'feedbackDialog', 'feedbackDialog', 'feedbackDialog');
    var form = resolveElementFromOptions(opts, 'feedbackForm', 'feedbackForm', 'feedbackForm');
    var cancelBtn = resolveElementFromOptions(opts, 'feedbackCancelBtn', 'fbCancel', 'feedbackCancelBtn');
    var useLocationBtn = resolveElementFromOptions(opts, 'feedbackUseLocationBtn', 'fbUseLocationBtn', 'feedbackUseLocationBtn');
    var sensorModeSelect = resolveElementFromOptions(opts, 'sensorModeSelect', 'fbSensorMode', 'sensorModeSelect');
    var framerateSelect = resolveElementFromOptions(opts, 'framerateSelect', 'fbFramerate', 'framerateSelect');

    runtimeFeedbackState.elements.runtimeFeedbackButton = button;
    runtimeFeedbackState.elements.feedbackDialog = dialog;
    runtimeFeedbackState.elements.feedbackForm = form;
    runtimeFeedbackState.elements.feedbackCancelBtn = cancelBtn;
    runtimeFeedbackState.elements.feedbackUseLocationBtn = useLocationBtn;
    if (sensorModeSelect) {
      runtimeFeedbackState.elements.sensorModeSelect = sensorModeSelect;
    }
    if (framerateSelect) {
      runtimeFeedbackState.elements.framerateSelect = framerateSelect;
    }

    function closeRuntimeFeedbackDialog(warnMessage) {
      if (!dialog) {
        return false;
      }
      var closeDialogFn = deps.closeDialog;
      if (typeof closeDialogFn === 'function') {
        try {
          closeDialogFn(dialog);
          return true;
        } catch (error) {
          if (warnMessage) {
            safeWarn(warnMessage, error);
          }
        }
      }
      if (typeof dialog.close === 'function') {
        try {
          dialog.close();
          return true;
        } catch (dialogError) {
          void dialogError;
        }
      }
      return false;
    }

    function sanitizePrefillValue(value) {
      if (typeof value === 'number' && Number.isFinite(value)) {
        return String(value);
      }
      if (typeof value !== 'string') {
        if (value == null) {
          return '';
        }
        value = String(value);
      }
      var trimmed = value.trim();
      if (!trimmed) {
        return '';
      }
      if (trimmed.toLowerCase() === 'none') {
        return '';
      }
      return trimmed;
    }

    function resolveSelectLabel(select, fallbackId, warnMessage) {
      var target = select;
      if (!target && doc && typeof doc.getElementById === 'function' && fallbackId) {
        try {
          target = doc.getElementById(fallbackId);
        } catch (error) {
          void error;
          target = null;
        }
      }
      if (!target) {
        return '';
      }
      var resolved = '';
      try {
        var options = target.options;
        var selectedIndex = typeof target.selectedIndex === 'number' ? target.selectedIndex : -1;
        if (options && selectedIndex >= 0 && selectedIndex < options.length) {
          var option = options[selectedIndex];
          if (option) {
            if (typeof option.text === 'string' && option.text) {
              resolved = option.text;
            } else if (typeof option.textContent === 'string' && option.textContent) {
              resolved = option.textContent;
            } else if (typeof option.label === 'string' && option.label) {
              resolved = option.label;
            } else if (typeof option.value === 'string' && option.value) {
              resolved = option.value;
            }
          }
        }
        if (!resolved && typeof target.value === 'string') {
          resolved = target.value;
        }
      } catch (error) {
        if (warnMessage) {
          safeWarn(warnMessage, error);
        }
        resolved = '';
      }
      return sanitizePrefillValue(resolved);
    }

    function resolveCameraSelectionLabel() {
      var select = runtimeFeedbackState && runtimeFeedbackState.elements
        ? runtimeFeedbackState.elements.cameraSelect
        : null;
      return resolveSelectLabel(select, 'cameraSelect', 'cineResults could not inspect camera selection for runtime feedback prefill.');
    }

    function resolveBatteryPlateSelectionLabel() {
      var label = '';
      var getSelectedPlateFn = deps && typeof deps.getSelectedPlate === 'function'
        ? deps.getSelectedPlate
        : null;
      if (getSelectedPlateFn) {
        try {
          label = sanitizePrefillValue(getSelectedPlateFn());
        } catch (error) {
          safeWarn('cineResults could not resolve battery plate selection via helper for runtime feedback.', error);
          label = '';
        }
      }
      if (label) {
        return label;
      }
      var select = runtimeFeedbackState && runtimeFeedbackState.elements
        ? runtimeFeedbackState.elements.batteryPlateSelect
        : null;
      return resolveSelectLabel(select, 'batteryPlateSelect', 'cineResults could not inspect battery plate selection for runtime feedback prefill.');
    }

    function resolveBatterySelectionLabel() {
      var select = runtimeFeedbackState && runtimeFeedbackState.elements
        ? runtimeFeedbackState.elements.batterySelect
        : null;
      return resolveSelectLabel(select, 'batterySelect', 'cineResults could not inspect battery selection for runtime feedback prefill.');
    }

    function resolveMonitorSelectionLabel() {
      var select = runtimeFeedbackState && runtimeFeedbackState.elements
        ? runtimeFeedbackState.elements.monitorSelect
        : null;
      return resolveSelectLabel(select, 'monitorSelect', 'cineResults could not inspect monitor selection for runtime feedback prefill.');
    }

    function resolveWirelessVideoSelectionLabel() {
      var select = runtimeFeedbackState && runtimeFeedbackState.elements
        ? runtimeFeedbackState.elements.videoSelect
        : null;
      return resolveSelectLabel(select, 'videoSelect', 'cineResults could not inspect wireless video selection for runtime feedback prefill.');
    }

    function resolveDistanceSelectionLabel() {
      var select = runtimeFeedbackState && runtimeFeedbackState.elements
        ? runtimeFeedbackState.elements.distanceSelect
        : null;
      return resolveSelectLabel(select, 'distanceSelect', 'cineResults could not inspect FIZ distance selection for runtime feedback prefill.');
    }

    function resolveCollectionSelectionLabels(collection, fallbackIds, warnMessage) {
      var labels = [];
      var elements = Array.isArray(collection) ? collection : [];
      if ((!elements || !elements.length) && doc && typeof doc.getElementById === 'function' && Array.isArray(fallbackIds)) {
        var fallbackElements = [];
        for (var fallbackIndex = 0; fallbackIndex < fallbackIds.length; fallbackIndex += 1) {
          var candidateId = fallbackIds[fallbackIndex];
          if (!candidateId) {
            continue;
          }
          var fallbackElement = null;
          try {
            fallbackElement = doc.getElementById(candidateId);
          } catch (error) {
            void error;
            fallbackElement = null;
          }
          if (fallbackElement) {
            fallbackElements.push(fallbackElement);
          }
        }
        elements = fallbackElements;
      }
      for (var index = 0; index < elements.length; index += 1) {
        var element = elements[index];
        var fallbackId = Array.isArray(fallbackIds) && index < fallbackIds.length ? fallbackIds[index] : null;
        var label = resolveSelectLabel(element, fallbackId, warnMessage);
        if (label && labels.indexOf(label) === -1) {
          labels.push(label);
        }
      }
      return labels;
    }

    function resolveMotorSelectionLabels() {
      var collection = runtimeFeedbackState && runtimeFeedbackState.elements
        ? runtimeFeedbackState.elements.motorSelects
        : null;
      return resolveCollectionSelectionLabels(
        collection,
        ['motor1Select', 'motor2Select', 'motor3Select', 'motor4Select'],
        'cineResults could not inspect FIZ motor selection for runtime feedback prefill.'
      );
    }

    function resolveControllerSelectionLabels() {
      var collection = runtimeFeedbackState && runtimeFeedbackState.elements
        ? runtimeFeedbackState.elements.controllerSelects
        : null;
      return resolveCollectionSelectionLabels(
        collection,
        ['controller1Select', 'controller2Select', 'controller3Select', 'controller4Select'],
        'cineResults could not inspect FIZ controller selection for runtime feedback prefill.'
      );
    }

    function setPrefillValue(input, value) {
      if (!input || typeof input !== 'object' || typeof input.value === 'undefined') {
        return;
      }
      var normalized = typeof value === 'string' ? value : sanitizePrefillValue(value);
      if (typeof normalized !== 'string') {
        normalized = '';
      }
      var tagName = typeof input.tagName === 'string' ? input.tagName.toUpperCase() : '';
      if (tagName === 'SELECT') {
        try {
          var options = input.options;
          var foundMatch = false;
          if (options && typeof options.length === 'number') {
            for (var optionIndex = 0; optionIndex < options.length; optionIndex += 1) {
              var option = options[optionIndex];
              if (!option) {
                continue;
              }
              var optionValue = typeof option.value === 'string' ? option.value : '';
              var optionLabel = typeof option.text === 'string' ? option.text : option.textContent;
              if (optionValue === normalized || optionLabel === normalized) {
                option.selected = true;
                foundMatch = true;
                break;
              }
            }
          }
          if (!foundMatch) {
            if (normalized) {
              var ownerDoc = input.ownerDocument && typeof input.ownerDocument.createElement === 'function'
                ? input.ownerDocument
                : null;
              var newOption = ownerDoc ? ownerDoc.createElement('option') : null;
              if (newOption) {
                newOption.value = normalized;
                newOption.textContent = normalized;
                input.appendChild(newOption);
                newOption.selected = true;
                foundMatch = true;
              }
            } else if (typeof input.selectedIndex === 'number') {
              input.selectedIndex = -1;
            }
          }
          if (foundMatch) {
            input.value = normalized;
            return;
          }
        } catch (selectError) {
          safeWarn('cineResults could not update runtime feedback select prefill.', selectError);
        }
      }
      try {
        input.value = normalized;
      } catch (error) {
        safeWarn('cineResults could not update runtime feedback field prefill.', error);
      }
    }

    function prefillRuntimeFeedbackDefaults() {
      if (!doc) {
        return;
      }
      var fieldEntries = getFeedbackFieldEntries(doc);
      var cameraEntry = null;
      var batteryPlateEntry = null;
      var batteryEntry = null;
      var wirelessVideoEntry = null;
      var monitorEntry = null;
      var distanceEntry = null;
      var controllerEntry = null;
      var motorEntry = null;
      for (var index = 0; index < fieldEntries.length; index += 1) {
        var entry = fieldEntries[index];
        if (!entry || !entry.map) {
          continue;
        }
        if (entry.map.key === 'camera' && !cameraEntry) {
          cameraEntry = entry;
        } else if (entry.map.key === 'batteryPlate' && !batteryPlateEntry) {
          batteryPlateEntry = entry;
        } else if (entry.map.key === 'battery' && !batteryEntry) {
          batteryEntry = entry;
        } else if (entry.map.key === 'wirelessVideo' && !wirelessVideoEntry) {
          wirelessVideoEntry = entry;
        } else if (entry.map.key === 'monitor' && !monitorEntry) {
          monitorEntry = entry;
        } else if (entry.map.key === 'distance' && !distanceEntry) {
          distanceEntry = entry;
        } else if (entry.map.key === 'controllers' && !controllerEntry) {
          controllerEntry = entry;
        } else if (entry.map.key === 'motors' && !motorEntry) {
          motorEntry = entry;
        }
      }

      if (cameraEntry && cameraEntry.element) {
        setPrefillValue(cameraEntry.element, resolveCameraSelectionLabel());
      }
      if (batteryPlateEntry && batteryPlateEntry.element) {
        setPrefillValue(batteryPlateEntry.element, resolveBatteryPlateSelectionLabel());
      }
      if (batteryEntry && batteryEntry.element) {
        setPrefillValue(batteryEntry.element, resolveBatterySelectionLabel());
      }
      if (wirelessVideoEntry && wirelessVideoEntry.element) {
        setPrefillValue(wirelessVideoEntry.element, resolveWirelessVideoSelectionLabel());
      }
      if (monitorEntry && monitorEntry.element) {
        setPrefillValue(monitorEntry.element, resolveMonitorSelectionLabel());
      }
      if (distanceEntry && distanceEntry.element) {
        setPrefillValue(distanceEntry.element, resolveDistanceSelectionLabel());
      }
      if (controllerEntry && controllerEntry.element) {
        var controllers = resolveControllerSelectionLabels();
        setPrefillValue(controllerEntry.element, controllers.join(', '));
      }
      if (motorEntry && motorEntry.element) {
        var motors = resolveMotorSelectionLabels();
        setPrefillValue(motorEntry.element, motors.join(', '));
      }
    }

    attachHandlerOnce(button, 'click', 'openDialog', function () {
      return function openRuntimeFeedbackDialog() {
        prefillRuntimeFeedbackDefaults();
        if (!dialog) {
          return;
        }
        var openDialogFn = deps.openDialog;
        if (typeof openDialogFn === 'function') {
          try {
            openDialogFn(dialog);
            return;
          } catch (error) {
            safeWarn('cineResults could not open runtime feedback dialog.', error);
          }
        }
        if (typeof dialog.showModal === 'function') {
          try {
            dialog.showModal();
          } catch (dialogError) {
            void dialogError;
          }
        }
      };
    });

    attachHandlerOnce(sensorModeSelect, 'change', 'sensorModeChange', function () {
      return function handleSensorModeChange() {
        var value = '';
        if (sensorModeSelect && typeof sensorModeSelect.value === 'string') {
          value = sensorModeSelect.value;
        }
        runtimeFeedbackState.selectedSensorMode = value;
        updateFramerateSelectOptionsForSensorMode(value, '');
      };
    });

    attachHandlerOnce(dialog, 'click', 'dialogBackdrop', function () {
      return function handleRuntimeFeedbackBackdropClick(event) {
        if (!dialog) {
          return;
        }
        var target = event ? event.target : null;
        if (target !== dialog) {
          return;
        }
        closeRuntimeFeedbackDialog('cineResults could not close runtime feedback dialog from backdrop interaction.');
      };
    });

    attachHandlerOnce(cancelBtn, 'click', 'cancelDialog', function () {
      return function cancelRuntimeFeedbackDialog() {
        closeRuntimeFeedbackDialog('cineResults could not close runtime feedback dialog via helper.');
      };
    });

    attachHandlerOnce(useLocationBtn, 'click', 'useLocation', function () {
      return function handleRuntimeFeedbackLocation() {
        if (!useLocationBtn) {
          return;
        }
        var nav = deps.navigator;
        var alertFn = deps.alert;
        if (!nav || !nav.geolocation || typeof nav.geolocation.getCurrentPosition !== 'function') {
          if (typeof alertFn === 'function') {
            alertFn('Geolocation is not supported by your browser');
          }
          return;
        }
        useLocationBtn.disabled = true;
        var handlePositionSuccess = function (pos) {
          try {
            if (!doc) {
              return;
            }
            var input = null;
            try {
              input = doc.getElementById('fbLocation');
            } catch (error) {
              void error;
              input = null;
            }
            if (!input) {
              return;
            }
            var latitude = pos && pos.coords && typeof pos.coords.latitude === 'number' ? pos.coords.latitude : null;
            var longitude = pos && pos.coords && typeof pos.coords.longitude === 'number' ? pos.coords.longitude : null;
            if (latitude === null || longitude === null) {
              return;
            }
            var latText = latitude.toFixed ? latitude.toFixed(5) : String(latitude);
            var lonText = longitude.toFixed ? longitude.toFixed(5) : String(longitude);
            input.value = latText + ', ' + lonText;
          } finally {
            useLocationBtn.disabled = false;
          }
        };

        var handlePositionError = function (error) {
          useLocationBtn.disabled = false;
          if (typeof console !== 'undefined' && typeof console.error === 'function') {
            console.error('Geolocation failed:', error);
          }
          if (typeof alertFn === 'function') {
            var msg = 'Unable to retrieve your location';
            if (error && error.message) {
              msg += ': ' + error.message;
            }
            alertFn(msg);
          }
        };

        nav.geolocation.getCurrentPosition(handlePositionSuccess, function (highAccError) {
          if (typeof console !== 'undefined' && typeof console.warn === 'function') {
            console.warn('High accuracy geolocation failed, retrying with low accuracy', highAccError);
          }
          nav.geolocation.getCurrentPosition(handlePositionSuccess, handlePositionError, {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 0
          });
        }, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      };
    });

    attachHandlerOnce(form, 'submit', 'submitFeedback', function () {
      return function handleRuntimeFeedbackSubmit(event) {
        if (event && typeof event.preventDefault === 'function') {
          try {
            event.preventDefault();
          } catch (error) {
            void error;
          }
        }

        if (!doc) {
          return;
        }

        var entry = {};
        var fieldEntries = getFeedbackFieldEntries(doc);
        for (var index = 0; index < fieldEntries.length; index += 1) {
          var fieldEntry = fieldEntries[index];
          var field = fieldEntry.map;
          var input = fieldEntry.element;
          if (!field || !field.key) {
            continue;
          }
          var value = '';
          if (input && typeof input.value !== 'undefined') {
            value = String(input.value);
            if (field.trim && value) {
              value = value.trim();
            }
          }
          entry[field.key] = value;
        }

        var key = '';
        try {
          key = deps.getCurrentSetupKey ? deps.getCurrentSetupKey() : '';
        } catch (error) {
          safeWarn('cineResults could not resolve the current setup key for runtime feedback.', error);
          key = '';
        }

        var feedbackData = null;
        try {
          feedbackData = deps.loadFeedback ? deps.loadFeedback() : {};
        } catch (error) {
          safeWarn('cineResults could not load runtime feedback from storage.', error);
          feedbackData = {};
        }
        if (!feedbackData || typeof feedbackData !== 'object') {
          feedbackData = {};
        }
        if (!feedbackData[key]) {
          feedbackData[key] = [];
        }
        feedbackData[key].push(entry);

        try {
          if (typeof deps.saveFeedback === 'function') {
            deps.saveFeedback(feedbackData);
          }
        } catch (error) {
          safeWarn('cineResults could not save runtime feedback entry.', error);
        }

        var lines = [];
        for (var entryIndex = 0; entryIndex < fieldEntries.length; entryIndex += 1) {
          var entryMap = fieldEntries[entryIndex].map;
          if (!entryMap || !entryMap.key) {
            continue;
          }
          lines.push(entryMap.key + ': ' + (entry[entryMap.key] || ''));
        }

        var subject = encodeURIComponent('Cine Power Planner Runtime Feedback');
        var body = encodeURIComponent(lines.join('\n'));
        var mailTarget = deps.mailTarget || 'info@lucazanner.de';
        var targetHref = 'mailto:' + mailTarget + '?subject=' + subject + '&body=' + body;

        var win = deps.window || GLOBAL_SCOPE;
        if (win && win.location) {
          try {
            win.location.href = targetHref;
          } catch (error) {
            safeWarn('cineResults could not trigger runtime feedback email composition.', error);
          }
        }

        if (dialog) {
          closeRuntimeFeedbackDialog('cineResults could not close runtime feedback dialog after submit.');
        }

        if (typeof deps.updateCalculations === 'function') {
          try {
            deps.updateCalculations();
          } catch (error) {
            safeWarn('cineResults could not refresh calculations after runtime feedback submit.', error);
          }
        }
      };
    });

    return !!(button && dialog && form);
  }

  var resultsAPI = {
    localizeResultsSection: localizeResultsSection,
    localizeBatteryComparisonSection: localizeBatteryComparisonSection,
    updateCalculations: updateCalculations,
    setupRuntimeFeedback: setupRuntimeFeedback,
    renderTemperatureNote: renderTemperatureNote
  };

  if (typeof runtimeFeedbackState !== 'undefined' && runtimeFeedbackState && runtimeFeedbackState.dependencies) {
    runtimeFeedbackState.dependencies.updateCalculations = updateCalculations;
  }

  freezeDeep(resultsAPI);

  if (runtimeFeedbackState && runtimeFeedbackState.dependencies) {
    runtimeFeedbackState.dependencies.renderTemperatureNote = renderTemperatureNote;
  }

  exposeGlobal('renderTemperatureNote', renderTemperatureNote, {
    configurable: true,
    enumerable: false,
    writable: true
  });

  exposeGlobal('updateCalculations', updateCalculations, {
    configurable: true,
    enumerable: false,
    writable: true
  });

  registerOrQueueModule('cineResults', resultsAPI, {
    category: 'ui',
    description: 'Power summary localisation and runtime feedback coordination.',
    replace: true
  }, function (error) {
    safeWarn('Unable to register cineResults module.', error);
  });

  exposeGlobal('cineResults', resultsAPI, {
    configurable: true,
    enumerable: false,
    writable: false
  });

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = resultsAPI;
  }
})();
