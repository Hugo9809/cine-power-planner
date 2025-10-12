const engineModule = require('../../src/scripts/modules/features/feature-search-engine.js');

describe('feature search engine module', () => {
  let engine;

  beforeEach(() => {
    expect(typeof engineModule.createEngine).toBe('function');
    engine = engineModule.createEngine();
  });

  test('normalizes search keys with punctuation, ligatures and units', () => {
    expect(engine.searchKey('Wi‑Fi “Pro” 12°')).toBe('wifipro12deg');
    expect(engine.searchKey('Æther & Co.')).toBe('aetherandco');
    expect(engine.searchKey('Mark IV')).toBe('mk4');
    expect(engine.searchKey('5\'8" rig plate')).toBe('5ft8inchrigplate');
    expect(engine.searchKey('0\t\t\t backdrop')).toBe('0backdrop');
    expect(engine.searchKey("12\t\t' rig")).toBe('12ftrig');
  });

  test('collects search tokens with synonyms and numeric variants', () => {
    const tokens = engine.searchTokens('Battery 12° & 3×5');
    expect(tokens).toEqual(expect.arrayContaining(['battery', '12', 'deg', '3', '5', 'x', 'and']));

    const synonyms = engine.searchTokens('frames per second');
    expect(synonyms).toEqual(expect.arrayContaining(['fps', 'frame', 'frames', 'second']));

    const capacity = engine.searchTokens('90 watt hours');
    expect(capacity).toEqual(expect.arrayContaining(['90', 'wh', 'watt', 'hours']));

    const measurements = engine.searchTokens('5" monitor mount with 6\' stand');
    expect(measurements).toEqual(expect.arrayContaining(['inch', 'in', 'ft', 'foot']));
  });

  test('parses mark suffixes with roman numerals', () => {
    expect(engine.parseMarkSuffix('iv')).toEqual({ cleaned: 'iv', number: 4 });
    expect(engine.parseMarkSuffix('iii')).toEqual({ cleaned: 'iii', number: 3 });
    expect(engine.parseMarkSuffix('7')).toEqual({ cleaned: '7', number: 7 });
  });

  test('scores token matches and finds best map entry including fuzzy matches', () => {
    const searchMap = new Map();
    const fpsKey = engine.searchKey('Frame Rate');
    searchMap.set(fpsKey, {
      label: 'Frame Rate',
      tokens: engine.searchTokens('Frames Per Second FPS setting'),
    });
    const batteryKey = engine.searchKey('Battery Runtime');
    searchMap.set(batteryKey, {
      label: 'Battery Runtime',
      tokens: engine.searchTokens('battery life hours runtime'),
    });

    const queryTokens = engine.searchTokens('fram rate');
    const result = engine.findBestSearchMatch(searchMap, engine.searchKey('fram rate'), queryTokens);
    expect(result).toBeDefined();
    expect(result.key).toBe(fpsKey);
    expect(result.matchType === 'fuzzy' || result.matchType === 'token').toBe(true);

    const scoreDetails = engine.computeTokenMatchDetails(
      searchMap.get(fpsKey).tokens,
      engine.searchTokens('frame rate')
    );
    expect(scoreDetails.score).toBeGreaterThan(0);
    expect(scoreDetails.matched).toBeGreaterThan(0);
  });
});
