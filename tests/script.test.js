const fs = require('fs');
const path = require('path');

describe('script.js functions', () => {
  let script;

  beforeEach(() => {
    jest.resetModules();

    const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
    const body = html.split('<body>')[1].split('</body>')[0];
    document.body.innerHTML = body;

    global.devices = {
      cameras: { CamA: { powerDrawWatts: 10 } },
      monitors: { MonA: { powerDrawWatts: 5 } },
      video: { VidA: { powerDrawWatts: 3 } },
      fiz: {
        motors: { MotorA: { powerDrawWatts: 2 } },
        controllers: { ControllerA: { powerDrawWatts: 2 } },
        distance: { DistA: { powerDrawWatts: 1 } }
      },
      batteries: { BattA: { capacity: 100, pinA: 10, dtapA: 5 } }
    };

    global.loadDeviceData = jest.fn(() => null);
    global.saveDeviceData = jest.fn();
    global.loadSetups = jest.fn(() => ({}));
    global.saveSetups = jest.fn();
    global.saveSetup = jest.fn();
    global.loadSetup = jest.fn();
    global.deleteSetup = jest.fn();

    script = require('../script.js');
  });

  test('updateCalculations computes totals and runtime', () => {
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    addOpt('monitorSelect', 'MonA');
    addOpt('videoSelect', 'VidA');
    addOpt('motor1Select', 'MotorA');
    addOpt('controller1Select', 'ControllerA');
    addOpt('distanceSelect', 'DistA');
    addOpt('batterySelect', 'BattA');

    script.updateCalculations();

    expect(document.getElementById('totalPower').textContent).toBe('23.0');
    expect(document.getElementById('totalCurrent12').textContent).toBe('1.92');
    expect(document.getElementById('batteryLife').textContent).toBe('4.35');
    expect(document.getElementById('pinWarning').textContent).toBe('10A max – OK');
    expect(document.getElementById('dtapWarning').textContent).toBe('5A max – OK');
  });

  test('setLanguage updates language and saves preference', () => {
    script.setLanguage('de');
    expect(document.documentElement.lang).toBe('de');
    expect(localStorage.getItem('language')).toBe('de');
    expect(document.getElementById('mainTitle').textContent).toBe('Kamera-Stromverbrauchs-App');
  });

  test('unifyDevices normalizes videoOutputs', () => {
    jest.resetModules();

    const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
    const body = html.split('<body>')[1].split('</body>')[0];
    document.body.innerHTML = body;

    global.devices = {
      cameras: {
        CamB: {
          powerDrawWatts: 5,
          videoOutputs: [
            { type: '12g-sdi', count: 2 },
            { type: 'HDMI', notes: 'Main', version: 'Type A' }
          ]
        }
      },
      monitors: {},
      video: {},
      fiz: { motors: {}, controllers: {}, distance: {} },
      batteries: {}
    };

    global.loadDeviceData = jest.fn(() => null);
    global.saveDeviceData = jest.fn();
    global.loadSetups = jest.fn(() => ({}));
    global.saveSetups = jest.fn();
    global.saveSetup = jest.fn();
    global.loadSetup = jest.fn();
    global.deleteSetup = jest.fn();

    script = require('../script.js');

    expect(global.devices.cameras.CamB.videoOutputs).toEqual([
      { type: '12G-SDI', notes: '' },
      { type: '12G-SDI', notes: '' },
      { type: 'HDMI', notes: 'Main' }
    ]);
  });

  test('unifyDevices filters unsupported videoOutputs', () => {
    jest.resetModules();

    const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
    const body = html.split('<body>')[1].split('</body>')[0];
    document.body.innerHTML = body;

    global.devices = {
      cameras: {
        CamC: {
          powerDrawWatts: 5,
          videoOutputs: [
            { type: 'Composite', notes: 'Analog' },
            { type: 'Micro HDMI' },
            { type: 'HD-SDI', notes: 'Legacy', count: '2' }
          ]
        }
      },
      monitors: {},
      video: {},
      fiz: { motors: {}, controllers: {}, distance: {} },
      batteries: {}
    };

    global.loadDeviceData = jest.fn(() => null);
    global.saveDeviceData = jest.fn();
    global.loadSetups = jest.fn(() => ({}));
    global.saveSetups = jest.fn();
    global.saveSetup = jest.fn();
    global.loadSetup = jest.fn();
    global.deleteSetup = jest.fn();

    script = require('../script.js');

    expect(global.devices.cameras.CamC.videoOutputs).toEqual([
      { type: 'Micro HDMI', notes: '' },
      { type: '3G-SDI', notes: 'Legacy' },
      { type: '3G-SDI', notes: 'Legacy' }
    ]);
  });

  test('setBatteryPlates and getBatteryPlates roundtrip', () => {
    const { setBatteryPlates, getBatteryPlates } = script;
    setBatteryPlates([
      { type: 'V-Mount', mount: 'native', notes: 'Main' },
      { type: 'Gold', mount: 'adapted', notes: '' }
    ]);
    const rows = document.querySelectorAll('#batteryPlatesContainer .form-row');
    expect(rows.length).toBe(2);
    const list = getBatteryPlates();
    expect(list).toEqual([
      { type: 'V-Mount', mount: 'native', notes: 'Main' },
      { type: 'Gold', mount: 'adapted', notes: '' }
    ]);
  });

  test('applyDarkMode toggles class', () => {
    const { applyDarkMode } = script;
    const toggle = document.getElementById('darkModeToggle');
    applyDarkMode(true);
    expect(document.body.classList.contains('dark-mode')).toBe(true);
    expect(toggle.textContent).toBe('☀');
    applyDarkMode(false);
    expect(document.body.classList.contains('dark-mode')).toBe(false);
    expect(toggle.textContent).toBe('☾');
  });

  test('generatePrintableOverview opens window with content', () => {
    const { generatePrintableOverview } = script;
    window.open = jest.fn(() => ({ document: { write: jest.fn(), close: jest.fn() } }));
    document.getElementById('setupName').value = 'Test';
    generatePrintableOverview();
    expect(window.open).toHaveBeenCalled();
  });
});
