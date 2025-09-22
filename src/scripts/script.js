    const labelIds = typeof labelledBy === 'string'
      ? labelledBy.split(/\s+/).filter(Boolean)
      : [];
    if (labelIds.includes(target.id)) {
const BACKUP_STORAGE_KEY_PREFIXES = ['cameraPowerPlanner_', 'cinePowerPlanner_'];
  'schemaCache',
      const labelledBy = settingsPanel.getAttribute('aria-labelledby');
      if (labelledBy) {
        const candidateIds = labelledBy.split(/\s+/).filter(Boolean);
        const matchingTabId = candidateIds.find(id =>
          settingsTabButtons.some(button => button.id === id)
        );
        if (matchingTabId) {
          activateSettingsTab(matchingTabId);
        }
