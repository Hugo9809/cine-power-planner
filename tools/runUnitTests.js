const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const jestBin = path.resolve(__dirname, '../node_modules/jest/bin/jest.js');
const baseArgs = ['--runInBand', '--selectProjects', 'unit'];
const cliArgs = process.argv.slice(2);
const testPaths = [];
const forwardedArgs = [];
const projectRoot = process.cwd();
const testsRoot = path.resolve(projectRoot, 'tests');

const isWithinTestsDirectory = (filePath) => {
  const relative = path.relative(testsRoot, filePath);
  return relative && !relative.startsWith('..') && !path.isAbsolute(relative);
};

const resolveTestPath = (candidate) => {
  const directPath = path.isAbsolute(candidate)
    ? candidate
    : path.resolve(projectRoot, candidate);

  if (fs.existsSync(directPath) && isWithinTestsDirectory(directPath)) {
    return directPath;
  }

  const unitPath = path.resolve(projectRoot, 'tests', 'unit', candidate);
  if (fs.existsSync(unitPath)) {
    return unitPath;
  }

  return null;
};

for (let index = 0; index < cliArgs.length; index += 1) {
  const arg = cliArgs[index];

  if (arg.startsWith('-')) {
    forwardedArgs.push(arg);

    const next = cliArgs[index + 1];
    if (next && !next.startsWith('-')) {
      forwardedArgs.push(next);
      index += 1;
    }

    continue;
  }

  const resolved = resolveTestPath(arg);
  if (resolved) {
    testPaths.push(resolved);
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
