const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

describe('project requirements persistence', () => {
  let env;

  afterEach(() => {
    env?.cleanup();
    env = null;
    localStorage.clear();
    jest.resetModules();
  });

  test('exportAllData includes partially completed crew entries', () => {
    env = setupScriptEnvironment();

    const storage = require('../../src/scripts/storage.js');
    const { saveProject, exportAllData, loadProject } = storage;

    saveProject('Crew Export', {
      gearList: '',
      projectInfo: {
        people: [
          { name: 'Alex', phone: '555-0100' }
        ]
      }
    });

    const storedProject = loadProject('Crew Export');
    expect(storedProject).not.toBeNull();
    expect(storedProject.projectInfo).toBeDefined();
    expect(storedProject.projectInfo.people).toEqual([{ name: 'Alex', phone: '555-0100' }]);

    const snapshot = exportAllData();
    expect(snapshot).toBeDefined();
    expect(snapshot.project).toBeDefined();
    const exportedProject = snapshot.project['Crew Export'];
    expect(exportedProject).toBeDefined();
    expect(exportedProject.projectInfo.people).toEqual([{ name: 'Alex', phone: '555-0100' }]);
  });

  test('importAllData restores partially completed crew entries', () => {
    env = setupScriptEnvironment();

    const storage = require('../../src/scripts/storage.js');
    const { importAllData, loadProject } = storage;

    importAllData({
      project: {
        'Imported Crew': {
          gearList: '',
          projectInfo: {
            people: [
              { name: 'Sam', email: 'sam@example.com' }
            ]
          }
        }
      }
    });

    const importedProject = loadProject('Imported Crew');
    expect(importedProject).not.toBeNull();
    expect(importedProject.projectInfo).toBeDefined();
    expect(importedProject.projectInfo.people).toEqual([{ name: 'Sam', email: 'sam@example.com' }]);
  });
});
