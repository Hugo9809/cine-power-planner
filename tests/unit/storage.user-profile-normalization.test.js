const USER_PROFILE_KEY = 'cameraPowerPlanner_userProfile';

const createMockStorage = () => {
  const data = new Map();

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
      data.set(key, String(value));
    },
    removeItem(key) {
      data.delete(key);
    },
    clear() {
      data.clear();
    },
  };

  return { storage, data };
};

const bootstrapStorageModule = (storage) => {
  jest.resetModules();

  global.localStorage = storage;
  global.sessionStorage = storage;
  global.window = { localStorage: storage, sessionStorage: storage };
  global.LZString = require('lz-string/libs/lz-string');

  return require('../../src/scripts/storage');
};

describe('user profile normalization', () => {
  afterEach(() => {
    delete global.window;
    delete global.localStorage;
    delete global.sessionStorage;
    delete global.LZString;
  });

  test('loadUserProfile trims whitespace and preserves data URIs', () => {
    const { storage } = createMockStorage();
    storage.setItem(
      USER_PROFILE_KEY,
      JSON.stringify({
        name: '  Casey Lighting  ',
        role: '  Gaffer  ',
        phone: '  +1 555 0100  ',
        email: '  casey@example.test  ',
        avatar: '  DATA:image/png;base64,avatar-data  ',
      }),
    );

    const api = bootstrapStorageModule(storage);
    const profile = api.loadUserProfile();

    expect(profile).toEqual({
      name: 'Casey Lighting',
      role: 'Gaffer',
      phone: '+1 555 0100',
      email: 'casey@example.test',
      avatar: 'DATA:image/png;base64,avatar-data',
    });
  });

  test('saveUserProfile strips whitespace before persisting', () => {
    const { storage, data } = createMockStorage();
    const api = bootstrapStorageModule(storage);

    api.saveUserProfile({
      name: '  Casey Lighting  ',
      role: '  Gaffer  ',
      phone: '  +1 555 0100  ',
      email: '  casey@example.test  ',
      avatar: '  DATA:image/png;base64,avatar-data  ',
    });

    const raw = data.get(USER_PROFILE_KEY);
    expect(typeof raw).toBe('string');

    const stored = JSON.parse(raw);
    expect(stored).toEqual({
      name: 'Casey Lighting',
      role: 'Gaffer',
      phone: '+1 555 0100',
      email: 'casey@example.test',
      avatar: 'DATA:image/png;base64,avatar-data',
    });
  });

  test('loadUserProfile preserves legacy numeric fields', () => {
    const { storage } = createMockStorage();
    storage.setItem(
      USER_PROFILE_KEY,
      JSON.stringify({
        name: 'Casey Lighting',
        role: 'Gaffer',
        phone: 15550100,
        email: 'casey@example.test',
      }),
    );

    const api = bootstrapStorageModule(storage);
    const profile = api.loadUserProfile();

    expect(profile).toEqual({
      name: 'Casey Lighting',
      role: 'Gaffer',
      phone: '15550100',
      email: 'casey@example.test',
      avatar: '',
    });
  });

  test('saveUserProfile coerces numeric phone numbers to strings', () => {
    const { storage, data } = createMockStorage();
    const api = bootstrapStorageModule(storage);

    api.saveUserProfile({
      name: 'Casey Lighting',
      role: 'Gaffer',
      phone: 15550100,
      email: 'casey@example.test',
    });

    const raw = data.get(USER_PROFILE_KEY);
    const stored = JSON.parse(raw);
    expect(stored.phone).toBe('15550100');
  });
});
