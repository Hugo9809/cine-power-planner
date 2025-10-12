#!/usr/bin/env node

const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function createBuildContext(options = {}) {
  const rootDir = options.rootDir
    ? path.resolve(options.rootDir)
    : path.resolve(__dirname, '..');

  return {
    rootDir,
    legacyDir: options.legacyDir || path.join(rootDir, 'legacy'),
    stagingPrefix: options.stagingPrefix || path.join(rootDir, '.legacy-build-'),
    babelBin: options.babelBin || require.resolve('@babel/cli/bin/babel.js'),
    babelConfig: options.babelConfig || path.join(rootDir, 'babel.legacy.config.json'),
    coreJsPath: options.coreJsPath || require.resolve('core-js-bundle/minified.js'),
    coreJsMapPath:
      options.coreJsMapPath ||
      path.join(
        path.dirname(require.resolve('core-js-bundle/minified.js')),
        'minified.js.map'
      ),
    regeneratorPath: options.regeneratorPath || require.resolve('regenerator-runtime/runtime.js'),
    execFileSync: options.execFileSync || execFileSync,
    fs: options.fs || fs,
  };
}

function runBabel(context, sourceDir, outDir, ignores) {
  const { execFileSync: runExec, fs: fsImpl, rootDir, babelBin, babelConfig } = context;

  fsImpl.rmSync(outDir, { recursive: true, force: true });
  fsImpl.mkdirSync(outDir, { recursive: true });

  const args = [
    babelBin,
    sourceDir,
    '--out-dir',
    outDir,
    '--config-file',
    babelConfig,
    '--no-copy-ignored',
    '--ignore',
    '**/legacy/**',
    '--ignore',
    '**/*.test.js'
  ];

  if (Array.isArray(ignores)) {
    for (let i = 0; i < ignores.length; i += 1) {
      args.push('--ignore');
      args.push(ignores[i]);
    }
  }

  runExec(process.execPath, args, {
    cwd: rootDir,
    stdio: 'inherit'
  });
}

function copyPolyfills(context, destinationDir) {
  const { fs: fsImpl, coreJsPath, coreJsMapPath, regeneratorPath } = context;
  const targetDir = destinationDir || path.join(context.legacyDir, 'polyfills');

  fsImpl.mkdirSync(targetDir, { recursive: true });
  fsImpl.copyFileSync(coreJsPath, path.join(targetDir, 'core-js-bundle.min.js'));
  if (coreJsMapPath && fsImpl.existsSync(coreJsMapPath)) {
    fsImpl.copyFileSync(coreJsMapPath, path.join(targetDir, 'minified.js.map'));
  }
  fsImpl.copyFileSync(regeneratorPath, path.join(targetDir, 'regenerator-runtime.js'));
}

function buildLegacy(options = {}) {
  const context = createBuildContext(options);
  const { fs: fsImpl, legacyDir, stagingPrefix } = context;

  const stagingDir = fsImpl.mkdtempSync(stagingPrefix);
  const stagingScriptsDir = path.join(stagingDir, 'scripts');
  const stagingDataDir = path.join(stagingDir, 'data');
  const stagingPolyfillsDir = path.join(stagingDir, 'polyfills');

  let stagingActive = true;
  let backupDir;

  try {
    runBabel(context, path.join('src', 'scripts'), stagingScriptsDir);
    runBabel(context, path.join('src', 'data'), stagingDataDir, ['**/*.json']);
    copyPolyfills(context, stagingPolyfillsDir);

    if (fsImpl.existsSync(legacyDir)) {
      backupDir = `${legacyDir}.backup-${Date.now()}`;
      fsImpl.renameSync(legacyDir, backupDir);
    }

    fsImpl.renameSync(stagingDir, legacyDir);
    stagingActive = false;

    if (backupDir) {
      fsImpl.rmSync(backupDir, { recursive: true, force: true });
    }
  } catch (error) {
    if (backupDir) {
      try {
        if (!fsImpl.existsSync(legacyDir) && fsImpl.existsSync(backupDir)) {
          fsImpl.renameSync(backupDir, legacyDir);
        }
      } catch (restoreError) {
        error.restoreError = restoreError;
      }
    }

    throw error;
  } finally {
    if (stagingActive && fsImpl.existsSync(stagingDir)) {
      fsImpl.rmSync(stagingDir, { recursive: true, force: true });
    }
  }
}

function main() {
  buildLegacy();
}

if (require.main === module) {
  main();
}

module.exports = {
  buildLegacy,
  copyPolyfills,
  createBuildContext,
  runBabel,
};
