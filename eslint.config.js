const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    ignores: ['node_modules/**'],
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
    files: ['script.js'],
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
      },
    },
  },
  {
    files: ['tests/**'],
    languageOptions: {
      globals: globals.jest,
    },
  },
];
