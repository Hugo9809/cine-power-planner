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
  var MODULE_BASE = (typeof cineModuleBase === "undefined" ? "undefined" : _typeof(cineModuleBase)) === 'object' && cineModuleBase || (GLOBAL_SCOPE && _typeof(GLOBAL_SCOPE.cineModuleBase) === 'object' ? GLOBAL_SCOPE.cineModuleBase : null);
  var safeWarn = MODULE_BASE && typeof MODULE_BASE.safeWarn === 'function' ? MODULE_BASE.safeWarn : function fallbackWarn(message, error) {
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
  var CONTACTS_STORAGE_KEY = 'cameraPowerPlanner_contacts';
  function resolveLocalStorage(scope) {
    var target = scope || GLOBAL_SCOPE;
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
    return "contact-".concat(Date.now().toString(36), "-").concat(Math.random().toString(36).slice(2, 8));
  }
  function sanitizeContactValue(value) {
    if (typeof value === 'string') {
      return value.trim();
    }
    if (typeof value === 'number') {
      if (!Number.isFinite(value)) {
        return '';
      }
      return String(value).trim();
    }
    if (typeof value === 'bigint') {
      try {
        return value.toString();
      } catch (bigintError) {
        void bigintError;
      }
      return '';
    }
    if (typeof value === 'boolean') {
      return value ? 'true' : 'false';
    }
    if (value && _typeof(value) === 'object') {
      try {
        var primitive = value.valueOf();
        if (primitive !== value) {
          return sanitizeContactValue(primitive);
        }
        if (typeof value.toString === 'function') {
          var stringified = value.toString();
          if (typeof stringified === 'string' && stringified && stringified !== '[object Object]') {
            return stringified.trim();
          }
        }
      } catch (coercionError) {
        void coercionError;
      }
    }
    return '';
  }
  function normalizeContactEntry(entry) {
    if (!entry || _typeof(entry) !== 'object') {
      return null;
    }
    var id = sanitizeContactValue(entry.id) || generateContactId();
    var name = sanitizeContactValue(entry.name);
    var role = sanitizeContactValue(entry.role);
    var phone = sanitizeContactValue(entry.phone);
    var email = sanitizeContactValue(entry.email);
    var website = sanitizeContactValue(entry.website || entry.url);
    var notes = sanitizeContactValue(entry.notes || entry.note || entry.text);
    var avatar = typeof entry.avatar === 'string' && entry.avatar.startsWith('data:') ? entry.avatar : '';
    var createdAt = Number.isFinite(entry.createdAt) ? entry.createdAt : Date.now();
    var updatedAt = Number.isFinite(entry.updatedAt) ? entry.updatedAt : createdAt;
    var normalized = {
      id: id,
      name: name,
      role: role,
      phone: phone,
      email: email,
      website: website,
      notes: notes,
      createdAt: createdAt,
      updatedAt: updatedAt
    };
    if (avatar) {
      normalized.avatar = avatar;
    }
    return normalized;
  }
  function sortContacts(list) {
    return (Array.isArray(list) ? list.filter(Boolean) : []).map(normalizeContactEntry).filter(Boolean).sort(function (a, b) {
      var nameA = (a && a.name ? a.name : '').toLowerCase();
      var nameB = (b && b.name ? b.name : '').toLowerCase();
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
  function loadStoredContacts() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var storage = resolveLocalStorage(options.scope);
    if (!storage || typeof storage.getItem !== 'function') {
      return [];
    }
    var storageKey = typeof options.storageKey === 'string' && options.storageKey ? options.storageKey : CONTACTS_STORAGE_KEY;
    try {
      var raw = storage.getItem(storageKey);
      if (!raw) {
        return [];
      }
      var parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return [];
      }
      return sortContacts(parsed);
    } catch (error) {
      safeWarn('cine.features.contacts could not load contacts from storage.', error);
      return [];
    }
  }
  function saveContactsToStorage(contacts) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var storage = resolveLocalStorage(options.scope);
    if (!storage || typeof storage.setItem !== 'function') {
      return false;
    }
    var storageKey = typeof options.storageKey === 'string' && options.storageKey ? options.storageKey : CONTACTS_STORAGE_KEY;
    try {
      storage.setItem(storageKey, JSON.stringify(Array.isArray(contacts) ? contacts : []));
      return true;
    } catch (error) {
      safeWarn('cine.features.contacts could not save contacts to storage.', error);
      return false;
    }
  }
  var moduleApi = Object.freeze({
    CONTACTS_STORAGE_KEY: CONTACTS_STORAGE_KEY,
    generateContactId: generateContactId,
    sanitizeContactValue: sanitizeContactValue,
    normalizeContactEntry: normalizeContactEntry,
    sortContacts: sortContacts,
    loadStoredContacts: loadStoredContacts,
    saveContactsToStorage: saveContactsToStorage
  });
  if (MODULE_BASE && typeof MODULE_BASE.registerOrQueueModule === 'function') {
    try {
      MODULE_BASE.registerOrQueueModule('cine.features.contacts', moduleApi, {
        category: 'features',
        description: 'Shared helpers for contacts management.',
        replace: true,
        connections: ['cineModuleBase', 'cineModuleGlobals', 'cinePersistence']
      }, function (error) {
        return safeWarn('Unable to register cine.features.contacts module.', error);
      }, GLOBAL_SCOPE, MODULE_BASE.getModuleRegistry && MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE));
    } catch (error) {
      safeWarn('cine.features.contacts registration failed.', error);
    }
  }
  if (MODULE_BASE && typeof MODULE_BASE.exposeGlobal === 'function') {
    try {
      MODULE_BASE.exposeGlobal('cineFeaturesContacts', moduleApi, GLOBAL_SCOPE, {
        configurable: true,
        enumerable: false,
        writable: false
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