/**
 * @jest-environment jsdom
 */

const path = require('path');

describe('onboarding tour manual start', () => {
  const modulePath = path.resolve(__dirname, '../../../src/scripts/modules/features/onboarding-tour.js');

  function loadModule() {
    jest.resetModules();
    delete global.cineModuleBase;
    delete global.cineFeaturesOnboardingTour;
    const storage = (() => {
      let store = new Map();
      return {
        getItem: jest.fn(key => (store.has(key) ? store.get(key) : null)),
        setItem: jest.fn((key, value) => {
          store.set(key, value);
        }),
      };
    })();

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
        <dialog id="settingsDialog" hidden>
          <section>
            <h2 id="autoGearHeading"></h2>
            <button id="storageBackupNow"></button>
            <div id="backupSettings"></div>
          </section>
        </dialog>
        <button id="generateOverviewBtn"></button>
        <button id="shareSetupBtn"></button>
        <button id="applySharedLinkBtn"></button>
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

  test('clicking a completed step keeps the tutorial card visible', async () => {
    loadModule();
    const trigger = document.querySelector('[data-onboarding-tour-trigger]');
    expect(trigger).not.toBeNull();

    trigger.click();

    await new Promise(resolve => setTimeout(resolve, 20));

    const overlay = document.getElementById('onboardingTutorialOverlay');
    expect(overlay).not.toBeNull();

    const nextButton = overlay.querySelector('.onboarding-next-button');
    expect(nextButton).not.toBeNull();

    // Advance to the next step so that the first item becomes "completed"
    nextButton.click();

    await new Promise(resolve => setTimeout(resolve, 20));

    const stepButtons = overlay.querySelectorAll('.onboarding-step-button');
    expect(stepButtons.length).toBeGreaterThan(1);

    // Clicking a completed step should not remove the card from the overlay
    stepButtons[0].click();

    await new Promise(resolve => setTimeout(resolve, 20));

    expect(overlay.classList.contains('active')).toBe(true);
    const card = overlay.querySelector('.onboarding-card');
    expect(card).not.toBeNull();
    expect(card.getAttribute('aria-hidden')).not.toBe('true');
  });

  test('skips page scrolling for steps displayed inside the settings dialog', async () => {
    const originalScrollIntoView = HTMLElement.prototype.scrollIntoView;
    const scrollCalls = [];
    HTMLElement.prototype.scrollIntoView = function scrollIntoViewSpy(options) {
      scrollCalls.push({
        id: this.id || this.getAttribute('id') || '',
        options,
      });
    };

    try {
      loadModule();
      const trigger = document.querySelector('[data-onboarding-tour-trigger]');
      expect(trigger).not.toBeNull();

      trigger.click();

      await new Promise(resolve => setTimeout(resolve, 20));

      const overlay = document.getElementById('onboardingTutorialOverlay');
      expect(overlay).not.toBeNull();

      const nextButton = overlay.querySelector('.onboarding-next-button');
      expect(nextButton).not.toBeNull();

      for (let index = 0; index < 8; index += 1) {
        nextButton.click();
        // Allow the tutorial to update the step and open settings when required
        // eslint-disable-next-line no-await-in-loop
        await new Promise(resolve => setTimeout(resolve, 30));
      }

      const currentStepTitle = overlay.querySelector(
        '.onboarding-step-item[data-status="current"] .onboarding-step-title',
      );
      expect(currentStepTitle).not.toBeNull();
      expect(currentStepTitle.textContent).toBe('autoGear');

      const autoGearScroll = scrollCalls.find(call => call.id === 'autoGearHeading');
      expect(autoGearScroll).toBeUndefined();
    } finally {
      HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
    }
  });
});
