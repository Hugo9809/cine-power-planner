const path = require('path');

const normalizersPath = path.join(__dirname, '../../src/scripts/auto-gear/normalizers.js');

describe('auto gear normalizers', () => {
  let normalizers;

  const bootstrapNormalizers = extraSetup => {
    jest.resetModules();
    delete global.DEFAULT_LANGUAGE_SAFE;
    delete global.CPP_DEFAULT_LANGUAGE_SAFE;
    global.localeSort = (a, b) => a.localeCompare(b);
    global.AUTO_GEAR_TRIPOD_SELECTOR_TYPES = new Set(['monitor', 'tripodTypes']);
    global.AUTO_GEAR_HAND_UNIT_COMPATIBILITY_GROUPS = Object.create(null);
    global.AUTO_GEAR_HAND_UNIT_MOTOR_TO_GROUP = Object.create(null);
    global.AUTO_GEAR_SELECTOR_TYPE_SET = new Set(['tripodtypes', 'monitor']);
    global.AUTO_GEAR_SELECTOR_TYPE_MAP = { tripodtypes: 'tripodTypes', monitor: 'monitor' };
    const tripodSelectMock = { options: [{ value: 'Gamma', textContent: 'Gamma' }] };
    global.AUTO_GEAR_TRIPOD_FIELD_IDS = { tripodTypes: 'tripodTypes' };
    global.document = {
      getElementById: id => (id === 'tripodTypes' ? tripodSelectMock : null),
    };
    global.normalizeAutoGearCameraWeightCondition = value => {
      if (!value) return null;
      const numeric = Number(value);
      return Number.isFinite(numeric) ? { operator: '>=', value: numeric } : null;
    };
    global.DEVICE_GLOBAL_SCOPE = { devices: {} };
    global.devices = {};
    global.stableStringify = value => JSON.stringify(value);
    global.getLanguageTexts = () => ({
      autoGearSelectorMonitorOption: 'Monitor selector',
      autoGearSelectorNoneOption: 'No selector',
    });
    global.currentLang = 'en';
    if (typeof extraSetup === 'function') {
      extraSetup();
    }
    return require(normalizersPath);
  };

  beforeEach(() => {
    normalizers = bootstrapNormalizers();
  });

  afterEach(() => {
    delete global.localeSort;
    delete global.AUTO_GEAR_TRIPOD_SELECTOR_TYPES;
    delete global.AUTO_GEAR_TRIPOD_FIELD_IDS;
    delete global.document;
    delete global.AUTO_GEAR_HAND_UNIT_COMPATIBILITY_GROUPS;
    delete global.AUTO_GEAR_HAND_UNIT_MOTOR_TO_GROUP;
    delete global.AUTO_GEAR_SELECTOR_TYPE_SET;
    delete global.AUTO_GEAR_SELECTOR_TYPE_MAP;
    delete global.normalizeAutoGearCameraWeightCondition;
    delete global.DEVICE_GLOBAL_SCOPE;
    delete global.devices;
    delete global.stableStringify;
    delete global.getLanguageTexts;
    delete global.currentLang;
    delete global.DEFAULT_LANGUAGE_SAFE;
    delete global.CPP_DEFAULT_LANGUAGE_SAFE;
    delete global.cineCoreShared;
    jest.resetModules();
  });

  test('seeds default language fallback when globals are missing', () => {
    expect(global.DEFAULT_LANGUAGE_SAFE).toBe('en');
    expect(global.CPP_DEFAULT_LANGUAGE_SAFE).toBe('en');
  });

  test('fills cineCoreShared defaults when the shared scope exists', () => {
    normalizers = bootstrapNormalizers(() => {
      global.cineCoreShared = {};
    });
    expect(global.cineCoreShared.DEFAULT_LANGUAGE_SAFE).toBe('en');
    expect(global.cineCoreShared.CPP_DEFAULT_LANGUAGE_SAFE).toBe('en');
  });

  test('normalizeAutoGearRule sorts values and preserves metadata', () => {
    const rule = normalizers.normalizeAutoGearRule({
      label: 'Main',
      scenarios: ['b', 'a'],
      add: [
        { name: ' Monitor ', quantity: 2 },
        { name: 'Camera', quantity: 1 },
      ],
      remove: [{ name: 'Lens' }],
      camera: ['C', 'a'],
      shootingDays: { mode: 'maximum', value: '5' },
      scenarioLogic: 'any',
    });

    expect(rule.scenarios).toEqual(['a', 'b']);
    expect(rule.camera).toEqual(['C', 'a'].sort((a, b) => a.localeCompare(b)));
    const addNames = rule.add.map(item => item.name).sort((a, b) => a.localeCompare(b));
    expect(addNames).toEqual(['Camera', 'Monitor']);
    expect(rule.shootingDays).toEqual({ mode: 'maximum', value: 5 });
    expect(rule.scenarioLogic).toBe('any');
  });

  test('createAutoGearRulesFingerprint ignores ordering', () => {
    const first = normalizers.normalizeAutoGearRule({ label: 'A', camera: ['B', 'A'] });
    const second = normalizers.normalizeAutoGearRule({ label: 'A', camera: ['A', 'B'] });

    const fingerprintA = normalizers.createAutoGearRulesFingerprint([first]);
    const fingerprintB = normalizers.createAutoGearRulesFingerprint([second]);
    expect(fingerprintA).toBe(fingerprintB);
  });

  test('normalizeAutoGearSelectorDefault matches available options', () => {
    global.AUTO_GEAR_TRIPOD_SELECTOR_TYPES = new Set(['tripodTypes']);

    const result = normalizers.normalizeAutoGearSelectorDefault('tripodTypes', ' gamma ');
    expect(result).toBe('Gamma');
  });

  test('normalizeAutoGearBackupEntry sanitizes timestamps and notes', () => {
    const entry = normalizers.normalizeAutoGearBackupEntry({
      id: '',
      createdAt: '2023-08-01T10:00:00Z',
      rules: [{ label: 'Sample' }],
      monitorDefaults: { focus: 'Beta' },
      note: 42,
    });

    expect(entry.id).toMatch(/^backup-/);
    expect(entry.monitorDefaults.focus).toBe('Beta');
    expect(entry.note).toBe('');
  });
});
