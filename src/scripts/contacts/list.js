'use strict';

const CONTACT_FIELDS = ['name', 'role', 'phone', 'email', 'website', 'notes', 'avatar'];

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
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }
  if (typeof value === 'bigint') {
    try {
      return value.toString();
    } catch (error) {
      void error;
    }
  }
  if (value && typeof value === 'object') {
    try {
      const primitive = value.valueOf();
      if (primitive !== value) {
        return sanitizeContactValue(primitive);
      }
      if (typeof value.toString === 'function') {
        const stringified = value.toString();
        if (typeof stringified === 'string' && stringified !== '[object Object]') {
          return stringified.trim();
        }
      }
    } catch (error) {
      void error;
    }
  }
  return '';
}

function normalizeContact(entry = {}, options = {}) {
  if (!entry || typeof entry !== 'object') {
    return null;
  }
  const now = typeof options.now === 'function' ? options.now() : Date.now();
  const normalized = {
    id: sanitizeContactValue(entry.id) || `contact-${now.toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    name: sanitizeContactValue(entry.name),
    role: sanitizeContactValue(entry.role),
    phone: sanitizeContactValue(entry.phone),
    email: sanitizeContactValue(entry.email),
    website: sanitizeContactValue(entry.website || entry.url),
    notes: sanitizeContactValue(entry.notes || entry.note || entry.text),
    createdAt: Number.isFinite(entry.createdAt) ? entry.createdAt : now,
    updatedAt: Number.isFinite(entry.updatedAt) ? entry.updatedAt : now,
  };
  const avatar = sanitizeContactValue(entry.avatar);
  if (avatar.startsWith('data:')) {
    normalized.avatar = avatar;
  }
  return normalized;
}

function sortContacts(list = []) {
  return (Array.isArray(list) ? list.slice() : [])
    .filter((entry) => entry && typeof entry === 'object')
    .map((entry) => normalizeContact(entry) || null)
    .filter(Boolean)
    .sort((a, b) => {
      const nameA = (a.name || '').toLowerCase();
      const nameB = (b.name || '').toLowerCase();
      if (nameA && nameB && nameA !== nameB) {
        try {
          return nameA.localeCompare(nameB);
        } catch (error) {
          void error;
        }
      }
      if (nameA && !nameB) {
        return -1;
      }
      if (!nameA && nameB) {
        return 1;
      }
      return (a.createdAt || 0) - (b.createdAt || 0);
    });
}

function parseVCard(text) {
  if (typeof text !== 'string') return [];
  const normalized = text.replace(/\r\n?/g, '\n');
  const folded = [];
  normalized.split('\n').forEach((line) => {
    if (/^[ \t]/.test(line) && folded.length) {
      folded[folded.length - 1] += line.replace(/^[ \t]/, '');
    } else {
      folded.push(line);
    }
  });
  const contacts = [];
  let current = null;
  folded.forEach((line) => {
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
      current.name = sanitizeContactValue(value);
      return;
    }
    if (baseKey === 'N' && !current.name) {
      current.name = value.split(';').filter(Boolean).join(' ').trim();
      return;
    }
    if (baseKey === 'TEL') {
      current.phone = sanitizeContactValue(value);
      return;
    }
    if (baseKey === 'EMAIL') {
      current.email = sanitizeContactValue(value);
      return;
    }
    if (baseKey === 'URL') {
      current.website = sanitizeContactValue(value);
      return;
    }
    if (baseKey === 'NOTE') {
      current.notes = sanitizeContactValue(value);
      return;
    }
    if (baseKey === 'ORG' && !current.role) {
      current.role = sanitizeContactValue(value);
      return;
    }
    if (baseKey === 'TITLE' && !current.role) {
      current.role = sanitizeContactValue(value);
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
      params.forEach((param) => {
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
    .map((entry) => normalizeContact(entry))
    .filter(Boolean);
}

function mergeVCardContacts(existingContacts = [], importedContacts = [], options = {}) {
  const existing = Array.isArray(existingContacts) ? [...existingContacts] : [];
  const imported = Array.isArray(importedContacts) ? importedContacts : [];
  const now = typeof options.now === 'function' ? options.now : () => Date.now();
  let added = 0;
  let updated = 0;
  imported.forEach((entry) => {
    const normalized = normalizeContact(entry, { now: now() });
    if (!normalized) {
      return;
    }
    const match = existing.find((contact) => {
      if (!contact) return false;
      if (normalized.email && contact.email && normalized.email.toLowerCase() === contact.email.toLowerCase()) {
        return true;
      }
      if (normalized.phone && contact.phone) {
        const normalizedPhone = normalized.phone.replace(/\D+/g, '');
        const contactPhone = contact.phone.replace(/\D+/g, '');
        if (normalizedPhone && contactPhone && normalizedPhone === contactPhone) {
          return true;
        }
      }
      if (normalized.name && contact.name && normalized.name.toLowerCase() === contact.name.toLowerCase()) {
        return true;
      }
      if (normalized.website && contact.website && normalized.website.toLowerCase() === contact.website.toLowerCase()) {
        return true;
      }
      return false;
    });
    if (match) {
      CONTACT_FIELDS.forEach((field) => {
        if (normalized[field]) {
          match[field] = normalized[field];
        }
      });
      match.updatedAt = now();
      updated += 1;
    } else {
      existing.push(normalized);
      added += 1;
    }
  });
  return { contacts: sortContacts(existing), added, updated };
}

function createContactsListState(options = {}) {
  const {
    load = () => [],
    save = () => {},
    now = () => Date.now(),
  } = options;
  let contacts = Array.isArray(load()) ? load().map((entry) => normalizeContact(entry, { now: now() })).filter(Boolean) : [];

  function persist() {
    save(contacts);
    return contacts;
  }

  function add(contact) {
    const normalized = normalizeContact(contact, { now: now() });
    if (!normalized) {
      return contacts;
    }
    contacts.push(normalized);
    contacts = sortContacts(contacts);
    return persist();
  }

  function upsert(contact) {
    const normalized = normalizeContact(contact, { now: now() });
    if (!normalized) {
      return contacts;
    }
    const index = contacts.findIndex((entry) => entry.id === normalized.id);
    if (index === -1) {
      contacts.push(normalized);
    } else {
      contacts[index] = { ...contacts[index], ...normalized, updatedAt: now() };
    }
    contacts = sortContacts(contacts);
    return persist();
  }

  function remove(contactId) {
    contacts = contacts.filter((entry) => entry.id !== contactId);
    return persist();
  }

  return {
    getContacts: () => contacts.slice(),
    add,
    upsert,
    remove,
    persist,
  };
}

function ensureDocument(options = {}) {
  if (options.document) {
    return options.document;
  }
  if (typeof document !== 'undefined') {
    return document;
  }
  throw new Error('A document reference is required to create contact cards.');
}

function createContactCard(contact, options = {}) {
  const doc = ensureDocument(options);
  const normalized = normalizeContact(contact) || normalizeContact({ name: '' });
  const card = doc.createElement('article');
  card.className = 'contact-card';
  card.dataset.contactId = normalized.id;
  const header = doc.createElement('header');
  header.className = 'contact-card__header';
  const title = doc.createElement('h3');
  title.textContent = normalized.name || options.fallbackName || options.fallbackLabel || 'Crew contact';
  header.appendChild(title);
  card.appendChild(header);
  const list = doc.createElement('dl');
  CONTACT_FIELDS.forEach((field) => {
    if (!normalized[field]) return;
    const dt = doc.createElement('dt');
    dt.textContent = field;
    const dd = doc.createElement('dd');
    dd.textContent = normalized[field];
    list.appendChild(dt);
    list.appendChild(dd);
  });
  if (!list.children.length) {
    const empty = doc.createElement('p');
    empty.textContent = options.emptyMessage || 'No details yet.';
    card.appendChild(empty);
  } else {
    card.appendChild(list);
  }
  return card;
}

function syncCrewRow(row, contact, options = {}) {
  const normalized = normalizeContact(contact);
  if (!row || !normalized) {
    return null;
  }
  const fields = {
    name: options.nameSelector || '.person-name',
    role: options.roleSelector || '.person-role',
    phone: options.phoneSelector || '.person-phone',
    email: options.emailSelector || '.person-email',
    website: options.websiteSelector || '.person-website',
    notes: options.notesSelector || '.person-notes',
  };
  const result = {};
  Object.keys(fields).forEach((field) => {
    const selector = fields[field];
    if (!selector) return;
    let target = null;
    if (typeof row.querySelector === 'function') {
      target = row.querySelector(selector);
    } else if (row[selector]) {
      target = row[selector];
    }
    const value = normalized[field] || '';
    if (target && Object.prototype.hasOwnProperty.call(target, 'value')) {
      target.value = value;
    } else if (target && typeof target.textContent === 'string') {
      target.textContent = value;
    }
    result[field] = value;
  });
  if (row.dataset) {
    row.dataset.contactId = normalized.id;
  } else {
    row.contactId = normalized.id;
  }
  return result;
}

module.exports = {
  CONTACT_FIELDS,
  sanitizeContactValue,
  normalizeContact,
  sortContacts,
  parseVCard,
  mergeVCardContacts,
  createContactsListState,
  createContactCard,
  syncCrewRow,
};
