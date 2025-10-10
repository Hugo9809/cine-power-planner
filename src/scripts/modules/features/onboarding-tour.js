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

  function normalizeCompletedSteps(value) {
    if (!Array.isArray(value)) {
      return [];
    }
    const normalized = [];
    for (let index = 0; index < value.length; index += 1) {
      const entry = value[index];
      if (typeof entry !== 'string' || !entry) {
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
    snapshot.activeStep = typeof snapshot.activeStep === 'string' && snapshot.activeStep
      ? snapshot.activeStep
      : null;
    snapshot.completedSteps = normalizeCompletedSteps(snapshot.completedSteps);
    if (typeof snapshot.timestamp !== 'number' || Number.isNaN(snapshot.timestamp)) {
      snapshot.timestamp = Date.now ? Date.now() : new Date().getTime();
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
      timestamp: Date.now ? Date.now() : new Date().getTime(),
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

  const DEFAULT_STEP_KEYS = [
    'intro',
    'projectOverview',
    'deviceSelection',
    'gearGeneration',
    'gearCustomization',
    'resultsReview',
    'powerSummary',
    'contactsOwnGear',
    'autoGear',
    'overviewPrint',
    'exportImport',
    'backupRestore',
    'completion',
  ];

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
      const localEntry = localized.steps && localized.steps[key];
      const fallbackEntry = fallback.steps && fallback.steps[key];
      steps[key] = localEntry || fallbackEntry || { title: key, body: '' };
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
        key: 'projectOverview',
        highlight: '#setup-manager',
        focus: '#setupName',
      },
      {
        key: 'deviceSelection',
        highlight: '#setup-config',
      },
      {
        key: 'gearGeneration',
        highlight: '#generateGearListBtn',
      },
      {
        key: 'gearCustomization',
        highlight: '[data-nav-key="gearListNav"]',
      },
      {
        key: 'resultsReview',
        highlight: '[data-nav-key="resultsHeading"]',
        alternateHighlight: '#resultsHeading',
        focus: '#resultsHeading',
      },
      {
        key: 'powerSummary',
        highlight: '#resultsPlainSummary',
        alternateHighlight: '#resultsHeading',
        focus: '#resultsPlainSummaryTitle',
      },
      {
        key: 'contactsOwnGear',
        highlight: '#openContactsBtn',
        alternateHighlight: '[data-nav-key="ownGearNav"]',
      },
      {
        key: 'autoGear',
        highlight: '#autoGearHeading',
        ensureSettings: { tabId: 'settingsTab-autoGear' },
      },
      {
        key: 'overviewPrint',
        highlight: '#generateOverviewBtn',
      },
      {
        key: 'exportImport',
        highlight: '#shareSetupBtn',
        alternateHighlight: '#applySharedLinkBtn',
      },
      {
        key: 'backupRestore',
        highlight: '#backupSettings',
        ensureSettings: { tabId: 'settingsTab-backup' },
      },
      {
        key: 'completion',
        highlight: null,
      },
    ];
  }

  let stepConfig = getStepConfig();

  let overlayRoot = null;
  let backdropEl = null;
  let highlightEl = null;
  let cardEl = null;
  let titleEl = null;
  let bodyEl = null;
  let progressEl = null;
  let progressMeterEl = null;
  let progressMeterFillEl = null;
  let stepListEl = null;
  let resumeHintEl = null;
  let backButton = null;
  let nextButton = null;
  let skipButton = null;

  let active = false;
  let currentIndex = -1;
  let currentStep = null;
  let pendingFrame = null;
  let autoOpenedSettings = false;
  let settingsDialogRef = null;
  let resumeHintVisible = false;
  let resumeStartIndex = null;

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
    const template = typeof tourTexts.stepIndicator === 'string'
      ? tourTexts.stepIndicator
      : 'Step {current} of {total}';
    const current = index + 1;
    return template
      .replace('{current}', current)
      .replace('{total}', total);
  }

  function focusCard() {
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

  function updateHighlightPosition() {
    if (!highlightEl) {
      return;
    }
    const target = getTargetElement(currentStep);
    if (!target) {
      highlightEl.style.transform = 'scale(0)';
      highlightEl.style.opacity = '0';
      return;
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
  }

  function positionCard() {
    if (!cardEl) {
      return;
    }
    const viewportWidth = GLOBAL_SCOPE.innerWidth || DOCUMENT.documentElement.clientWidth || 0;
    const viewportHeight = GLOBAL_SCOPE.innerHeight || DOCUMENT.documentElement.clientHeight || 0;
    const target = getTargetElement(currentStep);
    const cardRect = cardEl.getBoundingClientRect();
    let top = (GLOBAL_SCOPE.scrollY || GLOBAL_SCOPE.pageYOffset || 0) + Math.max(24, (viewportHeight - cardRect.height) / 2);
    let left = (GLOBAL_SCOPE.scrollX || GLOBAL_SCOPE.pageXOffset || 0) + Math.max(24, (viewportWidth - cardRect.width) / 2);

    if (target) {
      const rect = target.getBoundingClientRect();
      const targetTop = rect.top + (GLOBAL_SCOPE.scrollY || GLOBAL_SCOPE.pageYOffset || 0);
      const targetLeft = rect.left + (GLOBAL_SCOPE.scrollX || GLOBAL_SCOPE.pageXOffset || 0);
      const spaceBelow = (GLOBAL_SCOPE.innerHeight || viewportHeight) - (rect.bottom);
      const spaceAbove = rect.top;
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

    const maxTop = (GLOBAL_SCOPE.scrollY || GLOBAL_SCOPE.pageYOffset || 0) + viewportHeight - cardRect.height - 24;
    const maxLeft = (GLOBAL_SCOPE.scrollX || GLOBAL_SCOPE.pageXOffset || 0) + viewportWidth - cardRect.width - 24;

    cardEl.style.top = `${Math.max(24 + (GLOBAL_SCOPE.scrollY || GLOBAL_SCOPE.pageYOffset || 0), Math.min(top, maxTop))}px`;
    cardEl.style.left = `${Math.max(24 + (GLOBAL_SCOPE.scrollX || GLOBAL_SCOPE.pageXOffset || 0), Math.min(left, maxLeft))}px`;
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

    const step = stepConfig[index];
    const previousStep = currentStep;

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
    const nextState = {
      ...storedState,
      completedSteps: completed,
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
    const nextState = {
      ...storedState,
      completed: true,
      skipped: false,
      activeStep: null,
      completedSteps: allStepKeys,
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

  function applyHelpButtonLabel() {
    const button = DOCUMENT.getElementById(HELP_BUTTON_ID);
    if (!button) {
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
    button.textContent = label;
  }

  function handleHelpButtonClick(event) {
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
    }
    storedState = loadStoredState();
    const resume = Boolean(storedState && storedState.activeStep);
    startTutorial({ resume });
  }

  function attachHelpButton() {
    const button = DOCUMENT.getElementById(HELP_BUTTON_ID);
    if (!button) {
      return;
    }
    button.addEventListener('click', handleHelpButtonClick);
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
  }

  if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.addEventListener === 'function') {
    GLOBAL_SCOPE.addEventListener('languagechange', handleLanguageChange);
    GLOBAL_SCOPE.addEventListener('cameraPowerPlannerFactoryReset', handleFactoryReset);
  }

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
