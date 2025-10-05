function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
        console.warn('Unable to render export icon for overview dialog.', error);
      }
    }
    return '<span class="btn-icon icon-glyph" aria-hidden="true" data-icon-font="uicons">&#xE7AB;</span>';
  }();
  var overviewHtml = "\n        <div id=\"overviewDialogContent\" class=\"".concat(contentClass, "\">\n            <div class=\"overview-actions\">\n                <button id=\"closeOverviewBtn\" class=\"back-btn\"><span class=\"btn-icon icon-glyph\" aria-hidden=\"true\" data-icon-font=\"essential\">&#xF131;</span>").concat(escapeHtmlSafe(t.backToAppBtn), "</button>\n                <button id=\"printOverviewBtn\" class=\"print-btn\"><span class=\"btn-icon icon-glyph\" aria-hidden=\"true\" data-icon-font=\"uicons\">&#xE7AB;</span>").concat(escapeHtmlSafe(t.printBtn), "</button>\n                <button id=\"exportPdfBtn\" class=\"print-btn export-pdf-btn\">").concat(exportIconHtml).concat(escapeHtmlSafe(exportPdfLabel), "</button>\n            </div>\n            ").concat(logoHtml, "\n            <h1>").concat(t.overviewTitle, "</h1>\n            <p><strong>").concat(t.setupNameLabel, "</strong> ").concat(safeSetupName, "</p>\n            <p><em>").concat(generatedOnDisplay, "</em></p>\n\n            ").concat(projectRequirementsHtml, "\n\n            <h2>").concat(t.overviewDeviceSelectionHeading || t.deviceSelectionHeading, "</h2>\n            ").concat(deviceListHtml, "\n\n            ").concat(resultsSectionHtml, "\n\n            ").concat(diagramSectionHtml, "\n\n            ").concat(gearListHtml, "\n            ").concat(gearListActionsHtml, "\n            ").concat(batteryComparisonHtml, "\n        </div>\n    ");
  var overviewDialog = document.getElementById('overviewDialog');
  overviewDialog.innerHTML = overviewHtml;
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
          console.warn('Failed to delete gear list from overview button', error);
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
            console.warn('Unable to request gear list deletion from overview', error);
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
  var openFallbackPrintView = function openFallbackPrintView() {
    if (!content || typeof window === 'undefined') return false;
    var fallbackRoot = content.cloneNode(true);
    fallbackRoot.querySelectorAll('.print-btn, .back-btn').forEach(function (btn) {
      return btn.remove();
    });
    var printWindow = window.open('', '_blank', 'noopener,noreferrer');
    if (!printWindow) {
      console.error('Unable to open a fallback print window. Please allow pop-ups and try again.');
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
        console.error('Failed to trigger print in fallback window.', error);
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
  var triggerPrintWorkflow = function triggerPrintWorkflow() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _options$preferFallba = options.preferFallback,
      preferFallback = _options$preferFallba === void 0 ? false : _options$preferFallba,
      _options$reason = options.reason,
      reason = _options$reason === void 0 ? 'print' : _options$reason;
    var logPrefix = reason === 'export' ? 'Overview PDF export' : 'Overview print';
    var fallbackAttempts = 0;
    var attemptFallback = function attemptFallback(error) {
      fallbackAttempts += 1;
      if (error && error.name !== 'AbortError') {
        console.warn("".concat(logPrefix, ": falling back to print window."), error);
      }
      var opened = openFallbackPrintView();
      if (opened) {
        _closeAfterPrint();
        return true;
      }
      if (error && error.name !== 'AbortError') {
        console.error("".concat(logPrefix, ": unable to open fallback print window."), error);
      }
      return false;
    };
    var attemptNative = function attemptNative() {
      if (typeof window === 'undefined' || typeof window.print !== 'function') {
        return false;
      }
      try {
        if (typeof document !== 'undefined') {
          document.title = printDocumentTitle;
        }
        var result = window.print();
        if (result && typeof result.then === 'function') {
          result.catch(function (error) {
            if (!fallbackAttempts) {
              attemptFallback(error);
            }
          });
        }
        return true;
      } catch (error) {
        return attemptFallback(error);
      }
    };
    var success = false;
    if (preferFallback) {
      success = attemptFallback();
      if (!success) {
        success = attemptNative();
      }
    } else {
      success = attemptNative();
    }
    if (!success && fallbackAttempts === 0) {
      success = attemptFallback();
    }
    if (!success && typeof document !== 'undefined' && document.title === printDocumentTitle) {
      document.title = originalDocumentTitle;
    }
    return success;
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
          console.error('Unable to start the PDF export print workflow. Please enable pop-ups and try again.');
        }
      } catch (error) {
        console.error('Failed to export overview PDF via print workflow.', error);
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
        console.error('Unable to open the print dialog. Please check your browser settings and try again.');
      }
    });
  }
  openDialog(overviewDialog);
  if (autoPrint) {
    var printed = triggerPrintWorkflow({
      reason: 'generate'
    });
    if (!printed) {
      console.error('Unable to open the print dialog. Please check your browser settings and try again.');
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