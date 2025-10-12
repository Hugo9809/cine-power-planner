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
  var MAIN_ANCHOR_ID = 'mainContent';
  var HEADER_ANCHOR_ID = 'topBar';
  var supportsDialogTopLayer = function detectDialogSupport() {
    if (!DOCUMENT || typeof DOCUMENT.createElement !== 'function') {
      return false;
    }
    try {
      var dialog = DOCUMENT.createElement('dialog');
      return typeof dialog.show === 'function' && typeof dialog.close === 'function';
    } catch (error) {
      void error;
      return false;
    }
  }();
  var DOM_POSITION_FOLLOWING = typeof Node !== 'undefined' && Node ? Node.DOCUMENT_POSITION_FOLLOWING : 4;
  var DOM_POSITION_PRECEDING = typeof Node !== 'undefined' && Node ? Node.DOCUMENT_POSITION_PRECEDING : 2;
  var FOCUSABLE_SELECTOR = ['button:not([disabled])', 'a[href]', 'input:not([disabled]):not([type="hidden"])', 'select:not([disabled])', 'textarea:not([disabled])', '[role="button"]:not([aria-disabled="true"])', '[tabindex]:not([tabindex="-1"])'].join(',');
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
    if (element.hidden || typeof element.getAttribute === 'function' && element.getAttribute('hidden') !== null) {
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
  function collectFocusableElements(root) {
    var includeRoot = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (!root) {
      return [];
    }
    var focusable = [];
    if (includeRoot && isElementFocusable(root)) {
      focusable.push(root);
    }
    if (typeof root.querySelectorAll !== 'function') {
      return focusable;
    }
    var nodes = root.querySelectorAll(FOCUSABLE_SELECTOR);
    for (var index = 0; index < nodes.length; index += 1) {
      var node = nodes[index];
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
    return elements.slice().sort(function (a, b) {
      if (!a || !b || a === b || typeof a.compareDocumentPosition !== 'function') {
        return 0;
      }
      var position = a.compareDocumentPosition(b);
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
    return Boolean(element && typeof element.nodeName === 'string' && element.nodeName.toLowerCase() === 'dialog');
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
    var target = event.target;
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
  var storedStateCache = null;
  var storedStateCacheRaw = null;
  var storedStateCacheSource = null;
  var deviceLibraryState = {
    lastAdded: null,
    lastReviewed: null,
    lastUpdated: null
  };
  var deviceLibrarySubscribers = [];
  function sanitizeDeviceDescriptor(detail) {
    if (!detail || _typeof(detail) !== 'object') {
      return null;
    }
    var name = typeof detail.name === 'string' ? detail.name.trim() : '';
    var category = typeof detail.category === 'string' ? detail.category.trim() : '';
    var subcategory = null;
    if (typeof detail.subcategory === 'string') {
      var trimmed = detail.subcategory.trim();
      if (trimmed) {
        subcategory = trimmed;
      }
    }
    if (!name || !category) {
      return null;
    }
    return {
      name: name,
      category: category,
      subcategory: subcategory
    };
  }
  function descriptorsMatch(a, b) {
    if (!a || !b) {
      return false;
    }
    var normalize = function normalize(value) {
      return typeof value === 'string' ? value.trim().toLowerCase() : '';
    };
    return normalize(a.name) === normalize(b.name) && normalize(a.category) === normalize(b.category) && normalize(a.subcategory || '') === normalize(b.subcategory || '');
  }
  function notifyDeviceLibrarySubscribers() {
    if (!deviceLibrarySubscribers.length) {
      return;
    }
    var snapshot = deviceLibrarySubscribers.slice();
    for (var index = 0; index < snapshot.length; index += 1) {
      var callback = snapshot[index];
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
      return function () {};
    }
    deviceLibrarySubscribers.push(callback);
    return function () {
      var position = deviceLibrarySubscribers.indexOf(callback);
      if (position !== -1) {
        deviceLibrarySubscribers.splice(position, 1);
      }
    };
  }
  if (DOCUMENT && typeof DOCUMENT.addEventListener === 'function') {
    DOCUMENT.addEventListener('device-library:add', function (event) {
      var descriptor = sanitizeDeviceDescriptor(event && event.detail);
      deviceLibraryState.lastAdded = descriptor;
      deviceLibraryState.lastReviewed = null;
      deviceLibraryState.lastUpdated = null;
      notifyDeviceLibrarySubscribers();
    });
    DOCUMENT.addEventListener('device-library:show-details', function (event) {
      var descriptor = sanitizeDeviceDescriptor(event && event.detail);
      deviceLibraryState.lastReviewed = descriptor;
      notifyDeviceLibrarySubscribers();
    });
    DOCUMENT.addEventListener('device-library:update', function (event) {
      var descriptor = sanitizeDeviceDescriptor(event && event.detail);
      var original = sanitizeDeviceDescriptor(event && event.detail && event.detail.original);
      if (!descriptor && !original) {
        deviceLibraryState.lastUpdated = null;
      } else {
        deviceLibraryState.lastUpdated = {
          current: descriptor,
          original: original
        };
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
  var DEFAULT_STEP_KEYS = ['intro', 'userProfile', 'unitsPreferences', 'nameProject', 'saveProject', 'addCamera', 'addMonitoring', 'selectBattery', 'resultsTotalDraw', 'resultsBatteryPacks', 'resultsChangeover', 'resultsWarnings', 'batteryComparison', 'runtimeFeedback', 'connectionDiagram', 'editDeviceDataAdd', 'editDeviceDataReview', 'editDeviceDataEdit', 'ownGearAccess', 'ownGearAddDevice', 'generateGearAndRequirements', 'autoGearRulesAccess', 'autoGearRulesEdit', 'autoGearRulesCreate', 'projectRequirements', 'gearList', 'exportImport', 'overviewAndPrint', 'help', 'settingsGeneral', 'settingsData', 'settingsBackup', 'completion'];
  var DEFAULT_STEP_TEXTS = {
    intro: {
      title: 'Welcome to Cine Power Planner',
      body: 'Step 1 introduces the guided tour and the safeguards that keep every project recoverable before the first shoot. Follow the prompts to learn how saves, backups and restores work without ever risking your offline data.',
      hero: {
        heading: 'Step 1 · Welcome aboard',
        subheading: 'Power planning without losing data',
        summary: 'Preview how Cine Power Planner protects work-in-progress before you add your first camera. The tour keeps progress local, explains every safety net and helps you confirm each safeguard.',
        badgeIcon: "\uE9C3",
        badgeLabel: 'Offline-first & private',
        badgeDescription: 'No servers, no accounts, no risk. Saves, autosaves, backups, restores, shares and imports never leave this device.',
        highlights: [{
          icon: "\uE1A6",
          title: 'Plan safe power loads',
          body: 'Model draw, runtime and changeovers to lock in battery safety margins with confidence.'
        }, {
          icon: "\uE467",
          title: 'AutoGear builds reusable kits',
          body: 'Assemble full gear lists, adjust automation rules on the fly and reuse presets across projects.'
        }, {
          icon: "\uE469",
          title: 'Safeguard and share with context',
          body: 'Capture deliverables, crew coverage and rental notes, then export PDFs and restore bundles crews can trust.'
        }],
        languageLabel: 'Choose your language',
        languageHint: 'Switch languages now—the tutorial, help and exports update instantly across offline saves.',
        offlineSummary: 'Install the Cine Power Planner PWA to mirror safeguarded saves, backups, shares and restore rehearsals on set without subscriptions.'
      }
    },
    userProfile: {
      title: 'Complete your crew profile',
      body: 'Set your display name, role, phone, email and photo. Every update syncs to Contacts immediately, stays in offline saves and appears on exports.'
    },
    unitsPreferences: {
      title: 'Tune theme and units',
      body: 'Open Settings → General to choose the theme, optional pink highlights, focus scale and temperature units. Request persistent storage so the browser keeps preferences and safeguards saves during cleanups.'
    },
    nameProject: {
      title: 'Name your first project',
      body: 'Give the project a descriptive name to anchor autosave, history, exports and backups. Every workflow references it so your offline library stays organized and easy to restore.'
    },
    saveProject: {
      title: 'Capture an immediate save',
      body: 'Select Save (or press Ctrl+S/⌘S/Enter) to capture a complete offline snapshot—devices, power math, requirements, notes and diagnostics. The next workflow unlocks once the save finishes.'
    },
    addCamera: {
      title: 'Select the primary camera',
      body: 'Choose the camera body you are planning. Offline search works inside the menu. That selection unlocks matching accessories, power draws and diagrams.'
    },
    addMonitoring: {
      title: 'Add monitors, wireless video and FIZ',
      body: 'Pick onboard monitors, wireless transmitters and FIZ motors or controllers. Each selection feeds runtime math, diagrams and automatic gear rules so the generated kit reflects the full build.'
    },
    selectBattery: {
      title: 'Choose batteries',
      body: 'Select the battery system that powers the rig. Runtime projections update immediately and the selection is stored with your offline project snapshots and backups.'
    },
    resultsTotalDraw: {
      title: 'Power Summary pass: Total draw',
      body: 'Start your Power Summary review by confirming the Total Draw card and peak load so the demand math stays accurate before moving on to deeper checks.'
    },
    resultsBatteryPacks: {
      title: 'Power Summary pass: Battery runtimes',
      body: 'Expand each battery pack to review runtime projections, reserve margin highlights and device notes while making sure autosave captures the latest selections for offline safety.'
    },
    resultsChangeover: {
      title: 'Power Summary pass: Changeovers',
      body: 'Continue through the changeover countdown timers to confirm charger coverage and status indicators so every handoff is organized in the saved snapshot.'
    },
    resultsWarnings: {
      title: 'Power Summary pass: Warnings and backups',
      body: 'Log any connector warnings when D-Tap or pins cannot handle the load, download the offline report for redundant backups and confirm the autosave banner so shares and exports mirror the same state.'
    },
    batteryComparison: {
      title: 'Compare battery options',
      body: 'Open Battery Comparison to evaluate alternate packs side by side. The chart keeps calculations offline so you can test scenarios and lock in the safest runtime margin for the day.'
    },
    runtimeFeedback: {
      title: 'Submit runtime feedback',
      body: 'Use the runtime feedback button to log real-world results. Entries sync with the current project, strengthen future estimates and remain available offline for audits.'
    },
    connectionDiagram: {
      title: 'Inspect the connection diagram',
      body: 'The interactive diagram shows how power, video and control gear connect. Drag nodes to plan rig layout, then save so the arrangement and annotations persist across exports and restores.'
    },
    editDeviceDataAdd: {
      title: 'Add a device to the library',
      body: 'Open Device Library, pick a category, name the item and record its draw or connector data. Press Add so the new device is stored offline, included in autosave and ready for backups and exports.'
    },
    editDeviceDataReview: {
      title: 'Review the device details',
      body: 'Find the device you just saved inside Existing Devices and open its details. Confirm the draw, outputs and compatibility metadata look correct before relying on it in runtime math or shares.'
    },
    editDeviceDataEdit: {
      title: 'Update and resave the device',
      body: 'Use the Edit button on that same entry, adjust specs or notes, then save. This verifies autosave, backups and exports all carry the most current numbers without risking any loss of user data.'
    },
    ownGearAccess: {
      title: 'Open the Own Gear dialog',
      body: 'Use the Own Gear button in the sidebar to open the inventory dialog whenever you need to review equipment you already control. Opening it yourself keeps the workflow familiar when the tutorial is finished.'
    },
    ownGearAddDevice: {
      title: 'Add your first owned device',
      body: 'Enter the item name, optional quantity and notes, then save. Owned gear is stored offline, included in backups and marked inside exports so teams instantly see what is available without duplicating requests.'
    },
    generateGearAndRequirements: {
      title: 'Generate requirements and gear list',
      body: 'Use Generate Gear List and Project Requirements to rebuild the checklist after every change. The planner saves the output with the project so PDFs, exports and backups always reflect the latest selections.'
    },
    autoGearRulesAccess: {
      title: 'Open Automatic Gear Rules',
      body: 'Go to Settings → Automatic Gear Rules to review automation controls. Opening the tab shows the presets, stock rules and safety backups stored with your offline saves.'
    },
    autoGearRulesEdit: {
      title: 'Edit stock automatic gear rules',
      body: 'Use the rules list to inspect factory additions. Select a stock rule to open it in the editor, adjust items or conditions, then save so the updated automation stays cached with backups and share bundles.'
    },
    autoGearRulesCreate: {
      title: 'Add a new automatic gear rule',
      body: 'Press Add rule to create a custom automation. Name it, add conditions and required gear, then save. The planner runs new rules offline each time you regenerate the kit and includes them in exports, shares and backups.'
    },
    projectRequirements: {
      title: 'Refine project requirements boxes',
      body: 'Adjust the Project Requirements output to capture crew notes, deliverables and safety reminders. Every box is saved with the project, prints with overviews and flows into exports. Work through three quick substeps so nothing is missed: 15A records the project brief—production company, rental preferences, schedule and delivery specs; 15B links crew rows to saved contacts while marking prep/shoot/return coverage and emergency notes; 15C captures logistics such as storage media, monitoring preferences and safety callouts, then regenerate the summary to confirm the new details appear.'
    },
    gearList: {
      title: 'Audit the generated gear list',
      body: 'Check the categorized gear list for duplicates, counts and auto-added accessories. Edits save instantly, are included in share bundles and appear in printouts and PDFs.'
    },
    exportImport: {
      title: 'Export and import projects',
      body: 'Use Export Project to download a JSON safety copy and Import Project to rehearse restores. Store exports on redundant media so no workstation loses data if a browser profile resets.'
    },
    overviewAndPrint: {
      title: 'Generate overview, PDF and printouts',
      body: 'Generate the project overview to access PDF, print and share-ready summaries. The dialog uses saved data only, so you can print or export even while fully offline.'
    },
    help: {
      title: 'Open the Help center',
      body: 'The Help dialog includes searchable documentation, translation notes and onboarding references. Keep it pinned while working—articles stay cached offline and update when new features arrive.'
    },
    settingsGeneral: {
      title: 'Revisit Settings → General',
      body: 'Adjust language, typography, theme, pink mode, focus scale and other presentation options anytime. Preferences save locally, sync across projects and are bundled with backups.'
    },
    settingsData: {
      title: 'Monitor Data & Storage',
      body: 'Use the Data & Storage tab to request persistent storage, watch save timestamps and launch quick safeguards. These controls verify that every project snapshot remains available offline.'
    },
    settingsBackup: {
      title: 'Maintain Backup & Restore',
      body: 'The Backup & Restore tab manages full-app exports, restore rehearsals and diagnostics. Run backups before major changes, archive the files on external media and verify restores regularly.'
    },
    completion: {
      title: 'Tutorial complete',
      body: 'You now know every safeguard. Keep saving often, export redundant backups and revisit any step from Help whenever you want a refresher. Cine Power Planner will keep protecting your data offline.'
    }
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
    var total = 0;
    for (var index = 0; index < stepList.length; index += 1) {
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
    var position = -1;
    for (var pointer = 0; pointer <= index; pointer += 1) {
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
    var count = 0;
    for (var index = 0; index < stepList.length; index += 1) {
      var step = stepList[index];
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
    for (var index = 0; index < stepList.length; index += 1) {
      var step = stepList[index];
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
  function createAnyFieldCompletionRequirement(selectors, predicate, events) {
    var normalizedSelectors = Array.isArray(selectors) ? selectors.slice() : [selectors];
    var eventList = Array.isArray(events) && events.length ? events : ['change', 'input'];
    var evaluator = typeof predicate === 'function' ? predicate : function (value) {
      return Boolean(value && value !== 'None');
    };
    return {
      check: function check() {
        var elementFound = false;
        for (var index = 0; index < normalizedSelectors.length; index += 1) {
          var selector = normalizedSelectors[index];
          if (!selector) {
            continue;
          }
          var element = getElement(selector);
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
      attach: function attach(context) {
        var removers = [];
        var elementFound = false;
        var evaluate = function evaluate() {
          var matches = false;
          for (var index = 0; index < normalizedSelectors.length; index += 1) {
            var selector = normalizedSelectors[index];
            if (!selector) {
              continue;
            }
            var element = getElement(selector);
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
        var _loop = function _loop() {
            var selector = normalizedSelectors[index];
            if (!selector) {
              return 0;
            }
            var element = getElement(selector);
            if (!element) {
              return 0;
            }
            elementFound = true;
            var handler = function handler() {
              evaluate();
            };
            var _loop2 = function _loop2() {
              var eventName = eventList[eventIndex];
              element.addEventListener(eventName, handler);
              removers.push(function () {
                element.removeEventListener(eventName, handler);
              });
            };
            for (var eventIndex = 0; eventIndex < eventList.length; eventIndex += 1) {
              _loop2();
            }
          },
          _ret;
        for (var index = 0; index < normalizedSelectors.length; index += 1) {
          _ret = _loop();
          if (_ret === 0) continue;
        }
        evaluate();
        return function () {
          for (var _index2 = 0; _index2 < removers.length; _index2 += 1) {
            try {
              removers[_index2]();
            } catch (error) {
              safeWarn('cine.features.onboardingTour could not detach multi-field requirement.', error);
            }
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
        var _loop3 = function _loop3() {
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
          if (_loop3()) continue;
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
          for (var _index3 = 0; _index3 < removers.length; _index3 += 1) {
            try {
              removers[_index3]();
            } catch (error) {
              safeWarn('cine.features.onboardingTour could not detach click requirement.', error);
            }
          }
        };
      }
    };
  }
  function createDeviceLibraryRequirement(checker) {
    var evaluate = typeof checker === 'function' ? checker : function () {
      return false;
    };
    return {
      check: function check() {
        try {
          return Boolean(evaluate());
        } catch (error) {
          safeWarn('cine.features.onboardingTour could not evaluate device library requirement.', error);
          return false;
        }
      },
      attach: function attach(context) {
        var handler = function handler() {
          var matches = false;
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
        var unsubscribe = subscribeDeviceLibrary(handler);
        handler();
        return function () {
          if (typeof unsubscribe === 'function') {
            unsubscribe();
          }
        };
      }
    };
  }
  function createDeviceLibraryAddRequirement() {
    return createDeviceLibraryRequirement(function () {
      return Boolean(deviceLibraryState.lastAdded);
    });
  }
  function createDeviceLibraryReviewRequirement() {
    return createDeviceLibraryRequirement(function () {
      var added = deviceLibraryState.lastAdded;
      var reviewed = deviceLibraryState.lastReviewed;
      if (!added || !reviewed) {
        return false;
      }
      return descriptorsMatch(added, reviewed);
    });
  }
  function createDeviceLibraryEditRequirement() {
    return createDeviceLibraryRequirement(function () {
      var added = deviceLibraryState.lastAdded;
      var updated = deviceLibraryState.lastUpdated;
      if (!added || !updated) {
        return false;
      }
      var currentMatch = updated.current ? descriptorsMatch(added, updated.current) : false;
      var originalMatch = updated.original ? descriptorsMatch(added, updated.original) : false;
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
      check: function check() {
        return evaluateOwnGearOpenState();
      },
      attach: function attach(_ref) {
        var complete = _ref.complete,
          incomplete = _ref.incomplete;
        var dialog = getElement('#ownGearDialog');
        if (!dialog) {
          return null;
        }
        var observer = null;
        var evaluate = function evaluate() {
          if (evaluateOwnGearOpenState()) {
            complete();
          } else {
            incomplete();
          }
        };
        evaluate();
        if (typeof MutationObserver === 'function') {
          try {
            observer = new MutationObserver(function () {
              evaluate();
            });
            observer.observe(dialog, {
              attributes: true,
              attributeFilter: ['open', 'hidden', 'aria-hidden']
            });
          } catch (error) {
            safeWarn('cine.features.onboardingTour could not observe Own Gear dialog attributes.', error);
            observer = null;
          }
        }
        var handleDialogEvent = function handleDialogEvent() {
          evaluate();
        };
        dialog.addEventListener('close', handleDialogEvent);
        dialog.addEventListener('cancel', handleDialogEvent);
        var trigger = getElement('[data-sidebar-action="open-own-gear"]');
        var handleTriggerClick = function handleTriggerClick() {
          setTimeout(evaluate, 100);
        };
        if (trigger) {
          trigger.addEventListener('click', handleTriggerClick);
        }
        return function () {
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
      }
    };
  }
  function hasOwnGearListEntries() {
    var list = getElement('#ownGearList');
    if (list && typeof list.querySelector === 'function') {
      var item = list.querySelector('.own-gear-item');
      if (item) {
        return true;
      }
    }
    var emptyState = getElement('#ownGearEmptyState');
    if (emptyState && emptyState.hasAttribute('hidden')) {
      return true;
    }
    return false;
  }
  function createOwnGearItemRequirement() {
    return {
      check: function check() {
        return hasOwnGearListEntries();
      },
      attach: function attach(_ref2) {
        var complete = _ref2.complete,
          incomplete = _ref2.incomplete;
        var list = getElement('#ownGearList');
        var emptyState = getElement('#ownGearEmptyState');
        var evaluate = function evaluate() {
          if (hasOwnGearListEntries()) {
            complete();
          } else {
            incomplete();
          }
        };
        evaluate();
        var listObserver = null;
        if (list && typeof MutationObserver === 'function') {
          try {
            listObserver = new MutationObserver(function () {
              evaluate();
            });
            listObserver.observe(list, {
              childList: true
            });
          } catch (error) {
            safeWarn('cine.features.onboardingTour could not observe Own Gear list changes.', error);
            listObserver = null;
          }
        }
        var handleListEvent = function handleListEvent() {
          evaluate();
        };
        if (list) {
          list.addEventListener('click', handleListEvent, true);
        }
        var form = getElement('#ownGearForm');
        var handleFormSubmit = function handleFormSubmit() {
          setTimeout(evaluate, 50);
        };
        if (form && typeof form.addEventListener === 'function') {
          form.addEventListener('submit', handleFormSubmit);
        }
        var saveButton = getElement('#ownGearSaveButton');
        var handleSaveClick = function handleSaveClick() {
          setTimeout(evaluate, 50);
        };
        if (saveButton && typeof saveButton.addEventListener === 'function') {
          saveButton.addEventListener('click', handleSaveClick);
        }
        var emptyObserver = null;
        if (emptyState && typeof MutationObserver === 'function') {
          try {
            emptyObserver = new MutationObserver(function () {
              evaluate();
            });
            emptyObserver.observe(emptyState, {
              attributes: true,
              attributeFilter: ['hidden', 'aria-hidden']
            });
          } catch (error) {
            safeWarn('cine.features.onboardingTour could not observe Own Gear empty state.', error);
            emptyObserver = null;
          }
        }
        return function () {
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
    addMonitoring: createAnyFieldCompletionRequirement(['#monitorSelect', '#videoSelect', '#motor1Select', '#controller1Select'], function (value, element) {
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
    }, ['change']),
    selectBattery: createFieldCompletionRequirement('#batterySelect', function (value) {
      return value && value !== 'None';
    }, ['change']),
    editDeviceDataAdd: createDeviceLibraryAddRequirement(),
    editDeviceDataReview: createDeviceLibraryReviewRequirement(),
    editDeviceDataEdit: createDeviceLibraryEditRequirement(),
    ownGearAccess: createOwnGearOpenRequirement(),
    ownGearAddDevice: createOwnGearItemRequirement(),
    generateGearAndRequirements: createClickCompletionRequirement('#generateGearListBtn'),
    exportImport: createClickCompletionRequirement(['#shareSetupBtn', '#applySharedLinkBtn']),
    overviewAndPrint: createClickCompletionRequirement('#generateOverviewBtn')
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
  function updateStoredStateCache(nextState, rawValue, source) {
    storedStateCache = nextState;
    storedStateCacheRaw = typeof rawValue === 'string' ? rawValue : rawValue || null;
    storedStateCacheSource = source || storedStateCacheSource || null;
  }
  function loadStoredState() {
    if (!SAFE_STORAGE || typeof SAFE_STORAGE.getItem !== 'function') {
      if (storedStateCache && storedStateCacheSource === 'memory') {
        return storedStateCache;
      }
      var fallbackState = normalizeStateSnapshot({
        version: STORAGE_VERSION
      });
      updateStoredStateCache(fallbackState, null, 'memory');
      return fallbackState;
    }
    var raw = null;
    try {
      raw = SAFE_STORAGE.getItem(STORAGE_KEY);
    } catch (error) {
      safeWarn('cine.features.onboardingTour could not read onboarding state.', error);
      if (storedStateCache) {
        return storedStateCache;
      }
      raw = null;
    }
    if (typeof raw !== 'string' || !raw) {
      var _fallbackState = normalizeStateSnapshot({
        version: STORAGE_VERSION
      });
      updateStoredStateCache(_fallbackState, raw, 'storage');
      return _fallbackState;
    }
    if (storedStateCache && storedStateCacheSource === 'storage' && raw === storedStateCacheRaw) {
      return storedStateCache;
    }
    try {
      var parsed = JSON.parse(raw);
      if (!parsed || _typeof(parsed) !== 'object') {
        var emptyState = normalizeStateSnapshot({
          version: STORAGE_VERSION
        });
        updateStoredStateCache(emptyState, raw, 'storage');
        return emptyState;
      }
      if (parsed.version !== STORAGE_VERSION) {
        var migratedState = normalizeStateSnapshot(_objectSpread(_objectSpread({}, parsed), {}, {
          version: STORAGE_VERSION,
          completed: false,
          skipped: false
        }));
        updateStoredStateCache(migratedState, raw, 'storage');
        return migratedState;
      }
      var normalized = normalizeStateSnapshot(parsed);
      updateStoredStateCache(normalized, raw, 'storage');
      return normalized;
    } catch (error) {
      safeWarn('cine.features.onboardingTour could not parse onboarding state.', error);
      var _fallbackState2 = normalizeStateSnapshot({
        version: STORAGE_VERSION
      });
      updateStoredStateCache(_fallbackState2, raw, 'storage');
      return _fallbackState2;
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
    var serialized = JSON.stringify(payload);
    try {
      SAFE_STORAGE.setItem(STORAGE_KEY, serialized);
      updateStoredStateCache(payload, serialized, 'storage');
      return payload;
    } catch (error) {
      safeWarn('cine.features.onboardingTour could not persist onboarding state.', error);
      updateStoredStateCache(sanitized, null, 'memory');
      return sanitized;
    }
  }
  var storedState = loadStoredState();
  function normalizeLanguageCandidate(rawValue, availableTexts) {
    if (!rawValue || typeof rawValue !== 'string' && typeof rawValue !== 'number') {
      return null;
    }
    var textMap = availableTexts && _typeof(availableTexts) === 'object' ? availableTexts : {};
    var trimmed = String(rawValue).trim();
    if (!trimmed) {
      return null;
    }
    if (Object.prototype.hasOwnProperty.call(textMap, trimmed)) {
      return trimmed;
    }
    var lower = trimmed.toLowerCase();
    if (Object.prototype.hasOwnProperty.call(textMap, lower)) {
      return lower;
    }
    var base = lower.split(/[-_]/)[0];
    if (base && Object.prototype.hasOwnProperty.call(textMap, base)) {
      return base;
    }
    return null;
  }
  function resolveLanguage() {
    var availableTexts = GLOBAL_SCOPE && GLOBAL_SCOPE.texts && _typeof(GLOBAL_SCOPE.texts) === 'object' ? GLOBAL_SCOPE.texts : {};
    var defaultLang = Object.prototype.hasOwnProperty.call(availableTexts, 'en') ? 'en' : Object.keys(availableTexts)[0] || 'en';
    var seen = new Set();
    var candidates = [];
    var pushCandidate = function pushCandidate(value) {
      var normalized = normalizeLanguageCandidate(value, availableTexts);
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
      var headerLanguage = DOCUMENT.getElementById('languageSelect');
      if (headerLanguage && typeof headerLanguage.value === 'string') {
        pushCandidate(headerLanguage.value);
      }
      var settingsLanguage = DOCUMENT.getElementById('settingsLanguage');
      if (settingsLanguage && typeof settingsLanguage.value === 'string') {
        pushCandidate(settingsLanguage.value);
      }
    }
    try {
      if (GLOBAL_SCOPE && GLOBAL_SCOPE.localStorage && typeof GLOBAL_SCOPE.localStorage.getItem === 'function') {
        pushCandidate(GLOBAL_SCOPE.localStorage.getItem('language'));
      }
    } catch (error) {
      void error;
    }
    try {
      var navigatorObject = GLOBAL_SCOPE && GLOBAL_SCOPE.navigator ? GLOBAL_SCOPE.navigator : null;
      if (navigatorObject) {
        if (Array.isArray(navigatorObject.languages)) {
          for (var index = 0; index < navigatorObject.languages.length; index += 1) {
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
    for (var _index4 = 0; _index4 < candidates.length; _index4 += 1) {
      var candidate = candidates[_index4];
      if (candidate && Object.prototype.hasOwnProperty.call(availableTexts, candidate)) {
        return candidate;
      }
    }
    return defaultLang;
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
      var resolvedEntry = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, defaultEntry && _typeof(defaultEntry) === 'object' ? defaultEntry : {}), fallbackEntry && _typeof(fallbackEntry) === 'object' ? fallbackEntry : {}), localEntry && _typeof(localEntry) === 'object' ? localEntry : {}), {}, {
        title: resolvedTitle,
        body: resolvedBody
      });
      steps[key] = resolvedEntry;
    }
    var prefaceIndicatorText = function () {
      var localizedValue = localized && typeof localized.prefaceIndicator === 'string' ? localized.prefaceIndicator.trim() : '';
      if (localizedValue) {
        return localizedValue;
      }
      var fallbackValue = fallback && typeof fallback.prefaceIndicator === 'string' ? fallback.prefaceIndicator.trim() : '';
      if (fallbackValue) {
        return fallbackValue;
      }
      return 'Preface';
    }();
    return _objectSpread(_objectSpread(_objectSpread({}, fallback), localized), {}, {
      prefaceIndicator: prefaceIndicatorText,
      steps: steps
    });
  }
  var tourTexts = resolveTourTexts();
  function createStepConfig() {
    return [{
      key: 'intro',
      highlight: null,
      preface: true,
      size: 'hero'
    }, {
      key: 'userProfile',
      highlight: null,
      forceFloating: true,
      size: 'large'
    }, {
      key: 'unitsPreferences',
      highlight: null,
      forceFloating: true,
      ensureSettings: {
        tabId: 'settingsTab-general',
        autoOpen: false
      },
      size: 'large'
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
      key: 'addMonitoring',
      highlight: ['#monitorSelectRow', '#wirelessVideoRow', '#fizFieldset'],
      focus: '#monitorSelect'
    }, {
      key: 'selectBattery',
      highlight: '#batterySelect',
      cardOverlap: {
        right: 1 / 3
      }
    }, {
      key: 'resultsTotalDraw',
      highlight: ['#powerDiagram', '#totalPowerLabel', '#totalPower', '#totalCurrent144Label', '#totalCurrent12Label']
    }, {
      key: 'resultsBatteryPacks',
      highlight: ['#batteryLifeLabel', '#batteryLife', '#batteryCountLabel', '#batteryCount']
    }, {
      key: 'resultsChangeover',
      highlight: '#breakdownList'
    }, {
      key: 'resultsWarnings',
      highlight: ['#pinWarning', '#dtapWarning', '#hotswapWarning']
    }, {
      key: 'batteryComparison',
      highlight: '#batteryComparison'
    }, {
      key: 'runtimeFeedback',
      highlight: '#runtimeFeedbackBtn'
    }, {
      key: 'connectionDiagram',
      highlight: '#diagramArea'
    }, {
      key: 'editDeviceDataAdd',
      highlight: ['#toggleDeviceManager', '#addDeviceHeading', '#addDeviceBtn'],
      focus: '#newName',
      ensureDeviceManager: true
    }, {
      key: 'editDeviceDataReview',
      highlight: '#deviceListContainer',
      focus: '#deviceListContainer .detail-toggle',
      ensureDeviceManager: true
    }, {
      key: 'editDeviceDataEdit',
      highlight: '#deviceListContainer',
      focus: '#deviceListContainer .edit-btn',
      ensureDeviceManager: true
    }, {
      key: 'ownGearAccess',
      highlight: '[data-sidebar-action="open-own-gear"]',
      focus: '[data-sidebar-action="open-own-gear"]'
    }, {
      key: 'ownGearAddDevice',
      highlight: '#ownGearDialog',
      ensureOwnGear: true,
      focus: '#ownGearName'
    }, {
      key: 'generateGearAndRequirements',
      highlight: '#generateGearListBtn'
    }, {
      key: 'autoGearRulesAccess',
      highlight: '#settingsPanel-autoGear',
      ensureSettings: {
        tabId: 'settingsTab-autoGear'
      }
    }, {
      key: 'autoGearRulesEdit',
      highlight: '#autoGearRulesList',
      ensureSettings: {
        tabId: 'settingsTab-autoGear'
      }
    }, {
      key: 'autoGearRulesCreate',
      highlight: '#autoGearAddRule',
      ensureSettings: {
        tabId: 'settingsTab-autoGear'
      },
      focus: '#autoGearAddRule'
    }, {
      key: 'projectRequirements',
      highlight: '#projectRequirementsOutput'
    }, {
      key: 'gearList',
      highlight: '#gearListOutput'
    }, {
      key: 'exportImport',
      highlight: '#shareSetupBtn',
      alternateHighlight: '#applySharedLinkBtn'
    }, {
      key: 'overviewAndPrint',
      highlight: '#generateOverviewBtn'
    }, {
      key: 'help',
      highlight: '#helpButton',
      focus: '#helpButton'
    }, {
      key: 'settingsGeneral',
      highlight: '#settingsPanel-general',
      ensureSettings: {
        tabId: 'settingsTab-general'
      }
    }, {
      key: 'settingsData',
      highlight: '#settingsPanel-data',
      ensureSettings: {
        tabId: 'settingsTab-data'
      }
    }, {
      key: 'settingsBackup',
      highlight: '#settingsPanel-backup',
      ensureSettings: {
        tabId: 'settingsTab-backup'
      }
    }, {
      key: 'completion',
      highlight: null
    }];
  }
  var STEP_CONFIG = function initializeStepConfig() {
    var config = createStepConfig();
    if (typeof MODULE_BASE.freezeDeep === 'function') {
      try {
        return MODULE_BASE.freezeDeep(config);
      } catch (error) {
        safeWarn('cine.features.onboardingTour could not freeze step config.', error);
      }
    }
    if (typeof Object.freeze === 'function') {
      try {
        return Object.freeze(config);
      } catch (error) {
        void error;
      }
    }
    return config;
  }();
  function getStepConfig() {
    return STEP_CONFIG;
  }
  var stepConfig = getStepConfig();
  var overlayRoot = null;
  var overlayAnchor = null;
  var highlightEl = null;
  var activeTargetElements = [];
  var keyboardListenerAttached = false;
  var cardEl = null;
  var titleEl = null;
  var bodyEl = null;
  var progressEl = null;
  var progressMeterEl = null;
  var progressMeterFillEl = null;
  var cardContentEl = null;
  var cardHeaderEl = null;
  var cardActionsEl = null;
  var stepListContainerEl = null;
  var stepListEl = null;
  var resumeHintEl = null;
  var interactionContainerEl = null;
  var helpStatusEl = null;
  var helpButtonsCache = null;
  var helpButtonsObserver = null;
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
  var autoOpenedContacts = false;
  var contactsDialogRef = null;
  var autoOpenedOwnGear = false;
  var ownGearDialogRef = null;
  var autoOpenedDeviceManager = false;
  var deviceManagerSectionRef = null;
  var deviceManagerToggleRef = null;
  var resumeHintVisible = false;
  var resumeStartIndex = null;
  var activeRequirementCleanup = null;
  var activeRequirementCompleted = false;
  var activeInteractionCleanup = null;
  var lastCardPlacement = 'floating';
  var proxyControlId = 0;
  function getProxyControlId(prefix) {
    proxyControlId += 1;
    return "onboarding-".concat(prefix, "-").concat(proxyControlId);
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
  function getOverlayMetrics() {
    var fallbackWidth = GLOBAL_SCOPE && typeof GLOBAL_SCOPE.innerWidth === 'number' ? GLOBAL_SCOPE.innerWidth : DOCUMENT && DOCUMENT.documentElement && DOCUMENT.documentElement.clientWidth || 0;
    var fallbackHeight = GLOBAL_SCOPE && typeof GLOBAL_SCOPE.innerHeight === 'number' ? GLOBAL_SCOPE.innerHeight : DOCUMENT && DOCUMENT.documentElement && DOCUMENT.documentElement.clientHeight || 0;
    if (!overlayRoot || typeof overlayRoot.getBoundingClientRect !== 'function') {
      return {
        offsetLeft: 0,
        offsetTop: 0,
        viewportWidth: fallbackWidth,
        viewportHeight: fallbackHeight
      };
    }
    var rect = overlayRoot.getBoundingClientRect();
    var width = rect && typeof rect.width === 'number' && rect.width > 0 ? rect.width : fallbackWidth;
    var height = rect && typeof rect.height === 'number' && rect.height > 0 ? rect.height : fallbackHeight;
    return {
      offsetLeft: -rect.left,
      offsetTop: -rect.top,
      viewportWidth: width,
      viewportHeight: height
    };
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
    var header = DOCUMENT.createElement('div');
    header.className = 'onboarding-card-header';
    cardEl.appendChild(header);
    cardHeaderEl = header;
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
    var actions = DOCUMENT.createElement('div');
    actions.className = 'onboarding-card-actions';
    cardEl.appendChild(actions);
    cardActionsEl = actions;
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
    overlayAnchor = DOCUMENT.body;
    bringOverlayToTopLayer();
    attachKeyboardListener();
  }
  function teardownOverlayElements() {
    clearFrame();
    clearActiveTargetElements();
    clearScrollState();
    detachKeyboardListener();
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
    cardHeaderEl = null;
    cardActionsEl = null;
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
  function attachKeyboardListener() {
    if (!DOCUMENT || keyboardListenerAttached) {
      return;
    }
    DOCUMENT.addEventListener('keydown', handleOverlayKeydown, true);
    keyboardListenerAttached = true;
  }
  function detachKeyboardListener() {
    if (!DOCUMENT || !keyboardListenerAttached) {
      return;
    }
    DOCUMENT.removeEventListener('keydown', handleOverlayKeydown, true);
    keyboardListenerAttached = false;
  }
  function formatStepIndicator(position, total) {
    var template = typeof tourTexts.stepIndicator === 'string' ? tourTexts.stepIndicator : 'Step {current} of {total}';
    var currentIndex = typeof position === 'number' ? position : -1;
    var totalSteps = typeof total === 'number' && total > 0 ? total : 0;
    var currentValue = currentIndex >= 0 ? currentIndex + 1 : 0;
    return template.replace('{current}', String(currentValue)).replace('{total}', String(totalSteps));
  }
  function formatPrefaceIndicator() {
    if (tourTexts && typeof tourTexts.prefaceIndicator === 'string' && tourTexts.prefaceIndicator.trim()) {
      return tourTexts.prefaceIndicator.trim();
    }
    return 'Preface';
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
  function toSelectorArray(value) {
    if (typeof value === 'string') {
      return value ? [value] : [];
    }
    if (Array.isArray(value)) {
      var selectors = [];
      for (var index = 0; index < value.length; index += 1) {
        var entry = value[index];
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
    var elements = [];
    for (var index = 0; index < selectors.length; index += 1) {
      var selector = selectors[index];
      if (!selector) {
        continue;
      }
      var element = DOCUMENT.querySelector(selector);
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
    var elements = resolveSelectorElements(toSelectorArray(step.highlight));
    if (elements.length === 0) {
      elements = resolveSelectorElements(toSelectorArray(step.alternateHighlight));
    }
    return elements;
  }
  function resolveOverlayAnchorForElements(elements) {
    if (!DOCUMENT) {
      return null;
    }
    var list = Array.isArray(elements) ? elements : [];
    var main = DOCUMENT.getElementById(MAIN_ANCHOR_ID);
    var header = DOCUMENT.getElementById(HEADER_ANCHOR_ID);
    for (var index = 0; index < list.length; index += 1) {
      var element = list[index];
      if (!element) {
        continue;
      }
      if (typeof element.closest === 'function') {
        var flaggedAnchor = element.closest('[data-onboarding-anchor]');
        if (flaggedAnchor) {
          return flaggedAnchor;
        }
        var dialogAnchor = element.closest('dialog');
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
    var target = anchorElement || DOCUMENT.body;
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
    var wantsTopLayer = target === DOCUMENT.body;
    var isDialogRoot = supportsDialogTopLayer && isDialogElement(overlayRoot);
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
    if (step.ensureSettings && step.ensureSettings.autoOpen !== false && (!settingsDialogRef || !isSettingsDialogVisible())) {
      return null;
    }
    var elements = getHighlightElements(step);
    return elements.length > 0 ? elements[0] : null;
  }
  function clearActiveTargetElements() {
    if (!Array.isArray(activeTargetElements)) {
      activeTargetElements = [];
      return;
    }
    for (var index = 0; index < activeTargetElements.length; index += 1) {
      var element = activeTargetElements[index];
      if (element && element.classList && typeof element.classList.remove === 'function') {
        element.classList.remove('onboarding-active-target');
      }
    }
    activeTargetElements = [];
  }
  function updateHighlightPosition() {
    if (!highlightEl) {
      return;
    }
    var highlightElements = getHighlightElements(currentStep);
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
    for (var index = 0; index < highlightElements.length; index += 1) {
      var element = highlightElements[index];
      if (!element) {
        continue;
      }
      if (element.classList && typeof element.classList.add === 'function') {
        element.classList.add('onboarding-active-target');
      }
      activeTargetElements.push(element);
    }
    var combinedRect = highlightElements.reduce(function (acc, element) {
      if (!element || typeof element.getBoundingClientRect !== 'function') {
        return acc;
      }
      var rect = element.getBoundingClientRect();
      if (!acc) {
        return {
          top: rect.top,
          right: rect.right,
          bottom: rect.bottom,
          left: rect.left
        };
      }
      return {
        top: Math.min(acc.top, rect.top),
        right: Math.max(acc.right, rect.right),
        bottom: Math.max(acc.bottom, rect.bottom),
        left: Math.min(acc.left, rect.left)
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
    var padding = 12;
    var width = Math.max(0, combinedRect.width + padding * 2);
    var height = Math.max(0, combinedRect.height + padding * 2);
    var _getOverlayMetrics = getOverlayMetrics(),
      offsetLeft = _getOverlayMetrics.offsetLeft,
      offsetTop = _getOverlayMetrics.offsetTop;
    var left = combinedRect.left + offsetLeft - padding;
    var top = combinedRect.top + offsetTop - padding;
    highlightEl.style.width = "".concat(width, "px");
    highlightEl.style.height = "".concat(height, "px");
    highlightEl.style.transform = "translate(".concat(Math.max(0, left), "px, ").concat(Math.max(0, top), "px)");
    highlightEl.style.opacity = '1';
    positionCard(highlightElements[0] || null, combinedRect);
  }
  function positionCard(target, targetRect) {
    if (!cardEl) {
      return;
    }
    var _getOverlayMetrics2 = getOverlayMetrics(),
      scrollX = _getOverlayMetrics2.offsetLeft,
      scrollY = _getOverlayMetrics2.offsetTop,
      viewportWidth = _getOverlayMetrics2.viewportWidth,
      viewportHeight = _getOverlayMetrics2.viewportHeight;
    var targetElement = target || getTargetElement(currentStep);
    var resolvedRect = targetRect || (targetElement ? targetElement.getBoundingClientRect() : null);
    var forceFloating = Boolean(currentStep && currentStep.forceFloating);
    var cardRect = cardEl.getBoundingClientRect();
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
    if (!forceFloating && targetElement && resolvedRect) {
      var rect = resolvedRect;
      var targetTop = rect.top + scrollY;
      var targetLeft = rect.left + scrollX;
      var targetCenterX = targetLeft + rect.width / 2;
      var targetCenterY = targetTop + rect.height / 2;
      var overlapConfig = currentStep && currentStep.cardOverlap ? currentStep.cardOverlap : null;
      var clampOverlap = function clampOverlap(value) {
        if (typeof value !== 'number' || Number.isNaN(value)) {
          return 0;
        }
        return Math.min(Math.max(value, 0), 0.95);
      };
      var overlapTopFraction = overlapConfig ? clampOverlap(overlapConfig.top) : 0;
      var overlapRightFraction = overlapConfig ? clampOverlap(overlapConfig.right) : 0;
      var overlapBottomFraction = overlapConfig ? clampOverlap(overlapConfig.bottom) : 0;
      var overlapLeftFraction = overlapConfig ? clampOverlap(overlapConfig.left) : 0;
      var topOverlapOffset = rect.height * overlapTopFraction;
      var rightOverlapOffset = rect.width * overlapRightFraction;
      var bottomOverlapOffset = rect.height * overlapBottomFraction;
      var leftOverlapOffset = rect.width * overlapLeftFraction;
      var topMarginOffset = overlapTopFraction > 0 ? margin : 0;
      var rightMarginOffset = overlapRightFraction > 0 ? margin : 0;
      var bottomMarginOffset = overlapBottomFraction > 0 ? margin : 0;
      var leftMarginOffset = overlapLeftFraction > 0 ? margin : 0;
      var options = [{
        name: 'bottom',
        top: targetTop + rect.height + margin - bottomOverlapOffset - bottomMarginOffset,
        left: targetCenterX - cardRect.width / 2,
        fits: targetTop + rect.height + margin + cardRect.height - bottomOverlapOffset - bottomMarginOffset <= viewportBottom - margin
      }, {
        name: 'top',
        top: targetTop - cardRect.height - margin + topOverlapOffset + topMarginOffset,
        left: targetCenterX - cardRect.width / 2,
        fits: targetTop - cardRect.height - margin + topOverlapOffset + topMarginOffset >= minTop
      }, {
        name: 'right',
        top: targetCenterY - cardRect.height / 2,
        left: targetLeft + rect.width + margin - rightOverlapOffset - rightMarginOffset,
        fits: targetLeft + rect.width + margin + cardRect.width - rightOverlapOffset - rightMarginOffset <= viewportRight - margin
      }, {
        name: 'left',
        top: targetCenterY - cardRect.height / 2,
        left: targetLeft - cardRect.width - margin + leftOverlapOffset + leftMarginOffset,
        fits: targetLeft - cardRect.width - margin + leftOverlapOffset + leftMarginOffset >= minLeft
      }];
      var resolvedOptions = options.map(function (option) {
        var clampedTop = Math.min(Math.max(option.top, minTop), maxTop);
        var clampedLeft = Math.min(Math.max(option.left, minLeft), maxLeft);
        var overflow = Math.abs(clampedTop - option.top) + Math.abs(clampedLeft - option.left);
        return _objectSpread(_objectSpread({}, option), {}, {
          clampedTop: clampedTop,
          clampedLeft: clampedLeft,
          overflow: overflow
        });
      });
      var chosen = resolvedOptions.find(function (option) {
        return option.fits;
      });
      if (!chosen) {
        chosen = resolvedOptions.reduce(function (best, option) {
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
    cardEl.style.top = "".concat(Math.min(Math.max(top, minTop), maxTop), "px");
    cardEl.style.left = "".concat(Math.min(Math.max(left, minLeft), maxLeft), "px");
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
    var shouldAutoOpen = step.ensureSettings.autoOpen !== false;
    var wasOpen = typeof isDialogOpen === 'function' ? isDialogOpen(dialog) : !dialog.hasAttribute('hidden');
    settingsDialogRef = dialog;
    if (!wasOpen && shouldAutoOpen) {
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
  function ensureContactsForStep(step) {
    if (!step || !step.ensureContacts) {
      return;
    }
    if (!contactsDialogRef) {
      contactsDialogRef = DOCUMENT.getElementById('contactsDialog');
    }
    var dialog = contactsDialogRef;
    if (!dialog) {
      return;
    }
    var isVisible = isContactsDialogVisible();
    if (isVisible) {
      return;
    }
    autoOpenedContacts = true;
    var openButton = DOCUMENT.getElementById('openContactsBtn') || DOCUMENT.querySelector('[data-sidebar-action="open-contacts"]');
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
    var dialog = ownGearDialogRef;
    if (!dialog) {
      return;
    }
    if (isOwnGearDialogVisible()) {
      return;
    }
    autoOpenedOwnGear = true;
    var trigger = DOCUMENT.querySelector('[data-sidebar-action="open-own-gear"]');
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
    var showDeviceManager = GLOBAL_SCOPE && typeof GLOBAL_SCOPE.showDeviceManagerSection === 'function' ? GLOBAL_SCOPE.showDeviceManagerSection : null;
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
      var hideDeviceManager = GLOBAL_SCOPE && typeof GLOBAL_SCOPE.hideDeviceManagerSection === 'function' ? GLOBAL_SCOPE.hideDeviceManagerSection : null;
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
    var totalSteps = getCountableStepTotal(stepConfig);
    var completedRaw = storedState && Array.isArray(storedState.completedSteps) ? storedState.completedSteps : [];
    var completedSet = new Set(completedRaw);
    var completedCount = getCountableCompletedCount(stepConfig, completedSet);
    var countableIndex = getCountableStepIndex(stepConfig, index);
    if (countableIndex === null) {
      var fallbackHint = tourTexts.resumeHint || '';
      if (!fallbackHint) {
        resumeHintEl.hidden = true;
        resumeHintEl.textContent = '';
        return;
      }
      resumeHintEl.hidden = false;
      resumeHintEl.textContent = fallbackHint;
      return;
    }
    var template = tourTexts.resumeHintDetailed || tourTexts.resumeHint || 'Resuming where you left off.';
    var hint = template.replace('{current}', String(countableIndex + 1)).replace('{total}', String(totalSteps)).replace('{completed}', String(Math.min(completedCount, totalSteps)));
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
      if (index < 3) {
        item.classList.add('onboarding-step-item--pinned');
        if (item && item.style && typeof item.style.setProperty === 'function') {
          item.style.setProperty('--onboarding-step-pinned-index', String(index));
        }
      }
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
  function focusHighlightedElement(step) {
    if (!step) {
      return false;
    }
    var selectors = [];
    var focusSelectors = toSelectorArray(step.focus);
    for (var index = 0; index < focusSelectors.length; index += 1) {
      var selector = focusSelectors[index];
      if (selectors.indexOf(selector) === -1) {
        selectors.push(selector);
      }
    }
    var highlightSelectors = toSelectorArray(step.highlight);
    for (var _index5 = 0; _index5 < highlightSelectors.length; _index5 += 1) {
      var _selector = highlightSelectors[_index5];
      if (selectors.indexOf(_selector) === -1) {
        selectors.push(_selector);
      }
    }
    var alternateSelectors = toSelectorArray(step.alternateHighlight);
    for (var _index6 = 0; _index6 < alternateSelectors.length; _index6 += 1) {
      var _selector2 = alternateSelectors[_index6];
      if (selectors.indexOf(_selector2) === -1) {
        selectors.push(_selector2);
      }
    }
    var target = null;
    for (var _index7 = 0; _index7 < selectors.length; _index7 += 1) {
      var _selector3 = selectors[_index7];
      if (!_selector3) {
        continue;
      }
      var element = DOCUMENT.querySelector(_selector3);
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
    var applyFocus = function applyFocus() {
      try {
        target.focus({
          preventScroll: true
        });
      } catch (error) {
        void error;
        try {
          target.focus();
        } catch (focusError) {
          void focusError;
        }
      }
      var view = target.ownerDocument && target.ownerDocument.defaultView;
      var isTextInput = Boolean(view && (target instanceof view.HTMLInputElement || target instanceof view.HTMLTextAreaElement));
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
      var event = new Event(type, {
        bubbles: true,
        cancelable: true
      });
      target.dispatchEvent(event);
    } catch (error) {
      try {
        var legacyEvent = DOCUMENT.createEvent('Event');
        legacyEvent.initEvent(type, true, true);
        target.dispatchEvent(legacyEvent);
      } catch (legacyError) {
        safeWarn('cine.features.onboardingTour could not dispatch synthetic event.', legacyError || error);
      }
    }
  }
  function applyLanguagePreference(value) {
    var candidate = typeof value === 'string' ? value.trim() : '';
    if (!candidate) {
      return false;
    }
    var applied = false;
    var missingSentinel = {};
    if (typeof GLOBAL_SCOPE.callCoreFunctionIfAvailable === 'function') {
      try {
        var result = GLOBAL_SCOPE.callCoreFunctionIfAvailable('setLanguage', [candidate], {
          defaultValue: missingSentinel
        });
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
    var introEntry = tourTexts && tourTexts.steps && tourTexts.steps.intro ? tourTexts.steps.intro : {};
    var heroTexts = introEntry && _typeof(introEntry.hero) === 'object' ? introEntry.hero : {};
    var highlights = Array.isArray(heroTexts.highlights) ? heroTexts.highlights : [];
    var heroHeading = typeof heroTexts.heading === 'string' && heroTexts.heading ? heroTexts.heading : typeof introEntry.title === 'string' ? introEntry.title : '';
    var heroSubheading = typeof heroTexts.subheading === 'string' ? heroTexts.subheading : '';
    var heroSummary = typeof heroTexts.summary === 'string' ? heroTexts.summary : '';
    var badgeIcon = typeof heroTexts.badgeIcon === 'string' && heroTexts.badgeIcon ? heroTexts.badgeIcon : "\uE9C3";
    var badgeLabel = typeof heroTexts.badgeLabel === 'string' ? heroTexts.badgeLabel : '';
    var badgeDescription = typeof heroTexts.badgeDescription === 'string' ? heroTexts.badgeDescription : '';
    var languageLabel = typeof heroTexts.languageLabel === 'string' ? heroTexts.languageLabel : 'Language';
    var languageHint = typeof heroTexts.languageHint === 'string' ? heroTexts.languageHint : '';
    var offlineSummary = typeof heroTexts.offlineSummary === 'string' ? heroTexts.offlineSummary : '';
    interactionContainerEl.hidden = false;
    interactionContainerEl.classList.add('onboarding-interaction--hero');
    registerCleanup(function () {
      interactionContainerEl.classList.remove('onboarding-interaction--hero');
    });
    var hero = DOCUMENT.createElement('div');
    hero.className = 'onboarding-hero';
    var badgeHighlight = null;
    if (badgeLabel || badgeDescription) {
      var badgeItem = DOCUMENT.createElement('li');
      badgeItem.className = 'onboarding-hero-highlight onboarding-hero-highlight--badge';
      var badgeIconEl = DOCUMENT.createElement('span');
      badgeIconEl.className = 'icon-glyph onboarding-hero-highlight-icon onboarding-hero-highlight-icon--badge';
      badgeIconEl.setAttribute('data-icon-font', 'uicons');
      badgeIconEl.setAttribute('aria-hidden', 'true');
      badgeIconEl.textContent = badgeIcon;
      badgeItem.appendChild(badgeIconEl);
      var badgeText = DOCUMENT.createElement('div');
      badgeText.className = 'onboarding-hero-highlight-text onboarding-hero-highlight-text--badge';
      if (badgeLabel) {
        var _labelEl = DOCUMENT.createElement('span');
        _labelEl.className = 'onboarding-hero-highlight-badge-label';
        _labelEl.textContent = badgeLabel;
        badgeText.appendChild(_labelEl);
      }
      if (badgeDescription) {
        var descriptionEl = DOCUMENT.createElement('span');
        descriptionEl.className = 'onboarding-hero-highlight-badge-description';
        descriptionEl.textContent = badgeDescription;
        badgeText.appendChild(descriptionEl);
      }
      badgeItem.appendChild(badgeText);
      badgeHighlight = badgeItem;
    }
    if (heroHeading || heroSubheading || heroSummary) {
      var heroBanner = DOCUMENT.createElement('div');
      heroBanner.className = 'onboarding-hero-banner';
      var headerWrap = DOCUMENT.createElement('div');
      headerWrap.className = 'onboarding-hero-header';
      if (heroHeading) {
        var headingEl = DOCUMENT.createElement('h1');
        headingEl.className = 'onboarding-hero-heading';
        headingEl.textContent = heroHeading;
        headerWrap.appendChild(headingEl);
      }
      if (heroSubheading) {
        var subheadingEl = DOCUMENT.createElement('p');
        subheadingEl.className = 'onboarding-hero-subheading';
        subheadingEl.textContent = heroSubheading;
        headerWrap.appendChild(subheadingEl);
      }
      if (heroSummary) {
        var summaryEl = DOCUMENT.createElement('p');
        summaryEl.className = 'onboarding-hero-summary';
        summaryEl.textContent = heroSummary;
        headerWrap.appendChild(summaryEl);
      }
      heroBanner.appendChild(headerWrap);
      hero.appendChild(heroBanner);
    }
    if (highlights.length || badgeHighlight) {
      var listEl = DOCUMENT.createElement('ul');
      listEl.className = 'onboarding-hero-highlights';
      if (badgeHighlight) {
        listEl.appendChild(badgeHighlight);
      }
      for (var index = 0; index < highlights.length; index += 1) {
        var entry = highlights[index] && _typeof(highlights[index]) === 'object' ? highlights[index] : {};
        var itemEl = DOCUMENT.createElement('li');
        itemEl.className = 'onboarding-hero-highlight';
        var iconEl = DOCUMENT.createElement('span');
        iconEl.className = 'icon-glyph onboarding-hero-highlight-icon';
        iconEl.setAttribute('data-icon-font', 'uicons');
        iconEl.setAttribute('aria-hidden', 'true');
        iconEl.textContent = typeof entry.icon === 'string' && entry.icon ? entry.icon : "\uE1A6";
        itemEl.appendChild(iconEl);
        var textWrap = DOCUMENT.createElement('div');
        textWrap.className = 'onboarding-hero-highlight-text';
        if (typeof entry.title === 'string' && entry.title) {
          var _titleEl = DOCUMENT.createElement('h3');
          _titleEl.className = 'onboarding-hero-highlight-title';
          _titleEl.textContent = entry.title;
          textWrap.appendChild(_titleEl);
        }
        if (typeof entry.body === 'string' && entry.body) {
          var _bodyEl = DOCUMENT.createElement('p');
          _bodyEl.className = 'onboarding-hero-highlight-body';
          _bodyEl.textContent = entry.body;
          textWrap.appendChild(_bodyEl);
        }
        itemEl.appendChild(textWrap);
        listEl.appendChild(itemEl);
      }
      hero.appendChild(listEl);
    }
    var languageGroup = DOCUMENT.createElement('div');
    languageGroup.className = 'onboarding-hero-language';
    var languageSelect = DOCUMENT.getElementById('languageSelect');
    var settingsLanguage = DOCUMENT.getElementById('settingsLanguage');
    var languageTargets = [];
    if (languageSelect) {
      languageTargets.push(languageSelect);
    }
    if (settingsLanguage && settingsLanguage !== languageSelect) {
      languageTargets.push(settingsLanguage);
    }
    var languageControlId = getProxyControlId('intro-language');
    var labelEl = DOCUMENT.createElement('label');
    labelEl.className = 'onboarding-hero-language-label';
    labelEl.setAttribute('for', languageControlId);
    labelEl.textContent = languageLabel;
    languageGroup.appendChild(labelEl);
    var languageProxy = DOCUMENT.createElement('select');
    languageProxy.id = languageControlId;
    languageProxy.className = 'onboarding-field-select onboarding-hero-language-select';
    var copyOptionsFromSource = function copyOptionsFromSource(source) {
      var preserveValue = languageProxy.value;
      languageProxy.textContent = '';
      if (!source) {
        return;
      }
      var sourceOptions = source && source.options ? Array.from(source.options) : [];
      if (sourceOptions.length) {
        for (var _index8 = 0; _index8 < sourceOptions.length; _index8 += 1) {
          languageProxy.appendChild(sourceOptions[_index8].cloneNode(true));
        }
      } else if (typeof source.value === 'string') {
        var option = DOCUMENT.createElement('option');
        option.value = source.value;
        option.textContent = source.value || '';
        languageProxy.appendChild(option);
      }
      if (preserveValue) {
        languageProxy.value = preserveValue;
      }
    };
    var getActiveLanguageValue = function getActiveLanguageValue() {
      for (var _index9 = 0; _index9 < languageTargets.length; _index9 += 1) {
        var target = languageTargets[_index9];
        if (target && typeof target.value === 'string' && target.value) {
          return target.value;
        }
      }
      return '';
    };
    var syncLanguageProxyFromTargets = function syncLanguageProxyFromTargets() {
      if (!languageTargets.length) {
        return;
      }
      var base = languageTargets[0];
      if (base) {
        var activeValue = getActiveLanguageValue() || languageProxy.value;
        copyOptionsFromSource(base);
        if (activeValue) {
          languageProxy.value = activeValue;
        }
      }
    };
    if (languageTargets.length) {
      copyOptionsFromSource(languageTargets[0]);
      var initialValue = getActiveLanguageValue();
      if (initialValue) {
        languageProxy.value = initialValue;
      } else if (languageProxy.options && languageProxy.options.length && languageTargets[0]) {
        languageProxy.value = languageTargets[0].value || languageProxy.options[0].value;
      }
    } else {
      languageProxy.disabled = true;
      languageProxy.setAttribute('aria-disabled', 'true');
    }
    var handleLanguageProxyChange = function handleLanguageProxyChange() {
      var value = languageProxy.value;
      var applied = applyLanguagePreference(value);
      if (applied) {
        return;
      }
      for (var _index0 = 0; _index0 < languageTargets.length; _index0 += 1) {
        var target = languageTargets[_index0];
        if (!target || target.value === value) {
          continue;
        }
        target.value = value;
        dispatchSyntheticEvent(target, 'change');
      }
    };
    languageProxy.addEventListener('change', handleLanguageProxyChange);
    registerCleanup(function () {
      languageProxy.removeEventListener('change', handleLanguageProxyChange);
    });
    var handleTargetChange = function handleTargetChange() {
      syncLanguageProxyFromTargets();
    };
    var _loop4 = function _loop4() {
        var target = languageTargets[_index1];
        if (!target) {
          return 0;
        }
        target.addEventListener('change', handleTargetChange);
        target.addEventListener('input', handleTargetChange);
        registerCleanup(function () {
          target.removeEventListener('change', handleTargetChange);
          target.removeEventListener('input', handleTargetChange);
        });
        if (GLOBAL_SCOPE && GLOBAL_SCOPE.MutationObserver && typeof GLOBAL_SCOPE.MutationObserver === 'function') {
          try {
            var observer = new GLOBAL_SCOPE.MutationObserver(function () {
              syncLanguageProxyFromTargets();
            });
            observer.observe(target, {
              childList: true
            });
            registerCleanup(function () {
              try {
                observer.disconnect();
              } catch (error) {
                void error;
              }
            });
          } catch (error) {
            void error;
          }
          return 1;
        }
      },
      _ret2;
    for (var _index1 = 0; _index1 < languageTargets.length; _index1 += 1) {
      _ret2 = _loop4();
      if (_ret2 === 0) continue;
      if (_ret2 === 1) break;
    }
    if (GLOBAL_SCOPE && typeof GLOBAL_SCOPE.addEventListener === 'function') {
      var handleLanguageEvent = function handleLanguageEvent() {
        syncLanguageProxyFromTargets();
      };
      try {
        GLOBAL_SCOPE.addEventListener('languagechange', handleLanguageEvent);
        registerCleanup(function () {
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
      var hintEl = DOCUMENT.createElement('p');
      hintEl.className = 'onboarding-hero-language-hint';
      hintEl.textContent = languageHint;
      languageGroup.appendChild(hintEl);
    }
    hero.appendChild(languageGroup);
    if (offlineSummary) {
      var offlineEl = DOCUMENT.createElement('p');
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
    var introText = tourTexts && typeof tourTexts.userProfileInteractionIntro === 'string' ? tourTexts.userProfileInteractionIntro : 'Enter your crew details once. Each update syncs to Contacts instantly, stays cached offline and flows into exports so crews always know who owns the setup.';
    intro.textContent = introText;
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
        avatarObserver.observe(avatarContainer, {
          childList: true,
          subtree: true,
          attributes: true
        });
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
    var fallbackAvatarAction = tourTexts && typeof tourTexts.userProfileAvatarAction === 'string' ? tourTexts.userProfileAvatarAction : 'Add profile photo';
    var avatarChangeLabel = function () {
      var lang = resolveLanguage();
      var texts = GLOBAL_SCOPE && _typeof(GLOBAL_SCOPE.texts) === 'object' ? GLOBAL_SCOPE.texts : {};
      var langPack = texts && _typeof(texts[lang]) === 'object' ? texts[lang] : null;
      var fallbackPack = texts && _typeof(texts.en) === 'object' ? texts.en : null;
      var langContacts = langPack && _typeof(langPack.contacts) === 'object' ? langPack.contacts : null;
      var fallbackContacts = fallbackPack && _typeof(fallbackPack.contacts) === 'object' ? fallbackPack.contacts : null;
      var primary = langContacts && typeof langContacts.userProfileAvatarButton === 'string' ? langContacts.userProfileAvatarButton.trim() : '';
      if (primary) {
        return primary;
      }
      return fallbackContacts && typeof fallbackContacts.userProfileAvatarButton === 'string' ? fallbackContacts.userProfileAvatarButton.trim() : '';
    }();
    var normalizedAvatarAction = rawAvatarActionLabel || '';
    var avatarActionLabel = !normalizedAvatarAction ? fallbackAvatarAction : avatarChangeLabel && normalizedAvatarAction.toLowerCase() === avatarChangeLabel.toLowerCase() ? fallbackAvatarAction : normalizedAvatarAction;
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
      var _ref3 = options || {},
        fieldKey = _ref3.fieldKey,
        labelText = _ref3.labelText,
        placeholder = _ref3.placeholder,
        target = _ref3.target,
        type = _ref3.type,
        autocomplete = _ref3.autocomplete,
        onAfterSync = _ref3.onAfterSync;
      var group = DOCUMENT.createElement('div');
      group.className = 'onboarding-field-group';
      var proxyId = getProxyControlId(fieldKey);
      var label = DOCUMENT.createElement('label');
      label.className = 'onboarding-field-label';
      label.setAttribute('for', proxyId);
      label.textContent = labelText;
      group.appendChild(label);
      var isSelectField = type === 'select';
      var proxyControl = isSelectField ? DOCUMENT.createElement('select') : DOCUMENT.createElement('input');
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
      var copySelectOptions = function copySelectOptions() {
        if (!isSelectField) {
          return;
        }
        var targetOptions = target && target.options ? Array.from(target.options) : [];
        proxyControl.textContent = '';
        if (targetOptions.length) {
          targetOptions.forEach(function (option) {
            proxyControl.appendChild(option.cloneNode(true));
          });
        } else if (typeof placeholder === 'string' && placeholder) {
          var placeholderOption = DOCUMENT.createElement('option');
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
      var syncFromTarget = function syncFromTarget() {
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
      var syncToTarget = function syncToTarget() {
        if (!target) {
          return;
        }
        if (isSelectField) {
          var nextValue = proxyControl.value;
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
      registerCleanup(function () {
        proxyControl.removeEventListener('input', syncToTarget);
        proxyControl.removeEventListener('change', syncToTarget);
      });
      if (target) {
        target.addEventListener('input', syncFromTarget);
        target.addEventListener('change', syncFromTarget);
        registerCleanup(function () {
          target.removeEventListener('input', syncFromTarget);
          target.removeEventListener('change', syncFromTarget);
        });
        if (isSelectField && typeof MutationObserver === 'function') {
          var observer = new MutationObserver(syncFromTarget);
          observer.observe(target, {
            childList: true
          });
          registerCleanup(function () {
            return observer.disconnect();
          });
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
    var resolvedNameLabel = profileLabel && typeof profileLabel.textContent === 'string' ? profileLabel.textContent : 'Display name';
    var resolvedNamePlaceholder = 'e.g. Alex Rivera';
    if (profileInput && typeof profileInput.getAttribute === 'function') {
      var placeholderValue = profileInput.getAttribute('placeholder');
      if (typeof placeholderValue === 'string' && placeholderValue) {
        resolvedNamePlaceholder = placeholderValue;
      }
    }
    var nameProxy = createProxyField({
      fieldKey: 'user-profile-name',
      labelText: resolvedNameLabel,
      placeholder: resolvedNamePlaceholder,
      target: profileInput,
      type: 'text',
      autocomplete: 'name',
      onAfterSync: function onAfterSync() {
        return updateAvatarPreview();
      }
    });
    var resolvedRoleLabel = roleLabel && typeof roleLabel.textContent === 'string' ? roleLabel.textContent : 'Role or title';
    var resolvedRolePlaceholder = 'Select role';
    if (roleInput && roleInput.options && roleInput.options.length) {
      var placeholderOption = roleInput.options[0];
      if (placeholderOption && placeholderOption.textContent) {
        resolvedRolePlaceholder = placeholderOption.textContent;
      }
    }
    createProxyField({
      fieldKey: 'user-profile-role',
      labelText: resolvedRoleLabel,
      placeholder: resolvedRolePlaceholder,
      target: roleInput,
      type: 'select'
    });
    var resolvedPhoneLabel = phoneLabel && typeof phoneLabel.textContent === 'string' ? phoneLabel.textContent : 'Phone number';
    var resolvedPhonePlaceholder = '';
    if (phoneInput && typeof phoneInput.getAttribute === 'function') {
      var phonePlaceholder = phoneInput.getAttribute('placeholder');
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
      autocomplete: 'tel'
    });
    var resolvedEmailLabel = emailLabel && typeof emailLabel.textContent === 'string' ? emailLabel.textContent : 'Email address';
    var resolvedEmailPlaceholder = '';
    if (emailInput && typeof emailInput.getAttribute === 'function') {
      var emailPlaceholder = emailInput.getAttribute('placeholder');
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
      autocomplete: 'email'
    });
    var skipHint = DOCUMENT.createElement('p');
    skipHint.className = 'onboarding-resume-hint';
    var skipHintText = tourTexts && typeof tourTexts.userProfileInteractionSkipHint === 'string' ? tourTexts.userProfileInteractionSkipHint : 'Press Next when you are ready—Contacts in the sidebar always shows these saved details without resetting tutorial progress.';
    skipHint.textContent = skipHintText;
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
          focusTarget.focus({
            preventScroll: true
          });
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
    var fragment = DOCUMENT.createDocumentFragment();
    var languageSelect = DOCUMENT.getElementById('settingsLanguage');
    var getTourString = function getTourString(key, fallbackValue) {
      var raw = tourTexts && typeof tourTexts[key] === 'string' ? tourTexts[key].trim() : '';
      return raw || fallbackValue;
    };
    if (languageSelect) {
      var group = DOCUMENT.createElement('div');
      group.className = 'onboarding-field-group';
      var inputId = getProxyControlId('language');
      var label = DOCUMENT.createElement('label');
      label.className = 'onboarding-field-label';
      label.setAttribute('for', inputId);
      label.textContent = getTourString('unitsPreferencesLanguageLabel', 'Language');
      var proxySelect = DOCUMENT.createElement('select');
      proxySelect.id = inputId;
      proxySelect.className = 'onboarding-field-select';
      var originalOptions = Array.from(languageSelect.options || []);
      if (originalOptions.length === 0) {
        var option = DOCUMENT.createElement('option');
        option.value = languageSelect.value || 'en';
        option.textContent = languageSelect.value || 'English';
        proxySelect.appendChild(option);
      } else {
        for (var index = 0; index < originalOptions.length; index += 1) {
          var source = originalOptions[index];
          var _option = DOCUMENT.createElement('option');
          _option.value = source.value;
          _option.textContent = source.textContent || source.value;
          proxySelect.appendChild(_option);
        }
      }
      proxySelect.value = languageSelect.value || proxySelect.value;
      var syncFromTarget = function syncFromTarget() {
        if (proxySelect.value !== languageSelect.value) {
          proxySelect.value = languageSelect.value;
        }
      };
      var syncToTarget = function syncToTarget() {
        if (languageSelect.value !== proxySelect.value) {
          languageSelect.value = proxySelect.value;
          dispatchSyntheticEvent(languageSelect, 'change');
        }
      };
      proxySelect.addEventListener('change', syncToTarget);
      registerCleanup(function () {
        proxySelect.removeEventListener('change', syncToTarget);
      });
      languageSelect.addEventListener('change', syncFromTarget);
      registerCleanup(function () {
        languageSelect.removeEventListener('change', syncFromTarget);
      });
      group.appendChild(label);
      group.appendChild(proxySelect);
      fragment.appendChild(group);
    }
    var darkModeToggle = DOCUMENT.getElementById('settingsDarkMode');
    var themeGroup = DOCUMENT.createElement('div');
    themeGroup.className = 'onboarding-field-group';
    var themeId = getProxyControlId('theme');
    var themeLabel = DOCUMENT.createElement('label');
    themeLabel.className = 'onboarding-field-label';
    themeLabel.setAttribute('for', themeId);
    themeLabel.textContent = getTourString('unitsPreferencesThemeLabel', 'Theme');
    var themeSelect = DOCUMENT.createElement('select');
    themeSelect.id = themeId;
    themeSelect.className = 'onboarding-field-select';
    var themeLight = DOCUMENT.createElement('option');
    themeLight.value = 'light';
    themeLight.textContent = getTourString('unitsPreferencesThemeLight', 'Light');
    var themeDark = DOCUMENT.createElement('option');
    themeDark.value = 'dark';
    themeDark.textContent = getTourString('unitsPreferencesThemeDark', 'Dark');
    themeSelect.appendChild(themeLight);
    themeSelect.appendChild(themeDark);
    var themePreferenceBridge = GLOBAL_SCOPE && GLOBAL_SCOPE.cineThemePreference ? GLOBAL_SCOPE.cineThemePreference : null;
    if (themePreferenceBridge && typeof themePreferenceBridge.registerControl === 'function' && typeof themePreferenceBridge.getValue === 'function') {
      try {
        var currentTheme = themePreferenceBridge.getValue();
        if (typeof currentTheme === 'boolean') {
          themeSelect.value = currentTheme ? 'dark' : 'light';
        }
      } catch (bridgeError) {
        safeWarn('cine.features.onboardingTour: theme bridge getValue failed.', bridgeError);
      }
      var unregisterThemeControl = null;
      try {
        unregisterThemeControl = themePreferenceBridge.registerControl(themeSelect, {
          type: 'select'
        });
      } catch (registerError) {
        safeWarn('cine.features.onboardingTour: theme bridge registerControl failed.', registerError);
      }
      if (typeof unregisterThemeControl === 'function') {
        registerCleanup(function () {
          try {
            unregisterThemeControl();
          } catch (cleanupError) {
            safeWarn('cine.features.onboardingTour: theme bridge cleanup failed.', cleanupError);
          }
        });
      }
    } else {
      themeSelect.value = darkModeToggle && darkModeToggle.checked ? 'dark' : 'light';
      var syncThemeFromTarget = function syncThemeFromTarget() {
        var expected = darkModeToggle && darkModeToggle.checked ? 'dark' : 'light';
        if (themeSelect.value !== expected) {
          themeSelect.value = expected;
        }
      };
      var syncThemeToTarget = function syncThemeToTarget() {
        if (!darkModeToggle) {
          return;
        }
        var shouldEnable = themeSelect.value === 'dark';
        if (darkModeToggle.checked !== shouldEnable) {
          darkModeToggle.checked = shouldEnable;
          dispatchSyntheticEvent(darkModeToggle, 'change');
        }
      };
      themeSelect.addEventListener('change', syncThemeToTarget);
      registerCleanup(function () {
        themeSelect.removeEventListener('change', syncThemeToTarget);
      });
      if (darkModeToggle) {
        darkModeToggle.addEventListener('change', syncThemeFromTarget);
        registerCleanup(function () {
          darkModeToggle.removeEventListener('change', syncThemeFromTarget);
        });
      }
    }
    themeGroup.appendChild(themeLabel);
    themeGroup.appendChild(themeSelect);
    fragment.appendChild(themeGroup);
    var pinkToggle = DOCUMENT.getElementById('settingsPinkMode');
    if (pinkToggle) {
      var pinkGroup = DOCUMENT.createElement('div');
      pinkGroup.className = 'onboarding-field-group';
      var pinkId = getProxyControlId('pink');
      var pinkLabel = DOCUMENT.createElement('label');
      pinkLabel.className = 'onboarding-field-label';
      pinkLabel.setAttribute('for', pinkId);
      pinkLabel.textContent = getTourString('unitsPreferencesPinkLabel', 'Pink mode accents');
      var pinkSelect = DOCUMENT.createElement('select');
      pinkSelect.id = pinkId;
      pinkSelect.className = 'onboarding-field-select';
      var pinkOff = DOCUMENT.createElement('option');
      pinkOff.value = 'off';
      pinkOff.textContent = getTourString('unitsPreferencesPinkOff', 'Disabled');
      var pinkOn = DOCUMENT.createElement('option');
      pinkOn.value = 'on';
      pinkOn.textContent = getTourString('unitsPreferencesPinkOn', 'Enabled');
      pinkSelect.appendChild(pinkOff);
      pinkSelect.appendChild(pinkOn);
      pinkSelect.value = pinkToggle.checked ? 'on' : 'off';
      var syncPinkToTarget = function syncPinkToTarget() {
        var shouldEnable = pinkSelect.value === 'on';
        if (pinkToggle.checked !== shouldEnable) {
          pinkToggle.checked = shouldEnable;
          dispatchSyntheticEvent(pinkToggle, 'change');
        }
      };
      var syncPinkFromTarget = function syncPinkFromTarget() {
        var expected = pinkToggle.checked ? 'on' : 'off';
        if (pinkSelect.value !== expected) {
          pinkSelect.value = expected;
        }
      };
      pinkSelect.addEventListener('change', syncPinkToTarget);
      registerCleanup(function () {
        pinkSelect.removeEventListener('change', syncPinkToTarget);
      });
      pinkToggle.addEventListener('change', syncPinkFromTarget);
      registerCleanup(function () {
        pinkToggle.removeEventListener('change', syncPinkFromTarget);
      });
      pinkGroup.appendChild(pinkLabel);
      pinkGroup.appendChild(pinkSelect);
      fragment.appendChild(pinkGroup);
    }
    var focusScaleSelect = DOCUMENT.getElementById('settingsFocusScale');
    if (focusScaleSelect) {
      var focusGroup = DOCUMENT.createElement('div');
      focusGroup.className = 'onboarding-field-group';
      var focusId = getProxyControlId('focus-scale');
      var focusLabel = DOCUMENT.createElement('label');
      focusLabel.className = 'onboarding-field-label';
      focusLabel.setAttribute('for', focusId);
      var focusLabelSource = DOCUMENT.getElementById('settingsFocusScaleLabel');
      focusLabel.textContent = focusLabelSource && typeof focusLabelSource.textContent === 'string' ? focusLabelSource.textContent : 'Focus scale';
      var proxyFocus = DOCUMENT.createElement('select');
      proxyFocus.id = focusId;
      proxyFocus.className = 'onboarding-field-select';
      var focusOptions = Array.from(focusScaleSelect.options || []);
      if (focusOptions.length === 0) {
        var _option2 = DOCUMENT.createElement('option');
        _option2.value = focusScaleSelect.value || 'metric';
        _option2.textContent = focusScaleSelect.value || 'Metric';
        proxyFocus.appendChild(_option2);
      } else {
        for (var _index10 = 0; _index10 < focusOptions.length; _index10 += 1) {
          var _source = focusOptions[_index10];
          var _option3 = DOCUMENT.createElement('option');
          _option3.value = _source.value;
          _option3.textContent = _source.textContent || _source.value;
          proxyFocus.appendChild(_option3);
        }
      }
      proxyFocus.value = focusScaleSelect.value || proxyFocus.value;
      var syncFocusFromTarget = function syncFocusFromTarget() {
        if (proxyFocus.value !== focusScaleSelect.value) {
          proxyFocus.value = focusScaleSelect.value;
        }
      };
      var syncFocusToTarget = function syncFocusToTarget() {
        if (focusScaleSelect.value !== proxyFocus.value) {
          focusScaleSelect.value = proxyFocus.value;
          dispatchSyntheticEvent(focusScaleSelect, 'change');
        }
      };
      proxyFocus.addEventListener('change', syncFocusToTarget);
      registerCleanup(function () {
        proxyFocus.removeEventListener('change', syncFocusToTarget);
      });
      focusScaleSelect.addEventListener('change', syncFocusFromTarget);
      registerCleanup(function () {
        focusScaleSelect.removeEventListener('change', syncFocusFromTarget);
      });
      focusGroup.appendChild(focusLabel);
      focusGroup.appendChild(proxyFocus);
      fragment.appendChild(focusGroup);
    }
    var tempUnitSelect = DOCUMENT.getElementById('settingsTemperatureUnit');
    if (tempUnitSelect) {
      var unitsGroup = DOCUMENT.createElement('div');
      unitsGroup.className = 'onboarding-field-group';
      var unitsId = getProxyControlId('units');
      var unitsLabel = DOCUMENT.createElement('label');
      unitsLabel.className = 'onboarding-field-label';
      unitsLabel.setAttribute('for', unitsId);
      unitsLabel.textContent = getTourString('unitsPreferencesUnitsLabel', 'Temperature units');
      var proxyUnits = DOCUMENT.createElement('select');
      proxyUnits.id = unitsId;
      proxyUnits.className = 'onboarding-field-select';
      var unitOptions = Array.from(tempUnitSelect.options || []);
      if (unitOptions.length === 0) {
        var _option4 = DOCUMENT.createElement('option');
        _option4.value = tempUnitSelect.value || 'celsius';
        _option4.textContent = tempUnitSelect.value || 'Celsius';
        proxyUnits.appendChild(_option4);
      } else {
        for (var _index11 = 0; _index11 < unitOptions.length; _index11 += 1) {
          var _source2 = unitOptions[_index11];
          var _option5 = DOCUMENT.createElement('option');
          _option5.value = _source2.value;
          _option5.textContent = _source2.textContent || _source2.value;
          proxyUnits.appendChild(_option5);
        }
      }
      proxyUnits.value = tempUnitSelect.value || proxyUnits.value;
      var syncUnitsFromTarget = function syncUnitsFromTarget() {
        if (proxyUnits.value !== tempUnitSelect.value) {
          proxyUnits.value = tempUnitSelect.value;
        }
      };
      var syncUnitsToTarget = function syncUnitsToTarget() {
        if (tempUnitSelect.value !== proxyUnits.value) {
          tempUnitSelect.value = proxyUnits.value;
          dispatchSyntheticEvent(tempUnitSelect, 'change');
        }
      };
      proxyUnits.addEventListener('change', syncUnitsToTarget);
      registerCleanup(function () {
        proxyUnits.removeEventListener('change', syncUnitsToTarget);
      });
      tempUnitSelect.addEventListener('change', syncUnitsFromTarget);
      registerCleanup(function () {
        tempUnitSelect.removeEventListener('change', syncUnitsFromTarget);
      });
      unitsGroup.appendChild(unitsLabel);
      unitsGroup.appendChild(proxyUnits);
      fragment.appendChild(unitsGroup);
    }
    var persistenceButton = DOCUMENT.getElementById('storagePersistenceRequest');
    var persistenceHint = DOCUMENT.createElement('p');
    persistenceHint.className = 'onboarding-resume-hint';
    persistenceHint.textContent = getTourString('unitsPreferencesPersistenceHint', 'Request persistent storage so the browser keeps planner data even when space runs low.');
    fragment.appendChild(persistenceHint);
    var statusGroup = DOCUMENT.createElement('div');
    statusGroup.className = 'onboarding-storage-status';
    statusGroup.setAttribute('role', 'status');
    statusGroup.setAttribute('aria-live', 'polite');
    statusGroup.setAttribute('data-state', 'checking');
    var statusIcon = DOCUMENT.createElement('span');
    statusIcon.className = 'onboarding-storage-icon';
    statusIcon.setAttribute('aria-hidden', 'true');
    var statusText = DOCUMENT.createElement('span');
    statusText.className = 'onboarding-storage-text';
    statusGroup.appendChild(statusIcon);
    statusGroup.appendChild(statusText);
    fragment.appendChild(statusGroup);
    var statusSource = DOCUMENT.getElementById('storagePersistenceStatus');
    var getPersistenceStatusText = function getPersistenceStatusText(key) {
      if (!key || !GLOBAL_SCOPE || _typeof(GLOBAL_SCOPE.texts) !== 'object') {
        return '';
      }
      var lang = resolveLanguage();
      var texts = GLOBAL_SCOPE.texts || {};
      var langPack = texts[lang] && _typeof(texts[lang]) === 'object' ? texts[lang] : null;
      var fallbackPack = texts.en && _typeof(texts.en) === 'object' ? texts.en : null;
      var primary = langPack && typeof langPack[key] === 'string' ? langPack[key] : null;
      if (primary && primary.trim()) {
        return primary;
      }
      var fallback = fallbackPack && typeof fallbackPack[key] === 'string' ? fallbackPack[key] : null;
      return fallback && fallback.trim() ? fallback : '';
    };
    var defaultStatusText = getPersistenceStatusText('storagePersistenceStatusIdle') || persistenceHint.textContent || '';
    var applyStatus = function applyStatus(state, message) {
      var normalizedState = typeof state === 'string' && state ? state : 'checking';
      statusGroup.setAttribute('data-state', normalizedState);
      statusGroup.dataset.state = normalizedState;
      var resolved = typeof message === 'string' && message.trim() ? message.trim() : normalizedState === 'checking' ? getPersistenceStatusText('storagePersistenceStatusChecking') || defaultStatusText : defaultStatusText;
      statusText.textContent = resolved;
      if (resolved) {
        statusGroup.removeAttribute('data-empty');
      } else {
        statusGroup.setAttribute('data-empty', 'true');
      }
    };
    var updateStatus = function updateStatus(detail) {
      var nextState = detail && typeof detail.state === 'string' ? detail.state : null;
      var nextMessage = detail && typeof detail.message === 'string' ? detail.message : null;
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
      var handleStatusChange = function handleStatusChange(event) {
        updateStatus(event && event.detail ? event.detail : null);
      };
      statusSource.addEventListener('storagepersistencechange', handleStatusChange);
      registerCleanup(function () {
        statusSource.removeEventListener('storagepersistencechange', handleStatusChange);
      });
      var Observer = GLOBAL_SCOPE && (GLOBAL_SCOPE.MutationObserver || GLOBAL_SCOPE.WebKitMutationObserver || GLOBAL_SCOPE.MozMutationObserver);
      if (Observer) {
        var observer = null;
        try {
          observer = new Observer(function () {
            updateStatus();
          });
          observer.observe(statusSource, {
            characterData: true,
            childList: true,
            subtree: true,
            attributes: true
          });
          var disconnectObserver = function disconnectObserver() {
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
    var actions = DOCUMENT.createElement('div');
    actions.className = 'onboarding-interaction-actions';
    var requestButton = DOCUMENT.createElement('button');
    requestButton.type = 'button';
    requestButton.className = 'onboarding-interaction-button';
    requestButton.textContent = getTourString('unitsPreferencesPersistenceAction', 'Protect storage on this device');
    requestButton.disabled = !persistenceButton;
    var handleRequest = function handleRequest() {
      if (!persistenceButton) {
        return;
      }
      var originalTab = step && step.ensureSettings && step.ensureSettings.tabId ? step.ensureSettings.tabId : 'settingsTab-general';
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
        setTimeout(function () {
          try {
            activateSettingsTab(originalTab);
          } catch (error) {
            safeWarn('cine.features.onboardingTour could not restore settings tab.', error);
          }
        }, 300);
      }
    };
    requestButton.addEventListener('click', handleRequest);
    registerCleanup(function () {
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
    var key = step && step.key;
    var requiresDirectInteraction = Boolean(key && key !== 'intro' && key !== 'completion');
    interactionContainerEl.hidden = true;
    var cleanupCallbacks = [];
    var registerCleanup = function registerCleanup(callback) {
      if (typeof callback === 'function') {
        cleanupCallbacks.push(callback);
      }
    };
    var customRendered = function () {
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
    }();
    if (customRendered) {
      focusHighlightedElement(step);
      schedulePositionUpdate();
      activeInteractionCleanup = function activeInteractionCleanup() {
        for (var index = 0; index < cleanupCallbacks.length; index += 1) {
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
  function moveSkipButtonToActions() {
    if (!skipButton || !cardActionsEl) {
      return;
    }
    if (cardActionsEl.contains(skipButton)) {
      return;
    }
    var referenceNode = nextButton && cardActionsEl.contains(nextButton) ? nextButton : null;
    cardActionsEl.insertBefore(skipButton, referenceNode);
    skipButton.classList.add('onboarding-skip--intro');
  }
  function moveSkipButtonToHeader() {
    if (!skipButton || !cardHeaderEl) {
      return;
    }
    if (cardHeaderEl.contains(skipButton)) {
      return;
    }
    cardHeaderEl.appendChild(skipButton);
    skipButton.classList.remove('onboarding-skip--intro');
  }
  function updateCardForStep(step, index) {
    if (!cardEl) {
      return;
    }
    if (cardContentEl) {
      cardContentEl.scrollTop = 0;
    }
    var totalSteps = getCountableStepTotal(stepConfig);
    var countableIndex = getCountableStepIndex(stepConfig, index);
    var textPack = getStepTexts(step);
    var stepText = textPack.body;
    var size = step && typeof step.size === 'string' && step.size ? step.size : 'standard';
    cardEl.setAttribute('data-size', size);
    var stepKey = step && typeof step.key === 'string' ? step.key : '';
    if (stepKey) {
      cardEl.setAttribute('data-step-key', stepKey);
    } else {
      cardEl.removeAttribute('data-step-key');
    }
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
    var isIntroStep = stepKey === 'intro';
    var isCompletionStep = stepKey === 'completion';
    if (isCompletionStep) {
      nextButton.textContent = tourTexts.doneLabel || 'Finish';
    } else if (isIntroStep) {
      nextButton.textContent = tourTexts.introStartLabel || 'Start onboarding tour';
    } else {
      nextButton.textContent = tourTexts.nextLabel || 'Next';
    }
    if (isIntroStep) {
      backButton.disabled = true;
      backButton.hidden = true;
    } else {
      backButton.disabled = index <= 0;
      backButton.hidden = index <= 0;
    }
    backButton.setAttribute('aria-hidden', backButton.hidden ? 'true' : 'false');
    if (backButton.hidden) {
      backButton.tabIndex = -1;
    } else {
      backButton.removeAttribute('tabindex');
    }
    if (isIntroStep) {
      moveSkipButtonToActions();
    } else {
      moveSkipButtonToHeader();
    }
    if (isIntroStep) {
      skipButton.hidden = false;
    } else if (isCompletionStep) {
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
    var totalSteps = getCountableStepTotal(stepConfig);
    var completedSteps = storedState && Array.isArray(storedState.completedSteps) ? storedState.completedSteps : [];
    var completedSet = new Set(completedSteps);
    var completedCount = getCountableCompletedCount(stepConfig, completedSet);
    var activeCountableIndex = getCountableStepIndex(stepConfig, index);
    var progressValue = completedCount;
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
    var ratio = totalSteps > 0 ? Math.max(0, Math.min(1, progressValue / totalSteps)) : 0;
    progressMeterFillEl.style.width = "".concat(ratio * 100, "%");
    var labelTemplate = tourTexts.progressValueLabel || 'Completed {completed} of {total} steps';
    var label = labelTemplate.replace('{completed}', String(Math.min(completedCount, totalSteps))).replace('{total}', String(totalSteps));
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
    var focusCandidates = resolveSelectorElements(toSelectorArray(step.focus));
    var focusTarget = focusCandidates.length > 0 ? focusCandidates[0] : null;
    if (focusTarget && typeof focusTarget.scrollIntoView === 'function') {
      try {
        focusTarget.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      } catch (error) {
        safeWarn('cine.features.onboardingTour could not scroll focus target into view.', error);
      }
    } else {
      var highlightCandidates = getHighlightElements(step);
      var highlightTarget = highlightCandidates.length > 0 ? highlightCandidates[0] : null;
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
    closeContactsIfNeeded();
    closeOwnGearIfNeeded();
    closeDeviceManagerIfNeeded();
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
    closeContactsIfNeeded();
    closeOwnGearIfNeeded();
    closeDeviceManagerIfNeeded();
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
    var focusableElements = [];
    var seen = new Set();
    var pushUnique = function pushUnique(element) {
      if (!element) {
        return;
      }
      if (seen.has(element)) {
        return;
      }
      seen.add(element);
      focusableElements.push(element);
    };
    var cardFocusable = collectFocusableElements(cardEl);
    for (var _index12 = 0; _index12 < cardFocusable.length; _index12 += 1) {
      pushUnique(cardFocusable[_index12]);
    }
    if (Array.isArray(activeTargetElements)) {
      for (var targetIndex = 0; targetIndex < activeTargetElements.length; targetIndex += 1) {
        var _target = activeTargetElements[targetIndex];
        var targetFocusable = collectFocusableElements(_target, true);
        for (var _index13 = 0; _index13 < targetFocusable.length; _index13 += 1) {
          pushUnique(targetFocusable[_index13]);
        }
      }
    }
    var orderedFocusable = sortFocusableByDocumentOrder(focusableElements);
    if (!orderedFocusable.length) {
      return;
    }
    var direction = event.shiftKey ? -1 : 1;
    var activeElement = DOCUMENT.activeElement;
    var index = orderedFocusable.indexOf(activeElement);
    if (index === -1) {
      index = direction === 1 ? -1 : 0;
    }
    index = (index + direction + orderedFocusable.length) % orderedFocusable.length;
    event.preventDefault();
    var target = orderedFocusable[index];
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
  function startTutorial() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _ref4 = options || {},
      _ref4$resume = _ref4.resume,
      resume = _ref4$resume === void 0 ? false : _ref4$resume,
      _ref4$focusStart = _ref4.focusStart,
      focusStart = _ref4$focusStart === void 0 ? true : _ref4$focusStart;
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
  function invalidateHelpButtonsCache() {
    helpButtonsCache = null;
  }
  function nodeContainsHelpTrigger(node) {
    if (!node) {
      return false;
    }
    if (matchesHelpTrigger(node)) {
      return true;
    }
    if (typeof node.querySelector === 'function') {
      try {
        var candidate = node.querySelector(HELP_TRIGGER_SELECTOR);
        if (candidate) {
          return true;
        }
      } catch (error) {
        void error;
      }
    }
    return false;
  }
  function handleHelpButtonMutations(mutations) {
    if (!Array.isArray(mutations) || !mutations.length) {
      return;
    }
    for (var index = 0; index < mutations.length; index += 1) {
      var mutation = mutations[index];
      if (!mutation) {
        continue;
      }
      if (mutation.type === 'attributes') {
        if (nodeContainsHelpTrigger(mutation.target)) {
          invalidateHelpButtonsCache();
          return;
        }
      } else if (mutation.type === 'childList') {
        var added = mutation.addedNodes || [];
        for (var nodeIndex = 0; nodeIndex < added.length; nodeIndex += 1) {
          var node = added[nodeIndex];
          if (nodeContainsHelpTrigger(node)) {
            invalidateHelpButtonsCache();
            return;
          }
        }
        var removed = mutation.removedNodes || [];
        for (var _nodeIndex = 0; _nodeIndex < removed.length; _nodeIndex += 1) {
          var _node = removed[_nodeIndex];
          if (nodeContainsHelpTrigger(_node)) {
            invalidateHelpButtonsCache();
            return;
          }
        }
      }
    }
  }
  function ensureHelpButtonObserver() {
    if (helpButtonsObserver || typeof MutationObserver !== 'function' || !DOCUMENT) {
      return;
    }
    var root = DOCUMENT.body || DOCUMENT.documentElement;
    if (!root) {
      return;
    }
    try {
      helpButtonsObserver = new MutationObserver(handleHelpButtonMutations);
      helpButtonsObserver.observe(root, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ['data-onboarding-tour-trigger', 'id']
      });
    } catch (error) {
      safeWarn('cine.features.onboardingTour could not observe help trigger mutations.', error);
      helpButtonsObserver = null;
    }
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
    var forceRefresh = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    ensureHelpButtonObserver();
    var canUseCache = !forceRefresh && Array.isArray(helpButtonsCache) && helpButtonsCache.length > 0;
    if (canUseCache) {
      var filtered = [];
      for (var index = 0; index < helpButtonsCache.length; index += 1) {
        var button = helpButtonsCache[index];
        if (!button || typeof button.addEventListener !== 'function') {
          continue;
        }
        if (typeof button.isConnected === 'boolean' && !button.isConnected) {
          continue;
        }
        if (!matchesHelpTrigger(button)) {
          continue;
        }
        filtered.push(button);
      }
      if (filtered.length) {
        helpButtonsCache = filtered;
        return filtered;
      }
    }
    var buttons = [];
    var seen = new Set();
    if (DOCUMENT && typeof DOCUMENT.querySelectorAll === 'function') {
      var candidates = DOCUMENT.querySelectorAll(HELP_TRIGGER_SELECTOR);
      for (var _index14 = 0; _index14 < candidates.length; _index14 += 1) {
        var _button = candidates[_index14];
        if (!_button || typeof _button.addEventListener !== 'function') {
          continue;
        }
        if (seen.has(_button)) {
          continue;
        }
        seen.add(_button);
        buttons.push(_button);
      }
    }
    if (DOCUMENT && typeof DOCUMENT.getElementById === 'function') {
      var fallback = DOCUMENT.getElementById(HELP_BUTTON_ID);
      if (fallback && typeof fallback.addEventListener === 'function' && !seen.has(fallback)) {
        buttons.push(fallback);
      }
    }
    helpButtonsCache = buttons;
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
    var countableSteps = stepList.filter(isCountableStep);
    var total = countableSteps.length;
    var completedCount = Math.min(getCountableCompletedCount(stepList, completedSet), total);
    var activeKey = stored && typeof stored.activeStep === 'string' ? stored.activeStep : null;
    var activeIndex = activeKey ? allowedKeys.indexOf(activeKey) : -1;
    var nextStep = getNextCountableStep(stepList, completedSet);
    var nextKey = nextStep ? nextStep.key : null;
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
    for (var _index15 = 0; _index15 < tokens.length; _index15 += 1) {
      var token = tokens[_index15];
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
      buttons = collectHelpButtons(true);
    }
    if (!buttons.length) {
      applyHelpStatus();
      return;
    }
    var state = storedState || loadStoredState();
    var steps = getStepConfig();
    var totalCountableSteps = getCountableStepTotal(steps);
    var completedRaw = state && Array.isArray(state.completedSteps) ? state.completedSteps : [];
    var completedSet = new Set(completedRaw);
    var completedCount = getCountableCompletedCount(steps, completedSet);
    var labelTemplate = tourTexts.resumeLabelWithProgress || tourTexts.resumeLabel;
    var label;
    if (state && state.completed) {
      label = tourTexts.restartLabel || tourTexts.startLabel || 'Start guided tutorial';
    } else if (state && state.activeStep) {
      if (labelTemplate) {
        label = labelTemplate.replace('{completed}', String(Math.min(completedCount, totalCountableSteps))).replace('{total}', String(totalCountableSteps));
      }
      if (!label) {
        label = tourTexts.resumeLabel || tourTexts.startLabel || 'Resume guided tutorial';
      }
    } else if (completedCount > 0) {
      if (labelTemplate) {
        label = labelTemplate.replace('{completed}', String(Math.min(completedCount, totalCountableSteps))).replace('{total}', String(totalCountableSteps));
      }
    } else {
      label = tourTexts.startLabel || 'Start guided tutorial';
    }
    var fallbackLabelSource = typeof tourTexts.startLabel === 'string' && tourTexts.startLabel.trim() ? tourTexts.startLabel.trim() : 'Start guided tutorial';
    var normalizedLabel = typeof label === 'string' && label.trim() ? label.trim() : fallbackLabelSource;
    for (var index = 0; index < buttons.length; index += 1) {
      var button = buttons[index];
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
    var startFromHelp = function startFromHelp() {
      storedState = loadStoredState();
      var hasProgress = Boolean(storedState && Array.isArray(storedState.completedSteps) && storedState.completedSteps.length > 0);
      var resume = hasProgress && Boolean(storedState && storedState.activeStep);
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