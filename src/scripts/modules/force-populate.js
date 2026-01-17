/**
 * @fileoverview FORCE POPULATE LOGIC
 * 
 * Ensures that critical UI elements (select dropdowns) are populated
 * with device data even if the main application logic stalls or loads out of order.
 * 
 * Also serves as the final boot step to trigger V2 initialization.
 * 
 * @module modules/force-populate
 */

/**
 * Populates a specific select element by ID with data.
 * @param {Object} scope - Global scope (window)
 * @param {string} id - Element ID
 * @param {Object} data - Data to populate
 */
function populateId(scope, id, data) {
    if (!scope.document) return;
    const el = scope.document.getElementById(id);
    if (el && el.options.length <= 1) {
        try {
            scope.populateSelect(el, data);
            console.log(`[ForcePopulate] Populated ${id} with ${Object.keys(data).length} items`);
        } catch (e) {
            console.error(`[ForcePopulate] Failed to populate ${id}`, e);
        }
    }
}

/**
 * Attempts to populate UI and finalize boot.
 * Re-entrant: returns true if successful, false if dependencies (devices) are missing.
 * 
 * @param {Object} scope - Global scope
 * @param {Object} bootstrapProvider - V2 Bootstrap provider (must have .init())
 * @returns {boolean} True if population succeeded
 */
export function attemptPopulate(scope, bootstrapProvider) {
    if (!scope || !scope.devices || !scope.populateSelect) {
        console.log('[ForcePopulate] Waiting for dependencies...');
        return false;
    }

    console.log('[ForcePopulate] Dependencies ready. Populating...');
    const devices = scope.devices;

    if (devices.cameras) populateId(scope, 'cameraSelect', devices.cameras);
    if (devices.monitors) populateId(scope, 'monitorSelect', devices.monitors);
    if (devices.video) populateId(scope, 'videoSelect', devices.video);
    if (devices.batteries) populateId(scope, 'batterySelect', devices.batteries);
    if (devices.batteryHotswaps) populateId(scope, 'batteryHotswapSelect', devices.batteryHotswaps);

    if (devices.fiz) {
        ['motor1Select', 'motor2Select', 'motor3Select', 'motor4Select',
            'controller1Select', 'controller2Select', 'controller3Select', 'controller4Select'].forEach(id => {
                populateId(scope, id, devices.fiz);
            });
    }

    // Also try to process the boot queue
    if (typeof scope.processCoreBootQueue === 'function') {
        console.log('[ForcePopulate] Triggering boot queue processing...');
        scope.processCoreBootQueue();
    } else if (scope.CORE_BOOT_QUEUE && scope.CORE_BOOT_QUEUE.length > 0) {
        console.warn('[ForcePopulate] processCoreBootQueue not found, manually draining queue...');
        const queue = scope.CORE_BOOT_QUEUE;
        // Drain safely
        const snapshot = queue.splice(0, queue.length);
        snapshot.forEach(t => { try { t() } catch { /* ignore */ } });
    }

    // Force dismiss overlay
    console.log('[ForcePopulate] Dismissing loading overlay...');
    if (scope.document) {
        const overlay = scope.document.getElementById('cineGlobalLoadingIndicator');
        if (overlay) {
            overlay.style.display = 'none';
            overlay.setAttribute('aria-hidden', 'true');
        }

        // Mark app as ready
        if (scope.document.body) {
            scope.document.body.classList.add('app-ready');
        }
    }

    // Initialize V2 Bootstrap
    console.log('[ForcePopulate] Initializing V2 Bootstrap...');
    try {
        if (bootstrapProvider && typeof bootstrapProvider.init === 'function') {
            bootstrapProvider.init();
        }
    } catch (e) {
        console.error('[ForcePopulate] V2 Bootstrap init failed', e);
    }

    // Dispatch completion event
    try {
        if (scope.dispatchEvent && typeof CustomEvent === 'function') {
            scope.dispatchEvent(new CustomEvent('cine-loader-complete'));
        }
    } catch (e) { console.error(e); }

    return true;
}

/**
 * Starts the polling mechanism to ensure population occurs.
 * 
 * @param {Object} scope - Global scope
 * @param {Object} bootstrapProvider - V2 Bootstrap provider
 * @param {number} [intervalMs=100] - Polling interval
 */
export function startForcePopulate(scope, bootstrapProvider, intervalMs = 100) {
    if (typeof scope === 'undefined') return;

    console.log('[ForcePopulate] Script loaded (Module)');

    if (!attemptPopulate(scope, bootstrapProvider)) {
        const interval = setInterval(() => {
            if (attemptPopulate(scope, bootstrapProvider)) {
                clearInterval(interval);
            }
        }, intervalMs);

        // Allow clearing/mocking interval in tests if needed (implicitly via scope/timer mocks)
        return interval;
    }
}
