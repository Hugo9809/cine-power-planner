const rentalHouses = require('../../src/data/rental-houses.js');

describe('rental house short names', () => {
  function findRental(name) {
    return rentalHouses.find(entry => entry && entry.name === name);
  }

  test('ARRI locations share the short name "Arri"', () => {
    const berlin = findRental('ARRI Rental – Berlin');
    const londonLighting = findRental('ARRI Rental – London (Lighting)');
    const londonCamera = findRental('ARRI Rental – London (Camera)');

    expect(berlin).toBeDefined();
    expect(londonLighting).toBeDefined();
    expect(londonCamera).toBeDefined();

    expect(berlin.shortName).toBe('Arri');
    expect(londonLighting.shortName).toBe('Arri');
    expect(londonCamera.shortName).toBe('Arri');
  });

  test('Ludwig Kameraverleih locations use Kamera Ludwig short name', () => {
    const essingen = findRental('Ludwig Kameraverleih – Aalen (Essingen)');
    const erfurt = findRental('Ludwig Kameraverleih – Erfurt');

    expect(essingen).toBeDefined();
    expect(erfurt).toBeDefined();

    expect(essingen.shortName).toBe('Kamera Ludwig');
    expect(erfurt.shortName).toBe('Kamera Ludwig');
  });

  test('short names drop location and punctuation hints', () => {
    const offenders = rentalHouses.filter(entry => entry && typeof entry.shortName === 'string')
      .filter(entry => /\s[–-]\s|\(|\)/.test(entry.shortName));

    expect(offenders).toHaveLength(0);
  });

  test('uppercase abbreviations remain concise', () => {
    const tsf = findRental('TSF Group (GROUPE TSF)');
    const vocas = findRental('Vocas Sales & Services B.V.');

    expect(tsf).toBeDefined();
    expect(vocas).toBeDefined();

    expect(tsf.shortName).toBe('TSF');
    expect(vocas.shortName).toBe('Vocas');
  });
});
