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
});
