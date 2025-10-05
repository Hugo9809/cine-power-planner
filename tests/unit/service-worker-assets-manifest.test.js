const path = require('path');
const { collectServiceWorkerAssets } = require('../../tools/serviceWorkerAssetManifest');

describe('service worker asset manifest', () => {
  test('matches generated manifest output', () => {
    const projectRoot = path.resolve(__dirname, '..', '..');
    const generatedAssets = collectServiceWorkerAssets(projectRoot);
    const manifestAssets = require('../../service-worker-assets.js');

    expect(Array.isArray(manifestAssets)).toBe(true);
    expect(manifestAssets).toEqual(generatedAssets);
  });
});
