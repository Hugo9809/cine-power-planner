'use strict';

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function toTypeArray(value) {
  if (Array.isArray(value)) {
    return value.filter(function (item) {
      return typeof item === 'string' && item.trim();
    }).map(function (item) {
      return item.trim();
    });
  }
  if (typeof value === 'string' && value.trim()) {
    return [value.trim()];
  }
  return [];
}
function normalizePowerInputEntry(entry) {
  if (!entry || _typeof(entry) !== 'object') {
    return null;
  }
  var typeValues = toTypeArray(entry.type || entry.portType || entry.connectorType);
  var voltageRange = typeof entry.voltageRange === 'string' ? entry.voltageRange : '';
  var notes = typeof entry.notes === 'string' ? entry.notes : '';
  if (!typeValues.length && !voltageRange && !notes) {
    return null;
  }
  var normalized = {
    type: typeValues
  };
  if (voltageRange) {
    normalized.voltageRange = voltageRange;
  }
  if (notes) {
    normalized.notes = notes;
  }
  return normalized;
}
function normalizePowerInputList(raw) {
  if (!raw) {
    return [];
  }
  var entries = [];
  var appendEntry = function appendEntry(candidate) {
    var normalized = normalizePowerInputEntry(candidate);
    if (normalized) {
      entries.push(normalized);
    }
  };
  if (Array.isArray(raw)) {
    raw.forEach(appendEntry);
  } else if (typeof raw === 'string' && raw.trim()) {
    appendEntry({
      type: raw.trim()
    });
  } else if (_typeof(raw) === 'object') {
    appendEntry(raw);
  }
  return entries;
}
function mergePowerInput(existingPower, inputValue) {
  if (typeof inputValue === 'undefined') {
    return undefined;
  }
  var base = existingPower && _typeof(existingPower) === 'object' ? _objectSpread({}, existingPower) : {};
  base.input = inputValue;
  return base;
}
module.exports = {
  normalizePowerInputList: normalizePowerInputList,
  mergePowerInput: mergePowerInput
};