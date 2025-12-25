const path = require('path');

const { setupModuleHarness } = require('../helpers/moduleHarness');

describe('cineOffline module', () => {
  let offline;
  let internal;
  let consoleWarnSpy;
  let harness;
  let originalConsole;

  beforeEach(() => {
    harness = setupModuleHarness();
    delete global.cineOffline;
    delete global.CINE_CACHE_NAME;
    originalConsole = console;
    consoleWarnSpy = jest.fn();
    const consoleClone = Object.create(console);
    consoleClone.warn = consoleWarnSpy;
    global.console = consoleClone;

    global.BroadcastChannel = jest.fn(() => ({
      postMessage: jest.fn(),
      close: jest.fn(),
    }));

    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve({}),
      text: () => Promise.resolve(''),
    }));

    offline = require(path.join('..', '..', 'src', 'scripts', 'modules', 'offline.js'));
    internal = offline.__internal;
  });

  afterEach(() => {
    delete global.cineOffline;
    delete global.CINE_CACHE_NAME;
    delete global.clearUiCacheStorageEntries;
    delete global.BroadcastChannel;
    delete global.fetch;
    if (originalConsole) {
      global.console = originalConsole;
      originalConsole = null;
    }
    consoleWarnSpy = null;
    if (global.window) {
      delete global.window;
    }
    if (harness) {
      harness.teardown();
      harness = null;
    }
    jest.clearAllTimers();
    jest.useRealTimers();
  });



  function createWindowWithLocation(href = 'https://example.test/app/index.html', extras = {}) {
    const url = new URL(href);

    return {
      location: {
        href: url.toString(),
        origin: url.origin,
        pathname: url.pathname,
        search: url.search,
        hash: url.hash,
      },
      ...extras,
    };
  }

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
    expect(loadHandler).toEqual(expect.any(Function));

    await loadHandler();
    await promise;

    expect(register).toHaveBeenCalledWith('sw.js', undefined);
    expect(windowMock.removeEventListener).toHaveBeenCalledWith('load', loadHandler);
  });

  test('registerServiceWorker retries registration on a new invocation after a rejection', async () => {
    const firstError = new Error('fail');
    const register = jest
      .fn()
      .mockImplementationOnce(() => Promise.reject(firstError))
      .mockImplementationOnce(() => Promise.resolve('ok'));

    const navigatorMock = { serviceWorker: { register } };
    const windowMock = {
      document: { readyState: 'complete' },
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };

    await expect(
      offline.registerServiceWorker('sw.js', {
        window: windowMock,
        navigator: navigatorMock,
      })
    ).rejects.toBe(firstError);

    await expect(
      offline.registerServiceWorker('sw.js', {
        window: windowMock,
        navigator: navigatorMock,
      })
    ).resolves.toBe('ok');

    expect(register).toHaveBeenCalledTimes(2);
  });

  test('reloadApp clears UI caches, unregisters service workers, clears caches, warms reload navigation and triggers reload', async () => {
    const clearUiCacheStorageEntries = jest.fn();
    global.clearUiCacheStorageEntries = clearUiCacheStorageEntries;

    const unregister = jest.fn(() => Promise.resolve(true));
    const navigatorMock = {
      serviceWorker: {
        getRegistrations: jest.fn(() => Promise.resolve([{ unregister }])),
      },
    };

    const cacheKey = 'cine-power-planner-primary';
    const cachesMock = {
      keys: jest.fn(() => Promise.resolve([cacheKey])),
      delete: jest.fn(() => Promise.resolve(true)),
    };

    const responseClone = { bodyUsed: false, text: jest.fn(() => Promise.resolve('<html></html>')) };
    const fetchMock = jest.fn(() =>
      Promise.resolve({
        ok: true,
        bodyUsed: false,
        text: jest.fn(() => Promise.resolve('<html></html>')),
        clone: jest.fn(() => responseClone),
      }),
    );

    const reloadWindow = jest.fn(() => true);

    const windowMock = {
      location: {
        href: 'https://example.test/app?foo=bar',
        replace: jest.fn(),
        assign: jest.fn(),
        reload: jest.fn(),
      },
    };

    const result = await offline.reloadApp({
      navigator: navigatorMock,
      caches: cachesMock,
      fetch: fetchMock,
      window: windowMock,
      reloadWindow,
      cleanupTimeoutMs: 10,
      connectivityProbeTimeoutMs: 10,
      warmupWaitMs: 10,
    });

    expect(clearUiCacheStorageEntries).toHaveBeenCalledTimes(1);
    expect(navigatorMock.serviceWorker.getRegistrations).toHaveBeenCalledTimes(1);
    expect(unregister).toHaveBeenCalledTimes(1);
    expect(cachesMock.keys).toHaveBeenCalledTimes(1);
    expect(cachesMock.delete).toHaveBeenCalledWith(cacheKey);
    expect(reloadWindow).toHaveBeenCalledTimes(1);

    await new Promise(resolve => setTimeout(resolve, 250));

    expect(fetchMock).toHaveBeenCalledTimes(2);

    const warmupUrl = fetchMock.mock.calls[1][0];
    expect(warmupUrl).toMatch(/^\/app\?foo=bar&forceReload=/);

    const reloadArgs = reloadWindow.mock.calls[0];
    expect(reloadArgs[1]).toEqual(
      expect.objectContaining({
        nextHref: expect.stringMatching(/^https:\/\/example\.test\/app\?foo=bar&forceReload=/),
      }),
    );

    expect(result).toEqual(
      expect.objectContaining({
        uiCacheCleared: true,
        serviceWorkersUnregistered: true,
        cachesCleared: true,
        reloadTriggered: true,
        navigationTriggered: true,
      }),
    );

    delete global.clearUiCacheStorageEntries;
  });

  test('reloadApp does not clear caches or service workers when navigator reports offline', async () => {
    const clearUiCacheStorageEntries = jest.fn();
    global.clearUiCacheStorageEntries = clearUiCacheStorageEntries;

    const unregister = jest.fn(() => Promise.resolve(true));
    const navigatorMock = {
      onLine: false,
      serviceWorker: {
        getRegistrations: jest.fn(() => Promise.resolve([{ unregister }])),
      },
    };

    const cachesMock = {
      keys: jest.fn(() => Promise.resolve(['cine-power-planner-primary'])),
      delete: jest.fn(() => Promise.resolve(true)),
    };

    const reloadWindow = jest.fn();
    const notifyOffline = jest.fn();

    const result = await offline.reloadApp({
      navigator: navigatorMock,
      caches: cachesMock,
      window: {},
      reloadWindow,
      onOfflineReloadBlocked: notifyOffline,
      cleanupTimeoutMs: 10,
      connectivityProbeTimeoutMs: 10,
      warmupWaitMs: 10,
    });

    expect(notifyOffline).toHaveBeenCalledTimes(1);
    expect(clearUiCacheStorageEntries).not.toHaveBeenCalled();
    expect(navigatorMock.serviceWorker.getRegistrations).not.toHaveBeenCalled();
    expect(cachesMock.keys).not.toHaveBeenCalled();
    expect(reloadWindow).not.toHaveBeenCalled();
    expect(result).toEqual(
      expect.objectContaining({
        blocked: true,
        reason: 'offline',
        reloadTriggered: false,
        navigationTriggered: false,
        uiCacheCleared: false,
        cachesCleared: false,
      }),
    );

    delete global.clearUiCacheStorageEntries;
  });

  test('reloadApp keeps caches when connectivity probe fails hard', async () => {
    const clearUiCacheStorageEntries = jest.fn();
    global.clearUiCacheStorageEntries = clearUiCacheStorageEntries;

    const unregister = jest.fn(() => Promise.resolve(true));
    const navigatorMock = {
      onLine: true,
      serviceWorker: {
        getRegistrations: jest.fn(() => Promise.resolve([{ unregister }])),
      },
    };

    const cachesMock = {
      keys: jest.fn(() => Promise.resolve(['cine-power-planner-primary'])),
      delete: jest.fn(() => Promise.resolve(true)),
    };

    const fetchError = new TypeError('Network unreachable');
    const fetchMock = jest.fn(() => Promise.reject(fetchError));

    const reloadWindow = jest.fn();
    const notifyOffline = jest.fn();

    const result = await offline.reloadApp({
      navigator: navigatorMock,
      caches: cachesMock,
      fetch: fetchMock,
      window: {},
      reloadWindow,
      onOfflineReloadBlocked: notifyOffline,
      cleanupTimeoutMs: 10,
      connectivityProbeTimeoutMs: 10,
      warmupWaitMs: 10,
    });

    expect(fetchMock).toHaveBeenCalled();
    expect(notifyOffline).toHaveBeenCalledWith({ reason: 'unreachable', source: 'reloadApp' });
    expect(clearUiCacheStorageEntries).not.toHaveBeenCalled();
    expect(navigatorMock.serviceWorker.getRegistrations).not.toHaveBeenCalled();
    expect(cachesMock.keys).not.toHaveBeenCalled();
    expect(reloadWindow).not.toHaveBeenCalled();
    expect(result).toEqual(
      expect.objectContaining({
        blocked: true,
        reason: 'unreachable',
        reloadTriggered: false,
        navigationTriggered: false,
        uiCacheCleared: false,
        cachesCleared: false,
      }),
    );

    delete global.clearUiCacheStorageEntries;
  });

  test('reloadApp blocks when connectivity probe is satisfied by cached fallback', async () => {
    const clearUiCacheStorageEntries = jest.fn();
    global.clearUiCacheStorageEntries = clearUiCacheStorageEntries;

    const unregister = jest.fn(() => Promise.resolve(true));
    const navigatorMock = {
      onLine: true,
      serviceWorker: {
        getRegistrations: jest.fn(() => Promise.resolve([{ unregister }])),
      },
    };

    const cachesMock = {
      keys: jest.fn(() => Promise.resolve(['cine-power-planner-primary'])),
      delete: jest.fn(() => Promise.resolve(true)),
    };

    const buildFallbackResponse = () => ({
      ok: true,
      status: 200,
      headers: {
        get: name => (name && name.toLowerCase() === 'x-cine-connectivity-probe-result' ? 'fallback' : null),
      },
    });

    const fetchMock = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve(buildFallbackResponse()))
      .mockImplementationOnce(() => Promise.resolve(buildFallbackResponse()));

    const reloadWindow = jest.fn();
    const notifyOffline = jest.fn();

    const result = await offline.reloadApp({
      navigator: navigatorMock,
      caches: cachesMock,
      fetch: fetchMock,
      window: {},
      reloadWindow,
      onOfflineReloadBlocked: notifyOffline,
      cleanupTimeoutMs: 10,
      connectivityProbeTimeoutMs: 10,
      warmupWaitMs: 10,
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(notifyOffline).toHaveBeenCalledWith({ reason: 'cache-fallback', source: 'reloadApp' });
    expect(clearUiCacheStorageEntries).not.toHaveBeenCalled();
    expect(navigatorMock.serviceWorker.getRegistrations).not.toHaveBeenCalled();
    expect(cachesMock.keys).not.toHaveBeenCalled();
    expect(reloadWindow).not.toHaveBeenCalled();
    expect(result).toEqual(
      expect.objectContaining({
        blocked: true,
        reason: 'cache-fallback',
        reloadTriggered: false,
        navigationTriggered: false,
        uiCacheCleared: false,
        cachesCleared: false,
      }),
    );

    delete global.clearUiCacheStorageEntries;
  });

  test('reloadApp blocks when connectivity probe receives HTTP errors', async () => {
    const clearUiCacheStorageEntries = jest.fn();
    global.clearUiCacheStorageEntries = clearUiCacheStorageEntries;

    const unregister = jest.fn(() => Promise.resolve(true));
    const navigatorMock = {
      onLine: true,
      serviceWorker: {
        getRegistrations: jest.fn(() => Promise.resolve([{ unregister }])),
      },
    };

    const cachesMock = {
      keys: jest.fn(() => Promise.resolve(['cine-power-planner-primary'])),
      delete: jest.fn(() => Promise.resolve(true)),
    };

    const headResponse = { ok: false, status: 503 };
    const getResponse = { ok: false, status: 503 };
    const fetchMock = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve(headResponse))
      .mockImplementationOnce(() => Promise.resolve(getResponse));

    const reloadWindow = jest.fn();
    const notifyOffline = jest.fn();

    const result = await offline.reloadApp({
      navigator: navigatorMock,
      caches: cachesMock,
      fetch: fetchMock,
      window: {},
      reloadWindow,
      onOfflineReloadBlocked: notifyOffline,
      cleanupTimeoutMs: 10,
      connectivityProbeTimeoutMs: 10,
      warmupWaitMs: 10,
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(notifyOffline).toHaveBeenCalledWith({ reason: 'get-failed', source: 'reloadApp' });
    expect(clearUiCacheStorageEntries).not.toHaveBeenCalled();
    expect(navigatorMock.serviceWorker.getRegistrations).not.toHaveBeenCalled();
    expect(cachesMock.keys).not.toHaveBeenCalled();
    expect(reloadWindow).not.toHaveBeenCalled();
    expect(result).toEqual(
      expect.objectContaining({
        blocked: true,
        reason: 'get-failed',
        reloadTriggered: false,
        navigationTriggered: false,
        uiCacheCleared: false,
        cachesCleared: false,
      }),
    );

    delete global.clearUiCacheStorageEntries;
  });

  test('reloadApp begins querying service worker registrations before clearing UI caches completes', async () => {
    const clearUiCacheStorageEntries = jest.fn();
    global.clearUiCacheStorageEntries = clearUiCacheStorageEntries;

    const unregister = jest.fn(() => Promise.resolve(true));
    const navigatorMock = {
      serviceWorker: {
        getRegistrations: jest.fn(() => Promise.resolve([{ unregister }])),
      },
    };

    const cachesMock = {
      keys: jest.fn(() => Promise.resolve([])),
    };

    const responseClone = { bodyUsed: false, text: jest.fn(() => Promise.resolve('<html></html>')) };
    const fetchMock = jest.fn(() =>
      Promise.resolve({
        ok: true,
        bodyUsed: false,
        text: jest.fn(() => Promise.resolve('<html></html>')),
        clone: jest.fn(() => responseClone),
      }),
    );

    const reloadWindow = jest.fn(() => true);

    const windowMock = {
      location: {
        href: 'https://example.test/app',
        replace: jest.fn(),
        assign: jest.fn(),
        reload: jest.fn(),
      },
    };

    try {
      const reloadPromise = offline.reloadApp({
        navigator: navigatorMock,
        caches: cachesMock,
        fetch: fetchMock,
        window: windowMock,
        reloadWindow,
        cleanupTimeoutMs: 10,
        connectivityProbeTimeoutMs: 10,
        warmupWaitMs: 10,
      });

      // Allow async probe to complete
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(navigatorMock.serviceWorker.getRegistrations).toHaveBeenCalledTimes(1);
      expect(clearUiCacheStorageEntries).toHaveBeenCalledTimes(1);
      expect(navigatorMock.serviceWorker.getRegistrations.mock.invocationCallOrder[0]).toBeLessThan(
        clearUiCacheStorageEntries.mock.invocationCallOrder[0],
      );

      await reloadPromise;
      await new Promise(resolve => setTimeout(resolve, 250));
    } finally {
      delete global.clearUiCacheStorageEntries;
    }
  });

  test('reloadApp resolves when controllerchange fires and removes listener', async () => {
    let controllerHandler = null;
    const addEventListener = jest.fn((event, handler) => {
      if (event === 'controllerchange') {
        controllerHandler = handler;
      }
    });
    const removeEventListener = jest.fn();
    let resolveRegistrations;
    const registrationsPromise = new Promise(resolve => {
      resolveRegistrations = resolve;
    });

    const navigatorMock = {
      serviceWorker: {
        controller: null,
        addEventListener,
        removeEventListener,
        getRegistrations: jest.fn(() => registrationsPromise),
      },
    };

    const cachesMock = {
      keys: jest.fn(() => Promise.resolve([])),
    };

    const responseClone = { bodyUsed: false, text: jest.fn(() => Promise.resolve('<html></html>')) };
    const fetchMock = jest.fn(() =>
      Promise.resolve({
        ok: true,
        bodyUsed: false,
        text: jest.fn(() => Promise.resolve('<html></html>')),
        clone: jest.fn(() => responseClone),
      }),
    );

    const reloadWindow = jest.fn(() => true);

    const windowMock = {
      location: {
        href: 'https://example.test/app',
        replace: jest.fn(),
        assign: jest.fn(),
        reload: jest.fn(),
      },
    };

    const reloadPromise = offline.reloadApp({
      navigator: navigatorMock,
      caches: cachesMock,
      fetch: fetchMock,
      window: windowMock,
      reloadWindow,
      cleanupTimeoutMs: 10,
      connectivityProbeTimeoutMs: 10,
      warmupWaitMs: 10,
    });

    // Allow async probe to complete and listener to be attached
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(addEventListener).toHaveBeenCalledWith('controllerchange', expect.any(Function));
    expect(controllerHandler).toEqual(expect.any(Function));

    controllerHandler();

    expect(removeEventListener).toHaveBeenCalledWith('controllerchange', controllerHandler);

    const result = await reloadPromise;

    resolveRegistrations([]);

    expect(reloadWindow).toHaveBeenCalledTimes(1);
    expect(result).toEqual(
      expect.objectContaining({
        serviceWorkerStatusKnown: true,
      }),
    );
    expect(removeEventListener).toHaveBeenCalledTimes(1);
  });

  test('reload warmup retries with cached response when reload fetch fails', async () => {
    jest.useFakeTimers();

    try {
      const responseClone = { bodyUsed: false, text: jest.fn(() => Promise.resolve('<html></html>')) };
      const warmupResponse = {
        ok: true,
        bodyUsed: false,
        text: jest.fn(() => Promise.resolve('<html></html>')),
        clone: jest.fn(() => responseClone),
      };

      const fetchError = new TypeError('Load failed');
      const fetchMock = jest
        .fn()
        .mockImplementationOnce(() => Promise.reject(fetchError))
        .mockImplementationOnce(() => Promise.resolve(warmupResponse));

      const warmupHandle = internal.scheduleReloadWarmup({
        fetch: fetchMock,
        nextHref: 'https://example.test/app?foo=bar',
        navigator: { onLine: true },
        window: createWindowWithLocation('https://example.test/app?foo=bar'),
        serviceWorkerPromise: Promise.resolve(true),
        cachePromise: Promise.resolve(true),
        allowCache: true,
        warmupWaitMs: 100,
      });

      expect(warmupHandle).not.toBeNull();
      await warmupHandle.promise;

      jest.runOnlyPendingTimers();

      expect(fetchMock).toHaveBeenCalledTimes(2);

      const cacheModes = fetchMock.mock.calls.map(call => call[1]?.cache);
      expect(cacheModes).toEqual(['reload', 'no-cache']);
      const firstCallInit = fetchMock.mock.calls[0][1];
      expect(firstCallInit.cache).toBe('reload');
      expect(firstCallInit.credentials).toBe('same-origin');
      expect(firstCallInit.mode).toBe('same-origin');
      expect(firstCallInit.redirect).toBe('follow');

      const secondCallInit = fetchMock.mock.calls[1][1];
      expect(secondCallInit.cache).toBe('no-cache');
      expect(secondCallInit.credentials).toBe('same-origin');
      expect(secondCallInit.mode).toBe('same-origin');
      expect(secondCallInit.redirect).toBe('follow');

      const warmupWarnings = consoleWarnSpy.mock.calls.filter(call => call[0] === 'Reload warmup fetch failed');
      expect(warmupWarnings).toHaveLength(0);
    } finally {
      jest.useRealTimers();
    }
  });

  test('coerceForceReloadUrlDescriptor normalises cross-origin descriptors to the current origin', () => {
    const locationLike = {
      href: 'https://example.test/app/index.html',
      origin: 'https://example.test',
      pathname: '/app/index.html',
    };

    const descriptor = {
      originalHref: 'https://remote.example/app/index.html',
      nextHref: 'https://remote.example/app/index.html?forceReload=abc',
      param: 'forceReload',
      timestamp: 'abc',
    };

    const result = internal.coerceForceReloadUrlDescriptor(locationLike, descriptor, 'forceReload');

    expect(result.nextHref).toBe('https://example.test/app/index.html?forceReload=abc');

    const noNextHrefDescriptor = {
      originalHref: 'https://remote.example/app/index.html',
      param: 'forceReload',
      timestamp: 'xyz',
    };

    const resultWithoutNext = internal.coerceForceReloadUrlDescriptor(
      locationLike,
      noNextHrefDescriptor,
      'forceReload',
    );

    expect(resultWithoutNext.nextHref).toBe('https://example.test/app/index.html');
  });

  test('reload warmup suppresses warning when both fetch attempts fail with load failure', async () => {
    jest.useFakeTimers();

    try {
      const fetchMock = jest.fn(() => Promise.reject(new TypeError('Load failed')));

      const warmupHandle = internal.scheduleReloadWarmup({
        fetch: fetchMock,
        nextHref: 'https://example.test/app?foo=bar',
        navigator: { onLine: true },
        window: createWindowWithLocation('https://example.test/app?foo=bar'),
        serviceWorkerPromise: Promise.resolve(true),
        cachePromise: Promise.resolve(true),
        allowCache: true,
        warmupWaitMs: 100,
      });

      expect(warmupHandle).not.toBeNull();
      await expect(warmupHandle.promise).resolves.toBe(false);

      jest.runOnlyPendingTimers();

      expect(fetchMock).toHaveBeenCalledTimes(4);

      const warmupWarnings = consoleWarnSpy.mock.calls.filter(call => call[0] === 'Reload warmup fetch failed');
      expect(warmupWarnings).toHaveLength(0);
    } finally {
      jest.useRealTimers();
    }
  });

  test('scheduleReloadWarmup relies on XHR path for standalone Apple browser without Safari token', async () => {
    class MockXMLHttpRequest {
      constructor() {
        this.eventHandlers = {};
        this.status = 204;
        this.withCredentials = false;
        this.responseType = 'text';
      }

      addEventListener(event, handler) {
        this.eventHandlers[event] = handler;
      }

      open() { }

      setRequestHeader() { }

      send() {
        if (this.eventHandlers.load) {
          this.eventHandlers.load();
        }
      }
    }

    const navigatorMock = {
      vendor: 'Apple Computer, Inc.',
      userAgent:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 16_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko)',
      standalone: true,
      onLine: true,
    };

    const windowMock = {
      navigator: navigatorMock,
      location: {
        href: 'https://example.test/app/index.html',
        origin: 'https://example.test',
        pathname: '/app/index.html',
        search: '',
        hash: '',
      },
      matchMedia: jest.fn(() => ({ matches: false })),
      XMLHttpRequest: MockXMLHttpRequest,
    };

    const fetchMock = jest.fn(() =>
      Promise.resolve({
        ok: true,
        bodyUsed: false,
        text: jest.fn(() => Promise.resolve('<html></html>')),
        clone: jest.fn(() => ({
          bodyUsed: false,
          text: jest.fn(() => Promise.resolve('<html></html>')),
        })),
      }),
    );

    const warmupHandle = internal.scheduleReloadWarmup({
      fetch: fetchMock,
      nextHref: 'https://example.test/app/index.html?forceReload=token',
      navigator: navigatorMock,
      window: windowMock,
      serviceWorkerPromise: Promise.resolve(true),
      cachePromise: Promise.resolve(true),
      allowCache: false,
    });

    expect(warmupHandle).not.toBeNull();
    await expect(warmupHandle.promise).resolves.toBe(true);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  test('scheduleReloadWarmup prefers XHR for Safari user agent without Safari token hints', async () => {
    class MockXMLHttpRequest {
      constructor() {
        this.eventHandlers = {};
        this.status = 200;
        this.withCredentials = false;
        this.responseType = 'text';
      }

      addEventListener(event, handler) {
        this.eventHandlers[event] = handler;
      }

      open() { }

      setRequestHeader() { }

      send() {
        if (this.eventHandlers.load) {
          this.eventHandlers.load();
        }
      }
    }

    const navigatorMock = {
      vendor: 'Apple Computer, Inc.',
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 15_0) AppleWebKit/617.1.26 (KHTML, like Gecko) Version/18.0',
      onLine: true,
    };

    const windowMock = {
      navigator: navigatorMock,
      location: {
        href: 'https://example.test/app/index.html',
        origin: 'https://example.test',
        pathname: '/app/index.html',
        search: '',
        hash: '',
      },
      matchMedia: jest.fn(() => ({ matches: false })),
      XMLHttpRequest: MockXMLHttpRequest,
    };

    const fetchMock = jest.fn(() =>
      Promise.resolve({
        ok: true,
        bodyUsed: false,
        text: jest.fn(() => Promise.resolve('<html></html>')),
        clone: jest.fn(() => ({
          bodyUsed: false,
          text: jest.fn(() => Promise.resolve('<html></html>')),
        })),
      }),
    );

    const warmupHandle = internal.scheduleReloadWarmup({
      fetch: fetchMock,
      nextHref: 'https://example.test/app/index.html?forceReload=token',
      navigator: navigatorMock,
      window: windowMock,
      serviceWorkerPromise: Promise.resolve(true),
      cachePromise: Promise.resolve(true),
      allowCache: false,
    });

    expect(warmupHandle).not.toBeNull();
    await expect(warmupHandle.promise).resolves.toBe(true);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  test('scheduleReloadWarmup waits for service worker and cache readiness concurrently', async () => {
    jest.useFakeTimers();

    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    try {
      setTimeoutSpy.mockClear();

      const navigatorMock = { onLine: true };
      const windowMock = {
        location: {
          href: 'https://example.test/app/index.html',
          origin: 'https://example.test',
          pathname: '/app/index.html',
          search: '',
          hash: '',
        },
      };

      const fetchMock = jest.fn(() =>
        Promise.resolve({
          ok: true,
          bodyUsed: false,
          text: jest.fn(() => Promise.resolve('<html></html>')),
          clone: jest.fn(() => ({
            bodyUsed: false,
            text: jest.fn(() => Promise.resolve('<html></html>')),
          })),
        }),
      );

      const warmupHandle = internal.scheduleReloadWarmup({
        fetch: fetchMock,
        nextHref: 'https://example.test/app/index.html?forceReload=token',
        navigator: navigatorMock,
        window: windowMock,
        serviceWorkerPromise: new Promise(() => { }),
        cachePromise: new Promise(() => { }),
        allowCache: false,
        warmupWaitMs: 180,
      });

      expect(warmupHandle).not.toBeNull();

      await Promise.resolve();

      expect(setTimeoutSpy.mock.calls.length).toBeGreaterThanOrEqual(2);
      expect(setTimeoutSpy.mock.calls[0][1]).toBe(setTimeoutSpy.mock.calls[1][1]);

      if (typeof jest.getTimerCount === 'function') {
        expect(jest.getTimerCount()).toBeGreaterThanOrEqual(2);
      }

      jest.advanceTimersByTime(200);

      await expect(warmupHandle.promise).resolves.toBe(true);
    } finally {
      setTimeoutSpy.mockRestore();
      jest.useRealTimers();
    }
  });

  test('scheduleReloadWarmup uses Safari path when vendor string is empty', async () => {
    class MockXMLHttpRequest {
      constructor() {
        this.eventHandlers = {};
        this.status = 204;
        this.withCredentials = false;
        this.responseType = 'text';
      }

      addEventListener(event, handler) {
        this.eventHandlers[event] = handler;
      }

      open() { }

      setRequestHeader() { }

      send() {
        if (this.eventHandlers.load) {
          this.eventHandlers.load();
        }
      }
    }

    const navigatorMock = {
      vendor: '',
      userAgent:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 16_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Mobile/15E148 Safari/604.1',
      standalone: false,
      onLine: true,
    };

    const windowMock = {
      navigator: navigatorMock,
      location: {
        href: 'https://example.test/app/index.html',
        origin: 'https://example.test',
        pathname: '/app/index.html',
        search: '',
        hash: '',
      },
      matchMedia: jest.fn(() => ({ matches: false })),
      XMLHttpRequest: MockXMLHttpRequest,
    };

    const fetchMock = jest.fn(() =>
      Promise.resolve({
        ok: true,
        bodyUsed: false,
        text: jest.fn(() => Promise.resolve('<html></html>')),
        clone: jest.fn(() => ({
          bodyUsed: false,
          text: jest.fn(() => Promise.resolve('<html></html>')),
        })),
      }),
    );

    const warmupHandle = internal.scheduleReloadWarmup({
      fetch: fetchMock,
      nextHref: 'https://example.test/app/index.html?forceReload=token',
      navigator: navigatorMock,
      window: windowMock,
      serviceWorkerPromise: Promise.resolve(true),
      cachePromise: Promise.resolve(true),
      allowCache: false,
    });

    expect(warmupHandle).not.toBeNull();
    await expect(warmupHandle.promise).resolves.toBe(true);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  test('scheduleReloadWarmup still uses fetch path for Chrome on iOS', async () => {
    const navigatorMock = {
      vendor: 'Apple Computer, Inc.',
      userAgent:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 16_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/124.0.0.0 Mobile/15E148',
      standalone: false,
      onLine: true,
    };

    class MockXMLHttpRequest {
      constructor() {
        this.eventHandlers = {};
      }

      addEventListener(event, handler) {
        this.eventHandlers[event] = handler;
      }

      open() { }

      setRequestHeader() { }

      send() {
        if (this.eventHandlers.load) {
          this.eventHandlers.load();
        }
      }
    }

    const windowMock = {
      navigator: navigatorMock,
      location: {
        href: 'https://example.test/app/index.html',
        origin: 'https://example.test',
        pathname: '/app/index.html',
        search: '',
        hash: '',
      },
      matchMedia: jest.fn(() => ({ matches: false })),
      XMLHttpRequest: MockXMLHttpRequest,
    };

    const responseClone = {
      bodyUsed: false,
      text: jest.fn(() => Promise.resolve('<html></html>')),
    };

    const fetchMock = jest.fn(() =>
      Promise.resolve({
        ok: true,
        bodyUsed: false,
        text: jest.fn(() => Promise.resolve('<html></html>')),
        clone: jest.fn(() => responseClone),
      }),
    );

    const warmupHandle = internal.scheduleReloadWarmup({
      fetch: fetchMock,
      nextHref: 'https://example.test/app/index.html?forceReload=token',
      navigator: navigatorMock,
      window: windowMock,
      serviceWorkerPromise: Promise.resolve(true),
      cachePromise: Promise.resolve(true),
      allowCache: false,
    });

    expect(warmupHandle).not.toBeNull();
    await expect(warmupHandle.promise).resolves.toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

});


