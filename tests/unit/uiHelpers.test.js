import {
    escapeHtml,
    escapeButtonLabelSafely,
    resolveButtonIconMarkup,
    whenElementAvailable
} from '../../src/scripts/modules/ui-helpers.js';

const vi = {
    fn: (...args) => jest.fn(...args),
    spyOn: (...args) => jest.spyOn(...args),
    useFakeTimers: () => jest.useFakeTimers(),
    useRealTimers: () => jest.useRealTimers(),
    advanceTimersByTime: (ms) => jest.advanceTimersByTime(ms)
};

describe('UI Helpers Module', () => {

    describe('escapeHtml', () => {
        let originalDocument;

        beforeEach(() => {
            originalDocument = global.document;
        });

        afterEach(() => {
            global.document = originalDocument;
        });

        it('uses DOM implementation if available', () => {
            // Mock minimal DOM
            const div = { innerHTML: '', textContent: '' };
            const createElement = vi.fn().mockReturnValue(div);
            global.document = { createElement };

            const result = escapeHtml('<b>Bold</b>');
            expect(createElement).toHaveBeenCalledWith('div');
            expect(div.textContent).toBe('<b>Bold</b>');
            // In a real DOM, setting textContent escapes HTML chars in innerHTML.
            // Our mock is simplistic, so we manually check if we triggered the DOM textContent assignment path.
            // To properly test the ESCAPING via DOM, we'd need JSDOM (which Vitest usually provides).
            // Let's assume JSDOM is present in the environment for typical usage.

            // If JSDOM is active, this should work "for real"
            if (originalDocument && originalDocument.createElement) {
                expect(escapeHtml('<script>')).toBe('&lt;script&gt;');
            }
        });

        it('falls back to regex replacement if no document', () => {
            global.document = undefined;
            expect(escapeHtml('<"&>')).toBe('&lt;&quot;&amp;&gt;');
        });
    });

    describe('escapeButtonLabelSafely', () => {
        it('returns empty string for non-strings', () => {
            expect(escapeButtonLabelSafely(123)).toBe('');
        });

        it('escapes dangerous characters', () => {
            expect(escapeButtonLabelSafely('<script>')).toContain('&lt;script&gt;');
        });
    });

    describe('resolveButtonIconMarkup', () => {
        it('returns empty string if no glyph', () => {
            expect(resolveButtonIconMarkup(null)).toBe('');
        });

        it('uses provided iconFactory', () => {
            const factory = vi.fn().mockReturnValue('<icon>');
            const glyph = { char: 'A' };
            expect(resolveButtonIconMarkup(glyph, factory)).toBe('<icon>');
            expect(factory).toHaveBeenCalledWith(glyph, 'btn-icon');
        });

        it('falls back to internal logic if no factory', () => {
            const glyph = { char: 'X', size: 16 };
            const markup = resolveButtonIconMarkup(glyph);
            expect(markup).toContain('icon-glyph');
            expect(markup).toContain('btn-icon');
            expect(markup).toContain('X');
        });
    });

    describe('whenElementAvailable', () => {
        beforeEach(() => {
            vi.useFakeTimers();
        });
        afterEach(() => {
            vi.useRealTimers();
        });

        it('resolves immediately if element exists', () => {
            const el = { id: 'test' };
            const getElementById = vi.fn().mockReturnValue(el);
            global.document = { getElementById, querySelector: vi.fn() };

            const callback = vi.fn();
            const result = whenElementAvailable('test', callback);

            expect(result).toBe(true);
            expect(callback).toHaveBeenCalledWith(el);
        });

        it('polls if element does not exist initially', () => {
            const getElementById = vi.fn().mockReturnValue(null);
            global.document = { getElementById, querySelector: vi.fn() };

            const callback = vi.fn();
            whenElementAvailable('test', callback, { interval: 10 });

            expect(callback).not.toHaveBeenCalled();

            // First poll
            vi.advanceTimersByTime(10);
            expect(callback).not.toHaveBeenCalled();

            // Element appears
            const el = { id: 'test' };
            getElementById.mockReturnValue(el);

            // Second poll
            vi.advanceTimersByTime(10);
            expect(callback).toHaveBeenCalledWith(el);
        });
    });

});
