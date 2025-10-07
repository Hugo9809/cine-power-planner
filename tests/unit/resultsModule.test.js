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

    const devices = {
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

    const texts = {
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
      },
    };

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
});
