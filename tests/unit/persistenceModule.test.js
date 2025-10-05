jest.mock('../../src/scripts/storage.js', () => ({}));
jest.mock('../../src/scripts/app-session.js', () => ({}));
jest.mock('../../src/scripts/app-setups.js', () => ({}));

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
  'loadFeedback',
  'saveFeedback',
  'saveProject',
  'loadProject',
  'deleteProject',
  'loadFavorites',
  'saveFavorites',
  'exportAllData',
  'importAllData',
  'clearAllData',
  'loadAutoGearRules',
  'saveAutoGearRules',
  'loadAutoGearBackups',
  'saveAutoGearBackups',
  'loadAutoGearBackupRetention',
  'saveAutoGearBackupRetention',
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

const UNIQUE_FUNCTIONS = Array.from(new Set([
  ...STORAGE_FUNCTIONS,
  ...AUTOSAVE_FUNCTIONS,
  ...BACKUP_FUNCTIONS,
  ...RESTORE_FUNCTIONS,
  ...SHARE_FUNCTIONS,
]));

describe('cinePersistence module', () => {
  let persistence;
  let stubs;
  let harness;

  beforeEach(() => {
    harness = setupModuleHarness();
    stubs = {};

    UNIQUE_FUNCTIONS.forEach((name) => {
      const stub = jest.fn((...args) => ({ name, args }));
      stubs[name] = stub;
      global[name] = stub;
    });

    persistence = require('../../src/scripts/modules/persistence.js');
  });

  afterEach(() => {
    UNIQUE_FUNCTIONS.forEach((name) => {
      delete global[name];
    });
    delete global.cinePersistence;
    if (harness) {
      harness.teardown();
      harness = null;
    }
  });

  function expectDelegation(wrapper, stub, name) {
    const sampleArgs = ['alpha', { beta: true }];
    stub.mockClear();
    const result = wrapper.apply({ context: true }, sampleArgs);
    expect(stub).toHaveBeenCalledTimes(1);
    expect(stub).toHaveBeenCalledWith(...sampleArgs);
    expect(result).toEqual({ name, args: sampleArgs });
    expect(result.args[1]).toBe(sampleArgs[1]);
  }

  test('exports a deeply frozen API and attaches it to the global scope', () => {
    expect(persistence).toBe(global.cinePersistence);
    expect(Object.isFrozen(persistence)).toBe(true);
    expect(Object.isFrozen(persistence.storage)).toBe(true);
    expect(Object.isFrozen(persistence.autosave)).toBe(true);
    expect(Object.isFrozen(persistence.backups)).toBe(true);
    expect(Object.isFrozen(persistence.restore)).toBe(true);
    expect(Object.isFrozen(persistence.share)).toBe(true);
  });

  test('delegates storage functions without mutating arguments', () => {
    STORAGE_FUNCTIONS.forEach((name) => {
      expectDelegation(persistence.storage[name], stubs[name], name);
    });
  });

  test('delegates autosave functions without mutating arguments', () => {
    AUTOSAVE_FUNCTIONS.forEach((name) => {
      expectDelegation(persistence.autosave[mapAutosaveName(name)], stubs[name], name);
    });
  });

  test('delegates backup functions without mutating arguments', () => {
    BACKUP_FUNCTIONS.forEach((name) => {
      expectDelegation(persistence.backups[mapBackupName(name)], stubs[name], name);
    });
  });

  test('delegates restore functions without mutating arguments', () => {
    expectDelegation(persistence.restore.proceed, stubs.handleRestoreRehearsalProceed, 'handleRestoreRehearsalProceed');
    expectDelegation(persistence.restore.abort, stubs.handleRestoreRehearsalAbort, 'handleRestoreRehearsalAbort');
  });

  test('delegates share functions without mutating arguments', () => {
    expectDelegation(persistence.share.downloadProject, stubs.downloadSharedProject, 'downloadSharedProject');
    expectDelegation(persistence.share.encodeSharedSetup, stubs.encodeSharedSetup, 'encodeSharedSetup');
    expectDelegation(persistence.share.decodeSharedSetup, stubs.decodeSharedSetup, 'decodeSharedSetup');
    expectDelegation(persistence.share.applySharedSetup, stubs.applySharedSetup, 'applySharedSetup');
    expectDelegation(persistence.share.applySharedSetupFromUrl, stubs.applySharedSetupFromUrl, 'applySharedSetupFromUrl');
  });

  test('exposes binding inspection metadata for each wrapper', () => {
    expect(persistence.__internal).toBeDefined();
    expect(typeof persistence.__internal.inspectBinding).toBe('function');
    expect(Array.isArray(persistence.__internal.listBindings())).toBe(true);

    const detail = persistence.__internal.inspectBinding('loadDeviceData');
    expect(detail).toMatchObject({ name: 'loadDeviceData', available: true });

    const snapshot = persistence.__internal.inspectAllBindings();
    expect(snapshot.loadDeviceData).toMatchObject({ name: 'loadDeviceData', available: true });
  });

  test('flags missing bindings and prevents invocation when implementation is removed', () => {
    delete global.loadDeviceData;

    const detail = persistence.__internal.inspectBinding('loadDeviceData', { refresh: true });
    expect(detail).toMatchObject({ name: 'loadDeviceData', available: false });

    expect(() => persistence.storage.loadDeviceData()).toThrow(/could not resolve function "loadDeviceData"/i);

    global.loadDeviceData = stubs.loadDeviceData;
  });
});

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
      throw new Error(`Unknown autosave function: ${name}`);
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
      throw new Error(`Unknown backup function: ${name}`);
  }
}
