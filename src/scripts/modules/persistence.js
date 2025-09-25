(function () {
  const GLOBAL_SCOPE =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof window !== 'undefined'
        ? window
        : typeof global !== 'undefined'
          ? global
          : typeof self !== 'undefined'
            ? self
            : {};

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

  const providerModules = [];

  providerModules.push(GLOBAL_SCOPE);

  const storageModule = tryRequire('../storage.js');
  if (storageModule && typeof storageModule === 'object') {
    providerModules.push(storageModule);
  }

  const sessionModule = tryRequire('../app-session.js');
  if (sessionModule && typeof sessionModule === 'object') {
    providerModules.push(sessionModule);
  }

  const setupsModule = tryRequire('../app-setups.js');
  if (setupsModule && typeof setupsModule === 'object') {
    providerModules.push(setupsModule);
  }
  function resolveFunction(name) {
    for (let index = 0; index < providerModules.length; index += 1) {
      const provider = providerModules[index];
      if (!provider || typeof provider !== 'object') {
        continue;
      }

      const candidate = provider[name];
      if (typeof candidate === 'function') {
        return candidate;
      }
    }

    throw new Error(`cinePersistence could not resolve function "${name}".`);
  }

  function createWrapper(name) {
    return function persistenceWrapper() {
      const fn = resolveFunction(name);
      return fn.apply(this, arguments);
    };
  }

  function freezeDeep(value, seen = new WeakSet()) {
    if (!value || typeof value !== 'object') {
      return value;
    }

    if (seen.has(value)) {
      return value;
    }
    seen.add(value);

    const propertyNames = Object.getOwnPropertyNames(value);
    for (let index = 0; index < propertyNames.length; index += 1) {
      const key = propertyNames[index];
      const descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (!descriptor || ('get' in descriptor) || ('set' in descriptor)) {
        continue;
      }
      freezeDeep(descriptor.value, seen);
    }

    return Object.freeze(value);
  }

  const persistenceAPI = {
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
      recordFullBackupHistoryEntry: createWrapper('recordFullBackupHistoryEntry'),
    },
    autosave: {
      saveSession: createWrapper('saveCurrentSession'),
      autoSaveSetup: createWrapper('autoSaveCurrentSetup'),
      saveGearList: createWrapper('saveCurrentGearList'),
      restoreSessionState: createWrapper('restoreSessionState'),
    },
    backups: {
      collectFullBackupData: createWrapper('collectFullBackupData'),
      createSettingsBackup: createWrapper('createSettingsBackup'),
      captureStorageSnapshot: createWrapper('captureStorageSnapshot'),
      sanitizeBackupPayload: createWrapper('sanitizeBackupPayload'),
      autoBackup: createWrapper('autoBackup'),
      formatFullBackupFilename: createWrapper('formatFullBackupFilename'),
      downloadPayload: createWrapper('downloadBackupPayload'),
      recordFullBackupHistoryEntry: createWrapper('recordFullBackupHistoryEntry'),
    },
    restore: {
      proceed: createWrapper('handleRestoreRehearsalProceed'),
      abort: createWrapper('handleRestoreRehearsalAbort'),
    },
    share: {
      downloadProject: createWrapper('downloadSharedProject'),
      encodeSharedSetup: createWrapper('encodeSharedSetup'),
      decodeSharedSetup: createWrapper('decodeSharedSetup'),
      applySharedSetup: createWrapper('applySharedSetup'),
      applySharedSetupFromUrl: createWrapper('applySharedSetupFromUrl'),
    },
  };

  freezeDeep(persistenceAPI);

  if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE === 'object') {
    try {
      if (GLOBAL_SCOPE.cinePersistence !== persistenceAPI) {
        Object.defineProperty(GLOBAL_SCOPE, 'cinePersistence', {
          configurable: true,
          enumerable: false,
          value: persistenceAPI,
          writable: false,
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
