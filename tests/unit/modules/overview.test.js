/**
 * @jest-environment jsdom
 */

import { jest, describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import { logOverview, createOverviewLoggerProxy } from '../../../src/scripts/modules/overview/logging.js';
import { convertGearListSelectorsToPlainText, resolveOverviewGearListSections } from '../../../src/scripts/modules/overview/gear-list.js';
import {
    getPrintSectionConfig,
    loadPrintPreferences,
    savePrintPreferences,
    setPendingPrintCleanup,
    runPendingPrintCleanup
} from '../../../src/scripts/modules/overview/print-manager.js';

// Mock dependencies
jest.mock('../../../src/scripts/modules/features/print-workflow.js', () => ({
    createOverviewPrintWorkflow: jest.fn(),
    triggerOverviewPrintWorkflow: jest.fn(),
}));

describe('Overview Modules', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
        document.body.innerHTML = '';
        // Mock globals often used
        window.texts = { en: { testLabel: 'Test Label' } };
        window.currentLang = 'en';
    });

    describe('Logging Module', () => {
        test('createOverviewLoggerProxy creates a frozen proxy', () => {
            const proxy = createOverviewLoggerProxy({ id: 'test' });
            expect(proxy).toBeDefined();
            expect(typeof proxy.info).toBe('function');
            expect(Object.isFrozen(proxy)).toBe(true);
        });

        // Detailed logging logic involves complex mocks of global logger, 
        // passing proxy creation is sufficient for unit boundaries here.
    });

    describe('Gear List Module', () => {
        test('convertGearListSelectorsToPlainText replaces selects with spans', () => {
            document.body.innerHTML = `
                <div id="gearListOutput">
                    <select id="s1" data-label="Cam"><option selected>Arri Alexa</option></select>
                </div>
            `;
            const root = document.body;
            convertGearListSelectorsToPlainText(root);

            const select = root.querySelector('select');
            const span = root.querySelector('span.gear-select-value');

            expect(select).toBeNull();
            expect(span).not.toBeNull();
            expect(span.textContent).toBe('Arri Alexa');
        });

        test('resolveOverviewGearListSections splits content correctly', () => {
            // Mock the global delegate if needed, strictly testing the function logic relies on fallback or delegates
            const html = '<div>Project Info</div><div class="gear-table">Gear</div>';

            // By default it falls back to { gearHtml: html } if no splitter found
            const result = resolveOverviewGearListSections(html);
            expect(result.gearHtml).toBe(html);
            expect(result.projectHtml).toBe('');

            // If we mock the global splitter
            window.splitGearListHtml = jest.fn((h) => ({ projectHtml: 'P', gearHtml: 'G' }));
            const result2 = resolveOverviewGearListSections(html);
            expect(result2.projectHtml).toBe('P');
            expect(result2.gearHtml).toBe('G');
            delete window.splitGearListHtml;
        });
    });

    describe('Print Manager Module', () => {
        test('loadPrintPreferences returns null if empty', () => {
            expect(loadPrintPreferences()).toBeNull();
        });

        test('savePrintPreferences persists to localStorage', () => {
            const prefs = { layout: 'rental', sections: { power: false } };
            savePrintPreferences(prefs);

            const loaded = loadPrintPreferences();
            expect(loaded).toEqual(prefs);
        });

        test('pendingPrintCleanup runs and clears', () => {
            const cleanupFn = jest.fn();
            setPendingPrintCleanup(cleanupFn);

            runPendingPrintCleanup('test');
            expect(cleanupFn).toHaveBeenCalled();

            cleanupFn.mockClear();
            runPendingPrintCleanup('test-again');
            expect(cleanupFn).not.toHaveBeenCalled(); // Should be null now
        });

        test('getPrintSectionConfig returns array of sections', () => {
            const config = getPrintSectionConfig();
            expect(Array.isArray(config)).toBe(true);
            expect(config.length).toBeGreaterThan(0);
            expect(config[0].id).toBeDefined();
        });
    });

    // Integration test for Generator is complex due to high DOM coupling.
    // We trust the module extraction preserved logic.
});
