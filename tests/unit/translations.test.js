/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';

describe('Translations Module', () => {
    let translationsModule;
    let scope;

    beforeEach(async () => {
        jest.resetModules();

        // Mock the translation files
        jest.mock('../../src/scripts/translations/en.js', () => ({
            data: {
                texts: { hello: 'Hello', nested: { world: 'World' } },
                categoryNames: {},
                gearItems: {}
            }
        }), { virtual: true });

        translationsModule = await import('../../src/scripts/modules/translations.js');
        scope = {};
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('resolveLocaleKey', () => {
        test('defaults to en for invalid inputs', () => {
            const { resolveLocaleKey } = translationsModule;
            expect(resolveLocaleKey(null)).toBe('en');
            expect(resolveLocaleKey('')).toBe('en');
            expect(resolveLocaleKey('   ')).toBe('en');
        });

        test('resolves supported locales', () => {
            const { resolveLocaleKey } = translationsModule;
            expect(resolveLocaleKey('de')).toBe('de');
            expect(resolveLocaleKey('it')).toBe('it');
        });

        test('resolves regional locales to base', () => {
            const { resolveLocaleKey } = translationsModule;
            expect(resolveLocaleKey('de-DE')).toBe('de');
            expect(resolveLocaleKey('it-IT')).toBe('it');
        });

        test('fallbacks to en for unsupported locales', () => {
            const { resolveLocaleKey } = translationsModule;
            expect(resolveLocaleKey('zh')).toBe('en');
        });
    });

    describe('registerLocaleData', () => {
        test('initializes scope containers', () => {
            const { registerLocaleData } = translationsModule;
            registerLocaleData('test', {}, scope);
            expect(scope.texts).toBeDefined();
            expect(scope.categoryNames).toBeDefined();
            expect(scope.gearItems).toBeDefined();
        });

        test('registers default locale (en) and freezes it', () => {
            const { registerLocaleData } = translationsModule;
            const data = { texts: { foo: 'bar' } };
            registerLocaleData('en', data, scope);

            expect(scope.texts.en.foo).toBe('bar');
            expect(Object.isFrozen(scope.texts.en)).toBe(true);
        });

        test('aligns other locales to default structure (filling missing keys)', () => {
            const { registerLocaleData } = translationsModule;
            // Setup EN first
            const enData = { texts: { title: 'Title', subtitle: 'Subtitle' } };
            registerLocaleData('en', enData, scope);

            // Setup DE with missing subtitle
            const deData = { texts: { title: 'Titel' } };
            registerLocaleData('de', deData, scope);

            expect(scope.texts.de.title).toBe('Titel');
            expect(scope.texts.de.subtitle).toBe('Subtitle'); // Filled from EN
        });

        test('aligns other locales (removing extra keys)', () => {
            const { registerLocaleData } = translationsModule;
            // Setup EN
            const enData = { texts: { valid: 'Valid' } };
            registerLocaleData('en', enData, scope);

            // DE has extra key
            const deData = { texts: { valid: 'Gultig', extra: 'Extra' } };
            registerLocaleData('de', deData, scope);

            expect(scope.texts.de.valid).toBe('Gultig');
            expect(scope.texts.de).not.toHaveProperty('extra');
        });
    });

    describe('initDefaultLanguage', () => {
        test('registers en data on init', () => {
            const { initDefaultLanguage } = translationsModule;
            initDefaultLanguage(scope);
            expect(scope.texts.en).toBeDefined();
            expect(scope.texts.en.hello).toBe('Hello');
        });
    });
});
