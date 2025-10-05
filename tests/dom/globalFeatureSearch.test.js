const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

jest.setTimeout(180000);

describe('global feature search help navigation', () => {
  let env;
  let featureSearch;
  let helpDialog;
  let helpSearch;
  let helpQuickLinksList;

  const triggerFeatureSearch = value => {
    featureSearch.value = value;
    featureSearch.dispatchEvent(new Event('change', { bubbles: true }));
  };

  beforeEach(() => {
    env = setupScriptEnvironment();
    window.alert = jest.fn();
    featureSearch = document.getElementById('featureSearch');
    helpDialog = document.getElementById('helpDialog');
    helpSearch = document.getElementById('helpSearch');
    helpQuickLinksList = document.getElementById('helpQuickLinksList');
  });

  afterEach(() => {
    env?.cleanup();
  });

  test('searching by help keywords highlights the best match', async () => {
    expect(featureSearch).toBeTruthy();
    expect(helpDialog).toBeTruthy();
    expect(helpSearch).toBeTruthy();
    expect(helpQuickLinksList).toBeTruthy();

    document.dispatchEvent(new Event('DOMContentLoaded'));
    await new Promise(resolve => setTimeout(resolve, 0));

    const featureList = document.getElementById('featureList');
    expect(featureList).toBeTruthy();
    expect(featureList.childElementCount).toBeGreaterThan(0);
    const helpOptions = Array.from(featureList.options).filter(opt =>
      opt.value.endsWith(' (help)')
    );
    expect(helpOptions.length).toBeGreaterThan(0);
    expect(
      helpOptions.every(opt => typeof opt.label === 'string' && opt.label.includes('Help'))
    ).toBe(true);

    triggerFeatureSearch('offline mode');

    expect(helpDialog.hasAttribute('hidden')).toBe(false);
    expect(featureSearch.value).toBe('offline mode');
    expect(helpSearch.value).toBe('offline mode');

    const featuresSection = document.getElementById('featuresOverview');
    expect(featuresSection).toBeTruthy();
    const visibleSections = Array.from(
      document.querySelectorAll('#helpSections [data-help-section]:not([hidden])')
    ).map(sec => sec.id);
    expect(visibleSections).toContain('featuresOverview');
    expect(featuresSection.classList.contains('help-section-focus')).toBe(true);

    const quickLinkButton = Array.from(
      helpQuickLinksList.querySelectorAll('.help-quick-link')
    ).find(btn => btn.textContent.includes('Features at a Glance'));
    expect(quickLinkButton).toBeTruthy();
    expect(quickLinkButton.classList.contains('active')).toBe(true);
  });

  test('prefers feature matches over help when relevance ties', async () => {
    expect(featureSearch).toBeTruthy();
    expect(helpDialog).toBeTruthy();

    document.dispatchEvent(new Event('DOMContentLoaded'));
    await new Promise(resolve => setTimeout(resolve, 0));

    triggerFeatureSearch('Power Summary');

    expect(helpDialog.hasAttribute('hidden')).toBe(true);
    expect(featureSearch.value).toBe('Power Summary');

    const resultsHeading = document.getElementById('resultsHeading');
    expect(resultsHeading).toBeTruthy();
    expect(document.activeElement).toBe(resultsHeading);
  });

  test('suggestions rank feature results ahead of help topics', async () => {
    expect(featureSearch).toBeTruthy();

    document.dispatchEvent(new Event('DOMContentLoaded'));
    await new Promise(resolve => setTimeout(resolve, 0));

    const featureList = document.getElementById('featureList');
    expect(featureList).toBeTruthy();

    featureSearch.value = 'Power Summary';
    featureSearch.dispatchEvent(new Event('input', { bubbles: true }));

    const options = Array.from(featureList.options).map(opt => opt.value);
    const featureIndex = options.findIndex(value =>
      value.startsWith('Power Summary') && !value.trim().endsWith('(help)')
    );
    const helpIndex = options.findIndex(value =>
      value.startsWith('Power Summary') && value.trim().endsWith('(help)')
    );

    expect(featureIndex).toBeGreaterThanOrEqual(0);
    if (helpIndex >= 0) {
      expect(helpIndex).toBeGreaterThan(featureIndex);
    }
  });

  test('suggestions label result types for clarity', async () => {
    document.dispatchEvent(new Event('DOMContentLoaded'));
    await new Promise(resolve => setTimeout(resolve, 0));

    const featureList = document.getElementById('featureList');
    expect(featureList).toBeTruthy();

    const options = Array.from(featureList.options);
    expect(options.length).toBeGreaterThan(0);

    expect(
      options.some(opt => typeof opt.label === 'string' && opt.label.includes('Feature'))
    ).toBe(true);
    expect(
      options.some(opt => typeof opt.label === 'string' && opt.label.includes('Action'))
    ).toBe(true);
    expect(
      options.some(opt => typeof opt.label === 'string' && opt.label.includes('Device'))
    ).toBe(true);
    expect(
      options.some(opt => typeof opt.label === 'string' && opt.label.includes('Help'))
    ).toBe(true);
  });

  test('search suggestions include help text keywords', async () => {
    expect(featureSearch).toBeTruthy();

    document.dispatchEvent(new Event('DOMContentLoaded'));
    await new Promise(resolve => setTimeout(resolve, 0));

    const featureList = document.getElementById('featureList');
    expect(featureList).toBeTruthy();

    featureSearch.value = 'JSON';
    featureSearch.dispatchEvent(new Event('input', { bubbles: true }));

    const options = Array.from(featureList.options);
    expect(options.length).toBeGreaterThan(0);
    expect(
      options.some(opt => /Export Project/i.test(opt.value || '') || /Export Project/i.test(opt.label || ''))
    ).toBe(true);
  });

  test('search suggestions highlight matching tokens', async () => {
    expect(featureSearch).toBeTruthy();

    document.dispatchEvent(new Event('DOMContentLoaded'));
    await new Promise(resolve => setTimeout(resolve, 0));

    const dropdown = document.getElementById('featureSearchDropdown');
    expect(dropdown).toBeTruthy();

    featureSearch.value = 'backup';
    featureSearch.dispatchEvent(new Event('input', { bubbles: true }));
    await new Promise(resolve => setTimeout(resolve, 0));

    const highlights = dropdown.querySelectorAll('.feature-search-highlight');
    expect(highlights.length).toBeGreaterThan(0);
    const highlightedText = Array.from(highlights).map(el => el.textContent.trim().toLowerCase());
    expect(highlightedText.some(text => text.includes('backup'))).toBe(true);
  });

  test('feature filter skips device matches when navigating from search', async () => {
    expect(featureSearch).toBeTruthy();

    const batterySelect = document.getElementById('batterySelect');
    expect(batterySelect).toBeTruthy();

    const noneOption = document.createElement('option');
    noneOption.value = 'None';
    noneOption.textContent = 'None';
    batterySelect.appendChild(noneOption);

    const deviceOption = document.createElement('option');
    deviceOption.value = 'Test Battery';
    deviceOption.textContent = 'Test Battery';
    batterySelect.appendChild(deviceOption);
    batterySelect.value = 'None';

    document.dispatchEvent(new Event('DOMContentLoaded'));
    await new Promise(resolve => setTimeout(resolve, 0));

    featureSearch.value = 'feature: battery';
    featureSearch.dispatchEvent(new Event('change', { bubbles: true }));
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(batterySelect.value).toBe('None');

    const heading = document.getElementById('batteryComparisonHeading');
    expect(heading).toBeTruthy();
    expect(document.activeElement).toBe(heading);
    expect(heading.classList.contains('feature-search-focus')).toBe(true);
  });
});
