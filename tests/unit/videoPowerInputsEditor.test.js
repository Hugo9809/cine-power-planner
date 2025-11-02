'use strict';

const {
  normalizePowerInputList,
  mergePowerInput,
} = require('../../src/scripts/modules/video-power-inputs.js');

describe('video power input helpers', () => {
  test('normalizePowerInputList retains connector arrays and metadata', () => {
    const raw = [
      { type: ['USB-C'], voltageRange: '5-12V', notes: 'PD input' },
      { type: ['NP-F'] },
      { type: ['DC Barrel'], voltageRange: '6-16V' },
    ];

    const normalized = normalizePowerInputList(raw);

    expect(normalized).toEqual([
      { type: ['USB-C'], voltageRange: '5-12V', notes: 'PD input' },
      { type: ['NP-F'] },
      { type: ['DC Barrel'], voltageRange: '6-16V' },
    ]);
  });

  test('mergePowerInput merges connectors without dropping existing fields', () => {
    const existingPower = { alternateInputs: [{ type: 'USB-C' }] };
    const connectors = [
      { type: ['LEMO 2-pin'], notes: 'Camera plate' },
      { type: ['V-Mount'] },
    ];

    const merged = mergePowerInput(existingPower, connectors);

    expect(merged).toEqual({
      alternateInputs: [{ type: 'USB-C' }],
      input: connectors,
    });

    expect(mergePowerInput(existingPower, undefined)).toBeUndefined();
  });
});
