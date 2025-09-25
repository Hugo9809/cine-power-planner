const { texts, categoryNames, gearItems } = require('../../src/scripts/translations');

describe('language dataset coverage', () => {
  const languages = Object.keys(texts);
  const expectedLanguages = [...languages].sort();

  function expectLanguageSetsAligned(dataset) {
    const datasetLanguages = Object.keys(dataset).sort();
    expect(datasetLanguages).toEqual(expectedLanguages);

    const referenceKeys = Object.keys(dataset.en || {}).sort();
    datasetLanguages.forEach(lang => {
      const keys = Object.keys(dataset[lang] || {}).sort();
      expect(keys).toEqual(referenceKeys);
    });
  }

  test('UI text translations expose consistent keys across languages', () => {
    expectLanguageSetsAligned(texts);
  });

  test('category names stay aligned for every locale', () => {
    expectLanguageSetsAligned(categoryNames);
  });

  test('gear item labels are synced across locales', () => {
    expectLanguageSetsAligned(gearItems);
  });
});
