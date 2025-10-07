const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

describe('automatic gear highlight note handling', () => {
  let env;

  afterEach(() => {
    env?.cleanup();
    env = null;
  });

  test('keeps separate auto-gear spans for note variants', () => {
    env = setupScriptEnvironment({
      disableFreeze: true,
      globals: {
        buildDefaultVideoDistributionAutoGearRules: () => [],
        buildDefaultMatteboxAutoGearRules: () => [],
        buildVideoDistributionAutoRules: () => [],
      },
    });
    const { utils } = env;

    expect(typeof global.setAutoGearRules).toBe('function');

    const fiveDayRule = {
      id: 'rule-every-5-days',
      label: 'Every 5 shooting days',
      scenarios: [],
      mattebox: [],
      cameraHandle: [],
      viewfinderExtension: [],
      deliveryResolution: [],
      videoDistribution: [],
      camera: [],
      monitor: [],
      crewPresent: [],
      crewAbsent: [],
      wireless: [],
      motors: [],
      controllers: [],
      distance: [],
      shootingDays: { mode: 'every', value: 5 },
      add: [
        {
          id: 'item-eye-leather',
          name: 'Bluestar eye leather made of microfiber oval, large',
          category: 'Consumables',
          quantity: 4,
        },
        {
          id: 'item-gaff-primary',
          name: 'Pro Gaff Tape',
          category: 'Consumables',
          quantity: 2,
          notes: 'Primary color roll',
        },
        {
          id: 'item-gaff-secondary',
          name: 'Pro Gaff Tape',
          category: 'Consumables',
          quantity: 2,
          notes: 'Secondary color roll',
        },
        {
          id: 'item-clapper',
          name: 'Clapper Stick',
          category: 'Rigging',
          quantity: 4,
        },
        {
          id: 'item-kimtech',
          name: 'Kimtech Wipes',
          category: 'Consumables',
          quantity: 2,
        },
        {
          id: 'item-sprigs',
          name: 'Sprigs Red 1/4"',
          category: 'Consumables',
          quantity: 1,
        },
      ],
      remove: [],
    };

    global.setAutoGearRules([fiveDayRule]);

    const html = utils.generateGearListHtml({
      projectName: 'Highlight QA',
      shootingDays: ['2024-01-01 to 2024-01-31'],
    });

    utils.displayGearAndRequirements(html);

    const gearListOutput = document.getElementById('gearListOutput');
    expect(gearListOutput).not.toBeNull();

    const proGaffNodes = Array.from(
      gearListOutput.querySelectorAll('.auto-gear-item')
    ).filter((node) => node.getAttribute('data-gear-name') === 'Pro Gaff Tape');

    expect(proGaffNodes).toHaveLength(2);
    const noteLabels = proGaffNodes.map((node) => node.dataset.autoGearNotes);
    expect(noteLabels.sort()).toEqual(['Primary color roll', 'Secondary color roll']);
  });
});
