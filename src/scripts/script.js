/* global texts, categoryNames, gearItems, loadSessionState, saveSessionState, loadProject, saveProject, deleteProject, renameSetup, registerDevice, loadFavorites, saveFavorites, exportAllData, importAllData, clearAllData, loadAutoGearRules, saveAutoGearRules, loadAutoGearBackups, saveAutoGearBackups, loadAutoGearSeedFlag, saveAutoGearSeedFlag, loadAutoGearPresets, saveAutoGearPresets, loadAutoGearActivePresetId, saveAutoGearActivePresetId, loadAutoGearAutoPresetId, saveAutoGearAutoPresetId, loadAutoGearBackupVisibility, saveAutoGearBackupVisibility, AUTO_GEAR_RULES_STORAGE_KEY, AUTO_GEAR_SEEDED_STORAGE_KEY, AUTO_GEAR_BACKUPS_STORAGE_KEY, AUTO_GEAR_PRESETS_STORAGE_KEY, AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY, AUTO_GEAR_AUTO_PRESET_STORAGE_KEY, AUTO_GEAR_BACKUP_VISIBILITY_STORAGE_KEY, FULL_BACKUP_HISTORY_STORAGE_KEY, SAFE_LOCAL_STORAGE, getSafeLocalStorage, CUSTOM_FONT_STORAGE_KEY, CUSTOM_FONT_STORAGE_KEY_NAME, recordFullBackupHistoryEntry */
const FULL_BACKUP_HISTORY_KEY =
  typeof FULL_BACKUP_HISTORY_STORAGE_KEY !== 'undefined'
    ? FULL_BACKUP_HISTORY_STORAGE_KEY
    : 'cameraPowerPlanner_fullBackupHistory';
function computeFullBackupCount(history) {
  if (!Array.isArray(history)) return 0;
  return history.reduce((count, entry) => {
    if (!entry) {
      return count;
    }
    if (typeof entry === 'string') {
      return entry.trim() ? count + 1 : count;
    }
    if (isPlainObjectValue(entry)) {
      const createdAt = typeof entry.createdAt === 'string' ? entry.createdAt.trim() : '';
      const fileName = typeof entry.fileName === 'string' ? entry.fileName.trim() : '';
      return createdAt || fileName ? count + 1 : count;
    }
    return count;
  }, 0);
}

  const fullBackupCount = computeFullBackupCount(data.fullBackupHistory);
  const autoBackupDetail = formatCountText(lang, langTexts, 'storageAutoBackupsCount', autoBackups);
      extra: autoBackupDetail ? [autoBackupDetail] : null,
    {
      storageKey: FULL_BACKUP_HISTORY_KEY,
      label: langTexts.storageKeyFullBackups || 'Full app backup history',
      value: formatCountText(lang, langTexts, 'storageFullBackupsCount', fullBackupCount),
      description: langTexts.storageKeyFullBackupsDesc || '',
    },
      || fullBackupCount
    if (typeof recordFullBackupHistoryEntry === 'function') {
      try {
        recordFullBackupHistoryEntry({ createdAt: iso, fileName });
      } catch (historyError) {
        console.warn('Unable to record full backup history entry', historyError);
      }
    }
