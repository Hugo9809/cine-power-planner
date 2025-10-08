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
    var getCurrentGridSnap = fallbackGetter(context.getCurrentGridSnap, function () {
      return false;
    });
    var scheduleProjectAutoSave = fallbackGetter(context.scheduleProjectAutoSave);
    var saveCurrentSession = fallbackGetter(context.saveCurrentSession);
    var checkSetupChanged = fallbackGetter(context.checkSetupChanged);
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
    var ensureArray = function ensureArray(value) {
      if (!value) return [];
      if (Array.isArray(value)) return value;
      if (typeof value.length === 'number') return Array.from(value);
      return [];
    };
    var manualPositions = {};
    var lastDiagramPositions = {};
    var cleanupDiagramInteractions = null;
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
      var _devices$batteries2, _cam$videoOutputs;
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
        var _texts$currentLang, _texts$en;
        setupDiagramContainer.innerHTML = "<p class=\"diagram-placeholder\">".concat(((_texts$currentLang = texts[currentLang]) === null || _texts$currentLang === void 0 ? void 0 : _texts$currentLang.setupDiagramPlaceholder) || ((_texts$en = texts.en) === null || _texts$en === void 0 ? void 0 : _texts$en.setupDiagramPlaceholder) || '', "</p>");
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
        popup.className = 'diagram-popup';
      }
      setupDiagramContainer.innerHTML = '';
      if (popup) setupDiagramContainer.appendChild(popup);
      setupDiagramContainer.insertAdjacentHTML('beforeend', svg);
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
    }
    function enableDiagramInteractions() {
      var setupDiagramContainer = resolveSetupContainer();
      if (!setupDiagramContainer) return;
      var svg = setupDiagramContainer.querySelector('svg');
      if (!svg) return;
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
      var dragId = null;
      var dragPointerStart = null;
      var dragNode = null;
      var onDragStart = function onDragStart(e) {
        var node = e.target.closest('.diagram-node');
        if (!node) return;
        dragId = node.getAttribute('data-node');
        dragNode = node;
        dragPointerStart = getPos(e);
        if (e.touches) e.preventDefault();
        e.stopPropagation();
      };
      var onDragMove = function onDragMove(e) {
        if (!dragId || !dragPointerStart) return;
        var start = lastDiagramPositions[dragId];
        if (!start) return;
        var pos = getPos(e);
        var delta = convertPointerDeltaToView(pos.x - dragPointerStart.x, pos.y - dragPointerStart.y);
        var dx = delta.x;
        var dy = delta.y;
        var newX = start.x + dx;
        var newY = start.y + dy;
        if (getCurrentGridSnap()) {
          var g = 20;
          newX = Math.round(newX / g) * g;
          newY = Math.round(newY / g) * g;
        }
        var tx = newX - start.x;
        var ty = newY - start.y;
        if (dragNode) dragNode.setAttribute('transform', "translate(".concat(tx, ",").concat(ty, ")"));
        if (e.touches) e.preventDefault();
      };
      var onDragEnd = function onDragEnd(e) {
        if (!dragId || !dragPointerStart) return;
        var start = lastDiagramPositions[dragId];
        if (start) {
          var pos = getPos(e);
          var delta = convertPointerDeltaToView(pos.x - dragPointerStart.x, pos.y - dragPointerStart.y);
          var newX = start.x + delta.x;
          var newY = start.y + delta.y;
          if (getCurrentGridSnap()) {
            var g = 20;
            newX = Math.round(newX / g) * g;
            newY = Math.round(newY / g) * g;
          }
          manualPositions[dragId] = {
            x: newX,
            y: newY
          };
        }
        dragId = null;
        dragNode = null;
        dragPointerStart = null;
        renderSetupDiagram();
        if (scheduleProjectAutoSave) scheduleProjectAutoSave();else if (saveCurrentSession) saveCurrentSession();
        if (checkSetupChanged) checkSetupChanged();
        if (e.touches) e.preventDefault();
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
      }
      svg.addEventListener('mousedown', onDragStart);
      svg.addEventListener('touchstart', onDragStart, {
        passive: false
      });
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
        }
        svg.removeEventListener('mousedown', onDragStart);
        svg.removeEventListener('touchstart', onDragStart);
      };
      apply();
    }
    function updateDiagramLegend() {
      var _texts$currentLang2, _texts$en2, _texts$currentLang3, _texts$en3, _texts$currentLang4, _texts$en4;
      var diagramLegend = resolveDiagramLegend();
      if (!diagramLegend) return;
      var texts = resolveTexts();
      var currentLang = resolveCurrentLang();
      var legendItems = [{
        cls: 'power',
        text: ((_texts$currentLang2 = texts[currentLang]) === null || _texts$currentLang2 === void 0 ? void 0 : _texts$currentLang2.diagramLegendPower) || ((_texts$en2 = texts.en) === null || _texts$en2 === void 0 ? void 0 : _texts$en2.diagramLegendPower) || 'Power'
      }, {
        cls: 'video',
        text: ((_texts$currentLang3 = texts[currentLang]) === null || _texts$currentLang3 === void 0 ? void 0 : _texts$currentLang3.diagramLegendVideo) || ((_texts$en3 = texts.en) === null || _texts$en3 === void 0 ? void 0 : _texts$en3.diagramLegendVideo) || 'Video'
      }, {
        cls: 'fiz',
        text: ((_texts$currentLang4 = texts[currentLang]) === null || _texts$currentLang4 === void 0 ? void 0 : _texts$currentLang4.diagramLegendFIZ) || ((_texts$en4 = texts.en) === null || _texts$en4 === void 0 ? void 0 : _texts$en4.diagramLegendFIZ) || 'FIZ'
      }];
      diagramLegend.innerHTML = legendItems.map(function (_ref5) {
        var cls = _ref5.cls,
          text = _ref5.text;
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