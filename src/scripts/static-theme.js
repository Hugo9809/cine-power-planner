/**
 * @fileoverview SHIM: Static Theme
 * 
 * This file is maintained for backward compatibility.
 * It imports the core logic from the new ESM module and applies it.
 */

import { applyStaticTheme } from './modules/static-theme.js';

(function () {
  const scope = typeof window !== 'undefined' ? window : undefined;

  applyStaticTheme(scope);

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => applyStaticTheme(scope));
    }
  }
})();
