'use strict';

const {
  parseVCard,
  mergeImportedContacts,
  sanitizeContactValue
} = require('../../src/scripts/contacts/list.js');

describe('contacts/list helpers', () => {
  test('parseVCard keeps crew details intact', () => {
    const text = [
      'BEGIN:VCARD',
      'FN:Alex Op',
      'TEL:+1 555 1234',
      'EMAIL:alex@example.com',
      'PHOTO;TYPE=PNG:aGVsbG8=',
      'END:VCARD',
      'BEGIN:VCARD',
      'N:Light;Jamie;;;',
      'ROLE:Gaffer',
      'URL:https://example.org',
      'END:VCARD'
    ].join('\n');
    const parsed = parseVCard(text);
    expect(parsed).toHaveLength(2);
    expect(parsed[0]).toMatchObject({
      name: 'Alex Op',
      phone: '+1 555 1234',
      email: 'alex@example.com'
    });
    expect(parsed[1]).toMatchObject({
      name: 'Light Jamie',
      role: 'Gaffer',
      website: 'https://example.org'
    });
  });

  test('mergeImportedContacts never drops existing fields', () => {
    const existing = [
      {
        id: 'alpha',
        name: 'Jamie Light',
        role: 'Gaffer',
        phone: '+1 555 9999',
        email: 'jamie@example.com',
        website: 'https://crew.example.com',
        createdAt: 1,
        updatedAt: 1
      }
    ];
    const imported = [
      {
        name: 'Jamie Light',
        email: 'jamie+backup@example.com',
        phone: '',
        website: ''
      },
      {
        name: 'New Grip',
        phone: '+1 555 1212'
      }
    ];
    const result = mergeImportedContacts({ existing, imported, now: () => 10, generateContactId: () => 'beta' });
    expect(result.added).toBe(1);
    expect(result.updated).toBe(1);
    const contacts = Array.isArray(result.contacts) ? result.contacts : [];
    const updatedContact = contacts.find(entry => entry.name === 'Jamie Light');
    expect(updatedContact).toBeTruthy();
    expect(updatedContact.phone).toBe('+1 555 9999');
    expect(updatedContact.email).toBe('jamie+backup@example.com');
    expect(updatedContact.website).toBe('https://crew.example.com');
  });

  test('sanitizeContactValue trims whitespace safely', () => {
    expect(sanitizeContactValue('  demo  ')).toBe('demo');
    expect(sanitizeContactValue(null)).toBe('');
  });
});
