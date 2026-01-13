import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import js from '@eslint/js';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load appScriptGlobals.json
const appScriptGlobalsPath = path.join(__dirname, 'tools', 'appScriptGlobals.json');
const appScriptGlobals = JSON.parse(fs.readFileSync(appScriptGlobalsPath, 'utf-8'));

const baseGlobals = {
    ...globals.browser,
    ...globals.node,
};

const buildAppScriptGlobals = (names = []) =>
    Object.fromEntries(names.map(name => [name, 'writable']));

const allAppScriptGlobalNames = Array.from(
    new Set(Object.values(appScriptGlobals).flat())
);

const additionalGlobalsByKey = {
    'app-core': allAppScriptGlobalNames,
};

const additionalAppScriptFiles = {
    'app-core': [
        'app-core-new-1',
        'app-core-environment',
        'app-core-new-2',
        'app-core-runtime-support',
        'app-core-runtime-helpers',
    ],
};

const scriptDir = path.join(__dirname, 'src', 'scripts');
const coreScriptDir = path.join(__dirname, 'src', 'scripts', 'core');
let discoveredAppCoreFiles = [];

try {
    const rootFiles = fs
        .readdirSync(scriptDir)
        .filter(name => name.startsWith('app-core-') && name.endsWith('.js'))
        .map(name => name.slice(0, -3));

    const coreFiles = fs
        .readdirSync(coreScriptDir)
        // Accept all JS files in core, or just app-core-*?
        // The previous logic filtered for app-core-*, let's keep it broad for core/
        // effectively treating everything in core/ as an app-core file needing globals.
        .filter(name => name.endsWith('.js'))
        .map(name => `core/${name.slice(0, -3)}`);

    discoveredAppCoreFiles = [...rootFiles, ...coreFiles];
} catch (readError) {
    void readError;
}

if (Array.isArray(discoveredAppCoreFiles) && discoveredAppCoreFiles.length) {
    const existing = additionalAppScriptFiles['app-core'] || [];
    // existing list might contain "app-core-new-1", but now we found "core/app-core-new-1"
    // We should deduplicate or prefer the found one.
    // Actually, additionalAppScriptFiles hardcodes some names.
    // If I moved them, I should probably remove them from the hardcoded list or let discovery handle it.

    additionalAppScriptFiles['app-core'] = Array.from(
        new Set([...existing, ...discoveredAppCoreFiles])
    );
}

const appScriptConfigs = Object.entries(appScriptGlobals).flatMap(([key, names]) => {
    const fileKeys = [key, ...(additionalAppScriptFiles[key] || [])];
    const combinedNames = [...new Set([...names, ...(additionalGlobalsByKey[key] || [])])];
    return fileKeys
        .map(fileKey => {
            // Check if it's a core file path (already includes directory) or standard
            if (fileKey.startsWith('core/')) {
                return `src/scripts/${fileKey}.js`;
            }
            // Check if it exists in root, otherwise check core (fallback for hardcoded keys)
            const rootPath = `src/scripts/${fileKey}.js`;
            if (fs.existsSync(path.join(__dirname, rootPath))) {
                return rootPath;
            }
            const corePath = `src/scripts/core/${fileKey}.js`;
            if (fs.existsSync(path.join(__dirname, corePath))) {
                return corePath;
            }
            return rootPath; // Fallback to root if neither found (will be filtered out next)
        })
        .filter(srcFilePath => fs.existsSync(path.join(__dirname, srcFilePath)))
        .map(srcFilePath => ({
            files: [srcFilePath, `./${srcFilePath}`, `**/${srcFilePath}`],
            languageOptions: {
                globals: {
                    ...baseGlobals,
                    ...buildAppScriptGlobals(combinedNames),
                },
            },
            rules: {
                'no-unused-vars': 'off',
                'no-undef': 'off',
                'no-redeclare': 'off',
            },
        }));
});

export default [
    { ignores: ['vendor/**', 'src/vendor/**', 'legacy/**', 'dist/**', 'build/**', 'legacy */**'] },
    {
        ...js.configs.recommended,
        files: ['**/*.js'],
        ignores: ['node_modules/**', 'vendor/**', 'src/vendor/**', 'legacy/**'],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'script',
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        linterOptions: {
            reportUnusedDisableDirectives: true,
        },
    },
    {
        files: ['tests/**/*.js'],
        languageOptions: {
            globals: globals.jest,
        },
    },
    // ESM files - vite config, tools, v2 modules, storage modules
    {
        files: [
            'eslint.config.js',
            'vite.config.js',
            'tools/**/*.js',
            'src/main.js',
            'src/debug-imports.js',
            'src/data/**/*.js',
            'src/modules/**/*.js',
            'src/scripts/*.js',
            'src/scripts/main.js',
            'src/scripts/v2/**/*.js',
            'src/scripts/modules/**/*.js',
            'src/scripts/core/modules/**/*.js',
            'src/scripts/core/*.js',
            'src/scripts/contacts/**/*.js',
            'src/scripts/own-gear/**/*.js',
            'src/scripts/translations/**/*.js',
            'src/scripts/shims/**/*.js',
            'src/scripts/auto-gear/**/*.js',
            'src/scripts/runtime/**/*.js',
            'tests/dom/storage-migration.test.js',
        ],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },
    // Ignore CommonJS config files
    {
        ignores: ['**/*.cjs'],
    },
];
