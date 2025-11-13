const engineModule = require('../../src/scripts/modules/features/feature-search-engine.js');
const loadFeatureSearchStopWordHelpers = require('../helpers/featureSearchStopWordsHelper');

describe('feature search stop words', () => {
  const { filterFeatureSearchQueryTokens } = loadFeatureSearchStopWordHelpers();

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
