import { describe, it, expect } from "vitest";

import {
    generateConnectorSummary,
    suggestChargerCounts,
    addArriKNumber
} from '../../../../src/scripts/modules/core/connector-summary.js';

describe('Connector Summary Module', () => {

    describe('suggestChargerCounts', () => {
        it('calculates optimal chargers', () => {
            expect(suggestChargerCounts(4)).toEqual({ quad: 1, dual: 0, single: 0 });
            expect(suggestChargerCounts(8)).toEqual({ quad: 2, dual: 0, single: 0 });
            expect(suggestChargerCounts(2)).toEqual({ quad: 0, dual: 1, single: 0 });
            expect(suggestChargerCounts(1)).toEqual({ quad: 0, dual: 1, single: 0 }); // Remainder 1 -> Dual
            expect(suggestChargerCounts(3)).toEqual({ quad: 1, dual: 0, single: 0 }); // Remainder 3 -> Quad
            expect(suggestChargerCounts(6)).toEqual({ quad: 1, dual: 1, single: 0 }); // 4 + 2
        });
    });

    describe('addArriKNumber', () => {
        it('adds K-number if found in devices', () => {
            const mockDevices = {
                lenses: {
                    'ARRI Existing Lens': { brand: 'ARRI', kNumber: 'K1.23456' }
                }
            };
            const result = addArriKNumber('ARRI Existing Lens', { devices: mockDevices });
            expect(result).toBe('ARRI K1.23456 Existing Lens');
        });

        it('returns original if not found', () => {
            const result = addArriKNumber('Unknown Lens', { devices: {} });
            expect(result).toBe('Unknown Lens');
        });
    });

    describe('generateConnectorSummary', () => {
        const mockDeps = {
            focusScalePreference: 'metric',
            normalizeFocusScale: (v) => v,
            currentLang: 'en',
            diagramConnectorIcons: { powerOut: 'P-Out' },
            powerInputTypes: () => ['Gold Mount'],
            ICON_GLYPHS: { gears: '⚙️' },
            DIAGRAM_MONITOR_ICON: '📺',
            parseBatteryCurrentLimit: () => 10,
            iconMarkup: (glyph) => `[ICON:${glyph}]`
        };

        it('generates summary for valid device', () => {
            const device = {
                powerDrawWatts: 50,
                weight_g: 1000,
                power: {
                    powerDistributionOutputs: [{ type: 'D-Tap', voltage: '14.4' }]
                }
            };

            const html = generateConnectorSummary(device, mockDeps);
            expect(html).toContain('50 W');
            expect(html).toContain('1,000 g'); // Assuming metric check passes defaults
            expect(html).toContain('D-Tap (14.4V)');
            expect(html).toContain('Gold Mount');
            expect(html).toContain('[ICON:P-Out]');
        });

        it('returns empty string for invalid device', () => {
            expect(generateConnectorSummary(null)).toBe('');
        });
    });

});
