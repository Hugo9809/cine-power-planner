const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

describe('rigging accessory spares', () => {
  let env;

  afterEach(() => {
    if (env && typeof env.cleanup === 'function') {
      env.cleanup();
    }
    env = null;
  });

  const generateRiggingCellText = (info = {}) => {
    env = setupScriptEnvironment();
    const { generateGearListHtml } = env.utils;
    const html = generateGearListHtml(info);
    const container = document.createElement('div');
    container.innerHTML = html;
    const riggingGroup = Array.from(container.querySelectorAll('tbody.category-group')).find(group => {
      const header = group.querySelector('.category-row td');
      return header && header.textContent.trim() === 'Rigging';
    });
    if (!riggingGroup) {
      return '';
    }
    const cell = riggingGroup.querySelector('tr:not(.category-row) td');
    return cell ? cell.textContent : '';
  };

  test('steadi rigging includes spare D-Tap cables', () => {
    const text = generateRiggingCellText({ requiredScenarios: 'Trinity' });
    expect(text).toContain('4x D-Tap Extension 50 cm');
    expect(text).toMatch(/4x D-Tap Extension 50 cm\s*\([^)]*2x Steadicam\/Trinity[^)]*\)/);
    expect(text).toMatch(/4x D-Tap Extension 50 cm\s*\([^)]*2x Spare[^)]*\)/);
  });
});
