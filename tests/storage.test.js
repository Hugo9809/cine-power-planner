const {
  loadDeviceData,
  saveDeviceData,
  loadSetups,
  saveSetups,
    saveSetup,
    loadSetup,
    deleteSetup,
    renameSetup,
    loadSessionState,
    saveSessionState,
    loadFeedback,
    saveFeedback,
    clearAllData,
    exportAllData,
    importAllData,
} = require('../storage');

const DEVICE_KEY = 'cameraPowerPlanner_devices';
const SETUP_KEY = 'cameraPowerPlanner_setups';
const SESSION_KEY = 'cameraPowerPlanner_session';
const FEEDBACK_KEY = 'cameraPowerPlanner_feedback';

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

  test('loadSetups ensures unique keys when names duplicate', () => {
    const arr = [{ name: 'A', foo: 1 }, { name: 'A', bar: 2 }];
    localStorage.setItem(SETUP_KEY, JSON.stringify(arr));
    expect(loadSetups()).toEqual({ A: { name: 'A', foo: 1 }, 'A (2)': { name: 'A', bar: 2 } });
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

    test('renameSetup renames setup to a new unique name', () => {
      const setups = {A:{foo:1}, B:{bar:2}};
      localStorage.setItem(SETUP_KEY, JSON.stringify(setups));
      const newName = renameSetup('A', 'C');
      expect(newName).toBe('C');
      expect(JSON.parse(localStorage.getItem(SETUP_KEY))).toEqual({C:{foo:1}, B:{bar:2}});
    });

    test('renameSetup appends suffix when target exists', () => {
      const setups = {A:{foo:1}, C:{bar:2}};
      localStorage.setItem(SETUP_KEY, JSON.stringify(setups));
      const newName = renameSetup('A', 'C');
      expect(newName).toBe('C (2)');
      expect(JSON.parse(localStorage.getItem(SETUP_KEY))).toEqual({'C (2)':{foo:1}, C:{bar:2}});
    });

    test('renameSetup returns null when original missing', () => {
      localStorage.setItem(SETUP_KEY, JSON.stringify({A:{foo:1}}));
      const result = renameSetup('B', 'C');
      expect(result).toBeNull();
      expect(JSON.parse(localStorage.getItem(SETUP_KEY))).toEqual({A:{foo:1}});
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

describe('feedback storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('saveFeedback stores JSON', () => {
    const fb = { note: 'hi' };
    saveFeedback(fb);
    expect(localStorage.getItem(FEEDBACK_KEY)).toBe(JSON.stringify(fb));
  });

  test('loadFeedback returns parsed object when present', () => {
    const fb = { note: 'hi' };
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(fb));
    expect(loadFeedback()).toEqual(fb);
  });

  test('loadFeedback returns empty object for non-object data', () => {
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(5));
    expect(loadFeedback()).toEqual({});
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify([ { runtime: '1h' } ]));
    expect(loadFeedback()).toEqual({});
  });
});

describe('clearAllData', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  test('removes all stored planner data', () => {
    saveDeviceData(validDeviceData);
    saveSetups({ A: { foo: 1 } });
    saveFeedback({ note: 'hi' });
    saveSessionState({ camera: 'CamA' });
    clearAllData();
    expect(localStorage.getItem(DEVICE_KEY)).toBeNull();
    expect(localStorage.getItem(SETUP_KEY)).toBeNull();
    expect(localStorage.getItem(FEEDBACK_KEY)).toBeNull();
    expect(sessionStorage.getItem(SESSION_KEY)).toBeNull();
  });
});

describe('export/import all data', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  test('exportAllData collects all planner data', () => {
    saveDeviceData(validDeviceData);
    saveSetups({ A: { foo: 1 } });
    saveSessionState({ camera: 'CamA' });
    saveFeedback({ note: 'hi' });
    expect(exportAllData()).toEqual({
      devices: validDeviceData,
      setups: { A: { foo: 1 } },
      session: { camera: 'CamA' },
      feedback: { note: 'hi' }
    });
  });

  test('importAllData restores planner data', () => {
    const data = {
      devices: validDeviceData,
      setups: { A: { foo: 1 } },
      session: { camera: 'CamA' },
      feedback: { note: 'hi' }
    };
    importAllData(data);
    expect(loadDeviceData()).toEqual(validDeviceData);
    expect(loadSetups()).toEqual({ A: { foo: 1 } });
    expect(loadSessionState()).toEqual({ camera: 'CamA' });
    expect(loadFeedback()).toEqual({ note: 'hi' });
  });
});
