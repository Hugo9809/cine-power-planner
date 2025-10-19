const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const {
  normalizeMonitor,
  normalizeVideoPorts,
  parsePowerInput,
  normalizeVideoDevice,
  cleanVoltageRange,
  normalizeFiz,
  cleanTypeName,
  cleanPort,
  splitOutside
} = require('../../tools/unifyPorts.js');

describe('cleanVoltageRange', () => {
  it('removes spaces around hyphen', () => {
    expect(cleanVoltageRange('DC 10 - 20V')).toBe('10-20');
  });
  it('normalizes en dashes and "to" ranges', () => {
    expect(cleanVoltageRange('10 – 20 Volts')).toBe('10-20');
    expect(cleanVoltageRange('12 to 24V')).toBe('12-24');
  });
});

describe('cleanTypeName', () => {
  it('standardizes common connector names', () => {
    expect(cleanTypeName('dtap')).toBe('D-Tap');
    expect(cleanTypeName('USB Type C')).toBe('USB-C');
  });
  it('strips multiple generic input/output words', () => {
    expect(cleanTypeName('HDMI Input OUTPUT')).toBe('HDMI');
    expect(cleanTypeName('SDI IN/OUT')).toBe('SDI IN/OUT');
  });
  it('removes trailing connector and port descriptors', () => {
    expect(cleanTypeName('USB-C connector')).toBe('USB-C');
    expect(cleanTypeName('HDMI port')).toBe('HDMI');
  });
});

describe('normalizeMonitor', () => {
  it('does not throw when power is missing', () => {
    const monitor = { model: 'Test Monitor' };
    expect(() => normalizeMonitor(monitor)).not.toThrow();
    expect(monitor).toEqual({ model: 'Test Monitor' });
  });

  it('cleans voltageRange when present', () => {
    const monitor = { power: { input: { voltageRange: 'DC 12-24V' } } };
    normalizeMonitor(monitor);
    expect(monitor.power.input.voltageRange).toBe('12-24');
  });

  it('normalizes audio connector fields', () => {
    const monitor = {
      audioOutput: { portType: '3.5mm Headphone Jack' },
      audioInput: { portType: '3.5mm Mic/Line' },
      audioIo: { portType: '10-pin LEMO (analog audio)' }
    };
    normalizeMonitor(monitor);
    expect(monitor.audioOutput).toEqual({ type: '3.5mm Headphone Jack' });
    expect(monitor.audioInput).toEqual({ type: '3.5mm Mic/Line' });
    expect(monitor.audioIo).toEqual({ type: '10-pin LEMO (analog audio)' });
  });
});

describe('parsePowerInput', () => {
  it('does not split slashes inside parentheses', () => {
    const input = 'LEMO (5V/3A) / D-Tap';
    expect(parsePowerInput(input)).toEqual([
      { type: 'LEMO', notes: '5V/3A' },
      { type: 'D-Tap' }
    ]);
  });

  it('does not split slashes inside quotes', () => {
    const input = 'LEMO "5V/3A" / D-Tap';
    expect(parsePowerInput(input)).toEqual([
      { type: 'LEMO', notes: '5V/3A' },
      { type: 'D-Tap' }
    ]);
  });

  it('filters out empty segments', () => {
    const input = 'LEMO / / D-Tap';
    expect(parsePowerInput(input)).toEqual([
      { type: 'LEMO' },
      { type: 'D-Tap' }
    ]);
  });

  it('normalizes connector names', () => {
    const input = 'dtap / usb type c';
    expect(parsePowerInput(input)).toEqual([
      { type: 'D-Tap' },
      { type: 'USB-C' }
    ]);
  });

  it('handles single connector without delimiter', () => {
    const input = 'LEMO';
    expect(parsePowerInput(input)).toEqual([
      { type: 'LEMO' }
    ]);
  });

  it('returns null for non-string input', () => {
    expect(parsePowerInput(123)).toBeNull();
  });

  it('returns null when no connectors are found', () => {
    expect(parsePowerInput(' / ')).toBeNull();
  });

  it('returns a fresh copy on repeated calls', () => {
    const first = parsePowerInput('D-Tap');
    first[0].type = 'Changed';
    const second = parsePowerInput('D-Tap');
    expect(second).toEqual([{ type: 'D-Tap' }]);
  });
});

describe('splitOutside', () => {
  it('ignores delimiters inside parentheses', () => {
    const input = 'A (B/C) / D';
    expect(splitOutside(input)).toEqual(['A (B/C) ', ' D']);
  });

  it('ignores delimiters inside quotes', () => {
    const input = 'A "B/C" / D';
    expect(splitOutside(input)).toEqual(['A "B/C" ', ' D']);
  });

  it('handles nested parentheses', () => {
    const input = 'A (B (C/D)) / E';
    expect(splitOutside(input)).toEqual(['A (B (C/D)) ', ' E']);
  });

  it('returns original string when delimiter is absent', () => {
    expect(splitOutside('LEMO')).toEqual(['LEMO']);
  });
});

describe('normalizeVideoDevice', () => {
  it('cleans voltageRange for each power input entry', () => {
    const dev = { power: { input: [
      { type: 'LEMO', voltageRange: 'DC 5-16V' },
      { type: 'D-Tap', voltageRange: '14V DC' }
    ] } };
    normalizeVideoDevice(dev);
    expect(dev.power.input[0].voltageRange).toBe('5-16');
    expect(dev.power.input[1].voltageRange).toBe('14');
  });

  it('normalizes audio connector fields', () => {
    const dev = {
      audioOutput: { portType: '3.5mm Headphone Jack' },
      audioInput: { portType: '3.5mm Mic/Line' },
      audioIo: { portType: '10-pin LEMO (analog audio)' }
    };
    normalizeVideoDevice(dev);
    expect(dev.audioOutput).toEqual({ type: '3.5mm Headphone Jack' });
    expect(dev.audioInput).toEqual({ type: '3.5mm Mic/Line' });
    expect(dev.audioIo).toEqual({ type: '10-pin LEMO (analog audio)' });
  });
});

describe('normalizeFiz', () => {
  it('cleans voltageRange for array power inputs', () => {
    const dev = {
      power: {
        input: [
          { type: 'LEMO', voltageRange: 'DC 5-16V' },
          { type: 'D-Tap', voltageRange: '11 - 17V DC' }
        ]
      }
    };
    normalizeFiz(dev);
    expect(dev.power.input[0].voltageRange).toBe('5-16');
    expect(dev.power.input[1].voltageRange).toBe('11-17');
  });
});

describe('cleanPort', () => {
  it('handles primitive values without throwing', () => {
    expect(() => cleanPort('USB-C')).not.toThrow();
  });
  it('converts string entries inside arrays to objects', () => {
    const arr = ['USB Type-C', { portType: 'HDMI port' }];
    cleanPort(arr);
    expect(arr).toEqual([
      { type: 'USB-C' },
      { type: 'HDMI' }
    ]);
  });
});

describe('normalizeVideoPorts', () => {
  it('preserves additional port properties', () => {
    const device = {
      videoInputs: [
        { portType: 'HDMI', notes: '1.4', extra: 'keep' },
        'SDI'
      ],
      videoOutputs: [
        { type: 'USB-C', notes: 'Alt mode' }
      ]
    };
    normalizeVideoPorts(device);
    expect(device.videoInputs).toEqual([
      { type: 'HDMI', notes: '1.4', extra: 'keep' },
      { type: 'SDI' }
    ]);
    expect(device.videoOutputs).toEqual([
      { type: 'USB-C', notes: 'Alt mode' }
    ]);
  });
});

describe('unifyPorts CLI integration', () => {
  const dataIndexPath = path.resolve(__dirname, '../../src/data/index.js');
  const scriptPath = path.resolve(__dirname, '../../tools/unifyPorts.js');
  let originalIndexContent;

  beforeAll(() => {
    originalIndexContent = fs.readFileSync(dataIndexPath, 'utf8');
  });

  afterAll(() => {
    fs.writeFileSync(dataIndexPath, originalIndexContent);
    const dataModulePath = require.resolve('../../src/data');
    delete require.cache[dataModulePath];
  });

  it('keeps rentalHouses attached to exported data', () => {
    execFileSync(process.execPath, [scriptPath], { stdio: 'pipe' });
    const dataModulePath = require.resolve('../../src/data');
    delete require.cache[dataModulePath];
    const data = require('../../src/data');
    expect(Array.isArray(data.rentalHouses)).toBe(true);
    expect(data.rentalHouses.length).toBeGreaterThan(0);
  });
});
