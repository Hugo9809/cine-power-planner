const { spawnSync } = require('child_process');

function run(script) {
  return spawnSync('node', [script, '--help'], { encoding: 'utf8' });
}

test('checkConsistency CLI --help', () => {
  const { stdout, status } = run('scripts/checkConsistency.js');
  expect(stdout).toMatch(/Usage: node scripts\/checkConsistency\.js \[--help\]/);
  expect(stdout).toMatch(/-h, --help\s+Show this help message and exit/);
  expect(status).toBe(0);
});

test('normalizeData CLI --help', () => {
  const { stdout, status } = run('scripts/normalizeData.js');
  expect(stdout).toMatch(/Usage: node scripts\/normalizeData\.js \[--help\]/);
  expect(stdout).toMatch(/-h, --help\s+Show this help message and exit/);
  expect(status).toBe(0);
});

test('unifyPorts CLI --help', () => {
  const { stdout, status } = run('scripts/unifyPorts.js');
  expect(stdout).toMatch(/Usage: node scripts\/unifyPorts\.js \[--help\]/);
  expect(stdout).toMatch(/-h, --help\s+Show this help message and exit/);
  expect(status).toBe(0);
});
