const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = path.join(__dirname, '..', '..');

const read = relativePath => fs.readFileSync(path.join(rootDir, relativePath), 'utf8');

function extractVersion(regex, contents, source) {
  const match = contents.match(regex);
  if (!match) {
    throw new Error(`Unable to find version in ${source}`);
  }
  return match[1];
}

function evaluateServiceWorkerCacheName(rootDirectory) {
  const serviceWorkerSource = read('service-worker.js');
  const context = {
    console,
  };

  let sandbox = null;

  const globalScope = {
    importScripts: (...urls) => {
      urls.forEach(url => {
        const resolved = path.join(rootDirectory, url.replace(/^\.\//, ''));
        const scriptSource = fs.readFileSync(resolved, 'utf8');
        vm.runInContext(scriptSource, sandbox, { filename: resolved });
      });
    },
    addEventListener: () => {},
    skipWaiting: () => {},
    clients: {
      claim: () => Promise.resolve(),
    },
  };

  sandbox = vm.createContext({
    ...context,
    self: globalScope,
    globalThis: globalScope,
  });

  vm.runInContext(serviceWorkerSource, sandbox, { filename: 'service-worker.js' });

  const cacheName =
    sandbox.CACHE_NAME ||
    sandbox.self.CACHE_NAME ||
    sandbox.self.CINE_CACHE_NAME ||
    null;
  if (!cacheName) {
    throw new Error('Service worker did not expose CACHE_NAME during evaluation.');
  }

  return cacheName;
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

    const cacheName = evaluateServiceWorkerCacheName(rootDir);
    expect(cacheName).toBe(`cine-power-planner-v${version}`);
  });
});
