function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
    if (typeof require === 'function') {
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
  var MODULE_BASE = resolveModuleBase(GLOBAL_SCOPE);
  if (!MODULE_BASE) {
    return;
  }
  var safeWarn = typeof MODULE_BASE.safeWarn === 'function' ? MODULE_BASE.safeWarn.bind(MODULE_BASE) : function (message, error) {
    if (GLOBAL_SCOPE && GLOBAL_SCOPE.console && typeof GLOBAL_SCOPE.console.warn === 'function') {
      try {
        if (typeof error === 'undefined') {
          GLOBAL_SCOPE.console.warn(message);
        } else {
          GLOBAL_SCOPE.console.warn(message, error);
        }
      } catch (consoleError) {
        void consoleError;
      }
    }
  };
  function fallbackGetter(value, fallback) {
    if (typeof value === 'function') {
      return value;
    }
    if (typeof fallback === 'function') {
      return fallback;
    }
    return function () {
      return undefined;
    };
  }
  function fallbackValue(value, fallback) {
    return typeof value === 'undefined' ? fallback : value;
  }
  function optionalFunction(value) {
    return typeof value === 'function' ? value : null;
  }
  function createConnectionDiagram() {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var document = fallbackValue(context.document, GLOBAL_SCOPE.document || null);
    var windowObj = fallbackValue(context.window, typeof GLOBAL_SCOPE.addEventListener === 'function' ? GLOBAL_SCOPE : null);
    var navigator = fallbackValue(context.navigator, GLOBAL_SCOPE.navigator || null);
    var getTexts = fallbackGetter(context.getTexts, function () {
      return fallbackValue(context.texts, GLOBAL_SCOPE.texts || {});
    });
    var getCurrentLang = fallbackGetter(context.getCurrentLang, function () {
      return fallbackValue(context.currentLang, GLOBAL_SCOPE.currentLang || 'en');
    });
    var getDevices = fallbackGetter(context.getDevices, function () {
      return fallbackValue(context.devices, GLOBAL_SCOPE.devices || {});
    });
    var getCameraSelect = fallbackGetter(context.getCameraSelect, function () {
      return fallbackValue(context.cameraSelect, GLOBAL_SCOPE.cameraSelect || null);
    });
    var getMonitorSelect = fallbackGetter(context.getMonitorSelect, function () {
      return fallbackValue(context.monitorSelect, GLOBAL_SCOPE.monitorSelect || null);
    });
    var getVideoSelect = fallbackGetter(context.getVideoSelect, function () {
      return fallbackValue(context.videoSelect, GLOBAL_SCOPE.videoSelect || null);
    });
    var getDistanceSelect = fallbackGetter(context.getDistanceSelect, function () {
      return fallbackValue(context.distanceSelect, GLOBAL_SCOPE.distanceSelect || null);
    });
    var getBatterySelect = fallbackGetter(context.getBatterySelect, function () {
      return fallbackValue(context.batterySelect, GLOBAL_SCOPE.batterySelect || null);
    });
    var getMotorSelects = fallbackGetter(context.getMotorSelects, function () {
      return fallbackValue(context.motorSelects, GLOBAL_SCOPE.motorSelects || []);
    });
    var getControllerSelects = fallbackGetter(context.getControllerSelects, function () {
      return fallbackValue(context.controllerSelects, GLOBAL_SCOPE.controllerSelects || []);
    });
    var getSetupDiagramContainer = fallbackGetter(context.getSetupDiagramContainer, function () {
      return fallbackValue(context.setupDiagramContainer, document ? document.getElementById('diagramArea') : null);
    });
    var getDiagramLegend = fallbackGetter(context.getDiagramLegend, function () {
      return fallbackValue(context.diagramLegend, document ? document.getElementById('diagramLegend') : null);
    });
    var getDiagramHint = fallbackGetter(context.getDiagramHint, function () {
      return fallbackValue(context.diagramHint, document ? document.getElementById('diagramHint') : null);
    });
    var getDownloadDiagramBtn = fallbackGetter(context.getDownloadDiagramBtn, function () {
      return fallbackValue(context.downloadDiagramBtn, document ? document.getElementById('downloadDiagram') : null);
    });
    var getZoomInBtn = fallbackGetter(context.getZoomInBtn, function () {
      return fallbackValue(context.zoomInBtn, document ? document.getElementById('zoomIn') : null);
    });
    var getZoomOutBtn = fallbackGetter(context.getZoomOutBtn, function () {
      return fallbackValue(context.zoomOutBtn, document ? document.getElementById('zoomOut') : null);
    });
    var getResetViewBtn = fallbackGetter(context.getResetViewBtn, function () {
      return fallbackValue(context.resetViewBtn, document ? document.getElementById('resetView') : null);
    });
    var getGridSnapToggleBtn = fallbackGetter(context.getGridSnapToggleBtn, function () {
      return fallbackValue(context.gridSnapToggleBtn, document ? document.getElementById('gridSnapToggle') : null);
    });
    var getDiagramDetailDialog = fallbackGetter(context.getDiagramDetailDialog, function () {
      return fallbackValue(context.diagramDetailDialog, document ? document.getElementById('diagramDetailDialog') : null);
    });
    var getDiagramDetailContent = fallbackGetter(context.getDiagramDetailContent, function () {
      return fallbackValue(context.diagramDetailContent, document ? document.getElementById('diagramDetailDialogContent') : null);
    });
    var getDiagramDetailHeading = fallbackGetter(context.getDiagramDetailHeading, function () {
      return fallbackValue(context.diagramDetailHeading, document ? document.getElementById('diagramDetailDialogHeading') : null);
    });
    var getDiagramDetailBackButton = fallbackGetter(context.getDiagramDetailBackButton, function () {
      return fallbackValue(context.diagramDetailBackButton, document ? document.getElementById('diagramDetailDialogBack') : null);
    });
    var getCurrentGridSnap = fallbackGetter(context.getCurrentGridSnap, function () {
      return false;
    });
    var scheduleProjectAutoSave = optionalFunction(context.scheduleProjectAutoSave);
    var saveCurrentSession = optionalFunction(context.saveCurrentSession);
    var checkSetupChanged = optionalFunction(context.checkSetupChanged);
    var motorPriority = fallbackGetter(context.motorPriority, function () {
      return 0;
    });
    var controllerPriority = fallbackGetter(context.controllerPriority, function () {
      return 0;
    });
    var isArri = fallbackGetter(context.isArri, function () {
      return false;
    });
    var isArriOrCmotion = fallbackGetter(context.isArriOrCmotion, function () {
      return false;
    });
    var fizNeedsPower = fallbackGetter(context.fizNeedsPower, function () {
      return false;
    });
    var fizPowerPort = fallbackGetter(context.fizPowerPort, function () {
      return '';
    });
    var controllerDistancePort = fallbackGetter(context.controllerDistancePort, function () {
      return '';
    });
    var controllerCamPort = fallbackGetter(context.controllerCamPort, function () {
      return '';
    });
    var cameraFizPort = fallbackGetter(context.cameraFizPort, function () {
      return '';
    });
    var motorFizPort = fallbackGetter(context.motorFizPort, function () {
      return '';
    });
    var getSelectedPlate = fallbackGetter(context.getSelectedPlate, function () {
      return '';
    });
    var isSelectedPlateNative = fallbackGetter(context.isSelectedPlateNative, function () {
      return false;
    });
    var firstPowerInputType = fallbackGetter(context.firstPowerInputType, function () {
      return '';
    });
    var formatConnLabel = fallbackGetter(context.formatConnLabel, function (a, b) {
      return [a, b].filter(Boolean).join(' → ');
    });
    var connectionLabel = fallbackGetter(context.connectionLabel, function (a, b) {
      return formatConnLabel(a, b);
    });
    var fizPort = fallbackGetter(context.fizPort, function () {
      return '';
    });
    var iconGlyph = fallbackGetter(context.iconGlyph, function (char, font) {
      return typeof GLOBAL_SCOPE.iconGlyph === 'function' ? GLOBAL_SCOPE.iconGlyph(char, font) : null;
    });
    var ICON_FONT_KEYS = fallbackValue(context.ICON_FONT_KEYS, GLOBAL_SCOPE.ICON_FONT_KEYS || {});
    var applyIconGlyph = fallbackGetter(context.applyIconGlyph, function (element, glyph) {
      if (typeof GLOBAL_SCOPE.applyIconGlyph === 'function') {
        return GLOBAL_SCOPE.applyIconGlyph(element, glyph);
      }
      return null;
    });
    void applyIconGlyph;
    var resolveIconGlyph = fallbackGetter(context.resolveIconGlyph, function (glyph) {
      return typeof GLOBAL_SCOPE.resolveIconGlyph === 'function' ? GLOBAL_SCOPE.resolveIconGlyph(glyph) : glyph;
    });
    var positionSvgMarkup = fallbackGetter(context.positionSvgMarkup, function (markup, x, y, size) {
      return typeof GLOBAL_SCOPE.positionSvgMarkup === 'function' ? GLOBAL_SCOPE.positionSvgMarkup(markup, x, y, size) : null;
    });
    var ensureSvgHasAriaHidden = fallbackGetter(context.ensureSvgHasAriaHidden, function (markup) {
      return typeof GLOBAL_SCOPE.ensureSvgHasAriaHidden === 'function' ? GLOBAL_SCOPE.ensureSvgHasAriaHidden(markup) : markup;
    });
    var formatSvgCoordinate = fallbackGetter(context.formatSvgCoordinate, function (value) {
      return typeof GLOBAL_SCOPE.formatSvgCoordinate === 'function' ? GLOBAL_SCOPE.formatSvgCoordinate(value) : Number.isFinite(value) ? String(value) : '0';
    });
    var getSafeGenerateConnectorSummary = fallbackGetter(context.getSafeGenerateConnectorSummary, function () {
      if (MODULE_BASE && typeof MODULE_BASE.safeGenerateConnectorSummary === 'function') {
        return MODULE_BASE.safeGenerateConnectorSummary.bind(MODULE_BASE);
      }
      if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.safeGenerateConnectorSummary === 'function') {
        return GLOBAL_SCOPE.safeGenerateConnectorSummary;
      }
      return null;
    });
    var ensureArray = function ensureArray(value) {
      if (!value) return [];
      if (Array.isArray(value)) return value;
      if (typeof value.length === 'number') return Array.from(value);
      return [];
    };
    var manualPositions = {};
    var lastDiagramPositions = {};
    var cleanupDiagramInteractions = null;
    var lastPopupEntries = {};
    var lastPointerPosition = null;
    var detailDialog = null;
    var detailDialogContent = null;
    var detailDialogHeading = null;
    var detailDialogBackButton = null;
    var detailDialogSetupComplete = false;
    var detailDialogDefaultHeading = 'Diagram details';
    var detailDialogBackLabel = 'Back';
    var resolveSetupContainer = function resolveSetupContainer() {
      return getSetupDiagramContainer();
    };
    var resolveDiagramLegend = function resolveDiagramLegend() {
      return getDiagramLegend();
    };
    var resolveDiagramHint = function resolveDiagramHint() {
      return getDiagramHint();
    };
    var resolveDownloadButton = function resolveDownloadButton() {
      return getDownloadDiagramBtn();
    };
    void resolveDownloadButton;
    var resolveZoomInButton = function resolveZoomInButton() {
      return getZoomInBtn();
    };
    var resolveZoomOutButton = function resolveZoomOutButton() {
      return getZoomOutBtn();
    };
    var resolveResetButton = function resolveResetButton() {
      return getResetViewBtn();
    };
    var resolveGridSnapToggle = function resolveGridSnapToggle() {
      return getGridSnapToggleBtn();
    };
    void resolveGridSnapToggle;
    var resolveTexts = function resolveTexts() {
      try {
        return getTexts() || {};
      } catch (error) {
        void error;
        return {};
      }
    };
    var resolveCurrentLang = function resolveCurrentLang() {
      try {
        return getCurrentLang() || 'en';
      } catch (error) {
        void error;
        return 'en';
      }
    };
    var resolveDevices = function resolveDevices() {
      try {
        return getDevices() || {};
      } catch (error) {
        void error;
        return {};
      }
    };
    var resolveCameraSelect = function resolveCameraSelect() {
      return getCameraSelect();
    };
    var resolveMonitorSelect = function resolveMonitorSelect() {
      return getMonitorSelect();
    };
    var resolveVideoSelect = function resolveVideoSelect() {
      return getVideoSelect();
    };
    var resolveDistanceSelect = function resolveDistanceSelect() {
      return getDistanceSelect();
    };
    var resolveBatterySelect = function resolveBatterySelect() {
      return getBatterySelect();
    };
    var resolveMotorSelects = function resolveMotorSelects() {
      return ensureArray(getMotorSelects());
    };
    var resolveControllerSelects = function resolveControllerSelects() {
      return ensureArray(getControllerSelects());
    };
    var escapeHtml = function escapeHtml(value) {
      if (value === null || value === undefined) return '';
      return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    };

    var sanitizeDomId = function sanitizeDomId(value) {
      if (typeof value !== 'string') return '';
      var trimmed = value.trim();
      if (!trimmed) return '';
      var normalized = trimmed.replace(/[^a-zA-Z0-9_-]+/g, '-').replace(/^-+|-+$/g, '');
      return normalized || '';
    };

    var buildPopupHeadingId = function buildPopupHeadingId(nodeId) {
      var sanitized = sanitizeDomId(nodeId);
      return sanitized ? "diagramPopupTitle-".concat(sanitized) : 'diagramPopupTitle';
    };
    var resolveDeviceInfo = function resolveDeviceInfo(devicesObj, categoryPath, name) {
      if (!devicesObj || !categoryPath || !name) return null;
      var segments = String(categoryPath).split('.').filter(Boolean);
      var cursor = devicesObj;
      for (var i = 0; i < segments.length; i += 1) {
        var key = segments[i];
        if (!cursor || _typeof(cursor) !== 'object') {
          cursor = null;
          break;
        }
        cursor = cursor[key];
      }
      if (!cursor || _typeof(cursor) !== 'object') return null;
      try {
        return cursor[name] || null;
      } catch (error) {
        void error;
        return null;
      }
    };
    var popupClassForCategory = function popupClassForCategory(category) {
      if (!category) return '';
      if (category === 'cameras') return 'diagram-popup--camera';
      return '';
    };
    function ensureDetailDialogElements() {
      var dialogEl = getDiagramDetailDialog();
      var contentEl = getDiagramDetailContent();
      var headingEl = getDiagramDetailHeading();
      var backButtonEl = getDiagramDetailBackButton();
      var dialogChanged = dialogEl !== detailDialog;
      detailDialog = dialogEl || null;
      detailDialogContent = contentEl || null;
      detailDialogHeading = headingEl || null;
      detailDialogBackButton = backButtonEl || null;
      if (detailDialog && (dialogChanged || !detailDialogSetupComplete)) {
        var handleBackdropClick = function handleBackdropClick(event) {
          if (event && event.target === detailDialog) {
            closeDetailDialog();
          }
        };
        detailDialog.addEventListener('click', handleBackdropClick);
        detailDialog.addEventListener('cancel', function (event) {
          event.preventDefault();
          closeDetailDialog();
        });
        detailDialog.addEventListener('close', function () {
          if (detailDialogContent) {
            detailDialogContent.innerHTML = '';
          }
          if (detailDialogHeading) {
            detailDialogHeading.textContent = detailDialogDefaultHeading;
          }
          detailDialog.classList.remove('diagram-detail-dialog--camera');
        });
        detailDialogSetupComplete = true;
      }
      if (detailDialogBackButton) {
        detailDialogBackButton.onclick = closeDetailDialog;
        detailDialogBackButton.textContent = detailDialogBackLabel;
        detailDialogBackButton.setAttribute('aria-label', detailDialogBackLabel);
      }
      if (detailDialogHeading && (!detailDialog || !detailDialog.open)) {
        detailDialogHeading.textContent = detailDialogDefaultHeading;
      }
    }
    function closeDetailDialog() {
      ensureDetailDialogElements();
      if (!detailDialog) return;
      if (typeof detailDialog.close === 'function') {
        if (detailDialog.open) {
          detailDialog.close();
        }
      } else {
        detailDialog.removeAttribute('open');
        if (detailDialogContent) {
          detailDialogContent.innerHTML = '';
        }
        if (detailDialogHeading) {
          detailDialogHeading.textContent = detailDialogDefaultHeading;
        }
        detailDialog.classList.remove('diagram-detail-dialog--camera');
      }
    }
    function openDetailDialogWithEntry(entry) {
      ensureDetailDialogElements();
      if (!detailDialog || !detailDialogContent || !entry) return;
      var ownerDoc = detailDialog.ownerDocument || document;
      if (!ownerDoc) return;
      detailDialogContent.innerHTML = '';
      var wrapper = ownerDoc.createElement('div');
      wrapper.className = entry.className ? "diagram-popup ".concat(entry.className) : 'diagram-popup';
      wrapper.innerHTML = entry.content || '';
      detailDialogContent.appendChild(wrapper);
      var isCamera = Boolean(entry.className && entry.className.includes('diagram-popup--camera'));
      detailDialog.classList.toggle('diagram-detail-dialog--camera', isCamera);
      var headingText = entry.label || detailDialogDefaultHeading;
      if (detailDialogHeading) {
        detailDialogHeading.textContent = headingText;
      }
      if (detailDialogBackButton) {
        detailDialogBackButton.textContent = detailDialogBackLabel;
        detailDialogBackButton.setAttribute('aria-label', detailDialogBackLabel);
      }
      if (typeof detailDialog.showModal === 'function') {
        if (!detailDialog.open) {
          detailDialog.showModal();
        }
      } else {
        detailDialog.setAttribute('open', '');
      }
      if (detailDialogBackButton && typeof detailDialogBackButton.focus === 'function') {
        try {
          detailDialogBackButton.focus({
            preventScroll: true
          });
        } catch (focusError) {
          detailDialogBackButton.focus();
          void focusError;
        }
      }
    }
    function normalizeDiagramPositionsInput(positions) {
      if (!positions || _typeof(positions) !== 'object') {
        return {};
      }
      var normalized = {};
      Object.entries(positions).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          id = _ref2[0],
          value = _ref2[1];
        if (!value || _typeof(value) !== 'object') return;
        var x = Number(value.x);
        var y = Number(value.y);
        if (!Number.isFinite(x) || !Number.isFinite(y)) return;
        normalized[id] = {
          x: x,
          y: y
        };
      });
      return normalized;
    }
    function getDiagramManualPositions() {
      return normalizeDiagramPositionsInput(manualPositions);
    }
    function setManualDiagramPositions(positions) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      manualPositions = normalizeDiagramPositionsInput(positions);
      if (options && options.render === false) {
        return;
      }
      if (typeof renderSetupDiagram === 'function') {
        renderSetupDiagram();
      }
    }
    var diagramCssLight = "\n    .node-box{fill:#f0f0f0;stroke:none;}\n    .node-box.first-fiz{stroke:none;}\n    .first-fiz-highlight{stroke:url(#firstFizGrad);stroke-width:1px;fill:none;}\n    .node-icon{font-size:var(--font-size-diagram-icon, 24px);font-family:'UiconsThinStraightV2',system-ui,sans-serif;font-style:normal;}\n    .node-icon[data-icon-font='essential']{font-family:'EssentialIconsV2',system-ui,sans-serif;}\n    .conn{stroke:none;}\n    .conn.red{fill:#d33;}\n    .conn.blue{fill:#369;}\n    .conn.green{fill:#090;}\n    text{font-family:system-ui,sans-serif;}\n    .edge-label{font-size:var(--font-size-diagram-label, 11px);}\n    line{stroke:#333;stroke-width:2px;}\n    path.edge-path{stroke:#333;stroke-width:2px;fill:none;}\n    path.power{stroke:#d33;}\n    path.video{stroke:#369;}\n    path.fiz{stroke:#090;}\n    .diagram-placeholder{font-style:italic;color:#666;margin:0;}\n    ";
    var diagramCssDark = "\n    .node-box{fill:#444;stroke:none;}\n    .node-box.first-fiz{stroke:none;}\n    .first-fiz-highlight{stroke:url(#firstFizGrad);}\n    .node-icon{font-size:var(--font-size-diagram-icon, 24px);font-family:'UiconsThinStraightV2',system-ui,sans-serif;font-style:normal;}\n    .node-icon[data-icon-font='essential']{font-family:'EssentialIconsV2',system-ui,sans-serif;}\n    text{fill:#fff;font-family:system-ui,sans-serif;}\n    .edge-label{font-size:var(--font-size-diagram-label, 11px);}\n    line{stroke:#fff;}\n    path.edge-path{stroke:#fff;}\n    path.power{stroke:#ff6666;}\n    path.video{stroke:#7ec8ff;}\n    path.fiz{stroke:#6f6;}\n    .conn.red{fill:#ff6666;}\n    .conn.blue{fill:#7ec8ff;}\n    .conn.green{fill:#6f6;}\n    .diagram-placeholder{color:#bbb;}\n    ";
    function getDiagramCss() {
      var includeDark = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      return diagramCssLight + (includeDark ? "@media (prefers-color-scheme: dark){".concat(diagramCssDark, "}") : '');
    }
    var safeIconGlyph = function safeIconGlyph(char, font) {
      try {
        return iconGlyph(char, font);
      } catch (error) {
        void error;
      }
      return null;
    };
    var DIAGRAM_BATTERY_ICON = safeIconGlyph("\uE1A6");
    var DIAGRAM_CAMERA_ICON = safeIconGlyph("\uE333");
    var DIAGRAM_MONITOR_ICON = safeIconGlyph("\uEFFC");
    var DIAGRAM_VIEWFINDER_ICON = safeIconGlyph("\uE338");
    var DIAGRAM_VIDEO_ICON = safeIconGlyph("\uF42A");
    var DIAGRAM_WIRELESS_ICON = safeIconGlyph("\uF4AC");
    var DIAGRAM_MOTORS_ICON = safeIconGlyph("\uE8AF", ICON_FONT_KEYS.UICONS);
    var DIAGRAM_CONTROLLER_ICON = safeIconGlyph("\uE52A");
    var DIAGRAM_DISTANCE_ICON = safeIconGlyph("\uEFB9");
    var DIAGRAM_LENS_ICON = safeIconGlyph("\uE0A3", ICON_FONT_KEYS.UICONS);
    var DIAGRAM_POWER_OUTPUT_ICON = safeIconGlyph("\uE212");
    var DIAGRAM_POWER_INPUT_ICON = safeIconGlyph("\uEE71");
    var DIAGRAM_TIMECODE_ICON = safeIconGlyph("\uE46F");
    var DIAGRAM_AUDIO_IN_ICON = safeIconGlyph("\uE6B7");
    var DIAGRAM_AUDIO_OUT_ICON = safeIconGlyph("\uECB5");
    var DIAGRAM_AUDIO_IO_ICON = safeIconGlyph("\uF487");
    var diagramConnectorIcons = Object.freeze({
      powerOut: DIAGRAM_POWER_OUTPUT_ICON,
      powerIn: DIAGRAM_POWER_INPUT_ICON,
      fiz: DIAGRAM_MOTORS_ICON,
      video: DIAGRAM_VIDEO_ICON,
      timecode: DIAGRAM_TIMECODE_ICON,
      audioIn: DIAGRAM_AUDIO_IN_ICON,
      audioOut: DIAGRAM_AUDIO_OUT_ICON,
      audioIo: DIAGRAM_AUDIO_IO_ICON,
      torque: DIAGRAM_MOTORS_ICON,
      controller: DIAGRAM_CONTROLLER_ICON,
      powerSpec: DIAGRAM_POWER_OUTPUT_ICON,
      powerSource: DIAGRAM_POWER_INPUT_ICON
    });
    var diagramIcons = {
      battery: DIAGRAM_BATTERY_ICON,
      camera: DIAGRAM_CAMERA_ICON,
      monitor: DIAGRAM_MONITOR_ICON,
      viewfinder: DIAGRAM_VIEWFINDER_ICON,
      video: DIAGRAM_WIRELESS_ICON,
      motors: DIAGRAM_MOTORS_ICON,
      controllers: DIAGRAM_CONTROLLER_ICON,
      handle: DIAGRAM_CONTROLLER_ICON,
      distance: DIAGRAM_DISTANCE_ICON,
      lenses: DIAGRAM_LENS_ICON
    };
    var overviewSectionIcons = {
      category_batteries: DIAGRAM_BATTERY_ICON,
      category_batteryHotswaps: DIAGRAM_BATTERY_ICON,
      category_cameras: DIAGRAM_CAMERA_ICON,
      category_lenses: DIAGRAM_LENS_ICON,
      category_viewfinders: DIAGRAM_VIEWFINDER_ICON,
      category_monitors: DIAGRAM_MONITOR_ICON,
      category_video: DIAGRAM_WIRELESS_ICON,
      category_fiz_motors: DIAGRAM_MOTORS_ICON,
      category_fiz_controllers: DIAGRAM_CONTROLLER_ICON,
      category_fiz_distance: DIAGRAM_DISTANCE_ICON
    };
    function renderSetupDiagram() {
      var _texts$currentLang, _texts$en, _texts$currentLang2, _texts$en2, _devices$batteries2, _cam$videoOutputs;
      var setupDiagramContainer = resolveSetupContainer();
      if (!setupDiagramContainer) return;
      var texts = resolveTexts();
      var currentLang = resolveCurrentLang();
      var devices = resolveDevices();
      var cameraSelect = resolveCameraSelect();
      var monitorSelect = resolveMonitorSelect();
      var videoSelect = resolveVideoSelect();
      var distanceSelect = resolveDistanceSelect();
      var batterySelect = resolveBatterySelect();
      var motorSelects = resolveMotorSelects();
      var controllerSelects = resolveControllerSelects();
      var defaultHeadingText = ((_texts$currentLang = texts[currentLang]) === null || _texts$currentLang === void 0 ? void 0 : _texts$currentLang.diagramDetailDefaultHeading) || ((_texts$en = texts.en) === null || _texts$en === void 0 ? void 0 : _texts$en.diagramDetailDefaultHeading) || 'Diagram details';
      var backLabelText = ((_texts$currentLang2 = texts[currentLang]) === null || _texts$currentLang2 === void 0 ? void 0 : _texts$currentLang2.diagramDetailBackLabel) || ((_texts$en2 = texts.en) === null || _texts$en2 === void 0 ? void 0 : _texts$en2.diagramDetailBackLabel) || 'Back';
      detailDialogDefaultHeading = defaultHeadingText;
      detailDialogBackLabel = backLabelText;
      ensureDetailDialogElements();
      var isTouchDevice = (navigator && Number.isFinite(navigator.maxTouchPoints) ? navigator.maxTouchPoints : 0) > 0;
      void isTouchDevice;
      var camName = cameraSelect ? cameraSelect.value : '';
      var cam = devices.cameras ? devices.cameras[camName] : undefined;
      var monitorName = monitorSelect ? monitorSelect.value : '';
      var monitor = devices.monitors ? devices.monitors[monitorName] : undefined;
      var videoName = videoSelect ? videoSelect.value : '';
      var video = devices.video ? devices.video[videoName] : undefined;
      var batteryName = batterySelect ? batterySelect.value : '';
      var distanceName = distanceSelect ? distanceSelect.value : '';
      var motors = motorSelects.map(function (sel) {
        return sel ? sel.value : '';
      }).filter(function (v) {
        return v && v !== 'None';
      });
      motors.sort(function (a, b) {
        return motorPriority(a) - motorPriority(b);
      });
      var internalIdx = motors.findIndex(function (name) {
        var _devices$fiz;
        return (_devices$fiz = devices.fiz) === null || _devices$fiz === void 0 || (_devices$fiz = _devices$fiz.motors) === null || _devices$fiz === void 0 || (_devices$fiz = _devices$fiz[name]) === null || _devices$fiz === void 0 ? void 0 : _devices$fiz.internalController;
      });
      var hasInternalMotor = internalIdx !== -1;
      if (hasInternalMotor && internalIdx > 0) {
        var _motors$splice = motors.splice(internalIdx, 1),
          _motors$splice2 = _slicedToArray(_motors$splice, 1),
          m = _motors$splice2[0];
        motors.unshift(m);
      }
      var controllers = controllerSelects.map(function (sel) {
        return sel ? sel.value : '';
      }).filter(function (v) {
        return v && v !== 'None';
      });
      controllers.sort(function (a, b) {
        return controllerPriority(a) - controllerPriority(b);
      });
      var inlineControllers = controllers;
      var nodes = [];
      var pos = {};
      var nodeMap = {};
      var step = 300;
      var VIDEO_LABEL_SPACING = 10;
      var EDGE_LABEL_GAP = 12;
      var EDGE_LABEL_VERTICAL_GAP = 8;
      var EDGE_ROUTE_LABEL_GAP = 10;
      var baseY = 220;
      var x = 80;
      if (batteryName && batteryName !== 'None') {
        var _devices$batteries, _cam$power;
        var batteryLabel = batteryName;
        var _battMount = (_devices$batteries = devices.batteries) === null || _devices$batteries === void 0 || (_devices$batteries = _devices$batteries[batteryName]) === null || _devices$batteries === void 0 ? void 0 : _devices$batteries.mount_type;
        if (cam && _battMount && (_cam$power = cam.power) !== null && _cam$power !== void 0 && (_cam$power = _cam$power.batteryPlateSupport) !== null && _cam$power !== void 0 && _cam$power.some(function (bp) {
          return bp.type === _battMount && bp.mount === 'native';
        })) {
          batteryLabel += " on native ".concat(_battMount, " plate via Pins");
        }
        pos.battery = {
          x: x,
          y: baseY,
          label: batteryLabel
        };
        nodes.push('battery');
        nodeMap.battery = {
          category: 'batteries',
          name: batteryName
        };
        x += step;
      }
      if (camName && camName !== 'None') {
        pos.camera = {
          x: x,
          y: baseY,
          label: camName
        };
        nodes.push('camera');
        nodeMap.camera = {
          category: 'cameras',
          name: camName
        };
        x += step;
      }
      var controllerIds = controllers.map(function (_, idx) {
        return "controller".concat(idx);
      });
      var motorIds = motors.map(function (_, idx) {
        return "motor".concat(idx);
      });
      var controllerNameMap = new Map();
      controllerIds.forEach(function (id, idx) {
        controllerNameMap.set(id, inlineControllers[idx] || controllers[idx]);
      });
      var motorNameMap = new Map();
      motorIds.forEach(function (id, idx) {
        motorNameMap.set(id, motors[idx]);
      });
      var hasMainCtrl = controllers.some(function (n) {
        return controllerPriority(n) === 0;
      });
      var useMotorFirst = !hasMainCtrl && hasInternalMotor || !controllerIds.length && motorIds.length && motorPriority(motors[0]) === 0;
      var addNode = function addNode(id, category, label) {
        pos[id] = {
          x: x,
          y: baseY,
          label: label
        };
        nodes.push(id);
        nodeMap[id] = {
          category: category,
          name: label
        };
        x += step;
      };
      if (useMotorFirst && motorIds.length) {
        addNode(motorIds[0], 'fiz.motors', motors[0]);
        controllerIds.forEach(function (id, idx) {
          addNode(id, 'fiz.controllers', inlineControllers[idx]);
        });
        motorIds.slice(1).forEach(function (id, idx) {
          addNode(id, 'fiz.motors', motors[idx + 1]);
        });
      } else {
        controllerIds.forEach(function (id, idx) {
          addNode(id, 'fiz.controllers', inlineControllers[idx]);
        });
        motorIds.forEach(function (id, idx) {
          addNode(id, 'fiz.motors', motors[idx]);
        });
      }
      if (monitorName && monitorName !== 'None') {
        pos.monitor = {
          x: pos.camera ? pos.camera.x : 60,
          y: baseY - step,
          label: monitorName
        };
        nodes.push('monitor');
        nodeMap.monitor = {
          category: 'monitors',
          name: monitorName
        };
      }
      if (videoName && videoName !== 'None') {
        pos.video = {
          x: pos.camera ? pos.camera.x : 60,
          y: baseY + step,
          label: videoName
        };
        nodes.push('video');
        nodeMap.video = {
          category: 'video',
          name: videoName
        };
      }
      var inlineDistance = false;
      var dedicatedDistance = false;
      if (distanceName && distanceName !== 'None') {
        var attach = inlineControllers.length ? controllerIds[0] : motorIds[0];
        if (attach) {
          var arriDevices = [].concat(_toConsumableArray(inlineControllers), _toConsumableArray(motors)).some(function (n) {
            return isArri(n);
          });
          var hasDedicatedPort = inlineControllers.some(function (n) {
            return /RIA-1/i.test(n) || /UMC-4/i.test(n);
          });
          dedicatedDistance = hasDedicatedPort && arriDevices;
          inlineDistance = arriDevices && !hasDedicatedPort && inlineControllers.length;
          if (inlineDistance && motorIds.length) {
            var nextId = motorIds[0];
            pos.distance = {
              x: (pos[attach].x + pos[nextId].x) / 2,
              y: baseY - step,
              label: distanceName
            };
          } else {
            pos.distance = {
              x: pos[attach].x,
              y: baseY - step,
              label: distanceName
            };
          }
          nodes.push('distance');
          nodeMap.distance = {
            category: 'fiz.distance',
            name: distanceName
          };
        }
      }
      Object.keys(manualPositions).forEach(function (id) {
        if (!pos[id]) delete manualPositions[id];
      });
      Object.entries(pos).forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
          id = _ref4[0],
          p = _ref4[1];
        if (manualPositions[id]) {
          p.x = manualPositions[id].x;
          p.y = manualPositions[id].y;
        }
      });
      var DEFAULT_NODE_H = 120;
      var DEFAULT_NODE_W = 120;
      var nodeHeights = {};
      var nodeWidths = {};
      var diagramLabelFontSize = 'var(--font-size-diagram-label, 11px)';
      var diagramTextFontSize = 'var(--font-size-diagram-text, 13px)';
      var DIAGRAM_LABEL_LINE_HEIGHT = 13;
      var DIAGRAM_ICON_TEXT_GAP = 8;
      var DEFAULT_DIAGRAM_ICON_SIZE = 24;
      function wrapLabel(text) {
        var maxLen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 16;
        if (!text) return [];
        var str = String(text);
        if (str.length <= maxLen) return [str];
        var words = str.split(/\s+/);
        var lines = [];
        var current = '';
        words.forEach(function (word) {
          var tentative = current ? "".concat(current, " ").concat(word) : word;
          if (tentative.length > maxLen && current) {
            lines.push(current);
            current = word;
          } else {
            current = tentative;
          }
        });
        if (current) lines.push(current);
        return lines;
      }
      nodes.forEach(function (id) {
        var label = pos[id].label || id;
        var lines = wrapLabel(label);
        var hasIcon = diagramIcons[id] || id.startsWith('controller') || id.startsWith('motor');
        nodeHeights[id] = Math.max(DEFAULT_NODE_H, lines.length * DIAGRAM_LABEL_LINE_HEIGHT + (hasIcon ? 30 : 20));
        var longest = lines.reduce(function (m, l) {
          return Math.max(m, l.length);
        }, 0);
        nodeWidths[id] = Math.max(DEFAULT_NODE_W, longest * 9 + 20);
      });
      var NODE_W = Math.max.apply(Math, _toConsumableArray(Object.values(nodeWidths)).concat([DEFAULT_NODE_W]));
      var NODE_H = Math.max.apply(Math, _toConsumableArray(Object.values(nodeHeights)).concat([DEFAULT_NODE_H]));
      var getNodeHeight = function getNodeHeight(id) {
        return nodeHeights[id] || NODE_H;
      };
      var viewWidth;
      var chain = [];
      var edges = [];
      var usedConns = {};
      var markUsed = function markUsed(id, side) {
        usedConns["".concat(id, "|").concat(side)] = true;
      };
      var isUsed = function isUsed(id, side) {
        return usedConns["".concat(id, "|").concat(side)];
      };
      var connectorPos = function connectorPos(id, side) {
        var p = pos[id];
        if (!p) return {
          x: 0,
          y: 0
        };
        var h = getNodeHeight(id);
        if (side === 'top') return {
          x: p.x,
          y: p.y - h / 2
        };
        if (side === 'bottom') return {
          x: p.x,
          y: p.y + h / 2
        };
        if (side === 'bottom-left') return {
          x: p.x - NODE_W / 2 + NODE_W / 3,
          y: p.y + h / 2
        };
        if (side === 'bottom-right') return {
          x: p.x + NODE_W / 2 - NODE_W / 3,
          y: p.y + h / 2
        };
        if (side === 'left') return {
          x: p.x - NODE_W / 2,
          y: p.y
        };
        if (side === 'right') return {
          x: p.x + NODE_W / 2,
          y: p.y
        };
        return {
          x: p.x,
          y: p.y
        };
      };
      var connectorsFor = function connectorsFor(id) {
        var h = getNodeHeight(id);
        var base = [{
          side: 'left',
          color: 'red'
        }, {
          side: 'right',
          color: 'red'
        }, {
          side: 'top',
          color: 'blue'
        }, {
          side: 'bottom',
          color: 'green'
        }];
        if (h > NODE_H) {
          base.push({
            side: 'bottom-left',
            color: 'green'
          });
          base.push({
            side: 'bottom-right',
            color: 'green'
          });
        }
        return base;
      };
      var closestConnectorPair = function closestConnectorPair(idA, idB, used) {
        var aConns = connectorsFor(idA);
        var bConns = connectorsFor(idB);
        var best = null;
        var bestDist = Infinity;
        aConns.forEach(function (ac) {
          if (used["".concat(idA, "|").concat(ac.side)]) return;
          var ap = connectorPos(idA, ac.side);
          bConns.forEach(function (bc) {
            if (ac.color !== bc.color) return;
            if (used["".concat(idB, "|").concat(bc.side)]) return;
            var bp = connectorPos(idB, bc.side);
            var d = Math.hypot(ap.x - bp.x, ap.y - bp.y);
            if (d < bestDist) {
              bestDist = d;
              best = {
                fromSide: ac.side,
                toSide: bc.side
              };
            }
          });
        });
        return best;
      };
      var pushEdge = function pushEdge(edge, type) {
        if (!edge.fromSide || !edge.toSide) {
          var pair = closestConnectorPair(edge.from, edge.to, usedConns);
          if (pair) {
            if (!edge.fromSide) edge.fromSide = pair.fromSide;
            if (!edge.toSide) edge.toSide = pair.toSide;
          }
        } else if (isUsed(edge.from, edge.fromSide) || isUsed(edge.to, edge.toSide)) {
          return;
        }
        markUsed(edge.from, edge.fromSide);
        markUsed(edge.to, edge.toSide);
        edges.push(_objectSpread(_objectSpread({}, edge), {}, {
          type: type
        }));
      };
      var battMount = (_devices$batteries2 = devices.batteries) === null || _devices$batteries2 === void 0 || (_devices$batteries2 = _devices$batteries2[batteryName]) === null || _devices$batteries2 === void 0 ? void 0 : _devices$batteries2.mount_type;
      if (cam && batteryName && batteryName !== 'None') {
        var plateType = getSelectedPlate();
        var nativePlate = plateType && isSelectedPlateNative(camName);
        var camPort = firstPowerInputType(cam);
        var inLabel = camPort || plateType;
        var label = nativePlate ? '' : formatConnLabel(battMount, inLabel);
        pushEdge({
          from: 'battery',
          to: 'camera',
          label: label,
          fromSide: 'right',
          toSide: 'left'
        }, 'power');
      }
      if (monitor && firstPowerInputType(monitor)) {
        var mPort = firstPowerInputType(monitor);
        if (batteryName && batteryName !== 'None') {
          pushEdge({
            from: 'battery',
            to: 'monitor',
            label: formatConnLabel(battMount, mPort),
            fromSide: 'top',
            toSide: 'left'
          }, 'power');
        }
      }
      if (video && firstPowerInputType(video)) {
        var pPort = firstPowerInputType(video);
        if (batteryName && batteryName !== 'None') {
          pushEdge({
            from: 'battery',
            to: 'video',
            label: formatConnLabel(battMount, pPort),
            fromSide: 'bottom',
            toSide: 'left'
          }, 'power');
        }
      }
      if (cam && (_cam$videoOutputs = cam.videoOutputs) !== null && _cam$videoOutputs !== void 0 && _cam$videoOutputs.length) {
        var _monitor$video, _monitor$videoInputs, _video$videoInputs;
        var camOut = cam.videoOutputs[0].type;
        var monInObj = monitor && (((_monitor$video = monitor.video) === null || _monitor$video === void 0 || (_monitor$video = _monitor$video.inputs) === null || _monitor$video === void 0 ? void 0 : _monitor$video[0]) || ((_monitor$videoInputs = monitor.videoInputs) === null || _monitor$videoInputs === void 0 ? void 0 : _monitor$videoInputs[0]));
        var vidInObj = video && (((_video$videoInputs = video.videoInputs) === null || _video$videoInputs === void 0 ? void 0 : _video$videoInputs[0]) || (video.video ? video.video.inputs[0] : null));
        if (monitor && monInObj) {
          var monIn = monInObj.portType || monInObj.type || monInObj;
          pushEdge({
            from: 'camera',
            to: 'monitor',
            label: connectionLabel(camOut, monIn),
            fromSide: 'top',
            toSide: 'bottom',
            labelSpacing: VIDEO_LABEL_SPACING
          }, 'video');
        }
        if (video && vidInObj) {
          var vidIn = vidInObj.portType || vidInObj.type || vidInObj;
          pushEdge({
            from: 'camera',
            to: 'video',
            label: connectionLabel(camOut, vidIn),
            fromSide: 'bottom',
            toSide: 'top',
            labelSpacing: VIDEO_LABEL_SPACING
          }, 'video');
        }
      }
      useMotorFirst = !hasMainCtrl && hasInternalMotor || !controllerIds.length && motorIds.length && motorPriority(motors[0]) === 0;
      var distanceSelected = distanceName && distanceName !== 'None';
      var distanceInChain = distanceSelected && !dedicatedDistance;
      var firstController = false;
      var firstMotor = false;
      if (useMotorFirst && motorIds.length) {
        chain.push(motorIds[0]);
        firstMotor = true;
      } else if (controllerIds.length) {
        chain.push(controllerIds[0]);
        firstController = true;
      } else if (motorIds.length) {
        chain.push(motorIds[0]);
        firstMotor = true;
      }
      if (distanceInChain) chain.push('distance');
      if (controllerIds.length) chain = chain.concat(controllerIds.slice(firstController ? 1 : 0));
      if (motorIds.length) chain = chain.concat(motorIds.slice(firstMotor ? 1 : 0));
      if (pos.distance && !manualPositions.distance) {
        var references = [];
        var distanceIndex = chain.indexOf('distance');
        if (distanceIndex !== -1) {
          var prevId = distanceIndex > 0 ? chain[distanceIndex - 1] : null;
          var _nextId = distanceIndex < chain.length - 1 ? chain[distanceIndex + 1] : null;
          if (prevId && pos[prevId]) references.push(pos[prevId]);
          if (_nextId && pos[_nextId]) references.push(pos[_nextId]);
        }
        if (references.length < 2) {
          var fallbackIds = chain.filter(function (id) {
            return id !== 'distance';
          }).slice(0, 2);
          fallbackIds.forEach(function (id) {
            if (pos[id] && !references.includes(pos[id])) references.push(pos[id]);
          });
        }
        if (references.length >= 2) {
          pos.distance.x = (references[0].x + references[1].x) / 2;
        } else if (references.length === 1) {
          pos.distance.x = references[0].x;
        }
      }
      if (cam && chain.length) {
        var first = chain[0];
        if (first === 'distance' && chain.length > 1 && (controllerIds.length || hasInternalMotor)) {
          first = chain[1];
        }
        var firstName = null;
        if (first.startsWith('controller')) {
          firstName = controllerNameMap.get(first);
        } else if (first.startsWith('motor')) {
          firstName = motorNameMap.get(first);
        }
        var port = first === 'distance' ? 'LBUS' : controllerCamPort(firstName);
        var _camPort = cameraFizPort(camName, port, firstName);
        pushEdge({
          from: 'camera',
          to: first,
          label: formatConnLabel(_camPort, port),
          noArrow: true
        }, 'fiz');
      } else if (motorIds.length && cam) {
        var _camPort2 = cameraFizPort(camName, motorFizPort(motors[0]), motors[0]);
        pushEdge({
          from: 'camera',
          to: motorIds[0],
          label: formatConnLabel(_camPort2, motorFizPort(motors[0])),
          noArrow: true
        }, 'fiz');
      }
      for (var i = 0; i < chain.length - 1; i++) {
        var a = chain[i];
        var b = chain[i + 1];
        var fromName = null;
        var toName = null;
        if (a.startsWith('controller')) fromName = controllerNameMap.get(a);else if (a.startsWith('motor')) fromName = motorNameMap.get(a);
        if (b.startsWith('controller')) toName = controllerNameMap.get(b);else if (b.startsWith('motor')) toName = motorNameMap.get(b);
        pushEdge({
          from: a,
          to: b,
          label: formatConnLabel(fizPort(fromName), fizPort(toName)),
          noArrow: true
        }, 'fiz');
      }
      if (dedicatedDistance && controllerIds.length && distanceSelected) {
        var ctrlName = inlineControllers[0] || controllers[0];
        var distPort = controllerDistancePort(ctrlName);
        var portLabel = formatConnLabel(fizPort(ctrlName), distPort);
        pushEdge({
          from: controllerIds[0],
          to: 'distance',
          label: portLabel,
          noArrow: true,
          toSide: 'bottom-right'
        }, 'fiz');
      }
      var fizList = [];
      controllerIds.forEach(function (id, idx) {
        fizList.push({
          id: id,
          name: inlineControllers[idx] || controllers[idx]
        });
      });
      motorIds.forEach(function (id, idx) {
        fizList.push({
          id: id,
          name: motors[idx]
        });
      });
      var isMainCtrl = function isMainCtrl(name) {
        return /RIA-1/i.test(name) || /UMC-4/i.test(name) || /cforce.*rf/i.test(name);
      };
      var powerTarget = null;
      var main = fizList.find(function (d) {
        return isMainCtrl(d.name);
      });
      if (main) {
        powerTarget = main;
      } else {
        powerTarget = fizList.find(function (d) {
          return fizNeedsPower(d.name);
        });
      }
      if (powerTarget && fizNeedsPower(powerTarget.name)) {
        var _powerTarget = powerTarget,
          fizId = _powerTarget.id,
          name = _powerTarget.name;
        var powerSrc = batteryName && batteryName !== 'None' ? 'battery' : null;
        var _label = formatConnLabel('D-Tap', fizPowerPort(name));
        var skipBatt = isArri(camName) && isArriOrCmotion(name);
        if (powerSrc && !skipBatt) {
          pushEdge({
            from: powerSrc,
            to: fizId,
            label: _label,
            fromSide: 'bottom-left',
            toSide: 'bottom',
            route: 'down-right-up'
          }, 'power');
        }
      }
      if (nodes.length === 0) {
        var _texts$currentLang3, _texts$en3;
        setupDiagramContainer.innerHTML = "<p class=\"diagram-placeholder\">".concat(((_texts$currentLang3 = texts[currentLang]) === null || _texts$currentLang3 === void 0 ? void 0 : _texts$currentLang3.setupDiagramPlaceholder) || ((_texts$en3 = texts.en) === null || _texts$en3 === void 0 ? void 0 : _texts$en3.setupDiagramPlaceholder) || '', "</p>");
        return;
      }
      var xs = Object.values(pos).map(function (p) {
        return p.x;
      });
      var minX = Math.min.apply(Math, _toConsumableArray(xs));
      var maxX = Math.max.apply(Math, _toConsumableArray(xs));
      var contentWidth = maxX - minX;
      var baseViewWidth = Math.max(500, contentWidth + NODE_W);
      if (Object.keys(manualPositions).length === 0) {
        var shiftX = baseViewWidth / 2 - (minX + maxX) / 2;
        Object.values(pos).forEach(function (p) {
          p.x += shiftX;
        });
        xs = Object.values(pos).map(function (p) {
          return p.x;
        });
        minX = Math.min.apply(Math, _toConsumableArray(xs));
        maxX = Math.max.apply(Math, _toConsumableArray(xs));
      }
      var ys = Object.values(pos).map(function (p) {
        return p.y;
      });
      var minY = Math.min.apply(Math, _toConsumableArray(ys));
      var maxY = Math.max.apply(Math, _toConsumableArray(ys));
      var HORIZONTAL_MARGIN = Math.max(40, NODE_W * 0.25);
      var TOP_MARGIN = Math.max(40, NODE_H * 0.25);
      var BOTTOM_MARGIN = Math.max(120, NODE_H * 0.4);
      var minBoundX = minX - NODE_W / 2 - HORIZONTAL_MARGIN;
      var maxBoundX = maxX + NODE_W / 2 + HORIZONTAL_MARGIN;
      var minBoundY = minY - NODE_H / 2 - TOP_MARGIN;
      var maxBoundY = maxY + NODE_H / 2 + BOTTOM_MARGIN;
      var viewBoxX = Math.floor(Math.min(0, minBoundX));
      var viewBoxY = Math.floor(minBoundY);
      viewWidth = Math.max(baseViewWidth, Math.ceil(maxBoundX - viewBoxX));
      var baseViewHeight = maxY - minY + NODE_H + TOP_MARGIN + BOTTOM_MARGIN;
      var viewHeight = Math.max(Math.ceil(baseViewHeight), Math.ceil(maxBoundY - viewBoxY));
      function computePath(fromId, toId) {
        var labelSpacing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        var labelLineCount = Math.max(0, opts.labelLineCount || 0);
        var multilineOffset = labelLineCount > 1 ? (labelLineCount - 1) * DIAGRAM_LABEL_LINE_HEIGHT : 0;
        var from = connectorPos(fromId, opts.fromSide);
        var to = connectorPos(toId, opts.toSide);
        var path;
        var lx;
        var ly;
        var angle = 0;
        if (opts.route === 'down-right-up') {
          var bottomY = maxY + NODE_H;
          path = "M ".concat(from.x, " ").concat(from.y, " V ").concat(bottomY, " H ").concat(to.x, " V ").concat(to.y);
          lx = (from.x + to.x) / 2;
          ly = bottomY - EDGE_ROUTE_LABEL_GAP - labelSpacing - multilineOffset;
        } else {
          path = "M ".concat(from.x, " ").concat(from.y, " L ").concat(to.x, " ").concat(to.y);
          var dx = to.x - from.x;
          var dy = to.y - from.y;
          angle = Math.atan2(dy, dx) * 180 / Math.PI;
          var midX = (from.x + to.x) / 2;
          var midY = (from.y + to.y) / 2;
          var len = Math.hypot(dx, dy) || 1;
          var baseGap = Math.abs(dx) < Math.abs(dy) ? EDGE_LABEL_VERTICAL_GAP : EDGE_LABEL_GAP;
          var off = baseGap + labelSpacing + multilineOffset;
          var perpX = dy / len * off;
          var perpY = -dx / len * off;
          lx = midX + perpX;
          ly = midY + perpY;
        }
        return {
          path: path,
          labelX: lx,
          labelY: ly,
          angle: angle
        };
      }
      var EDGE_LABEL_WRAP = 18;
      var defs = "\n        <defs>\n          <linearGradient id=\"firstFizGrad\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n            <stop offset=\"0%\" stop-color=\"#fff\" stop-opacity=\"0.9\"></stop>\n            <stop offset=\"100%\" stop-color=\"#fff\" stop-opacity=\"0\"></stop>\n          </linearGradient>\n        </defs>\n      ";
      var svg = "<svg viewBox=\"".concat(viewBoxX, " ").concat(viewBoxY, " ").concat(viewWidth, " ").concat(viewHeight, "\" role=\"group\" aria-labelledby=\"diagramDesc\">").concat(defs);
      svg += '<g id="diagramRoot">';
      nodes.forEach(function (id) {
        var p = pos[id];
        if (!p) return;
        var h = getNodeHeight(id);
        var nodeCls = id === 'motor0' ? 'diagram-node' : 'diagram-node';
        var rectCls = id === 'motor0' ? 'node-box' : 'node-box';
        svg += "<g class=\"".concat(nodeCls, "\" data-node=\"").concat(id, "\">");
        svg += "<rect class=\"".concat(rectCls, "\" x=\"").concat(p.x - NODE_W / 2, "\" y=\"").concat(p.y - h / 2, "\" width=\"").concat(NODE_W, "\" height=\"").concat(h, "\" rx=\"4\" ry=\"4\" />");
        var conns = connectorsFor(id);
        conns.forEach(function (c) {
          var _connectorPos = connectorPos(id, c.side),
            cx = _connectorPos.x,
            cy = _connectorPos.y;
          svg += "<circle class=\"conn ".concat(c.color, "\" cx=\"").concat(cx, "\" cy=\"").concat(cy, "\" r=\"4\" />");
        });
        var icon = diagramIcons[id];
        if (!icon) {
          if (id.startsWith('motor')) {
            icon = diagramIcons.motors;
          } else if (id.startsWith('controller')) {
            var _nodeMap$id;
            var _name = (((_nodeMap$id = nodeMap[id]) === null || _nodeMap$id === void 0 ? void 0 : _nodeMap$id.name) || '').toLowerCase();
            if (/handle|grip/.test(_name)) icon = diagramIcons.handle;else icon = diagramIcons.controllers;
          } else if (id === 'distance') {
            icon = diagramIcons.distance;
          }
        }
        var lines = wrapLabel(p.label || id);
        var resolvedIcon = icon ? resolveIconGlyph(icon) : null;
        var hasIconGlyph = Boolean(resolvedIcon && (resolvedIcon.markup || resolvedIcon.char));
        var iconSize = hasIconGlyph && Number.isFinite(resolvedIcon.size) ? resolvedIcon.size : DEFAULT_DIAGRAM_ICON_SIZE;
        var iconHeight = hasIconGlyph ? iconSize : 0;
        var textLineCount = lines.length;
        var textHeight = textLineCount ? textLineCount * DIAGRAM_LABEL_LINE_HEIGHT : 0;
        var iconGap = hasIconGlyph && textLineCount ? DIAGRAM_ICON_TEXT_GAP : 0;
        var contentHeight = iconHeight + iconGap + textHeight;
        var contentTop = p.y - contentHeight / 2;
        var centerX = formatSvgCoordinate(p.x);
        if (hasIconGlyph) {
          var iconCenterY = contentTop + iconHeight / 2;
          if (resolvedIcon.markup && positionSvgMarkup) {
            var positioned = positionSvgMarkup(ensureSvgHasAriaHidden(resolvedIcon.markup), p.x, iconCenterY, iconSize);
            if (positioned && positioned.markup) {
              var wrapperClasses = ['node-icon-svg'];
              if (resolvedIcon.className) wrapperClasses.push(resolvedIcon.className);
              svg += "<g class=\"".concat(wrapperClasses.join(' '), "\" transform=\"translate(").concat(positioned.x, ", ").concat(positioned.y, ")\">").concat(positioned.markup, "</g>");
            }
          } else if (resolvedIcon.char) {
            var fontAttr = resolvedIcon.font ? " data-icon-font=\"".concat(resolvedIcon.font, "\"") : '';
            svg += "<text class=\"node-icon\"".concat(fontAttr, " x=\"").concat(centerX, "\" y=\"").concat(formatSvgCoordinate(iconCenterY), "\" text-anchor=\"middle\" dominant-baseline=\"middle\">").concat(resolvedIcon.char, "</text>");
          }
        }
        if (textLineCount) {
          var textTop = contentTop + iconHeight + iconGap;
          var textY = formatSvgCoordinate(textTop);
          var fontSize = hasIconGlyph ? diagramLabelFontSize : diagramTextFontSize;
          svg += "<text x=\"".concat(centerX, "\" y=\"").concat(textY, "\" text-anchor=\"middle\" dominant-baseline=\"hanging\" style=\"font-size: ").concat(fontSize, ";\">");
          lines.forEach(function (line, i) {
            var dyAttr = i === 0 ? '' : " dy=\"".concat(DIAGRAM_LABEL_LINE_HEIGHT, "\"");
            svg += "<tspan x=\"".concat(centerX, "\"").concat(dyAttr, ">").concat(line, "</tspan>");
          });
          svg += "</text>";
        }
        svg += "</g>";
      });
      edges.forEach(function (edge) {
        var lines = edge.label ? wrapLabel(edge.label, EDGE_LABEL_WRAP) : [];
        var _computePath = computePath(edge.from, edge.to, edge.labelSpacing, _objectSpread(_objectSpread({}, edge), {}, {
            labelLineCount: lines.length
          })),
          path = _computePath.path,
          labelX = _computePath.labelX,
          labelY = _computePath.labelY,
          angle = _computePath.angle;
        svg += "<path class=\"edge-path ".concat(edge.type, "\" d=\"").concat(path, "\" />");
        if (lines.length) {
          var transform = Math.abs(angle) > 90 ? "rotate(".concat(angle + 180, " ").concat(labelX, " ").concat(labelY, ")") : "rotate(".concat(angle, " ").concat(labelX, " ").concat(labelY, ")");
          var labelXCoord = formatSvgCoordinate(labelX);
          var labelYCoord = formatSvgCoordinate(labelY);
          svg += "<text class=\"edge-label\" x=\"".concat(labelXCoord, "\" y=\"").concat(labelYCoord, "\" transform=\"").concat(transform, "\" text-anchor=\"middle\">");
          lines.forEach(function (line, idx) {
            var dyAttr = idx === 0 ? '' : " dy=\"".concat(DIAGRAM_LABEL_LINE_HEIGHT, "\"");
            svg += "<tspan x=\"".concat(labelXCoord, "\"").concat(dyAttr, ">").concat(line, "</tspan>");
          });
          svg += '</text>';
        }
      });
      svg += '</g></svg>';
      var popup = document ? document.getElementById('diagramPopup') : null;
      if (!popup && document) {
        popup = document.createElement('div');
        popup.id = 'diagramPopup';
      }
      if (popup) {
        popup.className = 'diagram-popup';
        popup.setAttribute('role', 'dialog');
        popup.setAttribute('aria-modal', 'false');
        if (!popup.hasAttribute('tabindex')) {
          popup.tabIndex = -1;
        }
      }
      setupDiagramContainer.innerHTML = '';
      if (popup) setupDiagramContainer.appendChild(popup);
      setupDiagramContainer.insertAdjacentHTML('beforeend', svg);
      var popupEntries = {};
      var safeSummaryFn = getSafeGenerateConnectorSummary();
      Object.entries(nodeMap).forEach(function (_ref5) {
        var _pos$nodeId;
        var _ref6 = _slicedToArray(_ref5, 2),
          nodeId = _ref6[0],
          meta = _ref6[1];
        var label = ((_pos$nodeId = pos[nodeId]) === null || _pos$nodeId === void 0 ? void 0 : _pos$nodeId.label) || (meta === null || meta === void 0 ? void 0 : meta.name) || nodeId;
        var safeLabel = escapeHtml(label);
        var className = popupClassForCategory(meta === null || meta === void 0 ? void 0 : meta.category);
        var summaryHtml = '';
        if (typeof safeSummaryFn === 'function') {
          var deviceInfo = resolveDeviceInfo(devices, meta === null || meta === void 0 ? void 0 : meta.category, meta === null || meta === void 0 ? void 0 : meta.name);
          if (deviceInfo) {
            try {
              summaryHtml = safeSummaryFn(deviceInfo) || '';
            } catch (summaryError) {
              void summaryError;
            }
          }
        }
        var safeBackLabel = escapeHtml(detailDialogBackLabel || 'Back');
        var headingId = buildPopupHeadingId(nodeId);
        var safeHeadingId = escapeHtml(headingId);
        var bodyHtml = summaryHtml || "<p class=\"diagram-popup__fallback\">".concat(safeLabel, "</p>");
        var content = "\n          <div class=\"diagram-popup__layout\">\n            <header class=\"diagram-popup__header\">\n              <button\n                type=\"button\"\n                class=\"diagram-popup__back\"\n                data-diagram-popup-close\n                aria-label=\"".concat(safeBackLabel, "\"\n              >\n                <span class=\"btn-icon icon-glyph icon-text\" aria-hidden=\"true\" data-icon-font=\"text\">&larr;</span>\n                <span class=\"diagram-popup__back-label\">").concat(safeBackLabel, "</span>\n              </button>\n              <h3 class=\"diagram-popup__title\" id=\"").concat(safeHeadingId, "\">").concat(safeLabel, "</h3>\n            </header>\n            <div class=\"diagram-popup__body\">\n              ").concat(bodyHtml, "\n            </div>\n          </div>\n        ");
        popupEntries[nodeId] = {
          className: className,
          content: content,
          label: safeLabel,
          headingId: headingId
        };
      });
      lastPopupEntries = popupEntries;
      var svgEl = setupDiagramContainer.querySelector('svg');
      if (!svgEl) return;
      var measureEl = resolveDiagramHint();
      if (measureEl) {
        var _setupDiagramContaine;
        var containerRect = setupDiagramContainer.getBoundingClientRect();
        var parentRect = (_setupDiagramContaine = setupDiagramContainer.parentElement) === null || _setupDiagramContaine === void 0 ? void 0 : _setupDiagramContaine.getBoundingClientRect();
        var containerWidth = (containerRect === null || containerRect === void 0 ? void 0 : containerRect.width) || setupDiagramContainer.clientWidth || 0;
        if (parentRect && containerWidth && containerWidth > parentRect.width * 0.95) {
          setupDiagramContainer.dataset.initialScale = String(Math.max(0.5, parentRect.width / containerWidth * 0.95));
        } else {
          delete setupDiagramContainer.dataset.initialScale;
        }
      }
      lastDiagramPositions = Object.fromEntries(Object.entries(pos));
      enableDiagramInteractions();
    }
    function enableDiagramInteractions() {
      var _texts$currentLang4, _texts$en4, _texts$currentLang5, _texts$en5, _texts$currentLang6, _texts$en6;
      var setupDiagramContainer = resolveSetupContainer();
      if (!setupDiagramContainer) return;
      var svg = setupDiagramContainer.querySelector('svg');
      if (!svg) return;
      var texts = resolveTexts();
      var currentLang = resolveCurrentLang();
      var hoverNoticeText = ((_texts$currentLang4 = texts[currentLang]) === null || _texts$currentLang4 === void 0 ? void 0 : _texts$currentLang4.diagramHoverNotice) || ((_texts$en4 = texts.en) === null || _texts$en4 === void 0 ? void 0 : _texts$en4.diagramHoverNotice) || 'Click me for more information!';
      detailDialogDefaultHeading = ((_texts$currentLang5 = texts[currentLang]) === null || _texts$currentLang5 === void 0 ? void 0 : _texts$currentLang5.diagramDetailDefaultHeading) || ((_texts$en5 = texts.en) === null || _texts$en5 === void 0 ? void 0 : _texts$en5.diagramDetailDefaultHeading) || detailDialogDefaultHeading;
      detailDialogBackLabel = ((_texts$currentLang6 = texts[currentLang]) === null || _texts$currentLang6 === void 0 ? void 0 : _texts$currentLang6.diagramDetailBackLabel) || ((_texts$en6 = texts.en) === null || _texts$en6 === void 0 ? void 0 : _texts$en6.diagramDetailBackLabel) || detailDialogBackLabel;
      ensureDetailDialogElements();
      var popup = setupDiagramContainer.querySelector('#diagramPopup');
      var activePopupNode = null;
      var activePopupEntry = null;
      var _normaliseTargetElement = function normaliseTargetElement(target) {
        if (!target || _typeof(target) !== 'object') return null;
        if (typeof target.closest === 'function') return target;
        if ('parentElement' in target && target.parentElement) return target.parentElement;
        if ('parentNode' in target && target.parentNode && target.parentNode !== target) {
          return _normaliseTargetElement(target.parentNode);
        }
        return null;
      };
      var hidePopup = function hidePopup() {
        if (!popup) return;
        popup.style.display = 'none';
        popup.setAttribute('hidden', '');
        popup.innerHTML = '';
        popup.dataset.columns = '1';
        popup.style.removeProperty('--diagram-popup-dynamic-width');
        popup.className = 'diagram-popup';
        popup.removeAttribute('aria-label');
        popup.removeAttribute('aria-labelledby');
        popup.onkeydown = null;
        activePopupNode = null;
        activePopupEntry = null;
      };
      hidePopup();
      if (cleanupDiagramInteractions) cleanupDiagramInteractions();
      var root = svg.querySelector('#diagramRoot') || svg;
      var isTouch = (navigator && Number.isFinite(navigator.maxTouchPoints) ? navigator.maxTouchPoints : 0) > 0;
      var MAX_SCALE = isTouch ? Infinity : 3;
      var BASE_MIN_SCALE = isTouch ? 0.55 : 0.6;
      var MIN_AUTO_SCALE = isTouch ? 0.4 : 0.35;
      var dataScaleRaw = parseFloat(setupDiagramContainer.dataset.initialScale || '');
      var fallbackScale = isTouch ? 0.95 : 0.85;
      var initialScaleRaw = Number.isFinite(dataScaleRaw) && dataScaleRaw > 0 ? dataScaleRaw : fallbackScale;
      var MIN_SCALE = Math.max(MIN_AUTO_SCALE, Math.min(BASE_MIN_SCALE, initialScaleRaw));
      var clampScale = function clampScale(value) {
        if (!Number.isFinite(value) || value <= 0) return MIN_SCALE;
        if (value > MAX_SCALE) return MAX_SCALE;
        if (value < MIN_SCALE) return MIN_SCALE;
        return value;
      };
      var INITIAL_SCALE = clampScale(initialScaleRaw);
      var initialPan = {
        x: 0,
        y: 0
      };
      if (setupDiagramContainer.dataset.initialPan) {
        try {
          var parsed = JSON.parse(setupDiagramContainer.dataset.initialPan);
          if (parsed && Number.isFinite(parsed.x) && Number.isFinite(parsed.y)) {
            initialPan = {
              x: parsed.x,
              y: parsed.y
            };
          }
        } catch (err) {
          void err;
        }
      }
      var pan = _objectSpread({}, initialPan);
      var scale = INITIAL_SCALE;
      var panning = false;
      var panStart = _objectSpread({}, pan);
      var panPointerStart = null;
      var getPos = function getPos(e) {
        if (e.touches && e.touches[0]) return {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
        if (e.changedTouches && e.changedTouches[0]) return {
          x: e.changedTouches[0].clientX,
          y: e.changedTouches[0].clientY
        };
        return {
          x: e.clientX,
          y: e.clientY
        };
      };
      var getMetrics = function getMetrics() {
        var _svg$viewBox, _svg$width, _svg$height;
        var rect = typeof svg.getBoundingClientRect === 'function' ? svg.getBoundingClientRect() : null;
        var viewBox = (_svg$viewBox = svg.viewBox) === null || _svg$viewBox === void 0 ? void 0 : _svg$viewBox.baseVal;
        var viewBoxWidth = viewBox && Number.isFinite(viewBox.width) && viewBox.width > 0 ? viewBox.width : ((_svg$width = svg.width) === null || _svg$width === void 0 || (_svg$width = _svg$width.baseVal) === null || _svg$width === void 0 ? void 0 : _svg$width.value) || (rect === null || rect === void 0 ? void 0 : rect.width) || 1;
        var viewBoxHeight = viewBox && Number.isFinite(viewBox.height) && viewBox.height > 0 ? viewBox.height : ((_svg$height = svg.height) === null || _svg$height === void 0 || (_svg$height = _svg$height.baseVal) === null || _svg$height === void 0 ? void 0 : _svg$height.value) || (rect === null || rect === void 0 ? void 0 : rect.height) || 1;
        var rectWidth = rect && Number.isFinite(rect.width) && rect.width > 0 ? rect.width : viewBoxWidth;
        var rectHeight = rect && Number.isFinite(rect.height) && rect.height > 0 ? rect.height : viewBoxHeight;
        var viewPerPxX = rectWidth > 0 ? viewBoxWidth / rectWidth : 1;
        var viewPerPxY = rectHeight > 0 ? viewBoxHeight / rectHeight : 1;
        return {
          rect: rect,
          viewPerPxX: viewPerPxX,
          viewPerPxY: viewPerPxY
        };
      };
      var convertPointerDeltaToView = function convertPointerDeltaToView(dxPx, dyPx) {
        var _getMetrics = getMetrics(),
          viewPerPxX = _getMetrics.viewPerPxX,
          viewPerPxY = _getMetrics.viewPerPxY;
        return {
          x: (Number.isFinite(dxPx) ? dxPx : 0) * viewPerPxX / (scale || 1),
          y: (Number.isFinite(dyPx) ? dyPx : 0) * viewPerPxY / (scale || 1)
        };
      };
      var apply = function apply() {
        scale = clampScale(scale);
        root.setAttribute('transform', "translate(".concat(pan.x, ",").concat(pan.y, ") scale(").concat(scale, ")"));
      };
      var zoomWithCenter = function zoomWithCenter(factor) {
        var currentScale = scale;
        if (!Number.isFinite(currentScale) || currentScale <= 0) return;
        var targetScale = clampScale(currentScale * factor);
        if (!Number.isFinite(targetScale) || targetScale <= 0 || targetScale === currentScale) {
          scale = targetScale;
          apply();
          return;
        }
        var _getMetrics2 = getMetrics(),
          rect = _getMetrics2.rect,
          viewPerPxX = _getMetrics2.viewPerPxX,
          viewPerPxY = _getMetrics2.viewPerPxY;
        if (rect && Number.isFinite(rect.width) && Number.isFinite(rect.height) && rect.width > 0 && rect.height > 0) {
          var centerX = rect.width / 2;
          var centerY = rect.height / 2;
          var inverseCurrent = 1 / currentScale;
          var inverseTarget = 1 / targetScale;
          pan.x += centerX * viewPerPxX * (inverseTarget - inverseCurrent);
          pan.y += centerY * viewPerPxY * (inverseTarget - inverseCurrent);
        }
        scale = targetScale;
        apply();
      };
      var zoomInBtn = resolveZoomInButton();
      if (zoomInBtn) {
        zoomInBtn.onclick = function () {
          zoomWithCenter(1.1);
        };
      }
      var zoomOutBtn = resolveZoomOutButton();
      if (zoomOutBtn) {
        zoomOutBtn.onclick = function () {
          zoomWithCenter(0.9);
        };
      }
      var resetViewBtn = resolveResetButton();
      if (resetViewBtn) {
        resetViewBtn.onclick = function () {
          pan = _objectSpread({}, initialPan);
          scale = INITIAL_SCALE;
          apply();
          manualPositions = {};
          renderSetupDiagram();
          if (scheduleProjectAutoSave) scheduleProjectAutoSave();else if (saveCurrentSession) saveCurrentSession();
          if (checkSetupChanged) checkSetupChanged();
        };
      }
      var onSvgMouseDown = function onSvgMouseDown(e) {
        if (e.target.closest('.diagram-node')) return;
        var pos = getPos(e);
        panning = true;
        panPointerStart = pos;
        panStart = _objectSpread({}, pan);
        if (e.touches) e.preventDefault();
        hidePopup();
      };
      var onPanMove = function onPanMove(e) {
        if (!panning || !panPointerStart) return;
        var pos = getPos(e);
        var delta = convertPointerDeltaToView(pos.x - panPointerStart.x, pos.y - panPointerStart.y);
        pan.x = panStart.x + delta.x;
        pan.y = panStart.y + delta.y;
        apply();
        if (e.touches) e.preventDefault();
      };
      var stopPanning = function stopPanning() {
        panning = false;
        panPointerStart = null;
      };
      var DRAG_HOLD_DELAY = 140;
      var DRAG_MOVE_THRESHOLD = 4;
      var DOUBLE_TAP_DELAY = 350;
      var DOUBLE_TAP_DISTANCE = 30;
      var dragId = null;
      var dragPointerStart = null;
      var dragNode = null;
      var dragStartPosition = null;
      var dragMovedDuringInteraction = false;
      var dragActivationTimer = null;
      var pendingDragInfo = null;
      var dragActive = false;
      var lastTapInfo = null;
      var clearPendingDrag = function clearPendingDrag() {
        if (dragActivationTimer) {
          clearTimeout(dragActivationTimer);
          dragActivationTimer = null;
        }
        pendingDragInfo = null;
      };
      var startDragSession = function startDragSession() {
        if (!pendingDragInfo) return false;
        var _pendingDragInfo = pendingDragInfo,
          node = _pendingDragInfo.node,
          pointer = _pendingDragInfo.pointer;
        if (!node) {
          clearPendingDrag();
          return false;
        }
        var nodeId = node.getAttribute('data-node');
        if (!nodeId) {
          clearPendingDrag();
          return false;
        }
        var start = lastDiagramPositions[nodeId];
        if (!start) {
          clearPendingDrag();
          return false;
        }
        dragId = nodeId;
        dragNode = node;
        dragPointerStart = pointer;
        dragStartPosition = {
          x: start.x,
          y: start.y
        };
        dragMovedDuringInteraction = false;
        dragActive = true;
        clearPendingDrag();
        return true;
      };
      var onDragStart = function onDragStart(e) {
        var node = e.target.closest('.diagram-node');
        if (!node) return;
        var pointer = getPos(e);
        pendingDragInfo = {
          node: node,
          pointer: pointer,
          time: Date.now()
        };
        hidePopup();
        dragMovedDuringInteraction = false;
        dragActive = false;
        if (dragActivationTimer) {
          clearTimeout(dragActivationTimer);
        }
        dragActivationTimer = setTimeout(function () {
          startDragSession();
        }, DRAG_HOLD_DELAY);
        e.stopPropagation();
      };
      var ensureDragSession = function ensureDragSession() {
        if (dragActive) return true;
        return startDragSession();
      };
      var onDragMove = function onDragMove(e) {
        if (pendingDragInfo && !dragActive) {
          var _pos = getPos(e);
          var _dx = Math.abs(_pos.x - pendingDragInfo.pointer.x);
          var _dy = Math.abs(_pos.y - pendingDragInfo.pointer.y);
          if (_dx > DRAG_MOVE_THRESHOLD || _dy > DRAG_MOVE_THRESHOLD) {
            startDragSession();
          }
        }
        if (!ensureDragSession() || !dragPointerStart || !dragStartPosition) return;
        var pos = getPos(e);
        var delta = convertPointerDeltaToView(pos.x - dragPointerStart.x, pos.y - dragPointerStart.y);
        var dx = delta.x;
        var dy = delta.y;
        if (!dragMovedDuringInteraction && (Math.abs(dx) > 2 || Math.abs(dy) > 2)) {
          dragMovedDuringInteraction = true;
        }
        var newX = dragStartPosition.x + dx;
        var newY = dragStartPosition.y + dy;
        if (getCurrentGridSnap()) {
          var g = 20;
          newX = Math.round(newX / g) * g;
          newY = Math.round(newY / g) * g;
        }
        var tx = newX - dragStartPosition.x;
        var ty = newY - dragStartPosition.y;
        if (dragNode) dragNode.setAttribute('transform', "translate(".concat(tx, ",").concat(ty, ")"));
        if (dragActive && e.touches) e.preventDefault();
      };
      var onDragEnd = function onDragEnd(e) {
        if (!dragActive || !dragId || !dragPointerStart || !dragStartPosition) {
          clearPendingDrag();
          dragActive = false;
          dragId = null;
          dragNode = null;
          dragPointerStart = null;
          dragStartPosition = null;
          return;
        }
        var pos = getPos(e);
        var delta = convertPointerDeltaToView(pos.x - dragPointerStart.x, pos.y - dragPointerStart.y);
        var newX = dragStartPosition.x + delta.x;
        var newY = dragStartPosition.y + delta.y;
        if (getCurrentGridSnap()) {
          var g = 20;
          newX = Math.round(newX / g) * g;
          newY = Math.round(newY / g) * g;
        }
        manualPositions[dragId] = {
          x: newX,
          y: newY
        };
        clearPendingDrag();
        dragId = null;
        dragNode = null;
        dragPointerStart = null;
        dragStartPosition = null;
        dragActive = false;
        dragMovedDuringInteraction = false;
        renderSetupDiagram();
        if (scheduleProjectAutoSave) scheduleProjectAutoSave();else if (saveCurrentSession) saveCurrentSession();
        if (checkSetupChanged) checkSetupChanged();
        if (e.touches) e.preventDefault();
      };
      var onNodeTouchEnd = function onNodeTouchEnd(e) {
        var node = e.target.closest('.diagram-node');
        if (!node) {
          lastTapInfo = null;
          return;
        }
        var nodeId = node.getAttribute('data-node');
        if (!nodeId) {
          lastTapInfo = null;
          return;
        }
        var now = Date.now();
        var pos = getPos(e);
        if (lastTapInfo && lastTapInfo.id === nodeId && now - lastTapInfo.time <= DOUBLE_TAP_DELAY && Math.abs(pos.x - lastTapInfo.pos.x) <= DOUBLE_TAP_DISTANCE && Math.abs(pos.y - lastTapInfo.pos.y) <= DOUBLE_TAP_DISTANCE) {
          var entry = lastPopupEntries[nodeId];
          if (entry) {
            showEntryPopupForNode(node, entry);
            if (typeof e.preventDefault === 'function') e.preventDefault();
          }
          lastTapInfo = null;
          return;
        }
        lastTapInfo = {
          id: nodeId,
          pos: pos,
          time: now
        };
        showHoverNoticeForNode(node);
      };
      var adjustPopupLayout = function adjustPopupLayout(entry, viewportWidth, viewportHeight, margin) {
        if (!popup) return;
        popup.dataset.columns = '1';
        popup.style.removeProperty('--diagram-popup-dynamic-width');
        var isCameraPopup = entry && typeof entry.className === 'string' && entry.className.includes('diagram-popup--camera') || popup.classList.contains('diagram-popup--camera');
        if (!isCameraPopup) return;
        if (!Number.isFinite(viewportHeight) || viewportHeight <= margin * 2) return;
        var availableHeight = viewportHeight - margin * 2;
        if (availableHeight <= 0) return;
        var currentHeight = popup.scrollHeight;
        if (!Number.isFinite(currentHeight) || currentHeight <= availableHeight) return;
        var maxWidth = Number.isFinite(viewportWidth) && viewportWidth > margin * 2 ? Math.max(260, viewportWidth - margin * 2) : Infinity;
        var baseWidth = 520;
        var widthStep = 220;
        var minColumnWidth = 220;
        var appliedColumns = 1;
        var appliedWidth = baseWidth;
        for (var columns = 2; columns <= 4; columns += 1) {
          var candidateWidth = Math.min(maxWidth, baseWidth + (columns - 1) * widthStep);
          if (candidateWidth < columns * minColumnWidth) {
            continue;
          }
          popup.style.setProperty('--diagram-popup-dynamic-width', "".concat(candidateWidth, "px"));
          popup.dataset.columns = String(columns);
          void popup.offsetHeight;
          var updatedHeight = popup.scrollHeight;
          appliedColumns = columns;
          appliedWidth = candidateWidth;
          if (Number.isFinite(updatedHeight) && updatedHeight <= availableHeight) {
            break;
          }
        }
        if (appliedColumns > 1) {
          popup.dataset.columns = String(appliedColumns);
          popup.style.setProperty('--diagram-popup-dynamic-width', "".concat(appliedWidth, "px"));
          void popup.offsetHeight;
        } else {
          popup.dataset.columns = '1';
          popup.style.removeProperty('--diagram-popup-dynamic-width');
          void popup.offsetHeight;
        }
      };
      var positionPopup = function positionPopup(nodeEl, entry) {
        var _document$documentEle, _document$documentEle2;
        if (!popup || !nodeEl) return;
        var rect = typeof nodeEl.getBoundingClientRect === 'function' ? nodeEl.getBoundingClientRect() : null;
        if (!rect) return;
        var viewportWidth = windowObj && Number.isFinite(windowObj.innerWidth) ? windowObj.innerWidth : (document === null || document === void 0 || (_document$documentEle = document.documentElement) === null || _document$documentEle === void 0 ? void 0 : _document$documentEle.clientWidth) || 0;
        var viewportHeight = windowObj && Number.isFinite(windowObj.innerHeight) ? windowObj.innerHeight : (document === null || document === void 0 || (_document$documentEle2 = document.documentElement) === null || _document$documentEle2 === void 0 ? void 0 : _document$documentEle2.clientHeight) || 0;
        var margin = 12;
        popup.style.visibility = 'hidden';
        popup.style.display = popup.classList.contains('diagram-popup--notice') ? 'flex' : 'block';
        popup.removeAttribute('hidden');
        adjustPopupLayout(entry, viewportWidth, viewportHeight, margin);
        var popupRect = typeof popup.getBoundingClientRect === 'function' ? popup.getBoundingClientRect() : null;
        var left = rect.right + margin;
        var top = rect.top;
        if (popupRect) {
          var pointer = lastPointerPosition;
          var pointerOnRightSide = pointer && viewportWidth && Number.isFinite(pointer.x) && pointer.x >= viewportWidth * 0.55;
          if (pointerOnRightSide) {
            var preferredLeft = rect.left - popupRect.width - margin;
            if (preferredLeft >= margin) {
              left = preferredLeft;
            } else if (viewportWidth) {
              left = Math.min(rect.right + margin, Math.max(margin, viewportWidth - popupRect.width - margin));
            } else {
              left = Math.max(margin, preferredLeft);
            }
          } else if (viewportWidth && left + popupRect.width > viewportWidth - margin) {
            left = Math.max(margin, rect.left - popupRect.width - margin);
          }
          if (viewportWidth) {
            if (left + popupRect.width > viewportWidth - margin) {
              left = Math.max(margin, viewportWidth - popupRect.width - margin);
            }
            if (left < margin) {
              left = margin;
            }
          }
          if (viewportHeight && top + popupRect.height > viewportHeight - margin) {
            top = Math.max(margin, viewportHeight - popupRect.height - margin);
          }
        }
        popup.style.left = "".concat(Math.round(left), "px");
        popup.style.top = "".concat(Math.round(top), "px");
        popup.style.visibility = 'visible';
      };
      var focusPopup = function focusPopup() {
        if (!popup || typeof popup.focus !== 'function') return;
        try {
          popup.focus({ preventScroll: true });
        } catch (focusError) {
          popup.focus();
          void focusError;
        }
      };
      var wirePopupControls = function wirePopupControls(nodeEl, entry) {
        if (!popup) return;
        var closeButton = popup.querySelector('[data-diagram-popup-close]');
        if (closeButton) {
          closeButton.onclick = function (event) {
            if (event) {
              event.preventDefault();
              event.stopPropagation();
            }
            hidePopup();
          };
        }
        popup.onkeydown = function (event) {
          if (!event) return;
          var key = event.key || event.code;
          if (key === 'Escape' || key === 'Esc') {
            event.preventDefault();
            hidePopup();
          }
        };
        if (entry) {
          var expandButton = popup.querySelector('[data-diagram-popup-expand]');
          if (expandButton) {
            expandButton.onclick = function (event) {
              if (event) {
                event.preventDefault();
                event.stopPropagation();
              }
              hidePopup();
              openDetailDialogWithEntry(entry);
            };
          }
        }
        if (!popup.classList.contains('diagram-popup--notice')) {
          focusPopup();
        }
        void nodeEl;
      };
      var updatePointerPosition = function updatePointerPosition(event) {
        if (!event) return;
        var clientX;
        var clientY;
        if (event.touches && event.touches.length) {
          var touch = event.touches[0];
          clientX = touch === null || touch === void 0 ? void 0 : touch.clientX;
          clientY = touch === null || touch === void 0 ? void 0 : touch.clientY;
        } else if (typeof event.clientX === 'number' && typeof event.clientY === 'number') {
          clientX = event.clientX;
          clientY = event.clientY;
        }
        if (Number.isFinite(clientX) && Number.isFinite(clientY)) {
          lastPointerPosition = {
            x: clientX,
            y: clientY
          };
        }
      };
      var showHoverNoticeForNode = function showHoverNoticeForNode(nodeEl) {
        if (!popup || !nodeEl) return;
        var nodeId = nodeEl.getAttribute('data-node');
        if (!nodeId || !lastPopupEntries[nodeId]) {
          hidePopup();
          return;
        }
        var safeNotice = escapeHtml(hoverNoticeText);
        popup.className = 'diagram-popup diagram-popup--notice';
        popup.innerHTML = "<p class=\"diagram-popup-notice\">".concat(safeNotice, "</p>");
        popup.setAttribute('aria-label', hoverNoticeText);
        popup.removeAttribute('aria-labelledby');
        activePopupNode = nodeEl;
        activePopupEntry = null;
        positionPopup(nodeEl, null);
      };
      var onNodeOver = function onNodeOver(e) {
        updatePointerPosition(e);
        var node = e.target.closest('.diagram-node');
        if (!node || node === activePopupNode) return;
        showHoverNoticeForNode(node);
      };
      var onNodeOut = function onNodeOut(e) {
        if (!activePopupNode) return;
        var related = e.relatedTarget;
        if (related && activePopupNode.contains(related)) return;
        if (related && related.closest && related.closest('.diagram-node') === activePopupNode) return;
        if (popup && (related === popup || related && popup.contains(related))) return;
        hidePopup();
      };
      var onSvgLeave = function onSvgLeave(e) {
        if (svg.contains(e.relatedTarget)) return;
        if (popup && (e.relatedTarget === popup || popup.contains(e.relatedTarget))) return;
        hidePopup();
      };
      var onPointerDownOutsidePopup = function onPointerDownOutsidePopup(event) {
        if (!popup || popup.hasAttribute('hidden')) return;
        var element = _normaliseTargetElement((event === null || event === void 0 ? void 0 : event.target) || null);
        if (!element) return;
        if (element === popup || typeof popup.contains === 'function' && popup.contains(element)) return;
        if (typeof element.closest === 'function' && element.closest('.diagram-node')) return;
        hidePopup();
      };
      svg.addEventListener('mousedown', onSvgMouseDown);
      svg.addEventListener('touchstart', onSvgMouseDown, {
        passive: false
      });
      if (windowObj) {
        windowObj.addEventListener('mousemove', onPanMove);
        windowObj.addEventListener('touchmove', onPanMove, {
          passive: false
        });
        windowObj.addEventListener('mouseup', stopPanning);
        windowObj.addEventListener('touchend', stopPanning);
        windowObj.addEventListener('mousemove', onDragMove);
        windowObj.addEventListener('touchmove', onDragMove, {
          passive: false
        });
        windowObj.addEventListener('mouseup', onDragEnd);
        windowObj.addEventListener('touchend', onDragEnd);
        windowObj.addEventListener('mousemove', updatePointerPosition);
        windowObj.addEventListener('touchmove', updatePointerPosition, {
          passive: true
        });
      }
      var showEntryPopupForNode = function showEntryPopupForNode(node, entry) {
        if (!entry) return;
        if (!popup || !node) {
          openDetailDialogWithEntry(entry);
          return;
        }
        popup.className = entry.className ? "diagram-popup ".concat(entry.className) : 'diagram-popup';
        popup.innerHTML = entry.content || '';
        if (entry.headingId) {
          popup.setAttribute('aria-labelledby', entry.headingId);
          popup.removeAttribute('aria-label');
        } else if (entry.label) {
          popup.setAttribute('aria-label', entry.label);
          popup.removeAttribute('aria-labelledby');
        } else {
          popup.removeAttribute('aria-label');
          popup.removeAttribute('aria-labelledby');
        }
        activePopupNode = node;
        activePopupEntry = entry;
        positionPopup(node, entry);
        wirePopupControls(node, entry);
      };
      var onNodeDoubleClick = function onNodeDoubleClick(e) {
        var node = e.target.closest('.diagram-node');
        if (!node) return;
        var nodeId = node.getAttribute('data-node');
        if (!nodeId) return;
        var entry = lastPopupEntries[nodeId];
        if (!entry) return;
        hidePopup();
        activePopupNode = null;
        activePopupEntry = null;
        openDetailDialogWithEntry(entry);
        e.stopPropagation();
        e.preventDefault();
      };
      svg.addEventListener('mousedown', onDragStart);
      svg.addEventListener('touchstart', onDragStart, {
        passive: false
      });
      svg.addEventListener('touchend', onNodeTouchEnd, {
        passive: false
      });
      svg.addEventListener('mouseover', onNodeOver);
      svg.addEventListener('mouseout', onNodeOut);
      svg.addEventListener('mouseleave', onSvgLeave);
      svg.addEventListener('dblclick', onNodeDoubleClick);
      var repositionActivePopup = function repositionActivePopup() {
        if (!activePopupNode) return;
        var nodeId = activePopupNode.getAttribute('data-node');
        if (!nodeId || !lastPopupEntries[nodeId]) {
          hidePopup();
          return;
        }
        var entry = activePopupEntry || lastPopupEntries[nodeId];
        positionPopup(activePopupNode, entry || null);
      };
      svg.addEventListener('mousemove', updatePointerPosition);
      svg.addEventListener('touchstart', updatePointerPosition, {
        passive: true
      });
      if (document) {
        document.addEventListener('mousedown', onPointerDownOutsidePopup);
        document.addEventListener('touchstart', onPointerDownOutsidePopup, {
          passive: true
        });
      }
      if (windowObj) {
        windowObj.addEventListener('resize', repositionActivePopup);
      }
      cleanupDiagramInteractions = function cleanupDiagramInteractions() {
        svg.removeEventListener('mousedown', onSvgMouseDown);
        svg.removeEventListener('touchstart', onSvgMouseDown);
        if (windowObj) {
          windowObj.removeEventListener('mousemove', onPanMove);
          windowObj.removeEventListener('touchmove', onPanMove);
          windowObj.removeEventListener('mouseup', stopPanning);
          windowObj.removeEventListener('touchend', stopPanning);
          windowObj.removeEventListener('mousemove', onDragMove);
          windowObj.removeEventListener('touchmove', onDragMove);
          windowObj.removeEventListener('mouseup', onDragEnd);
          windowObj.removeEventListener('touchend', onDragEnd);
          windowObj.removeEventListener('mousemove', updatePointerPosition);
          windowObj.removeEventListener('touchmove', updatePointerPosition);
        }
        svg.removeEventListener('mousedown', onDragStart);
        svg.removeEventListener('touchstart', onDragStart);
        svg.removeEventListener('touchend', onNodeTouchEnd);
        svg.removeEventListener('mouseover', onNodeOver);
        svg.removeEventListener('mouseout', onNodeOut);
        svg.removeEventListener('mouseleave', onSvgLeave);
        svg.removeEventListener('mousemove', updatePointerPosition);
        svg.removeEventListener('touchstart', updatePointerPosition);
        svg.removeEventListener('dblclick', onNodeDoubleClick);
        if (document) {
          document.removeEventListener('mousedown', onPointerDownOutsidePopup);
          document.removeEventListener('touchstart', onPointerDownOutsidePopup, {
            passive: true
          });
        }
        if (windowObj) {
          windowObj.removeEventListener('resize', repositionActivePopup);
        }
        clearPendingDrag();
        dragId = null;
        dragNode = null;
        dragPointerStart = null;
        dragStartPosition = null;
        dragActive = false;
        dragMovedDuringInteraction = false;
        lastTapInfo = null;
        hidePopup();
      };
      apply();
    }
    function updateDiagramLegend() {
      var _texts$currentLang7, _texts$en7, _texts$currentLang8, _texts$en8, _texts$currentLang9, _texts$en9;
      var diagramLegend = resolveDiagramLegend();
      if (!diagramLegend) return;
      var texts = resolveTexts();
      var currentLang = resolveCurrentLang();
      var legendItems = [{
        cls: 'power',
        text: ((_texts$currentLang7 = texts[currentLang]) === null || _texts$currentLang7 === void 0 ? void 0 : _texts$currentLang7.diagramLegendPower) || ((_texts$en7 = texts.en) === null || _texts$en7 === void 0 ? void 0 : _texts$en7.diagramLegendPower) || 'Power'
      }, {
        cls: 'video',
        text: ((_texts$currentLang8 = texts[currentLang]) === null || _texts$currentLang8 === void 0 ? void 0 : _texts$currentLang8.diagramLegendVideo) || ((_texts$en8 = texts.en) === null || _texts$en8 === void 0 ? void 0 : _texts$en8.diagramLegendVideo) || 'Video'
      }, {
        cls: 'fiz',
        text: ((_texts$currentLang9 = texts[currentLang]) === null || _texts$currentLang9 === void 0 ? void 0 : _texts$currentLang9.diagramLegendFIZ) || ((_texts$en9 = texts.en) === null || _texts$en9 === void 0 ? void 0 : _texts$en9.diagramLegendFIZ) || 'FIZ'
      }];
      diagramLegend.innerHTML = legendItems.map(function (_ref7) {
        var cls = _ref7.cls,
          text = _ref7.text;
        return "<span><span class=\"swatch ".concat(cls, "\"></span>").concat(text, "</span>");
      }).join('');
    }
    return {
      renderSetupDiagram: renderSetupDiagram,
      enableDiagramInteractions: enableDiagramInteractions,
      updateDiagramLegend: updateDiagramLegend,
      getDiagramManualPositions: getDiagramManualPositions,
      setManualDiagramPositions: setManualDiagramPositions,
      getDiagramCss: getDiagramCss,
      diagramConnectorIcons: diagramConnectorIcons,
      diagramIcons: diagramIcons,
      overviewSectionIcons: overviewSectionIcons,
      DIAGRAM_MONITOR_ICON: DIAGRAM_MONITOR_ICON
    };
  }
  var moduleApi = Object.freeze({
    createConnectionDiagram: createConnectionDiagram
  });
  MODULE_BASE.registerOrQueueModule('cine.features.connectionDiagram', moduleApi, {
    category: 'features',
    description: 'Connection diagram rendering and interactions.',
    replace: true,
    connections: ['cineModuleBase', 'cineModuleContext', 'cineUi']
  }, function (error) {
    return safeWarn('Unable to register cine.features.connectionDiagram module.', error);
  }, GLOBAL_SCOPE, MODULE_BASE.getModuleRegistry && MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE));
  if (typeof MODULE_BASE.exposeGlobal === 'function') {
    MODULE_BASE.exposeGlobal('cineFeaturesConnectionDiagram', moduleApi, GLOBAL_SCOPE, {
      configurable: true,
      enumerable: false,
      writable: false
    });
  } else {
    try {
      GLOBAL_SCOPE.cineFeaturesConnectionDiagram = moduleApi;
    } catch (error) {
      void error;
    }
  }
})();