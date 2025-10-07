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

    const {
      projectInfo,
      gearList,
      diagramPositions,
      autoGearRules,
      gearListAndProjectRequirementsGenerated,
    } = lastCall[1];
    expect(gearList).toBe('');
    expect(gearListAndProjectRequirementsGenerated).toBe(false);
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

  test('saves project info snapshots without sharing references', () => {
    env = setupScriptEnvironment({
      globals: {
        saveProject: jest.fn(),
        saveSetups: jest.fn(),
        loadSetups: jest.fn(() => ({
          'Snapshot Project': {
            gearList: '',
            projectInfo: { projectName: 'Snapshot Project' },
          },
        })),
        saveSessionState: jest.fn(),
        loadSessionState: jest.fn(() => ({})),
      },
    });

    const { utils, globals } = env;
    const setupNameInput = document.getElementById('setupName');
    const setupSelect = document.getElementById('setupSelect');
    expect(setupNameInput).not.toBeNull();
    expect(setupSelect).not.toBeNull();

    setupSelect.value = 'Snapshot Project';
    setupNameInput.value = 'Snapshot Project';
    setupNameInput.dispatchEvent(new Event('input'));

    globals.saveProject.mockClear();
    globals.saveSetups.mockClear();

    utils.saveCurrentGearList();

    expect(globals.saveProject).toHaveBeenCalled();
    const [, projectPayload] =
      globals.saveProject.mock.calls[globals.saveProject.mock.calls.length - 1];
    expect(projectPayload.projectInfo).toMatchObject({
      projectName: 'Snapshot Project',
    });

    projectPayload.projectInfo.projectName = 'Changed Name';
    projectPayload.projectInfo.notes = 'Mutated';

    const currentInfo = utils.getCurrentProjectInfo();
    expect(currentInfo).toMatchObject({ projectName: 'Snapshot Project' });
    expect(currentInfo).not.toHaveProperty('notes');

    expect(globals.saveSetups).toHaveBeenCalled();
    const savedSetupsArg =
      globals.saveSetups.mock.calls[globals.saveSetups.mock.calls.length - 1][0];
    const savedSetup = savedSetupsArg['Snapshot Project'];
    expect(savedSetup.projectInfo).toMatchObject({
      projectName: 'Snapshot Project',
    });
    expect(savedSetup.gearListAndProjectRequirementsGenerated).toBe(false);

    savedSetup.projectInfo.projectName = 'Mutated via setups';
    const infoAfterMutation = utils.getCurrentProjectInfo();
    expect(infoAfterMutation.projectName).toBe('Snapshot Project');
  });
});
