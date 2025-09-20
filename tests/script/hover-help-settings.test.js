const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

describe('hover help accessibility', () => {
  let cleanup;

  const activateHoverHelp = () => {
    const helpButton = document.getElementById('helpButton');
    const hoverHelpButton = document.getElementById('hoverHelpButton');

    expect(helpButton).toBeTruthy();
    expect(hoverHelpButton).toBeTruthy();

    helpButton.click();
    hoverHelpButton.click();

    const tooltip = document.getElementById('hoverHelpTooltip');
    expect(tooltip).toBeTruthy();
    expect(document.body.classList.contains('hover-help-active')).toBe(true);

    return tooltip;
  };

  afterEach(() => {
    if (typeof cleanup === 'function') {
      cleanup();
      cleanup = undefined;
    }
    document.body.classList.remove('hover-help-active');
    document.body.style.cursor = '';
  });

  test('settings dialog opens without exiting hover help', () => {
    const { cleanup: clean } = setupScriptEnvironment();
    cleanup = clean;

    activateHoverHelp();

    const settingsButton = document.getElementById('settingsButton');
    const settingsDialog = document.getElementById('settingsDialog');

    expect(settingsButton).toBeTruthy();
    expect(settingsDialog).toBeTruthy();

    settingsButton.click();

    expect(settingsDialog.hasAttribute('hidden')).toBe(false);
    expect(settingsDialog.hasAttribute('open')).toBe(true);
    expect(document.body.classList.contains('hover-help-active')).toBe(true);
  });

  test('hover help combines data-help and aria-describedby content', () => {
    const { cleanup: clean } = setupScriptEnvironment();
    cleanup = clean;

    const tooltip = activateHoverHelp();

    const description = document.createElement('p');
    description.id = 'testHoverDescription';
    description.textContent = 'Extended description for hover help.';
    document.body.appendChild(description);

    const target = document.createElement('button');
    target.type = 'button';
    target.textContent = 'Hover target';
    target.setAttribute('data-help', 'Primary hover guidance');
    target.setAttribute('aria-describedby', 'testHoverDescription');
    document.body.appendChild(target);

    target.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

    expect(tooltip.hasAttribute('hidden')).toBe(false);
    expect(tooltip.textContent).toContain('Primary hover guidance');
    expect(tooltip.textContent).toContain('Extended description for hover help.');

    target.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));

    expect(tooltip.textContent).toContain('Primary hover guidance');
    expect(tooltip.textContent).toContain('Extended description for hover help.');
  });

  test('Ctrl+, shortcut opens settings while hover help stays active', () => {
    const { cleanup: clean } = setupScriptEnvironment();
    cleanup = clean;

    activateHoverHelp();

    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: ',', ctrlKey: true, bubbles: true })
    );

    const settingsDialog = document.getElementById('settingsDialog');

    expect(settingsDialog.hasAttribute('hidden')).toBe(false);
    expect(settingsDialog.hasAttribute('open')).toBe(true);
    expect(document.body.classList.contains('hover-help-active')).toBe(true);
  });
});
