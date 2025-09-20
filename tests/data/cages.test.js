const devices = require('../../src/data');

describe('cages data', () => {
  test('every cage specifies handle_extension_compatible', () => {
    const cages = devices.accessories.cages;
    Object.values(cages).forEach(cage => {
      expect(typeof cage.handle_extension_compatible).toBe('boolean');
    });
  });
});
