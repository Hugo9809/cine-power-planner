const path = require('path');

const { setupModuleHarness } = require('../helpers/moduleHarness');

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

const PENDING_QUEUE_KEY = '__cinePendingModuleRegistrations__';

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
  let harness;
  let runtimeRegistry;
  let originalProcessRelease;
  let originalFreeze;
  let originalIsFrozen;
  let recordedFrozen;

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

  function resolveRuntimeRegistry() {
    if (runtime && typeof runtime.getModuleRegistry === 'function') {
      try {
        const resolved = runtime.getModuleRegistry();
        if (resolved) {
          runtimeRegistry = resolved;
          return resolved;
        }
      } catch (error) {
        void error;
      }
    }

    if (runtimeRegistry) {
      return runtimeRegistry;
    }

    if (harness && harness.moduleGlobals && typeof harness.moduleGlobals.getModuleRegistry === 'function') {
      try {
        const resolved = harness.moduleGlobals.getModuleRegistry(global);
        if (resolved) {
          runtimeRegistry = resolved;
          return resolved;
        }
      } catch (error) {
        void error;
      }
    }

    return null;
  }

  function resetRegistry(target) {
    if (!target || typeof target.__internalResetForTests !== 'function') {
      return;
    }

    try {
      target.__internalResetForTests({ force: true });
    } catch (error) {
      void error;
    }
  }

  function resetAllRegistries() {
    const registries = new Set();

    if (registry) {
      registries.add(registry);
    }

    const externalRegistry = resolveRuntimeRegistry();
    if (externalRegistry) {
      registries.add(externalRegistry);
    }

    registries.forEach(resetRegistry);
  }

  function recordFrozenTarget(value) {
    if (!recordedFrozen) {
      return;
    }
    if (value && (typeof value === 'object' || typeof value === 'function')) {
      recordedFrozen.add(value);
    }
  }

  function registerModuleForTest(name, api, options) {
    const registries = [];

    if (registry && typeof registry.register === 'function') {
      registries.push(registry);
    }

    const externalRegistry = resolveRuntimeRegistry();
    if (
      externalRegistry
      && externalRegistry !== registry
      && typeof externalRegistry.register === 'function'
    ) {
      registries.push(externalRegistry);
    }

    if (registries.length === 0) {
      throw new Error('No module registry available for runtime tests.');
    }

    let descriptor = null;
    for (let index = 0; index < registries.length; index += 1) {
      const target = registries[index];
      const registered = target.register(name, api, options);
      if (!descriptor) {
        descriptor = registered;
      }
    }

    recordFrozenTarget(descriptor || api);
    return descriptor;
  }

  beforeEach(() => {
    harness = setupModuleHarness();
    registry = harness.registry;
    runtimeRegistry = null;
    resetAllRegistries();

    originalProcessRelease = process.release;
    process.release = { ...(originalProcessRelease || {}), name: 'browser' };

    recordedFrozen = new WeakSet();
    originalFreeze = Object.freeze;
    originalIsFrozen = Object.isFrozen;
    Object.freeze = (value) => {
      if (value && (typeof value === 'object' || typeof value === 'function')) {
        recordedFrozen.add(value);
      }
      if (typeof originalFreeze === 'function') {
        try {
          return originalFreeze(value);
        } catch (error) {
          void error;
        }
      }
      return value;
    };
    Object.isFrozen = (value) => {
      if (recordedFrozen && recordedFrozen.has(value)) {
        return true;
      }
      if (typeof originalIsFrozen === 'function') {
        try {
          return originalIsFrozen(value);
        } catch (error) {
          void error;
        }
      }
      return false;
    };

    persistenceStub = Object.freeze(buildPersistenceStub());
    offlineStub = Object.freeze(buildOfflineStub());
    uiStub = Object.freeze(buildUiStub());

    registerModuleForTest('cinePersistence', persistenceStub, { category: 'persistence', description: 'test' });
    registerModuleForTest('cineOffline', offlineStub, { category: 'offline', description: 'test' });
    registerModuleForTest('cineUi', uiStub, { category: 'ui', description: 'test' });

    global.cinePersistence = persistenceStub;
    global.cineOffline = offlineStub;
    global.cineUi = uiStub;

    runtime = require(path.join('..', '..', 'src', 'scripts', 'modules', 'runtime.js'));
    runtimeRegistry = runtime.getModuleRegistry() || runtimeRegistry;
  });

  afterEach(() => {
    process.release = originalProcessRelease;
    if (typeof originalFreeze === 'function') {
      Object.freeze = originalFreeze;
    }
    if (typeof originalIsFrozen === 'function') {
      Object.isFrozen = originalIsFrozen;
    }
    delete global.cinePersistence;
    delete global.cineOffline;
    delete global.cineUi;
    delete global.cineModules;
    delete global.cineRuntime;
    resetAllRegistries();
    registry = null;
    runtimeRegistry = null;
    if (harness) {
      harness.teardown();
      harness = null;
    }
    runtime = null;
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
    expect(checks.cinePersistence).toEqual(expect.arrayContaining([
      'storage.saveProject',
      'share.applySharedSetupFromUrl',
      'storage.clearAllData',
    ]));
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
    expect(result.details['cinePersistence.storage.clearAllData']).toBe(true);
  });

  test('inspectModuleConnections summarises registered module links', () => {
    registerModuleForTest('cineDiagnostics', { ready: true }, {
      category: 'test',
      description: 'Diagnostics helpers for runtime tests.',
      connections: ['cinePersistence'],
    });

    const report = runtime.inspectModuleConnections();
    const diagnostics = report.modules.find((entry) => entry.name === 'cineDiagnostics');

    expect(diagnostics).toEqual(expect.objectContaining({
      name: 'cineDiagnostics',
      connections: ['cinePersistence'],
      missing: [],
      ok: true,
    }));
    expect(Array.isArray(report.missingConnections)).toBe(true);
  });

  test('inspectModuleConnections flags missing module dependencies', () => {
    registerModuleForTest('cineBroken', { ready: false }, {
      category: 'test',
      description: 'Module with unresolved dependency.',
      connections: ['cineMissingDependency'],
    });

    const report = runtime.inspectModuleConnections();
    const broken = report.modules.find((entry) => entry.name === 'cineBroken');

    expect(broken).toEqual(expect.objectContaining({
      name: 'cineBroken',
      connections: ['cineMissingDependency'],
      missing: ['cineMissingDependency'],
      ok: false,
    }));
    expect(report.missingConnections).toEqual(expect.arrayContaining([
      { from: 'cineBroken', to: 'cineMissingDependency' },
    ]));
  });

  test('synchronizeModules flushes pending registrations and re-links registries', () => {
    const candidateScopes = harness.moduleGlobals.collectCandidateScopes(global) || [];
    candidateScopes.forEach((scope) => {
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        return;
      }
      try {
        delete scope.cineModules;
      } catch (error) {
        void error;
      }
    });

    const queuedApi = Object.freeze({ value: 'queued-module' });
    const queuedEntry = Object.freeze({
      name: 'cineQueuedModule',
      api: queuedApi,
      options: Object.freeze({
        category: 'runtime-test',
        description: 'Queued module to validate synchronization handling.',
      }),
    });

    global[PENDING_QUEUE_KEY] = [queuedEntry];

    const syncResult = runtime.synchronizeModules({ warn: false });

    expect(syncResult.ok).toBe(true);
    expect(syncResult.flushed.processed).toBeGreaterThanOrEqual(1);
    expect(Array.isArray(syncResult.exposures)).toBe(true);
    expect(syncResult.exposures.length).toBeGreaterThan(0);
    const activeRuntimeRegistry = runtimeRegistry || resolveRuntimeRegistry() || registry;
    expect(activeRuntimeRegistry && activeRuntimeRegistry.get('cineQueuedModule')).toBe(queuedApi);
    expect(Array.isArray(global[PENDING_QUEUE_KEY])).toBe(true);
    expect(global[PENDING_QUEUE_KEY].length).toBe(0);
    expect(global.cineModules).toBe(runtime.getModuleRegistry());

    delete global[PENDING_QUEUE_KEY];
  });

  test('dedupes queued runtime registrations when helpers already queued the module', () => {
    harness.teardown();
    runtime = null;
    registry = null;
    runtimeRegistry = null;

    harness = setupModuleHarness();
    registry = harness.registry;
    resetAllRegistries();

    persistenceStub = Object.freeze(buildPersistenceStub());
    offlineStub = Object.freeze(buildOfflineStub());
    uiStub = Object.freeze(buildUiStub());

    registerModuleForTest('cinePersistence', persistenceStub, { category: 'persistence', description: 'test' });
    registerModuleForTest('cineOffline', offlineStub, { category: 'offline', description: 'test' });
    registerModuleForTest('cineUi', uiStub, { category: 'ui', description: 'test' });

    global.cinePersistence = persistenceStub;
    global.cineOffline = offlineStub;
    global.cineUi = uiStub;

    const queue = [];
    global[PENDING_QUEUE_KEY] = queue;

    const runtimeSideRegistry = runtimeRegistry || resolveRuntimeRegistry();
    const registerTarget = runtimeSideRegistry || registry;
    const originalRegister = registerTarget.register;
    const registerSpy = jest.spyOn(registerTarget, 'register').mockImplementation((name, api, options) => {
      if (name === 'cineRuntime') {
        throw new Error('registry-offline');
      }
      return originalRegister.call(registerTarget, name, api, options);
    });

    harness.moduleGlobals.registerOrQueueModule.mockImplementation((name, api, options = {}) => {
      const payload = Object.freeze({
        name,
        api,
        options: Object.freeze({ ...options }),
      });
      queue.push(payload);
      return false;
    });

    try {
      runtime = require(path.join('..', '..', 'src', 'scripts', 'modules', 'runtime.js'));
      runtimeRegistry = runtime.getModuleRegistry() || runtimeRegistry;
      expect(Array.isArray(queue)).toBe(true);
      expect(queue).toHaveLength(1);
    } finally {
      registerSpy.mockRestore();
      delete global[PENDING_QUEUE_KEY];
    }
  });

  test('reports missing safeguards and can throw when requested', () => {
    const mutated = buildPersistenceStub({
      missingWrappers: ['saveProject'],
      missingBindings: ['saveProject'],
    });
    global.cinePersistence = mutated;
    registerModuleForTest('cinePersistence', mutated, { replace: true, category: 'persistence', description: 'mutated' });

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
    registerModuleForTest('cinePersistence', mutated, { replace: true, category: 'persistence', description: 'bindings-mutated' });

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
    registerModuleForTest('cinePersistence', mutated, { replace: true, category: 'persistence', description: 'feedback-mutated' });

    const result = runtime.verifyCriticalFlows();
    expect(result.ok).toBe(false);
    expect(result.missing).toEqual(expect.arrayContaining([
      'cinePersistence.storage.loadFeedback',
      'cinePersistence.storage.saveFeedback',
      'cinePersistence.bindings.loadFeedback',
      'cinePersistence.bindings.saveFeedback',
    ]));
  });

  test('flags missing clearAllData persistence safeguards', () => {
    const mutated = buildPersistenceStub({
      missingWrappers: ['clearAllData'],
      missingBindings: ['clearAllData'],
    });
    global.cinePersistence = mutated;
    registerModuleForTest('cinePersistence', mutated, { replace: true, category: 'persistence', description: 'clearAllData-mutated' });

    const result = runtime.verifyCriticalFlows();
    expect(result.ok).toBe(false);
    expect(result.missing).toEqual(expect.arrayContaining([
      'cinePersistence.storage.clearAllData',
      'cinePersistence.bindings.clearAllData',
    ]));
  });

  test('verifyCriticalFlows reports synchronization failures when queued modules cannot register', () => {
    const brokenEntry = Object.freeze({
      name: 'cineBrokenModule',
      api: null,
      options: Object.freeze({
        category: 'runtime-test',
        description: 'Broken entry that should fail during synchronization.',
      }),
    });

    global[PENDING_QUEUE_KEY] = [brokenEntry];

    const result = runtime.verifyCriticalFlows({ warnOnFailure: false });

    expect(result.ok).toBe(false);
    expect(result.missing).toContain('cineRuntime synchronization');
    expect(result.synchronization.ok).toBe(false);
    expect(result.synchronization.failures).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: 'cineBrokenModule', reason: 'register-failed' }),
    ]));
    expect(Array.isArray(global[PENDING_QUEUE_KEY])).toBe(true);
    expect(global[PENDING_QUEUE_KEY].length).toBeGreaterThan(0);

    delete global[PENDING_QUEUE_KEY];
  });
});
