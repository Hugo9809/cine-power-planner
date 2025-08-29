const { normalizeMonitor } = require('../unifyPorts.js');

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
