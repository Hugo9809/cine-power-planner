// (function () {

import { cineCoreRuntimeModuleLoader } from '../../../modules/runtime-module-loader.js';

// Re-export the loader for ESM consumers
export { cineCoreRuntimeModuleLoader };

// Also expose as default
export default cineCoreRuntimeModuleLoader;

// Maintain global exposure for legacy scripts that might expect it here
// (Though typically the original file didn't explicitly write to global, 
//  it relied on return value or side-effect depending on how it was loaded).
// The original code exported `cineCoreRuntimeModuleLoader`.

// If this file is treated as a module, explicit global assignment might be needed 
// if other non-module scripts expect it.
function exposeGlobal(loader) {
  if (typeof window !== 'undefined') {
    window.cineCoreRuntimeModuleLoader = loader;
  } else if (typeof globalThis !== 'undefined') {
    globalThis.cineCoreRuntimeModuleLoader = loader;
  }
}

exposeGlobal(cineCoreRuntimeModuleLoader);

// })();
