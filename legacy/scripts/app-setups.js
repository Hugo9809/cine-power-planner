function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toArray(r) { return _arrayWithHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var AUTO_GEAR_ANY_MOTOR_TOKEN_FALLBACK = typeof globalThis !== 'undefined' && globalThis.AUTO_GEAR_ANY_MOTOR_TOKEN ? globalThis.AUTO_GEAR_ANY_MOTOR_TOKEN : '__any__';
var CAMERA_LINK_LETTERS = ['A', 'B', 'C', 'D', 'E'];
var CAMERA_COLOR_STORAGE_KEY = 'cameraPowerPlanner_cameraColors';
var PRODUCTION_COMPANY_FIELD_ORDER = ['productionCompanyAddress', 'productionCompanyStreet', 'productionCompanyStreet2', 'productionCompanyCity', 'productionCompanyRegion', 'productionCompanyPostalCode', 'productionCompanyCountry'];
var LEGACY_PROJECT_FIELD_LABELS = {
  productionCompany: ['Production Company', 'Produktionsfirma', 'Société de production', 'Productora', 'Casa di produzione'],
  productionCompanyAddress: ['Production Company Address', 'Adresse der Produktionsfirma', 'Adresse de la société de production', 'Dirección de la productora', 'Indirizzo della casa di produzione'],
  productionCompanyStreet: ['Street address', 'Straße und Hausnummer', 'Adresse', 'Dirección', 'Indirizzo'],
  productionCompanyStreet2: ['Address line 2', 'Adresszusatz', "Complément d'adresse", 'Línea 2 de dirección', 'Seconda linea indirizzo'],
  productionCompanyCity: ['City', 'Stadt', 'Ville', 'Ciudad', 'Città'],
  productionCompanyRegion: ['State / Province / Region', 'Bundesland / Region', 'État / Région / Département', 'Estado / Provincia / Región', 'Regione / Provincia / Stato'],
  productionCompanyPostalCode: ['Postal code', 'Postleitzahl', 'Code postal', 'Código postal', 'CAP'],
  productionCompanyCountry: ['Country', 'Land', 'Pays', 'País', 'Paese']
};
function normalizeProjectFieldLabel(label) {
  if (typeof label !== 'string') {
    return '';
  }
  return label.trim().replace(/[:：]\s*$/, '').trim();
}
function getProductionCompanyLabelSets(projectLabels) {
  var textsObj = typeof texts !== 'undefined' ? texts : null;
  var labelSets = {};
  var fallbackProjectLabels = textsObj && textsObj.en && textsObj.en.projectFields || {};
  var allKeys = ['productionCompany'].concat(PRODUCTION_COMPANY_FIELD_ORDER);
  allKeys.forEach(function (key) {
    var set = new Set();
    var addLabel = function addLabel(value) {
      if (typeof value !== 'string') return;
      var normalized = normalizeProjectFieldLabel(value);
      if (normalized) {
        set.add(normalized);
      }
    };
    if (projectLabels && projectLabels[key]) {
      addLabel(projectLabels[key]);
    }
    if (fallbackProjectLabels && fallbackProjectLabels[key]) {
      addLabel(fallbackProjectLabels[key]);
    }
    var legacyLabels = LEGACY_PROJECT_FIELD_LABELS[key];
    if (Array.isArray(legacyLabels)) {
      legacyLabels.forEach(addLabel);
    }
    labelSets[key] = set;
  });
  return labelSets;
}
function getProjectInfoFieldLines(source, fieldKey) {
  if (!source || _typeof(source) !== 'object') {
    return [];
  }
  var rawValue = source[fieldKey];
  if (rawValue === null || rawValue === undefined) {
    return [];
  }
  if (Array.isArray(rawValue)) {
    var parts = [];
    rawValue.forEach(function (item) {
      if (item === null || item === undefined) return;
      var str = typeof item === 'string' ? item : String(item);
      str.split(/\r?\n/).forEach(function (segment) {
        var trimmed = segment.trim();
        if (trimmed) {
          parts.push(trimmed);
        }
      });
    });
    return parts;
  }
  if (typeof rawValue === 'string') {
    return rawValue.split(/\r?\n/).map(function (segment) {
      return segment.trim();
    }).filter(function (segment) {
      return segment;
    });
  }
  return [String(rawValue)].map(function (segment) {
    return segment.trim();
  }).filter(function (segment) {
    return segment;
  });
}
function buildCombinedProductionCompanyDisplay(sourceInfo, projectLabels) {
  var htmlLines = [];
  var textLines = [];
  var addLine = function addLine(value, className) {
    if (typeof value !== 'string') return;
    var trimmed = value.trim();
    if (!trimmed) return;
    var safe = escapeHtml(trimmed);
    htmlLines.push(className ? "<span class=\"".concat(className, "\">").concat(safe, "</span>") : safe);
    textLines.push(trimmed);
  };
  var textsObj = typeof texts !== 'undefined' ? texts : null;
  var addSection = function addSection(fieldKey, lines) {
    var labelClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'req-sub-label';
    if (!Array.isArray(lines) || !lines.length) return;
    var label = projectLabels && projectLabels[fieldKey] || textsObj && textsObj.en && textsObj.en.projectFields && textsObj.en.projectFields[fieldKey] || fieldKey;
    addLine(label, labelClass);
    lines.forEach(function (line) {
      return addLine(line, 'req-sub-line');
    });
  };
  var companyLines = getProjectInfoFieldLines(sourceInfo, 'productionCompany');
  companyLines.forEach(function (line) {
    return addLine(line, 'req-primary-line');
  });
  var addressLines = getProjectInfoFieldLines(sourceInfo, 'productionCompanyAddress');
  if (addressLines.length) {
    addSection('productionCompanyAddress', addressLines);
  }
  var streetLines = getProjectInfoFieldLines(sourceInfo, 'productionCompanyStreet').concat(getProjectInfoFieldLines(sourceInfo, 'productionCompanyStreet2'));
  if (streetLines.length) {
    addSection('productionCompanyStreet', streetLines);
  }
  addSection('productionCompanyCity', getProjectInfoFieldLines(sourceInfo, 'productionCompanyCity'));
  addSection('productionCompanyRegion', getProjectInfoFieldLines(sourceInfo, 'productionCompanyRegion'));
  addSection('productionCompanyPostalCode', getProjectInfoFieldLines(sourceInfo, 'productionCompanyPostalCode'));
  addSection('productionCompanyCountry', getProjectInfoFieldLines(sourceInfo, 'productionCompanyCountry'));
  if (!htmlLines.length) {
    return null;
  }
  return {
    __html: htmlLines.join('<br>'),
    text: textLines.join('\n')
  };
}
function applyCombinedProductionCompanyDisplay(targetInfo, sourceInfo, projectLabels) {
  if (!targetInfo || _typeof(targetInfo) !== 'object') {
    return false;
  }
  var source = sourceInfo && _typeof(sourceInfo) === 'object' ? sourceInfo : targetInfo;
  var combined = buildCombinedProductionCompanyDisplay(source, projectLabels);
  if (!combined) {
    return false;
  }
  targetInfo.productionCompany = combined;
  PRODUCTION_COMPANY_FIELD_ORDER.forEach(function (key) {
    if (Object.prototype.hasOwnProperty.call(targetInfo, key)) {
      delete targetInfo[key];
    }
  });
  return true;
}
function expandCombinedProductionCompanyInfo(rawText, projectLabels) {
  if (typeof rawText !== 'string') {
    return null;
  }
  var normalizedText = rawText.replace(/\r\n?/g, '\n').split('\n').map(function (segment) {
    return segment.trim();
  }).filter(function (segment) {
    return segment;
  });
  if (!normalizedText.length) {
    return null;
  }
  var labelSets = getProductionCompanyLabelSets(projectLabels);
  var result = {};
  var _normalizedText = _toArray(normalizedText),
    firstLine = _normalizedText[0],
    rest = _normalizedText.slice(1);
  if (firstLine) {
    result.productionCompany = firstLine;
  }
  var collected = {};
  var activeField = null;
  rest.forEach(function (line) {
    var normalizedLine = normalizeProjectFieldLabel(line);
    var matchedField = null;
    PRODUCTION_COMPANY_FIELD_ORDER.forEach(function (field) {
      if (matchedField || !labelSets[field]) return;
      if (labelSets[field].has(normalizedLine)) {
        matchedField = field;
      }
    });
    if (matchedField) {
      activeField = matchedField;
      if (!collected[activeField]) {
        collected[activeField] = [];
      }
      return;
    }
    if (!activeField) {
      if (result.productionCompany) {
        result.productionCompany += "\n".concat(line);
      } else {
        result.productionCompany = line;
      }
      return;
    }
    if (!collected[activeField]) {
      collected[activeField] = [];
    }
    collected[activeField].push(line);
  });
  if (collected.productionCompanyAddress && collected.productionCompanyAddress.length) {
    result.productionCompanyAddress = collected.productionCompanyAddress.join('\n');
  }
  if (collected.productionCompanyStreet && collected.productionCompanyStreet.length) {
    var streetParts = collected.productionCompanyStreet;
    result.productionCompanyStreet = streetParts[0];
    if (streetParts.length > 1) {
      result.productionCompanyStreet2 = streetParts.slice(1).join('\n');
    }
  }
  if (collected.productionCompanyCity && collected.productionCompanyCity.length) {
    result.productionCompanyCity = collected.productionCompanyCity.join(' ');
  }
  if (collected.productionCompanyRegion && collected.productionCompanyRegion.length) {
    result.productionCompanyRegion = collected.productionCompanyRegion.join(' ');
  }
  if (collected.productionCompanyPostalCode && collected.productionCompanyPostalCode.length) {
    result.productionCompanyPostalCode = collected.productionCompanyPostalCode.join(' ');
  }
  if (collected.productionCompanyCountry && collected.productionCompanyCountry.length) {
    result.productionCompanyCountry = collected.productionCompanyCountry.join(' ');
  }
  return result;
}
var EXTRA_GEAR_CATEGORY_KEY = 'temporary-extras';
var projectPersistenceSuspendedCount = 0;
var PROJECT_FORM_FREEZE = typeof Object.freeze === 'function' ? Object.freeze : function (value) {
  return value;
};
var projectFormDataCache = null;
var projectFormDataCacheDirty = true;
var lensSelectionManager = function () {
  var doc = typeof document !== 'undefined' ? document : null;
  var stub = {
    snapshot: function snapshot() {
      return {
        names: [],
        lensSelections: [],
        legacyValue: ''
      };
    },
    applyInfo: function applyInfo() {},
    refreshCatalog: function refreshCatalog() {},
    getSelections: function getSelections() {
      return [];
    }
  };
  if (!doc) {
    return stub;
  }
  var manufacturerSelect = doc.getElementById('lensManufacturer');
  var seriesSelect = doc.getElementById('lensSeries');
  var manufacturerStep = doc.getElementById('lensManufacturerStep');
  var seriesStep = doc.getElementById('lensSeriesStep');
  var optionsStep = doc.getElementById('lensOptionsStep');
  var optionsContainer = doc.getElementById('lensOptions');
  var optionsEmptyMessage = doc.getElementById('lensOptionsEmpty');
  var seriesEmptyMessage = doc.getElementById('lensSeriesEmpty');
  var selectionChips = doc.getElementById('lensSelectionChips');
  var hiddenLegacyValue = doc.getElementById('lensSelectionsValue');
  var hiddenDetailedValue = doc.getElementById('lensSelectionsData');
  var legacySelect = doc.getElementById('lenses');
  var manufacturerPlaceholder = doc.getElementById('lensManufacturerPlaceholder');
  var seriesPlaceholder = doc.getElementById('lensSeriesPlaceholder');
  if (!manufacturerSelect || !seriesSelect || !optionsContainer || !selectionChips || !hiddenLegacyValue || !hiddenDetailedValue || !legacySelect) {
    return stub;
  }
  var REMOVE_TEMPLATE_ATTR = 'data-remove-template';
  var MOUNT_LABEL_ATTR = 'data-mount-label';
  var STEP_DISABLED_CLASS = 'lens-step-disabled';
  var IGNORED_MOUNT_TOKENS = new Set(['LDS']);
  var MOUNT_TOKEN_MAP = new Map([['B4', 'B4'], ['DJI DL', 'DJI DL'], ['DJI DL-S', 'DJI DL-S'], ['DL', 'DJI DL'], ['E', 'E-mount'], ['E-mount', 'E-mount'], ['Sony E', 'E-mount'], ['EF', 'EF'], ['F', 'F'], ['Hasselblad', 'Hasselblad'], ['L', 'L-Mount'], ['L-Mount', 'L-Mount'], ['Leica L', 'L-Mount'], ['Leica M', 'Leica M'], ['Leitz M Mount for ARRI', 'Leica M'], ['M', 'Leica M'], ['MFT', 'MFT'], ['PL', 'PL'], ['PV', 'PV'], ['PV70', 'PV70'], ['RF', 'RF'], ['X', 'X-mount'], ['X-mount', 'X-mount'], ['XPL52', 'XPL52'], ['Z', 'Z-mount'], ['Z-mount', 'Z-mount']]);
  var sortComparator = typeof localeSort === 'function' ? localeSort : undefined;
  var state = {
    manufacturer: '',
    series: '',
    selections: []
  };
  var catalog = {
    manufacturers: new Map(),
    lensIndex: new Map()
  };
  var mountOptions = [];
  var optionInputs = new Map();
  var placeholderToggle = function placeholderToggle(select, isEmpty) {
    if (!select) return;
    if (isEmpty) {
      select.classList.add('select-placeholder');
    } else {
      select.classList.remove('select-placeholder');
    }
  };
  var escapeRegExp = function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };
  var stripPrefix = function stripPrefix(text, prefix) {
    if (!text || !prefix) return text;
    var pattern = new RegExp("^".concat(escapeRegExp(prefix), "\\s+"), 'i');
    return text.replace(pattern, '').trim();
  };
  var isSpecToken = function isSpecToken(token) {
    if (!token) return false;
    var value = token.trim();
    if (!value) return false;
    if (/^T\d+/i.test(value)) return true;
    if (/^f\//i.test(value)) return true;
    if (/\d/.test(value)) {
      if (/(?:mm|cm|m|°|ft)$/i.test(value)) return true;
      if (/^\d+(?:\.\d+)?x$/i.test(value)) return true;
      if (/^\d+-\d+/.test(value)) return true;
    }
    return false;
  };
  var deriveManufacturer = function deriveManufacturer(lensData, lensName) {
    if (lensData && typeof lensData.brand === 'string' && lensData.brand.trim()) {
      return lensData.brand.trim();
    }
    var firstToken = typeof lensName === 'string' ? lensName.trim().split(/\s+/)[0] : '';
    return firstToken || 'Other';
  };
  var deriveSeriesName = function deriveSeriesName(lensName, manufacturer) {
    if (typeof lensName !== 'string' || !lensName.trim()) {
      return 'General';
    }
    var remainder = lensName.trim();
    if (manufacturer && remainder.toLowerCase().startsWith(manufacturer.toLowerCase())) {
      remainder = remainder.slice(manufacturer.length).trim();
    }
    if (!remainder) return 'General';
    var tokens = remainder.split(/\s+/);
    var seriesTokens = [];
    for (var index = 0; index < tokens.length; index += 1) {
      var token = tokens[index];
      if (isSpecToken(token)) {
        break;
      }
      seriesTokens.push(token);
    }
    var series = seriesTokens.join(' ').trim();
    return series || 'General';
  };
  var extractMountLabels = function extractMountLabels(rawValue) {
    var labels = [];
    var seen = new Set();
    var addLabel = function addLabel(label) {
      if (!label || seen.has(label)) return;
      seen.add(label);
      labels.push(label);
    };
    var processString = function processString(value) {
      if (!value || typeof value !== 'string') return;
      var sanitized = value.replace(/\([^)]*\)/g, ' ').replace(/ or /gi, '/').replace(/\\/g, '/');
      sanitized.split('/').forEach(function (segment) {
        segment.split(',').forEach(function (part) {
          var token = part.trim();
          if (!token || IGNORED_MOUNT_TOKENS.has(token)) {
            return;
          }
          var mapped = MOUNT_TOKEN_MAP.has(token) ? MOUNT_TOKEN_MAP.get(token) : token;
          if (mapped) addLabel(mapped);
        });
      });
    };
    if (Array.isArray(rawValue)) {
      rawValue.forEach(function (value) {
        return processString(value);
      });
    } else {
      processString(rawValue);
    }
    return labels;
  };
  var resolveLensDataset = function resolveLensDataset() {
    var primary = (typeof devices === "undefined" ? "undefined" : _typeof(devices)) === 'object' && devices && devices.lenses && Object.keys(devices.lenses).length ? devices.lenses : null;
    if (primary) return primary;
    if ((typeof devices === "undefined" ? "undefined" : _typeof(devices)) === 'object' && devices && devices.accessories && devices.accessories.lenses) {
      return devices.accessories.lenses;
    }
    return {};
  };
  var buildCatalog = function buildCatalog() {
    var lensDb = resolveLensDataset();
    var manufacturerMap = new Map();
    var lensIndex = new Map();
    var mountSet = new Set();
    var lensNames = Object.keys(lensDb || {});
    if (lensNames.length && sortComparator) {
      lensNames.sort(sortComparator);
    } else {
      lensNames.sort();
    }
    lensNames.forEach(function (name) {
      var lensData = lensDb[name] || {};
      var manufacturer = deriveManufacturer(lensData, name);
      var series = deriveSeriesName(name, manufacturer);
      var focalLabel = stripPrefix(stripPrefix(name, manufacturer), series);
      var mountLabels = extractMountLabels(lensData.mount);
      mountLabels.forEach(function (label) {
        return mountSet.add(label);
      });
      var record = {
        name: name,
        data: lensData,
        manufacturer: manufacturer,
        series: series,
        displayName: name,
        focalLabel: focalLabel,
        mountLabels: mountLabels,
        optionMeta: mountLabels[0] ? "Mount: ".concat(mountLabels[0]) : ''
      };
      if (!manufacturerMap.has(manufacturer)) {
        manufacturerMap.set(manufacturer, new Map());
      }
      var seriesMap = manufacturerMap.get(manufacturer);
      if (!seriesMap.has(series)) {
        seriesMap.set(series, []);
      }
      seriesMap.get(series).push(record);
      lensIndex.set(name, record);
    });
    manufacturerMap.forEach(function (seriesMap) {
      seriesMap.forEach(function (list) {
        if (list.length && sortComparator) {
          list.sort(function (a, b) {
            return sortComparator(a.displayName, b.displayName);
          });
        } else {
          list.sort(function (a, b) {
            return a.displayName.localeCompare(b.displayName);
          });
        }
      });
    });
    var ensuredMounts = new Set(mountSet);
    ['PL', 'EF', 'LPL', 'E-mount'].forEach(function (label) {
      return ensuredMounts.add(label);
    });
    var sortedMounts = Array.from(ensuredMounts);
    var mountPriority = new Map([['PL', 0], ['EF', 1], ['LPL', 2], ['E-mount', 3]]);
    sortedMounts.sort(function (a, b) {
      var rankA = mountPriority.has(a) ? mountPriority.get(a) : 100;
      var rankB = mountPriority.has(b) ? mountPriority.get(b) : 100;
      if (rankA !== rankB) return rankA - rankB;
      if (sortComparator) {
        return sortComparator(a, b);
      }
      return a.localeCompare(b);
    });
    mountOptions = sortedMounts;
    return {
      manufacturers: manufacturerMap,
      lensIndex: lensIndex
    };
  };
  var getMountLabelFromCameraEntry = function getMountLabelFromCameraEntry(entry) {
    if (!entry || typeof entry.type !== 'string') return '';
    var labels = extractMountLabels(entry.type);
    return labels[0] || '';
  };
  var getCameraNativeMount = function getCameraNativeMount() {
    var cameraElement = doc.getElementById('cameraSelect');
    var cameraName = cameraElement && typeof cameraElement.value === 'string' ? cameraElement.value : '';
    if (!cameraName || (typeof devices === "undefined" ? "undefined" : _typeof(devices)) !== 'object' || !devices || !devices.cameras) {
      return '';
    }
    var camera = devices.cameras[cameraName];
    if (!camera || !Array.isArray(camera.lensMount)) return '';
    for (var index = 0; index < camera.lensMount.length; index += 1) {
      var entry = camera.lensMount[index];
      if (!entry) continue;
      var normalizedType = getMountLabelFromCameraEntry(entry);
      if (normalizedType && String(entry.mount || '').toLowerCase() === 'native') {
        return normalizedType;
      }
    }
    for (var _index = 0; _index < camera.lensMount.length; _index += 1) {
      var _entry = camera.lensMount[_index];
      var _normalizedType = getMountLabelFromCameraEntry(_entry);
      if (_normalizedType) return _normalizedType;
    }
    return '';
  };
  var buildMountOptionsForSelection = function buildMountOptionsForSelection(currentMount, lensName) {
    var options = [];
    var seen = new Set();
    var addOption = function addOption(label) {
      if (!label) return;
      var normalized = label.trim();
      if (!normalized || seen.has(normalized)) return;
      seen.add(normalized);
      options.push(normalized);
    };
    var lensRecord = catalog.lensIndex.get(lensName);
    if (lensRecord && Array.isArray(lensRecord.mountLabels) && lensRecord.mountLabels.length) {
      lensRecord.mountLabels.forEach(addOption);
    } else {
      mountOptions.forEach(addOption);
    }
    var normalizedCurrent = typeof currentMount === 'string' ? currentMount.trim() : '';
    var hasCurrent = normalizedCurrent && seen.has(normalizedCurrent);
    return {
      options: options,
      hiddenValue: hasCurrent ? '' : normalizedCurrent
    };
  };
  var resolveDefaultMount = function resolveDefaultMount(lensName) {
    var cameraMount = getCameraNativeMount();
    if (cameraMount) {
      return cameraMount;
    }
    var lensRecord = catalog.lensIndex.get(lensName);
    if (lensRecord && lensRecord.mountLabels && lensRecord.mountLabels.length) {
      return lensRecord.mountLabels[0];
    }
    if (mountOptions.includes('PL')) return 'PL';
    if (mountOptions.includes('EF')) return 'EF';
    if (mountOptions.includes('LPL')) return 'LPL';
    return mountOptions[0] || '';
  };
  var normalizeSelectionName = function normalizeSelectionName(value) {
    if (typeof value !== 'string') return '';
    return value.trim();
  };
  var updateStepState = function updateStepState() {
    var hasManufacturer = Boolean(state.manufacturer);
    var hasSeries = Boolean(state.series);
    if (manufacturerStep) {
      manufacturerStep.classList.toggle(STEP_DISABLED_CLASS, false);
    }
    if (seriesStep) {
      seriesStep.classList.toggle(STEP_DISABLED_CLASS, !hasManufacturer);
      seriesStep.setAttribute('aria-disabled', hasManufacturer ? 'false' : 'true');
    }
    if (optionsStep) {
      optionsStep.classList.toggle(STEP_DISABLED_CLASS, !hasSeries);
      optionsStep.setAttribute('aria-disabled', hasSeries ? 'false' : 'true');
    }
    seriesSelect.disabled = !hasManufacturer;
    placeholderToggle(seriesSelect, !state.series);
    placeholderToggle(manufacturerSelect, !state.manufacturer);
  };
  var syncLegacySelect = function syncLegacySelect() {
    var names = new Set(state.selections.map(function (selection) {
      return selection.name;
    }));
    Array.from(legacySelect.options || []).forEach(function (option) {
      if (!option || typeof option.value !== 'string') return;
      option.selected = names.has(option.value);
    });
  };
  var updateHiddenInputs = function updateHiddenInputs() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$skipEvent = _ref.skipEvent,
      skipEvent = _ref$skipEvent === void 0 ? false : _ref$skipEvent,
      _ref$skipDirty = _ref.skipDirty,
      skipDirty = _ref$skipDirty === void 0 ? false : _ref$skipDirty;
    var names = state.selections.map(function (selection) {
      return selection.name;
    });
    var legacyValue = names.join(', ');
    var detailedValue = JSON.stringify(state.selections.map(function (selection) {
      return {
        name: selection.name,
        mount: selection.mount || ''
      };
    }));
    var legacyChanged = hiddenLegacyValue.value !== legacyValue;
    var detailedChanged = hiddenDetailedValue.value !== detailedValue;
    if (legacyChanged) hiddenLegacyValue.value = legacyValue;
    if (detailedChanged) hiddenDetailedValue.value = detailedValue;
    if (!skipEvent && (legacyChanged || detailedChanged)) {
      try {
        hiddenLegacyValue.dispatchEvent(new Event('change', {
          bubbles: true
        }));
        hiddenDetailedValue.dispatchEvent(new Event('change', {
          bubbles: true
        }));
      } catch (eventError) {
        void eventError;
      }
    }
    if (!skipDirty && (legacyChanged || detailedChanged)) {
      try {
        markProjectFormDataDirty();
      } catch (markError) {
        void markError;
      }
    }
    syncLegacySelect();
  };
  var renderSelectionChips = function renderSelectionChips() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref2$skipEvent = _ref2.skipEvent,
      skipEvent = _ref2$skipEvent === void 0 ? false : _ref2$skipEvent,
      _ref2$skipDirty = _ref2.skipDirty,
      skipDirty = _ref2$skipDirty === void 0 ? false : _ref2$skipDirty;
    selectionChips.innerHTML = '';
    if (!state.selections.length) {
      updateHiddenInputs({
        skipEvent: skipEvent,
        skipDirty: skipDirty
      });
      return;
    }
    var removeTemplate = selectionChips.getAttribute(REMOVE_TEMPLATE_ATTR) || '';
    var mountLabel = selectionChips.getAttribute(MOUNT_LABEL_ATTR) || 'Mount';
    state.selections.forEach(function (selection, index) {
      var lensRecord = catalog.lensIndex.get(selection.name);
      var displayName = lensRecord ? lensRecord.displayName : selection.name;
      var focalLabel = lensRecord && lensRecord.focalLabel ? lensRecord.focalLabel : '';
      var chip = doc.createElement('div');
      chip.className = 'lens-chip';
      chip.setAttribute('role', 'listitem');
      var labelContainer = doc.createElement('div');
      labelContainer.className = 'lens-chip-label';
      var nameSpan = doc.createElement('span');
      nameSpan.className = 'lens-chip-name';
      nameSpan.textContent = displayName;
      labelContainer.appendChild(nameSpan);
      if (focalLabel) {
        var focalSpan = doc.createElement('span');
        focalSpan.className = 'lens-chip-focal';
        focalSpan.textContent = focalLabel;
        labelContainer.appendChild(focalSpan);
      }
      chip.appendChild(labelContainer);
      var mountId = "lensMount-".concat(index);
      var mountWrapper = doc.createElement('div');
      var mountLabelElem = doc.createElement('label');
      mountLabelElem.className = 'visually-hidden';
      mountLabelElem.setAttribute('for', mountId);
      mountLabelElem.textContent = "".concat(mountLabel, ": ").concat(displayName);
      mountWrapper.appendChild(mountLabelElem);
      var mountSelect = doc.createElement('select');
      mountSelect.id = mountId;
      mountSelect.dataset.lensName = selection.name;
      var storedMount = typeof selection.mount === 'string' ? selection.mount.trim() : '';
      if (selection.mount !== storedMount) {
        selection.mount = storedMount;
      }
      var _buildMountOptionsFor = buildMountOptionsForSelection(storedMount, selection.name),
        mountOptionsForSelect = _buildMountOptionsFor.options,
        hiddenValue = _buildMountOptionsFor.hiddenValue;
      mountOptionsForSelect.forEach(function (label) {
        var option = doc.createElement('option');
        option.value = label;
        option.textContent = label;
        if (storedMount === label) {
          option.selected = true;
        }
        mountSelect.appendChild(option);
      });
      if (hiddenValue) {
        var storedOption = doc.createElement('option');
        storedOption.value = hiddenValue;
        storedOption.textContent = hiddenValue;
        storedOption.hidden = true;
        storedOption.disabled = true;
        mountSelect.appendChild(storedOption);
      }
      if (storedMount) {
        mountSelect.value = storedMount;
      }
      if (!storedMount && mountOptionsForSelect.length) {
        mountSelect.value = mountOptionsForSelect[0];
        selection.mount = mountSelect.value;
      }
      mountSelect.setAttribute('aria-label', "".concat(mountLabel, ": ").concat(displayName));
      mountSelect.addEventListener('change', function (event) {
        var lensName = event.target.dataset.lensName;
        var newMount = typeof event.target.value === 'string' ? event.target.value : '';
        var record = state.selections.find(function (sel) {
          return sel.name === lensName;
        });
        if (!record || record.mount === newMount) {
          return;
        }
        record.mount = newMount;
        updateHiddenInputs();
      });
      mountWrapper.appendChild(mountSelect);
      chip.appendChild(mountWrapper);
      var removeBtn = doc.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'lens-chip-remove';
      removeBtn.dataset.lensName = selection.name;
      var removeLabel = removeTemplate.includes('{lens}') ? removeTemplate.replace('{lens}', displayName) : removeTemplate || displayName;
      removeBtn.setAttribute('aria-label', removeLabel);
      removeBtn.setAttribute('title', removeLabel);
      if (typeof iconMarkup === 'function' && (typeof ICON_GLYPHS === "undefined" ? "undefined" : _typeof(ICON_GLYPHS)) === 'object' && ICON_GLYPHS && ICON_GLYPHS.circleX) {
        removeBtn.innerHTML = iconMarkup(ICON_GLYPHS.circleX, 'btn-icon');
      } else {
        removeBtn.textContent = '×';
      }
      removeBtn.addEventListener('click', function () {
        removeSelection(selection.name, {
          focus: true
        });
      });
      chip.appendChild(removeBtn);
      selectionChips.appendChild(chip);
    });
    updateHiddenInputs({
      skipEvent: skipEvent,
      skipDirty: skipDirty
    });
  };
  var renderLensOptions = function renderLensOptions() {
    optionsContainer.innerHTML = '';
    optionInputs.clear();
    if (!state.series) {
      if (optionsEmptyMessage) optionsEmptyMessage.hidden = true;
      return;
    }
    var manufacturerMap = catalog.manufacturers.get(state.manufacturer);
    var lensList = manufacturerMap ? manufacturerMap.get(state.series) : null;
    if (!lensList || !lensList.length) {
      if (optionsEmptyMessage) optionsEmptyMessage.hidden = false;
      return;
    }
    if (optionsEmptyMessage) optionsEmptyMessage.hidden = true;
    lensList.forEach(function (lens, index) {
      var wrapper = doc.createElement('div');
      wrapper.className = 'lens-option';
      var optionId = "lensOption-".concat(index);
      var checkbox = doc.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = optionId;
      checkbox.dataset.lensName = lens.name;
      checkbox.checked = state.selections.some(function (sel) {
        return sel.name === lens.name;
      });
      checkbox.addEventListener('change', function (event) {
        var checked = Boolean(event.target.checked);
        handleLensToggle(lens.name, checked);
      });
      wrapper.appendChild(checkbox);
      var label = doc.createElement('label');
      label.className = 'lens-option-label';
      label.setAttribute('for', optionId);
      var nameSpan = doc.createElement('span');
      nameSpan.className = 'lens-option-name';
      nameSpan.textContent = lens.displayName;
      label.appendChild(nameSpan);
      if (lens.optionMeta) {
        var metaSpan = doc.createElement('span');
        metaSpan.className = 'lens-option-meta';
        metaSpan.textContent = lens.optionMeta;
        label.appendChild(metaSpan);
      }
      wrapper.appendChild(label);
      optionsContainer.appendChild(wrapper);
      optionInputs.set(lens.name, checkbox);
    });
  };
  var renderSeries = function renderSeries() {
    seriesSelect.innerHTML = '';
    seriesSelect.appendChild(seriesPlaceholder);
    var manufacturerMap = state.manufacturer ? catalog.manufacturers.get(state.manufacturer) : null;
    if (!manufacturerMap || manufacturerMap.size === 0) {
      state.series = '';
      if (seriesEmptyMessage) seriesEmptyMessage.hidden = Boolean(!state.manufacturer);
      if (optionsEmptyMessage) optionsEmptyMessage.hidden = true;
      seriesPlaceholder.selected = true;
      updateStepState();
      return;
    }
    var seriesNames = Array.from(manufacturerMap.keys());
    if (!seriesNames.length) {
      state.series = '';
      if (seriesEmptyMessage) seriesEmptyMessage.hidden = false;
      if (optionsEmptyMessage) optionsEmptyMessage.hidden = true;
      seriesPlaceholder.selected = true;
      updateStepState();
      return;
    }
    if (seriesEmptyMessage) seriesEmptyMessage.hidden = true;
    if (sortComparator) {
      seriesNames.sort(sortComparator);
    } else {
      seriesNames.sort();
    }
    seriesNames.forEach(function (name) {
      var option = doc.createElement('option');
      option.value = name;
      option.textContent = name;
      if (state.series === name) {
        option.selected = true;
      }
      seriesSelect.appendChild(option);
    });
    if (!manufacturerMap.has(state.series)) {
      state.series = '';
      seriesPlaceholder.selected = true;
    } else {
      seriesSelect.value = state.series;
    }
    updateStepState();
  };
  var renderManufacturers = function renderManufacturers() {
    manufacturerSelect.innerHTML = '';
    manufacturerSelect.appendChild(manufacturerPlaceholder);
    var manufacturerNames = Array.from(catalog.manufacturers.keys());
    if (manufacturerNames.length) {
      if (sortComparator) {
        manufacturerNames.sort(sortComparator);
      } else {
        manufacturerNames.sort();
      }
      manufacturerNames.forEach(function (name) {
        var option = doc.createElement('option');
        option.value = name;
        option.textContent = name;
        if (state.manufacturer === name) {
          option.selected = true;
        }
        manufacturerSelect.appendChild(option);
      });
    }
    if (!catalog.manufacturers.has(state.manufacturer)) {
      state.manufacturer = '';
      manufacturerPlaceholder.selected = true;
    } else {
      manufacturerSelect.value = state.manufacturer;
    }
    updateStepState();
  };
  var handleLensToggle = function handleLensToggle(lensName, checked) {
    if (checked) {
      if (state.selections.some(function (sel) {
        return sel.name === lensName;
      })) {
        return;
      }
      var selection = {
        name: lensName,
        mount: resolveDefaultMount(lensName)
      };
      state.selections.push(selection);
      renderSelectionChips();
    } else {
      removeSelection(lensName);
    }
  };
  var removeSelection = function removeSelection(lensName) {
    var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref3$focus = _ref3.focus,
      focus = _ref3$focus === void 0 ? false : _ref3$focus,
      _ref3$skipEvent = _ref3.skipEvent,
      skipEvent = _ref3$skipEvent === void 0 ? false : _ref3$skipEvent,
      _ref3$skipDirty = _ref3.skipDirty,
      skipDirty = _ref3$skipDirty === void 0 ? false : _ref3$skipDirty;
    var index = state.selections.findIndex(function (sel) {
      return sel.name === lensName;
    });
    if (index === -1) return;
    state.selections.splice(index, 1);
    var input = optionInputs.get(lensName);
    if (input) {
      input.checked = false;
      if (focus) {
        input.focus();
      }
    }
    renderSelectionChips({
      skipEvent: skipEvent,
      skipDirty: skipDirty
    });
  };
  var handleManufacturerChange = function handleManufacturerChange() {
    var newValue = normalizeSelectionName(manufacturerSelect.value);
    if (newValue === state.manufacturer) {
      return;
    }
    state.manufacturer = newValue;
    state.series = '';
    renderManufacturers();
    renderSeries();
    renderLensOptions();
  };
  var handleSeriesChange = function handleSeriesChange() {
    var newValue = normalizeSelectionName(seriesSelect.value);
    if (newValue === state.series) {
      return;
    }
    state.series = newValue;
    renderSeries();
    renderLensOptions();
  };
  var applyInfo = function applyInfo() {
    var info = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    catalog = buildCatalog();
    var validNames = new Set(catalog.lensIndex.keys());
    var prepared = [];
    var seen = new Set();
    if (Array.isArray(info.lensSelections)) {
      info.lensSelections.forEach(function (entry) {
        if (!entry || _typeof(entry) !== 'object') return;
        var name = normalizeSelectionName(entry.name);
        if (!name || seen.has(name) || !validNames.has(name)) return;
        var mount = typeof entry.mount === 'string' ? entry.mount.trim() : '';
        prepared.push({
          name: name,
          mount: mount
        });
        seen.add(name);
      });
    }
    if (!prepared.length) {
      normalizeLensSelectionNames(info.lenses).forEach(function (name) {
        var normalized = normalizeSelectionName(name);
        if (!normalized || seen.has(normalized) || !validNames.has(normalized)) return;
        prepared.push({
          name: normalized,
          mount: ''
        });
        seen.add(normalized);
      });
    }
    state.selections = prepared.map(function (entry) {
      return {
        name: entry.name,
        mount: entry.mount || resolveDefaultMount(entry.name)
      };
    });
    if (state.selections.length) {
      var firstRecord = catalog.lensIndex.get(state.selections[0].name);
      state.manufacturer = firstRecord ? firstRecord.manufacturer : '';
      state.series = firstRecord ? firstRecord.series : '';
    } else {
      state.manufacturer = '';
      state.series = '';
    }
    renderManufacturers();
    renderSeries();
    renderLensOptions();
    renderSelectionChips({
      skipEvent: true,
      skipDirty: true
    });
  };
  var snapshot = function snapshot() {
    return {
      names: state.selections.map(function (selection) {
        return selection.name;
      }),
      lensSelections: state.selections.map(function (selection) {
        return {
          name: selection.name,
          mount: selection.mount || ''
        };
      }),
      legacyValue: state.selections.map(function (selection) {
        return selection.name;
      }).join(', ')
    };
  };
  var refreshCatalog = function refreshCatalog() {
    var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref4$preserveSelecti = _ref4.preserveSelections,
      preserveSelections = _ref4$preserveSelecti === void 0 ? true : _ref4$preserveSelecti,
      _ref4$skipEvent = _ref4.skipEvent,
      skipEvent = _ref4$skipEvent === void 0 ? false : _ref4$skipEvent,
      _ref4$skipDirty = _ref4.skipDirty,
      skipDirty = _ref4$skipDirty === void 0 ? false : _ref4$skipDirty;
    var previousSelections = preserveSelections ? state.selections.map(function (selection) {
      return _objectSpread({}, selection);
    }) : [];
    var previousManufacturer = preserveSelections ? state.manufacturer : '';
    var previousSeries = preserveSelections ? state.series : '';
    catalog = buildCatalog();
    var validNames = new Set(catalog.lensIndex.keys());
    state.selections = preserveSelections ? previousSelections.filter(function (selection) {
      return validNames.has(selection.name);
    }) : [];
    state.manufacturer = preserveSelections && catalog.manufacturers.has(previousManufacturer) ? previousManufacturer : '';
    if (state.manufacturer) {
      var seriesMap = catalog.manufacturers.get(state.manufacturer);
      state.series = seriesMap && seriesMap.has(previousSeries) ? previousSeries : '';
    } else {
      state.series = '';
    }
    renderManufacturers();
    renderSeries();
    renderLensOptions();
    renderSelectionChips({
      skipEvent: skipEvent || preserveSelections,
      skipDirty: skipDirty || preserveSelections
    });
  };
  manufacturerSelect.addEventListener('change', handleManufacturerChange);
  seriesSelect.addEventListener('change', handleSeriesChange);
  catalog = buildCatalog();
  renderManufacturers();
  renderSeries();
  renderLensOptions();
  renderSelectionChips({
    skipEvent: true,
    skipDirty: true
  });
  return {
    snapshot: snapshot,
    applyInfo: applyInfo,
    refreshCatalog: refreshCatalog,
    getSelections: function getSelections() {
      return state.selections.map(function (selection) {
        return _objectSpread({}, selection);
      });
    }
  };
}();
if (typeof globalThis !== 'undefined' && globalThis) {
  if (typeof globalThis.updateLensWorkflowCatalog !== 'function') {
    globalThis.updateLensWorkflowCatalog = function updateLensWorkflowCatalog(options) {
      try {
        lensSelectionManager.refreshCatalog(options || {
          preserveSelections: true,
          skipEvent: true,
          skipDirty: true
        });
      } catch (refreshError) {
        void refreshError;
      }
    };
  }
  if (!globalThis.lensSelectionManager) {
    globalThis.lensSelectionManager = lensSelectionManager;
  }
}
function normalizeLensSelectionNames(value) {
  if (Array.isArray(value)) {
    return value.map(function (name) {
      return typeof name === 'string' ? name.trim() : '';
    }).filter(Boolean);
  }
  if (typeof value === 'string') {
    return value.split(',').map(function (name) {
      return name.trim();
    }).filter(Boolean);
  }
  return [];
}
function markProjectFormDataDirty() {
  projectFormDataCacheDirty = true;
  projectFormDataCache = null;
}
function suspendProjectPersistence() {
  projectPersistenceSuspendedCount += 1;
}
function resumeProjectPersistence() {
  if (projectPersistenceSuspendedCount > 0) {
    projectPersistenceSuspendedCount -= 1;
  }
  return projectPersistenceSuspendedCount;
}
function isProjectPersistenceSuspended() {
  return projectPersistenceSuspendedCount > 0;
}
var localGetLocalizedText = function () {
  function fallbackGetLocalizedText(key) {
    if (!key) return '';
    var scope = getGlobalScope();
    var allTexts = scope && _typeof(scope.texts) === 'object' && scope.texts || (typeof texts === "undefined" ? "undefined" : _typeof(texts)) === 'object' && texts || null;
    if (!allTexts) {
      return '';
    }
    var scopeLang = scope && typeof scope.currentLang === 'string' && _typeof(allTexts[scope.currentLang]) === 'object' ? scope.currentLang : null;
    var localLang = typeof currentLang === 'string' && _typeof(allTexts[currentLang]) === 'object' ? currentLang : null;
    var langKey = scopeLang || localLang || 'en';
    var langTexts = _typeof(allTexts[langKey]) === 'object' && allTexts[langKey] || {};
    var directValue = Object.prototype.hasOwnProperty.call(langTexts, key) ? langTexts[key] : undefined;
    if (typeof directValue === 'string') {
      return directValue;
    }
    var fallbackTexts = _typeof(allTexts.en) === 'object' && allTexts.en || {};
    var fallbackValue = Object.prototype.hasOwnProperty.call(fallbackTexts, key) ? fallbackTexts[key] : undefined;
    return typeof fallbackValue === 'string' ? fallbackValue : '';
  }
  var loggedGlobalFailure = false;
  return function resolveLocalizedText(key) {
    var scope = getGlobalScope();
    var globalFn = scope && typeof scope.getLocalizedText === 'function' && scope.getLocalizedText !== resolveLocalizedText ? scope.getLocalizedText : null;
    if (globalFn) {
      try {
        var value = globalFn(key);
        if (typeof value === 'string') {
          return value;
        }
      } catch (error) {
        if (!loggedGlobalFailure && typeof console !== 'undefined' && typeof console.warn === 'function') {
          console.warn('getLocalizedText fallback used after global failure', error);
          loggedGlobalFailure = true;
        }
      }
    }
    return fallbackGetLocalizedText(key);
  };
}();
var localizationScope = getGlobalScope();
if (localizationScope && typeof localizationScope.getLocalizedText !== 'function') {
  localizationScope.getLocalizedText = localGetLocalizedText;
}
var RENTAL_HOUSE_DATALIST_ID = 'rentalHouseOptions';
function resolveRentalHouseCatalog() {
  var candidates = [];
  if (typeof require === 'function') {
    try {
      var moduleExport = require('../data/rental-houses.js');
      if (Array.isArray(moduleExport) && moduleExport.length) {
        candidates.push(moduleExport);
      } else if (moduleExport && Array.isArray(moduleExport.rentalHouses) && moduleExport.rentalHouses.length) {
        candidates.push(moduleExport.rentalHouses);
      } else if (moduleExport && Array.isArray(moduleExport.default) && moduleExport.default.length) {
        candidates.push(moduleExport.default);
      }
    } catch (catalogLoadError) {
      var message = catalogLoadError && catalogLoadError.message ? catalogLoadError.message : '';
      if (catalogLoadError && catalogLoadError.code !== 'MODULE_NOT_FOUND' && !/Cannot find module/i.test(message)) {
        try {
          if (typeof console !== 'undefined' && typeof console.warn === 'function') {
            console.warn('Unable to load rental house catalog module', catalogLoadError);
          }
        } catch (warnError) {
          void warnError;
        }
      }
    }
  }
  var scope = getGlobalScope();
  if (scope) {
    var scopedDevices = scope.devices;
    if (scopedDevices && Array.isArray(scopedDevices.rentalHouses) && scopedDevices.rentalHouses.length) {
      candidates.push(scopedDevices.rentalHouses);
    }
    if (Array.isArray(scope.rentalHouses) && scope.rentalHouses.length) {
      candidates.push(scope.rentalHouses);
    }
  }
  if (typeof devices !== 'undefined' && devices && Array.isArray(devices.rentalHouses) && devices.rentalHouses.length) {
    candidates.push(devices.rentalHouses);
  }
  for (var index = 0; index < candidates.length; index += 1) {
    var candidate = candidates[index];
    if (Array.isArray(candidate) && candidate.length) {
      return candidate.slice();
    }
  }
  return [];
}
var rentalHouseCatalog = resolveRentalHouseCatalog();
var RENTAL_HOUSE_SUGGESTION_LIMIT = 50;
function normalizeRentalHouseSearchValue(value) {
  if (!value) return '';
  var normalized = String(value);
  try {
    if (typeof normalized.normalize === 'function') {
      normalized = normalized.normalize('NFD');
    }
  } catch (error) {
    void error;
  }
  return normalized.replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[\u2012\u2013\u2014\u2015]/g, '-').replace(/[^a-z0-9]+/g, ' ').replace(/\s+/g, ' ').trim();
}
var rentalHouseSearchIndex = rentalHouseCatalog.map(function (entry) {
  if (!entry || _typeof(entry) !== 'object') return null;
  var name = entry.name ? String(entry.name).trim() : '';
  if (!name) return null;
  var key = normalizeRentalHouseKey(name);
  if (!key) return null;
  var location = formatRentalHouseLocation(entry);
  var normalizedName = normalizeRentalHouseSearchValue(name);
  var normalizedLocation = normalizeRentalHouseSearchValue(location);
  var additionalParts = normalizeRentalHouseSearchValue([entry.city, entry.country, entry.address, entry.phone, entry.email].map(function (part) {
    return part ? String(part).trim() : '';
  }).filter(Boolean).join(' '));
  var searchKey = [normalizedName, normalizedLocation, additionalParts].filter(Boolean).join(' ');
  return {
    entry: entry,
    name: name,
    key: key,
    location: location,
    normalizedName: normalizedName,
    normalizedLocation: normalizedLocation,
    searchKey: searchKey
  };
}).filter(Boolean);
var rentalHouseCatalogSignature = rentalHouseSearchIndex.map(function (info) {
  return "".concat(info.key, "|").concat(info.location);
}).join('||');
function normalizeRentalHouseKey(value) {
  if (!value) return '';
  return String(value).trim().replace(/[\u2012\u2013\u2014\u2015]/g, '-').toLowerCase();
}
var rentalHouseLookup = function () {
  var map = Object.create(null);
  rentalHouseCatalog.forEach(function (entry) {
    if (!entry || _typeof(entry) !== 'object') return;
    var key = normalizeRentalHouseKey(entry.name);
    if (key && !map[key]) {
      map[key] = entry;
    }
  });
  return map;
}();
var RENTAL_HOUSE_SUFFIX_TOKENS = new Set(['AG', 'BV', 'BVBA', 'CO', 'GMBH', 'INC', 'KG', 'LLC', 'LTD', 'PLC', 'PTY', 'SAS', 'SARL', 'SL', 'SPA', 'S.P.A', 'SRL']);
function formatRentalHouseShortName(entryOrName) {
  if (!entryOrName) return '';
  var explicit = _typeof(entryOrName) === 'object' && entryOrName && typeof entryOrName.shortName === 'string' ? entryOrName.shortName.trim() : '';
  if (explicit) {
    return explicit;
  }
  var rawName = typeof entryOrName === 'string' ? entryOrName : entryOrName && entryOrName.name;
  var name = rawName ? String(rawName).trim() : '';
  if (!name) return '';
  var base = name.replace(/\s*\([^)]*\)\s*/g, ' ').replace(/\s+/g, ' ').trim();
  var separatorMatch = base.match(/\s*[\u2012\u2013\u2014\u2015-]\s*/);
  if (separatorMatch) {
    var index = base.indexOf(separatorMatch[0]);
    if (index > 0) {
      base = base.slice(0, index).trim();
    }
  }
  if (!base) {
    base = name.trim();
  }
  var uppercaseTokens = base.match(/\b[A-Z]{2,5}\b/g);
  if (uppercaseTokens && uppercaseTokens.length) {
    for (var i = 0; i < uppercaseTokens.length; i += 1) {
      var token = uppercaseTokens[i];
      if (!RENTAL_HOUSE_SUFFIX_TOKENS.has(token)) {
        if (token === 'ARRI') return 'Arri';
        return token;
      }
    }
  }
  if (/^arri\b/i.test(base)) {
    return 'Arri';
  }
  if (/^ludwig\s+kamera/i.test(base)) {
    return 'Kamera Ludwig';
  }
  return base.trim();
}
function resolveCurrentRentalHouseValue() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var input = options.input || resolveRentalHouseInput();
  if (options.preferInput !== false && input && typeof input.value === 'string') {
    var inputValue = input.value.trim();
    if (inputValue) {
      return inputValue;
    }
  }
  if (typeof options.rentalHouse === 'string' && options.rentalHouse.trim()) {
    return options.rentalHouse.trim();
  }
  var info = null;
  var scope = getGlobalScope();
  if (scope && typeof scope.getCurrentProjectInfo === 'function') {
    try {
      info = scope.getCurrentProjectInfo();
    } catch (scopeError) {
      void scopeError;
    }
  }
  var profileValue = info && _typeof(info) === 'object' && typeof info.rentalHouse === 'string' ? info.rentalHouse.trim() : '';
  if (profileValue) {
    return profileValue;
  }
  if (options.preferInput === false && input && typeof input.value === 'string') {
    return input.value.trim();
  }
  return '';
}
function resolveRentalProviderNoteLabel() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var fallback = typeof options.fallback === 'string' ? options.fallback : '';
  var rentalValue = typeof options.rentalHouse === 'string' && options.rentalHouse.trim() ? options.rentalHouse.trim() : resolveCurrentRentalHouseValue({
    input: options.input
  });
  if (!rentalValue) {
    return fallback;
  }
  var match = rentalHouseLookup[normalizeRentalHouseKey(rentalValue)];
  var shortName = formatRentalHouseShortName(match || rentalValue);
  if (shortName) {
    return shortName;
  }
  return fallback || rentalValue;
}
var appliedRentalNoteLabel = null;
function refreshRentalProviderNoteDisplays() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var rentalTexts = getGearListRentalToggleTexts(options);
  var nextLabel = rentalTexts.noteLabel && rentalTexts.noteLabel.trim() ? rentalTexts.noteLabel.trim() : '';
  if (appliedRentalNoteLabel === nextLabel) {
    return nextLabel;
  }
  appliedRentalNoteLabel = nextLabel;
  var doc = typeof document !== 'undefined' ? document : null;
  var roots = [];
  if (typeof gearListOutput !== 'undefined' && gearListOutput) {
    roots.push(gearListOutput);
  }
  if (typeof projectRequirementsOutput !== 'undefined' && projectRequirementsOutput) {
    roots.push(projectRequirementsOutput);
  }
  if (doc) {
    roots.push(doc);
  }
  if (roots.length) {
    var selector = '.gear-item[data-rental-note], .gear-custom-item[data-rental-note]';
    roots.forEach(function (root) {
      if (!root || typeof root.querySelectorAll !== 'function') {
        return;
      }
      root.querySelectorAll(selector).forEach(function (element) {
        if (!element || typeof element.setAttribute !== 'function') {
          return;
        }
        if (nextLabel) {
          if (element.getAttribute('data-rental-note') !== nextLabel) {
            element.setAttribute('data-rental-note', nextLabel);
          }
        } else if (typeof element.removeAttribute === 'function') {
          element.removeAttribute('data-rental-note');
        }
      });
    });
  }
  var context = null;
  if (typeof getGearItemEditContext === 'function') {
    try {
      context = getGearItemEditContext();
    } catch (contextError) {
      if (!contextError || contextError.name !== 'ReferenceError') {
        throw contextError;
      }
    }
  }
  if (context && context.rentalDescription) {
    context.rentalDescription.textContent = nextLabel;
    context.rentalDescription.hidden = !nextLabel;
    if (context.rentalCheckbox) {
      if (nextLabel) {
        context.rentalCheckbox.setAttribute('aria-describedby', context.rentalDescription.id);
      } else {
        context.rentalCheckbox.removeAttribute('aria-describedby');
      }
    }
  }
  return nextLabel;
}
function formatRentalHouseLocation(entry) {
  var parts = [];
  var city = entry && entry.city ? String(entry.city).trim() : '';
  var country = entry && entry.country ? String(entry.country).trim() : '';
  if (city) parts.push(city);
  if (country) parts.push(country);
  return parts.join(', ');
}
function formatRentalHouseTooltip(entry) {
  if (!entry || _typeof(entry) !== 'object') return '';
  var segments = [];
  var location = formatRentalHouseLocation(entry);
  var address = entry.address ? String(entry.address).trim() : '';
  var phone = entry.phone ? String(entry.phone).trim() : '';
  var email = entry.email ? String(entry.email).trim() : '';
  if (location) segments.push(location);
  if (address) segments.push(address);
  if (phone) segments.push(phone);
  if (email) segments.push(email);
  return segments.join(' • ');
}
function resolveRentalHouseInput() {
  if (typeof document === 'undefined') return null;
  return document.getElementById('rentalHouse');
}
function ensureRentalHouseDatalist(input) {
  if (!input || typeof document === 'undefined') return null;
  var listId = input.getAttribute('list');
  if (!listId) {
    listId = RENTAL_HOUSE_DATALIST_ID;
    input.setAttribute('list', listId);
  }
  var datalist = listId ? document.getElementById(listId) : null;
  if (!datalist) {
    datalist = document.createElement('datalist');
    datalist.id = listId;
    input.insertAdjacentElement('afterend', datalist);
  }
  return datalist;
}
function scoreRentalHouseMatch(info, query) {
  if (!query) return 0;
  if (!info) return Number.POSITIVE_INFINITY;
  var normalizedName = info.normalizedName,
    normalizedLocation = info.normalizedLocation,
    searchKey = info.searchKey;
  if (!searchKey || searchKey.indexOf(query) === -1) {
    return Number.POSITIVE_INFINITY;
  }
  var nameIndex = normalizedName ? normalizedName.indexOf(query) : -1;
  var locationIndex = normalizedLocation ? normalizedLocation.indexOf(query) : -1;
  if (nameIndex === 0) {
    return 0;
  }
  if (locationIndex === 0) {
    return 100;
  }
  if (nameIndex > 0) {
    return 200 + nameIndex;
  }
  if (locationIndex > 0) {
    return 400 + locationIndex;
  }
  var searchIndex = searchKey.indexOf(query);
  return 800 + (searchIndex >= 0 ? searchIndex : 0);
}
function getRentalHouseMatches(query) {
  var normalizedQuery = normalizeRentalHouseSearchValue(query);
  if (!normalizedQuery) {
    return rentalHouseSearchIndex.slice().sort(function (a, b) {
      return a.name.localeCompare(b.name);
    }).slice(0, RENTAL_HOUSE_SUGGESTION_LIMIT);
  }
  var results = [];
  rentalHouseSearchIndex.forEach(function (info) {
    var score = scoreRentalHouseMatch(info, normalizedQuery);
    if (!Number.isFinite(score)) return;
    results.push({
      info: info,
      score: score
    });
  });
  results.sort(function (a, b) {
    if (a.score !== b.score) return a.score - b.score;
    return a.info.name.localeCompare(b.info.name);
  });
  return results.slice(0, RENTAL_HOUSE_SUGGESTION_LIMIT).map(function (result) {
    return result.info;
  });
}
function renderRentalHouseSuggestions() {
  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : resolveRentalHouseInput();
  if (!input || !rentalHouseSearchIndex.length) return;
  var datalist = ensureRentalHouseDatalist(input);
  if (!datalist) return;
  var query = typeof input.value === 'string' ? input.value : '';
  var normalizedQuery = normalizeRentalHouseSearchValue(query);
  var signature = "".concat(rentalHouseCatalogSignature, "::").concat(normalizedQuery);
  if (datalist.__rentalHouseSignature === signature) {
    return;
  }
  var fragment = document.createDocumentFragment();
  var seen = new Set();
  var matches = getRentalHouseMatches(query);
  var suggestions = matches.length ? matches : getRentalHouseMatches('');
  suggestions.forEach(function (info) {
    if (!info || seen.has(info.key)) return;
    var option = document.createElement('option');
    option.value = info.name;
    if (info.location) {
      option.label = info.location;
    }
    option.textContent = info.name;
    fragment.appendChild(option);
    seen.add(info.key);
  });
  datalist.innerHTML = '';
  datalist.appendChild(fragment);
  datalist.__rentalHouseSignature = signature;
}
function updateRentalHouseAssistiveDetails() {
  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : resolveRentalHouseInput();
  if (!input) return;
  var value = typeof input.value === 'string' ? input.value.trim() : '';
  var match = value ? rentalHouseLookup[normalizeRentalHouseKey(value)] : null;
  if (match) {
    var tooltip = formatRentalHouseTooltip(match);
    if (tooltip) {
      input.title = tooltip;
      input.setAttribute('data-help', tooltip);
    } else {
      input.removeAttribute('title');
      input.removeAttribute('data-help');
    }
  } else {
    input.removeAttribute('title');
    input.removeAttribute('data-help');
  }
  refreshRentalProviderNoteDisplays({
    input: input,
    rentalHouse: value
  });
}
var initialRentalHouseInput = resolveRentalHouseInput();
if (initialRentalHouseInput) {
  if (rentalHouseSearchIndex.length) {
    renderRentalHouseSuggestions(initialRentalHouseInput);
  }
  updateRentalHouseAssistiveDetails(initialRentalHouseInput);
  initialRentalHouseInput.addEventListener('input', function () {
    renderRentalHouseSuggestions(initialRentalHouseInput);
    updateRentalHouseAssistiveDetails(initialRentalHouseInput);
  });
  initialRentalHouseInput.addEventListener('change', function () {
    renderRentalHouseSuggestions(initialRentalHouseInput);
    updateRentalHouseAssistiveDetails(initialRentalHouseInput);
  });
  initialRentalHouseInput.addEventListener('blur', function () {
    return updateRentalHouseAssistiveDetails(initialRentalHouseInput);
  });
  initialRentalHouseInput.addEventListener('focus', function () {
    return renderRentalHouseSuggestions(initialRentalHouseInput);
  });
}
function hasMeaningfulPowerSelection(value) {
  if (typeof value !== 'string') return false;
  var trimmed = value.trim();
  if (!trimmed) return false;
  return trimmed.toLowerCase() !== 'none';
}
function normalizePowerSelectionString(value) {
  if (typeof value === 'string') return value.trim();
  if (value === null || value === undefined) return '';
  return String(value);
}
function assignSelectValue(select, value) {
  if (!select) return;
  if (typeof setSelectValue === 'function') {
    setSelectValue(select, value);
  } else if (value === undefined) {
    select.selectedIndex = -1;
  } else {
    select.value = value;
  }
}
function getGlobalScope() {
  return typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
}
function resolveSetupsStructuredClone(scope) {
  if (typeof structuredClone === 'function') {
    return structuredClone;
  }
  if (scope && typeof scope.structuredClone === 'function') {
    try {
      return scope.structuredClone.bind(scope);
    } catch (bindError) {
      void bindError;
    }
  }
  if (typeof require === 'function') {
    try {
      var nodeUtil = require('node:util');
      if (nodeUtil && typeof nodeUtil.structuredClone === 'function') {
        return nodeUtil.structuredClone.bind(nodeUtil);
      }
    } catch (nodeUtilError) {
      void nodeUtilError;
    }
    try {
      var legacyUtil = require('util');
      if (legacyUtil && typeof legacyUtil.structuredClone === 'function') {
        return legacyUtil.structuredClone.bind(legacyUtil);
      }
    } catch (legacyUtilError) {
      void legacyUtilError;
    }
  }
  return null;
}
function setupsJsonDeepClone(value) {
  if (value === null || _typeof(value) !== 'object') {
    return value;
  }
  try {
    return JSON.parse(JSON.stringify(value));
  } catch (jsonCloneError) {
    void jsonCloneError;
  }
  return value;
}
function createSetupsDeepClone(scope) {
  var structuredCloneImpl = resolveSetupsStructuredClone(scope);
  if (!structuredCloneImpl) {
    return setupsJsonDeepClone;
  }
  return function setupsResilientDeepClone(value) {
    if (value === null || _typeof(value) !== 'object') {
      return value;
    }
    try {
      return structuredCloneImpl(value);
    } catch (structuredCloneError) {
      void structuredCloneError;
    }
    return setupsJsonDeepClone(value);
  };
}
var SETUPS_DEEP_CLONE = function () {
  var scope = getGlobalScope();
  if (scope && typeof scope.__cineDeepClone === 'function') {
    return scope.__cineDeepClone;
  }
  return createSetupsDeepClone(scope);
}();
function gearListGetSafeHtmlSectionsImpl(html) {
  var normalizedHtml = typeof html === 'string' ? html : '';
  var fallbackResult = {
    projectHtml: '',
    gearHtml: normalizedHtml
  };
  var scope = getGlobalScope();
  var splitter = typeof splitGearListHtml === 'function' ? splitGearListHtml : scope && typeof scope.splitGearListHtml === 'function' ? scope.splitGearListHtml : null;
  if (!splitter) {
    return fallbackResult;
  }
  try {
    var result = splitter(normalizedHtml);
    if (!result || _typeof(result) !== 'object') {
      return fallbackResult;
    }
    var projectHtml = typeof result.projectHtml === 'string' ? result.projectHtml : '';
    var gearHtml = typeof result.gearHtml === 'string' ? result.gearHtml : projectHtml ? '' : normalizedHtml;
    return {
      projectHtml: projectHtml,
      gearHtml: gearHtml
    };
  } catch (error) {
    console.warn('Failed to split gear list HTML', error);
    return fallbackResult;
  }
}
function resolveElementById(id, globalName) {
  var doc = typeof document !== 'undefined' ? document : null;
  if (doc && typeof doc.getElementById === 'function') {
    var element = doc.getElementById(id);
    if (element) {
      return element;
    }
  }
  var scope = getGlobalScope();
  if (scope && globalName && _typeof(scope) === 'object') {
    try {
      var candidate = scope[globalName];
      if (candidate) {
        return candidate;
      }
    } catch (error) {
      void error;
    }
  }
  return null;
}
function resolveGearListModule() {
  var scope = getGlobalScope();
  var candidates = [];
  if ((typeof cineGearList === "undefined" ? "undefined" : _typeof(cineGearList)) === 'object' && cineGearList) {
    candidates.push(cineGearList);
  }
  if (scope && _typeof(scope.cineGearList) === 'object' && scope.cineGearList) {
    if (!candidates.includes(scope.cineGearList)) {
      candidates.push(scope.cineGearList);
    }
  }
  if (typeof require === 'function') {
    try {
      var required = require('./modules/gear-list.js');
      if (required && _typeof(required) === 'object' && !candidates.includes(required)) {
        candidates.push(required);
      }
    } catch (error) {
      void error;
    }
  }
  for (var index = 0; index < candidates.length; index += 1) {
    var candidate = candidates[index];
    if (!candidate || typeof candidate.setImplementation !== 'function') {
      continue;
    }
    return candidate;
  }
  return null;
}
function registerGearListModuleImplementation() {
  var module = resolveGearListModule();
  var implementation = {
    getSafeGearListHtmlSections: gearListGetSafeHtmlSectionsImpl,
    generateGearListHtml: gearListGenerateHtmlImpl,
    getCurrentGearListHtml: gearListGetCurrentHtmlImpl
  };
  if (module && typeof module.setImplementation === 'function') {
    try {
      module.setImplementation(implementation, {
        source: 'app-setups'
      });
      return true;
    } catch (error) {
      if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
        console.warn('Unable to register gear list implementation with cineGearList.', error);
      }
    }
  }
  var scope = getGlobalScope();
  if (scope && _typeof(scope) === 'object') {
    try {
      scope.getSafeGearListHtmlSections = gearListGetSafeHtmlSectionsImpl;
    } catch (error) {
      void error;
    }
    try {
      scope.generateGearListHtml = gearListGenerateHtmlImpl;
    } catch (error) {
      void error;
    }
    try {
      scope.getCurrentGearListHtml = gearListGetCurrentHtmlImpl;
    } catch (error) {
      void error;
    }
  }
  return false;
}
registerGearListModuleImplementation();
function buildShareUiContext() {
  return {
    dialog: resolveElementById('shareDialog', 'shareDialog'),
    form: resolveElementById('shareForm', 'shareForm'),
    filenameInput: resolveElementById('shareFilename', 'shareFilenameInput'),
    filenameMessage: resolveElementById('shareFilenameMessage', 'shareFilenameMessage'),
    linkMessage: resolveElementById('shareLinkMessage', 'shareLinkMessage'),
    includeAutoGearCheckbox: resolveElementById('shareIncludeAutoGear', 'shareIncludeAutoGearCheckbox'),
    includeAutoGearLabel: resolveElementById('shareIncludeAutoGearLabel', 'shareIncludeAutoGearLabelElem'),
    includeOwnedGearCheckbox: resolveElementById('shareIncludeOwnedGear', 'shareIncludeOwnedGearCheckbox'),
    includeOwnedGearLabel: resolveElementById('shareIncludeOwnedGearLabel', 'shareIncludeOwnedGearLabelElem'),
    cancelButton: resolveElementById('shareCancelBtn', 'shareCancelBtn'),
    sharedLinkInput: resolveElementById('sharedLinkInput', 'sharedLinkInput'),
    applySharedLinkButton: resolveElementById('applySharedLinkBtn', 'applySharedLinkBtn')
  };
}
function buildSharedImportUiContext() {
  return {
    dialog: resolveElementById('sharedImportDialog', 'sharedImportDialog'),
    form: resolveElementById('sharedImportForm', 'sharedImportForm'),
    modeSelect: resolveElementById('sharedImportModeSelect', 'sharedImportModeSelect'),
    cancelButton: resolveElementById('sharedImportCancelBtn', 'sharedImportCancelBtn')
  };
}
var cachedShareUiContext = null;
var cachedSharedImportUiContext = null;
var projectDialogInitialSnapshot = null;
function getShareUiContext(scope) {
  if (scope && _typeof(scope) === 'object' && scope.context && _typeof(scope.context) === 'object') {
    return scope.context;
  }
  if (!cachedShareUiContext) {
    cachedShareUiContext = buildShareUiContext();
  }
  return cachedShareUiContext;
}
function getSharedImportUiContext(scope) {
  if (scope && _typeof(scope) === 'object' && scope.context && _typeof(scope.context) === 'object') {
    return scope.context;
  }
  if (!cachedSharedImportUiContext) {
    cachedSharedImportUiContext = buildSharedImportUiContext();
  }
  return cachedSharedImportUiContext;
}
function cloneProjectDialogState(value) {
  if (value === null || value === undefined) {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(function (item) {
      return cloneProjectDialogState(item);
    });
  }
  if (Object.prototype.toString.call(value) === '[object Object]') {
    var clone = {};
    Object.keys(value).forEach(function (key) {
      clone[key] = cloneProjectDialogState(value[key]);
    });
    return clone;
  }
  return value;
}
function getProjectDialogSeedInfo() {
  if (currentProjectInfo) {
    return cloneProjectDialogState(currentProjectInfo);
  }
  if (projectForm) {
    try {
      return cloneProjectDialogState(collectProjectFormData());
    } catch (error) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Failed to read current project form data before opening dialog', error);
      }
    }
  }
  return {};
}
function captureProjectDialogSnapshot() {
  if (!projectForm) {
    projectDialogInitialSnapshot = null;
    return;
  }
  try {
    var snapshot = collectProjectFormData();
    projectDialogInitialSnapshot = cloneProjectDialogState(snapshot);
  } catch (error) {
    projectDialogInitialSnapshot = null;
    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      console.warn('Failed to capture project dialog snapshot', error);
    }
  }
}
function openProjectDialogWithInfo(info) {
  if (projectForm) {
    var seed = info && _typeof(info) === 'object' ? info : {};
    populateProjectForm(seed);
    captureProjectDialogSnapshot();
  } else {
    projectDialogInitialSnapshot = null;
  }
  openDialog(projectDialog);
}
function restoreProjectDialogSnapshot() {
  if (!projectForm) return;
  if (projectDialogInitialSnapshot && _typeof(projectDialogInitialSnapshot) === 'object') {
    populateProjectForm(cloneProjectDialogState(projectDialogInitialSnapshot));
  } else {
    projectForm.reset();
  }
}
function callSetupsCoreFunction(functionName) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (typeof callCoreFunctionIfAvailable === 'function') {
    return callCoreFunctionIfAvailable(functionName, args, options);
  }
  var scope = (typeof globalThis !== 'undefined' ? globalThis : null) || (typeof window !== 'undefined' ? window : null) || (typeof self !== 'undefined' ? self : null) || (typeof global !== 'undefined' ? global : null) || null;
  var target = typeof functionName === 'string' ? scope && scope[functionName] : functionName;
  if (typeof target === 'function') {
    try {
      return target.apply(scope, args);
    } catch (invokeError) {
      if (typeof console !== 'undefined' && typeof console.error === 'function') {
        console.error("Failed to invoke ".concat(functionName), invokeError);
      }
    }
    return undefined;
  }
  if (options && options.defer === true) {
    var queue = scope && Array.isArray(scope.CORE_BOOT_QUEUE) ? scope.CORE_BOOT_QUEUE : null;
    if (queue) {
      queue.push(function () {
        callSetupsCoreFunction(functionName, args, _objectSpread(_objectSpread({}, options), {}, {
          defer: false
        }));
      });
    }
  }
  return options && Object.prototype.hasOwnProperty.call(options, 'defaultValue') ? options.defaultValue : undefined;
}
function getSetupsCoreValue(functionName) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var defaultValue = Object.prototype.hasOwnProperty.call(options, 'defaultValue') ? options.defaultValue : '';
  var value = callSetupsCoreFunction(functionName, [], {
    defaultValue: defaultValue
  });
  if (typeof value === 'string') {
    return value;
  }
  if (value === null || value === undefined) {
    return defaultValue;
  }
  try {
    return String(value);
  } catch (coerceError) {
    void coerceError;
    return defaultValue;
  }
}
function getGlobalCineUi() {
  var scope = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
  if (!scope || _typeof(scope) !== 'object') {
    return null;
  }
  try {
    var candidate = scope.cineUi;
    return candidate && _typeof(candidate) === 'object' ? candidate : null;
  } catch (error) {
    void error;
    return null;
  }
}
function isCineUiEntryRegistered(registry, name) {
  if (!registry || _typeof(registry) !== 'object') {
    return false;
  }
  if (typeof registry.get === 'function') {
    try {
      return Boolean(registry.get(name));
    } catch (error) {
      void error;
    }
  }
  if (typeof registry.list === 'function') {
    try {
      var entries = registry.list();
      return Array.isArray(entries) && entries.indexOf(name) !== -1;
    } catch (error) {
      void error;
    }
  }
  return false;
}
function registerCineUiEntries(registry, entries, warningMessage) {
  if (!registry || typeof registry.register !== 'function') {
    return;
  }
  for (var index = 0; index < entries.length; index += 1) {
    var entry = entries[index];
    if (!entry || typeof entry.name !== 'string') {
      continue;
    }
    if (isCineUiEntryRegistered(registry, entry.name)) {
      continue;
    }
    try {
      registry.register(entry.name, entry.value);
    } catch (error) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn(warningMessage, error);
      }
    }
  }
}
function areSetupsEntriesRegistered(cineUi) {
  if (!cineUi || _typeof(cineUi) !== 'object') {
    return false;
  }
  var controllers = cineUi.controllers;
  var interactions = cineUi.interactions;
  var help = cineUi.help;
  return isCineUiEntryRegistered(controllers, 'shareDialog') && isCineUiEntryRegistered(controllers, 'sharedImportDialog') && isCineUiEntryRegistered(interactions, 'shareOpen') && isCineUiEntryRegistered(interactions, 'shareSubmit') && isCineUiEntryRegistered(interactions, 'shareCancel') && isCineUiEntryRegistered(interactions, 'shareApplyFile') && isCineUiEntryRegistered(interactions, 'shareInputChange') && isCineUiEntryRegistered(interactions, 'sharedImportSubmit') && isCineUiEntryRegistered(interactions, 'sharedImportCancel') && isCineUiEntryRegistered(help, 'shareProject') && isCineUiEntryRegistered(help, 'sharedImport');
}
var setupsCineUiRegistered = areSetupsEntriesRegistered(getGlobalCineUi());
function enqueueCineUiRegistration(callback) {
  var scope = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
  if (!scope || typeof callback !== 'function') {
    return;
  }
  try {
    var existing = scope.cineUi && _typeof(scope.cineUi) === 'object' ? scope.cineUi : null;
    if (existing) {
      callback(existing);
      return;
    }
  } catch (callbackError) {
    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      console.warn('cineUi registration callback (setups) failed', callbackError);
    }
    return;
  }
  var key = '__cineUiReadyQueue';
  if (!Array.isArray(scope[key])) {
    scope[key] = [];
  }
  scope[key].push(callback);
}
function getPowerSelectionSnapshot() {
  if (!batterySelect && !batteryPlateSelect && !hotswapSelect) return null;
  var rawBattery = batterySelect ? normalizePowerSelectionString(batterySelect.value) : '';
  var rawPlate = batteryPlateSelect ? normalizePowerSelectionString(batteryPlateSelect.value) : '';
  var rawHotswap = hotswapSelect ? normalizePowerSelectionString(hotswapSelect.value) : '';
  var normalizedPlate = typeof normalizeBatteryPlateValue === 'function' ? normalizeBatteryPlateValue(rawPlate, rawBattery) : rawPlate;
  var snapshot = {
    batteryPlate: normalizedPlate || '',
    battery: rawBattery || '',
    batteryHotswap: rawHotswap || ''
  };
  if (!snapshot.batteryPlate && !snapshot.battery && !snapshot.batteryHotswap) {
    return null;
  }
  return snapshot;
}
function applyStoredPowerSelection(selection) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref5$preferExisting = _ref5.preferExisting,
    preferExisting = _ref5$preferExisting === void 0 ? true : _ref5$preferExisting;
  if (!selection || _typeof(selection) !== 'object') return false;
  var target = {
    batteryPlate: normalizePowerSelectionString(selection.batteryPlate),
    battery: normalizePowerSelectionString(selection.battery),
    batteryHotswap: normalizePowerSelectionString(selection.batteryHotswap)
  };
  var shouldOverwriteBattery = !preferExisting || !hasMeaningfulPowerSelection(batterySelect && batterySelect.value);
  var shouldOverwritePlate = !preferExisting || !hasMeaningfulPowerSelection(batteryPlateSelect && batteryPlateSelect.value);
  var shouldOverwriteHotswap = !preferExisting || !hasMeaningfulPowerSelection(hotswapSelect && hotswapSelect.value);
  var matchesTarget = function matchesTarget(select, desired) {
    if (!select) return false;
    if (desired === '') {
      return !select.value || select.value === 'None' || select.selectedIndex === -1;
    }
    return select.value === desired;
  };
  var anyMatch = false;
  var anyPending = false;
  if (batterySelect) {
    if (target.battery && shouldOverwriteBattery) {
      assignSelectValue(batterySelect, target.battery);
      if (matchesTarget(batterySelect, target.battery)) {
        anyMatch = true;
      } else {
        anyPending = true;
      }
    } else if (!target.battery && !preferExisting) {
      assignSelectValue(batterySelect, '');
      if (matchesTarget(batterySelect, '')) {
        anyMatch = true;
      } else {
        anyPending = true;
      }
    } else if (matchesTarget(batterySelect, target.battery)) {
      anyMatch = true;
    }
  }
  if (batteryPlateSelect) {
    if (target.batteryPlate && shouldOverwritePlate) {
      assignSelectValue(batteryPlateSelect, target.batteryPlate);
      if (matchesTarget(batteryPlateSelect, target.batteryPlate)) {
        anyMatch = true;
      } else {
        anyPending = true;
      }
    } else if (!target.batteryPlate && !preferExisting) {
      assignSelectValue(batteryPlateSelect, '');
      if (matchesTarget(batteryPlateSelect, '')) {
        anyMatch = true;
      } else {
        anyPending = true;
      }
    } else if (matchesTarget(batteryPlateSelect, target.batteryPlate)) {
      anyMatch = true;
    }
  }
  if (typeof applyBatteryPlateSelectionFromBattery === 'function') {
    applyBatteryPlateSelectionFromBattery(batterySelect ? batterySelect.value : target.battery, batteryPlateSelect ? batteryPlateSelect.value : target.batteryPlate);
  }
  if (hotswapSelect) {
    if (target.batteryHotswap && shouldOverwriteHotswap) {
      assignSelectValue(hotswapSelect, target.batteryHotswap);
      if (matchesTarget(hotswapSelect, target.batteryHotswap)) {
        anyMatch = true;
      } else {
        anyPending = true;
      }
    } else if (!target.batteryHotswap && !preferExisting) {
      assignSelectValue(hotswapSelect, '');
      if (matchesTarget(hotswapSelect, '')) {
        anyMatch = true;
      } else {
        anyPending = true;
      }
    } else if (matchesTarget(hotswapSelect, target.batteryHotswap)) {
      anyMatch = true;
    }
  }
  return anyPending ? false : anyMatch;
}
if (typeof generateOverviewBtn !== 'undefined' && generateOverviewBtn) {
  generateOverviewBtn.addEventListener('click', function () {
    if (!setupSelect.value) {
      alert(texts[currentLang].alertSelectSetupForOverview);
      return;
    }
    generatePrintableOverview();
  });
}
function batteryPinsSufficient() {
  var batt = batterySelect && batterySelect.value;
  if (!batt || batt === 'None' || !devices.batteries[batt]) return true;
  var battData = devices.batteries[batt];
  var totalCurrentLow = parseFloat(totalCurrent12Elem.textContent);
  if (!isFinite(totalCurrentLow)) return true;
  return totalCurrentLow <= battData.pinA;
}
function alertPinExceeded() {
  var batt = batterySelect && batterySelect.value;
  if (!batt || batt === 'None' || !devices.batteries[batt]) return;
  var battData = devices.batteries[batt];
  var totalCurrentLow = parseFloat(totalCurrent12Elem.textContent);
  alert(texts[currentLang].warnPinExceeded.replace('{current}', totalCurrentLow.toFixed(2)).replace('{max}', battData.pinA));
}
generateGearListBtn.addEventListener('click', function () {
  if (!setupSelect.value) {
    alert(texts[currentLang].alertSelectSetupForOverview);
    return;
  }
  if (!batteryPinsSufficient()) {
    alertPinExceeded();
    return;
  }
  var seedInfo = getProjectDialogSeedInfo();
  if (seedInfo && _typeof(seedInfo) === 'object') {
    populateRecordingResolutionDropdown(seedInfo.recordingResolution);
    populateSensorModeDropdown(seedInfo.sensorMode);
    populateCodecDropdown(seedInfo.codec);
  }
  openProjectDialogWithInfo(seedInfo);
});
if (deleteGearListProjectBtn) {
  deleteGearListProjectBtn.addEventListener('click', function () {
    deleteCurrentGearList();
  });
}
var projectCancelBtnRef = typeof projectCancelBtn !== 'undefined' ? projectCancelBtn : null;
if (projectCancelBtnRef) {
  projectCancelBtnRef.addEventListener('click', function () {
    restoreProjectDialogSnapshot();
    closeDialog(projectDialog);
  });
}
function submitProjectFormViaBackdrop() {
  if (!projectForm || !projectDialog) {
    return;
  }
  var propOpen = typeof projectDialog.open === 'boolean' ? projectDialog.open : null;
  var attrOpen = typeof projectDialog.hasAttribute === 'function' ? projectDialog.hasAttribute('open') : false;
  var isOpen = propOpen === null ? attrOpen : propOpen || attrOpen;
  if (!isOpen) {
    return;
  }
  var submitButton = projectDialog.querySelector('[type="submit"]');
  if (typeof projectForm.requestSubmit === 'function') {
    try {
      if (submitButton) {
        projectForm.requestSubmit(submitButton);
      } else {
        projectForm.requestSubmit();
      }
      return;
    } catch (requestError) {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn('Project dialog backdrop submit failed to use requestSubmit', requestError);
      }
    }
  }
  var submitEvent = new Event('submit', {
    bubbles: true,
    cancelable: true
  });
  projectForm.dispatchEvent(submitEvent);
}
if (projectDialogCloseBtn) {
  projectDialogCloseBtn.addEventListener('click', function () {
    if (projectCancelBtnRef) {
      projectCancelBtnRef.click();
    } else {
      closeDialog(projectDialog);
    }
  });
}
if (projectDialog) {
  projectDialog.addEventListener('cancel', function (event) {
    if (event) event.preventDefault();
    if (projectCancelBtnRef) {
      projectCancelBtnRef.click();
    } else {
      restoreProjectDialogSnapshot();
      closeDialog(projectDialog);
    }
  });
  projectDialog.addEventListener('click', function (event) {
    if (event.target === projectDialog) {
      event.preventDefault();
      event.stopPropagation();
      submitProjectFormViaBackdrop();
    }
  });
}
if (projectForm) {
  projectForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!batteryPinsSufficient()) {
      alertPinExceeded();
      return;
    }
    var info = collectProjectFormData();
    currentProjectInfo = info;
    ensureZoomRemoteSetup(info);
    var html = gearListGenerateHtmlImpl(info);
    displayGearAndRequirements(html);
    ensureGearListActions();
    bindGearListCageListener();
    bindGearListEasyrigListener();
    bindGearListSliderBowlListener();
    bindGearListEyeLeatherListener();
    bindGearListProGaffTapeListener();
    bindGearListDirectorMonitorListener();
    saveCurrentSession();
    scheduleProjectAutoSave(true);
    closeDialog(projectDialog);
  });
}
function resolveLocalAppVersionForShare() {
  if (typeof ACTIVE_APP_VERSION === 'string') {
    var trimmedActive = ACTIVE_APP_VERSION.trim();
    if (trimmedActive) {
      return trimmedActive;
    }
  }
  if (typeof APP_VERSION === 'string') {
    var trimmed = APP_VERSION.trim();
    if (trimmed) {
      return trimmed;
    }
  }
  return '';
}
function createSharedProjectMetadata(_ref6) {
  var includeAutoGear = _ref6.includeAutoGear,
    hasAutoGearRules = _ref6.hasAutoGearRules,
    includeOwnedGearMarks = _ref6.includeOwnedGearMarks,
    hasOwnedGearMarkers = _ref6.hasOwnedGearMarkers;
  var metadata = {
    type: 'camera-power-planner/project-bundle',
    includesAutoGearRules: Boolean(includeAutoGear && hasAutoGearRules)
  };
  metadata.includesOwnedGearMarkers = Boolean(includeOwnedGearMarks && hasOwnedGearMarkers);
  var version = resolveLocalAppVersionForShare();
  if (version) {
    metadata.version = version;
  }
  try {
    var timestamp = new Date();
    if (!Number.isNaN(timestamp.valueOf())) {
      metadata.exportedAt = timestamp.toISOString();
    }
  } catch (error) {
    console.warn('Unable to capture export timestamp for shared project metadata.', error);
  }
  metadata.generator = 'Camera Power Planner';
  return metadata;
}
function hasOwnedGearItemsForExport(root) {
  var scope = root || gearListOutput;
  if (!scope || typeof scope.querySelector !== 'function') {
    return false;
  }
  return Boolean(scope.querySelector('[data-gear-own-gear-id]'));
}
function formatOwnedGearExportLabel(ownerName) {
  var _texts;
  var template = typeof getLocalizedText === 'function' ? getLocalizedText('gearListOwnedExportLabel') : '';
  var fallback = ((_texts = texts) === null || _texts === void 0 || (_texts = _texts.en) === null || _texts === void 0 ? void 0 : _texts.gearListOwnedExportLabel) || 'Owned by %s';
  var base = template && template.trim() ? template : fallback;
  if (!base.includes('%s')) {
    return "".concat(base, " ").concat(ownerName).trim();
  }
  return base.replace('%s', ownerName);
}
function collectOwnedGearMarkersForExport(root) {
  var scope = root || gearListOutput;
  if (!scope || typeof scope.querySelectorAll !== 'function') {
    return [];
  }
  var items = scope.querySelectorAll('[data-gear-own-gear-id]');
  var markers = [];
  items.forEach(function (element) {
    if (!element) return;
    var ownedId = element.getAttribute('data-gear-own-gear-id');
    if (!ownedId) return;
    var providerValue = element.getAttribute('data-gear-provider') || '';
    var providerLabel = element.getAttribute('data-gear-provider-label') || '';
    var info = getProviderInfo(providerValue, {
      label: providerLabel
    });
    var ownerDisplayName = function () {
      if (info.type === 'user') {
        return info.profileDisplayName || info.label || providerLabel || getGearProviderTexts().user || 'User';
      }
      if (info.type === 'contact') {
        return info.label || providerLabel;
      }
      return providerLabel || info.label || '';
    }().trim();
    var marker = {
      ownedId: ownedId,
      providerValue: info.value || providerValue,
      providerLabel: info.label || providerLabel,
      ownerDisplayName: ownerDisplayName,
      ownerProfileName: info.profileName || '',
      ownerType: info.type || '',
      contactId: info.contactId || '',
      gearName: element.getAttribute('data-gear-name') || ''
    };
    markers.push(marker);
  });
  return markers;
}
function applyOwnedGearMarkersToHtml(html, markers) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (!html || !markers || !markers.length) {
    return html;
  }
  var doc;
  try {
    doc = document.implementation.createHTMLDocument('');
  } catch (error) {
    void error;
  }
  if (!doc || !doc.body) {
    return html;
  }
  doc.body.innerHTML = html;
  var ownerLabelFallback = options.ownerLabelFallback || 'Owned';
  markers.forEach(function (marker) {
    var _element$classList;
    if (!marker || !marker.ownedId) {
      return;
    }
    // Properly escape backslashes and double quotes for use in CSS attribute selectors.
   var selectorId = typeof CSS !== 'undefined' && CSS && typeof CSS.escape === 'function'
       ? CSS.escape(marker.ownedId)
       // Fallback: escape backslash first, then double quotes.
       : marker.ownedId.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    var selector = "[data-gear-own-gear-id=\"".concat(selectorId, "\"]");
    var element = doc.body.querySelector(selector);
    if (!element) {
      return;
    }
    if (marker.ownerDisplayName) {
      element.setAttribute('data-gear-owned-export-label', marker.ownerDisplayName);
    } else {
      element.removeAttribute('data-gear-owned-export-label');
    }
    var previousBadges = element.querySelectorAll('[data-gear-owned-export]');
    previousBadges.forEach(function (badge) {
      if (badge && badge.parentElement) {
        badge.parentElement.removeChild(badge);
      }
    });
    var ownerName = marker.ownerDisplayName || ownerLabelFallback;
    var label = formatOwnedGearExportLabel(ownerName);
    var badge = doc.createElement('span');
    badge.className = 'gear-item-provider gear-item-owned-export';
    badge.setAttribute('data-gear-owned-export', 'true');
    badge.textContent = label;
    var isCustom = (_element$classList = element.classList) === null || _element$classList === void 0 ? void 0 : _element$classList.contains('gear-custom-item');
    var insertionRoot = isCustom ? element.querySelector('.gear-custom-item-summary') || element : element;
    var note = insertionRoot.querySelector('.gear-item-note');
    if (note && note.parentElement === insertionRoot) {
      insertionRoot.insertBefore(badge, note);
    } else {
      insertionRoot.appendChild(badge);
    }
  });
  return doc.body.innerHTML;
}
function downloadSharedProject(shareFileName, includeAutoGear, includeOwnedGear) {
  var _texts2;
  if (!shareFileName) return;
  var shareContext = getShareUiContext(this);
  var shareLinkMessage = shareContext.linkMessage;
  var shareIncludeAutoGearCheckbox = shareContext.includeAutoGearCheckbox;
  var shareIncludeAutoGearLabelElem = shareContext.includeAutoGearLabel;
  var setupName = getCurrentProjectName();
  var readPowerSelectValue = function readPowerSelectValue(select) {
    return select && typeof select.value === 'string' ? normalizePowerSelectionString(select.value) : '';
  };
  var normalizedBattery = readPowerSelectValue(batterySelect);
  var normalizedPlate = readPowerSelectValue(batteryPlateSelect);
  var normalizedHotswap = readPowerSelectValue(hotswapSelect);
  var currentSetup = {
    setupName: setupName,
    camera: cameraSelect.value,
    monitor: monitorSelect.value,
    video: videoSelect.value,
    cage: cageSelect.value,
    motors: motorSelects.map(function (sel) {
      return sel.value;
    }),
    controllers: controllerSelects.map(function (sel) {
      return sel.value;
    }),
    distance: distanceSelect.value,
    batteryPlate: normalizeBatteryPlateValue(normalizedPlate, normalizedBattery),
    battery: normalizedBattery,
    batteryHotswap: normalizedHotswap
  };
  var sharedPowerSelection = getPowerSelectionSnapshot();
  if (sharedPowerSelection) {
    currentSetup.powerSelection = sharedPowerSelection;
    currentSetup.battery = sharedPowerSelection.battery || '';
    currentSetup.batteryPlate = sharedPowerSelection.batteryPlate || '';
    currentSetup.batteryHotswap = sharedPowerSelection.batteryHotswap || '';
  }
  if (typeof getDiagramManualPositions === 'function') {
    var diagramPositions = getDiagramManualPositions();
    if (diagramPositions && Object.keys(diagramPositions).length) {
      currentSetup.diagramPositions = diagramPositions;
    }
  }
  var projectInfoCandidates = [];
  if (currentProjectInfo) {
    projectInfoCandidates.push(currentProjectInfo);
  }
  if (typeof loadProject === 'function') {
    var storageKeys = new Set();
    if (typeof setupName === 'string' && setupName) {
      storageKeys.add(setupName);
    }
    if (typeof getCurrentProjectStorageKey === 'function') {
      var storageKey = getCurrentProjectStorageKey({
        allowTyped: true
      });
      if (typeof storageKey === 'string' && storageKey) {
        storageKeys.add(storageKey);
      }
    }
    if (typeof getSetupNameState === 'function') {
      var nameState = getSetupNameState();
      if (nameState && _typeof(nameState) === 'object') {
        ['storageKey', 'selectedName', 'typedName'].forEach(function (prop) {
          var value = typeof nameState[prop] === 'string' ? nameState[prop].trim() : '';
          if (value) {
            storageKeys.add(value);
          }
        });
      }
    }
    storageKeys.forEach(function (key) {
      try {
        var storedProject = loadProject(key);
        if (storedProject && storedProject.projectInfo) {
          projectInfoCandidates.push(storedProject.projectInfo);
        }
      } catch (error) {
        console.warn('Unable to read project info for export from storage key', key, error);
      }
    });
  }
  var mergedProjectInfo = null;
  var projectInfoSnapshotForExport = null;
  projectInfoCandidates.forEach(function (candidate) {
    if (!candidate) return;
    if (!mergedProjectInfo) {
      mergedProjectInfo = cloneProjectInfoForStorage(candidate);
    } else {
      mergedProjectInfo = mergeProjectInfoSnapshots(mergedProjectInfo, candidate);
    }
  });
  if (mergedProjectInfo) {
    var snapshotForExport = typeof createProjectInfoSnapshotForStorage === 'function' ? createProjectInfoSnapshotForStorage(mergedProjectInfo, {
      projectNameOverride: setupName
    }) : mergedProjectInfo;
    var clonedSnapshot = cloneProjectInfoForStorage(snapshotForExport);
    if (clonedSnapshot && _typeof(clonedSnapshot) === 'object') {
      projectInfoSnapshotForExport = clonedSnapshot;
    }
  }
  var gearSelectors = cloneGearListSelectors(getGearListSelectors());
  if (Object.keys(gearSelectors).length) {
    currentSetup.gearSelectors = gearSelectors;
  }
  var ownedGearMarkers = includeOwnedGear ? collectOwnedGearMarkersForExport(gearListOutput) : [];
  var combinedHtml = gearListGetCurrentHtmlImpl();
  currentSetup.gearListAndProjectRequirementsGenerated = Boolean(combinedHtml);
  if (currentSetup.gearListAndProjectRequirementsGenerated) {
    var _gearListGetSafeHtmlS = gearListGetSafeHtmlSectionsImpl(combinedHtml),
      projectHtml = _gearListGetSafeHtmlS.projectHtml,
      gearHtml = _gearListGetSafeHtmlS.gearHtml;
    if (projectHtml) {
      currentSetup.projectHtml = projectHtml;
    }
    if (gearHtml) {
      var exportHtml = includeOwnedGear && ownedGearMarkers.length ? applyOwnedGearMarkersToHtml(gearHtml, ownedGearMarkers) : gearHtml;
      currentSetup.gearList = exportHtml;
      if (includeOwnedGear && ownedGearMarkers.length) {
        currentSetup.ownedGearMarkers = ownedGearMarkers.map(function (entry) {
          return _objectSpread({}, entry);
        });
      }
    }
  }
  if (currentSetup.gearListAndProjectRequirementsGenerated && projectInfoSnapshotForExport) {
    currentSetup.projectInfo = projectInfoSnapshotForExport;
  }
  var key = getCurrentSetupKey();
  var feedback = loadFeedbackSafe()[key] || [];
  if (feedback.length) {
    currentSetup.feedback = feedback;
  }
  var rulesForShare = getAutoGearRules();
  var hasAutoGearRules = Array.isArray(rulesForShare) && rulesForShare.length > 0;
  if (includeAutoGear && hasAutoGearRules) {
    currentSetup.autoGearRules = rulesForShare;
    var coverage = getAutoGearRuleCoverageSummary({
      rules: rulesForShare
    });
    if (coverage) {
      currentSetup.autoGearCoverage = coverage;
    }
  }
  var metadata = createSharedProjectMetadata({
    includeAutoGear: includeAutoGear,
    hasAutoGearRules: hasAutoGearRules,
    includeOwnedGearMarks: includeOwnedGear,
    hasOwnedGearMarkers: ownedGearMarkers.length > 0
  });
  if (metadata && _typeof(metadata) === 'object') {
    currentSetup.metadata = metadata;
  }
  var notifyShareFailure = function notifyShareFailure(error) {
    if (error) {
      console.warn('Project export failed', error);
    } else {
      console.warn('Project export failed');
    }
    var failureMessage = getLocalizedText('shareExportFailed') || 'Project export failed.';
    if (shareLinkMessage) {
      shareLinkMessage.textContent = failureMessage;
      setStatusLevel(shareLinkMessage, 'danger');
      shareLinkMessage.classList.remove('hidden');
      if (typeof setTimeout === 'function') {
        setTimeout(function () {
          return shareLinkMessage.classList.add('hidden');
        }, 6000);
      }
    } else if (typeof alert === 'function') {
      alert(failureMessage);
    }
  };
  var json;
  try {
    json = JSON.stringify(currentSetup, null, 2);
  } catch (serializationError) {
    console.error('Failed to serialize shared project', serializationError);
    notifyShareFailure(serializationError);
    return;
  }
  var downloadResult = downloadBackupPayload(json, shareFileName);
  if (shareIncludeAutoGearCheckbox) {
    shareIncludeAutoGearCheckbox.checked = includeAutoGear && hasAutoGearRules;
  }
  if (shareContext.includeOwnedGearCheckbox) {
    shareContext.includeOwnedGearCheckbox.checked = includeOwnedGear && ownedGearMarkers.length > 0;
  }
  if (!downloadResult || !downloadResult.success) {
    notifyShareFailure();
    return;
  }
  if (downloadResult.method === 'window-fallback') {
    var manualMessage = typeof getManualDownloadFallbackMessage === 'function' ? getManualDownloadFallbackMessage() : getLocalizedText('manualDownloadFallback') || 'The download did not start automatically. A new tab opened so you can copy or save the file manually.';
    if (shareLinkMessage) {
      shareLinkMessage.textContent = manualMessage;
      setStatusLevel(shareLinkMessage, 'warning');
      shareLinkMessage.classList.remove('hidden');
      if (typeof setTimeout === 'function') {
        setTimeout(function () {
          return shareLinkMessage.classList.add('hidden');
        }, 8000);
      }
    } else if (typeof alert === 'function') {
      alert(manualMessage);
    }
    return;
  }
  var successMessage = typeof getLocalizedText === 'function' && getLocalizedText('shareLinkCopied') || ((_texts2 = texts) === null || _texts2 === void 0 || (_texts2 = _texts2.en) === null || _texts2 === void 0 ? void 0 : _texts2.shareLinkCopied) || 'Project file downloaded.';
  if (shareLinkMessage) {
    shareLinkMessage.textContent = successMessage;
    setStatusLevel(shareLinkMessage, 'success');
    shareLinkMessage.classList.remove('hidden');
    if (typeof setTimeout === 'function') {
      setTimeout(function () {
        return shareLinkMessage.classList.add('hidden');
      }, 4000);
    }
  } else if (typeof alert === 'function') {
    alert(successMessage);
  }
}
var ownGearNameCache = null;
function getGearProviderTexts() {
  var textsForDialog = getGearItemEditTexts();
  return {
    rental: textsForDialog.providerRental || 'Rental house',
    user: textsForDialog.providerUser || 'User',
    crewHeading: textsForDialog.providerCrewHeading || 'Crew',
    unknown: textsForDialog.providerUnknown || 'Custom provider',
    help: textsForDialog.providerHelp || ''
  };
}
function refreshOwnGearNameCache() {
  ownGearNameCache = {
    names: new Set(),
    timestamp: Date.now()
  };
  if (typeof loadOwnGear !== 'function') {
    return ownGearNameCache.names;
  }
  try {
    var items = loadOwnGear();
    if (Array.isArray(items)) {
      items.forEach(function (item) {
        if (item && typeof item.name === 'string') {
          var trimmed = item.name.trim().toLowerCase();
          if (trimmed) {
            ownGearNameCache.names.add(trimmed);
          }
        }
      });
    }
  } catch (error) {
    console.warn('Unable to refresh own gear cache for provider defaults', error);
  }
  return ownGearNameCache.names;
}
function getOwnGearNameSet() {
  if (!ownGearNameCache || !(ownGearNameCache.names instanceof Set)) {
    return refreshOwnGearNameCache();
  }
  return ownGearNameCache.names;
}
var OWN_GEAR_SOURCE_CATALOG_VALUE = typeof OWN_GEAR_SOURCE_CATALOG === 'string' && OWN_GEAR_SOURCE_CATALOG ? OWN_GEAR_SOURCE_CATALOG : 'catalog';
var OWN_GEAR_SOURCE_CUSTOM_VALUE = typeof OWN_GEAR_SOURCE_CUSTOM === 'string' && OWN_GEAR_SOURCE_CUSTOM ? OWN_GEAR_SOURCE_CUSTOM : 'custom';
function resolveOwnGearFeatureModuleForEditor() {
  if (typeof resolveOwnGearModule === 'function') {
    try {
      var moduleApi = resolveOwnGearModule();
      if (moduleApi && _typeof(moduleApi) === 'object') {
        return moduleApi;
      }
    } catch (error) {
      void error;
    }
  }
  var scope = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
  if (scope && _typeof(scope.cineFeaturesOwnGear) === 'object' && scope.cineFeaturesOwnGear) {
    return scope.cineFeaturesOwnGear;
  }
  if ((typeof cineFeaturesOwnGear === "undefined" ? "undefined" : _typeof(cineFeaturesOwnGear)) === 'object' && cineFeaturesOwnGear) {
    return cineFeaturesOwnGear;
  }
  return null;
}
function generateOwnGearIdForEditor() {
  var moduleApi = resolveOwnGearFeatureModuleForEditor();
  if (moduleApi && typeof moduleApi.generateOwnGearId === 'function') {
    try {
      return moduleApi.generateOwnGearId();
    } catch (error) {
      void error;
    }
  }
  if (typeof generateOwnGearId === 'function') {
    try {
      return generateOwnGearId();
    } catch (error) {
      void error;
    }
  }
  var timePart = Date.now().toString(36);
  var randomPart = Math.floor(Math.random() * 1e8).toString(36);
  return "own-".concat(timePart, "-").concat(randomPart);
}
function normalizeOwnGearRecordForEditor(entry) {
  if (!entry || _typeof(entry) !== 'object') {
    return null;
  }
  var moduleApi = resolveOwnGearFeatureModuleForEditor();
  if (moduleApi && typeof moduleApi.normalizeOwnGearRecord === 'function') {
    try {
      return moduleApi.normalizeOwnGearRecord(entry);
    } catch (error) {
      void error;
    }
  }
  if (typeof normalizeOwnGearRecord === 'function') {
    try {
      return normalizeOwnGearRecord(entry);
    } catch (error) {
      void error;
    }
  }
  var rawName = typeof entry.name === 'string' ? entry.name.trim() : '';
  if (!rawName) {
    return null;
  }
  var normalized = {
    id: typeof entry.id === 'string' && entry.id.trim() ? entry.id.trim() : generateOwnGearIdForEditor(),
    name: rawName
  };
  if (typeof entry.quantity === 'string' && entry.quantity.trim()) {
    normalized.quantity = entry.quantity.trim();
  } else if (typeof entry.quantity === 'number' && Number.isFinite(entry.quantity)) {
    normalized.quantity = String(entry.quantity);
  }
  if (typeof entry.notes === 'string' && entry.notes.trim()) {
    normalized.notes = entry.notes.trim();
  }
  if (typeof entry.source === 'string' && entry.source.trim()) {
    normalized.source = entry.source.trim();
  }
  return normalized;
}
function cloneOwnGearRecords(records) {
  return Array.isArray(records) ? records.map(function (item) {
    return normalizeOwnGearRecordForEditor(item);
  }).filter(Boolean).map(function (item) {
    return _objectSpread({}, item);
  }) : [];
}
function loadOwnGearRecordsForEditor() {
  var moduleApi = resolveOwnGearFeatureModuleForEditor();
  if (moduleApi && typeof moduleApi.loadStoredOwnGearItems === 'function') {
    try {
      var loaded = moduleApi.loadStoredOwnGearItems();
      if (Array.isArray(loaded)) {
        return cloneOwnGearRecords(loaded);
      }
    } catch (error) {
      console.warn('Unable to load own gear items for gear editor via module.', error);
    }
  }
  if (typeof loadOwnGear === 'function') {
    try {
      var stored = loadOwnGear();
      if (Array.isArray(stored)) {
        return cloneOwnGearRecords(stored);
      }
    } catch (error) {
      console.warn('Unable to load own gear items for gear editor from storage.', error);
    }
  }
  return [];
}
function persistOwnGearRecordsForEditor(records) {
  var normalized = Array.isArray(records) ? records.map(function (item) {
    return normalizeOwnGearRecordForEditor(item);
  }).filter(Boolean) : [];
  var moduleApi = resolveOwnGearFeatureModuleForEditor();
  if (moduleApi && typeof moduleApi.persistOwnGearItems === 'function') {
    try {
      moduleApi.persistOwnGearItems(normalized);
      return true;
    } catch (error) {
      console.warn('Unable to persist own gear items via module for gear editor.', error);
    }
  }
  if (typeof saveOwnGear === 'function') {
    try {
      saveOwnGear(normalized);
      if (typeof document !== 'undefined' && typeof document.dispatchEvent === 'function' && typeof CustomEvent === 'function') {
        document.dispatchEvent(new CustomEvent('own-gear-data-changed'));
      }
      return true;
    } catch (error) {
      console.warn('Unable to persist own gear items via storage for gear editor.', error);
    }
  }
  return false;
}
function lookupOwnGearRecord(records, id, name) {
  if (!Array.isArray(records)) {
    return {
      index: -1,
      record: null
    };
  }
  var sanitizedId = typeof id === 'string' ? id.trim() : '';
  var sanitizedName = typeof name === 'string' ? name.trim().toLowerCase() : '';
  var index = -1;
  if (sanitizedId) {
    index = records.findIndex(function (entry) {
      return entry && entry.id === sanitizedId;
    });
  }
  if (index === -1 && sanitizedName) {
    index = records.findIndex(function (entry) {
      if (!entry || typeof entry.name !== 'string') {
        return false;
      }
      return entry.name.trim().toLowerCase() === sanitizedName;
    });
  }
  return {
    index: index,
    record: index >= 0 ? records[index] : null
  };
}
function deriveOwnGearSourceForElement(element) {
  if (!element || _typeof(element) !== 'object' || !element.classList) {
    return OWN_GEAR_SOURCE_CATALOG_VALUE;
  }
  return element.classList.contains('gear-custom-item') ? OWN_GEAR_SOURCE_CUSTOM_VALUE : OWN_GEAR_SOURCE_CATALOG_VALUE;
}
function syncGearItemOwnedState(element, data) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var wantsOwned = Boolean(options && options.wantsOwned);
  var existingId = options && typeof options.existingId === 'string' ? options.existingId.trim() : '';
  var records = loadOwnGearRecordsForEditor();
  var name = typeof data.name === 'string' ? data.name.trim() : '';
  var quantityValue = typeof data.quantity === 'string' ? data.quantity.trim() : '';
  var _lookupOwnGearRecord = lookupOwnGearRecord(records, existingId, name),
    index = _lookupOwnGearRecord.index,
    record = _lookupOwnGearRecord.record;
  if (wantsOwned && name) {
    if (record && index >= 0) {
      var changed = false;
      var updated = _objectSpread({}, record);
      if (record.name !== name) {
        updated.name = name;
        changed = true;
      }
      if (quantityValue) {
        if (record.quantity !== quantityValue) {
          updated.quantity = quantityValue;
          changed = true;
        }
      } else if (record.quantity) {
        delete updated.quantity;
        changed = true;
      }
      var _desiredSource = deriveOwnGearSourceForElement(element);
      if (_desiredSource && record.source !== _desiredSource) {
        updated.source = _desiredSource;
        changed = true;
      }
      if (!changed) {
        return {
          id: record.id,
          changed: false
        };
      }
      var normalized = normalizeOwnGearRecordForEditor(updated);
      if (!normalized) {
        return {
          id: record.id,
          changed: false
        };
      }
      var _nextRecords = records.slice();
      _nextRecords[index] = normalized;
      if (!persistOwnGearRecordsForEditor(_nextRecords)) {
        return {
          id: record.id,
          changed: false
        };
      }
      return {
        id: normalized.id,
        changed: true
      };
    }
    var newEntry = {
      id: generateOwnGearIdForEditor(),
      name: name
    };
    if (quantityValue) {
      newEntry.quantity = quantityValue;
    }
    var desiredSource = deriveOwnGearSourceForElement(element);
    if (desiredSource) {
      newEntry.source = desiredSource;
    }
    var normalizedEntry = normalizeOwnGearRecordForEditor(newEntry);
    if (!normalizedEntry) {
      return {
        id: '',
        changed: false
      };
    }
    var _nextRecords2 = records.slice();
    _nextRecords2.push(normalizedEntry);
    if (!persistOwnGearRecordsForEditor(_nextRecords2)) {
      return {
        id: '',
        changed: false
      };
    }
    return {
      id: normalizedEntry.id,
      changed: true
    };
  }
  if (!record || index < 0) {
    return {
      id: '',
      changed: false
    };
  }
  var nextRecords = records.filter(function (entry, entryIndex) {
    return entryIndex !== index;
  });
  if (!persistOwnGearRecordsForEditor(nextRecords)) {
    return {
      id: record.id,
      changed: false
    };
  }
  return {
    id: '',
    changed: true
  };
}
function findOwnedRecordForGearItem(element) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var dataName = typeof options.name === 'string' ? options.name.trim() : '';
  var existingId = typeof options.existingId === 'string' ? options.existingId.trim() : '';
  var records = loadOwnGearRecordsForEditor();
  return lookupOwnGearRecord(records, existingId, dataName).record;
}
function guessDefaultProvider(name) {
  var trimmed = typeof name === 'string' ? name.trim() : '';
  if (!trimmed) {
    return 'rental-house';
  }
  var lookup = getOwnGearNameSet();
  if (lookup.has(trimmed.toLowerCase())) {
    return 'user';
  }
  return 'rental-house';
}
function ensureGearItemProviderElement(element) {
  var _element$classList2;
  if (!element) return null;
  var providerSpan = element.querySelector('.gear-item-provider');
  if (providerSpan) {
    return providerSpan;
  }
  var doc = element.ownerDocument || (typeof document !== 'undefined' ? document : null);
  if (!doc) return null;
  providerSpan = doc.createElement('span');
  providerSpan.className = 'gear-item-provider';
  providerSpan.hidden = true;
  var isCustom = (_element$classList2 = element.classList) === null || _element$classList2 === void 0 ? void 0 : _element$classList2.contains('gear-custom-item');
  if (isCustom) {
    var summary = element.querySelector('.gear-custom-item-summary');
    var note = element.querySelector('.gear-item-note');
    if (summary) {
      if (note) {
        summary.insertBefore(providerSpan, note);
      } else {
        summary.appendChild(providerSpan);
      }
      return providerSpan;
    }
  }
  var reference = element.querySelector('.gear-item-note') || element.querySelector('.gear-item-edit-btn') || element.querySelector('.gear-custom-item-actions') || element.querySelector('.gear-custom-remove-btn');
  if (reference && reference.parentElement) {
    reference.parentElement.insertBefore(providerSpan, reference);
  } else {
    element.appendChild(providerSpan);
  }
  return providerSpan;
}
function formatUserProfileProviderName(rawName) {
  var trimmed = typeof rawName === 'string' ? rawName.trim() : '';
  if (!trimmed) {
    return '';
  }
  var parts = trimmed.split(/\s+/).filter(Boolean);
  if (!parts.length) {
    return '';
  }
  var firstName = parts[0];
  if (parts.length === 1) {
    return firstName;
  }
  var lastPart = parts[parts.length - 1];
  var lastInitial = Array.from(lastPart)[0] || '';
  if (!lastInitial) {
    return firstName;
  }
  var normalizedInitial = typeof lastInitial.toLocaleUpperCase === 'function' ? lastInitial.toLocaleUpperCase() : lastInitial.toUpperCase();
  return "".concat(firstName, " ").concat(normalizedInitial);
}
function getProviderInfo(value) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var trimmed = typeof value === 'string' ? value.trim() : '';
  var texts = getGearProviderTexts();
  if (!trimmed) {
    return {
      value: '',
      label: '',
      type: ''
    };
  }
  if (trimmed === 'rental-house') {
    return {
      value: 'rental-house',
      label: texts.rental,
      type: 'rental'
    };
  }
  if (trimmed === 'user') {
    var profile = typeof getUserProfileSnapshot === 'function' ? getUserProfileSnapshot() : null;
    var profileName = profile && profile.name ? profile.name : '';
    var profileDisplayName = formatUserProfileProviderName(profileName);
    var label = profileDisplayName ? "".concat(profileDisplayName, " \u2014 ").concat(texts.user) : options.label || texts.user;
    return {
      value: 'user',
      label: label,
      type: 'user',
      profileName: profileName,
      profileDisplayName: profileDisplayName
    };
  }
  if (trimmed.startsWith('contact:')) {
    var contactId = trimmed.slice('contact:'.length);
    var contact = typeof getContactById === 'function' ? getContactById(contactId) : null;
    if (contact) {
      var _label = typeof getContactDisplayLabel === 'function' ? getContactDisplayLabel(contact) : contact.name || contact.email || contact.phone || contact.id || texts.crewHeading;
      return {
        value: trimmed,
        label: _label,
        type: 'contact',
        contactId: contactId
      };
    }
    var fallback = options && options.label || (typeof getContactsText === 'function' ? getContactsText('missingContactFallback', 'Saved contact') : 'Saved contact');
    return {
      value: trimmed,
      label: fallback,
      type: 'contact',
      contactId: contactId,
      missing: true
    };
  }
  return {
    value: trimmed,
    label: options && options.label ? options.label : texts.unknown,
    type: 'custom'
  };
}
function setGearItemProvider(element, providerValue) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (!element) return;
  var info = getProviderInfo(providerValue || element.getAttribute('data-gear-provider') || '', {
    label: options.label
  });
  if (info.value) {
    element.setAttribute('data-gear-provider', info.value);
  } else {
    element.removeAttribute('data-gear-provider');
  }
  if (info.label) {
    element.setAttribute('data-gear-provider-label', info.label);
  } else {
    element.removeAttribute('data-gear-provider-label');
  }
  var badge = ensureGearItemProviderElement(element);
  if (!badge) return;
  if (info.label) {
    badge.textContent = info.label;
    badge.hidden = false;
    badge.setAttribute('data-provider-type', info.type || '');
    badge.setAttribute('title', info.label);
    badge.setAttribute('data-help', info.label);
  } else {
    badge.textContent = '';
    badge.hidden = true;
    badge.removeAttribute('data-provider-type');
    badge.removeAttribute('title');
    badge.removeAttribute('data-help');
  }
}
function getProviderOptionLabel(option) {
  if (!option) return '';
  return option.textContent ? option.textContent.trim() : option.value;
}
function updateGearItemEditProviderOptions(context) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (!context || !context.providerSelect) return;
  var select = context.providerSelect;
  while (select.firstChild) {
    select.removeChild(select.firstChild);
  }
  var texts = getGearProviderTexts();
  var profile = typeof getUserProfileSnapshot === 'function' ? getUserProfileSnapshot() : null;
  var contacts = typeof getContactsSnapshot === 'function' ? getContactsSnapshot() : [];
  var doc = select.ownerDocument || (typeof document !== 'undefined' ? document : null);
  if (!doc) return;
  var rentalOption = doc.createElement('option');
  rentalOption.value = 'rental-house';
  rentalOption.textContent = texts.rental;
  select.appendChild(rentalOption);
  var userOption = doc.createElement('option');
  userOption.value = 'user';
  var profileName = profile && profile.name ? profile.name : '';
  var profileDisplayName = formatUserProfileProviderName(profileName);
  userOption.textContent = profileDisplayName ? "".concat(profileDisplayName, " \u2014 ").concat(texts.user) : texts.user;
  select.appendChild(userOption);
  if (contacts.length) {
    var group = doc.createElement('optgroup');
    group.label = texts.crewHeading;
    contacts.forEach(function (contact) {
      var option = doc.createElement('option');
      option.value = "contact:".concat(contact.id);
      option.textContent = contact.label || contact.name || contact.email || contact.phone || contact.id;
      group.appendChild(option);
    });
    select.appendChild(group);
  }
  var selectedValue = typeof data.providedBy === 'string' && data.providedBy.trim() ? data.providedBy.trim() : guessDefaultProvider(data.name || '');
  if (selectedValue && !Array.from(select.options).some(function (option) {
    return option.value === selectedValue;
  })) {
    var fallbackOption = doc.createElement('option');
    fallbackOption.value = selectedValue;
    fallbackOption.textContent = data.providerLabel || (typeof getContactsText === 'function' ? getContactsText('missingContactFallback', 'Saved contact') : texts.unknown);
    fallbackOption.setAttribute('data-provider-fallback', 'true');
    select.appendChild(fallbackOption);
  }
  select.value = selectedValue || 'rental-house';
}
function updateGearItemEditCameraLinkOptions(context) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (!context || !context.cameraLinkSelect) return;
  var select = context.cameraLinkSelect;
  while (select.firstChild) {
    select.removeChild(select.firstChild);
  }
  var doc = select.ownerDocument || (typeof document !== 'undefined' ? document : null);
  if (!doc) return;
  var texts = getGearItemEditTexts();
  var isCameraItem = Boolean(context.isCameraItem);
  if (isCameraItem) {
    CAMERA_LINK_LETTERS.forEach(function (letter) {
      var option = doc.createElement('option');
      option.value = letter;
      var labelTemplate = texts.cameraLinkDefaultLabel || 'Camera %s';
      option.textContent = labelTemplate.replace('%s', letter);
      option.dataset.cameraLabel = labelTemplate.replace('%s', letter);
      select.appendChild(option);
    });
    var desiredLetter = normalizeCameraLetter(typeof data.cameraLink === 'string' && data.cameraLink ? data.cameraLink : context.currentCameraLinkValue || '') || 'A';
    select.value = desiredLetter;
    select.disabled = false;
    select.removeAttribute('aria-disabled');
    return;
  }
  var noneOption = doc.createElement('option');
  noneOption.value = '';
  noneOption.textContent = texts.cameraLinkNoneOption || 'No camera link';
  select.appendChild(noneOption);
  var cameraEntries = collectCameraSourceEntries();
  var entryMap = new Map();
  cameraEntries.forEach(function (entry) {
    if (!entry || !entry.letter) return;
    entryMap.set(entry.letter, entry);
  });
  CAMERA_LINK_LETTERS.forEach(function (letter) {
    var option = doc.createElement('option');
    option.value = letter;
    var entry = entryMap.get(letter);
    var assignedTemplate = texts.cameraLinkCameraOption || 'Camera %s — %s';
    var unavailableTemplate = texts.cameraLinkUnavailableOption || 'Camera %s (unassigned)';
    var label = entry && entry.label ? assignedTemplate.replace('%s', letter).replace('%s', entry.label) : unavailableTemplate.replace('%s', letter);
    option.textContent = label;
    var storedCameraLabel = typeof data.cameraLinkLabel === 'string' ? data.cameraLinkLabel.trim() : '';
    if (entry && entry.label) {
      option.dataset.cameraLabel = entry.label;
    } else if (storedCameraLabel && normalizeCameraLetter(data.cameraLink) === letter) {
      option.dataset.cameraLabel = storedCameraLabel;
    } else {
      var defaultLabelTemplate = texts.cameraLinkDefaultLabel || 'Camera %s';
      option.dataset.cameraLabel = defaultLabelTemplate.replace('%s', letter);
    }
    option.dataset.cameraColor = getCameraLetterColor(letter);
    select.appendChild(option);
  });
  var desiredValue = normalizeCameraLetter(typeof data.cameraLink === 'string' && data.cameraLink ? data.cameraLink : context.currentCameraLinkValue || '');
  select.value = desiredValue || '';
}
function refreshGearItemProviderDisplays(scope) {
  var root = scope || gearListOutput;
  if (!root) return;
  var items = root.querySelectorAll('.gear-item, .gear-custom-item');
  items.forEach(function (element) {
    var data = getGearItemData(element);
    setGearItemProvider(element, data.providedBy, {
      label: data.providerLabel
    });
  });
  refreshRentalProviderNoteDisplays();
}
function handleShareSetupClick() {
  var shareContext = getShareUiContext(this);
  var shareDialog = shareContext.dialog;
  var shareForm = shareContext.form;
  var shareFilenameInput = shareContext.filenameInput;
  var shareFilenameMessage = shareContext.filenameMessage;
  var shareIncludeAutoGearCheckbox = shareContext.includeAutoGearCheckbox;
  var shareIncludeAutoGearLabelElem = shareContext.includeAutoGearLabel;
  saveCurrentGearList();
  var setupName = getCurrentProjectName();
  var defaultName = getDefaultShareFilename(setupName);
  var defaultFilename = ensureJsonExtension(defaultName);
  if (!shareDialog || !shareForm || !shareFilenameInput) {
    var shareFileName = promptForSharedFilename(setupName);
    if (!shareFileName) {
      return;
    }
    var _rulesForShare = getAutoGearRules();
    var _hasAutoGearRules = Array.isArray(_rulesForShare) && _rulesForShare.length > 0;
    var includeAutoGear = _hasAutoGearRules ? confirmAutoGearSelection(shareIncludeAutoGearCheckbox ? shareIncludeAutoGearCheckbox.checked : false) : false;
    if (shareIncludeAutoGearCheckbox) {
      shareIncludeAutoGearCheckbox.checked = includeAutoGear && _hasAutoGearRules;
    }
    var _hasOwnedGearForExport = hasOwnedGearItemsForExport(gearListOutput);
    var includeOwnedGear = _hasOwnedGearForExport;
    if (shareContext.includeOwnedGearCheckbox) {
      shareContext.includeOwnedGearCheckbox.checked = includeOwnedGear && _hasOwnedGearForExport;
    }
    downloadSharedProject(shareFileName, includeAutoGear, includeOwnedGear);
    return;
  }
  shareFilenameInput.value = defaultFilename;
  shareFilenameInput.setCustomValidity('');
  if (shareFilenameMessage) {
    var template = getLocalizedText('shareFilenamePrompt') || '';
    shareFilenameMessage.textContent = template.includes('{defaultName}') ? template.replace('{defaultName}', defaultName) : template;
  }
  var rulesForShare = getAutoGearRules();
  var hasAutoGearRules = Array.isArray(rulesForShare) && rulesForShare.length > 0;
  var hasOwnedGearForExport = hasOwnedGearItemsForExport(gearListOutput);
  if (shareIncludeAutoGearCheckbox) {
    shareIncludeAutoGearCheckbox.disabled = !hasAutoGearRules;
    shareIncludeAutoGearCheckbox.setAttribute('aria-disabled', hasAutoGearRules ? 'false' : 'true');
    if (!hasAutoGearRules) {
      shareIncludeAutoGearCheckbox.checked = false;
    }
  }
  if (shareIncludeAutoGearLabelElem) {
    shareIncludeAutoGearLabelElem.classList.toggle('disabled', !hasAutoGearRules);
    shareIncludeAutoGearLabelElem.setAttribute('aria-disabled', !hasAutoGearRules ? 'true' : 'false');
  }
  var shareIncludeOwnedGearCheckbox = shareContext.includeOwnedGearCheckbox;
  var shareIncludeOwnedGearLabelElem = shareContext.includeOwnedGearLabel;
  if (shareIncludeOwnedGearCheckbox) {
    shareIncludeOwnedGearCheckbox.disabled = !hasOwnedGearForExport;
    shareIncludeOwnedGearCheckbox.setAttribute('aria-disabled', hasOwnedGearForExport ? 'false' : 'true');
    shareIncludeOwnedGearCheckbox.checked = hasOwnedGearForExport;
  }
  if (shareIncludeOwnedGearLabelElem) {
    shareIncludeOwnedGearLabelElem.classList.toggle('disabled', !hasOwnedGearForExport);
    shareIncludeOwnedGearLabelElem.setAttribute('aria-disabled', !hasOwnedGearForExport ? 'true' : 'false');
  }
  openDialog(shareDialog);
  if (typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(function () {
      if (shareFilenameInput) {
        shareFilenameInput.focus();
        shareFilenameInput.select();
      }
    });
  } else if (shareFilenameInput) {
    setTimeout(function () {
      shareFilenameInput.focus();
      shareFilenameInput.select();
    }, 0);
  }
}
var shareSetupButton = resolveElementById('shareSetupBtn', 'shareSetupBtn');
if (shareSetupButton) {
  shareSetupButton.addEventListener('click', handleShareSetupClick);
}
function handleShareFormSubmit(event) {
  event.preventDefault();
  var shareContext = getShareUiContext(this);
  var shareFilenameInput = shareContext.filenameInput;
  var shareDialog = shareContext.dialog;
  var shareIncludeAutoGearCheckbox = shareContext.includeAutoGearCheckbox;
  var shareIncludeOwnedGearCheckbox = shareContext.includeOwnedGearCheckbox;
  if (!shareFilenameInput) return;
  var sanitized = sanitizeShareFilename(shareFilenameInput.value);
  if (!sanitized) {
    var invalidMessage = getLocalizedText('shareFilenameInvalid') || 'Please enter a valid file name to continue.';
    shareFilenameInput.setCustomValidity(invalidMessage);
    shareFilenameInput.reportValidity();
    return;
  }
  shareFilenameInput.setCustomValidity('');
  var shareFileName = ensureJsonExtension(sanitized);
  var includeAutoGear = !!(shareIncludeAutoGearCheckbox && !shareIncludeAutoGearCheckbox.disabled && shareIncludeAutoGearCheckbox.checked);
  var includeOwnedGear = !!(shareIncludeOwnedGearCheckbox && !shareIncludeOwnedGearCheckbox.disabled && shareIncludeOwnedGearCheckbox.checked);
  closeDialog(shareDialog);
  downloadSharedProject(shareFileName, includeAutoGear, includeOwnedGear);
}
function handleShareCancelClick() {
  var shareContext = getShareUiContext(this);
  var shareFilenameInput = shareContext.filenameInput;
  var shareDialog = shareContext.dialog;
  if (shareFilenameInput) {
    shareFilenameInput.setCustomValidity('');
  }
  closeDialog(shareDialog);
}
function handleShareDialogCancel(event) {
  event.preventDefault();
  var shareContext = getShareUiContext(this);
  var shareFilenameInput = shareContext.filenameInput;
  var shareDialog = shareContext.dialog;
  if (shareFilenameInput) {
    shareFilenameInput.setCustomValidity('');
  }
  closeDialog(shareDialog);
}
var initialShareUiContext = getShareUiContext();
if (initialShareUiContext.form) {
  initialShareUiContext.form.addEventListener('submit', handleShareFormSubmit);
}
if (initialShareUiContext.cancelButton) {
  initialShareUiContext.cancelButton.addEventListener('click', handleShareCancelClick);
}
if (initialShareUiContext.dialog) {
  initialShareUiContext.dialog.addEventListener('cancel', handleShareDialogCancel);
}
function handleSharedLinkInputChange() {
  var shareContext = getShareUiContext(this);
  var sharedLinkInput = shareContext.sharedLinkInput;
  if (!sharedLinkInput || pendingSharedLinkListener) return;
  var file = sharedLinkInput.files && sharedLinkInput.files[0];
  if (file) {
    readSharedProjectFile(file);
  }
}
function handleApplySharedLinkClick() {
  var shareContext = getShareUiContext(this);
  var sharedLinkInput = shareContext.sharedLinkInput;
  if (!sharedLinkInput) {
    return;
  }
  if (pendingSharedLinkListener) {
    sharedLinkInput.removeEventListener('change', pendingSharedLinkListener);
    pendingSharedLinkListener = null;
  }
  var _handleSelection = function handleSelection() {
    sharedLinkInput.removeEventListener('change', _handleSelection);
    pendingSharedLinkListener = null;
    var file = sharedLinkInput.files && sharedLinkInput.files[0];
    if (file) {
      readSharedProjectFile(file);
    }
  };
  pendingSharedLinkListener = _handleSelection;
  sharedLinkInput.addEventListener('change', _handleSelection);
  sharedLinkInput.value = '';
  sharedLinkInput.click();
  if (sharedLinkInput.files && sharedLinkInput.files.length) {
    _handleSelection();
  }
}
if (initialShareUiContext.sharedLinkInput) {
  initialShareUiContext.sharedLinkInput.addEventListener('change', handleSharedLinkInputChange);
}
if (initialShareUiContext.applySharedLinkButton && initialShareUiContext.sharedLinkInput) {
  initialShareUiContext.applySharedLinkButton.addEventListener('click', handleApplySharedLinkClick);
}
function handleSharedImportModeChange() {
  if (sharedImportPromptActive) return;
  if (lastSharedSetupData === null) return;
  reapplySharedImportSelection();
}
function handleSharedImportSubmit(event) {
  event.preventDefault();
  finalizeSharedImportPrompt();
  applyStoredSharedImport();
}
function handleSharedImportCancel() {
  finalizeSharedImportPrompt();
  clearStoredSharedImportData();
}
function handleSharedImportDialogCancel(event) {
  event.preventDefault();
  finalizeSharedImportPrompt();
  clearStoredSharedImportData();
}
var initialSharedImportUiContext = getSharedImportUiContext();
if (initialSharedImportUiContext.modeSelect) {
  initialSharedImportUiContext.modeSelect.addEventListener('change', handleSharedImportModeChange);
}
if (initialSharedImportUiContext.form) {
  initialSharedImportUiContext.form.addEventListener('submit', handleSharedImportSubmit);
}
if (initialSharedImportUiContext.cancelButton) {
  initialSharedImportUiContext.cancelButton.addEventListener('click', handleSharedImportCancel);
}
if (initialSharedImportUiContext.dialog) {
  initialSharedImportUiContext.dialog.addEventListener('cancel', handleSharedImportDialogCancel);
}
enqueueCineUiRegistration(registerSetupsCineUiInternal);
function getSafeLanguageTexts() {
  var scope = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
  var allTexts = typeof texts !== 'undefined' && texts || (scope && _typeof(scope.texts) === 'object' ? scope.texts : null);
  var resolvedLang = typeof currentLang === 'string' && allTexts && _typeof(allTexts[currentLang]) === 'object' ? currentLang : 'en';
  var langTexts = allTexts && _typeof(allTexts[resolvedLang]) === 'object' && allTexts[resolvedLang] || {};
  var fallbackTexts = allTexts && _typeof(allTexts.en) === 'object' && allTexts.en || {};
  return {
    langTexts: langTexts,
    fallbackTexts: fallbackTexts
  };
}
function registerSetupsCineUiInternal(cineUi) {
  if (!cineUi || setupsCineUiRegistered) {
    return;
  }
  var shareContext = getShareUiContext();
  var sharedImportContext = getSharedImportUiContext();
  registerCineUiEntries(cineUi.controllers, [{
    name: 'shareDialog',
    value: {
      context: shareContext,
      open: handleShareSetupClick,
      submit: handleShareFormSubmit,
      cancel: handleShareCancelClick,
      dismiss: handleShareDialogCancel
    }
  }, {
    name: 'sharedImportDialog',
    value: {
      context: sharedImportContext,
      submit: handleSharedImportSubmit,
      cancel: handleSharedImportCancel,
      dismiss: handleSharedImportDialogCancel,
      changeMode: handleSharedImportModeChange
    }
  }], 'cineUi controller registration (setups) failed');
  registerCineUiEntries(cineUi.interactions, [{
    name: 'shareOpen',
    value: handleShareSetupClick
  }, {
    name: 'shareSubmit',
    value: handleShareFormSubmit
  }, {
    name: 'shareCancel',
    value: handleShareCancelClick
  }, {
    name: 'shareApplyFile',
    value: handleApplySharedLinkClick
  }, {
    name: 'shareInputChange',
    value: handleSharedLinkInputChange
  }, {
    name: 'sharedImportSubmit',
    value: handleSharedImportSubmit
  }, {
    name: 'sharedImportCancel',
    value: handleSharedImportCancel
  }], 'cineUi interaction registration (setups) failed');
  registerCineUiEntries(cineUi.help, [{
    name: 'shareProject',
    value: function value() {
      var _getSafeLanguageTexts = getSafeLanguageTexts(),
        langTexts = _getSafeLanguageTexts.langTexts,
        fallbackTexts = _getSafeLanguageTexts.fallbackTexts;
      return langTexts.shareSetupHelp || fallbackTexts.shareSetupHelp || 'Download a JSON safety bundle of the current project so you can archive or share it offline. Store the file with your crew backups before closing the planner.';
    }
  }, {
    name: 'sharedImport',
    value: function value() {
      var _getSafeLanguageTexts2 = getSafeLanguageTexts(),
        langTexts = _getSafeLanguageTexts2.langTexts,
        fallbackTexts = _getSafeLanguageTexts2.fallbackTexts;
      return langTexts.applySharedLinkHelp || fallbackTexts.applySharedLinkHelp || 'Load the configuration from a JSON backup exported via Save & Share or Backup & Restore. Review the preview before applying—nothing overwrites your current project until you confirm Save.';
    }
  }], 'cineUi help registration (setups) failed');
  setupsCineUiRegistered = areSetupsEntriesRegistered(cineUi);
}
function registerSetupsCineUi() {
  var cineUi = typeof globalThis !== 'undefined' && globalThis.cineUi || typeof window !== 'undefined' && window.cineUi || typeof self !== 'undefined' && self.cineUi || null;
  if (!cineUi) {
    return false;
  }
  registerSetupsCineUiInternal(cineUi);
  return true;
}
registerSetupsCineUi();
var cineResultsModule = (typeof cineResults === "undefined" ? "undefined" : _typeof(cineResults)) === 'object' ? cineResults : null;
if (cineResultsModule && typeof cineResultsModule.setupRuntimeFeedback === 'function') {
  cineResultsModule.setupRuntimeFeedback({
    openDialog: typeof openDialog === 'function' ? openDialog : null,
    closeDialog: typeof closeDialog === 'function' ? closeDialog : null,
    getCurrentSetupKey: typeof getCurrentSetupKey === 'function' ? getCurrentSetupKey : null,
    loadFeedback: typeof loadFeedbackSafe === 'function' ? loadFeedbackSafe : typeof loadFeedback === 'function' ? loadFeedback : null,
    saveFeedback: typeof saveFeedbackSafe === 'function' ? saveFeedbackSafe : typeof saveFeedback === 'function' ? saveFeedback : null,
    updateCalculations: typeof updateCalculations === 'function' ? updateCalculations : null,
    setButtonLabelWithIcon: typeof setButtonLabelWithIcon === 'function' ? setButtonLabelWithIcon : null,
    iconGlyphs: typeof ICON_GLYPHS !== 'undefined' ? ICON_GLYPHS : null
  });
}
function summarizeByType(list) {
  if (!Array.isArray(list)) return {};
  return list.reduce(function (counts, it) {
    if (it !== null && it !== void 0 && it.type) {
      counts[it.type] = (counts[it.type] || 0) + 1;
    }
    return counts;
  }, {});
}
function renderInfoLabel(text) {
  var str = text != null ? String(text).trim() : '';
  if (!str) return '';
  return "<span class=\"info-box-label\">".concat(escapeHtml(str), ":</span> ");
}
function connectorBlocks(items, icon) {
  var cls = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'neutral-conn';
  var label = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var dir = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
  if (!Array.isArray(items) || items.length === 0) return '';
  var counts = summarizeByType(items);
  var entries = Object.entries(counts).map(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
      type = _ref8[0],
      count = _ref8[1];
    return "".concat(escapeHtml(type)).concat(count > 1 ? " \xD7".concat(count) : '');
  });
  if (!entries.length) return '';
  var labelText = label ? "".concat(label).concat(dir ? " ".concat(dir) : '') : '';
  var labelHtml = renderInfoLabel(labelText);
  var iconHtml = iconMarkup(icon, 'connector-icon');
  return "<span class=\"connector-block ".concat(cls, "\">").concat(iconHtml).concat(labelHtml).concat(entries.join(', '), "</span>");
}
function generateConnectorSummary(device) {
  var _device$power, _device$video, _device$video2, _device$audioInput, _device$audioOutput, _device$audioIo, _device$power2, _device$power3;
  if (!device || _typeof(device) !== 'object') return '';
  var portHtml = '';
  var connectors = [{
    items: (_device$power = device.power) === null || _device$power === void 0 ? void 0 : _device$power.powerDistributionOutputs,
    icon: diagramConnectorIcons.powerOut,
    cls: 'power-conn',
    label: 'Power',
    dir: 'Out'
  }, {
    items: powerInputTypes(device).map(function (t) {
      return {
        type: t
      };
    }),
    icon: diagramConnectorIcons.powerIn,
    cls: 'power-conn',
    label: 'Power',
    dir: 'In'
  }, {
    items: device.fizConnectors,
    icon: diagramConnectorIcons.fiz,
    cls: 'fiz-conn',
    label: 'FIZ Port'
  }, {
    items: ((_device$video = device.video) === null || _device$video === void 0 ? void 0 : _device$video.inputs) || device.videoInputs,
    icon: diagramConnectorIcons.video,
    cls: 'video-conn',
    label: 'Video',
    dir: 'In'
  }, {
    items: ((_device$video2 = device.video) === null || _device$video2 === void 0 ? void 0 : _device$video2.outputs) || device.videoOutputs,
    icon: diagramConnectorIcons.video,
    cls: 'video-conn',
    label: 'Video',
    dir: 'Out'
  }, {
    items: device.timecode,
    icon: diagramConnectorIcons.timecode,
    cls: 'neutral-conn',
    label: 'Timecode'
  }, {
    items: (_device$audioInput = device.audioInput) !== null && _device$audioInput !== void 0 && _device$audioInput.portType ? [{
      type: device.audioInput.portType
    }] : undefined,
    icon: diagramConnectorIcons.audioIn,
    cls: 'neutral-conn',
    label: 'Audio',
    dir: 'In'
  }, {
    items: (_device$audioOutput = device.audioOutput) !== null && _device$audioOutput !== void 0 && _device$audioOutput.portType ? [{
      type: device.audioOutput.portType
    }] : undefined,
    icon: diagramConnectorIcons.audioOut,
    cls: 'neutral-conn',
    label: 'Audio',
    dir: 'Out'
  }, {
    items: (_device$audioIo = device.audioIo) !== null && _device$audioIo !== void 0 && _device$audioIo.portType ? [{
      type: device.audioIo.portType
    }] : undefined,
    icon: diagramConnectorIcons.audioIo,
    cls: 'neutral-conn',
    label: 'Audio',
    dir: 'I/O'
  }];
  for (var _i = 0, _connectors = connectors; _i < _connectors.length; _i++) {
    var _connectors$_i = _connectors[_i],
      items = _connectors$_i.items,
      icon = _connectors$_i.icon,
      cls = _connectors$_i.cls,
      label = _connectors$_i.label,
      dir = _connectors$_i.dir;
    portHtml += connectorBlocks(items, icon, cls, label, dir);
  }
  var specHtml = '';
  if (typeof device.powerDrawWatts === 'number') {
    specHtml += "<span class=\"info-box power-conn\">".concat(iconMarkup(diagramConnectorIcons.powerSpec)).concat(renderInfoLabel('Power')).concat(device.powerDrawWatts, " W</span>");
  }
  if ((_device$power2 = device.power) !== null && _device$power2 !== void 0 && (_device$power2 = _device$power2.input) !== null && _device$power2 !== void 0 && _device$power2.voltageRange) {
    specHtml += "<span class=\"info-box power-conn\">".concat(iconMarkup(ICON_GLYPHS.batteryBolt)).concat(renderInfoLabel('Voltage')).concat(escapeHtml(String(device.power.input.voltageRange)), "V</span>");
  }
  if (typeof device.weight_g === 'number') {
    var weightLabel = "".concat(device.weight_g, " g");
    specHtml += "<span class=\"info-box neutral-conn\">".concat(iconMarkup(ICON_GLYPHS.gears)).concat(renderInfoLabel('Weight')).concat(escapeHtml(weightLabel), "</span>");
  }
  if (typeof device.capacity === 'number') {
    specHtml += "<span class=\"info-box power-conn\">".concat(iconMarkup(ICON_GLYPHS.batteryFull)).concat(renderInfoLabel('Capacity')).concat(device.capacity, " Wh</span>");
  }
  if (typeof device.pinA === 'number') {
    specHtml += "<span class=\"info-box power-conn\">".concat(renderInfoLabel('Pins')).concat(device.pinA, "A</span>");
  }
  if (typeof device.dtapA === 'number') {
    specHtml += "<span class=\"info-box power-conn\">".concat(renderInfoLabel('D-Tap')).concat(device.dtapA, "A</span>");
  }
  if (device.mount_type) {
    specHtml += "<span class=\"info-box power-conn\">".concat(renderInfoLabel('Mount')).concat(escapeHtml(String(device.mount_type)), "</span>");
  }
  if (typeof device.screenSizeInches === 'number') {
    specHtml += "<span class=\"info-box video-conn\">".concat(iconMarkup(DIAGRAM_MONITOR_ICON)).concat(renderInfoLabel('Screen')).concat(device.screenSizeInches, "\"</span>");
  }
  if (typeof device.brightnessNits === 'number') {
    specHtml += "<span class=\"info-box video-conn\">".concat(iconMarkup(ICON_GLYPHS.brightness)).concat(renderInfoLabel('Brightness')).concat(device.brightnessNits, " nits</span>");
  }
  if (typeof device.wirelessTx === 'boolean') {
    specHtml += "<span class=\"info-box video-conn\">".concat(iconMarkup(ICON_GLYPHS.wifi)).concat(renderInfoLabel('Wireless')).concat(device.wirelessTx, "</span>");
  }
  if (device.internalController) {
    specHtml += "<span class=\"info-box fiz-conn\">".concat(iconMarkup(diagramConnectorIcons.controller)).concat(renderInfoLabel('Controller'), "Internal</span>");
  }
  if (typeof device.torqueNm === 'number') {
    specHtml += "<span class=\"info-box fiz-conn\">".concat(iconMarkup(diagramConnectorIcons.torque)).concat(renderInfoLabel('Torque')).concat(device.torqueNm, " Nm</span>");
  }
  if (device.powerSource) {
    specHtml += "<span class=\"info-box power-conn\">".concat(iconMarkup(diagramConnectorIcons.powerSource)).concat(renderInfoLabel('Power Source')).concat(escapeHtml(String(device.powerSource)), "</span>");
  }
  var uniqueList = function uniqueList(list) {
    if (!Array.isArray(list)) return [];
    var seen = new Set();
    var values = [];
    list.forEach(function (entry) {
      var str = entry != null ? String(entry).trim() : '';
      if (!str || seen.has(str)) return;
      seen.add(str);
      values.push(escapeHtml(str));
    });
    return values;
  };
  var appendListBox = function appendListBox(html, values, label, cls, icon) {
    var formatted = uniqueList(values);
    if (!formatted.length) return html;
    var iconHtml = iconMarkup(icon);
    var labelHtml = renderInfoLabel(label);
    var valuesHtml = "<span class=\"info-box-values\">".concat(formatted.join(', '), "</span>");
    return "".concat(html, "<span class=\"info-box ").concat(cls, " info-box-list\">").concat(iconHtml).concat(labelHtml).concat(valuesHtml, "</span>");
  };
  var recordingHtml = '';
  if (Array.isArray(device.sensorModes)) {
    recordingHtml = appendListBox(recordingHtml, device.sensorModes, 'Sensor Modes', 'video-conn', ICON_GLYPHS.sensor);
  }
  if (Array.isArray(device.resolutions)) {
    recordingHtml = appendListBox(recordingHtml, device.resolutions, 'Resolutions', 'video-conn', ICON_GLYPHS.screen);
  }
  if (Array.isArray(device.frameRates)) {
    var _diagramConnectorIcon;
    var frameRateIcon = ((_diagramConnectorIcon = diagramConnectorIcons) === null || _diagramConnectorIcon === void 0 ? void 0 : _diagramConnectorIcon.timecode) || ICON_GLYPHS.camera;
    recordingHtml = appendListBox(recordingHtml, device.frameRates, 'Frame Rates', 'video-conn', frameRateIcon);
  }
  if (Array.isArray(device.recordingCodecs)) {
    recordingHtml = appendListBox(recordingHtml, device.recordingCodecs, 'Codecs', 'video-conn', ICON_GLYPHS.camera);
  }
  if (Array.isArray(device.recordingMedia)) {
    var mediaTypes = device.recordingMedia.map(function (item) {
      return item && item.type ? item.type : '';
    });
    recordingHtml = appendListBox(recordingHtml, mediaTypes, 'Media', 'video-conn', ICON_GLYPHS.save);
  }
  var extraHtml = '';
  if (Array.isArray((_device$power3 = device.power) === null || _device$power3 === void 0 ? void 0 : _device$power3.batteryPlateSupport) && device.power.batteryPlateSupport.length) {
    var types = device.power.batteryPlateSupport.map(function (p) {
      var mount = p.mount ? " (".concat(escapeHtml(p.mount), ")") : '';
      return "".concat(escapeHtml(p.type)).concat(mount);
    });
    extraHtml += "<span class=\"info-box power-conn\">".concat(renderInfoLabel('Battery Plate')).concat(types.join(', '), "</span>");
  }
  if (Array.isArray(device.viewfinder) && device.viewfinder.length) {
    var _types = device.viewfinder.map(function (v) {
      return escapeHtml(v.type);
    });
    extraHtml += "<span class=\"info-box video-conn\">".concat(renderInfoLabel('Viewfinder')).concat(_types.join(', '), "</span>");
  }
  if (Array.isArray(device.gearTypes) && device.gearTypes.length) {
    var _types2 = device.gearTypes.map(function (g) {
      return escapeHtml(g);
    });
    extraHtml += "<span class=\"info-box fiz-conn\">".concat(renderInfoLabel('Gear')).concat(_types2.join(', '), "</span>");
  }
  if (device.connectivity) {
    extraHtml += "<span class=\"info-box video-conn\">".concat(renderInfoLabel('Connectivity')).concat(escapeHtml(String(device.connectivity)), "</span>");
  }
  if (device.notes) {
    extraHtml += "<span class=\"info-box neutral-conn\">".concat(renderInfoLabel('Notes')).concat(escapeHtml(String(device.notes)), "</span>");
  }
  var lensHtml = '';
  if (Array.isArray(device.lensMount)) {
    var boxes = device.lensMount.map(function (lm) {
      var mount = lm.mount ? " (".concat(escapeHtml(lm.mount), ")") : '';
      return "<span class=\"info-box neutral-conn\">".concat(escapeHtml(lm.type)).concat(mount, "</span>");
    }).join('');
    if (boxes) lensHtml = "<div class=\"lens-mount-box\">".concat(boxes, "</div>");
  }
  var html = '';
  var section = function section(label, content) {
    if (!content) return '';
    return "<div class=\"info-label\">".concat(label, "</div>").concat(content);
  };
  html += section('Ports', portHtml);
  html += section('Specs', specHtml);
  html += section('Recording', recordingHtml);
  html += section('Extras', extraHtml);
  if (lensHtml) html += "<div class=\"info-label\">Lens Mount</div>".concat(lensHtml);
  return html ? "<div class=\"connector-summary\">".concat(html, "</div>") : '';
}
function suggestChargerCounts(total) {
  var quad = Math.floor(total / 4);
  var remainder = total % 4;
  var dual = 0;
  var single = 0;
  if (remainder === 0) {} else if (remainder === 3) {
    quad += 1;
  } else if (remainder > 0) {
    dual += 1;
  }
  return {
    quad: quad,
    dual: dual,
    single: single
  };
}
function addArriKNumber(name) {
  if (!name) return name;
  var d = typeof devices !== 'undefined' ? devices : {};
  var collections = [d.viewfinders, d.directorMonitors, d.iosVideo, d.videoAssist, d.media, d.lenses];
  for (var _i2 = 0, _collections = collections; _i2 < _collections.length; _i2++) {
    var col = _collections[_i2];
    if (col && col[name]) {
      var item = col[name];
      if (item.brand && item.brand.toUpperCase().includes('ARRI') && item.kNumber && !name.includes(item.kNumber)) {
        return name.replace(/^ARRI\s*/i, "ARRI ".concat(item.kNumber, " "));
      }
      return name;
    }
  }
  if (d.accessories) {
    var _findItem = function findItem(obj) {
      if (!obj) return null;
      if (obj[name]) return obj[name];
      for (var _i3 = 0, _Object$values = Object.values(obj); _i3 < _Object$values.length; _i3++) {
        var val = _Object$values[_i3];
        if (val && _typeof(val) === 'object') {
          var found = _findItem(val);
          if (found) return found;
        }
      }
      return null;
    };
    for (var _i4 = 0, _Object$values2 = Object.values(d.accessories); _i4 < _Object$values2.length; _i4++) {
      var _col = _Object$values2[_i4];
      var _item = _findItem(_col);
      if (_item) {
        if (_item.brand && _item.brand.toUpperCase().includes('ARRI') && _item.kNumber && !name.includes(_item.kNumber)) {
          return /^ARRI\s*/i.test(name) ? name.replace(/^ARRI\s*/i, "ARRI ".concat(_item.kNumber, " ")) : "ARRI ".concat(_item.kNumber, " ").concat(name);
        }
        return name;
      }
    }
  }
  return name;
}
var sanitizeFizContext = function sanitizeFizContext(context) {
  return (context || '').replace(/[()]/g, '').replace(/\s{2,}/g, ' ').trim();
};
var formatFizCable = function formatFizCable(name, context) {
  var cleaned = sanitizeFizContext(context);
  return cleaned ? "".concat(name, " (").concat(cleaned, ")") : name;
};
function suggestArriFizCables() {
  var _cameraSelect, _distanceSelect;
  var CABLE_LBUS_05 = 'LBUS to LBUS 0,5m';
  var CABLE_UDM_SERIAL_4P = 'Cable UDM – SERIAL (4p) 0,5m';
  var CABLE_UDM_SERIAL_7P = 'Cable UDM – SERIAL (7p) 1,5m';
  var cables = [];
  var lbusLengths = [];
  var camSpare = [];
  var camera = ((_cameraSelect = cameraSelect) === null || _cameraSelect === void 0 ? void 0 : _cameraSelect.value) || '';
  var motors = motorSelects.map(function (sel) {
    return sel.value;
  }).filter(function (v) {
    return v && v !== 'None';
  });
  var controllers = controllerSelects.map(function (sel) {
    return sel.value;
  }).filter(function (v) {
    return v && v !== 'None';
  });
  var distance = ((_distanceSelect = distanceSelect) === null || _distanceSelect === void 0 ? void 0 : _distanceSelect.value) || '';
  var motor = motors[0] || '';
  var hasMasterGrip = controllers.includes('Arri Master Grip (single unit)');
  var hasRIA = controllers.includes('Arri RIA-1');
  var hasUDM = distance.includes('UDM');
  var hasLCube = distance.includes('LCube');
  if (hasLCube && (hasRIA || camera === 'Arri Alexa 35')) hasLCube = false;
  var isCforceMiniRF = /cforce mini rf/i.test(motor);
  var isCforceMini = /cforce mini/i.test(motor) && !isCforceMiniRF;
  var motorContext = motor ? "for ".concat(motor) : 'for FIZ motor';
  var masterGripContext = 'for Arri Master Grip (single unit)';
  var distanceContext = distance ? "for ".concat(distance) : 'for distance sensor';
  var controllersToCheck = [];
  if (hasRIA) controllersToCheck.push('Arri RIA-1');
  if (isCforceMiniRF) controllersToCheck.push('Arri cforce mini RF');
  var primaryController = controllersToCheck[0] || controllers[0] || '';
  var pushLbus = function pushLbus(len, contextOverride) {
    var formatted = String(len).replace('.', ',');
    var ctx = contextOverride || motorContext;
    cables.push(formatFizCable("LBUS to LBUS ".concat(formatted, "m"), ctx));
    lbusLengths.push(Number(len));
  };
  if ((camera === 'Arri Alexa Mini' || camera === 'Arri Alexa Mini LF') && isCforceMini) {
    pushLbus(0.3);
    if (hasLCube) pushLbus(0.4, distanceContext);
    if (hasMasterGrip) pushLbus(0.5, masterGripContext);
  } else if (camera === 'Arri Alexa 35' && isCforceMini) {
    pushLbus(0.3);
    if (hasMasterGrip) pushLbus(0.5, masterGripContext);
  } else if (isCforceMiniRF) {
    if (hasLCube) {
      pushLbus(0.4, distanceContext);
      if (hasMasterGrip) pushLbus(0.5, masterGripContext);
    } else if (hasMasterGrip) {
      pushLbus(0.5, masterGripContext);
    }
  } else if (hasRIA && isCforceMini) {
    pushLbus(0.4);
    if (hasMasterGrip) pushLbus(0.5, masterGripContext);
  }
  if (controllersToCheck.length) {
    var _devices$accessories;
    var cablesData = ((_devices$accessories = devices.accessories) === null || _devices$accessories === void 0 ? void 0 : _devices$accessories.cables) || {};
    var chosen = null;
    for (var _i5 = 0, _Object$entries = Object.entries(cablesData); _i5 < _Object$entries.length; _i5++) {
      var _data$lengthM, _cablesData$chosen$le;
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i5], 2),
        name = _Object$entries$_i[0],
        data = _Object$entries$_i[1];
      var connectors = [];
      if (Array.isArray(data.connectors)) connectors.push.apply(connectors, _toConsumableArray(data.connectors));
      if (data.from) connectors.push(data.from);
      if (data.to) connectors.push(data.to);
      if (!connectors.some(function (c) {
        return /CAM \(7-pin/i.test(c);
      })) continue;
      var ctrlOk = (data.compatibleControllers || []).some(function (cc) {
        return controllersToCheck.some(function (ct) {
          return cc.toLowerCase().includes(ct.toLowerCase());
        });
      });
      if (!ctrlOk) continue;
      var camOk = !data.compatibleCameras || data.compatibleCameras.some(function (c) {
        return c.toLowerCase() === camera.toLowerCase();
      });
      if (!camOk) continue;
      if (!chosen || ((_data$lengthM = data.lengthM) !== null && _data$lengthM !== void 0 ? _data$lengthM : Infinity) < ((_cablesData$chosen$le = cablesData[chosen].lengthM) !== null && _cablesData$chosen$le !== void 0 ? _cablesData$chosen$le : Infinity)) {
        chosen = name;
      }
    }
    if (chosen) {
      var camContext = camera ? "for ".concat(camera) : 'for camera control';
      cables.push(formatFizCable(chosen, camContext));
      camSpare.push(chosen);
    } else if (hasRIA && cablesData['Cable CAM (7-pin) – D-Tap 0,5m']) {
      var fallback = 'Cable CAM (7-pin) – D-Tap 0,5m';
      var fallbackContext = primaryController ? "for ".concat(primaryController, " power") : 'for controller power';
      cables.push(formatFizCable(fallback, fallbackContext));
      camSpare.push(fallback);
    }
  }
  if (hasUDM) {
    if (hasLCube) {
      cables.push(formatFizCable(CABLE_UDM_SERIAL_7P, distanceContext));
    } else {
      cables.push(formatFizCable(CABLE_UDM_SERIAL_4P, distanceContext));
      cables.push(formatFizCable(CABLE_UDM_SERIAL_4P, 'spare'));
    }
  }
  if (lbusLengths.length) {
    var shortest = Math.min.apply(Math, lbusLengths);
    var formattedShortest = String(shortest).replace('.', ',');
    cables.push(formatFizCable("LBUS to LBUS ".concat(formattedShortest, "m"), 'spare'));
    cables.push(formatFizCable(CABLE_LBUS_05, 'spare'));
  }
  camSpare.forEach(function (n) {
    return cables.push(formatFizCable(n, 'spare'));
  });
  return cables;
}
function collectAccessories() {
  var _acc$cables, _acc$cables2;
  var _ref9 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref9$hasMotor = _ref9.hasMotor,
    hasMotor = _ref9$hasMotor === void 0 ? false : _ref9$hasMotor,
    _ref9$videoDistPrefs = _ref9.videoDistPrefs,
    videoDistPrefs = _ref9$videoDistPrefs === void 0 ? [] : _ref9$videoDistPrefs;
  var cameraSupport = [];
  var misc = [];
  var monitoringSupport = [];
  var rigging = [];
  var chargers = [];
  var fizCables = [];
  var acc = devices.accessories || {};
  var excludedCables = new Set(['D-Tap to LEMO 2-pin', 'HDMI Cable']);
  if (batterySelect.value) {
    var _devices$batteries$ba;
    var mount = (_devices$batteries$ba = devices.batteries[batterySelect.value]) === null || _devices$batteries$ba === void 0 ? void 0 : _devices$batteries$ba.mount_type;
    if (acc.powerPlates) {
      for (var _i6 = 0, _Object$entries2 = Object.entries(acc.powerPlates); _i6 < _Object$entries2.length; _i6++) {
        var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i6], 2),
          name = _Object$entries2$_i[0],
          plate = _Object$entries2$_i[1];
        if ((!plate.mount || plate.mount === mount) && (!plate.compatible || plate.compatible.includes(cameraSelect.value))) {
          cameraSupport.push(name);
        }
      }
    }
    if (acc.chargers) {
      var _batteryCountElem;
      var camCount = parseInt(((_batteryCountElem = batteryCountElem) === null || _batteryCountElem === void 0 ? void 0 : _batteryCountElem.textContent) || '', 10);
      if (!Number.isFinite(camCount)) camCount = batterySelect.value ? 1 : 0;
      var monCount = 0;
      if (Array.isArray(videoDistPrefs)) {
        var handheldCount = videoDistPrefs.filter(function (v) {
          return /Monitor(?: \d+")? handheld$/.test(v);
        }).length;
        monCount += handheldCount * 3;
        var largeCount = videoDistPrefs.filter(function (v) {
          var m = v.match(/Monitor (\d+(?:\.\d+)?)/);
          return m && parseFloat(m[1]) > 10 && !/handheld$/.test(v);
        }).length;
        monCount += largeCount * 2;
      }
      if (hasMotor) monCount += 3;
      var pushChargersForMount = function pushChargersForMount(targetMount, total) {
        if (!targetMount || total <= 0) return;
        var counts = suggestChargerCounts(total);
        var findName = function findName(slots) {
          for (var _i7 = 0, _Object$entries3 = Object.entries(acc.chargers); _i7 < _Object$entries3.length; _i7++) {
            var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i7], 2),
              _name = _Object$entries3$_i[0],
              charger = _Object$entries3$_i[1];
            if (charger.mount === targetMount && charger.slots === slots) return _name;
          }
          return null;
        };
        var pushCharger = function pushCharger(slots, count) {
          var n = findName(slots);
          if (!n) return;
          for (var i = 0; i < count; i++) chargers.push(n);
        };
        pushCharger(4, counts.quad);
        pushCharger(2, counts.dual);
        pushCharger(1, counts.single);
      };
      if (mount === 'B-Mount') {
        pushChargersForMount('B-Mount', camCount);
        pushChargersForMount('V-Mount', monCount);
      } else {
        pushChargersForMount(mount, camCount + monCount);
      }
    }
  }
  if (cameraSelect.value && acc.cages) {
    if (!cageSelect.value || cageSelect.value === 'None') {
      for (var _i8 = 0, _Object$entries4 = Object.entries(acc.cages); _i8 < _Object$entries4.length; _i8++) {
        var _Object$entries4$_i = _slicedToArray(_Object$entries4[_i8], 2),
          _name2 = _Object$entries4$_i[0],
          cage = _Object$entries4$_i[1];
        if (!cage.compatible || cage.compatible.includes(cameraSelect.value)) cameraSupport.push(_name2);
      }
    }
  }
  var powerCableDb = ((_acc$cables = acc.cables) === null || _acc$cables === void 0 ? void 0 : _acc$cables.power) || {};
  var gatherPower = function gatherPower(data) {
    var _data$power;
    var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : misc;
    var includeExcluded = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var input = data === null || data === void 0 || (_data$power = data.power) === null || _data$power === void 0 || (_data$power = _data$power.input) === null || _data$power === void 0 ? void 0 : _data$power.type;
    var types = Array.isArray(input) ? input : input ? [input] : [];
    types.forEach(function (t) {
      for (var _i9 = 0, _Object$entries5 = Object.entries(powerCableDb); _i9 < _Object$entries5.length; _i9++) {
        var _Object$entries5$_i = _slicedToArray(_Object$entries5[_i9], 2),
          _name3 = _Object$entries5$_i[0],
          cable = _Object$entries5$_i[1];
        var isExcluded = excludedCables.has(_name3);
        if (cable.to === t && (!isExcluded || includeExcluded)) target.push(_name3);
      }
    });
  };
  gatherPower(devices.cameras[cameraSelect.value]);
  gatherPower(devices.video[videoSelect.value]);
  var onboardMonitor = devices.monitors[monitorSelect.value];
  if (onboardMonitor) {
    var _onboardMonitor$power;
    var monitorLabel = 'Onboard monitor';
    var powerType = onboardMonitor === null || onboardMonitor === void 0 || (_onboardMonitor$power = onboardMonitor.power) === null || _onboardMonitor$power === void 0 || (_onboardMonitor$power = _onboardMonitor$power.input) === null || _onboardMonitor$power === void 0 ? void 0 : _onboardMonitor$power.type;
    var hasLemo2 = Array.isArray(powerType) ? powerType.includes('LEMO 2-pin') : powerType === 'LEMO 2-pin';
    if (hasLemo2) {
      monitoringSupport.push("D-Tap to Lemo-2-pin Cable 0,5m (".concat(monitorLabel, ")"), "D-Tap to Lemo-2-pin Cable 0,5m (".concat(monitorLabel, ")"));
    }
    var cameraData = devices.cameras[cameraSelect.value];
    var camVideo = ((cameraData === null || cameraData === void 0 ? void 0 : cameraData.videoOutputs) || []).map(function (v) {
      var _v$type;
      return (_v$type = v.type) === null || _v$type === void 0 ? void 0 : _v$type.toUpperCase();
    });
    var monVideo = (onboardMonitor.videoInputs || []).map(function (v) {
      var _v$type2;
      return (_v$type2 = v.type) === null || _v$type2 === void 0 ? void 0 : _v$type2.toUpperCase();
    });
    var hasSDI = camVideo.some(function (t) {
      return t && t.includes('SDI');
    }) && monVideo.some(function (t) {
      return t && t.includes('SDI');
    });
    var hasHDMI = camVideo.includes('HDMI') && monVideo.includes('HDMI');
    if (hasSDI) {
      monitoringSupport.push("Ultraslim BNC Cable 0.5 m (".concat(monitorLabel, ")"), "Ultraslim BNC Cable 0.5 m (".concat(monitorLabel, ")"));
    } else if (hasHDMI) {
      monitoringSupport.push("Ultraslim HDMI 0.5 m (".concat(monitorLabel, ")"), "Ultraslim HDMI 0.5 m (".concat(monitorLabel, ")"));
    }
    rigging.push("ULCS Arm mit 3/8\" und 1/4\" double (".concat(monitorLabel, ")"));
  }
  if (videoSelect.value) {
    var rxName = videoSelect.value.replace(/ TX\b/, ' RX');
    if (devices.wirelessReceivers && devices.wirelessReceivers[rxName]) {
      gatherPower(devices.wirelessReceivers[rxName]);
    }
  }
  motorSelects.forEach(function (sel) {
    return gatherPower(devices.fiz.motors[sel.value]);
  });
  controllerSelects.forEach(function (sel) {
    return gatherPower(devices.fiz.controllers[sel.value]);
  });
  gatherPower(devices.fiz.distance[distanceSelect.value]);
  var fizCableDb = ((_acc$cables2 = acc.cables) === null || _acc$cables2 === void 0 ? void 0 : _acc$cables2.fiz) || {};
  var getFizConnectors = function getFizConnectors(data) {
    var list = [];
    if (!data) return list;
    if (Array.isArray(data.fizConnectors)) {
      data.fizConnectors.forEach(function (fc) {
        var type = fc && _typeof(fc) === 'object' ? fc.type : fc;
        if (type) list.push(type);
      });
    }
    if (data.fizConnector) list.push(data.fizConnector);
    return _toConsumableArray(new Set(list.filter(Boolean)));
  };
  var pushFizCable = function pushFizCable(name, context) {
    fizCables.push(formatFizCable(name, context));
  };
  var pairContextCounts = {};
  var buildPairContext = function buildPairContext(motorName, controllerName) {
    var parts = [sanitizeFizContext(motorName), sanitizeFizContext(controllerName)].filter(Boolean);
    if (!parts.length) return '';
    var base = parts.join(' ↔ ');
    var key = base.toLowerCase();
    var next = (pairContextCounts[key] || 0) + 1;
    pairContextCounts[key] = next;
    return next > 1 ? "".concat(base, " #").concat(next) : base;
  };
  var matchesCable = function matchesCable(cable, from, to) {
    if (!cable) return false;
    var fromToMatch = function fromToMatch(a, b) {
      return cable.from === a && cable.to === b || cable.from === b && cable.to === a;
    };
    if (cable.from && cable.to) {
      if (fromToMatch(from, to)) return true;
    }
    if (Array.isArray(cable.connectors)) {
      var connectors = cable.connectors;
      if (connectors.includes(from) && connectors.includes(to)) return true;
    }
    return false;
  };
  var motorEntries = motorSelects.map(function (sel) {
    return sel.value;
  }).filter(function (v) {
    return v && v !== 'None';
  }).map(function (name) {
    return {
      name: name,
      data: devices.fiz.motors[name]
    };
  }).filter(function (entry) {
    return entry.data;
  });
  var controllerEntries = controllerSelects.map(function (sel) {
    return sel.value;
  }).filter(function (v) {
    return v && v !== 'None';
  }).map(function (name) {
    return {
      name: name,
      data: devices.fiz.controllers[name]
    };
  }).filter(function (entry) {
    return entry.data;
  });
  motorEntries.forEach(function (motorEntry) {
    var motorConns = getFizConnectors(motorEntry.data);
    controllerEntries.forEach(function (controllerEntry) {
      var controllerConns = getFizConnectors(controllerEntry.data);
      motorConns.forEach(function (mConn) {
        controllerConns.forEach(function (cConn) {
          if (mConn !== cConn) return;
          for (var _i0 = 0, _Object$entries6 = Object.entries(fizCableDb); _i0 < _Object$entries6.length; _i0++) {
            var _Object$entries6$_i = _slicedToArray(_Object$entries6[_i0], 2),
              _name4 = _Object$entries6$_i[0],
              cable = _Object$entries6$_i[1];
            if (matchesCable(cable, mConn, cConn)) {
              var context = buildPairContext(motorEntry.name, controllerEntry.name);
              pushFizCable(_name4, context);
            }
          }
        });
      });
    });
  });
  suggestArriFizCables().forEach(function (name) {
    return fizCables.push(name);
  });
  var miscUnique = _toConsumableArray(new Set(misc));
  var monitoringSupportList = monitoringSupport.slice();
  var riggingUnique = _toConsumableArray(new Set(rigging));
  for (var i = 0; i < 4; i++) monitoringSupportList.push('BNC Connector');
  return {
    cameraSupport: _toConsumableArray(new Set(cameraSupport)),
    chargers: chargers,
    fizCables: fizCables,
    misc: miscUnique,
    monitoringSupport: monitoringSupportList,
    rigging: riggingUnique
  };
}
function cloneProjectFormDataSnapshot(snapshot) {
  if (!snapshot || _typeof(snapshot) !== 'object') {
    return {};
  }
  var clone = _objectSpread({}, snapshot);
  if (Array.isArray(snapshot.people)) {
    clone.people = snapshot.people.map(function (person) {
      return _objectSpread({}, person);
    });
  }
  if (Array.isArray(snapshot.prepDays)) {
    clone.prepDays = _toConsumableArray(snapshot.prepDays);
  }
  if (Array.isArray(snapshot.shootingDays)) {
    clone.shootingDays = _toConsumableArray(snapshot.shootingDays);
  }
  if (Array.isArray(snapshot.returnDays)) {
    clone.returnDays = _toConsumableArray(snapshot.returnDays);
  }
  if (Array.isArray(snapshot.storageRequirements)) {
    clone.storageRequirements = snapshot.storageRequirements.map(function (entry) {
      return _objectSpread({}, entry);
    });
  }
  if (snapshot.monitorBatteries && _typeof(snapshot.monitorBatteries) === 'object') {
    clone.monitorBatteries = _objectSpread({}, snapshot.monitorBatteries);
  }
  if (Array.isArray(snapshot.lensSelections)) {
    clone.lensSelections = snapshot.lensSelections.map(function (entry) {
      return _objectSpread({}, entry);
    });
  }
  return clone;
}
function freezeProjectFormDataSnapshot(info) {
  var snapshot = _objectSpread({}, info);
  if (Array.isArray(info.people)) {
    snapshot.people = PROJECT_FORM_FREEZE(info.people.map(function (person) {
      return PROJECT_FORM_FREEZE(_objectSpread({}, person));
    }));
  }
  if (Array.isArray(info.prepDays)) {
    snapshot.prepDays = PROJECT_FORM_FREEZE(_toConsumableArray(info.prepDays));
  }
  if (Array.isArray(info.shootingDays)) {
    snapshot.shootingDays = PROJECT_FORM_FREEZE(_toConsumableArray(info.shootingDays));
  }
  if (Array.isArray(info.returnDays)) {
    snapshot.returnDays = PROJECT_FORM_FREEZE(_toConsumableArray(info.returnDays));
  }
  if (Array.isArray(info.storageRequirements)) {
    snapshot.storageRequirements = PROJECT_FORM_FREEZE(info.storageRequirements.map(function (entry) {
      return PROJECT_FORM_FREEZE(_objectSpread({}, entry));
    }));
  }
  if (info.monitorBatteries && _typeof(info.monitorBatteries) === 'object') {
    snapshot.monitorBatteries = PROJECT_FORM_FREEZE(_objectSpread({}, info.monitorBatteries));
  }
  if (Array.isArray(info.lensSelections)) {
    snapshot.lensSelections = PROJECT_FORM_FREEZE(info.lensSelections.map(function (entry) {
      return PROJECT_FORM_FREEZE(_objectSpread({}, entry));
    }));
  }
  return PROJECT_FORM_FREEZE(snapshot);
}
function collectProjectFormData() {
  var _crewContainer, _storageNeedsContaine;
  if (!projectForm) return {};
  if (!projectFormDataCacheDirty && projectFormDataCache) {
    return cloneProjectFormDataSnapshot(projectFormDataCache);
  }
  var formData = new FormData(projectForm);
  var getValue = function getValue(name) {
    var raw = formData.get(name);
    return typeof raw === 'string' ? raw.trim() : '';
  };
  var getMultiValue = function getMultiValue(name) {
    var values = formData.getAll(name);
    if (!values || values.length === 0) return '';
    return values.map(function (value) {
      return typeof value === 'string' ? value : String(value);
    }).join(', ');
  };
  var viewfinderSettings = getMultiValue('viewfinderSettings');
  var frameGuides = getMultiValue('frameGuides');
  var aspectMaskOpacity = getMultiValue('aspectMaskOpacity');
  var filterStr = collectFilterSelections();
  var filterTypes = filterStr ? filterStr.split(',').map(function (s) {
    return s.split(':')[0];
  }) : [];
  var matteboxVal = filterTypes.some(function (t) {
    return t === 'ND Grad HE' || t === 'ND Grad SE';
  }) ? 'Swing Away' : getValue('mattebox');
  var people = Array.from(((_crewContainer = crewContainer) === null || _crewContainer === void 0 ? void 0 : _crewContainer.querySelectorAll('.person-row')) || []).map(function (row) {
    var _row$querySelector;
    var roleValue = (_row$querySelector = row.querySelector('select')) === null || _row$querySelector === void 0 ? void 0 : _row$querySelector.value;
    var nameInput = row.querySelector('.person-name');
    var phoneInput = row.querySelector('.person-phone');
    var emailInput = row.querySelector('.person-email');
    var websiteInput = row.querySelector('.person-website');
    var role = typeof roleValue === 'string' ? roleValue.trim() : roleValue == null ? '' : String(roleValue);
    var name = typeof (nameInput === null || nameInput === void 0 ? void 0 : nameInput.value) === 'string' ? nameInput.value.trim() : '';
    var phone = typeof (phoneInput === null || phoneInput === void 0 ? void 0 : phoneInput.value) === 'string' ? phoneInput.value.trim() : '';
    var email = typeof (emailInput === null || emailInput === void 0 ? void 0 : emailInput.value) === 'string' ? emailInput.value.trim() : '';
    var website = typeof (websiteInput === null || websiteInput === void 0 ? void 0 : websiteInput.value) === 'string' ? websiteInput.value.trim() : '';
    return {
      role: role,
      name: name,
      phone: phone,
      email: email,
      website: website
    };
  }).filter(function (person) {
    return person.role || person.name || person.phone || person.email || person.website;
  });
  var collectRanges = function collectRanges(container, startSel, endSel) {
    return Array.from((container === null || container === void 0 ? void 0 : container.querySelectorAll('.period-row')) || []).map(function (row) {
      var _row$querySelector2, _row$querySelector3;
      var start = (_row$querySelector2 = row.querySelector(startSel)) === null || _row$querySelector2 === void 0 ? void 0 : _row$querySelector2.value;
      var end = (_row$querySelector3 = row.querySelector(endSel)) === null || _row$querySelector3 === void 0 ? void 0 : _row$querySelector3.value;
      return [start, end].filter(Boolean).join(' to ');
    }).filter(Boolean);
  };
  var prepDays = collectRanges(prepContainer, '.prep-start', '.prep-end');
  var shootingDays = collectRanges(shootContainer, '.shoot-start', '.shoot-end');
  var returnDays = collectRanges(returnContainer, '.return-start', '.return-end');
  var gearValues = gearListOutput ? function () {
    var ids = ['gearListDirectorMonitor', 'gearListDopMonitor', 'gearListGafferMonitor', 'gearListDirectorMonitor15', 'gearListComboMonitor15', 'gearListDopMonitor15', 'gearListFocusMonitor', 'gearListProGaffColor1', 'gearListProGaffWidth1', 'gearListProGaffColor2', 'gearListProGaffWidth2', 'gearListEyeLeatherColor'];
    var map = new Map();
    ids.forEach(function (id) {
      var el = gearListOutput.querySelector("#".concat(id));
      if (!el) return;
      var value = el.value;
      map.set(id, typeof value === 'string' ? value : value == null ? '' : String(value));
    });
    return map;
  }() : null;
  var getGearValue = function getGearValue(id) {
    return gearValues && gearValues.has(id) ? gearValues.get(id) : '';
  };
  var monitorBatteryMap = gearListOutput ? function () {
    var entries = {};
    gearListOutput.querySelectorAll('select[data-monitor-battery-key]').forEach(function (sel) {
      var key = sel.getAttribute('data-monitor-battery-key');
      if (!key) return;
      var rawValue = sel.value;
      var value = typeof rawValue === 'string' ? rawValue.trim() : rawValue == null ? '' : String(rawValue);
      if (value) {
        entries[key] = value;
      }
    });
    return entries;
  }() : {};
  var proGaffColor1 = getGearValue('gearListProGaffColor1');
  var proGaffWidth1 = getGearValue('gearListProGaffWidth1');
  var proGaffColor2 = getGearValue('gearListProGaffColor2');
  var proGaffWidth2 = getGearValue('gearListProGaffWidth2');
  var addressFields = {
    street: getValue('productionCompanyStreet'),
    street2: getValue('productionCompanyStreet2'),
    city: getValue('productionCompanyCity'),
    region: getValue('productionCompanyRegion'),
    postalCode: getValue('productionCompanyPostalCode'),
    country: getValue('productionCompanyCountry')
  };
  var addressLines = [];
  if (addressFields.street) addressLines.push(addressFields.street);
  if (addressFields.street2) addressLines.push(addressFields.street2);
  var localityParts = [addressFields.city, addressFields.region, addressFields.postalCode].map(function (part) {
    return part || '';
  }).filter(function (part) {
    return part;
  });
  if (localityParts.length) {
    addressLines.push(localityParts.join(', '));
  }
  if (addressFields.country) {
    addressLines.push(addressFields.country);
  }
  var lensSnapshot = lensSelectionManager && typeof lensSelectionManager.snapshot === 'function' ? lensSelectionManager.snapshot() : {
    names: normalizeLensSelectionNames(getMultiValue('lenses')),
    lensSelections: []
  };
  var lensNames = Array.isArray(lensSnapshot.names) ? lensSnapshot.names.map(function (name) {
    return typeof name === 'string' ? name.trim() : '';
  }).filter(Boolean) : normalizeLensSelectionNames(lensSnapshot.names);
  var lensSelectionsDetailed = Array.isArray(lensSnapshot.lensSelections) ? lensSnapshot.lensSelections.map(function (entry) {
    return {
      name: typeof (entry === null || entry === void 0 ? void 0 : entry.name) === 'string' ? entry.name.trim() : '',
      mount: typeof (entry === null || entry === void 0 ? void 0 : entry.mount) === 'string' ? entry.mount.trim() : ''
    };
  }).filter(function (entry) {
    return entry.name;
  }) : [];
  var info = _objectSpread(_objectSpread({
    productionCompany: getValue('productionCompany'),
    productionCompanyAddress: addressLines.join('\n'),
    productionCompanyStreet: addressFields.street,
    productionCompanyStreet2: addressFields.street2,
    productionCompanyCity: addressFields.city,
    productionCompanyRegion: addressFields.region,
    productionCompanyPostalCode: addressFields.postalCode,
    productionCompanyCountry: addressFields.country,
    rentalHouse: getValue('rentalHouse')
  }, people.length ? {
    people: people
  } : {}), {}, {
    prepDays: prepDays,
    shootingDays: shootingDays,
    returnDays: returnDays,
    deliveryResolution: getValue('deliveryResolution'),
    recordingResolution: getValue('recordingResolution'),
    aspectRatio: getMultiValue('aspectRatio'),
    codec: getValue('codec'),
    baseFrameRate: getValue('baseFrameRate'),
    recordingFrameRate: getValue('recordingFrameRate'),
    sensorMode: getValue('sensorMode'),
    lenses: lensNames,
    requiredScenarios: getMultiValue('requiredScenarios'),
    cameraHandle: getMultiValue('cameraHandle'),
    viewfinderExtension: getValue('viewfinderExtension'),
    viewfinderEyeLeatherColor: getGearValue('gearListEyeLeatherColor') || getValue('viewfinderEyeLeatherColor'),
    mattebox: matteboxVal,
    gimbal: getMultiValue('gimbal'),
    viewfinderSettings: viewfinderSettings,
    frameGuides: frameGuides,
    aspectMaskOpacity: aspectMaskOpacity,
    videoDistribution: getMultiValue('videoDistribution'),
    monitoringConfiguration: getValue('monitoringConfiguration'),
    monitorUserButtons: getMultiValue('monitorUserButtons'),
    cameraUserButtons: getMultiValue('cameraUserButtons'),
    viewfinderUserButtons: getMultiValue('viewfinderUserButtons'),
    tripodHeadBrand: getValue('tripodHeadBrand'),
    tripodBowl: getValue('tripodBowl'),
    tripodTypes: getMultiValue('tripodTypes'),
    tripodSpreader: getValue('tripodSpreader'),
    sliderBowl: getSetupsCoreValue('getSliderBowlValue'),
    easyrig: getSetupsCoreValue('getEasyrigValue'),
    filter: filterStr
  });
  info.lensSelections = lensSelectionsDetailed;
  if (monitorBatteryMap && Object.keys(monitorBatteryMap).length) {
    info.monitorBatteries = monitorBatteryMap;
  }
  var assignGearField = function assignGearField(prop, id) {
    var value = getGearValue(id);
    if (value) {
      info[prop] = value;
    }
  };
  var assignManualFlag = function assignManualFlag(prop, id) {
    if (!gearListOutput) return;
    var el = gearListOutput.querySelector("#".concat(id));
    if (el && el.dataset && el.dataset.autoGearManual === 'true') {
      info["".concat(prop, "Manual")] = true;
    }
  };
  assignGearField('directorMonitor', 'gearListDirectorMonitor');
  assignGearField('dopMonitor', 'gearListDopMonitor');
  assignGearField('gafferMonitor', 'gearListGafferMonitor');
  assignGearField('directorMonitor15', 'gearListDirectorMonitor15');
  assignGearField('comboMonitor15', 'gearListComboMonitor15');
  assignGearField('dopMonitor15', 'gearListDopMonitor15');
  info.focusMonitor = getGearValue('gearListFocusMonitor') || '';
  assignManualFlag('directorMonitor', 'gearListDirectorMonitor');
  assignManualFlag('dopMonitor', 'gearListDopMonitor');
  assignManualFlag('gafferMonitor', 'gearListGafferMonitor');
  assignManualFlag('directorMonitor15', 'gearListDirectorMonitor15');
  assignManualFlag('comboMonitor15', 'gearListComboMonitor15');
  assignManualFlag('dopMonitor15', 'gearListDopMonitor15');
  assignManualFlag('focusMonitor', 'gearListFocusMonitor');
  if (proGaffColor1 || proGaffWidth1) {
    info.proGaffColor1 = proGaffColor1 || '';
    info.proGaffWidth1 = proGaffWidth1 || '';
  }
  if (proGaffColor2 || proGaffWidth2) {
    info.proGaffColor2 = proGaffColor2 || '';
    info.proGaffWidth2 = proGaffWidth2 || '';
  }
  var storageEntries = Array.from(((_storageNeedsContaine = storageNeedsContainer) === null || _storageNeedsContaine === void 0 ? void 0 : _storageNeedsContaine.querySelectorAll('.storage-row')) || []).map(function (row) {
    var quantityInput = row.querySelector('.storage-quantity');
    var typeSelect = row.querySelector('.storage-type');
    var variantSelect = row.querySelector('.storage-variant');
    var notesInput = row.querySelector('.storage-notes');
    var rawQuantity = quantityInput ? parseInt(quantityInput.value, 10) : NaN;
    var quantity = Number.isFinite(rawQuantity) && rawQuantity > 0 ? rawQuantity : null;
    var type = typeof (typeSelect === null || typeSelect === void 0 ? void 0 : typeSelect.value) === 'string' ? typeSelect.value.trim() : '';
    var variant = typeof (variantSelect === null || variantSelect === void 0 ? void 0 : variantSelect.value) === 'string' ? variantSelect.value.trim() : '';
    var notes = typeof (notesInput === null || notesInput === void 0 ? void 0 : notesInput.value) === 'string' ? notesInput.value.trim() : '';
    if (!quantity && !type && !variant && !notes) {
      return null;
    }
    var entry = {};
    if (quantity) entry.quantity = quantity;
    if (type) entry.type = type;
    if (variant) entry.variant = variant;
    if (notes) entry.notes = notes;
    return entry;
  }).filter(Boolean);
  if (storageEntries.length) {
    info.storageRequirements = storageEntries;
  }
  var currentProjectName = getCurrentProjectName();
  if (currentProjectName) {
    info.projectName = currentProjectName;
  }
  var snapshot = freezeProjectFormDataSnapshot(info);
  projectFormDataCache = snapshot;
  projectFormDataCacheDirty = false;
  return cloneProjectFormDataSnapshot(snapshot);
}
function populateProjectForm() {
  var info = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (!projectForm) return;
  projectForm.reset();
  var setVal = function setVal(name, value) {
    if (value === undefined) return;
    var field = projectForm.querySelector("[name=\"".concat(name, "\"]"));
    if (!field) return;
    var resolvedValue = value;
    if (name === 'recordingFrameRate') {
      if (typeof value === 'number' && Number.isFinite(value)) {
        resolvedValue = value % 1 ? value.toFixed(3).replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1') : String(value);
      } else if (typeof value === 'string') {
        var trimmed = value.trim();
        var numericMatch = trimmed.match(/-?\d+(?:\.\d+)?/);
        if (numericMatch) {
          var num = Number.parseFloat(numericMatch[0]);
          if (Number.isFinite(num)) {
            resolvedValue = num % 1 ? num.toFixed(3).replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1') : String(num);
          } else {
            resolvedValue = trimmed;
          }
        } else {
          resolvedValue = trimmed;
        }
      }
    }
    field.value = resolvedValue;
  };
  var setMulti = function setMulti(name, values) {
    var field = projectForm.querySelector("[name=\"".concat(name, "\"]"));
    if (!field || values === undefined) return;
    var arr = Array.isArray(values) ? values : values ? values.split(',').map(function (v) {
      return v.trim();
    }) : [];
    Array.from(field.options).forEach(function (opt) {
      opt.selected = arr.includes(opt.value);
    });
  };
  populateRecordingResolutionDropdown(info.recordingResolution);
  populateSensorModeDropdown(info.sensorMode);
  populateCodecDropdown(info.codec);
  if (typeof populateFrameRateDropdown === 'function') {
    populateFrameRateDropdown(info.recordingFrameRate);
  }
  setVal('productionCompany', info.productionCompany);
  var normalizedAddressFields = function () {
    var resolved = {
      street: info.productionCompanyStreet || '',
      street2: info.productionCompanyStreet2 || '',
      city: info.productionCompanyCity || '',
      region: info.productionCompanyRegion || '',
      postalCode: info.productionCompanyPostalCode || '',
      country: info.productionCompanyCountry || ''
    };
    var hasStructuredValues = Object.values(resolved).some(function (value) {
      return value;
    });
    if (hasStructuredValues) {
      return resolved;
    }
    var legacyAddress = typeof info.productionCompanyAddress === 'string' ? info.productionCompanyAddress.trim() : '';
    if (!legacyAddress) {
      return resolved;
    }
    var lines = legacyAddress.split(/\r?\n/).map(function (line) {
      return line.trim();
    }).filter(Boolean);
    if (!lines.length) {
      return resolved;
    }
    resolved.street = lines[0] || '';
    resolved.street2 = lines[1] || '';
    if (lines.length >= 3) {
      resolved.city = lines.slice(2).join(', ');
    }
    return resolved;
  }();
  setVal('productionCompanyStreet', normalizedAddressFields.street);
  setVal('productionCompanyStreet2', normalizedAddressFields.street2);
  setVal('productionCompanyCity', normalizedAddressFields.city);
  setVal('productionCompanyRegion', normalizedAddressFields.region);
  setVal('productionCompanyPostalCode', normalizedAddressFields.postalCode);
  setVal('productionCompanyCountry', normalizedAddressFields.country);
  setVal('rentalHouse', info.rentalHouse);
  if (crewContainer) {
    crewContainer.innerHTML = '';
    var crewEntries = Array.isArray(info.people) ? info.people.map(function (person) {
      return person && _typeof(person) === 'object' ? _objectSpread({}, person) : {};
    }) : [];
    var profile = typeof getUserProfileSnapshot === 'function' ? getUserProfileSnapshot() : null;
    if (profile && _typeof(profile) === 'object') {
      var profileName = typeof profile.name === 'string' ? profile.name.trim() : '';
      var profileEmail = typeof profile.email === 'string' ? profile.email.trim() : '';
      var profilePhone = typeof profile.phone === 'string' ? profile.phone.trim() : '';
      var profileRole = typeof profile.role === 'string' ? profile.role.trim() : '';
      var profileAvatar = typeof profile.avatar === 'string' ? profile.avatar : '';
      var hasProfileDetails = Boolean(profileName || profileEmail || profilePhone || profileRole || profileAvatar);
      if (hasProfileDetails) {
        var normalizeToken = function normalizeToken(value) {
          if (!value) return '';
          var trimmed = value.trim();
          if (!trimmed) return '';
          try {
            return typeof trimmed.toLocaleLowerCase === 'function' ? trimmed.toLocaleLowerCase() : trimmed.toLowerCase();
          } catch (error) {
            void error;
            return trimmed.toLowerCase();
          }
        };
        var profileNameToken = normalizeToken(profileName);
        var profileEmailToken = normalizeToken(profileEmail);
        var profilePhoneToken = profilePhone || '';
        var alreadyPresent = crewEntries.some(function (person) {
          if (!person || _typeof(person) !== 'object') {
            return false;
          }
          var personNameToken = normalizeToken(typeof person.name === 'string' ? person.name : '');
          var personEmailToken = normalizeToken(typeof person.email === 'string' ? person.email : '');
          var personPhoneToken = typeof person.phone === 'string' ? person.phone.trim() : '';
          if (profileEmailToken && personEmailToken && personEmailToken === profileEmailToken) {
            return true;
          }
          if (profilePhoneToken && personPhoneToken && personPhoneToken === profilePhoneToken) {
            return true;
          }
          if (profileNameToken && personNameToken && personNameToken === profileNameToken) {
            return true;
          }
          return false;
        });
        if (!alreadyPresent) {
          crewEntries.unshift({
            role: profileRole || '',
            name: profileName || '',
            phone: profilePhone || '',
            email: profileEmail || '',
            avatar: profileAvatar || ''
          });
        }
      }
    }
    crewEntries.forEach(function (p) {
      return createCrewRow(p);
    });
  }
  if (prepContainer) {
    prepContainer.innerHTML = '';
    var prepArr = Array.isArray(info.prepDays) ? info.prepDays : info.prepDays ? String(info.prepDays).split('\n') : [''];
    if (!prepArr.length) prepArr.push('');
    prepArr.forEach(function (r) {
      var _r$split = r.split(' to '),
        _r$split2 = _slicedToArray(_r$split, 2),
        start = _r$split2[0],
        end = _r$split2[1];
      createPrepRow({
        start: start,
        end: end
      });
    });
  }
  if (shootContainer) {
    shootContainer.innerHTML = '';
    var shootArr = Array.isArray(info.shootingDays) ? info.shootingDays : info.shootingDays ? String(info.shootingDays).split('\n') : [''];
    if (!shootArr.length) shootArr.push('');
    shootArr.forEach(function (r) {
      var _r$split3 = r.split(' to '),
        _r$split4 = _slicedToArray(_r$split3, 2),
        start = _r$split4[0],
        end = _r$split4[1];
      createShootRow({
        start: start,
        end: end
      });
    });
  }
  if (returnContainer) {
    returnContainer.innerHTML = '';
    var returnArr = Array.isArray(info.returnDays) ? info.returnDays : info.returnDays ? String(info.returnDays).split('\n') : [''];
    if (!returnArr.length) returnArr.push('');
    returnArr.forEach(function (r) {
      var _r$split5 = r.split(' to '),
        _r$split6 = _slicedToArray(_r$split5, 2),
        start = _r$split6[0],
        end = _r$split6[1];
      createReturnRow({
        start: start,
        end: end
      });
    });
  }
  if (storageNeedsContainer) {
    storageNeedsContainer.innerHTML = '';
    var storageArr = Array.isArray(info.storageRequirements) ? info.storageRequirements : [];
    if (storageArr.length) {
      storageArr.forEach(function (entry) {
        return createStorageRequirementRow(entry);
      });
    } else {
      createStorageRequirementRow();
    }
  }
  setVal('deliveryResolution', info.deliveryResolution);
  setMulti('aspectRatio', info.aspectRatio);
  setVal('baseFrameRate', info.baseFrameRate);
  setVal('recordingFrameRate', info.recordingFrameRate);
  setVal('sensorMode', info.sensorMode);
  if (lensSelectionManager && typeof lensSelectionManager.applyInfo === 'function') {
    lensSelectionManager.applyInfo(info || {});
  }
  setMulti('requiredScenarios', info.requiredScenarios);
  setMulti('cameraHandle', info.cameraHandle);
  setVal('viewfinderExtension', info.viewfinderExtension);
  setVal('viewfinderEyeLeatherColor', info.viewfinderEyeLeatherColor);
  setVal('mattebox', info.mattebox);
  setMulti('gimbal', info.gimbal);
  setMulti('viewfinderSettings', info.viewfinderSettings);
  setMulti('frameGuides', info.frameGuides);
  setMulti('aspectMaskOpacity', info.aspectMaskOpacity);
  setMulti('videoDistribution', info.videoDistribution);
  setVal('monitoringConfiguration', info.monitoringConfiguration);
  setMulti('monitorUserButtons', info.monitorUserButtons);
  setMulti('cameraUserButtons', info.cameraUserButtons);
  setMulti('viewfinderUserButtons', info.viewfinderUserButtons);
  setVal('tripodHeadBrand', info.tripodHeadBrand);
  setVal('tripodBowl', info.tripodBowl);
  setMulti('tripodTypes', info.tripodTypes);
  setVal('tripodSpreader', info.tripodSpreader);
  setSliderBowlValue(info.sliderBowl || '');
  setEasyrigValue(info.easyrig || '');
  var filterTokens = parseFilterTokens(info.filter);
  setMulti('filter', filterTokens.map(function (t) {
    return t.type;
  }));
  renderFilterDetails(filterTokens);
  filterTokens.forEach(function (_ref0) {
    var type = _ref0.type,
      size = _ref0.size,
      values = _ref0.values;
    var sizeSel = document.getElementById("filter-size-".concat(filterId(type)));
    if (sizeSel) sizeSel.value = size;
    var valSel = document.getElementById("filter-values-".concat(filterId(type)));
    if (valSel) {
      var arr = Array.isArray(values) ? values : [];
      Array.from(valSel.options).forEach(function (opt) {
        opt.selected = arr.includes(opt.value);
      });
    }
  });
  if (projectForm) {
    var rentalInput = projectForm.querySelector('#rentalHouse');
    renderRentalHouseSuggestions(rentalInput);
    updateRentalHouseAssistiveDetails(rentalInput);
  }
  markProjectFormDataDirty();
}
function ensureZoomRemoteSetup(info) {
  if (!info || !info.tripodPreferences || !info.tripodPreferences.includes('Zoom Remote handle')) return;
  var motors = motorSelects.map(function (sel) {
    return sel.value;
  }).filter(function (v) {
    return v && v !== 'None';
  });
  if (!motors.length) return;
  if (motors.length < 2 && motorSelects[1]) {
    var second = motors[0];
    if (/cforce.*rf/i.test(second) && devices.fiz.motors['Arri Cforce Mini']) {
      second = 'Arri Cforce Mini';
    }
    motorSelects[1].value = second;
    motors = motorSelects.map(function (sel) {
      return sel.value;
    }).filter(function (v) {
      return v && v !== 'None';
    });
  }
  var allowed = new Set(['Arri Master Grip (single unit)', 'Arri ZMU-4 (body only, wired)', 'Tilta Nucleus-M Hand Grip (single)', 'Tilta Nucleus-M II Handle (single)']);
  var controllers = controllerSelects.map(function (sel) {
    return sel.value;
  }).filter(function (v) {
    return v && v !== 'None';
  });
  if (!controllers.some(function (c) {
    return allowed.has(c);
  })) {
    var brand = detectBrand(motors[0]);
    var ctrl = null;
    if (brand === 'arri') {
      ctrl = 'Arri Master Grip (single unit)';
    } else if (brand === 'tilta') {
      ctrl = 'Tilta Nucleus-M Hand Grip (single)';
    }
    if (ctrl && controllerSelects[0]) {
      controllerSelects[0].value = ctrl;
    }
  }
  if (typeof updateCalculations === 'function') updateCalculations();
  if (typeof saveCurrentSession === 'function') saveCurrentSession();
}
function stripAutoGearContext(name) {
  return (name || '').replace(/\s*\([^)]*\)\s*$/, '').trim();
}
function normalizeAutoGearName(name) {
  return stripAutoGearContext(name).toLowerCase();
}
function normalizeAutoGearNotesKey(value) {
  var base = typeof normalizeAutoGearText === 'function' ? normalizeAutoGearText(value, {
    collapseWhitespace: true
  }) : (value == null ? '' : String(value)).trim().replace(/\s+/g, ' ');
  if (!base) {
    return '';
  }
  return base.replace(/^[\t-\r \x2D\xA0\u1680\u2000-\u200A\u2013\u2014\u2028\u2029\u202F\u205F\u3000\uFEFF]+/, '').trim().toLowerCase();
}
function getAutoGearSpanNotesKey(span) {
  if (!span || !span.dataset) {
    return '';
  }
  var datasetNotes = typeof span.dataset.autoGearNotes === 'string' ? span.dataset.autoGearNotes : '';
  if (datasetNotes) {
    return normalizeAutoGearNotesKey(datasetNotes);
  }
  var notesNode = span.querySelector('.auto-gear-notes');
  if (!notesNode || typeof notesNode.textContent !== 'string') {
    return '';
  }
  return normalizeAutoGearNotesKey(notesNode.textContent);
}
function matchesAutoGearItem(target, actual) {
  if (!target || !actual) return false;
  var normTarget = normalizeAutoGearName(target);
  var normActual = normalizeAutoGearName(actual);
  if (normTarget === normActual) return true;
  return normTarget === normalizeAutoGearName(actual.replace(/^\d+x\s+/, ''));
}
function isOnboardMonitorRiggingItemName(name) {
  if (typeof name !== 'string') return false;
  var normalizedTarget = normalizeAutoGearName(ONBOARD_MONITOR_RIGGING_ITEM_NAME);
  if (!normalizedTarget) return false;
  return normalizeAutoGearName(name) === normalizedTarget;
}
function isOnboardMonitorRiggingItemEntry(entry) {
  if (!entry || _typeof(entry) !== 'object') return false;
  return isOnboardMonitorRiggingItemName(entry.name);
}
function getOnboardMonitorRiggingRuleLabel() {
  if ((typeof texts === "undefined" ? "undefined" : _typeof(texts)) === 'object' && texts) {
    var _texts$currentLang, _texts$en;
    var localized = (_texts$currentLang = texts[currentLang]) === null || _texts$currentLang === void 0 ? void 0 : _texts$currentLang.autoGearMonitorLabel;
    if (typeof localized === 'string' && localized.trim()) {
      return localized.trim();
    }
    var fallback = (_texts$en = texts.en) === null || _texts$en === void 0 ? void 0 : _texts$en.autoGearMonitorLabel;
    if (typeof fallback === 'string' && fallback.trim()) {
      return fallback.trim();
    }
  }
  return 'Onboard monitors';
}
function ensureOnboardMonitorRiggingAutoGearHighlight(table) {
  if (!table || typeof table.querySelectorAll !== 'function') {
    return;
  }
  var target = normalizeAutoGearName(ONBOARD_MONITOR_RIGGING_ITEM_NAME);
  if (!target) return;
  var label = getOnboardMonitorRiggingRuleLabel();
  var fallbackRule = {
    id: ONBOARD_MONITOR_RIGGING_RULE_ID,
    label: label
  };
  var spans = Array.from(table.querySelectorAll('.gear-item')).filter(function (span) {
    if (!span) return false;
    var dataName = typeof span.getAttribute === 'function' ? span.getAttribute('data-gear-name') : '';
    var textSource = dataName || span.textContent || '';
    return normalizeAutoGearName(textSource) === target;
  });
  if (!spans.length) {
    return;
  }
  spans.forEach(function (span) {
    var quantity = Math.max(1, getSpanCount(span));
    if (!span.classList.contains('auto-gear-item')) {
      var normalizedItem = normalizeAutoGearItem({
        id: ONBOARD_MONITOR_RIGGING_ITEM_ID,
        name: ONBOARD_MONITOR_RIGGING_ITEM_NAME,
        category: 'Rigging',
        quantity: quantity,
        contextNotes: [label]
      });
      configureAutoGearSpan(span, normalizedItem, quantity, fallbackRule);
      return;
    }
    appendAutoGearRuleSource(span, fallbackRule);
    applyAutoGearRuleColors(span, fallbackRule);
    var contextMap = getAutoGearSpanContextMap(span);
    if (!contextMap.has(label)) {
      mergeAutoGearSpanContextNotes(span, [label], quantity);
    } else {
      renderAutoGearSpanContextNotes(span);
    }
    refreshAutoGearRuleBadge(span);
  });
}
function getSpanCount(span) {
  if (!span) return 1;
  var text = span.textContent || '';
  var match = text.trim().match(/^(\d+)x\s+/);
  return match ? parseInt(match[1], 10) : 1;
}
function updateSpanCountInPlace(span, newCount) {
  if (!span) return;
  var walker = document.createTreeWalker(span, NodeFilter.SHOW_TEXT, null, false);
  var textNode = null;
  while (walker.nextNode()) {
    var node = walker.currentNode;
    if (/\d+x\s+/i.test(node.textContent)) {
      textNode = node;
      break;
    }
  }
  if (!textNode) {
    span.insertBefore(document.createTextNode("".concat(newCount, "x ")), span.firstChild);
    return;
  }
  var value = textNode.textContent || '';
  var match = value.match(/^(\s*)(\d+)x\s+(.*)$/);
  if (match) {
    textNode.textContent = "".concat(match[1]).concat(newCount, "x ").concat(match[3]);
  } else {
    textNode.textContent = value.replace(/^(\d+)x\s+/, "".concat(newCount, "x "));
  }
}
function cleanupAutoGearCell(cell) {
  if (!cell) return;
  var nodes = Array.from(cell.childNodes);
  var previousWasBreak = true;
  nodes.forEach(function (node) {
    if (node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) {
      cell.removeChild(node);
      return;
    }
    if (node.nodeName === 'BR') {
      if (previousWasBreak || !node.nextSibling) {
        cell.removeChild(node);
        return;
      }
      previousWasBreak = true;
    } else {
      previousWasBreak = false;
    }
  });
  while (cell.firstChild && cell.firstChild.nodeName === 'BR') {
    cell.removeChild(cell.firstChild);
  }
  while (cell.lastChild && cell.lastChild.nodeName === 'BR') {
    cell.removeChild(cell.lastChild);
  }
  var textContent = cell.textContent ? cell.textContent.trim() : '';
  if (!textContent && !cell.querySelector('.gear-item')) {
    var row = cell.closest('tr');
    var section = row ? row.closest('tbody') : null;
    if (section && section.classList.contains('auto-gear-category')) {
      section.remove();
    }
  }
}
function analyzeAutoGearSegment(nodes) {
  if (!nodes || !nodes.length) return null;
  var span = nodes.find(function (node) {
    return node.nodeType === 1 && node.classList && node.classList.contains('gear-item');
  });
  if (span) {
    var name = span.getAttribute('data-gear-name') || (span.textContent || '').replace(/^(\d+)x\s+/, '').trim();
    var _count = getSpanCount(span);
    return {
      span: span,
      name: name,
      count: _count
    };
  }
  var wrapper = document.createElement('div');
  nodes.forEach(function (node) {
    return wrapper.appendChild(node.cloneNode(true));
  });
  var text = wrapper.innerHTML.replace(/<select[\s\S]*?<\/select>/gi, '').replace(/<[^>]+>/g, '').trim();
  if (!text) return null;
  var match = text.match(/^(\d+)x\s+/);
  var count = 1;
  if (match) {
    count = parseInt(match[1], 10);
    text = text.slice(match[0].length).trim();
  }
  return {
    span: null,
    name: text,
    count: count,
    wrapper: wrapper
  };
}
function updateRawSegmentCount(nodes, info, newCount) {
  if (!nodes.length) return;
  var updated = false;
  var _iterator = _createForOfIteratorHelper(nodes),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var node = _step.value;
      if (node.nodeType === Node.TEXT_NODE) {
        var value = node.textContent || '';
        if (/\d+x\s+/i.test(value)) {
          node.textContent = value.replace(/^(\s*)(\d+)x\s+/, function (match, spaces) {
            return "".concat(spaces).concat(newCount, "x ");
          });
          updated = true;
          break;
        }
        if (value.trim()) {
          node.textContent = "".concat(newCount, "x ").concat(value.trim().replace(/^(\d+)x\s+/, ''));
          updated = true;
          break;
        }
      } else if (node.nodeType === 1) {
        var child = node.firstChild;
        if (child && child.nodeType === Node.TEXT_NODE && /\d+x\s+/i.test(child.textContent || '')) {
          child.textContent = (child.textContent || '').replace(/^(\s*)(\d+)x\s+/, function (match, spaces) {
            return "".concat(spaces).concat(newCount, "x ");
          });
          updated = true;
          break;
        }
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  if (!updated) {
    var first = nodes[0];
    var parent = first.parentNode;
    if (parent) {
      parent.insertBefore(document.createTextNode("".concat(newCount, "x ").concat(info.name)), first);
    }
  }
}
function removeAutoGearItem(cell, item, remainingOverride) {
  if (!cell) return normalizeAutoGearQuantity(item.quantity);
  var remaining = typeof remainingOverride === 'number' ? remainingOverride : normalizeAutoGearQuantity(item.quantity);
  if (remaining <= 0) return remaining;
  var nodes = Array.from(cell.childNodes);
  if (!nodes.length) return remaining;
  var segments = [];
  var current = [];
  nodes.forEach(function (node) {
    if (node.nodeName === 'BR') {
      segments.push({
        nodes: current,
        separator: node
      });
      current = [];
    } else {
      current.push(node);
    }
  });
  segments.push({
    nodes: current,
    separator: null
  });
  var modified = false;
  segments.forEach(function (segment) {
    if (!segment.nodes.length || remaining <= 0) return;
    var info = analyzeAutoGearSegment(segment.nodes);
    if (!info || !info.name || !matchesAutoGearItem(item.name, info.name)) return;
    if (info.span) {
      var currentCount = info.count;
      if (currentCount > remaining) {
        updateSpanCountInPlace(info.span, currentCount - remaining);
        remaining = 0;
      } else {
        remaining -= currentCount;
        segment.nodes.forEach(function (node) {
          return node.remove();
        });
      }
      modified = true;
    } else {
      if (info.count > remaining && info.count > 1) {
        updateRawSegmentCount(segment.nodes, info, info.count - remaining);
        remaining = 0;
        modified = true;
      } else {
        remaining -= info.count;
        segment.nodes.forEach(function (node) {
          return node.remove();
        });
        modified = true;
      }
    }
  });
  if (modified) {
    cleanupAutoGearCell(cell);
  }
  return remaining;
}
function getCrewRoleLabelForDisplay(value) {
  var _texts$en2;
  if (typeof value !== 'string') return '';
  var trimmed = value.trim();
  if (!trimmed) return '';
  var langTexts = texts[currentLang] || texts.en || {};
  var crewRoleLabels = langTexts.crewRoles || ((_texts$en2 = texts.en) === null || _texts$en2 === void 0 ? void 0 : _texts$en2.crewRoles) || {};
  return (crewRoleLabels === null || crewRoleLabels === void 0 ? void 0 : crewRoleLabels[trimmed]) || trimmed;
}
function getAutoGearRuleDisplayLabel(rule) {
  if (!rule || _typeof(rule) !== 'object') return '';
  var label = typeof rule.label === 'string' ? rule.label.trim() : '';
  if (label) return label;
  var scenarioList = Array.isArray(rule.scenarios) ? rule.scenarios.filter(Boolean) : [];
  if (scenarioList.length) return scenarioList.join(' + ');
  var cameraList = Array.isArray(rule.camera) ? rule.camera.filter(Boolean) : [];
  if (cameraList.length) return cameraList.join(' + ');
  var monitorList = Array.isArray(rule.monitor) ? rule.monitor.filter(Boolean) : [];
  if (monitorList.length) return monitorList.join(' + ');
  var crewPresentList = Array.isArray(rule.crewPresent) ? rule.crewPresent.filter(Boolean) : [];
  if (crewPresentList.length) {
    return crewPresentList.map(getCrewRoleLabelForDisplay).join(' + ');
  }
  var crewAbsentList = Array.isArray(rule.crewAbsent) ? rule.crewAbsent.filter(Boolean) : [];
  if (crewAbsentList.length) {
    return crewAbsentList.map(getCrewRoleLabelForDisplay).join(' + ');
  }
  var wirelessList = Array.isArray(rule.wireless) ? rule.wireless.filter(Boolean) : [];
  if (wirelessList.length) return wirelessList.join(' + ');
  var motorsList = Array.isArray(rule.motors) ? rule.motors.filter(Boolean) : [];
  if (motorsList.length) return motorsList.join(' + ');
  var controllersList = Array.isArray(rule.controllers) ? rule.controllers.filter(Boolean) : [];
  if (controllersList.length) return controllersList.join(' + ');
  var distanceList = Array.isArray(rule.distance) ? rule.distance.filter(Boolean) : [];
  if (distanceList.length) return distanceList.join(' + ');
  var matteboxList = Array.isArray(rule.mattebox) ? rule.mattebox.filter(Boolean) : [];
  if (matteboxList.length) return matteboxList.join(' + ');
  var cameraHandleList = Array.isArray(rule.cameraHandle) ? rule.cameraHandle.filter(Boolean) : [];
  if (cameraHandleList.length) return cameraHandleList.join(' + ');
  var viewfinderList = Array.isArray(rule.viewfinderExtension) ? rule.viewfinderExtension.filter(Boolean).map(getViewfinderFallbackLabel) : [];
  if (viewfinderList.length) return viewfinderList.join(' + ');
  var videoDistributionList = Array.isArray(rule.videoDistribution) ? rule.videoDistribution.filter(Boolean).map(getVideoDistributionFallbackLabel) : [];
  if (videoDistributionList.length) return videoDistributionList.join(' + ');
  return '';
}
function formatAutoGearRuleTooltip(rule) {
  var _texts$en3;
  var langTexts = texts[currentLang] || texts.en || {};
  var unnamedTemplate = langTexts.autoGearRuleTooltipUnnamed || ((_texts$en3 = texts.en) === null || _texts$en3 === void 0 ? void 0 : _texts$en3.autoGearRuleTooltipUnnamed) || 'Added by automatic gear rule';
  if (!rule || _typeof(rule) !== 'object') return unnamedTemplate;
  var label = getAutoGearRuleDisplayLabel(rule);
  if (label) {
    var _texts$en4;
    var namedTemplate = langTexts.autoGearRuleTooltipNamed || ((_texts$en4 = texts.en) === null || _texts$en4 === void 0 ? void 0 : _texts$en4.autoGearRuleTooltipNamed) || "".concat(unnamedTemplate, ": %s");
    return namedTemplate.replace('%s', label);
  }
  return unnamedTemplate;
}
function extractAutoGearRuleSource(rule) {
  if (!rule || _typeof(rule) !== 'object') return null;
  var id = typeof rule.id === 'string' ? rule.id.trim() : '';
  var label = getAutoGearRuleDisplayLabel(rule);
  if (!id && !label) return null;
  return {
    id: id,
    label: label
  };
}
function normalizeAutoGearRuleSourceEntry(entry) {
  if (!entry) return null;
  if (typeof entry === 'string') {
    var trimmed = entry.trim();
    if (!trimmed) return null;
    return {
      id: '',
      label: trimmed
    };
  }
  if (_typeof(entry) !== 'object') return null;
  var id = typeof entry.id === 'string' ? entry.id.trim() : '';
  var label = typeof entry.label === 'string' ? entry.label.trim() : '';
  if (!id && !label) return null;
  return {
    id: id,
    label: label
  };
}
function dedupeAutoGearRuleSources(entries) {
  if (!Array.isArray(entries) || !entries.length) return [];
  var seen = new Set();
  var normalized = [];
  entries.forEach(function (entry) {
    var source = normalizeAutoGearRuleSourceEntry(entry);
    if (!source) return;
    var idKey = source.id ? source.id.toLowerCase() : '';
    var labelKey = source.label ? source.label.toLowerCase() : '';
    var key = idKey ? "id:".concat(idKey) : labelKey ? "label:".concat(labelKey) : '';
    if (!key || seen.has(key)) return;
    seen.add(key);
    normalized.push({
      id: source.id,
      label: source.label
    });
  });
  return normalized;
}
function formatAutoGearSelectorDisplayValue(type, value) {
  var normalizedValue = typeof value === 'string' ? value : value == null ? '' : String(value);
  var scope = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : {};
  if (typeof scope.formatAutoGearSelectorValue === 'function') {
    return scope.formatAutoGearSelectorValue(type, normalizedValue);
  }
  if (typeof addArriKNumber === 'function' && (type === 'monitor' || type === 'directorMonitor')) {
    return addArriKNumber(normalizedValue);
  }
  return normalizedValue;
}
function getAutoGearRuleSources(span) {
  if (!span || !span.dataset) return [];
  var dataset = span.dataset;
  var raw = typeof dataset.autoGearRuleSources === 'string' ? dataset.autoGearRuleSources : '';
  var sources = [];
  if (raw) {
    try {
      var parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        sources = dedupeAutoGearRuleSources(parsed);
      }
    } catch (error) {
      console.warn('Failed to parse automatic gear rule metadata', error);
      sources = [];
    }
  }
  if (!sources.length) {
    sources = dedupeAutoGearRuleSources([{
      id: dataset.autoGearRuleId,
      label: dataset.autoGearRuleLabel
    }]);
  }
  return sources;
}
function setAutoGearRuleSources(span, entries) {
  if (!span || !span.dataset) return;
  var normalized = dedupeAutoGearRuleSources(entries);
  var dataset = span.dataset;
  if (!normalized.length) {
    delete dataset.autoGearRuleSources;
    delete dataset.autoGearRuleId;
    delete dataset.autoGearRuleLabel;
    return;
  }
  try {
    dataset.autoGearRuleSources = JSON.stringify(normalized);
  } catch (error) {
    console.warn('Failed to serialize automatic gear rule metadata', error);
  }
  var primary = normalized[0];
  if (primary.id) {
    dataset.autoGearRuleId = primary.id;
  } else {
    delete dataset.autoGearRuleId;
  }
  if (primary.label) {
    dataset.autoGearRuleLabel = primary.label;
  } else {
    delete dataset.autoGearRuleLabel;
  }
}
function appendAutoGearRuleSource(span, rule) {
  if (!span || !span.dataset) return;
  var addition = extractAutoGearRuleSource(rule);
  var existing = getAutoGearRuleSources(span);
  if (addition) {
    existing.push(addition);
  }
  setAutoGearRuleSources(span, existing);
}
function buildAutoGearRuleTooltipFromSources(sources) {
  if (!Array.isArray(sources) || !sources.length) return '';
  var labels = sources.map(function (source) {
    if (!source) return '';
    var label = typeof source.label === 'string' ? source.label.trim() : '';
    if (label) return label;
    var id = typeof source.id === 'string' ? source.id.trim() : '';
    return id;
  }).filter(Boolean);
  if (!labels.length) return '';
  return formatAutoGearRuleTooltip({
    label: labels.join(', ')
  });
}
function getAutoGearSpanContextMap(span) {
  if (!span || !span.dataset || !span.dataset.autoGearContextCounts) return new Map();
  try {
    var parsed = JSON.parse(span.dataset.autoGearContextCounts);
    if (!parsed || _typeof(parsed) !== 'object') return new Map();
    var map = new Map();
    Object.keys(parsed).forEach(function (key) {
      var normalizedKey = key && key.trim();
      if (!normalizedKey) return;
      var count = Number(parsed[key]);
      if (!Number.isFinite(count) || count <= 0) return;
      map.set(normalizedKey, count);
    });
    return map;
  } catch (error) {
    return new Map();
  }
}
function saveAutoGearSpanContextMap(span, map) {
  if (!span || !span.dataset) return;
  if (!map || !(map instanceof Map) || map.size === 0) {
    delete span.dataset.autoGearContextCounts;
    return;
  }
  var obj = {};
  map.forEach(function (value, key) {
    if (!key) return;
    if (!Number.isFinite(value) || value <= 0) return;
    obj[key] = value;
  });
  var keys = Object.keys(obj);
  if (!keys.length) {
    delete span.dataset.autoGearContextCounts;
  } else {
    span.dataset.autoGearContextCounts = JSON.stringify(obj);
  }
}
var AUTO_GEAR_CONTEXT_SORT_PRIORITY = new Map([['director handheld', 1], ['gaffer handheld', 2], ['dop handheld', 3]]);
function setAutoGearSpanContextNotes(span, contexts, quantity) {
  if (!span || !span.dataset) return;
  var map = new Map();
  var baseQty = Math.max(0, Number(quantity) || 0);
  if (Array.isArray(contexts)) {
    contexts.forEach(function (note) {
      var key = note && note.trim();
      if (!key) return;
      map.set(key, (map.get(key) || 0) + baseQty);
    });
  }
  saveAutoGearSpanContextMap(span, map);
  renderAutoGearSpanContextNotes(span);
}
function mergeAutoGearSpanContextNotes(span, contexts, quantity) {
  if (!span || !span.dataset) {
    renderAutoGearSpanContextNotes(span);
    return;
  }
  if (!Array.isArray(contexts) || !contexts.length) {
    renderAutoGearSpanContextNotes(span);
    return;
  }
  var map = getAutoGearSpanContextMap(span);
  var delta = Math.max(0, Number(quantity) || 0);
  if (delta <= 0) {
    renderAutoGearSpanContextNotes(span);
    return;
  }
  contexts.forEach(function (note) {
    var key = note && note.trim();
    if (!key) return;
    map.set(key, (map.get(key) || 0) + delta);
  });
  saveAutoGearSpanContextMap(span, map);
  renderAutoGearSpanContextNotes(span);
}
function renderAutoGearSpanContextNotes(span) {
  if (!span) return;
  var map = getAutoGearSpanContextMap(span);
  var entries = Array.from(map.entries()).filter(function (_ref1) {
    var _ref10 = _slicedToArray(_ref1, 2),
      count = _ref10[1];
    return Number.isFinite(count) && count > 0;
  });
  var contextNode = span.querySelector('.auto-gear-context-notes');
  if (entries.length <= 1) {
    if (contextNode) {
      contextNode.remove();
    }
    return;
  }
  var parts = entries.sort(function (_ref11, _ref12) {
    var _AUTO_GEAR_CONTEXT_SO, _AUTO_GEAR_CONTEXT_SO2;
    var _ref13 = _slicedToArray(_ref11, 1),
      a = _ref13[0];
    var _ref14 = _slicedToArray(_ref12, 1),
      b = _ref14[0];
    var pa = (_AUTO_GEAR_CONTEXT_SO = AUTO_GEAR_CONTEXT_SORT_PRIORITY.get(a.trim().toLowerCase())) !== null && _AUTO_GEAR_CONTEXT_SO !== void 0 ? _AUTO_GEAR_CONTEXT_SO : Number.POSITIVE_INFINITY;
    var pb = (_AUTO_GEAR_CONTEXT_SO2 = AUTO_GEAR_CONTEXT_SORT_PRIORITY.get(b.trim().toLowerCase())) !== null && _AUTO_GEAR_CONTEXT_SO2 !== void 0 ? _AUTO_GEAR_CONTEXT_SO2 : Number.POSITIVE_INFINITY;
    if (pa !== pb) return pa - pb;
    return a.localeCompare(b, undefined, {
      sensitivity: 'base'
    });
  }).map(function (_ref15) {
    var _ref16 = _slicedToArray(_ref15, 2),
      note = _ref16[0],
      count = _ref16[1];
    return "".concat(count, "x ").concat(note);
  });
  var text = " (".concat(parts.join(', '), ")");
  if (!contextNode) {
    contextNode = document.createElement('span');
    contextNode.className = 'auto-gear-context-notes';
    var selectorContainer = span.querySelector('.auto-gear-selector-container');
    var notesNode = span.querySelector('.auto-gear-notes');
    var referenceNode = selectorContainer || notesNode;
    if (referenceNode && referenceNode.parentNode === span) {
      span.insertBefore(contextNode, referenceNode);
    } else {
      span.appendChild(contextNode);
    }
  }
  contextNode.textContent = text;
}
function configureAutoGearSpan(span, normalizedItem, quantity, rule) {
  var _span$getAttribute;
  if (!span || !normalizedItem) return;
  var name = normalizedItem.name ? normalizedItem.name.trim() : '';
  if (!name) return;
  var rentalTexts = getGearListRentalToggleTexts();
  var rentalNote = rentalTexts && typeof rentalTexts.noteLabel === 'string' ? rentalTexts.noteLabel.trim() : '';
  var wasRentalExcluded = span.classList && span.classList.contains('gear-item-rental-excluded') || ((_span$getAttribute = span.getAttribute) === null || _span$getAttribute === void 0 ? void 0 : _span$getAttribute.call(span, 'data-rental-excluded')) === 'true';
  while (span.firstChild) {
    span.removeChild(span.firstChild);
  }
  span.classList.add('gear-item');
  span.classList.add('auto-gear-item');
  span.setAttribute('data-gear-name', name);
  if (rentalNote) {
    span.setAttribute('data-rental-note', rentalNote);
  } else if (span.removeAttribute) {
    span.removeAttribute('data-rental-note');
  }
  if (span.dataset) {
    delete span.dataset.autoGearContextCounts;
  }
  if (span.dataset) {
    var source = extractAutoGearRuleSource(rule);
    setAutoGearRuleSources(span, source ? [source] : []);
  }
  var tooltipSources = getAutoGearRuleSources(span);
  var tooltip = tooltipSources.length ? buildAutoGearRuleTooltipFromSources(tooltipSources) : formatAutoGearRuleTooltip(rule);
  if (tooltip) {
    span.title = tooltip;
  } else {
    span.removeAttribute('title');
  }
  var displayName = typeof addArriKNumber === 'function' ? addArriKNumber(name) : name;
  span.appendChild(document.createTextNode("".concat(quantity, "x ").concat(displayName)));
  if (normalizedItem.screenSize) {
    span.appendChild(document.createTextNode(" - ".concat(normalizedItem.screenSize)));
  }
  if (span.dataset) {
    if (normalizedItem.ownGearId) {
      span.dataset.autoGearOwnGearId = normalizedItem.ownGearId;
    } else if (Object.prototype.hasOwnProperty.call(span.dataset, 'autoGearOwnGearId')) {
      delete span.dataset.autoGearOwnGearId;
    }
  }
  if (normalizedItem.ownGearId) {
    setGearItemProvider(span, 'user');
  }
  if (Array.isArray(normalizedItem.contextNotes) && normalizedItem.contextNotes.length) {
    setAutoGearSpanContextNotes(span, normalizedItem.contextNotes, quantity);
  } else {
    renderAutoGearSpanContextNotes(span);
  }
  var selectorType = normalizedItem.selectorType || 'none';
  var selectorDefault = normalizedItem.selectorDefault || '';
  var selectorLabel = getAutoGearSelectorLabel(selectorType);
  if (selectorType && selectorType !== 'none') {
    if (normalizedItem.selectorEnabled) {
      var options = getAutoGearSelectorOptions(selectorType, normalizedItem);
      var sanitizedRuleId = rule && rule.id ? rule.id.replace(/[^a-zA-Z0-9_-]/g, '') : 'rule';
      var selectId = "autoGearSelector_".concat(sanitizedRuleId, "_").concat(normalizedItem.id);
      var select = document.createElement('select');
      select.id = selectId;
      select.className = 'auto-gear-selector';
      select.dataset.autoGearSelectorType = selectorType;
      if (normalizedItem.selectorContext) {
        select.dataset.autoGearSelectorContext = normalizedItem.selectorContext;
      }
      if (selectorLabel) {
        select.setAttribute('aria-label', selectorLabel);
      }
      var normalizedDefaultValue = '';
      options.forEach(function (optionName) {
        var option = document.createElement('option');
        option.value = optionName;
        option.textContent = formatAutoGearSelectorDisplayValue(selectorType, optionName);
        if (!normalizedDefaultValue && selectorDefault && optionName.toLowerCase() === selectorDefault.toLowerCase()) {
          normalizedDefaultValue = option.value;
        }
        select.appendChild(option);
      });
      if (selectorDefault && !normalizedDefaultValue) {
        var fallbackOption = document.createElement('option');
        fallbackOption.value = selectorDefault;
        fallbackOption.textContent = formatAutoGearSelectorDisplayValue(selectorType, selectorDefault);
        select.insertBefore(fallbackOption, select.firstChild);
        normalizedDefaultValue = selectorDefault;
      }
      if (normalizedDefaultValue) {
        select.value = normalizedDefaultValue;
      } else if (select.options.length) {
        select.selectedIndex = 0;
      }
      if (!select.options.length) {
        var placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.textContent = selectorLabel || '';
        placeholder.disabled = true;
        placeholder.selected = true;
        select.appendChild(placeholder);
        select.disabled = true;
      }
      var wrapper = document.createElement('span');
      wrapper.className = 'auto-gear-selector-container';
      wrapper.appendChild(select);
      span.appendChild(document.createTextNode(' - '));
      span.appendChild(wrapper);
    } else if (selectorDefault) {
      var formattedDefault = formatAutoGearSelectorDisplayValue(selectorType, selectorDefault);
      span.appendChild(document.createTextNode(" - ".concat(selectorLabel, ": ").concat(formattedDefault)));
    } else if (selectorLabel) {
      span.appendChild(document.createTextNode(" - ".concat(selectorLabel)));
    }
  }
  if (span.dataset) {
    if (normalizedItem.notes) {
      span.dataset.autoGearNotes = normalizedItem.notes;
    } else if (Object.prototype.hasOwnProperty.call(span.dataset, 'autoGearNotes')) {
      delete span.dataset.autoGearNotes;
    }
  }
  if (normalizedItem.notes) {
    var delimiter = normalizedItem.notes.trim().toLowerCase().startsWith('incl') ? ' ' : ' – ';
    var notesSpan = document.createElement('span');
    notesSpan.className = 'auto-gear-notes';
    notesSpan.textContent = "".concat(delimiter).concat(normalizedItem.notes);
    span.appendChild(notesSpan);
  }
  setRentalExclusionState(span, wasRentalExcluded);
  applyAutoGearRuleColors(span, rule);
  refreshAutoGearRuleBadge(span);
}
function addAutoGearItem(cell, item, rule) {
  if (!cell) return;
  var normalizedItem = normalizeAutoGearItem(item);
  if (!normalizedItem) return;
  var quantity = normalizeAutoGearQuantity(normalizedItem.quantity);
  if (quantity <= 0) return;
  var name = normalizedItem.name ? normalizedItem.name.trim() : '';
  if (!name) return;
  var spans = Array.from(cell.querySelectorAll('.gear-item'));
  var targetNotesKey = normalizeAutoGearNotesKey(normalizedItem.notes);
  for (var _i1 = 0, _spans = spans; _i1 < _spans.length; _i1++) {
    var _span = _spans[_i1];
    var spanName = _span.getAttribute('data-gear-name') || (_span.textContent || '').replace(/^(\d+)x\s+/, '').trim();
    if (matchesAutoGearItem(name, spanName)) {
      var spanNotesKey = getAutoGearSpanNotesKey(_span);
      if (targetNotesKey) {
        if (_span.classList.contains('auto-gear-item')) {
          if (!spanNotesKey || spanNotesKey !== targetNotesKey) {
            continue;
          }
        } else if (spanNotesKey && spanNotesKey !== targetNotesKey) {
          continue;
        }
      } else if (_span.classList.contains('auto-gear-item') && spanNotesKey) {
        continue;
      }
      if (_span.classList.contains('auto-gear-item')) {
        var newCount = getSpanCount(_span) + quantity;
        updateSpanCountInPlace(_span, newCount);
        if (Array.isArray(normalizedItem.contextNotes) && normalizedItem.contextNotes.length) {
          mergeAutoGearSpanContextNotes(_span, normalizedItem.contextNotes, quantity);
        } else {
          renderAutoGearSpanContextNotes(_span);
        }
        if (_span.dataset) {
          if (normalizedItem.notes) {
            _span.dataset.autoGearNotes = normalizedItem.notes;
          } else if (Object.prototype.hasOwnProperty.call(_span.dataset, 'autoGearNotes')) {
            delete _span.dataset.autoGearNotes;
          }
        }
        if (rule && _typeof(rule) === 'object') {
          appendAutoGearRuleSource(_span, rule);
        } else if (_span.dataset) {
          setAutoGearRuleSources(_span, getAutoGearRuleSources(_span));
        }
        var tooltip = buildAutoGearRuleTooltipFromSources(getAutoGearRuleSources(_span));
        if (tooltip) {
          _span.title = tooltip;
        } else {
          _span.removeAttribute('title');
        }
        applyAutoGearRuleColors(_span, rule);
        refreshAutoGearRuleBadge(_span);
      } else {
        configureAutoGearSpan(_span, normalizedItem, quantity, rule);
      }
      return;
    }
  }
  if (cell.childNodes.length) {
    cell.appendChild(document.createElement('br'));
  }
  var span = document.createElement('span');
  configureAutoGearSpan(span, normalizedItem, quantity, rule);
  cell.appendChild(span);
}
function ensureAutoGearCategory(table, category) {
  var _texts$currentLang2, _texts$en5;
  var rawCategory = category && category.trim() ? category.trim() : '';
  var label = rawCategory || AUTO_GEAR_CUSTOM_CATEGORY;
  var existing = Array.from(table.querySelectorAll('tbody.category-group')).find(function (body) {
    if (body.dataset) {
      if (Object.prototype.hasOwnProperty.call(body.dataset, 'autoCategory')) {
        return body.dataset.autoCategory === rawCategory;
      }
      if (rawCategory && Object.prototype.hasOwnProperty.call(body.dataset, 'gearTableCategory')) {
        return body.dataset.gearTableCategory === rawCategory;
      }
    }
    var headerCell = body.querySelector('.category-row td');
    if (!headerCell) return false;
    var storedLabel = headerCell.getAttribute('data-gear-category-label') || headerCell.textContent.trim();
    if (rawCategory) {
      return storedLabel === rawCategory;
    }
    return body.classList.contains('auto-gear-category') || storedLabel === label;
  });
  if (existing) {
    var cell = existing.querySelector('tr:not(.category-row) td');
    return cell || null;
  }
  var body = document.createElement('tbody');
  body.className = 'category-group auto-gear-category';
  body.dataset.autoCategory = rawCategory;
  body.dataset.gearTableCategory = rawCategory || label;
  var headerRow = document.createElement('tr');
  headerRow.className = 'category-row';
  var headerCell = document.createElement('td');
  var labelText = rawCategory ? rawCategory : ((_texts$currentLang2 = texts[currentLang]) === null || _texts$currentLang2 === void 0 ? void 0 : _texts$currentLang2.autoGearCustomCategory) || ((_texts$en5 = texts.en) === null || _texts$en5 === void 0 ? void 0 : _texts$en5.autoGearCustomCategory) || 'Custom Additions';
  headerCell.setAttribute('data-gear-category-label', labelText);
  headerCell.textContent = labelText;
  headerRow.appendChild(headerCell);
  body.appendChild(headerRow);
  var itemsRow = document.createElement('tr');
  var itemsCell = document.createElement('td');
  itemsRow.appendChild(itemsCell);
  body.appendChild(itemsRow);
  table.appendChild(body);
  return itemsCell;
}
function findAutoGearCategoryCell(table, category) {
  if (!table) return null;
  var rawCategory = category && category.trim() ? category.trim() : '';
  var label = rawCategory || AUTO_GEAR_CUSTOM_CATEGORY;
  var bodies = Array.from(table.querySelectorAll('tbody.category-group'));
  for (var _i10 = 0, _bodies = bodies; _i10 < _bodies.length; _i10++) {
    var body = _bodies[_i10];
    if (body.dataset) {
      if (Object.prototype.hasOwnProperty.call(body.dataset, 'autoCategory')) {
        if (body.dataset.autoCategory === rawCategory) {
          var cell = body.querySelector('tr:not(.category-row) td');
          if (cell) return cell;
        }
        continue;
      }
      if (rawCategory && Object.prototype.hasOwnProperty.call(body.dataset, 'gearTableCategory')) {
        if (body.dataset.gearTableCategory === rawCategory) {
          var _cell = body.querySelector('tr:not(.category-row) td');
          if (_cell) return _cell;
        }
        continue;
      }
    }
    var headerCell = body.querySelector('.category-row td');
    if (!headerCell) continue;
    var headerLabel = headerCell.getAttribute('data-gear-category-label') || headerCell.textContent.trim();
    if (rawCategory) {
      if (headerLabel === rawCategory) {
        var _cell2 = body.querySelector('tr:not(.category-row) td');
        if (_cell2) return _cell2;
      }
    } else if (body.classList.contains('auto-gear-category') || headerLabel === label) {
      var _cell3 = body.querySelector('tr:not(.category-row) td');
      if (_cell3) return _cell3;
    }
  }
  return null;
}
function normalizeAutoGearScenarioLogicValue(value) {
  if (typeof value !== 'string') return 'all';
  var normalized = value.trim().toLowerCase();
  if (!normalized) return 'all';
  if (normalized === 'or') return 'any';
  if (normalized === 'and') return 'all';
  if (normalized === 'any') return 'any';
  if (normalized === 'multiplier' || normalized === 'multiply' || normalized === 'multiplied') {
    return 'multiplier';
  }
  return normalized === 'all' ? 'all' : 'all';
}
function normalizeAutoGearScenarioMultiplierValue(value) {
  var num = parseInt(value, 10);
  return Number.isFinite(num) && num > 1 ? num : 1;
}
function computeAutoGearScenarioOutcome(rule, scenarioSet) {
  if (!rule || _typeof(rule) !== 'object') {
    return {
      active: true,
      multiplier: 1
    };
  }
  var rawList = Array.isArray(rule.scenarios) ? rule.scenarios.filter(Boolean) : [];
  if (!rawList.length) {
    return {
      active: true,
      multiplier: 1
    };
  }
  var normalizedTargets = rawList.map(normalizeAutoGearTriggerValue).filter(Boolean);
  if (!normalizedTargets.length) {
    return {
      active: false,
      multiplier: 0
    };
  }
  var logic = normalizeAutoGearScenarioLogicValue(rule.scenarioLogic);
  if (logic === 'any') {
    var hasAny = normalizedTargets.some(function (target) {
      return scenarioSet.has(target);
    });
    return {
      active: hasAny,
      multiplier: hasAny ? 1 : 0
    };
  }
  if (logic === 'multiplier') {
    var requestedPrimary = typeof rule.scenarioPrimary === 'string' ? rule.scenarioPrimary : '';
    var normalizedPrimary = normalizeAutoGearTriggerValue(requestedPrimary);
    var baseTarget = '';
    if (normalizedPrimary && normalizedTargets.includes(normalizedPrimary)) {
      baseTarget = normalizedPrimary;
    } else {
      baseTarget = normalizedTargets[0] || '';
    }
    if (!baseTarget || !scenarioSet.has(baseTarget)) {
      return {
        active: false,
        multiplier: 0
      };
    }
    var extras = normalizedTargets.filter(function (target) {
      return target !== baseTarget;
    });
    if (!extras.length) {
      return {
        active: true,
        multiplier: 1
      };
    }
    var extrasSatisfied = extras.every(function (target) {
      return scenarioSet.has(target);
    });
    var multiplier = normalizeAutoGearScenarioMultiplierValue(rule.scenarioMultiplier);
    return {
      active: true,
      multiplier: extrasSatisfied ? multiplier : 1
    };
  }
  var allPresent = normalizedTargets.every(function (target) {
    return scenarioSet.has(target);
  });
  return {
    active: allPresent,
    multiplier: allPresent ? 1 : 0
  };
}
function normalizeClampOnDiameterKey(value) {
  if (!Number.isFinite(value)) return '';
  return Number(value).toFixed(3);
}
function formatClampOnDiameterLabel(value) {
  if (!Number.isFinite(value)) return '';
  var rounded = Number(Number(value).toFixed(2));
  if (!Number.isFinite(rounded)) return '';
  return String(rounded);
}
function shouldAugmentClampOnRule(rule) {
  if (!rule || _typeof(rule) !== 'object') return false;
  var matteboxList = Array.isArray(rule.mattebox) ? rule.mattebox.filter(Boolean) : [];
  if (!matteboxList.length) return false;
  var normalized = matteboxList.map(function (value) {
    return normalizeAutoGearTriggerValue(value).replace(/-/g, ' ');
  }).filter(Boolean);
  if (!normalized.length) return false;
  return normalized.includes('clamp on');
}
function buildClampOnBackingAdditionsFromInfo(info) {
  var lensNames = normalizeLensSelectionNames(info ? info.lenses : null);
  if (!lensNames.length) return [];
  var lensDb = devices && devices.lenses ? devices.lenses : null;
  if (!lensDb || _typeof(lensDb) !== 'object') return [];
  var normalizedLookup = new Map();
  Object.keys(lensDb).forEach(function (name) {
    if (typeof name !== 'string' || !name) return;
    var normalized = name.trim().toLowerCase();
    if (normalized && !normalizedLookup.has(normalized)) {
      normalizedLookup.set(normalized, lensDb[name]);
    }
  });
  var diameterMap = new Map();
  lensNames.forEach(function (selectionName) {
    if (typeof selectionName !== 'string') return;
    var trimmed = selectionName.trim();
    if (!trimmed) return;
    var normalized = trimmed.toLowerCase();
    var lens = Object.prototype.hasOwnProperty.call(lensDb, trimmed) ? lensDb[trimmed] : null;
    if (!lens && normalizedLookup.has(normalized)) {
      lens = normalizedLookup.get(normalized);
    }
    if (!lens || _typeof(lens) !== 'object') return;
    var diameter = Number(lens.frontDiameterMm);
    if (!Number.isFinite(diameter) || diameter <= 0) return;
    var key = normalizeClampOnDiameterKey(diameter);
    if (!key) return;
    if (!diameterMap.has(key)) {
      diameterMap.set(key, {
        diameter: diameter,
        lenses: []
      });
    }
    var entry = diameterMap.get(key);
    if (entry.lenses.indexOf(trimmed) === -1) {
      entry.lenses.push(trimmed);
    }
  });
  if (!diameterMap.size) return [];
  var sorted = Array.from(diameterMap.values()).sort(function (a, b) {
    if (a.diameter === b.diameter) return 0;
    return a.diameter < b.diameter ? -1 : 1;
  });
  return sorted.map(function (_ref17) {
    var diameter = _ref17.diameter,
      lenses = _ref17.lenses;
    var sizeLabel = formatClampOnDiameterLabel(diameter) || String(Number(diameter));
    var item = {
      name: "Mattebox Clamp-On Backing ".concat(sizeLabel, "mm"),
      category: 'Matte box + filter',
      quantity: 1
    };
    if (Array.isArray(lenses) && lenses.length) {
      item.contextNotes = ["Lenses: ".concat(lenses.join(', '))];
    }
    return item;
  });
}
function mergeAutoGearAdditions(baseAdditions, extraAdditions) {
  var result = [];
  var seen = new Set();
  var pushUnique = function pushUnique(item) {
    if (!item || _typeof(item) !== 'object') return;
    var name = typeof item.name === 'string' ? item.name.trim() : '';
    if (!name) return;
    var category = typeof item.category === 'string' ? item.category.trim() : '';
    var key = "".concat(name.toLowerCase(), "|").concat(category.toLowerCase());
    if (seen.has(key)) return;
    seen.add(key);
    result.push(item);
  };
  baseAdditions.forEach(pushUnique);
  extraAdditions.forEach(pushUnique);
  return result;
}
function applyAutoGearRulesToTableHtml(tableHtml, info) {
  if (!tableHtml || !autoGearRules.length || typeof document === 'undefined') return tableHtml;
  var scenarios = info && info.requiredScenarios ? info.requiredScenarios.split(',').map(function (s) {
    return s.trim();
  }).filter(Boolean) : [];
  var normalizedScenarioSet = new Set(scenarios.map(normalizeAutoGearTriggerValue).filter(Boolean));
  var selectedMattebox = info && typeof info.mattebox === 'string' ? info.mattebox.trim() : '';
  var normalizedMattebox = normalizeAutoGearTriggerValue(selectedMattebox);
  var cameraHandles = info && typeof info.cameraHandle === 'string' ? info.cameraHandle.split(',').map(function (s) {
    return s.trim();
  }).filter(Boolean) : [];
  var normalizedCameraHandles = cameraHandles.map(normalizeAutoGearTriggerValue).filter(Boolean);
  var cameraHandleSet = new Set(normalizedCameraHandles);
  var rawViewfinderExtension = info && typeof info.viewfinderExtension === 'string' ? info.viewfinderExtension.trim() : '';
  var hasViewfinderSelection = Boolean(rawViewfinderExtension);
  var normalizedViewfinderExtension = hasViewfinderSelection ? normalizeAutoGearTriggerValue(rawViewfinderExtension) : '';
  var rawDeliveryResolution = info && typeof info.deliveryResolution === 'string' ? info.deliveryResolution.trim() : '';
  var normalizedDeliveryResolution = normalizeAutoGearTriggerValue(rawDeliveryResolution);
  var videoDistribution = [];
  if (info && Array.isArray(info.videoDistribution)) {
    videoDistribution = info.videoDistribution;
  } else if (info && typeof info.videoDistribution === 'string') {
    videoDistribution = info.videoDistribution.split(',').map(function (s) {
      return s.trim();
    }).filter(Boolean);
  }
  var normalizedVideoDistribution = videoDistribution.map(normalizeVideoDistributionOptionValue).map(function (value) {
    return value === '__none__' ? '' : normalizeAutoGearTriggerValue(value);
  }).filter(Boolean);
  var videoDistributionSet = new Set(normalizedVideoDistribution);
  var rawCameraSelection = info && typeof info.cameraSelection === 'string' ? info.cameraSelection.trim() : '';
  var normalizedCameraSelection = normalizeAutoGearTriggerValue(rawCameraSelection);
  var cameraWeightDataset = devices && devices.cameras ? devices.cameras : null;
  var normalizedCameraWeights = function () {
    if (!cameraWeightDataset) return null;
    var lookup = {};
    Object.keys(cameraWeightDataset).forEach(function (name) {
      var entry = cameraWeightDataset[name];
      if (!entry || !Number.isFinite(entry.weight_g)) return;
      var normalizedName = normalizeAutoGearTriggerValue(name);
      if (normalizedName && !Object.prototype.hasOwnProperty.call(lookup, normalizedName)) {
        lookup[normalizedName] = Number(entry.weight_g);
      }
    });
    return lookup;
  }();
  var selectedCameraWeight = function () {
    if (!cameraWeightDataset) return null;
    var direct = rawCameraSelection && Object.prototype.hasOwnProperty.call(cameraWeightDataset, rawCameraSelection) ? cameraWeightDataset[rawCameraSelection] : null;
    if (direct && Number.isFinite(direct.weight_g)) {
      return Number(direct.weight_g);
    }
    if (!normalizedCameraSelection || !normalizedCameraWeights) return null;
    if (Object.prototype.hasOwnProperty.call(normalizedCameraWeights, normalizedCameraSelection)) {
      return normalizedCameraWeights[normalizedCameraSelection];
    }
    return null;
  }();
  var rawMonitorSelection = info && typeof info.monitorSelection === 'string' ? info.monitorSelection.trim() : '';
  var normalizedMonitorSelection = normalizeAutoGearTriggerValue(rawMonitorSelection);
  var ownGearIdSet = function () {
    if (typeof getAutoGearOwnGearItems !== 'function') return new Set();
    try {
      var items = getAutoGearOwnGearItems();
      return new Set((Array.isArray(items) ? items : []).map(function (item) {
        return item && typeof item.id === 'string' ? item.id.trim() : '';
      }).filter(Boolean));
    } catch (error) {
      void error;
      return new Set();
    }
  }();
  var rawWirelessSelection = info && typeof info.wirelessSelection === 'string' ? info.wirelessSelection.trim() : '';
  var normalizedWirelessSelection = normalizeAutoGearTriggerValue(rawWirelessSelection);
  var rawTripodHeadBrand = info && typeof info.tripodHeadBrand === 'string' ? info.tripodHeadBrand.trim() : '';
  var normalizedTripodHeadBrand = normalizeAutoGearTriggerValue(rawTripodHeadBrand);
  var rawTripodBowl = info && typeof info.tripodBowl === 'string' ? info.tripodBowl.trim() : '';
  var normalizedTripodBowl = normalizeAutoGearTriggerValue(rawTripodBowl);
  var tripodTypeValues = Array.isArray(info === null || info === void 0 ? void 0 : info.tripodTypes) ? info.tripodTypes : typeof (info === null || info === void 0 ? void 0 : info.tripodTypes) === 'string' ? info.tripodTypes.split(',').map(function (s) {
    return s.trim();
  }).filter(Boolean) : [];
  var normalizedTripodTypesSet = new Set(tripodTypeValues.map(function (value) {
    return normalizeAutoGearTriggerValue(value);
  }).filter(Boolean));
  var rawTripodSpreader = info && typeof info.tripodSpreader === 'string' ? info.tripodSpreader.trim() : '';
  var normalizedTripodSpreader = normalizeAutoGearTriggerValue(rawTripodSpreader);
  var crewRoleSet = new Set(Array.isArray(info === null || info === void 0 ? void 0 : info.people) ? info.people.map(function (entry) {
    return entry && typeof entry.role === 'string' ? entry.role.trim() : '';
  }).filter(Boolean).map(function (value) {
    return normalizeAutoGearTriggerValue(value);
  }).filter(Boolean) : []);
  var rawMotorSelections = [];
  if (info) {
    if (Array.isArray(info.motorSelections)) {
      rawMotorSelections.push.apply(rawMotorSelections, _toConsumableArray(info.motorSelections));
    }
    if (Array.isArray(info.motors)) {
      rawMotorSelections.push.apply(rawMotorSelections, _toConsumableArray(info.motors));
    }
  }
  var normalizedMotorSet = new Set(rawMotorSelections.filter(function (value) {
    return typeof value === 'string';
  }).map(function (value) {
    return normalizeAutoGearTriggerValue(value);
  }).filter(Boolean));
  var rawControllerSelections = [];
  if (info) {
    if (Array.isArray(info.controllerSelections)) {
      rawControllerSelections.push.apply(rawControllerSelections, _toConsumableArray(info.controllerSelections));
    }
    if (Array.isArray(info.controllers)) {
      rawControllerSelections.push.apply(rawControllerSelections, _toConsumableArray(info.controllers));
    }
  }
  var normalizedControllerSet = new Set(rawControllerSelections.filter(function (value) {
    return typeof value === 'string';
  }).map(function (value) {
    return normalizeAutoGearTriggerValue(value);
  }).filter(Boolean));
  var parseShootingPeriodDays = function parseShootingPeriodDays(entry) {
    if (typeof entry !== 'string') return 0;
    var trimmed = entry.trim();
    if (!trimmed) return 0;
    var parts = trimmed.split(' to ');
    var start = parts[0] ? parts[0].trim() : '';
    var end = parts[1] ? parts[1].trim() : '';
    if (!start && end) start = end;
    if (!end && start) end = start;
    if (!start) return 0;
    var toTimestamp = function toTimestamp(value) {
      if (!value) return NaN;
      return Date.parse("".concat(value, "T00:00:00Z"));
    };
    var startTime = toTimestamp(start);
    var endTime = toTimestamp(end);
    if (!Number.isFinite(startTime)) return 0;
    if (!Number.isFinite(endTime)) endTime = startTime;
    if (endTime < startTime) return 1;
    var diff = Math.floor((endTime - startTime) / (24 * 60 * 60 * 1000));
    return diff + 1;
  };
  var shootingDayEntries = function () {
    if (!info) return [];
    if (Array.isArray(info.shootingDays)) return info.shootingDays;
    if (typeof info.shootingDays === 'string') {
      return info.shootingDays.split('\n').map(function (value) {
        return value.trim();
      }).filter(Boolean);
    }
    return [];
  }();
  var totalShootingDays = shootingDayEntries.reduce(function (total, entry) {
    return total + parseShootingPeriodDays(entry);
  }, 0);
  var rawDistanceSelection = info && typeof info.distanceSelection === 'string' ? info.distanceSelection.trim() : '';
  var normalizedDistanceSelection = normalizeAutoGearTriggerValue(rawDistanceSelection);
  if (!scenarios.length) {
    var hasRuleWithoutScenario = autoGearRules.some(function (rule) {
      var scenarioList = Array.isArray(rule.scenarios) ? rule.scenarios.filter(Boolean) : [];
      return scenarioList.length === 0;
    });
    if (!hasRuleWithoutScenario) return tableHtml;
  }
  var touchesMatteboxCategory = function touchesMatteboxCategory(rule) {
    if (!rule || _typeof(rule) !== 'object') return false;
    var lists = [];
    if (Array.isArray(rule.add)) lists.push(rule.add);
    if (Array.isArray(rule.remove)) lists.push(rule.remove);
    return lists.some(function (entries) {
      return entries.some(function (entry) {
        if (!entry || _typeof(entry) !== 'object') return false;
        var category = typeof entry.category === 'string' ? entry.category.trim().toLowerCase() : '';
        return category === 'matte box + filter';
      });
    });
  };
  var triggeredEntries = [];
  autoGearRules.forEach(function (rule) {
    if (!rule) return;
    var multiplier = 1;
    if (rule.always) {
      multiplier = 1;
    } else {
      var scenarioOutcome = computeAutoGearScenarioOutcome(rule, normalizedScenarioSet);
      if (!scenarioOutcome.active) return;
      multiplier = scenarioOutcome.multiplier || 1;
    }
    var matteboxList = Array.isArray(rule.mattebox) ? rule.mattebox.filter(Boolean) : [];
    if (matteboxList.length) {
      var normalizedTargets = matteboxList.map(normalizeAutoGearTriggerValue).filter(Boolean);
      if (!normalizedTargets.length) return false;
      if (!normalizedMattebox) return false;
      if (!normalizedTargets.includes(normalizedMattebox)) return false;
    }
    var cameraList = Array.isArray(rule.camera) ? rule.camera.filter(Boolean) : [];
    var cameraWeightCondition = normalizeAutoGearCameraWeightCondition(rule.cameraWeight);
    if (cameraList.length) {
      var _normalizedTargets = cameraList.map(normalizeAutoGearTriggerValue).filter(Boolean);
      if (!_normalizedTargets.length) return false;
      if (!normalizedCameraSelection) return false;
      if (!_normalizedTargets.includes(normalizedCameraSelection)) return false;
    }
    var ownGearConditionList = Array.isArray(rule.ownGear) ? rule.ownGear.filter(Boolean) : [];
    if (ownGearConditionList.length) {
      var _normalizedTargets2 = ownGearConditionList.map(function (value) {
        return typeof value === 'string' ? value.trim() : '';
      }).filter(Boolean);
      if (!_normalizedTargets2.length) return false;
      var logic = normalizeAutoGearConditionLogic(rule.ownGearLogic);
      if (logic === 'none') {
        if (_normalizedTargets2.some(function (target) {
          return ownGearIdSet.has(target);
        })) return false;
      } else if (logic === 'any' || logic === 'or') {
        if (!_normalizedTargets2.some(function (target) {
          return ownGearIdSet.has(target);
        })) return false;
      } else {
        if (!_normalizedTargets2.every(function (target) {
          return ownGearIdSet.has(target);
        })) return false;
      }
    }
    if (cameraWeightCondition) {
      if (!Number.isFinite(selectedCameraWeight)) return false;
      if (!evaluateAutoGearCameraWeightCondition(cameraWeightCondition, selectedCameraWeight)) {
        return false;
      }
    }
    var monitorList = Array.isArray(rule.monitor) ? rule.monitor.filter(Boolean) : [];
    if (monitorList.length) {
      var _normalizedTargets3 = monitorList.map(normalizeAutoGearTriggerValue).filter(Boolean);
      if (!_normalizedTargets3.length) return false;
      if (!normalizedMonitorSelection) return false;
      if (!_normalizedTargets3.includes(normalizedMonitorSelection)) return false;
    }
    var tripodHeadList = Array.isArray(rule.tripodHeadBrand) ? rule.tripodHeadBrand.filter(Boolean) : [];
    if (tripodHeadList.length) {
      var _normalizedTargets4 = tripodHeadList.map(normalizeAutoGearTriggerValue).filter(Boolean);
      if (!_normalizedTargets4.length) return false;
      if (!normalizedTripodHeadBrand) return false;
      if (!_normalizedTargets4.includes(normalizedTripodHeadBrand)) return false;
    }
    var tripodBowlList = Array.isArray(rule.tripodBowl) ? rule.tripodBowl.filter(Boolean) : [];
    if (tripodBowlList.length) {
      var _normalizedTargets5 = tripodBowlList.map(normalizeAutoGearTriggerValue).filter(Boolean);
      if (!_normalizedTargets5.length) return false;
      if (!normalizedTripodBowl) return false;
      if (!_normalizedTargets5.includes(normalizedTripodBowl)) return false;
    }
    var tripodTypesList = Array.isArray(rule.tripodTypes) ? rule.tripodTypes.filter(Boolean) : [];
    if (tripodTypesList.length) {
      var _normalizedTargets6 = tripodTypesList.map(normalizeAutoGearTriggerValue).filter(Boolean);
      if (!_normalizedTargets6.length) return false;
      if (!_normalizedTargets6.every(function (target) {
        return normalizedTripodTypesSet.has(target);
      })) return false;
    }
    var tripodSpreaderList = Array.isArray(rule.tripodSpreader) ? rule.tripodSpreader.filter(Boolean) : [];
    if (tripodSpreaderList.length) {
      var _normalizedTargets7 = tripodSpreaderList.map(normalizeAutoGearTriggerValue).filter(Boolean);
      if (!_normalizedTargets7.length) return false;
      if (!normalizedTripodSpreader) return false;
      if (!_normalizedTargets7.includes(normalizedTripodSpreader)) return false;
    }
    var crewPresentList = Array.isArray(rule.crewPresent) ? rule.crewPresent.filter(Boolean) : [];
    if (crewPresentList.length) {
      var _normalizedTargets8 = crewPresentList.map(normalizeAutoGearTriggerValue).filter(Boolean);
      if (!_normalizedTargets8.length) return false;
      if (!_normalizedTargets8.every(function (target) {
        return crewRoleSet.has(target);
      })) return false;
    }
    var crewAbsentList = Array.isArray(rule.crewAbsent) ? rule.crewAbsent.filter(Boolean) : [];
    if (crewAbsentList.length) {
      var _normalizedTargets9 = crewAbsentList.map(normalizeAutoGearTriggerValue).filter(Boolean);
      if (!_normalizedTargets9.length) return false;
      if (_normalizedTargets9.some(function (target) {
        return crewRoleSet.has(target);
      })) return false;
    }
    var wirelessList = Array.isArray(rule.wireless) ? rule.wireless.filter(Boolean) : [];
    if (wirelessList.length) {
      var _normalizedTargets0 = wirelessList.map(normalizeAutoGearTriggerValue).filter(Boolean);
      if (!_normalizedTargets0.length) return false;
      if (!normalizedWirelessSelection) return false;
      if (!_normalizedTargets0.includes(normalizedWirelessSelection)) return false;
    }
    var motorsList = Array.isArray(rule.motors) ? rule.motors.filter(Boolean) : [];
    if (motorsList.length) {
      var _normalizedTargets1 = motorsList.map(normalizeAutoGearTriggerValue).filter(Boolean);
      if (!_normalizedTargets1.length) return false;
      var requiresAnyMotor = _normalizedTargets1.includes(AUTO_GEAR_ANY_MOTOR_TOKEN_FALLBACK);
      var specificTargets = _normalizedTargets1.filter(function (target) {
        return target !== AUTO_GEAR_ANY_MOTOR_TOKEN_FALLBACK;
      });
      if (requiresAnyMotor && normalizedMotorSet.size === 0) return false;
      if (specificTargets.length && !specificTargets.every(function (target) {
        return normalizedMotorSet.has(target);
      })) return false;
    }
    var controllersList = Array.isArray(rule.controllers) ? rule.controllers.filter(Boolean) : [];
    if (controllersList.length) {
      var _normalizedTargets10 = controllersList.map(normalizeAutoGearTriggerValue).filter(Boolean);
      if (!_normalizedTargets10.length) return false;
      if (!_normalizedTargets10.every(function (target) {
        return normalizedControllerSet.has(target);
      })) return false;
    }
    var distanceList = Array.isArray(rule.distance) ? rule.distance.filter(Boolean) : [];
    if (distanceList.length) {
      var _normalizedTargets11 = distanceList.map(normalizeAutoGearTriggerValue).filter(Boolean);
      if (!_normalizedTargets11.length) return false;
      if (!normalizedDistanceSelection) return false;
      if (!_normalizedTargets11.includes(normalizedDistanceSelection)) return false;
    }
    var shootingCondition = normalizeAutoGearShootingDaysCondition(rule.shootingDays);
    if (shootingCondition && Number.isFinite(shootingCondition.value) && shootingCondition.value > 0) {
      if (shootingCondition.mode === 'minimum') {
        if (totalShootingDays < shootingCondition.value) return false;
      } else if (shootingCondition.mode === 'maximum') {
        if (totalShootingDays > shootingCondition.value) return false;
      } else if (shootingCondition.mode === 'every') {
        var interval = shootingCondition.value;
        var occurrences = interval > 0 ? Math.floor(totalShootingDays / interval) : 0;
        if (occurrences < 1) return false;
        multiplier *= occurrences;
      }
    }
    var cameraHandleList = Array.isArray(rule.cameraHandle) ? rule.cameraHandle.filter(Boolean) : [];
    if (cameraHandleList.length) {
      var _normalizedTargets12 = cameraHandleList.map(normalizeAutoGearTriggerValue).filter(Boolean);
      if (!_normalizedTargets12.length) return false;
      if (!_normalizedTargets12.every(function (target) {
        return cameraHandleSet.has(target);
      })) return false;
    }
    var viewfinderList = Array.isArray(rule.viewfinderExtension) ? rule.viewfinderExtension.filter(Boolean) : [];
    if (viewfinderList.length) {
      var _normalizedTargets13 = viewfinderList.map(function (value) {
        return normalizeAutoGearTriggerValue(value);
      }).filter(Boolean);
      if (!_normalizedTargets13.length) return false;
      if (!normalizedViewfinderExtension) return false;
      if (!_normalizedTargets13.includes(normalizedViewfinderExtension)) return false;
    }
    var deliveryList = Array.isArray(rule.deliveryResolution) ? rule.deliveryResolution.filter(Boolean) : [];
    if (deliveryList.length) {
      var _normalizedTargets14 = deliveryList.map(normalizeAutoGearTriggerValue).filter(Boolean);
      if (!_normalizedTargets14.length) return false;
      if (!normalizedDeliveryResolution) return false;
      if (!_normalizedTargets14.includes(normalizedDeliveryResolution)) return false;
    }
    var videoDistList = Array.isArray(rule.videoDistribution) ? rule.videoDistribution.filter(Boolean) : [];
    if (videoDistList.length) {
      var _normalizedTargets15 = videoDistList.map(function (value) {
        return normalizeVideoDistributionOptionValue(value);
      }).map(function (value) {
        return value === '__none__' ? '' : normalizeAutoGearTriggerValue(value);
      }).filter(Boolean);
      if (!_normalizedTargets15.length) return false;
      if (!_normalizedTargets15.every(function (target) {
        return videoDistributionSet.has(target);
      })) return false;
    }
    triggeredEntries.push({
      rule: rule,
      multiplier: multiplier
    });
  });
  if (!triggeredEntries.length) return tableHtml;
  if (normalizedMattebox) {
    var filtered = triggeredEntries.filter(function (_ref18) {
      var rule = _ref18.rule;
      if (!touchesMatteboxCategory(rule)) return true;
      var matteboxList = Array.isArray(rule.mattebox) ? rule.mattebox.filter(Boolean) : [];
      if (!matteboxList.length) return true;
      var normalizedTargets = matteboxList.map(normalizeAutoGearTriggerValue).filter(Boolean);
      if (!normalizedTargets.length) return false;
      return normalizedTargets.includes(normalizedMattebox);
    });
    if (!filtered.length) return tableHtml;
    triggeredEntries.length = 0;
    filtered.forEach(function (entry) {
      return triggeredEntries.push(entry);
    });
  }
  var container = document.createElement('div');
  container.innerHTML = tableHtml;
  var table = container.querySelector('.gear-table');
  if (!table) return tableHtml;
  var monitorRiggingTriggered = false;
  triggeredEntries.forEach(function (_ref19) {
    var rule = _ref19.rule,
      multiplier = _ref19.multiplier;
    var effectiveMultiplier = Math.max(1, Math.round(Number.isFinite(multiplier) ? multiplier : 1));
    rule.remove.forEach(function (item) {
      var remaining = normalizeAutoGearQuantity(item.quantity) * effectiveMultiplier;
      if (remaining <= 0) return;
      var primaryCell = findAutoGearCategoryCell(table, item.category);
      if (primaryCell) {
        remaining = removeAutoGearItem(primaryCell, item, remaining);
      }
      if (remaining > 0) {
        var gearCells = Array.from(table.querySelectorAll('tbody.category-group tr:not(.category-row) td'));
        for (var _i11 = 0, _gearCells = gearCells; _i11 < _gearCells.length; _i11++) {
          var cell = _gearCells[_i11];
          if (cell === primaryCell) continue;
          remaining = removeAutoGearItem(cell, item, remaining);
          if (remaining <= 0) break;
        }
      }
    });
    var baseAdditions = Array.isArray(rule.add) ? rule.add.slice() : [];
    var additions = baseAdditions;
    if (shouldAugmentClampOnRule(rule)) {
      var clampBackings = buildClampOnBackingAdditionsFromInfo(info);
      if (clampBackings.length) {
        additions = mergeAutoGearAdditions(baseAdditions, clampBackings);
      }
    }
    additions.forEach(function (item) {
      var quantity = normalizeAutoGearQuantity(item.quantity) * effectiveMultiplier;
      var scaledItem = quantity === normalizeAutoGearQuantity(item.quantity) ? item : _objectSpread(_objectSpread({}, item), {}, {
        quantity: quantity
      });
      var cell = ensureAutoGearCategory(table, item.category);
      if (cell) addAutoGearItem(cell, scaledItem, rule);
      if (!monitorRiggingTriggered && isOnboardMonitorRiggingItemEntry(item)) {
        monitorRiggingTriggered = true;
      }
    });
  });
  if (monitorRiggingTriggered) {
    ensureOnboardMonitorRiggingAutoGearHighlight(table);
  }
  return container.innerHTML;
}
function formatPhoneHref(phone) {
  if (typeof phone !== 'string') return '';
  var trimmed = phone.trim();
  if (!trimmed) return '';
  var sanitized = trimmed.replace(/[^0-9+*#;,]/g, '');
  return sanitized ? sanitized : '';
}
function formatEmailHref(email) {
  if (typeof email !== 'string') return '';
  var trimmed = email.trim();
  if (!trimmed || !trimmed.includes('@')) return '';
  var normalized = trimmed.replace(/\s+/g, '');
  if (!normalized || !normalized.includes('@')) return '';
  var encoded = encodeURIComponent(normalized);
  return encoded ? encoded.replace(/%40/g, '@') : '';
}
function formatRequirementValue(rawValue) {
  if (rawValue && _typeof(rawValue) === 'object') {
    if (typeof rawValue.__html === 'string' && rawValue.__html) {
      return rawValue.__html;
    }
    if (Array.isArray(rawValue) && rawValue.length) {
      var html = rawValue.map(function (item) {
        return typeof item === 'string' ? escapeHtml(item) : escapeHtml(String(item || ''));
      }).join('<br>');
      if (html) return html;
    }
    if (typeof rawValue.text === 'string' && rawValue.text) {
      return escapeHtml(rawValue.text).replace(/\n/g, '<br>');
    }
  }
  var value = typeof rawValue === 'string' ? rawValue : rawValue == null ? '' : String(rawValue);
  return escapeHtml(value).replace(/\n/g, '<br>');
}
function resolveGearListCustomText(key, fallback, replacements) {
  var _texts3, _texts4;
  var langEntry = (_texts3 = texts) === null || _texts3 === void 0 || (_texts3 = _texts3[currentLang]) === null || _texts3 === void 0 ? void 0 : _texts3[key];
  var enEntry = (_texts4 = texts) === null || _texts4 === void 0 || (_texts4 = _texts4.en) === null || _texts4 === void 0 ? void 0 : _texts4[key];
  var template = typeof langEntry === 'string' && langEntry.trim() ? langEntry : typeof enEntry === 'string' && enEntry.trim() ? enEntry : fallback;
  if (!replacements || _typeof(replacements) !== 'object') {
    return template;
  }
  return Object.keys(replacements).reduce(function (acc, token) {
    var value = replacements[token];
    var replacement = typeof value === 'string' ? value : String(value !== null && value !== void 0 ? value : '');
    return acc.replace(new RegExp("\\{".concat(token, "\\}"), 'g'), replacement);
  }, template);
}
function getGearListRentalToggleTexts() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var excludeLabel = resolveGearListCustomText('gearListExcludeRentalToggle', 'Exclude for rental house');
  var includeLabel = resolveGearListCustomText('gearListIncludeRentalToggle', 'Include for rental house');
  var fallbackNote = resolveGearListCustomText('gearListRentalNote', 'Rental house handles this item');
  var noteLabel = resolveRentalProviderNoteLabel({
    fallback: fallbackNote,
    rentalHouse: options && options.rentalHouse ? options.rentalHouse : undefined,
    input: options && options.input ? options.input : undefined
  });
  return {
    excludeLabel: excludeLabel,
    includeLabel: includeLabel,
    noteLabel: noteLabel
  };
}
function buildRentalToggleMarkup(dataName, labels) {
  var texts = labels || getGearListRentalToggleTexts();
  var offLabel = typeof texts.excludeLabel === 'string' && texts.excludeLabel.trim() ? texts.excludeLabel : 'Exclude for rental house';
  var onLabel = typeof texts.includeLabel === 'string' && texts.includeLabel.trim() ? texts.includeLabel : 'Include for rental house';
  var safeOff = escapeHtml(offLabel);
  var safeOn = escapeHtml(onLabel);
  var safeDataName = escapeHtml(dataName || '');
  return "<button type=\"button\" class=\"gear-rental-toggle\" data-gear-rental-toggle=\"".concat(safeDataName, "\" data-label-off=\"").concat(safeOff, "\" data-label-on=\"").concat(safeOn, "\" aria-pressed=\"false\">").concat(safeOff, "</button>");
}
function setRentalExclusionState(element, excluded) {
  var _element$classList3, _element$getAttribute, _element$querySelecto;
  if (!element || _typeof(element) !== 'object') {
    return false;
  }
  var shouldExclude = Boolean(excluded);
  var wasExcluded = ((_element$classList3 = element.classList) === null || _element$classList3 === void 0 ? void 0 : _element$classList3.contains('gear-item-rental-excluded')) || ((_element$getAttribute = element.getAttribute) === null || _element$getAttribute === void 0 ? void 0 : _element$getAttribute.call(element, 'data-rental-excluded')) === 'true';
  var toggle = (_element$querySelecto = element.querySelector) === null || _element$querySelecto === void 0 ? void 0 : _element$querySelecto.call(element, '.gear-rental-toggle');
  if (shouldExclude) {
    var _element$classList4, _element$setAttribute;
    (_element$classList4 = element.classList) === null || _element$classList4 === void 0 || _element$classList4.add('gear-item-rental-excluded');
    (_element$setAttribute = element.setAttribute) === null || _element$setAttribute === void 0 || _element$setAttribute.call(element, 'data-rental-excluded', 'true');
  } else {
    var _element$classList5, _element$removeAttrib;
    (_element$classList5 = element.classList) === null || _element$classList5 === void 0 || _element$classList5.remove('gear-item-rental-excluded');
    (_element$removeAttrib = element.removeAttribute) === null || _element$removeAttrib === void 0 || _element$removeAttrib.call(element, 'data-rental-excluded');
  }
  if (toggle) {
    var offLabel = toggle.getAttribute('data-label-off') || '';
    var onLabel = toggle.getAttribute('data-label-on') || offLabel;
    toggle.setAttribute('aria-pressed', shouldExclude ? 'true' : 'false');
    toggle.textContent = shouldExclude ? onLabel || offLabel : offLabel;
  }
  var _getGearListRentalTog = getGearListRentalToggleTexts(),
    noteLabel = _getGearListRentalTog.noteLabel;
  if (noteLabel && element.getAttribute) {
    if (element.getAttribute('data-rental-note') !== noteLabel) {
      element.setAttribute('data-rental-note', noteLabel);
    }
  } else if (element.removeAttribute) {
    element.removeAttribute('data-rental-note');
  }
  return wasExcluded !== shouldExclude;
}
function applyRentalExclusionsState(state) {
  if (!gearListOutput) return;
  var normalizedState = state && _typeof(state) === 'object' ? state : {};
  var exclusions = new Set();
  Object.entries(normalizedState).forEach(function (_ref20) {
    var _ref21 = _slicedToArray(_ref20, 2),
      name = _ref21[0],
      value = _ref21[1];
    if (value) {
      exclusions.add(name);
    }
  });
  var spans = gearListOutput.querySelectorAll('.gear-item[data-gear-name]');
  spans.forEach(function (span) {
    var name = span.getAttribute('data-gear-name');
    setRentalExclusionState(span, exclusions.has(name));
  });
}
function createCustomCategoryKey(label) {
  if (typeof label !== 'string' || !label.trim()) {
    return 'category';
  }
  var normalized = label.trim().toLowerCase();
  var slug = normalized.replace(/[^a-z0-9]+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
  return slug || 'category';
}
function getCustomItemsContainer(key) {
  if (!gearListOutput || typeof key !== 'string') return null;
  return gearListOutput.querySelector(".gear-custom-items[data-gear-custom-list=\"".concat(key, "\"]"));
}
var CUSTOM_CATEGORY_SUGGESTION_SOURCES = {
  camera: ['cameras'],
  'camera-support': ['accessories.cameraSupport'],
  media: ['media', 'accessories.media', 'accessories.cardReaders'],
  lens: ['lenses'],
  'lens-support': ['accessories.cameraSupport', 'accessories.rigging'],
  'matte-box-filter': ['accessories.matteboxes', 'accessories.filters'],
  'lds-fiz': ['fiz', 'accessories.cables.fiz'],
  'camera-batteries': ['batteries', 'accessories.batteries'],
  'monitoring-batteries': ['batteries', 'accessories.batteries'],
  chargers: ['accessories.chargers'],
  monitoring: ['monitors', 'directorMonitors', 'video', 'videoAssist', 'iosVideo'],
  'monitoring-support': ['accessories.rigging', 'accessories.grip', 'accessories.carts'],
  rigging: ['accessories.rigging', 'accessories.grip'],
  power: ['accessories.power', 'accessories.powerPlates'],
  grip: ['accessories.grip'],
  'carts-and-transportation': ['accessories.carts'],
  miscellaneous: ['accessories.matteboxes', 'accessories.filters', 'accessories.cables'],
  consumables: []
};
function isSuggestionDeviceEntry(entry) {
  if (!entry || _typeof(entry) !== 'object' || Array.isArray(entry)) return false;
  return Object.values(entry).some(function (val) {
    if (val === null) return true;
    var valueType = _typeof(val);
    if (valueType === 'string' || valueType === 'number' || valueType === 'boolean') {
      return true;
    }
    if (Array.isArray(val)) {
      return true;
    }
    return false;
  });
}
function collectDeviceSuggestionNames(source) {
  if (!source || _typeof(source) !== 'object') return [];
  var names = [];
  Object.entries(source).forEach(function (_ref22) {
    var _ref23 = _slicedToArray(_ref22, 2),
      name = _ref23[0],
      value = _ref23[1];
    if (!value || _typeof(value) !== 'object') {
      return;
    }
    if (isSuggestionDeviceEntry(value)) {
      names.push(name);
      return;
    }
    names.push.apply(names, _toConsumableArray(collectDeviceSuggestionNames(value)));
  });
  return names;
}
function getDeviceSuggestionNamesForPath(path) {
  if (!path || typeof path !== 'string') return [];
  var parts = path.split('.');
  var scope = devices;
  for (var i = 0; i < parts.length; i += 1) {
    var part = parts[i];
    if (!scope || _typeof(scope) !== 'object') {
      return [];
    }
    scope = scope[part];
  }
  if (!scope || _typeof(scope) !== 'object') {
    return [];
  }
  return collectDeviceSuggestionNames(scope);
}
function collectStandardItemSuggestions(categoryKey) {
  if (!gearListOutput || typeof categoryKey !== 'string') return [];
  var group = gearListOutput.querySelector(".category-group[data-gear-custom-key=\"".concat(categoryKey, "\"]"));
  if (!group) return [];
  var names = new Set();
  var addName = function addName(raw) {
    if (typeof raw !== 'string') return;
    var trimmed = raw.trim();
    if (!trimmed) return;
    var match = trimmed.match(/^(?:\d+\s*x\s+)?(.+)$/i);
    var normalized = match ? match[1].trim() : trimmed;
    if (!normalized || /^none$/i.test(normalized)) return;
    names.add(normalized);
  };
  group.querySelectorAll('.gear-standard-items .gear-item').forEach(function (item) {
    var dataName = item.getAttribute('data-gear-name');
    if (dataName) {
      addName(dataName);
    } else {
      addName(item.textContent || '');
    }
  });
  group.querySelectorAll('select option').forEach(function (option) {
    if (!option || typeof option.value !== 'string') return;
    var value = option.value.trim();
    if (!value) return;
    addName(value);
  });
  return Array.from(names);
}
function getCustomCategorySuggestions(categoryKey, categoryLabel) {
  var key = categoryKey || createCustomCategoryKey(categoryLabel || '');
  var seen = new Set();
  var results = [];
  var paths = CUSTOM_CATEGORY_SUGGESTION_SOURCES[key] || [];
  paths.forEach(function (path) {
    getDeviceSuggestionNamesForPath(path).forEach(function (name) {
      if (typeof name !== 'string') return;
      var trimmed = name.trim();
      if (!trimmed || /^none$/i.test(trimmed)) return;
      var normalized = trimmed.toLowerCase();
      if (seen.has(normalized)) return;
      seen.add(normalized);
      results.push(trimmed);
    });
  });
  collectStandardItemSuggestions(key).forEach(function (name) {
    var trimmed = name.trim();
    if (!trimmed || /^none$/i.test(trimmed)) return;
    var normalized = trimmed.toLowerCase();
    if (seen.has(normalized)) return;
    seen.add(normalized);
    results.push(trimmed);
  });
  var sorter = typeof localeSort === 'function' ? localeSort : function (a, b) {
    return a.localeCompare(b, undefined, {
      sensitivity: 'base'
    });
  };
  return results.sort(sorter);
}
function ensureCustomCategorySuggestionList(categoryKey, categoryLabel) {
  var container = getCustomItemsContainer(categoryKey);
  if (!container) return null;
  var doc = container.ownerDocument || (typeof document !== 'undefined' ? document : null);
  if (!doc) return null;
  var suggestions = getCustomCategorySuggestions(categoryKey, categoryLabel);
  var existing = container.querySelector("datalist[data-gear-custom-suggestions=\"".concat(categoryKey, "\"]"));
  if (!suggestions.length) {
    if (existing) {
      existing.remove();
    }
    return null;
  }
  var datalistId = "gear-custom-suggestions-".concat(categoryKey);
  var optionsHtml = suggestions.map(function (value) {
    return "<option value=\"".concat(escapeHtml(value), "\"></option>");
  }).join('');
  var datalist = existing;
  if (!datalist) {
    datalist = doc.createElement('datalist');
    datalist.id = datalistId;
    datalist.setAttribute('data-gear-custom-suggestions', categoryKey);
    container.appendChild(datalist);
  } else if (datalist.id !== datalistId) {
    datalist.id = datalistId;
  }
  if (datalist._lastRenderedOptions !== optionsHtml) {
    datalist.innerHTML = optionsHtml;
    datalist._lastRenderedOptions = optionsHtml;
  }
  return datalistId;
}
function attachCustomItemSuggestions(entry, categoryKey, categoryLabel) {
  if (!entry) return;
  var datalistId = ensureCustomCategorySuggestionList(categoryKey, categoryLabel);
  if (datalistId) {
    entry.setAttribute('data-gear-suggestions', datalistId);
  } else {
    entry.removeAttribute('data-gear-suggestions');
  }
}
function updateCustomItemPreview(entry) {
  if (!entry) return;
  var preview = entry.querySelector('.gear-custom-item-preview');
  if (!preview) return;
  var quantity = (entry.getAttribute('data-gear-quantity') || '').trim();
  var nameAttr = entry.getAttribute('data-gear-label') || entry.getAttribute('data-gear-name') || '';
  var name = String(nameAttr || '').trim();
  var attributes = (entry.getAttribute('data-gear-attributes') || '').trim();
  var fallback = resolveGearListCustomText('gearListCustomItemPreviewFallback', 'Custom item');
  var display = '';
  if (quantity && name) {
    display = "".concat(quantity, "x ").concat(name);
  } else if (name) {
    display = name;
  } else if (quantity) {
    display = "".concat(quantity, "x ").concat(fallback);
  } else {
    display = fallback;
  }
  if (attributes) {
    display += " (".concat(attributes, ")");
  }
  preview.textContent = display;
}
function updateGearItemNoteElement(entry, value) {
  if (!entry) return;
  var noteEl = entry.querySelector('.gear-item-note');
  if (!noteEl) return;
  var doc = noteEl.ownerDocument || (typeof document !== 'undefined' ? document : null);
  var localizedLabel = typeof localGetLocalizedText === 'function' ? localGetLocalizedText('gearListNoteLabel') : '';
  var noteLabel = typeof localizedLabel === 'string' && localizedLabel.trim() ? localizedLabel.trim() : 'Note:';
  var raw = typeof value === 'string' ? value : String(value !== null && value !== void 0 ? value : '');
  var trimmed = raw.trim();
  if (trimmed) {
    var labelSpan = noteEl.querySelector('.gear-item-note__label');
    var valueSpan = noteEl.querySelector('.gear-item-note__text');
    if (!labelSpan && doc) {
      labelSpan = doc.createElement('span');
      labelSpan.className = 'gear-item-note__label';
      if (noteEl.firstChild) {
        noteEl.insertBefore(labelSpan, noteEl.firstChild);
      } else {
        noteEl.appendChild(labelSpan);
      }
    }
    if (!valueSpan && doc) {
      valueSpan = doc.createElement('span');
      valueSpan.className = 'gear-item-note__text';
      noteEl.appendChild(valueSpan);
    }
    if (labelSpan && valueSpan) {
      labelSpan.textContent = noteLabel;
      valueSpan.textContent = trimmed;
    } else {
      noteEl.textContent = "".concat(noteLabel, " ").concat(trimmed);
    }
    noteEl.hidden = false;
    noteEl.removeAttribute('hidden');
    noteEl.setAttribute('aria-label', "".concat(noteLabel, " ").concat(trimmed).trim());
  } else {
    var _labelSpan = noteEl.querySelector('.gear-item-note__label');
    var _valueSpan = noteEl.querySelector('.gear-item-note__text');
    if (_labelSpan) {
      _labelSpan.textContent = '';
    }
    if (_valueSpan) {
      _valueSpan.textContent = '';
    }
    noteEl.textContent = '';
    noteEl.hidden = true;
    noteEl.setAttribute('hidden', '');
    noteEl.removeAttribute('aria-label');
  }
}
function ensureGearItemNoteSpan(element) {
  if (!element) return null;
  var noteSpan = element.querySelector('.gear-item-note');
  if (noteSpan) {
    return noteSpan;
  }
  var doc = element.ownerDocument || (typeof document !== 'undefined' ? document : null);
  if (!doc) {
    return null;
  }
  noteSpan = doc.createElement('span');
  noteSpan.className = 'gear-item-note';
  noteSpan.hidden = true;
  var summary = element.classList && element.classList.contains('gear-custom-item') ? element.querySelector('.gear-custom-item-summary') : null;
  if (summary) {
    summary.appendChild(noteSpan);
  } else {
    var reference = element.querySelector('.gear-custom-item-actions') || element.querySelector('.gear-custom-remove-btn') || element.querySelector('.gear-item-edit-btn');
    if (reference) {
      element.insertBefore(noteSpan, reference);
    } else {
      element.appendChild(noteSpan);
    }
  }
  return noteSpan;
}
function ensureGearItemExtraIndicator(element) {
  if (!element) return null;
  var indicator = element.querySelector('.gear-item-extra-indicator');
  if (indicator) {
    return indicator;
  }
  var doc = element.ownerDocument || (typeof document !== 'undefined' ? document : null);
  if (!doc) {
    return null;
  }
  indicator = doc.createElement('span');
  indicator.className = 'gear-item-extra-indicator';
  indicator.hidden = true;
  var summary = element.classList && element.classList.contains('gear-custom-item') ? element.querySelector('.gear-custom-item-summary') : null;
  if (summary) {
    var summaryNote = summary.querySelector('.gear-item-note');
    if (summaryNote) {
      summary.insertBefore(indicator, summaryNote);
    } else {
      summary.appendChild(indicator);
    }
  } else {
    var reference = element.querySelector('.gear-item-note') || element.querySelector('.gear-custom-item-actions') || element.querySelector('.gear-custom-remove-btn') || element.querySelector('.gear-item-edit-btn');
    if (reference) {
      element.insertBefore(indicator, reference);
    } else {
      element.appendChild(indicator);
    }
  }
  return indicator;
}
var cachedCameraCategoryLabelSet = null;
function getCameraCategoryLabelSet() {
  if (cachedCameraCategoryLabelSet && cachedCameraCategoryLabelSet.size) {
    return cachedCameraCategoryLabelSet;
  }
  var labels = new Set();
  ['camera', 'cameras'].forEach(function (value) {
    return labels.add(value);
  });
  if (typeof localGetLocalizedText === 'function') {
    var localized = localGetLocalizedText('category_cameras');
    if (typeof localized === 'string' && localized.trim()) {
      labels.add(localized.trim().toLowerCase());
      labels.add(createCustomCategoryKey(localized));
    }
  }
  var translations = (typeof texts === "undefined" ? "undefined" : _typeof(texts)) === 'object' && texts ? texts : null;
  if (translations && typeof Object.keys === 'function') {
    Object.keys(translations).forEach(function (lang) {
      var entry = translations[lang];
      if (!entry || _typeof(entry) !== 'object') {
        return;
      }
      var label = entry.category_cameras;
      if (typeof label === 'string' && label.trim()) {
        var trimmed = label.trim().toLowerCase();
        labels.add(trimmed);
        labels.add(createCustomCategoryKey(label));
      }
    });
  }
  cachedCameraCategoryLabelSet = labels;
  return labels;
}
function isPrimaryCameraItem(element) {
  if (!element || typeof element.closest !== 'function') {
    return false;
  }
  var group = element.closest('tbody.category-group');
  if (!group) {
    return false;
  }
  var label = (group.getAttribute('data-gear-category-label') || '').trim().toLowerCase();
  var key = (group.getAttribute('data-gear-custom-key') || '').trim().toLowerCase();
  var tableLabel = (group.getAttribute('data-gear-table-category') || '').trim().toLowerCase();
  var candidates = getCameraCategoryLabelSet();
  return label && candidates.has(label) || key && candidates.has(key) || tableLabel && candidates.has(tableLabel);
}
function getActiveCameraDisplayName() {
  if (typeof cameraSelect === 'undefined' || !cameraSelect) {
    return '';
  }
  var selectedOption = cameraSelect.options && cameraSelect.options[cameraSelect.selectedIndex];
  if (!selectedOption || selectedOption.value && selectedOption.value === 'None') {
    return '';
  }
  var label = typeof selectedOption.text === 'string' ? selectedOption.text : selectedOption.textContent || '';
  return typeof label === 'string' ? label.trim() : '';
}
function normalizeCameraLinkColorValue(value) {
  if (typeof value !== 'string') {
    return '';
  }
  var trimmed = value.trim();
  if (!trimmed) {
    return '';
  }
  if (/^#[0-9a-f]{6}$/i.test(trimmed)) {
    return trimmed.toLowerCase();
  }
  if (/^[0-9a-f]{6}$/i.test(trimmed)) {
    return "#".concat(trimmed.toLowerCase());
  }
  return '';
}
function generateDefaultCameraColor(letter) {
  if (letter !== 'E') {
    return '';
  }
  var generateChannel = function generateChannel() {
    var value = 0;
    if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
      var array = new Uint8Array(1);
      crypto.getRandomValues(array);
      value = array[0] / 255;
    } else {
      value = Math.random();
    }
    var channel = Math.floor(value * 200) + 28;
    return Math.max(24, Math.min(232, channel));
  };
  var components = [generateChannel(), generateChannel(), generateChannel()];
  return "#".concat(components.map(function (component) {
    return component.toString(16).padStart(2, '0');
  }).join(''));
}
var cachedCameraColorDefaults = null;
function getCameraLetterColorDefaults() {
  if (cachedCameraColorDefaults) {
    return cachedCameraColorDefaults;
  }
  var defaults = {
    A: '#d32f2f',
    B: '#1e88e5',
    C: '#fdd835',
    D: '#43a047',
    E: '#7b1fa2'
  };
  var storedPalette = null;
  try {
    if (typeof localStorage !== 'undefined') {
      var raw = localStorage.getItem(CAMERA_COLOR_STORAGE_KEY);
      if (raw) {
        storedPalette = JSON.parse(raw);
      }
    }
  } catch (error) {
    console.warn('Failed to read stored camera colors', error);
    storedPalette = null;
  }
  if (storedPalette && _typeof(storedPalette) === 'object') {
    CAMERA_LINK_LETTERS.forEach(function (letter) {
      var incoming = storedPalette[letter] || storedPalette[letter.toLowerCase()];
      var normalized = normalizeCameraLinkColorValue(incoming);
      if (normalized) {
        defaults[letter] = normalized;
      }
    });
  } else {
    var generated = generateDefaultCameraColor('E');
    if (generated) {
      defaults.E = generated;
    }
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(CAMERA_COLOR_STORAGE_KEY, JSON.stringify(defaults));
      }
    } catch (persistError) {
      console.warn('Unable to persist default camera colors', persistError);
    }
  }
  cachedCameraColorDefaults = defaults;
  return defaults;
}
function normalizeCameraLetter(letter) {
  if (typeof letter !== 'string') {
    return '';
  }
  var trimmed = letter.trim();
  if (!trimmed) {
    return '';
  }
  if (trimmed.toLowerCase() === 'camera') {
    return 'A';
  }
  var upper = trimmed[0].toUpperCase();
  return CAMERA_LINK_LETTERS.includes(upper) ? upper : '';
}
function getCameraLetterColorsSafe() {
  var defaults = getCameraLetterColorDefaults();
  if (typeof getCameraLetterColors === 'function') {
    try {
      var provided = getCameraLetterColors();
      if (provided && _typeof(provided) === 'object') {
        var normalized = _objectSpread({}, defaults);
        CAMERA_LINK_LETTERS.forEach(function (letter) {
          var value = provided[letter] || provided[letter.toLowerCase()];
          var normalizedValue = normalizeCameraLinkColorValue(value);
          if (normalizedValue) {
            normalized[letter] = normalizedValue;
          }
        });
        return normalized;
      }
    } catch (error) {
      console.warn('Failed to load camera letter colors', error);
    }
  }
  return defaults;
}
function getCameraLetterColor(letter) {
  var colors = getCameraLetterColorsSafe();
  var key = normalizeCameraLetter(letter);
  if (key && colors[key]) {
    return colors[key];
  }
  return colors.A;
}
function computeCameraLetterTextColor(color) {
  if (typeof color !== 'string' || !color) {
    return '';
  }
  var hexMatch = color.trim().match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!hexMatch) {
    return '';
  }
  var hex = hexMatch[1];
  if (hex.length === 3) {
    hex = hex.split('').map(function (ch) {
      return ch + ch;
    }).join('');
  }
  var r = parseInt(hex.slice(0, 2), 16) / 255;
  var g = parseInt(hex.slice(2, 4), 16) / 255;
  var b = parseInt(hex.slice(4, 6), 16) / 255;
  var luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.55 ? '#111111' : '#ffffff';
}
function collectCameraSourceEntries(root) {
  var scope = root || gearListOutput || (typeof document !== 'undefined' ? document : null);
  if (!scope || typeof scope.querySelectorAll !== 'function') {
    return [];
  }
  var nodes = scope.querySelectorAll('[data-gear-camera-role="source"], [data-gear-camera-letter]');
  var seen = new Map();
  nodes.forEach(function (node) {
    if (!node || typeof node.getAttribute !== 'function') {
      return;
    }
    if (!isPrimaryCameraItem(node)) {
      return;
    }
    var letterAttr = node.getAttribute('data-gear-camera-letter') || node.getAttribute('data-gear-camera-link') || '';
    var letter = normalizeCameraLetter(letterAttr);
    if (!letter || seen.has(letter)) {
      return;
    }
    var label = (node.getAttribute('data-gear-camera-link-label') || node.getAttribute('data-gear-label') || node.textContent || '').trim();
    seen.set(letter, {
      letter: letter,
      label: label
    });
  });
  return Array.from(seen.values());
}
function refreshAllCameraLinkIndicators(scope) {
  var root = scope || gearListOutput || (typeof document !== 'undefined' ? document : null);
  if (!root || typeof root.querySelectorAll !== 'function') {
    return;
  }
  var nodes = root.querySelectorAll('.gear-item, .gear-custom-item');
  var badgeTexts = getGearItemEditTexts();
  var badgeBase = badgeTexts.cameraLinkBadgeLabel || 'Linked to camera';
  nodes.forEach(function (element) {
    if (!element || typeof element.getAttribute !== 'function') {
      return;
    }
    var letterAttr = element.getAttribute('data-gear-camera-link') || element.getAttribute('data-gear-camera-letter') || '';
    var letter = normalizeCameraLetter(letterAttr);
    var cameraItem = isPrimaryCameraItem(element);
    var label = element.getAttribute('data-gear-camera-link-label') || (cameraItem ? getActiveCameraDisplayName() : '') || '';
    var badgeLabel = label ? "".concat(badgeBase, " \u2014 ").concat(label) : badgeBase;
    var color = letter ? getCameraLetterColor(letter) : '';
    updateGearItemCameraLinkIndicator(element, Boolean(letter), {
      isPrimary: cameraItem,
      badgeLabel: badgeLabel,
      letter: letter,
      color: color
    });
  });
}
function ensureGearItemCameraLinkIndicator(element) {
  if (!element) return null;
  var indicator = element.querySelector('.gear-item-camera-link');
  if (indicator) {
    return indicator;
  }
  var doc = element.ownerDocument || (typeof document !== 'undefined' ? document : null);
  if (!doc) {
    return null;
  }
  var textsForDialog = getGearItemEditTexts();
  indicator = doc.createElement('span');
  indicator.className = 'gear-item-camera-link';
  indicator.hidden = true;
  indicator.setAttribute('data-camera-letter', '');
  var icon = doc.createElement('span');
  icon.className = 'gear-item-camera-link__icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = 'A';
  indicator.appendChild(icon);
  var assist = doc.createElement('span');
  assist.className = 'visually-hidden';
  assist.setAttribute('data-camera-link-assist', 'true');
  assist.textContent = textsForDialog.cameraLinkBadgeLabel || 'Linked to camera';
  indicator.appendChild(assist);
  var reference = element.querySelector('.gear-item-note') || element.querySelector('.gear-item-provider') || element.querySelector('.gear-item-extra-indicator') || element.querySelector('.gear-item-edit-btn') || element.querySelector('.gear-custom-item-actions') || element.querySelector('.gear-custom-remove-btn');
  if (reference) {
    element.insertBefore(indicator, reference);
  } else {
    element.appendChild(indicator);
  }
  return indicator;
}
function updateGearItemCameraLinkIndicator(element, active) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var indicator = ensureGearItemCameraLinkIndicator(element);
  if (!indicator) return;
  if (!active) {
    indicator.hidden = true;
    indicator.setAttribute('hidden', '');
    indicator.classList.remove('gear-item-camera-link--primary');
    indicator.removeAttribute('data-camera-letter');
    indicator.style.removeProperty('--camera-link-color');
    indicator.style.removeProperty('--camera-link-text-color');
    return;
  }
  var textsForDialog = getGearItemEditTexts();
  indicator.hidden = false;
  indicator.removeAttribute('hidden');
  indicator.classList.toggle('gear-item-camera-link--primary', Boolean(options.isPrimary));
  var icon = indicator.querySelector('.gear-item-camera-link__icon');
  if (icon) {
    var letter = normalizeCameraLetter(options.letter || options.iconText || '') || 'A';
    icon.textContent = letter;
    indicator.setAttribute('data-camera-letter', letter);
    var color = options.color || getCameraLetterColor(letter);
    if (color) {
      indicator.style.setProperty('--camera-link-color', color);
      var textColor = computeCameraLetterTextColor(color);
      if (textColor) {
        indicator.style.setProperty('--camera-link-text-color', textColor);
      } else {
        indicator.style.removeProperty('--camera-link-text-color');
      }
    } else {
      indicator.style.removeProperty('--camera-link-color');
      indicator.style.removeProperty('--camera-link-text-color');
    }
  }
  var assist = indicator.querySelector('[data-camera-link-assist]');
  if (assist) {
    var labelText = options.badgeLabel || textsForDialog.cameraLinkBadgeLabel || 'Linked to camera';
    assist.textContent = labelText;
  }
}
function ensureGearItemTextContainer(element) {
  if (!element) return null;
  var textContainer = element.querySelector('.gear-item-text');
  if (textContainer) {
    return textContainer;
  }
  var doc = element.ownerDocument || (typeof document !== 'undefined' ? document : null);
  if (!doc) {
    return null;
  }
  textContainer = doc.createElement('span');
  textContainer.className = 'gear-item-text';
  var movableNodes = [];
  element.childNodes.forEach(function (node) {
    if (!node) return;
    if (node.nodeType === 1) {
      var classList = node.classList;
      if (classList && (classList.contains('gear-item-note') || classList.contains('gear-item-extra-indicator') || classList.contains('gear-item-edit-btn') || classList.contains('gear-custom-item-actions') || classList.contains('gear-custom-remove-btn'))) {
        return;
      }
    }
    movableNodes.push(node);
  });
  var reference = element.querySelector('.gear-item-extra-indicator') || element.querySelector('.gear-item-note') || element.querySelector('.gear-custom-item-actions') || element.querySelector('.gear-custom-remove-btn') || element.querySelector('.gear-item-edit-btn');
  movableNodes.forEach(function (node) {
    textContainer.appendChild(node);
  });
  if (reference) {
    element.insertBefore(textContainer, reference);
  } else {
    element.appendChild(textContainer);
  }
  return textContainer;
}
function parseGearItemDisplayParts(text) {
  var normalized = typeof text === 'string' ? text.trim() : '';
  if (!normalized) {
    return {
      quantity: '',
      name: '',
      attributes: ''
    };
  }
  var remainder = normalized;
  var quantity = '';
  var quantityMatch = remainder.match(/^(\d+)\s*x\s*(.*)$/i);
  if (quantityMatch) {
    quantity = quantityMatch[1] || '';
    remainder = quantityMatch[2] || '';
  }
  var attributeMatch = remainder.match(/^(.*?)(?:\s*\(([^()]+)\))?$/);
  var name = attributeMatch ? (attributeMatch[1] || '').trim() : remainder.trim();
  var attributes = attributeMatch && attributeMatch[2] ? attributeMatch[2].trim() : '';
  return {
    quantity: quantity,
    name: name,
    attributes: attributes
  };
}
function upgradeLegacyGearItemMarkup(scope) {
  var context = scope || gearListOutput;
  if (!context || typeof context.querySelectorAll !== 'function') {
    return;
  }
  var doc = context.ownerDocument || (typeof document !== 'undefined' ? document : null);
  if (!doc) return;
  var ELEMENT_NODE = typeof Node !== 'undefined' ? Node.ELEMENT_NODE : 1;
  var TEXT_NODE = typeof Node !== 'undefined' ? Node.TEXT_NODE : 3;
  var containers = context.querySelectorAll('.gear-standard-items');
  containers.forEach(function (container) {
    var nodes = Array.from(container.childNodes);
    nodes.forEach(function (node) {
      if (!node) return;
      if (node.nodeType === ELEMENT_NODE) {
        var element = node;
        if (element.classList && (element.classList.contains('gear-item') || element.classList.contains('gear-custom-item'))) {
          return;
        }
        if (element.tagName === 'BR') {
          return;
        }
        var textContent = element.textContent ? element.textContent.trim() : '';
        if (!textContent) {
          element.remove();
          return;
        }
        var replacement = doc.createElement('span');
        replacement.className = 'gear-item';
        if (element.attributes && element.attributes.length) {
          Array.from(element.attributes).forEach(function (attr) {
            if (!attr || attr.name === 'class') return;
            try {
              replacement.setAttribute(attr.name, attr.value);
            } catch (error) {
              void error;
            }
          });
        }
        var parts = parseGearItemDisplayParts(textContent);
        if (parts.name) {
          replacement.setAttribute('data-gear-name', parts.name);
          replacement.setAttribute('data-gear-label', parts.name);
        }
        if (parts.quantity) {
          replacement.setAttribute('data-gear-quantity', parts.quantity);
        }
        if (parts.attributes) {
          replacement.setAttribute('data-gear-attributes', parts.attributes);
        }
        var textSpan = doc.createElement('span');
        textSpan.className = 'gear-item-text';
        textSpan.textContent = textContent;
        var noteSpan = doc.createElement('span');
        noteSpan.className = 'gear-item-note';
        noteSpan.hidden = true;
        replacement.append(textSpan, noteSpan);
        element.replaceWith(replacement);
        return;
      }
      if (node.nodeType === TEXT_NODE) {
        var raw = node.textContent || '';
        var trimmed = raw.trim();
        if (!trimmed) {
          return;
        }
        var _replacement = doc.createElement('span');
        _replacement.className = 'gear-item';
        var _parts = parseGearItemDisplayParts(trimmed);
        if (_parts.name) {
          _replacement.setAttribute('data-gear-name', _parts.name);
          _replacement.setAttribute('data-gear-label', _parts.name);
        }
        if (_parts.quantity) {
          _replacement.setAttribute('data-gear-quantity', _parts.quantity);
        }
        if (_parts.attributes) {
          _replacement.setAttribute('data-gear-attributes', _parts.attributes);
        }
        var _textSpan = doc.createElement('span');
        _textSpan.className = 'gear-item-text';
        _textSpan.textContent = trimmed;
        var _noteSpan = doc.createElement('span');
        _noteSpan.className = 'gear-item-note';
        _noteSpan.hidden = true;
        _replacement.append(_textSpan, _noteSpan);
        container.insertBefore(_replacement, node);
        node.remove();
      }
    });
  });
}
function getGearItemData(element) {
  if (!element) {
    return {
      quantity: '',
      name: '',
      attributes: '',
      note: '',
      rentalExcluded: false
    };
  }
  var quantityAttr = element.getAttribute('data-gear-quantity') || '';
  var nameAttr = element.getAttribute('data-gear-label') || element.getAttribute('data-gear-name') || '';
  var attributesAttr = element.getAttribute('data-gear-attributes') || '';
  var noteAttr = element.getAttribute('data-gear-note') || '';
  var providerAttr = element.getAttribute('data-gear-provider') || '';
  var providerLabelAttr = element.getAttribute('data-gear-provider-label') || '';
  var extraAttr = element.getAttribute('data-gear-extra') === 'true';
  var extraStartAttr = element.getAttribute('data-gear-extra-start') || '';
  var extraEndAttr = element.getAttribute('data-gear-extra-end') || '';
  var extraLabelAttr = element.getAttribute('data-gear-extra-label') || '';
  var textContainer = element.querySelector('.gear-item-text');
  var rawText = textContainer ? textContainer.textContent : element.textContent || '';
  var parsed = parseGearItemDisplayParts(rawText);
  var quantity = quantityAttr.trim() || parsed.quantity || '';
  var name = nameAttr.trim() || parsed.name || '';
  var attributes = attributesAttr.trim() || parsed.attributes || '';
  var note = noteAttr.trim();
  var rentalExcluded = element.getAttribute('data-rental-excluded') === 'true' || element.classList.contains('gear-item-rental-excluded');
  var providedBy = providerAttr.trim();
  if (!providedBy) {
    providedBy = guessDefaultProvider(name);
  }
  var providerLabel = providerLabelAttr.trim();
  var cameraLinkAttr = element.getAttribute('data-gear-camera-link') || '';
  var cameraLetterAttr = element.getAttribute('data-gear-camera-letter') || '';
  var cameraLinkLabelAttr = element.getAttribute('data-gear-camera-link-label') || '';
  var cameraItem = isPrimaryCameraItem(element);
  var cameraLinkValue = normalizeCameraLetter(cameraLinkAttr || cameraLetterAttr);
  if (cameraItem && !cameraLinkValue) {
    cameraLinkValue = 'A';
  }
  var cameraLinkLabel = cameraLinkLabelAttr.trim() || (cameraItem ? getActiveCameraDisplayName() : '');
  return {
    quantity: quantity,
    name: name,
    attributes: attributes,
    note: note,
    rentalExcluded: rentalExcluded,
    providedBy: providedBy,
    providerLabel: providerLabel,
    extra: extraAttr,
    extraStart: extraStartAttr.trim(),
    extraEnd: extraEndAttr.trim(),
    extraLabel: extraLabelAttr.trim(),
    cameraLink: cameraLinkValue,
    cameraLinkLabel: cameraLinkLabel
  };
}
function getGearItemResetDefaults(element) {
  if (!element) {
    return {
      name: '',
      attributes: ''
    };
  }
  var originalCombined = element.getAttribute('data-gear-original-name') || element.getAttribute('data-gear-name') || '';
  var parsedOriginal = parseGearItemDisplayParts(originalCombined);
  var originalName = element.getAttribute('data-gear-original-label') || '';
  var originalAttributes = element.getAttribute('data-gear-original-attributes') || '';
  if (!originalName && parsedOriginal.name) {
    originalName = parsedOriginal.name;
  }
  if (!originalAttributes && parsedOriginal.attributes) {
    originalAttributes = parsedOriginal.attributes;
  }
  return {
    name: typeof originalName === 'string' ? originalName.trim() : '',
    attributes: typeof originalAttributes === 'string' ? originalAttributes.trim() : ''
  };
}
function getGearItemExtraTexts() {
  var allTexts = (typeof texts === "undefined" ? "undefined" : _typeof(texts)) === 'object' && texts ? texts : {};
  var activeLang = typeof currentLang === 'string' && allTexts[currentLang] ? currentLang : 'en';
  var langTexts = allTexts[activeLang] || {};
  var fallbackTexts = allTexts.en || {};
  return {
    indicatorBase: langTexts.gearListExtraIndicatorNoPeriod || fallbackTexts.gearListExtraIndicatorNoPeriod || 'Temporary extra',
    indicatorRange: langTexts.gearListExtraIndicatorRange || fallbackTexts.gearListExtraIndicatorRange || 'Temporary extra: %s – %s',
    indicatorStart: langTexts.gearListExtraIndicatorOpen || fallbackTexts.gearListExtraIndicatorOpen || 'Temporary extra from %s',
    indicatorEnd: langTexts.gearListExtraIndicatorEnd || fallbackTexts.gearListExtraIndicatorEnd || 'Temporary extra until %s'
  };
}
function getExtraGearUiTexts() {
  var allTexts = (typeof texts === "undefined" ? "undefined" : _typeof(texts)) === 'object' && texts ? texts : {};
  var activeLang = typeof currentLang === 'string' && allTexts[currentLang] ? currentLang : 'en';
  var langTexts = allTexts[activeLang] || {};
  var fallbackTexts = allTexts.en || {};
  return {
    categoryLabel: langTexts.gearListExtraCategoryLabel || fallbackTexts.gearListExtraCategoryLabel || 'Temporary Extras',
    addButton: langTexts.addExtraGearBtn || fallbackTexts.addExtraGearBtn || 'Add temporary extra gear',
    checkboxLabel: langTexts.gearListEditExtraLabel || fallbackTexts.gearListEditExtraLabel || 'Temporary extra gear',
    checkboxHelp: langTexts.gearListEditExtraHelp || fallbackTexts.gearListEditExtraHelp || '',
    periodHelp: langTexts.gearListEditExtraPeriodHelp || fallbackTexts.gearListEditExtraPeriodHelp || '',
    startLabel: langTexts.gearListEditExtraStartLabel || fallbackTexts.gearListEditExtraStartLabel || 'Needed from',
    endLabel: langTexts.gearListEditExtraEndLabel || fallbackTexts.gearListEditExtraEndLabel || 'Needed until'
  };
}
function formatExtraDate(value) {
  var trimmed = typeof value === 'string' ? value.trim() : '';
  if (!trimmed) {
    return '';
  }
  var parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) {
    return trimmed;
  }
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: 'medium'
    }).format(parsed);
  } catch (error) {
    void error;
  }
  return trimmed;
}
function sanitizeExtraPeriod(start, end) {
  var normalizedStart = typeof start === 'string' ? start.trim() : '';
  var normalizedEnd = typeof end === 'string' ? end.trim() : '';
  var resultStart = normalizedStart;
  var resultEnd = normalizedEnd;
  if (normalizedStart && normalizedEnd) {
    var startDate = new Date(normalizedStart);
    var endDate = new Date(normalizedEnd);
    if (!Number.isNaN(startDate.getTime()) && !Number.isNaN(endDate.getTime())) {
      if (startDate.getTime() > endDate.getTime()) {
        resultStart = normalizedEnd;
        resultEnd = normalizedStart;
      }
    }
  }
  return {
    start: resultStart,
    end: resultEnd
  };
}
function formatExtraPeriodLabel(start, end) {
  var textsForExtra = getGearItemExtraTexts();
  var startLabel = formatExtraDate(start);
  var endLabel = formatExtraDate(end);
  if (startLabel && endLabel) {
    return textsForExtra.indicatorRange.replace('%s', startLabel).replace('%s', endLabel);
  }
  if (startLabel) {
    return textsForExtra.indicatorStart.replace('%s', startLabel);
  }
  if (endLabel) {
    return textsForExtra.indicatorEnd.replace('%s', endLabel);
  }
  return textsForExtra.indicatorBase;
}
function applyGearItemData(element) {
  var _data$quantity, _data$name, _data$attributes, _data$note;
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (!element) return;
  var doc = element.ownerDocument || (typeof document !== 'undefined' ? document : null);
  if (!doc) return;
  var isCustomItem = element.classList && element.classList.contains('gear-custom-item');
  var textContainer = isCustomItem ? element.querySelector('.gear-item-text') : ensureGearItemTextContainer(element);
  ensureGearItemNoteSpan(element);
  if (!textContainer && !isCustomItem) return;
  var trimmedQuantity = typeof data.quantity === 'string' ? data.quantity.trim() : String((_data$quantity = data.quantity) !== null && _data$quantity !== void 0 ? _data$quantity : '').trim();
  var trimmedName = typeof data.name === 'string' ? data.name.trim() : String((_data$name = data.name) !== null && _data$name !== void 0 ? _data$name : '').trim();
  var trimmedAttributes = typeof data.attributes === 'string' ? data.attributes.trim() : String((_data$attributes = data.attributes) !== null && _data$attributes !== void 0 ? _data$attributes : '').trim();
  var trimmedNote = typeof data.note === 'string' ? data.note.trim() : String((_data$note = data.note) !== null && _data$note !== void 0 ? _data$note : '').trim();
  if (!isCustomItem && !trimmedQuantity) {
    var monitorBatteryControl = element.querySelector('select[data-monitor-battery-key]');
    if (monitorBatteryControl) {
      var batteryTypeAttr = monitorBatteryControl.getAttribute('data-monitor-battery-type') || (monitorBatteryControl.dataset ? monitorBatteryControl.dataset.monitorBatteryType : '');
      if (batteryTypeAttr === 'large') {
        trimmedQuantity = '2';
      } else if (batteryTypeAttr) {
        trimmedQuantity = '3';
      }
    }
  }
  if (!isCustomItem && textContainer) {
    var controls = Array.from(textContainer.querySelectorAll('select, input, textarea'));
    controls.forEach(function (control) {
      if (control && control.parentElement === textContainer) {
        textContainer.removeChild(control);
      }
    });
    while (textContainer.firstChild) {
      textContainer.removeChild(textContainer.firstChild);
    }
    var needsSpaceAfterQuantity = Boolean(trimmedQuantity) && (trimmedName || controls.length || trimmedAttributes);
    if (trimmedQuantity) {
      textContainer.appendChild(doc.createTextNode("".concat(trimmedQuantity, "x").concat(needsSpaceAfterQuantity ? ' ' : '')));
    }
    if (trimmedName) {
      textContainer.appendChild(doc.createTextNode(trimmedName));
      if (controls.length || trimmedAttributes) {
        textContainer.appendChild(doc.createTextNode(' '));
      }
    }
    if (!trimmedName && controls.length && trimmedQuantity) {
      textContainer.appendChild(doc.createTextNode(''));
    }
    controls.forEach(function (control, index) {
      textContainer.appendChild(control);
      if (index < controls.length - 1) {
        textContainer.appendChild(doc.createTextNode(' '));
      } else if (trimmedAttributes) {
        textContainer.appendChild(doc.createTextNode(' '));
      }
    });
    if (trimmedAttributes) {
      textContainer.appendChild(doc.createTextNode("(".concat(trimmedAttributes, ")")));
    }
  }
  if (trimmedQuantity) {
    element.setAttribute('data-gear-quantity', trimmedQuantity);
  } else {
    element.removeAttribute('data-gear-quantity');
  }
  if (trimmedName) {
    element.setAttribute('data-gear-label', trimmedName);
  } else {
    element.removeAttribute('data-gear-label');
  }
  if (trimmedAttributes) {
    element.setAttribute('data-gear-attributes', trimmedAttributes);
  } else {
    element.removeAttribute('data-gear-attributes');
  }
  if (trimmedNote) {
    element.setAttribute('data-gear-note', trimmedNote);
  } else {
    element.removeAttribute('data-gear-note');
  }
  var providerValue = typeof data.providedBy === 'string' ? data.providedBy.trim() : element.getAttribute('data-gear-provider') || '';
  var providerLabel = typeof data.providerLabel === 'string' ? data.providerLabel.trim() : element.getAttribute('data-gear-provider-label') || '';
  setGearItemProvider(element, providerValue, {
    label: providerLabel
  });
  var cameraLinkRaw = normalizeCameraLetter(typeof data.cameraLink === 'string' ? data.cameraLink.trim() : '');
  var cameraLabelRaw = typeof data.cameraLinkLabel === 'string' ? data.cameraLinkLabel.trim() : '';
  var cameraItem = isPrimaryCameraItem(element);
  var effectiveLetter = cameraItem && !cameraLinkRaw ? 'A' : cameraLinkRaw;
  var wantsCameraLink = Boolean(effectiveLetter);
  var effectiveCameraLabel = cameraLabelRaw || (cameraItem ? getActiveCameraDisplayName() : '');
  if (wantsCameraLink) {
    element.setAttribute('data-gear-camera-link', effectiveLetter);
    if (cameraItem) {
      element.setAttribute('data-gear-camera-role', 'source');
      element.setAttribute('data-gear-camera-letter', effectiveLetter);
    } else {
      element.removeAttribute('data-gear-camera-role');
      element.removeAttribute('data-gear-camera-letter');
    }
    if (effectiveCameraLabel) {
      element.setAttribute('data-gear-camera-link-label', effectiveCameraLabel);
    } else {
      element.removeAttribute('data-gear-camera-link-label');
    }
  } else {
    element.removeAttribute('data-gear-camera-link');
    element.removeAttribute('data-gear-camera-link-label');
    element.removeAttribute('data-gear-camera-role');
    element.removeAttribute('data-gear-camera-letter');
  }
  if (element.classList) {
    element.classList.toggle('gear-item-camera-linked', wantsCameraLink);
  }
  var badgeTexts = getGearItemEditTexts();
  var badgeBase = badgeTexts.cameraLinkBadgeLabel || 'Linked to camera';
  var badgeLabel = effectiveCameraLabel ? "".concat(badgeBase, " \u2014 ").concat(effectiveCameraLabel) : badgeBase;
  var indicatorLetter = wantsCameraLink ? effectiveLetter : '';
  var indicatorColor = indicatorLetter ? getCameraLetterColor(indicatorLetter) : '';
  updateGearItemCameraLinkIndicator(element, wantsCameraLink, {
    isPrimary: cameraItem,
    badgeLabel: badgeLabel,
    letter: indicatorLetter,
    color: indicatorColor
  });
  if (!element.getAttribute('data-gear-original-name')) {
    var originalName = element.getAttribute('data-gear-name');
    if (originalName) {
      element.setAttribute('data-gear-original-name', originalName);
      var parsedOriginal = parseGearItemDisplayParts(originalName);
      if (!element.getAttribute('data-gear-original-label') && parsedOriginal.name) {
        element.setAttribute('data-gear-original-label', parsedOriginal.name);
      }
      if (!element.getAttribute('data-gear-original-attributes') && parsedOriginal.attributes) {
        element.setAttribute('data-gear-original-attributes', parsedOriginal.attributes);
      }
    }
  }
  var combinedName = trimmedAttributes ? "".concat(trimmedName || '', " (").concat(trimmedAttributes, ")").trim() : trimmedName;
  if (combinedName) {
    element.setAttribute('data-gear-name', combinedName);
  } else if (trimmedQuantity) {
    element.setAttribute('data-gear-name', "".concat(trimmedQuantity, "x"));
  }
  var wantsExtra = Boolean(data && (data.extra === true || data.extra === 'true' || data.extra === 1 || data.extra === '1'));
  var extraPeriod = wantsExtra ? sanitizeExtraPeriod(Object.prototype.hasOwnProperty.call(data, 'extraStart') ? data.extraStart : '', Object.prototype.hasOwnProperty.call(data, 'extraEnd') ? data.extraEnd : '') : {
    start: '',
    end: ''
  };
  var extraTexts = getGearItemExtraTexts();
  var extraLabel = wantsExtra ? formatExtraPeriodLabel(extraPeriod.start, extraPeriod.end) : '';
  var extraIndicator = ensureGearItemExtraIndicator(element);
  if (wantsExtra) {
    element.setAttribute('data-gear-extra', 'true');
    if (extraPeriod.start) {
      element.setAttribute('data-gear-extra-start', extraPeriod.start);
    } else {
      element.removeAttribute('data-gear-extra-start');
    }
    if (extraPeriod.end) {
      element.setAttribute('data-gear-extra-end', extraPeriod.end);
    } else {
      element.removeAttribute('data-gear-extra-end');
    }
    var labelToStore = extraLabel || extraTexts.indicatorBase;
    if (labelToStore) {
      element.setAttribute('data-gear-extra-label', labelToStore);
    } else {
      element.removeAttribute('data-gear-extra-label');
    }
    if (extraIndicator) {
      var indicatorLabel = extraLabel || extraTexts.indicatorBase;
      extraIndicator.textContent = indicatorLabel;
      extraIndicator.hidden = false;
      extraIndicator.removeAttribute('hidden');
      extraIndicator.setAttribute('aria-label', indicatorLabel);
    }
  } else {
    element.removeAttribute('data-gear-extra');
    element.removeAttribute('data-gear-extra-start');
    element.removeAttribute('data-gear-extra-end');
    element.removeAttribute('data-gear-extra-label');
    if (extraIndicator) {
      extraIndicator.textContent = '';
      extraIndicator.hidden = true;
      extraIndicator.setAttribute('hidden', '');
      extraIndicator.removeAttribute('aria-label');
    }
  }
  updateGearItemNoteElement(element, trimmedNote);
  if (isCustomItem && !options.skipPreview) {
    updateCustomItemPreview(element);
  }
  if (typeof data.rentalExcluded === 'boolean') {
    setRentalExclusionState(element, data.rentalExcluded);
  }
}
function migrateLegacyCustomItemEntry(entry) {
  var _quantityInput$value, _nameInput$value;
  if (!entry || !entry.classList || !entry.classList.contains('gear-custom-item')) {
    return entry;
  }
  var hasLegacyInputs = entry.querySelector('[data-gear-custom-input]');
  if (!hasLegacyInputs) {
    return entry;
  }
  var container = entry.parentElement;
  if (!container) {
    return entry;
  }
  var categoryKey = entry.getAttribute('data-gear-custom-entry') || '';
  var categoryLabel = container.getAttribute('data-gear-custom-category') || '';
  var quantityInput = entry.querySelector('[data-gear-custom-input="quantity"]');
  var nameInput = entry.querySelector('[data-gear-custom-input="name"]');
  var quantity = quantityInput ? String((_quantityInput$value = quantityInput.value) !== null && _quantityInput$value !== void 0 ? _quantityInput$value : '') : '';
  var name = nameInput ? String((_nameInput$value = nameInput.value) !== null && _nameInput$value !== void 0 ? _nameInput$value : '') : '';
  var attributes = entry.getAttribute('data-gear-attributes') || '';
  var note = entry.getAttribute('data-gear-note') || '';
  var rentalExcluded = entry.getAttribute('data-rental-excluded') === 'true';
  var newEntry = buildCustomItemEntryElement(categoryKey, categoryLabel, {
    quantity: quantity,
    name: name,
    attributes: attributes,
    note: note
  });
  if (!newEntry) {
    return entry;
  }
  container.insertBefore(newEntry, entry.nextSibling);
  entry.remove();
  setRentalExclusionState(newEntry, rentalExcluded);
  attachCustomItemSuggestions(newEntry, categoryKey, categoryLabel);
  return newEntry;
}
function ensureGearItemEditButton(element) {
  if (!element) return null;
  if (element.querySelector('.gear-item-edit-btn')) {
    return element.querySelector('.gear-item-edit-btn');
  }
  var doc = element.ownerDocument || (typeof document !== 'undefined' ? document : null);
  if (!doc) return null;
  var button = doc.createElement('button');
  button.type = 'button';
  button.className = 'gear-item-edit-btn';
  button.setAttribute('data-gear-edit', '');
  var editTexts = getGearItemEditTexts();
  var editLabel = editTexts.editButtonLabel || '';
  if (editLabel) {
    button.setAttribute('aria-label', editLabel);
    button.setAttribute('title', editLabel);
  }
  var hasIconRegistry = (typeof ICON_GLYPHS === "undefined" ? "undefined" : _typeof(ICON_GLYPHS)) === 'object' && ICON_GLYPHS;
  var sliderGlyph = hasIconRegistry ? ICON_GLYPHS.sliders : null;
  if (typeof setButtonLabelWithIcon === 'function' && sliderGlyph) {
    setButtonLabelWithIcon(button, '', sliderGlyph);
  } else if (typeof iconMarkup === 'function' && sliderGlyph) {
    button.innerHTML = iconMarkup(sliderGlyph, {
      className: 'btn-icon'
    });
  } else if (editLabel) {
    button.textContent = editLabel;
  }
  var noteSpan = element.querySelector('.gear-item-note');
  if (noteSpan) {
    element.insertBefore(button, noteSpan.nextSibling);
  } else {
    element.appendChild(button);
  }
  return button;
}
function enhanceGearItemElement(element) {
  if (!element) return;
  if (element.classList && element.classList.contains('gear-custom-item')) {
    element = migrateLegacyCustomItemEntry(element);
  }
  var isCustom = element.classList && element.classList.contains('gear-custom-item');
  ensureGearItemNoteSpan(element);
  ensureGearItemExtraIndicator(element);
  if (!isCustom) {
    ensureGearItemTextContainer(element);
    ensureGearItemEditButton(element);
  }
  var data = getGearItemData(element);
  if (!data.quantity) {
    var monitorBatteryControl = element.querySelector('select[data-monitor-battery-type]');
    if (monitorBatteryControl) {
      var fallbackQuantity = monitorBatteryControl.getAttribute('data-monitor-battery-type') === 'handheld' ? '3' : '2';
      data.quantity = fallbackQuantity;
    }
  }
  applyGearItemData(element, data, {
    skipPreview: !isCustom
  });
}
function enhanceGearListItems(container) {
  var scope = container || gearListOutput;
  if (!scope || typeof scope.querySelectorAll !== 'function') {
    return;
  }
  upgradeLegacyGearItemMarkup(scope);
  var items = scope.querySelectorAll('.gear-item, .gear-custom-item');
  items.forEach(function (element) {
    enhanceGearItemElement(element);
  });
  refreshRentalProviderNoteDisplays();
}
function ensureGearListCustomControls(container) {
  var scope = container || gearListOutput;
  if (!scope || typeof scope.querySelectorAll !== 'function') {
    return;
  }
  var doc = scope.ownerDocument || (typeof document !== 'undefined' ? document : null);
  if (!doc) return;
  scope.querySelectorAll('tbody.category-group').forEach(function (group) {
    var header = group.querySelector('.gear-category-header');
    if (!header) return;
    var labelElement = header.querySelector('.gear-category-label');
    var categoryLabel = labelElement && labelElement.textContent ? labelElement.textContent.trim() : header.textContent.trim();
    if (!categoryLabel) return;
    var categoryKey = group.getAttribute('data-gear-custom-key');
    if (!categoryKey) {
      categoryKey = createCustomCategoryKey(categoryLabel);
      group.setAttribute('data-gear-custom-key', categoryKey);
    }
    var rows = Array.from(group.querySelectorAll('tr'));
    var bodyRow = rows.find(function (row) {
      return !row.classList.contains('category-row');
    });
    var bodyCell = bodyRow ? bodyRow.querySelector('td') : null;
    if (!bodyCell) return;
    var customSection = bodyCell.querySelector('.gear-custom-section');
    if (!customSection) {
      customSection = doc.createElement('div');
      customSection.className = 'gear-custom-section';
      bodyCell.appendChild(customSection);
    }
    customSection.setAttribute('data-gear-custom-key', categoryKey);
    customSection.setAttribute('data-gear-custom-category', categoryLabel);
    var itemsContainer = customSection.querySelector('.gear-custom-items');
    if (!itemsContainer) {
      itemsContainer = doc.createElement('div');
      itemsContainer.className = 'gear-custom-items';
      customSection.appendChild(itemsContainer);
    }
    itemsContainer.setAttribute('data-gear-custom-list', categoryKey);
    itemsContainer.setAttribute('data-gear-custom-category', categoryLabel);
    itemsContainer.setAttribute('aria-live', 'polite');
    Array.from(bodyCell.children).forEach(function (child) {
      if (child === customSection) return;
      if (child.classList && child.classList.contains('gear-custom-item')) {
        itemsContainer.appendChild(child);
      }
    });
    var standardItems = bodyCell.querySelector('.gear-standard-items');
    if (standardItems && standardItems.nextElementSibling !== customSection) {
      standardItems.insertAdjacentElement('afterend', customSection);
    } else if (!standardItems && customSection.parentElement !== bodyCell) {
      bodyCell.appendChild(customSection);
    }
    var addButton = header.querySelector('[data-gear-custom-add]');
    var addLabel = resolveGearListCustomText('gearListAddCustomItem', 'Add custom item');
    var addAria = resolveGearListCustomText('gearListAddCustomItemToCategory', 'Add custom item to {category}', {
      category: categoryLabel
    });
    if (!addButton) {
      addButton = doc.createElement('button');
      addButton.type = 'button';
      addButton.className = 'gear-custom-add-btn';
      header.appendChild(addButton);
    }
    addButton.setAttribute('data-gear-custom-add', categoryKey);
    addButton.setAttribute('data-gear-custom-category', categoryLabel);
    addButton.setAttribute('aria-label', addAria);
    addButton.setAttribute('title', addLabel);
    var hasIconRegistry = (typeof ICON_GLYPHS === "undefined" ? "undefined" : _typeof(ICON_GLYPHS)) === 'object' && ICON_GLYPHS;
    var addGlyph = hasIconRegistry && (ICON_GLYPHS.add || ICON_GLYPHS.plus);
    if (typeof setButtonLabelWithIcon === 'function' && hasIconRegistry && addGlyph) {
      setButtonLabelWithIcon(addButton, '', addGlyph);
    } else if (typeof iconMarkup === 'function' && addGlyph) {
      addButton.innerHTML = iconMarkup(addGlyph, {
        className: 'btn-icon'
      });
    } else {
      addButton.textContent = '+';
    }
  });
  ensureExtraGearCategory();
}
function ensureExtraGearCategory() {
  if (!gearListOutput) return null;
  var existingContainer = getCustomItemsContainer(EXTRA_GEAR_CATEGORY_KEY);
  if (existingContainer) {
    return existingContainer;
  }
  var table = gearListOutput.querySelector('.gear-table');
  if (!table) return null;
  var doc = table.ownerDocument || (typeof document !== 'undefined' ? document : null);
  if (!doc) return null;
  var textsForExtra = getExtraGearUiTexts();
  var categoryLabel = textsForExtra.categoryLabel || 'Temporary Extras';
  var group = doc.createElement('tbody');
  group.className = 'category-group';
  group.setAttribute('data-gear-custom-key', EXTRA_GEAR_CATEGORY_KEY);
  group.setAttribute('data-gear-table-category', categoryLabel);
  var headerRow = doc.createElement('tr');
  headerRow.className = 'category-row';
  var headerCell = doc.createElement('td');
  headerCell.setAttribute('data-gear-category-label', categoryLabel);
  var header = doc.createElement('div');
  header.className = 'gear-category-header';
  var labelSpan = doc.createElement('span');
  labelSpan.className = 'gear-category-label';
  labelSpan.textContent = categoryLabel;
  header.appendChild(labelSpan);
  var addButton = doc.createElement('button');
  addButton.type = 'button';
  addButton.className = 'gear-custom-add-btn';
  addButton.setAttribute('data-gear-custom-add', EXTRA_GEAR_CATEGORY_KEY);
  addButton.setAttribute('data-gear-custom-category', categoryLabel);
  addButton.setAttribute('data-extra-gear', 'true');
  addButton.setAttribute('aria-label', textsForExtra.addButton);
  addButton.setAttribute('title', textsForExtra.addButton);
  var hasIconRegistry = (typeof ICON_GLYPHS === "undefined" ? "undefined" : _typeof(ICON_GLYPHS)) === 'object' && ICON_GLYPHS;
  var addGlyph = hasIconRegistry && (ICON_GLYPHS.add || ICON_GLYPHS.plus);
  if (typeof setButtonLabelWithIcon === 'function' && hasIconRegistry && addGlyph) {
    setButtonLabelWithIcon(addButton, '', addGlyph);
  } else if (typeof iconMarkup === 'function' && addGlyph) {
    addButton.innerHTML = iconMarkup(addGlyph, {
      className: 'btn-icon'
    });
  } else {
    addButton.textContent = '+';
  }
  header.appendChild(addButton);
  headerCell.appendChild(header);
  headerRow.appendChild(headerCell);
  group.appendChild(headerRow);
  var bodyRow = doc.createElement('tr');
  var bodyCell = doc.createElement('td');
  var customSection = doc.createElement('div');
  customSection.className = 'gear-custom-section';
  customSection.setAttribute('data-gear-custom-key', EXTRA_GEAR_CATEGORY_KEY);
  customSection.setAttribute('data-gear-custom-category', categoryLabel);
  var itemsContainer = doc.createElement('div');
  itemsContainer.className = 'gear-custom-items';
  itemsContainer.setAttribute('data-gear-custom-list', EXTRA_GEAR_CATEGORY_KEY);
  itemsContainer.setAttribute('data-gear-custom-category', categoryLabel);
  itemsContainer.setAttribute('aria-live', 'polite');
  customSection.appendChild(itemsContainer);
  bodyCell.appendChild(customSection);
  bodyRow.appendChild(bodyCell);
  group.appendChild(bodyRow);
  table.appendChild(group);
  return itemsContainer;
}
function buildGearItemEditContext() {
  return {
    dialog: resolveElementById('gearItemEditDialog', 'gearItemEditDialog'),
    form: resolveElementById('gearItemEditForm', 'gearItemEditForm'),
    title: resolveElementById('gearItemEditTitle', 'gearItemEditTitle'),
    preview: resolveElementById('gearItemEditPreview', 'gearItemEditPreview'),
    quantityInput: resolveElementById('gearItemEditQuantity', 'gearItemEditQuantity'),
    quantityLabel: resolveElementById('gearItemEditQuantityLabel', 'gearItemEditQuantityLabel'),
    nameInput: resolveElementById('gearItemEditName', 'gearItemEditName'),
    nameLabel: resolveElementById('gearItemEditNameLabel', 'gearItemEditNameLabel'),
    noteInput: resolveElementById('gearItemEditNote', 'gearItemEditNote'),
    noteLabel: resolveElementById('gearItemEditNoteLabel', 'gearItemEditNoteLabel'),
    deviceSection: resolveElementById('gearItemEditDeviceSection', 'gearItemEditDeviceSection'),
    deviceHeading: resolveElementById('gearItemEditDeviceHeading', 'gearItemEditDeviceHeading'),
    deviceCategory: resolveElementById('gearItemEditDeviceCategory', 'gearItemEditDeviceCategory'),
    deviceSummary: resolveElementById('gearItemEditDeviceSummary', 'gearItemEditDeviceSummary'),
    deviceEmpty: resolveElementById('gearItemEditDeviceEmpty', 'gearItemEditDeviceEmpty'),
    deviceButton: resolveElementById('gearItemEditDeviceButton', 'gearItemEditDeviceButton'),
    extraContainer: resolveElementById('gearItemEditExtraContainer', 'gearItemEditExtraContainer'),
    extraCheckbox: resolveElementById('gearItemEditExtra', 'gearItemEditExtra'),
    extraLabel: resolveElementById('gearItemEditExtraLabel', 'gearItemEditExtraLabel'),
    extraHelp: resolveElementById('gearItemEditExtraHelp', 'gearItemEditExtraHelp'),
    extraPeriodContainer: resolveElementById('gearItemEditExtraPeriod', 'gearItemEditExtraPeriod'),
    extraStartInput: resolveElementById('gearItemEditExtraStart', 'gearItemEditExtraStart'),
    extraStartLabel: resolveElementById('gearItemEditExtraStartLabel', 'gearItemEditExtraStartLabel'),
    extraEndInput: resolveElementById('gearItemEditExtraEnd', 'gearItemEditExtraEnd'),
    extraEndLabel: resolveElementById('gearItemEditExtraEndLabel', 'gearItemEditExtraEndLabel'),
    extraPeriodHelp: resolveElementById('gearItemEditExtraPeriodHelp', 'gearItemEditExtraPeriodHelp'),
    providerSelect: resolveElementById('gearItemEditProvider', 'gearItemEditProvider'),
    providerLabel: resolveElementById('gearItemEditProviderLabel', 'gearItemEditProviderLabel'),
    providerHelp: resolveElementById('gearItemEditProviderHelp', 'gearItemEditProviderHelp'),
    ownedContainer: resolveElementById('gearItemEditOwnedContainer', 'gearItemEditOwnedContainer'),
    ownedCheckbox: resolveElementById('gearItemEditOwned', 'gearItemEditOwned'),
    ownedLabel: resolveElementById('gearItemEditOwnedLabel', 'gearItemEditOwnedLabel'),
    ownedHelp: resolveElementById('gearItemEditOwnedHelp', 'gearItemEditOwnedHelp'),
    cameraLinkContainer: resolveElementById('gearItemEditCameraLinkContainer', 'gearItemEditCameraLinkContainer'),
    cameraLinkSelect: resolveElementById('gearItemEditCameraLink', 'gearItemEditCameraLink'),
    cameraLinkLabel: resolveElementById('gearItemEditCameraLinkLabel', 'gearItemEditCameraLinkLabel'),
    cameraLinkHelp: resolveElementById('gearItemEditCameraLinkHelp', 'gearItemEditCameraLinkHelp'),
    rentalCheckbox: resolveElementById('gearItemEditRental', 'gearItemEditRental'),
    rentalSection: resolveElementById('gearItemEditRentalSection', 'gearItemEditRentalSection'),
    rentalLabel: resolveElementById('gearItemEditRentalLabel', 'gearItemEditRentalLabel'),
    rentalDescription: resolveElementById('gearItemEditRentalDescription', 'gearItemEditRentalDescription'),
    cancelButton: resolveElementById('gearItemEditCancel', 'gearItemEditCancel'),
    saveButton: resolveElementById('gearItemEditSave', 'gearItemEditSave'),
    resetButton: resolveElementById('gearItemEditReset', 'gearItemEditReset'),
    resetDefaults: null,
    currentAttributes: '',
    currentOwnedEntryId: '',
    currentCameraLinkValue: '',
    isCameraItem: false,
    deviceEditData: null
  };
}
var cachedGearItemEditContext = null;
function getGearItemEditContext(scope) {
  if (scope && _typeof(scope) === 'object' && scope.context && _typeof(scope.context) === 'object') {
    return scope.context;
  }
  if (!cachedGearItemEditContext) {
    cachedGearItemEditContext = buildGearItemEditContext();
  }
  return cachedGearItemEditContext;
}
function getGearItemEditTexts() {
  var langTexts = (typeof texts === "undefined" ? "undefined" : _typeof(texts)) === 'object' && texts ? texts[currentLang] || texts.en || {} : {};
  var fallbackTexts = texts && texts.en ? texts.en : {};
  return {
    dialogTitle: langTexts.gearListEditDialogTitle || fallbackTexts.gearListEditDialogTitle || 'Edit gear item',
    quantityLabel: langTexts.gearListEditQuantityLabel || fallbackTexts.gearListEditQuantityLabel || 'Quantity',
    nameLabel: langTexts.gearListEditNameLabel || fallbackTexts.gearListEditNameLabel || 'Item name',
    noteLabel: langTexts.gearListEditNoteLabel || fallbackTexts.gearListEditNoteLabel || 'Note',
    extraLabel: langTexts.gearListEditExtraLabel || fallbackTexts.gearListEditExtraLabel || 'Temporary extra gear',
    extraHelp: langTexts.gearListEditExtraHelp || fallbackTexts.gearListEditExtraHelp || '',
    extraStartLabel: langTexts.gearListEditExtraStartLabel || fallbackTexts.gearListEditExtraStartLabel || 'Needed from',
    extraEndLabel: langTexts.gearListEditExtraEndLabel || fallbackTexts.gearListEditExtraEndLabel || 'Needed until',
    extraPeriodHelp: langTexts.gearListEditExtraPeriodHelp || fallbackTexts.gearListEditExtraPeriodHelp || '',
    providerLabel: langTexts.gearListEditProviderLabel || fallbackTexts.gearListEditProviderLabel || 'Provided by',
    providerHelp: langTexts.gearListEditProviderHelp || fallbackTexts.gearListEditProviderHelp || '',
    providerRental: langTexts.gearListProviderRental || fallbackTexts.gearListProviderRental || 'Rental house',
    providerUser: langTexts.gearListProviderUser || fallbackTexts.gearListProviderUser || 'User',
    providerCrewHeading: langTexts.gearListProviderCrewHeading || fallbackTexts.gearListProviderCrewHeading || 'Crew',
    providerUnknown: langTexts.gearListProviderUnknown || fallbackTexts.gearListProviderUnknown || 'Custom provider',
    ownedLabel: langTexts.gearListEditOwnedLabel || fallbackTexts.gearListEditOwnedLabel || 'Owned',
    ownedHelp: langTexts.gearListEditOwnedHelp || fallbackTexts.gearListEditOwnedHelp || '',
    cameraLinkLabel: langTexts.gearListEditCameraLinkLabel || fallbackTexts.gearListEditCameraLinkLabel || 'Camera link',
    cameraLinkHelp: langTexts.gearListEditCameraLinkHelp || fallbackTexts.gearListEditCameraLinkHelp || '',
    cameraAssignmentLabel: langTexts.gearListEditCameraAssignmentLabel || fallbackTexts.gearListEditCameraAssignmentLabel || 'Camera designation',
    cameraAssignmentHelp: langTexts.gearListEditCameraAssignmentHelp || fallbackTexts.gearListEditCameraAssignmentHelp || '',
    cameraLinkNoneOption: langTexts.gearListEditCameraLinkNoneOption || fallbackTexts.gearListEditCameraLinkNoneOption || 'No camera link',
    cameraLinkCameraOption: langTexts.gearListEditCameraLinkCameraOption || fallbackTexts.gearListEditCameraLinkCameraOption || 'Camera %s — %s',
    cameraLinkUnavailableOption: langTexts.gearListEditCameraLinkUnavailableOption || fallbackTexts.gearListEditCameraLinkUnavailableOption || 'Camera %s (unassigned)',
    cameraLinkDefaultLabel: langTexts.gearListEditCameraLinkDefaultLabel || fallbackTexts.gearListEditCameraLinkDefaultLabel || 'Camera %s',
    cameraLinkBadgeLabel: langTexts.gearListCameraLinkBadgeLabel || fallbackTexts.gearListCameraLinkBadgeLabel || 'Linked to camera',
    rentalLabel: langTexts.gearListEditRentalLabel || fallbackTexts.gearListEditRentalLabel || 'Exclude from rental house',
    rentalNote: resolveRentalProviderNoteLabel({
      fallback: langTexts.gearListRentalNote || fallbackTexts.gearListRentalNote || 'Rental house handles this item'
    }),
    saveLabel: langTexts.gearListEditSave || fallbackTexts.gearListEditSave || 'Save',
    cancelLabel: langTexts.gearListEditCancel || fallbackTexts.gearListEditCancel || 'Cancel',
    editButtonLabel: langTexts.gearListEditButton || fallbackTexts.gearListEditButton || 'Edit gear item',
    resetLabel: langTexts.gearListEditReset || fallbackTexts.gearListEditReset || 'Reset name',
    deviceHeading: langTexts.gearListEditDeviceHeading || fallbackTexts.gearListEditDeviceHeading || 'Device attributes',
    deviceEditButton: langTexts.gearListEditDeviceEdit || fallbackTexts.gearListEditDeviceEdit || 'Edit device attributes',
    deviceEmpty: langTexts.gearListEditDeviceEmpty || fallbackTexts.gearListEditDeviceEmpty || 'No device attributes recorded yet. Update the device to add details.',
    deviceCategoryLabel: langTexts.gearListEditDeviceCategory || fallbackTexts.gearListEditDeviceCategory || 'Device library: %s'
  };
}
function applyGearItemEditDialogTexts(context) {
  if (!context) return;
  var textsForDialog = getGearItemEditTexts();
  if (context.title) {
    context.title.textContent = textsForDialog.dialogTitle;
  }
  if (context.preview) {
    context.preview.textContent = '';
    context.preview.hidden = true;
  }
  hideGearItemEditDeviceInfo(context);
  if (context.quantityLabel) {
    context.quantityLabel.textContent = textsForDialog.quantityLabel;
  }
  if (context.nameLabel) {
    context.nameLabel.textContent = textsForDialog.nameLabel;
  }
  if (context.noteLabel) {
    context.noteLabel.textContent = textsForDialog.noteLabel;
  }
  if (context.extraLabel) {
    var labelSpan = context.extraLabel.querySelector('span');
    if (labelSpan) {
      labelSpan.textContent = textsForDialog.extraLabel;
    } else {
      context.extraLabel.textContent = textsForDialog.extraLabel;
    }
  }
  if (context.extraCheckbox) {
    context.extraCheckbox.setAttribute('aria-label', textsForDialog.extraLabel);
  }
  if (context.extraHelp) {
    if (textsForDialog.extraHelp) {
      context.extraHelp.textContent = textsForDialog.extraHelp;
      context.extraHelp.hidden = false;
      context.extraHelp.removeAttribute('hidden');
    } else {
      context.extraHelp.textContent = '';
      context.extraHelp.hidden = true;
      context.extraHelp.setAttribute('hidden', '');
    }
  }
  if (context.extraStartLabel) {
    context.extraStartLabel.textContent = textsForDialog.extraStartLabel;
  }
  if (context.extraEndLabel) {
    context.extraEndLabel.textContent = textsForDialog.extraEndLabel;
  }
  if (context.extraPeriodHelp) {
    if (textsForDialog.extraPeriodHelp) {
      context.extraPeriodHelp.textContent = textsForDialog.extraPeriodHelp;
      context.extraPeriodHelp.hidden = false;
      context.extraPeriodHelp.removeAttribute('hidden');
    } else {
      context.extraPeriodHelp.textContent = '';
      context.extraPeriodHelp.hidden = true;
      context.extraPeriodHelp.setAttribute('hidden', '');
    }
  }
  if (context.providerLabel) {
    context.providerLabel.textContent = textsForDialog.providerLabel;
  }
  if (context.providerHelp) {
    context.providerHelp.textContent = textsForDialog.providerHelp || '';
    context.providerHelp.hidden = !context.providerHelp.textContent;
  }
  if (context.providerSelect) {
    if (context.providerHelp && context.providerHelp.textContent) {
      context.providerSelect.setAttribute('aria-describedby', context.providerHelp.id);
    } else {
      context.providerSelect.removeAttribute('aria-describedby');
    }
    context.providerSelect.setAttribute('aria-label', textsForDialog.providerLabel);
  }
  if (context.cameraLinkLabel) {
    context.cameraLinkLabel.textContent = textsForDialog.cameraLinkLabel;
  }
  if (context.cameraLinkHelp) {
    var cameraHelp = textsForDialog.cameraLinkHelp || '';
    context.cameraLinkHelp.textContent = cameraHelp;
    if (cameraHelp) {
      context.cameraLinkHelp.hidden = false;
      context.cameraLinkHelp.removeAttribute('hidden');
    } else {
      context.cameraLinkHelp.hidden = true;
      context.cameraLinkHelp.setAttribute('hidden', '');
    }
  }
  if (context.cameraLinkSelect) {
    if (context.cameraLinkHelp && context.cameraLinkHelp.textContent) {
      context.cameraLinkSelect.setAttribute('aria-describedby', context.cameraLinkHelp.id);
    } else {
      context.cameraLinkSelect.removeAttribute('aria-describedby');
    }
    context.cameraLinkSelect.setAttribute('aria-label', textsForDialog.cameraLinkLabel);
  }
  if (context.deviceHeading) {
    context.deviceHeading.textContent = textsForDialog.deviceHeading;
  }
  if (context.deviceButton) {
    context.deviceButton.textContent = textsForDialog.deviceEditButton;
    context.deviceButton.setAttribute('aria-label', textsForDialog.deviceEditButton);
    context.deviceButton.disabled = true;
    context.deviceButton.setAttribute('aria-disabled', 'true');
  }
  if (context.deviceEmpty) {
    context.deviceEmpty.textContent = textsForDialog.deviceEmpty || '';
  }
  if (context.ownedLabel) {
    var ownedLabelSpan = context.ownedLabel.querySelector('span');
    if (ownedLabelSpan) {
      ownedLabelSpan.textContent = textsForDialog.ownedLabel;
    }
  }
  if (context.ownedHelp) {
    var helpText = textsForDialog.ownedHelp || '';
    context.ownedHelp.textContent = helpText;
    context.ownedHelp.hidden = !helpText;
  }
  if (context.ownedCheckbox) {
    context.ownedCheckbox.setAttribute('aria-label', textsForDialog.ownedLabel);
    if (context.ownedHelp && context.ownedHelp.textContent && !context.ownedHelp.hidden) {
      context.ownedCheckbox.setAttribute('aria-describedby', context.ownedHelp.id);
    } else {
      context.ownedCheckbox.removeAttribute('aria-describedby');
    }
  }
  var rentalTexts = getGearListRentalToggleTexts();
  var baseToggleLabel = rentalTexts.excludeLabel || textsForDialog.rentalLabel;
  var rentalNote = textsForDialog.rentalNote || rentalTexts.noteLabel || '';
  if (context.rentalLabel) {
    context.rentalLabel.textContent = baseToggleLabel;
  }
  if (context.rentalCheckbox) {
    context.rentalCheckbox.setAttribute('aria-label', textsForDialog.rentalLabel);
  }
  if (context.resetButton) {
    var resetLabel = textsForDialog.resetLabel;
    context.resetButton.setAttribute('aria-label', resetLabel);
    context.resetButton.title = resetLabel;
    if (typeof setButtonLabelWithIcon === 'function' && (typeof ICON_GLYPHS === "undefined" ? "undefined" : _typeof(ICON_GLYPHS)) === 'object' && ICON_GLYPHS) {
      var resetGlyph = ICON_GLYPHS.reload || ICON_GLYPHS.save;
      setButtonLabelWithIcon(context.resetButton, resetLabel, resetGlyph);
    } else {
      context.resetButton.textContent = resetLabel;
    }
  }
  if (context.rentalDescription) {
    context.rentalDescription.textContent = rentalNote;
    context.rentalDescription.hidden = !rentalNote;
  }
  if (context.rentalCheckbox) {
    if (context.rentalDescription && context.rentalDescription.textContent) {
      context.rentalCheckbox.setAttribute('aria-describedby', context.rentalDescription.id);
    } else {
      context.rentalCheckbox.removeAttribute('aria-describedby');
    }
  }
  if (context.cancelButton) {
    var cancelLabel = textsForDialog.cancelLabel;
    context.cancelButton.setAttribute('aria-label', cancelLabel);
    if (typeof setButtonLabelWithIcon === 'function' && (typeof ICON_GLYPHS === "undefined" ? "undefined" : _typeof(ICON_GLYPHS)) === 'object' && ICON_GLYPHS) {
      setButtonLabelWithIcon(context.cancelButton, cancelLabel, ICON_GLYPHS.circleX || ICON_GLYPHS.minus);
    } else {
      context.cancelButton.textContent = cancelLabel;
    }
  }
  if (context.saveButton) {
    var saveLabel = textsForDialog.saveLabel;
    if (typeof setButtonLabelWithIcon === 'function' && (typeof ICON_GLYPHS === "undefined" ? "undefined" : _typeof(ICON_GLYPHS)) === 'object' && ICON_GLYPHS) {
      setButtonLabelWithIcon(context.saveButton, saveLabel, ICON_GLYPHS.save);
    } else {
      context.saveButton.textContent = saveLabel;
    }
  }
}
function computeGearItemEditPreviewText(context) {
  if (!context) return '';
  var quantity = context.quantityInput ? context.quantityInput.value.trim() : '';
  var name = context.nameInput ? context.nameInput.value.trim() : '';
  var attributes = context.attributesInput ? context.attributesInput.value.trim() : typeof context.currentAttributes === 'string' ? context.currentAttributes.trim() : '';
  var segments = [];
  if (quantity) {
    segments.push("".concat(quantity, "x"));
  }
  if (name) {
    segments.push(name);
  }
  var preview = segments.join(' ').trim();
  if (attributes) {
    preview = preview ? "".concat(preview, " (").concat(attributes, ")") : "(".concat(attributes, ")");
  }
  return preview.trim();
}
function updateGearItemEditPreview(context) {
  if (!context) return '';
  var previewText = computeGearItemEditPreviewText(context);
  if (context.preview) {
    context.preview.textContent = previewText;
    context.preview.hidden = !previewText;
  }
  return previewText;
}
function isPlainObjectValue(value) {
  return value !== null && _typeof(value) === 'object' && !Array.isArray(value);
}
function cssEscapeValue(value) {
  if (typeof CSS !== 'undefined' && CSS && typeof CSS.escape === 'function') {
    return CSS.escape(value);
  }
  return String(value !== null && value !== void 0 ? value : '').replace(/\r?\n/g, '').replace(/[^a-zA-Z0-9_-]/g, function (match) {
    return "\\".concat(match);
  });
}
function formatDeviceCategoryLabel(category) {
  if (typeof category !== 'string' || !category.trim()) {
    return '';
  }
  return category.replace(/[_-]+/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2').split(/\s+/).filter(Boolean).map(function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}
function formatDeviceCategoryPathForEdit(path) {
  if (!Array.isArray(path) || !path.length) {
    return '';
  }
  return path.map(formatDeviceCategoryLabel).filter(Boolean).join(' › ');
}
function findDeviceRecordByName(rawName) {
  var trimmed = typeof rawName === 'string' ? rawName.trim() : '';
  if (!trimmed) {
    return null;
  }
  if (!devices || (typeof devices === "undefined" ? "undefined" : _typeof(devices)) !== 'object') {
    return null;
  }
  var visited = new Set();
  var _search = function search(node, path) {
    if (!isPlainObjectValue(node) || visited.has(node)) {
      return null;
    }
    visited.add(node);
    if (Object.prototype.hasOwnProperty.call(node, trimmed) && isPlainObjectValue(node[trimmed])) {
      return {
        info: node[trimmed],
        categoryPath: path.slice()
      };
    }
    for (var _i12 = 0, _Object$entries7 = Object.entries(node); _i12 < _Object$entries7.length; _i12++) {
      var _Object$entries7$_i = _slicedToArray(_Object$entries7[_i12], 2),
        key = _Object$entries7$_i[0],
        value = _Object$entries7$_i[1];
      if (!isPlainObjectValue(value)) {
        continue;
      }
      var _result = _search(value, path.concat(key));
      if (_result) {
        return _result;
      }
    }
    return null;
  };
  var result = _search(devices, []);
  if (!result) {
    return null;
  }
  var categoryPath = Array.isArray(result.categoryPath) ? result.categoryPath.slice() : [];
  var categoryKey = '';
  var subcategory = '';
  if (categoryPath.length >= 2 && categoryPath[0] === 'accessories') {
    categoryKey = "accessories.".concat(categoryPath[1]);
    if (categoryPath[1] === 'cables' && categoryPath.length >= 3) {
      subcategory = categoryPath[2];
    }
  } else if (categoryPath.length >= 2 && categoryPath[0] === 'fiz') {
    categoryKey = "fiz.".concat(categoryPath[1]);
  } else if (categoryPath.length >= 2) {
    categoryKey = "".concat(categoryPath[0], ".").concat(categoryPath[1]);
  } else if (categoryPath.length === 1) {
    categoryKey = categoryPath[0];
  }
  return {
    info: result.info,
    categoryPath: categoryPath,
    categoryKey: categoryKey,
    subcategory: subcategory
  };
}
function generateGearItemDeviceSummary(deviceInfo) {
  if (!deviceInfo || _typeof(deviceInfo) !== 'object') {
    return '';
  }
  var generator = typeof generateSafeConnectorSummary === 'function' ? generateSafeConnectorSummary : typeof generateConnectorSummary === 'function' ? generateConnectorSummary : null;
  if (!generator) {
    return '';
  }
  try {
    var summary = generator(deviceInfo);
    return typeof summary === 'string' ? summary : '';
  } catch (error) {
    void error;
    return '';
  }
}
function hideGearItemEditDeviceInfo(context) {
  if (!context) {
    return;
  }
  if (context.deviceSummary) {
    context.deviceSummary.innerHTML = '';
    context.deviceSummary.hidden = true;
    context.deviceSummary.setAttribute('hidden', '');
  }
  if (context.deviceCategory) {
    context.deviceCategory.textContent = '';
    context.deviceCategory.hidden = true;
    context.deviceCategory.setAttribute('hidden', '');
  }
  if (context.deviceEmpty) {
    context.deviceEmpty.hidden = true;
    context.deviceEmpty.setAttribute('hidden', '');
  }
  if (context.deviceButton) {
    context.deviceButton.disabled = true;
    context.deviceButton.setAttribute('aria-disabled', 'true');
  }
  if (context.deviceSection) {
    context.deviceSection.hidden = true;
    context.deviceSection.setAttribute('hidden', '');
  }
  context.deviceEditData = null;
}
function updateGearItemEditDeviceInfo(context) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (!context || !context.deviceSection) {
    return;
  }
  var textsForDialog = getGearItemEditTexts();
  var overrideName = typeof options.name === 'string' ? options.name : null;
  var fallbackName = typeof options.fallbackName === 'string' ? options.fallbackName : '';
  var lookupName = overrideName && overrideName.trim() ? overrideName.trim() : fallbackName.trim();
  if (!lookupName) {
    hideGearItemEditDeviceInfo(context);
    return;
  }
  var record = findDeviceRecordByName(lookupName);
  if (!record || !record.info) {
    hideGearItemEditDeviceInfo(context);
    return;
  }
  var summaryHtml = generateGearItemDeviceSummary(record.info);
  if (context.deviceSummary) {
    context.deviceSummary.innerHTML = summaryHtml || '';
    if (summaryHtml) {
      context.deviceSummary.hidden = false;
      context.deviceSummary.removeAttribute('hidden');
    } else {
      context.deviceSummary.hidden = true;
      context.deviceSummary.setAttribute('hidden', '');
    }
  }
  if (context.deviceCategory) {
    var categoryLabel = formatDeviceCategoryPathForEdit(record.categoryPath || []);
    if (categoryLabel) {
      var template = textsForDialog.deviceCategoryLabel || 'Device library: %s';
      var labelText = template.includes('%s') ? template.replace('%s', categoryLabel) : "".concat(template, " ").concat(categoryLabel).trim();
      context.deviceCategory.textContent = labelText;
      context.deviceCategory.hidden = false;
      context.deviceCategory.removeAttribute('hidden');
    } else {
      context.deviceCategory.textContent = '';
      context.deviceCategory.hidden = true;
      context.deviceCategory.setAttribute('hidden', '');
    }
  }
  if (context.deviceEmpty) {
    var emptyMessage = textsForDialog.deviceEmpty || '';
    if (emptyMessage && !summaryHtml) {
      context.deviceEmpty.textContent = emptyMessage;
      context.deviceEmpty.hidden = false;
      context.deviceEmpty.removeAttribute('hidden');
    } else {
      context.deviceEmpty.textContent = emptyMessage;
      context.deviceEmpty.hidden = true;
      context.deviceEmpty.setAttribute('hidden', '');
    }
  }
  if (context.deviceButton) {
    context.deviceButton.disabled = false;
    context.deviceButton.setAttribute('aria-disabled', 'false');
  }
  if (context.deviceSection) {
    context.deviceSection.hidden = false;
    context.deviceSection.removeAttribute('hidden');
  }
  context.deviceEditData = {
    name: lookupName,
    categoryKey: record.categoryKey,
    subcategory: record.subcategory || ''
  };
}
function openDeviceManagerForDevice(target) {
  if (!target || !target.name || !target.categoryKey) {
    return;
  }
  try {
    if (typeof showDeviceManagerSection === 'function') {
      showDeviceManagerSection();
    } else if (typeof toggleDeviceManagerSection === 'function') {
      toggleDeviceManagerSection();
    }
  } catch (error) {
    void error;
  }
  try {
    if (typeof refreshDeviceLists === 'function') {
      refreshDeviceLists();
    }
  } catch (error) {
    void error;
  }
  var maxAttempts = 4;
  var attempt = 0;
  var _locateButton = function locateButton() {
    attempt += 1;
    var selector = "#device-manager .edit-btn[data-category=\"".concat(cssEscapeValue(target.categoryKey), "\"][data-name=\"").concat(cssEscapeValue(target.name), "\"]");
    if (target.subcategory) {
      selector += "[data-subcategory=\"".concat(cssEscapeValue(target.subcategory), "\"]");
    } else {
      selector += ':not([data-subcategory])';
    }
    var button = null;
    try {
      button = document.querySelector(selector);
    } catch (error) {
      void error;
      button = null;
    }
    if (button) {
      try {
        if (button.scrollIntoView) {
          button.scrollIntoView({
            block: 'center',
            behavior: 'smooth'
          });
        }
        button.focus({
          preventScroll: true
        });
      } catch (focusError) {
        void focusError;
      }
      try {
        button.click();
      } catch (clickError) {
        void clickError;
      }
      return;
    }
    if (attempt < maxAttempts) {
      setTimeout(_locateButton, 120 * attempt);
    } else if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
      console.warn('Could not locate device edit button for gear item', target);
    }
  };
  setTimeout(_locateButton, 60);
}
function handleGearItemEditDeviceButtonClick(event) {
  if (event) {
    event.preventDefault();
  }
  var context = getGearItemEditContext();
  if (!context || !context.deviceEditData) {
    return;
  }
  if (context.dialog) {
    try {
      if (typeof context.dialog.close === 'function') {
        context.dialog.close('device-edit');
      } else {
        context.dialog.removeAttribute('open');
      }
    } catch (error) {
      void error;
    }
  }
  openDeviceManagerForDevice(context.deviceEditData);
}
function updateGearItemEditExtraControls(context, active) {
  if (!context) return;
  var enabled = Boolean(active);
  if (context.extraPeriodContainer) {
    if (enabled) {
      context.extraPeriodContainer.hidden = false;
      context.extraPeriodContainer.removeAttribute('hidden');
    } else {
      context.extraPeriodContainer.hidden = true;
      context.extraPeriodContainer.setAttribute('hidden', '');
    }
  }
  if (context.extraStartInput) {
    context.extraStartInput.disabled = !enabled;
    if (!enabled) {
      context.extraStartInput.setAttribute('aria-disabled', 'true');
    } else {
      context.extraStartInput.removeAttribute('aria-disabled');
    }
  }
  if (context.extraEndInput) {
    context.extraEndInput.disabled = !enabled;
    if (!enabled) {
      context.extraEndInput.setAttribute('aria-disabled', 'true');
    } else {
      context.extraEndInput.removeAttribute('aria-disabled');
    }
  }
}
function updateGearItemEditResetState(context) {
  if (!context || !context.resetButton) {
    return;
  }
  var defaults = context.resetDefaults || {
    name: '',
    attributes: ''
  };
  var targetEntry = activeGearItemEditTarget && activeGearItemEditTarget.element;
  var hasStoredOriginal = Boolean(targetEntry && targetEntry.hasAttribute('data-gear-original-name'));
  var defaultName = typeof defaults.name === 'string' ? defaults.name.trim() : '';
  var defaultAttributes = typeof defaults.attributes === 'string' ? defaults.attributes.trim() : '';
  var currentName = context.nameInput ? context.nameInput.value.trim() : '';
  var currentAttributes = context.attributesInput ? context.attributesInput.value.trim() : typeof context.currentAttributes === 'string' ? context.currentAttributes.trim() : '';
  var hasDefaults = hasStoredOriginal || Boolean(defaultName || defaultAttributes || currentAttributes);
  var matchesDefaults = currentName === defaultName && currentAttributes === defaultAttributes;
  var shouldDisable = !hasDefaults || matchesDefaults;
  context.resetButton.disabled = shouldDisable;
  context.resetButton.setAttribute('aria-disabled', shouldDisable ? 'true' : 'false');
}
function updateGearItemEditRentalControls(context, excluded, allowRentalToggle) {
  if (!context) return;
  var shouldExclude = Boolean(excluded);
  var canToggle = Boolean(allowRentalToggle);
  if (context.rentalCheckbox) {
    context.rentalCheckbox.checked = shouldExclude;
    context.rentalCheckbox.disabled = !canToggle;
    if (canToggle) {
      context.rentalCheckbox.removeAttribute('aria-disabled');
    } else {
      context.rentalCheckbox.setAttribute('aria-disabled', 'true');
    }
  }
  if (context.rentalSection) {
    context.rentalSection.hidden = !canToggle;
  }
  if (context.rentalDescription) {
    context.rentalDescription.hidden = !context.rentalDescription.textContent;
  }
}
function handleGearItemEditFieldInput() {
  var context = getGearItemEditContext();
  if (!context) return;
  if (context.extraCheckbox) {
    updateGearItemEditExtraControls(context, context.extraCheckbox.checked);
  }
  var previewText = updateGearItemEditPreview(context);
  var textsForDialog = getGearItemEditTexts();
  if (context.title) {
    context.title.textContent = previewText ? "".concat(textsForDialog.dialogTitle, " \u2014 ").concat(previewText) : textsForDialog.dialogTitle;
  }
  if (context.ownedCheckbox) {
    var hasName = Boolean(context.nameInput && context.nameInput.value.trim());
    context.ownedCheckbox.disabled = !hasName;
    if (context.ownedCheckbox.disabled) {
      context.ownedCheckbox.setAttribute('aria-disabled', 'true');
      context.ownedCheckbox.checked = false;
    } else {
      context.ownedCheckbox.removeAttribute('aria-disabled');
    }
  }
  updateGearItemEditResetState(context);
  var fallbackName = context.resetDefaults && typeof context.resetDefaults.name === 'string' ? context.resetDefaults.name : '';
  var currentName = context.nameInput ? context.nameInput.value : '';
  updateGearItemEditDeviceInfo(context, {
    name: currentName,
    fallbackName: fallbackName
  });
}
function handleGearItemEditRentalCheckboxChange() {
  var context = getGearItemEditContext();
  if (!context) return;
  var allowToggle = context.rentalCheckbox ? !context.rentalCheckbox.disabled : true;
  var nextState = context.rentalCheckbox ? context.rentalCheckbox.checked : false;
  updateGearItemEditRentalControls(context, nextState, allowToggle);
}
function handleGearItemEditOwnedChange() {
  var context = getGearItemEditContext();
  if (!context || !context.ownedCheckbox) {
    return;
  }
  var hasName = Boolean(context.nameInput && context.nameInput.value.trim());
  if (!hasName) {
    context.ownedCheckbox.checked = false;
    context.ownedCheckbox.disabled = true;
    context.ownedCheckbox.setAttribute('aria-disabled', 'true');
    return;
  }
  context.ownedCheckbox.disabled = false;
  context.ownedCheckbox.removeAttribute('aria-disabled');
  if (context.providerSelect) {
    if (context.ownedCheckbox.checked) {
      if (!context.providerSelect.value || context.providerSelect.value === 'rental-house') {
        context.providerSelect.value = 'user';
      }
    } else if (context.providerSelect.value === 'user') {
      context.providerSelect.value = 'rental-house';
    }
  }
}
function handleGearItemEditExtraChange() {
  var context = getGearItemEditContext();
  if (!context || !context.extraCheckbox) {
    return;
  }
  updateGearItemEditExtraControls(context, context.extraCheckbox.checked);
  handleGearItemEditFieldInput();
}
function handleGearItemEditResetClick(event) {
  if (event) {
    event.preventDefault();
  }
  var context = getGearItemEditContext();
  if (!context || !context.resetButton || context.resetButton.disabled) {
    return;
  }
  var defaults = context.resetDefaults || {
    name: '',
    attributes: ''
  };
  if (context.nameInput) {
    context.nameInput.value = defaults.name || '';
  }
  if (context.attributesInput) {
    context.attributesInput.value = defaults.attributes || '';
  } else {
    context.currentAttributes = typeof defaults.attributes === 'string' ? defaults.attributes : '';
  }
  handleGearItemEditFieldInput();
  if (context.nameInput && typeof context.nameInput.focus === 'function') {
    try {
      context.nameInput.focus({
        preventScroll: true
      });
    } catch (error) {
      void error;
    }
  }
}
function handleGearItemEditDialogBackdropPointerDown(event) {
  if (!event) {
    return;
  }
  var context = getGearItemEditContext();
  if (!context || !context.dialog) {
    return;
  }
  if (event.target !== context.dialog) {
    return;
  }
  event.preventDefault();
  event.stopPropagation();
  handleGearItemEditDialogCancel(event);
}
var gearItemEditDialogBound = false;
var activeGearItemEditTarget = null;
function handleGearItemEditFormSubmit(event) {
  event.preventDefault();
  var context = getGearItemEditContext();
  if (!context || !context.dialog) {
    return;
  }
  var targetEntry = activeGearItemEditTarget && activeGearItemEditTarget.element;
  var targetOptions = activeGearItemEditTarget && activeGearItemEditTarget.options;
  var allowRentalToggle = !targetOptions || targetOptions.allowRentalToggle !== false;
  if (!targetEntry || !targetEntry.isConnected) {
    context.dialog.close('cancel');
    activeGearItemEditTarget = null;
    return;
  }
  var data = {
    quantity: context.quantityInput ? context.quantityInput.value : '',
    name: context.nameInput ? context.nameInput.value : '',
    attributes: context.attributesInput ? context.attributesInput.value : typeof context.currentAttributes === 'string' ? context.currentAttributes : '',
    note: context.noteInput ? context.noteInput.value : '',
    rentalExcluded: allowRentalToggle && context.rentalCheckbox ? context.rentalCheckbox.checked : targetEntry.getAttribute('data-rental-excluded') === 'true',
    providedBy: context.providerSelect ? context.providerSelect.value : '',
    providerLabel: context.providerSelect && context.providerSelect.selectedOptions && context.providerSelect.selectedOptions.length ? getProviderOptionLabel(context.providerSelect.selectedOptions[0]) : '',
    extra: context.extraCheckbox ? context.extraCheckbox.checked : Boolean(targetEntry.getAttribute('data-gear-extra') === 'true'),
    extraStart: context.extraStartInput ? context.extraStartInput.value : targetEntry.getAttribute('data-gear-extra-start') || '',
    extraEnd: context.extraEndInput ? context.extraEndInput.value : targetEntry.getAttribute('data-gear-extra-end') || '',
    cameraLink: '',
    cameraLinkLabel: ''
  };
  if (data.extra) {
    var sanitized = sanitizeExtraPeriod(data.extraStart, data.extraEnd);
    data.extraStart = sanitized.start;
    data.extraEnd = sanitized.end;
  } else {
    data.extraStart = '';
    data.extraEnd = '';
  }
  var hasNameForOwned = Boolean(data.name && data.name.trim());
  var wantsOwned = Boolean(context.ownedCheckbox && context.ownedCheckbox.checked && hasNameForOwned);
  if (wantsOwned && (!data.providedBy || data.providedBy === 'rental-house')) {
    if (context.providerSelect) {
      context.providerSelect.value = 'user';
      var selected = context.providerSelect.selectedOptions && context.providerSelect.selectedOptions[0];
      data.providedBy = context.providerSelect.value;
      data.providerLabel = selected ? getProviderOptionLabel(selected) : data.providerLabel;
    } else {
      data.providedBy = 'user';
    }
  }
  var isCameraItem = Boolean(context.isCameraItem);
  var cameraLinkSelection = '';
  var cameraLinkLabel = '';
  if (context.cameraLinkSelect) {
    cameraLinkSelection = context.cameraLinkSelect.value || '';
    var selectedOption = context.cameraLinkSelect.selectedOptions && context.cameraLinkSelect.selectedOptions[0];
    if (selectedOption) {
      cameraLinkLabel = selectedOption.getAttribute('data-camera-label') || (selectedOption.dataset ? selectedOption.dataset.cameraLabel : '') || '';
      if (!cameraLinkLabel) {
        var optionText = selectedOption.textContent || '';
        if (optionText) {
          cameraLinkLabel = optionText.replace(/\s*\([^)]*\)\s*$/, '').trim();
        }
      }
    }
  }
  var desiredLetter = normalizeCameraLetter(isCameraItem && !cameraLinkSelection ? 'A' : cameraLinkSelection);
  var wantsCameraLink = Boolean(desiredLetter);
  if (wantsCameraLink) {
    data.cameraLink = desiredLetter;
    data.cameraLinkLabel = cameraLinkLabel || data.name && data.name.trim() || getActiveCameraDisplayName() || '';
  } else {
    data.cameraLink = '';
    data.cameraLinkLabel = '';
  }
  context.currentCameraLinkValue = data.cameraLink;
  applyGearItemData(targetEntry, data);
  markProjectFormDataDirty();
  var ownedSyncResult = wantsOwned || context.currentOwnedEntryId ? syncGearItemOwnedState(targetEntry, data, {
    wantsOwned: wantsOwned,
    existingId: context.currentOwnedEntryId || targetEntry.getAttribute('data-gear-own-gear-id') || ''
  }) : {
    id: '',
    changed: false
  };
  if (ownedSyncResult && Object.prototype.hasOwnProperty.call(ownedSyncResult, 'id')) {
    if (ownedSyncResult.id) {
      targetEntry.setAttribute('data-gear-own-gear-id', ownedSyncResult.id);
    } else {
      targetEntry.removeAttribute('data-gear-own-gear-id');
    }
    context.currentOwnedEntryId = ownedSyncResult.id || '';
    if (ownedSyncResult.changed) {
      ownGearNameCache = null;
    }
  }
  context.currentAttributes = typeof data.attributes === 'string' ? data.attributes : '';
  if (targetEntry.classList && targetEntry.classList.contains('gear-custom-item')) {
    persistCustomItemsChange();
  } else {
    if (typeof saveCurrentGearList === 'function') {
      saveCurrentGearList();
    }
    if (typeof saveCurrentSession === 'function') {
      saveCurrentSession();
    }
    if (typeof checkSetupChanged === 'function') {
      checkSetupChanged();
    }
  }
  context.dialog.close('save');
}
function handleGearItemEditDialogCancel(event) {
  if (event) {
    event.preventDefault();
  }
  var context = getGearItemEditContext();
  if (context && context.dialog) {
    context.dialog.close('cancel');
  }
}
function handleGearItemEditDialogClose() {
  var context = getGearItemEditContext();
  var targetEntry = activeGearItemEditTarget && activeGearItemEditTarget.element;
  var returnValue = context && context.dialog ? context.dialog.returnValue : '';
  if (context) {
    hideGearItemEditDeviceInfo(context);
  }
  if (context && context.form) {
    try {
      context.form.reset();
    } catch (error) {
      void error;
    }
  }
  if (context && context.nameInput) {
    context.nameInput.removeAttribute('list');
  }
  if (context && context.preview) {
    context.preview.textContent = '';
    context.preview.hidden = true;
  }
  if (context) {
    context.resetDefaults = null;
    context.currentAttributes = '';
    context.currentOwnedEntryId = '';
    context.currentCameraLinkValue = '';
    context.isCameraItem = false;
    if (context.resetButton) {
      context.resetButton.disabled = false;
      context.resetButton.setAttribute('aria-disabled', 'false');
    }
    if (context.ownedCheckbox) {
      context.ownedCheckbox.checked = false;
      context.ownedCheckbox.disabled = false;
      context.ownedCheckbox.removeAttribute('aria-disabled');
      context.ownedCheckbox.removeAttribute('aria-describedby');
    }
    if (context.cameraLinkSelect) {
      context.cameraLinkSelect.disabled = false;
      context.cameraLinkSelect.value = '';
      context.cameraLinkSelect.removeAttribute('aria-disabled');
    }
  }
  activeGearItemEditTarget = null;
  if (targetEntry && targetEntry.isConnected) {
    var editBtn = targetEntry.querySelector('[data-gear-edit]');
    if (editBtn && typeof editBtn.focus === 'function') {
      try {
        editBtn.focus({
          preventScroll: true
        });
      } catch (error) {
        void error;
      }
    }
  }
}
function refreshGearItemEditProviderOptionsIfOpen() {
  var context = getGearItemEditContext();
  if (!context || !context.dialog || !context.providerSelect) {
    return;
  }
  var isDialogOpen = typeof context.dialog.open === 'boolean' ? context.dialog.open : !context.dialog.hasAttribute('hidden');
  if (!isDialogOpen) {
    return;
  }
  var targetEntry = activeGearItemEditTarget && activeGearItemEditTarget.element;
  var data = targetEntry ? getGearItemData(targetEntry) : {};
  updateGearItemEditProviderOptions(context, data);
}
function refreshGearItemEditCameraLinkOptionsIfOpen() {
  var context = getGearItemEditContext();
  if (!context || !context.dialog || !context.cameraLinkSelect) {
    return;
  }
  var isDialogOpen = typeof context.dialog.open === 'boolean' ? context.dialog.open : !context.dialog.hasAttribute('hidden');
  if (!isDialogOpen) {
    return;
  }
  var targetEntry = activeGearItemEditTarget && activeGearItemEditTarget.element;
  var data = targetEntry ? getGearItemData(targetEntry) : {};
  updateGearItemEditCameraLinkOptions(context, data);
  var isCameraItem = Boolean(context.isCameraItem || targetEntry && isPrimaryCameraItem(targetEntry));
  if (context.cameraLinkLabel || context.cameraLinkHelp) {
    var textsForDialog = getGearItemEditTexts();
    if (context.cameraLinkLabel) {
      var labelText = isCameraItem ? textsForDialog.cameraAssignmentLabel : textsForDialog.cameraLinkLabel;
      context.cameraLinkLabel.textContent = labelText;
      var labelHelp = isCameraItem ? textsForDialog.cameraAssignmentHelp : textsForDialog.cameraLinkHelp;
      if (labelHelp) {
        context.cameraLinkLabel.setAttribute('data-help', labelHelp);
      } else {
        context.cameraLinkLabel.removeAttribute('data-help');
      }
    }
    if (context.cameraLinkHelp) {
      var helpText = isCameraItem ? textsForDialog.cameraAssignmentHelp : textsForDialog.cameraLinkHelp;
      context.cameraLinkHelp.textContent = helpText || '';
      if (helpText) {
        context.cameraLinkHelp.hidden = false;
        context.cameraLinkHelp.removeAttribute('hidden');
      } else {
        context.cameraLinkHelp.hidden = true;
        context.cameraLinkHelp.setAttribute('hidden', '');
      }
    }
  }
  var nextValue = isCameraItem ? normalizeCameraLetter(data.cameraLink) || 'A' : normalizeCameraLetter(data.cameraLink);
  context.cameraLinkSelect.value = nextValue || '';
  context.cameraLinkSelect.disabled = false;
  context.cameraLinkSelect.removeAttribute('aria-disabled');
}
function refreshGearItemOwnedStateIfOpen() {
  var context = getGearItemEditContext();
  if (!context || !context.dialog || !context.ownedCheckbox) {
    return;
  }
  var isDialogOpen = typeof context.dialog.open === 'boolean' ? context.dialog.open : !context.dialog.hasAttribute('hidden');
  if (!isDialogOpen) {
    return;
  }
  var targetEntry = activeGearItemEditTarget && activeGearItemEditTarget.element;
  if (!targetEntry || !targetEntry.isConnected) {
    return;
  }
  var currentInputName = context.nameInput ? context.nameInput.value.trim() : '';
  var fallbackData = getGearItemData(targetEntry);
  var lookupName = currentInputName || fallbackData.name || '';
  var existingId = context.currentOwnedEntryId || targetEntry.getAttribute('data-gear-own-gear-id') || '';
  var records = loadOwnGearRecordsForEditor();
  var _lookupOwnGearRecord2 = lookupOwnGearRecord(records, existingId, lookupName),
    record = _lookupOwnGearRecord2.record;
  var hasName = Boolean(lookupName);
  context.ownedCheckbox.disabled = !hasName;
  if (context.ownedCheckbox.disabled) {
    context.ownedCheckbox.setAttribute('aria-disabled', 'true');
    context.ownedCheckbox.checked = false;
  } else {
    context.ownedCheckbox.removeAttribute('aria-disabled');
    context.ownedCheckbox.checked = Boolean(record);
  }
  if (record) {
    context.currentOwnedEntryId = record.id;
    targetEntry.setAttribute('data-gear-own-gear-id', record.id);
  } else {
    context.currentOwnedEntryId = '';
    targetEntry.removeAttribute('data-gear-own-gear-id');
  }
}
function bindGearItemEditDialog(context) {
  if (gearItemEditDialogBound) {
    return;
  }
  if (!context || !context.dialog) {
    return;
  }
  applyGearItemEditDialogTexts(context);
  if (context.form) {
    context.form.addEventListener('submit', handleGearItemEditFormSubmit);
  }
  if (context.cancelButton) {
    context.cancelButton.addEventListener('click', handleGearItemEditDialogCancel);
  }
  if (context.resetButton) {
    context.resetButton.addEventListener('click', handleGearItemEditResetClick);
  }
  context.dialog.addEventListener('cancel', handleGearItemEditDialogCancel);
  context.dialog.addEventListener('close', handleGearItemEditDialogClose);
  if ('onpointerdown' in context.dialog) {
    context.dialog.addEventListener('pointerdown', handleGearItemEditDialogBackdropPointerDown);
  } else {
    context.dialog.addEventListener('mousedown', handleGearItemEditDialogBackdropPointerDown);
    context.dialog.addEventListener('touchstart', handleGearItemEditDialogBackdropPointerDown);
  }
  var previewInputs = [context.quantityInput, context.nameInput];
  previewInputs.forEach(function (input) {
    if (!input) return;
    input.addEventListener('input', handleGearItemEditFieldInput);
    input.addEventListener('change', handleGearItemEditFieldInput);
  });
  if (context.rentalCheckbox) {
    context.rentalCheckbox.addEventListener('change', handleGearItemEditRentalCheckboxChange);
  }
  if (context.ownedCheckbox) {
    context.ownedCheckbox.addEventListener('change', handleGearItemEditOwnedChange);
  }
  if (context.extraCheckbox) {
    context.extraCheckbox.addEventListener('change', handleGearItemEditExtraChange);
  }
  [context.extraStartInput, context.extraEndInput].forEach(function (input) {
    if (!input) return;
    input.addEventListener('input', handleGearItemEditFieldInput);
    input.addEventListener('change', handleGearItemEditFieldInput);
  });
  if (context.cameraLinkSelect) {
    context.cameraLinkSelect.addEventListener('change', handleGearItemEditFieldInput);
  }
  if (context.deviceButton) {
    context.deviceButton.addEventListener('click', handleGearItemEditDeviceButtonClick);
  }
  gearItemEditDialogBound = true;
}
function openGearItemEditor(element) {
  var _data$attributes2;
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (!element) return false;
  var context = getGearItemEditContext();
  if (!context || !context.dialog) {
    return false;
  }
  bindGearItemEditDialog(context);
  enhanceGearItemElement(element);
  if (element.classList && element.classList.contains('gear-custom-item')) {
    var container = element.closest('.gear-custom-items[data-gear-custom-list]');
    if (container) {
      var categoryKey = container.getAttribute('data-gear-custom-list') || '';
      var categoryLabel = container.getAttribute('data-gear-custom-category') || '';
      attachCustomItemSuggestions(element, categoryKey, categoryLabel);
    }
  }
  var data = getGearItemData(element);
  activeGearItemEditTarget = {
    element: element,
    options: options || {}
  };
  context.resetDefaults = getGearItemResetDefaults(element);
  context.currentAttributes = typeof data.attributes === 'string' ? data.attributes : String((_data$attributes2 = data.attributes) !== null && _data$attributes2 !== void 0 ? _data$attributes2 : '');
  if (context.resetButton) {
    context.resetButton.disabled = false;
    context.resetButton.setAttribute('aria-disabled', 'false');
  }
  applyGearItemEditDialogTexts(context);
  var existingOwnedId = element.getAttribute('data-gear-own-gear-id') || '';
  var ownedRecord = findOwnedRecordForGearItem(element, {
    name: data.name || '',
    existingId: existingOwnedId || context.currentOwnedEntryId || ''
  });
  context.currentOwnedEntryId = ownedRecord ? ownedRecord.id : '';
  var hasNameForOwned = Boolean(data.name && data.name.trim());
  if (context.ownedCheckbox) {
    context.ownedCheckbox.checked = Boolean(ownedRecord) && hasNameForOwned;
    context.ownedCheckbox.disabled = !hasNameForOwned;
    if (context.ownedCheckbox.disabled) {
      context.ownedCheckbox.setAttribute('aria-disabled', 'true');
    } else {
      context.ownedCheckbox.removeAttribute('aria-disabled');
    }
  }
  if (context.ownedContainer) {
    context.ownedContainer.hidden = false;
  }
  if (ownedRecord && element) {
    element.setAttribute('data-gear-own-gear-id', ownedRecord.id);
  } else if (existingOwnedId) {
    element.removeAttribute('data-gear-own-gear-id');
  }
  var allowRentalToggle = options && options.allowRentalToggle === false ? false : true;
  if (context.quantityInput) {
    context.quantityInput.value = data.quantity || '';
  }
  if (context.nameInput) {
    context.nameInput.value = data.name || '';
    var suggestionsId = element.getAttribute('data-gear-suggestions') || '';
    if (suggestionsId) {
      context.nameInput.setAttribute('list', suggestionsId);
    } else {
      context.nameInput.removeAttribute('list');
    }
  }
  if (context.noteInput) {
    context.noteInput.value = data.note || '';
  }
  if (context.extraCheckbox) {
    var extraActive = Boolean(data.extra);
    context.extraCheckbox.checked = extraActive;
    updateGearItemEditExtraControls(context, extraActive);
  }
  if (context.extraStartInput) {
    context.extraStartInput.value = data.extraStart || '';
  }
  if (context.extraEndInput) {
    context.extraEndInput.value = data.extraEnd || '';
  }
  if (context.extraPeriodContainer && !context.extraCheckbox) {
    context.extraPeriodContainer.hidden = true;
    context.extraPeriodContainer.setAttribute('hidden', '');
  }
  if (context.providerSelect) {
    updateGearItemEditProviderOptions(context, data);
  }
  var cameraLetter = normalizeCameraLetter(data.cameraLink);
  var isCameraItem = isPrimaryCameraItem(element);
  context.isCameraItem = isCameraItem;
  if (context.cameraLinkContainer) {
    context.cameraLinkContainer.hidden = false;
    context.cameraLinkContainer.removeAttribute('hidden');
  }
  var textsForDialog = getGearItemEditTexts();
  if (context.cameraLinkLabel) {
    var labelText = isCameraItem ? textsForDialog.cameraAssignmentLabel : textsForDialog.cameraLinkLabel;
    context.cameraLinkLabel.textContent = labelText;
    var labelHelp = isCameraItem ? textsForDialog.cameraAssignmentHelp : textsForDialog.cameraLinkHelp;
    if (labelHelp) {
      context.cameraLinkLabel.setAttribute('data-help', labelHelp);
    } else {
      context.cameraLinkLabel.removeAttribute('data-help');
    }
  }
  if (context.cameraLinkHelp) {
    var helpText = isCameraItem ? textsForDialog.cameraAssignmentHelp : textsForDialog.cameraLinkHelp;
    context.cameraLinkHelp.textContent = helpText || '';
    if (helpText) {
      context.cameraLinkHelp.hidden = false;
      context.cameraLinkHelp.removeAttribute('hidden');
    } else {
      context.cameraLinkHelp.hidden = true;
      context.cameraLinkHelp.setAttribute('hidden', '');
    }
  }
  if (context.cameraLinkSelect) {
    updateGearItemEditCameraLinkOptions(context, data);
    var nextValue = isCameraItem ? cameraLetter || 'A' : cameraLetter || '';
    context.cameraLinkSelect.value = nextValue;
    context.cameraLinkSelect.disabled = false;
    context.cameraLinkSelect.removeAttribute('aria-disabled');
  }
  context.currentCameraLinkValue = cameraLetter || (isCameraItem ? 'A' : '');
  updateGearItemEditRentalControls(context, Boolean(data.rentalExcluded), allowRentalToggle);
  var fallbackPreview = function () {
    var textNode = element.querySelector('.gear-item-text');
    if (textNode && textNode.textContent) {
      return textNode.textContent.trim();
    }
    return data.name || '';
  }();
  var computedPreview = updateGearItemEditPreview(context);
  var previewText = computedPreview || fallbackPreview;
  if (context.preview && previewText) {
    context.preview.textContent = previewText;
    context.preview.hidden = false;
  }
  if (context.title) {
    context.title.textContent = previewText ? "".concat(textsForDialog.dialogTitle, " \u2014 ").concat(previewText) : textsForDialog.dialogTitle;
  }
  updateGearItemEditResetState(context);
  var deviceFallbackName = typeof data.name === 'string' ? data.name : '';
  var deviceCurrentName = context.nameInput ? context.nameInput.value : deviceFallbackName;
  updateGearItemEditDeviceInfo(context, {
    name: deviceCurrentName,
    fallbackName: deviceFallbackName
  });
  try {
    if (typeof context.dialog.showModal === 'function') {
      context.dialog.showModal();
    } else {
      context.dialog.hidden = false;
    }
  } catch (error) {
    console.warn('Failed to open gear item edit dialog', error);
    activeGearItemEditTarget = null;
    return false;
  }
  if (options.focusField === 'name' && context.nameInput) {
    try {
      context.nameInput.focus({
        preventScroll: true
      });
    } catch (error) {
      void error;
    }
  } else if (context.quantityInput) {
    try {
      context.quantityInput.focus({
        preventScroll: true
      });
    } catch (error) {
      void error;
    }
  }
  return true;
}
function buildCustomItemEntryElement(categoryKey, categoryLabel, data) {
  var doc = gearListOutput && gearListOutput.ownerDocument || (typeof document !== 'undefined' ? document : null);
  if (!doc) return null;
  var template = doc.createElement('template');
  var rawQuantity = data && Object.prototype.hasOwnProperty.call(data, 'quantity') ? data.quantity : '1';
  var rawName = data && Object.prototype.hasOwnProperty.call(data, 'name') ? data.name : '';
  var rawAttributes = data && Object.prototype.hasOwnProperty.call(data, 'attributes') ? data.attributes : '';
  var rawNote = data && Object.prototype.hasOwnProperty.call(data, 'note') ? data.note : '';
  var rawExtra = data && Object.prototype.hasOwnProperty.call(data, 'extra') ? data.extra : false;
  var rawExtraStart = data && Object.prototype.hasOwnProperty.call(data, 'extraStart') ? data.extraStart : '';
  var rawExtraEnd = data && Object.prototype.hasOwnProperty.call(data, 'extraEnd') ? data.extraEnd : '';
  var quantityValue = typeof rawQuantity === 'string' ? rawQuantity : String(rawQuantity !== null && rawQuantity !== void 0 ? rawQuantity : '');
  var nameValue = typeof rawName === 'string' ? rawName : String(rawName !== null && rawName !== void 0 ? rawName : '');
  var attributesValue = typeof rawAttributes === 'string' ? rawAttributes : String(rawAttributes !== null && rawAttributes !== void 0 ? rawAttributes : '');
  var noteValue = typeof rawNote === 'string' ? rawNote : String(rawNote !== null && rawNote !== void 0 ? rawNote : '');
  var extraValue = rawExtra === true || rawExtra === 'true' || rawExtra === 1 || rawExtra === '1';
  var extraStartValue = typeof rawExtraStart === 'string' ? rawExtraStart : String(rawExtraStart !== null && rawExtraStart !== void 0 ? rawExtraStart : '');
  var extraEndValue = typeof rawExtraEnd === 'string' ? rawExtraEnd : String(rawExtraEnd !== null && rawExtraEnd !== void 0 ? rawExtraEnd : '');
  var removeLabel = resolveGearListCustomText('gearListRemoveCustomItem', 'Remove');
  var removeAria = resolveGearListCustomText('gearListRemoveCustomItemFromCategory', 'Remove custom item from {category}', {
    category: categoryLabel
  });
  var editLabel = resolveGearListCustomText('gearListEditCustomItem', 'Edit custom item');
  var minusIcon = typeof iconMarkup === 'function' && (typeof ICON_GLYPHS === "undefined" ? "undefined" : _typeof(ICON_GLYPHS)) === 'object' ? iconMarkup(ICON_GLYPHS.minus, {
    className: 'btn-icon'
  }) : '';
  var editIcon = typeof iconMarkup === 'function' && (typeof ICON_GLYPHS === "undefined" ? "undefined" : _typeof(ICON_GLYPHS)) === 'object' ? iconMarkup(ICON_GLYPHS.sliders, {
    className: 'btn-icon'
  }) : '';
  var rentalTexts = getGearListRentalToggleTexts();
  var noteLabel = rentalTexts.noteLabel && rentalTexts.noteLabel.trim() ? rentalTexts.noteLabel : '';
  template.innerHTML = "\n    <div class=\"gear-custom-item\" data-gear-custom-entry=\"".concat(escapeHtml(categoryKey), "\">\n      <div class=\"gear-custom-item-summary\">\n        <span class=\"gear-custom-item-preview\" aria-hidden=\"true\"></span>\n        <span class=\"gear-item-note\" hidden></span>\n      </div>\n      <div class=\"gear-custom-item-actions\">\n        <button\n          type=\"button\"\n          class=\"gear-item-edit-btn\"\n          data-gear-edit\n          aria-label=\"").concat(escapeHtml(editLabel), "\"\n        >\n          ").concat(editIcon, "\n        </button>\n        <button\n          type=\"button\"\n          class=\"gear-custom-remove-btn\"\n          data-gear-custom-remove=\"").concat(escapeHtml(categoryKey), "\"\n          data-gear-custom-category=\"").concat(escapeHtml(categoryLabel), "\"\n          aria-label=\"").concat(escapeHtml(removeAria), "\"\n        >\n          ").concat(minusIcon, "<span>").concat(escapeHtml(removeLabel), "</span>\n        </button>\n      </div>\n    </div>\n  ").trim();
  var element = template.content.firstElementChild;
  if (!element) return null;
  if (noteLabel) {
    element.setAttribute('data-rental-note', noteLabel);
  }
  element.setAttribute('data-gear-quantity', quantityValue);
  element.setAttribute('data-gear-label', nameValue);
  if (attributesValue) {
    element.setAttribute('data-gear-attributes', attributesValue);
  } else {
    element.removeAttribute('data-gear-attributes');
  }
  if (noteValue) {
    element.setAttribute('data-gear-note', noteValue);
  } else {
    element.removeAttribute('data-gear-note');
  }
  applyGearItemData(element, {
    quantity: quantityValue,
    name: nameValue,
    attributes: attributesValue,
    note: noteValue,
    rentalExcluded: data && (data.rentalExcluded === true || data.rentalExcluded === 'true'),
    providedBy: data && (data.providedBy || data.provider) ? data.providedBy || data.provider : '',
    providerLabel: data && data.providerLabel ? data.providerLabel : '',
    extra: extraValue,
    extraStart: extraStartValue,
    extraEnd: extraEndValue
  });
  return element;
}
function persistCustomItemsChange() {
  markProjectFormDataDirty();
  if (typeof saveCurrentGearList === 'function') {
    saveCurrentGearList();
  }
  if (typeof saveCurrentSession === 'function') {
    saveCurrentSession();
  }
  if (typeof checkSetupChanged === 'function') {
    checkSetupChanged();
  }
}
function addCustomItemEntry(categoryKey, categoryLabel) {
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var container = getCustomItemsContainer(categoryKey);
  if (!container) return null;
  var entry = buildCustomItemEntryElement(categoryKey, categoryLabel, data);
  if (!entry) return null;
  container.appendChild(entry);
  attachCustomItemSuggestions(entry, categoryKey, categoryLabel);
  var extraValue = data && (data.extra === true || data.extra === 'true' || data.extra === 1 || data.extra === '1');
  var extraStartValue = data && Object.prototype.hasOwnProperty.call(data, 'extraStart') ? data.extraStart : '';
  var extraEndValue = data && Object.prototype.hasOwnProperty.call(data, 'extraEnd') ? data.extraEnd : '';
  applyGearItemData(entry, {
    quantity: data && Object.prototype.hasOwnProperty.call(data, 'quantity') ? data.quantity : '',
    name: data && Object.prototype.hasOwnProperty.call(data, 'name') ? data.name : '',
    attributes: data && Object.prototype.hasOwnProperty.call(data, 'attributes') ? data.attributes : '',
    note: data && Object.prototype.hasOwnProperty.call(data, 'note') ? data.note : '',
    rentalExcluded: data && (data.rentalExcluded === true || data.rentalExcluded === 'true'),
    providedBy: data && (data.providedBy || data.provider) ? data.providedBy || data.provider : '',
    providerLabel: data && data.providerLabel ? data.providerLabel : '',
    extra: extraValue,
    extraStart: extraStartValue,
    extraEnd: extraEndValue,
    cameraLink: data && Object.prototype.hasOwnProperty.call(data, 'cameraLink') ? data.cameraLink : '',
    cameraLinkLabel: data && Object.prototype.hasOwnProperty.call(data, 'cameraLinkLabel') ? data.cameraLinkLabel : ''
  }, {
    skipPreview: false
  });
  var wantsExcluded = Boolean(data && (data.rentalExcluded === true || data.rentalExcluded === 'true'));
  setRentalExclusionState(entry, wantsExcluded);
  if (!options.skipFocus) {
    var editBtn = entry.querySelector('[data-gear-edit]');
    if (editBtn) {
      editBtn.focus();
    }
  }
  if (!options.skipEditDialog && typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(function () {
      try {
        openGearItemEditor(entry, {
          focusField: 'name',
          allowRentalToggle: true
        });
      } catch (error) {
        console.warn('Failed to open gear item editor for new custom item', error);
      }
    });
  }
  if (!options.skipPersist) {
    persistCustomItemsChange();
  }
  return entry;
}
function addExtraGearItem() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var container = ensureExtraGearCategory();
  if (!container) return null;
  var textsForExtra = getExtraGearUiTexts();
  var categoryLabel = container.getAttribute('data-gear-custom-category') || textsForExtra.categoryLabel || '';
  var entry = addCustomItemEntry(EXTRA_GEAR_CATEGORY_KEY, categoryLabel, {
    quantity: options && Object.prototype.hasOwnProperty.call(options, 'quantity') ? options.quantity : '1',
    name: options && Object.prototype.hasOwnProperty.call(options, 'name') ? options.name : '',
    attributes: options && Object.prototype.hasOwnProperty.call(options, 'attributes') ? options.attributes : '',
    note: options && Object.prototype.hasOwnProperty.call(options, 'note') ? options.note : '',
    extra: true,
    extraStart: options && Object.prototype.hasOwnProperty.call(options, 'extraStart') ? options.extraStart : '',
    extraEnd: options && Object.prototype.hasOwnProperty.call(options, 'extraEnd') ? options.extraEnd : ''
  }, {
    skipFocus: Boolean(options && options.skipFocus),
    skipPersist: Boolean(options && options.skipPersist),
    skipEditDialog: Boolean(options && options.skipEditDialog)
  });
  return entry;
}
function handleAddCustomItemRequest(button) {
  if (!button) return;
  var categoryKey = button.getAttribute('data-gear-custom-add') || '';
  if (!categoryKey) return;
  var categoryLabel = button.getAttribute('data-gear-custom-category') || '';
  if (button.hasAttribute('data-extra-gear') || categoryKey === EXTRA_GEAR_CATEGORY_KEY) {
    addExtraGearItem({
      skipFocus: false,
      skipPersist: false,
      skipEditDialog: false
    });
    return;
  }
  addCustomItemEntry(categoryKey, categoryLabel, {
    quantity: '1',
    name: ''
  });
}
function handleRemoveCustomItemRequest(button) {
  if (!button) return;
  var entry = button.closest('.gear-custom-item');
  if (!entry) return;
  var categoryKey = button.getAttribute('data-gear-custom-remove') || entry.getAttribute('data-gear-custom-entry') || '';
  entry.remove();
  persistCustomItemsChange();
  if (categoryKey) {
    var _gearListOutput;
    var addBtn = (_gearListOutput = gearListOutput) === null || _gearListOutput === void 0 ? void 0 : _gearListOutput.querySelector("[data-gear-custom-add=\"".concat(categoryKey, "\"]"));
    if (addBtn) {
      addBtn.focus();
    }
  }
}
function readCustomItemsState() {
  if (!gearListOutput) return {};
  var state = {};
  var containers = gearListOutput.querySelectorAll('.gear-custom-items[data-gear-custom-list]');
  containers.forEach(function (container) {
    var key = container.getAttribute('data-gear-custom-list');
    if (!key) return;
    var entries = [];
    container.querySelectorAll('.gear-custom-item').forEach(function (item) {
      var quantity = String(item.getAttribute('data-gear-quantity') || '');
      var name = String(item.getAttribute('data-gear-label') || item.getAttribute('data-gear-name') || '');
      var attributes = String(item.getAttribute('data-gear-attributes') || '');
      var note = String(item.getAttribute('data-gear-note') || '');
      var rentalExcluded = item.getAttribute('data-rental-excluded') === 'true';
      var providedBy = String(item.getAttribute('data-gear-provider') || '');
      var providerLabel = String(item.getAttribute('data-gear-provider-label') || '');
      var extra = item.getAttribute('data-gear-extra') === 'true';
      var extraStart = String(item.getAttribute('data-gear-extra-start') || '');
      var extraEnd = String(item.getAttribute('data-gear-extra-end') || '');
      var cameraLink = String(item.getAttribute('data-gear-camera-link') || '');
      var cameraLinkLabel = String(item.getAttribute('data-gear-camera-link-label') || '');
      entries.push({
        quantity: quantity,
        name: name,
        attributes: attributes,
        note: note,
        rentalExcluded: rentalExcluded,
        providedBy: providedBy,
        providerLabel: providerLabel,
        extra: extra,
        extraStart: extraStart,
        extraEnd: extraEnd,
        cameraLink: cameraLink,
        cameraLinkLabel: cameraLinkLabel
      });
    });
    if (entries.length) {
      state[key] = entries;
    }
  });
  return state;
}
function applyCustomItemsState(state) {
  if (!gearListOutput) return;
  var normalizedState = state && _typeof(state) === 'object' ? state : {};
  var activeKeys = new Set(Object.keys(normalizedState));
  var containers = gearListOutput.querySelectorAll('.gear-custom-items[data-gear-custom-list]');
  containers.forEach(function (container) {
    var key = container.getAttribute('data-gear-custom-list');
    if (!key) return;
    if (!activeKeys.has(key)) {
      container.querySelectorAll('.gear-custom-item').forEach(function (item) {
        return item.remove();
      });
    }
  });
  Object.entries(normalizedState).forEach(function (_ref24) {
    var _ref25 = _slicedToArray(_ref24, 2),
      key = _ref25[0],
      entries = _ref25[1];
    var container = getCustomItemsContainer(key);
    if (!container) return;
    container.querySelectorAll('.gear-custom-item').forEach(function (item) {
      return item.remove();
    });
    var categoryLabel = container.getAttribute('data-gear-custom-category') || '';
    if (Array.isArray(entries)) {
      entries.forEach(function (entry) {
        if (entry && _typeof(entry) === 'object') {
          addCustomItemEntry(key, categoryLabel, entry, {
            skipFocus: true,
            skipPersist: true,
            skipEditDialog: true
          });
        } else {
          addCustomItemEntry(key, categoryLabel, {
            quantity: '',
            name: ''
          }, {
            skipFocus: true,
            skipPersist: true,
            skipEditDialog: true
          });
        }
      });
    }
  });
}
function gearListGenerateHtmlImpl() {
  var _devices$accessories2, _texts$currentLang3, _texts$en6, _texts$currentLang4, _texts$en7, _texts$currentLang5, _texts$en8;
  var info = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var getText = function getText(sel) {
    return sel && sel.options && sel.selectedIndex >= 0 ? sel.options[sel.selectedIndex].text.trim() : '';
  };
  var selectedNames = {
    camera: cameraSelect && cameraSelect.value && cameraSelect.value !== 'None' ? getText(cameraSelect) : '',
    monitor: monitorSelect && monitorSelect.value && monitorSelect.value !== 'None' ? getText(monitorSelect) : '',
    video: videoSelect && videoSelect.value && videoSelect.value !== 'None' ? getText(videoSelect) : '',
    motors: motorSelects.map(function (sel) {
      return sel && sel.value && sel.value !== 'None' ? getText(sel) : '';
    }).filter(Boolean),
    controllers: controllerSelects.map(function (sel) {
      return sel && sel.value && sel.value !== 'None' ? getText(sel) : '';
    }).filter(Boolean),
    distance: distanceSelect && distanceSelect.value && distanceSelect.value !== 'None' ? getText(distanceSelect) : '',
    cage: cageSelect && cageSelect.value && cageSelect.value !== 'None' ? getText(cageSelect) : '',
    battery: batterySelect && batterySelect.value && batterySelect.value !== 'None' ? getText(batterySelect) : ''
  };
  var normalizedCameraLinkLabel = typeof selectedNames.camera === 'string' ? selectedNames.camera.trim() : '';
  var hasCameraForLinking = Boolean(normalizedCameraLinkLabel);
  var cameraLinkTargets = new Set();
  var registerCameraLinkTarget = function registerCameraLinkTarget(name) {
    if (!hasCameraForLinking) return;
    if (typeof name !== 'string') return;
    var normalized = normalizeGearNameForComparison(name);
    if (normalized) {
      cameraLinkTargets.add(normalized);
    }
  };
  var markEntryCameraLink = function markEntryCameraLink(entry) {
    if (!entry || !hasCameraForLinking) return;
    entry.cameraLink = true;
    if (normalizedCameraLinkLabel && !entry.cameraLinkLabel) {
      entry.cameraLinkLabel = normalizedCameraLinkLabel;
    }
  };
  var applyCameraLinkFromTargets = function applyCameraLinkFromTargets(_ref26) {
    var base = _ref26.base,
      entry = _ref26.entry;
    if (!hasCameraForLinking) return;
    try {
      var normalizedBase = normalizeGearNameForComparison(base);
      if (normalizedBase && cameraLinkTargets.has(normalizedBase)) {
        markEntryCameraLink(entry);
      }
    } catch (error) {
      void error;
    }
  };
  var buildCameraLinkAttributes = function buildCameraLinkAttributes(labelOverride) {
    if (!hasCameraForLinking) return '';
    var resolvedLabel = typeof labelOverride === 'string' && labelOverride.trim() ? labelOverride.trim() : normalizedCameraLinkLabel;
    var attrParts = ['data-gear-camera-link="camera"'];
    if (resolvedLabel) {
      attrParts.push("data-gear-camera-link-label=\"".concat(escapeHtml(resolvedLabel), "\""));
    }
    return attrParts.join(' ');
  };
  var hasMotor = selectedNames.motors.length > 0;
  var videoDistPrefs = info.videoDistribution ? info.videoDistribution.split(',').map(function (s) {
    return s.trim();
  }).filter(Boolean) : [];
  var handheldPrefs = videoDistPrefs.map(function (p) {
    var m = p.match(/^(Director|Gaffer|DoP) Monitor (?:(\d+)" )?handheld$/);
    return m ? {
      role: m[1],
      size: m[2] ? parseFloat(m[2]) : undefined
    } : null;
  }).filter(Boolean);
  var largeMonitorPrefs = videoDistPrefs.map(function (p) {
    var m = p.match(/^(Director|Combo|DoP) Monitor 15-21"$/);
    return m ? {
      role: m[1]
    } : null;
  }).filter(Boolean);
  if (["Arri Alexa Mini", "Arri Amira"].includes(selectedNames.camera)) {
    selectedNames.viewfinder = "ARRI K2.75004.0 MVF-1 Viewfinder";
  } else {
    selectedNames.viewfinder = "";
  }
  var _collectAccessories = collectAccessories({
      hasMotor: hasMotor,
      videoDistPrefs: videoDistPrefs
    }),
    cameraSupportAcc = _collectAccessories.cameraSupport,
    chargersAcc = _collectAccessories.chargers,
    fizCableAcc = _collectAccessories.fizCables,
    miscAcc = _collectAccessories.misc,
    monitoringSupportAcc = _collectAccessories.monitoringSupport,
    riggingAcc = _collectAccessories.rigging;
  var cagesDb = ((_devices$accessories2 = devices.accessories) === null || _devices$accessories2 === void 0 ? void 0 : _devices$accessories2.cages) || {};
  var compatibleCages = [];
  if (cameraSelect && cameraSelect.value && cameraSelect.value !== 'None') {
    for (var _i13 = 0, _Object$entries8 = Object.entries(cagesDb); _i13 < _Object$entries8.length; _i13++) {
      var _Object$entries8$_i = _slicedToArray(_Object$entries8[_i13], 2),
        name = _Object$entries8$_i[0],
        cage = _Object$entries8$_i[1];
      if (!cage.compatible || cage.compatible.includes(cameraSelect.value)) {
        compatibleCages.push(name);
      }
    }
  }
  var supportAccNoCages = cameraSupportAcc.filter(function (item) {
    return !compatibleCages.includes(item);
  });
  if (selectedNames.viewfinder) {
    var normalizedSupport = new Set(supportAccNoCages.map(function (item) {
      return normalizeGearNameForComparison(item);
    }));
    var normalizedViewfinder = normalizeGearNameForComparison(selectedNames.viewfinder);
    if (!normalizedSupport.has(normalizedViewfinder)) {
      supportAccNoCages.push(selectedNames.viewfinder);
    }
  }
  var scenarios = info.requiredScenarios ? info.requiredScenarios.split(',').map(function (s) {
    return s.trim();
  }).filter(Boolean) : [];
  var hasSeededScenarioRules = hasSeededAutoGearDefaults();
  var allowLegacyScenarioGear = autoGearRules.length === 0 && !hasSeededScenarioRules;
  var isScenarioActive = function isScenarioActive(scenario) {
    return allowLegacyScenarioGear && scenarios.includes(scenario);
  };
  var isAnyScenarioActive = function isAnyScenarioActive(list) {
    return allowLegacyScenarioGear && list.some(function (value) {
      return scenarios.includes(value);
    });
  };
  var hasGimbal = isScenarioActive('Gimbal');
  if (isAnyScenarioActive(['Trinity', 'Steadicam'])) {
    for (var i = 0; i < 2; i++) {
      riggingAcc.push('D-Tap Splitter');
    }
    riggingAcc.push('D-Tap Extension 50 cm (Steadicam/Trinity)');
    riggingAcc.push('D-Tap Extension 50 cm (Spare)');
  }
  var handleSelections = info.cameraHandle ? info.cameraHandle.split(',').map(function (r) {
    return r.trim();
  }).filter(Boolean) : [];
  var viewfinderExtSelections = info.viewfinderExtension ? info.viewfinderExtension.split(',').map(function (r) {
    return r.trim();
  }).filter(Boolean) : [];
  var monitoringSettings = [].concat(_toConsumableArray(info.viewfinderSettings ? info.viewfinderSettings.split(',').map(function (s) {
    return s.trim();
  }) : []), _toConsumableArray(info.frameGuides ? info.frameGuides.split(',').map(function (s) {
    return s.trim();
  }) : []), _toConsumableArray(info.aspectMaskOpacity ? info.aspectMaskOpacity.split(',').map(function (s) {
    return s.trim();
  }) : []), _toConsumableArray(info.monitoringSettings ? info.monitoringSettings.split(',').map(function (s) {
    return s.trim();
  }) : [])).filter(Boolean);
  var selectedLensNames = normalizeLensSelectionNames(info.lenses);
  var maxLensFront = selectedLensNames.reduce(function (max, name) {
    var lens = devices.lenses && devices.lenses[name];
    return Math.max(max, lens && lens.frontDiameterMm || 0);
  }, 0);
  var parsedFilters = parseFilterTokens(info.filter);
  var filterTypes = parsedFilters.map(function (f) {
    return f.type;
  });
  var needsSwingAway = filterTypes.some(function (t) {
    return t === 'ND Grad HE' || t === 'ND Grad SE';
  });
  var filterEntries = buildFilterGearEntries(parsedFilters);
  var filterSelections = collectFilterAccessories(parsedFilters);
  if (filterEntries.length && filterSelections.length) {
    var filterNames = new Set(filterEntries.map(function (entry) {
      return normalizeGearNameForComparison(entry.gearName);
    }));
    filterSelections = filterSelections.filter(function (item) {
      return !filterNames.has(normalizeGearNameForComparison(item));
    });
  }
  var filterSelectHtml = buildFilterSelectHtml(parsedFilters, filterEntries);
  if (info.mattebox && !needsSwingAway) {
    var matteboxSelection = info.mattebox.toLowerCase();
    if (matteboxSelection.includes('clamp')) {
      var diameters = _toConsumableArray(new Set(selectedLensNames.map(function (n) {
        return devices.lenses && devices.lenses[n] && devices.lenses[n].frontDiameterMm;
      }).filter(Boolean)));
      diameters.forEach(function (d) {
        return filterSelections.push("ARRI LMB 4x5 Clamp Adapter ".concat(d, "mm"));
      });
    }
  }
  viewfinderExtSelections.forEach(function (vf) {
    return supportAccNoCages.push(vf);
  });
  if (isAnyScenarioActive(['Rain Machine', 'Extreme rain'])) {
    filterSelections.push('Schulz Sprayoff Micro');
    filterSelections.push('Spare Disc (Schulz Sprayoff Micro)');
    riggingAcc.push('Fischer RS to D-Tap cable 0,5m');
    riggingAcc.push('Fischer RS to D-Tap cable 0,5m');
  }
  var gimbalSelectionsFinal = [];
  var selectedGimbal = '';
  if (hasGimbal) {
    var gimbalSelections = info.gimbal ? info.gimbal.split(',').map(function (s) {
      return s.trim();
    }).filter(Boolean) : [];
    var bigLens = maxLensFront > 95;
    if (gimbalSelections.length) {
      gimbalSelectionsFinal = gimbalSelections.map(function (g) {
        return /Ronin RS4 Pro/i.test(g) && bigLens ? 'DJI Ronin 2' : g;
      });
      if (gimbalSelectionsFinal.length === 1) selectedGimbal = gimbalSelectionsFinal[0];
    } else {
      var _cam = devices && devices.cameras && devices.cameras[selectedNames.camera];
      var weight = _cam && _cam.weight_g;
      var isSmall = weight != null ? weight < 2000 : /(FX3|FX6|R5)/i.test(selectedNames.camera);
      selectedGimbal = bigLens ? 'DJI Ronin 2' : isSmall ? 'DJI Ronin RS4 Pro Combo' : 'DJI Ronin 2';
      gimbalSelectionsFinal = [selectedGimbal];
    }
    if (/Ronin RS4 Pro/i.test(selectedGimbal) && maxLensFront <= 95) {
      filterSelections.push('Tilta Mirage VND Kit');
      filterSelections.push('Tilta 95 mm Polarizer Filter für Tilta Mirage');
      filterSelections.push('Vaxis 95 mm IRND Filter 0.3 + 0.6 + 0.9 + 1.2 Filter');
      filterSelections.push('Vaxis 95mm Black Mist 1/4 + 1/8 Filter');
    } else {
      filterSelections.push('Arri KK.0038066 Flexible Sunshade Side Flag Holders Set');
    }
  }
  var receiverLabels = [];
  handheldPrefs.forEach(function (p) {
    return receiverLabels.push("".concat(p.role, " handheld"));
  });
  largeMonitorPrefs.forEach(function (p) {
    return receiverLabels.push("".concat(p.role, " 15-21\""));
  });
  if (hasMotor) receiverLabels.push('Focus');
  var receiverCount = receiverLabels.length;
  if (selectedNames.video) {
    monitoringSupportAcc.push('Antenna 5,8GHz 5dBi Long (spare)');
    var rxName = selectedNames.video.replace(/ TX\b/, ' RX');
    if (devices && devices.wirelessReceivers && devices.wirelessReceivers[rxName]) {
      var receivers = receiverCount || 1;
      for (var _i14 = 0; _i14 < receivers; _i14++) {
        monitoringSupportAcc.push('Antenna 5,8GHz 5dBi Long (spare)');
      }
    }
  }
  var addMonitorCables = function addMonitorCables(label) {
    monitoringSupportAcc.push("D-Tap to Lemo-2-pin Cable 0,3m (".concat(label, ")"), "D-Tap to Lemo-2-pin Cable 0,3m (".concat(label, ")"), "Ultraslim BNC Cable 0.3 m (".concat(label, ")"), "Ultraslim BNC Cable 0.3 m (".concat(label, ")"));
  };
  handheldPrefs.forEach(function (p) {
    return addMonitorCables("".concat(p.role, " handheld"));
  });
  var addLargeMonitorCables = function addLargeMonitorCables(label) {
    monitoringSupportAcc.push("D-Tap to Lemo-2-pin Cable 0,5m (".concat(label, ")"), "D-Tap to Lemo-2-pin Cable 0,5m (".concat(label, ")"), "Ultraslim BNC Cable 0.5 m (".concat(label, ")"), "Ultraslim BNC Cable 0.5 m (".concat(label, ")"));
  };
  largeMonitorPrefs.forEach(function (p) {
    return addLargeMonitorCables("".concat(p.role, " 15-21\""));
  });
  var handleName = 'SHAPE Telescopic Handle ARRI Rosette Kit 12"';
  var addHandle = function addHandle() {
    if (!supportAccNoCages.includes(handleName)) {
      supportAccNoCages.push(handleName);
    }
  };
  if (isScenarioActive('Handheld') && isScenarioActive('Easyrig')) {
    addHandle();
  }
  if (handleSelections.includes('Hand Grips')) {
    addHandle();
  }
  if (handleSelections.includes('Handle Extension')) {
    supportAccNoCages.push('ARRI K2.0019797 HEX-3');
  }
  if (handleSelections.includes('L-Handle')) {
    supportAccNoCages.push('ARRI KK.0037820 Handle Extension Set');
  }
  var projectInfo = _objectSpread({}, info);
  var projectFormTexts = ((_texts$currentLang3 = texts[currentLang]) === null || _texts$currentLang3 === void 0 ? void 0 : _texts$currentLang3.projectForm) || ((_texts$en6 = texts.en) === null || _texts$en6 === void 0 ? void 0 : _texts$en6.projectForm) || {};
  var projectLabels = ((_texts$currentLang4 = texts[currentLang]) === null || _texts$currentLang4 === void 0 ? void 0 : _texts$currentLang4.projectFields) || ((_texts$en7 = texts.en) === null || _texts$en7 === void 0 ? void 0 : _texts$en7.projectFields) || {};
  var hasCombinedProductionCompany = applyCombinedProductionCompanyDisplay(projectInfo, info, projectLabels);
  if (!hasCombinedProductionCompany) {
    var hasStructuredAddress = PRODUCTION_COMPANY_FIELD_ORDER.some(function (key) {
      var value = projectInfo[key];
      if (typeof value === 'string') {
        return value.trim().length > 0;
      }
      return value !== null && value !== undefined;
    });
    if (hasStructuredAddress) {
      hasCombinedProductionCompany = applyCombinedProductionCompanyDisplay(projectInfo, projectInfo, projectLabels);
    }
  }
  var storageFallbackLabel = projectFormTexts.storageSummaryFallback || projectFormTexts.storageTypeLabel || 'Media';
  var crewRoleLabels = ((_texts$currentLang5 = texts[currentLang]) === null || _texts$currentLang5 === void 0 ? void 0 : _texts$currentLang5.crewRoles) || ((_texts$en8 = texts.en) === null || _texts$en8 === void 0 ? void 0 : _texts$en8.crewRoles) || {};
  if (Array.isArray(info.people)) {
    var crewEntriesHtml = [];
    var crewEntriesText = [];
    info.people.filter(function (p) {
      return p.role && p.name;
    }).forEach(function (p) {
      var roleLabel = crewRoleLabels[p.role] || p.role || '';
      var safeRole = escapeHtml(roleLabel);
      var nameValue = typeof p.name === 'string' ? p.name.trim() : p.name ? String(p.name).trim() : '';
      if (!nameValue) {
        return;
      }
      var safeName = escapeHtml(nameValue);
      var detailLinks = [];
      var detailText = [];
      var phoneValue = typeof p.phone === 'string' ? p.phone.trim() : p.phone ? String(p.phone).trim() : '';
      if (phoneValue) {
        var phoneHref = formatPhoneHref(phoneValue);
        var safePhone = escapeHtml(phoneValue);
        detailText.push(phoneValue);
        if (phoneHref) {
          detailLinks.push("<a href=\"tel:".concat(phoneHref, "\" class=\"req-contact-link\">").concat(safePhone, "</a>"));
        } else {
          detailLinks.push(safePhone);
        }
      }
      var emailValue = typeof p.email === 'string' ? p.email.trim() : p.email ? String(p.email).trim() : '';
      if (emailValue) {
        var emailHref = formatEmailHref(emailValue);
        var safeEmail = escapeHtml(emailValue);
        detailText.push(emailValue);
        if (emailHref) {
          detailLinks.push("<a href=\"mailto:".concat(emailHref, "\" class=\"req-contact-link\">").concat(safeEmail, "</a>"));
        } else {
          detailLinks.push(safeEmail);
        }
      }
      var linkDetails = detailLinks.length ? " (".concat(detailLinks.join(', '), ")") : '';
      var plainDetails = detailText.length ? " (".concat(detailText.join(', '), ")") : '';
      var rolePrefixHtml = roleLabel ? "".concat(safeRole, ": ") : '';
      var rolePrefixText = roleLabel ? "".concat(roleLabel, ": ") : '';
      crewEntriesHtml.push("<span class=\"crew-entry\">".concat(rolePrefixHtml).concat(safeName).concat(linkDetails, "</span>"));
      crewEntriesText.push("".concat(rolePrefixText).concat(nameValue).concat(plainDetails));
    });
    if (crewEntriesHtml.length) {
      projectInfo.crew = {
        __html: crewEntriesHtml.join('<br>'),
        text: crewEntriesText.join('\n')
      };
    }
  }
  delete projectInfo.people;
  if (Array.isArray(info.storageRequirements)) {
    var storageEntriesHtml = [];
    var storageEntriesText = [];
    info.storageRequirements.forEach(function (entry) {
      if (!entry || _typeof(entry) !== 'object') return;
      var quantity = Number.isFinite(entry.quantity) && entry.quantity > 0 ? entry.quantity : null;
      var type = typeof entry.type === 'string' ? entry.type.trim() : '';
      var variant = typeof entry.variant === 'string' ? entry.variant.trim() : '';
      var notes = typeof entry.notes === 'string' ? entry.notes.trim() : '';
      if (!quantity && !type && !variant && !notes) return;
      var label = variant || type || '';
      if (variant && type && !variant.toLowerCase().includes(type.toLowerCase())) {
        label = "".concat(variant, " (").concat(type, ")");
      } else if (!label && type) {
        label = type;
      }
      if (notes) {
        label = label ? "".concat(label, " \u2013 ").concat(notes) : notes;
      }
      var display = label || storageFallbackLabel;
      var prefix = quantity ? "".concat(quantity, "x ") : '';
      var text = "".concat(prefix).concat(display).trim();
      storageEntriesText.push(text);
      storageEntriesHtml.push("<span class=\"storage-entry\">".concat(escapeHtml(text), "</span>"));
    });
    if (storageEntriesHtml.length) {
      projectInfo.storageRequirements = {
        __html: storageEntriesHtml.join('<br>'),
        text: storageEntriesText.join('\n')
      };
    }
  }
  if (Array.isArray(info.prepDays)) {
    projectInfo.prepDays = info.prepDays.join('\n');
  }
  if (Array.isArray(info.shootingDays)) {
    projectInfo.shootingDays = info.shootingDays.join('\n');
  }
  if (Array.isArray(info.returnDays)) {
    projectInfo.returnDays = info.returnDays.join('\n');
  }
  if (monitoringSettings.length) {
    projectInfo.monitoringSupport = monitoringSettings.join(', ');
  }
  delete projectInfo.monitoringSettings;
  delete projectInfo.viewfinderSettings;
  delete projectInfo.frameGuides;
  delete projectInfo.aspectMaskOpacity;
  var projectTitleSource = getCurrentProjectName() || info.projectName || '';
  var projectTitle = escapeHtml(projectTitleSource);
  var excludedFields = new Set(['cameraHandle', 'viewfinderExtension', 'mattebox', 'videoDistribution', 'monitoringConfiguration', 'focusMonitor', 'tripodHeadBrand', 'tripodBowl', 'tripodTypes', 'tripodSpreader', 'sliderBowl', 'easyrig', 'lenses', 'viewfinderSettings', 'frameGuides', 'aspectMaskOpacity', 'filter', 'viewfinderEyeLeatherColor', 'directorMonitor', 'dopMonitor', 'gafferMonitor', 'directorMonitor15', 'comboMonitor15', 'dopMonitor15', 'proGaffColor1', 'proGaffWidth1', 'proGaffColor2', 'proGaffWidth2', 'storageRequirements', 'monitorBatteries', 'lensSelections']);
  var infoEntries = Object.entries(projectInfo).filter(function (_ref27) {
    var _ref28 = _slicedToArray(_ref27, 2),
      k = _ref28[0],
      v = _ref28[1];
    return v && k !== 'projectName' && !excludedFields.has(k) && !k.endsWith('Manual') && !(hasCombinedProductionCompany && PRODUCTION_COMPANY_FIELD_ORDER.includes(k));
  });
  var boxesHtml = infoEntries.length ? '<div class="requirements-grid">' + infoEntries.map(function (_ref29) {
    var _ref30 = _slicedToArray(_ref29, 2),
      k = _ref30[0],
      v = _ref30[1];
    var value = formatRequirementValue(v);
    var label = projectLabels[k] || k;
    var iconHtml = iconMarkup(projectFieldIcons[k], {
      className: 'req-icon',
      size: 'var(--req-icon-size)'
    });
    var extraAttrs = [];
    if (k === 'productionCompany' && hasCombinedProductionCompany) {
      extraAttrs.push('data-has-address="true"');
    }
    var attrHtml = extraAttrs.length ? " ".concat(extraAttrs.join(' ')) : '';
    return "<div class=\"requirement-box\" data-field=\"".concat(k, "\"").concat(attrHtml, ">" + iconHtml + "<span class=\"req-label\">").concat(escapeHtml(label), "</span><span class=\"req-value\">").concat(value, "</span></div>");
  }).join('') + '</div>' : '';
  var requirementsHeading = projectFormTexts.heading || 'Project Requirements';
  var infoHtml = infoEntries.length ? "<h3>".concat(escapeHtml(requirementsHeading), "</h3>").concat(boxesHtml) : '';
  var rentalToggleTexts = getGearListRentalToggleTexts({
    rentalHouse: info && info.rentalHouse
  });
  var rentalNoteAttr = rentalToggleTexts.noteLabel && rentalToggleTexts.noteLabel.trim() ? " data-rental-note=\"".concat(escapeHtml(rentalToggleTexts.noteLabel), "\"") : '';
  var formatItems = function formatItems(arr) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var entries = {};
    arr.filter(Boolean).map(addArriKNumber).forEach(function (rawItem) {
      var item = rawItem.trim();
      if (!item) return;
      var quantityMatch = item.match(/^(\d+)x\s+(.*)$/);
      var parsedQuantity = quantityMatch ? parseInt(quantityMatch[1], 10) : NaN;
      var quantity = Number.isFinite(parsedQuantity) && parsedQuantity > 0 ? parsedQuantity : 1;
      var namePart = quantityMatch ? quantityMatch[2] : item;
      var match = namePart.trim().match(/^(.*?)(?: \(([^()]+)\))?$/);
      var base = match ? match[1].trim() : namePart.trim();
      var ctx = match && match[2] ? match[2].trim() : '';
      if (!base) return;
      if (!entries[base]) {
        entries[base] = {
          total: 0,
          ctxCounts: {},
          cameraLink: false,
          cameraLinkLabel: ''
        };
      }
      var entry = entries[base];
      entry.total += quantity;
      entry.ctxCounts[ctx] = (entry.ctxCounts[ctx] || 0) + quantity;
      if (typeof options.onItem === 'function') {
        try {
          options.onItem({
            rawItem: item,
            base: base,
            context: ctx,
            quantity: quantity,
            entry: entry
          });
        } catch (error) {
          if (typeof console !== 'undefined' && console && typeof console.warn === 'function') {
            console.warn('formatItems onItem callback failed', error);
          }
        }
      }
    });
    var rentalTexts = rentalToggleTexts;
    var noteAttr = rentalTexts.noteLabel && rentalTexts.noteLabel.trim() ? " data-rental-note=\"".concat(escapeHtml(rentalTexts.noteLabel), "\"") : '';
    return Object.entries(entries).sort(function (_ref31, _ref32) {
      var _ref33 = _slicedToArray(_ref31, 1),
        a = _ref33[0];
      var _ref34 = _slicedToArray(_ref32, 1),
        b = _ref34[0];
      return a.localeCompare(b, undefined, {
        sensitivity: 'base'
      });
    }).map(function (_ref35) {
      var _gearItemTranslations;
      var _ref36 = _slicedToArray(_ref35, 2),
        base = _ref36[0],
        entry = _ref36[1];
      var total = entry.total;
      var ctxCounts = entry.ctxCounts;
      var ctxKeys = Object.keys(ctxCounts);
      var hasContext = ctxKeys.some(function (c) {
        return c;
      });
      var ctxParts = [];
      if (hasContext) {
        if (base === 'sand bag') {
          var realEntries = Object.entries(ctxCounts).filter(function (_ref37) {
            var _ref38 = _slicedToArray(_ref37, 1),
              c = _ref38[0];
            return c && c.toLowerCase() !== 'spare';
          }).sort(function (_ref39, _ref40) {
            var _ref41 = _slicedToArray(_ref39, 1),
              a = _ref41[0];
            var _ref42 = _slicedToArray(_ref40, 1),
              b = _ref42[0];
            return a.localeCompare(b, undefined, {
              sensitivity: 'base'
            });
          });
          var usedCount = realEntries.reduce(function (sum, _ref43) {
            var _ref44 = _slicedToArray(_ref43, 2),
              count = _ref44[1];
            return sum + count;
          }, 0);
          var spareCount = total - usedCount;
          ctxParts = realEntries.map(function (_ref45) {
            var _ref46 = _slicedToArray(_ref45, 2),
              c = _ref46[0],
              count = _ref46[1];
            return "".concat(count, "x ").concat(c);
          });
          if (spareCount > 0) ctxParts.push("".concat(spareCount, "x Spare"));
        } else if (base.startsWith('Bebob ')) {
          var _realEntries = Object.entries(ctxCounts).filter(function (_ref47) {
            var _ref48 = _slicedToArray(_ref47, 1),
              c = _ref48[0];
            return c && c.toLowerCase() !== 'spare';
          }).map(function (_ref49) {
            var _ref50 = _slicedToArray(_ref49, 2),
              c = _ref50[0],
              count = _ref50[1];
            var qtyMatch = c.match(/^(\d+)x\s+(.*)$/i);
            if (qtyMatch) {
              var _qtyMatch = _slicedToArray(qtyMatch, 3),
                qty = _qtyMatch[1],
                label = _qtyMatch[2];
              var qtyNum = parseInt(qty, 10);
              if (Number.isFinite(qtyNum) && qtyNum > 0) {
                return [label.trim(), count * qtyNum];
              }
            }
            return [c, count];
          }).sort(function (_ref51, _ref52) {
            var _ref53 = _slicedToArray(_ref51, 1),
              a = _ref53[0];
            var _ref54 = _slicedToArray(_ref52, 1),
              b = _ref54[0];
            return a.localeCompare(b, undefined, {
              sensitivity: 'base'
            });
          });
          var _usedCount = _realEntries.reduce(function (sum, _ref55) {
            var _ref56 = _slicedToArray(_ref55, 2),
              count = _ref56[1];
            return sum + count;
          }, 0);
          var _spareCount = total - _usedCount;
          ctxParts = _realEntries.map(function (_ref57) {
            var _ref58 = _slicedToArray(_ref57, 2),
              c = _ref58[0],
              count = _ref58[1];
            return "".concat(count, "x ").concat(c);
          });
          if (_spareCount > 0) ctxParts.push("".concat(_spareCount, "x Spare"));
        } else {
          var _realEntries2 = Object.entries(ctxCounts).filter(function (_ref59) {
            var _ref60 = _slicedToArray(_ref59, 1),
              c = _ref60[0];
            return c && c.toLowerCase() !== 'spare';
          }).sort(function (_ref61, _ref62) {
            var _ref63 = _slicedToArray(_ref61, 1),
              a = _ref63[0];
            var _ref64 = _slicedToArray(_ref62, 1),
              b = _ref64[0];
            return a.localeCompare(b, undefined, {
              sensitivity: 'base'
            });
          });
          var _usedCount2 = _realEntries2.reduce(function (sum, _ref65) {
            var _ref66 = _slicedToArray(_ref65, 2),
              count = _ref66[1];
            return sum + count;
          }, 0);
          var _spareCount2 = Object.entries(ctxCounts).filter(function (_ref67) {
            var _ref68 = _slicedToArray(_ref67, 1),
              c = _ref68[0];
            return c && c.toLowerCase() === 'spare';
          }).reduce(function (sum, _ref69) {
            var _ref70 = _slicedToArray(_ref69, 2),
              count = _ref70[1];
            return sum + count;
          }, 0);
          var countsUniform = _realEntries2.length > 0 && _realEntries2.every(function (_ref71) {
            var _ref72 = _slicedToArray(_ref71, 2),
              count = _ref72[1];
            return count === _realEntries2[0][1];
          });
          if (countsUniform && _spareCount2 === 0) {
            ctxParts = _realEntries2.map(function (_ref73) {
              var _ref74 = _slicedToArray(_ref73, 1),
                c = _ref74[0];
              return c;
            });
          } else {
            ctxParts = _realEntries2.map(function (_ref75) {
              var _ref76 = _slicedToArray(_ref75, 2),
                c = _ref76[0],
                count = _ref76[1];
              return "".concat(count, "x ").concat(c);
            });
          }
          if (_spareCount2 > 0) {
            ctxParts.push("".concat(_spareCount2, "x Spare"));
          } else if (base === 'D-Tap Extension 50 cm') {
            var remaining = total - _usedCount2;
            if (remaining > 0) ctxParts.push("".concat(remaining, "x Spare"));
          }
        }
      }
      var ctxStr = ctxParts.length ? " (".concat(ctxParts.join(', '), ")") : '';
      var translatedBase = ((_gearItemTranslations = gearItemTranslations[currentLang]) === null || _gearItemTranslations === void 0 ? void 0 : _gearItemTranslations[base]) || base;
      var displayName = "".concat(translatedBase).concat(ctxStr);
      var dataName = "".concat(base).concat(ctxStr);
      var quantityAttr = " data-gear-quantity=\"".concat(escapeHtml(String(total)), "\"");
      var labelAttr = " data-gear-label=\"".concat(escapeHtml(translatedBase), "\"");
      var attributesAttr = ctxParts.length ? " data-gear-attributes=\"".concat(escapeHtml(ctxParts.join(', ')), "\"") : '';
      var safeDataName = escapeHtml(dataName);
      var textContent = "".concat(total, "x ").concat(displayName);
      var extraAttrParts = [];
      if (entry.cameraLink) {
        var attr = buildCameraLinkAttributes(entry.cameraLinkLabel);
        if (attr) {
          extraAttrParts.push(attr);
        }
      }
      var extraAttr = extraAttrParts.length ? " ".concat(extraAttrParts.join(' ')) : '';
      return "<span class=\"gear-item\" data-gear-name=\"".concat(safeDataName, "\"").concat(quantityAttr).concat(labelAttr).concat(attributesAttr).concat(noteAttr).concat(extraAttr, "><span class=\"gear-item-text\">").concat(escapeHtml(textContent), "</span><span class=\"gear-item-note\" hidden></span></span>");
    }).join('<br>');
  };
  var wrapGearItemHtml = function wrapGearItemHtml(contentHtml) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (!contentHtml) return '';
    var _options$name = options.name,
      name = _options$name === void 0 ? '' : _options$name,
      _options$quantity = options.quantity,
      quantity = _options$quantity === void 0 ? '' : _options$quantity,
      _options$label = options.label,
      label = _options$label === void 0 ? '' : _options$label,
      _options$attributes = options.attributes,
      attributes = _options$attributes === void 0 ? '' : _options$attributes,
      _options$rentalNote = options.rentalNote,
      rentalNote = _options$rentalNote === void 0 ? rentalNoteAttr : _options$rentalNote,
      _options$extraAttribu = options.extraAttributes,
      extraAttributes = _options$extraAttribu === void 0 ? '' : _options$extraAttribu;
    var nameAttr = name ? " data-gear-name=\"".concat(escapeHtml(String(name)), "\"") : '';
    var quantityAttr = quantity ? " data-gear-quantity=\"".concat(escapeHtml(String(quantity)), "\"") : '';
    var labelAttr = label ? " data-gear-label=\"".concat(escapeHtml(String(label)), "\"") : '';
    var attributesAttr = attributes ? " data-gear-attributes=\"".concat(escapeHtml(String(attributes)), "\"") : '';
    var rentalAttr = typeof rentalNote === 'string' ? rentalNote : '';
    var extraAttr = extraAttributes ? " ".concat(extraAttributes.trim()) : '';
    return "<span class=\"gear-item\"".concat(nameAttr).concat(quantityAttr).concat(labelAttr).concat(attributesAttr).concat(rentalAttr).concat(extraAttr, "><span class=\"gear-item-text\">").concat(contentHtml, "</span><span class=\"gear-item-note\" hidden></span></span>");
  };
  var ensureItems = function ensureItems(arr, categoryPath) {
    if (typeof registerDevice !== 'function') return;
    var entries = {};
    arr.filter(Boolean).forEach(function (item) {
      var match = item.trim().match(/^(.*?)(?: \(([^()]+)\))?$/);
      var base = match ? match[1].trim() : item.trim();
      entries[base] = entries[base] || {};
    });
    if (Object.keys(entries).length) {
      registerDevice(categoryPath, entries);
    }
  };
  var categoryGroups = [];
  var addRow = function addRow(cat, items) {
    var rawLabel = typeof cat === 'string' ? cat : String(cat !== null && cat !== void 0 ? cat : '');
    var categoryLabel = rawLabel.trim() || String(cat !== null && cat !== void 0 ? cat : '');
    var categoryKey = createCustomCategoryKey(categoryLabel);
    var safeLabel = escapeHtml(categoryLabel);
    var addLabel = resolveGearListCustomText('gearListAddCustomItem', 'Add custom item');
    var addAria = resolveGearListCustomText('gearListAddCustomItemToCategory', 'Add custom item to {category}', {
      category: categoryLabel
    });
    var glyph = (typeof ICON_GLYPHS === "undefined" ? "undefined" : _typeof(ICON_GLYPHS)) === 'object' && ICON_GLYPHS ? ICON_GLYPHS.add || ICON_GLYPHS.plus : null;
    var addIcon = typeof iconMarkup === 'function' && glyph ? iconMarkup(glyph, {
      className: 'btn-icon'
    }) : '';
    var buttonContent = addIcon || escapeHtml('+');
    var addButtonHtml = "<button type=\"button\" class=\"gear-custom-add-btn\" data-gear-custom-add=\"".concat(escapeHtml(categoryKey), "\" data-gear-custom-category=\"").concat(safeLabel, "\" aria-label=\"").concat(escapeHtml(addAria), "\" title=\"").concat(escapeHtml(addLabel), "\">").concat(buttonContent, "</button>");
    var standardItemsHtml = items ? "<div class=\"gear-standard-items\">".concat(items, "</div>") : '';
    var customSectionHtml = "<div class=\"gear-custom-section\" data-gear-custom-key=\"".concat(escapeHtml(categoryKey), "\" data-gear-custom-category=\"").concat(safeLabel, "\"><div class=\"gear-custom-items\" data-gear-custom-list=\"").concat(escapeHtml(categoryKey), "\" data-gear-custom-category=\"").concat(safeLabel, "\" aria-live=\"polite\"></div></div>");
    var rowContent = "".concat(standardItemsHtml).concat(customSectionHtml);
    categoryGroups.push("<tbody class=\"category-group\" data-gear-table-category=\"".concat(safeLabel, "\" data-gear-custom-key=\"").concat(escapeHtml(categoryKey), "\"><tr class=\"category-row\"><td data-gear-category-label=\"").concat(safeLabel, "\"><div class=\"gear-category-header\"><span class=\"gear-category-label\">").concat(safeLabel, "</span>").concat(addButtonHtml, "</div></td></tr><tr><td>").concat(rowContent, "</td></tr></tbody>"));
  };
  addRow('Camera', formatItems([selectedNames.camera]));
  var cameraSupportText = formatItems(supportAccNoCages);
  var cageSelectHtml = '';
  if (compatibleCages.length) {
    var options = compatibleCages.map(function (c) {
      return "<option value=\"".concat(escapeHtml(c), "\"").concat(c === selectedNames.cage ? ' selected' : '', ">").concat(escapeHtml(addArriKNumber(c)), "</option>");
    }).join('');
    var cageLabelTextRaw = typeof localGetLocalizedText === 'function' ? localGetLocalizedText('category_cages') : '';
    var cageLabelText = cageLabelTextRaw && cageLabelTextRaw.trim() ? cageLabelTextRaw.trim() : 'Camera Cage';
    var ariaLabelAttr = cageLabelText ? " aria-label=\"".concat(escapeHtml(cageLabelText), "\"") : '';
    var hiddenLabelHtml = cageLabelText ? "<span class=\"visually-hidden\">".concat(escapeHtml(cageLabelText), "</span>") : '';
    var wrapperHtml = "<span class=\"cage-select-wrapper\"><span>1x</span>".concat(hiddenLabelHtml, "<select id=\"gearListCage\"").concat(ariaLabelAttr, ">").concat(options, "</select></span>");
    var attributesText = selectedNames.cage ? selectedNames.cage.trim() : '';
    var dataName = attributesText ? "".concat(cageLabelText, " (").concat(attributesText, ")") : cageLabelText;
    var cageExtraAttributes = selectedNames.cage && hasCameraForLinking ? buildCameraLinkAttributes(selectedNames.cage) : '';
    cageSelectHtml = wrapGearItemHtml(wrapperHtml, {
      name: dataName,
      quantity: 1,
      label: cageLabelText,
      attributes: attributesText,
      extraAttributes: cageExtraAttributes
    });
  }
  addRow('Camera Support', [cameraSupportText, cageSelectHtml].filter(Boolean).join('<br>'));
  var storageGearListItems = Array.isArray(info.storageRequirements) ? info.storageRequirements.map(function (entry) {
    if (!entry || _typeof(entry) !== 'object') return '';
    var quantity = Number.isFinite(entry.quantity) && entry.quantity > 0 ? entry.quantity : null;
    var type = typeof entry.type === 'string' ? entry.type.trim() : '';
    var variant = typeof entry.variant === 'string' ? entry.variant.trim() : '';
    var notes = typeof entry.notes === 'string' ? entry.notes.trim() : '';
    if (!quantity && !type && !variant && !notes) return '';
    var contextParts = [];
    var normalizedType = type.toLowerCase();
    var display = variant || '';
    if (display) {
      var normalizedVariant = display.toLowerCase();
      if (normalizedType && !normalizedVariant.includes(normalizedType) && type) {
        contextParts.push(type);
      }
    } else if (type) {
      display = type;
    }
    if (!display) {
      display = storageFallbackLabel;
    }
    if (notes) {
      contextParts.push(notes);
    }
    var context = contextParts.length ? " (".concat(contextParts.join(', '), ")") : '';
    var prefix = quantity ? "".concat(quantity, "x ") : '';
    return "".concat(prefix).concat(display).concat(context).trim();
  }).filter(Boolean) : [];
  var cam = devices && devices.cameras && selectedNames.camera ? devices.cameras[selectedNames.camera] : null;
  var mediaItems = '';
  if (storageGearListItems.length) {
    mediaItems = formatItems(storageGearListItems);
  } else {
    if (cam && Array.isArray(cam.recordingMedia) && cam.recordingMedia.length) {
      var sizeMap = {
        'CFexpress Type A': '320GB',
        'CFast 2.0': '512GB',
        'CFexpress Type B': '512GB',
        'Codex Compact Drive': '1TB',
        'AXS Memory A-Series slot': '1TB',
        'SD': '128GB',
        'SD Card': '128GB',
        'SDXC': '128GB',
        'XQD Card': '120GB',
        'RED MINI-MAG': '512GB',
        'REDMAG 1.8" SSD': '512GB',
        'Blackmagic Media Module': '8TB',
        'DJI PROSSD': '1TB',
        'USB-C 3.1 Gen 1 expansion port for external media': '1TB',
        'USB-C 3.1 Gen 2 expansion port for external media': '1TB',
        'USB-C to external SSD/HDD': '1TB'
      };
      mediaItems = cam.recordingMedia.slice(0, 1).map(function (m) {
        var type = m && m.type ? m.type : '';
        if (!type) return '';
        var size = '';
        if (m.notes) {
          var match = m.notes.match(/(\d+(?:\.\d+)?\s*(?:TB|GB))/i);
          if (match) size = match[1].toUpperCase();
        }
        if (!size) size = sizeMap[type] || '512GB';
        return "4x ".concat(escapeHtml(size), " ").concat(escapeHtml(type), "<br>2x ").concat(escapeHtml(type), " reader with USB-C");
      }).filter(Boolean).join('<br>');
    }
  }
  addRow('Media', mediaItems);
  var cameraRequiredImageCircle = function (_cam$requiredImageCir) {
    if (!cam) return null;
    var rawValue = (_cam$requiredImageCir = cam.requiredImageCircleMm) !== null && _cam$requiredImageCir !== void 0 ? _cam$requiredImageCir : cam.requiredImageCircle;
    var parsed = Number(rawValue);
    return Number.isFinite(parsed) ? parsed : null;
  }();
  var lensCoverageWarningText = resolveGearListCustomText('gearListLensCoverageWarning', 'This lens may not cover the full sensor of this camera!');
  var normalizeFocusScaleValue = function normalizeFocusScaleValue(value) {
    if (typeof value !== 'string') {
      return '';
    }
    var normalized = value.trim().toLowerCase();
    return normalized === 'imperial' || normalized === 'metric' ? normalized : '';
  };
  var resolveFocusScaleMode = function resolveFocusScaleMode() {
    var scope = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
    var scopePreference = scope && typeof scope.focusScalePreference === 'string' ? scope.focusScalePreference : null;
    var rawPreference = scopePreference || (typeof focusScalePreference === 'string' ? focusScalePreference : null) || 'metric';
    var normalized = normalizeFocusScaleValue(rawPreference);
    return normalized || 'metric';
  };
  var focusScaleMode = resolveFocusScaleMode();
  var useImperialFocusScale = focusScaleMode === 'imperial';
  var resolveLensFocusScaleMode = function resolveLensFocusScaleMode(lens) {
    if (!lens || _typeof(lens) !== 'object') {
      return focusScaleMode;
    }
    var override = normalizeFocusScaleValue(lens.focusScale);
    return override || focusScaleMode;
  };
  var focusScaleLang = typeof currentLang === 'string' && currentLang.trim() ? currentLang : 'en';
  var formatLensNumber = function formatLensNumber(value) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var numeric = typeof value === 'string' ? Number(value) : value;
    if (!Number.isFinite(numeric)) {
      return '';
    }
    var maximumFractionDigits = typeof options.maximumFractionDigits === 'number' ? options.maximumFractionDigits : 0;
    var minimumFractionDigits = typeof options.minimumFractionDigits === 'number' ? options.minimumFractionDigits : Math.min(0, maximumFractionDigits);
    if (typeof Intl !== 'undefined' && typeof Intl.NumberFormat === 'function') {
      try {
        return new Intl.NumberFormat(focusScaleLang, {
          maximumFractionDigits: maximumFractionDigits,
          minimumFractionDigits: minimumFractionDigits
        }).format(numeric);
      } catch (formatError) {
        void formatError;
      }
    }
    var digits = Math.max(minimumFractionDigits, Math.min(20, maximumFractionDigits));
    try {
      return numeric.toFixed(digits);
    } catch (toFixedError) {
      void toFixedError;
    }
    return String(numeric);
  };
  var formatLensWeight = function formatLensWeight(value) {
    var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : focusScaleMode;
    var numeric = typeof value === 'string' ? Number(value) : value;
    if (!Number.isFinite(numeric)) {
      return '';
    }
    var useImperial = mode === 'imperial';
    if (useImperial) {
      var pounds = numeric / 453.59237;
      var digits = pounds >= 10 ? 1 : 2;
      var _formatted = formatLensNumber(pounds, {
        maximumFractionDigits: digits,
        minimumFractionDigits: 0
      });
      return _formatted ? "".concat(_formatted, " lb") : '';
    }
    var formatted = formatLensNumber(numeric, {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0
    });
    return formatted ? "".concat(formatted, " g") : '';
  };
  var formatLensDiameter = function formatLensDiameter(value) {
    var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : focusScaleMode;
    var numeric = typeof value === 'string' ? Number(value) : value;
    if (!Number.isFinite(numeric)) {
      return '';
    }
    var useImperial = mode === 'imperial';
    if (useImperial) {
      var inches = numeric / 25.4;
      var digits = inches >= 10 ? 1 : 2;
      var _formatted2 = formatLensNumber(inches, {
        maximumFractionDigits: digits,
        minimumFractionDigits: 0
      });
      return _formatted2 ? "".concat(_formatted2, " in") : '';
    }
    var formatted = formatLensNumber(numeric, {
      maximumFractionDigits: 1,
      minimumFractionDigits: 0
    });
    return formatted ? "".concat(formatted, " mm") : '';
  };
  var formatLensMinFocus = function formatLensMinFocus(value) {
    var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : focusScaleMode;
    var numeric = typeof value === 'string' ? Number(value) : value;
    if (!Number.isFinite(numeric)) {
      return '';
    }
    var useImperial = mode === 'imperial';
    if (useImperial) {
      var feet = numeric * 3.280839895;
      var _digits = feet < 10 ? 2 : 1;
      var _formatted3 = formatLensNumber(feet, {
        maximumFractionDigits: _digits,
        minimumFractionDigits: _digits
      });
      return _formatted3 ? "".concat(_formatted3, " ft") : '';
    }
    var digits = numeric < 1 ? 2 : 1;
    var formatted = formatLensNumber(numeric, {
      maximumFractionDigits: digits,
      minimumFractionDigits: digits
    });
    return formatted ? "".concat(formatted, " m") : '';
  };
  var formatRodLength = function formatRodLength(value) {
    var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : focusScaleMode;
    var numeric = typeof value === 'string' ? Number(value) : value;
    if (!Number.isFinite(numeric)) {
      return '';
    }
    var useImperial = mode === 'imperial';
    if (useImperial) {
      var inches = numeric / 2.54;
      var digits = inches >= 10 ? 1 : 2;
      var _formatted4 = formatLensNumber(inches, {
        maximumFractionDigits: digits,
        minimumFractionDigits: 0
      });
      return _formatted4 ? "".concat(_formatted4, " in") : '';
    }
    var formatted = formatLensNumber(numeric, {
      maximumFractionDigits: 1,
      minimumFractionDigits: 0
    });
    return formatted ? "".concat(formatted, " cm") : '';
  };
  var lensDisplayNames = selectedLensNames.map(function (name) {
    var _ref77, _lens$minFocusMeters, _lens$imageCircleMm;
    var lens = devices.lenses && devices.lenses[name];
    var base = addArriKNumber(name);
    if (!lens) return base;
    var lensFocusScaleMode = resolveLensFocusScaleMode(lens);
    var attrs = [];
    var formattedWeight = formatLensWeight(lens.weight_g, lensFocusScaleMode);
    if (formattedWeight) attrs.push(formattedWeight);
    if (lens.clampOn) {
      if (lens.frontDiameterMm) {
        var formattedDiameter = formatLensDiameter(lens.frontDiameterMm, lensFocusScaleMode);
        attrs.push(formattedDiameter ? "".concat(formattedDiameter, " clamp-on") : 'clamp-on');
      } else attrs.push('clamp-on');
    } else if (lens.clampOn === false) {
      attrs.push('no clamp-on');
    }
    var minFocus = (_ref77 = (_lens$minFocusMeters = lens.minFocusMeters) !== null && _lens$minFocusMeters !== void 0 ? _lens$minFocusMeters : lens.minFocus) !== null && _ref77 !== void 0 ? _ref77 : lens.minFocusCm ? lens.minFocusCm / 100 : null;
    if (Number.isFinite(minFocus) && minFocus > 0) {
      var formattedMinFocus = formatLensMinFocus(minFocus, lensFocusScaleMode);
      if (formattedMinFocus) {
        attrs.push("".concat(formattedMinFocus, " min focus"));
      }
    }
    var lensImageCircle = Number((_lens$imageCircleMm = lens.imageCircleMm) !== null && _lens$imageCircleMm !== void 0 ? _lens$imageCircleMm : lens.imageCircle);
    var needsCoverageWarning = Number.isFinite(cameraRequiredImageCircle) && Number.isFinite(lensImageCircle) && lensImageCircle + 0.5 < cameraRequiredImageCircle;
    if (needsCoverageWarning && lensCoverageWarningText) {
      attrs.push(lensCoverageWarningText);
    }
    return attrs.length ? "".concat(base, " (").concat(attrs.join(', '), ")") : base;
  });
  addRow('Lens', formatItems(lensDisplayNames));
  var parseRodTypes = function parseRodTypes(raw) {
    if (!raw && raw !== 0) return [];
    var values = Array.isArray(raw) ? raw : [raw];
    var rodSet = new Set();
    values.forEach(function (value) {
      var text = (value !== null && value !== void 0 ? value : '').toString().toLowerCase();
      if (!text) return;
      if (/\b15\s*mm\b/.test(text)) rodSet.add('15mm');
      if (/\b19\s*mm\b/.test(text)) rodSet.add('19mm');
    });
    var order = ['15mm', '19mm'];
    return order.filter(function (type) {
      return rodSet.has(type);
    });
  };
  var lensSupportItems = [];
  var addedRodPairs = new Set();
  selectedLensNames.forEach(function (name) {
    var lens = devices.lenses && devices.lenses[name];
    if (!lens) return;
    var normalizedRodTypes = parseRodTypes(lens.rodStandard);
    var rodType = normalizedRodTypes[0] || (lens.rodStandard ? lens.rodStandard : '15mm');
    var baseRodType = normalizedRodTypes[0] || (rodType === '19mm' ? '19mm' : '15mm');
    var rodLength = lens.rodLengthCm || (baseRodType === '19mm' ? 45 : 30);
    var rodKey = "".concat(baseRodType, "-").concat(rodLength);
    if (!addedRodPairs.has(rodKey)) {
      var formattedRodLength = formatRodLength(rodLength, resolveLensFocusScaleMode(lens));
      var rodLengthLabel = formattedRodLength || "".concat(rodLength, "cm");
      lensSupportItems.push("".concat(baseRodType, " rods ").concat(rodLengthLabel));
      addedRodPairs.add(rodKey);
    }
    if (lens.needsLensSupport) {
      lensSupportItems.push("".concat(baseRodType, " lens support"));
    }
  });
  addRow('Lens Support', formatItems(lensSupportItems));
  addRow('Matte box + filter', [filterSelectHtml, formatItems(filterSelections)].filter(Boolean).join('<br>'));
  var motorItems = [];
  var clmSpareAdded = {
    clm3: false,
    clm4: false,
    clm5: false
  };
  selectedNames.motors.forEach(function (name) {
    var lower = (name || '').toLowerCase();
    var primaryItem = '';
    if (/cforce\s*mini\s*rf|cforce\s*rf/.test(lower)) {
      primaryItem = 'ARRI KK.0040345 CFORCE MINI RF Basic Set 2';
      motorItems.push(primaryItem);
    } else if (/cforce\s*mini/.test(lower) && !/rf/.test(lower)) {
      primaryItem = 'ARRI KK.0040344 Cforce Mini Basic Set 2';
      motorItems.push(primaryItem);
    } else if (/cforce\s*plus/.test(lower)) {
      primaryItem = 'Arri KK.0008824 cforce plus Basic Set';
      motorItems.push(primaryItem);
      motorItems.push('ARRI K2.0009335 Cforce Plus Gear M0.8/32p, 60t');
    } else if (/clm-3/.test(lower)) {
      primaryItem = 'Arri KK.0005854 Controlled Lens Motor CLM-3 Basic Set';
      motorItems.push(primaryItem);
      if (!clmSpareAdded.clm3) {
        motorItems.push('Arri K2.65145.0, Cable CLM-3 (7p) - CLM/FIZ (12p) (0,8m/2.6ft) (spare)');
        clmSpareAdded.clm3 = true;
      }
    } else if (/clm-4/.test(lower)) {
      primaryItem = 'ARRI Controlled Lens Motor CLM-4, Basic Kit (KK.0005855)';
      motorItems.push(primaryItem);
      if (!clmSpareAdded.clm4) {
        motorItems.push('Arri K2.72099.0 CLM-4 Motor Cable (spare)');
        clmSpareAdded.clm4 = true;
      }
    } else if (/clm-5/.test(lower)) {
      primaryItem = 'Arri K2.0006361 Controlled Lens Motor CLM-5 Basic Set';
      motorItems.push(primaryItem);
      if (!clmSpareAdded.clm5) {
        motorItems.push('Arri K2.0006361 Controlled Lens Motor CLM-5 Basic Set (spare)');
        clmSpareAdded.clm5 = true;
      }
    }
    if (!primaryItem && name) {
      primaryItem = name;
      motorItems.push(name);
    }
    if (primaryItem) {
      registerCameraLinkTarget(primaryItem);
    }
  });
  selectedNames.controllers.forEach(registerCameraLinkTarget);
  var distanceItems = [];
  var distanceName = selectedNames.distance;
  if (distanceName) {
    var lowerName = distanceName.toLowerCase();
    if (lowerName === 'udm-1 + lcube') {
      var udmEntry = 'Arri KK.0005853 Ultrasonic Distance Measure UDM-1 Basic Set';
      distanceItems.push(udmEntry);
      registerCameraLinkTarget(udmEntry);
      var hasRiaController = selectedNames.controllers.some(function (ctrl) {
        return /ria-1/i.test(ctrl);
      });
      var isAlexa35 = /alexa 35/i.test(selectedNames.camera || '');
      if (!hasRiaController && !isAlexa35) {
        var lcubeEntry = 'Arri KK.0009001 LCUBE CUB-1 Basic Set';
        distanceItems.push(lcubeEntry);
        registerCameraLinkTarget(lcubeEntry);
      }
    } else {
      distanceItems.push(distanceName);
      registerCameraLinkTarget(distanceName);
    }
  }
  addRow('LDS (FIZ)', formatItems([].concat(motorItems, _toConsumableArray(selectedNames.controllers), distanceItems, _toConsumableArray(fizCableAcc)), {
    onItem: applyCameraLinkFromTargets
  }));
  var batteryItems = '';
  if (selectedNames.battery) {
    registerCameraLinkTarget(selectedNames.battery);
    var count = batteryCountElem ? parseInt(batteryCountElem.textContent, 10) : NaN;
    if (!count || isNaN(count)) count = 1;
    var batteryEntries = ["".concat(count, "x ").concat(selectedNames.battery)];
    var swapName = hotswapSelect && hotswapSelect.value && hotswapSelect.value !== 'None' ? getText(hotswapSelect) : '';
    if (swapName) {
      batteryEntries.push("1x ".concat(swapName));
      registerCameraLinkTarget(swapName);
    }
    batteryItems = formatItems(batteryEntries, {
      onItem: applyCameraLinkFromTargets
    });
  }
  addRow('Camera Batteries', batteryItems);
  var monitoringItems = '';
  var monitorSizes = [];
  if (selectedNames.monitor) {
    var _devices;
    var size = (_devices = devices) === null || _devices === void 0 || (_devices = _devices.monitors) === null || _devices === void 0 || (_devices = _devices[selectedNames.monitor]) === null || _devices === void 0 ? void 0 : _devices.screenSizeInches;
    if (size) monitorSizes.push(size);
    var sizeHtml = size ? "".concat(escapeHtml(String(size)), "&quot; - ") : '';
    var monitorLabel = 'Onboard Monitor';
    var monitorName = addArriKNumber(selectedNames.monitor);
    var displayHtml = "1x <strong>".concat(monitorLabel, "</strong> - ").concat(sizeHtml).concat(escapeHtml(monitorName), " - incl. Sunhood");
    var attributeParts = [];
    if (size) attributeParts.push("".concat(size, "\""));
    if (monitorName) attributeParts.push(monitorName);
    attributeParts.push('incl. Sunhood');
    var attributeText = attributeParts.filter(Boolean).join(' - ');
    var _dataName = attributeText ? "".concat(monitorLabel, " (").concat(attributeText, ")") : monitorLabel;
    var monitorExtraAttributes = hasCameraForLinking ? buildCameraLinkAttributes(selectedNames.monitor) : '';
    monitoringItems += (monitoringItems ? '<br>' : '') + wrapGearItemHtml(displayHtml, {
      name: _dataName,
      quantity: 1,
      label: monitorLabel,
      attributes: attributeText,
      extraAttributes: monitorExtraAttributes
    });
  }
  handheldPrefs.forEach(function (_ref78) {
    var role = _ref78.role,
      size = _ref78.size;
    var monitorsDb = devices && devices.monitors ? devices.monitors : {};
    var names = Object.keys(monitorsDb).filter(function (n) {
      return !monitorsDb[n].wirelessTx || monitorsDb[n].wirelessRX;
    }).sort(localeSort);
    var infoKey = role === 'DoP' ? 'dopMonitor' : "".concat(role.toLowerCase(), "Monitor");
    var manualFlag = !!info["".concat(infoKey, "Manual")];
    var infoValue = typeof info[infoKey] === 'string' ? info[infoKey].trim() : '';
    var autoDefault = getAutoGearMonitorDefault('handheld7');
    var candidate = '';
    if (manualFlag && infoValue) {
      candidate = infoValue;
    } else if (autoDefault) {
      candidate = autoDefault;
    } else if (infoValue) {
      candidate = infoValue;
    }
    var lowerNames = names.map(function (n) {
      return n.toLowerCase();
    });
    var defaultName = '';
    if (candidate) {
      var matchIndex = lowerNames.indexOf(candidate.toLowerCase());
      if (matchIndex >= 0) {
        defaultName = names[matchIndex];
      }
    }
    if (!defaultName) {
      if (!manualFlag && size) {
        var sized = names.find(function (n) {
          return monitorsDb[n].screenSizeInches === size;
        });
        if (size === 7 && names.includes('SmallHD Ultra 7')) {
          defaultName = 'SmallHD Ultra 7';
        } else if (sized) {
          defaultName = sized;
        }
      }
      if (!defaultName) {
        if (!manualFlag && !candidate && names.includes('SmallHD Ultra 7')) {
          defaultName = 'SmallHD Ultra 7';
        } else if (names.length) {
          defaultName = names[0];
        } else if (candidate) {
          defaultName = candidate;
        }
      }
    }
    var optionValues = names.slice();
    if (candidate && !lowerNames.includes(candidate.toLowerCase())) {
      optionValues.unshift(candidate);
    }
    if (defaultName && !optionValues.some(function (value) {
      return value.toLowerCase() === defaultName.toLowerCase();
    })) {
      optionValues.unshift(defaultName);
    }
    var seenOptions = new Set();
    var opts = optionValues.filter(Boolean).filter(function (value) {
      var key = value.toLowerCase();
      if (seenOptions.has(key)) return false;
      seenOptions.add(key);
      return true;
    }).map(function (value) {
      var isSelected = value.toLowerCase() === (defaultName || '').toLowerCase();
      return "<option value=\"".concat(escapeHtml(value), "\"").concat(isSelected ? ' selected' : '', ">").concat(escapeHtml(addArriKNumber(value)), "</option>");
    }).join('');
    var idSuffix = role === 'DoP' ? 'Dop' : role;
    var labelRole = role.replace(/s$/, '');
    var resolvedName = Array.from(seenOptions.values()).find(function (value) {
      return value === (defaultName || '').toLowerCase();
    }) ? optionValues.find(function (value) {
      return value && value.toLowerCase() === (defaultName || '').toLowerCase();
    }) : defaultName;
    var selectedMonitor = resolvedName && monitorsDb[resolvedName] ? monitorsDb[resolvedName] : monitorsDb[defaultName] || monitorsDb[candidate] || null;
    var selectedSize = (selectedMonitor === null || selectedMonitor === void 0 ? void 0 : selectedMonitor.screenSizeInches) || '';
    var displayLabel = "".concat(labelRole, " Handheld Monitor");
    var sizeSpanHtml = "<span id=\"monitorSize".concat(idSuffix, "\">").concat(escapeHtml(selectedSize ? String(selectedSize) : ''), "&quot;</span>");
    var selectHtml = "<select id=\"gearList".concat(idSuffix, "Monitor\" data-auto-gear-manual=\"").concat(manualFlag ? 'true' : 'false', "\">").concat(opts, "</select>");
    var displayHtml = "1x <strong>".concat(escapeHtml(displayLabel), "</strong> - ").concat(sizeSpanHtml, " - ").concat(selectHtml, " incl. Directors cage, shoulder strap, sunhood, rigging for teradeks");
    var attributeParts = [];
    if (selectedSize) attributeParts.push("".concat(selectedSize, "\""));
    if (resolvedName) attributeParts.push(addArriKNumber(resolvedName));
    attributeParts.push('incl. Directors cage, shoulder strap, sunhood, rigging for teradeks');
    var attributeText = attributeParts.filter(Boolean).join(' - ');
    var dataName = attributeText ? "".concat(displayLabel, " (").concat(attributeText, ")") : displayLabel;
    monitoringItems += (monitoringItems ? '<br>' : '') + wrapGearItemHtml(displayHtml, {
      name: dataName,
      quantity: 1,
      label: displayLabel,
      attributes: attributeText
    });
    if (selectedSize) monitorSizes.push(selectedSize);
  });
  largeMonitorPrefs.forEach(function (_ref79) {
    var _dirDb$resolvedName, _dirDb$defaultName, _dirDb$candidate;
    var role = _ref79.role;
    var dirDb = devices && devices.directorMonitors ? devices.directorMonitors : {};
    var names = Object.keys(dirDb).filter(function (n) {
      return n !== 'None';
    }).sort(localeSort);
    var infoKey = role === 'DoP' ? 'dopMonitor15' : role === 'Combo' ? 'comboMonitor15' : 'directorMonitor15';
    var manualFlag = !!info["".concat(infoKey, "Manual")];
    var infoValue = typeof info[infoKey] === 'string' ? info[infoKey].trim() : '';
    var defaultKey = role === 'Combo' ? 'combo15' : 'director15';
    var autoDefault = getAutoGearMonitorDefault(defaultKey);
    var candidate = '';
    if (manualFlag && infoValue) {
      candidate = infoValue;
    } else if (autoDefault) {
      candidate = autoDefault;
    } else if (infoValue) {
      candidate = infoValue;
    }
    var lowerNames = names.map(function (n) {
      return n.toLowerCase();
    });
    var defaultName = '';
    if (candidate) {
      var matchIndex = lowerNames.indexOf(candidate.toLowerCase());
      if (matchIndex >= 0) {
        defaultName = names[matchIndex];
      }
    }
    if (!defaultName) {
      if (names.includes('SmallHD Cine 24" 4K High-Bright Monitor')) {
        defaultName = 'SmallHD Cine 24" 4K High-Bright Monitor';
      } else if (names.length) {
        defaultName = names[0];
      } else if (candidate) {
        defaultName = candidate;
      }
    }
    var optionValues = names.slice();
    if (candidate && !lowerNames.includes(candidate.toLowerCase())) {
      optionValues.unshift(candidate);
    }
    if (defaultName && !optionValues.some(function (value) {
      return value.toLowerCase() === defaultName.toLowerCase();
    })) {
      optionValues.unshift(defaultName);
    }
    var seenOptions = new Set();
    var opts = optionValues.filter(Boolean).filter(function (value) {
      var key = value.toLowerCase();
      if (seenOptions.has(key)) return false;
      seenOptions.add(key);
      return true;
    }).map(function (value) {
      var isSelected = value.toLowerCase() === (defaultName || '').toLowerCase();
      return "<option value=\"".concat(escapeHtml(value), "\"").concat(isSelected ? ' selected' : '', ">").concat(escapeHtml(addArriKNumber(value)), "</option>");
    }).join('');
    var idSuffix = role === 'DoP' ? 'Dop' : role;
    var resolvedName = Array.from(seenOptions.values()).find(function (value) {
      return value === (defaultName || '').toLowerCase();
    }) ? optionValues.find(function (value) {
      return value && value.toLowerCase() === (defaultName || '').toLowerCase();
    }) : defaultName;
    var size = resolvedName && (_dirDb$resolvedName = dirDb[resolvedName]) !== null && _dirDb$resolvedName !== void 0 && _dirDb$resolvedName.screenSizeInches ? dirDb[resolvedName].screenSizeInches : ((_dirDb$defaultName = dirDb[defaultName]) === null || _dirDb$defaultName === void 0 ? void 0 : _dirDb$defaultName.screenSizeInches) || ((_dirDb$candidate = dirDb[candidate]) === null || _dirDb$candidate === void 0 ? void 0 : _dirDb$candidate.screenSizeInches) || '';
    var displayLabel = "".concat(role, " Monitor");
    var sizeSpanHtml = "<span id=\"monitorSize".concat(idSuffix, "15\">").concat(escapeHtml(size ? String(size) : ''), "&quot;</span>");
    var selectHtml = "<select id=\"gearList".concat(idSuffix, "Monitor15\" data-auto-gear-manual=\"").concat(manualFlag ? 'true' : 'false', "\">").concat(opts, "</select>");
    var displayHtml = "1x <strong>".concat(escapeHtml(displayLabel), "</strong> - ").concat(sizeSpanHtml, " - ").concat(selectHtml, " incl. sunhood, V-Mount, AC Adapter and Wooden Camera Ultra QR Monitor Mount (Baby Pin, C-Stand)");
    var attributeParts = [];
    if (size) attributeParts.push("".concat(size, "\""));
    if (resolvedName) attributeParts.push(addArriKNumber(resolvedName));
    attributeParts.push('incl. sunhood, V-Mount, AC Adapter and Wooden Camera Ultra QR Monitor Mount (Baby Pin, C-Stand)');
    var attributeText = attributeParts.filter(Boolean).join(' - ');
    var dataName = attributeText ? "".concat(displayLabel, " (").concat(attributeText, ")") : displayLabel;
    monitoringItems += (monitoringItems ? '<br>' : '') + wrapGearItemHtml(displayHtml, {
      name: dataName,
      quantity: 1,
      label: displayLabel,
      attributes: attributeText
    });
    if (size) monitorSizes.push(size);
  });
  if (hasMotor) {
    var _monitorsDb$defaultNa, _monitorsDb$candidate;
    var monitorsDb = devices && devices.monitors ? devices.monitors : {};
    var names = Object.keys(monitorsDb).filter(function (n) {
      return !monitorsDb[n].wirelessTx || monitorsDb[n].wirelessRX;
    }).sort(localeSort);
    var manualFlag = !!info.focusMonitorManual;
    var infoValue = typeof info.focusMonitor === 'string' ? info.focusMonitor.trim() : '';
    var autoDefault = getAutoGearMonitorDefault('focus');
    var candidate = '';
    if (manualFlag && infoValue) {
      candidate = infoValue;
    } else if (autoDefault) {
      candidate = autoDefault;
    } else if (infoValue) {
      candidate = infoValue;
    }
    var lowerNames = names.map(function (n) {
      return n.toLowerCase();
    });
    var defaultName = '';
    if (candidate) {
      var matchIndex = lowerNames.indexOf(candidate.toLowerCase());
      if (matchIndex >= 0) {
        defaultName = names[matchIndex];
      }
    }
    if (!defaultName) {
      if (names.includes('TV Logic F7HS')) {
        defaultName = 'TV Logic F7HS';
      } else if (names.length) {
        defaultName = names[0];
      } else if (candidate) {
        defaultName = candidate;
      }
    }
    var optionValues = names.slice();
    if (candidate && !lowerNames.includes(candidate.toLowerCase())) {
      optionValues.unshift(candidate);
    }
    if (defaultName && !optionValues.some(function (value) {
      return value.toLowerCase() === defaultName.toLowerCase();
    })) {
      optionValues.unshift(defaultName);
    }
    var seenOptions = new Set();
    var opts = optionValues.filter(Boolean).filter(function (value) {
      var key = value.toLowerCase();
      if (seenOptions.has(key)) return false;
      seenOptions.add(key);
      return true;
    }).map(function (value) {
      var isSelected = value.toLowerCase() === (defaultName || '').toLowerCase();
      return "<option value=\"".concat(escapeHtml(value), "\"").concat(isSelected ? ' selected' : '', ">").concat(escapeHtml(addArriKNumber(value)), "</option>");
    }).join('');
    var resolvedName = Array.from(seenOptions.values()).find(function (value) {
      return value === (defaultName || '').toLowerCase();
    }) ? optionValues.find(function (value) {
      return value && value.toLowerCase() === (defaultName || '').toLowerCase();
    }) : defaultName;
    var selectedSize = resolvedName && monitorsDb[resolvedName] ? monitorsDb[resolvedName].screenSizeInches : ((_monitorsDb$defaultNa = monitorsDb[defaultName]) === null || _monitorsDb$defaultNa === void 0 ? void 0 : _monitorsDb$defaultNa.screenSizeInches) || ((_monitorsDb$candidate = monitorsDb[candidate]) === null || _monitorsDb$candidate === void 0 ? void 0 : _monitorsDb$candidate.screenSizeInches) || '';
    var displayLabel = 'Focus Monitor';
    var sizeSpanHtml = "<span id=\"monitorSizeFocus\">".concat(escapeHtml(selectedSize ? String(selectedSize) : ''), "&quot;</span>");
    var selectHtml = "<select id=\"gearListFocusMonitor\" data-auto-gear-manual=\"".concat(manualFlag ? 'true' : 'false', "\">").concat(opts, "</select>");
    var _displayHtml = "1x <strong>".concat(escapeHtml(displayLabel), "</strong> - ").concat(sizeSpanHtml, " - ").concat(selectHtml, " incl Directors cage, shoulder strap, sunhood, rigging for teradeks");
    var _attributeParts = [];
    if (selectedSize) _attributeParts.push("".concat(selectedSize, "\""));
    if (resolvedName) _attributeParts.push(addArriKNumber(resolvedName));
    _attributeParts.push('incl Directors cage, shoulder strap, sunhood, rigging for teradeks');
    var _attributeText = _attributeParts.filter(Boolean).join(' - ');
    var _dataName2 = _attributeText ? "".concat(displayLabel, " (").concat(_attributeText, ")") : displayLabel;
    monitoringItems += (monitoringItems ? '<br>' : '') + wrapGearItemHtml(_displayHtml, {
      name: _dataName2,
      quantity: 1,
      label: displayLabel,
      attributes: _attributeText
    });
    if (selectedSize) monitorSizes.push(selectedSize);
  }
  var monitoringGear = [];
  var wirelessSize = monitorSizes.includes(5) ? 5 : null;
  if (selectedNames.video) {
    var wirelessSizeHtml = wirelessSize ? "".concat(wirelessSize, "&quot; - ") : '';
    var transmitterEntry = "Wireless Transmitter - ".concat(wirelessSizeHtml).concat(addArriKNumber(selectedNames.video));
    monitoringGear.push(transmitterEntry);
    registerCameraLinkTarget(transmitterEntry);
    var _rxName = selectedNames.video.replace(/ TX\b/, ' RX');
    if (devices && devices.wirelessReceivers && devices.wirelessReceivers[_rxName]) {
      receiverLabels.forEach(function (label) {
        var receiverEntry = "Wireless Receiver - ".concat(wirelessSizeHtml).concat(addArriKNumber(_rxName), " (").concat(label, ")");
        monitoringGear.push(receiverEntry);
        registerCameraLinkTarget(receiverEntry);
      });
    }
  }
  if (monitoringGear.length) {
    var gearHtml = formatItems(monitoringGear, {
      onItem: applyCameraLinkFromTargets
    }).replace(/>(\d+x )Wireless Transmitter/g, '>$1<strong>Wireless Transmitter</strong>').replace(/>(\d+x )Wireless Receiver/g, '>$1<strong>Wireless Receiver</strong>').replace(/&amp;quot;/g, '&quot;');
    monitoringItems += (monitoringItems ? '<br>' : '') + gearHtml;
  }
  var monitorBatterySelections = function () {
    var source = info.monitorBatteries;
    if (!source || _typeof(source) !== 'object' || Array.isArray(source)) return {};
    var entries = {};
    Object.entries(source).forEach(function (_ref80) {
      var _ref81 = _slicedToArray(_ref80, 2),
        key = _ref81[0],
        value = _ref81[1];
      if (typeof key !== 'string') return;
      if (typeof value !== 'string') return;
      var trimmed = value.trim();
      if (!trimmed) return;
      entries[key] = trimmed;
    });
    return entries;
  }();
  var batteryDatabase = devices && devices.batteries ? devices.batteries : {};
  var baseBatteryOptions = Object.keys(batteryDatabase).filter(function (name) {
    return name && name !== 'None';
  }).sort(localeSort);
  var buildBatteryOptions = function buildBatteryOptions(selectedValue) {
    var normalizedSelected = typeof selectedValue === 'string' ? selectedValue.trim() : '';
    var optionValues = baseBatteryOptions.slice();
    if (normalizedSelected && !optionValues.some(function (value) {
      return value.toLowerCase() === normalizedSelected.toLowerCase();
    })) {
      optionValues.unshift(normalizedSelected);
    }
    var seen = new Set();
    return optionValues.filter(Boolean).filter(function (value) {
      var key = value.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).map(function (value) {
      var isSelected = normalizedSelected && value.toLowerCase() === normalizedSelected.toLowerCase();
      return "<option value=\"".concat(escapeHtml(value), "\"").concat(isSelected ? ' selected' : '', ">").concat(escapeHtml(addArriKNumber(value)), "</option>");
    }).join('');
  };
  var monitoringBatteryItems = [];
  var bebob98 = Object.keys(batteryDatabase).find(function (n) {
    return /V98micro/i.test(n);
  }) || 'Bebob V98micro';
  handheldPrefs.forEach(function (p, index) {
    var roleNameRaw = typeof p.role === 'string' ? p.role : '';
    var roleName = roleNameRaw.trim();
    var contextLabel = "".concat(roleName || 'Monitor', " handheld");
    var key = "handheld:".concat(roleName, ":").concat(index);
    var storedValue = monitorBatterySelections[key];
    var selectedValue = typeof storedValue === 'string' && storedValue.trim() || bebob98;
    if (!selectedValue) return;
    var roleId = (roleName || 'Monitor').replace(/[^A-Za-z0-9]/g, '') || 'Monitor';
    var selectId = "gearListMonitorBatteryHandheld".concat(index).concat(roleId);
    var optionsHtml = buildBatteryOptions(selectedValue);
    var selectHtml = "<select id=\"".concat(selectId, "\" data-monitor-battery-key=\"").concat(escapeHtml(key), "\" data-monitor-battery-type=\"handheld\" data-monitor-battery-role=\"").concat(escapeHtml(roleName), "\">").concat(optionsHtml, "</select>");
    var dataName = "Monitoring Battery ".concat(contextLabel);
    var quantityAttr = ' data-gear-quantity="3"';
    var labelAttr = ' data-gear-label="Monitoring Battery"';
    var attributesAttr = contextLabel ? " data-gear-attributes=\"".concat(escapeHtml(contextLabel), "\"") : '';
    var textHtml = "3x ".concat(selectHtml, " (").concat(escapeHtml(contextLabel), ")");
    monitoringBatteryItems.push("<span class=\"gear-item\" data-gear-name=\"".concat(escapeHtml(dataName), "\"").concat(quantityAttr).concat(labelAttr).concat(attributesAttr).concat(rentalNoteAttr, "><span class=\"gear-item-text\">").concat(textHtml, "</span><span class=\"gear-item-note\" hidden></span></span>"));
  });
  var bebob290 = Object.keys(batteryDatabase).find(function (n) {
    return /V290RM-Cine/i.test(n);
  }) || 'Bebob V290RM-Cine';
  largeMonitorPrefs.forEach(function (p, index) {
    var roleNameRaw = typeof p.role === 'string' ? p.role : '';
    var roleName = roleNameRaw.trim();
    var contextLabel = "".concat(roleName || 'Monitor', " 15-21\"");
    var key = "large:".concat(roleName, ":").concat(index);
    var storedValue = monitorBatterySelections[key];
    var selectedValue = typeof storedValue === 'string' && storedValue.trim() || bebob290;
    if (!selectedValue) return;
    var roleId = (roleName || 'Monitor').replace(/[^A-Za-z0-9]/g, '') || 'Monitor';
    var selectId = "gearListMonitorBatteryLarge".concat(index).concat(roleId);
    var optionsHtml = buildBatteryOptions(selectedValue);
    var selectHtml = "<select id=\"".concat(selectId, "\" data-monitor-battery-key=\"").concat(escapeHtml(key), "\" data-monitor-battery-type=\"large\" data-monitor-battery-role=\"").concat(escapeHtml(roleName), "\">").concat(optionsHtml, "</select>");
    var dataName = "Monitoring Battery ".concat(contextLabel);
    var quantityAttr = ' data-gear-quantity="2"';
    var labelAttr = ' data-gear-label="Monitoring Battery"';
    var attributesAttr = contextLabel ? " data-gear-attributes=\"".concat(escapeHtml(contextLabel), "\"") : '';
    var textHtml = "2x ".concat(selectHtml, " (").concat(escapeHtml(contextLabel), ")");
    monitoringBatteryItems.push("<span class=\"gear-item\" data-gear-name=\"".concat(escapeHtml(dataName), "\"").concat(quantityAttr).concat(labelAttr).concat(attributesAttr).concat(rentalNoteAttr, "><span class=\"gear-item-text\">").concat(textHtml, "</span><span class=\"gear-item-note\" hidden></span></span>"));
  });
  addRow('Monitoring Batteries', monitoringBatteryItems.length ? monitoringBatteryItems.join('<br>') : '');
  addRow('Chargers', formatItems(chargersAcc));
  addRow('Monitoring', monitoringItems);
  ensureItems(monitoringSupportAcc, 'accessories.monitoringSupport');
  var monitoringSupportHardware = formatItems(monitoringSupportAcc);
  var monitoringSupportItems = monitoringSupportHardware;
  addRow('Monitoring support', monitoringSupportItems);
  var cartsTransportationItems = [];
  ensureItems(cartsTransportationItems, 'accessories.carts');
  var gripItems = [];
  var needsStandardTripod = false;
  var sliderSelectHtml = '';
  var easyrigSelectHtml = '';
  handheldPrefs.forEach(function (p) {
    gripItems.push("Avenger C-Stand Sliding Leg 20\" (".concat(p.role, " handheld)"));
    gripItems.push("Steelfingers Wheel C-Stand 3er Set (".concat(p.role, " handheld)"));
    gripItems.push("Lite-Tite Swivel Aluminium Umbrella Adapter (".concat(p.role, " handheld)"));
    riggingAcc.push("Spigot with male 3/8\" and 1/4\" (".concat(p.role, " handheld)"));
  });
  largeMonitorPrefs.forEach(function (p) {
    gripItems.push("Matthews Monitor Stand II (249562) (".concat(p.role, " 15-21\")"));
    gripItems.push("Avenger C590 Conka Bonka Stativ-Verl\xE4ngerungen Set (".concat(p.role, " 15-21\")"));
    gripItems.push("Impact Baby to Junior Receiver Adapter (".concat(p.role, " 15-21\")"));
    gripItems.push("Matthews BIG F'ING Monitor Wheel Set (3 pieces) (".concat(p.role, " 15-21\")"));
    riggingAcc.push("ULCS Bracket with 1/4\" to 1/4\" (".concat(p.role, " 15-21\")"));
    gripItems.push("Manfrotto 635 Quick-Action Super Clamp (".concat(p.role, " 15-21\")"));
    riggingAcc.push("Spigot with male 3/8\" and 1/4\" (".concat(p.role, " 15-21\")"));
    riggingAcc.push("Cine Quick Release (".concat(p.role, " 15-21\")"));
    riggingAcc.push("D-Tap Splitter (".concat(p.role, " 15-21\")"));
    riggingAcc.push("D-Tap Splitter (".concat(p.role, " 15-21\")"));
  });
  if (isScenarioActive('Easyrig')) {
    var stabiliser = devices && devices.accessories && devices.accessories.cameraStabiliser && devices.accessories.cameraStabiliser['Easyrig 5 Vario'];
    var _opts = stabiliser && Array.isArray(stabiliser.options) ? stabiliser.options : [];
    var _options = ['no further stabilisation'].concat(_toConsumableArray(_opts));
    var optsHtml = _options.map(function (o) {
      return "<option value=\"".concat(escapeHtml(o), "\">").concat(escapeHtml(addArriKNumber(o)), "</option>");
    }).join('');
    easyrigSelectHtml = "1x Easyrig 5 Vario <select id=\"gearListEasyrig\">".concat(optsHtml, "</select>");
  }
  if (hasGimbal) {
    gripItems.push.apply(gripItems, _toConsumableArray(gimbalSelectionsFinal));
  }
  var frictionArmCount = hasGimbal ? 2 : 1;
  gripItems.push.apply(gripItems, _toConsumableArray(Array(frictionArmCount).fill('Manfrotto 244N Friktion Arm')));
  if (hasGimbal) {
    gripItems.push('Avenger D200B Grip Head');
    gripItems.push('Spigot with male 3/8" and 1/4"');
  }
  if (isScenarioActive('Cine Saddle')) gripItems.push('Cinekinetic Cinesaddle');
  if (isScenarioActive('Steadybag')) gripItems.push('Steadybag');
  if (isScenarioActive('Jib')) {
    gripItems.push('Pro Sup EJIb-Arm');
    gripItems.push('Jib counter weights');
    needsStandardTripod = true;
  }
  if (isScenarioActive('Slider')) {
    var _options2 = ['', '75er bowl', '100er bowl', '150er bowl', 'Mitchell Mount'].map(function (o) {
      return "<option value=\"".concat(escapeHtml(o), "\"").concat(o === info.sliderBowl ? ' selected' : '', ">").concat(escapeHtml(addArriKNumber(o)), "</option>");
    }).join('');
    sliderSelectHtml = "1x Prosup Tango Roller <select id=\"gearListSliderBowl\">".concat(_options2, "</select>");
    gripItems.push('Avenger Combo Stand 10 A1010CS 64-100 cm black');
    gripItems.push('Avenger Combo Stand 10 A1010CS 64-100 cm black');
    gripItems.push('Avenger Combo Stand 20 A1020B 110-198 cm black');
    gripItems.push('Avenger Combo Stand 20 A1020B 110-198 cm black');
    gripItems.push('Apple Box Set / Bühnenkisten Set');
    gripItems.push('Apple Box Set / Bühnenkisten Set');
    gripItems.push('Paganini set');
    gripItems.push('Sand bag (Slider)');
    gripItems.push('Sand bag (Slider)');
    gripItems.push('Cable mat');
    gripItems.push('Cable mat');
    gripItems.push('Cable mat');
  }
  if (isScenarioActive('Slider') && isScenarioActive('Undersling mode')) {
    gripItems.push('Tango Beam');
  }
  if (isScenarioActive('Outdoor')) {
    riggingAcc.push('Spigot with male 3/8" and 1/4" (Focus Umbrella)');
  }
  if (isAnyScenarioActive(['Extreme heat', 'Extreme rain', 'Rain Machine'])) {
    gripItems.push('Large Umbrella');
    gripItems.push('Avenger A5036CS Roller 36 Low Base with Umbrella Mounting');
  }
  var tripodTypes = info.tripodTypes ? info.tripodTypes.split(',').map(function (s) {
    return s.trim();
  }).filter(Boolean) : [];
  var bowlType = info.tripodBowl;
  var spreader = info.tripodSpreader;
  var headBrand = info.tripodHeadBrand;
  var headMap = {
    'OConnor': {
      '100mm bowl': "O'Connor Ultimate 1040 Fluid-Head",
      '150mm bowl': "O'Connor Ultimate 2560 Fluid-Head",
      'Mitchell Mount': "O'Connor Ultimate 2560 Fluid-Head"
    },
    'Sachtler': {
      '75mm bowl': 'Sachtler aktiv8T S2068T',
      '100mm bowl': 'Sachtler aktiv18T S2088T',
      '150mm bowl': 'Sachtler Cine 30 3007'
    }
  };
  var headName = headMap[headBrand] && headMap[headBrand][bowlType];
  if (headName) {
    gripItems.push("".concat(headName, " ").concat(bowlType));
  }
  tripodTypes.forEach(function (t) {
    var typeLabel = t === 'Hi-Head' ? 'Hi-Head' : "".concat(t, " Tripod");
    var base = bowlType ? "".concat(bowlType, " ").concat(typeLabel) : typeLabel;
    if (t === 'Hi-Head') {
      gripItems.push(base);
    } else if (spreader) {
      gripItems.push("".concat(base, " + ").concat(spreader));
    } else {
      gripItems.push(base);
    }
    if (t === 'Short') {
      gripItems.push('Sand bag (Short Tripod)');
    }
    if (t === 'Hi-Head') {
      gripItems.push('Sand bag (Hi-Head)');
    }
  });
  if (needsStandardTripod && !gripItems.some(function (item) {
    return /Long Tripod/.test(item);
  })) {
    gripItems.push('Long Tripod');
  }
  var standCount = gripItems.filter(function (item) {
    return /\bstand\b/i.test(item) && !/wheel/i.test(item);
  }).length;
  if (standCount) {
    gripItems.push.apply(gripItems, _toConsumableArray(Array(standCount * 3).fill('Tennis ball')));
  }
  var maglinerCount = cartsTransportationItems.filter(function (item) {
    return /Magliner/i.test(item);
  }).length;
  if (maglinerCount) {
    gripItems.push.apply(gripItems, _toConsumableArray(Array(maglinerCount * 2).fill('Wooden wedge')));
  }
  ensureItems(riggingAcc, 'accessories.rigging');
  ensureItems(gripItems, 'accessories.grip');
  var riggingItems = formatItems(riggingAcc);
  addRow('Rigging', riggingItems);
  var powerItems = ['Power Cable Drum 25-50 m'].concat(_toConsumableArray(Array(2).fill('Power Cable 10 m')), _toConsumableArray(Array(2).fill('Power Cable 5 m')), _toConsumableArray(Array(3).fill('Power Strip')), _toConsumableArray(Array(3).fill('PRCD-S (Portable Residual Current Device-Safety)')), _toConsumableArray(Array(3).fill('Power Three Way Splitter')));
  if (isScenarioActive('Studio')) {
    powerItems.push('Camera Power Supply');
  }
  ensureItems(powerItems, 'accessories.power');
  addRow('Power', formatItems(powerItems));
  addRow('Grip', [sliderSelectHtml, formatItems(gripItems), easyrigSelectHtml].filter(Boolean).join('<br>'));
  addRow('Carts and Transportation', formatItems(cartsTransportationItems));
  var miscExcluded = new Set(['D-Tap to LEMO 2-pin', 'HDMI Cable', 'BNC SDI Cable', 'Ultraslim BNC Cable 0.5 m']);
  var miscItems = _toConsumableArray(miscAcc).filter(function (item) {
    return !miscExcluded.has(item);
  });
  var consumables = [];
  var hasViewfinder = Array.isArray(cam === null || cam === void 0 ? void 0 : cam.viewfinder) && cam.viewfinder.length > 0;
  var eyeLeatherColor = info.viewfinderEyeLeatherColor || 'red';
  var gaffTapeSelections = [{
    id: 1,
    color: info.proGaffColor1 || 'red',
    width: info.proGaffWidth1 || '24mm'
  }, {
    id: 2,
    color: info.proGaffColor2 || 'blue',
    width: info.proGaffWidth2 || '24mm'
  }];
  var baseConsumables = [{
    name: 'Kimtech Wipes',
    count: 1
  }, {
    name: 'Sprigs Red 1/4"',
    count: 1,
    noScale: true
  }, {
    name: 'Clapper Stick',
    count: 2,
    klappen: true
  }];
  var eyeLeatherCount = hasViewfinder ? 2 : 0;
  var shootDays = 0;
  var isWinterShoot = false;
  var shootRanges = Array.isArray(info.shootingDays) ? info.shootingDays : info.shootingDays ? [info.shootingDays] : [];
  var winterMonths = new Set([9, 10, 11, 0, 1, 2, 3, 4]);
  shootRanges.forEach(function (r) {
    var parts = r.split(' to ');
    if (parts.length === 2) {
      var start = new Date(parts[0]);
      var end = new Date(parts[1]);
      if (!isNaN(start) && !isNaN(end)) {
        shootDays += Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
        if (!isWinterShoot) {
          var m = new Date(start);
          m.setHours(0, 0, 0, 0);
          while (m <= end) {
            if (winterMonths.has(m.getMonth())) {
              isWinterShoot = true;
              break;
            }
            m.setMonth(m.getMonth() + 1);
          }
        }
      }
    }
  });
  var multiplier = 1;
  if (shootDays > 21) {
    multiplier = 4;
  } else if (shootDays > 14) {
    multiplier = 3;
  } else if (shootDays > 7) {
    multiplier = 2;
  }
  var klappenMultiplier = multiplier % 2 === 0 ? multiplier : Math.max(1, multiplier - 1);
  for (var _i15 = 0, _baseConsumables = baseConsumables; _i15 < _baseConsumables.length; _i15++) {
    var item = _baseConsumables[_i15];
    var _count2 = item.count;
    if (item.noScale) {} else if (item.klappen) {
      _count2 *= klappenMultiplier;
    } else {
      _count2 *= multiplier;
    }
    for (var _i16 = 0; _i16 < _count2; _i16++) consumables.push(item.name);
  }
  if (eyeLeatherCount) eyeLeatherCount *= multiplier;
  var needsRainProtection = isAnyScenarioActive(['Outdoor', 'Extreme rain', 'Rain Machine']);
  if (needsRainProtection && selectedNames.camera) {
    miscItems.push("Rain Cover ".concat(addArriKNumber(selectedNames.camera)));
  }
  var needsUmbrellas = needsRainProtection || isScenarioActive('Extreme heat');
  if (needsUmbrellas) {
    if (!miscItems.includes('Umbrella for Focus Monitor')) miscItems.push('Umbrella for Focus Monitor');
    if (!miscItems.includes('Umbrella Magliner incl Mounting to Magliner')) miscItems.push('Umbrella Magliner incl Mounting to Magliner');
  }
  if (needsRainProtection) {
    var _monitorSizes = [];
    if (monitorSelect && monitorSelect.value) {
      var m = devices.monitors[monitorSelect.value];
      if (m && m.screenSizeInches) _monitorSizes.push(m.screenSizeInches);
    }
    var monitorsAbove10 = _monitorSizes.filter(function (s) {
      return s > 10;
    }).length;
    var monitorsUnder10 = _monitorSizes.filter(function (s) {
      return s <= 10;
    }).length;
    for (var _i17 = 0; _i17 < monitorsAbove10 + 2; _i17++) consumables.push('CapIt Large');
    for (var _i18 = 0; _i18 < monitorsUnder10 + 3; _i18++) consumables.push('CapIt Medium');
    for (var _i19 = 0; _i19 < 3; _i19++) consumables.push('CapIt Small');
    for (var _i20 = 0; _i20 < 10; _i20++) consumables.push('Shower Cap');
    consumables.push('Magliner Rain Cover Transparent');
  }
  var needsHairDryer = isWinterShoot && isScenarioActive('Outdoor') || isScenarioActive('Extreme cold (snow)');
  var needsHandAndFeetWarmers = isScenarioActive('Extreme cold (snow)');
  if (needsHairDryer) {
    miscItems.push('Hair Dryer');
    if (["Sony Venice 2", "Sony Venice"].includes(selectedNames.camera)) {
      miscItems.push('Denz C0100072 Shut-Eye Heater für Sony');
    } else if (["Arri Alexa Mini", "Arri Amira"].includes(selectedNames.camera)) {
      miscItems.push('Arri K2.0003898 Heated Eyecup HE-7 for the MVF-1');
    }
  }
  if (needsHandAndFeetWarmers) {
    var warmersCount = Math.max(shootDays, 1) * 2;
    for (var _i21 = 0; _i21 < warmersCount; _i21++) miscItems.push('Hand Warmers');
    for (var _i22 = 0; _i22 < warmersCount; _i22++) miscItems.push('Feet Warmers');
  }
  var gaffColors = [['red', 'Red'], ['blue', 'Blue'], ['green', 'Green'], ['yellow', 'Yellow'], ['black', 'Black'], ['pink', 'Pink'], ['orange', 'Orange'], ['violette', 'Violette'], ['white', 'White']];
  var gaffWidths = ['6mm', '12mm', '19mm', '24mm', '48mm'];
  var proGaffCount = multiplier;
  var proGaffHtml = gaffTapeSelections.map(function (_ref82) {
    var id = _ref82.id,
      color = _ref82.color,
      width = _ref82.width;
    var colorOpts = gaffColors.map(function (_ref83) {
      var _ref84 = _slicedToArray(_ref83, 2),
        val = _ref84[0],
        label = _ref84[1];
      return "<option value=\"".concat(val, "\"").concat(val === color ? ' selected' : '', ">").concat(label, "</option>");
    }).join('');
    var widthOpts = gaffWidths.map(function (val) {
      return "<option value=\"".concat(val, "\"").concat(val === width ? ' selected' : '', ">").concat(val, "</option>");
    }).join('');
    var quantityAttr = " data-gear-quantity=\"".concat(escapeHtml(String(proGaffCount)), "\"");
    var labelAttr = ' data-gear-label="Pro Gaff Tape"';
    var textHtml = "".concat(escapeHtml(String(proGaffCount)), "x Pro Gaff Tape <select id=\"gearListProGaffColor").concat(id, "\">").concat(colorOpts, "</select> <select id=\"gearListProGaffWidth").concat(id, "\">").concat(widthOpts, "</select>");
    return "<span class=\"gear-item\" data-gear-name=\"Pro Gaff Tape\"".concat(quantityAttr).concat(labelAttr).concat(rentalNoteAttr, "><span class=\"gear-item-text\">").concat(textHtml, "</span><span class=\"gear-item-note\" hidden></span></span>");
  }).join('<br>');
  var eyeLeatherHtml = '';
  if (eyeLeatherCount) {
    var colors = [['red', 'Red'], ['blue', 'Blue'], ['natural', 'Natural'], ['green', 'Green'], ['purple', 'Purple'], ['orange', 'Orange'], ['gray', 'Gray'], ['yellow', 'Yellow'], ['jaguar', 'Jaguar'], ['killer bee', 'Killer Bee'], ['green rabbit', 'Green Rabbit'], ['black', 'Black']];
    var _options3 = colors.map(function (_ref85) {
      var _ref86 = _slicedToArray(_ref85, 2),
        val = _ref86[0],
        label = _ref86[1];
      return "<option value=\"".concat(val, "\"").concat(val === eyeLeatherColor ? ' selected' : '', ">").concat(label, "</option>");
    }).join('');
    var quantityAttr = " data-gear-quantity=\"".concat(escapeHtml(String(eyeLeatherCount)), "\"");
    var labelAttr = ' data-gear-label="Bluestar eye leather made of microfiber oval, large"';
    var textHtml = "".concat(escapeHtml(String(eyeLeatherCount)), "x Bluestar eye leather made of microfiber oval, large <select id=\"gearListEyeLeatherColor\">").concat(_options3, "</select>");
    eyeLeatherHtml = "<span class=\"gear-item\" data-gear-name=\"Bluestar eye leather made of microfiber oval, large\"".concat(quantityAttr).concat(labelAttr).concat(rentalNoteAttr, "><span class=\"gear-item-text\">").concat(textHtml, "</span><span class=\"gear-item-note\" hidden></span></span>");
  }
  addRow('Miscellaneous', formatItems(miscItems));
  addRow('Consumables', [eyeLeatherHtml, proGaffHtml, formatItems(consumables)].filter(Boolean).join('<br>'));
  var body = "<h2>".concat(projectTitle, "</h2>");
  if (infoHtml) body += infoHtml;
  var tableHtml = '<table class="gear-table">' + categoryGroups.join('') + '</table>';
  var infoForRules = _objectSpread(_objectSpread({}, info), {}, {
    cameraSelection: selectedNames.camera,
    monitorSelection: selectedNames.monitor,
    wirelessSelection: selectedNames.video,
    motorSelections: selectedNames.motors.slice(),
    controllerSelections: selectedNames.controllers.slice(),
    distanceSelection: selectedNames.distance
  });
  var adjustedTable = applyAutoGearRulesToTableHtml(tableHtml, infoForRules);
  body += '<h3>Gear List</h3>' + adjustedTable;
  return body;
}
function gearListGetCurrentHtmlImpl() {
  if (!gearListOutput && !projectRequirementsOutput) return '';
  var projHtml = '';
  if (projectRequirementsOutput) {
    var projClone = projectRequirementsOutput.cloneNode(true);
    var editBtn = projClone.querySelector('#editProjectBtn');
    if (editBtn) editBtn.remove();
    var t = projClone.querySelector('h2');
    if (t) t.remove();
    projHtml = projClone.innerHTML.trim();
  }
  var gearHtml = '';
  if (gearListOutput) {
    var clone = gearListOutput.cloneNode(true);
    var actions = clone.querySelector('#gearListActions');
    if (actions) actions.remove();
    var _editBtn = clone.querySelector('#editProjectBtn');
    if (_editBtn) _editBtn.remove();
    ['Director', 'Dop', 'Gaffer', 'Focus'].forEach(function (role) {
      var sel = clone.querySelector("#gearList".concat(role, "Monitor"));
      if (sel) {
        var originalSel = gearListOutput.querySelector("#gearList".concat(role, "Monitor"));
        var val = originalSel ? originalSel.value : sel.value;
        Array.from(sel.options).forEach(function (opt) {
          if (opt.value === val) {
            opt.setAttribute('selected', '');
          } else {
            opt.removeAttribute('selected');
          }
        });
      }
    });
    ['Director', 'Combo', 'Dop'].forEach(function (role) {
      var sel = clone.querySelector("#gearList".concat(role, "Monitor15"));
      if (sel) {
        var originalSel = gearListOutput.querySelector("#gearList".concat(role, "Monitor15"));
        var val = originalSel ? originalSel.value : sel.value;
        Array.from(sel.options).forEach(function (opt) {
          if (opt.value === val) {
            opt.setAttribute('selected', '');
          } else {
            opt.removeAttribute('selected');
          }
        });
      }
    });
    var cageSel = clone.querySelector('#gearListCage');
    if (cageSel) {
      var originalSel = gearListOutput.querySelector('#gearListCage');
      var val = originalSel ? originalSel.value : cageSel.value;
      Array.from(cageSel.options).forEach(function (opt) {
        if (opt.value === val) {
          opt.setAttribute('selected', '');
        } else {
          opt.removeAttribute('selected');
        }
      });
    }
    var easyrigSel = clone.querySelector('#gearListEasyrig');
    if (easyrigSel) {
      var _originalSel = gearListOutput.querySelector('#gearListEasyrig');
      var _val = _originalSel ? _originalSel.value : easyrigSel.value;
      Array.from(easyrigSel.options).forEach(function (opt) {
        if (opt.value === _val) {
          opt.setAttribute('selected', '');
        } else {
          opt.removeAttribute('selected');
        }
      });
    }
    var sliderSel = clone.querySelector('#gearListSliderBowl');
    if (sliderSel) {
      var _originalSel2 = gearListOutput.querySelector('#gearListSliderBowl');
      var _val2 = _originalSel2 ? _originalSel2.value : sliderSel.value;
      Array.from(sliderSel.options).forEach(function (opt) {
        if (opt.value === _val2) {
          opt.setAttribute('selected', '');
        } else {
          opt.removeAttribute('selected');
        }
      });
    }
    var monitorBatterySelects = clone.querySelectorAll('select[data-monitor-battery-key]');
    monitorBatterySelects.forEach(function (sel) {
      if (!sel.id) return;
      var originalSel = gearListOutput.querySelector("#".concat(sel.id));
      var val = originalSel ? originalSel.value : sel.value;
      Array.from(sel.options).forEach(function (opt) {
        if (opt.value === val) {
          opt.setAttribute('selected', '');
        } else {
          opt.removeAttribute('selected');
        }
      });
    });
    var eyeSel = clone.querySelector('#gearListEyeLeatherColor');
    if (eyeSel) {
      var _originalSel3 = gearListOutput.querySelector('#gearListEyeLeatherColor');
      var _val3 = _originalSel3 ? _originalSel3.value : eyeSel.value;
      Array.from(eyeSel.options).forEach(function (opt) {
        if (opt.value === _val3) {
          opt.setAttribute('selected', '');
        } else {
          opt.removeAttribute('selected');
        }
      });
    }
    [1, 2].forEach(function (i) {
      var colorSel = clone.querySelector("#gearListProGaffColor".concat(i));
      if (colorSel) {
        var _originalSel4 = gearListOutput.querySelector("#gearListProGaffColor".concat(i));
        var _val4 = _originalSel4 ? _originalSel4.value : colorSel.value;
        Array.from(colorSel.options).forEach(function (opt) {
          if (opt.value === _val4) {
            opt.setAttribute('selected', '');
          } else {
            opt.removeAttribute('selected');
          }
        });
      }
      var widthSel = clone.querySelector("#gearListProGaffWidth".concat(i));
      if (widthSel) {
        var _originalSel5 = gearListOutput.querySelector("#gearListProGaffWidth".concat(i));
        var _val5 = _originalSel5 ? _originalSel5.value : widthSel.value;
        Array.from(widthSel.options).forEach(function (opt) {
          if (opt.value === _val5) {
            opt.setAttribute('selected', '');
          } else {
            opt.removeAttribute('selected');
          }
        });
      }
    });
    clone.querySelectorAll('input[type="checkbox"]').forEach(function (cb) {
      if (cb.checked) {
        cb.setAttribute('checked', '');
      } else {
        cb.removeAttribute('checked');
      }
    });
    clone.querySelectorAll('[data-gear-custom-input]').forEach(function (input) {
      if (input && typeof input.getAttribute === 'function') {
        input.setAttribute('value', input.value);
      }
    });
    convertCustomItemsForStaticOutput(clone);
    var table = clone.querySelector('.gear-table');
    gearHtml = table ? '<h3>Gear List</h3>' + table.outerHTML : '';
  }
  if (!projHtml && !gearHtml) {
    return '';
  }
  var projectName = getCurrentProjectName();
  var titleHtml = projectName ? "<h2>".concat(projectName, "</h2>") : '';
  var combined = "".concat(titleHtml).concat(projHtml).concat(gearHtml).trim();
  if (combined && typeof globalThis !== 'undefined') {
    globalThis.__cineLastGearListHtml = combined;
  }
  return combined;
}
function getGearListSelectors() {
  var selectors = {};
  var collectSelectValue = function collectSelectValue(sel) {
    if (!sel || !sel.id) return;
    if (sel.multiple) {
      var optionNodes = sel.selectedOptions && typeof sel.selectedOptions.length === 'number' ? Array.from(sel.selectedOptions) : Array.from(sel.options || []).filter(function (opt) {
        return opt.selected;
      });
      selectors[sel.id] = optionNodes.map(function (opt) {
        return opt.value;
      });
    } else {
      selectors[sel.id] = sel.value;
    }
  };
  if (gearListOutput) {
    gearListOutput.querySelectorAll('select[id]').forEach(function (sel) {
      collectSelectValue(sel);
    });
  }
  var filterStorage = typeof filterDetailsStorage !== 'undefined' ? filterDetailsStorage : null;
  if (filterStorage && typeof filterStorage.querySelectorAll === 'function') {
    filterStorage.querySelectorAll('select[id]').forEach(function (sel) {
      if (!sel || !sel.id || Object.prototype.hasOwnProperty.call(selectors, sel.id)) return;
      collectSelectValue(sel);
    });
  }
  var customState = readCustomItemsState();
  if (customState && Object.keys(customState).length) {
    selectors.__customItems = customState;
  }
  if (gearListOutput) {
    var rentalState = {};
    gearListOutput.querySelectorAll('.gear-item[data-gear-name]').forEach(function (span) {
      var name = span.getAttribute('data-gear-name');
      if (!name) return;
      if (span.getAttribute('data-rental-excluded') === 'true') {
        rentalState[name] = true;
      }
    });
    if (Object.keys(rentalState).length) {
      selectors.__rentalExclusions = rentalState;
    }
  }
  return selectors;
}
function cloneGearListSelectors(selectors) {
  if (!selectors || _typeof(selectors) !== 'object') return {};
  var _cloneValue = function cloneValue(value) {
    if (Array.isArray(value)) {
      return value.map(function (item) {
        return _cloneValue(item);
      });
    }
    if (value && _typeof(value) === 'object') {
      var nested = {};
      Object.entries(value).forEach(function (_ref87) {
        var _ref88 = _slicedToArray(_ref87, 2),
          key = _ref88[0],
          nestedValue = _ref88[1];
        nested[key] = _cloneValue(nestedValue);
      });
      return nested;
    }
    if (value === undefined || value === null) {
      return '';
    }
    return typeof value === 'string' ? value : String(value);
  };
  var clone = {};
  Object.entries(selectors).forEach(function (_ref89) {
    var _ref90 = _slicedToArray(_ref89, 2),
      id = _ref90[0],
      value = _ref90[1];
    if (!id || typeof id !== 'string') return;
    clone[id] = _cloneValue(value);
  });
  return clone;
}
function applyGearListSelectors(selectors) {
  if (!selectors) return;
  var setSelectValue = function setSelectValue(id, value) {
    if (typeof document === 'undefined') return;
    var sel = document.getElementById(id);
    if (!sel) return;
    if (sel.multiple) {
      var values = Array.isArray(value) ? value.map(function (item) {
        return typeof item === 'string' ? item : String(item !== null && item !== void 0 ? item : '');
      }) : [typeof value === 'string' ? value : String(value !== null && value !== void 0 ? value : '')];
      var normalized = new Set(values);
      Array.from(sel.options).forEach(function (opt) {
        var shouldSelect = normalized.has(opt.value);
        opt.selected = shouldSelect;
        if (shouldSelect) {
          opt.setAttribute('selected', '');
        } else {
          opt.removeAttribute('selected');
        }
      });
    } else {
      var nextValue = Array.isArray(value) ? value[0] : value;
      if (nextValue !== undefined && nextValue !== null) {
        sel.value = typeof nextValue === 'string' ? nextValue : String(nextValue);
      } else {
        sel.value = '';
      }
    }
    try {
      sel.dispatchEvent(new Event('change'));
    } catch (dispatchError) {
      void dispatchError;
    }
  };
  Object.entries(selectors).forEach(function (_ref91) {
    var _ref92 = _slicedToArray(_ref91, 2),
      id = _ref92[0],
      value = _ref92[1];
    if (id === '__customItems' || id === '__rentalExclusions') return;
    setSelectValue(id, value);
  });
  applyCustomItemsState(selectors.__customItems || {});
  applyRentalExclusionsState(selectors.__rentalExclusions || {});
}
function convertCustomItemsForStaticOutput(root) {
  if (!root) return;
  var doc = root.ownerDocument || (typeof document !== 'undefined' ? document : null);
  if (!doc) return;
  var isLiveDom = typeof root.isConnected === 'boolean' ? root.isConnected : typeof doc.contains === 'function' && doc.contains(root);
  if (isLiveDom) {
    return;
  }
  var sections = root.querySelectorAll('.gear-custom-section');
  sections.forEach(function (section) {
    var itemsContainer = section.querySelector('.gear-custom-items');
    var parent = section.parentElement;
    if (!itemsContainer || !parent) {
      section.remove();
      return;
    }
    section.querySelectorAll('.gear-rental-toggle').forEach(function (btn) {
      return btn.remove();
    });
    var previews = Array.from(itemsContainer.querySelectorAll('.gear-custom-item-preview'));
    var entriesWithValues = previews.map(function (preview) {
      return {
        preview: preview,
        value: (preview.textContent || '').replace(/\s+/g, ' ').trim()
      };
    }).filter(function (entry) {
      return entry.value;
    });
    var standardContainer = section.previousElementSibling;
    if (!standardContainer || !standardContainer.classList.contains('gear-standard-items')) {
      standardContainer = doc.createElement('div');
      standardContainer.className = 'gear-standard-items';
      parent.insertBefore(standardContainer, section);
    }
    if (entriesWithValues.length) {
      entriesWithValues.forEach(function (_ref93) {
        var value = _ref93.value,
          preview = _ref93.preview;
        if (standardContainer.childNodes.length) {
          var last = standardContainer.lastChild;
          var isBreak = last && last.nodeType === 1 && last.tagName === 'BR';
          if (!isBreak) {
            standardContainer.appendChild(doc.createElement('br'));
          }
        }
        var span = doc.createElement('span');
        span.className = 'gear-item';
        span.textContent = value;
        span.setAttribute('data-gear-name', value);
        span.setAttribute('data-gear-custom-output', 'true');
        var sourceEntry = preview.closest('.gear-custom-item');
        if (sourceEntry) {
          var rentalNote = sourceEntry.getAttribute('data-rental-note');
          if (rentalNote) {
            span.setAttribute('data-rental-note', rentalNote);
          }
          if (sourceEntry.getAttribute('data-rental-excluded') === 'true') {
            span.setAttribute('data-rental-excluded', 'true');
            span.classList.add('gear-item-rental-excluded');
          }
        }
        standardContainer.appendChild(span);
      });
    }
    section.remove();
  });
  root.querySelectorAll('.gear-custom-add-btn').forEach(function (btn) {
    return btn.remove();
  });
  root.querySelectorAll('.gear-rental-toggle').forEach(function (btn) {
    return btn.remove();
  });
  root.querySelectorAll('.gear-item-edit-btn').forEach(function (btn) {
    return btn.remove();
  });
  root.querySelectorAll('.gear-custom-item-actions').forEach(function (actions) {
    return actions.remove();
  });
}
function cloneProjectInfoForStorage(info) {
  if (info === undefined || info === null) {
    return null;
  }
  if (_typeof(info) !== 'object') {
    return info;
  }
  if (typeof SETUPS_DEEP_CLONE === 'function') {
    try {
      return SETUPS_DEEP_CLONE(info);
    } catch (error) {
      console.warn('Failed to clone project info for storage', error);
    }
  }
  if (Array.isArray(info)) {
    return info.map(function (item) {
      return cloneProjectInfoForStorage(item);
    });
  }
  var clone = {};
  Object.keys(info).forEach(function (key) {
    clone[key] = cloneProjectInfoForStorage(info[key]);
  });
  return clone;
}
function hasMeaningfulProjectInfoValue(value) {
  if (value === null || value === undefined) {
    return false;
  }
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  if (typeof value === 'number') {
    return !Number.isNaN(value);
  }
  if (typeof value === 'boolean') {
    return value;
  }
  if (Array.isArray(value)) {
    return value.some(function (entry) {
      return hasMeaningfulProjectInfoValue(entry);
    });
  }
  if (_typeof(value) === 'object') {
    return Object.values(value).some(function (entry) {
      return hasMeaningfulProjectInfoValue(entry);
    });
  }
  return false;
}
function mergeProjectInfoSnapshots(base, updates) {
  var baseHasData = hasMeaningfulProjectInfoValue(base);
  var updateHasData = hasMeaningfulProjectInfoValue(updates);
  if (!updateHasData) {
    return baseHasData ? cloneProjectInfoForStorage(base) : cloneProjectInfoForStorage(updates);
  }
  if (!baseHasData) {
    return cloneProjectInfoForStorage(updates);
  }
  if (Array.isArray(base) && Array.isArray(updates)) {
    return cloneProjectInfoForStorage(updates.length ? updates : base);
  }
  if (_typeof(base) === 'object' && _typeof(updates) === 'object') {
    var merged = cloneProjectInfoForStorage(base);
    Object.keys(updates).forEach(function (key) {
      merged[key] = mergeProjectInfoSnapshots(merged[key], updates[key]);
    });
    return merged;
  }
  return cloneProjectInfoForStorage(updates);
}
function normalizeRequirementNodeValue(node) {
  if (!node) return '';
  var textNodeType = typeof Node === 'undefined' ? 3 : Node.TEXT_NODE;
  var elementNodeType = typeof Node === 'undefined' ? 1 : Node.ELEMENT_NODE;
  if (node.nodeType === textNodeType) {
    return node.textContent || '';
  }
  if (node.nodeType === elementNodeType) {
    var tag = node.tagName ? node.tagName.toLowerCase() : '';
    if (tag === 'br') {
      return '\n';
    }
    return Array.from(node.childNodes || []).map(normalizeRequirementNodeValue).join('');
  }
  return '';
}
function collectProjectInfoFromRequirementsGrid() {
  var _texts$currentLang6, _texts$en9;
  if (!projectRequirementsOutput) return null;
  var boxes = Array.from(projectRequirementsOutput.querySelectorAll('.requirement-box'));
  if (!boxes.length) {
    return null;
  }
  var info = {};
  var projectLabels = ((_texts$currentLang6 = texts[currentLang]) === null || _texts$currentLang6 === void 0 ? void 0 : _texts$currentLang6.projectFields) || ((_texts$en9 = texts.en) === null || _texts$en9 === void 0 ? void 0 : _texts$en9.projectFields) || {};
  boxes.forEach(function (box) {
    if (!box || typeof box.getAttribute !== 'function') return;
    var field = box.getAttribute('data-field');
    if (!field) return;
    var valueEl = box.querySelector('.req-value');
    if (!valueEl) return;
    var rawValue = Array.from(valueEl.childNodes || []).map(normalizeRequirementNodeValue).join('');
    var normalized = rawValue.replace(/\r\n?/g, '\n').split('\n').map(function (segment) {
      return segment.replace(/\s+/g, ' ').trim();
    }).filter(function (segment) {
      return segment;
    });
    if (!normalized.length) return;
    var text = normalized.join('\n');
    if (!Object.prototype.hasOwnProperty.call(info, field)) {
      info[field] = text;
    }
    if (field === 'productionCompany') {
      var expanded = expandCombinedProductionCompanyInfo(text, projectLabels);
      if (expanded && _typeof(expanded) === 'object') {
        Object.entries(expanded).forEach(function (_ref94) {
          var _ref95 = _slicedToArray(_ref94, 2),
            expandedField = _ref95[0],
            expandedValue = _ref95[1];
          if (expandedField === 'productionCompany') {
            info.productionCompany = expandedValue;
            return;
          }
          if (!Object.prototype.hasOwnProperty.call(info, expandedField)) {
            info[expandedField] = expandedValue;
          }
        });
      }
    }
  });
  return Object.keys(info).length ? info : null;
}
function saveCurrentGearList() {
  if (factoryResetInProgress) return;
  if (isProjectPersistenceSuspended()) return;
  var html = gearListGetCurrentHtmlImpl();
  var normalizedHtml = typeof html === 'string' ? html.trim() : '';
  var gearListGenerated = Boolean(normalizedHtml);
  var info = projectForm ? collectProjectFormData() : {};
  info.sliderBowl = getSetupsCoreValue('getSliderBowlValue');
  info.easyrig = getSetupsCoreValue('getEasyrigValue');
  var previousProjectInfo = currentProjectInfo && (typeof currentProjectInfo === "undefined" ? "undefined" : _typeof(currentProjectInfo)) === 'object' ? currentProjectInfo : null;
  var requirementsVisible = Boolean(projectRequirementsOutput && projectRequirementsOutput.querySelector('.requirement-box'));
  var pendingProjectInfo = deriveProjectInfo(info);
  var powerSelectionSnapshot = getPowerSelectionSnapshot();
  var gearSelectorsRaw = getGearListSelectors();
  var gearSelectors = cloneGearListSelectors(gearSelectorsRaw);
  var hasGearSelectors = Object.keys(gearSelectors).length > 0;
  var nameState = typeof getSetupNameState === 'function' ? getSetupNameState() : null;
  if (typeof getProjectAutoSaveOverrides === 'function') {
    var overrides = getProjectAutoSaveOverrides();
    if (overrides && _typeof(overrides) === 'object' && overrides.setupNameState && _typeof(overrides.setupNameState) === 'object') {
      var normalize = function normalize(value) {
        return typeof value === 'string' ? value.trim() : '';
      };
      var rawOverride = overrides.setupNameState;
      var overrideTyped = normalize(rawOverride.typedName);
      var overrideSelected = normalize(rawOverride.selectedName);
      var overrideStorage = normalize(typeof rawOverride.storageKey === 'string' ? rawOverride.storageKey : overrideSelected || overrideTyped);
      var renameOverride = typeof rawOverride.renameInProgress === 'boolean' ? rawOverride.renameInProgress : Boolean(overrideSelected && overrideTyped && overrideTyped !== overrideSelected);
      nameState = {
        typedName: overrideTyped,
        selectedName: overrideSelected,
        storageKey: overrideStorage,
        renameInProgress: renameOverride
      };
    }
  }
  var fallbackNormalize = function fallbackNormalize(value) {
    if (typeof value !== 'string') return '';
    return value.trim();
  };
  var selectedStorageKey = nameState ? nameState.selectedName : fallbackNormalize(setupSelect && typeof setupSelect.value === 'string' ? setupSelect.value : '');
  var typedStorageKey = nameState ? nameState.typedName : fallbackNormalize(setupNameInput && typeof setupNameInput.value === 'string' ? setupNameInput.value : '');
  var projectStorageKey = nameState ? nameState.storageKey : selectedStorageKey || typedStorageKey;
  var renameInProgress = nameState ? nameState.renameInProgress : Boolean(selectedStorageKey && typedStorageKey && selectedStorageKey !== typedStorageKey);
  var effectiveStorageKey = renameInProgress ? selectedStorageKey || projectStorageKey : projectStorageKey;
  if (!pendingProjectInfo && requirementsVisible) {
    if (previousProjectInfo && Object.keys(previousProjectInfo).length) {
      pendingProjectInfo = previousProjectInfo;
    } else if (typeof loadProject === 'function') {
      var fallbackKey = typeof effectiveStorageKey === 'string' ? effectiveStorageKey : typeof projectStorageKey === 'string' && projectStorageKey ? projectStorageKey : typeof selectedStorageKey === 'string' ? selectedStorageKey : '';
      if (typeof fallbackKey === 'string') {
        var existingProject = loadProject(fallbackKey);
        if (existingProject && existingProject.projectInfo && Object.keys(existingProject.projectInfo).length) {
          pendingProjectInfo = cloneProjectInfoForStorage(existingProject.projectInfo);
        }
      }
    }
    if (!pendingProjectInfo) {
      var gridInfo = collectProjectInfoFromRequirementsGrid();
      if (gridInfo) {
        pendingProjectInfo = deriveProjectInfo(gridInfo) || gridInfo;
      }
    }
  }
  currentProjectInfo = pendingProjectInfo;
  var projectInfoForStorage = typeof createProjectInfoSnapshotForStorage === 'function' ? createProjectInfoSnapshotForStorage(currentProjectInfo, {
    projectNameOverride: renameInProgress ? selectedStorageKey || projectStorageKey : undefined
  }) : currentProjectInfo;
  var projectInfoSnapshot = cloneProjectInfoForStorage(projectInfoForStorage);
  var projectInfoSignature = projectInfoSnapshot ? stableStringify(projectInfoSnapshot) : '';
  var projectInfoSnapshotForSetups = projectInfoSnapshot ? cloneProjectInfoForStorage(projectInfoSnapshot) : null;
  var projectRulesRaw = getProjectScopedAutoGearRules();
  var projectRulesSnapshot = projectRulesRaw && projectRulesRaw.length ? cloneProjectInfoForStorage(projectRulesRaw) : null;
  var projectRulesSnapshotForSetups = projectRulesSnapshot ? cloneProjectInfoForStorage(projectRulesSnapshot) : null;
  var diagramPositionsSnapshot = null;
  var diagramPositionsSnapshotForSetups = null;
  if (typeof getDiagramManualPositions === 'function') {
    var positions = getDiagramManualPositions();
    if (positions && Object.keys(positions).length) {
      diagramPositionsSnapshot = cloneProjectInfoForStorage(positions);
      diagramPositionsSnapshotForSetups = cloneProjectInfoForStorage(diagramPositionsSnapshot);
    }
  }
  if (typeof saveProject === 'function' && typeof effectiveStorageKey === 'string') {
    if (typeof setActiveProjectCompressionHold === 'function') {
      setActiveProjectCompressionHold(effectiveStorageKey);
    }
    var payload = {
      projectInfo: projectInfoSnapshot,
      gearListAndProjectRequirementsGenerated: gearListGenerated
    };
    if (normalizedHtml) {
      payload.gearList = normalizedHtml;
    }
    if (powerSelectionSnapshot) {
      payload.powerSelection = powerSelectionSnapshot;
    }
    if (hasGearSelectors) {
      payload.gearSelectors = gearSelectors;
    }
    if (diagramPositionsSnapshot) {
      payload.diagramPositions = diagramPositionsSnapshot;
    }
    if (projectRulesSnapshot && projectRulesSnapshot.length) {
      payload.autoGearRules = projectRulesSnapshot;
    }
    saveProject(effectiveStorageKey, payload, {
      skipOverwriteBackup: true
    });
  }
  if (!selectedStorageKey) return;
  var setups = getSetups();
  var existing = setups[selectedStorageKey];
  if (!existing && !html && !currentProjectInfo && !(projectRulesSnapshot && projectRulesSnapshot.length) && !diagramPositionsSnapshot) {
    return;
  }
  var setup = existing || {};
  var changed = false;
  var existingGearList = typeof setup.gearList === 'string' ? setup.gearList : '';
  if (normalizedHtml) {
    if (existingGearList !== normalizedHtml) {
      setup.gearList = normalizedHtml;
      changed = true;
    }
  } else if (Object.prototype.hasOwnProperty.call(setup, 'gearList')) {
    delete setup.gearList;
    changed = true;
  }
  if (setup.gearListAndProjectRequirementsGenerated !== gearListGenerated) {
    setup.gearListAndProjectRequirementsGenerated = gearListGenerated;
    changed = true;
  }
  if (projectInfoSignature) {
    var existingInfo = setup.projectInfo;
    var existingInfoSignature = existingInfo ? stableStringify(existingInfo) : '';
    if (existingInfoSignature !== projectInfoSignature) {
      setup.projectInfo = projectInfoSnapshotForSetups;
      changed = true;
    }
  } else if (projectInfoSnapshot === null) {
    if (setup.projectInfo !== null) {
      setup.projectInfo = null;
      changed = true;
    }
  } else if (Object.prototype.hasOwnProperty.call(setup, 'projectInfo')) {
    delete setup.projectInfo;
    changed = true;
  }
  if (diagramPositionsSnapshotForSetups) {
    var existingDiagramSig = setup.diagramPositions ? stableStringify(setup.diagramPositions) : '';
    var newDiagramSig = stableStringify(diagramPositionsSnapshotForSetups);
    if (existingDiagramSig !== newDiagramSig) {
      setup.diagramPositions = diagramPositionsSnapshotForSetups;
      changed = true;
    }
  } else if (Object.prototype.hasOwnProperty.call(setup, 'diagramPositions')) {
    delete setup.diagramPositions;
    changed = true;
  }
  var existingRules = setup.autoGearRules;
  var existingRulesSig = existingRules && existingRules.length ? stableStringify(existingRules) : '';
  var newRulesSig = projectRulesSnapshot && projectRulesSnapshot.length ? stableStringify(projectRulesSnapshot) : '';
  if (newRulesSig) {
    if (existingRulesSig !== newRulesSig) {
      setup.autoGearRules = projectRulesSnapshotForSetups;
      changed = true;
    }
  } else if (Object.prototype.hasOwnProperty.call(setup, 'autoGearRules')) {
    delete setup.autoGearRules;
    changed = true;
  }
  var existingSelectors = setup.gearSelectors;
  var existingSelectorsSig = existingSelectors ? stableStringify(existingSelectors) : '';
  var newSelectorsSig = hasGearSelectors ? stableStringify(gearSelectors) : '';
  if (newSelectorsSig) {
    if (existingSelectorsSig !== newSelectorsSig) {
      setup.gearSelectors = gearSelectors;
      changed = true;
    }
  } else if (Object.prototype.hasOwnProperty.call(setup, 'gearSelectors')) {
    delete setup.gearSelectors;
    changed = true;
  }
  var existingPowerSelectionSig = setup.powerSelection ? stableStringify(setup.powerSelection) : '';
  var newPowerSelectionSig = powerSelectionSnapshot ? stableStringify(powerSelectionSnapshot) : '';
  if (newPowerSelectionSig) {
    if (existingPowerSelectionSig !== newPowerSelectionSig) {
      setup.powerSelection = powerSelectionSnapshot;
      changed = true;
    }
  } else if (Object.prototype.hasOwnProperty.call(setup, 'powerSelection')) {
    delete setup.powerSelection;
    changed = true;
  }
  if (!existing) {
    setups[selectedStorageKey] = setup;
    storeSetups(setups);
  } else if (changed) {
    setups[selectedStorageKey] = setup;
    storeSetups(setups);
  }
  return changed;
}
function deleteCurrentGearList() {
  if (!confirm(texts[currentLang].confirmDeleteGearList)) return false;
  if (!confirm(texts[currentLang].confirmDeleteGearListAgain)) return false;
  var backupName = ensureAutoBackupBeforeDeletion('delete gear list');
  if (!backupName) return false;
  var storageKey = getCurrentProjectStorageKey();
  if (typeof deleteProject === 'function') {
    deleteProject(storageKey);
  } else if (typeof saveProject === 'function') {
    saveProject(storageKey, {
      projectInfo: null,
      gearListAndProjectRequirementsGenerated: false
    }, {
      skipOverwriteBackup: true
    });
  }
  var setups = getSetups();
  if (setups && _typeof(setups) === 'object') {
    var existingSetup = setups[storageKey];
    if (existingSetup && _typeof(existingSetup) === 'object') {
      var changed = false;
      if (Object.prototype.hasOwnProperty.call(existingSetup, 'gearList')) {
        delete existingSetup.gearList;
        changed = true;
      }
      ['projectInfo', 'autoGearRules', 'diagramPositions', 'powerSelection', 'gearSelectors', 'gearListAndProjectRequirementsGenerated'].forEach(function (prop) {
        if (Object.prototype.hasOwnProperty.call(existingSetup, prop)) {
          delete existingSetup[prop];
          changed = true;
        }
      });
      if (changed) {
        storeSetups(setups);
      }
    }
  }
  if (gearListOutput) {
    gearListOutput.innerHTML = '';
    gearListOutput.classList.add('hidden');
    updateAutoGearHighlightToggleButton();
  }
  if (projectRequirementsOutput) {
    projectRequirementsOutput.innerHTML = '';
    projectRequirementsOutput.classList.add('hidden');
  }
  if (typeof globalThis !== 'undefined') {
    globalThis.__cineLastGearListHtml = '';
  }
  currentProjectInfo = null;
  if (projectForm) populateProjectForm({});
  storeSession({
    setupName: setupNameInput ? setupNameInput.value : '',
    setupSelect: setupSelect ? setupSelect.value : '',
    camera: cameraSelect ? cameraSelect.value : '',
    monitor: monitorSelect ? monitorSelect.value : '',
    video: videoSelect ? videoSelect.value : '',
    cage: cageSelect ? cageSelect.value : '',
    motors: motorSelects.map(function (sel) {
      return sel ? sel.value : '';
    }),
    controllers: controllerSelects.map(function (sel) {
      return sel ? sel.value : '';
    }),
    distance: distanceSelect ? distanceSelect.value : '',
    batteryPlate: normalizeBatteryPlateValue(batteryPlateSelect ? batteryPlateSelect.value : '', batterySelect ? batterySelect.value : ''),
    battery: batterySelect ? batterySelect.value : '',
    batteryHotswap: hotswapSelect ? hotswapSelect.value : '',
    sliderBowl: getSetupsCoreValue('getSliderBowlValue'),
    easyrig: getSetupsCoreValue('getEasyrigValue'),
    projectInfo: null
  });
  if (typeof autoSaveCurrentSetup === 'function') {
    autoSaveCurrentSetup();
    if (storageKey) {
      var setupsAfterSave = getSetups();
      var savedSetup = setupsAfterSave && setupsAfterSave[storageKey];
      if (savedSetup && _typeof(savedSetup) === 'object') {
        var resaved = false;
        if (Object.prototype.hasOwnProperty.call(savedSetup, 'gearList')) {
          delete savedSetup.gearList;
          resaved = true;
        }
        ['projectInfo', 'gearListAndProjectRequirementsGenerated', 'gearSelectors'].forEach(function (prop) {
          if (Object.prototype.hasOwnProperty.call(savedSetup, prop)) {
            delete savedSetup[prop];
            resaved = true;
          }
        });
        if (resaved) {
          storeSetups(setupsAfterSave);
        }
      }
    }
  }
  currentProjectInfo = null;
  updateGearListButtonVisibility();
  if (typeof document !== 'undefined' && typeof document.dispatchEvent === 'function') {
    var eventDetail = {
      projectName: storageKey,
      backupName: backupName,
      source: 'deleteCurrentGearList'
    };
    try {
      document.dispatchEvent(new CustomEvent('gearlist:deleted', {
        detail: eventDetail
      }));
    } catch (error) {
      if (typeof document.createEvent === 'function') {
        var fallbackEvent = document.createEvent('CustomEvent');
        fallbackEvent.initCustomEvent('gearlist:deleted', false, false, eventDetail);
        document.dispatchEvent(fallbackEvent);
      } else {
        console.warn('Unable to dispatch gearlist:deleted event', error);
      }
    }
  }
  return true;
}
var AUTO_GEAR_HIGHLIGHT_CLASS = 'show-auto-gear-highlight';
var AUTO_GEAR_HIGHLIGHT_CONTEXT_CLASS = 'auto-gear-highlight-context';
var ONBOARD_MONITOR_RIGGING_ITEM_NAME = 'ULCS Arm mit 3/8" und 1/4" double';
var ONBOARD_MONITOR_RIGGING_ITEM_ID = 'autoGearMonitorRiggingItem';
var ONBOARD_MONITOR_RIGGING_RULE_ID = 'autoGearMonitorRiggingHighlight';
var AUTO_GEAR_HIGHLIGHT_ICON = '';
var AUTO_GEAR_HIGHLIGHT_LABEL_FALLBACK = 'Highlight automatic gear';
var AUTO_GEAR_HIGHLIGHT_HELP_FALLBACK = 'Toggle a temporary color overlay for gear added by automatic rules. Useful while debugging gear rule behavior.';
var AUTO_GEAR_HIGHLIGHT_STATE_ON_FALLBACK = 'On';
var AUTO_GEAR_HIGHLIGHT_STATE_OFF_FALLBACK = 'Off';
var AUTO_GEAR_RULE_BADGE_NAMED_FALLBACK = 'Rule: %s';
var AUTO_GEAR_RULE_BADGE_UNNAMED_FALLBACK = 'Automatic rule';
var AUTO_GEAR_RULE_COLOR_PALETTE = Object.freeze([{
  bg: 'rgba(255, 210, 64, 0.35)',
  border: 'rgba(255, 181, 0, 0.7)'
}, {
  bg: 'rgba(88, 200, 255, 0.32)',
  border: 'rgba(0, 146, 214, 0.65)'
}, {
  bg: 'rgba(146, 232, 129, 0.32)',
  border: 'rgba(70, 180, 80, 0.65)'
}, {
  bg: 'rgba(255, 186, 222, 0.32)',
  border: 'rgba(230, 112, 190, 0.65)'
}, {
  bg: 'rgba(255, 214, 153, 0.32)',
  border: 'rgba(230, 156, 64, 0.65)'
}, {
  bg: 'rgba(201, 186, 255, 0.32)',
  border: 'rgba(146, 118, 230, 0.65)'
}, {
  bg: 'rgba(152, 219, 217, 0.32)',
  border: 'rgba(72, 182, 178, 0.65)'
}]);
function getAutoGearRuleColorKey(rule, dataset) {
  if (rule && _typeof(rule) === 'object') {
    var ruleId = typeof rule.id === 'string' ? rule.id.trim() : '';
    if (ruleId) {
      return "id:".concat(ruleId.toLowerCase());
    }
    var label = getAutoGearRuleDisplayLabel(rule);
    if (label) {
      return "label:".concat(label.toLowerCase());
    }
  }
  if (dataset && _typeof(dataset) === 'object') {
    var datasetId = typeof dataset.autoGearRuleId === 'string' ? dataset.autoGearRuleId.trim() : '';
    if (datasetId) {
      return "id:".concat(datasetId.toLowerCase());
    }
    var datasetLabel = typeof dataset.autoGearRuleLabel === 'string' ? dataset.autoGearRuleLabel.trim() : '';
    if (datasetLabel) {
      return "label:".concat(datasetLabel.toLowerCase());
    }
  }
  return '';
}
function getAutoGearRuleColorEntry(rule, dataset) {
  if (!AUTO_GEAR_RULE_COLOR_PALETTE.length) {
    return null;
  }
  var key = getAutoGearRuleColorKey(rule, dataset);
  if (!key) {
    var defaultEntry = AUTO_GEAR_RULE_COLOR_PALETTE[0];
    return _objectSpread(_objectSpread({}, defaultEntry), {}, {
      index: 0
    });
  }
  var hash = 0;
  for (var i = 0; i < key.length; i += 1) {
    hash = hash * 31 + key.charCodeAt(i) & 0x7fffffff;
  }
  var paletteIndex = Math.abs(hash) % AUTO_GEAR_RULE_COLOR_PALETTE.length;
  var paletteEntry = AUTO_GEAR_RULE_COLOR_PALETTE[paletteIndex] || AUTO_GEAR_RULE_COLOR_PALETTE[0];
  return _objectSpread(_objectSpread({}, paletteEntry), {}, {
    index: paletteIndex
  });
}
function applyAutoGearRuleColors(span, rule) {
  if (!span || !span.style) {
    return;
  }
  var dataset = span.dataset || {};
  var entry = getAutoGearRuleColorEntry(rule, dataset);
  if (!entry) {
    span.style.removeProperty('--auto-gear-rule-bg');
    span.style.removeProperty('--auto-gear-rule-border');
    span.style.removeProperty('--auto-gear-rule-text');
    if (dataset && Object.prototype.hasOwnProperty.call(dataset, 'autoGearRuleColor')) {
      delete dataset.autoGearRuleColor;
    }
    return;
  }
  var bg = entry.bg,
    border = entry.border,
    text = entry.text,
    index = entry.index;
  if (bg) {
    span.style.setProperty('--auto-gear-rule-bg', bg);
  } else {
    span.style.removeProperty('--auto-gear-rule-bg');
  }
  if (border) {
    span.style.setProperty('--auto-gear-rule-border', border);
  } else {
    span.style.removeProperty('--auto-gear-rule-border');
  }
  if (text) {
    span.style.setProperty('--auto-gear-rule-text', text);
  } else {
    span.style.removeProperty('--auto-gear-rule-text');
  }
  if (dataset) {
    try {
      span.dataset.autoGearRuleColor = String(index);
    } catch (error) {
      console.warn('Failed to annotate automatic gear color index', error);
    }
  }
}
function getAutoGearRuleBadgeTemplates() {
  var _texts$en0, _texts$en1;
  var langTexts = texts[currentLang] || texts.en || {};
  var named = langTexts.autoGearRuleBadgeNamed || ((_texts$en0 = texts.en) === null || _texts$en0 === void 0 ? void 0 : _texts$en0.autoGearRuleBadgeNamed) || AUTO_GEAR_RULE_BADGE_NAMED_FALLBACK;
  var unnamed = langTexts.autoGearRuleBadgeUnnamed || ((_texts$en1 = texts.en) === null || _texts$en1 === void 0 ? void 0 : _texts$en1.autoGearRuleBadgeUnnamed) || AUTO_GEAR_RULE_BADGE_UNNAMED_FALLBACK;
  return {
    named: named,
    unnamed: unnamed
  };
}
function formatAutoGearRuleBadgeText(ruleLabel, ruleId) {
  var _getAutoGearRuleBadge = getAutoGearRuleBadgeTemplates(),
    named = _getAutoGearRuleBadge.named,
    unnamed = _getAutoGearRuleBadge.unnamed;
  var trimmedLabel = typeof ruleLabel === 'string' ? ruleLabel.trim() : '';
  if (trimmedLabel) {
    return named.replace('%s', trimmedLabel);
  }
  var trimmedId = typeof ruleId === 'string' ? ruleId.trim() : '';
  if (trimmedId) {
    return named.replace('%s', trimmedId);
  }
  return unnamed;
}
function refreshAutoGearRuleBadge(span) {
  if (!span || !span.classList || !span.classList.contains('auto-gear-item')) {
    return;
  }
  var sources = getAutoGearRuleSources(span);
  setAutoGearRuleSources(span, sources);
  applyAutoGearRuleColors(span);
  var badgeTexts = sources.map(function (source) {
    return formatAutoGearRuleBadgeText(source.label, source.id);
  }).filter(Boolean);
  var existingBadges = Array.from(span.querySelectorAll('.auto-gear-rule-badge'));
  if (!badgeTexts.length) {
    existingBadges.forEach(function (node) {
      return node.remove();
    });
    if (span.dataset && Object.prototype.hasOwnProperty.call(span.dataset, 'autoGearRuleBadge')) {
      delete span.dataset.autoGearRuleBadge;
    }
    var _tooltip = buildAutoGearRuleTooltipFromSources(sources);
    if (_tooltip) {
      span.title = _tooltip;
    } else {
      span.removeAttribute('title');
    }
    return;
  }
  badgeTexts.forEach(function (text, index) {
    var badge = existingBadges[index];
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'auto-gear-rule-badge';
      span.appendChild(badge);
    }
    badge.textContent = text;
  });
  if (existingBadges.length > badgeTexts.length) {
    existingBadges.slice(badgeTexts.length).forEach(function (node) {
      return node.remove();
    });
  }
  if (span.dataset) {
    try {
      span.dataset.autoGearRuleBadge = JSON.stringify(badgeTexts);
    } catch (error) {
      console.warn('Failed to serialize automatic gear rule badge labels', error);
    }
  }
  var tooltip = buildAutoGearRuleTooltipFromSources(sources);
  if (tooltip) {
    span.title = tooltip;
  } else {
    span.removeAttribute('title');
  }
}
function updateAutoGearRuleBadges(container) {
  var scope = container || gearListOutput;
  if (!scope || typeof scope.querySelectorAll !== 'function') {
    return;
  }
  var autoGearItems = scope.querySelectorAll('.auto-gear-item');
  autoGearItems.forEach(function (item) {
    return refreshAutoGearRuleBadge(item);
  });
}
function getAutoGearHighlightLabel() {
  var localized = typeof getLocalizedText === 'function' ? getLocalizedText('autoGearHighlightToggle') : '';
  if (typeof localized === 'string' && localized.trim()) {
    return localized.trim();
  }
  return AUTO_GEAR_HIGHLIGHT_LABEL_FALLBACK;
}
function getAutoGearHighlightHelp() {
  var localized = typeof getLocalizedText === 'function' ? getLocalizedText('autoGearHighlightToggleHelp') : '';
  if (typeof localized === 'string' && localized.trim()) {
    return localized.trim();
  }
  return AUTO_GEAR_HIGHLIGHT_HELP_FALLBACK;
}
function isAutoGearHighlightEnabled() {
  return !!(gearListOutput && gearListOutput.classList && gearListOutput.classList.contains(AUTO_GEAR_HIGHLIGHT_CLASS));
}
function canHighlightAutoGear() {
  if (!gearListOutput || !gearListOutput.classList) return false;
  return !gearListOutput.classList.contains('hidden');
}
function ensureAutoGearHighlightToggleStructure(toggle) {
  if (!toggle) return null;
  toggle.classList.add('auto-gear-highlight-toggle', 'gear-list-action-btn');
  var iconClass = 'auto-gear-highlight-icon';
  var icon = toggle.querySelector(".".concat(iconClass));
  if (!icon) {
    icon = document.createElement('span');
    icon.className = "btn-icon icon-glyph ".concat(iconClass);
    icon.setAttribute('aria-hidden', 'true');
    icon.setAttribute('data-icon-font', 'uicons');
    icon.textContent = AUTO_GEAR_HIGHLIGHT_ICON;
    if (toggle.firstChild) {
      toggle.insertBefore(icon, toggle.firstChild);
    } else {
      toggle.appendChild(icon);
    }
  } else {
    if (!icon.classList.contains('btn-icon')) {
      icon.classList.add('btn-icon');
    }
    if (!icon.classList.contains('icon-glyph')) {
      icon.classList.add('icon-glyph');
    }
    if (!icon.classList.contains(iconClass)) {
      icon.classList.add(iconClass);
    }
    icon.setAttribute('aria-hidden', 'true');
    icon.setAttribute('data-icon-font', 'uicons');
    if (icon.textContent !== AUTO_GEAR_HIGHLIGHT_ICON) {
      icon.textContent = AUTO_GEAR_HIGHLIGHT_ICON;
    }
  }
  var label = toggle.querySelector('.auto-gear-highlight-label');
  if (!label) {
    label = document.createElement('span');
    label.className = 'auto-gear-highlight-label';
    toggle.appendChild(label);
  }
  var state = toggle.querySelector('.auto-gear-highlight-state');
  if (!state) {
    state = document.createElement('span');
    state.className = 'auto-gear-highlight-state';
    if (typeof label.after === 'function') {
      label.after(state);
    } else {
      toggle.appendChild(state);
    }
  }
  if (state) {
    state.setAttribute('aria-live', 'polite');
    state.setAttribute('aria-atomic', 'true');
  }
  var textNodes = Array.from(toggle.childNodes || []).filter(function (node) {
    return node && node.nodeType === 3 && node.textContent && node.textContent.trim().length;
  });
  textNodes.forEach(function (node) {
    toggle.removeChild(node);
  });
  if (state && typeof label !== 'undefined' && label && state.previousElementSibling !== label) {
    if (typeof label.after === 'function') {
      label.after(state);
    }
  }
  return {
    label: label,
    state: state
  };
}
function getAutoGearHighlightStateText(isActive) {
  var key = isActive ? 'autoGearHighlightToggleStateOn' : 'autoGearHighlightToggleStateOff';
  var fallback = isActive ? AUTO_GEAR_HIGHLIGHT_STATE_ON_FALLBACK : AUTO_GEAR_HIGHLIGHT_STATE_OFF_FALLBACK;
  var localized = typeof getLocalizedText === 'function' ? getLocalizedText(key) : '';
  if (typeof localized === 'string' && localized.trim()) {
    return localized.trim();
  }
  return fallback;
}
function applyAutoGearHighlightContext(isActive) {
  if (typeof document === 'undefined') {
    return;
  }
  var enable = !!isActive;
  var targets = [document.documentElement, document.body, document.getElementById('autoGearDraftImpact')];
  targets.forEach(function (node) {
    if (node && node.classList) {
      node.classList.toggle(AUTO_GEAR_HIGHLIGHT_CONTEXT_CLASS, enable);
    }
  });
}
function setAutoGearHighlightEnabled(enabled) {
  var nextState = !!enabled;
  if (gearListOutput && gearListOutput.classList) {
    gearListOutput.classList.toggle(AUTO_GEAR_HIGHLIGHT_CLASS, nextState);
  }
  updateAutoGearHighlightToggleButton();
}
function updateAutoGearHighlightToggleButton() {
  var toggle = document.getElementById('autoGearHighlightToggle');
  if (!toggle) return;
  var label = getAutoGearHighlightLabel();
  var help = getAutoGearHighlightHelp();
  var structure = ensureAutoGearHighlightToggleStructure(toggle);
  var labelContainer = structure && structure.label;
  var stateContainer = structure && structure.state;
  if (labelContainer) {
    labelContainer.textContent = label;
  } else if (typeof toggle.textContent === 'string') {
    toggle.textContent = label;
  } else {
    toggle.innerHTML = escapeHtml(label);
  }
  toggle.setAttribute('title', help);
  toggle.setAttribute('data-help', help);
  toggle.setAttribute('aria-label', help);
  var active = isAutoGearHighlightEnabled();
  applyAutoGearHighlightContext(active);
  var stateText = getAutoGearHighlightStateText(active);
  if (stateContainer) {
    stateContainer.textContent = stateText;
    stateContainer.setAttribute('data-state', active ? 'on' : 'off');
  }
  toggle.setAttribute('data-state', active ? 'on' : 'off');
  toggle.setAttribute('data-state-label', stateText);
  toggle.setAttribute('aria-pressed', active ? 'true' : 'false');
  toggle.classList.toggle('is-active', active);
  var available = canHighlightAutoGear();
  toggle.disabled = !available;
  if (available) {
    toggle.removeAttribute('aria-disabled');
  } else {
    toggle.setAttribute('aria-disabled', 'true');
  }
  updateAutoGearRuleBadges(gearListOutput);
}
function ensureGearListActions() {
  if (!gearListOutput) return;
  var actions = document.getElementById('gearListActions');
  if (!actions) {
    actions = document.createElement('div');
    actions.id = 'gearListActions';
    gearListOutput.appendChild(actions);
  }
  var existingDeleteBtn = actions.querySelector('#deleteGearListBtn');
  if (existingDeleteBtn) {
    existingDeleteBtn.removeEventListener('click', deleteCurrentGearList);
    existingDeleteBtn.remove();
  }
  var autoSaveNote = document.getElementById('gearListAutosaveNote');
  if (!autoSaveNote) {
    autoSaveNote = document.createElement('p');
    autoSaveNote.id = 'gearListAutosaveNote';
    autoSaveNote.className = 'gear-list-autosave-note';
    actions.appendChild(autoSaveNote);
  } else if (!actions.contains(autoSaveNote)) {
    actions.appendChild(autoSaveNote);
  }
  var noteText = texts[currentLang] && texts[currentLang].gearListAutosaveNote || '';
  var trimmedNoteText = typeof noteText === 'string' ? noteText.trim() : '';
  var hasNoteText = trimmedNoteText.length > 0;
  if (hasNoteText) {
    autoSaveNote.hidden = false;
    autoSaveNote.removeAttribute('hidden');
    autoSaveNote.textContent = trimmedNoteText;
    autoSaveNote.setAttribute('title', trimmedNoteText);
    autoSaveNote.setAttribute('data-help', trimmedNoteText);
  } else {
    autoSaveNote.textContent = '';
    autoSaveNote.setAttribute('title', '');
    autoSaveNote.setAttribute('data-help', '');
    autoSaveNote.hidden = true;
  }
  var deleteLabel = texts[currentLang] && texts[currentLang].deleteGearListBtn || texts.en && texts.en.deleteGearListBtn || 'Delete Gear List';
  var deleteHelp = texts[currentLang] && (texts[currentLang].deleteGearListBtnHelp || texts[currentLang].deleteGearListBtn) || texts.en && (texts.en.deleteGearListBtnHelp || texts.en.deleteGearListBtn) || deleteLabel;
  var deleteBtn = document.createElement('button');
  deleteBtn.id = 'deleteGearListBtn';
  deleteBtn.type = 'button';
  deleteBtn.className = 'gear-list-action-btn';
  if (typeof setButtonLabelWithIcon === 'function' && (typeof ICON_GLYPHS === "undefined" ? "undefined" : _typeof(ICON_GLYPHS)) === 'object') {
    setButtonLabelWithIcon(deleteBtn, deleteLabel, ICON_GLYPHS.trash);
  } else {
    var iconHtml = typeof iconMarkup === 'function' && (typeof ICON_GLYPHS === "undefined" ? "undefined" : _typeof(ICON_GLYPHS)) === 'object' ? iconMarkup(ICON_GLYPHS.trash, 'btn-icon') : '';
    deleteBtn.innerHTML = "".concat(iconHtml).concat(escapeHtml(deleteLabel));
  }
  deleteBtn.setAttribute('title', deleteHelp);
  deleteBtn.setAttribute('data-help', deleteHelp);
  deleteBtn.setAttribute('aria-label', deleteHelp);
  deleteBtn.setAttribute('data-feature-search', 'true');
  deleteBtn.setAttribute('data-feature-search-keywords', 'delete remove clear gear list project');
  deleteBtn.addEventListener('click', deleteCurrentGearList);
  var shouldHideDeleteBtn = !gearListOutput || gearListOutput.classList.contains('hidden') || gearListOutput.innerHTML.trim() === '';
  if (shouldHideDeleteBtn) {
    deleteBtn.hidden = true;
    deleteBtn.setAttribute('hidden', '');
  } else {
    deleteBtn.hidden = false;
    deleteBtn.removeAttribute('hidden');
  }
  if (autoSaveNote && autoSaveNote.parentElement === actions) {
    actions.insertBefore(deleteBtn, autoSaveNote);
  } else {
    actions.appendChild(deleteBtn);
  }
  var highlightToggle = document.getElementById('autoGearHighlightToggle');
  if (highlightToggle && !highlightToggle.dataset.gearListHighlightBound) {
    highlightToggle.addEventListener('click', function () {
      var nextState = !isAutoGearHighlightEnabled();
      setAutoGearHighlightEnabled(nextState);
      if (typeof saveCurrentSession === 'function') {
        saveCurrentSession({
          skipGearList: true
        });
      }
    });
    highlightToggle.dataset.gearListHighlightBound = 'true';
  }
  updateAutoGearHighlightToggleButton();
  updateAutoGearRuleBadges(actions.closest('#gearListOutput') || gearListOutput);
  if (!gearListOutput._filterListenerBound) {
    gearListOutput.addEventListener('change', function (e) {
      var target = e.target;
      if (target && target.matches('select')) {
        adjustGearListSelectWidth(target);
      }
      var shouldSync = false;
      if (target.matches('.filter-values-container input[type="checkbox"]')) {
        var container = target.closest('.filter-values-container');
        var storageId = container && container.getAttribute('data-storage-values');
        var sel = container && container.querySelector('select');
        if (target.checked) {
          target.setAttribute('checked', '');
        } else {
          target.removeAttribute('checked');
        }
        if (storageId) {
          syncGearListFilterValue(storageId, target.value, target.checked);
        } else if (sel) {
          var opt = Array.from(sel.options).find(function (opt) {
            return opt.value === target.value;
          });
          if (opt) opt.selected = target.checked;
          sel.dispatchEvent(new Event('change'));
        }
        shouldSync = true;
      } else if (target.matches('select[data-storage-id]')) {
        var _storageId = target.getAttribute('data-storage-id');
        if (_storageId) {
          syncGearListFilterSize(_storageId, target.value);
        }
        shouldSync = true;
      } else if (target.id && target.id.startsWith('filter-size-')) {
        shouldSync = true;
      } else if (target.id && target.id.startsWith('filter-values-')) {
        shouldSync = true;
      } else if (target.matches('input, select, textarea') && !target.closest('#gearListActions')) {
        shouldSync = true;
      }
      if (shouldSync) {
        saveCurrentGearList();
        saveCurrentSession();
        checkSetupChanged();
      }
    });
    gearListOutput._filterListenerBound = true;
  }
  if (!gearListOutput._inputListenerBound) {
    gearListOutput.addEventListener('input', function (e) {
      var target = e.target;
      if (!target) return;
      if (target.closest('#gearListActions')) return;
      if (target.closest('.gear-custom-item')) {
        updateCustomItemPreview(target.closest('.gear-custom-item'));
      }
      if (target.matches('input, textarea')) {
        saveCurrentGearList();
        saveCurrentSession();
        checkSetupChanged();
      }
    });
    gearListOutput._inputListenerBound = true;
  }
  if (!gearListOutput._customClickListenerBound) {
    gearListOutput.addEventListener('click', function (e) {
      var editBtn = e.target && e.target.closest('[data-gear-edit]');
      if (editBtn) {
        e.preventDefault();
        var targetItem = editBtn.closest('.gear-item, .gear-custom-item');
        if (targetItem) {
          openGearItemEditor(targetItem, {
            allowRentalToggle: true
          });
        }
        return;
      }
      var toggleBtn = e.target && e.target.closest('.gear-rental-toggle');
      if (toggleBtn) {
        e.preventDefault();
        var _targetItem = toggleBtn.closest('.gear-item, .gear-custom-item');
        if (!_targetItem) return;
        var nextState = toggleBtn.getAttribute('aria-pressed') !== 'true';
        setRentalExclusionState(_targetItem, nextState);
        if (_targetItem.classList && _targetItem.classList.contains('gear-custom-item')) {
          persistCustomItemsChange();
        } else {
          if (typeof saveCurrentGearList === 'function') {
            saveCurrentGearList();
          }
          if (typeof saveCurrentSession === 'function') {
            saveCurrentSession();
          }
          if (typeof checkSetupChanged === 'function') {
            checkSetupChanged();
          }
        }
        return;
      }
      var addBtn = e.target && e.target.closest('[data-gear-custom-add]');
      if (addBtn) {
        e.preventDefault();
        handleAddCustomItemRequest(addBtn);
        return;
      }
      var removeBtn = e.target && e.target.closest('[data-gear-custom-remove]');
      if (removeBtn) {
        e.preventDefault();
        handleRemoveCustomItemRequest(removeBtn);
      }
    });
    gearListOutput._customClickListenerBound = true;
  }
}
var gearDeleteRequestListenerBound = false;
if (typeof document !== 'undefined' && typeof document.addEventListener === 'function') {
  if (!gearDeleteRequestListenerBound) {
    var handleGearDeleteRequest = function handleGearDeleteRequest() {
      try {
        deleteCurrentGearList();
      } catch (error) {
        console.warn('Failed to handle gear list deletion request', error);
      }
    };
    document.addEventListener('gearlist:delete-requested', handleGearDeleteRequest);
    gearDeleteRequestListenerBound = true;
  }
}
function resolveGearListCageLabel() {
  var rawLabel = typeof localGetLocalizedText === 'function' ? localGetLocalizedText('category_cages') : '';
  var trimmed = typeof rawLabel === 'string' ? rawLabel.trim() : '';
  return trimmed || 'Camera Cage';
}
function syncGearListCageItem(select) {
  if (!select) return;
  var gearItem = select.closest('.gear-item');
  if (!gearItem) return;
  var option = select.options && select.selectedIndex >= 0 ? select.options[select.selectedIndex] : null;
  var optionText = option && typeof option.text === 'string' ? option.text.trim() : option && option.textContent ? option.textContent.trim() : '';
  var label = resolveGearListCageLabel();
  var combinedName = optionText ? "".concat(label, " (").concat(optionText, ")") : label;
  gearItem.setAttribute('data-gear-quantity', '1');
  if (label) {
    gearItem.setAttribute('data-gear-label', label);
  } else {
    gearItem.removeAttribute('data-gear-label');
  }
  if (combinedName) {
    gearItem.setAttribute('data-gear-name', combinedName);
  } else {
    gearItem.removeAttribute('data-gear-name');
  }
  if (optionText) {
    gearItem.setAttribute('data-gear-attributes', optionText);
  } else {
    gearItem.removeAttribute('data-gear-attributes');
  }
}
function bindGearListCageListener() {
  if (!gearListOutput) return;
  var sel = gearListOutput.querySelector('#gearListCage');
  if (sel) {
    sel.addEventListener('change', function (e) {
      if (cageSelect) {
        cageSelect.value = e.target.value;
        cageSelect.dispatchEvent(new Event('change'));
      }
      syncGearListCageItem(sel);
      markProjectFormDataDirty();
      saveCurrentGearList();
    });
    syncGearListCageItem(sel);
  }
}
function bindGearListEasyrigListener() {
  if (!gearListOutput) return;
  var sel = gearListOutput.querySelector('#gearListEasyrig');
  if (sel) {
    sel.addEventListener('change', function () {
      markProjectFormDataDirty();
      saveCurrentGearList();
      saveCurrentSession();
      checkSetupChanged();
    });
  }
}
function bindGearListSliderBowlListener() {
  if (!gearListOutput) return;
  var sel = gearListOutput.querySelector('#gearListSliderBowl');
  if (sel) {
    sel.addEventListener('change', function () {
      markProjectFormDataDirty();
      saveCurrentGearList();
      saveCurrentSession();
      checkSetupChanged();
    });
  }
}
function bindGearListEyeLeatherListener() {
  if (!gearListOutput) return;
  var sel = gearListOutput.querySelector('#gearListEyeLeatherColor');
  if (sel) {
    sel.addEventListener('change', function () {
      markProjectFormDataDirty();
      saveCurrentGearList();
    });
  }
}
function bindGearListProGaffTapeListener() {
  if (!gearListOutput) return;
  [1, 2].forEach(function (i) {
    var colorSel = gearListOutput.querySelector("#gearListProGaffColor".concat(i));
    var widthSel = gearListOutput.querySelector("#gearListProGaffWidth".concat(i));
    [colorSel, widthSel].forEach(function (sel) {
      if (sel) {
        sel.addEventListener('change', function () {
          markProjectFormDataDirty();
          saveCurrentGearList();
        });
      }
    });
  });
}
function bindGearListDirectorMonitorListener() {
  if (!gearListOutput) return;
  ['Director', 'Dop', 'Gaffer', 'Focus'].forEach(function (role) {
    var sel = gearListOutput.querySelector("#gearList".concat(role, "Monitor"));
    if (sel) {
      sel.addEventListener('change', function () {
        var monitorInfo = devices && devices.monitors && devices.monitors[sel.value];
        var span = gearListOutput.querySelector("#monitorSize".concat(role));
        if (span && monitorInfo && monitorInfo.screenSizeInches) {
          span.textContent = "".concat(monitorInfo.screenSizeInches, "\"");
        }
        sel.dataset.autoGearManual = 'true';
        markProjectFormDataDirty();
        saveCurrentGearList();
        saveCurrentSession();
        checkSetupChanged();
      });
    }
  });
  ['Director', 'Combo', 'Dop'].forEach(function (role) {
    var sel = gearListOutput.querySelector("#gearList".concat(role, "Monitor15"));
    if (sel) {
      sel.addEventListener('change', function () {
        var monitorInfo = devices && devices.directorMonitors && devices.directorMonitors[sel.value];
        var span = gearListOutput.querySelector("#monitorSize".concat(role, "15"));
        if (span && monitorInfo && monitorInfo.screenSizeInches) {
          span.textContent = "".concat(monitorInfo.screenSizeInches, "\"");
        }
        sel.dataset.autoGearManual = 'true';
        markProjectFormDataDirty();
        saveCurrentGearList();
        saveCurrentSession();
        checkSetupChanged();
      });
    }
  });
}
function refreshGearListIfVisible() {
  if (!gearListOutput || gearListOutput.classList.contains('hidden')) return;
  if (restoringSession) return;
  if (skipNextGearListRefresh) {
    skipNextGearListRefresh = false;
    return;
  }
  if (projectForm) {
    populateRecordingResolutionDropdown(currentProjectInfo && currentProjectInfo.recordingResolution);
    populateSensorModeDropdown(currentProjectInfo && currentProjectInfo.sensorMode);
    populateCodecDropdown(currentProjectInfo && currentProjectInfo.codec);
    var info = collectProjectFormData();
    info.sliderBowl = getSetupsCoreValue('getSliderBowlValue');
    info.easyrig = getSetupsCoreValue('getEasyrigValue');
    currentProjectInfo = deriveProjectInfo(info);
  } else {
    var _info = {
      sliderBowl: getSetupsCoreValue('getSliderBowlValue'),
      easyrig: getSetupsCoreValue('getEasyrigValue')
    };
    currentProjectInfo = deriveProjectInfo(_info);
  }
  var html = gearListGenerateHtmlImpl(currentProjectInfo || {});
  if (currentProjectInfo) {
    displayGearAndRequirements(html);
  } else {
    var _gearListGetSafeHtmlS2 = gearListGetSafeHtmlSectionsImpl(html),
      gearHtml = _gearListGetSafeHtmlS2.gearHtml;
    gearListOutput.innerHTML = gearHtml;
    enhanceGearListItems(gearListOutput);
  }
  ensureGearListActions();
  bindGearListCageListener();
  bindGearListEasyrigListener();
  bindGearListSliderBowlListener();
  bindGearListEyeLeatherListener();
  bindGearListProGaffTapeListener();
  bindGearListDirectorMonitorListener();
  refreshAllCameraLinkIndicators(gearListOutput);
  saveCurrentSession();
}
if (typeof document !== 'undefined') {
  document.addEventListener('gearlist:add-extra-gear', function () {
    try {
      addExtraGearItem();
    } catch (error) {
      console.warn('Failed to add extra gear item from request', error);
    }
  });
  document.addEventListener('gear-provider-data-changed', function () {
    refreshGearItemProviderDisplays();
    refreshGearItemEditProviderOptionsIfOpen();
  });
  document.addEventListener('own-gear-data-changed', function () {
    ownGearNameCache = null;
    refreshGearItemProviderDisplays();
    refreshGearItemEditProviderOptionsIfOpen();
    refreshGearItemOwnedStateIfOpen();
  });
  document.addEventListener('camera-selection-changed', function () {
    refreshGearItemEditCameraLinkOptionsIfOpen();
    refreshAllCameraLinkIndicators();
  });
  document.addEventListener('camera-colors-changed', function () {
    cachedCameraColorDefaults = null;
    refreshAllCameraLinkIndicators();
    refreshGearItemEditCameraLinkOptionsIfOpen();
  });
}