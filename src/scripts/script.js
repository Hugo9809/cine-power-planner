
const GLOBAL_SCOPE = typeof globalThis !== 'undefined'
  ? globalThis
  : (typeof window !== 'undefined'
    ? window
    : (typeof global !== 'undefined'
      ? global
      : {}));
const INTERVAL_REGISTRY_KEY = '__cameraPowerPlannerIntervals';
const WARN_ONCE_REGISTRY_KEY = '__cameraPowerPlannerWarnedMessages';
const GLOBAL_LISTENER_REGISTRY_KEY = '__cameraPowerPlannerListeners';
const MEDIA_QUERY_LISTENER_REGISTRY_KEY = '__cameraPowerPlannerMediaQueryListeners';
const GLOBAL_CLEANUP_KEY = '__cameraPowerPlannerGlobalCleanup';
const GLOBAL_CLEANUP_TASKS_KEY = '__cameraPowerPlannerCleanupTasks';
const DIAGRAM_CLEANUP_KEY = '__cameraPowerPlannerDiagramCleanup';
let backupDownloadSupported = null;

const previousGlobalCleanup = typeof GLOBAL_SCOPE[GLOBAL_CLEANUP_KEY] === 'function'
  ? GLOBAL_SCOPE[GLOBAL_CLEANUP_KEY]
  : null;
if (previousGlobalCleanup) {
  try {
    previousGlobalCleanup();
  } catch (cleanupError) {
    void cleanupError;
  }
  try {
    GLOBAL_SCOPE[GLOBAL_CLEANUP_KEY] = null;
  } catch (resetError) {
    void resetError;
  }
}

function getIntervalRegistry() {
  const existingRegistry = GLOBAL_SCOPE[INTERVAL_REGISTRY_KEY];
  if (existingRegistry && typeof existingRegistry === 'object') {
    return existingRegistry;
  }

  const registry = {};
  try {
    Object.defineProperty(GLOBAL_SCOPE, INTERVAL_REGISTRY_KEY, {
      value: registry,
      writable: true,
      configurable: true,
      enumerable: false,
    });
  } catch (definitionError) {
    void definitionError;
    GLOBAL_SCOPE[INTERVAL_REGISTRY_KEY] = registry;
  }

  return GLOBAL_SCOPE[INTERVAL_REGISTRY_KEY];
}

function ensureSingletonInterval(name, callback, delay, options = {}) {
  if (typeof setInterval !== 'function' || typeof callback !== 'function') {
    return null;
  }

  const registry = getIntervalRegistry();
  const existingHandle = registry[name];
  if (existingHandle != null && typeof clearInterval === 'function') {
    try {
      clearInterval(existingHandle);
    } catch (clearError) {
      void clearError;
    }
  }

  const handle = setInterval(callback, delay);
  registry[name] = handle;

  const shouldUnref = !options || options.unref !== false;
  if (shouldUnref && handle && typeof handle === 'object' && typeof handle.unref === 'function') {
    try {
      handle.unref();
    } catch (unrefError) {
      void unrefError;
    }
  }

  return handle;
}

function getWarnOnceRegistry() {
  const existingRegistry = GLOBAL_SCOPE[WARN_ONCE_REGISTRY_KEY];
  if (existingRegistry && typeof existingRegistry === 'object' && typeof existingRegistry.has === 'function') {
    return existingRegistry;
  }

  const registry = new Set();
  try {
    Object.defineProperty(GLOBAL_SCOPE, WARN_ONCE_REGISTRY_KEY, {
      value: registry,
      writable: true,
      configurable: true,
      enumerable: false,
    });
  } catch (definitionError) {
    void definitionError;
    GLOBAL_SCOPE[WARN_ONCE_REGISTRY_KEY] = registry;
  }

  return GLOBAL_SCOPE[WARN_ONCE_REGISTRY_KEY];
}

function warnOnce(key, ...args) {
  if (!key) return;
  const registry = getWarnOnceRegistry();
  if (registry.has(key)) {
    return;
  }
  registry.add(key);
  if (typeof console !== 'undefined' && typeof console.warn === 'function') {
    try {
      console.warn(...args);
    } catch (warnError) {
      void warnError;
    }
  }
}

function getGlobalListenerRegistry() {
  const existingRegistry = GLOBAL_SCOPE[GLOBAL_LISTENER_REGISTRY_KEY];
  if (existingRegistry && typeof existingRegistry === 'object') {
    return existingRegistry;
  }

  const registry = {};
  try {
    Object.defineProperty(GLOBAL_SCOPE, GLOBAL_LISTENER_REGISTRY_KEY, {
      value: registry,
      writable: true,
      configurable: true,
      enumerable: false,
    });
  } catch (definitionError) {
    void definitionError;
    GLOBAL_SCOPE[GLOBAL_LISTENER_REGISTRY_KEY] = registry;
  }

  return GLOBAL_SCOPE[GLOBAL_LISTENER_REGISTRY_KEY];
}

function attachGlobalListener(key, target, type, handler, options) {
  if (!key || !target || typeof target.addEventListener !== 'function' || typeof handler !== 'function') {
    return;
  }
  const registry = getGlobalListenerRegistry();
  const existing = registry[key];
  if (existing && existing.target && typeof existing.target.removeEventListener === 'function') {
    try {
      existing.target.removeEventListener(existing.type, existing.handler, existing.options);
    } catch (removeError) {
      void removeError;
    }
  }
  try {
    target.addEventListener(type, handler, options);
    registry[key] = { target, type, handler, options };
  } catch (addError) {
    void addError;
  }
}

function getMediaQueryListenerRegistry() {
  const existingRegistry = GLOBAL_SCOPE[MEDIA_QUERY_LISTENER_REGISTRY_KEY];
  if (existingRegistry && typeof existingRegistry === 'object') {
    return existingRegistry;
  }

  const registry = {};
  try {
    Object.defineProperty(GLOBAL_SCOPE, MEDIA_QUERY_LISTENER_REGISTRY_KEY, {
      value: registry,
      writable: true,
      configurable: true,
      enumerable: false,
    });
  } catch (definitionError) {
    void definitionError;
    GLOBAL_SCOPE[MEDIA_QUERY_LISTENER_REGISTRY_KEY] = registry;
  }

  return GLOBAL_SCOPE[MEDIA_QUERY_LISTENER_REGISTRY_KEY];
}

function attachMediaQueryListener(key, mediaQueryList, handler) {
  if (!key || !mediaQueryList || typeof handler !== 'function') {
    return;
  }

  const registry = getMediaQueryListenerRegistry();
  const existing = registry[key];
  if (existing && existing.target) {
    const { target, handler: existingHandler, mode } = existing;
    try {
      if (mode === 'event' && typeof target.removeEventListener === 'function') {
        target.removeEventListener('change', existingHandler);
      } else if (mode === 'listener' && typeof target.removeListener === 'function') {
        target.removeListener(existingHandler);
      }
    } catch (removeError) {
      void removeError;
    }
  }

  if (typeof mediaQueryList.addEventListener === 'function') {
    try {
      mediaQueryList.addEventListener('change', handler);
      registry[key] = { target: mediaQueryList, handler, mode: 'event' };
      return;
    } catch (addError) {
      void addError;
    }
  }

  if (typeof mediaQueryList.addListener === 'function') {
    try {
      mediaQueryList.addListener(handler);
      registry[key] = { target: mediaQueryList, handler, mode: 'listener' };
    } catch (listenerError) {
      void listenerError;
    }
  }
}

function getCleanupTasks() {
  let tasks = GLOBAL_SCOPE[GLOBAL_CLEANUP_TASKS_KEY];
  if (Array.isArray(tasks)) {
    return tasks;
  }

  tasks = [];
  try {
    Object.defineProperty(GLOBAL_SCOPE, GLOBAL_CLEANUP_TASKS_KEY, {
      value: tasks,
      configurable: true,
      writable: true,
      enumerable: false,
    });
  } catch (definitionError) {
    void definitionError;
    GLOBAL_SCOPE[GLOBAL_CLEANUP_TASKS_KEY] = tasks;
  }

  return tasks;
}

function registerCleanupTask(task) {
  if (typeof task !== 'function') {
    return;
  }
  const tasks = getCleanupTasks();
  tasks.push(task);
}

function installGlobalCleanup() {
  const cleanup = () => {
    const intervalRegistry = GLOBAL_SCOPE[INTERVAL_REGISTRY_KEY];
    if (intervalRegistry && typeof intervalRegistry === 'object') {
      for (const key of Object.keys(intervalRegistry)) {
        const handle = intervalRegistry[key];
        if (handle != null && typeof clearInterval === 'function') {
          try {
            clearInterval(handle);
          } catch (clearError) {
            void clearError;
          }
        }
        delete intervalRegistry[key];
      }
      try {
        GLOBAL_SCOPE[INTERVAL_REGISTRY_KEY] = {};
      } catch (intervalResetError) {
        void intervalResetError;
      }
    }

    const listenerRegistry = GLOBAL_SCOPE[GLOBAL_LISTENER_REGISTRY_KEY];
    if (listenerRegistry && typeof listenerRegistry === 'object') {
      for (const key of Object.keys(listenerRegistry)) {
        const entry = listenerRegistry[key];
        if (!entry) continue;
        const { target, type, handler, options } = entry;
        if (target && typeof target.removeEventListener === 'function' && handler) {
          try {
            target.removeEventListener(type, handler, options);
          } catch (removeError) {
            void removeError;
          }
        }
        delete listenerRegistry[key];
      }
      try {
        GLOBAL_SCOPE[GLOBAL_LISTENER_REGISTRY_KEY] = {};
      } catch (listenerResetError) {
        void listenerResetError;
      }
    }

    const mediaRegistry = GLOBAL_SCOPE[MEDIA_QUERY_LISTENER_REGISTRY_KEY];
    if (mediaRegistry && typeof mediaRegistry === 'object') {
      for (const key of Object.keys(mediaRegistry)) {
        const entry = mediaRegistry[key];
        if (!entry) continue;
        const { target, handler, mode } = entry;
        try {
          if (mode === 'event' && target && typeof target.removeEventListener === 'function') {
            target.removeEventListener('change', handler);
          } else if (mode === 'listener' && target && typeof target.removeListener === 'function') {
            target.removeListener(handler);
          }
        } catch (mediaError) {
          void mediaError;
        }
        delete mediaRegistry[key];
      }
      try {
        GLOBAL_SCOPE[MEDIA_QUERY_LISTENER_REGISTRY_KEY] = {};
      } catch (mediaResetError) {
        void mediaResetError;
      }
    }

    if (typeof GLOBAL_SCOPE[DIAGRAM_CLEANUP_KEY] === 'function') {
      try {
        GLOBAL_SCOPE[DIAGRAM_CLEANUP_KEY]();
      } catch (diagramCleanupError) {
        void diagramCleanupError;
      }
      GLOBAL_SCOPE[DIAGRAM_CLEANUP_KEY] = null;
    }

    const warnRegistry = GLOBAL_SCOPE[WARN_ONCE_REGISTRY_KEY];
    if (warnRegistry && typeof warnRegistry.clear === 'function') {
      try {
        warnRegistry.clear();
      } catch (warnResetError) {
        void warnResetError;
      }
    }

    if (typeof window !== 'undefined') {
      try {
        delete window.defaultDevices;
      } catch (defaultDevicesError) {
        void defaultDevicesError;
      }
      try {
        delete window.texts;
      } catch (textsError) {
        void textsError;
      }
      try {
        delete window.categoryNames;
      } catch (categoryNamesError) {
        void categoryNamesError;
      }
      try {
        delete window.gearItems;
      } catch (gearItemsError) {
        void gearItemsError;
      }
    }

    if (typeof global !== 'undefined') {
      try {
        delete global.splitGearListHtml;
      } catch (splitError) {
        void splitError;
      }
    }

    const cleanupTasks = GLOBAL_SCOPE[GLOBAL_CLEANUP_TASKS_KEY];
    if (Array.isArray(cleanupTasks)) {
      while (cleanupTasks.length) {
        const task = cleanupTasks.pop();
        if (typeof task !== 'function') continue;
        try {
          task();
        } catch (taskError) {
          void taskError;
        }
      }
    }
  };

  try {
    Object.defineProperty(GLOBAL_SCOPE, GLOBAL_CLEANUP_KEY, {
      value: cleanup,
      configurable: true,
      writable: true,
      enumerable: false,
    });
  } catch (definitionError) {
    void definitionError;
    GLOBAL_SCOPE[GLOBAL_CLEANUP_KEY] = cleanup;
  }
}

installGlobalCleanup();
registerCleanupTask(() => {
  autoGearRules = [];
  baseAutoGearRules = [];
  projectScopedAutoGearRules = null;
  autoGearBackups = [];
  autoGearPresets = [];
  activeAutoGearPresetId = null;
  autoGearAutoPresetId = null;
  autoGearBackupsVisible = false;
  factoryAutoGearRulesSnapshot = null;
  factoryAutoGearSeedContext = null;
  autoGearRulesLastBackupSignature = initialAutoGearRulesSignature;
  autoGearRulesLastPersistedSignature = initialAutoGearRulesSignature;
  autoGearRulesDirtySinceBackup = false;
});

const registerServiceWorker = () => {
  try {
  } catch (registrationError) {
    void registrationError;
  }
};

if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  attachGlobalListener('window-load-service-worker', window, 'load', registerServiceWorker);
  if (typeof window !== 'undefined') {
    attachGlobalListener('window-online-indicator', window, 'online', updateOnlineStatus);
    attachGlobalListener('window-offline-indicator', window, 'offline', updateOnlineStatus);
  }
  const handleSideMenuKeydown = event => {
  };
  attachGlobalListener('document-keydown-side-menu', document, 'keydown', handleSideMenuKeydown);
  attachMediaQueryListener('media-query-responsive-controls', mql, relocate);
    attachGlobalListener(
      'document-domcontentloaded-layout',
      document,
      'DOMContentLoaded',
      runLayoutInitialization,
      { once: true }
    );
  attachMediaQueryListener('media-query-pink-mode-reduce-motion', pinkModeReduceMotionQuery, handlePinkModeReduceMotionChange);
    attachGlobalListener(
      'window-resize-settings-tabs',
      window,
      'resize',
      scheduleSettingsTabsOverflowUpdate,
      settingsTabsPassiveOptions,
    );
    attachGlobalListener('window-resize-install-banner', window, 'resize', updateInstallBannerPosition);
    attachGlobalListener('window-appinstalled-install-banner', window, 'appinstalled', updateInstallBannerVisibility);
        attachMediaQueryListener('media-query-install-display-mode', media, handleChange);
const handleGlobalEscapeKey = event => {
};
attachGlobalListener('document-keydown-global-escape', document, 'keydown', handleGlobalEscapeKey);
const previousDiagramCleanup = typeof GLOBAL_SCOPE[DIAGRAM_CLEANUP_KEY] === 'function'
  ? GLOBAL_SCOPE[DIAGRAM_CLEANUP_KEY]
  : null;
if (previousDiagramCleanup) {
  try {
    previousDiagramCleanup();
  } catch (cleanupError) {
    void cleanupError;
  }
  GLOBAL_SCOPE[DIAGRAM_CLEANUP_KEY] = null;
}

    GLOBAL_SCOPE[DIAGRAM_CLEANUP_KEY] = null;
  GLOBAL_SCOPE[DIAGRAM_CLEANUP_KEY] = cleanupDiagramInteractions;

const autoBackupInterval = ensureSingletonInterval(
  'autoBackupInterval',
  autoBackup,
  10 * 60 * 1000,
);
const autoGearBackupInterval = ensureSingletonInterval(
  'autoGearBackupInterval',
  () => {
    if (!autoGearRulesDirtySinceBackup) return;
    createAutoGearBackup();
  },
  AUTO_GEAR_BACKUP_INTERVAL_MS,
);
const hourlyBackupInterval = ensureSingletonInterval(
  'hourlyBackupInterval',
  () => {
    const fileName = createSettingsBackup(false);
    showNotification(
      fileName ? 'success' : 'error',
      fileName ? `Full app backup downloaded (${fileName})` : 'Full app backup failed',
    );
  },
  60 * 60 * 1000,
);
    const handleGearDeleteRequest = () => {
        try {
            deleteCurrentGearList();
        } catch (error) {
            console.warn('Failed to handle gear list deletion request', error);
        }
    };
    attachGlobalListener(
        'document-gearlist-delete-request',
        document,
        'gearlist:delete-requested',
        handleGearDeleteRequest
    );
  const handleVisibilityChange = () => {
  };
  attachGlobalListener('document-visibilitychange-autosave', document, 'visibilitychange', handleVisibilityChange);
    attachGlobalListener(`window-${eventName}-autosave`, window, eventName, flushProjectAutoSaveOnExit);
const NOTIFICATION_TIMER_KEY = '__cameraPowerPlannerNotificationTimer';
const NOTIFICATION_DISMISS_DELAY_MS = 4000;
const MAX_NOTIFICATION_ELEMENTS = 3;

function dismissNotificationElement(element, { preserveContainer = false } = {}) {
  if (!element) return;
  const timerId = element[NOTIFICATION_TIMER_KEY];
  if (timerId !== undefined && typeof clearTimeout === 'function') {
    try {
      clearTimeout(timerId);
    } catch (clearError) {
      void clearError;
    }
  }
  if (timerId !== undefined) {
    try {
      delete element[NOTIFICATION_TIMER_KEY];
    } catch (deleteError) {
      element[NOTIFICATION_TIMER_KEY] = undefined;
      void deleteError;
    }
  }

  const parent = element.parentNode;
  try {
    if (typeof element.remove === 'function') {
      element.remove();
    } else if (parent && typeof parent.removeChild === 'function') {
      parent.removeChild(element);
    }
  } catch (removeError) {
    void removeError;
  }

  if (preserveContainer || !parent) {
    return;
  }

  const hasChildren = parent && parent.children && parent.children.length > 0;
  if (!hasChildren) {
    try {
      if (typeof parent.remove === 'function') {
        parent.remove();
      } else if (parent.parentNode && typeof parent.parentNode.removeChild === 'function') {
        parent.parentNode.removeChild(parent);
      }
    } catch (containerError) {
      void containerError;
    }
  }
}

  while (container.children.length >= MAX_NOTIFICATION_ELEMENTS) {
    const oldest = container.firstElementChild || container.firstChild;
    if (!oldest) break;
    dismissNotificationElement(oldest, { preserveContainer: true });
  }
  if (typeof setTimeout === 'function') {
    const timeoutId = setTimeout(() => {
      dismissNotificationElement(note);
    }, NOTIFICATION_DISMISS_DELAY_MS);
    try {
      note[NOTIFICATION_TIMER_KEY] = timeoutId;
    } catch (assignError) {
      void assignError;
  }
    const warnKey = clickError && clickError.message
      ? `backup-download-trigger:${clickError.message}`
      : 'backup-download-trigger:unknown';
    warnOnce(
      warnKey,
      'Failed to trigger backup download link',
      clickError,
    );
    const warnKey = error && error.message
      ? `backup-data-url-encode:${error.message}`
      : 'backup-data-url-encode:unknown';
    warnOnce(warnKey, 'Failed to encode backup data URL', error);
  if (backupDownloadSupported === false) {
    return false;
  }
      const warnKey = blobError && blobError.message
        ? `backup-blob-create:${blobError.message}`
        : 'backup-blob-create:unknown';
      warnOnce(warnKey, 'Failed to create backup blob', blobError);
        backupDownloadSupported = true;
        const warnKey = msError && msError.message
          ? `backup-ms-save:${msError.message}`
          : 'backup-ms-save:unknown';
        warnOnce(warnKey, 'Saving backup via msSaveOrOpenBlob failed', msError);
        const warnKey = urlError && urlError.message
          ? `backup-object-url:${urlError.message}`
          : 'backup-object-url:unknown';
        warnOnce(warnKey, 'Failed to create backup object URL', urlError);
          const warnKey = revokeError && revokeError.message
            ? `backup-revoke-url:${revokeError.message}`
            : 'backup-revoke-url:unknown';
          warnOnce(warnKey, 'Failed to revoke backup object URL', revokeError);
          backupDownloadSupported = true;
    const triggered = triggerBackupDownload(dataUrl, fileName);
    if (triggered) {
      backupDownloadSupported = true;
    }
    return triggered;
  backupDownloadSupported = false;
    if (backupDownloadSupported === false) {
      throw new Error('No supported download method available');
    }
    const warnKey = e && e.message
      ? `backup-failed:${e.message}`
      : 'backup-failed:unknown';
    warnOnce(warnKey, 'Backup failed', e);
      const warnKey = error && error.message
        ? `restore-failed:${error.message}`
        : 'restore-failed:unknown';
      warnOnce(warnKey, 'Restore failed', error);
                const warnKey = storageError && storageError.message
                  ? `restore-storage-entry:${storageError.message}`
                  : `restore-storage-entry:${k}`;
                warnOnce(warnKey, 'Failed to restore storage entry', k, storageError);
              const warnKey = sessionError && sessionError.message
                ? `restore-session-entry:${sessionError.message}`
                : `restore-session-entry:${key}`;
              warnOnce(warnKey, 'Failed to restore sessionStorage entry', key, sessionError);
            const warnKey = error && error.message
              ? `restore-read-storage:${error.message}`
              : `restore-read-storage:${key}`;
            warnOnce(warnKey, 'Failed to read restored storage key', key, error);
        const warnKey = reason && reason.message
          ? `restore-file-text-fallback:${reason.message}`
          : `restore-file-text-fallback:${String(reason)}`;
        warnOnce(warnKey, 'FileReader unavailable for restore, using file.text()', reason);
        warnOnce('restore-file-text-fallback:generic', 'FileReader unavailable for restore, using file.text()');
        const warnKey = readerError && readerError.message
          ? `restore-filereader-create:${readerError.message}`
          : 'restore-filereader-create:unknown';
        warnOnce(warnKey, 'Failed to create FileReader for restore', readerError);
        const warnKey = error && error.message
          ? `restore-filereader-read:${error.message}`
          : 'restore-filereader-read:unknown';
        warnOnce(warnKey, 'FileReader failed while reading restore file', error);
        const warnKey = readError && readError.message
          ? `restore-filereader-read:${readError.message}`
          : 'restore-filereader-read:unknown';
        warnOnce(warnKey, 'Failed to read restore file', readError);
  const handleHoverHelpMouseOver = e => {
  };
  const handleHoverHelpFocusIn = e => {
  };
  const handleHoverHelpFocusOut = e => {
  };
  const handleHoverHelpMouseDown = e => {
    if (hoverHelpActive && !canInteractDuringHoverHelp(e.target)) {
      e.preventDefault();
    }
  };
  const handleHoverHelpClick = e => {
  };

  attachGlobalListener('document-mouseover-hover-help', document, 'mouseover', handleHoverHelpMouseOver);
  attachGlobalListener('document-focusin-hover-help', document, 'focusin', handleHoverHelpFocusIn);
  attachGlobalListener('document-focusout-hover-help', document, 'focusout', handleHoverHelpFocusOut);
  attachGlobalListener('window-scroll-hover-help', window, 'scroll', refreshTooltipPosition, true);
  attachGlobalListener('window-resize-hover-help', window, 'resize', refreshTooltipPosition);
  attachGlobalListener('document-mousedown-hover-help', document, 'mousedown', handleHoverHelpMouseDown, true);
  attachGlobalListener('document-click-hover-help', document, 'click', handleHoverHelpClick);
  const handleGlobalShortcuts = e => {
  };
  attachGlobalListener('document-keydown-global-shortcuts', document, 'keydown', handleGlobalShortcuts);
  attachGlobalListener(
    'document-domcontentloaded-init',
    document,
    'DOMContentLoaded',
    initApp,
    { once: true }
  );
