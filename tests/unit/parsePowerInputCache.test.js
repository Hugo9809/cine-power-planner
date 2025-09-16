const { parsePowerInput } = require('../../unifyPorts.js');

describe('parsePowerInput cache', () => {
  test('modifying returned array does not pollute cache', () => {
    const first = parsePowerInput('D-Tap');
    first[0].extra = 'modified';
    const second = parsePowerInput('D-Tap');
    expect(second[0].extra).toBeUndefined();
  });

  test('returns null for non-string input', () => {
    // Previously a non-string would throw when parsePowerInput attempted to
    // call string methods on the value. It should now safely return null.
    expect(parsePowerInput(123)).toBeNull();
  });

  test('returns null for whitespace-only input', () => {
    expect(parsePowerInput('   ')).toBeNull();
  });
});
