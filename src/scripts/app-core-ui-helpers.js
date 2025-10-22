/* global CORE_GLOBAL_SCOPE, ICON_GLYPHS, iconMarkup */
/*
 * Centralised UI helpers shared across the Cine Power Planner runtime.
 *
 * The functions defined here used to live in multiple runtime modules. They
 * now reside in this shared namespace so both modern and legacy bundles pick up
 * a single, well-tested implementation. Keeping the helpers aligned guarantees
 * that button labels, icons, and HTML escaping behave consistently across
 * offline sessions, service worker restores, and the various data recovery
 * pathways that protect user projects.
 */

(function createCineCoreUiHelpersNamespace() {
  function detectGlobalScope() {
    if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && typeof CORE_GLOBAL_SCOPE === 'object') {
      return CORE_GLOBAL_SCOPE;
    }
    if (typeof globalThis !== 'undefined' && globalThis && typeof globalThis === 'object') {
      return globalThis;
    }
    if (typeof window !== 'undefined' && window && typeof window === 'object') {
      return window;
    }
    if (typeof self !== 'undefined' && self && typeof self === 'object') {
      return self;
    }
    if (typeof global !== 'undefined' && global && typeof global === 'object') {
      return global;
    }
    return null;
  }

  const GLOBAL_SCOPE = detectGlobalScope();

  function resolveDocument() {
    if (GLOBAL_SCOPE && GLOBAL_SCOPE.document && typeof GLOBAL_SCOPE.document === 'object') {
      return GLOBAL_SCOPE.document;
    }
    if (typeof document !== 'undefined' && document && typeof document === 'object') {
      return document;
    }
    return null;
  }

  let escapeDiv = null;
  function escapeHtml(str) {
    if (!escapeDiv) {
      const doc = resolveDocument();
      if (doc) {
        escapeDiv = doc.createElement('div');
      }
    }

    if (!escapeDiv) {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    escapeDiv.textContent = str;
    return escapeDiv.innerHTML;
  }

  function escapeButtonLabelSafely(text) {
    if (typeof text !== 'string' || text === '') {
      return '';
    }

    try {
      return escapeHtml(text);
    } catch (escapeError) {
      void escapeError;
    }

    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getIconMarkupFunction() {
    try {
      if (typeof iconMarkup === 'function') {
        return iconMarkup;
      }
    } catch (maybeReferenceError) {
      if (!(maybeReferenceError && maybeReferenceError.name === 'ReferenceError')) {
        throw maybeReferenceError;
      }
    }

    if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.iconMarkup === 'function') {
      return GLOBAL_SCOPE.iconMarkup;
    }

    return null;
  }

  function isFiniteNumber(value) {
    if (typeof value !== 'number') {
      return false;
    }
    if (typeof Number.isFinite === 'function') {
      return Number.isFinite(value);
    }
    return isFinite(value);
  }

  function fallbackToCodePointChar(value, radix) {
    const codePoint = parseInt(value, radix);
    if (!isFiniteNumber(codePoint) || codePoint < 0) {
      return '';
    }
    try {
      if (typeof String.fromCodePoint === 'function') {
        return String.fromCodePoint(codePoint);
      }
    } catch (rangeError) {
      void rangeError;
    }
    if (codePoint <= 0xffff) {
      return String.fromCharCode(codePoint);
    }
    return '';
  }

  function fallbackNormalizeGlyphChar(char) {
    if (typeof char !== 'string') {
      return '';
    }

    const trimmed = char.trim();
    if (!trimmed) {
      return '';
    }

    const unicodeMatch = trimmed.match(/^(?:\\)+u([0-9A-Fa-f]{4})$/);
    if (unicodeMatch) {
      const decoded = fallbackToCodePointChar(unicodeMatch[1], 16);
      if (decoded) {
        return decoded;
      }
    }

    const unicodeBraceMatch = trimmed.match(/^(?:\\)+u\{([0-9A-Fa-f]+)\}$/);
    if (unicodeBraceMatch) {
      const decoded = fallbackToCodePointChar(unicodeBraceMatch[1], 16);
      if (decoded) {
        return decoded;
      }
    }

    const hexEntityMatch = trimmed.match(/^&#x([0-9A-Fa-f]+);$/i);
    if (hexEntityMatch) {
      const decoded = fallbackToCodePointChar(hexEntityMatch[1], 16);
      if (decoded) {
        return decoded;
      }
    }

    const decimalEntityMatch = trimmed.match(/^&#(\d+);$/);
    if (decimalEntityMatch) {
      const decoded = fallbackToCodePointChar(decimalEntityMatch[1], 10);
      if (decoded) {
        return decoded;
      }
    }

    return trimmed;
  }

  function fallbackEscapeAttribute(value) {
    if (typeof value === 'string') {
      return escapeButtonLabelSafely(value);
    }
    if (value === null || typeof value === 'undefined') {
      return '';
    }
    try {
      return escapeButtonLabelSafely(String(value));
    } catch (attributeError) {
      void attributeError;
    }
    return '';
  }

  function normalizeFallbackGlyphConfig(glyph) {
    if (!glyph) {
      return null;
    }

    if (typeof glyph === 'string') {
      const char = fallbackNormalizeGlyphChar(glyph);
      if (!char) {
        return null;
      }
      return { char, font: 'uicons', className: '' };
    }

    if (typeof glyph !== 'object') {
      return null;
    }

    const markup = typeof glyph.markup === 'string' ? glyph.markup.trim() : '';
    const className = typeof glyph.className === 'string' ? glyph.className : '';
    const style = typeof glyph.style === 'string' ? glyph.style : '';
    const size = glyph.size;
    const scale = glyph.scale;

    if (markup) {
      return { markup, className, style, size, scale };
    }

    const rawChar =
      typeof glyph.char === 'string' && glyph.char
        ? glyph.char
        : typeof glyph.character === 'string' && glyph.character
          ? glyph.character
          : typeof glyph.glyph === 'string' && glyph.glyph
            ? glyph.glyph
            : typeof glyph.unicode === 'string' && glyph.unicode
              ? glyph.unicode
              : '';

    const char = fallbackNormalizeGlyphChar(rawChar);
    if (!char) {
      return null;
    }

    const font = typeof glyph.font === 'string' && glyph.font.trim() ? glyph.font.trim() : 'uicons';

    return { char, font, className, style, size, scale };
  }

  function createFallbackIconMarkup(glyph, baseClassName) {
    const resolved = normalizeFallbackGlyphConfig(glyph);
    if (!resolved) {
      return '';
    }

    const classes = ['icon-glyph'];
    if (typeof baseClassName === 'string' && baseClassName) {
      classes.unshift(baseClassName);
    }

    if (resolved.className) {
      resolved.className
        .split(/\s+/)
        .filter(Boolean)
        .forEach(cls => {
          if (classes.indexOf(cls) === -1) {
            classes.push(cls);
          }
        });
    }

    const styleParts = [];
    if (isFiniteNumber(resolved.size) && resolved.size > 0) {
      styleParts.push(`--icon-size: ${resolved.size}px`);
    } else if (typeof resolved.size === 'string' && resolved.size.trim()) {
      styleParts.push(`--icon-size: ${resolved.size.trim()}`);
    }

    if (isFiniteNumber(resolved.scale) && resolved.scale > 0) {
      styleParts.push(`--icon-scale: ${resolved.scale}`);
    } else if (typeof resolved.scale === 'string' && resolved.scale.trim()) {
      styleParts.push(`--icon-scale: ${resolved.scale.trim()}`);
    }

    if (typeof resolved.style === 'string' && resolved.style.trim()) {
      styleParts.push(resolved.style.trim());
    }

    const styleAttr = styleParts.length ? ` style="${styleParts.join(';')}"` : '';

    if (resolved.markup) {
      return `<span class="${classes.join(' ')}"${styleAttr} aria-hidden="true">${resolved.markup}</span>`;
    }

    const char = typeof resolved.char === 'string' ? resolved.char : '';
    if (!char) {
      return '';
    }

    const font = typeof resolved.font === 'string' ? resolved.font : 'uicons';
    const fontAttr = font ? ` data-icon-font="${fallbackEscapeAttribute(font)}"` : '';
    return `<span class="${classes.join(' ')}"${styleAttr}${fontAttr} aria-hidden="true">${escapeHtml(char)}</span>`;
  }

  function resolveButtonIconMarkup(glyph) {
    if (!glyph) {
      return '';
    }

    const iconFactory = getIconMarkupFunction();
    if (!iconFactory) {
      return createFallbackIconMarkup(glyph, 'btn-icon');
    }

    try {
      return iconFactory(glyph, 'btn-icon');
    } catch (iconError) {
      void iconError;
    }

    return createFallbackIconMarkup(glyph, 'btn-icon');
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

  function setButtonLabelWithIcon(button, label, glyph) {
    if (!button) {
      return;
    }

    const doc = resolveDocument();
    const resolvedGlyph = resolveDefaultGlyph(glyph);
    const iconHtml = resolveButtonIconMarkup(resolvedGlyph);
    const safeLabel = typeof label === 'string' ? label : '';

    if (button.firstChild) {
      while (button.firstChild) {
        button.removeChild(button.firstChild);
      }
    }

    if (doc && iconHtml) {
      const temp = doc.createElement('span');
      temp.innerHTML = iconHtml;
      while (temp.firstChild) {
        button.appendChild(temp.firstChild);
      }
    } else if (!doc && iconHtml && typeof button.innerHTML === 'string') {
      button.innerHTML = `${iconHtml}${escapeButtonLabelSafely(safeLabel)}`;
      return;
    }

    if (doc) {
      button.appendChild(doc.createTextNode(safeLabel));
    } else if (typeof button.textContent === 'string') {
      button.textContent = safeLabel;
    } else if (typeof button.innerHTML === 'string') {
      button.innerHTML = escapeButtonLabelSafely(safeLabel);
    }
  }

  const namespace = {
    escapeHtml,
    escapeButtonLabelSafely,
    resolveButtonIconMarkup,
    setButtonLabelWithIcon,
  };

  if (GLOBAL_SCOPE) {
    const existing =
      GLOBAL_SCOPE.cineCoreUiHelpers && typeof GLOBAL_SCOPE.cineCoreUiHelpers === 'object'
        ? GLOBAL_SCOPE.cineCoreUiHelpers
        : {};

    existing.escapeHtml = escapeHtml;
    existing.escapeButtonLabelSafely = escapeButtonLabelSafely;
    existing.resolveButtonIconMarkup = resolveButtonIconMarkup;
    existing.setButtonLabelWithIcon = setButtonLabelWithIcon;

    try {
      GLOBAL_SCOPE.cineCoreUiHelpers = existing;
    } catch (assignError) {
      void assignError;
    }
  }

  if (typeof module === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();
