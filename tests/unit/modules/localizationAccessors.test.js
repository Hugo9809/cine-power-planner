/**
 * @jest-environment jsdom
 */

import { jest, describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import {
    normalizeLanguageCode,
    isRtlLanguage,
    resolveDocumentDirection,
    applyLocaleMetadata,
    createLocalizationAccessorsFactory
} from '../../../src/scripts/modules/core/localization-accessors.js';

describe('Localication Accessors Module', () => {

    test('normalizeLanguageCode standardizes codes', () => {
        expect(normalizeLanguageCode('en-US')).toBe('en-us');
        expect(normalizeLanguageCode('DE')).toBe('de');
        expect(normalizeLanguageCode('   es   ')).toBe('es');
        expect(normalizeLanguageCode(null)).toBe('en');
    });

    test('isRtlLanguage correctly identifies RTL', () => {
        expect(isRtlLanguage('ar')).toBe(true);
        expect(isRtlLanguage('he-IL')).toBe(true);
        expect(isRtlLanguage('fa')).toBe(true);
        expect(isRtlLanguage('en')).toBe(false);
        expect(isRtlLanguage('es')).toBe(false);
    });

    test('resolveDocumentDirection returns correct direction', () => {
        // Mock document behavior
        Object.defineProperty(document.documentElement, 'getAttribute', {
            value: jest.fn().mockReturnValue(null),
            writable: true
        });

        expect(resolveDocumentDirection('ar')).toBe('rtl');
        expect(resolveDocumentDirection('en')).toBe('ltr');

        // Test with explicit doc dir
        document.documentElement.getAttribute.mockReturnValue('rtl');
        expect(resolveDocumentDirection('en')).toBe('rtl');
    });

    test('applyLocaleMetadata updates DOM elements', () => {
        const el = document.createElement('div');
        applyLocaleMetadata(el, 'de', 'ltr');
        expect(el.lang).toBe('de');
        expect(el.dir).toBe('ltr');
    });

    test('createLocalizationAccessorsFactory returns bound object', () => {
        const factory = createLocalizationAccessorsFactory({ defaultLanguage: 'fr' });
        expect(factory.defaultLanguage).toBe('fr');
        expect(factory.normalizeLanguageCode(null)).toBe('fr');
        expect(typeof factory.isRtlLanguage).toBe('function');
    });
});
