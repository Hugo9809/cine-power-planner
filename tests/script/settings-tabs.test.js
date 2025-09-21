const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

describe('settings tabs behaviour', () => {
  let cleanup;

  const openSettingsDialog = () => {
    const settingsButton = document.getElementById('settingsButton');
    const settingsDialog = document.getElementById('settingsDialog');

    expect(settingsButton).toBeTruthy();
    expect(settingsDialog).toBeTruthy();

    settingsButton.click();

    expect(settingsDialog.hasAttribute('hidden')).toBe(false);
    expect(settingsDialog.hasAttribute('open')).toBe(true);

    return settingsDialog;
  };

  afterEach(() => {
    if (typeof cleanup === 'function') {
      cleanup();
      cleanup = undefined;
    }
  });

  test('arrow keys switch settings tabs and update focus', () => {
    const { cleanup: clean } = setupScriptEnvironment();
    cleanup = clean;

    openSettingsDialog();

    const generalTab = document.getElementById('settingsTab-general');
    const autoGearTab = document.getElementById('settingsTab-autoGear');
    const generalPanel = document.getElementById('settingsPanel-general');
    const autoGearPanel = document.getElementById('settingsPanel-autoGear');

    expect(generalTab).toBeTruthy();
    expect(autoGearTab).toBeTruthy();

    generalTab.focus();
    generalTab.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
    );

    expect(autoGearTab.getAttribute('aria-selected')).toBe('true');
    expect(document.activeElement).toBe(autoGearTab);
    expect(autoGearPanel.hasAttribute('hidden')).toBe(false);
    expect(generalPanel.hasAttribute('hidden')).toBe(true);
  });

  test('activating a later tab scrolls it into view when overflowing', () => {
    const { cleanup: clean } = setupScriptEnvironment();
    cleanup = clean;

    openSettingsDialog();

    const tablist = document.getElementById('settingsTablist');
    const aboutTab = document.getElementById('settingsTab-about');

    expect(tablist).toBeTruthy();
    expect(aboutTab).toBeTruthy();

    const originalScrollWidth = Object.getOwnPropertyDescriptor(tablist, 'scrollWidth');
    const originalClientWidth = Object.getOwnPropertyDescriptor(tablist, 'clientWidth');

    Object.defineProperty(tablist, 'scrollWidth', { configurable: true, value: 800 });
    Object.defineProperty(tablist, 'clientWidth', { configurable: true, value: 320 });

    const originalScrollIntoView = aboutTab.scrollIntoView;
    aboutTab.scrollIntoView = jest.fn();

    try {
      aboutTab.click();

      expect(aboutTab.getAttribute('aria-selected')).toBe('true');
      expect(aboutTab.scrollIntoView).toHaveBeenCalled();
    } finally {
      if (originalScrollIntoView) {
        aboutTab.scrollIntoView = originalScrollIntoView;
      } else {
        delete aboutTab.scrollIntoView;
      }

      if (originalScrollWidth) {
        Object.defineProperty(tablist, 'scrollWidth', originalScrollWidth);
      } else {
        delete tablist.scrollWidth;
      }
      if (originalClientWidth) {
        Object.defineProperty(tablist, 'clientWidth', originalClientWidth);
      } else {
        delete tablist.clientWidth;
      }
    }
  });

  test('help links reveal backup settings inside the correct tab', () => {
    const { cleanup: clean } = setupScriptEnvironment();
    cleanup = clean;

    const originalRAF = window.requestAnimationFrame;
    window.requestAnimationFrame = callback => {
      if (typeof callback === 'function') {
        callback();
      }
      return 0;
    };

    try {
      const helpButton = document.getElementById('helpButton');
      const helpDialog = document.getElementById('helpDialog');
      const settingsDialog = document.getElementById('settingsDialog');

      expect(helpButton).toBeTruthy();
      expect(helpDialog).toBeTruthy();
      expect(settingsDialog).toBeTruthy();

      helpButton.click();

      expect(helpDialog.hasAttribute('hidden')).toBe(false);
      expect(helpDialog.hasAttribute('open')).toBe(true);

      const backupLink = helpDialog.querySelector('a[data-help-target="#backupSettings"]');
      expect(backupLink).toBeTruthy();

      backupLink.click();

      const backupTab = document.getElementById('settingsTab-backup');
      const backupPanel = document.getElementById('settingsPanel-backup');
      const backupButton = document.getElementById('backupSettings');
      const restoreButton = document.getElementById('restoreSettings');

      expect(settingsDialog.hasAttribute('hidden')).toBe(false);
      expect(backupTab.getAttribute('aria-selected')).toBe('true');
      expect(backupPanel.hasAttribute('hidden')).toBe(false);
      expect(backupPanel.contains(document.activeElement)).toBe(true);
      expect(backupButton?.closest('.settings-panel')?.hasAttribute('hidden')).toBe(
        false
      );
      expect(restoreButton?.closest('.settings-panel')?.hasAttribute('hidden')).toBe(
        false
      );
    } finally {
      if (originalRAF) {
        window.requestAnimationFrame = originalRAF;
      } else {
        delete window.requestAnimationFrame;
      }
    }
  });
});
