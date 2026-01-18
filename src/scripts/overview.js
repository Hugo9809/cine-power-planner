/* global currentLang, texts, devices, escapeHtml, generateConnectorSummary, cameraSelect, monitorSelect, videoSelect, distanceSelect, motorSelects, controllerSelects, batterySelect, hotswapSelect, lensSelect, overviewSectionIcons, breakdownListElem, pinWarnElem, dtapWarnElem, getCurrentGearListHtml, currentProjectInfo, generateGearListHtml, getDiagramCss, openDialog, closeDialog, splitGearListHtml, getSafeGearListHtmlSections, iconMarkup, ICON_GLYPHS, deleteCurrentGearList, focusScalePreference, resolveOverviewGearListSections, cineFeaturesConnectionDiagram */

/**
 * @fileoverview Main entry point for Overview Loop.
 * 
 * Refactored to ESM:
 * - Delegates logic to `modules/overview/generator.js`.
 * - Acts as a backward-compatibility shim for `generatePrintableOverview`.
 */

import { generatePrintableOverview } from './modules/overview/generator.js';

// Expose to global scope for legacy compatibility
if (typeof window !== 'undefined') {
    window.generatePrintableOverview = generatePrintableOverview;
}

export { generatePrintableOverview };
