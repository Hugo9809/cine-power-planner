/* global cineModuleBase */
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

  const MODULE_BASE =
    (typeof cineModuleBase === 'object' && cineModuleBase)
    || (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.cineModuleBase === 'object' ? GLOBAL_SCOPE.cineModuleBase : null);

  const safeWarn = MODULE_BASE && typeof MODULE_BASE.safeWarn === 'function'
    ? MODULE_BASE.safeWarn
    : function fallbackWarn(message, error) {
        if (typeof console === 'undefined' || !console || typeof console.warn !== 'function') {
          return;
        }
        try {
          if (typeof error === 'undefined') {
            console.warn(message);
          } else {
            console.warn(message, error);
          }
        } catch (consoleError) {
          void consoleError;
        }
      };

  const CONTACTS_STORAGE_KEY = 'cameraPowerPlanner_contacts';

  function resolveLocalStorage(scope) {
    const target = scope || GLOBAL_SCOPE;
    try {
      if (target && typeof target.localStorage !== 'undefined') {
        return target.localStorage;
      }
    } catch (error) {
      safeWarn('cine.features.contactsOwnGear could not access localStorage.', error);
    }
    return null;
  }

  function dispatchOwnGearChanged(scope) {
    const target = scope || GLOBAL_SCOPE;
    if (!target || typeof target.document === 'undefined') {
      return;
    }
    const { document } = target;
    if (!document) {
      return;
    }
    try {
      if (typeof document.dispatchEvent === 'function' && typeof target.CustomEvent === 'function') {
        document.dispatchEvent(new target.CustomEvent('own-gear-data-changed'));
      }
    } catch (error) {
      safeWarn('cine.features.contactsOwnGear could not dispatch own gear change event.', error);
    }
  }

  function generateContactId() {
    return `contact-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  }

  function sanitizeContactValue(value) {
    if (typeof value !== 'string') {
      return '';
    }
    return value.trim();
  }

  function normalizeContactEntry(entry) {
    if (!entry || typeof entry !== 'object') {
      return null;
    }

    const id = sanitizeContactValue(entry.id) || generateContactId();
    const name = sanitizeContactValue(entry.name);
    const role = sanitizeContactValue(entry.role);
    const phone = sanitizeContactValue(entry.phone);
    const email = sanitizeContactValue(entry.email);
    const avatar = typeof entry.avatar === 'string' && entry.avatar.startsWith('data:')
      ? entry.avatar
      : '';
    const createdAt = Number.isFinite(entry.createdAt) ? entry.createdAt : Date.now();
    const updatedAt = Number.isFinite(entry.updatedAt) ? entry.updatedAt : createdAt;

    const normalized = { id, name, role, phone, email, createdAt, updatedAt };
    if (avatar) {
      normalized.avatar = avatar;
    }

    return normalized;
  }

  function sortContacts(list) {
    return (Array.isArray(list) ? list.filter(Boolean) : [])
      .map(normalizeContactEntry)
      .filter(Boolean)
      .sort((a, b) => {
        const nameA = (a && a.name ? a.name : '').toLowerCase();
        const nameB = (b && b.name ? b.name : '').toLowerCase();
        if (nameA && nameB && nameA !== nameB) {
          try {
            return nameA.localeCompare(nameB);
          } catch (error) {
            safeWarn('cine.features.contactsOwnGear could not sort contacts by locale.', error);
          }
        }
        if (nameA && !nameB) {
          return -1;
        }
        if (!nameA && nameB) {
          return 1;
        }
        return (a && a.createdAt ? a.createdAt : 0) - (b && b.createdAt ? b.createdAt : 0);
      });
  }

  function loadStoredContacts(options = {}) {
    const storage = resolveLocalStorage(options.scope);
    if (!storage || typeof storage.getItem !== 'function') {
      return [];
    }
    const storageKey = typeof options.storageKey === 'string' && options.storageKey
      ? options.storageKey
      : CONTACTS_STORAGE_KEY;

    try {
      const raw = storage.getItem(storageKey);
      if (!raw) {
        return [];
      }
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return [];
      }
      return sortContacts(parsed);
    } catch (error) {
      safeWarn('cine.features.contactsOwnGear could not load contacts from storage.', error);
      return [];
    }
  }

  function saveContactsToStorage(contacts, options = {}) {
    const storage = resolveLocalStorage(options.scope);
    if (!storage || typeof storage.setItem !== 'function') {
      return false;
    }
    const storageKey = typeof options.storageKey === 'string' && options.storageKey
      ? options.storageKey
      : CONTACTS_STORAGE_KEY;

    try {
      storage.setItem(storageKey, JSON.stringify(Array.isArray(contacts) ? contacts : []));
      return true;
    } catch (error) {
      safeWarn('cine.features.contactsOwnGear could not save contacts to storage.', error);
      return false;
    }
  }

  function generateOwnGearId() {
    try {
      if (typeof GLOBAL_SCOPE.crypto === 'object' && GLOBAL_SCOPE.crypto && typeof GLOBAL_SCOPE.crypto.randomUUID === 'function') {
        return GLOBAL_SCOPE.crypto.randomUUID();
      }
    } catch (error) {
      safeWarn('cine.features.contactsOwnGear could not use crypto.randomUUID.', error);
    }
    const timePart = Date.now().toString(36);
    const randomPart = Math.floor(Math.random() * 1e8).toString(36);
    return `own-${timePart}-${randomPart}`;
  }

  function normalizeOwnGearRecord(entry) {
    if (!entry || typeof entry !== 'object') {
      return null;
    }
    const rawName = typeof entry.name === 'string' ? entry.name.trim() : '';
    if (!rawName) {
      return null;
    }
    const normalized = {
      id: typeof entry.id === 'string' && entry.id.trim() ? entry.id.trim() : generateOwnGearId(),
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
  }

  function loadStoredOwnGearItems() {
    if (typeof GLOBAL_SCOPE.loadOwnGear !== 'function') {
      return [];
    }
    try {
      const stored = GLOBAL_SCOPE.loadOwnGear();
      if (!Array.isArray(stored)) {
        return [];
      }
      const seenIds = new Set();
      return stored
        .map(normalizeOwnGearRecord)
        .filter((item) => {
          if (!item) {
            return false;
          }
          if (seenIds.has(item.id)) {
            return false;
          }
          seenIds.add(item.id);
          return true;
        });
    } catch (error) {
      safeWarn('cine.features.contactsOwnGear could not load own gear items.', error);
      return [];
    }
  }

  function persistOwnGearItems(items) {
    if (typeof GLOBAL_SCOPE.saveOwnGear !== 'function') {
      return false;
    }
    const payload = Array.isArray(items)
      ? items
          .filter((item) => item && typeof item === 'object')
          .map((item) => {
            const entry = {
              id: item.id,
              name: item.name,
            };
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
          })
      : [];

    try {
      GLOBAL_SCOPE.saveOwnGear(payload);
      dispatchOwnGearChanged(GLOBAL_SCOPE);
      return true;
    } catch (error) {
      safeWarn('cine.features.contactsOwnGear could not persist own gear items.', error);
      return false;
    }
  }

  const moduleApi = Object.freeze({
    CONTACTS_STORAGE_KEY,
    generateContactId,
    sanitizeContactValue,
    normalizeContactEntry,
    sortContacts,
    loadStoredContacts,
    saveContactsToStorage,
    generateOwnGearId,
    normalizeOwnGearRecord,
    loadStoredOwnGearItems,
    persistOwnGearItems,
  });

  if (MODULE_BASE && typeof MODULE_BASE.registerOrQueueModule === 'function') {
    try {
      MODULE_BASE.registerOrQueueModule(
        'cine.features.contactsOwnGear',
        moduleApi,
        {
          category: 'features',
          description: 'Shared helpers for contacts management and personal gear persistence.',
          replace: true,
          connections: ['cineModuleBase', 'cineModuleGlobals', 'cinePersistence'],
        },
        (error) => safeWarn('Unable to register cine.features.contactsOwnGear module.', error),
        GLOBAL_SCOPE,
        MODULE_BASE.getModuleRegistry && MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE),
      );
    } catch (error) {
      safeWarn('cine.features.contactsOwnGear registration failed.', error);
    }
  }

  if (MODULE_BASE && typeof MODULE_BASE.exposeGlobal === 'function') {
    try {
      MODULE_BASE.exposeGlobal('cineFeaturesContactsOwnGear', moduleApi, GLOBAL_SCOPE, {
        configurable: true,
        enumerable: false,
        writable: false,
      });
      return;
    } catch (error) {
      safeWarn('cine.features.contactsOwnGear could not expose global api.', error);
    }
  }

  try {
    GLOBAL_SCOPE.cineFeaturesContactsOwnGear = moduleApi;
  } catch (error) {
    safeWarn('cine.features.contactsOwnGear could not assign global api.', error);
  }

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = moduleApi;
  }
})();
