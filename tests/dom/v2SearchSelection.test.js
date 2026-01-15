describe('v2 search selection', () => {
  const setupDom = () => {
    document.body.innerHTML = `
      <div class="v2-search-input-wrapper">
        <input id="v2SidebarSearchInput" />
      </div>
    `;
  };

  const seedEntries = () => {
    window.featureSearchEntries = [
      {
        key: 'canon-c200',
        optionLabel: 'Canon C200',
        display: 'Canon C200',
        detail: 'Camera',
        type: 'feature'
      },
      {
        key: 'fallback',
        label: 'Fallback Label',
        display: '',
        detail: 'Accessory',
        type: 'feature'
      }
    ];
  };

  beforeEach(() => {
    setupDom();
    seedEntries();
    window.featureSearchDefaultOptions = [];
    window.runFeatureSearch = jest.fn();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    delete window.featureSearchEntries;
    delete window.featureSearchDefaultOptions;
    delete window.runFeatureSearch;
    jest.resetModules();
  });

  test('selecting a result updates the input, dispatches events, and closes the dropdown', async () => {
    const { setupV2Search } = await import('../../src/scripts/v2/search-module.js');
    const input = document.getElementById('v2SidebarSearchInput');

    expect(setupV2Search({ inputId: 'v2SidebarSearchInput' })).toBe(true);

    const dropdown = document.getElementById('featureSearchDropdown');
    expect(dropdown).toBeTruthy();

    const events = [];
    input.addEventListener('input', () => events.push('input'));
    input.addEventListener('change', () => events.push('change'));

    input.value = 'canon';
    input.dispatchEvent(new Event('input', { bubbles: true }));

    const option = dropdown.querySelector('[data-entry-key]');
    expect(option).toBeTruthy();

    events.length = 0;
    option.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(input.value).toBe('Canon C200');
    expect(window.runFeatureSearch).toHaveBeenCalledWith('Canon C200');
    expect(events).toEqual(expect.arrayContaining(['input', 'change']));
    expect(dropdown.hidden).toBe(true);
    expect(dropdown.dataset.open).toBe('false');
  });

  test('falls back to the label when display text is empty', async () => {
    const { setupV2Search } = await import('../../src/scripts/v2/search-module.js');
    const input = document.getElementById('v2SidebarSearchInput');

    expect(setupV2Search({ inputId: 'v2SidebarSearchInput' })).toBe(true);

    const dropdown = document.getElementById('featureSearchDropdown');
    input.value = 'fallback';
    input.dispatchEvent(new Event('input', { bubbles: true }));

    const options = Array.from(dropdown.querySelectorAll('[data-entry-key]'));
    const fallbackOption = options.find(option =>
      option.getAttribute('data-entry-key')?.includes('fallback')
    );
    expect(fallbackOption).toBeTruthy();

    fallbackOption.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(input.value).toBe('Fallback Label');
    expect(window.runFeatureSearch).toHaveBeenCalledWith('Fallback Label');
    expect(dropdown.hidden).toBe(true);
  });
});
