/**
 * @jest-environment jsdom
 */

const path = require('path');

describe('onboarding loader hook', () => {
  const modulePath = path.resolve(
    __dirname,
    '../../../src/scripts/modules/features/onboarding-loader-hook.js',
  );

  function createStorageStub(initialValue = null) {
    let value = initialValue;
    return {
      getItem: jest.fn(() => value),
      setItem: jest.fn((key, next) => {
        if (key === 'cameraPowerPlanner_onboardingTutorial') {
          value = next;
        }
      }),
    };
  }

  beforeEach(() => {
    jest.resetModules();
    jest.useFakeTimers();
    global.cineEnsureDeferredScriptsLoaded = jest.fn(() => Promise.resolve());
    global.cineDeferredScriptsReady = Promise.resolve();
    const safeStorage = createStorageStub(null);
    global.getSafeLocalStorage = jest.fn(() => safeStorage);
    global.SAFE_LOCAL_STORAGE = createStorageStub(null);
    global.requestAnimationFrame = callback => setTimeout(() => callback(Date.now()), 0);
    document.body.innerHTML = '<button id="helpOnboardingTutorialButton" data-onboarding-tour-trigger="primary"></button>';
  });

  afterEach(() => {
    jest.runAllTimers();
    jest.useRealTimers();
    delete global.cineEnsureDeferredScriptsLoaded;
    delete global.cineDeferredScriptsReady;
    delete global.getSafeLocalStorage;
    delete global.SAFE_LOCAL_STORAGE;
    delete global.cineEnsureOnboardingTourLoaded;
    delete global.cineFeaturesOnboardingTour;
    delete global.requestAnimationFrame;
  });

  test('first-run detection primes deferred bundle loading', async () => {
    require(modulePath);

    expect(global.cineEnsureDeferredScriptsLoaded).not.toHaveBeenCalled();

    await Promise.resolve();
    jest.runOnlyPendingTimers();

    expect(global.cineEnsureDeferredScriptsLoaded).toHaveBeenCalledWith({
      reason: 'onboarding-tour:first-run',
    });

    global.cineFeaturesOnboardingTour = { start: jest.fn() };
    jest.runAllTimers();
  });

  test('ensure helper resolves once onboarding module becomes available', async () => {
    require(modulePath);

    const ensurePromise = global.cineEnsureOnboardingTourLoaded('manual-trigger');
    expect(ensurePromise).toBeInstanceOf(Promise);

    const moduleApi = { start: jest.fn() };
    setTimeout(() => {
      global.cineFeaturesOnboardingTour = moduleApi;
    }, 10);

    jest.advanceTimersByTime(20);
    await expect(ensurePromise).resolves.toBe(moduleApi);

    jest.runAllTimers();
  });
});
