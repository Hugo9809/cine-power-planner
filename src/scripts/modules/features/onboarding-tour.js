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
    'userProfile',
    'unitsPreferences',
    'nameProject',
    'saveProject',
    'addCamera',
    'addMonitoring',
    'selectBattery',
    'results',
    'batteryComparison',
    'runtimeFeedback',
    'connectionDiagram',
    'editDeviceData',
    'ownGear',
    'generateGearAndRequirements',
    'autoGearRules',
    'projectRequirements',
    'gearList',
    'exportImport',
    'overviewAndPrint',
    'help',
    'settingsGeneral',
    'settingsData',
    'settingsBackup',
    'completion',
  ];

  const DEFAULT_STEP_TEXTS = {
    intro: {
      title: 'Welcome to Cine Power Planner',
      body:
        'This expanded walkthrough orients every workflow that protects your crew data, from first project setup to redundant backups. Each step saves progress offline so you can pause anytime and resume without losing guardrails.',
    },
    userProfile: {
      title: 'Configure your user profile',
      body:
        'Pick your language plus your display name, role, phone, email and photo directly in this card. Every change syncs to Contacts instantly, saves offline with your projects and ensures exports credit the right owner.',
    },
    unitsPreferences: {
      title: 'Tune theme and units',
      body:
        'Use Settings → General to choose dark or light theme, optional pink mode highlights and default temperature units. Request persistent storage so browsers keep these preferences and every save safe during low-space cleanups.',
    },
    nameProject: {
      title: 'Name your first project',
      body:
        'Enter a descriptive project name to anchor autosave, history, exports and backups. Every subsequent workflow references this name so your offline library stays organized and easy to restore.',
    },
    saveProject: {
      title: 'Capture an immediate save',
      body:
        'Press Save (or use Ctrl+S/⌘S/Enter) to write a complete offline snapshot—devices, runtime math, requirements, notes and diagnostics. The planner confirms completion before enabling the next workflow.',
    },
    addCamera: {
      title: 'Select the primary camera',
      body:
        'Choose the camera body you are planning for. Offline search is available inside the dropdown. Selecting a body unlocks accessories, power draws and diagrams tailored to that choice.',
    },
    addMonitoring: {
      title: 'Add monitors, wireless video and FIZ',
      body:
        'Pick onboard monitors, wireless transmitters and FIZ motors or controllers. Each selection feeds runtime math, diagrams and automatic gear rules so the generated kit reflects the full build.',
    },
    selectBattery: {
      title: 'Choose batteries or DC sources',
      body:
        'Select the battery system or DC input that powers the rig. Runtime projections update immediately and the selection is stored with your offline project snapshots and backups.',
    },
    results: {
      title: 'Review the results summary',
      body:
        'Use the Power Summary to verify total draw, per-pack runtime projections, reserve margins and changeover countdowns before locking the build. Expand each battery group for device-by-device contribution details, charger requirements and status notes. Download the offline report for redundant backups, document any warnings that need action ahead of call time and confirm the autosave banner shows the latest timestamp so shares and exports capture the same data.',
    },
    batteryComparison: {
      title: 'Compare battery options',
      body:
        'Open Battery Comparison to evaluate alternate packs side by side. The chart keeps calculations offline so you can test scenarios and lock in the safest runtime margin for the day.',
    },
    runtimeFeedback: {
      title: 'Submit runtime feedback',
      body:
        'Use the runtime feedback button to log real-world results. Entries sync with the current project, strengthen future estimates and remain available offline for audits.',
    },
    connectionDiagram: {
      title: 'Inspect the connection diagram',
      body:
        'The interactive diagram shows how power, video and control gear connect. Drag nodes to plan rig layout, then save so the arrangement and annotations persist across exports and restores.',
    },
    editDeviceData: {
      title: 'Edit device data',
      body:
        'Open the Device Library editor to add or adjust cameras, batteries and accessories. Updates are stored locally, included in backups and carried into every export or share bundle.',
    },
    ownGear: {
      title: 'Document your own gear',
      body:
        'Track owned inventory in the Own Gear dialog. Items saved here appear in gear lists, exports and backups so every workstation knows which equipment is already on hand.',
    },
    generateGearAndRequirements: {
      title: 'Generate requirements and gear list',
      body:
        'Use Generate Gear List and Project Requirements to rebuild the checklist after every change. The planner saves the output with the project so PDFs, exports and backups always reflect the latest selections.',
    },
    autoGearRules: {
      title: 'Review automatic gear rules',
      body:
        'Settings → Automatic Gear Rules lets you define conditions that auto-add monitors, wireless links, FIZ gear and cables. Rules execute offline every time you regenerate the kit, ensuring nothing critical is missed.',
    },
    projectRequirements: {
      title: 'Refine project requirements boxes',
      body:
        'Adjust the Project Requirements output to capture crew notes, deliverables and safety reminders. Every box is saved with the project, prints with overviews and flows into exports.',
    },
    gearList: {
      title: 'Audit the generated gear list',
      body:
        'Check the categorized gear list for duplicates, counts and auto-added accessories. Edits save instantly, are included in share bundles and appear in printouts and PDFs.',
    },
    exportImport: {
      title: 'Export and import projects',
      body:
        'Use Export Project to download a JSON safety copy and Import Project to rehearse restores. Store exports on redundant media so no workstation loses data if a browser profile resets.',
    },
    overviewAndPrint: {
      title: 'Generate overview, PDF and printouts',
      body:
        'Generate the project overview to access PDF, print and share-ready summaries. The dialog uses saved data only, so you can print or export even while fully offline.',
    },
    help: {
      title: 'Open the Help center',
      body:
        'The Help dialog includes searchable documentation, translation notes and onboarding references. Keep it pinned while working—articles stay cached offline and update when new features arrive.',
    },
    settingsGeneral: {
      title: 'Revisit Settings → General',
      body:
        'Adjust language, typography, theme, pink mode, focus scale and other presentation options anytime. Preferences save locally, sync across projects and are bundled with backups.',
    },
    settingsData: {
      title: 'Monitor Data & Storage',
      body:
        'Use the Data & Storage tab to request persistent storage, watch save timestamps and launch quick safeguards. These controls verify that every project snapshot remains available offline.',
    },
    settingsBackup: {
      title: 'Maintain Backup & Restore',
      body:
        'The Backup & Restore tab manages full-app exports, restore rehearsals and diagnostics. Run backups before major changes, archive the files on external media and verify restores regularly.',
    },
    completion: {
      title: 'Tutorial complete',
      body:
        'You now know every safeguard. Keep saving often, export redundant backups and revisit any step from Help whenever you want a refresher. Cine Power Planner will keep protecting your data offline.',
    },
  };

  const PREFACE_STEP_KEYS = ['intro'];

  function isPrefaceStepKey(key) {
    return typeof key === 'string' && PREFACE_STEP_KEYS.indexOf(key) !== -1;
  }

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

  function createAnyFieldCompletionRequirement(selectors, predicate, events) {
    const normalizedSelectors = Array.isArray(selectors) ? selectors.slice() : [selectors];
    const eventList = Array.isArray(events) && events.length ? events : ['change', 'input'];
    const evaluator = typeof predicate === 'function'
      ? predicate
      : (value => Boolean(value && value !== 'None'));

    return {
      check() {
        let elementFound = false;
        for (let index = 0; index < normalizedSelectors.length; index += 1) {
          const selector = normalizedSelectors[index];
          if (!selector) {
            continue;
          }
          const element = getElement(selector);
          if (!element) {
            continue;
          }
          elementFound = true;
          try {
            if (evaluator(getFieldValue(element), element)) {
              return true;
            }
          } catch (error) {
            safeWarn('cine.features.onboardingTour could not evaluate multi-field requirement.', error);
          }
        }
        return !elementFound;
      },
      attach(context) {
        const removers = [];
        let elementFound = false;
        const evaluate = () => {
          let matches = false;
          for (let index = 0; index < normalizedSelectors.length; index += 1) {
            const selector = normalizedSelectors[index];
            if (!selector) {
              continue;
            }
            const element = getElement(selector);
            if (!element) {
              continue;
            }
            elementFound = true;
            try {
              if (evaluator(getFieldValue(element), element)) {
                matches = true;
                break;
              }
            } catch (error) {
              safeWarn('cine.features.onboardingTour could not evaluate multi-field change.', error);
            }
          }
          if (!elementFound) {
            matches = true;
          }
          if (matches) {
            if (typeof context.complete === 'function') {
              context.complete();
            }
          } else if (typeof context.incomplete === 'function') {
            context.incomplete();
          }
        };

        for (let index = 0; index < normalizedSelectors.length; index += 1) {
          const selector = normalizedSelectors[index];
          if (!selector) {
            continue;
          }
          const element = getElement(selector);
          if (!element) {
            continue;
          }
          elementFound = true;
          const handler = () => {
            evaluate();
          };
          for (let eventIndex = 0; eventIndex < eventList.length; eventIndex += 1) {
            const eventName = eventList[eventIndex];
            element.addEventListener(eventName, handler);
            removers.push(() => {
              element.removeEventListener(eventName, handler);
            });
          }
        }

        evaluate();

        return () => {
          for (let index = 0; index < removers.length; index += 1) {
            try {
              removers[index]();
            } catch (error) {
              safeWarn('cine.features.onboardingTour could not detach multi-field requirement.', error);
            }
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
    addMonitoring: createAnyFieldCompletionRequirement(
      [
        '#monitorSelect',
        '#videoSelect',
        '#motor1Select',
        '#controller1Select',
      ],
      (value, element) => {
        if (!value) {
          return false;
        }
        if (value === 'None' || value === '__none__') {
          return false;
        }
        if (element && element.multiple) {
          return element.selectedOptions && element.selectedOptions.length > 0;
        }
        return true;
      },
      ['change'],
    ),
    selectBattery: createFieldCompletionRequirement(
      '#batterySelect',
      value => value && value !== 'None',
      ['change'],
    ),
    generateGearAndRequirements: createClickCompletionRequirement('#generateGearListBtn'),
    exportImport: createClickCompletionRequirement(
      ['#shareSetupBtn', '#applySharedLinkBtn'],
    ),
    overviewAndPrint: createClickCompletionRequirement('#generateOverviewBtn'),
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
        size: 'large',
      },
      {
        key: 'userProfile',
        highlight: null,
        forceFloating: true,
        size: 'large',
      },
      {
        key: 'unitsPreferences',
        highlight: '#settingsButton',
        focus: '#settingsButton',
        ensureSettings: {
          tabId: 'settingsTab-general',
          autoOpen: false,
        },
        size: 'large',
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
        key: 'addMonitoring',
        highlight: ['#monitorSelectRow', '#wirelessVideoRow', '#fizFieldset'],
        focus: '#monitorSelect',
      },
      {
        key: 'selectBattery',
        highlight: '#batterySelect',
      },
      {
        key: 'results',
        highlight: '#results',
      },
      {
        key: 'batteryComparison',
        highlight: '#batteryComparison',
      },
      {
        key: 'runtimeFeedback',
        highlight: '#runtimeFeedbackBtn',
      },
      {
        key: 'connectionDiagram',
        highlight: '#diagramArea',
      },
      {
        key: 'editDeviceData',
        highlight: '#toggleDeviceManager',
      },
      {
        key: 'ownGear',
        highlight: '#ownGearDialog',
        ensureOwnGear: true,
        focus: '#ownGearName',
      },
      {
        key: 'generateGearAndRequirements',
        highlight: '#generateGearListBtn',
      },
      {
        key: 'autoGearRules',
        highlight: '#settingsPanel-autoGear',
        ensureSettings: {
          tabId: 'settingsTab-autoGear',
        },
      },
      {
        key: 'projectRequirements',
        highlight: '#projectRequirementsOutput',
      },
      {
        key: 'gearList',
        highlight: '#gearListOutput',
      },
      {
        key: 'exportImport',
        highlight: '#shareSetupBtn',
        alternateHighlight: '#applySharedLinkBtn',
      },
      {
        key: 'overviewAndPrint',
        highlight: '#generateOverviewBtn',
      },
      {
        key: 'help',
        highlight: '#helpButton',
        focus: '#helpButton',
      },
      {
        key: 'settingsGeneral',
        highlight: '#settingsPanel-general',
        ensureSettings: {
          tabId: 'settingsTab-general',
        },
      },
      {
        key: 'settingsData',
        highlight: '#settingsPanel-data',
        ensureSettings: {
          tabId: 'settingsTab-data',
        },
      },
      {
        key: 'settingsBackup',
        highlight: '#settingsPanel-backup',
        ensureSettings: {
          tabId: 'settingsTab-backup',
        },
      },
      {
        key: 'completion',
        highlight: null,
      },
    ];
  }

  let stepConfig = getStepConfig();

  function isPrefaceStep(step) {
    return Boolean(step && isPrefaceStepKey(step.key));
  }

  function getCountedSteps(config) {
    const source = Array.isArray(config) ? config : stepConfig;
    const counted = [];
    for (let index = 0; index < source.length; index += 1) {
      const candidate = source[index];
      if (candidate && !isPrefaceStep(candidate)) {
        counted.push(candidate);
      }
    }
    return counted;
  }

  function getCountedStepIndex(step, config) {
    if (!step) {
      return -1;
    }
    const source = Array.isArray(config) ? config : stepConfig;
    let countedIndex = -1;
    let seen = 0;
    for (let index = 0; index < source.length; index += 1) {
      const candidate = source[index];
      if (!candidate || isPrefaceStep(candidate)) {
        continue;
      }
      if (candidate === step) {
        countedIndex = seen;
        break;
      }
      seen += 1;
    }
    return countedIndex;
  }

  function getCountedCompletedLength(completed, config) {
    const source = Array.isArray(config) ? config : stepConfig;
    const countedKeys = new Set();
    for (let index = 0; index < source.length; index += 1) {
      const candidate = source[index];
      if (candidate && !isPrefaceStep(candidate) && typeof candidate.key === 'string') {
        countedKeys.add(candidate.key);
      }
    }
    if (!completed) {
      return 0;
    }
    let count = 0;
    if (typeof completed.forEach === 'function') {
      completed.forEach(key => {
        if (countedKeys.has(key)) {
          count += 1;
        }
      });
      return count;
    }
    if (Array.isArray(completed)) {
      for (let index = 0; index < completed.length; index += 1) {
        const key = completed[index];
        if (countedKeys.has(key)) {
          count += 1;
        }
      }
    }
    return count;
  }

  let overlayRoot = null;
  let highlightEl = null;
  let activeTargetElements = [];
  let cardEl = null;
  let titleEl = null;
  let bodyEl = null;
  let progressEl = null;
  let progressMeterEl = null;
  let progressMeterFillEl = null;
  let cardContentEl = null;
  let stepListContainerEl = null;
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
  let autoOpenedContacts = false;
  let contactsDialogRef = null;
  let autoOpenedOwnGear = false;
  let ownGearDialogRef = null;
  let resumeHintVisible = false;
  let resumeStartIndex = null;

  let activeRequirementCleanup = null;
  let activeRequirementCompleted = false;
  let activeInteractionCleanup = null;
  let lastCardPlacement = 'floating';
  let proxyControlId = 0;

  function getProxyControlId(prefix) {
    proxyControlId += 1;
    return `onboarding-${prefix}-${proxyControlId}`;
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

  function getOverlayMetrics() {
    const fallbackWidth = (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.innerWidth === 'number')
      ? GLOBAL_SCOPE.innerWidth
      : (DOCUMENT && DOCUMENT.documentElement && DOCUMENT.documentElement.clientWidth) || 0;
    const fallbackHeight = (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.innerHeight === 'number')
      ? GLOBAL_SCOPE.innerHeight
      : (DOCUMENT && DOCUMENT.documentElement && DOCUMENT.documentElement.clientHeight) || 0;

    if (!overlayRoot || typeof overlayRoot.getBoundingClientRect !== 'function') {
      return {
        offsetLeft: 0,
        offsetTop: 0,
        viewportWidth: fallbackWidth,
        viewportHeight: fallbackHeight,
      };
    }

    const rect = overlayRoot.getBoundingClientRect();
    const width = rect && typeof rect.width === 'number' && rect.width > 0 ? rect.width : fallbackWidth;
    const height = rect && typeof rect.height === 'number' && rect.height > 0 ? rect.height : fallbackHeight;

    return {
      offsetLeft: -rect.left,
      offsetTop: -rect.top,
      viewportWidth: width,
      viewportHeight: height,
    };
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

    cardContentEl = DOCUMENT.createElement('div');
    cardContentEl.className = 'onboarding-card-content';
    cardEl.appendChild(cardContentEl);

    resumeHintEl = DOCUMENT.createElement('p');
    resumeHintEl.className = 'onboarding-resume-hint';
    resumeHintEl.hidden = true;
    cardContentEl.appendChild(resumeHintEl);

    titleEl = DOCUMENT.createElement('h2');
    titleEl.id = 'onboardingCardTitle';
    cardContentEl.appendChild(titleEl);

    bodyEl = DOCUMENT.createElement('p');
    bodyEl.id = 'onboardingCardBody';
    cardContentEl.appendChild(bodyEl);

    interactionContainerEl = DOCUMENT.createElement('div');
    interactionContainerEl.className = 'onboarding-interaction';
    interactionContainerEl.hidden = true;
    cardContentEl.appendChild(interactionContainerEl);

    stepListContainerEl = DOCUMENT.createElement('div');
    stepListContainerEl.className = 'onboarding-step-list-container';
    cardEl.appendChild(stepListContainerEl);

    stepListEl = DOCUMENT.createElement('ol');
    stepListEl.className = 'onboarding-step-list';
    stepListEl.setAttribute('role', 'list');
    stepListEl.addEventListener('click', handleStepListClick);
    stepListContainerEl.appendChild(stepListEl);

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
    clearActiveTargetElements();
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
    cardContentEl = null;
    stepListContainerEl = null;
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

  function formatStepIndicator(step, index) {
    const template = typeof tourTexts.stepIndicator === 'string'
      ? tourTexts.stepIndicator
      : 'Step {current} of {total}';
    const countedSteps = getCountedSteps();
    const countedTotal = countedSteps.length;
    const countedIndex = getCountedStepIndex(step);
    const current = countedIndex >= 0 ? countedIndex + 1 : index + 1;
    const total = countedTotal > 0 ? countedTotal : countedSteps.length;
    return template
      .replace('{current}', String(current))
      .replace('{total}', String(total));
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

  function toSelectorArray(value) {
    if (typeof value === 'string') {
      return value ? [value] : [];
    }
    if (Array.isArray(value)) {
      const selectors = [];
      for (let index = 0; index < value.length; index += 1) {
        const entry = value[index];
        if (typeof entry === 'string' && entry) {
          selectors.push(entry);
        }
      }
      return selectors;
    }
    return [];
  }

  function resolveSelectorElements(selectors) {
    if (!Array.isArray(selectors) || selectors.length === 0) {
      return [];
    }
    const elements = [];
    for (let index = 0; index < selectors.length; index += 1) {
      const selector = selectors[index];
      if (!selector) {
        continue;
      }
      const element = DOCUMENT.querySelector(selector);
      if (element) {
        elements.push(element);
      }
    }
    return elements;
  }

  function getHighlightElements(step) {
    if (!step) {
      return [];
    }
    let elements = resolveSelectorElements(toSelectorArray(step.highlight));
    if (elements.length === 0) {
      elements = resolveSelectorElements(toSelectorArray(step.alternateHighlight));
    }
    return elements;
  }

  function getTargetElement(step) {
    if (!step) {
      return null;
    }
    if (
      step.ensureSettings
      && step.ensureSettings.autoOpen !== false
      && (!settingsDialogRef || !isSettingsDialogVisible())
    ) {
      return null;
    }
    const elements = getHighlightElements(step);
    return elements.length > 0 ? elements[0] : null;
  }

  function clearActiveTargetElements() {
    if (!Array.isArray(activeTargetElements)) {
      activeTargetElements = [];
      return;
    }
    for (let index = 0; index < activeTargetElements.length; index += 1) {
      const element = activeTargetElements[index];
      if (
        element
        && element.classList
        && typeof element.classList.remove === 'function'
      ) {
        element.classList.remove('onboarding-active-target');
      }
    }
    activeTargetElements = [];
  }

  function updateHighlightPosition() {
    if (!highlightEl) {
      return;
    }
    const highlightElements = getHighlightElements(currentStep);
    if (highlightElements.length === 0) {
      if (activeTargetElements.length > 0) {
        clearActiveTargetElements();
      }
      highlightEl.style.transform = 'scale(0)';
      highlightEl.style.opacity = '0';
      positionCard(null, null);
      return;
    }

    clearActiveTargetElements();
    for (let index = 0; index < highlightElements.length; index += 1) {
      const element = highlightElements[index];
      if (!element) {
        continue;
      }
      if (
        element.classList
        && typeof element.classList.add === 'function'
      ) {
        element.classList.add('onboarding-active-target');
      }
      activeTargetElements.push(element);
    }

    const combinedRect = highlightElements.reduce((acc, element) => {
      if (!element || typeof element.getBoundingClientRect !== 'function') {
        return acc;
      }
      const rect = element.getBoundingClientRect();
      if (!acc) {
        return {
          top: rect.top,
          right: rect.right,
          bottom: rect.bottom,
          left: rect.left,
        };
      }
      return {
        top: Math.min(acc.top, rect.top),
        right: Math.max(acc.right, rect.right),
        bottom: Math.max(acc.bottom, rect.bottom),
        left: Math.min(acc.left, rect.left),
      };
    }, null);

    if (!combinedRect) {
      highlightEl.style.transform = 'scale(0)';
      highlightEl.style.opacity = '0';
      positionCard(highlightElements[0] || null, null);
      return;
    }

    combinedRect.width = Math.max(0, combinedRect.right - combinedRect.left);
    combinedRect.height = Math.max(0, combinedRect.bottom - combinedRect.top);

    const padding = 12;
    const width = Math.max(0, combinedRect.width + padding * 2);
    const height = Math.max(0, combinedRect.height + padding * 2);
    const { offsetLeft, offsetTop } = getOverlayMetrics();
    const left = combinedRect.left + offsetLeft - padding;
    const top = combinedRect.top + offsetTop - padding;

    highlightEl.style.width = `${width}px`;
    highlightEl.style.height = `${height}px`;
    highlightEl.style.transform = `translate(${Math.max(0, left)}px, ${Math.max(0, top)}px)`;
    highlightEl.style.opacity = '1';
    positionCard(highlightElements[0] || null, combinedRect);
  }

  function positionCard(target, targetRect) {
    if (!cardEl) {
      return;
    }
    const {
      offsetLeft: scrollX,
      offsetTop: scrollY,
      viewportWidth,
      viewportHeight,
    } = getOverlayMetrics();
    const targetElement = target || getTargetElement(currentStep);
    const resolvedRect = targetRect || (targetElement ? targetElement.getBoundingClientRect() : null);
    const forceFloating = Boolean(currentStep && currentStep.forceFloating);
    const cardRect = cardEl.getBoundingClientRect();
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

    if (!forceFloating && targetElement && resolvedRect) {
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
    const shouldAutoOpen = step.ensureSettings.autoOpen !== false;
    const wasOpen = typeof isDialogOpen === 'function'
      ? isDialogOpen(dialog)
      : !dialog.hasAttribute('hidden');
    settingsDialogRef = dialog;
    if (!wasOpen && shouldAutoOpen) {
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

  function ensureContactsForStep(step) {
    if (!step || !step.ensureContacts) {
      return;
    }

    if (!contactsDialogRef) {
      contactsDialogRef = DOCUMENT.getElementById('contactsDialog');
    }

    const dialog = contactsDialogRef;
    if (!dialog) {
      return;
    }

    const isVisible = isContactsDialogVisible();
    if (isVisible) {
      return;
    }

    autoOpenedContacts = true;

    const openButton = DOCUMENT.getElementById('openContactsBtn')
      || DOCUMENT.querySelector('[data-sidebar-action="open-contacts"]');
    if (openButton && typeof openButton.click === 'function') {
      try {
        openButton.click();
      } catch (error) {
        safeWarn('cine.features.onboardingTour could not trigger contacts button click.', error);
      }
    }

    if (isContactsDialogVisible()) {
      return;
    }

    dialog.removeAttribute('hidden');
    if (typeof openDialog === 'function') {
      try {
        openDialog(dialog);
        return;
      } catch (error) {
        safeWarn('cine.features.onboardingTour could not open contacts dialog.', error);
      }
    }
    if (typeof dialog.showModal === 'function') {
      try {
        dialog.showModal();
        return;
      } catch (error) {
        safeWarn('cine.features.onboardingTour could not show contacts dialog.', error);
      }
    }
    dialog.setAttribute('open', '');
  }

  function isContactsDialogVisible() {
    if (!contactsDialogRef) {
      return false;
    }
    if (typeof isDialogOpen === 'function') {
      try {
        return isDialogOpen(contactsDialogRef);
      } catch (error) {
        safeWarn('cine.features.onboardingTour could not evaluate contacts dialog state.', error);
      }
    }
    return !contactsDialogRef.hasAttribute('hidden');
  }

  function closeContactsIfNeeded() {
    if (!contactsDialogRef || !autoOpenedContacts) {
      autoOpenedContacts = false;
      return;
    }
    if (typeof closeDialog === 'function') {
      try {
        closeDialog(contactsDialogRef);
      } catch (error) {
        safeWarn('cine.features.onboardingTour could not close contacts dialog via closeDialog.', error);
      }
    } else if (typeof contactsDialogRef.close === 'function') {
      try {
        contactsDialogRef.close();
      } catch (error) {
        safeWarn('cine.features.onboardingTour could not close contacts dialog.', error);
      }
    }
    contactsDialogRef.setAttribute('hidden', '');
    autoOpenedContacts = false;
  }

  function ensureOwnGearForStep(step) {
    if (!step || !step.ensureOwnGear) {
      return;
    }

    if (!ownGearDialogRef) {
      ownGearDialogRef = DOCUMENT.getElementById('ownGearDialog');
    }

    const dialog = ownGearDialogRef;
    if (!dialog) {
      return;
    }

    if (isOwnGearDialogVisible()) {
      return;
    }

    autoOpenedOwnGear = true;

    const trigger = DOCUMENT.querySelector('[data-sidebar-action="open-own-gear"]');
    if (trigger && typeof trigger.click === 'function') {
      try {
        trigger.click();
      } catch (error) {
        safeWarn('cine.features.onboardingTour could not trigger own gear button click.', error);
      }
    }

    if (isOwnGearDialogVisible()) {
      return;
    }

    dialog.removeAttribute('hidden');
    if (typeof openDialog === 'function') {
      try {
        openDialog(dialog);
        return;
      } catch (error) {
        safeWarn('cine.features.onboardingTour could not open own gear dialog.', error);
      }
    }
    if (typeof dialog.showModal === 'function') {
      try {
        dialog.showModal();
        return;
      } catch (error) {
        safeWarn('cine.features.onboardingTour could not show own gear dialog.', error);
      }
    }
    dialog.setAttribute('open', '');
  }

  function isOwnGearDialogVisible() {
    if (!ownGearDialogRef) {
      return false;
    }
    if (typeof isDialogOpen === 'function') {
      try {
        return isDialogOpen(ownGearDialogRef);
      } catch (error) {
        safeWarn('cine.features.onboardingTour could not evaluate own gear dialog state.', error);
      }
    }
    return !ownGearDialogRef.hasAttribute('hidden');
  }

  function closeOwnGearIfNeeded() {
    if (!ownGearDialogRef || !autoOpenedOwnGear) {
      autoOpenedOwnGear = false;
      return;
    }
    if (typeof closeDialog === 'function') {
      try {
        closeDialog(ownGearDialogRef);
      } catch (error) {
        safeWarn('cine.features.onboardingTour could not close own gear dialog via closeDialog.', error);
      }
    } else if (typeof ownGearDialogRef.close === 'function') {
      try {
        ownGearDialogRef.close();
      } catch (error) {
        safeWarn('cine.features.onboardingTour could not close own gear dialog.', error);
      }
    }
    ownGearDialogRef.setAttribute('hidden', '');
    autoOpenedOwnGear = false;
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
    const step = stepConfig[index];
    if (!step || isPrefaceStep(step)) {
      resumeHintEl.hidden = true;
      resumeHintEl.textContent = '';
      return;
    }
    const countedSteps = getCountedSteps();
    const totalSteps = countedSteps.length;
    const completedSteps = storedState && Array.isArray(storedState.completedSteps)
      ? getCountedCompletedLength(storedState.completedSteps, countedSteps)
      : 0;
    const countedIndex = getCountedStepIndex(step, countedSteps);
    const template = tourTexts.resumeHintDetailed || tourTexts.resumeHint || 'Resuming where you left off.';
    const hint = template
      .replace('{current}', String(Math.max(1, countedIndex + 1)))
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

    let displayIndex = 0;
    for (let index = 0; index < stepConfig.length; index += 1) {
      const step = stepConfig[index];
      if (!step || isPrefaceStep(step)) {
        continue;
      }
      const texts = getStepTexts(step);
      const item = DOCUMENT.createElement('li');
      item.className = 'onboarding-step-item';
      if (displayIndex < 3) {
        item.classList.add('onboarding-step-item--pinned');
        if (item && item.style && typeof item.style.setProperty === 'function') {
          item.style.setProperty('--onboarding-step-pinned-index', String(displayIndex));
        }
      }

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
      displayIndex += 1;
    }
  }

  function focusHighlightedElement(step) {
    if (!step) {
      return false;
    }
    const selectors = [];
    const focusSelectors = toSelectorArray(step.focus);
    for (let index = 0; index < focusSelectors.length; index += 1) {
      const selector = focusSelectors[index];
      if (selectors.indexOf(selector) === -1) {
        selectors.push(selector);
      }
    }
    const highlightSelectors = toSelectorArray(step.highlight);
    for (let index = 0; index < highlightSelectors.length; index += 1) {
      const selector = highlightSelectors[index];
      if (selectors.indexOf(selector) === -1) {
        selectors.push(selector);
      }
    }
    const alternateSelectors = toSelectorArray(step.alternateHighlight);
    for (let index = 0; index < alternateSelectors.length; index += 1) {
      const selector = alternateSelectors[index];
      if (selectors.indexOf(selector) === -1) {
        selectors.push(selector);
      }
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

  function dispatchSyntheticEvent(target, type) {
    if (!target || !type) {
      return;
    }
    try {
      const event = new Event(type, { bubbles: true, cancelable: true });
      target.dispatchEvent(event);
    } catch (error) {
      try {
        const legacyEvent = DOCUMENT.createEvent('Event');
        legacyEvent.initEvent(type, true, true);
        target.dispatchEvent(legacyEvent);
      } catch (legacyError) {
        safeWarn('cine.features.onboardingTour could not dispatch synthetic event.', legacyError || error);
      }
    }
  }

  function renderUserProfileInteraction(registerCleanup) {
    if (!interactionContainerEl) {
      return false;
    }

    const profileInput = DOCUMENT.getElementById('userProfileName');
    const profileLabel = DOCUMENT.getElementById('userProfileNameLabel');
    const roleInput = DOCUMENT.getElementById('userProfileRole');
    const roleLabel = DOCUMENT.getElementById('userProfileRoleLabel');
    const phoneInput = DOCUMENT.getElementById('userProfilePhone');
    const phoneLabel = DOCUMENT.getElementById('userProfilePhoneLabel');
    const emailInput = DOCUMENT.getElementById('userProfileEmail');
    const emailLabel = DOCUMENT.getElementById('userProfileEmailLabel');
    const avatarContainer = DOCUMENT.getElementById('userProfileAvatar');
    const avatarButton = DOCUMENT.getElementById('userProfileAvatarButton');
    const avatarButtonLabel = DOCUMENT.getElementById('userProfileAvatarButtonLabel');

    const fragment = DOCUMENT.createDocumentFragment();

    const intro = DOCUMENT.createElement('p');
    intro.className = 'onboarding-resume-hint';
    intro.textContent = 'Add your display name, role, phone, email and photo right here. Updates sync to Contacts instantly, stay cached offline and flow into exports so crews always know who owns the setup.';
    fragment.appendChild(intro);

    const avatarGroup = DOCUMENT.createElement('div');
    avatarGroup.className = 'onboarding-avatar-group';
    const avatarPreview = DOCUMENT.createElement('div');
    avatarPreview.className = 'onboarding-avatar-preview';
    avatarGroup.appendChild(avatarPreview);

    const renderAvatarInitial = (value) => {
      const span = DOCUMENT.createElement('span');
      span.className = 'contact-card-avatar-initial';
      span.textContent = value || '•';
      avatarPreview.appendChild(span);
    };

    const getNameInitial = () => {
      const raw = profileInput && typeof profileInput.value === 'string'
        ? profileInput.value.trim()
        : '';
      return raw ? raw.charAt(0).toUpperCase() : '•';
    };

    const updateAvatarPreview = () => {
      while (avatarPreview.firstChild) {
        avatarPreview.removeChild(avatarPreview.firstChild);
      }
      if (avatarContainer) {
        const visual = avatarContainer.querySelector('.contact-card-avatar-visual');
        if (visual) {
          const currentImage = visual.querySelector('img');
          if (currentImage && currentImage.src) {
            const img = DOCUMENT.createElement('img');
            img.src = currentImage.src;
            img.alt = '';
            avatarPreview.appendChild(img);
            return;
          }
          const text = visual.textContent ? visual.textContent.trim() : '';
          if (text) {
            renderAvatarInitial(text.charAt(0).toUpperCase());
            return;
          }
        }
      }
      renderAvatarInitial(getNameInitial());
    };

    updateAvatarPreview();

    let avatarObserver = null;
    if (GLOBAL_SCOPE.MutationObserver && avatarContainer) {
      try {
        avatarObserver = new GLOBAL_SCOPE.MutationObserver(() => updateAvatarPreview());
        avatarObserver.observe(avatarContainer, { childList: true, subtree: true, attributes: true });
        registerCleanup(() => {
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

    const avatarActionLabel = avatarButtonLabel && typeof avatarButtonLabel.textContent === 'string'
      ? avatarButtonLabel.textContent
      : 'Update profile photo';
    const avatarAction = DOCUMENT.createElement('button');
    avatarAction.type = 'button';
    avatarAction.className = 'onboarding-interaction-button onboarding-avatar-button';
    avatarAction.textContent = avatarActionLabel;
    const handleAvatarActionClick = () => {
      if (avatarButton && typeof avatarButton.click === 'function') {
        try {
          avatarButton.click();
        } catch (error) {
          safeWarn('cine.features.onboardingTour could not open avatar options.', error);
        }
      }
    };
    avatarAction.addEventListener('click', handleAvatarActionClick);
    registerCleanup(() => {
      avatarAction.removeEventListener('click', handleAvatarActionClick);
    });
    avatarGroup.appendChild(avatarAction);
    fragment.appendChild(avatarGroup);

    let firstProxyField = null;

    const languageSelectTopBar = DOCUMENT.getElementById('languageSelect');
    const languageSelectSettings = DOCUMENT.getElementById('settingsLanguage');
    const primaryLanguageTarget = languageSelectTopBar || languageSelectSettings || null;
    const languageTargets = [];
    const pushLanguageTarget = (target) => {
      if (!target) {
        return;
      }
      if (languageTargets.indexOf(target) === -1) {
        languageTargets.push(target);
      }
    };
    pushLanguageTarget(primaryLanguageTarget);
    pushLanguageTarget(languageSelectSettings);
    pushLanguageTarget(languageSelectTopBar);

    if (primaryLanguageTarget) {
      const group = DOCUMENT.createElement('div');
      group.className = 'onboarding-field-group';
      const proxyId = getProxyControlId('language');
      const label = DOCUMENT.createElement('label');
      label.className = 'onboarding-field-label';
      label.setAttribute('for', proxyId);
      label.textContent = 'Language';
      const proxySelect = DOCUMENT.createElement('select');
      proxySelect.id = proxyId;
      proxySelect.className = 'onboarding-field-select';

      const resolveOptionSource = () => {
        for (let index = 0; index < languageTargets.length; index += 1) {
          const candidate = languageTargets[index];
          if (candidate && candidate.options && candidate.options.length) {
            return candidate;
          }
        }
        return primaryLanguageTarget;
      };

      const updateProxyOptionsAndValue = () => {
        const source = resolveOptionSource();
        if (!source) {
          return;
        }
        const previousValue = proxySelect.value;
        proxySelect.textContent = '';
        const sourceOptions = Array.from(source.options || []);
        if (sourceOptions.length) {
          sourceOptions.forEach(option => {
            proxySelect.appendChild(option.cloneNode(true));
          });
        } else {
          const fallbackOption = DOCUMENT.createElement('option');
          const fallbackValue = source.value || 'en';
          fallbackOption.value = fallbackValue;
          fallbackOption.textContent = fallbackValue || 'English';
          proxySelect.appendChild(fallbackOption);
        }
        const activeValue = primaryLanguageTarget && typeof primaryLanguageTarget.value === 'string'
          ? primaryLanguageTarget.value
          : (source && typeof source.value === 'string' ? source.value : previousValue);
        const proxyOptions = Array.from(proxySelect.options || []);
        const findMatchingValue = (value) => proxyOptions.some(option => option.value === value);
        if (activeValue && findMatchingValue(activeValue)) {
          proxySelect.value = activeValue;
        } else if (previousValue && findMatchingValue(previousValue)) {
          proxySelect.value = previousValue;
        } else if (proxyOptions.length) {
          proxySelect.value = proxyOptions[0].value;
        }
      };

      updateProxyOptionsAndValue();

      const syncTargetsFromProxy = () => {
        const nextValue = proxySelect.value;
        if (!primaryLanguageTarget) {
          return;
        }
        if (typeof nextValue === 'string' && primaryLanguageTarget.value !== nextValue) {
          primaryLanguageTarget.value = nextValue;
        }
        dispatchSyntheticEvent(primaryLanguageTarget, 'change');
      };

      proxySelect.addEventListener('change', syncTargetsFromProxy);
      registerCleanup(() => {
        proxySelect.removeEventListener('change', syncTargetsFromProxy);
      });

      const refreshProxyFromTargets = () => {
        updateProxyOptionsAndValue();
      };

      for (let index = 0; index < languageTargets.length; index += 1) {
        const target = languageTargets[index];
        if (!target) {
          continue;
        }
        target.addEventListener('change', refreshProxyFromTargets);
        registerCleanup(() => {
          target.removeEventListener('change', refreshProxyFromTargets);
        });
      }

      if (typeof GLOBAL_SCOPE.addEventListener === 'function') {
        GLOBAL_SCOPE.addEventListener('languagechange', refreshProxyFromTargets);
        registerCleanup(() => {
          GLOBAL_SCOPE.removeEventListener('languagechange', refreshProxyFromTargets);
        });
      }

      group.appendChild(label);
      group.appendChild(proxySelect);
      fragment.appendChild(group);
      if (!firstProxyField) {
        firstProxyField = proxySelect;
      }
    }

    const createProxyField = (options) => {
      const {
        fieldKey,
        labelText,
        placeholder,
        target,
        type,
        autocomplete,
        onAfterSync,
      } = options || {};
      const group = DOCUMENT.createElement('div');
      group.className = 'onboarding-field-group';
      const proxyId = getProxyControlId(fieldKey);
      const label = DOCUMENT.createElement('label');
      label.className = 'onboarding-field-label';
      label.setAttribute('for', proxyId);
      label.textContent = labelText;
      group.appendChild(label);

      const isSelectField = type === 'select';
      const proxyControl = isSelectField
        ? DOCUMENT.createElement('select')
        : DOCUMENT.createElement('input');
      proxyControl.id = proxyId;
      proxyControl.className = 'onboarding-field-input';
      if (isSelectField) {
        proxyControl.classList.add('onboarding-field-select');
      } else {
        proxyControl.type = type || 'text';
        if (typeof placeholder === 'string' && placeholder) {
          proxyControl.placeholder = placeholder;
        }
        if (typeof autocomplete === 'string' && autocomplete) {
          proxyControl.autocomplete = autocomplete;
        }
      }

      const copySelectOptions = () => {
        if (!isSelectField) {
          return;
        }
        const targetOptions = target && target.options ? Array.from(target.options) : [];
        proxyControl.textContent = '';
        if (targetOptions.length) {
          targetOptions.forEach(option => {
            proxyControl.appendChild(option.cloneNode(true));
          });
        } else if (typeof placeholder === 'string' && placeholder) {
          const placeholderOption = DOCUMENT.createElement('option');
          placeholderOption.value = '';
          placeholderOption.textContent = placeholder;
          proxyControl.appendChild(placeholderOption);
        }
        proxyControl.value = target && typeof target.value === 'string' ? target.value : '';
      };

      if (isSelectField) {
        copySelectOptions();
      } else {
        proxyControl.value = target && typeof target.value === 'string' ? target.value : '';
      }

      const syncFromTarget = () => {
        if (!target) {
          return;
        }
        if (isSelectField) {
          copySelectOptions();
        } else if (proxyControl.value !== target.value) {
          proxyControl.value = target.value || '';
        }
        if (typeof onAfterSync === 'function') {
          onAfterSync('from');
        }
      };

      const syncToTarget = () => {
        if (!target) {
          return;
        }
        if (isSelectField) {
          const nextValue = proxyControl.value;
          if (target.value !== nextValue) {
            target.value = nextValue;
          }
        } else if (target.value !== proxyControl.value) {
          target.value = proxyControl.value;
        }
        dispatchSyntheticEvent(target, 'input');
        dispatchSyntheticEvent(target, 'change');
        if (typeof onAfterSync === 'function') {
          onAfterSync('to');
        }
      };

      proxyControl.addEventListener('input', syncToTarget);
      proxyControl.addEventListener('change', syncToTarget);
      registerCleanup(() => {
        proxyControl.removeEventListener('input', syncToTarget);
        proxyControl.removeEventListener('change', syncToTarget);
      });

      if (target) {
        target.addEventListener('input', syncFromTarget);
        target.addEventListener('change', syncFromTarget);
        registerCleanup(() => {
          target.removeEventListener('input', syncFromTarget);
          target.removeEventListener('change', syncFromTarget);
        });
        if (isSelectField && typeof MutationObserver === 'function') {
          const observer = new MutationObserver(syncFromTarget);
          observer.observe(target, { childList: true });
          registerCleanup(() => observer.disconnect());
        }
      } else {
        proxyControl.disabled = true;
        proxyControl.setAttribute('aria-disabled', 'true');
      }

      group.appendChild(proxyControl);
      fragment.appendChild(group);
      if (!firstProxyField) {
        firstProxyField = proxyControl;
      }
      return proxyControl;
    };

    const resolvedNameLabel = profileLabel && typeof profileLabel.textContent === 'string'
      ? profileLabel.textContent
      : 'Display name';
    let resolvedNamePlaceholder = 'e.g. Alex Rivera';
    if (profileInput && typeof profileInput.getAttribute === 'function') {
      const placeholderValue = profileInput.getAttribute('placeholder');
      if (typeof placeholderValue === 'string' && placeholderValue) {
        resolvedNamePlaceholder = placeholderValue;
      }
    }

    const nameProxy = createProxyField({
      fieldKey: 'user-profile-name',
      labelText: resolvedNameLabel,
      placeholder: resolvedNamePlaceholder,
      target: profileInput,
      type: 'text',
      autocomplete: 'name',
      onAfterSync: () => updateAvatarPreview(),
    });

    const resolvedRoleLabel = roleLabel && typeof roleLabel.textContent === 'string'
      ? roleLabel.textContent
      : 'Role or title';
    let resolvedRolePlaceholder = 'Select role';
    if (roleInput && roleInput.options && roleInput.options.length) {
      const placeholderOption = roleInput.options[0];
      if (placeholderOption && placeholderOption.textContent) {
        resolvedRolePlaceholder = placeholderOption.textContent;
      }
    }

    createProxyField({
      fieldKey: 'user-profile-role',
      labelText: resolvedRoleLabel,
      placeholder: resolvedRolePlaceholder,
      target: roleInput,
      type: 'select',
    });

    const resolvedPhoneLabel = phoneLabel && typeof phoneLabel.textContent === 'string'
      ? phoneLabel.textContent
      : 'Phone number';
    let resolvedPhonePlaceholder = '';
    if (phoneInput && typeof phoneInput.getAttribute === 'function') {
      const phonePlaceholder = phoneInput.getAttribute('placeholder');
      if (typeof phonePlaceholder === 'string' && phonePlaceholder) {
        resolvedPhonePlaceholder = phonePlaceholder;
      }
    }

    createProxyField({
      fieldKey: 'user-profile-phone',
      labelText: resolvedPhoneLabel,
      placeholder: resolvedPhonePlaceholder,
      target: phoneInput,
      type: 'tel',
      autocomplete: 'tel',
    });

    const resolvedEmailLabel = emailLabel && typeof emailLabel.textContent === 'string'
      ? emailLabel.textContent
      : 'Email address';
    let resolvedEmailPlaceholder = '';
    if (emailInput && typeof emailInput.getAttribute === 'function') {
      const emailPlaceholder = emailInput.getAttribute('placeholder');
      if (typeof emailPlaceholder === 'string' && emailPlaceholder) {
        resolvedEmailPlaceholder = emailPlaceholder;
      }
    }

    createProxyField({
      fieldKey: 'user-profile-email',
      labelText: resolvedEmailLabel,
      placeholder: resolvedEmailPlaceholder,
      target: emailInput,
      type: 'email',
      autocomplete: 'email',
    });

    const skipHint = DOCUMENT.createElement('p');
    skipHint.className = 'onboarding-resume-hint';
    skipHint.textContent = 'Press Next when you are ready—Contacts in the sidebar always shows these saved details without resetting tutorial progress.';
    fragment.appendChild(skipHint);

    while (interactionContainerEl.firstChild) {
      interactionContainerEl.removeChild(interactionContainerEl.firstChild);
    }
    interactionContainerEl.appendChild(fragment);
    interactionContainerEl.hidden = false;

    const focusTarget = firstProxyField || nameProxy;
    if (focusTarget && typeof focusTarget.focus === 'function') {
      const focusRunner = () => {
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

  function renderUnitsPreferencesInteraction(registerCleanup, step) {
    if (!interactionContainerEl) {
      return false;
    }

    const fragment = DOCUMENT.createDocumentFragment();

    const darkModeToggle = DOCUMENT.getElementById('settingsDarkMode');
    const themeGroup = DOCUMENT.createElement('div');
    themeGroup.className = 'onboarding-field-group';
    const themeId = getProxyControlId('theme');
    const themeLabel = DOCUMENT.createElement('label');
    themeLabel.className = 'onboarding-field-label';
    themeLabel.setAttribute('for', themeId);
    themeLabel.textContent = 'Theme';
    const themeSelect = DOCUMENT.createElement('select');
    themeSelect.id = themeId;
    themeSelect.className = 'onboarding-field-select';
    const themeLight = DOCUMENT.createElement('option');
    themeLight.value = 'light';
    themeLight.textContent = 'Light';
    const themeDark = DOCUMENT.createElement('option');
    themeDark.value = 'dark';
    themeDark.textContent = 'Dark';
    themeSelect.appendChild(themeLight);
    themeSelect.appendChild(themeDark);
    themeSelect.value = darkModeToggle && darkModeToggle.checked ? 'dark' : 'light';

    const syncThemeFromTarget = () => {
      const expected = darkModeToggle && darkModeToggle.checked ? 'dark' : 'light';
      if (themeSelect.value !== expected) {
        themeSelect.value = expected;
      }
    };

    const syncThemeToTarget = () => {
      if (!darkModeToggle) {
        return;
      }
      const shouldEnable = themeSelect.value === 'dark';
      if (darkModeToggle.checked !== shouldEnable) {
        darkModeToggle.checked = shouldEnable;
        dispatchSyntheticEvent(darkModeToggle, 'change');
      }
    };

    themeSelect.addEventListener('change', syncThemeToTarget);
    registerCleanup(() => {
      themeSelect.removeEventListener('change', syncThemeToTarget);
    });
    if (darkModeToggle) {
      darkModeToggle.addEventListener('change', syncThemeFromTarget);
      registerCleanup(() => {
        darkModeToggle.removeEventListener('change', syncThemeFromTarget);
      });
    }

    themeGroup.appendChild(themeLabel);
    themeGroup.appendChild(themeSelect);
    fragment.appendChild(themeGroup);

    const pinkToggle = DOCUMENT.getElementById('settingsPinkMode');
    if (pinkToggle) {
      const pinkGroup = DOCUMENT.createElement('div');
      pinkGroup.className = 'onboarding-field-group';
      const pinkId = getProxyControlId('pink');
      const pinkLabel = DOCUMENT.createElement('label');
      pinkLabel.className = 'onboarding-field-label';
      pinkLabel.setAttribute('for', pinkId);
      pinkLabel.textContent = 'Pink mode accents';
      const pinkSelect = DOCUMENT.createElement('select');
      pinkSelect.id = pinkId;
      pinkSelect.className = 'onboarding-field-select';
      const pinkOff = DOCUMENT.createElement('option');
      pinkOff.value = 'off';
      pinkOff.textContent = 'Disabled';
      const pinkOn = DOCUMENT.createElement('option');
      pinkOn.value = 'on';
      pinkOn.textContent = 'Enabled';
      pinkSelect.appendChild(pinkOff);
      pinkSelect.appendChild(pinkOn);
      pinkSelect.value = pinkToggle.checked ? 'on' : 'off';

      const syncPinkToTarget = () => {
        const shouldEnable = pinkSelect.value === 'on';
        if (pinkToggle.checked !== shouldEnable) {
          pinkToggle.checked = shouldEnable;
          dispatchSyntheticEvent(pinkToggle, 'change');
        }
      };

      const syncPinkFromTarget = () => {
        const expected = pinkToggle.checked ? 'on' : 'off';
        if (pinkSelect.value !== expected) {
          pinkSelect.value = expected;
        }
      };

      pinkSelect.addEventListener('change', syncPinkToTarget);
      registerCleanup(() => {
        pinkSelect.removeEventListener('change', syncPinkToTarget);
      });
      pinkToggle.addEventListener('change', syncPinkFromTarget);
      registerCleanup(() => {
        pinkToggle.removeEventListener('change', syncPinkFromTarget);
      });

      pinkGroup.appendChild(pinkLabel);
      pinkGroup.appendChild(pinkSelect);
      fragment.appendChild(pinkGroup);
    }

    const tempUnitSelect = DOCUMENT.getElementById('settingsTemperatureUnit');
    if (tempUnitSelect) {
      const unitsGroup = DOCUMENT.createElement('div');
      unitsGroup.className = 'onboarding-field-group';
      const unitsId = getProxyControlId('units');
      const unitsLabel = DOCUMENT.createElement('label');
      unitsLabel.className = 'onboarding-field-label';
      unitsLabel.setAttribute('for', unitsId);
      unitsLabel.textContent = 'Temperature units';
      const proxyUnits = DOCUMENT.createElement('select');
      proxyUnits.id = unitsId;
      proxyUnits.className = 'onboarding-field-select';
      const unitOptions = Array.from(tempUnitSelect.options || []);
      if (unitOptions.length === 0) {
        const option = DOCUMENT.createElement('option');
        option.value = tempUnitSelect.value || 'celsius';
        option.textContent = tempUnitSelect.value || 'Celsius';
        proxyUnits.appendChild(option);
      } else {
        for (let index = 0; index < unitOptions.length; index += 1) {
          const source = unitOptions[index];
          const option = DOCUMENT.createElement('option');
          option.value = source.value;
          option.textContent = source.textContent || source.value;
          proxyUnits.appendChild(option);
        }
      }
      proxyUnits.value = tempUnitSelect.value || proxyUnits.value;

      const syncUnitsFromTarget = () => {
        if (proxyUnits.value !== tempUnitSelect.value) {
          proxyUnits.value = tempUnitSelect.value;
        }
      };

      const syncUnitsToTarget = () => {
        if (tempUnitSelect.value !== proxyUnits.value) {
          tempUnitSelect.value = proxyUnits.value;
          dispatchSyntheticEvent(tempUnitSelect, 'change');
        }
      };

      proxyUnits.addEventListener('change', syncUnitsToTarget);
      registerCleanup(() => {
        proxyUnits.removeEventListener('change', syncUnitsToTarget);
      });
      tempUnitSelect.addEventListener('change', syncUnitsFromTarget);
      registerCleanup(() => {
        tempUnitSelect.removeEventListener('change', syncUnitsFromTarget);
      });

      unitsGroup.appendChild(unitsLabel);
      unitsGroup.appendChild(proxyUnits);
      fragment.appendChild(unitsGroup);
    }

    const persistenceButton = DOCUMENT.getElementById('storagePersistenceRequest');
    const persistenceHint = DOCUMENT.createElement('p');
    persistenceHint.className = 'onboarding-resume-hint';
    persistenceHint.textContent = 'Request persistent storage so the browser keeps planner data even when space runs low.';
    fragment.appendChild(persistenceHint);

    const statusGroup = DOCUMENT.createElement('div');
    statusGroup.className = 'onboarding-storage-status';
    statusGroup.setAttribute('role', 'status');
    statusGroup.setAttribute('aria-live', 'polite');
    statusGroup.setAttribute('data-state', 'checking');
    const statusIcon = DOCUMENT.createElement('span');
    statusIcon.className = 'onboarding-storage-icon';
    statusIcon.setAttribute('aria-hidden', 'true');
    const statusText = DOCUMENT.createElement('span');
    statusText.className = 'onboarding-storage-text';
    statusGroup.appendChild(statusIcon);
    statusGroup.appendChild(statusText);
    fragment.appendChild(statusGroup);

    const statusSource = DOCUMENT.getElementById('storagePersistenceStatus');
    const getPersistenceStatusText = key => {
      if (!key || !GLOBAL_SCOPE || typeof GLOBAL_SCOPE.texts !== 'object') {
        return '';
      }
      const lang = resolveLanguage();
      const texts = GLOBAL_SCOPE.texts || {};
      const langPack = texts[lang] && typeof texts[lang] === 'object' ? texts[lang] : null;
      const fallbackPack = texts.en && typeof texts.en === 'object' ? texts.en : null;
      const primary = langPack && typeof langPack[key] === 'string' ? langPack[key] : null;
      if (primary && primary.trim()) {
        return primary;
      }
      const fallback = fallbackPack && typeof fallbackPack[key] === 'string' ? fallbackPack[key] : null;
      return fallback && fallback.trim() ? fallback : '';
    };

    const defaultStatusText = getPersistenceStatusText('storagePersistenceStatusIdle')
      || persistenceHint.textContent
      || '';

    const applyStatus = (state, message) => {
      const normalizedState = typeof state === 'string' && state ? state : 'checking';
      statusGroup.setAttribute('data-state', normalizedState);
      statusGroup.dataset.state = normalizedState;
      const resolved = typeof message === 'string' && message.trim()
        ? message.trim()
        : (normalizedState === 'checking'
          ? (getPersistenceStatusText('storagePersistenceStatusChecking') || defaultStatusText)
          : defaultStatusText);
      statusText.textContent = resolved;
      if (resolved) {
        statusGroup.removeAttribute('data-empty');
      } else {
        statusGroup.setAttribute('data-empty', 'true');
      }
    };

    const updateStatus = detail => {
      let nextState = detail && typeof detail.state === 'string' ? detail.state : null;
      let nextMessage = detail && typeof detail.message === 'string' ? detail.message : null;
      if (statusSource) {
        if (!nextState && typeof statusSource.getAttribute === 'function') {
          nextState = statusSource.getAttribute('data-state');
        }
        if (!nextMessage && typeof statusSource.textContent === 'string') {
          nextMessage = statusSource.textContent.trim();
        }
      }
      if (!statusSource && !nextMessage) {
        nextMessage = getPersistenceStatusText('storagePersistenceStatusChecking') || defaultStatusText;
      }
      if (!statusSource && !nextState) {
        nextState = 'checking';
      }
      applyStatus(nextState, nextMessage);
    };

    updateStatus();

    if (statusSource && typeof statusSource.addEventListener === 'function') {
      const handleStatusChange = event => {
        updateStatus(event && event.detail ? event.detail : null);
      };
      statusSource.addEventListener('storagepersistencechange', handleStatusChange);
      registerCleanup(() => {
        statusSource.removeEventListener('storagepersistencechange', handleStatusChange);
      });
      const Observer = GLOBAL_SCOPE && (GLOBAL_SCOPE.MutationObserver || GLOBAL_SCOPE.WebKitMutationObserver || GLOBAL_SCOPE.MozMutationObserver);
      if (Observer) {
        let observer = null;
        try {
          observer = new Observer(() => {
            updateStatus();
          });
          observer.observe(statusSource, {
            characterData: true,
            childList: true,
            subtree: true,
            attributes: true,
          });
          const disconnectObserver = () => {
            if (observer && typeof observer.disconnect === 'function') {
              observer.disconnect();
            }
          };
          registerCleanup(disconnectObserver);
        } catch (observerError) {
          safeWarn('cine.features.onboardingTour could not observe persistent storage status.', observerError);
          if (observer && typeof observer.disconnect === 'function') {
            observer.disconnect();
          }
        }
      }
    }

    const actions = DOCUMENT.createElement('div');
    actions.className = 'onboarding-interaction-actions';
    const requestButton = DOCUMENT.createElement('button');
    requestButton.type = 'button';
    requestButton.className = 'onboarding-interaction-button';
    requestButton.textContent = 'Request storage protection';
    requestButton.disabled = !persistenceButton;

    const handleRequest = () => {
      if (!persistenceButton) {
        return;
      }
      const originalTab = step && step.ensureSettings && step.ensureSettings.tabId
        ? step.ensureSettings.tabId
        : 'settingsTab-general';
      if (typeof activateSettingsTab === 'function') {
        try {
          activateSettingsTab('settingsTab-data');
        } catch (error) {
          safeWarn('cine.features.onboardingTour could not activate Data & Storage tab.', error);
        }
      }
      try {
        persistenceButton.click();
      } catch (error) {
        safeWarn('cine.features.onboardingTour could not request persistent storage.', error);
      }
      if (typeof activateSettingsTab === 'function') {
        setTimeout(() => {
          try {
            activateSettingsTab(originalTab);
          } catch (error) {
            safeWarn('cine.features.onboardingTour could not restore settings tab.', error);
          }
        }, 300);
      }
    };

    requestButton.addEventListener('click', handleRequest);
    registerCleanup(() => {
      requestButton.removeEventListener('click', handleRequest);
    });

    actions.appendChild(requestButton);
    fragment.appendChild(actions);

    while (interactionContainerEl.firstChild) {
      interactionContainerEl.removeChild(interactionContainerEl.firstChild);
    }
    interactionContainerEl.appendChild(fragment);
    interactionContainerEl.hidden = false;
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

    const cleanupCallbacks = [];
    const registerCleanup = callback => {
      if (typeof callback === 'function') {
        cleanupCallbacks.push(callback);
      }
    };

    const customRendered = (() => {
      if (key === 'userProfile') {
        return renderUserProfileInteraction(registerCleanup);
      }
      if (key === 'unitsPreferences') {
        return renderUnitsPreferencesInteraction(registerCleanup, step);
      }
      return false;
    })();

    if (customRendered) {
      focusHighlightedElement(step);
      schedulePositionUpdate();
      activeInteractionCleanup = () => {
        for (let index = 0; index < cleanupCallbacks.length; index += 1) {
          try {
            cleanupCallbacks[index]();
          } catch (error) {
            safeWarn('cine.features.onboardingTour could not detach custom interaction.', error);
          }
        }
        cleanupCallbacks.length = 0;
      };
      return;
    }

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

    if (cardContentEl) {
      cardContentEl.scrollTop = 0;
    }

    const textPack = getStepTexts(step);
    const stepText = textPack.body;

    const size = step && typeof step.size === 'string' && step.size
      ? step.size
      : 'standard';
    cardEl.setAttribute('data-size', size);

    cardEl.setAttribute('aria-labelledby', titleEl.id);
    cardEl.setAttribute('aria-describedby', bodyEl.id);

    titleEl.textContent = textPack.title || '';
    bodyEl.textContent = stepText;

    const preface = isPrefaceStep(step);

    if (step.key === 'completion') {
      progressEl.textContent = tourTexts.completionIndicator || '';
    } else if (preface) {
      const prefaceIndicator = typeof tourTexts.prefaceIndicator === 'string'
        ? tourTexts.prefaceIndicator
        : 'Orientation';
      progressEl.textContent = prefaceIndicator;
    } else {
      progressEl.textContent = formatStepIndicator(step, index);
    }

    updateProgressMeter(step);

    skipButton.textContent = tourTexts.skipLabel || 'Skip tutorial';
    backButton.textContent = tourTexts.backLabel || 'Back';

    if (step.key === 'completion') {
      nextButton.textContent = tourTexts.doneLabel || 'Finish';
    } else {
      nextButton.textContent = tourTexts.nextLabel || 'Next';
    }

    backButton.disabled = index <= 0;
    backButton.hidden = index <= 0;

    if (preface) {
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

  function updateProgressMeter(step) {
    if (!progressMeterEl || !progressMeterFillEl) {
      return;
    }
    const countedSteps = getCountedSteps();
    const totalSteps = countedSteps.length;
    const completedSteps = storedState && Array.isArray(storedState.completedSteps)
      ? storedState.completedSteps
      : [];
    const completedSet = new Set(completedSteps);
    const countedCompleted = getCountedCompletedLength(completedSet, countedSteps);
    const countedIndex = getCountedStepIndex(step, countedSteps);
    const preface = isPrefaceStep(step);
    const activeContribution = step && !completedSet.has(step.key) && !preface ? 1 : 0;
    let progressValue = countedCompleted;
    if (countedIndex >= 0) {
      progressValue = Math.max(progressValue, countedIndex + 1);
    }
    progressValue = Math.max(progressValue, countedCompleted + activeContribution);
    if (totalSteps > 0) {
      progressValue = Math.min(totalSteps, progressValue);
    } else {
      progressValue = 0;
    }
    const ratio = totalSteps > 0 ? Math.max(0, Math.min(1, progressValue / totalSteps)) : 0;
    progressMeterFillEl.style.width = `${ratio * 100}%`;

    const labelTemplate = tourTexts.progressValueLabel || 'Completed {completed} of {total} steps';
    const label = labelTemplate
      .replace('{completed}', String(Math.min(countedCompleted, totalSteps)))
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
    if (previousStep && previousStep.ensureContacts && !step.ensureContacts) {
      closeContactsIfNeeded();
    }
    if (previousStep && previousStep.ensureOwnGear && !step.ensureOwnGear) {
      closeOwnGearIfNeeded();
    }

    currentStep = step;
    currentIndex = index;
    autoOpenedSettings = false;

    if (step.ensureSettings) {
      ensureSettingsForStep(step);
    } else if (previousStep && previousStep.ensureSettings) {
      closeSettingsIfNeeded();
    }
    if (step.ensureContacts) {
      ensureContactsForStep(step);
    } else if (previousStep && previousStep.ensureContacts) {
      closeContactsIfNeeded();
    } else {
      autoOpenedContacts = false;
    }
    if (step.ensureOwnGear) {
      ensureOwnGearForStep(step);
    } else if (previousStep && previousStep.ensureOwnGear) {
      closeOwnGearIfNeeded();
    } else {
      autoOpenedOwnGear = false;
    }

    const focusCandidates = resolveSelectorElements(toSelectorArray(step.focus));
    const focusTarget = focusCandidates.length > 0 ? focusCandidates[0] : null;
    if (focusTarget && typeof focusTarget.scrollIntoView === 'function') {
      try {
        focusTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } catch (error) {
        safeWarn('cine.features.onboardingTour could not scroll focus target into view.', error);
      }
    } else {
      const highlightCandidates = getHighlightElements(step);
      const highlightTarget = highlightCandidates.length > 0 ? highlightCandidates[0] : null;
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
    updateProgressMeter(currentStep);
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
    closeContactsIfNeeded();
    closeOwnGearIfNeeded();
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
    closeContactsIfNeeded();
    closeOwnGearIfNeeded();
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
    if (DOCUMENT && typeof DOCUMENT.addEventListener === 'function') {
      DOCUMENT.addEventListener('scroll', schedulePositionUpdate, true);
    }
  }

  function detachGlobalListeners() {
    if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.removeEventListener === 'function') {
      GLOBAL_SCOPE.removeEventListener('resize', schedulePositionUpdate);
      GLOBAL_SCOPE.removeEventListener('scroll', schedulePositionUpdate, true);
    }
    if (DOCUMENT && typeof DOCUMENT.removeEventListener === 'function') {
      DOCUMENT.removeEventListener('scroll', schedulePositionUpdate, true);
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
    closeSettingsIfNeeded();
    closeContactsIfNeeded();
    closeOwnGearIfNeeded();
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

    const countedSteps = getCountedSteps(stepList);
    const total = countedSteps.length;
    const completedCount = Math.min(getCountedCompletedLength(completedSet, countedSteps), total);

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
    const countedSteps = getCountedSteps(steps);
    const total = countedSteps.length;
    const completedCount = state && Array.isArray(state.completedSteps)
      ? getCountedCompletedLength(state.completedSteps, countedSteps)
      : 0;
    const labelTemplate = tourTexts.resumeLabelWithProgress || tourTexts.resumeLabel;
    let label;
    if (state && state.completed) {
      label = tourTexts.restartLabel || tourTexts.startLabel || 'Start guided tutorial';
    } else if (state && state.activeStep) {
      if (labelTemplate) {
        label = labelTemplate
          .replace('{completed}', String(Math.min(completedCount, total)))
          .replace('{total}', String(total));
      }
      if (!label) {
        label = tourTexts.resumeLabel || tourTexts.startLabel || 'Resume guided tutorial';
      }
    } else if (completedCount > 0) {
      if (labelTemplate) {
        label = labelTemplate
          .replace('{completed}', String(Math.min(completedCount, total)))
          .replace('{total}', String(total));
      }
    } else {
      label = tourTexts.startLabel || 'Start guided tutorial';
    }
    const fallbackLabelSource =
      typeof tourTexts.startLabel === 'string' && tourTexts.startLabel.trim()
        ? tourTexts.startLabel.trim()
        : 'Start guided tutorial';
    const normalizedLabel =
      typeof label === 'string' && label.trim() ? label.trim() : fallbackLabelSource;

    for (let index = 0; index < buttons.length; index += 1) {
      const button = buttons[index];
      if (!button) {
        continue;
      }
      button.textContent = normalizedLabel;
      if (typeof button.setAttribute === 'function') {
        try {
          button.setAttribute('aria-label', normalizedLabel);
        } catch (error) {
          void error;
        }
      }
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
