'use strict';

function toTypeArray(value) {
  if (Array.isArray(value)) {
    return value.filter(item => typeof item === 'string' && item.trim()).map(item => item.trim());
  }
  if (typeof value === 'string' && value.trim()) {
    return [value.trim()];
  }
  return [];
}

function normalizePowerInputEntry(entry) {
  if (!entry || typeof entry !== 'object') {
    return null;
  }

  const typeValues = toTypeArray(entry.type || entry.portType || entry.connectorType);
  const voltageRange = typeof entry.voltageRange === 'string' ? entry.voltageRange : '';
  const notes = typeof entry.notes === 'string' ? entry.notes : '';

  if (!typeValues.length && !voltageRange && !notes) {
    return null;
  }

  const normalized = { type: typeValues };
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

  const entries = [];
  const appendEntry = candidate => {
    const normalized = normalizePowerInputEntry(candidate);
    if (normalized) {
      entries.push(normalized);
    }
  };

  if (Array.isArray(raw)) {
    raw.forEach(appendEntry);
  } else if (typeof raw === 'string' && raw.trim()) {
    appendEntry({ type: raw.trim() });
  } else if (typeof raw === 'object') {
    appendEntry(raw);
  }

  return entries;
}

function mergePowerInput(existingPower, inputValue) {
  if (typeof inputValue === 'undefined') {
    return undefined;
  }

  const base = existingPower && typeof existingPower === 'object' ? { ...existingPower } : {};
  base.input = inputValue;
  return base;
}

module.exports = {
  normalizePowerInputList,
  mergePowerInput,
};
