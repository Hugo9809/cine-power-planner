const { spawnSync } = require('child_process');

function run(script) {
  return spawnSync('node', [script, '--help'], { encoding: 'utf8' });
}

test('checkConsistency CLI --help', () => {
  const { stdout, status } = run('checkConsistency.js');
  expect(stdout).toMatch(/Usage: node checkConsistency\.js \[--help\]/);
  expect(stdout).toMatch(/-h, --help\s+Show this help message and exit/);
  expect(stdout).toContain('Tips:');
  expect(stdout).toContain('Leaves data.js untouched');
  expect(status).toBe(0);
});

test('normalizeData CLI --help', () => {
  const { stdout, status } = run('normalizeData.js');
  expect(stdout).toMatch(/Usage: node normalizeData\.js \[--help\]/);
  expect(stdout).toMatch(/-h, --help\s+Show this help message and exit/);
  expect(stdout).toContain('What it does:');
  expect(stdout).toContain('Harmonizes connector names');
  expect(status).toBe(0);
});

test('unifyPorts CLI --help', () => {
  const { stdout, status } = run('unifyPorts.js');
  expect(stdout).toMatch(/Usage: node unifyPorts\.js \[--help\]/);
  expect(stdout).toMatch(/-h, --help\s+Show this help message and exit/);
  expect(stdout).toContain('Key actions:');
  expect(stdout).toContain('Converts legacy powerInput strings');
  expect(status).toBe(0);
});

test('generateSchema CLI --help', () => {
  const { stdout, status } = run('generateSchema.js');
  expect(stdout).toMatch(/Usage: node generateSchema\.js \[--help\]/);
  expect(stdout).toMatch(/-h, --help\s+Show this help message and exit/);
  expect(stdout).toContain('writes schema.json in the project root');
  expect(status).toBe(0);
});
