const chargerData = require('../../devices/chargers.js');
const devices = require('../../data.js');
const gear = require('../../devices/gearList.js');

describe('data smoke checks', () => {
  test('provides charger dataset across mounts', () => {
    expect(chargerData['Anton/Bauer LP4 Gold Mount Charger']).toEqual(
      expect.objectContaining({ mount: 'Gold-Mount', slots: 4 })
    );
    expect(chargerData['Dual V-Mount Charger']).toEqual(
      expect.objectContaining({ mount: 'V-Mount', slots: 2 })
    );
  });

  test('cage data includes cage-specific attributes', () => {
    const cageNames = Object.keys(devices.accessories?.cages ?? {});
    expect(cageNames.length).toBeGreaterThan(0);
    for (const name of cageNames) {
      const cage = devices.accessories.cages[name];
      expect(cage).toEqual(expect.objectContaining({ brand: expect.any(String) }));
      expect(cage.powerDrawWatts).toBeUndefined();
    }
  });

  test('Easyrig stabiliser data exposes attachments', () => {
    const stabiliser = gear.accessories.cameraStabiliser['Easyrig 5 Vario'];
    expect(stabiliser.options).toEqual([
      'FlowCine Serene Spring Arm',
      'Easyrig - STABIL G3'
    ]);
  });

  test('filter options include diopter', () => {
    expect(gear.filterOptions).toContain('Diopter');
  });
});
