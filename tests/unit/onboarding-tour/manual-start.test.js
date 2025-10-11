/**
 * @jest-environment jsdom
 */

const path = require('path');

describe('onboarding tour manual start', () => {
  const modulePath = path.resolve(__dirname, '../../../src/scripts/modules/features/onboarding-tour.js');

  function loadModule(options = {}) {
    jest.resetModules();
    delete global.cineModuleBase;
    delete global.cineFeaturesOnboardingTour;
    delete global.currentLang;
    delete global.texts;
    const storage = (() => {
      let store = new Map();
      return {
        getItem: jest.fn(key => (store.has(key) ? store.get(key) : null)),
        setItem: jest.fn((key, value) => {
          store.set(key, value);
        }),
      };
    })();

    if (options.currentLang) {
      global.currentLang = options.currentLang;
    }
    if (options.texts) {
      global.texts = options.texts;
    }

    global.getSafeLocalStorage = () => storage;
    global.SAFE_LOCAL_STORAGE = storage;
    global.cineModuleBase = {
      safeWarn: jest.fn(),
      freezeDeep: value => value,
      collectCandidateScopes: () => [global],
      registerOrQueueModule: jest.fn(),
      getModuleRegistry: () => null,
      exposeGlobal: jest.fn(),
    };
    global.closeDialog = dialog => {
      if (!dialog) return;
      dialog.removeAttribute('open');
    };
    global.isDialogOpen = dialog => {
      if (!dialog) return false;
      if (typeof dialog.open === 'boolean') {
        return dialog.open || dialog.hasAttribute('open');
      }
      return typeof dialog.hasAttribute === 'function' && dialog.hasAttribute('open');
    };
    global.requestAnimationFrame = cb => setTimeout(() => cb(Date.now()), 0);
    global.cancelAnimationFrame = handle => clearTimeout(handle);

    Object.defineProperty(document, 'readyState', {
      configurable: true,
      get: () => 'complete',
    });

    document.body.innerHTML = `
      <div id="app">
        <dialog id="helpDialog" hidden>
          <button id="helpOnboardingTutorialButton" data-onboarding-tour-trigger="primary" type="button">
            Start guided tutorial
          </button>
        </dialog>
        <div id="setup-manager"></div>
        <div id="setup-config"></div>
        <button id="generateGearListBtn"></button>
        <div data-nav-key="gearListNav"></div>
        <h2 data-nav-key="resultsHeading" id="resultsHeading"></h2>
        <section id="resultsPlainSummary">
          <h3 id="resultsPlainSummaryTitle"></h3>
        </section>
        <button id="openContactsBtn"></button>
        <div data-nav-key="ownGearNav"></div>
        <section id="autoGearHeading"></section>
        <button id="generateOverviewBtn"></button>
        <button id="shareSetupBtn"></button>
        <button id="applySharedLinkBtn"></button>
        <div id="backupSettings"></div>
        <div id="offlineIndicator"></div>
        <button id="saveSetupBtn"></button>
      </div>
    `;

    return require(modulePath);
  }

  test('activates overlay when the help trigger is clicked', async () => {
    loadModule();
    const trigger = document.querySelector('[data-onboarding-tour-trigger]');
    expect(trigger).not.toBeNull();

    const helpDialog = document.getElementById('helpDialog');
    helpDialog.removeAttribute('hidden');
    helpDialog.setAttribute('open', '');

    trigger.click();

    await new Promise(resolve => setTimeout(resolve, 20));

    const overlay = document.getElementById('onboardingTutorialOverlay');
    expect(overlay).not.toBeNull();
    expect(overlay.classList.contains('active')).toBe(true);
    expect(overlay.getAttribute('aria-hidden')).toBe('false');
    expect(helpDialog.hidden).toBe(true);
  });

  test('activates overlay for help triggers injected after initialization', async () => {
    loadModule();

    const helpDialog = document.getElementById('helpDialog');
    helpDialog.removeAttribute('hidden');
    helpDialog.setAttribute('open', '');

    const dynamicTrigger = document.createElement('button');
    dynamicTrigger.type = 'button';
    dynamicTrigger.setAttribute('data-onboarding-tour-trigger', 'dynamic');
    helpDialog.appendChild(dynamicTrigger);

    dynamicTrigger.click();

    await new Promise(resolve => setTimeout(resolve, 20));

    const overlay = document.getElementById('onboardingTutorialOverlay');
    expect(overlay).not.toBeNull();
    expect(overlay.classList.contains('active')).toBe(true);
    expect(overlay.getAttribute('aria-hidden')).toBe('false');
    expect(helpDialog.hidden).toBe(true);
  });

  test('restores default label when translations omit onboarding label', () => {
    loadModule({
      currentLang: 'zz',
      texts: {
        zz: {
          onboardingTour: {
            startLabel: '   ',
            resumeLabelWithProgress: '',
            resumeLabel: '',
            restartLabel: '',
          },
        },
      },
    });

    const button = document.getElementById('helpOnboardingTutorialButton');
    expect(button).not.toBeNull();
    expect(button.textContent.trim()).toBe('Start guided tutorial');
    expect(button.getAttribute('aria-label')).toBe('Start guided tutorial');
  });
});
