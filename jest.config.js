const baseProject = {
  testEnvironment: 'jsdom',
  setupFiles: ['jest-localstorage-mock'],
  moduleNameMapper: {
    '^lz-string$': '<rootDir>/tests/__mocks__/lz-string.js'
  }
};

module.exports = {
  workerIdleMemoryLimit: '1GB',
  projects: [
    {
      ...baseProject,
      displayName: 'core',
      testMatch: ['<rootDir>/tests/core/**/*.test.js']
    },
    {
      ...baseProject,
      displayName: 'persistence',
      testMatch: ['<rootDir>/tests/persistence/**/*.test.js']
    },
    {
      ...baseProject,
      displayName: 'integration',
      testMatch: ['<rootDir>/tests/integration/**/*.test.js']
    }
  ]
};
