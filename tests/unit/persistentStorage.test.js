const originalStorageDescriptor = Object.getOwnPropertyDescriptor(global.navigator, 'storage');

const resetNavigatorStorage = () => {
  if (originalStorageDescriptor) {
    Object.defineProperty(global.navigator, 'storage', originalStorageDescriptor);
  } else {
    delete global.navigator.storage;
  }
};

describe('requestPersistentStorage', () => {
  beforeEach(() => {
    jest.resetModules();
    resetNavigatorStorage();
  });

  afterEach(() => {
    resetNavigatorStorage();
  });

  test('resolves true when storage is already persistent', async () => {
    const persist = jest.fn().mockResolvedValue(true);
    const persisted = jest.fn().mockResolvedValue(true);
    Object.defineProperty(global.navigator, 'storage', {
      configurable: true,
      value: { persist, persisted }
    });

    const { requestPersistentStorage } = require('../../storage.js');

    await expect(requestPersistentStorage()).resolves.toBe(true);
    expect(persisted).toHaveBeenCalledTimes(1);
    expect(persist).not.toHaveBeenCalled();
  });

  test('requests persistence when not yet granted', async () => {
    const persist = jest.fn().mockResolvedValue(true);
    const persisted = jest.fn().mockResolvedValue(false);
    Object.defineProperty(global.navigator, 'storage', {
      configurable: true,
      value: { persist, persisted }
    });

    const { requestPersistentStorage } = require('../../storage.js');

    await expect(requestPersistentStorage()).resolves.toBe(true);
    expect(persisted).toHaveBeenCalledTimes(1);
    expect(persist).toHaveBeenCalledTimes(1);

    const again = requestPersistentStorage();
    await expect(again).resolves.toBe(true);
    expect(persist).toHaveBeenCalledTimes(1);
  });

  test('fails gracefully when StorageManager API is unavailable', async () => {
    delete global.navigator.storage;

    const { requestPersistentStorage } = require('../../storage.js');

    await expect(requestPersistentStorage()).resolves.toBe(false);
  });

  test('handles errors from persist()', async () => {
    const persist = jest.fn().mockRejectedValue(new Error('nope'));
    const persisted = jest.fn().mockResolvedValue(false);
    Object.defineProperty(global.navigator, 'storage', {
      configurable: true,
      value: { persist, persisted }
    });
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const { requestPersistentStorage } = require('../../storage.js');

    await expect(requestPersistentStorage()).resolves.toBe(false);
    expect(persist).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalled();

    warnSpy.mockRestore();
  });
});
