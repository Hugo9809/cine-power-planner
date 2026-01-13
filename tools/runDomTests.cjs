#!/usr/bin/env node

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const JEST_BIN = path.join(ROOT_DIR, 'node_modules', 'jest', 'bin', 'jest.js');
const DOM_TEST_DIR = path.join(ROOT_DIR, 'tests', 'dom');

function fileExists(candidate) {
  try {
    return fs.statSync(candidate).isFile();
  } catch {
    return false;
  }
}

function resolveDomTestPath(input) {
  if (!input || typeof input !== 'string') return null;
  const normalized = input.replace(/\\/g, '/');

  const directPath = path.resolve(ROOT_DIR, normalized);
  if (fileExists(directPath)) {
    return directPath;
  }

  const domRelative = path.resolve(DOM_TEST_DIR, normalized);
  if (fileExists(domRelative)) {
    return domRelative;
  }

  const ensureTestSuffix = value => {
    if (value.endsWith('.test.js')) return value;
    if (value.endsWith('.js')) return value.replace(/\.js$/, '.test.js');
    return `${value}.test.js`;
  };

  const withSuffix = ensureTestSuffix(normalized);
  const domWithSuffix = path.resolve(DOM_TEST_DIR, withSuffix);
  if (fileExists(domWithSuffix)) {
    return domWithSuffix;
  }

  const rootWithSuffix = path.resolve(ROOT_DIR, withSuffix);
  if (fileExists(rootWithSuffix)) {
    return rootWithSuffix;
  }

  const searchTerm = path.basename(normalized).replace(/\.test\.js$/, '').replace(/\.js$/, '');
  if (!searchTerm) {
    return null;
  }

  const matches = [];
  const stack = [DOM_TEST_DIR];
  while (stack.length) {
    const current = stack.pop();
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
      if (!entry.name.endsWith('.test.js')) continue;
      if (entry.name.includes(searchTerm)) {
        matches.push(entryPath);
      }
    }
  }

  if (matches.length === 1) {
    return matches[0];
  }

  return null;
}

const rawArgs = process.argv.slice(2);
const jestArgs = ['--runInBand', '--selectProjects', 'dom'];
const passThrough = [];
const pathArgs = [];

for (const arg of rawArgs) {
  if (!arg || arg.startsWith('-')) {
    passThrough.push(arg);
    continue;
  }
  const resolved = resolveDomTestPath(arg);
  if (resolved) {
    pathArgs.push(resolved);
  } else {
    passThrough.push(arg);
  }
}

if (pathArgs.length) {
  jestArgs.push('--runTestsByPath', ...pathArgs);
}

jestArgs.push(...passThrough);

const result = spawnSync(
  process.execPath,
  [JEST_BIN, ...jestArgs],
  { stdio: 'inherit' }
);

if (typeof result.status === 'number') {
  process.exit(result.status);
}

process.exit(result.error ? 1 : 0);
