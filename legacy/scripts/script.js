var FULL_BACKUP_HISTORY_KEY = typeof FULL_BACKUP_HISTORY_STORAGE_KEY !== 'undefined' ? FULL_BACKUP_HISTORY_STORAGE_KEY : 'cameraPowerPlanner_fullBackupHistory';
function computeFullBackupCount(history) {
  if (!Array.isArray(history)) return 0;
  return history.reduce(function (count, entry) {
    if (!entry) {
      return count;
    }
    if (typeof entry === 'string') {
      return entry.trim() ? count + 1 : count;
    }
    if (isPlainObjectValue(entry)) {
      var createdAt = typeof entry.createdAt === 'string' ? entry.createdAt.trim() : '';
      var fileName = typeof entry.fileName === 'string' ? entry.fileName.trim() : '';
      return createdAt || fileName ? count + 1 : count;
    }
    return count;
  }, 0);
}
  var fullBackupCount = computeFullBackupCount(data.fullBackupHistory);
  var autoBackupDetail = formatCountText(lang, langTexts, 'storageAutoBackupsCount', autoBackups);
    extra: autoBackupDetail ? [autoBackupDetail] : null
  }, {
    storageKey: FULL_BACKUP_HISTORY_KEY,
    label: langTexts.storageKeyFullBackups || 'Full app backup history',
    value: formatCountText(lang, langTexts, 'storageFullBackupsCount', fullBackupCount),
    description: langTexts.storageKeyFullBackupsDesc || ''
    var hasData = Boolean(totalProjects || gearListCount || deviceSummary.total || favoritesCount || feedbackCount || hasSession || fullBackupCount);
    if (typeof recordFullBackupHistoryEntry === 'function') {
      try {
        recordFullBackupHistoryEntry({
          createdAt: iso,
          fileName: fileName
        });
      } catch (historyError) {
        console.warn('Unable to record full backup history entry', historyError);
      }
    }
