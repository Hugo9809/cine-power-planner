const {
  loadDeviceData,
  saveDeviceData,
  loadSetups,
  saveSetups,
  saveSetup,
  loadSetup,
  deleteSetup,
} = require('../storage');

const DEVICE_KEY = 'cameraPowerPlanner_devices';
const SETUP_KEY = 'cameraPowerPlanner_setups';

const validDeviceData = {
  cameras: {},
  monitors: {},
  video: {},
  batteries: {},
  fiz: { motors: {}, controllers: {}, distance: {} }
};

describe('device data storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('saveDeviceData stores JSON in localStorage', () => {
    saveDeviceData(validDeviceData);
    expect(localStorage.getItem(DEVICE_KEY)).toBe(JSON.stringify(validDeviceData));
  });

  test('loadDeviceData returns parsed data if valid', () => {
    localStorage.setItem(DEVICE_KEY, JSON.stringify(validDeviceData));
    expect(loadDeviceData()).toEqual(validDeviceData);
  });

  test('loadDeviceData returns null when structure invalid', () => {
    localStorage.setItem(DEVICE_KEY, JSON.stringify({cameras:{}}));
    expect(loadDeviceData()).toBeNull();
  });
});

describe('setup storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('saveSetups stores JSON', () => {
    const setups = {A: {foo: 1}};
    saveSetups(setups);
    expect(localStorage.getItem(SETUP_KEY)).toBe(JSON.stringify(setups));
  });

  test('loadSetups returns empty object when none', () => {
    expect(loadSetups()).toEqual({});
  });

  test('loadSetups returns parsed object when present', () => {
    const setups = {A: {foo: 1}};
    localStorage.setItem(SETUP_KEY, JSON.stringify(setups));
    expect(loadSetups()).toEqual(setups);
  });

  test('saveSetup adds and persists single setup', () => {
    const initial = {A: {foo: 1}};
    localStorage.setItem(SETUP_KEY, JSON.stringify(initial));
    saveSetup('B', {bar: 2});
    const result = JSON.parse(localStorage.getItem(SETUP_KEY));
    expect(result).toEqual({A:{foo:1}, B:{bar:2}});
  });

  test('loadSetup retrieves named setup', () => {
    const setups = {A:{foo:1}};
    localStorage.setItem(SETUP_KEY, JSON.stringify(setups));
    expect(loadSetup('A')).toEqual({foo:1});
  });

  test('deleteSetup removes named setup', () => {
    const setups = {A:{foo:1}, B:{bar:2}};
    localStorage.setItem(SETUP_KEY, JSON.stringify(setups));
    deleteSetup('A');
    expect(JSON.parse(localStorage.getItem(SETUP_KEY))).toEqual({B:{bar:2}});
  });
});
