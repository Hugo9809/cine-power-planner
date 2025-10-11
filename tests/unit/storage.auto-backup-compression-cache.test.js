const { loadStorageModule, snapshotGlobals, restoreGlobals, clearStorage } = require('../helpers/storageTestUtils');

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
      data.set(String(key), String(value));
    },
    removeItem(key) {
      data.delete(String(key));
    },
    clear() {
      data.clear();
    },
  };
};

describe('auto backup compression cache', () => {
  let globalSnapshot;
  let storage;

  beforeEach(() => {
    jest.resetModules();
    globalSnapshot = snapshotGlobals();
    storage = createInMemoryStorage();
    global.localStorage = storage;
    global.sessionStorage = storage;
    global.window = { localStorage: storage, sessionStorage: storage };
    global.LZString = require('lz-string/libs/lz-string');
    process.env.CINE_FORCE_STORAGE_REINIT = '1';
  });

  afterEach(() => {
    clearStorage();
    delete global.localStorage;
    delete global.sessionStorage;
    delete global.window;
    delete global.LZString;
    delete process.env.CINE_FORCE_STORAGE_REINIT;
    restoreGlobals(globalSnapshot);
  });

  test('preserves array metadata when cached payloads are reused', () => {
    const storageModule = loadStorageModule();
    const helpers = storageModule.__testAutoBackupCompressionCache;

    expect(helpers).toBeDefined();
    helpers.clear();

    const signature = 'test-signature';
    const payload = {
      [helpers.flag]: true,
      data: '{}',
      chunks: ['alpha', 'beta'],
    };
    const compression = {
      variants: ['utf16', 'base64'],
    };

    helpers.write(signature, payload, compression);
    const cached = helpers.read(signature);

    expect(cached).toBeDefined();
    expect(Array.isArray(cached.payload.chunks)).toBe(true);
    expect(cached.payload.chunks).not.toBe(payload.chunks);
    expect(cached.payload.chunks).toEqual(payload.chunks);

    expect(Array.isArray(cached.compression.variants)).toBe(true);
    expect(cached.compression.variants).not.toBe(compression.variants);
    expect(cached.compression.variants).toEqual(compression.variants);

    helpers.clear();
  });
});
