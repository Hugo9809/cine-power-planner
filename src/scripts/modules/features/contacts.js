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
      safeWarn('cine.features.contacts could not access localStorage.', error);
    }
    return null;
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
            safeWarn('cine.features.contacts could not sort contacts by locale.', error);
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
      safeWarn('cine.features.contacts could not load contacts from storage.', error);
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
      safeWarn('cine.features.contacts could not save contacts to storage.', error);
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
  });

  if (MODULE_BASE && typeof MODULE_BASE.registerOrQueueModule === 'function') {
    try {
      MODULE_BASE.registerOrQueueModule(
        'cine.features.contacts',
        moduleApi,
        {
          category: 'features',
          description: 'Shared helpers for contacts management.',
          replace: true,
          connections: ['cineModuleBase', 'cineModuleGlobals', 'cinePersistence'],
        },
        (error) => safeWarn('Unable to register cine.features.contacts module.', error),
        GLOBAL_SCOPE,
        MODULE_BASE.getModuleRegistry && MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE),
      );
    } catch (error) {
      safeWarn('cine.features.contacts registration failed.', error);
    }
  }

  if (MODULE_BASE && typeof MODULE_BASE.exposeGlobal === 'function') {
    try {
      MODULE_BASE.exposeGlobal('cineFeaturesContacts', moduleApi, GLOBAL_SCOPE, {
        configurable: true,
        enumerable: false,
        writable: false,
      });
      return;
    } catch (error) {
      safeWarn('cine.features.contacts could not expose global api.', error);
    }
  }

  try {
    GLOBAL_SCOPE.cineFeaturesContacts = moduleApi;
  } catch (error) {
    safeWarn('cine.features.contacts could not assign global api.', error);
  }

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = moduleApi;
  }
})();
