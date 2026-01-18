/**
 * @fileoverview SHIM: Restore Verification
 * 
 * Provides backward compatibility for the global `__cineRestoreVerification` API.
 * Imports logic from the ESM module.
 */

import { buildReport, buildFailureReport } from './modules/restore-verification.js';

(function () {
  const GLOBAL_SCOPE =
    (typeof globalThis !== 'undefined' && globalThis)
    || (typeof window !== 'undefined' && window)
    || (typeof self !== 'undefined' && self)
    || (typeof global !== 'undefined' && global)
    || null;

  const api = {
    buildReport,
    buildFailureReport,
  };

  // CommonJS support for legacy tests/environments
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }

  // Global exposure
  if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE === 'object') {
    try {
      Object.defineProperty(GLOBAL_SCOPE, '__cineRestoreVerification', {
        configurable: true,
        enumerable: false,
        writable: true,
        value: api,
      });
    } catch (error) {
      void error;
      GLOBAL_SCOPE.__cineRestoreVerification = api;
    }
  }
})();
