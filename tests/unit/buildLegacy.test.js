const fs = require('fs');
const os = require('os');
const path = require('path');

const { buildLegacy } = require('../../tools/buildLegacy');

function createTempRoot() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'legacy-build-test-'));
}

describe('buildLegacy', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('restores previous legacy output when compilation fails', () => {
    const rootDir = createTempRoot();
    const legacyScripts = path.join(rootDir, 'legacy', 'scripts');
    fs.mkdirSync(legacyScripts, { recursive: true });
    const sentinelPath = path.join(legacyScripts, 'existing.js');
    fs.writeFileSync(sentinelPath, 'original');

    const options = {
      rootDir,
      execFileSync: () => {
        throw new Error('compile failed');
      },
    };

    expect(() => buildLegacy(options)).toThrow('compile failed');

    expect(fs.existsSync(sentinelPath)).toBe(true);
    const stagingPrefixes = fs
      .readdirSync(rootDir)
      .filter(name => name.startsWith('.legacy-build-'));
    expect(stagingPrefixes.length).toBe(0);

    fs.rmSync(rootDir, { recursive: true, force: true });
  });

  test('swaps in staged output only after successful build', () => {
    const rootDir = createTempRoot();
    const srcScripts = path.join(rootDir, 'src', 'scripts');
    const srcData = path.join(rootDir, 'src', 'data');
    fs.mkdirSync(srcScripts, { recursive: true });
    fs.mkdirSync(srcData, { recursive: true });
    const legacyDir = path.join(rootDir, 'legacy');
    const legacyScripts = path.join(legacyDir, 'scripts');
    fs.mkdirSync(legacyScripts, { recursive: true });
    fs.writeFileSync(path.join(legacyScripts, 'existing.js'), 'old');

    const coreJsPath = path.join(rootDir, 'fake-core-js.js');
    const regeneratorPath = path.join(rootDir, 'fake-regenerator.js');
    fs.writeFileSync(coreJsPath, 'core');
    fs.writeFileSync(regeneratorPath, 'reg');

    const execFileSync = jest.fn((nodePath, args) => {
      const outDirIndex = args.indexOf('--out-dir');
      const outDir = args[outDirIndex + 1];
      const sourceDir = args[1];
      if (sourceDir.includes('scripts')) {
        fs.writeFileSync(path.join(outDir, 'compiled-script.js'), 'scripts');
      } else {
        fs.writeFileSync(path.join(outDir, 'compiled-data.js'), 'data');
      }
    });

    buildLegacy({
      rootDir,
      execFileSync,
      coreJsPath,
      regeneratorPath,
      babelBin: '/fake/babel',
      babelConfig: path.join(rootDir, 'babel.config.js'),
    });

    expect(execFileSync).toHaveBeenCalledTimes(2);

    const newScript = path.join(rootDir, 'legacy', 'scripts', 'compiled-script.js');
    const newData = path.join(rootDir, 'legacy', 'data', 'compiled-data.js');
    expect(fs.readFileSync(newScript, 'utf8')).toBe('scripts');
    expect(fs.readFileSync(newData, 'utf8')).toBe('data');
    expect(fs.existsSync(path.join(rootDir, 'legacy', 'scripts', 'existing.js'))).toBe(false);

    const polyfillsDir = path.join(rootDir, 'legacy', 'polyfills');
    expect(fs.readFileSync(path.join(polyfillsDir, 'core-js-bundle.min.js'), 'utf8')).toBe('core');
    expect(fs.readFileSync(path.join(polyfillsDir, 'regenerator-runtime.js'), 'utf8')).toBe('reg');

    const leftovers = fs
      .readdirSync(rootDir)
      .filter(name => name.startsWith('.legacy-build-'));
    expect(leftovers.length).toBe(0);

    fs.rmSync(rootDir, { recursive: true, force: true });
  });
});
