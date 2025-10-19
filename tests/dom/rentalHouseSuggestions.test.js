const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

describe('rental house suggestions', () => {
  let env;

  beforeEach(() => {
    env = setupScriptEnvironment({
      globals: {
        saveSessionState: jest.fn(),
        loadSessionState: jest.fn(() => ({})),
        loadSetups: jest.fn(() => ({})),
        saveSetups: jest.fn(),
      },
    });

    require('../../src/scripts/storage.js');
  });

  afterEach(() => {
    jest.dontMock('../../src/data/rental-houses.js');
    env?.cleanup();
    env = null;
    jest.resetModules();
  });

  test('project form rental house field exposes curated suggestions with contact details', () => {
    require('../../src/scripts/app-setups.js');
    const rentalInput = document.getElementById('rentalHouse');
    expect(rentalInput).not.toBeNull();

    const datalistId = rentalInput.getAttribute('list');
    expect(datalistId).toBe('rentalHouseOptions');

    const datalist = document.getElementById(datalistId);
    expect(datalist).not.toBeNull();

    expect(datalist.options.length).toBe(0);

    const catalog = require('../../src/data/rental-houses.js');
    expect(Array.isArray(catalog)).toBe(true);
    expect(catalog.length).toBeGreaterThan(0);

    rentalInput.dispatchEvent(new Event('focus'));

    expect(datalist.options.length).toBe(catalog.length);

    const first = catalog[0];
    const firstOption = datalist.options[0];
    expect(firstOption.value).toBe(first.name);
    const expectedLabelParts = [];
    if (first.city) expectedLabelParts.push(first.city);
    if (first.country) expectedLabelParts.push(first.country);
    expect(firstOption.label).toBe(expectedLabelParts.join(', '));

    rentalInput.value = first.name;
    rentalInput.dispatchEvent(new Event('input', { bubbles: true }));

    const tooltip = rentalInput.title;
    expect(typeof tooltip).toBe('string');
    expect(tooltip).toContain(first.name.split(' ')[0]);
    if (first.phone) {
      expect(tooltip).toContain(first.phone);
    }
    if (first.email) {
      expect(tooltip).toContain(first.email);
    }
  });

  test('rental house data loads lazily on first suggestion render', () => {
    const loadSpy = jest.fn();
    jest.doMock('../../src/data/rental-houses.js', () => {
      loadSpy();
      return [
        { name: 'Alpha Rentals', city: 'Berlin', country: 'Germany' },
        { name: 'Beta Rentals', city: 'Paris', country: 'France' },
      ];
    });

    require('../../src/scripts/app-setups.js');

    const rentalInput = document.getElementById('rentalHouse');
    expect(rentalInput).not.toBeNull();

    const datalistId = rentalInput.getAttribute('list');
    const datalist = document.getElementById(datalistId);
    expect(datalist).not.toBeNull();
    expect(datalist.options.length).toBe(0);

    expect(loadSpy).not.toHaveBeenCalled();

    rentalInput.dispatchEvent(new Event('focus'));

    expect(loadSpy).toHaveBeenCalledTimes(1);
    expect(datalist.options.length).toBe(2);

    rentalInput.dispatchEvent(new Event('input', { bubbles: true }));
    expect(loadSpy).toHaveBeenCalledTimes(1);
  });
});
