const originalConsoleWarn = console.warn;
const originalWindow = global.window;
const originalNavigator = global.navigator;

describe('requestPersistentStorage', () => {
  beforeEach(() => {
    jest.resetModules();
    delete global.navigator;
    delete global.window;
    console.warn = jest.fn();
  });

  afterEach(() => {
    console.warn = originalConsoleWarn;
    if (typeof originalNavigator !== 'undefined') {
      global.navigator = originalNavigator;
    } else {
      delete global.navigator;
    }
    if (typeof originalWindow !== 'undefined') {
      global.window = originalWindow;
    } else {
      delete global.window;
    }
  });

  test('resolves unsupported when StorageManager is unavailable', async () => {
    const { requestPersistentStorage } = require('../../src/scripts/storage');
    const result = await requestPersistentStorage();
    expect(result).toEqual(
      expect.objectContaining({
        supported: false,
        granted: false,
        alreadyGranted: false,
      })
    );
  });

  test('resolves unsupported when persist method is missing', async () => {
    global.navigator = {
      storage: {},
    };
    const { requestPersistentStorage } = require('../../src/scripts/storage');
    const result = await requestPersistentStorage();
    expect(result).toEqual(
      expect.objectContaining({
        supported: false,
        granted: false,
        alreadyGranted: false,
      })
    );
  });

  test('skips persist request when already granted', async () => {
    const persisted = jest.fn(() => Promise.resolve(true));
    const persist = jest.fn(() => Promise.resolve(false));
    global.navigator = {
      storage: {
        persisted,
        persist,
      },
    };
    const { requestPersistentStorage } = require('../../src/scripts/storage');
    const result = await requestPersistentStorage();
    expect(persist).not.toHaveBeenCalled();
    expect(result).toEqual(
      expect.objectContaining({
        supported: true,
        granted: true,
        alreadyGranted: true,
      })
    );
  });

  test('requests persistence when needed and caches the result', async () => {
    const persisted = jest.fn(() => Promise.resolve(false));
    const persist = jest.fn(() => Promise.resolve(true));
    global.navigator = {
      storage: {
        persisted,
        persist,
      },
    };
    const { requestPersistentStorage } = require('../../src/scripts/storage');
    const first = await requestPersistentStorage();
    expect(persist).toHaveBeenCalledTimes(1);
    expect(first).toEqual(
      expect.objectContaining({
        supported: true,
        granted: true,
        alreadyGranted: false,
      })
    );
    const second = await requestPersistentStorage();
    expect(persist).toHaveBeenCalledTimes(1);
    expect(second).toBe(first);
  });

  test('captures errors when persist rejects', async () => {
    const error = new Error('denied');
    const persisted = jest.fn(() => Promise.resolve(false));
    const persist = jest.fn(() => Promise.reject(error));
    global.navigator = {
      storage: {
        persisted,
        persist,
      },
    };
    const { requestPersistentStorage } = require('../../src/scripts/storage');
    const result = await requestPersistentStorage();
    expect(result.supported).toBe(true);
    expect(result.granted).toBe(false);
    expect(result.alreadyGranted).toBe(false);
    expect(result.error).toBe(error);
  });

  test('retries when persistent storage support becomes available later', async () => {
    const { requestPersistentStorage } = require('../../src/scripts/storage');
    const first = await requestPersistentStorage();
    expect(first.supported).toBe(false);
    expect(first.granted).toBe(false);

    const persisted = jest.fn(() => Promise.resolve(false));
    const persist = jest.fn(() => Promise.resolve(true));
    global.navigator = {
      storage: {
        persisted,
        persist,
      },
    };

    const second = await requestPersistentStorage();
    expect(persist).toHaveBeenCalledTimes(1);
    expect(second.supported).toBe(true);
    expect(second.granted).toBe(true);
    expect(second.alreadyGranted).toBe(false);
  });

  test('allows retry after a denied persistent storage request', async () => {
    const persisted = jest.fn(() => Promise.resolve(false));
    const persist = jest.fn(() => Promise.resolve(false));
    global.navigator = {
      storage: {
        persisted,
        persist,
      },
    };

    const { requestPersistentStorage } = require('../../src/scripts/storage');
    const first = await requestPersistentStorage();
    expect(persist).toHaveBeenCalledTimes(1);
    expect(first.granted).toBe(false);
    expect(first.alreadyGranted).toBe(false);

    persist.mockImplementationOnce(() => Promise.resolve(true));

    const second = await requestPersistentStorage();
    expect(persist).toHaveBeenCalledTimes(2);
    expect(second.granted).toBe(true);
    expect(second.alreadyGranted).toBe(false);
  });
});
