import cineRuntimeGuard from './modules/runtime-guard.js';

/*
 * script.js - Legacy bootstrap logic adapted for ESM/Vite.
 * 
 * Previously this file was responsible for loading all other modules.
 * In the Vite build, modules are imported via main.js.
 * This file now only handles:
 * 1. Global Version Exposure
 * 2. Runtime Guard Bootstrapping
 */

const APP_VERSION = import.meta.env.APP_VERSION || '0.0.0';

function exposeVersionGlobally(version) {
  if (typeof window !== 'undefined') {
    window.APP_VERSION = version;
    window.CPP_APP_VERSION = version;
  }
  if (typeof globalThis !== 'undefined') {
    globalThis.APP_VERSION = version;
    globalThis.CPP_APP_VERSION = version;
  }
}

// 1. Expose Version
exposeVersionGlobally(APP_VERSION);

// 2. Bootstrap Runtime Guard
const GLOBAL_SCOPE = (typeof globalThis !== 'undefined' && globalThis) || (typeof window !== 'undefined' && window) || self;

if (cineRuntimeGuard && typeof cineRuntimeGuard.bootstrap === 'function') {
  try {
    cineRuntimeGuard.bootstrap(GLOBAL_SCOPE, {
      warnOnFailure: true,
      throwOnFailure: false,
    });
    console.log('✅ Runtime Guard bootstrapped via script.js');
  } catch (error) {
    console.error('cineRuntimeGuard.bootstrap failed during startup.', error);
  }
}
