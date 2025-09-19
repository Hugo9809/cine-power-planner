const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

describe('settings dialog theme interactions', () => {
  let cleanup;

  afterEach(() => {
    if (typeof cleanup === 'function') {
      cleanup();
      cleanup = undefined;
    }
    localStorage.clear();
  });

  test('closing settings keeps pink mode accent overrides cleared', () => {
    localStorage.setItem('pinkMode', 'true');
    localStorage.setItem('accentColor', '#ff8800');

    const { cleanup: clean } = setupScriptEnvironment();
    cleanup = clean;

    expect(document.body.classList.contains('pink-mode')).toBe(true);

    const settingsButton = document.getElementById('settingsButton');
    const settingsCancel = document.getElementById('settingsCancel');

    expect(settingsButton).toBeTruthy();
    expect(settingsCancel).toBeTruthy();

    settingsButton.click();
    settingsCancel.click();

    expect(document.body.classList.contains('pink-mode')).toBe(true);
    expect(document.documentElement.style.getPropertyValue('--accent-color')).toBe('');
    expect(document.documentElement.style.getPropertyValue('--link-color')).toBe('');
    expect(document.body.style.getPropertyValue('--accent-color')).toBe('');
    expect(document.body.style.getPropertyValue('--link-color')).toBe('');
  });

  test('pink mode can be toggled from settings dialog', () => {
    localStorage.setItem('pinkMode', 'false');

    const { cleanup: clean } = setupScriptEnvironment();
    cleanup = clean;

    expect(document.body.classList.contains('pink-mode')).toBe(false);

    const settingsButton = document.getElementById('settingsButton');
    const settingsSave = document.getElementById('settingsSave');
    const settingsPinkMode = document.getElementById('settingsPinkMode');

    expect(settingsButton).toBeTruthy();
    expect(settingsSave).toBeTruthy();
    expect(settingsPinkMode).toBeTruthy();

    settingsButton.click();

    expect(settingsPinkMode.checked).toBe(false);

    settingsPinkMode.checked = true;
    settingsSave.click();

    expect(document.body.classList.contains('pink-mode')).toBe(true);
    expect(localStorage.getItem('pinkMode')).toBe('true');
  });

  test('pink mode toggles auto-save from settings dialog', () => {
    localStorage.setItem('pinkMode', 'false');

    const { cleanup: clean } = setupScriptEnvironment();
    cleanup = clean;

    const settingsButton = document.getElementById('settingsButton');
    const settingsPinkMode = document.getElementById('settingsPinkMode');

    expect(settingsButton).toBeTruthy();
    expect(settingsPinkMode).toBeTruthy();

    settingsButton.click();

    expect(settingsPinkMode.checked).toBe(false);

    settingsPinkMode.checked = true;
    settingsPinkMode.dispatchEvent(new Event('change', { bubbles: true }));

    expect(document.body.classList.contains('pink-mode')).toBe(true);
    expect(localStorage.getItem('pinkMode')).toBe('true');

    settingsPinkMode.checked = false;
    settingsPinkMode.dispatchEvent(new Event('change', { bubbles: true }));

    expect(document.body.classList.contains('pink-mode')).toBe(false);
    expect(localStorage.getItem('pinkMode')).toBe('false');
  });

  test('pink mode auto-save can be reverted by cancelling settings', () => {
    localStorage.setItem('pinkMode', 'false');

    const { cleanup: clean } = setupScriptEnvironment();
    cleanup = clean;

    const settingsButton = document.getElementById('settingsButton');
    const settingsPinkMode = document.getElementById('settingsPinkMode');
    const settingsCancel = document.getElementById('settingsCancel');

    expect(settingsButton).toBeTruthy();
    expect(settingsPinkMode).toBeTruthy();
    expect(settingsCancel).toBeTruthy();

    settingsButton.click();

    expect(settingsPinkMode.checked).toBe(false);

    settingsPinkMode.checked = true;
    settingsPinkMode.dispatchEvent(new Event('change', { bubbles: true }));

    expect(document.body.classList.contains('pink-mode')).toBe(true);
    expect(localStorage.getItem('pinkMode')).toBe('true');

    settingsCancel.click();

    expect(document.body.classList.contains('pink-mode')).toBe(false);
    expect(localStorage.getItem('pinkMode')).toBe('false');
  });

  test('pink mode auto-save can be reverted when closing with escape', () => {
    localStorage.setItem('pinkMode', 'false');

    const { cleanup: clean } = setupScriptEnvironment();
    cleanup = clean;

    const settingsButton = document.getElementById('settingsButton');
    const settingsPinkMode = document.getElementById('settingsPinkMode');

    expect(settingsButton).toBeTruthy();
    expect(settingsPinkMode).toBeTruthy();

    settingsButton.click();

    settingsPinkMode.checked = true;
    settingsPinkMode.dispatchEvent(new Event('change', { bubbles: true }));

    expect(document.body.classList.contains('pink-mode')).toBe(true);
    expect(localStorage.getItem('pinkMode')).toBe('true');

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));

    expect(document.body.classList.contains('pink-mode')).toBe(false);
    expect(localStorage.getItem('pinkMode')).toBe('false');
  });
});
