const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const ROOT_DIR = path.resolve(__dirname, '..');
const JEST_BIN = path.join(ROOT_DIR, 'node_modules', 'jest', 'bin', 'jest.js');
const UNIT_TEST_DIR = path.join(ROOT_DIR, 'tests', 'unit');

function statSafe(candidate) {
  try {
    return fs.statSync(candidate);
  } catch {
    return null;
  }
}

function ensureTestSuffix(value) {
  if (value.endsWith('.test.js')) return value;
  if (value.endsWith('.js')) return value.replace(/\.js$/, '.test.js');
  return `${value}.test.js`;
}

function collectTestsFromDirectory(directory) {
  const stack = [directory];
  const matches = [];

  while (stack.length) {
    const current = stack.pop();
    const stat = statSafe(current);
    if (!stat || !stat.isDirectory()) {
      continue;
    }

    let entries;
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      continue;
    }

    for (const entry of entries) {
      const entryPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(entryPath);
        continue;
      }
      if (!entry.isFile()) continue;
      if (entry.name.endsWith('.test.js')) {
        matches.push(entryPath);
      }
    }
  }

  return matches.sort();
}

function resolveUnitTestArg(rawInput) {
  if (!rawInput || typeof rawInput !== 'string') {
    return { type: 'passthrough' };
  }

  const normalized = rawInput.replace(/\\/g, '/');

  const fromCwd = path.resolve(process.cwd(), normalized);
  const cwdStat = statSafe(fromCwd);
  if (cwdStat) {
    if (cwdStat.isFile()) {
      return { type: 'paths', paths: [fromCwd] };
    }
    if (cwdStat.isDirectory()) {
      const collected = collectTestsFromDirectory(fromCwd);
      if (collected.length === 0) {
        return {
          type: 'error',
          message: `No unit test files found in directory "${rawInput}".`
        };
      }
      return { type: 'paths', paths: collected };
    }
  }

  const unitRelative = path.resolve(UNIT_TEST_DIR, normalized);
  const unitStat = statSafe(unitRelative);
  if (unitStat) {
    if (unitStat.isFile()) {
      return { type: 'paths', paths: [unitRelative] };
    }
    if (unitStat.isDirectory()) {
      const collected = collectTestsFromDirectory(unitRelative);
      if (collected.length === 0) {
        return {
          type: 'error',
          message: `No unit test files found in directory "${rawInput}".`
        };
      }
      return { type: 'paths', paths: collected };
    }
  }

  const withSuffix = ensureTestSuffix(normalized);
  const unitWithSuffix = path.resolve(UNIT_TEST_DIR, withSuffix);
  if (statSafe(unitWithSuffix)?.isFile()) {
    return { type: 'paths', paths: [unitWithSuffix] };
  }

  const rootWithSuffix = path.resolve(ROOT_DIR, withSuffix);
  if (statSafe(rootWithSuffix)?.isFile()) {
    return { type: 'paths', paths: [rootWithSuffix] };
  }

  const searchTerm = path.basename(normalized).replace(/\.test\.js$/, '').replace(/\.js$/, '');
  if (!searchTerm) {
    return { type: 'passthrough' };
  }

  const exactMatches = [];
  const fuzzyMatches = [];
  const stack = [UNIT_TEST_DIR];
  while (stack.length) {
    const current = stack.pop();
    const stat = statSafe(current);
    if (!stat || !stat.isDirectory()) {
      continue;
    }

    let entries;
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      continue;
    }

    for (const entry of entries) {
      const entryPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(entryPath);
        continue;
      }
      if (!entry.isFile() || !entry.name.endsWith('.test.js')) continue;
      const baseName = entry.name.replace(/\.test\.js$/, '');
      if (baseName === searchTerm) {
        exactMatches.push(entryPath);
        continue;
      }
      if (entry.name.includes(searchTerm)) {
        fuzzyMatches.push(entryPath);
      }
    }
  }

  if (exactMatches.length === 1) {
    return { type: 'paths', paths: exactMatches };
  }
  if (exactMatches.length > 1) {
    const relativeMatches = exactMatches
      .map(match => path.relative(ROOT_DIR, match))
      .sort();
    return {
      type: 'error',
      message: `Ambiguous unit test reference "${rawInput}". Possible matches:\n  ${relativeMatches.join('\n  ')}`
    };
  }

  if (fuzzyMatches.length === 1) {
    return { type: 'paths', paths: fuzzyMatches };
  }
  if (fuzzyMatches.length > 1) {
    const relativeMatches = fuzzyMatches
      .map(match => path.relative(ROOT_DIR, match))
      .sort();
    return {
      type: 'error',
      message: `Ambiguous unit test reference "${rawInput}". Possible matches:\n  ${relativeMatches.join('\n  ')}`
    };
  }

  return { type: 'passthrough' };
}

const cliArgs = process.argv.slice(2);
const testPaths = [];
const forwardedArgs = [];

for (const arg of cliArgs) {
  if (!arg || arg.startsWith('-')) {
    forwardedArgs.push(arg);
    continue;
  }

  const resolution = resolveUnitTestArg(arg);
  if (resolution.type === 'paths') {
    testPaths.push(...resolution.paths);
    continue;
  }
  if (resolution.type === 'error') {
    console.error(resolution.message);
    process.exit(1);
  }

  forwardedArgs.push(arg);
}

const jestArgs = ['--runInBand', '--selectProjects', 'unit'];

if (testPaths.length > 0) {
  jestArgs.push('--runTestsByPath', ...testPaths);
}

jestArgs.push(...forwardedArgs);

const result = spawnSync(
  process.execPath,
  ['--max-old-space-size=1024', JEST_BIN, ...jestArgs],
  { stdio: 'inherit' }
);

if (typeof result.status === 'number') {
  process.exit(result.status);
}

// If Jest exited due to a signal, status will be null. Treat this as a failure so
// the runner preserves the non-zero exit semantics of the previous implementation.
process.exit(1);
