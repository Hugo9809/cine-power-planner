const fs = require('fs');
const path = require('path');

const loadScript = () => {
  jest.resetModules();

  const { texts, categoryNames, gearItems } = require('../../translations.js');
  const devicesData = require('../../devices');

  const template = fs.readFileSync(
    path.join(__dirname, '../../index.html'),
    'utf8'
  );
  const bodyMatch = template.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const bodyHtml = bodyMatch ? bodyMatch[1] : '';
  document.body.innerHTML = bodyHtml.replace(/<script[\s\S]*?<\/script>/gi, '');

  if (typeof window.matchMedia !== 'function') {
    window.matchMedia = () => ({
      matches: false,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {}
    });
  }

  if (!Element.prototype.scrollIntoView) {
    Element.prototype.scrollIntoView = () => {};
  }

  delete window.defaultDevices;
  window.devices = JSON.parse(JSON.stringify(devicesData));
  global.devices = window.devices;
  window.texts = texts;
  global.texts = texts;
  window.categoryNames = categoryNames;
  global.categoryNames = categoryNames;
  window.gearItems = gearItems;
  global.gearItems = gearItems;

  global.loadDeviceData = jest.fn(() => null);
  global.saveDeviceData = jest.fn();
  global.loadSetups = jest.fn(() => ({}));
  global.saveSetups = jest.fn();
  global.loadSessionState = jest.fn(() => null);
  global.saveSessionState = jest.fn();
  global.loadProject = jest.fn(() => null);
  global.saveProject = jest.fn();
  global.deleteProject = jest.fn();
  global.loadFavorites = jest.fn(() => ({}));
  global.saveFavorites = jest.fn();
  global.exportAllData = jest.fn();
  global.importAllData = jest.fn();

  return require('../../script.js');
};

describe('global feature search helpers', () => {
  let searchKey;
  let searchTokens;
  let findBestSearchMatch;

  beforeEach(() => {
    ({ searchKey, searchTokens, findBestSearchMatch } = loadScript());
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

  test('searchKey normalizes degree and multiplication symbols', () => {
    expect(searchKey('35° Tilt Module')).toBe(
      searchKey('35 deg tilt module')
    );
    expect(searchKey('35° Tilt Module')).toBe(
      searchKey('35 degree tilt module')
    );
    expect(searchKey('3840×2160')).toBe(searchKey('3840 x 2160'));
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
});

describe('feature search prioritisation', () => {
  let runFeatureSearch;
  let featureMap;
  let deviceMap;
  let helpMap;
  let searchKey;
  let searchTokens;
  let featureSearch;

  beforeEach(() => {
    ({
      __testRunFeatureSearch: runFeatureSearch,
      __testFeatureMap: featureMap,
      __testDeviceMap: deviceMap,
      __testHelpMap: helpMap,
      searchKey,
      searchTokens
    } = loadScript());
    featureSearch = document.getElementById('featureSearch');
    featureMap.clear();
    deviceMap.clear();
    helpMap.clear();
  });

  test('exact feature matches beat higher scoring device suggestions', () => {
    const query = 'Exact Feature';
    featureSearch.value = query;

    const featureButton = document.createElement('button');
    featureButton.textContent = query;
    document.body.appendChild(featureButton);

    featureMap.set(searchKey(query), {
      element: featureButton,
      label: query,
      tokens: []
    });

    const deviceSelect = document.createElement('select');
    const deviceOption = document.createElement('option');
    deviceOption.value = 'device-1';
    deviceOption.textContent = 'Exact Feature Device';
    deviceSelect.appendChild(deviceOption);
    deviceSelect.value = '';
    deviceSelect.dispatchEvent = jest.fn();
    document.body.appendChild(deviceSelect);

    deviceMap.set(searchKey('Exact Feature Device'), {
      select: deviceSelect,
      value: 'device-1',
      label: 'Exact Feature Device',
      tokens: searchTokens('Exact Feature Device')
    });

    runFeatureSearch(query);

    expect(deviceSelect.value).toBe('');
    expect(deviceSelect.dispatchEvent).not.toHaveBeenCalled();
    expect(featureSearch.value).toBe(query);
    expect(document.activeElement).toBe(featureButton);
  });

  test('device selections keep user-entered casing when unchanged', () => {
    const query = 'test device';
    featureSearch.value = query;

    const deviceSelect = document.createElement('select');
    const deviceOption = document.createElement('option');
    deviceOption.value = 'device-1';
    deviceOption.textContent = 'Test Device';
    deviceSelect.appendChild(deviceOption);
    document.body.appendChild(deviceSelect);
    const dispatchSpy = jest.spyOn(deviceSelect, 'dispatchEvent');

    deviceMap.set(searchKey('Test Device'), {
      select: deviceSelect,
      value: 'device-1',
      label: 'Test Device',
      tokens: searchTokens('Test Device')
    });

    runFeatureSearch(query);

    expect(deviceSelect.value).toBe('device-1');
    expect(dispatchSpy).toHaveBeenCalled();
    expect(featureSearch.value).toBe(query);
  });
});
