/**
 * @fileoverview SHIM: Force Populate
 * 
 * Main boot script that ensures UI population and triggers V2 initialization.
 * Imports core logic from ESM module.
 */

import { V2Bootstrap } from './v2/bootstrap.js';
import { startForcePopulate } from './modules/force-populate.js';

(function () {
    const scope = typeof window !== 'undefined' ? window : undefined;
    if (scope) {
        startForcePopulate(scope, V2Bootstrap);
    }
})();
