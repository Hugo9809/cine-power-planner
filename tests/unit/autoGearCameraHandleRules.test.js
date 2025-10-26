const path = require('path');

describe('camera handle auto gear rules', () => {
  const modulePath = path.join('..', '..', 'src', 'scripts', 'modules', 'features', 'auto-gear-rules.js');

  let idCounter;
  let originalGlobals;
  let diffResponseMap;

  function buildDiffKey(left, right) {
    return JSON.stringify({ left, right });
  }

  function registerDiffResponse(left, right, response) {
    diffResponseMap.set(buildDiffKey(left, right), response);
  }

  beforeEach(() => {
    jest.resetModules();
    idCounter = 0;
    diffResponseMap = new Map();

    originalGlobals = {
      cineFeatureAutoGearRules: global.cineFeatureAutoGearRules,
      cineModuleBase: global.cineModuleBase,
      normalizeAutoGearItem: global.normalizeAutoGearItem,
      generateAutoGearId: global.generateAutoGearId,
      generateGearListHtml: global.generateGearListHtml,
      parseGearTableForAutoRules: global.parseGearTableForAutoRules,
      diffGearTableMaps: global.diffGearTableMaps,
      document: global.document,
    };

    global.normalizeAutoGearItem = (item) => {
      if (!item || typeof item !== 'object') {
        return null;
      }
      const name = typeof item.name === 'string' ? item.name : '';
      const category = typeof item.category === 'string' ? item.category : '';
      if (!name || !category) {
        return null;
      }
      return {
        id: typeof item.id === 'string' ? item.id : '',
        name,
        category,
        quantity: typeof item.quantity === 'number' ? item.quantity : Number(item.quantity) || 0,
      };
    };

    global.generateAutoGearId = (prefix) => {
      idCounter += 1;
      return `${prefix || 'id'}-${idCounter}`;
    };

    global.generateGearListHtml = jest.fn((info) => {
      const cameraHandle = info && typeof info.cameraHandle === 'string' ? info.cameraHandle.trim() : '';
      return JSON.stringify({ cameraHandle });
    });

    global.parseGearTableForAutoRules = jest.fn((value) => {
      try {
        return JSON.parse(value || '{}');
      } catch (error) {
        void error;
        return { cameraHandle: '' };
      }
    });

    global.diffGearTableMaps = jest.fn((left, right) => {
      const key = buildDiffKey(left, right);
      if (diffResponseMap.has(key)) {
        return diffResponseMap.get(key);
      }
      return { add: [], remove: [] };
    });

    global.document = {
      getElementById: jest.fn(() => ({ options: [] })),
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
    delete global.normalizeAutoGearItem;
    delete global.generateAutoGearId;
    delete global.generateGearListHtml;
    delete global.parseGearTableForAutoRules;
    delete global.diffGearTableMaps;
    delete global.document;

    Object.entries(originalGlobals).forEach(([key, value]) => {
      if (value === undefined) {
        delete global[key];
      } else {
        global[key] = value;
      }
    });
  });

  function getModuleApi() {
    const api = global.cineFeatureAutoGearRules;
    if (!api || typeof api.buildCameraHandleAutoRules !== 'function') {
      throw new Error('cineFeatureAutoGearRules API not initialized for tests.');
    }
    return api;
  }

  test('creates addition rules when selecting a new camera handle', () => {
    const api = getModuleApi();
    const baselineMap = { cameraHandle: '' };
    const variantMap = { cameraHandle: 'Shoulder Rig Handle' };

    registerDiffResponse(baselineMap, variantMap, {
      add: [
        {
          id: 'item-add-1',
          name: 'Shoulder Rig Spacer',
          category: 'Rigging',
          quantity: 1,
        },
      ],
      remove: [],
    });

    global.document.getElementById.mockReturnValue({
      options: [{ value: 'Shoulder Rig Handle' }],
    });

    const rules = api.buildCameraHandleAutoRules({ cameraHandle: '' }, baselineMap);
    expect(rules).toHaveLength(1);
    const rule = rules[0];
    expect(rule.cameraHandle).toEqual(['Shoulder Rig Handle']);
    expect(rule.add).toEqual([
      {
        id: 'item-add-1',
        name: 'Shoulder Rig Spacer',
        category: 'Rigging',
        quantity: 1,
      },
    ]);
    expect(rule.remove).toEqual([]);
  });

  test('creates removal-only rules when deselecting an active camera handle', () => {
    const api = getModuleApi();
    const baselineMap = { cameraHandle: 'Top Handle' };
    const variantMap = { cameraHandle: '' };

    registerDiffResponse(variantMap, baselineMap, {
      add: [],
      remove: [
        {
          id: 'item-remove-1',
          name: 'Top Handle Weight Plate',
          category: 'Rigging',
          quantity: 1,
        },
      ],
    });

    global.document.getElementById.mockReturnValue({
      options: [{ value: 'Top Handle' }],
    });

    const rules = api.buildCameraHandleAutoRules({ cameraHandle: 'Top Handle' }, baselineMap);
    expect(rules).toHaveLength(1);
    const rule = rules[0];
    expect(rule.cameraHandle).toEqual(['Top Handle']);
    expect(rule.add).toEqual([]);
    expect(rule.remove).toEqual([
      {
        id: 'item-remove-1',
        name: 'Top Handle Weight Plate',
        category: 'Rigging',
        quantity: 1,
      },
    ]);
  });
});
