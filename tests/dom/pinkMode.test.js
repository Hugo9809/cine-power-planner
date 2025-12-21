const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

describe('Pink Mode Functionality', () => {
    let env;

    beforeEach(() => {
        env = setupScriptEnvironment({
            globals: {
                showNotification: jest.fn(),
            }
        });

        // Mock Lottie globally
        global.lottie = {
            loadAnimation: jest.fn().mockReturnValue({
                destroy: jest.fn(),
                play: jest.fn(),
                stop: jest.fn(),
                setSpeed: jest.fn(),
            })
        };

        // Ensure requestAnimationFrame is available (some jsdom versions might miss it or we want to control it)
        global.requestAnimationFrame = (cb) => setTimeout(cb, 0);

        // Mock global fetch for icon files
        global.fetch = jest.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({})
        }));
    });

    afterEach(() => {
        env?.cleanup();
        delete global.lottie;
        delete global.fetch;
    });

    test('Toggling Pink Mode activates class and updates storage', async () => {
        const toggleBtn = document.getElementById('pinkModeToggle');
        expect(toggleBtn).not.toBeNull();

        // Initial state
        expect(document.body.classList.contains('pink-mode-active')).toBe(false);
        // Click toggle
        if (typeof window.togglePinkMode === 'function') {
            window.togglePinkMode();
        } else if (window.cineSettingsAppearance && window.cineSettingsAppearance.persistPinkModePreference) {
            // Fallback to module
            const isPink = document.body.classList.contains('pink-mode');
            window.cineSettingsAppearance.persistPinkModePreference(!isPink);
        } else {
            // Fallback to click (flaky in JSDOM)
            toggleBtn.click();
        }

        // Check active class
        expect(document.body.classList.contains('pink-mode')).toBe(true);
        expect(localStorage.getItem('pinkMode')).toBe('true');

        // Wait for async Lottie initialization
        await new Promise(resolve => setTimeout(resolve, 50));
        expect(global.lottie.loadAnimation).toHaveBeenCalled();

        // Assert that the pink-mode logic is actually "started"
        // We can't easily check internal state, but we can check if floating icons appear eventually
        // if we manually trigger rain or wait for the interval.

        // Force trigger rain
        if (typeof window.triggerPinkModeIconRain === 'function') {
            window.triggerPinkModeIconRain();

            // Wait for potential async DOM updates
            await new Promise(r => setTimeout(r, 200));

            // In JSDOM, floating icons should be appended to body
            // They have class 'pink-mode-floating-icon'
            const icons = document.querySelectorAll('.pink-mode-floating-icon');

            // If the implementation is merely a stub (noop), we expect 0 icons.
            // If it works, we expect > 0 icons.

            // We expect it to FAIL currently if the user says it is broken.
            // So this assertion should verify the broken state or pass if I fixed it.
            // The user wants me to fix it. So if this fails, I have confirmed the bug.
            expect(icons.length).toBeGreaterThan(0);
            // console.log('TEST: Skipping rain icon assertion (known issue, focused on Activation)');
        } else {
            throw new Error('triggerPinkModeIconRain is not defined on window');
        }
    });

    test('Lottie runtime is accessible', async () => {
        // Check if the runtime loader function exists
        expect(typeof window.ensurePinkModeLottieRuntime).toBe('function');

        // Call it
        const runtime = await window.ensurePinkModeLottieRuntime();

        // It should return the mocked lottie object
        expect(runtime).toBeDefined();
        expect(runtime.loadAnimation).toBeDefined();
    });
});
