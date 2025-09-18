const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

describe('parseFilterTokens', () => {
  let env;
  let parseFilterTokens;

  beforeEach(() => {
    env = setupScriptEnvironment();
    ({ parseFilterTokens } = env.utils);
  });

  afterEach(() => {
    env?.cleanup();
  });

  test('parses filter definitions with explicit sizes and values', () => {
    const tokens = parseFilterTokens(' IRND : 6x6 : 0.3 | 0.6 | 0.9 , Clear:95mm , Pol ');

    expect(tokens).toEqual([
      { type: 'IRND', size: '6x6', values: ['0.3', '0.6', '0.9'] },
      { type: 'Clear', size: '95mm', values: undefined },
      { type: 'Pol', size: '4x5.65', values: undefined }
    ]);
  });

  test('filters out empty entries while preserving order', () => {
    const tokens = parseFilterTokens('Pol,, , IRND:4x5.65:0.3|0.6|1.2, ,');

    expect(tokens).toEqual([
      { type: 'Pol', size: '4x5.65', values: undefined },
      { type: 'IRND', size: '4x5.65', values: ['0.3', '0.6', '1.2'] }
    ]);
  });

  test('returns an empty list for missing or blank definitions', () => {
    expect(parseFilterTokens('')).toEqual([]);
    expect(parseFilterTokens(' , , ')).toEqual([]);
    expect(parseFilterTokens(null)).toEqual([]);
  });
});
