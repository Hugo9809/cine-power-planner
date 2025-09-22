const js = require('@eslint/js');
const globals = require('globals');
const appScriptGlobals = require('./tools/appScriptGlobals.json');

const baseGlobals = {
  ...globals.browser,
  ...globals.node,
};

const buildAppScriptGlobals = (names = []) =>
  Object.fromEntries(names.map(name => [name, 'writable']));

const appScriptConfigs = Object.entries(appScriptGlobals).map(([key, names]) => ({
  files: [`src/scripts/${key}.js`],
  languageOptions: {
    globals: {
      ...baseGlobals,
      ...buildAppScriptGlobals(names),
    },
  },
  rules: {
    'no-unused-vars': 'off',
  },
}));

module.exports = [
  { ignores: ['vendor/**', 'src/vendor/**', 'legacy/**'] },
  js.configs.recommended,
  {
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
  ...appScriptConfigs,
  {
    files: ['tests/**'],
    languageOptions: {
      globals: globals.jest,
    },
  },
];
