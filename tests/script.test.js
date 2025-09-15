/* global texts devices */
const { getHtmlBody } = require('./domUtils');
const { TextEncoder: UtilTextEncoder, TextDecoder: UtilTextDecoder } = require('util');
global.TextEncoder = global.TextEncoder || UtilTextEncoder;
global.TextDecoder = global.TextDecoder || UtilTextDecoder;
const { JSDOM } = require('jsdom');
const LZString = require('lz-string');
const chargerData = require('../devices/chargers.js');
// Use a minimal cage fixture to keep memory usage low during tests. Only the
// properties needed for the assertions are included.
const cagesData = {
  CageOne: { brand: 'BrandA', compatible: ['CamA'] },
  CageTwo: { brand: 'BrandB', compatible: ['CamA'] }
};
const cageCamera = 'CamA';
const cageNames = Object.keys(cagesData);

const DEFAULT_FILTER_SIZE = '4x5.65';

// Read and cache the body of index.html once via shared helper to avoid
// duplicate disk access across test suites. This keeps memory usage low and
// speeds up setup when multiple tests need the DOM skeleton.
const htmlBody = getHtmlBody();

test('provides charger dataset across mounts', () => {
  expect(chargerData['Anton/Bauer LP4 Gold Mount Charger']).toEqual(
    expect.objectContaining({ mount: 'Gold-Mount', slots: 4 })
  );
  expect(chargerData['Dual V-Mount Charger']).toEqual(
    expect.objectContaining({ mount: 'V-Mount', slots: 2 })
  );
});

function setupDom(removeGear) {
  jest.resetModules();
  global.alert = jest.fn();
  global.prompt = jest.fn();


  // Use the cached HTML body instead of reading from disk each time.
  const dom = new JSDOM(`<!doctype html><html><head></head><body>${htmlBody}</body></html>`);
  global.window = dom.window;
  global.document = dom.window.document;
  global.navigator = dom.window.navigator;
  Object.assign(global.navigator, { clipboard: { writeText: jest.fn().mockResolvedValue() } });
  for (const key of Object.getOwnPropertyNames(dom.window)) {
    if (!(key in global)) {
      global[key] = dom.window[key];
    }
  }

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
    batteryHotswaps: {
      SwapHi: { capacity: 50, pinA: 20, mount_type: 'V-Mount' },
      SwapLo: { capacity: 20, pinA: 5, mount_type: 'V-Mount' }
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
  global.loadFavorites = jest.fn(() => ({}));
  global.saveFavorites = jest.fn();
}

afterEach(() => {
  if (global.localStorage) global.localStorage.clear();
  if (global.sessionStorage) global.sessionStorage.clear();
});

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

test('default FIZ devices remain when stored data lacks them', () => {
  setupDom(false);
  const defaultMotors = Object.keys(devices.fiz.motors);
  // Stored data missing FIZ entries
  global.loadDeviceData = jest.fn(() => ({
    cameras: {},
    monitors: {},
    video: {},
    batteries: {},
    fiz: { motors: {}, controllers: {}, distance: {} }
  }));
  require('../script.js');
  expect(Object.keys(devices.fiz.motors)).toEqual(defaultMotors);
});

test('filter options include diopter', () => {
  const gear = require('../devices/gearList.js');
  expect(gear.filterOptions).toContain('Diopter');
});

test('camera support list renders camera support devices', () => {
  setupDom(false);
  devices.accessories.cameraSupport = { SupportA: {} };
  require('../translations.js');
  require('../script.js');
  const listHtml = document.getElementById('cameraSupportList').innerHTML;
  expect(listHtml).toContain('SupportA');
  expect(listHtml).not.toContain(cageNames[0]);
});

test('restores project requirements from storage when gear list element is absent', () => {
  setupDom(true);
  const storedHtml = '<h2>Proj</h2><h3>Project Requirements</h3><div class="requirements-grid"><div class="requirement-box"><span class="req-label">Codec</span><span class="req-value">ProRes</span></div></div>';
  global.loadProject = jest.fn(() => ({ gearList: storedHtml, projectInfo: null }));
  global.saveProject = jest.fn();
  global.deleteProject = jest.fn();
  require('../translations.js');
  const script = require('../script.js');
  script.displayGearAndRequirements(storedHtml);
  const projOut = document.getElementById('projectRequirementsOutput');
  expect(projOut.classList.contains('hidden')).toBe(false);
  expect(projOut.innerHTML).toContain('Project Requirements');
});

test('restores project requirements from storage with gear list present', () => {
  setupDom(false);
  const storedHtml = '<h2>Proj</h2><h3>Project Requirements</h3><div class="requirements-grid"><div class="requirement-box"><span class="req-label">Codec</span><span class="req-value">ProRes</span></div></div><h3>Gear List</h3><table class="gear-table"></table>';
  global.loadProject = jest.fn(() => ({ gearList: storedHtml, projectInfo: null }));
  global.saveProject = jest.fn();
  global.deleteProject = jest.fn();
  require('../translations.js');
  const script = require('../script.js');
  script.displayGearAndRequirements(storedHtml);
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
  global.loadProject = jest.fn(() => ({ gearList: storedObj, projectInfo: null }));
  global.saveProject = jest.fn();
  global.deleteProject = jest.fn();
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
  global.loadProject = jest.fn(() => stored);
  global.saveProject = jest.fn();
  global.deleteProject = jest.fn();
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

test('restoring session state preserves selections', () => {
  setupDom(false);
  const storedState = {
    setupName: 'Sess1',
    camera: 'CamA',
    monitor: 'MonA',
    video: 'VidA',
    cage: '',
    motors: [],
    controllers: [],
    distance: '',
    batteryPlate: '',
    battery: 'BattA',
    sliderBowl: '',
    projectInfo: null
  };
  const savedState = {};
  global.loadSessionState = jest.fn(() => storedState);
  global.saveSessionState = jest.fn(state => Object.assign(savedState, state));
  global.loadProject = jest.fn(() => null);
  global.saveProject = jest.fn();
  global.deleteProject = jest.fn();
  require('../translations.js');
  const script = require('../script.js');
  script.setLanguage('en');
  expect(savedState.camera).toBe('CamA');
  expect(savedState.monitor).toBe('MonA');
  expect(savedState.battery).toBe('BattA');
});

describe('auto backup', () => {
  test('creates backup with project name without changing selection', () => {
    setupDom(false);
    const stored = { Proj1: {} };
    global.loadSetups = jest.fn(() => stored);
    global.saveSetups = jest.fn((data) => Object.assign(stored, data));
    jest.useFakeTimers();
    require('../translations.js');
    const script = require('../script.js');
    script.setLanguage('en');
    const selectEl = document.getElementById('setupSelect');
    selectEl.value = 'Proj1';
    const prevVal = selectEl.value;
    jest.advanceTimersByTime(10 * 60 * 1000);
    expect(global.saveSetups).toHaveBeenCalled();
    const names = Object.keys(stored);
    expect(names.length).toBe(2);
    const backupName = names.find((n) => n !== 'Proj1');
    expect(backupName.startsWith('auto-backup-')).toBe(true);
    expect(backupName.endsWith('-Proj1')).toBe(true);
    expect(document.getElementById('setupSelect').value).toBe(prevVal);
    const optionValues = Array.from(selectEl.options).map((o) => o.value);
    expect(optionValues).toEqual(['', 'Proj1', backupName]);
    jest.useRealTimers();
  });
});

describe('populateSetupSelect ordering', () => {
  test('auto backups appear after user projects', () => {
    setupDom(false);
    const stored = {
      'auto-backup-old': {},
      B: {},
      A: {},
    };
    global.loadSetups = jest.fn(() => stored);
    global.saveSetups = jest.fn();
    require('../translations.js');
    const script = require('../script.js');
    script.setLanguage('en');
    const optionValues = Array.from(document.querySelectorAll('#setupSelect option')).map((o) => o.value);
    expect(optionValues).toEqual(['', 'A', 'B', 'auto-backup-old']);
  });
});

describe('settings backup and restore', () => {
  test('includes user data in backup and restores it', async () => {
    jest.useFakeTimers();
    const fixedDate = new Date('2024-05-01T12:34:56.789Z');
    jest.setSystemTime(fixedDate);
    setupDom(false);
    global.loadSetups = jest.fn(() => ({}));
    global.saveSetups = jest.fn();
    global.loadDeviceData = jest.fn(() => ({}));
    global.saveDeviceData = jest.fn();
    global.loadSessionState = jest.fn(() => null);
    global.saveSessionState = jest.fn();
    global.loadProject = jest.fn(() => ({}));
    global.saveProject = jest.fn();
    global.deleteProject = jest.fn();
    global.loadFavorites = jest.fn(() => ({}));
    global.saveFavorites = jest.fn();

    const backupBtn = document.createElement('button');
    backupBtn.id = 'backupSettings';
    document.body.appendChild(backupBtn);
    const restoreBtn = document.createElement('button');
    restoreBtn.id = 'restoreSettings';
    document.body.appendChild(restoreBtn);
    const restoreInput = document.createElement('input');
    restoreInput.type = 'file';
    restoreInput.id = 'restoreSettingsInput';
    document.body.appendChild(restoreInput);

    const projectPayload = {
      Demo: { gearList: '<ul><li>Item</li></ul>', projectInfo: { projectName: 'Demo' } }
    };
    global.exportAllData = jest.fn(() => ({ foo: 'bar', favorites: { cat: ['A'] }, project: projectPayload }));
    global.importAllData = jest.fn();

    require('../translations.js');
    const script = require('../script.js');
    script.setLanguage('en');
    const logoData = 'data:image/svg+xml;base64,PHN2Zy8+';
    localStorage.setItem('customLogo', logoData);
    localStorage.setItem('language', 'de');
    localStorage.setItem('darkMode', 'true');
    localStorage.setItem('pinkMode', 'true');
    localStorage.setItem('highContrast', 'true');
    localStorage.setItem('fontSize', '18');
    localStorage.setItem('fontFamily', 'Inter');
    localStorage.setItem('accentColor', '#123456');

    global.URL.createObjectURL = jest.fn(() => 'blob:url');
    global.URL.revokeObjectURL = jest.fn();
    const origCreateElement = document.createElement.bind(document);
    const anchor = { href: '', download: '', click: jest.fn() };
    document.createElement = jest.fn(tag => tag === 'a' ? anchor : origCreateElement(tag));

    backupBtn.dispatchEvent(new window.Event('click'));
    expect(global.exportAllData).toHaveBeenCalledTimes(1);
    const blob = global.URL.createObjectURL.mock.calls[0][0];
    const text = await blob.text();
    const obj = JSON.parse(text);
    expect(obj.data).toEqual({ foo: 'bar', favorites: { cat: ['A'] }, project: projectPayload });
    expect(obj.version).toBe(script.APP_VERSION);
    expect(obj.generatedAt).toBe(fixedDate.toISOString());
    expect(obj.settings.customLogo).toBe(logoData);
    expect(obj.settings.language).toBe('de');
    expect(obj.settings.darkMode).toBe('true');
    expect(obj.settings.pinkMode).toBe('true');
    expect(obj.settings.highContrast).toBe('true');
    expect(obj.settings.fontSize).toBe('18');
    expect(obj.settings.fontFamily).toBe('Inter');
    expect(obj.settings.accentColor).toBe('#123456');
    expect(anchor.download).toBe('2024-05-01T12-34-56Z full app backup.json');

    document.createElement = origCreateElement;

    const fileData = JSON.stringify(obj);
    global.FileReader = class {
      readAsText() {
        this.onload({ target: { result: fileData } });
      }
    };
    localStorage.removeItem('customLogo');
    expect(localStorage.getItem('customLogo')).toBeNull();
    Object.defineProperty(restoreInput, 'files', { value: [new Blob()] });
    restoreBtn.dispatchEvent(new window.Event('click'));
    restoreInput.dispatchEvent(new window.Event('change'));
    expect(global.exportAllData).toHaveBeenCalledTimes(2);
    expect(global.importAllData).toHaveBeenCalledWith({ foo: 'bar', favorites: { cat: ['A'] }, project: projectPayload });
    expect(localStorage.getItem('customLogo')).toBe(logoData);
    jest.useRealTimers();
  });

  test('preserves localStorage keys that resemble prototypes', async () => {
    jest.useFakeTimers();
    try {
      const fixedDate = new Date('2024-05-01T12:34:56.789Z');
      jest.setSystemTime(fixedDate);
      setupDom(false);
      global.loadSetups = jest.fn(() => ({}));
      global.saveSetups = jest.fn();
      global.loadDeviceData = jest.fn(() => ({}));
      global.saveDeviceData = jest.fn();
      global.loadSessionState = jest.fn(() => null);
      global.saveSessionState = jest.fn();
      global.loadProject = jest.fn(() => ({}));
      global.saveProject = jest.fn();
      global.deleteProject = jest.fn();
      global.loadFavorites = jest.fn(() => ({}));
      global.saveFavorites = jest.fn();

      const backupBtn = document.createElement('button');
      backupBtn.id = 'backupSettings';
      document.body.appendChild(backupBtn);

      global.exportAllData = jest.fn(() => ({}));

      require('../translations.js');
      require('../script.js').setLanguage('en');

      localStorage.setItem('__proto__', 'proto-value');
      localStorage.setItem('constructor', 'ctor-value');

      global.URL.createObjectURL = jest.fn(() => 'blob:url');
      global.URL.revokeObjectURL = jest.fn();
      const origCreateElement = document.createElement.bind(document);
      const anchor = { href: '', download: '', click: jest.fn() };
      document.createElement = jest.fn(tag => tag === 'a' ? anchor : origCreateElement(tag));

      try {
        backupBtn.dispatchEvent(new window.Event('click'));
        expect(global.exportAllData).toHaveBeenCalledTimes(1);
        const blob = global.URL.createObjectURL.mock.calls[0][0];
        const json = JSON.parse(await blob.text());
        expect(json.settings['__proto__']).toBe('proto-value');
        expect(json.settings.constructor).toBe('ctor-value');
      } finally {
        document.createElement = origCreateElement;
      }
    } finally {
      jest.useRealTimers();
    }
  });

  test('warns when backup version differs', async () => {
    jest.useFakeTimers();
    setupDom(false);
    global.loadSetups = jest.fn(() => ({}));
    global.saveSetups = jest.fn();
    global.loadDeviceData = jest.fn(() => ({}));
    global.saveDeviceData = jest.fn();
    global.loadSessionState = jest.fn(() => null);
    global.saveSessionState = jest.fn();
    global.loadProject = jest.fn(() => ({}));
    global.saveProject = jest.fn();
    global.deleteProject = jest.fn();
    global.loadFavorites = jest.fn(() => ({}));
    global.saveFavorites = jest.fn();

    const restoreBtn = document.createElement('button');
    restoreBtn.id = 'restoreSettings';
    document.body.appendChild(restoreBtn);
    const restoreInput = document.createElement('input');
    restoreInput.type = 'file';
    restoreInput.id = 'restoreSettingsInput';
    document.body.appendChild(restoreInput);

    global.exportAllData = jest.fn(() => ({}));
    global.importAllData = jest.fn();

    require('../translations.js');
    const script = require('../script.js');
    script.setLanguage('en');

    global.URL.createObjectURL = jest.fn(() => 'blob:url');
    global.URL.revokeObjectURL = jest.fn();
    const origCreateElement = document.createElement.bind(document);
    const anchor = { href: '', download: '', click: jest.fn() };
    document.createElement = jest.fn(tag => tag === 'a' ? anchor : origCreateElement(tag));

    const fileData = JSON.stringify({ version: '0.9.0', settings: {}, data: {} });
    global.FileReader = class {
      readAsText() {
        this.onload({ target: { result: fileData } });
      }
    };
    Object.defineProperty(restoreInput, 'files', { value: [new Blob()] });

    global.alert.mockClear();
    restoreBtn.dispatchEvent(new window.Event('click'));
    restoreInput.dispatchEvent(new window.Event('change'));
    expect(global.alert.mock.calls[0][0]).toContain(texts.en.restoreVersionWarning);
    expect(global.alert.mock.calls[1][0]).toBe(texts.en.restoreSuccess);

    document.createElement = origCreateElement;
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

    document.body.innerHTML = getHtmlBody();
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
          LensA: { brand: 'TestBrand', tStop: 2.0, rodStandard: '15mm', rodLengthCm: 30, needsLensSupport: true, frontDiameterMm: 80, weight_g: 110, clampOn: true, minFocusMeters: 0.35 },
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
    global.loadProject = jest.fn(() => '');
    global.saveProject = jest.fn();
    global.deleteProject = jest.fn();
    global.loadFavorites = jest.fn(() => ({}));
    global.saveFavorites = jest.fn();

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
      expect(values).toEqual(expect.arrayContaining(['Toggle LUT', 'False Color', 'Peaking', 'Frame Grab']));
    });
  });

  test('new device form includes cable category option', () => {
    const select = document.getElementById('newCategory');
    const hasCable = Array.from(select.options).some(o => o.value === 'accessories.cables');
    expect(hasCable).toBe(true);
  });

  test('cable category shows subcategories', () => {
    const categorySelect = document.getElementById('newCategory');
    categorySelect.value = 'accessories.cables';
    categorySelect.dispatchEvent(new Event('change'));
    const subSel = document.getElementById('newSubcategory');
    expect(subSel).not.toBeNull();
    const values = Array.from(subSel.options).map(o => o.value);
    expect(values).toEqual(expect.arrayContaining(['power', 'video', 'cables']));
  });

  test('new device form includes wireless receiver category option', () => {
    const select = document.getElementById('newCategory');
    const hasWirelessRx = Array.from(select.options).some(o => o.value === 'wirelessReceivers');
    expect(hasWirelessRx).toBe(true);
  });

  test('new device form includes battery hotswap category option', () => {
    const select = document.getElementById('newCategory');
    const hasHotswap = Array.from(select.options).some(o => o.value === 'batteryHotswaps');
    expect(hasHotswap).toBe(true);
  });

  test('new device form includes camera support category option', () => {
    const select = document.getElementById('newCategory');
    const hasSupport = Array.from(select.options).some(o => o.value === 'accessories.cameraSupport');
    expect(hasSupport).toBe(true);
  });

  test('new device form includes director monitor category option', () => {
    setupDom(false);
    global.devices = require('../data.js');
    require('../translations.js');
    require('../script.js');
    const select = document.getElementById('newCategory');
    const hasDirector = Array.from(select.options).some(o => o.value === 'directorMonitors');
    expect(hasDirector).toBe(true);
  });

  test('new device form includes all categories from devices', () => {
    setupDom(false);
    global.devices = require('../data.js');
    require('../translations.js');
    require('../script.js');
    const selectValues = Array.from(document.getElementById('newCategory').options).map(o => o.value);
    const dev = require('../data.js');
    const expected = new Set();
    const add = (v) => expected.add(v);
    for (const [key, obj] of Object.entries(dev)) {
      if (key === 'accessories') {
        for (const sub of Object.keys(obj)) add(`accessories.${sub}`);
      } else if (key === 'fiz') {
        for (const sub of Object.keys(obj)) add(`fiz.${sub}`);
      } else if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
        add(key);
      }
    }
    expect(selectValues).toEqual(expect.arrayContaining([...expected]));
  });

  test('populateLensDropdown fills lens list without duplicates and adds attributes', () => {
    const sel = document.getElementById('lenses');
    sel.innerHTML = '<option value="Existing">Existing</option>';
    script.populateLensDropdown();
    expect(Array.from(sel.options).map(o => o.value)).toEqual(['LensA', 'LensBig']);
    expect(sel.options[0].textContent).toContain('LensA');
    expect(sel.options[0].textContent).toContain('110g');
    expect(sel.options[0].textContent).toContain('80mm clamp-on');
    expect(sel.options[0].textContent).toContain('0.35m min focus');
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

  test('favorited option moves to top', () => {
    localStorage.clear();
    const sel = document.createElement('select');
    sel.id = 'favTest';
    document.body.appendChild(sel);
    script.populateSelect(sel, { Alpha: {}, Beta: {}, Gamma: {} }, true);
    sel.value = 'Gamma';
    const btn = sel.nextElementSibling;
    btn.click();
    expect(Array.from(sel.options).map(o => o.value)).toEqual(['None', 'Gamma', 'Alpha', 'Beta']);
    // Re-populate to ensure persistence
    script.populateSelect(sel, { Alpha: {}, Beta: {}, Gamma: {} }, true);
    expect(Array.from(sel.options).map(o => o.value)).toEqual(['None', 'Gamma', 'Alpha', 'Beta']);
  });

  test('favorite star works for select nested in label', () => {
    document.body.innerHTML = '<div class="form-row"><label>Foo:<select id="labelSel"></select></label></div>';
    const sel = document.getElementById('labelSel');
    script.populateSelect(sel, { Alpha: {}, Beta: {} }, true);
    const label = document.querySelector('label');
    const wrapper = label.nextElementSibling;
    expect(wrapper.classList.contains('select-wrapper')).toBe(true);
    const btn = wrapper.querySelector('.favorite-toggle');
    expect(btn).not.toBeNull();
    sel.value = 'Alpha';
    btn.click();
    expect(Array.from(sel.options).map(o => o.value)).toEqual(['None', 'Alpha', 'Beta']);
  });

  test('hidden select does not get favorite star', () => {
    document.body.innerHTML = '<select id="hiddenSel" hidden></select>';
    const sel = document.getElementById('hiddenSel');
    script.populateSelect(sel, { Alpha: {}, Beta: {} }, true);
    const btn = document.querySelector('.favorite-toggle');
    expect(btn).toBeNull();
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
    expect(lensRow.textContent).toContain('80mm clamp-on');
    expect(lensRow.textContent).toContain('0.35m min focus');
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
    gearList.innerHTML = '<h2>Gear List: “Proj”</h2><table class="gear-table"><tr class="category-row"><td>Camera</td></tr><tr><td>CamA</td></tr></table>';
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
    global.saveProject = jest.fn();
    const gear = document.getElementById('gearListOutput');
    gear.innerHTML = '<span class="cage-select-wrapper"><span>1x</span><select id="gearListCage"><option value="Cage1">Cage1</option><option value="Cage2">Cage2</option></select></span>';
    gear.classList.remove('hidden');
    const cageSel = gear.querySelector('#gearListCage');
    cageSel.value = 'Cage2';
    script.saveCurrentGearList();
    const saved = global.saveProject.mock.calls[0][1];
    expect(saved.gearList).toContain('<option value="Cage2" selected');
  });

  test('project requirements are saved with gear list', () => {
    global.saveProject = jest.fn();
    const proj = document.getElementById('projectRequirementsOutput');
    proj.innerHTML = '<h2>Proj</h2><h3>Project Requirements</h3><div class="requirements-grid"><div class="requirement-box"><span class="req-label">Codec</span><span class="req-value">ProRes</span></div></div>';
    proj.classList.remove('hidden');
    const gear = document.getElementById('gearListOutput');
    gear.innerHTML = '<h2>Gear List: “Proj”</h2><table class="gear-table"></table>';
    gear.classList.remove('hidden');
    script.saveCurrentGearList();
    const saved = global.saveProject.mock.calls[0][1];
    expect(saved.gearList).toContain('<div class="requirements-grid">');
    expect(saved.gearList).toContain('<table class="gear-table">');
  });

  test('slider bowl selection saved with project info', () => {
    const reqSel = document.getElementById('requiredScenarios');
    Array.from(reqSel.options).find(o => o.value === 'Slider').selected = true;
    const form = document.getElementById('projectForm');
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    global.saveProject.mockClear();
    const bowlSel = document.getElementById('gearListSliderBowl');
    bowlSel.value = '100er bowl';
    bowlSel.dispatchEvent(new Event('change', { bubbles: true }));
    const saved = global.saveProject.mock.calls[0][1];
    expect(saved.projectInfo.sliderBowl).toBe('100er bowl');
  });

  test('slider bowl selection not shown in project summary', () => {
    global.saveProject = jest.fn();
    const reqSel = document.getElementById('requiredScenarios');
    Array.from(reqSel.options).find(o => o.value === 'Slider').selected = true;
    const form = document.getElementById('projectForm');
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    const bowlSel = document.getElementById('gearListSliderBowl');
    bowlSel.value = '100er bowl';
    bowlSel.dispatchEvent(new Event('change', { bubbles: true }));
    const savedHtml = global.saveProject.mock.calls[0][1].gearList;
    const wrap = document.createElement('div');
    wrap.innerHTML = savedHtml;
    const reqGrid = wrap.querySelector('.requirements-grid');
    expect(reqGrid.textContent).not.toContain('Slider Bowl');
    expect(reqGrid.textContent).not.toContain('100er bowl');
  });

  test('director monitor selection persists after regenerating gear list', () => {
    devices.monitors.MonB = {
      powerDrawWatts: 5,
      brightnessNits: 1000,
      screenSizeInches: 7,
      power: { input: { type: 'LEMO 2-pin' } },
      videoInputs: [{ type: '3G-SDI' }]
    };
    const videoSel = document.getElementById('videoDistribution');
    videoSel.innerHTML = '<option value="Director Monitor 7&quot; handheld">Director Monitor 7" handheld</option>';
    videoSel.value = 'Director Monitor 7" handheld';
    document.getElementById('projectName').value = 'Proj';
    const form = document.getElementById('projectForm');
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    const gear = document.getElementById('gearListOutput');
    const sel = gear.querySelector('#gearListDirectorMonitor');
    const newVal = Array.from(sel.options).find(o => o.value !== sel.value).value;
    sel.value = newVal;
    script.saveCurrentGearList();
    expect(script.getCurrentProjectInfo().directorMonitor).toBe(newVal);
    gear.innerHTML = script.generateGearListHtml(script.getCurrentProjectInfo());
    expect(gear.querySelector('#gearListDirectorMonitor').value).toBe(newVal);
  });

  test('pro gaff tape selection persists after regenerating gear list', () => {
    const gear = document.getElementById('gearListOutput');
    gear.innerHTML = script.generateGearListHtml({});
    gear.classList.remove('hidden');
    const colorSel = gear.querySelector('#gearListProGaffColor1');
    const widthSel = gear.querySelector('#gearListProGaffWidth1');
    colorSel.value = 'black';
    widthSel.value = '48mm';
    script.saveCurrentGearList();
    const info = script.getCurrentProjectInfo();
    expect(info.proGaffColor1).toBe('black');
    expect(info.proGaffWidth1).toBe('48mm');
    gear.innerHTML = script.generateGearListHtml(info);
    expect(gear.querySelector('#gearListProGaffColor1').value).toBe('black');
    expect(gear.querySelector('#gearListProGaffWidth1').value).toBe('48mm');
  });

  test('entire project form is saved with gear list', () => {
    global.saveProject = jest.fn();
    document.getElementById('projectName').value = 'Proj';
    const codecSel = document.getElementById('codec');
    codecSel.innerHTML = '<option value="ProRes">ProRes</option>';
    codecSel.value = 'ProRes';
    const lensSel = document.getElementById('lenses');
    lensSel.innerHTML = '<option value="LensA">LensA</option>';
    lensSel.options[0].selected = true;
    const videoSel = document.getElementById('videoDistribution');
    if (videoSel.options.length) videoSel.options[0].selected = true;
    document.getElementById('tripodHeadBrand').value = 'OConnor';
    document.getElementById('tripodBowl').value = '100mm bowl';
    const vfSel = document.getElementById('viewfinderSettings');
    vfSel.options[0].selected = true;
    const frameSel = document.getElementById('frameGuides');
    frameSel.options[0].selected = true;
    const aspectMaskSel = document.getElementById('aspectMaskOpacity');
    aspectMaskSel.options[0].selected = true;
    const form = document.getElementById('projectForm');
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    const saved = global.saveProject.mock.calls[0][1];
    const expectedKeys = [
      'projectName','productionCompany','rentalHouse','prepDays','shootingDays','deliveryResolution','recordingResolution','aspectRatio','codec','baseFrameRate','sensorMode','lenses','requiredScenarios','cameraHandle','viewfinderExtension','viewfinderEyeLeatherColor','mattebox','gimbal','videoDistribution','monitoringConfiguration','focusMonitor','monitoringSupport','monitorUserButtons','cameraUserButtons','viewfinderUserButtons','tripodHeadBrand','tripodBowl','tripodTypes','tripodSpreader','sliderBowl','filter','directorMonitor','proGaffColor1','proGaffWidth1','proGaffColor2','proGaffWidth2'
    ];
    expect(Object.keys(saved.projectInfo).sort()).toEqual(expectedKeys.sort());
    expect(saved.projectInfo.lenses).toBe('LensA');
    expect(saved.projectInfo.videoDistribution).toContain('Director Monitor 5');
    expect(saved.projectInfo.tripodHeadBrand).toBe('OConnor');
    expect(saved.projectInfo.tripodBowl).toBe('100mm bowl');
    expect(saved.projectInfo.monitoringSupport).toBe('Viewfinder Clean Feed, Frame Guide: Center Dot, Aspect Mask Opacity 100%');
    expect(saved.projectInfo.viewfinderEyeLeatherColor).toBe('Red');
  });

  test('project requirements form saved with project', () => {
    const stored = {};
    global.saveSetups = jest.fn((data) => Object.assign(stored, data));
    global.saveProject = jest.fn();
    document.getElementById('projectName').value = 'Proj';
    const lensSel = document.getElementById('lenses');
    lensSel.innerHTML = '<option value="LensA">LensA</option>';
    lensSel.options[0].selected = true;
    const form = document.getElementById('projectForm');
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    const nameInput = document.getElementById('setupName');
    nameInput.value = 'Setup1';
    nameInput.dispatchEvent(new Event('input', { bubbles: true }));
    document.getElementById('saveSetupBtn').click();
    expect(stored.Setup1.projectInfo.projectName).toBe('Proj');
    expect(stored.Setup1.projectInfo.lenses).toBe('LensA');
    expect(stored.Setup1.projectInfo.viewfinderEyeLeatherColor).toBe('Red');
  });

  test('changing device selection triggers gear list save', () => {
    global.saveProject = jest.fn();
    const gear = document.getElementById('gearListOutput');
    gear.innerHTML = '<div>Test</div>';
    gear.classList.remove('hidden');
    const camSel = document.getElementById('cameraSelect');
    camSel.dispatchEvent(new Event('change', { bubbles: true }));
    expect(global.saveProject).toHaveBeenCalled();
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
    expect(confirmSpy).toHaveBeenCalledTimes(2);
    confirmSpy.mockRestore();
    expect(genBtn.classList.contains('hidden')).toBe(false);
    expect(document.getElementById('editProjectBtn')).toBeNull();
  });

  test('creating gear list after deletion clears project requirements', () => {
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    addOpt('batterySelect', 'BattA');
    script.updateCalculations();
    document.getElementById('projectName').value = 'Proj';
    const codecSel = document.getElementById('codec');
    codecSel.innerHTML = '<option value="ProRes">ProRes</option>';
    codecSel.value = 'ProRes';
    const html = script.generateGearListHtml(script.collectProjectFormData());
    script.displayGearAndRequirements(html);
    script.ensureGearListActions();
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);
    document.getElementById('deleteGearListBtn').click();
    confirmSpy.mockRestore();
    expect(document.getElementById('projectName').value).toBe('');
    expect(codecSel.value).toBe('');
    const html2 = script.generateGearListHtml(script.collectProjectFormData());
    expect(html2).not.toContain('Project Requirements');
  });

  test('deleting gear list restores default monitoring configuration', () => {
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    addOpt('batterySelect', 'BattA');
    script.updateCalculations();
    document.getElementById('projectName').value = 'Proj';
    const monitoringSel = document.getElementById('monitoringConfiguration');
    monitoringSel.value = 'Onboard Only';
    const html = script.generateGearListHtml(script.collectProjectFormData());
    script.displayGearAndRequirements(html);
    script.ensureGearListActions();
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);
    document.getElementById('deleteGearListBtn').click();
    confirmSpy.mockRestore();
    expect(monitoringSel.value).toBe('Viewfinder only');
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
    const html = script.generateGearListHtml({ videoDistribution: 'Director Monitor 7" handheld' });
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

  test('opening help closes side menu', () => {
    const menu = document.getElementById('sideMenu');
    const overlay = document.getElementById('menuOverlay');
    const toggle = document.getElementById('menuToggle');
    menu.classList.add('open');
    menu.removeAttribute('hidden');
    overlay.classList.remove('hidden');
    toggle.setAttribute('aria-expanded', 'true');

    document.getElementById('helpButton').click();

    expect(menu.classList.contains('open')).toBe(false);
    expect(menu.hasAttribute('hidden')).toBe(true);
    expect(overlay.classList.contains('hidden')).toBe(true);
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });

  test('Escape closes side menu', () => {
    setupDom(false);
    require('../script.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));
    const toggle = document.getElementById('menuToggle');
    const menu = document.getElementById('sideMenu');
    const overlay = document.getElementById('menuOverlay');

    toggle.click();
    expect(toggle.getAttribute('aria-label')).toBe('Close menu');

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(menu.classList.contains('open')).toBe(false);
    expect(menu.hasAttribute('hidden')).toBe(true);
    expect(overlay.classList.contains('hidden')).toBe(true);
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(toggle.getAttribute('aria-label')).toBe('Menu');
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

  test('Alexa Mini LF offers B-Mount batteries', () => {
    setupDom(false);
    require('../translations.js');
    const script = require('../script.js');
    global.devices.cameras['Arri Alexa Mini LF'] = {
      powerDrawWatts: 89,
      power: {
        batteryPlateSupport: [
          { type: 'V-Mount', mount: 'native' },
          { type: 'B-Mount', mount: 'native' }
        ]
      }
    };
    global.devices.batteries['Bebob B90cine'] = {
      capacity: 86,
      pinA: 20,
      dtapA: 5,
      mount_type: 'B-Mount'
    };
    const camSel = document.getElementById('cameraSelect');
    camSel.innerHTML = '<option value="Arri Alexa Mini LF">Arri Alexa Mini LF</option>';
    camSel.value = 'Arri Alexa Mini LF';
    script.updateBatteryPlateVisibility();
    const plateSel = document.getElementById('batteryPlateSelect');
    const plateOpts = Array.from(plateSel.options).map(o => o.value);
    expect(plateOpts).toContain('B-Mount');
    plateSel.value = 'B-Mount';
    script.updateBatteryOptions();
    const battSel = document.getElementById('batterySelect');
    const battOpts = Array.from(battSel.options).map(o => o.value);
    expect(battOpts).toContain('Bebob B90cine');
  });

  test('Alexa Mini LF offers Gold-Mount batteries', () => {
    setupDom(false);
    require('../translations.js');
    const script = require('../script.js');
    global.devices.cameras['Arri Alexa Mini LF'] = {
      powerDrawWatts: 89,
      power: {
        batteryPlateSupport: [
          { type: 'V-Mount', mount: 'native' },
          { type: 'Gold-Mount', mount: 'native' }
        ]
      }
    };
    global.devices.batteries.GBatt = {
      capacity: 100,
      pinA: 10,
      dtapA: 5,
      mount_type: 'Gold-Mount'
    };
    const camSel = document.getElementById('cameraSelect');
    camSel.innerHTML = '<option value="Arri Alexa Mini LF">Arri Alexa Mini LF</option>';
    camSel.value = 'Arri Alexa Mini LF';
    script.updateBatteryPlateVisibility();
    const plateSel = document.getElementById('batteryPlateSelect');
    const plateOpts = Array.from(plateSel.options).map(o => o.value);
    expect(plateOpts).toContain('Gold-Mount');
    plateSel.value = 'Gold-Mount';
    script.updateBatteryOptions();
    const battSel = document.getElementById('batterySelect');
    const battOpts = Array.from(battSel.options).map(o => o.value);
    expect(battOpts).toContain('GBatt');
  });

  test('battery plate defaults to V-Mount when available', () => {
    setupDom(false);
    require('../translations.js');
    const script = require('../script.js');
    global.devices.cameras.BothCam = {
      powerDrawWatts: 10,
      power: {
        batteryPlateSupport: [
          { type: 'V-Mount', mount: 'native' },
          { type: 'B-Mount', mount: 'native' }
        ]
      }
    };
    const camSel = document.getElementById('cameraSelect');
    camSel.innerHTML = '<option value="BothCam">BothCam</option>';
    camSel.value = 'BothCam';
    script.updateBatteryPlateVisibility();
    const plateSel = document.getElementById('batteryPlateSelect');
    expect(plateSel.value).toBe('V-Mount');
  });

  test('battery plate defaults to first available when V-Mount unsupported', () => {
    setupDom(false);
    require('../translations.js');
    const script = require('../script.js');
    global.devices.cameras.BOnly = {
      powerDrawWatts: 10,
      power: { batteryPlateSupport: [{ type: 'B-Mount', mount: 'native' }] }
    };
    const camSel = document.getElementById('cameraSelect');
    camSel.innerHTML = '<option value="BOnly">BOnly</option>';
    camSel.value = 'BOnly';
    script.updateBatteryPlateVisibility();
    const plateSel = document.getElementById('batteryPlateSelect');
    expect(plateSel.value).toBe('B-Mount');
  });

  test('FXLion hotswap only visible for FXLion Nano batteries', () => {
    global.devices.cameras.VCam = {
      powerDrawWatts: 10,
      power: { batteryPlateSupport: [{ type: 'V-Mount', mount: 'native' }] }
    };
    global.devices.batteries.Other = { capacity: 100, pinA: 10, dtapA: 5, mount_type: 'V-Mount' };
    global.devices.batteries['FXLion Nano Two (V-Mount)'] = {
      capacity: 98, pinA: 10, dtapA: 10, mount_type: 'V-Mount'
    };
    global.devices.batteryHotswaps = {
      'FX-Lion NANO Dual V-Mount Hot-Swap Plate': { capacity: 0, pinA: 8, mount_type: 'V-Mount' },
      'Other Swap': { capacity: 0, pinA: 10, mount_type: 'V-Mount' }
    };

    const camSel = document.getElementById('cameraSelect');
    const battSel = document.getElementById('batterySelect');
    const swapSel = document.getElementById('batteryHotswapSelect');

    camSel.innerHTML = '<option value="VCam">VCam</option>';
    camSel.value = 'VCam';
    script.updateBatteryOptions();

    battSel.value = 'Other';
    script.updateBatteryOptions();
    let options = Array.from(swapSel.options).map(o => o.value);
    expect(options).not.toContain('FX-Lion NANO Dual V-Mount Hot-Swap Plate');

    battSel.value = 'FXLion Nano Two (V-Mount)';
    script.updateBatteryOptions();
    options = Array.from(swapSel.options).map(o => o.value);
    expect(options).toContain('FX-Lion NANO Dual V-Mount Hot-Swap Plate');
  });

  test('hotswap dropdown hides swaps below current draw', () => {
    const camSel = document.getElementById('cameraSelect');
    const battSel = document.getElementById('batterySelect');
    const swapSel = document.getElementById('batteryHotswapSelect');

    // Ensure battery can handle high current
    devices.batteries.BattA.pinA = 50;
    devices.batteries.BattA.dtapA = 50;

    camSel.value = 'CamA';
    battSel.value = 'BattA';

    // High power draw removes low-amp hotswap
    devices.cameras.CamA.powerDrawWatts = 150;
    script.updateCalculations();
    let options = Array.from(swapSel.options).map(o => o.value);
    expect(options).not.toContain('SwapLo');

    // Lower power draw brings it back
    devices.cameras.CamA.powerDrawWatts = 10;
    script.updateCalculations();
    options = Array.from(swapSel.options).map(o => o.value);
    expect(options).toContain('SwapLo');
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

  test('battery comparison excludes Gold-Mount when camera lacks support', () => {
    global.devices.cameras.NoPlateCam = { powerDrawWatts: 10 };
    global.devices.batteries.VBatt = { capacity: 100, pinA: 10, dtapA: 5, mount_type: 'V-Mount' };
    global.devices.batteries.GBatt = { capacity: 100, pinA: 10, dtapA: 5, mount_type: 'Gold-Mount' };

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
    expect(html).not.toContain('GBatt');
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

  test('overview battery comparison excludes Gold-Mount when camera lacks support', () => {
    global.devices.cameras.NoPlateCam = { powerDrawWatts: 10 };
    global.devices.batteries.VBatt = { capacity: 100, pinA: 10, dtapA: 5, mount_type: 'V-Mount' };
    global.devices.batteries.GBatt = { capacity: 100, pinA: 10, dtapA: 5, mount_type: 'Gold-Mount' };

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
    expect(html).not.toContain('GBatt');
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

    document.body.innerHTML = getHtmlBody();
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
    require('../translations.js');
    require('../script.js');

    expect(document.documentElement.lang).toBe('fr');
    expect(localStorage.getItem('language')).toBe('fr');
  });

  test('unifyDevices normalizes videoOutputs', () => {
    jest.resetModules();

    document.body.innerHTML = getHtmlBody();

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

    document.body.innerHTML = getHtmlBody();

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

    document.body.innerHTML = getHtmlBody();

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
    const checkbox = document.getElementById('settingsDarkMode');
    applyDarkMode(true);
    expect(document.body.classList.contains('dark-mode')).toBe(true);
    expect(document.documentElement.classList.contains('dark-mode')).toBe(true);
    expect(toggle.textContent).toBe('☀️');
    expect(toggle.getAttribute('aria-pressed')).toBe('true');
    expect(meta.getAttribute('content')).toBe('#1c1c1e');
    expect(checkbox.checked).toBe(true);
    applyDarkMode(false);
    expect(document.body.classList.contains('dark-mode')).toBe(false);
    expect(document.documentElement.classList.contains('dark-mode')).toBe(false);
    expect(toggle.textContent).toBe('🌙');
    expect(toggle.getAttribute('aria-pressed')).toBe('false');
    expect(meta.getAttribute('content')).toBe('#ffffff');
    expect(checkbox.checked).toBe(false);
  });

  test('applyPinkMode overrides accent color and disables input', () => {
    const { applyPinkMode } = script;
    const toggle = document.getElementById('pinkModeToggle');
    const colorInput = document.getElementById('accentColorInput');
    colorInput.value = '#123456';
    colorInput.dispatchEvent(new Event('input'));
    expect(document.documentElement.style.getPropertyValue('--accent-color')).toBe('#123456');
    applyPinkMode(true);
    expect(document.body.classList.contains('pink-mode')).toBe(true);
    expect(toggle.textContent).toBe('🦄');
    expect(toggle.getAttribute('aria-pressed')).toBe('true');
    expect(colorInput.disabled).toBe(true);
    expect(getComputedStyle(document.body).getPropertyValue('--accent-color').trim()).toBe('#ff69b4');
    colorInput.value = '#654321';
    colorInput.dispatchEvent(new Event('input'));
    expect(getComputedStyle(document.body).getPropertyValue('--accent-color').trim()).toBe('#ff69b4');
    applyPinkMode(false);
    expect(document.body.classList.contains('pink-mode')).toBe(false);
    expect(toggle.textContent).toBe('🐴');
    expect(toggle.getAttribute('aria-pressed')).toBe('false');
    expect(colorInput.disabled).toBe(false);
    expect(document.documentElement.style.getPropertyValue('--accent-color')).toBe('#123456');
  });

  test('settings dialog saves preferences to localStorage', () => {
    const settingsBtn = document.getElementById('settingsButton');
    settingsBtn.click();
    const dialog = document.getElementById('settingsDialog');
    expect(dialog.hasAttribute('hidden')).toBe(false);
    const langSelect = document.getElementById('settingsLanguage');
    const darkCheck = document.getElementById('settingsDarkMode');
    const contrastCheck = document.getElementById('settingsHighContrast');
    const colorInput = document.getElementById('accentColorInput');
    const sizeSelect = document.getElementById('settingsFontSize');
    const familySelect = document.getElementById('settingsFontFamily');
    langSelect.value = 'de';
    darkCheck.checked = true;
    contrastCheck.checked = true;
    colorInput.value = '#123456';
    sizeSelect.value = '18';
    familySelect.value = "'Arial', sans-serif";
    document.getElementById('settingsSave').click();
    expect(localStorage.getItem('language')).toBe('de');
    expect(localStorage.getItem('darkMode')).toBe('true');
    expect(localStorage.getItem('highContrast')).toBe('true');
    expect(localStorage.getItem('accentColor')).toBe('#123456');
    expect(localStorage.getItem('fontSize')).toBe('18');
    expect(localStorage.getItem('fontFamily')).toBe("'Arial', sans-serif");
    expect(document.documentElement.style.getPropertyValue('--accent-color')).toBe('#ffffff');
    expect(document.body.style.getPropertyValue('--accent-color')).toBe('#ffffff');
    expect(document.documentElement.style.getPropertyValue('--link-color')).toBe('');
    expect(document.body.style.getPropertyValue('--link-color')).toBe('');
    expect(document.body.classList.contains('high-contrast')).toBe(true);
    expect(document.documentElement.classList.contains('high-contrast')).toBe(true);
    expect(dialog.hasAttribute('hidden')).toBe(true);
  });

  test('applyHighContrast forces white accent color and restores the saved choice', () => {
    const { applyHighContrast } = script;
    const settingsBtn = document.getElementById('settingsButton');
    settingsBtn.click();
    const colorInput = document.getElementById('accentColorInput');
    colorInput.value = '#345678';
    document.getElementById('settingsSave').click();
    expect(document.documentElement.style.getPropertyValue('--accent-color')).toBe('#345678');
    expect(document.body.style.getPropertyValue('--accent-color')).toBe('#345678');
    applyHighContrast(true);
    expect(document.body.classList.contains('high-contrast')).toBe(true);
    expect(getComputedStyle(document.body).getPropertyValue('--accent-color').trim()).toBe('#ffffff');
    expect(document.documentElement.style.getPropertyValue('--link-color')).toBe('');
    expect(document.body.style.getPropertyValue('--link-color')).toBe('');
    applyHighContrast(false);
    expect(document.body.classList.contains('high-contrast')).toBe(false);
    expect(document.documentElement.style.getPropertyValue('--accent-color')).toBe('#345678');
    expect(document.body.style.getPropertyValue('--accent-color')).toBe('#345678');
    expect(document.documentElement.style.getPropertyValue('--link-color')).toBe('#345678');
    expect(document.body.style.getPropertyValue('--link-color')).toBe('#345678');
  });

  test('uploaded logo is saved and included in printable overview', async () => {
    setupDom(false);
    const { generatePrintableOverview } = require('../script.js');
    const settingsBtn = document.getElementById('settingsButton');
    settingsBtn.click();
    const fileInput = document.getElementById('settingsLogo');
    const file = new File(['<svg xmlns="http://www.w3.org/2000/svg"></svg>'], 'logo.svg', { type: 'image/svg+xml' });
    Object.defineProperty(fileInput, 'files', { value: [file] });
    document.getElementById('settingsSave').click();
    await new Promise(res => setTimeout(res, 0));
    const stored = localStorage.getItem('customLogo');
    expect(stored).toContain('data:image/svg+xml');
    const preview = document.getElementById('settingsLogoPreview');
    const previewImg = preview.querySelector('img');
    expect(preview.hasAttribute('hidden')).toBe(false);
    expect(previewImg).not.toBeNull();
    expect(previewImg.getAttribute('src')).toBe(stored);
    settingsBtn.click();
    const reopenedImg = document.querySelector('#settingsLogoPreview img');
    expect(reopenedImg).not.toBeNull();
    expect(reopenedImg.getAttribute('src')).toBe(stored);
    document.getElementById('settingsCancel').click();
    generatePrintableOverview();
    const printLogo = document.getElementById('printLogo');
    expect(printLogo).not.toBeNull();
    expect(printLogo.getAttribute('src')).toBe(stored);
    const content = document.getElementById('overviewDialogContent');
    expect(content.classList.contains('logo-present')).toBe(true);
  });

  test('rejects non-SVG logo uploads', () => {
    setupDom(false);
    require('../script.js');
    const settingsBtn = document.getElementById('settingsButton');
    settingsBtn.click();
    const fileInput = document.getElementById('settingsLogo');
    const file = new File(['dummy'], 'logo.png', { type: 'image/png' });
    Object.defineProperty(fileInput, 'files', { value: [file] });
    document.getElementById('settingsSave').click();
    const stored = localStorage.getItem('customLogo');
    expect(stored).toBeNull();
    const note = document.querySelector('#backupNotificationContainer div');
    expect(note).not.toBeNull();
    expect(note.textContent).toBe(texts.en.logoFormatError);
    const preview = document.getElementById('settingsLogoPreview');
    expect(preview.hasAttribute('hidden')).toBe(true);
    expect(preview.querySelector('img')).toBeNull();
    settingsBtn.click();
    expect(document.querySelector('#settingsLogoPreview img')).toBeNull();
    document.getElementById('settingsCancel').click();
  });

  test('accent color input updates body and root variables when pink mode off', () => {
    const { applyPinkMode } = script;
    applyPinkMode(false);
    const colorInput = document.getElementById('accentColorInput');
    colorInput.value = '#654321';
    colorInput.dispatchEvent(new Event('input'));
    expect(document.documentElement.style.getPropertyValue('--accent-color')).toBe('#654321');
    expect(document.documentElement.style.getPropertyValue('--link-color')).toBe('#654321');
    expect(document.body.style.getPropertyValue('--accent-color')).toBe('#654321');
    expect(document.body.style.getPropertyValue('--link-color')).toBe('#654321');
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
    projOut.innerHTML = '<h2>Proj</h2><h3>Project Requirements</h3><div class="requirements-grid"><div class="requirement-box"><span class="req-label">Codec</span><span class="req-value">ProRes</span></div></div>';
    projOut.classList.remove('hidden');
    const gearOut = document.getElementById('gearListOutput');
    gearOut.innerHTML = '<h2>Gear List: “Proj”</h2><table class="gear-table"><tr class="category-row"><td>Camera</td></tr><tr><td>CamA</td></tr><tr><td><select id="gearListDirectorMonitor"><option value="MonA">MonA</option></select></td></tr></table>';
    gearOut.classList.remove('hidden');

    generatePrintableOverview();
    const html = document.getElementById('overviewDialog').innerHTML;
    expect(html).toContain('<section id="projectRequirementsOutput"');
    expect(html).toContain('<div class="requirement-box"');
    expect(html).toContain('<section id="gearListOutput"');
    expect(html).toContain('<select id="gearListDirectorMonitor"');
  });

  test('print button triggers window.print', () => {
    const { generatePrintableOverview } = script;
    window.print = jest.fn();
    document.getElementById('setupName').value = 'Test';
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    script.updateCalculations();
    generatePrintableOverview();
    const btn = document.getElementById('printOverviewBtn');
    btn.click();
    expect(window.print).toHaveBeenCalled();
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
        people: [{ role: 'DoP', name: 'DopName', phone: '123' }],
        requiredScenarios: 'Handheld, Slider',
        filter: 'IRND'
      });
      expect(html).toContain('<h2>Proj</h2>');
      expect(html).toContain('<h3>Project Requirements</h3>');
      expect(html).toContain('<span class="req-label">Crew</span>');
      expect(html).toContain('<span class="req-value">DoP: DopName (123)</span>');
      expect(html).toContain('<span class="req-label">Required Scenarios</span>');
      expect(html).toContain('<span class="req-value">Handheld, Slider</span>');
      expect(html).not.toContain('Filter: IRND');
      expect(html).toContain('Matte box + filter');
      const dom = new JSDOM(html);
      const valsIRND = dom.window.document.getElementById('filter-values-IRND');
      expect(valsIRND).not.toBeNull();
      expect([...valsIRND.selectedOptions]).toHaveLength(0);
      expect(html).toContain('<table class="gear-table">');
      expect(html).toContain('Camera');
      expect(html).toContain(`1x ${cageCamera}`);
      expect(html).toContain('Camera Support');
      expect(html).toContain('<span class="cage-select-wrapper"><span>1x</span><select id="gearListCage"');
      expect(html).toContain(`<option value="${cageNames[0]}"`);
      expect(html).toContain('LDS (FIZ)');
      expect(html).toContain('1x LBUS to LBUS (1x MotorA ↔ ControllerA)');
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
        expect(msSection).toContain('2x Ultraslim BNC Cable 0.3 m (1x Focus, 1x Spare)');
        expect(msSection).toContain('2x D-Tap to Mini XLR 3-pin Cable 0,3m (1x Focus, 1x Spare)');
        expect(miscSection).not.toContain('Ultraslim BNC Cable 0.3 m (1x Focus, 1x Spare)');
        expect(miscSection).not.toContain('D-Tap to Mini XLR 3-pin Cable 0,3m (1x Focus, 1x Spare)');
      expect(html).not.toContain('HDMI Cable');
    });

  test('crew roles are ordered by department and include lighting and grip', () => {
    setupDom();
    require('../translations.js');
    const { crewRoles } = require('../script.js');
    expect(crewRoles).toEqual([
      'Producer',
      'Production Manager',
      'Director',
      'Assistant Director',
      'Production Assistant',
      'DoP',
      'Camera Operator',
      'B-Camera Operator',
      'Steadicam Operator',
      'Drone Operator',
      '1st AC',
      '2nd AC',
      'DIT',
      'Video Operator',
      'Key Gaffer',
      'Gaffer',
      'Best Boy Electric',
      'Electrician',
      'Rigging Gaffer',
      'Key Grip',
      'Best Boy Grip',
      'Grip',
      'Dolly Grip',
      'Rigging Grip'
    ]);
  });

  test('renders multiple crew members on separate lines in project requirements summary', () => {
    setupDom();
    require('../translations.js');
    const { generateGearListHtml } = require('../script.js');
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
      people: [
        { role: 'DoP', name: 'Alice', phone: '111', email: 'alice@example.com' },
        { role: 'AC', name: 'Bob', phone: '222' }
      ]
    });
    expect(html).toContain('<span class="req-value">DoP: Alice (111, alice@example.com)<br>AC: Bob (222)</span>');
  });

  test('custom filter selections override defaults', () => {
    setupDom(false);
    require('../translations.js');
    const { generateGearListHtml } = require('../script.js');
    const html = generateGearListHtml({ filter: 'IRND:6x6:0.6|1.8,BPM:4x4:1|1/16,Pol:95mm' });
    const dom = new JSDOM(html);
    const sizeIRND = dom.window.document.getElementById('filter-size-IRND');
    expect(sizeIRND.value).toBe('6x6');
    const valsIRND = [...dom.window.document.getElementById('filter-values-IRND').selectedOptions].map(o => o.value);
    expect(valsIRND).toEqual(expect.arrayContaining(['0.6', '1.8']));
    const sizeBPM = dom.window.document.getElementById('filter-size-BPM');
    expect(sizeBPM.value).toBe('4x4');
    const valsBPM = [...dom.window.document.getElementById('filter-values-BPM').selectedOptions].map(o => o.value);
    expect(valsBPM).toEqual(expect.arrayContaining(['1', '1/16']));
    const sizePol = dom.window.document.getElementById('filter-size-Pol');
    expect(sizePol.value).toBe('95mm');
  });

  test('clear filter uses default size', () => {
    setupDom(false);
    require('../translations.js');
    const { generateGearListHtml } = require('../script.js');
    const html = generateGearListHtml({ filter: 'Clear' });
    const dom = new JSDOM(html);
    const sizeSel = dom.window.document.getElementById('filter-size-Clear');
    expect(sizeSel.value).toBe(DEFAULT_FILTER_SIZE);
  });

  test('pol filter uses default size', () => {
    setupDom(false);
    require('../translations.js');
    const { generateGearListHtml } = require('../script.js');
    const html = generateGearListHtml({ filter: 'Pol' });
    const dom = new JSDOM(html);
    const sizeSel = dom.window.document.getElementById('filter-size-Pol');
    expect(sizeSel.value).toBe(DEFAULT_FILTER_SIZE);
  });

  test('default filter set has no strengths selected', () => {
    setupDom(false);
    require('../translations.js');
    const { generateGearListHtml } = require('../script.js');
    const html = generateGearListHtml({ filter: 'BPM' });
    const dom = new JSDOM(html);
    const valSel = dom.window.document.getElementById('filter-values-BPM');
    expect(valSel.multiple).toBe(true);
    const vals = [...valSel.selectedOptions].map(o => o.value);
    expect(vals).toHaveLength(0);
  });

  test('multiple filters render on separate lines', () => {
    setupDom(false);
    require('../translations.js');
    const { generateGearListHtml } = require('../script.js');
    const html = generateGearListHtml({ filter: 'IRND,Pol' });
    const dom = new JSDOM(html);
    const rows = [...dom.window.document.querySelectorAll('#gearListOutput table tr')];
    const idx = rows.findIndex(r => r.textContent.trim() === 'Matte box + filter');
    const filterRow = rows[idx + 1];
    const cellHtml = filterRow.querySelector('td').innerHTML;
    const parts = cellHtml.split('<br>');
    expect(parts.length).toBeGreaterThan(1);
    expect(parts[0]).toMatch(/class="gear-item filter-item"/);
    expect(parts[1]).toMatch(/class="gear-item filter-item"/);
  });

  test('filter size selector rendered with label', () => {
    setupDom(false);
    require('../translations.js');
    const { generateGearListHtml } = require('../script.js');
    const html = generateGearListHtml({ filter: 'IRND' });
    const dom = new JSDOM(html);
    const header = dom.window.document.querySelector('#gearListOutput .filter-item .filter-header');
    const label = header.querySelector('.filter-label');
    const sizeSel = header.querySelector('#filter-size-IRND');
    expect(label).not.toBeNull();
    expect(sizeSel).not.toBeNull();
  });

  test('filter checkbox toggles hidden select', () => {
    setupDom(false);
    require('../translations.js');
    const script = require('../script.js');
    const html = script.generateGearListHtml({ filter: 'IRND' });
    script.displayGearAndRequirements(html);
    script.ensureGearListActions();
    const cb = document.querySelector('.filter-values-container input[value="0.6"]');
    const sel = document.getElementById('filter-values-IRND');
    expect([...sel.selectedOptions].map(o => o.value)).not.toContain('0.6');
    cb.checked = true;
    cb.dispatchEvent(new Event('change', { bubbles: true }));
    expect([...sel.selectedOptions].map(o => o.value)).toContain('0.6');
  });

  test('diopter filter includes frame with no strengths selected by default', () => {
    setupDom(false);
    require('../translations.js');
    const { generateGearListHtml } = require('../script.js');
    const html = generateGearListHtml({ filter: 'Diopter' });
    const dom = new JSDOM(html);
    const frame = dom.window.document.querySelector('[data-gear-name="ARRI diopter frame"]');
    expect(frame).not.toBeNull();
    const valSel = dom.window.document.getElementById('filter-values-Diopter');
    expect(valSel.multiple).toBe(true);
    const vals = [...valSel.selectedOptions].map(o => o.value);
    expect(vals).toHaveLength(0);
  });

  test('collectProjectFormData builds filter token without strengths', () => {
    setupDom(false);
    require('../translations.js');
    const { collectProjectFormData } = require('../script.js');
    const filterSelect = document.getElementById('filter');
    const opt = [...filterSelect.options].find(o => o.value === 'BPM');
    opt.selected = true;
    filterSelect.dispatchEvent(new window.Event('change'));
    const info = collectProjectFormData();
    expect(info.filter).toBe(`BPM:${DEFAULT_FILTER_SIZE}`);
  });

  test('collectProjectFormData handles custom filter selections', () => {
    setupDom(false);
    require('../translations.js');
    const { collectProjectFormData, generateGearListHtml, displayGearAndRequirements } = require('../script.js');
    const filterSelect = document.getElementById('filter');
    const opt = [...filterSelect.options].find(o => o.value === 'IRND');
    opt.selected = true;
    filterSelect.dispatchEvent(new window.Event('change'));
    let info = collectProjectFormData();
    const html = generateGearListHtml(info);
    displayGearAndRequirements(html);
    const sizeSel = document.getElementById('filter-size-IRND');
    sizeSel.value = '6x6';
    const valSel = document.getElementById('filter-values-IRND');
    [...valSel.options].forEach(o => { o.selected = ['0.6','1.8'].includes(o.value); });
    info = collectProjectFormData();
    expect(info.filter).toBe('IRND:6x6:0.6|1.8');
  });

  test('filter strength selection persists without gear list', () => {
    setupDom(false);
    require('../translations.js');
    const { collectProjectFormData, generateGearListHtml, displayGearAndRequirements, saveCurrentSession } = require('../script.js');
    const filterSelect = document.getElementById('filter');
    const opt = [...filterSelect.options].find(o => o.value === 'IRND');
    opt.selected = true;
    filterSelect.dispatchEvent(new window.Event('change'));
    let info = collectProjectFormData();
    const html = generateGearListHtml(info);
    displayGearAndRequirements(html);
    const sizeSel = document.getElementById('filter-size-IRND');
    sizeSel.value = '6x6';
    const valSel = document.getElementById('filter-values-IRND');
    [...valSel.options].forEach(o => { o.selected = ['0.6','1.8'].includes(o.value); });
    saveCurrentSession();
    const gearOut = document.getElementById('gearListOutput');
    gearOut.innerHTML = '';
    gearOut.classList.add('hidden');
    info = collectProjectFormData();
    expect(info.filter).toBe('IRND:6x6:0.6|1.8');
  });

  test('filter config auto-saves to project info', () => {
    setupDom(false);
    require('../translations.js');
    const { collectProjectFormData, generateGearListHtml, displayGearAndRequirements, ensureGearListActions } = require('../script.js');
    const filterSelect = document.getElementById('filter');
    const opt = [...filterSelect.options].find(o => o.value === 'IRND');
    opt.selected = true;
    filterSelect.dispatchEvent(new window.Event('change'));
    let info = collectProjectFormData();
    const html = generateGearListHtml(info);
    displayGearAndRequirements(html);
    ensureGearListActions();
    const sizeSel = document.getElementById('filter-size-IRND');
    sizeSel.value = '6x6';
    sizeSel.dispatchEvent(new window.Event('change', { bubbles: true }));
    const valSel = document.getElementById('filter-values-IRND');
    [...valSel.options].forEach(o => { o.selected = ['0.6','1.8'].includes(o.value); });
    valSel.dispatchEvent(new window.Event('change', { bubbles: true }));
    const gearOut = document.getElementById('gearListOutput');
    gearOut.innerHTML = '';
    gearOut.classList.add('hidden');
    info = collectProjectFormData();
    expect(info.filter).toBe('IRND:6x6:0.6|1.8');
  });

  test('gear list restores filter checkboxes from project info', () => {
    setupDom(false);
    require('../translations.js');
    const { generateGearListHtml, displayGearAndRequirements, setCurrentProjectInfo } = require('../script.js');
    const info = { filter: 'IRND:6x6:0.6|1.8' };
    setCurrentProjectInfo(info);
    let html = generateGearListHtml(info);
    html = html.replace(/\schecked(="")?/g, '').replace(/\sselected(="")?/g, '');
    displayGearAndRequirements(html);
    const gearOut = document.getElementById('gearListOutput');
    const sizeSel = gearOut.querySelector('#filter-size-IRND');
    const cb06 = gearOut.querySelector('.filter-values-container input[value="0.6"]');
    const cb18 = gearOut.querySelector('.filter-values-container input[value="1.8"]');
    expect(sizeSel.value).toBe('6x6');
    expect(cb06.checked).toBe(true);
    expect(cb18.checked).toBe(true);
  });

  test('ND Grad filters force swing-away matte box', () => {
    setupDom(false);
    require('../translations.js');
    const { generateGearListHtml } = require('../script.js');
    const html = generateGearListHtml({ filter: 'ND Grad HE,ND Grad SE', mattebox: 'ARRI LMB 4x5 Clamp-On (3-Stage)' });
    const dom = new JSDOM(html);
    const sizeHE = dom.window.document.getElementById('filter-size-ND_Grad_HE');
    expect(sizeHE.value).toBe(DEFAULT_FILTER_SIZE);
    const valHE = [...dom.window.document.getElementById('filter-values-ND_Grad_HE').selectedOptions].map(o => o.value);
    expect(valHE).toEqual(expect.arrayContaining(['0.3 HE Horizontal']));
    const sizeSE = dom.window.document.getElementById('filter-size-ND_Grad_SE');
    expect(sizeSE.value).toBe(DEFAULT_FILTER_SIZE);
    const valSE = [...dom.window.document.getElementById('filter-values-ND_Grad_SE').selectedOptions].map(o => o.value);
    expect(valSE).toEqual(expect.arrayContaining(['0.3 SE Horizontal']));
    const section = html.slice(html.indexOf('Matte box + filter'), html.indexOf('LDS (FIZ)'));
    expect(section).toContain('ARRI LMB 4x5 Pro Set');
    expect(section).not.toContain('ARRI LMB 4x5 Clamp-On (3-Stage)');
  });

  test('collectProjectFormData captures multiple prep and shooting periods', () => {
    setupDom();
    require('../translations.js');
    const { collectProjectFormData, populateProjectForm } = require('../script.js');
    document.getElementById('addPrepBtn').click();
    const prepRows = document.querySelectorAll('#prepContainer .period-row');
    prepRows[0].querySelector('.prep-start').value = '2024-01-01';
    prepRows[0].querySelector('.prep-end').value = '2024-01-03';
    prepRows[1].querySelector('.prep-start').value = '2024-02-01';
    prepRows[1].querySelector('.prep-end').value = '2024-02-02';
    document.getElementById('addShootBtn').click();
    const shootRows = document.querySelectorAll('#shootContainer .period-row');
    shootRows[0].querySelector('.shoot-start').value = '2024-03-01';
    shootRows[0].querySelector('.shoot-end').value = '2024-03-05';
    shootRows[1].querySelector('.shoot-start').value = '2024-04-01';
    shootRows[1].querySelector('.shoot-end').value = '2024-04-04';
    const info = collectProjectFormData();
    expect(info.prepDays).toEqual(['2024-01-01 to 2024-01-03', '2024-02-01 to 2024-02-02']);
    expect(info.shootingDays).toEqual(['2024-03-01 to 2024-03-05', '2024-04-01 to 2024-04-04']);
    populateProjectForm(info);
    const repopPrepRows = document.querySelectorAll('#prepContainer .period-row');
    expect(repopPrepRows).toHaveLength(2);
    expect(repopPrepRows[1].querySelector('.prep-start').value).toBe('2024-02-01');
    const repopShootRows = document.querySelectorAll('#shootContainer .period-row');
    expect(repopShootRows).toHaveLength(2);
    expect(repopShootRows[1].querySelector('.shoot-end').value).toBe('2024-04-04');
  });

  test('Rota-Pol filter provides size dropdown', () => {
    setupDom(false);
    require('../translations.js');
    const { generateGearListHtml } = require('../script.js');
    const html = generateGearListHtml({ filter: 'Rota-Pol:6x6' });
    const dom = new JSDOM(html);
    const sel = dom.window.document.getElementById('filter-size-Rota_Pol');
    const opts = [...sel.options].map(o => o.value);
    expect(opts).toEqual(expect.arrayContaining([DEFAULT_FILTER_SIZE, '6x6', '95mm']));
  });

  test('standard rigging accessories are always included', () => {
    const { generateGearListHtml } = script;
    const html = generateGearListHtml({});
    const rigSection = html.slice(html.indexOf('Rigging'), html.indexOf('Power'));
    expect(rigSection).toContain('2x ULCS Bracket with 1/4" to 1/4"');
    expect(rigSection).toContain('2x ULCS Bracket with 3/8" to 1/4"');
    expect(rigSection).toContain('2x Noga Arm');
    expect(rigSection).toContain('2x Mini Magic Arm');
    expect(rigSection).toContain('4x Cine Quick Release');
    expect(rigSection).toContain('1x SmallRig - Super lightweight 15mm RailBlock');
    expect(rigSection).toContain('3x Spigot with male 3/8" and 1/4"');
    expect(rigSection).toContain('2x Clapper Stick');
    expect(rigSection).toContain('2x D-Tap Splitter');
  });

  test.each(['Trinity', 'Steadicam'])(
    '%s scenario adds D-Tap rigging accessories',
    (scenario) => {
      const { generateGearListHtml } = script;
      const html = generateGearListHtml({ requiredScenarios: scenario });
      const rigSection = html.slice(html.indexOf('Rigging'), html.indexOf('Power'));
      expect(rigSection).toContain('4x D-Tap Splitter');
      expect(rigSection).toContain('2x D-Tap Extension 50 cm (1x Steadicam/Trinity, 1x Spare)');
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

  test('gear list sorts items alphabetically within categories', () => {
    const { generateGearListHtml } = script;
    const html = generateGearListHtml({});
    const order = [
      'Power Cable 10 m',
      'Power Cable 5 m',
      'Power Cable Drum 25-50 m',
      'Power Strip',
      'Power Three Way Splitter',
      'PRCD-S'
    ];
    let lastIndex = -1;
    for (const item of order) {
      const idx = html.indexOf(item);
      expect(idx).toBeGreaterThan(-1);
      expect(idx).toBeGreaterThan(lastIndex);
      lastIndex = idx;
    }
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
      '2x Ultraslim BNC Cable 0.5 m (1x Onboard monitor, 1x Spare)'
    );
    const miscSection = html.slice(html.indexOf('Miscellaneous'), html.indexOf('Consumables'));
    expect(miscSection).not.toContain('D-Tap to Lemo-2-pin Cable 0,5m');
    expect(miscSection).not.toContain('Ultraslim BNC Cable 0.5 m');
  });

  test('onboard monitor adds ULCS arm to rigging', () => {
    const { generateGearListHtml } = script;
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    addOpt('monitorSelect', 'MonA');
    const html = generateGearListHtml();
    const rigSection = html.slice(html.indexOf('Rigging'), html.indexOf('Power'));
    expect(rigSection).toContain('1x ULCS Arm mit 3/8" und 1/4" double (1x Onboard monitor)');
  });

  test('Director 7" handheld monitor adds dropdown, batteries and grip items', () => {
    const { generateGearListHtml } = script;
    global.devices.monitors = {
      'SmallHD Ultra 7': { screenSizeInches: 7 },
      MonA: { screenSizeInches: 7 }
    };
    const html = generateGearListHtml({ videoDistribution: 'Director Monitor 7" handheld' });
    expect(html).toContain('<select id="gearListDirectorMonitor"');
    expect(html).toContain('SmallHD Ultra 7');
    const docDir = new DOMParser().parseFromString(html, 'text/html');
    expect(docDir.getElementById('gearListDirectorMonitor').value).toBe('SmallHD Ultra 7');
    expect(html).toContain('Directors cage, shoulder strap, sunhood, rigging for teradeks');
    expect(html).toContain('3x Bebob V98micro (3x Director handheld)');
    expect(html).toContain('Avenger C-Stand Sliding Leg 20" (1x Director handheld)');
    expect(html).toContain('Steelfingers Wheel C-Stand 3er Set (1x Director handheld)');
    expect(html).toContain('Lite-Tite Swivel Aluminium Umbrella Adapter (1x Director handheld)');
    const rigSection = html.slice(html.indexOf('Rigging'), html.indexOf('Power'));
    expect(rigSection).toContain('4x Spigot with male 3/8" and 1/4" (1x Director handheld, 3x Spare)');
    const gripSection = html.slice(html.indexOf('Grip'), html.indexOf('Carts and Transportation'));
    expect(gripSection).not.toContain('Spigot with male 3/8" and 1/4"');
    expect(html).toContain('2x Ultraslim BNC Cable 0.3 m (1x Director handheld, 1x Spare)');
    expect(html).toContain('2x D-Tap to Lemo-2-pin Cable 0,3m (1x Director handheld, 1x Spare)');
    const msSection = html.slice(html.indexOf('<td>Monitoring support</td>'), html.indexOf('Power'));
    expect(msSection).toContain('2x Ultraslim BNC Cable 0.3 m (1x Director handheld, 1x Spare)');
    expect(msSection).toContain('2x D-Tap to Lemo-2-pin Cable 0,3m (1x Director handheld, 1x Spare)');
    const miscSection = html.slice(html.indexOf('Miscellaneous'), html.indexOf('Consumables'));
    expect(miscSection).not.toContain('Ultraslim BNC Cable 0.3 m (1x Director handheld, 1x Spare)');
  expect(miscSection).not.toContain('D-Tap to Lemo-2-pin Cable 0,3m (1x Director handheld, 1x Spare)');
  });

  test('Director 7" handheld monitor adds dropdown, batteries and grip items', () => {
    const { generateGearListHtml } = script;
    global.devices.monitors = {
      'SmallHD Ultra 7': { screenSizeInches: 7 },
      MonA: { screenSizeInches: 5 }
    };
    const html = generateGearListHtml({ videoDistribution: 'Director Monitor 7" handheld' });
    expect(html).toContain('<select id="gearListDirectorMonitor"');
    expect(html).toContain('Directors cage, shoulder strap, sunhood, rigging for teradeks');
    expect(html).toContain('3x Bebob V98micro (3x Director handheld)');
    expect(html).toContain('Avenger C-Stand Sliding Leg 20" (1x Director handheld)');
    expect(html).toContain('Steelfingers Wheel C-Stand 3er Set (1x Director handheld)');
    expect(html).toContain('Lite-Tite Swivel Aluminium Umbrella Adapter (1x Director handheld)');
    const rigSection = html.slice(html.indexOf('Rigging'), html.indexOf('Power'));
    expect(rigSection).toContain('4x Spigot with male 3/8" and 1/4" (1x Director handheld, 3x Spare)');
  });

  test('Gaffer 7" handheld monitor adds dropdown, batteries and grip items', () => {
    const { generateGearListHtml } = script;
    global.devices.monitors = {
      'SmallHD Ultra 7': { screenSizeInches: 7 },
      MonA: { screenSizeInches: 7 }
    };
    const html = generateGearListHtml({ videoDistribution: 'Gaffer Monitor 7" handheld' });
    expect(html).toContain('<select id="gearListGafferMonitor"');
    expect(html).toContain('Gaffer Handheld Monitor');
    const docGaf = new DOMParser().parseFromString(html, 'text/html');
    expect(docGaf.getElementById('gearListGafferMonitor').value).toBe('SmallHD Ultra 7');
    expect(html).toContain('3x Bebob V98micro (3x Gaffer handheld)');
    expect(html).toContain('Avenger C-Stand Sliding Leg 20" (1x Gaffer handheld)');
    expect(html).toContain('Steelfingers Wheel C-Stand 3er Set (1x Gaffer handheld)');
    expect(html).toContain('Lite-Tite Swivel Aluminium Umbrella Adapter (1x Gaffer handheld)');
    const rigSection = html.slice(html.indexOf('Rigging'), html.indexOf('Power'));
    expect(rigSection).toContain('4x Spigot with male 3/8" and 1/4" (1x Gaffer handheld, 3x Spare)');
    const msSection = html.slice(html.indexOf('<td>Monitoring support</td>'), html.indexOf('Power'));
    expect(msSection).toContain('2x Ultraslim BNC Cable 0.3 m (1x Gaffer handheld, 1x Spare)');
    expect(msSection).toContain('2x D-Tap to Lemo-2-pin Cable 0,3m (1x Gaffer handheld, 1x Spare)');
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
    const docDop = new DOMParser().parseFromString(html, 'text/html');
    expect(docDop.getElementById('gearListDopMonitor').value).toBe('SmallHD Ultra 7');
    expect(html).toContain('3x Bebob V98micro (3x DoP handheld)');
    expect(html).toContain('Avenger C-Stand Sliding Leg 20" (1x DoP handheld)');
    expect(html).toContain('Steelfingers Wheel C-Stand 3er Set (1x DoP handheld)');
    expect(html).toContain('Lite-Tite Swivel Aluminium Umbrella Adapter (1x DoP handheld)');
    const rigSection = html.slice(html.indexOf('Rigging'), html.indexOf('Power'));
    expect(rigSection).toContain('4x Spigot with male 3/8" and 1/4" (1x DoP handheld, 3x Spare)');
    const msSection = html.slice(html.indexOf('<td>Monitoring support</td>'), html.indexOf('Power'));
    expect(msSection).toContain('2x Ultraslim BNC Cable 0.3 m (1x DoP handheld, 1x Spare)');
    expect(msSection).toContain('2x D-Tap to Lemo-2-pin Cable 0,3m (1x DoP handheld, 1x Spare)');
  });

  test('merges monitoring batteries across multiple handheld monitors', () => {
    setupDom();
    script = require('../script.js');
    const { generateGearListHtml } = script;
    const videoDistribution = [
      'Director Monitor handheld',
      'Gaffer Monitor handheld',
      'DoP Monitor handheld',
      'Director Monitor handheld'
    ].join(', ');
    const html = generateGearListHtml({ videoDistribution });
    expect(html).toContain('12x Bebob V98micro (6x Director handheld, 3x DoP handheld, 3x Gaffer handheld)');
    expect(html).not.toContain('3x Bebob V98micro');
  });

  test('Director 15-21" monitor adds dropdown and accessories', () => {
    const { generateGearListHtml } = script;
    global.devices.directorMonitors = {
      'SmallHD Cine 24" 4K High-Bright Monitor': { screenSizeInches: 24 },
      Other: { screenSizeInches: 17 }
    };
    const html = generateGearListHtml({ videoDistribution: 'Director Monitor 15-21"' });
    expect(html).toContain('<select id="gearListDirectorMonitor15"');
    expect(html).toContain('Director Monitor');
    expect(html).toContain('2x Bebob V290RM-Cine (2x Director 15-21")');
    const msSection = html.slice(html.indexOf('<td>Monitoring support</td>'), html.indexOf('Power'));
    expect(msSection).toContain('4x D-Tap to Lemo-2-pin Cable 0,5m (1x Onboard monitor, 1x Director 15-21", 2x Spare)');
    expect(msSection).toContain('4x Ultraslim BNC Cable 0.5 m (1x Onboard monitor, 1x Director 15-21", 2x Spare)');
    const rigSection = html.slice(html.indexOf('Rigging'), html.indexOf('Power'));
    expect(rigSection).toContain('D-Tap Splitter (1x Director 15-21"');
    const gripSection = html.slice(html.indexOf('Grip'), html.indexOf('Carts and Transportation'));
    expect(gripSection).toContain('Matthews Monitor Stand II (249562) (1x Director 15-21")');
    expect(gripSection).toContain('Avenger C590 Conka Bonka Stativ-Verlängerungen Set (1x Director 15-21")');
    expect(gripSection).toContain('Impact Baby to Junior Receiver Adapter (1x Director 15-21")');
    expect(gripSection).toContain(
      'Matthews BIG F\'ING Monitor Wheel Set (3 pieces) (1x Director 15-21")'
    );
  });

  test('Combo 15-21" monitor adds dropdown and accessories', () => {
    const { generateGearListHtml } = script;
    global.devices.directorMonitors = {
      'SmallHD Cine 24" 4K High-Bright Monitor': { screenSizeInches: 24 },
      Other: { screenSizeInches: 17 }
    };
    const html = generateGearListHtml({ videoDistribution: 'Combo Monitor 15-21"' });
    expect(html).toContain('<select id="gearListComboMonitor15"');
    expect(html).toContain('Combo Monitor');
    expect(html).toContain('2x Bebob V290RM-Cine (2x Combo 15-21")');
    const msSection = html.slice(html.indexOf('<td>Monitoring support</td>'), html.indexOf('Power'));
    expect(msSection).toContain('4x D-Tap to Lemo-2-pin Cable 0,5m (1x Onboard monitor, 1x Combo 15-21", 2x Spare)');
    const gripSection = html.slice(html.indexOf('Grip'), html.indexOf('Carts and Transportation'));
    expect(gripSection).toContain('Matthews Monitor Stand II (249562) (1x Combo 15-21")');
    expect(gripSection).toContain('Matthews BIG F\'ING Monitor Wheel Set (3 pieces) (1x Combo 15-21")');
  });

  test('DoP 15-21" monitor adds dropdown and accessories', () => {
    const { generateGearListHtml } = script;
    global.devices.directorMonitors = {
      'SmallHD Cine 24" 4K High-Bright Monitor': { screenSizeInches: 24 },
      Other: { screenSizeInches: 17 }
    };
    const html = generateGearListHtml({ videoDistribution: 'DoP Monitor 15-21"' });
    expect(html).toContain('<select id="gearListDopMonitor15"');
    expect(html).toContain('DoP Monitor');
    expect(html).toContain('2x Bebob V290RM-Cine (2x DoP 15-21")');
    const msSection = html.slice(html.indexOf('<td>Monitoring support</td>'), html.indexOf('Power'));
    expect(msSection).toContain('4x D-Tap to Lemo-2-pin Cable 0,5m (1x Onboard monitor, 1x DoP 15-21", 2x Spare)');
    const gripSection = html.slice(html.indexOf('Grip'), html.indexOf('Carts and Transportation'));
    expect(gripSection).toContain('Matthews Monitor Stand II (249562) (1x DoP 15-21")');
    expect(gripSection).toContain('Matthews BIG F\'ING Monitor Wheel Set (3 pieces) (1x DoP 15-21")');
  });

  test('multiple 15-21" monitors add Manfrotto clamps to grip', () => {
    const { generateGearListHtml } = script;
    const html = generateGearListHtml({
      videoDistribution: 'Director Monitor 15-21", Combo Monitor 15-21", DoP Monitor 15-21"'
    });
    const gripSection = html.slice(html.indexOf('Grip'), html.indexOf('Carts and Transportation'));
    expect(gripSection).toContain(
      '3x Manfrotto 635 Quick-Action Super Clamp (1x Director 15-21", 1x Combo 15-21", 1x DoP 15-21")'
    );
    expect(gripSection).toContain(
      '3x Matthews BIG F\'ING Monitor Wheel Set (3 pieces) (1x Director 15-21", 1x Combo 15-21", 1x DoP 15-21")'
    );
  });

  test('merges monitoring batteries across multiple 15-21" monitors', () => {
    const { generateGearListHtml } = script;
    const html = generateGearListHtml({
      videoDistribution:
        'Director Monitor 15-21", Director Monitor 15-21", Combo Monitor 15-21", DoP Monitor 15-21"'
    });
    expect(html).toContain(
      '8x Bebob V290RM-Cine (2x Combo 15-21", 4x Director 15-21", 2x DoP 15-21")'
    );
  });

  test('multiple handheld monitors merge grip items', () => {
    const { generateGearListHtml } = script;
    global.devices.monitors = { 'SmallHD Ultra 7': { screenSizeInches: 7 } };
    const html = generateGearListHtml({
      videoDistribution: 'Director Monitor 7" handheld, Gaffer Monitor 7" handheld, DoP Monitor 7" handheld'
    });
    const gripSection = html.slice(html.indexOf('Grip'), html.indexOf('Carts and Transportation'));
    expect(gripSection).toContain(
      '3x Avenger C-Stand Sliding Leg 20" (1x Director handheld, 1x Gaffer handheld, 1x DoP handheld)'
    );
    expect(gripSection).toContain(
      '3x Steelfingers Wheel C-Stand 3er Set (1x Director handheld, 1x Gaffer handheld, 1x DoP handheld)'
    );
    expect(gripSection).toContain(
      '3x Lite-Tite Swivel Aluminium Umbrella Adapter (1x Director handheld, 1x Gaffer handheld, 1x DoP handheld)'
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
        'Director Monitor 7" handheld, Gaffer Monitor 7" handheld, DoP Monitor 7" handheld'
    });
    expect(html).toContain('Wireless Receiver</strong> - 7&quot; - VidA RX (1x Director handheld, 1x Gaffer handheld, 1x DoP handheld, 1x Focus)');
    const msSection = html.slice(html.indexOf('<td>Monitoring support</td>'), html.indexOf('Power'));
    expect(msSection).toContain(
      '6x D-Tap to Lemo-2-pin Cable 0,3m (1x Director handheld, 1x Gaffer handheld, 1x DoP handheld, 3x Spare)'
    );
    expect(msSection).toContain(
      '8x Ultraslim BNC Cable 0.3 m (1x Director handheld, 1x Gaffer handheld, 1x DoP handheld, 1x Focus, 4x Spare)'
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
    const html = script.generateGearListHtml({ videoDistribution: 'Director Monitor 7" handheld' });
    const selectHtml = html.slice(
      html.indexOf('<select id="gearListDirectorMonitor"'),
      html.indexOf('</select>', html.indexOf('<select id="gearListDirectorMonitor"'))
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
    expect(html).toContain('<strong>Focus Monitor</strong> - <span id="monitorSizeFocus">7&quot;</span> - <select id="gearListFocusMonitor">');
    expect(html).toContain('incl Directors cage, shoulder strap, sunhood, rigging for teradeks');
    expect(html).toContain('3x Bebob V150micro (3x Focus)');
    const msSection = html.slice(html.indexOf('<td>Monitoring support</td>'), html.indexOf('Power'));
    expect(msSection).toContain('2x Ultraslim BNC Cable 0.3 m (1x Focus, 1x Spare)');
    expect(msSection).toContain('2x D-Tap to Mini XLR 3-pin Cable 0,3m (1x Focus, 1x Spare)');
      const miscSection = html.slice(html.indexOf('Miscellaneous'), html.indexOf('Consumables'));
      expect(miscSection).not.toContain('Ultraslim BNC Cable 0.3 m (1x Focus, 1x Spare)');
      expect(miscSection).not.toContain('D-Tap to Mini XLR 3-pin Cable 0,3m (1x Focus, 1x Spare)');
      expect(html).toContain('Wireless Receiver</strong> - 7&quot; - VidA RX (1x Focus)');
      expect(html).toContain('Avenger C-Stand Sliding Leg 20" (1x Focus)');
      expect(html).toContain('Steelfingers Wheel C-Stand 3er Set (1x Focus)');
      expect(html).toContain('Lite-Tite Swivel Aluminium Umbrella Adapter (1x Focus)');
      expect(html).toContain('3x Tennis ball');
    expect(msSection).toContain('2x Antenna 5,8GHz 5dBi Long (2x Spare)');
  });

  test('focus monitor selection saved to project info', () => {
    setupDom(false);
    require('../script.js');
    global.saveProject = jest.fn();
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
    document.getElementById('projectName').value = 'Proj';
    const form = document.getElementById('projectForm');
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    const sel = document.getElementById('gearListFocusMonitor');
    sel.value = 'MonA';
    sel.dispatchEvent(new Event('change', { bubbles: true }));
    const saved = global.saveProject.mock.calls.pop()[1];
    expect(saved.projectInfo.focusMonitor).toBe('MonA');
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

  test('cforce motors map to basic sets in gear list', () => {
    const { generateGearListHtml } = script;
    const sel = document.getElementById('motor1Select');
    sel.innerHTML = [
      '<option value="Arri cforce mini RF (KK.0040345)">Arri cforce mini RF (KK.0040345)</option>',
      '<option value="Arri Cforce Mini">Arri Cforce Mini</option>',
      '<option value="Arri Cforce Plus">Arri Cforce Plus</option>'
    ].join('');

    sel.value = 'Arri cforce mini RF (KK.0040345)';
    let html = generateGearListHtml();
    expect(html).toContain('1x ARRI KK.0040345 CFORCE MINI RF Basic Set 2');

    sel.value = 'Arri Cforce Mini';
    html = generateGearListHtml();
    expect(html).toContain('1x ARRI KK.0040344 Cforce Mini Basic Set 2');

    sel.value = 'Arri Cforce Plus';
    html = generateGearListHtml();
    expect(html).toContain('1x Arri KK.0008824 cforce plus Basic Set');
    expect(html).toContain('1x ARRI K2.0009335 Cforce Plus Gear M0.8/32p, 60t');
  });

  test('UDM-1 distance adds basic sets to gear list', () => {
    const { generateGearListHtml } = script;
    devices.fiz.distance['UDM-1 + LCube'] = { powerDrawWatts: 6 };
    const setSelect = (id, options) => {
      const sel = document.getElementById(id);
      sel.innerHTML = options;
    };
    setSelect('cameraSelect', '<option value="CamA">CamA</option>');
    const cameraSel = document.getElementById('cameraSelect');
    cameraSel.value = 'CamA';
    setSelect('controller1Select', '<option value="None">None</option>');
    const controllerSel = document.getElementById('controller1Select');
    controllerSel.value = 'None';
    setSelect('distanceSelect', [
      '<option value="None">None</option>',
      '<option value="UDM-1 + LCube">UDM-1 + LCube</option>'
    ].join(''));
    const distanceSel = document.getElementById('distanceSelect');
    distanceSel.value = 'UDM-1 + LCube';

    const html = generateGearListHtml();
    expect(html).toContain('1x Arri KK.0005853 Ultrasonic Distance Measure UDM-1 Basic Set');
    expect(html).toContain('1x Arri KK.0009001 LCUBE CUB-1 Basic Set');
  });

  test('UDM-1 distance omits LCube when RIA-1 is selected', () => {
    const { generateGearListHtml } = script;
    devices.fiz.distance['UDM-1 + LCube'] = { powerDrawWatts: 6 };
    devices.fiz.controllers['Arri RIA-1'] = { powerDrawWatts: 2 };
    const setSelect = (id, options) => {
      const sel = document.getElementById(id);
      sel.innerHTML = options;
    };
    setSelect('cameraSelect', '<option value="CamA">CamA</option>');
    const cameraSel = document.getElementById('cameraSelect');
    cameraSel.value = 'CamA';
    setSelect('controller1Select', '<option value="Arri RIA-1">Arri RIA-1</option>');
    const controllerSel = document.getElementById('controller1Select');
    controllerSel.value = 'Arri RIA-1';
    setSelect('distanceSelect', [
      '<option value="None">None</option>',
      '<option value="UDM-1 + LCube">UDM-1 + LCube</option>'
    ].join(''));
    const distanceSel = document.getElementById('distanceSelect');
    distanceSel.value = 'UDM-1 + LCube';

    const html = generateGearListHtml();
    expect(html).toContain('1x Arri KK.0005853 Ultrasonic Distance Measure UDM-1 Basic Set');
    expect(html).not.toContain('Arri KK.0009001 LCUBE CUB-1 Basic Set');
  });

  test('UDM-1 distance omits LCube when Alexa 35 is selected', () => {
    const { generateGearListHtml } = script;
    devices.fiz.distance['UDM-1 + LCube'] = { powerDrawWatts: 6 };
    devices.cameras['Arri Alexa 35'] = {
      powerDrawWatts: 10,
      power: { input: { type: 'LEMO 2-pin' } },
      videoOutputs: [{ type: '3G-SDI' }]
    };
    const setSelect = (id, options) => {
      const sel = document.getElementById(id);
      sel.innerHTML = options;
    };
    setSelect('cameraSelect', '<option value="Arri Alexa 35">Arri Alexa 35</option>');
    const cameraSel = document.getElementById('cameraSelect');
    cameraSel.value = 'Arri Alexa 35';
    setSelect('controller1Select', '<option value="None">None</option>');
    const controllerSel = document.getElementById('controller1Select');
    controllerSel.value = 'None';
    setSelect('distanceSelect', [
      '<option value="None">None</option>',
      '<option value="UDM-1 + LCube">UDM-1 + LCube</option>'
    ].join(''));
    const distanceSel = document.getElementById('distanceSelect');
    distanceSel.value = 'UDM-1 + LCube';

    const html = generateGearListHtml();
    expect(html).toContain('1x Arri KK.0005853 Ultrasonic Distance Measure UDM-1 Basic Set');
    expect(html).not.toContain('Arri KK.0009001 LCUBE CUB-1 Basic Set');
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
    const html = generateGearListHtml({ videoDistribution: 'Director Monitor 7" handheld' });
    expect(html).toContain('Wireless Receiver</strong> - 7&quot; - VidA RX (1x Director handheld, 1x Focus)');
    const msSection = html.slice(html.indexOf('Monitoring support'), html.indexOf('Power'));
    expect(msSection).toContain('3x Antenna 5,8GHz 5dBi Long (3x Spare)');
  });

  test('director handheld monitor selection persists after reload', () => {
    setupDom(false);
    const script = require('../script.js');
    const {
      generateGearListHtml,
      displayGearAndRequirements,
      getGearListSelectors,
      applyGearListSelectors,
      bindGearListDirectorMonitorListener,
    } = script;

    // add alternate monitor option
    devices.monitors.MonB = {
      powerDrawWatts: 5,
      screenSizeInches: 8,
      power: { input: { type: 'LEMO 2-pin' } },
      videoInputs: [{ type: '3G-SDI' }],
    };

    // initial render with default selection
    let html = generateGearListHtml({ videoDistribution: 'Director Monitor 7" handheld' });
    displayGearAndRequirements(html);
    bindGearListDirectorMonitorListener();

    const sel = document.getElementById('gearListDirectorMonitor');
    sel.value = 'MonB';
    sel.dispatchEvent(new Event('change', { bubbles: true }));

    const selectors = getGearListSelectors();

    // simulate reload by regenerating and reapplying selectors
    html = generateGearListHtml({ videoDistribution: 'Director Monitor 7" handheld' });
    displayGearAndRequirements(html);
    bindGearListDirectorMonitorListener();
    applyGearListSelectors(selectors);

    expect(document.getElementById('gearListDirectorMonitor').value).toBe('MonB');
    expect(document.getElementById('monitorSizeDirector').textContent).toBe('8"');
  });

  test('director large monitor selection persists after regenerating gear list', () => {
    setupDom(false);
    require('../translations.js');
    const script = require('../script.js');
    const {
      generateGearListHtml,
      displayGearAndRequirements,
      bindGearListDirectorMonitorListener,
      getCurrentProjectInfo,
    } = script;

    // provide large monitor options
    devices.directorMonitors = {
      'SmallHD Cine 24" 4K High-Bright Monitor': { screenSizeInches: 24 },
      MonB: { screenSizeInches: 17 },
    };

    // initial render with default selection
    let html = generateGearListHtml({ videoDistribution: 'Director Monitor 15-21"' });
    displayGearAndRequirements(html);
    bindGearListDirectorMonitorListener();

    const sel = document.getElementById('gearListDirectorMonitor15');
    const newVal = Array.from(sel.options).find(o => o.value !== sel.value).value;
    sel.value = newVal;
    sel.dispatchEvent(new Event('change', { bubbles: true }));

    expect(getCurrentProjectInfo().directorMonitor15).toBe(newVal);

    html = generateGearListHtml(getCurrentProjectInfo());
    const gear = document.getElementById('gearListOutput');
    gear.innerHTML = html;
    expect(gear.querySelector('#gearListDirectorMonitor15').value).toBe(newVal);
  });

  test('director large monitor selection persists after reload', () => {
    setupDom(false);
    require('../translations.js');
    global.saveSessionState = jest.fn();
    global.loadSessionState = jest.fn();
    global.saveProject = jest.fn();
    const script = require('../script.js');
    const {
      generateGearListHtml,
      displayGearAndRequirements,
      bindGearListDirectorMonitorListener,
      restoreSessionState,
    } = script;

    // provide large monitor options
    devices.directorMonitors = {
      'SmallHD Cine 24" 4K High-Bright Monitor': { screenSizeInches: 24 },
      MonB: { screenSizeInches: 17 },
    };

    let html = generateGearListHtml({ videoDistribution: 'Director Monitor 15-21"' });
    displayGearAndRequirements(html);
    bindGearListDirectorMonitorListener();

    const sel = document.getElementById('gearListDirectorMonitor15');
    sel.value = 'MonB';
    sel.dispatchEvent(new Event('change', { bubbles: true }));

    const state = global.saveSessionState.mock.calls.pop()[0];
    const savedProject = global.saveProject.mock.calls.pop()[1];
    global.loadSessionState.mockReturnValue(state);
    global.loadProject = jest.fn(() => savedProject);

    const out = document.getElementById('gearListOutput');
    out.innerHTML = '';
    out.classList.add('hidden');

    restoreSessionState();
    bindGearListDirectorMonitorListener();

    expect(document.getElementById('gearListDirectorMonitor15').value).toBe('MonB');
    expect(document.getElementById('monitorSizeDirector15').textContent).toBe('17"');
  });

  test('DoP large monitor selection persists after reload', () => {
    setupDom(false);
    require('../translations.js');
    global.saveSessionState = jest.fn();
    global.loadSessionState = jest.fn();
    global.saveProject = jest.fn();
    const script = require('../script.js');
    const {
      generateGearListHtml,
      displayGearAndRequirements,
      bindGearListDirectorMonitorListener,
      restoreSessionState,
    } = script;

    // provide large monitor options
    devices.directorMonitors = {
      'SmallHD Cine 24" 4K High-Bright Monitor': { screenSizeInches: 24 },
      MonB: { screenSizeInches: 17 },
    };

    let html = generateGearListHtml({ videoDistribution: 'DoP Monitor 15-21"' });
    displayGearAndRequirements(html);
    bindGearListDirectorMonitorListener();

    const sel = document.getElementById('gearListDopMonitor15');
    sel.value = 'MonB';
    sel.dispatchEvent(new Event('change', { bubbles: true }));

    const state = global.saveSessionState.mock.calls.pop()[0];
    const savedProject = global.saveProject.mock.calls.pop()[1];
    global.loadSessionState.mockReturnValue(state);
    global.loadProject = jest.fn(() => savedProject);

    const out = document.getElementById('gearListOutput');
    out.innerHTML = '';
    out.classList.add('hidden');

    restoreSessionState();
    bindGearListDirectorMonitorListener();

    expect(document.getElementById('gearListDopMonitor15').value).toBe('MonB');
    expect(document.getElementById('monitorSizeDop15').textContent).toBe('17"');
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

  test('gear list does not include hotswap plate by default', () => {
    const { generateGearListHtml } = script;
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('batterySelect', 'BattA');
    let html = generateGearListHtml();
    expect(html).not.toContain('Hotswap Plate');
    devices.batteries.BattB = { capacity: 100, pinA: 10, dtapA: 5, mount_type: 'B-Mount' };
    addOpt('batterySelect', 'BattB');
    html = generateGearListHtml();
    expect(html).not.toContain('Hotswap Plate');
  });

  test('gear list includes selected hotswap device', () => {
    const { generateGearListHtml } = script;
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('batterySelect', 'BattA');
    addOpt('batteryHotswapSelect', 'SwapHi');
    const html = generateGearListHtml();
    const battSection = html.slice(html.indexOf('Camera Batteries'), html.indexOf('Monitoring Batteries'));
    expect(battSection).toContain('1x SwapHi');
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

  test('Studio scenario adds Camera Power Supply to power section', () => {
    const { generateGearListHtml } = script;
    const html = generateGearListHtml({ requiredScenarios: 'Studio' });
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const powerIdx = rows.findIndex(r => r.textContent === 'Power');
    expect(powerIdx).toBeGreaterThanOrEqual(0);
    const itemsRow = rows[powerIdx + 1];
    expect(itemsRow.textContent).toContain('1x Camera Power Supply');
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

  test('each Required scenario has a unique icon', () => {
    const script = require('../script.js');
    const select = document.getElementById('requiredScenarios');
    const icons = new Set();
    Array.from(select.options).forEach(opt => {
      const icon = script.scenarioIcons[opt.value];
      expect(icon).toBeDefined();
      expect(icon).not.toBe('📌');
      expect(icons.has(icon)).toBe(false);
      icons.add(icon);
    });
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

  test('monitor options are available in video distribution', () => {
    const videoSel = document.getElementById('videoDistribution');
    const values = Array.from(videoSel.options).map(o => o.value);
    expect(values).toContain('Director Monitor 7" handheld');
    expect(values).toContain('Gaffer Monitor 7" handheld');
    expect(values).toContain('Director Monitor 15-21"');
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
    expect(itemsText).toContain('20x Ring Fitting for Airline Rails');
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
    expect(text).toContain('1x Paganini set');
    expect(text).toContain('2x Sand bag (2x Slider)');
    expect(text).toContain('3x Cable mat');
    expect(text).toContain('12x Tennis ball');
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

  test('Slider with Frog Tripod and Hi-Head counts sand bags per context', () => {
    const { generateGearListHtml } = script;
    const html = generateGearListHtml({ requiredScenarios: 'Slider', tripodTypes: 'Frog Tripod, Hi-Head' });
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const gripIdx = rows.findIndex(r => r.textContent === 'Grip');
    const text = rows[gripIdx + 1].textContent;
    expect(text).toContain('4x Sand bag (1x Frog Tripod, 1x Hi-Head, 2x Slider)');
  });

  test('Jib scenario adds EJib Arm, counter weights, and tripod legs', () => {
    const { generateGearListHtml } = script;
    const html = generateGearListHtml({ requiredScenarios: 'Jib' });
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const gripIdx = rows.findIndex(r => r.textContent === 'Grip');
    const text = rows[gripIdx + 1].textContent;
    expect(text).toContain('1x Pro Sup EJIb-Arm');
    expect(text).toContain('1x Jib counter weights');
    expect(text).toContain('1x Standard Tripod');
  });

  test('Tripod legs for Jib are not duplicated when Tripod selected', () => {
    const { generateGearListHtml } = script;
    const html = generateGearListHtml({
      requiredScenarios: 'Jib, Tripod',
      tripodTypes: 'Standard Tripod'
    });
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const gripIdx = rows.findIndex(r => r.textContent === 'Grip');
    const text = rows[gripIdx + 1].textContent;
    const matches = text.match(/Standard Tripod/g) || [];
    expect(matches.length).toBe(1);
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
    expect(text).toContain('2x Sand bag (1x Frog Tripod, 1x Hi-Head)');
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

  test('selected further stabilisation persists through session restore', () => {
    global.saveSessionState = jest.fn();
    global.loadSessionState = jest.fn();
    global.saveProject = jest.fn();
    const { generateGearListHtml, displayGearAndRequirements, ensureGearListActions, bindGearListEasyrigListener, restoreSessionState } = script;
    const html = generateGearListHtml({ requiredScenarios: 'Easyrig' });
    displayGearAndRequirements(html);
    ensureGearListActions();
    bindGearListEasyrigListener();
    const sel = document.querySelector('#gearListEasyrig');
    sel.value = 'FlowCine Serene Spring Arm';
    sel.dispatchEvent(new Event('change'));
    // capture stored state
    const state = global.saveSessionState.mock.calls.pop()[0];
    expect(state.easyrig).toBe('FlowCine Serene Spring Arm');
    const savedHtml = html; // original HTML without updated selection
    // Simulate reload using captured state and stale gear list
    global.loadSessionState.mockReturnValue(state);
    global.loadProject = jest.fn(() => ({ gearList: savedHtml }));
    document.getElementById('gearListOutput').innerHTML = '';
    restoreSessionState();
    expect(document.querySelector('#gearListEasyrig').value).toBe('FlowCine Serene Spring Arm');
  });

  test('Easyrig selection restored when generating gear list after session reload without saved list', () => {
    global.saveSessionState = jest.fn();
    global.loadSessionState = jest.fn();
    global.saveProject = jest.fn();
    const { generateGearListHtml, displayGearAndRequirements, ensureGearListActions, bindGearListEasyrigListener, restoreSessionState } = script;
    const html = generateGearListHtml({ requiredScenarios: 'Easyrig' });
    displayGearAndRequirements(html);
    ensureGearListActions();
    bindGearListEasyrigListener();
    const sel = document.querySelector('#gearListEasyrig');
    sel.value = 'FlowCine Serene Spring Arm';
    sel.dispatchEvent(new Event('change'));
    const state = global.saveSessionState.mock.calls.pop()[0];
    expect(state.easyrig).toBe('FlowCine Serene Spring Arm');
    global.loadSessionState.mockReturnValue(state);
    global.loadProject = jest.fn(() => null);
    document.getElementById('gearListOutput').innerHTML = '';
    restoreSessionState();
    expect(document.querySelector('#gearListEasyrig')).toBeNull();
    const html2 = generateGearListHtml({ requiredScenarios: 'Easyrig' });
    displayGearAndRequirements(html2);
    bindGearListEasyrigListener();
    expect(document.querySelector('#gearListEasyrig').value).toBe('FlowCine Serene Spring Arm');
  });

  test('selected further stabilisation is stored in project requirements', () => {
    global.saveProject = jest.fn();
    const { generateGearListHtml, displayGearAndRequirements, ensureGearListActions, bindGearListEasyrigListener } = script;
    const html = generateGearListHtml({ requiredScenarios: 'Easyrig' });
    displayGearAndRequirements(html);
    ensureGearListActions();
    bindGearListEasyrigListener();
    const sel = document.querySelector('#gearListEasyrig');
    sel.value = 'Easyrig - STABIL G3';
    sel.dispatchEvent(new Event('change'));
    const proj = global.saveProject.mock.calls.pop()[1];
    expect(proj.projectInfo.easyrig).toBe('Easyrig - STABIL G3');
  });

  test('further stabilisation is hidden from project requirements summary', () => {
    setupDom();
    require('../translations.js');
    const { generateGearListHtml, displayGearAndRequirements } = require('../script.js');
    const html = generateGearListHtml({ requiredScenarios: 'Easyrig', easyrig: 'FlowCine Serene Spring Arm' });
    displayGearAndRequirements(html);
    const projOut = document.getElementById('projectRequirementsOutput');
    expect(projOut.querySelector('[data-field="easyrig"]')).toBeNull();
  });

  test('viewfinder eye leather color hidden from project requirements summary', () => {
    setupDom();
    require('../translations.js');
    const { generateGearListHtml, displayGearAndRequirements } = require('../script.js');
    const html = generateGearListHtml({ viewfinderEyeLeatherColor: 'Red' });
    displayGearAndRequirements(html);
    const projOut = document.getElementById('projectRequirementsOutput');
    expect(projOut.querySelector('[data-field="viewfinderEyeLeatherColor"]')).toBeNull();
  });

  test('monitor and gaff tape fields hidden from project requirements summary', () => {
    setupDom();
    require('../translations.js');
    const { generateGearListHtml, displayGearAndRequirements } = require('../script.js');
    const html = generateGearListHtml({
      directorMonitor: 'SmallHD Ultra 7',
      dopMonitor: 'SmallHD Ultra 7',
      gafferMonitor: 'SmallHD Ultra 7',
      directorMonitor15: 'SmallHD Cine 24',
      comboMonitor15: 'SmallHD Cine 24',
      dopMonitor15: 'SmallHD Cine 24',
      proGaffColor1: 'red',
      proGaffWidth1: '24mm',
      proGaffColor2: 'blue',
      proGaffWidth2: '24mm'
    });
    displayGearAndRequirements(html);
    const projOut = document.getElementById('projectRequirementsOutput');
    [
      'directorMonitor',
      'dopMonitor',
      'gafferMonitor',
      'directorMonitor15',
      'comboMonitor15',
      'dopMonitor15',
      'proGaffColor1',
      'proGaffWidth1',
      'proGaffColor2',
      'proGaffWidth2'
    ].forEach(field => {
      expect(projOut.querySelector(`[data-field="${field}"]`)).toBeNull();
    });
  });

  test('gear list remains visible after session reload with only setup name', () => {
    global.saveSessionState = jest.fn();
    global.loadSessionState = jest.fn();
    global.saveProject = jest.fn();
    const { generateGearListHtml, displayGearAndRequirements, ensureGearListActions, saveCurrentSession, restoreSessionState } = script;
    const html = generateGearListHtml({ requiredScenarios: 'Easyrig' });
    displayGearAndRequirements(html);
    ensureGearListActions();
    const nameInput = document.getElementById('setupName');
    nameInput.value = 'Proj1';
    nameInput.dispatchEvent(new Event('input'));
    saveCurrentSession();
    const state = global.saveSessionState.mock.calls.pop()[0];
    global.loadSessionState.mockReturnValue(state);
    global.loadProject = jest.fn(name => (name === 'Proj1' ? { gearList: html } : null));
    const out = document.getElementById('gearListOutput');
    out.innerHTML = '';
    out.classList.add('hidden');
    restoreSessionState();
    expect(global.loadProject).toHaveBeenCalledWith('Proj1');
    expect(out.classList.contains('hidden')).toBe(false);
  });

  test('generate gear list button stays hidden after restoring saved list', () => {
    global.saveSessionState = jest.fn();
    global.loadSessionState = jest.fn();
    global.saveProject = jest.fn();
    const { generateGearListHtml, displayGearAndRequirements, ensureGearListActions, saveCurrentSession, restoreSessionState } = script;
    const html = generateGearListHtml({ requiredScenarios: 'Easyrig' });
    displayGearAndRequirements(html);
    ensureGearListActions();
    const nameInput = document.getElementById('setupName');
    nameInput.value = 'Proj1';
    nameInput.dispatchEvent(new Event('input'));
    saveCurrentSession();
    const state = global.saveSessionState.mock.calls.pop()[0];
    global.loadSessionState.mockReturnValue(state);
    global.loadProject = jest.fn(name => (name === 'Proj1' ? { gearList: html } : null));
    const out = document.getElementById('gearListOutput');
    out.innerHTML = '';
    out.classList.add('hidden');
    const btn = document.getElementById('generateGearListBtn');
    btn.classList.remove('hidden');
    restoreSessionState();
    expect(out.classList.contains('hidden')).toBe(false);
    expect(btn.classList.contains('hidden')).toBe(true);
  });

  test('gear list auto-saves session state for reloads', () => {
    global.saveSessionState = jest.fn();
    global.loadSessionState = jest.fn();
    const { generateGearListHtml, displayGearAndRequirements, ensureGearListActions, refreshGearListIfVisible, restoreSessionState } = script;
    const html = generateGearListHtml({ requiredScenarios: 'Easyrig' });
    displayGearAndRequirements(html);
    ensureGearListActions();
    const sel = document.getElementById('setupSelect');
    sel.innerHTML = '<option value="">New</option><option value="Proj1">Proj1</option>';
    sel.value = 'Proj1';
    refreshGearListIfVisible();
    const state = global.saveSessionState.mock.calls.pop()[0];
    global.loadSessionState.mockReturnValue(state);
    global.loadProject = jest.fn(name => (name === 'Proj1' ? { gearList: html } : null));
    const out = document.getElementById('gearListOutput');
    out.innerHTML = '';
    out.classList.add('hidden');
    restoreSessionState();
    expect(global.loadProject).toHaveBeenCalledWith('Proj1');
    expect(out.classList.contains('hidden')).toBe(false);
  });

  test('stored project without session state restores gear list visibility', () => {
    setupDom(false);
    global.saveSessionState = jest.fn();
    global.loadSessionState = jest.fn(() => null);
    global.saveProject = jest.fn();
    global.loadProject = jest.fn(() => null);
    require('../translations.js');
    const { restoreSessionState } = require('../script.js');
    const storedHtml = '<h2>Gear List</h2><h3>Project Requirements</h3><div class="requirements-grid"></div><h3>Gear List</h3><table class="gear-table"><tr><td>Item</td></tr></table>';
    global.loadProject.mockReturnValue({ gearList: storedHtml });
    const out = document.getElementById('gearListOutput');
    out.innerHTML = '';
    out.classList.add('hidden');
    restoreSessionState();
    expect(out.classList.contains('hidden')).toBe(false);
  });

  test('projects without gear list keep section hidden on restore', () => {
    setupDom(false);
    global.saveSessionState = jest.fn();
    global.loadSessionState = jest.fn(() => null);
    global.saveProject = jest.fn();
    const stored = { projectInfo: { projectName: 'Proj1' }, gearList: '' };
    global.loadProject = jest.fn(() => stored);
    require('../translations.js');
    const { restoreSessionState } = require('../script.js');
    const out = document.getElementById('gearListOutput');
    out.innerHTML = '';
    out.classList.remove('hidden');
    restoreSessionState();
    expect(out.classList.contains('hidden')).toBe(true);
  });

  test('tripod bowl selection persists through session restore when project store lacks it', () => {
    setupDom(false);
    global.saveSessionState = jest.fn();
    global.loadSessionState = jest.fn(() => ({
      setupName: 'Proj1',
      projectInfo: { requiredScenarios: 'Tripod', tripodBowl: '100mm bowl' }
    }));
    global.loadProject = jest.fn(() => ({ gearList: '', projectInfo: { tripodBowl: '' } }));
    require('../translations.js');
    require('../script.js');
    const bowlSel = document.getElementById('tripodBowl');
    expect(bowlSel.value).toBe('100mm bowl');
  });

  test('slider bowl selection persists through project reload when session state is absent', () => {
    setupDom(false);
    global.saveSessionState = jest.fn();
    global.loadSessionState = jest.fn(() => null);
    const sliderHtml = `
      <h2>Gear List</h2>
      <h3>Project Requirements</h3>
      <div class="requirements-grid"></div>
      <h3>Gear List</h3>
      <table class="gear-table">
        <tr><td><span class="gear-item">1x Prosup Tango Roller <select id="gearListSliderBowl">
          <option value=""></option>
          <option value="75er bowl" selected>75er bowl</option>
          <option value="100er bowl">100er bowl</option>
          <option value="150er bowl">150er bowl</option>
          <option value="Mitchell Mount">Mitchell Mount</option>
        </select></span></td></tr>
      </table>`;
    global.loadProject = jest.fn(() => ({ gearList: sliderHtml }));
    require('../translations.js');
    require('../script.js');
    const sel = document.getElementById('gearListSliderBowl');
    expect(sel.value).toBe('75er bowl');
  });

  test('loading a different project replaces gear list and requirements', () => {
    setupDom(false);
    const buildHtml = (name) => `\
<h2>Gear List</h2>
<h3>Project Requirements</h3>
<div class="requirements-grid"><div class="requirement-box"><span class="req-label">Project Name</span><span class="req-value">${name}</span></div></div>
<h3>Gear List</h3>
<table class="gear-table"><tr><td>${name} item</td></tr></table>`;
    global.loadSetups.mockReturnValue({
      Proj1: { gearList: buildHtml('Proj1'), projectInfo: { projectName: 'Proj1' } },
      Proj2: { gearList: buildHtml('Proj2'), projectInfo: { projectName: 'Proj2' } }
    });
    global.loadProject = jest.fn(() => null);
    global.saveProject = jest.fn();
    global.deleteProject = jest.fn();
    require('../script.js');
    const setupSelect = document.getElementById('setupSelect');
    setupSelect.value = 'Proj1';
    setupSelect.dispatchEvent(new Event('change'));
    const gearOut = document.getElementById('gearListOutput');
    const reqOut = document.getElementById('projectRequirementsOutput');
    expect(gearOut.innerHTML).toContain('Proj1 item');
    expect(reqOut.innerHTML).toContain('Proj1');
    expect(document.querySelector('[name="projectName"]').value).toBe('Proj1');
    setupSelect.value = 'Proj2';
    setupSelect.dispatchEvent(new Event('change'));
    expect(gearOut.innerHTML).toContain('Proj2 item');
    expect(gearOut.innerHTML).not.toContain('Proj1 item');
    expect(reqOut.innerHTML).toContain('Proj2');
    expect(reqOut.innerHTML).not.toContain('Proj1');
  expect(document.querySelector('[name="projectName"]').value).toBe('Proj2');
  });

  test('switching projects preserves stored data and clears form for new project', () => {
    setupDom(false);
    const projectData = {
      Proj1: '<h2>Proj1</h2><h3>Gear List</h3><table class="gear-table"><tr><td>P1</td></tr></table>',
      Proj2: '<h2>Proj2</h2><h3>Gear List</h3><table class="gear-table"><tr><td>P2</td></tr></table>'
    };
    const storedSetups = {
      Proj1: { gearList: projectData.Proj1, projectInfo: { projectName: 'Proj1' }, motors: [], controllers: [] },
      Proj2: { gearList: projectData.Proj2, projectInfo: { projectName: 'Proj2' }, motors: [], controllers: [] },
      Proj3: { motors: [], controllers: [] }
    };
    global.loadSetups = jest.fn(() => storedSetups);
    global.loadProject = jest.fn();
    global.saveProject = jest.fn();
    require('../translations.js');
    require('../script.js');
    const setupSelect = document.getElementById('setupSelect');
    const gearOut = document.getElementById('gearListOutput');
    const projNameInput = document.getElementById('projectName');

    setupSelect.value = 'Proj1';
    setupSelect.dispatchEvent(new Event('change'));
    expect(gearOut.classList.contains('hidden')).toBe(false);
    expect(projNameInput.value).toBe('Proj1');

    setupSelect.value = 'Proj2';
    setupSelect.dispatchEvent(new Event('change'));
    expect(global.saveProject).toHaveBeenCalledWith('Proj1', expect.objectContaining({
      projectInfo: { projectName: 'Proj1' }
    }));
    expect(gearOut.classList.contains('hidden')).toBe(false);
    expect(projNameInput.value).toBe('Proj2');

    setupSelect.value = '';
    setupSelect.dispatchEvent(new Event('change'));
    expect(global.saveProject).toHaveBeenCalledWith('Proj2', expect.objectContaining({
      projectInfo: { projectName: 'Proj2' }
    }));
    expect(gearOut.innerHTML).toBe('');
    expect(gearOut.classList.contains('hidden')).toBe(true);
    expect(projNameInput.value).toBe('');

    setupSelect.value = 'Proj1';
    setupSelect.dispatchEvent(new Event('change'));
    expect(gearOut.classList.contains('hidden')).toBe(false);
    expect(projNameInput.value).toBe('Proj1');
  });

  test('reloading restores selected project gear list and requirements', () => {
    setupDom(false);
    const html = '<h2>Proj1</h2><h3>Gear List</h3><table class="gear-table"><tr><td>P1</td></tr></table>';
    global.loadSetups = jest.fn(() => ({ Proj1: { gearList: html, projectInfo: { projectName: 'Proj1' }, motors: [], controllers: [] } }));
    global.loadProject = jest.fn(() => ({ gearList: html, projectInfo: { projectName: 'Proj1' } }));
    global.saveProject = jest.fn();
    global.loadSessionState = jest.fn(() => ({ setupSelect: 'Proj1' }));
    global.saveSessionState = jest.fn();
    require('../translations.js');
    require('../script.js');
    const gearOut = document.getElementById('gearListOutput');
    const projNameInput = document.getElementById('projectName');
    expect(gearOut.classList.contains('hidden')).toBe(false);
    expect(projNameInput.value).toBe('Proj1');
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
      expect(text).toContain('1x Avenger D200B Grip Head');
      expect(text).toContain('1x Spigot with male 3/8" and 1/4"');
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
    expect(miscText).toContain('Rain Cover CamA');
    expect(miscText).toContain('1x Umbrella for Focus Monitor');
    expect(miscText).toContain('1x Umbrella Magliner incl Mounting to Magliner');
      expect(rigText).toContain('4x Spigot with male 3/8" and 1/4" (1x Focus Umbrella, 3x Spare)');
      expect(gripText).not.toContain('Large Umbrella');
      expect(gripText).not.toContain('Avenger A5036CS Roller 36 Low Base with Umbrella Mounting');
      expect(miscText).not.toContain('Manfrotto 635 Quick-Action Super Clamp');
      expect(miscText).not.toContain('Spigot with male 3/8" and 1/4"');
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
    expect(miscText).toContain('Rain Cover CamA');
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
    const camSel = document.getElementById('cameraSelect');
    camSel.innerHTML = '<option value="CamA">CamA</option>';
    camSel.value = 'CamA';
    devices.cameras.CamA.viewfinder = ['VF'];
    const html = generateGearListHtml({ shootingDays: '2024-05-01 to 2024-05-05' });
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
    const consumIdx = rows.findIndex(r => r.textContent === 'Consumables');
    const consumRow = rows[consumIdx + 1];
    const consumText = consumRow.textContent;
    expect(consumText).toContain('1x Kimtech Wipes');
    expect(consumText).toContain('1x Sprigs Red 1/4"');
    const gaff1Color = consumRow.querySelector('#gearListProGaffColor1');
    const gaff1Width = consumRow.querySelector('#gearListProGaffWidth1');
    const gaff2Color = consumRow.querySelector('#gearListProGaffColor2');
    const gaff2Width = consumRow.querySelector('#gearListProGaffWidth2');
    expect(gaff1Color).not.toBeNull();
    expect(gaff1Width).not.toBeNull();
    expect(gaff2Color).not.toBeNull();
    expect(gaff2Width).not.toBeNull();
    expect(gaff1Color.value).toBe('red');
    expect(gaff1Width.value).toBe('24mm');
    expect(gaff2Color.value).toBe('blue');
    expect(gaff2Width.value).toBe('24mm');
    expect(gaff1Color.parentElement.textContent).toContain('1x Pro Gaff Tape');
    expect(gaff2Color.parentElement.textContent).toContain('1x Pro Gaff Tape');
    const eyeSel = consumRow.querySelector('#gearListEyeLeatherColor');
    expect(eyeSel).not.toBeNull();
    expect(eyeSel.value).toBe('red');
    expect(eyeSel.parentElement.textContent).toContain('2x Bluestar eye leather made of microfiber oval, large');
    expect(consumText).toContain('2x Clapper Stick');
  });

  test('consumables scale with shooting days and special rules', () => {
    const { generateGearListHtml } = script;
    const camSel = document.getElementById('cameraSelect');
    camSel.innerHTML = '<option value="CamA">CamA</option>';
    camSel.value = 'CamA';
    devices.cameras.CamA.viewfinder = ['VF'];
    const scenarios = [
      ['2024-05-01 to 2024-05-10', '2x Kimtech Wipes', '4x Clapper Stick', 4],
      ['2024-05-01 to 2024-05-16', '3x Kimtech Wipes', '4x Clapper Stick', 6],
      ['2024-05-01 to 2024-05-22', '4x Kimtech Wipes', '8x Clapper Stick', 8]
    ];
    scenarios.forEach(([range, wipes, clapper, eyeCount]) => {
      const html = generateGearListHtml({ shootingDays: range });
      const wrap = document.createElement('div');
      wrap.innerHTML = html;
      const rows = Array.from(wrap.querySelectorAll('.gear-table tr'));
      const consumIdx = rows.findIndex(r => r.textContent === 'Consumables');
      const consumRow = rows[consumIdx + 1];
      const consumText = consumRow.textContent;
      expect(consumText).toContain(wipes);
      expect(consumText).toContain('1x Sprigs Red 1/4"');
      expect(consumText).toContain(clapper);
      const eyeSel = consumRow.querySelector('#gearListEyeLeatherColor');
      expect(eyeSel.value).toBe('red');
      expect(eyeSel.parentElement.textContent).toContain(`${eyeCount}x Bluestar eye leather made of microfiber oval, large`);
    });
  });

  test('eye leather excluded when camera has no viewfinder', () => {
    const { generateGearListHtml } = script;
    const camSel = document.getElementById('cameraSelect');
    camSel.innerHTML = '<option value="CamA">CamA</option>';
    camSel.value = 'CamA';
    delete devices.cameras.CamA.viewfinder;
    const html = generateGearListHtml({});
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    expect(wrap.querySelector('#gearListEyeLeatherColor')).toBeNull();
  });

  test('camera handle and viewfinder extension excluded from project requirements', () => {
    const { generateGearListHtml } = script;
    const html = generateGearListHtml({
      cameraHandle: 'Hand Grips, L-Handle',
      viewfinderExtension: 'ARRI VEB-3 Viewfinder Extension Bracket',
      mattebox: 'Rod based',
      viewfinderSettings: 'Viewfinder Clean Feed, Surround View',
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

  test('monitoring configuration defaults based on camera and monitor', () => {
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
    monitorSel.value = 'MonA';
    configSel.value = 'Onboard Only';
    updateMonitoringConfigurationOptions();
    expect(configSel.value).toBe('Viewfinder and Onboard');

    camSel.value = 'NoVF';
    configSel.value = 'Viewfinder and Onboard';
    updateMonitoringConfigurationOptions();
    expect(configSel.value).toBe('Onboard Only');
  });

  test('default monitoring configuration omitted from project requirements', () => {
    const { generateGearListHtml } = script;
    const defaultHtml = generateGearListHtml({ monitoringConfiguration: 'Viewfinder and Onboard' });
    expect(defaultHtml).not.toContain('<span class="req-label">Monitoring configuration</span>');
    expect(defaultHtml).not.toContain('<span class="req-value">Viewfinder and Onboard</span>');

    const customHtml = generateGearListHtml({ monitoringConfiguration: 'Onboard Only' });
    expect(customHtml).not.toContain('<span class="req-label">Monitoring configuration</span>');
    expect(customHtml).not.toContain('<span class="req-value">Onboard Only</span>');
  });

  test('iOS video option is not included in project requirements', () => {
    const { generateGearListHtml } = script;
    const html = generateGearListHtml({ videoDistribution: 'IOS Video' });
    expect(html).not.toContain('<span class="req-label">Monitoring</span>');
    expect(html).not.toContain('<span class="req-value">IOS Video</span>');
    expect(html).not.toContain('<span class="req-label">Monitoring support</span><span class="req-value">IOS Video</span>');
  });

  test('filter selection is not included in project requirements', () => {
    const { generateGearListHtml } = script;
    const html = generateGearListHtml({ filter: 'IRND:6x6:0.6|1.8' });
    expect(html).not.toContain('<span class="req-label">Filter</span>');
    expect(html).not.toContain('<span class="req-value">IRND (6x6): 0.6, 1.8</span>');
  });

  test('project requirements form includes handheld monitor 7" options', () => {
    setupDom(true);
    const sel = document.getElementById('videoDistribution');
    const values = Array.from(sel.options).map(o => o.value);
    expect(values).toContain('Director Monitor 7" handheld');
    expect(values).toContain('Gaffer Monitor 7" handheld');
    expect(values).toContain('DoP Monitor 7" handheld');
    expect(values).not.toContain('Director Monitor 5" handheld');
    expect(values).not.toContain('Gaffer Monitor 5" handheld');
    expect(values).not.toContain('DoP Monitor 5" handheld');
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
    global.saveProject = jest.fn();
    const gear = document.getElementById('gearListOutput');
    gear.innerHTML = '<table></table>';
    gear.classList.remove('hidden');
    const nameInput = document.getElementById('setupName');
    nameInput.value = 'WithGear';
    nameInput.dispatchEvent(new Event('input', { bubbles: true }));
    document.getElementById('saveSetupBtn').click();
    expect(global.saveProject).toHaveBeenCalled();
  });

  test('Save button activates and Enter key saves setup', () => {
    const saveSpy = global.saveSetups;
    const nameInput = document.getElementById('setupName');
    const saveBtn = document.getElementById('saveSetupBtn');
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
    const alertSpy = window.alert;

    alertSpy.mockClear();
    confirmSpy.mockReturnValueOnce(false);
    deleteBtn.click();
    expect(confirmSpy).toHaveBeenCalledTimes(1);
    expect(global.saveSetups).not.toHaveBeenCalled();
    expect(alertSpy).not.toHaveBeenCalled();

    global.saveSetups.mockClear();
    confirmSpy.mockReset();
    alertSpy.mockClear();
    confirmSpy.mockReturnValueOnce(true).mockReturnValueOnce(true);
    deleteBtn.click();
    expect(confirmSpy).toHaveBeenCalledTimes(2);
    expect(global.saveSetups).toHaveBeenCalledWith({});
    expect(alertSpy).toHaveBeenCalledWith(texts.en.alertSetupDeleted.replace('{name}', 'Existing'));

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

    document.body.innerHTML = getHtmlBody();

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

    document.body.innerHTML = getHtmlBody();

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

    document.body.innerHTML = getHtmlBody();

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

    document.body.innerHTML = getHtmlBody();

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

    document.body.innerHTML = getHtmlBody();

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
      powerSource: 'Internal Battery'
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
    expect(gridBtn.getAttribute('aria-pressed')).toBe('false');
    gridBtn.click();

    const area = document.getElementById('diagramArea');
    expect(gridBtn.classList.contains('active')).toBe(true);
    expect(gridBtn.getAttribute('aria-pressed')).toBe('true');
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

  test('desktop zoom is limited to max scale', () => {
    Object.defineProperty(navigator, 'maxTouchPoints', { value: 0, configurable: true });
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    addOpt('batterySelect', 'BattA');

    script.renderSetupDiagram();

    const zoomBtn = document.getElementById('zoomIn');
    const svg = document.querySelector('#diagramArea svg');

    for (let i = 0; i < 20; i++) {
      zoomBtn.click();
    }

    const root = svg.querySelector('#diagramRoot') || svg;
    expect(root.getAttribute('transform')).toBe('translate(0,0) scale(3)');
  });

  test('diagram auto scaling is capped on desktop', () => {
    Object.defineProperty(navigator, 'maxTouchPoints', { value: 0, configurable: true });
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    addOpt('batterySelect', 'BattA');

    script.renderSetupDiagram();

    const svg = document.querySelector('#diagramArea svg');
    const bodyFontSize = parseFloat(getComputedStyle(document.body).fontSize);
    const viewBox = svg.getAttribute('viewBox').split(' ');
    const viewWidth = parseFloat(viewBox[2]);
    const expected = viewWidth * (bodyFontSize / 12);
    expect(parseFloat(svg.style.maxWidth)).toBeCloseTo(expected);
  });

  test('touch devices do not cap diagram auto scaling', () => {
    Object.defineProperty(navigator, 'maxTouchPoints', { value: 1, configurable: true });
    const addOpt = (id, value) => {
      const sel = document.getElementById(id);
      sel.innerHTML = `<option value="${value}">${value}</option>`;
      sel.value = value;
    };
    addOpt('cameraSelect', 'CamA');
    addOpt('batterySelect', 'BattA');

    script.renderSetupDiagram();

    const svg = document.querySelector('#diagramArea svg');
    expect(svg.style.maxWidth).toBe('');

    Object.defineProperty(navigator, 'maxTouchPoints', { value: 0, configurable: true });
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

    // typing question mark in a field should not open help
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.focus();
    const qmEvent = new KeyboardEvent('keydown', { key: '?', bubbles: true, cancelable: true });
    const qmResult = input.dispatchEvent(qmEvent);
    expect(qmResult).toBe(true);
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

  test('help search ignores case and spaces', () => {
    const helpSearch = document.getElementById('helpSearch');
    const gearListHelp = document.getElementById('gearListHelp');

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'F1' }));

    helpSearch.value = 'gearlist';
    helpSearch.dispatchEvent(new Event('input', { bubbles: true }));
    expect(gearListHelp.hasAttribute('hidden')).toBe(false);
    expect(gearListHelp.querySelector('mark')).not.toBeNull();

    helpSearch.value = 'Gear List';
    helpSearch.dispatchEvent(new Event('input', { bubbles: true }));
    expect(gearListHelp.hasAttribute('hidden')).toBe(false);
    expect(gearListHelp.querySelector('mark')).not.toBeNull();
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

  test('search controls are localized', () => {
    const helpSearch = document.getElementById('helpSearch');
    const helpSearchClear = document.getElementById('helpSearchClear');
    const featureSearch = document.getElementById('featureSearch');
    const featureSearchClear = document.getElementById('featureSearchClear');
    script.setLanguage('de');
    expect(helpSearch.getAttribute('placeholder')).toBe(texts.de.helpSearchPlaceholder);
    expect(helpSearch.getAttribute('aria-label')).toBe(texts.de.helpSearchLabel);
    expect(helpSearchClear.getAttribute('aria-label')).toBe(texts.de.helpSearchClear);
    expect(helpSearchClear.getAttribute('title')).toBe(texts.de.helpSearchClear);
    expect(featureSearch.getAttribute('placeholder')).toBe(texts.de.featureSearchPlaceholder);
    expect(featureSearch.getAttribute('aria-label')).toBe(texts.de.featureSearchLabel);
    expect(featureSearchClear.getAttribute('aria-label')).toBe(texts.de.featureSearchClear);
    expect(featureSearchClear.getAttribute('title')).toBe(texts.de.featureSearchClear);
  });

  test('feature search includes cross links to section headings', () => {
    const featureList = document.getElementById('featureList');
    const options = [...featureList.querySelectorAll('option')].map(o => o.value);
    expect(options).toContain('Add New Device');
  });

  test('feature search opens settings dialog entries', () => {
    setupDom(false);
    require('../translations.js');
    require('../script.js');
    const featureSearch = document.getElementById('featureSearch');
    const settingsDialog = document.getElementById('settingsDialog');
    expect(settingsDialog.hasAttribute('hidden')).toBe(true);
    featureSearch.value = 'Settings';
    featureSearch.dispatchEvent(new Event('change'));
    expect(settingsDialog.hasAttribute('hidden')).toBe(false);
  });

  test('feature search reveals device manager section', () => {
    setupDom(false);
    require('../translations.js');
    require('../script.js');
    const featureSearch = document.getElementById('featureSearch');
    const deviceManager = document.getElementById('device-manager');
    expect(deviceManager.classList.contains('hidden')).toBe(true);
    featureSearch.value = 'Add New Device';
    featureSearch.dispatchEvent(new Event('change'));
    expect(deviceManager.classList.contains('hidden')).toBe(false);
  });

  test('feature search selects devices', () => {
    setupDom(false);
    require('../script.js');
    const featureSearch = document.getElementById('featureSearch');
    const cameraSelect = document.getElementById('cameraSelect');
    const featureList = document.getElementById('featureList');
    const options = [...featureList.querySelectorAll('option')].map(o => o.value);
    expect(options).toContain('Sony FX3');
    featureSearch.value = 'Sony FX3';
    featureSearch.dispatchEvent(new Event('change'));
    expect(cameraSelect.value).toBe('Sony FX3');
  });

  test('feature search ignores case and spaces', () => {
    setupDom(false);
    require('../script.js');
    const featureSearch = document.getElementById('featureSearch');
    const cameraSelect = document.getElementById('cameraSelect');
    featureSearch.value = 'sonyfx3';
    featureSearch.dispatchEvent(new Event('change'));
    expect(cameraSelect.value).toBe('Sony FX3');
  });

  test('feature search shows predictions on input', () => {
    setupDom(false);
    require('../script.js');
    const featureSearch = document.getElementById('featureSearch');
    featureSearch.showPicker = jest.fn();
    featureSearch.dispatchEvent(new Event('input'));
    expect(featureSearch.showPicker).toHaveBeenCalled();
  });

  test('feature clear button resets search', () => {
    setupDom(false);
    require('../script.js');
    const featureSearch = document.getElementById('featureSearch');
    const featureSearchClear = document.getElementById('featureSearchClear');
    featureSearch.value = 'sony';
    featureSearch.dispatchEvent(new Event('input', { bubbles: true }));
    expect(featureSearchClear.hasAttribute('hidden')).toBe(false);
    featureSearchClear.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(featureSearch.value).toBe('');
    expect(featureSearchClear.hasAttribute('hidden')).toBe(true);
    expect(document.activeElement).toBe(featureSearch);
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
    expect(setupHeading.getAttribute('data-help')).toBe(
      texts.en.setupManageHeadingHelp
    );
    expect(resultsHeading.getAttribute('data-help')).toBe(
      texts.en.resultsHeadingHelp
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
      powerSource: 'battery'
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
    expect(svg).toContain('.node-box{fill:#f0f0f0');
  });

  test('shareSetupBtn downloads JSON with setup name', async () => {
    global.URL.createObjectURL = jest.fn(() => 'blob:url');
    const nameInput = document.getElementById('setupName');
    nameInput.value = 'My Setup';
    const btn = document.getElementById('shareSetupBtn');
    btn.click();
    expect(URL.createObjectURL).toHaveBeenCalled();
    const blob = URL.createObjectURL.mock.calls[0][0];
    const text = await blob.text();
    const data = JSON.parse(text);
    expect(data.setupName).toBe('My Setup');
  });

  test('shareSetupBtn includes device changes and feedback', async () => {
    global.URL.createObjectURL = jest.fn(() => 'blob:url');
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
    devices.cameras.CamA.powerDrawWatts = 20;
    const key = script.getCurrentSetupKey();
    global.loadFeedback.mockReturnValue({ [key]: [{ runtime: '1h' }] });
    document.getElementById('setupName').value = 'ShareAll';
    document.getElementById('shareSetupBtn').click();
    const blob = URL.createObjectURL.mock.calls[0][0];
    const text = await blob.text();
    const data = JSON.parse(text);
    expect(data.changedDevices.cameras.CamA.powerDrawWatts).toBe(20);
    expect(data.feedback[0].runtime).toBe('1h');
  });

  test('shareSetupBtn includes gear selectors and project info', async () => {
    global.URL.createObjectURL = jest.fn(() => 'blob:url');
    const gearOut = document.getElementById('gearListOutput');
    gearOut.innerHTML = '<select id="gearListCage"><option value="CageA">CageA</option></select>';
    gearOut.querySelector('select').value = 'CageA';
    const projOut = document.getElementById('projectRequirementsOutput');
    projOut.innerHTML = '<h3>Project Requirements</h3><div class="requirements-grid"></div>';
    global.loadProject = jest.fn(() => ({ projectInfo: { notes: 'shoot' } }));
    document.getElementById('shareSetupBtn').click();
    const blob = URL.createObjectURL.mock.calls[0][0];
    const text = await blob.text();
    const data = JSON.parse(text);
    expect(data.gearList).toContain('gearListCage');
    expect(data.projectHtml).toContain('Project Requirements');
    expect(data.gearSelectors.gearListCage).toBe('CageA');
    expect(data.projectInfo.notes).toBe('shoot');
  });

  test('shareSetupBtn includes current project requirements', async () => {
    global.URL.createObjectURL = jest.fn(() => 'blob:url');
    document.getElementById('setupName').value = 'Proj';
    const crew = document.getElementById('crewContainer');
    crew.innerHTML = '<div class="person-row"><select><option value="DoP" selected>DoP</option></select><input class="person-name" value="Alice"/><input class="person-phone" value="555"/><input class="person-email" value="alice@example.com"/></div>';
    global.loadProject = jest.fn(() => null);
    global.saveProject = jest.fn();
    document.getElementById('shareSetupBtn').click();
    const blob = URL.createObjectURL.mock.calls[0][0];
    const text = await blob.text();
    const data = JSON.parse(text);
    expect(data.projectInfo.people[0]).toEqual({ role: 'DoP', name: 'Alice', phone: '555', email: 'alice@example.com' });
  });

  test('applySharedSetup applies gear selectors and project info', () => {
    const projectHtml = '<h2>T</h2><h3>Project Requirements</h3><div class="requirements-grid"></div>';
    const gearHtml = '<h2>Gear List: “T”</h2><select id="gearListCage"><option value="A">A</option><option value="B">B</option></select>';
    const data = { projectHtml, gearList: gearHtml, gearSelectors: { gearListCage: 'B' }, projectInfo: { notes: 'shoot' } };
    global.saveProject = jest.fn();
    script.applySharedSetup(data);
    const gearOut = document.getElementById('gearListOutput');
    const sel = gearOut.querySelector('#gearListCage');
    expect(sel.value).toBe('B');
    expect(global.saveProject).toHaveBeenCalledWith('', { gearList: expect.stringContaining('gearListCage'), projectInfo: { notes: 'shoot' } });
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

  test('editing battery hotswap updates fields', () => {
    const addDeviceBtn = document.getElementById('addDeviceBtn');
    devices.batteryHotswaps = { SwapA: { capacity: 20, pinA: 10, mount_type: 'V-Mount' } };
    const catSelect = document.getElementById('newCategory');
    catSelect.value = 'batteryHotswaps';
    catSelect.dispatchEvent(new Event('change'));
    expect(document.getElementById('newDtapA').parentElement.style.display).toBe('none');
    document.getElementById('newName').value = 'SwapA';
    document.getElementById('newCapacity').value = '25';
    document.getElementById('newPinA').value = '12';

    addDeviceBtn.dataset.mode = 'edit';
    addDeviceBtn.dataset.originalName = 'SwapA';
    addDeviceBtn.click();

    expect(devices.batteryHotswaps.SwapA).toEqual({ capacity: 25, pinA: 12, mount_type: 'V-Mount' });
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

  test('editing accessory charger updates fields', () => {
    const addDeviceBtn = document.getElementById('addDeviceBtn');
    const catSelect = document.getElementById('newCategory');
    catSelect.value = 'accessories.chargers';
    catSelect.dispatchEvent(new Event('change'));
    document.getElementById('newName').value = 'Single V-Mount Charger';
    document.getElementById('newWatt').value = '40';
    document.getElementById('attr-mount').value = 'Gold-Mount';
    document.getElementById('attr-slots').value = '2';
    document.getElementById('attr-chargingSpeedAmps').value = '4';
    addDeviceBtn.dataset.mode = 'edit';
    addDeviceBtn.dataset.originalName = 'Single V-Mount Charger';
    addDeviceBtn.click();
    expect(devices.accessories.chargers['Single V-Mount Charger']).toEqual({
      mount: 'Gold-Mount',
      slots: 2,
      chargingSpeedAmps: 4,
      powerDrawWatts: 40
    });
  });

  test('adding accessory charger stores attributes', () => {
    const addDeviceBtn = document.getElementById('addDeviceBtn');
    const catSelect = document.getElementById('newCategory');
    catSelect.value = 'accessories.chargers';
    catSelect.dispatchEvent(new Event('change'));
    document.getElementById('newName').value = 'Triple Charger';
    document.getElementById('newWatt').value = '60';
    document.getElementById('attr-mount').value = 'V-Mount';
    document.getElementById('attr-slots').value = '3';
    document.getElementById('attr-chargingSpeedAmps').value = '2';
    addDeviceBtn.click();
    expect(devices.accessories.chargers['Triple Charger']).toEqual({
      mount: 'V-Mount',
      slots: 3,
      chargingSpeedAmps: 2,
      powerDrawWatts: 60
    });
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
    expect(toggleBtn.getAttribute('aria-expanded')).toBe('false');

    // Show device manager
    toggleBtn.click();
    expect(deviceManager.classList.contains('hidden')).toBe(false);
    expect(toggleBtn.textContent).toBe(texts.en.hideDeviceManager);
    expect(toggleBtn.getAttribute('aria-expanded')).toBe('true');

    // Hide device manager again
    toggleBtn.click();
    expect(deviceManager.classList.contains('hidden')).toBe(true);
    expect(toggleBtn.textContent).toBe(texts.en.toggleDeviceManager);
    expect(toggleBtn.getAttribute('aria-expanded')).toBe('false');
  });

  test('device manager lists include hover descriptions', () => {
    const span = document.querySelector('#cameraList .device-summary span');
    expect(span.getAttribute('title')).toContain('Power: 10 W');
    expect(span.getAttribute('data-help')).toContain('Power: 10 W');
  });

  test('gear list items expose descriptive hover help', () => {
    setupDom();
    const vf = document.createElement('div');
    vf.id = 'viewfinderVideoOutputs';
    document.body.appendChild(vf);
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

  test('gear list selects expose descriptive hover help', () => {
    setupDom();
    require('../translations.js');
    const script = require('../script.js');
    script.setLanguage('en');
    const cameraSelect = document.getElementById('cameraSelect');
    cameraSelect.innerHTML = '<option value="CamA">CamA</option>';
    cameraSelect.value = 'CamA';
    const html = script.generateGearListHtml();
    script.displayGearAndRequirements(html);
    const sel = document.getElementById('gearListCage');
    expect(sel).not.toBeNull();
    expect(sel.getAttribute('data-help')).toContain('CageOne');
  });

  test('project requirements boxes expose descriptive hover help', () => {
    setupDom();
    require('../translations.js');
    const script = require('../script.js');
    script.setLanguage('en');
    const html = script.generateGearListHtml({ codec: 'ProRes' });
    script.displayGearAndRequirements(html);
    const box = document.querySelector('.requirement-box');
    expect(box.getAttribute('data-help')).toContain('Codec: ProRes');
  });

  test('project requirements children expose descriptive hover help', () => {
    setupDom();
    require('../translations.js');
    const script = require('../script.js');
    script.setLanguage('en');
    const html = script.generateGearListHtml({ codec: 'ProRes' });
    script.displayGearAndRequirements(html);
    const label = document.querySelector('.requirement-box .req-label');
    const value = document.querySelector('.requirement-box .req-value');
    expect(label.getAttribute('data-help')).toContain('Codec: ProRes');
    expect(value.getAttribute('data-help')).toContain('Codec: ProRes');
  });

  test('project requirement boxes consolidate monitoring settings under monitoring support icon', () => {
    setupDom();
    require('../translations.js');
    const script = require('../script.js');
    script.setLanguage('en');
    const html = script.generateGearListHtml({
      viewfinderSettings: 'Viewfinder Clean Feed, Surround View',
      frameGuides: 'Frame Guides: Center Cross',
      aspectMaskOpacity: 'AM Opacity 75%'
    });
    script.displayGearAndRequirements(html);
    const boxes = document.querySelectorAll('.requirement-box .req-icon');
    const icons = Array.from(boxes).map(el => el.textContent);
    expect(icons).toEqual(['🧰']);
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

  test('saving gear list via button requires confirmation', () => {
    setupDom();
    require('../translations.js');
    const script = require('../script.js');
    script.setLanguage('en');
    const html = script.generateGearListHtml({ projectName: 'Proj' });
    script.displayGearAndRequirements(html);
    script.ensureGearListActions();
    const confirmSpy = jest.spyOn(window, 'confirm');
    const saveSpy = jest.spyOn(script, 'saveCurrentGearList');
    confirmSpy.mockReturnValueOnce(false).mockReturnValueOnce(true);
    const btn = document.getElementById('saveGearListBtn');
    btn.click();
    expect(confirmSpy).toHaveBeenCalledTimes(1);
    expect(saveSpy).not.toHaveBeenCalled();
    btn.click();
    expect(confirmSpy).toHaveBeenCalledTimes(2);
    expect(saveSpy).toHaveBeenCalledTimes(1);
    confirmSpy.mockRestore();
    saveSpy.mockRestore();
  });

  test('export gear list file name includes timestamp and project name', () => {
    setupDom();
    require('../translations.js');
    jest.useFakeTimers().setSystemTime(new Date('2024-01-02T03:04:00Z'));
    const script = require('../script.js');
    script.setLanguage('en');
    const html = script.generateGearListHtml({ projectName: 'Proj' });
    script.displayGearAndRequirements(html);
    document.getElementById('setupName').value = 'Test Proj';
    script.ensureGearListActions();
    global.URL.createObjectURL = jest.fn(() => 'blob:url');
    global.URL.revokeObjectURL = jest.fn();
    const origCreate = document.createElement.bind(document);
    let anchor;
    document.createElement = (tag) => {
      const el = origCreate(tag);
      if (tag === 'a') {
        anchor = el;
        el.click = jest.fn();
      }
      return el;
    };
    document.getElementById('exportGearListBtn').click();
    expect(anchor.download).toBe('2024-01-02_03-04_Test-Proj_gear-list.json');
    document.createElement = origCreate;
    jest.useRealTimers();
  });

  test('import gear list sets setup name from file name', () => {
    setupDom();
    require('../translations.js');
    const script = require('../script.js');
    script.setLanguage('en');
    const html = script.generateGearListHtml({ projectName: 'Proj' });
    script.displayGearAndRequirements(html);
    script.ensureGearListActions();
    const data = JSON.stringify({ projectInfo: { projectName: 'Proj' }, gearList: '<table></table>' });
    const RealFileReader = global.FileReader;
    global.FileReader = class { constructor(){ this.onload = null; } readAsText(){ this.onload({ target: { result: data } }); } };
    const file = { name: '2024-01-02_03-04_Proj_gear-list.json' };
    const input = document.getElementById('importGearListInput');
    Object.defineProperty(input, 'files', { value: [file], configurable: true });
    jest.spyOn(script, 'saveCurrentGearList').mockImplementation(() => {});
    input.dispatchEvent(new window.Event('change'));
    expect(document.getElementById('setupName').value).toBe('2024-01-02_03-04_Proj_gear-list');
    global.FileReader = RealFileReader;
  });

  test('download diagram SVG file name includes timestamp and project name', () => {
    setupDom();
    require('../translations.js');
    jest.useFakeTimers().setSystemTime(new Date('2024-01-02T03:04:00Z'));
    const script = require('../script.js');
    script.setLanguage('en');
    document.getElementById('setupName').value = 'Test Proj';
    const area = document.getElementById('diagramArea');
    area.innerHTML = '<svg></svg>';
    global.URL.createObjectURL = jest.fn(() => 'blob:url');
    global.URL.revokeObjectURL = jest.fn();
    const origCreate = document.createElement.bind(document);
    let anchor;
    document.createElement = (tag) => {
      const el = origCreate(tag);
      if (tag === 'a') {
        anchor = el;
        el.click = jest.fn();
      }
      return el;
    };
    document.getElementById('downloadDiagram').click();
    expect(anchor.download).toBe('2024-01-02_03-04_Test-Proj_diagram.svg');
    document.createElement = origCreate;
    jest.useRealTimers();
  });

  test('download diagram JPG file name includes timestamp and project name', () => {
    setupDom();
    require('../translations.js');
    jest.useFakeTimers().setSystemTime(new Date('2024-01-02T03:04:00Z'));
    const script = require('../script.js');
    script.setLanguage('en');
    document.getElementById('setupName').value = 'Test Proj';
    const area = document.getElementById('diagramArea');
    area.innerHTML = '<svg></svg>';
    global.URL.createObjectURL = jest.fn(() => 'blob:url');
    global.URL.revokeObjectURL = jest.fn();
    const origCreate = document.createElement.bind(document);
    let anchor;
    document.createElement = (tag) => {
      const el = origCreate(tag);
      if (tag === 'a') {
        anchor = el;
        el.click = jest.fn();
      }
      if (tag === 'canvas') {
        el.getContext = () => ({ drawImage: jest.fn() });
        el.toBlob = cb => cb(new Blob(['']));
      }
      return el;
    };
    const OrigImage = global.Image;
    global.Image = class {
      set onload(fn) { this._onload = fn; }
      set src(val) { if (this._onload) this._onload(); }
    };
    const btn = document.getElementById('downloadDiagram');
    btn.dispatchEvent(new window.MouseEvent('click', { shiftKey: true }));
    expect(anchor.download).toBe('2024-01-02_03-04_Test-Proj_diagram.jpg');
    document.createElement = origCreate;
    global.Image = OrigImage;
    jest.useRealTimers();
  });

  test.skip('detail toggle responds to keyboard events', () => {});
});

describe('copy summary button without clipboard support', () => {
  let script;

  beforeEach(() => {
    jest.resetModules();

    global.alert = jest.fn();
    global.prompt = jest.fn();

    delete navigator.clipboard;

    document.execCommand = jest.fn(() => { throw new Error('execCommand not supported'); });

    document.body.innerHTML = getHtmlBody();
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
    global.loadProject = jest.fn(() => '');
    global.saveProject = jest.fn();
    global.deleteProject = jest.fn();

    require('../translations.js');
    script = require('../script.js');
    script.setLanguage('en');
  });

  test('copy summary button falls back to prompt when clipboard unsupported', () => {
    const btn = document.getElementById('copySummaryBtn');
    expect(btn.disabled).toBe(false);
    expect(btn.textContent).toBe(texts.en.copySummaryBtn);
    btn.click();
    expect(global.prompt).toHaveBeenCalled();
  });
});

test('ARRI Alexa 35 setup suggests appropriate FIZ cables', () => {
  setupDom(false);
  devices.cameras['Arri Alexa 35'] = { fizConnectors: [{ type: 'LBUS (LEMO 4-pin)' }, { type: 'SERIAL (LEMO 4-pin)' }] };
  devices.fiz.motors['Arri Cforce Mini'] = { fizConnectors: [{ type: 'LBUS (LEMO 4-pin)' }] };
  devices.fiz.controllers['Arri Master Grip (single unit)'] = { fizConnectors: [{ type: 'LBUS (LEMO 4-pin)' }], internalController: true };
  devices.fiz.distance['UDM-1 + LCube'] = { fizConnectors: [{ type: 'Serial' }] };
  devices.accessories.cables.fiz = {
    'LBUS to LBUS 0,3m': { from: 'LBUS (LEMO 4-pin)', to: 'LBUS (LEMO 4-pin)' },
    'LBUS to LBUS 0,5m': { from: 'LBUS (LEMO 4-pin)', to: 'LBUS (LEMO 4-pin)' },
    'Cable UDM – SERIAL (4p) 0,5m': { from: 'SERIAL (LEMO 4-pin)', to: 'Serial' }
  };
  const { collectAccessories } = require('../script.js');
  const addOpt = (id, value) => {
    const sel = document.getElementById(id);
    sel.innerHTML = `<option value="${value}">${value}</option>`;
    sel.value = value;
  };
  addOpt('cameraSelect', 'Arri Alexa 35');
  addOpt('motor1Select', 'Arri Cforce Mini');
  addOpt('controller1Select', 'Arri Master Grip (single unit)');
  addOpt('distanceSelect', 'UDM-1 + LCube');
  addOpt('monitorSelect', 'None');
  addOpt('videoSelect', 'None');
  addOpt('batterySelect', 'BattA');
  const { fizCables } = collectAccessories({ hasMotor: true });
  expect(fizCables).toEqual(expect.arrayContaining([
    'LBUS to LBUS 0,3m (Arri Cforce Mini ↔ Arri Master Grip single unit)',
    'LBUS to LBUS 0,5m (Arri Cforce Mini ↔ Arri Master Grip single unit)',
    'LBUS to LBUS 0,3m (for Arri Cforce Mini)',
    'LBUS to LBUS 0,5m (for Arri Master Grip single unit)',
    'Cable UDM – SERIAL (4p) 0,5m (for UDM-1 + LCube)',
    'LBUS to LBUS 0,3m (spare)',
    'LBUS to LBUS 0,5m (spare)',
    'Cable UDM – SERIAL (4p) 0,5m (spare)'
  ]));
  expect(fizCables).toHaveLength(8);
});

test('UMC-4 setup suggests 7-pin serial cable for UDM-1 via LCube', () => {
  setupDom(false);
  devices.cameras['Arri Alexa Mini'] = { fizConnectors: [{ type: 'LBUS (LEMO 4-pin)' }, { type: 'Serial (LEMO 7-pin)' }] };
  devices.fiz.motors['Arri Cforce Mini'] = { fizConnectors: [{ type: 'LBUS (LEMO 4-pin)' }] };
  devices.fiz.controllers['Arri UMC-4'] = {
    fizConnectors: [{ type: 'Serial (LEMO 7-pin)' }],
    internalController: true
  };
  devices.fiz.distance['UDM-1 + LCube'] = { fizConnectors: [{ type: 'Serial' }] };
  devices.accessories.cables.fiz = {
    'Cable UDM – SERIAL (7p) 1,5m': { from: 'Serial (LEMO 7-pin)', to: 'Serial' }
  };
  const { collectAccessories } = require('../script.js');
  const addOpt = (id, value) => {
    const sel = document.getElementById(id);
    sel.innerHTML = `<option value="${value}">${value}</option>`;
    sel.value = value;
  };
  addOpt('cameraSelect', 'Arri Alexa Mini');
  addOpt('motor1Select', 'Arri Cforce Mini');
  addOpt('controller1Select', 'Arri UMC-4');
  addOpt('distanceSelect', 'UDM-1 + LCube');
  addOpt('monitorSelect', 'None');
  addOpt('videoSelect', 'None');
  addOpt('batterySelect', 'BattA');
  const { fizCables } = collectAccessories({ hasMotor: true });
  expect(fizCables).toEqual(expect.arrayContaining([
    'Cable UDM – SERIAL (7p) 1,5m (for UDM-1 + LCube)'
  ]));
  expect(fizCables).not.toContain('Cable UDM – SERIAL (7p) 1,5m (spare)');
  expect(fizCables.some(cable => cable.includes('Cable UDM – SERIAL (4p)'))).toBe(false);
});

test('cforce mini RF uses camera-specific CAM cable', () => {
  const { collectAccessories } = require('../script.js');
  const addOpt = (id, value) => {
    const sel = document.getElementById(id);
    sel.innerHTML = `<option value="${value}">${value}</option>`;
    sel.value = value;
  };
  addOpt('cameraSelect', 'Arri Amira');
  addOpt('motor1Select', 'Arri cforce mini RF (KK.0040345)');
  addOpt('controller1Select', 'None');
  addOpt('distanceSelect', 'None');
  addOpt('monitorSelect', 'None');
  addOpt('videoSelect', 'None');
  addOpt('batterySelect', 'BattA');
  const { fizCables } = collectAccessories({ hasMotor: true });
  expect(fizCables).toEqual(expect.arrayContaining([
    'Cable CAM (7-pin) – EXT (6-pin) 0,6m (for Arri Amira)',
    'Cable CAM (7-pin) – EXT (6-pin) 0,6m (spare)'
  ]));
});
