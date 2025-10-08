const PROJECT_KEY = 'cameraPowerPlanner_project';
const SETUP_KEY = 'cameraPowerPlanner_setups';
const BACKUP_SUFFIX = '__backup';

const createQuotaError = () => {
  const error = new Error('QuotaExceededError');
  error.name = 'QuotaExceededError';
  error.code = 22;
  error.number = 22;
  return error;
};

const createMockStorage = () => {
  const data = new Map([
    [PROJECT_KEY, JSON.stringify({ Active: { gearList: '<ul></ul>' } })],
    [SETUP_KEY, JSON.stringify({ Active: { gearList: '<ul></ul>' } })],
    ['otherKey', JSON.stringify({ payload: 'x'.repeat(4096) })],
  ]);
  const getItemCalls = [];
  let recordGetItem = false;
  let backupWriteAttempts = 0;

  const storage = {
    get length() {
      return data.size;
    },
    key(index) {
      const keys = Array.from(data.keys());
      return index >= 0 && index < keys.length ? keys[index] : null;
    },
    getItem(key) {
      if (recordGetItem) {
        getItemCalls.push(key);
      }
      return data.has(key) ? data.get(key) : null;
    },
    setItem(key, value) {
      if (key === `${PROJECT_KEY}${BACKUP_SUFFIX}`) {
        backupWriteAttempts += 1;
        if (backupWriteAttempts === 1) {
          throw createQuotaError();
        }
      }
      data.set(key, String(value));
    },
    removeItem(key) {
      data.delete(key);
    },
    clear() {
      data.clear();
    },
    startRecording() {
      recordGetItem = true;
    },
    stopRecording() {
      recordGetItem = false;
    },
  };

  return { storage, getItemCalls };
};

const bootstrapStorageModule = (storage) => {
  jest.resetModules();
  global.localStorage = storage;
  global.sessionStorage = storage;
  global.window = { localStorage: storage, sessionStorage: storage };
  global.LZString = require('lz-string/libs/lz-string');
  return require('../../src/scripts/storage');
};

const countOccurrences = (list, key) => list.filter(entry => entry === key).length;

describe('storage compression sweep skips active setups', () => {
  test('compression sweep skips setup store when a hold is active', () => {
    const { storage, getItemCalls } = createMockStorage();
    const api = bootstrapStorageModule(storage);

    api.setActiveProjectCompressionHold('Active');
    storage.startRecording();
    api.ensureCriticalStorageBackups({ storage });
    storage.stopRecording();

    expect(countOccurrences(getItemCalls, SETUP_KEY)).toBe(1);
    expect(countOccurrences(getItemCalls, `${SETUP_KEY}${BACKUP_SUFFIX}`)).toBe(1);
  });

  test('compression sweep inspects setup store when no hold is active', () => {
    const { storage, getItemCalls } = createMockStorage();
    const api = bootstrapStorageModule(storage);

    api.clearActiveProjectCompressionHold();
    storage.startRecording();
    api.ensureCriticalStorageBackups({ storage });
    storage.stopRecording();

    expect(countOccurrences(getItemCalls, SETUP_KEY)).toBeGreaterThan(1);
  });
});
