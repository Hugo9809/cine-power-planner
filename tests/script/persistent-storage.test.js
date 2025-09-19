const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

function stubNavigatorStorage(value) {
  const descriptor = Object.getOwnPropertyDescriptor(window.navigator, 'storage');
  Object.defineProperty(window.navigator, 'storage', {
    configurable: true,
    value
  });
  return () => {
    if (descriptor) {
      Object.defineProperty(window.navigator, 'storage', descriptor);
    } else {
      delete window.navigator.storage;
    }
  };
}

describe('ensurePersistentStorage helper', () => {
  let restoreNavigatorStorage;
  let env;

  afterEach(() => {
    env?.cleanup();
    env = null;
    if (restoreNavigatorStorage) {
      restoreNavigatorStorage();
      restoreNavigatorStorage = null;
    }
  });

  test('skips requesting persistence when already granted', async () => {
    jest.resetModules();
    const persisted = jest.fn().mockResolvedValue(true);
    const persist = jest.fn().mockResolvedValue(true);
    restoreNavigatorStorage = stubNavigatorStorage({ persisted, persist });

    env = setupScriptEnvironment();
    await Promise.resolve();
    await Promise.resolve();
    persisted.mockClear();
    persist.mockClear();

    const { ensurePersistentStorage } = env.utils;
    const result = await ensurePersistentStorage();
    expect(result).toBe(true);
    expect(persisted).toHaveBeenCalledTimes(1);
    expect(persist).not.toHaveBeenCalled();
  });

  test('requests persistence when not already stored', async () => {
    jest.resetModules();
    const persisted = jest.fn().mockResolvedValue(false);
    const persist = jest.fn().mockResolvedValue(true);
    restoreNavigatorStorage = stubNavigatorStorage({ persisted, persist });

    env = setupScriptEnvironment();
    await Promise.resolve();
    await Promise.resolve();
    persisted.mockClear();
    persist.mockClear();

    const { ensurePersistentStorage } = env.utils;
    const result = await ensurePersistentStorage();
    expect(result).toBe(true);
    expect(persisted).toHaveBeenCalledTimes(1);
    expect(persist).toHaveBeenCalledTimes(1);
  });

  test('logs a warning when persistence cannot be granted', async () => {
    jest.resetModules();
    const persisted = jest.fn().mockResolvedValue(false);
    const persist = jest.fn().mockRejectedValue(new Error('denied'));
    restoreNavigatorStorage = stubNavigatorStorage({ persisted, persist });
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    env = setupScriptEnvironment();
    await Promise.resolve();
    await Promise.resolve();
    persisted.mockClear();
    persist.mockClear();
    warnSpy.mockClear();

    const { ensurePersistentStorage } = env.utils;
    const result = await ensurePersistentStorage();
    expect(result).toBe(false);
    expect(persist).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith('Persistent storage request failed', expect.any(Error));

    warnSpy.mockRestore();
  });
});
