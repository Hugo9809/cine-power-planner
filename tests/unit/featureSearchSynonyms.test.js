/** @jest-environment jsdom */

const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

describe('feature search token synonyms', () => {
  let env;
  let searchTokens;

  beforeEach(() => {
    env = setupScriptEnvironment();
    searchTokens = env.utils?.searchTokens;
  });

  afterEach(() => {
    env?.cleanup();
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

  test('exposure value searches align with EV abbreviation', () => {
    expectTokensToContain('exposure value', ['ev']);
    expectTokensToContain('ev', ['exposure']);
  });

  test('data safety verbs surface save, backup, import and restore tools together', () => {
    expectTokensToContain('backup footage', ['save', 'restore', 'import']);
    expectTokensToContain('restore project', ['backup', 'save', 'import']);
    expectTokensToContain('import bundle', ['save', 'restore']);
  });

  test('sharing language links export and download workflows', () => {
    expectTokensToContain('share link', ['export', 'download']);
    expectTokensToContain('download archive', ['share', 'export']);
  });

  test('sync and duplication keywords expand related matches', () => {
    expectTokensToContain('sync presets', ['synchronize']);
    expectTokensToContain('copy device', ['duplicate', 'clone']);
  });
});

