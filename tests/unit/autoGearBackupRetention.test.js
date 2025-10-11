const STORAGE_GLOBAL_KEYS = [
  'AUTO_GEAR_BACKUP_RETENTION_DEFAULT',
  'AUTO_GEAR_BACKUP_RETENTION_MIN',
];

const STORAGE_KEY = 'cameraPowerPlanner_autoGearBackupRetention';
const DEFAULT_RETENTION = 36;

const originalGlobals = {};

function restoreGlobals() {
  STORAGE_GLOBAL_KEYS.forEach((key) => {
    const original = originalGlobals[key];
    if (!original) return;
    if (original.hasValue) {
      global[key] = original.value;
    } else {
      delete global[key];
    }
  });
}

beforeAll(() => {
  STORAGE_GLOBAL_KEYS.forEach((key) => {
    originalGlobals[key] = {
      hasValue: Object.prototype.hasOwnProperty.call(global, key),
      value: global[key],
    };
  });

  if (typeof window === 'undefined') {
    global.window = {};
  }

  if (!('localStorage' in global.window)) {
    Object.defineProperty(global.window, 'localStorage', {
      configurable: true,
      value: global.localStorage,
    });
  }

  if (!('sessionStorage' in global.window)) {
    Object.defineProperty(global.window, 'sessionStorage', {
      configurable: true,
      value: global.sessionStorage,
    });
  }
});

beforeEach(() => {
  jest.resetModules();
  restoreGlobals();

  if (typeof localStorage !== 'undefined' && localStorage) {
    localStorage.clear();
  }
  if (typeof sessionStorage !== 'undefined' && sessionStorage) {
    sessionStorage.clear();
  }
});

afterEach(() => {
  restoreGlobals();

  if (typeof localStorage !== 'undefined' && localStorage) {
    localStorage.clear();
  }
  if (typeof sessionStorage !== 'undefined' && sessionStorage) {
    sessionStorage.clear();
  }
});

afterAll(() => {
  restoreGlobals();
});

describe('automatic gear backup retention defaults', () => {
  test('initializes default values when globals are missing', () => {
    delete global.AUTO_GEAR_BACKUP_RETENTION_DEFAULT;
    delete global.AUTO_GEAR_BACKUP_RETENTION_MIN;

    const storage = require('../../src/scripts/storage');

    expect(global.AUTO_GEAR_BACKUP_RETENTION_DEFAULT).toBe(DEFAULT_RETENTION);
    expect(global.AUTO_GEAR_BACKUP_RETENTION_MIN).toBe(1);
    expect(storage.getAutoGearBackupRetentionDefault()).toBe(DEFAULT_RETENTION);
  });

  test('uses numeric override without mutating the provided value', () => {
    global.AUTO_GEAR_BACKUP_RETENTION_DEFAULT = 18;

    const storage = require('../../src/scripts/storage');

    expect(storage.getAutoGearBackupRetentionDefault()).toBe(18);
    expect(global.AUTO_GEAR_BACKUP_RETENTION_DEFAULT).toBe(18);
  });

  test.each([
    { provided: 0, expected: DEFAULT_RETENTION },
    { provided: -5, expected: DEFAULT_RETENTION },
    { provided: 1.2, expected: 1 },
    { provided: 7.6, expected: 8 },
    { provided: 50, expected: 50 },
    { provided: 80, expected: 80 },
    { provided: 150, expected: 120 },
    { provided: Infinity, expected: DEFAULT_RETENTION },
    { provided: Number.NaN, expected: DEFAULT_RETENTION },
  ])('clamps provided default $provided to $expected', ({ provided, expected }) => {
    global.AUTO_GEAR_BACKUP_RETENTION_DEFAULT = provided;

    const storage = require('../../src/scripts/storage');

    expect(storage.getAutoGearBackupRetentionDefault()).toBe(expected);
  });
});

describe('automatic gear backup retention normalization', () => {
  let storage;

  beforeEach(() => {
    storage = require('../../src/scripts/storage');
  });

  afterEach(() => {
    jest.resetModules();
  });

  test.each([
    { input: 4, expected: 4 },
    { input: 3.7, expected: 4 },
    { input: ' 15 ', expected: 15 },
    { input: '10.2', expected: 10 },
    { input: [' 60 ', 'ignored'], expected: 60 },
    { input: [' 160 ', 'ignored'], expected: 120 },
    { input: { retention: '9' }, expected: 9 },
    { input: { limit: '75' }, expected: 75 },
    { input: { limit: '175' }, expected: 120 },
    { input: '', expected: DEFAULT_RETENTION },
    { input: '   ', expected: DEFAULT_RETENTION },
    { input: [], expected: DEFAULT_RETENTION },
    { input: {}, expected: DEFAULT_RETENTION },
  ])('saveAutoGearBackupRetention normalizes $input', ({ input, expected }) => {
    storage.saveAutoGearBackupRetention(input);

    const storedRaw = localStorage.getItem(STORAGE_KEY);
    expect(storedRaw).not.toBeNull();

    const stored = JSON.parse(storedRaw);
    const fallback = storage.getAutoGearBackupRetentionDefault();
    const normalizedExpectation = expected === DEFAULT_RETENTION ? fallback : expected;
    expect(stored).toBe(normalizedExpectation);
    expect(storage.loadAutoGearBackupRetention()).toBe(normalizedExpectation);
  });

  test.each([
    { stored: '5', expected: 5 },
    { stored: '0', expected: 1 },
    { stored: '""', expected: DEFAULT_RETENTION },
    { stored: '["18"]', expected: 18 },
    { stored: '{"value": "27"}', expected: 27 },
    { stored: '{"count": "72"}', expected: 72 },
    { stored: '{"count": "172"}', expected: 120 },
    { stored: 'true', expected: DEFAULT_RETENTION },
  ])('loadAutoGearBackupRetention handles stored payload $stored', ({ stored, expected }) => {
    storage.getSafeLocalStorage().setItem(STORAGE_KEY, stored);

    const fallback = storage.getAutoGearBackupRetentionDefault();
    const normalizedExpectation = expected === DEFAULT_RETENTION ? fallback : expected;
    expect(storage.loadAutoGearBackupRetention()).toBe(normalizedExpectation);
  });
});
