const CONTACTS_KEY = 'cameraPowerPlanner_contacts';
const DEVICE_KEY = 'cameraPowerPlanner_devices';
const OWN_GEAR_KEY = 'cameraPowerPlanner_ownGear';
const USER_PROFILE_KEY = 'cameraPowerPlanner_userProfile';
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

describe('contacts, own gear, device library and user profile storage bypass compression', () => {
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

  test('saveDeviceData stores plain JSON snapshots', () => {
    const { storage, data } = createMockStorage();
    const api = bootstrapStorageModule(storage);

    const heavyDevice = {
      cameras: { 'Camera A': { draw: '50W', notes: 'x'.repeat(256) } },
      monitors: {},
      video: {},
      viewfinders: {},
      directorMonitors: {},
      iosVideo: {},
      videoAssist: {},
      media: {},
      lenses: {},
      batteries: {},
      batteryHotswaps: {},
      wirelessReceivers: {},
      accessories: { chargers: {}, cages: {}, powerPlates: {}, cameraSupport: {}, matteboxes: {}, filters: {}, rigging: {}, batteries: {}, cables: {}, videoAssist: {}, media: {}, tripodHeads: {}, tripods: {}, sliders: {}, cameraStabiliser: {}, grip: {}, carts: {} },
      fiz: { motors: {}, handUnits: {}, controllers: {}, distance: {} },
      filterOptions: [],
    };

    api.saveDeviceData(heavyDevice);

    const primary = data.get(DEVICE_KEY);
    const backup = data.get(`${DEVICE_KEY}${BACKUP_SUFFIX}`);

    expect(primary).toBeDefined();
    expect(() => JSON.parse(primary)).not.toThrow();
    expect(containsCompressionFlag(primary)).toBe(false);
    expect(backup).toBeDefined();
    expect(() => JSON.parse(backup)).not.toThrow();
    expect(containsCompressionFlag(backup)).toBe(false);
  });

  test('saveUserProfile stores plain JSON snapshots', () => {
    const { storage, data } = createMockStorage();
    const api = bootstrapStorageModule(storage);

    api.saveUserProfile({
      name: 'Casey Lighting',
      role: 'Gaffer',
      phone: '+1 555 0100',
      email: 'casey@example.test',
      avatar: 'data:image/png;base64,xyz',
    });

    const primary = data.get(USER_PROFILE_KEY);
    const backup = data.get(`${USER_PROFILE_KEY}${BACKUP_SUFFIX}`);

    expect(primary).toBeDefined();
    expect(() => JSON.parse(primary)).not.toThrow();
    expect(containsCompressionFlag(primary)).toBe(false);
    expect(backup).toBeDefined();
    expect(() => JSON.parse(backup)).not.toThrow();
    expect(containsCompressionFlag(backup)).toBe(false);
  });

  test('compression sweep skips contacts, own gear, device and user profile entries', () => {
    const { storage, data, setItemCalls } = createMockStorage({ quotaOnProjectBackup: true });

    data.set(PROJECT_KEY, JSON.stringify({ Active: { gearList: 'x'.repeat(2048) } }));
    data.set(CONTACTS_KEY, JSON.stringify([{ id: 'contact-1', name: 'DP' }]));
    data.set(OWN_GEAR_KEY, JSON.stringify([{ id: 'gear-1', name: 'Meter', notes: 'x'.repeat(256) }]));
    data.set(DEVICE_KEY, JSON.stringify({ cameras: { Aria: { draw: '45W' } } }));
    data.set('otherKey', JSON.stringify({ payload: 'x'.repeat(8192) }));
    data.set(USER_PROFILE_KEY, JSON.stringify({
      name: 'Alex DP',
      role: 'Director of Photography',
      email: 'alex@example.test',
    }));

    const backupKey = `${USER_PROFILE_KEY}${BACKUP_SUFFIX}`;
    data.set(backupKey, JSON.stringify({ name: 'Alex DP' }));
    data.set(`${DEVICE_KEY}${BACKUP_SUFFIX}`, JSON.stringify({ cameras: { Aria: { draw: '45W' } } }));

    const api = bootstrapStorageModule(storage);

    api.ensureCriticalStorageBackups({ storage });

    const touchedKeys = setItemCalls.map(entry => entry.key);
    expect(touchedKeys).toContain(`${PROJECT_KEY}${BACKUP_SUFFIX}`);

    expect(containsCompressionFlag(data.get(CONTACTS_KEY))).toBe(false);
    expect(containsCompressionFlag(data.get(`${CONTACTS_KEY}${BACKUP_SUFFIX}`))).toBe(false);
    expect(containsCompressionFlag(data.get(OWN_GEAR_KEY))).toBe(false);
    expect(containsCompressionFlag(data.get(`${OWN_GEAR_KEY}${BACKUP_SUFFIX}`))).toBe(false);
    expect(containsCompressionFlag(data.get(DEVICE_KEY))).toBe(false);
    expect(containsCompressionFlag(data.get(`${DEVICE_KEY}${BACKUP_SUFFIX}`))).toBe(false);
    expect(containsCompressionFlag(data.get(USER_PROFILE_KEY))).toBe(false);
    expect(containsCompressionFlag(data.get(backupKey))).toBe(false);
    expect(containsCompressionFlag(data.get(`${PROJECT_KEY}${BACKUP_SUFFIX}`))).toBe(true);
  });
});
