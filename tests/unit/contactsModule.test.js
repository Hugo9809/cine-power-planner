const {
  normalizeContactEntry,
} = require('../../src/scripts/modules/features/contacts.js');

describe('contacts module normalization', () => {
  test('includes website when provided', () => {
    const contact = normalizeContactEntry({
      id: 'contact-123',
      name: 'Alex Producer',
      website: ' https://example.com ',
    });

    expect(contact).toMatchObject({
      website: 'https://example.com',
    });
  });

  test('maps legacy url field to website', () => {
    const contact = normalizeContactEntry({
      id: 'legacy-1',
      name: 'Jamie Grip',
      url: 'https://crew.example/test',
    });

    expect(contact.website).toBe('https://crew.example/test');
  });
});
