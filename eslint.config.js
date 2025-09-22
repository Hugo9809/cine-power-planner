const js = require('@eslint/js');
const globals = require('globals');

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
  {
    files: ['src/scripts/app-core.js'],
    rules: {
      'no-undef': 'off',
      'no-unused-vars': 'off',
    },
  },
  {
    files: [
      'src/scripts/app-events.js',
      'src/scripts/app-setups.js',
      'src/scripts/app-session.js',
    ],
    rules: {
      'no-undef': 'off',
      'no-unused-vars': 'off',
    },
  },
  {
    files: ['tests/**'],
    languageOptions: {
      globals: globals.jest,
    },
  },
];
