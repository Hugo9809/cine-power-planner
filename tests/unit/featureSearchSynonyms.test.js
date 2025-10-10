/** @jest-environment jsdom */

const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

describe('feature search token synonyms', () => {
  let env;
  let searchTokens;

  beforeEach(() => {
    process.env.CPP_RUNTIME_STUB = 'searchTokens';
    env = setupScriptEnvironment({ disableFreeze: true });
    searchTokens = env.utils?.searchTokens;
  });

  afterEach(() => {
    env?.cleanup();
    delete process.env.CPP_RUNTIME_STUB;
  });

  function getSearchTokens() {
    if (typeof searchTokens !== 'function') {
      throw new Error('feature search tokens helper is unavailable');
    }
    return searchTokens;
  }

  function expectTokensToContain(input, expectedTokens) {
    const tokens = getSearchTokens()(input);
    expect(Array.isArray(tokens)).toBe(true);
    expectedTokens.forEach(token => {
      expect(tokens).toEqual(expect.arrayContaining([token]));
    });
  }

  test('frames per second synonyms link fps queries and abbreviations', () => {
    expect(typeof getSearchTokens()).toBe('function');

    expectTokensToContain('fps', ['fps', 'frame', 'frames', 'second']);
    expectTokensToContain('frames per second', ['fps']);
  });

  test('energy capacity abbreviations map to watt-hour forms', () => {
    expectTokensToContain('watt hours', ['wh']);
    expectTokensToContain('wh', ['watt', 'hours']);
    expectTokensToContain('kilowatt hour', ['kwh']);
    expectTokensToContain('kwh', ['kilowatt']);
  });

  test('battery capacity includes amp-hour and milliamp-hour synonyms', () => {
    expectTokensToContain('amp hours', ['ah']);
    expectTokensToContain('ah', ['amp']);
    expectTokensToContain('milliamp hours', ['mah']);
    expectTokensToContain('mah', ['milliamp']);
  });

  test('common imaging abbreviations resolve to descriptive tokens', () => {
    expectTokensToContain('megapixels', ['mp']);
    expectTokensToContain('mp', ['megapixel']);
    expectTokensToContain('50 millimeters', ['mm']);
    expectTokensToContain('85 mm', ['millimeter']);
  });

  test('imperial measurements share abbreviations and full words', () => {
    expectTokensToContain('5" monitor', ['inch', 'in']);
    expectTokensToContain("6' stand", ['ft', 'foot']);
    expectTokensToContain('2 inch adapter', ['in']);
    expectTokensToContain('3 ft boom', ['foot', 'feet']);
  });

  test('exposure value searches align with EV abbreviation', () => {
    expectTokensToContain('exposure value', ['ev']);
    expectTokensToContain('ev', ['exposure']);
  });
});

