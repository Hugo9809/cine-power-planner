const path = require('path');

const { setupModuleHarness } = require('../helpers/moduleHarness');

function createElement(initialText = '') {
  return {
    textContent: initialText,
    attributes: {},
    setAttribute(name, value) {
      this.attributes[name] = value;
    },
    removeAttribute(name) {
      delete this.attributes[name];
    },
  };
}

function createInteractiveElement(initialText = '') {
  const element = createElement(initialText);
  element.listeners = {};
  element.addEventListener = function addEventListener(eventName, handler) {
    this.listeners[eventName] = handler;
  };
  return element;
}

function createDatalistElement(initialValues = []) {
  let html = initialValues.map((value) => `<option value="${value}"></option>`).join('');
  return {
    get innerHTML() {
      return html;
    },
    set innerHTML(value) {
      html = value;
    },
  };
}

const FEEDBACK_FIELD_CONFIG = [
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
  { id: 'fbBatteriesPerDay', key: 'batteriesPerDay', trim: true },
];

describe('cineResults module', () => {
  let harness;
  let cineResults;

  const BASE_DEVICES = {
    cameras: { CameraA: { powerDrawWatts: 20 } },
    monitors: { MonitorA: { powerDrawWatts: 10, brightnessNits: 1000 } },
    video: { VideoA: { powerDrawWatts: 5 } },
    fiz: {
      motors: { MotorA: { powerDrawWatts: 2 } },
      controllers: { ControllerA: { powerDrawWatts: 3 } },
      distance: { DistanceA: { powerDrawWatts: 1 } },
    },
    batteries: {
      BatteryA: { capacity: 150, pinA: 10, dtapA: 5, mount_type: 'B-Mount' },
      BatteryB: { capacity: 100, pinA: 8, dtapA: 4, mount_type: 'B-Mount' },
    },
    batteryHotswaps: { HotswapA: { capacity: 30, pinA: 9 } },
  };

  const BASE_TEXTS = {
    en: {
      cameraLabel: 'Camera',
      monitorLabel: 'Monitor',
      videoLabel: 'Video',
      fizMotorsLabel: 'Motors',
      fizControllersLabel: 'Controllers',
      distanceLabel: 'Distance',
      warnHotswapLower: 'Hotswap max {max} vs battery {batt}',
      pinOk: 'Pin OK {max}',
      dtapOk: 'DTAP OK {max}',
      warnPinExceeded: 'Pin exceeded {current}/{max}',
      warnPinNear: 'Pin near {current}/{max}',
      warnDTapExceeded: 'DTAP exceeded {current}/{max}',
      warnDTapNear: 'DTAP near {current}/{max}',
      batteryTableBatteryHelp: 'Battery help',
      batteryTableRuntimeHelp: 'Runtime help',
      batteryTableGraphHelp: 'Graph help',
      batteryTableGraphLabel: 'Graph',
      batteryTableLabel: 'Battery',
      runtimeLabel: 'Runtime',
      noBatterySupports: 'No batteries',
      methodPinsOnly: 'Pins only',
      methodPinsAndDTap: 'Pins and DTAP',
      methodInfinite: 'Infinite',
      batteryComparisonTableHelp: 'Table help',
      batteryLifeLabel: 'Battery life',
      runtimeUserCountNote: 'Used by {count}',
      batteryLifeHelp: 'Life help',
      runtimeAverageNote: 'Average note',
      temperatureNoteHeading: 'Temperature impact on runtime:',
      temperatureLabel: 'Temperature',
      batteryCountTempLabel: 'Batteries needed',
      temperatureUnitSymbolCelsius: '°C',
      temperatureUnitSymbolFahrenheit: '°F',
      resultsPlainSummaryTitle: 'Quick summary',
      resultsPlainSummaryHelp: 'Plain summary help',
      resultsPlainSummaryPrompt: 'Add devices and choose a battery to see a plain-language summary of runtime and consumption.',
      resultsPlainSummaryNeedBattery: 'Choose a battery to see how long the rig will run and how many packs to pack.',
      resultsPlainSummaryRuntime:
        'With {batteryName}, expect about {hours} hours of runtime. Pack {batteryCount} batteries for a 10-hour day. Your rig currently draws {totalPower} W.',
      resultsPlainSummaryUnlimited:
        'With {batteryName}, your rig draws {totalPower} W, so runtime stays unlimited. Keep a charged pack connected before recording.',
      resultsPlainSummaryNote: 'Pins and D-Tap status updates as you add gear.',
      resultsPlainSummaryPinsZero: 'Pins: no 12V draw yet.',
      resultsPlainSummaryPinsOk: 'Pins: {current}A within the {max}A limit.',
      resultsPlainSummaryPinsNear: 'Pins: {current}A is close to the {max}A limit.',
      resultsPlainSummaryPinsExceeded: 'Pins: {current}A exceeds the {max}A limit.',
      resultsPlainSummaryPinsUnknown: 'Pins: draw is {current}A but no limit is documented.',
      resultsPlainSummaryDtapZero: 'D-Tap: idle.',
      resultsPlainSummaryDtapOk: 'D-Tap: {current}A within the {max}A rating.',
      resultsPlainSummaryDtapNear: 'D-Tap: {current}A is close to the {max}A rating.',
      resultsPlainSummaryDtapExceeded: 'D-Tap: {current}A exceeds the {max}A rating.',
      resultsPlainSummaryDtapUnavailable: 'D-Tap: auxiliary port disabled for this battery selection.',
      resultsPlainSummaryDtapUnavailableBMount: 'D-Tap: B-Mount cameras disable the aux port.',
      resultsPlainSummaryDtapUnknown: 'D-Tap: rating missing, treat {current}A with caution.',
      resultsPlainSummaryUnnamedBattery: 'your selected battery',
    },
  };

  function loadModule() {
    harness = setupModuleHarness();
    jest.isolateModules(() => {
      cineResults = require(path.join('..', '..', 'src', 'scripts', 'modules', 'results.js'));
    });
  }

  beforeEach(() => {
    loadModule();
  });

  afterEach(() => {
    if (harness) {
      harness.teardown();
      harness = null;
    }
    cineResults = null;
  });

  test('localizeResultsSection applies translations, help text, and runtime feedback summaries', () => {
    const doc = { getElementById: jest.fn(() => null) };

    const elements = {
      resultsPlainSummaryElem: createElement(''),
      resultsPlainSummaryTitleElem: createElement('Existing summary title'),
      resultsPlainSummaryTextElem: createElement('Existing summary text'),
      resultsPlainSummaryNoteElem: createElement('Existing summary note'),
      breakdownListElem: createElement('Existing help'),
      totalPowerLabel: createElement('Total Power (existing)'),
      batteryCountLabel: createElement('Battery count'),
      batteryLifeLabel: createElement('Battery life (hrs)'),
      batteryLifeUnit: createElement('hr'),
      runtimeAverageNote: createElement(''),
      tempNote: createElement(''),
      pinWarning: createElement(''),
      dtapWarning: createElement(''),
      hotswapWarning: createElement(''),
      powerWarningTitle: createElement(''),
      powerWarningAdvice: createElement(''),
      powerWarningLimitsHeading: createElement(''),
      powerWarningCloseBtn: createInteractiveElement('Close'),
    };

    const refreshTotalCurrentLabels = jest.fn();
    const updateMountVoltageSettingLabels = jest.fn();
    const dispatchTemperatureNoteRender = jest.fn();
    const refreshFeedbackTemperatureLabel = jest.fn();
    const updateFeedbackTemperatureOptions = jest.fn();
    const setButtonLabelWithIcon = jest.fn();
    const renderFeedbackTable = jest.fn().mockReturnValue({ count: 6 });
    const getCurrentSetupKey = jest.fn().mockReturnValue('setup-1');

    const success = cineResults.localizeResultsSection({
      document: doc,
      lang: 'en',
      langTexts: {
        breakdownListHelp: 'Power distribution details',
        resultsPlainSummaryTitle: 'Quick recap',
        resultsPlainSummaryHelp: 'Plain summary help',
        resultsPlainSummaryPrompt: 'Add gear for summary.',
        resultsPlainSummaryNeedBattery: 'Pick a battery to get runtime.',
        resultsPlainSummaryRuntime: '{batteryName} {hours}h {batteryCount} packs {totalPower}W',
        resultsPlainSummaryUnlimited: 'Unlimited with {batteryName} at {totalPower}W',
        resultsPlainSummaryNote: 'Pins and D-Tap status updates as you add gear.',
        resultsPlainSummaryPinsZero: 'Pins idle.',
        resultsPlainSummaryPinsOk: 'Pins OK {current}/{max}.',
        resultsPlainSummaryPinsNear: 'Pins near {current}/{max}.',
        resultsPlainSummaryPinsExceeded: 'Pins exceeded {current}/{max}.',
        resultsPlainSummaryPinsUnknown: 'Pins unknown {current}.',
        resultsPlainSummaryDtapZero: 'DTAP idle.',
        resultsPlainSummaryDtapOk: 'DTAP OK {current}/{max}.',
        resultsPlainSummaryDtapNear: 'DTAP near {current}/{max}.',
        resultsPlainSummaryDtapExceeded: 'DTAP exceeded {current}/{max}.',
        resultsPlainSummaryDtapUnavailable: 'DTAP disabled.',
        resultsPlainSummaryDtapUnavailableBMount: 'DTAP off for B-Mount.',
        resultsPlainSummaryDtapUnknown: 'DTAP unknown {current}.',
        resultsPlainSummaryUnnamedBattery: 'your selected battery',
        totalPowerLabel: 'Total Power',
        totalPowerHelp: 'Shows the maximum draw.',
        batteryCountLabel: 'Batteries needed',
        batteryCountHelp: 'Calculated based on consumption.',
        pinWarningHelp: 'Check safe pin usage.',
        dtapWarningHelp: 'DTAP ports have limits.',
        hotswapWarningHelp: 'Monitor hot swapping procedure.',
        powerWarningTitle: 'Safety warnings',
        powerWarningAdvice: 'Reduce load or switch batteries.',
        powerWarningLimitsHeading: 'Critical limits',
        powerWarningClose: 'All clear',
        batteryLifeUnit: 'hours',
        batteryLifeLabel: 'Battery life',
        batteryLifeHelp: 'Typical runtime under current load.',
        runtimeUserCountNote: 'Used by {count} operators',
        runtimeAverageNote: 'Average runtime built from verified submissions.',
        temperatureNoteHelp: 'Temperature impact explanation',
      },
      fallbackTexts: {
        powerWarningTitle: 'Fallback title',
      },
      elements,
      refreshTotalCurrentLabels,
      updateMountVoltageSettingLabels,
      dispatchTemperatureNoteRender,
      refreshFeedbackTemperatureLabel,
      updateFeedbackTemperatureOptions,
      setButtonLabelWithIcon,
      iconGlyphs: { check: '✔' },
      renderFeedbackTable,
      getCurrentSetupKey,
      lastRuntimeHours: 3,
      temperatureUnit: 'C',
    });

    expect(success).toBe(true);
    expect(elements.resultsPlainSummaryElem.attributes['data-help']).toBe('Plain summary help');
    expect(elements.resultsPlainSummaryTitleElem.textContent).toBe('Quick recap');
    expect(elements.resultsPlainSummaryTextElem.textContent).toBe('Add gear for summary.');
    expect(elements.resultsPlainSummaryNoteElem.textContent).toBe(
      'Pins and D-Tap status updates as you add gear.',
    );
    expect(elements.breakdownListElem.attributes['data-help']).toBe('Power distribution details');
    expect(elements.totalPowerLabel.textContent).toBe('Total Power');
    expect(elements.totalPowerLabel.attributes['data-help']).toBe('Shows the maximum draw.');
    expect(elements.batteryCountLabel.textContent).toBe('Batteries needed');
    expect(elements.batteryCountLabel.attributes['data-help']).toBe('Calculated based on consumption.');
    expect(elements.pinWarning.attributes['data-help']).toBe('Check safe pin usage.');
    expect(elements.powerWarningTitle.textContent).toBe('Safety warnings');
    expect(elements.powerWarningAdvice.textContent).toBe('Reduce load or switch batteries.');
    expect(elements.powerWarningLimitsHeading.textContent).toBe('Critical limits');
    expect(setButtonLabelWithIcon).toHaveBeenCalledWith(
      elements.powerWarningCloseBtn,
      'All clear',
      '✔',
    );
    expect(elements.batteryLifeUnit.textContent).toBe('hours');
    expect(elements.batteryLifeLabel.textContent).toBe('Battery life (Used by 6 operators)');
    expect(elements.batteryLifeLabel.attributes['data-help']).toBe('Typical runtime under current load.');
    expect(elements.runtimeAverageNote.textContent).toBe('Average runtime built from verified submissions.');
    expect(elements.tempNote.attributes['data-help']).toBe('Temperature impact explanation');

    expect(refreshTotalCurrentLabels).toHaveBeenCalledWith('en');
    expect(updateMountVoltageSettingLabels).toHaveBeenCalledWith('en');
    expect(dispatchTemperatureNoteRender).toHaveBeenCalledWith(3);
    expect(refreshFeedbackTemperatureLabel).toHaveBeenCalledWith('en', 'C');
    expect(updateFeedbackTemperatureOptions).toHaveBeenCalledWith('en', 'C');
    expect(renderFeedbackTable).toHaveBeenCalledWith('setup-1');
  });

  test('localizeBatteryComparisonSection localizes headings and descriptions', () => {
    const doc = { getElementById: jest.fn(() => null) };
    const heading = createElement('Existing heading');
    const description = createElement('Existing description');
    const table = createElement('');

    const localized = cineResults.localizeBatteryComparisonSection({
      document: doc,
      langTexts: {
        batteryComparisonHeading: 'Compare battery families',
        batteryComparisonHeadingHelp: 'Shows alternative battery options.',
        batteryComparisonDescription: 'Review the estimated runtime versus weight.',
        batteryComparisonDescriptionHelp: 'Explains how to read the comparison.',
        batteryComparisonTableHelp: 'Detailed battery performance table.',
      },
      elements: {
        batteryComparisonHeading: heading,
        batteryComparisonDescription: description,
        batteryComparisonTable: table,
      },
    });

    expect(localized).toBe(true);
    expect(heading.textContent).toBe('Compare battery families');
    expect(heading.attributes['data-help']).toBe('Shows alternative battery options.');
    expect(description.textContent).toBe('Review the estimated runtime versus weight.');
    expect(description.attributes['data-help']).toBe('Explains how to read the comparison.');
    expect(table.attributes['data-help']).toBe('Detailed battery performance table.');
  });

  test('renderTemperatureNote renders the temperature adjustment table', () => {
    const texts = JSON.parse(JSON.stringify(BASE_TEXTS));
    const tempNote = createElement('');
    const doc = {
      documentElement: { lang: 'en' },
      getElementById: jest.fn((id) => (id === 'temperatureNote' ? tempNote : null)),
    };

    const elements = {
      resultsPlainSummaryElem: createElement(''),
      resultsPlainSummaryTitleElem: createElement(''),
      resultsPlainSummaryTextElem: createElement(''),
      resultsPlainSummaryNoteElem: createElement(''),
      breakdownListElem: createElement(''),
      totalPowerLabel: createElement(''),
      batteryCountLabel: createElement(''),
      batteryLifeLabel: createElement(''),
      batteryLifeUnit: createElement(''),
      runtimeAverageNote: createElement(''),
      tempNote,
      pinWarning: createElement(''),
      dtapWarning: createElement(''),
      hotswapWarning: createElement(''),
      powerWarningTitle: createElement(''),
      powerWarningAdvice: createElement(''),
      powerWarningLimitsHeading: createElement(''),
      powerWarningCloseBtn: createInteractiveElement('Close'),
    };

    const refreshTotalCurrentLabels = jest.fn();
    const updateMountVoltageSettingLabels = jest.fn();
    const dispatchTemperatureNoteRender = jest.fn();
    const refreshFeedbackTemperatureLabel = jest.fn();
    const updateFeedbackTemperatureOptions = jest.fn();
    const setButtonLabelWithIcon = jest.fn();
    const renderFeedbackTable = jest.fn().mockReturnValue({ count: 0 });
    const getCurrentSetupKey = jest.fn().mockReturnValue('setup-temp');

    cineResults.localizeResultsSection({
      document: doc,
      lang: 'en',
      langTexts: texts.en,
      fallbackTexts: texts.en,
      elements,
      refreshTotalCurrentLabels,
      updateMountVoltageSettingLabels,
      dispatchTemperatureNoteRender,
      refreshFeedbackTemperatureLabel,
      updateFeedbackTemperatureOptions,
      setButtonLabelWithIcon,
      iconGlyphs: { check: '✔' },
      renderFeedbackTable,
      getCurrentSetupKey,
      getTexts: () => texts,
      getCurrentLang: () => 'en',
      getCollator: () => null,
    });

    global.temperatureUnit = 'celsius';
    cineResults.renderTemperatureNote(3.2);

    expect(tempNote.innerHTML).toContain('<table');
    expect(tempNote.innerHTML).toContain('Temperature (°C)');
    expect(tempNote.innerHTML).toContain('Batteries needed');
    expect(tempNote.innerHTML).toContain('3.20');

    global.temperatureUnit = 'fahrenheit';
    cineResults.renderTemperatureNote(3.2);

    expect(tempNote.innerHTML).toContain('Temperature (°F)');
    expect(tempNote.innerHTML).toContain('°F');

    delete global.temperatureUnit;
  });

  test('updateCalculations delegates power and runtime processing', () => {
    const cameraSelect = { value: 'CameraA' };
    const monitorSelect = { value: 'MonitorA' };
    const videoSelect = { value: 'VideoA' };
    const distanceSelect = { value: 'DistanceA' };
    const batterySelect = {
      value: 'BatteryA',
      options: [{ textContent: 'BatteryA' }],
      selectedIndex: 0,
    };
    const hotswapSelect = { value: 'HotswapA' };
    const motorSelects = [{ value: 'MotorA' }];
    const controllerSelects = [{ value: 'ControllerA' }];

    const totalPowerElem = createElement('');
    const totalCurrent144Elem = createElement('');
    const totalCurrent12Elem = createElement('');
    const batteryLifeElem = createElement('');
    const batteryCountElem = createElement('');
    const batteryLifeLabelElem = createElement('');
    const runtimeAverageNoteElem = createElement('');
    const pinWarnElem = createElement('');
    const dtapWarnElem = createElement('');
    const hotswapWarnElem = createElement('');
    const batteryComparisonSection = { style: { display: 'none' } };
    const batteryTableElem = createElement('');
    batteryTableElem.innerHTML = '';
    const resultsPlainSummaryElem = createElement('');
    const resultsPlainSummaryTextElem = createElement('');
    const resultsPlainSummaryNoteElem = createElement('');

    const breakdownListElem = {
      _html: '',
      entries: [],
      insertAdjacentHTML: jest.fn(function insertAdjacentHTML(_, html) {
        this.entries.push(html);
      }),
      appendChild: jest.fn(),
      set innerHTML(value) {
        this._html = value;
        this.entries = [];
      },
      get innerHTML() {
        return this._html;
      },
    };

    const setupDiagramContainer = {};
    const doc = {
      createElement: jest.fn(() => ({ innerHTML: '', appendChild: jest.fn() })),
    };

    const devices = JSON.parse(JSON.stringify(BASE_DEVICES));

    const texts = JSON.parse(JSON.stringify(BASE_TEXTS));

    let lastRuntimeHoursValue = 1.2;
    const refreshTotalCurrentLabels = jest.fn();
    const updateBatteryOptions = jest.fn();
    const setStatusMessage = jest.fn((elem, message) => {
      if (elem) elem.textContent = message;
    });
    const setStatusLevel = jest.fn((elem, level) => {
      if (elem) elem.status = level;
    });
    const closePowerWarningDialog = jest.fn();
    const showPowerWarningDialog = jest.fn();
    const drawPowerDiagram = jest.fn();
    const renderFeedbackTable = jest.fn(() => ({ runtime: 2, weight: 1, count: 5 }));
    const getCurrentSetupKey = jest.fn(() => 'key-1');
    const renderTemperatureNote = jest.fn();
    const checkFizCompatibility = jest.fn();
    const checkFizController = jest.fn();
    const checkArriCompatibility = jest.fn();
    const renderSetupDiagram = jest.fn();
    const refreshGearListIfVisible = jest.fn();
    const supportsBMountCamera = jest.fn(() => true);
    const supportsGoldMountCamera = jest.fn(() => false);
    const getCssVariableValue = jest.fn(() => '#123456');
    const escapeHtml = (value) => String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
    const getLastRuntimeHours = jest.fn(() => lastRuntimeHoursValue);
    const setLastRuntimeHours = jest.fn((value) => {
      lastRuntimeHoursValue = value;
    });

    cineResults.updateCalculations({
      document: doc,
      elements: {
        cameraSelect,
        monitorSelect,
        videoSelect,
        distanceSelect,
        batterySelect,
        hotswapSelect,
        totalPowerElem,
        breakdownListElem,
        totalCurrent144Elem,
        totalCurrent12Elem,
        batteryLifeElem,
        batteryCountElem,
        batteryLifeLabelElem,
        runtimeAverageNoteElem,
        pinWarnElem,
        dtapWarnElem,
        hotswapWarnElem,
        batteryComparisonSection,
        batteryTableElem,
        setupDiagramContainer,
        resultsPlainSummaryElem,
        resultsPlainSummaryTextElem,
        resultsPlainSummaryNoteElem,
      },
      motorSelects,
      controllerSelects,
      getDevices: () => devices,
      getTexts: () => texts,
      getCurrentLang: () => 'en',
      getCollator: () => null,
      getSelectedPlate: () => 'B-Mount',
      getMountVoltageConfig: () => ({ high: 33.6, low: 21.6 }),
      refreshTotalCurrentLabels,
      updateBatteryOptions,
      setStatusMessage,
      setStatusLevel,
      closePowerWarningDialog,
      showPowerWarningDialog,
      drawPowerDiagram,
      renderFeedbackTable,
      getCurrentSetupKey,
      renderTemperatureNote,
      checkFizCompatibility,
      checkFizController,
      checkArriCompatibility,
      renderSetupDiagram,
      refreshGearListIfVisible,
      supportsBMountCamera,
      supportsGoldMountCamera,
      getCssVariableValue,
      escapeHtml,
      getLastRuntimeHours,
      setLastRuntimeHours,
    });

    expect(totalPowerElem.textContent).toBe('41.0');
    expect(totalCurrent144Elem.textContent).toBe('1.22');
    expect(totalCurrent12Elem.textContent).toBe('1.90');
    expect(Number(batteryLifeElem.textContent)).toBeCloseTo(3.2, 2);
    expect(batteryCountElem.textContent).toBe('4');
    expect(batteryLifeLabelElem.textContent).toContain('Used by 5');
    expect(batteryLifeLabelElem.attributes['data-help']).toBe('Life help');
    expect(runtimeAverageNoteElem.textContent).toBe('Average note');
    expect(resultsPlainSummaryTextElem.textContent).toBe(
      'With BatteryA, expect about 3.20 hours of runtime. Pack 4 batteries for a 10-hour day. Your rig currently draws 41.0 W.'
    );
    expect(resultsPlainSummaryNoteElem.textContent).toBe(
      'Pins: 1.90A within the 9A limit. D-Tap: B-Mount cameras disable the aux port.',
    );
    expect(pinWarnElem.textContent).toContain('Pin OK');
    expect(setStatusMessage).toHaveBeenCalledWith(
      hotswapWarnElem,
      expect.stringContaining('9'),
    );
    expect(setStatusLevel).toHaveBeenCalledWith(hotswapWarnElem, 'warning');
    expect(refreshTotalCurrentLabels).toHaveBeenCalledWith('en', 'B-Mount', { high: 33.6, low: 21.6 });
    expect(updateBatteryOptions).toHaveBeenCalled();
    expect(drawPowerDiagram).toHaveBeenCalled();
    expect(renderFeedbackTable).toHaveBeenCalledWith('key-1');
    expect(refreshGearListIfVisible).toHaveBeenCalled();
    expect(checkFizCompatibility).toHaveBeenCalled();
    expect(checkFizController).toHaveBeenCalled();
    expect(checkArriCompatibility).toHaveBeenCalled();
    expect(renderSetupDiagram).toHaveBeenCalled();
    expect(batteryComparisonSection.style.display).toBe('block');
    expect(batteryTableElem.innerHTML).toContain('BatteryB');
    const lastRuntimeRecorded = setLastRuntimeHours.mock.calls[setLastRuntimeHours.mock.calls.length - 1][0];
    expect(lastRuntimeRecorded).toBeCloseTo(3.195, 3);
    const temperatureNoteValue = renderTemperatureNote.mock.calls[renderTemperatureNote.mock.calls.length - 1][0];
    expect(temperatureNoteValue).toBeCloseTo(3.195, 3);
  });

  test('updateCalculations populates runtime feedback datalists with camera metadata', () => {
    const mountOptions = createDatalistElement(['PL', 'EF']);
    const resolutionOptions = createDatalistElement(['1080p']);
    const codecOptions = createDatalistElement([]);
    const framerateOptions = createDatalistElement([]);

    const datalistElements = {
      mountOptions,
      resolutionOptions,
      codecOptions,
      framerateOptions,
    };

    const doc = {
      getElementById: jest.fn((id) => datalistElements[id] || null),
      createElement: jest.fn(() => ({ innerHTML: '', appendChild: jest.fn() })),
    };

    const cameraSelect = { value: 'CameraA' };
    const monitorSelect = { value: 'None', options: [], selectedIndex: -1 };
    const videoSelect = { value: 'None', options: [], selectedIndex: -1 };
    const distanceSelect = { value: 'None', options: [], selectedIndex: -1 };
    const batterySelect = { value: 'None', options: [], selectedIndex: -1 };
    const hotswapSelect = { value: 'None' };
    const motorSelects = [];
    const controllerSelects = [];

    const totalPowerElem = createElement('');
    const totalCurrent144Elem = createElement('');
    const totalCurrent12Elem = createElement('');
    const batteryLifeElem = createElement('');
    const batteryCountElem = createElement('');
    const batteryLifeLabelElem = createElement('');
    const runtimeAverageNoteElem = createElement('');
    const pinWarnElem = createElement('');
    const dtapWarnElem = createElement('');
    const hotswapWarnElem = createElement('');
    const batteryComparisonSection = { style: { display: 'none' } };
    const batteryTableElem = createElement('');
    batteryTableElem.innerHTML = '';
    const resultsPlainSummaryElem = createElement('');
    const resultsPlainSummaryTextElem = createElement('');
    const resultsPlainSummaryNoteElem = createElement('');

    const breakdownListElem = {
      _html: '',
      entries: [],
      insertAdjacentHTML: jest.fn(function insertAdjacentHTML(_, html) {
        this.entries.push(html);
      }),
      appendChild: jest.fn(),
      set innerHTML(value) {
        this._html = value;
        this.entries = [];
      },
      get innerHTML() {
        return this._html;
      },
    };

    const setupDiagramContainer = {};

    const devices = JSON.parse(JSON.stringify(BASE_DEVICES));
    devices.cameras.CameraA.lensMount = [
      { type: 'LPL', mount: 'native' },
      { type: 'PL', mount: 'adapted' },
      { type: 'EF', mount: 'native' },
    ];
    devices.cameras.CameraA.resolutions = ['4.5K', '4K UHD', '1080p'];
    devices.cameras.CameraA.recordingCodecs = ['ARRIRAW', 'ProRes 4444 XQ'];
    devices.cameras.CameraA.frameRates = ['4.5K: up to 60 fps', 'HD: up to 200 fps'];

    const texts = JSON.parse(JSON.stringify(BASE_TEXTS));

    let lastRuntimeHoursValue = 1;
    const refreshTotalCurrentLabels = jest.fn();
    const updateBatteryOptions = jest.fn();
    const setStatusMessage = jest.fn();
    const setStatusLevel = jest.fn();
    const closePowerWarningDialog = jest.fn();
    const showPowerWarningDialog = jest.fn();
    const drawPowerDiagram = jest.fn();
    const renderFeedbackTable = jest.fn(() => null);
    const getCurrentSetupKey = jest.fn(() => 'key-2');
    const renderTemperatureNote = jest.fn();
    const checkFizCompatibility = jest.fn();
    const checkFizController = jest.fn();
    const checkArriCompatibility = jest.fn();
    const renderSetupDiagram = jest.fn();
    const refreshGearListIfVisible = jest.fn();
    const supportsBMountCamera = jest.fn(() => true);
    const supportsGoldMountCamera = jest.fn(() => true);
    const getCssVariableValue = jest.fn(() => '#000000');
    const escapeHtml = (value) => String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
    const getLastRuntimeHours = jest.fn(() => lastRuntimeHoursValue);
    const setLastRuntimeHours = jest.fn((value) => {
      lastRuntimeHoursValue = value;
    });

    cineResults.updateCalculations({
      document: doc,
      elements: {
        cameraSelect,
        monitorSelect,
        videoSelect,
        distanceSelect,
        batterySelect,
        hotswapSelect,
        totalPowerElem,
        breakdownListElem,
        totalCurrent144Elem,
        totalCurrent12Elem,
        batteryLifeElem,
        batteryCountElem,
        batteryLifeLabelElem,
        runtimeAverageNoteElem,
        pinWarnElem,
        dtapWarnElem,
        hotswapWarnElem,
        batteryComparisonSection,
        batteryTableElem,
        setupDiagramContainer,
        resultsPlainSummaryElem,
        resultsPlainSummaryTextElem,
        resultsPlainSummaryNoteElem,
      },
      motorSelects,
      controllerSelects,
      getDevices: () => devices,
      getTexts: () => texts,
      getCurrentLang: () => 'en',
      getCollator: () => null,
      getSelectedPlate: () => '',
      getMountVoltageConfig: () => ({ high: 34, low: 24 }),
      refreshTotalCurrentLabels,
      updateBatteryOptions,
      setStatusMessage,
      setStatusLevel,
      closePowerWarningDialog,
      showPowerWarningDialog,
      drawPowerDiagram,
      renderFeedbackTable,
      getCurrentSetupKey,
      renderTemperatureNote,
      checkFizCompatibility,
      checkFizController,
      checkArriCompatibility,
      renderSetupDiagram,
      refreshGearListIfVisible,
      supportsBMountCamera,
      supportsGoldMountCamera,
      getCssVariableValue,
      escapeHtml,
      getLastRuntimeHours,
      setLastRuntimeHours,
    });

    const parseValues = (html) => (
      html
        ? html.split('<option value="').slice(1).map((part) => part.split('"')[0])
        : []
    );

    expect(parseValues(mountOptions.innerHTML)).toEqual([
      'LPL (native)',
      'PL (adapted)',
      'EF (native)',
    ]);
    expect(parseValues(resolutionOptions.innerHTML)).toEqual([
      '4.5K',
      '4K UHD',
      '1080p',
    ]);
    expect(parseValues(codecOptions.innerHTML)).toEqual([
      'ARRIRAW',
      'ProRes 4444 XQ',
    ]);
    expect(parseValues(framerateOptions.innerHTML)).toEqual([
      '4.5K: up to 60 fps',
      'HD: up to 200 fps',
    ]);
  });

  test('updateCalculations uses preview selections when DOM inputs are empty', () => {
    const cameraSelect = { value: '', options: [], selectedIndex: -1 };
    const monitorSelect = { value: '', options: [], selectedIndex: -1 };
    const videoSelect = { value: '', options: [], selectedIndex: -1 };
    const distanceSelect = { value: '', options: [], selectedIndex: -1 };
    const batterySelect = { value: '', options: [], selectedIndex: -1 };
    const hotswapSelect = { value: '' };
    const motorSelects = [{ value: '' }];
    const controllerSelects = [{ value: '' }];

    const totalPowerElem = createElement('');
    const totalCurrent144Elem = createElement('');
    const totalCurrent12Elem = createElement('');
    const batteryLifeElem = createElement('');
    const batteryCountElem = createElement('');
    const batteryLifeLabelElem = createElement('');
    const runtimeAverageNoteElem = createElement('');
    const pinWarnElem = createElement('');
    const dtapWarnElem = createElement('');
    const hotswapWarnElem = createElement('');
    const batteryComparisonSection = { style: { display: 'none' } };
    const batteryTableElem = createElement('');
    batteryTableElem.innerHTML = '';
    const resultsPlainSummaryElem = createElement('');
    const resultsPlainSummaryTextElem = createElement('');
    const resultsPlainSummaryNoteElem = createElement('');

    const breakdownListElem = {
      _html: '',
      entries: [],
      insertAdjacentHTML: jest.fn(function insertAdjacentHTML(_, html) {
        this.entries.push(html);
      }),
      appendChild: jest.fn(),
      set innerHTML(value) {
        this._html = value;
        this.entries = [];
      },
      get innerHTML() {
        return this._html;
      },
    };

    const setupDiagramContainer = {};
    const doc = {
      createElement: jest.fn(() => ({ innerHTML: '', appendChild: jest.fn() })),
    };

    const devices = JSON.parse(JSON.stringify(BASE_DEVICES));
    const texts = JSON.parse(JSON.stringify(BASE_TEXTS));

    let lastRuntimeHoursValue = 1.2;
    const refreshTotalCurrentLabels = jest.fn();
    const updateBatteryOptions = jest.fn();
    const setStatusMessage = jest.fn((elem, message) => {
      if (elem) elem.textContent = message;
    });
    const setStatusLevel = jest.fn((elem, level) => {
      if (elem) elem.status = level;
    });
    const closePowerWarningDialog = jest.fn();
    const showPowerWarningDialog = jest.fn();
    const drawPowerDiagram = jest.fn();
    const renderFeedbackTable = jest.fn(() => ({ runtime: 2, weight: 1, count: 5 }));
    const getCurrentSetupKey = jest.fn(() => 'key-1');
    const renderTemperatureNote = jest.fn();
    const checkFizCompatibility = jest.fn();
    const checkFizController = jest.fn();
    const checkArriCompatibility = jest.fn();
    const renderSetupDiagram = jest.fn();
    const refreshGearListIfVisible = jest.fn();
    const supportsBMountCamera = jest.fn(() => true);
    const supportsGoldMountCamera = jest.fn(() => false);
    const getCssVariableValue = jest.fn(() => '#123456');
    const escapeHtml = (value) => String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
    const getLastRuntimeHours = jest.fn(() => lastRuntimeHoursValue);
    const setLastRuntimeHours = jest.fn((value) => {
      lastRuntimeHoursValue = value;
    });

    const previewSelections = {
      camera: 'CameraA',
      monitor: 'MonitorA',
      video: 'VideoA',
      distance: 'DistanceA',
      battery: 'BatteryA',
      batteryLabel: 'BatteryA',
      hotswap: 'HotswapA',
      motors: ['MotorA'],
      controllers: ['ControllerA'],
      plate: 'B-Mount',
    };

    cineResults.updateCalculations({
      document: doc,
      elements: {
        cameraSelect,
        monitorSelect,
        videoSelect,
        distanceSelect,
        batterySelect,
        hotswapSelect,
        totalPowerElem,
        breakdownListElem,
        totalCurrent144Elem,
        totalCurrent12Elem,
        batteryLifeElem,
        batteryCountElem,
        batteryLifeLabelElem,
        runtimeAverageNoteElem,
        pinWarnElem,
        dtapWarnElem,
        hotswapWarnElem,
        batteryComparisonSection,
        batteryTableElem,
        setupDiagramContainer,
        resultsPlainSummaryElem,
        resultsPlainSummaryTextElem,
        resultsPlainSummaryNoteElem,
      },
      motorSelects,
      controllerSelects,
      previewSelections,
      getDevices: () => devices,
      getTexts: () => texts,
      getCurrentLang: () => 'en',
      getCollator: () => null,
      getSelectedPlate: () => '',
      getMountVoltageConfig: () => ({ high: 33.6, low: 21.6 }),
      refreshTotalCurrentLabels,
      updateBatteryOptions,
      setStatusMessage,
      setStatusLevel,
      closePowerWarningDialog,
      showPowerWarningDialog,
      drawPowerDiagram,
      renderFeedbackTable,
      getCurrentSetupKey,
      renderTemperatureNote,
      checkFizCompatibility,
      checkFizController,
      checkArriCompatibility,
      renderSetupDiagram,
      refreshGearListIfVisible,
      supportsBMountCamera,
      supportsGoldMountCamera,
      getCssVariableValue,
      escapeHtml,
      getLastRuntimeHours,
      setLastRuntimeHours,
    });

    expect(totalPowerElem.textContent).toBe('41.0');
    expect(totalCurrent144Elem.textContent).toBe('1.22');
    expect(totalCurrent12Elem.textContent).toBe('1.90');
    expect(Number(batteryLifeElem.textContent)).toBeCloseTo(3.2, 2);
    expect(batteryCountElem.textContent).toBe('4');
    expect(batteryLifeLabelElem.textContent).toContain('Used by 5');
    expect(runtimeAverageNoteElem.textContent).toBe('Average note');
    expect(resultsPlainSummaryTextElem.textContent).toBe(
      'With BatteryA, expect about 3.20 hours of runtime. Pack 4 batteries for a 10-hour day. Your rig currently draws 41.0 W.'
    );
    expect(resultsPlainSummaryNoteElem.textContent).toBe(
      'Pins: 1.90A within the 9A limit. D-Tap: B-Mount cameras disable the aux port.'
    );
    expect(pinWarnElem.textContent).toContain('Pin OK');
    expect(setStatusMessage).toHaveBeenCalledWith(
      hotswapWarnElem,
      expect.stringContaining('9'),
    );
    expect(setStatusLevel).toHaveBeenCalledWith(hotswapWarnElem, 'warning');
    expect(refreshTotalCurrentLabels).toHaveBeenCalledWith('en', 'B-Mount', { high: 33.6, low: 21.6 });
    expect(updateBatteryOptions).toHaveBeenCalled();
    expect(drawPowerDiagram).toHaveBeenCalled();
    expect(renderFeedbackTable).toHaveBeenCalledWith('key-1');
    expect(refreshGearListIfVisible).toHaveBeenCalled();
    expect(checkFizCompatibility).toHaveBeenCalled();
    expect(checkFizController).toHaveBeenCalled();
    expect(checkArriCompatibility).toHaveBeenCalled();
    expect(renderSetupDiagram).toHaveBeenCalled();
    expect(batteryComparisonSection.style.display).toBe('block');
  });

  test('updateCalculations clears pin warning when battery lacks a documented pin limit', () => {
    const cameraSelect = {
      value: 'CameraA',
      options: [{ value: 'CameraA', textContent: 'CameraA' }],
      selectedIndex: 0,
    };
    const monitorSelect = {
      value: 'MonitorA',
      options: [{ value: 'MonitorA', textContent: 'MonitorA' }],
      selectedIndex: 0,
    };
    const videoSelect = {
      value: 'VideoA',
      options: [{ value: 'VideoA', textContent: 'VideoA' }],
      selectedIndex: 0,
    };
    const distanceSelect = {
      value: 'DistanceA',
      options: [{ value: 'DistanceA', textContent: 'DistanceA' }],
      selectedIndex: 0,
    };
    const batterySelect = {
      value: 'BatteryA',
      options: [{ value: 'BatteryA', textContent: 'BatteryA' }],
      selectedIndex: 0,
    };
    const hotswapSelect = {
      value: '',
      options: [{ value: '', textContent: '' }],
      selectedIndex: 0,
    };
    const motorSelects = [{ value: 'MotorA' }];
    const controllerSelects = [{ value: 'ControllerA' }];

    const totalPowerElem = createElement('');
    const totalCurrent144Elem = createElement('');
    const totalCurrent12Elem = createElement('');
    const batteryLifeElem = createElement('');
    const batteryCountElem = createElement('');
    const batteryLifeLabelElem = createElement('');
    const runtimeAverageNoteElem = createElement('');
    const pinWarnElem = createElement('');
    const dtapWarnElem = createElement('');
    const hotswapWarnElem = createElement('');
    const batteryComparisonSection = { style: { display: 'none' } };
    const batteryTableElem = { innerHTML: '', appendChild: jest.fn() };
    const breakdownListElem = {
      _html: '',
      entries: [],
      insertAdjacentHTML: jest.fn(function insertAdjacentHTML(_, html) {
        this.entries.push(html);
      }),
      appendChild: jest.fn(),
      set innerHTML(value) {
        this._html = value;
        this.entries = [];
      },
      get innerHTML() {
        return this._html;
      },
    };
    const setupDiagramContainer = {};
    const resultsPlainSummaryElem = createElement('');
    const resultsPlainSummaryTextElem = createElement('');
    const resultsPlainSummaryNoteElem = createElement('');

    const doc = {
      createElement: jest.fn(() => ({ innerHTML: '', appendChild: jest.fn() })),
    };

    const devices = JSON.parse(JSON.stringify(BASE_DEVICES));
    delete devices.batteries.BatteryA.pinA;

    const texts = JSON.parse(JSON.stringify(BASE_TEXTS));

    const refreshTotalCurrentLabels = jest.fn();
    const updateBatteryOptions = jest.fn();
    const setStatusMessage = jest.fn((elem, message) => {
      if (elem) elem.textContent = message;
    });
    const setStatusLevel = jest.fn((elem, level) => {
      if (elem) elem.status = level;
    });
    const closePowerWarningDialog = jest.fn();
    const showPowerWarningDialog = jest.fn();
    const drawPowerDiagram = jest.fn();
    const renderFeedbackTable = jest.fn(() => ({ runtime: 2, weight: 1, count: 0 }));
    const getCurrentSetupKey = jest.fn(() => 'key-2');
    const renderTemperatureNote = jest.fn();
    const checkFizCompatibility = jest.fn();
    const checkFizController = jest.fn();
    const checkArriCompatibility = jest.fn();
    const renderSetupDiagram = jest.fn();
    const refreshGearListIfVisible = jest.fn();
    const supportsBMountCamera = jest.fn(() => false);
    const supportsGoldMountCamera = jest.fn(() => false);
    const getCssVariableValue = jest.fn(() => '#123456');
    const escapeHtml = (value) => String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
    const getLastRuntimeHours = jest.fn(() => null);
    const setLastRuntimeHours = jest.fn();

    cineResults.updateCalculations({
      document: doc,
      elements: {
        cameraSelect,
        monitorSelect,
        videoSelect,
        distanceSelect,
        batterySelect,
        hotswapSelect,
        totalPowerElem,
        breakdownListElem,
        totalCurrent144Elem,
        totalCurrent12Elem,
        batteryLifeElem,
        batteryCountElem,
        batteryLifeLabelElem,
        runtimeAverageNoteElem,
        pinWarnElem,
        dtapWarnElem,
        hotswapWarnElem,
        batteryComparisonSection,
        batteryTableElem,
        setupDiagramContainer,
        resultsPlainSummaryElem,
        resultsPlainSummaryTextElem,
        resultsPlainSummaryNoteElem,
      },
      motorSelects,
      controllerSelects,
      getDevices: () => devices,
      getTexts: () => texts,
      getCurrentLang: () => 'en',
      getCollator: () => null,
      getSelectedPlate: () => '',
      getMountVoltageConfig: () => ({ high: 33.6, low: 21.6 }),
      refreshTotalCurrentLabels,
      updateBatteryOptions,
      setStatusMessage,
      setStatusLevel,
      closePowerWarningDialog,
      showPowerWarningDialog,
      drawPowerDiagram,
      renderFeedbackTable,
      getCurrentSetupKey,
      renderTemperatureNote,
      checkFizCompatibility,
      checkFizController,
      checkArriCompatibility,
      renderSetupDiagram,
      refreshGearListIfVisible,
      supportsBMountCamera,
      supportsGoldMountCamera,
      getCssVariableValue,
      escapeHtml,
      getLastRuntimeHours,
      setLastRuntimeHours,
    });

    expect(pinWarnElem.textContent).toBe('');
    expect(pinWarnElem.status).toBeNull();
    expect(setStatusLevel).toHaveBeenCalledWith(pinWarnElem, null);
    expect(showPowerWarningDialog).not.toHaveBeenCalled();
  });

  test('setupRuntimeFeedback wires handlers and persists sanitized entries', () => {
    const fieldElements = new Map();
    FEEDBACK_FIELD_CONFIG.forEach(({ id }) => {
      fieldElements.set(id, { value: '', setAttribute: jest.fn(), removeAttribute: jest.fn() });
    });

    fieldElements.get('fbUsername').value = '  Operator ';
    fieldElements.get('fbDate').value = ' 2024-04-01 ';
    fieldElements.get('fbTemperature').value = ' 23 ';

    const doc = {
      getElementById: jest.fn((id) => fieldElements.get(id) || null),
    };

    const button = createInteractiveElement('Feedback');
    const dialog = {
      ...createInteractiveElement('Dialog'),
      close: jest.fn(),
    };
    const form = createInteractiveElement('Form');
    const cancelBtn = createInteractiveElement('Cancel');
    const useLocationBtn = createInteractiveElement('Use location');
    useLocationBtn.disabled = false;

    const geolocation = {
      getCurrentPosition: jest.fn((success) => {
        success({ coords: { latitude: 12.345, longitude: 67.89 } });
      }),
    };

    const windowMock = { location: { href: '' } };
    const alertMock = jest.fn();
    const openDialog = jest.fn();
    const closeDialog = jest.fn();
    const loadFeedback = jest.fn(() => ({ 'setup-1': [{ username: 'Existing' }] }));
    const saveFeedback = jest.fn();
    const updateCalculations = jest.fn();
    const getCurrentSetupKey = jest.fn(() => 'setup-1');

    const wired = cineResults.setupRuntimeFeedback({
      document: doc,
      window: windowMock,
      navigator: { geolocation },
      alert: alertMock,
      openDialog,
      closeDialog,
      loadFeedback,
      saveFeedback,
      updateCalculations,
      getCurrentSetupKey,
      runtimeFeedbackButton: button,
      feedbackDialog: dialog,
      feedbackForm: form,
      feedbackCancelBtn: cancelBtn,
      feedbackUseLocationBtn: useLocationBtn,
      mailTarget: 'team@example.com',
    });

    expect(wired).toBe(true);
    expect(typeof button.listeners.click).toBe('function');
    expect(typeof cancelBtn.listeners.click).toBe('function');
    expect(typeof useLocationBtn.listeners.click).toBe('function');
    expect(typeof form.listeners.submit).toBe('function');

    button.listeners.click();
    expect(openDialog).toHaveBeenCalledWith(dialog);

    cancelBtn.listeners.click();
    expect(closeDialog).toHaveBeenCalledWith(dialog);

    useLocationBtn.listeners.click();
    expect(geolocation.getCurrentPosition).toHaveBeenCalledTimes(1);
    expect(useLocationBtn.disabled).toBe(false);
    expect(fieldElements.get('fbLocation').value).toBe('12.34500, 67.89000');
    expect(alertMock).not.toHaveBeenCalled();

    const submitEvent = { preventDefault: jest.fn() };
    form.listeners.submit(submitEvent);

    expect(submitEvent.preventDefault).toHaveBeenCalled();
    expect(loadFeedback).toHaveBeenCalledTimes(1);
    expect(saveFeedback).toHaveBeenCalledTimes(1);

    const savedData = saveFeedback.mock.calls[0][0];
    expect(savedData['setup-1']).toHaveLength(2);
    const newEntry = savedData['setup-1'][1];
    expect(newEntry.username).toBe('Operator');
    expect(newEntry.date).toBe(' 2024-04-01 ');
    expect(newEntry.temperature).toBe('23');

    expect(windowMock.location.href).toContain('mailto:team@example.com');
    expect(windowMock.location.href).toContain('username%3A%20Operator');

    expect(closeDialog).toHaveBeenCalledWith(dialog);
    expect(updateCalculations).toHaveBeenCalledTimes(1);
  });

  test('setupRuntimeFeedback pre-fills camera and battery plate fields from current selections', () => {
    const fieldElements = new Map();
    FEEDBACK_FIELD_CONFIG.forEach(({ id }) => {
      fieldElements.set(id, { value: '', setAttribute: jest.fn(), removeAttribute: jest.fn() });
    });

    const cameraSelect = {
      value: 'Sony VENICE 2',
      selectedIndex: 0,
      options: [
        { textContent: 'Sony VENICE 2', text: 'Sony VENICE 2', label: 'Sony VENICE 2', value: 'Sony VENICE 2' },
      ],
    };
    const batteryPlateSelect = {
      value: 'V-Mount',
      selectedIndex: 1,
      options: [
        { textContent: 'B-Mount', value: 'B-Mount' },
        { textContent: 'V-Mount', value: 'V-Mount' },
      ],
    };

    const doc = {
      getElementById: jest.fn((id) => {
        if (fieldElements.has(id)) {
          return fieldElements.get(id);
        }
        if (id === 'cameraSelect') {
          return cameraSelect;
        }
        if (id === 'batteryPlateSelect') {
          return batteryPlateSelect;
        }
        return null;
      }),
    };

    const button = createInteractiveElement('Feedback');
    const dialog = { ...createInteractiveElement('Dialog'), close: jest.fn() };
    const form = createInteractiveElement('Form');
    const cancelBtn = createInteractiveElement('Cancel');
    const useLocationBtn = createInteractiveElement('Use location');
    useLocationBtn.disabled = false;

    const openDialog = jest.fn();
    const getSelectedPlate = jest.fn(() => 'Gold-Mount');

    cineResults.setupRuntimeFeedback({
      document: doc,
      runtimeFeedbackButton: button,
      feedbackDialog: dialog,
      feedbackForm: form,
      feedbackCancelBtn: cancelBtn,
      feedbackUseLocationBtn: useLocationBtn,
      openDialog,
      getSelectedPlate,
    });

    button.listeners.click();

    expect(getSelectedPlate).toHaveBeenCalledTimes(1);
    expect(fieldElements.get('fbCamera').value).toBe('Sony VENICE 2');
    expect(fieldElements.get('fbBatteryPlate').value).toBe('Gold-Mount');
    expect(openDialog).toHaveBeenCalledWith(dialog);
  });

  test('setupRuntimeFeedback picks up latest updateCalculations reference', () => {
    const fieldElements = new Map();
    FEEDBACK_FIELD_CONFIG.forEach(({ id }) => {
      fieldElements.set(id, { value: '', setAttribute: jest.fn(), removeAttribute: jest.fn() });
    });

    const doc = {
      getElementById: jest.fn((id) => fieldElements.get(id) || null),
    };

    const button = createInteractiveElement('Feedback');
    const dialog = { ...createInteractiveElement('Dialog'), close: jest.fn() };
    const form = createInteractiveElement('Form');
    const cancelBtn = createInteractiveElement('Cancel');
    const useLocationBtn = createInteractiveElement('Use location');
    useLocationBtn.disabled = false;

    const loadFeedback = jest.fn(() => ({}));
    const saveFeedback = jest.fn();
    const getCurrentSetupKey = jest.fn(() => 'setup-2');

    cineResults.setupRuntimeFeedback({
      document: doc,
      runtimeFeedbackButton: button,
      feedbackDialog: dialog,
      feedbackForm: form,
      feedbackCancelBtn: cancelBtn,
      feedbackUseLocationBtn: useLocationBtn,
      loadFeedback,
      saveFeedback,
      getCurrentSetupKey,
      mailTarget: 'team@example.com',
    });

    expect(typeof form.listeners.submit).toBe('function');

    const emptySelect = { value: '', options: [], selectedIndex: 0 };
    const setLastRuntimeHours = jest.fn();

    cineResults.updateCalculations({
      elements: {
        cameraSelect: emptySelect,
        monitorSelect: emptySelect,
        videoSelect: emptySelect,
        distanceSelect: emptySelect,
        batterySelect: { ...emptySelect },
        hotswapSelect: { ...emptySelect },
      },
      motorSelects: [],
      controllerSelects: [],
      getDevices: () => ({
        cameras: {},
        monitors: {},
        video: {},
        fiz: { motors: {}, controllers: {}, distance: {} },
        batteries: {},
        batteryHotswaps: {},
      }),
      getTexts: () => ({ en: {} }),
      getCurrentLang: () => 'en',
      setLastRuntimeHours,
    });

    const submitEvent = { preventDefault: jest.fn() };
    form.listeners.submit(submitEvent);

    expect(submitEvent.preventDefault).toHaveBeenCalled();
    expect(loadFeedback).toHaveBeenCalledTimes(1);
    expect(saveFeedback).toHaveBeenCalledTimes(1);
    expect(setLastRuntimeHours).toHaveBeenCalledTimes(2);
  });
});
