const MOUNT_VOLTAGE_SYMBOL = Symbol.for('cinePowerPlanner.mountVoltageKey');

const GLOBAL_KEYS = [
  'MOUNT_VOLTAGE_STORAGE_KEY',
  'CUSTOM_FONT_STORAGE_KEY',
  'CUSTOM_FONT_STORAGE_KEY_NAME',
  'TEMPERATURE_UNIT_STORAGE_KEY',
  '__CINE_AUTO_BACKUP_RENAMED_FLAG',
  'AUTO_GEAR_BACKUP_RETENTION_DEFAULT',
  'AUTO_GEAR_BACKUP_RETENTION_MIN',
  '__cineCriticalStorageGuard',
  'SAFE_LOCAL_STORAGE',
  '__cineStorageInitialized',
  '__cineStorageApi',
  'recordFullBackupHistoryEntry',
  'loadFullBackupHistory',
];

function snapshotGlobals() {
  const snapshot = new Map();
  GLOBAL_KEYS.forEach((key) => {
    const descriptor = Object.getOwnPropertyDescriptor(global, key);
    snapshot.set(key, {
      exists: typeof descriptor !== 'undefined',
      descriptor,
    });
  });
  const symbolDescriptor = Object.getOwnPropertyDescriptor(global, MOUNT_VOLTAGE_SYMBOL);
  snapshot.set(MOUNT_VOLTAGE_SYMBOL, {
    exists: typeof symbolDescriptor !== 'undefined',
    descriptor: symbolDescriptor,
  });
  return snapshot;
}

function restoreGlobals(snapshot) {
  GLOBAL_KEYS.forEach((key) => {
    const record = snapshot.get(key);
    if (!record || !record.exists) {
      delete global[key];
      return;
    }
    const { descriptor } = record;
    if (!descriptor) {
      delete global[key];
      return;
    }
    if (descriptor.configurable) {
      Object.defineProperty(global, key, descriptor);
      return;
    }
    if (Object.prototype.hasOwnProperty.call(descriptor, 'value')) {
      global[key] = descriptor.value;
      return;
    }
    Object.defineProperty(global, key, descriptor);
  });

  const symbolRecord = snapshot.get(MOUNT_VOLTAGE_SYMBOL);
  if (!symbolRecord || !symbolRecord.exists) {
    delete global[MOUNT_VOLTAGE_SYMBOL];
    return;
  }

  const { descriptor } = symbolRecord;
  if (!descriptor) {
    delete global[MOUNT_VOLTAGE_SYMBOL];
    return;
  }
  if (descriptor.configurable) {
    Object.defineProperty(global, MOUNT_VOLTAGE_SYMBOL, descriptor);
    return;
  }
  if (Object.prototype.hasOwnProperty.call(descriptor, 'value')) {
    global[MOUNT_VOLTAGE_SYMBOL] = descriptor.value;
    return;
  }
  Object.defineProperty(global, MOUNT_VOLTAGE_SYMBOL, descriptor);
}

function clearStorage() {
  if (typeof localStorage !== 'undefined' && localStorage && typeof localStorage.clear === 'function') {
    localStorage.clear();
  }
  if (typeof sessionStorage !== 'undefined' && sessionStorage && typeof sessionStorage.clear === 'function') {
    sessionStorage.clear();
  }
}

function loadStorageModule() {
  let storage;
  jest.isolateModules(() => {
    storage = require('../../src/scripts/storage');
  });
  return storage;
}

module.exports = {
  GLOBAL_KEYS,
  MOUNT_VOLTAGE_SYMBOL,
  snapshotGlobals,
  restoreGlobals,
  clearStorage,
  loadStorageModule,
};
