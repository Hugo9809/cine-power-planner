import { describe, it, expect } from "vitest";

import {
    normalizeProjectFieldLabel,
    getProductionCompanyLabelSets,
    buildCombinedProductionCompanyDisplay,
    applyCombinedProductionCompanyDisplay,
    expandCombinedProductionCompanyInfo,
    PRODUCTION_COMPANY_FIELD_ORDER
} from '../../../../src/scripts/modules/core/project-manager.js';

describe('Project Manager Module', () => {

    describe('normalizeProjectFieldLabel', () => {
        it('normalizes labels correctly', () => {
            expect(normalizeProjectFieldLabel('  Production Company:  ')).toBe('Production Company');
            expect(normalizeProjectFieldLabel('Label：')).toBe('Label'); // Full-width colon
            expect(normalizeProjectFieldLabel(null)).toBe('');
        });
    });

    describe('getProductionCompanyLabelSets', () => {
        it('merges custom and legacy labels', () => {
            const projectLabels = {
                productionCompany: 'My Custom Label'
            };
            const sets = getProductionCompanyLabelSets(projectLabels);
            expect(sets.productionCompany.has('My Custom Label')).toBe(true);
            expect(sets.productionCompany.has('Production Company')).toBe(true); // Legacy
        });
    });

    describe('expandCombinedProductionCompanyInfo', () => {
        it('parses combined text into fields', () => {
            const raw = `Acme Corp
Street address
123 Main St
Address line 2
Suite 100
City
Cityville
State / Province / Region
State`;
            const expanded = expandCombinedProductionCompanyInfo(raw, {}, {});
            expect(expanded.productionCompany).toBe('Acme Corp');
            expect(expanded.productionCompanyStreet).toBe('123 Main St');
            expect(expanded.productionCompanyStreet2).toBe('Suite 100');
            expect(expanded.productionCompanyRegion).toBe('State');
        });

        it('parses metadata if available', () => {
            const metadata = {
                lines: [
                    { text: 'Cityville', fields: ['productionCompanyCity'] }
                ]
            };
            const expanded = expandCombinedProductionCompanyInfo('Acme Corp', {}, metadata);
            expect(expanded.productionCompanyCity).toBe('Cityville');
        });
    });

    describe('buildCombinedProductionCompanyDisplay', () => {
        it('builds HTML and Text representation', () => {
            const info = {
                productionCompany: 'Acme Corp',
                productionCompanyCity: 'Cityville'
            };
            const display = buildCombinedProductionCompanyDisplay(info, {});
            expect(display.__html).toContain('Acme Corp');
            expect(display.__html).toContain('Cityville');
            expect(display.text).toContain('Acme Corp');
        });

        it('returns null if no info', () => {
            const display = buildCombinedProductionCompanyDisplay({}, {});
            expect(display).toBeNull();
        });
    });

});
