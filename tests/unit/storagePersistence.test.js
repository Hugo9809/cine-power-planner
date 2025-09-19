describe('requestPersistentStorage helper', () => {
  let originalNavigator;
  let originalWindowLocalStorage;
  let originalWindowSessionStorage;
  let warnSpy;
  let createdWindow;

  beforeEach(() => {
    jest.resetModules();
    originalNavigator = typeof global.navigator === 'undefined' ? undefined : global.navigator;
    createdWindow = typeof window === 'undefined';
    if (createdWindow) {
      global.window = {};
    }
    originalWindowLocalStorage = Object.getOwnPropertyDescriptor(global.window, 'localStorage');
    originalWindowSessionStorage = Object.getOwnPropertyDescriptor(global.window, 'sessionStorage');
    Object.defineProperty(global.window, 'localStorage', {
      configurable: true,
      value: global.localStorage,
    });
    Object.defineProperty(global.window, 'sessionStorage', {
      configurable: true,
      value: global.sessionStorage,
    });
    global.localStorage.clear();
    global.sessionStorage.clear();
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    warnSpy.mockRestore();
    if (originalNavigator === undefined) {
      delete global.navigator;
    } else {
      global.navigator = originalNavigator;
    }
    if (originalWindowLocalStorage) {
      Object.defineProperty(global.window, 'localStorage', originalWindowLocalStorage);
    } else {
      delete global.window.localStorage;
    }
    if (originalWindowSessionStorage) {
      Object.defineProperty(global.window, 'sessionStorage', originalWindowSessionStorage);
    } else {
      delete global.window.sessionStorage;
    }
    if (createdWindow) {
      delete global.window;
    }
    jest.resetModules();
  });

  test('resolves unsupported result when StorageManager API is missing', async () => {
    delete global.navigator;
    const { requestPersistentStorage } = require('../../storage');
    await expect(requestPersistentStorage()).resolves.toEqual({
      supported: false,
      persisted: false,
      granted: false,
    });
  });

  test('skips requesting persistence when storage is already persisted', async () => {
    const persisted = jest.fn().mockResolvedValue(true);
    const persist = jest.fn().mockResolvedValue(true);
    global.navigator = {
      storage: {
        persisted,
        persist,
      },
    };
    const { requestPersistentStorage } = require('../../storage');
    const result = await requestPersistentStorage();
    expect(persisted).toHaveBeenCalledTimes(1);
    expect(persist).not.toHaveBeenCalled();
    expect(result).toEqual({ supported: true, persisted: true, granted: true });
  });

  test('requests persistence once and shares the resolved result', async () => {
    const persisted = jest.fn().mockResolvedValue(false);
    const persist = jest.fn().mockResolvedValue(true);
    global.navigator = {
      storage: {
        persisted,
        persist,
      },
    };
    const { requestPersistentStorage } = require('../../storage');
    const first = await requestPersistentStorage();
    const second = await requestPersistentStorage();
    expect(persisted).toHaveBeenCalledTimes(1);
    expect(persist).toHaveBeenCalledTimes(1);
    expect(first).toEqual({ supported: true, persisted: true, granted: true });
    expect(second).toBe(first);
  });

  test('re-checks persistence when the browser denies the request', async () => {
    const persisted = jest
      .fn()
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(true);
    const persist = jest.fn().mockResolvedValue(false);
    global.navigator = {
      storage: {
        persisted,
        persist,
      },
    };
    const { requestPersistentStorage } = require('../../storage');
    const status = await requestPersistentStorage();
    expect(persisted).toHaveBeenCalledTimes(2);
    expect(persist).toHaveBeenCalledTimes(1);
    expect(status).toEqual({ supported: true, persisted: true, granted: false });
  });

  test('handles persistence rejection gracefully', async () => {
    const persist = jest.fn().mockRejectedValue(new Error('nope'));
    global.navigator = {
      storage: {
        persist,
      },
    };
    const { requestPersistentStorage } = require('../../storage');
    const status = await requestPersistentStorage();
    expect(persist).toHaveBeenCalledTimes(1);
    expect(status).toEqual({ supported: true, persisted: false, granted: false });
  });
});
