const fs = require('fs');
const path = require('path');

const { createDeviceSkeleton } = require('../helpers/scriptEnvironment');
const { getHtmlBody } = require('../helpers/domUtils');

describe('script.js modular runtime', () => {
  const rootDir = path.join(__dirname, '..', '..');
  const scriptsDir = path.join(rootDir, 'src/scripts');
  const scriptPath = path.join(scriptsDir, 'script.js');
  const packageVersion = require(path.join(rootDir, 'package.json')).version;

  function getScriptContents() {
    return fs.readFileSync(scriptPath, 'utf8');
  }

  function extractRuntimeParts() {
    const contents = getScriptContents();
    const match = contents.match(/const parts = \[(.*?)\];/s);

    if (!match) {
      throw new Error('Unable to locate runtime parts declaration in script.js');
    }

    const rawParts = match[1]
      .split(',')
      .map(entry => entry.trim())
      .filter(Boolean)
      .map(entry => entry.replace(/^['"]|['"]$/g, ''));

    return rawParts;
  }

  function applyRuntimeGlobals() {
    const stubs = {
      devices: createDeviceSkeleton(),
      loadDeviceData: jest.fn(() => null),
      saveDeviceData: jest.fn(),
      loadSetups: jest.fn(() => ({})),
      saveSetups: jest.fn(),
      saveSetup: jest.fn(),
      loadSetup: jest.fn(),
      deleteSetup: jest.fn(),
      loadFavorites: jest.fn(() => ({})),
      saveFavorites: jest.fn(),
    };

    const appliedKeys = Object.keys(stubs);
    for (const key of appliedKeys) {
      global[key] = stubs[key];
    }

    return () => {
      for (const key of appliedKeys) {
        delete global[key];
      }
    };
  }

  function applyDomStructure() {
    const descriptor = Object.getOwnPropertyDescriptor(document, 'readyState');
    try {
      Object.defineProperty(document, 'readyState', {
        configurable: true,
        get: () => 'loading',
      });
    } catch {
      // ignore if readyState cannot be redefined in this environment
    }

    const previousHtml = document.body.innerHTML;
    document.body.innerHTML = getHtmlBody();

    return () => {
      if (descriptor) {
        Object.defineProperty(document, 'readyState', descriptor);
      } else {
        delete document.readyState;
      }
      document.body.innerHTML = previousHtml;
    };
  }

  it('declares and references the expected runtime modules', () => {
    const parts = extractRuntimeParts();

    expect(parts).toEqual([
      'app-core-new-1.js',
      'app-core-new-2.js',
      'app-events.js',
      'app-setups.js',
      'app-session.js',
    ]);

    for (const part of parts) {
      const filePath = path.join(scriptsDir, part);
      expect(fs.existsSync(filePath)).toBe(true);
    }
  });

  it('contains the Node bootstrap that hydrates globals for the combined runtime', () => {
    const contents = getScriptContents();
    expect(contents).toContain('var __cineGlobal = typeof globalThis !== \'undefined\' ? globalThis : (typeof global !== \'undefined\' ? global : this);');
    expect(contents).toContain("const vm = require('vm');");
    expect(contents).toContain('vm.runInThisContext');
    expect(contents).toContain('aggregatedExports && aggregatedExports.APP_VERSION');
  });

  it('exports the aggregated runtime object when required in Node contexts', () => {
    jest.isolateModules(() => {
      const restoreGlobals = applyRuntimeGlobals();
      const restoreDom = applyDomStructure();
      const resolvedPath = require.resolve(scriptPath);
      try {
        if (require.cache[resolvedPath]) {
          delete require.cache[resolvedPath];
        }

        const runtime = require(resolvedPath);

        expect(runtime).toBeTruthy();
        expect(runtime.APP_VERSION).toBe(packageVersion);
        expect(typeof runtime.updateCalculations).toBe('function');
        expect(typeof runtime.createSettingsBackup).toBe('function');
      } finally {
        restoreGlobals();
        restoreDom();
        delete require.cache[resolvedPath];
      }
    });
  });

  it('restores the runtime version marker when loading through the helper', () => {
    jest.isolateModules(() => {
      const restoreGlobals = applyRuntimeGlobals();
      const restoreDom = applyDomStructure();
      try {
        const { loadRuntime } = require('../helpers/runtimeLoader');

        const first = loadRuntime();
        expect(first.APP_VERSION).toBe(packageVersion);
        delete first.APP_VERSION;

        const second = loadRuntime();

        expect(second.APP_VERSION).toBe(packageVersion);
        expect(typeof second.updateCalculations).toBe('function');
      } finally {
        restoreGlobals();
        restoreDom();
      }
    });
  });
});
