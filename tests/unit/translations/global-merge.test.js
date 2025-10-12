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

  test('onboarding tour translations become available when globals exist', () => {
    global.texts = {
      en: {
        onboardingTour: {
          prefaceIndicator: 'Preface',
        },
      },
    };

    const { texts } = require(translationsPath);

    expect(global.texts).toBeDefined();
    expect(global.texts.de).toBeDefined();
    expect(global.texts.de.onboardingTour).toBeDefined();
    expect(global.texts.de.onboardingTour.prefaceIndicator).toBe('Vorwort');

    expect(texts.de.onboardingTour.prefaceIndicator).toBe('Vorwort');
    expect(texts.en.onboardingTour.prefaceIndicator).toBe('Preface');
  });
});
