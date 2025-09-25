const path = require('path');

describe('cineUi module', () => {
  let cineUi;

  function loadModule() {
    jest.resetModules();
    jest.isolateModules(() => {
      cineUi = require(path.join('..', '..', 'src', 'scripts', 'modules', 'ui.js'));
    });
    if (cineUi && cineUi.__internal && typeof cineUi.__internal.clearRegistries === 'function') {
      cineUi.__internal.clearRegistries();
    }
  }

  beforeEach(() => {
    loadModule();
  });

  afterEach(() => {
    if (cineUi && cineUi.__internal && typeof cineUi.__internal.clearRegistries === 'function') {
      cineUi.__internal.clearRegistries();
    }
  });

  test('registers controller actions and invokes them safely', () => {
    const show = jest.fn();
    const hide = jest.fn();

    const descriptor = cineUi.controllers.register('deviceManager', { show, hide });

    expect(Object.isFrozen(descriptor)).toBe(true);
    expect(cineUi.controllers.list()).toContain('deviceManager');

    cineUi.controllers.invoke('deviceManager', 'show', 'alpha');
    cineUi.controllers.invoke('deviceManager', 'hide', 'beta');

    expect(show).toHaveBeenCalledWith('alpha');
    expect(hide).toHaveBeenCalledWith('beta');
  });

  test('warns when replacing controller entries', () => {
    const first = jest.fn();
    const second = jest.fn();
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    cineUi.controllers.register('saveSetup', { run: first });
    cineUi.controllers.register('saveSetup', { run: second });

    expect(warnSpy).toHaveBeenCalledTimes(1);

    cineUi.controllers.invoke('saveSetup', 'run');
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalled();

    warnSpy.mockRestore();
  });

  test('exposes interactions that can be triggered programmatically', () => {
    const handler = jest.fn().mockReturnValue('ok');

    cineUi.interactions.register('triggerBackup', handler);

    expect(cineUi.interactions.list()).toEqual(['triggerBackup']);
    expect(cineUi.interactions.get('triggerBackup')).toEqual(expect.any(Function));
    expect(cineUi.interactions.trigger('triggerBackup', 'payload')).toBe('ok');
    expect(handler).toHaveBeenCalledWith('payload');
  });

  test('stores orchestration initializers and executes them', () => {
    const initializer = jest.fn();
    cineUi.orchestration.register('boot', initializer);

    expect(cineUi.orchestration.list()).toContain('boot');
    cineUi.orchestration.run('boot', 'context');
    expect(initializer).toHaveBeenCalledWith('context');
  });

  test('supports registering help entries as strings and functions', () => {
    cineUi.help.register('saveSetup', 'Save the current project.');
    const dynamic = jest.fn().mockReturnValue('Backups keep your data safe.');
    cineUi.help.register('backup', dynamic);

    expect(cineUi.help.list().sort()).toEqual(['backup', 'saveSetup']);
    expect(cineUi.help.resolve('saveSetup')).toBe('Save the current project.');
    expect(cineUi.help.resolve('backup')).toBe('Backups keep your data safe.');
    expect(dynamic).toHaveBeenCalled();
  });

  test('registry lookups throw clear errors when entries are missing', () => {
    expect(cineUi.controllers.get('unknown')).toBeNull();
    expect(() => cineUi.interactions.trigger('missing')).toThrow('cineUi interaction "missing" is not registered.');
    expect(() => cineUi.help.resolve('')).toThrow('cineUi registry names must be non-empty strings');
  });
});
