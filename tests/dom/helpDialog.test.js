const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

describe('help dialog search behaviour', () => {
  let env;
  let helpSearch;
  let helpSearchClear;
  let helpDialog;

  const typeInHelpSearch = value => {
    helpSearch.value = value;
    helpSearch.dispatchEvent(new Event('input', { bubbles: true }));
  };

  beforeEach(() => {
    env = setupScriptEnvironment();
    helpSearch = document.getElementById('helpSearch');
    helpSearchClear = document.getElementById('helpSearchClear');
    helpDialog = document.getElementById('helpDialog');
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
});
