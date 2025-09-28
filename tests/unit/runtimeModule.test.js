const path = require('path');

describe('cineRuntime module', () => {
  let runtime;
  let persistenceStub;
  let offlineStub;
  let uiStub;
  let registry;

  function buildPersistenceStub() {
    const noop = () => {};
    const storage = {
      loadDeviceData: noop,
      saveDeviceData: noop,
      loadSetups: noop,
      saveSetups: noop,
      saveSetup: noop,
      loadSetup: noop,
      deleteSetup: noop,
      renameSetup: noop,
      loadSessionState: noop,
      saveSessionState: noop,
      saveProject: noop,
      loadProject: noop,
      deleteProject: noop,
      exportAllData: noop,
      importAllData: noop,
      loadFavorites: noop,
      saveFavorites: noop,
      loadAutoGearRules: noop,
      saveAutoGearRules: noop,
      loadAutoGearBackups: noop,
      saveAutoGearBackups: noop,
      loadAutoGearBackupRetention: noop,
      saveAutoGearBackupRetention: noop,
      loadAutoGearPresets: noop,
      saveAutoGearPresets: noop,
      loadAutoGearActivePresetId: noop,
      saveAutoGearActivePresetId: noop,
      loadAutoGearAutoPresetId: noop,
      saveAutoGearAutoPresetId: noop,
      loadAutoGearMonitorDefaults: noop,
      saveAutoGearMonitorDefaults: noop,
      loadAutoGearBackupVisibility: noop,
      saveAutoGearBackupVisibility: noop,
      loadFullBackupHistory: noop,
      saveFullBackupHistory: noop,
      recordFullBackupHistoryEntry: noop,
    };

    const autosave = {
      saveSession: noop,
      autoSaveSetup: noop,
      saveGearList: noop,
      restoreSessionState: noop,
    };

    const backups = {
      collectFullBackupData: noop,
      createSettingsBackup: noop,
      captureStorageSnapshot: noop,
      sanitizeBackupPayload: noop,
      autoBackup: noop,
      formatFullBackupFilename: noop,
      downloadPayload: noop,
      recordFullBackupHistoryEntry: noop,
    };

    const restore = {
      proceed: noop,
      abort: noop,
    };

    const share = {
      downloadProject: noop,
      encodeSharedSetup: noop,
      decodeSharedSetup: noop,
      applySharedSetup: noop,
      applySharedSetupFromUrl: noop,
    };

    return Object.freeze({
      storage: Object.freeze(storage),
      autosave: Object.freeze(autosave),
      backups: Object.freeze(backups),
      restore: Object.freeze(restore),
      share: Object.freeze(share),
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
    const mutated = { ...persistenceStub.storage };
    delete mutated.saveProject;
    global.cinePersistence = Object.freeze({
      ...persistenceStub,
      storage: Object.freeze(mutated),
    });
    registry.register('cinePersistence', global.cinePersistence, { replace: true, category: 'persistence', description: 'mutated' });

    const result = runtime.verifyCriticalFlows();
    expect(result.ok).toBe(false);
    expect(result.missing).toContain('cinePersistence.storage.saveProject');

    expect(() => runtime.verifyCriticalFlows({ throwOnFailure: true })).toThrow(
      /cineRuntime integrity verification failed/
    );
  });
});
