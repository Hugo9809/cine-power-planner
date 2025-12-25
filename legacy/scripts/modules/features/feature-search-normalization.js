var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
  var GLOBAL_SCOPE = detectGlobalScope();
  function resolveModuleBase(scope) {
    if ((typeof cineModuleBase === "undefined" ? "undefined" : _typeof(cineModuleBase)) === 'object' && cineModuleBase) {
      return cineModuleBase;
    }
    if (typeof require === 'function') {
      try {
        var required = require('../base.js');
        if (required && _typeof(required) === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }
    if (scope && _typeof(scope.cineModuleBase) === 'object') {
      return scope.cineModuleBase;
    }
    return null;
  }
  var MODULE_BASE = resolveModuleBase(GLOBAL_SCOPE);
  if (!MODULE_BASE) {
    return;
  }
  var safeWarn = typeof MODULE_BASE.safeWarn === 'function' ? MODULE_BASE.safeWarn : function fallbackWarn(message, error) {
    if (typeof console === 'undefined' || !console || typeof console.warn !== 'function') {
      return;
    }
    if (typeof error === 'undefined') {
      console.warn(message);
    } else {
      console.warn(message, error);
    }
  };
  var ZERO_WIDTH_SPACES_PATTERN = /[\u200B\u200C\u200D\u2060]/g;
  var SPACE_VARIANTS_PATTERN = /[\u0009-\u000D\u00A0\u1680\u180E\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/g;
  var COMBINING_MARKS_PATTERN = /[\u0300-\u036F]/g;
  var DASH_VARIANTS_PATTERN = /[\u2010-\u2015\u2212\uFE58\uFE63\uFF0D]/g;
  var APOSTROPHE_VARIANTS_PATTERN = /[\u2018\u2019\u201A\u201B\u2032\u2035]/g;
  var QUOTE_VARIANTS_PATTERN = /[\u201C\u201D\u201E\u201F\u2033\u2036]/g;
  var SLASH_VARIANTS_PATTERN = /[\u2044\u2215]/g;
  var MULTIPLY_VARIANTS_PATTERN = /[×✕✖✗✘]/g;
  var DEGREE_VARIANTS_PATTERN = /[°º˚]/g;
  var ELLIPSIS_PATTERN = /[\u2026]/g;
  var TRADEMARK_PATTERN = /[\u00AE\u2122]/g;
  var GENERAL_PUNCTUATION_PATTERN = /[!#$%()*,:;<=>?@[\]^{|}~._]/g;
  var MEASUREMENT_DOUBLE_PRIME_VARIANTS_PATTERN = /[″‶‴⁗]/g;
  var MEASUREMENT_SINGLE_PRIME_VARIANTS_PATTERN = /[′‵]/g;
  var MEASUREMENT_VALUE_PATTERN = String.raw(_templateObject || (_templateObject = _taggedTemplateLiteral(["d+(?:s*[.,/-]s*d+)*(?:s+d+(?:s*[.,/-]s*d+)*)*"], ["\\d+(?:\\s*[.,/-]\\s*\\d+)*(?:\\s+\\d+(?:\\s*[.,/-]\\s*\\d+)*)*"])));
  var MEASUREMENT_FOOT_WORD_PATTERN = new RegExp(String.raw(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["(", ")[s-]*(?:feet|foot|ft.?)(?![a-z])"], ["(", ")[\\s-]*(?:feet|foot|ft\\.?)(?![a-z])"])), MEASUREMENT_VALUE_PATTERN), 'gi');
  var MEASUREMENT_FOOT_PRIME_PATTERN = new RegExp(String.raw(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["(", ")s*['\u2019](?=s|[d\"\u201D\u2033'-]|$)"], ["(", ")\\s*['\u2019](?=\\s|[\\d\"\u201D\u2033'-]|$)"])), MEASUREMENT_VALUE_PATTERN), 'g');
  var MEASUREMENT_INCH_WORD_PATTERN = new RegExp(String.raw(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["(", ")[s-]*(?:inches|inch|in.?)(?![a-z])"], ["(", ")[\\s-]*(?:inches|inch|in\\.?)(?![a-z])"])), MEASUREMENT_VALUE_PATTERN), 'gi');
  var MEASUREMENT_INCH_PRIME_PATTERN = new RegExp(String.raw(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["(", ")s*[\"\u201D\u2033](?=s|[d'\u2019\"-]|$)"], ["(", ")\\s*[\"\u201D\u2033](?=\\s|[\\d'\u2019\"-]|$)"])), MEASUREMENT_VALUE_PATTERN), 'g');
  function cleanMeasurementValue(value) {
    return typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : value;
  }
  function normalizeMeasurementUnits(str) {
    if (typeof str !== 'string' || !str) {
      return str;
    }
    var normalized = str.replace(MEASUREMENT_DOUBLE_PRIME_VARIANTS_PATTERN, '"').replace(MEASUREMENT_SINGLE_PRIME_VARIANTS_PATTERN, "'");
    normalized = normalized.replace(MEASUREMENT_FOOT_WORD_PATTERN, function (match, value) {
      void match;
      var cleaned = cleanMeasurementValue(value);
      return cleaned ? "".concat(cleaned, " ft ") : value;
    });
    normalized = normalized.replace(MEASUREMENT_FOOT_PRIME_PATTERN, function (match, value) {
      void match;
      var cleaned = cleanMeasurementValue(value);
      return cleaned ? "".concat(cleaned, " ft ") : value;
    });
    normalized = normalized.replace(MEASUREMENT_INCH_WORD_PATTERN, function (match, value) {
      void match;
      var cleaned = cleanMeasurementValue(value);
      return cleaned ? "".concat(cleaned, " inch ") : value;
    });
    normalized = normalized.replace(MEASUREMENT_INCH_PRIME_PATTERN, function (match, value) {
      void match;
      var cleaned = cleanMeasurementValue(value);
      return cleaned ? "".concat(cleaned, " inch ") : value;
    });
    return normalized;
  }
  var LIGATURE_ENTRIES = [['ß', 'ss'], ['æ', 'ae'], ['œ', 'oe'], ['ø', 'o'], ['þ', 'th'], ['ð', 'd'], ['đ', 'd'], ['ħ', 'h'], ['ı', 'i'], ['ĳ', 'ij'], ['ŋ', 'ng'], ['ł', 'l'], ['ſ', 's']];
  var LIGATURE_PATTERNS = LIGATURE_ENTRIES.map(function (entry) {
    return new RegExp(entry[0], 'g');
  });
  function normalizeSearchValue(value) {
    if (typeof value !== 'string') {
      return '';
    }
    var normalized = value.replace(ZERO_WIDTH_SPACES_PATTERN, '');
    if (typeof normalized.normalize === 'function') {
      try {
        normalized = normalized.normalize('NFKD');
      } catch (error) {
        void error;
      }
    }
    normalized = normalized.toLowerCase();
    normalized = normalizeMeasurementUnits(normalized);
    normalized = normalized.replace(SPACE_VARIANTS_PATTERN, ' ').replace(APOSTROPHE_VARIANTS_PATTERN, ' ').replace(QUOTE_VARIANTS_PATTERN, ' ').replace(DASH_VARIANTS_PATTERN, ' ').replace(SLASH_VARIANTS_PATTERN, ' ').replace(MULTIPLY_VARIANTS_PATTERN, ' x ').replace(DEGREE_VARIANTS_PATTERN, ' deg ').replace(/\bdegrees?\b/gi, ' deg ').replace(/&/g, ' and ').replace(/\+/g, ' plus ').replace(/@/g, ' at ').replace(TRADEMARK_PATTERN, ' ').replace(ELLIPSIS_PATTERN, ' ').replace(GENERAL_PUNCTUATION_PATTERN, ' ');
    normalized = normalized.replace(COMBINING_MARKS_PATTERN, '');
    for (var ligatureIndex = 0; ligatureIndex < LIGATURE_ENTRIES.length; ligatureIndex += 1) {
      var entry = LIGATURE_ENTRIES[ligatureIndex];
      var pattern = LIGATURE_PATTERNS[ligatureIndex];
      normalized = normalized.replace(pattern, entry[1]);
    }
    normalized = normalized.replace(/['"`]/g, ' ').replace(/\s+/g, ' ').trim();
    return normalized;
  }
  var moduleApi = Object.freeze({
    normalizeMeasurementUnits: normalizeMeasurementUnits,
    normalizeSearchValue: normalizeSearchValue
  });
  MODULE_BASE.registerOrQueueModule('cine.features.featureSearchNormalization', moduleApi, {
    category: 'features',
    description: 'Shared normalization helpers for feature search, including measurement units and punctuation folding.',
    replace: true,
    connections: ['cineModuleBase', 'cineModuleContext', 'cineUi']
  }, function (error) {
    return safeWarn('Unable to register cine.features.featureSearchNormalization module.', error);
  }, GLOBAL_SCOPE, MODULE_BASE.getModuleRegistry && MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE));
  if (typeof MODULE_BASE.exposeGlobal === 'function') {
    MODULE_BASE.exposeGlobal('cineFeaturesFeatureSearchNormalization', moduleApi, GLOBAL_SCOPE, {
      configurable: true,
      enumerable: false,
      writable: false
    });
  } else {
    try {
      GLOBAL_SCOPE.cineFeaturesFeatureSearchNormalization = moduleApi;
    } catch (error) {
      void error;
    }
  }
})();