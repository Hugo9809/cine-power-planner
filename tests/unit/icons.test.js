
import {
    createFallbackIconFontKeys,
    formatSvgCoordinate,
    positionSvgMarkup,
    resolveIconGlyph,
    applyIconGlyph
} from '../../src/scripts/modules/helpers/icons.js';

describe('Icons Module', () => {

    describe('createFallbackIconFontKeys', () => {
        test('should return frozen object with keys', () => {
            const keys = createFallbackIconFontKeys();
            expect(Object.isFrozen(keys)).toBe(true);
            expect(keys.UICONS).toBe('uicons');
        });
    });

    describe('formatSvgCoordinate', () => {
        test('should format numbers correctly', () => {
            expect(formatSvgCoordinate(10)).toBe('10');
            expect(formatSvgCoordinate(10.5)).toBe('10.5');
            expect(formatSvgCoordinate(10.123)).toBe('10.12');
            expect(formatSvgCoordinate(NaN)).toBe('0');
        });
    });

    describe('resolveIconGlyph', () => {
        test('should normalize string glyphs', () => {
            const glyph = 'test';
            const resolved = resolveIconGlyph(glyph);
            expect(resolved.char).toBe('test');
            expect(resolved.font).toBe('uicons');
        });

        test('should handle unicode escapes', () => {
            // Just testing the logic flow, precise unicode handling is complex
            const glyph = '\\u0041'; // 'A'
            const resolved = resolveIconGlyph(glyph);
            expect(resolved.char).toBe('A');
        });

        test('should pass through object glyphs', () => {
            const input = { char: 'A', font: 'custom', className: 'foo' };
            const resolved = resolveIconGlyph(input);
            expect(resolved.char).toBe('A');
            expect(resolved.font).toBe('custom');
            expect(resolved.className).toBe('foo');
        });
    });
});
