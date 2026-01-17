/**
 * UI Feedback Module
 * SHIM ADAPTER - Imports from src/scripts/modules/ui-feedback.js
 * 
 * Provides a global loading overlay for long-running operations.
 */

import { showLoading, hideLoading } from './modules/ui-feedback.js';

// Expose globally for classic scripts
if (typeof window !== 'undefined') {
    window.cineUiFeedback = {
        showLoading,
        hideLoading
    };
}
