const translations = require('../../src/scripts/translations.js');

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

  beforeAll(async () => {
    for (const lang of languages) {
      await translations.loadLanguage(lang);
    }
  });

  languages.forEach(lang => {
    test(`includes camera weight keys for ${lang}`, () => {
      const entries = translations.texts[lang];
      expect(entries).toBeTruthy();
      requiredKeys.forEach(key => {
        expect(entries).toHaveProperty(key);
        expect(String(entries[key]).trim().length).toBeGreaterThan(0);
      });
    });
  });
});
