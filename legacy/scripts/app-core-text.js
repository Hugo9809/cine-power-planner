/* global CORE_GLOBAL_SCOPE */
/*
 * Legacy bundle mirror for Cine Power Planner text entry helpers.
 *
 * The logic mirrors src/scripts/app-core-text.js but is transpiled friendly so
 * the legacy build can load the shared helpers before the main runtime.
 */

(function createLegacyCineCoreTextEntriesNamespace() {
  var TEXT_ENTRY_SEPARATOR = '\n';

  function normaliseTextEntryValue(entry, separator) {
    var safeSeparator = typeof separator === 'string' && separator ? separator : TEXT_ENTRY_SEPARATOR;

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
      var parts = [];
      for (var index = 0; index < entry.length; index += 1) {
        var value = normaliseTextEntryValue(entry[index], safeSeparator);
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
        var objectString = String(entry);
        if (objectString && objectString !== '[object Object]') {
          return objectString;
        }
      } catch (stringifyObjectError) {
        void stringifyObjectError;
      }
    }

    return '';
  }

  function resolveTextEntry(primaryTexts, fallbackTexts, key, defaultValue, separator) {
    var normalizedDefault = typeof defaultValue === 'string' ? defaultValue : '';
    var dictionaries = [];

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

    for (var index = 0; index < dictionaries.length; index += 1) {
      var dictionary = dictionaries[index];

      var entry;
      try {
        entry = dictionary[key];
      } catch (dictionaryLookupError) {
        void dictionaryLookupError;
        entry = undefined;
      }

      if (typeof entry === 'undefined' || entry === null) {
        continue;
      }

      var resolved = normaliseTextEntryValue(entry, separator || TEXT_ENTRY_SEPARATOR);
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

  var namespace = {
    TEXT_ENTRY_SEPARATOR: TEXT_ENTRY_SEPARATOR,
    normaliseTextEntryValue: normaliseTextEntryValue,
    resolveTextEntry: resolveTextEntry,
  };

  var globalScope = detectGlobalScope();
  if (globalScope) {
    var existing =
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

  if (typeof module === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();
