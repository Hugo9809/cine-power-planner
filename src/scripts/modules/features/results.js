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

  const GLOBAL_SCOPE = detectGlobalScope();

  function resolveModuleBase(scope) {
    if (typeof cineModuleBase === 'object' && cineModuleBase) {
      return cineModuleBase;
    }

    if (typeof require === 'function') {
      try {
        const required = require('../../modules/base.js');
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

  const MODULE_BASE = resolveModuleBase(GLOBAL_SCOPE);
  if (!MODULE_BASE) {
    return;
  }

  const freezeDeep = typeof MODULE_BASE.freezeDeep === 'function'
    ? MODULE_BASE.freezeDeep
    : function freezePassthrough(value) { return value; };

  const safeWarn = typeof MODULE_BASE.safeWarn === 'function'
    ? MODULE_BASE.safeWarn
    : function fallbackWarn(message, detail) {
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
          try {
            if (typeof detail === 'undefined') {
              console.warn(message);
            } else {
              console.warn(message, detail);
            }
          } catch (error) {
            void error;
          }
        }
      };

  const exposeGlobal = typeof MODULE_BASE.exposeGlobal === 'function'
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

  const registerOrQueueModule = typeof MODULE_BASE.registerOrQueueModule === 'function'
    ? function register(name, api, options, onError) {
        return MODULE_BASE.registerOrQueueModule(
          name,
          api,
          options,
          onError,
          GLOBAL_SCOPE,
          MODULE_BASE.getModuleRegistry && MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE)
        );
      }
    : function noopRegister() {
        return false;
      };

  function getGlobal(name) {
    if (!GLOBAL_SCOPE || (typeof GLOBAL_SCOPE !== 'object' && typeof GLOBAL_SCOPE !== 'function')) {
      return undefined;
    }
    try {
      return GLOBAL_SCOPE[name];
    } catch (error) {
      void error;
      return undefined;
    }
  }

  function resolveTemperatureStorageKey() {
    const scope = GLOBAL_SCOPE;
    const fallback = 'cameraPowerPlanner_temperatureUnit';
    const existing =
      scope && typeof scope.TEMPERATURE_UNIT_STORAGE_KEY === 'string'
        ? scope.TEMPERATURE_UNIT_STORAGE_KEY
        : fallback;

    if (scope && typeof scope.TEMPERATURE_UNIT_STORAGE_KEY !== 'string') {
      try {
        scope.TEMPERATURE_UNIT_STORAGE_KEY = existing;
      } catch (error) {
        void error;
      }
    }

    return existing;
  }

  const TEMPERATURE_STORAGE_KEY = resolveTemperatureStorageKey();
  const TEMPERATURE_UNITS = freezeDeep({
    celsius: 'celsius',
    fahrenheit: 'fahrenheit',
  });
  const TEMPERATURE_SCENARIOS = freezeDeep([
    { celsius: 40, factor: 1.0, color: '#d9534f' },
    { celsius: 25, factor: 1.0, color: '#5cb85c' },
    { celsius: 0, factor: 0.8, color: '#f0ad4e' },
    { celsius: -10, factor: 0.625, color: '#5bc0de' },
    { celsius: -20, factor: 0.5, color: '#0275d8' },
  ]);
  const FEEDBACK_TEMPERATURE_MIN = -20;
  const FEEDBACK_TEMPERATURE_MAX = 50;

  let temperatureUnit = TEMPERATURE_UNITS.celsius;
  try {
    if (typeof localStorage !== 'undefined') {
      const storedTemperatureUnit = localStorage.getItem(TEMPERATURE_STORAGE_KEY);
      if (storedTemperatureUnit) {
        temperatureUnit = normalizeTemperatureUnit(storedTemperatureUnit);
      }
    }
  } catch (error) {
    safeWarn('cineResults: Could not load temperature unit preference', error);
  }

  let lastRuntimeHours = null;

  function resolveLanguageCode(lang) {
    if (typeof lang === 'string' && lang.trim()) {
      return lang.trim();
    }
    const currentLang = getGlobal('currentLang');
    if (typeof currentLang === 'string' && currentLang.trim()) {
      return currentLang;
    }
    return 'en';
  }

  function getLanguageTexts(lang) {
    const resolved = resolveLanguageCode(lang);
    const texts = getGlobal('texts') || {};
    if (texts && typeof texts[resolved] === 'object') {
      return texts[resolved] || {};
    }
    if (texts && typeof texts.en === 'object') {
      return texts.en || {};
    }
    return {};
  }

  function formatNumberForLang(lang, value, options) {
    const resolved = resolveLanguageCode(lang);
    try {
      return new Intl.NumberFormat(resolved, options).format(value);
    } catch (firstError) {
      try {
        return new Intl.NumberFormat('en', options).format(value);
      } catch (fallbackError) {
        safeWarn('cineResults: Number formatting failed', [firstError, fallbackError]);
        return String(value);
      }
    }
  }

  function normalizeTemperatureUnit(unit) {
    if (typeof unit === 'string') {
      const normalized = unit.trim().toLowerCase();
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

  function convertCelsiusToUnit(value, unit) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) {
      return Number.NaN;
    }
    const resolvedUnit = normalizeTemperatureUnit(unit);
    if (resolvedUnit === TEMPERATURE_UNITS.fahrenheit) {
      return (numeric * 9) / 5 + 32;
    }
    return numeric;
  }

  function getTemperatureUnitSymbolForLang(lang, unit) {
    const resolvedUnit = normalizeTemperatureUnit(unit);
    const langTexts = getLanguageTexts(lang);
    const fallbackTexts = getLanguageTexts('en');
    const key =
      resolvedUnit === TEMPERATURE_UNITS.fahrenheit
        ? 'temperatureUnitSymbolFahrenheit'
        : 'temperatureUnitSymbolCelsius';
    return (
      langTexts[key]
      || fallbackTexts[key]
      || (resolvedUnit === TEMPERATURE_UNITS.fahrenheit ? '°F' : '°C')
    );
  }

  function getTemperatureUnitLabelForLang(lang, unit) {
    const resolvedUnit = normalizeTemperatureUnit(unit);
    const langTexts = getLanguageTexts(lang);
    const fallbackTexts = getLanguageTexts('en');
    const key =
      resolvedUnit === TEMPERATURE_UNITS.fahrenheit
        ? 'temperatureUnitFahrenheit'
        : 'temperatureUnitCelsius';
    return (
      langTexts[key]
      || fallbackTexts[key]
      || (resolvedUnit === TEMPERATURE_UNITS.fahrenheit ? 'Fahrenheit (°F)' : 'Celsius (°C)')
    );
  }

  function getTemperatureColumnLabelForLang(lang, unit) {
    const langTexts = getLanguageTexts(lang);
    const fallbackTexts = getLanguageTexts('en');
    const baseLabel = langTexts.temperatureLabel || fallbackTexts.temperatureLabel || 'Temperature';
    const symbol = getTemperatureUnitSymbolForLang(lang, unit);
    return `${baseLabel} (${symbol})`;
  }

  function formatTemperatureForDisplay(celsius, options) {
    const { unit = temperatureUnit, lang = getGlobal('currentLang'), includeSign = true } = options || {};
    const resolvedUnit = normalizeTemperatureUnit(unit);
    let converted = convertCelsiusToUnit(celsius, resolvedUnit);
    if (!Number.isFinite(converted)) {
      return '';
    }
    if (Math.abs(converted) < 1e-6) {
      converted = 0;
    }
    const isNegative = converted < 0;
    const isPositive = converted > 0;
    const absolute = Math.abs(converted);
    const isInteger = Math.abs(absolute - Math.round(absolute)) < 1e-6;
    const fractionDigits =
      resolvedUnit === TEMPERATURE_UNITS.fahrenheit && !isInteger ? 1 : 0;
    const formatted = formatNumberForLang(lang, absolute, {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    });
    let prefix = '';
    if (includeSign === 'none') {
      prefix = '';
    } else if (includeSign === false || includeSign === 'negative') {
      if (isNegative) {
        prefix = '\u2013';
      }
    } else if (isPositive) {
      prefix = '+';
    } else if (isNegative) {
      prefix = '\u2013';
    }
    const symbol = getTemperatureUnitSymbolForLang(lang, resolvedUnit);
    return `${prefix}${formatted} ${symbol}`;
  }

  let cachedElements = null;
  let powerWarningHandlersBound = false;

  function resolveElement(id) {
    if (typeof document === 'undefined') {
      return null;
    }
    return document.getElementById(id);
  }

  function ensureResultsElements() {
    if (!cachedElements) {
      cachedElements = {};
    }

    const mapping = {
      breakdownList: 'breakdownList',
      powerDiagram: 'powerDiagram',
      powerDiagramBar: 'powerDiagramBar',
      powerDiagramLegend: 'powerDiagramLegend',
      maxPowerText: 'maxPowerText',
      totalPower: 'totalPower',
      totalCurrent144: 'totalCurrent144',
      totalCurrent12: 'totalCurrent12',
      batteryLife: 'batteryLife',
      batteryLifeLabel: 'batteryLifeLabel',
      runtimeAverageNote: 'runtimeAverageNote',
      batteryCount: 'batteryCount',
      pinWarning: 'pinWarning',
      dtapWarning: 'dtapWarning',
      hotswapWarning: 'hotswapWarning',
      powerWarningDialog: 'powerWarningDialog',
      powerWarningTitle: 'powerWarningTitle',
      powerWarningMessage: 'powerWarningMessage',
      powerWarningLimitsHeading: 'powerWarningLimitsHeading',
      powerWarningPinsDetail: 'powerWarningPinsDetail',
      powerWarningDtapDetail: 'powerWarningDtapDetail',
      powerWarningAdvice: 'powerWarningAdvice',
      powerWarningCloseBtn: 'powerWarningCloseBtn',
      feedbackTableContainer: 'feedbackTableContainer',
      userFeedbackTable: 'userFeedbackTable',
      temperatureNote: 'temperatureNote',
    };

    Object.keys(mapping).forEach(key => {
      const id = mapping[key];
      const existing = cachedElements[key];
      if (!existing || (typeof existing === 'object' && existing && !existing.isConnected)) {
        cachedElements[key] = resolveElement(id);
      }
    });

    if (!powerWarningHandlersBound) {
      const closeBtn = cachedElements.powerWarningCloseBtn;
      const dialog = cachedElements.powerWarningDialog;
      if (closeBtn && typeof closeBtn.addEventListener === 'function') {
        closeBtn.addEventListener('click', dismissPowerWarningDialog);
      }
      if (dialog && typeof dialog.addEventListener === 'function') {
        dialog.addEventListener('cancel', event => {
          event.preventDefault();
          dismissPowerWarningDialog();
        });
      }
      powerWarningHandlersBound = true;
    }

    const elementGlobals = {
      breakdownListElem: cachedElements.breakdownList,
      powerDiagramElem: cachedElements.powerDiagram,
      powerDiagramBarElem: cachedElements.powerDiagramBar,
      powerDiagramLegendElem: cachedElements.powerDiagramLegend,
      maxPowerTextElem: cachedElements.maxPowerText,
      totalPowerElem: cachedElements.totalPower,
      totalCurrent144Elem: cachedElements.totalCurrent144,
      totalCurrent12Elem: cachedElements.totalCurrent12,
      batteryLifeElem: cachedElements.batteryLife,
      batteryLifeLabelElem: cachedElements.batteryLifeLabel,
      runtimeAverageNoteElem: cachedElements.runtimeAverageNote,
      batteryCountElem: cachedElements.batteryCount,
      pinWarnElem: cachedElements.pinWarning,
      dtapWarnElem: cachedElements.dtapWarning,
      hotswapWarnElem: cachedElements.hotswapWarning,
      feedbackTableContainer: cachedElements.feedbackTableContainer,
      userFeedbackTable: cachedElements.userFeedbackTable,
    };
    Object.keys(elementGlobals).forEach(name => {
      exposeGlobal(name, elementGlobals[name], { configurable: true, writable: true });
    });

    return cachedElements;
  }

  function resolveResultsTargets() {
    const elements = ensureResultsElements();
    return {
      breakdownList: elements.breakdownList || null,
      powerDiagram: elements.powerDiagram || null,
      powerDiagramBar: elements.powerDiagramBar || null,
      powerDiagramLegend: elements.powerDiagramLegend || null,
      maxPowerText: elements.maxPowerText || null,
      totalPower: elements.totalPower || null,
      totalCurrent144: elements.totalCurrent144 || null,
      totalCurrent12: elements.totalCurrent12 || null,
      batteryLife: elements.batteryLife || null,
      batteryLifeLabel: elements.batteryLifeLabel || null,
      runtimeAverageNote: elements.runtimeAverageNote || null,
      batteryCount: elements.batteryCount || null,
      pinWarning: elements.pinWarning || null,
      dtapWarning: elements.dtapWarning || null,
      hotswapWarning: elements.hotswapWarning || null,
      feedbackTableContainer: elements.feedbackTableContainer || null,
      userFeedbackTable: elements.userFeedbackTable || null,
    };
  }

  let currentPowerWarningKey = '';
  let dismissedPowerWarningKey = '';

  function closePowerWarningDialog(options) {
    const dialog = ensureResultsElements().powerWarningDialog;
    if (!dialog) return;
    const isDialogOpen = getGlobal('isDialogOpen');
    const closeDialog = getGlobal('closeDialog');

    if (typeof isDialogOpen === 'function' && typeof closeDialog === 'function') {
      if (isDialogOpen(dialog)) {
        closeDialog(dialog);
      } else if (typeof dialog.removeAttribute === 'function') {
        dialog.removeAttribute('open');
      }
    } else if (typeof dialog.removeAttribute === 'function') {
      dialog.removeAttribute('open');
    }

    currentPowerWarningKey = '';
    if (!options || !options.keepDismissed) {
      dismissedPowerWarningKey = '';
    }
  }

  function dismissPowerWarningDialog() {
    if (currentPowerWarningKey) {
      dismissedPowerWarningKey = currentPowerWarningKey;
    }
    closePowerWarningDialog({ keepDismissed: true });
  }

  function showPowerWarningDialog(context) {
    const dialog = ensureResultsElements().powerWarningDialog;
    if (!dialog || !context) return;

    const {
      batteryName,
      current,
      hasPinLimit,
      pinLimit,
      hasDtapRating,
      dtapLimit,
      dtapAllowed,
    } = context;

    const lang = getGlobal('currentLang') || 'en';
    const texts = getLanguageTexts(lang);

    const titleElem = ensureResultsElements().powerWarningTitle;
    const messageElem = ensureResultsElements().powerWarningMessage;
    const limitsHeadingElem = ensureResultsElements().powerWarningLimitsHeading;
    const pinsDetailElem = ensureResultsElements().powerWarningPinsDetail;
    const dtapDetailElem = ensureResultsElements().powerWarningDtapDetail;
    const adviceElem = ensureResultsElements().powerWarningAdvice;

    const formatCurrentValue = value => {
      if (!Number.isFinite(value)) {
        return '–';
      }
      return `${value.toFixed(2)} A`;
    };

    const safeBatteryName = batteryName || texts.powerWarningBatteryFallback || 'battery';
    const formattedCurrent = formatCurrentValue(current);

    const title = texts.powerWarningTitle || 'Battery warning';
    if (titleElem) titleElem.textContent = title;

    const messageTemplate = texts.powerWarningMessage
      || 'Your {battery} might not safely deliver {current}.';
    if (messageElem) {
      messageElem.textContent = messageTemplate
        .replace('{battery}', safeBatteryName)
        .replace('{current}', formattedCurrent);
    }

    if (limitsHeadingElem) {
      limitsHeadingElem.textContent = texts.powerWarningLimitsHeading || '';
    }

    if (pinsDetailElem) {
      const pinTemplate = texts.powerWarningPinsDetail || '';
      const value = hasPinLimit ? formatCurrentValue(Number(pinLimit) || 0) : '–';
      pinsDetailElem.textContent = pinTemplate.replace('{max}', value);
    }

    if (dtapDetailElem) {
      const dtapTemplate = texts.powerWarningDtapDetail || '';
      const value = hasDtapRating ? formatCurrentValue(Number(dtapLimit) || 0) : '–';
      dtapDetailElem.textContent = dtapTemplate.replace('{max}', value);
    }

    if (adviceElem) {
      let advice = texts.powerWarningAdvice || '';
      if (!dtapAllowed) {
        advice += ` ${texts.powerWarningDtapAdvice || ''}`.trim();
      }
      adviceElem.textContent = advice.trim();
    }

    const keyParts = [
      safeBatteryName,
      formattedCurrent,
      hasPinLimit ? formatCurrentValue(Number(pinLimit) || 0) : 'no-pin',
      hasDtapRating ? formatCurrentValue(Number(dtapLimit) || 0) : 'no-dtap',
      dtapAllowed ? 'dtap-allowed' : 'dtap-blocked',
    ];
    const nextKey = keyParts.join('|');

    if (dismissedPowerWarningKey && dismissedPowerWarningKey !== nextKey) {
      dismissedPowerWarningKey = '';
    }

    currentPowerWarningKey = nextKey;
    if (dismissedPowerWarningKey === nextKey) {
      return;
    }

    const isDialogOpen = getGlobal('isDialogOpen');
    const openDialog = getGlobal('openDialog');
    if (typeof isDialogOpen === 'function' && typeof openDialog === 'function') {
      if (!isDialogOpen(dialog)) {
        openDialog(dialog);
      }
    } else if (typeof dialog.setAttribute === 'function') {
      dialog.setAttribute('open', '');
    }
  }

  function setStatusLevel(element, level) {
    const fn = getGlobal('setStatusLevel');
    if (typeof fn === 'function') {
      fn(element, level);
    }
  }

  function drawPowerDiagram(availableWatt, segments, maxPinA) {
    if (typeof document === 'undefined') {
      return;
    }
    const elements = ensureResultsElements();
    const powerDiagram = elements.powerDiagram;
    const powerDiagramBar = elements.powerDiagramBar;
    const powerDiagramLegend = elements.powerDiagramLegend;
    const maxPowerText = elements.maxPowerText;

    if (!powerDiagram || !powerDiagramBar || !powerDiagramLegend || !maxPowerText) {
      return;
    }

    if (!availableWatt || availableWatt <= 0) {
      if (powerDiagram.classList) powerDiagram.classList.add('hidden');
      powerDiagramBar.innerHTML = '';
      powerDiagramLegend.innerHTML = '';
      maxPowerText.textContent = '';
      setStatusLevel(maxPowerText, null);
      return;
    }

    if (powerDiagram.classList) powerDiagram.classList.remove('hidden');
    powerDiagramBar.innerHTML = '';
    powerDiagramLegend.innerHTML = '';

    const MAX_WIDTH = 300;
    const total = Array.isArray(segments)
      ? segments.reduce((sum, seg) => sum + (seg && Number(seg.power) || 0), 0)
      : 0;
    const scale = MAX_WIDTH / Math.max(availableWatt, total);
    const limitPos = availableWatt * scale;

    if (Array.isArray(segments)) {
      segments.forEach(seg => {
        if (!seg) return;
        const width = seg.power * scale;
        if (!Number.isFinite(width) || width <= 0) return;
        const div = document.createElement('div');
        div.className = `segment ${seg.className || ''}`.trim();
        div.style.width = `${width}px`;
        div.setAttribute('title', `${seg.label} ${seg.power.toFixed(1)} W`);
        powerDiagramBar.appendChild(div);

        const legendItem = document.createElement('span');
        const swatch = document.createElement('span');
        swatch.className = `swatch ${seg.className || ''}`.trim();
        legendItem.appendChild(swatch);
        legendItem.appendChild(document.createTextNode((seg.label || '').replace(/:$/, '')));
        powerDiagramLegend.appendChild(legendItem);
      });
    }

    if (total > availableWatt) {
      const over = document.createElement('div');
      over.className = 'over-usage';
      over.style.left = `${limitPos}px`;
      powerDiagramBar.appendChild(over);
    }

    const limit = document.createElement('div');
    limit.className = 'limit-line';
    limit.style.left = `${limitPos}px`;
    if (typeof maxPinA === 'number' && maxPinA > 0) {
      const label = document.createElement('span');
      label.className = 'limit-label';
      const lang = getGlobal('currentLang') || 'en';
      const texts = getLanguageTexts(lang);
      label.textContent = `${texts.pinLabel || 'Pin'} ${maxPinA} A`;
      limit.appendChild(label);
    }
    powerDiagramBar.appendChild(limit);

    if (powerDiagram.classList) {
      powerDiagram.classList.toggle('over', total > availableWatt);
    }
    const lang = getGlobal('currentLang') || 'en';
    const texts = getLanguageTexts(lang);
    maxPowerText.textContent = `${texts.availablePowerLabel || 'Available power'} ${availableWatt.toFixed(0)} W`;
    setStatusLevel(maxPowerText, total > availableWatt ? 'danger' : null);
  }

  function renderTemperatureNote(baseHours) {
    const container = ensureResultsElements().temperatureNote;
    if (!container) return;
    const lang = getGlobal('currentLang') || 'en';
    const texts = getLanguageTexts(lang);
    const heading = texts.temperatureNoteHeading || '';
    let html = heading ? `<p>${heading}</p>` : '';
    if (!baseHours || !Number.isFinite(baseHours)) {
      container.innerHTML = html;
      return;
    }
    const label = getTemperatureColumnLabelForLang(lang, temperatureUnit);
    html += `<table><tr><th>${label}</th><th>${texts.runtimeLabel || 'Runtime'}</th><th>${texts.batteryCountTempLabel || ''}</th></tr>`;
    TEMPERATURE_SCENARIOS.forEach(scenario => {
      const runtime = baseHours * scenario.factor;
      const runtimeCell = Number.isFinite(runtime) ? runtime.toFixed(2) : '0.00';
      let batteries = '–';
      if (Number.isFinite(runtime) && runtime > 0) {
        batteries = Math.ceil(10 / runtime);
      }
      const temperatureCell = formatTemperatureForDisplay(scenario.celsius, { includeSign: true, lang });
      html += `<tr><td style="color:${scenario.color}">${temperatureCell}</td><td>${runtimeCell}</td><td>${batteries}</td></tr>`;
    });
    html += '</table>';
    container.innerHTML = html;
  }

  function ensureFeedbackTemperatureOptions(select) {
    if (!select) return;
    const expectedOptions = FEEDBACK_TEMPERATURE_MAX - FEEDBACK_TEMPERATURE_MIN + 2;
    if (select.options.length === expectedOptions) {
      return;
    }
    const previousValue = select.value;
    select.innerHTML = '';
    const emptyOpt = document.createElement('option');
    emptyOpt.value = '';
    emptyOpt.textContent = '';
    select.appendChild(emptyOpt);
    for (let temp = FEEDBACK_TEMPERATURE_MIN; temp <= FEEDBACK_TEMPERATURE_MAX; temp += 1) {
      const opt = document.createElement('option');
      opt.value = String(temp);
      select.appendChild(opt);
    }
    if (previousValue) {
      select.value = previousValue;
    }
  }

  function updateFeedbackTemperatureOptions(lang, unit) {
    if (typeof document === 'undefined') {
      return;
    }
    const tempSelect = document.getElementById('fbTemperature');
    if (!tempSelect) return;
    ensureFeedbackTemperatureOptions(tempSelect);
    Array.from(tempSelect.options).forEach(option => {
      if (!option) return;
      if (option.value === '') {
        option.textContent = '';
        return;
      }
      const celsiusValue = Number(option.value);
      if (!Number.isFinite(celsiusValue)) return;
      option.textContent = formatTemperatureForDisplay(celsiusValue, {
        lang: lang || getGlobal('currentLang'),
        unit: unit || temperatureUnit,
        includeSign: 'negative',
      });
    });
  }

  function updateFeedbackTemperatureLabel(lang, unit) {
    if (typeof document === 'undefined') {
      return;
    }
    const labelTextElem = document.getElementById('fbTemperatureLabelText');
    const labelElem = document.getElementById('fbTemperatureLabel');
    if (!labelTextElem && !labelElem) {
      return;
    }
    const label = `${getTemperatureColumnLabelForLang(lang || getGlobal('currentLang'), unit || temperatureUnit)}:`;
    if (labelTextElem) {
      labelTextElem.textContent = label;
    } else if (labelElem) {
      labelElem.textContent = label;
    }
  }

  function refreshFeedbackTemperatureLabel(lang, unit) {
    try {
      updateFeedbackTemperatureLabel(lang, unit);
    } catch (error) {
      safeWarn('cineResults: Failed to update feedback temperature label', error);
      const labelTextElem = typeof document !== 'undefined'
        ? document.getElementById('fbTemperatureLabelText')
        : null;
      const labelElem = typeof document !== 'undefined'
        ? document.getElementById('fbTemperatureLabel')
        : null;
      if (!labelTextElem && !labelElem) {
        return;
      }
      const label = `${getTemperatureColumnLabelForLang(lang || getGlobal('currentLang'), unit || temperatureUnit)}:`;
      if (labelTextElem) {
        labelTextElem.textContent = label;
      } else if (labelElem) {
        labelElem.textContent = label;
      }
    }
  }

  function applyTemperatureUnitPreference(unit, options) {
    const normalized = normalizeTemperatureUnit(unit);
    const { persist = true, reRender = true, forceUpdate = false } = options || {};
    if (!forceUpdate && temperatureUnit === normalized) {
      return;
    }
    temperatureUnit = normalized;
    if (persist && typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(TEMPERATURE_STORAGE_KEY, temperatureUnit);
      } catch (error) {
        safeWarn('cineResults: Could not save temperature unit preference', error);
      }
    }
    const settingsTemperatureUnit = getGlobal('settingsTemperatureUnit');
    if (settingsTemperatureUnit) {
      settingsTemperatureUnit.value = temperatureUnit;
    }
    if (reRender) {
      refreshFeedbackTemperatureLabel();
      updateFeedbackTemperatureOptions();
      renderTemperatureNote(lastRuntimeHours);
    }
  }

  function setLastRuntimeHours(value) {
    if (Number.isFinite(value) || value === null || value === Infinity) {
      lastRuntimeHours = value;
    } else {
      lastRuntimeHours = null;
    }
  }

  function getLastRuntimeHours() {
    return lastRuntimeHours;
  }

  function getCurrentSetupKey() {
    const safeSelectValue = select => (
      select && typeof select.value === 'string'
        ? select.value
        : ''
    );

    const safeListValues = list => (
      Array.isArray(list)
        ? list
            .map(sel => safeSelectValue(sel))
            .filter(value => value && value !== 'None')
            .sort()
            .join(',')
        : ''
    );

    const cameraSelect = getGlobal('cameraSelect');
    const monitorSelect = getGlobal('monitorSelect');
    const videoSelect = getGlobal('videoSelect');
    const cageSelect = getGlobal('cageSelect');
    const motorSelects = getGlobal('motorSelects');
    const controllerSelects = getGlobal('controllerSelects');
    const distanceSelect = getGlobal('distanceSelect');
    const batterySelect = getGlobal('batterySelect');
    const hotswapSelect = getGlobal('hotswapSelect');
    const getSelectedPlate = getGlobal('getSelectedPlate');

    const camera = safeSelectValue(cameraSelect);
    const monitor = safeSelectValue(monitorSelect);
    const video = safeSelectValue(videoSelect);
    const cage = safeSelectValue(cageSelect);
    const motors = safeListValues(Array.isArray(motorSelects) ? motorSelects : []);
    const controllers = safeListValues(Array.isArray(controllerSelects) ? controllerSelects : []);
    const distance = safeSelectValue(distanceSelect);
    const battery = safeSelectValue(batterySelect);
    const hotswap = safeSelectValue(hotswapSelect);
    const plate = typeof getSelectedPlate === 'function' ? (getSelectedPlate() || '') : '';

    return [camera, monitor, video, cage, motors, controllers, distance, battery, hotswap, plate].join('|');
  }

  function deleteFeedbackEntry(key, index) {
    const loadFeedbackSafe = getGlobal('loadFeedbackSafe');
    const saveFeedbackSafe = getGlobal('saveFeedbackSafe');
    if (typeof loadFeedbackSafe !== 'function' || typeof saveFeedbackSafe !== 'function') {
      return;
    }
    const feedbackData = loadFeedbackSafe();
    if (feedbackData[key]) {
      feedbackData[key].splice(index, 1);
      if (!feedbackData[key].length) {
        delete feedbackData[key];
      }
      saveFeedbackSafe(feedbackData);
      const updateCalculations = getGlobal('updateCalculations');
      if (typeof updateCalculations === 'function') {
        updateCalculations();
      }
    }
  }

  function renderFeedbackTable(currentKey) {
    if (typeof document === 'undefined') {
      return null;
    }
    const container = ensureResultsElements().feedbackTableContainer || document.getElementById('feedbackTableContainer');
    const table = ensureResultsElements().userFeedbackTable || document.getElementById('userFeedbackTable');
    const loadFeedbackSafe = getGlobal('loadFeedbackSafe');
    const devices = getGlobal('devices');
    const cameraSelect = getGlobal('cameraSelect');
    const monitorSelect = getGlobal('monitorSelect');
    const videoSelect = getGlobal('videoSelect');
    const motorSelects = getGlobal('motorSelects') || [];
    const controllerSelects = getGlobal('controllerSelects') || [];
    const distanceSelect = getGlobal('distanceSelect');
    const texts = getGlobal('texts') || {};
    const currentLang = getGlobal('currentLang') || 'en';

    if (typeof loadFeedbackSafe !== 'function') {
      if (table) {
        table.innerHTML = '';
        table.classList.add('hidden');
      }
      if (container) container.classList.add('hidden');
      return null;
    }

    const feedbackData = loadFeedbackSafe();
    const entries = (feedbackData[currentKey] || []).map(entry => {
      const rest = { ...entry };
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

    const columns = [
      { key: 'username', label: 'User' },
      { key: 'date', label: 'Date' },
      { key: 'cameraWifi', label: 'WIFI' },
      { key: 'resolution', label: 'Res' },
      { key: 'codec', label: 'Codec' },
      { key: 'framerate', label: 'FPS' },
      { key: 'firmware', label: 'Firmware' },
      { key: 'batteryAge', label: 'Battery Age' },
      { key: 'monitorBrightness', label: 'Monitor Brightness' },
      { key: 'temperature', label: 'temp' },
      { key: 'charging', label: 'Charging' },
      { key: 'runtime', label: 'runtime' },
      { key: 'batteriesPerDay', label: 'batteries a day' },
      { key: 'weighting', label: 'weight' },
    ];

    const parseResolution = str => {
      if (!str) return null;
      const s = String(str).toLowerCase();
      const kMatch = s.match(/(\d+(?:\.\d+)?)\s*k/);
      if (kMatch) return parseFloat(kMatch[1]) * 1000;
      const pMatch = s.match(/(\d{3,4})p/);
      if (pMatch) return parseInt(pMatch[1], 10);
      const xMatch = s.match(/x\s*(\d{3,4})/);
      if (xMatch) return parseInt(xMatch[1], 10);
      const numMatch = s.match(/(\d{3,4})/);
      return numMatch ? parseInt(numMatch[1], 10) : null;
    };

    const parseFramerate = str => {
      if (!str) return null;
      const m = String(str).match(/\d+(?:\.\d+)?/);
      return m ? parseFloat(m[0]) : null;
    };

    const tempFactor = temp => {
      if (Number.isNaN(temp)) return 1;
      if (temp >= 25) return 1;
      if (temp >= 0) return 1 + (25 - temp) * 0.01;
      if (temp >= -10) return 1.25 + (-temp) * 0.035;
      if (temp >= -20) return 1.6 + (-10 - temp) * 0.04;
      return 2;
    };

    const resolutionWeight = res => {
      if (res >= 12000) return 3;
      if (res >= 8000) return 2;
      if (res >= 4000) return 1.5;
      if (res >= 1080) return 1;
      return res / 1080;
    };

    const codecWeight = codec => {
      if (!codec) return 1;
      const c = String(codec).toLowerCase();
      if (/(prores\s*raw|braw|arriraw|r3d|redcode|cinema\s*dng|cdng|canon\s*raw|x-ocn|raw)/.test(c)) {
        return 1;
      }
      if (/prores/.test(c)) return 1.1;
      if (/dnx|avid/.test(c)) return 1.2;
      if (/\ball[\s-]?i\b|all\s*intra|intra/.test(c)) return 1.3;
      if (/h265|h\.265|hevc|xavc\s*hs|xhevc/.test(c)) return 1.7;
      if (/h264|h\.264|avc|xavc|avchd|mpeg-4/.test(c)) return 1.5;
      return 1;
    };

    const camPower = devices?.cameras?.[cameraSelect?.value]?.powerDrawWatts || 0;
    const monitorPower = devices?.monitors?.[monitorSelect?.value]?.powerDrawWatts || 0;
    const videoPower = devices?.video?.[videoSelect?.value]?.powerDrawWatts || 0;
    const motorPower = (Array.isArray(motorSelects) ? motorSelects : []).reduce(
      (sum, sel) => sum + (devices?.fiz?.motors?.[sel.value]?.powerDrawWatts || 0),
      0,
    );
    const controllerPower = (Array.isArray(controllerSelects) ? controllerSelects : []).reduce(
      (sum, sel) => sum + (devices?.fiz?.controllers?.[sel.value]?.powerDrawWatts || 0),
      0,
    );
    const distancePower = devices?.fiz?.distance?.[distanceSelect?.value]?.powerDrawWatts || 0;
    const otherPower = videoPower + motorPower + controllerPower + distancePower;
    const totalPower = camPower + monitorPower + otherPower;
    const specBrightness = devices?.monitors?.[monitorSelect?.value]?.brightnessNits;

    let weightedSum = 0;
    let weightTotal = 0;
    let count = 0;
    const breakdown = entries.map(e => {
      const rt = parseFloat(e.runtime);
      if (Number.isNaN(rt)) return null;

      let camFactor = 1;
      let monitorFactor = 1;

      const res = parseResolution(e.resolution);
      if (res) camFactor *= resolutionWeight(res);

      const fps = parseFramerate(e.framerate);
      if (fps) camFactor *= fps / 24;

      const wifi = (e.cameraWifi || '').toLowerCase();
      if (wifi.includes('on')) camFactor *= 1.1;

      const codec = e.codec;
      if (codec) camFactor *= codecWeight(codec);

      const entryBrightness = parseFloat(e.monitorBrightness);
      if (!Number.isNaN(entryBrightness) && specBrightness) {
        const ratio = entryBrightness / specBrightness;
        if (ratio < 1) monitorFactor *= ratio;
      }

      let weight = 1;
      if (totalPower > 0) {
        weight =
          (camFactor * camPower + monitorFactor * monitorPower + otherPower) /
          totalPower;
      }

      const temp = parseFloat(e.temperature);
      const tempMul = tempFactor(temp);
      const adjustedRuntime = rt * tempMul;

      weightedSum += adjustedRuntime * weight;
      weightTotal += weight;
      count += 1;

      return {
        temperature: tempMul,
        resolution: res ? resolutionWeight(res) : 1,
        framerate: fps ? fps / 24 : 1,
        wifi: wifi.includes('on') ? 1.1 : 1,
        codec: codec ? codecWeight(codec) : 1,
        monitor: monitorFactor,
        weight,
      };
    });

    const maxWeight = Math.max(...breakdown.filter(Boolean).map(b => b.weight), 0);

    const escapeHtml = getGlobal('escapeHtml') || (value => String(value));
    const iconMarkup = getGlobal('iconMarkup') || (() => '');
    const ICON_GLYPHS = getGlobal('ICON_GLYPHS') || {};
    const formatDateString = getGlobal('formatDateString') || (value => value || '');

    let html = '<tr>' + columns.map(c => `<th>${escapeHtml(c.label)}</th>`).join('') + '<th></th></tr>';
    const deleteFeedbackLabel =
      texts[currentLang]?.deleteSetupBtn
      || texts.en?.deleteSetupBtn
      || 'Delete';

    entries.forEach((entry, index) => {
      html += '<tr>';
      columns.forEach(c => {
        if (c.key === 'weighting') {
          const b = breakdown[index];
          if (b) {
            const percent = maxWeight ? (b.weight / maxWeight) * 100 : 0;
            const share = b.weight * 100;
            const tooltip =
              `Temp ×${b.temperature.toFixed(2)}\n`
              + `Res ×${b.resolution.toFixed(2)}\n`
              + `FPS ×${b.framerate.toFixed(2)}\n`
              + `Codec ×${b.codec.toFixed(2)}\n`
              + `Wi-Fi ×${b.wifi.toFixed(2)}\n`
              + `Monitor ×${b.monitor.toFixed(2)}\n`
              + `Share ${share.toFixed(1)}%`;
            html +=
              `<td><div class="weightingRow"><div class="barContainer"><div class="weightBar" style="width:${percent}%" title="${escapeHtml(tooltip)}"></div></div><span class="weightingPercent">${share.toFixed(1)}%</span></div></td>`;
          } else {
            html += '<td></td>';
          }
        } else if (c.key === 'date') {
          html += `<td>${escapeHtml(formatDateString(entry[c.key]))}</td>`;
        } else {
          html += `<td>${escapeHtml(entry[c.key] || '')}</td>`;
        }
      });
      html += `<td><button data-key="${encodeURIComponent(currentKey)}" data-index="${index}" class="deleteFeedbackBtn">${iconMarkup(ICON_GLYPHS.trash, 'btn-icon')}${escapeHtml(deleteFeedbackLabel)}</button></td>`;
      html += '</tr>';
    });

    if (table) {
      table.innerHTML = html;
      table.classList.remove('hidden');
      table.querySelectorAll('.deleteFeedbackBtn').forEach(btn => {
        btn.setAttribute('aria-label', deleteFeedbackLabel);
        btn.setAttribute('title', deleteFeedbackLabel);
        btn.addEventListener('click', () => {
          const key = decodeURIComponent(btn.dataset.key);
          const idx = parseInt(btn.dataset.index, 10);
          deleteFeedbackEntry(key, idx);
        });
      });
    }
    if (container) container.classList.remove('hidden');

    if (count >= 3 && weightTotal > 0) {
      return { runtime: weightedSum / weightTotal, count, weight: weightTotal };
    }

    return { runtime: null, count, weight: weightTotal };
  }

  ensureResultsElements();

  const resultsAPI = freezeDeep({
    constants: freezeDeep({
      TEMPERATURE_STORAGE_KEY,
      TEMPERATURE_UNITS,
      TEMPERATURE_SCENARIOS,
      FEEDBACK_TEMPERATURE_MIN,
      FEEDBACK_TEMPERATURE_MAX,
    }),
    normalizeTemperatureUnit,
    convertCelsiusToUnit,
    getTemperatureUnitSymbolForLang,
    getTemperatureUnitLabelForLang,
    getTemperatureColumnLabelForLang,
    formatTemperatureForDisplay,
    ensureResultsElements,
    resolveResultsTargets,
    drawPowerDiagram,
    closePowerWarningDialog,
    dismissPowerWarningDialog,
    showPowerWarningDialog,
    renderTemperatureNote,
    ensureFeedbackTemperatureOptions,
    updateFeedbackTemperatureOptions,
    updateFeedbackTemperatureLabel,
    refreshFeedbackTemperatureLabel,
    applyTemperatureUnitPreference,
    getTemperatureUnit() {
      return temperatureUnit;
    },
    setTemperatureUnit(value) {
      temperatureUnit = normalizeTemperatureUnit(value);
    },
    setLastRuntimeHours,
    getLastRuntimeHours,
    getCurrentSetupKey,
    deleteFeedbackEntry,
    renderFeedbackTable,
  });

  registerOrQueueModule(
    'cineFeatureResults',
    resultsAPI,
    {
      category: 'feature',
      description: 'Power summary rendering, runtime feedback aggregation, and temperature helpers.',
      replace: true,
    },
    error => safeWarn('Unable to register cineFeatureResults module.', error),
  );

  const globalExports = [
    ['cineResults', resultsAPI],
    ['TEMPERATURE_STORAGE_KEY', TEMPERATURE_STORAGE_KEY],
    ['TEMPERATURE_UNITS', TEMPERATURE_UNITS],
    ['TEMPERATURE_SCENARIOS', TEMPERATURE_SCENARIOS],
    ['FEEDBACK_TEMPERATURE_MIN', FEEDBACK_TEMPERATURE_MIN],
    ['FEEDBACK_TEMPERATURE_MAX', FEEDBACK_TEMPERATURE_MAX],
    ['normalizeTemperatureUnit', normalizeTemperatureUnit],
    ['convertCelsiusToUnit', convertCelsiusToUnit],
    ['getTemperatureUnitSymbolForLang', getTemperatureUnitSymbolForLang],
    ['getTemperatureUnitLabelForLang', getTemperatureUnitLabelForLang],
    ['getTemperatureColumnLabelForLang', getTemperatureColumnLabelForLang],
    ['formatTemperatureForDisplay', formatTemperatureForDisplay],
    ['ensureFeedbackTemperatureOptions', ensureFeedbackTemperatureOptions],
    ['updateFeedbackTemperatureOptions', updateFeedbackTemperatureOptions],
    ['updateFeedbackTemperatureLabel', updateFeedbackTemperatureLabel],
    ['refreshFeedbackTemperatureLabel', refreshFeedbackTemperatureLabel],
    ['applyTemperatureUnitPreference', applyTemperatureUnitPreference],
    ['renderTemperatureNote', renderTemperatureNote],
    ['drawPowerDiagram', drawPowerDiagram],
    ['closePowerWarningDialog', closePowerWarningDialog],
    ['dismissPowerWarningDialog', dismissPowerWarningDialog],
    ['showPowerWarningDialog', showPowerWarningDialog],
    ['renderFeedbackTable', renderFeedbackTable],
    ['deleteFeedbackEntry', deleteFeedbackEntry],
    ['getCurrentSetupKey', getCurrentSetupKey],
  ];

  globalExports.forEach(([name, value]) => {
    exposeGlobal(name, value, { configurable: true, writable: true });
  });

  try {
    Object.defineProperty(GLOBAL_SCOPE, 'temperatureUnit', {
      configurable: true,
      get() {
        return temperatureUnit;
      },
      set(value) {
        temperatureUnit = normalizeTemperatureUnit(value);
      },
    });
  } catch (error) {
    void error;
    exposeGlobal('temperatureUnit', temperatureUnit, { configurable: true, writable: true });
  }

  try {
    Object.defineProperty(GLOBAL_SCOPE, 'lastRuntimeHours', {
      configurable: true,
      get() {
        return lastRuntimeHours;
      },
      set(value) {
        setLastRuntimeHours(value);
      },
    });
  } catch (error) {
    void error;
    exposeGlobal('lastRuntimeHours', lastRuntimeHours, { configurable: true, writable: true });
  }

  const assignCoreTemperatureNoteRenderer = getGlobal('assignCoreTemperatureNoteRenderer');
  if (typeof assignCoreTemperatureNoteRenderer === 'function') {
    assignCoreTemperatureNoteRenderer(renderTemperatureNote);
  }
})();
