const {
  normalizeAutoGearWeightOperator,
  normalizeAutoGearWeightValue,
  normalizeAutoGearCameraWeightCondition,
  formatAutoGearCameraWeight,
  evaluateAutoGearCameraWeightCondition,
} = require('../../src/scripts/auto-gear-weight.js');

describe('auto gear camera weight helpers', () => {
  test('normalizes operators and values from objects', () => {
    const condition = normalizeAutoGearCameraWeightCondition({ operator: '>', value: '2000' });
    expect(condition).toEqual({ operator: 'greater', value: 2000 });
  });

  test('normalizeAutoGearWeightOperator maps synonyms', () => {
    expect(normalizeAutoGearWeightOperator('OVER')).toBe('greater');
    expect(normalizeAutoGearWeightOperator('under')).toBe('less');
    expect(normalizeAutoGearWeightOperator('match')).toBe('equal');
  });

  test('normalizes arrays and defaults to greater-than', () => {
    const condition = normalizeAutoGearCameraWeightCondition(['<', '1500.4']);
    expect(condition).toEqual({ operator: 'less', value: 1500 });
  });

  test('normalizes string values with units and decimals', () => {
    expect(normalizeAutoGearWeightValue('2000 g')).toBe(2000);
    expect(normalizeAutoGearWeightValue('1,6')).toBe(2);
    expect(normalizeAutoGearWeightValue('')).toBeNull();
  });

  test('normalizes string values that include kilograms, pounds or ounces', () => {
    expect(normalizeAutoGearWeightValue('2.5 kg')).toBe(2500);
    expect(normalizeAutoGearWeightValue('2kg')).toBe(2000);
    expect(normalizeAutoGearWeightValue('10 lb')).toBe(4536);
    expect(normalizeAutoGearWeightValue('8 ounces')).toBe(227);
  });

  test('evaluateAutoGearCameraWeightCondition compares correctly', () => {
    expect(
      evaluateAutoGearCameraWeightCondition({ operator: 'greater', value: 1500 }, 1600)
    ).toBe(true);
    expect(
      evaluateAutoGearCameraWeightCondition({ operator: 'less', value: 1500 }, 1600)
    ).toBe(false);
    expect(
      evaluateAutoGearCameraWeightCondition({ operator: 'equal', value: 1500 }, 1500)
    ).toBe(true);
  });

  test('formatAutoGearCameraWeight uses localized operator labels', () => {
    const langTexts = {
      autoGearCameraWeightOperatorGreater: 'Más pesada que',
    };
    const formatted = formatAutoGearCameraWeight({ operator: 'greater', value: 2150 }, langTexts);
    expect(formatted).toBe('Más pesada que 2,150 g');
  });
});
