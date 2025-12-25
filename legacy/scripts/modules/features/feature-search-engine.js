var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
    var runningInCommonJs = (typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && typeof module.exports !== 'undefined';
    if (!runningInCommonJs && typeof require === 'function') {
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
  var ROMAN_NUMERAL_VALUES = {
    i: 1,
    v: 5,
    x: 10,
    l: 50,
    c: 100,
    d: 500,
    m: 1000
  };
  var ROMAN_NUMERAL_PATTERN = /^[ivxlcdm]+$/;
  function parseMarkSuffix(value) {
    if (!value) {
      return {
        cleaned: '',
        number: null
      };
    }
    var cleaned = value.replace(/[^a-z0-9]+/gi, '');
    if (!cleaned) {
      return {
        cleaned: '',
        number: null
      };
    }
    var normalized = cleaned.toLowerCase();
    var number = null;
    if (/^\d+$/.test(cleaned)) {
      number = parseInt(cleaned, 10);
    } else if (ROMAN_NUMERAL_PATTERN.test(normalized)) {
      var total = 0;
      var prev = 0;
      for (var index = normalized.length - 1; index >= 0; index -= 1) {
        var char = normalized[index];
        var current = ROMAN_NUMERAL_VALUES[char];
        if (!current) {
          total = 0;
          break;
        }
        if (current < prev) {
          total -= current;
        } else {
          total += current;
          prev = current;
        }
      }
      if (total > 0) {
        number = total;
      }
    }
    return {
      cleaned: normalized,
      number: number
    };
  }
  function normaliseMarkVariants(str) {
    if (typeof str !== 'string' || !str) {
      return str;
    }
    return str.replace(/\b(mark|mk)[\s-]*(\d+|[ivxlcdm]+)\b/gi, function (_match, _prefix, rawValue) {
      var _parseMarkSuffix = parseMarkSuffix(rawValue),
        cleaned = _parseMarkSuffix.cleaned,
        number = _parseMarkSuffix.number;
      if (!cleaned) {
        return 'mk';
      }
      var suffix = number != null ? String(number) : cleaned;
      return "mk".concat(suffix);
    });
  }
  var UNICODE_FRACTIONS = new Map([['¼', '1/4'], ['½', '1/2'], ['¾', '3/4'], ['⅓', '1/3'], ['⅔', '2/3'], ['⅕', '1/5'], ['⅖', '2/5'], ['⅗', '3/5'], ['⅘', '4/5'], ['⅙', '1/6'], ['⅚', '5/6'], ['⅛', '1/8'], ['⅜', '3/8'], ['⅝', '5/8'], ['⅞', '7/8'], ['⅑', '1/9'], ['⅒', '1/10'], ['⅐', '1/7']]);
  var UNICODE_FRACTION_PATTERN = UNICODE_FRACTIONS.size > 0 ? new RegExp("[".concat(Array.from(UNICODE_FRACTIONS.keys()).join(''), "]"), 'g') : null;
  function normalizeUnicodeFractions(str) {
    if (!UNICODE_FRACTION_PATTERN || typeof str !== 'string' || !str) {
      return str;
    }
    return str.replace(UNICODE_FRACTION_PATTERN, function (match) {
      return UNICODE_FRACTIONS.get(match) || match;
    });
  }
  var NUMBER_WORD_ONES = new Map([['zero', 0], ['one', 1], ['two', 2], ['three', 3], ['four', 4], ['five', 5], ['six', 6], ['seven', 7], ['eight', 8], ['nine', 9]]);
  var NUMBER_WORD_TEENS = new Map([['ten', 10], ['eleven', 11], ['twelve', 12], ['thirteen', 13], ['fourteen', 14], ['fifteen', 15], ['sixteen', 16], ['seventeen', 17], ['eighteen', 18], ['nineteen', 19]]);
  var NUMBER_WORD_TENS = new Map([['twenty', 20], ['thirty', 30], ['forty', 40], ['fifty', 50], ['sixty', 60], ['seventy', 70], ['eighty', 80], ['ninety', 90]]);
  var NUMBER_WORD_BASE = new Map([].concat(_toConsumableArray(NUMBER_WORD_ONES), _toConsumableArray(NUMBER_WORD_TEENS), _toConsumableArray(NUMBER_WORD_TENS)));
  var NUMBER_WORD_BASE_KEYS = Array.from(NUMBER_WORD_BASE.keys()).sort(function (a, b) {
    return b.length - a.length;
  });
  var NUMBER_WORD_ONES_KEYS = Array.from(NUMBER_WORD_ONES.keys()).sort(function (a, b) {
    return b.length - a.length;
  });
  var NUMBER_WORD_PATTERN = NUMBER_WORD_BASE.size > 0 ? new RegExp("\\b(?:".concat(NUMBER_WORD_BASE_KEYS.join('|'), ")(?:[\\s-](?:").concat(NUMBER_WORD_ONES_KEYS.join('|'), "))?\\b"), 'g') : null;
  function normalizeNumberWords(str) {
    if (!NUMBER_WORD_PATTERN || typeof str !== 'string' || !str) {
      return str;
    }
    return str.replace(NUMBER_WORD_PATTERN, function (match) {
      var lower = match.toLowerCase();
      if (NUMBER_WORD_BASE.has(lower)) {
        return String(NUMBER_WORD_BASE.get(lower));
      }
      var parts = lower.split(/[\s-]+/).filter(Boolean);
      if (parts.length === 2) {
        var tens = NUMBER_WORD_TENS.get(parts[0]);
        var ones = NUMBER_WORD_ONES.get(parts[1]);
        if (typeof tens === 'number' && typeof ones === 'number') {
          return String(tens + ones);
        }
      }
      return match;
    });
  }
  var SPELLING_VARIANTS = new Map([['analyse', 'analyze'], ['analysed', 'analyzed'], ['analyses', 'analyzes'], ['analysing', 'analyzing'], ['behaviour', 'behavior'], ['behaviours', 'behaviors'], ['behavioural', 'behavioral'], ['behaviourally', 'behaviorally'], ['centre', 'center'], ['centres', 'centers'], ['colour', 'color'], ['colourful', 'colorful'], ['colouring', 'coloring'], ['colourings', 'colorings'], ['colourless', 'colorless'], ['colours', 'colors'], ['customisation', 'customization'], ['customisations', 'customizations'], ['customise', 'customize'], ['customised', 'customized'], ['customises', 'customizes'], ['customising', 'customizing'], ['defence', 'defense'], ['defences', 'defenses'], ['favour', 'favor'], ['favourable', 'favorable'], ['favourably', 'favorably'], ['favoured', 'favored'], ['favourite', 'favorite'], ['favourites', 'favorites'], ['favouring', 'favoring'], ['favours', 'favors'], ['licence', 'license'], ['licences', 'licenses'], ['localisation', 'localization'], ['localisations', 'localizations'], ['localise', 'localize'], ['localised', 'localized'], ['localises', 'localizes'], ['localising', 'localizing'], ['modelling', 'modeling'], ['modeller', 'modeler'], ['modellers', 'modelers'], ['optimisation', 'optimization'], ['optimisations', 'optimizations'], ['optimise', 'optimize'], ['optimised', 'optimized'], ['optimises', 'optimizes'], ['optimising', 'optimizing'], ['organisation', 'organization'], ['organisations', 'organizations'], ['organise', 'organize'], ['organised', 'organized'], ['organises', 'organizes'], ['organising', 'organizing'], ['personalisation', 'personalization'], ['personalisations', 'personalizations'], ['personalise', 'personalize'], ['personalised', 'personalized'], ['personalises', 'personalizes'], ['personalising', 'personalizing'], ['practise', 'practice'], ['practised', 'practiced'], ['practises', 'practices'], ['practising', 'practicing'], ['theatre', 'theater'], ['theatres', 'theaters'], ['traveller', 'traveler'], ['travellers', 'travelers'], ['travelling', 'traveling']]);
  var SPELLING_VARIANT_PATTERN = SPELLING_VARIANTS.size > 0 ? new RegExp("\\b(".concat(Array.from(SPELLING_VARIANTS.keys()).join('|'), ")\\b"), 'g') : null;
  function normalizeSpellingVariants(str) {
    if (!SPELLING_VARIANT_PATTERN || typeof str !== 'string') {
      return str;
    }
    return str.replace(SPELLING_VARIANT_PATTERN, function (match) {
      return SPELLING_VARIANTS.get(match) || match;
    });
  }
  var DOUBLE_PRIME_VARIANTS_PATTERN = /[″‶‴⁗]/g;
  var SINGLE_PRIME_VARIANTS_PATTERN = /[′‵]/g;
  var MEASUREMENT_VALUE_PATTERN = String.raw(_templateObject || (_templateObject = _taggedTemplateLiteral(["d+(?:s*[.,/-]s*d+)*(?:s+d+(?:s*[.,/-]s*d+)*)*"], ["\\d+(?:\\s*[.,/-]\\s*\\d+)*(?:\\s+\\d+(?:\\s*[.,/-]\\s*\\d+)*)*"])));
  var MEASUREMENT_FOOT_WORD_PATTERN = new RegExp(String.raw(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["(", ")[s-]*(?:feet|foot|ft.?)(?![a-z])"], ["(", ")[\\s-]*(?:feet|foot|ft\\.?)(?![a-z])"])), MEASUREMENT_VALUE_PATTERN), 'gi');
  var MEASUREMENT_FOOT_PRIME_PATTERN = new RegExp(String.raw(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["(", ")s*['\u2019](?=s|[d\"\u201D\u2033'-]|$)"], ["(", ")\\s*['\u2019](?=\\s|[\\d\"\u201D\u2033'-]|$)"])), MEASUREMENT_VALUE_PATTERN), 'g');
  var MEASUREMENT_INCH_WORD_PATTERN = new RegExp(String.raw(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["(", ")[s-]*(?:inches|inch|in.?)(?![a-z])"], ["(", ")[\\s-]*(?:inches|inch|in\\.?)(?![a-z])"])), MEASUREMENT_VALUE_PATTERN), 'gi');
  var MEASUREMENT_INCH_PRIME_PATTERN = new RegExp(String.raw(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["(", ")s*[\"\u201D\u2033](?=s|[d'\u2019\"-]|$)"], ["(", ")\\s*[\"\u201D\u2033](?=\\s|[\\d'\u2019\"-]|$)"])), MEASUREMENT_VALUE_PATTERN), 'g');
  function cleanMeasurementValue(value) {
    return typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : value;
  }
  function normalizeMeasurementUnits(str) {
    if (typeof str !== 'string' || !str) {
      return str;
    }
    var normalized = str.replace(DOUBLE_PRIME_VARIANTS_PATTERN, '"').replace(SINGLE_PRIME_VARIANTS_PATTERN, "'");
    normalized = normalized.replace(MEASUREMENT_FOOT_WORD_PATTERN, function (match, value) {
      void match;
      var cleaned = cleanMeasurementValue(value);
      return cleaned ? "".concat(cleaned, " ft ") : value;
    });
    normalized = normalized.replace(MEASUREMENT_FOOT_PRIME_PATTERN, function (match, value) {
      void match;
      var cleaned = cleanMeasurementValue(value);
      return cleaned ? "".concat(cleaned, " ft ") : value;
    });
    normalized = normalized.replace(MEASUREMENT_INCH_WORD_PATTERN, function (match, value) {
      void match;
      var cleaned = cleanMeasurementValue(value);
      return cleaned ? "".concat(cleaned, " inch ") : value;
    });
    normalized = normalized.replace(MEASUREMENT_INCH_PRIME_PATTERN, function (match, value) {
      void match;
      var cleaned = cleanMeasurementValue(value);
      return cleaned ? "".concat(cleaned, " inch ") : value;
    });
    return normalized;
  }
  function applySearchTokenSynonyms(tokens, addToken) {
    if (!tokens || typeof addToken !== 'function') {
      return;
    }
    var baseTokens = Array.isArray(tokens) ? tokens : Array.from(tokens);
    if (!Array.isArray(baseTokens) || baseTokens.length === 0) {
      return;
    }
    var tokenSet = new Set(baseTokens);
    var hasAny = function hasAny(values) {
      return values.some(function (value) {
        return tokenSet.has(value);
      });
    };
    var hasAllGroups = function hasAllGroups(groups) {
      return groups.every(function (group) {
        var list = Array.isArray(group) ? group : [group];
        return list.some(function (value) {
          return tokenSet.has(value);
        });
      });
    };
    var addAll = function addAll(values) {
      values.forEach(function (value) {
        addToken(value);
      });
    };
    var ensureSynonymGroup = function ensureSynonymGroup(triggers, expansions, groupRequirements) {
      var triggerList = Array.isArray(triggers) ? triggers : [triggers];
      var requirementGroups = Array.isArray(groupRequirements) ? groupRequirements : [];
      if (triggerList.length && hasAny(triggerList) || requirementGroups.length > 0 && hasAllGroups(requirementGroups)) {
        var expansionList = Array.isArray(expansions) ? expansions : [expansions];
        var combined = new Set([].concat(_toConsumableArray(triggerList), _toConsumableArray(expansionList)));
        addAll(Array.from(combined));
      }
    };
    if (hasAny(['fps', 'framerate', 'framepersecond', 'framespersecond']) || hasAllGroups([['frame', 'frames'], ['per', 'persecond', 'persec'], ['second', 'seconds', 'sec']]) || hasAllGroups([['frame', 'frames'], ['rate']])) {
      addAll(['fps', 'framerate', 'framepersecond', 'framespersecond', 'frame', 'frames', 'second', 'seconds']);
    }
    ensureSynonymGroup(['delete', 'remove', 'clear', 'trash', 'bin', 'discard', 'erase', 'wipe'], ['delete', 'remove', 'clear', 'trash', 'bin', 'discard', 'erase', 'wipe']);
    ensureSynonymGroup(['save', 'backup', 'store', 'archive', 'preserve', 'safeguard', 'protect'], ['save', 'backup', 'store', 'archive', 'preserve', 'safeguard', 'protect']);
    ensureSynonymGroup(['restore', 'recover', 'load', 'import', 'rollback', 'return', 'reopen'], ['restore', 'recover', 'load', 'import', 'rollback', 'return', 'reopen']);
    ensureSynonymGroup(['share', 'export', 'send', 'distribute', 'forward', 'deliver', 'publish'], ['share', 'export', 'send', 'distribute', 'forward', 'deliver', 'publish']);
    ensureSynonymGroup(['duplicate', 'copy', 'clone', 'replicate', 'mirror'], ['duplicate', 'copy', 'clone', 'replicate', 'mirror']);
    ensureSynonymGroup(['autosave', 'autobackup', 'autosync', 'autosynchronize'], ['autosave', 'autobackup', 'autosync', 'autosynchronize'], [['auto', 'automatic'], ['save', 'backup', 'sync', 'synchronise', 'synchronize']]);
    if (hasAny(['wh', 'watthour', 'watthours'])) {
      addAll(['wh', 'watthour', 'watthours', 'watt', 'watts', 'hour', 'hours']);
    } else if (hasAllGroups([['watt', 'watts'], ['hour', 'hours', 'hr', 'hrs']])) {
      addAll(['wh', 'watthour', 'watthours']);
    }
    if (hasAny(['kwh', 'kilowatthour', 'kilowatthours'])) {
      addAll(['kwh', 'kilowatthour', 'kilowatthours', 'kilowatt', 'kilowatts', 'watt', 'watts', 'hour', 'hours']);
    } else if (hasAllGroups([['kilowatt', 'kilowatts', 'kw'], ['hour', 'hours', 'hr', 'hrs']])) {
      addAll(['kwh', 'kilowatthour', 'kilowatthours']);
    }
    if (hasAny(['ah', 'amphour', 'amphours'])) {
      addAll(['ah', 'amphour', 'amphours', 'amp', 'amps', 'ampere', 'amperes', 'hour', 'hours']);
    } else if (hasAllGroups([['amp', 'amps', 'ampere', 'amperes'], ['hour', 'hours', 'hr', 'hrs']])) {
      addAll(['ah', 'amphour', 'amphours']);
    }
    if (hasAny(['mah', 'milliamphour', 'milliamphours'])) {
      addAll(['mah', 'milliamphour', 'milliamphours', 'milliamp', 'milliamps', 'milliampere', 'milliamperes', 'ma', 'hour', 'hours']);
    } else if (hasAllGroups([['milliamp', 'milliamps', 'milliampere', 'milliamperes', 'ma'], ['hour', 'hours', 'hr', 'hrs']])) {
      addAll(['mah', 'milliamphour', 'milliamphours']);
    }
    if (hasAny(['mp', 'megapixel', 'megapixels'])) {
      addAll(['mp', 'megapixel', 'megapixels']);
    }
    if (hasAny(['mm', 'millimeter', 'millimeters'])) {
      addAll(['mm', 'millimeter', 'millimeters']);
    }
    if (hasAny(['cm', 'centimeter', 'centimeters'])) {
      addAll(['cm', 'centimeter', 'centimeters']);
    }
    if (hasAny(['inch', 'inches'])) {
      addAll(['inch', 'inches', 'in']);
    }
    if (hasAny(['ft', 'foot', 'feet'])) {
      addAll(['ft', 'foot', 'feet']);
    }
    if (hasAny(['ev', 'exposurevalue'])) {
      addAll(['ev', 'exposurevalue', 'exposure', 'value']);
    } else if (hasAllGroups([['exposure'], ['value']])) {
      addAll(['ev', 'exposurevalue']);
    }
    ensureSynonymGroup(['iso', 'asa', 'ei', 'exposureindex', 'cameraiso', 'sensitivity', 'gain'], ['iso', 'asa', 'ei', 'exposureindex', 'cameraiso', 'sensitivity', 'gain', 'exposureindexvalue', 'exposureindexsetting'], [['exposure', 'camera', 'sensor'], ['index', 'value', 'gain', 'sensitivity']]);
    ensureSynonymGroup(['nd', 'neutraldensity', 'ndfilter', 'neutraldensityfilter', 'internalnd'], ['nd', 'neutraldensity', 'ndfilter', 'neutraldensityfilter', 'internalnd', 'internalneutraldensity'], [['neutral', 'internal'], ['density', 'densityfilter', 'filter']]);
    ensureSynonymGroup(['whitebalance', 'wb', 'colortemperature', 'colourtemperature', 'kelvin'], ['whitebalance', 'wb', 'colortemperature', 'colourtemperature', 'kelvin'], [['white'], ['balance']]);
    ensureSynonymGroup(['whitebalance', 'wb', 'colortemperature', 'colourtemperature', 'kelvin'], ['whitebalance', 'wb', 'colortemperature', 'colourtemperature', 'kelvin'], [['color', 'colour'], ['temperature', 'temp', 'kelvin']]);
    ensureSynonymGroup(['slowmotion', 'slowmo', 'highspeed', 'overcrank', 'highframerate'], ['slowmotion', 'slowmo', 'highspeed', 'overcrank', 'highframerate'], [['slow', 'high'], ['motion', 'speed', 'frame', 'framerate', 'fps']]);
    ensureSynonymGroup(['timelapse', 'hyperlapse', 'intervalrecording', 'intervalshooting'], ['timelapse', 'hyperlapse', 'intervalrecording', 'intervalshooting', 'intervalmode'], [['time', 'interval'], ['lapse', 'record', 'recording', 'shooting', 'capture']]);
    ensureSynonymGroup(['usbc', 'usbtypec', 'usbctype', 'typec'], ['usbc', 'usbtypec', 'usbctype', 'typec', 'usbpowerdelivery', 'powerdelivery', 'pd'], [['usb'], ['c', 'typec']]);
    ensureSynonymGroup(['usba', 'usbtypea', 'typea'], ['usba', 'usbtypea', 'typea'], [['usb'], ['a', 'typea']]);
    ensureSynonymGroup(['microusb', 'usbmicro', 'usbmicrob'], ['microusb', 'usbmicro', 'usbmicrob'], [['usb'], ['micro']]);
    ensureSynonymGroup(['miniusb', 'usbmini', 'usbminib'], ['miniusb', 'usbmini', 'usbminib'], [['usb'], ['mini']]);
    ensureSynonymGroup(['microhdmi', 'hdmimicro'], ['microhdmi', 'hdmimicro'], [['micro'], ['hdmi']]);
    ensureSynonymGroup(['minihdmi', 'hdmimini'], ['minihdmi', 'hdmimini', 'hdmitypec'], [['mini'], ['hdmi']]);
    ensureSynonymGroup(['fullhdmi', 'hdmitypea'], ['fullhdmi', 'hdmitypea'], [['full'], ['hdmi']]);
    ensureSynonymGroup(['sdxc'], ['sdxc', 'secureddxc', 'secureddigitalxc'], [['sd'], ['xc']]);
    ensureSynonymGroup(['sdhc'], ['sdhc', 'secureddigitalhc'], [['sd'], ['hc']]);
    ensureSynonymGroup(['cfexpress', 'cfexpresstypea', 'cfexpresstypeb'], ['cfexpress', 'cfexpresstypea', 'cfexpresstypeb'], [['cf'], ['express']]);
    ensureSynonymGroup(['cfast'], ['cfast'], [['cf'], ['ast', 'fast']]);
    ensureSynonymGroup(['xqd'], ['xqd'], [['qd']]);
    ensureSynonymGroup(['dtap', 'ptap', 'powertap'], ['dtap', 'ptap', 'powertap'], [['d', 'p'], ['tap']]);
    ensureSynonymGroup(['vmount', 'vlock'], ['vmount', 'vlock', 'vmountbattery', 'vmountplate'], [['v'], ['mount', 'lock']]);
    ensureSynonymGroup(['bmount'], ['bmount', 'bmountrib'], [['b'], ['mount']]);
    ensureSynonymGroup(['goldmount', 'antonbauer'], ['goldmount', 'antonbauer'], [['gold'], ['mount']]);
  }
  var FEATURE_SEARCH_FUZZY_MAX_DISTANCE = 2;
  function getAdaptiveFuzzyMaxDistance(source, target, override) {
    if (Number.isFinite(override)) {
      return Math.max(1, Math.floor(override));
    }
    var maxLength = Math.max(source && source.length ? source.length : 0, target && target.length ? target.length : 0);
    if (maxLength <= 4) {
      return 2;
    }
    if (maxLength <= 8) {
      return 3;
    }
    if (maxLength <= 12) {
      return 4;
    }
    return 5;
  }
  function createEngine(options) {
    var engineOptions = _typeof(options) === 'object' && options ? options : {};
    var fuzzyMaxDistanceOverride = Number.isFinite(engineOptions.fuzzyMaxDistance) ? Math.max(1, Math.floor(engineOptions.fuzzyMaxDistance)) : null;
    var fuzzyCache = typeof Map === 'function' ? new Map() : null;
    var getFuzzyDistance = function getFuzzyDistance(source, target) {
      if (!source || !target) {
        return Number.POSITIVE_INFINITY;
      }
      var shorter = source.length <= target.length ? source : target;
      var longer = source.length > target.length ? source : target;
      var cacheKey = "".concat(shorter, "\0").concat(longer);
      if (fuzzyCache && fuzzyCache.has(cacheKey)) {
        return fuzzyCache.get(cacheKey);
      }
      var sourceLength = source.length;
      var targetLength = target.length;
      var maxDistance = getAdaptiveFuzzyMaxDistance(source, target, fuzzyMaxDistanceOverride);
      if (Math.abs(sourceLength - targetLength) > maxDistance) {
        if (fuzzyCache) {
          fuzzyCache.set(cacheKey, Number.POSITIVE_INFINITY);
        }
        return Number.POSITIVE_INFINITY;
      }
      var previous = new Array(targetLength + 1);
      var current = new Array(targetLength + 1);
      for (var i = 0; i <= targetLength; i += 1) {
        previous[i] = i;
      }
      for (var _i = 1; _i <= sourceLength; _i += 1) {
        current[0] = _i;
        var bestInRow = current[0];
        var sourceChar = source.charAt(_i - 1);
        for (var j = 1; j <= targetLength; j += 1) {
          var cost = sourceChar === target.charAt(j - 1) ? 0 : 1;
          current[j] = Math.min(previous[j] + 1, current[j - 1] + 1, previous[j - 1] + cost);
          if (current[j] < bestInRow) {
            bestInRow = current[j];
          }
        }
        if (bestInRow > maxDistance) {
          if (fuzzyCache) {
            fuzzyCache.set(cacheKey, Number.POSITIVE_INFINITY);
          }
          return Number.POSITIVE_INFINITY;
        }
        for (var _j = 0; _j <= targetLength; _j += 1) {
          previous[_j] = current[_j];
        }
      }
      var result = previous[targetLength];
      if (fuzzyCache) {
        fuzzyCache.set(cacheKey, result);
      }
      return result;
    };
    var computeFuzzyTokenScore = function computeFuzzyTokenScore(token, entryToken) {
      if (!token || !entryToken) {
        return 0;
      }
      if (token.length <= 2 || entryToken.length <= 2) {
        return 0;
      }
      var distance = getFuzzyDistance(token, entryToken);
      var maxDistance = getAdaptiveFuzzyMaxDistance(token, entryToken, fuzzyMaxDistanceOverride);
      if (!Number.isFinite(distance) || distance > maxDistance) {
        return 0;
      }
      if (distance === 0) {
        return 3;
      }
      if (distance === 1) {
        return 2;
      }
      return 1;
    };
    var CACHE_SUPPORTS_MAP = typeof Map === 'function';
    var CACHE_LIMIT_KEY = 400;
    var CACHE_LIMIT_TOKENS = 250;
    var CACHE_KEY_MAX_LENGTH = 200;
    var CACHE_TOKENS_MAX_LENGTH = 200;
    var FREEZE_SUPPORT = typeof Object.freeze === 'function';
    var createCache = function createCache(limit) {
      if (CACHE_SUPPORTS_MAP) {
        var map = new Map();
        return {
          get: function get(key) {
            return map.has(key) ? map.get(key) : undefined;
          },
          set: function set(key, value) {
            if (map.has(key)) {
              map.set(key, value);
              return;
            }
            if (map.size >= limit) {
              var iterator = map.keys();
              var first = iterator && typeof iterator.next === 'function' ? iterator.next() : null;
              if (first && !first.done) {
                map.delete(first.value);
              }
            }
            map.set(key, value);
          }
        };
      }
      var entries = [];
      return {
        get: function get(key) {
          for (var index = 0; index < entries.length; index += 1) {
            var entry = entries[index];
            if (entry && entry[0] === key) {
              return entry[1];
            }
          }
          return undefined;
        },
        set: function set(key, value) {
          for (var index = 0; index < entries.length; index += 1) {
            if (entries[index] && entries[index][0] === key) {
              entries.splice(index, 1);
              break;
            }
          }
          entries.push([key, value]);
          if (entries.length > limit) {
            entries.shift();
          }
        }
      };
    };
    var freezeArray = function freezeArray(array) {
      if (!Array.isArray(array) || !FREEZE_SUPPORT) {
        return array;
      }
      try {
        return Object.freeze(array);
      } catch (error) {
        void error;
        return array;
      }
    };
    var keyCache = createCache(CACHE_LIMIT_KEY);
    var tokensCache = createCache(CACHE_LIMIT_TOKENS);
    var computeTokenMatchDetails = function computeTokenMatchDetails() {
      var entryTokens = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var queryTokens = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      if (!Array.isArray(entryTokens) || entryTokens.length === 0) {
        return {
          score: 0,
          matched: 0
        };
      }
      var validQueryTokens = Array.isArray(queryTokens) ? queryTokens.filter(Boolean) : [];
      if (validQueryTokens.length === 0) {
        return {
          score: 0,
          matched: 0
        };
      }
      var total = 0;
      var matched = 0;
      var _iterator = _createForOfIteratorHelper(validQueryTokens),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var token = _step.value;
          var best = 0;
          var _iterator2 = _createForOfIteratorHelper(entryTokens),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var entryToken = _step2.value;
              if (!entryToken) continue;
              if (entryToken === token) {
                best = 3;
                break;
              }
              if (entryToken.startsWith(token)) {
                best = Math.max(best, 2);
              } else if (token.startsWith(entryToken)) {
                best = Math.max(best, 1.5);
              } else if (entryToken.includes(token) || token.includes(entryToken)) {
                best = Math.max(best, 1);
              } else {
                var fuzzyScore = computeFuzzyTokenScore(token, entryToken);
                if (fuzzyScore > 0) {
                  best = Math.max(best, fuzzyScore);
                }
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
          if (best > 0) {
            matched += 1;
            total += best;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (matched === 0) {
        return {
          score: 0,
          matched: 0
        };
      }
      return {
        score: total,
        matched: matched
      };
    };
    var searchKey = function searchKey(value) {
      if (!value) {
        return '';
      }
      var str = String(value);
      var cacheable = str.length <= CACHE_KEY_MAX_LENGTH;
      if (cacheable) {
        var cached = keyCache.get(str);
        if (typeof cached !== 'undefined') {
          return cached;
        }
      }
      var normalized = str.toLowerCase();
      if (typeof normalized.normalize === 'function') {
        normalized = normalized.normalize('NFD');
      }
      normalized = normalized.replace(/[\u0300-\u036f]/g, '').replace(/ß/g, 'ss').replace(/æ/g, 'ae').replace(/œ/g, 'oe').replace(/ø/g, 'o').replace(/&/g, 'and').replace(/\+/g, 'plus').replace(/[°º˚]/g, 'deg').replace(/\bdegrees?\b/g, 'deg').replace(/[×✕✖✗✘]/g, 'x');
      normalized = normalizeUnicodeFractions(normalized);
      normalized = normalizeNumberWords(normalized);
      normalized = normalizeMeasurementUnits(normalized);
      normalized = normalizeSpellingVariants(normalized);
      normalized = normaliseMarkVariants(normalized);
      var simplified = normalized.replace(/[^a-z0-9]+/g, '');
      if (simplified) {
        if (cacheable) {
          keyCache.set(str, simplified);
        }
        return simplified;
      }
      var fallback = str.toLowerCase().replace(/\s+/g, '');
      if (cacheable) {
        keyCache.set(str, fallback);
      }
      return fallback;
    };
    var searchTokens = function searchTokens(value) {
      if (!value) {
        return [];
      }
      var str = String(value);
      var cacheable = str.length <= CACHE_TOKENS_MAX_LENGTH;
      if (cacheable) {
        var cached = tokensCache.get(str);
        if (typeof cached !== 'undefined') {
          return cached;
        }
      }
      var normalized = str.toLowerCase();
      if (typeof normalized.normalize === 'function') {
        normalized = normalized.normalize('NFD');
      }
      normalized = normalized.replace(/[\u0300-\u036f]/g, '').replace(/ß/g, 'ss').replace(/æ/g, 'ae').replace(/œ/g, 'oe').replace(/ø/g, 'o').replace(/&/g, ' and ').replace(/\+/g, ' plus ').replace(/[°º˚]/g, ' deg ').replace(/\bdegrees?\b/g, ' deg ').replace(/[×✕✖✗✘]/g, ' x by ');
      normalized = normalizeUnicodeFractions(normalized);
      normalized = normalizeMeasurementUnits(normalized);
      var numberNormalized = normalizeNumberWords(normalized);
      var measurementNormalized = normalizeMeasurementUnits(numberNormalized);
      var tokens = new Set();
      var initialWords = [];
      var addToken = function addToken(token) {
        if (!token) {
          return;
        }
        var cleaned = token.replace(/[^a-z0-9]+/g, '');
        if (cleaned) {
          tokens.add(cleaned);
        }
      };
      var isAlpha = function isAlpha(value) {
        return /^[a-z]+$/.test(value);
      };
      var isNumeric = function isNumeric(value) {
        return /^\d+$/.test(value);
      };
      var addAlphaNumericVariants = function addAlphaNumericVariants(segment) {
        if (!segment) {
          return;
        }
        var groups = segment.match(/[a-z]+|\d+/g);
        if (!groups || groups.length <= 1) {
          return;
        }
        groups.forEach(function (part) {
          if (isNumeric(part) || part.length > 1) {
            addToken(part);
          }
        });
        for (var index = 0; index < groups.length - 1; index += 1) {
          var current = groups[index];
          var next = groups[index + 1];
          if (!current || !next) continue;
          var combined = "".concat(current).concat(next);
          if (!combined || combined === segment) continue;
          if (isAlpha(current) && isNumeric(next) || isNumeric(current) && isAlpha(next) || current.length > 1 && next.length > 1) {
            addToken(combined);
          }
        }
      };
      var processParts = function processParts(strToProcess) {
        var collectInitials = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        strToProcess.split(/\s+/).forEach(function (part) {
          if (!part) return;
          addToken(part);
          part.split(/[^a-z0-9]+/).filter(Boolean).forEach(function (segment) {
            addToken(segment);
            addAlphaNumericVariants(segment);
            if (collectInitials && /^[a-z]/.test(segment)) {
              initialWords.push(segment);
            }
          });
        });
      };
      processParts(normalized, true);
      if (numberNormalized !== normalized) {
        processParts(numberNormalized);
      }
      if (measurementNormalized !== numberNormalized) {
        processParts(measurementNormalized);
      }
      var spellingNormalized = normalizeSpellingVariants(measurementNormalized);
      if (spellingNormalized !== measurementNormalized) {
        processParts(spellingNormalized);
      }
      var markNormalized = normaliseMarkVariants(spellingNormalized);
      if (markNormalized !== spellingNormalized) {
        processParts(markNormalized);
      }
      if (initialWords.length >= 2) {
        var MAX_INITIALISM_LENGTH = 6;
        var initials = initialWords.map(function (word) {
          return word[0];
        }).filter(Boolean);
        var limit = Math.min(initials.length, MAX_INITIALISM_LENGTH);
        for (var start = 0; start < limit; start += 1) {
          var currentInitial = '';
          for (var index = start; index < limit; index += 1) {
            currentInitial += initials[index];
            if (currentInitial.length >= 2) {
              addToken(currentInitial);
            }
          }
        }
      }
      var markPattern = /\b(mark|mk)[\s-]*(\d+|[ivxlcdm]+)\b/g;
      var match;
      var variantSource = spellingNormalized || normalized;
      while ((match = markPattern.exec(variantSource)) !== null) {
        var prefix = match[1];
        var rawValue = match[2];
        var _parseMarkSuffix2 = parseMarkSuffix(rawValue),
          cleaned = _parseMarkSuffix2.cleaned,
          number = _parseMarkSuffix2.number;
        if (!cleaned) {
          continue;
        }
        var altPrefix = prefix === 'mk' ? 'mark' : 'mk';
        addToken(prefix);
        addToken(altPrefix);
        addToken(cleaned);
        addToken("".concat(prefix).concat(cleaned));
        addToken("".concat(altPrefix).concat(cleaned));
        if (number != null) {
          var numberToken = String(number);
          addToken(numberToken);
          addToken("".concat(prefix).concat(numberToken));
          addToken("".concat(altPrefix).concat(numberToken));
        }
      }
      applySearchTokenSynonyms(tokens, addToken);
      var result = freezeArray(Array.from(tokens));
      if (cacheable) {
        tokensCache.set(str, result);
      }
      return result;
    };
    var findBestSearchMatch = function findBestSearchMatch(map, key) {
      var tokens = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      if (!map || typeof map.entries !== 'function') {
        return null;
      }
      var queryTokens = Array.isArray(tokens) ? tokens.filter(Boolean) : [];
      var hasKey = typeof key === 'string' && key.length > 0;
      if (!hasKey && queryTokens.length === 0) {
        return null;
      }
      var toResult = function toResult(entryKey, entryValue, matchType) {
        var score = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
        var matchedCount = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
        var extras = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
        return _objectSpread({
          key: entryKey,
          value: entryValue,
          matchType: matchType,
          score: score,
          matchedCount: matchedCount
        }, extras);
      };
      var flattened = [];
      var _iterator3 = _createForOfIteratorHelper(map.entries()),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _step3$value = _slicedToArray(_step3.value, 2),
            _entryKey = _step3$value[0],
            _entryValue2 = _step3$value[1];
          if (!_entryValue2) continue;
          if (Array.isArray(_entryValue2)) {
            var _iterator4 = _createForOfIteratorHelper(_entryValue2),
              _step4;
            try {
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                var value = _step4.value;
                if (value) {
                  flattened.push([_entryKey, value]);
                }
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }
          } else {
            flattened.push([_entryKey, _entryValue2]);
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      if (hasKey) {
        var exactCandidates = flattened.filter(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 1),
            entryKey = _ref2[0];
          return entryKey === key;
        });
        if (exactCandidates.length) {
          var _bestEntry;
          var bestEntry = exactCandidates[0][1];
          var bestDetails = queryTokens.length ? computeTokenMatchDetails(((_bestEntry = bestEntry) === null || _bestEntry === void 0 ? void 0 : _bestEntry.tokens) || [], queryTokens) : {
            score: Number.POSITIVE_INFINITY,
            matched: queryTokens.length
          };
          for (var index = 1; index < exactCandidates.length; index += 1) {
            var entryValue = exactCandidates[index][1];
            if (!queryTokens.length) {
              break;
            }
            var details = computeTokenMatchDetails((entryValue === null || entryValue === void 0 ? void 0 : entryValue.tokens) || [], queryTokens);
            if (details.score > bestDetails.score || details.score === bestDetails.score && details.matched > bestDetails.matched) {
              bestDetails = details;
              bestEntry = entryValue;
            }
          }
          return toResult(key, bestEntry, 'exactKey', bestDetails.score, bestDetails.matched);
        }
      }
      var bestTokenMatch = null;
      var bestTokenScore = 0;
      var bestTokenMatched = 0;
      var bestTokenKeyDistance = Number.POSITIVE_INFINITY;
      var bestPrefixMatch = null;
      var bestPrefixScore = 0;
      var bestPrefixMatched = 0;
      var bestPrefixLength = Number.POSITIVE_INFINITY;
      var bestSubsetMatch = null;
      var bestSubsetScore = 0;
      var bestSubsetMatched = 0;
      var bestSubsetLength = 0;
      var bestPartialMatch = null;
      var bestPartialScore = 0;
      var bestPartialMatched = 0;
      var bestFuzzyMatch = null;
      var bestFuzzyDistance = Number.POSITIVE_INFINITY;
      var bestFuzzyLength = Number.POSITIVE_INFINITY;
      var keyLength = hasKey ? key.length : 0;
      for (var _i2 = 0, _flattened = flattened; _i2 < _flattened.length; _i2++) {
        var _flattened$_i = _slicedToArray(_flattened[_i2], 2),
          entryKey = _flattened$_i[0],
          _entryValue = _flattened$_i[1];
        if (!_entryValue) continue;
        var entryTokens = (_entryValue === null || _entryValue === void 0 ? void 0 : _entryValue.tokens) || [];
        var tokenDetails = queryTokens.length ? computeTokenMatchDetails(entryTokens, queryTokens) : {
          score: 0,
          matched: 0
        };
        if (hasKey && entryKey.startsWith(key)) {
          var score = queryTokens.length > 0 ? tokenDetails.score : Number.POSITIVE_INFINITY;
          var candidate = toResult(entryKey, _entryValue, 'keyPrefix', score, tokenDetails.matched);
          if (!bestPrefixMatch || score > bestPrefixScore || score === bestPrefixScore && (tokenDetails.matched > bestPrefixMatched || tokenDetails.matched === bestPrefixMatched && entryKey.length < bestPrefixLength)) {
            bestPrefixMatch = candidate;
            bestPrefixScore = score;
            bestPrefixMatched = tokenDetails.matched;
            bestPrefixLength = entryKey.length;
          }
        }
        if (queryTokens.length) {
          var distance = hasKey ? Math.abs(entryKey.length - keyLength) : Number.POSITIVE_INFINITY;
          if (tokenDetails.score > bestTokenScore || tokenDetails.score === bestTokenScore && (tokenDetails.matched > bestTokenMatched || tokenDetails.matched === bestTokenMatched && distance < bestTokenKeyDistance)) {
            bestTokenMatch = toResult(entryKey, _entryValue, 'token', tokenDetails.score, tokenDetails.matched);
            bestTokenScore = tokenDetails.score;
            bestTokenMatched = tokenDetails.matched;
            bestTokenKeyDistance = distance;
          }
        }
        if (hasKey && key.startsWith(entryKey)) {
          var _score = queryTokens.length > 0 ? tokenDetails.score : Number.POSITIVE_INFINITY;
          var _candidate = toResult(entryKey, _entryValue, 'keySubset', _score, tokenDetails.matched);
          if (!bestSubsetMatch || _score > bestSubsetScore || _score === bestSubsetScore && (entryKey.length > bestSubsetLength || tokenDetails.matched > bestSubsetMatched)) {
            bestSubsetMatch = _candidate;
            bestSubsetScore = _score;
            bestSubsetMatched = tokenDetails.matched;
            bestSubsetLength = entryKey.length;
          }
        } else if (hasKey && (entryKey.includes(key) || key.includes(entryKey))) {
          var _candidate2 = toResult(entryKey, _entryValue, 'partial', tokenDetails.score, tokenDetails.matched);
          if (!bestPartialMatch || tokenDetails.score > bestPartialScore || tokenDetails.score === bestPartialScore && tokenDetails.matched > bestPartialMatched) {
            bestPartialMatch = _candidate2;
            bestPartialScore = tokenDetails.score;
            bestPartialMatched = tokenDetails.matched;
          }
        }
        if (hasKey && entryKey) {
          var fuzzyDistance = getFuzzyDistance(entryKey, key);
          var maxDistance = getAdaptiveFuzzyMaxDistance(entryKey, key, fuzzyMaxDistanceOverride);
          if (Number.isFinite(fuzzyDistance) && fuzzyDistance > 0 && fuzzyDistance <= maxDistance) {
            if (!bestFuzzyMatch || fuzzyDistance < bestFuzzyDistance || fuzzyDistance === bestFuzzyDistance && entryKey.length < bestFuzzyLength) {
              bestFuzzyMatch = toResult(entryKey, _entryValue, 'fuzzy', tokenDetails.score, tokenDetails.matched, {
                fuzzyDistance: fuzzyDistance
              });
              bestFuzzyDistance = fuzzyDistance;
              bestFuzzyLength = entryKey.length;
            }
          }
        }
      }
      if (bestTokenMatch && bestTokenScore > 0) {
        return bestTokenMatch;
      }
      if (bestPrefixMatch) {
        return bestPrefixMatch;
      }
      if (bestSubsetMatch) {
        return bestSubsetMatch;
      }
      if (bestPartialMatch) {
        return bestPartialMatch;
      }
      if (bestFuzzyMatch) {
        return bestFuzzyMatch;
      }
      return null;
    };
    return Object.freeze({
      searchKey: searchKey,
      searchTokens: searchTokens,
      computeTokenMatchDetails: computeTokenMatchDetails,
      findBestSearchMatch: findBestSearchMatch,
      getFuzzyDistance: getFuzzyDistance,
      computeFuzzyTokenScore: computeFuzzyTokenScore,
      parseMarkSuffix: parseMarkSuffix,
      normaliseMarkVariants: normaliseMarkVariants,
      normalizeUnicodeFractions: normalizeUnicodeFractions,
      normalizeNumberWords: normalizeNumberWords,
      normalizeMeasurementUnits: normalizeMeasurementUnits,
      normalizeSpellingVariants: normalizeSpellingVariants,
      applySearchTokenSynonyms: applySearchTokenSynonyms
    });
  }
  var engineApi = Object.freeze({
    FEATURE_SEARCH_FUZZY_MAX_DISTANCE: FEATURE_SEARCH_FUZZY_MAX_DISTANCE,
    createEngine: createEngine,
    parseMarkSuffix: parseMarkSuffix,
    normaliseMarkVariants: normaliseMarkVariants,
    normalizeUnicodeFractions: normalizeUnicodeFractions,
    normalizeNumberWords: normalizeNumberWords,
    normalizeMeasurementUnits: normalizeMeasurementUnits,
    normalizeSpellingVariants: normalizeSpellingVariants,
    applySearchTokenSynonyms: applySearchTokenSynonyms
  });
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module && typeof module.exports !== 'undefined') {
    module.exports = engineApi;
  }
  var MODULE_BASE = resolveModuleBase(GLOBAL_SCOPE);
  if (MODULE_BASE) {
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
    var MODULE_API = Object.freeze({
      FEATURE_SEARCH_FUZZY_MAX_DISTANCE: FEATURE_SEARCH_FUZZY_MAX_DISTANCE,
      createEngine: createEngine,
      parseMarkSuffix: parseMarkSuffix,
      normaliseMarkVariants: normaliseMarkVariants,
      normalizeUnicodeFractions: normalizeUnicodeFractions,
      normalizeNumberWords: normalizeNumberWords,
      normalizeMeasurementUnits: normalizeMeasurementUnits,
      normalizeSpellingVariants: normalizeSpellingVariants,
      applySearchTokenSynonyms: applySearchTokenSynonyms
    });
    MODULE_BASE.registerOrQueueModule('cine.features.featureSearchEngine', MODULE_API, {
      category: 'features',
      description: 'Search engine utilities for normalising values, tokenising queries and ranking feature results.',
      replace: true,
      connections: ['cineModuleBase', 'cineModuleContext']
    }, function (error) {
      return safeWarn('Unable to register cine.features.featureSearchEngine module.', error);
    }, GLOBAL_SCOPE, MODULE_BASE.getModuleRegistry && MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE));
    if (typeof MODULE_BASE.exposeGlobal === 'function') {
      MODULE_BASE.exposeGlobal('cineFeaturesFeatureSearchEngine', MODULE_API, GLOBAL_SCOPE, {
        configurable: true,
        enumerable: false,
        writable: false
      });
    } else {
      try {
        GLOBAL_SCOPE.cineFeaturesFeatureSearchEngine = MODULE_API;
      } catch (error) {
        void error;
      }
    }
  } else if (GLOBAL_SCOPE && !GLOBAL_SCOPE.cineFeaturesFeatureSearchEngine) {
    try {
      GLOBAL_SCOPE.cineFeaturesFeatureSearchEngine = engineApi;
    } catch (error) {
      void error;
    }
  }
})();