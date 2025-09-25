const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');
describe('critical workflow integration', () => {
  let env;
  let utils;

  beforeEach(() => {
    env = setupScriptEnvironment();
    ({ utils } = env);
  });

  afterEach(() => {
    env.cleanup();
  });

  test('exposes offline reload helpers and persistence gateways', () => {
    expect(global.cineOffline).toBeDefined();
    expect(typeof global.cineOffline.reloadApp).toBe('function');
    expect(typeof global.cineOffline.registerServiceWorker).toBe('function');

    expect(global.cinePersistence).toBeDefined();
    expect(typeof global.cinePersistence.storage.saveProject).toBe('function');
    expect(typeof global.cinePersistence.storage.importAllData).toBe('function');
    expect(typeof global.cinePersistence.backups.createSettingsBackup).toBe('function');
    expect(typeof global.cinePersistence.restore.proceed).toBe('function');
    expect(typeof global.cinePersistence.share.applySharedSetup).toBe('function');
  });

  test('provides ui registry access for save, share and restore flows', () => {
    const { cineUi } = global;
    expect(cineUi).toBeDefined();
    expect(typeof cineUi.controllers.get).toBe('function');

    const backupController = cineUi.controllers.get('backupSettings');
    const restoreController = cineUi.controllers.get('restoreSettings');

    expect(backupController).not.toBeNull();
    expect(typeof backupController.execute).toBe('function');
    expect(restoreController).not.toBeNull();
    expect(typeof restoreController.openPicker).toBe('function');
    expect(typeof restoreController.processFile).toBe('function');

    expect(typeof cineUi.interactions.get).toBe('function');
    expect(typeof cineUi.interactions.get('performBackup')).toBe('function');
    expect(typeof cineUi.interactions.get('applyRestoreFile')).toBe('function');

    expect(typeof cineUi.help.resolve).toBe('function');
    expect(typeof cineUi.help.resolve('shareProject')).toBe('string');
  });

  test('exports integration utilities for tests via runtime bundle', () => {
    expect(utils).toBeDefined();
    expect(typeof utils.collectProjectFormData).toBe('function');
    expect(typeof utils.createSettingsBackup).toBe('function');
    expect(typeof utils.downloadSharedProject).toBe('function');
    expect(typeof utils.autoBackup).toBe('function');
  });
});
