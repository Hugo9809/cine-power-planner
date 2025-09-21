function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var getCssVarValue = typeof getCssVariableValue === 'function' ? getCssVariableValue : function (name) {
  var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  if (typeof document === 'undefined') return fallback;
  var root = document.documentElement;
  if (!root) return fallback;
  var computed = typeof window !== 'undefined' && typeof window.getComputedStyle === 'function' ? window.getComputedStyle(root).getPropertyValue(name).trim() : '';
  if (computed) return computed;
  var inline = root.style.getPropertyValue(name).trim();
  return inline || fallback;
};
function generatePrintableOverview() {
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
  var locale = localeMap[lang] || 'en-US';
  var dateTimeString = now.toLocaleDateString(locale) + ' ' + now.toLocaleTimeString();
  var t = (typeof texts === "undefined" ? "undefined" : _typeof(texts)) === 'object' && texts ? texts[lang] || texts.en || {} : {};
  var customLogo = typeof localStorage !== 'undefined' ? localStorage.getItem('customLogo') : null;
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
    var gridClasses = key === 'category_fiz_motors' || key === 'category_fiz_controllers' ? 'device-block-grid two-column' : 'device-block-grid single-column';
    deviceListHtml += "<div class=\"device-category\"><h3>".concat(iconHtml).concat(heading, "</h3><div class=\"").concat(gridClasses, "\">").concat(sections[key].join(''), "</div></div>");
  });
  deviceListHtml += '</div>';
  var breakdownHtml = breakdownListElem.innerHTML;
  var batteryLifeUnitElem = document.getElementById("batteryLifeUnit");
  var resultsHtml = "\n        <ul id=\"breakdownList\">".concat(breakdownHtml, "</ul>\n        <p><strong>").concat(t.totalPowerLabel, "</strong> ").concat(totalPowerElem.textContent, " W</p>\n        <p><strong>").concat(t.totalCurrent144Label, "</strong> ").concat(totalCurrent144Elem.textContent, " A</p>\n        <p><strong>").concat(t.totalCurrent12Label, "</strong> ").concat(totalCurrent12Elem.textContent, " A</p>\n        <p><strong>").concat(t.batteryLifeLabel, "</strong> ").concat(batteryLifeElem.textContent, " ").concat(batteryLifeUnitElem ? batteryLifeUnitElem.textContent : '', "</p>\n        <p><strong>").concat(t.batteryCountLabel, "</strong> ").concat(batteryCountElem.textContent, "</p>\n    ");
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
  var batteryTableHtml = '';
  var totalWatt = parseFloat(totalPowerElem.textContent);
  if (totalWatt > 0) {
    var totalCurrentLow = parseFloat(totalCurrent12Elem.textContent);
    var selectedBatteryName = batterySelect.value;
    var camName = cameraSelect.value;
    var plateFilter = getSelectedPlate();
    var supportsB = supportsBMountCamera(camName);
    var supportsGold = supportsGoldMountCamera(camName);
    var bMountCam = plateFilter === 'B-Mount';
    var selectedCandidate = null;
    if (selectedBatteryName && selectedBatteryName !== 'None' && devices.batteries[selectedBatteryName]) {
      var selData = devices.batteries[selectedBatteryName];
      if ((!plateFilter || selData.mount_type === plateFilter) && (supportsB || selData.mount_type !== 'B-Mount') && (supportsGold || selData.mount_type !== 'Gold-Mount')) {
        var pinOK_sel = totalCurrentLow <= selData.pinA;
        var dtapOK_sel = !bMountCam && totalCurrentLow <= selData.dtapA;
        if (pinOK_sel || dtapOK_sel) {
          var selHours = selData.capacity / totalWatt;
          var selMethod;
          if (pinOK_sel && dtapOK_sel) selMethod = 'both pins and D-Tap';else if (pinOK_sel) selMethod = 'pins';else selMethod = 'dtap';
          selectedCandidate = {
            name: selectedBatteryName,
            hours: selHours,
            method: selMethod
          };
        }
      }
    }
    var pinsCandidates = [];
    var dtapCandidates = [];
    for (var battName in devices.batteries) {
      if (battName === 'None') continue;
      if (selectedCandidate && battName === selectedCandidate.name) continue;
      var battInfo = devices.batteries[battName];
      if (plateFilter && battInfo.mount_type !== plateFilter) continue;
      if (!plateFilter && !supportsB && battInfo.mount_type === 'B-Mount') continue;
      if (!plateFilter && !supportsGold && battInfo.mount_type === 'Gold-Mount') continue;
      var canPin = totalCurrentLow <= battInfo.pinA;
      var canDTap = !bMountCam && totalCurrentLow <= battInfo.dtapA;
      if (!canPin && !canDTap) continue;
      var hours = battInfo.capacity / totalWatt;
      var method = canPin && canDTap ? 'both pins and D-Tap' : canPin ? 'pins' : 'dtap';
      if (canPin) pinsCandidates.push({
        name: battName,
        hours: hours,
        method: method
      });else dtapCandidates.push({
        name: battName,
        hours: hours,
        method: method
      });
    }
    var getMethodLabel = function getMethodLabel(method) {
      var colorMap = {
        pins: {
          var: '--warning-color',
          fallback: '#FF9800',
          text: t.methodPinsOnly
        },
        'both pins and D-Tap': {
          var: '--success-color',
          fallback: '#4CAF50',
          text: t.methodPinsAndDTap
        },
        infinite: {
          var: '--info-color',
          fallback: '#007bff',
          text: t.methodInfinite
        }
      };
      var entry = colorMap[method];
      if (entry) {
        var color = getCssVarValue(entry.var, entry.fallback);
        return "<span style=\"color:".concat(color, ";\">").concat(entry.text, "</span>");
      }
      return method === 'dtap' ? 'D-Tap' : method;
    };
    var getBarClass = function getBarClass(method) {
      return method === 'pins' ? 'bar bar-pins-only' : 'bar';
    };
    pinsCandidates.sort(function (a, b) {
      return b.hours - a.hours;
    });
    dtapCandidates.sort(function (a, b) {
      return b.hours - a.hours;
    });
    var runtimeHeading = t.batteryLifeHeading || t.batteryComparisonHeading || 'Runtime comparison';
    var tableHtml = "<h2>".concat(runtimeHeading, "</h2><table class=\"battery-table\"><tr><th>").concat(t.batteryLabel, "</th><th>").concat(t.batteryLifeLabel, "</th><th>").concat(runtimeHeading, "</th></tr>");
    var maxHours = Math.max(selectedCandidate ? selectedCandidate.hours : 0, pinsCandidates[0] ? pinsCandidates[0].hours : 0, dtapCandidates[0] ? dtapCandidates[0].hours : 0);
    if (selectedCandidate) {
      tableHtml += "<tr class=\"selectedBatteryRow\"><td>".concat(escapeHtmlSafe(selectedCandidate.name), "</td><td>").concat(selectedCandidate.hours.toFixed(2), "h (").concat(getMethodLabel(selectedCandidate.method), ")</td><td><div class=\"barContainer\"><div class=\"").concat(getBarClass(selectedCandidate.method), "\" style=\"width: ").concat(selectedCandidate.hours / maxHours * 100, "%;\"></div></div></td></tr>");
    }
    pinsCandidates.forEach(function (candidate) {
      if (selectedCandidate && candidate.name === selectedCandidate.name) return;
      tableHtml += "<tr><td>".concat(escapeHtmlSafe(candidate.name), "</td><td>").concat(candidate.hours.toFixed(2), "h (").concat(getMethodLabel(candidate.method), ")</td><td><div class=\"barContainer\"><div class=\"").concat(getBarClass(candidate.method), "\" style=\"width: ").concat(candidate.hours / maxHours * 100, "%;\"></div></div></td></tr>");
    });
    dtapCandidates.forEach(function (candidate) {
      if (selectedCandidate && candidate.name === selectedCandidate.name) return;
      var alreadyInPins = pinsCandidates.some(function (p) {
        return p.name === candidate.name;
      });
      if (!alreadyInPins) {
        tableHtml += "<tr><td>".concat(escapeHtmlSafe(candidate.name), "</td><td>").concat(candidate.hours.toFixed(2), "h (").concat(getMethodLabel(candidate.method), ")</td><td><div class=\"barContainer\"><div class=\"").concat(getBarClass(candidate.method), "\" style=\"width: ").concat(candidate.hours / maxHours * 100, "%;\"></div></div></td></tr>");
      }
    });
    tableHtml += "</table>";
    batteryTableHtml = tableHtml;
  } else {
    batteryTableHtml = '';
  }
  var safeSetupName = escapeHtmlSafe(setupName);
  var diagramCss = getDiagramCss(false);
  var diagramAreaHtml = '';
  if (setupDiagramContainer) {
    var areaClone = setupDiagramContainer.cloneNode(true);
    var svg = areaClone.querySelector('svg');
    if (svg) {
      var style = document.createElement('style');
      style.textContent = diagramCss;
      svg.insertBefore(style, svg.firstChild);
    }
    diagramAreaHtml = areaClone.outerHTML;
  }
  var diagramLegendHtml = diagramLegend ? diagramLegend.outerHTML : '';
  var diagramHintHtml = diagramHint ? diagramHint.outerHTML : '';
  var diagramDescHtml = document.getElementById('diagramDesc') ? document.getElementById('diagramDesc').outerHTML : '';
  var diagramSectionHtml = diagramAreaHtml ? "<section id=\"setupDiagram\" class=\"diagram-section print-section\"><h2>".concat(t.setupDiagramHeading, "</h2>").concat(diagramDescHtml).concat(diagramAreaHtml).concat(diagramLegendHtml).concat(diagramHintHtml, "</section>") : '';
  var batteryTableHtmlWithBreak = batteryTableHtml ? "<div class=\"page-break\"></div>".concat(batteryTableHtml) : '';
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
      var table = container.querySelector('.gear-table');
      if (table) return true;
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
  var gearListHtmlCombined = projectSectionHtml || gearSectionHtml ? "".concat(projectSectionHtml || '').concat(gearSectionHtml || '') : '';
  var deleteGearListLabel = t.deleteGearListBtn || 'Delete Gear List';
  var deleteGearListHelp = t.deleteGearListBtnHelp || deleteGearListLabel;
  var gearListActionsHtml = gearListHtmlCombined ? "<div class=\"overview-gear-actions\"><button id=\"overviewDeleteGearListBtn\" class=\"overview-delete-gear-btn\" title=\"".concat(escapeHtmlSafe(deleteGearListHelp), "\" data-help=\"").concat(escapeHtmlSafe(deleteGearListHelp), "\"><span class=\"btn-icon icon-glyph\" aria-hidden=\"true\" data-icon-font=\"essential\">&#xF254;</span>").concat(escapeHtmlSafe(deleteGearListLabel), "</button></div>") : '';
  var logoHtml = customLogo ? "<img id=\"printLogo\" src=\"".concat(customLogo, "\" alt=\"Logo\" />") : '';
  var contentClass = customLogo ? 'logo-present' : '';
  var overviewHtml = "\n        <div id=\"overviewDialogContent\" class=\"".concat(contentClass, "\">\n            <div class=\"overview-actions\">\n                <button id=\"closeOverviewBtn\" class=\"back-btn\"><span class=\"btn-icon icon-glyph\" aria-hidden=\"true\" data-icon-font=\"essential\">&#xF131;</span>").concat(escapeHtmlSafe(t.backToAppBtn), "</button>\n                <button id=\"printOverviewBtn\" class=\"print-btn\"><span class=\"btn-icon icon-glyph\" aria-hidden=\"true\" data-icon-font=\"uicons\">&#xE7AB;</span>").concat(escapeHtmlSafe(t.printBtn), "</button>\n            </div>\n            ").concat(logoHtml, "\n            <h1>").concat(t.overviewTitle, "</h1>\n            <p><strong>").concat(t.setupNameLabel, "</strong> ").concat(safeSetupName, "</p>\n            <p><em>Generated on: ").concat(dateTimeString, "</em></p>\n\n            <h2>").concat(t.overviewDeviceSelectionHeading || t.deviceSelectionHeading, "</h2>\n            ").concat(deviceListHtml, "\n\n            ").concat(resultsSectionHtml, "\n\n            ").concat(diagramSectionHtml, "\n\n            ").concat(gearListHtmlCombined, "\n            ").concat(gearListActionsHtml, "\n            ").concat(batteryTableHtmlWithBreak, "\n        </div>\n    ");
  var overviewDialog = document.getElementById('overviewDialog');
  overviewDialog.innerHTML = overviewHtml;
  var content = overviewDialog.querySelector('#overviewDialogContent');
  var applyThemeClasses = function applyThemeClasses(target) {
    if (!target || typeof document === 'undefined') return;
    var themeClasses = ['dark-mode', 'light-mode', 'pink-mode', 'dark-accent-boost', 'high-contrast'];
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
    var overviewTitle = t.overviewTitle || 'Overview';
    doc.open();
    doc.write("<!DOCTYPE html>\n<html>\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"color-scheme\" content=\"light dark\">\n<title></title>\n<link rel=\"stylesheet\" href=\"src/styles/style.css\">\n<link rel=\"stylesheet\" href=\"src/styles/overview.css\">\n<link rel=\"stylesheet\" href=\"src/styles/overview-print.css\" media=\"print\">\n<link rel=\"stylesheet\" href=\"overview-print.css\" media=\"screen\">\n</head>\n<body></body>\n</html>");
    doc.close();
    doc.title = overviewTitle;
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
  var printBtn = overviewDialog.querySelector('#printOverviewBtn');
  if (printBtn) {
    printBtn.addEventListener('click', function () {
      var handlePrintError = function handlePrintError(error) {
        if (error && error.name === 'AbortError') {
          return;
        }
        console.warn('window.print() failed; using fallback print window.', error);
        if (openFallbackPrintView()) {
          _closeAfterPrint();
        }
      };
      if (typeof window.print !== 'function') {
        handlePrintError(new Error('Print API unavailable'));
        return;
      }
      try {
        var result = window.print();
        if (result && typeof result.then === 'function') {
          result.catch(handlePrintError);
        }
      } catch (error) {
        handlePrintError(error);
      }
    });
  }
  openDialog(overviewDialog);
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