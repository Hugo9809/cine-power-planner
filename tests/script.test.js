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

    require('../translations.js');
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

  test('B-Mount camera uses high-voltage current labels', () => {
    global.devices.cameras.BCam = {
      powerDrawWatts: 20,
      power: { batteryPlateSupport: [{ type: 'B-Mount', mount: 'native' }] }
    };
    global.devices.batteries.BBatt = { capacity: 200, pinA: 10, dtapA: 5, mount_type: 'B-Mount' };
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'BCam');
    addOpt('batterySelect', 'BBatt');
    script.updateCalculations();
    expect(document.getElementById('totalCurrent144Label').textContent).toContain('33.6');
    expect(document.getElementById('dtapWarning').textContent).toBe('');
  });

  test('battery dropdown filters by mount type', () => {
    global.devices.cameras.VCam = {
      powerDrawWatts: 10,
      power: { batteryPlateSupport: [{ type: 'V-Mount', mount: 'native' }] }
    };
    global.devices.cameras.BothCam = {
      powerDrawWatts: 10,
      power: { batteryPlateSupport: [
        { type: 'V-Mount', mount: 'native' },
        { type: 'B-Mount', mount: 'native' }
      ] }
    };
    global.devices.batteries.VBatt = { capacity: 100, pinA: 10, dtapA: 5, mount_type: 'V-Mount' };
    global.devices.batteries.BBatt = { capacity: 100, pinA: 10, dtapA: 5, mount_type: 'B-Mount' };

    const camSel = document.getElementById('cameraSelect');
    const battSel = document.getElementById('batterySelect');
    const plateSel = document.getElementById('batteryPlateSelect');

    camSel.innerHTML = `<option value="VCam">VCam</option>`;
    camSel.value = 'VCam';
    script.updateBatteryPlateVisibility();
    script.updateBatteryOptions();
    const optionsV = Array.from(battSel.options).map(o => o.value);
    expect(optionsV).toContain('VBatt');
    expect(optionsV).not.toContain('BBatt');

    camSel.innerHTML = `<option value="BothCam">BothCam</option>`;
    camSel.value = 'BothCam';
    script.updateBatteryPlateVisibility();
    plateSel.value = 'B-Mount';
    script.updateBatteryOptions();
    const optionsB = Array.from(battSel.options).map(o => o.value);
    expect(optionsB).toContain('BBatt');
    expect(optionsB).not.toContain('VBatt');
  });

  test('setLanguage updates language and saves preference', () => {
    script.setLanguage('de');
    expect(document.documentElement.lang).toBe('de');
    expect(localStorage.getItem('language')).toBe('de');
    expect(document.getElementById('mainTitle').textContent).toBe('Kamera-Stromverbrauchs-App');
  });

  test('setLanguage supports Spanish', () => {
    script.setLanguage('es');
    expect(document.documentElement.lang).toBe('es');
    expect(localStorage.getItem('language')).toBe('es');
    expect(document.getElementById('mainTitle').textContent).toBe('Aplicación de Consumo de Energía de Cámara');
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

  test('unifyDevices normalizes recordingMedia', () => {
    jest.resetModules();

    const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
    const body = html.split('<body>')[1].split('</body>')[0];
    document.body.innerHTML = body;

    global.devices = {
      cameras: {
        CamD: {
          powerDrawWatts: 5,
          recordingMedia: ['SD UHS-II', 'CFexpress Type B (Dual Slots)']
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

    expect(global.devices.cameras.CamD.recordingMedia).toEqual([
      { type: 'SD Card', notes: 'UHS-II' },
      { type: 'CFexpress Type B', notes: 'Dual Slots' }
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

  test('setRecordingMedia and getRecordingMedia roundtrip', () => {
    const { setRecordingMedia, getRecordingMedia } = script;
    setRecordingMedia([
      { type: 'SD Card', notes: 'UHS-II' },
      { type: 'CFexpress Type B', notes: 'Dual Slots' }
    ]);
    const rows = document.querySelectorAll('#cameraMediaContainer .form-row');
    expect(rows.length).toBe(2);
    const list = getRecordingMedia();
    expect(list).toEqual([
      { type: 'SD Card', notes: 'UHS-II' },
      { type: 'CFexpress Type B', notes: 'Dual Slots' }
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

  test('battery plate selection is saved and loaded with setups', () => {
    // Add camera supporting both plates and matching batteries
    global.devices.cameras.BothCam = {
      powerDrawWatts: 10,
      power: { batteryPlateSupport: [ { type: 'V-Mount', mount: 'native' }, { type: 'B-Mount', mount: 'native' } ] }
    };
    global.devices.batteries.VBatt = { capacity: 100, pinA: 10, dtapA: 5, mount_type: 'V-Mount' };
    global.devices.batteries.BBatt = { capacity: 100, pinA: 10, dtapA: 5, mount_type: 'B-Mount' };

    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'BothCam');
    addOpt('monitorSelect', 'MonA');
    addOpt('videoSelect', 'VidA');
    addOpt('motor1Select', 'MotorA');
    addOpt('controller1Select', 'ControllerA');
    addOpt('distanceSelect', 'DistA');
    const plateSel = document.getElementById('batteryPlateSelect');
    plateSel.innerHTML = '<option value="V-Mount">V-Mount</option><option value="B-Mount">B-Mount</option>';
    plateSel.value = 'B-Mount';
    addOpt('batterySelect', 'BBatt');

    document.getElementById('setupName').value = 'TestSetup';
    document.getElementById('saveSetupBtn').click();

    const saved = global.saveSetups.mock.calls[0][0];
    expect(saved.TestSetup.batteryPlate).toBe('B-Mount');

    // Simulate loading
    global.loadSetups.mockReturnValue(saved);
    const sel = document.getElementById('setupSelect');
    sel.innerHTML = '<option value="">-- New Setup --</option><option value="TestSetup">TestSetup</option>';
    sel.value = 'TestSetup';
    sel.dispatchEvent(new Event('change'));

    expect(document.getElementById('batteryPlateSelect').value).toBe('B-Mount');
  });

  test('renderSetupDiagram runs without errors', () => {
    const { renderSetupDiagram } = script;
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    addOpt('monitorSelect', 'MonA');
    addOpt('batterySelect', 'BattA');
    expect(() => renderSetupDiagram()).not.toThrow();
    const diag = document.getElementById('diagramContainer');
    expect(diag.innerHTML).toContain('svg');
  });
});
