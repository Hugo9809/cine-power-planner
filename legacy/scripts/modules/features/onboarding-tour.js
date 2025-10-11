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
  var DEFAULT_STEP_KEYS = ['intro', 'userProfile', 'nameProject', 'saveProject', 'addCamera', 'addPower', 'generatePlan', 'exportBackup', 'completion'];
  var DEFAULT_STEP_TEXTS = {
    intro: {
      title: 'Welcome to Cine Power Planner',
      body: 'This walkthrough highlights every workflow needed to protect data, generate gear lists and rehearse backups. Press Next to continue or Skip if you prefer to explore on your own.'
    },
    userProfile: {
      title: 'Configure your user profile',
      body: 'Enter your display name, role, phone, email and photo once in this card. Every update syncs to Contacts instantly, stays with your offline saves and keeps exports credited to the correct owner.'
    },
    nameProject: {
      title: 'Name your first project',
      body: 'Enter a project name to anchor autosave, backups and exports. The Next button unlocks once a name is in place so every subsequent step protects that project offline.'
    },
    saveProject: {
      title: 'Save immediately',
      body: 'Press Save (or use Ctrl+S/⌘S/Enter) to capture your named project as an offline snapshot. If a saved setup is already selected the step completes automatically—otherwise click Save to continue.'
    },
    addCamera: {
      title: 'Add your primary camera',
      body: 'Open the Camera dropdown and choose the body you are planning for. Search is available offline inside the list. Next unlocks once a specific model is selected.'
    },
    addPower: {
      title: 'Choose a power source',
      body: 'Pick a battery or DC source that matches the build. Selecting an option updates runtime math instantly and stores the choice with your project snapshot.'
    },
    generatePlan: {
      title: 'Generate your first plan',
      body: 'Use Generate Gear List and Project Requirements to create the printable checklist. This opens the project dialog so you can verify draw totals, runtime and crew notes together.'
    },
    exportBackup: {
      title: 'Export an offline safety copy',
      body: 'Click Export Project or Quick Safeguards to download a JSON backup. Keeping a copy outside the browser ensures the new build survives resets and device swaps.'
    },
    completion: {
      title: "You're ready to plan",
      body: 'Keep Help open whenever you need deeper guidance. Remember to save often, capture backups before major changes and store exports in multiple offline locations.'
    }
  };
  function getElement(selector) {
    if (typeof selector !== 'string' || !selector) {
      return null;
    }
    try {
      return DOCUMENT.querySelector(selector);
    } catch (error) {
      safeWarn('cine.features.onboardingTour could not query selector.', error);
      return null;
    }
  }
  function getFieldValue(element) {
    if (!element) {
      return '';
    }
    if (typeof element.value === 'string') {
      return element.value;
    }
    if (typeof element.textContent === 'string') {
      return element.textContent;
    }
    return '';
  }
  function createFieldCompletionRequirement(selector, predicate, events) {
    var eventList = Array.isArray(events) && events.length ? events : ['input', 'change'];
    return {
      check: function check() {
        var element = getElement(selector);
        if (!element) {
          return false;
        }
        try {
          return Boolean(predicate(getFieldValue(element), element));
        } catch (error) {
          safeWarn('cine.features.onboardingTour could not evaluate field requirement.', error);
          return false;
        }
      },
      attach: function attach(context) {
        var element = getElement(selector);
        if (!element) {
          if (typeof context.complete === 'function') {
            context.complete();
          }
          return function () {};
        }
        var handler = function handler() {
          var matches = false;
          try {
            matches = Boolean(predicate(getFieldValue(element), element));
          } catch (error) {
            safeWarn('cine.features.onboardingTour could not evaluate field change.', error);
            matches = false;
          }
          if (matches) {
            if (typeof context.complete === 'function') {
              context.complete();
            }
          } else if (typeof context.incomplete === 'function') {
            context.incomplete();
          }
        };
        for (var index = 0; index < eventList.length; index += 1) {
          var eventName = eventList[index];
          element.addEventListener(eventName, handler);
        }
        handler();
        return function () {
          for (var _index = 0; _index < eventList.length; _index += 1) {
            var _eventName = eventList[_index];
            element.removeEventListener(_eventName, handler);
          }
        };
      }
    };
  }
  function createClickCompletionRequirement(selectors, options) {
    var normalized = Array.isArray(selectors) ? selectors.slice() : [selectors];
    var eventName = options && typeof options.eventName === 'string' && options.eventName ? options.eventName : 'click';
    var evaluate = typeof (options === null || options === void 0 ? void 0 : options.check) === 'function' ? options.check : null;
    return {
      check: function check() {
        if (!evaluate) {
          return false;
        }
        try {
          return Boolean(evaluate());
        } catch (error) {
          safeWarn('cine.features.onboardingTour could not evaluate click requirement.', error);
          return false;
        }
      },
      attach: function attach(context) {
        var removers = [];
        var elementFound = false;
        var _loop = function _loop() {
          var selector = normalized[index];
          var node = getElement(selector);
          if (!node) {
            return 1;
          }
          elementFound = true;
          var listener = function listener() {
            if (typeof context.complete === 'function') {
              context.complete();
            }
          };
          node.addEventListener(eventName, listener);
          removers.push(function () {
            node.removeEventListener(eventName, listener);
          });
        };
        for (var index = 0; index < normalized.length; index += 1) {
          if (_loop()) continue;
        }
        if (evaluate) {
          var matches = false;
          try {
            matches = Boolean(evaluate());
          } catch (error) {
            safeWarn('cine.features.onboardingTour could not evaluate click requirement after attach.', error);
            matches = false;
          }
          if (matches && typeof context.complete === 'function') {
            context.complete();
          } else if (!matches && typeof context.incomplete === 'function') {
            context.incomplete();
          }
        } else if (!elementFound && typeof context.complete === 'function') {
          context.complete();
        }
        return function () {
          for (var _index2 = 0; _index2 < removers.length; _index2 += 1) {
            try {
              removers[_index2]();
            } catch (error) {
              safeWarn('cine.features.onboardingTour could not detach click requirement.', error);
            }
          }
        };
      }
    };
  }
  function getProjectNameValue() {
    var input = getElement('#setupName');
    return typeof (input === null || input === void 0 ? void 0 : input.value) === 'string' ? input.value.trim() : '';
  }
  function hasSavedSetupForName(name) {
    if (!name) {
      return false;
    }
    var select = getElement('#setupSelect');
    if (!select || !select.options) {
      return false;
    }
    for (var index = 0; index < select.options.length; index += 1) {
      var option = select.options[index];
      if (option && typeof option.value === 'string' && option.value === name) {
        return true;
      }
    }
    return false;
  }
  function createSaveProjectRequirement() {
    return {
      check: function check() {
        return hasSavedSetupForName(getProjectNameValue());
      },
      attach: function attach(context) {
        var removers = [];
        var evaluate = function evaluate() {
          var saved = hasSavedSetupForName(getProjectNameValue());
          if (saved) {
            if (typeof context.complete === 'function') {
              context.complete();
            }
          } else if (typeof context.incomplete === 'function') {
            context.incomplete();
          }
        };
        var saveButton = getElement('#saveSetupBtn');
        if (saveButton) {
          var handleClick = function handleClick() {
            setTimeout(evaluate, 50);
          };
          saveButton.addEventListener('click', handleClick);
          removers.push(function () {
            saveButton.removeEventListener('click', handleClick);
          });
        }
        var setupSelect = getElement('#setupSelect');
        if (setupSelect) {
          var handleChange = function handleChange() {
            evaluate();
          };
          setupSelect.addEventListener('change', handleChange);
          removers.push(function () {
            setupSelect.removeEventListener('change', handleChange);
          });
        }
        var nameInput = getElement('#setupName');
        if (nameInput) {
          var handleInput = function handleInput() {
            evaluate();
          };
          nameInput.addEventListener('input', handleInput);
          removers.push(function () {
            nameInput.removeEventListener('input', handleInput);
          });
        }
        evaluate();
        return function () {
          for (var index = 0; index < removers.length; index += 1) {
            try {
              removers[index]();
            } catch (error) {
              safeWarn('cine.features.onboardingTour could not detach save requirement.', error);
            }
          }
        };
      }
    };
  }
  var STEP_COMPLETION_REQUIREMENTS = {
    nameProject: createFieldCompletionRequirement('#setupName', function (value) {
      return value.trim().length > 0;
    }, ['input', 'change']),
    saveProject: createSaveProjectRequirement(),
    addCamera: createFieldCompletionRequirement('#cameraSelect', function (value) {
      return value && value !== 'None';
    }, ['change']),
    addPower: createFieldCompletionRequirement('#batterySelect', function (value) {
      return value && value !== 'None';
    }, ['change']),
    generatePlan: createClickCompletionRequirement('#generateGearListBtn'),
    exportBackup: createClickCompletionRequirement(['#shareSetupBtn', '#storageBackupNow'])
  };
  var STEP_SIGNATURE = DEFAULT_STEP_KEYS.join('|');
  function getTimestamp() {
    if (typeof Date !== 'undefined' && typeof Date.now === 'function') {
      return Date.now();
    }
    try {
      return new Date().getTime();
    } catch (error) {
      void error;
    }
    return 0;
  }
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
      snapshot.timestamp = getTimestamp();
    }
    snapshot.lastCompletedStep = typeof snapshot.lastCompletedStep === 'string' && snapshot.lastCompletedStep ? snapshot.lastCompletedStep : null;
    if (snapshot.lastCompletedStep && allowedKeys.indexOf(snapshot.lastCompletedStep) === -1) {
      snapshot.lastCompletedStep = null;
    }
    snapshot.lastCompletedAt = typeof snapshot.lastCompletedAt === 'number' && !Number.isNaN(snapshot.lastCompletedAt) ? snapshot.lastCompletedAt : null;
    if (signature !== STEP_SIGNATURE) {
      snapshot.lastCompletedStep = null;
      snapshot.lastCompletedAt = snapshot.timestamp;
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
      timestamp: getTimestamp()
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
      var defaultEntry = DEFAULT_STEP_TEXTS[key] || {
        title: key,
        body: ''
      };
      var fallbackEntry = fallback.steps && fallback.steps[key];
      var localEntry = localized.steps && localized.steps[key];
      var resolvedTitle = localEntry && typeof localEntry.title === 'string' && localEntry.title || fallbackEntry && typeof fallbackEntry.title === 'string' && fallbackEntry.title || (typeof defaultEntry.title === 'string' ? defaultEntry.title : key);
      var resolvedBody = localEntry && typeof localEntry.body === 'string' && localEntry.body || fallbackEntry && typeof fallbackEntry.body === 'string' && fallbackEntry.body || (typeof defaultEntry.body === 'string' ? defaultEntry.body : '');
      steps[key] = {
        title: resolvedTitle,
        body: resolvedBody
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
      key: 'userProfile',
      highlight: null
    }, {
      key: 'nameProject',
      highlight: '#setupName',
      focus: '#setupName'
    }, {
      key: 'saveProject',
      highlight: '#saveSetupBtn'
    }, {
      key: 'addCamera',
      highlight: '#cameraSelect'
    }, {
      key: 'addPower',
      highlight: '#batterySelect'
    }, {
      key: 'generatePlan',
      highlight: '#generateGearListBtn'
    }, {
      key: 'exportBackup',
      highlight: '#shareSetupBtn',
      alternateHighlight: '#storageBackupNow'
    }, {
      key: 'completion',
      highlight: null
    }];
  }
  var stepConfig = getStepConfig();
  var overlayRoot = null;
  var highlightEl = null;
  var activeTargetElement = null;
  var cardEl = null;
  var titleEl = null;
  var bodyEl = null;
  var progressEl = null;
  var progressMeterEl = null;
  var progressMeterFillEl = null;
  var stepListEl = null;
  var resumeHintEl = null;
  var interactionContainerEl = null;
  var helpStatusEl = null;
  var backButton = null;
  var nextButton = null;
  var skipButton = null;
  var helpButtonListenerAttached = false;
  var delegatedHelpListener = null;
  var active = false;
  var currentIndex = -1;
  var currentStep = null;
  var pendingFrame = null;
  var scrollStateTimer = null;
  var autoOpenedSettings = false;
  var settingsDialogRef = null;
  var resumeHintVisible = false;
  var resumeStartIndex = null;
  var activeRequirementCleanup = null;
  var activeRequirementCompleted = false;
  var activeInteractionCleanup = null;
  var interactionIdCounter = 0;
  var lastCardPlacement = 'floating';
  function nextInteractionId(suffix) {
    interactionIdCounter += 1;
    var safeSuffix = typeof suffix === 'string' && suffix ? suffix : 'field';
    return "onboarding-".concat(safeSuffix, "-").concat(interactionIdCounter);
  }
  function setNextButtonDisabled(disabled) {
    if (!nextButton) {
      return;
    }
    nextButton.disabled = !!disabled;
    if (disabled) {
      nextButton.setAttribute('aria-disabled', 'true');
      nextButton.classList.add('onboarding-next-disabled');
    } else {
      nextButton.setAttribute('aria-disabled', 'false');
      nextButton.classList.remove('onboarding-next-disabled');
    }
  }
  function teardownStepRequirement() {
    if (typeof activeRequirementCleanup === 'function') {
      try {
        activeRequirementCleanup();
      } catch (error) {
        safeWarn('cine.features.onboardingTour could not detach active requirement.', error);
      }
    }
    activeRequirementCleanup = null;
    activeRequirementCompleted = false;
    setNextButtonDisabled(false);
  }
  function teardownStepInteraction() {
    if (typeof activeInteractionCleanup === 'function') {
      try {
        activeInteractionCleanup();
      } catch (error) {
        safeWarn('cine.features.onboardingTour could not detach active interaction.', error);
      }
    }
    activeInteractionCleanup = null;
    if (interactionContainerEl) {
      while (interactionContainerEl.firstChild) {
        interactionContainerEl.removeChild(interactionContainerEl.firstChild);
      }
      interactionContainerEl.hidden = true;
    }
  }
  function applyStepRequirement(step) {
    if (!nextButton) {
      return;
    }
    var requirement = step ? STEP_COMPLETION_REQUIREMENTS[step.key] : null;
    if (!requirement) {
      activeRequirementCompleted = true;
      setNextButtonDisabled(false);
      activeRequirementCleanup = null;
      return;
    }
    var initialComplete = typeof requirement.check === 'function' ? requirement.check() : false;
    activeRequirementCompleted = initialComplete;
    setNextButtonDisabled(!initialComplete);
    if (typeof requirement.attach !== 'function') {
      return;
    }
    var cleanup = requirement.attach({
      complete: function complete() {
        if (!active || currentStep !== step) {
          return;
        }
        if (!activeRequirementCompleted) {
          activeRequirementCompleted = true;
          setNextButtonDisabled(false);
        }
      },
      incomplete: function incomplete() {
        if (!active || currentStep !== step) {
          return;
        }
        if (activeRequirementCompleted) {
          activeRequirementCompleted = false;
        }
        setNextButtonDisabled(true);
      }
    });
    activeRequirementCleanup = typeof cleanup === 'function' ? cleanup : null;
  }
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
  function clearScrollStateTimer() {
    if (scrollStateTimer === null) {
      return;
    }
    if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.clearTimeout === 'function') {
      GLOBAL_SCOPE.clearTimeout(scrollStateTimer);
    } else {
      clearTimeout(scrollStateTimer);
    }
    scrollStateTimer = null;
  }
  function clearScrollState() {
    clearScrollStateTimer();
    if (overlayRoot && overlayRoot.classList && typeof overlayRoot.classList.remove === 'function') {
      overlayRoot.classList.remove('onboarding-scroll-active');
    }
  }
  function markScrollActive() {
    if (!overlayRoot || !overlayRoot.classList || typeof overlayRoot.classList.add !== 'function') {
      return;
    }
    overlayRoot.classList.add('onboarding-scroll-active');
    clearScrollStateTimer();
    var release = function release() {
      scrollStateTimer = null;
      if (overlayRoot && overlayRoot.classList && typeof overlayRoot.classList.remove === 'function') {
        overlayRoot.classList.remove('onboarding-scroll-active');
      }
    };
    if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.setTimeout === 'function') {
      scrollStateTimer = GLOBAL_SCOPE.setTimeout(release, 150);
    } else {
      scrollStateTimer = setTimeout(release, 150);
    }
  }
  function handleGlobalScroll() {
    if (!active) {
      return;
    }
    markScrollActive();
    schedulePositionUpdate();
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
    clearScrollState();
    interactionIdCounter = 0;
    highlightEl = DOCUMENT.createElement('div');
    highlightEl.className = 'onboarding-highlight';
    highlightEl.setAttribute('aria-hidden', 'true');
    overlayRoot.appendChild(highlightEl);
    cardEl = DOCUMENT.createElement('section');
    cardEl.className = 'onboarding-card';
    cardEl.setAttribute('data-placement', 'floating');
    cardEl.setAttribute('role', 'dialog');
    cardEl.setAttribute('aria-modal', 'false');
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
    interactionContainerEl = DOCUMENT.createElement('div');
    interactionContainerEl.className = 'onboarding-interaction';
    interactionContainerEl.hidden = true;
    cardEl.appendChild(interactionContainerEl);
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
    clearScrollState();
    clearActiveTargetElement();
    if (overlayRoot && overlayRoot.parentNode) {
      overlayRoot.parentNode.removeChild(overlayRoot);
    }
    overlayRoot = null;
    highlightEl = null;
    cardEl = null;
    titleEl = null;
    bodyEl = null;
    progressEl = null;
    progressMeterEl = null;
    progressMeterFillEl = null;
    stepListEl = null;
    resumeHintEl = null;
    interactionContainerEl = null;
    backButton = null;
    nextButton = null;
    skipButton = null;
    resumeHintVisible = false;
    resumeStartIndex = null;
    activeInteractionCleanup = null;
    interactionIdCounter = 0;
    lastCardPlacement = 'floating';
  }
  function formatStepIndicator(index, total) {
    var template = typeof tourTexts.stepIndicator === 'string' ? tourTexts.stepIndicator : 'Step {current} of {total}';
    var current = index + 1;
    return template.replace('{current}', current).replace('{total}', total);
  }
  function focusCard() {
    var target = getTargetElement(currentStep);
    if (target && typeof target.focus === 'function' && !target.hasAttribute('disabled')) {
      try {
        target.focus({
          preventScroll: true
        });
        return;
      } catch (error) {
        void error;
        try {
          target.focus();
          return;
        } catch (focusError) {
          void focusError;
        }
      }
    }
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
  function clearActiveTargetElement() {
    if (activeTargetElement && _typeof(activeTargetElement.classList) === 'object') {
      activeTargetElement.classList.remove('onboarding-active-target');
    }
    activeTargetElement = null;
  }
  function updateHighlightPosition() {
    if (!highlightEl) {
      return;
    }
    var target = getTargetElement(currentStep);
    if (!target) {
      if (activeTargetElement) {
        clearActiveTargetElement();
      }
      highlightEl.style.transform = 'scale(0)';
      highlightEl.style.opacity = '0';
      positionCard(null, null);
      return;
    }
    if (target !== activeTargetElement) {
      clearActiveTargetElement();
      activeTargetElement = target;
      if (_typeof(target.classList) === 'object') {
        target.classList.add('onboarding-active-target');
      }
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
    positionCard(target, rect);
  }
  function positionCard(target, targetRect) {
    if (!cardEl) {
      return;
    }
    var viewportWidth = GLOBAL_SCOPE.innerWidth || DOCUMENT.documentElement.clientWidth || 0;
    var viewportHeight = GLOBAL_SCOPE.innerHeight || DOCUMENT.documentElement.clientHeight || 0;
    var targetElement = target || getTargetElement(currentStep);
    var resolvedRect = targetRect || (targetElement ? targetElement.getBoundingClientRect() : null);
    var cardRect = cardEl.getBoundingClientRect();
    var scrollX = GLOBAL_SCOPE.scrollX || GLOBAL_SCOPE.pageXOffset || 0;
    var scrollY = GLOBAL_SCOPE.scrollY || GLOBAL_SCOPE.pageYOffset || 0;
    var margin = 16;
    var viewportRight = scrollX + viewportWidth;
    var viewportBottom = scrollY + viewportHeight;
    var minLeft = scrollX + margin;
    var minTop = scrollY + margin;
    var maxLeft = Math.max(minLeft, viewportRight - cardRect.width - margin);
    var maxTop = Math.max(minTop, viewportBottom - cardRect.height - margin);
    var top = scrollY + Math.max(margin, (viewportHeight - cardRect.height) / 2);
    var left = scrollX + Math.max(margin, (viewportWidth - cardRect.width) / 2);
    var placement = 'floating';
    if (targetElement && resolvedRect) {
      var rect = resolvedRect;
      var targetTop = rect.top + scrollY;
      var targetLeft = rect.left + scrollX;
      var targetCenterX = targetLeft + rect.width / 2;
      var targetCenterY = targetTop + rect.height / 2;
      var options = [{
        name: 'bottom',
        top: targetTop + rect.height + margin,
        left: targetCenterX - cardRect.width / 2,
        fits: targetTop + rect.height + margin + cardRect.height <= viewportBottom - margin
      }, {
        name: 'top',
        top: targetTop - cardRect.height - margin,
        left: targetCenterX - cardRect.width / 2,
        fits: targetTop - cardRect.height - margin >= minTop
      }, {
        name: 'right',
        top: targetCenterY - cardRect.height / 2,
        left: targetLeft + rect.width + margin,
        fits: targetLeft + rect.width + margin + cardRect.width <= viewportRight - margin
      }, {
        name: 'left',
        top: targetCenterY - cardRect.height / 2,
        left: targetLeft - cardRect.width - margin,
        fits: targetLeft - cardRect.width - margin >= minLeft
      }];
      var resolvedOptions = [];
      for (var optionIndex = 0; optionIndex < options.length; optionIndex += 1) {
        var option = options[optionIndex];
        var clampedTop = Math.min(Math.max(option.top, minTop), maxTop);
        var clampedLeft = Math.min(Math.max(option.left, minLeft), maxLeft);
        resolvedOptions.push({
          name: option.name,
          top: option.top,
          left: option.left,
          fits: option.fits,
          clampedTop: clampedTop,
          clampedLeft: clampedLeft,
          overflow: Math.abs(clampedTop - option.top) + Math.abs(clampedLeft - option.left)
        });
      }
      var chosen = null;
      for (var resolvedIndex = 0; resolvedIndex < resolvedOptions.length; resolvedIndex += 1) {
        if (resolvedOptions[resolvedIndex].fits) {
          chosen = resolvedOptions[resolvedIndex];
          break;
        }
      }
      if (!chosen) {
        for (var fallbackIndex = 0; fallbackIndex < resolvedOptions.length; fallbackIndex += 1) {
          var candidate = resolvedOptions[fallbackIndex];
          if (!chosen || candidate.overflow < chosen.overflow) {
            chosen = candidate;
          }
        }
      }
      if (chosen) {
        top = chosen.clampedTop;
        left = chosen.clampedLeft;
        placement = chosen.name;
      }
    }
    top = Math.min(Math.max(top, minTop), maxTop);
    left = Math.min(Math.max(left, minLeft), maxLeft);
    cardEl.style.top = "".concat(top, "px");
    cardEl.style.left = "".concat(left, "px");
    if (placement !== lastCardPlacement) {
      lastCardPlacement = placement;
      cardEl.setAttribute('data-placement', placement);
    }
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
  function resolveLabelText(selector, fallback) {
    if (typeof selector === 'string' && selector) {
      var labelElement = DOCUMENT.querySelector(selector);
      if (labelElement && typeof labelElement.textContent === 'string') {
        var trimmed = labelElement.textContent.trim();
        if (trimmed) {
          return trimmed;
        }
      }
    }
    return typeof fallback === 'string' ? fallback : '';
  }
  function resolveButtonLabel(element, fallback) {
    if (element && typeof element.textContent === 'string') {
      var trimmed = element.textContent.trim();
      if (trimmed) {
        return trimmed;
      }
    }
    return typeof fallback === 'string' ? fallback : '';
  }
  function dispatchEventSafe(target, type) {
    if (!target || typeof target.dispatchEvent !== 'function') {
      return;
    }
    try {
      var event = new Event(type, {
        bubbles: true
      });
      target.dispatchEvent(event);
    } catch (error) {
      safeWarn('cine.features.onboardingTour could not dispatch guided event.', error);
    }
  }
  function renderUserProfileInteraction(registerCleanup) {
    if (!interactionContainerEl) {
      return false;
    }
    var profileInput = DOCUMENT.getElementById('userProfileName');
    var profileLabel = DOCUMENT.getElementById('userProfileNameLabel');
    var roleInput = DOCUMENT.getElementById('userProfileRole');
    var roleLabel = DOCUMENT.getElementById('userProfileRoleLabel');
    var phoneInput = DOCUMENT.getElementById('userProfilePhone');
    var phoneLabel = DOCUMENT.getElementById('userProfilePhoneLabel');
    var emailInput = DOCUMENT.getElementById('userProfileEmail');
    var emailLabel = DOCUMENT.getElementById('userProfileEmailLabel');
    var avatarContainer = DOCUMENT.getElementById('userProfileAvatar');
    var avatarButton = DOCUMENT.getElementById('userProfileAvatarButton');
    var avatarButtonLabel = DOCUMENT.getElementById('userProfileAvatarButtonLabel');
    var fragment = DOCUMENT.createDocumentFragment();
    var intro = DOCUMENT.createElement('p');
    intro.className = 'onboarding-resume-hint';
    intro.textContent = 'Add your display name, role, phone, email and photo here once. Updates sync to Contacts instantly, stay cached offline and flow into exports so crews always know who owns the setup.';
    fragment.appendChild(intro);
    var avatarGroup = DOCUMENT.createElement('div');
    avatarGroup.className = 'onboarding-avatar-group';
    var avatarPreview = DOCUMENT.createElement('div');
    avatarPreview.className = 'onboarding-avatar-preview';
    avatarGroup.appendChild(avatarPreview);
    var renderAvatarInitial = function renderAvatarInitial(value) {
      var span = DOCUMENT.createElement('span');
      span.className = 'contact-card-avatar-initial';
      span.textContent = value || '•';
      avatarPreview.appendChild(span);
    };
    var getNameInitial = function getNameInitial() {
      var raw = profileInput && typeof profileInput.value === 'string' ? profileInput.value.trim() : '';
      return raw ? raw.charAt(0).toUpperCase() : '•';
    };
    var updateAvatarPreview = function updateAvatarPreview() {
      while (avatarPreview.firstChild) {
        avatarPreview.removeChild(avatarPreview.firstChild);
      }
      if (avatarContainer) {
        var visual = avatarContainer.querySelector('.contact-card-avatar-visual');
        if (visual) {
          var currentImage = visual.querySelector('img');
          if (currentImage && currentImage.src) {
            var img = DOCUMENT.createElement('img');
            img.src = currentImage.src;
            img.alt = '';
            avatarPreview.appendChild(img);
            return;
          }
          var text = visual.textContent ? visual.textContent.trim() : '';
          if (text) {
            renderAvatarInitial(text.charAt(0).toUpperCase());
            return;
          }
        }
      }
      renderAvatarInitial(getNameInitial());
    };
    updateAvatarPreview();
    var avatarObserver = null;
    if (GLOBAL_SCOPE.MutationObserver && avatarContainer) {
      try {
        avatarObserver = new GLOBAL_SCOPE.MutationObserver(function () {
          return updateAvatarPreview();
        });
        avatarObserver.observe(avatarContainer, { childList: true, subtree: true, attributes: true });
        registerCleanup(function () {
          try {
            avatarObserver.disconnect();
          } catch (error) {
            void error;
          }
        });
      } catch (error) {
        void error;
      }
    }
    var rawAvatarActionLabel = avatarButtonLabel && typeof avatarButtonLabel.textContent === 'string' ? avatarButtonLabel.textContent.trim() : '';
    var avatarActionLabel = !rawAvatarActionLabel ? 'Add profile Picture' : rawAvatarActionLabel.toLowerCase() === 'change photo' ? 'Add profile Picture' : rawAvatarActionLabel;
    var avatarAction = DOCUMENT.createElement('button');
    avatarAction.type = 'button';
    avatarAction.className = 'onboarding-interaction-button onboarding-avatar-button';
    avatarAction.textContent = avatarActionLabel;
    var handleAvatarActionClick = function handleAvatarActionClick() {
      if (avatarButton && typeof avatarButton.click === 'function') {
        try {
          avatarButton.click();
        } catch (error) {
          safeWarn('cine.features.onboardingTour could not open avatar options.', error);
        }
      }
    };
    avatarAction.addEventListener('click', handleAvatarActionClick);
    registerCleanup(function () {
      avatarAction.removeEventListener('click', handleAvatarActionClick);
    });
    avatarGroup.appendChild(avatarAction);
    fragment.appendChild(avatarGroup);
    var firstProxyField = null;
    var createProxyField = function createProxyField(options) {
      var fieldKey = options && options.fieldKey ? options.fieldKey : 'field';
      var labelText = options && options.labelText ? options.labelText : '';
      var placeholder = options && options.placeholder ? options.placeholder : '';
      var target = options ? options.target : null;
      var type = options && options.type ? options.type : 'text';
      var autocomplete = options && options.autocomplete ? options.autocomplete : '';
      var onAfterSync = options && typeof options.onAfterSync === 'function' ? options.onAfterSync : null;
      var group = DOCUMENT.createElement('div');
      group.className = 'onboarding-field-group';
      var proxyId = nextInteractionId(fieldKey);
      var label = DOCUMENT.createElement('label');
      label.className = 'onboarding-field-label';
      label.setAttribute('for', proxyId);
      label.textContent = labelText;
      group.appendChild(label);
      var proxyInput = DOCUMENT.createElement('input');
      proxyInput.type = type;
      proxyInput.id = proxyId;
      proxyInput.className = 'onboarding-field-input';
      if (placeholder) {
        proxyInput.placeholder = placeholder;
      }
      if (autocomplete) {
        proxyInput.setAttribute('autocomplete', autocomplete);
      }
      proxyInput.value = target && typeof target.value === 'string' ? target.value : '';
      var syncFromTarget = function syncFromTarget() {
        if (!target) {
          return;
        }
        if (proxyInput.value !== target.value) {
          proxyInput.value = target.value || '';
        }
        if (onAfterSync) {
          onAfterSync('from');
        }
      };
      var syncToTarget = function syncToTarget() {
        if (!target) {
          return;
        }
        if (target.value !== proxyInput.value) {
          target.value = proxyInput.value;
          dispatchEventSafe(target, 'input');
          dispatchEventSafe(target, 'change');
        }
        if (onAfterSync) {
          onAfterSync('to');
        }
      };
      proxyInput.addEventListener('input', syncToTarget);
      proxyInput.addEventListener('change', syncToTarget);
      registerCleanup(function () {
        proxyInput.removeEventListener('input', syncToTarget);
        proxyInput.removeEventListener('change', syncToTarget);
      });
      if (target) {
        target.addEventListener('input', syncFromTarget);
        target.addEventListener('change', syncFromTarget);
        registerCleanup(function () {
          target.removeEventListener('input', syncFromTarget);
          target.removeEventListener('change', syncFromTarget);
        });
      } else {
        proxyInput.disabled = true;
        proxyInput.setAttribute('aria-disabled', 'true');
      }
      group.appendChild(proxyInput);
      fragment.appendChild(group);
      if (!firstProxyField) {
        firstProxyField = proxyInput;
      }
      return proxyInput;
    };
    var resolvedNameLabel = profileLabel && typeof profileLabel.textContent === 'string' ? profileLabel.textContent : 'Display name';
    var resolvedNamePlaceholder = profileInput && typeof profileInput.getAttribute === 'function' && profileInput.getAttribute('placeholder') ? profileInput.getAttribute('placeholder') : 'e.g. Alex Rivera';
    var nameProxy = createProxyField({
      fieldKey: 'user-profile-name',
      labelText: resolvedNameLabel,
      placeholder: resolvedNamePlaceholder,
      target: profileInput,
      type: 'text',
      autocomplete: 'name',
      onAfterSync: function onAfterSync() {
        updateAvatarPreview();
      }
    });
    var resolvedRoleLabel = roleLabel && typeof roleLabel.textContent === 'string' ? roleLabel.textContent : 'Role or title';
    var resolvedRolePlaceholder = roleInput && typeof roleInput.getAttribute === 'function' && roleInput.getAttribute('placeholder') ? roleInput.getAttribute('placeholder') : 'e.g. 1st AC';
    createProxyField({
      fieldKey: 'user-profile-role',
      labelText: resolvedRoleLabel,
      placeholder: resolvedRolePlaceholder,
      target: roleInput,
      type: 'text',
      autocomplete: 'organization-title'
    });
    var resolvedPhoneLabel = phoneLabel && typeof phoneLabel.textContent === 'string' ? phoneLabel.textContent : 'Phone number';
    var resolvedPhonePlaceholder = phoneInput && typeof phoneInput.getAttribute === 'function' && phoneInput.getAttribute('placeholder') ? phoneInput.getAttribute('placeholder') : '';
    createProxyField({
      fieldKey: 'user-profile-phone',
      labelText: resolvedPhoneLabel,
      placeholder: resolvedPhonePlaceholder,
      target: phoneInput,
      type: 'tel',
      autocomplete: 'tel'
    });
    var resolvedEmailLabel = emailLabel && typeof emailLabel.textContent === 'string' ? emailLabel.textContent : 'Email address';
    var resolvedEmailPlaceholder = emailInput && typeof emailInput.getAttribute === 'function' && emailInput.getAttribute('placeholder') ? emailInput.getAttribute('placeholder') : '';
    createProxyField({
      fieldKey: 'user-profile-email',
      labelText: resolvedEmailLabel,
      placeholder: resolvedEmailPlaceholder,
      target: emailInput,
      type: 'email',
      autocomplete: 'email'
    });
    var skipHint = DOCUMENT.createElement('p');
    skipHint.className = 'onboarding-resume-hint';
    skipHint.textContent = 'Press Next when you are ready—Contacts in the sidebar always shows these saved details without resetting tutorial progress.';
    fragment.appendChild(skipHint);
    while (interactionContainerEl.firstChild) {
      interactionContainerEl.removeChild(interactionContainerEl.firstChild);
    }
    interactionContainerEl.appendChild(fragment);
    interactionContainerEl.hidden = false;
    var focusTarget = firstProxyField || nameProxy;
    if (focusTarget && typeof focusTarget.focus === 'function') {
      var focusRunner = function focusRunner() {
        try {
          focusTarget.focus({ preventScroll: true });
        } catch (error) {
          void error;
          try {
            focusTarget.focus();
          } catch (focusError) {
            void focusError;
          }
        }
      };
      if (typeof queueMicrotask === 'function') {
        queueMicrotask(focusRunner);
      } else {
        setTimeout(focusRunner, 0);
      }
    }
    return true;
  }
  function renderNameProjectInteraction(registerCleanup) {
    if (!interactionContainerEl) {
      return false;
    }
    var realInput = getElement('#setupName');
    var group = DOCUMENT.createElement('div');
    group.className = 'onboarding-field-group';
    var inputId = nextInteractionId('project-name');
    var label = DOCUMENT.createElement('label');
    label.className = 'onboarding-field-label';
    label.setAttribute('for', inputId);
    label.textContent = resolveLabelText("label[for='setupName']", 'Project name');
    var input = DOCUMENT.createElement('input');
    input.type = 'text';
    input.id = inputId;
    input.className = 'onboarding-field-input';
    if (realInput && typeof realInput.placeholder === 'string') {
      input.placeholder = realInput.placeholder;
    }
    if (realInput && typeof realInput.maxLength === 'number' && realInput.maxLength > 0) {
      input.maxLength = realInput.maxLength;
    }
    if (realInput && typeof realInput.autocomplete === 'string') {
      input.setAttribute('autocomplete', realInput.autocomplete);
    }
    if (realInput && realInput.required) {
      input.required = true;
    }
    input.value = typeof (realInput === null || realInput === void 0 ? void 0 : realInput.value) === 'string' ? realInput.value : '';
    group.appendChild(label);
    group.appendChild(input);
    interactionContainerEl.appendChild(group);
    interactionContainerEl.hidden = false;
    if (!realInput) {
      input.disabled = true;
      input.setAttribute('aria-disabled', 'true');
      return true;
    }
    var syncFromReal = function syncFromReal() {
      if (typeof realInput.value === 'string' && input.value !== realInput.value) {
        input.value = realInput.value;
      }
      if (realInput.disabled && !input.disabled) {
        input.disabled = true;
        input.setAttribute('aria-disabled', 'true');
      } else if (!realInput.disabled && input.disabled) {
        input.disabled = false;
        input.removeAttribute('aria-disabled');
      }
    };
    var syncToReal = function syncToReal() {
      if (realInput.value !== input.value) {
        realInput.value = input.value;
      }
      dispatchEventSafe(realInput, 'input');
      dispatchEventSafe(realInput, 'change');
    };
    input.addEventListener('input', syncToReal);
    registerCleanup(function () {
      input.removeEventListener('input', syncToReal);
    });
    realInput.addEventListener('input', syncFromReal);
    realInput.addEventListener('change', syncFromReal);
    registerCleanup(function () {
      realInput.removeEventListener('input', syncFromReal);
      realInput.removeEventListener('change', syncFromReal);
    });
    syncFromReal();
    var focusInput = function focusInput() {
      try {
        if (!input.disabled) {
          input.focus();
          if (input.value && typeof input.setSelectionRange === 'function') {
            input.setSelectionRange(0, input.value.length);
          }
        }
      } catch (error) {
        void error;
      }
    };
    if (typeof queueMicrotask === 'function') {
      queueMicrotask(focusInput);
    } else {
      setTimeout(focusInput, 0);
    }
    return true;
  }
  function renderSelectInteraction(config, registerCleanup) {
    if (!interactionContainerEl) {
      return false;
    }
    var realSelect = getElement(config.selector);
    if (!realSelect) {
      return false;
    }
    var group = DOCUMENT.createElement('div');
    group.className = 'onboarding-field-group';
    var selectId = nextInteractionId(config.suffix || 'select');
    var label = DOCUMENT.createElement('label');
    label.className = 'onboarding-field-label';
    label.setAttribute('for', selectId);
    label.textContent = resolveLabelText(config.labelSelector, config.fallbackLabel);
    var select = DOCUMENT.createElement('select');
    select.id = selectId;
    select.className = 'onboarding-field-select';
    if (realSelect && realSelect.multiple) {
      select.multiple = true;
    }
    if (realSelect && typeof realSelect.size === 'number' && realSelect.size > 0) {
      select.size = realSelect.size;
    }
    var syncFromReal = function syncFromReal() {
      if (!realSelect) {
        return;
      }
      var referenceHTML = realSelect.innerHTML;
      if (select.innerHTML !== referenceHTML) {
        select.innerHTML = referenceHTML;
      }
      if (select.value !== realSelect.value) {
        select.value = realSelect.value;
      }
      if (select.disabled !== realSelect.disabled) {
        select.disabled = realSelect.disabled;
        if (select.disabled) {
          select.setAttribute('aria-disabled', 'true');
        } else {
          select.removeAttribute('aria-disabled');
        }
      }
    };
    syncFromReal();
    var syncToReal = function syncToReal() {
      if (!realSelect) {
        return;
      }
      if (realSelect.value !== select.value) {
        realSelect.value = select.value;
      }
      dispatchEventSafe(realSelect, 'input');
      dispatchEventSafe(realSelect, 'change');
    };
    select.addEventListener('change', syncToReal);
    select.addEventListener('input', syncToReal);
    registerCleanup(function () {
      select.removeEventListener('change', syncToReal);
      select.removeEventListener('input', syncToReal);
    });
    realSelect.addEventListener('change', syncFromReal);
    realSelect.addEventListener('input', syncFromReal);
    registerCleanup(function () {
      realSelect.removeEventListener('change', syncFromReal);
      realSelect.removeEventListener('input', syncFromReal);
    });
    var observer = null;
    if (typeof MutationObserver === 'function') {
      try {
        observer = new MutationObserver(function () {
          syncFromReal();
        });
        observer.observe(realSelect, {
          childList: true,
          subtree: true,
          attributes: true
        });
        registerCleanup(function () {
          observer.disconnect();
        });
      } catch (error) {
        safeWarn('cine.features.onboardingTour could not observe select changes.', error);
        if (observer) {
          observer.disconnect();
        }
      }
    }
    group.appendChild(label);
    group.appendChild(select);
    interactionContainerEl.appendChild(group);
    interactionContainerEl.hidden = false;
    var focusSelect = function focusSelect() {
      try {
        if (!select.disabled) {
          select.focus();
        }
      } catch (error) {
        void error;
      }
    };
    if (typeof queueMicrotask === 'function') {
      queueMicrotask(focusSelect);
    } else {
      setTimeout(focusSelect, 0);
    }
    return true;
  }
  function createGuidedButton(selector, fallbackLabel, registerCleanup) {
    var realButton = getElement(selector);
    if (!realButton) {
      return null;
    }
    var button = DOCUMENT.createElement('button');
    button.type = 'button';
    button.className = 'onboarding-interaction-button';
    button.textContent = resolveButtonLabel(realButton, fallbackLabel);
    var realAriaLabel = typeof realButton.getAttribute === 'function' ? realButton.getAttribute('aria-label') : null;
    if (realAriaLabel) {
      button.setAttribute('aria-label', realAriaLabel);
    }
    var handleClick = function handleClick() {
      try {
        if (typeof realButton.focus === 'function') {
          realButton.focus({
            preventScroll: true
          });
        }
      } catch (error) {
        void error;
      }
      try {
        realButton.click();
      } catch (error) {
        safeWarn('cine.features.onboardingTour could not activate guided button.', error);
      }
    };
    button.addEventListener('click', handleClick);
    registerCleanup(function () {
      button.removeEventListener('click', handleClick);
    });
    var syncDisabled = function syncDisabled() {
      var ariaDisabled = typeof realButton.getAttribute === 'function' ? realButton.getAttribute('aria-disabled') : null;
      var disabled = !!realButton.disabled || ariaDisabled === 'true';
      button.disabled = disabled;
      if (disabled) {
        button.setAttribute('aria-disabled', 'true');
      } else {
        button.removeAttribute('aria-disabled');
      }
    };
    syncDisabled();
    var observer = null;
    if (typeof MutationObserver === 'function') {
      try {
        observer = new MutationObserver(syncDisabled);
        observer.observe(realButton, {
          attributes: true,
          attributeFilter: ['disabled', 'aria-disabled']
        });
        registerCleanup(function () {
          observer.disconnect();
        });
      } catch (error) {
        safeWarn('cine.features.onboardingTour could not observe guided button state.', error);
        if (observer) {
          observer.disconnect();
        }
      }
    }
    return button;
  }
  function appendActionRow(buttons) {
    if (!interactionContainerEl || !Array.isArray(buttons)) {
      return false;
    }
    var row = DOCUMENT.createElement('div');
    row.className = 'onboarding-interaction-actions';
    var appended = false;
    for (var index = 0; index < buttons.length; index += 1) {
      var button = buttons[index];
      if (button) {
        row.appendChild(button);
        appended = true;
      }
    }
    if (!appended) {
      return false;
    }
    interactionContainerEl.appendChild(row);
    interactionContainerEl.hidden = false;
    return true;
  }
  function renderSaveProjectInteraction(registerCleanup) {
    var saveButton = createGuidedButton('#saveSetupBtn', 'Save project', registerCleanup);
    if (!saveButton) {
      return false;
    }
    return appendActionRow([saveButton]);
  }
  function renderGeneratePlanInteraction(registerCleanup) {
    var generateButton = createGuidedButton('#generateGearListBtn', 'Generate plan', registerCleanup);
    if (!generateButton) {
      return false;
    }
    return appendActionRow([generateButton]);
  }
  function renderExportBackupInteraction(registerCleanup) {
    var exportButton = createGuidedButton('#shareSetupBtn', 'Export project', registerCleanup);
    var backupButton = createGuidedButton('#storageBackupNow', 'Quick safeguard', registerCleanup);
    if (!exportButton && !backupButton) {
      return false;
    }
    var buttons = [];
    if (exportButton) {
      buttons.push(exportButton);
    }
    if (backupButton) {
      buttons.push(backupButton);
    }
    return appendActionRow(buttons);
  }
  function renderStepInteraction(step) {
    if (!interactionContainerEl) {
      return;
    }
    teardownStepInteraction();
    var cleanupFns = [];
    var registerCleanup = function registerCleanup(fn) {
      if (typeof fn === 'function') {
        cleanupFns.push(fn);
      }
    };
    var hasContent = false;
    var key = step && step.key;
    if (key === 'userProfile') {
      hasContent = renderUserProfileInteraction(registerCleanup) || hasContent;
    } else if (key === 'nameProject') {
      hasContent = renderNameProjectInteraction(registerCleanup) || hasContent;
    } else if (key === 'saveProject') {
      hasContent = renderSaveProjectInteraction(registerCleanup) || hasContent;
    } else if (key === 'addCamera') {
      hasContent = renderSelectInteraction({
        selector: '#cameraSelect',
        labelSelector: "label[for='cameraSelect']",
        fallbackLabel: 'Camera body',
        suffix: 'camera'
      }, registerCleanup) || hasContent;
    } else if (key === 'addPower') {
      hasContent = renderSelectInteraction({
        selector: '#batterySelect',
        labelSelector: "label[for='batterySelect']",
        fallbackLabel: 'Power source',
        suffix: 'power'
      }, registerCleanup) || hasContent;
    } else if (key === 'generatePlan') {
      hasContent = renderGeneratePlanInteraction(registerCleanup) || hasContent;
    } else if (key === 'exportBackup') {
      hasContent = renderExportBackupInteraction(registerCleanup) || hasContent;
    }
    if (hasContent) {
      activeInteractionCleanup = function activeInteractionCleanup() {
        for (var index = 0; index < cleanupFns.length; index += 1) {
          try {
            cleanupFns[index]();
          } catch (error) {
            safeWarn('cine.features.onboardingTour could not clean up guided interaction.', error);
          }
        }
      };
    } else {
      activeInteractionCleanup = null;
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
    renderStepInteraction(step);
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
    var previousStep = currentStep;
    teardownStepRequirement();
    teardownStepInteraction();
    var step = stepConfig[index];
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
    applyStepRequirement(step);
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
    var timestamp = getTimestamp();
    var nextState = _objectSpread(_objectSpread({}, storedState), {}, {
      completedSteps: completed,
      lastCompletedStep: stepKey,
      lastCompletedAt: timestamp
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
    var timestamp = getTimestamp();
    var finalStep = allStepKeys.length ? allStepKeys[allStepKeys.length - 1] : null;
    var nextState = _objectSpread(_objectSpread({}, storedState), {}, {
      completed: true,
      skipped: false,
      activeStep: null,
      completedSteps: allStepKeys,
      lastCompletedStep: finalStep,
      lastCompletedAt: timestamp
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
      GLOBAL_SCOPE.addEventListener('scroll', handleGlobalScroll, true);
    }
  }
  function detachGlobalListeners() {
    if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.removeEventListener === 'function') {
      GLOBAL_SCOPE.removeEventListener('resize', schedulePositionUpdate);
      GLOBAL_SCOPE.removeEventListener('scroll', handleGlobalScroll, true);
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
    teardownStepRequirement();
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
  function matchesHelpTrigger(node) {
    if (!node) {
      return false;
    }
    if (typeof node.matches === 'function' && node.matches(HELP_TRIGGER_SELECTOR)) {
      return true;
    }
    if (typeof node.getAttribute === 'function' && node.getAttribute('data-onboarding-tour-trigger') !== null) {
      return true;
    }
    return typeof node.id === 'string' && node.id === HELP_BUTTON_ID;
  }
  function resolveHelpTrigger(node) {
    var current = node;
    while (current && current !== DOCUMENT && current !== DOCUMENT.body) {
      if (matchesHelpTrigger(current)) {
        return current;
      }
      current = current.parentElement || current.parentNode || null;
    }
    if (matchesHelpTrigger(current)) {
      return current;
    }
    return null;
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
  function formatTimeAgo(timestamp) {
    if (typeof timestamp !== 'number' || Number.isNaN(timestamp) || timestamp <= 0) {
      return '';
    }
    var now = getTimestamp();
    if (!now) {
      return '';
    }
    var diff = Math.max(0, now - timestamp);
    var minute = 60 * 1000;
    var hour = 60 * minute;
    var day = 24 * hour;
    if (diff < 45 * 1000) {
      return tourTexts.helpStatusTimeJustNow || 'just now';
    }
    if (diff < 90 * 1000) {
      return tourTexts.helpStatusTimeMinute || '1 minute ago';
    }
    if (diff < 45 * minute) {
      var _count = Math.round(diff / minute);
      var _template = tourTexts.helpStatusTimeMinutes || '{count} minutes ago';
      return _template.replace('{count}', String(_count));
    }
    if (diff < 90 * minute) {
      return tourTexts.helpStatusTimeHour || '1 hour ago';
    }
    if (diff < 22 * hour) {
      var _count2 = Math.round(diff / hour);
      var _template2 = tourTexts.helpStatusTimeHours || '{count} hours ago';
      return _template2.replace('{count}', String(_count2));
    }
    if (diff < 36 * hour) {
      return tourTexts.helpStatusTimeDay || '1 day ago';
    }
    var count = Math.round(diff / day);
    var template = tourTexts.helpStatusTimeDays || '{count} days ago';
    return template.replace('{count}', String(count));
  }
  function formatProgressUpdate(stepTitle, timestamp) {
    var timeAgo = formatTimeAgo(timestamp);
    if (!timeAgo) {
      return '';
    }
    if (stepTitle) {
      var template = tourTexts.helpStatusLastCompleted || 'Last completed: {step} ({timeAgo}).';
      return template.replace('{step}', stepTitle).replace('{timeAgo}', timeAgo);
    }
    var fallbackTemplate = tourTexts.helpStatusLastUpdated || 'Last update: {timeAgo}.';
    return fallbackTemplate.replace('{timeAgo}', timeAgo);
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
    for (var _index3 = 0; _index3 < allowedKeys.length; _index3 += 1) {
      var _key = allowedKeys[_index3];
      if (!completedSet.has(_key)) {
        nextIndex = _index3;
        break;
      }
    }
    var nextKey = nextIndex >= 0 ? allowedKeys[nextIndex] : null;
    var nextTitle = nextKey ? resolveStepTitle(nextKey) : '';
    var activeTitle = activeIndex >= 0 ? resolveStepTitle(activeKey) : '';
    var lastCompletedKey = stored && typeof stored.lastCompletedStep === 'string' ? stored.lastCompletedStep : null;
    var lastCompletedTitle = lastCompletedKey && allowedKeys.indexOf(lastCompletedKey) !== -1 ? resolveStepTitle(lastCompletedKey) : '';
    var lastCompletedAt = stored && typeof stored.lastCompletedAt === 'number' ? stored.lastCompletedAt : null;
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
    for (var _index4 = 0; _index4 < tokens.length; _index4 += 1) {
      var token = tokens[_index4];
      message = message.split(token).join(replacements[token]);
    }
    var progressUpdate = formatProgressUpdate(lastCompletedTitle, lastCompletedAt);
    if (progressUpdate) {
      message = "".concat(message, " ").concat(progressUpdate).trim();
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
    if (!helpButtonListenerAttached && DOCUMENT && typeof DOCUMENT.addEventListener === 'function') {
      if (!delegatedHelpListener) {
        delegatedHelpListener = function delegatedHelpListener(event) {
          var trigger = resolveHelpTrigger(event && event.target);
          if (!trigger) {
            return;
          }
          handleHelpButtonClick(event);
        };
      }
      try {
        DOCUMENT.addEventListener('click', delegatedHelpListener, true);
        helpButtonListenerAttached = true;
      } catch (error) {
        safeWarn('cine.features.onboardingTour could not attach help trigger listener.', error);
      }
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