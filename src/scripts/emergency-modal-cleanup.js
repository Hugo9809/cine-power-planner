// Emergency Modal Cleanup - Close any stuck dialogs on page load
// SHIM ADAPTER - Imports from src/scripts/modules/emergency-modal-cleanup.js

import { closeStuckDialogs } from './modules/emergency-modal-cleanup.js';

(function () {
    if (typeof document === 'undefined') return;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', closeStuckDialogs);
    } else {
        closeStuckDialogs();
    }

    // Also run after a short delay to catch late-opening dialogs
    setTimeout(closeStuckDialogs, 500);
})();

