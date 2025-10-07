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

  var runtimeFeedbackState = {
    elements: {},
    handlers: {},
    feedbackFieldCache: [],
    feedbackFieldCacheDoc: null,
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
      iconGlyphs: null
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
