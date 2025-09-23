const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

describe('global feature search helpers', () => {
  let env;
  let searchKey;
  let searchTokens;
  let findBestSearchMatch;
  let runFeatureSearch;
  let featureSearchInternals;

  const resetFeatureSearchState = () => {
    if (!featureSearchInternals) return;
    const {
      featureMap,
      deviceMap,
      helpMap,
      featureListElement,
      featureSearchInput,
      featureSearchEntries,
      featureSearchDefaultOptions,
    } = featureSearchInternals;

    featureMap.clear();
    deviceMap.clear();
    helpMap.clear();
    featureSearchEntries.length = 0;
    featureSearchDefaultOptions.length = 0;
    if (featureListElement) {
      featureListElement.innerHTML = '';
    }
    if (featureSearchInput) {
      featureSearchInput.value = '';
    }
  };

  beforeAll(() => {
    env = setupScriptEnvironment();
    ({
      searchKey,
      searchTokens,
      findBestSearchMatch,
      runFeatureSearch,
      __featureSearchInternals: featureSearchInternals,
    } = env.utils);
    resetFeatureSearchState();
  });

  afterAll(() => {
    env.cleanup();
  });

  beforeEach(() => {
    resetFeatureSearchState();
  });

  test('searchTokens exposes hyphenated and numeric tokens', () => {
    const tokens = searchTokens('12V Power Input');
    expect(tokens).toEqual(
      expect.arrayContaining(['12v', 'power', 'input'])
    );
  });

  test('findBestSearchMatch matches words regardless of order', () => {
    const entries = new Map();
    entries.set(
      searchKey('12V Power Input'),
      { label: '12V Power Input', tokens: searchTokens('12V Power Input') }
    );
    entries.set(
      searchKey('Power Distribution'),
      { label: 'Power Distribution', tokens: searchTokens('Power Distribution') }
    );

    const result = findBestSearchMatch(
      entries,
      searchKey('power 12v'),
      searchTokens('power 12v')
    );

    expect(result?.value.label).toBe('12V Power Input');
  });

  test('findBestSearchMatch pairs combined queries with split tokens', () => {
    const entries = new Map();
    entries.set(
      searchKey('B-Mount Battery Plate'),
      {
        label: 'B-Mount Battery Plate',
        tokens: searchTokens('B-Mount Battery Plate')
      }
    );

    const result = findBestSearchMatch(
      entries,
      searchKey('b mount battery'),
      searchTokens('b mount battery')
    );

    expect(result?.value.label).toBe('B-Mount Battery Plate');
  });

  test('findBestSearchMatch tolerates unmatched query tokens', () => {
    const entries = new Map();
    entries.set(
      searchKey('12V Power Input'),
      {
        label: '12V Power Input',
        tokens: searchTokens('12V Power Input')
      }
    );
    entries.set(
      searchKey('Power Distribution'),
      {
        label: 'Power Distribution',
        tokens: searchTokens('Power Distribution')
      }
    );

    const result = findBestSearchMatch(
      entries,
      searchKey('power 12v camera rig'),
      searchTokens('power 12v camera rig')
    );

    expect(result?.value.label).toBe('12V Power Input');
  });

  test('searchTokens expose initialism tokens', () => {
    const tokens = searchTokens('Battery Management System');
    expect(tokens).toEqual(
      expect.arrayContaining(['bm', 'bms', 'ms'])
    );
  });

  test('searchTokens expose tokens split across letter and number boundaries', () => {
    const tokens = searchTokens('FX6 4K120p Module');
    expect(tokens).toEqual(
      expect.arrayContaining(['fx', '6', '4k', '120p', '120'])
    );
  });

  test('searchTokens expose digits for spelled-out numbers', () => {
    expect(searchTokens('Mark Four Adapter')).toEqual(
      expect.arrayContaining(['4', 'mk4'])
    );
    expect(searchTokens('Phase Second Output')).toEqual(
      expect.arrayContaining(['2'])
    );
    expect(searchTokens('Twenty-one Volt Rail')).toEqual(
      expect.arrayContaining(['21'])
    );
  });

  test('findBestSearchMatch resolves initialism queries', () => {
    const entries = new Map();
    entries.set(
      searchKey('Battery Management System'),
      {
        label: 'Battery Management System',
        tokens: searchTokens('Battery Management System')
      }
    );

    entries.set(
      searchKey('Battery Status Monitor'),
      {
        label: 'Battery Status Monitor',
        tokens: searchTokens('Battery Status Monitor')
      }
    );

    const result = findBestSearchMatch(
      entries,
      searchKey('bms'),
      searchTokens('bms')
    );

    expect(result?.value.label).toBe('Battery Management System');
  });

  test('findBestSearchMatch resolves spelled-out mark numbers', () => {
    const entries = new Map();
    entries.set(
      searchKey('Camera Mark IV'),
      { label: 'Camera Mark IV', tokens: searchTokens('Camera Mark IV') }
    );
    entries.set(
      searchKey('Camera Mark V'),
      { label: 'Camera Mark V', tokens: searchTokens('Camera Mark V') }
    );

    const result = findBestSearchMatch(
      entries,
      searchKey('camera mark four'),
      searchTokens('camera mark four')
    );

    expect(result?.value.label).toBe('Camera Mark IV');
  });

  test('searchKey normalizes degree and multiplication symbols', () => {
    expect(searchKey('35° Tilt Module')).toBe(
      searchKey('35 deg tilt module')
    );
    expect(searchKey('35° Tilt Module')).toBe(
      searchKey('35 degree tilt module')
    );
    expect(searchKey('3840×2160')).toBe(searchKey('3840 x 2160'));
  });

  test('searchKey normalizes unicode fraction characters', () => {
    expect(searchKey('¼"-20 Mount')).toBe(
      searchKey('1/4"-20 Mount')
    );
    expect(searchKey('⅜-16 Thread Adapter')).toBe(
      searchKey('3/8-16 Thread Adapter')
    );
  });

  test('searchTokens expose degree and multiplication variants', () => {
    expect(searchTokens('35° Tilt Module')).toEqual(
      expect.arrayContaining(['35', 'deg'])
    );
    expect(searchTokens('35 degree Tilt Module')).toEqual(
      expect.arrayContaining(['35', 'deg'])
    );
    expect(searchTokens('3840×2160 (UHD)')).toEqual(
      expect.arrayContaining(['3840', '2160', 'x', 'by'])
    );
  });

  test('searchTokens expose unicode fraction variants', () => {
    expect(searchTokens('¼-20 Mounting Point')).toEqual(
      expect.arrayContaining(['1420', '1', '4', '20'])
    );
    expect(searchTokens('⅜-16 Mounting Point')).toEqual(
      expect.arrayContaining(['3816', '3', '8', '16'])
    );
  });

  test('search handles British and American spelling variants', () => {
    expect(searchKey('Favourite Colour Settings')).toBe(
      searchKey('Favorite Color Settings')
    );

    expect(searchTokens('Favourite Colour Settings')).toEqual(
      expect.arrayContaining(['favourite', 'favorite', 'colour', 'color'])
    );

    const entries = new Map();
    entries.set(
      searchKey('Favorite Color Settings'),
      {
        label: 'Favorite Color Settings',
        tokens: searchTokens('Favorite Color Settings')
      }
    );

    const result = findBestSearchMatch(
      entries,
      searchKey('favourite colour settings'),
      searchTokens('favourite colour settings')
    );

    expect(result?.value.label).toBe('Favorite Color Settings');
  });

  test('findBestSearchMatch handles degree and by queries', () => {
    const entries = new Map();
    entries.set(
      searchKey('35° Tilt Module'),
      {
        label: '35° Tilt Module',
        tokens: searchTokens('35° Tilt Module')
      }
    );
    entries.set(
      searchKey('3840×2160 (UHD)'),
      {
        label: '3840×2160 (UHD)',
        tokens: searchTokens('3840×2160 (UHD)')
      }
    );

    const degreeMatch = findBestSearchMatch(
      entries,
      searchKey('35 deg module'),
      searchTokens('35 deg module')
    );
    expect(degreeMatch?.value.label).toBe('35° Tilt Module');

    const resolutionMatch = findBestSearchMatch(
      entries,
      searchKey('3840 by 2160'),
      searchTokens('3840 by 2160')
    );
    expect(resolutionMatch?.value.label).toBe('3840×2160 (UHD)');
  });

  test('findBestSearchMatch links unicode fraction queries to ascii entries', () => {
    const entries = new Map();
    entries.set(
      searchKey('1/4-20 Mount Adapter'),
      {
        label: '1/4-20 Mount Adapter',
        tokens: searchTokens('1/4-20 Mount Adapter')
      }
    );

    const fractionMatch = findBestSearchMatch(
      entries,
      searchKey('¼-20 mount adapter'),
      searchTokens('¼-20 mount adapter')
    );

    expect(fractionMatch?.value.label).toBe('1/4-20 Mount Adapter');
  });

  test('searchKey treats mark and mk numbering the same', () => {
    expect(searchKey('Canon C500 Mark II')).toBe(
      searchKey('Canon C500 Mk2')
    );
    expect(searchKey('Canon C300 Mk III')).toBe(
      searchKey('Canon C300 Mark 3')
    );
    expect(searchKey('Canon C70 MkIV')).toBe(
      searchKey('Canon C70 Mark 4')
    );
  });

  test('searchTokens expose mark and mk variations', () => {
    const tokens = searchTokens('Canon EOS R5 Mark II');
    expect(tokens).toEqual(
      expect.arrayContaining([
        'mark',
        'mk',
        'ii',
        '2',
        'mkii',
        'markii',
        'mk2',
        'mark2'
      ])
    );
  });

  test('findBestSearchMatch pairs mk-style queries with mark entries', () => {
    const entries = new Map();
    entries.set(
      searchKey('Canon EOS R5 Mark II'),
      {
        label: 'Canon EOS R5 Mark II',
        tokens: searchTokens('Canon EOS R5 Mark II')
      }
    );

    const mkResult = findBestSearchMatch(
      entries,
      searchKey('r5 mk2'),
      searchTokens('r5 mk2')
    );

    expect(mkResult?.value.label).toBe('Canon EOS R5 Mark II');

    const markResult = findBestSearchMatch(
      entries,
      searchKey('r5 mark 2'),
      searchTokens('r5 mark 2')
    );

    expect(markResult?.value.label).toBe('Canon EOS R5 Mark II');
  });

  test('runFeatureSearch prefers exact feature matches over device ties', () => {
    const { featureMap, deviceMap, helpMap, featureSearchInput } = featureSearchInternals;
    featureMap.clear();
    deviceMap.clear();
    helpMap.clear();

    const featureEl = document.createElement('div');
    featureEl.id = 'feature-target';
    featureEl.textContent = 'Dual SDI Output';
    featureEl.closest = jest.fn(() => null);
    featureEl.scrollIntoView = jest.fn();
    featureEl.focus = jest.fn();

    featureMap.set(
      searchKey('Dual SDI Output'),
      {
        element: featureEl,
        label: 'Dual SDI Output',
        tokens: searchTokens('Dual SDI Output'),
      }
    );

    const select = document.createElement('select');
    select.closest = jest.fn(() => null);
    select.scrollIntoView = jest.fn();
    select.focus = jest.fn();
    select.dispatchEvent = jest.fn();

    const option = document.createElement('option');
    option.value = 'dual-sdi-module';
    option.textContent = 'Dual SDI Output Module';
    select.appendChild(option);

    deviceMap.set(
      searchKey('Dual SDI Output Module'),
      {
        select,
        value: option.value,
        label: option.textContent,
        tokens: searchTokens('Dual SDI Output Module'),
      }
    );

    featureSearchInput.value = 'Dual SDI Output';

    runFeatureSearch('Dual SDI Output');

    expect(select.dispatchEvent).not.toHaveBeenCalled();
    expect(featureEl.focus).toHaveBeenCalled();
    expect(featureSearchInput.value).toBe('Dual SDI Output');
  });

  test('runFeatureSearch keeps user-entered casing when selecting devices', () => {
    const { featureMap, deviceMap, helpMap, featureSearchInput } = featureSearchInternals;
    featureMap.clear();
    deviceMap.clear();
    helpMap.clear();

    const select = document.createElement('select');
    select.closest = jest.fn(() => null);
    select.scrollIntoView = jest.fn();
    select.focus = jest.fn();
    select.dispatchEvent = jest.fn();

    const option = document.createElement('option');
    option.value = 'alexa-35';
    option.textContent = 'Alexa 35';
    select.appendChild(option);

    deviceMap.set(
      searchKey('Alexa 35'),
      {
        select,
        value: 'alexa-35',
        label: 'Alexa 35',
        tokens: searchTokens('Alexa 35'),
      }
    );

    featureSearchInput.value = 'alexa 35';

    runFeatureSearch('alexa 35');

    expect(select.value).toBe('alexa-35');
    expect(select.dispatchEvent).toHaveBeenCalledTimes(1);
    expect(featureSearchInput.value).toBe('alexa 35');
  });

  test('findBestSearchMatch selects the best match from duplicate keys', () => {
    const entries = [
      {
        label: 'Video Outputs (Camera Fields)',
        tokens: searchTokens('Video Outputs Camera Fields camera')
      },
      {
        label: 'Video Outputs (Monitor Fields)',
        tokens: searchTokens('Video Outputs Monitor Fields monitor')
      }
    ];
    const map = new Map();
    map.set(searchKey('Video Outputs'), entries);

    const result = findBestSearchMatch(
      map,
      searchKey('monitor video outputs'),
      searchTokens('monitor video outputs')
    );

    expect(result?.value?.label).toContain('Monitor');
  });

  test('findBestSearchMatch picks the highest scoring keyPrefix candidate', () => {
    const map = new Map();
    map.set(
      searchKey('Monitoring Services'),
      {
        label: 'Monitoring Services',
        tokens: searchTokens('Monitoring Services support crew')
      }
    );
    map.set(
      searchKey('Monitoring Settings'),
      {
        label: 'Monitoring Settings',
        tokens: searchTokens('Monitoring Settings zebra focus peaking')
      }
    );

    const result = findBestSearchMatch(
      map,
      searchKey('monitoring se zebra'),
      searchTokens('monitoring se zebra')
    );

    expect(['keyPrefix', 'token']).toContain(result?.matchType);
    expect(result?.value?.label).toBe('Monitoring Settings');
  });

  test('findBestSearchMatch prefers more specific keySubset matches on ties', () => {
    const map = new Map();
    map.set(
      searchKey('Help'),
      {
        label: 'Help',
        tokens: ['help', 'search']
      }
    );
    map.set(
      searchKey('Help Search'),
      {
        label: 'Help Search',
        tokens: ['help', 'search']
      }
    );

    const result = findBestSearchMatch(
      map,
      searchKey('help search shortcuts'),
      searchTokens('help search shortcuts')
    );

    expect(result?.value?.label).toBe('Help Search');
  });
});
