/*
 * Extracted from app-core-new-1.js to keep module boundaries manageable.
 * Refactored to import from pure ESM module.
 */

import { cineCorePinkModeSupport } from '../modules/core/pink-mode.js';

const PINK_MODE_SUPPORT_API = cineCorePinkModeSupport;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PINK_MODE_SUPPORT_API,
  };
}

if (typeof globalThis !== 'undefined') {
  globalThis.PINK_MODE_SUPPORT_API = PINK_MODE_SUPPORT_API;
} else if (typeof window !== 'undefined') {
  window.PINK_MODE_SUPPORT_API = PINK_MODE_SUPPORT_API;
} else if (typeof self !== 'undefined') {
  self.PINK_MODE_SUPPORT_API = PINK_MODE_SUPPORT_API;
} else if (typeof global !== 'undefined') {
  global.PINK_MODE_SUPPORT_API = PINK_MODE_SUPPORT_API;
}


