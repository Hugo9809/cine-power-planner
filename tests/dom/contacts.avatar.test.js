/**
 * @jest-environment jsdom
 */
const {
  CONTACT_AVATAR_MAX_SOURCE_BYTES,
  createProfileState,
} = require('../../src/scripts/contacts/profile.js');
const {
  createContactCard,
} = require('../../src/scripts/contacts/list.js');

describe('contacts avatar handling (jsdom)', () => {
  test('handleAvatarFile rejects oversized images while offline', async () => {
    const errors = [];
    const store = createProfileState({
      load: () => ({}),
      save: jest.fn(),
      onAvatarError: (reason) => errors.push(reason),
    });
    const payload = new Uint8Array(CONTACT_AVATAR_MAX_SOURCE_BYTES + 10);
    const blob = new File([payload], 'huge.png', { type: 'image/png' });
    store.handleAvatarFile(blob);
    await Promise.resolve();
    expect(errors).toContain('tooLarge');
  });

  test('createContactCard renders data without external resources', () => {
    const contact = {
      id: 'contact-1',
      name: 'Morgan',
      role: 'Producer',
      phone: '+1 555 0199',
      email: 'morgan@example.com',
      website: 'https://crew.example/morgan',
    };
    const card = createContactCard(contact, { document });
    expect(card.querySelector('h3').textContent).toBe('Morgan');
    expect(card.querySelectorAll('dt').length).toBeGreaterThan(0);
  });
});
