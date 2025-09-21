const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

describe('crew contact links', () => {
  let env;

  afterEach(() => {
    if (env && typeof env.cleanup === 'function') {
      env.cleanup();
    }
    env = null;
  });

  test('crew entries render tel and mailto links', () => {
    env = setupScriptEnvironment();
    const { generateGearListHtml } = env.utils;
    const html = generateGearListHtml({
      people: [
        {
          role: 'Director',
          name: 'Jamie Crew',
          phone: '+1 555 123 4567',
          email: 'jamie.crew@example.com'
        }
      ]
    });
    const container = document.createElement('div');
    container.innerHTML = html;
    const crewBox = container.querySelector('.requirement-box[data-field="crew"]');
    expect(crewBox).not.toBeNull();
    const value = crewBox.querySelector('.req-value');
    expect(value).not.toBeNull();
    const phoneLink = value.querySelector('a[href="tel:+15551234567"]');
    expect(phoneLink).not.toBeNull();
    expect(phoneLink.textContent).toBe('+1 555 123 4567');
    const mailLink = value.querySelector('a[href="mailto:jamie.crew@example.com"]');
    expect(mailLink).not.toBeNull();
    expect(mailLink.textContent).toBe('jamie.crew@example.com');
    expect(value.textContent).toContain('Director: Jamie Crew');
  });
});
