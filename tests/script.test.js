/* global texts devices */
const fs = require('fs');
const path = require('path');
const LZString = require('lz-string');

describe('script.js functions', () => {
  let script;

  beforeEach(() => {
    jest.resetModules();

    global.alert = jest.fn();
    global.prompt = jest.fn();
    Object.assign(navigator, { clipboard: { writeText: jest.fn().mockResolvedValue() } });

    const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
    const body = html.split('<body>')[1].split('</body>')[0];
    document.body.innerHTML = body;
    document.head.innerHTML = '<meta name="theme-color" content="#ffffff">';

    global.devices = {
      cameras: {
        CamA: {
          powerDrawWatts: 10,
          power: { input: { type: 'LEMO 2-pin' } },
          videoOutputs: [{ type: '3G-SDI' }]
        }
      },
      monitors: {
        MonA: {
          powerDrawWatts: 5,
          brightnessNits: 2300,
          power: { input: { type: 'LEMO 2-pin' } },
          videoInputs: [{ type: '3G-SDI' }]
        }
      },
      video: {
        VidA: {
          powerDrawWatts: 3,
          power: { input: { type: 'LEMO 2-pin' } },
          videoInputs: [{ type: '3G-SDI' }]
        }
      },
      fiz: {
        motors: {
          MotorA: { powerDrawWatts: 2, fizConnectors: [{ type: 'LBUS (LEMO 4-pin)' }], power: { input: { type: 'LEMO 2-pin' } } }
        },
        controllers: {
          ControllerA: { powerDrawWatts: 2, fizConnectors: [{ type: 'LBUS (LEMO 4-pin)' }], power: { input: { type: 'LEMO 2-pin' } } }
        },
        distance: {
          DistA: { powerDrawWatts: 1, power: { input: { type: 'LEMO 2-pin' } } }
        }
      },
      batteries: {
        BattA: { capacity: 100, pinA: 10, dtapA: 5, mount_type: 'V-Mount' }
      },
      accessories: {
        powerPlates: { 'Generic V-Mount Plate': { mount: 'V-Mount' } },
        cages: { 'Universal Cage': { compatible: ['CamA'] } },
        chargers: {
          'Single V-Mount Charger': { mount: 'V-Mount', slots: 1 },
          'Dual V-Mount Charger': { mount: 'V-Mount', slots: 2 },
          'Quad V-Mount Charger': { mount: 'V-Mount', slots: 4 }
        },
        cables: {
          power: { 'D-Tap to LEMO 2-pin': { to: 'LEMO 2-pin' } },
          fiz: { 'LBUS to LBUS': { from: 'LBUS (LEMO 4-pin)', to: 'LBUS (LEMO 4-pin)' } },
          video: { 'BNC SDI Cable': { type: '3G-SDI' } }
        }
      }
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
    global.loadGearList = jest.fn(() => '');
    global.saveGearList = jest.fn();
    global.deleteGearList = jest.fn();

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

  test('copy summary button is placed before generate gear list button', () => {
    const copyBtn = document.getElementById('copySummaryBtn');
    const generateBtn = document.getElementById('generateGearListBtn');
    expect(copyBtn.nextElementSibling).toBe(generateBtn);
  });

  test('selected cage appears in camera support category of gear list', () => {
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    addOpt('batterySelect', 'BattA');
    addOpt('cageSelect', 'Universal Cage');

    const html = script.generateGearListHtml();
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const cameraSupportIndex = rows.findIndex(r => r.textContent === 'Camera Support');
    expect(cameraSupportIndex).toBeGreaterThanOrEqual(0);
    const itemsRow = rows[cameraSupportIndex + 1];
    expect(itemsRow.textContent).toContain('1x Universal Cage');
  });

  test('gear list updates when device selection changes', () => {
    const projectDialog = document.getElementById('projectDialog');
    projectDialog.close = jest.fn();
    const cameraSelect = document.getElementById('cameraSelect');
    cameraSelect.innerHTML = '<option value="CamA">CamA</option>';
    cameraSelect.value = 'CamA';
    const cageSelect = document.getElementById('cageSelect');
    cageSelect.innerHTML = '<option value="Cage1">Cage1</option><option value="Cage2">Cage2</option>';
    cageSelect.value = 'Cage1';
    document.getElementById('projectName').value = 'Proj';
    const projectForm = document.getElementById('projectForm');
    projectForm.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    const gearList = document.getElementById('gearListOutput');
    expect(gearList.innerHTML).toContain('Cage1');
    cageSelect.value = 'Cage2';
    cageSelect.dispatchEvent(new Event('change', { bubbles: true }));
    expect(gearList.innerHTML).toContain('Cage2');
  });

  test('suggests chargers based on total batteries', () => {
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    addOpt('batterySelect', 'BattA');

    document.getElementById('batteryCount').textContent = '9';
    const monElem = document.createElement('span');
    monElem.id = 'monitoringBatteryCount';
    monElem.textContent = '0';
    document.body.appendChild(monElem);

    const html = script.generateGearListHtml();
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const chargersIndex = rows.findIndex(r => r.textContent === 'Chargers');
    expect(chargersIndex).toBeGreaterThanOrEqual(0);
    const itemsRow = rows[chargersIndex + 1];
    expect(itemsRow.textContent).toContain('2x Quad V-Mount Charger');
    expect(itemsRow.textContent).toContain('1x Dual V-Mount Charger');
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

    expect(document.getElementById('batteryLife').textContent).toBe('2.39');
    const expectedLabel = texts.en.batteryLifeLabel.replace(
      '):',
      `, ${texts.en.runtimeUserCountNote.replace('{count}', 5)}):`
    );
    expect(document.getElementById('batteryLifeLabel').textContent).toBe(
      expectedLabel
    );
    expect(document.getElementById('runtimeAverageNote').textContent).toBe(
      texts.en.runtimeAverageNote
    );
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

    expect(document.getElementById('batteryLife').textContent).toBe('1.77');
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
      { temp: '5', expected: '1.72' },
      { temp: '-5', expected: '1.91' },
      { temp: '-15', expected: '2.22' }
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
    expect(firstRuntime).toBe('2.39');
  });

  test('F1 opens help dialog even when input focused', () => {
    const helpDialog = document.getElementById('helpDialog');
    const input = document.getElementById('setupName');
    input.focus();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'F1' }));
    expect(helpDialog.hasAttribute('hidden')).toBe(false);
  });

  test('Ctrl+/ opens help dialog', () => {
    const helpDialog = document.getElementById('helpDialog');
    const input = document.getElementById('setupName');
    input.focus();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: '/', ctrlKey: true }));
    expect(helpDialog.hasAttribute('hidden')).toBe(false);
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

    expect(document.getElementById('batteryLife').textContent).toBe('2.18');
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

    expect(document.getElementById('batteryLife').textContent).toBe('2.17');
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

    expect(document.getElementById('batteryLife').textContent).toBe('2.25');
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

  test('filter input clears on Escape key press', () => {
    const camSel = document.getElementById('cameraSelect');
    camSel.innerHTML = '<option value="CamA">CamA</option><option value="CamB">CamB</option>';

    const filterInput = document.getElementById('cameraFilter');
    filterInput.value = 'CamA';
    filterInput.dispatchEvent(new Event('input'));
    expect(camSel.options[1].hidden).toBe(true);

    filterInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(filterInput.value).toBe('');
    expect(camSel.options[1].hidden).toBe(false);
  });

  test('filter input clears after selecting an option', () => {
    const camSel = document.getElementById('cameraSelect');
    camSel.innerHTML = '<option value="CamA">CamA</option><option value="CamB">CamB</option>';

    const filterInput = document.getElementById('cameraFilter');
    filterInput.value = 'CamA';
    filterInput.dispatchEvent(new Event('input'));
    expect(camSel.options[1].hidden).toBe(true);

    camSel.value = 'CamA';
    camSel.dispatchEvent(new Event('change'));
    expect(filterInput.value).toBe('');
    expect(camSel.options[1].hidden).toBe(false);
  });

  test('clear filters button resets all filter fields', () => {
    const camSel = document.getElementById('cameraSelect');
    camSel.innerHTML = '<option value="CamA">CamA</option><option value="CamB">CamB</option>';

    const ids = ['cameraFilter','monitorFilter','videoFilter','motorFilter','controllerFilter','distanceFilter','batteryFilter'];
    ids.forEach(id => {
      const inp = document.getElementById(id);
      inp.value = 'x';
      inp.dispatchEvent(new Event('input'));
    });

    document.getElementById('clearFiltersBtn').click();

    ids.forEach(id => {
      expect(document.getElementById(id).value).toBe('');
    });
    expect(camSel.options[1].hidden).toBe(false);
  });

  test('filter inputs disable autocomplete and spellcheck', () => {
    const ids = [
      'cameraFilter', 'monitorFilter', 'videoFilter', 'motorFilter',
      'controllerFilter', 'distanceFilter', 'batteryFilter',
      'cameraListFilter', 'monitorListFilter', 'videoListFilter',
      'motorListFilter', 'controllerListFilter', 'distanceListFilter',
      'batteryListFilter'
    ];
    ids.forEach(id => {
      const inp = document.getElementById(id);
      expect(inp.getAttribute('autocomplete')).toBe('off');
      expect(inp.getAttribute('autocorrect')).toBe('off');
      expect(inp.getAttribute('autocapitalize')).toBe('off');
      expect(inp.getAttribute('spellcheck')).toBe('false');
      expect(inp.getAttribute('type')).toBe('search');
      expect(inp.getAttribute('inputmode')).toBe('search');
    });
  });

  test('skip link focuses main content', () => {
    const main = document.getElementById('mainContent');
    const skip = document.getElementById('skipLink');
    expect(document.activeElement).not.toBe(main);
    skip.click();
    expect(document.activeElement).toBe(main);
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

    script.generatePrintableOverview();
    const dialog = document.getElementById('overviewDialog');
    expect(dialog.open).toBe(true);
    const html = dialog.innerHTML;
    expect(html).toContain('VBatt');
    expect(html).not.toContain('BBatt');
  });

  test('setLanguage updates language and saves preference', () => {
    script.setLanguage('de');
    expect(document.documentElement.lang).toBe('de');
    expect(localStorage.getItem('language')).toBe('de');
    expect(document.getElementById('mainTitle').textContent).toBe('Kamera-Stromverbrauchs-App');
    expect(document.getElementById('offlineIndicator').textContent).toBe(texts.de.offlineIndicator);
  });

  test('setLanguage supports Spanish', () => {
    script.setLanguage('es');
    expect(document.documentElement.lang).toBe('es');
    expect(localStorage.getItem('language')).toBe('es');
    expect(document.getElementById('mainTitle').textContent).toBe('Aplicación de Consumo de Energía para Cámaras');
    expect(document.getElementById('offlineIndicator').textContent).toBe(texts.es.offlineIndicator);
  });

  test('defaults to browser language when no preference saved', () => {
    jest.resetModules();

    global.alert = jest.fn();
    global.prompt = jest.fn();
    Object.assign(navigator, { clipboard: { writeText: jest.fn().mockResolvedValue() } });

    const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
    const body = html.split('<body>')[1].split('</body>')[0];
    document.body.innerHTML = body;
    document.head.innerHTML = '<meta name="theme-color" content="#ffffff">';

    global.loadDeviceData = jest.fn(() => null);
    global.saveDeviceData = jest.fn();
    global.loadSetups = jest.fn(() => ({}));
    global.saveSetups = jest.fn();
    global.saveSetup = jest.fn();
    global.loadSetup = jest.fn();
    global.deleteSetup = jest.fn();
    global.loadFeedback = jest.fn(() => ({}));
    global.saveFeedback = jest.fn();

    localStorage.removeItem('language');
    Object.defineProperty(navigator, 'language', { value: 'fr-FR', configurable: true });
    Object.defineProperty(navigator, 'languages', { value: ['fr-FR'], configurable: true });

    require('../translations.js');
    require('../script.js');

    expect(document.documentElement.lang).toBe('fr');
    expect(localStorage.getItem('language')).toBe('fr');
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

  test('applyDarkMode toggles class, aria-pressed and theme color', () => {
    const { applyDarkMode } = script;
    const toggle = document.getElementById('darkModeToggle');
    const meta = document.querySelector('meta[name="theme-color"]');
    applyDarkMode(true);
    expect(document.body.classList.contains('dark-mode')).toBe(true);
    expect(document.documentElement.classList.contains('dark-mode')).toBe(true);
    expect(toggle.textContent).toBe('☀️');
    expect(toggle.getAttribute('aria-pressed')).toBe('true');
    expect(meta.getAttribute('content')).toBe('#1c1c1e');
    applyDarkMode(false);
    expect(document.body.classList.contains('dark-mode')).toBe(false);
    expect(document.documentElement.classList.contains('dark-mode')).toBe(false);
    expect(toggle.textContent).toBe('🌙');
    expect(toggle.getAttribute('aria-pressed')).toBe('false');
    expect(meta.getAttribute('content')).toBe('#ffffff');
  });

  test('applyPinkMode toggles class and aria-pressed', () => {
    const { applyPinkMode } = script;
    const toggle = document.getElementById('pinkModeToggle');
    applyPinkMode(true);
    expect(document.body.classList.contains('pink-mode')).toBe(true);
    expect(toggle.textContent).toBe('🦄');
    expect(toggle.getAttribute('aria-pressed')).toBe('true');
    applyPinkMode(false);
    expect(document.body.classList.contains('pink-mode')).toBe(false);
    expect(toggle.textContent).toBe('🐴');
    expect(toggle.getAttribute('aria-pressed')).toBe('false');
  });

  test('generatePrintableOverview includes diagram and device blocks', () => {
    const { generatePrintableOverview } = script;
    document.getElementById('setupName').value = 'Test';
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    script.updateCalculations();
    generatePrintableOverview();
    const dialog = document.getElementById('overviewDialog');
    expect(dialog.open).toBe(true);
    const html = dialog.innerHTML;
    expect(html).toContain('id="diagramArea"');
    expect(html).toContain('<svg');
    expect(html).toContain('class="device-block"');
    expect(html).toContain('id="breakdownList"');
    expect(html).toContain(`<strong>${texts.en.cameraLabel}</strong>`);
  });

  test('generatePrintableOverview removes dark mode styling when active', () => {
    const { generatePrintableOverview } = script;
    document.body.classList.add('dark-mode');
    document.getElementById('setupName').value = 'Test';
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    script.updateCalculations();
    generatePrintableOverview();
    const content = document.querySelector('#overviewDialogContent');
    expect(content.classList.contains('dark-mode')).toBe(false);
    expect(document.body.classList.contains('dark-mode')).toBe(false);
  });

  test('generateGearListHtml returns table with categories and accessories', () => {
      const { generateGearListHtml } = script;
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
      const html = generateGearListHtml({ projectName: 'Proj', dop: 'DopName' });
      expect(html).toContain('<h2>Proj</h2>');
      expect(html).toContain('<h3>Project Requirements</h3>');
      expect(html).toContain('DoP: DopName');
      expect(html).toContain('<table class="gear-table">');
      expect(html).toContain('Camera');
      expect(html).toContain('1x CamA');
      expect(html).toContain('Camera Support');
      expect(html).toContain('1x Universal Cage');
      expect(html).toContain('LDS (FIZ)');
      expect(html).toContain('1x LBUS to LBUS');
      expect(html).toContain('Chargers');
      expect(html).toContain('1x Dual V-Mount Charger');
      expect(html).toContain('Miscellaneous');
      expect(html).toContain('1x BNC SDI Cable');
    });

  test('gear list separates multiple items with line breaks', () => {
    const { generateGearListHtml } = script;
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('monitorSelect', 'MonA');
    addOpt('videoSelect', 'VidA');
    const html = generateGearListHtml({ projectName: 'Proj' });
    expect(html).toContain('<strong>Onboard Monitor</strong> - 1x MonA - incl. Sunhood<br><strong>Wireless Transmitter</strong> - 1x VidA');
    expect(html).not.toContain('MonA, VidA');
  });

  test('gear list includes battery count in camera batteries row', () => {
    const { generateGearListHtml } = script;
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('batterySelect', 'BattA');
    document.getElementById('batteryCount').textContent = '6';
    const html = generateGearListHtml();
    expect(html).toContain('6x BattA');
  });

  test('duplicate motors are aggregated with count in gear list', () => {
    const { generateGearListHtml } = script;
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('motor1Select', 'MotorA');
    addOpt('motor2Select', 'MotorA');
    const html = generateGearListHtml({ projectName: 'Proj' });
    expect(html).toContain('2x MotorA');
  });

  test('alert shown if battery cannot power setup over pins when generating gear list', () => {
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
    devices.batteries.BattA.pinA = 0.1;
    script.updateCalculations();
    const setupSelectElem = document.getElementById('setupSelect');
    setupSelectElem.innerHTML = '<option value="Test">Test</option>';
    setupSelectElem.value = 'Test';
    const dialog = document.getElementById('projectDialog');
    dialog.showModal = jest.fn();
    document.getElementById('generateGearListBtn').click();
    const current = (23 / 12).toFixed(2);
    expect(alert).toHaveBeenCalledWith(
      texts.en.warnPinExceeded.replace('{current}', current).replace('{max}', '0.1')
    );
    expect(dialog.showModal).not.toHaveBeenCalled();
  });

  test('viewfinder is auto-added for Alexa Mini and Amira', () => {
    const { generateGearListHtml } = script;
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'Arri Alexa Mini');
    const html = generateGearListHtml();
    expect(html).toContain('ARRI K2.75004.0 MVF-1 Viewfinder');
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

    const nameInput = document.getElementById('setupName');
    nameInput.value = 'TestSetup';
    nameInput.dispatchEvent(new Event('input', { bubbles: true }));
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

  test('saving setup stores gear list HTML', () => {
    global.saveSetups.mockClear();
    const gear = document.getElementById('gearListOutput');
    gear.innerHTML = '<table></table>';
    const nameInput = document.getElementById('setupName');
    nameInput.value = 'WithGear';
    nameInput.dispatchEvent(new Event('input', { bubbles: true }));
    document.getElementById('saveSetupBtn').click();
    const saved = global.saveSetups.mock.calls[0][0];
    expect(saved.WithGear.gearList).toContain('<table>');
  });

  test('Save button enables on input and Enter key saves setup', () => {
    const saveSpy = global.saveSetups;
    const nameInput = document.getElementById('setupName');
    const saveBtn = document.getElementById('saveSetupBtn');
    expect(saveBtn.disabled).toBe(true);

    nameInput.value = 'QuickSave';
    nameInput.dispatchEvent(new Event('input', { bubbles: true }));
    expect(saveBtn.disabled).toBe(false);

    nameInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(saveSpy).toHaveBeenCalled();
  });

  test('Save button shows Update after modifying loaded setup', () => {
    global.saveSetups.mockClear();
    global.loadSetups.mockClear();
    const camSel = document.getElementById('cameraSelect');
    camSel.innerHTML = '<option value="Cam1">Cam1</option><option value="Cam2">Cam2</option>';
    camSel.value = 'Cam1';

    const nameInput = document.getElementById('setupName');
    const saveBtn = document.getElementById('saveSetupBtn');
    nameInput.value = 'MySetup';
    nameInput.dispatchEvent(new Event('input', { bubbles: true }));
    saveBtn.click();

    const saved = global.saveSetups.mock.calls[0][0];
    global.loadSetups.mockReturnValue(saved);
    const sel = document.getElementById('setupSelect');
    sel.innerHTML = '<option value="">-- New Setup --</option><option value="MySetup">MySetup</option>';
    sel.value = 'MySetup';
    sel.dispatchEvent(new Event('change'));
    expect(saveBtn.textContent).toBe('Save');

    camSel.value = 'Cam2';
    camSel.dispatchEvent(new Event('change'));
    expect(saveBtn.textContent).toBe('Update');
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

  test('nodes move while dragging', () => {
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    addOpt('batterySelect', 'BattA');

    script.renderSetupDiagram();

    const node = document.querySelector('#diagramArea .diagram-node[data-node="battery"]');
    node.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0, bubbles: true }));
    window.dispatchEvent(new MouseEvent('mousemove', { clientX: 15, clientY: 25, bubbles: true }));
    expect(node.getAttribute('transform')).toBe('translate(15,25)');
    window.dispatchEvent(new MouseEvent('mouseup', { clientX: 15, clientY: 25, bubbles: true }));
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

  test('reset view restores default pan and zoom', () => {
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    addOpt('batterySelect', 'BattA');

    script.renderSetupDiagram();

    const zoomBtn = document.getElementById('zoomIn');
    const resetBtn = document.getElementById('resetView');
    const svg = document.querySelector('#diagramArea svg');

    zoomBtn.click();
    svg.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0, bubbles: true }));
    window.dispatchEvent(new MouseEvent('mousemove', { clientX: 50, clientY: 40, bubbles: true }));
    window.dispatchEvent(new MouseEvent('mouseup', { clientX: 50, clientY: 40, bubbles: true }));

    const root = svg.querySelector('#diagramRoot') || svg;
    expect(root.getAttribute('transform')).toBe('translate(50,40) scale(1.1)');
    resetBtn.click();
    expect(root.getAttribute('transform')).toBe('translate(0,0) scale(1)');
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

  test('slash or Ctrl+F focuses help search', () => {
    const helpDialog = document.getElementById('helpDialog');
    const helpSearch = document.getElementById('helpSearch');

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'F1' }));
    expect(helpDialog.hasAttribute('hidden')).toBe(false);
    helpDialog.focus();
    expect(document.activeElement).toBe(helpDialog);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: '/' }));
    expect(document.activeElement).toBe(helpSearch);

    helpDialog.focus();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'f', ctrlKey: true }));
    expect(document.activeElement).toBe(helpSearch);
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

  test('help clear button resets search', () => {
    const helpDialog = document.getElementById('helpDialog');
    const helpSearch = document.getElementById('helpSearch');
    const helpSearchClear = document.getElementById('helpSearchClear');
    const helpNoResults = document.getElementById('helpNoResults');

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'F1' }));
    helpSearch.value = 'battery';
    helpSearch.dispatchEvent(new Event('input', { bubbles: true }));
    expect(helpSearchClear.hasAttribute('hidden')).toBe(false);
    const mark = helpDialog.querySelector('mark');
    expect(mark).not.toBeNull();
    helpSearchClear.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(helpSearch.value).toBe('');
    const sections = helpDialog.querySelectorAll('[data-help-section]');
    const visible = [...sections].filter(s => !s.hasAttribute('hidden'));
    expect(visible.length).toBe(sections.length);
    expect(helpNoResults.hasAttribute('hidden')).toBe(true);
    expect(helpSearchClear.hasAttribute('hidden')).toBe(true);
    expect(helpDialog.querySelector('mark')).toBeNull();
    expect(document.activeElement).toBe(helpSearch);
  });

  test('help search works when NodeList lacks iterator', () => {
    const helpDialog = document.getElementById('helpDialog');
    const helpSearch = document.getElementById('helpSearch');

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'F1' }));

    const originalIterator = NodeList.prototype[Symbol.iterator];
    NodeList.prototype[Symbol.iterator] = undefined;

    expect(() => {
      helpSearch.value = 'battery';
      helpSearch.dispatchEvent(new Event('input', { bubbles: true }));
    }).not.toThrow();

    const sections = Array.from(helpDialog.querySelectorAll('[data-help-section]'));
    const visible = sections.filter(s => !s.hasAttribute('hidden'));
    expect(visible.length).toBeGreaterThan(0);

    NodeList.prototype[Symbol.iterator] = originalIterator;
  });

  test('help search controls are localized', () => {
    const helpSearch = document.getElementById('helpSearch');
    const helpSearchClear = document.getElementById('helpSearchClear');
    script.setLanguage('de');
    expect(helpSearch.getAttribute('placeholder')).toBe(texts.de.helpSearchPlaceholder);
    expect(helpSearch.getAttribute('aria-label')).toBe(texts.de.helpSearchLabel);
    expect(helpSearchClear.getAttribute('aria-label')).toBe(texts.de.helpSearchClear);
    expect(helpSearchClear.getAttribute('title')).toBe(texts.de.helpSearchClear);
  });

  test('help button title shows keyboard shortcut and localizes', () => {
    const helpButton = document.getElementById('helpButton');
    script.setLanguage('en');
    expect(helpButton.getAttribute('title')).toBe(texts.en.helpButtonTitle);
    script.setLanguage('de');
    expect(helpButton.getAttribute('title')).toBe(texts.de.helpButtonTitle);
  });

  test('help no results message is announced politely', () => {
    const helpNoResults = document.getElementById('helpNoResults');
    expect(helpNoResults.getAttribute('aria-live')).toBe('polite');
  });

  test('hover for help mode shows tooltip and closes dialog', () => {
    const helpDialog = document.getElementById('helpDialog');
    const hoverHelpButton = document.getElementById('hoverHelpButton');
    const helpButton = document.getElementById('helpButton');

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'F1' }));
    expect(helpDialog.hasAttribute('hidden')).toBe(false);

    hoverHelpButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(helpDialog.hasAttribute('hidden')).toBe(true);
    expect(document.body.style.cursor).toBe('help');
    expect(document.body.classList.contains('hover-help-active')).toBe(true);

    helpButton.setAttribute('data-help', 'Open help dialog');
    helpButton.dispatchEvent(new MouseEvent('mouseover', { bubbles: true, clientX: 10, clientY: 10 }));
    const tooltip = document.getElementById('hoverHelpTooltip');
    expect(tooltip.textContent).toBe('Open help dialog');
    expect(tooltip.hasAttribute('hidden')).toBe(false);

    document.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(document.getElementById('hoverHelpTooltip')).toBeNull();
    expect(document.body.style.cursor).toBe('');
    expect(document.body.classList.contains('hover-help-active')).toBe(false);
  });

  test('hover help ignores elements without descriptive attributes', () => {
    const helpDialog = document.getElementById('helpDialog');
    const hoverHelpButton = document.getElementById('hoverHelpButton');

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'F1' }));
    expect(helpDialog.hasAttribute('hidden')).toBe(false);

    hoverHelpButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(helpDialog.hasAttribute('hidden')).toBe(true);
    expect(document.body.style.cursor).toBe('help');
    expect(document.body.classList.contains('hover-help-active')).toBe(true);

    const dummy = document.createElement('button');
    dummy.textContent = 'Save setup';
    document.body.appendChild(dummy);

    dummy.dispatchEvent(
      new MouseEvent('mouseover', { bubbles: true, clientX: 10, clientY: 10 })
    );
    const tooltip = document.getElementById('hoverHelpTooltip');
    expect(tooltip.hasAttribute('hidden')).toBe(true);

    document.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(document.getElementById('hoverHelpTooltip')).toBeNull();
    expect(document.body.style.cursor).toBe('');
    expect(document.body.classList.contains('hover-help-active')).toBe(false);
  });

  test('hover help prevents dropdown content from opening', () => {
    const helpDialog = document.getElementById('helpDialog');
    const hoverHelpButton = document.getElementById('hoverHelpButton');
    const cameraSelect = document.getElementById('cameraSelect');

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'F1' }));
    expect(helpDialog.hasAttribute('hidden')).toBe(false);

    hoverHelpButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(helpDialog.hasAttribute('hidden')).toBe(true);

    const mouseEvent = new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true
    });
    cameraSelect.dispatchEvent(mouseEvent);
    expect(mouseEvent.defaultPrevented).toBe(true);

    document.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  test('hover help uses label help text for aria-labelledby controls', () => {
    const hoverHelpButton = document.getElementById('hoverHelpButton');
    const cameraSelect = document.getElementById('cameraSelect');

    hoverHelpButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    cameraSelect.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

    const tooltip = document.getElementById('hoverHelpTooltip');
    expect(tooltip.textContent).toBe(texts.en.cameraSelectHelp);

    document.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  test('saved setups label has descriptive hover help', () => {
    const label = document.getElementById('savedSetupsLabel');
    expect(label.getAttribute('data-help')).toBe(texts.en.setupSelectHelp);
  });

  test('other labels expose descriptive hover help', () => {
    const setupNameLabel = document.getElementById('setupNameLabel');
    const sharedLinkLabel = document.getElementById('sharedLinkLabel');
    const cameraLabel = document.getElementById('cameraLabel');

    expect(setupNameLabel.getAttribute('data-help')).toBe(
      texts.en.setupNameHelp
    );
    expect(sharedLinkLabel.getAttribute('data-help')).toBe(
      texts.en.sharedLinkHelp
    );
    expect(cameraLabel.getAttribute('data-help')).toBe(
      texts.en.cameraSelectHelp
    );
  });

  test('section headings expose descriptive hover help', () => {
    const setupHeading = document.getElementById('setupManageHeading');
    const resultsHeading = document.getElementById('resultsHeading');
    const actionsHeading = document.getElementById('setupActionsHeading');
    expect(setupHeading.getAttribute('data-help')).toBe(
      texts.en.setupManageHeadingHelp
    );
    expect(resultsHeading.getAttribute('data-help')).toBe(
      texts.en.resultsHeadingHelp
    );
    expect(actionsHeading.getAttribute('data-help')).toBe(
      texts.en.setupActionsHeadingHelp
    );
  });

  test('FIZ section exposes descriptive hover help', () => {
    const legend = document.getElementById('fizLegend');
    const motorsLabel = document.getElementById('fizMotorsLabel');
    const controllersLabel = document.getElementById('fizControllersLabel');
    expect(legend.getAttribute('data-help')).toBe(texts.en.fizLegendHelp);
    expect(motorsLabel.getAttribute('data-help')).toBe(texts.en.fizMotorsHelp);
    expect(controllersLabel.getAttribute('data-help')).toBe(
      texts.en.fizControllersHelp
    );
  });

  test('results section items expose descriptive hover help', () => {
    const totalPowerLabel = document.getElementById('totalPowerLabel');
    const totalCurrent144Label = document.getElementById('totalCurrent144Label');
    const totalCurrent12Label = document.getElementById('totalCurrent12Label');
    const batteryLifeLabel = document.getElementById('batteryLifeLabel');
    const batteryCountLabel = document.getElementById('batteryCountLabel');
    const breakdownList = document.getElementById('breakdownList');
    const pinWarning = document.getElementById('pinWarning');
    const dtapWarning = document.getElementById('dtapWarning');
    const temperatureNote = document.getElementById('temperatureNote');

    expect(breakdownList.getAttribute('data-help')).toBe(
      texts.en.breakdownListHelp
    );
    expect(totalPowerLabel.getAttribute('data-help')).toBe(
      texts.en.totalPowerHelp
    );
    expect(totalCurrent144Label.getAttribute('data-help')).toBe(
      texts.en.totalCurrent144Help
    );
    expect(totalCurrent12Label.getAttribute('data-help')).toBe(
      texts.en.totalCurrent12Help
    );
    expect(batteryLifeLabel.getAttribute('data-help')).toBe(
      texts.en.batteryLifeHelp
    );
    expect(batteryCountLabel.getAttribute('data-help')).toBe(
      texts.en.batteryCountHelp
    );
    expect(pinWarning.getAttribute('data-help')).toBe(
      texts.en.pinWarningHelp
    );
    expect(dtapWarning.getAttribute('data-help')).toBe(
      texts.en.dtapWarningHelp
    );
    expect(temperatureNote.getAttribute('data-help')).toBe(
      texts.en.temperatureNoteHelp
    );
  });

  test('help dialog controls expose descriptive hover help', () => {
    const helpButton = document.getElementById('helpButton');
    const hoverHelpButton = document.getElementById('hoverHelpButton');
    const helpSearch = document.getElementById('helpSearch');
    const helpSearchClear = document.getElementById('helpSearchClear');
    const closeHelp = document.getElementById('closeHelp');

    expect(helpButton.getAttribute('data-help')).toBe(texts.en.helpButtonHelp);
    expect(hoverHelpButton.getAttribute('data-help')).toBe(
      texts.en.hoverHelpButtonHelp
    );
    expect(helpSearch.getAttribute('data-help')).toBe(texts.en.helpSearchHelp);
    expect(helpSearchClear.getAttribute('data-help')).toBe(
      texts.en.helpSearchClearHelp
    );
    expect(closeHelp.getAttribute('data-help')).toBe(texts.en.helpCloseHelp);

    const helpDialog = document.getElementById('helpDialog');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'F1' }));
    hoverHelpButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    helpSearch.dispatchEvent(
      new MouseEvent('mouseover', { bubbles: true, clientX: 10, clientY: 10 })
    );
    const tooltip = document.getElementById('hoverHelpTooltip');
    expect(tooltip.textContent).toBe(texts.en.helpSearchHelp);

    document.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(helpDialog.hasAttribute('hidden')).toBe(true);
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
    const btn = document.getElementById('shareSetupBtn');
    btn.click();
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    const link = navigator.clipboard.writeText.mock.calls[0][0];
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
    const btn = document.getElementById('shareSetupBtn');
    btn.click();
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    const link = navigator.clipboard.writeText.mock.calls[0][0];
    const encoded = new URL(link).searchParams.get('shared');
    const decoded = JSON.parse(LZString.decompressFromEncodedURIComponent(encoded));
    expect(decoded.changedDevices.cameras.CamA.powerDrawWatts).toBe(20);
    expect(decoded.feedback[0].runtime).toBe('1h');
  });

  test('shareSetupBtn generates shorter encoded link than base64', () => {
    const btn = document.getElementById('shareSetupBtn');
    btn.click();
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    const link = navigator.clipboard.writeText.mock.calls[0][0];
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

  test('device manager toggle button reflects visibility', () => {
    const toggleBtn = document.getElementById('toggleDeviceManager');
    const deviceManager = document.getElementById('device-manager');

    // Initially hidden with "Edit" label
    expect(deviceManager.classList.contains('hidden')).toBe(true);
    expect(toggleBtn.textContent).toBe(texts.en.toggleDeviceManager);

    // Show device manager
    toggleBtn.click();
    expect(deviceManager.classList.contains('hidden')).toBe(false);
    expect(toggleBtn.textContent).toBe(texts.en.hideDeviceManager);

    // Hide device manager again
    toggleBtn.click();
    expect(deviceManager.classList.contains('hidden')).toBe(true);
    expect(toggleBtn.textContent).toBe(texts.en.toggleDeviceManager);
  });

  test('device manager lists include hover descriptions', () => {
    const span = document.querySelector('#cameraList .device-summary span');
    expect(span.getAttribute('title')).toContain('Power: 10 W');
    expect(span.getAttribute('data-help')).toContain('Power: 10 W');
  });

  test('detail toggle responds to keyboard events', () => {
    const detailToggle = document.querySelector('#device-manager .detail-toggle');
    const details = detailToggle.closest('li').querySelector('.device-details');

    // Initially collapsed
    expect(detailToggle.getAttribute('aria-expanded')).toBe('false');
    expect(details.style.display).toBe('none');

    // Activate with Enter key
    detailToggle.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(detailToggle.getAttribute('aria-expanded')).toBe('true');
    expect(details.style.display).toBe('block');

    // Collapse with Space key
    detailToggle.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    expect(detailToggle.getAttribute('aria-expanded')).toBe('false');
    expect(details.style.display).toBe('none');
  });
});
