const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

const flushPromises = () => new Promise(resolve => setTimeout(resolve, 0));

describe('local fonts button', () => {
  let env;
  let originalQueryLocalFonts;
  let originalFontsDescriptor;

  beforeEach(() => {
    originalQueryLocalFonts = window.queryLocalFonts;
    originalFontsDescriptor = Object.getOwnPropertyDescriptor(window.navigator, 'fonts');
  });

  afterEach(() => {
    env?.cleanup();
    env = null;

    if (typeof originalQueryLocalFonts !== 'undefined') {
      window.queryLocalFonts = originalQueryLocalFonts;
    } else {
      delete window.queryLocalFonts;
    }

    if (originalFontsDescriptor) {
      Object.defineProperty(window.navigator, 'fonts', originalFontsDescriptor);
    } else {
      delete window.navigator.fonts;
    }
  });

  test('adds fonts returned by window.queryLocalFonts to the selector', async () => {
    window.queryLocalFonts = jest.fn().mockResolvedValue([
      { family: 'Test Family' },
      { fullName: 'Another Font' }
    ]);

    env = setupScriptEnvironment();

    const button = document.getElementById('localFontsButton');
    expect(button).not.toBeNull();
    expect(button.hasAttribute('hidden')).toBe(false);

    button.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
    await flushPromises();

    expect(window.queryLocalFonts).toHaveBeenCalledTimes(1);

    const options = Array.from(document.querySelectorAll('#localFontsGroup option'));
    expect(options).toHaveLength(2);
    expect(options.map(opt => opt.value)).toEqual(
      expect.arrayContaining(["'Test Family', sans-serif", "'Another Font', sans-serif"])
    );

    const status = document.getElementById('localFontsStatus');
    expect(status.textContent).toBe('Added: Test Family, Another Font');
  });

  test('falls back to navigator.fonts.query when window.queryLocalFonts is unavailable', async () => {
    delete window.queryLocalFonts;

    const yieldedFonts = [
      { family: 'Fallback Font' },
      { family: 'Duplicate Font' },
      { family: 'Fallback Font' }
    ];

    const asyncIterable = {
      async *[Symbol.asyncIterator]() {
        for (const font of yieldedFonts) {
          yield font;
        }
      }
    };

    Object.defineProperty(window.navigator, 'fonts', {
      configurable: true,
      value: {
        query: jest.fn(() => asyncIterable)
      }
    });

    env = setupScriptEnvironment();

    const button = document.getElementById('localFontsButton');
    expect(button).not.toBeNull();
    expect(button.hasAttribute('hidden')).toBe(false);

    button.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
    await flushPromises();

    expect(window.navigator.fonts.query).toHaveBeenCalledTimes(1);

    const values = Array.from(document.querySelectorAll('#localFontsGroup option')).map(
      opt => opt.value
    );
    expect(values).toContain("'Fallback Font', sans-serif");
    expect(values).toContain("'Duplicate Font', sans-serif");
    expect(new Set(values).size).toBe(values.length);
  });
});
