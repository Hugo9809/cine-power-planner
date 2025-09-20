const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

const makeRules = () => ([{ id: 'rule-1', label: 'Example rule', scenarios: [], add: [], remove: [] }]);

describe('project sharing helpers', () => {
  let env;
  let originalPrompt;
  let originalAlert;
  let originalConfirm;

  beforeAll(() => {
    originalPrompt = window.prompt;
    originalAlert = window.alert;
    originalConfirm = window.confirm;
  });

  afterEach(() => {
    env?.cleanup();
    env = null;
    localStorage.clear();
    window.prompt = originalPrompt;
    window.alert = originalAlert;
    window.confirm = originalConfirm;
    jest.restoreAllMocks();
  });

  test('sanitizeShareFilename removes reserved characters and trims dots', () => {
    env = setupScriptEnvironment();
    const { sanitizeShareFilename } = env.utils;

    expect(sanitizeShareFilename('  ..Project:*?<>|  ')).toBe('Project_');
    expect(sanitizeShareFilename('setup.')).toBe('setup');
  });

  test('ensureJsonExtension appends missing extension', () => {
    env = setupScriptEnvironment();
    const { ensureJsonExtension } = env.utils;

    expect(ensureJsonExtension('project')).toBe('project.json');
    expect(ensureJsonExtension('project.JSON')).toBe('project.JSON');
  });

  test('getDefaultShareFilename falls back to project when empty', () => {
    env = setupScriptEnvironment();
    const { getDefaultShareFilename } = env.utils;

    expect(getDefaultShareFilename('Camera Plan')).toBe('Camera Plan');
    expect(getDefaultShareFilename('   ')).toBe('project');
  });

  test('promptForSharedFilename sanitizes prompt response and ensures extension', () => {
    env = setupScriptEnvironment();
    const { promptForSharedFilename } = env.utils;

    window.prompt = jest.fn(() => 'Custom Export Name');
    window.alert = jest.fn();

    const result = promptForSharedFilename('Camera/Setup v1');

    expect(window.prompt).toHaveBeenCalledWith(
      expect.stringContaining('Camera_Setup v1'),
      'Camera_Setup v1'
    );
    expect(result).toBe('Custom Export Name.json');
    expect(window.alert).not.toHaveBeenCalled();
  });

  test('promptForSharedFilename warns when sanitized name is empty', () => {
    env = setupScriptEnvironment();
    const { promptForSharedFilename } = env.utils;

    window.prompt = jest.fn(() => '   ');
    window.alert = jest.fn();

    const result = promptForSharedFilename('Existing Setup');

    expect(result).toBeNull();
    expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('valid file name'));
  });

  test('promptForSharedFilename falls back when prompt is unavailable', () => {
    env = setupScriptEnvironment();
    const { promptForSharedFilename } = env.utils;

    window.prompt = undefined;
    window.alert = jest.fn();

    expect(promptForSharedFilename('Offline Export')).toBe('Offline Export.json');
    expect(window.alert).not.toHaveBeenCalled();
  });

  test('confirmAutoGearSelection prefers browser confirm when available', () => {
    env = setupScriptEnvironment();
    const { confirmAutoGearSelection } = env.utils;

    window.confirm = jest.fn(() => true);
    expect(confirmAutoGearSelection(false)).toBe(true);
    expect(window.confirm).toHaveBeenCalled();

    window.confirm = jest.fn(() => false);
    expect(confirmAutoGearSelection(true)).toBe(false);
  });

  test('confirmAutoGearSelection falls back to default include value', () => {
    env = setupScriptEnvironment();
    const { confirmAutoGearSelection } = env.utils;

    window.confirm = undefined;
    expect(confirmAutoGearSelection(true)).toBe(true);
    expect(confirmAutoGearSelection(false)).toBe(false);
  });

  test('configureSharedImportOptions toggles option availability', () => {
    env = setupScriptEnvironment();
    const { configureSharedImportOptions } = env.utils;

    const noneOption = document.getElementById('sharedImportModeNoneOption');
    const projectOption = document.getElementById('sharedImportModeProjectOption');
    const globalOption = document.getElementById('sharedImportModeGlobalOption');

    expect(configureSharedImportOptions(makeRules())).toBe(true);
    expect(noneOption.disabled).toBe(false);
    expect(noneOption.selected).toBe(false);
    expect(projectOption.disabled).toBe(false);
    expect(projectOption.selected).toBe(true);
    expect(globalOption.disabled).toBe(false);
    expect(globalOption.selected).toBe(false);

    expect(configureSharedImportOptions([])).toBe(false);
    expect(noneOption.disabled).toBe(false);
    expect(noneOption.selected).toBe(true);
    expect(projectOption.disabled).toBe(true);
    expect(globalOption.disabled).toBe(true);
  });

  test('resolveSharedImportMode respects selected options', () => {
    env = setupScriptEnvironment();
    const { configureSharedImportOptions, resolveSharedImportMode } = env.utils;

    const noneOption = document.getElementById('sharedImportModeNoneOption');
    const projectOption = document.getElementById('sharedImportModeProjectOption');
    const globalOption = document.getElementById('sharedImportModeGlobalOption');

    configureSharedImportOptions(makeRules());

    projectOption.selected = true;
    globalOption.selected = false;
    noneOption.selected = false;
    expect(resolveSharedImportMode(makeRules())).toBe('project');

    projectOption.selected = false;
    globalOption.selected = true;
    expect(resolveSharedImportMode(makeRules())).toBe('global');

    projectOption.selected = true;
    globalOption.selected = true;
    expect(resolveSharedImportMode(makeRules())).toEqual(['project', 'global']);

    noneOption.selected = true;
    expect(resolveSharedImportMode(makeRules())).toEqual(['project', 'global']);

    projectOption.selected = false;
    globalOption.selected = false;
    noneOption.selected = false;
    expect(resolveSharedImportMode(makeRules())).toBe('project');

    expect(resolveSharedImportMode([])).toBe('none');
  });
});
