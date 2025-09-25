const { texts } = require('../../src/scripts/translations.js');

describe('camera weight translation coverage', () => {
  const requiredKeys = [
    'autoGearCameraWeightLabel',
    'autoGearCameraWeightHelp',
    'autoGearCameraWeightOperatorLabel',
    'autoGearCameraWeightOperatorGreater',
    'autoGearCameraWeightOperatorLess',
    'autoGearCameraWeightOperatorEqual',
    'autoGearCameraWeightValueLabel',
    'autoGearCameraWeightValueRequired',
  ];

  const languages = ['en', 'de', 'es', 'fr', 'it'];

  languages.forEach(lang => {
    test(`includes camera weight keys for ${lang}`, () => {
      const entries = texts[lang];
      expect(entries).toBeTruthy();
      requiredKeys.forEach(key => {
        expect(entries).toHaveProperty(key);
        expect(String(entries[key]).trim().length).toBeGreaterThan(0);
      });
    });
  });
});
