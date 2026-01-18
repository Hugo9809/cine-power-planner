console.log('DEBUG: main.js parsing started');
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

// Phase 3: Initialize V2 UI (Hybrid Mode)
// Core Modules
import './scripts/globals-bootstrap.js';
import './scripts/core/modules/app-core/localization-fixed.js'; // MUST load before runtime-shared
import { processCoreBootQueue } from './scripts/runtime/bootstrap.js';
import './scripts/core/app-core-runtime-global-tools.js';
import './scripts/core/app-core-runtime-candidate-scopes.js';
import './scripts/core/app-core-runtime-helpers.js';
import './scripts/core/app-core-runtime-shared.js';
import './scripts/core/app-core-environment.js';
import './scripts/core/modules/ui-cache.js';
import './scripts/core/app-core-ui-helpers.js';
import './scripts/core/app-core-text.js';

console.log('Main: importing dynamic-form-helpers...');
import './scripts/core/dynamic-form-helpers.js';
console.log('Main: importing app-setups...');
import './scripts/core/app-setups.js';
console.log('Main: importing app-events...');
import './scripts/core/app-events.js';
console.log('Main: importing app-core-new-1 (SKIPPED)...');
import './scripts/core/app-core-new-1.js';


/*
import './scripts/core/app-core-new-2.js';

...
*/
