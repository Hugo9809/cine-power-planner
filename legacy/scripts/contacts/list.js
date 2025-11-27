'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _toArray(r) { return _arrayWithHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var DEFAULT_CONTACT_FIELDS = Object.freeze(['id', 'name', 'role', 'phone', 'email', 'website', 'avatar', 'createdAt', 'updatedAt']);
function sanitizeContactValue(value) {
  if (typeof value !== 'string') return '';
  return value.trim();
}
function createIdGenerator() {
  return function () {
    return "contact-".concat(Date.now().toString(36), "-").concat(Math.random().toString(36).slice(2, 8));
  };
}
function normalizeContactEntry() {
  var entry = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var generateContactId = typeof options.generateContactId === 'function' ? options.generateContactId : createIdGenerator();
  var id = sanitizeContactValue(entry.id) || generateContactId();
  var name = sanitizeContactValue(entry.name);
  var role = sanitizeContactValue(entry.role);
  var phone = sanitizeContactValue(entry.phone);
  var email = sanitizeContactValue(entry.email);
  var website = sanitizeContactValue(entry.website);
  var avatar = typeof entry.avatar === 'string' && entry.avatar.startsWith('data:') ? entry.avatar : '';
  var createdAt = Number.isFinite(entry.createdAt) ? entry.createdAt : Date.now();
  var updatedAt = Number.isFinite(entry.updatedAt) ? entry.updatedAt : createdAt;
  return {
    id: id,
    name: name,
    role: role,
    phone: phone,
    email: email,
    website: website,
    avatar: avatar,
    createdAt: createdAt,
    updatedAt: updatedAt
  };
}
function sortContacts() {
  var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return list.map(function (entry) {
    return normalizeContactEntry(entry);
  }).filter(Boolean).sort(function (a, b) {
    var nameA = ((a === null || a === void 0 ? void 0 : a.name) || '').toLowerCase();
    var nameB = ((b === null || b === void 0 ? void 0 : b.name) || '').toLowerCase();
    if (nameA && nameB && nameA !== nameB) {
      try {
        return nameA.localeCompare(nameB);
      } catch (error) {
        void error;
      }
    }
    if (nameA && !nameB) return -1;
    if (!nameA && nameB) return 1;
    return ((a === null || a === void 0 ? void 0 : a.createdAt) || 0) - ((b === null || b === void 0 ? void 0 : b.createdAt) || 0);
  });
}
function parseVCard(text) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var sanitize = typeof options.sanitize === 'function' ? options.sanitize : sanitizeContactValue;
  if (typeof text !== 'string') return [];
  var normalized = text.replace(/\r\n?/g, '\n');
  var folded = [];
  normalized.split('\n').forEach(function (line) {
    if (/^[ \t]/.test(line) && folded.length) {
      folded[folded.length - 1] += line.replace(/^[ \t]/, '');
    } else {
      folded.push(line);
    }
  });
  var contacts = [];
  var current = null;
  folded.forEach(function (line) {
    var _keySegments$;
    if (/^BEGIN:VCARD/i.test(line)) {
      current = {
        name: '',
        role: '',
        phone: '',
        email: '',
        website: '',
        avatar: ''
      };
      return;
    }
    if (/^END:VCARD/i.test(line)) {
      if (current && (current.name || current.email || current.phone || current.website)) {
        contacts.push(_objectSpread({}, current));
      }
      current = null;
      return;
    }
    if (!current) return;
    var _line$split = line.split(':'),
      _line$split2 = _toArray(_line$split),
      rawKey = _line$split2[0],
      rawValueParts = _line$split2.slice(1);
    if (!rawValueParts.length) return;
    var keySegments = rawKey.split(';');
    var baseKey = (_keySegments$ = keySegments[0]) === null || _keySegments$ === void 0 ? void 0 : _keySegments$.toUpperCase();
    var value = rawValueParts.join(':').trim();
    if (!baseKey) return;
    if (baseKey === 'FN') {
      current.name = sanitize(value);
      return;
    }
    if (baseKey === 'N' && !current.name) {
      current.name = value.split(';').filter(Boolean).join(' ').trim();
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
      var dataValue = value;
      if (!dataValue) return;
      if (/^data:/i.test(dataValue)) {
        current.avatar = dataValue;
        return;
      }
      var params = keySegments.slice(1);
      var mime = 'image/jpeg';
      params.forEach(function (param) {
        var _param$split = param.split('='),
          _param$split2 = _slicedToArray(_param$split, 2),
          paramKey = _param$split2[0],
          paramValue = _param$split2[1];
        if (!paramValue) return;
        var normalizedKey = paramKey.trim().toUpperCase();
        var normalizedValue = paramValue.trim();
        if (normalizedKey === 'MEDIATYPE') {
          mime = normalizedValue;
        } else if (normalizedKey === 'TYPE') {
          var lowered = normalizedValue.toLowerCase();
          if (lowered.includes('/')) {
            mime = lowered;
          } else {
            mime = "image/".concat(lowered);
          }
        }
      });
      current.avatar = "data:".concat(mime, ";base64,").concat(dataValue);
    }
  });
  return contacts.map(function (entry) {
    return {
      name: sanitize(entry.name),
      role: sanitize(entry.role),
      phone: sanitize(entry.phone),
      email: sanitize(entry.email),
      website: sanitize(entry.website),
      avatar: typeof entry.avatar === 'string' && entry.avatar.startsWith('data:') ? entry.avatar : ''
    };
  }).filter(function (entry) {
    return entry.name || entry.email || entry.phone || entry.website;
  });
}
function mergeImportedContacts() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$existing = options.existing,
    existing = _options$existing === void 0 ? [] : _options$existing,
    _options$imported = options.imported,
    imported = _options$imported === void 0 ? [] : _options$imported,
    _options$now = options.now,
    now = _options$now === void 0 ? function () {
      return Date.now();
    } : _options$now,
    _options$generateCont = options.generateContactId,
    generateContactId = _options$generateCont === void 0 ? createIdGenerator() : _options$generateCont;
  var contacts = existing.map(function (entry) {
    return normalizeContactEntry(entry, {
      generateContactId: generateContactId
    });
  });
  var added = 0;
  var updated = 0;
  imported.forEach(function (entry) {
    var candidate = normalizeContactEntry(_objectSpread(_objectSpread({}, entry), {}, {
      id: entry.id || generateContactId(),
      createdAt: now(),
      updatedAt: now()
    }), {
      generateContactId: generateContactId
    });
    var existingMatch = contacts.find(function (contact) {
      if (candidate.email && contact.email && candidate.email.toLowerCase() === contact.email.toLowerCase()) return true;
      if (candidate.phone && contact.phone) {
        var normalizedCandidate = candidate.phone.replace(/\D+/g, '');
        var normalizedExisting = contact.phone.replace(/\D+/g, '');
        if (normalizedCandidate && normalizedExisting && normalizedCandidate === normalizedExisting) return true;
      }
      if (candidate.name && contact.name && candidate.name.toLowerCase() === contact.name.toLowerCase()) return true;
      if (candidate.website && contact.website && candidate.website.toLowerCase() === contact.website.toLowerCase()) return true;
      return false;
    });
    if (existingMatch) {
      DEFAULT_CONTACT_FIELDS.forEach(function (field) {
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
    added: added,
    updated: updated
  };
}
function createCrewRowSync() {
  var rowState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var contact = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var next = _objectSpread({}, rowState);
  next.role = contact.role || '';
  next.name = contact.name || '';
  next.phone = contact.phone || '';
  next.email = contact.email || '';
  next.website = contact.website || '';
  next.avatar = contact.avatar || '';
  next.contactId = contact.id || '';
  return next;
}
var CONTACT_LIST_MODULE_EXPORT = {
  sanitizeContactValue: sanitizeContactValue,
  normalizeContactEntry: normalizeContactEntry,
  sortContacts: sortContacts,
  parseVCard: parseVCard,
  mergeImportedContacts: mergeImportedContacts,
  createCrewRowSync: createCrewRowSync
};
assignContactsListExports(CONTACT_LIST_MODULE_EXPORT);
function assignContactsListExports(exportsObject) {
  if (!exportsObject || _typeof(exportsObject) !== 'object') {
    return;
  }
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && typeof module.exports !== 'undefined') {
    module.exports = exportsObject;
    return;
  }
  var scope = resolveContactsGlobalScope();
  if (scope) {
    scope.CINE_CONTACTS_LIST_MODULE = exportsObject;
  }
}
function resolveContactsGlobalScope() {
  if (typeof globalThis !== 'undefined') {
    return globalThis;
  }
  if (typeof self !== 'undefined') {
    return self;
  }
  if (typeof window !== 'undefined') {
    return window;
  }
  if (typeof global !== 'undefined') {
    return global;
  }
  return null;
}