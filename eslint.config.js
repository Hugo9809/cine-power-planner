const fs = require('fs');
const path = require('path');
const js = require('@eslint/js');
const globals = require('globals');
const appScriptGlobals = require('./tools/appScriptGlobals.json');

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
    'app-core-enviroment',
    'app-core-new-2',
    'app-core-runtime-support',
    'app-core-runtime-helpers',
  ],
};

const appScriptConfigs = Object.entries(appScriptGlobals).flatMap(([key, names]) => {
  const fileKeys = [key, ...(additionalAppScriptFiles[key] || [])];
  const combinedNames = [...new Set([...names, ...(additionalGlobalsByKey[key] || [])])];
  return fileKeys
    .map(fileKey => `src/scripts/${fileKey}.js`)
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
        ...(key === 'app-core'
          ? {
            'no-undef': 'off',
            'no-redeclare': 'off',
          }
          : {}),
      },
    }));
});

module.exports = [
  { ignores: ['vendor/**', 'src/vendor/**', 'legacy/**'] },
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
    files: ['src/scripts/script.js'],
    languageOptions: {
      globals: {
        devices: 'writable',
        loadDeviceData: 'readonly',
        saveDeviceData: 'readonly',
        loadSetups: 'readonly',
        saveSetups: 'readonly',
        saveSetup: 'readonly',
        loadSetup: 'readonly',
        deleteSetup: 'readonly',
        loadFeedback: 'readonly',
        saveFeedback: 'readonly',
      },
    },
  },
  {
    files: ['**/modern-support-check.{js,mjs}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...baseGlobals,
      },
    },
  },
  ...appScriptConfigs,
  {
    files: ['tests/**'],
    languageOptions: {
      globals: globals.jest,
    },
  },
];
