/**
 * @jest-environment jsdom
 */

import {
    TEXT_ENTRY_SEPARATOR,
    normaliseTextEntryValue,
    resolveTextEntry,
} from '../../../src/scripts/modules/text.js';

describe('text module', () => {
    describe('TEXT_ENTRY_SEPARATOR', () => {
        it('should be a newline character', () => {
            expect(TEXT_ENTRY_SEPARATOR).toBe('\n');
        });
    });

    describe('normaliseTextEntryValue', () => {
        it('returns string entries unchanged', () => {
            expect(normaliseTextEntryValue('hello')).toBe('hello');
        });

        it('converts numbers to strings', () => {
            expect(normaliseTextEntryValue(42)).toBe('42');
        });

        it('converts booleans to strings', () => {
            expect(normaliseTextEntryValue(true)).toBe('true');
            expect(normaliseTextEntryValue(false)).toBe('false');
        });

        it('joins arrays with separator', () => {
            expect(normaliseTextEntryValue(['a', 'b', 'c'])).toBe('a\nb\nc');
            expect(normaliseTextEntryValue(['a', 'b'], ', ')).toBe('a, b');
        });

        it('extracts text property from objects', () => {
            expect(normaliseTextEntryValue({ text: 'hello' })).toBe('hello');
        });

        it('extracts label property from objects', () => {
            expect(normaliseTextEntryValue({ label: 'world' })).toBe('world');
        });

        it('handles nested arrays in text property', () => {
            expect(normaliseTextEntryValue({ text: ['a', 'b'] })).toBe('a\nb');
        });

        it('returns empty string for null/undefined', () => {
            expect(normaliseTextEntryValue(null)).toBe('');
            expect(normaliseTextEntryValue(undefined)).toBe('');
        });
    });

    describe('resolveTextEntry', () => {
        it('returns value from primary dictionary', () => {
            const primary = { greeting: 'Hello' };
            const fallback = { greeting: 'Hi' };
            expect(resolveTextEntry(primary, fallback, 'greeting')).toBe('Hello');
        });

        it('falls back to secondary dictionary', () => {
            const primary = {};
            const fallback = { greeting: 'Hi' };
            expect(resolveTextEntry(primary, fallback, 'greeting')).toBe('Hi');
        });

        it('returns default value when key not found', () => {
            expect(resolveTextEntry({}, {}, 'missing', 'default')).toBe('default');
        });

        it('normalizes array values', () => {
            const primary = { items: ['one', 'two'] };
            expect(resolveTextEntry(primary, {}, 'items')).toBe('one\ntwo');
        });

        it('handles null/undefined dictionaries gracefully', () => {
            expect(resolveTextEntry(null, undefined, 'key', 'fallback')).toBe('fallback');
        });
    });
});
