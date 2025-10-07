function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var createOverviewPrintWorkflowModule = null;
var triggerOverviewPrintWorkflowModule = null;
(function resolveOverviewPrintWorkflowModule() {
  var globalScope = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
  var candidates = [];
  if (typeof require === 'function') {
    try {
      var required = require('./modules/features/print-workflow.js');
      if (required && _typeof(required) === 'object') {
        candidates.push(required);
      }
    } catch (error) {
      void error;
    }
  }
  if (globalScope && _typeof(globalScope.cineFeaturePrint) === 'object' && globalScope.cineFeaturePrint) {
    candidates.push(globalScope.cineFeaturePrint);
  }
  for (var index = 0; index < candidates.length; index += 1) {
    var candidate = candidates[index];
    if (!candidate || _typeof(candidate) !== 'object') {
      continue;
    }
    if (!createOverviewPrintWorkflowModule && typeof candidate.createOverviewPrintWorkflow === 'function') {
      createOverviewPrintWorkflowModule = candidate.createOverviewPrintWorkflow;
    }
    if (!triggerOverviewPrintWorkflowModule && typeof candidate.triggerOverviewPrintWorkflow === 'function') {
      triggerOverviewPrintWorkflowModule = candidate.triggerOverviewPrintWorkflow;
    }
    if (createOverviewPrintWorkflowModule && triggerOverviewPrintWorkflowModule) {
      break;
    }
  }
})();
var overviewLogger = function () {
  var scopes = [];
  if (typeof globalThis !== 'undefined' && globalThis) scopes.push(globalThis);
  if (typeof window !== 'undefined' && window && scopes.indexOf(window) === -1) scopes.push(window);
  if (typeof self !== 'undefined' && self && scopes.indexOf(self) === -1) scopes.push(self);
  if (typeof global !== 'undefined' && global && scopes.indexOf(global) === -1) scopes.push(global);
  for (var index = 0; index < scopes.length; index += 1) {
    var scope = scopes[index];
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      continue;
    }
    var logging = null;
    try {
      logging = scope.cineLogging || null;
    } catch (error) {
      void error;
      logging = null;
    }
    if (logging && typeof logging.createLogger === 'function') {
      try {
        return logging.createLogger('overview', {
          meta: {
            source: 'overview-dialog'
          }
        });
      } catch (creationError) {
        try {
          if (typeof logging.error === 'function') {
            logging.error('Failed to create overview logger', creationError, {
              namespace: 'overview-bootstrap'
            });
          }
        } catch (logError) {
          void logError;
        }
      }
    }
  }
  return null;
}();
var overviewConsoleFallback = (typeof console === "undefined" ? "undefined" : _typeof(console)) === 'object' && console ? console : null;
var OVERVIEW_LOG_META_DEFAULTS = Object.freeze({
  namespace: 'overview',
  source: 'overview-dialog'
});
function cloneOverviewLogMeta(meta) {
  if (!meta || _typeof(meta) !== 'object') {
    return {};
  }
  var clone = {};
  var keys = Object.keys(meta);
  for (var index = 0; index < keys.length; index += 1) {
    var key = keys[index];
    var value = meta[key];
    if (typeof value === 'undefined') {
      continue;
    }
    if (value === null) {
      clone[key] = null;
      continue;
    }
    var valueType = _typeof(value);
    if (valueType === 'string' || valueType === 'number' || valueType === 'boolean') {
      clone[key] = value;
      continue;
    }
    if (value instanceof Date && typeof value.toISOString === 'function') {
      clone[key] = value.toISOString();
      continue;
    }
    if (Array.isArray(value)) {
      try {
        clone[key] = JSON.parse(JSON.stringify(value));
      } catch (arrayError) {
        void arrayError;
        clone[key] = value.map(function (item) {
          if (item === null || typeof item === 'undefined') {
            return null;
          }
          var itemType = _typeof(item);
          if (itemType === 'string' || itemType === 'number' || itemType === 'boolean') {
            return item;
          }
          if (item instanceof Date && typeof item.toISOString === 'function') {
            return item.toISOString();
          }
          try {
            return JSON.parse(JSON.stringify(item));
          } catch (itemError) {
            void itemError;
            return String(item);
          }
        });
      }
      continue;
    }
    if (valueType === 'object') {
      try {
        clone[key] = JSON.parse(JSON.stringify(value));
      } catch (objectError) {
        void objectError;
        clone[key] = String(value);
      }
      continue;
    }
    try {
      clone[key] = JSON.parse(JSON.stringify(value));
    } catch (fallbackError) {
      void fallbackError;
      clone[key] = String(value);
    }
  }
  return clone;
}
function createOverviewLogMetaSnapshot(level, meta) {
  var normalizedLevel = typeof level === 'string' && level ? level.toLowerCase() : 'info';
  var timestamp = Date.now();
  var isoTimestamp = null;
  try {
    isoTimestamp = new Date(timestamp).toISOString();
  } catch (timestampError) {
    void timestampError;
    try {
      isoTimestamp = new Date().toISOString();
    } catch (isoError) {
      void isoError;
      isoTimestamp = String(timestamp);
    }
  }
  var baseMeta = _objectSpread(_objectSpread({}, OVERVIEW_LOG_META_DEFAULTS), cloneOverviewLogMeta(meta));
  if (!baseMeta.namespace) {
    baseMeta.namespace = OVERVIEW_LOG_META_DEFAULTS.namespace;
  }
  if (!baseMeta.source) {
    baseMeta.source = OVERVIEW_LOG_META_DEFAULTS.source;
  }
  baseMeta.level = normalizedLevel;
  baseMeta.timestamp = isoTimestamp;
  baseMeta.timestampMs = timestamp;
  if (typeof baseMeta.eventId !== 'string' || !baseMeta.eventId) {
    baseMeta.eventId = "overview-".concat(timestamp.toString(36), "-").concat(Math.random().toString(36).slice(2, 10));
  }
  if (typeof baseMeta.correlationId !== 'string' || !baseMeta.correlationId) {
    baseMeta.correlationId = baseMeta.eventId;
  }
  return baseMeta;
}
function logOverview(level, message, detail, meta) {
  var normalizedLevel = typeof level === 'string' && level ? level.toLowerCase() : 'info';
  var detailValue = typeof detail === 'undefined' ? undefined : detail;
  var baseMeta = createOverviewLogMetaSnapshot(normalizedLevel, meta);
  var loggerMeta = _objectSpread(_objectSpread({}, baseMeta), {}, {
    channel: 'cineLogging'
  });
  var consoleMeta = _objectSpread(_objectSpread({}, baseMeta), {}, {
    channel: 'console'
  });
  var loggerInvocationFailed = false;
  if (overviewLogger && typeof overviewLogger[normalizedLevel] === 'function') {
    try {
      overviewLogger[normalizedLevel](message, detailValue, loggerMeta);
    } catch (loggerError) {
      loggerInvocationFailed = true;
      consoleMeta.consoleFallbackUsed = true;
      consoleMeta.consoleFallbackReason = 'logger-invocation-failed';
      consoleMeta.loggerErrorMessage = loggerError && loggerError.message ? loggerError.message : undefined;
      if (overviewConsoleFallback && typeof overviewConsoleFallback.warn === 'function') {
        try {
          overviewConsoleFallback.warn('Overview logger invocation failed', loggerError, {
            meta: consoleMeta
          });
        } catch (consoleError) {
          void consoleError;
        }
      }
    }
  } else {
    loggerInvocationFailed = true;
    consoleMeta.consoleFallbackUsed = true;
    consoleMeta.consoleFallbackReason = overviewLogger ? 'logger-level-missing' : 'logger-unavailable';
  }
  if (!overviewConsoleFallback) {
    return baseMeta.eventId;
  }
  var consoleMethodName = normalizedLevel === 'warn' ? 'warn' : normalizedLevel === 'error' ? 'error' : normalizedLevel === 'debug' ? 'debug' : 'info';
  var consoleMethod = typeof overviewConsoleFallback[consoleMethodName] === 'function' ? overviewConsoleFallback[consoleMethodName] : typeof overviewConsoleFallback.log === 'function' ? overviewConsoleFallback.log : null;
  if (!consoleMethod) {
    return baseMeta.eventId;
  }
  if (!loggerInvocationFailed) {
    consoleMeta.consoleFallbackUsed = consoleMeta.consoleFallbackUsed || false;
  }
  var consoleArgs = ["[overview:".concat(consoleMeta.eventId, "] ").concat(message)];
  if (typeof detailValue !== 'undefined') {
    consoleArgs.push(detailValue);
  }
  consoleArgs.push({
    meta: consoleMeta
  });
  try {
    consoleMethod.apply(overviewConsoleFallback, consoleArgs);
  } catch (consoleInvokeError) {
    void consoleInvokeError;
  }
  return baseMeta.eventId;
}
function createOverviewLoggerProxy(baseMeta) {
  var frozenMeta = baseMeta && _typeof(baseMeta) === 'object' ? Object.freeze(_objectSpread({}, baseMeta)) : null;
  var proxy = {
    log: function log(message, detail) {
      logOverview('info', message, detail, frozenMeta);
    },
    info: function info(message, detail) {
      logOverview('info', message, detail, frozenMeta);
    },
    debug: function debug(message, detail) {
      logOverview('debug', message, detail, frozenMeta);
    },
    warn: function warn(message, detail) {
      logOverview('warn', message, detail, frozenMeta);
    },
    error: function error(message, detail) {
      logOverview('error', message, detail, frozenMeta);
    }
  };
  return Object.freeze(proxy);
}
function generatePrintableOverview() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var safeConfig = config && _typeof(config) === 'object' ? config : {};
  var _safeConfig$autoPrint = safeConfig.autoPrint,
    autoPrint = _safeConfig$autoPrint === void 0 ? false : _safeConfig$autoPrint;
  var escapeHtmlSafe = function escapeHtmlSafe(value) {
    return typeof escapeHtml === 'function' ? escapeHtml(value) : String(value !== null && value !== void 0 ? value : '');
  };
  var summarizeConnectors = function summarizeConnectors(device) {
    return typeof generateConnectorSummary === 'function' ? generateConnectorSummary(device) : '';
  };
  var setupNameField = typeof document !== 'undefined' ? document.getElementById('setupName') : null;
  var setupName = setupNameField ? setupNameField.value : '';
  var now = new Date();
  var localeMap = {
    de: 'de-DE',
    es: 'es-ES',
    fr: 'fr-FR',
    en: 'en-US',
    it: 'it-IT'
  };
  var lang = typeof currentLang === 'string' ? currentLang : 'en';
  var t = (typeof texts === "undefined" ? "undefined" : _typeof(texts)) === 'object' && texts ? texts[lang] || texts.en || {} : {};
  var locale = localeMap[lang] || 'en-US';
  var dateTimeString = now.toLocaleDateString(locale) + ' ' + now.toLocaleTimeString();
  var fallbackProjectName = currentProjectInfo && typeof currentProjectInfo.projectName === 'string' ? currentProjectInfo.projectName.trim() : '';
  var projectNameForTitle = setupName || fallbackProjectName;
  var sanitizeTitleSegment = function sanitizeTitleSegment(value) {
    if (!value) return '';
    return String(value).trim().replace(/[\\/:*?"<>|]+/g, '').replace(/\s+/g, ' ').replace(/^\.+/, '').replace(/\.+$/, '').trim();
  };
  var padTwo = function padTwo(value) {
    return String(value).padStart(2, '0');
  };
  var formattedDate = "".concat(now.getFullYear(), "-").concat(padTwo(now.getMonth() + 1), "-").concat(padTwo(now.getDate()));
  var formattedTime = "".concat(padTwo(now.getHours()), "-").concat(padTwo(now.getMinutes()), "-").concat(padTwo(now.getSeconds()));
  var timestampLabel = "".concat(formattedDate, " ").concat(formattedTime).trim();
  var safeTimestampLabel = sanitizeTitleSegment(timestampLabel) || timestampLabel;
  var projectTitleSegment = sanitizeTitleSegment(projectNameForTitle) || 'Project';
  var overviewLabel = sanitizeTitleSegment((t.overviewTitle || '').trim());
  var gearListLabel = sanitizeTitleSegment((t.gearListNav || '').trim());
  var projectRequirementsLabel = sanitizeTitleSegment((t.projectRequirementsNav || '').trim());
  var preferredSuffix = sanitizeTitleSegment((t.overviewExportTitleSuffix || '').trim());
  var suffixSegment = preferredSuffix;
  if (!suffixSegment) {
    var combinedNavLabels = [];
    if (gearListLabel) combinedNavLabels.push(gearListLabel);
    if (projectRequirementsLabel) combinedNavLabels.push(projectRequirementsLabel);
    if (combinedNavLabels.length === 2) {
      suffixSegment = sanitizeTitleSegment(combinedNavLabels.join(' and '));
    }
  }
  if (!suffixSegment) {
    var fallbackLabels = [overviewLabel, gearListLabel].filter(Boolean);
    suffixSegment = fallbackLabels.length ? sanitizeTitleSegment(fallbackLabels.join(' – ')) : '';
  }
  if (!suffixSegment) {
    suffixSegment = 'Gear List and Project Requirements';
  }
  suffixSegment = sanitizeTitleSegment(suffixSegment) || 'Gear List and Project Requirements';
  var printDocumentTitle = [safeTimestampLabel, projectTitleSegment, suffixSegment].filter(Boolean).join(' - ').replace(/\s+/g, ' ').trim();
  var originalDocumentTitle = typeof document !== 'undefined' ? document.title : '';
  var customLogo = typeof localStorage !== 'undefined' ? localStorage.getItem('customLogo') : null;
  var generatedOnLabel = t.generatedOnLabel || 'Generated on';
  var ensureLabelSuffix = function ensureLabelSuffix(label) {
    var base = typeof label === 'string' ? label.trim() : '';
    if (!base) return '';
    return /[:：]$/.test(base) ? base : "".concat(base, ":");
  };
  var generatedOnDisplayLabel = ensureLabelSuffix(generatedOnLabel);
  var deviceListHtml = '<div class="device-category-container">';
  var sections = {};
  var sectionOrder = [];
  var addToSection = function addToSection(key, itemHtml) {
    if (!sections[key]) {
      sections[key] = [];
      sectionOrder.push(key);
    }
    sections[key].push(itemHtml);
  };
  var processSelectForOverview = function processSelectForOverview(selectElement, headingKey, category) {
    var subcategory = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    if (selectElement.value && selectElement.value !== "None") {
      var deviceKey = selectElement.value;
      var deviceName = selectElement.options[selectElement.selectedIndex].text;
      var deviceInfo;
      if (subcategory) {
        deviceInfo = devices[category] && devices[category][subcategory] && devices[category][subcategory][deviceKey];
      } else {
        deviceInfo = devices[category] && devices[category][deviceKey];
      }
      var safeName = escapeHtmlSafe(deviceName);
      var details = '';
      if (deviceInfo !== undefined && deviceInfo !== null) {
        var connectors = summarizeConnectors(deviceInfo);
        var latencyLabel = t.videoLatencyLabel || t.monitorLatencyLabel || 'Latency:';
        var frequencyLabel = t.videoFrequencyLabel || 'Frequency:';
        var infoBoxes = (deviceInfo.latencyMs !== undefined ? "<div class=\"info-box video-conn\"><strong>".concat(escapeHtmlSafe(latencyLabel), "</strong> ").concat(escapeHtmlSafe(String(deviceInfo.latencyMs)), "</div>") : '') + (deviceInfo.frequency ? "<div class=\"info-box video-conn\"><strong>".concat(escapeHtmlSafe(frequencyLabel), "</strong> ").concat(escapeHtmlSafe(String(deviceInfo.frequency)), "</div>") : '');
        details = connectors + infoBoxes;
      }
      addToSection(headingKey, "<div class=\"device-block\"><strong>".concat(safeName, "</strong>").concat(details, "</div>"));
    }
  };
  processSelectForOverview(cameraSelect, 'category_cameras', 'cameras');
  processSelectForOverview(monitorSelect, 'category_monitors', 'monitors');
  processSelectForOverview(videoSelect, 'category_video', 'video');
  processSelectForOverview(distanceSelect, 'category_fiz_distance', 'fiz', 'distance');
  motorSelects.forEach(function (sel) {
    return processSelectForOverview(sel, 'category_fiz_motors', 'fiz', 'motors');
  });
  controllerSelects.forEach(function (sel) {
    return processSelectForOverview(sel, 'category_fiz_controllers', 'fiz', 'controllers');
  });
  processSelectForOverview(batterySelect, 'category_batteries', 'batteries');
  processSelectForOverview(hotswapSelect, 'category_batteryHotswaps', 'batteryHotswaps');
  sectionOrder.forEach(function (key) {
    var heading = t[key] || key;
    var icon = overviewSectionIcons[key] || '';
    var iconHtml = icon && typeof iconMarkup === 'function' ? iconMarkup(icon, 'category-icon') : icon ? "<span class=\"category-icon icon-glyph\" data-icon-font=\"uicons\" aria-hidden=\"true\">".concat(icon, "</span>") : '';
    var isFizList = key === 'category_fiz_motors' || key === 'category_fiz_controllers';
    var gridClasses = isFizList ? 'device-block-grid two-column fiz-single-column' : 'device-block-grid single-column';
    deviceListHtml += "<div class=\"device-category\"><h3>".concat(iconHtml).concat(heading, "</h3><div class=\"").concat(gridClasses, "\">").concat(sections[key].join(''), "</div></div>");
  });
  deviceListHtml += '</div>';
  var breakdownHtml = breakdownListElem.innerHTML;
  var batteryLifeUnitElem = document.getElementById("batteryLifeUnit");
  var powerDiagramElem = typeof document !== 'undefined' ? document.getElementById('powerDiagram') : null;
  var powerDiagramHtml = '';
  if (powerDiagramElem && !powerDiagramElem.classList.contains('hidden') && powerDiagramElem.innerHTML.trim().length > 0) {
    var clone = powerDiagramElem.cloneNode(true);
    clone.id = 'powerDiagramOverview';
    clone.classList.remove('hidden');
    clone.classList.add('power-diagram');
    var bar = clone.querySelector('#powerDiagramBar');
    if (bar) {
      bar.id = 'powerDiagramBarOverview';
    }
    var legend = clone.querySelector('#powerDiagramLegend');
    if (legend) {
      legend.id = 'powerDiagramLegendOverview';
      legend.classList.add('power-diagram-legend');
    }
    var maxPowerText = clone.querySelector('#maxPowerText');
    if (maxPowerText) {
      maxPowerText.id = 'maxPowerTextOverview';
      maxPowerText.classList.add('power-diagram-note');
    }
    powerDiagramHtml = clone.outerHTML;
  }
  var resultsHtml = "\n        <ul id=\"breakdownList\">".concat(breakdownHtml, "</ul>\n        ").concat(powerDiagramHtml, "\n        <p><strong>").concat(t.totalPowerLabel, "</strong> ").concat(totalPowerElem.textContent, " W</p>\n        <p><strong>").concat(t.totalCurrent144Label, "</strong> ").concat(totalCurrent144Elem.textContent, " A</p>\n        <p><strong>").concat(t.totalCurrent12Label, "</strong> ").concat(totalCurrent12Elem.textContent, " A</p>\n        <p><strong>").concat(t.batteryLifeLabel, "</strong> ").concat(batteryLifeElem.textContent, " ").concat(batteryLifeUnitElem ? batteryLifeUnitElem.textContent : '', "</p>\n        <p><strong>").concat(t.batteryCountLabel, "</strong> ").concat(batteryCountElem.textContent, "</p>\n    ");
  var severityClassMap = {
    danger: 'status-message--danger',
    warning: 'status-message--warning',
    note: 'status-message--note',
    success: 'status-message--success',
    info: 'status-message--info'
  };
  var extractSeverityClass = function extractSeverityClass(element) {
    if (!element) return '';
    var datasetLevel = element.dataset ? element.dataset.statusLevel : element.getAttribute && element.getAttribute('data-status-level');
    if (datasetLevel && severityClassMap[datasetLevel]) {
      return severityClassMap[datasetLevel];
    }
    if (element.classList) {
      return Object.values(severityClassMap).find(function (cls) {
        return element.classList.contains(cls);
      }) || '';
    }
    var classAttr = typeof element.getAttribute === 'function' ? element.getAttribute('class') : '';
    if (classAttr) {
      var classes = classAttr.split(/\s+/);
      return Object.values(severityClassMap).find(function (cls) {
        return classes.includes(cls);
      }) || '';
    }
    return '';
  };
  var buildStatusMarkup = function buildStatusMarkup(element) {
    if (!element || element.textContent.trim() === '') {
      return '';
    }
    var classes = ['status-message'];
    var severityClass = extractSeverityClass(element);
    if (severityClass) {
      classes.push(severityClass);
    }
    return "<p class=\"".concat(classes.join(' '), "\">").concat(escapeHtmlSafe(element.textContent), "</p>");
  };
  var warningHtml = buildStatusMarkup(pinWarnElem) + buildStatusMarkup(dtapWarnElem);
  var resultsSectionHtml = "\n        <section id=\"resultsSection\" class=\"results-section print-section\">\n            <h2>".concat(t.resultsHeading, "</h2>\n            <div class=\"results-body\">\n                ").concat(resultsHtml, "\n                ").concat(warningHtml ? "<div class=\"results-warnings\">".concat(warningHtml, "</div>") : '', "\n            </div>\n        </section>\n    ");
  var batteryComparisonSection = typeof document !== 'undefined' ? document.getElementById('batteryComparison') : null;
  var isSectionRenderable = function isSectionRenderable(section) {
    if (!section) return false;
    if (section.hasAttribute('hidden')) return false;
    if (section.classList && section.classList.contains('hidden')) return false;
    if (section.style && section.style.display === 'none') return false;
    if (typeof window !== 'undefined' && typeof window.getComputedStyle === 'function') {
      var computed = window.getComputedStyle(section);
      if (computed.display === 'none' || computed.visibility === 'hidden') {
        return false;
      }
    }
    var table = section.querySelector('table');
    return table ? table.innerHTML.trim().length > 0 : false;
  };
  var batteryComparisonHtml = '';
  if (isSectionRenderable(batteryComparisonSection)) {
    var _clone = batteryComparisonSection.cloneNode(true);
    _clone.id = 'batteryComparisonOverview';
    _clone.classList.add('print-section', 'battery-comparison-section');
    _clone.removeAttribute('style');
    var heading = _clone.querySelector('#batteryComparisonHeading');
    if (heading) {
      heading.id = 'batteryComparisonOverviewHeading';
    }
    var container = _clone.querySelector('#batteryTableContainer');
    if (container) {
      container.id = 'batteryTableOverviewContainer';
    }
    var table = _clone.querySelector('#batteryTable');
    if (table) {
      table.removeAttribute('id');
    }
    batteryComparisonHtml = "<div class=\"page-break\"></div>".concat(_clone.outerHTML);
  }
  var safeSetupName = escapeHtmlSafe(setupName);
  var diagramCss = typeof getDiagramCss === 'function' ? getDiagramCss(false) : '';
  var resolveDiagramElement = function resolveDiagramElement(fallbackId, globalRefName) {
    if (globalRefName) {
      try {
        if (typeof globalThis !== 'undefined' && globalRefName in globalThis) {
          var value = globalThis[globalRefName];
          if (value) return value;
        }
      } catch (resolveGlobalError) {
        void resolveGlobalError;
      }
    }
    if (typeof document !== 'undefined' && typeof document.getElementById === 'function') {
      try {
        return document.getElementById(fallbackId);
      } catch (resolveDomError) {
        void resolveDomError;
      }
    }
    return null;
  };
  var diagramContainer = resolveDiagramElement('diagramArea', 'setupDiagramContainer');
  var diagramAreaHtml = '';
  var diagramLegendHtml = '';
  var diagramHintHtml = '';
  var diagramDescHtml = '';
  if (diagramContainer) {
    var areaClone = diagramContainer.cloneNode(true);
    areaClone.id = 'diagramAreaOverview';
    areaClone.setAttribute('data-diagram-area', 'overview');
    var describedBy = areaClone.getAttribute('aria-describedby');
    if (describedBy) {
      var ids = describedBy.split(/\s+/).filter(Boolean);
      var updated = ids.map(function (id) {
        return id === 'diagramDesc' ? 'diagramDescOverview' : id;
      });
      areaClone.setAttribute('aria-describedby', updated.join(' '));
    } else {
      areaClone.setAttribute('aria-describedby', 'diagramDescOverview');
    }
    var popupClone = areaClone.querySelector('#diagramPopup');
    if (popupClone) {
      popupClone.id = 'diagramPopupOverview';
      popupClone.setAttribute('data-diagram-popup', 'overview');
      popupClone.style.position = 'static';
      popupClone.style.display = 'none';
    }
    var svg = areaClone.querySelector('svg');
    if (svg) {
      var style = document.createElement('style');
      style.textContent = diagramCss;
      svg.insertBefore(style, svg.firstChild);
    }
    diagramAreaHtml = areaClone.outerHTML;
  }
  var sourceDiagramLegend = resolveDiagramElement('diagramLegend', 'diagramLegend');
  if (sourceDiagramLegend) {
    var legendClone = sourceDiagramLegend.cloneNode(true);
    legendClone.id = 'diagramLegendOverview';
    legendClone.setAttribute('data-diagram-legend', 'overview');
    diagramLegendHtml = legendClone.outerHTML;
  }
  var diagramDescElem = typeof document !== 'undefined' ? document.getElementById('diagramDesc') : null;
  if (diagramDescElem) {
    var descClone = diagramDescElem.cloneNode(true);
    descClone.id = 'diagramDescOverview';
    descClone.setAttribute('data-diagram-description', 'overview');
    diagramDescHtml = descClone.outerHTML;
  }
  var diagramSectionHtml = diagramAreaHtml ? "<section id=\"setupDiagram\" class=\"diagram-section print-section\"><h2>".concat(t.setupDiagramHeading, "</h2>").concat(diagramDescHtml).concat(diagramAreaHtml).concat(diagramLegendHtml).concat(diagramHintHtml, "</section>") : '';
  var hasGeneratedGearList = function () {
    if (typeof document === 'undefined') return false;
    var container = document.getElementById('gearListOutput');
    if (!container) return false;
    if (container.classList && container.classList.contains('hidden')) {
      return false;
    }
    var trimmed = typeof container.innerHTML === 'string' ? container.innerHTML.trim() : '';
    if (!trimmed) return false;
    if (typeof container.querySelector === 'function') {
      var _table = container.querySelector('.gear-table');
      if (_table) return true;
    }
    return true;
  }();
  var gearListCombined = getCurrentGearListHtml();
  if (!gearListCombined && currentProjectInfo) {
    gearListCombined = generateGearListHtml(currentProjectInfo);
  }
  var projectSectionHtml = '';
  var gearSectionHtml = '';
  if (gearListCombined) {
    var parts = typeof splitGearListHtml === 'function' ? splitGearListHtml(gearListCombined) : {
      projectHtml: '',
      gearHtml: ''
    };
    if (parts.projectHtml) {
      projectSectionHtml = "<section id=\"projectRequirementsOutput\" class=\"print-section project-requirements-section\">".concat(parts.projectHtml, "</section>");
    }
    if (parts.gearHtml && hasGeneratedGearList) {
      gearSectionHtml = "<section id=\"gearListOutput\" class=\"gear-list-section\">".concat(parts.gearHtml, "</section>");
    }
  }
  var projectRequirementsHtml = projectSectionHtml || '';
  var gearListHtml = gearSectionHtml || '';
  var deleteGearListLabel = t.deleteGearListBtn || 'Delete Gear List';
  var deleteGearListHelp = t.deleteGearListBtnHelp || deleteGearListLabel;
  var gearListActionsHtml = gearListHtml ? "<div class=\"overview-gear-actions\"><button id=\"overviewDeleteGearListBtn\" class=\"overview-delete-gear-btn\" title=\"".concat(escapeHtmlSafe(deleteGearListHelp), "\" data-help=\"").concat(escapeHtmlSafe(deleteGearListHelp), "\"><span class=\"btn-icon icon-glyph\" aria-hidden=\"true\" data-icon-font=\"essential\">&#xF254;</span>").concat(escapeHtmlSafe(deleteGearListLabel), "</button></div>") : '';
  var logoHtml = customLogo ? "<img id=\"printLogo\" src=\"".concat(customLogo, "\" alt=\"Logo\" />") : '';
  var contentClass = customLogo ? 'logo-present' : '';
  var generatedOnDisplay = "".concat(escapeHtmlSafe(generatedOnDisplayLabel), " ").concat(escapeHtmlSafe(dateTimeString));
  var exportPdfLabel = t.exportPdfBtn || 'Export PDF';
  var exportIconHtml = function () {
    if (typeof iconMarkup === 'function' && ICON_GLYPHS && ICON_GLYPHS.fileExport) {
      try {
        return iconMarkup(ICON_GLYPHS.fileExport, 'btn-icon');
      } catch (error) {
        logOverview('warn', 'Unable to render export icon for overview dialog.', error, {
          action: 'render-icon',
          icon: 'fileExport'
        });
      }
    }
    return '<span class="btn-icon icon-glyph" aria-hidden="true" data-icon-font="uicons">&#xE7AB;</span>';
  }();
  var overviewHtml = "\n        <div id=\"overviewDialogContent\" class=\"".concat(contentClass, "\">\n            <div class=\"overview-actions\">\n                <button id=\"closeOverviewBtn\" class=\"back-btn\"><span class=\"btn-icon icon-glyph\" aria-hidden=\"true\" data-icon-font=\"essential\">&#xF131;</span>").concat(escapeHtmlSafe(t.backToAppBtn), "</button>\n                <button id=\"printOverviewBtn\" class=\"print-btn\"><span class=\"btn-icon icon-glyph\" aria-hidden=\"true\" data-icon-font=\"uicons\">&#xE7AB;</span>").concat(escapeHtmlSafe(t.printBtn), "</button>\n                <button id=\"exportPdfBtn\" class=\"print-btn export-pdf-btn\">").concat(exportIconHtml).concat(escapeHtmlSafe(exportPdfLabel), "</button>\n            </div>\n            ").concat(logoHtml, "\n            <h1>").concat(t.overviewTitle, "</h1>\n            <p><strong>").concat(t.setupNameLabel, "</strong> ").concat(safeSetupName, "</p>\n            <p><em>").concat(generatedOnDisplay, "</em></p>\n\n            ").concat(projectRequirementsHtml, "\n\n            <h2>").concat(t.overviewDeviceSelectionHeading || t.deviceSelectionHeading, "</h2>\n            ").concat(deviceListHtml, "\n\n            ").concat(resultsSectionHtml, "\n\n            ").concat(diagramSectionHtml, "\n\n            ").concat(gearListHtml, "\n            ").concat(gearListActionsHtml, "\n            ").concat(batteryComparisonHtml, "\n        </div>\n    ");
  var overviewDialog = document.getElementById('overviewDialog');
  overviewDialog.innerHTML = overviewHtml;
  if (overviewDialog && !overviewDialog.hasAttribute('data-overview-outside-close')) {
    overviewDialog.addEventListener('click', function (event) {
      if (event.target === overviewDialog) {
        closeDialog(overviewDialog);
      }
    });
    overviewDialog.addEventListener('cancel', function (event) {
      event.preventDefault();
      closeDialog(overviewDialog);
    });
    overviewDialog.setAttribute('data-overview-outside-close', '');
  }
  var content = overviewDialog.querySelector('#overviewDialogContent');
  var applyThemeClasses = function applyThemeClasses(target) {
    if (!target || typeof document === 'undefined') return;
    var themeClasses = ['dark-mode', 'light-mode', 'pink-mode', 'dark-accent-boost', 'high-contrast', 'reduce-motion', 'relaxed-spacing'];
    var activeClasses = new Set([].concat(_toConsumableArray(document.documentElement ? Array.from(document.documentElement.classList) : []), _toConsumableArray(document.body ? Array.from(document.body.classList) : [])));
    themeClasses.forEach(function (themeClass) {
      target.classList.toggle(themeClass, activeClasses.has(themeClass));
    });
  };
  applyThemeClasses(content);
  var closeBtn = overviewDialog.querySelector('#closeOverviewBtn');
  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      closeDialog(overviewDialog);
    });
  }
  var overviewDeleteBtn = overviewDialog.querySelector('#overviewDeleteGearListBtn');
  if (overviewDeleteBtn) {
    var supportsCustomEvents = typeof document !== 'undefined' && typeof document.addEventListener === 'function';
    if (supportsCustomEvents) {
      function cleanup() {
        document.removeEventListener('gearlist:deleted', handleGearListDeleted);
        overviewDialog.removeEventListener('close', cleanup);
      }
      function handleGearListDeleted() {
        cleanup();
        if (overviewDialog && overviewDialog.open) {
          generatePrintableOverview();
        }
      }
      document.addEventListener('gearlist:deleted', handleGearListDeleted);
      overviewDialog.addEventListener('close', cleanup, {
        once: true
      });
    }
    overviewDeleteBtn.addEventListener('click', function (event) {
      event.preventDefault();
      var usedFallback = false;
      if (typeof deleteCurrentGearList === 'function') {
        try {
          var deleted = deleteCurrentGearList();
          if (!supportsCustomEvents && deleted) {
            generatePrintableOverview();
          }
          return;
        } catch (error) {
          logOverview('warn', 'Failed to delete gear list from overview button', error, {
            action: 'delete-gear-list',
            method: 'direct-call'
          });
          usedFallback = true;
        }
      } else {
        usedFallback = true;
      }
      if ((usedFallback || typeof deleteCurrentGearList !== 'function') && supportsCustomEvents) {
        try {
          document.dispatchEvent(new CustomEvent('gearlist:delete-requested', {
            detail: {
              source: 'overview'
            }
          }));
        } catch (error) {
          if (typeof document.createEvent === 'function') {
            var fallbackEvent = document.createEvent('CustomEvent');
            fallbackEvent.initCustomEvent('gearlist:delete-requested', false, false, {
              source: 'overview'
            });
            document.dispatchEvent(fallbackEvent);
          } else {
            logOverview('warn', 'Unable to request gear list deletion from overview', error, {
              action: 'delete-gear-list',
              method: 'event-dispatch'
            });
          }
        }
      }
    });
  }
  var removePrintMediaListener = null;
  var afterPrintRegistered = false;
  var _closeAfterPrint = function closeAfterPrint() {
    if (removePrintMediaListener) {
      removePrintMediaListener();
      removePrintMediaListener = null;
    }
    if (afterPrintRegistered) {
      window.removeEventListener('afterprint', _closeAfterPrint);
      afterPrintRegistered = false;
    }
    if (typeof document !== 'undefined' && document.title !== originalDocumentTitle) {
      document.title = originalDocumentTitle;
    }
    closeDialog(overviewDialog);
  };
  var printWorkflowLoggerMeta = {
    action: 'print-workflow',
    source: 'overview-dialog'
  };
  if (setupName) {
    printWorkflowLoggerMeta.setupName = setupName;
  } else if (fallbackProjectName) {
    printWorkflowLoggerMeta.projectName = fallbackProjectName;
  }
  var printWorkflowLogger = createOverviewLoggerProxy(printWorkflowLoggerMeta);
  var openFallbackPrintView = function openFallbackPrintView() {
    if (!content || typeof window === 'undefined') return false;
    var fallbackRoot = content.cloneNode(true);
    fallbackRoot.querySelectorAll('.print-btn, .back-btn').forEach(function (btn) {
      return btn.remove();
    });
    var printWindow = window.open('', '_blank', 'noopener,noreferrer');
    if (!printWindow) {
      logOverview('error', 'Unable to open a fallback print window. Please allow pop-ups and try again.', undefined, {
        action: 'print-workflow',
        stage: 'fallback-window-open',
        result: 'blocked'
      });
      return false;
    }
    var doc = printWindow.document;
    var htmlElement = typeof document !== 'undefined' ? document.documentElement : null;
    var htmlClassName = htmlElement ? htmlElement.className : '';
    var htmlDir = htmlElement ? htmlElement.getAttribute('dir') || '' : '';
    var htmlLang = htmlElement ? htmlElement.getAttribute('lang') || 'en' : 'en';
    var htmlInlineStyle = htmlElement ? htmlElement.getAttribute('style') || '' : '';
    var bodyElement = typeof document !== 'undefined' ? document.body : null;
    var bodyClassName = bodyElement ? bodyElement.className : '';
    var bodyInlineStyle = bodyElement ? bodyElement.getAttribute('style') || '' : '';
    var escapedPrintDocumentTitle = escapeHtmlSafe(printDocumentTitle);
    doc.open();
    doc.write("<!DOCTYPE html>\n<html>\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"color-scheme\" content=\"light dark\">\n<title>".concat(escapedPrintDocumentTitle, "</title>\n<link rel=\"stylesheet\" href=\"src/styles/style.css\">\n<link rel=\"stylesheet\" href=\"src/styles/overview.css\">\n<link rel=\"stylesheet\" href=\"src/styles/overview-print.css\" media=\"print\">\n<link rel=\"stylesheet\" href=\"overview-print.css\" media=\"screen\">\n</head>\n<body></body>\n</html>"));
    doc.close();
    doc.title = printDocumentTitle;
    var fallbackHtml = doc.documentElement;
    if (fallbackHtml) {
      fallbackHtml.setAttribute('lang', htmlLang || 'en');
      if (htmlDir) {
        fallbackHtml.setAttribute('dir', htmlDir);
      }
      if (htmlClassName) {
        fallbackHtml.className = htmlClassName;
      }
      if (htmlInlineStyle) {
        fallbackHtml.setAttribute('style', htmlInlineStyle);
      }
    }
    var fallbackBody = doc.body;
    if (fallbackBody) {
      if (bodyClassName) {
        fallbackBody.className = bodyClassName;
      }
      if (bodyInlineStyle) {
        fallbackBody.setAttribute('style', bodyInlineStyle);
      }
      fallbackBody.innerHTML = fallbackRoot.outerHTML;
    }
    var triggerPrint = function triggerPrint() {
      printWindow.focus();
      try {
        printWindow.print();
      } catch (error) {
        logOverview('error', 'Failed to trigger print in fallback window.', error, {
          action: 'print-workflow',
          stage: 'fallback-window-print'
        });
      }
    };
    if (printWindow.document.readyState === 'complete') {
      triggerPrint();
    } else {
      printWindow.addEventListener('load', triggerPrint, {
        once: true
      });
    }
    printWindow.addEventListener('afterprint', function () {
      printWindow.close();
    });
    return true;
  };
  var fallbackTriggerPrintWorkflow = function fallbackTriggerPrintWorkflow(context) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _ref = options || {},
      _ref$preferFallback = _ref.preferFallback,
      preferFallback = _ref$preferFallback === void 0 ? false : _ref$preferFallback;
    var windowRef = context && context.windowRef ? context.windowRef : typeof window !== 'undefined' ? window : null;
    var documentRef = context && context.documentRef ? context.documentRef : typeof document !== 'undefined' ? document : null;
    var openFallback = context && typeof context.openFallbackPrintView === 'function' ? context.openFallbackPrintView : function () {
      return false;
    };
    var cleanup = context && typeof context.closeAfterPrint === 'function' ? context.closeAfterPrint : function () {};
    var printTitle = context && typeof context.printDocumentTitle === 'string' ? context.printDocumentTitle : '';
    var originalTitle = context && typeof context.originalDocumentTitle === 'string' ? context.originalDocumentTitle : documentRef && typeof documentRef.title === 'string' ? documentRef.title : '';
    var attemptNative = function attemptNative() {
      if (!windowRef || typeof windowRef.print !== 'function') {
        return false;
      }
      try {
        if (documentRef && printTitle) {
          documentRef.title = printTitle;
        }
        windowRef.print();
        return true;
      } catch (error) {
        void error;
        return false;
      }
    };
    var success = false;
    if (!preferFallback) {
      success = attemptNative();
    }
    if (!success) {
      success = openFallback();
      if (success) {
        cleanup();
      }
    }
    if (!success && documentRef && printTitle && documentRef.title === printTitle) {
      try {
        documentRef.title = originalTitle;
      } catch (restoreError) {
        void restoreError;
      }
    }
    return success;
  };
  var printWorkflowContext = {
    windowRef: typeof window !== 'undefined' ? window : null,
    documentRef: typeof document !== 'undefined' ? document : null,
    printDocumentTitle: printDocumentTitle,
    originalDocumentTitle: originalDocumentTitle,
    openFallbackPrintView: openFallbackPrintView,
    closeAfterPrint: _closeAfterPrint,
    logger: printWorkflowLogger
  };
  var resolvedPrintWorkflow = typeof createOverviewPrintWorkflowModule === 'function' ? createOverviewPrintWorkflowModule(printWorkflowContext) : null;
  var triggerPrintWorkflow = function triggerPrintWorkflow() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (resolvedPrintWorkflow && typeof resolvedPrintWorkflow.trigger === 'function') {
      return resolvedPrintWorkflow.trigger(options);
    }
    if (typeof triggerOverviewPrintWorkflowModule === 'function') {
      return triggerOverviewPrintWorkflowModule(printWorkflowContext, options);
    }
    return fallbackTriggerPrintWorkflow(printWorkflowContext, options);
  };
  var exportBtn = overviewDialog.querySelector('#exportPdfBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', function () {
      if (exportBtn.disabled) {
        return;
      }
      exportBtn.disabled = true;
      try {
        var printStarted = triggerPrintWorkflow({
          preferFallback: true,
          reason: 'export'
        });
        if (!printStarted) {
          logOverview('error', 'Unable to start the PDF export print workflow. Please enable pop-ups and try again.', undefined, {
            action: 'print-workflow',
            stage: 'trigger',
            reason: 'export',
            result: 'not-started'
          });
        }
      } catch (error) {
        logOverview('error', 'Failed to export overview PDF via print workflow.', error, {
          action: 'print-workflow',
          stage: 'trigger',
          reason: 'export'
        });
      } finally {
        exportBtn.disabled = false;
      }
    });
  }
  var printBtn = overviewDialog.querySelector('#printOverviewBtn');
  if (printBtn) {
    printBtn.addEventListener('click', function () {
      var success = triggerPrintWorkflow({
        reason: 'print'
      });
      if (!success) {
        logOverview('error', 'Unable to open the print dialog. Please check your browser settings and try again.', undefined, {
          action: 'print-workflow',
          stage: 'trigger',
          reason: 'print',
          result: 'not-started'
        });
      }
    });
  }
  openDialog(overviewDialog);
  if (autoPrint) {
    var printed = triggerPrintWorkflow({
      reason: 'generate'
    });
    if (!printed) {
      logOverview('error', 'Unable to open the print dialog. Please check your browser settings and try again.', undefined, {
        action: 'print-workflow',
        stage: 'trigger',
        reason: 'generate',
        result: 'not-started'
      });
    }
  }
  if (typeof window.matchMedia === 'function') {
    var mql = window.matchMedia('print');
    var mqlListener = function mqlListener(e) {
      if (!e.matches) {
        if (removePrintMediaListener) {
          removePrintMediaListener();
          removePrintMediaListener = null;
        }
        _closeAfterPrint();
      }
    };
    if (mql.addEventListener) {
      mql.addEventListener('change', mqlListener);
      removePrintMediaListener = function removePrintMediaListener() {
        return mql.removeEventListener('change', mqlListener);
      };
    } else if (mql.addListener) {
      mql.addListener(mqlListener);
      removePrintMediaListener = function removePrintMediaListener() {
        return mql.removeListener(mqlListener);
      };
    }
  }
  window.addEventListener('afterprint', _closeAfterPrint, {
    once: true
  });
  afterPrintRegistered = true;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generatePrintableOverview: generatePrintableOverview
  };
}