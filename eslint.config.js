const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  { ignores: ['vendor/**', 'src/vendor/**', 'legacy/**', 'src/scripts/script.js'] },
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
    files: ['src/scripts/**/*.js'],
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
