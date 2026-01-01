/**
 * Cine Power Planner V2 - Project Dashboard Component
 * =====================================================
 * Renders the project grid with tiles for each saved project.
 */

(function (global) {
    'use strict';

    // =====================
    // CONFIGURATION
    // =====================
    const GRID_CONTAINER_ID = 'projectGrid';
    const VIEW_ID = 'view-projects';
    const STORAGE_KEY = 'cameraPowerPlanner_setups';

    // Color palette for project tiles
    const TILE_COLORS = ['blue', 'green', 'orange', 'purple', 'red', 'pink', 'teal', 'indigo'];

    // Icon options
    const PROJECT_ICONS = ['📽️', '🎬', '⚡', '🔋', '🎥', '📺', '💡', '🎞️', '📸', '🎯', '📝', '⭐'];

    // =====================
    // STATE
    // =====================
    // let colorIndex = 0;
    let currentFilter = {
        query: '',
        type: 'active' // 'active' | 'archived'
    };

    // =====================
    // HELPERS
    // =====================

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

    // =====================
    // PROJECT DATA
    // =====================

    /**
     * Get all saved project names from legacy system
     */
    function getProjectNames() {
        // Try to use legacy shim if available
        if (global.cineLegacyShim && typeof global.cineLegacyShim.getProjectNames === 'function') {
            return global.cineLegacyShim.getProjectNames();
        }

        // Fallback: read from setupSelect
        const setupSelect = document.getElementById('setupSelect');
        if (!setupSelect) return [];

        const names = Array.from(setupSelect.options)
            .map(opt => opt.value)
            .filter(val => val !== '');

        return [...new Set(names)];
    }

    /**
     * Get filtered projects based on current state
     */
    function getFilteredProjects() {
        let projects = getProjectNames();

        // 1. Filter by Query
        if (currentFilter.query) {
            const q = currentFilter.query.toLowerCase();
            projects = projects.filter(name => name.toLowerCase().includes(q));
        }

        // 2. Filter by Type (Placeholder for Archive logic)
        // if (currentFilter.type === 'archived') { ... }

        return projects;
    }

    /**
     * Get project metadata (color, icon, last modified)
     */
    function getProjectMetadata(projectName) {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const data = JSON.parse(stored);
                // Data is { "ProjectName": { ... } }
                if (data && data[projectName]) {
                    const project = data[projectName];
                    return {
                        lastModified: project.lastModified || null,
                        color: project.color || null,
                        icon: project.icon || null
                    };
                }
            }
        } catch (_e) {
            void _e;
            // Ignore errors
        }
        return { lastModified: null, color: null, icon: null };
    }

    /**
     * Update project metadata (color, icon)
     */
    function updateProjectMetadata(projectName, metadata = {}) {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const data = JSON.parse(stored);
                if (data && data[projectName]) {
                    // Merge new metadata
                    if (metadata.color) data[projectName].color = metadata.color;
                    if (metadata.icon) data[projectName].icon = metadata.icon;

                    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
                    return true;
                }
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
        const color = metadata.color || TILE_COLORS[index % TILE_COLORS.length];

        // Use stored icon or default
        const icon = metadata.icon || '📽️';

        const dateStr = metadata.lastModified ? formatDate(metadata.lastModified) : '';
        const escapedName = escapeHtml(projectName);

        return `
      <div class="v2-project-tile" data-project="${escapedName}" tabindex="0" role="button" aria-label="Open project ${escapedName}">
        <div class="v2-tile-header">
          <div class="v2-tile-icon color-${color}">${icon}</div>
          <div class="v2-tile-info">
            <h3 class="v2-tile-title">${escapedName}</h3>
            ${dateStr ? `<span class="v2-tile-meta">${dateStr}</span>` : ''}
          </div>
          <div class="v2-tile-actions">
            <button type="button" class="v2-tile-action-btn danger" data-action="delete" data-project="${escapedName}" title="Delete project" aria-label="Delete ${escapedName}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
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
      <div class="v2-project-tile new-project" id="v2NewProjectBtn" tabindex="0" role="button" aria-label="Create new project">
        <div class="v2-tile-header center">
          <div class="v2-tile-icon-add">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14M5 12h14" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h3 class="v2-tile-title">New Project</h3>
        </div>
      </div>
    `;
    }

    /**
     * Create Empty State HTML (No Projects)
     */
    function createEmptyStateHtml() {
        return `
      <div class="view-empty-state">
        <img src="assets/icons/empty-box.svg" alt="No projects" class="view-empty-state-icon" onerror="this.style.display='none'">
        <h2>No Projects Yet</h2>
        <p class="text-muted">Create your first power plan to get started.</p>
        <button id="v2EmptyStateBtn" class="v2-btn-primary">
          + Create Project
        </button>
      </div>
    `;
    }

    /**
     * Create No Results HTML (Search)
     */
    function createNoResultsHtml(query) {
        return `
      <div class="view-empty-state">
        <div class="view-empty-state-icon" style="font-size: 48px; display: flex; align-items: center; justify-content: center;">🔍</div>
        <h2>No Results Finding "${escapeHtml(query)}"</h2>
        <p class="text-muted">Try adjustment your search terms.</p>
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
        const container = document.getElementById(GRID_CONTAINER_ID);
        if (!container) return;

        // Reset
        container.innerHTML = '';
        container.className = 'v2-project-grid'; // Reset classes
        container.style = ''; // Reset inline styles

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
    function bindTileEvents(container) {
        // Click on tile (open project)
        container.querySelectorAll('.v2-project-tile').forEach(tile => {
            // Left Click
            tile.addEventListener('click', (e) => {
                // Don't trigger if clicking on delete button
                if (e.target.closest('[data-action="delete"]')) return;

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

        // Click on delete button
        container.querySelectorAll('[data-action="delete"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const projectName = btn.dataset.project;
                if (projectName) {
                    deleteProject(projectName);
                }
            });
        });

        // Click on new project tile
        const newProjectTile = container.querySelector('#v2CreateProjectTile');
        if (newProjectTile) {
            newProjectTile.addEventListener('click', showCreateProjectDialog);
            newProjectTile.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    showCreateProjectDialog();
                }
            });
        }
    }

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
                Open Project
            </button>
             <div style="height: 1px; background: var(--v2-border-default); margin: 4px 0;"></div>
            <button class="v2-context-menu-item danger" data-action="delete">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                </svg>
                Delete Project
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
            createBtn.addEventListener('click', showCreateProjectDialog);
        }
    }

    // =====================
    // PROJECT OPERATIONS
    // =====================

    /**
     * Open a project (navigate to detail view)
     */
    function openProject(projectName) {
        // Load the project via legacy shim
        if (global.cineLegacyShim) {
            global.cineLegacyShim.loadProject(projectName);
        }

        // Navigate to project detail view
        if (global.cineViewManager) {
            global.cineViewManager.showView('projectDetail', {
                projectId: projectName,
                tab: 'camera'
            });
        }
    }

    /**
     * Delete a project
     */
    function deleteProject(projectName) {
        // Use the legacy delete flow which includes confirmation
        const setupSelect = document.getElementById('setupSelect');
        if (setupSelect) {
            setupSelect.value = projectName;
            // Trigger the legacy change event first
            if (global.cineLegacyShim) {
                global.cineLegacyShim.dispatchNativeEvent(setupSelect, 'change');
            }
        }

        // Then trigger delete
        if (global.cineLegacyShim) {
            global.cineLegacyShim.deleteProject();
        }

        // Refresh the grid after a short delay (to allow confirmation)
        setTimeout(() => {
            renderProjectGrid();
        }, 500);
    }

    /**
     * Show create project dialog using internal modal
     */
    function showCreateProjectDialog() {
        const randomColorIndex = Math.floor(Math.random() * TILE_COLORS.length);
        let selectedColor = TILE_COLORS[randomColorIndex];
        let selectedIcon = '📽️';

        // Create color swatches HTML
        const colorSwatchesHtml = TILE_COLORS.map(color => `
            <button type="button" class="v2-color-swatch color-${color} ${color === selectedColor ? 'selected' : ''}" 
                    data-color="${color}" aria-label="Select ${color} color">
            </button>
        `).join('');

        // Create icon grid HTML
        const iconGridHtml = PROJECT_ICONS.map(icon => `
            <button type="button" class="v2-icon-option ${icon === selectedIcon ? 'selected' : ''}" 
                    data-icon="${icon}" aria-label="Select icon ${icon}">
                ${icon}
            </button>
        `).join('');

        // Modal styles for new elements
        const modalStyles = `
            <style>
                .v2-color-swatch {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    border: 2px solid transparent;
                    cursor: pointer;
                    transition: transform 0.2s, border-color 0.2s;
                    background-color: currentColor; /* Inherit from class color logic via CSS vars usually, but here we need mapping */
                }
                /* Manual color mapping since CSS classes might be complex */
                .v2-color-swatch.color-blue { background-color: var(--v2-color-blue); }
                .v2-color-swatch.color-green { background-color: var(--v2-color-green); }
                .v2-color-swatch.color-orange { background-color: var(--v2-color-orange); }
                .v2-color-swatch.color-purple { background-color: var(--v2-color-purple); }
                .v2-color-swatch.color-red { background-color: var(--v2-color-red); }
                .v2-color-swatch.color-pink { background-color: var(--v2-color-pink); }
                .v2-color-swatch.color-teal { background-color: var(--v2-color-teal); }
                .v2-color-swatch.color-indigo { background-color: var(--v2-color-indigo); }

                .v2-color-swatch:hover { transform: scale(1.1); }
                .v2-color-swatch.selected { 
                    border-color: var(--v2-text-primary); 
                    transform: scale(1.1);
                    box-shadow: 0 0 0 2px var(--v2-surface-base), 0 0 0 4px var(--v2-brand-blue);
                }

                .v2-icon-option {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    font-size: 20px;
                    border: 1px solid var(--v2-border-default);
                    border-radius: var(--v2-radius-md);
                    background: var(--v2-surface-input);
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .v2-icon-option:hover { background: var(--v2-surface-muted); }
                .v2-icon-option.selected {
                    background: var(--v2-brand-blue);
                    color: white;
                    border-color: var(--v2-brand-blue);
                }

                .v2-form-section-label {
                    display: block; 
                    margin-bottom: var(--v2-space-sm); 
                    font-weight: var(--v2-font-weight-medium);
                    font-size: var(--v2-font-size-sm);
                    color: var(--v2-text-secondary);
                }
            </style>
        `;

        // Create modal backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'v2-modal-backdrop';
        backdrop.innerHTML = `
            ${modalStyles}
            <div class="v2-modal v2-modal-sm">
                <div class="v2-modal-header">
                    <h3 class="v2-modal-title">Create New Project</h3>
                    <button type="button" class="v2-modal-close v2-btn v2-btn-ghost" aria-label="Close">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
                <div class="v2-modal-body">
                    <div style="margin-bottom: var(--v2-space-lg);">
                        <label for="v2NewProjectName" class="v2-form-section-label" style="font-size: var(--v2-font-size-base); color: var(--v2-text-primary);">
                            Project Name
                        </label>
                        <input type="text" id="v2NewProjectName" class="v2-input" placeholder="Enter project name..." 
                               style="width: 100%; padding: var(--v2-space-sm) var(--v2-space-md); border: 1px solid var(--v2-border-default); border-radius: var(--v2-radius-md); font-size: var(--v2-font-size-base);">
                        <p id="v2NewProjectError" style="color: var(--v2-status-error); font-size: var(--v2-font-size-sm); margin-top: var(--v2-space-sm); display: none;"></p>
                    </div>

                    <div style="margin-bottom: var(--v2-space-lg);">
                        <label class="v2-form-section-label">Project Color</label>
                        <div style="display: flex; gap: var(--v2-space-sm); flex-wrap: wrap;">
                            ${colorSwatchesHtml}
                        </div>
                    </div>

                    <div style="margin-bottom: var(--v2-space-md);">
                        <label class="v2-form-section-label">Project Icon</label>
                        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(40px, 1fr)); gap: var(--v2-space-sm);">
                            ${iconGridHtml}
                        </div>
                    </div>
                </div>
                <div class="v2-modal-footer">
                    <button type="button" class="v2-btn v2-btn-secondary" id="v2CancelProjectBtn">Cancel</button>
                    <button type="button" class="v2-btn v2-btn-primary" id="v2CreateProjectBtn">Create Project</button>
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

        // Color selection logic
        const colorSwatches = backdrop.querySelectorAll('.v2-color-swatch');
        colorSwatches.forEach(swatch => {
            swatch.addEventListener('click', () => {
                colorSwatches.forEach(s => s.classList.remove('selected'));
                swatch.classList.add('selected');
                selectedColor = swatch.dataset.color;
            });
        });

        // Icon selection logic
        const iconOptions = backdrop.querySelectorAll('.v2-icon-option');
        iconOptions.forEach(opt => {
            opt.addEventListener('click', () => {
                iconOptions.forEach(o => o.classList.remove('selected'));
                opt.classList.add('selected');
                selectedIcon = opt.dataset.icon;
            });
        });

        // Focus input
        setTimeout(() => input.focus(), 100);

        function closeModal() {
            backdrop.classList.remove('open');
            setTimeout(() => backdrop.remove(), 200);
        }

        function handleCreate() {
            const projectName = input.value.trim();

            if (!projectName) {
                errorEl.textContent = 'Please enter a project name.';
                errorEl.style.display = 'block';
                input.focus();
                return;
            }

            // Check if project already exists
            const existingNames = getProjectNames();
            if (existingNames.includes(projectName)) {
                errorEl.textContent = 'A project with this name already exists.';
                errorEl.style.display = 'block';
                input.focus();
                return;
            }

            closeModal();
            createProject(projectName, { color: selectedColor, icon: selectedIcon });
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
    function createProject(projectName, metadata = {}) {
        if (global.cineLegacyShim) {
            global.cineLegacyShim.createProject(projectName);

            // Immediately update metadata (color/icon) in storage
            updateProjectMetadata(projectName, metadata);
        }

        // Navigate to the new project
        if (global.cineViewManager) {
            global.cineViewManager.showView('projectDetail', {
                projectId: projectName,
                tab: 'camera'
            });
        }
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
    function init() {
        console.log('[ProjectDashboard] init() called');

        // Create dashboard view if it doesn't exist
        const view = createDashboardView();

        // Find main content area and append
        const v2Main = document.querySelector('.v2-main');

        if (v2Main && !document.getElementById(VIEW_ID)) {
            v2Main.appendChild(view);
        }

        // Bind the header button event
        const headerBtn = document.getElementById('v2HeaderCreateBtn');
        if (headerBtn) {
            headerBtn.addEventListener('click', showCreateProjectDialog);
        }

        // Listen for view changes
        document.addEventListener('v2:viewchange', (e) => {
            if (e.detail && e.detail.view === 'projects') {
                renderProjectGrid();
            }
        });

        // Initial render
        renderProjectGrid();

        // Bind Search Events
        bindSearchEvents();

        console.log('[ProjectDashboard] Initialized');
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
        createDashboardView
    };

    // Expose to global scope
    if (typeof global !== 'undefined') {
        global.cineProjectDashboard = ProjectDashboard;
    }

    if (typeof window !== 'undefined') {
        window.cineProjectDashboard = ProjectDashboard;
    }

    // Auto-initialize when DOM is ready
    if (typeof document !== 'undefined') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                // Delay init to let other V2 modules load first
                setTimeout(init, 200);
            });
        } else {
            setTimeout(init, 200);
        }
    }

    // Module export
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = ProjectDashboard;
    }

})(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : this);
