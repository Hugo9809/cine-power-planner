const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

describe('filter selection helpers', () => {
  let env;

  afterEach(() => {
    env?.cleanup();
    env = null;
    localStorage.clear();
    jest.restoreAllMocks();
  });

  test('parseFilterTokens normalizes token values and filters invalid entries', () => {
    env = setupScriptEnvironment();
    const { parseFilterTokens } = env.utils;

    const tokens = parseFilterTokens(
      'IRND:6x6:0.9| 1.2 ,Clear:4x5.65,Diopter:95mm:!,Pol::, :ignored'
    );

    expect(tokens).toEqual([
      { type: 'IRND', size: '6x6', values: ['0.9', '1.2'] },
      { type: 'Clear', size: '4x5.65', values: undefined },
      { type: 'Diopter', size: '95mm', values: [] },
      { type: 'Pol', size: '4x5.65', values: [] },
    ]);
  });

  test('collectFilterSelections reflects DOM state and project defaults', () => {
    env = setupScriptEnvironment();
    const { collectFilterSelections, setCurrentProjectInfo } = env.utils;

    setCurrentProjectInfo({ filter: 'Diopter:4x5.65:+1/2|+2,Clear:6x6' });

    const filterSelect = document.getElementById('filter');
    const addOption = (value, isSelected = false) => {
      const opt = document.createElement('option');
      opt.value = value;
      opt.textContent = value;
      opt.selected = isSelected;
      if (isSelected) {
        opt.setAttribute('selected', '');
      }
      filterSelect.appendChild(opt);
      return opt;
    };

    addOption('Diopter', true);
    addOption('Clear', true);
    addOption('IRND', false);

    const diopterSize = document.createElement('select');
    diopterSize.id = 'filter-size-Diopter';
    ['4x5.65', '95mm'].forEach(sizeValue => {
      const sizeOption = document.createElement('option');
      sizeOption.value = sizeValue;
      sizeOption.textContent = sizeValue;
      if (sizeValue === '95mm') {
        sizeOption.selected = true;
        sizeOption.setAttribute('selected', '');
      }
      diopterSize.appendChild(sizeOption);
    });
    document.body.appendChild(diopterSize);

    const selection = collectFilterSelections();

    expect(selection).toBe('Diopter:95mm:+1/2|+2,Clear:6x6');
  });
});
