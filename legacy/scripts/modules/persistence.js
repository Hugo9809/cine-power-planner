function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  var GLOBAL_SCOPE = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
  function tryRequire(modulePath) {
    if (typeof require !== 'function') {
      return null;
    }
    try {
      return require(modulePath);
    } catch (error) {
      void error;
      return null;
    }
  }
  var providerModules = [];
  providerModules.push(GLOBAL_SCOPE);
  var storageModule = tryRequire('../storage.js');
  if (storageModule && _typeof(storageModule) === 'object') {
    providerModules.push(storageModule);
  }
  var sessionModule = tryRequire('../app-session.js');
  if (sessionModule && _typeof(sessionModule) === 'object') {
    providerModules.push(sessionModule);
  }
  var setupsModule = tryRequire('../app-setups.js');
  if (setupsModule && _typeof(setupsModule) === 'object') {
    providerModules.push(setupsModule);
  }
  function resolveFunction(name) {
    for (var index = 0; index < providerModules.length; index += 1) {
      var provider = providerModules[index];
      if (!provider || _typeof(provider) !== 'object') {
        continue;
      }
      var candidate = provider[name];
      if (typeof candidate === 'function') {
        return candidate;
      }
    }
    throw new Error("cinePersistence could not resolve function \"".concat(name, "\"."));
  }
  function createWrapper(name) {
    return function persistenceWrapper() {
      var fn = resolveFunction(name);
      return fn.apply(this, arguments);
    };
  }
  function freezeDeep(value) {
    var seen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new WeakSet();
    if (!value || _typeof(value) !== 'object') {
      return value;
    }
    if (seen.has(value)) {
      return value;
    }
    seen.add(value);
    var propertyNames = Object.getOwnPropertyNames(value);
    for (var index = 0; index < propertyNames.length; index += 1) {
      var key = propertyNames[index];
      var descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (!descriptor || 'get' in descriptor || 'set' in descriptor) {
        continue;
      }
      freezeDeep(descriptor.value, seen);
    }
    return Object.freeze(value);
  }
  var persistenceAPI = {
    storage: {
      loadDeviceData: createWrapper('loadDeviceData'),
      saveDeviceData: createWrapper('saveDeviceData'),
      loadSetups: createWrapper('loadSetups'),
      saveSetups: createWrapper('saveSetups'),
      saveSetup: createWrapper('saveSetup'),
      loadSetup: createWrapper('loadSetup'),
      deleteSetup: createWrapper('deleteSetup'),
      renameSetup: createWrapper('renameSetup'),
      loadSessionState: createWrapper('loadSessionState'),
      saveSessionState: createWrapper('saveSessionState'),
      loadFeedback: createWrapper('loadFeedback'),
      saveFeedback: createWrapper('saveFeedback'),
      saveProject: createWrapper('saveProject'),
      loadProject: createWrapper('loadProject'),
      deleteProject: createWrapper('deleteProject'),
      loadFavorites: createWrapper('loadFavorites'),
      saveFavorites: createWrapper('saveFavorites'),
      exportAllData: createWrapper('exportAllData'),
      importAllData: createWrapper('importAllData'),
      clearAllData: createWrapper('clearAllData'),
      loadAutoGearRules: createWrapper('loadAutoGearRules'),
      saveAutoGearRules: createWrapper('saveAutoGearRules'),
      loadAutoGearBackups: createWrapper('loadAutoGearBackups'),
      saveAutoGearBackups: createWrapper('saveAutoGearBackups'),
      loadAutoGearBackupRetention: createWrapper('loadAutoGearBackupRetention'),
      saveAutoGearBackupRetention: createWrapper('saveAutoGearBackupRetention'),
      loadAutoGearPresets: createWrapper('loadAutoGearPresets'),
      saveAutoGearPresets: createWrapper('saveAutoGearPresets'),
      loadAutoGearActivePresetId: createWrapper('loadAutoGearActivePresetId'),
      saveAutoGearActivePresetId: createWrapper('saveAutoGearActivePresetId'),
      loadAutoGearAutoPresetId: createWrapper('loadAutoGearAutoPresetId'),
      saveAutoGearAutoPresetId: createWrapper('saveAutoGearAutoPresetId'),
      loadAutoGearMonitorDefaults: createWrapper('loadAutoGearMonitorDefaults'),
      saveAutoGearMonitorDefaults: createWrapper('saveAutoGearMonitorDefaults'),
      loadAutoGearBackupVisibility: createWrapper('loadAutoGearBackupVisibility'),
      saveAutoGearBackupVisibility: createWrapper('saveAutoGearBackupVisibility'),
      loadFullBackupHistory: createWrapper('loadFullBackupHistory'),
      saveFullBackupHistory: createWrapper('saveFullBackupHistory'),
      recordFullBackupHistoryEntry: createWrapper('recordFullBackupHistoryEntry')
    },
    autosave: {
      saveSession: createWrapper('saveCurrentSession'),
      autoSaveSetup: createWrapper('autoSaveCurrentSetup'),
      saveGearList: createWrapper('saveCurrentGearList'),
      restoreSessionState: createWrapper('restoreSessionState')
    },
    backups: {
      collectFullBackupData: createWrapper('collectFullBackupData'),
      createSettingsBackup: createWrapper('createSettingsBackup'),
      captureStorageSnapshot: createWrapper('captureStorageSnapshot'),
      sanitizeBackupPayload: createWrapper('sanitizeBackupPayload'),
      autoBackup: createWrapper('autoBackup'),
      formatFullBackupFilename: createWrapper('formatFullBackupFilename'),
      downloadPayload: createWrapper('downloadBackupPayload'),
      recordFullBackupHistoryEntry: createWrapper('recordFullBackupHistoryEntry')
    },
    restore: {
      proceed: createWrapper('handleRestoreRehearsalProceed'),
      abort: createWrapper('handleRestoreRehearsalAbort')
    },
    share: {
      downloadProject: createWrapper('downloadSharedProject'),
      encodeSharedSetup: createWrapper('encodeSharedSetup'),
      decodeSharedSetup: createWrapper('decodeSharedSetup'),
      applySharedSetup: createWrapper('applySharedSetup'),
      applySharedSetupFromUrl: createWrapper('applySharedSetupFromUrl')
    }
  };
  freezeDeep(persistenceAPI);
  if (GLOBAL_SCOPE && _typeof(GLOBAL_SCOPE) === 'object') {
    try {
      if (GLOBAL_SCOPE.cinePersistence !== persistenceAPI) {
        Object.defineProperty(GLOBAL_SCOPE, 'cinePersistence', {
          configurable: true,
          enumerable: false,
          value: persistenceAPI,
          writable: false
        });
      }
    } catch (error) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unable to expose cinePersistence globally.', error);
      }
    }
  }
  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = persistenceAPI;
  }
})();