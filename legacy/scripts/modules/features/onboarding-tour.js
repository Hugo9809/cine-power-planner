function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
  function collectCandidateScopes(primary) {
    if (typeof MODULE_BASE.collectCandidateScopes === 'function') {
      try {
        return MODULE_BASE.collectCandidateScopes(primary);
      } catch (error) {
        safeWarn('cine.features.onboardingTour could not collect candidate scopes.', error);
      }
    }
    var scopes = [];
    var push = function push(scope) {
      if (!scope || _typeof(scope) !== 'object' && typeof scope !== 'function') {
        return;
      }
      if (scopes.indexOf(scope) === -1) {
        scopes.push(scope);
      }
    };
    push(primary);
    if (typeof globalThis !== 'undefined') push(globalThis);
    if (typeof window !== 'undefined') push(window);
    if (typeof self !== 'undefined') push(self);
    if (typeof global !== 'undefined') push(global);
    return scopes;
  }
  function resolveDocument(scope) {
    var scopes = collectCandidateScopes(scope || GLOBAL_SCOPE);
    for (var index = 0; index < scopes.length; index += 1) {
      var candidate = scopes[index];
      if (!candidate) continue;
      try {
        if (candidate.document && typeof candidate.document.getElementById === 'function') {
          return candidate.document;
        }
      } catch (error) {
        void error;
      }
    }
    return null;
  }
  var DOCUMENT = resolveDocument(GLOBAL_SCOPE);
  if (!DOCUMENT) {
    return;
  }
  var STORAGE_KEY = 'cameraPowerPlanner_onboardingTutorial';
  var STORAGE_VERSION = 2;
  var OVERLAY_ID = 'onboardingTutorialOverlay';
  var HELP_BUTTON_ID = 'helpOnboardingTutorialButton';
  var HELP_TRIGGER_SELECTOR = '[data-onboarding-tour-trigger]';
  var HELP_STATUS_ID = 'helpOnboardingTutorialStatus';
  function resolveStorage() {
    if (typeof getSafeLocalStorage === 'function') {
      try {
        var storage = getSafeLocalStorage();
        if (storage && typeof storage.getItem === 'function') {
          return storage;
        }
      } catch (error) {
        safeWarn('cine.features.onboardingTour could not access getSafeLocalStorage()', error);
      }
    }
    if ((typeof SAFE_LOCAL_STORAGE === "undefined" ? "undefined" : _typeof(SAFE_LOCAL_STORAGE)) === 'object' && SAFE_LOCAL_STORAGE) {
      return SAFE_LOCAL_STORAGE;
    }
    try {
      if (_typeof(GLOBAL_SCOPE.localStorage) === 'object' && GLOBAL_SCOPE.localStorage) {
        return GLOBAL_SCOPE.localStorage;
      }
    } catch (error) {
      safeWarn('cine.features.onboardingTour could not access window.localStorage.', error);
    }
    return null;
  }
  var SAFE_STORAGE = resolveStorage();
  function clone(value) {
    if (typeof MODULE_BASE.freezeDeep === 'function') {
      try {
        return MODULE_BASE.freezeDeep(value);
      } catch (error) {
        safeWarn('cine.features.onboardingTour could not deep-freeze value.', error);
      }
    }
    return value;
  }
  var DEFAULT_STEP_KEYS = ['intro', 'projectOverview', 'deviceSelection', 'gearGeneration', 'gearCustomization', 'resultsReview', 'powerSummary', 'contactsOwnGear', 'autoGear', 'overviewPrint', 'exportImport', 'backupRestore', 'safetyNet', 'completion'];
  var STEP_SIGNATURE = DEFAULT_STEP_KEYS.join('|');
  function normalizeCompletedSteps(value, allowedKeys) {
    if (!Array.isArray(value)) {
      return [];
    }
    var normalized = [];
    for (var index = 0; index < value.length; index += 1) {
      var entry = value[index];
      if (typeof entry !== 'string' || !entry) {
        continue;
      }
      if (allowedKeys && allowedKeys.indexOf(entry) === -1) {
        continue;
      }
      if (normalized.indexOf(entry) === -1) {
        normalized.push(entry);
      }
    }
    return normalized;
  }
  function normalizeStateSnapshot(state) {
    var snapshot = state && _typeof(state) === 'object' ? _objectSpread({}, state) : {};
    snapshot.version = STORAGE_VERSION;
    snapshot.completed = Boolean(snapshot.completed);
    snapshot.skipped = Boolean(snapshot.skipped) && !snapshot.completed;
    var allowedKeys = DEFAULT_STEP_KEYS;
    snapshot.completedSteps = normalizeCompletedSteps(snapshot.completedSteps, allowedKeys);
    snapshot.activeStep = typeof snapshot.activeStep === 'string' && snapshot.activeStep ? snapshot.activeStep : null;
    if (snapshot.activeStep && allowedKeys.indexOf(snapshot.activeStep) === -1) {
      snapshot.activeStep = null;
    }
    var signature = typeof snapshot.stepSignature === 'string' ? snapshot.stepSignature : null;
    if (signature !== STEP_SIGNATURE) {
      snapshot.stepSignature = STEP_SIGNATURE;
      snapshot.completed = false;
      snapshot.skipped = false;
      if (!snapshot.activeStep) {
        for (var index = 0; index < allowedKeys.length; index += 1) {
          var key = allowedKeys[index];
          if (snapshot.completedSteps.indexOf(key) === -1) {
            snapshot.activeStep = key;
            break;
          }
        }
      }
    } else {
      snapshot.stepSignature = STEP_SIGNATURE;
    }
    if (snapshot.completedSteps.length < allowedKeys.length) {
      snapshot.completed = false;
    }
    if (typeof snapshot.timestamp !== 'number' || Number.isNaN(snapshot.timestamp)) {
      snapshot.timestamp = Date.now ? Date.now() : new Date().getTime();
    }
    return snapshot;
  }
  function loadStoredState() {
    if (!SAFE_STORAGE || typeof SAFE_STORAGE.getItem !== 'function') {
      return normalizeStateSnapshot({
        version: STORAGE_VERSION
      });
    }
    var raw = null;
    try {
      raw = SAFE_STORAGE.getItem(STORAGE_KEY);
    } catch (error) {
      safeWarn('cine.features.onboardingTour could not read onboarding state.', error);
      raw = null;
    }
    if (typeof raw !== 'string' || !raw) {
      return normalizeStateSnapshot({
        version: STORAGE_VERSION
      });
    }
    try {
      var parsed = JSON.parse(raw);
      if (!parsed || _typeof(parsed) !== 'object') {
        return normalizeStateSnapshot({
          version: STORAGE_VERSION
        });
      }
      if (parsed.version !== STORAGE_VERSION) {
        return normalizeStateSnapshot(_objectSpread(_objectSpread({}, parsed), {}, {
          version: STORAGE_VERSION,
          completed: false,
          skipped: false
        }));
      }
      return normalizeStateSnapshot(parsed);
    } catch (error) {
      safeWarn('cine.features.onboardingTour could not parse onboarding state.', error);
      return normalizeStateSnapshot({
        version: STORAGE_VERSION
      });
    }
  }
  function saveState(nextState) {
    if (!SAFE_STORAGE || typeof SAFE_STORAGE.setItem !== 'function') {
      return normalizeStateSnapshot(_objectSpread(_objectSpread({}, nextState), {}, {
        version: STORAGE_VERSION
      }));
    }
    var sanitized = normalizeStateSnapshot(_objectSpread(_objectSpread({}, nextState), {}, {
      version: STORAGE_VERSION
    }));
    var payload = _objectSpread(_objectSpread({}, sanitized), {}, {
      timestamp: Date.now ? Date.now() : new Date().getTime()
    });
    try {
      SAFE_STORAGE.setItem(STORAGE_KEY, JSON.stringify(payload));
      return payload;
    } catch (error) {
      safeWarn('cine.features.onboardingTour could not persist onboarding state.', error);
      return sanitized;
    }
  }
  var storedState = loadStoredState();
  function resolveLanguage() {
    try {
      var lang = typeof GLOBAL_SCOPE.currentLang === 'string' && GLOBAL_SCOPE.texts ? GLOBAL_SCOPE.currentLang : null;
      if (lang && GLOBAL_SCOPE.texts && GLOBAL_SCOPE.texts[lang]) {
        return lang;
      }
    } catch (error) {
      void error;
    }
    return 'en';
  }
  function resolveTourTexts() {
    var lang = resolveLanguage();
    var fallback = GLOBAL_SCOPE.texts && GLOBAL_SCOPE.texts.en && GLOBAL_SCOPE.texts.en.onboardingTour ? GLOBAL_SCOPE.texts.en.onboardingTour : {};
    var localized = GLOBAL_SCOPE.texts && GLOBAL_SCOPE.texts[lang] && GLOBAL_SCOPE.texts[lang].onboardingTour ? GLOBAL_SCOPE.texts[lang].onboardingTour : fallback;
    var steps = {};
    for (var index = 0; index < DEFAULT_STEP_KEYS.length; index += 1) {
      var key = DEFAULT_STEP_KEYS[index];
      var localEntry = localized.steps && localized.steps[key];
      var fallbackEntry = fallback.steps && fallback.steps[key];
      steps[key] = localEntry || fallbackEntry || {
        title: key,
        body: ''
      };
    }
    return _objectSpread(_objectSpread(_objectSpread({}, fallback), localized), {}, {
      steps: steps
    });
  }
  var tourTexts = resolveTourTexts();
  function getStepConfig() {
    return [{
      key: 'intro',
      highlight: null,
      autoActions: null
    }, {
      key: 'projectOverview',
      highlight: '#setup-manager',
      focus: '#setupName'
    }, {
      key: 'deviceSelection',
      highlight: '#setup-config'
    }, {
      key: 'gearGeneration',
      highlight: '#generateGearListBtn'
    }, {
      key: 'gearCustomization',
      highlight: '[data-nav-key="gearListNav"]'
    }, {
      key: 'resultsReview',
      highlight: '[data-nav-key="resultsHeading"]',
      alternateHighlight: '#resultsHeading',
      focus: '#resultsHeading'
    }, {
      key: 'powerSummary',
      highlight: '#resultsPlainSummary',
      alternateHighlight: '#resultsHeading',
      focus: '#resultsPlainSummaryTitle'
    }, {
      key: 'contactsOwnGear',
      highlight: '#openContactsBtn',
      alternateHighlight: '[data-nav-key="ownGearNav"]'
    }, {
      key: 'autoGear',
      highlight: '#autoGearHeading',
      ensureSettings: {
        tabId: 'settingsTab-autoGear'
      }
    }, {
      key: 'overviewPrint',
      highlight: '#generateOverviewBtn'
    }, {
      key: 'exportImport',
      highlight: '#shareSetupBtn',
      alternateHighlight: '#applySharedLinkBtn'
    }, {
      key: 'backupRestore',
      highlight: '#backupSettings',
      ensureSettings: {
        tabId: 'settingsTab-backup'
      }
    }, {
      key: 'safetyNet',
      highlight: '#offlineIndicator',
      alternateHighlight: '#saveSetupBtn'
    }, {
      key: 'completion',
      highlight: null
    }];
  }
  var stepConfig = getStepConfig();
  var overlayRoot = null;
  var backdropEl = null;
  var highlightEl = null;
  var cardEl = null;
  var titleEl = null;
  var bodyEl = null;
  var progressEl = null;
  var progressMeterEl = null;
  var progressMeterFillEl = null;
  var stepListEl = null;
  var resumeHintEl = null;
  var helpStatusEl = null;
  var backButton = null;
  var nextButton = null;
  var skipButton = null;
  var active = false;
  var currentIndex = -1;
  var currentStep = null;
  var pendingFrame = null;
  var autoOpenedSettings = false;
  var settingsDialogRef = null;
  var resumeHintVisible = false;
  var resumeStartIndex = null;
  function clearFrame() {
    if (pendingFrame === null) {
      return;
    }
    if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.cancelAnimationFrame === 'function') {
      GLOBAL_SCOPE.cancelAnimationFrame(pendingFrame);
    } else {
      clearTimeout(pendingFrame);
    }
    pendingFrame = null;
  }
  function schedulePositionUpdate() {
    if (!active) {
      return;
    }
    if (pendingFrame !== null) {
      return;
    }
    var runner = function runner() {
      pendingFrame = null;
      updateHighlightPosition();
    };
    if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.requestAnimationFrame === 'function') {
      pendingFrame = GLOBAL_SCOPE.requestAnimationFrame(runner);
    } else {
      pendingFrame = setTimeout(runner, 16);
    }
  }
  function ensureOverlayElements() {
    if (overlayRoot && overlayRoot.parentNode) {
      return;
    }
    overlayRoot = DOCUMENT.createElement('div');
    overlayRoot.id = OVERLAY_ID;
    overlayRoot.className = 'onboarding-overlay';
    overlayRoot.setAttribute('aria-hidden', 'true');
    backdropEl = DOCUMENT.createElement('div');
    backdropEl.className = 'onboarding-backdrop';
    overlayRoot.appendChild(backdropEl);
    highlightEl = DOCUMENT.createElement('div');
    highlightEl.className = 'onboarding-highlight';
    highlightEl.setAttribute('aria-hidden', 'true');
    overlayRoot.appendChild(highlightEl);
    cardEl = DOCUMENT.createElement('section');
    cardEl.className = 'onboarding-card';
    cardEl.setAttribute('role', 'dialog');
    cardEl.setAttribute('aria-modal', 'true');
    cardEl.tabIndex = -1;
    var header = DOCUMENT.createElement('div');
    header.className = 'onboarding-card-header';
    cardEl.appendChild(header);
    progressEl = DOCUMENT.createElement('p');
    progressEl.className = 'onboarding-progress';
    header.appendChild(progressEl);
    progressMeterEl = DOCUMENT.createElement('div');
    progressMeterEl.className = 'onboarding-progress-meter';
    progressMeterEl.setAttribute('role', 'progressbar');
    progressMeterEl.setAttribute('aria-valuemin', '0');
    progressMeterEl.setAttribute('aria-valuemax', String(stepConfig.length));
    progressMeterEl.setAttribute('aria-valuenow', '0');
    progressMeterEl.setAttribute('aria-valuetext', '');
    var progressTrack = DOCUMENT.createElement('div');
    progressTrack.className = 'onboarding-progress-track';
    progressMeterFillEl = DOCUMENT.createElement('div');
    progressMeterFillEl.className = 'onboarding-progress-fill';
    progressTrack.appendChild(progressMeterFillEl);
    progressMeterEl.appendChild(progressTrack);
    header.appendChild(progressMeterEl);
    skipButton = DOCUMENT.createElement('button');
    skipButton.type = 'button';
    skipButton.className = 'button-link onboarding-skip';
    skipButton.addEventListener('click', function () {
      if (!active) return;
      confirmSkip();
    });
    header.appendChild(skipButton);
    resumeHintEl = DOCUMENT.createElement('p');
    resumeHintEl.className = 'onboarding-resume-hint';
    resumeHintEl.hidden = true;
    cardEl.appendChild(resumeHintEl);
    titleEl = DOCUMENT.createElement('h2');
    titleEl.id = 'onboardingCardTitle';
    cardEl.appendChild(titleEl);
    bodyEl = DOCUMENT.createElement('p');
    bodyEl.id = 'onboardingCardBody';
    cardEl.appendChild(bodyEl);
    stepListEl = DOCUMENT.createElement('ol');
    stepListEl.className = 'onboarding-step-list';
    stepListEl.setAttribute('role', 'list');
    stepListEl.addEventListener('click', handleStepListClick);
    cardEl.appendChild(stepListEl);
    var actions = DOCUMENT.createElement('div');
    actions.className = 'onboarding-card-actions';
    cardEl.appendChild(actions);
    backButton = DOCUMENT.createElement('button');
    backButton.type = 'button';
    backButton.className = 'onboarding-back-button';
    backButton.addEventListener('click', function () {
      if (!active) return;
      goToPreviousStep();
    });
    actions.appendChild(backButton);
    nextButton = DOCUMENT.createElement('button');
    nextButton.type = 'button';
    nextButton.className = 'onboarding-next-button';
    nextButton.addEventListener('click', function () {
      if (!active) return;
      goToNextStep();
    });
    actions.appendChild(nextButton);
    overlayRoot.appendChild(cardEl);
    DOCUMENT.body.appendChild(overlayRoot);
    overlayRoot.addEventListener('keydown', handleOverlayKeydown, true);
  }
  function teardownOverlayElements() {
    clearFrame();
    if (overlayRoot && overlayRoot.parentNode) {
      overlayRoot.parentNode.removeChild(overlayRoot);
    }
    overlayRoot = null;
    backdropEl = null;
    highlightEl = null;
    cardEl = null;
    titleEl = null;
    bodyEl = null;
    progressEl = null;
    progressMeterEl = null;
    progressMeterFillEl = null;
    stepListEl = null;
    resumeHintEl = null;
    backButton = null;
    nextButton = null;
    skipButton = null;
    resumeHintVisible = false;
    resumeStartIndex = null;
  }
  function formatStepIndicator(index, total) {
    var template = typeof tourTexts.stepIndicator === 'string' ? tourTexts.stepIndicator : 'Step {current} of {total}';
    var current = index + 1;
    return template.replace('{current}', current).replace('{total}', total);
  }
  function focusCard() {
    if (!cardEl) {
      return;
    }
    try {
      cardEl.focus({
        preventScroll: true
      });
    } catch (error) {
      void error;
      try {
        cardEl.focus();
      } catch (focusError) {
        void focusError;
      }
    }
  }
  function getTargetElement(step) {
    if (!step) {
      return null;
    }
    if (step.ensureSettings && (!settingsDialogRef || !isSettingsDialogVisible())) {
      return null;
    }
    if (typeof step.highlight === 'string' && step.highlight) {
      var el = DOCUMENT.querySelector(step.highlight);
      if (el) {
        return el;
      }
      if (typeof step.alternateHighlight === 'string' && step.alternateHighlight) {
        return DOCUMENT.querySelector(step.alternateHighlight);
      }
    }
    return null;
  }
  function updateHighlightPosition() {
    if (!highlightEl) {
      return;
    }
    var target = getTargetElement(currentStep);
    if (!target) {
      highlightEl.style.transform = 'scale(0)';
      highlightEl.style.opacity = '0';
      return;
    }
    var rect = target.getBoundingClientRect();
    var padding = 12;
    var width = Math.max(0, rect.width + padding * 2);
    var height = Math.max(0, rect.height + padding * 2);
    var left = rect.left + (GLOBAL_SCOPE.scrollX || GLOBAL_SCOPE.pageXOffset || 0) - padding;
    var top = rect.top + (GLOBAL_SCOPE.scrollY || GLOBAL_SCOPE.pageYOffset || 0) - padding;
    highlightEl.style.width = "".concat(width, "px");
    highlightEl.style.height = "".concat(height, "px");
    highlightEl.style.transform = "translate(".concat(Math.max(0, left), "px, ").concat(Math.max(0, top), "px)");
    highlightEl.style.opacity = '1';
  }
  function positionCard() {
    if (!cardEl) {
      return;
    }
    var viewportWidth = GLOBAL_SCOPE.innerWidth || DOCUMENT.documentElement.clientWidth || 0;
    var viewportHeight = GLOBAL_SCOPE.innerHeight || DOCUMENT.documentElement.clientHeight || 0;
    var target = getTargetElement(currentStep);
    var cardRect = cardEl.getBoundingClientRect();
    var top = (GLOBAL_SCOPE.scrollY || GLOBAL_SCOPE.pageYOffset || 0) + Math.max(24, (viewportHeight - cardRect.height) / 2);
    var left = (GLOBAL_SCOPE.scrollX || GLOBAL_SCOPE.pageXOffset || 0) + Math.max(24, (viewportWidth - cardRect.width) / 2);
    if (target) {
      var rect = target.getBoundingClientRect();
      var targetTop = rect.top + (GLOBAL_SCOPE.scrollY || GLOBAL_SCOPE.pageYOffset || 0);
      var targetLeft = rect.left + (GLOBAL_SCOPE.scrollX || GLOBAL_SCOPE.pageXOffset || 0);
      var spaceBelow = (GLOBAL_SCOPE.innerHeight || viewportHeight) - rect.bottom;
      var spaceAbove = rect.top;
      if (spaceBelow > cardRect.height + 40) {
        top = targetTop + rect.height + 24;
      } else if (spaceAbove > cardRect.height + 40) {
        top = targetTop - cardRect.height - 24;
      }
      if (targetLeft + rect.width + cardRect.width + 32 < (GLOBAL_SCOPE.scrollX || 0) + viewportWidth) {
        left = targetLeft + rect.width + 24;
      } else if (targetLeft - cardRect.width - 24 > 0) {
        left = targetLeft - cardRect.width - 24;
      }
    }
    var maxTop = (GLOBAL_SCOPE.scrollY || GLOBAL_SCOPE.pageYOffset || 0) + viewportHeight - cardRect.height - 24;
    var maxLeft = (GLOBAL_SCOPE.scrollX || GLOBAL_SCOPE.pageXOffset || 0) + viewportWidth - cardRect.width - 24;
    cardEl.style.top = "".concat(Math.max(24 + (GLOBAL_SCOPE.scrollY || GLOBAL_SCOPE.pageYOffset || 0), Math.min(top, maxTop)), "px");
    cardEl.style.left = "".concat(Math.max(24 + (GLOBAL_SCOPE.scrollX || GLOBAL_SCOPE.pageXOffset || 0), Math.min(left, maxLeft)), "px");
  }
  function ensureSettingsForStep(step) {
    if (!step || !step.ensureSettings) {
      return;
    }
    var dialog = DOCUMENT.getElementById('settingsDialog');
    if (!dialog) {
      return;
    }
    var wasOpen = typeof isDialogOpen === 'function' ? isDialogOpen(dialog) : !dialog.hasAttribute('hidden');
    settingsDialogRef = dialog;
    if (!wasOpen) {
      var trigger = DOCUMENT.getElementById('settingsButton');
      if (trigger && typeof trigger.click === 'function') {
        try {
          trigger.click();
          autoOpenedSettings = true;
        } catch (error) {
          safeWarn('cine.features.onboardingTour could not trigger settings button click.', error);
        }
      }
      if (!autoOpenedSettings) {
        dialog.removeAttribute('hidden');
        if (typeof openDialog === 'function') {
          try {
            openDialog(dialog);
          } catch (error) {
            safeWarn('cine.features.onboardingTour could not open settings dialog.', error);
          }
        } else if (typeof dialog.showModal === 'function') {
          try {
            dialog.showModal();
          } catch (error) {
            safeWarn('cine.features.onboardingTour could not show modal settings dialog.', error);
          }
        }
        autoOpenedSettings = true;
      }
    } else {
      autoOpenedSettings = false;
    }
    if (step.ensureSettings.tabId && typeof activateSettingsTab === 'function') {
      try {
        activateSettingsTab(step.ensureSettings.tabId);
      } catch (error) {
        safeWarn('cine.features.onboardingTour could not activate settings tab.', error);
      }
    }
  }
  function isSettingsDialogVisible() {
    if (!settingsDialogRef) {
      return false;
    }
    if (typeof isDialogOpen === 'function') {
      try {
        return isDialogOpen(settingsDialogRef);
      } catch (error) {
        safeWarn('cine.features.onboardingTour could not evaluate settings dialog state.', error);
      }
    }
    return !settingsDialogRef.hasAttribute('hidden');
  }
  function closeSettingsIfNeeded() {
    if (!settingsDialogRef) {
      return;
    }
    if (!autoOpenedSettings) {
      return;
    }
    if (typeof closeDialog === 'function') {
      try {
        closeDialog(settingsDialogRef);
      } catch (error) {
        safeWarn('cine.features.onboardingTour could not close settings dialog via closeDialog.', error);
      }
    } else if (typeof settingsDialogRef.close === 'function') {
      try {
        settingsDialogRef.close();
      } catch (error) {
        safeWarn('cine.features.onboardingTour could not close settings dialog.', error);
      }
    }
    settingsDialogRef.setAttribute('hidden', '');
    autoOpenedSettings = false;
  }
  function getStepTexts(step) {
    if (!step) {
      return {
        title: '',
        body: ''
      };
    }
    var pack = tourTexts.steps && tourTexts.steps[step.key] ? tourTexts.steps[step.key] : {
      title: step.key,
      body: ''
    };
    return {
      title: typeof pack.title === 'string' ? pack.title : step.key,
      body: typeof pack.body === 'string' ? pack.body : ''
    };
  }
  function updateResumeHint(index) {
    if (!resumeHintEl) {
      return;
    }
    if (!resumeHintVisible || typeof index !== 'number' || index < 0) {
      resumeHintEl.hidden = true;
      resumeHintEl.textContent = '';
      return;
    }
    var totalSteps = stepConfig.length;
    var completedSteps = storedState && Array.isArray(storedState.completedSteps) ? storedState.completedSteps.length : 0;
    var template = tourTexts.resumeHintDetailed || tourTexts.resumeHint || 'Resuming where you left off.';
    var hint = template.replace('{current}', String(index + 1)).replace('{total}', String(totalSteps)).replace('{completed}', String(Math.min(completedSteps, totalSteps)));
    resumeHintEl.hidden = false;
    resumeHintEl.textContent = hint;
  }
  function updateStepList(activeIndex) {
    if (!stepListEl) {
      return;
    }
    var resolvedActiveIndex = typeof activeIndex === 'number' && activeIndex >= 0 ? activeIndex : 0;
    var total = stepConfig.length;
    var statusLabels = {
      current: tourTexts.stepStatusCurrent || 'Current step',
      complete: tourTexts.stepStatusComplete || 'Completed',
      upcoming: tourTexts.stepStatusUpcoming || 'Locked'
    };
    var completedSet = new Set(storedState && Array.isArray(storedState.completedSteps) ? storedState.completedSteps : []);
    var activeKey = currentStep ? currentStep.key : stepConfig[resolvedActiveIndex] && stepConfig[resolvedActiveIndex].key;
    stepListEl.textContent = '';
    if (typeof stepListEl.setAttribute === 'function') {
      stepListEl.setAttribute('aria-label', tourTexts.stepListAriaLabel || 'Tutorial steps');
    }
    for (var index = 0; index < total; index += 1) {
      var step = stepConfig[index];
      var texts = getStepTexts(step);
      var item = DOCUMENT.createElement('li');
      item.className = 'onboarding-step-item';
      var status = void 0;
      if (step && step.key === activeKey) {
        status = 'current';
      } else if (step && completedSet.has(step.key)) {
        status = 'complete';
      } else {
        status = 'upcoming';
      }
      item.setAttribute('data-status', status);
      var button = DOCUMENT.createElement('button');
      button.type = 'button';
      button.className = 'onboarding-step-button';
      button.disabled = status === 'upcoming';
      button.setAttribute('data-step-index', String(index));
      button.setAttribute('aria-current', status === 'current' ? 'step' : 'false');
      var title = texts.title || step.key;
      var statusText = statusLabels[status] || '';
      button.setAttribute('aria-label', statusText ? "".concat(title, ". ").concat(statusText, ".") : title);
      var titleElFragment = DOCUMENT.createElement('span');
      titleElFragment.className = 'onboarding-step-title';
      titleElFragment.textContent = title;
      button.appendChild(titleElFragment);
      var statusEl = DOCUMENT.createElement('span');
      statusEl.className = 'onboarding-step-status';
      statusEl.textContent = statusText;
      button.appendChild(statusEl);
      item.appendChild(button);
      stepListEl.appendChild(item);
    }
  }
  function handleStepListClick(event) {
    if (!active) {
      return;
    }
    var target = event && event.target;
    if (!target) {
      return;
    }
    var button = typeof target.closest === 'function' ? target.closest('.onboarding-step-button') : target.classList && target.classList.contains('onboarding-step-button') ? target : null;
    if (!button || button.disabled) {
      return;
    }
    var index = parseInt(button.getAttribute('data-step-index'), 10);
    if (Number.isNaN(index) || index > currentIndex) {
      return;
    }
    showStep(index);
  }
  function updateCardForStep(step, index) {
    if (!cardEl) {
      return;
    }
    var totalSteps = stepConfig.length;
    var textPack = getStepTexts(step);
    var stepText = textPack.body;
    cardEl.setAttribute('aria-labelledby', titleEl.id);
    cardEl.setAttribute('aria-describedby', bodyEl.id);
    titleEl.textContent = textPack.title || '';
    bodyEl.textContent = stepText;
    if (step.key === 'completion') {
      progressEl.textContent = tourTexts.completionIndicator || '';
    } else {
      progressEl.textContent = formatStepIndicator(index, totalSteps);
    }
    updateProgressMeter(step, index);
    skipButton.textContent = tourTexts.skipLabel || 'Skip tutorial';
    backButton.textContent = tourTexts.backLabel || 'Back';
    if (step.key === 'completion') {
      nextButton.textContent = tourTexts.doneLabel || 'Finish';
    } else {
      nextButton.textContent = tourTexts.nextLabel || 'Next';
    }
    backButton.disabled = index <= 0;
    backButton.hidden = index <= 0;
    if (step.key === 'intro') {
      skipButton.hidden = false;
    } else if (step.key === 'completion') {
      skipButton.hidden = true;
    } else {
      skipButton.hidden = false;
    }
    updateResumeHint(index);
    updateStepList(index);
  }
  function updateProgressMeter(step, index) {
    if (!progressMeterEl || !progressMeterFillEl) {
      return;
    }
    var totalSteps = stepConfig.length;
    var completedSteps = storedState && Array.isArray(storedState.completedSteps) ? storedState.completedSteps : [];
    var completedSet = new Set(completedSteps);
    var activeContribution = step && !completedSet.has(step.key) ? 1 : 0;
    var progressValue = Math.min(totalSteps, Math.max(index + 1, completedSet.size + activeContribution));
    var ratio = totalSteps > 0 ? Math.max(0, Math.min(1, progressValue / totalSteps)) : 0;
    progressMeterFillEl.style.width = "".concat(ratio * 100, "%");
    var labelTemplate = tourTexts.progressValueLabel || 'Completed {completed} of {total} steps';
    var label = labelTemplate.replace('{completed}', String(Math.min(completedSet.size, totalSteps))).replace('{total}', String(totalSteps));
    var meterLabel = tourTexts.progressMeterLabel || 'Tutorial progress';
    progressMeterEl.setAttribute('aria-label', meterLabel);
    progressMeterEl.setAttribute('aria-valuemax', String(totalSteps));
    progressMeterEl.setAttribute('aria-valuenow', String(progressValue));
    progressMeterEl.setAttribute('aria-valuetext', label);
  }
  function showStep(index) {
    if (index < 0 || index >= stepConfig.length) {
      return;
    }
    var step = stepConfig[index];
    var previousStep = currentStep;
    if (previousStep && previousStep.ensureSettings && (!step.ensureSettings || step.ensureSettings.tabId !== previousStep.ensureSettings.tabId)) {
      closeSettingsIfNeeded();
    }
    currentStep = step;
    currentIndex = index;
    autoOpenedSettings = false;
    if (step.ensureSettings) {
      ensureSettingsForStep(step);
    } else if (previousStep && previousStep.ensureSettings) {
      closeSettingsIfNeeded();
    }
    if (typeof step.focus === 'string' && step.focus) {
      var focusTarget = DOCUMENT.querySelector(step.focus);
      if (focusTarget && typeof focusTarget.scrollIntoView === 'function') {
        try {
          focusTarget.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        } catch (error) {
          safeWarn('cine.features.onboardingTour could not scroll focus target into view.', error);
        }
      }
    } else if (step.highlight) {
      var highlightTarget = DOCUMENT.querySelector(step.highlight);
      if (highlightTarget && typeof highlightTarget.scrollIntoView === 'function') {
        try {
          highlightTarget.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        } catch (error) {
          safeWarn('cine.features.onboardingTour could not scroll highlight target.', error);
        }
      }
    }
    updateCardForStep(step, index);
    if (resumeHintVisible && resumeStartIndex !== null && index !== resumeStartIndex) {
      resumeHintVisible = false;
      updateResumeHint(index);
    }
    schedulePositionUpdate();
    setTimeout(function () {
      schedulePositionUpdate();
      positionCard();
    }, 50);
    var nextState = _objectSpread(_objectSpread({}, storedState), {}, {
      activeStep: step.key,
      completed: false,
      skipped: false
    });
    try {
      var persisted = saveState(nextState);
      storedState = persisted || normalizeStateSnapshot(nextState);
    } catch (error) {
      safeWarn('cine.features.onboardingTour could not update stored step state.', error);
      storedState = normalizeStateSnapshot(nextState);
    }
    focusCard();
    applyHelpButtonLabel();
  }
  function goToNextStep() {
    if (!active) {
      return;
    }
    if (currentStep) {
      recordStepCompletion(currentStep.key);
    }
    var nextIndex = currentIndex + 1;
    if (nextIndex >= stepConfig.length) {
      completeTutorial();
      return;
    }
    showStep(nextIndex);
  }
  function goToPreviousStep() {
    if (!active) {
      return;
    }
    var previousIndex = Math.max(0, currentIndex - 1);
    showStep(previousIndex);
  }
  function recordStepCompletion(stepKey) {
    if (!stepKey) {
      return;
    }
    var completed = storedState && Array.isArray(storedState.completedSteps) ? storedState.completedSteps.slice() : [];
    if (completed.indexOf(stepKey) !== -1) {
      return;
    }
    completed.push(stepKey);
    var nextState = _objectSpread(_objectSpread({}, storedState), {}, {
      completedSteps: completed
    });
    var persisted = saveState(nextState);
    storedState = persisted || normalizeStateSnapshot(nextState);
    updateStepList(currentIndex);
    updateProgressMeter(currentStep, currentIndex);
    applyHelpButtonLabel();
  }
  function confirmSkip() {
    if (!tourTexts.skipConfirmationTitle || !tourTexts.skipConfirmationAccept) {
      skipTutorial();
      return;
    }
    if (!GLOBAL_SCOPE.confirm) {
      skipTutorial();
      return;
    }
    var title = tourTexts.skipConfirmationTitle || '';
    var message = tourTexts.skipConfirmationBody || '';
    var accept = tourTexts.skipConfirmationAccept || '';
    var cancel = tourTexts.skipConfirmationCancel || '';
    var promptMessage = "".concat(title, "\n\n").concat(message).trim();
    var confirmed = false;
    try {
      confirmed = GLOBAL_SCOPE.confirm("".concat(promptMessage, "\n\n").concat(accept, "/").concat(cancel));
    } catch (error) {
      safeWarn('cine.features.onboardingTour could not show skip confirmation dialog.', error);
      confirmed = false;
    }
    if (confirmed) {
      skipTutorial();
    }
  }
  function skipTutorial() {
    closeSettingsIfNeeded();
    endTutorial();
    var nextState = _objectSpread(_objectSpread({}, storedState), {}, {
      skipped: true,
      completed: false,
      activeStep: null
    });
    var persisted = saveState(nextState);
    storedState = persisted || normalizeStateSnapshot(nextState);
    applyHelpButtonLabel();
  }
  function completeTutorial() {
    closeSettingsIfNeeded();
    endTutorial();
    var allStepKeys = stepConfig.map(function (step) {
      return step.key;
    });
    var nextState = _objectSpread(_objectSpread({}, storedState), {}, {
      completed: true,
      skipped: false,
      activeStep: null,
      completedSteps: allStepKeys
    });
    var persisted = saveState(nextState);
    storedState = persisted || normalizeStateSnapshot(nextState);
    applyHelpButtonLabel();
  }
  function handleOverlayKeydown(event) {
    if (!active) {
      return;
    }
    var key = event && event.key;
    if (!key) {
      return;
    }
    if (key === 'Escape') {
      event.preventDefault();
      confirmSkip();
      return;
    }
    if (key === 'ArrowRight') {
      event.preventDefault();
      goToNextStep();
      return;
    }
    if (key === 'ArrowLeft') {
      event.preventDefault();
      goToPreviousStep();
      return;
    }
    if (key !== 'Tab') {
      return;
    }
    var focusable = Array.from(cardEl.querySelectorAll('button:not([disabled])'));
    if (!focusable.length) {
      return;
    }
    var direction = event.shiftKey ? -1 : 1;
    var activeElement = DOCUMENT.activeElement;
    var index = focusable.indexOf(activeElement);
    if (index === -1) {
      index = direction === 1 ? -1 : 0;
    }
    index = (index + direction + focusable.length) % focusable.length;
    event.preventDefault();
    var target = focusable[index];
    if (target) {
      try {
        target.focus({
          preventScroll: true
        });
      } catch (error) {
        void error;
        target.focus();
      }
    }
  }
  function attachGlobalListeners() {
    if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.addEventListener === 'function') {
      GLOBAL_SCOPE.addEventListener('resize', schedulePositionUpdate);
      GLOBAL_SCOPE.addEventListener('scroll', schedulePositionUpdate, true);
    }
  }
  function detachGlobalListeners() {
    if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.removeEventListener === 'function') {
      GLOBAL_SCOPE.removeEventListener('resize', schedulePositionUpdate);
      GLOBAL_SCOPE.removeEventListener('scroll', schedulePositionUpdate, true);
    }
  }
  function startTutorial() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _ref = options || {},
      _ref$resume = _ref.resume,
      resume = _ref$resume === void 0 ? false : _ref$resume,
      _ref$focusStart = _ref.focusStart,
      focusStart = _ref$focusStart === void 0 ? true : _ref$focusStart;
    ensureOverlayElements();
    tourTexts = resolveTourTexts();
    stepConfig = getStepConfig();
    var completedSet = new Set(storedState && Array.isArray(storedState.completedSteps) ? storedState.completedSteps : []);
    var startIndex = resume && storedState && storedState.activeStep ? stepConfig.findIndex(function (step) {
      return step.key === storedState.activeStep;
    }) : -1;
    if (startIndex < 0) {
      startIndex = stepConfig.findIndex(function (step) {
        return step && !completedSet.has(step.key);
      });
    }
    var resolvedIndex = startIndex >= 0 ? startIndex : stepConfig.length - 1;
    if (overlayRoot) {
      overlayRoot.classList.add('active');
      overlayRoot.setAttribute('aria-hidden', 'false');
    }
    active = true;
    currentIndex = -1;
    currentStep = null;
    autoOpenedSettings = false;
    settingsDialogRef = null;
    storedState = loadStoredState();
    resumeHintVisible = Boolean(resume);
    resumeStartIndex = resumeHintVisible ? resolvedIndex : null;
    attachGlobalListeners();
    showStep(resolvedIndex);
    applyHelpStatus(storedState, stepConfig);
    if (focusStart) {
      focusCard();
    }
  }
  function endTutorial() {
    active = false;
    clearFrame();
    detachGlobalListeners();
    if (overlayRoot) {
      overlayRoot.classList.remove('active');
      overlayRoot.setAttribute('aria-hidden', 'true');
    }
    teardownOverlayElements();
  }
  function handleLanguageChange() {
    tourTexts = resolveTourTexts();
    if (active) {
      updateCardForStep(currentStep, currentIndex);
      positionCard();
    }
    applyHelpButtonLabel();
  }
  function collectHelpButtons() {
    var buttons = [];
    var seen = new Set();
    if (DOCUMENT && typeof DOCUMENT.querySelectorAll === 'function') {
      var candidates = DOCUMENT.querySelectorAll(HELP_TRIGGER_SELECTOR);
      for (var index = 0; index < candidates.length; index += 1) {
        var button = candidates[index];
        if (!button || typeof button.addEventListener !== 'function') {
          continue;
        }
        if (seen.has(button)) {
          continue;
        }
        seen.add(button);
        buttons.push(button);
      }
    }
    if (DOCUMENT && typeof DOCUMENT.getElementById === 'function') {
      var fallback = DOCUMENT.getElementById(HELP_BUTTON_ID);
      if (fallback && typeof fallback.addEventListener === 'function' && !seen.has(fallback)) {
        buttons.push(fallback);
      }
    }
    return buttons;
  }
  function resolveHelpStatusElement() {
    if (helpStatusEl && helpStatusEl.isConnected) {
      return helpStatusEl;
    }
    if (!DOCUMENT || typeof DOCUMENT.getElementById !== 'function') {
      helpStatusEl = null;
      return null;
    }
    helpStatusEl = DOCUMENT.getElementById(HELP_STATUS_ID) || null;
    return helpStatusEl;
  }
  function resolveStepTitle(stepKey) {
    if (!stepKey) {
      return '';
    }
    var stepPack = tourTexts.steps && tourTexts.steps[stepKey];
    if (stepPack && typeof stepPack.title === 'string' && stepPack.title) {
      return stepPack.title;
    }
    return stepKey;
  }
  function applyHelpStatus(state, steps) {
    var statusElement = resolveHelpStatusElement();
    if (!statusElement) {
      return;
    }
    var stepList = Array.isArray(steps) && steps.length ? steps : getStepConfig();
    var allowedKeys = stepList.map(function (step) {
      return step && step.key;
    }).filter(Boolean);
    var stored = state || storedState || loadStoredState();
    var completedRaw = stored && Array.isArray(stored.completedSteps) ? stored.completedSteps : [];
    var completedSet = new Set();
    for (var index = 0; index < completedRaw.length; index += 1) {
      var key = completedRaw[index];
      if (typeof key === 'string' && allowedKeys.indexOf(key) !== -1) {
        completedSet.add(key);
      }
    }
    var total = allowedKeys.length;
    var completedCount = Math.min(completedSet.size, total);
    var activeKey = stored && typeof stored.activeStep === 'string' ? stored.activeStep : null;
    var activeIndex = activeKey ? allowedKeys.indexOf(activeKey) : -1;
    var nextIndex = -1;
    for (var _index = 0; _index < allowedKeys.length; _index += 1) {
      var _key = allowedKeys[_index];
      if (!completedSet.has(_key)) {
        nextIndex = _index;
        break;
      }
    }
    var nextKey = nextIndex >= 0 ? allowedKeys[nextIndex] : null;
    var nextTitle = nextKey ? resolveStepTitle(nextKey) : '';
    var activeTitle = activeIndex >= 0 ? resolveStepTitle(activeKey) : '';
    var statusType = 'notStarted';
    if (stored && stored.completed) {
      statusType = 'completed';
    } else if (stored && stored.skipped) {
      statusType = 'skipped';
    } else if (activeIndex >= 0) {
      statusType = 'resume';
    } else if (completedCount > 0) {
      statusType = 'inProgress';
    }
    var template;
    if (statusType === 'completed') {
      template = tourTexts.helpStatusCompleted || '';
      if (!template) {
        template = 'Tutorial complete. Replay any step anytime for a refresher.';
      }
    } else if (statusType === 'skipped') {
      template = tourTexts.helpStatusSkipped || '';
      if (!template) {
        template = 'Tutorial skipped. Restart when you\'re ready—the saved progress stays available offline.';
      }
    } else if (statusType === 'resume') {
      template = tourTexts.helpStatusResume || tourTexts.helpStatusInProgress || '';
      if (!template) {
        template = 'Paused at {current}. {completed} of {total} steps already saved offline.';
      }
    } else if (statusType === 'inProgress') {
      template = tourTexts.helpStatusInProgress || '';
      if (!template) {
        template = 'Progress saved offline: {completed} of {total} steps complete. Next: {next}.';
      }
    } else {
      template = tourTexts.helpStatusNotStarted || '';
      if (!template) {
        template = 'Your guided tutorial progress will be saved offline as you go. Next: {next}.';
      }
    }
    var replacements = {
      '{completed}': String(completedCount),
      '{total}': String(total),
      '{next}': nextTitle || activeTitle || '',
      '{current}': activeTitle || nextTitle || '',
      '{step}': activeTitle || nextTitle || ''
    };
    var message = template;
    var tokens = Object.keys(replacements);
    for (var _index2 = 0; _index2 < tokens.length; _index2 += 1) {
      var token = tokens[_index2];
      message = message.split(token).join(replacements[token]);
    }
    statusElement.textContent = message;
    statusElement.hidden = !message;
  }
  function applyHelpButtonLabel() {
    var buttons = collectHelpButtons();
    if (!buttons.length) {
      applyHelpStatus();
      return;
    }
    var state = storedState || loadStoredState();
    var steps = getStepConfig();
    var completedCount = state && Array.isArray(state.completedSteps) ? state.completedSteps.length : 0;
    var labelTemplate = tourTexts.resumeLabelWithProgress || tourTexts.resumeLabel;
    var label;
    if (state && state.completed) {
      label = tourTexts.restartLabel || tourTexts.startLabel || 'Start guided tutorial';
    } else if (state && state.activeStep) {
      if (labelTemplate) {
        label = labelTemplate.replace('{completed}', String(Math.min(completedCount, steps.length))).replace('{total}', String(steps.length));
      }
      if (!label) {
        label = tourTexts.resumeLabel || tourTexts.startLabel || 'Resume guided tutorial';
      }
    } else if (completedCount > 0) {
      if (labelTemplate) {
        label = labelTemplate.replace('{completed}', String(Math.min(completedCount, steps.length))).replace('{total}', String(steps.length));
      }
    } else {
      label = tourTexts.startLabel || 'Start guided tutorial';
    }
    for (var index = 0; index < buttons.length; index += 1) {
      var button = buttons[index];
      if (!button) {
        continue;
      }
      button.textContent = label;
    }
    applyHelpStatus(state, steps);
  }
  function handleHelpButtonClick(event) {
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
    }
    var startFromHelp = function startFromHelp() {
      storedState = loadStoredState();
      var resume = Boolean(storedState && storedState.activeStep);
      startTutorial({
        resume: resume
      });
    };
    var helpDialog = DOCUMENT && typeof DOCUMENT.getElementById === 'function' ? DOCUMENT.getElementById('helpDialog') : null;
    if (helpDialog && typeof isDialogOpen === 'function' && typeof closeDialog === 'function' && isDialogOpen(helpDialog)) {
      closeDialog(helpDialog);
      if (typeof helpDialog.setAttribute === 'function') {
        try {
          helpDialog.setAttribute('hidden', '');
        } catch (error) {
          void error;
        }
      }
      if (helpDialog && _typeof(helpDialog) === 'object' && 'hidden' in helpDialog) {
        try {
          helpDialog.hidden = true;
        } catch (error) {
          void error;
        }
      }
      if (typeof GLOBAL_SCOPE.requestAnimationFrame === 'function') {
        GLOBAL_SCOPE.requestAnimationFrame(function () {
          GLOBAL_SCOPE.requestAnimationFrame(startFromHelp);
        });
      } else {
        setTimeout(startFromHelp, 0);
      }
      return;
    }
    startFromHelp();
  }
  function attachHelpButton() {
    var buttons = collectHelpButtons();
    if (!buttons.length) {
      return;
    }
    for (var index = 0; index < buttons.length; index += 1) {
      var button = buttons[index];
      if (!button) {
        continue;
      }
      button.addEventListener('click', handleHelpButtonClick);
    }
    applyHelpButtonLabel();
  }
  function shouldAutoStart() {
    if (!storedState) {
      return true;
    }
    if (storedState.completed) {
      var completedSet = new Set(Array.isArray(storedState.completedSteps) ? storedState.completedSteps : []);
      var steps = getStepConfig();
      var allStepsCovered = steps.every(function (step) {
        return completedSet.has(step.key);
      });
      if (allStepsCovered) {
        return false;
      }
    }
    if (storedState.skipped) {
      return false;
    }
    return true;
  }
  function scheduleAutoStart() {
    if (!shouldAutoStart()) {
      return;
    }
    setTimeout(function () {
      var resume = storedState && storedState.activeStep;
      startTutorial({
        resume: resume,
        focusStart: true
      });
    }, 600);
  }
  function init() {
    attachHelpButton();
    applyHelpButtonLabel();
    if (shouldAutoStart()) {
      scheduleAutoStart();
    }
  }
  if (DOCUMENT.readyState === 'loading') {
    DOCUMENT.addEventListener('DOMContentLoaded', init, {
      once: true
    });
  } else {
    init();
  }
  function handleFactoryReset() {
    var persisted = saveState({
      version: STORAGE_VERSION
    });
    storedState = persisted || loadStoredState();
    applyHelpButtonLabel();
    if (!active && shouldAutoStart()) {
      scheduleAutoStart();
    }
  }
  if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.addEventListener === 'function') {
    GLOBAL_SCOPE.addEventListener('languagechange', handleLanguageChange);
  }
  function attachFactoryResetListeners() {
    var attached = new Set();
    var candidates = collectCandidateScopes(GLOBAL_SCOPE);
    for (var index = 0; index < candidates.length; index += 1) {
      var scope = candidates[index];
      if (!scope || attached.has(scope)) {
        continue;
      }
      if (typeof scope.addEventListener === 'function') {
        try {
          scope.addEventListener('cameraPowerPlannerFactoryReset', handleFactoryReset);
          attached.add(scope);
        } catch (error) {
          safeWarn('cine.features.onboardingTour could not attach factory reset listener.', error);
        }
      }
    }
    if (DOCUMENT && typeof DOCUMENT.addEventListener === 'function' && !attached.has(DOCUMENT)) {
      try {
        DOCUMENT.addEventListener('cameraPowerPlannerFactoryReset', handleFactoryReset);
        attached.add(DOCUMENT);
      } catch (error) {
        safeWarn('cine.features.onboardingTour could not attach document factory reset listener.', error);
      }
    }
  }
  attachFactoryResetListeners();
  var moduleApi = clone({
    start: startTutorial,
    skip: skipTutorial,
    reset: function reset() {
      var persisted = saveState({
        version: STORAGE_VERSION
      });
      storedState = persisted || loadStoredState();
      applyHelpButtonLabel();
    },
    getStatus: function getStatus() {
      var state = loadStoredState();
      return clone(state);
    },
    isActive: function isActive() {
      return active;
    }
  });
  MODULE_BASE.registerOrQueueModule('cine.features.onboardingTour', moduleApi, {
    category: 'features',
    description: 'Guided onboarding tutorial for Cine Power Planner workflows.',
    replace: true,
    connections: ['cineModuleBase', 'cineUi']
  }, function (error) {
    return safeWarn('Unable to register cine.features.onboardingTour module.', error);
  }, GLOBAL_SCOPE, MODULE_BASE.getModuleRegistry && MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE));
  if (typeof MODULE_BASE.exposeGlobal === 'function') {
    MODULE_BASE.exposeGlobal('cineFeaturesOnboardingTour', moduleApi, GLOBAL_SCOPE, {
      configurable: true,
      enumerable: false,
      writable: false
    });
  } else {
    try {
      GLOBAL_SCOPE.cineFeaturesOnboardingTour = moduleApi;
    } catch (error) {
      void error;
    }
  }
})();