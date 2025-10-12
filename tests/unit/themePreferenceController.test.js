const { JSDOM } = require('jsdom');

describe('theme preference controller', () => {
  let appearanceModule;
  let windowRef;
  let documentRef;
  let safeWarnSpy;

  function createStorage(initialValue) {
    const store = Object.create(null);
    if (typeof initialValue !== 'undefined') {
      store.darkMode = String(initialValue);
    }
    return {
      getItem(key) {
        return Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null;
      },
      setItem(key, value) {
        store[key] = String(value);
      },
      removeItem(key) {
        delete store[key];
      },
      _store: store,
    };
  }

  function setupModule(options = {}) {
    jest.resetModules();
    const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
    windowRef = dom.window;
    documentRef = dom.window.document;
    global.document = documentRef;
    global.window = windowRef;

    safeWarnSpy = jest.fn();
    global.cineModuleBase = {
      freezeDeep: value => value,
      safeWarn: safeWarnSpy,
      informModuleGlobals: jest.fn(),
      registerOrQueueModule: jest.fn(),
      exposeGlobal: jest.fn(),
    };

    const localStorageStub = options.localStorage || createStorage();
    const sessionStorageStub = options.sessionStorage || createStorage();
    Object.defineProperty(windowRef, 'localStorage', {
      value: localStorageStub,
      configurable: true,
      writable: true,
    });
    Object.defineProperty(windowRef, 'sessionStorage', {
      value: sessionStorageStub,
      configurable: true,
      writable: true,
    });
    global.localStorage = localStorageStub;
    global.sessionStorage = sessionStorageStub;

    appearanceModule = require('../../src/scripts/modules/settings-and-appearance.js');

    const headerButton = documentRef.createElement('button');
    headerButton.setAttribute('id', 'darkModeToggle');
    documentRef.body.appendChild(headerButton);

    const settingsCheckbox = documentRef.createElement('input');
    settingsCheckbox.type = 'checkbox';
    settingsCheckbox.setAttribute('id', 'settingsDarkMode');
    documentRef.body.appendChild(settingsCheckbox);

    const contextStorage = options.storage || {};

    const manager = appearanceModule.initialize({
      document: documentRef,
      window: windowRef,
      elements: {
        darkModeToggle: headerButton,
      },
      settings: {
        darkMode: settingsCheckbox,
      },
      storage: {
        getLocalStorage: contextStorage.getLocalStorage
          || (() => localStorageStub),
        getSafeLocalStorage: contextStorage.getSafeLocalStorage || (() => null),
        resolveSafeLocalStorage: contextStorage.resolveSafeLocalStorage || (() => null),
      },
    });

    return {
      manager,
      headerButton,
      settingsCheckbox,
      cleanup() {
        delete global.cineModuleBase;
        delete global.window;
        delete global.document;
        delete global.localStorage;
        delete global.sessionStorage;
      },
    };
  }

  afterEach(() => {
    delete global.cineModuleBase;
    delete global.window;
    delete global.document;
    delete global.localStorage;
    delete global.sessionStorage;
  });

  test('keeps theme controls in sync across onboarding, header, and settings', () => {
    const safeStorage = createStorage(false);
    const localStorage = createStorage(false);
    const { manager, headerButton, settingsCheckbox } = setupModule({
      storage: {
        getSafeLocalStorage: () => safeStorage,
        resolveSafeLocalStorage: () => safeStorage,
        getLocalStorage: () => localStorage,
      },
    });

    const controller = manager.createThemePreferenceController();

    const onboardingSelect = documentRef.createElement('select');
    const optionLight = documentRef.createElement('option');
    optionLight.value = 'light';
    onboardingSelect.appendChild(optionLight);
    const optionDark = documentRef.createElement('option');
    optionDark.value = 'dark';
    onboardingSelect.appendChild(optionDark);
    documentRef.body.appendChild(onboardingSelect);

    controller.registerControl(settingsCheckbox, { type: 'checkbox' });
    controller.registerControl(headerButton, { type: 'button' });
    controller.registerControl(onboardingSelect, { type: 'select' });

    onboardingSelect.value = 'dark';
    onboardingSelect.dispatchEvent(new windowRef.Event('change', { bubbles: true }));

    expect(settingsCheckbox.checked).toBe(true);
    expect(headerButton.getAttribute('aria-pressed')).toBe('true');
    expect(documentRef.body.classList.contains('dark-mode')).toBe(true);
    expect(safeStorage.getItem('darkMode')).toBe('true');
    expect(localStorage.getItem('darkMode')).toBe('true');

    headerButton.dispatchEvent(new windowRef.Event('click'));
    expect(onboardingSelect.value).toBe('light');
    expect(settingsCheckbox.checked).toBe(false);
    expect(documentRef.body.classList.contains('dark-mode')).toBe(false);
  });

  test('reloadFromStorage synchronizes value from storage sources', () => {
    const safeStorage = createStorage('true');
    const localStorage = createStorage('false');
    const { manager, settingsCheckbox } = setupModule({
      storage: {
        getSafeLocalStorage: () => safeStorage,
        resolveSafeLocalStorage: () => safeStorage,
        getLocalStorage: () => localStorage,
      },
    });

    const controller = manager.createThemePreferenceController();
    controller.registerControl(settingsCheckbox, { type: 'checkbox' });

    expect(documentRef.body.classList.contains('dark-mode')).toBe(true);

    safeStorage.setItem('darkMode', 'false');
    controller.reloadFromStorage();

    expect(documentRef.body.classList.contains('dark-mode')).toBe(false);
    expect(settingsCheckbox.checked).toBe(false);
    expect(localStorage.getItem('darkMode')).toBe('false');
  });

  test('gracefully handles safe storage failures while persisting', () => {
    const failingSafeStorage = {
      getItem: jest.fn(() => null),
      setItem: jest.fn(() => {
        throw new Error('quota exceeded');
      }),
    };
    const localStorage = createStorage(false);
    const { manager, settingsCheckbox } = setupModule({
      storage: {
        getSafeLocalStorage: () => failingSafeStorage,
        resolveSafeLocalStorage: () => failingSafeStorage,
        getLocalStorage: () => localStorage,
      },
    });

    const controller = manager.createThemePreferenceController();
    controller.registerControl(settingsCheckbox, { type: 'checkbox' });

    expect(() => controller.setValue(true)).not.toThrow();
    expect(localStorage.getItem('darkMode')).toBe('true');
    expect(safeWarnSpy).toHaveBeenCalled();
  });

  test('setValue persists even when value is unchanged', () => {
    const safeStorage = createStorage('false');
    const { manager } = setupModule({
      storage: {
        getSafeLocalStorage: () => safeStorage,
        resolveSafeLocalStorage: () => safeStorage,
        getLocalStorage: () => safeStorage,
      },
    });

    const controller = manager.createThemePreferenceController();
    expect(safeStorage.getItem('darkMode')).toBe('false');

    controller.setValue(false);
    expect(safeStorage.getItem('darkMode')).toBe('false');

    controller.setValue(true);
    expect(safeStorage.getItem('darkMode')).toBe('true');
  });
});
