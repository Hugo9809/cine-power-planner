/* global ensureSharedImportSafetyBackup */
  if (typeof ensureSharedImportSafetyBackup === 'function') {
    var backupOutcome = ensureSharedImportSafetyBackup(storedData);
    if (!backupOutcome || backupOutcome.status !== 'success') {
      return;
    }
  }
