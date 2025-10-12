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
  const MAIN_ANCHOR_ID = 'mainContent';
  const HEADER_ANCHOR_ID = 'topBar';

  const supportsDialogTopLayer = (function detectDialogSupport() {
    if (!DOCUMENT || typeof DOCUMENT.createElement !== 'function') {
      return false;
    }
    try {
      const dialog = DOCUMENT.createElement('dialog');
      return typeof dialog.show === 'function' && typeof dialog.close === 'function';
    } catch (error) {
      void error;
      return false;
    }
  }());

  const DOM_POSITION_FOLLOWING = typeof Node !== 'undefined' && Node
    ? Node.DOCUMENT_POSITION_FOLLOWING
    : 4;
  const DOM_POSITION_PRECEDING = typeof Node !== 'undefined' && Node
    ? Node.DOCUMENT_POSITION_PRECEDING
    : 2;

  const FOCUSABLE_SELECTOR = [
    'button:not([disabled])',
    'a[href]',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[role="button"]:not([aria-disabled="true"])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',');

  function isElementFocusable(element) {
    if (!element || typeof element.matches !== 'function') {
      return false;
    }
    if (element.hasAttribute('disabled')) {
      return false;
    }
    if (element.getAttribute && element.getAttribute('aria-disabled') === 'true') {
      return false;
    }
    if (element.hidden || (typeof element.getAttribute === 'function' && element.getAttribute('hidden') !== null)) {
      return false;
    }
    if (typeof element.closest === 'function') {
      if (element.closest('[aria-hidden="true"]')) {
        return false;
      }
      if (element.closest('[hidden]')) {
        return false;
      }
    }
    return element.matches(FOCUSABLE_SELECTOR);
  }

  function collectFocusableElements(root, includeRoot = false) {
    if (!root) {
      return [];
    }
    const focusable = [];
    if (includeRoot && isElementFocusable(root)) {
      focusable.push(root);
    }
    if (typeof root.querySelectorAll !== 'function') {
      return focusable;
    }
    const nodes = root.querySelectorAll(FOCUSABLE_SELECTOR);
    for (let index = 0; index < nodes.length; index += 1) {
      const node = nodes[index];
      if (isElementFocusable(node)) {
        focusable.push(node);
      }
    }
    return focusable;
  }

  function sortFocusableByDocumentOrder(elements) {
    if (!Array.isArray(elements)) {
      return [];
    }
    return elements.slice().sort((a, b) => {
      if (!a || !b || a === b || typeof a.compareDocumentPosition !== 'function') {
        return 0;
      }
      const position = a.compareDocumentPosition(b);
      if (position & DOM_POSITION_FOLLOWING) {
        return -1;
      }
      if (position & DOM_POSITION_PRECEDING) {
        return 1;
      }
      return 0;
    });
  }

  function isDialogElement(element) {
    return Boolean(
      element
        && typeof element.nodeName === 'string'
        && element.nodeName.toLowerCase() === 'dialog',
    );
  }

  function bringOverlayToTopLayer() {
    if (!overlayRoot) {
      return;
    }

    if (overlayAnchor && DOCUMENT && overlayAnchor !== DOCUMENT.body) {
      return;
    }

    if (supportsDialogTopLayer && isDialogElement(overlayRoot) && typeof overlayRoot.show === 'function') {
      try {
        if (overlayRoot.open && typeof overlayRoot.close === 'function') {
          overlayRoot.close();
        }
      } catch (closeError) {
        void closeError;
      }
      try {
        overlayRoot.show();
      } catch (showError) {
        safeWarn('cine.features.onboardingTour could not refresh overlay top layer.', showError);
      }
      return;
    }

    if (overlayRoot.parentNode && typeof overlayRoot.parentNode.appendChild === 'function') {
      try {
        overlayRoot.parentNode.appendChild(overlayRoot);
      } catch (error) {
        safeWarn('cine.features.onboardingTour could not move overlay to front.', error);
      }
    }
  }

  function handleDialogToggle(event) {
    if (!active || !event || !event.target) {
      return;
    }
    const target = event.target;
    if (target === overlayRoot) {
      return;
    }
    if (isDialogElement(target) && target.open) {
      bringOverlayToTopLayer();
    }
  }

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

  const deviceLibraryState = {
    lastAdded: null,
    lastReviewed: null,
    lastUpdated: null,
  };

  const deviceLibrarySubscribers = [];

  function sanitizeDeviceDescriptor(detail) {
    if (!detail || typeof detail !== 'object') {
      return null;
    }
    const name = typeof detail.name === 'string' ? detail.name.trim() : '';
    const category = typeof detail.category === 'string' ? detail.category.trim() : '';
    let subcategory = null;
    if (typeof detail.subcategory === 'string') {
      const trimmed = detail.subcategory.trim();
      if (trimmed) {
        subcategory = trimmed;
      }
    }
    if (!name || !category) {
      return null;
    }
    return { name, category, subcategory };
  }

  function descriptorsMatch(a, b) {
    if (!a || !b) {
      return false;
    }
    const normalize = value => (typeof value === 'string' ? value.trim().toLowerCase() : '');
    return (
      normalize(a.name) === normalize(b.name)
      && normalize(a.category) === normalize(b.category)
      && normalize(a.subcategory || '') === normalize(b.subcategory || '')
    );
  }

  function notifyDeviceLibrarySubscribers() {
    if (!deviceLibrarySubscribers.length) {
      return;
    }
    const snapshot = deviceLibrarySubscribers.slice();
    for (let index = 0; index < snapshot.length; index += 1) {
      const callback = snapshot[index];
      if (typeof callback !== 'function') {
        continue;
      }
      try {
        callback(deviceLibraryState);
      } catch (error) {
        safeWarn('cine.features.onboardingTour could not deliver device library update.', error);
      }
    }
  }

  function subscribeDeviceLibrary(callback) {
    if (typeof callback !== 'function') {
      return () => {};
    }
    deviceLibrarySubscribers.push(callback);
    return () => {
      const position = deviceLibrarySubscribers.indexOf(callback);
      if (position !== -1) {
        deviceLibrarySubscribers.splice(position, 1);
      }
    };
  }

  if (DOCUMENT && typeof DOCUMENT.addEventListener === 'function') {
    DOCUMENT.addEventListener('device-library:add', event => {
      const descriptor = sanitizeDeviceDescriptor(event && event.detail);
      deviceLibraryState.lastAdded = descriptor;
      deviceLibraryState.lastReviewed = null;
      deviceLibraryState.lastUpdated = null;
      notifyDeviceLibrarySubscribers();
    });
    DOCUMENT.addEventListener('device-library:show-details', event => {
      const descriptor = sanitizeDeviceDescriptor(event && event.detail);
      deviceLibraryState.lastReviewed = descriptor;
      notifyDeviceLibrarySubscribers();
    });
    DOCUMENT.addEventListener('device-library:update', event => {
      const descriptor = sanitizeDeviceDescriptor(event && event.detail);
      const original = sanitizeDeviceDescriptor(event && event.detail && event.detail.original);
      if (!descriptor && !original) {
        deviceLibraryState.lastUpdated = null;
      } else {
        deviceLibraryState.lastUpdated = { current: descriptor, original };
      }
      notifyDeviceLibrarySubscribers();
    });
  }

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
    'resultsTotalDraw',
    'resultsBatteryPacks',
    'resultsChangeover',
    'resultsWarnings',
    'batteryComparison',
    'runtimeFeedback',
    'connectionDiagram',
    'editDeviceDataAdd',
    'editDeviceDataReview',
    'editDeviceDataEdit',
    'ownGearAccess',
    'ownGearAddDevice',
    'generateGearAndRequirements',
    'autoGearRulesAccess',
    'autoGearRulesEdit',
    'autoGearRulesCreate',
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
        'Begin with the offline-first power planner built for crews. This guided tour walks through the safeguards that keep every project ready to restore before the first shoot.',
      hero: {
        badgeIcon: '\uE9C3',
        badgeLabel: 'Offline · Subscription-free',
        badgeDescription:
          'No servers, no accounts. Saves, autosaves, backups, restores, shares and imports all stay on this device.',
        highlights: [
          {
            icon: '\uE1A6',
            title: 'Plan safe power loads',
            body:
              'Model draw, runtime and changeovers to lock in battery safety margins with confidence.',
          },
          {
            icon: '\uE467',
            title: 'AutoGear builds reusable kits',
            body:
              'Assemble full gear lists, adjust automation rules on the fly and reuse presets across projects.',
          },
          {
            icon: '\uE469',
            title: 'Share requirements with context',
            body:
              'Capture deliverables, crew coverage and rental notes, then export PDFs crews and houses can trust.',
          },
        ],
        languageLabel: 'Language',
        languageHint:
          'Choose the interface language. The tutorial, help and exports update instantly across offline saves.',
        offlineSummary:
          'Cine Power Planner runs entirely offline with an installable mobile PWA—bringing the same safeguarded saves, backups, shares and restore rehearsals on set without subscriptions.',
      },
    },
    userProfile: {
      title: 'Complete your crew profile',
      body:
        'Set your display name, role, phone, email and photo. Every update syncs to Contacts immediately, stays in offline saves and appears on exports.',
    },
    unitsPreferences: {
      title: 'Tune theme and units',
      body:
        'Open Settings → General to choose the theme, optional pink highlights, focus scale and temperature units. Request persistent storage so the browser keeps preferences and safeguards saves during cleanups.',
    },
    nameProject: {
      title: 'Name your first project',
      body:
        'Give the project a descriptive name to anchor autosave, history, exports and backups. Every workflow references it so your offline library stays organized and easy to restore.',
    },
    saveProject: {
      title: 'Capture an immediate save',
      body:
        'Select Save (or press Ctrl+S/⌘S/Enter) to capture a complete offline snapshot—devices, power math, requirements, notes and diagnostics. The next workflow unlocks once the save finishes.',
    },
    addCamera: {
      title: 'Select the primary camera',
      body:
        'Choose the camera body you are planning. Offline search works inside the menu. That selection unlocks matching accessories, power draws and diagrams.',
    },
    addMonitoring: {
      title: 'Add monitors, wireless video and FIZ',
      body:
        'Pick onboard monitors, wireless transmitters and FIZ motors or controllers. Each selection feeds runtime math, diagrams and automatic gear rules so the generated kit reflects the full build.',
    },
    selectBattery: {
      title: 'Choose batteries',
      body:
        'Select the battery system that powers the rig. Runtime projections update immediately and the selection is stored with your offline project snapshots and backups.',
    },
    resultsTotalDraw: {
      title: 'Power Summary pass: Total draw',
      body:
        'Start your Power Summary review by confirming the Total Draw card and peak load so the demand math stays accurate before moving on to deeper checks.',
    },
    resultsBatteryPacks: {
      title: 'Power Summary pass: Battery runtimes',
      body:
        'Expand each battery pack to review runtime projections, reserve margin highlights and device notes while making sure autosave captures the latest selections for offline safety.',
    },
    resultsChangeover: {
      title: 'Power Summary pass: Changeovers',
      body:
        'Continue through the changeover countdown timers to confirm charger coverage and status indicators so every handoff is organized in the saved snapshot.',
    },
    resultsWarnings: {
      title: 'Power Summary pass: Warnings and backups',
      body:
        'Log any connector warnings when D-Tap or pins cannot handle the load, download the offline report for redundant backups and confirm the autosave banner so shares and exports mirror the same state.',
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
    editDeviceDataAdd: {
      title: 'Add a device to the library',
      body:
        'Open Device Library, pick a category, name the item and record its draw or connector data. Press Add so the new device is stored offline, included in autosave and ready for backups and exports.',
    },
    editDeviceDataReview: {
      title: 'Review the device details',
      body:
        'Find the device you just saved inside Existing Devices and open its details. Confirm the draw, outputs and compatibility metadata look correct before relying on it in runtime math or shares.',
    },
    editDeviceDataEdit: {
      title: 'Update and resave the device',
      body:
        'Use the Edit button on that same entry, adjust specs or notes, then save. This verifies autosave, backups and exports all carry the most current numbers without risking any loss of user data.',
    },
    ownGearAccess: {
      title: 'Open the Own Gear dialog',
      body:
        'Use the Own Gear button in the sidebar to open the inventory dialog whenever you need to review equipment you already control. Opening it yourself keeps the workflow familiar when the tutorial is finished.',
    },
    ownGearAddDevice: {
      title: 'Add your first owned device',
      body:
        'Enter the item name, optional quantity and notes, then save. Owned gear is stored offline, included in backups and marked inside exports so teams instantly see what is available without duplicating requests.',
    },
    generateGearAndRequirements: {
      title: 'Generate requirements and gear list',
      body:
        'Use Generate Gear List and Project Requirements to rebuild the checklist after every change. The planner saves the output with the project so PDFs, exports and backups always reflect the latest selections.',
    },
    autoGearRulesAccess: {
      title: 'Open Automatic Gear Rules',
      body:
        'Go to Settings → Automatic Gear Rules to review automation controls. Opening the tab shows the presets, stock rules and safety backups stored with your offline saves.',
    },
    autoGearRulesEdit: {
      title: 'Edit stock automatic gear rules',
      body:
        'Use the rules list to inspect factory additions. Select a stock rule to open it in the editor, adjust items or conditions, then save so the updated automation stays cached with backups and share bundles.',
    },
    autoGearRulesCreate: {
      title: 'Add a new automatic gear rule',
      body:
        'Press Add rule to create a custom automation. Name it, add conditions and required gear, then save. The planner runs new rules offline each time you regenerate the kit and includes them in exports, shares and backups.',
    },
    projectRequirements: {
      title: 'Refine project requirements boxes',
      body:
        'Adjust the Project Requirements output to capture crew notes, deliverables and safety reminders. Every box is saved with the project, prints with overviews and flows into exports. Work through three quick substeps so nothing is missed: 15A records the project brief—production company, rental preferences, schedule and delivery specs; 15B links crew rows to saved contacts while marking prep/shoot/return coverage and emergency notes; 15C captures logistics such as storage media, monitoring preferences and safety callouts, then regenerate the summary to confirm the new details appear.',
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

  function isPrefaceStep(step) {
    return Boolean(step && step.preface);
  }

  function isCompletionStep(step) {
    return Boolean(step && step.key === 'completion');
  }

  function isCountableStep(step) {
    return Boolean(step && !isPrefaceStep(step) && !isCompletionStep(step));
  }

  function getCountableStepTotal(stepList) {
    if (!Array.isArray(stepList)) {
      return 0;
    }
    let total = 0;
    for (let index = 0; index < stepList.length; index += 1) {
      if (isCountableStep(stepList[index])) {
        total += 1;
      }
    }
    return total;
  }

  function getCountableStepIndex(stepList, index) {
    if (!Array.isArray(stepList) || typeof index !== 'number') {
      return null;
    }
    if (index < 0 || index >= stepList.length) {
      return null;
    }
    if (!isCountableStep(stepList[index])) {
      return null;
    }
    let position = -1;
    for (let pointer = 0; pointer <= index; pointer += 1) {
      if (isCountableStep(stepList[pointer])) {
        position += 1;
      }
    }
    return position;
  }

  function getCountableCompletedCount(stepList, completedSet) {
    if (!Array.isArray(stepList) || !completedSet || typeof completedSet.has !== 'function') {
      return 0;
    }
    let count = 0;
    for (let index = 0; index < stepList.length; index += 1) {
      const step = stepList[index];
      if (isCountableStep(step) && completedSet.has(step.key)) {
        count += 1;
      }
    }
    return count;
  }

  function getNextCountableStep(stepList, completedSet) {
    if (!Array.isArray(stepList)) {
      return null;
    }
    for (let index = 0; index < stepList.length; index += 1) {
      const step = stepList[index];
      if (!isCountableStep(step)) {
        continue;
      }
      if (!completedSet || typeof completedSet.has !== 'function' || !completedSet.has(step.key)) {
        return step;
      }
    }
    return null;
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

  function createDeviceLibraryRequirement(checker) {
    const evaluate = typeof checker === 'function' ? checker : (() => false);
    return {
      check() {
        try {
          return Boolean(evaluate());
        } catch (error) {
          safeWarn('cine.features.onboardingTour could not evaluate device library requirement.', error);
          return false;
        }
      },
      attach(context) {
        const handler = () => {
          let matches = false;
          try {
            matches = Boolean(evaluate());
          } catch (error) {
            safeWarn('cine.features.onboardingTour could not evaluate device library change.', error);
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
        const unsubscribe = subscribeDeviceLibrary(handler);
        handler();
        return () => {
          if (typeof unsubscribe === 'function') {
            unsubscribe();
          }
        };
      },
    };
  }

  function createDeviceLibraryAddRequirement() {
    return createDeviceLibraryRequirement(() => Boolean(deviceLibraryState.lastAdded));
  }

  function createDeviceLibraryReviewRequirement() {
    return createDeviceLibraryRequirement(() => {
      const added = deviceLibraryState.lastAdded;
      const reviewed = deviceLibraryState.lastReviewed;
      if (!added || !reviewed) {
        return false;
      }
      return descriptorsMatch(added, reviewed);
    });
  }

  function createDeviceLibraryEditRequirement() {
    return createDeviceLibraryRequirement(() => {
      const added = deviceLibraryState.lastAdded;
      const updated = deviceLibraryState.lastUpdated;
      if (!added || !updated) {
        return false;
      }
      const currentMatch = updated.current ? descriptorsMatch(added, updated.current) : false;
      const originalMatch = updated.original ? descriptorsMatch(added, updated.original) : false;
      return currentMatch || originalMatch;
    });
  }

  function evaluateOwnGearOpenState() {
    try {
      return isOwnGearDialogVisible();
    } catch (error) {
      safeWarn('cine.features.onboardingTour could not evaluate Own Gear dialog visibility.', error);
      return false;
    }
  }

  function createOwnGearOpenRequirement() {
    return {
      check() {
        return evaluateOwnGearOpenState();
      },
      attach({ complete, incomplete }) {
        const dialog = getElement('#ownGearDialog');
        if (!dialog) {
          return null;
        }

        let observer = null;
        const evaluate = () => {
          if (evaluateOwnGearOpenState()) {
            complete();
          } else {
            incomplete();
          }
        };

        evaluate();

        if (typeof MutationObserver === 'function') {
          try {
            observer = new MutationObserver(() => {
              evaluate();
            });
            observer.observe(dialog, {
              attributes: true,
              attributeFilter: ['open', 'hidden', 'aria-hidden'],
            });
          } catch (error) {
            safeWarn('cine.features.onboardingTour could not observe Own Gear dialog attributes.', error);
            observer = null;
          }
        }

        const handleDialogEvent = () => {
          evaluate();
        };

        dialog.addEventListener('close', handleDialogEvent);
        dialog.addEventListener('cancel', handleDialogEvent);

        const trigger = getElement('[data-sidebar-action="open-own-gear"]');
        const handleTriggerClick = () => {
          setTimeout(evaluate, 100);
        };
        if (trigger) {
          trigger.addEventListener('click', handleTriggerClick);
        }

        return () => {
          dialog.removeEventListener('close', handleDialogEvent);
          dialog.removeEventListener('cancel', handleDialogEvent);
          if (trigger) {
            trigger.removeEventListener('click', handleTriggerClick);
          }
          if (observer) {
            try {
              observer.disconnect();
            } catch (error) {
              safeWarn('cine.features.onboardingTour could not disconnect Own Gear dialog observer.', error);
            }
          }
        };
      },
    };
  }

  function hasOwnGearListEntries() {
    const list = getElement('#ownGearList');
    if (list && typeof list.querySelector === 'function') {
      const item = list.querySelector('.own-gear-item');
      if (item) {
        return true;
      }
    }
    const emptyState = getElement('#ownGearEmptyState');
    if (emptyState && emptyState.hasAttribute('hidden')) {
      return true;
    }
    return false;
  }

  function createOwnGearItemRequirement() {
    return {
      check() {
        return hasOwnGearListEntries();
      },
      attach({ complete, incomplete }) {
        const list = getElement('#ownGearList');
        const emptyState = getElement('#ownGearEmptyState');

        const evaluate = () => {
          if (hasOwnGearListEntries()) {
            complete();
          } else {
            incomplete();
          }
        };

        evaluate();

        let listObserver = null;
        if (list && typeof MutationObserver === 'function') {
          try {
            listObserver = new MutationObserver(() => {
              evaluate();
            });
            listObserver.observe(list, { childList: true });
          } catch (error) {
            safeWarn('cine.features.onboardingTour could not observe Own Gear list changes.', error);
            listObserver = null;
          }
        }

        const handleListEvent = () => {
          evaluate();
        };

        if (list) {
          list.addEventListener('click', handleListEvent, true);
        }

        const form = getElement('#ownGearForm');
        const handleFormSubmit = () => {
          setTimeout(evaluate, 50);
        };
        if (form && typeof form.addEventListener === 'function') {
          form.addEventListener('submit', handleFormSubmit);
        }

        const saveButton = getElement('#ownGearSaveButton');
        const handleSaveClick = () => {
          setTimeout(evaluate, 50);
        };
        if (saveButton && typeof saveButton.addEventListener === 'function') {
          saveButton.addEventListener('click', handleSaveClick);
        }

        let emptyObserver = null;
        if (emptyState && typeof MutationObserver === 'function') {
          try {
            emptyObserver = new MutationObserver(() => {
              evaluate();
            });
            emptyObserver.observe(emptyState, { attributes: true, attributeFilter: ['hidden', 'aria-hidden'] });
          } catch (error) {
            safeWarn('cine.features.onboardingTour could not observe Own Gear empty state.', error);
            emptyObserver = null;
          }
        }

        return () => {
          if (list) {
            list.removeEventListener('click', handleListEvent, true);
          }
          if (form && typeof form.removeEventListener === 'function') {
            form.removeEventListener('submit', handleFormSubmit);
          }
          if (saveButton && typeof saveButton.removeEventListener === 'function') {
            saveButton.removeEventListener('click', handleSaveClick);
          }
          if (listObserver) {
            try {
              listObserver.disconnect();
            } catch (error) {
              safeWarn('cine.features.onboardingTour could not disconnect Own Gear list observer.', error);
            }
          }
          if (emptyObserver) {
            try {
              emptyObserver.disconnect();
            } catch (error) {
              safeWarn('cine.features.onboardingTour could not disconnect Own Gear empty state observer.', error);
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
    editDeviceDataAdd: createDeviceLibraryAddRequirement(),
    editDeviceDataReview: createDeviceLibraryReviewRequirement(),
    editDeviceDataEdit: createDeviceLibraryEditRequirement(),
    ownGearAccess: createOwnGearOpenRequirement(),
    ownGearAddDevice: createOwnGearItemRequirement(),
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

  function normalizeLanguageCandidate(rawValue, availableTexts) {
    if (!rawValue || (typeof rawValue !== 'string' && typeof rawValue !== 'number')) {
      return null;
    }
    const textMap = (availableTexts && typeof availableTexts === 'object') ? availableTexts : {};
    const trimmed = String(rawValue).trim();
    if (!trimmed) {
      return null;
    }
    if (Object.prototype.hasOwnProperty.call(textMap, trimmed)) {
      return trimmed;
    }
    const lower = trimmed.toLowerCase();
    if (Object.prototype.hasOwnProperty.call(textMap, lower)) {
      return lower;
    }
    const base = lower.split(/[-_]/)[0];
    if (base && Object.prototype.hasOwnProperty.call(textMap, base)) {
      return base;
    }
    return null;
  }

  function resolveLanguage() {
    const availableTexts = GLOBAL_SCOPE && GLOBAL_SCOPE.texts && typeof GLOBAL_SCOPE.texts === 'object'
      ? GLOBAL_SCOPE.texts
      : {};
    const defaultLang = Object.prototype.hasOwnProperty.call(availableTexts, 'en')
      ? 'en'
      : (Object.keys(availableTexts)[0] || 'en');

    const seen = new Set();
    const candidates = [];
    const pushCandidate = value => {
      const normalized = normalizeLanguageCandidate(value, availableTexts);
      if (!normalized || seen.has(normalized)) {
        return;
      }
      seen.add(normalized);
      candidates.push(normalized);
    };

    try {
      if (typeof GLOBAL_SCOPE.currentLang === 'string') {
        pushCandidate(GLOBAL_SCOPE.currentLang);
      }
    } catch (error) {
      void error;
    }

    if (DOCUMENT && DOCUMENT.documentElement && typeof DOCUMENT.documentElement.lang === 'string') {
      pushCandidate(DOCUMENT.documentElement.lang);
    }

    if (DOCUMENT && typeof DOCUMENT.getElementById === 'function') {
      const headerLanguage = DOCUMENT.getElementById('languageSelect');
      if (headerLanguage && typeof headerLanguage.value === 'string') {
        pushCandidate(headerLanguage.value);
      }
      const settingsLanguage = DOCUMENT.getElementById('settingsLanguage');
      if (settingsLanguage && typeof settingsLanguage.value === 'string') {
        pushCandidate(settingsLanguage.value);
      }
    }

    try {
      if (
        GLOBAL_SCOPE
        && GLOBAL_SCOPE.localStorage
        && typeof GLOBAL_SCOPE.localStorage.getItem === 'function'
      ) {
        pushCandidate(GLOBAL_SCOPE.localStorage.getItem('language'));
      }
    } catch (error) {
      void error;
    }

    try {
      const navigatorObject = GLOBAL_SCOPE && GLOBAL_SCOPE.navigator ? GLOBAL_SCOPE.navigator : null;
      if (navigatorObject) {
        if (Array.isArray(navigatorObject.languages)) {
          for (let index = 0; index < navigatorObject.languages.length; index += 1) {
            pushCandidate(navigatorObject.languages[index]);
          }
        }
        if (typeof navigatorObject.language === 'string') {
          pushCandidate(navigatorObject.language);
        }
      }
    } catch (error) {
      void error;
    }

    for (let index = 0; index < candidates.length; index += 1) {
      const candidate = candidates[index];
      if (candidate && Object.prototype.hasOwnProperty.call(availableTexts, candidate)) {
        return candidate;
      }
    }

    return defaultLang;
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

      const resolvedEntry = {
        ...(defaultEntry && typeof defaultEntry === 'object' ? defaultEntry : {}),
        ...(fallbackEntry && typeof fallbackEntry === 'object' ? fallbackEntry : {}),
        ...(localEntry && typeof localEntry === 'object' ? localEntry : {}),
        title: resolvedTitle,
        body: resolvedBody,
      };

      steps[key] = resolvedEntry;
    }
    const prefaceIndicatorText = (() => {
      const localizedValue = localized && typeof localized.prefaceIndicator === 'string'
        ? localized.prefaceIndicator.trim()
        : '';
      if (localizedValue) {
        return localizedValue;
      }
      const fallbackValue = fallback && typeof fallback.prefaceIndicator === 'string'
        ? fallback.prefaceIndicator.trim()
        : '';
      if (fallbackValue) {
        return fallbackValue;
      }
      return 'Preface';
    })();

    return {
      ...fallback,
      ...localized,
      prefaceIndicator: prefaceIndicatorText,
      steps,
    };
  }

  let tourTexts = resolveTourTexts();

  function getStepConfig() {
    return [
      {
        key: 'intro',
        highlight: null,
        preface: true,
        size: 'hero',
      },
      {
        key: 'userProfile',
        highlight: null,
        forceFloating: true,
        size: 'large',
      },
      {
        key: 'unitsPreferences',
        highlight: null,
        forceFloating: true,
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
        cardOverlap: {
          right: 1 / 3,
        },
      },
      {
        key: 'resultsTotalDraw',
        highlight: '#results',
      },
      {
        key: 'resultsBatteryPacks',
        highlight: '#results',
      },
      {
        key: 'resultsChangeover',
        highlight: '#results',
      },
      {
        key: 'resultsWarnings',
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
        key: 'editDeviceDataAdd',
        highlight: ['#toggleDeviceManager', '#addDeviceHeading', '#addDeviceBtn'],
        focus: '#newName',
        ensureDeviceManager: true,
      },
      {
        key: 'editDeviceDataReview',
        highlight: '#deviceListContainer',
        focus: '#deviceListContainer .detail-toggle',
        ensureDeviceManager: true,
      },
      {
        key: 'editDeviceDataEdit',
        highlight: '#deviceListContainer',
        focus: '#deviceListContainer .edit-btn',
        ensureDeviceManager: true,
      },
      {
        key: 'ownGearAccess',
        highlight: '[data-sidebar-action="open-own-gear"]',
        focus: '[data-sidebar-action="open-own-gear"]',
      },
      {
        key: 'ownGearAddDevice',
        highlight: '#ownGearDialog',
        ensureOwnGear: true,
        focus: '#ownGearName',
      },
      {
        key: 'generateGearAndRequirements',
        highlight: '#generateGearListBtn',
      },
      {
        key: 'autoGearRulesAccess',
        highlight: '#settingsPanel-autoGear',
        ensureSettings: {
          tabId: 'settingsTab-autoGear',
        },
      },
      {
        key: 'autoGearRulesEdit',
        highlight: '#autoGearRulesList',
        ensureSettings: {
          tabId: 'settingsTab-autoGear',
        },
      },
      {
        key: 'autoGearRulesCreate',
        highlight: '#autoGearAddRule',
        ensureSettings: {
          tabId: 'settingsTab-autoGear',
        },
        focus: '#autoGearAddRule',
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

  let overlayRoot = null;
  let overlayAnchor = null;
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
  let scrollStateTimer = null;
  let autoOpenedSettings = false;
  let settingsDialogRef = null;
  let autoOpenedContacts = false;
  let contactsDialogRef = null;
  let autoOpenedOwnGear = false;
  let ownGearDialogRef = null;
  let autoOpenedDeviceManager = false;
  let deviceManagerSectionRef = null;
  let deviceManagerToggleRef = null;
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
    const release = function () {
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
      bringOverlayToTopLayer();
      return;
    }

    if (supportsDialogTopLayer) {
      overlayRoot = DOCUMENT.createElement('dialog');
      overlayRoot.setAttribute('role', 'presentation');
      overlayRoot.setAttribute('aria-modal', 'false');
    } else {
      overlayRoot = DOCUMENT.createElement('div');
    }
    overlayRoot.id = OVERLAY_ID;
    overlayRoot.className = 'onboarding-overlay';
    overlayRoot.setAttribute('aria-hidden', 'true');
    clearScrollState();

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
    overlayAnchor = DOCUMENT.body;

    bringOverlayToTopLayer();

    overlayRoot.addEventListener('keydown', handleOverlayKeydown, true);
  }

  function teardownOverlayElements() {
    clearFrame();
    clearActiveTargetElements();
    clearScrollState();
    if (overlayRoot && overlayRoot.parentNode) {
      if (supportsDialogTopLayer && typeof overlayRoot.close === 'function' && overlayRoot.open) {
        try {
          overlayRoot.close();
        } catch (error) {
          safeWarn('cine.features.onboardingTour could not close overlay dialog.', error);
        }
      }
      overlayRoot.parentNode.removeChild(overlayRoot);
    }
    overlayRoot = null;
    overlayAnchor = null;
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

  function formatStepIndicator(position, total) {
    const template = typeof tourTexts.stepIndicator === 'string'
      ? tourTexts.stepIndicator
      : 'Step {current} of {total}';
    const currentIndex = typeof position === 'number' ? position : -1;
    const totalSteps = typeof total === 'number' && total > 0 ? total : 0;
    const currentValue = currentIndex >= 0 ? currentIndex + 1 : 0;
    return template
      .replace('{current}', String(currentValue))
      .replace('{total}', String(totalSteps));
  }

  function formatPrefaceIndicator() {
    if (tourTexts && typeof tourTexts.prefaceIndicator === 'string' && tourTexts.prefaceIndicator.trim()) {
      return tourTexts.prefaceIndicator.trim();
    }
    return 'Preface';
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

  function resolveOverlayAnchorForElements(elements) {
    if (!DOCUMENT) {
      return null;
    }

    const list = Array.isArray(elements) ? elements : [];
    const main = DOCUMENT.getElementById(MAIN_ANCHOR_ID);
    const header = DOCUMENT.getElementById(HEADER_ANCHOR_ID);

    for (let index = 0; index < list.length; index += 1) {
      const element = list[index];
      if (!element) {
        continue;
      }
      if (typeof element.closest === 'function') {
        const flaggedAnchor = element.closest('[data-onboarding-anchor]');
        if (flaggedAnchor) {
          return flaggedAnchor;
        }
        const dialogAnchor = element.closest('dialog');
        if (dialogAnchor) {
          return dialogAnchor;
        }
      }
      if (main && typeof main.contains === 'function' && main.contains(element)) {
        return main;
      }
      if (header && typeof header.contains === 'function' && header.contains(element)) {
        return header;
      }
    }

    return DOCUMENT.body || null;
  }

  function setOverlayAnchorElement(anchorElement) {
    if (!overlayRoot || !DOCUMENT) {
      overlayAnchor = anchorElement || overlayAnchor;
      return;
    }

    const target = anchorElement || DOCUMENT.body;
    if (!target) {
      return;
    }

    if (overlayAnchor === target && overlayRoot.parentNode === target) {
      if (target === DOCUMENT.body) {
        overlayRoot.classList.remove('onboarding-overlay--anchored');
        bringOverlayToTopLayer();
      } else {
        overlayRoot.classList.add('onboarding-overlay--anchored');
        if (supportsDialogTopLayer && isDialogElement(overlayRoot) && !overlayRoot.open) {
          try {
            overlayRoot.open = true;
          } catch (openError) {
            void openError;
            try {
              overlayRoot.setAttribute('open', '');
            } catch (attrError) {
              void attrError;
            }
          }
        }
      }
      return;
    }

    const wantsTopLayer = target === DOCUMENT.body;
    const isDialogRoot = supportsDialogTopLayer && isDialogElement(overlayRoot);

    if (isDialogRoot && overlayRoot.open && !wantsTopLayer && typeof overlayRoot.close === 'function') {
      try {
        overlayRoot.close();
      } catch (error) {
        safeWarn('cine.features.onboardingTour could not reset overlay dialog state.', error);
      }
    }

    if (overlayRoot.parentNode !== target) {
      try {
        target.appendChild(overlayRoot);
      } catch (error) {
        safeWarn('cine.features.onboardingTour could not move overlay to anchor.', error);
      }
    }

    overlayAnchor = target;

    if (wantsTopLayer) {
      overlayRoot.classList.remove('onboarding-overlay--anchored');
      bringOverlayToTopLayer();
      return;
    }

    overlayRoot.classList.add('onboarding-overlay--anchored');

    if (isDialogRoot && !overlayRoot.open) {
      try {
        overlayRoot.open = true;
      } catch (openError) {
        void openError;
        try {
          overlayRoot.setAttribute('open', '');
        } catch (attrError) {
          void attrError;
        }
      }
    }
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
    setOverlayAnchorElement(resolveOverlayAnchorForElements(highlightElements));
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

      const overlapConfig = currentStep && currentStep.cardOverlap ? currentStep.cardOverlap : null;
      const clampOverlap = (value) => {
        if (typeof value !== 'number' || Number.isNaN(value)) {
          return 0;
        }
        return Math.min(Math.max(value, 0), 0.95);
      };
      const overlapTopFraction = overlapConfig ? clampOverlap(overlapConfig.top) : 0;
      const overlapRightFraction = overlapConfig ? clampOverlap(overlapConfig.right) : 0;
      const overlapBottomFraction = overlapConfig ? clampOverlap(overlapConfig.bottom) : 0;
      const overlapLeftFraction = overlapConfig ? clampOverlap(overlapConfig.left) : 0;
      const topOverlapOffset = rect.height * overlapTopFraction;
      const rightOverlapOffset = rect.width * overlapRightFraction;
      const bottomOverlapOffset = rect.height * overlapBottomFraction;
      const leftOverlapOffset = rect.width * overlapLeftFraction;
      const topMarginOffset = overlapTopFraction > 0 ? margin : 0;
      const rightMarginOffset = overlapRightFraction > 0 ? margin : 0;
      const bottomMarginOffset = overlapBottomFraction > 0 ? margin : 0;
      const leftMarginOffset = overlapLeftFraction > 0 ? margin : 0;

      const options = [
        {
          name: 'bottom',
          top: targetTop + rect.height + margin - bottomOverlapOffset - bottomMarginOffset,
          left: targetCenterX - cardRect.width / 2,
          fits:
            targetTop + rect.height + margin + cardRect.height
              - bottomOverlapOffset - bottomMarginOffset <= viewportBottom - margin,
        },
        {
          name: 'top',
          top: targetTop - cardRect.height - margin + topOverlapOffset + topMarginOffset,
          left: targetCenterX - cardRect.width / 2,
          fits: targetTop - cardRect.height - margin + topOverlapOffset + topMarginOffset >= minTop,
        },
        {
          name: 'right',
          top: targetCenterY - cardRect.height / 2,
          left: targetLeft + rect.width + margin - rightOverlapOffset - rightMarginOffset,
          fits:
            targetLeft + rect.width + margin + cardRect.width
              - rightOverlapOffset - rightMarginOffset <= viewportRight - margin,
        },
        {
          name: 'left',
          top: targetCenterY - cardRect.height / 2,
          left: targetLeft - cardRect.width - margin + leftOverlapOffset + leftMarginOffset,
          fits:
            targetLeft - cardRect.width - margin + leftOverlapOffset + leftMarginOffset >= minLeft,
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

  function isDeviceManagerVisible() {
    if (!deviceManagerSectionRef) {
      deviceManagerSectionRef = DOCUMENT.getElementById('device-manager');
    }
    if (!deviceManagerSectionRef) {
      return false;
    }
    return !deviceManagerSectionRef.classList.contains('hidden');
  }

  function ensureDeviceManagerForStep(step) {
    if (!step || !step.ensureDeviceManager) {
      return;
    }

    if (!deviceManagerSectionRef) {
      deviceManagerSectionRef = DOCUMENT.getElementById('device-manager');
    }
    if (!deviceManagerSectionRef) {
      return;
    }

    if (isDeviceManagerVisible()) {
      autoOpenedDeviceManager = false;
      return;
    }

    if (!deviceManagerToggleRef) {
      deviceManagerToggleRef = DOCUMENT.getElementById('toggleDeviceManager');
    }

    autoOpenedDeviceManager = true;

    if (deviceManagerToggleRef && typeof deviceManagerToggleRef.click === 'function') {
      try {
        deviceManagerToggleRef.click();
      } catch (error) {
        safeWarn('cine.features.onboardingTour could not trigger device manager toggle.', error);
      }
    }

    if (isDeviceManagerVisible()) {
      return;
    }

    const showDeviceManager = GLOBAL_SCOPE && typeof GLOBAL_SCOPE.showDeviceManagerSection === 'function'
      ? GLOBAL_SCOPE.showDeviceManagerSection
      : null;
    if (showDeviceManager) {
      try {
        showDeviceManager();
      } catch (error) {
        safeWarn('cine.features.onboardingTour could not open device manager via showDeviceManagerSection.', error);
      }
    }

    if (isDeviceManagerVisible()) {
      return;
    }

    deviceManagerSectionRef.classList.remove('hidden');
    if (!deviceManagerToggleRef) {
      deviceManagerToggleRef = DOCUMENT.getElementById('toggleDeviceManager');
    }
    if (deviceManagerToggleRef) {
      deviceManagerToggleRef.setAttribute('aria-expanded', 'true');
    }

    if (!isDeviceManagerVisible()) {
      autoOpenedDeviceManager = false;
    }
  }

  function closeDeviceManagerIfNeeded() {
    if (!autoOpenedDeviceManager) {
      autoOpenedDeviceManager = false;
      return;
    }

    if (!deviceManagerSectionRef) {
      deviceManagerSectionRef = DOCUMENT.getElementById('device-manager');
    }

    if (!deviceManagerToggleRef) {
      deviceManagerToggleRef = DOCUMENT.getElementById('toggleDeviceManager');
    }

    if (deviceManagerToggleRef && typeof deviceManagerToggleRef.click === 'function') {
      try {
        if (!deviceManagerSectionRef) {
          deviceManagerToggleRef.click();
        } else if (!deviceManagerSectionRef.classList.contains('hidden')) {
          deviceManagerToggleRef.click();
        }
      } catch (error) {
        safeWarn('cine.features.onboardingTour could not toggle device manager closed.', error);
      }
    }

    if (isDeviceManagerVisible()) {
      const hideDeviceManager = GLOBAL_SCOPE && typeof GLOBAL_SCOPE.hideDeviceManagerSection === 'function'
        ? GLOBAL_SCOPE.hideDeviceManagerSection
        : null;
      if (hideDeviceManager) {
        try {
          hideDeviceManager();
        } catch (error) {
          safeWarn('cine.features.onboardingTour could not close device manager via hideDeviceManagerSection.', error);
        }
      } else if (deviceManagerSectionRef) {
        deviceManagerSectionRef.classList.add('hidden');
        if (!deviceManagerToggleRef) {
          deviceManagerToggleRef = DOCUMENT.getElementById('toggleDeviceManager');
        }
        if (deviceManagerToggleRef) {
          deviceManagerToggleRef.setAttribute('aria-expanded', 'false');
        }
      }
    }

    autoOpenedDeviceManager = false;
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
    const totalSteps = getCountableStepTotal(stepConfig);
    const completedRaw = storedState && Array.isArray(storedState.completedSteps)
      ? storedState.completedSteps
      : [];
    const completedSet = new Set(completedRaw);
    const completedCount = getCountableCompletedCount(stepConfig, completedSet);
    const countableIndex = getCountableStepIndex(stepConfig, index);
    if (countableIndex === null) {
      const fallbackHint = tourTexts.resumeHint || '';
      if (!fallbackHint) {
        resumeHintEl.hidden = true;
        resumeHintEl.textContent = '';
        return;
      }
      resumeHintEl.hidden = false;
      resumeHintEl.textContent = fallbackHint;
      return;
    }
    const template = tourTexts.resumeHintDetailed || tourTexts.resumeHint || 'Resuming where you left off.';
    const hint = template
      .replace('{current}', String(countableIndex + 1))
      .replace('{total}', String(totalSteps))
      .replace('{completed}', String(Math.min(completedCount, totalSteps)));
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
      if (index < 3) {
        item.classList.add('onboarding-step-item--pinned');
        if (item && item.style && typeof item.style.setProperty === 'function') {
          item.style.setProperty('--onboarding-step-pinned-index', String(index));
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

  function applyLanguagePreference(value) {
    const candidate = typeof value === 'string' ? value.trim() : '';
    if (!candidate) {
      return false;
    }

    let applied = false;
    const missingSentinel = {};

    if (typeof GLOBAL_SCOPE.callCoreFunctionIfAvailable === 'function') {
      try {
        const result = GLOBAL_SCOPE.callCoreFunctionIfAvailable(
          'setLanguage',
          [candidate],
          { defaultValue: missingSentinel },
        );
        if (result !== missingSentinel) {
          applied = true;
        }
      } catch (error) {
        safeWarn('cine.features.onboardingTour could not route language preference via runtime bridge.', error);
      }
    }

    if (!applied && typeof GLOBAL_SCOPE.setLanguage === 'function') {
      try {
        GLOBAL_SCOPE.setLanguage(candidate);
        applied = true;
      } catch (error) {
        safeWarn('cine.features.onboardingTour could not sync language preference.', error);
      }
    }

    return applied;
  }

  function renderIntroInteraction(registerCleanup) {
    if (!interactionContainerEl) {
      return false;
    }

    const introEntry = tourTexts && tourTexts.steps && tourTexts.steps.intro
      ? tourTexts.steps.intro
      : {};
    const heroTexts = introEntry && typeof introEntry.hero === 'object'
      ? introEntry.hero
      : {};
    const highlights = Array.isArray(heroTexts.highlights) ? heroTexts.highlights : [];
    const badgeIcon = typeof heroTexts.badgeIcon === 'string' && heroTexts.badgeIcon
      ? heroTexts.badgeIcon
      : '\uE9C3';
    const badgeLabel = typeof heroTexts.badgeLabel === 'string' ? heroTexts.badgeLabel : '';
    const badgeDescription = typeof heroTexts.badgeDescription === 'string'
      ? heroTexts.badgeDescription
      : '';
    const languageLabel = typeof heroTexts.languageLabel === 'string'
      ? heroTexts.languageLabel
      : 'Language';
    const languageHint = typeof heroTexts.languageHint === 'string' ? heroTexts.languageHint : '';
    const offlineSummary = typeof heroTexts.offlineSummary === 'string'
      ? heroTexts.offlineSummary
      : '';

    interactionContainerEl.hidden = false;
    interactionContainerEl.classList.add('onboarding-interaction--hero');
    registerCleanup(() => {
      interactionContainerEl.classList.remove('onboarding-interaction--hero');
    });

    const hero = DOCUMENT.createElement('div');
    hero.className = 'onboarding-hero';

    if (badgeLabel || badgeDescription) {
      const badge = DOCUMENT.createElement('div');
      badge.className = 'onboarding-hero-badge';

      const badgeIconEl = DOCUMENT.createElement('span');
      badgeIconEl.className = 'icon-glyph onboarding-hero-badge-icon';
      badgeIconEl.setAttribute('data-icon-font', 'uicons');
      badgeIconEl.setAttribute('aria-hidden', 'true');
      badgeIconEl.textContent = badgeIcon;
      badge.appendChild(badgeIconEl);

      const badgeText = DOCUMENT.createElement('div');
      badgeText.className = 'onboarding-hero-badge-text';

      if (badgeLabel) {
        const labelEl = DOCUMENT.createElement('span');
        labelEl.className = 'onboarding-hero-badge-label';
        labelEl.textContent = badgeLabel;
        badgeText.appendChild(labelEl);
      }

      if (badgeDescription) {
        const descriptionEl = DOCUMENT.createElement('span');
        descriptionEl.className = 'onboarding-hero-badge-description';
        descriptionEl.textContent = badgeDescription;
        badgeText.appendChild(descriptionEl);
      }

      badge.appendChild(badgeText);
      hero.appendChild(badge);
    }

    if (highlights.length) {
      const listEl = DOCUMENT.createElement('ul');
      listEl.className = 'onboarding-hero-highlights';

      for (let index = 0; index < highlights.length; index += 1) {
        const entry = highlights[index] && typeof highlights[index] === 'object'
          ? highlights[index]
          : {};
        const itemEl = DOCUMENT.createElement('li');
        itemEl.className = 'onboarding-hero-highlight';

        const iconEl = DOCUMENT.createElement('span');
        iconEl.className = 'icon-glyph onboarding-hero-highlight-icon';
        iconEl.setAttribute('data-icon-font', 'uicons');
        iconEl.setAttribute('aria-hidden', 'true');
        iconEl.textContent = typeof entry.icon === 'string' && entry.icon ? entry.icon : '\uE1A6';
        itemEl.appendChild(iconEl);

        const textWrap = DOCUMENT.createElement('div');
        textWrap.className = 'onboarding-hero-highlight-text';

        if (typeof entry.title === 'string' && entry.title) {
          const titleEl = DOCUMENT.createElement('h3');
          titleEl.className = 'onboarding-hero-highlight-title';
          titleEl.textContent = entry.title;
          textWrap.appendChild(titleEl);
        }

        if (typeof entry.body === 'string' && entry.body) {
          const bodyEl = DOCUMENT.createElement('p');
          bodyEl.className = 'onboarding-hero-highlight-body';
          bodyEl.textContent = entry.body;
          textWrap.appendChild(bodyEl);
        }

        itemEl.appendChild(textWrap);
        listEl.appendChild(itemEl);
      }

      hero.appendChild(listEl);
    }

    const languageGroup = DOCUMENT.createElement('div');
    languageGroup.className = 'onboarding-hero-language';

    const languageSelect = DOCUMENT.getElementById('languageSelect');
    const settingsLanguage = DOCUMENT.getElementById('settingsLanguage');
    const languageTargets = [];
    if (languageSelect) {
      languageTargets.push(languageSelect);
    }
    if (settingsLanguage && settingsLanguage !== languageSelect) {
      languageTargets.push(settingsLanguage);
    }

    const languageControlId = getProxyControlId('intro-language');
    const labelEl = DOCUMENT.createElement('label');
    labelEl.className = 'onboarding-hero-language-label';
    labelEl.setAttribute('for', languageControlId);
    labelEl.textContent = languageLabel;
    languageGroup.appendChild(labelEl);

    const languageProxy = DOCUMENT.createElement('select');
    languageProxy.id = languageControlId;
    languageProxy.className = 'onboarding-field-select onboarding-hero-language-select';

    const copyOptionsFromSource = (source) => {
      const preserveValue = languageProxy.value;
      languageProxy.textContent = '';
      if (!source) {
        return;
      }
      const sourceOptions = source && source.options ? Array.from(source.options) : [];
      if (sourceOptions.length) {
        for (let index = 0; index < sourceOptions.length; index += 1) {
          languageProxy.appendChild(sourceOptions[index].cloneNode(true));
        }
      } else if (typeof source.value === 'string') {
        const option = DOCUMENT.createElement('option');
        option.value = source.value;
        option.textContent = source.value || '';
        languageProxy.appendChild(option);
      }
      if (preserveValue) {
        languageProxy.value = preserveValue;
      }
    };

    const getActiveLanguageValue = () => {
      for (let index = 0; index < languageTargets.length; index += 1) {
        const target = languageTargets[index];
        if (target && typeof target.value === 'string' && target.value) {
          return target.value;
        }
      }
      return '';
    };

    const syncLanguageProxyFromTargets = () => {
      if (!languageTargets.length) {
        return;
      }
      const base = languageTargets[0];
      if (base) {
        const activeValue = getActiveLanguageValue() || languageProxy.value;
        copyOptionsFromSource(base);
        if (activeValue) {
          languageProxy.value = activeValue;
        }
      }
    };

    if (languageTargets.length) {
      copyOptionsFromSource(languageTargets[0]);
      const initialValue = getActiveLanguageValue();
      if (initialValue) {
        languageProxy.value = initialValue;
      } else if (languageProxy.options && languageProxy.options.length && languageTargets[0]) {
        languageProxy.value = languageTargets[0].value || languageProxy.options[0].value;
      }
    } else {
      languageProxy.disabled = true;
      languageProxy.setAttribute('aria-disabled', 'true');
    }

    const handleLanguageProxyChange = () => {
      const value = languageProxy.value;
      const applied = applyLanguagePreference(value);
      if (applied) {
        return;
      }
      for (let index = 0; index < languageTargets.length; index += 1) {
        const target = languageTargets[index];
        if (!target || target.value === value) {
          continue;
        }
        target.value = value;
        dispatchSyntheticEvent(target, 'change');
      }
    };

    languageProxy.addEventListener('change', handleLanguageProxyChange);
    registerCleanup(() => {
      languageProxy.removeEventListener('change', handleLanguageProxyChange);
    });

    const handleTargetChange = () => {
      syncLanguageProxyFromTargets();
    };

    for (let index = 0; index < languageTargets.length; index += 1) {
      const target = languageTargets[index];
      if (!target) {
        continue;
      }
      target.addEventListener('change', handleTargetChange);
      target.addEventListener('input', handleTargetChange);
      registerCleanup(() => {
        target.removeEventListener('change', handleTargetChange);
        target.removeEventListener('input', handleTargetChange);
      });
      if (GLOBAL_SCOPE && GLOBAL_SCOPE.MutationObserver && typeof GLOBAL_SCOPE.MutationObserver === 'function') {
        try {
          const observer = new GLOBAL_SCOPE.MutationObserver(() => {
            syncLanguageProxyFromTargets();
          });
          observer.observe(target, { childList: true });
          registerCleanup(() => {
            try {
              observer.disconnect();
            } catch (error) {
              void error;
            }
          });
        } catch (error) {
          void error;
        }
        break;
      }
    }

    if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.addEventListener === 'function') {
      const handleLanguageEvent = () => {
        syncLanguageProxyFromTargets();
      };
      try {
        GLOBAL_SCOPE.addEventListener('languagechange', handleLanguageEvent);
        registerCleanup(() => {
          try {
            GLOBAL_SCOPE.removeEventListener('languagechange', handleLanguageEvent);
          } catch (removeError) {
            void removeError;
          }
        });
      } catch (error) {
        safeWarn('cine.features.onboardingTour could not observe language changes.', error);
      }
    }

    languageGroup.appendChild(languageProxy);

    if (languageHint) {
      const hintEl = DOCUMENT.createElement('p');
      hintEl.className = 'onboarding-hero-language-hint';
      hintEl.textContent = languageHint;
      languageGroup.appendChild(hintEl);
    }

    hero.appendChild(languageGroup);

    if (offlineSummary) {
      const offlineEl = DOCUMENT.createElement('p');
      offlineEl.className = 'onboarding-hero-offline';
      offlineEl.textContent = offlineSummary;
      hero.appendChild(offlineEl);
    }

    while (interactionContainerEl.firstChild) {
      interactionContainerEl.removeChild(interactionContainerEl.firstChild);
    }
    interactionContainerEl.appendChild(hero);

    return true;
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
    intro.textContent = 'Enter your crew details once. Each update syncs to Contacts instantly, stays cached offline and flows into exports so crews always know who owns the setup.';
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

    const rawAvatarActionLabel = avatarButtonLabel && typeof avatarButtonLabel.textContent === 'string'
      ? avatarButtonLabel.textContent.trim()
      : '';
    const avatarActionLabel = !rawAvatarActionLabel
      ? 'Add profile Picture'
      : rawAvatarActionLabel.toLowerCase() === 'change photo'
        ? 'Add profile Picture'
        : rawAvatarActionLabel;
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

    const languageSelect = DOCUMENT.getElementById('settingsLanguage');
    if (languageSelect) {
      const group = DOCUMENT.createElement('div');
      group.className = 'onboarding-field-group';
      const inputId = getProxyControlId('language');
      const label = DOCUMENT.createElement('label');
      label.className = 'onboarding-field-label';
      label.setAttribute('for', inputId);
      label.textContent = 'Language';
      const proxySelect = DOCUMENT.createElement('select');
      proxySelect.id = inputId;
      proxySelect.className = 'onboarding-field-select';
      const originalOptions = Array.from(languageSelect.options || []);
      if (originalOptions.length === 0) {
        const option = DOCUMENT.createElement('option');
        option.value = languageSelect.value || 'en';
        option.textContent = languageSelect.value || 'English';
        proxySelect.appendChild(option);
      } else {
        for (let index = 0; index < originalOptions.length; index += 1) {
          const source = originalOptions[index];
          const option = DOCUMENT.createElement('option');
          option.value = source.value;
          option.textContent = source.textContent || source.value;
          proxySelect.appendChild(option);
        }
      }
      proxySelect.value = languageSelect.value || proxySelect.value;

      const syncFromTarget = () => {
        if (proxySelect.value !== languageSelect.value) {
          proxySelect.value = languageSelect.value;
        }
      };

      const syncToTarget = () => {
        if (languageSelect.value !== proxySelect.value) {
          languageSelect.value = proxySelect.value;
          dispatchSyntheticEvent(languageSelect, 'change');
        }
      };

      proxySelect.addEventListener('change', syncToTarget);
      registerCleanup(() => {
        proxySelect.removeEventListener('change', syncToTarget);
      });
      languageSelect.addEventListener('change', syncFromTarget);
      registerCleanup(() => {
        languageSelect.removeEventListener('change', syncFromTarget);
      });

      group.appendChild(label);
      group.appendChild(proxySelect);
      fragment.appendChild(group);
    }

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

    const focusScaleSelect = DOCUMENT.getElementById('settingsFocusScale');
    if (focusScaleSelect) {
      const focusGroup = DOCUMENT.createElement('div');
      focusGroup.className = 'onboarding-field-group';
      const focusId = getProxyControlId('focus-scale');
      const focusLabel = DOCUMENT.createElement('label');
      focusLabel.className = 'onboarding-field-label';
      focusLabel.setAttribute('for', focusId);
      const focusLabelSource = DOCUMENT.getElementById('settingsFocusScaleLabel');
      focusLabel.textContent = focusLabelSource && typeof focusLabelSource.textContent === 'string'
        ? focusLabelSource.textContent
        : 'Focus scale';
      const proxyFocus = DOCUMENT.createElement('select');
      proxyFocus.id = focusId;
      proxyFocus.className = 'onboarding-field-select';
      const focusOptions = Array.from(focusScaleSelect.options || []);
      if (focusOptions.length === 0) {
        const option = DOCUMENT.createElement('option');
        option.value = focusScaleSelect.value || 'metric';
        option.textContent = focusScaleSelect.value || 'Metric';
        proxyFocus.appendChild(option);
      } else {
        for (let index = 0; index < focusOptions.length; index += 1) {
          const source = focusOptions[index];
          const option = DOCUMENT.createElement('option');
          option.value = source.value;
          option.textContent = source.textContent || source.value;
          proxyFocus.appendChild(option);
        }
      }
      proxyFocus.value = focusScaleSelect.value || proxyFocus.value;

      const syncFocusFromTarget = () => {
        if (proxyFocus.value !== focusScaleSelect.value) {
          proxyFocus.value = focusScaleSelect.value;
        }
      };

      const syncFocusToTarget = () => {
        if (focusScaleSelect.value !== proxyFocus.value) {
          focusScaleSelect.value = proxyFocus.value;
          dispatchSyntheticEvent(focusScaleSelect, 'change');
        }
      };

      proxyFocus.addEventListener('change', syncFocusToTarget);
      registerCleanup(() => {
        proxyFocus.removeEventListener('change', syncFocusToTarget);
      });
      focusScaleSelect.addEventListener('change', syncFocusFromTarget);
      registerCleanup(() => {
        focusScaleSelect.removeEventListener('change', syncFocusFromTarget);
      });

      focusGroup.appendChild(focusLabel);
      focusGroup.appendChild(proxyFocus);
      fragment.appendChild(focusGroup);
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
      if (key === 'intro') {
        return renderIntroInteraction(registerCleanup);
      }
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

    const totalSteps = getCountableStepTotal(stepConfig);
    const countableIndex = getCountableStepIndex(stepConfig, index);
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

    if (step.key === 'completion') {
      progressEl.textContent = tourTexts.completionIndicator || '';
    } else if (isPrefaceStep(step)) {
      progressEl.textContent = formatPrefaceIndicator();
    } else {
      progressEl.textContent = formatStepIndicator(countableIndex, totalSteps);
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
    const totalSteps = getCountableStepTotal(stepConfig);
    const completedSteps = storedState && Array.isArray(storedState.completedSteps)
      ? storedState.completedSteps
      : [];
    const completedSet = new Set(completedSteps);
    const completedCount = getCountableCompletedCount(stepConfig, completedSet);
    const activeCountableIndex = getCountableStepIndex(stepConfig, index);
    let progressValue = completedCount;
    if (typeof activeCountableIndex === 'number') {
      progressValue = Math.max(progressValue, activeCountableIndex + 1);
    }
    if (isCountableStep(step) && !completedSet.has(step.key)) {
      progressValue = Math.max(progressValue, Math.min(totalSteps, completedCount + 1));
    }
    if (step && step.key === 'completion') {
      progressValue = totalSteps;
    }
    progressValue = Math.min(totalSteps, progressValue);
    const ratio = totalSteps > 0 ? Math.max(0, Math.min(1, progressValue / totalSteps)) : 0;
    progressMeterFillEl.style.width = `${ratio * 100}%`;

    const labelTemplate = tourTexts.progressValueLabel || 'Completed {completed} of {total} steps';
    const label = labelTemplate
      .replace('{completed}', String(Math.min(completedCount, totalSteps)))
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
    if (previousStep && previousStep.ensureDeviceManager && !step.ensureDeviceManager) {
      closeDeviceManagerIfNeeded();
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
    if (step.ensureDeviceManager) {
      ensureDeviceManagerForStep(step);
    } else if (previousStep && previousStep.ensureDeviceManager) {
      closeDeviceManagerIfNeeded();
    } else {
      autoOpenedDeviceManager = false;
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
    closeContactsIfNeeded();
    closeOwnGearIfNeeded();
    closeDeviceManagerIfNeeded();
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
    closeDeviceManagerIfNeeded();
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
    const focusableElements = [];
    const seen = new Set();
    const pushUnique = element => {
      if (!element) {
        return;
      }
      if (seen.has(element)) {
        return;
      }
      seen.add(element);
      focusableElements.push(element);
    };

    const cardFocusable = collectFocusableElements(cardEl);
    for (let index = 0; index < cardFocusable.length; index += 1) {
      pushUnique(cardFocusable[index]);
    }

    if (Array.isArray(activeTargetElements)) {
      for (let targetIndex = 0; targetIndex < activeTargetElements.length; targetIndex += 1) {
        const target = activeTargetElements[targetIndex];
        const targetFocusable = collectFocusableElements(target, true);
        for (let index = 0; index < targetFocusable.length; index += 1) {
          pushUnique(targetFocusable[index]);
        }
      }
    }

    const orderedFocusable = sortFocusableByDocumentOrder(focusableElements);
    if (!orderedFocusable.length) {
      return;
    }
    const direction = event.shiftKey ? -1 : 1;
    const activeElement = DOCUMENT.activeElement;
    let index = orderedFocusable.indexOf(activeElement);
    if (index === -1) {
      index = direction === 1 ? -1 : 0;
    }
    index = (index + direction + orderedFocusable.length) % orderedFocusable.length;
    event.preventDefault();
    const target = orderedFocusable[index];
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
      GLOBAL_SCOPE.addEventListener('scroll', handleGlobalScroll, true);
    }
    if (DOCUMENT && typeof DOCUMENT.addEventListener === 'function') {
      DOCUMENT.addEventListener('scroll', handleGlobalScroll, true);
      if (supportsDialogTopLayer) {
        DOCUMENT.addEventListener('toggle', handleDialogToggle, true);
      }
    }
  }

  function detachGlobalListeners() {
    if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.removeEventListener === 'function') {
      GLOBAL_SCOPE.removeEventListener('resize', schedulePositionUpdate);
      GLOBAL_SCOPE.removeEventListener('scroll', handleGlobalScroll, true);
    }
    if (DOCUMENT && typeof DOCUMENT.removeEventListener === 'function') {
      DOCUMENT.removeEventListener('scroll', handleGlobalScroll, true);
      if (supportsDialogTopLayer) {
        DOCUMENT.removeEventListener('toggle', handleDialogToggle, true);
      }
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
      bringOverlayToTopLayer();
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
    closeDeviceManagerIfNeeded();
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

    const countableSteps = stepList.filter(isCountableStep);
    const total = countableSteps.length;
    const completedCount = Math.min(getCountableCompletedCount(stepList, completedSet), total);

    const activeKey = stored && typeof stored.activeStep === 'string'
      ? stored.activeStep
      : null;
    const activeIndex = activeKey ? allowedKeys.indexOf(activeKey) : -1;

    const nextStep = getNextCountableStep(stepList, completedSet);
    const nextKey = nextStep ? nextStep.key : null;
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
    const totalCountableSteps = getCountableStepTotal(steps);
    const completedRaw = state && Array.isArray(state.completedSteps)
      ? state.completedSteps
      : [];
    const completedSet = new Set(completedRaw);
    const completedCount = getCountableCompletedCount(steps, completedSet);
    const labelTemplate = tourTexts.resumeLabelWithProgress || tourTexts.resumeLabel;
    let label;
    if (state && state.completed) {
      label = tourTexts.restartLabel || tourTexts.startLabel || 'Start guided tutorial';
    } else if (state && state.activeStep) {
      if (labelTemplate) {
        label = labelTemplate
          .replace('{completed}', String(Math.min(completedCount, totalCountableSteps)))
          .replace('{total}', String(totalCountableSteps));
      }
      if (!label) {
        label = tourTexts.resumeLabel || tourTexts.startLabel || 'Resume guided tutorial';
      }
    } else if (completedCount > 0) {
      if (labelTemplate) {
        label = labelTemplate
          .replace('{completed}', String(Math.min(completedCount, totalCountableSteps)))
          .replace('{total}', String(totalCountableSteps));
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
      const hasProgress = Boolean(
        storedState
        && Array.isArray(storedState.completedSteps)
        && storedState.completedSteps.length > 0,
      );
      const resume = hasProgress && Boolean(storedState && storedState.activeStep);
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
