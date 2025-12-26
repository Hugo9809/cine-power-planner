function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
  function createModuleBaseFallback(scope) {
    var targetScope = scope && (_typeof(scope) === 'object' || typeof scope === 'function') ? scope : detectGlobalScope();
    var resolvedScope = targetScope && (_typeof(targetScope) === 'object' || typeof targetScope === 'function') ? targetScope : null;
    if (!resolvedScope) {
      return null;
    }
    var existingBase = null;
    try {
      if (resolvedScope && _typeof(resolvedScope.cineModuleBase) === 'object') {
        existingBase = resolvedScope.cineModuleBase;
      }
    } catch (readBaseError) {
      void readBaseError;
      existingBase = null;
    }
    if (existingBase) {
      return existingBase;
    }
    var moduleStorage = Object.create(null);
    var listenerStorage = Object.create(null);
    var notifyListeners = function notifyListeners(name, api) {
      if (typeof name !== 'string' || !name) {
        return;
      }
      var queue = listenerStorage[name];
      if (!Array.isArray(queue) || queue.length === 0) {
        return;
      }
      listenerStorage[name] = [];
      for (var index = 0; index < queue.length; index += 1) {
        var listener = queue[index];
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
    var storeModule = function storeModule(name, api) {
      if (typeof name !== 'string' || !name) {
        return;
      }
      moduleStorage[name] = api;
      notifyListeners(name, api);
    };
    var getStoredModule = function getStoredModule(name) {
      if (typeof name !== 'string' || !name) {
        return null;
      }
      if (Object.prototype.hasOwnProperty.call(moduleStorage, name)) {
        return moduleStorage[name];
      }
      return null;
    };
    var whenModuleAvailable = function whenModuleAvailable(name, handler) {
      if (typeof handler !== 'function' || typeof name !== 'string' || !name) {
        return false;
      }
      var existing = getStoredModule(name);
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
    var ensureModuleGlobals = function ensureModuleGlobals() {
      var globals = null;
      try {
        globals = resolvedScope.cineModuleGlobals;
      } catch (readError) {
        void readError;
        globals = null;
      }
      if (!globals || _typeof(globals) !== 'object') {
        globals = {};
      }
      if (typeof globals.getModule !== 'function') {
        globals.getModule = function (name) {
          return getStoredModule(name);
        };
      }
      if (typeof globals.whenModuleAvailable !== 'function') {
        globals.whenModuleAvailable = function (name, handler) {
          return whenModuleAvailable(name, handler);
        };
      }
      if (typeof globals.register !== 'function') {
        globals.register = function (name, api) {
          storeModule(name, api);
          return true;
        };
      }
      try {
        Object.defineProperty(resolvedScope, 'cineModuleGlobals', {
          configurable: true,
          enumerable: false,
          writable: true,
          value: globals
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
    var ensureModuleRegistry = function ensureModuleRegistry() {
      var registry = null;
      try {
        registry = resolvedScope.cineModules;
      } catch (readError) {
        void readError;
        registry = null;
      }
      if (!registry || _typeof(registry) !== 'object') {
        registry = {};
      }
      if (typeof registry.get !== 'function') {
        registry.get = function (name) {
          return getStoredModule(name);
        };
      }
      if (typeof registry.register !== 'function') {
        registry.register = function (name, api) {
          storeModule(name, api);
          return true;
        };
      }
      try {
        Object.defineProperty(resolvedScope, 'cineModules', {
          configurable: true,
          enumerable: false,
          writable: true,
          value: registry
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
    var fallbackBase = {
      freezeDeep: function freezeDeep(value) {
        return value;
      },
      safeWarn: function safeWarn(message, detail) {
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
      informModuleGlobals: function informModuleGlobals(name, api) {
        var globals = ensureModuleGlobals();
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
      registerOrQueueModule: function registerOrQueueModule(name, api) {
        var registry = ensureModuleRegistry();
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
      exposeGlobal: function exposeGlobal(name, value, target) {
        var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        var scopeTarget = target && (_typeof(target) === 'object' || typeof target === 'function') ? target : resolvedScope;
        if (!scopeTarget || _typeof(scopeTarget) !== 'object' && typeof scopeTarget !== 'function') {
          return false;
        }
        var descriptor = {
          configurable: options.configurable !== false,
          enumerable: !!options.enumerable,
          writable: options.writable === true,
          value: value
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
      }
    };
    fallbackBase.registerOrQueueModule('cineModuleBase', fallbackBase);
    fallbackBase.exposeGlobal('cineModuleBase', fallbackBase, resolvedScope, {
      configurable: true,
      enumerable: false,
      writable: false
    });
    ensureModuleGlobals();
    ensureModuleRegistry();
    return fallbackBase;
  }
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
  var MODULE_BASE = resolveModuleBase(GLOBAL_SCOPE) || createModuleBaseFallback(GLOBAL_SCOPE);
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
  } : function noopInform() { };
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
  } : function fallbackRegister() { };
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
    var storage = context.storage || {};
    void win;
    void helpers;
    var themeMemoryStorage = function createThemeMemoryStorage() {
      var memory = Object.create(null);
      return {
        getItem: function getItem(key) {
          if (Object.prototype.hasOwnProperty.call(memory, key)) {
            return memory[key];
          }
          return null;
        },
        setItem: function setItem(key, value) {
          memory[key] = String(value);
        },
        removeItem: function removeItem(key) {
          if (Object.prototype.hasOwnProperty.call(memory, key)) {
            delete memory[key];
          }
        }
      };
    }();
    function collectThemeStorageEntries() {
      var entries = [];
      function pushEntry(name, storageRef) {
        if (!storageRef || typeof storageRef.getItem !== 'function') {
          return;
        }
        for (var _index = 0; _index < entries.length; _index += 1) {
          if (entries[_index] && entries[_index].storage === storageRef) {
            return;
          }
        }
        entries.push({
          name: name,
          storage: storageRef
        });
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
      var entries = collectThemeStorageEntries();
      var serialized = value ? 'true' : 'false';
      for (var _index2 = 0; _index2 < entries.length; _index2 += 1) {
        var entry = entries[_index2];
        if (!entry || !entry.storage || typeof entry.storage.setItem !== 'function') {
          continue;
        }
        try {
          entry.storage.setItem('darkMode', serialized);
        } catch (error) {
          safeWarn('cineSettingsAppearance: Unable to persist theme preference.', {
            name: entry.name,
            error: error
          });
        }
      }
    }
    function readStoredThemePreference() {
      var entries = collectThemeStorageEntries();
      for (var _index3 = 0; _index3 < entries.length; _index3 += 1) {
        var entry = entries[_index3];
        if (!entry || !entry.storage || typeof entry.storage.getItem !== 'function') {
          continue;
        }
        try {
          var stored = entry.storage.getItem('darkMode');
          if (stored === 'true' || stored === 'false') {
            return stored === 'true';
          }
        } catch (error) {
          safeWarn('cineSettingsAppearance: Unable to read theme preference.', {
            name: entry.name,
            error: error
          });
        }
      }
      return null;
    }
    var pinkModeIconRotationTimer = null;
    var pinkModeIconIndex = 0;
    var pinkModeIconPressCount = 0;
    var pinkModeIconPressTimestamps = [];
    var pinkModeIconPressResetTimer = null;
    var PINK_MODE_ICON_ANIMATION_RESET_DELAY = context.pinkModeIconAnimationResetDelay || 400;
    var PINK_MODE_ICON_ANIMATION_CLASS = context.pinkModeIconAnimationClass || 'pink-mode-icon-animate';
    var PINK_MODE_ICON_INTERVAL_MS = context.pinkModeIconIntervalMs || 1500;
    var PINK_MODE_ICON_PRESS_RESET_MS = typeof context.pinkModeIconPressResetMs === 'number' && context.pinkModeIconPressResetMs >= 0 ? context.pinkModeIconPressResetMs : 0;
    var PINK_MODE_ICON_PRESS_BURST_WINDOW_MS = typeof context.pinkModeIconPressBurstWindowMs === 'number' && context.pinkModeIconPressBurstWindowMs >= 0 ? context.pinkModeIconPressBurstWindowMs : 1200;
    var pinkModeEnabled = false;
    var settingsInitialPinkMode = false;
    var settingsInitialTemperatureUnit = 'celsius';
    var settingsInitialFocusScale = 'metric';
    var settingsInitialShowAutoBackups = false;
    var PINK_MODE_STORAGE_KEY = 'cameraPowerPlanner_pinkMode';
    var LEGACY_PINK_MODE_STORAGE_KEY = 'pinkMode';
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
      if (iconSpan._lottieAnim) {
        try {
          iconSpan._lottieAnim.destroy();
        } catch (_unused) { }
        iconSpan._lottieAnim = null;
      }
      var glyphConfig = glyph && _typeof(glyph) === 'object' && (glyph.markup || glyph.className || glyph.lottiePath) ? glyph : {
        value: glyph
      };
      var classNames = ['icon-glyph'];
      if (glyphConfig.className) {
        classNames.push(glyphConfig.className);
      }
      iconSpan.className = classNames.join(' ');
      if ((glyphConfig.lottiePath || glyphConfig.lottieData) && typeof icons.ensurePinkModeLottieRuntime === 'function') {
        var handleLottie = function handleLottie() {
          iconSpan.classList.remove('pink-mode-icon-pop');
          void iconSpan.offsetWidth;
          iconSpan.classList.add('pink-mode-icon-pop');
          var requestId = Date.now() + Math.random();
          iconSpan._lottieRequestId = requestId;
          icons.ensurePinkModeLottieRuntime().then(function (lottie) {
            if (!lottie) return;
            if (iconSpan._lottieRequestId !== requestId) return;
            if (!iconSpan || !document.body.contains(button)) return;
            try {
              var lottieContainer = iconSpan.querySelector('.lottie-container');
              if (!lottieContainer) {
                lottieContainer = doc.createElement('div');
                lottieContainer.className = 'lottie-container';
                lottieContainer.style.width = '100%';
                lottieContainer.style.height = '100%';
                lottieContainer.style.display = 'flex';
                lottieContainer.style.justifyContent = 'center';
                lottieContainer.style.alignItems = 'center';
                lottieContainer.style.position = 'absolute';
                lottieContainer.style.top = '0';
                lottieContainer.style.left = '0';
                lottieContainer.style.zIndex = '2';
                iconSpan.appendChild(lottieContainer);
                iconSpan.style.position = 'relative';
                if (getComputedStyle(iconSpan).display === 'inline') {
                  iconSpan.style.display = 'inline-block';
                }
              } else {
                lottieContainer.innerHTML = '';
              }
              var animConfig = {
                container: lottieContainer,
                renderer: 'svg',
                loop: true,
                autoplay: true
              };
              if (glyphConfig.lottieData) {
                animConfig.animationData = glyphConfig.lottieData;
              } else if (glyphConfig.lottiePath) {
                animConfig.path = glyphConfig.lottiePath;
              }
              var anim = lottie.loadAnimation(animConfig);
              iconSpan._lottieAnim = anim;
              var hideFallback = function hideFallback() {
                var oldFallback = iconSpan.querySelector('.icon-fallback');
                if (oldFallback) {
                  oldFallback.style.opacity = '0';
                  setTimeout(function () {
                    if (oldFallback.style.opacity === '0') {
                      oldFallback.style.display = 'none';
                      if (lottieContainer) {
                        lottieContainer.style.position = 'relative';
                        lottieContainer.style.top = '';
                        lottieContainer.style.left = '';
                      }
                    }
                  }, 200);
                } else if (lottieContainer) {
                  lottieContainer.style.position = 'relative';
                  lottieContainer.style.top = '';
                  lottieContainer.style.left = '';
                }
              };
              anim.addEventListener('DOMLoaded', hideFallback);
              var handleFailure = function handleFailure() {
                if (lottieContainer && lottieContainer.parentNode) {
                  lottieContainer.parentNode.removeChild(lottieContainer);
                }
                var oldFallback = iconSpan.querySelector('.icon-fallback');
                if (oldFallback) {
                  oldFallback.style.display = '';
                  oldFallback.style.opacity = '1';
                }
              };
              anim.addEventListener('data_failed', handleFailure);
              anim.addEventListener('error', handleFailure);
            } catch (_unused2) { }
          }).catch(function () { });
        };
        if (glyphConfig.markup) {
          var markup = ensureSvgHasAriaHidden(glyphConfig.markup);
          var fallback = iconSpan.querySelector('.icon-fallback');
          if (!fallback) {
            var existing = iconSpan.querySelector('svg:not(.lottie-container svg)');
            if (existing) {
              existing.classList.add('icon-fallback');
              fallback = existing;
            }
          }
          if (fallback) {
            var temp = doc.createElement('div');
            temp.innerHTML = markup;
            var newSvg = temp.firstElementChild;
            if (newSvg) {
              newSvg.classList.add('icon-fallback');
              newSvg.style.transition = 'opacity 0.2s ease';
              if (fallback.parentNode === iconSpan) {
                iconSpan.replaceChild(newSvg, fallback);
              }
            }
          } else {
            var _temp = doc.createElement('div');
            _temp.innerHTML = markup;
            var _newSvg = _temp.firstElementChild;
            if (_newSvg) {
              _newSvg.classList.add('icon-fallback');
              _newSvg.style.transition = 'opacity 0.2s ease';
              _newSvg.style.position = 'relative';
              _newSvg.style.zIndex = '1';
              iconSpan.prepend(_newSvg);
            }
          }
        }
        handleLottie();
      } else if (glyphConfig.markup) {
        iconSpan.innerHTML = ensureSvgHasAriaHidden(glyphConfig.markup);
        iconSpan.removeAttribute('data-icon-font');
        iconSpan.classList.remove('pink-mode-icon-pop');
        void iconSpan.offsetWidth;
        iconSpan.classList.add('pink-mode-icon-pop');
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
      var tagName = element.tagName.toLowerCase();
      if (tagName === 'select') {
        return 'select';
      }
      if (tagName === 'input') {
        var typeAttr = typeof element.getAttribute === 'function' ? (element.getAttribute('type') || '').toLowerCase() : '';
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
        return function () {
          return !!(element && element.value === 'dark');
        };
      }
      if (type === 'checkbox') {
        return function () {
          return !!(element && element.checked);
        };
      }
      return function () {
        return !getCurrent();
      };
    }
    function createThemeControlWriter(element, type, provided) {
      if (typeof provided === 'function') {
        return provided;
      }
      if (type === 'select') {
        return function (value) {
          if (!element) {
            return;
          }
          var expected = value ? 'dark' : 'light';
          if (element.value !== expected) {
            element.value = expected;
          }
        };
      }
      if (type === 'checkbox') {
        return function (value) {
          if (element) {
            element.checked = !!value;
          }
        };
      }
      return function (value) {
        if (!element || typeof element.setAttribute !== 'function') {
          return;
        }
        element.setAttribute('aria-pressed', value ? 'true' : 'false');
      };
    }
    function createThemePreferenceController(options) {
      var controllerOptions = options && _typeof(options) === 'object' ? options : {};
      var controls = [];
      var applying = false;
      var currentPreference = false;
      var getCurrentPreference = function getCurrentPreference() {
        return currentPreference;
      };
      function applyPreference(value, config) {
        var optionsConfig = config && _typeof(config) === 'object' ? config : {};
        var normalized = !!value;
        var previous = currentPreference;
        currentPreference = normalized;
        applying = true;
        try {
          for (var _index4 = 0; _index4 < controls.length; _index4 += 1) {
            var control = controls[_index4];
            if (!control || control === optionsConfig.source || typeof control.write !== 'function') {
              continue;
            }
            try {
              control.write(normalized, {
                previous: previous
              });
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
            optionsConfig.source.write(normalized, {
              previous: previous
            });
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
          return function () { };
        }
        var configuration = controlOptions && _typeof(controlOptions) === 'object' ? controlOptions : {};
        var type = detectThemeControlType(element, configuration.type);
        var read = createThemeControlReader(element, type, configuration.read, getCurrentPreference);
        var write = createThemeControlWriter(element, type, configuration.write);
        var eventType = configuration.event || (type === 'button' ? 'click' : 'change');
        var control = {
          element: element,
          type: type,
          read: read,
          write: write,
          eventType: eventType
        };
        var handler = function handler(event) {
          if (applying) {
            return;
          }
          var nextValue;
          try {
            nextValue = control.read(currentPreference, event);
          } catch (error) {
            safeWarn('cineSettingsAppearance: Unable to read theme control value.', error);
            nextValue = currentPreference;
          }
          if (typeof nextValue === 'string') {
            nextValue = nextValue === 'dark';
          }
          applyPreference(!!nextValue, {
            source: control
          });
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
          for (var _index5 = controls.length - 1; _index5 >= 0; _index5 -= 1) {
            var storedControl = controls[_index5];
            if (!storedControl || storedControl.element !== element) {
              continue;
            }
            controls.splice(_index5, 1);
            if (element && typeof element.removeEventListener === 'function') {
              element.removeEventListener(storedControl.eventType, storedControl.handler);
            }
            break;
          }
        };
      }
      function setValue(value, optionsConfig) {
        var config = optionsConfig && _typeof(optionsConfig) === 'object' ? optionsConfig : {};
        applyPreference(value, {
          persist: config.persist !== false,
          source: config.source || null
        });
      }
      function getValue() {
        return currentPreference;
      }
      function reloadFromStorage(optionsConfig) {
        var config = optionsConfig && _typeof(optionsConfig) === 'object' ? optionsConfig : {};
        var stored = readStoredThemePreference();
        if (stored === null) {
          if (config.persist !== false) {
            persistThemePreference(currentPreference);
          }
          return currentPreference;
        }
        applyPreference(stored, {
          persist: config.persist !== false
        });
        return stored;
      }
      var storedPreference = readStoredThemePreference();
      var initialPreference = typeof storedPreference === 'boolean' ? storedPreference : null;
      if (initialPreference === null) {
        if (typeof controllerOptions.detectSystemPreference === 'function') {
          try {
            var detected = controllerOptions.detectSystemPreference();
            if (typeof detected === 'boolean') {
              initialPreference = detected;
            }
          } catch (error) {
            safeWarn('cineSettingsAppearance: detectSystemPreference option failed.', error);
          }
        }
        if (initialPreference === null) {
          var _detected = detectSystemDarkPreference();
          if (typeof _detected === 'boolean') {
            initialPreference = _detected;
          }
        }
      }
      if (initialPreference === null) {
        initialPreference = false;
      }
      applyPreference(initialPreference, {
        persist: true
      });
      return {
        registerControl: registerControl,
        setValue: setValue,
        getValue: getValue,
        reloadFromStorage: reloadFromStorage,
        persist: persistThemePreference
      };
    }
    function detectPinkModeControlType(element, provided) {
      if (provided) {
        return provided;
      }
      if (!element || typeof element.tagName !== 'string') {
        return 'button';
      }
      var tagName = element.tagName.toLowerCase();
      if (tagName === 'select') {
        return 'select';
      }
      if (tagName === 'input') {
        var typeAttr = typeof element.getAttribute === 'function' ? (element.getAttribute('type') || '').toLowerCase() : '';
        if (typeAttr === 'checkbox') {
          return 'checkbox';
        }
      }
      return 'button';
    }
    function createPinkModeControlReader(element, type, provided, getCurrent) {
      if (typeof provided === 'function') {
        return provided;
      }
      if (type === 'select') {
        return function () {
          return !!(element && element.value === 'enabled');
        };
      }
      if (type === 'checkbox') {
        return function () {
          return !!(element && element.checked);
        };
      }
      return function () {
        return !getCurrent();
      };
    }
    function createPinkModeControlWriter(element, type, provided) {
      if (typeof provided === 'function') {
        return provided;
      }
      if (type === 'select') {
        return function (value) {
          if (!element) {
            return;
          }
          var expected = value ? 'enabled' : 'disabled';
          if (element.value !== expected) {
            element.value = expected;
          }
        };
      }
      if (type === 'checkbox') {
        return function (value) {
          if (element) {
            element.checked = !!value;
          }
        };
      }
      return function (value) {
        if (!element || typeof element.setAttribute !== 'function') {
          return;
        }
        element.setAttribute('aria-pressed', value ? 'true' : 'false');
      };
    }
    function createPinkModePreferenceController(options) {
      var controllerOptions = options && _typeof(options) === 'object' ? options : {};
      var controls = [];
      var applying = false;
      var currentPreference = isPinkModeActive();
      var getCurrentPreference = function getCurrentPreference() {
        return currentPreference;
      };
      function applyPreference(value, config) {
        var optionsConfig = config && _typeof(config) === 'object' ? config : {};
        var normalized = !!value;
        var previous = currentPreference;
        currentPreference = normalized;
        applying = true;
        try {
          for (var _indexP = 0; _indexP < controls.length; _indexP += 1) {
            var control = controls[_indexP];
            if (!control || control === optionsConfig.source || typeof control.write !== 'function') {
              continue;
            }
            try {
              control.write(normalized, {
                previous: previous
              });
            } catch (error) {
              safeWarn('cineSettingsAppearance: Unable to sync pink mode control.', error);
            }
          }
          try {
            applyPinkMode(normalized);
          } catch (error) {
            safeWarn('cineSettingsAppearance: applyPinkMode failed during update.', error);
          }
        } finally {
          applying = false;
        }
        if (optionsConfig.source && typeof optionsConfig.source.write === 'function') {
          try {
            optionsConfig.source.write(normalized, {
              previous: previous
            });
          } catch (error) {
            safeWarn('cineSettingsAppearance: Unable to sync source pink mode control.', error);
          }
        }
        if (optionsConfig.persist !== false) {
          persistPinkModePreference(normalized);
        }
        return previous !== normalized;
      }
      function registerControl(element, controlOptions) {
        if (!element) {
          return function () { };
        }
        var configuration = controlOptions && _typeof(controlOptions) === 'object' ? controlOptions : {};
        var type = detectPinkModeControlType(element, configuration.type);
        var read = createPinkModeControlReader(element, type, configuration.read, getCurrentPreference);
        var write = createPinkModeControlWriter(element, type, configuration.write);
        var eventType = configuration.event || (type === 'button' ? 'click' : 'change');
        var control = {
          element: element,
          type: type,
          read: read,
          write: write,
          eventType: eventType
        };
        var handler = function handler(event) {
          if (applying) {
            return;
          }
          var nextValue;
          try {
            nextValue = control.read(currentPreference, event);
          } catch (error) {
            safeWarn('cineSettingsAppearance: Unable to read pink mode control value.', error);
            nextValue = currentPreference;
          }
          applyPreference(!!nextValue, {
            source: control
          });
        };
        if (typeof element.addEventListener === 'function') {
          element.addEventListener(eventType, handler);
        }
        control.handler = handler;
        controls.push(control);
        try {
          control.write(currentPreference);
        } catch (error) {
          safeWarn('cineSettingsAppearance: Unable to apply pink mode preference to control during registration.', error);
        }
        return function unregisterControl() {
          for (var _indexPU = controls.length - 1; _indexPU >= 0; _indexPU -= 1) {
            var storedControl = controls[_indexPU];
            if (!storedControl || storedControl.element !== element) {
              continue;
            }
            controls.splice(_indexPU, 1);
            if (element && typeof element.removeEventListener === 'function') {
              element.removeEventListener(storedControl.eventType, storedControl.handler);
            }
            break;
          }
        };
      }
      function setValue(value, optionsConfig) {
        var config = optionsConfig && _typeof(optionsConfig) === 'object' ? optionsConfig : {};
        applyPreference(value, {
          persist: config.persist !== false,
          source: config.source || null
        });
      }
      function getValue() {
        return currentPreference;
      }
      function reloadFromStorage(optionsConfig) {
        var config = optionsConfig && _typeof(optionsConfig) === 'object' ? optionsConfig : {};
        var storage = getLocalStorage(context);
        var stored = null;
        if (storage) {
          try {
            var item = storage.getItem(PINK_MODE_STORAGE_KEY);
            if (item !== null) {
              stored = item === 'true' || item === true;
            } else {
              item = storage.getItem(LEGACY_PINK_MODE_STORAGE_KEY);
              if (item !== null) {
                stored = item === 'true' || item === true;
              }
            }
          } catch (error) {
            safeWarn('cineSettingsAppearance: Could not read pink mode preference from storage.', error);
          }
        }
        if (stored === null) {
          if (config.persist !== false) {
            persistPinkModePreference(currentPreference);
          }
          return currentPreference;
        }
        applyPreference(stored, {
          persist: config.persist !== false
        });
        return stored;
      }
      return {
        registerControl: registerControl,
        setValue: setValue,
        getValue: getValue,
        reloadFromStorage: reloadFromStorage,
        persist: persistPinkModePreference
      };
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
      if (enabled) {
        stopPinkModeAnimatedIconRotation();
      } else if (isPinkModeActive()) {
        startPinkModeAnimatedIconRotation();
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
        var target = targets[_index6];
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
      for (var _index6 = 0; _index6 < targets.length; _index6 += 1) {
        _loop();
      }
    }
    function startPinkModeIconRotation() {
      var HORSE_SVG_MARKUP = '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="m1 40c0-8 3-17 3-17a4.84 4.84 0 0 0-1.829-3.064 1 1 0 0 1 .45-1.716 19.438 19.438 0 0 1 4.379-.22c.579-2.317-1.19-3.963-2.782-4.938a1 1 0 0 1 .393-1.85 14.128 14.128 0 0 1 6.389.788c0-.958-1.147-2.145-2.342-3.122a1 1 0 0 1 .708-1.773 40.655 40.655 0 0 1 6.634.895 3.723 3.723 0 0 0-1.049-2.264 1 1 0 0 1 .823-1.652c6.151.378 9.226 1.916 9.226 1.916l10-1s8.472-2.311 15.954.5a1 1 0 0 1-.084 1.9c-1.455.394-2.87 1.143-2.87 2.6 0 0 4.426.738 5.675 4.114a1 1 0 0 1-1.228 1.317c-1.64-.48-4.273-.88-6.447.569Z" fill="#805333" /><path d="m30.18 42.82c1.073 2.7 2.6 9.993 3.357 13.8a2 2 0 0 1-1.964 2.38h-28.573a2 2 0 0 1-2-2v-18c0-2.55 10.03-22.11 23.99-23.87Z" fill="#a56a43" /><path d="m55.67 48.46-6.34 2.97a6 6 0 0 1-7.98-2.88l-.25-.54-.76-1.6a4.956 4.956 0 0 0-4.68-2.87c-.22.01-.44.02-.66.02a16.019 16.019 0 0 1-8.28-29.66c-1.81-2.97-3.45-8.03 2.03-12.49a2.1 2.1 0 0 1 2.5 0c4.23 3.45 4.21 7.25 3.16 10.17a16 16 0 0 1 15.91 11.36l5.31 11.31 2.92 6.22a6.008 6.008 0 0 1-2.88 7.99Z" fill="#cb8252" /><circle cx="42" cy="26" r="3" fill="#2c2f38" /><circle cx="54" cy="43" r="1" fill="#805333" /><path d="m58.55 40.47-2.92-6.22-14.53 13.76.25.54a6 6 0 0 0 7.98 2.88l6.34-2.97a6.008 6.008 0 0 0 2.88-7.99Zm-4.55 3.53a1 1 0 1 1 1-1 1 1 0 0 1-1 1Z" fill="#cf976a" /><circle cx="41" cy="25" r="1.25" fill="#ecf0f1" /></svg>';
      var HORN_PATH = '<path d="m40 18 12-14-4 15.5z" filter="drop-shadow(0 0 2px #fff)" fill="#ffd700" />';
      var UNICORN_BASE_MARKUP = HORSE_SVG_MARKUP.replace('</svg>', HORN_PATH + '</svg>');
      var UNICORN_1_MARKUP = UNICORN_BASE_MARKUP.replace(/#805333/g, '#d63384').replace(/#a56a43/g, '#e83e8c').replace(/#cb8252/g, '#fd7e14').replace(/#cf976a/g, '#ffc0cb');
      var UNICORN_2_MARKUP = UNICORN_BASE_MARKUP.replace(/#805333/g, '#6f42c1').replace(/#a56a43/g, '#d63384').replace(/#cb8252/g, '#e83e8c').replace(/#cf976a/g, '#e0cffc');
      var UNICORN_3_MARKUP = UNICORN_BASE_MARKUP.replace(/#805333/g, '#0dcaf0').replace(/#a56a43/g, '#6f42c1').replace(/#cb8252/g, '#d63384').replace(/#cf976a/g, '#9ec5fe');
      var FALLBACK_SEQUENCE = [{
        className: 'icon-svg pink-mode-icon',
        markup: UNICORN_1_MARKUP,
        lottiePath: 'src/animations/unicorn.json'
      }, {
        className: 'icon-svg pink-mode-icon',
        markup: UNICORN_2_MARKUP,
        lottiePath: 'src/animations/horn.json'
      }, {
        className: 'icon-svg pink-mode-icon',
        markup: UNICORN_3_MARKUP,
        lottiePath: 'src/animations/rainbow.json'
      }];
      var sequence = FALLBACK_SEQUENCE;
      console.log('Pink Mode Rotation Start. Sequence Length:', sequence ? sequence.length : 'undefined');
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
          try {
            pinkModeIconRotationTimer.unref();
          } catch (unrefError) {
            void unrefError;
          }
        }
      } catch (error) {
        if (pinkModeIconRotationTimer) {
          clearInterval(pinkModeIconRotationTimer);
        }
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
        pinkModeIconPressResetTimer = setTimeout(function () {
          pinkModeIconPressResetTimer = null;
          pinkModeIconPressCount = 0;
          pinkModeIconPressTimestamps.length = 0;
        }, PINK_MODE_ICON_PRESS_RESET_MS);
        if (pinkModeIconPressResetTimer && typeof pinkModeIconPressResetTimer.unref === 'function') {
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
      var now = Date.now();
      pinkModeIconPressTimestamps.push(now);
      var burstWindow = Math.max(PINK_MODE_ICON_PRESS_BURST_WINDOW_MS, 0);
      if (burstWindow > 0) {
        var cutoff = now - burstWindow;
        while (pinkModeIconPressTimestamps.length && pinkModeIconPressTimestamps[0] < cutoff) {
          pinkModeIconPressTimestamps.shift();
        }
      }
      return pinkModeIconPressTimestamps.length;
    }
    var LocalPinkModeManager = function () {
      function LocalPinkModeManager() {
        _classCallCheck(this, LocalPinkModeManager);
        this.active = false;
      }
      return _createClass(LocalPinkModeManager, [{
        key: "activate",
        value: function activate() {
          this.active = true;
          document.body.classList.add('pink-mode-active');
        }
      }, {
        key: "deactivate",
        value: function deactivate() {
          this.active = false;
          document.body.classList.remove('pink-mode-active');
        }
      }, {
        key: "triggerRain",
        value: function triggerRain() { }
      }]);
    }();
    var localPinkModeManager = new LocalPinkModeManager();
    function triggerPinkModeIconRain() { }
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
        storage.setItem(PINK_MODE_STORAGE_KEY, pinkModeEnabled);
      } catch (error) {
        safeWarn('cineSettingsAppearance: Could not save pink mode preference.', error);
      }
      try {
        storage.setItem(LEGACY_PINK_MODE_STORAGE_KEY, pinkModeEnabled);
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
    function rememberSettingsFocusScaleBaseline() {
      var current = getFocusScale();
      settingsInitialFocusScale = typeof current === 'string' ? current : 'metric';
    }
    function revertSettingsFocusScaleIfNeeded() {
      var baseline = typeof settingsInitialFocusScale === 'string' ? settingsInitialFocusScale : 'metric';
      var applyPreference = preferences.applyFocusScalePreference;
      if (typeof applyPreference === 'function') {
        if (getFocusScale() !== baseline) {
          try {
            applyPreference(baseline, {
              persist: false,
              forceUpdate: true
            });
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
        var _storage = getLocalStorage(context);
        if (_storage) {
          try {
            _storage.setItem('showAutoBackups', normalized);
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
      var warnHelper = mountVoltages.warnMissingHelper || function () { };
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
      rememberSettingsFocusScaleBaseline: rememberSettingsFocusScaleBaseline,
      revertSettingsFocusScaleIfNeeded: revertSettingsFocusScaleIfNeeded,
      applyShowAutoBackupsPreference: applyShowAutoBackupsPreference,
      rememberSettingsShowAutoBackupsBaseline: rememberSettingsShowAutoBackupsBaseline,
      revertSettingsShowAutoBackupsIfNeeded: revertSettingsShowAutoBackupsIfNeeded,
      rememberSettingsMountVoltagesBaseline: rememberSettingsMountVoltagesBaseline,
      revertSettingsMountVoltagesIfNeeded: revertSettingsMountVoltagesIfNeeded,
      handlePinkModeIconPress: handlePinkModeIconPress,
      triggerPinkModeIconAnimation: triggerPinkModeIconAnimation,
      triggerPinkModeIconRain: triggerPinkModeIconRain,
      startPinkModeIconRotation: startPinkModeIconRotation,
      stopPinkModeIconRotation: stopPinkModeIconRotation,
      applyPinkModeIcon: applyPinkModeIcon,
      startPinkModeAnimatedIcons: startPinkModeAnimatedIcons,
      stopPinkModeAnimatedIcons: stopPinkModeAnimatedIcons,
      startPinkModeAnimatedIconRotation: startPinkModeAnimatedIconRotation,
      stopPinkModeAnimatedIconRotation: stopPinkModeAnimatedIconRotation,
      isPinkModeActive: isPinkModeActive,
      createThemePreferenceController: createThemePreferenceController,
      createPinkModePreferenceController: createPinkModePreferenceController,
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