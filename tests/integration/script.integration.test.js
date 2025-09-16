const { getHtmlBody } = require('../domUtils');
const { TextEncoder: UtilTextEncoder, TextDecoder: UtilTextDecoder } = require('util');

global.TextEncoder = global.TextEncoder || UtilTextEncoder;
global.TextDecoder = global.TextDecoder || UtilTextDecoder;

const LZString = require('lz-string');

const htmlBody = getHtmlBody();

function buildDevicesFixture() {
  return {
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
      LensA: { brand: 'TestBrand', tStop: 2.0, frontDiameterMm: 80 }
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
      BattA: { capacity: 100, pinA: 10, mount_type: 'V-Mount' }
    },
    batteryHotswaps: {
      SwapA: { capacity: 50, pinA: 15, mount_type: 'V-Mount' }
    },
    accessories: {
      powerPlates: { 'Generic V-Mount Plate': { mount: 'V-Mount' } },
      cages: { CageA: { brand: 'BrandA', compatible: ['CamA'] } },
      matteboxes: { 'ARRI LMB 4x5 Pro Set': { type: 'Swing Away' } },
      chargers: { 'Dual V-Mount Charger': { mount: 'V-Mount', slots: 2, chargingSpeedAmps: 2 } },
      cables: {
        power: { 'D-Tap to LEMO 2-pin': { to: 'LEMO 2-pin' } },
        video: { 'BNC Cable 1 m': { type: '3G-SDI' } }
      }
    }
  };
}

function setupDom({ removeGear = false } = {}) {
  jest.resetModules();
  document.body.innerHTML = htmlBody;
  document.head.innerHTML = '<meta name="theme-color" content="#ffffff">';

  if (!global.navigator) {
    global.navigator = {};
  }
  Object.assign(global.navigator, { clipboard: { writeText: jest.fn().mockResolvedValue() } });

  if (removeGear) {
    const gearOutput = document.getElementById('gearListOutput');
    if (gearOutput) gearOutput.remove();
  }

  if (!document.getElementById('cameraSelect')) {
    throw new Error('Test DOM missing cameraSelect element');
  }
  if (!document.getElementById('batteryPlateSelect')) {
    throw new Error('Test DOM missing batteryPlateSelect element');
  }

  global.devices = buildDevicesFixture();
  global.LZString = LZString;

  global.alert = jest.fn();
  global.prompt = jest.fn();
  global.loadDeviceData = jest.fn(() => null);
  global.saveDeviceData = jest.fn();
  global.loadSetups = jest.fn(() => ({}));
  global.saveSetups = jest.fn();
  global.saveSetup = jest.fn();
  global.loadSetup = jest.fn();
  global.deleteSetup = jest.fn();
  global.renameSetup = jest.fn();
  global.loadSessionState = jest.fn(() => null);
  global.saveSessionState = jest.fn();
  global.loadProject = jest.fn(() => null);
  global.saveProject = jest.fn();
  global.deleteProject = jest.fn();
  global.loadFeedback = jest.fn(() => ({}));
  global.saveFeedback = jest.fn();
  global.loadFavorites = jest.fn(() => ({}));
  global.saveFavorites = jest.fn();
  global.saveGearList = jest.fn();
  global.loadGearList = jest.fn(() => null);
  global.registerDevice = jest.fn();
  global.exportAllData = jest.fn();
  global.importAllData = jest.fn();
}

afterEach(() => {
  if (global.localStorage) global.localStorage.clear();
  if (global.sessionStorage) global.sessionStorage.clear();
});

describe('planner integration', () => {
  test('initializes planner with default selections', () => {
    setupDom();
    require('../../translations.js');
    const script = require('../../script.js');
    script.setLanguage('en');

    const cameraSelect = document.getElementById('cameraSelect');
    const monitorSelect = document.getElementById('monitorSelect');

    const cameraOptions = Array.from(cameraSelect.options).map(option => option.value);
    const monitorOptions = Array.from(monitorSelect.options).map(option => option.value);

    expect(cameraOptions).toContain('CamA');
    expect(monitorOptions).toContain('MonA');
  });

  test('restores project requirements from stored markup', () => {
    setupDom({ removeGear: true });
    const storedHtml = '<h2>Proj</h2><h3>Project Requirements</h3><div class="requirements-grid"><div class="requirement-box"><span class="req-label">Codec</span><span class="req-value">ProRes</span></div></div>';
    global.loadProject = jest.fn(() => ({ gearList: storedHtml, projectInfo: null }));
    global.saveProject = jest.fn();
    global.deleteProject = jest.fn();

    require('../../translations.js');
    const script = require('../../script.js');
    script.displayGearAndRequirements(storedHtml);

    const output = document.getElementById('projectRequirementsOutput');
    expect(output.classList.contains('hidden')).toBe(false);
    expect(output.innerHTML).toContain('Project Requirements');
  });

  test('restores session state from saved data', () => {
    setupDom();
    const storedState = {
      setupName: 'Morning Shoot',
      camera: 'CamA',
      monitor: 'MonA',
      video: 'VidA',
      battery: 'BattA',
      motors: [],
      controllers: [],
      distance: '',
      batteryPlate: '',
      cage: '',
      sliderBowl: '',
      projectInfo: null
    };
    global.loadSessionState = jest.fn(() => storedState);
    global.saveSessionState = jest.fn();
    global.loadProject = jest.fn(() => null);
    global.saveProject = jest.fn();
    global.deleteProject = jest.fn();

    require('../../translations.js');
    const script = require('../../script.js');
    script.setLanguage('en');

    expect(document.getElementById('cameraSelect').value).toBe('CamA');
    expect(document.getElementById('monitorSelect').value).toBe('MonA');
    expect(global.saveSessionState).toHaveBeenCalled();
  });

  test('collects project form data from populated fields', () => {
    setupDom();
    require('../../translations.js');
    const script = require('../../script.js');
    script.setLanguage('en');

    document.getElementById('projectName').value = 'Short Film';
    document.getElementById('productionCompany').value = 'Studio Films';

    const projectData = script.collectProjectFormData();
    expect(projectData.projectName).toBe('Short Film');
    expect(projectData.productionCompany).toBe('Studio Films');
  });
});
