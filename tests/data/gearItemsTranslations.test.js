const { gearItems } = require('../../translations');

describe('gear item translation coverage', () => {
  const languages = ['en', 'it', 'es', 'fr', 'de'];

  test('tennis ball translation uses correct casing key', () => {
    languages.forEach(lang => {
      expect(gearItems[lang]).toHaveProperty('Tennis ball');
      expect(gearItems[lang]).not.toHaveProperty('tennis ball');
      expect(gearItems[lang]['Tennis ball']).toBeTruthy();
    });
    expect(gearItems.en['Tennis ball']).toBe('Tennis ball');
  });

  test('clapper stick translations are provided for all languages', () => {
    languages.forEach(lang => {
      expect(gearItems[lang]).toHaveProperty('Clapper Stick');
      expect(gearItems[lang]['Clapper Stick']).toBeTruthy();
    });
  });
});
