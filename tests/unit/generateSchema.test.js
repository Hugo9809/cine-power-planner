const { buildSchema, isDeviceObject, isDeviceMap } = require('../../generateSchema');

describe('generateSchema utilities', () => {
  test('isDeviceObject identifies flat objects', () => {
    expect(isDeviceObject({ a: 1, b: [] })).toBe(true);
    expect(isDeviceObject({ nested: { a: 1 } })).toBe(false);
  });

  test('isDeviceMap identifies maps of device objects', () => {
    const valid = {
      cam1: { a: 1 },
      cam2: { b: 2 },
    };
    const invalid = {
      cam1: { a: 1 },
      cam2: { nested: { a: 1 } },
    };
    expect(isDeviceMap(valid)).toBe(true);
    expect(isDeviceMap(invalid)).toBe(false);
  });

  test('buildSchema creates combined attribute lists', () => {
    const input = {
      group: {
        dev1: { a: 1, b: 2 },
        dev2: { b: 3, c: 4 },
      },
      list: [{ x: 1 }, { y: 2 }],
      value: 42,
    };
    expect(buildSchema(input)).toEqual({
      group: { attributes: ['a', 'b', 'c'] },
      list: { attributes: ['x', 'y'] },
      value: 'number',
    });
  });
});
