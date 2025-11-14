'use strict';

const DEFAULT_CONTACT_FIELDS = Object.freeze(['id', 'name', 'role', 'phone', 'email', 'website', 'avatar', 'createdAt', 'updatedAt']);

function sanitizeContactValue(value) {
  if (typeof value !== 'string') return '';
  return value.trim();
}

function createIdGenerator() {
  return () => `contact-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeContactEntry(entry = {}, options = {}) {
  const generateContactId = typeof options.generateContactId === 'function' ? options.generateContactId : createIdGenerator();
  const id = sanitizeContactValue(entry.id) || generateContactId();
  const name = sanitizeContactValue(entry.name);
  const role = sanitizeContactValue(entry.role);
  const phone = sanitizeContactValue(entry.phone);
  const email = sanitizeContactValue(entry.email);
  const website = sanitizeContactValue(entry.website);
  const avatar = typeof entry.avatar === 'string' && entry.avatar.startsWith('data:') ? entry.avatar : '';
  const createdAt = Number.isFinite(entry.createdAt) ? entry.createdAt : Date.now();
  const updatedAt = Number.isFinite(entry.updatedAt) ? entry.updatedAt : createdAt;
  return { id, name, role, phone, email, website, avatar, createdAt, updatedAt };
}

function sortContacts(list = []) {
  return list
    .map(entry => normalizeContactEntry(entry))
    .filter(Boolean)
    .sort((a, b) => {
      const nameA = (a?.name || '').toLowerCase();
      const nameB = (b?.name || '').toLowerCase();
      if (nameA && nameB && nameA !== nameB) {
        try {
          return nameA.localeCompare(nameB);
        } catch (error) {
          void error;
        }
      }
      if (nameA && !nameB) return -1;
      if (!nameA && nameB) return 1;
      return (a?.createdAt || 0) - (b?.createdAt || 0);
    });
}

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
    generateContactId = createIdGenerator()
  } = options;
  const contacts = existing.map(entry => normalizeContactEntry(entry, { generateContactId }));
  let added = 0;
  let updated = 0;
  imported.forEach(entry => {
    const candidate = normalizeContactEntry(
      {
        ...entry,
        id: entry.id || generateContactId(),
        createdAt: now(),
        updatedAt: now()
      },
      { generateContactId }
    );
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

function createCrewRowSync(rowState = {}, contact = {}) {
  const next = { ...rowState };
  next.role = contact.role || '';
  next.name = contact.name || '';
  next.phone = contact.phone || '';
  next.email = contact.email || '';
  next.website = contact.website || '';
  next.avatar = contact.avatar || '';
  next.contactId = contact.id || '';
  return next;
}

module.exports = {
  sanitizeContactValue,
  normalizeContactEntry,
  sortContacts,
  parseVCard,
  mergeImportedContacts,
  createCrewRowSync
};
