/**
 * @jest-environment jsdom
 */

const path = require('path');

describe('onboarding deferred loader hooks', () => {
  const loaderPath = path.resolve(__dirname, '../../../src/scripts/onboarding-deferred-loader.js');

  const createDeferred = () => {
    let resolve;
    let reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  };

  const setupStorage = value => {
    const storage = {
      getItem: jest.fn(() => value),
    };
    Object.defineProperty(global, 'localStorage', {
      configurable: true,
      value: storage,
    });
    return storage;
  };

  const resetGlobals = () => {
    delete global.cineEnsureDeferredScriptsLoaded;
    delete global.cineDeferredScriptsReady;
    delete global.cineOnboardingDeferredLoader;
    delete global.getSafeLocalStorage;
    delete global.SAFE_LOCAL_STORAGE;
    if (Object.prototype.hasOwnProperty.call(global, 'localStorage')) {
      delete global.localStorage;
    }
    delete global.cineFeaturesOnboardingTour;
  };

  beforeEach(() => {
    jest.resetModules();
    document.body.innerHTML = '';
    resetGlobals();
  });

  afterEach(() => {
    resetGlobals();
  });

  test('preloads deferred scripts when onboarding has not started', () => {
    const deferred = createDeferred();
    global.cineEnsureDeferredScriptsLoaded = jest.fn(() => deferred.promise);
    setupStorage(null);

    require(loaderPath);

    expect(global.cineEnsureDeferredScriptsLoaded).toHaveBeenCalled();
    const reasons = global.cineEnsureDeferredScriptsLoaded.mock.calls.map(call => call[0] && call[0].reason);
    expect(reasons).toContain('onboarding-first-run');
  });

  test('skips preload when onboarding is completed', () => {
    const deferred = createDeferred();
    global.cineEnsureDeferredScriptsLoaded = jest.fn(() => deferred.promise);
    setupStorage(JSON.stringify({ completed: true }));

    require(loaderPath);

    const reasons = global.cineEnsureDeferredScriptsLoaded.mock.calls.map(call => call[0] && call[0].reason);
    expect(reasons).not.toContain('onboarding-first-run');
  });

  test('help trigger waits for module to load before re-dispatching click', async () => {
    const deferred = createDeferred();
    global.cineEnsureDeferredScriptsLoaded = jest.fn(() => deferred.promise);
    setupStorage(null);

    require(loaderPath);
    const helper = global.cineOnboardingDeferredLoader;
    expect(helper).toBeDefined();

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.setAttribute('data-onboarding-tour-trigger', 'primary');
    document.body.appendChild(trigger);

    const clickHandler = jest.fn(event => {
      event.preventDefault();
    });
    trigger.addEventListener('click', clickHandler);

    trigger.click();

    const callCount = global.cineEnsureDeferredScriptsLoaded.mock.calls.length;
    const lastCall = callCount > 0 ? global.cineEnsureDeferredScriptsLoaded.mock.calls[callCount - 1] : null;
    expect(lastCall && lastCall[0] && lastCall[0].reason).toBe('onboarding-trigger');
    expect(clickHandler).not.toHaveBeenCalled();

    global.cineFeaturesOnboardingTour = {};
    deferred.resolve();
    await Promise.resolve();
    await Promise.resolve();

    expect(clickHandler.mock.calls.length).toBeGreaterThan(0);
  });
});
