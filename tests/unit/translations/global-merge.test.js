const path = require('path');

describe('translations global merging', () => {
  const translationsPath = path.resolve(__dirname, '../../../src/scripts/translations.js');

  beforeEach(() => {
    jest.resetModules();
    delete global.texts;
    delete global.categoryNames;
    delete global.gearItems;
  });

  afterAll(() => {
    delete global.texts;
    delete global.categoryNames;
    delete global.gearItems;
  });

  test('onboarding tour translations become available when globals exist', async () => {
    global.texts = {
      en: {
        onboardingTour: {
          prefaceIndicator: 'Welcome',
        },
      },
    };

    const translations = require(translationsPath);
    await translations.loadLanguage('de');
    const { texts } = translations;

    expect(global.texts).toBeDefined();
    expect(global.texts.de).toBeDefined();
    expect(global.texts.de.onboardingTour).toBeDefined();
    expect(global.texts.de.onboardingTour.prefaceIndicator).toBe('Willkommen');

    expect(texts.de.onboardingTour.prefaceIndicator).toBe('Willkommen');
    expect(texts.en.onboardingTour.prefaceIndicator).toBe('Welcome');
  });
});
