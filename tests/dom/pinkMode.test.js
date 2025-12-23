const { setupScriptEnvironment } = require('../helpers/scriptEnvironment');

describe('Pink Mode Functionality', () => {
    let env;

    beforeEach(() => {
        jest.useFakeTimers();

        const mockFetch = jest.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({})
        }));
        global.fetch = mockFetch;

        env = setupScriptEnvironment({
            globals: {
                showNotification: jest.fn(),
                fetch: mockFetch,
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

        // Ensure requestAnimationFrame uses our fake timers
        const fakeRaf = (cb) => setTimeout(cb, 16);
        global.requestAnimationFrame = fakeRaf;
        if (typeof window !== 'undefined') {
            window.requestAnimationFrame = fakeRaf;
            window.fetch = mockFetch;
        }

        global.BroadcastChannel = class MockBroadcastChannel {
            constructor(name) {
                this.name = name;
                this.onmessage = null;
                this.onmessageerror = null;
            }
            postMessage() { }
            close() { }
            addEventListener() { }
            removeEventListener() { }
            dispatchEvent() { return true; }
        };
    });

    afterEach(() => {
        // Stop any running animations to clear intervals/timeouts
        if (typeof window !== 'undefined') {
            if (window.cineCorePinkModeSupport) {
                window.cineCorePinkModeSupport.stopPinkModeAnimatedIcons?.();
                window.cineCorePinkModeSupport.stopPinkModeAnimatedIconRotation?.();
            }
            if (window.cineSettingsAppearance) {
                window.cineSettingsAppearance.stopPinkModeIconRotation?.();
                window.cineSettingsAppearance.stopPinkModeAnimatedIcons?.();
            }
        }

        // Advance timers significantly to flush any pending polls (like whenGlobalValueAvailable)
        if (jest.isMockFunction(setTimeout) || (typeof setTimeout.clock !== 'undefined')) {
            try {
                jest.advanceTimersByTime(100000);
            } catch {
                // ignore
            }
        }

        env?.cleanup();
        delete global.lottie;
        delete global.fetch;
        try {
            jest.clearAllTimers();
            jest.useRealTimers();
        } catch {
            // ignore
        }
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
            toggleBtn.click();
        }

        // Check active class
        expect(document.body.classList.contains('pink-mode')).toBe(true);
        expect(localStorage.getItem('pinkMode')).toBe('true');

        // Allow async Lottie load to resolve
        // mocking fetch/promise resolution needs minimal real tick or just process.nextTick interactions
        // but since we use fake timers for setTimeout, we should advance them just in case
        jest.advanceTimersByTime(100);

        // Wait for promises to settle (microtasks)
        await Promise.resolve();
        await Promise.resolve();

        // Note: Lottie loading is async promise key, not timer based usually, 
        // but checking ensures calls were made.
        expect(global.lottie.loadAnimation).toHaveBeenCalled();
    });

    test('Pink Mode Rain triggers floating icons', async () => {
        // Activate properly first
        if (window.cineCorePinkModeSupport) {
            window.cineCorePinkModeSupport.startPinkModeAnimatedIcons();
        } else if (window.togglePinkMode) {
            window.togglePinkMode();
        } else {
            document.body.classList.add('pink-mode-active');
        }

        // Verify trigger function exists
        expect(typeof window.triggerPinkModeIconRain).toBe('function');

        // Trigger rain
        window.triggerPinkModeIconRain();

        // Rain spawns icons over time (20 * 200ms = 4000ms)
        // We advance time in chunks and allow promises to settle
        for (let i = 0; i < 25; i++) {
            jest.advanceTimersByTime(200);
            await Promise.resolve(); // Flush microtasks
            await Promise.resolve();
        }
        await Promise.resolve();

        let icons = document.querySelectorAll('.pink-mode-floating-icon');
        expect(icons.length).toBeGreaterThan(5); // Should have many now

        // Check cleanup
        if (window.cineCorePinkModeSupport) {
            window.cineCorePinkModeSupport.stopPinkModeAnimatedIcons();
        }
        icons = document.querySelectorAll('.pink-mode-floating-icon');
        expect(icons.length).toBe(0);
    });

    test('Lottie runtime is accessible', async () => {
        expect(typeof window.ensurePinkModeLottieRuntime).toBe('function');
        const runtime = await window.ensurePinkModeLottieRuntime();
        expect(runtime).toBeDefined();
        expect(runtime.loadAnimation).toBeDefined();
    });
});
