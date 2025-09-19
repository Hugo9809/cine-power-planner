const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

const BASE_DEVICES = {
  cameras: {
    'Cinema Pro': { brand: 'Fabrikam', resolutions: ['4K'] }
  },
  monitors: {
    'Vision 7"': { size: '7"' }
  },
  video: {
    'Wireless TX': { latencyMs: 1 }
  },
  batteries: {
    'PowerCell 98': { capacity: 98 }
  },
  batteryHotswaps: {
    'Dual Plate': { notes: 'Stacked support' }
  },
  chargers: {
    'Quad Charger': { slots: 4 }
  },
  cages: {
    'Cinema Pro Cage': { compatibleWith: 'Cinema Pro' }
  },
  wirelessReceivers: {
    'Wireless RX': { range: '150m' }
  },
  fiz: {
    motors: {
      'High Torque Motor': { torque: '5Nm' }
    },
    controllers: {
      'Focus Controller': { channels: 3 }
    },
    distance: {
      'Laser Rangefinder': { type: 'Laser' }
    }
  }
};

describe('device database import/export helpers', () => {
  let env;

  beforeEach(() => {
    if (typeof window !== 'undefined') {
      window.alert = jest.fn();
    }
  });

  afterEach(() => {
    env?.cleanup();
    env = null;
    if (typeof window !== 'undefined') {
      window.alert = jest.fn();
    }
  });

  function setupEnv(options) {
    const environment = setupScriptEnvironment(options);
    if (typeof window !== 'undefined') {
      window.alert = jest.fn();
    }
    return environment;
  }

  test('createDeviceExportPayload includes metadata summary', () => {
    env = setupEnv({ devices: BASE_DEVICES });
    const { createDeviceExportPayload, computeDeviceStatistics, APP_VERSION } = env.utils;
    const stats = computeDeviceStatistics(global.devices);
    const payload = createDeviceExportPayload(global.devices, new Date('2024-01-01T00:00:00Z'));

    expect(payload.devices).toBe(global.devices);
    expect(payload.meta).toEqual({
      format: 'camera-power-planner-device-database',
      exportedAt: '2024-01-01T00:00:00.000Z',
      appVersion: APP_VERSION,
      totalDevices: stats.total,
      categoryCounts: stats.categoryCounts,
    });
  });

  test('parseImportedDevicePayload supports new export structure', () => {
    env = setupEnv({ devices: BASE_DEVICES });
    const { createDeviceExportPayload, parseImportedDevicePayload } = env.utils;
    const payload = createDeviceExportPayload(global.devices, new Date('2024-02-02T00:00:00Z'));

    const parsed = parseImportedDevicePayload(payload);
    expect(parsed).not.toBeNull();
    expect(parsed.meta).toEqual(payload.meta);
    expect(parsed.devices).toEqual(payload.devices);
  });

  test('parseImportedDevicePayload normalises legacy payloads', () => {
    env = setupEnv({ devices: BASE_DEVICES });
    const { parseImportedDevicePayload } = env.utils;
    const legacyPayload = {
      cameras: { Custom: { brand: 'CustomCo' } },
      fiz: { motors: { CustomMotor: { torque: '6Nm' } } }
    };

    const parsed = parseImportedDevicePayload(legacyPayload);
    expect(parsed).not.toBeNull();
    expect(parsed.meta).toBeNull();
    expect(parsed.devices.cameras.Custom).toEqual({ brand: 'CustomCo' });
    expect(parsed.devices.fiz.controllers).toEqual({});
    expect(parsed.devices.fiz.distance).toEqual({});
  });

  test('mergeDeviceDatabaseWithDefaults overlays imported data', () => {
    env = setupEnv({ devices: BASE_DEVICES });
    const { mergeDeviceDatabaseWithDefaults } = env.utils;

    const merged = mergeDeviceDatabaseWithDefaults({
      cameras: {
        'Cinema Pro': { brand: 'Fabrikam', resolutions: ['6K'] },
        'Pocket Cam': { brand: 'Contoso' }
      },
      fiz: {
        motors: {
          'High Torque Motor': { torque: '6Nm' }
        }
      }
    });

    expect(merged).not.toBe(window.defaultDevices);
    expect(merged.cameras['Cinema Pro'].resolutions).toEqual(['6K']);
    expect(merged.cameras['Pocket Cam']).toEqual({ brand: 'Contoso' });
    expect(merged.monitors).toEqual(window.defaultDevices.monitors);
    expect(merged.fiz.motors['High Torque Motor'].torque).toBe('6Nm');
  });

  test('mergeDeviceDatabaseWithDefaults falls back to defaults for invalid payloads', () => {
    env = setupEnv({ devices: BASE_DEVICES });
    const { mergeDeviceDatabaseWithDefaults } = env.utils;

    const merged = mergeDeviceDatabaseWithDefaults(null);
    expect(merged).toEqual(window.defaultDevices);
    expect(merged).not.toBe(window.defaultDevices);
  });
});
