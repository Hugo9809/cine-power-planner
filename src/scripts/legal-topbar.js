(function () {
  'use strict';

  var DEFAULT_ACCENT = '#001589';
  var HIGH_CONTRAST_ACCENT = '#ffffff';
  var storageErrorLogged = false;

  function getRoot() {
    return document.documentElement || document.getElementsByTagName('html')[0];
  }

  function getBody() {
    return document.body || document.getElementsByTagName('body')[0];
  }

  function safeGet(key) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch (error) {
      if (!storageErrorLogged) {
        console.warn('Unable to read localStorage preference', error);
        storageErrorLogged = true;
      }
    }
    return null;
  }

  function safeSet(key, value) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch (error) {
      if (!storageErrorLogged) {
        console.warn('Unable to store localStorage preference', error);
        storageErrorLogged = true;
      }
    }
  }

  function updateThemeColor(isDarkMode) {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', isDarkMode ? '#1c1c1e' : '#f9f9f9');
    }
  }

  function clearAccentStyles(root, body) {
    if (!root) return;
    root.style.removeProperty('--accent-color');
    root.style.removeProperty('--link-color');
    root.style.removeProperty('--logo-background-color');
    root.style.removeProperty('--logo-accent-color');
    if (body) {
      body.style.removeProperty('--accent-color');
      body.style.removeProperty('--link-color');
      body.style.removeProperty('--logo-background-color');
      body.style.removeProperty('--logo-accent-color');
    }
  }

  function applyAccentStyles(color, root, body) {
    if (!root) return;

    var effectiveRoot = root;
    var effectiveBody = body;

    var highContrastActive =
      (effectiveRoot && effectiveRoot.classList.contains('high-contrast')) ||
      (effectiveBody && effectiveBody.classList.contains('high-contrast'));

    var accentValue = highContrastActive ? HIGH_CONTRAST_ACCENT : color;

    effectiveRoot.style.setProperty('--accent-color', accentValue);
    if (highContrastActive) {
      effectiveRoot.style.removeProperty('--link-color');
    } else {
      effectiveRoot.style.setProperty('--link-color', color);
    }
    effectiveRoot.style.setProperty('--logo-background-color', accentValue);
    effectiveRoot.style.setProperty('--logo-accent-color', accentValue);

    if (effectiveBody) {
      effectiveBody.style.setProperty('--accent-color', accentValue);
      if (highContrastActive) {
        effectiveBody.style.removeProperty('--link-color');
      } else {
        effectiveBody.style.setProperty('--link-color', color);
      }
      effectiveBody.style.setProperty('--logo-background-color', accentValue);
      effectiveBody.style.setProperty('--logo-accent-color', accentValue);
    }
  }

  function refreshAccent(root, body) {
    if (!root) return;
    var pinkModeActive = root.classList.contains('pink-mode') || (body && body.classList.contains('pink-mode'));
    if (pinkModeActive) {
      clearAccentStyles(root, body);
      return;
    }
    var storedAccent = safeGet('accentColor');
    var accent = storedAccent || DEFAULT_ACCENT;
    applyAccentStyles(accent, root, body);
  }

  function setAriaPressed(control, isPressed) {
    if (control) {
      control.setAttribute('aria-pressed', isPressed ? 'true' : 'false');
    }
  }

  function resolveSafeDestination(rawValue) {
    if (!rawValue || typeof rawValue !== 'string') {
      return null;
    }

    var trimmed = rawValue.trim();
    if (!trimmed) {
      return null;
    }

    // Disallow dangerous protocols before attempting to resolve the URL.
    var lowerTrimmed = trimmed.toLowerCase();
    if (
      lowerTrimmed.startsWith('javascript:') ||
      lowerTrimmed.startsWith('data:') ||
      lowerTrimmed.startsWith('vbscript:') ||
      lowerTrimmed.startsWith('file:') ||
      lowerTrimmed.startsWith('blob:') ||
      lowerTrimmed.startsWith('filesystem:') ||
      lowerTrimmed.startsWith('//')
    ) {
      return null;
    }

    // Prevent newline or carriage return injection that could smuggle a protocol.
    if (/[\r\n\f\u0000]/.test(trimmed)) {
      return null;
    }

    var currentLocation = typeof window !== 'undefined' && window.location ? window.location : null;

    // If we cannot rely on window.location, allow only absolute paths within the site or hash anchors.
    if (!currentLocation || typeof currentLocation.href !== 'string') {
      if (trimmed.charAt(0) === '/' || trimmed.charAt(0) === '#') {
        return trimmed;
      }
      return null;
    }

    var resolvedUrl;
    try {
      resolvedUrl = new URL(trimmed, currentLocation.href);
    } catch (error) {
      void error;
      return null;
    }

    var allowedProtocols = { 'http:': true, 'https:': true };
    if (!allowedProtocols[resolvedUrl.protocol]) {
      return null;
    }

    if (resolvedUrl.origin !== currentLocation.origin) {
      return null;
    }

    // Only allow navigation within the same origin. Return a normalized path.
    return resolvedUrl.pathname + resolvedUrl.search + resolvedUrl.hash;
  }

  function initTopBarControls() {
    var root = getRoot();
    var body = getBody();
    if (!root) {
      return;
    }

    var darkModeToggle = document.getElementById('darkModeToggle');
    var pinkModeToggle = document.getElementById('pinkModeToggle');
    var languageSelect = document.getElementById('languageSelect');

    if (darkModeToggle && root && body) {
      var darkModeActive = root.classList.contains('dark-mode') || body.classList.contains('dark-mode');
      setAriaPressed(darkModeToggle, darkModeActive);
      darkModeToggle.addEventListener('click', function (event) {
        event.preventDefault();
        var currentlyDark = root.classList.contains('dark-mode') || body.classList.contains('dark-mode');
        var nextDark = !currentlyDark;
        root.classList.toggle('dark-mode', nextDark);
        body.classList.toggle('dark-mode', nextDark);
        root.classList.toggle('light-mode', !nextDark);
        body.classList.toggle('light-mode', !nextDark);
        safeSet('darkMode', nextDark ? 'true' : 'false');
        setAriaPressed(darkModeToggle, nextDark);
        updateThemeColor(nextDark);
      });
    }

    if (pinkModeToggle && root && body) {
      var pinkModeActive = root.classList.contains('pink-mode') || body.classList.contains('pink-mode');
      setAriaPressed(pinkModeToggle, pinkModeActive);
      pinkModeToggle.addEventListener('click', function (event) {
        event.preventDefault();
        var currentlyPink = root.classList.contains('pink-mode') || body.classList.contains('pink-mode');
        var nextPink = !currentlyPink;
        root.classList.toggle('pink-mode', nextPink);
        body.classList.toggle('pink-mode', nextPink);
        safeSet('pinkMode', nextPink ? 'true' : 'false');
        setAriaPressed(pinkModeToggle, nextPink);
        if (nextPink) {
          clearAccentStyles(root, body);
        } else {
          refreshAccent(root, body);
        }
      });
    }

    if (languageSelect) {
      var currentValue = languageSelect.getAttribute('data-current-value');
      if (currentValue) {
        languageSelect.value = currentValue;
      }
      languageSelect.addEventListener('change', function (event) {
        var target = event.target;
        if (!target) return;
        var selectedOption = target.selectedOptions && target.selectedOptions[0];
        var destination = selectedOption ? selectedOption.value : target.value;
        if (destination) {
          var safeDestination = resolveSafeDestination(destination);
          if (safeDestination) {
            window.location.assign(safeDestination);
          }
        }
      });
    }

    refreshAccent(root, body);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTopBarControls);
  } else {
    initTopBarControls();
  }
})();
