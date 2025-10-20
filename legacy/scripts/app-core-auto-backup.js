function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var AUTO_BACKUP_NAME_PREFIX = 'auto-backup-';
var AUTO_BACKUP_DELETION_PREFIX = 'auto-backup-before-delete-';
var hasWarnedResolverRequireFailure = false;
var hasWarnedResolverScopeFailure = false;
var hasWarnedLoggerResolverFailure = false;
function collectAutoBackupLoggingScopes() {
  var scopes = [];
  function enqueue(scope) {
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
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
      var required = require('./modules/logging-resolver.js');
      if (required && typeof required.resolveLogger === 'function') {
        return required;
      }
    } catch (resolverRequireError) {
      if (!hasWarnedResolverRequireFailure) {
        hasWarnedResolverRequireFailure = true;
        if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
          try {
            console.warn('[auto-backup] Failed to require logging resolver module', resolverRequireError);
          } catch (consoleWarnError) {
            void consoleWarnError;
          }
        }
      }
    }
  }
  var scopes = collectAutoBackupLoggingScopes();
  for (var index = 0; index < scopes.length; index += 1) {
    var scope = scopes[index];
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      continue;
    }
    try {
      var resolver = scope.cineLoggingResolver;
      if (resolver && typeof resolver.resolveLogger === 'function') {
        return resolver;
      }
    } catch (resolveError) {
      if (!hasWarnedResolverScopeFailure) {
        hasWarnedResolverScopeFailure = true;
        if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
          try {
            console.warn('[auto-backup] Failed to resolve logging resolver from scope', resolveError);
          } catch (consoleWarnError) {
            void consoleWarnError;
          }
        }
      }
    }
  }
  return null;
}
function resolveLegacyAutoBackupLogger() {
  var scopes = collectAutoBackupLoggingScopes();
  for (var index = 0; index < scopes.length; index += 1) {
    var scope = scopes[index];
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      continue;
    }
    try {
      var logging = scope.cineLogging;
      if (logging && typeof logging.createLogger === 'function') {
        try {
          return logging.createLogger('auto-backup', {
            meta: {
              source: 'app-core-auto-backup'
            }
          });
        } catch (creationError) {
          try {
            if (typeof logging.error === 'function') {
              logging.error('Failed to create auto backup logger', creationError, {
                namespace: 'auto-backup-bootstrap'
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
var autoBackupLoggerCache = null;
var deepCloneStrategyWarnings = {
  coreDeepClone: false,
  cineDeepClone: false,
  structuredClone: false,
  jsonClone: false
};
function warnDeepCloneStrategyFailure(strategy, error) {
  if (!strategy || deepCloneStrategyWarnings[strategy]) {
    return;
  }
  deepCloneStrategyWarnings[strategy] = true;
  var messages = {
    coreDeepClone: 'CORE_DEEP_CLONE failed; falling back to runtime deep clone helpers',
    cineDeepClone: '__cineDeepClone failed; falling back to runtime deep clone helpers',
    structuredClone: 'structuredClone failed while deep cloning auto backup data; using JSON fallback',
    jsonClone: 'JSON deep clone failed while preparing auto backup data; returning original value'
  };
  var message = messages[strategy] || 'Deep clone strategy failed; falling back to next option';
  try {
    logAutoBackupEvent('warn', message, error, {
      strategy: strategy
    });
  } catch (loggingError) {
    if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
      try {
        console.warn('[auto-backup] Deep clone warning:', message, error, loggingError);
      } catch (consoleError) {
        void consoleError;
      }
    }
  }
}
function resolveAutoBackupLogger() {
  if (autoBackupLoggerCache) {
    return autoBackupLoggerCache;
  }
  var resolver = resolveAutoBackupLoggingResolver();
  if (resolver && typeof resolver.resolveLogger === 'function') {
    try {
      var logger = resolver.resolveLogger('auto-backup', {
        meta: {
          source: 'app-core-auto-backup'
        }
      });
      if (logger) {
        autoBackupLoggerCache = logger;
        return autoBackupLoggerCache;
      }
    } catch (resolverError) {
      if (!hasWarnedLoggerResolverFailure) {
        hasWarnedLoggerResolverFailure = true;
        if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
          try {
            console.warn('[auto-backup] Failed to create logger via resolver', resolverError);
          } catch (consoleWarnError) {
            void consoleWarnError;
          }
        }
      }
    }
  }
  autoBackupLoggerCache = resolveLegacyAutoBackupLogger();
  return autoBackupLoggerCache;
}
function logAutoBackupEvent(level, message, detail, meta) {
  var normalizedLevel = typeof level === 'string' && level ? level.toLowerCase() : 'info';
  var normalizedMessage = typeof message === 'string' && message ? message : 'Auto backup event';
  var logger = resolveAutoBackupLogger();
  var handled = false;
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
  var fallback = null;
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
      fallback.call(console, "[auto-backup] ".concat(normalizedMessage), detail || null, meta || null);
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
    warnDeepCloneStrategyFailure('coreDeepClone', coreDeepCloneError);
  }
  var scopes = collectAutoBackupLoggingScopes();
  for (var index = 0; index < scopes.length; index += 1) {
    var scope = scopes[index];
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      continue;
    }
    try {
      if (typeof scope.__cineDeepClone === 'function') {
        return scope.__cineDeepClone;
      }
    } catch (scopeError) {
      warnDeepCloneStrategyFailure('cineDeepClone', scopeError);
    }
  }
  return function fallbackDeepClone(value) {
    if (!value || _typeof(value) !== 'object') {
      return value;
    }
    try {
      if (typeof structuredClone === 'function') {
        return structuredClone(value);
      }
    } catch (structuredCloneError) {
      warnDeepCloneStrategyFailure('structuredClone', structuredCloneError);
    }
    try {
      return JSON.parse(JSON.stringify(value));
    } catch (jsonCloneError) {
      warnDeepCloneStrategyFailure('jsonClone', jsonCloneError);
    }
    return value;
  };
}
function cloneProjectEntryForSetup(projectEntry, options) {
  if (!projectEntry || _typeof(projectEntry) !== 'object') {
    return {};
  }
  var _ref = options || {},
    explicitClone = _ref.deepClone,
    log = _ref.log;
  var deepClone = resolveDeepCloneHelper(explicitClone);
  var logger = typeof log === 'function' ? log : logAutoBackupEvent;
  var snapshot = {};
  var projectInfo = projectEntry.projectInfo,
    gearList = projectEntry.gearList,
    autoGearRules = projectEntry.autoGearRules;
  if (projectInfo && _typeof(projectInfo) === 'object') {
    try {
      snapshot.projectInfo = deepClone(projectInfo);
    } catch (error) {
      logger('warn', 'Failed to clone project info for auto backup import', error);
      snapshot.projectInfo = projectInfo;
    }
  }
  if (projectEntry && _typeof(projectEntry.powerSelection) === 'object') {
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
  var metadata = projectEntry && _typeof(projectEntry) === 'object' ? projectEntry.__cineAutoBackupMetadata : null;
  if (metadata && _typeof(metadata) === 'object') {
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
          removedKeys: Array.isArray(metadata.removedKeys) ? metadata.removedKeys.slice() : []
        }
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
  var _ref2 = options || {},
    loadProject = _ref2.loadProject,
    getSetups = _ref2.getSetups,
    storeSetups = _ref2.storeSetups,
    log = _ref2.log,
    cloneProjectEntry = _ref2.cloneProjectEntry,
    _ref2$autoBackupNameP = _ref2.autoBackupNamePrefix,
    autoBackupNamePrefix = _ref2$autoBackupNameP === void 0 ? AUTO_BACKUP_NAME_PREFIX : _ref2$autoBackupNameP,
    _ref2$autoBackupDelet = _ref2.autoBackupDeletionPrefix,
    autoBackupDeletionPrefix = _ref2$autoBackupDelet === void 0 ? AUTO_BACKUP_DELETION_PREFIX : _ref2$autoBackupDelet;
  if (typeof loadProject !== 'function') return false;
  if (typeof getSetups !== 'function' || typeof storeSetups !== 'function') return false;
  var logger = typeof log === 'function' ? log : logAutoBackupEvent;
  var cloneEntry = typeof cloneProjectEntry === 'function' ? cloneProjectEntry : function (entry) {
    return cloneProjectEntryForSetup(entry, {
      log: logger
    });
  };
  var projects;
  try {
    projects = loadProject();
  } catch (error) {
    logger('warn', 'Failed to read projects while syncing auto backups', error);
    return false;
  }
  if (!projects || _typeof(projects) !== 'object') {
    return false;
  }
  var setups = getSetups();
  if (!setups || _typeof(setups) !== 'object') {
    return false;
  }
  var changed = false;
  var importedCount = 0;
  Object.keys(projects).forEach(function (name) {
    if (typeof name !== 'string' || !name) return;
    var isAutoBackup = name.startsWith(autoBackupNamePrefix) || name.startsWith(autoBackupDeletionPrefix);
    if (!isAutoBackup) return;
    if (Object.prototype.hasOwnProperty.call(setups, name)) return;
    var snapshot = cloneEntry(projects[name]);
    setups[name] = snapshot;
    changed = true;
    importedCount += 1;
  });
  if (changed) {
    try {
      storeSetups(setups);
      logger('info', 'Auto backup snapshots imported from project storage', null, {
        importedCount: importedCount
      });
    } catch (error) {
      logger('warn', 'Failed to persist imported auto backups from projects', error);
      return false;
    }
  }
  return changed;
}
var CORE_AUTO_BACKUP = {
  AUTO_BACKUP_NAME_PREFIX: AUTO_BACKUP_NAME_PREFIX,
  AUTO_BACKUP_DELETION_PREFIX: AUTO_BACKUP_DELETION_PREFIX,
  collectAutoBackupLoggingScopes: collectAutoBackupLoggingScopes,
  resolveAutoBackupLoggingResolver: resolveAutoBackupLoggingResolver,
  resolveLegacyAutoBackupLogger: resolveLegacyAutoBackupLogger,
  resolveAutoBackupLogger: resolveAutoBackupLogger,
  logAutoBackupEvent: logAutoBackupEvent,
  cloneProjectEntryForSetup: cloneProjectEntryForSetup,
  ensureAutoBackupsFromProjects: ensureAutoBackupsFromProjects
};
function exposeCoreAutoBackup(namespace) {
  var scopes = collectAutoBackupLoggingScopes();
  for (var index = 0; index < scopes.length; index += 1) {
    var scope = scopes[index];
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      continue;
    }
    try {
      if (!scope.CORE_AUTO_BACKUP || _typeof(scope.CORE_AUTO_BACKUP) !== 'object') {
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