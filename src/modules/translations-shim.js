/**
 * @fileoverview ES Module Shim for Translation/Localization Functions
 *
 * This module re-exports existing global translation functions and data
 * as ES module exports. It provides a bridge between the legacy global-based
 * architecture and the new ES module system.
 *
 * IMPORTANT: This is a shim layer - it does NOT modify the underlying
 * translation system. All functions access the global scope.
 */

/**
 * Safely get a value from the global scope.
 * @param {string} name - Property name on the global scope
 * @returns {*} The global value or undefined
 */
function getGlobal(name) {
    const scope = typeof globalThis !== 'undefined' ? globalThis :
        typeof window !== 'undefined' ? window :
            typeof self !== 'undefined' ? self : {};
    return scope[name];
}

/**
 * Safely get a global function, returning a no-op if not available.
 * @param {string} name - Function name on the global scope
 * @returns {Function} The global function or a no-op
 */
function getGlobalFn(name) {
    const fn = getGlobal(name);
    return typeof fn === 'function' ? fn : () => {
        console.warn(`[translations-shim] ${name} not available yet`);
        return '';
    };
}

// ============================================================================
// Translation Functions
// ============================================================================

/**
 * Get a translated text string by key.
 * This is the primary translation function used throughout the app.
 * @param {string} key - The translation key
 * @param {*} [fallback] - Optional fallback value
 * @returns {string} The translated string
 */
export const getText = (...args) => getGlobalFn('getText')(...args);

/**
 * Alias for getText - commonly used shorthand.
 */
export const t = getText;

/**
 * Update all translatable UI elements.
 */
export const updateUITranslations = (...args) => getGlobalFn('updateUITranslations')(...args);

/**
 * Set the current language.
 * @param {string} langCode - Language code (en, de, es, fr, it)
 */
export const setLanguage = (...args) => getGlobalFn('setLanguage')(...args);

/**
 * Get the current language code.
 * @returns {string} Current language code
 */
export function getCurrentLanguage() {
    return getGlobal('currentLang') || 'en';
}

// ============================================================================
// Translation Data Access
// ============================================================================

/**
 * Get the texts object for the current language.
 * @returns {Object} Current language texts
 */
export function getTexts() {
    const texts = getGlobal('texts');
    const lang = getCurrentLanguage();
    return texts && texts[lang] ? texts[lang] : (texts?.en || {});
}

/**
 * Get category name translations.
 * @returns {Object} Category names for current language
 */
export function getCategoryNames() {
    const categoryNames = getGlobal('categoryNames');
    const lang = getCurrentLanguage();
    return categoryNames && categoryNames[lang] ? categoryNames[lang] : (categoryNames?.en || {});
}

/**
 * Get gear item translations.
 * @returns {Object} Gear item names for current language
 */
export function getGearItems() {
    const gearItems = getGlobal('gearItems');
    const lang = getCurrentLanguage();
    return gearItems && gearItems[lang] ? gearItems[lang] : (gearItems?.en || {});
}

// ============================================================================
// Language List
// ============================================================================

/**
 * Available language codes.
 */
export const AVAILABLE_LANGUAGES = ['en', 'de', 'es', 'fr', 'it'];

/**
 * Language display names.
 */
export const LANGUAGE_NAMES = {
    en: 'English',
    de: 'Deutsch',
    es: 'Español',
    fr: 'Français',
    it: 'Italiano',
};

// ============================================================================
// Default Export
// ============================================================================

export default {
    getText,
    t,
    updateUITranslations,
    setLanguage,
    getCurrentLanguage,
    getTexts,
    getCategoryNames,
    getGearItems,
    AVAILABLE_LANGUAGES,
    LANGUAGE_NAMES,
};
