// This module mirrors the autosave status note into the settings dialog
// SHIM ADAPTER - Imports from src/scripts/modules/autosave-overlay.js

import { initAutosaveOverlay } from './modules/autosave-overlay.js';

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAutosaveOverlay, { once: true });
  } else {
    initAutosaveOverlay();
  }
}

