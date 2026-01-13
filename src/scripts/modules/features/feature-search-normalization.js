/* global cineModuleBase */

// (function () {
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

  /*
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
  */

  if (scope && typeof scope.cineModuleBase === 'object') {
    return scope.cineModuleBase;
  }

  return null;
}

const MODULE_BASE = resolveModuleBase(GLOBAL_SCOPE);

const safeWarn = (MODULE_BASE && typeof MODULE_BASE.safeWarn === 'function')
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

function normalizeSearchValue(value) {
  if (typeof value !== 'string') {
    return '';
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

  return normalized;
}

const moduleApi = Object.freeze({
  normalizeMeasurementUnits,
  normalizeSearchValue,
});

if (MODULE_BASE) {
  MODULE_BASE.registerOrQueueModule(
    'cine.features.featureSearchNormalization',
    moduleApi,
    {
      category: 'features',
      description: 'Shared normalization helpers for feature search, including measurement units and punctuation folding.',
      replace: true,
      connections: ['cineModuleBase', 'cineModuleContext', 'cineUi'],
    },
    error => safeWarn('Unable to register cine.features.featureSearchNormalization module.', error),
    GLOBAL_SCOPE,
    MODULE_BASE.getModuleRegistry && MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE),
  );

  if (typeof MODULE_BASE.exposeGlobal === 'function') {
    MODULE_BASE.exposeGlobal('cineFeaturesFeatureSearchNormalization', moduleApi, GLOBAL_SCOPE, {
      configurable: true,
      enumerable: false,
      writable: false,
    });
  } else {
    try {
      GLOBAL_SCOPE.cineFeaturesFeatureSearchNormalization = moduleApi;
    } catch (error) {
      void error;
    }
  }
}
// })();

export default moduleApi;
