/* global texts devices */
const fs = require('fs');
const path = require('path');
const LZString = require('lz-string');
const cagesData = require('../devices/cages.js');
let cageCamera = '';
let cageNames = [];
for (const [, cage] of Object.entries(cagesData)) {
  if (Array.isArray(cage.compatible) && cage.compatible.length) {
    const cam = cage.compatible[0];
    const matches = Object.entries(cagesData)
      .filter(([, c]) => Array.isArray(c.compatible) && c.compatible.includes(cam))
      .map(([n]) => n);
    if (matches.length >= 2) {
      cageCamera = cam;
      cageNames = matches;
      break;
    }
  }
}
if (!cageCamera) {
  const [firstName, firstCage] = Object.entries(cagesData)[0];
  cageCamera = Array.isArray(firstCage.compatible) && firstCage.compatible.length ? firstCage.compatible[0] : 'CamA';
  cageNames = [firstName];
}

function setupDom(removeGear) {
  jest.resetModules();
  global.alert = jest.fn();
  global.prompt = jest.fn();
  Object.assign(navigator, { clipboard: { writeText: jest.fn().mockResolvedValue() } });
  const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  const body = html.split('<body>')[1].split('</body>')[0];
  document.body.innerHTML = body;
  if (removeGear) {
    const gearEl = document.getElementById('gearListOutput');
    if (gearEl) gearEl.remove();
  }
  document.head.innerHTML = '<meta name="theme-color" content="#ffffff">';
  global.devices = {
    cameras: {
      CamA: {
        powerDrawWatts: 10,
        power: { input: { type: 'LEMO 2-pin' } },
        videoOutputs: [{ type: '3G-SDI' }]
      },
      [cageCamera]: {
        powerDrawWatts: 10,
        power: { input: { type: 'LEMO 2-pin' } },
        videoOutputs: [{ type: '3G-SDI' }]
      }
    },
    monitors: {
      MonA: {
        powerDrawWatts: 5,
        brightnessNits: 2300,
        screenSizeInches: 7,
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
    lenses: {
      LensA: { brand: 'TestBrand', tStop: 2.0, rodStandard: '15mm', rodLengthCm: 30, needsLensSupport: true, frontDiameterMm: 80, weight_g: 110 },
      LensBig: { frontDiameterMm: 110 }
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
      cages: cagesData,
      matteboxes: {
        'ARRI LMB 4x5 Pro Set': { type: 'Swing Away' },
        'ARRI LMB 4x5 Clamp-On (3-Stage)': { type: 'Clamp-On' }
      },
      chargers: {
        'Single V-Mount Charger': { mount: 'V-Mount', slots: 1, chargingSpeedAmps: 3 },
        'Dual V-Mount Charger': { mount: 'V-Mount', slots: 2, chargingSpeedAmps: 2 },
        'Quad V-Mount Charger': { mount: 'V-Mount', slots: 4, chargingSpeedAmps: 2 }
      },
      cables: {
        power: { 'D-Tap to LEMO 2-pin': { to: 'LEMO 2-pin' } },
        fiz: { 'LBUS to LBUS': { from: 'LBUS (LEMO 4-pin)', to: 'LBUS (LEMO 4-pin)' } },
        video: {
          'HDMI Cable': { type: 'HDMI' },
          'BNC Cable 0.5 m': { type: '3G-SDI' },
          'BNC Cable 1 m': { type: '3G-SDI' },
          'BNC Cable 5 m': { type: '3G-SDI' },
          'BNC Cable 10 m': { type: '3G-SDI' },
          'BNC Drum 25 m': { type: '3G-SDI' }
        }
      },
      cameraStabiliser: {
        'Easyrig 5 Vario': {
          options: ['FlowCine Serene Spring Arm', 'Easyrig - STABIL G3']
        }
      },
      tripods: {
        'Legs Large': {},
        'Legs Medium': {},
        'Legs Short': {}
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
}

test('cage data includes cage-specific attributes', () => {
  setupDom(false);
  const cage = devices.accessories.cages[cageNames[0]];
  expect(cage.brand).toBeDefined();
  expect(cage.powerDrawWatts).toBeUndefined();
});

test('Easyrig stabiliser data exposes attachments', () => {
  const gear = require('../devices/gearList.js');
  const stabiliser = gear.accessories.cameraStabiliser['Easyrig 5 Vario'];
  expect(stabiliser.options).toEqual([
    'FlowCine Serene Spring Arm',
    'Easyrig - STABIL G3'
  ]);
});

test('filter options include diopter', () => {
  const gear = require('../devices/gearList.js');
  expect(gear.filterOptions).toContain('Diopter');
});

test('restores project requirements from storage when gear list element is absent', () => {
  setupDom(true);
  const storedHtml = '<h2>Proj</h2><h3>Project Requirements</h3><div class="requirements-grid"><div class="requirement-box"><span class="req-label">Codec</span><span class="req-value">ProRes</span></div></div>';
  global.loadGearList = jest.fn(() => storedHtml);
  global.saveGearList = jest.fn();
  global.deleteGearList = jest.fn();
  require('../translations.js');
  const script = require('../script.js');
  script.setLanguage('en');
  script.setLanguage('en');
  const projOut = document.getElementById('projectRequirementsOutput');
  expect(projOut.classList.contains('hidden')).toBe(false);
  expect(projOut.innerHTML).toContain('Project Requirements');
});

test('restores project requirements from storage with gear list present', () => {
  setupDom(false);
  const storedHtml = '<h2>Proj</h2><h3>Project Requirements</h3><div class="requirements-grid"><div class="requirement-box"><span class="req-label">Codec</span><span class="req-value">ProRes</span></div></div><h3>Gear List</h3><table class="gear-table"></table>';
  global.loadGearList = jest.fn(() => storedHtml);
  global.saveGearList = jest.fn();
  global.deleteGearList = jest.fn();
  require('../translations.js');
  const script = require('../script.js');
  script.setLanguage('en');
  script.setLanguage('en');
  const projOut = document.getElementById('projectRequirementsOutput');
  expect(projOut.classList.contains('hidden')).toBe(false);
  expect(projOut.innerHTML).toContain('Project Requirements');
});

test('restores project requirements from legacy object storage', () => {
  setupDom(true);
  const storedObj = {
    projectHtml: '<h2>Proj</h2><h3>Project Requirements</h3><div class="requirements-grid"><div class="requirement-box"><span class="req-label">Codec</span><span class="req-value">ProRes</span></div></div>',
    gearHtml: ''
  };
  global.loadGearList = jest.fn(() => storedObj);
  global.saveGearList = jest.fn();
  global.deleteGearList = jest.fn();
  require('../translations.js');
  const script = require('../script.js');
  script.setLanguage('en');
  const projOut = document.getElementById('projectRequirementsOutput');
  expect(projOut.classList.contains('hidden')).toBe(false);
  expect(projOut.innerHTML).toContain('Project Requirements');
});

test('restores project requirements form from saved gear list', () => {
  setupDom(false);
  global.loadSessionState = jest.fn(() => null);
  global.saveSessionState = jest.fn();
  const stored = { projectInfo: { projectName: 'Proj' }, gearList: '<h2>Proj</h2>' };
  global.loadGearList = jest.fn(() => stored);
  global.saveGearList = jest.fn();
  global.deleteGearList = jest.fn();
  require('../translations.js');
  const script = require('../script.js');
  script.setLanguage('en');
  const projName = document.getElementById('projectName');
  expect(projName.value).toBe('Proj');
});

test('project requirements changes persist via session save', () => {
  setupDom(false);
  global.loadSessionState = jest.fn(() => null);
  const savedState = {};
  global.saveSessionState = jest.fn(state => Object.assign(savedState, state));
  global.saveGearList = jest.fn();
  require('../translations.js');
  const script = require('../script.js');
  script.setLanguage('en');
  const nameInput = document.getElementById('projectName');
  nameInput.value = 'Proj';
  nameInput.dispatchEvent(new Event('change', { bubbles: true }));
  expect(savedState.projectInfo.projectName).toBe('Proj');
});

describe('auto backup', () => {
  test('creates backup after 5 minutes when no project selected', () => {
    setupDom(false);
    const stored = {};
    global.loadSetups = jest.fn(() => stored);
    global.saveSetups = jest.fn((data) => Object.assign(stored, data));
    jest.useFakeTimers();
    require('../translations.js');
    const script = require('../script.js');
    script.setLanguage('en');
    jest.advanceTimersByTime(5 * 60 * 1000);
    expect(global.saveSetups).toHaveBeenCalled();
    const names = Object.keys(stored);
    expect(names.length).toBe(1);
    const backupName = names[0];
    expect(backupName.startsWith('saved-backup-')).toBe(true);
    expect(document.getElementById('setupSelect').value).toBe(backupName);
    jest.useRealTimers();
  });
});

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
        },
        [cageCamera]: {
          powerDrawWatts: 10,
          power: { input: { type: 'LEMO 2-pin' } },
          videoOutputs: [{ type: '3G-SDI' }]
        }
      },
      monitors: {
        MonA: {
          powerDrawWatts: 5,
          brightnessNits: 2300,
          screenSizeInches: 7,
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
        lenses: {
          LensA: { brand: 'TestBrand', tStop: 2.0, rodStandard: '15mm', rodLengthCm: 30, needsLensSupport: true, frontDiameterMm: 80, weight_g: 110 },
          LensBig: { frontDiameterMm: 110 }
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
        cages: cagesData,
        matteboxes: {
          'ARRI LMB 4x5 Pro Set': { type: 'Swing Away' },
          'ARRI LMB 4x5 15mm LWS Set 3-Stage': { type: 'Rod based' },
          'ARRI LMB 4x5 Clamp-On (3-Stage)': { type: 'Clamp-On' }
        },
        chargers: {
          'Single V-Mount Charger': { mount: 'V-Mount', slots: 1, chargingSpeedAmps: 3 },
          'Dual V-Mount Charger': { mount: 'V-Mount', slots: 2, chargingSpeedAmps: 2 },
          'Quad V-Mount Charger': { mount: 'V-Mount', slots: 4, chargingSpeedAmps: 2 }
        },
        cables: {
          power: { 'D-Tap to LEMO 2-pin': { to: 'LEMO 2-pin' } },
          fiz: { 'LBUS to LBUS': { from: 'LBUS (LEMO 4-pin)', to: 'LBUS (LEMO 4-pin)' } },
          video: {
            'HDMI Cable': { type: 'HDMI' },
            'BNC Cable 0.5 m': { type: '3G-SDI' },
            'BNC Cable 1 m': { type: '3G-SDI' },
            'BNC Cable 5 m': { type: '3G-SDI' },
            'BNC Cable 10 m': { type: '3G-SDI' },
            'BNC Drum 25 m': { type: '3G-SDI' }
          }
        },
        cameraStabiliser: {
          'Easyrig 5 Vario': {
            options: ['FlowCine Serene Spring Arm', 'Easyrig - STABIL G3']
          }
        },
        tripods: {
          'Legs Large': {},
          'Legs Medium': {},
          'Legs Short': {}
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

  test('project form includes user buttons multiselects', () => {
    ['monitorUserButtons', 'cameraUserButtons', 'viewfinderUserButtons'].forEach(id => {
      const sel = document.getElementById(id);
      expect(sel).not.toBeNull();
      expect(sel.tagName).toBe('SELECT');
      expect(sel.multiple).toBe(true);
      expect(sel.size).toBe(sel.options.length);
      const values = Array.from(sel.options).map(o => o.value);
      expect(values).toEqual(expect.arrayContaining(['Toggle LUT', 'False Color', 'Peaking']));
    });
  });

  test('new device form includes cable category option', () => {
    const select = document.getElementById('newCategory');
    const hasCable = Array.from(select.options).some(o => o.value === 'accessories.cables');
    expect(hasCable).toBe(true);
  });

  test('populateLensDropdown fills lens list without duplicates and adds attributes', () => {
    const sel = document.getElementById('lenses');
    sel.innerHTML = '<option value="Existing">Existing</option>';
    script.populateLensDropdown();
    expect(Array.from(sel.options).map(o => o.value)).toEqual(['LensA', 'LensBig']);
    expect(sel.options[0].textContent).toContain('LensA');
    expect(sel.options[0].textContent).toContain('110g');
    expect(sel.options[0].textContent).toContain('80mm front');
    // Call again to ensure no duplication occurs
    script.populateLensDropdown();
    expect(Array.from(sel.options).map(o => o.value)).toEqual(['LensA', 'LensBig']);
  });

  test('lens selector supports in-select search', () => {
    const sel = document.getElementById('lenses');
    sel.innerHTML = '<option value="Alpha">Alpha</option><option value="Beta">Beta</option>';
    sel.focus();
    sel.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }));
    const [alpha, beta] = sel.options;
    expect(alpha.hidden).toBe(true);
    expect(beta.hidden).toBe(false);
  });


  test('gear list lens row includes lens attributes', () => {
    const html = script.generateGearListHtml({ lenses: 'LensA' });
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const lensIndex = rows.findIndex(r => r.textContent === 'Lens');
    const lensRow = rows[lensIndex + 1];
    expect(lensRow.textContent).toContain('LensA');
    expect(lensRow.textContent).toContain('110g');
    expect(lensRow.textContent).toContain('80mm front');
  });

  test('selected cage appears in camera support category of gear list', () => {
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', cageCamera);
    addOpt('batterySelect', 'BattA');
    addOpt('cageSelect', cageNames[0]);

    const html = script.generateGearListHtml();
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const cameraSupportIndex = rows.findIndex(r => r.textContent === 'Camera Support');
    expect(cameraSupportIndex).toBeGreaterThanOrEqual(0);
    const itemsRow = rows[cameraSupportIndex + 1];
    const cageSel = itemsRow.querySelector('#gearListCage');
    expect(cageSel).not.toBeNull();
    expect(cageSel.value).toBe(cageNames[0]);
  });

  test('selected lens adds rods and support to lens support category of gear list', () => {
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', cageCamera);
    addOpt('batterySelect', 'BattA');
    addOpt('cageSelect', cageNames[0]);
    const html = script.generateGearListHtml({ lenses: 'LensA' });
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const lensIndex = rows.findIndex(r => r.textContent === 'Lens');
    expect(lensIndex).toBeGreaterThanOrEqual(0);
    const lensRow = rows[lensIndex + 1];
    expect(lensRow.textContent).toContain('LensA');
    const supportIndex = rows.findIndex(r => r.textContent === 'Lens Support');
    const supportRow = rows[supportIndex + 1];
    expect(supportRow.textContent).toContain('15mm rods 30cm');
    expect(supportRow.textContent).toContain('15mm lens support');
  });

  test('selected lens does not appear in project requirements list', () => {
    const html = script.generateGearListHtml({ lenses: 'LensA' });
    expect(html).not.toContain('Lenses: LensA');
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const lensIndex = rows.findIndex(r => r.textContent === 'Lens');
    expect(lensIndex).toBeGreaterThanOrEqual(0);
    const lensRow = rows[lensIndex + 1];
    expect(lensRow.textContent).toContain('LensA');
  });

  test('gear list updates when device selection changes', () => {
    const projectDialog = document.getElementById('projectDialog');
    projectDialog.close = jest.fn();
    const cameraSelect = document.getElementById('cameraSelect');
    cameraSelect.innerHTML = `<option value="${cageCamera}">${cageCamera}</option>`;
    cameraSelect.value = cageCamera;
    const cageSelect = document.getElementById('cageSelect');
    cageSelect.innerHTML = `<option value="${cageNames[0]}">${cageNames[0]}</option><option value="${cageNames[1]}">${cageNames[1]}</option>`;
    cageSelect.value = cageNames[0];
    document.getElementById('projectName').value = 'Proj';
    const projectForm = document.getElementById('projectForm');
    projectForm.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    const gearList = document.getElementById('gearListOutput');
    let cageSelEl = gearList.querySelector('#gearListCage');
    expect(cageSelEl.value).toBe(cageNames[0]);
    cageSelect.value = cageNames[1];
    cageSelect.dispatchEvent(new Event('change', { bubbles: true }));
    cageSelEl = gearList.querySelector('#gearListCage');
    expect(cageSelEl.value).toBe(cageNames[1]);
  });

  test('gear list updates when camera selection changes', () => {
    const projectDialog = document.getElementById('projectDialog');
    projectDialog.close = jest.fn();
    devices.cameras.CamB = {
      powerDrawWatts: 12,
      power: { input: { type: 'LEMO 2-pin' } },
      videoOutputs: [{ type: '3G-SDI' }]
    };
    const cameraSelect = document.getElementById('cameraSelect');
    cameraSelect.innerHTML = `<option value="${cageCamera}">${cageCamera}</option><option value="CamB">CamB</option>`;
    cameraSelect.value = cageCamera;
    document.getElementById('projectName').value = 'Proj';
    const projectForm = document.getElementById('projectForm');
    projectForm.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    const gearList = document.getElementById('gearListOutput');
    let rows = Array.from(gearList.querySelectorAll('.gear-table tr'));
    expect(rows[1].textContent).toContain(cageCamera);
    expect(gearList.querySelector('#gearListCage')).toBeTruthy();
    cameraSelect.value = 'CamB';
    cameraSelect.dispatchEvent(new Event('change', { bubbles: true }));
    rows = Array.from(gearList.querySelectorAll('.gear-table tr'));
    expect(rows[1].textContent).toContain('CamB');
    expect(gearList.querySelector('#gearListCage')).toBeNull();
  });

  test('camera change refreshes gear list without project info', () => {
    const gearList = document.getElementById('gearListOutput');
    gearList.innerHTML = '<h3>Gear List</h3><table class="gear-table"><tr class="category-row"><td>Camera</td></tr><tr><td>CamA</td></tr></table>';
    gearList.classList.remove('hidden');
    devices.cameras.CamB = {
      powerDrawWatts: 12,
      power: { input: { type: 'LEMO 2-pin' } },
      videoOutputs: [{ type: '3G-SDI' }],
      sensorModes: ['Full'],
      recordingCodecs: ['ProRes']
    };
    const cameraSelect = document.getElementById('cameraSelect');
    cameraSelect.innerHTML = '<option value="CamA">CamA</option><option value="CamB">CamB</option>';
    cameraSelect.value = 'CamA';
    cameraSelect.value = 'CamB';
    cameraSelect.dispatchEvent(new Event('change', { bubbles: true }));
    const rows = Array.from(gearList.querySelectorAll('.gear-table tr'));
    expect(rows[1].textContent).toContain('CamB');
  });

  test('camera change runs project form logic', () => {
    const projectDialog = document.getElementById('projectDialog');
    projectDialog.close = jest.fn();
    devices.cameras.CamB = {
      powerDrawWatts: 12,
      power: { input: { type: 'LEMO 2-pin' } },
      videoOutputs: [{ type: '3G-SDI' }],
      sensorModes: ['Full'],
      recordingCodecs: ['ProRes']
    };
    const cameraSelect = document.getElementById('cameraSelect');
    cameraSelect.innerHTML = '<option value="CamA">CamA</option><option value="CamB">CamB</option>';
    cameraSelect.value = 'CamA';
    document.getElementById('projectName').value = 'Proj';
    const projectForm = document.getElementById('projectForm');
    projectForm.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    const sensorSelect = document.getElementById('sensorMode');
    const codecSelect = document.getElementById('codec');
    expect(Array.from(sensorSelect.options).some(o => o.value === 'Full')).toBe(false);
    expect(Array.from(codecSelect.options).some(o => o.value === 'ProRes')).toBe(false);
    cameraSelect.value = 'CamB';
    cameraSelect.dispatchEvent(new Event('change', { bubbles: true }));
    const sensorValues = Array.from(sensorSelect.options).map(o => o.value);
    const codecValues = Array.from(codecSelect.options).map(o => o.value);
    expect(sensorValues).toContain('Full');
    expect(codecValues).toContain('ProRes');
  });

  test('gear list cage selection is stored with selected attribute', () => {
    global.saveGearList = jest.fn();
    const gear = document.getElementById('gearListOutput');
    gear.innerHTML = '1x <select id="gearListCage"><option value="Cage1">Cage1</option><option value="Cage2">Cage2</option></select>';
    gear.classList.remove('hidden');
    const cageSel = gear.querySelector('#gearListCage');
    cageSel.value = 'Cage2';
    script.saveCurrentGearList();
    const saved = global.saveGearList.mock.calls[0][0];
    expect(saved.gearList).toContain('<option value="Cage2" selected');
  });

  test('project requirements are saved with gear list', () => {
    global.saveGearList = jest.fn();
    const proj = document.getElementById('projectRequirementsOutput');
    proj.innerHTML = '<h2>Proj</h2><h3>Project Requirements</h3><div class="requirements-grid"><div class="requirement-box"><span class="req-label">Codec</span><span class="req-value">ProRes</span></div></div>';
    proj.classList.remove('hidden');
    const gear = document.getElementById('gearListOutput');
    gear.innerHTML = '<h2>Proj</h2><h3>Gear List</h3><table class="gear-table"></table>';
    gear.classList.remove('hidden');
    script.saveCurrentGearList();
    const saved = global.saveGearList.mock.calls[0][0];
    expect(saved.gearList).toContain('<div class="requirements-grid">');
    expect(saved.gearList).toContain('<table class="gear-table">');
  });

  test('project requirements form data saved with gear list', () => {
    global.saveGearList = jest.fn();
    document.getElementById('projectName').value = 'Proj';
    const codecSel = document.getElementById('codec');
    codecSel.innerHTML = '<option value="ProRes">ProRes</option>';
    codecSel.value = 'ProRes';
    const form = document.getElementById('projectForm');
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    const saved = global.saveGearList.mock.calls[0][0];
    expect(saved.projectInfo.projectName).toBe('Proj');
    expect(saved.projectInfo.codec).toBe('ProRes');
  });

  test('project requirements form saved with project', () => {
    const stored = {};
    global.saveSetups = jest.fn((data) => Object.assign(stored, data));
    global.saveGearList = jest.fn();
    document.getElementById('projectName').value = 'Proj';
    const codecSel = document.getElementById('codec');
    codecSel.innerHTML = '<option value="ProRes">ProRes</option>';
    codecSel.value = 'ProRes';
    const form = document.getElementById('projectForm');
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    const nameInput = document.getElementById('setupName');
    nameInput.value = 'Setup1';
    nameInput.dispatchEvent(new Event('input', { bubbles: true }));
    document.getElementById('saveSetupBtn').click();
    expect(stored.Setup1.projectInfo.codec).toBe('ProRes');
  });

  test('changing device selection triggers gear list save', () => {
    global.saveGearList = jest.fn();
    const gear = document.getElementById('gearListOutput');
    gear.innerHTML = '<div>Test</div>';
    gear.classList.remove('hidden');
    const camSel = document.getElementById('cameraSelect');
    camSel.dispatchEvent(new Event('change', { bubbles: true }));
    expect(global.saveGearList).toHaveBeenCalled();
  });

  test('generate gear list hides button until deleted', () => {
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    addOpt('batterySelect', 'BattA');
    script.updateCalculations();
    const setupSelectElem = document.getElementById('setupSelect');
    setupSelectElem.innerHTML = '<option value="Test">Test</option>';
    setupSelectElem.value = 'Test';
    document.getElementById('setupName').value = 'Test Setup';
    const projectDialog = document.getElementById('projectDialog');
    projectDialog.showModal = jest.fn();
    projectDialog.close = jest.fn();
    document.getElementById('generateGearListBtn').click();
    document.getElementById('projectForm').dispatchEvent(new Event('submit', { bubbles: true }));
    const genBtn = document.getElementById('generateGearListBtn');
    expect(genBtn.classList.contains('hidden')).toBe(true);
    expect(document.getElementById('editProjectBtn')).not.toBeNull();
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);
    document.getElementById('deleteGearListBtn').click();
    confirmSpy.mockRestore();
    expect(genBtn.classList.contains('hidden')).toBe(false);
    expect(document.getElementById('editProjectBtn')).toBeNull();
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

  test('adds monitoring batteries to charger calculation', () => {
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    addOpt('batterySelect', 'BattA');
    document.getElementById('batteryCount').textContent = '9';
    const html = script.generateGearListHtml({ videoDistribution: 'Directors Monitor 7" handheld' });
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const chargersIndex = rows.findIndex(r => r.textContent === 'Chargers');
    expect(chargersIndex).toBeGreaterThanOrEqual(0);
    const itemsRow = rows[chargersIndex + 1];
    expect(itemsRow.textContent).toContain('3x Quad V-Mount Charger');
    expect(itemsRow.textContent).not.toContain('Dual V-Mount Charger');
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

  test('filter inputs disable autocomplete and spellcheck', () => {
    const ids = [
      'cameraListFilter', 'viewfinderListFilter', 'monitorListFilter', 'videoListFilter',
      'motorListFilter', 'controllerListFilter', 'distanceListFilter',
      'batteryListFilter', 'accessoryBatteryListFilter', 'cableListFilter',
      'fizCableListFilter', 'cameraSupportListFilter', 'chargerListFilter'
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
    expect(document.getElementById('mainTitle').textContent).toBe(texts.de.appTitle);
    expect(document.getElementById('offlineIndicator').textContent).toBe(texts.de.offlineIndicator);
  });

  test('setLanguage supports Spanish', () => {
    script.setLanguage('es');
    expect(document.documentElement.lang).toBe('es');
    expect(localStorage.getItem('language')).toBe('es');
    expect(document.getElementById('mainTitle').textContent).toBe(texts.es.appTitle);
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

  test('generatePrintableOverview inherits current theme classes', () => {
    const { generatePrintableOverview } = script;
    document.body.classList.add('dark-mode');
    document.body.classList.add('pink-mode');
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
    expect(content.classList.contains('dark-mode')).toBe(true);
    expect(content.classList.contains('pink-mode')).toBe(true);
  });

  test('generatePrintableOverview includes project requirements and gear list', () => {
    const { generatePrintableOverview } = script;
    document.getElementById('setupName').value = 'Test';
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    script.updateCalculations();

    const projOut = document.getElementById('projectRequirementsOutput');
    projOut.innerHTML = '<h2>Proj</h2><h3>Project Requirements</h3>';
    projOut.classList.remove('hidden');
    const gearOut = document.getElementById('gearListOutput');
    gearOut.innerHTML = '<h3>Gear List</h3><table class="gear-table"><tr class="category-row"><td>Camera</td></tr><tr><td>CamA</td></tr></table>';
    gearOut.classList.remove('hidden');

    generatePrintableOverview();
    const html = document.getElementById('overviewDialog').innerHTML;
    expect(html).toContain('Project Requirements');
    expect(html).toContain('Gear List');
    expect(html).toContain('CamA');
  });

  test('generateGearListHtml returns table with categories and accessories', () => {
      const { generateGearListHtml } = script;
      const addOpt = (id, value) => {
        const sel = document.getElementById(id);
        sel.innerHTML = `<option value="${value}">${value}</option>`;
        sel.value = value;
      };
      addOpt('cameraSelect', cageCamera);
      addOpt('monitorSelect', 'MonA');
      addOpt('videoSelect', 'VidA');
      addOpt('motor1Select', 'MotorA');
      addOpt('controller1Select', 'ControllerA');
      addOpt('distanceSelect', 'DistA');
      addOpt('batterySelect', 'BattA');
      document.getElementById('batteryCount').textContent = '1';
      const html = generateGearListHtml({
        projectName: 'Proj',
        dop: 'DopName',
        requiredScenarios: 'Handheld, Slider',
        filter: 'IRND'
      });
      expect(html).toContain('<h2>Proj</h2>');
      expect(html).toContain('<h3>Project Requirements</h3>');
      expect(html).toContain('<span class="req-label">DoP</span>');
      expect(html).toContain('<span class="req-value">DopName</span>');
      expect(html).toContain('<span class="req-label">Required Scenarios</span>');
      expect(html).toContain('<span class="req-value">Handheld, Slider</span>');
      expect(html).not.toContain('Filter: IRND');
      expect(html).toContain('Matte box + filter');
      expect(html).toContain('1x IRND');
      expect(html).toContain('<table class="gear-table">');
      expect(html).toContain('Camera');
      expect(html).toContain(`1x ${cageCamera}`);
      expect(html).toContain('Camera Support');
      expect(html).toContain('1x <select id="gearListCage"');
      expect(html).toContain(`<option value="${cageNames[0]}"`);
      expect(html).toContain('LDS (FIZ)');
      expect(html).toContain('1x LBUS to LBUS');
      expect(html).toContain('Chargers');
      expect(html).toContain('1x Quad V-Mount Charger');
      expect(html).toContain('Monitoring support');
      expect(html).toContain('Miscellaneous');
      const msSection = html.slice(html.indexOf('Monitoring support'), html.indexOf('Power'));
      expect(msSection).toContain('1x BNC Cable 0.5 m');
      expect(msSection).toContain('1x BNC Cable 1 m');
      expect(msSection).toContain('1x BNC Cable 5 m');
      expect(msSection).toContain('1x BNC Cable 10 m');
      expect(msSection).toContain('1x BNC Drum 25 m');
      expect(msSection).toContain('4x BNC Connector');
      expect(msSection).toContain('1x Antenna 5,8GHz 5dBi Long (1x Spare)');
      const powerSection = html.slice(html.indexOf('Power'), html.indexOf('Grip'));
      expect(powerSection).toContain('1x Power Cable Drum 25-50 m');
      expect(powerSection).toContain('2x Power Cable 10 m');
      expect(powerSection).toContain('2x Power Cable 5 m');
      expect(powerSection).toContain('3x Power Strip');
      expect(powerSection).toContain('3x PRCD-S (1x Portable Residual Current Device-Safety, 2x Spare)');
      expect(powerSection).toContain('3x Power Three Way Splitter');
      const miscSection = html.slice(html.indexOf('Miscellaneous'), html.indexOf('Consumables'));
      expect(miscSection).not.toContain('BNC Cable 0.5 m');
      expect(miscSection).not.toContain('BNC Cable 1 m');
      expect(miscSection).not.toContain('BNC Cable 5 m');
      expect(miscSection).not.toContain('BNC Cable 10 m');
      expect(miscSection).not.toContain('BNC Drum 25 m');
      expect(miscSection).not.toContain('BNC Connector');
      expect(miscSection).not.toContain('Power Cable Drum 25-50 m');
      expect(miscSection).not.toContain('Power Cable 10 m');
      expect(miscSection).not.toContain('Power Cable 5 m');
      expect(miscSection).not.toContain('Power Strip');
      expect(miscSection).not.toContain('PRCD-S (1x Portable Residual Current Device-Safety, 2x Spare)');
      expect(miscSection).not.toContain('Power Three Way Splitter');
      expect(html).not.toContain('BNC SDI Cable');
        expect(msSection).toContain('2x Ultraslim BNC 0.3 m (1x Focus, 1x Spare)');
        expect(msSection).toContain('2x D-Tap to Mini XLR 3-pin Cable 0,3m (1x Focus, 1x Spare)');
        expect(miscSection).not.toContain('Ultraslim BNC 0.3 m (1x Focus, 1x Spare)');
        expect(miscSection).not.toContain('D-Tap to Mini XLR 3-pin Cable 0,3m (1x Focus, 1x Spare)');
      expect(html).not.toContain('HDMI Cable');
    });

  test('standard rigging accessories are always included', () => {
    const { generateGearListHtml } = script;
    const html = generateGearListHtml({});
    const rigSection = html.slice(html.indexOf('Rigging'), html.indexOf('Power'));
    expect(rigSection).toContain('2x ULCS Bracket with 1/4 to 1/4');
    expect(rigSection).toContain('2x ULCS Bracket with 3/8 to 1/4');
    expect(rigSection).toContain('2x Noga Arm');
    expect(rigSection).toContain('2x Mini Magic Arm');
    expect(rigSection).toContain('4x Cine Quick Release');
    expect(rigSection).toContain('1x SmallRig - Super lightweight 15mm RailBlock');
    expect(rigSection).toContain('3x spigot with male 3/8" and 1/4"');
    expect(rigSection).toContain('2x D-Tap Splitter');
  });

  test.each(['Trinity', 'Steadicam'])(
    '%s scenario adds D-Tap rigging accessories',
    (scenario) => {
      const { generateGearListHtml } = script;
      const html = generateGearListHtml({ requiredScenarios: scenario });
      const rigSection = html.slice(html.indexOf('Rigging'), html.indexOf('Power'));
      expect(rigSection).toContain('4x D-Tap Splitter');
      expect(rigSection).toContain('2x D-Tap Extension 50 cm');
    }
  );

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
    expect(html).toContain('1x <strong>Onboard Monitor</strong> - 7&quot; - MonA - incl. Sunhood');
    expect(html).toContain('Wireless Transmitter</strong> - 7&quot; - VidA');
    expect(html).not.toContain('MonA, VidA');
  });

  test('gear list reflects 5" monitor selection', () => {
    const { generateGearListHtml } = script;
    const originalSize = global.devices.monitors.MonA.screenSizeInches;
    global.devices.monitors.MonA.screenSizeInches = 5;
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('monitorSelect', 'MonA');
    addOpt('videoSelect', 'VidA');
    const html = generateGearListHtml({ projectName: 'Proj' });
    expect(html).toContain(
      '1x <strong>Onboard Monitor</strong> - 5&quot; - MonA - incl. Sunhood<br><span class="gear-item" data-gear-name="Wireless Transmitter - 5&quot; - VidA">1x <strong>Wireless Transmitter</strong> - 5&quot; - VidA</span>'
    );
    global.devices.monitors.MonA.screenSizeInches = originalSize;
  });

  test('onboard monitor adds power cable to monitoring support', () => {
    const { generateGearListHtml } = script;
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    addOpt('monitorSelect', 'MonA');
    const html = generateGearListHtml();
    const msSection = html.slice(html.indexOf('<td>Monitoring support</td>'), html.indexOf('Power'));
    expect(msSection).toContain(
      '2x D-Tap to Lemo-2-pin Cable 0,5m (1x Onboard monitor, 1x Spare)'
    );
    expect(msSection).toContain(
      '2x Ultraslim BNC 0.5 m (1x Onboard monitor, 1x Spare)'
    );
    const miscSection = html.slice(html.indexOf('Miscellaneous'), html.indexOf('Consumables'));
    expect(miscSection).not.toContain('D-Tap to Lemo-2-pin Cable 0,5m');
    expect(miscSection).not.toContain('Ultraslim BNC 0.5 m');
  });

  test('Directors 7" handheld monitor adds dropdown, batteries and grip items', () => {
    const { generateGearListHtml } = script;
    global.devices.monitors = {
      'SmallHD Ultra 7': { screenSizeInches: 7 },
      MonA: { screenSizeInches: 7 }
    };
    const html = generateGearListHtml({ videoDistribution: 'Directors Monitor 7" handheld' });
    expect(html).toContain('<select id="gearListDirectorsMonitor"');
    expect(html).toContain('SmallHD Ultra 7');
    expect(html).toContain('Directors cage, shoulder strap, sunhood, rigging for teradeks');
    expect(html).toContain('3x Bebob V98micro');
    expect(html).toContain('Avenger C-Stand Sliding Leg 20" (1x Directors handheld)');
    expect(html).toContain('Steelfingers Wheel C-Stand 3er Set (1x Directors handheld)');
    expect(html).toContain('Lite-Tite Swivel Aluminium Umbrella Adapter (1x Directors handheld)');
    const rigSection = html.slice(html.indexOf('Rigging'), html.indexOf('Power'));
    expect(rigSection).toContain('4x spigot with male 3/8" and 1/4" (1x Directors handheld, 3x Spare)');
    const gripSection = html.slice(html.indexOf('Grip'), html.indexOf('Carts and Transportation'));
    expect(gripSection).not.toContain('spigot with male 3/8" and 1/4"');
    expect(html).toContain('3x Tennisball');
    expect(html).toContain('2x Ultraslim BNC 0.3 m (1x Directors handheld, 1x Spare)');
    expect(html).toContain('2x D-Tap to Lemo-2-pin Cable 0,3m (1x Directors handheld, 1x Spare)');
    const msSection = html.slice(html.indexOf('<td>Monitoring support</td>'), html.indexOf('Power'));
    expect(msSection).toContain('2x Ultraslim BNC 0.3 m (1x Directors handheld, 1x Spare)');
    expect(msSection).toContain('2x D-Tap to Lemo-2-pin Cable 0,3m (1x Directors handheld, 1x Spare)');
    const miscSection = html.slice(html.indexOf('Miscellaneous'), html.indexOf('Consumables'));
    expect(miscSection).not.toContain('Ultraslim BNC 0.3 m (1x Directors handheld, 1x Spare)');
  expect(miscSection).not.toContain('D-Tap to Lemo-2-pin Cable 0,3m (1x Directors handheld, 1x Spare)');
  });

  test('Gaffers 7" handheld monitor adds dropdown, batteries and grip items', () => {
    const { generateGearListHtml } = script;
    global.devices.monitors = {
      'SmallHD Ultra 7': { screenSizeInches: 7 },
      MonA: { screenSizeInches: 7 }
    };
    const html = generateGearListHtml({ videoDistribution: 'Gaffers Monitor 7" handheld' });
    expect(html).toContain('<select id="gearListGaffersMonitor"');
    expect(html).toContain('Gaffer Handheld Monitor');
    expect(html).toContain('3x Bebob V98micro');
    expect(html).toContain('Avenger C-Stand Sliding Leg 20" (1x Gaffers handheld)');
    expect(html).toContain('Steelfingers Wheel C-Stand 3er Set (1x Gaffers handheld)');
    expect(html).toContain('Lite-Tite Swivel Aluminium Umbrella Adapter (1x Gaffers handheld)');
    const rigSection = html.slice(html.indexOf('Rigging'), html.indexOf('Power'));
    expect(rigSection).toContain('4x spigot with male 3/8" and 1/4" (1x Gaffers handheld, 3x Spare)');
    const msSection = html.slice(html.indexOf('<td>Monitoring support</td>'), html.indexOf('Power'));
    expect(msSection).toContain('2x Ultraslim BNC 0.3 m (1x Gaffers handheld, 1x Spare)');
    expect(msSection).toContain('2x D-Tap to Lemo-2-pin Cable 0,3m (1x Gaffers handheld, 1x Spare)');
  });

  test('DoP 7" handheld monitor adds dropdown, batteries and grip items', () => {
    const { generateGearListHtml } = script;
    global.devices.monitors = {
      'SmallHD Ultra 7': { screenSizeInches: 7 },
      MonA: { screenSizeInches: 7 }
    };
    const html = generateGearListHtml({ videoDistribution: 'DoP Monitor 7" handheld' });
    expect(html).toContain('<select id="gearListDopMonitor"');
    expect(html).toContain('DoP Handheld Monitor');
    expect(html).toContain('3x Bebob V98micro');
    expect(html).toContain('Avenger C-Stand Sliding Leg 20" (1x DoP handheld)');
    expect(html).toContain('Steelfingers Wheel C-Stand 3er Set (1x DoP handheld)');
    expect(html).toContain('Lite-Tite Swivel Aluminium Umbrella Adapter (1x DoP handheld)');
    const rigSection = html.slice(html.indexOf('Rigging'), html.indexOf('Power'));
    expect(rigSection).toContain('4x spigot with male 3/8" and 1/4" (1x DoP handheld, 3x Spare)');
    const msSection = html.slice(html.indexOf('<td>Monitoring support</td>'), html.indexOf('Power'));
    expect(msSection).toContain('2x Ultraslim BNC 0.3 m (1x DoP handheld, 1x Spare)');
    expect(msSection).toContain('2x D-Tap to Lemo-2-pin Cable 0,3m (1x DoP handheld, 1x Spare)');
  });

  test('merges monitoring batteries across multiple handheld monitors', () => {
    setupDom();
    script = require('../script.js');
    const { generateGearListHtml } = script;
    const videoDistribution = [
      'Directors Monitor handheld',
      'Gaffers Monitor handheld',
      'DoP Monitor handheld',
      'Directors Monitor handheld'
    ].join(', ');
    const html = generateGearListHtml({ videoDistribution });
    expect(html).toContain('12x Bebob V98micro');
    expect(html).not.toContain('3x Bebob V98micro');
  });

  test('Directors 15-21" monitor adds dropdown and accessories', () => {
    const { generateGearListHtml } = script;
    global.devices.directorMonitors = {
      'SmallHD Cine 24" 4K High-Bright Monitor': { screenSizeInches: 24 },
      Other: { screenSizeInches: 17 }
    };
    const html = generateGearListHtml({ videoDistribution: 'Directors Monitor 15-21"' });
    expect(html).toContain('<select id="gearListDirectorsMonitor15"');
    expect(html).toContain('Directors Monitor');
    const msSection = html.slice(html.indexOf('<td>Monitoring support</td>'), html.indexOf('Power'));
    expect(msSection).toContain('D-Tap to Lemo-2-pin Cable 0,5m');
    expect(msSection).toContain('Directors 15-21"');
    const gripSection = html.slice(html.indexOf('Grip'), html.indexOf('Carts and Transportation'));
    expect(gripSection).toContain('Matthews Monitor Stand II (249562) (1x Directors 15-21")');
  });

  test('multiple handheld monitors merge grip items', () => {
    const { generateGearListHtml } = script;
    global.devices.monitors = { 'SmallHD Ultra 7': { screenSizeInches: 7 } };
    const html = generateGearListHtml({
      videoDistribution: 'Directors Monitor 7" handheld, Gaffers Monitor 7" handheld, DoP Monitor 7" handheld'
    });
    const gripSection = html.slice(html.indexOf('Grip'), html.indexOf('Carts and Transportation'));
    expect(gripSection).toContain(
      '3x Avenger C-Stand Sliding Leg 20" (1x Directors handheld, 1x Gaffers handheld, 1x DoP handheld)'
    );
    expect(gripSection).toContain(
      '3x Steelfingers Wheel C-Stand 3er Set (1x Directors handheld, 1x Gaffers handheld, 1x DoP handheld)'
    );
    expect(gripSection).toContain(
      '3x Lite-Tite Swivel Aluminium Umbrella Adapter (1x Directors handheld, 1x Gaffers handheld, 1x DoP handheld)'
    );
  });

  test('multiple handheld monitors merge wireless receivers and cables', () => {
    const { generateGearListHtml } = script;
    global.devices.video = {
      'VidA TX': {
        powerDrawWatts: 3,
        power: { input: { type: 'LEMO 2-pin' } },
        videoInputs: [{ type: '3G-SDI' }]
      }
    };
    global.devices.wirelessReceivers = { 'VidA RX': {} };
    global.devices.monitors = { 'SmallHD Ultra 7': { screenSizeInches: 7 } };
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('motor1Select', 'MotorA');
    addOpt('videoSelect', 'VidA TX');
    const html = generateGearListHtml({
      videoDistribution:
        'Directors Monitor 7" handheld, Gaffers Monitor 7" handheld, DoP Monitor 7" handheld'
    });
    expect(html).toContain('Wireless Receiver</strong> - 7&quot; - VidA RX (1x Directors handheld, 1x Gaffers handheld, 1x DoP handheld, 1x Focus)');
    const msSection = html.slice(html.indexOf('<td>Monitoring support</td>'), html.indexOf('Power'));
    expect(msSection).toContain(
      '6x D-Tap to Lemo-2-pin Cable 0,3m (1x Directors handheld, 1x Gaffers handheld, 1x DoP handheld, 3x Spare)'
    );
    expect(msSection).toContain(
      '8x Ultraslim BNC 0.3 m (1x Directors handheld, 1x Gaffers handheld, 1x DoP handheld, 1x Focus, 4x Spare)'
    );
    expect(msSection).toContain('2x D-Tap to Mini XLR 3-pin Cable 0,3m (1x Focus, 1x Spare)');
  });

  test('RX-only monitors hidden from monitor select and TX-only monitors excluded from gear list', () => {
    setupDom();
    global.devices.monitors = {
      'Mon TX': { screenSizeInches: 7, wirelessTx: true },
      'Mon RX': { screenSizeInches: 7, wirelessRX: true },
      'Mon RXTX': { screenSizeInches: 7, wirelessTx: true, wirelessRX: true },
      'Mon Plain': { screenSizeInches: 7 }
    };
    const script = require('../script.js');
    const options = Array.from(document.getElementById('monitorSelect').options).map(o => o.value);
    expect(options).toContain('Mon TX');
    expect(options).toContain('Mon RXTX');
    expect(options).toContain('Mon Plain');
    expect(options).not.toContain('Mon RX');
    const html = script.generateGearListHtml({ videoDistribution: 'Directors Monitor 7" handheld' });
    const selectHtml = html.slice(
      html.indexOf('<select id="gearListDirectorsMonitor"'),
      html.indexOf('</select>', html.indexOf('<select id="gearListDirectorsMonitor"'))
    );
    expect(selectHtml).toContain('Mon RX');
    expect(selectHtml).toContain('Mon RXTX');
    expect(selectHtml).toContain('Mon Plain');
    expect(selectHtml).not.toContain('Mon TX');
  });

  test('motor adds focus monitor and related accessories to gear list', () => {
    const { generateGearListHtml } = script;
    global.devices.video = {
      'VidA TX': {
        powerDrawWatts: 3,
        power: { input: { type: 'LEMO 2-pin' } },
        videoInputs: [{ type: '3G-SDI' }]
      }
    };
    global.devices.wirelessReceivers = { 'VidA RX': {} };
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('motor1Select', 'MotorA');
    addOpt('videoSelect', 'VidA TX');
    const html = generateGearListHtml();
    expect(html).toContain('Focus Monitor</strong> - 7&quot; - TV Logic F7HS incl Directors cage, shoulder strap, sunhood, rigging for teradeks');
    expect(html).toContain('3x Bebob V150micro');
    const msSection = html.slice(html.indexOf('<td>Monitoring support</td>'), html.indexOf('Power'));
    expect(msSection).toContain('2x Ultraslim BNC 0.3 m (1x Focus, 1x Spare)');
    expect(msSection).toContain('2x D-Tap to Mini XLR 3-pin Cable 0,3m (1x Focus, 1x Spare)');
      const miscSection = html.slice(html.indexOf('Miscellaneous'), html.indexOf('Consumables'));
      expect(miscSection).not.toContain('Ultraslim BNC 0.3 m (1x Focus, 1x Spare)');
      expect(miscSection).not.toContain('D-Tap to Mini XLR 3-pin Cable 0,3m (1x Focus, 1x Spare)');
      expect(html).toContain('Wireless Receiver</strong> - 7&quot; - VidA RX (1x Focus)');
      expect(html).toContain('Avenger C-Stand Sliding Leg 20" (1x Focus)');
      expect(html).toContain('Steelfingers Wheel C-Stand 3er Set (1x Focus)');
      expect(html).toContain('Lite-Tite Swivel Aluminium Umbrella Adapter (1x Focus)');
      expect(html).toContain('3x Tennisball');
    expect(msSection).toContain('2x Antenna 5,8GHz 5dBi Long (2x Spare)');
  });

  test('zoom remote adds second motor and controller for Arri brand', () => {
    const { ensureZoomRemoteSetup, generateGearListHtml } = script;
    global.devices.fiz.motors['Arri cforce mini RF (KK.0040345)'] = { powerDrawWatts: 1 };
    global.devices.fiz.motors['Arri Cforce Mini'] = { powerDrawWatts: 1 };
    global.devices.fiz.controllers['Arri Master Grip (single unit)'] = { powerDrawWatts: 1 };
    const m1 = document.getElementById('motor1Select');
    m1.innerHTML = '<option value="Arri cforce mini RF (KK.0040345)">Arri cforce mini RF (KK.0040345)</option>';
    m1.value = 'Arri cforce mini RF (KK.0040345)';
    const m2 = document.getElementById('motor2Select');
    m2.innerHTML = '<option value="None">None</option><option value="Arri Cforce Mini">Arri Cforce Mini</option>';
    m2.value = 'None';
    const c1 = document.getElementById('controller1Select');
    c1.innerHTML = '<option value="None">None</option><option value="Arri Master Grip (single unit)">Arri Master Grip (single unit)</option>';
    c1.value = 'None';
    ensureZoomRemoteSetup({ tripodPreferences: 'Zoom Remote handle' });
    expect(m2.value).toBe('Arri Cforce Mini');
    expect(c1.value).toBe('Arri Master Grip (single unit)');
    const html = generateGearListHtml();
    expect(html).toContain('Arri Cforce Mini');
    expect(html).toContain('Arri Master Grip (1x single unit)');
  });

  test('zoom remote adds second motor and controller for Tilta brand', () => {
    const { ensureZoomRemoteSetup, generateGearListHtml } = script;
    global.devices.fiz.motors['Tilta Nucleus M'] = { powerDrawWatts: 1 };
    global.devices.fiz.controllers['Tilta Nucleus-M Hand Grip (single)'] = { powerDrawWatts: 1 };
    const m1 = document.getElementById('motor1Select');
    m1.innerHTML = '<option value="Tilta Nucleus M">Tilta Nucleus M</option>';
    m1.value = 'Tilta Nucleus M';
    const m2 = document.getElementById('motor2Select');
    m2.innerHTML = '<option value="None">None</option><option value="Tilta Nucleus M">Tilta Nucleus M</option>';
    m2.value = 'None';
    const c1 = document.getElementById('controller1Select');
    c1.innerHTML = '<option value="None">None</option><option value="Tilta Nucleus-M Hand Grip (single)">Tilta Nucleus-M Hand Grip (single)</option>';
    c1.value = 'None';
    ensureZoomRemoteSetup({ tripodPreferences: 'Zoom Remote handle' });
    expect(m2.value).toBe('Tilta Nucleus M');
    expect(c1.value).toBe('Tilta Nucleus-M Hand Grip (single)');
    const html = generateGearListHtml();
    expect(html).toContain('Tilta Nucleus M');
    expect(html).toContain('Tilta Nucleus-M Hand Grip (1x single)');
  });

  test('director handheld and focus monitor each get wireless receiver', () => {
    const { generateGearListHtml } = script;
    global.devices.video = {
      'VidA TX': {
        powerDrawWatts: 3,
        power: { input: { type: 'LEMO 2-pin' } },
        videoInputs: [{ type: '3G-SDI' }]
      }
    };
    global.devices.wirelessReceivers = { 'VidA RX': {} };
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('motor1Select', 'MotorA');
    addOpt('videoSelect', 'VidA TX');
    const html = generateGearListHtml({ videoDistribution: 'Directors Monitor 7" handheld' });
    expect(html).toContain('Wireless Receiver</strong> - 7&quot; - VidA RX (1x Directors handheld, 1x Focus)');
    const msSection = html.slice(html.indexOf('Monitoring support'), html.indexOf('Power'));
    expect(msSection).toContain('3x Antenna 5,8GHz 5dBi Long (3x Spare)');
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

  test('gear list adds hotswap plate only in battery section', () => {
    const { generateGearListHtml } = script;
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    // V-Mount battery
    addOpt('batterySelect', 'BattA');
    let html = generateGearListHtml();
    let csSection = html.slice(html.indexOf('Camera Support'), html.indexOf('Lens Support'));
    let battSection = html.slice(html.indexOf('Camera Batteries'), html.indexOf('Monitoring Batteries'));
    expect(csSection).not.toContain('Hotswap Plate');
    expect(csSection).not.toContain('data-gear-name="V-Mount"');
    expect(battSection).toContain('1x Hotswap Plate V-Mount');
    // B-Mount battery
    devices.batteries.BattB = { capacity: 100, pinA: 10, dtapA: 5, mount_type: 'B-Mount' };
    addOpt('batterySelect', 'BattB');
    html = generateGearListHtml();
    csSection = html.slice(html.indexOf('Camera Support'), html.indexOf('Lens Support'));
    battSection = html.slice(html.indexOf('Camera Batteries'), html.indexOf('Monitoring Batteries'));
    expect(csSection).not.toContain('Hotswap Plate');
    expect(csSection).not.toContain('data-gear-name="B-Mount"');
    expect(battSection).toContain('1x Hotswap Plate B-Mount');
  });

  test('gear list lists media cards and USB-C readers', () => {
    const { generateGearListHtml } = script;
    devices.cameras.CamA.recordingMedia = [{ type: 'CFast 2.0' }];
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    const html = generateGearListHtml();
    expect(html).toContain('4x 512GB CFast 2.0');
    expect(html).toContain('2x CFast 2.0 reader with USB-C');
  });

  test('gear list uses first recording media when multiple types', () => {
    const { generateGearListHtml } = script;
    devices.cameras.CamA.recordingMedia = [{ type: 'CFast 2.0' }, { type: 'SD' }];
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    const html = generateGearListHtml();
    expect(html).toContain('4x 512GB CFast 2.0');
    expect(html).not.toContain('SD');
  });

  test('Cine Saddle and Steadybag scenarios populate grip section', () => {
    const { generateGearListHtml } = script;
    const html = generateGearListHtml({ requiredScenarios: 'Cine Saddle, Steadybag' });
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const gripIdx = rows.findIndex(r => r.textContent === 'Grip');
    expect(gripIdx).toBeGreaterThanOrEqual(0);
    const itemsRow = rows[gripIdx + 1];
    expect(itemsRow.textContent).toContain('Cinekinetic Cinesaddle');
    expect(itemsRow.textContent).toContain('Steadybag');
  });

  test('Handheld and Easyrig scenarios add telescopic handle to camera support', () => {
    const { generateGearListHtml } = script;
    const html = generateGearListHtml({ requiredScenarios: 'Handheld, Easyrig' });
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const cameraSupportIndex = rows.findIndex(r => r.textContent === 'Camera Support');
    expect(cameraSupportIndex).toBeGreaterThanOrEqual(0);
    const itemsRow = rows[cameraSupportIndex + 1];
    expect(itemsRow.textContent).toContain('1x SHAPE Telescopic Handle ARRI Rosette Kit 12"');
  });

  test('Rain Machine scenario adds Sprayoff and cables to Matte box section', () => {
    const { generateGearListHtml } = script;
    const html = generateGearListHtml({ requiredScenarios: 'Rain Machine' });
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const matteIdx = rows.findIndex(r => r.textContent === 'Matte box + filter');
    expect(matteIdx).toBeGreaterThanOrEqual(0);
    const itemsRow = rows[matteIdx + 1];
    expect(itemsRow.textContent).toContain('1x Schulz Sprayoff Micro');
    expect(itemsRow.textContent).toContain('2x Fischer RS to D-Tap cable 0,5m');
    expect(itemsRow.textContent).toContain('1x Spare Disc (1x Schulz Sprayoff Micro)');
  });

  test('Swing Away mattebox adds LMB 4x5 Pro Set and accessories to gear list', () => {
    const { generateGearListHtml } = script;
    const html = generateGearListHtml({ mattebox: 'Swing Away' });
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const matteIdx = rows.findIndex(r => r.textContent === 'Matte box + filter');
    expect(matteIdx).toBeGreaterThanOrEqual(0);
    const itemsRow = rows[matteIdx + 1];
    expect(itemsRow.textContent).toContain('1x ARRI LMB 4x5 Pro Set');
    expect(itemsRow.textContent).toContain('1x ARRI LMB 19mm Studio Rod Adapter');
    expect(itemsRow.textContent).toContain('1x ARRI LMB 4x5 / LMB-6 Tray Catcher');
  });

  test('Rod based mattebox adds LMB 4x5 15mm LWS Set and accessories to gear list', () => {
    const { generateGearListHtml } = script;
    const html = generateGearListHtml({ mattebox: 'Rod based' });
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const matteIdx = rows.findIndex(r => r.textContent === 'Matte box + filter');
    expect(matteIdx).toBeGreaterThanOrEqual(0);
    const itemsRow = rows[matteIdx + 1];
    expect(itemsRow.textContent).toContain('1x ARRI LMB 4x5 15mm LWS Set 3-Stage');
    expect(itemsRow.textContent).toContain('1x ARRI LMB 19mm Studio Rod Adapter');
    expect(itemsRow.textContent).toContain('1x ARRI LMB 4x5 / LMB-6 Tray Catcher');
    expect(itemsRow.textContent).toContain('1x ARRI LMB 4x5 Side Flags');
    expect(itemsRow.textContent).toContain('1x ARRI LMB Flag Holders');
    expect(itemsRow.textContent).toContain('1x ARRI LMB 4x5 Set of Mattes spherical');
    expect(itemsRow.textContent).toContain('1x ARRI LMB Accessory Adapter');
    expect(itemsRow.textContent).toContain('1x ARRI Anti-Reflection Frame 4x5.65');
  });

  test('Clamp On mattebox adds LMB 4x5 Clamp-On set and accessories to gear list', () => {
    const { generateGearListHtml } = script;
    devices.lenses.LensB = { brand: 'TestBrand', frontDiameterMm: 95 };
    const html = generateGearListHtml({ mattebox: 'Clamp On', lenses: 'LensA, LensB' });
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const matteIdx = rows.findIndex(r => r.textContent === 'Matte box + filter');
    expect(matteIdx).toBeGreaterThanOrEqual(0);
    const itemsRow = rows[matteIdx + 1];
    expect(itemsRow.textContent).toContain('1x ARRI LMB 4x5 Clamp-On (1x 3-Stage)');
    expect(itemsRow.textContent).toContain('1x ARRI LMB 4x5 / LMB-6 Tray Catcher');
    expect(itemsRow.textContent).toContain('1x ARRI LMB 4x5 Side Flags');
    expect(itemsRow.textContent).toContain('1x ARRI LMB Flag Holders');
    expect(itemsRow.textContent).toContain('1x ARRI LMB 4x5 Set of Mattes spherical');
    expect(itemsRow.textContent).toContain('1x ARRI LMB Accessory Adapter');
    expect(itemsRow.textContent).toContain('1x ARRI Anti-Reflection Frame 4x5.65');
    expect(itemsRow.textContent).toContain('1x ARRI LMB 4x5 Clamp Adapter Set Pro');
    expect(itemsRow.textContent).toContain('1x ARRI LMB 4x5 Clamp Adapter 80mm');
    expect(itemsRow.textContent).toContain('1x ARRI LMB 4x5 Clamp Adapter 95mm');
  });

  test('updateRequiredScenariosSummary creates a box for each selection', () => {
    const select = document.getElementById('requiredScenarios');
    select.querySelector('option[value="Indoor"]').selected = true;
    select.querySelector('option[value="Gimbal"]').selected = true;
    select.querySelector('option[value="Extreme cold (snow)"]').selected = true;
    script.updateRequiredScenariosSummary();
    const boxes = document.querySelectorAll('#requiredScenariosSummary .scenario-box');
    expect(boxes).toHaveLength(3);
    expect(boxes[0].textContent).toContain('Indoor');
    expect(boxes[1].textContent).toContain('Gimbal');
    expect(boxes[2].textContent).toContain('Extreme cold (snow)');
  });

  test('tripod preferences selector is shown only when Tripod scenario is selected', () => {
    const select = document.getElementById('requiredScenarios');
    const tripodRow = document.getElementById('tripodPreferencesRow');
    const headSel = document.getElementById('tripodHeadBrand');
    const bowlSel = document.getElementById('tripodBowl');
    const typesSel = document.getElementById('tripodTypes');
    const spreaderSel = document.getElementById('tripodSpreader');

    expect(tripodRow.classList.contains('hidden')).toBe(true);

    select.querySelector('option[value="Tripod"]').selected = true;
    script.updateRequiredScenariosSummary();
    expect(tripodRow.classList.contains('hidden')).toBe(false);

    headSel.value = 'OConnor';
    bowlSel.value = '100mm bowl';
    typesSel.querySelector('option').selected = true;
    spreaderSel.value = 'Mid-Level Spreader';
    select.querySelector('option[value="Tripod"]').selected = false;
    script.updateRequiredScenariosSummary();
    expect(tripodRow.classList.contains('hidden')).toBe(true);
    expect(headSel.value).toBe('');
    expect(bowlSel.value).toBe('');
    expect(Array.from(typesSel.selectedOptions)).toHaveLength(0);
    expect(spreaderSel.value).toBe('');
  });

  test('remote head option is only visible when Dolly is selected', () => {
    const select = document.getElementById('requiredScenarios');
    const remoteOpt = select.querySelector('option[value="Remote Head"]');

    script.updateRequiredScenariosSummary();
    expect(remoteOpt.hidden).toBe(true);

    select.querySelector('option[value="Dolly"]').selected = true;
    script.updateRequiredScenariosSummary();
    expect(remoteOpt.hidden).toBe(false);

    remoteOpt.selected = true;
    script.updateRequiredScenariosSummary();
    expect(remoteOpt.hidden).toBe(false);

    select.querySelector('option[value="Dolly"]').selected = false;
    script.updateRequiredScenariosSummary();
    expect(remoteOpt.hidden).toBe(true);
    expect(remoteOpt.selected).toBe(false);
  });

  test('DoP monitor options are available in video distribution', () => {
    const videoSel = document.getElementById('videoDistribution');
    const values = Array.from(videoSel.options).map(o => o.value);
    expect(values).toContain('DoP Monitor 5" handheld');
    expect(values).toContain('DoP Monitor 7" handheld');
    expect(values).toContain('DoP Monitor 15-21"');
  });

  test('selecting Dolly adds SmallHD Ultra 7 monitor when none selected', () => {
    const select = document.getElementById('requiredScenarios');
    const monitorSel = document.getElementById('monitorSelect');

    devices.monitors['SmallHD Ultra 7'] = { powerDrawWatts: 5 };
    const opt = document.createElement('option');
    opt.value = 'SmallHD Ultra 7';
    opt.textContent = 'SmallHD Ultra 7';
    monitorSel.appendChild(opt);
    monitorSel.value = 'None';

    select.querySelector('option[value="Dolly"]').selected = true;
    script.updateRequiredScenariosSummary();

    expect(monitorSel.value).toBe('SmallHD Ultra 7');
  });

  test('double-clicking an option only deselects that option', () => {
    const selects = document.querySelectorAll('#projectForm select[multiple]');
    selects.forEach(sel => {
      const [first, second] = sel.options;
      if (!first) return;
      Array.from(sel.options).forEach(o => { o.selected = false; });
      if (second) second.selected = true;
      first.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, detail: 1 }));
      first.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
      first.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, detail: 2 }));
      first.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
      first.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
      expect(first.selected).toBe(false);
      if (second) expect(second.selected).toBe(true);
    });
  });

  test('Hand Grips handle adds telescopic handle', () => {
    const { generateGearListHtml } = script;
    const html = generateGearListHtml({ cameraHandle: 'Hand Grips' });
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const cameraSupportIndex = rows.findIndex(r => r.textContent === 'Camera Support');
    expect(cameraSupportIndex).toBeGreaterThanOrEqual(0);
    const itemsRow = rows[cameraSupportIndex + 1];
    const text = itemsRow.textContent;
    expect(text).toContain('1x SHAPE Telescopic Handle ARRI Rosette Kit 12"');
    expect(text).not.toContain('2x SHAPE Telescopic Handle ARRI Rosette Kit 12"');
  });

  test('Handle and scenario combo adds telescopic handle only once', () => {
    const { generateGearListHtml } = script;
    const html = generateGearListHtml({ cameraHandle: 'Hand Grips', requiredScenarios: 'Handheld, Easyrig' });
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const cameraSupportIndex = rows.findIndex(r => r.textContent === 'Camera Support');
    expect(cameraSupportIndex).toBeGreaterThanOrEqual(0);
    const itemsRow = rows[cameraSupportIndex + 1];
    const text = itemsRow.textContent;
    expect(text).toContain('1x SHAPE Telescopic Handle ARRI Rosette Kit 12"');
    expect(text).not.toContain('2x SHAPE Telescopic Handle ARRI Rosette Kit 12"');
  });

  test('Handle extension adds HEX-3', () => {
    const { generateGearListHtml } = script;
    const html = generateGearListHtml({ cameraHandle: 'Handle Extension' });
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const cameraSupportIndex = rows.findIndex(r => r.textContent === 'Camera Support');
    expect(cameraSupportIndex).toBeGreaterThanOrEqual(0);
    const itemsRow = rows[cameraSupportIndex + 1];
    expect(itemsRow.textContent).toContain('ARRI K2.0019797 HEX-3');
  });

  test('L-Handle adds handle extension set', () => {
    const { generateGearListHtml } = script;
    const html = generateGearListHtml({ cameraHandle: 'L-Handle' });
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const cameraSupportIndex = rows.findIndex(r => r.textContent === 'Camera Support');
    expect(cameraSupportIndex).toBeGreaterThanOrEqual(0);
    const itemsRow = rows[cameraSupportIndex + 1];
    expect(itemsRow.textContent).toContain('ARRI KK.0037820 Handle Extension Set');
  });

  test('Carts and Transportation category includes default items', () => {
    const { generateGearListHtml } = script;
    const html = generateGearListHtml();
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const cartsIdx = rows.findIndex(r => r.textContent === 'Carts and Transportation');
    const itemsText = rows[cartsIdx + 1].textContent;
    expect(itemsText).toContain('1x Magliner Senior - with quick release mount + tripod holder + utility tray + O‘Connor-Aufhängung');
    expect(itemsText).toContain('10x Securing Straps (1x 25mm wide, 9x Spare)');
    expect(itemsText).toContain('1x Loading Ramp (1x pair, 420kg)');
    expect(itemsText).toContain('20x Airliner Ösen');
  });

  test('Magliner adds wooden wedges to grip section', () => {
    const { generateGearListHtml } = script;
    const html = generateGearListHtml();
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const gripIdx = rows.findIndex(r => r.textContent === 'Grip');
    const gripText = rows[gripIdx + 1].textContent;
    expect(gripText).toContain('2x Wooden wedge');
  });

  test('Slider scenario adds Tango Roller and accessories', () => {
    const { generateGearListHtml } = script;
    const html = generateGearListHtml({ requiredScenarios: 'Slider', sliderBowl: '75er bowl' });
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const gripIdx = rows.findIndex(r => r.textContent === 'Grip');
    const itemsRow = rows[gripIdx + 1];
    const select = itemsRow.querySelector('#gearListSliderBowl');
    expect(select).not.toBeNull();
    expect(Array.from(select.options).map(o => o.value)).toEqual(['', '75er bowl', '100er bowl', '150er bowl', 'Mitchell Mount']);
    expect(select.value).toBe('75er bowl');
    const text = itemsRow.textContent;
    expect(text).toContain('1x Prosup Tango Roller');
    expect(text).toContain('2x Avenger Combo Stand 10 A1010CS 64-100 cm black');
    expect(text).toContain('2x Avenger Combo Stand 20 A1020B 110-198 cm black');
    expect(text).toContain('2x Apple Box Set / Bühnenkisten Set');
    expect(text).toContain('1x Satz Paganinis');
    expect(text).toContain('2x sand bag');
    expect(text).toContain('3x Bodenmatte');
    expect(text).toContain('12x Tennisball');
  });

  test('Slider with undersling mode adds Tango Beam regardless of order', () => {
    const { generateGearListHtml } = script;
    ['Slider, Undersling mode', 'Undersling mode, Slider'].forEach(order => {
      const html = generateGearListHtml({ requiredScenarios: order });
      const wrap = document.createElement('div');
      wrap.innerHTML = html;
      const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
      const gripIdx = rows.findIndex(r => r.textContent === 'Grip');
      const itemsRow = rows[gripIdx + 1];
      expect(itemsRow.textContent).toContain('Tango Beam');
    });
  });

  test('Jib scenario adds EJib Arm and counter weights', () => {
    const { generateGearListHtml } = script;
    const html = generateGearListHtml({ requiredScenarios: 'Jib' });
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const gripIdx = rows.findIndex(r => r.textContent === 'Grip');
    const text = rows[gripIdx + 1].textContent;
    expect(text).toContain('1x Pro Sup EJIb-Arm');
    expect(text).toContain('1x jib counter weights');
  });


  test('Tripod preferences add selected head and tripods', () => {
    const { generateGearListHtml } = script;
    const html = generateGearListHtml({
      requiredScenarios: 'Tripod',
      tripodHeadBrand: 'OConnor',
      tripodBowl: '100mm bowl',
      tripodTypes: 'Standard Tripod, Frog Tripod, Hi-Head',
      tripodSpreader: 'Mid-Level Spreader'
    });
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const gripIdx = rows.findIndex(r => r.textContent === 'Grip');
    const itemsRow = rows[gripIdx + 1];
    const text = itemsRow.textContent;
    expect(text).toContain("1x O'Connor Ultimate 1040 Fluid-Head 100mm bowl");
    expect(text).toContain('1x 100mm bowl Standard Tripod + Mid-Level Spreader');
    expect(text).toContain('1x 100mm bowl Frog Tripod + Mid-Level Spreader');
    expect(text).toContain('1x 100mm bowl Hi-Head');
    expect(text).toContain('2x sand bag (1x for Frog Tripod, 1x for Hi-Head)');
  });

  test('Easyrig scenario adds stabiliser with dropdown options', () => {
    const { generateGearListHtml } = script;
    const html = generateGearListHtml({ requiredScenarios: 'Easyrig' });
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const sel = wrap.querySelector('#gearListEasyrig');
    expect(sel).not.toBeNull();
    const optionTexts = Array.from(sel.options).map(o => o.textContent);
    expect(optionTexts).toEqual([
      'no further stabilisation',
      'FlowCine Serene Spring Arm',
      'Easyrig - STABIL G3'
    ]);
  });

  test('Grip section always includes a friction arm', () => {
    const { generateGearListHtml } = script;
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    const html = generateGearListHtml();
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const gripIdx = rows.findIndex(r => r.textContent === 'Grip');
    const itemsRow = rows[gripIdx + 1];
    expect(itemsRow.textContent).toContain('1x Manfrotto 244N Friktion Arm');
  });

  test('Gimbal scenario adds extra grip accessories', () => {
    const { generateGearListHtml } = script;
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    const html = generateGearListHtml({ requiredScenarios: 'Gimbal' });
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const gripIdx = rows.findIndex(r => r.textContent === 'Grip');
    const itemsRow = rows[gripIdx + 1];
    const text = itemsRow.textContent;
    expect(text).toContain('2x Manfrotto 244N Friktion Arm');
    expect(text).toContain('1x Super Clamp');
    expect(text).toContain('1x Gobo Head');
    expect(text).toContain('1x spigot with male 3/8" and 1/4"');
  });

  test('Gimbal selector adds specified devices', () => {
    const { generateGearListHtml } = script;
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    const html = generateGearListHtml({ requiredScenarios: 'Gimbal', gimbal: 'DJI Ronin 2, DJI Ronin RS4 Pro Combo' });
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const gripIdx = rows.findIndex(r => r.textContent === 'Grip');
    const itemsRow = rows[gripIdx + 1];
    const text = itemsRow.textContent;
    expect(text).toContain('1x DJI Ronin 2');
    expect(text).toContain('1x DJI Ronin RS4 Pro Combo');
  });

  test('RS4 Pro with small lens adds Mirage filters', () => {
    const { generateGearListHtml } = script;
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    const html = generateGearListHtml({ requiredScenarios: 'Gimbal', gimbal: 'DJI Ronin RS4 Pro Combo', lenses: 'LensA' });
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const filterIdx = rows.findIndex(r => r.textContent === 'Matte box + filter');
    const filterRow = rows[filterIdx + 1];
    const text = filterRow.textContent;
    expect(text).toContain('Tilta Mirage VND Kit');
    expect(text).toContain('Tilta 95 mm Polarizer Filter für Tilta Mirage');
    expect(text).toContain('Vaxis 95 mm IRND Filter 0.3 + 0.6 + 0.9 + 1.2 Filter');
    expect(text).toContain('Vaxis 95mm Black Mist 1/4 + 1/8 Filter');
    expect(text).not.toContain('Arri KK.0038066 Flexible Sunshade Side Flag Holders Set');
  });

  test('Large lens forces Ronin 2 and adds sunshade', () => {
    const { generateGearListHtml } = script;
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    const html = generateGearListHtml({ requiredScenarios: 'Gimbal', lenses: 'LensBig' });
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const gripIdx = rows.findIndex(r => r.textContent === 'Grip');
    const gripText = rows[gripIdx + 1].textContent;
    expect(gripText).toContain('1x DJI Ronin 2');
    expect(gripText).not.toContain('DJI Ronin RS4 Pro Combo');
    const filterIdx = rows.findIndex(r => r.textContent === 'Matte box + filter');
    const filterText = rows[filterIdx + 1].textContent;
    expect(filterText).toContain('Arri KK.0038066 Flexible Sunshade Side Flag Holders Set');
  });

  test('Outdoor scenario adds weather protection gear and consumables for small monitor', () => {
    const { generateGearListHtml } = script;
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    addOpt('monitorSelect', 'MonA');
    const html = generateGearListHtml({ requiredScenarios: 'Outdoor' });
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const gripIdx = rows.findIndex(r => r.textContent === 'Grip');
    const gripText = rows[gripIdx + 1].textContent;
    const rigIdx = rows.findIndex(r => r.textContent === 'Rigging');
    const rigText = rows[rigIdx + 1].textContent;
    const miscIdx = rows.findIndex(r => r.textContent === 'Miscellaneous');
    const miscText = rows[miscIdx + 1].textContent;
    expect(miscText).toContain('Rain Cover "CamA"');
    expect(miscText).toContain('1x Umbrella for Focus Monitor');
    expect(miscText).toContain('1x Umbrella Magliner incl Mounting to Magliner');
    expect(gripText).toContain('2x Super Clamp');
    expect(rigText).toContain('4x spigot with male 3/8" and 1/4"');
    expect(gripText).not.toContain('Large Umbrella');
    expect(gripText).not.toContain('Avenger A5036CS Roller 36 Low Base with Umbrella Mounting');
    expect(miscText).not.toContain('Super Clamp');
    expect(miscText).not.toContain('spigot with male 3/8" and 1/4"');
    const consumIdx = rows.findIndex(r => r.textContent === 'Consumables');
    const consumText = rows[consumIdx + 1].textContent;
    expect(consumText).toContain('2x CapIt Large');
    expect(consumText).toContain('4x CapIt Medium');
    expect(consumText).toContain('3x CapIt Small');
    expect(consumText).toContain('10x Duschhaube');
    expect(consumText).toContain('1x Magliner Rain Cover Transparent');
  });

  test('Extreme rain scenario adds weather protection gear and consumables for small monitor', () => {
    const { generateGearListHtml } = script;
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    addOpt('monitorSelect', 'MonA');
    const html = generateGearListHtml({ requiredScenarios: 'Extreme rain' });
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const gripIdx = rows.findIndex(r => r.textContent === 'Grip');
    const gripText = rows[gripIdx + 1].textContent;
    const miscIdx = rows.findIndex(r => r.textContent === 'Miscellaneous');
    const miscText = rows[miscIdx + 1].textContent;
    expect(gripText).toContain('1x Large Umbrella');
    expect(gripText).toContain('1x Avenger A5036CS Roller 36 Low Base with Umbrella Mounting');
    expect(miscText).toContain('Rain Cover "CamA"');
    expect(miscText).toContain('1x Umbrella for Focus Monitor');
    expect(miscText).toContain('1x Umbrella Magliner incl Mounting to Magliner');
    const consumIdx = rows.findIndex(r => r.textContent === 'Consumables');
    const consumText = rows[consumIdx + 1].textContent;
    expect(consumText).toContain('2x CapIt Large');
    expect(consumText).toContain('4x CapIt Medium');
    expect(consumText).toContain('3x CapIt Small');
    expect(consumText).toContain('10x Duschhaube');
    expect(consumText).toContain('1x Magliner Rain Cover Transparent');
  });

  test('Rain Machine scenario does not duplicate umbrellas when combined with Outdoor', () => {
    const { generateGearListHtml } = script;
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    addOpt('monitorSelect', 'MonA');
    const html = generateGearListHtml({ requiredScenarios: 'Outdoor, Rain Machine' });
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const gripIdx = rows.findIndex(r => r.textContent === 'Grip');
    const gripText = rows[gripIdx + 1].textContent;
    const miscIdx = rows.findIndex(r => r.textContent === 'Miscellaneous');
    const miscText = rows[miscIdx + 1].textContent;
    expect(gripText).toContain('1x Large Umbrella');
    expect(gripText).toContain('1x Avenger A5036CS Roller 36 Low Base with Umbrella Mounting');
    expect(gripText).not.toContain('2x Large Umbrella');
    expect(gripText).not.toContain('2x Avenger A5036CS Roller 36 Low Base with Umbrella Mounting');
    expect(miscText).toContain('1x Umbrella for Focus Monitor');
    expect(miscText).toContain('1x Umbrella Magliner incl Mounting to Magliner');
    expect(miscText).not.toContain('2x Umbrella for Focus Monitor');
    expect(miscText).not.toContain('2x Umbrella Magliner incl Mounting to Magliner');
  });

  test('Extreme heat scenario adds umbrellas to miscellaneous', () => {
    const { generateGearListHtml } = script;
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    addOpt('monitorSelect', 'MonA');
    const html = generateGearListHtml({ requiredScenarios: 'Extreme heat' });
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const gripIdx = rows.findIndex(r => r.textContent === 'Grip');
    const gripText = rows[gripIdx + 1].textContent;
    const miscIdx = rows.findIndex(r => r.textContent === 'Miscellaneous');
    const miscText = rows[miscIdx + 1].textContent;
    expect(gripText).toContain('1x Large Umbrella');
    expect(gripText).toContain('1x Avenger A5036CS Roller 36 Low Base with Umbrella Mounting');
    expect(miscText).toContain('1x Umbrella for Focus Monitor');
    expect(miscText).toContain('1x Umbrella Magliner incl Mounting to Magliner');
    expect(miscText).not.toContain('Rain Cover');
  });

  test('Extreme cold scenario adds cold weather gear to miscellaneous', () => {
    const { generateGearListHtml } = script;
    const html = generateGearListHtml({ requiredScenarios: 'Extreme cold (snow)' });
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const miscIdx = rows.findIndex(r => r.textContent === 'Miscellaneous');
    const miscText = rows[miscIdx + 1].textContent;
    expect(miscText).toContain('1x Hair Dryer');
    expect(miscText).toContain('2x Hand Warmers');
    expect(miscText).toContain('2x Feet Warmers');
  });

  test('Warmers scale with shooting days in extreme cold scenario', () => {
    const { generateGearListHtml } = script;
    const html = generateGearListHtml({ requiredScenarios: 'Extreme cold (snow)', shootingDays: '2024-05-01 to 2024-05-05' });
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const miscIdx = rows.findIndex(r => r.textContent === 'Miscellaneous');
    const miscText = rows[miscIdx + 1].textContent;
    expect(miscText).toContain('1x Hair Dryer');
    expect(miscText).toContain('10x Hand Warmers');
    expect(miscText).toContain('10x Feet Warmers');
  });

  test('Winter outdoor shooting adds hair dryer and heater for Venice', () => {
    const { generateGearListHtml } = script;
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    devices.cameras['Sony Venice 2'] = { powerDrawWatts: 10, power: { input: { type: 'LEMO 2-pin' } }, videoOutputs: [] };
    addOpt('cameraSelect', 'Sony Venice 2');
    const html = generateGearListHtml({ shootingDays: '2024-01-10 to 2024-01-12', requiredScenarios: 'Outdoor' });
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const miscIdx = rows.findIndex(r => r.textContent === 'Miscellaneous');
    const miscText = rows[miscIdx + 1].textContent;
    expect(miscText).toContain('1x Hair Dryer');
    expect(miscText).toContain('1x Denz C0100072 Shut-Eye Heater für Sony');
  });

  test('Winter indoor shooting does not add hair dryer or heater', () => {
    const { generateGearListHtml } = script;
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    devices.cameras['Sony Venice 2'] = { powerDrawWatts: 10, power: { input: { type: 'LEMO 2-pin' } }, videoOutputs: [] };
    addOpt('cameraSelect', 'Sony Venice 2');
    const html = generateGearListHtml({ shootingDays: '2024-01-10 to 2024-01-12' });
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const miscIdx = rows.findIndex(r => r.textContent === 'Miscellaneous');
    const miscText = rows[miscIdx + 1] ? rows[miscIdx + 1].textContent : '';
    expect(miscText).not.toContain('Hair Dryer');
    expect(miscText).not.toContain('Denz C0100072 Shut-Eye Heater für Sony');
  });

  test('Cold weather adds viewfinder heater for Venice cameras', () => {
    const { generateGearListHtml } = script;
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    devices.cameras['Sony Venice 2'] = { powerDrawWatts: 10, power: { input: { type: 'LEMO 2-pin' } }, videoOutputs: [] };
    addOpt('cameraSelect', 'Sony Venice 2');
    const html = generateGearListHtml({ requiredScenarios: 'Extreme cold (snow)' });
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const miscIdx = rows.findIndex(r => r.textContent === 'Miscellaneous');
    const miscText = rows[miscIdx + 1].textContent;
    expect(miscText).toContain('1x Hair Dryer');
    expect(miscText).toContain('1x Denz C0100072 Shut-Eye Heater für Sony');
  });

  test('Cold weather adds viewfinder heater for Alexa Mini', () => {
    const { generateGearListHtml } = script;
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    devices.cameras['Arri Alexa Mini'] = { powerDrawWatts: 10, power: { input: { type: 'LEMO 2-pin' } }, videoOutputs: [] };
    addOpt('cameraSelect', 'Arri Alexa Mini');
    const html = generateGearListHtml({ requiredScenarios: 'Extreme cold (snow)' });
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const miscIdx = rows.findIndex(r => r.textContent === 'Miscellaneous');
    const miscText = rows[miscIdx + 1].textContent;
    expect(miscText).toContain('1x Hair Dryer');
    expect(miscText).toContain('1x Arri K2.0003898 Heated Eyecup HE-7 for the MVF-1');
  });

  test('Outdoor scenario calculates CapIt sizes for large monitors', () => {
    const { generateGearListHtml } = script;
    devices.monitors.MonB = {
      powerDrawWatts: 5,
      brightnessNits: 1000,
      screenSizeInches: 13,
      power: { input: { type: 'LEMO 2-pin' } },
      videoInputs: []
    };
    const sel = document.getElementById('monitorSelect');
    sel.innerHTML = '<option value="MonB">MonB</option>';
    sel.value = 'MonB';
    const camSel = document.getElementById('cameraSelect');
    camSel.innerHTML = '<option value="CamA">CamA</option>';
    camSel.value = 'CamA';
    const html = generateGearListHtml({ requiredScenarios: 'Outdoor' });
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const consumIdx = rows.findIndex(r => r.textContent === 'Consumables');
    const consumText = rows[consumIdx + 1].textContent;
    expect(consumText).toContain('3x CapIt Large');
    expect(consumText).toContain('3x CapIt Medium');
  });

  test('base consumables added with correct counts for short shoot', () => {
    const { generateGearListHtml } = script;
    const html = generateGearListHtml({ shootingDays: '2024-05-01 to 2024-05-05' });
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const consumIdx = rows.findIndex(r => r.textContent === 'Consumables');
    const consumText = rows[consumIdx + 1].textContent;
    expect(consumText).toContain('1x Kimtech Wipes');
    expect(consumText).toContain('1x Lasso Rot 24mm');
    expect(consumText).toContain('1x Lasso Blau 24mm');
    expect(consumText).toContain('1x Sprigs rot 1/4“');
    expect(consumText).toContain('2x Augenleder Large Oval Farbe rot');
    expect(consumText).toContain('2x Klappenstift');
  });

  test('consumables scale with shooting days and special rules', () => {
    const { generateGearListHtml } = script;
    const scenarios = [
      ['2024-05-01 to 2024-05-10', '2x Kimtech Wipes', '4x Klappenstift', '4x Augenleder Large Oval Farbe rot'],
      ['2024-05-01 to 2024-05-16', '3x Kimtech Wipes', '4x Klappenstift', '6x Augenleder Large Oval Farbe rot'],
      ['2024-05-01 to 2024-05-22', '4x Kimtech Wipes', '8x Klappenstift', '8x Augenleder Large Oval Farbe rot']
    ];
    scenarios.forEach(([range, wipes, klappen, augen]) => {
      const html = generateGearListHtml({ shootingDays: range });
      const wrap = document.createElement('div');
      wrap.innerHTML = html;
      const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
      const consumIdx = rows.findIndex(r => r.textContent === 'Consumables');
      const consumText = rows[consumIdx + 1].textContent;
      expect(consumText).toContain(wipes);
      expect(consumText).toContain('1x Sprigs rot 1/4“');
      expect(consumText).toContain(klappen);
      expect(consumText).toContain(augen);
    });
  });

  test('camera handle and viewfinder extension excluded from project requirements', () => {
    const { generateGearListHtml } = script;
    const html = generateGearListHtml({
      cameraHandle: 'Hand Grips, L-Handle',
      viewfinderExtension: 'ARRI VEB-3 Viewfinder Extension Bracket',
      mattebox: 'Rod based',
      monitoringSettings: 'Viewfinder Clean Feed, Surround View',
      monitorUserButtons: 'Toggle LUT',
      cameraUserButtons: 'False Color',
      viewfinderUserButtons: 'Peaking'
    });
    expect(html).not.toContain('<span class="req-label">Camera Handle</span>');
    expect(html).not.toContain('<span class="req-value">Hand Grips, L-Handle</span>');
    expect(html).not.toContain('<span class="req-label">Mattebox</span>');
    expect(html).not.toContain('<span class="req-value">Rod based</span>');
    expect(html).not.toContain('<span class="req-label">Viewfinder Extension</span>');
    expect(html).not.toContain('<span class="req-value">ARRI VEB-3 Viewfinder Extension Bracket</span>');
    expect(html).toContain('<span class="req-label">Monitoring support</span>');
    expect(html).toContain('<span class="req-value">Viewfinder Clean Feed, Surround View</span>');
    const msSection = html.slice(html.indexOf('<td>Monitoring support</td>'), html.indexOf('Power'));
    expect(msSection).not.toContain('Viewfinder Clean Feed');
    expect(msSection).not.toContain('Surround View');
    expect(msSection).not.toContain('Onboard Monitor User Buttons');
    expect(msSection).not.toContain('Camera User Buttons');
    expect(msSection).not.toContain('Viewfinder User Buttons');
    expect(html).toContain('<span class="req-label">Onboard Monitor User Buttons</span>');
    expect(html).toContain('<span class="req-value">Toggle LUT</span>');
    expect(html).toContain('<span class="req-label">Camera User Buttons</span>');
    expect(html).toContain('<span class="req-value">False Color</span>');
    expect(html).toContain('<span class="req-label">Viewfinder User Buttons</span>');
    expect(html).toContain('<span class="req-value">Peaking</span>');
    expect(html).toContain('<td>Rigging</td>');
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const csIndex = rows.findIndex(r => r.textContent === 'Camera Support');
    const csRow = rows[csIndex + 1];
    expect(csRow.textContent).toContain('ARRI VEB-3 Viewfinder Extension Bracket');
    const mbIndex = rows.findIndex(r => r.textContent === 'Matte box + filter');
    const mbRow = rows[mbIndex + 1];
    expect(mbRow.textContent).toContain('ARRI LMB 4x5 15mm LWS Set 3-Stage');
  });

  test('viewfinder extension selector visible only when camera has viewfinder', () => {
    const { updateViewfinderExtensionVisibility } = script;
    const camSel = document.getElementById('cameraSelect');
    const row = document.getElementById('viewfinderExtensionRow');
    camSel.innerHTML = '<option value="NoVF">NoVF</option><option value="WithVF">WithVF</option>';
    devices.cameras.NoVF = { powerDrawWatts: 10 };
    devices.cameras.WithVF = { powerDrawWatts: 10, viewfinder: [{ type: 'EVF' }] };
    camSel.value = 'NoVF';
    updateViewfinderExtensionVisibility();
    expect(row.classList.contains('hidden')).toBe(true);
    camSel.value = 'WithVF';
    updateViewfinderExtensionVisibility();
    expect(row.classList.contains('hidden')).toBe(false);
  });

  test('viewfinder only option visible only with viewfinder and no monitor', () => {
    const { updateMonitoringConfigurationOptions } = script;
    const camSel = document.getElementById('cameraSelect');
    const monitorSel = document.getElementById('monitorSelect');
    const configSel = document.getElementById('monitoringConfiguration');
    camSel.innerHTML = '<option value="NoVF">NoVF</option><option value="WithVF">WithVF</option>';
    monitorSel.innerHTML = '<option value=""></option><option value="MonA">MonA</option>';
    devices.cameras.NoVF = { powerDrawWatts: 10 };
    devices.cameras.WithVF = { powerDrawWatts: 10, viewfinder: [{ type: 'EVF' }] };
    devices.monitors.MonA = { powerDrawWatts: 5 };

    camSel.value = 'WithVF';
    monitorSel.value = '';
    configSel.value = 'Viewfinder only';
    updateMonitoringConfigurationOptions();
    let opt = Array.from(configSel.options).find(o => o.value === 'Viewfinder only');
    expect(opt.hidden).toBe(false);
    expect(configSel.value).toBe('Viewfinder only');

    monitorSel.value = 'MonA';
    updateMonitoringConfigurationOptions();
    opt = Array.from(configSel.options).find(o => o.value === 'Viewfinder only');
    expect(opt.hidden).toBe(true);
    expect(configSel.value).toBe('Viewfinder and Onboard');

    camSel.value = 'NoVF';
    monitorSel.value = '';
    configSel.value = 'Viewfinder only';
    updateMonitoringConfigurationOptions();
    opt = Array.from(configSel.options).find(o => o.value === 'Viewfinder only');
    expect(opt.hidden).toBe(true);
    expect(configSel.value).toBe('Onboard Only');
  });

  test('iOS video option appears under monitoring in project requirements', () => {
    const { generateGearListHtml } = script;
    const html = generateGearListHtml({ videoDistribution: 'IOS Video (Teradek Serv + Link)' });
    expect(html).toContain('<span class="req-label">Monitoring</span>');
    expect(html).toContain('<span class="req-value">IOS Video (Teradek Serv + Link)</span>');
    expect(html).not.toContain('<span class="req-label">Monitoring support</span><span class="req-value">IOS Video (Teradek Serv + Link)</span>');
  });

  test('project requirements form includes Gaffers Monitor 7" handheld option', () => {
    setupDom(true);
    const sel = document.getElementById('videoDistribution');
    const values = Array.from(sel.options).map(o => o.value);
    expect(values).toContain('Gaffers Monitor 7" handheld');
  });

  test('sensor mode appears in project requirements when provided', () => {
    const { generateGearListHtml } = script;
    const html = generateGearListHtml({ sensorMode: 'S35 3:2' });
    expect(html).toContain('<span class="req-label">Sensor Mode</span>');
    expect(html).toContain('<span class="req-value">S35 3:2</span>');
  });

  test('tripod preferences are excluded from project requirements', () => {
    const { generateGearListHtml } = script;
    const html = generateGearListHtml({ tripodHeadBrand: 'OConnor' });
    expect(html).not.toContain('Tripod Preferences');
  });

  test('codec dropdown populates from camera recording codecs', () => {
    devices.cameras.CamA.recordingCodecs = ['CodecA', 'CodecB'];
    const camSel = document.getElementById('cameraSelect');
    camSel.innerHTML = '<option value="CamA">CamA</option>';
    camSel.value = 'CamA';
    const setupSelectElem = document.getElementById('setupSelect');
    setupSelectElem.innerHTML = '<option value="Test">Test</option>';
    setupSelectElem.value = 'Test';
    const projectDialog = document.getElementById('projectDialog');
    projectDialog.showModal = jest.fn();
    document.getElementById('generateGearListBtn').click();
    const codecSelect = document.getElementById('codec');
    const opts = Array.from(codecSelect.options).map(o => o.value);
    expect(opts).toEqual(['', 'CodecA', 'CodecB']);
  });

  test('recording resolution dropdown populates from camera resolutions', () => {
    devices.cameras.CamA.resolutions = ['4K', '6K'];
    const camSel = document.getElementById('cameraSelect');
    camSel.innerHTML = '<option value="CamA">CamA</option>';
    camSel.value = 'CamA';
    const setupSelectElem = document.getElementById('setupSelect');
    setupSelectElem.innerHTML = '<option value="Test">Test</option>';
    setupSelectElem.value = 'Test';
    const projectDialog = document.getElementById('projectDialog');
    projectDialog.showModal = jest.fn();
    document.getElementById('generateGearListBtn').click();
    const resSelect = document.getElementById('recordingResolution');
    const opts = Array.from(resSelect.options).map(o => o.value);
    expect(opts).toEqual(['', '4K', '6K']);
  });

  test('sensor mode dropdown populates from camera sensor modes', () => {
    devices.cameras.CamA.sensorModes = ['ModeA', 'ModeB'];
    const camSel = document.getElementById('cameraSelect');
    camSel.innerHTML = '<option value="CamA">CamA</option>';
    camSel.value = 'CamA';
    const setupSelectElem = document.getElementById('setupSelect');
    setupSelectElem.innerHTML = '<option value="Test">Test</option>';
    setupSelectElem.value = 'Test';
    const projectDialog = document.getElementById('projectDialog');
    projectDialog.showModal = jest.fn();
    document.getElementById('generateGearListBtn').click();
    const modeSelect = document.getElementById('sensorMode');
    const opts = Array.from(modeSelect.options).map(o => o.value);
    expect(opts).toEqual(['', 'ModeA', 'ModeB']);
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

  test('motor names with extra whitespace are trimmed and aggregated', () => {
    const { generateGearListHtml } = script;
    const addOpt = (id, value, text) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${text}</option>`;
      sel.value = value;
    };
    addOpt('motor1Select', 'MotorA1', 'MotorA ');
    addOpt('motor2Select', 'MotorA2', 'MotorA');
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

  test('saving setup triggers gear list save', () => {
    global.saveGearList = jest.fn();
    const gear = document.getElementById('gearListOutput');
    gear.innerHTML = '<table></table>';
    gear.classList.remove('hidden');
    const nameInput = document.getElementById('setupName');
    nameInput.value = 'WithGear';
    nameInput.dispatchEvent(new Event('input', { bubbles: true }));
    document.getElementById('saveSetupBtn').click();
    expect(global.saveGearList).toHaveBeenCalled();
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

  test('saving a setup updates session state selection', () => {
    global.loadSetups.mockReturnValue({});
    global.saveSetups.mockImplementation(data => {
      global.loadSetups.mockReturnValue(data);
    });
    global.loadSessionState = jest.fn(() => null);
    global.saveSessionState = jest.fn();
    const nameInput = document.getElementById('setupName');
    nameInput.value = 'SessSetup';
    nameInput.dispatchEvent(new Event('input', { bubbles: true }));
    document.getElementById('saveSetupBtn').click();
    const calls = global.saveSessionState.mock.calls;
    const state = calls[calls.length - 1][0];
    expect(state.setupSelect).toBe('SessSetup');
  });

  test('Deleting a setup requires confirmation', () => {
    const deleteBtn = document.getElementById('deleteSetupBtn');
    const sel = document.getElementById('setupSelect');
    sel.innerHTML = '<option value="">-- New Setup --</option><option value="Existing">Existing</option>';
    sel.value = 'Existing';

    global.loadSetups
      .mockReturnValueOnce({ Existing: {} })
      .mockReturnValueOnce({});
    global.saveSetups.mockClear();

    const confirmSpy = jest.spyOn(window, 'confirm');

    confirmSpy.mockReturnValueOnce(false);
    deleteBtn.click();
    expect(confirmSpy).toHaveBeenCalledTimes(1);
    expect(global.saveSetups).not.toHaveBeenCalled();

    global.saveSetups.mockClear();
    confirmSpy.mockReset();
    confirmSpy.mockReturnValueOnce(true).mockReturnValueOnce(true);
    deleteBtn.click();
    expect(confirmSpy).toHaveBeenCalledTimes(2);
    expect(global.saveSetups).toHaveBeenCalledWith({});

    confirmSpy.mockRestore();
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
    expect(saveBtn.textContent).toBe('Save');
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

  test('controller distance port detects Serial connectors', () => {
    const { controllerDistancePort } = script;
    global.devices.fiz.controllers['Serial Controller'] = {
      fizConnectors: [{ type: 'Serial' }]
    };
    expect(controllerDistancePort('Serial Controller')).toBe('Serial');
    expect(controllerDistancePort('ControllerA')).toBe('LBUS');
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

  test('diagram popup appears on click events', () => {
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
    node.dispatchEvent(new MouseEvent('click', { clientX: 0, clientY: 0 }));
    const popup = document.getElementById('diagramPopup');
    expect(popup.innerHTML).toContain('FIZ Port: LBUS');
  });

  test('diagram popup remains after tap on touch device until outside tap', () => {
    global.devices.fiz.controllers.ControllerA.fizConnectors = [{ type: 'LBUS' }];

    // Simulate touch-capable device
    Object.defineProperty(navigator, 'maxTouchPoints', { value: 1, configurable: true });

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
    node.dispatchEvent(new MouseEvent('click', { clientX: 0, clientY: 0 }));

    // Simulate moving pointer away; popup should remain
    node.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }));
    const popup = document.getElementById('diagramPopup');
    expect(popup.style.display).toBe('block');

    // Tapping outside hides the popup
    document.getElementById('diagramArea').dispatchEvent(new Event('touchstart', { bubbles: true }));
    expect(popup.style.display).toBe('none');

    Object.defineProperty(navigator, 'maxTouchPoints', {
      value: 0,
      configurable: true
    });
  });

  test('diagram popup opens to the left near right edge', () => {
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

    const container = document.getElementById('diagramArea');
    const originalRect = container.getBoundingClientRect;
    container.getBoundingClientRect = () => ({ left: 0, top: 0, width: 200, height: 200 });
    const popup = document.getElementById('diagramPopup');
    Object.defineProperty(popup, 'offsetWidth', { configurable: true, get: () => 100 });

    const node = container.querySelector('.diagram-node[data-node="controller0"]');
    node.dispatchEvent(new MouseEvent('mousemove', { clientX: 190, clientY: 10 }));

    expect(popup.style.left).toBe('80px');

    container.getBoundingClientRect = originalRect;
    delete popup.offsetWidth;
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

  test('reset view clears manual node positions', () => {
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    addOpt('batterySelect', 'BattA');

    script.renderSetupDiagram();

    const node = document.querySelector('#diagramArea .diagram-node[data-node="battery"]');
    const rect = node.querySelector('rect');
    const origX = parseFloat(rect.getAttribute('x'));
    const origY = parseFloat(rect.getAttribute('y'));

    node.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0, bubbles: true }));
    window.dispatchEvent(new MouseEvent('mousemove', { clientX: 13, clientY: 27, bubbles: true }));
    window.dispatchEvent(new MouseEvent('mouseup', { clientX: 13, clientY: 27, bubbles: true }));

    let rect2 = document.querySelector('#diagramArea .diagram-node[data-node="battery"] rect');
    expect(parseFloat(rect2.getAttribute('x'))).toBeCloseTo(origX + 13);
    expect(parseFloat(rect2.getAttribute('y'))).toBeCloseTo(origY + 27);

    const resetBtn = document.getElementById('resetView');
    resetBtn.click();

    rect2 = document.querySelector('#diagramArea .diagram-node[data-node="battery"] rect');
    expect(parseFloat(rect2.getAttribute('x'))).toBeCloseTo(origX);
    expect(parseFloat(rect2.getAttribute('y'))).toBeCloseTo(origY);
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

    // open with letter h and close with Escape
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'h' }));
    expect(helpDialog.hasAttribute('hidden')).toBe(false);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(helpDialog.hasAttribute('hidden')).toBe(true);

    // open with question mark while typing
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.focus();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: '?' }));
    expect(helpDialog.hasAttribute('hidden')).toBe(false);
    expect(input.value).toBe('');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(helpDialog.hasAttribute('hidden')).toBe(true);
    document.body.removeChild(input);

    // typing h in a field should not open help
    const input2 = document.createElement('input');
    document.body.appendChild(input2);
    input2.focus();
    const event = new KeyboardEvent('keydown', { key: 'h', bubbles: true, cancelable: true });
    const result = input2.dispatchEvent(event);
    expect(result).toBe(true);
    expect(helpDialog.hasAttribute('hidden')).toBe(true);
    document.body.removeChild(input2);
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

  test('hover help displays long descriptions without truncation', () => {
    const hoverHelpButton = document.getElementById('hoverHelpButton');
    hoverHelpButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    const longText = 'x'.repeat(500);
    const dummy = document.createElement('button');
    dummy.setAttribute('data-help', longText);
    document.body.appendChild(dummy);

    dummy.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    const tooltip = document.getElementById('hoverHelpTooltip');
    expect(tooltip.textContent).toBe(longText);

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

  test('Save button enables after applying shared setup', () => {
    const data = { setupName: 'Shared Setup' };
    const encoded = LZString.compressToEncodedURIComponent(JSON.stringify(data));
    window.history.pushState({}, '', `/?shared=${encoded}`);
    const saveBtn = document.getElementById('saveSetupBtn');
    expect(saveBtn.disabled).toBe(true);
    script.applySharedSetupFromUrl();
    expect(saveBtn.disabled).toBe(false);
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

  test('editing accessory battery updates fields', () => {
    const addDeviceBtn = document.getElementById('addDeviceBtn');
    devices.accessories.batteries = { AccBatA: { capacity: 20, pinA: 10, dtapA: 5 } };
    document.getElementById('newCategory').value = 'accessories.batteries';
    document.getElementById('newName').value = 'AccBatA';
    document.getElementById('newCapacity').value = '30';
    document.getElementById('newPinA').value = '8';
    document.getElementById('newDtapA').value = '2';

    addDeviceBtn.dataset.mode = 'edit';
    addDeviceBtn.dataset.originalName = 'AccBatA';
    addDeviceBtn.click();

    expect(devices.accessories.batteries.AccBatA).toEqual({ capacity: 30, pinA: 8, dtapA: 2 });
  });

  test('editing viewfinder updates its fields', () => {
    const addDeviceBtn = document.getElementById('addDeviceBtn');
    devices.viewfinders = { ViewA: { powerDrawWatts: 5 } };

    const catSelect = document.getElementById('newCategory');
    catSelect.value = 'viewfinders';
    catSelect.dispatchEvent(new Event('change'));

    document.getElementById('newName').value = 'ViewA';
    document.getElementById('viewfinderScreenSize').value = '4.5';
    document.getElementById('viewfinderBrightness').value = '1000';
    document.getElementById('viewfinderWatt').value = '6';
    document.getElementById('viewfinderVoltage').value = '5-12V';

    const portSelect = document.getElementById('viewfinderPortType');
    const portValue = portSelect.options[1] ? portSelect.options[1].value : '';
    portSelect.value = portValue;

    const inputSelect = document.querySelector('#viewfinderVideoInputsContainer select');
    const inputValue = inputSelect.options[1] ? inputSelect.options[1].value : '';
    inputSelect.value = inputValue;

    const outputSelect = document.querySelector('#viewfinderVideoOutputsContainer select');
    const outputValue = outputSelect.options[1] ? outputSelect.options[1].value : '';
    outputSelect.value = outputValue;

    document.getElementById('viewfinderWirelessTx').checked = true;
    document.getElementById('viewfinderLatency').value = '20ms';

    addDeviceBtn.dataset.mode = 'edit';
    addDeviceBtn.dataset.originalName = 'ViewA';
    addDeviceBtn.click();

    expect(devices.viewfinders.ViewA).toEqual({
      screenSizeInches: 4.5,
      brightnessNits: 1000,
      powerDrawWatts: 6,
      power: {
        input: { voltageRange: '5-12V', type: portValue },
        output: null
      },
      video: {
        inputs: inputValue ? [{ type: inputValue }] : [],
        outputs: outputValue ? [{ type: outputValue }] : []
      },
      wirelessTx: true,
      latencyMs: '20ms'
    });
  });

  test('editing wireless receiver populates video fields', () => {
    devices.wirelessReceivers = {
      RxA: {
        powerDrawWatts: 7,
        videoOutputs: [{ type: 'HDMI' }],
        frequency: '5GHz',
        latencyMs: '2ms'
      }
    };
    const deviceManager = document.getElementById('device-manager');
    const btn = document.createElement('button');
    btn.className = 'edit-btn';
    btn.dataset.name = 'RxA';
    btn.dataset.category = 'wirelessReceivers';
    deviceManager.appendChild(btn);
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    btn.click();
    expect(document.getElementById('newCategory').value).toBe('wirelessReceivers');
    expect(document.getElementById('videoFields').style.display).toBe('block');
    expect(document.getElementById('videoFrequency').value).toBe('5GHz');
  });

  test('runtime feedback dialog pre-fills resolution and codec', () => {
    const cam = devices.cameras.CamA;
    cam.resolutions = ['1920x1080'];
    cam.recordingCodecs = ['ProRes'];
    const camSelect = document.getElementById('cameraSelect');
    camSelect.innerHTML = '<option value="CamA">CamA</option>';
    camSelect.value = 'CamA';
    const dialog = document.getElementById('feedbackDialog');
    dialog.showModal = jest.fn();
    document.getElementById('runtimeFeedbackBtn').click();
    expect(document.getElementById('fbResolution').value).toBe('1920x1080');
    expect(document.getElementById('fbCodec').value).toBe('ProRes');
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

  test('gear list items expose descriptive hover help', () => {
    setupDom();
    require('../translations.js');
    const script = require('../script.js');
    script.setLanguage('en');
    const cameraSelect = document.getElementById('cameraSelect');
    cameraSelect.innerHTML = '<option value="CamA">CamA</option>';
    cameraSelect.value = 'CamA';
    const html = script.generateGearListHtml();
    script.displayGearAndRequirements(html);
    const item = document.querySelector('.gear-item[data-gear-name="CamA"]');
    expect(item.getAttribute('data-help')).toContain('Power: 10 W');
  });

  test('project requirements boxes expose descriptive hover help', () => {
    setupDom();
    require('../translations.js');
    const script = require('../script.js');
    script.setLanguage('en');
    const html = script.generateGearListHtml({ codec: 'ProRes' });
    script.displayGearAndRequirements(html);
    const box = document.querySelector('.requirement-box');
    expect(box.getAttribute('data-help')).toBe('Codec: ProRes');
  });

  test('gear list action buttons expose descriptive hover help', () => {
    setupDom();
    require('../translations.js');
    const script = require('../script.js');
    script.setLanguage('en');
    const html = script.generateGearListHtml({ projectName: 'Proj' });
    script.displayGearAndRequirements(html);
    script.ensureGearListActions();
    const saveBtn = document.getElementById('saveGearListBtn');
    const exportBtn = document.getElementById('exportGearListBtn');
    const importBtn = document.getElementById('importGearListBtn');
    const deleteBtn = document.getElementById('deleteGearListBtn');
    expect(saveBtn.getAttribute('data-help')).toBe(texts.en.saveGearListBtnHelp);
    expect(exportBtn.getAttribute('data-help')).toBe(texts.en.exportGearListBtnHelp);
    expect(importBtn.getAttribute('data-help')).toBe(texts.en.importGearListBtnHelp);
    expect(deleteBtn.getAttribute('data-help')).toBe(texts.en.deleteGearListBtnHelp);
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

describe('copy summary button without clipboard support', () => {
  let script;

  beforeEach(() => {
    jest.resetModules();

    global.alert = jest.fn();
    global.prompt = jest.fn();

    delete navigator.clipboard;

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
        },
        [cageCamera]: {
          powerDrawWatts: 10,
          power: { input: { type: 'LEMO 2-pin' } },
          videoOutputs: [{ type: '3G-SDI' }]
        }
      },
      monitors: {
        MonA: {
          powerDrawWatts: 5,
          brightnessNits: 2300,
          screenSizeInches: 7,
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
      lenses: {
        LensA: { brand: 'TestBrand', tStop: 2.0, rodStandard: '15mm', rodLengthCm: 30, needsLensSupport: true },
        LensBig: { frontDiameterMm: 110 }
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
        cages: cagesData,
        chargers: {
          'Single V-Mount Charger': { mount: 'V-Mount', slots: 1, chargingSpeedAmps: 3 },
          'Dual V-Mount Charger': { mount: 'V-Mount', slots: 2, chargingSpeedAmps: 2 },
          'Quad V-Mount Charger': { mount: 'V-Mount', slots: 4, chargingSpeedAmps: 2 }
        },
        cables: {
          power: { 'D-Tap to LEMO 2-pin': { to: 'LEMO 2-pin' } },
          fiz: { 'LBUS to LBUS': { from: 'LBUS (LEMO 4-pin)', to: 'LBUS (LEMO 4-pin)' } },
          video: {
            'HDMI Cable': { type: 'HDMI' },
            'BNC Cable 0.5 m': { type: '3G-SDI' },
            'BNC Cable 1 m': { type: '3G-SDI' },
            'BNC Cable 5 m': { type: '3G-SDI' },
            'BNC Cable 10 m': { type: '3G-SDI' },
            'BNC Drum 25 m': { type: '3G-SDI' }
          }
        },
        cameraStabiliser: {
          'Easyrig 5 Vario': {
            options: ['FlowCine Serene Spring Arm', 'Easyrig - STABIL G3']
          }
        },
        tripods: {
          'Legs Large': {},
          'Legs Medium': {},
          'Legs Short': {}
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
  });

  test('copy summary button disabled when clipboard unsupported', () => {
    const btn = document.getElementById('copySummaryBtn');
    expect(btn.disabled).toBe(true);
    expect(btn.textContent).toBe(texts.en.copySummaryUnsupported);
  });
});
