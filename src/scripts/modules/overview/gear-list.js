/**
 * @fileoverview OVERVIEW MODULE: Gear List
 * 
 * Logic for processing gear list content, converting selectors to text,
 * and splitting the HTML into project vs gear sections.
 * 
 * @module modules/overview/gear-list
 */

import { logOverview } from './logging.js';

export function convertGearListSelectorsToPlainText(root) {
    if (!root || typeof root.querySelectorAll !== 'function') return;

    const gearSection = root.querySelector('#gearListOutput');
    if (!gearSection) return;

    const selects = gearSection.querySelectorAll('select');
    if (!selects.length) return;

    selects.forEach(select => {
        if (!select) return;

        let displayText = '';
        const options = Array.from(select.options || []);

        if (select.multiple) {
            displayText = options
                .filter(opt => opt.selected)
                .map(opt => opt.textContent.trim())
                .filter(Boolean)
                .join(', ');
        } else {
            const preferred = options.find(opt => opt.selected) || options.find(opt => opt.defaultSelected);
            if (preferred) displayText = preferred.textContent.trim();
        }

        let isEmpty = false;
        if (!displayText) {
            // Fallbacks
            const fallbacks = ['data-empty-label', 'data-placeholder', 'placeholder', 'data-label-off', 'data-default-label'];
            for (const attr of fallbacks) {
                const val = select.getAttribute(attr);
                if (val && val.trim()) {
                    displayText = val.trim();
                    break;
                }
            }
        }

        if (!displayText && select.value && select.value.trim()) displayText = select.value.trim();

        if (!displayText) {
            displayText = '—';
            isEmpty = true;
        }

        const replacement = document.createElement('span');
        replacement.className = 'gear-select-value';
        // Copy attributes for styling/hooks
        if (select.className) replacement.setAttribute('data-gear-select-class', select.className);
        if (select.id) replacement.setAttribute('data-gear-select-id', select.id);
        if (select.name) replacement.setAttribute('data-gear-select-name', select.name);

        replacement.setAttribute('data-gear-select-value', displayText);
        if (isEmpty) replacement.setAttribute('data-gear-select-empty', 'true');

        // Copy custom data- attrs
        Array.from(select.attributes).forEach(attr => {
            if (attr.name.startsWith('data-') && !replacement.hasAttribute(attr.name)) {
                replacement.setAttribute(attr.name, attr.value);
            }
        });

        replacement.textContent = displayText;
        select.replaceWith(replacement);
    });
}

/**
 * Splits generic HTML content into "Project Info" and "Gear List" sections.
 * Logic extracted from legacy catch-block fallback.
 */
export function resolveOverviewGearListSections(html) {
    const normalizedHtml = typeof html === 'string' ? html : '';
    if (!normalizedHtml) return { projectHtml: '', gearHtml: '' };

    const fallbackResult = { projectHtml: '', gearHtml: normalizedHtml };

    // Try global delegates first (resilience)
    const candidates = [];
    const globalScope = (typeof globalThis !== 'undefined' && globalThis) || window || self || global;

    if (typeof getSafeGearListHtmlSections === 'function') {
        candidates.push(getSafeGearListHtmlSections);
    }
    if (globalScope?.cineGearList?.getSafeGearListHtmlSections) {
        candidates.push(globalScope.cineGearList.getSafeGearListHtmlSections);
    }
    if (typeof splitGearListHtml === 'function') {
        candidates.push(splitGearListHtml);
    }
    if (globalScope?.cineGearList?.splitGearListHtml) {
        candidates.push(globalScope.cineGearList.splitGearListHtml);
    }

    for (const fn of candidates) {
        try {
            const result = fn(normalizedHtml);
            if (result && typeof result === 'object') {
                const projectHtml = result.projectHtml || '';
                const gearHtml = result.gearHtml || (projectHtml ? '' : normalizedHtml);
                return { projectHtml, gearHtml };
            }
        } catch (e) {
            logOverview('warn', 'Unable to split gear list HTML using delegate.', e);
        }
    }

    return fallbackResult;
}

// Auto-register global for backward compatibility (replacing the weird catch-block one)
(function exposeOverviewGearListSections() {
    const globalScope = (typeof globalThis !== 'undefined' && globalThis) || window || self || global;
    if (globalScope && !globalScope.resolveOverviewGearListSections) {
        globalScope.resolveOverviewGearListSections = resolveOverviewGearListSections;
    }
})();
