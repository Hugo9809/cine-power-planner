const { getHtmlBody } = require('./domUtils');

let utils;

beforeAll(() => {
  document.body.innerHTML = getHtmlBody();

  global.devices = {
    cameras: {},
    monitors: {},
    video: {},
    fiz: { motors: {}, controllers: {}, distance: {} },
    batteries: {},
    lenses: { Dummy: {} }
  };
  global.loadDeviceData = jest.fn(() => null);
  global.saveDeviceData = jest.fn();
  global.loadSetups = jest.fn(() => ({}));
  global.saveSetups = jest.fn();
  global.saveSetup = jest.fn();
  global.loadSetup = jest.fn();
  global.deleteSetup = jest.fn();

  require('../public/js/translations.js');
  utils = require('../public/js/script.js');
});

describe('utility function tests', () => {
  test('detectBrand categorizes known brands', () => {
    const { detectBrand } = utils;
    expect(detectBrand('ARRI Alexa')).toBe('arri');
    expect(detectBrand('cmotion cPRO')).toBe('cmotion');
    expect(detectBrand('Focusbug CineRT')).toBe('focusbug');
    expect(detectBrand('Tilta Nucleus')).toBe('tilta');
    expect(detectBrand('Preston MDR')).toBe('preston');
    expect(detectBrand('Chrosziel lens control')).toBe('chrosziel');
    expect(detectBrand('SmallRig cage')).toBe('smallrig');
    expect(detectBrand('DJI Ronin')).toBe('dji');
    expect(detectBrand('Redrock follow focus')).toBe('redrock');
    expect(detectBrand('Teradek Bolt')).toBe('teradek');
    expect(detectBrand('Unknown')).toBe('other');
    expect(detectBrand('None')).toBeNull();
    expect(detectBrand('')).toBeNull();
  });

  test('connectionLabel chooses correct label', () => {
    const { connectionLabel } = utils;
    expect(connectionLabel('HDMI', 'HDMI')).toBe('HDMI');
    expect(connectionLabel('12G-SDI', '3G-SDI')).toBe('3G-SDI');
    expect(connectionLabel('6G-SDI', '12G-SDI')).toBe('6G-SDI');
    expect(connectionLabel('HDMI', '12G-SDI')).toBe('HDMI');
    expect(connectionLabel('3G-SDI', 'HDMI')).toBe('SDI');
    expect(connectionLabel('SDI', 'SDI')).toBe('SDI');
    expect(connectionLabel('', '')).toBe('');
  });

  test('distanceFizPort defaults to LBUS', () => {
    const { renderSetupDiagram } = utils;
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    global.devices.fiz.distance = {};
    global.devices.fiz.controllers.TestCtrl = { fizConnectors: [{ type: 'LBUS (LEMO 4-pin)' }] };
    global.devices.cameras.CamX = { powerDrawWatts: 10, fizConnectors: [{ type: 'LBUS (LEMO 4-pin)' }] };
    addOpt('distanceSelect', 'Unknown');
    addOpt('controller1Select', 'TestCtrl');
    addOpt('cameraSelect', 'CamX');
    renderSetupDiagram();
    const labels = Array.from(document.querySelectorAll('.edge-label')).map(el => el.textContent);
    expect(labels.some(l => l.includes('LBUS'))).toBe(true);
  });

  test('distance connection uses Serial for RIA-1 controller', () => {
    const { renderSetupDiagram } = utils;
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    global.devices.cameras.CamX = { powerDrawWatts: 10, fizConnectors: [{ type: 'LBUS (LEMO 4-pin)' }] };
    global.devices.fiz.controllers['Arri RIA-1'] = {
      fizConnectors: [{ type: 'LBUS (LEMO 4-pin)' }, { type: 'SERIAL (LEMO 4-pin)' }]
    };
    global.devices.fiz.distance.Dist = {};
    addOpt('cameraSelect', 'CamX');
    addOpt('controller1Select', 'Arri RIA-1');
    addOpt('distanceSelect', 'Dist');
    renderSetupDiagram();
    const labels = Array.from(document.querySelectorAll('.edge-label')).map(el => el.textContent);
    expect(labels.some(l => /Serial/.test(l))).toBe(true);
  });

  test('normalizePowerPortType handles case-insensitive mappings', () => {
    const { normalizePowerPortType } = utils;
    expect(normalizePowerPortType('dc input')).toEqual(['DC IN']);
    expect(normalizePowerPortType('LEMO 8-PIN (BAT)')).toEqual(['Bat LEMO 8-pin']);
    expect(normalizePowerPortType('battery slot / usb type-c®')).toEqual(['Battery Slot', 'USB-C']);
  });

  test('normalizePowerPortType filters empty segments', () => {
    const { normalizePowerPortType } = utils;
    expect(normalizePowerPortType('dc input /')).toEqual(['DC IN']);
    expect(normalizePowerPortType('/ LEMO 8-PIN (BAT)')).toEqual(['Bat LEMO 8-pin']);
  });

  test('normalizePowerPortType strips trademark symbols', () => {
    const { normalizePowerPortType } = utils;
    expect(normalizePowerPortType('usb type-c®')).toEqual(['USB-C']);
    expect(normalizePowerPortType('usb-c™')).toEqual(['USB-C']);
  });

  test('normalizeVideoType recognizes DisplayPort variants', () => {
    const { normalizeVideoType } = utils;
    expect(normalizeVideoType('DisplayPort')).toBe('DisplayPort');
    expect(normalizeVideoType('display port')).toBe('DisplayPort');
    expect(normalizeVideoType('DP')).toBe('DisplayPort');
  });

  test('normalizeVideoType maps HD-SDI variants to 3G-SDI', () => {
    const { normalizeVideoType } = utils;
    expect(normalizeVideoType('HD-SDI')).toBe('3G-SDI');
    expect(normalizeVideoType('HD SDI')).toBe('3G-SDI');
  });

  test('normalizeViewfinderType handles case-insensitive mappings', () => {
    const { normalizeViewfinderType } = utils;
    expect(normalizeViewfinderType('lcd touchscreen')).toBe('LCD touchscreen');
  });
});
