const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

describe('saveCurrentGearList project info handling', () => {
  let env;

  afterEach(() => {
    env?.cleanup();
    env = null;
  });

  test('persists derived project info into saved projects', () => {
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

    const { projectInfo, gearList, diagramPositions, autoGearRules } = lastCall[1];
    expect(gearList).toBe('');
    expect(projectInfo).toEqual(utils.getCurrentProjectInfo());
    expect(projectInfo).toMatchObject({
      projectName: 'Empty Project',
    });
    expect(diagramPositions).toBeUndefined();
    expect(autoGearRules).toBeUndefined();

    expect(globals.saveSetups).not.toHaveBeenCalled();
    expect(utils.getCurrentProjectInfo()).toMatchObject({
      projectName: 'Empty Project',
    });
  });
});
