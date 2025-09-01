const { spawnSync } = require('child_process');

function run(script) {
  return spawnSync('node', [script, '--help'], { encoding: 'utf8' });
}

test('checkConsistency CLI --help', () => {
  const { stdout, status } = run('checkConsistency.js');
  expect(stdout).toMatch(/Usage: node checkConsistency\.js \[--help\]/);
  expect(stdout).toMatch(/-h, --help\s+Show this help message/);
  expect(status).toBe(0);
});

test('normalizeData CLI --help', () => {
  const { stdout, status } = run('normalizeData.js');
  expect(stdout).toMatch(/Usage: node normalizeData\.js \[--help\]/);
  expect(stdout).toMatch(/-h, --help\s+Show this help message/);
  expect(status).toBe(0);
});
