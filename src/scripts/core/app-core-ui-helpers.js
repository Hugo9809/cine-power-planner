/* global CORE_GLOBAL_SCOPE, ICON_GLYPHS, iconMarkup */
/*
 * Centralised UI helpers shared across the Cine Power Planner runtime.
 *
 * MIGRATION NOTE: Logic moved to `src/scripts/modules/ui-helpers.js`.
 * This file remains as a backwards-compatibility shim to expose
 * globals expected by legacy code.
 */

import {
  escapeHtml,
  escapeButtonLabelSafely,
  resolveButtonIconMarkup,
  setButtonLabelWithIcon,
  whenElementAvailable
} from '../modules/ui-helpers.js';

function detectGlobalScope() {
  if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE === 'object') {
    return CORE_GLOBAL_SCOPE;
  }
  if (typeof globalThis !== 'undefined' && globalThis && typeof globalThis === 'object') {
    return globalThis;
  }
  if (typeof window !== 'undefined' && window && typeof window === 'object') {
    return window;
  }
  if (typeof self !== 'undefined' && self && typeof self === 'object') {
    return self;
  }
  if (typeof global !== 'undefined' && global && typeof global === 'object') {
    return global;
  }
  return null;
}

const GLOBAL_SCOPE = detectGlobalScope();

// Legacy adapter for resolveButtonIconMarkup which originally read global scope
// We wrap it to inject the global iconMarkup if present
function resolveButtonIconMarkupShim(glyph) {
  let iconFactory = null;

  if (typeof iconMarkup === 'function') {
    iconFactory = iconMarkup;
  } else if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.iconMarkup === 'function') {
    iconFactory = GLOBAL_SCOPE.iconMarkup;
  }

  return resolveButtonIconMarkup(glyph, iconFactory);
}

// Legacy adapter for setButtonLabelWithIcon which originally read global scope
// We wrap it to inject the global iconMarkup etc if present
function setButtonLabelWithIconShim(button, label, glyph) {
  let resolvedGlyph = glyph;
  if (typeof resolvedGlyph === 'undefined') {
    if (typeof ICON_GLYPHS === 'object' && ICON_GLYPHS && ICON_GLYPHS.save) {
      resolvedGlyph = ICON_GLYPHS.save;
    }
  }

  let iconFactory = null;
  if (typeof iconMarkup === 'function') {
    iconFactory = iconMarkup;
  } else if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.iconMarkup === 'function') {
    iconFactory = GLOBAL_SCOPE.iconMarkup;
  }

  return setButtonLabelWithIcon(button, label, resolvedGlyph, iconFactory);
}


const namespace = {
  escapeHtml,
  escapeButtonLabelSafely,
  resolveButtonIconMarkup: resolveButtonIconMarkupShim,
  setButtonLabelWithIcon: setButtonLabelWithIconShim,
  whenElementAvailable,
};

if (GLOBAL_SCOPE) {
  const existing =
    GLOBAL_SCOPE.cineCoreUiHelpers && typeof GLOBAL_SCOPE.cineCoreUiHelpers === 'object'
      ? GLOBAL_SCOPE.cineCoreUiHelpers
      : {};

  existing.escapeHtml = escapeHtml;
  existing.escapeButtonLabelSafely = escapeButtonLabelSafely;
  existing.resolveButtonIconMarkup = resolveButtonIconMarkupShim;
  existing.setButtonLabelWithIcon = setButtonLabelWithIconShim;
  existing.whenElementAvailable = whenElementAvailable;

  try {
    GLOBAL_SCOPE.cineCoreUiHelpers = existing;
  } catch (assignError) {
    void assignError;
  }
}

const cineCoreUiHelpers = namespace;
export { cineCoreUiHelpers };
export default namespace;
