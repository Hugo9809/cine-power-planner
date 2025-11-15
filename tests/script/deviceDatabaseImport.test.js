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
      carts: {
        'Camera Cart A': { brand: 'Backstage' }
      },
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
    expect(env.utils.countDeviceDatabaseEntries(result.devices)).toBe(10);
  });

  test('accepts dataset nested inside backup export', () => {
    env = setupScriptEnvironment();
    const sample = buildSampleDatabase();
    const wrapped = { devices: sample, setups: {}, favorites: {} };

    const result = env.utils.parseDeviceDatabaseImport(wrapped);

    expect(result.errors).toEqual([]);
    expect(result.devices).toEqual(sample);
  });

  test('upgrades legacy datasets missing newly added categories', () => {
    env = setupScriptEnvironment();
    const legacy = buildSampleDatabase();
    delete legacy.directorMonitors;
    delete legacy.fiz.distance;
    delete legacy.accessories.cardReaders;
    delete legacy.accessories.carts;
    delete legacy.carts;

    const result = env.utils.parseDeviceDatabaseImport(legacy);

    expect(result.errors).toEqual([]);
    expect(result.devices.directorMonitors).toEqual({});
    expect(result.devices.fiz.distance).toEqual({});
    expect(result.devices.accessories.cardReaders).toEqual({});
    expect(result.devices.accessories.carts).toEqual({});
    expect(result.devices.carts).toEqual({});
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

  test('converts legacy array-based device collections into objects', () => {
    env = setupScriptEnvironment();
    const legacy = {
      cameras: [
        { name: 'Camera A', powerDrawWatts: 10, power: { input: { type: 'DC' } } },
      ],
      monitors: [
        { name: 'Monitor A', powerDrawWatts: 5, power: { input: { type: 'DC' } }, videoInputs: ['SDI'] },
      ],
      video: [
        { name: 'Link A', powerDrawWatts: 2, power: { input: { type: 'USB-C' } }, videoOutputs: ['HDMI'] },
      ],
      viewfinders: [],
      directorMonitors: [],
      iosVideo: [],
      videoAssist: [],
      media: [],
      lenses: [],
      fiz: {
        motors: [
          { name: 'Motor A', powerDrawWatts: 1, fizConnector: '7-pin' },
        ],
        controllers: [],
        distance: [],
        handUnits: [],
      },
      batteries: [],
      batteryHotswaps: [],
      wirelessReceivers: [],
      accessories: {
        chargers: [
          { name: 'Charger A', outputs: ['D-Tap'] },
        ],
        cages: [],
        powerPlates: [],
        cameraSupport: [],
        matteboxes: [],
        filters: [],
        rigging: [],
        batteries: [],
        cables: [],
        videoAssist: [],
        media: [],
        cardReaders: [],
        tripodHeads: [],
        tripods: [],
        sliders: [],
        cameraStabiliser: [],
        grip: [],
        carts: [],
      },
      batteryAdapters: {},
    };

    const result = env.utils.parseDeviceDatabaseImport(legacy);

    expect(result.errors).toEqual([]);
    expect(result.devices.cameras['Camera A'].powerDrawWatts).toBe(10);
    expect(result.devices.monitors['Monitor A'].videoInputs).toEqual(['SDI']);
    expect(result.devices.fiz.motors['Motor A'].fizConnector).toBe('7-pin');
    expect(result.devices.accessories.chargers['Charger A'].outputs).toEqual(['D-Tap']);
  });

  test('converts legacy category arrays nested in wrapper objects', () => {
    env = setupScriptEnvironment();
    const legacy = {
      categories: [
        {
          name: 'Cameras',
          items: [
            { name: 'Camera Legacy', powerDrawWatts: 12, power: { input: { type: 'DC' } } },
          ],
        },
        {
          name: 'FIZ',
          collections: [
            {
              name: 'Motors',
              items: [
                { name: 'Legacy Motor', powerDrawWatts: 1, fizConnector: '7-pin' },
              ],
            },
          ],
        },
      ],
    };

    const result = env.utils.parseDeviceDatabaseImport(legacy);

    expect(result.errors).toEqual([]);
    expect(result.devices.cameras['Camera Legacy'].powerDrawWatts).toBe(12);
    expect(result.devices.fiz.motors['Legacy Motor'].fizConnector).toBe('7-pin');
  });

  test('parses legacy device collections exported as arrays', () => {
    env = setupScriptEnvironment();
    const legacy = [
      ['cameras', { 'Camera Array': { powerDrawWatts: 9, power: { input: { type: 'DC' } } } }],
      {
        key: 'Monitors',
        devices: {
          'Monitor Array': { powerDrawWatts: 5, power: { input: { type: 'DC' } }, videoInputs: ['HDMI'] },
        },
      },
    ];

    const result = env.utils.parseDeviceDatabaseImport(legacy);

    expect(result.errors).toEqual([]);
    expect(result.devices.cameras['Camera Array'].powerDrawWatts).toBe(9);
    expect(result.devices.monitors['Monitor Array'].videoInputs).toEqual(['HDMI']);
  });
});
