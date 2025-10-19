/*
 * Legacy runtime UI bridge for the Cine Power Planner.
 *
 * Mirrors src/scripts/app-core-runtime-ui.js using ES5-compatible syntax so
 * the legacy bundle keeps sharing the same UI helper resolution logic.
 */

(function initialiseCoreRuntimeUiBridge() {
  'use strict';

  function resolveGlobalScope() {
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

  function resolveCoreUiHelpers() {
    var candidates = [];

    if (typeof require === 'function') {
      try {
        var requiredHelpers = require('./app-core-ui-helpers.js');
        if (requiredHelpers && typeof requiredHelpers === 'object') {
          candidates.push(requiredHelpers);
        }
      } catch (helpersError) {
        void helpersError;
      }
    }

    var scopes = [];

    try {
      if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE) {
        scopes.push(CORE_GLOBAL_SCOPE);
      }
    } catch (coreScopeError) {
      void coreScopeError;
    }

    var globalScope = resolveGlobalScope();
    if (globalScope) {
      scopes.push(globalScope);
    }

    if (typeof window !== 'undefined' && window && window !== globalScope) {
      scopes.push(window);
    }

    if (typeof self !== 'undefined' && self && self !== globalScope) {
      scopes.push(self);
    }

    if (typeof global !== 'undefined' && global && global !== globalScope) {
      scopes.push(global);
    }

    for (var index = 0; index < scopes.length; index += 1) {
      var scope = scopes[index];
      if (!scope) {
        continue;
      }

      try {
        var helpers = scope.cineCoreUiHelpers;
        if (helpers && typeof helpers === 'object') {
          candidates.push(helpers);
        }
      } catch (scopeLookupError) {
        void scopeLookupError;
      }
    }

    for (var cIndex = 0; cIndex < candidates.length; cIndex += 1) {
      var candidate = candidates[cIndex];
      if (candidate && typeof candidate === 'object') {
        return candidate;
      }
    }

    return {};
  }

  function ensureGlobalObject(scope, name) {
    if (!scope) {
      return null;
    }

    var value = null;
    try {
      value = scope[name];
    } catch (readError) {
      void readError;
      value = null;
    }

    if (value && typeof value === 'object') {
      return value;
    }

    var created = {};

    try {
      scope[name] = created;
    } catch (assignError) {
      void assignError;
      try {
        Object.defineProperty(scope, name, {
          configurable: true,
          enumerable: false,
          writable: true,
          value: created
        });
      } catch (defineError) {
        void defineError;
      }
    }

    return created;
  }

  function normaliseFunction(candidate, fallback) {
    if (candidate && typeof candidate === 'function') {
      return candidate;
    }
    return fallback;
  }

  function createSafeEscapeHtml() {
    return function escapeHtmlFallback(str) {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    };
  }

  var helpers = resolveCoreUiHelpers();

  var escapeHtml = normaliseFunction(helpers && helpers.escapeHtml, createSafeEscapeHtml());

  var escapeButtonLabelSafely = normaliseFunction(
    helpers && helpers.escapeButtonLabelSafely,
    function escapeButtonLabelSafelyFallback(text) {
      if (typeof text !== 'string' || text === '') {
        return '';
      }
      return escapeHtml(text);
    }
  );

  var resolveButtonIconMarkup = normaliseFunction(
    helpers && helpers.resolveButtonIconMarkup,
    function resolveButtonIconMarkupFallback() {
      return '';
    }
  );

  var scope = resolveGlobalScope();
  var bridge = ensureGlobalObject(scope, 'cineCoreRuntimeUiBridge') || {};

  var setButtonLabelWithIcon = null;

  if (helpers && typeof helpers.setButtonLabelWithIcon === 'function') {
    setButtonLabelWithIcon = helpers.setButtonLabelWithIcon;
  }

  if (!setButtonLabelWithIcon && scope) {
    try {
      if (typeof scope.setButtonLabelWithIcon === 'function') {
        setButtonLabelWithIcon = scope.setButtonLabelWithIcon;
      }
    } catch (globalLookupError) {
      void globalLookupError;
    }
  }

  if (!setButtonLabelWithIcon) {
    setButtonLabelWithIcon = function setButtonLabelWithIconFallback(button, label, glyph) {
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

      var iconHtml = resolveButtonIconMarkup(resolvedGlyph);
      var safeLabel = escapeButtonLabelSafely(typeof label === 'string' ? label : '');

      try {
        button.innerHTML = '' + iconHtml + safeLabel;
      } catch (assignError) {
        void assignError;
        try {
          button.textContent = safeLabel;
        } catch (textAssignError) {
          void textAssignError;
        }
      }
    };
  }

  if (scope && typeof scope.setButtonLabelWithIcon !== 'function') {
    try {
      scope.setButtonLabelWithIcon = setButtonLabelWithIcon;
    } catch (assignError) {
      void assignError;
    }
  }

  if (!bridge.helpers) {
    bridge.helpers = helpers;
  }

  bridge.escapeHtml = escapeHtml;
  bridge.escapeButtonLabelSafely = escapeButtonLabelSafely;
  bridge.resolveButtonIconMarkup = resolveButtonIconMarkup;
  bridge.setButtonLabelWithIcon = setButtonLabelWithIcon;

  try {
    Object.defineProperty(bridge, 'helpers', {
      configurable: true,
      enumerable: false,
      writable: true,
      value: helpers
    });
  } catch (defineHelpersError) {
    void defineHelpersError;
  }

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = bridge;
  }
})();
