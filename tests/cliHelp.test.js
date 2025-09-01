const { spawnSync } = require('child_process');

function run(script) {
  return spawnSync('node', [script, '--help'], { encoding: 'utf8' });
}

test('checkConsistency CLI --help', () => {
  const { stdout, status } = run('checkConsistency.js');
  expect(stdout).toMatch(/Usage: node checkConsistency\.js/);
  expect(status).toBe(0);
});

test('normalizeData CLI --help', () => {
  const { stdout, status } = run('normalizeData.js');
  expect(stdout).toMatch(/Usage: node normalizeData\.js/);
  expect(status).toBe(0);
});
