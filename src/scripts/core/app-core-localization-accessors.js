/*
 * Extracted from app-core-new-1.js to keep module boundaries manageable.
 * The logic remains identical to protect autosave, offline, and localization behaviours.
 */

import {
  createLocalizationAccessorsFactory,
  normalizeLanguageCode,
  isRtlLanguage,
  resolveDocumentDirection,
  applyLocaleMetadata
} from '../modules/core/localization-accessors.js';

var ACTIVE_LOCALIZATION_ACCESSORS = createLocalizationAccessorsFactory();

// Re-export variables to global scope if needed by legacy
if (typeof window !== 'undefined') {
  window.ACTIVE_LOCALIZATION_ACCESSORS = ACTIVE_LOCALIZATION_ACCESSORS;
  window.normalizeLanguageCode = normalizeLanguageCode;
  window.isRtlLanguage = isRtlLanguage;
  window.resolveDocumentDirection = resolveDocumentDirection;
  window.applyLocaleMetadata = applyLocaleMetadata;
}

// Keep existing minimal fallback for getLanguageTexts
const existingGetLanguageTexts = typeof getLanguageTexts === 'function' ? getLanguageTexts : null;
var resolvedGetLanguageTexts = existingGetLanguageTexts || function () { return {}; };

try {
  if (typeof getLanguageTexts === 'undefined' && typeof window !== 'undefined') {
    window.getLanguageTexts = resolvedGetLanguageTexts;
  }
} catch (e) { /* ignore */ }

// Export nothing (side-effect module in legacy system)
