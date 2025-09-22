    const labelledIds = typeof labelledBy === 'string' ? labelledBy.split(/\s+/).filter(Boolean) : [];
    if (labelledIds.includes(target.id)) {
  const BOM_CODE = 0xFEFF;
  if (text.length > 0 && text.charCodeAt(0) === BOM_CODE) {
    let startIndex = 0;
    while (startIndex < text.length && text.charCodeAt(startIndex) === BOM_CODE) {
      startIndex += 1;
    }
    return text.slice(startIndex);
      const labelledBy = settingsPanel.getAttribute('aria-labelledby');
      if (labelledBy) {
        const ids = labelledBy.split(/\s+/).filter(Boolean);
        const matchingId = ids.find(id => settingsTabButtons.some(button => button.id === id));
        if (matchingId) {
          activateSettingsTab(matchingId);
        }
