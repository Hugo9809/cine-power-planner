const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const ROOT_DIR = path.resolve(__dirname, '..');
const UNIT_TEST_DIR = path.join(ROOT_DIR, 'tests', 'unit');
const JEST_BIN = path.join(ROOT_DIR, 'node_modules', 'jest', 'bin', 'jest.js');
const BASE_ARGS = ['--runInBand', '--selectProjects', 'unit'];

class AmbiguousUnitTestSelectionError extends Error {
  constructor(input, matches) {
    super(`Multiple unit test files match "${input}". Please be more specific.`);
    this.name = 'AmbiguousUnitTestSelectionError';
    this.input = input;
    this.matches = matches;
  }
}

function safeStat(target) {
  try {
    return fs.statSync(target);
  } catch {
    return null;
  }
}

function isFile(target) {
  const stats = safeStat(target);
  return Boolean(stats && stats.isFile());
}

function isDirectory(target) {
  const stats = safeStat(target);
  return Boolean(stats && stats.isDirectory());
}

function ensureTestSuffix(value) {
  if (!value) {
    return value;
  }

  if (value.endsWith('.test.js')) {
    return value;
  }

  if (value.endsWith('.js')) {
    return value.replace(/\.js$/, '.test.js');
  }

  return `${value}.test.js`;
}

function collectUnitTestFiles(dir) {
  const results = [];
  const stack = [dir];

  while (stack.length) {
    const current = stack.pop();
    let entries;

    try {
      entries = fs.readdirSync(current);
    } catch {
      continue;
    }

    for (const entry of entries) {
      const entryPath = path.join(current, entry);
      const stats = safeStat(entryPath);

      if (!stats) {
        continue;
      }

      if (stats.isDirectory()) {
        stack.push(entryPath);
        continue;
      }

      if (stats.isFile() && entry.endsWith('.test.js')) {
        results.push(entryPath);
      }
    }
  }

  return results;
}

let cachedUnitTestFiles = null;

function getAllUnitTestFiles() {
  if (!cachedUnitTestFiles) {
    cachedUnitTestFiles = collectUnitTestFiles(UNIT_TEST_DIR).sort();
  }

  return cachedUnitTestFiles;
}

function findTestsMatchingTerm(term) {
  const normalized = term.replace(/\\/g, '/');
  const base = path.basename(normalized).replace(/\.test\.js$/, '').replace(/\.js$/, '');

  if (!base) {
    return [];
  }

  const search = base.toLowerCase();
  const allFiles = getAllUnitTestFiles();
  const exactMatches = [];
  const partialMatches = [];

  for (const file of allFiles) {
    const candidateBase = path.basename(file).replace(/\.test\.js$/, '');
    const candidateNormalized = candidateBase.toLowerCase();

    if (candidateNormalized === search) {
      exactMatches.push(file);
      continue;
    }

    if (candidateNormalized.includes(search)) {
      partialMatches.push(file);
    }
  }

  if (exactMatches.length === 1) {
    return exactMatches;
  }

  if (exactMatches.length > 1) {
    throw new AmbiguousUnitTestSelectionError(term, exactMatches);
  }

  if (partialMatches.length === 1) {
    return partialMatches;
  }

  if (partialMatches.length > 1) {
    throw new AmbiguousUnitTestSelectionError(term, partialMatches);
  }

  return [];
}

function resolveUnitTestInput(input, options = {}) {
  const { cwd = process.cwd() } = options;

  if (!input) {
    return [];
  }

  const normalizedInput = input.replace(/\\/g, '/');
  const directPath = path.isAbsolute(normalizedInput)
    ? normalizedInput
    : path.resolve(cwd, normalizedInput);

  if (isFile(directPath)) {
    return [directPath];
  }

  if (isDirectory(directPath)) {
    return collectUnitTestFiles(directPath);
  }

  const unitRelative = path.resolve(UNIT_TEST_DIR, normalizedInput);

  if (isFile(unitRelative)) {
    return [unitRelative];
  }

  if (isDirectory(unitRelative)) {
    return collectUnitTestFiles(unitRelative);
  }

  const ensured = ensureTestSuffix(normalizedInput);
  const directWithSuffix = path.isAbsolute(ensured)
    ? ensured
    : path.resolve(cwd, ensured);

  if (isFile(directWithSuffix)) {
    return [directWithSuffix];
  }

  const unitWithSuffix = path.resolve(UNIT_TEST_DIR, ensured);

  if (isFile(unitWithSuffix)) {
    return [unitWithSuffix];
  }

  return findTestsMatchingTerm(normalizedInput);
}

function resolveUnitTestCliArgs(args, options = {}) {
  const resolvedPaths = [];
  const forwardedArgs = [];

  for (const arg of args) {
    if (!arg || arg.startsWith('-')) {
      forwardedArgs.push(arg);
      continue;
    }

    let matches;

    try {
      matches = resolveUnitTestInput(arg, options);
    } catch (error) {
      if (error instanceof AmbiguousUnitTestSelectionError) {
        throw error;
      }

      forwardedArgs.push(arg);
      continue;
    }

    if (matches.length) {
      for (const match of matches) {
        if (!resolvedPaths.includes(match)) {
          resolvedPaths.push(match);
        }
      }
      continue;
    }

    forwardedArgs.push(arg);
  }

  return { testPaths: resolvedPaths, forwardedArgs };
}

function runUnitTests(argv = process.argv.slice(2), options = {}) {
  let resolution;

  try {
    resolution = resolveUnitTestCliArgs(argv, options);
  } catch (error) {
    if (error instanceof AmbiguousUnitTestSelectionError) {
      console.error(error.message);
      for (const match of error.matches) {
        console.error(` - ${match}`);
      }
      return 1;
    }

    throw error;
  }

  const jestArgs = [...BASE_ARGS];

  if (resolution.testPaths.length) {
    jestArgs.push('--runTestsByPath', ...resolution.testPaths);
  }

  jestArgs.push(...resolution.forwardedArgs);

  const result = spawnSync(
    process.execPath,
    ['--max-old-space-size=1024', JEST_BIN, ...jestArgs],
    { stdio: 'inherit' }
  );

  if (result.error) {
    console.error(result.error);
    return 1;
  }

  return result.status ?? 1;
}

if (require.main === module) {
  const exitCode = runUnitTests();
  process.exit(exitCode);
}

module.exports = {
  AmbiguousUnitTestSelectionError,
  resolveUnitTestInput,
  resolveUnitTestCliArgs,
  runUnitTests
};
