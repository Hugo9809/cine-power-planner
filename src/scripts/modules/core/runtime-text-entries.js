(function () {
  const DEFAULT_SEPARATOR = '\n';

  function isObject(value) {
    return !!value && (typeof value === 'object' || typeof value === 'function');
  }

  function detectGlobalScope(primaryScope) {
    if (isObject(primaryScope)) {
      return primaryScope;
    }

    if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && isObject(CORE_GLOBAL_SCOPE)) {
      return CORE_GLOBAL_SCOPE;
    }

    if (typeof globalThis !== 'undefined' && isObject(globalThis)) {
      return globalThis;
    }

    if (typeof window !== 'undefined' && isObject(window)) {
      return window;
    }

    if (typeof self !== 'undefined' && isObject(self)) {
      return self;
    }

    if (typeof global !== 'undefined' && isObject(global)) {
      return global;
    }

    return null;
  }

  function registerScope(scopes, seen, scope) {
    if (!Array.isArray(scopes) || !isObject(scope)) {
      return;
    }

    if (seen) {
      if (seen.has(scope)) {
        return;
      }
      seen.add(scope);
      scopes.push(scope);
      return;
    }

    if (scopes.indexOf(scope) === -1) {
      scopes.push(scope);
    }
  }

  function collectCandidateScopes(primaryScope, candidateScopes) {
    const scopes = [];
    const seen = typeof Set === 'function' ? new Set() : null;

    if (Array.isArray(candidateScopes)) {
      for (let index = 0; index < candidateScopes.length; index += 1) {
        registerScope(scopes, seen, candidateScopes[index]);
      }
    } else if (isObject(candidateScopes)) {
      registerScope(scopes, seen, candidateScopes);
    }

    registerScope(scopes, seen, primaryScope);
    registerScope(scopes, seen, detectGlobalScope(primaryScope));
    registerScope(scopes, seen, typeof CORE_GLOBAL_SCOPE !== 'undefined' ? CORE_GLOBAL_SCOPE : null);
    registerScope(scopes, seen, typeof globalThis !== 'undefined' ? globalThis : null);
    registerScope(scopes, seen, typeof window !== 'undefined' ? window : null);
    registerScope(scopes, seen, typeof self !== 'undefined' ? self : null);
    registerScope(scopes, seen, typeof global !== 'undefined' ? global : null);

    return scopes;
  }

  function readTextEntryNamespace(options) {
    const namespaceName = 'cineCoreTextEntries';
    const primaryScope = options && options.primaryScope;
    const candidateScopes = collectCandidateScopes(
      primaryScope,
      options && options.candidateScopes
    );

    for (let index = 0; index < candidateScopes.length; index += 1) {
      const scope = candidateScopes[index];
      if (!isObject(scope)) {
        continue;
      }

      try {
        const namespace = scope[namespaceName];
        if (isObject(namespace)) {
          return namespace;
        }
      } catch (namespaceLookupError) {
        void namespaceLookupError;
      }
    }

    try {
      if (typeof cineCoreTextEntries !== 'undefined' && isObject(cineCoreTextEntries)) {
        return cineCoreTextEntries;
      }
    } catch (cineCoreTextEntriesError) {
      void cineCoreTextEntriesError;
    }

    if (typeof require === 'function') {
      try {
        const requiredTools = require('../app-core-text.js');
        if (isObject(requiredTools)) {
          return requiredTools;
        }
      } catch (textEntriesRequireError) {
        void textEntriesRequireError;
      }
    }

    for (let index = 0; index < candidateScopes.length; index += 1) {
      const scope = candidateScopes[index];
      if (!isObject(scope)) {
        continue;
      }

      try {
        const namespace = scope[namespaceName];
        if (isObject(namespace)) {
          return namespace;
        }
      } catch (namespaceRetryError) {
        void namespaceRetryError;
      }
    }

    return null;
  }

  function fallbackNormaliseTextEntryValue(entry, separator = DEFAULT_SEPARATOR) {
    const safeSeparator = typeof separator === 'string' && separator ? separator : DEFAULT_SEPARATOR;

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
        const value = fallbackNormaliseTextEntryValue(entry[index], safeSeparator);
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
        return fallbackNormaliseTextEntryValue(entry.text, safeSeparator);
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

  function fallbackResolveTextEntry(
    primaryTexts,
    fallbackTexts,
    key,
    defaultValue = '',
    separator = DEFAULT_SEPARATOR
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

      const resolved = fallbackNormaliseTextEntryValue(entry, separator);
      if (typeof resolved === 'string') {
        return resolved;
      }
    }

    return normalizedDefault;
  }

  function resolveRuntimeTextEntryContext(options) {
    const contextOptions = options || {};
    const namespace = readTextEntryNamespace(contextOptions);
    const separator =
      namespace &&
      typeof namespace.TEXT_ENTRY_SEPARATOR === 'string' &&
      namespace.TEXT_ENTRY_SEPARATOR
        ? namespace.TEXT_ENTRY_SEPARATOR
        : DEFAULT_SEPARATOR;

    function normalise(entry, providedSeparator) {
      const activeSeparator =
        typeof providedSeparator === 'string' && providedSeparator
          ? providedSeparator
          : separator;

      if (namespace && typeof namespace.normaliseTextEntryValue === 'function') {
        try {
          const normalised = namespace.normaliseTextEntryValue(entry, activeSeparator);
          if (typeof normalised === 'string') {
            return normalised;
          }
        } catch (normaliseError) {
          void normaliseError;
        }
      }

      return fallbackNormaliseTextEntryValue(entry, activeSeparator);
    }

    function resolve(primaryTexts, fallbackTexts, key, defaultValue = '', providedSeparator) {
      const activeSeparator =
        typeof providedSeparator === 'string' && providedSeparator
          ? providedSeparator
          : separator;

      if (namespace && typeof namespace.resolveTextEntry === 'function') {
        try {
          return namespace.resolveTextEntry(
            primaryTexts,
            fallbackTexts,
            key,
            defaultValue,
            activeSeparator
          );
        } catch (resolveError) {
          void resolveError;
        }
      }

      return fallbackResolveTextEntry(
        primaryTexts,
        fallbackTexts,
        key,
        defaultValue,
        activeSeparator
      );
    }

    return Object.freeze({
      tools: namespace,
      separator,
      normaliseTextEntryValue: normalise,
      resolveTextEntry: resolve,
    });
  }

  const api = {
    DEFAULT_SEPARATOR,
    detectGlobalScope,
    collectCandidateScopes,
    readTextEntryNamespace,
    fallbackNormaliseTextEntryValue,
    fallbackResolveTextEntry,
    resolveRuntimeTextEntryContext,
  };

  const globalScope = detectGlobalScope();
  const targetName = 'cineCoreRuntimeTextEntries';

  if (globalScope) {
    const existing =
      globalScope[targetName] && typeof globalScope[targetName] === 'object'
        ? globalScope[targetName]
        : {};

    for (const key of Object.keys(api)) {
      existing[key] = api[key];
    }

    try {
      globalScope[targetName] = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  if (typeof module === 'object' && module && module.exports) {
    module.exports = api;
  }
})();
