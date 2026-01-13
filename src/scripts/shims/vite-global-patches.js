/**
 * Vite Global Patches
 * 
 * This file is imported FIRST by main.js to ensure legacy global variables
 * are available before any other modules (like app-core-new-1.js) are evaluated.
 * 
 * This works around ESM evaluation order where imports are hoisted above
 * the executing body of the importer.
 */

import { getCoreGlobalObject } from '../core/app-core-runtime-global-tools.js';
import { iconGlyph, ICON_GLYPHS, iconMarkup } from '../modules/icons.js';

if (typeof window !== 'undefined') {
    console.log('[Vite Global Patches] Applying global shims...');

    // Expose getCoreGlobalObject
    window.getCoreGlobalObject = getCoreGlobalObject;

    // Expose CORE_GLOBAL_SCOPE
    window.CORE_GLOBAL_SCOPE = window;

    // Expose Icon Helpers
    window.iconGlyph = iconGlyph;
    window.ICON_GLYPHS = ICON_GLYPHS;
    window.iconMarkup = iconMarkup;

    // Stub Legacy Core Runtime Globals
    // These are expected to be defined by app-core-new-1.js or friends, but 
    // circular dependencies or split files might leave them undefined momentarily.
    if (typeof window.CORE_RUNTIME_CANDIDATE_SCOPES === 'undefined') {
        window.CORE_RUNTIME_CANDIDATE_SCOPES = null;
    }
    if (typeof window.CORE_RUNTIME_STATE_SUPPORT === 'undefined') {
        window.CORE_RUNTIME_STATE_SUPPORT = null;
    }

    console.log('[Vite Global Patches] Shims applied.');
}
