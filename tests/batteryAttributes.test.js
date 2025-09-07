const devices = require('../data');

test('batteries expose pinA attribute', () => {
  const batteryGroups = [devices.batteries || {}, (devices.accessories && devices.accessories.batteries) || {}];
  for (const group of batteryGroups) {
    for (const info of Object.values(group)) {
      expect(info).toHaveProperty('pinA');
      if ('dtapA' in info) {
        expect(typeof info.dtapA).toBe('number');
      }
    }
  }
});
