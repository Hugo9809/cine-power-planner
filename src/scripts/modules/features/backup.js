/* global cineModuleBase, IOS_PWA_HELP_STORAGE_KEY, getSafeLocalStorage, SAFE_LOCAL_STORAGE,
          getManualDownloadFallbackMessage, getManualDownloadCopyHint */

(function () {
  function detectGlobalScope() {
    if (typeof globalThis !== 'undefined') {
      return globalThis;
    }
    if (typeof window !== 'undefined') {
      return window;
    }
    if (typeof self !== 'undefined') {
      return self;
    }
    if (typeof global !== 'undefined') {
      return global;
    }
    return {};
  }

  const GLOBAL_SCOPE = detectGlobalScope();

  function resolveModuleBase(scope) {
    if (typeof cineModuleBase === 'object' && cineModuleBase) {
      return cineModuleBase;
    }

    if (typeof require === 'function') {
      try {
        const required = require('../base.js');
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }

    if (scope && typeof scope.cineModuleBase === 'object') {
      return scope.cineModuleBase;
    }

    return null;
  }

  const MODULE_BASE = resolveModuleBase(GLOBAL_SCOPE);
  if (!MODULE_BASE) {
    return;
  }

  const freezeDeep = typeof MODULE_BASE.freezeDeep === 'function'
    ? MODULE_BASE.freezeDeep
    : function fallbackFreezeDeep(value) {
      if (!value || typeof value === 'function' || (typeof value !== 'object' && typeof value !== 'function')) {
        return value;
      }

      const seen = new WeakSet();

      function freeze(target) {
        if (!target || (typeof target !== 'object' && typeof target !== 'function')) {
          return target;
        }

        const isFunction = typeof target === 'function';
        if (seen.has(target)) {
          return target;
        }
        seen.add(target);

        // Functions often carry deep prototype chains and links back into the
        // runtime environment. Walking those graphs can trigger V8 assertions
        // (as seen in Jest) and does not improve immutability guarantees for
        // the serialisable data we expose. Freeze the function object itself
        // but do not attempt to descend into its internals.
        if (isFunction) {
          try {
            Object.freeze(target);
          } catch (freezeError) {
            void freezeError;
          }
          return target;
        }

        try {
          const keys = Object.getOwnPropertyNames(target);
          for (let index = 0; index < keys.length; index += 1) {
            const key = keys[index];
            let child;
            try {
              child = target[key];
            } catch (accessError) {
              void accessError;
              child = undefined;
            }
            if (!child || typeof child === 'function' || (typeof child !== 'object' && typeof child !== 'function')) {
              continue;
            }
            freeze(child);
          }
          Object.freeze(target);
        } catch (error) {
          void error;
        }
        return target;
      }

      return freeze(value);
    };

  const exposeGlobal = typeof MODULE_BASE.exposeGlobal === 'function'
    ? function expose(name, value, options) {
      return MODULE_BASE.exposeGlobal(name, value, GLOBAL_SCOPE, options || {});
    }
    : function fallbackExpose(name, value) {
      try {
        GLOBAL_SCOPE[name] = value;
        return true;
      } catch (error) {
        void error;
        return false;
      }
    };

  const moduleRegistry = typeof MODULE_BASE.getModuleRegistry === 'function'
    ? MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE)
    : null;

  const registerOrQueueModule = typeof MODULE_BASE.registerOrQueueModule === 'function'
    ? function register(name, api, options, onError) {
      return MODULE_BASE.registerOrQueueModule(
        name,
        api,
        options,
        onError,
        GLOBAL_SCOPE,
        moduleRegistry,
      );
    }
    : function fallbackRegister() {
      return false;
    };

  const SESSION_AUTO_BACKUP_NAME_PREFIX = 'auto-backup-';
  const SESSION_AUTO_BACKUP_DELETION_PREFIX = 'auto-backup-before-delete-';

  const BACKUP_STORAGE_KEY_PREFIXES = ['cameraPowerPlanner_', 'cinePowerPlanner_'];

  const BACKUP_VAULT_DB_NAME = 'cinePowerPlannerBackupVault';
  const BACKUP_VAULT_STORE_NAME = 'queuedBackups';
  const BACKUP_VAULT_DB_VERSION = 1;
  const BACKUP_VAULT_FALLBACK_STORAGE_KEY = 'cineBackupVaultFallbackRecords';

  let backupVaultDbPromise = null;
  const backupVaultTransientRecords = new Map();
  let fallbackVaultStorageInitialized = false;
  let fallbackVaultStorageReference = null;
  let fallbackVaultStorageType = 'none';
  let fallbackStorageRecordCount = 0;
  let memoryFallbackEntryCount = 0;
  let backupVaultFallbackMode = false;
  let backupVaultFallbackModeDetail = { storageType: 'indexeddb' };

  function setBackupVaultFallbackMode(active, detail) {
    const normalizedDetail = detail && typeof detail === 'object' ? detail : {};
    const storageType = typeof normalizedDetail.storageType === 'string'
      ? normalizedDetail.storageType
      : (active ? (memoryFallbackEntryCount > 0 ? 'memory' : 'fallback') : 'indexeddb');
    const durable = storageType !== 'memory';
    const changed = backupVaultFallbackMode !== Boolean(active)
      || backupVaultFallbackModeDetail.storageType !== storageType;
    backupVaultFallbackMode = Boolean(active);
    backupVaultFallbackModeDetail = { storageType, durable };
    if (changed) {
      dispatchBackupVaultEvent('cineBackupVault:fallbackChanged', {
        active: backupVaultFallbackMode,
        storageType,
        durable,
      });
    }
  }

  function refreshBackupVaultFallbackMode(detail) {
    const active = memoryFallbackEntryCount > 0 || fallbackStorageRecordCount > 0;
    const normalizedDetail = detail && typeof detail === 'object' ? { ...detail } : {};
    if (!active) {
      normalizedDetail.storageType = 'indexeddb';
    } else if (memoryFallbackEntryCount > 0) {
      normalizedDetail.storageType = 'memory';
    } else if (fallbackStorageRecordCount > 0) {
      normalizedDetail.storageType = 'fallback';
    } else if (typeof normalizedDetail.storageType !== 'string') {
      normalizedDetail.storageType = 'indexeddb';
    }
    setBackupVaultFallbackMode(active, normalizedDetail);
  }

  function getBackupVaultFallbackState() {
    return {
      active: backupVaultFallbackMode,
      storageType: backupVaultFallbackModeDetail.storageType,
      durable: backupVaultFallbackModeDetail.durable,
    };
  }

  function isBackupVaultFallbackActive() {
    return backupVaultFallbackMode;
  }

  function createMemoryBackupVault() {
    let entries = [];
    return {
      save(record) {
        entries = entries.filter(entry => entry && entry.id !== record.id);
        entries.push({ ...record });
        entries.sort((a, b) => {
          const aTime = typeof a.createdAtMs === 'number' ? a.createdAtMs : 0;
          const bTime = typeof b.createdAtMs === 'number' ? b.createdAtMs : 0;
          return aTime - bTime;
        });
        memoryFallbackEntryCount = entries.length;
        refreshBackupVaultFallbackMode({ storageType: 'memory' });
        return Promise.resolve({
          id: record.id,
          persisted: true,
          durable: false,
          storageType: 'memory',
        });
      },
      list() {
        return Promise.resolve(entries.map(entry => ({ ...entry })));
      },
      remove(id) {
        entries = entries.filter(entry => entry && entry.id !== id);
        memoryFallbackEntryCount = entries.length;
        refreshBackupVaultFallbackMode(memoryFallbackEntryCount > 0 ? { storageType: 'memory' } : null);
        return Promise.resolve(true);
      },
    };
  }

  const memoryBackupVault = createMemoryBackupVault();

  function resetFallbackVaultStorageReference() {
    fallbackVaultStorageInitialized = false;
    fallbackVaultStorageReference = null;
    fallbackVaultStorageType = 'none';
  }

  function isStorageLike(candidate) {
    if (!candidate || typeof candidate !== 'object') {
      return false;
    }
    return typeof candidate.getItem === 'function' && typeof candidate.setItem === 'function';
  }

  function getBackupVaultFallbackStorage() {
    if (fallbackVaultStorageInitialized && isStorageLike(fallbackVaultStorageReference)) {
      return {
        storage: fallbackVaultStorageReference,
        type: fallbackVaultStorageType,
      };
    }

    const candidates = [
      () => {
        if (typeof getSafeLocalStorage === 'function') {
          try {
            return getSafeLocalStorage();
          } catch (error) {
            console.warn('getSafeLocalStorage threw while resolving backup vault fallback storage', error);
          }
        }
        return null;
      },
      () => {
        if (typeof SAFE_LOCAL_STORAGE !== 'undefined' && SAFE_LOCAL_STORAGE) {
          return SAFE_LOCAL_STORAGE;
        }
        return null;
      },
      () => {
        if (GLOBAL_SCOPE && GLOBAL_SCOPE.sessionStorage) {
          return GLOBAL_SCOPE.sessionStorage;
        }
        return null;
      },
      () => {
        if (typeof sessionStorage !== 'undefined') {
          return sessionStorage;
        }
        return null;
      },
      () => {
        if (GLOBAL_SCOPE && GLOBAL_SCOPE.localStorage) {
          return GLOBAL_SCOPE.localStorage;
        }
        return null;
      },
      () => {
        if (typeof localStorage !== 'undefined') {
          return localStorage;
        }
        return null;
      },
    ];

    for (let index = 0; index < candidates.length; index += 1) {
      const resolver = candidates[index];
      if (typeof resolver !== 'function') {
        continue;
      }
      let storage = null;
      try {
        storage = resolver();
      } catch (resolveError) {
        console.warn('Backup vault fallback storage resolver failed', resolveError);
        storage = null;
      }
      if (!isStorageLike(storage)) {
        continue;
      }
      fallbackVaultStorageInitialized = true;
      fallbackVaultStorageReference = storage;
      fallbackVaultStorageType = index <= 1 ? 'safe-local-storage'
        : (index <= 3 ? 'session-storage' : 'local-storage');
      return {
        storage: fallbackVaultStorageReference,
        type: fallbackVaultStorageType,
      };
    }

    fallbackVaultStorageInitialized = true;
    fallbackVaultStorageReference = null;
    fallbackVaultStorageType = 'none';
    return { storage: null, type: 'none' };
  }

  function readFallbackVaultRecords() {
    const { storage } = getBackupVaultFallbackStorage();
    if (!isStorageLike(storage)) {
      fallbackStorageRecordCount = 0;
      refreshBackupVaultFallbackMode();
      return [];
    }

    let raw = null;
    try {
      raw = storage.getItem(BACKUP_VAULT_FALLBACK_STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to read fallback backup vault storage contents', error);
      resetFallbackVaultStorageReference();
      fallbackStorageRecordCount = 0;
      refreshBackupVaultFallbackMode(memoryFallbackEntryCount > 0 ? { storageType: 'memory' } : null);
      return [];
    }

    if (typeof raw !== 'string' || !raw) {
      fallbackStorageRecordCount = 0;
      refreshBackupVaultFallbackMode();
      return [];
    }

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (parseError) {
      console.warn('Failed to parse fallback backup vault entries', parseError);
      fallbackStorageRecordCount = 0;
      refreshBackupVaultFallbackMode(memoryFallbackEntryCount > 0 ? { storageType: 'memory' } : null);
      return [];
    }

    if (!Array.isArray(parsed)) {
      fallbackStorageRecordCount = 0;
      refreshBackupVaultFallbackMode();
      return [];
    }

    const entries = [];
    for (let index = 0; index < parsed.length; index += 1) {
      const candidate = parsed[index];
      if (!candidate || typeof candidate !== 'object' || typeof candidate.id !== 'string') {
        continue;
      }
      entries.push({ ...candidate });
    }
    fallbackStorageRecordCount = entries.length;
    refreshBackupVaultFallbackMode(entries.length > 0 ? { storageType: 'fallback' } : null);
    return entries;
  }

  function writeFallbackVaultRecords(records) {
    const { storage } = getBackupVaultFallbackStorage();
    if (!isStorageLike(storage)) {
      fallbackStorageRecordCount = 0;
      refreshBackupVaultFallbackMode(memoryFallbackEntryCount > 0 ? { storageType: 'memory' } : null);
      return false;
    }
    const normalized = Array.isArray(records) ? records : [];
    let serialized = '[]';
    try {
      serialized = JSON.stringify(normalized);
    } catch (serializeError) {
      console.warn('Failed to serialize fallback backup vault entries', serializeError);
      return false;
    }
    try {
      storage.setItem(BACKUP_VAULT_FALLBACK_STORAGE_KEY, serialized);
      fallbackStorageRecordCount = normalized.length;
      refreshBackupVaultFallbackMode(normalized.length > 0 ? { storageType: 'fallback' } : null);
      return true;
    } catch (persistError) {
      console.warn('Failed to persist fallback backup vault entries', persistError);
      resetFallbackVaultStorageReference();
      refreshBackupVaultFallbackMode(memoryFallbackEntryCount > 0 ? { storageType: 'memory' } : null);
      return false;
    }
  }

  function persistFallbackVaultRecord(record) {
    const entries = readFallbackVaultRecords();
    const deduped = new Map();
    entries.forEach((entry) => {
      if (!entry || typeof entry !== 'object' || typeof entry.id !== 'string') {
        return;
      }
      deduped.set(entry.id, { ...entry });
    });
    deduped.set(record.id, { ...record });
    const updated = Array.from(deduped.values());
    updated.sort((a, b) => {
      const aTime = typeof a.createdAtMs === 'number' ? a.createdAtMs : 0;
      const bTime = typeof b.createdAtMs === 'number' ? b.createdAtMs : 0;
      return aTime - bTime;
    });

    if (writeFallbackVaultRecords(updated)) {
      return Promise.resolve({
        id: record.id,
        persisted: true,
        durable: true,
        storageType: 'fallback',
      });
    }

    return memoryBackupVault.save(record);
  }

  function removeFallbackVaultRecordEntry(id) {
    if (!id) {
      return Promise.resolve(false);
    }
    const entries = readFallbackVaultRecords();
    if (!entries.length) {
      return Promise.resolve(false);
    }
    const filtered = entries.filter(entry => entry && entry.id !== id);
    if (filtered.length === entries.length) {
      fallbackStorageRecordCount = entries.length;
      refreshBackupVaultFallbackMode(entries.length > 0 ? { storageType: 'fallback' } : null);
      return Promise.resolve(false);
    }
    const persisted = writeFallbackVaultRecords(filtered);
    return Promise.resolve(Boolean(persisted));
  }

  function combineBackupVaultRecordSets(indexedRecords, fallbackRecords, memoryRecords) {
    const deduped = new Map();
    const addRecords = (records, storageType) => {
      if (!Array.isArray(records)) {
        return;
      }
      records.forEach((record) => {
        if (!record || typeof record !== 'object' || typeof record.id !== 'string') {
          return;
        }
        const clone = { ...record, storageType };
        if (storageType !== 'memory') {
          clone.durable = true;
        } else {
          clone.durable = false;
        }
        const existing = deduped.get(clone.id);
        if (!existing) {
          deduped.set(clone.id, clone);
          return;
        }
        const existingTime = typeof existing.createdAtMs === 'number' ? existing.createdAtMs : 0;
        const candidateTime = typeof clone.createdAtMs === 'number' ? clone.createdAtMs : 0;
        if (candidateTime >= existingTime) {
          deduped.set(clone.id, clone);
        }
      });
    };

    addRecords(indexedRecords, 'indexeddb');
    addRecords(fallbackRecords, 'fallback');
    addRecords(memoryRecords, 'memory');

    const entries = Array.from(deduped.values());
    entries.sort((a, b) => {
      const aTime = typeof a.createdAtMs === 'number' ? a.createdAtMs : 0;
      const bTime = typeof b.createdAtMs === 'number' ? b.createdAtMs : 0;
      return aTime - bTime;
    });
    return entries;
  }

  function isIndexedDBAvailable() {
    return typeof indexedDB !== 'undefined' && indexedDB !== null;
  }

  function openBackupVaultDb() {
    if (!isIndexedDBAvailable()) {
      return Promise.resolve(null);
    }
    if (backupVaultDbPromise) {
      return backupVaultDbPromise;
    }
    backupVaultDbPromise = new Promise((resolve) => {
      let resolved = false;
      try {
        const request = indexedDB.open(BACKUP_VAULT_DB_NAME, BACKUP_VAULT_DB_VERSION);
        request.addEventListener('upgradeneeded', (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains(BACKUP_VAULT_STORE_NAME)) {
            const store = db.createObjectStore(BACKUP_VAULT_STORE_NAME, { keyPath: 'id' });
            store.createIndex('createdAtMs', 'createdAtMs', { unique: false });
          }
        });
        request.addEventListener('success', () => {
          const db = request.result;
          resolved = true;
          resolve(db);
        });
        request.addEventListener('error', () => {
          if (!resolved) {
            console.warn('Failed to open backup vault IndexedDB database', request.error);
          }
          resolve(null);
        });
      } catch (openError) {
        console.warn('Unable to open backup vault IndexedDB database', openError);
        resolve(null);
      }
    });
    return backupVaultDbPromise;
  }

  function withBackupVaultStore(mode, executor) {
    return openBackupVaultDb().then((db) => {
      if (!db) {
        return executor(null);
      }
      return new Promise((resolve, reject) => {
        let completed = false;
        try {
          const transaction = db.transaction(BACKUP_VAULT_STORE_NAME, mode);
          const store = transaction.objectStore(BACKUP_VAULT_STORE_NAME);
          const result = executor(store, transaction);
          transaction.addEventListener('complete', () => {
            if (completed) {
              return;
            }
            completed = true;
            resolve(result);
          });
          transaction.addEventListener('error', () => {
            if (completed) {
              return;
            }
            completed = true;
            reject(transaction.error);
          });
        } catch (transactionError) {
          reject(transactionError);
        }
      }).catch((error) => {
        console.warn('Backup vault IndexedDB transaction failed', error);
        return executor(null);
      });
    });
  }

  function ensureVaultRecordMetadata(metadata) {
    const source = metadata && typeof metadata.source === 'string' && metadata.source
      ? metadata.source
      : 'automatic';
    const reason = metadata && typeof metadata.reason === 'string' && metadata.reason
      ? metadata.reason
      : 'unknown';
    const permissionState = metadata && typeof metadata.permissionState === 'string' && metadata.permissionState
      ? metadata.permissionState
      : 'unknown';
    const createdAtIso = metadata && typeof metadata.createdAt === 'string' && metadata.createdAt
      ? metadata.createdAt
      : new Date().toISOString();
    const createdAtMs = metadata && typeof metadata.createdAtMs === 'number' && Number.isFinite(metadata.createdAtMs)
      ? metadata.createdAtMs
      : Date.now();

    return {
      source,
      reason,
      permissionState,
      createdAt: createdAtIso,
      createdAtMs,
    };
  }

  function createBackupVaultRecord(fileName, payload, metadata = {}) {
    const normalizedFileName = typeof fileName === 'string' && fileName ? fileName : 'cine-power-planner-backup.json';
    const recordMetadata = ensureVaultRecordMetadata(metadata);
    const recordId = metadata && typeof metadata.id === 'string' && metadata.id
      ? metadata.id
      : `queued-${recordMetadata.createdAtMs}-${Math.random().toString(16).slice(2, 10)}`;

    return {
      id: recordId,
      fileName: normalizedFileName,
      payload,
      createdAt: recordMetadata.createdAt,
      createdAtMs: recordMetadata.createdAtMs,
      metadata: {
        source: recordMetadata.source,
        reason: recordMetadata.reason,
        permissionState: recordMetadata.permissionState,
      },
    };
  }

  function persistBackupVaultRecord(record) {
    if (!record || typeof record !== 'object' || !record.id) {
      return Promise.resolve(null);
    }
    return withBackupVaultStore('readwrite', (store) => {
      if (!store) {
        return persistFallbackVaultRecord(record);
      }
      return new Promise((resolve, reject) => {
        try {
          const request = store.put(record);
          request.addEventListener('success', () => {
            refreshBackupVaultFallbackMode({ storageType: 'indexeddb' });
            resolve({
              id: record.id,
              persisted: true,
              durable: true,
              storageType: 'indexeddb',
            });
          });
          request.addEventListener('error', () => {
            reject(request.error);
          });
        } catch (putError) {
          reject(putError);
        }
      }).catch((error) => {
        console.warn('Failed to persist backup vault record to IndexedDB', error);
        return persistFallbackVaultRecord(record);
      });
    }).catch((error) => {
      console.warn('Backup vault persistence failed', error);
      return persistFallbackVaultRecord(record);
    });
  }

  function listBackupVaultRecords() {
    const indexedPromise = withBackupVaultStore('readonly', (store) => {
      if (!store) {
        return [];
      }
      return new Promise((resolve, reject) => {
        try {
          const request = store.getAll();
          request.addEventListener('success', () => {
            resolve(Array.isArray(request.result) ? request.result : []);
          });
          request.addEventListener('error', () => {
            reject(request.error);
          });
        } catch (getAllError) {
          reject(getAllError);
        }
      }).catch((error) => {
        console.warn('Failed to read backup vault records from IndexedDB', error);
        return [];
      });
    }).catch((error) => {
      console.warn('Backup vault record enumeration failed', error);
      return [];
    });

    const fallbackPromise = Promise.resolve().then(() => readFallbackVaultRecords()).catch((error) => {
      console.warn('Failed to enumerate fallback backup vault records', error);
      return [];
    });

    const memoryPromise = memoryBackupVault.list().catch(() => []);

    return Promise.all([indexedPromise, fallbackPromise, memoryPromise]).then((results) => {
      const [indexedRecords, fallbackRecords, memoryRecords] = results;
      return combineBackupVaultRecordSets(indexedRecords, fallbackRecords, memoryRecords);
    });
  }

  function removeBackupVaultRecord(id) {
    if (!id) {
      return Promise.resolve(false);
    }
    backupVaultTransientRecords.delete(id);
    const indexedRemoval = withBackupVaultStore('readwrite', (store) => {
      if (!store) {
        return false;
      }
      return new Promise((resolve, reject) => {
        try {
          const request = store.delete(id);
          request.addEventListener('success', () => {
            refreshBackupVaultFallbackMode();
            resolve(true);
          });
          request.addEventListener('error', () => {
            reject(request.error);
          });
        } catch (deleteError) {
          reject(deleteError);
        }
      }).catch((error) => {
        console.warn('Failed to remove backup vault record from IndexedDB', error);
        return false;
      });
    }).catch((error) => {
      console.warn('Backup vault record removal failed', error);
      return false;
    });

    return Promise.all([
      Promise.resolve(indexedRemoval),
      removeFallbackVaultRecordEntry(id),
      memoryBackupVault.remove(id),
    ]).then((results) => {
      const removed = results.some(result => Boolean(result));
      if (!removed) {
        refreshBackupVaultFallbackMode();
      }
      return removed;
    });
  }

  function clearBackupVault() {
    // We want to completely nuke the database to ensure no metadata or version info remains.
    const dbDeletionPromise = new Promise((resolve, reject) => {
      if (!isIndexedDBAvailable()) {
        resolve(true);
        return;
      }

      // Close any open connections first
      if (backupVaultDbPromise) {
        backupVaultDbPromise.then((db) => {
          if (db && typeof db.close === 'function') {
            try {
              db.close();
            } catch (closeError) {
              console.warn('Failed to close backup vault DB before deletion', closeError);
            }
          }
        }).catch(() => { });
        backupVaultDbPromise = null;
      }

      try {
        const request = indexedDB.deleteDatabase(BACKUP_VAULT_DB_NAME);
        request.addEventListener('success', () => {
          resolve(true);
        });
        request.addEventListener('error', () => {
          console.warn('Failed to delete backup vault database', request.error);
          // Fallback to clearing the store if deletion fails (e.g. due to open connections)
          withBackupVaultStore('readwrite', (store) => {
            if (!store) return false;
            return new Promise((clearResolve, clearReject) => {
              const clearRequest = store.clear();
              clearRequest.onsuccess = () => clearResolve(true);
              clearRequest.onerror = () => clearReject(clearRequest.error);
            });
          }).then(resolve).catch(reject);
        });
        request.addEventListener('blocked', () => {
          console.warn('Backup vault database deletion blocked');
          // If blocked, we can't force it easily without reloading, but we can try to clear the store
          // via the fallback path in the error handler, or just resolve false.
          // For now, let's try to resolve true assuming the "blocked" event might eventually succeed 
          // or that the user will reload. But actually, 'blocked' usually means another tab has it open.
          // We'll treat it as a soft failure but try to proceed.
        });
      } catch (deleteError) {
        reject(deleteError);
      }
    });

    return Promise.all([
      dbDeletionPromise,
      writeFallbackVaultRecords([]), // Clear fallback storage
      memoryBackupVault.list().then(list => { // Clear memory vault
        return Promise.all(list.map(item => memoryBackupVault.remove(item.id)));
      })
    ]).then(() => {
      refreshBackupVaultFallbackMode();
      return true;
    }).catch(error => {
      console.warn('clearBackupVault encountered errors', error);
      // Return true anyway to allow factory reset to continue
      return true;
    });
  }

  function dispatchBackupVaultEvent(type, detail) {
    if (!type) {
      return;
    }
    const targets = [];
    if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.dispatchEvent === 'function') {
      targets.push(GLOBAL_SCOPE);
    }
    if (GLOBAL_SCOPE && GLOBAL_SCOPE.document && typeof GLOBAL_SCOPE.document.dispatchEvent === 'function') {
      targets.push(GLOBAL_SCOPE.document);
    }
    if (GLOBAL_SCOPE && GLOBAL_SCOPE.window && typeof GLOBAL_SCOPE.window.dispatchEvent === 'function') {
      targets.push(GLOBAL_SCOPE.window);
    }
    const CustomEventCtor = typeof CustomEvent === 'function' ? CustomEvent : null;
    targets.forEach((target) => {
      if (!target || typeof target.dispatchEvent !== 'function') {
        return;
      }
      try {
        if (CustomEventCtor) {
          target.dispatchEvent(new CustomEvent(type, { detail }));
        } else if (typeof Event === 'function') {
          const event = new Event(type);
          event.detail = detail;
          target.dispatchEvent(event);
        }
      } catch (dispatchError) {
        console.warn('Failed to dispatch backup vault event', dispatchError);
      }
    });
  }

  function getQueuedBackupPayloads() {
    return listBackupVaultRecords().then((records) => {
      const deduped = new Map();
      if (Array.isArray(records)) {
        records.forEach((record) => {
          if (!record || !record.id || deduped.has(record.id)) {
            return;
          }
          deduped.set(record.id, { ...record });
        });
      }
      backupVaultTransientRecords.forEach((record, id) => {
        if (!deduped.has(id)) {
          const clone = { ...record };
          if (typeof clone.storageType !== 'string') {
            clone.storageType = 'transient';
          }
          if (typeof clone.durable !== 'boolean') {
            clone.durable = false;
          }
          deduped.set(id, clone);
        }
      });
      const entries = Array.from(deduped.values());
      entries.sort((a, b) => {
        const aTime = typeof a.createdAtMs === 'number' ? a.createdAtMs : 0;
        const bTime = typeof b.createdAtMs === 'number' ? b.createdAtMs : 0;
        return aTime - bTime;
      });
      return entries;
    });
  }

  function queueBackupPayloadForVault(fileName, payload, metadata) {
    const record = createBackupVaultRecord(fileName, payload, metadata || {});
    backupVaultTransientRecords.set(record.id, { ...record });
    try {
      persistBackupVaultRecord(record).then((result) => {
        backupVaultTransientRecords.delete(record.id);
        if (result && result.durable === false) {
          console.warn('Backup vault record stored using non-durable fallback storage.', result);
        }
      }).catch((error) => {
        console.warn('Failed to persist queued backup payload. Using in-memory vault fallback.', error);
      });
    } catch (persistError) {
      console.warn('Queued backup persistence threw unexpectedly', persistError);
    }
    dispatchBackupVaultEvent('cineBackupVault:queued', {
      id: record.id,
      fileName: record.fileName,
      createdAt: record.createdAt,
      metadata: record.metadata,
    });
    return record;
  }

  function resolveBackupTexts() {
    const textsSource = GLOBAL_SCOPE && typeof GLOBAL_SCOPE.texts === 'object' ? GLOBAL_SCOPE.texts : null;
    const langCandidate = GLOBAL_SCOPE && typeof GLOBAL_SCOPE.currentLang === 'string'
      ? GLOBAL_SCOPE.currentLang
      : (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.appLanguage === 'string' ? GLOBAL_SCOPE.appLanguage : 'en');
    const lang = langCandidate && typeof langCandidate === 'string' ? langCandidate : 'en';
    const langTexts = textsSource && textsSource[lang] ? textsSource[lang] : null;
    const fallbackTexts = textsSource && textsSource.en ? textsSource.en : null;
    return { langTexts, fallbackTexts };
  }

  function resolveQueuedBackupMessage(fileName) {
    const { langTexts, fallbackTexts } = resolveBackupTexts();
    const template = (langTexts && langTexts.queuedBackupDownloadDeferred)
      || (fallbackTexts && fallbackTexts.queuedBackupDownloadDeferred)
      || 'Automatic downloads were blocked. The backup was saved to the local vault.';
    return template.replace('{fileName}', fileName || 'cine-power-planner-backup.json');
  }

  function resolveBackupVaultEmptyMessage() {
    const { langTexts, fallbackTexts } = resolveBackupTexts();
    return (langTexts && langTexts.queuedBackupVaultEmpty)
      || (fallbackTexts && fallbackTexts.queuedBackupVaultEmpty)
      || 'No queued backups are stored in the local vault.';
  }

  function resolveBackupVaultWindowTitle() {
    const { langTexts, fallbackTexts } = resolveBackupTexts();
    return (langTexts && langTexts.queuedBackupVaultTitle)
      || (fallbackTexts && fallbackTexts.queuedBackupVaultTitle)
      || 'Local backup vault';
  }

  function resolveBackupVaultWindowIntro() {
    const { langTexts, fallbackTexts } = resolveBackupTexts();
    return (langTexts && langTexts.queuedBackupVaultIntro)
      || (fallbackTexts && fallbackTexts.queuedBackupVaultIntro)
      || 'Automatic downloads were blocked. Use the actions below to export or copy each backup while offline.';
  }

  function openQueuedBackupVaultWindow() {
    return getQueuedBackupPayloads().then((records) => {
      if (!records || !records.length) {
        const message = resolveBackupVaultEmptyMessage();
        if (typeof GLOBAL_SCOPE.showNotification === 'function') {
          try {
            GLOBAL_SCOPE.showNotification('info', message);
          } catch (notifyError) {
            void notifyError;
          }
        }
        if (typeof alert === 'function') {
          try {
            alert(message);
          } catch (alertError) {
            void alertError;
          }
        }
        return false;
      }

      if (typeof window === 'undefined' || typeof document === 'undefined') {
        console.warn('Cannot open queued backup vault window outside of a browser context');
        return false;
      }

      let vaultWindow = null;
      try {
        vaultWindow = window.open('', 'cineBackupVault', 'noopener,noreferrer,width=780,height=720');
      } catch (openError) {
        console.warn('Failed to open local backup vault window', openError);
        vaultWindow = null;
      }

      if (!vaultWindow) {
        const message = resolveBackupTexts().fallbackTexts
          && resolveBackupTexts().fallbackTexts.queuedBackupVaultPopupBlocked
          ? resolveBackupTexts().fallbackTexts.queuedBackupVaultPopupBlocked
          : 'Enable pop-ups to review queued backups stored in the local vault.';
        if (typeof GLOBAL_SCOPE.showNotification === 'function') {
          try {
            GLOBAL_SCOPE.showNotification('error', message);
          } catch (notifyError) {
            void notifyError;
          }
        }
        if (typeof alert === 'function') {
          try {
            alert(message);
          } catch (alertError) {
            void alertError;
          }
        }
        return false;
      }

      const title = resolveBackupVaultWindowTitle();
      const intro = resolveBackupVaultWindowIntro();
      const serializedRecords = JSON.stringify(records.map((record) => ({
        id: record.id,
        fileName: record.fileName,
        createdAt: record.createdAt,
        createdAtMs: record.createdAtMs,
        metadata: record.metadata,
        payload: record.payload,
      })));
      const escapedSerializedRecords = serializedRecords.replace(/</g, '\\u003c');

      const emptyMessage = resolveBackupVaultEmptyMessage();
      const bootstrapScript = `(() => {\n` +
        `  'use strict';\n` +
        `  try {\n` +
        `    var source = document.getElementById('queued-backups');\n` +
        `    var records = [];\n` +
        `    if (source) {\n` +
        `      var text = source.textContent || '';\n` +
        `      var parsed = JSON.parse(text);\n` +
        `      if (Array.isArray(parsed)) {\n` +
        `        records = parsed;\n` +
        `      }\n` +
        `    }\n` +
        `    var container = document.getElementById('vault');\n` +
        `    if (!container) {\n` +
        `      return;\n` +
        `    }\n` +
        `    if (!records.length) {\n` +
        `      var empty = document.createElement('p');\n` +
        `      empty.className = 'empty';\n` +
        `      empty.textContent = ${JSON.stringify(emptyMessage)};\n` +
        `      container.appendChild(empty);\n` +
        `      return;\n` +
        `    }\n` +
        `    records.forEach(function (record) {\n` +
        `      var entry = document.createElement('section');\n` +
        `      entry.className = 'backup-entry';\n` +
        `      var header = document.createElement('header');\n` +
        `      var heading = document.createElement('h2');\n` +
        `      heading.textContent = String(record.fileName || 'cine-power-planner-backup.json') + ' — ' + String(record.createdAt || '');\n` +
        `      header.appendChild(heading);\n` +
        `      var downloadButton = document.createElement('button');\n` +
        `      downloadButton.type = 'button';\n` +
        `      downloadButton.textContent = 'Download JSON';\n` +
        `      downloadButton.addEventListener('click', function () {\n` +
        `        try {\n` +
        `          var blob = new Blob([record.payload], { type: 'application/json' });\n` +
        `          var url = URL.createObjectURL(blob);\n` +
        `          var link = document.createElement('a');\n` +
        `          link.href = url;\n` +
        `          link.download = record.fileName || 'cine-power-planner-backup.json';\n` +
        `          link.click();\n` +
        `          setTimeout(function () { URL.revokeObjectURL(url); }, 0);\n` +
        `        } catch (error) {\n` +
        `          alert('Download blocked — copy the JSON below instead.');\n` +
        `        }\n` +
        `      });\n` +
        `      header.appendChild(downloadButton);\n` +
        `      entry.appendChild(header);\n` +
        `      var textArea = document.createElement('textarea');\n` +
        `      textArea.readOnly = true;\n` +
        `      textArea.value = record.payload;\n` +
        `      entry.appendChild(textArea);\n` +
        `      container.appendChild(entry);\n` +
        `    });\n` +
        `  } catch (error) {\n` +
        `    console.error('Failed to bootstrap queued backup vault', error);\n` +
        `  }\n` +
        `})();`;
      const bootstrapScriptSrc = `data:text/javascript;charset=utf-8,${encodeURIComponent(bootstrapScript)}`;

      const popupBlockedMessage = resolveBackupTexts().fallbackTexts
        && resolveBackupTexts().fallbackTexts.queuedBackupVaultPopupBlocked
        ? resolveBackupTexts().fallbackTexts.queuedBackupVaultPopupBlocked
        : 'Enable pop-ups to review queued backups stored in the local vault.';

      const doc = vaultWindow.document;
      try {
        doc.open();
        doc.write(`<!DOCTYPE html><html lang="en"><head><meta charset="utf-8" />\n` +
          `<title>${title}</title>\n` +
          `<style>\n` +
          `:root { color-scheme: light dark; font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif; }\n` +
          `body { margin: 0; padding: 1.5rem; background: #0f1624; color: #f5f7fb; }\n` +
          `h1 { margin-top: 0; font-size: 1.5rem; }\n` +
          `p { line-height: 1.6; max-width: 38rem; }\n` +
          `.backup-entry { background: rgba(15, 22, 36, 0.65); border: 1px solid rgba(111, 120, 141, 0.35); border-radius: 1rem; padding: 1rem; margin-top: 1rem; }\n` +
          `.backup-entry header { display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: baseline; justify-content: space-between; }\n` +
          `.backup-entry h2 { font-size: 1rem; margin: 0; }\n` +
          `.backup-entry button { background: #ffbf3c; border: none; border-radius: 999px; padding: 0.5rem 1.25rem; font-weight: 600; cursor: pointer; color: #11131a; }\n` +
          `.backup-entry button:focus { outline: 2px solid #ffffff; outline-offset: 2px; }\n` +
          `.backup-entry textarea { width: 100%; min-height: 10rem; margin-top: 0.75rem; border-radius: 0.75rem; border: 1px solid rgba(255, 255, 255, 0.12); padding: 0.75rem; background: rgba(6, 10, 18, 0.92); color: #f5f7fb; font-family: 'Fira Code', 'SFMono-Regular', 'Consolas', 'Menlo', monospace; }\n` +
          `.empty { margin-top: 2rem; font-style: italic; color: rgba(245, 247, 251, 0.7); }\n` +
          `.banner { margin-bottom: 1.5rem; padding: 1rem 1.25rem; border-radius: 1rem; background: rgba(255, 191, 60, 0.18); border: 1px solid rgba(255, 191, 60, 0.4); color: #ffe3a4; }\n` +
          `.banner strong { display: block; font-size: 1.1rem; margin-bottom: 0.35rem; }\n` +
          `</style>\n` +
          `</head><body>\n` +
          `<div class="banner"><strong>${title}</strong><p>${intro}</p></div>\n` +
          `<main id="vault"></main>\n` +
          `<script type="application/json" id="queued-backups">${escapedSerializedRecords}</script>\n` +
          `<script src="${bootstrapScriptSrc}"></script>\n` +
          `</body></html>`);
        doc.close();
      } catch (renderError) {
        console.warn('Failed to render queued backup vault window', renderError);
        try {
          doc.close();
        } catch (closeError) {
          void closeError;
        }
        vaultWindow.close();
        if (typeof GLOBAL_SCOPE.showNotification === 'function') {
          try {
            GLOBAL_SCOPE.showNotification('error', popupBlockedMessage);
          } catch (notifyError) {
            void notifyError;
          }
        }
        return false;
      }

      return true;
    });
  }

  const BACKUP_STORAGE_KNOWN_KEYS = new Set([
    'darkMode',
    'pinkMode',
    'highContrast',
    'showAutoBackups',
    'accentColor',
    'fontSize',
    'fontFamily',
    'customLogo',
    'cineRentalPrintSections',
    'language',
  ]);

  if (typeof IOS_PWA_HELP_STORAGE_KEY === 'string' && IOS_PWA_HELP_STORAGE_KEY) {
    BACKUP_STORAGE_KNOWN_KEYS.add(IOS_PWA_HELP_STORAGE_KEY);
  } else if (
    GLOBAL_SCOPE
    && typeof GLOBAL_SCOPE.IOS_PWA_HELP_STORAGE_KEY === 'string'
    && GLOBAL_SCOPE.IOS_PWA_HELP_STORAGE_KEY
  ) {
    BACKUP_STORAGE_KNOWN_KEYS.add(GLOBAL_SCOPE.IOS_PWA_HELP_STORAGE_KEY);
  } else {
    BACKUP_STORAGE_KNOWN_KEYS.add('iosPwaHelpShown');
  }

  const BACKUP_METADATA_BASE_KEYS = new Set([
    'settings',
    'storage',
    'localStorage',
    'values',
    'entries',
    'sessionStorage',
    'sessionState',
    'sessionEntries',
    'payload',
    'plannerData',
    'allData',
    'generatedAt',
    'version',
    'appVersion',
    'applicationVersion',
  ]);

  const BACKUP_DATA_KEYS = [
    'devices',
    'setups',
    'session',
    'feedback',
    'project',
    'projects',
    'gearList',
    'favorites',
    'documentationTracker',
    'ownGear',
    'autoGearRules',
    'autoGearSeeded',
    'autoGearBackups',
    'autoGearPresets',
    'autoGearMonitorDefaults',
    'autoGearActivePresetId',
    'autoGearAutoPresetId',
    'autoGearShowBackups',
    'autoGearBackupRetention',
    'customLogo',
    'customFonts',
    'contacts',
    'userProfile',
    'preferences',
    'schemaCache',
    'fullBackupHistory',
    'fullBackups',
    'documentationTracker',
  ];

  const BACKUP_DATA_COMPLEX_KEYS = new Set([
    'devices',
    'setups',
    'session',
    'sessions',
    'feedback',
    'project',
    'projects',
    'gearList',
    'favorites',
    'documentationTracker',
    'ownGear',
    'autoGearRules',
    'autoGearBackups',
    'autoGearPresets',
    'autoGearMonitorDefaults',
    'contacts',
    'userProfile',
    'preferences',
    'fullBackupHistory',
    'fullBackups',
    'customFonts',
    'documentationTracker',
  ]);

  const FALLBACK_STORAGE_KEYS = (() => {
    const keys = new Set();
    if (BACKUP_STORAGE_KNOWN_KEYS && typeof BACKUP_STORAGE_KNOWN_KEYS.forEach === 'function') {
      BACKUP_STORAGE_KNOWN_KEYS.forEach((key) => {
        if (typeof key === 'string' && key) {
          keys.add(key);
        }
      });
    }

    BACKUP_STORAGE_KEY_PREFIXES.forEach((prefix) => {
      if (typeof prefix !== 'string' || !prefix) {
        return;
      }
      BACKUP_DATA_KEYS.forEach((name) => {
        if (typeof name !== 'string' || !name) {
          return;
        }
        keys.add(`${prefix}${name}`);
      });
    });

    return keys;
  })();

  function isPlainObject(value) {
    if (value === null || typeof value !== 'object') {
      return false;
    }
    if (Array.isArray(value)) {
      return false;
    }
    const tag = Object.prototype.toString.call(value);
    if (tag !== '[object Object]') {
      return false;
    }
    let prototype;
    try {
      prototype = Object.getPrototypeOf(value);
    } catch (error) {
      void error;
      return false;
    }
    return prototype === null || prototype === Object.prototype;
  }

  function isMapLike(value) {
    if (!value || typeof value !== 'object') {
      return false;
    }
    const tag = Object.prototype.toString.call(value);
    if (tag === '[object Map]') {
      return true;
    }
    if (typeof Map !== 'undefined') {
      try {
        if (value instanceof Map) {
          return true;
        }
      } catch (error) {
        void error;
      }
    }
    return (
      typeof value.size === 'number'
      && typeof value.entries === 'function'
      && typeof value.forEach === 'function'
      && typeof value.get === 'function'
      && typeof value.set === 'function'
    );
  }

  function convertMapLikeKey(key) {
    if (typeof key === 'string') {
      return key;
    }
    if (typeof key === 'number' || typeof key === 'boolean' || typeof key === 'bigint') {
      return String(key);
    }
    if (typeof key === 'symbol') {
      return key.description || key.toString();
    }
    if (key && typeof key === 'object') {
      try {
        const json = JSON.stringify(key);
        if (json && json !== '{}') {
          return json;
        }
      } catch (error) {
        void error;
      }
    }
    try {
      return String(key);
    } catch (error) {
      void error;
    }
    return null;
  }

  function convertMapLikeToObject(mapLike) {
    if (!isMapLike(mapLike)) {
      return null;
    }

    const snapshot = Object.create(null);
    const assignEntry = (rawKey, value) => {
      const key = convertMapLikeKey(rawKey);
      if (key === null || key === undefined) {
        return;
      }
      if (Object.prototype.hasOwnProperty.call(snapshot, key)) {
        return;
      }
      snapshot[key] = value;
    };

    let iterated = false;

    if (typeof mapLike.entries === 'function') {
      try {
        const iterator = mapLike.entries();
        if (iterator && typeof iterator.next === 'function') {
          for (let step = iterator.next(); !step.done; step = iterator.next()) {
            const entry = step && step.value;
            if (Array.isArray(entry) && entry.length >= 2) {
              assignEntry(entry[0], entry[1]);
            }
          }
          iterated = true;
        }
      } catch (error) {
        console.warn('Unable to iterate map-like backup value entries', error);
      }
    }

    if (!iterated && typeof mapLike.forEach === 'function') {
      try {
        mapLike.forEach((value, key) => {
          assignEntry(key, value);
        });
        iterated = true;
      } catch (error) {
        console.warn('Unable to iterate map-like backup value via forEach', error);
      }
    }

    if (!Object.keys(snapshot).length && !iterated) {
      return null;
    }

    return snapshot;
  }

  function formatFullBackupFilename(date) {
    const safeDate = date instanceof Date && !Number.isNaN(date.valueOf())
      ? date
      : new Date();
    const pad = value => String(value).padStart(2, '0');
    const year = safeDate.getFullYear();
    const month = pad(safeDate.getMonth() + 1);
    const day = pad(safeDate.getDate());
    const hours = pad(safeDate.getHours());
    const minutes = pad(safeDate.getMinutes());
    const seconds = pad(safeDate.getSeconds());
    const offsetMinutes = safeDate.getTimezoneOffset();
    let offsetSuffix = 'Z';
    if (offsetMinutes !== 0) {
      const sign = offsetMinutes > 0 ? '-' : '+';
      const abs = Math.abs(offsetMinutes);
      const offsetHours = pad(Math.floor(abs / 60));
      const offsetMins = pad(abs % 60);
      offsetSuffix = `${sign}${offsetHours}:${offsetMins}`;
    }
    const iso = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offsetSuffix}`;
    const safeIso = iso.replace(/[:]/g, '-');
    return {
      iso,
      fileName: `${safeIso} full app backup.json`,
    };
  }

  function resolveSafeLocalStorage() {
    if (typeof getSafeLocalStorage === 'function') {
      try {
        const storage = getSafeLocalStorage();
        if (storage) {
          return storage;
        }
      } catch (error) {
        console.warn('Unable to obtain safe local storage reference', error);
      }
    }
    if (typeof SAFE_LOCAL_STORAGE !== 'undefined') {
      return SAFE_LOCAL_STORAGE;
    }
    if (typeof localStorage !== 'undefined') {
      return localStorage;
    }
    return null;
  }

  function captureStorageSnapshot(storage) {
    const snapshot = Object.create(null);
    if (!storage) return snapshot;

    const assignEntry = (key, valueOrGetter) => {
      if (typeof key !== 'string' || !key) {
        return;
      }
      if (Object.prototype.hasOwnProperty.call(snapshot, key)) {
        return;
      }
      try {
        const value = typeof valueOrGetter === 'function'
          ? valueOrGetter()
          : valueOrGetter;
        snapshot[key] = value;
      } catch (error) {
        console.warn('Failed to read storage entry for backup', key, error);
      }
    };

    const tryEnumerateByIndex = () => {
      if (typeof storage.key !== 'function' || typeof storage.length !== 'number') {
        return false;
      }
      let length = 0;
      try {
        length = Number(storage.length) || 0;
      } catch (lengthError) {
        console.warn('Failed to inspect storage length for backup snapshot', lengthError);
        return true;
      }
      for (let i = 0; i < length; i += 1) {
        let key;
        try {
          key = storage.key(i);
        } catch (keyError) {
          console.warn('Failed to access storage key for backup snapshot', keyError);
          continue;
        }
        assignEntry(key, () => storage.getItem(key));
      }
      return true;
    };

    const tryEnumerateByKeys = () => {
      if (typeof storage.keys !== 'function') {
        return false;
      }
      let keys;
      try {
        keys = storage.keys();
      } catch (keysError) {
        console.warn('Failed to enumerate storage keys for backup snapshot', keysError);
        return true;
      }
      if (!keys) {
        return true;
      }
      const iterate = (list) => {
        if (!list) return;
        if (typeof list.forEach === 'function') {
          list.forEach(key => assignEntry(key, () => storage.getItem(key)));
        } else if (typeof list[Symbol.iterator] === 'function') {
          for (const key of list) {
            assignEntry(key, () => storage.getItem(key));
          }
        }
      };
      iterate(keys);
      return true;
    };

    const tryEnumerateByForEach = () => {
      if (typeof storage.forEach !== 'function') {
        return false;
      }
      try {
        storage.forEach((value, key) => {
          assignEntry(key, value);
        });
      } catch (error) {
        console.warn('Failed to iterate storage for backup snapshot', error);
      }
      return true;
    };

    let enumerated = false;
    try {
      enumerated = tryEnumerateByIndex();
    } catch (error) {
      console.warn('Failed to snapshot storage via index enumeration', error);
    }

    if (!Object.keys(snapshot).length) {
      try {
        enumerated = tryEnumerateByKeys() || enumerated;
      } catch (error) {
        console.warn('Failed to snapshot storage via key enumeration', error);
      }
    }

    if (!Object.keys(snapshot).length && !enumerated) {
      try {
        tryEnumerateByForEach();
      } catch (error) {
        console.warn('Failed to snapshot storage via iteration', error);
      }
    } else if (!Object.keys(snapshot).length) {
      tryEnumerateByForEach();
    }

    if (typeof storage.getItem === 'function' && FALLBACK_STORAGE_KEYS.size) {
      FALLBACK_STORAGE_KEYS.forEach((key) => {
        assignEntry(key, () => storage.getItem(key));
      });
    }

    return snapshot;
  }

  function createSafeStorageReader(storage, errorMessagePrefix) {
    if (!storage || typeof storage.getItem !== 'function') {
      return () => null;
    }

    const message = typeof errorMessagePrefix === 'string' && errorMessagePrefix
      ? errorMessagePrefix
      : 'Failed to read storage key';

    return (key) => {
      if (typeof key !== 'string') {
        return null;
      }
      try {
        return storage.getItem(key);
      } catch (error) {
        console.warn(`${message}`, key, error);
        return null;
      }
    };
  }

  function restoreSessionStorageSnapshot(snapshot) {
    if (typeof sessionStorage === 'undefined' || !sessionStorage) {
      return;
    }

    const entries = snapshot && typeof snapshot === 'object'
      ? Object.entries(snapshot)
      : [];
    const retainedKeys = new Set(entries.map(([key]) => key));

    const keysToRemove = [];
    try {
      const { length } = sessionStorage;
      for (let i = 0; i < length; i += 1) {
        const key = sessionStorage.key(i);
        if (typeof key !== 'string') continue;
        if (!retainedKeys.has(key)) {
          keysToRemove.push(key);
        }
      }
    } catch (error) {
      console.warn('Failed to inspect sessionStorage during restore rollback', error);
    }

    keysToRemove.forEach((key) => {
      try {
        sessionStorage.removeItem(key);
      } catch (removeError) {
        console.warn('Failed to remove sessionStorage key during restore rollback', key, removeError);
      }
    });

    entries.forEach(([key, value]) => {
      if (typeof key !== 'string') return;
      try {
        sessionStorage.setItem(key, typeof value === 'string' ? value : String(value));
      } catch (setError) {
        console.warn('Failed to reapply sessionStorage key during restore rollback', key, setError);
      }
    });
  }

  function normalizeStoredValue(value) {
    if (typeof value === 'string') return value;
    if (value === undefined || value === null) return '';
    if (typeof value === 'object') {
      try {
        return JSON.stringify(value);
      } catch (error) {
        console.warn('Failed to serialize stored value for backup compatibility', error);
        return '';
      }
    }
    try {
      return String(value);
    } catch (error) {
      console.warn('Failed to normalize stored value for backup compatibility', error);
      return '';
    }
  }

  function convertEntriesToSnapshot(section) {
    if (!section) return null;

    let source = section;
    if (isMapLike(source)) {
      const converted = convertMapLikeToObject(source);
      if (converted) {
        source = converted;
      }
    }
    if (typeof source === 'string') {
      let parsed = null;
      try {
        parsed = JSON.parse(source);
      } catch (error) {
        parsed = null;
        void error;
      }
      if (parsed && (Array.isArray(parsed) || isPlainObject(parsed))) {
        source = parsed;
      } else {
        return null;
      }
    }

    const snapshot = Object.create(null);
    const assignEntry = (key, value) => {
      if (typeof key !== 'string' || !key) return;
      snapshot[key] = normalizeStoredValue(value);
    };

    if (Array.isArray(source)) {
      source.forEach(entry => {
        if (!entry) return;
        if (Array.isArray(entry)) {
          assignEntry(entry[0], entry[1]);
          return;
        }
        if (typeof entry === 'object') {
          if (typeof entry.key === 'string') {
            assignEntry(entry.key, entry.value ?? entry.val ?? entry.data ?? entry.content ?? entry.string);
            return;
          }
          if (typeof entry.name === 'string') {
            assignEntry(entry.name, entry.value ?? entry.val ?? entry.data ?? entry.content ?? entry.string);
            return;
          }
          if (Array.isArray(entry.entry)) {
            assignEntry(entry.entry[0], entry.entry[1]);
          }
        }
      });
    } else if (isPlainObject(source)) {
      Object.entries(source).forEach(([key, value]) => {
        assignEntry(key, value);
      });
    } else {
      return null;
    }

    return Object.keys(snapshot).length ? snapshot : null;
  }

  function extractFirstMatchingSnapshot(source, keys) {
    let resolvedSource = source;
    if (!isPlainObject(resolvedSource)) {
      if (isMapLike(resolvedSource)) {
        const converted = convertMapLikeToObject(resolvedSource);
        if (converted && isPlainObject(converted)) {
          resolvedSource = converted;
        } else {
          return { snapshot: null, keyUsed: null };
        }
      } else {
        return { snapshot: null, keyUsed: null };
      }
    }
    for (let index = 0; index < keys.length; index += 1) {
      const key = keys[index];
      if (!Object.prototype.hasOwnProperty.call(resolvedSource, key)) continue;
      const snapshot = convertEntriesToSnapshot(resolvedSource[key]);
      if (snapshot) {
        return { snapshot, keyUsed: key };
      }
    }
    return { snapshot: null, keyUsed: null };
  }

  function looksLikeStoredSettingKey(key) {
    if (BACKUP_STORAGE_KNOWN_KEYS.has(key)) {
      return true;
    }
    return BACKUP_STORAGE_KEY_PREFIXES.some(prefix => key.startsWith(prefix));
  }

  function restoreLocalStorageSnapshot(storage, snapshot) {
    if (!storage || typeof storage.setItem !== 'function') {
      return;
    }

    const entries = snapshot && typeof snapshot === 'object'
      ? Object.entries(snapshot)
      : [];
    const targetKeys = new Set(entries.map(([key]) => key));

    const keysToRemove = [];
    try {
      const { length } = storage;
      for (let i = 0; i < length; i += 1) {
        const key = storage.key(i);
        if (typeof key !== 'string') continue;
        if (!targetKeys.has(key) && looksLikeStoredSettingKey(key)) {
          keysToRemove.push(key);
        }
      }
    } catch (error) {
      console.warn('Failed to inspect storage during restore rollback', error);
    }

    keysToRemove.forEach((key) => {
      try {
        storage.removeItem(key);
      } catch (removeError) {
        console.warn('Failed to remove storage key during restore rollback', key, removeError);
      }
    });

    entries.forEach(([key, value]) => {
      if (typeof key !== 'string') return;
      try {
        if (value === null || value === undefined) {
          storage.removeItem(key);
        } else {
          storage.setItem(key, typeof value === 'string' ? value : String(value));
        }
      } catch (setError) {
        console.warn('Failed to reapply storage key during restore rollback', key, setError);
      }
    });
  }

  function buildLegacyStorageFromRoot(source, metadataKeys) {
    let resolvedSource = source;
    if (isMapLike(resolvedSource)) {
      const converted = convertMapLikeToObject(resolvedSource);
      if (converted) {
        resolvedSource = converted;
      }
    }
    if (!isPlainObject(resolvedSource)) return null;
    const snapshot = Object.create(null);
    Object.entries(resolvedSource).forEach(([key, value]) => {
      if (metadataKeys.has(key)) return;
      if (!looksLikeStoredSettingKey(key)) return;
      snapshot[key] = normalizeStoredValue(value);
    });
    return Object.keys(snapshot).length ? snapshot : null;
  }

  function convertLegacyDataEntriesToObject(entries) {
    if (isMapLike(entries)) {
      const converted = convertMapLikeToObject(entries);
      if (converted) {
        return converted;
      }
    }

    if (!Array.isArray(entries)) {
      return null;
    }

    const snapshot = Object.create(null);
    const assignEntry = (key, value) => {
      if (typeof key !== 'string' || !key) return;
      if (Object.prototype.hasOwnProperty.call(snapshot, key)) return;
      snapshot[key] = value;
    };

    const keyCandidateKeys = ['key', 'name', 'section', 'type'];
    const valueCandidateKeys = [
      'value',
      'data',
      'content',
      'payload',
      'entries',
      'items',
      'record',
      'snapshot',
      'state',
      'values',
      'settings',
      'sectionData',
      'body',
    ];

    entries.forEach(entry => {
      if (!entry) return;
      if (Array.isArray(entry)) {
        assignEntry(entry[0], entry[1]);
        return;
      }
      if (!isPlainObject(entry)) {
        return;
      }

      if (Array.isArray(entry.entry)) {
        assignEntry(entry.entry[0], entry.entry[1]);
        return;
      }

      const keyCandidate = keyCandidateKeys.find(candidate => {
        const value = entry[candidate];
        return typeof value === 'string' && value;
      });

      if (!keyCandidate) {
        return;
      }

      let value = undefined;
      for (let i = 0; i < valueCandidateKeys.length; i += 1) {
        const candidate = valueCandidateKeys[i];
        if (Object.prototype.hasOwnProperty.call(entry, candidate)) {
          value = entry[candidate];
          break;
        }
      }

      if (value === undefined) {
        value = entry.value
          ?? entry.data
          ?? entry.content
          ?? entry.payload
          ?? entry.entries
          ?? entry.items
          ?? entry.snapshot
          ?? entry.state
          ?? entry.values
          ?? entry.settings;
      }

      if (value === undefined) {
        return;
      }

      assignEntry(entry[keyCandidate], value);
    });

    return Object.keys(snapshot).length ? snapshot : null;
  }

  function normalizeBackupDataSection(section) {
    if (isMapLike(section)) {
      const converted = convertMapLikeToObject(section);
      if (converted) {
        return normalizeBackupDataSection(converted);
      }
    }

    if (isPlainObject(section)) {
      return section;
    }

    if (Array.isArray(section)) {
      const converted = convertLegacyDataEntriesToObject(section);
      if (converted) {
        return converted;
      }
    }

    if (typeof section === 'string') {
      const parsed = parseBackupDataString(section);
      if (parsed) {
        return parsed;
      }
    }

    if (section && typeof section === 'object') {
      if (typeof section.toJSON === 'function') {
        try {
          const toJsonValue = section.toJSON();
          if (isPlainObject(toJsonValue) || Array.isArray(toJsonValue)) {
            return normalizeBackupDataSection(toJsonValue);
          }
        } catch (error) {
          console.warn('Failed to convert backup data via toJSON', error);
        }
      }
    }

    return null;
  }

  function normalizeBackupDataValue(key, value) {
    if (typeof key === 'string' && BACKUP_DATA_COMPLEX_KEYS.has(key)) {
      const normalized = normalizeBackupDataSection(value);
      if (normalized) {
        return normalized;
      }
    }
    return value;
  }

  function mergeBackupDataSections(base, additions) {
    if (!isPlainObject(additions) || !Object.keys(additions).length) {
      return base ? { ...base } : null;
    }

    const target = base ? { ...base } : {};
    Object.entries(additions).forEach(([key, value]) => {
      if (typeof key !== 'string') return;
      if (Object.prototype.hasOwnProperty.call(target, key)) return;
      target[key] = normalizeBackupDataValue(key, value);
    });
    return target;
  }

  const CONTROL_CHARACTER_REGEX = new RegExp(
    `[${String.fromCharCode(0)}-${String.fromCharCode(31)}${String.fromCharCode(127)}]`,
    'g',
  );

  function sanitizeBackupPayload(raw) {
    if (raw === null || raw === undefined) {
      return '';
    }

    const decodeBinaryPayload = (value) => {
      if (typeof value !== 'object' || value === null) {
        return null;
      }

      const isNodeBuffer =
        typeof Buffer !== 'undefined'
        && typeof Buffer.isBuffer === 'function'
        && Buffer.isBuffer(value);

      const objectTag = Object.prototype.toString.call(value);

      const isArrayBuffer =
        typeof ArrayBuffer !== 'undefined'
        && (value instanceof ArrayBuffer || objectTag === '[object ArrayBuffer]' || objectTag === '[object SharedArrayBuffer]');

      const isArrayBufferView = (() => {
        if (typeof ArrayBuffer === 'undefined') {
          return false;
        }
        if (typeof ArrayBuffer.isView === 'function' && ArrayBuffer.isView(value)) {
          return true;
        }
        return Boolean(
          value
          && typeof value === 'object'
          && typeof value.buffer === 'object'
          && typeof value.byteLength === 'number'
          && typeof value.BYTES_PER_ELEMENT === 'number'
        );
      })();

      if (!isNodeBuffer && !isArrayBuffer && !isArrayBufferView) {
        return null;
      }

      const toUint8Array = () => {
        if (isNodeBuffer) {
          return new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
        }
        if (isArrayBuffer) {
          return new Uint8Array(value);
        }
        if (
          typeof value.buffer === 'object'
          && typeof value.byteLength === 'number'
        ) {
          const offset = typeof value.byteOffset === 'number' ? value.byteOffset : 0;
          return new Uint8Array(value.buffer, offset, value.byteLength);
        }
        throw new TypeError('Unsupported binary payload type');
      };

      const decodeWithTextDecoder = (array) => {
        if (typeof TextDecoder !== 'function') {
          return null;
        }
        try {
          const decoder = new TextDecoder('utf-8', { fatal: false });
          return decoder.decode(array);
        } catch (error) {
          console.warn('Failed to decode backup payload with TextDecoder', error);
          return null;
        }
      };

      const decodeWithBuffer = () => {
        if (!isNodeBuffer) {
          return null;
        }
        try {
          return value.toString('utf8');
        } catch (error) {
          console.warn('Failed to decode backup payload with Buffer', error);
          return null;
        }
      };

      const decodeManually = (array) => {
        try {
          let result = '';
          const CHUNK_SIZE = 0x8000;
          for (let index = 0; index < array.length; index += CHUNK_SIZE) {
            const slice = array.subarray(index, index + CHUNK_SIZE);
            result += String.fromCharCode.apply(null, slice);
          }
          return result;
        } catch (error) {
          console.warn('Failed to manually decode backup payload', error);
          return null;
        }
      };

      const array = toUint8Array();
      return decodeWithTextDecoder(array)
        || decodeWithBuffer()
        || decodeManually(array);
    };

    let text;
    if (typeof raw === 'string') {
      text = raw;
    } else {
      const decoded = decodeBinaryPayload(raw);
      if (typeof decoded === 'string') {
        text = decoded;
      } else {
        try {
          text = String(raw);
        } catch (error) {
          console.warn('Failed to coerce backup payload to string', error);
          text = '';
        }
      }
    }

    if (typeof text !== 'string') {
      return '';
    }

    if (!text.includes('\u0000')) {
      return text;
    }

    try {
      return text.replace(CONTROL_CHARACTER_REGEX, '');
    } catch (error) {
      console.warn('Failed to strip control characters from backup payload', error);
      return text;
    }
  }

  function parseBackupDataString(raw) {
    if (typeof raw !== 'string') {
      return null;
    }

    const sanitized = sanitizeBackupPayload(raw);
    if (!sanitized) {
      return null;
    }

    const trimmed = sanitized.trim();
    if (!trimmed) {
      return null;
    }

    try {
      const parsed = JSON.parse(trimmed);
      if (isPlainObject(parsed)) {
        return parsed;
      }
      if (Array.isArray(parsed)) {
        return convertLegacyDataEntriesToObject(parsed);
      }
    } catch (error) {
      console.warn('Failed to parse backup data string', error);
    }

    return null;
  }

  function extractBackupSections(raw) {
    let parsed;
    if (isPlainObject(raw)) {
      parsed = raw;
    } else if (isMapLike(raw)) {
      const converted = convertMapLikeToObject(raw);
      parsed = isPlainObject(converted) ? converted : {};
    } else {
      parsed = {};
    }
    const versionValue =
      typeof parsed.version === 'string'
        ? parsed.version
        : typeof parsed.appVersion === 'string'
          ? parsed.appVersion
          : typeof parsed.applicationVersion === 'string'
            ? parsed.applicationVersion
            : undefined;

    const settingsResult = extractFirstMatchingSnapshot(parsed, [
      'settings',
      'localStorage',
      'storage',
      'storedSettings',
      'values',
      'entries',
    ]);
    const sessionResult = extractFirstMatchingSnapshot(parsed, [
      'sessionStorage',
      'session',
      'sessions',
      'sessionState',
      'sessionEntries',
    ]);

    const metadataKeys = new Set(BACKUP_METADATA_BASE_KEYS);
    if (settingsResult.keyUsed) metadataKeys.add(settingsResult.keyUsed);
    if (sessionResult.keyUsed) metadataKeys.add(sessionResult.keyUsed);

    const settingsSnapshot = settingsResult.snapshot || buildLegacyStorageFromRoot(parsed, metadataKeys);
    const sessionSnapshot = sessionResult.snapshot;

    let dataSection = null;
    const dataKeys = ['data', 'payload', 'plannerData', 'allData'];
    for (let index = 0; index < dataKeys.length; index += 1) {
      const key = dataKeys[index];
      if (!Object.prototype.hasOwnProperty.call(parsed, key)) continue;
      const normalized = normalizeBackupDataSection(parsed[key]);
      if (normalized) {
        dataSection = mergeBackupDataSections(dataSection, normalized);
      }
    }

    const fallback = {};
    BACKUP_DATA_KEYS.forEach(key => {
      if (metadataKeys.has(key)) return;
      if (!Object.prototype.hasOwnProperty.call(parsed, key)) return;
      fallback[key] = normalizeBackupDataValue(key, parsed[key]);
    });
    if (Object.keys(fallback).length) {
      dataSection = mergeBackupDataSections(dataSection, fallback);
    }

    return {
      fileVersion: versionValue,
      settings: settingsSnapshot,
      sessionStorage: sessionSnapshot,
      data: isPlainObject(dataSection) ? dataSection : null,
    };
  }

  function isUnsupportedDownloadPermissionError(error) {
    if (!error) return false;

    const name = typeof error.name === 'string' ? error.name : '';
    if (name === 'TypeError' || name === 'NotSupportedError') {
      return true;
    }

    if (typeof DOMException !== 'undefined' && error instanceof DOMException) {
      if (error.code === DOMException.NOT_SUPPORTED_ERR) {
        return true;
      }
    }

    if (typeof error.message === 'string') {
      const lowerMessage = error.message.toLowerCase();
      if (lowerMessage.includes('automatic-download') && lowerMessage.includes('not a valid enum')) {
        return true;
      }
      if (lowerMessage.includes('downloads') && lowerMessage.includes('not a valid enum')) {
        return true;
      }
    }

    return false;
  }

  function monitorAutomaticDownloadPermission() {
    if (typeof navigator === 'undefined' || !navigator.permissions
      || typeof navigator.permissions.query !== 'function') {
      return null;
    }

    const candidateNames = ['automatic-downloads', 'downloads'];
    let statusPromise = null;
    let permissionNameUsed = null;

    for (let index = 0; index < candidateNames.length; index += 1) {
      const permissionName = candidateNames[index];
      try {
        const queryResult = navigator.permissions.query({ name: permissionName });
        if (!queryResult || typeof queryResult.then !== 'function') {
          continue;
        }
        statusPromise = queryResult;
        permissionNameUsed = permissionName;
        break;
      } catch (error) {
        if (isUnsupportedDownloadPermissionError(error)) {
          continue;
        }
        console.warn(`Failed to query automatic download permission (${permissionName})`, error);
        return null;
      }
    }

    if (!statusPromise || typeof statusPromise.then !== 'function') {
      return null;
    }

    let permissionStatusRef = null;
    const monitor = {
      state: 'unknown',
      name: permissionNameUsed,
      supported: true,
      initial: statusPromise.then(status => {
        permissionStatusRef = status;
        if (!status || typeof status.state !== 'string') {
          monitor.state = 'unknown';
          return monitor.state;
        }
        monitor.state = status.state;
        return monitor.state;
      }).catch(error => {
        if (isUnsupportedDownloadPermissionError(error)) {
          monitor.supported = false;
          monitor.state = 'unknown';
          return monitor.state;
        }
        console.warn(`Failed to query automatic download permission (${permissionNameUsed || 'unknown'})`, error);
        monitor.state = 'unknown';
        return monitor.state;
      }),
      ready: null,
    };

    monitor.ready = monitor.initial.then(initialState => {
      if (!permissionStatusRef || typeof permissionStatusRef.state !== 'string') {
        return monitor.state;
      }

      if (initialState === 'prompt') {
        return new Promise(resolve => {
          const finalize = () => {
            try {
              permissionStatusRef.removeEventListener('change', finalize);
            } catch (removeError) {
              void removeError;
            }
            monitor.state = typeof permissionStatusRef.state === 'string'
              ? permissionStatusRef.state
              : 'unknown';
            resolve(monitor.state);
          };

          try {
            permissionStatusRef.addEventListener('change', finalize);
          } catch (listenerError) {
            console.warn('Failed to observe automatic download permission changes', listenerError);
            resolve('unknown');
          }
        });
      }

      return initialState;
    }).catch(error => {
      if (!isUnsupportedDownloadPermissionError(error)) {
        console.warn('Failed to observe automatic download permission changes', error);
      }
      monitor.state = 'unknown';
      return monitor.state;
    });

    return monitor;
  }

  function triggerBackupDownload(url, fileName) {
    if (typeof document === 'undefined') {
      return false;
    }
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    anchor.rel = 'noopener';
    anchor.target = '_blank';
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    let success = false;
    try {
      anchor.click();
      success = true;
    } catch (error) {
      console.warn('Failed to trigger backup download', error);
      success = false;
    }
    setTimeout(() => {
      try {
        anchor.remove();
      } catch (error) {
        void error;
      }
    }, 0);
    return success;
  }

  function encodeBackupDataUrl(payload) {
    if (typeof payload !== 'string') {
      return null;
    }

    try {
      return `data:application/json;charset=utf-8,${encodeURIComponent(payload)}`;
    } catch (error) {
      console.warn('Failed to encode backup payload as data URL', error);
      return null;
    }
  }

  function openBackupFallbackWindow(payload, fileName) {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return false;
    }

    let backupWindow = null;
    try {
      backupWindow = window.open('', '_blank', 'noopener');
    } catch (error) {
      console.warn('Failed to open fallback backup window', error);
      backupWindow = null;
    }

    if (!backupWindow) {
      return false;
    }

    try {
      const doc = backupWindow.document;
      if (!doc) {
        return false;
      }

      const langAttr = document && document.documentElement && document.documentElement.getAttribute
        ? document.documentElement.getAttribute('lang')
        : 'en';
      doc.open();
      doc.write(`<!DOCTYPE html><html lang="${langAttr || 'en'}"><head><meta charset="utf-8"><title>Manual download</title></head><body></body></html>`);
      doc.close();

      try {
        doc.title = fileName || 'backup.json';
      } catch (titleError) {
        void titleError;
      }

      const body = doc.body;
      if (!body) {
        return false;
      }

      body.style.margin = '0';
      body.style.padding = '1.5rem';
      body.style.background = '#f8f9fb';
      body.style.color = '#0f172a';
      body.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

      const container = doc.createElement('div');
      container.style.maxWidth = '960px';
      container.style.margin = '0 auto';
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '1rem';

      const heading = doc.createElement('h1');
      heading.textContent = fileName || 'Manual backup';
      heading.style.margin = '0';
      heading.style.fontSize = '1.5rem';
      heading.style.fontWeight = '400';

      const description = doc.createElement('p');
      if (typeof getManualDownloadFallbackMessage === 'function') {
        description.textContent = getManualDownloadFallbackMessage();
      } else {
        description.textContent = 'Copy the text below and save it to a file ending with .json to keep your data safe.';
      }
      description.style.margin = '0';
      description.style.lineHeight = '1.5';

      const helper = doc.createElement('p');
      if (typeof getManualDownloadCopyHint === 'function') {
        helper.textContent = getManualDownloadCopyHint();
      } else {
        helper.textContent = 'Select the text, copy it and paste into your preferred notes app or text editor.';
      }
      helper.style.margin = '0';
      helper.style.lineHeight = '1.5';

      const textArea = doc.createElement('textarea');
      textArea.value = payload;
      textArea.readOnly = true;
      textArea.spellcheck = false;
      textArea.style.width = '100%';
      textArea.style.height = '70vh';
      textArea.style.resize = 'vertical';
      textArea.style.padding = '1rem';
      textArea.style.borderRadius = '1rem';
      textArea.style.border = '1px solid rgba(15, 23, 42, 0.15)';
      textArea.style.background = '#ffffff';
      textArea.style.fontFamily = "'SFMono-Regular', 'Roboto Mono', 'Menlo', 'Courier New', monospace";
      textArea.style.fontSize = '0.875rem';
      textArea.style.lineHeight = '1.5';
      textArea.style.boxShadow = '0 0.75rem 2.5rem rgba(15, 23, 42, 0.16)';

      container.appendChild(heading);
      container.appendChild(description);
      container.appendChild(helper);
      container.appendChild(textArea);
      body.appendChild(container);

      try {
        textArea.focus();
        textArea.select();
      } catch (focusError) {
        void focusError;
      }

      try {
        backupWindow.focus();
      } catch (focusWindowError) {
        void focusWindowError;
      }

      return true;
    } catch (renderError) {
      console.warn('Failed to render manual backup window', renderError);
      return false;
    }
  }

  function downloadBackupPayload(payload, fileName, options = {}) {
    const permissionMonitor = monitorAutomaticDownloadPermission();
    const config = typeof options === 'object' && options !== null ? options : {};
    const skipQueue = config.skipQueue === true;
    const failureResult = {
      success: false,
      method: null,
      permission: permissionMonitor,
      queued: false,
      queueMessage: resolveQueuedBackupMessage(fileName),
    };

    if (typeof payload !== 'string') {
      return failureResult;
    }

    let blob = null;
    if (typeof Blob !== 'undefined') {
      try {
        blob = new Blob([payload], { type: 'application/json' });
      } catch (blobError) {
        console.warn('Failed to create backup blob', blobError);
        blob = null;
      }
    }

    if (blob) {
      if (typeof navigator !== 'undefined' && typeof navigator.msSaveOrOpenBlob === 'function') {
        try {
          const msSaveResult = navigator.msSaveOrOpenBlob(blob, fileName);
          if (msSaveResult === false) {
            console.warn('Saving backup via msSaveOrOpenBlob was cancelled or declined');
          } else {
            return { success: true, method: 'ms-save', permission: permissionMonitor };
          }
        } catch (msError) {
          console.warn('Failed to save backup via msSaveOrOpenBlob', msError);
        }
      }

      if (typeof URL !== 'undefined' && typeof URL.createObjectURL === 'function') {
        let objectUrl = null;
        try {
          objectUrl = URL.createObjectURL(blob);
        } catch (urlError) {
          console.warn('Failed to create object URL for backup blob', urlError);
          objectUrl = null;
        }

        if (objectUrl) {
          const triggered = triggerBackupDownload(objectUrl, fileName);
          if (typeof URL.revokeObjectURL === 'function') {
            setTimeout(() => {
              try {
                URL.revokeObjectURL(objectUrl);
              } catch (revokeError) {
                void revokeError;
              }
            }, 0);
          }
          if (triggered) {
            return { success: true, method: 'blob-url', permission: permissionMonitor };
          }
        }
      }
    }

    const encoded = encodeBackupDataUrl(payload);
    if (encoded) {
      const triggered = triggerBackupDownload(encoded, fileName);
      if (triggered) {
        return { success: true, method: 'data-url', permission: permissionMonitor };
      }
    }

    const opened = openBackupFallbackWindow(payload, fileName);
    if (opened) {
      return { success: true, method: 'manual', permission: permissionMonitor };
    }

    if (!skipQueue) {
      const metadata = config.queueMetadata && typeof config.queueMetadata === 'object'
        ? config.queueMetadata
        : {};
      const record = queueBackupPayloadForVault(fileName, payload, {
        reason: metadata.reason || config.reason || 'download-blocked',
        permissionState: metadata.permissionState
          || (permissionMonitor && typeof permissionMonitor.state === 'string'
            ? permissionMonitor.state
            : 'unknown'),
        source: metadata.source || config.source || 'automatic',
        createdAt: metadata.createdAt || null,
        createdAtMs: metadata.createdAtMs || null,
      });
      failureResult.queued = true;
      failureResult.queueEntryId = record && typeof record.id === 'string' ? record.id : null;
    }

    return failureResult;
  }

  function isAutoBackupName(name) {
    return typeof name === 'string'
      && (name.startsWith(SESSION_AUTO_BACKUP_NAME_PREFIX)
        || name.startsWith(SESSION_AUTO_BACKUP_DELETION_PREFIX));
  }

  function parseAutoBackupName(name) {
    if (typeof name !== 'string') {
      return null;
    }

    const config = (() => {
      if (name.startsWith(SESSION_AUTO_BACKUP_DELETION_PREFIX)) {
        return {
          prefixLength: SESSION_AUTO_BACKUP_DELETION_PREFIX.length,
          type: 'auto-backup-before-delete',
          secondsOptional: true,
        };
      }
      if (name.startsWith(SESSION_AUTO_BACKUP_NAME_PREFIX)) {
        return {
          prefixLength: SESSION_AUTO_BACKUP_NAME_PREFIX.length,
          type: 'auto-backup',
          secondsOptional: true,
        };
      }
      return null;
    })();

    if (!config) {
      return null;
    }

    const remainder = name.slice(config.prefixLength);
    const parts = remainder.split('-');
    if (parts.length < 5) {
      return null;
    }

    const baseParts = parts.slice(0, 5).map(part => Number(part));
    if (baseParts.some(value => Number.isNaN(value))) {
      return null;
    }

    const [year, month, day, hour, minute] = baseParts;

    let includeSeconds = false;
    let seconds = 0;
    let labelStartIndex = 5;

    if (parts.length > labelStartIndex) {
      const secondsCandidate = parts[labelStartIndex];
      if (/^\d{1,2}$/u.test(secondsCandidate)) {
        includeSeconds = true;
        seconds = Number(secondsCandidate);
        labelStartIndex += 1;
      } else if (!config.secondsOptional) {
        return null;
      }
    } else if (!config.secondsOptional) {
      return null;
    }

    const label = parts.slice(labelStartIndex).join('-').trim();
    const date = new Date(year, month - 1, day, hour, minute, includeSeconds ? seconds : 0, 0);

    return {
      type: config.type,
      date: Number.isNaN(date.valueOf()) ? null : date,
      label,
      includeSeconds,
    };
  }

  const backupAPI = freezeDeep({
    formatFullBackupFilename,
    resolveSafeLocalStorage,
    captureStorageSnapshot,
    createSafeStorageReader,
    restoreSessionStorageSnapshot,
    restoreLocalStorageSnapshot,
    sanitizeBackupPayload,
    parseBackupDataString,
    normalizeBackupDataSection,
    normalizeBackupDataValue,
    mergeBackupDataSections,
    extractBackupSections,
    triggerBackupDownload,
    encodeBackupDataUrl,
    openBackupFallbackWindow,
    downloadBackupPayload,
    queueBackupPayloadForVault,
    getQueuedBackupPayloads,
    removeBackupVaultRecord,
    openQueuedBackupVaultWindow,
    resolveQueuedBackupMessage,
    isBackupVaultFallbackActive,
    getBackupVaultFallbackState,
    isAutoBackupName,
    parseAutoBackupName,
    isPlainObject,
    constants: freezeDeep({
      SESSION_AUTO_BACKUP_NAME_PREFIX,
      SESSION_AUTO_BACKUP_DELETION_PREFIX,
      BACKUP_STORAGE_KEY_PREFIXES: BACKUP_STORAGE_KEY_PREFIXES.slice(),
      BACKUP_STORAGE_KNOWN_KEYS: Array.from(BACKUP_STORAGE_KNOWN_KEYS),
      BACKUP_METADATA_BASE_KEYS: Array.from(BACKUP_METADATA_BASE_KEYS),
      BACKUP_DATA_KEYS: BACKUP_DATA_KEYS.slice(),
      BACKUP_DATA_COMPLEX_KEYS: Array.from(BACKUP_DATA_COMPLEX_KEYS),
      BACKUP_VAULT_FALLBACK_STORAGE_KEY,
    }),
  });

  registerOrQueueModule(
    'cineFeatureBackup',
    backupAPI,
    {
      category: 'feature',
      description: 'Backup and restore helpers for snapshots, payload normalization, downloads and diff metadata.',
      replace: true,
      connections: ['cineModuleBase', 'cineModuleContext', 'cinePersistence'],
    },
    (error) => {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Unable to register cineFeatureBackup module.', error);
      }
    },
  );

  function clearBackupVault() {
    const indexedPromise = withBackupVaultStore('readwrite', (store) => {
      if (!store) {
        return false;
      }
      return new Promise((resolve, reject) => {
        try {
          const request = store.clear();
          request.addEventListener('success', () => {
            resolve(true);
          });
          request.addEventListener('error', () => {
            reject(request.error);
          });
        } catch (clearError) {
          reject(clearError);
        }
      }).catch((error) => {
        console.warn('Failed to clear backup vault IndexedDB', error);
        return false;
      });
    }).catch((error) => {
      console.warn('Backup vault clear failed', error);
      return false;
    });

    const fallbackPromise = Promise.resolve().then(() => {
      const { storage } = getBackupVaultFallbackStorage();
      if (isStorageLike(storage)) {
        try {
          storage.removeItem(BACKUP_VAULT_FALLBACK_STORAGE_KEY);
          fallbackStorageRecordCount = 0;
          return true;
        } catch (error) {
          console.warn('Failed to clear fallback backup vault', error);
          return false;
        }
      }
      return false;
    });

    const memoryPromise = memoryBackupVault.list().then((entries) => {
      const ids = entries.map(e => e.id);
      return Promise.all(ids.map(id => memoryBackupVault.remove(id))).then(() => true);
    });

    return Promise.all([indexedPromise, fallbackPromise, memoryPromise]).then(() => {
      backupVaultTransientRecords.clear();
      refreshBackupVaultFallbackMode();
      return true;
    });
  }

  const globalExports = [
    ['cineFeatureBackup', backupAPI],
    ['formatFullBackupFilename', formatFullBackupFilename],
    ['resolveSafeLocalStorage', resolveSafeLocalStorage],
    ['captureStorageSnapshot', captureStorageSnapshot],
    ['createSafeStorageReader', createSafeStorageReader],
    ['restoreSessionStorageSnapshot', restoreSessionStorageSnapshot],
    ['restoreLocalStorageSnapshot', restoreLocalStorageSnapshot],
    ['sanitizeBackupPayload', sanitizeBackupPayload],
    ['parseBackupDataString', parseBackupDataString],
    ['normalizeBackupDataSection', normalizeBackupDataSection],
    ['normalizeBackupDataValue', normalizeBackupDataValue],
    ['mergeBackupDataSections', mergeBackupDataSections],
    ['extractBackupSections', extractBackupSections],
    ['triggerBackupDownload', triggerBackupDownload],
    ['encodeBackupDataUrl', encodeBackupDataUrl],
    ['openBackupFallbackWindow', openBackupFallbackWindow],
    ['downloadBackupPayload', downloadBackupPayload],
    ['queueBackupPayloadForVault', queueBackupPayloadForVault],
    ['getQueuedBackupPayloads', getQueuedBackupPayloads],
    ['removeBackupVaultRecord', removeBackupVaultRecord],
    ['openQueuedBackupVaultWindow', openQueuedBackupVaultWindow],
    ['resolveQueuedBackupMessage', resolveQueuedBackupMessage],
    ['isBackupVaultFallbackActive', isBackupVaultFallbackActive],
    ['getBackupVaultFallbackState', getBackupVaultFallbackState],
    ['isAutoBackupName', isAutoBackupName],
    ['parseAutoBackupName', parseAutoBackupName],
    ['clearBackupVault', clearBackupVault],
    ['SESSION_AUTO_BACKUP_NAME_PREFIX', SESSION_AUTO_BACKUP_NAME_PREFIX],
    ['SESSION_AUTO_BACKUP_DELETION_PREFIX', SESSION_AUTO_BACKUP_DELETION_PREFIX],
  ];

  globalExports.forEach(([name, value]) => {
    exposeGlobal(name, value, { configurable: true, writable: true });
  });
})();
