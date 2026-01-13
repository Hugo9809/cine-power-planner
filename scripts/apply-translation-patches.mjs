
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOCALES = ['de', 'es', 'fr', 'it'];
const BASE_LOCALE = 'en';
const SOURCE_DIR = path.resolve(__dirname, '../temp_translations');
const TARGET_DIR = path.resolve(__dirname, '../src/scripts/translations');

async function loadTranslation(locale) {
    const filePath = path.join(SOURCE_DIR, `${locale}.mjs`);
    const module = await import(filePath);
    return module.data;
}

function deepMerge(source, target) {
    const output = { ...target };

    for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
                // If source is object, target should be object too
                if (!(key in target)) {
                    output[key] = deepMerge(source[key], {});
                } else {
                    output[key] = deepMerge(source[key], target[key]);
                }
            } else {
                // Primitive value
                if (!(key in target)) {
                    // Missing key
                    output[key] = `[NEEDS TRANSLATION] ${source[key]}`;
                }
            }
        }
    }
    return output;
}

async function main() {
    console.log(`Loading base locale (${BASE_LOCALE})...`);
    const enData = await loadTranslation(BASE_LOCALE);

    for (const locale of LOCALES) {
        console.log(`Patching locale (${locale})...`);
        const localeData = await loadTranslation(locale);

        // Merge keys
        const patchedData = deepMerge(enData, localeData);

        // Generate file content
        const fileContent = `export const locale = "${locale}";\nexport const data = ${JSON.stringify(patchedData, null, 2)};\n\nexport default data;\n`;

        // Write back to src/scripts/translations
        const targetPath = path.join(TARGET_DIR, `${locale}.js`);
        fs.writeFileSync(targetPath, fileContent, 'utf8');
        console.log(`Saved patched file to ${targetPath}`);
    }
}

main().catch(err => console.error(err));
