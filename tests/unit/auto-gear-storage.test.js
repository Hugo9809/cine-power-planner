const path = require('path');

describe('auto gear storage helpers', () => {
  let storage;
  let autoGearService;
  let storageRepo;
  let userContext;

  beforeEach(async () => {
    jest.resetModules();
    global.AUTO_GEAR_BACKUP_RETENTION_MIN_VALUE = 1;
    global.AUTO_GEAR_BACKUP_RETENTION_MAX = 50;
    global.AUTO_GEAR_BACKUP_RETENTION_DEFAULT = 10;
    global.AUTO_GEAR_SELECTOR_TYPE_SET = new Set(['monitor']);
    global.AUTO_GEAR_SELECTOR_TYPE_MAP = { monitor: 'monitor' };
    global.AUTO_GEAR_TRIPOD_SELECTOR_TYPES = new Set();
    global.AUTO_GEAR_TRIPOD_FIELD_IDS = {};
    global.AUTO_GEAR_BACKUPS_KEY = 'cameraPowerPlanner_autoGearBackups';
    global.AUTO_GEAR_HAND_UNIT_COMPATIBILITY_GROUPS = Object.create(null);
    global.AUTO_GEAR_HAND_UNIT_MOTOR_TO_GROUP = Object.create(null);
    global.localeSort = (a, b) => a.localeCompare(b);
    global.normalizeAutoGearCameraWeightCondition = () => null;
    global.DEVICE_GLOBAL_SCOPE = { devices: {} };
    global.devices = {};
    global.getLanguageTexts = () => ({
      autoGearSelectorMonitorOption: 'Monitor selector',
      autoGearSelectorNoneOption: 'No selector',
    });
    global.currentLang = 'en';
    global.document = { getElementById: () => null };
    // Ensure normalizers are loaded so shared helpers exist.
    require(path.join(__dirname, '../../src/scripts/auto-gear/normalizers.js'));
    ({ autoGearService } = await import('../../src/scripts/modules/persistence/AutoGearService.js'));
    ({ storageRepo } = await import('../../src/scripts/modules/storage/StorageRepository.js'));
    ({ userContext } = await import('../../src/scripts/modules/core/UserContext.js'));
    userContext.userId = 'test-user';
    userContext.deviceId = 'test-device';
    userContext.sessionId = 'test-session';
    storageRepo.initialized = true;
    storageRepo.getItem = jest.fn();
    storageRepo.setItem = jest.fn().mockResolvedValue();
    storageRepo.removeItem = jest.fn().mockResolvedValue();
    autoGearService.__internalResetCache();
    storage = require(path.join(__dirname, '../../src/scripts/auto-gear/storage.js'));
    localStorage.clear();
    delete global.loadAutoGearBackups;
    delete global.saveAutoGearBackups;
  });

  afterEach(() => {
    delete global.AUTO_GEAR_BACKUP_RETENTION_MIN_VALUE;
    delete global.AUTO_GEAR_BACKUP_RETENTION_MAX;
    delete global.AUTO_GEAR_BACKUP_RETENTION_DEFAULT;
    delete global.AUTO_GEAR_SELECTOR_TYPE_SET;
    delete global.AUTO_GEAR_SELECTOR_TYPE_MAP;
    delete global.AUTO_GEAR_TRIPOD_SELECTOR_TYPES;
    delete global.AUTO_GEAR_TRIPOD_FIELD_IDS;
    delete global.AUTO_GEAR_BACKUPS_KEY;
    delete global.AUTO_GEAR_HAND_UNIT_COMPATIBILITY_GROUPS;
    delete global.AUTO_GEAR_HAND_UNIT_MOTOR_TO_GROUP;
    delete global.localeSort;
    delete global.normalizeAutoGearCameraWeightCondition;
    delete global.DEVICE_GLOBAL_SCOPE;
    delete global.devices;
    delete global.getLanguageTexts;
    delete global.currentLang;
    delete global.document;
    if (autoGearService) {
      autoGearService.__internalResetCache();
    }
    if (storageRepo) {
      storageRepo.initialized = false;
      storageRepo.driver = null;
    }
    if (userContext) {
      userContext.userId = null;
      userContext.deviceId = null;
      userContext.sessionId = null;
    }
  });

  test('clampAutoGearBackupRetentionLimit enforces configured bounds', () => {
    expect(storage.clampAutoGearBackupRetentionLimit(-5)).toBeGreaterThan(0);
    expect(storage.clampAutoGearBackupRetentionLimit(1)).toBeGreaterThan(0);
    expect(storage.clampAutoGearBackupRetentionLimit(5000)).toBeLessThanOrEqual(50);
  });

  test('readAutoGearBackupsFromStorage trims and normalizes entries', async () => {
    const now = new Date().toISOString();
    const payload = [
      { id: 'b', createdAt: now, rules: [{ label: 'B' }], monitorDefaults: { focus: 'B' } },
      { id: 'a', createdAt: '2021-01-01T00:00:00Z', rules: [{ label: 'A' }], monitorDefaults: {} },
    ];
    storageRepo.getItem.mockImplementation(async (key) => {
      if (key === 'cameraPowerPlanner_autoGearBackups') {
        return payload;
      }
      return undefined;
    });

    await autoGearService.hydrateCache({ force: true });

    const result = storage.readAutoGearBackupsFromStorage(1);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('b');
    expect(storageRepo.getItem).toHaveBeenCalledWith('cameraPowerPlanner_autoGearBackups');
  });

  test('persistAutoGearBackups writes sanitized payloads', async () => {
    const input = [{
      id: 'test',
      createdAt: '2022-02-02T00:00:00Z',
      rules: [{ label: 'C' }],
      monitorDefaults: { focus: 'X' },
      note: 123,
    }];

    const stored = storage.persistAutoGearBackups(input);
    await new Promise(resolve => setImmediate(resolve));
    expect(storageRepo.setItem).toHaveBeenCalledWith(
      'cameraPowerPlanner_autoGearBackups',
      expect.any(Array),
    );
    const storedPayload = storageRepo.setItem.mock.calls[0][1];
    expect(storedPayload[0].note).toBe(undefined);
    expect(stored[0].monitorDefaults.focus).toBe('X');
  });
});
