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
    gearListOutput.innerHTML = '<div id="gearListFilterDetails"></div>';

    setCurrentProjectInfo({ filter: 'IRND:4x5.65:0.3|0.6' });

    renderFilterDetails();

    const heading = gearListOutput.querySelector('.filter-detail-label');
    expect(heading).not.toBeNull();
    expect(heading.textContent.trim()).toBe('1x IRND Filter (0.3, 0.6)');
  });
});
