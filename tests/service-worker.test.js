const { ASSETS, CACHE_NAME } = require('../service-worker.js');

describe('service worker configuration', () => {
  test('caches overview assets for offline usage', () => {
    expect(ASSETS).toEqual(expect.arrayContaining(['./overview.css', './overview-print.css', './overview.js']));
  });

  test('caches legal pages for offline usage', () => {
    expect(ASSETS).toEqual(expect.arrayContaining(['./impressum.html', './datenschutz.html']));
  });

  test('exposes a cache name', () => {
    expect(typeof CACHE_NAME).toBe('string');
    expect(CACHE_NAME).not.toBe('');
  });
});
