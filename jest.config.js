module.exports = {
  testEnvironment: 'jsdom',
  setupFiles: ['jest-localstorage-mock'],
  moduleNameMapper: {
    '^lz-string$': '<rootDir>/tests/__mocks__/lz-string.js'
  }
};
