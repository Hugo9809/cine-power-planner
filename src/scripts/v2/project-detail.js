/**
 * Cine Power Planner V2 - Project Detail View
 * =============================================
 * Handles the project detail view with tabs for Camera Package, 
 * Power Summary, Requirements, and Gear List.
 */

// Polyfill global for legacy code
const global = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : {};


// =====================
// CONFIGURATION
// =====================
// =====================
// CONFIGURATION
// =====================
const VIEW_ID = 'view-project-detail';
const STORAGE_KEY = 'cameraPowerPlanner_setups';
const TABS = ['camera', 'power', 'requirements', 'kit'];
const DEFAULT_TAB = 'camera';

// =====================
// STATE
// =====================
let currentProject = null;
let currentTab = DEFAULT_TAB;
let isInitialized = false;
let _cachedProjectData = null; // Cache for current project data

// =====================
// TAB MANAGEMENT
// =====================

/**
 * Switch to a specific tab
 */
function switchTab(tabId) {
  if (!TABS.includes(tabId)) {
    console.warn(`[ProjectDetail] Invalid tab: ${tabId}`);
    return;
  }

  currentTab = tabId;

  // Update tab buttons
  const tabBtns = document.querySelectorAll('#view-project-detail .v2-tab-btn');
  tabBtns.forEach(btn => {
    const isActive = btn.dataset.tab === tabId;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  // Update tab panes
  const tabPanes = document.querySelectorAll('#view-project-detail .v2-tab-pane');
  tabPanes.forEach(pane => {
    const isActive = pane.id === `tab-${tabId}`;
    pane.classList.toggle('active', isActive);
    pane.hidden = !isActive;
  });

  // Dispatch event
  document.dispatchEvent(new CustomEvent('v2:tabchange', {
    detail: { tab: tabId, project: currentProject }
  }));

  if (tabId === 'power') {
    // Slight delay to ensure visibility transitions finish if any
    setTimeout(() => renderV2Diagram(), 10);
  }
}

/**
 * Get current tab
 */
function getCurrentTab() {
  return currentTab;
}

// =====================
// DATA HELPERS
// =====================

/**
 * Format a date for display
 */
function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch (_e) {
    void _e;
    return '';
  }
}

/**
 * Format a date range string "YYYY-MM-DD to YYYY-MM-DD"
 */
function formatDateRange(rangeStr) {
  if (!rangeStr || typeof rangeStr !== 'string') return '';
  const parts = rangeStr.split(' to ');
  if (parts.length === 1) return formatDate(parts[0]);
  if (parts.length === 2) {
    return `${formatDate(parts[0])} - ${formatDate(parts[1])}`;
  }
  return rangeStr;
}

/**
 * Translation Helper
 */
function _t(path, params = {}) {
  const lang = document.documentElement.lang || 'en';
  let root = (window.texts && window.texts[lang]) ? window.texts[lang] : null;
  if (!root && window.texts) root = window.texts['en'];

  const resolve = (obj, p) => p.split('.').reduce((o, i) => o ? o[i] : null, obj);

  let val = root ? resolve(root, path) : null;

  if (!val && lang !== 'en' && window.texts && window.texts['en']) {
    val = resolve(window.texts['en'], path);
  }

  if (!val) return path;

  if (typeof val === 'string') {
    for (const [k, v] of Object.entries(params)) {
      val = val.replace(`{${k}}`, v);
    }
  }
  return val;
}

/**
 * Get project data from storage
 */
/**
 * Refresh the project data cache
 */
function refreshProjectDataCache() {
  // [Fix] Try to load from centralized cineStorage cache first (supports IndexedDB/Migration)
  if (global.cineStorage && typeof global.cineStorage.getProjectMemoryCache === 'function') {
    try {
      const cache = global.cineStorage.getProjectMemoryCache();
      if (cache) {
        _cachedProjectData = {};
        Object.keys(cache).forEach(key => {
          let name = key;
          // Handle sharded keys like user_uuid_cameraPowerPlanner_prj_TestProject
          if (key.includes('cameraPowerPlanner_prj_')) {
            const parts = key.split('cameraPowerPlanner_prj_');
            if (parts.length > 1 && parts[1]) {
              name = parts[1];
            }
          }
          // Handle monolith if expanded (unlikely in memory cache but possible?)
          // Memory cache keys are storage keys. 

          // Map to simple name for this view
          _cachedProjectData[name] = cache[key];
        });
        console.log('[ProjectDetail] Cache refreshed from cineStorage. Keys:', Object.keys(_cachedProjectData).length);
        return;
      }
    } catch (e) {
      console.warn('[ProjectDetail] Failed to read from cineStorage cache:', e);
    }
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      _cachedProjectData = JSON.parse(stored);
    } else {
      _cachedProjectData = {};
    }
  } catch (e) {
    console.error('[ProjectDetail] Failed to parse project data:', e);
    _cachedProjectData = {};
  }
}

/**
 * Get project data from storage (via cache)
 */
function getProjectData(projectName) {
  if (_cachedProjectData === null) {
    refreshProjectDataCache();
  }

  if (_cachedProjectData && _cachedProjectData[projectName]) {
    const project = _cachedProjectData[projectName];
    return {
      prepDays: project.prepDays || [],
      shootingDays: project.shootingDays || [],
      returnDays: project.returnDays || [],
      status: project.status || (project.archived ? 'Archived' : 'Planning')
    };
  }

  return { prepDays: [], shootingDays: [], returnDays: [], status: 'Planning' };
}

/**
 * Update project status
 */
/**
 * Update project status
 */
function updateProjectStatus(projectName, status) {
  try {
    // Ensure cache is fresh
    refreshProjectDataCache();
    const data = _cachedProjectData || {};

    if (data && data[projectName]) {
      data[projectName].status = status;

      // Sync archived flag
      if (status === 'Archived') {
        data[projectName].archived = true;
      } else {
        data[projectName].archived = false;
      }

      const statusUpdateError = _t('v2.detail.errors.statusUpdateFailed');
      let didPersist = false;

      if (global.cineStorage && typeof global.cineStorage.saveProject === 'function') {
        global.cineStorage.saveProject(projectName, data[projectName]);
        didPersist = true;
      } else if (typeof global.saveProject === 'function') {
        global.saveProject(projectName, data[projectName]);
        didPersist = true;
      } else if (typeof global.resolveSafeLocalStorage === 'function') {
        const safeStorage = global.resolveSafeLocalStorage();
        if (safeStorage) {
          safeStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          didPersist = true;
        }
      } else if (global.cineStorage && typeof global.cineStorage.safeSetLocalStorage === 'function') {
        global.cineStorage.safeSetLocalStorage(STORAGE_KEY, JSON.stringify(data));
        didPersist = true;
      }

      if (!didPersist) {
        alert(statusUpdateError);
        return false;
      }

      // Update cache - strictly not needed as we modified the object in place, but safe
      _cachedProjectData = data;

      return true;
    }
  } catch (e) {
    console.error('[ProjectDetail] Failed to update status:', e);
    alert(_t('v2.detail.errors.statusUpdateFailed'));
  }
  return false;
}

// =====================
// PROJECT LOADING
// =====================

/**
 * Load project data into the detail view
 */
async function loadProject(projectName) {
  if (!projectName) {
    console.warn('[ProjectDetail] No project name provided');
    return false;
  }

  // Force refresh cache to ensure we have the latest data from persistence
  refreshProjectDataCache();

  currentProject = projectName;

  // Update project name in header
  const nameElement = document.getElementById('v2ProjectName');
  if (nameElement) {
    nameElement.textContent = projectName;
  }

  // Load project via legacy shim
  if (global.cineLegacyShim) {
    await global.cineLegacyShim.loadProject(projectName);
  }

  // Update Project Periods in Header
  const projectData = getProjectData(projectName);
  const periodsContainer = document.getElementById('v2ProjectPeriods');
  const statusSelect = document.getElementById('v2ProjectStatus');

  // Update Status Select
  if (statusSelect) {
    statusSelect.value = projectData.status;
    updateStatusSelectStyle(statusSelect);

    // Remove old listeners to prevent duplicates (cloning is a quick hack)
    const statusSelectParent = statusSelect.parentNode;
    const newSelect = statusSelectParent ? statusSelect.cloneNode(true) : statusSelect;
    if (statusSelectParent) {
      statusSelectParent.replaceChild(newSelect, statusSelect);
    }

    newSelect.addEventListener('change', (e) => {
      const newStatus = e.target.value;
      updateProjectStatus(projectName, newStatus);
      updateStatusSelectStyle(newSelect);

      // If archived, maybe we should warn or just do it?
      // For now just do it.
    });
  }

  if (periodsContainer) {
    let html = '';

    // Render all Prep dates
    if (Array.isArray(projectData.prepDays)) {
      projectData.prepDays.forEach(range => {
        const fmt = formatDateRange(range);
        if (fmt) html += `<span class="v2-header-badge prep" title="Prep Dates: ${fmt}"><span class="period-icon">📅</span> ${fmt}</span>`;
      });
    }

    // Render all Shoot dates
    if (Array.isArray(projectData.shootingDays)) {
      projectData.shootingDays.forEach(range => {
        const fmt = formatDateRange(range);
        if (fmt) html += `<span class="v2-header-badge shoot" title="Shooting Dates: ${fmt}"><span class="period-icon">🎥</span> ${fmt}</span>`;
      });
    }

    // Render all Return dates
    if (Array.isArray(projectData.returnDays)) {
      projectData.returnDays.forEach(range => {
        const fmt = formatDateRange(range);
        if (fmt) html += `<span class="v2-header-badge return" title="Return Dates: ${fmt}"><span class="period-icon">🚛</span> ${fmt}</span>`;
      });
    }

    periodsContainer.innerHTML = html;
    periodsContainer.style.display = html ? 'flex' : 'none';
  }

  // No need to manually sync if we are reparenting the actual live elements
  // But we might want to trigger a refresh just in case

  console.log(`[ProjectDetail] Loaded project: ${projectName}`);
  return true;
}

/**
 * Get current project name
 */
function getCurrentProject() {
  return currentProject;
}

// =====================
// BACK NAVIGATION
// =====================

/**
 * Navigate back to projects dashboard
 */
function goBack() {
  if (global.cineViewManager) {
    global.cineViewManager.showView('projects');
  }
}

// =====================
// VIEW RENDERING
// =====================

/**
 * Create the project detail view container if it doesn't exist
 */
function createViewContainer() {
  if (document.getElementById(VIEW_ID)) return document.getElementById(VIEW_ID);

  const view = document.createElement('section');
  view.id = VIEW_ID;
  view.className = 'app-view';
  // Initially hidden

  const v2Main = document.querySelector('.v2-main');
  if (v2Main) {
    v2Main.appendChild(view);
  }
  return view;
}

/**
 * Create the project detail view HTML
 */
function createDetailViewContent() {
  const view = createViewContainer();
  if (!view) return;

  // ... rest of content generation ...

  view.innerHTML = `
      <header class="view-header view-header-with-back">
        <button type="button" class="v2-back-btn" id="v2BackToProjects" aria-label="${_t('v2.detail.backButton')}">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          <span>${_t('v2.detail.backButton')}</span>
        </button>
        <h1 id="v2ProjectName" class="view-header-title">Project</h1>
        <div class="v2-header-status">
            <select id="v2ProjectStatus" class="v2-status-select">
                <option value="Draft">${_t('v2.dashboard.status.draft')}</option>
                <option value="Planning">${_t('v2.dashboard.status.planning')}</option>
                <option value="Waiting for Approval">${_t('v2.dashboard.status.waitingForApproval')}</option>
                <option value="Approved">${_t('v2.dashboard.status.approved')}</option>
                <option value="Shooting">${_t('v2.dashboard.status.shooting')}</option>
                <option value="Completed">${_t('v2.dashboard.status.completed')}</option>
                <option value="Archived">${_t('v2.dashboard.status.archived')}</option>
            </select>
        </div>
        <div id="v2ProjectPeriods" class="v2-header-periods" style="display: none;"></div>
        <div class="view-header-actions">
          <button type="button" class="v2-btn v2-btn-ghost" id="v2PrintProjectBtn" title="${_t('v2.detail.header.print')}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
          </button>
          <button type="button" class="v2-btn v2-btn-ghost" id="v2GenerateReqsGearBtn" title="${_t('v2.detail.header.generateReqs')}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
               <polyline points="14 2 14 8 20 8"></polyline>
               <line x1="16" y1="13" x2="8" y2="13"></line>
               <line x1="16" y1="17" x2="8" y2="17"></line>
               <line x1="10" y1="9" x2="8" y2="9"></line>
            </svg>
            <span class="v2-btn-label">${_t('v2.detail.header.generateReqs')}</span>
          </button>
          <button type="button" class="v2-btn v2-btn-ghost" id="v2ExportProjectBtn" title="${_t('v2.detail.header.export')}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
               <polyline points="16 6 12 2 8 6"/>
               <line x1="12" y1="2" x2="12" y2="15"/>
            </svg>
            <span class="v2-btn-label">${_t('v2.detail.header.export')}</span>
          </button>
          <button type="button" class="v2-btn v2-btn-ghost" id="v2GenerateOverviewBtn" title="${_t('v2.detail.header.generateOverview')}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
               <polyline points="14 2 14 8 20 8"></polyline>
               <line x1="16" y1="13" x2="8" y2="13"></line>
               <line x1="16" y1="17" x2="8" y2="17"></line>
               <line x1="10" y1="9" x2="8" y2="9"></line>
            </svg>
            <span class="v2-btn-label">${_t('v2.detail.header.generateOverview')}</span>
          </button>
          <button type="button" class="v2-btn v2-btn-secondary" id="v2SaveProjectBtn">
            ${_t('v2.detail.header.save')}
          </button>
        </div>
      </header>


      
      <!-- Tab Navigation (Sticky Top) -->
      <nav class="v2-tabs-nav" role="tablist" aria-label="Project sections">
        <button type="button" class="v2-tab-btn active" data-tab="camera" role="tab" aria-selected="true" aria-controls="tab-camera">
          ${_t('v2.detail.tabs.cameraPackage')}
        </button>
        <button type="button" class="v2-tab-btn" data-tab="power" role="tab" aria-selected="false" aria-controls="tab-power">
          ${_t('v2.detail.tabs.powerSummary')}
        </button>
        <button type="button" class="v2-tab-btn" data-tab="requirements" role="tab" aria-selected="false" aria-controls="tab-requirements">
          ${_t('v2.detail.tabs.requirements')}
        </button>
        <button type="button" class="v2-tab-btn" data-tab="kit" role="tab" aria-selected="false" aria-controls="tab-kit">
          ${_t('v2.detail.tabs.gearList')}
        </button>
      </nav>

      <div class="view-content">
        <!-- Tab Content -->
        <div class="v2-tab-content" style="padding-top: var(--v2-space-lg);">
          <!-- Camera Package Tab -->
          <section id="tab-camera" class="v2-tab-pane active" role="tabpanel" aria-labelledby="tab-camera-btn">
            ${renderCameraPackageTab()}
          </section>
          
          <!-- Power Summary Tab -->
          <section id="tab-power" class="v2-tab-pane" role="tabpanel" aria-labelledby="tab-power-btn" hidden>
            ${renderPowerSummaryTab()}
          </section>
          
          <!-- Requirements Tab -->
          <section id="tab-requirements" class="v2-tab-pane" role="tabpanel" aria-labelledby="tab-requirements-btn" hidden>
            <div class="v2-card">
              <div class="v2-card-header">
                <h2>${_t('v2.detail.actions.projectRequirements')}</h2>
                <button type="button" class="v2-btn v2-btn-primary" id="v2GenerateRequirementsBtn">
                  ${_t('v2.detail.actions.generateRequirements')}
                </button>
              </div>
              <div class="v2-card-body" id="v2RequirementsContainer">
                <p class="v2-text-muted">${_t('v2.detail.actions.generateRequirementsHelp')}</p>
                <div data-reparent="projectForm"></div>
                <div id="v2RequirementsOutput" class="v2-requirements-output" style="margin-top: var(--v2-space-md);"></div>
              </div>
            </div>
          </section>
          
          <!-- Gear List Tab -->
          <section id="tab-kit" class="v2-tab-pane" role="tabpanel" aria-labelledby="tab-kit-btn" hidden>
            <div class="v2-card">
              <div class="v2-card-header">
                <h2>${_t('v2.detail.actions.gearList')}</h2>
                <button type="button" class="v2-btn v2-btn-primary" id="v2GenerateGearListBtn">
                  ${_t('v2.detail.actions.generateGearList')}
                </button>
              </div>
              <div class="v2-card-body" id="v2KitListContainer">
                <p class="v2-text-muted">${_t('v2.detail.actions.generateGearListHelp')}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    `;

  bindDetailViewEvents(view);

  // Reparent legacy elements immediately
  setTimeout(() => reparentLegacyElements(view), 0);
}

/**
 * Render Camera Package tab content
 * Note: We render *containers* for the legacy selects, not the selects themselves.
 */
function renderCameraPackageTab() {
  return `
      <div id="v2-setup-config" style="padding: 0; margin: 0;">
        <div class="form-row">
          <label for="cameraSelect" id="cameraLabel">Camera:</label>
          <div data-reparent="cameraSelect"></div>
        </div>
        
        <div class="form-row" id="monitorSelectRow">
          <label for="monitorSelect" id="monitorLabel">Monitor:</label>
          <div data-reparent="monitorSelect"></div>
        </div>
        
        <div class="form-row" id="wirelessVideoRow">
          <label for="videoSelect" id="videoLabel">Wireless Transmitter:</label>
          <div data-reparent="videoSelect"></div>
        </div>

        <fieldset id="fizFieldset">
          <legend id="fizLegend">FIZ (Follow Focus) Systems</legend>
          <div class="form-row">
            <label for="motor1Select" id="fizMotorsLabel">FIZ Motors:</label>
            <div data-reparent="motor1Select"></div>
          </div>
          <div class="form-row">
            <label for="motor2Select"></label>
            <div data-reparent="motor2Select"></div>
          </div>
          <div class="form-row">
            <label for="motor3Select"></label>
            <div data-reparent="motor3Select"></div>
          </div>
          <div class="form-row">
            <label for="motor4Select"></label>
            <div data-reparent="motor4Select"></div>
          </div>
          <div class="form-row">
            <label for="controller1Select" id="fizControllersLabel">FIZ Controllers:</label>
            <div data-reparent="controller1Select"></div>
          </div>
          <div class="form-row">
            <label for="controller2Select"></label>
            <div data-reparent="controller2Select"></div>
          </div>
          <div class="form-row">
            <label for="controller3Select"></label>
            <div data-reparent="controller3Select"></div>
          </div>
          <div class="form-row">
            <label for="controller4Select"></label>
            <div data-reparent="controller4Select"></div>
          </div>
          <div class="form-row">
            <label for="distanceSelect" id="distanceLabel">Distance Sensor:</label>
            <div data-reparent="distanceSelect"></div>
          </div>
        </fieldset>

        <div class="form-row" id="batteryPlateRow">
          <label for="batteryPlateSelect" id="batteryPlateLabel">Battery Plate:</label>
          <div data-reparent="batteryPlateSelect"></div>
        </div>

        <div class="form-row" id="batterySelectRow">
          <label for="batterySelect" id="batteryLabel">Battery:</label>
          <div data-reparent="batterySelect"></div>
        </div>

        <div class="form-row" id="batteryHotswapRow">
          <label for="batteryHotswapSelect" id="batteryHotswapLabel">Battery Hotswap:</label>
          <div data-reparent="batteryHotswapSelect"></div>
        </div>
      </div>
    `;
}

/**
 * Re-parent legacy elements into the V2 view
 */
function reparentLegacyElements(view) {
  const containers = view.querySelectorAll('[data-reparent]');
  containers.forEach(container => {
    const legacyId = container.dataset.reparent;
    const legacyElement = document.getElementById(legacyId);

    if (legacyElement) {
      // Ensure it's visible (legacy might hide it)
      // ONLY force display block for inputs/selects which are expected to be always visible in V2 forms.
      // For dynamic containers (results), preserve their existing display state (handled by CSS/JS).
      const tagName = legacyElement.tagName.toLowerCase();
      if (['select', 'input', 'textarea'].includes(tagName)) {
        legacyElement.style.display = 'block';
        legacyElement.classList.add('v2-' + tagName); // Add v2-input class etc

        // For inputs, we generally want 100% width in V2 forms
        legacyElement.style.width = '100%';
        legacyElement.style.height = '';
        legacyElement.style.minHeight = '';
      } else if (tagName === 'form') {
        // Special handling for the project details form
        legacyElement.style.display = 'block';
        legacyElement.style.position = 'static'; // Reset modal positioning
        legacyElement.style.visibility = 'visible';
        legacyElement.style.width = '100%';
        legacyElement.classList.add('v2-reparented-form');
      } else {
        // For divs, uls, etc., do NOT reset display or width blindly as it breaks flex layouts (hero card)
        // Just ensure they aren't constrained by previous inline styles if reasonable, 
        // but 'display' should be left to CSS classes (.hidden handling).

        // Optional: if we want to ensure full width container:
        // legacyElement.style.width = '100%'; 

        // Check if it's one of the result elements? 
        // Actually, for results we want them to behave naturally.
      }

      legacyElement.style.whiteSpace = '';

      // Check if the element has a wrapper (which holds the favorite button)

      // Check if the element has a wrapper (which holds the favorite button)
      const wrapper = legacyElement.closest('.select-wrapper');
      const elementToMove = wrapper || legacyElement;

      // Ensure wrapper also behaves if present
      if (wrapper) {
        wrapper.classList.add('v2-select-container'); // Helper class if needed in CSS
        wrapper.style.width = '100%';
      }

      // Replace the placeholder container with the legitimate legacy wrapper/element
      // This ensures the DOM structure matches V1 exactly: .form-row > .select-wrapper > select
      container.parentNode.replaceChild(elementToMove, container);

    } else {
      console.warn(`[ProjectDetail] Legacy element not found: ${legacyId}`);
      container.innerHTML = '<span class="v2-error-text">Element missing</span>';
    }
  });
}

/**
 * Render Power Summary tab content  
 */
function renderPowerSummaryTab() {
  return `
      <div class="v2-power-grid">
        <!-- V1 Results Reparented -->
        <div id="v2-results-legacy-wrapper" class="v2-results-reparented">
          <!-- Hero Card -->
          <div data-reparent="heroCard"></div>

          <!-- Warnings -->
          <div data-reparent="pinWarning"></div>
          <div data-reparent="dtapWarning"></div>
          <div data-reparent="hotswapWarning"></div>

          <!-- Breakdown List -->
          <ul data-reparent="breakdownList"></ul>

          <!-- Power Diagram -->
          <div data-reparent="powerDiagram"></div>

          <!-- Plain Summary -->
          <div data-reparent="resultsPlainSummary"></div>

          <!-- Temperature Note -->
          <div data-reparent="temperatureNote"></div>
          
          <!-- Feedback Button -->
          <div data-reparent="runtimeFeedbackBtn"></div>
          <div data-reparent="feedbackTableContainer"></div>
        </div>

        <!-- Connection Diagram Card (V2 Wrapper) -->
        <div class="v2-card v2-diagram-card" style="margin-top: var(--v2-space-lg);">
          <div class="v2-card-header v2-card-header-with-actions">
            <h3>Connection Diagram</h3>
            <div class="v2-diagram-toolbar">
               <button type="button" class="v2-btn v2-btn-sm v2-btn-ghost" id="v2ZoomOut" title="${_t('v2.detail.diagram.zoomOut')}">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
               </button>
               <button type="button" class="v2-btn v2-btn-sm v2-btn-ghost" id="v2ResetView" title="${_t('v2.detail.diagram.resetView')}">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
               </button>
               <button type="button" class="v2-btn v2-btn-sm v2-btn-ghost" id="v2ZoomIn" title="${_t('v2.detail.diagram.zoomIn')}">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
               </button>
               <div class="v2-vr"></div>
               <button type="button" class="v2-btn v2-btn-sm v2-btn-ghost" id="v2DownloadDiagram" title="${_t('v2.detail.diagram.download')}">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
               </button>
            </div>
          </div>
          <div class="v2-card-body v2-diagram-body">
            <div id="v2-diagram-area" class="v2-diagram-area"></div>
            <div id="v2-diagram-legend" class="v2-diagram-legend"></div>
            <!-- Hidden containers required by module -->
            <div id="v2-diagram-hint" style="display:none;"></div>
          </div>
        </div>

        <!-- Battery Comparison -->
        <div class="v2-card" style="margin-top: var(--v2-space-lg);">
          <div class="v2-card-body" style="padding: 0;">
             <div data-reparent="batteryComparison" class="v2-reparent-full-width"></div>
          </div>
        </div>
      </div>
    `;
}

/**
 * Bind events for the Detail View
 */
function bindDetailViewEvents(view) {
  // Back button
  const backBtn = view.querySelector('#v2BackToProjects');
  if (backBtn) {
    backBtn.addEventListener('click', goBack);
  }

  // Print button
  const printBtn = view.querySelector('#v2PrintProjectBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      // Intercept for Status Check
      if (confirm('Do you want to set the project status to "Waiting for Approval"?')) {
        updateProjectStatus(currentProject, 'Waiting for Approval');
        const statusSelect = document.getElementById('v2ProjectStatus');
        if (statusSelect) {
          statusSelect.value = 'Waiting for Approval';
          updateStatusSelectStyle(statusSelect);
        }
      }

      console.log('[ProjectDetail] Triggering Print/Export');
      if (typeof window.openLegacyPrintDialog === 'function') {
        window.openLegacyPrintDialog();
        return;
      }

      // Fallback
      if (global.cineFeaturePrint && typeof global.cineFeaturePrint.triggerOverviewPrintWorkflow === 'function') {
        global.cineFeaturePrint.triggerOverviewPrintWorkflow({}, { reason: 'export' });
      } else if (typeof global.triggerOverviewPrintWorkflow === 'function') {
        global.triggerOverviewPrintWorkflow({}, { reason: 'export' });
      } else {
        window.print();
      }
    });
  }

  // Save button
  const saveBtn = view.querySelector('#v2SaveProjectBtn');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      if (global.cineLegacyShim && currentProject) {
        const legacySaveBtn = document.getElementById('saveSetupBtn');
        if (legacySaveBtn) legacySaveBtn.click();
      }
    });
  }



  /**
   * Helper to open the Requirements Form with synced dates
   */
  function openProjectRequirementsForm() {
    if (!currentProject) return;

    // 1. Get V2 Project Data
    const v2Data = getProjectData(currentProject);

    // 2. Get Legacy Info
    let projectInfoForForm = {};
    if (global.getCurrentProjectInfo && typeof global.getCurrentProjectInfo === 'function') {
      projectInfoForForm = global.getCurrentProjectInfo();
    } else {
      // Fallback if global info not ready (shouldn't happen if project loaded)
      projectInfoForForm = { projectName: currentProject };
    }

    // 3. Merge Dates
    // We use Object.assign to create a fresh object with enforced V2 dates
    const mergedInfo = Object.assign({}, projectInfoForForm, {
      prepDays: v2Data.prepDays || [],
      shootingDays: v2Data.shootingDays || [],
      returnDays: v2Data.returnDays || [],
      projectName: currentProject
    });

    // 4. Populate Form
    if (global.populateProjectForm && typeof global.populateProjectForm === 'function') {
      global.populateProjectForm(mergedInfo);
    } else {
      console.warn('[ProjectDetail] populateProjectForm not found');
    }

    // 5. Switch to Tab
    switchTab('requirements');

    // Scroll top
    const tab = document.getElementById('tab-requirements');
    if (tab) tab.scrollIntoView({ behavior: 'smooth' });
  }

  // Generate Requirements & Gear List Button (Header)
  const headerReqsGearBtn = view.querySelector('#v2GenerateReqsGearBtn');
  if (headerReqsGearBtn) {
    headerReqsGearBtn.addEventListener('click', () => {
      openProjectRequirementsForm();
    });
  }

  // Export button (header icon)
  const headerExportBtn = view.querySelector('#v2ExportProjectBtn');
  if (headerExportBtn) {
    headerExportBtn.addEventListener('click', () => {
      const legacyExportBtn = document.getElementById('shareSetupBtn');
      if (legacyExportBtn) legacyExportBtn.click();
    });
  }

  // Generate Overview Button (action bar)
  const headerOverviewBtn = view.querySelector('#v2GenerateOverviewBtn');
  if (headerOverviewBtn) {
    headerOverviewBtn.addEventListener('click', () => {
      const legacyBtn = document.getElementById('generateOverviewBtn');
      if (legacyBtn) legacyBtn.click();
    });
  }

  // Requirements Tab "Save & Generate" Button
  const requirementsTabSaveBtn = view.querySelector('#v2GenerateRequirementsBtn');
  if (requirementsTabSaveBtn) {
    requirementsTabSaveBtn.innerHTML = '<i class="fas fa-save"></i> Save & Generate Gear List';
    requirementsTabSaveBtn.addEventListener('click', () => {
      // 1. Collect Form Data
      let collectedFormData = {};
      if (global.collectProjectFormData && typeof global.collectProjectFormData === 'function') {
        collectedFormData = global.collectProjectFormData();
      } else {
        console.warn('[ProjectDetail] collectProjectFormData not found');
      }

      // 2. Update Global State
      // Note: generateGearListHtml uses the passed argument, but we should also ensure app state is consistent if possible.
      // But relying on formData passed to generator is the safest V1 patterns.

      // 3. Generate Content
      let generatedHtml = '';
      if (global.generateGearListHtml && typeof global.generateGearListHtml === 'function') {
        generatedHtml = global.generateGearListHtml(collectedFormData);
      } else {
        alert('Error: Generator module not found.');
        return;
      }

      // 4. Split and Inject
      if (global.getSafeGearListHtmlSections && typeof global.getSafeGearListHtmlSections === 'function') {
        const gearHtmlSections = global.getSafeGearListHtmlSections(generatedHtml);


        // Inject Project Requirements Output
        const reqsContainer = document.getElementById('v2RequirementsOutput');
        if (reqsContainer) {
          if (gearHtmlSections.projectHtml) {
            reqsContainer.innerHTML = gearHtmlSections.projectHtml;
            reqsContainer.style.display = 'block';
          } else {
            reqsContainer.style.display = 'none';
          }
        }

        // Inject Gear List
        const kitContainer = document.getElementById('v2KitListContainer');
        if (kitContainer && gearHtmlSections.gearHtml) {
          kitContainer.innerHTML = gearHtmlSections.gearHtml;
        } else if (kitContainer) {
          kitContainer.innerHTML = '<p class="v2-text-muted">No gear list items generated.</p>';
        }

        alert('Requirements Saved & Gear List Generated!');
      }
    });
  }

  // Gear List Tab "Generate" Button
  const gearTabGenerateBtn = view.querySelector('#v2GenerateGearListBtn');
  if (gearTabGenerateBtn) {
    gearTabGenerateBtn.addEventListener('click', () => {
      openProjectRequirementsForm();
    });
  }

  // Tab buttons
  const tabBtns = view.querySelectorAll('.v2-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      switchTab(tabId);
    });
  });

  // Download Diagram button
  const downloadDiagramBtn = view.querySelector('#v2DownloadDiagram');
  if (downloadDiagramBtn) {
    downloadDiagramBtn.addEventListener('click', (e) => {
      // Trigger the legacy download handler from app-session.js
      const legacyBtn = document.getElementById('downloadDiagram');
      if (legacyBtn) {
        // Create a new event with the same shiftKey state for JPG export
        const syntheticEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          shiftKey: e.shiftKey
        });
        legacyBtn.dispatchEvent(syntheticEvent);
      } else {
        console.warn('[ProjectDetail] Legacy download button not found');
      }
    });
  }


  // Inject Add Custom Buttons
  setTimeout(() => injectAddCustomButtons(view), 0);
}

// =====================
// DIAGRAM RENDERING
// =====================



/**
 * Initialize and render the Connection Diagram in V2 container
 */
function renderV2Diagram() {
  if (!currentProject) return;

  // Check if module is available
  if (!global.cineFeaturesConnectionDiagram || typeof global.cineFeaturesConnectionDiagram.createConnectionDiagram !== 'function') {
    console.warn('[ProjectDetail] Connection Diagram module not found.');
    return;
  }

  const container = document.getElementById('v2-diagram-area');
  if (!container) return; // Tab might be hidden or not rendered

  console.log('[ProjectDetail] Rendering Power Diagram...');

  // If we already have an instance, we might want to just let it update?
  // The current module helper creates a new one every time, but handles cleanups internally if we re-call it?
  // Actually createConnectionDiagram returns an object with { enableDiagramInteractions, ... }
  // It clears the container.

  // Ensure the legacy dialog elements are accessible in V2 mode
  // Move them to the V2 container if they're currently hidden in mainContent
  const ensureDialogAccessible = () => {
    const dialog = document.getElementById('diagramDetailDialog');
    if (dialog && dialog.closest('#mainContent')) {
      // Move dialog to body so it's not hidden when mainContent is display:none
      document.body.appendChild(dialog);
    }
    return dialog;
  };

  const context = {
    // Override UI getters to point to V2 elements
    getSetupDiagramContainer: () => document.getElementById('v2-diagram-area'),
    getDiagramLegend: () => document.getElementById('v2-diagram-legend'),
    getDiagramHint: () => document.getElementById('v2-diagram-hint'),
    getDownloadDiagramBtn: () => document.getElementById('v2DownloadDiagram'),
    getZoomInBtn: () => document.getElementById('v2ZoomIn'),
    getZoomOutBtn: () => document.getElementById('v2ZoomOut'),
    getResetViewBtn: () => document.getElementById('v2ResetView'),

    // Explicit dialog getters to ensure accessibility in V2 mode
    getDiagramDetailDialog: ensureDialogAccessible,
    getDiagramDetailContent: () => document.getElementById('diagramDetailDialogContent'),

    // Use existing global getters for data inputs (since we reparented the actual elements)
    // The module defaults to GLOBAL_SCOPE.cameraSelect etc. which still works.
  };

  // Inject diagram CSS if needed
  if (!document.getElementById('v2-diagram-css')) {
    const css = (typeof global.cineFeaturesConnectionDiagram.getDiagramCss === 'function')
      ? global.cineFeaturesConnectionDiagram.getDiagramCss(false)
      : '';

    if (css) {
      const style = document.createElement('style');
      style.id = 'v2-diagram-css';
      style.textContent = css;
      document.head.appendChild(style);
    }
  }

  try {
    global.cineFeaturesConnectionDiagram.createConnectionDiagram(context);
  } catch (e) {
    console.error('[ProjectDetail] Error rendering diagram:', e);
  }
}

/**
 * Helper to update status select style
 */
function updateStatusSelectStyle(selectElement) {
  const status = selectElement.value;
  const statusClass = status.toLowerCase().replace(/\s+/g, '-');

  // Remove all status classes
  selectElement.classList.remove('draft', 'planning', 'waiting-for-approval', 'approved', 'shooting', 'completed', 'archived');

  // Add current
  selectElement.classList.add(statusClass);
}

// =====================
// DATA SYNC
// =====================

/**
 * Sync legacy calculation results to V2 UI
 */
function syncLegacyResultsToV2() {
  // Legacy IDs: heroTotalDraw, heroRuntime, heroBatteryCount, heroCurrent144, heroCurrent12
  // V2 IDs: v2TotalDraw, v2Runtime, v2BatteryCount, v2Current144, v2Current12

  const map = {
    'heroTotalDraw': 'v2TotalDraw',
    'heroRuntime': 'v2Runtime',
    'heroBatteryCount': 'v2BatteryCount',
    'heroCurrent144': 'v2Current144',
    'heroCurrent12': 'v2Current12'
  };

  Object.keys(map).forEach(legacyId => {
    const legacyEl = document.getElementById(legacyId);
    const v2El = document.getElementById(map[legacyId]);

    if (legacyEl && v2El) {
      v2El.textContent = legacyEl.textContent;
    }
  });

  // Also refresh diagram if visible
  if (getCurrentTab() === 'power') {
    // Debounce slightly to allow legacy calculations to settle if they modify DOM attributes
    setTimeout(() => renderV2Diagram(), 50);
  }
}

/**
 * Setup observer to watch for legacy DOM changes (calculation updates)
 */
function setupPowerObserver() {
  // Note: We observe the results container, not a specific node.
  // The observer callback doesn't need to inspect mutations, just re-sync.
  const legacyResultContainer = document.getElementById('results');

  if (!legacyResultContainer) {
    console.warn('[ProjectDetail] Legacy results container not found. Auto-sync disabled.');
    return;
  }

  const observer = new MutationObserver(() => {
    syncLegacyResultsToV2();
  });

  observer.observe(legacyResultContainer, {
    childList: true,
    subtree: true,
    characterData: true
  });

  console.log('[ProjectDetail] Power observer started');
}

// =====================
// INITIALIZATION
// =====================

/**
 * Initialize module
 */
function init() {
  if (isInitialized) return;
  isInitialized = true;

  // Setup power observer
  setupPowerObserver();

  // [Added by Agent] Initial sync to capture state that existed before observer started
  syncLegacyResultsToV2();

  // Listen for view changes
  document.addEventListener('v2:viewchange', handleViewChange);

  // Check if we're already on projectDetail view (handles race condition on page refresh)
  // ViewManager may have already dispatched the event before we attached our listener
  if (global.cineViewManager && typeof global.cineViewManager.getCurrentView === 'function') {
    const currentView = global.cineViewManager.getCurrentView();
    if (currentView === 'projectDetail') {
      const currentParams = global.cineViewManager.getCurrentParams ? global.cineViewManager.getCurrentParams() : {};
      if (currentParams && currentParams.projectId) {
        console.log('[ProjectDetail] Already on projectDetail, triggering render');
        handleViewChange({ detail: { view: 'projectDetail', params: currentParams } });
      }
    }
  }

  console.log('[ProjectDetail] Initialized');
}

/**
 * Handle view change events
 */
async function handleViewChange(event) {
  const { view, params } = event.detail || {};

  if (view === 'projectDetail' && params && params.projectId) {
    console.log('[ProjectDetail] View change detected, loading:', params.projectId);

    // Get the view container
    const viewElement = document.getElementById(VIEW_ID);
    if (!viewElement) {
      console.warn('[ProjectDetail] View element not found:', VIEW_ID);
      return;
    }

    // Create content if not already created
    // Note: createDetailViewContent() sets innerHTML directly, doesn't return a value
    if (!viewElement.querySelector('.view-header')) {
      createDetailViewContent();
    }

    // Load the project
    await loadProject(params.projectId);

    // Switch to the requested tab if provided
    if (params.tab) {
      switchTab(params.tab);
    }

    // Handle specific actions (e.g. print)
    if (params.action === 'print') {
      console.log('[ProjectDetail] Auto-triggering print workflow');
      setTimeout(() => {
        if (global.cineFeaturePrint && typeof global.cineFeaturePrint.triggerOverviewPrintWorkflow === 'function') {
          global.cineFeaturePrint.triggerOverviewPrintWorkflow({}, { reason: 'export' });
        } else if (typeof global.triggerOverviewPrintWorkflow === 'function') {
          global.triggerOverviewPrintWorkflow({}, { reason: 'export' });
        } else {
          window.print();
        }
      }, 800); // Wait for transitions/render
    }
  }
}

// =====================
// LEGACY MODAL INTEGRATION
// =====================

/**
 * Slugify a string (matching legacy logic)
 */
function slugify(text) {
  if (typeof text !== 'string') return '';
  return text.trim().toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Trigger the legacy "Add Custom Item" dialog for a specific category
 */
function triggerLegacyAddCustom(translationKey) {
  // 1. Get localized label
  const localizedLabel = global.texts ? global.texts[translationKey] : null;
  if (!localizedLabel) {
    console.warn(`[ProjectDetail] Translation key not found: ${translationKey}`);
    return;
  }

  // 2. Generate slug
  const slug = slugify(localizedLabel);
  console.log(`[ProjectDetail] Triggering Add Custom for: ${localizedLabel} (${slug})`);

  // 3. Find the legacy button
  // The legacy button is in the hidden #gearListOutput table
  const legacyBtn = document.querySelector(`[data-gear-custom-add="${slug}"]`);

  if (legacyBtn) {
    legacyBtn.click();
  } else {
    console.warn(`[ProjectDetail] Legacy Add Button not found for slug: ${slug}`);
    // Fallback: If the row doesn't exist yet (empty category), we might need to find the "Add Custom Item"
    // button in a different way or force the category to appear.
    // However, usually "Add Custom" buttons are always present in the legacy view if the category is valid.
    alert(`Could not open Add Custom dialog for ${localizedLabel}. Legacy element missing.`);
  }
}

/**
 * Inject "+" buttons into V2 cards
 */
function injectAddCustomButtons(view) {
  // Definition of where to inject buttons and mapped categories
  const targets = [
    { cardId: 'v2-camera-card', key: 'category_cameras' },
    { cardId: 'v2-power-card', key: 'category_batteries' },
    // Add more as needed:
    // { cardId: 'v2-monitor-card', key: 'category_monitors' },
    // { cardId: 'v2-wireless-card', key: 'category_video' }
  ];

  targets.forEach(({ cardId, key }) => {
    const card = view.querySelector(`#${cardId}`);
    if (!card) return;

    const header = card.querySelector('.v2-card-header');
    if (!header) return;

    // Prevent duplicate injection
    if (header.querySelector('.v2-add-custom-btn')) return;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'v2-btn v2-btn-sm v2-btn-ghost v2-add-custom-btn';
    btn.title = 'Add Custom Item';
    btn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      `;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      triggerLegacyAddCustom(key);
    });

    header.appendChild(btn);
  });
}

// =====================
// EXPORTS
// =====================

// Define the ProjectDetail API object
const ProjectDetail = {
  init,
  createDetailViewContent,
  loadProject,
  getCurrentProject,
  switchTab,
  getCurrentTab,
  syncLegacyResultsToV2
};

// Expose to global scope for legacy compatibility
if (typeof global !== 'undefined') {
  global.cineProjectDetail = ProjectDetail;
}

if (typeof window !== 'undefined') {
  window.cineProjectDetail = ProjectDetail;
}

// ESM export
export { ProjectDetail };
