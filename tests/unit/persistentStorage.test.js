describe('requestPersistentStorage helper', () => {
  let originalNavigator;
  let originalStorageManager;

  beforeEach(() => {
    jest.resetModules();
    originalNavigator = global.navigator;
    if (!originalNavigator) {
      global.navigator = {};
    }
    originalStorageManager = global.navigator.storage;
  });

  afterEach(() => {
    if (originalNavigator) {
      originalNavigator.storage = originalStorageManager;
      global.navigator = originalNavigator;
    } else {
      delete global.navigator;
    }
  });

  test('resolves true without calling persist when already granted', async () => {
    const persisted = jest.fn().mockResolvedValue(true);
    const persist = jest.fn().mockResolvedValue(true);
    global.navigator.storage = { persisted, persist };

    const { requestPersistentStorage } = require('../../storage');

    const result = await requestPersistentStorage();
    expect(result).toBe(true);
    expect(persisted).toHaveBeenCalledTimes(1);
    expect(persist).not.toHaveBeenCalled();
  });

  test('attempts to persist once when permission is not yet granted', async () => {
    const persisted = jest.fn().mockResolvedValue(false);
    const persist = jest.fn().mockResolvedValue(true);
    global.navigator.storage = { persisted, persist };

    const { requestPersistentStorage } = require('../../storage');

    const result = await requestPersistentStorage();
    expect(result).toBe(true);
    expect(persisted).toHaveBeenCalledTimes(1);
    expect(persist).toHaveBeenCalledTimes(1);

    const second = await requestPersistentStorage();
    expect(second).toBe(true);
    expect(persisted).toHaveBeenCalledTimes(1);
    expect(persist).toHaveBeenCalledTimes(1);
  });

  test('logs a warning and resolves false when persistence is rejected', async () => {
    const persisted = jest.fn().mockResolvedValue(false);
    const rejection = new Error('denied');
    const persist = jest.fn().mockRejectedValue(rejection);
    global.navigator.storage = { persisted, persist };
    const warnSpy = jest
      .spyOn(console, 'warn')
      .mockImplementation(() => {});

    const { requestPersistentStorage } = require('../../storage');

    const result = await requestPersistentStorage();
    expect(result).toBe(false);
    expect(persisted).toHaveBeenCalledTimes(1);
    expect(persist).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Persistent storage request was rejected'),
      rejection
    );

    warnSpy.mockRestore();
  });
});

