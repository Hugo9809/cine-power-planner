#!/usr/bin/env node

const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const babelBin = require.resolve('@babel/cli/bin/babel.js');
const babelConfig = path.join(rootDir, 'babel.legacy.config.json');
const legacyDir = path.join(rootDir, 'legacy');
const legacyScriptsDir = path.join(legacyDir, 'scripts');
const legacyDataDir = path.join(legacyDir, 'data');
const legacyPolyfillsDir = path.join(legacyDir, 'polyfills');

function runBabel(sourceDir, outDir, ignores) {
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });

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

  execFileSync(process.execPath, args, {
    cwd: rootDir,
    stdio: 'inherit'
  });
}

function copyPolyfills() {
  fs.mkdirSync(legacyPolyfillsDir, { recursive: true });
  const coreJsPath = require.resolve('core-js-bundle/minified.js');
  const regeneratorPath = require.resolve('regenerator-runtime/runtime.js');

  fs.copyFileSync(coreJsPath, path.join(legacyPolyfillsDir, 'core-js-bundle.min.js'));
  fs.copyFileSync(regeneratorPath, path.join(legacyPolyfillsDir, 'regenerator-runtime.js'));
}

function main() {
  fs.mkdirSync(legacyDir, { recursive: true });

  runBabel(path.join('src', 'scripts'), legacyScriptsDir);
  runBabel(path.join('src', 'data'), legacyDataDir, ['**/*.json']);
  copyPolyfills();
}

if (require.main === module) {
  main();
}

module.exports = {
  runBabel,
  copyPolyfills,
};
