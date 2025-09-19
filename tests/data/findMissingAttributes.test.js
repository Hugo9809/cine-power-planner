const { findMissingAttributes, listCategories, buildAttributeMap, formatReport } = require('../../findMissingAttributes');

describe('findMissingAttributes utility', () => {
  const schema = {
    accessories: {
      cages: {
        attributes: ['brand', 'weight_g'],
      },
    },
  };
  const attributeMap = buildAttributeMap(schema);
  const dataset = {
    accessories: {
      cages: {
        'Alpha Cage': {
          brand: 'CineStuff',
        },
        'Bravo Cage': {
          brand: 'RigMasters',
          weight_g: 850,
        },
        None: {
          brand: null,
        },
      },
    },
  };

  test('buildAttributeMap returns schema paths with attributes', () => {
    expect(attributeMap).toEqual({ 'accessories.cages': ['brand', 'weight_g'] });
  });

  test('listCategories returns sorted category paths', () => {
    expect(listCategories(attributeMap)).toEqual(['accessories.cages']);
  });

  test('findMissingAttributes identifies missing keys', () => {
    const result = findMissingAttributes('accessories.cages', dataset, attributeMap);
    expect(result).toEqual([
      {
        item: 'Alpha Cage',
        missing: ['weight_g'],
      },
    ]);
  });

  test('formatReport builds a readable summary', () => {
    const summary = formatReport('accessories.cages', [
      {
        item: 'Alpha Cage',
        missing: ['weight_g'],
      },
    ]);

    expect(summary).toContain('Missing attributes for category "accessories.cages"');
    expect(summary).toContain('- Alpha Cage: weight_g');
  });
});
