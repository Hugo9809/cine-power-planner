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
  function normalizeSearchValue(value) {
    return typeof value === 'string' ? value.trim().toLowerCase() : '';
  }
  function sanitizeHighlightTokens(tokens) {
    if (!Array.isArray(tokens) || tokens.length === 0) {
      return [];
    }
    var seen = typeof Set === 'function' ? new Set() : null;
    var sanitized = [];
    for (var index = 0; index < tokens.length; index += 1) {
      var token = tokens[index];
      if (typeof token !== 'string') {
        continue;
      }
      var trimmed = token.trim().toLowerCase();
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
    var lower = text.toLowerCase();
    var ranges = [];
    for (var index = 0; index < tokens.length; index += 1) {
      var token = tokens[index];
      var length = token.length;
      if (!length) {
        continue;
      }
      var position = 0;
      while (position < lower.length) {
        var found = lower.indexOf(token, position);
        if (found === -1) {
          break;
        }
        ranges.push({
          start: found,
          end: found + length
        });
        position = found + length;
      }
    }
    if (!ranges.length) {
      return [];
    }
    ranges.sort(function (a, b) {
      return a.start - b.start || b.end - a.end;
    });
    var merged = [];
    for (var _index = 0; _index < ranges.length; _index += 1) {
      var range = ranges[_index];
      var last = merged[merged.length - 1];
      if (last && range.start <= last.end) {
        last.end = Math.max(last.end, range.end);
      } else {
        merged.push({
          start: range.start,
          end: range.end
        });
      }
    }
    return merged;
  }
  function applyHighlight(element, text, tokens, doc) {
    if (!element) {
      return;
    }
    var content = typeof text === 'string' ? text : '';
    if (!content) {
      element.textContent = '';
      return;
    }
    var highlightTokens = sanitizeHighlightTokens(tokens || []);
    if (!highlightTokens.length) {
      element.textContent = content;
      return;
    }
    var ranges = collectHighlightRanges(content, highlightTokens);
    if (!ranges.length) {
      element.textContent = content;
      return;
    }
    var documentRef = doc || element.ownerDocument || (typeof document !== 'undefined' ? document : null);
    if (!documentRef || typeof documentRef.createTextNode !== 'function') {
      element.textContent = content;
      return;
    }
    element.textContent = '';
    var cursor = 0;
    for (var index = 0; index < ranges.length; index += 1) {
      var range = ranges[index];
      if (range.start > cursor) {
        element.appendChild(documentRef.createTextNode(content.slice(cursor, range.start)));
      }
      var mark = documentRef.createElement('mark');
      mark.className = 'feature-search-highlight';
      mark.textContent = content.slice(range.start, range.end);
      element.appendChild(mark);
      cursor = range.end;
    }
    if (cursor < content.length) {
      element.appendChild(documentRef.createTextNode(content.slice(cursor)));
    }
  }
  var FEATURE_SEARCH_DETAIL_MAX_LENGTH = 140;
  function normalizeDetail(text) {
    if (typeof text !== 'string') {
      return '';
    }
    var normalized = text.replace(/\s+/g, ' ').trim();
    if (!normalized) {
      return '';
    }
    if (normalized.length <= FEATURE_SEARCH_DETAIL_MAX_LENGTH) {
      return normalized;
    }
    return "".concat(normalized.slice(0, FEATURE_SEARCH_DETAIL_MAX_LENGTH - 1).trimEnd(), "\u2026");
  }
  var moduleApi = Object.freeze({
    normalizeSearchValue: normalizeSearchValue,
    sanitizeHighlightTokens: sanitizeHighlightTokens,
    collectHighlightRanges: collectHighlightRanges,
    applyHighlight: applyHighlight,
    normalizeDetail: normalizeDetail
  });
  MODULE_BASE.registerOrQueueModule('cine.features.featureSearch', moduleApi, {
    category: 'features',
    description: 'Reusable helpers for feature search normalisation, highlighting and detail formatting.',
    replace: true,
    connections: ['cineModuleBase', 'cineModuleContext', 'cineUi']
  }, function (error) {
    return safeWarn('Unable to register cine.features.featureSearch module.', error);
  }, GLOBAL_SCOPE, MODULE_BASE.getModuleRegistry && MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE));
  if (typeof MODULE_BASE.exposeGlobal === 'function') {
    MODULE_BASE.exposeGlobal('cineFeaturesFeatureSearch', moduleApi, GLOBAL_SCOPE, {
      configurable: true,
      enumerable: false,
      writable: false
    });
  } else {
    try {
      GLOBAL_SCOPE.cineFeaturesFeatureSearch = moduleApi;
    } catch (error) {
      void error;
    }
  }
})();