const fs = require('fs');
const os = require('os');
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

function listTopLevelReadmes(directoryPath) {
  return fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && /^README.*\.md$/i.test(entry.name))
    .map((entry) => entry.name)
    .sort();
}

describe('service worker asset manifest', () => {
  test('includes manifest module even when the file is missing', () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'cine-sw-assets-'));

    try {
      const generatedAssets = collectServiceWorkerAssets(tempRoot);

      expect(generatedAssets).toContain('./service-worker-assets.js');
    } finally {
      fs.rmSync(tempRoot, { recursive: true, force: true });
    }
  });

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
        './docs/ops/offline-readiness.md',
        './docs/user/save-share-restore-reference.md',
      ]),
    );
    expect(manifestAssets).toEqual(
      expect.arrayContaining([
        './app-version.js',
      ]),
    );
    const readmeFiles = listTopLevelReadmes(projectRoot).map((fileName) => `./${fileName}`);
    expect(manifestAssets).toEqual(expect.arrayContaining(readmeFiles));
    expect(manifestAssets.filter((asset) => asset.startsWith('./docs/')).sort()).toEqual(docFiles);
    expect(manifestAssets).toEqual(generatedAssets);
  });
});
