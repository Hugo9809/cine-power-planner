const fs = require('fs');
const path = require('path');

const engineModule = require('../../src/scripts/modules/features/feature-search-engine.js');

function loadFilterFunction() {
  const sourcePath = path.join(__dirname, '..', '..', 'src', 'scripts', 'app-core-new-2.js');
  const source = fs.readFileSync(sourcePath, 'utf8');
  const stopWordsMarker = 'const FEATURE_SEARCH_STOP_WORDS = new Set([';
  const startIndex = source.indexOf(stopWordsMarker);
  if (startIndex === -1) {
    throw new Error('FEATURE_SEARCH_STOP_WORDS definition not found');
  }

  const functionMarker = 'const filterFeatureSearchQueryTokens = tokens => {';
  const functionIndex = source.indexOf(functionMarker, startIndex);
  if (functionIndex === -1) {
    throw new Error('filterFeatureSearchQueryTokens definition not found');
  }

  const braceStart = source.indexOf('{', functionIndex);
  if (braceStart === -1) {
    throw new Error('Unable to locate opening brace for filterFeatureSearchQueryTokens');
  }

  let depth = 0;
  let bodyEnd = -1;
  for (let index = braceStart; index < source.length; index += 1) {
    const char = source[index];
    if (char === '{') {
      depth += 1;
    } else if (char === '}') {
      depth -= 1;
      if (depth === 0) {
        bodyEnd = index;
        break;
      }
    }
  }

  if (bodyEnd === -1) {
    throw new Error('Unable to locate the end of filterFeatureSearchQueryTokens');
  }

  const semicolonIndex = source.indexOf(';', bodyEnd);
  if (semicolonIndex === -1) {
    throw new Error('Unable to locate terminating semicolon for filterFeatureSearchQueryTokens');
  }

  const snippet = source.slice(startIndex, semicolonIndex + 1);
  const factory = new Function(`${snippet}; return { filterFeatureSearchQueryTokens, FEATURE_SEARCH_STOP_WORDS };`);
  return factory();
}

describe('feature search stop words', () => {
  const { filterFeatureSearchQueryTokens } = loadFilterFunction();

  test('removes conversational stop words before scoring tokens', () => {
    const engine = engineModule.createEngine();
    const tokens = engine.searchTokens('do I back up');
    const filtered = filterFeatureSearchQueryTokens(tokens);

    expect(filtered).not.toContain('do');
    expect(filtered).not.toContain('i');
    expect(filtered).toContain('up');
  });

  test('retains original tokens when everything is filtered out to preserve scoring', () => {
    const filtered = filterFeatureSearchQueryTokens(['do', 'i']);
    expect(filtered).toEqual(['do', 'i']);
  });
});
