/**
 * @fileoverview SHIM: Loading Indicator Bootstrap
 * 
 * This file is maintained for backward compatibility.
 * It imports the core logic from the new ESM module and initializes it.
 */

import { initLoadingIndicator } from './modules/loading-indicator.js';

// Initialize the loading indicator on the global scope
initLoadingIndicator(typeof window !== 'undefined' ? window : this);
