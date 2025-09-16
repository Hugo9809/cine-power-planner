const devices = require('../../devices');

test('lenses are only exposed at top level', () => {
  expect(devices.lenses).toBeDefined();
  expect(devices.accessories).toBeDefined();
  expect(devices.accessories.lenses).toBeUndefined();
});
