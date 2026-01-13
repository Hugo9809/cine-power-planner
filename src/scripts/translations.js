import { data as enData } from './translations/en.js';

/**
 * Translations Loader (ESM Version)
 * Replaces legacy functionality of querying LOCALE_SCRIPTS and loading via script tags.
 * Now uses dynamic imports.
 */

const DEFAULT_LANGUAGE = 'en';
const LOCALE_IMPORTS = {
  de: () => import('./translations/de.js'),
  es: () => import('./translations/es.js'),
  fr: () => import('./translations/fr.js'),
  it: () => import('./translations/it.js'),
};

const loadedLocales = new Set(['en']);

// Resolve global scope
const scope = typeof globalThis !== 'undefined' ? globalThis :
  typeof window !== 'undefined' ? window :
    typeof self !== 'undefined' ? self : {};

// Ensure global containers
scope.texts = scope.texts || {};
scope.categoryNames = scope.categoryNames || {};
scope.gearItems = scope.gearItems || {};

/**
 * Helper: Clone a value deeply
 */
function cloneTranslationValue(value) {
  if (Array.isArray(value)) {
    return value.map(item => cloneTranslationValue(item));
  }
  if (value && typeof value === 'object') {
    const clone = {};
    Object.keys(value).forEach(key => {
      clone[key] = cloneTranslationValue(value[key]);
    });
    return clone;
  }
  return value;
}

/**
 * Helper: Freeze object recursively
 */
function freezeTranslationTree(value, seen = new WeakMap()) {
  if (!value || typeof value !== 'object') return value;

  if (seen.has(value)) return value;
  seen.set(value, true);

  if (Array.isArray(value)) {
    value.forEach(item => freezeTranslationTree(item, seen));
  } else {
    Object.values(value).forEach(item => freezeTranslationTree(item, seen));
  }

  try {
    if (!Object.isFrozen(value)) Object.freeze(value);
  } catch (e) { /* ignore */ }

  return value;
}

/**
 * Helper: Align translation value with reference (EN)
 */
function alignTranslationValue(referenceValue, translationValue) {
  const referenceType = Array.isArray(referenceValue) ? 'array' :
    referenceValue === null ? 'null' : typeof referenceValue;

  const translationType = Array.isArray(translationValue) ? 'array' :
    translationValue === null ? 'null' : typeof translationValue;

  if (referenceType === 'array') {
    if (translationType !== 'array') return cloneTranslationValue(referenceValue);

    // Arrays need explicit length matching
    const maxLength = referenceValue.length;
    const aligned = new Array(maxLength);
    for (let i = 0; i < maxLength; i++) {
      const refItem = referenceValue[i];
      const transItem = i < translationValue.length ? translationValue[i] : undefined;
      aligned[i] = alignTranslationValue(refItem, transItem);
    }
    return aligned;
  }

  if (referenceType === 'object') {
    if (translationType !== 'object') return cloneTranslationValue(referenceValue);

    const alignedObject = translationValue && typeof translationValue === 'object' ? translationValue : {};
    const referenceKeys = Object.keys(referenceValue || {});

    // Align keys
    referenceKeys.forEach(key => {
      const refChild = referenceValue[key];
      const transChild = Object.prototype.hasOwnProperty.call(alignedObject, key) ? alignedObject[key] : undefined;
      alignedObject[key] = alignTranslationValue(refChild, transChild);
    });

    // Remove extra keys
    Object.keys(alignedObject).forEach(key => {
      if (!Object.prototype.hasOwnProperty.call(referenceValue, key)) {
        delete alignedObject[key];
      }
    });

    return alignedObject;
  }

  if (translationType === referenceType && typeof translationValue !== 'undefined') {
    return translationValue;
  }

  return cloneTranslationValue(referenceValue);
}

/**
 * Helper: Align entire dataset
 */
function alignDataset(referenceDataset, localeDataset) {
  const result = {};
  const keys = Object.keys(referenceDataset || {});
  keys.forEach(key => {
    const refVal = referenceDataset[key];
    const locVal = localeDataset && Object.prototype.hasOwnProperty.call(localeDataset, key) ? localeDataset[key] : undefined;
    result[key] = alignTranslationValue(refVal, locVal);
  });
  return result;
}

/**
 * Register Locale Data into Global Scope
 */
function registerLocaleData(locale, data) {
  if (!locale || !data) return;

  const localeTexts = data.texts || {};
  const localeCategoryNames = data.categoryNames || {};
  const localeGearItems = data.gearItems || {};

  // Get EN (reference)
  let defaultLocale = scope.texts[DEFAULT_LANGUAGE] ? {
    texts: scope.texts[DEFAULT_LANGUAGE],
    categoryNames: scope.categoryNames[DEFAULT_LANGUAGE],
    gearItems: scope.gearItems[DEFAULT_LANGUAGE]
  } : null;

  if (locale === DEFAULT_LANGUAGE) {
    // Freeze EN
    freezeTranslationTree(localeTexts);
    freezeTranslationTree(localeCategoryNames);
    freezeTranslationTree(localeGearItems);
    defaultLocale = { texts: localeTexts, categoryNames: localeCategoryNames, gearItems: localeGearItems };
  }

  const reference = defaultLocale || { texts: {}, categoryNames: {}, gearItems: {} };

  // Align
  const alignedTexts = locale === DEFAULT_LANGUAGE ? reference.texts : alignDataset(reference.texts, localeTexts);
  const alignedCategoryNames = locale === DEFAULT_LANGUAGE ? reference.categoryNames : alignDataset(reference.categoryNames, localeCategoryNames);
  const alignedGearItems = locale === DEFAULT_LANGUAGE ? reference.gearItems : alignDataset(reference.gearItems, localeGearItems);

  // Assign to globals
  scope.texts[locale] = alignedTexts;
  scope.categoryNames[locale] = alignedCategoryNames;
  scope.gearItems[locale] = alignedGearItems;
}

/**
 * Resolve Locale Key
 */
function resolveLocaleKey(candidate) {
  if (typeof candidate !== 'string') return DEFAULT_LANGUAGE;
  const trimmed = candidate.trim();
  if (!trimmed) return DEFAULT_LANGUAGE;
  const lower = trimmed.toLowerCase();

  if (LOCALE_IMPORTS[lower]) return lower;

  // split 'en-US' -> 'en'
  const short = lower.split('-')[0];
  if (LOCALE_IMPORTS[short]) return short;

  return DEFAULT_LANGUAGE;
}

/**
 * Load Language (Public API)
 */
export async function loadLanguage(locale) {
  if (loadedLocales.has(locale)) return;

  const key = resolveLocaleKey(locale);
  if (key === DEFAULT_LANGUAGE && loadedLocales.has(DEFAULT_LANGUAGE)) return; // Already loaded EN

  if (LOCALE_IMPORTS[key]) {
    try {
      const module = await LOCALE_IMPORTS[key]();
      registerLocaleData(key, module.data);
      loadedLocales.add(key);
      loadedLocales.add(locale); // Mark requested locale as loaded too
    } catch (e) {
      console.error(`Failed to load locale: ${key}`, e);
    }
  }
}

// Initialize EN
registerLocaleData(DEFAULT_LANGUAGE, enData);
loadedLocales.add(DEFAULT_LANGUAGE);

// Expose loader interface globally for legacy compatibility
scope.__cineTranslationsLoader__ = {
  loadLanguage
};

// Export for ESM usage
export default {
  loadLanguage
};
