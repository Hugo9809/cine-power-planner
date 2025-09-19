const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

describe('device database import helpers', () => {
  let env;

  afterEach(() => {
    env?.cleanup();
    env = null;
  });

  function buildSampleDatabase() {
    return {
      cameras: {
        'Camera A': { powerDrawWatts: 10, power: { input: { type: 'DC' } } }
      },
      monitors: {
        'Monitor A': { powerDrawWatts: 5, power: { input: { type: 'DC' } }, videoInputs: ['SDI'] }
      },
      video: {
        'Link A': { powerDrawWatts: 2, power: { input: { type: 'USB-C' } }, videoOutputs: ['HDMI'] }
      },
      viewfinders: {
        'Viewfinder A': { type: 'EVF', powerDrawWatts: 3 }
      },
      directorMonitors: {},
      iosVideo: {},
      videoAssist: {},
      media: {},
      lenses: {},
      fiz: {
        motors: {
          'Motor A': { powerDrawWatts: 1, fizConnector: '7-pin' }
        },
        controllers: {
          'Controller A': { powerDrawWatts: 1, powerSource: 'NP-F' }
        },
        distance: {
          'Rangefinder A': { powerDrawWatts: 1, measurementMethod: 'Laser' }
        },
        handUnits: {}
      },
      batteries: {
        'Battery A': { capacity: 98, mount_type: 'V-Mount', pinA: 10 }
      },
      batteryHotswaps: {},
      wirelessReceivers: {},
      accessories: {
        chargers: {},
        cages: {},
        powerPlates: {},
        cameraSupport: {},
        matteboxes: {},
        filters: {},
        rigging: {},
        batteries: {},
        cables: {
          'BNC Cable': { connectors: ['BNC'], length_m: 3 }
        },
        videoAssist: {},
        media: {},
        tripodHeads: {},
        tripods: {},
        sliders: {},
        cameraStabiliser: {},
        grip: {},
        carts: {},
      },
      filterOptions: ['ND']
    };
  }

  test('accepts standalone device dataset', () => {
    env = setupScriptEnvironment();
    const sample = buildSampleDatabase();
    const result = env.utils.parseDeviceDatabaseImport(sample);

    expect(result.errors).toEqual([]);
    expect(result.devices).toEqual(sample);
    expect(env.utils.countDeviceDatabaseEntries(result.devices)).toBe(9);
  });

  test('accepts dataset nested inside backup export', () => {
    env = setupScriptEnvironment();
    const sample = buildSampleDatabase();
    const wrapped = { devices: sample, setups: {}, favorites: {} };

    const result = env.utils.parseDeviceDatabaseImport(wrapped);

    expect(result.errors).toEqual([]);
    expect(result.devices).toEqual(sample);
  });

  test('rejects dataset missing required categories', () => {
    env = setupScriptEnvironment();
    const incomplete = { cameras: { 'Camera A': { powerDrawWatts: 10 } } };

    const result = env.utils.parseDeviceDatabaseImport(incomplete);

    expect(result.devices).toBeNull();
    expect(result.errors.length).toBeGreaterThan(0);
  });

  test('rejects malformed device collections', () => {
    env = setupScriptEnvironment();
    const sample = buildSampleDatabase();
    sample.cameras = [];

    const result = env.utils.parseDeviceDatabaseImport(sample);

    expect(result.devices).toBeNull();
    expect(result.errors.some((msg) => msg.includes('cameras'))).toBe(true);
  });

  test('reports missing fiz subcategories', () => {
    env = setupScriptEnvironment();
    const sample = buildSampleDatabase();
    delete sample.fiz.controllers;

    const result = env.utils.parseDeviceDatabaseImport(sample);

    expect(result.devices).toBeNull();
    expect(result.errors.some((msg) => msg.includes('FIZ'))).toBe(true);
  });
});
