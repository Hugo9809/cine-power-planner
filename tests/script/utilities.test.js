describe('script utility helpers', () => {
  function stubReadyState(value) {
    const descriptor = Object.getOwnPropertyDescriptor(document, 'readyState');
    try {
      Object.defineProperty(document, 'readyState', {
        configurable: true,
        get: () => value
      });
    } catch {
      // If redefining fails we still return the descriptor so tests can attempt
      // to restore it later.
    }
    return descriptor;
  }

  function restoreReadyState(descriptor) {
    if (descriptor) {
      Object.defineProperty(document, 'readyState', descriptor);
    } else {
      delete document.readyState;
    }
  }

  function loadScriptModule() {
    jest.resetModules();
    const { getHtmlBody } = require('../domUtils');
    document.body.innerHTML = getHtmlBody();

    const readyStateDescriptor = stubReadyState('loading');

    global.devices = {
      cameras: {},
      monitors: {},
      video: {},
      fiz: { motors: {}, controllers: {}, distance: {} },
      batteries: {},
      batteryHotswaps: {}
    };
    global.loadDeviceData = jest.fn(() => null);
    global.saveDeviceData = jest.fn();
    global.loadSetups = jest.fn(() => ({}));
    global.saveSetups = jest.fn();
    global.saveSetup = jest.fn();
    global.loadSetup = jest.fn();
    global.deleteSetup = jest.fn();
    global.loadFavorites = jest.fn(() => ({}));
    global.saveFavorites = jest.fn();

    require('../../translations.js');
    const utils = require('../../script.js');

    restoreReadyState(readyStateDescriptor);
    return utils;
  }

  afterEach(() => {
    delete global.devices;
    delete global.loadDeviceData;
    delete global.saveDeviceData;
    delete global.loadSetups;
    delete global.saveSetups;
    delete global.saveSetup;
    delete global.loadSetup;
    delete global.deleteSetup;
    delete global.loadFavorites;
    delete global.saveFavorites;
    delete window.defaultDevices;
    jest.resetModules();
  });

  test('ensureList merges defaults for string and object entries', () => {
    const utils = loadScriptModule();
    const defaults = { label: 'default' };

    const result = utils.ensureList(['D-Tap', { type: 'USB-C', notes: 'PD' }, null], defaults);
    expect(result).toEqual([
      { label: 'default', type: 'D-Tap' },
      { label: 'default', type: 'USB-C', notes: 'PD' },
      { label: 'default' }
    ]);

    expect(utils.ensureList(undefined, defaults)).toEqual([]);
    expect(utils.ensureList({ foo: 'bar' }, defaults)).toEqual([]);
  });

  test('fixPowerInput normalizes string and array inputs', () => {
    const utils = loadScriptModule();

    const basic = { powerInput: 'D-Tap / USB Type-C®' };
    utils.fixPowerInput(basic);
    expect(basic).not.toHaveProperty('powerInput');
    expect(basic.power.input).toEqual({ type: ['D-Tap', 'USB-C'] });

    const mixed = {
      power: {
        input: [
          'B-Mount',
          { portType: 'd-tap', maxCurrentA: 6 },
          { type: 'usb-c™', optional: true },
          null
        ]
      }
    };
    utils.fixPowerInput(mixed);
    expect(mixed.power.input).toEqual([
      { type: ['B-Mount'] },
      { maxCurrentA: 6, type: ['D-Tap'] },
      { optional: true, type: ['USB-C'] },
      { type: [] }
    ]);
  });

  test('generateConnectorSummary groups connectors and escapes content', () => {
    const utils = loadScriptModule();
    const device = {
      powerInput: 'B-Mount / USB Type-C®',
      power: {
        powerDistributionOutputs: [
          { type: 'D-Tap' },
          { type: 'D-Tap' },
          { type: 'USB-C' }
        ]
      },
      fizConnectors: [
        { type: 'LBUS (LEMO 4-pin)' },
        { type: 'LBUS (LEMO 4-pin)' },
        { type: 'RS-422' }
      ],
      video: { outputs: [{ type: 'SDI' }, { type: 'SDI' }] },
      timecode: [{ type: 'BNC' }],
      audioOutput: { portType: 'XLR <5-pin>' },
      powerDrawWatts: 95,
      capacity: 98,
      pinA: 15,
      dtapA: 10,
      mount_type: 'B-Mount',
      screenSizeInches: 7,
      brightnessNits: 1200,
      wirelessTx: true,
      internalController: true,
      torqueNm: 0.8,
      powerSource: 'Battery & Charger <fast>'
    };

    utils.fixPowerInput(device);
    device.power.input.voltageRange = '11-17';

    const html = utils.generateConnectorSummary(device);
    expect(html).toContain('⚡ Power Out: D-Tap ×2, USB-C');
    expect(html).toContain('🔌 Power In: B-Mount, USB-C');
    expect(html).toContain('🎚️ FIZ Port: LBUS (LEMO 4-pin) ×2, RS-422');
    expect(html).toContain('📺 Video Out: SDI ×2');
    expect(html).toContain('⏱️ Timecode: BNC');
    expect(html).toContain('🔊 Audio Out: XLR &lt;5-pin&gt;');
    expect(html).toContain('⚡ Power: 95 W');
    expect(html).toContain('🔋 Voltage: 11-17V');
    expect(html).toContain('🔋 Capacity: 98 Wh');
    expect(html).toContain('Pins: 15A');
    expect(html).toContain('D-Tap: 10A');
    expect(html).toContain('Mount: B-Mount');
    expect(html).toContain('📐 Screen: 7"');
    expect(html).toContain('💡 Brightness: 1200 nits');
    expect(html).toContain('📡 Wireless: true');
    expect(html).toContain('🎛️ Controller: Internal');
    expect(html).toContain('⚙️ Torque: 0.8 Nm');
    expect(html).toContain('🔌 Power Source: Battery &amp; Charger &lt;fast&gt;');
  });
});
