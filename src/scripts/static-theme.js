(function () {
  var DEFAULT_ACCENT = '#001589';
  var HIGH_CONTRAST_ACCENT = '#ffffff';
  var storageErrorLogged = false;

  function safeGet(key) {
    try {
      return window.localStorage ? localStorage.getItem(key) : null;
    } catch (err) {
      if (!storageErrorLogged) {
        console.warn('Unable to read localStorage preference', err);
        storageErrorLogged = true;
      }
      return null;
    }
  }

  function updateThemeColor(isDark) {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', isDark ? '#1c1c1e' : '#f9f9f9');
    }
  }

  function applyAccent(color, root, body) {
    var highContrastActive =
      root.classList.contains('high-contrast') ||
      (body && body.classList.contains('high-contrast'));
    var accentValue = highContrastActive ? HIGH_CONTRAST_ACCENT : color;

    root.style.setProperty('--accent-color', accentValue);
    if (highContrastActive) {
      root.style.removeProperty('--link-color');
    } else {
      root.style.setProperty('--link-color', color);
    }
    root.style.setProperty('--logo-background-color', accentValue);
    root.style.setProperty('--logo-accent-color', accentValue);

    if (body) {
      body.style.setProperty('--accent-color', accentValue);
      if (highContrastActive) {
        body.style.removeProperty('--link-color');
      } else {
        body.style.setProperty('--link-color', color);
      }
      body.style.setProperty('--logo-background-color', accentValue);
      body.style.setProperty('--logo-accent-color', accentValue);
    }
  }

  function applyPreferences() {
    var root = document.documentElement;
    var body = document.body;
    if (!root || !body) {
      return;
    }

    var highContrastEnabled = safeGet('highContrast') === 'true';
    root.classList.toggle('high-contrast', highContrastEnabled);
    body.classList.toggle('high-contrast', highContrastEnabled);

    var storedReduceMotion = safeGet('reduceMotion');
    if (
      storedReduceMotion === null &&
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function'
    ) {
      storedReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'true'
        : 'false';
    }
    var reduceMotionEnabled = storedReduceMotion === 'true';
    root.classList.toggle('reduce-motion', reduceMotionEnabled);
    body.classList.toggle('reduce-motion', reduceMotionEnabled);

    var relaxedSpacingEnabled = safeGet('relaxedSpacing') === 'true';
    root.classList.toggle('relaxed-spacing', relaxedSpacingEnabled);
    body.classList.toggle('relaxed-spacing', relaxedSpacingEnabled);

    var pinkModeEnabled = safeGet('pinkMode') === 'true';
    root.classList.toggle('pink-mode', pinkModeEnabled);
    body.classList.toggle('pink-mode', pinkModeEnabled);

    var storedFontSize = safeGet('fontSize');
    if (storedFontSize) {
      root.style.fontSize = storedFontSize + 'px';
    }

    var storedFontFamily = safeGet('fontFamily');
    if (storedFontFamily) {
      root.style.setProperty('--font-family', storedFontFamily);
    }

    var storedDarkMode = safeGet('darkMode');
    if (storedDarkMode === null && typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      storedDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'true' : 'false';
    }
    var darkModeEnabled = storedDarkMode === 'true';
    root.classList.toggle('dark-mode', darkModeEnabled);
    body.classList.toggle('dark-mode', darkModeEnabled);
    root.classList.toggle('light-mode', !darkModeEnabled);
    body.classList.toggle('light-mode', !darkModeEnabled);
    updateThemeColor(darkModeEnabled);

    var storedAccent = safeGet('accentColor');
    var accentColor = storedAccent || DEFAULT_ACCENT;
    if (pinkModeEnabled) {
      root.style.removeProperty('--accent-color');
      root.style.removeProperty('--link-color');
      body.style.removeProperty('--accent-color');
      body.style.removeProperty('--link-color');
      root.style.removeProperty('--logo-background-color');
      root.style.removeProperty('--logo-accent-color');
      body.style.removeProperty('--logo-background-color');
      body.style.removeProperty('--logo-accent-color');
    } else {
      applyAccent(accentColor, root, body);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyPreferences);
  } else {
    applyPreferences();
  }
})();
