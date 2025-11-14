'use strict';

const {
  readAvatarFile,
  isSafeImageUrl,
  CONTACT_AVATAR_MAX_SOURCE_BYTES
} = require('../../src/scripts/contacts/profile.js');

describe('contacts avatar handling', () => {
  test('rejects oversized uploads immediately', done => {
    const hugeBytes = new Uint8Array(CONTACT_AVATAR_MAX_SOURCE_BYTES + 1);
    const file = new File([hugeBytes], 'huge.png', { type: 'image/png' });
    readAvatarFile(
      file,
      () => done.fail('oversized avatar should not resolve'),
      reason => {
        expect(reason).toBe('tooLarge');
        done();
      }
    );
  });

  test('reads small avatars without network requirements', () => {
    const file = new File([new Uint8Array([1, 2, 3])], 'tiny.png', { type: 'image/png' });
    return new Promise((resolve, reject) => {
      readAvatarFile(
        file,
        dataUrl => {
          expect(typeof dataUrl).toBe('string');
          expect(isSafeImageUrl(dataUrl)).toBe(true);
          resolve();
        },
        reject
      );
    });
  });

  test('blocks remote avatar URLs', () => {
    expect(isSafeImageUrl('https://example.com/avatar.png')).toBe(false);
    expect(isSafeImageUrl('data:image/png;base64,AAAA')).toBe(true);
  });
});
