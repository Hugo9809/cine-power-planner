const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

describe('saveCurrentGearList project info handling', () => {
  let env;

  afterEach(() => {
    env?.cleanup();
    env = null;
  });

  test('skips persisting empty project info into setups', () => {
    env = setupScriptEnvironment({
      globals: {
        saveProject: jest.fn(),
        saveSetups: jest.fn(),
        loadSetups: jest.fn(() => ({})),
        saveSessionState: jest.fn(),
        loadSessionState: jest.fn(() => ({})),
      },
    });

    const { utils, globals } = env;
    const setupNameInput = document.getElementById('setupName');
    expect(setupNameInput).not.toBeNull();

    setupNameInput.value = 'Empty Project';
    setupNameInput.dispatchEvent(new Event('input'));

    globals.saveProject.mockClear();
    globals.saveSetups.mockClear();

    utils.saveCurrentGearList();

    expect(globals.saveProject).toHaveBeenCalled();
    const lastCall = globals.saveProject.mock.calls[globals.saveProject.mock.calls.length - 1];
    expect(lastCall[0]).toBe('Empty Project');
    expect(lastCall[1]).toMatchObject({ projectInfo: null, gearList: '' });

    expect(globals.saveSetups).not.toHaveBeenCalled();
    expect(utils.getCurrentProjectInfo()).toBeNull();
  });
});
