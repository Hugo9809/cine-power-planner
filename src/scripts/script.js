const FULL_BACKUP_HISTORY_KEY = 'cameraPowerPlanner_fullBackupHistory';
const FULL_BACKUP_HISTORY_MAX_ENTRIES = 50;
function computeAutoGearSelectSize(optionCount, baseMinimum = 3) {
  const safeBase = typeof baseMinimum === 'number' && baseMinimum > 0 ? baseMinimum : 3;
  const normalizedCount = typeof optionCount === 'number' && Number.isFinite(optionCount) && optionCount > 0
    ? optionCount
    : 0;
  const expanded = Math.max(normalizedCount, safeBase);
  return Math.max(Math.min(expanded, 12), 8);
}

  autoGearScenariosSelect.size = computeAutoGearSelectSize(selectableOptions.length, 3);
  autoGearMatteboxSelect.size = computeAutoGearSelectSize(selectableOptions.length, 4);
  autoGearCameraHandleSelect.size = computeAutoGearSelectSize(selectableOptions.length, 3);
  autoGearViewfinderExtensionSelect.size = computeAutoGearSelectSize(selectableOptions.length, 2);
  autoGearVideoDistributionSelect.size = computeAutoGearSelectSize(selectableOptions.length, 4);
  autoGearCameraSelect.size = computeAutoGearSelectSize(visibleCount, 3);
  autoGearMonitorSelect.size = computeAutoGearSelectSize(visibleCount, 3);
  autoGearWirelessSelect.size = computeAutoGearSelectSize(visibleCount, 3);
  autoGearMotorsSelect.size = computeAutoGearSelectSize(visibleCount, 3);
  autoGearControllersSelect.size = computeAutoGearSelectSize(visibleCount, 3);
  autoGearDistanceSelect.size = computeAutoGearSelectSize(visibleCount, 3);
  const fullBackupHistory = getFullBackupHistory();
  const fullBackupCount = coerceNonNegativeInteger(fullBackupHistory.total);
    },
    {
      label: langTexts.storageKeyAutoBackups || 'Automatic backups',
      value: formatCountText(lang, langTexts, 'storageAutoBackupsCount', autoBackups),
      description: langTexts.storageKeyAutoBackupsDesc || '',
    },
    {
      label: langTexts.storageKeyFullBackups || 'Full backup downloads',
      value: formatCountText(lang, langTexts, 'storageFullBackupsCount', fullBackupCount),
      description: langTexts.storageKeyFullBackupsDesc || '',
      || fullBackupCount
function createEmptyFullBackupHistory() {
  return {
    total: 0,
    latestAt: null,
    latestFileName: null,
    entries: [],
  };
}

function coerceNonNegativeInteger(value) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value > 0 ? Math.floor(value) : 0;
  }
  if (typeof value === 'string' && value.trim()) {
    const numeric = Number(value);
    if (Number.isFinite(numeric) && !Number.isNaN(numeric)) {
      return numeric > 0 ? Math.floor(numeric) : 0;
    }
  }
  return 0;
}

function normalizeFullBackupEntry(entry) {
  if (!isPlainObjectValue(entry)) {
    return null;
  }
  const createdAt = typeof entry.createdAt === 'string' && entry.createdAt
    ? entry.createdAt
    : null;
  if (!createdAt) {
    return null;
  }
  const normalized = { createdAt, fileName: null };
  if (typeof entry.fileName === 'string' && entry.fileName) {
    normalized.fileName = entry.fileName;
  }
  return normalized;
}

function normalizeFullBackupHistory(rawValue) {
  if (rawValue === null || rawValue === undefined) {
    return createEmptyFullBackupHistory();
  }

  if (typeof rawValue === 'number' || (typeof rawValue === 'string' && rawValue.trim())) {
    const numeric = typeof rawValue === 'number' ? rawValue : Number(rawValue);
    if (Number.isFinite(numeric) && !Number.isNaN(numeric)) {
      const history = createEmptyFullBackupHistory();
      history.total = coerceNonNegativeInteger(numeric);
      return history;
    }
  }

  if (typeof rawValue === 'string') {
    try {
      return normalizeFullBackupHistory(JSON.parse(rawValue));
    } catch (error) {
      void error;
      return createEmptyFullBackupHistory();
    }
  }

  if (!isPlainObjectValue(rawValue)) {
    return createEmptyFullBackupHistory();
  }

  const history = createEmptyFullBackupHistory();
  if (rawValue.total !== undefined) {
    history.total = coerceNonNegativeInteger(rawValue.total);
  }

  if (Array.isArray(rawValue.entries)) {
    const normalizedEntries = rawValue.entries
      .map(normalizeFullBackupEntry)
      .filter(Boolean);
    history.entries = normalizedEntries.length > FULL_BACKUP_HISTORY_MAX_ENTRIES
      ? normalizedEntries.slice(-FULL_BACKUP_HISTORY_MAX_ENTRIES)
      : normalizedEntries;
    const lastEntry = history.entries[history.entries.length - 1] || null;
    if (lastEntry) {
      history.latestAt = lastEntry.createdAt;
      history.latestFileName = lastEntry.fileName || null;
    }
    if (!history.total || history.total < history.entries.length) {
      history.total = history.entries.length;
    }
  }

  if (typeof rawValue.latestAt === 'string' && rawValue.latestAt) {
    history.latestAt = rawValue.latestAt;
  }
  if (typeof rawValue.latestFileName === 'string' && rawValue.latestFileName) {
    history.latestFileName = rawValue.latestFileName;
  }

  history.total = coerceNonNegativeInteger(history.total);
  return history;
}

function getFullBackupHistory(storage = resolveSafeLocalStorage()) {
  if (!storage || typeof storage.getItem !== 'function') {
    return createEmptyFullBackupHistory();
  }
  let raw;
  try {
    raw = storage.getItem(FULL_BACKUP_HISTORY_KEY);
  } catch (error) {
    console.warn('Failed to read full backup history', error);
    return createEmptyFullBackupHistory();
  }
  if (raw === null || raw === undefined || raw === '') {
    return createEmptyFullBackupHistory();
  }
  return normalizeFullBackupHistory(raw);
}

function persistFullBackupHistory(history, storage = resolveSafeLocalStorage()) {
  if (!storage || typeof storage.setItem !== 'function') {
    return false;
  }
  const normalized = normalizeFullBackupHistory(history);
  try {
    storage.setItem(FULL_BACKUP_HISTORY_KEY, JSON.stringify(normalized));
    return true;
  } catch (error) {
    console.warn('Failed to persist full backup history', error);
    return false;
  }
}

function recordFullBackupDownload(isoTimestamp, fileName, storage = resolveSafeLocalStorage()) {
  if (!storage || typeof storage.setItem !== 'function') {
    return;
  }
  const history = typeof storage.getItem === 'function'
    ? getFullBackupHistory(storage)
    : createEmptyFullBackupHistory();
  const createdAt = typeof isoTimestamp === 'string' && isoTimestamp
    ? isoTimestamp
    : new Date().toISOString();
  const normalizedFileName = typeof fileName === 'string' && fileName ? fileName : null;
  const entries = Array.isArray(history.entries) ? history.entries.slice() : [];
  entries.push({ createdAt, fileName: normalizedFileName });
  while (entries.length > FULL_BACKUP_HISTORY_MAX_ENTRIES) {
    entries.shift();
  }
  const updatedTotal = coerceNonNegativeInteger(history.total) + 1;
  const updatedHistory = {
    total: updatedTotal,
    latestAt: createdAt,
    latestFileName: normalizedFileName,
    entries,
  };
  persistFullBackupHistory(updatedHistory, storage);
}

    recordFullBackupDownload(iso, fileName, safeStorage);
    getFullBackupHistory,
    recordFullBackupDownload,
