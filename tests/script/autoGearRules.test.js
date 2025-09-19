const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

const STORAGE_KEY = 'cameraPowerPlanner_autoGearRules';

describe('applyAutoGearRulesToTableHtml', () => {
  let env;

  afterEach(() => {
    env?.cleanup();
    localStorage.clear();
  });

  test('removes matching gear without duplicating categories', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        {
          id: 'rule-monitoring',
          label: 'Adjust monitoring',
          scenarios: ['Outdoor'],
          add: [],
          remove: [
            { id: 'remove-monitor', name: 'SmallHD Cine 13', category: 'Monitoring', quantity: 1 }
          ]
        }
      ])
    );

    env = setupScriptEnvironment();
    const { applyAutoGearRulesToTableHtml } = env.utils;

    const tableHtml = `
      <table class="gear-table">
        <tbody class="category-group">
          <tr class="category-row"><td>Monitoring</td></tr>
          <tr>
            <td>
              <span class="gear-item" data-gear-name="SmallHD Cine 13">1x SmallHD Cine 13</span><br />
              <span class="gear-item" data-gear-name="BNC Cable">2x BNC Cable</span>
            </td>
          </tr>
        </tbody>
      </table>
    `;

    const result = applyAutoGearRulesToTableHtml(tableHtml, { requiredScenarios: 'Outdoor' });
    const container = document.createElement('div');
    container.innerHTML = result;

    const categories = container.querySelectorAll('tbody.category-group');
    expect(categories).toHaveLength(1);
    expect(categories[0].querySelector('.category-row td').textContent.trim()).toBe('Monitoring');
    const cell = categories[0].querySelector('tr:not(.category-row) td');
    expect(cell.textContent).toContain('2x BNC Cable');
    expect(cell.textContent).not.toMatch(/SmallHD/);
  });

  test('falls back to other categories when removing gear by name', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        {
          id: 'rule-fallback',
          label: 'Remove monitor elsewhere',
          scenarios: ['Scenario 1'],
          add: [],
          remove: [
            { id: 'remove-monitor', name: 'SmallHD Cine 13', category: 'Monitoring', quantity: 1 }
          ]
        }
      ])
    );

    env = setupScriptEnvironment();
    const { applyAutoGearRulesToTableHtml } = env.utils;

    const tableHtml = `
      <table class="gear-table">
        <tbody class="category-group">
          <tr class="category-row"><td>Rigging</td></tr>
          <tr>
            <td>
              <span class="gear-item" data-gear-name="SmallHD Cine 13">1x SmallHD Cine 13</span>
            </td>
          </tr>
        </tbody>
      </table>
    `;

    const result = applyAutoGearRulesToTableHtml(tableHtml, { requiredScenarios: 'Scenario 1' });
    const container = document.createElement('div');
    container.innerHTML = result;

    expect(container.querySelectorAll('tbody.category-group')).toHaveLength(1);
    const header = container.querySelector('.category-row td');
    expect(header.textContent.trim()).toBe('Rigging');
    const cell = container.querySelector('tr:not(.category-row) td');
    expect(cell.textContent.trim()).toBe('');
  });

  test('removing from custom auto gear categories cleans up the section', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        {
          id: 'rule-custom',
          label: 'Custom removal',
          scenarios: ['Scenario X'],
          add: [],
          remove: [
            { id: 'remove-custom', name: 'Rain Cover', category: '', quantity: 1 }
          ]
        }
      ])
    );

    env = setupScriptEnvironment();
    const { applyAutoGearRulesToTableHtml } = env.utils;

    const tableHtml = `
      <table class="gear-table">
        <tbody class="category-group auto-gear-category" data-auto-category="">
          <tr class="category-row"><td>Custom Additions</td></tr>
          <tr>
            <td>
              <span class="gear-item" data-gear-name="Rain Cover">1x Rain Cover</span>
            </td>
          </tr>
        </tbody>
      </table>
    `;

    const result = applyAutoGearRulesToTableHtml(tableHtml, { requiredScenarios: 'Scenario X' });
    const container = document.createElement('div');
    container.innerHTML = result;

    expect(container.querySelectorAll('tbody.auto-gear-category').length).toBe(0);
  });

  test('legacy scenario gear additions are disabled once rules exist', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        {
          id: 'rule-slider',
          label: 'Slider',
          scenarios: ['Slider'],
          add: [
            { name: 'Prosup Tango Roller', category: 'Grip', quantity: 1 }
          ],
          remove: []
        }
      ])
    );

    env = setupScriptEnvironment();
    const { generateGearListHtml } = env.utils;

    const info = { requiredScenarios: 'Slider' };
    const html = generateGearListHtml(info);
    const container = document.createElement('div');
    container.innerHTML = html;
    const table = container.querySelector('.gear-table');
    expect(table).not.toBeNull();

    const items = container.querySelectorAll('[data-gear-name="Prosup Tango Roller"]');
    expect(items).toHaveLength(1);
    expect(items[0].classList.contains('auto-gear-item')).toBe(true);
  });
});
