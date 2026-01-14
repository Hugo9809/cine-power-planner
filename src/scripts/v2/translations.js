/**
 * V2 Translations Bridge
 * 
 * This module ensures V2 UI views can access translations from the main locale files.
 * Previously, this file contained hardcoded English strings. Now it simply verifies
 * that the main translation system has loaded the V2 keys.
 * 
 * The actual V2 translations are now in:
 * - src/scripts/translations/en.js
 * - src/scripts/translations/de.js
 * - src/scripts/translations/es.js
 * - src/scripts/translations/fr.js
 * - src/scripts/translations/it.js
 */

// Polyfill global for legacy code
const global = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : {};

// V2 required keys - used to verify translations are loaded
const V2_REQUIRED_KEYS = [
    'contactsViewTitle',
    'rulesViewTitle',
    'ownGearViewTitle',
    'deviceLibraryTitle',
    'buttonAddContact',
    'buttonAddRule',
    'buttonAddGearItem',
    'v2.dashboard.header.title',
    'v2.dashboard.actions.newProject',
    'v2.dashboard.actions.importProject'
];

/**
 * Verify V2 translations are available
 * Returns true if all required V2 keys are present
 */
function verifyV2Translations() {
    if (!global.texts || !global.texts.en) {
        console.warn('[V2 Translations] Main translation system not loaded');
        return false;
    }

    const resolvePath = (obj, path) => path.split('.')
        .reduce((acc, key) => (acc && typeof acc === 'object' && key in acc ? acc[key] : undefined), obj);
    const missing = V2_REQUIRED_KEYS.filter(key => resolvePath(global.texts.en, key) === undefined);

    if (missing.length > 0) {
        console.warn('[V2 Translations] Missing keys:', missing);
        return false;
    }

    console.log('[V2 Translations] All V2 keys verified');
    return true;
}

// Run verification on load
const isReady = verifyV2Translations();

// Export for testing
export { verifyV2Translations, V2_REQUIRED_KEYS, isReady };
export default { verifyV2Translations, isReady };
