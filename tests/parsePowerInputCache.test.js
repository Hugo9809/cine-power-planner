const { parsePowerInput } = require('../unifyPorts.js');

describe('parsePowerInput cache', () => {
  test('modifying returned array does not pollute cache', () => {
    const first = parsePowerInput('D-Tap');
    first[0].extra = 'modified';
    const second = parsePowerInput('D-Tap');
    expect(second[0].extra).toBeUndefined();
  });
});
