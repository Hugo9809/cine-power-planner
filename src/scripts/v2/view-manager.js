/**
 * Cine Power Planner V2 - View Manager
 * =====================================
 * Manages SPA-style view switching and URL hash routing.
 * 
 * Core responsibilities:
 * 1. Toggle visibility of .app-view sections
 * 2. Manage URL hash routing (#projects, #project/:id, etc.)
 * 3. Dispatch custom events for view changes
 * 4. Handle browser back/forward navigation
 */

(function (global) {
    'use strict';

    // =====================
    // CONFIGURATION
    // =====================
    const VIEW_SELECTOR = '.app-view';
    const ACTIVE_CLASS = 'active';
    const DEFAULT_VIEW = 'projects';

    // View definitions
    const VIEWS = {
        projects: {
            id: 'view-projects',
            title: 'Projects',
            pattern: /^#?\/?projects?\/?$/i
        },
        projectDetail: {
            id: 'view-project-detail',
            title: 'Project',
            pattern: /^#?\/?project\/([^/]+)(\/([a-z]+))?\/?$/i
        },
        settings: {
            id: 'view-settings',
            title: 'Settings',
            pattern: /^#?\/?settings?\/?$/i
        },
        contacts: {
            id: 'view-contacts',
            title: 'Contacts',
            pattern: /^#?\/?contacts?\/?$/i
        },
        devices: {
            id: 'view-devices',
            title: 'Device Library',
            pattern: /^#?\/?devices?\/?$/i
        },
        help: {
            id: 'view-help',
            title: 'Help',
            pattern: /^#?\/?help\/?$/i
        },
        rules: {
            id: 'view-rules',
            title: 'Auto Gear Rules',
            pattern: /^#?\/?rules\/?$/i
        }
    };

    // =====================
    // STATE
    // =====================
    let currentView = null;
    let currentParams = {};
    let viewHistory = [];
    let isV2Active = false;

    // =====================
    // DOM HELPERS
    // =====================

    /**
     * Get the main V2 app container
     */
    function getAppContainer() {
        return document.querySelector('.v2-app') || document.getElementById('v2-app');
    }

    /**
     * Get all view elements
     */
    function getAllViews() {
        const container = getAppContainer();
        if (!container) return [];
        return Array.from(container.querySelectorAll(VIEW_SELECTOR));
    }

    /**
     * Get a specific view element by ID
     */
    function getViewElement(viewId) {
        return document.getElementById(viewId);
    }

    // =====================
    // VIEW SWITCHING
    // =====================

    /**
     * Show a specific view and hide all others
     * @param {string} viewName - The name of the view to show (e.g., 'projects', 'projectDetail')
     * @param {object} params - Optional parameters (e.g., { projectId: 'my-project', tab: 'power' })
     * @returns {boolean} - Whether the view switch was successful
     */
    function showView(viewName, params = {}) {
        const viewConfig = VIEWS[viewName];
        if (!viewConfig) {
            console.warn(`[ViewManager] Unknown view: ${viewName}`);
            return false;
        }

        const viewElement = getViewElement(viewConfig.id);
        if (!viewElement) {
            console.warn(`[ViewManager] View element not found: ${viewConfig.id}`);
            return false;
        }

        // Hide all views
        getAllViews().forEach(view => {
            view.classList.remove(ACTIVE_CLASS);
        });

        // Show the target view
        viewElement.classList.add(ACTIVE_CLASS);

        // Store previous view for history
        if (currentView && currentView !== viewName) {
            viewHistory.push({ view: currentView, params: currentParams });
        }

        // Update state
        currentView = viewName;
        currentParams = params;

        // Update URL hash (without triggering hashchange)
        updateHash(viewName, params);

        // Dispatch view change event
        dispatchViewChange(viewName, params);

        // Update document title
        updateDocumentTitle(viewConfig.title, params);

        return true;
    }

    /**
     * Navigate back to the previous view
     */
    function goBack() {
        if (viewHistory.length > 0) {
            const previous = viewHistory.pop();
            showView(previous.view, previous.params);
            return true;
        }
        // Default to projects view
        showView(DEFAULT_VIEW);
        return false;
    }

    /**
     * Get the current view name
     */
    function getCurrentView() {
        return currentView;
    }

    /**
     * Get the current view parameters
     */
    function getCurrentParams() {
        return { ...currentParams };
    }

    // =====================
    // URL HASH ROUTING
    // =====================

    /**
     * Update the URL hash to reflect the current view
     */
    function updateHash(viewName, params) {
        let hash = '';

        switch (viewName) {
            case 'projects':
                hash = '#/projects';
                break;
            case 'projectDetail':
                hash = `#/project/${encodeURIComponent(params.projectId || 'new')}`;
                if (params.tab) {
                    hash += `/${params.tab}`;
                }
                break;
            case 'settings':
                hash = '#/settings';
                break;
            case 'contacts':
                hash = '#/contacts';
                break;
            case 'devices':
                hash = '#/devices';
                break;
            case 'help':
                hash = '#/help';
                break;
            case 'rules':
                hash = '#/rules';
                break;
            default:
                hash = '#/projects';
        }

        // Update hash without triggering navigation
        if (window.location.hash !== hash) {
            history.replaceState(null, '', hash);
        }
    }

    /**
     * Parse the current hash and navigate to the matching view
     */
    function parseHash() {
        const hash = window.location.hash || '#/projects';

        for (const [viewName, config] of Object.entries(VIEWS)) {
            const match = hash.match(config.pattern);
            if (match) {
                const params = {};

                // Extract parameters based on view type
                if (viewName === 'projectDetail' && match[1]) {
                    params.projectId = decodeURIComponent(match[1]);
                    if (match[3]) {
                        params.tab = match[3];
                    }
                }

                return { viewName, params };
            }
        }

        // Default to projects view
        return { viewName: DEFAULT_VIEW, params: {} };
    }

    /**
     * Handle hash change events (browser back/forward)
     */
    function handleHashChange() {
        const { viewName, params } = parseHash();
        showView(viewName, params);
    }

    // =====================
    // EVENTS
    // =====================

    /**
     * Dispatch a custom view change event
     */
    function dispatchViewChange(viewName, params) {
        const event = new CustomEvent('v2:viewchange', {
            bubbles: true,
            detail: {
                view: viewName,
                params: params,
                previousView: viewHistory.length > 0 ? viewHistory[viewHistory.length - 1] : null
            }
        });
        document.dispatchEvent(event);
    }

    /**
     * Update the document title based on the current view
     */
    function updateDocumentTitle(baseTitle, params) {
        let title = baseTitle;

        if (params.projectId && params.projectId !== 'new') {
            title = `${params.projectId} - ${baseTitle}`;
        }

        document.title = `${title} | Cine Power Planner`;
    }

    // =====================
    // V2 UI TOGGLE
    // =====================

    /**
     * Check if V2 UI is enabled
     */
    function isV2Enabled() {
        try {
            return localStorage.getItem('cine_use_v2_ui') === 'true';
        } catch (e) {
            return false;
        }
    }

    /**
     * Enable the V2 UI
     */
    function enableV2() {
        try {
            localStorage.setItem('cine_use_v2_ui', 'true');
            isV2Active = true;
            document.body.classList.add('v2-mode');

            // Hide legacy UI
            const legacyMain = document.getElementById('mainContent');
            if (legacyMain) {
                legacyMain.style.display = 'none';
            }

            // Show V2 container
            const v2Container = getAppContainer();
            if (v2Container) {
                v2Container.style.display = '';
            }

            // Navigate to current hash
            handleHashChange();

            return true;
        } catch (e) {
            console.error('[ViewManager] Failed to enable V2 UI:', e);
            return false;
        }
    }

    /**
     * Disable the V2 UI and return to legacy
     */
    function disableV2() {
        try {
            localStorage.setItem('cine_use_v2_ui', 'false');
            isV2Active = false;
            document.body.classList.remove('v2-mode');

            // Show legacy UI
            const legacyMain = document.getElementById('mainContent');
            if (legacyMain) {
                legacyMain.style.display = '';
            }

            // Hide V2 container
            const v2Container = getAppContainer();
            if (v2Container) {
                v2Container.style.display = 'none';
            }

            return true;
        } catch (e) {
            console.error('[ViewManager] Failed to disable V2 UI:', e);
            return false;
        }
    }

    /**
     * Toggle V2 UI on/off
     */
    function toggleV2() {
        if (isV2Active) {
            return disableV2();
        } else {
            return enableV2();
        }
    }

    // =====================
    // INITIALIZATION
    // =====================

    /**
     * Initialize the view manager
     */
    function init() {
        // Listen for hash changes
        window.addEventListener('hashchange', handleHashChange);

        // Check if V2 is enabled
        if (isV2Enabled()) {
            enableV2();
        }

        console.log('[ViewManager] Initialized');
    }

    // =====================
    // PUBLIC API
    // =====================
    const ViewManager = {
        // View navigation
        showView,
        goBack,
        getCurrentView,
        getCurrentParams,

        // Hash routing
        parseHash,

        // V2 toggle
        isV2Enabled,
        enableV2,
        disableV2,
        toggleV2,

        // Initialization
        init,

        // Constants
        VIEWS,
        DEFAULT_VIEW
    };

    // Expose to global scope
    if (typeof global !== 'undefined') {
        global.cineViewManager = ViewManager;
    }

    if (typeof window !== 'undefined') {
        window.cineViewManager = ViewManager;
    }

    // Auto-initialize when DOM is ready
    if (typeof document !== 'undefined') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
    }

    // Module export
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = ViewManager;
    }

})(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : this);
