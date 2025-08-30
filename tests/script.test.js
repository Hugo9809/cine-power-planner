/* global texts devices */
const fs = require('fs');
const path = require('path');
const LZString = require('lz-string');

describe('script.js functions', () => {
  let script;

  beforeEach(() => {
    jest.resetModules();

    global.alert = jest.fn();

    const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
    const body = html.split('<body>')[1].split('</body>')[0];
    document.body.innerHTML = body;

    global.devices = {
      cameras: { CamA: { powerDrawWatts: 10 } },
      monitors: { MonA: { powerDrawWatts: 5, brightnessNits: 2300 } },
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
    global.loadFeedback = jest.fn(() => ({}));
    global.saveFeedback = jest.fn();

    require('../translations.js');
    script = require('../script.js');
    script.setLanguage('en');
    script.setLanguage('en');
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
    expect(document.getElementById('batteryCount').textContent).toBe('4');
    expect(document.getElementById('pinWarning').textContent)
      .toBe(texts.en.pinOk.replace('{max}', '10'));
    expect(document.getElementById('dtapWarning').textContent)
      .toBe(texts.en.dtapOk.replace('{max}', '5'));
  });

  test('shows runtime average note when more than four user entries', () => {
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
    const key = script.getCurrentSetupKey();
    const entries = Array.from({ length: 5 }, () => ({ runtime: '2' }));
    global.loadFeedback.mockReturnValue({ [key]: entries });

    script.updateCalculations();

    expect(document.getElementById('batteryLife').textContent).toBe('2.00');
    const expectedNote =
      texts.en.runtimeUserCountNote.replace('{count}', 5) + ' ' + texts.en.runtimeAverageNote;
    expect(document.getElementById('runtimeAverageNote').textContent).toBe(expectedNote);
  });

  test('applies temperature scaling to user runtime', () => {
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
    const key = script.getCurrentSetupKey();
    const entries = Array.from({ length: 5 }, () => ({ runtime: '1', temperature: '0' }));
    global.loadFeedback.mockReturnValue({ [key]: entries });

    script.updateCalculations();

    expect(document.getElementById('batteryLife').textContent).toBe('1.25');
  });

  test('interpolates temperature scaling between points', () => {
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
    const key = script.getCurrentSetupKey();

    const cases = [
      { temp: '5', expected: '1.20' },
      { temp: '-5', expected: '1.43' },
      { temp: '-15', expected: '1.80' }
    ];

    cases.forEach(({ temp, expected }) => {
      const entries = Array.from({ length: 5 }, () => ({ runtime: '1', temperature: temp }));
      global.loadFeedback.mockReturnValue({ [key]: entries });
      script.updateCalculations();
      expect(document.getElementById('batteryLife').textContent).toBe(expected);
    });
  });

  test('uses user runtime for temperature table', () => {
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
    const key = script.getCurrentSetupKey();
    const entries = Array.from({ length: 5 }, () => ({ runtime: '2' }));
    global.loadFeedback.mockReturnValue({ [key]: entries });

    script.updateCalculations();

    const firstRuntime = document.querySelector('#temperatureNote table tr:nth-child(2) td:nth-child(2)').textContent;
    expect(firstRuntime).toBe('2.00');
  });

  test('weighs high-resolution entries by camera power share', () => {
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
    const key = script.getCurrentSetupKey();
    const entries = [
      { runtime: '1', resolution: '4k' },
      { runtime: '2', resolution: '1080p' },
      { runtime: '2', resolution: '1080p' },
      { runtime: '2', resolution: '1080p' },
      { runtime: '2', resolution: '1080p' }
    ];
    global.loadFeedback.mockReturnValue({ [key]: entries });

    script.updateCalculations();

    expect(document.getElementById('batteryLife').textContent).toBe('1.77');
  });

  test('weights codecs by camera power share', () => {
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
    const key = script.getCurrentSetupKey();
    const entries = [
      { runtime: '1', codec: 'XAVC HS' },
      { runtime: '2', codec: 'BRAW' },
      { runtime: '2', codec: 'BRAW' },
      { runtime: '2', codec: 'BRAW' },
      { runtime: '2', codec: 'BRAW' }
    ];
    global.loadFeedback.mockReturnValue({ [key]: entries });

    script.updateCalculations();

    expect(document.getElementById('batteryLife').textContent).toBe('1.75');
  });

  test('weights monitor brightness by monitor power share', () => {
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
    const key = script.getCurrentSetupKey();
    const entries = [
      { runtime: '1', monitorBrightness: '1150' },
      { runtime: '2' },
      { runtime: '2' },
      { runtime: '2' },
      { runtime: '2' }
    ];
    global.loadFeedback.mockReturnValue({ [key]: entries });

    script.updateCalculations();

    expect(document.getElementById('batteryLife').textContent).toBe('1.82');
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
    script.setLanguage('fr');
    addOpt('cameraSelect', 'BCam');
    script.updateBatteryPlateVisibility();
    script.updateBatteryOptions();
    addOpt('batterySelect', 'BBatt');
    script.updateCalculations();
    expect(document.getElementById('batteryLabel').textContent).toBe(texts.fr.batteryBMountLabel);
    expect(document.getElementById('totalCurrent144Label').textContent).toBe(texts.fr.totalCurrent336Label);
    expect(document.getElementById('totalCurrent12Label').textContent).toBe(texts.fr.totalCurrent216Label);
    expect(document.getElementById('dtapWarning').textContent).toBe('');
  });

  test('battery comparison method labels use translations', () => {
    global.devices.batteries.PinsOnly = { capacity: 100, pinA: 5, dtapA: 1, mount_type: 'V-Mount' };
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
    addOpt('batterySelect', 'PinsOnly');
    script.setLanguage('es');
    script.updateCalculations();
    expect(document.getElementById('batteryComparison').innerHTML).toContain(texts.es.methodPinsOnly);
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

  test('battery comparison excludes B-Mount when camera lacks support', () => {
    global.devices.cameras.NoPlateCam = { powerDrawWatts: 10 };
    global.devices.batteries.VBatt = { capacity: 100, pinA: 10, dtapA: 5, mount_type: 'V-Mount' };
    global.devices.batteries.BBatt = { capacity: 100, pinA: 10, dtapA: 5, mount_type: 'B-Mount' };

    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };

    addOpt('cameraSelect', 'NoPlateCam');
    addOpt('monitorSelect', 'MonA');
    addOpt('videoSelect', 'VidA');
    addOpt('motor1Select', 'MotorA');
    addOpt('controller1Select', 'ControllerA');
    addOpt('distanceSelect', 'DistA');
    script.updateBatteryPlateVisibility();
    script.updateBatteryOptions();
    document.getElementById('batterySelect').value = 'VBatt';
    script.updateCalculations();

    const html = document.getElementById('batteryComparison').innerHTML;
    expect(html).toContain('VBatt');
    expect(html).not.toContain('BBatt');
  });

  test('overview battery comparison excludes B-Mount when camera lacks support', () => {
    global.devices.cameras.NoPlateCam = { powerDrawWatts: 10 };
    global.devices.batteries.VBatt = { capacity: 100, pinA: 10, dtapA: 5, mount_type: 'V-Mount' };
    global.devices.batteries.BBatt = { capacity: 100, pinA: 10, dtapA: 5, mount_type: 'B-Mount' };

    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };

    addOpt('cameraSelect', 'NoPlateCam');
    addOpt('monitorSelect', 'MonA');
    addOpt('videoSelect', 'VidA');
    addOpt('motor1Select', 'MotorA');
    addOpt('controller1Select', 'ControllerA');
    addOpt('distanceSelect', 'DistA');
    script.updateBatteryPlateVisibility();
    script.updateBatteryOptions();
    document.getElementById('batterySelect').value = 'VBatt';
    script.updateCalculations();

    const writeMock = jest.fn();
    window.open = jest.fn(() => ({ document: { write: writeMock, close: jest.fn() } }));
    script.generatePrintableOverview();
    const html = writeMock.mock.calls[0][0];
    expect(html).toContain('VBatt');
    expect(html).not.toContain('BBatt');
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

  test('applyPinkMode toggles class', () => {
    const { applyPinkMode } = script;
    const toggle = document.getElementById('pinkModeToggle');
    applyPinkMode(true);
    expect(document.body.classList.contains('pink-mode')).toBe(true);
    expect(toggle.textContent).toBe('🦄');
    applyPinkMode(false);
    expect(document.body.classList.contains('pink-mode')).toBe(false);
    expect(toggle.textContent).toBe('🐴');
  });

  test('generatePrintableOverview includes diagram and device blocks', () => {
    const { generatePrintableOverview } = script;
    const writeMock = jest.fn();
    window.open = jest.fn(() => ({ document: { write: writeMock, close: jest.fn() } }));
    document.getElementById('setupName').value = 'Test';
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    script.updateCalculations();
    generatePrintableOverview();
    expect(window.open).toHaveBeenCalled();
    const html = writeMock.mock.calls[0][0];
    expect(html).toContain('id="diagramArea"');
    expect(html).toContain('<svg');
    expect(html).toContain('class="device-block"');
    expect(html).toContain('id="pinkModeToggle"');
    expect(html).toContain('id="languageSelect"');
    expect(html).toContain('id="breakdownList"');
    expect(html).toContain(`<strong>${texts.en.cameraLabel}</strong>`);
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

  test('warning colors are applied in Spanish', () => {
    global.devices.batteries.WarnBatt = { capacity: 50, pinA: 1, dtapA: 1, mount_type: 'V-Mount' };
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
    addOpt('batterySelect', 'WarnBatt');
    script.setLanguage('es');
    script.updateCalculations();
    expect(document.getElementById('pinWarning').style.color).toBe('red');
    expect(document.getElementById('dtapWarning').style.color).toBe('red');
  });

  test('warning colors are applied in French', () => {
    global.devices.batteries.NoteBatt = { capacity: 50, pinA: 2.3, dtapA: 2.3, mount_type: 'V-Mount' };
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
    addOpt('batterySelect', 'NoteBatt');
    script.setLanguage('fr');
    script.updateCalculations();
    expect(document.getElementById('pinWarning').style.color).toBe('orange');
    expect(document.getElementById('dtapWarning').style.color).toBe('orange');
  });

  test('missing FIZ controller shows error', () => {
    jest.resetModules();

    const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
    const body = html.split('<body>')[1].split('</body>')[0];
    document.body.innerHTML = body;

    global.devices = {
      cameras: { CamX: { powerDrawWatts: 10, fizConnectors: [{ type: 'Hirose 12-pin' }] } },
      monitors: {},
      video: {},
      fiz: {
        motors: { MotorA: { powerDrawWatts: 2, internalController: false } },
        controllers: { 'Arri OCU-1': { powerDrawWatts: 1, fizConnectors: [{ type: 'LBUS (4-pin Lemo)' }] } },
        distance: {}
      },
      batteries: {}
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

    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamX');
    addOpt('motor1Select', 'MotorA');
    addOpt('controller1Select', 'Arri OCU-1');
    script.updateCalculations();
    expect(document.getElementById('compatWarning').textContent).toBe(texts.en.missingFIZControllerWarning);
  });

  test('non-ARRI FIZ controller uses EXT on ARRI cameras', () => {
    const { cameraFizPort } = script;
    global.devices.cameras = {
      'ArriCam': { fizConnectors: [ { type: 'LBUS (LEMO 4-pin)' }, { type: 'EXT LEMO 7-pin' } ] }
    };
    global.devices.fiz.controllers = { 'Teradek CTRL': { fizConnectors: [{ type: 'LBUS (LEMO 4-pin)' }] } };
    const port = cameraFizPort('ArriCam', 'LBUS (LEMO 4-pin)', 'Teradek CTRL');
    expect(port).toBe('EXT LEMO 7-pin');
  });

  test('cforce RF motor and RIA use Cam port to camera', () => {
    const { controllerCamPort } = script;
    expect(controllerCamPort('Arri cforce mini RF (KK.0040345)')).toBe('Cam');
    expect(controllerCamPort('Arri RIA-1')).toBe('Cam');
    expect(controllerCamPort('Arri cforceRF')).toBe('Cam');
    expect(controllerCamPort('Arri Master Grip (single unit)')).toBe('LBUS');
  });

  test('Tilta motors use the camera\'s FIZ port', () => {
    const { controllerCamPort } = script;
    global.devices.fiz.motors['Tilta Nucleus M'] = {
      internalController: true,
      fizConnectors: [{ type: 'LEMO 7-pin' }]
    };
    expect(controllerCamPort('Tilta Nucleus M')).toBe('LEMO 7-pin');
  });

  test('default motor uses FIZ Port label to camera', () => {
    const { controllerCamPort } = script;
    expect(controllerCamPort('Generic FIZ Device')).toBe('FIZ Port');
  });

  test('ARRI camera with LBUS avoids distance warning', () => {
    jest.resetModules();

    const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
    const body = html.split('<body>')[1].split('</body>')[0];
    document.body.innerHTML = body;

    global.devices = {
      cameras: { 'ArriCam': { powerDrawWatts: 10, fizConnectors: [{ type: 'LBUS (LEMO 4-pin)' }] } },
      monitors: {},
      video: {},
      fiz: {
        motors: {},
        controllers: {},
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
    const localScript = require('../script.js');

    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'ArriCam');
    addOpt('distanceSelect', 'DistA');
    addOpt('batterySelect', 'BattA');
    localScript.updateCalculations();
    expect(document.getElementById('compatWarning').textContent).toBe('');
  });

  test('Master Grip only controller triggers wireless warning', () => {
    jest.resetModules();

    const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
    const body = html.split('<body>')[1].split('</body>')[0];
    document.body.innerHTML = body;

    global.devices = {
      cameras: { CamX: { powerDrawWatts: 10, fizConnectors: [{ type: 'LBUS (4-pin Lemo)' }] } },
      monitors: {},
      video: {},
      fiz: {
        motors: { MotorA: { powerDrawWatts: 2, internalController: false } },
        controllers: { 'Arri Master Grip (single unit)': { powerDrawWatts: 1, fizConnectors: [{ type: 'LBUS (LEMO 4-pin)' }], internalController: true } },
        distance: {}
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
    const localScript = require('../script.js');

    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamX');
    addOpt('motor1Select', 'MotorA');
    addOpt('controller1Select', 'Arri Master Grip (single unit)');
    addOpt('batterySelect', 'BattA');
    localScript.updateCalculations();
    expect(document.getElementById('compatWarning').textContent).toBe(texts.en.masterGripWirelessWarning);
  });

  test('Master Grip with cforce RF motor has no wireless warning', () => {
    jest.resetModules();

    const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
    const body = html.split('<body>')[1].split('</body>')[0];
    document.body.innerHTML = body;

    global.devices = {
      cameras: { CamX: { powerDrawWatts: 10, fizConnectors: [{ type: 'LBUS (4-pin Lemo)' }] } },
      monitors: {},
      video: {},
      fiz: {
        motors: { 'cforce mini RF': { powerDrawWatts: 2, internalController: false } },
        controllers: { 'Arri Master Grip (single unit)': { powerDrawWatts: 1, fizConnectors: [{ type: 'LBUS (LEMO 4-pin)' }], internalController: true } },
        distance: {}
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
    const localScript = require('../script.js');

    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamX');
    addOpt('motor1Select', 'cforce mini RF');
    addOpt('controller1Select', 'Arri Master Grip (single unit)');
    addOpt('batterySelect', 'BattA');
    localScript.updateCalculations();
    expect(document.getElementById('compatWarning').textContent).toBe('');
  });

  test('cforce RF motor placed before Master Grip', () => {
    jest.resetModules();

    const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
    const body = html.split('<body>')[1].split('</body>')[0];
    document.body.innerHTML = body;

    global.devices = {
      cameras: { CamA: { powerDrawWatts: 10, fizConnectors: [{ type: 'LBUS (LEMO 4-pin)' }] } },
      monitors: {},
      video: {},
      fiz: {
        motors: { 'cforce mini RF': { powerDrawWatts: 2, internalController: true, fizConnector: 'LBUS (LEMO 4-pin), CAM (LEMO 7-pin)' } },
        controllers: { 'Arri Master Grip (single unit)': { powerDrawWatts: 1, fizConnectors: [{ type: 'LBUS (LEMO 4-pin)' }], internalController: true } },
        distance: {}
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
    const localScript = require('../script.js');

    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    addOpt('motor1Select', 'cforce mini RF');
    addOpt('controller1Select', 'Arri Master Grip (single unit)');
    addOpt('batterySelect', 'BattA');

    localScript.renderSetupDiagram();

    const firstNode = document.querySelector('#setupDiagram .diagram-node.first-fiz');
    expect(firstNode.getAttribute('data-node')).toBe('motor0');
  });

  test('renderSetupDiagram runs without errors', () => {
    const { renderSetupDiagram } = script;
    expect(() => renderSetupDiagram()).not.toThrow();
  });

  test('native plate adds label to battery', () => {
    global.devices.cameras.NativeCam = {
      powerDrawWatts: 10,
      power: { batteryPlateSupport: [{ type: 'V-Mount', mount: 'native' }] }
    };
    global.devices.batteries.VBatt = { capacity: 100, pinA: 10, dtapA: 5, mount_type: 'V-Mount' };

    const camSel = document.getElementById('cameraSelect');
    const battSel = document.getElementById('batterySelect');

    camSel.innerHTML = '<option value="NativeCam">NativeCam</option>';
    camSel.value = 'NativeCam';
    battSel.innerHTML = '<option value="VBatt">VBatt</option>';
    battSel.value = 'VBatt';

    script.updateBatteryPlateVisibility();
    script.renderSetupDiagram();

    const batteryNode = document.querySelector('#diagramArea [data-node="battery"]');
    const text = batteryNode.textContent.replace(/\s+/g, '');
    expect(text).toContain('onnativeV-MountplateviaPins');
  });

  test('battery connects to FIZ motor when controller is internal power', () => {
    global.devices.fiz.controllers.InternalCtrl = {
      powerDrawWatts: 1,
      fizConnector: 'LEMO 4-pin',
      power_source: 'Internal Battery'
    };
    global.devices.fiz.motors.PowerMotor = {
      powerDrawWatts: 2,
      fizConnector: 'LEMO 4-pin'
    };

    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    addOpt('controller1Select', 'InternalCtrl');
    addOpt('motor1Select', 'PowerMotor');
    addOpt('batterySelect', 'BattA');

    script.renderSetupDiagram();

    const labels = Array.from(document.querySelectorAll('.edge-label')).map(el => el.textContent);
    expect(labels.some(l => l.includes('D-Tap'))).toBe(true);
  });

  test('Nucleus M battery cable labeled D-Tap to LEMO 7-pin', () => {
    global.devices.fiz.motors['Tilta Nucleus M'] = {
      powerDrawWatts: 20,
      internalController: true,
      fizConnectors: [{ type: 'LEMO 7-pin' }]
    };

    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    addOpt('motor1Select', 'Tilta Nucleus M');
    addOpt('batterySelect', 'BattA');

    script.renderSetupDiagram();

    const labels = Array.from(document.querySelectorAll('.edge-label')).map(el => el.textContent);
    expect(labels).toContain('D-Tap to LEMO 7-pin');
  });

  test('motor with internal controller is first FIZ device', () => {
    global.devices.fiz.motors.IntMotor = {
      powerDrawWatts: 2,
      fizConnector: 'LEMO 4-pin',
      internalController: true
    };
    global.devices.fiz.controllers.CtrlA = {
      powerDrawWatts: 1,
      fizConnector: 'LEMO 4-pin'
    };

    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    addOpt('motor1Select', 'IntMotor');
    addOpt('controller1Select', 'CtrlA');
    addOpt('batterySelect', 'BattA');

    script.renderSetupDiagram();

    const firstNode = document.querySelector('#setupDiagram .diagram-node.first-fiz');
    expect(firstNode.getAttribute('data-node')).toBe('motor0');
  });

  test('UMC-4 controller is first FIZ device over Master Grip', () => {
    global.devices.fiz.controllers['Arri UMC-4'] = {
      powerDrawWatts: 1,
      fizConnectors: [{ type: 'LBUS (LEMO 4-pin)' }]
    };
    global.devices.fiz.controllers['Arri Master Grip (single unit)'] = {
      powerDrawWatts: 1,
      fizConnectors: [{ type: 'LBUS (LEMO 4-pin)' }],
      internalController: true
    };

    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    addOpt('controller1Select', 'Arri UMC-4');
    addOpt('controller2Select', 'Arri Master Grip (single unit)');
    addOpt('motor1Select', 'MotorA');
    addOpt('batterySelect', 'BattA');

    script.renderSetupDiagram();

    const firstNode = document.querySelector('#setupDiagram .diagram-node.first-fiz');
    expect(firstNode.getAttribute('data-node')).toBe('controller0');
  });

  test('Master Grip prioritized over regular controller', () => {
    global.devices.fiz.controllers['Arri Master Grip (single unit)'] = {
      powerDrawWatts: 1,
      fizConnectors: [{ type: 'LBUS (LEMO 4-pin)' }],
      internalController: true
    };

    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    addOpt('controller1Select', 'Arri Master Grip (single unit)');
    addOpt('controller2Select', 'ControllerA');
    addOpt('motor1Select', 'MotorA');
    addOpt('batterySelect', 'BattA');

    script.renderSetupDiagram();

    const firstNode = document.querySelector('#setupDiagram .diagram-node.first-fiz');
    expect(firstNode.getAttribute('data-node')).toBe('controller0');
  });

  test('UMC-4 controller is first FIZ device over ZMU-4', () => {
    global.devices.fiz.controllers['Arri UMC-4'] = {
      powerDrawWatts: 1,
      fizConnectors: [{ type: 'LBUS (LEMO 4-pin)' }]
    };
    global.devices.fiz.controllers['Arri ZMU-4 (body only, wired)'] = {
      powerDrawWatts: 1,
      fizConnectors: [{ type: 'LBUS (LEMO 4-pin)' }]
    };

    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    addOpt('controller1Select', 'Arri UMC-4');
    addOpt('controller2Select', 'Arri ZMU-4 (body only, wired)');
    addOpt('motor1Select', 'MotorA');
    addOpt('batterySelect', 'BattA');

    script.renderSetupDiagram();

    const firstNode = document.querySelector('#setupDiagram .diagram-node.first-fiz');
    expect(firstNode.getAttribute('data-node')).toBe('controller0');
  });

  test('UMC-4 controller is first FIZ device over OCU-1', () => {
    global.devices.fiz.controllers['Arri UMC-4'] = {
      powerDrawWatts: 1,
      fizConnectors: [{ type: 'LBUS (LEMO 4-pin)' }]
    };
    global.devices.fiz.controllers['Arri OCU-1'] = {
      powerDrawWatts: 1,
      fizConnectors: [{ type: 'LBUS (LEMO 4-pin)' }]
    };

    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    addOpt('controller1Select', 'Arri UMC-4');
    addOpt('controller2Select', 'Arri OCU-1');
    addOpt('motor1Select', 'MotorA');
    addOpt('batterySelect', 'BattA');

    script.renderSetupDiagram();

    const firstNode = document.querySelector('#setupDiagram .diagram-node.first-fiz');
    expect(firstNode.getAttribute('data-node')).toBe('controller0');
  });

  test('UMC-4 connects to LBUS devices via LCS port', () => {
    global.devices.fiz.controllers['Arri UMC-4'] = {
      powerDrawWatts: 1,
      fizConnectors: [
        { type: 'Serial (LEMO 7-pin)' },
        { type: 'LCS (LEMO 7-pin)' }
      ]
    };
    global.devices.fiz.motors.LBUSMotor = {
      powerDrawWatts: 2,
      fizConnector: 'LBUS (LEMO 4-pin)'
    };

    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    addOpt('controller1Select', 'Arri UMC-4');
    addOpt('motor1Select', 'LBUSMotor');
    addOpt('batterySelect', 'BattA');

    script.renderSetupDiagram();

    const labels = Array.from(document.querySelectorAll('.edge-label')).map(el => el.textContent);
    expect(labels.some(l => l.includes('LCS to LBUS'))).toBe(true);
  });

  test('ARRI FIZ requires battery on non-ARRI camera', () => {
    global.devices.fiz.controllers['Arri RIA-1'] = {
      powerDrawWatts: 1,
      fizConnector: 'LBUS (LEMO 4-pin)'
    };

    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    addOpt('controller1Select', 'Arri RIA-1');
    addOpt('motor1Select', 'MotorA');
    addOpt('batterySelect', 'BattA');

    script.renderSetupDiagram();

    const labels = Array.from(document.querySelectorAll('.edge-label')).map(el => el.textContent);
    expect(labels.some(l => l.includes('D-Tap'))).toBe(true);
  });

  test('ARRI FIZ uses camera power on ARRI cameras', () => {
    global.devices.cameras.ArriCam = { powerDrawWatts: 10, fizConnectors: [{ type: 'LBUS (LEMO 4-pin)' }] };
    global.devices.fiz.controllers['Arri RIA-1'] = { powerDrawWatts: 1, fizConnector: 'LBUS (LEMO 4-pin)' };

    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'ArriCam');
    addOpt('controller1Select', 'Arri RIA-1');
    addOpt('motor1Select', 'MotorA');
    addOpt('batterySelect', 'BattA');

    script.renderSetupDiagram();

    const labels = Array.from(document.querySelectorAll('.edge-label')).map(el => el.textContent);
    expect(labels.some(l => l.includes('D-Tap'))).toBe(false);
  });

  test('diagram popup shows labeled connector names', () => {
    global.devices.fiz.controllers.ControllerA.fizConnectors = [{ type: 'LBUS' }];

    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    addOpt('controller1Select', 'ControllerA');
    addOpt('batterySelect', 'BattA');

    script.renderSetupDiagram();

    const node = document.querySelector('#diagramArea .diagram-node[data-node="controller0"]');
    node.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 0 }));
    const popup = document.getElementById('diagramPopup');
    expect(popup.innerHTML).toContain('FIZ Port: LBUS');
    expect(popup.innerHTML).toContain('Power: 2 W');
  });

  test('grid snap toggle snaps nodes to grid', () => {
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    addOpt('batterySelect', 'BattA');

    script.renderSetupDiagram();

    const gridBtn = document.getElementById('gridSnapToggle');
    gridBtn.click();

    const area = document.getElementById('diagramArea');
    expect(gridBtn.classList.contains('active')).toBe(true);
    expect(area.classList.contains('grid-snap')).toBe(true);

    const node = document.querySelector('#diagramArea .diagram-node[data-node="battery"]');
    const rect = node.querySelector('rect');
    const w = parseFloat(rect.getAttribute('width'));
    const h = parseFloat(rect.getAttribute('height'));
    const startX = parseFloat(rect.getAttribute('x')) + w / 2;
    const startY = parseFloat(rect.getAttribute('y')) + h / 2;

    node.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0, bubbles: true }));
    window.dispatchEvent(new MouseEvent('mouseup', { clientX: 13, clientY: 27, bubbles: true }));

    const node2 = document.querySelector('#diagramArea .diagram-node[data-node="battery"]');
    const rect2 = node2.querySelector('rect');
    const w2 = parseFloat(rect2.getAttribute('width'));
    const h2 = parseFloat(rect2.getAttribute('height'));
    const endX = parseFloat(rect2.getAttribute('x')) + w2 / 2;
    const endY = parseFloat(rect2.getAttribute('y')) + h2 / 2;
    const snap = v => Math.round(v / 20) * 20;
    expect(endX).toBe(snap(startX + 13));
    expect(endY).toBe(snap(startY + 27));
  });

  test('grid snap respects zoom level', () => {
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    addOpt('batterySelect', 'BattA');

    script.renderSetupDiagram();

    const gridBtn = document.getElementById('gridSnapToggle');
    const zoomBtn = document.getElementById('zoomIn');
    gridBtn.click();
    zoomBtn.click();

    const node = document.querySelector('#diagramArea .diagram-node[data-node="battery"]');
    const rect = node.querySelector('rect');
    const w = parseFloat(rect.getAttribute('width'));
    const h = parseFloat(rect.getAttribute('height'));
    const startX = parseFloat(rect.getAttribute('x')) + w / 2;
    const startY = parseFloat(rect.getAttribute('y')) + h / 2;

    node.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0, bubbles: true }));
    window.dispatchEvent(new MouseEvent('mouseup', { clientX: 13, clientY: 27, bubbles: true }));

    const rect2 = document.querySelector('#diagramArea .diagram-node[data-node="battery"] rect');
    const w2 = parseFloat(rect2.getAttribute('width'));
    const h2 = parseFloat(rect2.getAttribute('height'));
    const endX = parseFloat(rect2.getAttribute('x')) + w2 / 2;
    const endY = parseFloat(rect2.getAttribute('y')) + h2 / 2;

    const scale = 1.1;
    const snap = v => {
      const g = 20 / scale;
      return Math.round(v / g) * g;
    };
    expect(endX).toBeCloseTo(snap(startX + 13 / scale));
    expect(endY).toBeCloseTo(snap(startY + 27 / scale));
  });

  test('help dialog toggles with keyboard and overlay click', () => {
    const helpDialog = document.getElementById('helpDialog');
    const helpSearch = document.getElementById('helpSearch');

    // open via F1 key
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'F1' }));
    expect(helpDialog.hasAttribute('hidden')).toBe(false);
    expect(document.activeElement).toBe(helpSearch);

    // close by clicking outside
    helpDialog.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(helpDialog.hasAttribute('hidden')).toBe(true);

    // reopen with question mark and close with Escape
    document.dispatchEvent(new KeyboardEvent('keydown', { key: '?' }));
    expect(helpDialog.hasAttribute('hidden')).toBe(false);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(helpDialog.hasAttribute('hidden')).toBe(true);
  });

  test('help search filters and resets on reopen', () => {
    const helpDialog = document.getElementById('helpDialog');
    const helpSearch = document.getElementById('helpSearch');
    const helpNoResults = document.getElementById('helpNoResults');

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'F1' }));
    expect(helpDialog.hasAttribute('hidden')).toBe(false);
    expect(helpSearch.value).toBe('');

    helpSearch.value = 'nonexistent';
    helpSearch.dispatchEvent(new Event('input', { bubbles: true }));

    const sections = helpDialog.querySelectorAll('[data-help-section]');
    const visible = [...sections].filter(s => !s.hasAttribute('hidden'));
    expect(visible.length).toBe(0);
    expect(helpNoResults.hasAttribute('hidden')).toBe(false);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(helpDialog.hasAttribute('hidden')).toBe(true);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'F1' }));
    expect(helpDialog.hasAttribute('hidden')).toBe(false);
    expect(helpSearch.value).toBe('');

    const sectionsAgain = helpDialog.querySelectorAll('[data-help-section]');
    const visibleAgain = [...sectionsAgain].filter(s => !s.hasAttribute('hidden'));
    expect(visibleAgain.length).toBe(sectionsAgain.length);
    expect(helpNoResults.hasAttribute('hidden')).toBe(true);
  });

  test('help search field is localized', () => {
    const helpSearch = document.getElementById('helpSearch');
    script.setLanguage('de');
    expect(helpSearch.getAttribute('placeholder')).toBe(texts.de.helpSearchPlaceholder);
    expect(helpSearch.getAttribute('aria-label')).toBe(texts.de.helpSearchLabel);
  });

  test('generateConnectorSummary labels extras', () => {
    const data = {
      power: { batteryPlateSupport: [{ type: 'V-Mount', mount: 'native' }] },
      recordingMedia: [{ type: 'CFast 2.0' }],
      viewfinder: [{ type: 'EVF' }],
      gearTypes: ['Focus'],
      connectivity: 'Wi-Fi',
      notes: 'Note'
    };
    const html = script.generateConnectorSummary(data);
    expect(html).toContain('<span class="info-box power-conn">Battery Plate: V-Mount');
    expect(html).toContain('<span class="info-box video-conn">Media: CFast 2.0');
    expect(html).toContain('<span class="info-box video-conn">Viewfinder: EVF');
    expect(html).toContain('<span class="info-box fiz-conn">Gear: Focus');
    expect(html).toContain('<span class="info-box video-conn">Connectivity: Wi-Fi');
    expect(html).toContain('<span class="info-box neutral-conn">Notes: Note');
  });

  test('generateConnectorSummary categorizes specs', () => {
    const data = {
      powerDrawWatts: 5,
      power: { input: { voltageRange: '10-20' } },
      capacity: 95,
      pinA: 10,
      dtapA: 2,
      screenSizeInches: 7,
      brightnessNits: 1000,
      wirelessTx: true,
      internalController: true,
      torqueNm: 0.5,
      power_source: 'battery'
    };
    const html = script.generateConnectorSummary(data);
    expect(html).toContain('<span class="info-box power-conn">⚡ Power: 5 W</span>');
    expect(html).toContain('<span class="info-box power-conn">🔋 Voltage: 10-20V</span>');
    expect(html).toContain('<span class="info-box power-conn">🔋 Capacity: 95 Wh</span>');
    expect(html).toContain('<span class="info-box power-conn">Pins: 10A</span>');
    expect(html).toContain('<span class="info-box power-conn">D-Tap: 2A</span>');
    expect(html).toContain('<span class="info-box video-conn">📐 Screen: 7"</span>');
    expect(html).toContain('<span class="info-box video-conn">💡 Brightness: 1000 nits</span>');
    expect(html).toContain('<span class="info-box video-conn">📡 Wireless: true</span>');
    expect(html).toContain('<span class="info-box fiz-conn">🎛️ Controller: Internal</span>');
    expect(html).toContain('<span class="info-box fiz-conn">⚙️ Torque: 0.5 Nm</span>');
    expect(html).toContain('<span class="info-box power-conn">🔌 Power Source: battery</span>');
  });

  test('generateConnectorSummary colors mount as power connection', () => {
    const data = { mount_type: 'V-Mount' };
    const html = script.generateConnectorSummary(data);
    expect(html).toContain('<span class="info-box power-conn">Mount: V-Mount</span>');
  });

  test('generateConnectorSummary omits wireless when absent', () => {
    const data = { powerDrawWatts: 5 };
    const html = script.generateConnectorSummary(data);
    expect(html).not.toContain('📡');
  });

  test('generateConnectorSummary shows wireless when false', () => {
    const data = { wirelessTx: false };
    const html = script.generateConnectorSummary(data);
    expect(html).toContain('📡 Wireless: false');
  });

  test('generateConnectorSummary shows wireless when true', () => {
    const data = { wirelessTx: true };
    const html = script.generateConnectorSummary(data);
    expect(html).toContain('📡 Wireless: true');
  });

  test('generateConnectorSummary merges duplicate labels', () => {
    const data = {
      gearTypes: ['0.6 mod', '0.8 mod'],
      fizConnectors: [{ type: 'LBUS' }, { type: 'LEMO 7-pin' }]
    };
    const html = script.generateConnectorSummary(data);
    expect(html).toContain('Gear: 0.6 mod, 0.8 mod');
    expect(html).toContain('FIZ Port: LBUS, LEMO 7-pin');
  });

  test('exportDiagramSvg includes connection labels', () => {
    global.devices.cameras.CamA.videoOutputs = [{ type: 'HDMI' }];
    global.devices.monitors.MonA.videoInputs = [{ type: 'HDMI' }];

    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    addOpt('monitorSelect', 'MonA');

    script.renderSetupDiagram();
    const svg = script.exportDiagramSvg();
    expect(svg).toContain('edge-label');
    expect(svg).toContain('HDMI');
  });

  test('exportDiagramSvg always uses light theme', () => {
    global.devices.cameras.CamA.videoOutputs = [{ type: 'HDMI' }];
    global.devices.monitors.MonA.videoInputs = [{ type: 'HDMI' }];

    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    addOpt('monitorSelect', 'MonA');

    document.body.classList.add('dark-mode');
    script.renderSetupDiagram();
    const svg = script.exportDiagramSvg();
    expect(svg).not.toContain('prefers-color-scheme: dark');
    expect(svg).toContain('.node-box{fill:#e8f0fe');
  });

  test('shareSetupBtn encodes setup name in link', () => {
    const nameInput = document.getElementById('setupName');
    nameInput.value = 'My Setup';
    global.prompt = jest.fn();
    const btn = document.getElementById('shareSetupBtn');
    btn.click();
    expect(global.prompt).toHaveBeenCalled();
    const link = global.prompt.mock.calls[0][1];
    const encoded = new URL(link).searchParams.get('shared');
    const decoded = JSON.parse(LZString.decompressFromEncodedURIComponent(encoded));
    expect(decoded.setupName).toBe('My Setup');
  });

  test('shareSetupBtn includes device changes and feedback', () => {
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
    addOpt('batteryPlateSelect', 'PlateX');
    // modify device data
    devices.cameras.CamA.powerDrawWatts = 20;
    const key = script.getCurrentSetupKey();
    global.loadFeedback.mockReturnValue({ [key]: [{ runtime: '1h' }] });
    const nameInput = document.getElementById('setupName');
    nameInput.value = 'ShareAll';
    global.prompt = jest.fn();
    const btn = document.getElementById('shareSetupBtn');
    btn.click();
    const link = global.prompt.mock.calls[0][1];
    const encoded = new URL(link).searchParams.get('shared');
    const decoded = JSON.parse(LZString.decompressFromEncodedURIComponent(encoded));
    expect(decoded.changedDevices.cameras.CamA.powerDrawWatts).toBe(20);
    expect(decoded.feedback[0].runtime).toBe('1h');
  });

  test('shareSetupBtn generates shorter encoded link than base64', () => {
    global.prompt = jest.fn();
    const btn = document.getElementById('shareSetupBtn');
    btn.click();
    const link = global.prompt.mock.calls[0][1];
    const encoded = new URL(link).searchParams.get('shared');
    const decodedObj = JSON.parse(LZString.decompressFromEncodedURIComponent(encoded));
    const base64 = Buffer.from(JSON.stringify(decodedObj)).toString('base64');
    expect(encoded.length).toBeLessThan(base64.length);
  });

  test('applySharedSetupFromUrl restores setup name', () => {
    const data = { setupName: 'Shared Setup' };
    const encoded = LZString.compressToEncodedURIComponent(JSON.stringify(data));
    window.history.pushState({}, '', `/?shared=${encoded}`);
    const nameInput = document.getElementById('setupName');
    nameInput.value = '';
    script.applySharedSetupFromUrl();
    expect(nameInput.value).toBe('Shared Setup');
  });

  test('applySharedSetupFromUrl applies device changes and feedback', () => {
    const payload = {
      camera: 'CamB',
      changedDevices: { cameras: { CamB: { powerDrawWatts: 15 } } },
      feedback: [{ runtime: '2h' }]
    };
    const encoded = LZString.compressToEncodedURIComponent(JSON.stringify(payload));
    window.history.pushState({}, '', `/?shared=${encoded}`);
    script.applySharedSetupFromUrl();
    expect(devices.cameras.CamB.powerDrawWatts).toBe(15);
    const camSelect = document.getElementById('cameraSelect');
    const hasCamB = Array.from(camSelect.options).some(o => o.value === 'CamB');
    expect(hasCamB).toBe(true);
    expect(camSelect.value).toBe('CamB');
    const key = script.getCurrentSetupKey();
    expect(global.saveFeedback).toHaveBeenCalledWith({ [key]: [{ runtime: '2h' }] });
  });
});

describe('monitor wireless metadata', () => {
  test('SmallHD Ultra 7 has wirelessTx set to false', () => {
    const devices = require('../data.js');
    expect(devices.monitors['SmallHD Ultra 7'].wirelessTx).toBe(false);
  });

  test('wirelessTx monitors include latency information', () => {
    const monitors = require('../data.js').monitors;
    Object.values(monitors).forEach((monitor) => {
      if (monitor.wirelessTx) {
        expect(monitor.latencyMs).toBeDefined();
      }
    });
  });

  test('latency values are set for key wireless monitors', () => {
    const monitors = require('../data.js').monitors;
    expect(monitors['SmallHD Cine 7 Bolt 4K TX'].latencyMs).toBe('< 1ms');
    expect(monitors['Hollyland Pyro 7 (RX/TX)'].latencyMs).toBe('50ms');
    expect(monitors['Hollyland Mars M1 Enhanced (RX/TX)'].wirelessTx).toBe(true);
    expect(monitors['Hollyland Mars M1 Enhanced (RX/TX)'].latencyMs).toBe('< 80ms');
  });

  test('editing monitor retains latency value', () => {
    const addDeviceBtn = document.getElementById('addDeviceBtn');
    document.getElementById('newCategory').value = 'monitors';
    document.getElementById('newName').value = 'MonA';
    document.getElementById('monitorWatt').value = '5';
    document.getElementById('monitorWirelessTx').checked = true;
    document.getElementById('monitorLatency').value = '10ms';

    addDeviceBtn.dataset.mode = 'edit';
    addDeviceBtn.dataset.originalName = 'MonA';
    addDeviceBtn.click();

    expect(global.devices.monitors.MonA.latencyMs).toBe('10ms');
  });
});
