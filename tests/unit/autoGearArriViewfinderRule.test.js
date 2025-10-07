const path = require('path');

describe('ARRI viewfinder extension auto gear rules', () => {
  const modulePath = path.join('..', '..', 'src', 'scripts', 'modules', 'features', 'auto-gear-rules.js');

  let idCounter;
  let originalGlobals;

  beforeEach(() => {
    jest.resetModules();
    idCounter = 0;

    originalGlobals = {
      cineFeatureAutoGearRules: global.cineFeatureAutoGearRules,
      cineModuleBase: global.cineModuleBase,
      devices: global.devices,
      generateAutoGearId: global.generateAutoGearId,
      normalizeAutoGearTriggerValue: global.normalizeAutoGearTriggerValue,
      getViewfinderFallbackLabel: global.getViewfinderFallbackLabel,
    };

    global.normalizeAutoGearTriggerValue = (value) => {
      if (typeof value !== 'string') return '';
      return value.trim().toLowerCase();
    };

    global.getViewfinderFallbackLabel = (value) => value;

    global.generateAutoGearId = (prefix) => {
      idCounter += 1;
      return `${prefix || 'id'}-${idCounter}`;
    };

    global.devices = {
      cameras: {
        'ARRI Alexa 35': { brand: 'ARRI' },
        'Sony FX6': { brand: 'Sony' },
      },
    };

    global.cineModuleBase = {
      freezeDeep: (value) => value,
      exposeGlobal: jest.fn(() => true),
      collectCandidateScopes: jest.fn(() => []),
      registerOrQueueModule: jest.fn((name, api) => {
        global[name] = api;
        return true;
      }),
      getModuleRegistry: jest.fn(() => null),
    };

    jest.isolateModules(() => {
      require(modulePath);
    });
  });

  afterEach(() => {
    delete global.cineFeatureAutoGearRules;
    delete global.cineModuleBase;
    delete global.devices;
    delete global.generateAutoGearId;
    delete global.normalizeAutoGearTriggerValue;
    delete global.getViewfinderFallbackLabel;

    if (originalGlobals.cineFeatureAutoGearRules !== undefined) {
      global.cineFeatureAutoGearRules = originalGlobals.cineFeatureAutoGearRules;
    }
    if (originalGlobals.cineModuleBase !== undefined) {
      global.cineModuleBase = originalGlobals.cineModuleBase;
    }
    if (originalGlobals.devices !== undefined) {
      global.devices = originalGlobals.devices;
    }
    if (originalGlobals.generateAutoGearId !== undefined) {
      global.generateAutoGearId = originalGlobals.generateAutoGearId;
    }
    if (originalGlobals.normalizeAutoGearTriggerValue !== undefined) {
      global.normalizeAutoGearTriggerValue = originalGlobals.normalizeAutoGearTriggerValue;
    }
    if (originalGlobals.getViewfinderFallbackLabel !== undefined) {
      global.getViewfinderFallbackLabel = originalGlobals.getViewfinderFallbackLabel;
    }
  });

  function getModuleApi() {
    const api = global.cineFeatureAutoGearRules;
    if (!api || typeof api.buildArriViewfinderBracketRules !== 'function') {
      throw new Error('cineFeatureAutoGearRules API not initialized for tests.');
    }
    return api;
  }

  test('creates a viewfinder-triggered rule with ARRI bracket when extension is selected', () => {
    const api = getModuleApi();
    const rules = api.buildArriViewfinderBracketRules({
      viewfinderExtension: 'ARRI VEB-3 Viewfinder Extension Bracket',
    });

    expect(rules).toHaveLength(1);
    const rule = rules[0];
    expect(rule.camera).toContain('ARRI Alexa 35');
    expect(rule.viewfinderExtension).toEqual(['ARRI VEB-3 Viewfinder Extension Bracket']);
    expect(rule.scenarios).toEqual([]);
    expect(rule.add).toHaveLength(1);
    expect(rule.add[0]).toMatchObject({
      name: 'ARRI K2.74000.0 VEB-3 Viewfinder Extension Bracket',
      category: 'Camera Support',
      quantity: 1,
    });
  });

  test('creates a slider-triggered rule when slider scenario is active without a viewfinder selection', () => {
    const api = getModuleApi();
    const rules = api.buildArriViewfinderBracketRules({
      requiredScenarios: 'Handheld, Slider',
    });

    expect(rules).toHaveLength(1);
    const rule = rules[0];
    expect(rule.scenarios).toEqual(['Slider']);
    expect(rule.viewfinderExtension).toEqual([]);
    expect(rule.add[0].name).toBe('ARRI K2.74000.0 VEB-3 Viewfinder Extension Bracket');
  });

  test('prefers the viewfinder rule when both slider and viewfinder are active', () => {
    const api = getModuleApi();
    const rules = api.buildArriViewfinderBracketRules({
      viewfinderExtension: 'ARRI VEB-3 Viewfinder Extension Bracket',
      requiredScenarios: 'Slider',
    });

    expect(rules).toHaveLength(1);
    const rule = rules[0];
    expect(rule.viewfinderExtension).toEqual(['ARRI VEB-3 Viewfinder Extension Bracket']);
    expect(rule.scenarios).toEqual([]);
  });

  test('skips rule creation when no ARRI cameras are available', () => {
    global.devices = { cameras: { 'Sony FX6': { brand: 'Sony' } } };
    const api = getModuleApi();
    const rules = api.buildArriViewfinderBracketRules({ viewfinderExtension: 'ARRI VEB-3 Viewfinder Extension Bracket' });
    expect(rules).toEqual([]);
  });
});
