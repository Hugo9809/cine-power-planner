const CONTACTS_KEY = 'cameraPowerPlanner_contacts';
const OWN_GEAR_KEY = 'cameraPowerPlanner_ownGear';
const PROJECT_KEY = 'cameraPowerPlanner_project';
const BACKUP_SUFFIX = '__backup';

const createQuotaError = () => {
  const error = new Error('QuotaExceededError');
  error.name = 'QuotaExceededError';
  error.code = 22;
  error.number = 22;
  return error;
};

const createMockStorage = ({ quotaOnProjectBackup = false, projectBackupFailures = 1 } = {}) => {
  const data = new Map();
  const setItemCalls = [];
  let projectBackupAttempts = 0;

  const storage = {
    get length() {
      return data.size;
    },
    key(index) {
      const keys = Array.from(data.keys());
      return index >= 0 && index < keys.length ? keys[index] : null;
    },
    getItem(key) {
      return data.has(key) ? data.get(key) : null;
    },
    setItem(key, value) {
      setItemCalls.push({ key, value: String(value) });
      if (quotaOnProjectBackup && key === `${PROJECT_KEY}${BACKUP_SUFFIX}`) {
        projectBackupAttempts += 1;
        if (projectBackupAttempts <= projectBackupFailures) {
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
  };

  return { storage, data, setItemCalls };
};

const bootstrapStorageModule = (storage) => {
  jest.resetModules();
  global.localStorage = storage;
  global.sessionStorage = storage;
  global.window = { localStorage: storage, sessionStorage: storage };
  global.LZString = require('lz-string/libs/lz-string');
  return require('../../src/scripts/storage');
};

const containsCompressionFlag = (value) =>
  typeof value === 'string' && value.includes('"__cineStorageCompressed":true');

describe('contacts and own gear storage bypass compression', () => {
  afterEach(() => {
    delete global.window;
    delete global.localStorage;
    delete global.sessionStorage;
    delete global.LZString;
  });

  test('saveOwnGear stores plain JSON snapshots', () => {
    const { storage, data } = createMockStorage();
    const api = bootstrapStorageModule(storage);

    const items = Array.from({ length: 6 }).map((_, index) => ({
      id: `gear-${index}`,
      name: `Lens ${index}`,
      notes: 'x'.repeat(256),
    }));

    api.saveOwnGear(items);

    const primary = data.get(OWN_GEAR_KEY);
    const backup = data.get(`${OWN_GEAR_KEY}${BACKUP_SUFFIX}`);

    expect(primary).toBeDefined();
    expect(() => JSON.parse(primary)).not.toThrow();
    expect(containsCompressionFlag(primary)).toBe(false);
    expect(backup).toBeDefined();
    expect(containsCompressionFlag(backup)).toBe(false);
  });

  test('compression sweep skips contacts and own gear entries', () => {
    const { storage, data, setItemCalls } = createMockStorage({ quotaOnProjectBackup: true });

    data.set(PROJECT_KEY, JSON.stringify({ Active: { gearList: 'x'.repeat(2048) } }));
    data.set(CONTACTS_KEY, JSON.stringify([{ id: 'contact-1', name: 'DP' }]));
    data.set(OWN_GEAR_KEY, JSON.stringify([{ id: 'gear-1', name: 'Meter', notes: 'x'.repeat(256) }]));
    data.set('otherKey', JSON.stringify({ payload: 'x'.repeat(8192) }));

    const api = bootstrapStorageModule(storage);

    api.ensureCriticalStorageBackups({ storage });

    const touchedKeys = setItemCalls.map(entry => entry.key);
    expect(touchedKeys).toContain(`${PROJECT_KEY}${BACKUP_SUFFIX}`);

    expect(containsCompressionFlag(data.get(CONTACTS_KEY))).toBe(false);
    expect(containsCompressionFlag(data.get(`${CONTACTS_KEY}${BACKUP_SUFFIX}`))).toBe(false);
    expect(containsCompressionFlag(data.get(OWN_GEAR_KEY))).toBe(false);
    expect(containsCompressionFlag(data.get(`${OWN_GEAR_KEY}${BACKUP_SUFFIX}`))).toBe(false);
    expect(containsCompressionFlag(data.get(`${PROJECT_KEY}${BACKUP_SUFFIX}`))).toBe(true);
  });
});
