const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

describe('help dialog search behaviour', () => {
  let env;
  let helpSearch;
  let helpSearchClear;
  let helpDialog;
  let helpQuickLinks;
  let helpQuickLinksList;

  const typeInHelpSearch = value => {
    helpSearch.value = value;
    helpSearch.dispatchEvent(new Event('input', { bubbles: true }));
  };

  beforeEach(() => {
    env = setupScriptEnvironment();
    helpSearch = document.getElementById('helpSearch');
    helpSearchClear = document.getElementById('helpSearchClear');
    helpDialog = document.getElementById('helpDialog');
    helpQuickLinks = document.getElementById('helpQuickLinks');
    helpQuickLinksList = document.getElementById('helpQuickLinksList');
  });

  afterEach(() => {
    env?.cleanup();
  });

  test('matching FAQ answers expand while search is active', () => {
    const faqItems = Array.from(helpDialog.querySelectorAll('.faq-item'));
    const targetFaq = faqItems.find(item =>
      item.querySelector('summary')?.textContent.includes('clear cached files')
    );
    expect(targetFaq).toBeTruthy();
    const defaultOpen = targetFaq.hasAttribute('open');
    expect(helpSearchClear.hasAttribute('hidden')).toBe(true);

    typeInHelpSearch('force reload');

    expect(targetFaq.hasAttribute('open')).toBe(true);
    expect(helpSearchClear.hasAttribute('hidden')).toBe(false);

    typeInHelpSearch('');

    expect(targetFaq.hasAttribute('open')).toBe(defaultOpen);
    expect(helpSearchClear.hasAttribute('hidden')).toBe(true);
  });

  test('search matches keyword metadata for alternate spellings', () => {
    const featuresSection = helpDialog.querySelector('#featuresOverview');
    expect(featuresSection).toBeTruthy();

    typeInHelpSearch('favourites');

    expect(featuresSection.hasAttribute('hidden')).toBe(false);
    expect(helpSearchClear.hasAttribute('hidden')).toBe(false);

    typeInHelpSearch('');

    expect(helpSearchClear.hasAttribute('hidden')).toBe(true);
  });

  test('quick links mirror filtered help sections', () => {
    expect(helpQuickLinks).toBeTruthy();
    expect(helpQuickLinksList).toBeTruthy();
    const buttons = Array.from(
      helpQuickLinksList.querySelectorAll('.help-quick-link')
    );
    const featuresButton = buttons.find(btn =>
      btn.textContent.includes('Features at a Glance')
    );
    const powerButton = buttons.find(btn =>
      btn.textContent.includes('Power Calculator')
    );
    const troubleshootingButton = buttons.find(btn =>
      btn.textContent.includes('Troubleshooting')
    );
    expect(featuresButton).toBeTruthy();
    expect(powerButton).toBeTruthy();
    expect(troubleshootingButton).toBeTruthy();
    const featuresItem = featuresButton.closest('li');
    const powerItem = powerButton.closest('li');
    const troubleshootingItem = troubleshootingButton.closest('li');
    expect(featuresItem).toBeTruthy();
    expect(powerItem).toBeTruthy();
    expect(troubleshootingItem).toBeTruthy();

    typeInHelpSearch('power calculator');

    expect(helpQuickLinks.hasAttribute('hidden')).toBe(false);
    expect(powerItem.hasAttribute('hidden')).toBe(false);
    expect(featuresItem.hasAttribute('hidden')).toBe(true);
    expect(troubleshootingItem.hasAttribute('hidden')).toBe(true);

    typeInHelpSearch('no matching topic');

    expect(helpQuickLinks.hasAttribute('hidden')).toBe(true);

    typeInHelpSearch('');

    expect(helpQuickLinks.hasAttribute('hidden')).toBe(false);
    expect(featuresItem.hasAttribute('hidden')).toBe(false);
  });

  test('clicking a quick link highlights the target section', () => {
    const powerSection = document.getElementById('powerCalculator');
    expect(powerSection).toBeTruthy();
    const button = Array.from(
      helpQuickLinksList.querySelectorAll('.help-quick-link')
    ).find(btn => btn.textContent.includes('Power Calculator'));
    expect(button).toBeTruthy();

    button.click();

    expect(button.classList.contains('active')).toBe(true);
    expect(powerSection.classList.contains('help-section-focus')).toBe(true);
  });

  test('troubleshooting keywords surface the recovery section', () => {
    const troubleshootingSection = document.getElementById(
      'troubleshootingHelp'
    );
    expect(troubleshootingSection).toBeTruthy();

    typeInHelpSearch('stuck');

    expect(troubleshootingSection.hasAttribute('hidden')).toBe(false);
    expect(helpQuickLinks.hasAttribute('hidden')).toBe(false);

    typeInHelpSearch('');

    expect(troubleshootingSection.hasAttribute('hidden')).toBe(false);
  });
});
