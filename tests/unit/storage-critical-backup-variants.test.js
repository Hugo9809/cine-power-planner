describe('critical storage guard mirrors prefixed variants', () => {
  const SCHEMA_KEY = 'cinePowerPlanner_schemaCache';
  const SCHEMA_BACKUP_KEY = `${SCHEMA_KEY}__backup`;

  const createControlledStorage = () => {
    const data = new Map();

    const storage = {
      setItem(key, value) {
        data.set(String(key), String(value));
      },
      getItem(key) {
        return data.has(String(key)) ? data.get(String(key)) : null;
      },
      removeItem(key) {
        data.delete(String(key));
      },
      clear() {
        data.clear();
      },
      key(index) {
        const keys = Array.from(data.keys());
        return index >= 0 && index < keys.length ? keys[index] : null;
      },
    };

    Object.defineProperty(storage, 'length', {
      configurable: true,
      enumerable: false,
      get() {
        return data.size;
      },
    });

    return storage;
  };

  let originalWindow;
  let hadWindow;
  let win;
  let originalLocalStorageDescriptor;
  let originalSessionStorageDescriptor;
  let originalLocalStorageInstance;
  let originalSessionStorageInstance;
  let controlledStorage;
  let consoleInfoSpy;

  beforeEach(() => {
    jest.resetModules();

    hadWindow = Object.prototype.hasOwnProperty.call(global, 'window');
    originalWindow = global.window;
    if (!hadWindow || typeof global.window !== 'object') {
      global.window = {};
    }
    win = global.window;

    controlledStorage = createControlledStorage();

    originalLocalStorageDescriptor = Object.getOwnPropertyDescriptor(win, 'localStorage');
    originalSessionStorageDescriptor = Object.getOwnPropertyDescriptor(win, 'sessionStorage');

    originalLocalStorageInstance =
      originalLocalStorageDescriptor && typeof originalLocalStorageDescriptor.get === 'function'
        ? originalLocalStorageDescriptor.get.call(win)
        : originalLocalStorageDescriptor
          ? originalLocalStorageDescriptor.value
          : undefined;

    originalSessionStorageInstance =
      originalSessionStorageDescriptor && typeof originalSessionStorageDescriptor.get === 'function'
        ? originalSessionStorageDescriptor.get.call(win)
        : originalSessionStorageDescriptor
          ? originalSessionStorageDescriptor.value
          : undefined;

    Object.defineProperty(win, 'localStorage', {
      configurable: true,
      value: controlledStorage,
    });
    Object.defineProperty(win, 'sessionStorage', {
      configurable: true,
      value: controlledStorage,
    });

    global.localStorage = controlledStorage;
    global.sessionStorage = controlledStorage;

    consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleInfoSpy.mockRestore();

    if (!originalLocalStorageDescriptor) {
      delete win.localStorage;
      delete global.localStorage;
    } else {
      Object.defineProperty(win, 'localStorage', originalLocalStorageDescriptor);
      global.localStorage = originalLocalStorageInstance;
    }

    if (!originalSessionStorageDescriptor) {
      delete win.sessionStorage;
      delete global.sessionStorage;
    } else {
      Object.defineProperty(win, 'sessionStorage', originalSessionStorageDescriptor);
      global.sessionStorage = originalSessionStorageInstance;
    }

    if (!hadWindow) {
      delete global.window;
    } else {
      global.window = originalWindow;
    }
  });

  test('mirrors backup for legacy cine prefix keys', () => {
    const storageApi = require('../../src/scripts/storage.js');

    controlledStorage.setItem(SCHEMA_KEY, '{"version":1}');
    controlledStorage.removeItem(SCHEMA_BACKUP_KEY);

    storageApi.ensureCriticalStorageBackups();

    expect(controlledStorage.getItem(SCHEMA_BACKUP_KEY)).toBe('{"version":1}');
  });
});
