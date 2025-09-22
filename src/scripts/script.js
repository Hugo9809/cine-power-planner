    const labelledBy = panel.getAttribute('aria-labelledby') || '';
    const labelledIds = labelledBy.split(/\s+/).filter(Boolean);
    if (labelledIds.includes(target.id)) {
      const tabRefs = (settingsPanel.getAttribute('aria-labelledby') || '')
        .split(/\s+/)
        .filter(Boolean);
      const targetTabId = tabRefs.find(id => {
        const el = document.getElementById(id);
        return el && el.getAttribute('role') === 'tab';
      }) || tabRefs[0];
      if (targetTabId) {
        activateSettingsTab(targetTabId);
