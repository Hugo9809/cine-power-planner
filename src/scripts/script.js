  const fallbackHeadingElem = document.getElementById('backupFallbackHeading');
  if (fallbackHeadingElem) {
    const fallbackHeading = texts[lang].backupFallbackHeading
      || texts.en?.backupFallbackHeading
      || fallbackHeadingElem.textContent;
    fallbackHeadingElem.textContent = fallbackHeading;
    const fallbackHelp = texts[lang].backupFallbackHeadingHelp
      || texts.en?.backupFallbackHeadingHelp
      || fallbackHeading;
    if (fallbackHelp) {
      fallbackHeadingElem.setAttribute('data-help', fallbackHelp);
    }
  }
  const fallbackDescriptionElem = document.getElementById('backupFallbackDescription');
  if (fallbackDescriptionElem) {
    const fallbackDescription = texts[lang].backupFallbackDescription
      || texts.en?.backupFallbackDescription
      || '';
    fallbackDescriptionElem.textContent = fallbackDescription;
    if (fallbackDescription) {
      fallbackDescriptionElem.removeAttribute('hidden');
    } else {
      fallbackDescriptionElem.setAttribute('hidden', '');
    }
  }
  const fallbackEmptyElem = document.getElementById('backupFallbackEmpty');
  if (fallbackEmptyElem) {
    const fallbackEmptyText = texts[lang].backupFallbackEmpty
      || texts.en?.backupFallbackEmpty
      || fallbackEmptyElem.textContent;
    fallbackEmptyElem.textContent = fallbackEmptyText;
  }
  refreshBackupFallbackList();
function splitIdList(value) {
  if (typeof value !== 'string') {
    return [];
  }
  return value
    .split(/\s+/)
    .map(id => id.trim())
    .filter(Boolean);
}

  const idCandidates = splitIdList(tabId);
  let target = settingsTabButtons.find(button => idCandidates.includes(button.id));
  if (!target) {
    target = settingsTabButtons.find(button => button.id === tabId);
  }
    const labelledIds = splitIdList(labelledBy);
    if (labelledIds.includes(target.id)) {
const backupFallbackList = document.getElementById('backupFallbackList');
const backupFallbackEmpty = document.getElementById('backupFallbackEmpty');
const BACKUP_FALLBACK_STORAGE_KEY = 'cameraPowerPlanner_backupFallbacks';
const BACKUP_FALLBACK_MAX_ENTRIES = 3;

function readStoredBackupFallbacks(storage) {
  if (!storage || typeof storage.getItem !== 'function') {
    return [];
  }

  let raw = null;
  try {
    raw = storage.getItem(BACKUP_FALLBACK_STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to access stored backup fallback copies', error);
    return [];
  }

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((entry) => {
        if (!entry || typeof entry !== 'object') {
          return null;
        }
        const payload = typeof entry.payload === 'string' ? entry.payload : '';
        if (!payload) {
          return null;
        }
        const fileName = typeof entry.fileName === 'string' && entry.fileName ? entry.fileName : 'Full app backup.json';
        const savedAt = typeof entry.savedAt === 'string' && entry.savedAt ? entry.savedAt : null;
        return { payload, fileName, savedAt };
      })
      .filter(Boolean);
  } catch (error) {
    console.warn('Failed to parse stored backup fallback copies', error);
    return [];
  }
}

function persistBackupFallbackCopy(payload, options = {}) {
  const sanitizedPayload = sanitizeBackupPayload(payload);
  if (!sanitizedPayload) {
    return false;
  }

  const storage = options.storage || resolveSafeLocalStorage();
  if (!storage || typeof storage.setItem !== 'function') {
    return false;
  }

  const entry = {
    payload: sanitizedPayload,
    fileName: typeof options.fileName === 'string' && options.fileName ? options.fileName : 'Full app backup.json',
    savedAt: typeof options.iso === 'string' && options.iso ? options.iso : new Date().toISOString(),
  };

  const existing = readStoredBackupFallbacks(storage)
    .filter(item => item.payload !== sanitizedPayload);
  const next = [entry, ...existing].slice(0, BACKUP_FALLBACK_MAX_ENTRIES);

  try {
    storage.setItem(BACKUP_FALLBACK_STORAGE_KEY, JSON.stringify(next));
    refreshBackupFallbackList(storage);
    return true;
  } catch (error) {
    console.warn('Failed to persist backup fallback copy', error);
    return false;
  }
}

function estimateBackupFallbackSize(payload) {
  if (typeof payload !== 'string' || !payload) {
    return 0;
  }

  if (typeof TextEncoder !== 'undefined') {
    try {
      return new TextEncoder().encode(payload).length;
    } catch (error) {
      void error;
    }
  }

  return payload.length;
}

function removeBackupFallbackCopy(index, options = {}) {
  const storage = options.storage || resolveSafeLocalStorage();
  if (!storage || typeof storage.getItem !== 'function') {
    return false;
  }

  const entries = readStoredBackupFallbacks(storage);
  if (!entries.length) {
    return false;
  }

  const targetIndex = Number(index);
  if (!Number.isInteger(targetIndex) || targetIndex < 0 || targetIndex >= entries.length) {
    return false;
  }

  const next = entries.filter((_, idx) => idx !== targetIndex);

  try {
    if (next.length) {
      storage.setItem(BACKUP_FALLBACK_STORAGE_KEY, JSON.stringify(next));
    } else if (typeof storage.removeItem === 'function') {
      storage.removeItem(BACKUP_FALLBACK_STORAGE_KEY);
    } else {
      storage.setItem(BACKUP_FALLBACK_STORAGE_KEY, JSON.stringify([]));
    }
    refreshBackupFallbackList(storage);
    return true;
  } catch (error) {
    console.warn('Failed to remove backup fallback copy', error);
    return false;
  }
}

function refreshBackupFallbackList(storage = resolveSafeLocalStorage()) {
  if (!backupFallbackList) {
    return [];
  }

  const safeStorage = storage || resolveSafeLocalStorage();
  const entries = readStoredBackupFallbacks(safeStorage);

  const lang = typeof currentLang === 'string' && texts[currentLang]
    ? currentLang
    : 'en';
  const langTexts = texts[lang] || {};
  const fallbackTexts = texts.en || {};

  backupFallbackList.innerHTML = '';

  if (!entries.length) {
    if (backupFallbackEmpty) {
      const emptyMessage = langTexts.backupFallbackEmpty
        || fallbackTexts.backupFallbackEmpty
        || '';
      backupFallbackEmpty.textContent = emptyMessage;
      backupFallbackEmpty.removeAttribute('hidden');
    }
    return entries;
  }

  if (backupFallbackEmpty) {
    backupFallbackEmpty.setAttribute('hidden', '');
  }

  entries.forEach((entry, index) => {
    const item = document.createElement('li');
    item.className = 'backup-fallback-item';

    const name = document.createElement('div');
    name.className = 'backup-fallback-name';
    name.textContent = entry.fileName || 'Full app backup.json';
    item.appendChild(name);

    const meta = document.createElement('div');
    meta.className = 'backup-fallback-meta';

    if (entry.savedAt) {
      const formattedTime = formatAutoGearBackupTime(entry.savedAt) || entry.savedAt;
      if (formattedTime) {
        const savedTemplate = langTexts.backupFallbackSavedAt
          || fallbackTexts.backupFallbackSavedAt
          || '';
        const savedLabel = savedTemplate && savedTemplate.includes('%s')
          ? savedTemplate.replace('%s', formattedTime)
          : savedTemplate
            ? `${savedTemplate} ${formattedTime}`
            : formattedTime;
        if (savedLabel) {
          const savedSpan = document.createElement('span');
          savedSpan.textContent = savedLabel;
          meta.appendChild(savedSpan);
        }
      }
    }

    const approxBytes = estimateBackupFallbackSize(entry.payload);
    if (approxBytes > 0) {
      const sizeText = formatSizeText(lang, langTexts, approxBytes);
      if (sizeText) {
        const sizeTemplate = langTexts.backupFallbackSize
          || fallbackTexts.backupFallbackSize
          || '';
        const sizeLabel = sizeTemplate && sizeTemplate.includes('%s')
          ? sizeTemplate.replace('%s', sizeText)
          : sizeTemplate
            ? `${sizeTemplate} ${sizeText}`
            : sizeText;
        if (sizeLabel) {
          const sizeSpan = document.createElement('span');
          sizeSpan.textContent = sizeLabel;
          meta.appendChild(sizeSpan);
        }
      }
    }

    if (meta.childElementCount) {
      item.appendChild(meta);
    }

    const actions = document.createElement('div');
    actions.className = 'button-row backup-fallback-actions';

    const downloadButton = document.createElement('button');
    downloadButton.type = 'button';
    setButtonLabelWithIcon(
      downloadButton,
      langTexts.backupFallbackDownload
        || fallbackTexts.backupFallbackDownload
        || 'Download backup',
      ICON_GLYPHS.fileExport,
    );
    downloadButton.addEventListener('click', () => {
      const succeeded = downloadBackupPayload(entry.payload, entry.fileName);
      if (typeof showNotification === 'function') {
        const message = succeeded
          ? (langTexts.backupFallbackDownloadSuccess
            || fallbackTexts.backupFallbackDownloadSuccess
            || 'Backup download started.')
          : (langTexts.backupFallbackDownloadFailed
            || fallbackTexts.backupFallbackDownloadFailed
            || 'Could not download the browser-stored backup. Copy the data instead.');
        showNotification(succeeded ? 'success' : 'error', message);
      }
    });
    actions.appendChild(downloadButton);

    const copyButton = document.createElement('button');
    copyButton.type = 'button';
    setButtonLabelWithIcon(
      copyButton,
      langTexts.backupFallbackCopy
        || fallbackTexts.backupFallbackCopy
        || 'Copy backup data',
      ICON_GLYPHS.share,
    );
    copyButton.addEventListener('click', () => {
      copyTextToClipboardBestEffort(entry.payload);
      if (typeof showNotification === 'function') {
        const message = langTexts.backupFallbackCopySuccess
          || fallbackTexts.backupFallbackCopySuccess
          || 'Backup copied to clipboard.';
        showNotification('success', message);
      }
    });
    actions.appendChild(copyButton);

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    setButtonLabelWithIcon(
      removeButton,
      langTexts.backupFallbackRemove
        || fallbackTexts.backupFallbackRemove
        || 'Remove',
      ICON_GLYPHS.trash,
    );
    removeButton.addEventListener('click', () => {
      let confirmed = true;
      const confirmMessage = langTexts.backupFallbackRemoveConfirm
        || fallbackTexts.backupFallbackRemoveConfirm
        || '';
      if (
        confirmMessage &&
        typeof window !== 'undefined' &&
        window &&
        typeof window.confirm === 'function'
      ) {
        try {
          confirmed = window.confirm(confirmMessage);
        } catch (error) {
          void error;
        }
      }

      if (!confirmed) {
        return;
      }

      const removed = removeBackupFallbackCopy(index, { storage: safeStorage });
      if (typeof showNotification === 'function') {
        const message = removed
          ? (langTexts.backupFallbackRemoveSuccess
            || fallbackTexts.backupFallbackRemoveSuccess
            || 'Browser-stored backup removed.')
          : (langTexts.backupFallbackRemoveFailed
            || fallbackTexts.backupFallbackRemoveFailed
            || 'Could not remove the browser-stored backup.');
        showNotification(removed ? 'success' : 'error', message);
      }
      if (!removed) {
        refreshBackupFallbackList(safeStorage);
      }
    });
    actions.appendChild(removeButton);

    item.appendChild(actions);
    backupFallbackList.appendChild(item);
  });

  return entries;
}

  let fallbackStored = false;
  let shouldNotify = Boolean(notify);
  let safeStorage = null;
  let iso = null;
  let fileName = null;

    shouldNotify = isEvent ? true : Boolean(notify);
    ({ iso, fileName } = formatFullBackupFilename(timestamp));
    safeStorage = resolveSafeLocalStorage();
      fallbackStored = persistBackupFallbackCopy(payload, { fileName, iso, storage: safeStorage });
    if (fallbackStored && shouldNotify) {
      const translations = (typeof texts === 'object' && texts) ? texts : {};
      const fallbackTexts = translations.en || {};
      const langKey = typeof currentLang === 'string' && translations[currentLang]
        ? currentLang
        : 'en';
      const langTexts = translations[langKey] || fallbackTexts;
      const fallbackMessage = langTexts.backupFallbackStored
        || fallbackTexts.backupFallbackStored
        || 'Backup saved to this browser because downloads are not available.';
      showNotification('warning', fallbackMessage);
    }
    readStoredBackupFallbacks,
    persistBackupFallbackCopy,
    removeBackupFallbackCopy,
    refreshBackupFallbackList,
