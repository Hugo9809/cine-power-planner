/* global CORE_PART1_RUNTIME_SCOPE, CORE_PART2_RUNTIME_SCOPE, CORE_GLOBAL_SCOPE, ICON_GLYPHS */
/*
 * Cine Power Planner runtime UI bridge.
 *
 * This module resolves the shared UI helper namespace that previously lived
 * directly inside the oversized runtime bundles. By exposing the escaping and
 * button markup utilities on a dedicated bridge we keep the modern and legacy
 * builds aligned while protecting offline behaviour, localisation, and the
 * persisted user data flows (save, share, backup, and restore).
 */

(function initialiseCoreRuntimeUiBridge() {
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

  const GLOBAL_SCOPE = resolveGlobalScope();

  function isObject(candidate) {
    return !!candidate && (typeof candidate === 'object' || typeof candidate === 'function');
  }

  function collectRuntimeScopes() {
    const scopes = [];

    if (typeof CORE_PART1_RUNTIME_SCOPE !== 'undefined' && CORE_PART1_RUNTIME_SCOPE) {
      scopes.push(CORE_PART1_RUNTIME_SCOPE);
    }

    if (typeof CORE_PART2_RUNTIME_SCOPE !== 'undefined' && CORE_PART2_RUNTIME_SCOPE) {
      scopes.push(CORE_PART2_RUNTIME_SCOPE);
    }

    if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE) {
      scopes.push(CORE_GLOBAL_SCOPE);
    }

    if (isObject(GLOBAL_SCOPE)) {
      scopes.push(GLOBAL_SCOPE);
    }

    if (typeof window !== 'undefined' && window && scopes.indexOf(window) === -1) {
      scopes.push(window);
    }

    if (typeof self !== 'undefined' && self && scopes.indexOf(self) === -1) {
      scopes.push(self);
    }

    if (typeof global !== 'undefined' && global && scopes.indexOf(global) === -1) {
      scopes.push(global);
    }

    return scopes;
  }

  function resolveExistingBridge() {
    const scopes = collectRuntimeScopes();

    for (let index = 0; index < scopes.length; index += 1) {
      const scope = scopes[index];
      if (!isObject(scope)) {
        continue;
      }

      try {
        const bridge = scope.cineCoreRuntimeUiBridge;
        if (isObject(bridge)) {
          return bridge;
        }
      } catch (bridgeLookupError) {
        void bridgeLookupError;
      }
    }

    return null;
  }

  function resolveCoreUiHelpers(existingBridge) {
    if (existingBridge && isObject(existingBridge.helpers)) {
      return existingBridge.helpers;
    }

    if (typeof require === 'function') {
      try {
        const requiredHelpers = require('./app-core-ui-helpers.js');
        if (isObject(requiredHelpers)) {
          return requiredHelpers;
        }
      } catch (helpersError) {
        void helpersError;
      }
    }

    const scopes = collectRuntimeScopes();
    for (let index = 0; index < scopes.length; index += 1) {
      const scope = scopes[index];
      if (!isObject(scope)) {
        continue;
      }

      try {
        const helpers = scope.cineCoreUiHelpers;
        if (isObject(helpers)) {
          return helpers;
        }
      } catch (scopeLookupError) {
        void scopeLookupError;
      }
    }

    return {};
  }

  function fallbackEscapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function createFallbackSetButtonLabelWithIcon(escapeFn, escapeLabelFn, iconMarkupFn) {
    return function setButtonLabelWithIconFallback(button, label, glyph) {
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

        if (typeof resolvedGlyph === 'undefined' && isObject(GLOBAL_SCOPE)) {
          try {
            const scopeIcons = GLOBAL_SCOPE.ICON_GLYPHS;
            if (typeof scopeIcons === 'object' && scopeIcons && scopeIcons.save) {
              resolvedGlyph = scopeIcons.save;
            }
          } catch (scopeGlyphError) {
            void scopeGlyphError;
          }
        }
      }

      const iconHtml = typeof iconMarkupFn === 'function' ? iconMarkupFn(resolvedGlyph) : '';
      const safeLabel = typeof escapeLabelFn === 'function'
        ? escapeLabelFn(typeof label === 'string' ? label : '')
        : typeof escapeFn === 'function'
          ? escapeFn(typeof label === 'string' ? label : '')
          : String(typeof label === 'string' ? label : '');

      try {
        button.innerHTML = `${iconHtml}${safeLabel}`;
      } catch (assignError) {
        void assignError;
      }
    };
  }

  const existingBridge = resolveExistingBridge();
  const helpers = resolveCoreUiHelpers(existingBridge);

  const escapeHtml = typeof helpers.escapeHtml === 'function'
    ? function escapeHtmlProxy(value) {
        try {
          return helpers.escapeHtml(value);
        } catch (helperError) {
          void helperError;
        }
        return fallbackEscapeHtml(value);
      }
    : fallbackEscapeHtml;

  const escapeButtonLabelSafely = typeof helpers.escapeButtonLabelSafely === 'function'
    ? function escapeButtonLabelSafelyProxy(text) {
        try {
          return helpers.escapeButtonLabelSafely(text);
        } catch (helperError) {
          void helperError;
        }
        if (typeof escapeHtml === 'function') {
          return escapeHtml(text);
        }
        return fallbackEscapeHtml(text);
      }
    : function escapeButtonLabelSafelyFallback(text) {
        if (typeof text !== 'string' || text === '') {
          return '';
        }
        return escapeHtml(text);
      };

  const resolveButtonIconMarkup = typeof helpers.resolveButtonIconMarkup === 'function'
    ? function resolveButtonIconMarkupProxy(glyph) {
        try {
          return helpers.resolveButtonIconMarkup(glyph);
        } catch (helperError) {
          void helperError;
        }
        return '';
      }
    : function resolveButtonIconMarkupFallback() {
        return '';
      };

  const setButtonLabelWithIcon = typeof helpers.setButtonLabelWithIcon === 'function'
    ? function setButtonLabelWithIconProxy(button, label, glyph) {
        try {
          helpers.setButtonLabelWithIcon(button, label, glyph);
          return;
        } catch (helperError) {
          void helperError;
        }
        createFallbackSetButtonLabelWithIcon(
          escapeHtml,
          escapeButtonLabelSafely,
          resolveButtonIconMarkup,
        )(button, label, glyph);
      }
    : createFallbackSetButtonLabelWithIcon(
        escapeHtml,
        escapeButtonLabelSafely,
        resolveButtonIconMarkup,
      );

  const runtimeUiBridge = existingBridge && isObject(existingBridge)
    ? existingBridge
    : {};

  runtimeUiBridge.helpers = helpers;
  runtimeUiBridge.escapeHtml = escapeHtml;
  runtimeUiBridge.escapeButtonLabelSafely = escapeButtonLabelSafely;
  runtimeUiBridge.resolveButtonIconMarkup = resolveButtonIconMarkup;
  runtimeUiBridge.setButtonLabelWithIcon = setButtonLabelWithIcon;

  function assignBridgeToScope(scope) {
    if (!isObject(scope)) {
      return;
    }

    try {
      scope.cineCoreRuntimeUiBridge = runtimeUiBridge;
    } catch (assignError) {
      void assignError;
    }
  }

  function ensureSetButtonAvailability(scope) {
    if (!isObject(scope)) {
      return;
    }

    try {
      if (typeof scope.setButtonLabelWithIcon !== 'function') {
        scope.setButtonLabelWithIcon = setButtonLabelWithIcon;
      }
    } catch (assignError) {
      void assignError;
    }
  }

  const scopes = collectRuntimeScopes();
  for (let index = 0; index < scopes.length; index += 1) {
    assignBridgeToScope(scopes[index]);
    ensureSetButtonAvailability(scopes[index]);
  }

  if (!existingBridge && isObject(GLOBAL_SCOPE)) {
    try {
      GLOBAL_SCOPE.cineCoreRuntimeUiBridge = runtimeUiBridge;
    } catch (assignError) {
      void assignError;
    }
  }

  if (typeof module === 'object' && module && module.exports) {
    module.exports = runtimeUiBridge;
  }

  return runtimeUiBridge;
})();
