const fs = require('fs');
const path = require('path');

const loadScript = () => {
  jest.resetModules();

  const { texts, categoryNames, gearItems } = require('../../src/scripts/translations.js');
  const devicesData = require('../../src/data');

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

  return require('../../src/scripts/script.js');
};

describe('global feature search helpers', () => {
  let searchKey;
  let searchTokens;
  let findBestSearchMatch;
  let runFeatureSearch;
  let featureSearchInternals;

  beforeEach(() => {
    ({
      searchKey,
      searchTokens,
      findBestSearchMatch,
      runFeatureSearch,
      __featureSearchInternals: featureSearchInternals,
    } = loadScript());
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

  test('searchKey treats spelled-out numbers the same as digits', () => {
    expect(searchKey('Mark Two')).toBe(searchKey('Mark 2'));
    expect(searchKey('Mark Twenty One')).toBe(searchKey('Mark 21'));
    expect(searchKey('Third Battery Slot')).toBe(searchKey('3 Battery Slot'));
  });

  test('searchTokens expose numeric tokens for spelled numbers and ordinals', () => {
    const spelledTokens = searchTokens('Mark Twenty-One Upgrade');
    expect(spelledTokens).toEqual(expect.arrayContaining(['21']));
    expect(spelledTokens).toEqual(expect.arrayContaining(['twenty', 'one']));

    const ordinalTokens = searchTokens('Third Battery Slot');
    expect(ordinalTokens).toEqual(expect.arrayContaining(['3']));
    expect(ordinalTokens).toEqual(expect.arrayContaining(['third']));
  });

  test('findBestSearchMatch pairs spelled-out queries with numeric entries', () => {
    const entries = new Map();
    entries.set(
      searchKey('Mark 21 Upgrade'),
      {
        label: 'Mark 21 Upgrade',
        tokens: searchTokens('Mark 21 Upgrade'),
      }
    );

    const result = findBestSearchMatch(
      entries,
      searchKey('mark twenty one upgrade'),
      searchTokens('mark twenty one upgrade')
    );

    expect(result?.value.label).toBe('Mark 21 Upgrade');
  });

  test('findBestSearchMatch links ordinal words with numeric suffix entries', () => {
    const entries = new Map();
    entries.set(
      searchKey('3rd Battery Slot'),
      {
        label: '3rd Battery Slot',
        tokens: searchTokens('3rd Battery Slot'),
      }
    );

    const result = findBestSearchMatch(
      entries,
      searchKey('third battery slot'),
      searchTokens('third battery slot')
    );

    expect(result?.value.label).toBe('3rd Battery Slot');
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

  test('populateFeatureSearch indexes contextual subheadings for video outputs', () => {
    const { featureMap, featureListElement } = featureSearchInternals;
    const entries = featureMap.get(searchKey('Video Outputs'));
    expect(entries).toBeTruthy();
    const list = Array.isArray(entries) ? entries : [entries];
    expect(list.length).toBeGreaterThan(1);

    const monitorEntry = list.find(
      entry => entry && entry.tokens && entry.tokens.includes('monitor')
    );
    const viewfinderEntry = list.find(
      entry => entry && entry.tokens && entry.tokens.includes('viewfinder')
    );

    expect(monitorEntry).toBeTruthy();
    expect(viewfinderEntry).toBeTruthy();
    expect(monitorEntry.tokens).toEqual(
      expect.arrayContaining(['video', 'outputs', 'monitor'])
    );
    expect(viewfinderEntry.tokens).toEqual(
      expect.arrayContaining(['video', 'outputs', 'viewfinder'])
    );

    const optionValues = Array.from(
      featureListElement.querySelectorAll('option')
    ).map(opt => opt.value.toLowerCase());

    expect(
      optionValues.some(
        value => value.includes('video outputs') && value.includes('monitor')
      )
    ).toBe(true);
    expect(
      optionValues.some(
        value => value.includes('video outputs') && value.includes('viewfinder')
      )
    ).toBe(true);
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
