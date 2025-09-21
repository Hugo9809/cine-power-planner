/* global texts, categoryNames, gearItems, loadSessionState, saveSessionState, loadProject, saveProject, deleteProject, renameSetup, registerDevice, loadFavorites, saveFavorites, exportAllData, importAllData, clearAllData, loadAutoGearRules, saveAutoGearRules, loadAutoGearBackups, saveAutoGearBackups, loadAutoGearSeedFlag, saveAutoGearSeedFlag, loadAutoGearPresets, saveAutoGearPresets, loadAutoGearActivePresetId, saveAutoGearActivePresetId, loadAutoGearAutoPresetId, saveAutoGearAutoPresetId, loadAutoGearBackupVisibility, saveAutoGearBackupVisibility, recordFullBackupHistoryEntry, AUTO_GEAR_RULES_STORAGE_KEY, AUTO_GEAR_SEEDED_STORAGE_KEY, AUTO_GEAR_BACKUPS_STORAGE_KEY, AUTO_GEAR_PRESETS_STORAGE_KEY, AUTO_GEAR_ACTIVE_PRESET_STORAGE_KEY, AUTO_GEAR_AUTO_PRESET_STORAGE_KEY, AUTO_GEAR_BACKUP_VISIBILITY_STORAGE_KEY, SAFE_LOCAL_STORAGE, getSafeLocalStorage, CUSTOM_FONT_STORAGE_KEY, CUSTOM_FONT_STORAGE_KEY_NAME */
  const fullBackupHistory = Array.isArray(data.fullBackupHistory) ? data.fullBackupHistory : [];
  const fullBackups = fullBackupHistory.length;
  const backupExtras = [];
  if (autoBackups > 0) {
    backupExtras.push(formatCountText(lang, langTexts, 'storageAutoBackupsCount', autoBackups));
  }
  if (fullBackups > 0) {
    backupExtras.push(formatCountText(lang, langTexts, 'storageFullBackupsCount', fullBackups));
  }

      extra: backupExtras.length ? backupExtras : null,
      || fullBackups
      remainder = remainder.replace(/^[-–—:]+/, '').trim();
    if (typeof recordFullBackupHistoryEntry === 'function') {
      try {
        recordFullBackupHistoryEntry({
          generatedAt: iso,
          fileName,
          source: shouldNotify ? 'manual' : 'automatic',
        });
      } catch (historyError) {
        console.warn('Unable to record full backup history entry', historyError);
      }
    }
