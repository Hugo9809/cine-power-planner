const cages = require('../devices/cages.js');

describe('cages data', () => {
  test('every cage specifies handle_extension_compatible', () => {
    Object.values(cages).forEach(cage => {
      expect(typeof cage.handle_extension_compatible).toBe('boolean');
    });
  });
});
