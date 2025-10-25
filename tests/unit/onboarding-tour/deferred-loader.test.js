/**
 * @jest-environment jsdom
 */

const path = require('path');

describe('onboarding loader hook', () => {
  jest.setTimeout(15000);

  const modulePath = path.resolve(
    __dirname,
    '../../../src/scripts/modules/features/onboarding-loader-hook.js',
  );

  let warnSpy;
  let mockNow = 0;

  async function advanceTimersBy(ms) {
    mockNow += ms;
    await jest.advanceTimersByTimeAsync(ms);
  }

  function createStorageStub(initialValue = null) {
    const values = new Map();
    if (initialValue !== null && typeof initialValue !== 'undefined') {
      values.set('cinePowerPlanner_onboardingTutorial', initialValue);
      values.set('cameraPowerPlanner_onboardingTutorial', initialValue);
    }
    return {
      getItem: jest.fn(key => (values.has(key) ? values.get(key) : null)),
      setItem: jest.fn((key, next) => {
        values.set(key, next);
      }),
    };
  }

  beforeEach(() => {
    jest.resetModules();
    jest.useFakeTimers();
    global.__CPP_ONBOARDING_WAIT_TIMEOUT_MS = 20;
    global.cineEnsureDeferredScriptsLoaded = jest.fn(() => Promise.resolve());
    global.cineDeferredScriptsReady = Promise.resolve();
    const safeStorage = createStorageStub(null);
    global.getSafeLocalStorage = jest.fn(() => safeStorage);
    global.SAFE_LOCAL_STORAGE = createStorageStub(null);
    global.requestAnimationFrame = callback => setTimeout(() => callback(Date.now()), 0);
    mockNow = 0;
    jest.spyOn(Date, 'now').mockImplementation(() => mockNow);
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    document.body.innerHTML = '<button id="helpOnboardingTutorialButton" data-onboarding-tour-trigger="primary"></button>';
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.clearAllTimers();
    jest.useRealTimers();
    delete global.cineEnsureDeferredScriptsLoaded;
    delete global.cineDeferredScriptsReady;
    delete global.getSafeLocalStorage;
    delete global.SAFE_LOCAL_STORAGE;
    delete global.localStorage;
    delete global.cineEnsureOnboardingTourLoaded;
    delete global.cineFeaturesOnboardingTour;
    delete global.requestAnimationFrame;
    delete global.__CPP_ONBOARDING_WAIT_TIMEOUT_MS;
    if (Date.now && typeof Date.now.mockRestore === 'function') {
      Date.now.mockRestore();
    }
    if (warnSpy) {
      warnSpy.mockRestore();
      warnSpy = null;
    }
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

  test('first-run detection primes loader when stored state is incomplete', async () => {
    const storedValue = JSON.stringify({ version: 2, completed: false, skipped: false });
    const safeStorage = createStorageStub(storedValue);
    global.getSafeLocalStorage = jest.fn(() => safeStorage);
    const legacyStorage = createStorageStub(storedValue);
    global.SAFE_LOCAL_STORAGE = legacyStorage;
    global.localStorage = createStorageStub(storedValue);

    require(modulePath);

    await Promise.resolve();
    jest.runOnlyPendingTimers();

    expect(global.cineEnsureDeferredScriptsLoaded).toHaveBeenCalledWith({
      reason: 'onboarding-tour:first-run',
    });
  });

  test('first-run detection does not load when onboarding has completed', async () => {
    const storedValue = JSON.stringify({ version: 2, completed: true, skipped: false });
    const safeStorage = createStorageStub(storedValue);
    global.getSafeLocalStorage = jest.fn(() => safeStorage);
    const legacyStorage = createStorageStub(storedValue);
    global.SAFE_LOCAL_STORAGE = legacyStorage;
    global.localStorage = createStorageStub(storedValue);

    require(modulePath);

    await Promise.resolve();
    jest.runOnlyPendingTimers();

    expect(global.cineEnsureDeferredScriptsLoaded).not.toHaveBeenCalled();
  });

  test('first-run detection does not load when onboarding was skipped via storage', async () => {
    const storedValue = JSON.stringify({ version: 2, completed: false, skipped: true });
    const safeStorage = createStorageStub(storedValue);
    global.getSafeLocalStorage = jest.fn(() => safeStorage);
    const legacyStorage = createStorageStub(storedValue);
    global.SAFE_LOCAL_STORAGE = legacyStorage;
    global.localStorage = createStorageStub(storedValue);

    require(modulePath);

    await Promise.resolve();
    jest.runOnlyPendingTimers();

    expect(global.cineEnsureDeferredScriptsLoaded).not.toHaveBeenCalled();
  });

  test('ensure helper resolves once onboarding module becomes available', async () => {
    require(modulePath);

    const ensurePromise = global.cineEnsureOnboardingTourLoaded('manual-trigger');
    expect(ensurePromise).toBeInstanceOf(Promise);

    const moduleApi = { start: jest.fn() };
    setTimeout(() => {
      global.cineFeaturesOnboardingTour = moduleApi;
    }, 10);

    await advanceTimersBy(20);
    await expect(ensurePromise).resolves.toBe(moduleApi);

    jest.runAllTimers();
  });

  test('ensure helper does not warn when module becomes available after initial timeout', async () => {
    require(modulePath);

    const ensurePromise = global.cineEnsureOnboardingTourLoaded('delayed-ready');

    await Promise.resolve();
    await advanceTimersBy(25);

    await expect(ensurePromise).resolves.toBeNull();
    expect(warnSpy).not.toHaveBeenCalled();

    const moduleApi = { start: jest.fn() };
    global.cineFeaturesOnboardingTour = moduleApi;

    jest.runOnlyPendingTimers();
    await Promise.resolve();

    expect(global.cineFeaturesOnboardingTour).toBe(moduleApi);
    expect(warnSpy).not.toHaveBeenCalled();

    jest.runAllTimers();
  });

  test('ensure helper warns once when module never becomes available', async () => {
    require(modulePath);

    const ensurePromise = global.cineEnsureOnboardingTourLoaded('timeout-never');

    await Promise.resolve();
    await advanceTimersBy(25);

    await expect(ensurePromise).resolves.toBeNull();
    expect(warnSpy).not.toHaveBeenCalled();

    await advanceTimersBy(1100);
    jest.runOnlyPendingTimers();
    await Promise.resolve();

    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith('Onboarding tour module did not become available after deferred load.');

    jest.runAllTimers();
  });
});
