const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

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
});
