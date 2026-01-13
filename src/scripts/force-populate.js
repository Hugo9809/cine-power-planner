import { V2Bootstrap } from './v2/bootstrap.js';

(function () {
    console.log('[ForcePopulate] Script loaded');

    function populate() {
        if (!window.devices || !window.populateSelect) {
            console.log('[ForcePopulate] Waiting for dependencies...');
            return false;
        }

        console.log('[ForcePopulate] Dependencies ready. Populating...');
        const devices = window.devices;
        const populateSelect = window.populateSelect;

        const populateId = (id, data) => {
            const el = document.getElementById(id);
            if (el && el.options.length <= 1) {
                try {
                    populateSelect(el, data);
                    console.log(`[ForcePopulate] Populated ${id} with ${Object.keys(data).length} items`);
                } catch (e) {
                    console.error(`[ForcePopulate] Failed to populate ${id}`, e);
                }
            }
        };

        if (devices.cameras) populateId('cameraSelect', devices.cameras);
        if (devices.monitors) populateId('monitorSelect', devices.monitors);
        if (devices.video) populateId('videoSelect', devices.video);
        if (devices.batteries) populateId('batterySelect', devices.batteries);
        if (devices.batteryHotswaps) populateId('batteryHotswapSelect', devices.batteryHotswaps);

        if (devices.fiz) {
            ['motor1Select', 'motor2Select', 'motor3Select', 'motor4Select',
                'controller1Select', 'controller2Select', 'controller3Select', 'controller4Select'].forEach(id => {
                    populateId(id, devices.fiz);
                });
        }

        // Also try to process the boot queue
        if (typeof window.processCoreBootQueue === 'function') {
            console.log('[ForcePopulate] Triggering boot queue processing...');
            window.processCoreBootQueue();
        } else if (window.CORE_BOOT_QUEUE && window.CORE_BOOT_QUEUE.length > 0) {
            console.warn('[ForcePopulate] processCoreBootQueue not found, manually draining queue...');
            const queue = window.CORE_BOOT_QUEUE;
            const snapshot = queue.splice(0, queue.length);
            snapshot.forEach(t => { try { t() } catch { /* ignore */ } });
        }

        // Force dismiss overlay
        console.log('[ForcePopulate] Dismissing loading overlay...');
        const overlay = document.getElementById('cineGlobalLoadingIndicator');
        if (overlay) {
            overlay.style.display = 'none';
            overlay.setAttribute('aria-hidden', 'true');
        }

        // Initialize V2 Bootstrap
        console.log('[ForcePopulate] Initializing V2 Bootstrap...');
        try {
            if (V2Bootstrap && typeof V2Bootstrap.init === 'function') {
                V2Bootstrap.init();
            }
        } catch (e) {
            console.error('[ForcePopulate] V2 Bootstrap init failed', e);
        }

        try {
            window.dispatchEvent(new CustomEvent('cine-loader-complete'));
        } catch (e) { console.error(e); }
        document.body.classList.add('app-ready');

        return true;
    }

    if (!populate()) {
        const interval = setInterval(() => {
            if (populate()) {
                clearInterval(interval);
            }
        }, 100);
    }
})();
