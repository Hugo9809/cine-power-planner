/**
 * @fileoverview CORE WIRING HARNESS: Global Scope Bootstrap (Shim)
 * 
 * Imports and executes the modern ESM bootstrap module.
 * Maintains legacy script tag compatibility.
 */

import { bootstrapGlobals } from './modules/globals-bootstrap.js';

(function () {
  const scope =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof window !== 'undefined' && window) ||
    (typeof self !== 'undefined' && self) ||
    (typeof global !== 'undefined' && global) ||
    null;

  if (scope) {
    bootstrapGlobals(scope);
  }
})();
