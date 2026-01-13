#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const SOURCE_FILE = path.join(ROOT_DIR, 'src', 'scripts', 'core', 'modules', 'core', 'pink-mode-animations.js');
const OUTPUT_FILE = path.join(ROOT_DIR, 'src', 'scripts', 'data', 'pink-mode-animated-icons.js');

function readPinkModeModule() {
  return fs.readFileSync(SOURCE_FILE, 'utf8');
}

function extractIconPaths(source) {
  const match = source.match(
    /const PINK_MODE_ANIMATED_ICON_FILES = Object\.freeze\(\[([\s\S]*?)\]\);/
  );

  if (!match) {
    throw new Error('Unable to locate PINK_MODE_ANIMATED_ICON_FILES in pink-mode module.');
  }

  const arrayLiteral = `[${match[1]}]`;

  try {
    const evaluated = Function(`"use strict"; return (${arrayLiteral});`)();
    if (!Array.isArray(evaluated)) {
      throw new Error('Icon list did not evaluate to an array.');
    }

    return evaluated.map(value => {
      if (typeof value !== 'string' || !value.trim()) {
        throw new Error('Encountered invalid icon entry in list.');
      }
      return value.trim();
    });
  } catch (error) {
    throw new Error(`Unable to parse icon list: ${error.message}`);
  }
}

function readAnimationData(relativePath) {
  const absolute = path.join(ROOT_DIR, relativePath);
  if (!fs.existsSync(absolute)) {
    throw new Error(`Missing animation file: ${relativePath}`);
  }

  const raw = fs.readFileSync(absolute, 'utf8');
  try {
    const parsed = JSON.parse(raw);
    return JSON.stringify(parsed);
  } catch (error) {
    throw new Error(`Invalid JSON in ${relativePath}: ${error.message}`);
  }
}

function buildStore(iconPaths) {
  const lines = iconPaths.map(iconPath => {
    const normalizedPath = iconPath.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    const jsonString = JSON.stringify(readAnimationData(iconPath));
    return `  store['${normalizedPath}'] = ${jsonString};`;
  });

  return lines.join('\n');
}

function createBundle(storeEntries) {
  const header = `/* Auto-generated pink mode animated icon data for offline use. */\n` +
    `(function(global){\n` +
    `  if (!global) return;\n` +
    `  var store = {};\n`;

  const footer = `  if (!global.cinePinkModeAnimatedIconData) {\n` +
    `    Object.defineProperty(global, 'cinePinkModeAnimatedIconData', {\n` +
    `      configurable: true,\n` +
    `      enumerable: false,\n` +
    `      writable: true,\n` +
    `      value: store\n` +
    `    });\n` +
    `  } else if (typeof global.cinePinkModeAnimatedIconData === "object") {\n` +
    `    for (var key in store) {\n` +
    `      if (Object.prototype.hasOwnProperty.call(store, key)) {\n` +
    `        global.cinePinkModeAnimatedIconData[key] = store[key];\n` +
    `      }\n` +
    `    }\n` +
    `  }\n` +
    `})(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : this);\n`;

  return `${header}${storeEntries}\n${footer}`;
}

function main() {
  const checkMode = process.argv.includes('--check');
  const source = readPinkModeModule();
  const iconPaths = extractIconPaths(source);
  const storeEntries = buildStore(iconPaths);
  const bundle = createBundle(storeEntries);

  if (checkMode) {
    const current = fs.existsSync(OUTPUT_FILE) ? fs.readFileSync(OUTPUT_FILE, 'utf8') : '';
    if (current !== bundle) {
      console.error('pink-mode animated icon store is out of date.');
      console.error(`Run \`node ${path.relative(ROOT_DIR, __filename)}\` to update.`);
      process.exitCode = 1;
    } else {
      console.log('Pink mode animated icon store is up to date.');
    }
    return;
  }

  fs.writeFileSync(OUTPUT_FILE, bundle, 'utf8');
  console.log(`Wrote ${iconPaths.length} pink mode animated icons to ${path.relative(ROOT_DIR, OUTPUT_FILE)}.`);
}

main();
