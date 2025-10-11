/* global cineModuleBase, getSafeLocalStorage, SAFE_LOCAL_STORAGE,
          activateSettingsTab, openDialog, closeDialog, isDialogOpen */

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
    ? MODULE_BASE.safeWarn
    : function fallbackWarn(message, error) {
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

    const scopes = [];
    const push = scope => {
      if (!scope || (typeof scope !== 'object' && typeof scope !== 'function')) {
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
    const scopes = collectCandidateScopes(scope || GLOBAL_SCOPE);
    for (let index = 0; index < scopes.length; index += 1) {
      const candidate = scopes[index];
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

  const DOCUMENT = resolveDocument(GLOBAL_SCOPE);
  if (!DOCUMENT) {
    return;
  }

  const STORAGE_KEY = 'cameraPowerPlanner_onboardingTutorial';
  const STORAGE_VERSION = 2;
  const OVERLAY_ID = 'onboardingTutorialOverlay';
  const HELP_BUTTON_ID = 'helpOnboardingTutorialButton';
  const HELP_TRIGGER_SELECTOR = '[data-onboarding-tour-trigger]';
  const HELP_STATUS_ID = 'helpOnboardingTutorialStatus';

  function resolveStorage() {
    if (typeof getSafeLocalStorage === 'function') {
      try {
        const storage = getSafeLocalStorage();
        if (storage && typeof storage.getItem === 'function') {
          return storage;
        }
      } catch (error) {
        safeWarn('cine.features.onboardingTour could not access getSafeLocalStorage()', error);
      }
    }

    if (typeof SAFE_LOCAL_STORAGE === 'object' && SAFE_LOCAL_STORAGE) {
      return SAFE_LOCAL_STORAGE;
    }

    try {
      if (typeof GLOBAL_SCOPE.localStorage === 'object' && GLOBAL_SCOPE.localStorage) {
        return GLOBAL_SCOPE.localStorage;
      }
    } catch (error) {
      safeWarn('cine.features.onboardingTour could not access window.localStorage.', error);
    }

    return null;
  }

  const SAFE_STORAGE = resolveStorage();

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

  const DEFAULT_STEP_KEYS = [
    'intro',
    'nameProject',
    'saveProject',
    'addCamera',
    'addPower',
    'generatePlan',
    'exportBackup',
    'completion',
  ];

  const DEFAULT_STEP_TEXTS = {
    intro: {
      title: 'Welcome to Cine Power Planner',
      body:
        'This walkthrough highlights every workflow needed to protect data, generate gear lists and rehearse backups. Press Next to continue or Skip if you prefer to explore on your own.',
    },
    nameProject: {
      title: 'Name your first project',
      body:
        'Enter a project name to anchor autosave, backups and exports. The Next button unlocks once a name is in place so every subsequent step protects that project offline.',
    },
    saveProject: {
      title: 'Save immediately',
      body:
        'Press Save (or use Ctrl+S/⌘S/Enter) to capture your named project as an offline snapshot. If a saved setup is already selected the step completes automatically—otherwise click Save to continue.',
    },
    addCamera: {
      title: 'Add your primary camera',
      body:
        'Open the Camera dropdown and choose the body you are planning for. Search is available offline inside the list. Next unlocks once a specific model is selected.',
    },
    addPower: {
      title: 'Choose a power source',
      body:
        'Pick a battery or DC source that matches the build. Selecting an option updates runtime math instantly and stores the choice with your project snapshot.',
    },
    generatePlan: {
      title: 'Generate your first plan',
      body:
        'Use Generate Gear List and Project Requirements to create the printable checklist. This opens the project dialog so you can verify draw totals, runtime and crew notes together.',
    },
    exportBackup: {
      title: 'Export an offline safety copy',
      body:
        'Click Export Project or Quick Safeguards to download a JSON backup. Keeping a copy outside the browser ensures the new build survives resets and device swaps.',
    },
    completion: {
      title: "You're ready to plan",
      body:
        'Keep Help open whenever you need deeper guidance. Remember to save often, capture backups before major changes and store exports in multiple offline locations.',
    },
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
    const eventList = Array.isArray(events) && events.length ? events : ['input', 'change'];
    return {
      check() {
        const element = getElement(selector);
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
      attach(context) {
        const element = getElement(selector);
        if (!element) {
          if (typeof context.complete === 'function') {
            context.complete();
          }
          return () => {};
        }
        const handler = () => {
          let matches = false;
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
        for (let index = 0; index < eventList.length; index += 1) {
          const eventName = eventList[index];
          element.addEventListener(eventName, handler);
        }
        handler();
        return () => {
          for (let index = 0; index < eventList.length; index += 1) {
            const eventName = eventList[index];
            element.removeEventListener(eventName, handler);
          }
        };
      },
    };
  }

  function createClickCompletionRequirement(selectors, options) {
    const normalized = Array.isArray(selectors) ? selectors.slice() : [selectors];
    const eventName = options && typeof options.eventName === 'string' && options.eventName
      ? options.eventName
      : 'click';
    const evaluate = typeof options?.check === 'function' ? options.check : null;
    return {
      check() {
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
      attach(context) {
        const removers = [];
        let elementFound = false;
        for (let index = 0; index < normalized.length; index += 1) {
          const selector = normalized[index];
          const node = getElement(selector);
          if (!node) {
            continue;
          }
          elementFound = true;
          const listener = () => {
            if (typeof context.complete === 'function') {
              context.complete();
            }
          };
          node.addEventListener(eventName, listener);
          removers.push(() => {
            node.removeEventListener(eventName, listener);
          });
        }

        if (evaluate) {
          let matches = false;
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

        return () => {
          for (let index = 0; index < removers.length; index += 1) {
            try {
              removers[index]();
            } catch (error) {
              safeWarn('cine.features.onboardingTour could not detach click requirement.', error);
            }
          }
        };
      },
    };
  }

  function getProjectNameValue() {
    const input = getElement('#setupName');
    return typeof input?.value === 'string' ? input.value.trim() : '';
  }

  function hasSavedSetupForName(name) {
    if (!name) {
      return false;
    }
    const select = getElement('#setupSelect');
    if (!select || !select.options) {
      return false;
    }
    for (let index = 0; index < select.options.length; index += 1) {
      const option = select.options[index];
      if (option && typeof option.value === 'string' && option.value === name) {
        return true;
      }
    }
    return false;
  }

  function createSaveProjectRequirement() {
    return {
      check() {
        return hasSavedSetupForName(getProjectNameValue());
      },
      attach(context) {
        const removers = [];
        const evaluate = () => {
          const saved = hasSavedSetupForName(getProjectNameValue());
          if (saved) {
            if (typeof context.complete === 'function') {
              context.complete();
            }
          } else if (typeof context.incomplete === 'function') {
            context.incomplete();
          }
        };

        const saveButton = getElement('#saveSetupBtn');
        if (saveButton) {
          const handleClick = () => {
            setTimeout(evaluate, 50);
          };
          saveButton.addEventListener('click', handleClick);
          removers.push(() => {
            saveButton.removeEventListener('click', handleClick);
          });
        }

        const setupSelect = getElement('#setupSelect');
        if (setupSelect) {
          const handleChange = () => {
            evaluate();
          };
          setupSelect.addEventListener('change', handleChange);
          removers.push(() => {
            setupSelect.removeEventListener('change', handleChange);
          });
        }

        const nameInput = getElement('#setupName');
        if (nameInput) {
          const handleInput = () => {
            evaluate();
          };
          nameInput.addEventListener('input', handleInput);
          removers.push(() => {
            nameInput.removeEventListener('input', handleInput);
          });
        }

        evaluate();

        return () => {
          for (let index = 0; index < removers.length; index += 1) {
            try {
              removers[index]();
            } catch (error) {
              safeWarn('cine.features.onboardingTour could not detach save requirement.', error);
            }
          }
        };
      },
    };
  }

  const STEP_COMPLETION_REQUIREMENTS = {
    nameProject: createFieldCompletionRequirement(
      '#setupName',
      value => value.trim().length > 0,
      ['input', 'change'],
    ),
    saveProject: createSaveProjectRequirement(),
    addCamera: createFieldCompletionRequirement(
      '#cameraSelect',
      value => value && value !== 'None',
      ['change'],
    ),
    addPower: createFieldCompletionRequirement(
      '#batterySelect',
      value => value && value !== 'None',
      ['change'],
    ),
    generatePlan: createClickCompletionRequirement('#generateGearListBtn'),
    exportBackup: createClickCompletionRequirement(
      ['#shareSetupBtn', '#storageBackupNow'],
    ),
  };

  const STEP_SIGNATURE = DEFAULT_STEP_KEYS.join('|');

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
    const normalized = [];
    for (let index = 0; index < value.length; index += 1) {
      const entry = value[index];
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
    const snapshot = state && typeof state === 'object' ? { ...state } : {};
    snapshot.version = STORAGE_VERSION;
    snapshot.completed = Boolean(snapshot.completed);
    snapshot.skipped = Boolean(snapshot.skipped) && !snapshot.completed;
    const allowedKeys = DEFAULT_STEP_KEYS;
    snapshot.completedSteps = normalizeCompletedSteps(snapshot.completedSteps, allowedKeys);
    snapshot.activeStep = typeof snapshot.activeStep === 'string' && snapshot.activeStep
      ? snapshot.activeStep
      : null;
    if (snapshot.activeStep && allowedKeys.indexOf(snapshot.activeStep) === -1) {
      snapshot.activeStep = null;
    }
    const signature = typeof snapshot.stepSignature === 'string' ? snapshot.stepSignature : null;
    if (signature !== STEP_SIGNATURE) {
      snapshot.stepSignature = STEP_SIGNATURE;
      snapshot.completed = false;
      snapshot.skipped = false;
      if (!snapshot.activeStep) {
        for (let index = 0; index < allowedKeys.length; index += 1) {
          const key = allowedKeys[index];
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
    snapshot.lastCompletedStep = typeof snapshot.lastCompletedStep === 'string' && snapshot.lastCompletedStep
      ? snapshot.lastCompletedStep
      : null;
    if (snapshot.lastCompletedStep && allowedKeys.indexOf(snapshot.lastCompletedStep) === -1) {
      snapshot.lastCompletedStep = null;
    }
    snapshot.lastCompletedAt = typeof snapshot.lastCompletedAt === 'number' && !Number.isNaN(snapshot.lastCompletedAt)
      ? snapshot.lastCompletedAt
      : null;
    if (signature !== STEP_SIGNATURE) {
      snapshot.lastCompletedStep = null;
      snapshot.lastCompletedAt = snapshot.timestamp;
    }
    return snapshot;
  }

  function loadStoredState() {
    if (!SAFE_STORAGE || typeof SAFE_STORAGE.getItem !== 'function') {
      return normalizeStateSnapshot({ version: STORAGE_VERSION });
    }
    let raw = null;
    try {
      raw = SAFE_STORAGE.getItem(STORAGE_KEY);
    } catch (error) {
      safeWarn('cine.features.onboardingTour could not read onboarding state.', error);
      raw = null;
    }
    if (typeof raw !== 'string' || !raw) {
      return normalizeStateSnapshot({ version: STORAGE_VERSION });
    }
    try {
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') {
        return normalizeStateSnapshot({ version: STORAGE_VERSION });
      }
      if (parsed.version !== STORAGE_VERSION) {
        return normalizeStateSnapshot({
          ...parsed,
          version: STORAGE_VERSION,
          completed: false,
          skipped: false,
        });
      }
      return normalizeStateSnapshot(parsed);
    } catch (error) {
      safeWarn('cine.features.onboardingTour could not parse onboarding state.', error);
      return normalizeStateSnapshot({ version: STORAGE_VERSION });
    }
  }

  function saveState(nextState) {
    if (!SAFE_STORAGE || typeof SAFE_STORAGE.setItem !== 'function') {
      return normalizeStateSnapshot({
        ...nextState,
        version: STORAGE_VERSION,
      });
    }
    const sanitized = normalizeStateSnapshot({
      ...nextState,
      version: STORAGE_VERSION,
    });
    const payload = {
      ...sanitized,
      timestamp: getTimestamp(),
    };
    try {
      SAFE_STORAGE.setItem(STORAGE_KEY, JSON.stringify(payload));
      return payload;
    } catch (error) {
      safeWarn('cine.features.onboardingTour could not persist onboarding state.', error);
      return sanitized;
    }
  }

  let storedState = loadStoredState();

  function resolveLanguage() {
    try {
      const lang = typeof GLOBAL_SCOPE.currentLang === 'string' && GLOBAL_SCOPE.texts
        ? GLOBAL_SCOPE.currentLang
        : null;
      if (lang && GLOBAL_SCOPE.texts && GLOBAL_SCOPE.texts[lang]) {
        return lang;
      }
    } catch (error) {
      void error;
    }
    return 'en';
  }

  function resolveTourTexts() {
    const lang = resolveLanguage();
    const fallback = GLOBAL_SCOPE.texts && GLOBAL_SCOPE.texts.en && GLOBAL_SCOPE.texts.en.onboardingTour
      ? GLOBAL_SCOPE.texts.en.onboardingTour
      : {};
    const localized = GLOBAL_SCOPE.texts && GLOBAL_SCOPE.texts[lang] && GLOBAL_SCOPE.texts[lang].onboardingTour
      ? GLOBAL_SCOPE.texts[lang].onboardingTour
      : fallback;
    const steps = {};
    for (let index = 0; index < DEFAULT_STEP_KEYS.length; index += 1) {
      const key = DEFAULT_STEP_KEYS[index];
      const defaultEntry = DEFAULT_STEP_TEXTS[key] || { title: key, body: '' };
      const fallbackEntry = fallback.steps && fallback.steps[key];
      const localEntry = localized.steps && localized.steps[key];

      const resolvedTitle =
        (localEntry && typeof localEntry.title === 'string' && localEntry.title) ||
        (fallbackEntry && typeof fallbackEntry.title === 'string' && fallbackEntry.title) ||
        (typeof defaultEntry.title === 'string' ? defaultEntry.title : key);

      const resolvedBody =
        (localEntry && typeof localEntry.body === 'string' && localEntry.body) ||
        (fallbackEntry && typeof fallbackEntry.body === 'string' && fallbackEntry.body) ||
        (typeof defaultEntry.body === 'string' ? defaultEntry.body : '');

      steps[key] = {
        title: resolvedTitle,
        body: resolvedBody,
      };
    }
    return {
      ...fallback,
      ...localized,
      steps,
    };
  }

  let tourTexts = resolveTourTexts();

  function getStepConfig() {
    return [
      {
        key: 'intro',
        highlight: null,
        autoActions: null,
      },
      {
        key: 'nameProject',
        highlight: '#setupName',
        focus: '#setupName',
      },
      {
        key: 'saveProject',
        highlight: '#saveSetupBtn',
      },
      {
        key: 'addCamera',
        highlight: '#cameraSelect',
      },
      {
        key: 'addPower',
        highlight: '#batterySelect',
      },
      {
        key: 'generatePlan',
        highlight: '#generateGearListBtn',
      },
      {
        key: 'exportBackup',
        highlight: '#shareSetupBtn',
        alternateHighlight: '#storageBackupNow',
      },
      {
        key: 'completion',
        highlight: null,
      },
    ];
  }

  let stepConfig = getStepConfig();

  let overlayRoot = null;
  let overlayKeydownListenerAttached = false;
  let highlightEl = null;
  let activeTargetElement = null;
  let cardEl = null;
  let titleEl = null;
  let bodyEl = null;
  let progressEl = null;
  let progressMeterEl = null;
  let progressMeterFillEl = null;
  let stepListEl = null;
  let resumeHintEl = null;
  let interactionContainerEl = null;
  let helpStatusEl = null;
  let backButton = null;
  let nextButton = null;
  let skipButton = null;
  let helpButtonListenerAttached = false;
  let delegatedHelpListener = null;

  let active = false;
  let currentIndex = -1;
  let currentStep = null;
  let pendingFrame = null;
  let autoOpenedSettings = false;
  let settingsDialogRef = null;
  let resumeHintVisible = false;
  let resumeStartIndex = null;

  let activeRequirementCleanup = null;
  let activeRequirementCompleted = false;
  let activeInteractionCleanup = null;
  let lastCardPlacement = 'floating';

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

    const requirement = step ? STEP_COMPLETION_REQUIREMENTS[step.key] : null;
    if (!requirement) {
      activeRequirementCompleted = true;
      setNextButtonDisabled(false);
      activeRequirementCleanup = null;
      return;
    }

    const initialComplete = typeof requirement.check === 'function' ? requirement.check() : false;
    activeRequirementCompleted = initialComplete;
    setNextButtonDisabled(!initialComplete);

    if (typeof requirement.attach !== 'function') {
      return;
    }

    const cleanup = requirement.attach({
      complete() {
        if (!active || currentStep !== step) {
          return;
        }
        if (!activeRequirementCompleted) {
          activeRequirementCompleted = true;
          setNextButtonDisabled(false);
        }
      },
      incomplete() {
        if (!active || currentStep !== step) {
          return;
        }
        if (activeRequirementCompleted) {
          activeRequirementCompleted = false;
        }
        setNextButtonDisabled(true);
      },
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

  function schedulePositionUpdate() {
    if (!active) {
      return;
    }
    if (pendingFrame !== null) {
      return;
    }
    const runner = function () {
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

    const header = DOCUMENT.createElement('div');
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

    const progressTrack = DOCUMENT.createElement('div');
    progressTrack.className = 'onboarding-progress-track';
    progressMeterFillEl = DOCUMENT.createElement('div');
    progressMeterFillEl.className = 'onboarding-progress-fill';
    progressTrack.appendChild(progressMeterFillEl);
    progressMeterEl.appendChild(progressTrack);
    header.appendChild(progressMeterEl);

    skipButton = DOCUMENT.createElement('button');
    skipButton.type = 'button';
    skipButton.className = 'button-link onboarding-skip';
    skipButton.addEventListener('click', () => {
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

    const actions = DOCUMENT.createElement('div');
    actions.className = 'onboarding-card-actions';
    cardEl.appendChild(actions);

    backButton = DOCUMENT.createElement('button');
    backButton.type = 'button';
    backButton.className = 'onboarding-back-button';
    backButton.addEventListener('click', () => {
      if (!active) return;
      goToPreviousStep();
    });
    actions.appendChild(backButton);

    nextButton = DOCUMENT.createElement('button');
    nextButton.type = 'button';
    nextButton.className = 'onboarding-next-button';
    nextButton.addEventListener('click', () => {
      if (!active) return;
      goToNextStep();
    });
    actions.appendChild(nextButton);

    overlayRoot.appendChild(cardEl);

    DOCUMENT.body.appendChild(overlayRoot);

    if (!overlayKeydownListenerAttached) {
      DOCUMENT.addEventListener('keydown', handleOverlayKeydown, true);
      overlayKeydownListenerAttached = true;
    }
  }

  function teardownOverlayElements() {
    clearFrame();
    clearActiveTargetElement();
    if (overlayKeydownListenerAttached) {
      DOCUMENT.removeEventListener('keydown', handleOverlayKeydown, true);
      overlayKeydownListenerAttached = false;
    }
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
    lastCardPlacement = 'floating';
  }

  function formatStepIndicator(index, total) {
    const template = typeof tourTexts.stepIndicator === 'string'
      ? tourTexts.stepIndicator
      : 'Step {current} of {total}';
    const current = index + 1;
    return template
      .replace('{current}', current)
      .replace('{total}', total);
  }

  function focusCard() {
    const target = getTargetElement(currentStep);
    if (target && typeof target.focus === 'function' && !target.hasAttribute('disabled')) {
      try {
        target.focus({ preventScroll: true });
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
      cardEl.focus({ preventScroll: true });
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
      const el = DOCUMENT.querySelector(step.highlight);
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
    if (activeTargetElement && typeof activeTargetElement.classList === 'object') {
      activeTargetElement.classList.remove('onboarding-active-target');
    }
    activeTargetElement = null;
  }

  function updateHighlightPosition() {
    if (!highlightEl) {
      return;
    }
    const target = getTargetElement(currentStep);
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
      if (typeof target.classList === 'object') {
        target.classList.add('onboarding-active-target');
      }
    }
    const rect = target.getBoundingClientRect();
    const padding = 12;
    const width = Math.max(0, rect.width + padding * 2);
    const height = Math.max(0, rect.height + padding * 2);
    const left = rect.left + (GLOBAL_SCOPE.scrollX || GLOBAL_SCOPE.pageXOffset || 0) - padding;
    const top = rect.top + (GLOBAL_SCOPE.scrollY || GLOBAL_SCOPE.pageYOffset || 0) - padding;

    highlightEl.style.width = `${width}px`;
    highlightEl.style.height = `${height}px`;
    highlightEl.style.transform = `translate(${Math.max(0, left)}px, ${Math.max(0, top)}px)`;
    highlightEl.style.opacity = '1';
    positionCard(target, rect);
  }

  function positionCard(target, targetRect) {
    if (!cardEl) {
      return;
    }
    const viewportWidth = GLOBAL_SCOPE.innerWidth || DOCUMENT.documentElement.clientWidth || 0;
    const viewportHeight = GLOBAL_SCOPE.innerHeight || DOCUMENT.documentElement.clientHeight || 0;
    const targetElement = target || getTargetElement(currentStep);
    const resolvedRect = targetRect || (targetElement ? targetElement.getBoundingClientRect() : null);
    const cardRect = cardEl.getBoundingClientRect();
    const scrollX = GLOBAL_SCOPE.scrollX || GLOBAL_SCOPE.pageXOffset || 0;
    const scrollY = GLOBAL_SCOPE.scrollY || GLOBAL_SCOPE.pageYOffset || 0;
    const margin = 16;
    const viewportRight = scrollX + viewportWidth;
    const viewportBottom = scrollY + viewportHeight;
    const minLeft = scrollX + margin;
    const minTop = scrollY + margin;
    const maxLeft = Math.max(minLeft, viewportRight - cardRect.width - margin);
    const maxTop = Math.max(minTop, viewportBottom - cardRect.height - margin);

    let top = scrollY + Math.max(margin, (viewportHeight - cardRect.height) / 2);
    let left = scrollX + Math.max(margin, (viewportWidth - cardRect.width) / 2);
    let placement = 'floating';

    if (targetElement && resolvedRect) {
      const rect = resolvedRect;
      const targetTop = rect.top + scrollY;
      const targetLeft = rect.left + scrollX;
      const targetCenterX = targetLeft + rect.width / 2;
      const targetCenterY = targetTop + rect.height / 2;

      const options = [
        {
          name: 'bottom',
          top: targetTop + rect.height + margin,
          left: targetCenterX - cardRect.width / 2,
          fits:
            targetTop + rect.height + margin + cardRect.height <= viewportBottom - margin,
        },
        {
          name: 'top',
          top: targetTop - cardRect.height - margin,
          left: targetCenterX - cardRect.width / 2,
          fits: targetTop - cardRect.height - margin >= minTop,
        },
        {
          name: 'right',
          top: targetCenterY - cardRect.height / 2,
          left: targetLeft + rect.width + margin,
          fits: targetLeft + rect.width + margin + cardRect.width <= viewportRight - margin,
        },
        {
          name: 'left',
          top: targetCenterY - cardRect.height / 2,
          left: targetLeft - cardRect.width - margin,
          fits: targetLeft - cardRect.width - margin >= minLeft,
        },
      ];

      const resolvedOptions = options.map(option => {
        const clampedTop = Math.min(Math.max(option.top, minTop), maxTop);
        const clampedLeft = Math.min(Math.max(option.left, minLeft), maxLeft);
        const overflow = Math.abs(clampedTop - option.top) + Math.abs(clampedLeft - option.left);
        return {
          ...option,
          clampedTop,
          clampedLeft,
          overflow,
        };
      });

      let chosen = resolvedOptions.find(option => option.fits);
      if (!chosen) {
        chosen = resolvedOptions.reduce((best, option) => {
          if (!best || option.overflow < best.overflow) {
            return option;
          }
          return best;
        }, null);
      }

      if (chosen) {
        top = chosen.clampedTop;
        left = chosen.clampedLeft;
        placement = chosen.name;
      }
    }

    cardEl.style.top = `${Math.min(Math.max(top, minTop), maxTop)}px`;
    cardEl.style.left = `${Math.min(Math.max(left, minLeft), maxLeft)}px`;
    if (placement !== lastCardPlacement) {
      lastCardPlacement = placement;
      cardEl.setAttribute('data-placement', placement);
    }
  }

  function ensureSettingsForStep(step) {
    if (!step || !step.ensureSettings) {
      return;
    }
    const dialog = DOCUMENT.getElementById('settingsDialog');
    if (!dialog) {
      return;
    }
    const wasOpen = typeof isDialogOpen === 'function'
      ? isDialogOpen(dialog)
      : !dialog.hasAttribute('hidden');
    settingsDialogRef = dialog;
    if (!wasOpen) {
      const trigger = DOCUMENT.getElementById('settingsButton');
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
      return { title: '', body: '' };
    }
    const pack = tourTexts.steps && tourTexts.steps[step.key]
      ? tourTexts.steps[step.key]
      : { title: step.key, body: '' };
    return {
      title: typeof pack.title === 'string' ? pack.title : step.key,
      body: typeof pack.body === 'string' ? pack.body : '',
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
    const totalSteps = stepConfig.length;
    const completedSteps = storedState && Array.isArray(storedState.completedSteps)
      ? storedState.completedSteps.length
      : 0;
    const template = tourTexts.resumeHintDetailed || tourTexts.resumeHint || 'Resuming where you left off.';
    const hint = template
      .replace('{current}', String(index + 1))
      .replace('{total}', String(totalSteps))
      .replace('{completed}', String(Math.min(completedSteps, totalSteps)));
    resumeHintEl.hidden = false;
    resumeHintEl.textContent = hint;
  }

  function updateStepList(activeIndex) {
    if (!stepListEl) {
      return;
    }

    const resolvedActiveIndex = typeof activeIndex === 'number' && activeIndex >= 0
      ? activeIndex
      : 0;
    const total = stepConfig.length;
    const statusLabels = {
      current: tourTexts.stepStatusCurrent || 'Current step',
      complete: tourTexts.stepStatusComplete || 'Completed',
      upcoming: tourTexts.stepStatusUpcoming || 'Locked',
    };

    const completedSet = new Set(
      storedState && Array.isArray(storedState.completedSteps)
        ? storedState.completedSteps
        : [],
    );
    const activeKey = currentStep ? currentStep.key : (stepConfig[resolvedActiveIndex] && stepConfig[resolvedActiveIndex].key);

    stepListEl.textContent = '';
    if (typeof stepListEl.setAttribute === 'function') {
      stepListEl.setAttribute('aria-label', tourTexts.stepListAriaLabel || 'Tutorial steps');
    }

    for (let index = 0; index < total; index += 1) {
      const step = stepConfig[index];
      const texts = getStepTexts(step);
      const item = DOCUMENT.createElement('li');
      item.className = 'onboarding-step-item';

      let status;
      if (step && step.key === activeKey) {
        status = 'current';
      } else if (step && completedSet.has(step.key)) {
        status = 'complete';
      } else {
        status = 'upcoming';
      }
      item.setAttribute('data-status', status);

      const button = DOCUMENT.createElement('button');
      button.type = 'button';
      button.className = 'onboarding-step-button';
      button.disabled = status === 'upcoming';
      button.setAttribute('data-step-index', String(index));
      button.setAttribute('aria-current', status === 'current' ? 'step' : 'false');

      const title = texts.title || step.key;
      const statusText = statusLabels[status] || '';
      button.setAttribute('aria-label', statusText ? `${title}. ${statusText}.` : title);

      const titleElFragment = DOCUMENT.createElement('span');
      titleElFragment.className = 'onboarding-step-title';
      titleElFragment.textContent = title;
      button.appendChild(titleElFragment);

      const statusEl = DOCUMENT.createElement('span');
      statusEl.className = 'onboarding-step-status';
      statusEl.textContent = statusText;
      button.appendChild(statusEl);

      item.appendChild(button);
      stepListEl.appendChild(item);
    }
  }

  function focusHighlightedElement(step) {
    if (!step) {
      return false;
    }
    const selectors = [];
    if (typeof step.focus === 'string' && step.focus) {
      selectors.push(step.focus);
    }
    if (typeof step.highlight === 'string' && step.highlight) {
      selectors.push(step.highlight);
    }
    let target = null;
    for (let index = 0; index < selectors.length; index += 1) {
      const selector = selectors[index];
      if (!selector) {
        continue;
      }
      const element = DOCUMENT.querySelector(selector);
      if (!element) {
        continue;
      }
      if (typeof element.focus === 'function') {
        target = element;
        break;
      }
    }
    if (!target) {
      return false;
    }

    const applyFocus = () => {
      try {
        target.focus({ preventScroll: true });
      } catch (error) {
        void error;
        try {
          target.focus();
        } catch (focusError) {
          void focusError;
        }
      }
      const view = target.ownerDocument && target.ownerDocument.defaultView;
      const isTextInput = Boolean(
        view
        && (
          target instanceof view.HTMLInputElement
          || target instanceof view.HTMLTextAreaElement
        ),
      );
      if (isTextInput && typeof target.select === 'function' && target.value) {
        try {
          target.select();
        } catch (selectError) {
          void selectError;
        }
      }
    };

    if (typeof queueMicrotask === 'function') {
      queueMicrotask(applyFocus);
    } else {
      setTimeout(applyFocus, 0);
    }
    return true;
  }

  function renderStepInteraction(step) {
    if (!interactionContainerEl) {
      return;
    }

    teardownStepInteraction();

    const key = step && step.key;
    const requiresDirectInteraction = Boolean(
      key && key !== 'intro' && key !== 'completion'
    );

    interactionContainerEl.hidden = true;

    if (requiresDirectInteraction) {
      focusHighlightedElement(step);
      schedulePositionUpdate();
    }

    activeInteractionCleanup = null;
  }

  function handleStepListClick(event) {
    if (!active) {
      return;
    }
    const target = event && event.target;
    if (!target) {
      return;
    }
    const button = typeof target.closest === 'function'
      ? target.closest('.onboarding-step-button')
      : (target.classList && target.classList.contains('onboarding-step-button') ? target : null);
    if (!button || button.disabled) {
      return;
    }
    const index = parseInt(button.getAttribute('data-step-index'), 10);
    if (Number.isNaN(index) || index > currentIndex) {
      return;
    }
    showStep(index);
  }

  function updateCardForStep(step, index) {
    if (!cardEl) {
      return;
    }

    const totalSteps = stepConfig.length;
    const textPack = getStepTexts(step);
    const stepText = textPack.body;

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
    const totalSteps = stepConfig.length;
    const completedSteps = storedState && Array.isArray(storedState.completedSteps)
      ? storedState.completedSteps
      : [];
    const completedSet = new Set(completedSteps);
    const activeContribution = step && !completedSet.has(step.key) ? 1 : 0;
    const progressValue = Math.min(
      totalSteps,
      Math.max(index + 1, completedSet.size + activeContribution),
    );
    const ratio = totalSteps > 0 ? Math.max(0, Math.min(1, progressValue / totalSteps)) : 0;
    progressMeterFillEl.style.width = `${ratio * 100}%`;

    const labelTemplate = tourTexts.progressValueLabel || 'Completed {completed} of {total} steps';
    const label = labelTemplate
      .replace('{completed}', String(Math.min(completedSet.size, totalSteps)))
      .replace('{total}', String(totalSteps));
    const meterLabel = tourTexts.progressMeterLabel || 'Tutorial progress';
    progressMeterEl.setAttribute('aria-label', meterLabel);
    progressMeterEl.setAttribute('aria-valuemax', String(totalSteps));
    progressMeterEl.setAttribute('aria-valuenow', String(progressValue));
    progressMeterEl.setAttribute('aria-valuetext', label);
  }

  function showStep(index) {
    if (index < 0 || index >= stepConfig.length) {
      return;
    }

    const previousStep = currentStep;
    teardownStepRequirement();
    teardownStepInteraction();
    const step = stepConfig[index];

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
      const focusTarget = DOCUMENT.querySelector(step.focus);
      if (focusTarget && typeof focusTarget.scrollIntoView === 'function') {
        try {
          focusTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } catch (error) {
          safeWarn('cine.features.onboardingTour could not scroll focus target into view.', error);
        }
      }
    } else if (step.highlight) {
      const highlightTarget = DOCUMENT.querySelector(step.highlight);
      if (highlightTarget && typeof highlightTarget.scrollIntoView === 'function') {
        try {
          highlightTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
    setTimeout(() => {
      schedulePositionUpdate();
      positionCard();
    }, 50);

    const nextState = {
      ...storedState,
      activeStep: step.key,
      completed: false,
      skipped: false,
    };
    try {
      const persisted = saveState(nextState);
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
    const nextIndex = currentIndex + 1;
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
    const previousIndex = Math.max(0, currentIndex - 1);
    showStep(previousIndex);
  }

  function recordStepCompletion(stepKey) {
    if (!stepKey) {
      return;
    }
    const completed = storedState && Array.isArray(storedState.completedSteps)
      ? storedState.completedSteps.slice()
      : [];
    if (completed.indexOf(stepKey) !== -1) {
      return;
    }
    completed.push(stepKey);
    const timestamp = getTimestamp();
    const nextState = {
      ...storedState,
      completedSteps: completed,
      lastCompletedStep: stepKey,
      lastCompletedAt: timestamp,
    };
    const persisted = saveState(nextState);
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

    const title = tourTexts.skipConfirmationTitle || '';
    const message = tourTexts.skipConfirmationBody || '';
    const accept = tourTexts.skipConfirmationAccept || '';
    const cancel = tourTexts.skipConfirmationCancel || '';
    const promptMessage = `${title}\n\n${message}`.trim();
    let confirmed = false;
    try {
      confirmed = GLOBAL_SCOPE.confirm(`${promptMessage}\n\n${accept}/${cancel}`);
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
    const nextState = {
      ...storedState,
      skipped: true,
      completed: false,
      activeStep: null,
    };
    const persisted = saveState(nextState);
    storedState = persisted || normalizeStateSnapshot(nextState);
    applyHelpButtonLabel();
  }

  function completeTutorial() {
    closeSettingsIfNeeded();
    endTutorial();
    const allStepKeys = stepConfig.map(step => step.key);
    const timestamp = getTimestamp();
    const finalStep = allStepKeys.length ? allStepKeys[allStepKeys.length - 1] : null;
    const nextState = {
      ...storedState,
      completed: true,
      skipped: false,
      activeStep: null,
      completedSteps: allStepKeys,
      lastCompletedStep: finalStep,
      lastCompletedAt: timestamp,
    };
    const persisted = saveState(nextState);
    storedState = persisted || normalizeStateSnapshot(nextState);
    applyHelpButtonLabel();
  }

  function handleOverlayKeydown(event) {
    if (!active) {
      return;
    }
    const key = event && event.key;
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
    const focusable = Array.from(cardEl.querySelectorAll('button:not([disabled])'));
    if (!focusable.length) {
      return;
    }
    const direction = event.shiftKey ? -1 : 1;
    const activeElement = DOCUMENT.activeElement;
    let index = focusable.indexOf(activeElement);
    if (index === -1) {
      index = direction === 1 ? -1 : 0;
    }
    index = (index + direction + focusable.length) % focusable.length;
    event.preventDefault();
    const target = focusable[index];
    if (target) {
      try {
        target.focus({ preventScroll: true });
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

  function startTutorial(options = {}) {
    const { resume = false, focusStart = true } = options || {};
    ensureOverlayElements();
    tourTexts = resolveTourTexts();
    stepConfig = getStepConfig();

    const completedSet = new Set(
      storedState && Array.isArray(storedState.completedSteps)
        ? storedState.completedSteps
        : [],
    );
    let startIndex = resume && storedState && storedState.activeStep
      ? stepConfig.findIndex(step => step.key === storedState.activeStep)
      : -1;
    if (startIndex < 0) {
      startIndex = stepConfig.findIndex(step => step && !completedSet.has(step.key));
    }
    const resolvedIndex = startIndex >= 0 ? startIndex : stepConfig.length - 1;

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
    if (
      typeof node.getAttribute === 'function'
      && node.getAttribute('data-onboarding-tour-trigger') !== null
    ) {
      return true;
    }
    return typeof node.id === 'string' && node.id === HELP_BUTTON_ID;
  }

  function resolveHelpTrigger(node) {
    let current = node;
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
    const buttons = [];
    const seen = new Set();

    if (DOCUMENT && typeof DOCUMENT.querySelectorAll === 'function') {
      const candidates = DOCUMENT.querySelectorAll(HELP_TRIGGER_SELECTOR);
      for (let index = 0; index < candidates.length; index += 1) {
        const button = candidates[index];
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
      const fallback = DOCUMENT.getElementById(HELP_BUTTON_ID);
      if (
        fallback &&
        typeof fallback.addEventListener === 'function' &&
        !seen.has(fallback)
      ) {
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
    const stepPack = tourTexts.steps && tourTexts.steps[stepKey];
    if (stepPack && typeof stepPack.title === 'string' && stepPack.title) {
      return stepPack.title;
    }
    return stepKey;
  }

  function formatTimeAgo(timestamp) {
    if (typeof timestamp !== 'number' || Number.isNaN(timestamp) || timestamp <= 0) {
      return '';
    }
    const now = getTimestamp();
    if (!now) {
      return '';
    }
    const diff = Math.max(0, now - timestamp);
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    if (diff < 45 * 1000) {
      return tourTexts.helpStatusTimeJustNow || 'just now';
    }
    if (diff < 90 * 1000) {
      return tourTexts.helpStatusTimeMinute || '1 minute ago';
    }
    if (diff < 45 * minute) {
      const count = Math.round(diff / minute);
      const template = tourTexts.helpStatusTimeMinutes || '{count} minutes ago';
      return template.replace('{count}', String(count));
    }
    if (diff < 90 * minute) {
      return tourTexts.helpStatusTimeHour || '1 hour ago';
    }
    if (diff < 22 * hour) {
      const count = Math.round(diff / hour);
      const template = tourTexts.helpStatusTimeHours || '{count} hours ago';
      return template.replace('{count}', String(count));
    }
    if (diff < 36 * hour) {
      return tourTexts.helpStatusTimeDay || '1 day ago';
    }
    const count = Math.round(diff / day);
    const template = tourTexts.helpStatusTimeDays || '{count} days ago';
    return template.replace('{count}', String(count));
  }

  function formatProgressUpdate(stepTitle, timestamp) {
    const timeAgo = formatTimeAgo(timestamp);
    if (!timeAgo) {
      return '';
    }
    if (stepTitle) {
      const template = tourTexts.helpStatusLastCompleted || 'Last completed: {step} ({timeAgo}).';
      return template
        .replace('{step}', stepTitle)
        .replace('{timeAgo}', timeAgo);
    }
    const fallbackTemplate = tourTexts.helpStatusLastUpdated || 'Last update: {timeAgo}.';
    return fallbackTemplate.replace('{timeAgo}', timeAgo);
  }

  function applyHelpStatus(state, steps) {
    const statusElement = resolveHelpStatusElement();
    if (!statusElement) {
      return;
    }

    const stepList = Array.isArray(steps) && steps.length ? steps : getStepConfig();
    const allowedKeys = stepList.map(step => step && step.key).filter(Boolean);
    const stored = state || storedState || loadStoredState();
    const completedRaw = stored && Array.isArray(stored.completedSteps)
      ? stored.completedSteps
      : [];
    const completedSet = new Set();
    for (let index = 0; index < completedRaw.length; index += 1) {
      const key = completedRaw[index];
      if (typeof key === 'string' && allowedKeys.indexOf(key) !== -1) {
        completedSet.add(key);
      }
    }

    const total = allowedKeys.length;
    const completedCount = Math.min(completedSet.size, total);

    const activeKey = stored && typeof stored.activeStep === 'string'
      ? stored.activeStep
      : null;
    const activeIndex = activeKey ? allowedKeys.indexOf(activeKey) : -1;

    let nextIndex = -1;
    for (let index = 0; index < allowedKeys.length; index += 1) {
      const key = allowedKeys[index];
      if (!completedSet.has(key)) {
        nextIndex = index;
        break;
      }
    }

    const nextKey = nextIndex >= 0 ? allowedKeys[nextIndex] : null;
    const nextTitle = nextKey ? resolveStepTitle(nextKey) : '';
    const activeTitle = activeIndex >= 0 ? resolveStepTitle(activeKey) : '';
    const lastCompletedKey = stored && typeof stored.lastCompletedStep === 'string'
      ? stored.lastCompletedStep
      : null;
    const lastCompletedTitle = lastCompletedKey && allowedKeys.indexOf(lastCompletedKey) !== -1
      ? resolveStepTitle(lastCompletedKey)
      : '';
    const lastCompletedAt = stored && typeof stored.lastCompletedAt === 'number'
      ? stored.lastCompletedAt
      : null;

    let statusType = 'notStarted';
    if (stored && stored.completed) {
      statusType = 'completed';
    } else if (stored && stored.skipped) {
      statusType = 'skipped';
    } else if (activeIndex >= 0) {
      statusType = 'resume';
    } else if (completedCount > 0) {
      statusType = 'inProgress';
    }

    let template;
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

    const replacements = {
      '{completed}': String(completedCount),
      '{total}': String(total),
      '{next}': nextTitle || activeTitle || '',
      '{current}': activeTitle || nextTitle || '',
      '{step}': activeTitle || nextTitle || '',
    };

    let message = template;
    const tokens = Object.keys(replacements);
    for (let index = 0; index < tokens.length; index += 1) {
      const token = tokens[index];
      message = message.split(token).join(replacements[token]);
    }

    const progressUpdate = formatProgressUpdate(lastCompletedTitle, lastCompletedAt);
    if (progressUpdate) {
      message = `${message} ${progressUpdate}`.trim();
    }

    statusElement.textContent = message;
    statusElement.hidden = !message;
  }

  function applyHelpButtonLabel() {
    const buttons = collectHelpButtons();
    if (!buttons.length) {
      applyHelpStatus();
      return;
    }
    const state = storedState || loadStoredState();
    const steps = getStepConfig();
    const completedCount = state && Array.isArray(state.completedSteps)
      ? state.completedSteps.length
      : 0;
    const labelTemplate = tourTexts.resumeLabelWithProgress || tourTexts.resumeLabel;
    let label;
    if (state && state.completed) {
      label = tourTexts.restartLabel || tourTexts.startLabel || 'Start guided tutorial';
    } else if (state && state.activeStep) {
      if (labelTemplate) {
        label = labelTemplate
          .replace('{completed}', String(Math.min(completedCount, steps.length)))
          .replace('{total}', String(steps.length));
      }
      if (!label) {
        label = tourTexts.resumeLabel || tourTexts.startLabel || 'Resume guided tutorial';
      }
    } else if (completedCount > 0) {
      if (labelTemplate) {
        label = labelTemplate
          .replace('{completed}', String(Math.min(completedCount, steps.length)))
          .replace('{total}', String(steps.length));
      }
    } else {
      label = tourTexts.startLabel || 'Start guided tutorial';
    }
    for (let index = 0; index < buttons.length; index += 1) {
      const button = buttons[index];
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
    const startFromHelp = () => {
      storedState = loadStoredState();
      const resume = Boolean(storedState && storedState.activeStep);
      startTutorial({ resume });
    };

    const helpDialog = DOCUMENT && typeof DOCUMENT.getElementById === 'function'
      ? DOCUMENT.getElementById('helpDialog')
      : null;

    if (
      helpDialog &&
      typeof isDialogOpen === 'function' &&
      typeof closeDialog === 'function' &&
      isDialogOpen(helpDialog)
    ) {
      closeDialog(helpDialog);
      if (typeof helpDialog.setAttribute === 'function') {
        try {
          helpDialog.setAttribute('hidden', '');
        } catch (error) {
          void error;
        }
      }
      if (helpDialog && typeof helpDialog === 'object' && 'hidden' in helpDialog) {
        try {
          helpDialog.hidden = true;
        } catch (error) {
          void error;
        }
      }
      if (typeof GLOBAL_SCOPE.requestAnimationFrame === 'function') {
        GLOBAL_SCOPE.requestAnimationFrame(() => {
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
        delegatedHelpListener = event => {
          const trigger = resolveHelpTrigger(event && event.target);
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
      const completedSet = new Set(
        Array.isArray(storedState.completedSteps) ? storedState.completedSteps : [],
      );
      const steps = getStepConfig();
      const allStepsCovered = steps.every(step => completedSet.has(step.key));
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
    setTimeout(() => {
      const resume = storedState && storedState.activeStep;
      startTutorial({ resume, focusStart: true });
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
    DOCUMENT.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }

  function handleFactoryReset() {
    const persisted = saveState({ version: STORAGE_VERSION });
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
    const attached = new Set();
    const candidates = collectCandidateScopes(GLOBAL_SCOPE);
    for (let index = 0; index < candidates.length; index += 1) {
      const scope = candidates[index];
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

  const moduleApi = clone({
    start: startTutorial,
    skip: skipTutorial,
    reset() {
      const persisted = saveState({ version: STORAGE_VERSION });
      storedState = persisted || loadStoredState();
      applyHelpButtonLabel();
    },
    getStatus() {
      const state = loadStoredState();
      return clone(state);
    },
    isActive() {
      return active;
    },
  });

  MODULE_BASE.registerOrQueueModule(
    'cine.features.onboardingTour',
    moduleApi,
    {
      category: 'features',
      description: 'Guided onboarding tutorial for Cine Power Planner workflows.',
      replace: true,
      connections: ['cineModuleBase', 'cineUi'],
    },
    error => safeWarn('Unable to register cine.features.onboardingTour module.', error),
    GLOBAL_SCOPE,
    MODULE_BASE.getModuleRegistry && MODULE_BASE.getModuleRegistry(GLOBAL_SCOPE),
  );

  if (typeof MODULE_BASE.exposeGlobal === 'function') {
    MODULE_BASE.exposeGlobal('cineFeaturesOnboardingTour', moduleApi, GLOBAL_SCOPE, {
      configurable: true,
      enumerable: false,
      writable: false,
    });
  } else {
    try {
      GLOBAL_SCOPE.cineFeaturesOnboardingTour = moduleApi;
    } catch (error) {
      void error;
    }
  }
})();
