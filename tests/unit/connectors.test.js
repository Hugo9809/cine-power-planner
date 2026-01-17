
import {
    createFallbackSafeGenerateConnectorSummary
} from '../../src/scripts/modules/helpers/connectors.js';

describe('Connectors Module', () => {

    describe('createFallbackSafeGenerateConnectorSummary', () => {
        test('should return a function', () => {
            const fn = createFallbackSafeGenerateConnectorSummary();
            expect(typeof fn).toBe('function');
        });

        test('should generate simple summary from device object', () => {
            const fn = createFallbackSafeGenerateConnectorSummary();
            const device = { 'LEMO_2_PIN': '2' };
            // Logic replaces underscores with spaces
            expect(fn(device)).toBe('LEMO 2 PIN: 2');
        });

        test('should handle empty or invalid inputs', () => {
            const fn = createFallbackSafeGenerateConnectorSummary();
            expect(fn(null)).toBe('');
            expect(fn({})).toBe('');
        });
    });
});
