import { normaliseTextEntryValue, resolveTextEntry } from '../../src/scripts/modules/text.js';

describe('Text Utilities Module', () => {

    describe('normaliseTextEntryValue', () => {
        it('returns the string as is', () => {
            expect(normaliseTextEntryValue('Hello')).toBe('Hello');
        });

        it('converts numbers to strings', () => {
            expect(normaliseTextEntryValue(123)).toBe('123');
        });

        it('converts booleans to strings', () => {
            expect(normaliseTextEntryValue(true)).toBe('true');
        });

        it('joins array with default separator (newline)', () => {
            const input = ['Line 1', 'Line 2'];
            expect(normaliseTextEntryValue(input)).toBe('Line 1\nLine 2');
        });

        it('joins array with custom separator', () => {
            const input = ['A', 'B'];
            expect(normaliseTextEntryValue(input, ', ')).toBe('A, B');
        });

        it('extracts text property from object', () => {
            const obj = { text: 'Extracted' };
            expect(normaliseTextEntryValue(obj)).toBe('Extracted');
        });

        it('recurses if object.text is array', () => {
            const obj = { text: ['Line A', 'Line B'] };
            expect(normaliseTextEntryValue(obj)).toBe('Line A\nLine B');
        });

        it('falls back to label property', () => {
            const obj = { label: 'My Label' };
            expect(normaliseTextEntryValue(obj)).toBe('My Label');
        });

        it('returns stringified object if no specific props', () => {
            // Just checking it doesn't crash, specific logic depends on implementation details
            // The implementation says: if (objectString && objectString !== '[object Object]') return objectString
            // So a plain object usually returns '' (empty string) because String({}) is [object Object]
            expect(normaliseTextEntryValue({})).toBe('');
        });
    });

    describe('resolveTextEntry', () => {
        const primary = {
            'welcome': 'Hello World',
            'complex': ['Line 1', 'Line 2']
        };
        const fallback = {
            'welcome': 'Default Hello',
            'missing_in_primary': 'Found in Fallback'
        };

        it('resolves simple key from primary', () => {
            expect(resolveTextEntry(primary, fallback, 'welcome')).toBe('Hello World');
        });

        it('resolves complex key from primary and normalizes it', () => {
            expect(resolveTextEntry(primary, fallback, 'complex')).toBe('Line 1\nLine 2');
        });

        it('falls back if key missing in primary', () => {
            expect(resolveTextEntry(primary, fallback, 'missing_in_primary')).toBe('Found in Fallback');
        });

        it('returns normalized default if key missing everywhere', () => {
            expect(resolveTextEntry(primary, fallback, 'not_exist', 'DefaultValue')).toBe('DefaultValue');
        });

        it('returns empty string if key missing and no default', () => {
            expect(resolveTextEntry(primary, fallback, 'not_exist')).toBe('');
        });
    });

});
