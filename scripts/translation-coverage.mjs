#!/usr/bin/env node

/**
 * Translation Coverage Report Generator
 * 
 * Generates detailed coverage reports for translations including:
 * - Per-locale coverage percentages
 * - Section-by-section breakdown
 * - Keys that need attention (untranslated, missing)
 * - Overall translation health status
 * 
 * Usage: npm run translation:coverage
 * 
 * @module scripts/translation-coverage
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

// Locale display names for the report
const LOCALE_NAMES = {
    en: 'English',
    de: 'German',
    es: 'Spanish',
    fr: 'French',
    it: 'Italian',
};

/**
 * Load a translation file dynamically
 * @param {string} locale - Locale code
 * @returns {Promise<object>} Translation data
 */
async function loadTranslation(locale) {
    const filePath = path.join(TRANSLATIONS_DIR, `${locale}.js`);
    const module = await import(`file://${filePath}`);
    return module.data;
}

/**
 * Flatten object to dot-notation keys with values
 * @param {object} obj - Object to flatten
 * @param {string} prefix - Key prefix
 * @returns {Map<string, *>} Map of keys to values
 */
function flattenWithValues(obj, prefix = '') {
    const result = new Map();

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const fullKey = prefix ? `${prefix}.${key}` : key;
            const value = obj[key];

            if (value && typeof value === 'object' && !Array.isArray(value)) {
                const nested = flattenWithValues(value, fullKey);
                for (const [k, v] of nested) {
                    result.set(k, v);
                }
            } else {
                result.set(fullKey, value);
            }
        }
    }

    return result;
}

/**
 * Get the top-level section of a key
 * @param {string} key - Dot-notation key
 * @returns {string} Top-level section name
 */
function getSection(key) {
    return key.split('.')[0];
}

/**
 * Generate section-level coverage statistics
 * @param {Map<string, *>} baseKeys - Base locale keys and values
 * @param {Map<string, *>} localeKeys - Target locale keys and values
 * @returns {object} Section coverage data
 */
function getSectionCoverage(baseKeys, localeKeys) {
    const sections = new Map();

    for (const [key, baseValue] of baseKeys) {
        const section = getSection(key);

        if (!sections.has(section)) {
            sections.set(section, { total: 0, translated: 0, identical: 0 });
        }

        const sectionData = sections.get(section);
        sectionData.total++;

        if (localeKeys.has(key)) {
            sectionData.translated++;

            const localeValue = localeKeys.get(key);
            if (typeof baseValue === 'string' && baseValue === localeValue) {
                sectionData.identical++;
            }
        }
    }

    // Calculate percentages
    const result = {};
    for (const [section, data] of sections) {
        result[section] = {
            total: data.total,
            translated: data.translated,
            coverage: ((data.translated / data.total) * 100).toFixed(1),
            identicalToEnglish: data.identical,
        };
    }

    return result;
}

/**
 * Generate a markdown coverage report
 * @param {object} coverageData - Coverage data for all locales
 * @returns {string} Markdown report content
 */
function generateMarkdownReport(coverageData) {
    const lines = [
        '# Translation Coverage Report',
        '',
        `Generated: ${new Date().toISOString()}`,
        '',
        '## Summary',
        '',
        '| Locale | Coverage | Translated | Total | Identical to EN |',
        '|--------|----------|------------|-------|-----------------|',
    ];

    // Summary table
    for (const [locale, data] of Object.entries(coverageData)) {
        const name = LOCALE_NAMES[locale] || locale;
        lines.push(
            `| ${name} (${locale}) | ${data.coverage}% | ${data.translated} | ${data.total} | ${data.identicalToEnglish} |`
        );
    }

    lines.push('', '## Health Status', '');

    // Health status
    const avgCoverage = Object.values(coverageData)
        .reduce((sum, d) => sum + parseFloat(d.coverage), 0) / Object.keys(coverageData).length;

    if (avgCoverage >= 99) {
        lines.push('✅ **Excellent** - All locales are fully translated.');
    } else if (avgCoverage >= 95) {
        lines.push('🟡 **Good** - Minor gaps in translation coverage.');
    } else if (avgCoverage >= 80) {
        lines.push('🟠 **Needs Attention** - Some locales have significant gaps.');
    } else {
        lines.push('🔴 **Critical** - Major translation work needed.');
    }

    // Section breakdown per locale
    lines.push('', '## Section Breakdown', '');

    for (const [locale, data] of Object.entries(coverageData)) {
        const name = LOCALE_NAMES[locale] || locale;
        lines.push(`### ${name} (${locale})`, '');

        if (data.sections) {
            lines.push('| Section | Coverage | Keys |');
            lines.push('|---------|----------|------|');

            const sortedSections = Object.entries(data.sections)
                .sort((a, b) => parseFloat(a[1].coverage) - parseFloat(b[1].coverage));

            for (const [section, sectionData] of sortedSections) {
                const icon = parseFloat(sectionData.coverage) >= 100 ? '✅' :
                    parseFloat(sectionData.coverage) >= 90 ? '🟡' : '🔴';
                lines.push(`| ${icon} ${section} | ${sectionData.coverage}% | ${sectionData.translated}/${sectionData.total} |`);
            }
        }

        lines.push('');
    }

    return lines.join('\n');
}

/**
 * Main execution function
 */
async function main() {
    console.log('📊 Generating translation coverage report...\n');

    // Load base locale
    const baseData = await loadTranslation(BASE_LOCALE);
    const baseKeys = flattenWithValues(baseData);
    console.log(`📦 Base locale (${BASE_LOCALE}): ${baseKeys.size} keys\n`);

    const coverageData = {};

    // Analyze each locale
    for (const locale of LOCALES) {
        console.log(`🔍 Analyzing ${LOCALE_NAMES[locale] || locale}...`);

        const localeData = await loadTranslation(locale);
        const localeKeys = flattenWithValues(localeData);

        // Calculate overall coverage
        let translated = 0;
        let identicalToEnglish = 0;

        for (const [key, baseValue] of baseKeys) {
            if (localeKeys.has(key)) {
                translated++;
                const localeValue = localeKeys.get(key);
                if (typeof baseValue === 'string' && baseValue === localeValue && baseValue.length > 3) {
                    identicalToEnglish++;
                }
            }
        }

        coverageData[locale] = {
            total: baseKeys.size,
            translated,
            coverage: ((translated / baseKeys.size) * 100).toFixed(2),
            identicalToEnglish,
            sections: getSectionCoverage(baseKeys, localeKeys),
        };

        console.log(`   Coverage: ${coverageData[locale].coverage}%`);
        console.log(`   Identical to EN: ${identicalToEnglish} keys\n`);
    }

    // Generate markdown report
    const markdownReport = generateMarkdownReport(coverageData);

    // Save reports
    const reportsDir = path.resolve(__dirname, '../docs/dev/reports');
    if (!fs.existsSync(reportsDir)) {
        fs.mkdirSync(reportsDir, { recursive: true });
    }

    const mdPath = path.join(reportsDir, 'translation-coverage.md');
    fs.writeFileSync(mdPath, markdownReport);
    console.log(`📄 Markdown report saved: ${mdPath}`);

    const jsonPath = path.join(reportsDir, 'translation-coverage.json');
    fs.writeFileSync(jsonPath, JSON.stringify(coverageData, null, 2));
    console.log(`📄 JSON report saved: ${jsonPath}`);

    // Print summary
    console.log('\n' + '='.repeat(50));
    console.log('COVERAGE SUMMARY');
    console.log('='.repeat(50));

    for (const [locale, data] of Object.entries(coverageData)) {
        const name = LOCALE_NAMES[locale] || locale;
        const icon = parseFloat(data.coverage) >= 99 ? '✅' :
            parseFloat(data.coverage) >= 90 ? '🟡' : '🔴';
        console.log(`${icon} ${name}: ${data.coverage}% (${data.translated}/${data.total})`);
    }

    const avgCoverage = Object.values(coverageData)
        .reduce((sum, d) => sum + parseFloat(d.coverage), 0) / Object.keys(coverageData).length;
    console.log(`\n📈 Average: ${avgCoverage.toFixed(2)}%`);
}

main().catch(err => {
    console.error('❌ Coverage report failed:', err);
    process.exit(1);
});
