const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

describe('renderFilterDetails', () => {
  let env;

  afterEach(() => {
    env?.cleanup();
    env = null;
  });

  test('prefixes gear list filter headings with quantity', () => {
    env = setupScriptEnvironment({
      readyState: 'complete',
      devices: {
        filterOptions: ['IRND']
      }
    });

    const { renderFilterDetails, setCurrentProjectInfo } = env.utils;
    const filterSelect = document.getElementById('filter');
    const option = Array.from(filterSelect.options).find(opt => opt.value === 'IRND');
    expect(option).toBeDefined();
    option.selected = true;
    option.setAttribute('selected', '');
    filterSelect.value = 'IRND';

    const gearListOutput = document.getElementById('gearListOutput');
    gearListOutput.innerHTML = [
      '<span class="gear-item" data-filter-entry="filter-IRND" data-filter-label="IRND Filter Set">',
      '1x IRND Filter Set (0.3 | 0.6)',
      '</span>',
      '<div id="gearListFilterDetails"></div>'
    ].join('');

    setCurrentProjectInfo({ filter: 'IRND:4x5.65:0.3|0.6' });

    renderFilterDetails();

    const detailHeading = gearListOutput.querySelector('.filter-detail-label');
    expect(detailHeading).not.toBeNull();
    expect(detailHeading.textContent.trim()).toBe('1x IRND Filter Set');

    const gearEntry = gearListOutput.querySelector('[data-filter-entry="filter-IRND"]');
    expect(gearEntry).not.toBeNull();
    expect(gearEntry.textContent.trim()).toBe('1x IRND Filter Set');
  });
});
