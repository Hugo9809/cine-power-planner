#!/usr/bin/env node
const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

const projectRoot = process.cwd();
const versionPath = join(projectRoot, 'app-version.json');
const packageJsonPath = join(projectRoot, 'package.json');
const packageLockPath = join(projectRoot, 'package-lock.json');
const appVersionJsPath = join(projectRoot, 'app-version.js');

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf-8'));
}

function writeJson(path, value) {
  writeFileSync(path, JSON.stringify(value, null, 2) + '\n', 'utf-8');
}

function resolveVersion() {
  const payload = readJson(versionPath);
  if (!payload || typeof payload.version !== 'string' || !payload.version.trim()) {
    throw new Error('app-version.json must include a non-empty "version" string.');
  }
  return payload.version.trim();
}

function updatePackageJson(version) {
  const packageJson = readJson(packageJsonPath);
  if (packageJson.version !== version) {
    packageJson.version = version;
    writeJson(packageJsonPath, packageJson);
  }
}

function updatePackageLock(version) {
  const packageLock = readJson(packageLockPath);
  if (packageLock.version !== version) {
    packageLock.version = version;
  }
  if (packageLock.packages && packageLock.packages['']) {
    packageLock.packages[''].version = version;
  }
  writeJson(packageLockPath, packageLock);
}

function updateAppVersionJs(version) {
  const content = `(function (s) { s.APP_VERSION = '${version}'; s.CPP_APP_VERSION = '${version}'; if (typeof module !== 'undefined') module.exports = s; })(typeof self !== 'undefined' ? self : typeof global !== 'undefined' ? global : this || {});\n`;
  writeFileSync(appVersionJsPath, content, 'utf-8');
}

function main() {
  const version = resolveVersion();
  updatePackageJson(version);
  updatePackageLock(version);
  updateAppVersionJs(version);
  console.log(`[version-sync] App version synced to ${version}.`);
}

main();
