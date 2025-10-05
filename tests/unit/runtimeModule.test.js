const path = require('path');

const STORAGE_FUNCTIONS = [
  'loadDeviceData',
  'saveDeviceData',
  'loadSetups',
  'saveSetups',
  'saveSetup',
  'loadSetup',
  'deleteSetup',
  'renameSetup',
  'loadSessionState',
  'saveSessionState',
  'saveProject',
  'loadProject',
  'deleteProject',
  'exportAllData',
  'importAllData',
  'clearAllData',
  'loadFavorites',
  'saveFavorites',
  'loadFeedback',
  'saveFeedback',
  'loadAutoGearRules',
  'saveAutoGearRules',
  'loadAutoGearBackups',
  'saveAutoGearBackups',
  'loadAutoGearSeedFlag',
  'saveAutoGearSeedFlag',
  'loadAutoGearBackupRetention',
  'saveAutoGearBackupRetention',
  'getAutoGearBackupRetentionDefault',
  'loadAutoGearPresets',
  'saveAutoGearPresets',
  'loadAutoGearActivePresetId',
  'saveAutoGearActivePresetId',
  'loadAutoGearAutoPresetId',
  'saveAutoGearAutoPresetId',
  'loadAutoGearMonitorDefaults',
  'saveAutoGearMonitorDefaults',
  'loadAutoGearBackupVisibility',
  'saveAutoGearBackupVisibility',
  'loadFullBackupHistory',
  'saveFullBackupHistory',
  'recordFullBackupHistoryEntry',
  'requestPersistentStorage',
  'clearUiCacheStorageEntries',
  'ensureCriticalStorageBackups',
  'getLastCriticalStorageGuardResult',
];

const AUTOSAVE_FUNCTIONS = [
  'saveCurrentSession',
  'autoSaveCurrentSetup',
  'saveCurrentGearList',
  'restoreSessionState',
];

const BACKUP_FUNCTIONS = [
  'collectFullBackupData',
  'createSettingsBackup',
  'captureStorageSnapshot',
  'sanitizeBackupPayload',
  'autoBackup',
  'formatFullBackupFilename',
  'downloadBackupPayload',
  'recordFullBackupHistoryEntry',
];

const RESTORE_FUNCTIONS = [
  'handleRestoreRehearsalProceed',
  'handleRestoreRehearsalAbort',
];

const SHARE_FUNCTIONS = [
  'downloadSharedProject',
  'encodeSharedSetup',
  'decodeSharedSetup',
  'applySharedSetup',
  'applySharedSetupFromUrl',
];

function mapAutosaveName(name) {
  switch (name) {
    case 'saveCurrentSession':
      return 'saveSession';
    case 'autoSaveCurrentSetup':
      return 'autoSaveSetup';
    case 'saveCurrentGearList':
      return 'saveGearList';
    case 'restoreSessionState':
      return 'restoreSessionState';
    default:
      return name;
  }
}

function mapBackupName(name) {
  switch (name) {
    case 'collectFullBackupData':
      return 'collectFullBackupData';
    case 'createSettingsBackup':
      return 'createSettingsBackup';
    case 'captureStorageSnapshot':
      return 'captureStorageSnapshot';
    case 'sanitizeBackupPayload':
      return 'sanitizeBackupPayload';
    case 'autoBackup':
      return 'autoBackup';
    case 'formatFullBackupFilename':
      return 'formatFullBackupFilename';
    case 'downloadBackupPayload':
      return 'downloadPayload';
    case 'recordFullBackupHistoryEntry':
      return 'recordFullBackupHistoryEntry';
    default:
      return name;
  }
}

function mapShareName(name) {
  switch (name) {
    case 'downloadSharedProject':
      return 'downloadProject';
    default:
      return name;
  }
}

describe('cineRuntime module', () => {
  let runtime;
  let persistenceStub;
  let offlineStub;
  let uiStub;
  let registry;

  function buildPersistenceStub(options = {}) {
    const missingWrappers = new Set((options.missingWrappers || []).map(String));
    const missingBindings = new Set((options.missingBindings || []).map(String));

    const isWrapperMissing = (actual, alias) => (
      missingWrappers.has(actual)
      || (alias && missingWrappers.has(alias))
    );

    const isBindingMissing = (actual, alias) => (
      missingBindings.has(actual)
      || (alias && missingBindings.has(alias))
    );

    const noop = () => {};
    const storage = {
      loadFeedback: noop,
      saveFeedback: noop,
    };

    const autosave = {
    };

    const backups = {
    };

    const restore = {
    };

    const share = {
    };

    const bindingNames = new Set();
    const bindingAvailability = {};

    STORAGE_FUNCTIONS.forEach((name) => {
      const bindingKey = name;
      bindingNames.add(bindingKey);
      bindingAvailability[bindingKey] = !isBindingMissing(name, bindingKey);
      if (!isWrapperMissing(name, bindingKey)) {
        storage[name] = noop;
      } else {
        delete storage[name];
      }
    });

    AUTOSAVE_FUNCTIONS.forEach((name) => {
      const exportName = mapAutosaveName(name);
      bindingNames.add(exportName);
      bindingAvailability[exportName] = !isBindingMissing(name, exportName);
      if (!isWrapperMissing(name, exportName)) {
        autosave[exportName] = noop;
      } else {
        delete autosave[exportName];
      }
    });

    BACKUP_FUNCTIONS.forEach((name) => {
      const exportName = mapBackupName(name);
      bindingNames.add(exportName);
      bindingAvailability[exportName] = !isBindingMissing(name, exportName);
      if (!isWrapperMissing(name, exportName)) {
        backups[exportName] = noop;
      } else {
        delete backups[exportName];
      }
    });

    RESTORE_FUNCTIONS.forEach((name) => {
      const exportName = name === 'handleRestoreRehearsalProceed'
        ? 'proceed'
        : name === 'handleRestoreRehearsalAbort'
          ? 'abort'
          : name;
      bindingNames.add(exportName);
      bindingAvailability[exportName] = !isBindingMissing(name, exportName);
    });

    if (!isWrapperMissing('handleRestoreRehearsalProceed', 'proceed')) {
      restore.proceed = noop;
    }
    if (!isWrapperMissing('handleRestoreRehearsalAbort', 'abort')) {
      restore.abort = noop;
    }

    SHARE_FUNCTIONS.forEach((name) => {
      const exportName = mapShareName(name);
      bindingNames.add(exportName);
      bindingAvailability[exportName] = !isBindingMissing(name, exportName);
      if (!isWrapperMissing(name, exportName)) {
        share[exportName] = noop;
      } else {
        delete share[exportName];
      }
    });

    const internal = Object.freeze({
      listBindings() {
        return Array.from(bindingNames);
      },
      inspectBinding(name) {
        const key = String(name);
        const available = Object.prototype.hasOwnProperty.call(bindingAvailability, key)
          ? !!bindingAvailability[key]
          : false;
        return { name: key, available };
      },
      inspectAllBindings() {
        const snapshot = {};
        bindingNames.forEach((key) => {
          snapshot[key] = { name: key, available: !!bindingAvailability[key] };
        });
        return snapshot;
      },
    });

    return Object.freeze({
      storage: Object.freeze(storage),
      autosave: Object.freeze(autosave),
      backups: Object.freeze(backups),
      restore: Object.freeze(restore),
      share: Object.freeze(share),
      __internal: internal,
    });
  }

  function buildOfflineStub() {
    return Object.freeze({
      registerServiceWorker: () => Promise.resolve(),
      reloadApp: () => Promise.resolve({}),
    });
  }

  function buildUiStub() {
    const controllers = new Map();
    const interactions = new Map();
    const helpEntries = new Map();

    const controllerApi = {
      register(name, descriptor) {
        controllers.set(name, Object.freeze({ ...descriptor }));
      },
      get(name) {
        return controllers.get(name) || null;
      },
    };

    controllerApi.register('deviceManagerSection', {
      show: () => {},
      hide: () => {},
      toggle: () => {},
    });
    controllerApi.register('shareDialog', {
      open: () => {},
      submit: () => {},
      cancel: () => {},
      dismiss: () => {},
    });
    controllerApi.register('sharedImportDialog', {
      submit: () => {},
      cancel: () => {},
      dismiss: () => {},
      changeMode: () => {},
    });
    controllerApi.register('backupSettings', {
      execute: () => {},
    });
    controllerApi.register('restoreSettings', {
      openPicker: () => {},
      processFile: () => {},
    });

    const interactionApi = {
      register(name, handler) {
        interactions.set(name, handler);
      },
      get(name) {
        return interactions.get(name) || null;
      },
    };

    [
      'saveSetup',
      'deleteSetup',
      'shareOpen',
      'shareSubmit',
      'shareCancel',
      'shareApplyFile',
      'shareInputChange',
      'sharedImportSubmit',
      'sharedImportCancel',
      'performBackup',
      'openRestorePicker',
      'applyRestoreFile',
    ].forEach(name => interactionApi.register(name, () => {}));

    const helpApi = {
      register(name, resolver) {
        helpEntries.set(name, resolver);
      },
      resolve(name) {
        const entry = helpEntries.get(name);
        return entry ? entry() : null;
      },
    };

    helpApi.register('saveSetup', () => 'Save projects.');
    helpApi.register('autoBackupBeforeDeletion', () => 'Backups run before deletion.');
    helpApi.register('shareProject', () => 'Share the current planner state.');
    helpApi.register('sharedImport', () => 'Import a shared planner file.');
    helpApi.register('backupSettings', () => 'Create a full backup.');
    helpApi.register('restoreSettings', () => 'Restore from a full backup.');

    return Object.freeze({
      controllers: Object.freeze({
        register: controllerApi.register,
        get: controllerApi.get,
      }),
      interactions: Object.freeze({
        register: interactionApi.register,
        get: interactionApi.get,
      }),
      help: Object.freeze({
        register: helpApi.register,
        resolve: helpApi.resolve,
      }),
    });
  }

  beforeEach(() => {
    jest.resetModules();
    registry = require(path.join('..', '..', 'src', 'scripts', 'modules', 'registry.js'));
    registry.__internalResetForTests({ force: true });

    persistenceStub = buildPersistenceStub();
    offlineStub = buildOfflineStub();
    uiStub = buildUiStub();

    registry.register('cinePersistence', persistenceStub, { category: 'persistence', description: 'test' });
    registry.register('cineOffline', offlineStub, { category: 'offline', description: 'test' });
    registry.register('cineUi', uiStub, { category: 'ui', description: 'test' });

    global.cinePersistence = persistenceStub;
    global.cineOffline = offlineStub;
    global.cineUi = uiStub;

    runtime = require(path.join('..', '..', 'src', 'scripts', 'modules', 'runtime.js'));
  });

  afterEach(() => {
    delete global.cinePersistence;
    delete global.cineOffline;
    delete global.cineUi;
    delete global.cineRuntime;
    if (registry && typeof registry.__internalResetForTests === 'function') {
      registry.__internalResetForTests({ force: true });
    }
    registry = null;
  });

  test('exposes frozen runtime API and module getters', () => {
    expect(Object.isFrozen(runtime)).toBe(true);
    expect(runtime.getPersistence()).toBe(persistenceStub);
    expect(runtime.getOffline()).toBe(offlineStub);
    expect(runtime.getUi()).toBe(uiStub);
    expect(runtime.getModuleRegistry()).toBeTruthy();
  });

  test('lists critical checks across persistence, offline and UI layers', () => {
    const checks = runtime.listCriticalChecks();
    expect(Object.isFrozen(checks)).toBe(true);
    expect(checks.cinePersistence).toEqual(expect.arrayContaining(['storage.saveProject', 'share.applySharedSetupFromUrl']));
    expect(checks.cinePersistence).toEqual(expect.arrayContaining(['storage.loadFeedback', 'storage.saveFeedback']));
    expect(checks.cineOffline).toEqual(expect.arrayContaining(['registerServiceWorker', 'reloadApp']));
    expect(checks.cineUi.controllers).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: 'backupSettings' }),
    ]));
  });

  test('verifies critical flows when safeguards are present', () => {
    const result = runtime.verifyCriticalFlows();
    expect(result.ok).toBe(true);
    expect(result.missing).toEqual([]);
    expect(result.modules).toEqual({
      cinePersistence: true,
      cineOffline: true,
      cineUi: true,
      registry: {
        cinePersistence: true,
        cineOffline: true,
        cineUi: true,
      },
    });
  });

  test('reports missing safeguards and can throw when requested', () => {
    const mutated = buildPersistenceStub({
      missingWrappers: ['saveProject'],
      missingBindings: ['saveProject'],
    });
    global.cinePersistence = mutated;
    registry.register('cinePersistence', mutated, { replace: true, category: 'persistence', description: 'mutated' });

    const result = runtime.verifyCriticalFlows();
    expect(result.ok).toBe(false);
    expect(result.missing).toContain('cinePersistence.storage.saveProject');
    expect(result.missing).toContain('cinePersistence.bindings.saveProject');

    expect(() => runtime.verifyCriticalFlows({ throwOnFailure: true })).toThrow(
      /cineRuntime integrity verification failed/
    );
  });

  test('detects missing persistence bindings even when wrappers are present', () => {
    const mutated = buildPersistenceStub({ missingBindings: ['saveProject'] });
    global.cinePersistence = mutated;
    registry.register('cinePersistence', mutated, { replace: true, category: 'persistence', description: 'bindings-mutated' });

    const result = runtime.verifyCriticalFlows();
    expect(result.ok).toBe(false);
    expect(result.missing).toContain('cinePersistence.bindings.saveProject');
    expect(result.missing).not.toContain('cinePersistence.storage.saveProject');
  });

  test('flags missing feedback persistence wrappers and bindings', () => {
    const mutated = buildPersistenceStub({
      missingWrappers: ['loadFeedback', 'saveFeedback'],
      missingBindings: ['loadFeedback', 'saveFeedback'],
    });
    global.cinePersistence = mutated;
    registry.register('cinePersistence', mutated, { replace: true, category: 'persistence', description: 'feedback-mutated' });

    const result = runtime.verifyCriticalFlows();
    expect(result.ok).toBe(false);
    expect(result.missing).toEqual(expect.arrayContaining([
      'cinePersistence.storage.loadFeedback',
      'cinePersistence.storage.saveFeedback',
      'cinePersistence.bindings.loadFeedback',
      'cinePersistence.bindings.saveFeedback',
    ]));
  });
});
