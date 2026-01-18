/**
 * @fileoverview CORE MODULE: Localization Accessors
 * 
 * Provides pure utility functions for resolving localization state (RTL, direction, etc.)
 * without relying on global scope pollution.
 * 
 * @module modules/core/localization-accessors
 */

/**
 * Normalizes a language code string.
 * @param {string} lang - The language code to normalize.
 * @param {string} defaultLang - Fallback language if normalization fails or input is empty.
 * @returns {string} Normalized language code.
 */
export function normalizeLanguageCode(lang, defaultLang = 'en') {
    if (!lang) {
        return defaultLang;
    }
    try {
        const normalized = String(lang).trim().toLowerCase();
        return normalized || defaultLang;
    } catch {
        return defaultLang;
    }
}

/**
 * Checks if a language code corresponds to an RTL language.
 * @param {string} lang - The language code.
 * @param {string[]} rtlCodes - Array of RTL language codes.
 * @returns {boolean} True if RTL.
 */
export function isRtlLanguage(lang, rtlCodes = ['ar', 'fa', 'he', 'ur']) {
    const defaultLang = 'en';
    const normalized = normalizeLanguageCode(lang, defaultLang);
    const base = normalized.split('-')[0];
    return rtlCodes.indexOf(base) !== -1;
}

/**
 * Resolves the document direction ('ltr' or 'rtl') based on language or DOM state.
 * @param {string} lang - The language code.
 * @param {string[]} rtlCodes - custom rtl codes.
 * @param {object} doc - Document object reference (optional, defaults to global document).
 * @returns {string} 'rtl' or 'ltr'.
 */
export function resolveDocumentDirection(lang, rtlCodes, doc) {
    const documentRef = doc || (typeof document !== 'undefined' ? document : null);

    if (documentRef && documentRef.documentElement) {
        try {
            const docDir = documentRef.documentElement.getAttribute('dir');
            if (docDir) {
                return docDir;
            }
        } catch { /* ignore */ }
    }

    return isRtlLanguage(lang, rtlCodes) ? 'rtl' : 'ltr'; // Fallback logic
}

/**
 * Applies locale metadata (lang/dir) to a target DOM element.
 * @param {HTMLElement} target - The target element.
 * @param {string} lang - Language code.
 * @param {string} direction - 'rtl' or 'ltr'.
 */
export function applyLocaleMetadata(target, lang, direction) {
    if (!target) return;

    if (lang) {
        try {
            target.lang = lang;
        } catch { /* ignore */ }
    }

    if (direction) {
        try {
            target.dir = direction;
        } catch { /* ignore */ }
    }
}

/**
 * Factory to create a bound set of accessors.
 * Useful for legacy shims that expect a structured object.
 */
export function createLocalizationAccessorsFactory(config = {}) {
    const {
        defaultLanguage = 'en',
        rtlLanguageCodes = ['ar', 'fa', 'he', 'ur']
    } = config;

    return {
        normalizeLanguageCode: (lang) => normalizeLanguageCode(lang, defaultLanguage),
        isRtlLanguage: (lang) => isRtlLanguage(lang, rtlLanguageCodes),
        resolveDocumentDirection: (lang, doc) => resolveDocumentDirection(lang, rtlLanguageCodes, doc),
        applyLocaleMetadata,
        defaultLanguage,
        rtlLanguageCodes
    };
}
