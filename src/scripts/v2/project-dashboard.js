/**
 * Cine Power Planner V2 - Project Dashboard Component
 * =====================================================
 * Renders the project grid with tiles for each saved project.
 */

// Polyfill global for legacy code
const global = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : {};


// =====================
// CONFIGURATION
// =====================
const GRID_CONTAINER_ID = 'projectGrid';
const VIEW_ID = 'view-projects';
const STORAGE_KEY = 'cameraPowerPlanner_setups';

// Color palette for project tiles
const TILE_COLORS = [
    'blue', 'green', 'orange', 'purple', 'red', 'pink', 'teal', 'indigo',
    'yellow', 'amber', 'lime', 'emerald', 'cyan', 'sky',
    'violet', 'fuchsia', 'rose',
    'slate', 'stone', 'neutral',
    'gold', 'crimson', 'navy', 'aquamarine'
];

// Icon options
const PROJECT_ICONS = [
    '📽️', '🎬', '⚡', '🔋', '🎥', '📺', '💡', '🎞️', '📸', '🎯', '📝', '⭐',
    '🐴', '🦄', '🤘', '🦊', '🐶', '🦖', '🐙', '🐉', '👽', '👻', '🤖', '💀',
    '👾', '🤡', '🎉', '🔥', '✨', '🚀', '🍕', '🤙', '✌️', '💪'
];

// =====================
// STATE
// =====================
let isInitialized = false;
// let colorIndex = 0;
let currentFilter = {
    query: '',
    type: 'active' // 'active' | 'archived'
};
let dataProvider = null;

// Cache for project data to avoid O(N) localStorage parsing
let _cachedProjectData = null;

// =====================
// HELPERS
// =====================
/**
 * Helper to update the project revision key for cross-tab sync
 */
function updateProjectRevision() {
    try {
        const REV_KEY = 'cameraPowerPlanner_project_rev';
        const currentRev = parseInt(localStorage.getItem(REV_KEY) || '0', 10);
        localStorage.setItem(REV_KEY, (currentRev + 1).toString());
    } catch (e) {
        console.error('[V2] Failed to update project revision:', e);
    }
}

/**
 * Create the default data provider that wraps storage APIs.
 */
function createDefaultDataProvider() {
    const loadProjectMetadata = () => {
        if (typeof window.loadProjectMetadata === 'function') {
            try {
                return window.loadProjectMetadata() || {};
            } catch (e) {
                console.warn('[V2] Failed to load project metadata via storage API:', e);
            }
        }

        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : {};
        } catch (e) {
            console.error('[V2] Failed to parse project metadata:', e);
            return {};
        }
    };

    const loadProject = (projectName) => {
        if (typeof window.loadProject === 'function') {
            try {
                return window.loadProject(projectName);
            } catch (e) {
                console.warn('[V2] Failed to load project via storage API:', e);
            }
        }

        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (!stored) return null;
            const data = JSON.parse(stored);
            return data[projectName] || null;
        } catch (e) {
            console.error('[V2] Failed to parse project data:', e);
            return null;
        }
    };

    const saveProject = (projectName, projectData) => {
        if (typeof window.saveProject === 'function') {
            try {
                window.saveProject(projectName, projectData);
                return true;
            } catch (e) {
                console.error('[V2] Failed to save project via storage API:', e);
            }
        }

        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            const data = stored ? JSON.parse(stored) : {};
            data[projectName] = projectData;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            updateProjectRevision();
            return true;
        } catch (e) {
            console.error('[V2] Failed to save project data:', e);
        }

        return false;
    };

    const deleteProject = (projectName) => {
        if (typeof window.deleteProject === 'function') {
            try {
                window.deleteProject(projectName);
                return true;
            } catch (e) {
                console.error('[V2] Failed to delete project via storage API:', e);
            }
        }

        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (!stored) return false;
            const data = JSON.parse(stored);
            if (!data[projectName]) return false;
            delete data[projectName];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            updateProjectRevision();
            return true;
        } catch (e) {
            console.error('[V2] Failed to delete project data:', e);
        }

        return false;
    };

    const createProject = (projectName) => {
        if (global.cineLegacyShim && typeof global.cineLegacyShim.createProject === 'function') {
            global.cineLegacyShim.createProject(projectName);
            return true;
        }
        return false;
    };

    const loadProjectIntoSession = (projectName) => {
        if (global.cineLegacyShim && typeof global.cineLegacyShim.loadProject === 'function') {
            global.cineLegacyShim.loadProject(projectName);
            return true;
        }
        return false;
    };

    return {
        loadProjectMetadata,
        loadProject,
        saveProject,
        deleteProject,
        createProject,
        loadProjectIntoSession
    };
}

/**
 * Create a UI-only data provider that avoids touching storage.
 */
function createUiOnlyDataProvider() {
    return {
        loadProjectMetadata: () => ({}),
        loadProject: () => null,
        saveProject: () => false,
        deleteProject: () => false,
        createProject: () => false,
        loadProjectIntoSession: () => false
    };
}

function getDataProvider() {
    if (!dataProvider) {
        dataProvider = createDefaultDataProvider();
    }
    return dataProvider;
}

/**
 * Get the next color in the palette
 */
// Unused helper - keeping for future color cycling if needed
// function getNextColor() {
//     const color = TILE_COLORS[colorIndex % TILE_COLORS.length];
//     colorIndex++;
//     return color;
// }

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

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

    // Simple resolve
    const resolve = (obj, p) => p.split('.').reduce((o, i) => o ? o[i] : null, obj);

    let val = root ? resolve(root, path) : null;

    // Fallback to English if missing in current lang
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

// =====================
// PROJECT DATA
// =====================

/**
 * Refresh the project data cache.
 * Uses the optimized loadProjectMetadata API from storage.js if available.
 */
function refreshProjectDataCache() {
    try {
        const provider = getDataProvider();
        _cachedProjectData = provider.loadProjectMetadata() || {};
    } catch (e) {
        console.error('[V2] Failed to refresh project data cache:', e);
        _cachedProjectData = {};
    }
}

/**
 * Get all saved project names from legacy system
 * Uses a fallback chain to ensure data availability even during initialization
 */
function getProjectNames() {
    if (_cachedProjectData === null && dataProvider) {
        refreshProjectDataCache();
    }

    // Priority 1: Read from cached project data (Fastest & Most Accurate)
    if (_cachedProjectData) {
        return Object.keys(_cachedProjectData).filter(name => name && !name.startsWith('auto-backup-'));
    }

    // Priority 2: Use legacy shim if available
    if (global.cineLegacyShim && typeof global.cineLegacyShim.getProjectNames === 'function') {
        const names = global.cineLegacyShim.getProjectNames();
        if (names.length > 0) return names;
    }

    // Priority 3: Read from setupSelect (if populated)
    const setupSelect = document.getElementById('setupSelect');
    if (setupSelect && setupSelect.options.length > 1) {
        const names = Array.from(setupSelect.options)
            .map(opt => opt.value)
            .filter(val => val !== '');
        if (names.length > 0) return [...new Set(names)];
    }

    // Priority 4: Direct localStorage fallback
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const data = JSON.parse(stored);
            return Object.keys(data).filter(name => name && !name.startsWith('auto-backup-'));
        }
    } catch (_e) {
        void _e;
    }

    return [];
}

/**
 * Get filtered projects based on current state
 */
/**
 * Get filtered projects based on current state
 */
function getFilteredProjects() {
    let projects = getProjectNames();

    // 0. Filter by Archive Status
    const showArchived = (currentFilter.type === 'archived');
    projects = projects.filter(name => {
        const metadata = getProjectMetadata(name);
        const isArchived = !!metadata.archived;
        return showArchived ? isArchived : !isArchived;
    });

    // 1. Filter by Query
    if (currentFilter.query) {
        const q = currentFilter.query.toLowerCase();
        projects = projects.filter(name => name.toLowerCase().includes(q));
    }

    return [...new Set(projects)];
}

/**
 * Get project metadata (color, icon, last modified)
 * Uses module-level cache for performance
 */
function getProjectMetadata(projectName) {
    // Initialize cache if needed (though it should be primed by render)
    if (_cachedProjectData === null) {
        refreshProjectDataCache();
    }

    const project = _cachedProjectData[projectName];
    if (project) {
        return {
            lastModified: project.lastModified || null,
            color: project.color || null,
            icon: project.icon || null,
            prepDays: project.prepDays || [],
            shootingDays: project.shootingDays || [],
            returnDays: project.returnDays || [],
            archived: project.archived || false,
            status: project.status || (project.archived ? 'Archived' : 'Planning')
        };
    }

    return { lastModified: null, color: null, icon: null, prepDays: [], shootingDays: [], returnDays: [], archived: false, status: 'Planning' };
}

/**
 * Update project metadata (color, icon, dates)
 */
function updateProjectMetadata(projectName, metadata = {}) {
    const provider = getDataProvider();
    try {
        const project = provider.loadProject(projectName);
        if (project) {
            if (metadata.color) project.color = metadata.color;
            if (metadata.icon) project.icon = metadata.icon;
            if (metadata.prepDays) project.prepDays = metadata.prepDays;
            if (metadata.shootingDays) project.shootingDays = metadata.shootingDays;
            if (metadata.returnDays) project.returnDays = metadata.returnDays;
            if (typeof metadata.archived !== 'undefined') project.archived = metadata.archived;
            if (metadata.status) project.status = metadata.status;

            const saved = provider.saveProject(projectName, project);
            if (saved) {
                if (_cachedProjectData && _cachedProjectData[projectName]) {
                    Object.assign(_cachedProjectData[projectName], metadata);
                }
            }
            return saved;
        }
    } catch (e) {
        console.error('[V2] Failed to update project metadata:', e);
    }
    return false;
}

// =====================
// TILE RENDERING
// =====================

/**
 * Create a project tile HTML
 */
function createTileHtml(projectName, index) {
    const metadata = getProjectMetadata(projectName);

    // Use stored color or cycle through palette based on index
    let color = metadata.color || TILE_COLORS[index % TILE_COLORS.length];

    // Security: Validate color is in the allowed list to prevent injection
    if (!TILE_COLORS.includes(color)) {
        color = TILE_COLORS[index % TILE_COLORS.length];
    }

    // Use stored icon or default
    // Security: Sanitize icon to prevent XSS
    const icon = escapeHtml(metadata.icon || '📽️');

    const dateStr = metadata.lastModified ? formatDate(metadata.lastModified) : '';
    const escapedName = escapeHtml(projectName);
    const status = metadata.status || 'Planning';
    const statusClass = status.toLowerCase().replace(/\s+/g, '-');

    // Translate Status
    let statusKey = status.toLowerCase().replace(/\s+/g, '');
    if (statusKey === 'waitingforapproval') statusKey = 'waitingForApproval'; // Handle capitalization mismatch
    const statusLabel = _t(`v2.dashboard.status.${statusKey}`) === `v2.dashboard.status.${statusKey}` ? status : _t(`v2.dashboard.status.${statusKey}`);


    let periodsHtml = '';
    const hasDates = (metadata.prepDays?.length > 0) || (metadata.shootingDays?.length > 0) || (metadata.returnDays?.length > 0);

    if (hasDates) {
        periodsHtml = `<div class="v2-tile-periods">`;

        // Render all Prep dates
        if (Array.isArray(metadata.prepDays)) {
            metadata.prepDays.forEach(range => {
                const fmt = formatDateRange(range);
                if (fmt) periodsHtml += `<span class="v2-period-badge prep" title="${_t('v2.dashboard.projectTile.prep')} ${fmt}"><span class="period-icon">📅</span> ${fmt}</span>`;
            });
        }

        // Render all Shoot dates
        if (Array.isArray(metadata.shootingDays)) {
            metadata.shootingDays.forEach(range => {
                const fmt = formatDateRange(range);
                if (fmt) periodsHtml += `<span class="v2-period-badge shoot" title="${_t('v2.dashboard.projectTile.shoot')} ${fmt}"><span class="period-icon">🎥</span> ${fmt}</span>`;
            });
        }

        // Render all Return dates
        if (Array.isArray(metadata.returnDays)) {
            metadata.returnDays.forEach(range => {
                const fmt = formatDateRange(range);
                if (fmt) periodsHtml += `<span class="v2-period-badge return" title="${_t('v2.dashboard.projectTile.return')} ${fmt}"><span class="period-icon">🚛</span> ${fmt}</span>`;
            });
        }

        periodsHtml += `</div>`;
    }

    return `
      <div class="v2-project-tile" data-project="${escapedName}" tabindex="0" role="button" aria-label="${_t('v2.dashboard.projectTile.actionsFor', { project: escapedName })}">
        <div class="v2-tile-header">
          <div class="v2-tile-icon color-${color}">${icon}</div>
            <div class="v2-tile-info">
            <h3 class="v2-tile-title">${escapedName}</h3>
            <div style="display: flex; align-items: center; gap: 8px; margin-top: 4px;">
                 ${dateStr ? `<span class="v2-tile-meta">${dateStr}</span>` : ''}
                 <span class="v2-status-badge ${statusClass}">${statusLabel}</span>
            </div>
            ${periodsHtml}
          </div>
          <div class="v2-tile-actions">
            <button type="button" class="v2-tile-action-btn" data-action="menu" data-project="${escapedName}" title="${_t('v2.dashboard.projectTile.moreOptions')}" aria-label="${_t('v2.dashboard.projectTile.actionsFor', { project: escapedName })}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
}

/**
 * Create the "New Project" tile HTML
 */
function createNewProjectTileHtml() {
    return `
      <div class="v2-project-tile new-project" id="v2CreateProjectTile" tabindex="0" role="button" aria-label="${_t('v2.dashboard.newProject')}">
        <div class="v2-tile-header center">
          <div class="v2-tile-icon-add">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14M5 12h14" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h3 class="v2-tile-title">${_t('v2.dashboard.newProject')}</h3>
        </div>
      </div>
    `;
}

/**
 * Create Empty State HTML (No Projects)
 */


/**
 * Create No Results HTML (Search)
 */
function createNoResultsHtml(query) {
    return `
      <div class="view-empty-state">
        <div class="view-empty-state-icon" style="font-size: 48px; display: flex; align-items: center; justify-content: center;">🔍</div>
        <h2>${_t('v2.dashboard.search.noResults.title')}</h2>
        <p class="text-muted">${_t('v2.dashboard.search.noResults.subtitle', { query: escapeHtml(query) })}</p>
        <button id="v2ClearSearchBtn" class="v2-btn-secondary">
          Clear Search
        </button>
      </div>
    `;
}

// =====================
// DASHBOARD RENDERING
// =====================

/**
 * Render the project grid
 *
 * Core Rendering Logic:
 * 1. Clears the existing grid container.
 * 2. Retrieves the list of projects (from legacy storage or shim).
 * 3. Applies current filters (Search Query).
 * 4. Renders the appropriate state:
 *    - GLOBAL EMPTY STATE: If no projects exist at all.
 *    - NO RESULTS STATE: If projects exist but the search query matches nothing.
 *    - PROJECT GRID: Renders a tile for each matching project.
 * 5. Appends the "New Project" tile at the end (unless searching).
 * 6. Re-binds all click/keyboard events to the new DOM elements.
 *
 * Triggered by:
 * - Initial Load
 * - 'v2:viewchange' event (when switching to the Projects view)
 * - 'v2:search' event (real-time filtering from the Sidebar)
 */
function renderProjectGrid() {
    // Release any held project lock when returning to dashboard
    if (global.cineProjectLockManager) {
        global.cineProjectLockManager.releaseLock();
    }

    const container = document.getElementById(GRID_CONTAINER_ID);
    if (!container) return;

    // Render immediately - Removed artificial 800ms delay for performance
    _renderGridContent(container);
}

/**
 * Internal render logic
 */
function _renderGridContent(container) {
    // Reset container to be sure
    container.innerHTML = '';
    container.className = 'v2-project-grid';
    container.style = '';

    // Prime the cache ONCE before processing any items
    // This is the key performance fix
    refreshProjectDataCache();

    // Check if we have ANY projects at all (Global Empty State)
    const allProjects = getProjectNames();
    if (allProjects.length === 0) {
        container.classList.add('v2-grid-empty');

        // Force styles logic...
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'flex-start';
        container.style.paddingTop = '10vh';
        container.style.minHeight = '100%';
        container.style.flex = '1';

        const main = container.closest('.v2-main');
        if (main) main.classList.add('align-top'); // Fix layout

        container.innerHTML = createEmptyStateHtml();
        bindEmptyStateEvents(container);
        return;
    }

    // Get Filtered Projects
    const filteredProjects = getFilteredProjects();

    // Check if Search returned nothing
    if (filteredProjects.length === 0) {
        container.classList.add('v2-grid-empty');

        // Force styles logic...
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'flex-start';
        container.style.paddingTop = '10vh';
        container.style.minHeight = '100%';
        container.style.flex = '1';

        const main = container.closest('.v2-main');
        if (main) main.classList.add('align-top'); // Fix layout

        container.innerHTML = createNoResultsHtml(currentFilter.query);

        // Bind Clear Search
        const clearBtn = container.querySelector('#v2ClearSearchBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                // Dispatch clear event or manually clear
                const searchInput = document.getElementById('v2SidebarSearchInput');
                if (searchInput) {
                    searchInput.value = '';
                    searchInput.dispatchEvent(new Event('input', { bubbles: true })); // Trigger update
                }
            });
        }
        return;
    }

    // Has Projects - Render Grid
    const main = container.closest('.v2-main');
    if (main) main.classList.remove('align-top'); // Reset layout

    let html = '';
    filteredProjects.forEach((name, index) => {
        html += createTileHtml(name, index);
    });

    // Always show "New Project" tile at the end, unless searching
    if (!currentFilter.query) {
        html += createNewProjectTileHtml();
    }

    container.innerHTML = html;
    bindTileEvents(container);
}



// =====================
// EVENT HANDLING
// =====================

/**
 * Bind Search Events
 * Listens for the custom 'v2:search' event dispatched by the Sidebar's search input.
 * This decouples the Sidebar component from the Dashboard component.
 */
function bindSearchEvents() {
    window.addEventListener('v2:search', (e) => {
        currentFilter.query = e.detail?.query || '';
        renderProjectGrid();
    });
}

/**
 * Bind events to project tiles
 */
/**
 * Bind events to project tiles
 */
function bindTileEvents(container) {
    // Click on tile (open project)
    container.querySelectorAll('.v2-project-tile').forEach(tile => {
        // Left Click
        tile.addEventListener('click', (e) => {
            // Don't trigger if clicking on menu button
            if (e.target.closest('[data-action="menu"]')) return;

            const projectName = tile.dataset.project;
            if (projectName) {
                openProject(projectName);
            }
        });

        // Right Click (Context Menu)
        tile.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            const projectName = tile.dataset.project;
            if (projectName) {
                showContextMenu(e, projectName);
            }
        });

        // Keyboard support
        tile.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                tile.click();
            }
        });
    });

    // Click on menu button
    container.querySelectorAll('[data-action="menu"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectName = btn.dataset.project;
            if (projectName) {
                showContextMenu(e, projectName);
            }
        });
    });

    // Click on new project tile
    const newProjectTile = container.querySelector('#v2CreateProjectTile');
    if (newProjectTile) {
        newProjectTile.addEventListener('click', () => showProjectDialog()); // No arg = new
        newProjectTile.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showProjectDialog();
            }
        });
    }
}

/**
 * Show Context Menu
 */
/**
 * Show Context Menu
 */
function showContextMenu(e, projectName) {
    // Close existing
    closeContextMenu();

    const menu = document.createElement('div');
    menu.className = 'v2-context-menu';
    menu.innerHTML = `
            <button class="v2-context-menu-item" data-action="open">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                ${_t('v2.dashboard.contextMenu.open')}
            </button>
            <button class="v2-context-menu-item" data-action="edit">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                ${_t('v2.dashboard.contextMenu.rename')}
            </button>
            <button class="v2-context-menu-item" data-action="print">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 6 2 18 2 18 9"></polyline>
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                    <rect x="6" y="14" width="12" height="8"></rect>
                </svg>
                ${_t('v2.dashboard.contextMenu.print')}
            </button>
            <button class="v2-context-menu-item" data-action="duplicate">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                ${_t('v2.dashboard.contextMenu.duplicate')}
            </button>
            <button class="v2-context-menu-item" data-action="archive">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="21 8 21 21 3 21 3 8"></polyline>
                    <rect x="1" y="3" width="22" height="5"></rect>
                    <line x1="10" y1="12" x2="14" y2="12"></line>
                </svg>
                ${_t('v2.dashboard.contextMenu.archive')}
            </button>
             <div style="height: 1px; background: var(--v2-border-default); margin: 4px 0;"></div>
            <button class="v2-context-menu-item danger" data-action="delete">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                </svg>
                ${_t('v2.dashboard.contextMenu.delete')}
            </button>
        `;

    // Position
    menu.style.left = `${e.clientX}px`;
    menu.style.top = `${e.clientY}px`;

    // Bind Actions
    menu.querySelector('[data-action="open"]').addEventListener('click', () => {
        openProject(projectName);
        closeContextMenu();
    });

    menu.querySelector('[data-action="edit"]').addEventListener('click', () => {
        closeContextMenu();
        showProjectDialog(projectName); // Pass name = edit mode
    });

    menu.querySelector('[data-action="print"]').addEventListener('click', () => {
        openProject(projectName, { action: 'print' });
        closeContextMenu();
    });

    menu.querySelector('[data-action="duplicate"]').addEventListener('click', () => {
        duplicateProject(projectName);
        closeContextMenu();
    });

    menu.querySelector('[data-action="archive"]').addEventListener('click', () => {
        archiveProject(projectName);
        closeContextMenu();
    });

    menu.querySelector('[data-action="delete"]').addEventListener('click', () => {
        deleteProject(projectName);
        closeContextMenu();
    });

    document.body.appendChild(menu);

    // Adjust constraints (keep onscreen)
    const rect = menu.getBoundingClientRect();
    if (rect.right > window.innerWidth) menu.style.left = `${window.innerWidth - rect.width - 10}px`;
    if (rect.bottom > window.innerHeight) menu.style.top = `${window.innerHeight - rect.height - 10}px`;

    // Bind Close
    setTimeout(() => {
        document.addEventListener('click', closeContextMenu, { once: true });
        document.addEventListener('contextmenu', closeContextMenu, { once: true });
    }, 0);
}

/**
 * Close Context Menu
 */
function closeContextMenu() {
    const existing = document.querySelector('.v2-context-menu');
    if (existing) existing.remove();
    document.removeEventListener('click', closeContextMenu);
}

/**
 * Bind events for empty state
 */
function bindEmptyStateEvents(container) {
    const createBtn = container.querySelector('#v2EmptyStateCreateBtn');
    if (createBtn) {
        createBtn.addEventListener('click', () => showCreateProjectDialog());
    }
}

// =====================
// PROJECT OPERATIONS
// =====================

/**
 * Open a project (navigate to detail view)
 */
async function openProject(projectName, options = {}) {
    // Check for cross-tab lock
    if (global.cineProjectLockManager) {
        const locked = await global.cineProjectLockManager.requestLock(projectName);
        if (!locked) {
            alert(_t('v2.dashboard.projectLocked', { projectName: projectName }));
            return;
        }
    }

    // Load the project via data provider
    const provider = getDataProvider();
    if (provider && typeof provider.loadProjectIntoSession === 'function') {
        provider.loadProjectIntoSession(projectName);
    }

    // Navigate to project detail view
    if (global.cineViewManager) {
        global.cineViewManager.showView('projectDetail', {
            projectId: projectName,
            tab: 'camera',
            ...options
        });
    }
}

/**
 * Create Empty State HTML (No Projects)
 */
function createEmptyStateHtml() {
    if (currentFilter.type === 'archived') {
        return `
              <div class="view-empty-state">
                <div class="view-empty-state-icon" style="font-size: 64px; opacity: 0.8; margin-bottom: 16px;">
                  📂
                </div>
                <h2>${_t('v2.dashboard.emptyState.archiveTitle')}</h2>
                <p class="text-muted">${_t('v2.dashboard.emptyState.archiveSubtitle')}</p>
              </div>
            `;
    }

    return `
      <div class="view-empty-state">
        <div class="view-empty-state-icon" style="font-size: 64px; opacity: 0.8; margin-bottom: 16px;">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
            <line x1="12" y1="22.08" x2="12" y2="12"/>
          </svg>
        </div>
        <h2>${_t('v2.dashboard.emptyState.title')}</h2>
        <p class="text-muted">${_t('v2.dashboard.emptyState.subtitle')}</p>
        <div class="v2-empty-actions">
            <button id="v2EmptyStateCreateBtn" class="v2-btn-primary">
              + ${_t('v2.dashboard.newProject')}
            </button>
            <p class="v2-help-link-container">
                <a href="#/help" class="v2-link-subtle">${_t('v2.dashboard.emptyState.help')}</a>
            </p>
        </div>
      </div>
    `;
}

// ... (createNoResultsHtml and render methods stay same, but we need to jump to project operations area)

// [Skipping middle sections, targeting lines 656-696 for project operations]

/**
 * Delete a project
 */
/**
 * Delete a project
 */
function deleteProject(projectName) {
    if (!confirm(_t('v2.dashboard.confirmDelete', { project: projectName }) || `Are you sure you want to delete project "${projectName}"?`)) {
        return;
    }

    try {
        const provider = getDataProvider();
        provider.deleteProject(projectName);

        // 2. Notify legacy shim if available (to clean up its internal state if any)
        if (global.cineLegacyShim && typeof global.cineLegacyShim.deleteProject === 'function') {
            // We typically just need to refresh, but if the shim has specific delete logic, call it.
            // However, since we manually deleted from storage, we might just need to refresh.
            if (typeof global.cineLegacyShim.refreshProjects === 'function') {
                global.cineLegacyShim.refreshProjects();
            }
        }

        // 3. Update UI
        renderProjectGrid();

    } catch (e) {
        console.error('[V2] Failed to delete project:', e);
        alert(_t('v2.common.error') || 'An error occurred.');
    }
}

/**
 * Archive Project
 */
function archiveProject(projectName) {
    updateProjectMetadata(projectName, { archived: true, status: 'Archived' });
    renderProjectGrid();
}

/**
 * Rename Project
 */
function renameProject(existingProject, newProjectName, metadata = {}) {
    const provider = getDataProvider();
    try {
        const originalData = provider.loadProject(existingProject);
        if (!originalData) return false;

        const updatedData = {
            ...originalData,
            ...metadata,
            lastModified: new Date().toISOString()
        };

        const saved = provider.saveProject(newProjectName, updatedData);
        if (!saved) return false;

        provider.deleteProject(existingProject);
        return true;
    } catch (e) {
        console.error('[V2] Failed to rename project:', e);
        return false;
    }
}

/**
 * Duplicate Project
 */
function duplicateProject(projectName) {
    try {
        const provider = getDataProvider();
        const originalData = provider.loadProject(projectName);
        if (!originalData) return;

        // 2. Generate new unique name
        let newName = `${projectName} (Copy)`;
        let counter = 2;
        const existingNames = getProjectNames();
        while (existingNames.includes(newName)) {
            newName = `${projectName} (Copy ${counter})`;
            counter++;
        }

        // 3. Clone data
        const newData = JSON.parse(JSON.stringify(originalData));
        newData.created = new Date().toISOString();
        newData.lastModified = new Date().toISOString();

        // 4. Save
        provider.saveProject(newName, newData);

        // Refresh Grid
        renderProjectGrid();

        // Notify legacy shim if available
        if (global.cineLegacyShim && typeof global.cineLegacyShim.refreshProjects === 'function') {
            global.cineLegacyShim.refreshProjects();
        }

    } catch (e) {
        console.error('Failed to duplicate project:', e);
    }
}

/**
 * Show create project dialog using internal modal
 */
function showProjectDialog(projectName = null) {
    showCreateProjectDialog(projectName);
}

/**
 * Internal implementation for showing the modal
 */
function showCreateProjectDialog(existingProject = null) {
    const isEditing = !!existingProject;
    const randomColorIndex = Math.floor(Math.random() * TILE_COLORS.length);
    let selectedColor = TILE_COLORS[randomColorIndex];
    let selectedIcon = '📽️';

    let existingMetadata = null;

    // If editing, load existing data
    if (isEditing) {
        existingMetadata = getProjectMetadata(existingProject);
        if (existingMetadata) {
            if (existingMetadata.color) selectedColor = existingMetadata.color;
            if (existingMetadata.icon) selectedIcon = existingMetadata.icon;
        }
    }

    // Dynamic periods state
    let periods = [];

    if (isEditing && existingMetadata) {
        // Reconstruct periods from V1 structure
        let pid = 1;

        // Helpers
        const parseRange = (str, type, name) => {
            if (!str) return;
            let start = '', end = '';
            if (str.includes(' to ')) {
                [start, end] = str.split(' to ');
            } else {
                start = str;
                end = str; // Single day range
            }
            periods.push({
                id: `period-${pid++}`,
                type,
                name,
                startDate: start,
                endDate: end
            });
        };

        if (Array.isArray(existingMetadata.prepDays)) existingMetadata.prepDays.forEach(d => parseRange(d, 'prep', 'Prep'));
        if (Array.isArray(existingMetadata.shootingDays)) existingMetadata.shootingDays.forEach(d => parseRange(d, 'shoot', 'Shoot'));
        if (Array.isArray(existingMetadata.returnDays)) existingMetadata.returnDays.forEach(d => parseRange(d, 'return', 'Return'));
    }

    // Default for new projects
    if (!isEditing && periods.length === 0) {
        periods = [
            { id: 'period-1', type: 'prep', name: 'Prep', startDate: '', endDate: '' },
            { id: 'period-2', type: 'shoot', name: 'Shoot', startDate: '', endDate: '' },
            { id: 'period-3', type: 'return', name: 'Return', startDate: '', endDate: '' }
        ];
    }

    let periodCounter = periods.length > 0 ? periods.length : 3;

    const PERIOD_TYPES = [
        { value: 'prep', label: 'Prep', icon: '📅' },
        { value: 'shoot', label: 'Shoot', icon: '🎥' },
        { value: 'return', label: 'Return', icon: '🚛' }
    ];

    // Modal styles moved to src/styles/v2/views/project-dashboard.css

    const getColorVar = (c) => `var(--v2-color-${c})`;

    // Build HTML for swatches
    const colorSwatchesHtml = TILE_COLORS.map(c => `
            <button type="button" class="v2-color-swatch-sm color-${c} ${c === selectedColor ? 'selected' : ''}" 
                    data-color="${c}" aria-label="Select ${c} color">
            </button>
        `).join('');

    // Build HTML for icons
    const iconOptionsHtml = PROJECT_ICONS.map(i => `
            <button type="button" class="v2-icon-option-sm ${i === selectedIcon ? 'selected' : ''}" 
                    data-icon="${i}" aria-label="Select icon ${i}">
                ${i}
            </button>
        `).join('');

    // Build HTML for periods
    const buildPeriodsHtml = () => {
        if (periods.length === 0) {
            return `<div class="v2-empty-state" style="padding: 16px; font-size: 13px;">No dates added yet.</div>`;
        }
        return periods.map(p => {
            const typeOptions = PERIOD_TYPES.map(t =>
                `<option value="${t.value}" ${p.type === t.value ? 'selected' : ''}>${t.icon} ${t.label}</option>`
            ).join('');

            return `
                <div class="v2-period-row" data-period-id="${p.id}">
                    <div class="v2-period-name">
                        <select class="v2-period-type-select" data-field="type">
                            ${typeOptions}
                        </select>
                    </div>
                    <input type="date" class="v2-date-input" value="${p.startDate}" data-field="startDate" aria-label="${p.name} Start Date">
                    <span class="v2-date-separator">to</span>
                    <input type="date" class="v2-date-input" value="${p.endDate}" data-field="endDate" aria-label="${p.name} End Date">
                    <button type="button" class="v2-period-remove" data-period-id="${p.id}" aria-label="Remove period">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
            `}).join('');
    }

    // Create modal backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'v2-modal-backdrop';
    backdrop.innerHTML = `
            <div class="v2-modal" style="max-width: 520px;">
                <div class="v2-modal-header">
                    <h3 class="v2-modal-title">${isEditing ? 'Edit Project' : 'Create New Project'}</h3>
                    <button type="button" class="v2-modal-close v2-btn v2-btn-ghost" aria-label="Close">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
                <div class="v2-modal-body">
                    <!-- Project Name -->
                    <div style="margin-bottom: var(--v2-space-lg);">
                        <label for="v2NewProjectName" class="v2-form-section-label" style="font-size: var(--v2-font-size-base); color: var(--v2-text-primary);">
                            Project Name
                        </label>
                        <input type="text" id="v2NewProjectName" class="v2-input" placeholder="Enter project name..." 
                               value="${isEditing ? existingProject : ''}"
                               style="width: 100%; padding: var(--v2-space-sm) var(--v2-space-md); border: 1px solid var(--v2-border-default); border-radius: var(--v2-radius-md); font-size: var(--v2-font-size-base);">
                        ${isEditing ? '<p class="text-muted" style="font-size: 12px; margin-top: 4px;">Warning: Renaming will create a new entry.</p>' : ''}
                        <p id="v2NewProjectError" style="color: var(--v2-status-error); font-size: var(--v2-font-size-sm); margin-top: var(--v2-space-sm); display: none;"></p>
                    </div>

                    <!-- Color & Icon Pickers Row -->
                    <div class="v2-picker-row" style="margin-bottom: var(--v2-space-lg);">
                        <div class="v2-picker-group">
                            <label class="v2-form-section-label">Color</label>
                            <button type="button" class="v2-picker-trigger" id="v2ColorPickerTrigger">
                                <span class="v2-picker-preview" id="v2ColorPreview" style="background-color: ${getColorVar(selectedColor)};"></span>
                                <span class="v2-picker-label">${selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}</span>
                                <svg class="v2-picker-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="6 9 12 15 18 9"/>
                                </svg>
                            </button>
                            <div class="v2-picker-popover" id="v2ColorPopover">
                                <div class="v2-picker-popover-grid">
                                    ${colorSwatchesHtml}
                                </div>
                            </div>
                        </div>
                        <div class="v2-picker-group">
                            <label class="v2-form-section-label">Icon</label>
                            <button type="button" class="v2-picker-trigger" id="v2IconPickerTrigger">
                                <span class="v2-picker-icon-preview" id="v2IconPreview">${selectedIcon}</span>
                                <span class="v2-picker-label">Icon</span>
                                <svg class="v2-picker-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="6 9 12 15 18 9"/>
                                </svg>
                            </button>
                            <div class="v2-picker-popover" id="v2IconPopover" style="min-width: 280px;">
                                <div class="v2-picker-popover-grid" style="grid-template-columns: repeat(7, 1fr);">
                                    ${iconOptionsHtml}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Project Periods -->
                    <div style="margin-bottom: var(--v2-space-md);">
                        <label class="v2-form-section-label">Project Roadmap</label>
                        <div class="v2-periods-container" id="v2PeriodsContainer">
                            ${buildPeriodsHtml()}
                        </div>
                        <button type="button" class="v2-add-period-btn" id="v2AddPeriodBtn" style="margin-top: var(--v2-space-sm); width: 100%;">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 5v14M5 12h14"/>
                            </svg>
                            Add Period
                        </button>
                    </div>
                </div>
                <div class="v2-modal-footer">
                    <button type="button" class="v2-btn v2-btn-secondary" id="v2CancelProjectBtn">Cancel</button>
                    <button type="button" class="v2-btn v2-btn-primary" id="v2CreateProjectBtn">${isEditing ? 'Save Changes' : 'Create Project'}</button>
                </div>
            </div>
        `;

    document.body.appendChild(backdrop);

    // Animate open
    requestAnimationFrame(() => {
        backdrop.classList.add('open');
    });

    const input = backdrop.querySelector('#v2NewProjectName');
    const errorEl = backdrop.querySelector('#v2NewProjectError');
    const createBtn = backdrop.querySelector('#v2CreateProjectBtn');
    const cancelBtn = backdrop.querySelector('#v2CancelProjectBtn');
    const closeBtn = backdrop.querySelector('.v2-modal-close');
    const periodsContainer = backdrop.querySelector('#v2PeriodsContainer');
    const addPeriodBtn = backdrop.querySelector('#v2AddPeriodBtn');

    // Color picker logic
    const colorTrigger = backdrop.querySelector('#v2ColorPickerTrigger');
    const colorPopover = backdrop.querySelector('#v2ColorPopover');
    const colorPreview = backdrop.querySelector('#v2ColorPreview');
    const colorLabel = colorTrigger.querySelector('.v2-picker-label');

    colorTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        colorTrigger.classList.toggle('open');
        colorPopover.classList.toggle('open');
        // Close icon popover
        iconTrigger.classList.remove('open');
        iconPopover.classList.remove('open');
    });

    colorPopover.querySelectorAll('.v2-color-swatch-sm').forEach(swatch => {
        swatch.addEventListener('click', (e) => {
            e.stopPropagation();
            colorPopover.querySelectorAll('.v2-color-swatch-sm').forEach(s => s.classList.remove('selected'));
            swatch.classList.add('selected');
            selectedColor = swatch.dataset.color;
            colorPreview.style.backgroundColor = getColorVar(selectedColor);
            colorLabel.textContent = selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1);
            colorTrigger.classList.remove('open');
            colorPopover.classList.remove('open');
        });
    });

    // Icon picker logic
    const iconTrigger = backdrop.querySelector('#v2IconPickerTrigger');
    const iconPopover = backdrop.querySelector('#v2IconPopover');
    const iconPreview = backdrop.querySelector('#v2IconPreview');

    iconTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        iconTrigger.classList.toggle('open');
        iconPopover.classList.toggle('open');
        // Close color popover
        colorTrigger.classList.remove('open');
        colorPopover.classList.remove('open');
    });

    iconPopover.querySelectorAll('.v2-icon-option-sm').forEach(opt => {
        opt.addEventListener('click', (e) => {
            e.stopPropagation();
            iconPopover.querySelectorAll('.v2-icon-option-sm').forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            selectedIcon = opt.dataset.icon;
            iconPreview.textContent = selectedIcon;
            iconTrigger.classList.remove('open');
            iconPopover.classList.remove('open');
        });
    });

    // Close popovers when clicking outside
    backdrop.addEventListener('click', () => {
        colorTrigger.classList.remove('open');
        colorPopover.classList.remove('open');
        iconTrigger.classList.remove('open');
        iconPopover.classList.remove('open');
    });

    // Periods management
    function updatePeriodData(periodId, field, value) {
        const period = periods.find(p => p.id === periodId);
        if (period) {
            if (field === 'type') {
                const typeInfo = PERIOD_TYPES.find(t => t.value === value);
                if (typeInfo) {
                    period.type = value;
                    period.name = typeInfo.label;
                }
            } else {
                period[field] = value;
            }
        }
    }

    function removePeriod(periodId) {
        periods = periods.filter(p => p.id !== periodId);
        renderPeriods();
    }

    function addPeriod() {
        periodCounter++;
        periods.push({
            id: `period-${periodCounter}`,
            type: 'shoot',
            name: 'Shoot',
            startDate: '',
            endDate: ''
        });
        renderPeriods();
        // Focus new date input? Or scroll to bottom
    }

    function renderPeriods() {
        periodsContainer.innerHTML = buildPeriodsHtml();
        bindPeriodEvents();
    }

    function bindPeriodEvents() {
        periodsContainer.querySelectorAll('.v2-period-row').forEach(row => {
            const periodId = row.dataset.periodId;

            // Inputs
            row.querySelectorAll('input, select').forEach(input => {
                input.addEventListener('change', () => {
                    updatePeriodData(periodId, input.dataset.field, input.value);
                });
                input.addEventListener('input', () => {
                    updatePeriodData(periodId, input.dataset.field, input.value);
                });
            });

            // Remove button
            const removeBtn = row.querySelector('.v2-period-remove');
            if (removeBtn) {
                removeBtn.addEventListener('click', () => {
                    removePeriod(periodId);
                });
            }
        });
    }

    // Initial bind
    bindPeriodEvents();

    // Add period button
    addPeriodBtn.addEventListener('click', addPeriod);

    // Focus input (unless editing)
    if (!isEditing) {
        setTimeout(() => input.focus(), 100);
    }

    function closeModal() {
        backdrop.classList.remove('open');
        setTimeout(() => backdrop.remove(), 200);
    }

    async function handleCreate() {
        const projectName = input.value.trim();

        if (!projectName) {
            errorEl.textContent = 'Please enter a project name.';
            errorEl.style.display = 'block';
            input.focus();
            return;
        }

        const existingNames = getProjectNames();

        // Check duplicates
        if (isEditing) {
            // If named changed, check if new name exists
            if (projectName !== existingProject && existingNames.includes(projectName)) {
                errorEl.textContent = 'A project with this name already exists.';
                errorEl.style.display = 'block';
                input.focus();
                return;
            }
        } else {
            // New Project
            if (existingNames.includes(projectName)) {
                errorEl.textContent = 'A project with this name already exists.';
                errorEl.style.display = 'block';
                input.focus();
                return;
            }
        }

        // Show loading state
        createBtn.disabled = true;
        createBtn.textContent = isEditing ? 'Saving...' : 'Creating...';

        // Collect period data into V1 structures
        const formatPeriod = (period) => {
            if (!period) return null;
            const s = period.startDate;
            const e = period.endDate;
            if (!s && !e) return null;
            if (s && e) return `${s} to ${e}`;
            if (s) return s;
            if (e) return e;
            return null;
        };

        const prepDays = periods.filter(p => p.type === 'prep').map(formatPeriod).filter(Boolean);
        const shootingDays = periods.filter(p => p.type === 'shoot').map(formatPeriod).filter(Boolean);
        const returnDays = periods.filter(p => p.type === 'return').map(formatPeriod).filter(Boolean);

        const metadata = {
            color: selectedColor,
            icon: selectedIcon,
            prepDays,
            shootingDays,
            returnDays
        };

        if (isEditing) {
            // Rename Checks
            if (projectName !== existingProject) {
                const renamed = renameProject(existingProject, projectName, metadata);
                if (renamed) {
                    renderProjectGrid();

                    // If the user has the legacy shim, we might need to refresh it
                    if (global.cineLegacyShim && typeof global.cineLegacyShim.refreshProjects === 'function') {
                        global.cineLegacyShim.refreshProjects();
                    }
                }
            } else {
                // UPDATE Existing (Same Name)
                updateProjectMetadata(projectName, metadata);
                renderProjectGrid(); // Refresh grid
            }
            closeModal();
        } else {
            // CREATE New
            // Wait for creation to complete (it handles navigation)
            await createProject(projectName, metadata);
            closeModal();
        }
    }

    // Event listeners
    createBtn.addEventListener('click', handleCreate);
    cancelBtn.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);

    // Close on backdrop click
    backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeModal();
    });

    // Enter key to create
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleCreate();
        if (e.key === 'Escape') closeModal();
    });

    // Clear error on typing
    input.addEventListener('input', () => {
        errorEl.style.display = 'none';
    });
}


/**
 * Create a new project
 */
async function createProject(projectName, metadata = {}) {
    const provider = getDataProvider();
    if (provider && provider.createProject && provider.createProject(projectName)) {
        // Return a promise that resolves when the project is saved
        return new Promise((resolve) => {
            // Wait for the project to be saved before updating metadata
            // The legacy save is async (triggered via button click), so we poll
            const waitForProjectAndUpdateMetadata = (attempts = 0) => {
                const maxAttempts = 50; // ~5 seconds max (increased from 2s)
                const project = provider.loadProject(projectName);
                if (project) {
                    updateProjectMetadata(projectName, metadata);
                    // Navigate after successful save
                    if (global.cineViewManager) {
                        global.cineViewManager.showView('projectDetail', {
                            projectId: projectName,
                            tab: 'camera'
                        });
                    }
                    resolve(true);
                    return;
                }
                if (attempts < maxAttempts) {
                    setTimeout(() => waitForProjectAndUpdateMetadata(attempts + 1), 100);
                } else {
                    console.warn('[V2] Timed out waiting for project to be saved:', projectName);
                    // Try to navigate anyway? Or show error?
                    // Let's resolve false
                    resolve(false);
                }
            };
            waitForProjectAndUpdateMetadata();
        });
    }

    console.warn('[V2] Project creation is not available for the current data provider.');
    return Promise.resolve(false);
}

// =====================
// VIEW MANAGEMENT
// =====================

/**
 * Create the dashboard view HTML structure
 */
function createDashboardView() {
    // Check if view already exists
    if (document.getElementById(VIEW_ID)) {
        return document.getElementById(VIEW_ID);
    }

    const view = document.createElement('section');
    view.id = VIEW_ID;
    view.className = 'app-view v2-app';
    view.innerHTML = `
      <header class="view-header">
        <h1>Projects</h1>
        <div class="view-header-actions">
          <button type="button" class="v2-btn v2-btn-secondary" id="v2HeaderImportBtn" style="margin-right: 8px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Import Project
          </button>
          <button type="button" class="v2-btn v2-btn-primary" id="v2HeaderCreateBtn">
            + New Project
          </button>
        </div>
      </header>
      <div class="view-content">
        <div class="v2-project-grid" id="${GRID_CONTAINER_ID}">
          <!-- Tiles will be rendered here -->
        </div>
      </div>
    `;

    // Bind header create button
    const headerBtn = view.querySelector('#v2HeaderCreateBtn');
    if (headerBtn) {
        headerBtn.addEventListener('click', showCreateProjectDialog);
    }

    return view;
}

/**
 * Initialize the project dashboard
 */
function init(options = {}) {
    if (options && options.dataProvider) {
        dataProvider = options.dataProvider;
    } else if (!dataProvider) {
        dataProvider = createDefaultDataProvider();
    }

    if (isInitialized) {
        console.warn('[ProjectDashboard] Already initialized, skipping.');
        return;
    }
    isInitialized = true;

    console.log('[ProjectDashboard] init() called');

    // Create dashboard view if it doesn't exist
    const view = createDashboardView();

    // Find main content area and append
    const v2Main = document.querySelector('.v2-main');

    if (v2Main && !document.getElementById(VIEW_ID)) {
        v2Main.appendChild(view);
    }

    // Bind the header button event (Delegated for robustness)
    document.addEventListener('click', (e) => {
        if (e.target) {
            if (e.target.closest('#v2HeaderCreateBtn')) {
                showCreateProjectDialog();
            } else if (e.target.closest('#v2HeaderImportBtn')) {
                // Trigger legacy import
                if (global.cineLegacyShim) {
                    global.cineLegacyShim.triggerLegacyClick('applySharedLinkBtn');
                }
            }
        }
    });

    // If we are already on the projects view, render
    const currentView = document.querySelector('.v2-view.active');
    if (currentView && currentView.id === VIEW_ID) {
        renderProjectGrid(true); // Pass true for initial load
    }

    // Listen for view changes
    window.addEventListener('v2:viewchange', (e) => {
        if (e.detail.view === 'projects') {
            // If switching to this view, treat as initial load
            renderProjectGrid(true);
        }
    });

    bindSearchEvents();
}

// =====================
// PUBLIC API
// =====================
const ProjectDashboard = {
    init,
    renderProjectGrid,
    createProject,
    deleteProject,
    openProject,
    getProjectNames,
    createDashboardView,
    formatDate,
    formatDateRange,
    createDefaultDataProvider,
    createUiOnlyDataProvider
};

// Expose to global scope
if (typeof global !== 'undefined') {
    global.cineProjectDashboard = ProjectDashboard;
}

if (typeof window !== 'undefined') {
    window.cineProjectDashboard = ProjectDashboard;
}

// Auto-initialize when DOM is ready
// BUT only if not already initialized by V2 Bootstrap
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            // Delay init to let other V2 modules load first
            setTimeout(() => {
                if (!isInitialized) {
                    console.log('[ProjectDashboard] Auto-initializing (Fallback)');
                    init();
                }
            }, 200);
        });
    } else {
        setTimeout(() => {
            if (!isInitialized) {
                console.log('[ProjectDashboard] Auto-initializing (Fallback)');
                init();
            }
        }, 200);
    }
}

export { ProjectDashboard };
