const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..', '..');

const read = relativePath => fs.readFileSync(path.join(rootDir, relativePath), 'utf8');

function extractVersion(regex, contents, source) {
  const match = contents.match(regex);
  if (!match) {
    throw new Error(`Unable to find version in ${source}`);
  }
  return match[1];
}

describe('application version consistency', () => {
  test('package version matches user-facing and cache versions', () => {
    const { version } = require(path.join(rootDir, 'package.json'));

    const appScriptVersion = extractVersion(
      /const APP_VERSION = "([^"]+)";/,
      read('src/scripts/script.js'),
      'src/scripts/script.js',
    );
    expect(appScriptVersion).toBe(version);

    const legacyScriptVersion = extractVersion(
      /var APP_VERSION = "([^"]+)";/,
      read('legacy/scripts/script.js'),
      'legacy/scripts/script.js',
    );
    expect(legacyScriptVersion).toBe(version);

    const htmlVersion = extractVersion(
      /<p id="aboutVersion">Version ([^<]+)<\/p>/,
      read('index.html'),
      'index.html',
    );
    expect(htmlVersion).toBe(version);

    const cacheVersion = extractVersion(
      /const CACHE_NAME = ['"]cine-power-planner-v([^'"]+)['"];?/,
      read('service-worker.js'),
      'service-worker.js',
    );
    expect(cacheVersion).toBe(version);
  });
});
