  const requestedIds = typeof tabId === 'string'
    ? tabId.split(/\s+/).filter(Boolean)
    : [];
  let normalizedId = '';
  if (requestedIds.length) {
    normalizedId = requestedIds.find(id => settingsTabButtons.some(button => button.id === id))
      || requestedIds[0];
  }
  let target = settingsTabButtons.find(button => button.id === normalizedId);
    const labelledBy = panel.getAttribute('aria-labelledby') || '';
    const labels = labelledBy.split(/\s+/).filter(Boolean);
    if (labels.includes(target.id)) {
  const fullBackups = projectNames.filter((name) => typeof name === 'string' && name.startsWith('auto-backup-before-delete-')).length;
  const projectNotes = [];
  if (autoBackups > 0) {
    projectNotes.push(formatCountText(lang, langTexts, 'storageAutoBackupsCount', autoBackups));
  }
  if (fullBackups > 0) {
    projectNotes.push(formatCountText(lang, langTexts, 'storageFullBackupsCount', fullBackups));
  }

      extra: projectNotes.length ? projectNotes : null,
