/* global texts, categoryNames, gearItems, loadSessionState, saveSessionState, loadProject, saveProject, deleteProject, renameSetup, registerDevice, loadFavorites, saveFavorites, exportAllData, importAllData, clearAllData, loadAutoGearRules, saveAutoGearRules, loadAutoGearBackups, saveAutoGearBackups, loadAutoGearSeedFlag, saveAutoGearSeedFlag, loadAutoGearPresets, saveAutoGearPresets, loadAutoGearActivePresetId, saveAutoGearActivePresetId, loadAutoGearAutoPresetId, saveAutoGearAutoPresetId, loadAutoGearBackupVisibility, saveAutoGearBackupVisibility, recordFullBackupHistoryEntry, AUTO_GEAR_RULES_STORAGE_KEY, AUTO_GEAR_SEEDED_STORAGE_KEY, AUTO_GEAR_BACKUPS_STORAGE_KEY, AUTO_GEAR_PRESETS_STORAGE_KEY, AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY, AUTO_GEAR_AUTO_PRESET_STORAGE_KEY, AUTO_GEAR_BACKUP_VISIBILITY_STORAGE_KEY, SAFE_LOCAL_STORAGE, getSafeLocalStorage, CUSTOM_FONT_STORAGE_KEY, CUSTOM_FONT_STORAGE_KEY_NAME */
function normalizeFullBackupSummaryEntries(entries) {
  if (!Array.isArray(entries)) return [];
  const normalized = [];
  entries.forEach((entry) => {
    let generatedAt = '';
    let fileName = '';
    if (entry instanceof Date) {
      generatedAt = entry.toISOString();
    } else if (typeof entry === 'number' && Number.isFinite(entry)) {
      const date = new Date(entry);
      if (!Number.isNaN(date.valueOf())) {
        generatedAt = date.toISOString();
      }
    } else if (typeof entry === 'string') {
      const trimmed = entry.trim();
      if (trimmed) {
        if (/\.json$/i.test(trimmed) && trimmed.length > 5) {
          fileName = trimmed;
        } else {
          generatedAt = trimmed;
        }
      }
    } else if (isPlainObjectValue(entry)) {
      const rawGenerated = entry.generatedAt || entry.createdAt || entry.timestamp;
      if (rawGenerated instanceof Date) {
        generatedAt = rawGenerated.toISOString();
      } else if (typeof rawGenerated === 'number' && Number.isFinite(rawGenerated)) {
        const date = new Date(rawGenerated);
        if (!Number.isNaN(date.valueOf())) {
          generatedAt = date.toISOString();
        }
      } else if (typeof rawGenerated === 'string' && rawGenerated.trim()) {
        generatedAt = rawGenerated.trim();
      }

      const rawFileName = entry.fileName || entry.filename || entry.name;
      if (typeof rawFileName === 'string' && rawFileName.trim()) {
        fileName = rawFileName.trim();
      }
    }

    if (generatedAt || fileName) {
      normalized.push({ generatedAt, fileName });
    }
  });
  return normalized;
}

function formatSummaryTimestamp(isoString) {
  if (typeof isoString !== 'string' || !isoString) {
    return '';
  }
  const date = new Date(isoString);
  if (Number.isNaN(date.valueOf())) {
    return isoString;
  }
  const lang = resolveLanguageCode(currentLang);
  if (typeof Intl !== 'undefined' && typeof Intl.DateTimeFormat === 'function') {
    try {
      return new Intl.DateTimeFormat(lang, { dateStyle: 'medium', timeStyle: 'short' }).format(date);
    } catch (error) {
      console.warn('Failed to format summary timestamp', error);
    }
  }
  if (typeof date.toLocaleString === 'function') {
    try {
      return date.toLocaleString();
    } catch (error) {
      console.warn('Failed to format summary timestamp via toLocaleString', error);
    }
  }
  return date.toISOString();
}

  const fullBackupHistory = normalizeFullBackupSummaryEntries(data.fullBackups);
  const fullBackupCount = fullBackupHistory.length;
  const latestFullBackup = fullBackupHistory.length ? fullBackupHistory[0] : null;
  const autoBackupsExtraText = autoBackups > 0
    ? formatCountText(lang, langTexts, 'storageAutoBackupsCount', autoBackups)
    : null;
  const autoBackupsTotalText = formatCountText(lang, langTexts, 'storageAutoBackupsTotal', autoBackups);
  const fullBackupsCountText = formatCountText(lang, langTexts, 'storageFullBackupsCount', fullBackupCount);
  const storageTabSummaryAutoTemplate =
    langTexts.storageTabSummaryAuto
    || texts.en?.storageTabSummaryAuto
    || '%s';
  const storageTabSummaryFullTemplate =
    langTexts.storageTabSummaryFull
    || texts.en?.storageTabSummaryFull
    || '%s';
  const autoBackupsSummary = formatWithPlaceholders(
    storageTabSummaryAutoTemplate,
    autoBackupsTotalText
  );
  const fullBackupsSummary = formatWithPlaceholders(
    storageTabSummaryFullTemplate,
    fullBackupsCountText
  );
  const tabSummaryParts = [autoBackupsSummary, fullBackupsSummary]
    .map((part) => (typeof part === 'string' ? part.trim() : ''))
    .filter(Boolean);
  if (settingsTabData) {
    if (tabSummaryParts.length) {
      const fallbackSummary = tabSummaryParts.join(' • ');
      const storageTabSummaryTemplate =
        langTexts.storageTabSummary
        || texts.en?.storageTabSummary
        || '%s • %s';
      let summaryText = formatWithPlaceholders(
        storageTabSummaryTemplate,
        ...tabSummaryParts
      );
      if (
        typeof summaryText !== 'string'
        || summaryText.includes('%s')
        || tabSummaryParts.some((part) => part && !summaryText.includes(part))
      ) {
        summaryText = fallbackSummary;
      }
      const trimmedSummary = summaryText.trim();
      if (trimmedSummary) {
        settingsTabData.setAttribute('data-summary', trimmedSummary);
        const caption = settingsTabData.querySelector?.('.settings-tab-caption');
        if (caption) {
          caption.textContent = trimmedSummary;
          caption.removeAttribute('hidden');
        }
      } else {
        settingsTabData.removeAttribute('data-summary');
        const caption = settingsTabData.querySelector?.('.settings-tab-caption');
        if (caption) {
          caption.setAttribute('hidden', '');
        }
      }
    } else {
      settingsTabData.removeAttribute('data-summary');
      const caption = settingsTabData.querySelector?.('.settings-tab-caption');
      if (caption) {
        caption.setAttribute('hidden', '');
      }
    }
  }
      extra: autoBackupsExtraText,
    },
    {
      label: langTexts.storageKeyAutoBackups || 'Automatic project backups',
      value: autoBackupsTotalText,
      description: langTexts.storageKeyAutoBackupsDesc || '',
    {
      storageKey: 'cameraPowerPlanner_fullBackups',
      label: langTexts.storageKeyFullBackups || 'Full app backups',
      value: fullBackupsCountText,
      description: langTexts.storageKeyFullBackupsDesc || '',
      extra: latestFullBackup && latestFullBackup.generatedAt
        ? (langTexts.storageFullBackupsLatest || texts.en?.storageFullBackupsLatest || 'Latest backup: %s')
          .replace('%s', formatSummaryTimestamp(latestFullBackup.generatedAt))
        : null,
    },
      || fullBackupCount
  'fullBackups',
    if (typeof recordFullBackupHistoryEntry === 'function') {
      try {
        recordFullBackupHistoryEntry({ generatedAt: iso, fileName });
      } catch (historyError) {
        console.warn('Failed to update full backup history', historyError);
      }
    }
