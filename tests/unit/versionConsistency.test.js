const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..', '..');

const read = relativePath => fs.readFileSync(path.join(rootDir, relativePath), 'utf8');

function extractVersionFromFiles(regex, relativePaths) {
  for (const relativePath of relativePaths) {
    const contents = read(relativePath);
    const match = contents.match(regex);
    if (match) {
      return match[1];
    }
  }

  throw new Error(`Unable to find version in any of: ${relativePaths.join(', ')}`);
}

describe('application version consistency', () => {
  test('package version matches user-facing and cache versions', () => {
    const { version } = require(path.join(rootDir, 'package.json'));

    const appScriptVersion = extractVersionFromFiles(
      /const APP_VERSION = "([^"]+)";/,
      [
        'src/scripts/script.js',
        'src/scripts/app-core.js',
        'src/scripts/app-session.js'
      ],
    );
    expect(appScriptVersion).toBe(version);

    const legacyScriptVersion = extractVersionFromFiles(
      /var APP_VERSION = "([^"]+)";/,
      [
        'legacy/scripts/script.js',
        'legacy/scripts/app-core.js',
        'legacy/scripts/app-session.js'
      ],
    );
    expect(legacyScriptVersion).toBe(version);

    const htmlVersion = extractVersionFromFiles(
      /<p id="aboutVersion">Version ([^<]+)<\/p>/,
      ['index.html'],
    );
    expect(htmlVersion).toBe(version);

    const cacheVersion = extractVersionFromFiles(
      /const CACHE_NAME = ['"]cine-power-planner-v([^'"]+)['"];?/,
      ['service-worker.js'],
    );
    expect(cacheVersion).toBe(version);
  });
});
