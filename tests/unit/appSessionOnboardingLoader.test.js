/**
 * @jest-environment jsdom
 */

const { createOnboardingLoaderHelpers } = require('../../src/scripts/app-session-onboarding-loader.js');

describe('app-session onboarding deferred loader helpers', () => {
  let storageData;
  let resolveModuleApi;
  let ensureDeferredScriptsLoaded;
  let helpers;
  let buildHelpers;
  let moduleReady;

  beforeEach(() => {
    storageData = new Map();
    resolveModuleApi = jest.fn(() => (moduleReady ? { start: jest.fn(), skip: jest.fn() } : null));
    ensureDeferredScriptsLoaded = jest.fn(() => Promise.resolve());
    moduleReady = false;

    buildHelpers = () => createOnboardingLoaderHelpers({
      resolveModuleApi,
      getSafeLocalStorage: () => ({
        getItem: key => (storageData.has(key) ? storageData.get(key) : null),
        setItem: (key, value) => storageData.set(key, value),
      }),
      ensureDeferredScriptsLoaded,
    });

    helpers = buildHelpers();

    document.body.innerHTML = `
      <button id="helpButton" type="button" data-onboarding-tour-trigger="primary">Help</button>
    `;
  });

  afterEach(() => {
    jest.useRealTimers();
    document.body.innerHTML = '';
  });

  test('requests deferred onboarding scripts during first-run detection', async () => {
    helpers.ensureOnboardingModuleForFirstRun();
    await Promise.resolve();
    expect(ensureDeferredScriptsLoaded).toHaveBeenCalledWith('onboarding-first-run');
  });

  test('help trigger schedules module preload until onboarding API is ready', async () => {
    const helpButton = document.getElementById('helpButton');

    let triggerResolve;
    ensureDeferredScriptsLoaded.mockImplementation(reason => {
      if (reason === 'onboarding-trigger') {
        return new Promise(resolve => {
          triggerResolve = resolve;
        });
      }
      return Promise.resolve();
    });
    helpers = buildHelpers();

    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
    Object.defineProperty(clickEvent, 'target', { value: helpButton, configurable: true });
    const preventDefaultSpy = jest.spyOn(clickEvent, 'preventDefault');
    const stopPropagationSpy = jest.spyOn(clickEvent, 'stopPropagation');
    const stopImmediatePropagationSpy = jest.spyOn(clickEvent, 'stopImmediatePropagation');

    helpers.handleDeferredOnboardingTrigger(clickEvent);

    expect(ensureDeferredScriptsLoaded).toHaveBeenCalledWith('onboarding-trigger');
    expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
    expect(stopPropagationSpy).toHaveBeenCalledTimes(1);
    expect(stopImmediatePropagationSpy).toHaveBeenCalledTimes(1);

    moduleReady = true;
    if (typeof triggerResolve === 'function') {
      triggerResolve();
    }
    await Promise.resolve();
    await Promise.resolve();
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(ensureDeferredScriptsLoaded).toHaveBeenCalledWith('onboarding-trigger-preload');
    expect(resolveModuleApi).toHaveBeenCalled();
  });

  test('help trigger preloads immediately when onboarding API is ready', () => {
    moduleReady = true;

    const helpButton = document.getElementById('helpButton');
    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
    Object.defineProperty(clickEvent, 'target', { value: helpButton, configurable: true });
    const preventDefaultSpy = jest.spyOn(clickEvent, 'preventDefault');

    helpers.handleDeferredOnboardingTrigger(clickEvent);

    expect(preventDefaultSpy).not.toHaveBeenCalled();
    expect(ensureDeferredScriptsLoaded).toHaveBeenCalledTimes(1);
    expect(ensureDeferredScriptsLoaded).toHaveBeenCalledWith('onboarding-trigger-preload');
  });

  test('first-run detection skips preload when onboarding already completed', () => {
    storageData.set('cameraPowerPlanner_onboardingTutorial', JSON.stringify({ completed: true }));
    storageData.set('cinePowerPlanner_onboardingTutorial', JSON.stringify({ completed: true }));

    helpers.ensureOnboardingModuleForFirstRun();

    expect(ensureDeferredScriptsLoaded).not.toHaveBeenCalledWith('onboarding-first-run');
    expect(ensureDeferredScriptsLoaded).not.toHaveBeenCalled();
  });
});
