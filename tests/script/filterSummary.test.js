const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

describe('gear list filter summary', () => {
  let env;

  afterEach(() => {
    if (env && typeof env.cleanup === 'function') {
      env.cleanup();
    }
    env = null;
  });

  const getFilterSummaryItems = (html) => {
    const container = document.createElement('div');
    container.innerHTML = html;
    const group = Array.from(container.querySelectorAll('tbody.category-group')).find((tbody) => {
      const header = tbody.querySelector('.category-row td');
      return header && header.textContent.trim() === 'Matte box + filter';
    });
    if (!group) {
      return [];
    }
    return Array.from(group.querySelectorAll('.gear-list-filter-summary .gear-item')).map((span) => span.textContent.trim());
  };

  test('deduplicates repeated filter entries in the summary', () => {
    env = setupScriptEnvironment({
      readyState: 'complete',
      devices: {
        filterOptions: ['IRND'],
      },
    });

    const { generateGearListHtml } = env.utils;
    const html = generateGearListHtml({
      filter: 'IRND:4x5.65:0.3|0.6,IRND:4x5.65:0.3|0.6',
    });

    const items = getFilterSummaryItems(html);
    expect(items).toEqual(['1x IRND Filter (4x5.65 • 0.3, 0.6)']);
  });

  test('keeps the latest filter configuration when duplicates are present', () => {
    env = setupScriptEnvironment({
      readyState: 'complete',
      devices: {
        filterOptions: ['IRND'],
      },
    });

    const { generateGearListHtml } = env.utils;
    const html = generateGearListHtml({
      filter: 'IRND:4x5.65:0.3|0.6,IRND:6x6:1.2|1.5',
    });

    const items = getFilterSummaryItems(html);
    expect(items).toEqual(['1x IRND Filter (6x6 • 1.2, 1.5)']);
  });

  test('prefers entries with explicit checkbox selections when later duplicates lack them', () => {
    env = setupScriptEnvironment({
      readyState: 'complete',
      devices: {
        filterOptions: ['IRND'],
      },
    });

    const { generateGearListHtml } = env.utils;
    const html = generateGearListHtml({
      filter: 'IRND:4x5.65:0.3|0.6,IRND:4x5.65',
    });

    const items = getFilterSummaryItems(html);
    expect(items).toEqual(['1x IRND Filter (4x5.65 • 0.3, 0.6)']);
  });
});
