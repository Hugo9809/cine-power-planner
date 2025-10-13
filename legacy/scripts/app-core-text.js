function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function createCineCoreTextEntriesNamespace() {
  var TEXT_ENTRY_SEPARATOR = '\n';
  function normaliseTextEntryValue(entry) {
    var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TEXT_ENTRY_SEPARATOR;
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
    if (entry && _typeof(entry) === 'object') {
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
  function resolveTextEntry(primaryTexts, fallbackTexts, key) {
    var defaultValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    var separator = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : TEXT_ENTRY_SEPARATOR;
    var normalizedDefault = typeof defaultValue === 'string' ? defaultValue : '';
    var dictionaries = [];
    if (primaryTexts && (_typeof(primaryTexts) === 'object' || typeof primaryTexts === 'function')) {
      dictionaries.push(primaryTexts);
    }
    if (fallbackTexts && fallbackTexts !== primaryTexts && (_typeof(fallbackTexts) === 'object' || typeof fallbackTexts === 'function')) {
      dictionaries.push(fallbackTexts);
    }
    for (var index = 0; index < dictionaries.length; index += 1) {
      var dictionary = dictionaries[index];
      var entry = void 0;
      try {
        entry = dictionary[key];
      } catch (dictionaryLookupError) {
        void dictionaryLookupError;
        entry = undefined;
      }
      if (typeof entry === 'undefined' || entry === null) {
        continue;
      }
      var resolved = normaliseTextEntryValue(entry, separator);
      if (typeof resolved === 'string') {
        return resolved;
      }
    }
    return normalizedDefault;
  }
  function detectGlobalScope() {
    if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && (typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object') {
      return CORE_GLOBAL_SCOPE;
    }
    if (typeof globalThis !== 'undefined' && globalThis && (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object') {
      return globalThis;
    }
    if (typeof window !== 'undefined' && window && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
      return window;
    }
    if (typeof self !== 'undefined' && self && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object') {
      return self;
    }
    if (typeof global !== 'undefined' && global && (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object') {
      return global;
    }
    return null;
  }
  var namespace = {
    TEXT_ENTRY_SEPARATOR: TEXT_ENTRY_SEPARATOR,
    normaliseTextEntryValue: normaliseTextEntryValue,
    resolveTextEntry: resolveTextEntry
  };
  var globalScope = detectGlobalScope();
  if (globalScope) {
    var existing = globalScope.cineCoreTextEntries && _typeof(globalScope.cineCoreTextEntries) === 'object' ? globalScope.cineCoreTextEntries : {};
    existing.TEXT_ENTRY_SEPARATOR = TEXT_ENTRY_SEPARATOR;
    existing.normaliseTextEntryValue = normaliseTextEntryValue;
    existing.resolveTextEntry = resolveTextEntry;
    try {
      globalScope.cineCoreTextEntries = existing;
    } catch (assignError) {
      void assignError;
    }
  }
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();