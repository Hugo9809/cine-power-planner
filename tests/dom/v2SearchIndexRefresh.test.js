describe('v2 sidebar search index refresh', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="v2-search-input-wrapper">
        <input id="v2SidebarSearchInput" class="v2-search-input" />
      </div>
    `;
    window.featureSearchEntries = [
      { key: 'alpha', optionLabel: 'Alpha', display: 'Alpha', type: 'feature' }
    ];
    window.featureSearchDefaultOptions = [
      { label: 'Search Index Refresh Example' }
    ];
  });

  afterEach(() => {
    delete window.featureSearchEntries;
    delete window.featureSearchDefaultOptions;
    document.body.innerHTML = '';
  });

  test('refresh hook rebuilds index for updated default options', async () => {
    const moduleApi = await import('../../src/scripts/v2/search-module.js');
    const didSetup = moduleApi.setupV2Search({ inputId: 'v2SidebarSearchInput' });
    expect(didSetup).toBe(true);

    const input = document.getElementById('v2SidebarSearchInput');
    input.dispatchEvent(new Event('focus'));

    const dropdown = document.getElementById('featureSearchDropdown');
    expect(dropdown).toBeTruthy();
    expect(dropdown.dataset.count).toBe('0');

    window.featureSearchEntries = [
      {
        key: 'search-refresh',
        optionLabel: 'Search Index Refresh Example',
        display: 'Search Index Refresh Example',
        type: 'feature'
      }
    ];
    window.dispatchEvent(new Event('v2:search-index-refresh'));

    input.dispatchEvent(new Event('focus'));
    const options = Array.from(dropdown.querySelectorAll('.feature-search-option-label'))
      .map(node => node.textContent);
    expect(options).toContain('Search Index Refresh Example');
  });
});
