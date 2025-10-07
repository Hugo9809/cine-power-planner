const {
  snapshotGlobals,
  restoreGlobals,
  clearStorage,
  loadStorageModule,
} = require('../helpers/storageTestUtils');

function createProjectEntry(name, gearListContent) {
  return {
    gearList: gearListContent,
    projectInfo: {
      projectName: name,
      updatedAt: '2024-01-01T00:00:00Z',
    },
  };
}

describe('project import collision handling', () => {
  let snapshot;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetModules();
    clearStorage();
    snapshot = snapshotGlobals();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetModules();
    clearStorage();
    restoreGlobals(snapshot);
  });

  test('imports duplicate project with -imported suffix', () => {
    const storage = loadStorageModule();
    storage.saveProject('Existing Project', createProjectEntry('Existing Project', '<p>original</p>'));

    storage.importAllData({
      project: {
        'Existing Project': createProjectEntry('Existing Project', '<p>imported</p>'),
      },
    });

    const projects = storage.loadProject();
    expect(projects['Existing Project'].gearList).toBe('<p>original</p>');
    expect(projects['Existing Project-imported'].gearList).toBe('<p>imported</p>');
  });

  test('appends numeric suffix when -imported name already exists', () => {
    const storage = loadStorageModule();
    storage.saveProject('Existing Project', createProjectEntry('Existing Project', '<p>original</p>'));
    storage.saveProject(
      'Existing Project-imported',
      createProjectEntry('Existing Project-imported', '<p>manual import</p>'),
    );

    storage.importAllData({
      project: {
        'Existing Project': createProjectEntry('Existing Project', '<p>new import</p>'),
      },
    });

    const projects = storage.loadProject();
    expect(projects['Existing Project-imported'].gearList).toBe('<p>manual import</p>');
    expect(projects['Existing Project-imported-2'].gearList).toBe('<p>new import</p>');
  });
});
