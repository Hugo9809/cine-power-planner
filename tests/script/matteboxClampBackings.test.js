const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

describe('clamp-on matte box gear list additions', () => {
  let env;

  afterEach(() => {
    if (env && typeof env.cleanup === 'function') {
      env.cleanup();
    }
    env = null;
  });

  const renderMatteboxItems = (info = {}, deviceOverrides = {}) => {
    env = setupScriptEnvironment({ devices: deviceOverrides });
    const { generateGearListHtml } = env.utils;
    const html = generateGearListHtml(info);
    const container = document.createElement('div');
    container.innerHTML = html;
    const group = Array.from(container.querySelectorAll('tbody.category-group')).find(section => {
      const header = section.querySelector('.category-row td');
      return header && header.textContent.trim() === 'Matte box + filter';
    });
    if (!group) return [];
    return Array.from(group.querySelectorAll('.gear-item')).map(item => item.textContent.trim());
  };

  test('adds one clamp-on backing per unique lens front diameter', () => {
    const lenses = {
      'Lens A 25mm': { frontDiameterMm: 114 },
      'Lens B 50mm': { frontDiameterMm: 95 },
      'Lens C 85mm': { frontDiameterMm: 95 }
    };
    const info = {
      mattebox: 'Clamp On',
      lenses: Object.keys(lenses).join(', ')
    };
    const items = renderMatteboxItems(info, { lenses });
    const backingEntries = items.filter(text => text.includes('Clamp-on backing'));

    expect(backingEntries).toEqual(expect.arrayContaining([
      '1x Clamp-on backing 114mm',
      '1x Clamp-on backing 95mm'
    ]));
    expect(backingEntries.filter(text => text.includes('95mm'))).toHaveLength(1);
  });
});

