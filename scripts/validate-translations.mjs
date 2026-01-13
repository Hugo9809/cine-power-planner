#!/usr/bin/env node

/**
 * Translation Validation Script
 * 
 * Validates translation files across all locales by:
 * - Detecting missing keys compared to the English base locale
 * - Finding untranslated strings (values identical to English)
 * - Checking placeholder consistency ({name}, %s, etc.)
 * - Generating coverage reports
 * 
 * Usage: npm run translation:validate
 * 
 * @module scripts/validate-translations
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM directory resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const LOCALES = ['de', 'es', 'fr', 'it'];
const BASE_LOCALE = 'en';
const TRANSLATIONS_DIR = path.resolve(__dirname, '../src/scripts/translations');

// Placeholder patterns to validate consistency
const PLACEHOLDER_PATTERNS = [
    /\{(\w+)\}/g,       // {name}, {count}, etc.
    /%s/g,              // %s placeholder
    /%d/g,              // %d placeholder
    /%(\d+)\$s/g,       // %1$s positional placeholder
];

/**
 * Dynamically import a translation file and return its data export
 * @param {string} locale - Locale code (e.g., 'en', 'de')
 * @returns {Promise<object>} Translation data object
 */
async function loadTranslation(locale) {
    const filePath = path.join(TRANSLATIONS_DIR, `${locale}.js`);
    try {
        const module = await import(`file://${filePath}`);
        return module.data;
    } catch (error) {
        console.error(`❌ Error loading locale '${locale}' from ${filePath}:`, error.message);
        process.exit(1);
    }
}

/**
 * Flatten a nested object into dot-notation keys
 * @param {object} obj - Nested object to flatten
 * @param {string} prefix - Current key prefix
 * @returns {string[]} Array of dot-notation keys
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
 * Get a value from an object using dot-notation path
 * @param {object} obj - Object to traverse
 * @param {string} keyPath - Dot-notation path
 * @returns {*} Value at the path or undefined
 */
function getValue(obj, keyPath) {
    return keyPath.split('.').reduce((acc, part) => acc && acc[part], obj);
}

/**
 * Extract all placeholders from a string
 * @param {string} str - String to analyze
 * @returns {string[]} Array of placeholder matches
 */
function extractPlaceholders(str) {
    if (typeof str !== 'string') return [];
    const placeholders = [];
    for (const pattern of PLACEHOLDER_PATTERNS) {
        const matches = str.match(pattern);
        if (matches) {
            placeholders.push(...matches);
        }
    }
    return placeholders.sort();
}

/**
 * Compare placeholders between two strings
 * @param {string} baseValue - Base locale value
 * @param {string} localeValue - Target locale value
 * @returns {object} Comparison result with missing and extra placeholders
 */
function comparePlaceholders(baseValue, localeValue) {
    const basePlaceholders = extractPlaceholders(baseValue);
    const localePlaceholders = extractPlaceholders(localeValue);

    const missing = basePlaceholders.filter(p => !localePlaceholders.includes(p));
    const extra = localePlaceholders.filter(p => !basePlaceholders.includes(p));

    return { missing, extra, isValid: missing.length === 0 && extra.length === 0 };
}

/**
 * Check if a value appears to be untranslated (identical to English)
 * @param {*} baseValue - English value
 * @param {*} localeValue - Target locale value
 * @param {string} key - Key path for context
 * @returns {boolean} True if the value appears untranslated
 */
function isUntranslated(baseValue, localeValue, key) {
    // Skip keys that are expected to remain in English
    const englishOkPatterns = [
        /\.placeholder_/,
        /ISO|ND|WB|FPS|LUT|D-Tap|B-Mount|V-Mount|USB-C|HDMI|SDI/i,
        /^texts\.(category|crewRoles)\./,
    ];

    if (englishOkPatterns.some(p => p.test(key))) {
        return false;
    }

    // Compare values
    if (typeof baseValue === 'string' && typeof localeValue === 'string') {
        // Identical strings are likely untranslated
        return baseValue === localeValue && baseValue.length > 3;
    }

    return false;
}

/**
 * Validate a single locale against the base locale
 * @param {object} baseData - English translation data
 * @param {object} localeData - Target locale translation data
 * @param {string} locale - Locale code
 * @returns {object} Validation results
 */
function validateLocale(baseData, localeData, locale) {
    const baseKeys = flattenKeys(baseData);
    const localeKeys = flattenKeys(localeData);
    const localeKeySet = new Set(localeKeys);

    const results = {
        locale,
        totalKeys: baseKeys.length,
        missingKeys: [],
        untranslatedKeys: [],
        placeholderIssues: [],
        extraKeys: [],
    };

    // Check for missing keys and validate existing keys
    for (const key of baseKeys) {
        const baseValue = getValue(baseData, key);
        const localeValue = getValue(localeData, key);

        if (!localeKeySet.has(key)) {
            results.missingKeys.push({ key, englishValue: baseValue });
        } else {
            // Check for untranslated strings
            if (isUntranslated(baseValue, localeValue, key)) {
                results.untranslatedKeys.push({ key, value: localeValue });
            }

            // Check placeholder consistency
            if (typeof baseValue === 'string' && typeof localeValue === 'string') {
                const placeholderCheck = comparePlaceholders(baseValue, localeValue);
                if (!placeholderCheck.isValid) {
                    results.placeholderIssues.push({
                        key,
                        missing: placeholderCheck.missing,
                        extra: placeholderCheck.extra,
                    });
                }
            }
        }
    }

    // Check for extra keys not in base
    const baseKeySet = new Set(baseKeys);
    for (const key of localeKeys) {
        if (!baseKeySet.has(key)) {
            results.extraKeys.push(key);
        }
    }

    // Calculate coverage
    results.translatedKeys = results.totalKeys - results.missingKeys.length;
    results.coverage = ((results.translatedKeys / results.totalKeys) * 100).toFixed(2);

    return results;
}

/**
 * Print validation results to console
 * @param {object[]} allResults - Array of validation results per locale
 */
function printResults(allResults) {
    console.log('\n' + '='.repeat(60));
    console.log('TRANSLATION VALIDATION REPORT');
    console.log('='.repeat(60) + '\n');

    let hasErrors = false;

    for (const results of allResults) {
        const statusIcon = results.missingKeys.length === 0 && results.placeholderIssues.length === 0
            ? '✅' : '⚠️';

        console.log(`${statusIcon} ${results.locale.toUpperCase()} - Coverage: ${results.coverage}%`);
        console.log(`   Keys: ${results.translatedKeys}/${results.totalKeys}`);

        if (results.missingKeys.length > 0) {
            hasErrors = true;
            console.log(`   ❌ Missing keys: ${results.missingKeys.length}`);
            results.missingKeys.slice(0, 5).forEach(({ key }) => {
                console.log(`      - ${key}`);
            });
            if (results.missingKeys.length > 5) {
                console.log(`      ... and ${results.missingKeys.length - 5} more`);
            }
        }

        if (results.untranslatedKeys.length > 0) {
            console.log(`   ⚠️  Potentially untranslated: ${results.untranslatedKeys.length}`);
            results.untranslatedKeys.slice(0, 3).forEach(({ key }) => {
                console.log(`      - ${key}`);
            });
            if (results.untranslatedKeys.length > 3) {
                console.log(`      ... and ${results.untranslatedKeys.length - 3} more`);
            }
        }

        if (results.placeholderIssues.length > 0) {
            hasErrors = true;
            console.log(`   ❌ Placeholder issues: ${results.placeholderIssues.length}`);
            results.placeholderIssues.slice(0, 3).forEach(({ key, missing, extra }) => {
                const issues = [];
                if (missing.length) issues.push(`missing: ${missing.join(', ')}`);
                if (extra.length) issues.push(`extra: ${extra.join(', ')}`);
                console.log(`      - ${key}: ${issues.join('; ')}`);
            });
        }

        console.log('');
    }

    // Summary
    console.log('='.repeat(60));
    console.log('SUMMARY');
    console.log('='.repeat(60));

    const avgCoverage = (allResults.reduce((sum, r) => sum + parseFloat(r.coverage), 0) / allResults.length).toFixed(2);
    console.log(`Average coverage: ${avgCoverage}%`);
    console.log(`Status: ${hasErrors ? '❌ Issues found' : '✅ All validations passed'}`);

    return hasErrors;
}

/**
 * Save results to a JSON file for further processing
 * @param {object[]} allResults - Validation results
 * @param {string} outputPath - Output file path
 */
function saveJsonReport(allResults, outputPath) {
    const report = {
        generated: new Date().toISOString(),
        baseLocale: BASE_LOCALE,
        locales: allResults,
        summary: {
            averageCoverage: (allResults.reduce((sum, r) => sum + parseFloat(r.coverage), 0) / allResults.length).toFixed(2),
            totalMissingKeys: allResults.reduce((sum, r) => sum + r.missingKeys.length, 0),
            totalPlaceholderIssues: allResults.reduce((sum, r) => sum + r.placeholderIssues.length, 0),
        },
    };

    fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
    console.log(`\n📄 JSON report saved to: ${outputPath}`);
}

/**
 * Main execution function
 */
async function main() {
    console.log('🔍 Validating translations...\n');
    console.log(`Base locale: ${BASE_LOCALE}`);
    console.log(`Locales to validate: ${LOCALES.join(', ')}`);
    console.log(`Translations directory: ${TRANSLATIONS_DIR}\n`);

    // Load base locale
    const baseData = await loadTranslation(BASE_LOCALE);
    const baseKeys = flattenKeys(baseData);
    console.log(`📦 Loaded ${baseKeys.length} keys from ${BASE_LOCALE}\n`);

    // Validate each locale
    const allResults = [];
    for (const locale of LOCALES) {
        console.log(`🔄 Validating ${locale}...`);
        const localeData = await loadTranslation(locale);
        const results = validateLocale(baseData, localeData, locale);
        allResults.push(results);
    }

    // Print results
    const hasErrors = printResults(allResults);

    // Save JSON report
    const reportPath = path.resolve(__dirname, '../docs/dev/reports/translation-validation.json');
    const reportDir = path.dirname(reportPath);
    if (!fs.existsSync(reportDir)) {
        fs.mkdirSync(reportDir, { recursive: true });
    }
    saveJsonReport(allResults, reportPath);

    // Exit with error code if issues found
    if (hasErrors) {
        process.exit(1);
    }
}

main().catch(err => {
    console.error('❌ Validation failed:', err);
    process.exit(1);
});
