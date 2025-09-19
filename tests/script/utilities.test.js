const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

describe('script utility helpers', () => {
  let env;
  let utils;

  beforeEach(() => {
    env = setupScriptEnvironment();
    utils = env.utils;
  });

  afterEach(() => {
    env?.cleanup();
  });

  test('ensureList merges defaults for string and object entries', () => {
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
    expect(html).toContain('Power Out: D-Tap ×2, USB-C');
    expect(html).toContain('Power In: B-Mount, USB-C');
    expect(html).toContain('FIZ Port: LBUS (LEMO 4-pin) ×2, RS-422');
    expect(html).toContain('Video Out: SDI ×2');
    expect(html).toContain('Timecode: BNC');
    expect(html).toContain('Audio Out: XLR &lt;5-pin&gt;');
    expect(html).toContain('Power: 95 W');
    expect(html).toContain('Voltage: 11-17V');
    expect(html).toContain('Capacity: 98 Wh');
    expect(html).toContain('Pins: 15A');
    expect(html).toContain('D-Tap: 10A');
    expect(html).toContain('Mount: B-Mount');
    expect(html).toContain('Screen: 7"');
    expect(html).toContain('Brightness: 1200 nits');
    expect(html).toContain('Wireless: true');
    expect(html).toContain('Controller: Internal');
    expect(html).toContain('Torque: 0.8 Nm');
    expect(html).toContain('Power Source: Battery &amp; Charger &lt;fast&gt;');
    expect(html).toContain('connector-icon icon-glyph');
    expect(html).toContain('info-icon icon-glyph');
  });
});
