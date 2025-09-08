const { ASSETS, CACHE_NAME } = require('../public/service-worker.js');

describe('service worker configuration', () => {
  test('caches overview assets for offline usage', () => {
    expect(ASSETS).toEqual(expect.arrayContaining(['./styles/overview.css', './styles/overview-print.css', './js/overview.js']));
  });

  test('caches legal pages for offline usage', () => {
    expect(ASSETS).toEqual(expect.arrayContaining(['./impressum.html', './datenschutz.html']));
  });

  test('exposes a cache name', () => {
    expect(typeof CACHE_NAME).toBe('string');
    expect(CACHE_NAME).not.toBe('');
  });
});
