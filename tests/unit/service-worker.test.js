const { ASSETS, CACHE_NAME } = require('../../service-worker.js');

describe('service worker configuration', () => {
  test('caches overview assets for offline usage', () => {
    expect(ASSETS).toEqual(expect.arrayContaining(['./public/styles/overview.css', './public/styles/overview-print.css', './public/scripts/overview.js']));
  });

  test('caches runtime JavaScript dependencies for offline usage', () => {
    expect(ASSETS).toEqual(
      expect.arrayContaining([
        './public/scripts/globalthis-polyfill.js',
        './public/data/devices/batteryHotswaps.js',
        './public/data/devices/chargers.js',
        './public/data/devices/wirelessReceivers.js',
      ]),
    );
  });

  test('caches legal pages for offline usage', () => {
    expect(ASSETS).toEqual(
      expect.arrayContaining([
        './public/legal/impressum.html',
        './public/legal/impressum-en.html',
        './public/legal/impressum-es.html',
        './public/legal/impressum-fr.html',
        './public/legal/impressum-it.html',
        './public/legal/datenschutz.html',
        './public/legal/datenschutz-en.html',
        './public/legal/datenschutz-es.html',
        './public/legal/datenschutz-fr.html',
        './public/legal/datenschutz-it.html',
      ]),
    );
  });

  test('caches the device schema for offline editing', () => {
    expect(ASSETS).toEqual(expect.arrayContaining(['./public/data/schema.json']));
  });

  test('caches the shared theme helper for legal pages', () => {
    expect(ASSETS).toEqual(expect.arrayContaining(['./public/scripts/static-theme.js']));
  });

  test('exposes a cache name', () => {
    expect(typeof CACHE_NAME).toBe('string');
    expect(CACHE_NAME).not.toBe('');
  });
});
