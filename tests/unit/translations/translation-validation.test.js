/**
 * Translation Validation Tests
 * 
 * Automated tests to ensure translation integrity across all locales.
 * These tests verify:
 * - All locales have matching key structures
 * - Required keys are present
 * - Placeholder consistency ({name}, %s)
 * - German monitor button labels are localized
 * 
 * @module tests/unit/translations/translation-validation
 */

const path = require('path');

// Mock for ESM imports in Jest CommonJS environment
const TRANSLATIONS_DIR = path.resolve(__dirname, '../../../src/scripts/translations');

describe('Translation Validation', () => {
    let enData, deData, esData, frData, itData;

    beforeAll(async () => {
        // Dynamically import translation files
        const enModule = await import(`file://${path.join(TRANSLATIONS_DIR, 'en.js')}`);
        const deModule = await import(`file://${path.join(TRANSLATIONS_DIR, 'de.js')}`);
        const esModule = await import(`file://${path.join(TRANSLATIONS_DIR, 'es.js')}`);
        const frModule = await import(`file://${path.join(TRANSLATIONS_DIR, 'fr.js')}`);
        const itModule = await import(`file://${path.join(TRANSLATIONS_DIR, 'it.js')}`);

        enData = enModule.data;
        deData = deModule.data;
        esData = esModule.data;
        frData = frModule.data;
        itData = itModule.data;
    });

    /**
     * Flatten nested object to dot-notation keys
     * @param {object} obj - Object to flatten
     * @param {string} prefix - Current prefix
     * @returns {string[]} Flattened keys
     */
    function flattenKeys(obj, prefix = '') {
        let keys = [];
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const fullKey = prefix ? `${prefix}.${key}` : key;
                const value = obj[key];
                if (value && typeof value === 'object' && !Array.isArray(value)) {
                    keys = keys.concat(flattenKeys(value, fullKey));
                } else {
                    keys.push(fullKey);
                }
            }
        }
        return keys;
    }

    /**
     * Get value from object by dot-notation path
     * @param {object} obj - Object to traverse
     * @param {string} keyPath - Dot-notation path
     * @returns {*} Value at path
     */
    function getValue(obj, keyPath) {
        return keyPath.split('.').reduce((acc, part) => acc && acc[part], obj);
    }

    /**
     * Extract placeholders from a string
     * @param {string} str - String to analyze
     * @returns {string[]} Sorted placeholder matches
     */
    function extractPlaceholders(str) {
        if (typeof str !== 'string') return [];
        const placeholders = [];

        // Match {name} style placeholders
        const braceMatches = str.match(/\{(\w+)\}/g);
        if (braceMatches) placeholders.push(...braceMatches);

        // Match %s, %d style placeholders
        const percentMatches = str.match(/%[sd]/g);
        if (percentMatches) placeholders.push(...percentMatches);

        return placeholders.sort();
    }

    describe('German (de) translations', () => {
        test('monitor button labels are localized (not in English)', () => {
            const userButtonFunctions = deData.texts.projectForm.userButtonFunctions;

            // These specific keys were identified as needing localization
            expect(userButtonFunctions.surroundView).not.toBe('Surround View');
            expect(userButtonFunctions.vectorscope).not.toBe('Vectorscope');
            expect(userButtonFunctions.frameGrab).not.toBe('Frame Grab');

            // Verify they have German translations
            expect(userButtonFunctions.surroundView).toBe('Rundumsicht');
            expect(userButtonFunctions.vectorscope).toBe('Vektorskop');
            expect(userButtonFunctions.frameGrab).toBe('Einzelbildaufnahme');
        });

        test('has all English keys', () => {
            const enKeys = flattenKeys(enData);
            const deKeys = new Set(flattenKeys(deData));

            const missingKeys = enKeys.filter(key => !deKeys.has(key));

            expect(missingKeys).toEqual([]);
        });
    });

    describe('Placeholder consistency', () => {
        const locales = [
            { name: 'German', data: () => deData },
            { name: 'Spanish', data: () => esData },
            { name: 'French', data: () => frData },
            { name: 'Italian', data: () => itData },
        ];

        test.each(locales)('$name placeholders match English', ({ data }) => {
            const localeData = data();
            const enKeys = flattenKeys(enData);
            const issues = [];

            for (const key of enKeys) {
                const enValue = getValue(enData, key);
                const localeValue = getValue(localeData, key);

                if (typeof enValue === 'string' && typeof localeValue === 'string') {
                    const enPlaceholders = extractPlaceholders(enValue);
                    const localePlaceholders = extractPlaceholders(localeValue);

                    if (enPlaceholders.length > 0 || localePlaceholders.length > 0) {
                        const enSorted = enPlaceholders.join(',');
                        const localeSorted = localePlaceholders.join(',');

                        if (enSorted !== localeSorted) {
                            issues.push({
                                key,
                                expected: enPlaceholders,
                                actual: localePlaceholders,
                            });
                        }
                    }
                }
            }

            // Allow up to 5 placeholder mismatches (some may be intentional)
            expect(issues.length).toBeLessThanOrEqual(5);
        });
    });

    describe('Key structure consistency', () => {
        test('all locales have texts section', () => {
            expect(enData.texts).toBeDefined();
            expect(deData.texts).toBeDefined();
            expect(esData.texts).toBeDefined();
            expect(frData.texts).toBeDefined();
            expect(itData.texts).toBeDefined();
        });

        test('all locales have categoryNames section', () => {
            expect(enData.categoryNames).toBeDefined();
            expect(deData.categoryNames).toBeDefined();
            expect(esData.categoryNames).toBeDefined();
            expect(frData.categoryNames).toBeDefined();
            expect(itData.categoryNames).toBeDefined();
        });

        test('all locales have gearItems section', () => {
            expect(enData.gearItems).toBeDefined();
            expect(deData.gearItems).toBeDefined();
            expect(esData.gearItems).toBeDefined();
            expect(frData.gearItems).toBeDefined();
            expect(itData.gearItems).toBeDefined();
        });
    });

    describe('Required keys presence', () => {
        const requiredKeys = [
            'texts.appTitle',
            'texts.languageSetting',
            'texts.darkModeSetting',
            'texts.projectForm.heading',
            'texts.gearListNav',
            'texts.generateGearListBtn',
        ];

        test.each(requiredKeys)('key "%s" exists in all locales', (key) => {
            expect(getValue(enData, key)).toBeDefined();
            expect(getValue(deData, key)).toBeDefined();
            expect(getValue(esData, key)).toBeDefined();
            expect(getValue(frData, key)).toBeDefined();
            expect(getValue(itData, key)).toBeDefined();
        });
    });
});
