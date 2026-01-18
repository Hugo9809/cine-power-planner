import {
    jsonDeepClone,
    createResilientDeepClone,
    ensureDeepClone
} from '../../../../src/scripts/modules/helpers/deep-clone.js';

describe('Deep Clone Utilities', () => {
    describe('jsonDeepClone', () => {
        it('should clone simple objects', () => {
            const original = { a: 1, b: 'text' };
            const clone = jsonDeepClone(original);
            expect(clone).toEqual(original);
            expect(clone).not.toBe(original);
        });

        it('should handle null and primitives', () => {
            expect(jsonDeepClone(null)).toBeNull();
            expect(jsonDeepClone(123)).toBe(123);
            expect(jsonDeepClone('test')).toBe('test');
        });

        it('should strip functions (JSON behavior)', () => {
            const original = { a: 1, fn: () => { } };
            const clone = jsonDeepClone(original);
            expect(clone.a).toBe(1);
            expect(clone.fn).toBeUndefined();
        });
    });

    describe('createResilientDeepClone', () => {
        it('should use structuredClone if available', () => {
            const originalStructuredClone = global.structuredClone;
            const mockClone = jest.fn(val => ({ ...val, cloned: true }));
            global.structuredClone = mockClone;

            try {
                const deepClone = createResilientDeepClone(global);
                const original = { a: 1 };
                const result = deepClone(original);

                expect(mockClone).toHaveBeenCalledWith(original);
                expect(result.cloned).toBe(true);
            } finally {
                global.structuredClone = originalStructuredClone;
            }
        });

        it('should fallback to JSON clone if structuredClone throws', () => {
            const originalStructuredClone = global.structuredClone;
            global.structuredClone = () => { throw new Error('Fail'); };

            try {
                const deepClone = createResilientDeepClone(global);
                const original = { a: 1 };
                const result = deepClone(original);

                expect(result).toEqual(original);
                expect(result).not.toBe(original);
            } finally {
                global.structuredClone = originalStructuredClone;
            }
        });
    });

    describe('ensureDeepClone', () => {
        it('should register __cineDeepClone on the scope', () => {
            const scope = {};
            const cloneFn = ensureDeepClone(scope);
            expect(typeof scope.__cineDeepClone).toBe('function');
            expect(scope.__cineDeepClone).toBe(cloneFn);
        });

        it('should return existing __cineDeepClone if present', () => {
            const existingFn = () => { };
            const scope = { __cineDeepClone: existingFn };
            const result = ensureDeepClone(scope);
            expect(result).toBe(existingFn);
        });
    });
});
