describe('storage fallback', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('uses sessionStorage when localStorage is unavailable', () => {
    const store = {};
    const sessionStorageMock = {
      getItem: key => (key in store ? store[key] : null),
      setItem: (key, value) => { store[key] = String(value); },
      removeItem: key => { delete store[key]; }
    };

    Object.defineProperty(window, 'sessionStorage', { value: sessionStorageMock, configurable: true });
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem() { throw new Error('blocked'); },
        setItem() { throw new Error('blocked'); },
        removeItem() { throw new Error('blocked'); }
      },
      configurable: true
    });

    const { saveSessionState, loadSessionState } = require('../storage.js');
    const state = { camera: 'Cam' };
    saveSessionState(state);
    expect(sessionStorageMock.getItem('cameraPowerPlanner_session')).toBe(JSON.stringify(state));
    expect(loadSessionState()).toEqual(state);
  });
});
