describe('storage error alert handling', () => {
  const STORAGE_ALERT_FLAG_NAME = '__cameraPowerPlannerStorageAlertShown';

  const createControlledStorage = () => {
    const data = new Map();
    let failureError = null;

    const storage = {
      enableFailure(error = new Error('storage failure')) {
        failureError = error;
      },
      disableFailure() {
        failureError = null;
      },
      setItem(key, value) {
        if (failureError) throw failureError;
        data.set(String(key), String(value));
      },
      getItem(key) {
        if (failureError) throw failureError;
        return data.has(String(key)) ? data.get(String(key)) : null;
      },
      removeItem(key) {
        if (failureError) throw failureError;
        data.delete(String(key));
      },
      clear() {
        if (failureError) throw failureError;
        data.clear();
      },
      key(index) {
        if (failureError) throw failureError;
        const keys = Array.from(data.keys());
        return index >= 0 && index < keys.length ? keys[index] : null;
      },
    };

    Object.defineProperty(storage, 'length', {
      configurable: true,
      enumerable: false,
      get() {
        if (failureError) throw failureError;
        return data.size;
      },
    });

    return storage;
  };

  let originalAlert;
  let originalLocalStorageDescriptor;
  let originalSessionStorageDescriptor;
  let originalLocalStorageInstance;
  let originalSessionStorageInstance;
  let originalWindow;
  let hadWindow;
  let win;
  let consoleErrorSpy;
  let consoleWarnSpy;
  let controlledStorage;

  beforeEach(() => {
    jest.resetModules();

    delete global[STORAGE_ALERT_FLAG_NAME];

    hadWindow = Object.prototype.hasOwnProperty.call(global, 'window');
    originalWindow = global.window;
    if (!hadWindow || typeof global.window !== 'object') {
      global.window = {};
    }
    win = global.window;

    controlledStorage = createControlledStorage();

    originalAlert = win.alert;
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

    win.alert = jest.fn();

    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();

    delete global[STORAGE_ALERT_FLAG_NAME];

    if (originalAlert === undefined) {
      delete win.alert;
    } else {
      win.alert = originalAlert;
    }

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

  test('shows the storage alert only once even when failures repeat', () => {
    const { saveDeviceData } = require('../../src/scripts/storage');

    const payload = { cameras: {} };

    controlledStorage.enableFailure(new Error('setItem failed'));

    saveDeviceData(payload);
    saveDeviceData(payload);

    expect(global.window.alert).toHaveBeenCalledTimes(1);
  });
});
