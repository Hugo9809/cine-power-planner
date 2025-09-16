const createProject = (name, environment, pattern) => ({
  displayName: name,
  testEnvironment: environment,
  testMatch: [pattern],
  setupFiles: ['jest-localstorage-mock'],
  moduleNameMapper: {
    '^lz-string$': '<rootDir>/tests/__mocks__/lz-string.js'
  }
});

module.exports = {
  projects: [
    createProject('unit', 'node', '<rootDir>/tests/unit/**/*.test.js'),
    createProject('data', 'node', '<rootDir>/tests/data/**/*.test.js'),
    createProject('dom', 'jsdom', '<rootDir>/tests/dom/**/*.test.js'),
    createProject('script', 'jsdom', '<rootDir>/tests/script/**/*.test.js')
  ],
  workerIdleMemoryLimit: '1GB',
  maxWorkers: 1,
  bail: 1
};
