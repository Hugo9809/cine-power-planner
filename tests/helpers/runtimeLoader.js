const path = require('path');

const ROOT_DIR = path.join(__dirname, '..', '..');
const SCRIPTS_DIR = path.join(ROOT_DIR, 'src', 'scripts');
const SCRIPT_FILENAME = path.join(SCRIPTS_DIR, 'script.js');

const { version: APP_VERSION } = require(path.join(ROOT_DIR, 'package.json'));

function resolveScriptPath() {
  return require.resolve(SCRIPT_FILENAME);
}

function loadRuntime() {
  const resolvedScriptPath = resolveScriptPath();

  if (require.cache[resolvedScriptPath]) {
    delete require.cache[resolvedScriptPath];
  }

  const exports = require(resolvedScriptPath);

  if (!exports || typeof exports !== 'object') {
    throw new Error('script.js did not export a runtime object');
  }

  const { APP_VERSION: runtimeVersion } = exports;

  if (runtimeVersion && runtimeVersion !== APP_VERSION) {
    throw new Error(
      `Combined app version (${runtimeVersion}) does not match package version (${APP_VERSION}).`
    );
  }

  if (!runtimeVersion) {
    exports.APP_VERSION = APP_VERSION;
  }

  delete require.cache[resolvedScriptPath];

  return exports;
}

module.exports = {
  loadRuntime,
};
