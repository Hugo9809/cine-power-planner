const fs = require('fs');
const path = require('path');

function loadFallbackEngine() {
  const sourcePath = path.join(__dirname, '..', '..', 'src', 'scripts', 'app-core-new-2.js');
  const source = fs.readFileSync(sourcePath, 'utf8');
  const startMarker = 'function createFeatureSearchEngineFallback() {';
  const startIndex = source.indexOf(startMarker);
  if (startIndex === -1) {
    throw new Error('createFeatureSearchEngineFallback definition not found');
  }

  let depth = 0;
  let endIndex = -1;
  for (let index = startIndex; index < source.length; index += 1) {
    const char = source[index];
    if (char === '{') {
      depth += 1;
    } else if (char === '}') {
      depth -= 1;
      if (depth === 0) {
        endIndex = index;
        break;
      }
    }
  }

  if (endIndex === -1) {
    throw new Error('Unable to locate the end of createFeatureSearchEngineFallback');
  }

  const functionSource = source.slice(startIndex, endIndex + 1);
  const factory = new Function(`${functionSource}; return createFeatureSearchEngineFallback();`);
  return factory();
}

describe('feature search fallback', () => {
  const fallback = loadFallbackEngine();

  test('normalizes spelled-out numbers to digits', () => {
    expect(fallback.normalizeNumberWords('Twenty one lights')).toBe('21 lights');
    expect(fallback.normalizeNumberWords('Ninety nine problems')).toBe('99 problems');
  });

  test('search tokens include number-normalized variants', () => {
    const tokens = fallback.searchTokens('Twenty one adapters');
    expect(tokens).toEqual(expect.arrayContaining(['twenty', 'one', '21', 'adapters']));
  });

  test('search key reflects normalized number words', () => {
    expect(fallback.searchKey('Twenty one adapters')).toBe('21adapters');
  });
});
