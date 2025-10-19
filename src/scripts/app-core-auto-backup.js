/* global getCoreGlobalObject, CORE_GLOBAL_SCOPE, CORE_DEEP_CLONE */

/*
 * Cine Power Planner auto-backup helpers.
 *
 * Centralising the auto-backup logging and snapshot helpers keeps the
 * persistence layer resilient while we continue decomposing the monolithic
 * runtime. The functions exposed here intentionally mirror the defensive
 * logic that lived in `app-core-new-1.js` so that autosave, backup, and
 * restore flows remain lossless across online and offline sessions.
 */

const AUTO_BACKUP_NAME_PREFIX = 'auto-backup-';
const AUTO_BACKUP_DELETION_PREFIX = 'auto-backup-before-delete-';

function collectAutoBackupLoggingScopes() {
  const scopes = [];

  function enqueue(scope) {
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      return;
    }
    if (scopes.indexOf(scope) === -1) {
      scopes.push(scope);
    }
  }

  try {
    enqueue(typeof getCoreGlobalObject === 'function' ? getCoreGlobalObject() : null);
  } catch (scopeError) {
    void scopeError;
  }

  try {
    enqueue(typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : null);
  } catch (coreScopeError) {
    void coreScopeError;
  }

  enqueue(typeof globalThis !== 'undefined' ? globalThis : null);
  enqueue(typeof window !== 'undefined' ? window : null);
  enqueue(typeof self !== 'undefined' ? self : null);
  enqueue(typeof global !== 'undefined' ? global : null);

  return scopes;
}

function resolveAutoBackupLoggingResolver() {
  if (typeof require === 'function') {
    try {
      const required = require('./modules/logging-resolver.js');
      if (required && typeof required.resolveLogger === 'function') {
        return required;
      }
    } catch (resolverRequireError) {
      void resolverRequireError;
    }
  }

  const scopes = collectAutoBackupLoggingScopes();
  for (let index = 0; index < scopes.length; index += 1) {
    const scope = scopes[index];
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      continue;
    }

    try {
      const resolver = scope.cineLoggingResolver;
      if (resolver && typeof resolver.resolveLogger === 'function') {
        return resolver;
      }
    } catch (resolveError) {
      void resolveError;
    }
  }

  return null;
}

function resolveLegacyAutoBackupLogger() {
  const scopes = collectAutoBackupLoggingScopes();
  for (let index = 0; index < scopes.length; index += 1) {
    const scope = scopes[index];
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      continue;
    }

    try {
      const logging = scope.cineLogging;
      if (logging && typeof logging.createLogger === 'function') {
        try {
          return logging.createLogger('auto-backup', { meta: { source: 'app-core-auto-backup' } });
        } catch (creationError) {
          try {
            if (typeof logging.error === 'function') {
              logging.error('Failed to create auto backup logger', creationError, {
                namespace: 'auto-backup-bootstrap',
              });
            }
          } catch (logError) {
            void logError;
          }
        }
      }
    } catch (legacyResolveError) {
      void legacyResolveError;
    }
  }

  return null;
}

let autoBackupLoggerCache = null;

function resolveAutoBackupLogger() {
  if (autoBackupLoggerCache) {
    return autoBackupLoggerCache;
  }

  const resolver = resolveAutoBackupLoggingResolver();
  if (resolver && typeof resolver.resolveLogger === 'function') {
    try {
      const logger = resolver.resolveLogger('auto-backup', { meta: { source: 'app-core-auto-backup' } });
      if (logger) {
        autoBackupLoggerCache = logger;
        return autoBackupLoggerCache;
      }
    } catch (resolverError) {
      void resolverError;
    }
  }

  autoBackupLoggerCache = resolveLegacyAutoBackupLogger();
  return autoBackupLoggerCache;
}

function logAutoBackupEvent(level, message, detail, meta) {
  const normalizedLevel = typeof level === 'string' && level ? level.toLowerCase() : 'info';
  const normalizedMessage = typeof message === 'string' && message ? message : 'Auto backup event';
  const logger = resolveAutoBackupLogger();
  let handled = false;

  if (logger && typeof logger[normalizedLevel] === 'function') {
    try {
      logger[normalizedLevel](normalizedMessage, detail, meta);
      handled = true;
    } catch (loggingError) {
      handled = false;
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        try {
          console.warn('Auto backup logger invocation failed', loggingError);
        } catch (consoleLoggingError) {
          void consoleLoggingError;
        }
      }
    }
  }

  if (handled || typeof console === 'undefined' || !console) {
    return;
  }

  let fallback = null;
  if (normalizedLevel === 'error' && typeof console.error === 'function') {
    fallback = console.error;
  } else if (normalizedLevel === 'warn' && typeof console.warn === 'function') {
    fallback = console.warn;
  } else if (normalizedLevel === 'info' && typeof console.info === 'function') {
    fallback = console.info;
  } else if (normalizedLevel === 'debug' && typeof console.debug === 'function') {
    fallback = console.debug;
  } else if (typeof console.log === 'function') {
    fallback = console.log;
  }

  if (typeof fallback === 'function') {
    try {
      fallback.call(console, `[auto-backup] ${normalizedMessage}`, detail || null, meta || null);
    } catch (consoleFallbackError) {
      void consoleFallbackError;
    }
  }
}

function resolveDeepCloneHelper(explicit) {
  if (typeof explicit === 'function') {
    return explicit;
  }

  try {
    if (typeof CORE_DEEP_CLONE === 'function') {
      return CORE_DEEP_CLONE;
    }
  } catch (coreDeepCloneError) {
    void coreDeepCloneError;
  }

  const scopes = collectAutoBackupLoggingScopes();
  for (let index = 0; index < scopes.length; index += 1) {
    const scope = scopes[index];
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      continue;
    }
    try {
      if (typeof scope.__cineDeepClone === 'function') {
        return scope.__cineDeepClone;
      }
    } catch (scopeError) {
      void scopeError;
    }
  }

  return function fallbackDeepClone(value) {
    if (!value || typeof value !== 'object') {
      return value;
    }
    try {
      if (typeof structuredClone === 'function') {
        return structuredClone(value);
      }
    } catch (structuredCloneError) {
      void structuredCloneError;
    }
    try {
      return JSON.parse(JSON.stringify(value));
    } catch (jsonCloneError) {
      void jsonCloneError;
    }
    return value;
  };
}

function cloneProjectEntryForSetup(projectEntry, options) {
  if (!projectEntry || typeof projectEntry !== 'object') {
    return {};
  }

  const { deepClone: explicitClone, log } = options || {};
  const deepClone = resolveDeepCloneHelper(explicitClone);
  const logger = typeof log === 'function' ? log : logAutoBackupEvent;

  const snapshot = {};
  const { projectInfo, gearList, autoGearRules } = projectEntry;

  if (projectInfo && typeof projectInfo === 'object') {
    try {
      snapshot.projectInfo = deepClone(projectInfo);
    } catch (error) {
      logger('warn', 'Failed to clone project info for auto backup import', error);
      snapshot.projectInfo = projectInfo;
    }
  }
  if (projectEntry && typeof projectEntry.powerSelection === 'object') {
    try {
      snapshot.powerSelection = deepClone(projectEntry.powerSelection);
    } catch (error) {
      logger('warn', 'Failed to clone project power selection for auto backup import', error);
      snapshot.powerSelection = projectEntry.powerSelection;
    }
  }

  if (typeof gearList === 'string' && gearList.trim()) {
    snapshot.gearList = gearList;
  }

  if (Array.isArray(autoGearRules) && autoGearRules.length) {
    try {
      snapshot.autoGearRules = deepClone(autoGearRules);
    } catch (error) {
      logger('warn', 'Failed to clone auto gear rules for auto backup import', error);
      snapshot.autoGearRules = autoGearRules.slice();
    }
  }

  const metadata = projectEntry && typeof projectEntry === 'object'
    ? projectEntry.__cineAutoBackupMetadata
    : null;
  if (metadata && typeof metadata === 'object') {
    try {
      Object.defineProperty(snapshot, '__cineAutoBackupMetadata', {
        configurable: true,
        enumerable: false,
        writable: true,
        value: {
          version: typeof metadata.version === 'number' ? metadata.version : 1,
          snapshotType: metadata.snapshotType === 'delta' ? 'delta' : 'full',
          base: typeof metadata.base === 'string' ? metadata.base : null,
          sequence: typeof metadata.sequence === 'number' ? metadata.sequence : 0,
          createdAt: typeof metadata.createdAt === 'string' ? metadata.createdAt : null,
          changedKeys: Array.isArray(metadata.changedKeys) ? metadata.changedKeys.slice() : [],
          removedKeys: Array.isArray(metadata.removedKeys) ? metadata.removedKeys.slice() : [],
        },
      });
    } catch (error) {
      void error;
      try {
        snapshot.__cineAutoBackupMetadata = metadata;
      } catch (assignmentError) {
        void assignmentError;
      }
    }
  }

  return snapshot;
}

function ensureAutoBackupsFromProjects(options) {
  const {
    loadProject,
    getSetups,
    storeSetups,
    log,
    cloneProjectEntry,
    autoBackupNamePrefix = AUTO_BACKUP_NAME_PREFIX,
    autoBackupDeletionPrefix = AUTO_BACKUP_DELETION_PREFIX,
  } = options || {};

  if (typeof loadProject !== 'function') return false;
  if (typeof getSetups !== 'function' || typeof storeSetups !== 'function') return false;

  const logger = typeof log === 'function' ? log : logAutoBackupEvent;
  const cloneEntry = typeof cloneProjectEntry === 'function'
    ? cloneProjectEntry
    : (entry) => cloneProjectEntryForSetup(entry, { log: logger });

  let projects;
  try {
    projects = loadProject();
  } catch (error) {
    logger('warn', 'Failed to read projects while syncing auto backups', error);
    return false;
  }

  if (!projects || typeof projects !== 'object') {
    return false;
  }

  const setups = getSetups();
  if (!setups || typeof setups !== 'object') {
    return false;
  }

  let changed = false;
  let importedCount = 0;

  Object.keys(projects).forEach((name) => {
    if (typeof name !== 'string' || !name) return;
    const isAutoBackup = name.startsWith(autoBackupNamePrefix)
      || name.startsWith(autoBackupDeletionPrefix);
    if (!isAutoBackup) return;
    if (Object.prototype.hasOwnProperty.call(setups, name)) return;

    const snapshot = cloneEntry(projects[name]);
    setups[name] = snapshot;
    changed = true;
    importedCount += 1;
  });

  if (changed) {
    try {
      storeSetups(setups);
      logger('info', 'Auto backup snapshots imported from project storage', null, { importedCount });
    } catch (error) {
      logger('warn', 'Failed to persist imported auto backups from projects', error);
      return false;
    }
  }

  return changed;
}

const CORE_AUTO_BACKUP = {
  AUTO_BACKUP_NAME_PREFIX,
  AUTO_BACKUP_DELETION_PREFIX,
  collectAutoBackupLoggingScopes,
  resolveAutoBackupLoggingResolver,
  resolveLegacyAutoBackupLogger,
  resolveAutoBackupLogger,
  logAutoBackupEvent,
  cloneProjectEntryForSetup,
  ensureAutoBackupsFromProjects,
};

function exposeCoreAutoBackup(namespace) {
  const scopes = collectAutoBackupLoggingScopes();
  for (let index = 0; index < scopes.length; index += 1) {
    const scope = scopes[index];
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      continue;
    }

    try {
      if (!scope.CORE_AUTO_BACKUP || typeof scope.CORE_AUTO_BACKUP !== 'object') {
        scope.CORE_AUTO_BACKUP = namespace;
      } else if (scope.CORE_AUTO_BACKUP !== namespace && typeof Object.assign === 'function') {
        Object.assign(scope.CORE_AUTO_BACKUP, namespace);
      }
    } catch (exposeError) {
      void exposeError;
    }
  }
}

exposeCoreAutoBackup(CORE_AUTO_BACKUP);

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CORE_AUTO_BACKUP;
}
