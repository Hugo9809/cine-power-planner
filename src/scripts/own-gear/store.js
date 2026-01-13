
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
  return null;
}

const GLOBAL_SCOPE = detectGlobalScope();

function dispatchOwnGearChanged(scope) {
  const target = scope || GLOBAL_SCOPE;
  if (!target || typeof target.document === 'undefined') {
    return;
  }
  const { document } = target;
  if (!document || typeof document.dispatchEvent !== 'function') {
    return;
  }
  try {
    if (typeof target.CustomEvent === 'function') {
      document.dispatchEvent(new target.CustomEvent('own-gear-data-changed'));
    }
  } catch (error) {
    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      console.warn('cine.ownGear.store could not dispatch change event.', error);
    }
  }
}

function createIdGenerator(scope) {
  return function generateOwnGearId() {
    const targetScope = scope || GLOBAL_SCOPE;
    try {
      if (
        targetScope
        && targetScope.crypto
        && typeof targetScope.crypto.randomUUID === 'function'
      ) {
        return targetScope.crypto.randomUUID();
      }
    } catch (error) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('cine.ownGear.store could not use crypto.randomUUID.', error);
      }
    }
    const timePart = Date.now().toString(36);
    const randomPart = Math.floor(Math.random() * 1e8).toString(36);
    return `own-${timePart}-${randomPart}`;
  };
}

function createNormalizer(generateId) {
  return function normalizeOwnGearRecord(entry) {
    if (!entry || typeof entry !== 'object') {
      return null;
    }
    const rawName = typeof entry.name === 'string' ? entry.name.trim() : '';
    if (!rawName) {
      return null;
    }
    const normalized = {
      id: typeof entry.id === 'string' && entry.id.trim() ? entry.id.trim() : generateId(),
      name: rawName,
    };
    if (typeof entry.quantity === 'string' && entry.quantity.trim()) {
      normalized.quantity = entry.quantity.trim();
    } else if (typeof entry.quantity === 'number' && Number.isFinite(entry.quantity)) {
      normalized.quantity = String(entry.quantity);
    }
    if (typeof entry.notes === 'string' && entry.notes.trim()) {
      normalized.notes = entry.notes.trim();
    }
    if (typeof entry.source === 'string' && entry.source.trim()) {
      normalized.source = entry.source.trim();
    }
    return normalized;
  };
}

function sanitizeItems(items, normalize) {
  if (!Array.isArray(items)) {
    return [];
  }
  const seenIds = new Set();
  const normalized = [];
  for (let index = 0; index < items.length; index += 1) {
    const entry = normalize(items[index]);
    if (!entry || seenIds.has(entry.id)) {
      continue;
    }
    seenIds.add(entry.id);
    normalized.push(entry);
  }
  return normalized;
}

function buildCache(items) {
  const normalized = Array.isArray(items) ? items.slice() : [];
  const map = new Map();
  normalized.forEach((item) => {
    if (item && typeof item.id === 'string' && !map.has(item.id)) {
      map.set(item.id, item);
    }
  });
  return { items: normalized, map };
}

function createOwnGearStore(options = {}) {
  const scope = options.scope || GLOBAL_SCOPE;
  const loadOwnGear = typeof options.loadOwnGear === 'function'
    ? options.loadOwnGear
    : scope && typeof scope.loadOwnGear === 'function'
      ? scope.loadOwnGear.bind(scope)
      : null;
  const saveOwnGear = typeof options.saveOwnGear === 'function'
    ? options.saveOwnGear
    : scope && typeof scope.saveOwnGear === 'function'
      ? scope.saveOwnGear.bind(scope)
      : null;
  const dispatchChange = typeof options.dispatchOwnGearChange === 'function'
    ? options.dispatchOwnGearChange
    : () => dispatchOwnGearChanged(scope);

  const generateOwnGearId = createIdGenerator(scope);
  const normalizeOwnGearRecord = createNormalizer(generateOwnGearId);

  let autoGearCache = buildCache(Array.isArray(options.initialItems) ? options.initialItems : []);

  function loadStoredOwnGearItems() {
    if (!loadOwnGear) {
      return [];
    }
    try {
      const stored = loadOwnGear();
      if (!Array.isArray(stored)) {
        return [];
      }
      return sanitizeItems(stored, normalizeOwnGearRecord);
    } catch (error) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('cine.ownGear.store could not load own gear items.', error);
      }
      return [];
    }
  }

  function persistOwnGearItems(items) {
    const payload = sanitizeItems(items, normalizeOwnGearRecord).map((item) => {
      const entry = { id: item.id, name: item.name };
      if (item.quantity) {
        entry.quantity = item.quantity;
      }
      if (item.notes) {
        entry.notes = item.notes;
      }
      if (item.source) {
        entry.source = item.source;
      }
      return entry;
    });

    if (!saveOwnGear) {
      return false;
    }

    try {
      saveOwnGear(payload);
      dispatchChange();
      invalidateCache();
      return true;
    } catch (error) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('cine.ownGear.store could not persist own gear items.', error);
      }
      return false;
    }
  }

  function invalidateCache() {
    autoGearCache = { items: [], map: new Map() };
  }

  function snapshotFromCache() {
    return {
      items: autoGearCache.items.slice(),
      map: autoGearCache.map,
    };
  }

  function refreshCache() {
    const normalized = loadStoredOwnGearItems();
    autoGearCache = buildCache(normalized);
    return snapshotFromCache();
  }

  function getCacheSnapshot() {
    if (!autoGearCache.items.length && !autoGearCache.map.size) {
      return refreshCache();
    }
    return snapshotFromCache();
  }

  function getCachedItems() {
    return getCacheSnapshot().items.map((item) => ({ ...item }));
  }

  function findCachedById(id) {
    if (!id) {
      return null;
    }
    const snapshot = getCacheSnapshot();
    const match = snapshot.map.get(id) || null;
    return match ? { ...match } : null;
  }

  return {
    generateOwnGearId,
    normalizeOwnGearRecord,
    loadStoredOwnGearItems,
    persistOwnGearItems,
    invalidateCache,
    refreshCache,
    getCacheSnapshot,
    getCachedItems,
    findCachedById,
  };
}

export { createOwnGearStore };
