const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

const SESSION_KEY = 'cameraPowerPlanner_session';

function createDeviceData() {
  return {
    cameras: {
      'Test Cam': {
        power: {
          batteryPlateSupport: [
            { type: 'V-Mount', mount: 'native' }
          ]
        }
      }
    },
    batteries: {
      'Test Battery': {
        mount_type: 'V-Mount',
        capacity: 98,
        pinA: 12
      }
    },
    batteryHotswaps: {
      'Test Swap': {
        mount_type: 'V-Mount',
        pinA: 12
      }
    }
  };
}

describe('battery persistence', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  test('restores battery selection from session state on reload', () => {
    localStorage.setItem(SESSION_KEY, JSON.stringify({
      camera: 'Test Cam',
      batteryPlate: 'V-Mount',
      battery: 'Test Battery',
      batteryHotswap: 'Test Swap'
    }));

    const env = setupScriptEnvironment({
      devices: createDeviceData(),
      globals: {
        saveSetups: jest.fn(),
        loadSetups: jest.fn(() => ({})),
      }
    });

    require('../../src/scripts/storage.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));

    const batterySelect = document.getElementById('batterySelect');
    const hotswapSelect = document.getElementById('batteryHotswapSelect');

    expect(batterySelect.value).toBe('Test Battery');
    expect(hotswapSelect.value).toBe('Test Swap');

    env.cleanup();
  });

  test('loads saved battery choices when switching setups', () => {
    const storedSetups = {
      'Project A': {
        camera: 'Test Cam',
        batteryPlate: 'V-Mount',
        battery: 'Test Battery',
        batteryHotswap: 'Test Swap'
      }
    };

    const env = setupScriptEnvironment({
      devices: createDeviceData(),
      globals: {
        saveSetups: jest.fn(),
        loadSetups: jest.fn(() => ({ ...storedSetups })),
      }
    });

    require('../../src/scripts/storage.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));

    const setupSelect = document.getElementById('setupSelect');
    setupSelect.value = 'Project A';
    setupSelect.dispatchEvent(new Event('change'));

    const batterySelect = document.getElementById('batterySelect');
    const hotswapSelect = document.getElementById('batteryHotswapSelect');

    expect(batterySelect.value).toBe('Test Battery');
    expect(hotswapSelect.value).toBe('Test Swap');

    env.cleanup();
  });
});
