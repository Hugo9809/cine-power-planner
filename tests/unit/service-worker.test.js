const { ASSETS, CACHE_NAME } = require('../../service-worker.js');

describe('service worker configuration', () => {
  test('caches overview assets for offline usage', () => {
    expect(ASSETS).toEqual(expect.arrayContaining(['./web/styles/overview.css', './web/styles/overview-print.css', './web/scripts/overview.js']));
  });

  test('caches runtime JavaScript dependencies for offline usage', () => {
    expect(ASSETS).toEqual(
      expect.arrayContaining([
        './web/scripts/globalthis-polyfill.js',
        './web/data/devices/batteryHotswaps.js',
        './web/data/devices/chargers.js',
        './web/data/devices/wirelessReceivers.js',
      ]),
    );
  });

  test('caches legal pages for offline usage', () => {
    expect(ASSETS).toEqual(
      expect.arrayContaining([
        './legal/impressum.html',
        './legal/impressum-en.html',
        './legal/impressum-es.html',
        './legal/impressum-fr.html',
        './legal/impressum-it.html',
        './legal/datenschutz.html',
        './legal/datenschutz-en.html',
        './legal/datenschutz-es.html',
        './legal/datenschutz-fr.html',
        './legal/datenschutz-it.html',
      ]),
    );
  });

  test('caches the device schema for offline editing', () => {
    expect(ASSETS).toEqual(expect.arrayContaining(['./web/data/schema.json']));
  });

  test('caches the shared theme helper for legal pages', () => {
    expect(ASSETS).toEqual(expect.arrayContaining(['./web/scripts/static-theme.js']));
  });

  test('exposes a cache name', () => {
    expect(typeof CACHE_NAME).toBe('string');
    expect(CACHE_NAME).not.toBe('');
  });
});
