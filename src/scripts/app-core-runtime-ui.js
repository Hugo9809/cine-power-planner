/*
 * Runtime UI bridge for the Cine Power Planner.
 *
 * The runtime is split across multiple files and needs a stable way to access
 * UI helper utilities (escaping functions, icon rendering helpers, etc.).
 * Historically each runtime segment re-implemented the resolution logic which
 * made it harder to ensure the modern and legacy bundles behaved the same.
 * This module centralises the resolver and exposes a shared bridge so every
 * part of the runtime reads the same values without redoing the discovery
 * process. The helpers are cached on the global scope to keep offline builds
 * deterministic and to avoid data-loss inducing regressions when the runtime
 * loads in an unusual order.
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
    const candidates = [];

    if (typeof require === 'function') {
      try {
        const requiredHelpers = require('./app-core-ui-helpers.js');
        if (requiredHelpers && typeof requiredHelpers === 'object') {
          candidates.push(requiredHelpers);
        }
      } catch (helpersError) {
        void helpersError;
      }
    }

    const scopes = [];

    try {
      if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE) {
        scopes.push(CORE_GLOBAL_SCOPE);
      }
    } catch (coreScopeError) {
      void coreScopeError;
    }

    const globalScope = resolveGlobalScope();
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

    for (let index = 0; index < scopes.length; index += 1) {
      const scope = scopes[index];
      if (!scope) {
        continue;
      }

      try {
        const helpers = scope.cineCoreUiHelpers;
        if (helpers && typeof helpers === 'object') {
          candidates.push(helpers);
        }
      } catch (scopeLookupError) {
        void scopeLookupError;
      }
    }

    for (let index = 0; index < candidates.length; index += 1) {
      const candidate = candidates[index];
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

    let value = null;
    try {
      value = scope[name];
    } catch (readError) {
      void readError;
      value = null;
    }

    if (value && typeof value === 'object') {
      return value;
    }

    const created = {};

    try {
      scope[name] = created;
    } catch (assignError) {
      void assignError;
      try {
        Object.defineProperty(scope, name, {
          configurable: true,
          enumerable: false,
          writable: true,
          value: created,
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

  const helpers = resolveCoreUiHelpers();

  const escapeHtml = normaliseFunction(helpers.escapeHtml, createSafeEscapeHtml());

  const escapeButtonLabelSafely = normaliseFunction(
    helpers.escapeButtonLabelSafely,
    function escapeButtonLabelSafelyFallback(text) {
      if (typeof text !== 'string' || text === '') {
        return '';
      }
      return escapeHtml(text);
    },
  );

  const resolveButtonIconMarkup = normaliseFunction(
    helpers.resolveButtonIconMarkup,
    function resolveButtonIconMarkupFallback() {
      return '';
    },
  );

  const scope = resolveGlobalScope();
  const bridge = ensureGlobalObject(scope, 'cineCoreRuntimeUiBridge') || {};

  let setButtonLabelWithIcon = null;

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

      let resolvedGlyph = glyph;
      if (typeof resolvedGlyph === 'undefined') {
        try {
          if (typeof ICON_GLYPHS === 'object' && ICON_GLYPHS && ICON_GLYPHS.save) {
            resolvedGlyph = ICON_GLYPHS.save;
          }
        } catch (glyphError) {
          void glyphError;
        }
      }

      const iconHtml = resolveButtonIconMarkup(resolvedGlyph);
      const safeLabel = escapeButtonLabelSafely(typeof label === 'string' ? label : '');

      try {
        button.innerHTML = `${iconHtml}${safeLabel}`;
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
      value: helpers,
    });
  } catch (defineHelpersError) {
    void defineHelpersError;
  }

  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = bridge;
  }
})();
