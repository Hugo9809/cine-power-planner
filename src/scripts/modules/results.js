/* global cineModuleBase */

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
    collatorCache: Object.create(null),
    fallbackCollator: null,
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
      setButtonLabelWithIcon: null,
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
      escapeHtml: null,
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

    runtimeFeedbackState.elements.cameraSelect = cameraSelect;
    runtimeFeedbackState.elements.monitorSelect = monitorSelect;
    runtimeFeedbackState.elements.videoSelect = videoSelect;
    runtimeFeedbackState.elements.distanceSelect = distanceSelect;
    runtimeFeedbackState.elements.batterySelect = batterySelect;
    runtimeFeedbackState.elements.hotswapSelect = hotswapSelect;
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
    var refreshGearListIfVisibleFn = resolveFunctionDependency('refreshGearListIfVisible');
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
      var maxPinA = batteryData && typeof batteryData.pinA === 'number' ? batteryData.pinA : 0;
      var maxDtapA = batteryData && typeof batteryData.dtapA === 'number' ? batteryData.dtapA : 0;
      if (hotswapData && typeof hotswapData.pinA === 'number') {
        if (hotswapData.pinA < maxPinA) {
          var hotswapMessage = resolveText('warnHotswapLower')
            .replace('{max}', String(hotswapData.pinA))
            .replace('{batt}', String(maxPinA));
          setStatusMessageFn(hotswapWarnTarget, hotswapMessage);
          setStatusLevelFn(hotswapWarnTarget, 'warning');
          maxPinA = hotswapData.pinA;
        } else {
          setStatusMessageFn(hotswapWarnTarget, '');
          setStatusLevelFn(hotswapWarnTarget, null);
        }
      } else if (hotswapWarnTarget) {
        setStatusMessageFn(hotswapWarnTarget, '');
        setStatusLevelFn(hotswapWarnTarget, null);
      }
      var availableWatt = maxPinA * lowV;
      if (drawPowerDiagramFn) {
        try {
          drawPowerDiagramFn(availableWatt, segments, maxPinA);
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
      if (totalCurrent12Target && typeof totalCurrent12Target.textContent !== 'undefined') {
        try {
          totalCurrent12Target.textContent = totalCurrentLow.toFixed(2);
        } catch (error) {
          void error;
        }
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
      } else {
        hours = capacityWh / totalWatt;
        if (batteryLifeTarget && typeof batteryLifeTarget.textContent !== 'undefined') {
          try {
            batteryLifeTarget.textContent = hours.toFixed(2);
          } catch (error) {
            void error;
          }
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

      setStatusMessageFn(pinWarnTarget, '');
      setStatusMessageFn(dtapWarnTarget, '');
      var pinSeverity = '';
      var dtapSeverity = '';
      if (totalCurrentLow > maxPinA) {
        var pinExceeded = resolveText('warnPinExceeded')
          .replace('{current}', totalCurrentLow.toFixed(2))
          .replace('{max}', String(maxPinA));
        setStatusMessageFn(pinWarnTarget, pinExceeded);
        pinSeverity = 'danger';
      } else if (totalCurrentLow > maxPinA * 0.8) {
        var pinNear = resolveText('warnPinNear')
          .replace('{current}', totalCurrentLow.toFixed(2))
          .replace('{max}', String(maxPinA));
        setStatusMessageFn(pinWarnTarget, pinNear);
        pinSeverity = 'note';
      }
      if (!bMountCam) {
        if (totalCurrentLow > maxDtapA) {
          var dtapExceeded = resolveText('warnDTapExceeded')
            .replace('{current}', totalCurrentLow.toFixed(2))
            .replace('{max}', String(maxDtapA));
          setStatusMessageFn(dtapWarnTarget, dtapExceeded);
          dtapSeverity = 'danger';
        } else if (totalCurrentLow > maxDtapA * 0.8) {
          var dtapNear = resolveText('warnDTapNear')
            .replace('{current}', totalCurrentLow.toFixed(2))
            .replace('{max}', String(maxDtapA));
          setStatusMessageFn(dtapWarnTarget, dtapNear);
          dtapSeverity = 'note';
        }
      }
      var hasPinLimit = typeof maxPinA === 'number' && maxPinA > 0;
      var pinsInsufficient = !hasPinLimit || totalCurrentLow > maxPinA;
      var hasDtapRating = typeof maxDtapA === 'number' && maxDtapA > 0;
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
      if (pinWarnTarget && pinWarnTarget.textContent === '') {
        var pinOk = resolveText('pinOk').replace('{max}', String(maxPinA));
        setStatusMessageFn(pinWarnTarget, pinOk);
        setStatusLevelFn(pinWarnTarget, 'success');
      } else {
        setStatusLevelFn(pinWarnTarget, pinSeverity || 'warning');
      }
      if (!bMountCam) {
        if (dtapWarnTarget && dtapWarnTarget.textContent === '') {
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
    }

    if (batteryComparisonSection && batteryComparisonSection.style) {
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
          var pinOKSel = totalCurrentLow <= selData.pinA;
          var dtapOKSel = !bMountCam && totalCurrentLow <= selData.dtapA;
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
        var canPin = totalCurrentLow <= batteryInfo.pinA;
        var canDtap = !bMountCam && totalCurrentLow <= batteryInfo.dtapA;
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
    if (refreshGearListIfVisibleFn) {
      try {
        refreshGearListIfVisibleFn();
      } catch (error) {
        safeWarn('cineResults.updateCalculations could not refresh gear list.', error);
      }
    }
  }
  runtimeFeedbackState.dependencies.updateCalculations = updateCalculations;


function setupRuntimeFeedback(options) {
    var opts = options || {};
    var deps = updateRuntimeDependencies(opts);
    var doc = resolveDocument(opts);

    var button = resolveElementFromOptions(opts, 'runtimeFeedbackButton', 'runtimeFeedbackBtn', 'runtimeFeedbackBtn');
    var dialog = resolveElementFromOptions(opts, 'feedbackDialog', 'feedbackDialog', 'feedbackDialog');
    var form = resolveElementFromOptions(opts, 'feedbackForm', 'feedbackForm', 'feedbackForm');
    var cancelBtn = resolveElementFromOptions(opts, 'feedbackCancelBtn', 'fbCancel', 'feedbackCancelBtn');
    var useLocationBtn = resolveElementFromOptions(opts, 'feedbackUseLocationBtn', 'fbUseLocationBtn', 'feedbackUseLocationBtn');

    runtimeFeedbackState.elements.runtimeFeedbackButton = button;
    runtimeFeedbackState.elements.feedbackDialog = dialog;
    runtimeFeedbackState.elements.feedbackForm = form;
    runtimeFeedbackState.elements.feedbackCancelBtn = cancelBtn;
    runtimeFeedbackState.elements.feedbackUseLocationBtn = useLocationBtn;

    attachHandlerOnce(button, 'click', 'openDialog', function () {
      return function openRuntimeFeedbackDialog() {
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

    attachHandlerOnce(cancelBtn, 'click', 'cancelDialog', function () {
      return function cancelRuntimeFeedbackDialog() {
        if (!dialog) {
          return;
        }
        var closeDialogFn = deps.closeDialog;
        if (typeof closeDialogFn === 'function') {
          try {
            closeDialogFn(dialog);
            return;
          } catch (error) {
            safeWarn('cineResults could not close runtime feedback dialog via helper.', error);
          }
        }
        if (typeof dialog.close === 'function') {
          try {
            dialog.close();
          } catch (dialogError) {
            void dialogError;
          }
        }
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
        nav.geolocation.getCurrentPosition(function (pos) {
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
        }, function () {
          useLocationBtn.disabled = false;
          if (typeof alertFn === 'function') {
            alertFn('Unable to retrieve your location');
          }
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
          var closeDialogFn = deps.closeDialog;
          if (typeof closeDialogFn === 'function') {
            try {
              closeDialogFn(dialog);
            } catch (error) {
              safeWarn('cineResults could not close runtime feedback dialog after submit.', error);
            }
          } else if (typeof dialog.close === 'function') {
            try {
              dialog.close();
            } catch (dialogError) {
              void dialogError;
            }
          }
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
    setupRuntimeFeedback: setupRuntimeFeedback
  };

  freezeDeep(resultsAPI);

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
