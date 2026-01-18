/* global cineModuleBase */

// ---------------------------------------------------------------------------
// Contacts feature module
// ---------------------------------------------------------------------------
// The contacts helper keeps personal crew information alongside the power
// planner project data. Because these records can include critical call sheet
// notes we keep the implementation intentionally small and well documented.
// The additional comments below explain how each helper works so that future
// maintainers understand the user data safeguards without having to reverse
// engineer the storage flow.

// ESM Version
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

// Prefer the runtime provided logging facade so that diagnostics remain
// consistent across the application. Falling back to console.warn keeps the
// module functional inside tests and legacy entry points.
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

// Contacts live under a dedicated storage key to avoid colliding with other
// project level metadata. The name mirrors the legacy implementation so
// existing backups import cleanly.
const CONTACTS_STORAGE_KEY = 'cameraPowerPlanner_contacts';

function resolveLocalStorage(scope) {
  // The helper intentionally accepts an optional scope so that callers can
  // inject mocked storage instances during tests. When no override is
  // provided we fall back to the detected global scope.
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
  // Persisting a random suffix avoids accidental collisions when multiple
  // contacts are created in quick succession before the autosave triggers.
  return `contact-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function sanitizeContactValue(value) {
  // Every field in the contact form is stored as a trimmed string so backup
  // exports stay compact and predictable. Numeric and boolean values from
  // older backups are coerced to strings instead of being dropped so that no
  // contact information is lost during migrations.
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

  if (value && typeof value === 'object') {
    try {
      const primitive = value.valueOf();
      if (primitive !== value) {
        return sanitizeContactValue(primitive);
      }

      if (typeof value.toString === 'function') {
        const stringified = value.toString();
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
  // The normalisation step ensures that manually constructed contacts (for
  // example when importing older backups) adopt the latest schema without
  // mutating the original payload. This is critical for preserving user data
  // across application upgrades.
  if (!entry || typeof entry !== 'object') {
    return null;
  }

  const id = sanitizeContactValue(entry.id) || generateContactId();
  const name = sanitizeContactValue(entry.name);
  const role = sanitizeContactValue(entry.role);
  const phone = sanitizeContactValue(entry.phone);
  const email = sanitizeContactValue(entry.email);
  const website = sanitizeContactValue(entry.website || entry.url);
  const notes = sanitizeContactValue(entry.notes || entry.note || entry.text);
  const avatar = typeof entry.avatar === 'string' && entry.avatar.startsWith('data:')
    ? entry.avatar
    : '';
  const createdAt = Number.isFinite(entry.createdAt) ? entry.createdAt : Date.now();
  const updatedAt = Number.isFinite(entry.updatedAt) ? entry.updatedAt : createdAt;

  const normalized = { id, name, role, phone, email, website, notes, createdAt, updatedAt };
  if (avatar) {
    normalized.avatar = avatar;
  }

  return normalized;
}

function sortContacts(list) {
  // Contacts are sorted alphabetically so that the UI provides a predictable
  // reading order. When names are missing we fall back to creation time which
  // keeps imported records stable.
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
  // The load helper wraps JSON.parse inside a try/catch so that a single
  // corrupted entry never risks crashing the surrounding autosave recovery.
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
  // We serialise the entire contact list in one go to avoid partial writes.
  // This keeps backups and offline snapshots coherent even if the browser
  // crashes mid-operation.
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

function generateVCard(contact) {
  if (!contact || typeof contact !== 'object') return '';
  const lines = ['BEGIN:VCARD', 'VERSION:3.0'];

  if (contact.name) {
    lines.push(`FN:${contact.name}`);
    const parts = contact.name.trim().split(/\s+/);
    if (parts.length >= 2) {
      // Last name;First name;Middle;Prefix;Suffix
      lines.push(`N:${parts.slice(1).join(' ')};${parts[0]};;;`);
    } else {
      lines.push(`N:;${contact.name};;;`);
    }
  }

  if (contact.role) lines.push(`TITLE:${contact.role}`);
  if (contact.phone) lines.push(`TEL:${contact.phone}`);
  if (contact.email) lines.push(`EMAIL:${contact.email}`);
  if (contact.website) lines.push(`URL:${contact.website}`);
  if (contact.notes) lines.push(`NOTE:${contact.notes.replace(/\r?\n/g, '\\n')}`);

  // Avatar as PHOTO if present (base64)
  if (contact.avatar && contact.avatar.startsWith('data:')) {
    try {
      const [header, data] = contact.avatar.split(',');
      const mimeMatch = header.match(/data:([^;]+)/);
      const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
      const type = mime.split('/')[1].toUpperCase();
      lines.push(`PHOTO;ENCODING=b;TYPE=${type}:${data}`);
    } catch (e) {
      safeWarn('Failed to encode avatar for vCard', e);
    }
  }

  lines.push('END:VCARD');
  return lines.join('\r\n');
}

function generateAllContactsVCard(contacts) {
  if (!Array.isArray(contacts) || contacts.length === 0) return '';
  return contacts.map(generateVCard).join('\r\n\r\n');
}

const DEFAULT_CONTACT_FIELDS = Object.freeze(['id', 'name', 'role', 'phone', 'email', 'website', 'avatar', 'createdAt', 'updatedAt']);

function parseVCard(text, options = {}) {
  const sanitize = typeof options.sanitize === 'function' ? options.sanitize : sanitizeContactValue;
  if (typeof text !== 'string') return [];
  const normalized = text.replace(/\r\n?/g, '\n');
  const folded = [];
  normalized.split('\n').forEach(line => {
    if (/^[ \t]/.test(line) && folded.length) {
      folded[folded.length - 1] += line.replace(/^[ \t]/, '');
    } else {
      folded.push(line);
    }
  });
  const contacts = [];
  let current = null;
  folded.forEach(line => {
    if (/^BEGIN:VCARD/i.test(line)) {
      current = { name: '', role: '', phone: '', email: '', website: '', avatar: '' };
      return;
    }
    if (/^END:VCARD/i.test(line)) {
      if (current && (current.name || current.email || current.phone || current.website)) {
        contacts.push({ ...current });
      }
      current = null;
      return;
    }
    if (!current) return;
    const [rawKey, ...rawValueParts] = line.split(':');
    if (!rawValueParts.length) return;
    const keySegments = rawKey.split(';');
    const baseKey = keySegments[0]?.toUpperCase();
    const value = rawValueParts.join(':').trim();
    if (!baseKey) return;
    if (baseKey === 'FN') {
      current.name = sanitize(value);
      return;
    }
    if (baseKey === 'N' && !current.name) {
      current.name = value
        .split(';')
        .filter(Boolean)
        .join(' ')
        .trim();
      return;
    }
    if (baseKey === 'TEL') {
      if (!current.phone) current.phone = sanitize(value);
      return;
    }
    if (baseKey === 'EMAIL') {
      if (!current.email) current.email = sanitize(value);
      return;
    }
    if (baseKey === 'URL' || /\.URL$/.test(baseKey)) {
      if (!current.website) current.website = sanitize(value);
      return;
    }
    if ((baseKey === 'ROLE' || baseKey === 'TITLE') && !current.role) {
      current.role = sanitize(value);
      return;
    }
    if (baseKey === 'ORG' && !current.role) {
      current.role = sanitize(value);
      return;
    }
    if (baseKey === 'PHOTO') {
      let dataValue = value;
      if (!dataValue) return;
      if (/^data:/i.test(dataValue)) {
        current.avatar = dataValue;
        return;
      }
      const params = keySegments.slice(1);
      let mime = 'image/jpeg';
      params.forEach(param => {
        const [paramKey, paramValue] = param.split('=');
        if (!paramValue) return;
        const normalizedKey = paramKey.trim().toUpperCase();
        const normalizedValue = paramValue.trim();
        if (normalizedKey === 'MEDIATYPE') {
          mime = normalizedValue;
        } else if (normalizedKey === 'TYPE') {
          const lowered = normalizedValue.toLowerCase();
          if (lowered.includes('/')) {
            mime = lowered;
          } else {
            mime = `image/${lowered}`;
          }
        }
      });
      current.avatar = `data:${mime};base64,${dataValue}`;
    }
  });
  return contacts
    .map(entry => ({
      name: sanitize(entry.name),
      role: sanitize(entry.role),
      phone: sanitize(entry.phone),
      email: sanitize(entry.email),
      website: sanitize(entry.website),
      avatar: typeof entry.avatar === 'string' && entry.avatar.startsWith('data:') ? entry.avatar : ''
    }))
    .filter(entry => entry.name || entry.email || entry.phone || entry.website);
}

function mergeImportedContacts(options = {}) {
  const {
    existing = [],
    imported = [],
    now = () => Date.now(),
    generateContactIdFn = generateContactId
  } = options;
  const contacts = existing.map(entry => normalizeContactEntry(entry));
  let added = 0;
  let updated = 0;
  imported.forEach(entry => {
    const candidate = normalizeContactEntry({
      ...entry,
      id: entry.id || generateContactIdFn(),
      createdAt: now(),
      updatedAt: now()
    });

    // Attempt to match existing contact
    const existingMatch = contacts.find(contact => {
      if (candidate.email && contact.email && candidate.email.toLowerCase() === contact.email.toLowerCase()) return true;
      if (candidate.phone && contact.phone) {
        const normalizedCandidate = candidate.phone.replace(/\D+/g, '');
        const normalizedExisting = contact.phone.replace(/\D+/g, '');
        if (normalizedCandidate && normalizedExisting && normalizedCandidate === normalizedExisting) return true;
      }
      if (candidate.name && contact.name && candidate.name.toLowerCase() === contact.name.toLowerCase()) return true;
      if (candidate.website && contact.website && candidate.website.toLowerCase() === contact.website.toLowerCase()) return true;
      return false;
    });

    if (existingMatch) {
      DEFAULT_CONTACT_FIELDS.forEach(field => {
        if (candidate[field]) {
          existingMatch[field] = candidate[field];
        }
      });
      existingMatch.updatedAt = now();
      updated += 1;
    } else {
      contacts.push(candidate);
      added += 1;
    }
  });
  return {
    contacts: sortContacts(contacts),
    added,
    updated
  };
}

const moduleApi = Object.freeze({
  CONTACTS_STORAGE_KEY,
  generateContactId,
  sanitizeContactValue,
  normalizeContactEntry,
  sortContacts,
  loadStoredContacts,
  saveContactsToStorage,
  generateVCard,
  generateAllContactsVCard,
  parseVCard,
  mergeImportedContacts,
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

let exposedViaModuleBase = false;
if (MODULE_BASE && typeof MODULE_BASE.exposeGlobal === 'function') {
  try {
    MODULE_BASE.exposeGlobal('cineFeaturesContacts', moduleApi, GLOBAL_SCOPE, {
      configurable: true,
      enumerable: false,
      writable: false,
    });
    exposedViaModuleBase = true;
  } catch (error) {
    safeWarn('cine.features.contacts could not expose global api.', error);
  }
}

if (!exposedViaModuleBase) {
  try {
    GLOBAL_SCOPE.cineFeaturesContacts = moduleApi;
  } catch (error) {
    safeWarn('cine.features.contacts could not assign global api.', error);
  }
}

// ESM Export
export default moduleApi;
