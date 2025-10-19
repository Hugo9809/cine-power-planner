const PROJECT_KEY = 'cameraPowerPlanner_project';

const createInMemoryStorage = () => {
  const data = new Map();
  return {
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
};

const bootstrapStorageModule = (storage) => {
  jest.resetModules();
  global.localStorage = storage;
  global.sessionStorage = storage;
  global.window = { localStorage: storage, sessionStorage: storage };
  global.LZString = require('lz-string/libs/lz-string');
  return require('../../src/scripts/storage');
};

describe('project compression respects recent activity window', () => {
  const bigPayload = '<div>' + 'A'.repeat(5000) + '</div>';
  const baseTime = new Date('2024-01-01T00:00:00Z');

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(baseTime);
  });

  afterEach(() => {
    jest.useRealTimers();
    delete global.localStorage;
    delete global.sessionStorage;
    delete global.window;
    delete global.LZString;
  });

  test('projects touched within 30 minutes remain uncompressed during persistence', () => {
    const storage = createInMemoryStorage();
    const api = bootstrapStorageModule(storage);

    api.saveProject('Recent', { gearList: bigPayload });

    jest.setSystemTime(new Date(baseTime.getTime() + 25 * 60 * 1000));
    api.saveProject('Other', { gearList: bigPayload });

    const parsed = JSON.parse(storage.getItem(PROJECT_KEY));
    expect(typeof parsed.Recent).toBe('object');
  });

  test('projects outside the 30 minute window eventually compress', () => {
    const storage = createInMemoryStorage();
    const api = bootstrapStorageModule(storage);

    api.saveProject('Aged', { gearList: bigPayload });

    jest.setSystemTime(new Date(baseTime.getTime() + 65 * 60 * 1000));
    api.saveProject('Other', { gearList: bigPayload });

    const parsed = JSON.parse(storage.getItem(PROJECT_KEY));
    expect(typeof parsed.Aged).toBe('string');
  });

  test('projects loaded through bulk read stay uncompressed briefly afterwards', () => {
    const storage = createInMemoryStorage();
    const api = bootstrapStorageModule(storage);

    api.saveProject('Bulk', { gearList: bigPayload });

    jest.setSystemTime(new Date(baseTime.getTime() + 65 * 60 * 1000));
    api.loadProject();

    jest.setSystemTime(new Date(baseTime.getTime() + 70 * 60 * 1000));
    api.saveProject('Other', { gearList: bigPayload });

    const parsed = JSON.parse(storage.getItem(PROJECT_KEY));
    expect(typeof parsed.Bulk).toBe('object');
  });
});
