const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..', '..');
const SCRIPTS_DIR = path.join(ROOT_DIR, 'src', 'scripts');
const SCRIPT_CANDIDATES = ['script.module.js', 'script.js'];

const { version: APP_VERSION } = require(path.join(ROOT_DIR, 'package.json'));

const RUNTIME_STUBS = {
  searchTokens: () => require('../stubs/searchTokensRuntime'),
};

function getGlobalScope() {
  if (typeof globalThis !== 'undefined') {
    return globalThis;
  }

  if (typeof global !== 'undefined') {
    return global;
  }

  return {};
}

const GLOBAL_SCOPE = getGlobalScope();

function resolveScriptFilename() {
  for (const candidate of SCRIPT_CANDIDATES) {
    const fullPath = path.join(SCRIPTS_DIR, candidate);
    if (fs.existsSync(fullPath)) {
      return fullPath;
    }
  }

  return path.join(SCRIPTS_DIR, SCRIPT_CANDIDATES[SCRIPT_CANDIDATES.length - 1]);
}

const SCRIPT_FILENAME = resolveScriptFilename();

function resolveScriptPath() {
  return require.resolve(SCRIPT_FILENAME);
}

function isRuntimeObject(candidate) {
  return (
    candidate
    && typeof candidate === 'object'
    && typeof candidate.updateCalculations === 'function'
    && typeof candidate.createSettingsBackup === 'function'
  );
}

function getGlobalRuntimeFallback() {
  const runtimeCandidates = [
    GLOBAL_SCOPE.cineRuntime,
    GLOBAL_SCOPE.cine?.runtime,
  ];

  for (const candidate of runtimeCandidates) {
    if (isRuntimeObject(candidate)) {
      return candidate;
    }
  }

  return null;
}

function normalizeRuntimeExports(rawExports) {
  if (isRuntimeObject(rawExports)) {
    return rawExports;
  }

  if (rawExports && typeof rawExports === 'object') {
    if (isRuntimeObject(rawExports.default)) {
      return rawExports.default;
    }

    if (isRuntimeObject(rawExports.cineRuntime)) {
      return rawExports.cineRuntime;
    }
  }

  return getGlobalRuntimeFallback();
}

function loadRuntime() {
  const stubLoader = RUNTIME_STUBS[process.env.CPP_RUNTIME_STUB];
  if (typeof stubLoader === 'function') {
    return stubLoader();
  }

  const resolvedScriptPath = resolveScriptPath();

  const legacyShimPath = path.join(SCRIPTS_DIR, 'legacy-globals-shim.js');
  if (fs.existsSync(legacyShimPath)) {
    try {
      if (require.cache[legacyShimPath]) {
        delete require.cache[legacyShimPath];
      }
      require(legacyShimPath);
    } catch (shimError) {
      console.warn('Failed to load legacy shim in test runtime', shimError);
    }
  }

  if (require.cache[resolvedScriptPath]) {
    delete require.cache[resolvedScriptPath];
  }

  const rawExports = require(resolvedScriptPath);
  const runtime = normalizeRuntimeExports(rawExports);

  if (!isRuntimeObject(runtime)) {
    throw new Error('script runtime could not be resolved from module exports or globals');
  }

  const { APP_VERSION: runtimeVersion } = runtime;

  if (runtimeVersion && runtimeVersion !== APP_VERSION) {
    throw new Error(
      `Combined app version (${runtimeVersion}) does not match package version (${APP_VERSION}).`
    );
  }

  if (!runtimeVersion) {
    runtime.APP_VERSION = APP_VERSION;
  }

  delete require.cache[resolvedScriptPath];

  return runtime;
}

module.exports = {
  loadRuntime,
  normalizeRuntimeExports,
  resolveScriptPath,
};
