const GLOBAL_KEYS = [
  'CUSTOM_FONT_STORAGE_KEY_NAME',
  'CUSTOM_FONT_STORAGE_KEY',
  'TEMPERATURE_UNIT_STORAGE_KEY',
];

const originalGlobals = {};

beforeAll(() => {
  GLOBAL_KEYS.forEach((key) => {
    originalGlobals[key] = {
      hasValue: Object.prototype.hasOwnProperty.call(global, key),
      value: global[key],
    };
  });
});

function restoreGlobals() {
  GLOBAL_KEYS.forEach((key) => {
    const original = originalGlobals[key];
    if (!original) return;
    if (original.hasValue) {
      global[key] = original.value;
    } else {
      delete global[key];
    }
  });
}

beforeEach(() => {
  jest.resetModules();
  if (typeof localStorage !== 'undefined' && localStorage) {
    localStorage.clear();
  }
  if (typeof sessionStorage !== 'undefined' && sessionStorage) {
    sessionStorage.clear();
  }
  restoreGlobals();
});

afterEach(() => {
  jest.resetModules();
  if (typeof localStorage !== 'undefined' && localStorage) {
    localStorage.clear();
  }
  if (typeof sessionStorage !== 'undefined' && sessionStorage) {
    sessionStorage.clear();
  }
  restoreGlobals();
});

describe('storage key initialization', () => {
  test('normalizes legacy custom font storage key name', () => {
    global.CUSTOM_FONT_STORAGE_KEY_NAME = 'cinePowerPlanner_customFonts';
    global.CUSTOM_FONT_STORAGE_KEY = 'cinePowerPlanner_customFonts';

    const storage = require('../../src/scripts/storage');

    expect(global.CUSTOM_FONT_STORAGE_KEY_NAME).toBe('cameraPowerPlanner_customFonts');
    expect(global.CUSTOM_FONT_STORAGE_KEY).toBe('cameraPowerPlanner_customFonts');
    expect(typeof storage.exportAllData).toBe('function');
  });

  test('uses provided custom font storage key name from global scope', () => {
    global.CUSTOM_FONT_STORAGE_KEY_NAME = 'customFontKey';
    global.CUSTOM_FONT_STORAGE_KEY = 'customFontKey';

    const storage = require('../../src/scripts/storage');

    const safeStorage = storage.getSafeLocalStorage();
    safeStorage.clear();

    const fonts = [
      { id: 'font-1', name: 'Font One', data: 'AAAA' },
      { id: 'font-2', name: 'Font Two', data: 'BBBB' },
    ];
    safeStorage.setItem('customFontKey', JSON.stringify(fonts));

    const exported = storage.exportAllData();

    expect(global.CUSTOM_FONT_STORAGE_KEY_NAME).toBe('customFontKey');
    expect(global.CUSTOM_FONT_STORAGE_KEY).toBe('customFontKey');
    expect(exported.customFonts).toEqual(fonts);
  });

  test('exportAllData uses temperature unit storage key from global scope', () => {
    global.TEMPERATURE_UNIT_STORAGE_KEY = 'customTemperatureKey';

    const storage = require('../../src/scripts/storage');
    const safeStorage = storage.getSafeLocalStorage();
    safeStorage.clear();
    safeStorage.setItem('customTemperatureKey', 'kelvin');

    const exported = storage.exportAllData();

    expect(global.TEMPERATURE_UNIT_STORAGE_KEY).toBe('customTemperatureKey');
    expect(exported.preferences).toBeDefined();
    expect(exported.preferences.temperatureUnit).toBe('kelvin');
  });

  test('falls back to defineProperty when temperature key assignment fails', () => {
    const setter = jest.fn(() => {
      throw new Error('blocked');
    });

    Object.defineProperty(global, 'TEMPERATURE_UNIT_STORAGE_KEY', {
      configurable: true,
      get() {
        return { key: 'blocked' };
      },
      set: setter,
    });

    const warnSpy = jest
      .spyOn(console, 'warn')
      .mockImplementation(() => {});

    const storage = require('../../src/scripts/storage');
    const descriptor = Object.getOwnPropertyDescriptor(
      global,
      'TEMPERATURE_UNIT_STORAGE_KEY',
    );

    expect(setter).toHaveBeenCalledTimes(1);
    expect(setter).toHaveBeenCalledWith('cameraPowerPlanner_temperatureUnit');
    expect(descriptor).toMatchObject({
      configurable: true,
      writable: true,
      value: 'cameraPowerPlanner_temperatureUnit',
    });

    const safeStorage = storage.getSafeLocalStorage();
    safeStorage.clear();
    safeStorage.setItem(global.TEMPERATURE_UNIT_STORAGE_KEY, 'celsius');

    const exported = storage.exportAllData();

    expect(exported.preferences).toBeDefined();
    expect(exported.preferences.temperatureUnit).toBe('celsius');

    const warnCalls = warnSpy.mock.calls.filter(
      ([message]) => message === 'Unable to assign temperature unit storage key globally.',
    );
    expect(warnCalls).toHaveLength(1);
    expect(warnCalls[0][1]).toBeInstanceOf(Error);

    warnSpy.mockRestore();
  });
});
