const { mergePowerInputState } = require('../../src/scripts/modules/power-input-helpers.js');

describe('mergePowerInputState', () => {
  it('preserves existing connector metadata when inputs are unchanged', () => {
    const existing = {
      input: [
        { type: ['LEMO 2-pin'], notes: '6-28V' },
        { type: ['V-Mount'], voltageRange: '10-34' },
      ],
      output: { type: 'loop' },
    };

    const collected = [
      { type: ['LEMO 2-pin'], notes: '6-28V' },
      { type: ['V-Mount'], voltageRange: '10-34' },
    ];

    const result = mergePowerInputState(existing, collected);

    expect(result).toEqual({
      input: collected,
      output: { type: 'loop' },
    });
    expect(result.input).not.toBe(existing.input);
  });

  it('drops input array when no connectors remain', () => {
    const existing = {
      input: [{ type: ['LEMO 2-pin'] }],
    };

    const result = mergePowerInputState(existing, []);

    expect(result).toBeUndefined();
  });

  it('retains other power properties when connectors are cleared', () => {
    const existing = {
      input: [{ type: ['LEMO 2-pin'] }],
      output: { type: 'loop' },
    };

    const result = mergePowerInputState(existing, []);

    expect(result).toEqual({ output: { type: 'loop' } });
  });
});

