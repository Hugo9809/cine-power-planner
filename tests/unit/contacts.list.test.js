const {
  parseVCard,
  mergeVCardContacts,
  sanitizeContactValue,
} = require('../../src/scripts/contacts/list.js');

describe('contacts/list module', () => {
  test('parseVCard extracts fields even with folded lines', () => {
    const payload = `BEGIN:VCARD\nFN:Lee Rivera\nTEL;TYPE=CELL:+1 555 0100\nEMAIL:lee@example.com\nURL:https://crew.example\nEND:VCARD`;
    const [contact] = parseVCard(payload);
    expect(contact).toMatchObject({
      name: 'Lee Rivera',
      phone: '+1 555 0100',
      email: 'lee@example.com',
      website: 'https://crew.example',
    });
  });

  test('mergeVCardContacts never drops user entered details', () => {
    const existing = [{
      id: 'contact-1',
      name: 'Jo',
      role: 'Director',
      phone: '555-1234',
      email: 'jo@example.com',
      website: 'https://jo.example',
      notes: 'Prefers SMS',
      createdAt: 1,
      updatedAt: 1,
    }];
    const imported = [{
      name: 'Jo',
      email: 'jo@example.com',
      phone: '+1 (555) 1234',
      notes: '',
    }];

    const { contacts, added, updated } = mergeVCardContacts(existing, imported, { now: () => 2 });
    expect(added).toBe(0);
    expect(updated).toBe(1);
    expect(contacts[0]).toMatchObject({
      name: 'Jo',
      phone: '+1 (555) 1234',
      notes: 'Prefers SMS',
    });
  });

  test('sanitizeContactValue gracefully coerces complex values', () => {
    expect(sanitizeContactValue({ valueOf: () => 'Crew' })).toBe('Crew');
  });
});
