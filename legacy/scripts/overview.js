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
function collectOverviewLoggingScopes() {
  var scopes = [];
  if (typeof globalThis !== 'undefined' && globalThis && scopes.indexOf(globalThis) === -1) scopes.push(globalThis);
  if (typeof window !== 'undefined' && window && scopes.indexOf(window) === -1) scopes.push(window);
  if (typeof self !== 'undefined' && self && scopes.indexOf(self) === -1) scopes.push(self);
  if (typeof global !== 'undefined' && global && scopes.indexOf(global) === -1) scopes.push(global);
  return scopes;
}
function resolveOverviewLoggingResolver() {
  if (typeof require === 'function') {
    try {
      var required = require('./modules/logging-resolver.js');
      if (required && typeof required.resolveLogger === 'function') {
        return required;
      }
    } catch (error) {
      void error;
    }
  }
  var scopes = collectOverviewLoggingScopes();
  for (var index = 0; index < scopes.length; index += 1) {
    var scope = scopes[index];
    if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
      continue;
    }
    try {
      var resolver = scope.cineLoggingResolver;
      if (resolver && typeof resolver.resolveLogger === 'function') {
        return resolver;
      }
    } catch (resolveError) {
      void resolveError;
    }
  }
  return null;
}
function resolveLegacyOverviewLogger() {
  var scopes = collectOverviewLoggingScopes();
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
}
var overviewLogger = function () {
  var resolver = resolveOverviewLoggingResolver();
  if (resolver && typeof resolver.resolveLogger === 'function') {
    try {
      var logger = resolver.resolveLogger('overview', {
        meta: {
          source: 'overview-dialog'
        }
      });
      if (logger) {
        return logger;
      }
    } catch (resolverError) {
      void resolverError;
    }
  }
  return resolveLegacyOverviewLogger();
}();
var overviewConsoleFallback = (typeof console === "undefined" ? "undefined" : _typeof(console)) === 'object' && console ? console : null;
var OVERVIEW_LOG_META_DEFAULTS = Object.freeze({
  namespace: 'overview',
  source: 'overview-dialog'
});
function resolveOverviewCloneScope() {
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
function overviewJsonDeepClone(value) {
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
function overviewResolveStructuredClone(scope) {
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
function createOverviewDeepClone(scope) {
  var structuredCloneImpl = overviewResolveStructuredClone(scope);
  if (!structuredCloneImpl) {
    return overviewJsonDeepClone;
  }
  return function overviewResilientDeepClone(value) {
    if (value === null || _typeof(value) !== 'object') {
      return value;
    }
    try {
      return structuredCloneImpl(value);
    } catch (structuredCloneError) {
      void structuredCloneError;
    }
    return overviewJsonDeepClone(value);
  };
}
var OVERVIEW_DEEP_CLONE = function () {
  var scope = resolveOverviewCloneScope();
  if (scope && typeof scope.__cineDeepClone === 'function') {
    return scope.__cineDeepClone;
  }
  return createOverviewDeepClone(scope);
}();
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
      var clonedArray = OVERVIEW_DEEP_CLONE(value);
      if (clonedArray !== value) {
        clone[key] = clonedArray;
        continue;
      }
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
        var clonedItem = OVERVIEW_DEEP_CLONE(item);
        if (clonedItem !== item || item === null || _typeof(item) !== 'object') {
          return clonedItem;
        }
        return String(item);
      });
      continue;
    }
    if (valueType === 'object') {
      var clonedObject = OVERVIEW_DEEP_CLONE(value);
      if (clonedObject !== value || value === null) {
        clone[key] = clonedObject;
      } else {
        clone[key] = String(value);
      }
      continue;
    }
    var clonedValue = OVERVIEW_DEEP_CLONE(value);
    if (clonedValue !== value || value === null || _typeof(value) !== 'object') {
      clone[key] = clonedValue;
    } else {
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
      var resolveOverviewGearListSections = function resolveOverviewGearListSections(html) {
        var normalizedHtml = typeof html === 'string' ? html : '';
        if (!normalizedHtml) {
          return {
            projectHtml: '',
            gearHtml: ''
          };
        }
        var fallbackResult = {
          projectHtml: '',
          gearHtml: normalizedHtml
        };
        var globalScope = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
        var trySplit = function trySplit(fn, source) {
          if (typeof fn !== 'function') {
            return null;
          }
          try {
            var result = fn.call(globalScope, normalizedHtml);
            if (!result || _typeof(result) !== 'object') {
              return null;
            }
            var projectHtml = typeof result.projectHtml === 'string' ? result.projectHtml : '';
            var gearHtml = typeof result.gearHtml === 'string' ? result.gearHtml : projectHtml ? '' : normalizedHtml;
            return {
              projectHtml: projectHtml,
              gearHtml: gearHtml
            };
          } catch (error) {
            logOverview('warn', 'Unable to split gear list HTML for overview rendering.', error, {
              action: 'split-gear-html',
              source: source
            });
            return null;
          }
        };
        var candidates = [];
        if (typeof getSafeGearListHtmlSections === 'function') {
          candidates.push({
            fn: getSafeGearListHtmlSections,
            source: 'global-getSafeGearListHtmlSections'
          });
        }
        if (globalScope && globalScope.cineGearList && typeof globalScope.cineGearList.getSafeGearListHtmlSections === 'function') {
          candidates.push({
            fn: globalScope.cineGearList.getSafeGearListHtmlSections,
            source: 'cineGearList.getSafeGearListHtmlSections'
          });
        }
        if (typeof splitGearListHtml === 'function') {
          candidates.push({
            fn: splitGearListHtml,
            source: 'global-splitGearListHtml'
          });
        }
        if (globalScope && globalScope.cineGearList && typeof globalScope.cineGearList.splitGearListHtml === 'function') {
          candidates.push({
            fn: globalScope.cineGearList.splitGearListHtml,
            source: 'cineGearList.splitGearListHtml'
          });
        }
        for (var index = 0; index < candidates.length; index += 1) {
          var candidate = candidates[index];
          var sections = trySplit(candidate.fn, candidate.source);
          if (sections) {
            return sections;
          }
        }
        return fallbackResult;
      };
      (function exposeOverviewGearListSections() {
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
          try {
            if (!scope.resolveOverviewGearListSections) {
              scope.resolveOverviewGearListSections = resolveOverviewGearListSections;
            }
          } catch (assignError) {
            void assignError;
          }
        }
      })();
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
var _pendingPrintCleanup = null;
var PRINT_PREFERENCES_STORAGE_KEY = 'cineRentalPrintSections';
function getPrintSectionConfig() {
  return [{
    id: 'project',
    selector: '#projectRequirementsOutput',
    defaultVisible: true,
    labelKey: 'rentalPrintSectionProject',
    fallbackLabel: 'Project Requirements'
  }, {
    id: 'devices',
    selector: '#overviewDeviceSection',
    defaultVisible: true,
    labelKey: 'rentalPrintSectionDevices',
    fallbackLabel: 'Camera Setup Devices'
  }, {
    id: 'power',
    selector: '#resultsSection',
    defaultVisible: true,
    labelKey: 'rentalPrintSectionPower',
    fallbackLabel: 'Power Summary'
  }, {
    id: 'diagram',
    selector: '#setupDiagram',
    defaultVisible: true,
    labelKey: 'rentalPrintSectionDiagram',
    fallbackLabel: 'Camera Diagram'
  }, {
    id: 'gear',
    selector: '#gearListOutput',
    defaultVisible: true,
    labelKey: 'rentalPrintSectionGearList',
    fallbackLabel: 'Gear List'
  }, {
    id: 'battery',
    selector: '.battery-comparison-section',
    defaultVisible: true,
    labelKey: 'rentalPrintSectionBattery',
    fallbackLabel: 'Battery Comparison'
  }];
}
function loadPrintPreferences() {
  if (typeof localStorage === 'undefined') {
    return null;
  }
  try {
    var raw = localStorage.getItem(PRINT_PREFERENCES_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    var parsed = JSON.parse(raw);
    if (!parsed || _typeof(parsed) !== 'object') {
      return null;
    }
    if (parsed.sections || parsed.layout) {
      return {
        sections: _typeof(parsed.sections) === 'object' && parsed.sections !== null ? _objectSpread({}, parsed.sections) : {},
        layout: typeof parsed.layout === 'string' ? parsed.layout : 'standard'
      };
    }
    return {
      sections: _objectSpread({}, parsed),
      layout: 'rental'
    };
  } catch (error) {
    logOverview('warn', 'Unable to read rental print section preferences.', error, {
      action: 'rental-print-load-preferences'
    });
  }
  return null;
}
function savePrintPreferences(preferences) {
  if (typeof localStorage === 'undefined') {
    return false;
  }
  try {
    var serialized = JSON.stringify(preferences || {});
    localStorage.setItem(PRINT_PREFERENCES_STORAGE_KEY, serialized);
    return true;
  } catch (error) {
    logOverview('warn', 'Unable to persist rental print section preferences.', error, {
      action: 'rental-print-save-preferences'
    });
  }
  return false;
}
function runPendingPrintCleanup(reason) {
  if (typeof _pendingPrintCleanup !== 'function') {
    return;
  }
  var cleanup = _pendingPrintCleanup;
  _pendingPrintCleanup = null;
  try {
    cleanup();
  } catch (cleanupError) {
    logOverview('warn', 'Failed to restore print state after workflow finished.', cleanupError, {
      action: 'print-cleanup',
      reason: reason
    });
  }
}
var printOptionsDialogContext = null;
function getPrintOptionsDialogContext() {
  if (printOptionsDialogContext) {
    return printOptionsDialogContext;
  }
  if (typeof document === 'undefined') {
    return null;
  }
  var dialog = document.getElementById('printOptionsDialog');
  if (!dialog) {
    return null;
  }
  if (!dialog.hasAttribute('data-print-backdrop-close')) {
    dialog.addEventListener('click', function (event) {
      if (event && event.target === dialog) {
        closeDialog(dialog);
      }
    });
    dialog.addEventListener('cancel', function (event) {
      if (event) {
        event.preventDefault();
      }
      closeDialog(dialog);
    });
    dialog.setAttribute('data-print-backdrop-close', 'true');
  }
  var form = dialog.querySelector('#printOptionsForm');
  var sections = dialog.querySelector('#printOptionsSections');
  var selectAllBtn = dialog.querySelector('#printOptionsSelectAllBtn');
  var cancelBtn = dialog.querySelector('#printOptionsCancelBtn');
  var exportBtn = dialog.querySelector('#printOptionsExportBtn');
  var printBtn = dialog.querySelector('#printOptionsPrintBtn');
  var title = dialog.querySelector('#printOptionsDialogTitle');
  var description = dialog.querySelector('#printOptionsDialogDescription');
  var layoutFieldset = dialog.querySelector('#printOptionsLayout');
  var layoutLabel = dialog.querySelector('#printOptionsLayoutLabel');
  var layoutChoices = dialog.querySelector('#printOptionsLayoutChoices');
  if (!form || !sections || !title || !description || !selectAllBtn || !cancelBtn || !exportBtn || !printBtn) {
    return null;
  }
  printOptionsDialogContext = {
    dialog: dialog,
    form: form,
    sections: sections,
    selectAllBtn: selectAllBtn,
    cancelBtn: cancelBtn,
    exportBtn: exportBtn,
    printBtn: printBtn,
    layoutFieldset: layoutFieldset,
    layoutLabel: layoutLabel,
    layoutChoices: layoutChoices,
    title: title,
    description: description
  };
  return printOptionsDialogContext;
}
function populatePrintOptionsDialog(context, preferences, onConfirm) {
  var _texts, _texts2;
  if (!context) {
    return;
  }
  var langTexts = texts && texts[currentLang] || ((_texts = texts) === null || _texts === void 0 ? void 0 : _texts.en) || {};
  var fallbackTexts = ((_texts2 = texts) === null || _texts2 === void 0 ? void 0 : _texts2.en) || {};
  var title = langTexts.rentalPrintDialogTitle || fallbackTexts.rentalPrintDialogTitle || 'Export PDF / Print';
  var description = langTexts.rentalPrintDialogDescription || fallbackTexts.rentalPrintDialogDescription || 'Choose what to include before exporting or printing.';
  var sectionsLabel = langTexts.rentalPrintDialogSectionsLabel || fallbackTexts.rentalPrintDialogSectionsLabel || 'Sections to include';
  var exportLabel = langTexts.rentalPrintDialogConfirm || fallbackTexts.rentalPrintDialogConfirm || 'Export PDF';
  var cancelLabel = langTexts.rentalPrintDialogCancel || fallbackTexts.rentalPrintDialogCancel || 'Cancel';
  var selectAllLabel = langTexts.rentalPrintDialogSelectAll || fallbackTexts.rentalPrintDialogSelectAll || 'Select all';
  var printLabel = langTexts.printBtn || fallbackTexts.printBtn || 'Print';
  var layoutLabelText = langTexts.printOptionsLayoutLabel || fallbackTexts.printOptionsLayoutLabel || 'Layout';
  var layoutStandardLabel = langTexts.printOptionsLayoutStandard || fallbackTexts.printOptionsLayoutStandard || 'Standard layout';
  var layoutRentalLabel = langTexts.printOptionsLayoutRental || fallbackTexts.printOptionsLayoutRental || 'Rental-friendly layout';
  context.title.textContent = title;
  context.description.textContent = description;
  context.selectAllBtn.textContent = selectAllLabel;
  context.cancelBtn.textContent = cancelLabel;
  context.exportBtn.textContent = exportLabel;
  context.printBtn.textContent = printLabel;
  context.sections.innerHTML = '';
  var legend = document.createElement('legend');
  legend.textContent = sectionsLabel;
  context.sections.appendChild(legend);
  var sectionConfig = getPrintSectionConfig();
  var preferenceSections = preferences && _typeof(preferences.sections) === 'object' ? preferences.sections : preferences;
  sectionConfig.forEach(function (section) {
    var label = langTexts[section.labelKey] || fallbackTexts[section.labelKey] || section.fallbackLabel;
    var wrapper = document.createElement('label');
    wrapper.className = 'print-options-section';
    var input = document.createElement('input');
    input.type = 'checkbox';
    input.name = 'print-section';
    input.value = section.id;
    input.id = "printSection_".concat(section.id);
    var preferenceValue = preferenceSections && Object.prototype.hasOwnProperty.call(preferenceSections, section.id) ? preferenceSections[section.id] : section.defaultVisible;
    input.checked = preferenceValue !== false;
    var textSpan = document.createElement('span');
    textSpan.textContent = label;
    wrapper.appendChild(input);
    wrapper.appendChild(textSpan);
    context.sections.appendChild(wrapper);
  });
  if (context.layoutFieldset && context.layoutLabel && context.layoutChoices) {
    context.layoutLabel.textContent = layoutLabelText;
    context.layoutChoices.innerHTML = '';
    var currentLayout = preferences && typeof preferences.layout === 'string' ? preferences.layout : 'standard';
    var layoutOptions = [{
      value: 'standard',
      label: layoutStandardLabel
    }, {
      value: 'rental',
      label: layoutRentalLabel
    }];
    layoutOptions.forEach(function (option) {
      var wrapper = document.createElement('label');
      wrapper.className = 'print-options-section';
      var input = document.createElement('input');
      input.type = 'radio';
      input.name = 'print-layout';
      input.value = option.value;
      if (option.value === currentLayout) {
        input.checked = true;
      }
      var textSpan = document.createElement('span');
      textSpan.textContent = option.label;
      wrapper.appendChild(input);
      wrapper.appendChild(textSpan);
      context.layoutChoices.appendChild(wrapper);
    });
    context.layoutFieldset.hidden = false;
  } else if (context.layoutFieldset) {
    context.layoutFieldset.hidden = true;
  }
  var normalizedPreferences = preferences && _typeof(preferences) === 'object' ? preferences : {};
  context.form._printConfirmHandler = typeof onConfirm === 'function' ? onConfirm : null;
  if (typeof context.form._removeDialogListeners === 'function') {
    context.form._removeDialogListeners();
    context.form._removeDialogListeners = null;
  }
  var collectSelections = function collectSelections() {
    var selections = {};
    context.form.querySelectorAll('input[name="print-section"]').forEach(function (input) {
      selections[input.value] = input.checked;
    });
    var layoutInput = context.form.querySelector('input[name="print-layout"]:checked');
    var layout = layoutInput ? layoutInput.value : normalizedPreferences.layout || 'standard';
    return {
      sections: selections,
      layout: layout
    };
  };
  var handleConfirm = function handleConfirm(event, mode) {
    event.preventDefault();
    var result = collectSelections();
    savePrintPreferences(result);
    closeDialog(context.dialog);
    if (typeof context.form._printConfirmHandler === 'function') {
      context.form._printConfirmHandler({
        mode: mode,
        preferences: result
      });
    }
  };
  var submitHandler = function submitHandler(event) {
    return handleConfirm(event, 'export');
  };
  var printHandler = function printHandler(event) {
    return handleConfirm(event, 'print');
  };
  var cancelHandler = function cancelHandler(event) {
    event.preventDefault();
    closeDialog(context.dialog);
  };
  var selectAllHandler = function selectAllHandler(event) {
    event.preventDefault();
    context.form.querySelectorAll('input[name="print-section"]').forEach(function (input) {
      input.checked = true;
    });
  };
  context.form.addEventListener('submit', submitHandler);
  context.exportBtn.addEventListener('click', submitHandler);
  context.printBtn.addEventListener('click', printHandler);
  context.cancelBtn.addEventListener('click', cancelHandler);
  context.selectAllBtn.addEventListener('click', selectAllHandler);
  context.form._removeDialogListeners = function () {
    context.form.removeEventListener('submit', submitHandler);
    context.exportBtn.removeEventListener('click', submitHandler);
    context.printBtn.removeEventListener('click', printHandler);
    context.cancelBtn.removeEventListener('click', cancelHandler);
    context.selectAllBtn.removeEventListener('click', selectAllHandler);
  };
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
  runPendingPrintCleanup('overview-init');
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
  var lensSelectElement = typeof lensSelect !== 'undefined' && lensSelect && (typeof lensSelect === "undefined" ? "undefined" : _typeof(lensSelect)) === 'object' ? lensSelect : null;
  var resolveLensDataset = function resolveLensDataset() {
    if (!devices || (typeof devices === "undefined" ? "undefined" : _typeof(devices)) !== 'object') {
      return null;
    }
    if (devices.lenses && Object.keys(devices.lenses).length) {
      return devices.lenses;
    }
    if (devices.accessories && devices.accessories.lenses) {
      return devices.accessories.lenses;
    }
    return null;
  };
  var lensDataset = resolveLensDataset();
  var fallbackTexts = texts && (typeof texts === "undefined" ? "undefined" : _typeof(texts)) === 'object' && texts.en || {};
  var numberFormatterCache = new Map();
  var getNumberFormatter = function getNumberFormatter(options) {
    var key = JSON.stringify(options || {});
    if (numberFormatterCache.has(key)) {
      return numberFormatterCache.get(key);
    }
    var formatter = null;
    try {
      formatter = (typeof Intl === "undefined" ? "undefined" : _typeof(Intl)) === 'object' && Intl && typeof Intl.NumberFormat === 'function' ? new Intl.NumberFormat(locale, options) : null;
    } catch (error) {
      void error;
      formatter = null;
    }
    numberFormatterCache.set(key, formatter);
    return formatter;
  };
  var formatNumber = function formatNumber(value) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var num = typeof value === 'string' ? Number(value) : value;
    if (!Number.isFinite(num)) {
      return '';
    }
    var formatter = getNumberFormatter(options);
    if (formatter) {
      return formatter.format(num);
    }
    var maximumFractionDigits = typeof options.maximumFractionDigits === 'number' ? options.maximumFractionDigits : 0;
    return num.toFixed(maximumFractionDigits);
  };
  var normalizeFocusScaleValue = function normalizeFocusScaleValue(value) {
    if (typeof value !== 'string') {
      return '';
    }
    var normalized = value.trim().toLowerCase();
    return normalized === 'imperial' || normalized === 'metric' ? normalized : '';
  };
  var resolveFocusScalePreference = function resolveFocusScalePreference() {
    var scope = resolveOverviewCloneScope();
    var scopePreference = scope && typeof scope.focusScalePreference === 'string' ? scope.focusScalePreference : null;
    var rawPreference = scopePreference || (typeof focusScalePreference === 'string' ? focusScalePreference : null) || 'metric';
    return normalizeFocusScaleValue(rawPreference) || 'metric';
  };
  var resolveLensFocusScaleMode = function resolveLensFocusScaleMode(lensInfo) {
    if (lensInfo && _typeof(lensInfo) === 'object') {
      var override = normalizeFocusScaleValue(lensInfo.focusScale);
      if (override) {
        return override;
      }
    }
    return resolveFocusScalePreference();
  };
  var formatFocusScalePreference = function formatFocusScalePreference(lensInfo) {
    var preference = resolveLensFocusScaleMode(lensInfo);
    var key = preference === 'imperial' ? 'focusScaleImperial' : 'focusScaleMetric';
    var labelFromLang = t && typeof t[key] === 'string' ? t[key].trim() : '';
    if (labelFromLang) {
      return labelFromLang;
    }
    var labelFromFallback = typeof fallbackTexts[key] === 'string' ? fallbackTexts[key].trim() : '';
    if (labelFromFallback) {
      return labelFromFallback;
    }
    return preference === 'imperial' ? 'Imperial' : 'Metric';
  };
  var useImperialFocusScale = function useImperialFocusScale() {
    var lensInfo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return resolveLensFocusScaleMode(lensInfo) === 'imperial';
  };
  var formatLengthMm = function formatLengthMm(value) {
    var lensInfo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var numeric = typeof value === 'string' ? Number(value) : value;
    if (!Number.isFinite(numeric)) {
      return '';
    }
    if (useImperialFocusScale(lensInfo)) {
      var inches = numeric / 25.4;
      var fractionDigits = inches >= 10 ? 1 : 2;
      var _formatted = formatNumber(inches, {
        maximumFractionDigits: fractionDigits,
        minimumFractionDigits: 0
      });
      return _formatted ? "".concat(_formatted, " in") : '';
    }
    var formatted = formatNumber(numeric, {
      maximumFractionDigits: 1,
      minimumFractionDigits: 0
    });
    return formatted ? "".concat(formatted, " mm") : '';
  };
  var formatRodLength = function formatRodLength(value) {
    var lensInfo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var numeric = typeof value === 'string' ? Number(value) : value;
    if (!Number.isFinite(numeric)) {
      return '';
    }
    if (useImperialFocusScale(lensInfo)) {
      var inches = numeric / 2.54;
      var fractionDigits = inches >= 10 ? 1 : 2;
      var _formatted2 = formatNumber(inches, {
        maximumFractionDigits: fractionDigits,
        minimumFractionDigits: 0
      });
      return _formatted2 ? "".concat(_formatted2, " in") : '';
    }
    var formatted = formatNumber(numeric, {
      maximumFractionDigits: 1,
      minimumFractionDigits: 0
    });
    return formatted ? "".concat(formatted, " cm") : '';
  };
  var formatWeight = function formatWeight(value) {
    var lensInfo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var numeric = typeof value === 'string' ? Number(value) : value;
    if (!Number.isFinite(numeric)) {
      return '';
    }
    if (useImperialFocusScale(lensInfo)) {
      var pounds = numeric / 453.59237;
      var fractionDigits = pounds >= 10 ? 1 : 2;
      var _formatted3 = formatNumber(pounds, {
        maximumFractionDigits: fractionDigits,
        minimumFractionDigits: 0
      });
      return _formatted3 ? "".concat(_formatted3, " lb") : '';
    }
    var formatted = formatNumber(numeric, {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0
    });
    return formatted ? "".concat(formatted, " g") : '';
  };
  var resolveMinFocusMeters = function resolveMinFocusMeters(lensInfo) {
    if (!lensInfo || _typeof(lensInfo) !== 'object') {
      return null;
    }
    if (typeof lensInfo.minFocusMeters !== 'undefined') {
      return lensInfo.minFocusMeters;
    }
    if (typeof lensInfo.minFocus !== 'undefined') {
      return lensInfo.minFocus;
    }
    if (typeof lensInfo.minFocusCm !== 'undefined') {
      var cmValue = Number(lensInfo.minFocusCm);
      if (Number.isFinite(cmValue)) {
        return cmValue / 100;
      }
    }
    return null;
  };
  var formatDistanceMeters = function formatDistanceMeters(value) {
    var lensInfo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var num = typeof value === 'string' ? Number(value) : value;
    if (!Number.isFinite(num)) {
      return '';
    }
    if (useImperialFocusScale(lensInfo)) {
      var feet = num * 3.280839895;
      var _digits = feet < 10 ? 2 : 1;
      var _formatted4 = formatNumber(feet, {
        maximumFractionDigits: _digits,
        minimumFractionDigits: _digits
      });
      return _formatted4 ? "".concat(_formatted4, " ft") : '';
    }
    var digits = num < 1 ? 2 : 1;
    var formatted = formatNumber(num, {
      maximumFractionDigits: digits,
      minimumFractionDigits: digits
    });
    return formatted ? "".concat(formatted, " m") : '';
  };
  var formatTStop = function formatTStop(value) {
    var num = typeof value === 'string' ? Number(value) : value;
    if (!Number.isFinite(num)) {
      return '';
    }
    var formatted = formatNumber(num, {
      maximumFractionDigits: 1,
      minimumFractionDigits: 0
    });
    return formatted ? "T".concat(formatted) : '';
  };
  var _normalizeStringValue = function normalizeStringValue(rawValue) {
    if (Array.isArray(rawValue)) {
      return rawValue.map(function (item) {
        return _normalizeStringValue(item);
      }).filter(Boolean).join(', ');
    }
    if (rawValue === null || typeof rawValue === 'undefined') {
      return '';
    }
    var str = String(rawValue).trim();
    return str;
  };
  var formatLensType = function formatLensType(value) {
    var str = _normalizeStringValue(value);
    if (!str) {
      return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  var formatClampOn = function formatClampOn(value) {
    if (value === null || typeof value === 'undefined') {
      return '';
    }
    var yesLabel = t.lensSpecYes || 'Yes';
    var noLabel = t.lensSpecNo || 'No';
    if (value === true || typeof value === 'string' && value.toLowerCase() === 'true') {
      return yesLabel;
    }
    if (value === false || typeof value === 'string' && value.toLowerCase() === 'false') {
      return noLabel;
    }
    return t.lensSpecUnknownValue || 'Unknown';
  };
  var formatSupport = function formatSupport(value) {
    if (value === null || typeof value === 'undefined') {
      return '';
    }
    if (value === true || typeof value === 'string' && value.toLowerCase() === 'true') {
      return t.lensSpecSupportRequired || 'Required';
    }
    if (value === false || typeof value === 'string' && value.toLowerCase() === 'false') {
      return t.lensSpecSupportNotRequired || 'Not required';
    }
    return t.lensSpecUnknownValue || 'Unknown';
  };
  var formatRodStandard = function formatRodStandard(value) {
    return _normalizeStringValue(value);
  };
  var formatMount = function formatMount(value) {
    return _normalizeStringValue(value);
  };
  var formatNotes = function formatNotes(value) {
    return _normalizeStringValue(value);
  };
  var createLensInfoHtml = function createLensInfoHtml(lensInfo) {
    if (!lensInfo || _typeof(lensInfo) !== 'object') {
      return '';
    }
    var infoBoxes = [];
    var addLensBox = function addLensBox(labelKey, rawValue) {
      var formatter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var formattedValue = rawValue;
      if (formatter) {
        formattedValue = formatter(rawValue, lensInfo);
      }
      if (formattedValue === null || typeof formattedValue === 'undefined') {
        return;
      }
      if (typeof formattedValue === 'string') {
        if (!formattedValue.trim()) {
          return;
        }
      }
      var valueText = typeof formattedValue === 'string' ? formattedValue : String(formattedValue);
      if (!valueText.trim()) {
        return;
      }
      var label = t[labelKey] || labelKey;
      infoBoxes.push("<span class=\"info-box neutral-conn\"><span class=\"info-box-label\">".concat(escapeHtmlSafe(label), "</span><span class=\"info-box-values\">").concat(escapeHtmlSafe(valueText), "</span></span>"));
    };
    addLensBox('lensSpecBrandLabel', lensInfo.brand, _normalizeStringValue);
    addLensBox('lensSpecTypeLabel', lensInfo.lensType, formatLensType);
    addLensBox('lensSpecMountLabel', lensInfo.mount, formatMount);
    addLensBox('lensSpecFrontDiameterLabel', lensInfo.frontDiameterMm, formatLengthMm);
    addLensBox('lensSpecTStopLabel', lensInfo.tStop, formatTStop);
    addLensBox('lensSpecImageCircleLabel', lensInfo.imageCircleMm, formatLengthMm);
    addLensBox('lensSpecLengthLabel', lensInfo.lengthMm, formatLengthMm);
    addLensBox('lensSpecMinFocusLabel', resolveMinFocusMeters(lensInfo), formatDistanceMeters);
    addLensBox('lensSpecWeightLabel', lensInfo.weight_g, formatWeight);
    addLensBox('lensSpecRodStandardLabel', lensInfo.rodStandard, formatRodStandard);
    addLensBox('lensSpecRodLengthLabel', lensInfo.rodLengthCm, formatRodLength);
    if (Object.prototype.hasOwnProperty.call(lensInfo, 'clampOn')) {
      addLensBox('lensSpecClampOnLabel', lensInfo.clampOn, formatClampOn);
    }
    if (Object.prototype.hasOwnProperty.call(lensInfo, 'needsLensSupport')) {
      addLensBox('lensSpecSupportLabel', lensInfo.needsLensSupport, formatSupport);
    }
    addLensBox('lensSpecNotesLabel', lensInfo.notes, formatNotes);
    addLensBox('lensSpecFocusScaleLabel', lensInfo, formatFocusScalePreference);
    if (!infoBoxes.length) {
      return '';
    }
    return "<div class=\"info-box-list lens-info-grid\">".concat(infoBoxes.join(''), "</div>");
  };
  var processLensesForOverview = function processLensesForOverview(selectElement, headingKey) {
    if (!selectElement) {
      return;
    }
    var selectedOptions = Array.from(selectElement.selectedOptions || []).filter(function (opt) {
      return opt && typeof opt.value === 'string' && opt.value.trim() !== '' && opt.value !== 'None';
    });
    if (!selectedOptions.length) {
      return;
    }
    selectedOptions.forEach(function (opt) {
      var lensKey = opt.value;
      var lensInfo = lensDataset && lensDataset[lensKey] ? lensDataset[lensKey] : null;
      var displayName = lensKey || opt.text || '';
      var safeName = escapeHtmlSafe(displayName);
      var details = lensInfo ? createLensInfoHtml(lensInfo) : '';
      addToSection(headingKey, "<div class=\"device-block lens-device-block\"><strong>".concat(safeName, "</strong>").concat(details, "</div>"));
    });
  };
  processSelectForOverview(cameraSelect, 'category_cameras', 'cameras');
  processLensesForOverview(lensSelectElement, 'category_lenses');
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
    var isLensList = key === 'category_lenses';
    var gridClasses = isFizList ? 'device-block-grid two-column fiz-single-column' : isLensList ? 'device-block-grid two-column lens-device-grid' : 'device-block-grid single-column';
    deviceListHtml += "<div class=\"device-category\"><h3>".concat(iconHtml).concat(heading, "</h3><div class=\"").concat(gridClasses, "\">").concat(sections[key].join(''), "</div></div>");
  });
  deviceListHtml += '</div>';
  var deviceSectionHeading = deviceListHtml ? t.overviewDeviceSelectionHeading || t.deviceSelectionHeading || 'Device Selection' : '';
  var deviceSectionHtml = deviceListHtml ? "<section id=\"overviewDeviceSection\" class=\"device-overview-section print-section\"><h2>".concat(escapeHtmlSafe(deviceSectionHeading), "</h2>").concat(deviceListHtml, "</section>") : '';
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
  var resultsHtml = "\n        <ul id=\"breakdownList\">".concat(breakdownHtml, "</ul>\n        ").concat(powerDiagramHtml, "\n        <p><strong>").concat(t.totalPowerLabel, "</strong> ").concat(escapeHtmlSafe(totalPowerElem.textContent), " W</p>\n        <p><strong>").concat(t.totalCurrent144Label, "</strong> ").concat(escapeHtmlSafe(totalCurrent144Elem.textContent), " A</p>\n        <p><strong>").concat(t.totalCurrent12Label, "</strong> ").concat(escapeHtmlSafe(totalCurrent12Elem.textContent), " A</p>\n        <p><strong>").concat(t.batteryLifeLabel, "</strong> ").concat(escapeHtmlSafe(batteryLifeElem.textContent), " ").concat(batteryLifeUnitElem ? escapeHtmlSafe(batteryLifeUnitElem.textContent) : '', "</p>\n        <p><strong>").concat(t.batteryCountLabel, "</strong> ").concat(escapeHtmlSafe(batteryCountElem.textContent), "</p>\n    ");
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
    var resolveGearSections = function () {
      var localResolver = typeof resolveOverviewGearListSections === 'function' ? resolveOverviewGearListSections : null;
      if (localResolver) {
        return localResolver;
      }
      var globalScope = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || typeof global !== 'undefined' && global || null;
      if (globalScope && typeof globalScope.resolveOverviewGearListSections === 'function') {
        return globalScope.resolveOverviewGearListSections;
      }
      return function (html) {
        return {
          projectHtml: '',
          gearHtml: typeof html === 'string' ? html : ''
        };
      };
    }();
    var parts = resolveGearSections(gearListCombined);
    if (parts.projectHtml) {
      projectSectionHtml = "<section id=\"projectRequirementsOutput\" class=\"print-section project-requirements-section\">".concat(parts.projectHtml, "</section>");
    }
    if (parts.gearHtml) {
      var shouldRenderGearList = hasGeneratedGearList || function () {
        var trimmed = parts.gearHtml.trim();
        if (!trimmed) return false;
        if (typeof document === 'undefined' || typeof document.createElement !== 'function') {
          return true;
        }
        var template = document.createElement('template');
        template.innerHTML = trimmed;
        var table = template.content.querySelector('.gear-table');
        if (!table) {
          return trimmed.length > 0;
        }
        var rows = table.querySelectorAll('tbody tr');
        if (!rows.length) {
          return false;
        }
        return Array.from(rows).some(function (row) {
          return row.textContent && row.textContent.trim().length > 0;
        });
      }();
      if (shouldRenderGearList) {
        gearSectionHtml = "<section id=\"gearListOutput\" class=\"gear-list-section print-section\">".concat(parts.gearHtml, "</section>");
      }
    }
  }
  var projectRequirementsHtml = projectSectionHtml || '';
  var gearListHtml = gearSectionHtml || '';
  var deleteGearListLabel = t.deleteGearListBtn || 'Delete Gear List';
  var deleteGearListHelp = t.deleteGearListBtnHelp || deleteGearListLabel;
  var gearListActionsHtml = '';
  var logoHtml = customLogo ? "<img id=\"printLogo\" src=\"".concat(customLogo, "\" alt=\"Logo\" />") : '';
  var contentClass = customLogo ? 'logo-present' : '';
  var generatedOnDisplay = "".concat(escapeHtmlSafe(generatedOnDisplayLabel), " ").concat(escapeHtmlSafe(dateTimeString));
  var exportPdfLabel = t.exportPdfBtn || 'Export PDF / Print';
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
  var overviewHtml = "\n        <div id=\"overviewDialogContent\" class=\"".concat(contentClass, "\">\n            <div class=\"overview-actions\">\n                <button id=\"closeOverviewBtn\" class=\"back-btn\"><span class=\"btn-icon icon-glyph\" aria-hidden=\"true\" data-icon-font=\"essential\">&#xF131;</span>").concat(escapeHtmlSafe(t.backToAppBtn), "</button>\n                <button id=\"openPrintOptionsBtn\" class=\"print-btn export-pdf-btn\" data-feature-search=\"true\" data-feature-search-keywords=\"export pdf print rental\" title=\"").concat(escapeHtmlSafe(exportPdfLabel), "\">").concat(exportIconHtml).concat(escapeHtmlSafe(exportPdfLabel), "</button>\n            </div>\n            ").concat(logoHtml, "\n            <h1>").concat(t.overviewTitle, "</h1>\n            <p><strong>").concat(t.setupNameLabel, "</strong> ").concat(safeSetupName, "</p>\n            <p><em>").concat(generatedOnDisplay, "</em></p>\n\n            ").concat(projectRequirementsHtml, "\n\n            ").concat(deviceSectionHtml, "\n\n            ").concat(resultsSectionHtml, "\n\n            ").concat(diagramSectionHtml, "\n\n            ").concat(gearListHtml, "\n            ").concat(gearListActionsHtml, "\n            ").concat(batteryComparisonHtml, "\n        </div>\n    ");
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

  if (content) {
    var overviewGearActions = content.querySelector('.overview-gear-actions');
    if (overviewGearActions && typeof overviewGearActions.remove === 'function') {
      overviewGearActions.remove();
    }

    var addItemButtons = content.querySelectorAll('.gear-custom-add-btn, [data-gear-custom-add]');
    addItemButtons.forEach(function (button) {
      if (button && typeof button.remove === 'function') {
        button.remove();
      }
    });
  }
  var runConfiguredPrintWorkflow = function runConfiguredPrintWorkflow() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (!overviewDialog || !content) {
      logOverview('warn', 'Overview dialog is unavailable for exporting or printing.', undefined, {
        action: 'print-workflow',
        stage: 'dialog-missing'
      });
      return false;
    }
    runPendingPrintCleanup('pre-configured-print');
    var normalizedOptions = options && _typeof(options) === 'object' ? options : {};
    var prefs = normalizedOptions.preferences && _typeof(normalizedOptions.preferences) === 'object' ? normalizedOptions.preferences : normalizedOptions;
    var sectionSelections = prefs.sections && _typeof(prefs.sections) === 'object' ? prefs.sections : {};
    var layoutPreference = typeof prefs.layout === 'string' ? prefs.layout : 'standard';
    var mode = normalizedOptions.mode === 'print' ? 'print' : 'export';
    var cleanupTasks = [];
    var sectionConfig = getPrintSectionConfig();
    sectionConfig.forEach(function (section) {
      var target = content.querySelector(section.selector);
      if (!target) {
        return;
      }
      var shouldShow = Object.prototype.hasOwnProperty.call(sectionSelections, section.id) ? sectionSelections[section.id] !== false : section.defaultVisible;
      var hiddenClass = 'print-section-hidden';
      var wasHidden = target.classList.contains(hiddenClass);
      if (!shouldShow && !wasHidden) {
        target.classList.add(hiddenClass);
        cleanupTasks.push(function () {
          return target.classList.remove(hiddenClass);
        });
      } else if (shouldShow && wasHidden) {
        target.classList.remove(hiddenClass);
        cleanupTasks.push(function () {
          return target.classList.add(hiddenClass);
        });
      }
    });
    var hadRentalMode = content.classList.contains('rental-print-mode');
    if (layoutPreference === 'rental' && !hadRentalMode) {
      content.classList.add('rental-print-mode');
      cleanupTasks.push(function () {
        return content.classList.remove('rental-print-mode');
      });
    } else if (layoutPreference !== 'rental' && hadRentalMode) {
      content.classList.remove('rental-print-mode');
      cleanupTasks.push(function () {
        return content.classList.add('rental-print-mode');
      });
    }
    _pendingPrintCleanup = function pendingPrintCleanup() {
      while (cleanupTasks.length) {
        var task = cleanupTasks.pop();
        try {
          task();
        } catch (cleanupError) {
          logOverview('warn', 'Failed to restore print state.', cleanupError, {
            action: 'print-cleanup'
          });
        }
      }
      _pendingPrintCleanup = null;
    };
    var reason = layoutPreference === 'rental' && mode !== 'print' ? 'rental-export' : mode;
    var workflowOptions = {
      reason: reason
    };
    if (mode !== 'print') {
      workflowOptions.preferFallback = true;
    }
    var success = triggerPrintWorkflow(workflowOptions);
    if (!success) {
      var failureMessage = mode === 'print' ? 'Unable to open the print dialog. Please check your browser settings and try again.' : 'Unable to start the PDF export workflow. Please enable pop-ups and try again.';
      logOverview('error', failureMessage, undefined, {
        action: 'print-workflow',
        stage: 'trigger',
        result: 'not-started',
        mode: mode,
        layout: layoutPreference
      });
      runPendingPrintCleanup('configured-print-failed');
      return false;
    }
    var ensureCleanup = function ensureCleanup() {
      return runPendingPrintCleanup('overview-closed');
    };
    overviewDialog.addEventListener('close', ensureCleanup, {
      once: true
    });
    return true;
  };
  var openOptionsBtn = overviewDialog.querySelector('#openPrintOptionsBtn');
  if (openOptionsBtn) {
    openOptionsBtn.addEventListener('click', function () {
      var storedPreferences = loadPrintPreferences() || {
        sections: {},
        layout: 'standard'
      };
      var dialogContext = getPrintOptionsDialogContext();
      var onConfirm = function onConfirm(result) {
        var confirmedMode = result && result.mode === 'print' ? 'print' : 'export';
        var confirmedPreferences = result && result.preferences ? result.preferences : storedPreferences;
        runConfiguredPrintWorkflow({
          mode: confirmedMode,
          preferences: confirmedPreferences
        });
      };
      if (dialogContext && dialogContext.dialog) {
        populatePrintOptionsDialog(dialogContext, storedPreferences, onConfirm);
        openDialog(dialogContext.dialog);
      } else {
        onConfirm({
          mode: 'export',
          preferences: storedPreferences
        });
      }
    });
  }
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
    runPendingPrintCleanup('close-after-print');
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