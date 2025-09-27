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

function createHybridDeviceData() {
  return {
    cameras: {
      'Hybrid Cam': {
        power: {
          batteryPlateSupport: [
            { type: 'V-Mount', mount: 'native' },
            { type: 'B-Mount', mount: 'native' }
          ]
        }
      }
    },
    batteries: {
      'V Battery': {
        mount_type: 'V-Mount',
        capacity: 98,
        pinA: 12
      },
      'B Battery': {
        mount_type: 'B-Mount',
        capacity: 150,
        pinA: 20
      }
    },
    batteryHotswaps: {
      'V Swap': {
        mount_type: 'V-Mount',
        pinA: 12
      },
      'B Swap': {
        mount_type: 'B-Mount',
        pinA: 20
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

  test('restores B-Mount selection from stored project data after switching from V-Mount', () => {
    const storedSetups = {
      'Project V': {
        camera: 'Hybrid Cam',
        batteryPlate: 'V-Mount',
        battery: 'V Battery',
        batteryHotswap: 'V Swap'
      },
      'Project B': {
        camera: 'Hybrid Cam'
      }
    };

    const storedProjects = {
      'Project V': {
        powerSelection: {
          batteryPlate: 'V-Mount',
          battery: 'V Battery',
          batteryHotswap: 'V Swap'
        }
      },
      'Project B': {
        powerSelection: {
          batteryPlate: 'B-Mount',
          battery: 'B Battery',
          batteryHotswap: 'B Swap'
        }
      }
    };

    const env = setupScriptEnvironment({
      devices: createHybridDeviceData(),
      globals: {
        saveSetups: jest.fn(),
        loadSetups: jest.fn(() => ({ ...storedSetups })),
        loadProject: jest.fn(name => storedProjects[name] || null),
        saveProject: jest.fn()
      }
    });

    require('../../src/scripts/storage.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));

    const setupSelect = document.getElementById('setupSelect');
    setupSelect.value = 'Project V';
    setupSelect.dispatchEvent(new Event('change'));

    const batteryPlateSelect = document.getElementById('batteryPlateSelect');
    const batterySelect = document.getElementById('batterySelect');

    expect(batteryPlateSelect.value).toBe('V-Mount');
    expect(batterySelect.value).toBe('V Battery');

    setupSelect.value = 'Project B';
    setupSelect.dispatchEvent(new Event('change'));

    expect(batteryPlateSelect.value).toBe('B-Mount');
    expect(batterySelect.value).toBe('B Battery');

    env.cleanup();
  });
});
