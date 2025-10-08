function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  function detectGlobalScope() {
    if (typeof globalThis !== 'undefined') {
      return globalThis;
    }
    if (typeof window !== 'undefined') {
      return window;
    }
    if (typeof self !== 'undefined') {
      return self;
    }
    if (typeof global !== 'undefined') {
      return global;
    }
    return {};
  }
  var GLOBAL_SCOPE = detectGlobalScope();
  function resolveModuleBase(scope) {
    if ((typeof cineModuleBase === "undefined" ? "undefined" : _typeof(cineModuleBase)) === 'object' && cineModuleBase) {
      return cineModuleBase;
    }
    if (typeof require === 'function') {
      try {
        var required = require('./base.js');
        if (required && _typeof(required) === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }
    if (scope && _typeof(scope.cineModuleBase) === 'object') {
      return scope.cineModuleBase;
    }
    return null;
  }
  var MODULE_BASE = resolveModuleBase(GLOBAL_SCOPE);
  if (!MODULE_BASE) {
    return;
  }
  var freezeDeep = typeof MODULE_BASE.freezeDeep === 'function' ? function freezeWithBase(value) {
    try {
      return MODULE_BASE.freezeDeep(value);
    } catch (error) {
      void error;
    }
    return value;
  } : function identity(value) {
    return value;
  };
  var safeWarn = typeof MODULE_BASE.safeWarn === 'function' ? function warnWithBase(message, detail) {
    try {
      MODULE_BASE.safeWarn(message, detail);
    } catch (error) {
      void error;
    }
  } : function fallbackSafeWarn(message, detail) {
    if (typeof console === 'undefined' || !console || typeof console.warn !== 'function') {
      return;
    }
    try {
      if (typeof detail === 'undefined') {
        console.warn(message);
      } else {
        console.warn(message, detail);
      }
    } catch (error) {
      void error;
    }
  };
  var informModuleGlobals = typeof MODULE_BASE.informModuleGlobals === 'function' ? function informWithBase(name, api) {
    try {
      MODULE_BASE.informModuleGlobals(name, api);
    } catch (error) {
      void error;
    }
  } : function noopInform() {};
  var registerOrQueueModule = typeof MODULE_BASE.registerOrQueueModule === 'function' ? function registerWithBase(name, api, metadata, onError) {
    try {
      MODULE_BASE.registerOrQueueModule(name, api, metadata, onError);
    } catch (error) {
      if (typeof onError === 'function') {
        try {
          onError(error);
        } catch (handlerError) {
          void handlerError;
        }
      } else {
        safeWarn('cineSettingsAppearance: Unable to register module.', error);
      }
    }
  } : function fallbackRegister() {};
  var exposeGlobal = typeof MODULE_BASE.exposeGlobal === 'function' ? function exposeWithBase(name, value, options) {
    try {
      return MODULE_BASE.exposeGlobal(name, value, GLOBAL_SCOPE, options);
    } catch (error) {
      void error;
      return false;
    }
  } : function fallbackExpose(name, value) {
    if (!GLOBAL_SCOPE || _typeof(GLOBAL_SCOPE) !== 'object') {
      return false;
    }
    try {
      GLOBAL_SCOPE[name] = value;
      return true;
    } catch (error) {
      void error;
    }
    return false;
  };
  function cloneContext(context) {
    if (!context || _typeof(context) !== 'object') {
      return {};
    }
    var copy = {};
    var keys = Object.keys(context);
    for (var index = 0; index < keys.length; index += 1) {
      var key = keys[index];
      copy[key] = context[key];
    }
    return copy;
  }
  function createFallbackContext() {
    var getDocument = function getDocument() {
      if (typeof document !== 'undefined') {
        return document;
      }
      return null;
    };
    var getWindow = function getWindow() {
      if (typeof window !== 'undefined') {
        return window;
      }
      return null;
    };
    return {
      getDocument: getDocument,
      getWindow: getWindow,
      settings: {},
      elements: {},
      accent: {},
      icons: {},
      storage: {},
      preferences: {},
      autoBackups: {},
      mountVoltages: {},
      helpers: {}
    };
  }
  function resolveDocument(context) {
    if (!context) {
      return null;
    }
    if (typeof context.getDocument === 'function') {
      try {
        var doc = context.getDocument();
        if (doc && _typeof(doc) === 'object') {
          return doc;
        }
      } catch (error) {
        void error;
      }
    }
    if (context.document && _typeof(context.document) === 'object') {
      return context.document;
    }
    if (typeof document !== 'undefined' && document) {
      return document;
    }
    return null;
  }
  function resolveWindow(context) {
    if (!context) {
      return null;
    }
    if (typeof context.getWindow === 'function') {
      try {
        var win = context.getWindow();
        if (win && _typeof(win) === 'object') {
          return win;
        }
      } catch (error) {
        void error;
      }
    }
    if (context.window && _typeof(context.window) === 'object') {
      return context.window;
    }
    if (typeof window !== 'undefined' && window) {
      return window;
    }
    return null;
  }
  function getLocalStorage(context) {
    var storage = context.storage || {};
    if (storage && typeof storage.getLocalStorage === 'function') {
      try {
        var resolved = storage.getLocalStorage();
        if (resolved) {
          return resolved;
        }
      } catch (error) {
        void error;
      }
    }
    if (storage && storage.localStorage) {
      return storage.localStorage;
    }
    if (typeof localStorage !== 'undefined') {
      return localStorage;
    }
    return null;
  }
  function callOptional(fn, args, defaultValue) {
    if (typeof fn !== 'function') {
      return defaultValue;
    }
    try {
      return fn.apply(null, Array.isArray(args) ? args : []);
    } catch (error) {
      safeWarn('cineSettingsAppearance: helper invocation failed.', error);
      return defaultValue;
    }
  }
  function createAppearanceManager(rawContext) {
    var context = cloneContext(createFallbackContext());
    var provided = cloneContext(rawContext);
    var providedKeys = Object.keys(provided);
    for (var index = 0; index < providedKeys.length; index += 1) {
      var key = providedKeys[index];
      var value = provided[key];
      if (value && _typeof(value) === 'object' && !Array.isArray(value)) {
        context[key] = cloneContext(value);
      } else {
        context[key] = value;
      }
    }
    var doc = resolveDocument(context);
    var win = resolveWindow(context);
    var elements = context.elements || {};
    var settings = context.settings || {};
    var accent = context.accent || {};
    var icons = context.icons || {};
    var preferences = context.preferences || {};
    var autoBackups = context.autoBackups || {};
    var mountVoltages = context.mountVoltages || {};
    var helpers = context.helpers || {};
    void win;
    void helpers;
    var pinkModeIconRotationTimer = null;
    var pinkModeIconIndex = 0;
    var PINK_MODE_ICON_RAIN_PRESS_TRIGGER_COUNT = 5;
    var PINK_MODE_ICON_RAIN_PRESS_WINDOW_MS = 6000;
    var PINK_MODE_ICON_ANIMATION_RESET_DELAY = context.pinkModeIconAnimationResetDelay || 400;
    var PINK_MODE_ICON_ANIMATION_CLASS = context.pinkModeIconAnimationClass || 'pink-mode-icon-animate';
    var PINK_MODE_ICON_INTERVAL_MS = context.pinkModeIconIntervalMs || 1500;
    var pinkModeIconPressTimestamps = [];
    var pinkModeEnabled = false;
    var settingsInitialPinkMode = false;
    var settingsInitialTemperatureUnit = 'celsius';
    var settingsInitialShowAutoBackups = false;
    function getRoot() {
      return doc && doc.documentElement ? doc.documentElement : null;
    }
    function getBody() {
      return doc && doc.body ? doc.body : null;
    }
    function getAccentColor() {
      if (typeof accent.getAccentColor === 'function') {
        return accent.getAccentColor();
      }
      return accent.accentColor || '#001589';
    }
    function setAccentColor(value) {
      if (typeof accent.setAccentColor === 'function') {
        accent.setAccentColor(value);
      } else {
        accent.accentColor = value;
      }
    }
    function getPrevAccentColor() {
      if (typeof accent.getPrevAccentColor === 'function') {
        return accent.getPrevAccentColor();
      }
      return accent.prevAccentColor || getAccentColor();
    }
    function setPrevAccentColor(value) {
      if (typeof accent.setPrevAccentColor === 'function') {
        accent.setPrevAccentColor(value);
      } else {
        accent.prevAccentColor = value;
      }
    }
    function getHighContrastAccentColor() {
      if (typeof accent.getHighContrastAccentColor === 'function') {
        return accent.getHighContrastAccentColor();
      }
      return accent.highContrastAccentColor || '#ffffff';
    }
    function isHighContrastActive() {
      if (typeof accent.isHighContrastActive === 'function') {
        try {
          return !!accent.isHighContrastActive();
        } catch (error) {
          safeWarn('cineSettingsAppearance: isHighContrastActive failed.', error);
        }
      }
      var body = getBody();
      return !!(body && body.classList && body.classList.contains('high-contrast'));
    }
    function updateAccentColorResetButtonState() {
      if (typeof accent.updateAccentColorResetButtonState === 'function') {
        try {
          accent.updateAccentColorResetButtonState();
        } catch (error) {
          safeWarn('cineSettingsAppearance: updateAccentColorResetButtonState failed.', error);
        }
      }
    }
    function clearAccentColorOverrides() {
      if (typeof accent.clearAccentColorOverrides === 'function') {
        try {
          accent.clearAccentColorOverrides();
        } catch (error) {
          safeWarn('cineSettingsAppearance: clearAccentColorOverrides failed.', error);
        }
      }
    }
    function applyAccentColor(value) {
      if (typeof accent.applyAccentColor === 'function') {
        try {
          accent.applyAccentColor(value);
        } catch (error) {
          safeWarn('cineSettingsAppearance: applyAccentColor failed.', error);
        }
      }
    }
    function refreshDarkModeAccentBoost(payload) {
      if (typeof accent.refreshDarkModeAccentBoost === 'function') {
        try {
          accent.refreshDarkModeAccentBoost(payload);
        } catch (error) {
          safeWarn('cineSettingsAppearance: refreshDarkModeAccentBoost failed.', error);
        }
      }
    }
    function ensureSvgHasAriaHidden(markup) {
      if (typeof icons.ensureSvgHasAriaHidden === 'function') {
        return icons.ensureSvgHasAriaHidden(markup);
      }
      return markup;
    }
    function applyIconGlyph(target, glyph) {
      if (typeof icons.applyIconGlyph === 'function') {
        try {
          icons.applyIconGlyph(target, glyph);
        } catch (error) {
          safeWarn('cineSettingsAppearance: applyIconGlyph failed.', error);
        }
      }
    }
    function getIconGlyph(name) {
      if (!name) {
        return null;
      }
      if (typeof icons.getIconGlyph === 'function') {
        try {
          return icons.getIconGlyph(name);
        } catch (error) {
          safeWarn('cineSettingsAppearance: getIconGlyph failed.', error);
          return null;
        }
      }
      var registry = icons.registry && _typeof(icons.registry) === 'object' ? icons.registry : null;
      if (registry && registry[name]) {
        return registry[name];
      }
      if (_typeof(GLOBAL_SCOPE.ICON_GLYPHS) === 'object' && GLOBAL_SCOPE.ICON_GLYPHS) {
        return GLOBAL_SCOPE.ICON_GLYPHS[name] || null;
      }
      return null;
    }
    function updateThemeColor(isDark) {
      var documentRef = doc;
      if (!documentRef || typeof documentRef.querySelector !== 'function') {
        return;
      }
      var meta = documentRef.querySelector('meta[name="theme-color"]');
      if (!meta) {
        return;
      }
      try {
        meta.setAttribute('content', isDark ? '#1c1c1e' : '#ffffff');
      } catch (error) {
        safeWarn('cineSettingsAppearance: unable to update theme-color meta tag.', error);
      }
    }
    function setToggleIcon(button, glyph) {
      if (!button) {
        return;
      }
      var iconSpan = button.querySelector && button.querySelector('.icon-glyph');
      if (!iconSpan && doc && typeof doc.createElement === 'function') {
        iconSpan = doc.createElement('span');
        iconSpan.className = 'icon-glyph';
        iconSpan.setAttribute('aria-hidden', 'true');
        try {
          button.textContent = '';
          button.appendChild(iconSpan);
        } catch (error) {
          safeWarn('cineSettingsAppearance: unable to attach toggle icon.', error);
          return;
        }
      }
      if (!iconSpan) {
        return;
      }
      var glyphConfig = glyph && _typeof(glyph) === 'object' && (glyph.markup || glyph.className) ? glyph : {
        value: glyph
      };
      var classNames = ['icon-glyph'];
      if (glyphConfig.className) {
        classNames.push(glyphConfig.className);
      }
      iconSpan.className = classNames.join(' ');
      if (glyphConfig.markup) {
        iconSpan.innerHTML = ensureSvgHasAriaHidden(glyphConfig.markup);
        iconSpan.removeAttribute('data-icon-font');
      } else {
        applyIconGlyph(iconSpan, glyphConfig.value);
      }
    }
    function applyDarkMode(enabled) {
      var root = getRoot();
      var body = getBody();
      if (!root || !body) {
        return;
      }
      if (enabled) {
        body.classList.add('dark-mode');
        root.classList.add('dark-mode');
        body.classList.remove('light-mode');
        root.classList.remove('light-mode');
        if (elements.darkModeToggle) {
          var sunGlyph = getIconGlyph('sun');
          if (sunGlyph) {
            setToggleIcon(elements.darkModeToggle, sunGlyph);
          }
          elements.darkModeToggle.setAttribute('aria-pressed', 'true');
        }
      } else {
        body.classList.remove('dark-mode');
        root.classList.remove('dark-mode');
        body.classList.add('light-mode');
        root.classList.add('light-mode');
        if (elements.darkModeToggle) {
          var moonGlyph = getIconGlyph('moon');
          if (moonGlyph) {
            setToggleIcon(elements.darkModeToggle, moonGlyph);
          }
          elements.darkModeToggle.setAttribute('aria-pressed', 'false');
        }
      }
      var highContrast = isHighContrastActive();
      var accentSource = highContrast ? getHighContrastAccentColor() : getAccentColor();
      refreshDarkModeAccentBoost({
        color: accentSource,
        highContrast: highContrast
      });
      updateThemeColor(enabled);
      if (settings.darkMode) {
        settings.darkMode.checked = !!enabled;
      }
    }
    function applyHighContrast(enabled) {
      var root = getRoot();
      var body = getBody();
      if (!root) {
        return;
      }
      if (enabled) {
        if (body) {
          body.classList.add('high-contrast');
        }
        root.classList.add('high-contrast');
        applyAccentColor(getAccentColor());
        if (body && body.classList.contains('pink-mode')) {
          clearAccentColorOverrides();
        }
      } else {
        if (body) {
          body.classList.remove('high-contrast');
        }
        root.classList.remove('high-contrast');
        if (body && body.classList.contains('pink-mode')) {
          clearAccentColorOverrides();
        } else {
          applyAccentColor(getAccentColor());
        }
      }
      if (settings.highContrast) {
        settings.highContrast.checked = !!enabled;
      }
    }
    function applyReduceMotion(enabled) {
      var root = getRoot();
      var body = getBody();
      if (root) {
        root.classList.toggle('reduce-motion', Boolean(enabled));
      }
      if (body) {
        body.classList.toggle('reduce-motion', Boolean(enabled));
      }
      if (settings.reduceMotion) {
        settings.reduceMotion.checked = Boolean(enabled);
      }
    }
    function applyRelaxedSpacing(enabled) {
      var root = getRoot();
      var body = getBody();
      if (root) {
        root.classList.toggle('relaxed-spacing', Boolean(enabled));
      }
      if (body) {
        body.classList.toggle('relaxed-spacing', Boolean(enabled));
      }
      if (settings.relaxedSpacing) {
        settings.relaxedSpacing.checked = Boolean(enabled);
      }
    }
    function stopPinkModeIconRotation() {
      if (pinkModeIconRotationTimer) {
        try {
          clearInterval(pinkModeIconRotationTimer);
        } catch (error) {
          safeWarn('cineSettingsAppearance: unable to stop pink mode rotation.', error);
        }
        pinkModeIconRotationTimer = null;
      }
    }
    function startPinkModeAnimatedIcons() {
      if (typeof icons.startPinkModeAnimatedIcons === 'function') {
        try {
          icons.startPinkModeAnimatedIcons();
        } catch (error) {
          safeWarn('cineSettingsAppearance: startPinkModeAnimatedIcons failed.', error);
        }
      }
    }
    function stopPinkModeAnimatedIcons() {
      if (typeof icons.stopPinkModeAnimatedIcons === 'function') {
        try {
          icons.stopPinkModeAnimatedIcons();
        } catch (error) {
          safeWarn('cineSettingsAppearance: stopPinkModeAnimatedIcons failed.', error);
        }
      }
    }
    function applyPinkModeIcon(iconConfig, options) {
      if (!iconConfig) {
        return;
      }
      var shouldAnimate = options && options.animate === true;
      var toggle = elements.pinkModeToggle || null;
      var helpIcon = elements.pinkModeHelpIcon || null;
      if (toggle) {
        setToggleIcon(toggle, iconConfig);
      }
      if (helpIcon) {
        helpIcon.className = 'help-icon icon-glyph icon-svg pink-mode-icon';
        helpIcon.innerHTML = iconConfig.markup || '';
      }
      if (shouldAnimate) {
        triggerPinkModeIconAnimation();
      }
    }
    function triggerPinkModeIconAnimation() {
      var targets = [];
      var toggle = elements.pinkModeToggle || null;
      if (toggle) {
        var toggleIcon = toggle.querySelector && toggle.querySelector('.pink-mode-icon');
        if (toggleIcon) {
          targets.push(toggleIcon);
        }
      }
      if (elements.pinkModeHelpIcon) {
        targets.push(elements.pinkModeHelpIcon);
      }
      if (!targets.length) {
        return;
      }
      var _loop = function _loop() {
        var target = targets[_index];
        try {
          target.classList.remove(PINK_MODE_ICON_ANIMATION_CLASS);
          if (typeof target.getBoundingClientRect === 'function') {
            target.getBoundingClientRect();
          }
          target.classList.add(PINK_MODE_ICON_ANIMATION_CLASS);
        } catch (error) {
          safeWarn('cineSettingsAppearance: unable to animate pink mode icon.', error);
        }
        if (PINK_MODE_ICON_ANIMATION_RESET_DELAY > 0) {
          setTimeout(function () {
            try {
              target.classList.remove(PINK_MODE_ICON_ANIMATION_CLASS);
            } catch (resetError) {
              safeWarn('cineSettingsAppearance: failed to reset pink mode animation.', resetError);
            }
          }, PINK_MODE_ICON_ANIMATION_RESET_DELAY);
        }
      };
      for (var _index = 0; _index < targets.length; _index += 1) {
        _loop();
      }
    }
    function startPinkModeIconRotation() {
      var sequence = Array.isArray(icons.pinkModeIcons && icons.pinkModeIcons.onSequence) ? icons.pinkModeIcons.onSequence : [];
      if (!sequence.length) {
        applyPinkModeIcon(icons.pinkModeIcons ? icons.pinkModeIcons.off : null, {
          animate: false
        });
        return;
      }
      stopPinkModeIconRotation();
      var toggle = elements.pinkModeToggle || null;
      var helpIcon = elements.pinkModeHelpIcon || null;
      if (!toggle && !helpIcon) {
        return;
      }
      pinkModeIconIndex = 0;
      applyPinkModeIcon(sequence[pinkModeIconIndex], {
        animate: true
      });
      try {
        pinkModeIconRotationTimer = setInterval(function () {
          pinkModeIconIndex = (pinkModeIconIndex + 1) % sequence.length;
          applyPinkModeIcon(sequence[pinkModeIconIndex], {
            animate: true
          });
        }, PINK_MODE_ICON_INTERVAL_MS);
        if (pinkModeIconRotationTimer && typeof pinkModeIconRotationTimer.unref === 'function') {
          pinkModeIconRotationTimer.unref();
        }
      } catch (error) {
        pinkModeIconRotationTimer = null;
        safeWarn('cineSettingsAppearance: unable to schedule pink mode rotation.', error);
      }
    }
    function triggerPinkModeIconRain() {
      if (typeof icons.triggerPinkModeIconRain === 'function') {
        try {
          icons.triggerPinkModeIconRain();
        } catch (error) {
          safeWarn('cineSettingsAppearance: triggerPinkModeIconRain failed.', error);
        }
      }
    }
    function prunePinkModeIconPressHistory(now) {
      var cutoff = now - PINK_MODE_ICON_RAIN_PRESS_WINDOW_MS;
      if (cutoff <= 0 || !pinkModeIconPressTimestamps.length) {
        return;
      }
      pinkModeIconPressTimestamps = pinkModeIconPressTimestamps.filter(function (timestamp) {
        return timestamp >= cutoff;
      });
    }
    function handlePinkModeIconPress() {
      var now = Date.now();
      prunePinkModeIconPressHistory(now);
      pinkModeIconPressTimestamps.push(now);
      if (pinkModeIconPressTimestamps.length >= PINK_MODE_ICON_RAIN_PRESS_TRIGGER_COUNT && typeof icons.triggerPinkModeIconRain === 'function') {
        pinkModeIconPressTimestamps = [];
        triggerPinkModeIconRain();
      }
    }
    function startPinkModeAnimatedIconRotation() {
      startPinkModeIconRotation();
      startPinkModeAnimatedIcons();
    }
    function stopPinkModeAnimatedIconRotation() {
      stopPinkModeAnimatedIcons();
      stopPinkModeIconRotation();
    }
    function applyPinkMode(enabled) {
      var root = getRoot();
      var body = getBody();
      if (!root || !body) {
        return;
      }
      if (enabled) {
        body.classList.add('pink-mode');
        root.classList.add('pink-mode');
        if (accent.accentColorInput) {
          accent.accentColorInput.disabled = true;
        }
        clearAccentColorOverrides();
        if (elements.pinkModeToggle) {
          elements.pinkModeToggle.setAttribute('aria-pressed', 'true');
        }
        startPinkModeAnimatedIconRotation();
      } else {
        stopPinkModeAnimatedIconRotation();
        body.classList.remove('pink-mode');
        root.classList.remove('pink-mode');
        if (accent.accentColorInput) {
          accent.accentColorInput.disabled = false;
        }
        applyAccentColor(getAccentColor());
        if (icons.pinkModeIcons && icons.pinkModeIcons.off) {
          applyPinkModeIcon(icons.pinkModeIcons.off, {
            animate: false
          });
        }
        if (elements.pinkModeToggle) {
          elements.pinkModeToggle.setAttribute('aria-pressed', 'false');
        }
      }
      if (settings.pinkMode) {
        settings.pinkMode.checked = !!enabled;
      }
      updateAccentColorResetButtonState();
    }
    function isPinkModeActive() {
      var body = getBody();
      return !!(body && body.classList && body.classList.contains('pink-mode'));
    }
    function persistPinkModePreference(enabled) {
      pinkModeEnabled = !!enabled;
      applyPinkMode(pinkModeEnabled);
      var storage = getLocalStorage(context);
      if (!storage) {
        return;
      }
      try {
        storage.setItem('pinkMode', pinkModeEnabled);
      } catch (error) {
        safeWarn('cineSettingsAppearance: Could not save pink mode preference.', error);
      }
    }
    function rememberSettingsPinkModeBaseline() {
      settingsInitialPinkMode = isPinkModeActive();
    }
    function revertSettingsPinkModeIfNeeded() {
      if (isPinkModeActive() !== settingsInitialPinkMode) {
        persistPinkModePreference(settingsInitialPinkMode);
      }
    }
    function getTemperatureUnit() {
      if (typeof preferences.getTemperatureUnit === 'function') {
        return preferences.getTemperatureUnit();
      }
      return preferences.temperatureUnit || 'celsius';
    }
    function setTemperatureUnit(value) {
      if (typeof preferences.setTemperatureUnit === 'function') {
        preferences.setTemperatureUnit(value);
      } else {
        preferences.temperatureUnit = value;
      }
    }
    function rememberSettingsTemperatureUnitBaseline() {
      var current = getTemperatureUnit();
      settingsInitialTemperatureUnit = typeof current === 'string' ? current : 'celsius';
    }
    function revertSettingsTemperatureUnitIfNeeded() {
      var baseline = typeof settingsInitialTemperatureUnit === 'string' ? settingsInitialTemperatureUnit : 'celsius';
      var applyPreference = preferences.applyTemperatureUnitPreference;
      if (typeof applyPreference === 'function') {
        if (getTemperatureUnit() !== baseline) {
          try {
            applyPreference(baseline, {
              persist: false,
              forceUpdate: true
            });
            setTemperatureUnit(baseline);
          } catch (error) {
            safeWarn('cineSettingsAppearance: Failed to revert temperature unit preference.', error);
          }
        } else if (settings.temperatureUnit) {
          settings.temperatureUnit.value = baseline;
        }
      } else if (settings.temperatureUnit) {
        settings.temperatureUnit.value = baseline;
      }
    }
    function getShowAutoBackups() {
      if (typeof preferences.getShowAutoBackups === 'function') {
        return !!preferences.getShowAutoBackups();
      }
      if (typeof preferences.showAutoBackups === 'boolean') {
        return preferences.showAutoBackups;
      }
      return false;
    }
    function setShowAutoBackups(value) {
      if (typeof preferences.setShowAutoBackups === 'function') {
        preferences.setShowAutoBackups(value);
      } else {
        preferences.showAutoBackups = !!value;
      }
    }
    function applyShowAutoBackupsPreference(enabled, options) {
      var config = options && _typeof(options) === 'object' ? options : {};
      var persist = config.persist !== false;
      var forceRepopulate = Boolean(config.forceRepopulate);
      var normalized = Boolean(enabled);
      var previousValue = getShowAutoBackups();
      var changed = normalized !== previousValue;
      setShowAutoBackups(normalized);
      if (normalized && typeof preferences.ensureAutoBackupsFromProjects === 'function') {
        callOptional(preferences.ensureAutoBackupsFromProjects);
      }
      if (persist) {
        var storage = getLocalStorage(context);
        if (storage) {
          try {
            storage.setItem('showAutoBackups', normalized);
          } catch (error) {
            safeWarn('cineSettingsAppearance: Could not save auto backup visibility preference.', error);
          }
        }
      }
      if (!changed && !forceRepopulate) {
        if (settings.showAutoBackups) {
          settings.showAutoBackups.checked = normalized;
        }
        return;
      }
      var setupSelect = autoBackups.setupSelect || null;
      var setupNameInput = autoBackups.setupNameInput || null;
      var previousSelectValue = setupSelect ? setupSelect.value : '';
      var previousNameValue = setupNameInput ? setupNameInput.value : '';
      if (typeof autoBackups.populateSetupSelect === 'function') {
        try {
          autoBackups.populateSetupSelect();
        } catch (error) {
          safeWarn('cineSettingsAppearance: Failed to refresh setup selector.', error);
        }
      }
      if (setupSelect) {
        try {
          if (normalized || !previousSelectValue || !previousSelectValue.startsWith('auto-backup-')) {
            setupSelect.value = previousSelectValue;
          } else {
            setupSelect.value = '';
          }
        } catch (error) {
          safeWarn('cineSettingsAppearance: Failed to update setup select after auto backup change.', error);
        }
      }
      if (setupNameInput) {
        try {
          setupNameInput.value = previousNameValue;
        } catch (error) {
          safeWarn('cineSettingsAppearance: Unable to restore setup name after auto backup change.', error);
        }
      }
      if (settings.showAutoBackups) {
        settings.showAutoBackups.checked = normalized;
      }
    }
    function rememberSettingsShowAutoBackupsBaseline() {
      settingsInitialShowAutoBackups = Boolean(getShowAutoBackups());
    }
    function revertSettingsShowAutoBackupsIfNeeded() {
      var baseline = Boolean(settingsInitialShowAutoBackups);
      if (Boolean(getShowAutoBackups()) !== baseline) {
        applyShowAutoBackupsPreference(baseline, {
          forceRepopulate: true
        });
      } else if (settings.showAutoBackups) {
        settings.showAutoBackups.checked = baseline;
      }
    }
    function rememberSettingsMountVoltagesBaseline() {
      if (typeof mountVoltages.rememberBaseline === 'function') {
        try {
          mountVoltages.rememberBaseline();
        } catch (error) {
          safeWarn('cineSettingsAppearance: rememberBaseline for mount voltages failed.', error);
        }
        return;
      }
      if (typeof mountVoltages.getPreferencesClone === 'function') {
        try {
          mountVoltages.settingsInitial = mountVoltages.getPreferencesClone();
        } catch (error) {
          safeWarn('cineSettingsAppearance: Failed to clone mount voltage preferences.', error);
        }
      }
    }
    function revertSettingsMountVoltagesIfNeeded() {
      if (typeof mountVoltages.revertBaseline === 'function') {
        try {
          mountVoltages.revertBaseline();
        } catch (error) {
          safeWarn('cineSettingsAppearance: revertBaseline for mount voltages failed.', error);
        }
        return;
      }
      var cloneFn = mountVoltages.getPreferencesClone;
      var applyFn = mountVoltages.applyPreferences;
      var updateInputsFn = mountVoltages.updateInputsFromState;
      var warnHelper = mountVoltages.warnMissingHelper || function () {};
      var supportedTypes = Array.isArray(mountVoltages.supportedTypes) ? mountVoltages.supportedTypes : [];
      var defaults = mountVoltages.defaultVoltages && _typeof(mountVoltages.defaultVoltages) === 'object' ? mountVoltages.defaultVoltages : {};
      var baseline = mountVoltages.settingsInitial;
      if (!baseline && typeof cloneFn === 'function') {
        baseline = cloneFn();
      }
      var current = baseline;
      if (typeof cloneFn === 'function') {
        try {
          current = cloneFn();
        } catch (error) {
          warnHelper('getMountVoltagePreferencesClone', error);
        }
      }
      var changed = supportedTypes.some(function (type) {
        var baselineEntry = baseline && baseline[type] ? baseline[type] : defaults[type];
        var currentEntry = current && current[type] ? current[type] : defaults[type];
        if (!baselineEntry || !currentEntry) {
          return false;
        }
        return Number(baselineEntry.high) !== Number(currentEntry.high) || Number(baselineEntry.low) !== Number(currentEntry.low);
      });
      if (changed) {
        if (typeof applyFn === 'function') {
          try {
            applyFn(baseline, {
              persist: true,
              triggerUpdate: true
            });
          } catch (error) {
            warnHelper('applyMountVoltagePreferences', error);
          }
        }
      } else if (typeof updateInputsFn === 'function') {
        try {
          updateInputsFn();
        } catch (error) {
          warnHelper('updateMountVoltageInputsFromState', error);
        }
      }
    }
    return freezeDeep({
      updateThemeColor: updateThemeColor,
      setToggleIcon: setToggleIcon,
      applyDarkMode: applyDarkMode,
      applyHighContrast: applyHighContrast,
      applyReduceMotion: applyReduceMotion,
      applyRelaxedSpacing: applyRelaxedSpacing,
      applyPinkMode: applyPinkMode,
      persistPinkModePreference: persistPinkModePreference,
      rememberSettingsPinkModeBaseline: rememberSettingsPinkModeBaseline,
      revertSettingsPinkModeIfNeeded: revertSettingsPinkModeIfNeeded,
      rememberSettingsTemperatureUnitBaseline: rememberSettingsTemperatureUnitBaseline,
      revertSettingsTemperatureUnitIfNeeded: revertSettingsTemperatureUnitIfNeeded,
      applyShowAutoBackupsPreference: applyShowAutoBackupsPreference,
      rememberSettingsShowAutoBackupsBaseline: rememberSettingsShowAutoBackupsBaseline,
      revertSettingsShowAutoBackupsIfNeeded: revertSettingsShowAutoBackupsIfNeeded,
      rememberSettingsMountVoltagesBaseline: rememberSettingsMountVoltagesBaseline,
      revertSettingsMountVoltagesIfNeeded: revertSettingsMountVoltagesIfNeeded,
      handlePinkModeIconPress: handlePinkModeIconPress,
      triggerPinkModeIconAnimation: triggerPinkModeIconAnimation,
      startPinkModeIconRotation: startPinkModeIconRotation,
      stopPinkModeIconRotation: stopPinkModeIconRotation,
      applyPinkModeIcon: applyPinkModeIcon,
      startPinkModeAnimatedIconRotation: startPinkModeAnimatedIconRotation,
      stopPinkModeAnimatedIconRotation: stopPinkModeAnimatedIconRotation,
      isPinkModeActive: isPinkModeActive,
      setAccentColor: setAccentColor,
      setPrevAccentColor: setPrevAccentColor,
      getAccentColor: getAccentColor,
      getPrevAccentColor: getPrevAccentColor,
      setShowAutoBackups: setShowAutoBackups,
      getShowAutoBackups: getShowAutoBackups
    });
  }
  function initialize(context) {
    return createAppearanceManager(context || {});
  }
  var api = freezeDeep({
    initialize: initialize
  });
  informModuleGlobals('cineSettingsAppearance', api);
  registerOrQueueModule('cineSettingsAppearance', api, {
    category: 'ui',
    description: 'Appearance and settings helpers for the application UI.',
    replace: true,
    connections: ['cineModuleGlobals', 'cineModuleEnvironment', 'cineUi']
  }, function (error) {
    safeWarn('cineSettingsAppearance: Unable to register module.', error);
  });
  exposeGlobal('cineSettingsAppearance', api, {
    configurable: true,
    enumerable: false,
    writable: false
  });
  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = api;
  }
})();