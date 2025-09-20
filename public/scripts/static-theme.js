(function () {
  const DEFAULT_ACCENT = '#001589';
  const HIGH_CONTRAST_ACCENT = '#ffffff';
  let storageErrorLogged = false;

  const safeGet = key => {
    try {
      return window.localStorage ? localStorage.getItem(key) : null;
    } catch (err) {
      if (!storageErrorLogged) {
        console.warn('Unable to read localStorage preference', err);
        storageErrorLogged = true;
      }
      return null;
    }
  };

  const updateThemeColor = isDark => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', isDark ? '#1c1c1e' : '#f9f9f9');
    }
  };

  const applyAccent = (color, root, body) => {
    const highContrastActive =
      root.classList.contains('high-contrast') ||
      (body && body.classList.contains('high-contrast'));
    const accentValue = highContrastActive ? HIGH_CONTRAST_ACCENT : color;

    root.style.setProperty('--accent-color', accentValue);
    if (highContrastActive) {
      root.style.removeProperty('--link-color');
    } else {
      root.style.setProperty('--link-color', color);
    }

    if (body) {
      body.style.setProperty('--accent-color', accentValue);
      if (highContrastActive) {
        body.style.removeProperty('--link-color');
      } else {
        body.style.setProperty('--link-color', color);
      }
    }
  };

  const applyPreferences = () => {
    const root = document.documentElement;
    const body = document.body;
    if (!root || !body) return;

    const highContrastEnabled = safeGet('highContrast') === 'true';
    root.classList.toggle('high-contrast', highContrastEnabled);
    body.classList.toggle('high-contrast', highContrastEnabled);

    const pinkModeEnabled = safeGet('pinkMode') === 'true';
    body.classList.toggle('pink-mode', pinkModeEnabled);

    const storedFontSize = safeGet('fontSize');
    if (storedFontSize) {
      root.style.fontSize = `${storedFontSize}px`;
    }

    const storedFontFamily = safeGet('fontFamily');
    if (storedFontFamily) {
      root.style.setProperty('--font-family', storedFontFamily);
    }

    let storedDarkMode = safeGet('darkMode');
    if (storedDarkMode === null && typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      storedDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'true' : 'false';
    }
    const darkModeEnabled = storedDarkMode === 'true';
    root.classList.toggle('dark-mode', darkModeEnabled);
    body.classList.toggle('dark-mode', darkModeEnabled);
    root.classList.toggle('light-mode', !darkModeEnabled);
    body.classList.toggle('light-mode', !darkModeEnabled);
    updateThemeColor(darkModeEnabled);

    const accentColor = safeGet('accentColor') || DEFAULT_ACCENT;
    if (pinkModeEnabled) {
      root.style.removeProperty('--accent-color');
      root.style.removeProperty('--link-color');
      body.style.removeProperty('--accent-color');
      body.style.removeProperty('--link-color');
    } else {
      applyAccent(accentColor, root, body);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyPreferences);
  } else {
    applyPreferences();
  }
})();
