import cineModules from '../registry.js';
import { storageRepo } from '../storage/StorageRepository.js';
import { detectGlobalScope } from '../helpers/scope-utils.js';

const AUTO_GEAR_STORAGE_KEYS = Object.freeze({
  autoGearRules: 'cameraPowerPlanner_autoGearRules',
  autoGearBackups: 'cameraPowerPlanner_autoGearBackups',
  autoGearPresets: 'cameraPowerPlanner_autoGearPresets',
  autoGearMonitorDefaults: 'cameraPowerPlanner_autoGearMonitorDefaults',
  autoGearActivePresetId: 'cameraPowerPlanner_autoGearActivePreset',
  autoGearAutoPresetId: 'cameraPowerPlanner_autoGearAutoPreset',
  autoGearBackupRetention: 'cameraPowerPlanner_autoGearBackupRetention',
  autoGearShowBackups: 'cameraPowerPlanner_autoGearShowBackups',
});

const DEFAULT_CACHE_STATE = Object.freeze({
  autoGearRules: Object.freeze([]),
  autoGearBackups: Object.freeze([]),
  autoGearPresets: Object.freeze([]),
  autoGearMonitorDefaults: Object.freeze({}),
  autoGearActivePresetId: '',
  autoGearAutoPresetId: '',
  autoGearBackupRetention: null,
  autoGearShowBackups: false,
});

const GLOBAL_SCOPE = detectGlobalScope();

function cloneCacheValue(value) {
  if (Array.isArray(value)) {
    return value.slice();
  }
  if (value && typeof value === 'object') {
    return { ...value };
  }
  return value;
}

function buildCacheEntry(value) {
  return {
    hydrated: false,
    value: cloneCacheValue(value),
  };
}

function createCacheState() {
  return {
    autoGearRules: buildCacheEntry(DEFAULT_CACHE_STATE.autoGearRules),
    autoGearBackups: buildCacheEntry(DEFAULT_CACHE_STATE.autoGearBackups),
    autoGearPresets: buildCacheEntry(DEFAULT_CACHE_STATE.autoGearPresets),
    autoGearMonitorDefaults: buildCacheEntry(DEFAULT_CACHE_STATE.autoGearMonitorDefaults),
    autoGearActivePresetId: buildCacheEntry(DEFAULT_CACHE_STATE.autoGearActivePresetId),
    autoGearAutoPresetId: buildCacheEntry(DEFAULT_CACHE_STATE.autoGearAutoPresetId),
    autoGearBackupRetention: buildCacheEntry(DEFAULT_CACHE_STATE.autoGearBackupRetention),
    autoGearShowBackups: buildCacheEntry(DEFAULT_CACHE_STATE.autoGearShowBackups),
  };
}

function resolvePersistenceScope() {
  const candidates = [];
  if (GLOBAL_SCOPE) candidates.push(GLOBAL_SCOPE);
  if (typeof globalThis !== 'undefined' && globalThis !== GLOBAL_SCOPE) candidates.push(globalThis);
  if (typeof window !== 'undefined' && window !== GLOBAL_SCOPE) candidates.push(window);
  if (typeof self !== 'undefined' && self !== GLOBAL_SCOPE) candidates.push(self);
  if (typeof global !== 'undefined' && global !== GLOBAL_SCOPE) candidates.push(global);

  for (let index = 0; index < candidates.length; index += 1) {
    const scope = candidates[index];
    if (!scope || typeof scope !== 'object') continue;
    if (scope.cinePersistence) return scope;
    if (scope.cineModules && typeof scope.cineModules.get === 'function') {
      const module = scope.cineModules.get('cinePersistence');
      if (module) return { cinePersistence: module };
    }
  }

  return null;
}

export class AutoGearService {
  constructor() {
    this.cache = createCacheState();
    this.hydrating = null;
  }

  hydrateCache(options = {}) {
    const force = options && options.force === true;
    if (this.hydrating && !force) {
      return this.hydrating;
    }

    this.hydrating = (async () => {
      const keys = Object.keys(AUTO_GEAR_STORAGE_KEYS);
      const pending = keys.map(async (name) => {
        const storageKey = AUTO_GEAR_STORAGE_KEYS[name];
        try {
          const value = await storageRepo.getItem(storageKey);
          this.setCacheValue(name, value, { hydrate: true });
        } catch (error) {
          console.warn('[AutoGearService] Failed to hydrate', storageKey, error);
          this.setCacheValue(name, undefined, { hydrate: true, skipUpdate: true });
        }
      });

      await Promise.all(pending);
      return this.getCacheSnapshot();
    })();

    return this.hydrating;
  }

  getCacheSnapshot() {
    const snapshot = {};
    Object.keys(this.cache).forEach((name) => {
      snapshot[name] = cloneCacheValue(this.cache[name].value);
    });
    return snapshot;
  }

  setCacheValue(name, value, options = {}) {
    const entry = this.cache[name];
    if (!entry) {
      return;
    }
    const hydrate = options && options.hydrate === true;
    const skipUpdate = options && options.skipUpdate === true;
    if (!skipUpdate && typeof value !== 'undefined' && value !== null) {
      entry.value = cloneCacheValue(value);
    }
    if (hydrate) {
      entry.hydrated = true;
    }
  }

  getCacheValue(name) {
    const entry = this.cache[name];
    if (!entry) {
      return undefined;
    }
    return cloneCacheValue(entry.value);
  }

  async persistValue(name, value, binding) {
    this.setCacheValue(name, value);
    const persistenceScope = resolvePersistenceScope();
    const persistence = persistenceScope ? persistenceScope.cinePersistence : null;

    if (persistence && persistence.storage && typeof persistence.storage[binding] === 'function') {
      return persistence.storage[binding](value);
    }

    const storageKey = AUTO_GEAR_STORAGE_KEYS[name];
    return storageRepo.setItem(storageKey, value);
  }

  readAutoGearRules() {
    return this.getCacheValue('autoGearRules') || [];
  }

  readAutoGearBackups() {
    return this.getCacheValue('autoGearBackups') || [];
  }

  readAutoGearPresets() {
    return this.getCacheValue('autoGearPresets') || [];
  }

  readAutoGearMonitorDefaults() {
    return this.getCacheValue('autoGearMonitorDefaults') || {};
  }

  readActivePresetId() {
    const value = this.getCacheValue('autoGearActivePresetId');
    return typeof value === 'string' ? value : '';
  }

  readAutoPresetId() {
    const value = this.getCacheValue('autoGearAutoPresetId');
    return typeof value === 'string' ? value : '';
  }

  readBackupRetention() {
    return this.getCacheValue('autoGearBackupRetention');
  }

  readBackupVisibility() {
    return !!this.getCacheValue('autoGearShowBackups');
  }

  persistAutoGearRules(rules) {
    return this.persistValue('autoGearRules', Array.isArray(rules) ? rules : [], 'saveAutoGearRules');
  }

  persistAutoGearBackups(backups) {
    return this.persistValue('autoGearBackups', Array.isArray(backups) ? backups : [], 'saveAutoGearBackups');
  }

  persistAutoGearPresets(presets) {
    return this.persistValue('autoGearPresets', Array.isArray(presets) ? presets : [], 'saveAutoGearPresets');
  }

  persistAutoGearMonitorDefaults(defaults) {
    const payload = defaults && typeof defaults === 'object' ? defaults : {};
    return this.persistValue('autoGearMonitorDefaults', payload, 'saveAutoGearMonitorDefaults');
  }

  persistActivePresetId(presetId) {
    const payload = typeof presetId === 'string' ? presetId : '';
    return this.persistValue('autoGearActivePresetId', payload, 'saveAutoGearActivePresetId');
  }

  persistAutoPresetId(presetId) {
    const payload = typeof presetId === 'string' ? presetId : '';
    return this.persistValue('autoGearAutoPresetId', payload, 'saveAutoGearAutoPresetId');
  }

  persistBackupRetention(retention) {
    return this.persistValue('autoGearBackupRetention', retention, 'saveAutoGearBackupRetention');
  }

  persistBackupVisibility(visible) {
    return this.persistValue('autoGearShowBackups', !!visible, 'saveAutoGearBackupVisibility');
  }

  __internalResetCache() {
    this.cache = createCacheState();
    this.hydrating = null;
  }
}

export const autoGearService = new AutoGearService();

autoGearService.hydrateCache().catch((error) => {
  console.warn('[AutoGearService] Initial hydration failed', error);
});

if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE === 'object') {
  if (!GLOBAL_SCOPE.cineAutoGearPersistence) {
    try {
      Object.defineProperty(GLOBAL_SCOPE, 'cineAutoGearPersistence', {
        configurable: true,
        enumerable: false,
        writable: false,
        value: autoGearService,
      });
    } catch (error) {
      void error;
      GLOBAL_SCOPE.cineAutoGearPersistence = autoGearService;
    }
  }
}

cineModules.register('cineAutoGearPersistence', autoGearService, {
  category: 'persistence',
  description: 'Twin-store persistence cache for Auto-Gear state.',
  connections: ['cinePersistence', 'cineModuleGlobals'],
  freeze: false,
  replace: true,
});
