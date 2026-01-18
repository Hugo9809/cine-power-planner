import { loadLanguage, initDefaultLanguage } from './modules/translations.js';

/**
 * Translations Loader (Shim)
 * Maintains legacy global API compatibility.
 */

// Resolve global scope
const scope = typeof globalThis !== 'undefined' ? globalThis :
  typeof window !== 'undefined' ? window :
    typeof self !== 'undefined' ? self : {};

// Initialize Default Language immediately
initDefaultLanguage(scope);

// shim wrapper to inject scope
async function loadLanguageShim(locale) {
  return loadLanguage(locale, scope);
}

// Expose loader interface globally for legacy compatibility
scope.__cineTranslationsLoader__ = {
  loadLanguage: loadLanguageShim
};

// Export for ESM usage
export { loadLanguageShim as loadLanguage };
export default {
  loadLanguage: loadLanguageShim
};
