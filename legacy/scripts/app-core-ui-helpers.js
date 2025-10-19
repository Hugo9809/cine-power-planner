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
  function resolveButtonIconMarkup(glyph) {
    if (!glyph) {
      return '';
    }
    var iconFactory = getIconMarkupFunction();
    if (!iconFactory) {
      return '';
    }
    try {
      return iconFactory(glyph, 'btn-icon');
    } catch (iconError) {
      void iconError;
    }
    return '';
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