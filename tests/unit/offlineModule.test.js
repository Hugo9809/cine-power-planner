const path = require('path');

describe('cineOffline module', () => {
  let offline;

  beforeEach(() => {
    jest.resetModules();
    delete global.cineOffline;
    offline = require(path.join('..', '..', 'src', 'scripts', 'modules', 'offline.js'));
  });

  afterEach(() => {
    delete global.cineOffline;
    jest.resetModules();
  });

  test('exposes a frozen API with registerServiceWorker and reloadApp', () => {
    expect(offline).toBe(global.cineOffline);
    expect(Object.isFrozen(offline)).toBe(true);
    expect(typeof offline.registerServiceWorker).toBe('function');
    expect(typeof offline.reloadApp).toBe('function');
  });

  test('registerServiceWorker defers registration until window load', async () => {
    const register = jest.fn(() => Promise.resolve('ok'));
    const navigatorMock = { serviceWorker: { register } };
    let loadHandler = null;
    const windowMock = {
      document: { readyState: 'loading' },
      addEventListener: jest.fn((event, handler) => {
        if (event === 'load') {
          loadHandler = handler;
        }
      }),
      removeEventListener: jest.fn(),
    };

    const promise = offline.registerServiceWorker('sw.js', {
      window: windowMock,
      navigator: navigatorMock,
    });

    expect(register).not.toHaveBeenCalled();
    expect(windowMock.addEventListener).toHaveBeenCalledWith('load', expect.any(Function), { once: true });

    await loadHandler();
    await promise;

    expect(register).toHaveBeenCalledWith('sw.js', undefined);
  });

  test('reloadApp clears UI caches, unregisters service workers, clears caches and triggers reload', async () => {
    const clearUiCacheStorageEntries = jest.fn();
    global.clearUiCacheStorageEntries = clearUiCacheStorageEntries;

    const unregister = jest.fn(() => Promise.resolve(true));
    const navigatorMock = {
      serviceWorker: {
        getRegistrations: jest.fn(() => Promise.resolve([{ unregister }])),
      },
    };

    const cachesMock = {
      keys: jest.fn(() => Promise.resolve(['primary-cache'])),
      delete: jest.fn(() => Promise.resolve(true)),
    };

    const reloadWindow = jest.fn(() => true);

    const result = await offline.reloadApp({
      navigator: navigatorMock,
      caches: cachesMock,
      reloadWindow,
    });

    expect(clearUiCacheStorageEntries).toHaveBeenCalledTimes(1);
    expect(navigatorMock.serviceWorker.getRegistrations).toHaveBeenCalledTimes(1);
    expect(unregister).toHaveBeenCalledTimes(1);
    expect(cachesMock.keys).toHaveBeenCalledTimes(1);
    expect(cachesMock.delete).toHaveBeenCalledWith('primary-cache');
    expect(reloadWindow).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      uiCacheCleared: true,
      serviceWorkersUnregistered: true,
      cachesCleared: true,
      reloadTriggered: true,
    });

    delete global.clearUiCacheStorageEntries;
  });
});
