const {
  loadDeviceData,
  saveDeviceData,
  loadSetups,
  saveSetups,
  saveSetup,
  loadSetup,
  deleteSetup,
  loadSessionState,
  saveSessionState,
} = require('../storage');

const DEVICE_KEY = 'cameraPowerPlanner_devices';
const SETUP_KEY = 'cameraPowerPlanner_setups';
const SESSION_KEY = 'cameraPowerPlanner_session';

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

  test('loadDeviceData returns null when any category is null', () => {
    const corrupted = {
      cameras: null,
      monitors: {},
      video: {},
      batteries: {},
      fiz: { motors: {}, controllers: {}, distance: {} }
    };
    localStorage.setItem(DEVICE_KEY, JSON.stringify(corrupted));
    expect(loadDeviceData()).toBeNull();
  });

  test('loadDeviceData returns null when any category is an array', () => {
    const corrupted = {
      cameras: [],
      monitors: {},
      video: {},
      batteries: {},
      fiz: { motors: {}, controllers: {}, distance: {} }
    };
    localStorage.setItem(DEVICE_KEY, JSON.stringify(corrupted));
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

  test('loadSetups converts array data into an object', () => {
    const arr = [{ name: 'A', foo: 1 }, { name: 'B', bar: 2 }];
    localStorage.setItem(SETUP_KEY, JSON.stringify(arr));
    expect(loadSetups()).toEqual({ A: { name: 'A', foo: 1 }, B: { name: 'B', bar: 2 } });
    expect(JSON.parse(localStorage.getItem(SETUP_KEY))).toEqual({ A: { name: 'A', foo: 1 }, B: { name: 'B', bar: 2 } });
  });

  test('loadSetups returns empty object for primitive data', () => {
    localStorage.setItem(SETUP_KEY, JSON.stringify(5));
    expect(loadSetups()).toEqual({});
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

describe('session state storage', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  test('saveSessionState stores JSON in sessionStorage', () => {
    const state = { camera: 'CamA' };
    saveSessionState(state);
    expect(sessionStorage.getItem(SESSION_KEY)).toBe(JSON.stringify(state));
  });

  test('loadSessionState returns parsed object when present', () => {
    const state = { camera: 'CamA' };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(state));
    expect(loadSessionState()).toEqual(state);
  });

  test('loadSessionState returns null when none', () => {
    expect(loadSessionState()).toBeNull();
  });
});
