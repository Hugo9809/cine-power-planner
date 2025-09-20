const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

describe('offline indicator behaviour', () => {
  let env;
  let originalOnlineDescriptor;

  beforeEach(() => {
    originalOnlineDescriptor = Object.getOwnPropertyDescriptor(window.navigator, 'onLine');
    Object.defineProperty(window.navigator, 'onLine', { configurable: true, value: true });
    env = setupScriptEnvironment();
  });

  afterEach(() => {
    if (originalOnlineDescriptor) {
      Object.defineProperty(window.navigator, 'onLine', originalOnlineDescriptor);
    } else {
      delete window.navigator.onLine;
    }
    env?.cleanup();
  });

  test('shows and hides the indicator based on navigator.onLine', () => {
    const indicator = document.getElementById('offlineIndicator');
    expect(indicator).not.toBeNull();
    expect(indicator.style.display).toBe('none');

    Object.defineProperty(window.navigator, 'onLine', { configurable: true, value: false });
    window.dispatchEvent(new window.Event('offline'));
    expect(indicator.style.display).toBe('block');

    Object.defineProperty(window.navigator, 'onLine', { configurable: true, value: true });
    window.dispatchEvent(new window.Event('online'));
    expect(indicator.style.display).toBe('none');
  });
});

describe('side menu accessibility controls', () => {
  let env;

  beforeEach(() => {
    env = setupScriptEnvironment();
    env.utils.setupSideMenu();
  });

  afterEach(() => {
    env?.cleanup();
  });

  const getMenuElements = () => ({
    toggle: document.getElementById('menuToggle'),
    menu: document.getElementById('sideMenu'),
    overlay: document.getElementById('menuOverlay')
  });

  test('toggle button opens the menu and overlay click closes it', () => {
    const { toggle, menu, overlay } = getMenuElements();

    expect(menu.classList.contains('open')).toBe(false);

    toggle.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));

    expect(menu.classList.contains('open')).toBe(true);
    expect(menu.hasAttribute('hidden')).toBe(false);
    expect(overlay.classList.contains('hidden')).toBe(false);
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(toggle.getAttribute('aria-label')).toBe('Close menu');

    overlay.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));

    expect(menu.classList.contains('open')).toBe(false);
    expect(menu.getAttribute('hidden')).toBe('');
    expect(overlay.classList.contains('hidden')).toBe(true);
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(toggle.getAttribute('aria-label')).toBe('Menu');
  });

  test('pressing Escape closes the menu and restores focus to the toggle', () => {
    const { toggle, menu } = getMenuElements();

    toggle.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
    document.getElementById('mainContent').focus();

    const escapeEvent = new window.KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(escapeEvent);

    expect(menu.classList.contains('open')).toBe(false);
    expect(document.activeElement).toBe(toggle);
  });
});

describe('side menu automatic initialization', () => {
  test('toggle opens the menu when the script loads after DOM ready', () => {
    const env = setupScriptEnvironment({ readyState: 'complete' });
    try {
      const toggle = document.getElementById('menuToggle');
      const menu = document.getElementById('sideMenu');

      expect(toggle).not.toBeNull();
      expect(menu).not.toBeNull();
      expect(menu.classList.contains('open')).toBe(false);

      toggle.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));

      expect(menu.classList.contains('open')).toBe(true);
      expect(toggle.getAttribute('aria-expanded')).toBe('true');
    } finally {
      env?.cleanup();
    }
  });
});

describe('responsive control relocation', () => {
  let env;
  let originalMatchMedia;
  let mediaQueryList;
  let changeListeners;

  beforeEach(() => {
    changeListeners = [];
    originalMatchMedia = window.matchMedia;
    window.matchMedia = jest.fn().mockImplementation(() => {
      mediaQueryList = {
        matches: false,
        addEventListener: (event, handler) => {
          if (event === 'change') {
            changeListeners.push(handler);
          }
        },
        removeEventListener: jest.fn()
      };
      return mediaQueryList;
    });

    env = setupScriptEnvironment();
    env.utils.setupResponsiveControls();
  });

  afterEach(() => {
    env?.cleanup();
    if (originalMatchMedia) {
      window.matchMedia = originalMatchMedia;
    } else {
      delete window.matchMedia;
    }
  });

  const dispatchChange = matches => {
    mediaQueryList.matches = matches;
    changeListeners.forEach(listener => listener({ matches }));
  };

  test('moves search controls into sidebar on small viewports and back on large screens', () => {
    const topBar = document.getElementById('topBar');
    const sidebarControls = document.querySelector('#sideMenu .sidebar-controls');
    const featureSearch = document.querySelector('.feature-search');
    const controls = document.querySelector('nav.controls');

    expect(topBar.contains(featureSearch)).toBe(true);
    expect(topBar.contains(controls)).toBe(true);

    dispatchChange(true);

    expect(sidebarControls.contains(featureSearch)).toBe(true);
    expect(sidebarControls.contains(controls)).toBe(true);

    dispatchChange(false);

    expect(topBar.contains(featureSearch)).toBe(true);
    expect(topBar.contains(controls)).toBe(true);
  });
});
