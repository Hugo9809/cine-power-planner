function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function createCineCoreUiHelpersNamespace() {
  function detectGlobalScope() {
    if (typeof CORE_GLOBAL_SCOPE !== 'undefined' && CORE_GLOBAL_SCOPE && (typeof CORE_GLOBAL_SCOPE === "undefined" ? "undefined" : _typeof(CORE_GLOBAL_SCOPE)) === 'object') {
      return CORE_GLOBAL_SCOPE;
    }
    if (typeof globalThis !== 'undefined' && globalThis && (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === 'object') {
      return globalThis;
    }
    if (typeof window !== 'undefined' && window && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
      return window;
    }
    if (typeof self !== 'undefined' && self && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object') {
      return self;
    }
    if (typeof global !== 'undefined' && global && (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object') {
      return global;
    }
    return null;
  }
  var GLOBAL_SCOPE = detectGlobalScope();
  function resolveDocument() {
    if (GLOBAL_SCOPE && GLOBAL_SCOPE.document && _typeof(GLOBAL_SCOPE.document) === 'object') {
      return GLOBAL_SCOPE.document;
    }
    if (typeof document !== 'undefined' && document && (typeof document === "undefined" ? "undefined" : _typeof(document)) === 'object') {
      return document;
    }
    return null;
  }
  var escapeDiv = null;
  function escapeHtml(str) {
    if (!escapeDiv) {
      var doc = resolveDocument();
      if (doc) {
        escapeDiv = doc.createElement('div');
      }
    }
    if (!escapeDiv) {
      return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
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
    return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
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
    var codePoint = parseInt(value, radix, 10);
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
    var trimmed = char.trim();
    if (!trimmed) {
      return '';
    }
    var unicodeMatch = trimmed.match(/^(?:\\)+u([0-9A-Fa-f]{4})$/);
    if (unicodeMatch) {
      var decoded = fallbackToCodePointChar(unicodeMatch[1], 16);
      if (decoded) {
        return decoded;
      }
    }
    var unicodeBraceMatch = trimmed.match(/^(?:\\)+u\{([0-9A-Fa-f]+)\}$/);
    if (unicodeBraceMatch) {
      var _decoded = fallbackToCodePointChar(unicodeBraceMatch[1], 16);
      if (_decoded) {
        return _decoded;
      }
    }
    var hexEntityMatch = trimmed.match(/^&#x([0-9A-Fa-f]+);$/i);
    if (hexEntityMatch) {
      var _decoded2 = fallbackToCodePointChar(hexEntityMatch[1], 16);
      if (_decoded2) {
        return _decoded2;
      }
    }
    var decimalEntityMatch = trimmed.match(/^&#(\d+);$/);
    if (decimalEntityMatch) {
      var _decoded3 = fallbackToCodePointChar(decimalEntityMatch[1], 10);
      if (_decoded3) {
        return _decoded3;
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
      var char = fallbackNormalizeGlyphChar(glyph);
      if (!char) {
        return null;
      }
      return {
        char: char,
        font: 'uicons',
        className: ''
      };
    }
    if (_typeof(glyph) !== 'object') {
      return null;
    }
    var markup = typeof glyph.markup === 'string' ? glyph.markup.trim() : '';
    var className = typeof glyph.className === 'string' ? glyph.className : '';
    var style = typeof glyph.style === 'string' ? glyph.style : '';
    var size = glyph.size;
    var scale = glyph.scale;
    if (markup) {
      return {
        markup: markup,
        className: className,
        style: style,
        size: size,
        scale: scale
      };
    }
    var rawChar = typeof glyph.char === 'string' && glyph.char ? glyph.char : typeof glyph.character === 'string' && glyph.character ? glyph.character : typeof glyph.glyph === 'string' && glyph.glyph ? glyph.glyph : typeof glyph.unicode === 'string' && glyph.unicode ? glyph.unicode : '';
    var normalizedChar = fallbackNormalizeGlyphChar(rawChar);
    if (!normalizedChar) {
      return null;
    }
    var font = typeof glyph.font === 'string' && glyph.font.trim() ? glyph.font.trim() : 'uicons';
    return {
      char: normalizedChar,
      font: font,
      className: className,
      style: style,
      size: size,
      scale: scale
    };
  }
  function createFallbackIconMarkup(glyph, baseClassName) {
    var resolved = normalizeFallbackGlyphConfig(glyph);
    if (!resolved) {
      return '';
    }
    var classes = ['icon-glyph'];
    if (typeof baseClassName === 'string' && baseClassName) {
      classes.unshift(baseClassName);
    }
    if (resolved.className) {
      resolved.className.split(/\s+/).filter(Boolean).forEach(function (cls) {
        if (classes.indexOf(cls) === -1) {
          classes.push(cls);
        }
      });
    }
    var styleParts = [];
    if (isFiniteNumber(resolved.size) && resolved.size > 0) {
      styleParts.push('--icon-size: ' + resolved.size + 'px');
    } else if (typeof resolved.size === 'string' && resolved.size.trim()) {
      styleParts.push('--icon-size: ' + resolved.size.trim());
    }
    if (isFiniteNumber(resolved.scale) && resolved.scale > 0) {
      styleParts.push('--icon-scale: ' + resolved.scale);
    } else if (typeof resolved.scale === 'string' && resolved.scale.trim()) {
      styleParts.push('--icon-scale: ' + resolved.scale.trim());
    }
    if (typeof resolved.style === 'string' && resolved.style.trim()) {
      styleParts.push(resolved.style.trim());
    }
    var styleAttr = styleParts.length ? ' style="' + styleParts.join(';') + '"' : '';
    if (resolved.markup) {
      return '<span class="' + classes.join(' ') + '"' + styleAttr + ' aria-hidden="true">' + resolved.markup + '</span>';
    }
    var char = typeof resolved.char === 'string' ? resolved.char : '';
    if (!char) {
      return '';
    }
    var font = typeof resolved.font === 'string' ? resolved.font : 'uicons';
    var fontAttr = font ? ' data-icon-font="' + fallbackEscapeAttribute(font) + '"' : '';
    return '<span class="' + classes.join(' ') + '"' + styleAttr + fontAttr + ' aria-hidden="true">' + escapeHtml(char) + '</span>';
  }
  function resolveButtonIconMarkup(glyph) {
    if (!glyph) {
      return '';
    }
    var iconFactory = getIconMarkupFunction();
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
      if ((typeof ICON_GLYPHS === "undefined" ? "undefined" : _typeof(ICON_GLYPHS)) === 'object' && ICON_GLYPHS && ICON_GLYPHS.save) {
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
    var doc = resolveDocument();
    var resolvedGlyph = resolveDefaultGlyph(glyph);
    var iconHtml = resolveButtonIconMarkup(resolvedGlyph);
    var safeLabel = typeof label === 'string' ? label : '';
    if (button.firstChild) {
      while (button.firstChild) {
        button.removeChild(button.firstChild);
      }
    }
    if (doc && iconHtml) {
      var temp = doc.createElement('span');
      temp.innerHTML = iconHtml;
      while (temp.firstChild) {
        button.appendChild(temp.firstChild);
      }
    } else if (!doc && iconHtml && typeof button.innerHTML === 'string') {
      button.innerHTML = "".concat(iconHtml).concat(escapeButtonLabelSafely(safeLabel));
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
  var namespace = {
    escapeHtml: escapeHtml,
    escapeButtonLabelSafely: escapeButtonLabelSafely,
    resolveButtonIconMarkup: resolveButtonIconMarkup,
    setButtonLabelWithIcon: setButtonLabelWithIcon
  };
  if (GLOBAL_SCOPE) {
    var existing = GLOBAL_SCOPE.cineCoreUiHelpers && _typeof(GLOBAL_SCOPE.cineCoreUiHelpers) === 'object' ? GLOBAL_SCOPE.cineCoreUiHelpers : {};
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
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && module.exports) {
    module.exports = namespace;
  }
})();
