const { TextEncoder: UtilTextEncoder, TextDecoder: UtilTextDecoder } = require('util');

global.TextEncoder = global.TextEncoder || UtilTextEncoder;
global.TextDecoder = global.TextDecoder || UtilTextDecoder;

const { getHtmlBody } = require('../domUtils');

const BASE_DEVICES = {
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
      brightnessNits: 2000,
      screenSizeInches: 7,
      power: { input: { type: 'LEMO 2-pin' } },
      videoInputs: [{ type: '3G-SDI' }]
    }
  },
  video: {},
  lenses: {
    LensA: {
      brand: 'TestBrand',
      tStop: 2.0,
      rodStandard: '15mm',
      rodLengthCm: 30,
      needsLensSupport: true,
      frontDiameterMm: 80,
      weight_g: 110
    }
  },
  fiz: {
    motors: {
      MotorA: {
        powerDrawWatts: 2,
        fizConnectors: [{ type: 'LBUS (LEMO 4-pin)' }],
        power: { input: { type: 'LEMO 2-pin' } }
      }
    },
    controllers: {
      ControllerA: {
        powerDrawWatts: 2,
        fizConnectors: [{ type: 'LBUS (LEMO 4-pin)' }],
        power: { input: { type: 'LEMO 2-pin' } }
      }
    },
    distance: {
      DistA: {
        powerDrawWatts: 1,
        power: { input: { type: 'LEMO 2-pin' } }
      }
    }
  },
  batteries: {
    BattA: { capacity: 98, pinA: 10, dtapA: 5, mount_type: 'V-Mount' }
  },
  accessories: {
    cages: {
      CageOne: { brand: 'BrandA', compatible: ['CamA'] }
    },
    powerPlates: { 'Generic V-Mount Plate': { mount: 'V-Mount' } }
  }
};

const htmlBody = getHtmlBody();

function cloneDevices() {
  return JSON.parse(JSON.stringify(BASE_DEVICES));
}

function loadTranslations() {
  const translations = require('../../translations.js');
  global.texts = translations.texts;
  global.categoryNames = translations.categoryNames;
  global.gearItems = translations.gearItems;
  return translations;
}

function setupDom({ removeGear = false } = {}) {
  jest.resetModules();
  const { window } = global;
  document.body.innerHTML = htmlBody;
  document.head.innerHTML = '<meta name="theme-color" content="#ffffff">';
  Object.assign(window.navigator, {
    clipboard: { writeText: jest.fn().mockResolvedValue() }
  });
  global.window = window;
  global.document = window.document;
  global.navigator = window.navigator;
  global.alert = jest.fn();
  global.prompt = jest.fn();

  if (removeGear) {
    document.getElementById('gearListOutput')?.remove();
  }

  global.devices = cloneDevices();
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
  global.loadSessionState = jest.fn(() => null);
  global.saveSessionState = jest.fn();
  global.loadProject = jest.fn(() => null);
  global.saveProject = jest.fn();
  global.deleteProject = jest.fn();
}

afterEach(() => {
  if (global.localStorage) global.localStorage.clear();
  if (global.sessionStorage) global.sessionStorage.clear();
});

test('restores project requirements when gear list output is missing', () => {
  setupDom({ removeGear: true });
  expect(document.getElementById('cameraSelect')).not.toBeNull();
  const storedHtml = '<h2>Proj</h2><h3>Project Requirements</h3><div class="requirements-grid"><div class="requirement-box"><span class="req-label">Codec</span><span class="req-value">ProRes</span></div></div>';
  loadTranslations();
  const script = require('../../script.js');
  script.displayGearAndRequirements(storedHtml);
  const projOut = document.getElementById('projectRequirementsOutput');
  expect(projOut.classList.contains('hidden')).toBe(false);
  expect(projOut.innerHTML).toContain('Project Requirements');
});

test('restores requirements and gear markup when both are provided', () => {
  setupDom();
  expect(document.getElementById('cameraSelect')).not.toBeNull();
  const storedHtml = '<h2>Proj</h2><h3>Project Requirements</h3><div class="requirements-grid"><div class="requirement-box"><span class="req-label">Codec</span><span class="req-value">ARRIRAW</span></div></div><h3>Gear List</h3><table class="gear-table"><tbody><tr><td><span class="gear-item" data-gear-name="SupportA">SupportA</span></td></tr></tbody></table>';
  loadTranslations();
  const script = require('../../script.js');
  script.displayGearAndRequirements(storedHtml);
  const projOut = document.getElementById('projectRequirementsOutput');
  const gearOut = document.getElementById('gearListOutput');
  expect(projOut.classList.contains('hidden')).toBe(false);
  expect(projOut.innerHTML).toContain('Project Requirements');
  expect(gearOut.classList.contains('hidden')).toBe(false);
  expect(gearOut.innerHTML).toContain('Gear List');
});

test('setLanguage hydrates stored project info', () => {
  setupDom();
  expect(document.getElementById('cameraSelect')).not.toBeNull();
  const stored = { projectInfo: { projectName: 'Test Project', codec: 'ProRes' }, gearList: '<h2>Proj</h2>' };
  global.loadProject = jest.fn(() => stored);
  loadTranslations();
  const script = require('../../script.js');
  script.setLanguage('en');
  const nameInput = document.getElementById('projectName');
  expect(nameInput.value).toBe('Test Project');
});

test('default FIZ devices remain when stored data is missing entries', () => {
  setupDom();
  expect(document.getElementById('cameraSelect')).not.toBeNull();
  const defaultMotors = Object.keys(global.devices.fiz.motors);
  global.loadDeviceData = jest.fn(() => ({
    cameras: {},
    monitors: {},
    video: {},
    batteries: {},
    fiz: { motors: {}, controllers: {}, distance: {} }
  }));
  loadTranslations();
  require('../../script.js');
  expect(Object.keys(global.devices.fiz.motors)).toEqual(defaultMotors);
});
