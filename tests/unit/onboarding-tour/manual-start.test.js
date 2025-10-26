/**
 * @jest-environment jsdom
 */

const path = require('path');

describe('onboarding tour manual start', () => {
  const modulePath = path.resolve(
    __dirname,
    '../../../src/scripts/modules/features/onboarding-tour.js',
  );
  const minimalTexts = {
    en: {
      onboardingTour: {
        prefaceIndicator: 'Welcome',
        stepIndicator: 'Step {current} of {total}',
      },
    },
    de: {
      onboardingTour: {
        prefaceIndicator: 'Willkommen',
      },
    },
    fr: {
      onboardingTour: {
        prefaceIndicator: 'Bienvenue',
        stepIndicator: 'Étape {current} sur {total}',
      },
    },
  };

  function createTrackableStorage(initialValues = {}) {
    const entries = Object.entries(initialValues);
    const store = new Map(entries);
    return {
      getItem: jest.fn(key => (store.has(key) ? store.get(key) : null)),
      setItem: jest.fn((key, value) => {
        store.set(key, value);
      }),
      removeItem: jest.fn(key => {
        store.delete(key);
      }),
    };
  }

  function loadModule(options = {}) {
    jest.resetModules();
    delete global.cineModuleBase;
    delete global.cineFeaturesOnboardingTour;
    delete global.currentLang;
    delete global.texts;
    const createInMemoryStorage = () => {
      let store = new Map();
      return {
        getItem: jest.fn(key => (store.has(key) ? store.get(key) : null)),
        setItem: jest.fn((key, value) => {
          store.set(key, value);
        }),
        removeItem: jest.fn(key => {
          store.delete(key);
        }),
      };
    };

    const safeStorage = options.safeStorage || createInMemoryStorage();
    const safeLocalStorage = options.safeLocalStorage || safeStorage;

    if (options.currentLang) {
      global.currentLang = options.currentLang;
    }

    if (options.texts) {
      global.texts = options.texts;
    }

    if (typeof options.getSafeLocalStorage === 'function') {
      global.getSafeLocalStorage = options.getSafeLocalStorage;
    } else {
      global.getSafeLocalStorage = () => safeStorage;
    }
    global.SAFE_LOCAL_STORAGE = safeLocalStorage;

    if (options.localStorage) {
      global.localStorage = options.localStorage;
    } else {
      delete global.localStorage;
    }

    if (options.sessionStorage) {
      global.sessionStorage = options.sessionStorage;
    } else {
      delete global.sessionStorage;
    }

    const globalEventListeners = new Map();
    global.addEventListener = (type, listener) => {
      if (!type || typeof listener !== 'function') {
        return;
      }
      const bucket = globalEventListeners.get(type) || [];
      bucket.push(listener);
      globalEventListeners.set(type, bucket);
    };
    global.removeEventListener = (type, listener) => {
      if (!type || typeof listener !== 'function') {
        return;
      }
      const bucket = globalEventListeners.get(type);
      if (!bucket) {
        return;
      }
      const index = bucket.indexOf(listener);
      if (index !== -1) {
        bucket.splice(index, 1);
      }
      if (!bucket.length) {
        globalEventListeners.delete(type);
      }
    };
    global.dispatchEvent = event => {
      if (!event || !event.type) {
        return false;
      }
      const bucket = globalEventListeners.get(event.type);
      if (!bucket || !bucket.length) {
        return true;
      }
      bucket.slice().forEach(listener => {
        try {
          listener.call(global, event);
        } catch (error) {
          void error;
        }
      });
      return !event.defaultPrevented;
    };

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

    let currentReadyState = options.readyState || 'complete';
    Object.defineProperty(document, 'readyState', {
      configurable: true,
      get: () => currentReadyState,
      set: value => {
        currentReadyState = value;
      },
    });

    document.body.innerHTML = `
      <select id="languageSelect" aria-label="Select language">
        <option value="en">English</option>
        <option value="de">Deutsch</option>
        <option value="fr">Français</option>
      </select>
      <label for="settingsLanguage" id="settingsLanguageLabel">Language</label>
      <select id="settingsLanguage">
        <option value="en">English</option>
        <option value="de">Deutsch</option>
        <option value="fr">Français</option>
      </select>
      <div id="helpOnboardingTutorialStatus"></div>
      <div id="app">
        <dialog id="helpDialog" hidden>
          <button id="helpOnboardingTutorialButton" data-onboarding-tour-trigger="primary" type="button">
            Start guided tutorial
          </button>
        </dialog>
        <div id="setup-manager"></div>
        <div id="setup-config"></div>
        <input id="setupName" />
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

    const headerLanguage = document.getElementById('languageSelect');
    const settingsLanguage = document.getElementById('settingsLanguage');
    const updateLanguage = value => {
      if (!value) {
        return;
      }
      if (headerLanguage) {
        headerLanguage.value = value;
      }
      if (settingsLanguage) {
        settingsLanguage.value = value;
      }
      global.currentLang = value;
      if (typeof global.dispatchEvent === 'function' && typeof Event === 'function') {
        try {
          global.dispatchEvent(new Event('languagechange'));
        } catch (error) {
          void error;
        }
      }
    };

    if (headerLanguage) {
      headerLanguage.addEventListener('change', event => updateLanguage(event.target.value));
    }
    if (settingsLanguage) {
      settingsLanguage.addEventListener('change', event => updateLanguage(event.target.value));
    }

    global.setLanguage = jest.fn(updateLanguage);
    updateLanguage(options.currentLang || 'en');

    return require(modulePath);
  }

  function getRegisteredModuleApi() {
    if (
      !global.cineModuleBase
      || !global.cineModuleBase.registerOrQueueModule
      || typeof global.cineModuleBase.registerOrQueueModule.mock === 'undefined'
    ) {
      return null;
    }
    const calls = global.cineModuleBase.registerOrQueueModule.mock.calls;
    if (!calls || !calls.length) {
      return null;
    }
    return calls[calls.length - 1][1];
  }

  function parseTranslate(transform) {
    const match = /translate\(([-0-9.]+)px,\s*([-0-9.]+)px\)/.exec(transform);
    if (!match) {
      return { x: 0, y: 0 };
    }
    return { x: parseFloat(match[1]), y: parseFloat(match[2]) };
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

  test('welcome language selector remains interactive without header controls', async () => {
    loadModule();

    const headerLanguage = document.getElementById('languageSelect');
    if (headerLanguage && typeof headerLanguage.remove === 'function') {
      headerLanguage.remove();
    }
    const settingsLanguage = document.getElementById('settingsLanguage');
    if (settingsLanguage && typeof settingsLanguage.remove === 'function') {
      settingsLanguage.remove();
    }

    const trigger = document.querySelector('[data-onboarding-tour-trigger]');
    expect(trigger).not.toBeNull();

    const helpDialog = document.getElementById('helpDialog');
    helpDialog.removeAttribute('hidden');
    helpDialog.setAttribute('open', '');

    trigger.click();

    await new Promise(resolve => setTimeout(resolve, 40));

    const overlay = document.getElementById('onboardingTutorialOverlay');
    expect(overlay).not.toBeNull();

    const languageProxy = overlay.querySelector('.onboarding-hero-language-select');
    expect(languageProxy).not.toBeNull();
    expect(languageProxy.disabled).toBe(false);
    expect(languageProxy.options.length).toBeGreaterThan(1);

    const originalValue = languageProxy.value;
    const nextOption = Array.from(languageProxy.options).find(option => option.value !== originalValue);
    expect(nextOption).toBeDefined();

    languageProxy.value = nextOption.value;
    languageProxy.dispatchEvent(new Event('change', { bubbles: true }));

    await new Promise(resolve => setTimeout(resolve, 20));

    expect(global.setLanguage).toHaveBeenCalledWith(nextOption.value);
    expect(global.currentLang).toBe(nextOption.value);
  });

  test('units preferences language proxy applies the selected locale', async () => {
    loadModule();

    const trigger = document.querySelector('[data-onboarding-tour-trigger]');
    const helpDialog = document.getElementById('helpDialog');
    expect(trigger).not.toBeNull();
    expect(helpDialog).not.toBeNull();

    helpDialog.removeAttribute('hidden');
    helpDialog.setAttribute('open', '');

    trigger.click();
    await new Promise(resolve => setTimeout(resolve, 50));

    const overlay = document.getElementById('onboardingTutorialOverlay');
    expect(overlay).not.toBeNull();

    const nextButton = overlay.querySelector('.onboarding-next-button');
    expect(nextButton).not.toBeNull();

    nextButton.click();
    await new Promise(resolve => setTimeout(resolve, 70));
    nextButton.click();
    await new Promise(resolve => setTimeout(resolve, 70));

    const languageLabel = Array.from(
      overlay.querySelectorAll('.onboarding-field-label')
    ).find(label => label.textContent.trim() === 'Language');
    expect(languageLabel).toBeDefined();

    const proxyId = languageLabel.getAttribute('for');
    expect(proxyId).toBeTruthy();
    const proxySelect = document.getElementById(proxyId);
    expect(proxySelect).not.toBeNull();

    const originalValue = proxySelect.value;
    const alternativeOption = Array.from(proxySelect.options).find(
      option => option.value !== originalValue
    );
    expect(alternativeOption).toBeDefined();

    proxySelect.value = alternativeOption.value;
    proxySelect.dispatchEvent(new Event('change', { bubbles: true }));

    await new Promise(resolve => setTimeout(resolve, 40));

    expect(global.setLanguage).toHaveBeenCalledWith(alternativeOption.value);
    expect(global.currentLang).toBe(alternativeOption.value);
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

  test('repositions card and highlight when the viewport scrolls', async () => {
    loadModule();

    const target = document.getElementById('setupName');
    expect(target).not.toBeNull();

    const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
    const targetHeight = 60;
    const targetLeft = 120;
    const cardWidth = 320;
    const cardHeight = 220;
    let targetTop = 280;

    const getBoundingClientRectSpy = jest
      .spyOn(Element.prototype, 'getBoundingClientRect')
      .mockImplementation(function mockBoundingClientRect() {
        if (this === target) {
          return {
            top: targetTop,
            left: targetLeft,
            width: 240,
            height: targetHeight,
            right: targetLeft + 240,
            bottom: targetTop + targetHeight,
          };
        }
        if (this.id === 'onboardingTutorialOverlay') {
          return {
            top: 0,
            left: 0,
            width: 1024,
            height: 768,
            right: 1024,
            bottom: 768,
          };
        }
        if (this.classList && this.classList.contains('onboarding-card')) {
          const currentTop = parseFloat(this.style.top) || 0;
          const currentLeft = parseFloat(this.style.left) || 0;
          return {
            top: currentTop,
            left: currentLeft,
            width: cardWidth,
            height: cardHeight,
            right: currentLeft + cardWidth,
            bottom: currentTop + cardHeight,
          };
        }
        return originalGetBoundingClientRect.call(this);
      });

    try {
      const trigger = document.querySelector('[data-onboarding-tour-trigger]');
      const helpDialog = document.getElementById('helpDialog');
      expect(trigger).not.toBeNull();
      expect(helpDialog).not.toBeNull();

      helpDialog.removeAttribute('hidden');
      helpDialog.setAttribute('open', '');

      trigger.click();
      await new Promise(resolve => setTimeout(resolve, 40));

      const overlay = document.getElementById('onboardingTutorialOverlay');
      expect(overlay).not.toBeNull();

      const nextButton = overlay.querySelector('.onboarding-next-button');
      expect(nextButton).not.toBeNull();

      nextButton.click();
      await new Promise(resolve => setTimeout(resolve, 70));
      nextButton.click();
      await new Promise(resolve => setTimeout(resolve, 70));
      nextButton.click();
      await new Promise(resolve => setTimeout(resolve, 70));

      const card = overlay.querySelector('.onboarding-card');
      const highlight = overlay.querySelector('.onboarding-highlight');
      expect(card).not.toBeNull();
      expect(highlight).not.toBeNull();

      const initialTargetTop = targetTop;
      const initialCardTop = parseFloat(card.style.top);
      const initialTranslate = parseTranslate(highlight.style.transform);
      expect(initialCardTop).toBeCloseTo(initialTargetTop + targetHeight + 16, 1);
      expect(initialTranslate.y).toBeCloseTo(initialTargetTop - 12, 1);

      targetTop = 140;
      window.dispatchEvent(new Event('scroll'));
      document.dispatchEvent(new Event('scroll'));
      await new Promise(resolve => setTimeout(resolve, 20));
      await new Promise(resolve => setTimeout(resolve, 20));

      const scrolledCardTop = parseFloat(card.style.top);
      const scrolledTranslate = parseTranslate(highlight.style.transform);
      expect(scrolledCardTop).toBeCloseTo(targetTop + targetHeight + 16, 1);
      expect(scrolledTranslate.y).toBeCloseTo(targetTop - 12, 1);
    } finally {
      getBoundingClientRectSpy.mockRestore();
    }
  });

  test('welcome step uses large card sizing on compact viewports', async () => {
    const originalInnerWidth = global.innerWidth;
    const originalVisualViewport = global.visualViewport;

    global.innerWidth = 320;
    global.visualViewport = {
      width: 320,
      height: 640,
      offsetLeft: 0,
      offsetTop: 0,
      pageLeft: 0,
      pageTop: 0,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };

    try {
      loadModule();

      const trigger = document.querySelector('[data-onboarding-tour-trigger]');
      const helpDialog = document.getElementById('helpDialog');
      expect(trigger).not.toBeNull();
      expect(helpDialog).not.toBeNull();

      helpDialog.removeAttribute('hidden');
      helpDialog.setAttribute('open', '');

      trigger.click();
      await new Promise(resolve => setTimeout(resolve, 40));

      const overlay = document.getElementById('onboardingTutorialOverlay');
      expect(overlay).not.toBeNull();

      overlay.getBoundingClientRect = () => ({
        width: 320,
        height: 640,
        left: 0,
        top: 0,
        right: 320,
        bottom: 640,
      });

      window.dispatchEvent(new Event('resize'));
      await new Promise(resolve => setTimeout(resolve, 20));

      const card = overlay.querySelector('.onboarding-card');
      expect(card).not.toBeNull();

      const sizeAttr = card.getAttribute('data-size');
      expect(sizeAttr).toBe('large');

      const inlineSizeValue = card.style.getPropertyValue('--onboarding-card-hero-inline-size');
      expect(inlineSizeValue).toBe('');
    } finally {
      if (typeof originalInnerWidth === 'number') {
        global.innerWidth = originalInnerWidth;
      } else {
        delete global.innerWidth;
      }
      global.visualViewport = originalVisualViewport;
    }
  });

  test('welcome step keeps compact viewport margins balanced', async () => {
    const originalInnerWidth = global.innerWidth;
    const originalVisualViewport = global.visualViewport;

    global.innerWidth = 320;
    global.visualViewport = {
      width: 320,
      height: 640,
      offsetLeft: 0,
      offsetTop: 0,
      pageLeft: 0,
      pageTop: 0,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };

    try {
      loadModule();

      const trigger = document.querySelector('[data-onboarding-tour-trigger]');
      const helpDialog = document.getElementById('helpDialog');
      expect(trigger).not.toBeNull();
      expect(helpDialog).not.toBeNull();

      helpDialog.removeAttribute('hidden');
      helpDialog.setAttribute('open', '');

      trigger.click();
      await new Promise(resolve => setTimeout(resolve, 40));

      const overlay = document.getElementById('onboardingTutorialOverlay');
      expect(overlay).not.toBeNull();

      overlay.getBoundingClientRect = () => ({
        width: 320,
        height: 640,
        left: 0,
        top: 0,
        right: 320,
        bottom: 640,
      });

      window.dispatchEvent(new Event('resize'));
      await new Promise(resolve => setTimeout(resolve, 20));

      const card = overlay.querySelector('.onboarding-card');
      expect(card).not.toBeNull();

      const inlineSizeValue = card.style.getPropertyValue('--onboarding-card-hero-inline-size');
      expect(inlineSizeValue).toBe('');
      const measuredWidth = 296;

      card.getBoundingClientRect = () => ({
        width: measuredWidth,
        height: 420,
        top: 0,
        left: 0,
        right: measuredWidth,
        bottom: 420,
      });

      window.dispatchEvent(new Event('resize'));
      await new Promise(resolve => setTimeout(resolve, 20));

      const left = parseFloat(card.style.left);
      expect(Number.isFinite(left)).toBe(true);
      expect(left).toBeCloseTo(16, 1);
    } finally {
      if (typeof originalInnerWidth === 'number') {
        global.innerWidth = originalInnerWidth;
      } else {
        delete global.innerWidth;
      }
      global.visualViewport = originalVisualViewport;
    }
  });

  test('language step counts from one and stays synchronized', async () => {
    loadModule({ texts: minimalTexts });

    const trigger = document.querySelector('[data-onboarding-tour-trigger]');
    const helpDialog = document.getElementById('helpDialog');
    expect(trigger).not.toBeNull();
    expect(helpDialog).not.toBeNull();

    expect(global.texts.fr.onboardingTour.prefaceIndicator).toBe('Bienvenue');

    helpDialog.removeAttribute('hidden');
    helpDialog.setAttribute('open', '');

    trigger.click();
    await new Promise(resolve => setTimeout(resolve, 40));

    const overlay = document.getElementById('onboardingTutorialOverlay');
    expect(overlay).not.toBeNull();

    const progress = overlay.querySelector('.onboarding-progress');
    expect(progress).not.toBeNull();
    expect(progress.textContent).toBe('Welcome');

    let onboardingLanguage = overlay.querySelector('select.onboarding-hero-language-select');
    expect(onboardingLanguage).not.toBeNull();
    expect(onboardingLanguage.value).toBe('en');

    onboardingLanguage.value = 'de';
    onboardingLanguage.dispatchEvent(new Event('change', { bubbles: true }));
    await new Promise(resolve => setTimeout(resolve, 30));

    expect(progress.textContent).toBe('Willkommen');

    const headerLanguage = document.getElementById('languageSelect');
    const settingsLanguage = document.getElementById('settingsLanguage');
    expect(headerLanguage.value).toBe('de');
    expect(settingsLanguage.value).toBe('de');
    expect(global.currentLang).toBe('de');

    headerLanguage.value = 'fr';
    headerLanguage.dispatchEvent(new Event('change', { bubbles: true }));
    await new Promise(resolve => setTimeout(resolve, 30));

    // Ensure the welcome language selector mirrors header updates.
    onboardingLanguage = overlay.querySelector('select.onboarding-hero-language-select');
    expect(onboardingLanguage).not.toBeNull();
    expect(onboardingLanguage.value).toBe('fr');
    expect(settingsLanguage.value).toBe('fr');
    expect(global.currentLang).toBe('fr');

    await new Promise(resolve => setTimeout(resolve, 30));

    expect(progress.textContent).toBe('Bienvenue');

    const nextButton = overlay.querySelector('.onboarding-next-button');
    expect(nextButton).not.toBeNull();
    nextButton.click();
    await new Promise(resolve => setTimeout(resolve, 60));

    expect(progress.textContent).toBe('Étape 1 sur 32');
  });

  test('auto start honors skipped state refreshed during initialization', () => {
    const skipState = JSON.stringify({ version: 2, completed: false, skipped: true });
    const safeStorage = createTrackableStorage();
    const secondaryStorage = createTrackableStorage();
    const sessionStorageStub = createTrackableStorage();

    loadModule({
      readyState: 'loading',
      safeStorage,
      safeLocalStorage: secondaryStorage,
      localStorage: secondaryStorage,
      sessionStorage: sessionStorageStub,
    });

    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    try {
      safeStorage.setItem('cinePowerPlanner_onboardingTutorial', skipState);
      secondaryStorage.setItem('cinePowerPlanner_onboardingTutorial', skipState);
      sessionStorageStub.setItem('cinePowerPlanner_onboardingTutorial', skipState);

      document.readyState = 'complete';
      document.dispatchEvent(new Event('DOMContentLoaded'));

      expect(setTimeoutSpy).not.toHaveBeenCalledWith(expect.any(Function), 600);
    } finally {
      setTimeoutSpy.mockRestore();
      delete global.localStorage;
      delete global.sessionStorage;
    }
  });

  test('skipping onboarding persists across reloads when primary storage is unavailable', async () => {
    const persistentStorage = (() => {
      const values = new Map();
      return {
        getItem: jest.fn(key => (values.has(key) ? values.get(key) : null)),
        setItem: jest.fn((key, value) => {
          values.set(key, value);
        }),
        removeItem: jest.fn(key => {
          values.delete(key);
        }),
      };
    })();

    const failingStorageFactory = () => ({
      getItem: jest.fn(() => null),
      setItem: jest.fn(() => {
        throw new Error('blocked');
      }),
      removeItem: jest.fn(),
    });

    try {
      loadModule({
        safeStorage: failingStorageFactory(),
        safeLocalStorage: persistentStorage,
        localStorage: persistentStorage,
      });

      const firstModuleApi = getRegisteredModuleApi();
      expect(firstModuleApi).not.toBeNull();

      firstModuleApi.skip();

      loadModule({
        safeStorage: failingStorageFactory(),
        safeLocalStorage: persistentStorage,
        localStorage: persistentStorage,
      });

      const secondModuleApi = getRegisteredModuleApi();
      expect(secondModuleApi).not.toBeNull();

      const status = secondModuleApi.getStatus();
      expect(status).not.toBeNull();
      expect(status.skipped).toBe(true);
      expect(status.completed).toBe(false);
      expect(secondModuleApi.isActive()).toBe(false);
      await new Promise(resolve => setTimeout(resolve, 650));
      expect(secondModuleApi.isActive()).toBe(false);
    } finally {
      delete global.localStorage;
      delete global.sessionStorage;
    }
  });

});
