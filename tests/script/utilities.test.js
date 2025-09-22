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
    expect(html).toContain('<span class="info-box-label">Power Out:</span> D-Tap ×2, USB-C');
    expect(html).toContain('<span class="info-box-label">Power In:</span> B-Mount, USB-C');
    expect(html).toContain('<span class="info-box-label">FIZ Port:</span> LBUS (LEMO 4-pin) ×2, RS-422');
    expect(html).toContain('<span class="info-box-label">Video Out:</span> SDI ×2');
    expect(html).toContain('<span class="info-box-label">Timecode:</span> BNC');
    expect(html).toContain('<span class="info-box-label">Audio Out:</span> XLR &lt;5-pin&gt;');
    expect(html).toContain('<span class="info-box-label">Power:</span> 95 W');
    expect(html).toContain('<span class="info-box-label">Voltage:</span> 11-17V');
    expect(html).toContain('<span class="info-box-label">Capacity:</span> 98 Wh');
    expect(html).toContain('<span class="info-box-label">Pins:</span> 15A');
    expect(html).toContain('<span class="info-box-label">D-Tap:</span> 10A');
    expect(html).toContain('<span class="info-box-label">Mount:</span> B-Mount');
    expect(html).toContain('<span class="info-box-label">Screen:</span> 7"');
    expect(html).toContain('<span class="info-box-label">Brightness:</span> 1200 nits');
    expect(html).toContain('<span class="info-box-label">Wireless:</span> true');
    expect(html).toContain('<span class="info-box-label">Controller:</span> Internal');
    expect(html).toContain('<span class="info-box-label">Torque:</span> 0.8 Nm');
    expect(html).toContain('<span class="info-box-label">Power Source:</span> Battery &amp; Charger &lt;fast&gt;');
    expect(html).toContain('connector-icon icon-glyph');
    expect(html).toContain('info-icon icon-glyph');
  });
});
