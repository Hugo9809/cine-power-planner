const path = require('path');
const { createRequire } = require('module');

const ROOT_DIR = path.join(__dirname, '..', '..');
const MODULES_DIR = path.join(ROOT_DIR, 'src', 'scripts', 'modules');
const RUNTIME_PATH = path.join(MODULES_DIR, 'runtime.js');

const modulesRequire = createRequire(RUNTIME_PATH);

function loadModule(request) {
  try {
    return modulesRequire(request);
  } catch (error) {
    // console.error(`Error loading module ${request}:`, error);
    void error;
  }

  return null;
}

function loadModuleArchitectureStack() {
  const architecture = loadModule('./architecture.js') || {};
  const helpers = loadModule('./architecture-helpers.js') || {};
  const kernel = loadModule('./architecture-kernel.js') || {};
  const base = loadModule('./base.js') || {};

  const pendingQueueKey =
    (typeof helpers.pendingQueueKey === 'string' && helpers.pendingQueueKey)
      ? helpers.pendingQueueKey
      : '__cinePendingModuleRegistrations__';

  return {
    architecture,
    helpers,
    kernel,
    base,
    pendingQueueKey,
  };
}

module.exports = {
  loadModuleArchitectureStack,
};

