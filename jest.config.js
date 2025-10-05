const createProject = (name, environment, pattern) => ({
  displayName: name,
  testEnvironment: environment,
  testMatch: [pattern],
  setupFiles: ['<rootDir>/tests/setup/consoleFacade.js', 'jest-localstorage-mock'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup/jest.setup.js'],
  moduleNameMapper: {
    '^lz-string$': '<rootDir>/tests/__mocks__/lz-string.js'
  }
});

const projects = [
  createProject('unit', 'node', '<rootDir>/tests/unit/**/*.test.js'),
  createProject('data', 'node', '<rootDir>/tests/data/**/*.test.js'),
  createProject('dom', 'jsdom', '<rootDir>/tests/dom/**/*.test.js'),
];

if (process.env.RUN_HEAVY_TESTS === 'true') {
  projects.push(
    createProject('script', 'jsdom', '<rootDir>/tests/script/**/*.test.js')
  );
}

module.exports = {
  projects,
  workerIdleMemoryLimit: '1GB',
  maxWorkers: 1,
  bail: 1
};
