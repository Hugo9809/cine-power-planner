function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
  var GLOBAL_SCOPE = detectGlobalScope();
  function resolveModuleBase(scope) {
    if ((typeof cineModuleBase === "undefined" ? "undefined" : _typeof(cineModuleBase)) === 'object' && cineModuleBase) {
      return cineModuleBase;
    }
    if (typeof require === 'function') {
      try {
        var required = require('../base.js');
        if (required && _typeof(required) === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }
    if (scope && _typeof(scope.cineModuleBase) === 'object') {
      return scope.cineModuleBase;
    }
    return null;
  }
  var MODULE_BASE = resolveModuleBase(GLOBAL_SCOPE);
  if (!MODULE_BASE) {
    return;
  }
  var freezeDeep = typeof MODULE_BASE.freezeDeep === 'function' ? MODULE_BASE.freezeDeep : function fallbackFreezeDeep(value) {
    if (!value || typeof value === 'function' || _typeof(value) !== 'object' && typeof value !== 'function') {
      return value;
    }
    var seen = new WeakSet();
    function freeze(target) {
      if (!target || _typeof(target) !== 'object' && typeof target !== 'function') {
        return target;
      }
      var isFunction = typeof target === 'function';
      if (seen.has(target)) {
        return target;
      }
      seen.add(target);
      if (isFunction) {
        try {
          Object.freeze(target);
        } catch (freezeError) {
          void freezeError;
        }
        return target;
      }
      try {
        var keys = Object.getOwnPropertyNames(target);
        for (var index = 0; index < keys.length; index += 1) {
          var key = keys[index];
          var child = void 0;
          try {
            child = target[key];
          } catch (accessError) {
            void accessError;
            child = undefined;
          }
          if (!child || typeof child === 'function' || _typeof(child) !== 'object' && typeof child !== 'function') {
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
  var exposeGlobal = typeof MODULE_BASE.exposeGlobal === 'function' ? function expose(name, value, options) {
    return MODULE_BASE.exposeGlobal(name, value, GLOBAL_SCOPE, options || {});
  } : function fallbackExpose(name, value) {
    try {
      GLOBAL_SCOPE[name] = value;
      return true;
    } catch (error) {
      void error;
      return false;
    }
  };
  var moduleRegistry = typeof MODULE_BASE.getModuleRegistry === 'function' ? MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE) : null;
  var registerOrQueueModule = typeof MODULE_BASE.registerOrQueueModule === 'function' ? function register(name, api, options, onError) {
    return MODULE_BASE.registerOrQueueModule(name, api, options, onError, GLOBAL_SCOPE, moduleRegistry);
  } : function fallbackRegister() {
    return false;
  };
  var SESSION_AUTO_BACKUP_NAME_PREFIX = 'auto-backup-';
  var SESSION_AUTO_BACKUP_DELETION_PREFIX = 'auto-backup-before-delete-';
  var BACKUP_STORAGE_KEY_PREFIXES = ['cameraPowerPlanner_', 'cinePowerPlanner_'];
  var BACKUP_VAULT_DB_NAME = 'cinePowerPlannerBackupVault';
  var BACKUP_VAULT_STORE_NAME = 'queuedBackups';
  var BACKUP_VAULT_DB_VERSION = 1;
  var BACKUP_VAULT_FALLBACK_STORAGE_KEY = 'cineBackupVaultFallbackRecords';
  var backupVaultDbPromise = null;
  var backupVaultTransientRecords = new Map();
  var fallbackVaultStorageInitialized = false;
  var fallbackVaultStorageReference = null;
  var fallbackVaultStorageType = 'none';
  var fallbackStorageRecordCount = 0;
  var memoryFallbackEntryCount = 0;
  var backupVaultFallbackMode = false;
  var backupVaultFallbackModeDetail = {
    storageType: 'indexeddb'
  };
  function setBackupVaultFallbackMode(active, detail) {
    var normalizedDetail = detail && _typeof(detail) === 'object' ? detail : {};
    var storageType = typeof normalizedDetail.storageType === 'string' ? normalizedDetail.storageType : active ? memoryFallbackEntryCount > 0 ? 'memory' : 'fallback' : 'indexeddb';
    var durable = storageType !== 'memory';
    var changed = backupVaultFallbackMode !== Boolean(active) || backupVaultFallbackModeDetail.storageType !== storageType;
    backupVaultFallbackMode = Boolean(active);
    backupVaultFallbackModeDetail = {
      storageType: storageType,
      durable: durable
    };
    if (changed) {
      dispatchBackupVaultEvent('cineBackupVault:fallbackChanged', {
        active: backupVaultFallbackMode,
        storageType: storageType,
        durable: durable
      });
    }
  }
  function refreshBackupVaultFallbackMode(detail) {
    var active = memoryFallbackEntryCount > 0 || fallbackStorageRecordCount > 0;
    var normalizedDetail = detail && _typeof(detail) === 'object' ? _objectSpread({}, detail) : {};
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
      durable: backupVaultFallbackModeDetail.durable
    };
  }
  function isBackupVaultFallbackActive() {
    return backupVaultFallbackMode;
  }
  function createMemoryBackupVault() {
    var entries = [];
    return {
      save: function save(record) {
        entries = entries.filter(function (entry) {
          return entry && entry.id !== record.id;
        });
        entries.push(_objectSpread({}, record));
        entries.sort(function (a, b) {
          var aTime = typeof a.createdAtMs === 'number' ? a.createdAtMs : 0;
          var bTime = typeof b.createdAtMs === 'number' ? b.createdAtMs : 0;
          return aTime - bTime;
        });
        memoryFallbackEntryCount = entries.length;
        refreshBackupVaultFallbackMode({
          storageType: 'memory'
        });
        return Promise.resolve({
          id: record.id,
          persisted: true,
          durable: false,
          storageType: 'memory'
        });
      },
      list: function list() {
        return Promise.resolve(entries.map(function (entry) {
          return _objectSpread({}, entry);
        }));
      },
      remove: function remove(id) {
        entries = entries.filter(function (entry) {
          return entry && entry.id !== id;
        });
        memoryFallbackEntryCount = entries.length;
        refreshBackupVaultFallbackMode(memoryFallbackEntryCount > 0 ? {
          storageType: 'memory'
        } : null);
        return Promise.resolve(true);
      }
    };
  }
  var memoryBackupVault = createMemoryBackupVault();
  function resetFallbackVaultStorageReference() {
    fallbackVaultStorageInitialized = false;
    fallbackVaultStorageReference = null;
    fallbackVaultStorageType = 'none';
  }
  function isStorageLike(candidate) {
    if (!candidate || _typeof(candidate) !== 'object') {
      return false;
    }
    return typeof candidate.getItem === 'function' && typeof candidate.setItem === 'function';
  }
  function getBackupVaultFallbackStorage() {
    if (fallbackVaultStorageInitialized && isStorageLike(fallbackVaultStorageReference)) {
      return {
        storage: fallbackVaultStorageReference,
        type: fallbackVaultStorageType
      };
    }
    var candidates = [function () {
      if (typeof getSafeLocalStorage === 'function') {
        try {
          return getSafeLocalStorage();
        } catch (error) {
          console.warn('getSafeLocalStorage threw while resolving backup vault fallback storage', error);
        }
      }
      return null;
    }, function () {
      if (typeof SAFE_LOCAL_STORAGE !== 'undefined' && SAFE_LOCAL_STORAGE) {
        return SAFE_LOCAL_STORAGE;
      }
      return null;
    }, function () {
      if (GLOBAL_SCOPE && GLOBAL_SCOPE.sessionStorage) {
        return GLOBAL_SCOPE.sessionStorage;
      }
      return null;
    }, function () {
      if (typeof sessionStorage !== 'undefined') {
        return sessionStorage;
      }
      return null;
    }, function () {
      if (GLOBAL_SCOPE && GLOBAL_SCOPE.localStorage) {
        return GLOBAL_SCOPE.localStorage;
      }
      return null;
    }, function () {
      if (typeof localStorage !== 'undefined') {
        return localStorage;
      }
      return null;
    }];
    for (var index = 0; index < candidates.length; index += 1) {
      var resolver = candidates[index];
      if (typeof resolver !== 'function') {
        continue;
      }
      var storage = null;
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
      fallbackVaultStorageType = index <= 1 ? 'safe-local-storage' : index <= 3 ? 'session-storage' : 'local-storage';
      return {
        storage: fallbackVaultStorageReference,
        type: fallbackVaultStorageType
      };
    }
    fallbackVaultStorageInitialized = true;
    fallbackVaultStorageReference = null;
    fallbackVaultStorageType = 'none';
    return {
      storage: null,
      type: 'none'
    };
  }
  function readFallbackVaultRecords() {
    var _getBackupVaultFallba = getBackupVaultFallbackStorage(),
      storage = _getBackupVaultFallba.storage;
    if (!isStorageLike(storage)) {
      fallbackStorageRecordCount = 0;
      refreshBackupVaultFallbackMode();
      return [];
    }
    var raw = null;
    try {
      raw = storage.getItem(BACKUP_VAULT_FALLBACK_STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to read fallback backup vault storage contents', error);
      resetFallbackVaultStorageReference();
      fallbackStorageRecordCount = 0;
      refreshBackupVaultFallbackMode(memoryFallbackEntryCount > 0 ? {
        storageType: 'memory'
      } : null);
      return [];
    }
    if (typeof raw !== 'string' || !raw) {
      fallbackStorageRecordCount = 0;
      refreshBackupVaultFallbackMode();
      return [];
    }
    var parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (parseError) {
      console.warn('Failed to parse fallback backup vault entries', parseError);
      fallbackStorageRecordCount = 0;
      refreshBackupVaultFallbackMode(memoryFallbackEntryCount > 0 ? {
        storageType: 'memory'
      } : null);
      return [];
    }
    if (!Array.isArray(parsed)) {
      fallbackStorageRecordCount = 0;
      refreshBackupVaultFallbackMode();
      return [];
    }
    var entries = [];
    for (var index = 0; index < parsed.length; index += 1) {
      var candidate = parsed[index];
      if (!candidate || _typeof(candidate) !== 'object' || typeof candidate.id !== 'string') {
        continue;
      }
      entries.push(_objectSpread({}, candidate));
    }
    fallbackStorageRecordCount = entries.length;
    refreshBackupVaultFallbackMode(entries.length > 0 ? {
      storageType: 'fallback'
    } : null);
    return entries;
  }
  function writeFallbackVaultRecords(records) {
    var _getBackupVaultFallba2 = getBackupVaultFallbackStorage(),
      storage = _getBackupVaultFallba2.storage;
    if (!isStorageLike(storage)) {
      fallbackStorageRecordCount = 0;
      refreshBackupVaultFallbackMode(memoryFallbackEntryCount > 0 ? {
        storageType: 'memory'
      } : null);
      return false;
    }
    var normalized = Array.isArray(records) ? records : [];
    var serialized = '[]';
    try {
      serialized = JSON.stringify(normalized);
    } catch (serializeError) {
      console.warn('Failed to serialize fallback backup vault entries', serializeError);
      return false;
    }
    try {
      storage.setItem(BACKUP_VAULT_FALLBACK_STORAGE_KEY, serialized);
      fallbackStorageRecordCount = normalized.length;
      refreshBackupVaultFallbackMode(normalized.length > 0 ? {
        storageType: 'fallback'
      } : null);
      return true;
    } catch (persistError) {
      console.warn('Failed to persist fallback backup vault entries', persistError);
      resetFallbackVaultStorageReference();
      refreshBackupVaultFallbackMode(memoryFallbackEntryCount > 0 ? {
        storageType: 'memory'
      } : null);
      return false;
    }
  }
  function persistFallbackVaultRecord(record) {
    var entries = readFallbackVaultRecords();
    var deduped = new Map();
    entries.forEach(function (entry) {
      if (!entry || _typeof(entry) !== 'object' || typeof entry.id !== 'string') {
        return;
      }
      deduped.set(entry.id, _objectSpread({}, entry));
    });
    deduped.set(record.id, _objectSpread({}, record));
    var updated = Array.from(deduped.values());
    updated.sort(function (a, b) {
      var aTime = typeof a.createdAtMs === 'number' ? a.createdAtMs : 0;
      var bTime = typeof b.createdAtMs === 'number' ? b.createdAtMs : 0;
      return aTime - bTime;
    });
    if (writeFallbackVaultRecords(updated)) {
      return Promise.resolve({
        id: record.id,
        persisted: true,
        durable: true,
        storageType: 'fallback'
      });
    }
    return memoryBackupVault.save(record);
  }
  function removeFallbackVaultRecordEntry(id) {
    if (!id) {
      return Promise.resolve(false);
    }
    var entries = readFallbackVaultRecords();
    if (!entries.length) {
      return Promise.resolve(false);
    }
    var filtered = entries.filter(function (entry) {
      return entry && entry.id !== id;
    });
    if (filtered.length === entries.length) {
      fallbackStorageRecordCount = entries.length;
      refreshBackupVaultFallbackMode(entries.length > 0 ? {
        storageType: 'fallback'
      } : null);
      return Promise.resolve(false);
    }
    var persisted = writeFallbackVaultRecords(filtered);
    return Promise.resolve(Boolean(persisted));
  }
  function combineBackupVaultRecordSets(indexedRecords, fallbackRecords, memoryRecords) {
    var deduped = new Map();
    var addRecords = function addRecords(records, storageType) {
      if (!Array.isArray(records)) {
        return;
      }
      records.forEach(function (record) {
        if (!record || _typeof(record) !== 'object' || typeof record.id !== 'string') {
          return;
        }
        var clone = _objectSpread(_objectSpread({}, record), {}, {
          storageType: storageType
        });
        if (storageType !== 'memory') {
          clone.durable = true;
        } else {
          clone.durable = false;
        }
        var existing = deduped.get(clone.id);
        if (!existing) {
          deduped.set(clone.id, clone);
          return;
        }
        var existingTime = typeof existing.createdAtMs === 'number' ? existing.createdAtMs : 0;
        var candidateTime = typeof clone.createdAtMs === 'number' ? clone.createdAtMs : 0;
        if (candidateTime >= existingTime) {
          deduped.set(clone.id, clone);
        }
      });
    };
    addRecords(indexedRecords, 'indexeddb');
    addRecords(fallbackRecords, 'fallback');
    addRecords(memoryRecords, 'memory');
    var entries = Array.from(deduped.values());
    entries.sort(function (a, b) {
      var aTime = typeof a.createdAtMs === 'number' ? a.createdAtMs : 0;
      var bTime = typeof b.createdAtMs === 'number' ? b.createdAtMs : 0;
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
    backupVaultDbPromise = new Promise(function (resolve) {
      var resolved = false;
      try {
        var request = indexedDB.open(BACKUP_VAULT_DB_NAME, BACKUP_VAULT_DB_VERSION);
        request.addEventListener('upgradeneeded', function (event) {
          var db = event.target.result;
          if (!db.objectStoreNames.contains(BACKUP_VAULT_STORE_NAME)) {
            var store = db.createObjectStore(BACKUP_VAULT_STORE_NAME, {
              keyPath: 'id'
            });
            store.createIndex('createdAtMs', 'createdAtMs', {
              unique: false
            });
          }
        });
        request.addEventListener('success', function () {
          var db = request.result;
          resolved = true;
          resolve(db);
        });
        request.addEventListener('error', function () {
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
    return openBackupVaultDb().then(function (db) {
      if (!db) {
        return executor(null);
      }
      return new Promise(function (resolve, reject) {
        var completed = false;
        try {
          var transaction = db.transaction(BACKUP_VAULT_STORE_NAME, mode);
          var store = transaction.objectStore(BACKUP_VAULT_STORE_NAME);
          var result = executor(store, transaction);
          transaction.addEventListener('complete', function () {
            if (completed) {
              return;
            }
            completed = true;
            resolve(result);
          });
          transaction.addEventListener('error', function () {
            if (completed) {
              return;
            }
            completed = true;
            reject(transaction.error);
          });
        } catch (transactionError) {
          reject(transactionError);
        }
      }).catch(function (error) {
        console.warn('Backup vault IndexedDB transaction failed', error);
        return executor(null);
      });
    });
  }
  function ensureVaultRecordMetadata(metadata) {
    var source = metadata && typeof metadata.source === 'string' && metadata.source ? metadata.source : 'automatic';
    var reason = metadata && typeof metadata.reason === 'string' && metadata.reason ? metadata.reason : 'unknown';
    var permissionState = metadata && typeof metadata.permissionState === 'string' && metadata.permissionState ? metadata.permissionState : 'unknown';
    var createdAtIso = metadata && typeof metadata.createdAt === 'string' && metadata.createdAt ? metadata.createdAt : new Date().toISOString();
    var createdAtMs = metadata && typeof metadata.createdAtMs === 'number' && Number.isFinite(metadata.createdAtMs) ? metadata.createdAtMs : Date.now();
    return {
      source: source,
      reason: reason,
      permissionState: permissionState,
      createdAt: createdAtIso,
      createdAtMs: createdAtMs
    };
  }
  function createBackupVaultRecord(fileName, payload) {
    var metadata = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var normalizedFileName = typeof fileName === 'string' && fileName ? fileName : 'cine-power-planner-backup.json';
    var recordMetadata = ensureVaultRecordMetadata(metadata);
    var recordId = metadata && typeof metadata.id === 'string' && metadata.id ? metadata.id : "queued-".concat(recordMetadata.createdAtMs, "-").concat(Math.random().toString(16).slice(2, 10));
    return {
      id: recordId,
      fileName: normalizedFileName,
      payload: payload,
      createdAt: recordMetadata.createdAt,
      createdAtMs: recordMetadata.createdAtMs,
      metadata: {
        source: recordMetadata.source,
        reason: recordMetadata.reason,
        permissionState: recordMetadata.permissionState
      }
    };
  }
  function persistBackupVaultRecord(record) {
    if (!record || _typeof(record) !== 'object' || !record.id) {
      return Promise.resolve(null);
    }
    return withBackupVaultStore('readwrite', function (store) {
      if (!store) {
        return persistFallbackVaultRecord(record);
      }
      return new Promise(function (resolve, reject) {
        try {
          var request = store.put(record);
          request.addEventListener('success', function () {
            refreshBackupVaultFallbackMode({
              storageType: 'indexeddb'
            });
            resolve({
              id: record.id,
              persisted: true,
              durable: true,
              storageType: 'indexeddb'
            });
          });
          request.addEventListener('error', function () {
            reject(request.error);
          });
        } catch (putError) {
          reject(putError);
        }
      }).catch(function (error) {
        console.warn('Failed to persist backup vault record to IndexedDB', error);
        return persistFallbackVaultRecord(record);
      });
    }).catch(function (error) {
      console.warn('Backup vault persistence failed', error);
      return persistFallbackVaultRecord(record);
    });
  }
  function listBackupVaultRecords() {
    var indexedPromise = withBackupVaultStore('readonly', function (store) {
      if (!store) {
        return [];
      }
      return new Promise(function (resolve, reject) {
        try {
          var request = store.getAll();
          request.addEventListener('success', function () {
            resolve(Array.isArray(request.result) ? request.result : []);
          });
          request.addEventListener('error', function () {
            reject(request.error);
          });
        } catch (getAllError) {
          reject(getAllError);
        }
      }).catch(function (error) {
        console.warn('Failed to read backup vault records from IndexedDB', error);
        return [];
      });
    }).catch(function (error) {
      console.warn('Backup vault record enumeration failed', error);
      return [];
    });
    var fallbackPromise = Promise.resolve().then(function () {
      return readFallbackVaultRecords();
    }).catch(function (error) {
      console.warn('Failed to enumerate fallback backup vault records', error);
      return [];
    });
    var memoryPromise = memoryBackupVault.list().catch(function () {
      return [];
    });
    return Promise.all([indexedPromise, fallbackPromise, memoryPromise]).then(function (results) {
      var _results = _slicedToArray(results, 3),
        indexedRecords = _results[0],
        fallbackRecords = _results[1],
        memoryRecords = _results[2];
      return combineBackupVaultRecordSets(indexedRecords, fallbackRecords, memoryRecords);
    });
  }
  function removeBackupVaultRecord(id) {
    if (!id) {
      return Promise.resolve(false);
    }
    backupVaultTransientRecords.delete(id);
    var indexedRemoval = withBackupVaultStore('readwrite', function (store) {
      if (!store) {
        return false;
      }
      return new Promise(function (resolve, reject) {
        try {
          var request = store.delete(id);
          request.addEventListener('success', function () {
            refreshBackupVaultFallbackMode();
            resolve(true);
          });
          request.addEventListener('error', function () {
            reject(request.error);
          });
        } catch (deleteError) {
          reject(deleteError);
        }
      }).catch(function (error) {
        console.warn('Failed to remove backup vault record from IndexedDB', error);
        return false;
      });
    }).catch(function (error) {
      console.warn('Backup vault record removal failed', error);
      return false;
    });
    return Promise.all([Promise.resolve(indexedRemoval), removeFallbackVaultRecordEntry(id), memoryBackupVault.remove(id)]).then(function (results) {
      var removed = results.some(function (result) {
        return Boolean(result);
      });
      if (!removed) {
        refreshBackupVaultFallbackMode();
      }
      return removed;
    });
  }
  function clearBackupVault() {
    var dbDeletionPromise = new Promise(function (resolve, reject) {
      if (!isIndexedDBAvailable()) {
        resolve(true);
        return;
      }
      if (backupVaultDbPromise) {
        backupVaultDbPromise.then(function (db) {
          if (db && typeof db.close === 'function') {
            try {
              db.close();
            } catch (closeError) {
              console.warn('Failed to close backup vault DB before deletion', closeError);
            }
          }
        }).catch(function () {});
        backupVaultDbPromise = null;
      }
      try {
        var request = indexedDB.deleteDatabase(BACKUP_VAULT_DB_NAME);
        request.addEventListener('success', function () {
          resolve(true);
        });
        request.addEventListener('error', function () {
          console.warn('Failed to delete backup vault database', request.error);
          withBackupVaultStore('readwrite', function (store) {
            if (!store) return false;
            return new Promise(function (clearResolve, clearReject) {
              var clearRequest = store.clear();
              clearRequest.onsuccess = function () {
                return clearResolve(true);
              };
              clearRequest.onerror = function () {
                return clearReject(clearRequest.error);
              };
            });
          }).then(resolve).catch(reject);
        });
        request.addEventListener('blocked', function () {
          console.warn('Backup vault database deletion blocked');
        });
      } catch (deleteError) {
        reject(deleteError);
      }
    });
    return Promise.all([dbDeletionPromise, writeFallbackVaultRecords([]), memoryBackupVault.list().then(function (list) {
      return Promise.all(list.map(function (item) {
        return memoryBackupVault.remove(item.id);
      }));
    })]).then(function () {
      refreshBackupVaultFallbackMode();
      backupVaultTransientRecords.clear();
      return true;
    }).catch(function (error) {
      console.warn('clearBackupVault encountered errors', error);
      return true;
    });
  }
  function dispatchBackupVaultEvent(type, detail) {
    if (!type) {
      return;
    }
    var targets = [];
    if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.dispatchEvent === 'function') {
      targets.push(GLOBAL_SCOPE);
    }
    if (GLOBAL_SCOPE && GLOBAL_SCOPE.document && typeof GLOBAL_SCOPE.document.dispatchEvent === 'function') {
      targets.push(GLOBAL_SCOPE.document);
    }
    if (GLOBAL_SCOPE && GLOBAL_SCOPE.window && typeof GLOBAL_SCOPE.window.dispatchEvent === 'function') {
      targets.push(GLOBAL_SCOPE.window);
    }
    var CustomEventCtor = typeof CustomEvent === 'function' ? CustomEvent : null;
    targets.forEach(function (target) {
      if (!target || typeof target.dispatchEvent !== 'function') {
        return;
      }
      try {
        if (CustomEventCtor) {
          target.dispatchEvent(new CustomEvent(type, {
            detail: detail
          }));
        } else if (typeof Event === 'function') {
          var event = new Event(type);
          event.detail = detail;
          target.dispatchEvent(event);
        }
      } catch (dispatchError) {
        console.warn('Failed to dispatch backup vault event', dispatchError);
      }
    });
  }
  function getQueuedBackupPayloads() {
    return listBackupVaultRecords().then(function (records) {
      var deduped = new Map();
      if (Array.isArray(records)) {
        records.forEach(function (record) {
          if (!record || !record.id || deduped.has(record.id)) {
            return;
          }
          deduped.set(record.id, _objectSpread({}, record));
        });
      }
      backupVaultTransientRecords.forEach(function (record, id) {
        if (!deduped.has(id)) {
          var clone = _objectSpread({}, record);
          if (typeof clone.storageType !== 'string') {
            clone.storageType = 'transient';
          }
          if (typeof clone.durable !== 'boolean') {
            clone.durable = false;
          }
          deduped.set(id, clone);
        }
      });
      var entries = Array.from(deduped.values());
      entries.sort(function (a, b) {
        var aTime = typeof a.createdAtMs === 'number' ? a.createdAtMs : 0;
        var bTime = typeof b.createdAtMs === 'number' ? b.createdAtMs : 0;
        return aTime - bTime;
      });
      return entries;
    });
  }
  function queueBackupPayloadForVault(fileName, payload, metadata) {
    var record = createBackupVaultRecord(fileName, payload, metadata || {});
    backupVaultTransientRecords.set(record.id, _objectSpread({}, record));
    try {
      persistBackupVaultRecord(record).then(function (result) {
        backupVaultTransientRecords.delete(record.id);
        if (result && result.durable === false) {
          console.warn('Backup vault record stored using non-durable fallback storage.', result);
        }
      }).catch(function (error) {
        console.warn('Failed to persist queued backup payload. Using in-memory vault fallback.', error);
      });
    } catch (persistError) {
      console.warn('Queued backup persistence threw unexpectedly', persistError);
    }
    dispatchBackupVaultEvent('cineBackupVault:queued', {
      id: record.id,
      fileName: record.fileName,
      createdAt: record.createdAt,
      metadata: record.metadata
    });
    return record;
  }
  function resolveBackupTexts() {
    var textsSource = GLOBAL_SCOPE && _typeof(GLOBAL_SCOPE.texts) === 'object' ? GLOBAL_SCOPE.texts : null;
    var langCandidate = GLOBAL_SCOPE && typeof GLOBAL_SCOPE.currentLang === 'string' ? GLOBAL_SCOPE.currentLang : GLOBAL_SCOPE && typeof GLOBAL_SCOPE.appLanguage === 'string' ? GLOBAL_SCOPE.appLanguage : 'en';
    var lang = langCandidate && typeof langCandidate === 'string' ? langCandidate : 'en';
    var langTexts = textsSource && textsSource[lang] ? textsSource[lang] : null;
    var fallbackTexts = textsSource && textsSource.en ? textsSource.en : null;
    return {
      langTexts: langTexts,
      fallbackTexts: fallbackTexts
    };
  }
  function resolveQueuedBackupMessage(fileName) {
    var _resolveBackupTexts = resolveBackupTexts(),
      langTexts = _resolveBackupTexts.langTexts,
      fallbackTexts = _resolveBackupTexts.fallbackTexts;
    var template = langTexts && langTexts.queuedBackupDownloadDeferred || fallbackTexts && fallbackTexts.queuedBackupDownloadDeferred || 'Automatic downloads were blocked. The backup was saved to the local vault.';
    return template.replace('{fileName}', fileName || 'cine-power-planner-backup.json');
  }
  function resolveBackupVaultEmptyMessage() {
    var _resolveBackupTexts2 = resolveBackupTexts(),
      langTexts = _resolveBackupTexts2.langTexts,
      fallbackTexts = _resolveBackupTexts2.fallbackTexts;
    return langTexts && langTexts.queuedBackupVaultEmpty || fallbackTexts && fallbackTexts.queuedBackupVaultEmpty || 'No queued backups are stored in the local vault.';
  }
  function resolveBackupVaultWindowTitle() {
    var _resolveBackupTexts3 = resolveBackupTexts(),
      langTexts = _resolveBackupTexts3.langTexts,
      fallbackTexts = _resolveBackupTexts3.fallbackTexts;
    return langTexts && langTexts.queuedBackupVaultTitle || fallbackTexts && fallbackTexts.queuedBackupVaultTitle || 'Local backup vault';
  }
  function resolveBackupVaultWindowIntro() {
    var _resolveBackupTexts4 = resolveBackupTexts(),
      langTexts = _resolveBackupTexts4.langTexts,
      fallbackTexts = _resolveBackupTexts4.fallbackTexts;
    return langTexts && langTexts.queuedBackupVaultIntro || fallbackTexts && fallbackTexts.queuedBackupVaultIntro || 'Automatic downloads were blocked. Use the actions below to export or copy each backup while offline.';
  }
  function openQueuedBackupVaultWindow() {
    return getQueuedBackupPayloads().then(function (records) {
      if (!records || !records.length) {
        var message = resolveBackupVaultEmptyMessage();
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
      var vaultWindow = null;
      try {
        vaultWindow = window.open('', 'cineBackupVault', 'noopener,noreferrer,width=780,height=720');
      } catch (openError) {
        console.warn('Failed to open local backup vault window', openError);
        vaultWindow = null;
      }
      if (!vaultWindow) {
        var _message = resolveBackupTexts().fallbackTexts && resolveBackupTexts().fallbackTexts.queuedBackupVaultPopupBlocked ? resolveBackupTexts().fallbackTexts.queuedBackupVaultPopupBlocked : 'Enable pop-ups to review queued backups stored in the local vault.';
        if (typeof GLOBAL_SCOPE.showNotification === 'function') {
          try {
            GLOBAL_SCOPE.showNotification('error', _message);
          } catch (notifyError) {
            void notifyError;
          }
        }
        if (typeof alert === 'function') {
          try {
            alert(_message);
          } catch (alertError) {
            void alertError;
          }
        }
        return false;
      }
      var title = resolveBackupVaultWindowTitle();
      var intro = resolveBackupVaultWindowIntro();
      var serializedRecords = JSON.stringify(records.map(function (record) {
        return {
          id: record.id,
          fileName: record.fileName,
          createdAt: record.createdAt,
          createdAtMs: record.createdAtMs,
          metadata: record.metadata,
          payload: record.payload
        };
      }));
      var escapedSerializedRecords = serializedRecords.replace(/</g, "\\u003c");
      var emptyMessage = resolveBackupVaultEmptyMessage();
      var bootstrapScript = "(() => {\n" + "  'use strict';\n" + "  try {\n" + "    var source = document.getElementById('queued-backups');\n" + "    var records = [];\n" + "    if (source) {\n" + "      var text = source.textContent || '';\n" + "      var parsed = JSON.parse(text);\n" + "      if (Array.isArray(parsed)) {\n" + "        records = parsed;\n" + "      }\n" + "    }\n" + "    var container = document.getElementById('vault');\n" + "    if (!container) {\n" + "      return;\n" + "    }\n" + "    if (!records.length) {\n" + "      var empty = document.createElement('p');\n" + "      empty.className = 'empty';\n" + "      empty.textContent = ".concat(JSON.stringify(emptyMessage), ";\n") + "      container.appendChild(empty);\n" + "      return;\n" + "    }\n" + "    records.forEach(function (record) {\n" + "      var entry = document.createElement('section');\n" + "      entry.className = 'backup-entry';\n" + "      var header = document.createElement('header');\n" + "      var heading = document.createElement('h2');\n" + "      heading.textContent = String(record.fileName || 'cine-power-planner-backup.json') + ' \u2014 ' + String(record.createdAt || '');\n" + "      header.appendChild(heading);\n" + "      var downloadButton = document.createElement('button');\n" + "      downloadButton.type = 'button';\n" + "      downloadButton.textContent = 'Download JSON';\n" + "      downloadButton.addEventListener('click', function () {\n" + "        try {\n" + "          var blob = new Blob([record.payload], { type: 'application/json' });\n" + "          var url = URL.createObjectURL(blob);\n" + "          var link = document.createElement('a');\n" + "          link.href = url;\n" + "          link.download = record.fileName || 'cine-power-planner-backup.json';\n" + "          link.click();\n" + "          setTimeout(function () { URL.revokeObjectURL(url); }, 0);\n" + "        } catch (error) {\n" + "          alert('Download blocked \u2014 copy the JSON below instead.');\n" + "        }\n" + "      });\n" + "      header.appendChild(downloadButton);\n" + "      entry.appendChild(header);\n" + "      var textArea = document.createElement('textarea');\n" + "      textArea.readOnly = true;\n" + "      textArea.value = record.payload;\n" + "      entry.appendChild(textArea);\n" + "      container.appendChild(entry);\n" + "    });\n" + "  } catch (error) {\n" + "    console.error('Failed to bootstrap queued backup vault', error);\n" + "  }\n" + "})();";
      var bootstrapScriptSrc = "data:text/javascript;charset=utf-8,".concat(encodeURIComponent(bootstrapScript));
      var popupBlockedMessage = resolveBackupTexts().fallbackTexts && resolveBackupTexts().fallbackTexts.queuedBackupVaultPopupBlocked ? resolveBackupTexts().fallbackTexts.queuedBackupVaultPopupBlocked : 'Enable pop-ups to review queued backups stored in the local vault.';
      var doc = vaultWindow.document;
      try {
        doc.open();
        doc.write("<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"utf-8\" />\n" + "<title>".concat(title, "</title>\n") + "<style>\n" + ":root { color-scheme: light dark; font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif; }\n" + "body { margin: 0; padding: 1.5rem; background: #0f1624; color: #f5f7fb; }\n" + "h1 { margin-top: 0; font-size: 1.5rem; }\n" + "p { line-height: 1.6; max-width: 38rem; }\n" + ".backup-entry { background: rgba(15, 22, 36, 0.65); border: 1px solid rgba(111, 120, 141, 0.35); border-radius: 1rem; padding: 1rem; margin-top: 1rem; }\n" + ".backup-entry header { display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: baseline; justify-content: space-between; }\n" + ".backup-entry h2 { font-size: 1rem; margin: 0; }\n" + ".backup-entry button { background: #ffbf3c; border: none; border-radius: 999px; padding: 0.5rem 1.25rem; font-weight: 600; cursor: pointer; color: #11131a; }\n" + ".backup-entry button:focus { outline: 2px solid #ffffff; outline-offset: 2px; }\n" + ".backup-entry textarea { width: 100%; min-height: 10rem; margin-top: 0.75rem; border-radius: 0.75rem; border: 1px solid rgba(255, 255, 255, 0.12); padding: 0.75rem; background: rgba(6, 10, 18, 0.92); color: #f5f7fb; font-family: 'Fira Code', 'SFMono-Regular', 'Consolas', 'Menlo', monospace; }\n" + ".empty { margin-top: 2rem; font-style: italic; color: rgba(245, 247, 251, 0.7); }\n" + ".banner { margin-bottom: 1.5rem; padding: 1rem 1.25rem; border-radius: 1rem; background: rgba(255, 191, 60, 0.18); border: 1px solid rgba(255, 191, 60, 0.4); color: #ffe3a4; }\n" + ".banner strong { display: block; font-size: 1.1rem; margin-bottom: 0.35rem; }\n" + "</style>\n" + "</head><body>\n" + "<div class=\"banner\"><strong>".concat(title, "</strong><p>").concat(intro, "</p></div>\n") + "<main id=\"vault\"></main>\n" + "<script type=\"application/json\" id=\"queued-backups\">".concat(escapedSerializedRecords, "</script>\n") + "<script src=\"".concat(bootstrapScriptSrc, "\"></script>\n") + "</body></html>");
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
  var BACKUP_STORAGE_KNOWN_KEYS = new Set(['darkMode', 'pinkMode', 'highContrast', 'showAutoBackups', 'accentColor', 'fontSize', 'fontFamily', 'customLogo', 'cineRentalPrintSections', 'language']);
  if (typeof IOS_PWA_HELP_STORAGE_KEY === 'string' && IOS_PWA_HELP_STORAGE_KEY) {
    BACKUP_STORAGE_KNOWN_KEYS.add(IOS_PWA_HELP_STORAGE_KEY);
  } else if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.IOS_PWA_HELP_STORAGE_KEY === 'string' && GLOBAL_SCOPE.IOS_PWA_HELP_STORAGE_KEY) {
    BACKUP_STORAGE_KNOWN_KEYS.add(GLOBAL_SCOPE.IOS_PWA_HELP_STORAGE_KEY);
  } else {
    BACKUP_STORAGE_KNOWN_KEYS.add('iosPwaHelpShown');
  }
  var BACKUP_METADATA_BASE_KEYS = new Set(['settings', 'storage', 'localStorage', 'values', 'entries', 'sessionStorage', 'sessionState', 'sessionEntries', 'payload', 'plannerData', 'allData', 'generatedAt', 'version', 'appVersion', 'applicationVersion']);
  var BACKUP_DATA_KEYS = ['devices', 'setups', 'session', 'feedback', 'project', 'projects', 'gearList', 'favorites', 'documentationTracker', 'ownGear', 'autoGearRules', 'autoGearSeeded', 'autoGearBackups', 'autoGearPresets', 'autoGearMonitorDefaults', 'autoGearActivePresetId', 'autoGearAutoPresetId', 'autoGearShowBackups', 'autoGearBackupRetention', 'customLogo', 'customFonts', 'contacts', 'userProfile', 'preferences', 'schemaCache', 'fullBackupHistory', 'fullBackups', 'documentationTracker'];
  var BACKUP_DATA_COMPLEX_KEYS = new Set(['devices', 'setups', 'session', 'sessions', 'feedback', 'project', 'projects', 'gearList', 'favorites', 'documentationTracker', 'ownGear', 'autoGearRules', 'autoGearBackups', 'autoGearPresets', 'autoGearMonitorDefaults', 'contacts', 'userProfile', 'preferences', 'fullBackupHistory', 'fullBackups', 'customFonts', 'documentationTracker']);
  var FALLBACK_STORAGE_KEYS = function () {
    var keys = new Set();
    if (BACKUP_STORAGE_KNOWN_KEYS && typeof BACKUP_STORAGE_KNOWN_KEYS.forEach === 'function') {
      BACKUP_STORAGE_KNOWN_KEYS.forEach(function (key) {
        if (typeof key === 'string' && key) {
          keys.add(key);
        }
      });
    }
    BACKUP_STORAGE_KEY_PREFIXES.forEach(function (prefix) {
      if (typeof prefix !== 'string' || !prefix) {
        return;
      }
      BACKUP_DATA_KEYS.forEach(function (name) {
        if (typeof name !== 'string' || !name) {
          return;
        }
        keys.add("".concat(prefix).concat(name));
      });
    });
    return keys;
  }();
  function isPlainObject(value) {
    if (value === null || _typeof(value) !== 'object') {
      return false;
    }
    if (Array.isArray(value)) {
      return false;
    }
    var tag = Object.prototype.toString.call(value);
    if (tag !== '[object Object]') {
      return false;
    }
    var prototype;
    try {
      prototype = Object.getPrototypeOf(value);
    } catch (error) {
      void error;
      return false;
    }
    return prototype === null || prototype === Object.prototype;
  }
  function isMapLike(value) {
    if (!value || _typeof(value) !== 'object') {
      return false;
    }
    var tag = Object.prototype.toString.call(value);
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
    return typeof value.size === 'number' && typeof value.entries === 'function' && typeof value.forEach === 'function' && typeof value.get === 'function' && typeof value.set === 'function';
  }
  function convertMapLikeKey(key) {
    if (typeof key === 'string') {
      return key;
    }
    if (typeof key === 'number' || typeof key === 'boolean' || typeof key === 'bigint') {
      return String(key);
    }
    if (_typeof(key) === 'symbol') {
      return key.description || key.toString();
    }
    if (key && _typeof(key) === 'object') {
      try {
        var json = JSON.stringify(key);
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
    var snapshot = Object.create(null);
    var assignEntry = function assignEntry(rawKey, value) {
      var key = convertMapLikeKey(rawKey);
      if (key === null || key === undefined) {
        return;
      }
      if (Object.prototype.hasOwnProperty.call(snapshot, key)) {
        return;
      }
      snapshot[key] = value;
    };
    var iterated = false;
    if (typeof mapLike.entries === 'function') {
      try {
        var iterator = mapLike.entries();
        if (iterator && typeof iterator.next === 'function') {
          for (var step = iterator.next(); !step.done; step = iterator.next()) {
            var entry = step && step.value;
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
        mapLike.forEach(function (value, key) {
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
    var safeDate = date instanceof Date && !Number.isNaN(date.valueOf()) ? date : new Date();
    var pad = function pad(value) {
      return String(value).padStart(2, '0');
    };
    var year = safeDate.getFullYear();
    var month = pad(safeDate.getMonth() + 1);
    var day = pad(safeDate.getDate());
    var hours = pad(safeDate.getHours());
    var minutes = pad(safeDate.getMinutes());
    var seconds = pad(safeDate.getSeconds());
    var offsetMinutes = safeDate.getTimezoneOffset();
    var offsetSuffix = 'Z';
    if (offsetMinutes !== 0) {
      var sign = offsetMinutes > 0 ? '-' : '+';
      var abs = Math.abs(offsetMinutes);
      var offsetHours = pad(Math.floor(abs / 60));
      var offsetMins = pad(abs % 60);
      offsetSuffix = "".concat(sign).concat(offsetHours, ":").concat(offsetMins);
    }
    var iso = "".concat(year, "-").concat(month, "-").concat(day, "T").concat(hours, ":").concat(minutes, ":").concat(seconds).concat(offsetSuffix);
    var safeIso = iso.replace(/[:]/g, '-');
    return {
      iso: iso,
      fileName: "".concat(safeIso, " full app backup.json")
    };
  }
  function resolveSafeLocalStorage() {
    if (typeof getSafeLocalStorage === 'function') {
      try {
        var storage = getSafeLocalStorage();
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
    var snapshot = Object.create(null);
    if (!storage) return snapshot;
    var assignEntry = function assignEntry(key, valueOrGetter) {
      if (typeof key !== 'string' || !key) {
        return;
      }
      if (Object.prototype.hasOwnProperty.call(snapshot, key)) {
        return;
      }
      try {
        var value = typeof valueOrGetter === 'function' ? valueOrGetter() : valueOrGetter;
        snapshot[key] = value;
      } catch (error) {
        console.warn('Failed to read storage entry for backup', key, error);
      }
    };
    var tryEnumerateByIndex = function tryEnumerateByIndex() {
      if (typeof storage.key !== 'function' || typeof storage.length !== 'number') {
        return false;
      }
      var length = 0;
      try {
        length = Number(storage.length) || 0;
      } catch (lengthError) {
        console.warn('Failed to inspect storage length for backup snapshot', lengthError);
        return true;
      }
      var _loop = function _loop() {
        var key;
        try {
          key = storage.key(i);
        } catch (keyError) {
          console.warn('Failed to access storage key for backup snapshot', keyError);
          return 1;
        }
        assignEntry(key, function () {
          return storage.getItem(key);
        });
      };
      for (var i = 0; i < length; i += 1) {
        if (_loop()) continue;
      }
      return true;
    };
    var tryEnumerateByKeys = function tryEnumerateByKeys() {
      if (typeof storage.keys !== 'function') {
        return false;
      }
      var keys;
      try {
        keys = storage.keys();
      } catch (keysError) {
        console.warn('Failed to enumerate storage keys for backup snapshot', keysError);
        return true;
      }
      if (!keys) {
        return true;
      }
      var iterate = function iterate(list) {
        if (!list) return;
        if (typeof list.forEach === 'function') {
          list.forEach(function (key) {
            return assignEntry(key, function () {
              return storage.getItem(key);
            });
          });
        } else if (typeof list[Symbol.iterator] === 'function') {
          var _iterator = _createForOfIteratorHelper(list),
            _step;
          try {
            var _loop2 = function _loop2() {
              var key = _step.value;
              assignEntry(key, function () {
                return storage.getItem(key);
              });
            };
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              _loop2();
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      };
      iterate(keys);
      return true;
    };
    var tryEnumerateByForEach = function tryEnumerateByForEach() {
      if (typeof storage.forEach !== 'function') {
        return false;
      }
      try {
        storage.forEach(function (value, key) {
          assignEntry(key, value);
        });
      } catch (error) {
        console.warn('Failed to iterate storage for backup snapshot', error);
      }
      return true;
    };
    var enumerated = false;
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
      FALLBACK_STORAGE_KEYS.forEach(function (key) {
        assignEntry(key, function () {
          return storage.getItem(key);
        });
      });
    }
    return snapshot;
  }
  function createSafeStorageReader(storage, errorMessagePrefix) {
    if (!storage || typeof storage.getItem !== 'function') {
      return function () {
        return null;
      };
    }
    var message = typeof errorMessagePrefix === 'string' && errorMessagePrefix ? errorMessagePrefix : 'Failed to read storage key';
    return function (key) {
      if (typeof key !== 'string') {
        return null;
      }
      try {
        return storage.getItem(key);
      } catch (error) {
        console.warn("".concat(message), key, error);
        return null;
      }
    };
  }
  function restoreSessionStorageSnapshot(snapshot) {
    if (typeof sessionStorage === 'undefined' || !sessionStorage) {
      return;
    }
    var entries = snapshot && _typeof(snapshot) === 'object' ? Object.entries(snapshot) : [];
    var retainedKeys = new Set(entries.map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 1),
        key = _ref2[0];
      return key;
    }));
    var keysToRemove = [];
    try {
      var _sessionStorage = sessionStorage,
        length = _sessionStorage.length;
      for (var i = 0; i < length; i += 1) {
        var key = sessionStorage.key(i);
        if (typeof key !== 'string') continue;
        if (!retainedKeys.has(key)) {
          keysToRemove.push(key);
        }
      }
    } catch (error) {
      console.warn('Failed to inspect sessionStorage during restore rollback', error);
    }
    keysToRemove.forEach(function (key) {
      try {
        sessionStorage.removeItem(key);
      } catch (removeError) {
        console.warn('Failed to remove sessionStorage key during restore rollback', key, removeError);
      }
    });
    entries.forEach(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
        key = _ref4[0],
        value = _ref4[1];
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
    if (_typeof(value) === 'object') {
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
    var source = section;
    if (isMapLike(source)) {
      var converted = convertMapLikeToObject(source);
      if (converted) {
        source = converted;
      }
    }
    if (typeof source === 'string') {
      var parsed = null;
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
    var snapshot = Object.create(null);
    var assignEntry = function assignEntry(key, value) {
      if (typeof key !== 'string' || !key) return;
      snapshot[key] = normalizeStoredValue(value);
    };
    if (Array.isArray(source)) {
      source.forEach(function (entry) {
        if (!entry) return;
        if (Array.isArray(entry)) {
          assignEntry(entry[0], entry[1]);
          return;
        }
        if (_typeof(entry) === 'object') {
          if (typeof entry.key === 'string') {
            var _ref5, _ref6, _ref7, _entry$value;
            assignEntry(entry.key, (_ref5 = (_ref6 = (_ref7 = (_entry$value = entry.value) !== null && _entry$value !== void 0 ? _entry$value : entry.val) !== null && _ref7 !== void 0 ? _ref7 : entry.data) !== null && _ref6 !== void 0 ? _ref6 : entry.content) !== null && _ref5 !== void 0 ? _ref5 : entry.string);
            return;
          }
          if (typeof entry.name === 'string') {
            var _ref8, _ref9, _ref0, _entry$value2;
            assignEntry(entry.name, (_ref8 = (_ref9 = (_ref0 = (_entry$value2 = entry.value) !== null && _entry$value2 !== void 0 ? _entry$value2 : entry.val) !== null && _ref0 !== void 0 ? _ref0 : entry.data) !== null && _ref9 !== void 0 ? _ref9 : entry.content) !== null && _ref8 !== void 0 ? _ref8 : entry.string);
            return;
          }
          if (Array.isArray(entry.entry)) {
            assignEntry(entry.entry[0], entry.entry[1]);
          }
        }
      });
    } else if (isPlainObject(source)) {
      Object.entries(source).forEach(function (_ref1) {
        var _ref10 = _slicedToArray(_ref1, 2),
          key = _ref10[0],
          value = _ref10[1];
        assignEntry(key, value);
      });
    } else {
      return null;
    }
    return Object.keys(snapshot).length ? snapshot : null;
  }
  function extractFirstMatchingSnapshot(source, keys) {
    var resolvedSource = source;
    if (!isPlainObject(resolvedSource)) {
      if (isMapLike(resolvedSource)) {
        var converted = convertMapLikeToObject(resolvedSource);
        if (converted && isPlainObject(converted)) {
          resolvedSource = converted;
        } else {
          return {
            snapshot: null,
            keyUsed: null
          };
        }
      } else {
        return {
          snapshot: null,
          keyUsed: null
        };
      }
    }
    for (var index = 0; index < keys.length; index += 1) {
      var key = keys[index];
      if (!Object.prototype.hasOwnProperty.call(resolvedSource, key)) continue;
      var snapshot = convertEntriesToSnapshot(resolvedSource[key]);
      if (snapshot) {
        return {
          snapshot: snapshot,
          keyUsed: key
        };
      }
    }
    return {
      snapshot: null,
      keyUsed: null
    };
  }
  function looksLikeStoredSettingKey(key) {
    if (BACKUP_STORAGE_KNOWN_KEYS.has(key)) {
      return true;
    }
    return BACKUP_STORAGE_KEY_PREFIXES.some(function (prefix) {
      return key.startsWith(prefix);
    });
  }
  function restoreLocalStorageSnapshot(storage, snapshot) {
    if (!storage || typeof storage.setItem !== 'function') {
      return;
    }
    var entries = snapshot && _typeof(snapshot) === 'object' ? Object.entries(snapshot) : [];
    var targetKeys = new Set(entries.map(function (_ref11) {
      var _ref12 = _slicedToArray(_ref11, 1),
        key = _ref12[0];
      return key;
    }));
    var keysToRemove = [];
    try {
      var length = storage.length;
      for (var i = 0; i < length; i += 1) {
        var key = storage.key(i);
        if (typeof key !== 'string') continue;
        if (!targetKeys.has(key) && looksLikeStoredSettingKey(key)) {
          keysToRemove.push(key);
        }
      }
    } catch (error) {
      console.warn('Failed to inspect storage during restore rollback', error);
    }
    keysToRemove.forEach(function (key) {
      try {
        storage.removeItem(key);
      } catch (removeError) {
        console.warn('Failed to remove storage key during restore rollback', key, removeError);
      }
    });
    entries.forEach(function (_ref13) {
      var _ref14 = _slicedToArray(_ref13, 2),
        key = _ref14[0],
        value = _ref14[1];
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
    var resolvedSource = source;
    if (isMapLike(resolvedSource)) {
      var converted = convertMapLikeToObject(resolvedSource);
      if (converted) {
        resolvedSource = converted;
      }
    }
    if (!isPlainObject(resolvedSource)) return null;
    var snapshot = Object.create(null);
    Object.entries(resolvedSource).forEach(function (_ref15) {
      var _ref16 = _slicedToArray(_ref15, 2),
        key = _ref16[0],
        value = _ref16[1];
      if (metadataKeys.has(key)) return;
      if (!looksLikeStoredSettingKey(key)) return;
      snapshot[key] = normalizeStoredValue(value);
    });
    return Object.keys(snapshot).length ? snapshot : null;
  }
  function convertLegacyDataEntriesToObject(entries) {
    if (isMapLike(entries)) {
      var converted = convertMapLikeToObject(entries);
      if (converted) {
        return converted;
      }
    }
    if (!Array.isArray(entries)) {
      return null;
    }
    var snapshot = Object.create(null);
    var assignEntry = function assignEntry(key, value) {
      if (typeof key !== 'string' || !key) return;
      if (Object.prototype.hasOwnProperty.call(snapshot, key)) return;
      snapshot[key] = value;
    };
    var keyCandidateKeys = ['key', 'name', 'section', 'type'];
    var valueCandidateKeys = ['value', 'data', 'content', 'payload', 'entries', 'items', 'record', 'snapshot', 'state', 'values', 'settings', 'sectionData', 'body'];
    entries.forEach(function (entry) {
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
      var keyCandidate = keyCandidateKeys.find(function (candidate) {
        var value = entry[candidate];
        return typeof value === 'string' && value;
      });
      if (!keyCandidate) {
        return;
      }
      var value = undefined;
      for (var i = 0; i < valueCandidateKeys.length; i += 1) {
        var candidate = valueCandidateKeys[i];
        if (Object.prototype.hasOwnProperty.call(entry, candidate)) {
          value = entry[candidate];
          break;
        }
      }
      if (value === undefined) {
        var _ref17, _ref18, _ref19, _ref20, _ref21, _ref22, _ref23, _ref24, _entry$value3;
        value = (_ref17 = (_ref18 = (_ref19 = (_ref20 = (_ref21 = (_ref22 = (_ref23 = (_ref24 = (_entry$value3 = entry.value) !== null && _entry$value3 !== void 0 ? _entry$value3 : entry.data) !== null && _ref24 !== void 0 ? _ref24 : entry.content) !== null && _ref23 !== void 0 ? _ref23 : entry.payload) !== null && _ref22 !== void 0 ? _ref22 : entry.entries) !== null && _ref21 !== void 0 ? _ref21 : entry.items) !== null && _ref20 !== void 0 ? _ref20 : entry.snapshot) !== null && _ref19 !== void 0 ? _ref19 : entry.state) !== null && _ref18 !== void 0 ? _ref18 : entry.values) !== null && _ref17 !== void 0 ? _ref17 : entry.settings;
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
      var converted = convertMapLikeToObject(section);
      if (converted) {
        return normalizeBackupDataSection(converted);
      }
    }
    if (isPlainObject(section)) {
      return section;
    }
    if (Array.isArray(section)) {
      var _converted = convertLegacyDataEntriesToObject(section);
      if (_converted) {
        return _converted;
      }
    }
    if (typeof section === 'string') {
      var parsed = parseBackupDataString(section);
      if (parsed) {
        return parsed;
      }
    }
    if (section && _typeof(section) === 'object') {
      if (typeof section.toJSON === 'function') {
        try {
          var toJsonValue = section.toJSON();
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
      var normalized = normalizeBackupDataSection(value);
      if (normalized) {
        return normalized;
      }
    }
    return value;
  }
  function mergeBackupDataSections(base, additions) {
    if (!isPlainObject(additions) || !Object.keys(additions).length) {
      return base ? _objectSpread({}, base) : null;
    }
    var target = base ? _objectSpread({}, base) : {};
    Object.entries(additions).forEach(function (_ref25) {
      var _ref26 = _slicedToArray(_ref25, 2),
        key = _ref26[0],
        value = _ref26[1];
      if (typeof key !== 'string') return;
      if (Object.prototype.hasOwnProperty.call(target, key)) return;
      target[key] = normalizeBackupDataValue(key, value);
    });
    return target;
  }
  var CONTROL_CHARACTER_REGEX = new RegExp("[".concat(String.fromCharCode(0), "-").concat(String.fromCharCode(31)).concat(String.fromCharCode(127), "]"), 'g');
  function sanitizeBackupPayload(raw) {
    if (raw === null || raw === undefined) {
      return '';
    }
    var decodeBinaryPayload = function decodeBinaryPayload(value) {
      if (_typeof(value) !== 'object' || value === null) {
        return null;
      }
      var isNodeBuffer = typeof Buffer !== 'undefined' && typeof Buffer.isBuffer === 'function' && Buffer.isBuffer(value);
      var objectTag = Object.prototype.toString.call(value);
      var isArrayBuffer = typeof ArrayBuffer !== 'undefined' && (value instanceof ArrayBuffer || objectTag === '[object ArrayBuffer]' || objectTag === '[object SharedArrayBuffer]');
      var isArrayBufferView = function () {
        if (typeof ArrayBuffer === 'undefined') {
          return false;
        }
        if (typeof ArrayBuffer.isView === 'function' && ArrayBuffer.isView(value)) {
          return true;
        }
        return Boolean(value && _typeof(value) === 'object' && _typeof(value.buffer) === 'object' && typeof value.byteLength === 'number' && typeof value.BYTES_PER_ELEMENT === 'number');
      }();
      if (!isNodeBuffer && !isArrayBuffer && !isArrayBufferView) {
        return null;
      }
      var toUint8Array = function toUint8Array() {
        if (isNodeBuffer) {
          return new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
        }
        if (isArrayBuffer) {
          return new Uint8Array(value);
        }
        if (_typeof(value.buffer) === 'object' && typeof value.byteLength === 'number') {
          var offset = typeof value.byteOffset === 'number' ? value.byteOffset : 0;
          return new Uint8Array(value.buffer, offset, value.byteLength);
        }
        throw new TypeError('Unsupported binary payload type');
      };
      var decodeWithTextDecoder = function decodeWithTextDecoder(array) {
        if (typeof TextDecoder !== 'function') {
          return null;
        }
        try {
          var decoder = new TextDecoder('utf-8', {
            fatal: false
          });
          return decoder.decode(array);
        } catch (error) {
          console.warn('Failed to decode backup payload with TextDecoder', error);
          return null;
        }
      };
      var decodeWithBuffer = function decodeWithBuffer() {
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
      var decodeManually = function decodeManually(array) {
        try {
          var result = '';
          var CHUNK_SIZE = 0x8000;
          for (var index = 0; index < array.length; index += CHUNK_SIZE) {
            var slice = array.subarray(index, index + CHUNK_SIZE);
            result += String.fromCharCode.apply(null, slice);
          }
          return result;
        } catch (error) {
          console.warn('Failed to manually decode backup payload', error);
          return null;
        }
      };
      var array = toUint8Array();
      return decodeWithTextDecoder(array) || decodeWithBuffer() || decodeManually(array);
    };
    var text;
    if (typeof raw === 'string') {
      text = raw;
    } else {
      var decoded = decodeBinaryPayload(raw);
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
    if (!text.includes("\0")) {
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
    var sanitized = sanitizeBackupPayload(raw);
    if (!sanitized) {
      return null;
    }
    var trimmed = sanitized.trim();
    if (!trimmed) {
      return null;
    }
    try {
      var parsed = JSON.parse(trimmed);
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
    var parsed;
    if (isPlainObject(raw)) {
      parsed = raw;
    } else if (isMapLike(raw)) {
      var converted = convertMapLikeToObject(raw);
      parsed = isPlainObject(converted) ? converted : {};
    } else {
      parsed = {};
    }
    var versionValue = typeof parsed.version === 'string' ? parsed.version : typeof parsed.appVersion === 'string' ? parsed.appVersion : typeof parsed.applicationVersion === 'string' ? parsed.applicationVersion : undefined;
    var settingsResult = extractFirstMatchingSnapshot(parsed, ['settings', 'localStorage', 'storage', 'storedSettings', 'values', 'entries']);
    var sessionResult = extractFirstMatchingSnapshot(parsed, ['sessionStorage', 'session', 'sessions', 'sessionState', 'sessionEntries']);
    var metadataKeys = new Set(BACKUP_METADATA_BASE_KEYS);
    if (settingsResult.keyUsed) metadataKeys.add(settingsResult.keyUsed);
    if (sessionResult.keyUsed) metadataKeys.add(sessionResult.keyUsed);
    var settingsSnapshot = settingsResult.snapshot || buildLegacyStorageFromRoot(parsed, metadataKeys);
    var sessionSnapshot = sessionResult.snapshot;
    var dataSection = null;
    var dataKeys = ['data', 'payload', 'plannerData', 'allData'];
    for (var index = 0; index < dataKeys.length; index += 1) {
      var key = dataKeys[index];
      if (!Object.prototype.hasOwnProperty.call(parsed, key)) continue;
      var normalized = normalizeBackupDataSection(parsed[key]);
      if (normalized) {
        dataSection = mergeBackupDataSections(dataSection, normalized);
      }
    }
    var fallback = {};
    BACKUP_DATA_KEYS.forEach(function (key) {
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
      data: isPlainObject(dataSection) ? dataSection : null
    };
  }
  function isUnsupportedDownloadPermissionError(error) {
    if (!error) return false;
    var name = typeof error.name === 'string' ? error.name : '';
    if (name === 'TypeError' || name === 'NotSupportedError') {
      return true;
    }
    if (typeof DOMException !== 'undefined' && error instanceof DOMException) {
      if (error.code === DOMException.NOT_SUPPORTED_ERR) {
        return true;
      }
    }
    if (typeof error.message === 'string') {
      var lowerMessage = error.message.toLowerCase();
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
    if (typeof navigator === 'undefined' || !navigator.permissions || typeof navigator.permissions.query !== 'function') {
      return null;
    }
    var candidateNames = ['automatic-downloads', 'downloads'];
    var statusPromise = null;
    var permissionNameUsed = null;
    for (var index = 0; index < candidateNames.length; index += 1) {
      var permissionName = candidateNames[index];
      try {
        var queryResult = navigator.permissions.query({
          name: permissionName
        });
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
        console.warn("Failed to query automatic download permission (".concat(permissionName, ")"), error);
        return null;
      }
    }
    if (!statusPromise || typeof statusPromise.then !== 'function') {
      return null;
    }
    var permissionStatusRef = null;
    var monitor = {
      state: 'unknown',
      name: permissionNameUsed,
      supported: true,
      initial: statusPromise.then(function (status) {
        permissionStatusRef = status;
        if (!status || typeof status.state !== 'string') {
          monitor.state = 'unknown';
          return monitor.state;
        }
        monitor.state = status.state;
        return monitor.state;
      }).catch(function (error) {
        if (isUnsupportedDownloadPermissionError(error)) {
          monitor.supported = false;
          monitor.state = 'unknown';
          return monitor.state;
        }
        console.warn("Failed to query automatic download permission (".concat(permissionNameUsed || 'unknown', ")"), error);
        monitor.state = 'unknown';
        return monitor.state;
      }),
      ready: null
    };
    monitor.ready = monitor.initial.then(function (initialState) {
      if (!permissionStatusRef || typeof permissionStatusRef.state !== 'string') {
        return monitor.state;
      }
      if (initialState === 'prompt') {
        return new Promise(function (resolve) {
          var _finalize = function finalize() {
            try {
              permissionStatusRef.removeEventListener('change', _finalize);
            } catch (removeError) {
              void removeError;
            }
            monitor.state = typeof permissionStatusRef.state === 'string' ? permissionStatusRef.state : 'unknown';
            resolve(monitor.state);
          };
          try {
            permissionStatusRef.addEventListener('change', _finalize);
          } catch (listenerError) {
            console.warn('Failed to observe automatic download permission changes', listenerError);
            resolve('unknown');
          }
        });
      }
      return initialState;
    }).catch(function (error) {
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
    var anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    anchor.rel = 'noopener';
    anchor.target = '_blank';
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    var success = false;
    try {
      anchor.click();
      success = true;
    } catch (error) {
      console.warn('Failed to trigger backup download', error);
      success = false;
    }
    setTimeout(function () {
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
      return "data:application/json;charset=utf-8,".concat(encodeURIComponent(payload));
    } catch (error) {
      console.warn('Failed to encode backup payload as data URL', error);
      return null;
    }
  }
  function openBackupFallbackWindow(payload, fileName) {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return false;
    }
    var backupWindow = null;
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
      var doc = backupWindow.document;
      if (!doc) {
        return false;
      }
      var langAttr = document && document.documentElement && document.documentElement.getAttribute ? document.documentElement.getAttribute('lang') : 'en';
      doc.open();
      doc.write("<!DOCTYPE html><html lang=\"".concat(langAttr || 'en', "\"><head><meta charset=\"utf-8\"><title>Manual download</title></head><body></body></html>"));
      doc.close();
      try {
        doc.title = fileName || 'backup.json';
      } catch (titleError) {
        void titleError;
      }
      var body = doc.body;
      if (!body) {
        return false;
      }
      body.style.margin = '0';
      body.style.padding = '1.5rem';
      body.style.background = '#f8f9fb';
      body.style.color = '#0f172a';
      body.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
      var container = doc.createElement('div');
      container.style.maxWidth = '960px';
      container.style.margin = '0 auto';
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '1rem';
      var heading = doc.createElement('h1');
      heading.textContent = fileName || 'Manual backup';
      heading.style.margin = '0';
      heading.style.fontSize = '1.5rem';
      heading.style.fontWeight = '400';
      var description = doc.createElement('p');
      if (typeof getManualDownloadFallbackMessage === 'function') {
        description.textContent = getManualDownloadFallbackMessage();
      } else {
        description.textContent = 'Copy the text below and save it to a file ending with .json to keep your data safe.';
      }
      description.style.margin = '0';
      description.style.lineHeight = '1.5';
      var helper = doc.createElement('p');
      if (typeof getManualDownloadCopyHint === 'function') {
        helper.textContent = getManualDownloadCopyHint();
      } else {
        helper.textContent = 'Select the text, copy it and paste into your preferred notes app or text editor.';
      }
      helper.style.margin = '0';
      helper.style.lineHeight = '1.5';
      var textArea = doc.createElement('textarea');
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
  function downloadBackupPayload(payload, fileName) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var permissionMonitor = monitorAutomaticDownloadPermission();
    var config = _typeof(options) === 'object' && options !== null ? options : {};
    var skipQueue = config.skipQueue === true;
    var failureResult = {
      success: false,
      method: null,
      permission: permissionMonitor,
      queued: false,
      queueMessage: resolveQueuedBackupMessage(fileName)
    };
    if (typeof payload !== 'string') {
      return failureResult;
    }
    var blob = null;
    if (typeof Blob !== 'undefined') {
      try {
        blob = new Blob([payload], {
          type: 'application/json'
        });
      } catch (blobError) {
        console.warn('Failed to create backup blob', blobError);
        blob = null;
      }
    }
    if (blob) {
      if (typeof navigator !== 'undefined' && typeof navigator.msSaveOrOpenBlob === 'function') {
        try {
          var msSaveResult = navigator.msSaveOrOpenBlob(blob, fileName);
          if (msSaveResult === false) {
            console.warn('Saving backup via msSaveOrOpenBlob was cancelled or declined');
          } else {
            return {
              success: true,
              method: 'ms-save',
              permission: permissionMonitor
            };
          }
        } catch (msError) {
          console.warn('Failed to save backup via msSaveOrOpenBlob', msError);
        }
      }
      if (typeof URL !== 'undefined' && typeof URL.createObjectURL === 'function') {
        var objectUrl = null;
        try {
          objectUrl = URL.createObjectURL(blob);
        } catch (urlError) {
          console.warn('Failed to create object URL for backup blob', urlError);
          objectUrl = null;
        }
        if (objectUrl) {
          var triggered = triggerBackupDownload(objectUrl, fileName);
          if (typeof URL.revokeObjectURL === 'function') {
            setTimeout(function () {
              try {
                URL.revokeObjectURL(objectUrl);
              } catch (revokeError) {
                void revokeError;
              }
            }, 0);
          }
          if (triggered) {
            return {
              success: true,
              method: 'blob-url',
              permission: permissionMonitor
            };
          }
        }
      }
    }
    var encoded = encodeBackupDataUrl(payload);
    if (encoded) {
      var _triggered = triggerBackupDownload(encoded, fileName);
      if (_triggered) {
        return {
          success: true,
          method: 'data-url',
          permission: permissionMonitor
        };
      }
    }
    var opened = openBackupFallbackWindow(payload, fileName);
    if (opened) {
      return {
        success: true,
        method: 'manual',
        permission: permissionMonitor
      };
    }
    if (!skipQueue) {
      var metadata = config.queueMetadata && _typeof(config.queueMetadata) === 'object' ? config.queueMetadata : {};
      var record = queueBackupPayloadForVault(fileName, payload, {
        reason: metadata.reason || config.reason || 'download-blocked',
        permissionState: metadata.permissionState || (permissionMonitor && typeof permissionMonitor.state === 'string' ? permissionMonitor.state : 'unknown'),
        source: metadata.source || config.source || 'automatic',
        createdAt: metadata.createdAt || null,
        createdAtMs: metadata.createdAtMs || null
      });
      failureResult.queued = true;
      failureResult.queueEntryId = record && typeof record.id === 'string' ? record.id : null;
    }
    return failureResult;
  }
  function isAutoBackupName(name) {
    return typeof name === 'string' && (name.startsWith(SESSION_AUTO_BACKUP_NAME_PREFIX) || name.startsWith(SESSION_AUTO_BACKUP_DELETION_PREFIX));
  }
  function parseAutoBackupName(name) {
    if (typeof name !== 'string') {
      return null;
    }
    var config = function () {
      if (name.startsWith(SESSION_AUTO_BACKUP_DELETION_PREFIX)) {
        return {
          prefixLength: SESSION_AUTO_BACKUP_DELETION_PREFIX.length,
          type: 'auto-backup-before-delete',
          secondsOptional: true
        };
      }
      if (name.startsWith(SESSION_AUTO_BACKUP_NAME_PREFIX)) {
        return {
          prefixLength: SESSION_AUTO_BACKUP_NAME_PREFIX.length,
          type: 'auto-backup',
          secondsOptional: true
        };
      }
      return null;
    }();
    if (!config) {
      return null;
    }
    var remainder = name.slice(config.prefixLength);
    var parts = remainder.split('-');
    if (parts.length < 5) {
      return null;
    }
    var baseParts = parts.slice(0, 5).map(function (part) {
      return Number(part);
    });
    if (baseParts.some(function (value) {
      return Number.isNaN(value);
    })) {
      return null;
    }
    var _baseParts = _slicedToArray(baseParts, 5),
      year = _baseParts[0],
      month = _baseParts[1],
      day = _baseParts[2],
      hour = _baseParts[3],
      minute = _baseParts[4];
    var includeSeconds = false;
    var seconds = 0;
    var labelStartIndex = 5;
    if (parts.length > labelStartIndex) {
      var secondsCandidate = parts[labelStartIndex];
      if (/^[0-9]{1,2}$/.test(secondsCandidate)) {
        includeSeconds = true;
        seconds = Number(secondsCandidate);
        labelStartIndex += 1;
      } else if (!config.secondsOptional) {
        return null;
      }
    } else if (!config.secondsOptional) {
      return null;
    }
    var label = parts.slice(labelStartIndex).join('-').trim();
    var date = new Date(year, month - 1, day, hour, minute, includeSeconds ? seconds : 0, 0);
    return {
      type: config.type,
      date: Number.isNaN(date.valueOf()) ? null : date,
      label: label,
      includeSeconds: includeSeconds
    };
  }
  var backupAPI = freezeDeep({
    formatFullBackupFilename: formatFullBackupFilename,
    resolveSafeLocalStorage: resolveSafeLocalStorage,
    captureStorageSnapshot: captureStorageSnapshot,
    createSafeStorageReader: createSafeStorageReader,
    restoreSessionStorageSnapshot: restoreSessionStorageSnapshot,
    restoreLocalStorageSnapshot: restoreLocalStorageSnapshot,
    sanitizeBackupPayload: sanitizeBackupPayload,
    parseBackupDataString: parseBackupDataString,
    normalizeBackupDataSection: normalizeBackupDataSection,
    normalizeBackupDataValue: normalizeBackupDataValue,
    mergeBackupDataSections: mergeBackupDataSections,
    extractBackupSections: extractBackupSections,
    triggerBackupDownload: triggerBackupDownload,
    encodeBackupDataUrl: encodeBackupDataUrl,
    openBackupFallbackWindow: openBackupFallbackWindow,
    downloadBackupPayload: downloadBackupPayload,
    queueBackupPayloadForVault: queueBackupPayloadForVault,
    getQueuedBackupPayloads: getQueuedBackupPayloads,
    removeBackupVaultRecord: removeBackupVaultRecord,
    openQueuedBackupVaultWindow: openQueuedBackupVaultWindow,
    resolveQueuedBackupMessage: resolveQueuedBackupMessage,
    isBackupVaultFallbackActive: isBackupVaultFallbackActive,
    getBackupVaultFallbackState: getBackupVaultFallbackState,
    isAutoBackupName: isAutoBackupName,
    parseAutoBackupName: parseAutoBackupName,
    isPlainObject: isPlainObject,
    constants: freezeDeep({
      SESSION_AUTO_BACKUP_NAME_PREFIX: SESSION_AUTO_BACKUP_NAME_PREFIX,
      SESSION_AUTO_BACKUP_DELETION_PREFIX: SESSION_AUTO_BACKUP_DELETION_PREFIX,
      BACKUP_STORAGE_KEY_PREFIXES: BACKUP_STORAGE_KEY_PREFIXES.slice(),
      BACKUP_STORAGE_KNOWN_KEYS: Array.from(BACKUP_STORAGE_KNOWN_KEYS),
      BACKUP_METADATA_BASE_KEYS: Array.from(BACKUP_METADATA_BASE_KEYS),
      BACKUP_DATA_KEYS: BACKUP_DATA_KEYS.slice(),
      BACKUP_DATA_COMPLEX_KEYS: Array.from(BACKUP_DATA_COMPLEX_KEYS),
      BACKUP_VAULT_FALLBACK_STORAGE_KEY: BACKUP_VAULT_FALLBACK_STORAGE_KEY
    })
  });
  registerOrQueueModule('cineFeatureBackup', backupAPI, {
    category: 'feature',
    description: 'Backup and restore helpers for snapshots, payload normalization, downloads and diff metadata.',
    replace: true,
    connections: ['cineModuleBase', 'cineModuleContext', 'cinePersistence']
  }, function (error) {
    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      console.warn('Unable to register cineFeatureBackup module.', error);
    }
  });
  var globalExports = [['cineFeatureBackup', backupAPI], ['formatFullBackupFilename', formatFullBackupFilename], ['resolveSafeLocalStorage', resolveSafeLocalStorage], ['captureStorageSnapshot', captureStorageSnapshot], ['createSafeStorageReader', createSafeStorageReader], ['restoreSessionStorageSnapshot', restoreSessionStorageSnapshot], ['restoreLocalStorageSnapshot', restoreLocalStorageSnapshot], ['sanitizeBackupPayload', sanitizeBackupPayload], ['parseBackupDataString', parseBackupDataString], ['normalizeBackupDataSection', normalizeBackupDataSection], ['normalizeBackupDataValue', normalizeBackupDataValue], ['mergeBackupDataSections', mergeBackupDataSections], ['extractBackupSections', extractBackupSections], ['triggerBackupDownload', triggerBackupDownload], ['encodeBackupDataUrl', encodeBackupDataUrl], ['openBackupFallbackWindow', openBackupFallbackWindow], ['downloadBackupPayload', downloadBackupPayload], ['queueBackupPayloadForVault', queueBackupPayloadForVault], ['getQueuedBackupPayloads', getQueuedBackupPayloads], ['removeBackupVaultRecord', removeBackupVaultRecord], ['openQueuedBackupVaultWindow', openQueuedBackupVaultWindow], ['resolveQueuedBackupMessage', resolveQueuedBackupMessage], ['isBackupVaultFallbackActive', isBackupVaultFallbackActive], ['getBackupVaultFallbackState', getBackupVaultFallbackState], ['isAutoBackupName', isAutoBackupName], ['parseAutoBackupName', parseAutoBackupName], ['clearBackupVault', clearBackupVault], ['SESSION_AUTO_BACKUP_NAME_PREFIX', SESSION_AUTO_BACKUP_NAME_PREFIX], ['SESSION_AUTO_BACKUP_DELETION_PREFIX', SESSION_AUTO_BACKUP_DELETION_PREFIX]];
  globalExports.forEach(function (_ref27) {
    var _ref28 = _slicedToArray(_ref27, 2),
      name = _ref28[0],
      value = _ref28[1];
    exposeGlobal(name, value, {
      configurable: true,
      writable: true
    });
  });
})();