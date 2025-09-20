const { ASSETS, CACHE_NAME } = require('../../service-worker.js');

describe('service worker configuration', () => {
  test('caches overview assets for offline usage', () => {
    expect(ASSETS).toEqual(expect.arrayContaining(['./src/styles/overview.css', './src/styles/overview-print.css', './src/scripts/overview.js']));
  });

  test('caches runtime JavaScript dependencies for offline usage', () => {
    expect(ASSETS).toEqual(
      expect.arrayContaining([
        './src/scripts/globalthis-polyfill.js',
        './src/data/devices/batteryHotswaps.js',
        './src/data/devices/chargers.js',
        './src/data/devices/wirelessReceivers.js',
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
    expect(ASSETS).toEqual(expect.arrayContaining([
      './src/data/schema.json',
      './src/data/schema-inline.js',
    ]));
  });

  test('caches the shared theme helper for legal pages', () => {
    expect(ASSETS).toEqual(expect.arrayContaining(['./src/scripts/static-theme.js']));
  });

  test('exposes a cache name', () => {
    expect(typeof CACHE_NAME).toBe('string');
    expect(CACHE_NAME).not.toBe('');
  });
});
