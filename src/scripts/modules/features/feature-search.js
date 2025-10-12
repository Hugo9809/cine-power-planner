/* global cineModuleBase */

(function () {
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

  function resolveModuleBase(scope) {
    if (typeof cineModuleBase === 'object' && cineModuleBase) {
      return cineModuleBase;
    }

    if (typeof require === 'function') {
      try {
        const required = require('../base.js');
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }

    if (scope && typeof scope.cineModuleBase === 'object') {
      return scope.cineModuleBase;
    }

    return null;
  }

  const MODULE_BASE = resolveModuleBase(GLOBAL_SCOPE);
  if (!MODULE_BASE) {
    return;
  }

  const safeWarn = typeof MODULE_BASE.safeWarn === 'function'
    ? MODULE_BASE.safeWarn
    : function fallbackWarn(message, error) {
        if (typeof console === 'undefined' || !console || typeof console.warn !== 'function') {
          return;
        }
        if (typeof error === 'undefined') {
          console.warn(message);
        } else {
          console.warn(message, error);
        }
      };

  /* eslint-disable no-control-regex, no-misleading-character-class */
  const ZERO_WIDTH_SPACES_PATTERN = /[\u200B\u200C\u200D\u2060]/g;
  const SPACE_VARIANTS_PATTERN = /[\u0009-\u000D\u00A0\u1680\u180E\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/g;
  const COMBINING_MARKS_PATTERN = /[\u0300-\u036F]/g;
  const DASH_VARIANTS_PATTERN = /[\u2010-\u2015\u2212\uFE58\uFE63\uFF0D]/g;
  const APOSTROPHE_VARIANTS_PATTERN = /[\u2018\u2019\u201A\u201B\u2032\u2035]/g;
  const QUOTE_VARIANTS_PATTERN = /[\u201C\u201D\u201E\u201F\u2033\u2036]/g;
  const SLASH_VARIANTS_PATTERN = /[\u2044\u2215]/g;
  const MULTIPLY_VARIANTS_PATTERN = /[×✕✖✗✘]/g;
  const DEGREE_VARIANTS_PATTERN = /[°º˚]/g;
  const ELLIPSIS_PATTERN = /[\u2026]/g;
  const TRADEMARK_PATTERN = /[\u00AE\u2122]/g;
  const GENERAL_PUNCTUATION_PATTERN = /[!#$%()*,:;<=>?@[\]^{|}~._]/g;
  const MEASUREMENT_DOUBLE_PRIME_VARIANTS_PATTERN = /[″‶‴⁗]/g;
  const MEASUREMENT_SINGLE_PRIME_VARIANTS_PATTERN = /[′‵]/g;
  const MEASUREMENT_VALUE_PATTERN = String.raw`\d+(?:\s*[.,/-]\s*\d+)*(?:\s+\d+(?:\s*[.,/-]\s*\d+)*)*`;
  const MEASUREMENT_FOOT_WORD_PATTERN = new RegExp(
    String.raw`(${MEASUREMENT_VALUE_PATTERN})[\s-]*(?:feet|foot|ft\.?)(?![a-z])`,
    'gi',
  );
  const MEASUREMENT_FOOT_PRIME_PATTERN = new RegExp(
    String.raw`(${MEASUREMENT_VALUE_PATTERN})\s*['’](?=\s|[\d"”″'-]|$)`,
    'g',
  );
  const MEASUREMENT_INCH_WORD_PATTERN = new RegExp(
    String.raw`(${MEASUREMENT_VALUE_PATTERN})[\s-]*(?:inches|inch|in\.?)(?![a-z])`,
    'gi',
  );
  const MEASUREMENT_INCH_PRIME_PATTERN = new RegExp(
    String.raw`(${MEASUREMENT_VALUE_PATTERN})\s*["”″](?=\s|[\d'’"-]|$)`,
    'g',
  );
  /* eslint-enable no-control-regex, no-misleading-character-class */

  function cleanMeasurementValue(value) {
    return typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : value;
  }

  function normalizeMeasurementUnits(str) {
    if (typeof str !== 'string' || !str) {
      return str;
    }

    let normalized = str
      .replace(MEASUREMENT_DOUBLE_PRIME_VARIANTS_PATTERN, '"')
      .replace(MEASUREMENT_SINGLE_PRIME_VARIANTS_PATTERN, "'");

    normalized = normalized.replace(MEASUREMENT_FOOT_WORD_PATTERN, (match, value) => {
      void match;
      const cleaned = cleanMeasurementValue(value);
      return cleaned ? `${cleaned} ft ` : value;
    });

    normalized = normalized.replace(MEASUREMENT_FOOT_PRIME_PATTERN, (match, value) => {
      void match;
      const cleaned = cleanMeasurementValue(value);
      return cleaned ? `${cleaned} ft ` : value;
    });

    normalized = normalized.replace(MEASUREMENT_INCH_WORD_PATTERN, (match, value) => {
      void match;
      const cleaned = cleanMeasurementValue(value);
      return cleaned ? `${cleaned} inch ` : value;
    });

    normalized = normalized.replace(MEASUREMENT_INCH_PRIME_PATTERN, (match, value) => {
      void match;
      const cleaned = cleanMeasurementValue(value);
      return cleaned ? `${cleaned} inch ` : value;
    });

    return normalized;
  }

  const LIGATURE_ENTRIES = [
    ['ß', 'ss'],
    ['æ', 'ae'],
    ['œ', 'oe'],
    ['ø', 'o'],
    ['þ', 'th'],
    ['ð', 'd'],
    ['đ', 'd'],
    ['ħ', 'h'],
    ['ı', 'i'],
    ['ĳ', 'ij'],
    ['ŋ', 'ng'],
    ['ł', 'l'],
    ['ſ', 's'],
  ];
  const LIGATURE_PATTERNS = LIGATURE_ENTRIES.map(entry => new RegExp(entry[0], 'g'));

  const NORMALIZE_CACHE_LIMIT = 400;
  const NORMALIZE_CACHE_MAX_LENGTH = 200;
  const CACHE_SUPPORTS_MAP = typeof Map === 'function';
  const NORMALIZE_CACHE = CACHE_SUPPORTS_MAP ? new Map() : [];

  // Normalisation is called frequently while the user types. Caching the
  // derived strings avoids repeated regex work and keeps the UI snappy on lower
  // powered devices, which is especially important for offline use on set.

  function readNormalizedCache(value) {
    if (!value || value.length > NORMALIZE_CACHE_MAX_LENGTH) {
      return null;
    }

    if (CACHE_SUPPORTS_MAP) {
      if (!NORMALIZE_CACHE.has(value)) {
        return null;
      }

      const cachedValue = NORMALIZE_CACHE.get(value);
      try {
        NORMALIZE_CACHE.delete(value);
        NORMALIZE_CACHE.set(value, cachedValue);
      } catch (cacheUpdateError) {
        void cacheUpdateError;
      }
      return cachedValue;
    }

    for (let index = 0; index < NORMALIZE_CACHE.length; index += 1) {
      const entry = NORMALIZE_CACHE[index];
      if (!entry || entry.key !== value) {
        continue;
      }

      if (index !== NORMALIZE_CACHE.length - 1) {
        NORMALIZE_CACHE.splice(index, 1);
        NORMALIZE_CACHE.push(entry);
      }

      return entry.value;
    }

    return null;
  }

  function writeNormalizedCache(value, normalized) {
    if (!value || value.length > NORMALIZE_CACHE_MAX_LENGTH) {
      return;
    }

    if (CACHE_SUPPORTS_MAP) {
      try {
        NORMALIZE_CACHE.set(value, normalized);
      } catch (cacheSetError) {
        void cacheSetError;
        return;
      }

      if (NORMALIZE_CACHE.size <= NORMALIZE_CACHE_LIMIT) {
        return;
      }

      const oldestIterator = NORMALIZE_CACHE.keys();
      const oldestResult =
        oldestIterator && typeof oldestIterator.next === 'function'
          ? oldestIterator.next()
          : { done: true };
      if (oldestResult && oldestResult.done === false) {
        NORMALIZE_CACHE.delete(oldestResult.value);
      }
      return;
    }

    NORMALIZE_CACHE.push({ key: value, value: normalized });

    if (NORMALIZE_CACHE.length <= NORMALIZE_CACHE_LIMIT) {
      return;
    }

    NORMALIZE_CACHE.shift();
  }

  function normalizeSearchValue(value) {
    if (typeof value !== 'string') {
      return '';
    }

    const cached = readNormalizedCache(value);
    if (typeof cached === 'string') {
      return cached;
    }

    let normalized = value.replace(ZERO_WIDTH_SPACES_PATTERN, '');

    if (typeof normalized.normalize === 'function') {
      try {
        normalized = normalized.normalize('NFKD');
      } catch (error) {
        void error;
      }
    }

    normalized = normalized.toLowerCase();
    normalized = normalizeMeasurementUnits(normalized);

    normalized = normalized
      .replace(SPACE_VARIANTS_PATTERN, ' ')
      .replace(APOSTROPHE_VARIANTS_PATTERN, ' ')
      .replace(QUOTE_VARIANTS_PATTERN, ' ')
      .replace(DASH_VARIANTS_PATTERN, ' ')
      .replace(SLASH_VARIANTS_PATTERN, ' ')
      .replace(MULTIPLY_VARIANTS_PATTERN, ' x ')
      .replace(DEGREE_VARIANTS_PATTERN, ' deg ')
      .replace(/\bdegrees?\b/gi, ' deg ')
      .replace(/&/g, ' and ')
      .replace(/\+/g, ' plus ')
      .replace(/@/g, ' at ')
      .replace(TRADEMARK_PATTERN, ' ')
      .replace(ELLIPSIS_PATTERN, ' ')
      .replace(GENERAL_PUNCTUATION_PATTERN, ' ');

    normalized = normalized.replace(COMBINING_MARKS_PATTERN, '');

    for (let ligatureIndex = 0; ligatureIndex < LIGATURE_ENTRIES.length; ligatureIndex += 1) {
      const entry = LIGATURE_ENTRIES[ligatureIndex];
      const pattern = LIGATURE_PATTERNS[ligatureIndex];
      normalized = normalized.replace(pattern, entry[1]);
    }

    normalized = normalized
      .replace(/['"`]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    writeNormalizedCache(value, normalized);

    return normalized;
  }

  function sanitizeHighlightTokens(tokens) {
    if (!Array.isArray(tokens) || tokens.length === 0) {
      return [];
    }

    const seen = typeof Set === 'function' ? new Set() : null;
    const sanitized = [];

    for (let index = 0; index < tokens.length; index += 1) {
      const token = tokens[index];
      if (typeof token !== 'string') {
        continue;
      }
      const trimmed = token.trim().toLowerCase();
      if (!trimmed) {
        continue;
      }
      if (trimmed.length < 2 && !/^\d+$/.test(trimmed)) {
        continue;
      }
      if (seen) {
        if (seen.has(trimmed)) {
          continue;
        }
        seen.add(trimmed);
      } else if (sanitized.indexOf(trimmed) !== -1) {
        continue;
      }
      sanitized.push(trimmed);
    }

    return sanitized;
  }

  function collectHighlightRanges(text, tokens) {
    if (!text || !tokens || !tokens.length) {
      return [];
    }

    const lower = text.toLowerCase();
    const ranges = [];

    for (let index = 0; index < tokens.length; index += 1) {
      const token = tokens[index];
      const length = token.length;
      if (!length) {
        continue;
      }

      let position = 0;
      while (position < lower.length) {
        const found = lower.indexOf(token, position);
        if (found === -1) {
          break;
        }
        ranges.push({ start: found, end: found + length });
        position = found + length;
      }
    }

    if (!ranges.length) {
      return [];
    }

    ranges.sort((a, b) => (a.start - b.start) || (b.end - a.end));

    const merged = [];
    for (let index = 0; index < ranges.length; index += 1) {
      const range = ranges[index];
      const last = merged[merged.length - 1];
      if (last && range.start <= last.end) {
        last.end = Math.max(last.end, range.end);
      } else {
        merged.push({ start: range.start, end: range.end });
      }
    }

    return merged;
  }

  function applyHighlight(element, text, tokens, doc) {
    if (!element) {
      return;
    }

    const content = typeof text === 'string' ? text : '';
    if (!content) {
      element.textContent = '';
      return;
    }

    const highlightTokens = sanitizeHighlightTokens(tokens || []);
    if (!highlightTokens.length) {
      element.textContent = content;
      return;
    }

    const ranges = collectHighlightRanges(content, highlightTokens);
    if (!ranges.length) {
      element.textContent = content;
      return;
    }

    const documentRef = doc || element.ownerDocument || (typeof document !== 'undefined' ? document : null);
    if (!documentRef || typeof documentRef.createTextNode !== 'function') {
      element.textContent = content;
      return;
    }

    element.textContent = '';
    let cursor = 0;

    for (let index = 0; index < ranges.length; index += 1) {
      const range = ranges[index];
      if (range.start > cursor) {
        element.appendChild(documentRef.createTextNode(content.slice(cursor, range.start)));
      }
      const mark = documentRef.createElement('mark');
      mark.className = 'feature-search-highlight';
      mark.textContent = content.slice(range.start, range.end);
      element.appendChild(mark);
      cursor = range.end;
    }

    if (cursor < content.length) {
      element.appendChild(documentRef.createTextNode(content.slice(cursor)));
    }
  }

  const FEATURE_SEARCH_DETAIL_MAX_LENGTH = 140;

  function normalizeDetail(text) {
    if (typeof text !== 'string') {
      return '';
    }

    const normalized = text.replace(/\s+/g, ' ').trim();
    if (!normalized) {
      return '';
    }

    if (normalized.length <= FEATURE_SEARCH_DETAIL_MAX_LENGTH) {
      return normalized;
    }

    return `${normalized.slice(0, FEATURE_SEARCH_DETAIL_MAX_LENGTH - 1).trimEnd()}…`;
  }

  const moduleApi = Object.freeze({
    normalizeSearchValue,
    sanitizeHighlightTokens,
    collectHighlightRanges,
    applyHighlight,
    normalizeDetail,
  });

  MODULE_BASE.registerOrQueueModule(
    'cine.features.featureSearch',
    moduleApi,
    {
      category: 'features',
      description: 'Reusable helpers for feature search normalisation, highlighting and detail formatting.',
      replace: true,
      connections: ['cineModuleBase', 'cineModuleContext', 'cineUi'],
    },
    error => safeWarn('Unable to register cine.features.featureSearch module.', error),
    GLOBAL_SCOPE,
    MODULE_BASE.getModuleRegistry && MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE),
  );

  if (typeof MODULE_BASE.exposeGlobal === 'function') {
    MODULE_BASE.exposeGlobal('cineFeaturesFeatureSearch', moduleApi, GLOBAL_SCOPE, {
      configurable: true,
      enumerable: false,
      writable: false,
    });
  } else {
    try {
      GLOBAL_SCOPE.cineFeaturesFeatureSearch = moduleApi;
    } catch (error) {
      void error;
    }
  }
})();
