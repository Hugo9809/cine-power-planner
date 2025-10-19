/*
 * Cine Power Planner core runtime UI bridge (legacy bundle).
 *
 * Mirrors the modern runtime bridge so that transpiled bundles can reuse the
 * same helper discovery logic without duplicating fragile environment checks.
 * The implementation stays within ES5 syntax so that the legacy loader keeps
 * working in older browsers and offline shells.
 */

(function createLegacyCineCoreRuntimeUiBridge() {
  function resolvePrimaryGlobalScope() {
    if (typeof globalThis !== 'undefined' && globalThis) {
      return globalThis;
    }
    if (typeof window !== 'undefined' && window) {
      return window;
    }
    if (typeof self !== 'undefined' && self) {
      return self;
    }
    if (typeof global !== 'undefined' && global) {
      return global;
    }
    return null;
  }

  function collectCandidateScopes(primary) {
    var scopes = [];

    try {
      if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE) {
        scopes.push(CORE_GLOBAL_SCOPE);
      }
    } catch (coreScopeError) {
      void coreScopeError;
    }

    try {
      if (typeof CORE_PART1_RUNTIME_SCOPE !== 'undefined' && CORE_PART1_RUNTIME_SCOPE) {
        scopes.push(CORE_PART1_RUNTIME_SCOPE);
      }
    } catch (part1ScopeError) {
      void part1ScopeError;
    }

    try {
      if (typeof CORE_PART2_RUNTIME_SCOPE !== 'undefined' && CORE_PART2_RUNTIME_SCOPE) {
        scopes.push(CORE_PART2_RUNTIME_SCOPE);
      }
    } catch (part2ScopeError) {
      void part2ScopeError;
    }

    if (primary) {
      scopes.push(primary);
    }

    if (typeof window !== 'undefined' && window && window !== primary) {
      scopes.push(window);
    }

    if (typeof self !== 'undefined' && self && self !== primary) {
      scopes.push(self);
    }

    if (typeof global !== 'undefined' && global && global !== primary) {
      scopes.push(global);
    }

    return scopes;
  }

  function resolveCoreUiHelpers(existingBridge, scopes) {
    var candidates = [];

    if (existingBridge && existingBridge.helpers && typeof existingBridge.helpers === 'object') {
      candidates.push(existingBridge.helpers);
    }

    for (var scopeIndex = 0; scopeIndex < scopes.length; scopeIndex += 1) {
      var scope = scopes[scopeIndex];
      if (!scope) {
        continue;
      }

      try {
        var bridge = scope.cineCoreRuntimeUiBridge;
        if (bridge && bridge !== existingBridge && typeof bridge === 'object') {
          if (bridge.helpers && typeof bridge.helpers === 'object') {
            candidates.push(bridge.helpers);
          }
        }
      } catch (bridgeLookupError) {
        void bridgeLookupError;
      }
    }

    for (var scopeIndex2 = 0; scopeIndex2 < scopes.length; scopeIndex2 += 1) {
      var scopeCandidate = scopes[scopeIndex2];
      if (!scopeCandidate) {
        continue;
      }

      try {
        var helpers = scopeCandidate.cineCoreUiHelpers;
        if (helpers && typeof helpers === 'object') {
          candidates.push(helpers);
        }
      } catch (helpersLookupError) {
        void helpersLookupError;
      }
    }

    if (typeof require === 'function') {
      try {
        var requiredHelpers = require('./app-core-ui-helpers.js');
        if (requiredHelpers && typeof requiredHelpers === 'object') {
          candidates.push(requiredHelpers);
        }
      } catch (helpersRequireError) {
        void helpersRequireError;
      }
    }

    for (var index = 0; index < candidates.length; index += 1) {
      var candidate = candidates[index];
      if (candidate && typeof candidate === 'object') {
        return candidate;
      }
    }

    return {};
  }

  var primaryScope = resolvePrimaryGlobalScope();
  var bridge = null;

  if (primaryScope && typeof primaryScope.cineCoreRuntimeUiBridge === 'object' && primaryScope.cineCoreRuntimeUiBridge) {
    bridge = primaryScope.cineCoreRuntimeUiBridge;
  }

  if (!bridge && typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE.cineCoreRuntimeUiBridge === 'object') {
    bridge = CORE_GLOBAL_SCOPE.cineCoreRuntimeUiBridge;
  }

  if (!bridge) {
    bridge = {};
  }

  var scopes = collectCandidateScopes(primaryScope);
  var helpers = resolveCoreUiHelpers(bridge, scopes);

  function escapeHtmlFallback(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function escapeButtonLabelSafelyFallback(text) {
    if (typeof text !== 'string' || text === '') {
      return '';
    }

    var escape = typeof bridge.escapeHtml === 'function'
      ? bridge.escapeHtml
      : typeof helpers.escapeHtml === 'function'
        ? helpers.escapeHtml
        : escapeHtmlFallback;

    return escape(text);
  }

  function resolveButtonIconMarkupFallback() {
    return '';
  }

  function setButtonLabelWithIconFallback(button, label, glyph) {
    if (!button) {
      return;
    }

    var resolvedGlyph = glyph;

    if (typeof resolvedGlyph === 'undefined') {
      try {
        if (typeof ICON_GLYPHS === 'object' && ICON_GLYPHS && ICON_GLYPHS.save) {
          resolvedGlyph = ICON_GLYPHS.save;
        }
      } catch (glyphError) {
        void glyphError;
      }
    }

    var iconHtml = (typeof bridge.resolveButtonIconMarkup === 'function'
      ? bridge.resolveButtonIconMarkup
      : typeof helpers.resolveButtonIconMarkup === 'function'
        ? helpers.resolveButtonIconMarkup
        : resolveButtonIconMarkupFallback)(resolvedGlyph);

    var escapeButtonLabelSafely = (typeof bridge.escapeButtonLabelSafely === 'function'
      ? bridge.escapeButtonLabelSafely
      : typeof helpers.escapeButtonLabelSafely === 'function'
        ? helpers.escapeButtonLabelSafely
        : escapeButtonLabelSafelyFallback);

    var safeLabel = escapeButtonLabelSafely(typeof label === 'string' ? label : '');

    try {
      button.innerHTML = '' + iconHtml + safeLabel;
    } catch (assignError) {
      void assignError;
    }
  }

  var escapeHtml = typeof bridge.escapeHtml === 'function'
    ? bridge.escapeHtml
    : typeof helpers.escapeHtml === 'function'
      ? helpers.escapeHtml
      : escapeHtmlFallback;

  var escapeButtonLabelSafely = typeof bridge.escapeButtonLabelSafely === 'function'
    ? bridge.escapeButtonLabelSafely
    : typeof helpers.escapeButtonLabelSafely === 'function'
      ? helpers.escapeButtonLabelSafely
      : function legacyFallbackEscapeButtonLabelSafely(text) {
          return escapeButtonLabelSafelyFallback(text);
        };

  var resolveButtonIconMarkup = typeof bridge.resolveButtonIconMarkup === 'function'
    ? bridge.resolveButtonIconMarkup
    : typeof helpers.resolveButtonIconMarkup === 'function'
      ? helpers.resolveButtonIconMarkup
      : resolveButtonIconMarkupFallback;

  var setButtonLabelWithIcon = typeof bridge.setButtonLabelWithIcon === 'function'
    ? bridge.setButtonLabelWithIcon
    : typeof helpers.setButtonLabelWithIcon === 'function'
      ? helpers.setButtonLabelWithIcon
      : function legacyFallbackSetButtonLabelWithIcon(button, label, glyph) {
          setButtonLabelWithIconFallback(button, label, glyph);
        };

  bridge.helpers = helpers;
  bridge.escapeHtml = escapeHtml;
  bridge.escapeButtonLabelSafely = escapeButtonLabelSafely;
  bridge.resolveButtonIconMarkup = resolveButtonIconMarkup;
  bridge.setButtonLabelWithIcon = setButtonLabelWithIcon;
  bridge.resolveCoreUiHelpers = function resolveCoreUiHelpersPublic() {
    return resolveCoreUiHelpers(bridge, scopes);
  };

  if (primaryScope) {
    try {
      primaryScope.cineCoreRuntimeUiBridge = bridge;
    } catch (assignError) {
      void assignError;
    }
  }

  if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE) {
    try {
      CORE_GLOBAL_SCOPE.cineCoreRuntimeUiBridge = bridge;
    } catch (coreAssignError) {
      void coreAssignError;
    }
  }

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = bridge;
  }
})();
