  const message = fileName
    ? getBackupDownloadSuccessMessage(fileName)
    : getBackupDownloadFailureMessage();
  showNotification(fileName ? 'success' : 'error', message);
    const successMessage = getLocalizedText('shareLinkCopied') || 'Project file downloaded.';
    shareLinkMessage.textContent = successMessage;
function getBackupDownloadSuccessMessage(fileName) {
  const defaultSuccess = 'Full app backup downloaded.';
  let withNameTemplate = null;
  if (fileName) {
    withNameTemplate = getLocalizedText('backupDownloadSuccessWithName');
    if (withNameTemplate) {
      return formatWithPlaceholders(withNameTemplate, fileName);
    }
  }
  const baseMessage = getLocalizedText('backupDownloadSuccess') || defaultSuccess;
  if (fileName) {
    const normalizedBase = baseMessage.replace(/[\s.!?]+$/, '').trimEnd();
    return `${normalizedBase || baseMessage} (${fileName})`;
  }
  return baseMessage;
}

function getBackupDownloadFailureMessage() {
  return getLocalizedText('backupDownloadFailure') || 'Backup failed.';
}

      showNotification('success', getBackupDownloadSuccessMessage(fileName));
      showNotification('error', getBackupDownloadFailureMessage());
    showNotification('success', getBackupDownloadSuccessMessage(backupFileName));
