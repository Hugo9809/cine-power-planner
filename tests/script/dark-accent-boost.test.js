const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

describe('dark accent boost for bright custom colors', () => {
  let cleanup;

  afterEach(() => {
    if (typeof cleanup === 'function') {
      cleanup();
      cleanup = undefined;
    }
    localStorage.clear();
  });

  test('enables boost when custom accent brightness is similar to pink in dark mode', () => {
    localStorage.setItem('accentColor', '#ff6ab5');
    localStorage.setItem('darkMode', 'true');

    const { cleanup: clean } = setupScriptEnvironment();
    cleanup = clean;

    expect(document.body.classList.contains('dark-mode')).toBe(true);
    expect(document.body.classList.contains('pink-mode')).toBe(false);
    expect(document.body.classList.contains('dark-accent-boost')).toBe(true);
  });

  test('enables boost for bright custom accents in dark mode', () => {
    localStorage.setItem('accentColor', '#ffee58');
    localStorage.setItem('darkMode', 'true');

    const { cleanup: clean } = setupScriptEnvironment();
    cleanup = clean;

    expect(document.body.classList.contains('dark-mode')).toBe(true);
    expect(document.body.classList.contains('pink-mode')).toBe(false);
    expect(document.body.classList.contains('dark-accent-boost')).toBe(true);
  });

  test('removes boost when accent color changes to a darker tone', () => {
    localStorage.setItem('accentColor', '#ff6ab5');
    localStorage.setItem('darkMode', 'true');

    const { cleanup: clean } = setupScriptEnvironment();
    cleanup = clean;

    const accentColorInput = document.getElementById('accentColorInput');
    expect(accentColorInput).toBeTruthy();

    accentColorInput.value = '#123456';
    accentColorInput.dispatchEvent(new Event('input', { bubbles: true }));

    expect(document.body.classList.contains('dark-accent-boost')).toBe(false);
  });

  test('removes boost when leaving dark mode', () => {
    localStorage.setItem('accentColor', '#ff6ab5');
    localStorage.setItem('darkMode', 'true');

    const { cleanup: clean } = setupScriptEnvironment();
    cleanup = clean;

    const darkModeToggle = document.getElementById('darkModeToggle');
    expect(darkModeToggle).toBeTruthy();

    darkModeToggle.click();

    expect(document.body.classList.contains('dark-mode')).toBe(false);
    expect(document.body.classList.contains('dark-accent-boost')).toBe(false);
  });

  test('does not enable boost in light mode even with bright accent colors', () => {
    localStorage.setItem('accentColor', '#ffee58');
    localStorage.setItem('darkMode', 'false');

    const { cleanup: clean } = setupScriptEnvironment();
    cleanup = clean;

    expect(document.body.classList.contains('dark-mode')).toBe(false);
    expect(document.body.classList.contains('dark-accent-boost')).toBe(false);
  });
});
