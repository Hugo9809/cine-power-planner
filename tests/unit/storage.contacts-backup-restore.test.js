const CONTACTS_KEY = 'cameraPowerPlanner_contacts';

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

describe('contacts backup lifecycle', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    delete global.window;
    delete global.localStorage;
    delete global.sessionStorage;
    delete global.LZString;
  });

  test('exportAllData and importAllData preserve contacts', () => {
    const { storage, data } = createMockStorage();
    const storageApi = bootstrapStorageModule(storage);

    jest.spyOn(Date, 'now').mockReturnValue(1720000000000);
    jest.spyOn(Math, 'random').mockReturnValue(0.123456789);

    storageApi.saveContacts([
      {
        id: ' contact-1 ',
        name: '  Alex DP  ',
        role: '  Director of Photography  ',
        phone: '  +1 555 0001  ',
        email: '  alex@example.test  ',
        website: ' https://example.test ',
        notes: '  Call sheet lead  ',
      },
      {
        name: '  Bailey  ',
        role: ' Gaffer ',
        email: 'bailey@example.test ',
      },
    ]);

    const exported = storageApi.exportAllData();

    expect(Array.isArray(exported.contacts)).toBe(true);
    expect(exported.contacts).toHaveLength(2);

    const [alex, bailey] = exported.contacts;

    expect(alex).toMatchObject({
      id: 'contact-1',
      name: 'Alex DP',
      role: 'Director of Photography',
      phone: '+1 555 0001',
      email: 'alex@example.test',
      website: 'https://example.test',
      notes: 'Call sheet lead',
    });
    expect(alex.createdAt).toBe(1720000000000);
    expect(alex.updatedAt).toBe(1720000000000);

    expect(bailey.id).toMatch(/^contact-/);
    expect(bailey).toMatchObject({
      name: 'Bailey',
      role: 'Gaffer',
      email: 'bailey@example.test',
      phone: '',
      website: '',
      notes: '',
    });

    const backupKey = `${CONTACTS_KEY}__backup`;
    expect(typeof data.get(CONTACTS_KEY)).toBe('string');
    expect(typeof data.get(backupKey)).toBe('string');

    storage.clear();

    const restoredPayload = JSON.parse(JSON.stringify(exported));
    storageApi.importAllData(restoredPayload);

    const restoredContacts = storageApi.loadContacts();
    expect(restoredContacts).toEqual(exported.contacts);
  });
});
