
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper to get current directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOCALES = ['de', 'es', 'fr', 'it'];
const BASE_LOCALE = 'en';
const TRANSLATIONS_DIR = path.resolve(__dirname, '../temp_translations');

// Helper to dynamically import the translation files
async function loadTranslation(locale) {
    const filePath = path.join(TRANSLATIONS_DIR, `${locale}.mjs`);
    try {
        const module = await import(filePath);
        return module.data;
    } catch (error) {
        console.error(`Error loading locale ${locale} from ${filePath}:`, error);
        process.exit(1);
    }
}

// Flatten nested object keys
function flattenKeys(obj, prefix = '') {
    let keys = [];
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const fullKey = prefix ? `${prefix}.${key}` : key;
            if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                keys = keys.concat(flattenKeys(obj[key], fullKey));
            } else {
                keys.push(fullKey);
            }
        }
    }
    return keys;
}

// Find keys present in source but missing in target
function findMissingKeys(sourceKeys, targetKeys) {
    const sourceSet = new Set(sourceKeys);
    const targetSet = new Set(targetKeys);
    return [...sourceSet].filter(key => !targetSet.has(key));
}

// Get value from object by dot-notation key
function getValue(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

// Main execution
async function main() {
    console.log(`Checking translations in ${TRANSLATIONS_DIR}...`);

    // Load En (source of truth)
    console.log(`Loading base locale (${BASE_LOCALE})...`);
    const enData = await loadTranslation(BASE_LOCALE);
    const enKeys = flattenKeys(enData);
    console.log(`Found ${enKeys.length} keys in ${BASE_LOCALE}.`);

    for (const locale of LOCALES) {
        console.log(`\nChecking locale (${locale})...`);
        const localeData = await loadTranslation(locale);
        const localeKeys = flattenKeys(localeData);

        const missingKeys = findMissingKeys(enKeys, localeKeys);

        if (missingKeys.length === 0) {
            console.log(`✅ ${locale} is in sync with ${BASE_LOCALE}.`);
        } else {
            console.log(`❌ ${locale} is missing ${missingKeys.length} keys:`);
            const report = missingKeys.map(key => {
                const originalValue = getValue(enData, key);
                return `"${key}": ${JSON.stringify(originalValue)}`;
            }).join('\n');
            console.log(report);

            // We could optionally write this to a file if needed
        }
    }
}

main().catch(err => console.error(err));
