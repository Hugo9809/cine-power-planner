const fs = require('fs');
const path = require('path');
const { collectServiceWorkerAssets } = require('../../tools/serviceWorkerAssetManifest');

function listFilesRecursive(directoryPath) {
  return fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .flatMap((entry) => {
      if (entry.name.startsWith('.')) {
        return [];
      }

      const resolvedPath = path.join(directoryPath, entry.name);

      if (entry.isDirectory()) {
        return listFilesRecursive(resolvedPath);
      }

      return [resolvedPath];
    });
}

describe('service worker asset manifest', () => {
  test('matches generated manifest output', () => {
    const projectRoot = path.resolve(__dirname, '..', '..');
    const generatedAssets = collectServiceWorkerAssets(projectRoot);
    const manifestAssets = require('../../service-worker-assets.js');
    const docsDirectory = path.join(projectRoot, 'docs');
    const docFiles = listFilesRecursive(docsDirectory)
      .map((docPath) => `./${path.relative(projectRoot, docPath).replace(/\\/g, '/')}`)
      .sort();

    expect(Array.isArray(manifestAssets)).toBe(true);
    // Ensure essential documentation files remain cached for offline safety checks.
    expect(manifestAssets).toEqual(
      expect.arrayContaining([
        './docs/offline-readiness.md',
        './docs/save-share-restore-reference.md',
      ]),
    );
    expect(manifestAssets).toEqual(
      expect.arrayContaining([
        './app-version.js',
      ]),
    );
    expect(manifestAssets.filter((asset) => asset.startsWith('./docs/')).sort()).toEqual(docFiles);
    expect(manifestAssets).toEqual(generatedAssets);
  });
});
