const fs = require('fs');
const path = require('path');
const vm = require('vm');

describe('normalizeAutoGearCameraWeightCondition', () => {
  let normalizeAutoGearCameraWeightCondition;
  let normalizeAutoGearCameraWeightOperator;

  beforeAll(() => {
    const appCorePath = path.join(__dirname, '..', '..', 'src', 'scripts', 'app-core.js');
    const source = fs.readFileSync(appCorePath, 'utf8');
    const pattern = /const AUTO_GEAR_CAMERA_WEIGHT_OPERATORS[\s\S]+?function normalizeAutoGearCameraWeightCondition\(setting\) {([\s\S]+?)^}/m;
    const match = source.match(pattern);
    if (!match) {
      throw new Error('Unable to extract camera weight normalization logic from app-core.js');
    }

    // Include the entire block so helper functions are defined in the VM context.
    const cameraWeightBlock = match[0];
    const context = {};
    vm.createContext(context);
    vm.runInContext(cameraWeightBlock, context);
    ({
      normalizeAutoGearCameraWeightCondition,
      normalizeAutoGearCameraWeightOperator,
    } = context);
  });

  test('returns null for falsy input', () => {
    expect(normalizeAutoGearCameraWeightCondition(null)).toBeNull();
    expect(normalizeAutoGearCameraWeightCondition(undefined)).toBeNull();
  });

  test('normalizes numeric and string thresholds', () => {
    expect(normalizeAutoGearCameraWeightCondition(2400)).toEqual({ operator: 'greater', value: 2400 });
    expect(normalizeAutoGearCameraWeightCondition('2400')).toEqual({ operator: 'greater', value: 2400 });
    expect(normalizeAutoGearCameraWeightCondition('2,400 g')).toEqual({ operator: 'greater', value: 2400 });
  });

  test('interprets comparison operator synonyms', () => {
    expect(normalizeAutoGearCameraWeightOperator('<')).toBe('less');
    expect(normalizeAutoGearCameraWeightOperator('lighter')).toBe('less');
    expect(normalizeAutoGearCameraWeightOperator('exactly')).toBe('equal');
    expect(normalizeAutoGearCameraWeightOperator('above')).toBe('greater');
  });

  test('returns normalized object input', () => {
    expect(
      normalizeAutoGearCameraWeightCondition({ operator: '<', value: '2300' })
    ).toEqual({ operator: 'less', value: 2300 });
    expect(
      normalizeAutoGearCameraWeightCondition({ operator: '=', weight: '2500 g' })
    ).toEqual({ operator: 'equal', value: 2500 });
    expect(
      normalizeAutoGearCameraWeightCondition({ comparison: 'gt', threshold: 2600 })
    ).toEqual({ operator: 'greater', value: 2600 });
  });

  test('returns null for invalid or non-positive values', () => {
    expect(normalizeAutoGearCameraWeightCondition('')).toBeNull();
    expect(normalizeAutoGearCameraWeightCondition(-10)).toBeNull();
    expect(normalizeAutoGearCameraWeightCondition({ operator: '>', value: 0 })).toBeNull();
  });

  test('handles array wrappers by using the first entry', () => {
    expect(
      normalizeAutoGearCameraWeightCondition([
        { operator: 'exact', grams: '2750' },
        { operator: 'greater', value: 9999 },
      ])
    ).toEqual({ operator: 'equal', value: 2750 });
  });
});
