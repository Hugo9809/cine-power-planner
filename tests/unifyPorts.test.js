const {
  normalizeMonitor,
  parsePowerInput,
  normalizeVideoDevice,
  cleanVoltageRange,
  normalizeFiz,
  cleanTypeName
} = require('../unifyPorts.js');

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
