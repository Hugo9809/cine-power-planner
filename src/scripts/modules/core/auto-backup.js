/**
 * Cine Power Planner Auto Backup Core
 *
 * Pure ESM module for auto-backup logic, logging, and snapshot management.
 * Extracted from app-core-auto-backup.js.
 */

import { detectGlobalScope } from '../helpers/scope-utils.js';

export const AUTO_BACKUP_NAME_PREFIX = 'auto-backup-';
export const AUTO_BACKUP_DELETION_PREFIX = 'auto-backup-before-delete-';

let hasWarnedResolverRequireFailure = false;
let hasWarnedResolverScopeFailure = false;
let hasWarnedLoggerResolverFailure = false;
let autoBackupLoggerCache = null;

const deepCloneStrategyWarnings = {
    coreDeepClone: false,
    cineDeepClone: false,
    structuredClone: false,
    jsonClone: false,
};

export function collectAutoBackupLoggingScopes() {
    const scopes = [];

    function enqueue(scope) {
        if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
            return;
        }
        if (scopes.indexOf(scope) === -1) {
            scopes.push(scope);
        }
    }

    // Try standard global detection
    enqueue(detectGlobalScope());

    // Legacy fallbacks
    try {
        if (typeof CORE_GLOBAL_SCOPE !== 'undefined') enqueue(CORE_GLOBAL_SCOPE);
    } catch (e) { void e; }

    enqueue(typeof globalThis !== 'undefined' ? globalThis : null);
    enqueue(typeof window !== 'undefined' ? window : null);
    enqueue(typeof self !== 'undefined' ? self : null);
    enqueue(typeof global !== 'undefined' ? global : null);

    return scopes;
}

export function resolveAutoBackupLoggingResolver() {
    // In ESM, we prefer dependency injection or global lookup for the resolver
    // rather than CJS require. We can attempt to import it dynamically if needed, 
    // but typically the resolver should be present in the environment/scope.

    // We check scopes for `cineLoggingResolver`
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
            if (!hasWarnedResolverScopeFailure) {
                hasWarnedResolverScopeFailure = true;
                if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
                    try {
                        console.warn('[auto-backup] Failed to resolve logging resolver from scope', resolveError);
                    } catch (e) { void e; }
                }
            }
        }
    }

    return null;
}

export function resolveLegacyAutoBackupLogger() {
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
                    } catch (e) { void e; }
                }
            }
        } catch (e) { void e; }
    }

    return null;
}

export function resolveAutoBackupLogger() {
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
            if (!hasWarnedLoggerResolverFailure) {
                hasWarnedLoggerResolverFailure = true;
                if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
                    try {
                        console.warn('[auto-backup] Failed to create logger via resolver', resolverError);
                    } catch (e) { void e; }
                }
            }
        }
    }

    autoBackupLoggerCache = resolveLegacyAutoBackupLogger();
    return autoBackupLoggerCache;
}

export function logAutoBackupEvent(level, message, detail, meta) {
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
            // Fallback continues below
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
        } catch (e) { void e; }
    }
}

function warnDeepCloneStrategyFailure(strategy, error) {
    if (!strategy || deepCloneStrategyWarnings[strategy]) {
        return;
    }

    deepCloneStrategyWarnings[strategy] = true;

    const messages = {
        coreDeepClone: 'CORE_DEEP_CLONE failed; falling back to runtime deep clone helpers',
        cineDeepClone: '__cineDeepClone failed; falling back to runtime deep clone helpers',
        structuredClone: 'structuredClone failed while deep cloning auto backup data; using JSON fallback',
        jsonClone: 'JSON deep clone failed while preparing auto backup data; returning original value',
    };

    const message = messages[strategy] || 'Deep clone strategy failed; falling back to next option';

    try {
        logAutoBackupEvent('warn', message, error, { strategy });
    } catch (e) {
        if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
            try {
                console.warn('[auto-backup] Deep clone warning:', message, error);
            } catch (ce) { void ce; }
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
            warnDeepCloneStrategyFailure('cineDeepClone', scopeError);
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

export function cloneProjectEntryForSetup(projectEntry, options) {
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

export function ensureAutoBackupsFromProjects(options) {
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

        const projectEntry = projects[name];
        if (!projectEntry || typeof projectEntry !== 'object') {
            logger('warn', 'Skipped auto backup key with missing payload', null, { name });
            return;
        }

        const snapshot = cloneEntry(projectEntry);
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
