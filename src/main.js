console.log('DEBUG: main.js parsing started');
/**
 * @fileoverview Vite Entry Point
 *
 * This is the new modular entry point for the application.
 */

// Phase 0: Vital Global Patches (MUST BE FIRST)
import './scripts/shims/vite-global-patches.js';
import './scripts/force-populate.js';

// Phase 2: Import shim modules
console.log('DEBUG: main.js imports START');

// Data Imports (Must load before App Core)
import rentalHouses from './data/rental-houses.js';
import devices, { cineDevices } from './data/devices/index.js';

// Legacy Global Exposure
if (typeof window !== 'undefined') {
    window.rentalHouses = rentalHouses;
    window.devices = devices;
    window.cineDevices = cineDevices;
}

import './scripts/translations.js';
import './scripts/core/app-core-pink-mode.js';
import './scripts/auto-gear/ui.js';

import storage from './modules/storage-shim.js';
import * as translations from './modules/translations-shim.js';
import './scripts/shims/legacy-globals-shim.js';

// Phase 3a: Auto Gear Storage (Must load before app-core-new-1.js)
import * as autoGearNormalizers from './scripts/auto-gear/normalizers.js';
import * as autoGearStorage from './scripts/auto-gear/storage.js';

// Expose Auto Gear Storage helpers to global scope for legacy code
if (typeof window !== 'undefined') {
    Object.assign(window, autoGearStorage);
    Object.assign(window, autoGearNormalizers);
}

// Phase 10: App Core Bootstrap
import './scripts/core/app-core-runtime-support.js';
import './scripts/core/app-core-bootstrap.js';

// Phase 4: Converted Core Modules (ESM)
import './scripts/modules/base.js';
import './scripts/modules/registry.js';
import './scripts/modules/localization.js';
import './scripts/modules/icons.js';
import './scripts/modules/device-normalization.js';
import './scripts/modules/logging.js';
import './scripts/modules/persistence.js';
import './scripts/modules/environment.js';
import './scripts/modules/environment-bridge.js';
import './scripts/modules/offline.js';
import './scripts/modules/globals.js';
import './scripts/modules/system.js';
import './scripts/modules/context.js';
import './scripts/modules/architecture-helpers.js';
import './scripts/modules/architecture.js';
import './scripts/modules/runtime.js';
import './scripts/modules/settings-and-appearance.js';

console.log('✅ Vite entry point (main.js) loaded');
window.__viteMainLoaded = true;

// Log that Vite and shims are working
console.log('[Vite] Entry point loaded successfully');
console.log('[Vite] App version:', import.meta.env.APP_VERSION || 'unknown');
console.log('[Vite] Storage shim loaded:', Object.keys(storage).length, 'exports');
console.log('[Vite] Translations shim loaded:', Object.keys(translations).length, 'exports');

// Phase 3: Initialize V2 UI (Hybrid Mode)
// Core Modules
import './scripts/globals-bootstrap.js';
import './scripts/core/modules/app-core/localization-fixed.js'; // MUST load before runtime-shared
import { processCoreBootQueue } from './scripts/runtime/bootstrap.js';
import './scripts/core/app-core-runtime-global-tools.js';
import './scripts/core/app-core-runtime-candidate-scopes.js';
// import './scripts/core/app-core-runtime-support.js'; // Duplicated above
import './scripts/core/app-core-runtime-helpers.js';
import './scripts/core/app-core-environment.js';
import './scripts/core/modules/ui-cache.js';
import './scripts/core/app-core-ui-helpers.js';
import './scripts/core/app-core-text.js';
// import './scripts/core/app-core-bootstrap.js'; // Duplicated above

import './scripts/core/app-core-new-1.js';
import './scripts/core/app-core-new-2.js';
import './scripts/core/app-core-part2.js';
import './scripts/core/app-core-runtime-scopes.js';
import './scripts/core/app-core-runtime-shared.js';
import './scripts/core/app-events.js';
import './scripts/core/app-setups.js';
import './scripts/core/app-session.js';
import './scripts/loading-indicator-bootstrap.js'; // Bootstrap Loader UI
import './scripts/ui-feedback.js'; // UI Feedback Helper
import './scripts/emergency-modal-cleanup.js'; // Dialog Cleanup Helper

// Duplicates removed (consolidated below)
import './scripts/core/app-core-runtime-ui.js';
import './scripts/contacts/profile.js';
import './scripts/contacts/list.js';
import './scripts/modules/features/feature-search-normalization.js';
import './scripts/modules/features/auto-gear-rules.js';
import './scripts/modules/features/connection-diagram.js';
import './scripts/modules/features/backup.js';
import './scripts/modules/features/onboarding-loader-hook.js';
import './scripts/modules/features/print-workflow.js';
import './scripts/modules/features/print-preview.js';
import './scripts/modules/runtime-guard.js';
import './scripts/modules/ui.js';
import './scripts/modules/results.js';
import './scripts/storage.js';

// Phase 13: Deferred Scripts (Converted to ESM)
import './scripts/auto-gear/monitoring.js';
import './scripts/overview.js';
import './scripts/autosave-overlay.js';
import './scripts/modules/features/onboarding-tour.js';

// Phase 14: Remaining Legacy Scripts (ESM)
import './scripts/auto-gear/ui.js';
import './scripts/own-gear/store.js';
import './scripts/own-gear/view.js';
import './scripts/script.js';

// V2 Bootstrap
import { V2Bootstrap } from './scripts/v2/bootstrap.js';

function populateCineDropdowns(devices) {
    const safePopulate = (id, data) => {
        const el = document.getElementById(id);
        if (el && typeof window.populateSelect === 'function') {
            // Only populate if empty (or just has "None")
            if (el.options.length <= 1) {
                window.populateSelect(el, data);
            }
        }
    };

    if (devices.cameras) safePopulate('cameraSelect', devices.cameras);
    if (devices.monitors) safePopulate('monitorSelect', devices.monitors);
    if (devices.video) safePopulate('videoSelect', devices.video);
    if (devices.batteries) safePopulate('batterySelect', devices.batteries);
    if (devices.batteryHotswaps) safePopulate('batteryHotswapSelect', devices.batteryHotswaps);

    // FIZ
    if (devices.fiz) {
        ['motor1Select', 'motor2Select', 'motor3Select', 'motor4Select',
            'controller1Select', 'controller2Select', 'controller3Select', 'controller4Select'].forEach(id => {
                safePopulate(id, devices.fiz);
            });
    }
}

function initWebApp() {
    console.log('[Vite] Starting App Initialization...');
    // 1. Initialize V2 Bootstrap
    if (typeof V2Bootstrap !== 'undefined' && V2Bootstrap && typeof V2Bootstrap.init === 'function') {
        try {
            V2Bootstrap.init();
        } catch (e) {
            console.error('[Vite] V2 Bootstrap init failed:', e);
        }
    }

    // 1.5 Process Core Boot Queue (Flushes pending global tasks like populateSelect)
    try {
        console.log('[Vite] Processing Core Boot Queue...');
        processCoreBootQueue();
    } catch (queueError) {
        console.error('[Vite] Failed to process boot queue:', queueError);
    }

    // 1.6 Manual Dropdown Population (Fallback for missing legacy data binding)
    // This ensures critical UI elements are populated even if the boot queue tasks had empty data
    try {
        if (typeof window.devices === 'object' && window.devices) {
            console.log('[Vite] Populating dropdowns manually...');
            populateCineDropdowns(window.devices);
        }
    } catch (popError) {
        console.error('[Vite] Failed to populate dropdowns:', popError);
    }

    // 2. Signal Completion (Hides "Preparing planner..." overlay)
    console.log('[Vite] dispatching cine-loader-complete');
    document.dispatchEvent(new CustomEvent('cine-loader-complete', { bubbles: true }));
}

// Ensure DOM is ready before initializing
if (typeof window !== 'undefined') {
    initWebApp();
}
console.log('[Vite] main.js execution finished');
