const devices = require('../../src/data');
const canonicalMountTypes = new Set(['B-Mount', 'V-Mount', 'Gold-Mount', 'Micro V-Mount', 'Micro Gold-Mount']);
const mountTypePattern = /Mount/;

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

test('camera battery plate mount types use canonical names', () => {
  const cameras = devices.cameras || {};
  const invalidMountTypes = [];

  for (const [cameraName, camera] of Object.entries(cameras)) {
    const supports = ((camera.power || {}).batteryPlateSupport) || [];
    for (const support of supports) {
      const type = support && support.type;
      if (!type || !mountTypePattern.test(type)) {
        continue;
      }
      if (!canonicalMountTypes.has(type)) {
        invalidMountTypes.push({ cameraName, type });
      }
    }
  }

  expect(invalidMountTypes).toEqual([]);
});
