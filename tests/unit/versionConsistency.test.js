const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = path.join(__dirname, '..', '..');

const read = relativePath => fs.readFileSync(path.join(rootDir, relativePath), 'utf8');

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

    const appVersionModule = require(path.join(rootDir, 'app-version.js'));
    const resolvedAppVersion =
      typeof appVersionModule === 'string'
        ? appVersionModule
        : appVersionModule && typeof appVersionModule.APP_VERSION === 'string'
        ? appVersionModule.APP_VERSION
        : appVersionModule && typeof appVersionModule.default === 'string'
        ? appVersionModule.default
        : null;

    expect(resolvedAppVersion).toBe(version);

    const scriptSource = read('src/scripts/script.js');
    expect(scriptSource.includes("require('../../app-version.js')")).toBe(true);

    const legacySource = read('legacy/scripts/script.js');
    expect(legacySource.includes("require('../../app-version.js')")).toBe(true);

    const html = read('index.html');
    expect(html.includes('<script src="app-version.js"></script>')).toBe(true);
    expect(html).toMatch(/<p id="aboutVersion">Version<\/p>/);

    const cacheName = evaluateServiceWorkerCacheName(rootDir);
    expect(cacheName).toBe(`cine-power-planner-v${version}`);
  });
});
