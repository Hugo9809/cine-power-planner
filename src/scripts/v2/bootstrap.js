/**
 * Cine Power Planner V2 - Bootstrap
 * ===================================
 * Entry point for V2 UI initialization.
 * Loads V2 modules and coordinates startup.
 */

(function (global) {
    'use strict';

    // =====================
    // STATE
    // =====================
    let isInitialized = false;
    let isV2Enabled = false;

    // =====================
    // FEATURE FLAG
    // =====================
    const V2_STORAGE_KEY = 'cine_use_v2_ui';

    /**
     * Check if V2 UI is enabled via feature flag
     */
    function checkV2Enabled() {
        try {
            // Check URL params first
            const params = new URLSearchParams(window.location.search);
            if (params.has('v2')) {
                const urlEnabled = params.get('v2') === 'true';
                localStorage.setItem(V2_STORAGE_KEY, urlEnabled.toString());
                return urlEnabled;
            }

            return localStorage.getItem(V2_STORAGE_KEY) === 'true';
        } catch (e) {
            return false;
        }
    }

    /**
     * Restore Theme State (Dark/Pink) immediately
     */
    function restoreThemeState() {
        const isDark = localStorage.getItem('darkMode') === 'true';
        document.body.classList.toggle('dark-mode', isDark);

        const isPink = localStorage.getItem('cameraPowerPlanner_pinkMode') === 'true' ||
            localStorage.getItem('pinkMode') === 'true';
        document.body.classList.toggle('pink-mode', isPink);
    }

    /**
     * Enable V2 UI
     */
    function enableV2() {
        try {
            localStorage.setItem(V2_STORAGE_KEY, 'true');
            isV2Enabled = true;

            // Activate V2 mode on body
            document.body.classList.add('v2-mode');

            // [Persistence Fix] Restore themes immediately
            restoreThemeState();

            // Hide legacy UI elements
            const legacyHeader = document.getElementById('topBar');
            const legacyMain = document.getElementById('mainContent');
            const legacySidebar = document.getElementById('sideMenu');
            const menuOverlay = document.getElementById('menuOverlay');

            // [Fix] Hide Legacy Loader explicitly
            const legacyLoader = document.getElementById('cineGlobalLoadingIndicator');
            if (legacyLoader) legacyLoader.style.display = 'none';

            if (legacyHeader) legacyHeader.style.display = 'none';
            if (legacyMain) legacyMain.style.display = 'none';
            if (legacySidebar) legacySidebar.style.display = 'none';
            if (menuOverlay) menuOverlay.style.display = 'none';

            // Hide footer
            const legacyFooter = document.getElementById('siteFooter');
            if (legacyFooter) legacyFooter.style.display = 'none';

            // [Fix] Hide All Floating/Fixed Legacy Elements
            const installBanner = document.getElementById('installPromptBanner');
            const offlineIndicator = document.getElementById('offlineIndicator');
            const notificationStack = document.getElementById('backupNotificationContainer');

            if (installBanner) installBanner.style.display = 'none';
            if (offlineIndicator) offlineIndicator.style.display = 'none';
            if (notificationStack) notificationStack.style.display = 'none';

            // Show V2 container
            const v2Container = document.getElementById('v2-app');
            if (v2Container) {
                v2Container.style.display = '';
                v2Container.setAttribute('aria-hidden', 'false');
            }

            // Initialize View Manager
            if (global.cineViewManager && typeof global.cineViewManager.enableV2 === 'function') {
                global.cineViewManager.enableV2();
            }

            // Bind Exit V2 button
            bindExitButton();

            // Initialize and render the project dashboard
            if (global.cineProjectDashboard) {
                if (typeof global.cineProjectDashboard.init === 'function') {
                    global.cineProjectDashboard.init();
                }
                if (typeof global.cineProjectDashboard.renderProjectGrid === 'function') {
                    global.cineProjectDashboard.renderProjectGrid();
                }
            }

            // Initialize sidebar (search functionality)
            if (global.cineV2Sidebar && typeof global.cineV2Sidebar.init === 'function') {
                global.cineV2Sidebar.init();
            }

            // Initialize project detail (for view-change events)
            if (global.cineProjectDetail && typeof global.cineProjectDetail.init === 'function') {
                global.cineProjectDetail.init();
            }

            // [Fix] Hide V2 Loader after successfully initializing
            hideV2Loader();

            console.log('[V2 Bootstrap] V2 UI enabled');
            return true;
        } catch (e) {
            console.error('[V2 Bootstrap] Failed to enable V2:', e);
            // If failed, make sure loader is gone so user sees error or backup
            hideV2Loader();
            return false;
        }
    }

    /**
     * Show V2 Loader
     */
    function showV2Loader() {
        let loader = document.getElementById('v2-loader');
        if (!loader) {
            loader = document.createElement('div');
            loader.id = 'v2-loader';
            loader.innerHTML = `
                <div class="v2-loader-content">
                    <div class="v2-spinner"></div>
                    <div class="v2-loader-text">Loading Cine Power Planner...</div>
                </div>
            `;
            document.body.appendChild(loader);
        }
        loader.classList.add('visible');
    }

    /**
     * Hide V2 Loader
     */
    function hideV2Loader() {
        const loader = document.getElementById('v2-loader');
        if (loader) {
            loader.classList.remove('visible');
            setTimeout(() => {
                if (loader.parentNode) loader.parentNode.removeChild(loader);
            }, 500); // Wait for fade out
        }
    }

    /**
     * Disable V2 UI
     */
    function disableV2() {
        try {
            localStorage.setItem(V2_STORAGE_KEY, 'false');
            isV2Enabled = false;

            // Remove V2 mode from body
            document.body.classList.remove('v2-mode');

            // Show legacy UI elements
            const legacyHeader = document.getElementById('topBar');
            const legacyMain = document.getElementById('mainContent');
            const legacySidebar = document.getElementById('sideMenu');
            const menuOverlay = document.getElementById('menuOverlay');
            const legacyFooter = document.getElementById('siteFooter');

            if (legacyHeader) legacyHeader.style.display = '';
            if (legacyMain) legacyMain.style.display = '';
            if (legacySidebar) legacySidebar.style.display = '';
            if (menuOverlay) menuOverlay.style.display = '';
            if (legacyFooter) legacyFooter.style.display = '';

            // Hide V2 container
            const v2Container = document.getElementById('v2-app');
            if (v2Container) {
                v2Container.style.display = 'none';
                v2Container.setAttribute('aria-hidden', 'true');
            }

            // Disable View Manager
            if (global.cineViewManager && typeof global.cineViewManager.disableV2 === 'function') {
                global.cineViewManager.disableV2();
            }

            console.log('[V2 Bootstrap] V2 UI disabled');
            return true;
        } catch (e) {
            console.error('[V2 Bootstrap] Failed to disable V2:', e);
            return false;
        }
    }

    /**
     * Bind the Exit V2 button in the sidebar
     */
    function bindExitButton() {
        const exitBtn = document.getElementById('v2ExitBtn');
        if (exitBtn && !exitBtn.dataset.bound) {
            exitBtn.dataset.bound = 'true';
            exitBtn.addEventListener('click', () => {
                disableV2();
                window.location.reload();
            });
        }
    }

    /**
     * Toggle V2 UI
     */
    function toggleV2() {
        if (isV2Enabled) {
            return disableV2();
        } else {
            return enableV2();
        }
    }

    // =====================
    // LAZY LOADING
    // =====================

    /**
     * Load a script dynamically
     */
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    /**
     * Load a stylesheet dynamically
     */
    function loadStylesheet(href) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.onload = resolve;
            link.onerror = reject;
            document.head.appendChild(link);
        });
    }

    /**
     * Load V2 assets (CSS and JS)
     */
    async function loadV2Assets() {
        try {
            // Load V2 CSS
            await loadStylesheet('src/styles/v2/index.css?v=2');
            await loadStylesheet('src/styles/v2/views/rules-view.css');
            console.log('[V2 Bootstrap] V2 CSS loaded');

            // Load V2 JS modules
            await loadScript('src/scripts/v2/view-manager.js?v=rules_1');
            await loadScript('src/scripts/v2/legacy-shim.js');
            await loadScript('src/scripts/v2/sidebar.js?v=final_sidebar'); // Load sidebar logic
            await loadScript('src/scripts/v2/views/rules-view.js'); // Load Rules View
            console.log('[V2 Bootstrap] V2 JS modules loaded');

            // Initialize Sidebar
            if (global.cineV2Sidebar && typeof global.cineV2Sidebar.init === 'function') {
                global.cineV2Sidebar.init();
            }

            // Initialize Rules View
            if (global.cineRulesView && typeof global.cineRulesView.init === 'function') {
                global.cineRulesView.init();
            }

            return true;
        } catch (e) {
            console.error('[V2 Bootstrap] Failed to load V2 assets:', e);
            return false;
        }
    }

    // =====================
    // INITIALIZATION
    // =====================

    /**
     * Initialize V2 Bootstrap
     */
    async function init() {
        if (isInitialized) {
            console.warn('[V2 Bootstrap] Already initialized');
            return;
        }

        isInitialized = true;
        isV2Enabled = checkV2Enabled();

        console.log(`[V2 Bootstrap] Starting. V2 enabled: ${isV2Enabled}`);

        // Only load V2 assets if V2 is enabled OR if we're in development
        if (isV2Enabled) {
            showV2Loader(); // [New] Show immediately
            const loaded = await loadV2Assets();
            if (loaded) {
                enableV2(); // this eventually hides it
            } else {
                hideV2Loader(); // Fallback
            }
        }

        // Add "Try New UI" button to settings (if not already present)
        injectV2ToggleButton();

        console.log('[V2 Bootstrap] Initialization complete');
    }

    /**
     * Inject a toggle button into the settings dialog
     */
    function injectV2ToggleButton() {
        // Check if button already exists
        if (document.getElementById('v2ToggleBtn')) {
            return;
        }

        // Find the settings dialog
        const settingsDialog = document.getElementById('settingsDialog');
        if (!settingsDialog) {
            return;
        }

        // Find a place to add the button (e.g., settings content area)
        const settingsContent = settingsDialog.querySelector('.modal-content, .settings-content, .modal-surface');
        if (!settingsContent) {
            return;
        }

        // Create the toggle section
        const toggleSection = document.createElement('div');
        toggleSection.className = 'settings-row v2-toggle-section';
        toggleSection.style.cssText = 'margin-top: 16px; padding-top: 16px; border-top: 1px solid #ddd;';

        const label = document.createElement('label');
        label.textContent = 'Experimental UI';
        label.style.cssText = 'font-weight: 600; display: block; margin-bottom: 8px;';

        const description = document.createElement('p');
        description.textContent = 'Try the new V2 interface design. This is experimental and can be toggled off at any time.';
        description.style.cssText = 'font-size: 0.875rem; color: #666; margin-bottom: 12px;';

        const button = document.createElement('button');
        button.id = 'v2ToggleBtn';
        button.type = 'button';
        button.className = 'v2-btn v2-btn-secondary';
        button.style.cssText = 'padding: 8px 16px; border-radius: 6px; cursor: pointer; background: #4a90d9; color: white; border: none;';
        button.textContent = isV2Enabled ? 'Return to Classic UI' : 'Try New UI';

        button.addEventListener('click', () => {
            toggleV2();
            button.textContent = isV2Enabled ? 'Return to Classic UI' : 'Try New UI';
            // Reload to apply changes
            window.location.reload();
        });

        toggleSection.appendChild(label);
        toggleSection.appendChild(description);
        toggleSection.appendChild(button);
        settingsContent.appendChild(toggleSection);
    }

    // =====================
    // PUBLIC API
    // =====================
    const V2Bootstrap = {
        init,
        enableV2,
        disableV2,
        toggleV2,
        isV2Enabled: () => isV2Enabled,
        loadV2Assets
    };

    // Expose to global scope
    if (typeof global !== 'undefined') {
        global.cineV2Bootstrap = V2Bootstrap;
    }

    if (typeof window !== 'undefined') {
        window.cineV2Bootstrap = V2Bootstrap;
    }

    // Auto-initialize when DOM is ready
    if (typeof document !== 'undefined') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            // Delay slightly to let other scripts load first
            setTimeout(init, 100);
        }
    }

    // Module export
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = V2Bootstrap;
    }

})(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : this);
