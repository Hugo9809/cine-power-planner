const {
  setupScriptEnvironment,
  UI_PREFERENCES_STORAGE_KEY,
} = require('../helpers/scriptEnvironment');

function seedUiPreferences(preferences) {
  const payload = JSON.stringify(preferences);
  localStorage.setItem(UI_PREFERENCES_STORAGE_KEY, payload);
  localStorage.setItem(`${UI_PREFERENCES_STORAGE_KEY}__backup`, payload);
}

describe('settings dialog theme interactions', () => {
  let cleanup;
  let globals;

  afterEach(() => {
    if (typeof cleanup === 'function') {
      cleanup();
      cleanup = undefined;
    }
    globals = undefined;
    localStorage.clear();
  });

  test('closing settings keeps custom accent overrides while pink mode stays active', () => {
    seedUiPreferences({
      pinkMode: 'true',
      accentColor: '#ff8800',
    });

    const { cleanup: clean, globals: stubs } = setupScriptEnvironment();
    cleanup = clean;
    globals = stubs;

    expect(document.body.classList.contains('pink-mode')).toBe(true);

    const settingsButton = document.getElementById('settingsButton');
    const settingsCancel = document.getElementById('settingsCancel');

    expect(settingsButton).toBeTruthy();
    expect(settingsCancel).toBeTruthy();

    settingsButton.click();
    settingsCancel.click();

    expect(document.body.classList.contains('pink-mode')).toBe(true);
    expect(document.documentElement.style.getPropertyValue('--accent-color')).toBe('#ff8800');
    expect(document.documentElement.style.getPropertyValue('--link-color')).toBe('#ff8800');
    expect(document.body.style.getPropertyValue('--accent-color')).toBe('#ff8800');
    expect(document.body.style.getPropertyValue('--link-color')).toBe('#ff8800');
  });

  test('pink mode without custom accent continues to rely on theme defaults', () => {
    seedUiPreferences({ pinkMode: 'true' });

    const { cleanup: clean, globals: stubs } = setupScriptEnvironment();
    cleanup = clean;
    globals = stubs;

    expect(document.body.classList.contains('pink-mode')).toBe(true);

    const settingsButton = document.getElementById('settingsButton');
    const settingsCancel = document.getElementById('settingsCancel');

    expect(settingsButton).toBeTruthy();
    expect(settingsCancel).toBeTruthy();

    settingsButton.click();
    settingsCancel.click();

    expect(document.documentElement.style.getPropertyValue('--accent-color')).toBe('');
    expect(document.documentElement.style.getPropertyValue('--link-color')).toBe('');
    expect(document.body.style.getPropertyValue('--accent-color')).toBe('');
    expect(document.body.style.getPropertyValue('--link-color')).toBe('');
  });

  test('pink mode can be toggled from settings dialog', () => {
    seedUiPreferences({ pinkMode: 'false' });

    const { cleanup: clean, globals: stubs } = setupScriptEnvironment();
    cleanup = clean;
    globals = stubs;

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
    expect(globals.getUiPreference('pinkMode')).toBe('true');
  });

  test('pink mode toggles auto-save from settings dialog', () => {
    seedUiPreferences({ pinkMode: 'false' });

    const { cleanup: clean, globals: stubs } = setupScriptEnvironment();
    cleanup = clean;
    globals = stubs;

    const settingsButton = document.getElementById('settingsButton');
    const settingsPinkMode = document.getElementById('settingsPinkMode');

    expect(settingsButton).toBeTruthy();
    expect(settingsPinkMode).toBeTruthy();

    settingsButton.click();

    expect(settingsPinkMode.checked).toBe(false);

    settingsPinkMode.checked = true;
    settingsPinkMode.dispatchEvent(new Event('change', { bubbles: true }));

    expect(document.body.classList.contains('pink-mode')).toBe(true);
    expect(globals.getUiPreference('pinkMode')).toBe('true');

    settingsPinkMode.checked = false;
    settingsPinkMode.dispatchEvent(new Event('change', { bubbles: true }));

    expect(document.body.classList.contains('pink-mode')).toBe(false);
    expect(globals.getUiPreference('pinkMode')).toBe('false');
  });

  test('pink mode auto-save can be reverted by cancelling settings', () => {
    seedUiPreferences({ pinkMode: 'false' });

    const { cleanup: clean, globals: stubs } = setupScriptEnvironment();
    cleanup = clean;
    globals = stubs;

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
    expect(globals.getUiPreference('pinkMode')).toBe('true');

    settingsCancel.click();

    expect(document.body.classList.contains('pink-mode')).toBe(false);
    expect(globals.getUiPreference('pinkMode')).toBe('false');
  });

  test('pink mode auto-save can be reverted when closing with escape', () => {
    seedUiPreferences({ pinkMode: 'false' });

    const { cleanup: clean, globals: stubs } = setupScriptEnvironment();
    cleanup = clean;
    globals = stubs;

    const settingsButton = document.getElementById('settingsButton');
    const settingsPinkMode = document.getElementById('settingsPinkMode');

    expect(settingsButton).toBeTruthy();
    expect(settingsPinkMode).toBeTruthy();

    settingsButton.click();

    settingsPinkMode.checked = true;
    settingsPinkMode.dispatchEvent(new Event('change', { bubbles: true }));

    expect(document.body.classList.contains('pink-mode')).toBe(true);
    expect(globals.getUiPreference('pinkMode')).toBe('true');

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));

    expect(document.body.classList.contains('pink-mode')).toBe(false);
    expect(globals.getUiPreference('pinkMode')).toBe('false');
  });
});
