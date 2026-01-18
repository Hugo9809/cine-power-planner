/* global CORE_GLOBAL_SCOPE */

/*
 * Cine Power Planner auto-backup helpers (Shim).
 *
 * MIGRATION NOTE: Logic moved to `src/scripts/modules/core/auto-backup.js`.
 * This file remains as a backwards-compatibility shim to expose
 * globals expected by legacy code.
 */

import {
  AUTO_BACKUP_NAME_PREFIX,
  AUTO_BACKUP_DELETION_PREFIX,
  collectAutoBackupLoggingScopes,
  resolveAutoBackupLoggingResolver,
  resolveLegacyAutoBackupLogger,
  resolveAutoBackupLogger,
  logAutoBackupEvent,
  cloneProjectEntryForSetup,
  ensureAutoBackupsFromProjects
} from '../modules/core/auto-backup.js';

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
