const devices = require('../../web/data');

test('batteries expose pinA attribute', () => {
  const batteryGroups = [devices.batteries || {}, (devices.accessories && devices.accessories.batteries) || {}];
  for (const group of batteryGroups) {
    for (const info of Object.values(group)) {
      expect(info).toHaveProperty('pinA');
      if ('dtapA' in info) {
        expect(typeof info.dtapA).toBe('number');
      }
      if ('pinV' in info) {
        expect(typeof info.pinV).toBe('number');
      }
    }
  }
});

test('accessory batteries include pinV attribute', () => {
  const accessories = (devices.accessories && devices.accessories.batteries) || {};
  for (const info of Object.values(accessories)) {
    expect(info).toHaveProperty('pinV');
  }
});
