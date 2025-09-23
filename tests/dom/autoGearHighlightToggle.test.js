const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');
const { texts } = require('../../src/scripts/translations.js');

const SAMPLE_RULE_LABEL = 'Debug Rule';
const SAMPLE_RULE_LABEL_TWO = 'Second Rule';
const SAMPLE_RULE_ID = 'debug-rule';
const SAMPLE_RULE_ID_TWO = 'secondary-rule';
const SAMPLE_TABLE_HTML = `
  <table class="gear-table">
    <tbody class="category-group">
      <tr class="category-row"><td>Auto</td></tr>
      <tr>
        <td>
          <span
            class="gear-item auto-gear-item"
            data-gear-name="Auto Item"
            data-auto-gear-rule-id="${SAMPLE_RULE_ID}"
            data-auto-gear-rule-label="${SAMPLE_RULE_LABEL}"
          >1x Auto Item</span>
        </td>
      </tr>
      <tr>
        <td>
          <span
            class="gear-item auto-gear-item"
            data-gear-name="Auto Item B"
            data-auto-gear-rule-id="${SAMPLE_RULE_ID_TWO}"
            data-auto-gear-rule-label="${SAMPLE_RULE_LABEL_TWO}"
          >1x Auto Item B</span>
        </td>
      </tr>
    </tbody>
  </table>
`;
const SAMPLE_TABLE_HTML_REFRESH = SAMPLE_TABLE_HTML.replace(/Auto Item/g, 'Auto Item 2');
const EXPECTED_BADGE_TEXTS = [
  (texts.en.autoGearRuleBadgeNamed || 'Rule: %s').replace('%s', SAMPLE_RULE_LABEL),
  (texts.en.autoGearRuleBadgeNamed || 'Rule: %s').replace('%s', SAMPLE_RULE_LABEL_TWO),
];

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

    const badges = Array.from(gearListOutput.querySelectorAll('.auto-gear-rule-badge'));
    expect(badges).toHaveLength(2);
    const badgeTexts = badges.map(badgeNode => badgeNode.textContent);
    EXPECTED_BADGE_TEXTS.forEach(expected => {
      expect(badgeTexts).toContain(expected);
    });

    const autoGearItems = Array.from(gearListOutput.querySelectorAll('.auto-gear-item'));
    expect(autoGearItems).toHaveLength(2);
    const [firstItem, secondItem] = autoGearItems;
    autoGearItems.forEach(item => {
      expect(item.dataset.autoGearRuleColor).toMatch(/^\d+$/);
      expect(item.style.getPropertyValue('--auto-gear-rule-bg').trim().length).toBeGreaterThan(0);
    });
    expect(firstItem.style.getPropertyValue('--auto-gear-rule-bg'))
      .not.toBe(secondItem.style.getPropertyValue('--auto-gear-rule-bg'));

    const labelText = (toggle.textContent || '').trim();
    expect(labelText.length).toBeGreaterThan(0);
    expect(toggle.getAttribute('aria-pressed')).toBe('false');
    expect(gearListOutput.classList.contains('show-auto-gear-highlight')).toBe(false);

    toggle.click();

    expect(gearListOutput.classList.contains('show-auto-gear-highlight')).toBe(true);
    expect(toggle.getAttribute('aria-pressed')).toBe('true');
    expect(toggle.classList.contains('is-active')).toBe(true);
    const badgesAfterToggle = Array.from(gearListOutput.querySelectorAll('.auto-gear-rule-badge'));
    expect(badgesAfterToggle).toHaveLength(2);
    const badgeTextsAfterToggle = badgesAfterToggle.map(node => node.textContent);
    EXPECTED_BADGE_TEXTS.forEach(expected => {
      expect(badgeTextsAfterToggle).toContain(expected);
    });

    const toggledBackgrounds = autoGearItems.map(item => item.style.getPropertyValue('--auto-gear-rule-bg'));
    expect(toggledBackgrounds[0]).not.toBe(toggledBackgrounds[1]);

    gearListOutput.innerHTML = SAMPLE_TABLE_HTML_REFRESH;
    env.utils.ensureGearListActions();

    const toggleAfterRefresh = document.getElementById('autoGearHighlightToggle');
    expect(toggleAfterRefresh.getAttribute('aria-pressed')).toBe('true');
    expect(toggleAfterRefresh.classList.contains('is-active')).toBe(true);
    expect(gearListOutput.classList.contains('show-auto-gear-highlight')).toBe(true);
    const refreshedItems = Array.from(gearListOutput.querySelectorAll('.auto-gear-item'));
    expect(refreshedItems).toHaveLength(2);
    refreshedItems.forEach(item => {
      expect(item.dataset.autoGearRuleColor).toMatch(/^\d+$/);
      expect(item.style.getPropertyValue('--auto-gear-rule-bg').trim().length).toBeGreaterThan(0);
    });
    const refreshBadgeTexts = Array.from(gearListOutput.querySelectorAll('.auto-gear-rule-badge'))
      .map(node => node.textContent);
    EXPECTED_BADGE_TEXTS.forEach(expected => {
      expect(refreshBadgeTexts).toContain(expected);
    });

    toggleAfterRefresh.click();

    expect(gearListOutput.classList.contains('show-auto-gear-highlight')).toBe(false);
    expect(toggleAfterRefresh.getAttribute('aria-pressed')).toBe('false');
    expect(toggleAfterRefresh.classList.contains('is-active')).toBe(false);
  });
});
