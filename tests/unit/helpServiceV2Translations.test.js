const path = require('path');

describe('V2 help service translations', () => {
  const modulePath = path.join('..', '..', 'src', 'scripts', 'v2', 'help-service.js');

  beforeEach(() => {
    global.window = global;
    global.document = { documentElement: { lang: 'en' } };
    global.currentLanguage = 'en';
    global.ICON_GLYPHS = {
      overview: { char: 'o', font: 'uicons' },
    };
    global.texts = {
      en: {
        helpGroupEssentials: 'Essentials',
        helpGroupGuides: 'Guides',
        helpGroupReference: 'Topic Reference',
        helpV2QuickStartTitle: 'Quick Start',
        helpV2QuickStartKeywords: 'quick start',
        helpV2QuickStartContent: '<p>Quick start content.</p>',
        helpTopics: {
          projectManagement: {
            title: 'Project Management',
            content: 'Content body.',
          },
        },
      },
    };
    global.cineV2HelpData = [
      {
        id: 'v2-quick-start',
        titleKey: 'helpV2QuickStartTitle',
        keywordsKey: 'helpV2QuickStartKeywords',
        contentKey: 'helpV2QuickStartContent',
        iconKey: 'overview',
      },
    ];
  });

  afterEach(() => {
    delete global.cineHelpService;
    delete global.cineV2HelpData;
    delete global.texts;
    delete global.ICON_GLYPHS;
    delete global.currentLanguage;
    delete global.document;
    delete global.window;
  });

  test('resolves V2 topics and group labels from translation keys', () => {
    jest.isolateModules(() => {
      require(modulePath);
    });

    const grouped = global.cineHelpService.getGroupedSections();
    expect(grouped.essentials.title).toBe('Essentials');
    expect(grouped.guide.title).toBe('Guides');
    expect(grouped.reference.title).toBe('Topic Reference');

    const quickStart = grouped.essentials.items[0];
    expect(quickStart.title).toBe('Quick Start');
    expect(quickStart.keywords).toBe('quick start');
    expect(quickStart.content).toBe('<p>Quick start content.</p>');
    expect(quickStart.icon).toEqual(global.ICON_GLYPHS.overview);
  });
});
