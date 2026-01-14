/**
 * Cine Power Planner V2 - Bootstrap
 * ===================================
 * Entry point for V2 UI initialization.
 * 
 * DEEP DIVE: The "Hybrid Swap" Strategy
 * 
 * This module is responsible for the hot-swap between Legacy (V1) and Modern (V2) UIs.
 * It does NOT replace the entire page. Instead, it:
 * 1. Lazy-loads V2 CSS/JS assets (to keep initial bundle size low).
 * 2. Toggles the `v2-mode` class on `document.body`.
 * 3. Manually hides Legacy DOM elements (`#topBar`, `#sideMenu`).
 * 4. Initializes the React-like V2 View Manager.
 * 
 * This strategy allows us to ship V2 incrementally without rewriting the V1 engine.
 */


// Removed IIFE wrapper for ES Module conversion
// (function (global) {
//    'use strict';

// Polyfill global for legacy code
const global = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : {};


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
    } catch (_e) {
        void _e;
        return false;
    }
}

/**
 * Restore Theme State (Dark/Pink) immediately
 * 
 * DEEP DIVE: Persistence Fix
 * When switching UIs, we risk losing the user's theme preference.
 * This function forces a re-read of localStorage to ensure the V2 UI
 * respects the existing specific Dark/Pink mode settings.
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

        // Initialize project detail FIRST (for view-change events)
        // IMPORTANT: This must happen BEFORE cineViewManager.enableV2() because
        // enableV2() dispatches v2:viewchange, and project-detail needs to have
        // its listener attached to render the top bar correctly.
        if (global.cineProjectDetail && typeof global.cineProjectDetail.init === 'function') {
            global.cineProjectDetail.init();
        }

        // Initialize and render the project dashboard
        if (global.cineProjectDashboard) {
            if (typeof global.cineProjectDashboard.init === 'function') {
                global.cineProjectDashboard.init();
            }
            // renderProjectGrid handled by v2:viewchange event
        }

        // Initialize sidebar (search functionality)
        if (global.cineV2Sidebar && typeof global.cineV2Sidebar.init === 'function') {
            global.cineV2Sidebar.init();
        }

        // Initialize View Manager (this will dispatch v2:viewchange)
        // IMPORTANT: Must happen LAST after all views are initialized so they can catch the event
        if (global.cineViewManager && typeof global.cineViewManager.enableV2 === 'function') {
            global.cineViewManager.enableV2();
        }

        // Bind Exit V2 button
        bindExitButton();

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
/**
 * Load V2 assets (CSS and JS)
 */
async function loadV2Assets() {
    try {
        console.log('[V2 Bootstrap] Loading V2 assets via Vite dynamic imports...');

        // Load V2 CSS
        // Vite injects styles when imported
        await import('../../styles/v2/index.css');
        await import('../../styles/v2/views/rules-view.css');
        await import('../../styles/v2/views/contacts.css');
        await import('../../styles/v2/views/settings.css');
        await import('../../styles/v2/views/owned-gear.css');
        console.log('[V2 Bootstrap] V2 CSS loaded');

        // Load V2 JS modules
        // We use specific relative paths for Vite to detect them
        await import('./view-manager.js');
        await import('./translations.js');
        const { LegacyShim } = await import('./legacy-shim.js');

        await import('../modules/features/auto-gear-rules.js');
        await import('./project-dashboard.js');
        await import('./project-detail.js'); // Also needed

        await import('./views/sidebar-view.js');
        await import('./sidebar.js');
        await import('./views/rules-view.mjs');
        await import('./views/device-library-view.js');

        await import('../modules/features/contacts.js');
        await import('../modules/features/own-gear.js');

        await import('./views/contacts-view.js');
        await import('./views/settings-view.js');
        await import('./views/owned-gear-view.js');
        await import('./help-data.js');
        await import('./help-service.js');
        await import('./views/help-view.js');
        await import('./views/backups-view.js');

        // Initialize Backups View
        if (window.cineBackupsView && typeof window.cineBackupsView.init === 'function') {
            window.cineBackupsView.init();
        }

        console.log('[V2 Bootstrap] V2 JS modules loaded');

        // Initialize components (checking globals that should be set by modules)
        // Note: In a pure module system, we would return the exports, 
        // but we kept the global assignments in the modules for backward compatibility.

        // Initialize Sidebar Shell + Logic
        if (global.cineV2SidebarView && typeof global.cineV2SidebarView.mount === 'function') {
            global.cineV2SidebarView.mount();
        }
        if (global.cineV2Sidebar && typeof global.cineV2Sidebar.init === 'function') {
            global.cineV2Sidebar.init();
        }

        // Initialize Rules View
        if (global.cineRulesView && typeof global.cineRulesView.init === 'function') {
            global.cineRulesView.init();
        }

        // Initialize Device Library View
        if (global.cineV2DeviceLibrary && typeof global.cineV2DeviceLibrary.init === 'function') {
            global.cineV2DeviceLibrary.init();
        }

        // Initialize Contacts View
        if (global.cineContactsView && typeof global.cineContactsView.init === 'function') {
            global.cineContactsView.init();
        }

        // Initialize Settings View
        if (global.cineSettingsView && typeof global.cineSettingsView.init === 'function') {
            global.cineSettingsView.init();
        }

        // Initialize Owned Gear View
        if (global.cineOwnGearView && typeof global.cineOwnGearView.init === 'function') {
            global.cineOwnGearView.init();
        }

        // Initialize Help View
        if (global.cineHelpView && typeof global.cineHelpView.init === 'function') {
            global.cineHelpView.init();
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
// EXPORTS
// =====================
export const V2Bootstrap = {
    init,
    enableV2,
    disableV2,
    toggleV2,
    isV2Enabled: () => isV2Enabled,
    loadV2Assets
};

// Expose to global scope for legacy compatibility
if (typeof globalThis !== 'undefined') {
    globalThis.cineV2Bootstrap = V2Bootstrap;
} else if (typeof window !== 'undefined') {
    window.cineV2Bootstrap = V2Bootstrap;
}

// Auto-initialize
// Auto-initialize
// if (typeof document !== 'undefined') {
//     if (document.readyState === 'loading') {
//         document.addEventListener('DOMContentLoaded', init);
//     } else {
//         // Delay slightly to let other scripts load first
//         setTimeout(init, 100);
//     }
// }
