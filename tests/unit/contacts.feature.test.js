const path = require('path');

describe('contacts feature module', () => {
  let contactsApi;

  function loadModule() {
    jest.resetModules();
    delete global.cineFeaturesContacts;
    // Ensure every test starts from a clean storage state.
    localStorage.clear();
    require(path.resolve(__dirname, '../../src/scripts/modules/features/contacts.js'));
    contactsApi = global.cineFeaturesContacts;
    expect(contactsApi).toBeDefined();
  }

  beforeEach(() => {
    loadModule();
  });

  test('normalizeContactEntry retains website and notes fields', () => {
    const { normalizeContactEntry } = contactsApi;
    const normalized = normalizeContactEntry({
      id: ' custom-id ',
      name: '  Dana  ',
      role: ' Producer ',
      phone: ' +1 555 0101 ',
      email: ' dana@example.com ',
      website: ' https://danafilms.example ',
      text: ' Available for night shoots ',
      createdAt: 1700000000000,
      updatedAt: 1700000100000,
    });

    expect(normalized).toMatchObject({
      id: 'custom-id',
      name: 'Dana',
      role: 'Producer',
      phone: '+1 555 0101',
      email: 'dana@example.com',
      website: 'https://danafilms.example',
      notes: 'Available for night shoots',
      createdAt: 1700000000000,
      updatedAt: 1700000100000,
    });
  });

  test('save and load contacts preserves website information', () => {
    const { saveContactsToStorage, loadStoredContacts, normalizeContactEntry } = contactsApi;
    const contact = normalizeContactEntry({
      name: 'Taylor',
      website: 'https://taylordirector.example',
      notes: 'Prefers SMS updates',
    });

    expect(saveContactsToStorage([contact])).toBe(true);

    const reloaded = loadStoredContacts();
    expect(reloaded).toHaveLength(1);
    expect(reloaded[0]).toMatchObject({
      name: 'Taylor',
      website: 'https://taylordirector.example',
      notes: 'Prefers SMS updates',
    });
  });
});
