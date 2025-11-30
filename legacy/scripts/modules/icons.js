function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function createCineIconsModule() {
  var globalScope = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || {};
  var VALID_ICON_FONTS = function createValidIconFontSet() {
    var keys = globalScope.ICON_FONT_KEYS || (typeof ICON_FONT_KEYS !== 'undefined' ? ICON_FONT_KEYS : null);
    if (_typeof(keys) !== 'object' || !keys) {
      return new Set();
    }
    var fonts = Object.values(keys).filter(function (font) {
      return typeof font === 'string' && font;
    });
    return new Set(fonts);
  }();
  function toCodePointChar(value, radix) {
    var codePoint = parseInt(value, radix);
    if (!Number.isFinite(codePoint) || codePoint < 0) {
      return '';
    }
    if (typeof String.fromCodePoint === 'function') {
      try {
        return String.fromCodePoint(codePoint);
      } catch (rangeError) {
        void rangeError;
      }
    }
    if (codePoint <= 0xffff) {
      return String.fromCharCode(codePoint);
    }
    return '';
  }
  function normalizeGlyphChar(char) {
    if (typeof char !== 'string') {
      return '';
    }
    var trimmed = char.trim();
    if (!trimmed) {
      return '';
    }
    var unicodeMatch = trimmed.match(/^(?:\\)+u([0-9A-Fa-f]{4})$/);
    if (unicodeMatch) {
      var decoded = toCodePointChar(unicodeMatch[1], 16);
      if (decoded) {
        return decoded;
      }
    }
    var unicodeBraceMatch = trimmed.match(/^(?:\\)+u\{([0-9A-Fa-f]+)\}$/);
    if (unicodeBraceMatch) {
      var _decoded = toCodePointChar(unicodeBraceMatch[1], 16);
      if (_decoded) {
        return _decoded;
      }
    }
    var hexEntityMatch = trimmed.match(/^&#x([0-9A-Fa-f]+);$/i);
    if (hexEntityMatch) {
      var _decoded2 = toCodePointChar(hexEntityMatch[1], 16);
      if (_decoded2) {
        return _decoded2;
      }
    }
    var decimalEntityMatch = trimmed.match(/^&#(\d+);$/);
    if (decimalEntityMatch) {
      var _decoded3 = toCodePointChar(decimalEntityMatch[1], 10);
      if (_decoded3) {
        return _decoded3;
      }
    }
    return trimmed;
  }
  function iconGlyph(char, font) {
    var keys = globalScope.ICON_FONT_KEYS || (typeof ICON_FONT_KEYS !== 'undefined' ? ICON_FONT_KEYS : {
      UICONS: 'uicons'
    });
    var defaultFont = keys.UICONS || 'uicons';
    var requestedFont = font || defaultFont;
    var normalizedFont = VALID_ICON_FONTS.has(requestedFont) ? requestedFont : defaultFont;
    var normalizedChar = normalizeGlyphChar(char);
    var glyph = {
      char: normalizedChar,
      font: normalizedFont
    };
    return typeof Object.freeze === 'function' ? Object.freeze(glyph) : glyph;
  }
  function resolveIconGlyph(glyph) {
    var keys = globalScope.ICON_FONT_KEYS || (typeof ICON_FONT_KEYS !== 'undefined' ? ICON_FONT_KEYS : {
      UICONS: 'uicons'
    });
    var defaultFont = keys.UICONS || 'uicons';
    if (!glyph) {
      return {
        char: '',
        font: defaultFont,
        className: '',
        size: undefined
      };
    }
    if (glyph.markup) {
      var size = Number.isFinite(glyph.size) ? glyph.size : undefined;
      return {
        markup: glyph.markup,
        className: glyph.className || '',
        font: defaultFont,
        size: size
      };
    }
    if (typeof glyph === 'string') {
      return {
        char: normalizeGlyphChar(glyph),
        font: defaultFont,
        className: '',
        size: undefined
      };
    }
    if (_typeof(glyph) === 'object') {
      var char = typeof glyph.char === 'string' ? normalizeGlyphChar(glyph.char) : '';
      var fontKey = glyph.font && VALID_ICON_FONTS.has(glyph.font) ? glyph.font : defaultFont;
      var className = typeof glyph.className === 'string' ? glyph.className : '';
      var _size = Number.isFinite(glyph.size) ? glyph.size : undefined;
      if (glyph.markup) {
        return {
          markup: glyph.markup,
          className: className,
          font: fontKey,
          size: _size
        };
      }
      return {
        char: char,
        font: fontKey,
        className: className,
        size: _size
      };
    }
    return {
      char: '',
      font: defaultFont,
      className: '',
      size: undefined
    };
  }
  function ensureSvgHasAriaHidden(markup) {
    if (typeof markup !== 'string') return '';
    if (markup.indexOf('aria-hidden="true"') !== -1) return markup;
    return markup.replace('<svg', '<svg aria-hidden="true"');
  }
  function applyIconGlyph(element, glyph) {
    if (!element) return;
    var resolved = resolveIconGlyph(glyph);
    if (resolved.markup) {
      element.innerHTML = ensureSvgHasAriaHidden(resolved.markup);
      element.setAttribute('aria-hidden', 'true');
      if (resolved.className) {
        resolved.className.split(/\s+/).filter(Boolean).forEach(function (cls) {
          return element.classList.add(cls);
        });
      }
      element.removeAttribute('data-icon-font');
      return;
    }
    var char = resolved.char || '';
    element.textContent = char;
    if (char) {
      element.setAttribute('data-icon-font', resolved.font);
    } else {
      element.removeAttribute('data-icon-font');
    }
  }
  function formatSvgCoordinate(value) {
    if (!Number.isFinite(value)) return '0';
    var rounded = Math.round(value * 100) / 100;
    if (Number.isInteger(rounded)) return String(rounded);
    return rounded.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
  }
  function positionSvgMarkup(markup, centerX, centerY) {
    var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 24;
    if (typeof markup !== 'string') {
      return {
        markup: '',
        x: '0',
        y: '0'
      };
    }
    var trimmed = markup.trim();
    if (!trimmed) {
      return {
        markup: '',
        x: '0',
        y: '0'
      };
    }
    var half = size / 2;
    var x = formatSvgCoordinate(centerX);
    var y = formatSvgCoordinate(centerY);
    var width = formatSvgCoordinate(size);
    var height = formatSvgCoordinate(size);
    var cleaned = trimmed.replace(/<svg\b([^>]*)>/i, function (match) {
      var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var attrText = attrs.replace(/\s+x\s*=\s*"[^"]*"/gi, '').replace(/\s+y\s*=\s*"[^"]*"/gi, '').trim();
      var additions = [];
      if (!/(?:^|\s)width\s*=/i.test(attrText)) additions.push("width=\"".concat(width, "\""));
      if (!/(?:^|\s)height\s*=/i.test(attrText)) additions.push("height=\"".concat(height, "\""));
      additions.push("x=\"-".concat(formatSvgCoordinate(half), "\""));
      additions.push("y=\"-".concat(formatSvgCoordinate(half), "\""));
      attrText = [attrText].concat(additions).filter(Boolean).join(' ').trim();
      return attrText ? "<svg ".concat(attrText, ">") : '<svg>';
    });
    return {
      markup: cleaned,
      x: x,
      y: y
    };
  }
  var STAR_ICON_SVG = "\n    <svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\">\n      <path\n        d=\"M12 17.25 6.545 20.2 7.9 13.975 3 9.45l6.272-.7L12 3l2.728 5.75L21 9.45l-4.9 4.525 1.355 6.225Z\"\n        fill=\"currentColor\"\n        stroke=\"currentColor\"\n        stroke-width=\"0\"\n      />\n    </svg>\n  ".trim();
  var keys = globalScope.ICON_FONT_KEYS || (typeof ICON_FONT_KEYS !== 'undefined' ? ICON_FONT_KEYS : {
    UICONS: 'uicons',
    ESSENTIAL: 'essential',
    GADGET: 'gadget',
    FILM: 'film',
    TEXT: 'text'
  });
  var ICON_GLYPHS = Object.freeze({
    batteryBolt: iconGlyph("\uE1A6", keys.UICONS),
    batteryFull: iconGlyph("\uE1A9", keys.UICONS),
    bolt: iconGlyph("\uF1F8", keys.ESSENTIAL),
    plug: iconGlyph("\uEE75", keys.UICONS),
    sliders: iconGlyph("\uF143", keys.ESSENTIAL),
    screen: iconGlyph("\uF11D", keys.GADGET),
    brightness: iconGlyph("\uE2B3", keys.UICONS),
    wifi: iconGlyph("\uF4AC", keys.UICONS),
    gears: iconGlyph("\uE8AF", keys.UICONS),
    controller: iconGlyph("\uF117", keys.GADGET),
    distance: iconGlyph("\uEFB9", keys.UICONS),
    sensor: iconGlyph("\uEC2B", keys.UICONS),
    viewfinder: iconGlyph("\uF114", keys.FILM),
    camera: iconGlyph("\uE333", keys.UICONS),
    trash: iconGlyph("\uF254", keys.ESSENTIAL),
    reload: iconGlyph("\uF202", keys.ESSENTIAL),
    load: iconGlyph("\uE0E0", keys.UICONS),
    installApp: iconGlyph("\uE9D4", keys.UICONS),
    add: Object.freeze({
      char: '+',
      font: keys.TEXT,
      className: 'icon-text'
    }),
    minus: Object.freeze({
      char: '−',
      font: keys.TEXT,
      className: 'icon-text'
    }),
    arrowLeft: Object.freeze({
      char: '←',
      font: keys.TEXT,
      className: 'icon-text'
    }),
    check: iconGlyph("\uE3D8", keys.UICONS),
    fileExport: iconGlyph("\uE7AB", keys.UICONS),
    fileImport: iconGlyph("\uE7C7", keys.UICONS),
    save: iconGlyph("\uF207", keys.ESSENTIAL),
    share: iconGlyph("\uF219", keys.ESSENTIAL),
    paperPlane: iconGlyph("\uED67", keys.UICONS),
    magnet: iconGlyph("\uF1B5", keys.ESSENTIAL),
    codec: iconGlyph("\uE4CD", keys.UICONS),
    timecode: iconGlyph("\uF10E", keys.FILM),
    audioIn: iconGlyph("\uF1C3", keys.ESSENTIAL),
    audioOut: iconGlyph("\uF22F", keys.ESSENTIAL),
    note: iconGlyph("\uF13E", keys.ESSENTIAL),
    overview: iconGlyph("\uF1F5", keys.UICONS),
    gearList: iconGlyph("\uE467", keys.UICONS),
    contacts: iconGlyph("\uF404", keys.UICONS),
    feedback: iconGlyph("\uE791", keys.UICONS),
    resetView: iconGlyph("\uEB6D", keys.UICONS),
    pin: iconGlyph("\uF1EF", keys.ESSENTIAL),
    sun: iconGlyph("\uF1FE", keys.UICONS),
    moon: iconGlyph("\uEC7E", keys.UICONS),
    circleX: iconGlyph("\uF131", keys.ESSENTIAL),
    settingsGeneral: iconGlyph("\uE5A3", keys.UICONS),
    settingsAutoGear: iconGlyph("\uE8AF", keys.UICONS),
    settingsAccessibility: iconGlyph("\uF392", keys.UICONS),
    settingsBackup: iconGlyph("\uE5BD", keys.UICONS),
    settingsData: iconGlyph("\uE5C7", keys.UICONS),
    settingsAbout: iconGlyph("\uEA4F", keys.UICONS),
    star: Object.freeze({
      markup: STAR_ICON_SVG,
      className: 'icon-svg favorite-star-icon'
    }),
    warning: iconGlyph("\uF26F", keys.ESSENTIAL)
  });
  globalScope.cineIcons = {
    VALID_ICON_FONTS: VALID_ICON_FONTS,
    toCodePointChar: toCodePointChar,
    normalizeGlyphChar: normalizeGlyphChar,
    iconGlyph: iconGlyph,
    resolveIconGlyph: resolveIconGlyph,
    applyIconGlyph: applyIconGlyph,
    formatSvgCoordinate: formatSvgCoordinate,
    positionSvgMarkup: positionSvgMarkup,
    STAR_ICON_SVG: STAR_ICON_SVG,
    ICON_GLYPHS: ICON_GLYPHS
  };
  globalScope.iconGlyph = iconGlyph;
  globalScope.resolveIconGlyph = resolveIconGlyph;
  globalScope.applyIconGlyph = applyIconGlyph;
  globalScope.formatSvgCoordinate = formatSvgCoordinate;
  globalScope.positionSvgMarkup = positionSvgMarkup;
  globalScope.STAR_ICON_SVG = STAR_ICON_SVG;
  globalScope.ICON_GLYPHS = ICON_GLYPHS;
  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = globalScope.cineIcons;
  }
})();