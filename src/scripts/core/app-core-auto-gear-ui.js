/**
 * Cine Power Planner Auto Gear UI (Shim)
 *
 * MIGRATION NOTE: Logic moved to `src/scripts/modules/ui/auto-gear-ui.js`.
 * This file remains as a backwards-compatibility shim to expose
 * globals expected by legacy code.
 */

import { initAutoGearUi } from '../modules/ui/auto-gear-ui.js';

const scope =
  (typeof globalThis !== 'undefined' && globalThis) ||
  (typeof window !== 'undefined' && window) ||
  (typeof self !== 'undefined' && self) ||
  (typeof global !== 'undefined' && global) ||
  null;

const existingDocument = (typeof document !== 'undefined' && document) || null;

// Initialize the Auto Gear UI and expose globally
const AUTO_GEAR_UI_EXPORTS = initAutoGearUi(existingDocument, { globalScope: scope });

if (scope && typeof scope === 'object') {
  scope.cineCoreAutoGearUi = AUTO_GEAR_UI_EXPORTS;
  scope.getViewfinderFallbackLabel = AUTO_GEAR_UI_EXPORTS.getViewfinderFallbackLabel;
  scope.getVideoDistributionFallbackLabel = AUTO_GEAR_UI_EXPORTS.getVideoDistributionFallbackLabel;
  scope.normalizeVideoDistributionOptionValue = AUTO_GEAR_UI_EXPORTS.normalizeVideoDistributionOptionValue;
}

export const cineCoreAutoGearUi = AUTO_GEAR_UI_EXPORTS;
export default AUTO_GEAR_UI_EXPORTS;
