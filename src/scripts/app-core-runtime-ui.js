/* global collectRuntimeScopeCandidates, CORE_GLOBAL_SCOPE, ICON_GLYPHS */
/*
 * Cine Power Planner runtime UI bridge.
 *
 * This module centralises the resolution of the shared UI helper namespace so
 * the runtime split can reuse a single lookup and fallback path. Keeping the
 * logic here avoids subtle divergences between the runtime halves and protects
 * the offline save/share flows that depend on consistent button rendering.
 */

(function initialiseCineCoreRuntimeUiBridge() {
  var NAMESPACE_KEY = 'cineCoreRuntimeUiBridge';

  function resolveCandidateScopes() {
    var collected = [];

    if (typeof collectRuntimeScopeCandidates === 'function') {
      try {
        var scopeResults = collectRuntimeScopeCandidates();
        if (Array.isArray(scopeResults)) {
          for (var index = 0; index < scopeResults.length; index += 1) {
            collected.push(scopeResults[index]);
          }
        }
      } catch (collectError) {
        void collectError;
      }
    }

    function pushScope(scope) {
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        return;
      }

      for (var i = 0; i < collected.length; i += 1) {
        if (collected[i] === scope) {
          return;
        }
      }

      collected.push(scope);
    }

    try {
      if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE) {
        pushScope(CORE_GLOBAL_SCOPE);
      }
    } catch (coreScopeError) {
      void coreScopeError;
    }

    if (typeof globalThis !== 'undefined' && globalThis) {
      pushScope(globalThis);
    }

    if (typeof window !== 'undefined' && window) {
      pushScope(window);
    }

    if (typeof self !== 'undefined' && self) {
      pushScope(self);
    }

    if (typeof global !== 'undefined' && global) {
      pushScope(global);
    }

    return collected;
  }

  var candidateScopes = resolveCandidateScopes();
  var primaryScope = null;
  if (candidateScopes.length > 0) {
    primaryScope = candidateScopes[0];
  }

  function readExistingNamespace(scope) {
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      return null;
    }

    try {
      var existing = scope[NAMESPACE_KEY];
      return existing && typeof existing === 'object' ? existing : null;
    } catch (namespaceLookupError) {
      void namespaceLookupError;
    }

    return null;
  }

  var namespace = readExistingNamespace(primaryScope);
  if (!namespace) {
    namespace = {};
  }

  function resolveHelpersNamespace() {
    if (namespace.helpers && typeof namespace.helpers === 'object') {
      return namespace.helpers;
    }

    var helperCandidates = [];

    if (typeof require === 'function') {
      try {
        var requiredHelpers = require('./app-core-ui-helpers.js');
        if (requiredHelpers && typeof requiredHelpers === 'object') {
          helperCandidates.push(requiredHelpers);
        }
      } catch (helpersRequireError) {
        void helpersRequireError;
      }
    }

    for (var index = 0; index < candidateScopes.length; index += 1) {
      var scope = candidateScopes[index];
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
        continue;
      }

      try {
        var helpers = scope.cineCoreUiHelpers;
        if (helpers && typeof helpers === 'object') {
          helperCandidates.push(helpers);
        }
      } catch (scopeLookupError) {
        void scopeLookupError;
      }
    }

    for (var candidateIndex = 0; candidateIndex < helperCandidates.length; candidateIndex += 1) {
      var candidate = helperCandidates[candidateIndex];
      if (candidate && typeof candidate === 'object') {
        namespace.helpers = candidate;
        return namespace.helpers;
      }
    }

    namespace.helpers = null;
    return namespace.helpers;
  }

  function fallbackEscapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function fallbackEscapeButtonLabelSafely(text) {
    if (typeof text !== 'string' || text === '') {
      return '';
    }
    return fallbackEscapeHtml(text);
  }

  function fallbackResolveButtonIconMarkup() {
    return '';
  }

  function resolveDefaultGlyph(glyph) {
    if (typeof glyph !== 'undefined') {
      return glyph;
    }

    try {
      if (typeof ICON_GLYPHS === 'object' && ICON_GLYPHS && ICON_GLYPHS.save) {
        return ICON_GLYPHS.save;
      }
    } catch (glyphError) {
      void glyphError;
    }

    return glyph;
  }

  function computeEscapeHtml() {
    if (namespace.escapeHtml && typeof namespace.escapeHtml === 'function') {
      return namespace.escapeHtml;
    }

    var helpers = resolveHelpersNamespace();
    if (helpers && typeof helpers.escapeHtml === 'function') {
      namespace.escapeHtml = helpers.escapeHtml;
      return namespace.escapeHtml;
    }

    namespace.escapeHtml = fallbackEscapeHtml;
    return namespace.escapeHtml;
  }

  function computeEscapeButtonLabelSafely() {
    if (namespace.escapeButtonLabelSafely && typeof namespace.escapeButtonLabelSafely === 'function') {
      return namespace.escapeButtonLabelSafely;
    }

    var helpers = resolveHelpersNamespace();
    if (helpers && typeof helpers.escapeButtonLabelSafely === 'function') {
      namespace.escapeButtonLabelSafely = helpers.escapeButtonLabelSafely;
      return namespace.escapeButtonLabelSafely;
    }

    var escapeHtml = computeEscapeHtml();
    namespace.escapeButtonLabelSafely = function escapeButtonLabelSafelyFallback(text) {
      if (typeof text !== 'string' || text === '') {
        return '';
      }

      try {
        return escapeHtml(text);
      } catch (escapeError) {
        void escapeError;
      }

      return fallbackEscapeButtonLabelSafely(text);
    };

    return namespace.escapeButtonLabelSafely;
  }

  function computeResolveButtonIconMarkup() {
    if (namespace.resolveButtonIconMarkup && typeof namespace.resolveButtonIconMarkup === 'function') {
      return namespace.resolveButtonIconMarkup;
    }

    var helpers = resolveHelpersNamespace();
    if (helpers && typeof helpers.resolveButtonIconMarkup === 'function') {
      namespace.resolveButtonIconMarkup = helpers.resolveButtonIconMarkup;
      return namespace.resolveButtonIconMarkup;
    }

    namespace.resolveButtonIconMarkup = fallbackResolveButtonIconMarkup;
    return namespace.resolveButtonIconMarkup;
  }

  function computeSetButtonLabelWithIcon() {
    if (namespace.setButtonLabelWithIcon && typeof namespace.setButtonLabelWithIcon === 'function') {
      return namespace.setButtonLabelWithIcon;
    }

    var helpers = resolveHelpersNamespace();
    if (helpers && typeof helpers.setButtonLabelWithIcon === 'function') {
      namespace.setButtonLabelWithIcon = helpers.setButtonLabelWithIcon;
      return namespace.setButtonLabelWithIcon;
    }

    var resolveButtonIconMarkup = computeResolveButtonIconMarkup();
    var escapeButtonLabelSafely = computeEscapeButtonLabelSafely();

    namespace.setButtonLabelWithIcon = function setButtonLabelWithIconFallback(button, label, glyph) {
      if (!button) {
        return;
      }

      var resolvedGlyph = resolveDefaultGlyph(glyph);
      var iconHtml = resolveButtonIconMarkup(resolvedGlyph);
      var safeLabel = escapeButtonLabelSafely(typeof label === 'string' ? label : '');

      if (!iconHtml && typeof button.textContent === 'string') {
        try {
          button.textContent = safeLabel;
          return;
        } catch (textContentError) {
          void textContentError;
        }
      }

      try {
        button.innerHTML = "".concat(iconHtml).concat(safeLabel);
      } catch (assignError) {
        void assignError;
      }
    };

    return namespace.setButtonLabelWithIcon;
  }

  computeEscapeHtml();
  computeEscapeButtonLabelSafely();
  computeResolveButtonIconMarkup();
  computeSetButtonLabelWithIcon();

  namespace.resolveHelpers = resolveHelpersNamespace;
  namespace.fallbackEscapeHtml = fallbackEscapeHtml;
  namespace.fallbackEscapeButtonLabelSafely = fallbackEscapeButtonLabelSafely;

  function assignNamespace(scope) {
    if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
      return;
    }

    try {
      scope[NAMESPACE_KEY] = namespace;
    } catch (assignError) {
      void assignError;
    }
  }

  if (primaryScope) {
    assignNamespace(primaryScope);
  }

  for (var assignmentIndex = 0; assignmentIndex < candidateScopes.length; assignmentIndex += 1) {
    assignNamespace(candidateScopes[assignmentIndex]);
  }

  if (typeof module === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();
