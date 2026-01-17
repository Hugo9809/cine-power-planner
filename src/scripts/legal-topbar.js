/**
 * @fileoverview SHIM: Legal Top Bar
 * 
 * This file is maintained for backward compatibility.
 * It imports the core logic from the new ESM module and initializes it.
 */

import { initTopBarControls } from './modules/legal-topbar.js';

(function () {
  'use strict';

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        initTopBarControls(typeof window !== 'undefined' ? window : undefined);
      });
    } else {
      initTopBarControls(typeof window !== 'undefined' ? window : undefined);
    }
  }
})();
