const path = require('path');

const UI_PREFERENCES_STORAGE_KEY = 'cameraPowerPlanner_uiPreferences';

describe('static theme preferences', () => {
  let readyStateValue;
  let originalReadyStateDescriptor;

  beforeAll(() => {
    originalReadyStateDescriptor = Object.getOwnPropertyDescriptor(document, 'readyState');
  });

  beforeEach(() => {
    jest.resetModules();
    localStorage.clear();
    localStorage.getItem.mockClear();
    localStorage.setItem.mockClear();
    localStorage.removeItem.mockClear();
    localStorage.clear.mockClear();
    readyStateValue = 'complete';
    Object.defineProperty(document, 'readyState', {
      configurable: true,
      get: () => readyStateValue
    });
    document.head.innerHTML = '<meta name="theme-color" content="#ffffff">';
    document.body.className = '';
    document.body.style.cssText = '';
    document.documentElement.className = '';
    document.documentElement.style.cssText = '';
  });

  afterEach(() => {
    if (originalReadyStateDescriptor) {
      Object.defineProperty(document, 'readyState', originalReadyStateDescriptor);
    } else {
      delete document.readyState;
    }
    jest.restoreAllMocks();
    localStorage.clear();
    localStorage.getItem.mockClear();
    localStorage.setItem.mockClear();
    localStorage.removeItem.mockClear();
    localStorage.clear.mockClear();
    document.head.innerHTML = '';
    document.body.className = '';
    document.body.style.cssText = '';
    document.documentElement.className = '';
    document.documentElement.style.cssText = '';
  });

  const loadStaticTheme = () => {
    // Resolve the module relative to the repository root rather than the test file.
    const staticThemePath = path.join(__dirname, '..', '..', 'src/scripts/static-theme.js');
    require(staticThemePath);
  };

  test('applies stored theme preferences immediately when DOM is ready', () => {
    const preferences = {
      highContrast: 'true',
      pinkMode: 'false',
      fontSize: '18',
      fontFamily: 'Atkinson Hyperlegible',
      darkMode: 'true',
      accentColor: '#ff8800',
    };
    const payload = JSON.stringify(preferences);
    localStorage.setItem(UI_PREFERENCES_STORAGE_KEY, payload);
    localStorage.setItem(`${UI_PREFERENCES_STORAGE_KEY}__backup`, payload);

    loadStaticTheme();

    const root = document.documentElement;
    const body = document.body;
    const themeMeta = document.querySelector('meta[name="theme-color"]');

    expect(root.classList.contains('high-contrast')).toBe(true);
    expect(body.classList.contains('high-contrast')).toBe(true);
    expect(root.classList.contains('dark-mode')).toBe(true);
    expect(body.classList.contains('dark-mode')).toBe(true);
    expect(root.classList.contains('light-mode')).toBe(false);
    expect(body.classList.contains('light-mode')).toBe(false);
    expect(body.classList.contains('pink-mode')).toBe(false);

    expect(root.style.fontSize).toBe('18px');
    expect(root.style.getPropertyValue('--font-family')).toBe('Atkinson Hyperlegible');

    expect(root.style.getPropertyValue('--accent-color')).toBe('#ffffff');
    expect(root.style.getPropertyValue('--link-color')).toBe('');
    expect(body.style.getPropertyValue('--accent-color')).toBe('#ffffff');
    expect(body.style.getPropertyValue('--link-color')).toBe('');
    expect(themeMeta.getAttribute('content')).toBe('#1c1c1e');
  });

  test('defers applying theme until DOMContentLoaded and logs storage errors once', () => {
    readyStateValue = 'loading';
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const getItemSpy = jest.spyOn(localStorage, 'getItem').mockImplementation(() => {
      throw new Error('denied');
    });

    loadStaticTheme();

    expect(getItemSpy).not.toHaveBeenCalled();

    document.dispatchEvent(new Event('DOMContentLoaded'));

    expect(getItemSpy).toHaveBeenCalled();
    expect(warnSpy).toHaveBeenCalledTimes(1);

    const root = document.documentElement;
    const body = document.body;
    const themeMeta = document.querySelector('meta[name="theme-color"]');

    expect(root.classList.contains('light-mode')).toBe(true);
    expect(body.classList.contains('light-mode')).toBe(true);
    expect(root.classList.contains('dark-mode')).toBe(false);
    expect(body.classList.contains('dark-mode')).toBe(false);
    expect(root.classList.contains('high-contrast')).toBe(false);
    expect(body.classList.contains('high-contrast')).toBe(false);

    expect(root.style.getPropertyValue('--accent-color')).toBe('#001589');
    expect(root.style.getPropertyValue('--link-color')).toBe('#001589');
    expect(body.style.getPropertyValue('--accent-color')).toBe('#001589');
    expect(body.style.getPropertyValue('--link-color')).toBe('#001589');
    expect(themeMeta.getAttribute('content')).toBe('#f9f9f9');
  });

  test('retains stored custom accent when pink mode is enabled', () => {
    const payload = JSON.stringify({ pinkMode: 'true', accentColor: '#ff8800' });
    localStorage.getItem.mockImplementation(key => {
      if (key === UI_PREFERENCES_STORAGE_KEY) {
        return payload;
      }
      return null;
    });

    loadStaticTheme();

    const root = document.documentElement;
    const body = document.body;

    expect(body.classList.contains('pink-mode')).toBe(true);
    expect(root.style.getPropertyValue('--accent-color')).toBe('#ff8800');
    expect(root.style.getPropertyValue('--link-color')).toBe('#ff8800');
    expect(body.style.getPropertyValue('--accent-color')).toBe('#ff8800');
    expect(body.style.getPropertyValue('--link-color')).toBe('#ff8800');
  });
});
