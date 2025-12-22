const path = require('path');

const { setupModuleHarness } = require('../helpers/moduleHarness');

describe('cineHelp module', () => {
  const modulePath = path.join('..', '..', 'src', 'scripts', 'modules', 'help.js');
  const uiModulePath = path.join('..', '..', 'src', 'scripts', 'modules', 'ui.js');

  let harness;

  beforeEach(() => {
    harness = setupModuleHarness();
    global.cineModuleBase = {
      freezeDeep: harness.safeFreezeDeep,
      safeWarn: harness.moduleGlobals.safeWarn,
      exposeGlobal: harness.moduleGlobals.exposeGlobal,
      collectCandidateScopes: harness.moduleGlobals.collectCandidateScopes,
      registerOrQueueModule: harness.moduleGlobals.registerOrQueueModule,
      getModuleRegistry: harness.moduleGlobals.getModuleRegistry,
    };
  });

  afterEach(() => {
    delete global.cineHelp;
    delete global.cineHelpModule;
    delete global.__cineCreateHelpModule;
    delete global.cineUi;
    delete global.cineModuleBase;

    if (harness) {
      harness.teardown();
      harness = null;
    }
  });

  test('migrates existing entries when the module reloads', () => {
    jest.isolateModules(() => {
      const cineUi = require(uiModulePath);
      cineUi.help.register('saveSetup', 'Keep your project safe.');
      cineUi.help.register('restoreSettings', () => 'Restore every saved configuration.');
    });

    const cineUiGlobal = global.cineUi;
    expect(cineUiGlobal).toBeDefined();
    expect(cineUiGlobal.help.list().sort()).toEqual(['restoreSettings', 'saveSetup']);
    expect(cineUiGlobal.help.resolve('saveSetup')).toBe('Keep your project safe.');

    jest.isolateModules(() => {
      const moduleApi = require(modulePath);
      expect(moduleApi).toBeDefined();
      expect(moduleApi.help).toBeDefined();
      expect(moduleApi.help.list().sort()).toEqual(['restoreSettings', 'saveSetup']);
      expect(moduleApi.help.resolve('saveSetup')).toBe('Keep your project safe.');
      expect(moduleApi.help.resolve('restoreSettings')).toBe('Restore every saved configuration.');
    });
  });

  test('recovers help entries registered through cineUi when globals are reset', () => {
    jest.isolateModules(() => {
      const cineUi = require(uiModulePath);
      cineUi.help.register('sharedImport', () => 'Load a shared project file.');
    });

    const cineUiGlobal = global.cineUi;
    expect(cineUiGlobal).toBeDefined();
    expect(cineUiGlobal.__internal.helpRegistry.size).toBe(1);

    delete global.cineHelp;
    delete global.cineHelpModule;

    jest.isolateModules(() => {
      const moduleApi = require(modulePath);
      expect(moduleApi).toBeDefined();
      expect(moduleApi.help).toBeDefined();
      expect(moduleApi.help.list()).toEqual(['sharedImport']);
      expect(moduleApi.help.resolve('sharedImport')).toBe('Load a shared project file.');
    });
  });
});

