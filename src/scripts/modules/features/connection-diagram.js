/* global cineModuleBase */

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

  const GLOBAL_SCOPE = detectGlobalScope();

  function resolveModuleBase(scope) {
    if (typeof cineModuleBase === 'object' && cineModuleBase) {
      return cineModuleBase;
    }

    if (typeof require === 'function') {
      try {
        const required = require('../base.js');
        if (required && typeof required === 'object') {
          return required;
        }
      } catch (error) {
        void error;
      }
    }

    if (scope && typeof scope.cineModuleBase === 'object') {
      return scope.cineModuleBase;
    }

    return null;
  }

  const MODULE_BASE = resolveModuleBase(GLOBAL_SCOPE);
  if (!MODULE_BASE) {
    return;
  }

  const safeWarn = typeof MODULE_BASE.safeWarn === 'function'
    ? MODULE_BASE.safeWarn.bind(MODULE_BASE)
    : (message, error) => {
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
    return () => undefined;
  }

  function fallbackValue(value, fallback) {
    return typeof value === 'undefined' ? fallback : value;
  }

  function optionalFunction(value) {
    return typeof value === 'function' ? value : null;
  }

  function createConnectionDiagram(context = {}) {
    // The connection diagram is driven by lazy getters so the module can be
    // initialised before the DOM is ready (for example when restore flows or
    // tests run in a DOM-less environment). These helper lookups collect every
    // dependency in one place which makes it easier to audit how the UI
    // interacts with user data – a key requirement for maintaining the offline
    // and autosave guarantees of the planner.
    const document = fallbackValue(context.document, GLOBAL_SCOPE.document || null);
    const windowObj = fallbackValue(context.window, typeof GLOBAL_SCOPE.addEventListener === 'function' ? GLOBAL_SCOPE : null);
    const navigator = fallbackValue(context.navigator, GLOBAL_SCOPE.navigator || null);

    const getTexts = fallbackGetter(context.getTexts, () => fallbackValue(context.texts, GLOBAL_SCOPE.texts || {}));
    const getCurrentLang = fallbackGetter(context.getCurrentLang, () => fallbackValue(context.currentLang, GLOBAL_SCOPE.currentLang || 'en'));
    const getDevices = fallbackGetter(context.getDevices, () => fallbackValue(context.devices, GLOBAL_SCOPE.devices || {}));

    const getCameraSelect = fallbackGetter(context.getCameraSelect, () => fallbackValue(context.cameraSelect, GLOBAL_SCOPE.cameraSelect || null));
    const getMonitorSelect = fallbackGetter(context.getMonitorSelect, () => fallbackValue(context.monitorSelect, GLOBAL_SCOPE.monitorSelect || null));
    const getVideoSelect = fallbackGetter(context.getVideoSelect, () => fallbackValue(context.videoSelect, GLOBAL_SCOPE.videoSelect || null));
    const getDistanceSelect = fallbackGetter(context.getDistanceSelect, () => fallbackValue(context.distanceSelect, GLOBAL_SCOPE.distanceSelect || null));
    const getBatterySelect = fallbackGetter(context.getBatterySelect, () => fallbackValue(context.batterySelect, GLOBAL_SCOPE.batterySelect || null));
    const getMotorSelects = fallbackGetter(context.getMotorSelects, () => fallbackValue(context.motorSelects, GLOBAL_SCOPE.motorSelects || []));
    const getControllerSelects = fallbackGetter(context.getControllerSelects, () => fallbackValue(context.controllerSelects, GLOBAL_SCOPE.controllerSelects || []));

    const getSetupDiagramContainer = fallbackGetter(context.getSetupDiagramContainer, () => fallbackValue(context.setupDiagramContainer, document ? document.getElementById('diagramArea') : null));
    const getDiagramLegend = fallbackGetter(context.getDiagramLegend, () => fallbackValue(context.diagramLegend, document ? document.getElementById('diagramLegend') : null));
    const getDiagramHint = fallbackGetter(context.getDiagramHint, () => fallbackValue(context.diagramHint, document ? document.getElementById('diagramHint') : null));
    const getDownloadDiagramBtn = fallbackGetter(context.getDownloadDiagramBtn, () => fallbackValue(context.downloadDiagramBtn, document ? document.getElementById('downloadDiagram') : null));
    const getZoomInBtn = fallbackGetter(context.getZoomInBtn, () => fallbackValue(context.zoomInBtn, document ? document.getElementById('zoomIn') : null));
    const getZoomOutBtn = fallbackGetter(context.getZoomOutBtn, () => fallbackValue(context.zoomOutBtn, document ? document.getElementById('zoomOut') : null));
    const getResetViewBtn = fallbackGetter(context.getResetViewBtn, () => fallbackValue(context.resetViewBtn, document ? document.getElementById('resetView') : null));
    const getGridSnapToggleBtn = fallbackGetter(context.getGridSnapToggleBtn, () => fallbackValue(context.gridSnapToggleBtn, document ? document.getElementById('gridSnapToggle') : null));
    const getDiagramDetailDialog = fallbackGetter(
      context.getDiagramDetailDialog,
      () => fallbackValue(context.diagramDetailDialog, document ? document.getElementById('diagramDetailDialog') : null),
    );
    const getDiagramDetailContent = fallbackGetter(
      context.getDiagramDetailContent,
      () => fallbackValue(context.diagramDetailContent, document ? document.getElementById('diagramDetailDialogContent') : null),
    );
    const getDiagramDetailHeading = fallbackGetter(
      context.getDiagramDetailHeading,
      () => fallbackValue(context.diagramDetailHeading, document ? document.getElementById('diagramDetailDialogHeading') : null),
    );
    const getDiagramDetailBackButton = fallbackGetter(
      context.getDiagramDetailBackButton,
      () => fallbackValue(context.diagramDetailBackButton, document ? document.getElementById('diagramDetailDialogBack') : null),
    );

    const getCurrentGridSnap = fallbackGetter(context.getCurrentGridSnap, () => false);
    // Persistence hooks are resolved lazily so feature modules can opt-in to
    // saving behaviour without creating hard dependencies on the main runtime.
    // This keeps backup / restore pathways resilient even when the diagram is
    // rendered in isolation (for example inside onboarding documentation).
    const scheduleProjectAutoSave = optionalFunction(context.scheduleProjectAutoSave);
    const saveCurrentSession = optionalFunction(context.saveCurrentSession);
    const checkSetupChanged = optionalFunction(context.checkSetupChanged);

    const motorPriority = fallbackGetter(context.motorPriority, () => 0);
    const controllerPriority = fallbackGetter(context.controllerPriority, () => 0);
    const isArri = fallbackGetter(context.isArri, () => false);
    const isArriOrCmotion = fallbackGetter(context.isArriOrCmotion, () => false);
    const fizNeedsPower = fallbackGetter(context.fizNeedsPower, () => false);
    const fizPowerPort = fallbackGetter(context.fizPowerPort, () => '');
    const controllerDistancePort = fallbackGetter(context.controllerDistancePort, () => '');
    const controllerCamPort = fallbackGetter(context.controllerCamPort, () => '');
    const cameraFizPort = fallbackGetter(context.cameraFizPort, () => '');
    const motorFizPort = fallbackGetter(context.motorFizPort, () => '');
    const getSelectedPlate = fallbackGetter(context.getSelectedPlate, () => '');
    const isSelectedPlateNative = fallbackGetter(context.isSelectedPlateNative, () => false);
    const firstPowerInputType = fallbackGetter(context.firstPowerInputType, () => '');
    const formatConnLabel = fallbackGetter(context.formatConnLabel, (a, b) => [a, b].filter(Boolean).join(' → '));
    const connectionLabel = fallbackGetter(context.connectionLabel, (a, b) => formatConnLabel(a, b));
    const fizPort = fallbackGetter(context.fizPort, () => '');

    const iconGlyph = fallbackGetter(
      context.iconGlyph,
      (char, font) => (typeof GLOBAL_SCOPE.iconGlyph === 'function' ? GLOBAL_SCOPE.iconGlyph(char, font) : null),
    );
    const ICON_FONT_KEYS = fallbackValue(context.ICON_FONT_KEYS, GLOBAL_SCOPE.ICON_FONT_KEYS || {});
    const applyIconGlyph = fallbackGetter(
      context.applyIconGlyph,
      (element, glyph) => {
        if (typeof GLOBAL_SCOPE.applyIconGlyph === 'function') {
          return GLOBAL_SCOPE.applyIconGlyph(element, glyph);
        }
        return null;
      }
    );
    void applyIconGlyph;
    const resolveIconGlyph = fallbackGetter(
      context.resolveIconGlyph,
      glyph => (typeof GLOBAL_SCOPE.resolveIconGlyph === 'function' ? GLOBAL_SCOPE.resolveIconGlyph(glyph) : glyph)
    );
    const positionSvgMarkup = fallbackGetter(
      context.positionSvgMarkup,
      (markup, x, y, size) => (typeof GLOBAL_SCOPE.positionSvgMarkup === 'function'
        ? GLOBAL_SCOPE.positionSvgMarkup(markup, x, y, size)
        : null)
    );
    const ensureSvgHasAriaHidden = fallbackGetter(
      context.ensureSvgHasAriaHidden,
      markup => (typeof GLOBAL_SCOPE.ensureSvgHasAriaHidden === 'function'
        ? GLOBAL_SCOPE.ensureSvgHasAriaHidden(markup)
        : markup)
    );
    const formatSvgCoordinate = fallbackGetter(
      context.formatSvgCoordinate,
      value => (typeof GLOBAL_SCOPE.formatSvgCoordinate === 'function'
        ? GLOBAL_SCOPE.formatSvgCoordinate(value)
        : (Number.isFinite(value) ? String(value) : '0'))
    );
    const getSafeGenerateConnectorSummary = fallbackGetter(
      context.getSafeGenerateConnectorSummary,
      () => {
        if (MODULE_BASE && typeof MODULE_BASE.safeGenerateConnectorSummary === 'function') {
          return MODULE_BASE.safeGenerateConnectorSummary.bind(MODULE_BASE);
        }
        if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.safeGenerateConnectorSummary === 'function') {
          return GLOBAL_SCOPE.safeGenerateConnectorSummary;
        }
        return null;
      }
    );

    const ensureArray = value => {
      if (!value) return [];
      if (Array.isArray(value)) return value;
      if (typeof value.length === 'number') return Array.from(value);
      return [];
    };

    let manualPositions = {};
    let lastDiagramPositions = {};
    let cleanupDiagramInteractions = null;
    let lastPopupEntries = {};
    let lastPointerPosition = null;
    let detailDialog = null;
    let detailDialogContent = null;
    let detailDialogHeading = null;
    let detailDialogBackButton = null;
    let detailDialogSetupComplete = false;
    let detailDialogDefaultHeading = 'Diagram details';
    let detailDialogBackLabel = 'Back';

    const resolveSetupContainer = () => getSetupDiagramContainer();
    const resolveDiagramLegend = () => getDiagramLegend();
    const resolveDiagramHint = () => getDiagramHint();
    const resolveDownloadButton = () => getDownloadDiagramBtn();
    void resolveDownloadButton;
    const resolveZoomInButton = () => getZoomInBtn();
    const resolveZoomOutButton = () => getZoomOutBtn();
    const resolveResetButton = () => getResetViewBtn();
    const resolveGridSnapToggle = () => getGridSnapToggleBtn();
    void resolveGridSnapToggle;

    const resolveTexts = () => {
      try { return getTexts() || {}; } catch (error) { void error; return {}; }
    };
    const resolveCurrentLang = () => {
      try { return getCurrentLang() || 'en'; } catch (error) { void error; return 'en'; }
    };
    const resolveDevices = () => {
      try { return getDevices() || {}; } catch (error) { void error; return {}; }
    };
    const resolveCameraSelect = () => getCameraSelect();
    const resolveMonitorSelect = () => getMonitorSelect();
    const resolveVideoSelect = () => getVideoSelect();
    const resolveDistanceSelect = () => getDistanceSelect();
    const resolveBatterySelect = () => getBatterySelect();
    const resolveMotorSelects = () => ensureArray(getMotorSelects());
    const resolveControllerSelects = () => ensureArray(getControllerSelects());
    const escapeHtml = value => {
      if (value === null || value === undefined) return '';
      return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    };

    const resolveDeviceInfo = (devicesObj, categoryPath, name) => {
      if (!devicesObj || !categoryPath || !name) return null;
      const segments = String(categoryPath).split('.').filter(Boolean);
      let cursor = devicesObj;
      for (let i = 0; i < segments.length; i += 1) {
        const key = segments[i];
        if (!cursor || typeof cursor !== 'object') {
          cursor = null;
          break;
        }
        cursor = cursor[key];
      }
      if (!cursor || typeof cursor !== 'object') return null;
      try {
        return cursor[name] || null;
      } catch (error) {
        void error;
        return null;
      }
    };

    const popupClassForCategory = category => {
      if (!category) return '';
      if (category === 'cameras') return 'diagram-popup--camera';
      return '';
    };

    function ensureDetailDialogElements() {
      const dialogEl = getDiagramDetailDialog();
      const contentEl = getDiagramDetailContent();
      const headingEl = getDiagramDetailHeading();
      const backButtonEl = getDiagramDetailBackButton();

      const dialogChanged = dialogEl !== detailDialog;
      detailDialog = dialogEl || null;
      detailDialogContent = contentEl || null;
      detailDialogHeading = headingEl || null;
      detailDialogBackButton = backButtonEl || null;

      if (detailDialog && (dialogChanged || !detailDialogSetupComplete)) {
        const handleBackdropClick = event => {
          if (event && event.target === detailDialog) {
            closeDetailDialog();
          }
        };
        detailDialog.addEventListener('click', handleBackdropClick);
        detailDialog.addEventListener('cancel', event => {
          event.preventDefault();
          closeDetailDialog();
        });
        detailDialog.addEventListener('close', () => {
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
      const ownerDoc = detailDialog.ownerDocument || document;
      if (!ownerDoc) return;

      detailDialogContent.innerHTML = '';
      const wrapper = ownerDoc.createElement('div');
      wrapper.className = entry.className ? `diagram-popup ${entry.className}` : 'diagram-popup';
      wrapper.innerHTML = entry.content || '';
      detailDialogContent.appendChild(wrapper);

      const isCamera = Boolean(entry.className && entry.className.includes('diagram-popup--camera'));
      detailDialog.classList.toggle('diagram-detail-dialog--camera', isCamera);

      const headingText = entry.label || detailDialogDefaultHeading;
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
          detailDialogBackButton.focus({ preventScroll: true });
        } catch (focusError) {
          detailDialogBackButton.focus();
          void focusError;
        }
      }
    }

    function normalizeDiagramPositionsInput(positions) {
      if (!positions || typeof positions !== 'object') {
        return {};
      }
      const normalized = {};
      Object.entries(positions).forEach(([id, value]) => {
        if (!value || typeof value !== 'object') return;
        const x = Number(value.x);
        const y = Number(value.y);
        if (!Number.isFinite(x) || !Number.isFinite(y)) return;
        normalized[id] = { x, y };
      });
      return normalized;
    }

    function getDiagramManualPositions() {
      return normalizeDiagramPositionsInput(manualPositions);
    }

    function setManualDiagramPositions(positions, options = {}) {
      manualPositions = normalizeDiagramPositionsInput(positions);
      if (options && options.render === false) {
        return;
      }
      if (typeof renderSetupDiagram === 'function') {
        renderSetupDiagram();
      }
    }

    const diagramCssLight = `
    .node-box{fill:#f0f0f0;stroke:none;}
    .node-box.first-fiz{stroke:none;}
    .first-fiz-highlight{stroke:url(#firstFizGrad);stroke-width:1px;fill:none;}
    .node-icon{font-size:var(--font-size-diagram-icon, 24px);font-family:'UiconsThinStraightV2',system-ui,sans-serif;font-style:normal;}
    .node-icon[data-icon-font='essential']{font-family:'EssentialIconsV2',system-ui,sans-serif;}
    .conn{stroke:none;}
    .conn.red{fill:#d33;}
    .conn.blue{fill:#369;}
    .conn.green{fill:#090;}
    text{font-family:system-ui,sans-serif;}
    .edge-label{font-size:var(--font-size-diagram-label, 11px);}
    line{stroke:#333;stroke-width:2px;}
    path.edge-path{stroke:#333;stroke-width:2px;fill:none;}
    path.power{stroke:#d33;}
    path.video{stroke:#369;}
    path.fiz{stroke:#090;}
    .diagram-placeholder{font-style:italic;color:#666;margin:0;}
    `;
    const diagramCssDark = `
    .node-box{fill:#444;stroke:none;}
    .node-box.first-fiz{stroke:none;}
    .first-fiz-highlight{stroke:url(#firstFizGrad);}
    .node-icon{font-size:var(--font-size-diagram-icon, 24px);font-family:'UiconsThinStraightV2',system-ui,sans-serif;font-style:normal;}
    .node-icon[data-icon-font='essential']{font-family:'EssentialIconsV2',system-ui,sans-serif;}
    text{fill:#fff;font-family:system-ui,sans-serif;}
    .edge-label{font-size:var(--font-size-diagram-label, 11px);}
    line{stroke:#fff;}
    path.edge-path{stroke:#fff;}
    path.power{stroke:#ff6666;}
    path.video{stroke:#7ec8ff;}
    path.fiz{stroke:#6f6;}
    .conn.red{fill:#ff6666;}
    .conn.blue{fill:#7ec8ff;}
    .conn.green{fill:#6f6;}
    .diagram-placeholder{color:#bbb;}
    `;

    function getDiagramCss(includeDark = true) {
      return diagramCssLight + (includeDark ? `@media (prefers-color-scheme: dark){${diagramCssDark}}` : '');
    }

    const safeIconGlyph = (char, font) => {
      try {
        return iconGlyph(char, font);
      } catch (error) {
        void error;
      }
      return null;
    };

    const DIAGRAM_BATTERY_ICON = safeIconGlyph('\uE1A6');
    const DIAGRAM_CAMERA_ICON = safeIconGlyph('\uE333');
    const DIAGRAM_MONITOR_ICON = safeIconGlyph('\uEFFC');
    const DIAGRAM_VIEWFINDER_ICON = safeIconGlyph('\uE338');
    const DIAGRAM_VIDEO_ICON = safeIconGlyph('\uF42A');
    const DIAGRAM_WIRELESS_ICON = safeIconGlyph('\uF4AC');
    const DIAGRAM_MOTORS_ICON = safeIconGlyph('\uE8AF', ICON_FONT_KEYS.UICONS);
    const DIAGRAM_CONTROLLER_ICON = safeIconGlyph('\uE52A');
    const DIAGRAM_DISTANCE_ICON = safeIconGlyph('\uEFB9');
    const DIAGRAM_LENS_ICON = safeIconGlyph('\uE0A3', ICON_FONT_KEYS.UICONS);
    const DIAGRAM_POWER_OUTPUT_ICON = safeIconGlyph('\uE212');
    const DIAGRAM_POWER_INPUT_ICON = safeIconGlyph('\uEE71');
    const DIAGRAM_TIMECODE_ICON = safeIconGlyph('\uE46F');
    const DIAGRAM_AUDIO_IN_ICON = safeIconGlyph('\uE6B7');
    const DIAGRAM_AUDIO_OUT_ICON = safeIconGlyph('\uECB5');
    const DIAGRAM_AUDIO_IO_ICON = safeIconGlyph('\uF487');

    const diagramConnectorIcons = Object.freeze({
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
      powerSource: DIAGRAM_POWER_INPUT_ICON,
    });

    const diagramIcons = {
      battery: DIAGRAM_BATTERY_ICON,
      camera: DIAGRAM_CAMERA_ICON,
      monitor: DIAGRAM_MONITOR_ICON,
      viewfinder: DIAGRAM_VIEWFINDER_ICON,
      video: DIAGRAM_WIRELESS_ICON,
      motors: DIAGRAM_MOTORS_ICON,
      controllers: DIAGRAM_CONTROLLER_ICON,
      handle: DIAGRAM_CONTROLLER_ICON,
      distance: DIAGRAM_DISTANCE_ICON,
      lenses: DIAGRAM_LENS_ICON,
    };

    const overviewSectionIcons = {
      category_batteries: DIAGRAM_BATTERY_ICON,
      category_batteryHotswaps: DIAGRAM_BATTERY_ICON,
      category_cameras: DIAGRAM_CAMERA_ICON,
      category_lenses: DIAGRAM_LENS_ICON,
      category_viewfinders: DIAGRAM_VIEWFINDER_ICON,
      category_monitors: DIAGRAM_MONITOR_ICON,
      category_video: DIAGRAM_WIRELESS_ICON,
      category_fiz_motors: DIAGRAM_MOTORS_ICON,
      category_fiz_controllers: DIAGRAM_CONTROLLER_ICON,
      category_fiz_distance: DIAGRAM_DISTANCE_ICON,
    };

    function renderSetupDiagram() {
      const setupDiagramContainer = resolveSetupContainer();
      if (!setupDiagramContainer) return;

      const texts = resolveTexts();
      const currentLang = resolveCurrentLang();
      const devices = resolveDevices();
      const cameraSelect = resolveCameraSelect();
      const monitorSelect = resolveMonitorSelect();
      const videoSelect = resolveVideoSelect();
      const distanceSelect = resolveDistanceSelect();
      const batterySelect = resolveBatterySelect();
      const motorSelects = resolveMotorSelects();
      const controllerSelects = resolveControllerSelects();

      const defaultHeadingText = texts[currentLang]?.diagramDetailDefaultHeading
        || texts.en?.diagramDetailDefaultHeading
        || 'Diagram details';
      const backLabelText = texts[currentLang]?.diagramDetailBackLabel
        || texts.en?.diagramDetailBackLabel
        || 'Back';
      detailDialogDefaultHeading = defaultHeadingText;
      detailDialogBackLabel = backLabelText;
      ensureDetailDialogElements();

      const isTouchDevice = (navigator && Number.isFinite(navigator.maxTouchPoints) ? navigator.maxTouchPoints : 0) > 0;
      void isTouchDevice;

      const camName = cameraSelect ? cameraSelect.value : '';
      const cam = devices.cameras ? devices.cameras[camName] : undefined;
      const monitorName = monitorSelect ? monitorSelect.value : '';
      const monitor = devices.monitors ? devices.monitors[monitorName] : undefined;
      const videoName = videoSelect ? videoSelect.value : '';
      const video = devices.video ? devices.video[videoName] : undefined;
      const batteryName = batterySelect ? batterySelect.value : '';

      const distanceName = distanceSelect ? distanceSelect.value : '';

      let motors = motorSelects.map(sel => (sel ? sel.value : '')).filter(v => v && v !== 'None');
      motors.sort((a, b) => motorPriority(a) - motorPriority(b));
      const internalIdx = motors.findIndex(name => devices.fiz?.motors?.[name]?.internalController);
      const hasInternalMotor = internalIdx !== -1;
      if (hasInternalMotor && internalIdx > 0) {
        const [m] = motors.splice(internalIdx, 1);
        motors.unshift(m);
      }
      let controllers = controllerSelects.map(sel => (sel ? sel.value : '')).filter(v => v && v !== 'None');
      controllers.sort((a, b) => controllerPriority(a) - controllerPriority(b));

      const inlineControllers = controllers;

      const nodes = [];
      const pos = {};
      const nodeMap = {};
      const step = 300;
      const VIDEO_LABEL_SPACING = 10;
      const EDGE_LABEL_GAP = 12;
      const EDGE_LABEL_VERTICAL_GAP = 8;
      const EDGE_ROUTE_LABEL_GAP = 10;
      const baseY = 220;
      let x = 80;

      if (batteryName && batteryName !== 'None') {
        let batteryLabel = batteryName;
        const battMount = devices.batteries?.[batteryName]?.mount_type;
        if (cam && battMount && cam.power?.batteryPlateSupport?.some(bp => bp.type === battMount && bp.mount === 'native')) {
          batteryLabel += ` on native ${battMount} plate via Pins`;
        }
        pos.battery = { x, y: baseY, label: batteryLabel };
        nodes.push('battery');
        nodeMap.battery = { category: 'batteries', name: batteryName };
        x += step;
      }

      if (camName && camName !== 'None') {
        pos.camera = { x, y: baseY, label: camName };
        nodes.push('camera');
        nodeMap.camera = { category: 'cameras', name: camName };
        x += step;
      }

      const controllerIds = controllers.map((_, idx) => `controller${idx}`);
      const motorIds = motors.map((_, idx) => `motor${idx}`);

      const controllerNameMap = new Map();
      controllerIds.forEach((id, idx) => {
        controllerNameMap.set(id, inlineControllers[idx] || controllers[idx]);
      });
      const motorNameMap = new Map();
      motorIds.forEach((id, idx) => {
        motorNameMap.set(id, motors[idx]);
      });

      const hasMainCtrl = controllers.some(n => controllerPriority(n) === 0);
      let useMotorFirst = (!hasMainCtrl && hasInternalMotor)
        || (!controllerIds.length && motorIds.length && motorPriority(motors[0]) === 0);

      const addNode = (id, category, label) => {
        pos[id] = { x, y: baseY, label };
        nodes.push(id);
        nodeMap[id] = { category, name: label };
        x += step;
      };

      if (useMotorFirst && motorIds.length) {
        addNode(motorIds[0], 'fiz.motors', motors[0]);
        controllerIds.forEach((id, idx) => {
          addNode(id, 'fiz.controllers', inlineControllers[idx]);
        });
        motorIds.slice(1).forEach((id, idx) => {
          addNode(id, 'fiz.motors', motors[idx + 1]);
        });
      } else {
        controllerIds.forEach((id, idx) => {
          addNode(id, 'fiz.controllers', inlineControllers[idx]);
        });
        motorIds.forEach((id, idx) => {
          addNode(id, 'fiz.motors', motors[idx]);
        });
      }

      if (monitorName && monitorName !== 'None') {
        pos.monitor = { x: pos.camera ? pos.camera.x : 60, y: baseY - step, label: monitorName };
        nodes.push('monitor');
        nodeMap.monitor = { category: 'monitors', name: monitorName };
      }
      if (videoName && videoName !== 'None') {
        pos.video = { x: pos.camera ? pos.camera.x : 60, y: baseY + step, label: videoName };
        nodes.push('video');
        nodeMap.video = { category: 'video', name: videoName };
      }

      let inlineDistance = false;
      let dedicatedDistance = false;
      if (distanceName && distanceName !== 'None') {
        const attach = inlineControllers.length ? controllerIds[0] : motorIds[0];
        if (attach) {
          const arriDevices = [...inlineControllers, ...motors].some(n => isArri(n));
          const hasDedicatedPort = inlineControllers.some(n => /RIA-1/i.test(n) || /UMC-4/i.test(n));
          dedicatedDistance = hasDedicatedPort && arriDevices;
          inlineDistance = arriDevices && !hasDedicatedPort && inlineControllers.length;
          if (inlineDistance && motorIds.length) {
            const nextId = motorIds[0];
            pos.distance = { x: (pos[attach].x + pos[nextId].x) / 2, y: baseY - step, label: distanceName };
          } else {
            pos.distance = { x: pos[attach].x, y: baseY - step, label: distanceName };
          }
          nodes.push('distance');
          nodeMap.distance = { category: 'fiz.distance', name: distanceName };
        }
      }

      Object.keys(manualPositions).forEach(id => { if (!pos[id]) delete manualPositions[id]; });
      Object.entries(pos).forEach(([id, p]) => {
        if (manualPositions[id]) {
          p.x = manualPositions[id].x;
          p.y = manualPositions[id].y;
        }
      });

      const DEFAULT_NODE_H = 120;
      const DEFAULT_NODE_W = 120;
      const nodeHeights = {};
      const nodeWidths = {};
      const diagramLabelFontSize = 'var(--font-size-diagram-label, 11px)';
      const diagramTextFontSize = 'var(--font-size-diagram-text, 13px)';
      const DIAGRAM_LABEL_LINE_HEIGHT = 13;
      const DIAGRAM_ICON_TEXT_GAP = 8;
      const DEFAULT_DIAGRAM_ICON_SIZE = 24;

      function wrapLabel(text, maxLen = 16) {
        if (!text) return [];
        const str = String(text);
        if (str.length <= maxLen) return [str];
        const words = str.split(/\s+/);
        const lines = [];
        let current = '';
        words.forEach(word => {
          const tentative = current ? `${current} ${word}` : word;
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

      nodes.forEach(id => {
        const label = pos[id].label || id;
        const lines = wrapLabel(label);
        const hasIcon = diagramIcons[id] || id.startsWith('controller') || id.startsWith('motor');
        nodeHeights[id] = Math.max(
          DEFAULT_NODE_H,
          lines.length * DIAGRAM_LABEL_LINE_HEIGHT + (hasIcon ? 30 : 20)
        );
        const longest = lines.reduce((m, l) => Math.max(m, l.length), 0);
        nodeWidths[id] = Math.max(DEFAULT_NODE_W, longest * 9 + 20);
      });
      const NODE_W = Math.max(...Object.values(nodeWidths), DEFAULT_NODE_W);
      const NODE_H = Math.max(...Object.values(nodeHeights), DEFAULT_NODE_H);
      const getNodeHeight = id => nodeHeights[id] || NODE_H;

      let viewWidth;

      let chain = [];
      const edges = [];
      const usedConns = {};
      const markUsed = (id, side) => { usedConns[`${id}|${side}`] = true; };
      const isUsed = (id, side) => usedConns[`${id}|${side}`];
      const connectorPos = (id, side) => {
        const p = pos[id];
        if (!p) return { x: 0, y: 0 };
        const h = getNodeHeight(id);
        if (side === 'top') return { x: p.x, y: p.y - h / 2 };
        if (side === 'bottom') return { x: p.x, y: p.y + h / 2 };
        if (side === 'bottom-left') return { x: p.x - NODE_W / 2 + NODE_W / 3, y: p.y + h / 2 };
        if (side === 'bottom-right') return { x: p.x + NODE_W / 2 - NODE_W / 3, y: p.y + h / 2 };
        if (side === 'left') return { x: p.x - NODE_W / 2, y: p.y };
        if (side === 'right') return { x: p.x + NODE_W / 2, y: p.y };
        return { x: p.x, y: p.y };
      };
      const connectorsFor = id => {
        const h = getNodeHeight(id);
        const base = [
          { side: 'left', color: 'red' },
          { side: 'right', color: 'red' },
          { side: 'top', color: 'blue' },
          { side: 'bottom', color: 'green' }
        ];
        if (h > NODE_H) {
          base.push({ side: 'bottom-left', color: 'green' });
          base.push({ side: 'bottom-right', color: 'green' });
        }
        return base;
      };
      const closestConnectorPair = (idA, idB, used) => {
        const aConns = connectorsFor(idA);
        const bConns = connectorsFor(idB);
        let best = null;
        let bestDist = Infinity;
        aConns.forEach(ac => {
          if (used[`${idA}|${ac.side}`]) return;
          const ap = connectorPos(idA, ac.side);
          bConns.forEach(bc => {
            if (ac.color !== bc.color) return;
            if (used[`${idB}|${bc.side}`]) return;
            const bp = connectorPos(idB, bc.side);
            const d = Math.hypot(ap.x - bp.x, ap.y - bp.y);
            if (d < bestDist) {
              bestDist = d;
              best = { fromSide: ac.side, toSide: bc.side };
            }
          });
        });
        return best;
      };
      const pushEdge = (edge, type) => {
        if (!edge.fromSide || !edge.toSide) {
          const pair = closestConnectorPair(edge.from, edge.to, usedConns);
          if (pair) {
            if (!edge.fromSide) edge.fromSide = pair.fromSide;
            if (!edge.toSide) edge.toSide = pair.toSide;
          }
        } else if (isUsed(edge.from, edge.fromSide) || isUsed(edge.to, edge.toSide)) {
          return;
        }
        markUsed(edge.from, edge.fromSide);
        markUsed(edge.to, edge.toSide);
        edges.push({ ...edge, type });
      };
      const battMount = devices.batteries?.[batteryName]?.mount_type;
      if (cam && batteryName && batteryName !== 'None') {
        const plateType = getSelectedPlate();
        const nativePlate = plateType && isSelectedPlateNative(camName);
        const camPort = firstPowerInputType(cam);
        const inLabel = camPort || plateType;
        const label = nativePlate ? '' : formatConnLabel(battMount, inLabel);
        pushEdge({ from: 'battery', to: 'camera', label, fromSide: 'right', toSide: 'left' }, 'power');
      }
      if (monitor && firstPowerInputType(monitor)) {
        const mPort = firstPowerInputType(monitor);
        if (batteryName && batteryName !== 'None') {
          pushEdge({ from: 'battery', to: 'monitor', label: formatConnLabel(battMount, mPort), fromSide: 'top', toSide: 'left' }, 'power');
        }
      }
      if (video && firstPowerInputType(video)) {
        const pPort = firstPowerInputType(video);
        if (batteryName && batteryName !== 'None') {
          pushEdge({ from: 'battery', to: 'video', label: formatConnLabel(battMount, pPort), fromSide: 'bottom', toSide: 'left' }, 'power');
        }
      }
      if (cam && cam.videoOutputs?.length) {
        const camOut = cam.videoOutputs[0].type;
        const monInObj = monitor && (monitor.video?.inputs?.[0] || monitor.videoInputs?.[0]);
        const vidInObj = video && (video.videoInputs?.[0] || (video.video ? video.video.inputs[0] : null));
        if (monitor && monInObj) {
          const monIn = monInObj.portType || monInObj.type || monInObj;
          pushEdge({ from: 'camera', to: 'monitor', label: connectionLabel(camOut, monIn), fromSide: 'top', toSide: 'bottom', labelSpacing: VIDEO_LABEL_SPACING }, 'video');
        }
        if (video && vidInObj) {
          const vidIn = vidInObj.portType || vidInObj.type || vidInObj;
          pushEdge({ from: 'camera', to: 'video', label: connectionLabel(camOut, vidIn), fromSide: 'bottom', toSide: 'top', labelSpacing: VIDEO_LABEL_SPACING }, 'video');
        }
      }
      useMotorFirst = (!hasMainCtrl && hasInternalMotor)
        || (!controllerIds.length && motorIds.length && motorPriority(motors[0]) === 0);
      const distanceSelected = distanceName && distanceName !== 'None';
      const distanceInChain = distanceSelected && !dedicatedDistance;

      let firstController = false;
      let firstMotor = false;

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
        const references = [];
        const distanceIndex = chain.indexOf('distance');
        if (distanceIndex !== -1) {
          const prevId = distanceIndex > 0 ? chain[distanceIndex - 1] : null;
          const nextId = distanceIndex < chain.length - 1 ? chain[distanceIndex + 1] : null;
          if (prevId && pos[prevId]) references.push(pos[prevId]);
          if (nextId && pos[nextId]) references.push(pos[nextId]);
        }

        if (references.length < 2) {
          const fallbackIds = chain.filter(id => id !== 'distance').slice(0, 2);
          fallbackIds.forEach(id => {
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
        let first = chain[0];
        if (first === 'distance' && chain.length > 1 && (controllerIds.length || hasInternalMotor)) {
          first = chain[1];
        }
        let firstName = null;
        if (first.startsWith('controller')) {
          firstName = controllerNameMap.get(first);
        } else if (first.startsWith('motor')) {
          firstName = motorNameMap.get(first);
        }
        const port = first === 'distance' ? 'LBUS' : controllerCamPort(firstName);
        const camPort = cameraFizPort(camName, port, firstName);
        pushEdge({ from: 'camera', to: first, label: formatConnLabel(camPort, port), noArrow: true }, 'fiz');
      } else if (motorIds.length && cam) {
        const camPort = cameraFizPort(camName, motorFizPort(motors[0]), motors[0]);
        pushEdge({ from: 'camera', to: motorIds[0], label: formatConnLabel(camPort, motorFizPort(motors[0])), noArrow: true }, 'fiz');
      }

      for (let i = 0; i < chain.length - 1; i++) {
        const a = chain[i];
        const b = chain[i + 1];
        let fromName = null; let toName = null;
        if (a.startsWith('controller')) fromName = controllerNameMap.get(a);
        else if (a.startsWith('motor')) fromName = motorNameMap.get(a);
        if (b.startsWith('controller')) toName = controllerNameMap.get(b);
        else if (b.startsWith('motor')) toName = motorNameMap.get(b);
        pushEdge({ from: a, to: b, label: formatConnLabel(fizPort(fromName), fizPort(toName)), noArrow: true }, 'fiz');
      }

      if (dedicatedDistance && controllerIds.length && distanceSelected) {
        const ctrlName = inlineControllers[0] || controllers[0];
        const distPort = controllerDistancePort(ctrlName);
        const portLabel = formatConnLabel(fizPort(ctrlName), distPort);
        pushEdge({ from: controllerIds[0], to: 'distance', label: portLabel, noArrow: true, toSide: 'bottom-right' }, 'fiz');
      }

      const fizList = [];
      controllerIds.forEach((id, idx) => {
        fizList.push({ id, name: inlineControllers[idx] || controllers[idx] });
      });
      motorIds.forEach((id, idx) => {
        fizList.push({ id, name: motors[idx] });
      });

      const isMainCtrl = name => /RIA-1/i.test(name) || /UMC-4/i.test(name) || /cforce.*rf/i.test(name);
      let powerTarget = null;
      const main = fizList.find(d => isMainCtrl(d.name));
      if (main) {
        powerTarget = main;
      } else {
        powerTarget = fizList.find(d => fizNeedsPower(d.name));
      }

      if (powerTarget && fizNeedsPower(powerTarget.name)) {
        const { id: fizId, name } = powerTarget;
        const powerSrc = batteryName && batteryName !== 'None' ? 'battery' : null;
        const label = formatConnLabel('D-Tap', fizPowerPort(name));
        const skipBatt = isArri(camName) && isArriOrCmotion(name);
        if (powerSrc && !skipBatt) {
          pushEdge({
            from: powerSrc,
            to: fizId,
            label,
            fromSide: 'bottom-left',
            toSide: 'bottom',
            route: 'down-right-up'
          }, 'power');
        }
      }
      if (nodes.length === 0) {
        setupDiagramContainer.innerHTML = `<p class="diagram-placeholder">${texts[currentLang]?.setupDiagramPlaceholder || texts.en?.setupDiagramPlaceholder || ''}</p>`;
        return;
      }

      let xs = Object.values(pos).map(p => p.x);
      let minX = Math.min(...xs);
      let maxX = Math.max(...xs);
      const contentWidth = maxX - minX;
      const baseViewWidth = Math.max(500, contentWidth + NODE_W);
      if (Object.keys(manualPositions).length === 0) {
        const shiftX = baseViewWidth / 2 - (minX + maxX) / 2;
        Object.values(pos).forEach(p => { p.x += shiftX; });
        xs = Object.values(pos).map(p => p.x);
        minX = Math.min(...xs);
        maxX = Math.max(...xs);
      }

      const ys = Object.values(pos).map(p => p.y);
      const minY = Math.min(...ys);
      const maxY = Math.max(...ys);
      const HORIZONTAL_MARGIN = Math.max(40, NODE_W * 0.25);
      const TOP_MARGIN = Math.max(40, NODE_H * 0.25);
      const BOTTOM_MARGIN = Math.max(120, NODE_H * 0.4);
      const minBoundX = minX - NODE_W / 2 - HORIZONTAL_MARGIN;
      const maxBoundX = maxX + NODE_W / 2 + HORIZONTAL_MARGIN;
      const minBoundY = minY - NODE_H / 2 - TOP_MARGIN;
      const maxBoundY = maxY + NODE_H / 2 + BOTTOM_MARGIN;
      const viewBoxX = Math.floor(Math.min(0, minBoundX));
      const viewBoxY = Math.floor(minBoundY);
      viewWidth = Math.max(baseViewWidth, Math.ceil(maxBoundX - viewBoxX));
      const baseViewHeight = (maxY - minY) + NODE_H + TOP_MARGIN + BOTTOM_MARGIN;
      const viewHeight = Math.max(Math.ceil(baseViewHeight), Math.ceil(maxBoundY - viewBoxY));

      function computePath(fromId, toId, labelSpacing = 0, opts = {}) {
        const labelLineCount = Math.max(0, opts.labelLineCount || 0);
        const multilineOffset = labelLineCount > 1
          ? (labelLineCount - 1) * DIAGRAM_LABEL_LINE_HEIGHT
          : 0;
        const from = connectorPos(fromId, opts.fromSide);
        const to = connectorPos(toId, opts.toSide);
        let path; let lx; let ly; let angle = 0;

        if (opts.route === 'down-right-up') {
          const bottomY = maxY + NODE_H;
          path = `M ${from.x} ${from.y} V ${bottomY} H ${to.x} V ${to.y}`;
          lx = (from.x + to.x) / 2;
          ly = bottomY - EDGE_ROUTE_LABEL_GAP - labelSpacing - multilineOffset;
        } else {
          path = `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
          const dx = to.x - from.x;
          const dy = to.y - from.y;
          angle = Math.atan2(dy, dx) * 180 / Math.PI;
          const midX = (from.x + to.x) / 2;
          const midY = (from.y + to.y) / 2;
          const len = Math.hypot(dx, dy) || 1;
          const baseGap = Math.abs(dx) < Math.abs(dy) ? EDGE_LABEL_VERTICAL_GAP : EDGE_LABEL_GAP;
          const off = baseGap + labelSpacing + multilineOffset;
          const perpX = (dy / len) * off;
          const perpY = (-dx / len) * off;
          lx = midX + perpX;
          ly = midY + perpY;
        }

        return { path, labelX: lx, labelY: ly, angle };
      }

      const EDGE_LABEL_WRAP = 18;

      const defs = `
        <defs>
          <linearGradient id="firstFizGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fff" stop-opacity="0.9"></stop>
            <stop offset="100%" stop-color="#fff" stop-opacity="0"></stop>
          </linearGradient>
        </defs>
      `;

      let svg = `<svg viewBox="${viewBoxX} ${viewBoxY} ${viewWidth} ${viewHeight}" role="group" aria-labelledby="diagramDesc">${defs}`;
      svg += '<g id="diagramRoot">';

      nodes.forEach(id => {
        const p = pos[id];
        if (!p) return;
        const h = getNodeHeight(id);
        const nodeCls = id === 'motor0' ? 'diagram-node' : 'diagram-node';
        const rectCls = id === 'motor0' ? 'node-box' : 'node-box';
        svg += `<g class="${nodeCls}" data-node="${id}">`;
        svg += `<rect class="${rectCls}" x="${p.x - NODE_W/2}" y="${p.y - h/2}" width="${NODE_W}" height="${h}" rx="4" ry="4" />`;

        const conns = connectorsFor(id);
        conns.forEach(c => {
          const { x: cx, y: cy } = connectorPos(id, c.side);
          svg += `<circle class="conn ${c.color}" cx="${cx}" cy="${cy}" r="4" />`;
        });

        let icon = diagramIcons[id];
        if (!icon) {
          if (id.startsWith('motor')) {
            icon = diagramIcons.motors;
          } else if (id.startsWith('controller')) {
            const name = (nodeMap[id]?.name || '').toLowerCase();
            if (/handle|grip/.test(name)) icon = diagramIcons.handle;
            else icon = diagramIcons.controllers;
          } else if (id === 'distance') {
            icon = diagramIcons.distance;
          }
        }

        const lines = wrapLabel(p.label || id);
        const resolvedIcon = icon ? resolveIconGlyph(icon) : null;
        const hasIconGlyph = Boolean(resolvedIcon && (resolvedIcon.markup || resolvedIcon.char));
        const iconSize = hasIconGlyph && Number.isFinite(resolvedIcon.size)
          ? resolvedIcon.size
          : DEFAULT_DIAGRAM_ICON_SIZE;
        const iconHeight = hasIconGlyph ? iconSize : 0;
        const textLineCount = lines.length;
        const textHeight = textLineCount ? textLineCount * DIAGRAM_LABEL_LINE_HEIGHT : 0;
        const iconGap = hasIconGlyph && textLineCount ? DIAGRAM_ICON_TEXT_GAP : 0;
        const contentHeight = iconHeight + iconGap + textHeight;
        const contentTop = p.y - contentHeight / 2;
        const centerX = formatSvgCoordinate(p.x);

        if (hasIconGlyph) {
          const iconCenterY = contentTop + iconHeight / 2;
          if (resolvedIcon.markup && positionSvgMarkup) {
            const positioned = positionSvgMarkup(
              ensureSvgHasAriaHidden(resolvedIcon.markup),
              p.x,
              iconCenterY,
              iconSize
            );
            if (positioned && positioned.markup) {
              const wrapperClasses = ['node-icon-svg'];
              if (resolvedIcon.className) wrapperClasses.push(resolvedIcon.className);
              svg += `<g class="${wrapperClasses.join(' ')}" transform="translate(${positioned.x}, ${positioned.y})">${positioned.markup}</g>`;
            }
          } else if (resolvedIcon.char) {
            const fontAttr = resolvedIcon.font ? ` data-icon-font="${resolvedIcon.font}"` : '';
            svg += `<text class="node-icon"${fontAttr} x="${centerX}" y="${formatSvgCoordinate(iconCenterY)}" text-anchor="middle" dominant-baseline="middle">${resolvedIcon.char}</text>`;
          }
        }

        if (textLineCount) {
          const textTop = contentTop + iconHeight + iconGap;
          const textY = formatSvgCoordinate(textTop);
          const fontSize = hasIconGlyph ? diagramLabelFontSize : diagramTextFontSize;
          svg += `<text x="${centerX}" y="${textY}" text-anchor="middle" dominant-baseline="hanging" style="font-size: ${fontSize};">`;
          lines.forEach((line, i) => {
            const dyAttr = i === 0 ? '' : ` dy="${DIAGRAM_LABEL_LINE_HEIGHT}"`;
            svg += `<tspan x="${centerX}"${dyAttr}>${line}</tspan>`;
          });
          svg += `</text>`;
        }
        svg += `</g>`;
      });

      edges.forEach(edge => {
        const lines = edge.label ? wrapLabel(edge.label, EDGE_LABEL_WRAP) : [];
        const { path, labelX, labelY, angle } = computePath(edge.from, edge.to, edge.labelSpacing, {
          ...edge,
          labelLineCount: lines.length,
        });
        svg += `<path class="edge-path ${edge.type}" d="${path}" />`;
        if (lines.length) {
          const transform = Math.abs(angle) > 90
            ? `rotate(${angle + 180} ${labelX} ${labelY})`
            : `rotate(${angle} ${labelX} ${labelY})`;
          const labelXCoord = formatSvgCoordinate(labelX);
          const labelYCoord = formatSvgCoordinate(labelY);
          svg += `<text class="edge-label" x="${labelXCoord}" y="${labelYCoord}" transform="${transform}" text-anchor="middle">`;
          lines.forEach((line, idx) => {
            const dyAttr = idx === 0 ? '' : ` dy="${DIAGRAM_LABEL_LINE_HEIGHT}"`;
            svg += `<tspan x="${labelXCoord}"${dyAttr}>${line}</tspan>`;
          });
          svg += '</text>';
        }
      });

      svg += '</g></svg>';

      let popup = document ? document.getElementById('diagramPopup') : null;
      if (!popup && document) {
        popup = document.createElement('div');
        popup.id = 'diagramPopup';
        popup.className = 'diagram-popup';
      }
      setupDiagramContainer.innerHTML = '';
      if (popup) setupDiagramContainer.appendChild(popup);
      setupDiagramContainer.insertAdjacentHTML('beforeend', svg);

      const popupEntries = {};
      const safeSummaryFn = getSafeGenerateConnectorSummary();
      Object.entries(nodeMap).forEach(([nodeId, meta]) => {
        const label = pos[nodeId]?.label || meta?.name || nodeId;
        const safeLabel = escapeHtml(label);
        const className = popupClassForCategory(meta?.category);
        let summaryHtml = '';
        if (typeof safeSummaryFn === 'function') {
          const deviceInfo = resolveDeviceInfo(devices, meta?.category, meta?.name);
          if (deviceInfo) {
            try {
              summaryHtml = safeSummaryFn(deviceInfo) || '';
            } catch (summaryError) {
              void summaryError;
            }
          }
        }
        let content = `<div class="diagram-popup-heading"><strong>${safeLabel}</strong></div>`;
        if (summaryHtml) {
          content += summaryHtml;
        } else {
          content += `<p>${safeLabel}</p>`;
        }
        popupEntries[nodeId] = {
          className,
          content,
          label: safeLabel,
        };
      });

      lastPopupEntries = popupEntries;

      const svgEl = setupDiagramContainer.querySelector('svg');
      if (!svgEl) return;

      const measureEl = resolveDiagramHint();
      if (measureEl) {
        const containerRect = setupDiagramContainer.getBoundingClientRect();
        const parentRect = setupDiagramContainer.parentElement?.getBoundingClientRect();
        const containerWidth = containerRect?.width || setupDiagramContainer.clientWidth || 0;
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
      const setupDiagramContainer = resolveSetupContainer();
      if (!setupDiagramContainer) return;
      const svg = setupDiagramContainer.querySelector('svg');
      if (!svg) return;

      const texts = resolveTexts();
      const currentLang = resolveCurrentLang();
      const hoverNoticeText = texts[currentLang]?.diagramHoverNotice
        || texts.en?.diagramHoverNotice
        || 'Click me for more information!';
      detailDialogDefaultHeading = texts[currentLang]?.diagramDetailDefaultHeading
        || texts.en?.diagramDetailDefaultHeading
        || detailDialogDefaultHeading;
      detailDialogBackLabel = texts[currentLang]?.diagramDetailBackLabel
        || texts.en?.diagramDetailBackLabel
        || detailDialogBackLabel;
      ensureDetailDialogElements();

      const popup = setupDiagramContainer.querySelector('#diagramPopup');
      let activePopupNode = null;
      let activePopupEntry = null;
      const hidePopup = () => {
        if (!popup) return;
        popup.style.display = 'none';
        popup.setAttribute('hidden', '');
        popup.innerHTML = '';
        popup.dataset.columns = '1';
        popup.style.removeProperty('--diagram-popup-dynamic-width');
        popup.className = 'diagram-popup';
        popup.removeAttribute('aria-label');
        activePopupNode = null;
        activePopupEntry = null;
      };
      hidePopup();

      if (cleanupDiagramInteractions) cleanupDiagramInteractions();

      const root = svg.querySelector('#diagramRoot') || svg;
      const isTouch = (navigator && Number.isFinite(navigator.maxTouchPoints) ? navigator.maxTouchPoints : 0) > 0;
      const MAX_SCALE = isTouch ? Infinity : 3;
      const BASE_MIN_SCALE = isTouch ? 0.55 : 0.6;
      const MIN_AUTO_SCALE = isTouch ? 0.4 : 0.35;
      const dataScaleRaw = parseFloat(setupDiagramContainer.dataset.initialScale || '');
      const fallbackScale = isTouch ? 0.95 : 0.85;
      const initialScaleRaw = Number.isFinite(dataScaleRaw) && dataScaleRaw > 0 ? dataScaleRaw : fallbackScale;
      const MIN_SCALE = Math.max(MIN_AUTO_SCALE, Math.min(BASE_MIN_SCALE, initialScaleRaw));
      const clampScale = value => {
        if (!Number.isFinite(value) || value <= 0) return MIN_SCALE;
        if (value > MAX_SCALE) return MAX_SCALE;
        if (value < MIN_SCALE) return MIN_SCALE;
        return value;
      };
      const INITIAL_SCALE = clampScale(initialScaleRaw);
      let initialPan = { x: 0, y: 0 };
      if (setupDiagramContainer.dataset.initialPan) {
        try {
          const parsed = JSON.parse(setupDiagramContainer.dataset.initialPan);
          if (parsed && Number.isFinite(parsed.x) && Number.isFinite(parsed.y)) {
            initialPan = { x: parsed.x, y: parsed.y };
          }
        } catch (err) {
          void err;
        }
      }
      let pan = { ...initialPan };
      let scale = INITIAL_SCALE;
      let panning = false;
      let panStart = { ...pan };
      let panPointerStart = null;
      const getPos = e => {
        if (e.touches && e.touches[0]) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
        if (e.changedTouches && e.changedTouches[0]) return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
        return { x: e.clientX, y: e.clientY };
      };
      const getMetrics = () => {
        const rect = typeof svg.getBoundingClientRect === 'function' ? svg.getBoundingClientRect() : null;
        const viewBox = svg.viewBox?.baseVal;
        const viewBoxWidth = viewBox && Number.isFinite(viewBox.width) && viewBox.width > 0
          ? viewBox.width
          : (svg.width?.baseVal?.value || rect?.width || 1);
        const viewBoxHeight = viewBox && Number.isFinite(viewBox.height) && viewBox.height > 0
          ? viewBox.height
          : (svg.height?.baseVal?.value || rect?.height || 1);
        const rectWidth = rect && Number.isFinite(rect.width) && rect.width > 0 ? rect.width : viewBoxWidth;
        const rectHeight = rect && Number.isFinite(rect.height) && rect.height > 0 ? rect.height : viewBoxHeight;
        const viewPerPxX = rectWidth > 0 ? viewBoxWidth / rectWidth : 1;
        const viewPerPxY = rectHeight > 0 ? viewBoxHeight / rectHeight : 1;
        return { rect, viewPerPxX, viewPerPxY };
      };
      const convertPointerDeltaToView = (dxPx, dyPx) => {
        const { viewPerPxX, viewPerPxY } = getMetrics();
        return {
          x: (Number.isFinite(dxPx) ? dxPx : 0) * viewPerPxX / (scale || 1),
          y: (Number.isFinite(dyPx) ? dyPx : 0) * viewPerPxY / (scale || 1)
        };
      };
      const apply = () => {
        scale = clampScale(scale);
        root.setAttribute('transform', `translate(${pan.x},${pan.y}) scale(${scale})`);
      };
      const zoomWithCenter = factor => {
        const currentScale = scale;
        if (!Number.isFinite(currentScale) || currentScale <= 0) return;
        const targetScale = clampScale(currentScale * factor);
        if (!Number.isFinite(targetScale) || targetScale <= 0 || targetScale === currentScale) {
          scale = targetScale;
          apply();
          return;
        }
        const { rect, viewPerPxX, viewPerPxY } = getMetrics();
        if (rect && Number.isFinite(rect.width) && Number.isFinite(rect.height) && rect.width > 0 && rect.height > 0) {
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const inverseCurrent = 1 / currentScale;
          const inverseTarget = 1 / targetScale;
          pan.x += centerX * viewPerPxX * (inverseTarget - inverseCurrent);
          pan.y += centerY * viewPerPxY * (inverseTarget - inverseCurrent);
        }
        scale = targetScale;
        apply();
      };
      const zoomInBtn = resolveZoomInButton();
      if (zoomInBtn) {
        zoomInBtn.onclick = () => { zoomWithCenter(1.1); };
      }
      const zoomOutBtn = resolveZoomOutButton();
      if (zoomOutBtn) {
        zoomOutBtn.onclick = () => { zoomWithCenter(0.9); };
      }
      const resetViewBtn = resolveResetButton();
      if (resetViewBtn) {
        resetViewBtn.onclick = () => {
          pan = { ...initialPan };
          scale = INITIAL_SCALE;
          apply();
          manualPositions = {};
          renderSetupDiagram();
          if (scheduleProjectAutoSave) scheduleProjectAutoSave();
          else if (saveCurrentSession) saveCurrentSession();
          if (checkSetupChanged) checkSetupChanged();
        };
      }
      const onSvgMouseDown = e => {
        if (e.target.closest('.diagram-node')) return;
        const pos = getPos(e);
        panning = true;
        panPointerStart = pos;
        panStart = { ...pan };
        if (e.touches) e.preventDefault();
        hidePopup();
      };
      const onPanMove = e => {
        if (!panning || !panPointerStart) return;
        const pos = getPos(e);
        const delta = convertPointerDeltaToView(pos.x - panPointerStart.x, pos.y - panPointerStart.y);
        pan.x = panStart.x + delta.x;
        pan.y = panStart.y + delta.y;
        apply();
        if (e.touches) e.preventDefault();
      };
      const stopPanning = () => {
        panning = false;
        panPointerStart = null;
      };

      const DRAG_HOLD_DELAY = 140;
      const DRAG_MOVE_THRESHOLD = 4;
      const DOUBLE_TAP_DELAY = 350;
      const DOUBLE_TAP_DISTANCE = 30;
      let dragId = null;
      let dragPointerStart = null;
      let dragNode = null;
      let dragStartPosition = null;
      let dragMovedDuringInteraction = false;
      let dragActivationTimer = null;
      let pendingDragInfo = null;
      let dragActive = false;
      let lastTapInfo = null;
      const clearPendingDrag = () => {
        if (dragActivationTimer) {
          clearTimeout(dragActivationTimer);
          dragActivationTimer = null;
        }
        pendingDragInfo = null;
      };
      const startDragSession = () => {
        if (!pendingDragInfo) return false;
        const { node, pointer } = pendingDragInfo;
        if (!node) {
          clearPendingDrag();
          return false;
        }
        const nodeId = node.getAttribute('data-node');
        if (!nodeId) {
          clearPendingDrag();
          return false;
        }
        const start = lastDiagramPositions[nodeId];
        if (!start) {
          clearPendingDrag();
          return false;
        }
        dragId = nodeId;
        dragNode = node;
        dragPointerStart = pointer;
        dragStartPosition = { x: start.x, y: start.y };
        dragMovedDuringInteraction = false;
        dragActive = true;
        clearPendingDrag();
        return true;
      };
      const onDragStart = e => {
        const node = e.target.closest('.diagram-node');
        if (!node) return;
        const pointer = getPos(e);
        pendingDragInfo = {
          node,
          pointer,
          time: Date.now(),
        };
        hidePopup();
        dragMovedDuringInteraction = false;
        dragActive = false;
        if (dragActivationTimer) {
          clearTimeout(dragActivationTimer);
        }
        dragActivationTimer = setTimeout(() => {
          startDragSession();
        }, DRAG_HOLD_DELAY);
        e.stopPropagation();
      };
      const ensureDragSession = () => {
        if (dragActive) return true;
        return startDragSession();
      };
      const onDragMove = e => {
        if (pendingDragInfo && !dragActive) {
          const pos = getPos(e);
          const dx = Math.abs(pos.x - pendingDragInfo.pointer.x);
          const dy = Math.abs(pos.y - pendingDragInfo.pointer.y);
          if (dx > DRAG_MOVE_THRESHOLD || dy > DRAG_MOVE_THRESHOLD) {
            startDragSession();
          }
        }
        if (!ensureDragSession() || !dragPointerStart || !dragStartPosition) return;
        const pos = getPos(e);
        const delta = convertPointerDeltaToView(pos.x - dragPointerStart.x, pos.y - dragPointerStart.y);
        const dx = delta.x;
        const dy = delta.y;
        if (!dragMovedDuringInteraction && (Math.abs(dx) > 2 || Math.abs(dy) > 2)) {
          dragMovedDuringInteraction = true;
        }
        let newX = dragStartPosition.x + dx;
        let newY = dragStartPosition.y + dy;
        if (getCurrentGridSnap()) {
          const g = 20;
          newX = Math.round(newX / g) * g;
          newY = Math.round(newY / g) * g;
        }
        const tx = newX - dragStartPosition.x;
        const ty = newY - dragStartPosition.y;
        if (dragNode) dragNode.setAttribute('transform', `translate(${tx},${ty})`);
        if (dragActive && e.touches) e.preventDefault();
      };
      const onDragEnd = e => {
        if (!dragActive || !dragId || !dragPointerStart || !dragStartPosition) {
          clearPendingDrag();
          dragActive = false;
          dragId = null;
          dragNode = null;
          dragPointerStart = null;
          dragStartPosition = null;
          return;
        }
        const pos = getPos(e);
        const delta = convertPointerDeltaToView(pos.x - dragPointerStart.x, pos.y - dragPointerStart.y);
        let newX = dragStartPosition.x + delta.x;
        let newY = dragStartPosition.y + delta.y;
        if (getCurrentGridSnap()) {
          const g = 20;
          newX = Math.round(newX / g) * g;
          newY = Math.round(newY / g) * g;
        }
        manualPositions[dragId] = { x: newX, y: newY };
        clearPendingDrag();
        dragId = null;
        dragNode = null;
        dragPointerStart = null;
        dragStartPosition = null;
        dragActive = false;
        dragMovedDuringInteraction = false;
        renderSetupDiagram();
        if (scheduleProjectAutoSave) scheduleProjectAutoSave();
        else if (saveCurrentSession) saveCurrentSession();
        if (checkSetupChanged) checkSetupChanged();
        if (e.touches) e.preventDefault();
      };

      const onNodeTouchEnd = e => {
        const node = e.target.closest('.diagram-node');
        if (!node) {
          lastTapInfo = null;
          return;
        }
        const nodeId = node.getAttribute('data-node');
        if (!nodeId) {
          lastTapInfo = null;
          return;
        }
        const now = Date.now();
        const pos = getPos(e);
        if (lastTapInfo
          && lastTapInfo.id === nodeId
          && now - lastTapInfo.time <= DOUBLE_TAP_DELAY
          && Math.abs(pos.x - lastTapInfo.pos.x) <= DOUBLE_TAP_DISTANCE
          && Math.abs(pos.y - lastTapInfo.pos.y) <= DOUBLE_TAP_DISTANCE) {
          const entry = lastPopupEntries[nodeId];
          if (entry) {
            showEntryPopupForNode(node, entry);
            if (typeof e.preventDefault === 'function') e.preventDefault();
          }
          lastTapInfo = null;
          return;
        }
        lastTapInfo = { id: nodeId, pos, time: now };
        showHoverNoticeForNode(node);
      };

      const adjustPopupLayout = (entry, viewportWidth, viewportHeight, margin) => {
        if (!popup) return;
        popup.dataset.columns = '1';
        popup.style.removeProperty('--diagram-popup-dynamic-width');
        const isCameraPopup = (entry && typeof entry.className === 'string' && entry.className.includes('diagram-popup--camera'))
          || popup.classList.contains('diagram-popup--camera');
        if (!isCameraPopup) return;
        if (!Number.isFinite(viewportHeight) || viewportHeight <= margin * 2) return;
        const availableHeight = viewportHeight - margin * 2;
        if (availableHeight <= 0) return;
        const currentHeight = popup.scrollHeight;
        if (!Number.isFinite(currentHeight) || currentHeight <= availableHeight) return;
        const maxWidth = Number.isFinite(viewportWidth) && viewportWidth > margin * 2
          ? Math.max(260, viewportWidth - margin * 2)
          : Infinity;
        const baseWidth = 520;
        const widthStep = 220;
        const minColumnWidth = 220;
        let appliedColumns = 1;
        let appliedWidth = baseWidth;
        for (let columns = 2; columns <= 4; columns += 1) {
          const candidateWidth = Math.min(maxWidth, baseWidth + (columns - 1) * widthStep);
          if (candidateWidth < columns * minColumnWidth) {
            continue;
          }
          popup.style.setProperty('--diagram-popup-dynamic-width', `${candidateWidth}px`);
          popup.dataset.columns = String(columns);
          void popup.offsetHeight;
          const updatedHeight = popup.scrollHeight;
          appliedColumns = columns;
          appliedWidth = candidateWidth;
          if (Number.isFinite(updatedHeight) && updatedHeight <= availableHeight) {
            break;
          }
        }
        if (appliedColumns > 1) {
          popup.dataset.columns = String(appliedColumns);
          popup.style.setProperty('--diagram-popup-dynamic-width', `${appliedWidth}px`);
          void popup.offsetHeight;
        } else {
          popup.dataset.columns = '1';
          popup.style.removeProperty('--diagram-popup-dynamic-width');
          void popup.offsetHeight;
        }
      };
      const positionPopup = (nodeEl, entry) => {
        if (!popup || !nodeEl) return;
        const rect = typeof nodeEl.getBoundingClientRect === 'function' ? nodeEl.getBoundingClientRect() : null;
        if (!rect) return;
        const viewportWidth = windowObj && Number.isFinite(windowObj.innerWidth)
          ? windowObj.innerWidth
          : (document?.documentElement?.clientWidth || 0);
        const viewportHeight = windowObj && Number.isFinite(windowObj.innerHeight)
          ? windowObj.innerHeight
          : (document?.documentElement?.clientHeight || 0);
        const margin = 12;
        popup.style.visibility = 'hidden';
        popup.style.display = popup.classList.contains('diagram-popup--notice') ? 'flex' : 'block';
        popup.removeAttribute('hidden');
        adjustPopupLayout(entry, viewportWidth, viewportHeight, margin);
        const popupRect = typeof popup.getBoundingClientRect === 'function' ? popup.getBoundingClientRect() : null;
        let left = rect.right + margin;
        let top = rect.top;
        if (popupRect) {
          const pointer = lastPointerPosition;
          const pointerOnRightSide = pointer
            && viewportWidth
            && Number.isFinite(pointer.x)
            && pointer.x >= viewportWidth * 0.55;
          if (pointerOnRightSide) {
            const preferredLeft = rect.left - popupRect.width - margin;
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
        popup.style.left = `${Math.round(left)}px`;
        popup.style.top = `${Math.round(top)}px`;
        popup.style.visibility = 'visible';
      };

      const updatePointerPosition = event => {
        if (!event) return;
        let clientX;
        let clientY;
        if (event.touches && event.touches.length) {
          const touch = event.touches[0];
          clientX = touch?.clientX;
          clientY = touch?.clientY;
        } else if (typeof event.clientX === 'number' && typeof event.clientY === 'number') {
          clientX = event.clientX;
          clientY = event.clientY;
        }
        if (Number.isFinite(clientX) && Number.isFinite(clientY)) {
          lastPointerPosition = { x: clientX, y: clientY };
        }
      };

      const showHoverNoticeForNode = (nodeEl) => {
        if (!popup || !nodeEl) return;
        const nodeId = nodeEl.getAttribute('data-node');
        if (!nodeId || !lastPopupEntries[nodeId]) {
          hidePopup();
          return;
        }
        const safeNotice = escapeHtml(hoverNoticeText);
        popup.className = 'diagram-popup diagram-popup--notice';
        popup.innerHTML = `<p class="diagram-popup-notice">${safeNotice}</p>`;
        popup.setAttribute('aria-label', hoverNoticeText);
        activePopupNode = nodeEl;
        activePopupEntry = null;
        positionPopup(nodeEl, null);
      };

      const onNodeOver = e => {
        updatePointerPosition(e);
        const node = e.target.closest('.diagram-node');
        if (!node || node === activePopupNode) return;
        showHoverNoticeForNode(node);
      };

      const onNodeOut = e => {
        if (!activePopupNode) return;
        const related = e.relatedTarget;
        if (related && activePopupNode.contains(related)) return;
        if (related && related.closest && related.closest('.diagram-node') === activePopupNode) return;
        if (popup && (related === popup || (related && popup.contains(related)))) return;
        hidePopup();
      };

      const onSvgLeave = e => {
        if (svg.contains(e.relatedTarget)) return;
        if (popup && (e.relatedTarget === popup || popup.contains(e.relatedTarget))) return;
        hidePopup();
      };

      svg.addEventListener('mousedown', onSvgMouseDown);
      svg.addEventListener('touchstart', onSvgMouseDown, { passive: false });
      if (windowObj) {
        windowObj.addEventListener('mousemove', onPanMove);
        windowObj.addEventListener('touchmove', onPanMove, { passive: false });
        windowObj.addEventListener('mouseup', stopPanning);
        windowObj.addEventListener('touchend', stopPanning);
        windowObj.addEventListener('mousemove', onDragMove);
        windowObj.addEventListener('touchmove', onDragMove, { passive: false });
        windowObj.addEventListener('mouseup', onDragEnd);
        windowObj.addEventListener('touchend', onDragEnd);
        windowObj.addEventListener('mousemove', updatePointerPosition);
        windowObj.addEventListener('touchmove', updatePointerPosition, { passive: true });
      }
      const showEntryPopupForNode = (node, entry) => {
        if (!entry) return;
        if (!popup || !node) {
          openDetailDialogWithEntry(entry);
          return;
        }
        popup.className = entry.className ? `diagram-popup ${entry.className}` : 'diagram-popup';
        popup.innerHTML = entry.content || '';
        if (entry.label) {
          popup.setAttribute('aria-label', entry.label);
        } else {
          popup.removeAttribute('aria-label');
        }
        activePopupNode = node;
        activePopupEntry = entry;
        positionPopup(node, entry);
      };

      const onNodeDoubleClick = e => {
        const node = e.target.closest('.diagram-node');
        if (!node) return;
        const nodeId = node.getAttribute('data-node');
        if (!nodeId) return;
        const entry = lastPopupEntries[nodeId];
        if (!entry) return;
        hidePopup();
        activePopupNode = null;
        activePopupEntry = null;
        openDetailDialogWithEntry(entry);
        e.stopPropagation();
        e.preventDefault();
      };

      svg.addEventListener('mousedown', onDragStart);
      svg.addEventListener('touchstart', onDragStart, { passive: false });
      svg.addEventListener('touchend', onNodeTouchEnd, { passive: false });
      svg.addEventListener('mouseover', onNodeOver);
      svg.addEventListener('mouseout', onNodeOut);
      svg.addEventListener('mouseleave', onSvgLeave);
      svg.addEventListener('dblclick', onNodeDoubleClick);
      const repositionActivePopup = () => {
        if (!activePopupNode) return;
        const nodeId = activePopupNode.getAttribute('data-node');
        if (!nodeId || !lastPopupEntries[nodeId]) {
          hidePopup();
          return;
        }
        const entry = activePopupEntry || lastPopupEntries[nodeId];
        positionPopup(activePopupNode, entry || null);
      };

      svg.addEventListener('mousemove', updatePointerPosition);
      svg.addEventListener('touchstart', updatePointerPosition, { passive: true });
      if (windowObj) {
        windowObj.addEventListener('resize', repositionActivePopup);
      }

      cleanupDiagramInteractions = () => {
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
      const diagramLegend = resolveDiagramLegend();
      if (!diagramLegend) return;
      const texts = resolveTexts();
      const currentLang = resolveCurrentLang();
      const legendItems = [
        { cls: 'power', text: texts[currentLang]?.diagramLegendPower || texts.en?.diagramLegendPower || 'Power' },
        { cls: 'video', text: texts[currentLang]?.diagramLegendVideo || texts.en?.diagramLegendVideo || 'Video' },
        { cls: 'fiz', text: texts[currentLang]?.diagramLegendFIZ || texts.en?.diagramLegendFIZ || 'FIZ' }
      ];
      diagramLegend.innerHTML = legendItems
        .map(({ cls, text }) => `<span><span class="swatch ${cls}"></span>${text}</span>`)
        .join('');
    }

    return {
      renderSetupDiagram,
      enableDiagramInteractions,
      updateDiagramLegend,
      getDiagramManualPositions,
      setManualDiagramPositions,
      getDiagramCss,
      diagramConnectorIcons,
      diagramIcons,
      overviewSectionIcons,
      DIAGRAM_MONITOR_ICON,
    };
  }

  const moduleApi = Object.freeze({
    createConnectionDiagram,
  });

  MODULE_BASE.registerOrQueueModule(
    'cine.features.connectionDiagram',
    moduleApi,
    {
      category: 'features',
      description: 'Connection diagram rendering and interactions.',
      replace: true,
      connections: ['cineModuleBase', 'cineModuleContext', 'cineUi'],
    },
    error => safeWarn('Unable to register cine.features.connectionDiagram module.', error),
    GLOBAL_SCOPE,
    MODULE_BASE.getModuleRegistry && MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE),
  );

  if (typeof MODULE_BASE.exposeGlobal === 'function') {
    MODULE_BASE.exposeGlobal('cineFeaturesConnectionDiagram', moduleApi, GLOBAL_SCOPE, {
      configurable: true,
      enumerable: false,
      writable: false,
    });
  } else {
    try {
      GLOBAL_SCOPE.cineFeaturesConnectionDiagram = moduleApi;
    } catch (error) {
      void error;
    }
  }
})();
