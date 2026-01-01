/**
 * Cine Power Planner V2 - Project Detail View
 * =============================================
 * Handles the project detail view with tabs for Camera Package, 
 * Power Summary, Requirements, and Gear List.
 */

(function (global) {
  'use strict';

  // =====================
  // CONFIGURATION
  // =====================
  const VIEW_ID = 'view-project-detail';
  const TABS = ['camera', 'power', 'requirements', 'kit'];
  const DEFAULT_TAB = 'camera';

  // =====================
  // STATE
  // =====================
  let currentProject = null;
  let currentTab = DEFAULT_TAB;
  let isInitialized = false;

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
  }

  /**
   * Get current tab
   */
  function getCurrentTab() {
    return currentTab;
  }

  // =====================
  // PROJECT LOADING
  // =====================

  /**
   * Load project data into the detail view
   */
  function loadProject(projectName) {
    if (!projectName) {
      console.warn('[ProjectDetail] No project name provided');
      return false;
    }

    currentProject = projectName;

    // Update project name in header
    const nameElement = document.getElementById('v2ProjectName');
    if (nameElement) {
      nameElement.textContent = projectName;
    }

    // Load project via legacy shim
    if (global.cineLegacyShim) {
      global.cineLegacyShim.loadProject(projectName);
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
   * Create the project detail view HTML
   */
  function createDetailViewContent() {
    const view = document.getElementById(VIEW_ID);
    if (!view) return;

    view.innerHTML = `
      <header class="view-header view-header-with-back">
        <button type="button" class="v2-back-btn" id="v2BackToProjects" aria-label="Back to projects">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          <span>Projects</span>
        </button>
        <h1 id="v2ProjectName" class="view-header-title">Project</h1>
        <div class="view-header-actions">
          <button type="button" class="v2-btn v2-btn-secondary" id="v2SaveProjectBtn">
            Save
          </button>
        </div>
      </header>
      
      <div class="view-content">
        <!-- Tab Navigation (Horizontal) -->
        <nav class="v2-tabs-nav" role="tablist" aria-label="Project sections">
          <button type="button" class="v2-tab-btn active" data-tab="camera" role="tab" aria-selected="true" aria-controls="tab-camera">
            Camera Package
          </button>
          <button type="button" class="v2-tab-btn" data-tab="power" role="tab" aria-selected="false" aria-controls="tab-power">
            Power Summary
          </button>
          <button type="button" class="v2-tab-btn" data-tab="requirements" role="tab" aria-selected="false" aria-controls="tab-requirements">
            Requirements
          </button>
          <button type="button" class="v2-tab-btn" data-tab="kit" role="tab" aria-selected="false" aria-controls="tab-kit">
            Gear List
          </button>
        </nav>
        
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
                <h2>Project Requirements</h2>
                <button type="button" class="v2-btn v2-btn-primary" id="v2GenerateRequirementsBtn">
                  Generate Requirements
                </button>
              </div>
              <div class="v2-card-body" id="v2RequirementsContainer">
                <p class="v2-text-muted">Click "Generate Requirements" to create your production report.</p>
              </div>
            </div>
          </section>
          
          <!-- Gear List Tab -->
          <section id="tab-kit" class="v2-tab-pane" role="tabpanel" aria-labelledby="tab-kit-btn" hidden>
            <div class="v2-card">
              <div class="v2-card-header">
                <h2>Gear List</h2>
                <button type="button" class="v2-btn v2-btn-primary" id="v2GenerateGearListBtn">
                  Generate Gear List
                </button>
              </div>
              <div class="v2-card-body" id="v2KitListContainer">
                <p class="v2-text-muted">Click "Generate Gear List" to create your equipment list.</p>
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
      <div class="v2-device-grid">
        <!-- ROW 1: Camera, Monitor, Wireless -->
        <!-- Camera Section -->
        <div class="v2-card v2-device-card">
          <div class="v2-card-header">
            <h3>Camera</h3>
          </div>
          <div class="v2-card-body">
            <div class="v2-form-group">
              <label class="v2-label">Camera Body</label>
              <div class="v2-select-container" data-reparent="cameraSelect"></div>
            </div>
          </div>
        </div>
        
        <!-- Monitor Section -->
        <div class="v2-card v2-device-card">
          <div class="v2-card-header">
            <h3>Monitor</h3>
          </div>
          <div class="v2-card-body">
            <div class="v2-form-group">
              <label class="v2-label">On-Camera Monitor</label>
              <div class="v2-select-container" data-reparent="monitorSelect"></div>
            </div>
          </div>
        </div>
        
        <!-- Wireless Transmitter Section -->
        <div class="v2-card v2-device-card">
          <div class="v2-card-header">
            <h3>Wireless Video</h3>
          </div>
          <div class="v2-card-body">
            <div class="v2-form-group">
              <label class="v2-label">Transmitter</label>
              <div class="v2-select-container" data-reparent="videoSelect"></div>
            </div>
          </div>
        </div>
        
        <!-- ROW 2: FIZ Systems -->
        <!-- FIZ Motors Section -->
        <div class="v2-card v2-device-card v2-card-wide">
          <div class="v2-card-header">
            <h3>FIZ Motors</h3>
          </div>
          <div class="v2-card-body v2-form-row">
            <div class="v2-form-group">
              <label class="v2-label">Motor 1</label>
              <div class="v2-select-container" data-reparent="motor1Select"></div>
            </div>
            <div class="v2-form-group">
              <label class="v2-label">Motor 2</label>
              <div class="v2-select-container" data-reparent="motor2Select"></div>
            </div>
            <div class="v2-form-group">
              <label class="v2-label">Motor 3</label>
              <div class="v2-select-container" data-reparent="motor3Select"></div>
            </div>
            <div class="v2-form-group">
              <label class="v2-label">Motor 4</label>
              <div class="v2-select-container" data-reparent="motor4Select"></div>
            </div>
          </div>
        </div>
        
        <!-- FIZ Controllers Section -->
        <div class="v2-card v2-device-card v2-card-wide">
          <div class="v2-card-header">
            <h3>FIZ Controllers</h3>
          </div>
          <div class="v2-card-body v2-form-row">
            <div class="v2-form-group">
              <label class="v2-label">Controller 1</label>
              <div class="v2-select-container" data-reparent="controller1Select"></div>
            </div>
            <div class="v2-form-group">
              <label class="v2-label">Controller 2</label>
              <div class="v2-select-container" data-reparent="controller2Select"></div>
            </div>
            <div class="v2-form-group">
              <label class="v2-label">Controller 3</label>
              <div class="v2-select-container" data-reparent="controller3Select"></div>
            </div>
            <div class="v2-form-group">
              <label class="v2-label">Controller 4</label>
              <div class="v2-select-container" data-reparent="controller4Select"></div>
            </div>
          </div>
        </div>
        
        <!-- ROW 3: Distance & Power -->
        <!-- Distance Sensor Section -->
        <div class="v2-card v2-device-card">
          <div class="v2-card-header">
            <h3>Distance Sensor</h3>
          </div>
          <div class="v2-card-body">
            <div class="v2-form-group">
              <label class="v2-label">Sensor</label>
              <div class="v2-select-container" data-reparent="distanceSelect"></div>
            </div>
          </div>
        </div>

        <!-- Battery Section -->
        <div class="v2-card v2-device-card">
          <div class="v2-card-header">
            <h3>Power</h3>
          </div>
          <div class="v2-card-body">
            <div class="v2-form-group">
              <label class="v2-label">Battery Plate</label>
              <div class="v2-select-container" data-reparent="batteryPlateSelect"></div>
            </div>
            <div class="v2-form-group">
              <label class="v2-label">Battery</label>
              <div class="v2-select-container" data-reparent="batterySelect"></div>
            </div>
            <div class="v2-form-group">
              <label class="v2-label">Hotswap Battery</label>
              <div class="v2-select-container" data-reparent="batteryHotswapSelect"></div>
            </div>
          </div>
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
        // Apply V2 styling class
        legacyElement.classList.add('v2-select-input');

        // Ensure it's visible (legacy might hide it)
        legacyElement.style.display = 'block';
        legacyElement.style.width = '100%';

        // Ensure height is auto to preventing cutting off text
        legacyElement.style.height = 'auto';
        legacyElement.style.minHeight = '44px';
        legacyElement.style.whiteSpace = 'normal';

        // Check if the element has a wrapper (which holds the favorite button)
        const wrapper = legacyElement.closest('.select-wrapper');
        const elementToMove = wrapper || legacyElement;

        // Move to new container
        container.appendChild(elementToMove);
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
      <!-- Power Summary Hero Card -->
      <div class="v2-power-hero v2-card v2-card-elevated">
        <div class="v2-power-hero-main">
          <div class="v2-power-stat v2-power-stat-primary">
            <span class="v2-power-stat-value" id="v2TotalDraw">0W</span>
            <span class="v2-power-stat-label">Total Draw</span>
          </div>
          <div class="v2-power-stat">
            <span class="v2-power-stat-value" id="v2Runtime">--:--</span>
            <span class="v2-power-stat-label">Runtime</span>
          </div>
          <div class="v2-power-stat">
            <span class="v2-power-stat-value" id="v2BatteryCount">0</span>
            <span class="v2-power-stat-label">Batteries</span>
          </div>
        </div>
        <div class="v2-power-hero-details">
          <div class="v2-power-detail">
            <span class="v2-power-detail-label">14.4V Current</span>
            <span class="v2-power-detail-value" id="v2Current144">0A</span>
          </div>
          <div class="v2-power-detail">
            <span class="v2-power-detail-label">12V Current</span>
            <span class="v2-power-detail-value" id="v2Current12">0A</span>
          </div>
        </div>
      </div>

      <!-- Power Breakdown -->
      <div class="v2-card" style="margin-top: var(--v2-space-lg);">
        <div class="v2-card-header">
          <h3>Consumption Breakdown</h3>
        </div>
        <div class="v2-card-body">
           <p class="v2-text-muted">Breakdown visualization coming soon.</p>
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

    // Save button
    const saveBtn = view.querySelector('#v2SaveProjectBtn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        if (global.cineLegacyShim && currentProject) {
          // We might need to implement a specific save call or trigger the legacy save button
          // For now, looking at app-core, there is likely a saveProject function
          // We can also trigger the hidden save button if needed
          const legacySaveBtn = document.getElementById('saveProjectBut');
          if (legacySaveBtn) legacySaveBtn.click();
        }
      });
    }

    // Generate Gear List button
    const gearListBtn = view.querySelector('#v2GenerateGearListBtn');
    if (gearListBtn) {
      gearListBtn.addEventListener('click', () => {
        console.log('[ProjectDetail] Triggering Legacy Gear List');
        // Legacy ID found via app-events.js analysis
        const legacyBtn = document.getElementById('generateGearListBtn');
        if (legacyBtn) {
          legacyBtn.click();
        } else {
          // Fallback if ID differs in runtime
          console.warn('[ProjectDetail] #generateGearListBtn not found');
          alert('Feature migration in progress: Gear List');
        }
      });
    }

    // Generate Requirements button
    const reqBtn = view.querySelector('#v2GenerateRequirementsBtn');
    if (reqBtn) {
      reqBtn.addEventListener('click', () => {
        console.log('[ProjectDetail] Triggering Legacy Requirements');
        // Likely 'generateOverviewBtn' based on en.js 'projectRequirementsNav' and app-events
        const legacyBtn = document.getElementById('generateOverviewBtn') || document.getElementById('generateTotalReqs');
        if (legacyBtn) {
          legacyBtn.click();
        } else {
          console.warn('[ProjectDetail] Legacy Requirements button not found');
          alert('Feature migration in progress: Requirements');
        }
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
  }

  /**
   * Setup observer to watch for legacy DOM changes (calculation updates)
   */
  function setupPowerObserver() {
    const targetNode = document.getElementById('heroTotalDraw');
    // If the specific node isn't the one changing (e.g. text node inside), we might need to observe parent
    // But usually observing the container or body for subtree changes with filter is robust

    const legacyResultContainer = document.getElementById('results') || document.body;

    const observer = new MutationObserver((mutations) => {
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
  function handleViewChange(event) {
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
      loadProject(params.projectId);

      // Switch to the requested tab if provided
      if (params.tab) {
        switchTab(params.tab);
      }
    }
  }

  // =====================
  // EXPORTS
  // =====================
  global.cineProjectDetail = {
    init,
    createDetailViewContent,
    loadProject,
    getCurrentProject,
    switchTab,
    getCurrentTab,
    syncLegacyResultsToV2
  };

})(typeof window !== 'undefined' ? window : this);
