/* global cineModuleBase */

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

  const GLOBAL_SCOPE = detectGlobalScope();

  function createModuleBaseFallback(scope) {
    const targetScope =
      scope && (typeof scope === 'object' || typeof scope === 'function') ? scope : detectGlobalScope();

    const resolvedScope =
      targetScope && (typeof targetScope === 'object' || typeof targetScope === 'function')
        ? targetScope
        : null;

    if (!resolvedScope) {
      return null;
    }

    let existingBase = null;
    try {
      if (resolvedScope && typeof resolvedScope.cineModuleBase === 'object') {
        existingBase = resolvedScope.cineModuleBase;
      }
    } catch (readBaseError) {
      void readBaseError;
      existingBase = null;
    }

    if (existingBase) {
      return existingBase;
    }

    const moduleStorage = Object.create(null);
    const listenerStorage = Object.create(null);

    const notifyListeners = (name, api) => {
      if (typeof name !== 'string' || !name) {
        return;
      }

      const queue = listenerStorage[name];
      if (!Array.isArray(queue) || queue.length === 0) {
        return;
      }

      listenerStorage[name] = [];

      for (let index = 0; index < queue.length; index += 1) {
        const listener = queue[index];
        if (typeof listener !== 'function') {
          continue;
        }

        try {
          listener(api);
        } catch (listenerError) {
          void listenerError;
        }
      }
    };

    const storeModule = (name, api) => {
      if (typeof name !== 'string' || !name) {
        return;
      }

      moduleStorage[name] = api;
      notifyListeners(name, api);
    };

    const getStoredModule = name => {
      if (typeof name !== 'string' || !name) {
        return null;
      }

      if (Object.prototype.hasOwnProperty.call(moduleStorage, name)) {
        return moduleStorage[name];
      }

      return null;
    };

    const whenModuleAvailable = (name, handler) => {
      if (typeof handler !== 'function' || typeof name !== 'string' || !name) {
        return false;
      }

      const existing = getStoredModule(name);
      if (existing) {
        try {
          handler(existing);
        } catch (listenerError) {
          void listenerError;
        }
        return true;
      }

      if (!Array.isArray(listenerStorage[name])) {
        listenerStorage[name] = [];
      }

      listenerStorage[name].push(handler);
      return true;
    };

    const ensureModuleGlobals = () => {
      let globals = null;
      try {
        globals = resolvedScope.cineModuleGlobals;
      } catch (readError) {
        void readError;
        globals = null;
      }

      if (!globals || typeof globals !== 'object') {
        globals = {};
      }

      if (typeof globals.getModule !== 'function') {
        globals.getModule = name => getStoredModule(name);
      }

      if (typeof globals.whenModuleAvailable !== 'function') {
        globals.whenModuleAvailable = (name, handler) => whenModuleAvailable(name, handler);
      }

      if (typeof globals.register !== 'function') {
        globals.register = (name, api) => {
          storeModule(name, api);
          return true;
        };
      }

      try {
        Object.defineProperty(resolvedScope, 'cineModuleGlobals', {
          configurable: true,
          enumerable: false,
          writable: true,
          value: globals,
        });
      } catch (defineGlobalsError) {
        void defineGlobalsError;
        try {
          resolvedScope.cineModuleGlobals = globals;
        } catch (assignGlobalsError) {
          void assignGlobalsError;
        }
      }

      return globals;
    };

    const ensureModuleRegistry = () => {
      let registry = null;
      try {
        registry = resolvedScope.cineModules;
      } catch (readError) {
        void readError;
        registry = null;
      }

      if (!registry || typeof registry !== 'object') {
        registry = {};
      }

      if (typeof registry.get !== 'function') {
        registry.get = name => getStoredModule(name);
      }

      if (typeof registry.register !== 'function') {
        registry.register = (name, api) => {
          storeModule(name, api);
          return true;
        };
      }

      try {
        Object.defineProperty(resolvedScope, 'cineModules', {
          configurable: true,
          enumerable: false,
          writable: true,
          value: registry,
        });
      } catch (defineRegistryError) {
        void defineRegistryError;
        try {
          resolvedScope.cineModules = registry;
        } catch (assignRegistryError) {
          void assignRegistryError;
        }
      }

      return registry;
    };

    const fallbackBase = {
      freezeDeep(value) {
        return value;
      },
      safeWarn(message, detail) {
        if (typeof console === 'undefined' || !console || typeof console.warn !== 'function') {
          return;
        }

        try {
          if (typeof detail === 'undefined') {
            console.warn(message);
          } else {
            console.warn(message, detail);
          }
        } catch (warnError) {
          void warnError;
        }
      },
      informModuleGlobals(name, api) {
        const globals = ensureModuleGlobals();
        if (globals && typeof globals.register === 'function') {
          try {
            globals.register(name, api);
            return true;
          } catch (registerError) {
            void registerError;
          }
        }

        storeModule(name, api);
        return true;
      },
      registerOrQueueModule(name, api) {
        const registry = ensureModuleRegistry();
        if (registry && typeof registry.register === 'function') {
          try {
            registry.register(name, api);
          } catch (registerError) {
            void registerError;
            storeModule(name, api);
          }
        } else {
          storeModule(name, api);
        }

        ensureModuleGlobals();
        return true;
      },
      exposeGlobal(name, value, target, options = {}) {
        const scopeTarget =
          target && (typeof target === 'object' || typeof target === 'function') ? target : resolvedScope;

        if (!scopeTarget || (typeof scopeTarget !== 'object' && typeof scopeTarget !== 'function')) {
          return false;
        }

        const descriptor = {
          configurable: options.configurable !== false,
          enumerable: !!options.enumerable,
          writable: options.writable === true,
          value,
        };

        try {
          Object.defineProperty(scopeTarget, name, descriptor);
          return true;
        } catch (defineError) {
          void defineError;
          try {
            scopeTarget[name] = value;
            return true;
          } catch (assignError) {
            void assignError;
          }
        }

        return false;
      },
    };

    fallbackBase.registerOrQueueModule('cineModuleBase', fallbackBase);
    fallbackBase.exposeGlobal('cineModuleBase', fallbackBase, resolvedScope, {
      configurable: true,
      enumerable: false,
      writable: false,
    });

    ensureModuleGlobals();
    ensureModuleRegistry();

    return fallbackBase;
  }

  function resolveModuleBase(scope) {
    if (typeof cineModuleBase === 'object' && cineModuleBase) {
      return cineModuleBase;
    }

    if (typeof require === 'function') {
      try {
        const required = require('./base.js');
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }

    if (scope && typeof scope.cineModuleBase === 'object') {
      return scope.cineModuleBase;
    }

    return null;
  }

  const MODULE_BASE = resolveModuleBase(GLOBAL_SCOPE) || createModuleBaseFallback(GLOBAL_SCOPE);
  if (!MODULE_BASE) {
    return;
  }

  const freezeDeep = typeof MODULE_BASE.freezeDeep === 'function'
    ? function freezeWithBase(value) {
      try {
        return MODULE_BASE.freezeDeep(value);
      } catch (error) {
        void error;
      }
      return value;
    }
    : function identity(value) {
      return value;
    };

  const safeWarn = typeof MODULE_BASE.safeWarn === 'function'
    ? function warnWithBase(message, detail) {
      try {
        MODULE_BASE.safeWarn(message, detail);
      } catch (error) {
        void error;
      }
    }
    : function fallbackSafeWarn(message, detail) {
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

  const informModuleGlobals = typeof MODULE_BASE.informModuleGlobals === 'function'
    ? function informWithBase(name, api) {
      try {
        MODULE_BASE.informModuleGlobals(name, api);
      } catch (error) {
        void error;
      }
    }
    : function noopInform() { };

  const registerOrQueueModule = typeof MODULE_BASE.registerOrQueueModule === 'function'
    ? function registerWithBase(name, api, metadata, onError) {
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
    }
    : function fallbackRegister() { };

  const exposeGlobal = typeof MODULE_BASE.exposeGlobal === 'function'
    ? function exposeWithBase(name, value, options) {
      try {
        return MODULE_BASE.exposeGlobal(name, value, GLOBAL_SCOPE, options);
      } catch (error) {
        void error;
        return false;
      }
    }
    : function fallbackExpose(name, value) {
      if (!GLOBAL_SCOPE || typeof GLOBAL_SCOPE !== 'object') {
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
    if (!context || typeof context !== 'object') {
      return {};
    }

    const copy = {};
    const keys = Object.keys(context);
    for (let index = 0; index < keys.length; index += 1) {
      const key = keys[index];
      copy[key] = context[key];
    }
    return copy;
  }

  function createFallbackContext() {
    const getDocument = () => {
      if (typeof document !== 'undefined') {
        return document;
      }
      return null;
    };

    const getWindow = () => {
      if (typeof window !== 'undefined') {
        return window;
      }
      return null;
    };

    return {
      getDocument,
      getWindow,
      settings: {},
      elements: {},
      accent: {},
      icons: {},
      storage: {},
      preferences: {},
      autoBackups: {},
      mountVoltages: {},
      helpers: {},
    };
  }

  function resolveDocument(context) {
    if (!context) {
      return null;
    }
    if (typeof context.getDocument === 'function') {
      try {
        const doc = context.getDocument();
        if (doc && typeof doc === 'object') {
          return doc;
        }
      } catch (error) {
        void error;
      }
    }
    if (context.document && typeof context.document === 'object') {
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
        const win = context.getWindow();
        if (win && typeof win === 'object') {
          return win;
        }
      } catch (error) {
        void error;
      }
    }
    if (context.window && typeof context.window === 'object') {
      return context.window;
    }
    if (typeof window !== 'undefined' && window) {
      return window;
    }
    return null;
  }

  function getLocalStorage(context) {
    const storage = context.storage || {};
    if (storage && typeof storage.getLocalStorage === 'function') {
      try {
        const resolved = storage.getLocalStorage();
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
    const context = cloneContext(createFallbackContext());
    const provided = cloneContext(rawContext);
    const providedKeys = Object.keys(provided);
    for (let index = 0; index < providedKeys.length; index += 1) {
      const key = providedKeys[index];
      const value = provided[key];
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        context[key] = cloneContext(value);
      } else {
        context[key] = value;
      }
    }

    const doc = resolveDocument(context);
    const win = resolveWindow(context);

    const elements = context.elements || {};
    const settings = context.settings || {};
    const accent = context.accent || {};
    const icons = context.icons || {};
    const preferences = context.preferences || {};
    const autoBackups = context.autoBackups || {};
    const mountVoltages = context.mountVoltages || {};
    const helpers = context.helpers || {};
    const storage = context.storage || {};
    void win;
    void helpers;

    const themeMemoryStorage = (function createThemeMemoryStorage() {
      const memory = Object.create(null);
      return {
        getItem(key) {
          if (Object.prototype.hasOwnProperty.call(memory, key)) {
            return memory[key];
          }
          return null;
        },
        setItem(key, value) {
          memory[key] = String(value);
        },
        removeItem(key) {
          if (Object.prototype.hasOwnProperty.call(memory, key)) {
            delete memory[key];
          }
        },
      };
    }());

    function collectThemeStorageEntries() {
      const entries = [];

      function pushEntry(name, storageRef) {
        if (!storageRef || typeof storageRef.getItem !== 'function') {
          return;
        }
        for (let index = 0; index < entries.length; index += 1) {
          if (entries[index] && entries[index].storage === storageRef) {
            return;
          }
        }
        entries.push({ name, storage: storageRef });
      }

      if (storage && typeof storage.getSafeLocalStorage === 'function') {
        try {
          pushEntry('safeLocalStorage', storage.getSafeLocalStorage());
        } catch (error) {
          safeWarn('cineSettingsAppearance: getSafeLocalStorage failed for theme preference.', error);
        }
      }

      if (storage && typeof storage.resolveSafeLocalStorage === 'function') {
        try {
          pushEntry('resolvedSafeLocalStorage', storage.resolveSafeLocalStorage());
        } catch (error) {
          safeWarn('cineSettingsAppearance: resolveSafeLocalStorage failed for theme preference.', error);
        }
      }

      if (storage && typeof storage.getLocalStorage === 'function') {
        try {
          pushEntry('localStorage', storage.getLocalStorage());
        } catch (error) {
          safeWarn('cineSettingsAppearance: getLocalStorage failed for theme preference.', error);
        }
      }

      pushEntry('memoryStorage', themeMemoryStorage);

      return entries;
    }

    function persistThemePreference(value) {
      const entries = collectThemeStorageEntries();
      const serialized = value ? 'true' : 'false';
      for (let index = 0; index < entries.length; index += 1) {
        const entry = entries[index];
        if (!entry || !entry.storage || typeof entry.storage.setItem !== 'function') {
          continue;
        }
        try {
          entry.storage.setItem('darkMode', serialized);
        } catch (error) {
          safeWarn('cineSettingsAppearance: Unable to persist theme preference.', {
            name: entry.name,
            error,
          });
        }
      }
    }

    function readStoredThemePreference() {
      const entries = collectThemeStorageEntries();
      for (let index = 0; index < entries.length; index += 1) {
        const entry = entries[index];
        if (!entry || !entry.storage || typeof entry.storage.getItem !== 'function') {
          continue;
        }
        try {
          const stored = entry.storage.getItem('darkMode');
          if (stored === 'true' || stored === 'false') {
            return stored === 'true';
          }
        } catch (error) {
          safeWarn('cineSettingsAppearance: Unable to read theme preference.', {
            name: entry.name,
            error,
          });
        }
      }
      return null;
    }

    let pinkModeIconRotationTimer = null;
    let pinkModeIconIndex = 0;
    let pinkModeIconPressCount = 0;
    const pinkModeIconPressTimestamps = [];
    let pinkModeIconPressResetTimer = null;
    const PINK_MODE_ICON_ANIMATION_RESET_DELAY = context.pinkModeIconAnimationResetDelay || 400;
    const PINK_MODE_ICON_ANIMATION_CLASS = context.pinkModeIconAnimationClass || 'pink-mode-icon-animate';
    const PINK_MODE_ICON_INTERVAL_MS = context.pinkModeIconIntervalMs || 1500;
    const PINK_MODE_ICON_PRESS_RESET_MS =
      typeof context.pinkModeIconPressResetMs === 'number' && context.pinkModeIconPressResetMs >= 0
        ? context.pinkModeIconPressResetMs
        : 0;
    const PINK_MODE_ICON_PRESS_BURST_WINDOW_MS =
      typeof context.pinkModeIconPressBurstWindowMs === 'number' && context.pinkModeIconPressBurstWindowMs >= 0
        ? context.pinkModeIconPressBurstWindowMs
        : 1200;

    let pinkModeEnabled = false;
    let settingsInitialPinkMode = false;
    let settingsInitialTemperatureUnit = 'celsius';
    let settingsInitialFocusScale = 'metric';
    let settingsInitialShowAutoBackups = false;

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
      const body = getBody();
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
      const registry = icons.registry && typeof icons.registry === 'object' ? icons.registry : null;
      if (registry && registry[name]) {
        return registry[name];
      }
      if (typeof GLOBAL_SCOPE.ICON_GLYPHS === 'object' && GLOBAL_SCOPE.ICON_GLYPHS) {
        return GLOBAL_SCOPE.ICON_GLYPHS[name] || null;
      }
      return null;
    }

    function updateThemeColor(isDark) {
      const documentRef = doc;
      if (!documentRef || typeof documentRef.querySelector !== 'function') {
        return;
      }
      const meta = documentRef.querySelector('meta[name="theme-color"]');
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
      let iconSpan = button.querySelector && button.querySelector('.icon-glyph');
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

      // Cleanup previous Lottie if any
      if (iconSpan._lottieAnim) {
        try {
          iconSpan._lottieAnim.destroy();
        } catch (e) { /* ignore */ }
        iconSpan._lottieAnim = null;
      }

      const glyphConfig = glyph && typeof glyph === 'object' && (glyph.markup || glyph.className || glyph.lottiePath)
        ? glyph
        : { value: glyph };

      const classNames = ['icon-glyph'];
      if (glyphConfig.className) {
        classNames.push(glyphConfig.className);
      }
      iconSpan.className = classNames.join(' ');

      if ((glyphConfig.lottiePath || glyphConfig.lottieData) && typeof icons.ensurePinkModeLottieRuntime === 'function') {
        if (glyphConfig.markup) {
          const markup = ensureSvgHasAriaHidden(glyphConfig.markup);
          // Only replace if content is different to avoid flicker/reflow if unnecessary
          // We check the whole markup now because Horse and Unicorn share identical headers
          if (!iconSpan.innerHTML.includes(markup)) {
            iconSpan.innerHTML = markup;
          }
        }

        // Mark existing SVG as fallback for potential removal
        const fallbackSvg = iconSpan.querySelector('svg');
        if (fallbackSvg) {
          fallbackSvg.classList.add('icon-fallback');
        }

        icons.ensurePinkModeLottieRuntime()
          .then((lottie) => {
            if (!lottie) {
              // Runtime missing, ensure fallback is there (it should be)
              if (glyphConfig.markup && (!iconSpan.innerHTML || iconSpan.innerHTML === '')) {
                iconSpan.innerHTML = ensureSvgHasAriaHidden(glyphConfig.markup);
              }
              return;
            }

            if (!iconSpan || !document.body.contains(button)) return;

            try {
              // 2. Create a dedicated container for Lottie to coexist with fallback during load
              let lottieContainer = iconSpan.querySelector('.lottie-container');
              if (!lottieContainer) {
                lottieContainer = doc.createElement('div');
                lottieContainer.className = 'lottie-container';
                lottieContainer.style.width = '100%';
                lottieContainer.style.height = '100%';
                lottieContainer.style.display = 'flex';
                lottieContainer.style.justifyContent = 'center';
                lottieContainer.style.alignItems = 'center';
                // If fallback exists, we might want to overlay or append. 
                // Appending is safer for layout flow usually.
                iconSpan.appendChild(lottieContainer);
              } else {
                lottieContainer.innerHTML = ''; // Clear previous
              }

              const animConfig = {
                container: lottieContainer,
                renderer: 'svg',
                loop: true,
                autoplay: true
              };

              if (glyphConfig.lottieData) {
                animConfig.animationData = glyphConfig.lottieData;
              } else {
                animConfig.path = glyphConfig.lottiePath;
              }

              const anim = lottie.loadAnimation(animConfig);

              iconSpan._lottieAnim = anim;

              // 3. On success, hide fallback
              // For animationData (sync), we can hide immediately or wait for DOMLoaded
              // For path (async), we must wait
              const hideFallback = () => {
                const oldFallback = iconSpan.querySelector('.icon-fallback');
                if (oldFallback) {
                  oldFallback.style.display = 'none';
                }
              };

              anim.addEventListener('DOMLoaded', hideFallback);

              // 4. On failure, remove lottie container, show fallback
              const handleFailure = () => {
                if (lottieContainer && lottieContainer.parentNode) {
                  lottieContainer.parentNode.removeChild(lottieContainer);
                }
                const oldFallback = iconSpan.querySelector('.icon-fallback');
                if (oldFallback) {
                  oldFallback.style.display = ''; // Restore default
                }
              };

              anim.addEventListener('data_failed', handleFailure);
              anim.addEventListener('error', handleFailure);

            } catch (err) {
              // Synchronous error
            }
          })
          .catch(() => {
            // Runtime load error
          });
      } else if (glyphConfig.markup) {
        iconSpan.innerHTML = ensureSvgHasAriaHidden(glyphConfig.markup);
        iconSpan.removeAttribute('data-icon-font');
      } else {
        applyIconGlyph(iconSpan, glyphConfig.value);
      }
    }

    function applyDarkMode(enabled) {
      const root = getRoot();
      const body = getBody();
      if (!root || !body) {
        return;
      }

      if (enabled) {
        body.classList.add('dark-mode');
        root.classList.add('dark-mode');
        body.classList.remove('light-mode');
        root.classList.remove('light-mode');
        if (elements.darkModeToggle) {
          const sunGlyph = getIconGlyph('sun');
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
          const moonGlyph = getIconGlyph('moon');
          if (moonGlyph) {
            setToggleIcon(elements.darkModeToggle, moonGlyph);
          }
          elements.darkModeToggle.setAttribute('aria-pressed', 'false');
        }
      }

      const highContrast = isHighContrastActive();
      const accentSource = highContrast ? getHighContrastAccentColor() : getAccentColor();
      refreshDarkModeAccentBoost({ color: accentSource, highContrast });
      updateThemeColor(enabled);
      if (settings.darkMode) {
        settings.darkMode.checked = !!enabled;
      }
    }

    function detectSystemDarkPreference() {
      if (!win || typeof win.matchMedia !== 'function') {
        return null;
      }
      try {
        return !!win.matchMedia('(prefers-color-scheme: dark)').matches;
      } catch (error) {
        safeWarn('cineSettingsAppearance: matchMedia failed while detecting system theme preference.', error);
      }
      return null;
    }

    function detectThemeControlType(element, provided) {
      if (provided) {
        return provided;
      }
      if (!element || typeof element.tagName !== 'string') {
        return 'button';
      }
      const tagName = element.tagName.toLowerCase();
      if (tagName === 'select') {
        return 'select';
      }
      if (tagName === 'input') {
        const typeAttr = typeof element.getAttribute === 'function'
          ? (element.getAttribute('type') || '').toLowerCase()
          : '';
        if (typeAttr === 'checkbox') {
          return 'checkbox';
        }
      }
      return 'button';
    }

    function createThemeControlReader(element, type, provided, getCurrent) {
      if (typeof provided === 'function') {
        return provided;
      }
      if (type === 'select') {
        return () => !!(element && element.value === 'dark');
      }
      if (type === 'checkbox') {
        return () => !!(element && element.checked);
      }
      return () => !getCurrent();
    }

    function createThemeControlWriter(element, type, provided) {
      if (typeof provided === 'function') {
        return provided;
      }
      if (type === 'select') {
        return value => {
          if (!element) {
            return;
          }
          const expected = value ? 'dark' : 'light';
          if (element.value !== expected) {
            element.value = expected;
          }
        };
      }
      if (type === 'checkbox') {
        return value => {
          if (element) {
            element.checked = !!value;
          }
        };
      }
      return value => {
        if (!element || typeof element.setAttribute !== 'function') {
          return;
        }
        element.setAttribute('aria-pressed', value ? 'true' : 'false');
      };
    }

    function createThemePreferenceController(options) {
      const controllerOptions = options && typeof options === 'object' ? options : {};
      const controls = [];
      let applying = false;
      let currentPreference = false;

      const getCurrentPreference = () => currentPreference;

      function applyPreference(value, config) {
        const optionsConfig = config && typeof config === 'object' ? config : {};
        const normalized = !!value;
        const previous = currentPreference;
        currentPreference = normalized;

        applying = true;
        try {
          for (let index = 0; index < controls.length; index += 1) {
            const control = controls[index];
            if (!control || control === optionsConfig.source || typeof control.write !== 'function') {
              continue;
            }
            try {
              control.write(normalized, { previous });
            } catch (error) {
              safeWarn('cineSettingsAppearance: Unable to sync theme control.', error);
            }
          }

          try {
            applyDarkMode(normalized);
          } catch (error) {
            safeWarn('cineSettingsAppearance: applyDarkMode failed during theme update.', error);
          }
        } finally {
          applying = false;
        }

        if (optionsConfig.source && typeof optionsConfig.source.write === 'function') {
          try {
            optionsConfig.source.write(normalized, { previous });
          } catch (error) {
            safeWarn('cineSettingsAppearance: Unable to sync source theme control.', error);
          }
        }

        if (optionsConfig.persist !== false) {
          persistThemePreference(normalized);
        }

        return previous !== normalized;
      }

      function registerControl(element, controlOptions) {
        if (!element) {
          return () => { };
        }

        const configuration = controlOptions && typeof controlOptions === 'object' ? controlOptions : {};
        const type = detectThemeControlType(element, configuration.type);
        const read = createThemeControlReader(element, type, configuration.read, getCurrentPreference);
        const write = createThemeControlWriter(element, type, configuration.write);
        const eventType = configuration.event || (type === 'button' ? 'click' : 'change');

        const control = { element, type, read, write, eventType };

        const handler = event => {
          if (applying) {
            return;
          }
          let nextValue;
          try {
            nextValue = control.read(currentPreference, event);
          } catch (error) {
            safeWarn('cineSettingsAppearance: Unable to read theme control value.', error);
            nextValue = currentPreference;
          }

          if (typeof nextValue === 'string') {
            nextValue = nextValue === 'dark';
          }

          applyPreference(!!nextValue, { source: control });
        };

        if (typeof element.addEventListener === 'function') {
          element.addEventListener(eventType, handler);
        }

        control.handler = handler;
        controls.push(control);

        try {
          control.write(currentPreference);
        } catch (error) {
          safeWarn('cineSettingsAppearance: Unable to apply theme preference to control during registration.', error);
        }

        return function unregisterControl() {
          for (let index = controls.length - 1; index >= 0; index -= 1) {
            const storedControl = controls[index];
            if (!storedControl || storedControl.element !== element) {
              continue;
            }
            controls.splice(index, 1);
            if (element && typeof element.removeEventListener === 'function') {
              element.removeEventListener(storedControl.eventType, storedControl.handler);
            }
            break;
          }
        };
      }

      function setValue(value, optionsConfig) {
        const config = optionsConfig && typeof optionsConfig === 'object' ? optionsConfig : {};
        applyPreference(value, { persist: config.persist !== false, source: config.source || null });
      }

      function getValue() {
        return currentPreference;
      }

      function reloadFromStorage(optionsConfig) {
        const config = optionsConfig && typeof optionsConfig === 'object' ? optionsConfig : {};
        const stored = readStoredThemePreference();
        if (stored === null) {
          if (config.persist !== false) {
            persistThemePreference(currentPreference);
          }
          return currentPreference;
        }
        applyPreference(stored, { persist: config.persist !== false });
        return stored;
      }

      const storedPreference = readStoredThemePreference();
      let initialPreference = typeof storedPreference === 'boolean' ? storedPreference : null;
      if (initialPreference === null) {
        if (typeof controllerOptions.detectSystemPreference === 'function') {
          try {
            const detected = controllerOptions.detectSystemPreference();
            if (typeof detected === 'boolean') {
              initialPreference = detected;
            }
          } catch (error) {
            safeWarn('cineSettingsAppearance: detectSystemPreference option failed.', error);
          }
        }

        if (initialPreference === null) {
          const detected = detectSystemDarkPreference();
          if (typeof detected === 'boolean') {
            initialPreference = detected;
          }
        }
      }

      if (initialPreference === null) {
        initialPreference = false;
      }

      applyPreference(initialPreference, { persist: true });

      return {
        registerControl,
        setValue,
        getValue,
        reloadFromStorage,
        persist: persistThemePreference,
      };
    }

    function applyHighContrast(enabled) {
      const root = getRoot();
      const body = getBody();
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
      const root = getRoot();
      const body = getBody();
      if (root) {
        root.classList.toggle('reduce-motion', Boolean(enabled));
      }
      if (body) {
        body.classList.toggle('reduce-motion', Boolean(enabled));
      }
      if (settings.reduceMotion) {
        settings.reduceMotion.checked = Boolean(enabled);
      }

      if (enabled) {
        stopPinkModeAnimatedIconRotation();
      } else if (isPinkModeActive()) {
        startPinkModeAnimatedIconRotation();
      }
    }

    function applyRelaxedSpacing(enabled) {
      const root = getRoot();
      const body = getBody();
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
      const shouldAnimate = options && options.animate === true;
      const toggle = elements.pinkModeToggle || null;
      const helpIcon = elements.pinkModeHelpIcon || null;

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
      const targets = [];
      const toggle = elements.pinkModeToggle || null;
      if (toggle) {
        const toggleIcon = toggle.querySelector && toggle.querySelector('.pink-mode-icon');
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

      for (let index = 0; index < targets.length; index += 1) {
        const target = targets[index];
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
          setTimeout(() => {
            try {
              target.classList.remove(PINK_MODE_ICON_ANIMATION_CLASS);
            } catch (resetError) {
              safeWarn('cineSettingsAppearance: failed to reset pink mode animation.', resetError);
            }
          }, PINK_MODE_ICON_ANIMATION_RESET_DELAY);
        }
      }
    }

    function startPinkModeIconRotation() {
      // Internal Fallback Definitions to ensure Unicorns always appear
      const HORSE_SVG_MARKUP = '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="m1 40c0-8 3-17 3-17a4.84 4.84 0 0 0-1.829-3.064 1 1 0 0 1 .45-1.716 19.438 19.438 0 0 1 4.379-.22c.579-2.317-1.19-3.963-2.782-4.938a1 1 0 0 1 .393-1.85 14.128 14.128 0 0 1 6.389.788c0-.958-1.147-2.145-2.342-3.122a1 1 0 0 1 .708-1.773 40.655 40.655 0 0 1 6.634.895 3.723 3.723 0 0 0-1.049-2.264 1 1 0 0 1 .823-1.652c6.151.378 9.226 1.916 9.226 1.916l10-1s8.472-2.311 15.954.5a1 1 0 0 1-.084 1.9c-1.455.394-2.87 1.143-2.87 2.6 0 0 4.426.738 5.675 4.114a1 1 0 0 1-1.228 1.317c-1.64-.48-4.273-.88-6.447.569Z" fill="#805333" /><path d="m30.18 42.82c1.073 2.7 2.6 9.993 3.357 13.8a2 2 0 0 1-1.964 2.38h-28.573a2 2 0 0 1-2-2v-18c0-2.55 10.03-22.11 23.99-23.87Z" fill="#a56a43" /><path d="m55.67 48.46-6.34 2.97a6 6 0 0 1-7.98-2.88l-.25-.54-.76-1.6a4.956 4.956 0 0 0-4.68-2.87c-.22.01-.44.02-.66.02a16.019 16.019 0 0 1-8.28-29.66c-1.81-2.97-3.45-8.03 2.03-12.49a2.1 2.1 0 0 1 2.5 0c4.23 3.45 4.21 7.25 3.16 10.17a16 16 0 0 1 15.91 11.36l5.31 11.31 2.92 6.22a6.008 6.008 0 0 1-2.88 7.99Z" fill="#cb8252" /><circle cx="42" cy="26" r="3" fill="#2c2f38" /><circle cx="54" cy="43" r="1" fill="#805333" /><path d="m58.55 40.47-2.92-6.22-14.53 13.76.25.54a6 6 0 0 0 7.98 2.88l6.34-2.97a6.008 6.008 0 0 0 2.88-7.99Zm-4.55 3.53a1 1 0 1 1 1-1 1 1 0 0 1-1 1Z" fill="#cf976a" /><circle cx="41" cy="25" r="1.25" fill="#ecf0f1" /></svg>';
      const HORN_MARKUP = '<path d="M44 19 L56 5 L49 22 Z" fill="#ffd700" />';
      const UNICORN_BASE_MARKUP = HORSE_SVG_MARKUP.replace('</svg>', HORN_MARKUP + '</svg>');

      const UNICORN_1_MARKUP = UNICORN_BASE_MARKUP
        .replace(/#805333/g, '#d63384')
        .replace(/#a56a43/g, '#e83e8c')
        .replace(/#cb8252/g, '#fd7e14')
        .replace(/#cf976a/g, '#ffc0cb');

      const UNICORN_2_MARKUP = UNICORN_BASE_MARKUP
        .replace(/#805333/g, '#6f42c1')
        .replace(/#a56a43/g, '#d63384')
        .replace(/#cb8252/g, '#e83e8c')
        .replace(/#cf976a/g, '#e0cffc');

      const UNICORN_3_MARKUP = UNICORN_BASE_MARKUP
        .replace(/#805333/g, '#0dcaf0')
        .replace(/#a56a43/g, '#6f42c1')
        .replace(/#cb8252/g, '#d63384')
        .replace(/#cf976a/g, '#9ec5fe');

      const FALLBACK_SEQUENCE = [
        { className: 'icon-svg pink-mode-icon', markup: UNICORN_1_MARKUP, lottiePath: 'src/animations/horn.json' },
        { className: 'icon-svg pink-mode-icon', markup: UNICORN_2_MARKUP, lottiePath: 'src/animations/unicorn.json' },
        { className: 'icon-svg pink-mode-icon', markup: UNICORN_3_MARKUP, lottiePath: 'src/animations/rainbow.json' }
      ];

      // Force local sequence to ensure Unicorns appear regardless of external module state
      const sequence = FALLBACK_SEQUENCE;

      console.log('Pink Mode Rotation Start. Sequence Length:', sequence ? sequence.length : 'undefined');

      if (!sequence.length) {
        // Fallback to off icon if somehow even fallback sequence is empty
        applyPinkModeIcon(icons.pinkModeIcons ? icons.pinkModeIcons.off : null, { animate: false });
        return;
      }

      stopPinkModeIconRotation();

      const toggle = elements.pinkModeToggle || null;
      const helpIcon = elements.pinkModeHelpIcon || null;
      if (!toggle && !helpIcon) {
        return;
      }

      pinkModeIconIndex = 0;
      applyPinkModeIcon(sequence[pinkModeIconIndex], { animate: true });
      try {
        pinkModeIconRotationTimer = setInterval(() => {
          pinkModeIconIndex = (pinkModeIconIndex + 1) % sequence.length;
          applyPinkModeIcon(sequence[pinkModeIconIndex], { animate: true });
        }, PINK_MODE_ICON_INTERVAL_MS);
        if (pinkModeIconRotationTimer && typeof pinkModeIconRotationTimer.unref === 'function') {
          pinkModeIconRotationTimer.unref();
        }
      } catch (error) {
        pinkModeIconRotationTimer = null;
        safeWarn('cineSettingsAppearance: unable to schedule pink mode rotation.', error);
      }
    }

    function clearPinkModeIconPressResetTimer() {
      if (pinkModeIconPressResetTimer) {
        try {
          clearTimeout(pinkModeIconPressResetTimer);
        } catch (error) {
          safeWarn('cineSettingsAppearance: unable to clear pink mode press reset timer.', error);
        }
        pinkModeIconPressResetTimer = null;
      }
    }

    function schedulePinkModeIconPressReset() {
      if (PINK_MODE_ICON_PRESS_RESET_MS <= 0) {
        return;
      }

      clearPinkModeIconPressResetTimer();

      try {
        pinkModeIconPressResetTimer = setTimeout(() => {
          pinkModeIconPressResetTimer = null;
          pinkModeIconPressCount = 0;
          pinkModeIconPressTimestamps.length = 0;
        }, PINK_MODE_ICON_PRESS_RESET_MS);
        if (
          pinkModeIconPressResetTimer &&
          typeof pinkModeIconPressResetTimer.unref === 'function'
        ) {
          pinkModeIconPressResetTimer.unref();
        }
      } catch (error) {
        pinkModeIconPressResetTimer = null;
        safeWarn('cineSettingsAppearance: unable to schedule pink mode press reset.', error);
      }
    }

    function resetPinkModeIconPressCount() {
      pinkModeIconPressCount = 0;
      clearPinkModeIconPressResetTimer();
      pinkModeIconPressTimestamps.length = 0;
    }

    function recordPinkModeIconPressTimestamp() {
      const now = Date.now();
      pinkModeIconPressTimestamps.push(now);

      const burstWindow = Math.max(PINK_MODE_ICON_PRESS_BURST_WINDOW_MS, 0);
      if (burstWindow > 0) {
        const cutoff = now - burstWindow;
        while (pinkModeIconPressTimestamps.length && pinkModeIconPressTimestamps[0] < cutoff) {
          pinkModeIconPressTimestamps.shift();
        }
      }

      return pinkModeIconPressTimestamps.length;
    }

    // --- INTERNAL PINK MODE MANAGER IMPLEMENTATION ---
    // Inlined to guarantee functionality regardless of external module loading state.

    const PINK_MODE_ANIMATED_ICON_FILES = [
      'src/animations/flamingo.json',
      'src/animations/unicorn.json',
      'src/animations/pink-mode/camera.json',
      'src/animations/pink-mode/director-chair.json',
      'src/animations/pink-mode/dog.json',
      'src/animations/pink-mode/fox-2.json',
      'src/animations/pink-mode/fox-3.json',
      'src/animations/pink-mode/fox.json',
      'src/animations/pink-mode/horse.json',
      'src/animations/pink-mode/mountains.json',
      'src/animations/pink-mode/movie-camera.json',
      'src/animations/pink-mode/pinata.json',
      'src/animations/pink-mode/script.json',
      'src/animations/pink-mode/video-camera.json'
    ];

    function ensureLocalPinkModeLottieRuntime() {
      // Use global scope detection compatible with the app
      let scope = typeof globalThis !== 'undefined' ? globalThis : (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : {}));
      if (scope.lottie) return Promise.resolve(scope.lottie);
      if (scope.bodymovin) return Promise.resolve(scope.bodymovin);

      if (typeof document === 'undefined') return Promise.resolve(null);

      if (document.querySelector('script[data-loader="pink-mode-lottie"]')) {
        return new Promise(resolve => {
          const s = document.querySelector('script[data-loader="pink-mode-lottie"]');
          if (s.dataset.loaded === 'true') resolve(scope.lottie);
          else s.addEventListener('load', () => resolve(scope.lottie), { once: true });
        });
      }

      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'src/vendor/lottie.min.js';
        script.async = true;
        script.setAttribute('data-loader', 'pink-mode-lottie');
        script.onload = () => {
          script.dataset.loaded = 'true';
          resolve(scope.lottie);
        };
        script.onerror = () => {
          resolve(null);
        };
        document.head.appendChild(script);
      });
    }

    class LocalFloatingIcon {
      constructor(manager, x, y, iconData) {
        this.manager = manager;
        this.element = document.createElement('div');
        this.element.className = 'pink-mode-floating-icon';
        this.element.style.left = x + 'px';
        this.element.style.top = y + 'px';
        this.element.style.position = 'fixed';
        this.element.style.width = '100px';
        this.element.style.height = '100px';
        this.element.style.pointerEvents = 'none';
        this.element.style.zIndex = '10000';

        document.body.appendChild(this.element);

        ensureLocalPinkModeLottieRuntime().then(lottie => {
          if (this.destroyed) return;
          this.anim = lottie.loadAnimation({
            container: this.element,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: iconData
          });
        });

        this.posY = y;
        this.speed = 1 + Math.random() * 2;
        this.tick = this.tick.bind(this);
        requestAnimationFrame(this.tick);
      }

      tick() {
        if (!this.element.parentNode) return;
        this.posY += this.speed;
        this.element.style.top = this.posY + 'px';
        if (this.posY > window.innerHeight) {
          this.destroy();
        } else {
          requestAnimationFrame(this.tick);
        }
      }

      destroy() {
        this.destroyed = true;
        if (this.element.parentNode) {
          this.element.parentNode.removeChild(this.element);
        }
        if (this.anim) {
          this.anim.destroy();
        }
      }
    }

    class LocalPinkModeManager {
      constructor() {
        this.active = false;
        this.icons = [];
      }

      activate() {
        this.active = true;
        document.body.classList.add('pink-mode-active');
      }

      deactivate() {
        this.active = false;
        document.body.classList.remove('pink-mode-active');
        this.icons.forEach(i => i.destroy());
        this.icons = [];
      }

      triggerRain() {
        console.log('Rain triggered (Local Manager)!');
        for (let i = 0; i < 20; i++) {
          setTimeout(() => {
            this.spawnRandomIcon();
          }, i * 200);
        }
      }

      spawnRandomIcon() {
        if (!this.active && !this.rainOverride) {
          // If triggered by button press (rain), we might want to allow it even if not fully active? 
          // Usually Rain implies active.
        }

        const iconFile = PINK_MODE_ANIMATED_ICON_FILES[Math.floor(Math.random() * PINK_MODE_ANIMATED_ICON_FILES.length)];
        let scope = typeof globalThis !== 'undefined' ? globalThis : (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : {}));

        // Try to get from global cache first
        if (scope.cinePinkModeAnimatedIconData && scope.cinePinkModeAnimatedIconData[iconFile]) {
          try {
            const iconData = JSON.parse(scope.cinePinkModeAnimatedIconData[iconFile]);
            this.spawnIconWithData(iconData);
          } catch (e) {
            //   console.error(e);
          }
          return;
        }

        if (typeof fetch === 'function') {
          console.log('Fetching icon:', iconFile);
          fetch(iconFile)
            .then(response => {
              if (!response.ok) throw new Error('Network response was not ok');
              return response.json();
            })
            .then(data => {
              if (!scope.cinePinkModeAnimatedIconData) scope.cinePinkModeAnimatedIconData = {};
              scope.cinePinkModeAnimatedIconData[iconFile] = JSON.stringify(data);
              this.spawnIconWithData(data);
            })
            .catch((err) => { console.error('Pink Mode Fetch Error:', err); });
        }
      }

      spawnIconWithData(iconData) {
        if (!iconData) return;
        const x = Math.random() * window.innerWidth;
        const y = -150;
        const icon = new LocalFloatingIcon(this, x, y, iconData);
        this.icons.push(icon);
      }
    }

    const localPinkModeManager = new LocalPinkModeManager();


    function triggerPinkModeIconRain() {
      // Force temporary activation for rain if not active
      localPinkModeManager.rainOverride = true;
      localPinkModeManager.triggerRain();
      setTimeout(() => { localPinkModeManager.rainOverride = false; }, 5000);

      if (typeof icons.triggerPinkModeIconRain === 'function') {
        try {
          icons.triggerPinkModeIconRain();
        } catch (error) {
          safeWarn('cineSettingsAppearance: triggerPinkModeIconRain failed.', error);
        }
      }
    }

    function handlePinkModeIconPress() {
      pinkModeIconPressCount = recordPinkModeIconPressTimestamp();

      if (PINK_MODE_ICON_PRESS_RESET_MS > 0) {
        schedulePinkModeIconPressReset();
      }

      if (pinkModeIconPressCount < 3) {
        return;
      }

      if (PINK_MODE_ICON_PRESS_RESET_MS <= 0 && pinkModeIconPressCount > 3) {
        pinkModeIconPressCount = 3;
      }

      triggerPinkModeIconRain();
    }

    function startPinkModeAnimatedIcons() {
      localPinkModeManager.activate();
      if (typeof icons.startPinkModeAnimatedIcons === 'function') {
        icons.startPinkModeAnimatedIcons();
      }
    }

    function stopPinkModeAnimatedIcons() {
      localPinkModeManager.deactivate();
      if (typeof icons.stopPinkModeAnimatedIcons === 'function') {
        icons.stopPinkModeAnimatedIcons();
      }
    }

    function startPinkModeAnimatedIconRotation() {
      startPinkModeIconRotation();
      startPinkModeAnimatedIcons();
    }

    function stopPinkModeAnimatedIconRotation() {
      stopPinkModeAnimatedIcons();
      stopPinkModeIconRotation();
      resetPinkModeIconPressCount();
    }

    function applyPinkMode(enabled) {
      const root = getRoot();
      const body = getBody();
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
          applyPinkModeIcon(icons.pinkModeIcons.off, { animate: false });
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
      const body = getBody();
      return !!(body && body.classList && body.classList.contains('pink-mode'));
    }

    function persistPinkModePreference(enabled) {
      pinkModeEnabled = !!enabled;
      applyPinkMode(pinkModeEnabled);
      const storage = getLocalStorage(context);
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

    function getFocusScale() {
      if (typeof preferences.getFocusScale === 'function') {
        return preferences.getFocusScale();
      }
      return preferences.focusScale || 'metric';
    }

    function setFocusScale(value) {
      if (typeof preferences.setFocusScale === 'function') {
        preferences.setFocusScale(value);
      } else {
        preferences.focusScale = value;
      }
    }

    function rememberSettingsTemperatureUnitBaseline() {
      const current = getTemperatureUnit();
      settingsInitialTemperatureUnit = typeof current === 'string' ? current : 'celsius';
    }

    function revertSettingsTemperatureUnitIfNeeded() {
      const baseline = typeof settingsInitialTemperatureUnit === 'string'
        ? settingsInitialTemperatureUnit
        : 'celsius';

      const applyPreference = preferences.applyTemperatureUnitPreference;
      if (typeof applyPreference === 'function') {
        if (getTemperatureUnit() !== baseline) {
          try {
            applyPreference(baseline, { persist: false, forceUpdate: true });
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

    function rememberSettingsFocusScaleBaseline() {
      const current = getFocusScale();
      settingsInitialFocusScale = typeof current === 'string' ? current : 'metric';
    }

    function revertSettingsFocusScaleIfNeeded() {
      const baseline = typeof settingsInitialFocusScale === 'string'
        ? settingsInitialFocusScale
        : 'metric';

      const applyPreference = preferences.applyFocusScalePreference;
      if (typeof applyPreference === 'function') {
        if (getFocusScale() !== baseline) {
          try {
            applyPreference(baseline, { persist: false, forceUpdate: true });
            setFocusScale(baseline);
          } catch (error) {
            safeWarn('cineSettingsAppearance: Failed to revert focus scale preference.', error);
          }
        } else if (settings.focusScale) {
          settings.focusScale.value = baseline;
        }
      } else if (settings.focusScale) {
        settings.focusScale.value = baseline;
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
      const config = options && typeof options === 'object' ? options : {};
      const persist = config.persist !== false;
      const forceRepopulate = Boolean(config.forceRepopulate);
      const normalized = Boolean(enabled);
      const previousValue = getShowAutoBackups();
      const changed = normalized !== previousValue;

      setShowAutoBackups(normalized);

      if (normalized && typeof preferences.ensureAutoBackupsFromProjects === 'function') {
        callOptional(preferences.ensureAutoBackupsFromProjects);
      }

      if (persist) {
        const storage = getLocalStorage(context);
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

      const setupSelect = autoBackups.setupSelect || null;
      const setupNameInput = autoBackups.setupNameInput || null;

      const previousSelectValue = setupSelect ? setupSelect.value : '';
      const previousNameValue = setupNameInput ? setupNameInput.value : '';

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
      const baseline = Boolean(settingsInitialShowAutoBackups);
      if (Boolean(getShowAutoBackups()) !== baseline) {
        applyShowAutoBackupsPreference(baseline, { forceRepopulate: true });
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

      const cloneFn = mountVoltages.getPreferencesClone;
      const applyFn = mountVoltages.applyPreferences;
      const updateInputsFn = mountVoltages.updateInputsFromState;
      const warnHelper = mountVoltages.warnMissingHelper || (() => { });
      const supportedTypes = Array.isArray(mountVoltages.supportedTypes)
        ? mountVoltages.supportedTypes
        : [];
      const defaults = mountVoltages.defaultVoltages && typeof mountVoltages.defaultVoltages === 'object'
        ? mountVoltages.defaultVoltages
        : {};

      let baseline = mountVoltages.settingsInitial;
      if (!baseline && typeof cloneFn === 'function') {
        baseline = cloneFn();
      }

      let current = baseline;
      if (typeof cloneFn === 'function') {
        try {
          current = cloneFn();
        } catch (error) {
          warnHelper('getMountVoltagePreferencesClone', error);
        }
      }

      const changed = supportedTypes.some(type => {
        const baselineEntry = baseline && baseline[type] ? baseline[type] : defaults[type];
        const currentEntry = current && current[type] ? current[type] : defaults[type];
        if (!baselineEntry || !currentEntry) {
          return false;
        }
        return (
          Number(baselineEntry.high) !== Number(currentEntry.high)
          || Number(baselineEntry.low) !== Number(currentEntry.low)
        );
      });

      if (changed) {
        if (typeof applyFn === 'function') {
          try {
            applyFn(baseline, { persist: true, triggerUpdate: true });
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
      updateThemeColor,
      setToggleIcon,
      applyDarkMode,
      applyHighContrast,
      applyReduceMotion,
      applyRelaxedSpacing,
      applyPinkMode,
      persistPinkModePreference,
      rememberSettingsPinkModeBaseline,
      revertSettingsPinkModeIfNeeded,
      rememberSettingsTemperatureUnitBaseline,
      revertSettingsTemperatureUnitIfNeeded,
      rememberSettingsFocusScaleBaseline,
      revertSettingsFocusScaleIfNeeded,
      applyShowAutoBackupsPreference,
      rememberSettingsShowAutoBackupsBaseline,
      revertSettingsShowAutoBackupsIfNeeded,
      rememberSettingsMountVoltagesBaseline,
      revertSettingsMountVoltagesIfNeeded,
      handlePinkModeIconPress,
      triggerPinkModeIconAnimation,
      triggerPinkModeIconRain,
      startPinkModeIconRotation,
      stopPinkModeIconRotation,
      applyPinkModeIcon,
      startPinkModeAnimatedIcons,
      stopPinkModeAnimatedIcons,
      startPinkModeAnimatedIconRotation,
      stopPinkModeAnimatedIconRotation,
      isPinkModeActive,
      createThemePreferenceController,
      setAccentColor,
      setPrevAccentColor,
      getAccentColor,
      getPrevAccentColor,
      setShowAutoBackups,
      getShowAutoBackups,
    });
  }

  function initialize(context) {
    return createAppearanceManager(context || {});
  }

  const api = freezeDeep({
    initialize,
  });

  informModuleGlobals('cineSettingsAppearance', api);

  registerOrQueueModule(
    'cineSettingsAppearance',
    api,
    {
      category: 'ui',
      description: 'Appearance and settings helpers for the application UI.',
      replace: true,
      connections: ['cineModuleGlobals', 'cineModuleEnvironment', 'cineUi'],
    },
    (error) => {
      safeWarn('cineSettingsAppearance: Unable to register module.', error);
    },
  );

  exposeGlobal('cineSettingsAppearance', api, {
    configurable: true,
    enumerable: false,
    writable: false,
  });

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = api;
  }
})();

