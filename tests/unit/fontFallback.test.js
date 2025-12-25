const fs = require('fs');
const path = require('path');

function extractGuessFontFallback() {
  const sourcePath = path.join(__dirname, '../../src/scripts/core/app-core-new-2.js');
  const source = fs.readFileSync(sourcePath, 'utf8');
  const match = source.match(
    /function guessFontFallback\(name\) {([\s\S]*?)\n\s*}\n\s*function buildFontFamilyValue/,
  );
  if (!match) {
    throw new Error('guessFontFallback function definition could not be located.');
  }

  const functionBody = match[1];
  return new Function(
    `return function guessFontFallback(name) {${functionBody}\n    };`,
  )();
}

describe('guessFontFallback', () => {
  test('Calligraphy Script maps to cursive fallback', () => {
    const guessFontFallback = extractGuessFontFallback();
    expect(guessFontFallback('Calligraphy Script')).toBe('cursive');
    expect(guessFontFallback('CALLIGRAPHY script')).toBe('cursive');
  });
});
