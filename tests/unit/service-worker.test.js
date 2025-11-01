const {
  ASSETS,
  CACHE_NAME,
  __private__: { precacheAssets, shouldBypassCache },
} = require('../../service-worker.js');

const createHeaders = entries => ({
  get: key => {
    if (Object.prototype.hasOwnProperty.call(entries, key)) {
      return entries[key];
    }

    return null;
  },
});

describe('service worker connectivity probe handling', () => {
  const CONNECTIVITY_PROBE_HEADER = 'x-cine-connectivity-probe';
  const CONNECTIVITY_PROBE_RESULT_HEADER = 'x-cine-connectivity-probe-result';
  const CONNECTIVITY_PROBE_RESULT_FALLBACK = 'fallback';

  let originalCaches;
  let originalSelf;
  let originalFetch;
  let eventListeners;

  beforeEach(() => {
    jest.resetModules();

    originalCaches = global.caches;
    originalSelf = global.self;
    originalFetch = global.fetch;
    eventListeners = {};

    global.self = {
      location: { origin: 'https://example.test', href: 'https://example.test/' },
      addEventListener: (eventName, handler) => {
        eventListeners[eventName] = handler;
      },
      clients: { claim: jest.fn(), matchAll: jest.fn().mockResolvedValue([]) },
      registration: {},
    };

    global.caches = {
      match: jest.fn(),
      open: jest.fn().mockResolvedValue({ match: jest.fn(), put: jest.fn() }),
    };

    global.fetch = jest.fn().mockRejectedValue(new Error('network unavailable'));
  });

  afterEach(() => {
    if (typeof originalCaches === 'undefined') {
      delete global.caches;
    } else {
      global.caches = originalCaches;
    }

    if (typeof originalSelf === 'undefined') {
      delete global.self;
    } else {
      global.self = originalSelf;
    }

    if (typeof originalFetch === 'undefined') {
      delete global.fetch;
    } else {
      global.fetch = originalFetch;
    }
  });

  const loadServiceWorker = () => {
    const module = require('../../service-worker.js');
    return { module, fetchHandler: eventListeners.fetch };
  };

  test('cached connectivity probe responses carry fallback marker when offline', async () => {
    const { fetchHandler } = loadServiceWorker();

    expect(typeof fetchHandler).toBe('function');

    const cachedShell = new Response('<html></html>', {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    });

    global.caches.match.mockResolvedValue(cachedShell);

    const request = new Request('https://example.test/index.html?__cineReloadProbe__=1', {
      headers: new Headers({ [CONNECTIVITY_PROBE_HEADER]: 'probe-token' }),
    });

    let respondPromise;
    const respondWith = jest.fn(promise => {
      respondPromise = promise;
    });

    fetchHandler({
      request,
      respondWith,
      preloadResponse: null,
    });

    expect(respondWith).toHaveBeenCalledTimes(1);

    const response = await respondPromise;

    expect(global.caches.match).toHaveBeenCalledWith(request, { ignoreSearch: true });
    expect(response.headers.get(CONNECTIVITY_PROBE_RESULT_HEADER)).toBe(
      CONNECTIVITY_PROBE_RESULT_FALLBACK,
    );
  });

  test('forceReload navigation requests bypass cache but still refresh storage', async () => {
    const { fetchHandler } = loadServiceWorker();

    expect(typeof fetchHandler).toBe('function');

    const cachePut = jest.fn().mockResolvedValue(undefined);
    const cacheMatch = jest.fn();
    global.caches.open.mockResolvedValue({ match: cacheMatch, put: cachePut });

    const freshResponse = new Response('<html></html>', {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    });

    global.fetch.mockResolvedValue(freshResponse);

    const baseRequest = new Request('https://example.test/index.html?forceReload=token', {
      headers: new Headers({ Accept: 'text/html' }),
    });
    const navigationRequest = new Proxy(baseRequest, {
      get(target, prop, receiver) {
        if (prop === 'mode') {
          return 'navigate';
        }
        return Reflect.get(target, prop, receiver);
      },
    });

    let responsePromise;
    const respondWith = jest.fn(promise => {
      responsePromise = promise;
    });

    let waitUntilPromise;
    const waitUntil = jest.fn(promise => {
      waitUntilPromise = promise;
    });

    fetchHandler({
      request: navigationRequest,
      respondWith,
      waitUntil,
      preloadResponse: null,
    });

    expect(respondWith).toHaveBeenCalledTimes(1);

    const response = await responsePromise;

    expect(global.fetch).toHaveBeenCalledWith(navigationRequest, { cache: 'no-store' });
    expect(global.caches.match).not.toHaveBeenCalled();
    expect(response).toBe(freshResponse);
    expect(waitUntil).toHaveBeenCalledTimes(1);

    await waitUntilPromise;

    expect(global.caches.open).toHaveBeenCalledWith(CACHE_NAME);
    expect(cachePut).toHaveBeenCalledWith(navigationRequest, expect.any(Response));
  });
});

describe('service worker configuration', () => {
  test('caches overview assets for offline usage', () => {
    expect(ASSETS).toEqual(expect.arrayContaining(['./src/styles/overview.css', './src/styles/overview-print.css', './src/scripts/overview.js']));
  });

  test('caches runtime JavaScript dependencies for offline usage', () => {
    expect(ASSETS).toEqual(
      expect.arrayContaining([
        './src/scripts/globalthis-polyfill.js',
        './src/scripts/globals-bootstrap.js',
        './src/scripts/modern-support-check.js',
        './src/scripts/modern-support-check.mjs',
        './src/scripts/modules/registry.js',
        './src/scripts/modules/offline.js',
        './src/scripts/modules/ui.js',
        './src/scripts/modules/features/print-workflow.js',
        './src/data/devices/batteryHotswaps.js',
        './src/data/devices/chargers.js',
        './src/data/devices/wirelessReceivers.js',
      ]),
    );
  });

  test('caches legacy fallback scripts for offline usage', () => {
    expect(ASSETS).toEqual(
      expect.arrayContaining([
        './legacy/scripts/loader.js',
        './legacy/scripts/script.js',
        './legacy/scripts/auto-gear-monitoring.js',
        './legacy/scripts/autosave-overlay.js',
        './legacy/scripts/modules/registry.js',
        './legacy/scripts/modern-support-check.js',
        './legacy/scripts/globals-bootstrap.js',
      ]),
    );
  });

  test('caches legal pages for offline usage', () => {
    expect(ASSETS).toEqual(
      expect.arrayContaining([
        './legal/impressum.html',
        './legal/impressum-en.html',
        './legal/impressum-es.html',
        './legal/impressum-fr.html',
        './legal/impressum-it.html',
        './legal/datenschutz.html',
        './legal/datenschutz-en.html',
        './legal/datenschutz-es.html',
        './legal/datenschutz-fr.html',
        './legal/datenschutz-it.html',
      ]),
    );
  });

  test('caches the device schema for offline editing', () => {
    expect(ASSETS).toEqual(expect.arrayContaining(['./src/data/schema.json']));
  });

  test('caches the shared theme helper for legal pages', () => {
    expect(ASSETS).toEqual(expect.arrayContaining(['./src/scripts/static-theme.js']));
  });

  test('exposes a cache name', () => {
    expect(typeof CACHE_NAME).toBe('string');
    expect(CACHE_NAME).not.toBe('');
  });

  test('treats forceReload navigation requests as cache bypass candidates', () => {
    const mockRequest = {
      cache: 'default',
      headers: createHeaders({}),
    };
    const url = new URL('https://example.test/app?forceReload=abc123');

    expect(shouldBypassCache(mockRequest, url)).toBe(true);
  });

  test('treats reload navigation requests as cache bypass candidates', () => {
    const mockRequest = {
      cache: 'reload',
      headers: createHeaders({}),
    };

    expect(shouldBypassCache(mockRequest, new URL('https://example.test/app'))).toBe(true);
  });

  test('treats Cache-Control no-store headers as cache bypass candidates', () => {
    const mockRequest = {
      cache: 'default',
      headers: createHeaders({ 'Cache-Control': 'no-store' }),
    };

    expect(shouldBypassCache(mockRequest, new URL('https://example.test/app'))).toBe(true);
  });

  test('treats Pragma no-cache headers as cache bypass candidates', () => {
    const mockRequest = {
      cache: 'default',
      headers: createHeaders({ Pragma: 'no-cache' }),
    };

    expect(shouldBypassCache(mockRequest, new URL('https://example.test/app'))).toBe(true);
  });

  test('rejects installation when assets are missing during precache', async () => {
    const originalCaches = global.caches;
    const originalRequest = global.Request;

    class MockRequest {
      constructor(url) {
        this.url = url;
      }
    }

    const addAllError = new Error('addAll failed');
    const networkError = new Error('network failure');

    const cache = {
      addAll: jest.fn().mockRejectedValue(addAllError),
      add: jest.fn().mockImplementation(() => Promise.reject(networkError)),
      put: jest.fn().mockResolvedValue(undefined),
      match: jest.fn().mockResolvedValue(null),
    };

    global.Request = MockRequest;
    global.caches = {
      open: jest.fn().mockResolvedValue(cache),
      match: jest.fn().mockResolvedValue(null),
    };

    try {
      await expect(precacheAssets('test-cache', ['./missing.js'])).rejects.toMatchObject({
        missingAssets: ['./missing.js'],
      });
    } finally {
      if (typeof originalCaches === 'undefined') {
        delete global.caches;
      } else {
        global.caches = originalCaches;
      }

      if (typeof originalRequest === 'undefined') {
        delete global.Request;
      } else {
        global.Request = originalRequest;
      }
    }
  });
});
