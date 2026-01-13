/* global CORE_GLOBAL_SCOPE */
/*
 * Cine Power Planner text entry helpers.
 *
 * The historic monolithic runtime stored these helpers alongside the core
 * application logic. As part of the ongoing refactor we extracted them into
 * a dedicated namespace so both the modern and legacy bundles can share a
 * single implementation without pulling additional dependencies.
 */

// (function createCineCoreTextEntriesNamespace() {
const TEXT_ENTRY_SEPARATOR = '\n';

function normaliseTextEntryValue(entry, separator = TEXT_ENTRY_SEPARATOR) {
  const safeSeparator = typeof separator === 'string' && separator ? separator : TEXT_ENTRY_SEPARATOR;

  if (typeof entry === 'string') {
    return entry;
  }

  if (typeof entry === 'number' || typeof entry === 'boolean') {
    try {
      return String(entry);
    } catch (stringifyPrimitiveError) {
      void stringifyPrimitiveError;
    }
    return '';
  }

  if (Array.isArray(entry)) {
    const parts = [];
    for (let index = 0; index < entry.length; index += 1) {
      const value = normaliseTextEntryValue(entry[index], safeSeparator);
      if (value) {
        parts.push(value);
      }
    }
    return parts.join(safeSeparator);
  }

  if (entry && typeof entry === 'object') {
    if (typeof entry.text === 'string') {
      return entry.text;
    }

    if (Array.isArray(entry.text)) {
      return normaliseTextEntryValue(entry.text, safeSeparator);
    }

    if (typeof entry.label === 'string') {
      return entry.label;
    }

    try {
      const objectString = String(entry);
      if (objectString && objectString !== '[object Object]') {
        return objectString;
      }
    } catch (stringifyObjectError) {
      void stringifyObjectError;
    }
  }

  return '';
}

function resolveTextEntry(
  primaryTexts,
  fallbackTexts,
  key,
  defaultValue = '',
  separator = TEXT_ENTRY_SEPARATOR
) {
  const normalizedDefault = typeof defaultValue === 'string' ? defaultValue : '';
  const dictionaries = [];

  if (primaryTexts && (typeof primaryTexts === 'object' || typeof primaryTexts === 'function')) {
    dictionaries.push(primaryTexts);
  }

  if (
    fallbackTexts &&
    fallbackTexts !== primaryTexts &&
    (typeof fallbackTexts === 'object' || typeof fallbackTexts === 'function')
  ) {
    dictionaries.push(fallbackTexts);
  }

  for (let index = 0; index < dictionaries.length; index += 1) {
    const dictionary = dictionaries[index];

    let entry;
    try {
      entry = dictionary[key];
    } catch (dictionaryLookupError) {
      void dictionaryLookupError;
      entry = undefined;
    }

    if (typeof entry === 'undefined' || entry === null) {
      continue;
    }

    const resolved = normaliseTextEntryValue(entry, separator);
    if (typeof resolved === 'string') {
      return resolved;
    }
  }

  return normalizedDefault;
}

function detectGlobalScope() {
  if (
    typeof CORE_GLOBAL_SCOPE !== 'undefined' &&
    CORE_GLOBAL_SCOPE &&
    typeof CORE_GLOBAL_SCOPE === 'object'
  ) {
    return CORE_GLOBAL_SCOPE;
  }

  if (typeof globalThis !== 'undefined' && globalThis && typeof globalThis === 'object') {
    return globalThis;
  }

  if (typeof window !== 'undefined' && window && typeof window === 'object') {
    return window;
  }

  if (typeof self !== 'undefined' && self && typeof self === 'object') {
    return self;
  }

  if (typeof global !== 'undefined' && global && typeof global === 'object') {
    return global;
  }

  return null;
}

const namespace = {
  TEXT_ENTRY_SEPARATOR,
  normaliseTextEntryValue,
  resolveTextEntry,
};

const globalScope = detectGlobalScope();
if (globalScope) {
  const existing =
    globalScope.cineCoreTextEntries && typeof globalScope.cineCoreTextEntries === 'object'
      ? globalScope.cineCoreTextEntries
      : {};

  existing.TEXT_ENTRY_SEPARATOR = TEXT_ENTRY_SEPARATOR;
  existing.normaliseTextEntryValue = normaliseTextEntryValue;
  existing.resolveTextEntry = resolveTextEntry;

  try {
    globalScope.cineCoreTextEntries = existing;
  } catch (assignError) {
    void assignError;
  }
}

// })();

export default namespace;
