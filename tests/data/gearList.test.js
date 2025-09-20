const devices = require('../../public/data');

test('lenses are only exposed at top level', () => {
  expect(devices.lenses).toBeDefined();
  expect(devices.accessories).toBeDefined();
  expect(devices.accessories.lenses).toBeUndefined();
});
