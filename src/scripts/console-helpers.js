// console-helpers.js - Ensures console methods stay writable for diagnostics tooling.
// SHIM ADAPTER - Imports from src/scripts/modules/console-helpers.js

import { ensureConsoleMethodsWritable, detectGlobalScope } from './modules/console-helpers.js';

export { ensureConsoleMethodsWritable };

const globalScope = detectGlobalScope();

if (globalScope && typeof globalScope === 'object') {
  try {
    if (typeof globalScope.__cineEnsureConsoleMethodsWritable !== 'function') {
      globalScope.__cineEnsureConsoleMethodsWritable = ensureConsoleMethodsWritable;
    }
  } catch (exposeError) {
    void exposeError;
  }
}
