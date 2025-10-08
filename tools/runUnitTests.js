const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const jestBin = path.resolve(__dirname, '../node_modules/jest/bin/jest.js');
const baseArgs = ['--runInBand', '--selectProjects', 'unit'];
const cliArgs = process.argv.slice(2);
const testPaths = [];
const forwardedArgs = [];

for (const arg of cliArgs) {
  if (arg.startsWith('-')) {
    forwardedArgs.push(arg);
    continue;
  }

  const maybeAbsolute = path.isAbsolute(arg) ? arg : path.resolve(process.cwd(), arg);
  if (fs.existsSync(maybeAbsolute)) {
    testPaths.push(maybeAbsolute);
    continue;
  }

  const unitPath = path.resolve(process.cwd(), 'tests', 'unit', arg);
  if (fs.existsSync(unitPath)) {
    testPaths.push(unitPath);
    continue;
  }

  testPaths.push(arg);
}

const jestArgs = [...baseArgs];

if (testPaths.length > 0) {
  jestArgs.push('--runTestsByPath', ...testPaths);
}

jestArgs.push(...forwardedArgs);

const result = spawnSync(process.execPath, ['--max-old-space-size=1024', jestBin, ...jestArgs], {
  stdio: 'inherit'
});

if (result.error) {
  console.error(result.error);
}

process.exit(result.status ?? 1);
