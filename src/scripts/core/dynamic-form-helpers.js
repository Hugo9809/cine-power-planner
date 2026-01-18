/**
 * Cine Power Planner - Dynamic Form Helpers
 * 
 * Re-implementation of missing dynamic form logic for Device Library.
 * Refactored to import from pure ESM modules.
 */

import { clearDynamicFields, placeWattField, buildDynamicFields } from '../modules/ui/dynamic-forms.js';

const getScope = () => (typeof window !== 'undefined' ? window : globalThis);

// Attach to global scope for legacy compatibility
const globalScope = getScope();
if (globalScope) {
    globalScope.clearDynamicFields = clearDynamicFields;
    globalScope.placeWattField = placeWattField;
    globalScope.buildDynamicFields = buildDynamicFields;
}

export { clearDynamicFields, placeWattField, buildDynamicFields };
