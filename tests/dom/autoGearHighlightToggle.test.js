const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');
const { texts } = require('../../src/scripts/translations.js');

const SAMPLE_RULE_LABEL = 'Debug Rule';
const SAMPLE_TABLE_HTML = `
  <table class="gear-table">
    <tbody class="category-group">
      <tr class="category-row"><td>Auto</td></tr>
      <tr><td><span class="gear-item auto-gear-item" data-gear-name="Auto Item" data-auto-gear-rule-id="debug-rule" data-auto-gear-rule-label="${SAMPLE_RULE_LABEL}">1x Auto Item</span></td></tr>
    </tbody>
  </table>
`;
const SAMPLE_TABLE_HTML_REFRESH = SAMPLE_TABLE_HTML.replace(/Auto Item/g, 'Auto Item 2');
const EXPECTED_BADGE_TEXT = (texts.en.autoGearRuleBadgeNamed || 'Rule: %s').replace('%s', SAMPLE_RULE_LABEL);

describe('automatic gear highlight toggle', () => {
  let env;

  beforeEach(() => {
    env = setupScriptEnvironment();
  });

  afterEach(() => {
    env?.cleanup();
  });

  test('toggle highlights automatically added gear entries', () => {
    const gearListOutput = document.getElementById('gearListOutput');
    expect(gearListOutput).not.toBeNull();

    gearListOutput.classList.remove('hidden');
    gearListOutput.innerHTML = SAMPLE_TABLE_HTML;

    env.utils.ensureGearListActions();

    const toggle = document.getElementById('autoGearHighlightToggle');
    expect(toggle).not.toBeNull();

    const badge = gearListOutput.querySelector('.auto-gear-rule-badge');
    expect(badge).not.toBeNull();
    expect(badge.textContent).toBe(EXPECTED_BADGE_TEXT);

    const labelText = (toggle.textContent || '').trim();
    expect(labelText.length).toBeGreaterThan(0);
    expect(toggle.getAttribute('aria-pressed')).toBe('false');
    expect(gearListOutput.classList.contains('show-auto-gear-highlight')).toBe(false);

    toggle.click();

    expect(gearListOutput.classList.contains('show-auto-gear-highlight')).toBe(true);
    expect(toggle.getAttribute('aria-pressed')).toBe('true');
    expect(toggle.classList.contains('is-active')).toBe(true);
    const badgeAfterToggle = gearListOutput.querySelector('.auto-gear-rule-badge');
    expect(badgeAfterToggle).not.toBeNull();
    expect(badgeAfterToggle.textContent).toBe(EXPECTED_BADGE_TEXT);

    gearListOutput.innerHTML = SAMPLE_TABLE_HTML_REFRESH;
    env.utils.ensureGearListActions();

    const toggleAfterRefresh = document.getElementById('autoGearHighlightToggle');
    expect(toggleAfterRefresh.getAttribute('aria-pressed')).toBe('true');
    expect(toggleAfterRefresh.classList.contains('is-active')).toBe(true);
    expect(gearListOutput.classList.contains('show-auto-gear-highlight')).toBe(true);
    const badgeAfterRefresh = gearListOutput.querySelector('.auto-gear-rule-badge');
    expect(badgeAfterRefresh).not.toBeNull();
    expect(badgeAfterRefresh.textContent).toBe(EXPECTED_BADGE_TEXT);

    toggleAfterRefresh.click();

    expect(gearListOutput.classList.contains('show-auto-gear-highlight')).toBe(false);
    expect(toggleAfterRefresh.getAttribute('aria-pressed')).toBe('false');
    expect(toggleAfterRefresh.classList.contains('is-active')).toBe(false);
  });
});
