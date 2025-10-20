const fs = require('fs');
const path = require('path');
const vm = require('vm');

const BACKUP_MODULE_PATH = path.resolve(__dirname, '../../src/scripts/modules/features/backup.js');
const BACKUP_MODULE_SOURCE = fs.readFileSync(BACKUP_MODULE_PATH, 'utf8');
const BACKUP_MODULE_SOURCE_WITH_TEST_STUBS = BACKUP_MODULE_SOURCE.replace(/\}\)\(\);\s*$/u, (
  match,
) => `  GLOBAL_SCOPE.__setBackupTestStubs = function (overrides) {\n` +
    `    if (!overrides || typeof overrides !== 'object') {\n` +
    `      return;\n` +
    `    }\n` +
    `    if (Object.prototype.hasOwnProperty.call(overrides, 'monitorAutomaticDownloadPermission')) {\n` +
    `      monitorAutomaticDownloadPermission = overrides.monitorAutomaticDownloadPermission;\n` +
    `    }\n` +
    `    if (Object.prototype.hasOwnProperty.call(overrides, 'triggerBackupDownload')) {\n` +
    `      triggerBackupDownload = overrides.triggerBackupDownload;\n` +
    `    }\n` +
    `    if (Object.prototype.hasOwnProperty.call(overrides, 'openBackupFallbackWindow')) {\n` +
    `      openBackupFallbackWindow = overrides.openBackupFallbackWindow;\n` +
    `    }\n` +
    `  };\n` +
    `  GLOBAL_SCOPE.__getFallbackStorageKeys = function () {\n` +
    `    return FALLBACK_STORAGE_KEYS;\n` +
    `  };\n` +
    match,
);

function createDeepFreeze() {
  const freeze = (value, seen = new WeakSet()) => {
    if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
      return value;
    }
    if (seen.has(value)) {
      return value;
    }
    seen.add(value);

    try {
      Object.getOwnPropertyNames(value).forEach((key) => {
        const descriptor = Object.getOwnPropertyDescriptor(value, key);
        if (!descriptor || descriptor.get || descriptor.set) {
          return;
        }
        freeze(descriptor.value, seen);
      });
      Object.freeze(value);
    } catch (error) {
      void error;
    }

    return value;
  };

  return freeze;
}

function evaluateBackupModule(options = {}) {
  const exposures = new Map();
  const registerCalls = [];
  const context = vm.createContext({
    console,
    Date,
    Math,
    JSON,
    Array,
    Object,
    Map,
    Set,
    WeakMap,
    WeakSet,
    Promise,
  });

  const baseStub = {
    freezeDeep: createDeepFreeze(),
    exposeGlobal(name, value) {
      exposures.set(name, value);
      context[name] = value;
      return true;
    },
    getModuleRegistry() {
      return null;
    },
    registerOrQueueModule(name, api, metadata) {
      registerCalls.push({ name, api, metadata });
      return api;
    },
  };

  context.cineModuleBase = baseStub;
  context.require = (moduleName) => {
    if (moduleName === '../base.js') {
      return baseStub;
    }
    throw new Error(`Unexpected module request: ${moduleName}`);
  };
  context.globalThis = context;
  context.global = context;
  context.window = context;
  context.self = context;

  if (options.overrides) {
    Object.entries(options.overrides).forEach(([key, value]) => {
      context[key] = value;
    });
  }

  vm.runInNewContext(BACKUP_MODULE_SOURCE_WITH_TEST_STUBS, context, { filename: BACKUP_MODULE_PATH });

  return {
    backupModule: exposures.get('cineFeatureBackup'),
    registerCalls,
    context,
    exposures,
  };
}

describe('cineFeatureBackup module', () => {
  test('registers module metadata and exposes a frozen API', () => {
    const { backupModule, registerCalls } = evaluateBackupModule();

    expect(registerCalls).toHaveLength(1);
    expect(registerCalls[0]).toMatchObject({
      name: 'cineFeatureBackup',
      metadata: expect.objectContaining({
        category: 'feature',
        description: expect.stringMatching(/Backup and restore helpers/i),
      }),
    });

    expect(typeof backupModule).toBe('object');
    expect(Object.isFrozen(backupModule)).toBe(true);
    expect(Object.isFrozen(backupModule.constants)).toBe(true);
    expect(Object.isFrozen(backupModule.constants.BACKUP_STORAGE_KEY_PREFIXES)).toBe(true);
    expect(Object.isFrozen(backupModule.constants.BACKUP_STORAGE_KNOWN_KEYS)).toBe(true);
  });

  test('parses automatic backup names for primary and deletion snapshots', () => {
    const { backupModule } = evaluateBackupModule();

    const primaryLegacy = backupModule.parseAutoBackupName('auto-backup-2024-07-11-08-05-Favorite-Project');
    expect(primaryLegacy).toMatchObject({
      type: 'auto-backup',
      includeSeconds: false,
      label: 'Favorite-Project',
    });
    expect(primaryLegacy.date instanceof Date).toBe(true);
    expect(primaryLegacy.date.getFullYear()).toBe(2024);
    expect(primaryLegacy.date.getMonth()).toBe(6);
    expect(primaryLegacy.date.getDate()).toBe(11);
    expect(primaryLegacy.date.getHours()).toBe(8);
    expect(primaryLegacy.date.getMinutes()).toBe(5);

    const primaryPrecise = backupModule.parseAutoBackupName('auto-backup-2024-07-11-08-05-30-Favorite-Project');
    expect(primaryPrecise).toMatchObject({
      type: 'auto-backup',
      includeSeconds: true,
      label: 'Favorite-Project',
    });
    expect(primaryPrecise.date instanceof Date).toBe(true);
    expect(primaryPrecise.date.getSeconds()).toBe(30);

    const deletion = backupModule.parseAutoBackupName('auto-backup-before-delete-2024-07-11-08-05-59-Urgent-Restore');
    expect(deletion).toMatchObject({
      type: 'auto-backup-before-delete',
      includeSeconds: true,
      label: 'Urgent-Restore',
    });
    expect(deletion.date instanceof Date).toBe(true);
    expect(deletion.date.getSeconds()).toBe(59);
  });

  test('rejects malformed backup identifiers', () => {
    const { backupModule } = evaluateBackupModule();

    expect(backupModule.isAutoBackupName('auto-backup-2024-07-11-08-05-Project')).toBe(true);
    expect(backupModule.isAutoBackupName('auto-backup-before-delete-2024-07-11-08-05-59-Project')).toBe(true);

    const malformed = 'auto-backup-2024-07-11';
    expect(backupModule.isAutoBackupName(malformed)).toBe(true);
    expect(backupModule.parseAutoBackupName(malformed)).toBeNull();
    expect(backupModule.isAutoBackupName('not-a-backup')).toBe(false);
    expect(backupModule.parseAutoBackupName('not-a-backup')).toBeNull();
    expect(backupModule.isAutoBackupName(null)).toBe(false);
    expect(backupModule.parseAutoBackupName(null)).toBeNull();
  });

  test('respects configured iOS PWA help storage keys when building known key set', () => {
    const { backupModule } = evaluateBackupModule({
      overrides: { IOS_PWA_HELP_STORAGE_KEY: 'iosPwaHelpDisplayed' },
    });

    expect(backupModule.constants.BACKUP_STORAGE_KNOWN_KEYS).toContain('iosPwaHelpDisplayed');
    expect(backupModule.constants.BACKUP_STORAGE_KNOWN_KEYS).not.toContain('iosPwaHelpShown');
  });

  test('captures documentation tracker data via fallback storage keys when enumeration is blocked', () => {
    const { backupModule, context } = evaluateBackupModule();

    expect(typeof context.__getFallbackStorageKeys).toBe('function');
    const fallbackKeys = context.__getFallbackStorageKeys();
    expect(fallbackKeys instanceof Set).toBe(true);
    expect(fallbackKeys.has('cameraPowerPlanner_documentationTracker')).toBe(true);
    expect(fallbackKeys.has('cinePowerPlanner_documentationTracker')).toBe(true);
    expect(backupModule.constants.BACKUP_DATA_KEYS).toContain('documentationTracker');
    expect(backupModule.constants.BACKUP_DATA_COMPLEX_KEYS).toContain('documentationTracker');

    const storedValue = JSON.stringify({
      releases: [{ id: 'tracker-1', name: 'Release 1' }],
    });

    const storage = {
      getItem: jest.fn((key) => {
        if (key === 'cameraPowerPlanner_documentationTracker') {
          return storedValue;
        }
        return null;
      }),
      key: jest.fn(() => {
        throw new Error('Enumeration blocked');
      }),
      keys: undefined,
      forEach: undefined,
    };

    Object.defineProperty(storage, 'length', {
      get() {
        return 1;
      },
    });

    const snapshot = backupModule.captureStorageSnapshot(storage);

    expect(storage.key).toHaveBeenCalled();
    expect(storage.getItem).toHaveBeenCalledWith('cameraPowerPlanner_documentationTracker');
    expect(storage.getItem).toHaveBeenCalledWith('cinePowerPlanner_documentationTracker');
    expect(snapshot.cameraPowerPlanner_documentationTracker).toBe(storedValue);
  });

  test('falls back to manual window when blob and data URLs fail', () => {
    const blobUrl = 'blob:manual-test';
    const setTimeoutMock = jest.fn((callback) => {
      if (typeof callback === 'function') {
        callback();
      }
      return 0;
    });
    const createObjectURLMock = jest.fn(() => blobUrl);
    const revokeObjectURLMock = jest.fn();

    const { backupModule, context } = evaluateBackupModule({
      overrides: {
        setTimeout: setTimeoutMock,
        Blob: class TestBlob {
          constructor(parts, options) {
            this.parts = parts;
            this.options = options;
          }
        },
        URL: {
          createObjectURL: createObjectURLMock,
          revokeObjectURL: revokeObjectURLMock,
        },
        navigator: {},
        window: {},
        document: {},
      },
    });

    expect(typeof context.__setBackupTestStubs).toBe('function');

    const permissionMonitor = { state: 'stubbed' };
    const monitorStub = jest.fn(() => permissionMonitor);
    const triggerStub = jest.fn(() => false);
    const fallbackStub = jest.fn(() => true);

    context.__setBackupTestStubs({
      monitorAutomaticDownloadPermission: monitorStub,
      triggerBackupDownload: triggerStub,
      openBackupFallbackWindow: fallbackStub,
    });

    const payload = '{"data":true}';
    const fileName = 'cine-backup.json';
    const result = backupModule.downloadBackupPayload(payload, fileName);

    expect(monitorStub).toHaveBeenCalledTimes(1);
    expect(triggerStub).toHaveBeenCalledTimes(2);
    expect(triggerStub).toHaveBeenNthCalledWith(1, blobUrl, fileName);
    expect(triggerStub.mock.calls[1][0]).toMatch(/^data:application\/json/);
    expect(fallbackStub).toHaveBeenCalledTimes(1);
    expect(fallbackStub).toHaveBeenCalledWith(payload, fileName);
    expect(revokeObjectURLMock).toHaveBeenCalledWith(blobUrl);
    expect(result).toEqual({ success: true, method: 'manual', permission: permissionMonitor });
  });

  test('returns failure when manual fallback window cannot be created', () => {
    const blobUrl = 'blob:manual-test';
    const setTimeoutMock = jest.fn((callback) => {
      if (typeof callback === 'function') {
        callback();
      }
      return 0;
    });
    const createObjectURLMock = jest.fn(() => blobUrl);
    const revokeObjectURLMock = jest.fn();

    const { backupModule, context } = evaluateBackupModule({
      overrides: {
        setTimeout: setTimeoutMock,
        Blob: class TestBlob {
          constructor(parts, options) {
            this.parts = parts;
            this.options = options;
          }
        },
        URL: {
          createObjectURL: createObjectURLMock,
          revokeObjectURL: revokeObjectURLMock,
        },
        navigator: {},
        window: {},
        document: {},
      },
    });

    expect(typeof context.__setBackupTestStubs).toBe('function');

    const permissionMonitor = { state: 'stubbed' };
    const monitorStub = jest.fn(() => permissionMonitor);
    const triggerStub = jest.fn(() => false);
    const fallbackStub = jest.fn(() => false);

    context.__setBackupTestStubs({
      monitorAutomaticDownloadPermission: monitorStub,
      triggerBackupDownload: triggerStub,
      openBackupFallbackWindow: fallbackStub,
    });

    const payload = '{"data":true}';
    const fileName = 'cine-backup.json';
    const result = backupModule.downloadBackupPayload(payload, fileName);

    expect(monitorStub).toHaveBeenCalledTimes(1);
    expect(triggerStub).toHaveBeenCalledTimes(2);
    expect(fallbackStub).toHaveBeenCalledTimes(1);
    expect(revokeObjectURLMock).toHaveBeenCalledWith(blobUrl);
    expect(result).toEqual({ success: false, method: null, permission: permissionMonitor });
  });
});
