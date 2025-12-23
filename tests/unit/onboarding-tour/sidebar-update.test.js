/**
 * @jest-environment jsdom
 */

const path = require('path');

describe('onboarding tour sidebar interaction', () => {
    let createdObservers = [];
    let timeoutHandles = [];
    let animationFrameHandles = [];
    const RealMutationObserver = global.MutationObserver;
    const originalSetTimeout = global.setTimeout;
    const originalRequestAnimationFrame = global.requestAnimationFrame;

    beforeEach(() => {
        jest.resetModules();
        createdObservers = [];
        timeoutHandles = [];
        animationFrameHandles = [];

        jest.spyOn(global, 'setTimeout').mockImplementation((cb, delay) => {
            const handle = originalSetTimeout(cb, delay);
            timeoutHandles.push(handle);
            return handle;
        });

        jest.spyOn(global, 'requestAnimationFrame').mockImplementation((cb) => {
            const handle = originalRequestAnimationFrame(cb);
            animationFrameHandles.push(handle);
            return handle;
        });

        global.MutationObserver = class MockMutationObserver {
            constructor(callback) {
                this.instance = new RealMutationObserver(callback);
                createdObservers.push(this.instance);
            }
            observe(...args) {
                this.instance.observe(...args);
            }
            disconnect() {
                this.instance.disconnect();
            }
            takeRecords() {
                return this.instance.takeRecords();
            }
        };
    });

    afterEach(() => {
        timeoutHandles.forEach(h => clearTimeout(h));
        animationFrameHandles.forEach(h => cancelAnimationFrame(h));

        if (createdObservers) {
            createdObservers.forEach(observer => {
                try {
                    observer.disconnect();
                } catch (e) {
                    void e;
                }
            });
        }
        if (RealMutationObserver) {
            global.MutationObserver = RealMutationObserver;
        }
        document.body.innerHTML = '';
        jest.restoreAllMocks();
    });

    const modulePath = path.resolve(
        __dirname,
        '../../../src/scripts/modules/features/onboarding-tour.js',
    );

    function createInMemoryStorage() {
        let store = new Map();
        return {
            getItem: jest.fn(key => (store.has(key) ? store.get(key) : null)),
            setItem: jest.fn((key, value) => {
                store.set(key, value);
            }),
            removeItem: jest.fn(key => {
                store.delete(key);
            }),
        };
    }

    function getRegisteredModuleApi() {
        if (
            !global.cineModuleBase
            || !global.cineModuleBase.registerOrQueueModule
            || typeof global.cineModuleBase.registerOrQueueModule.mock === 'undefined'
        ) {
            return null;
        }
        const calls = global.cineModuleBase.registerOrQueueModule.mock.calls;
        if (!calls || !calls.length) {
            return null;
        }
        return calls[calls.length - 1][1];
    }

    function loadModule(options = {}) {
        jest.resetModules();
        delete global.cineModuleBase;
        delete global.cineFeaturesOnboardingTour;
        delete global.currentLang;
        delete global.texts;

        const safeStorage = options.safeStorage || createInMemoryStorage();

        global.getSafeLocalStorage = () => safeStorage;
        global.SAFE_LOCAL_STORAGE = safeStorage;

        // Core mocks
        global.cineModuleBase = {
            safeWarn: jest.fn(),
            freezeDeep: value => value,
            collectCandidateScopes: () => [global],
            registerOrQueueModule: jest.fn(),
            getModuleRegistry: () => null,
            exposeGlobal: jest.fn(),
        };

        global.texts = {
            en: {
                onboardingTour: {
                    prefaceIndicator: 'Welcome',
                    stepIndicator: 'Step {current} of {total}',
                    steps: {
                        ownGearAccess: { title: 'T', body: 'B' }
                    }
                },
            },
        };
        global.currentLang = 'en';

        global.closeDialog = dialog => {
            if (!dialog) return;
            dialog.removeAttribute('open');
        };
        global.isDialogOpen = dialog => {
            if (!dialog) return false;
            if (typeof dialog.open === 'boolean') {
                return dialog.open || dialog.hasAttribute('open');
            }
            return typeof dialog.hasAttribute === 'function' && dialog.hasAttribute('open');
        };
        global.isOwnGearDialogVisible = () => {
            const d = document.getElementById('ownGearDialog');
            return d && d.hasAttribute('open');
        }

        // Setup DOM
        document.body.innerHTML = `
      <div id="app">
        <button id="menuToggle" aria-label="Menu"></button>
        <nav id="sideMenu" hidden>
            <button data-sidebar-action="open-own-gear" id="ownGearBtn">Own Gear</button>
        </nav>
        <dialog id="ownGearDialog"></dialog>
        
        <dialog id="helpDialog" open>
          <button id="helpOnboardingTutorialButton" data-onboarding-tour-trigger="primary">Start</button>
        </dialog>
      </div>
    `;

        return require(modulePath);
    }

    test('re-evaluates highlight when sidebar toggles for ownGearAccess step', async () => {
        // Seed storage to resume at ownGearAccess
        const storage = createInMemoryStorage();
        storage.setItem('cinePowerPlanner_onboardingTutorial', JSON.stringify({
            version: 2,
            activeStep: 'ownGearAccess',
            completedSteps: [],
            skipped: false
        }));

        loadModule({ safeStorage: storage });

        const api = getRegisteredModuleApi();
        expect(api).not.toBeNull();
        api.start({ resume: true, focusStart: false, allowSkipOverride: true });

        await new Promise(resolve => setTimeout(resolve, 200));

        // Overlay is created by the module and appended to body
        const overlays = document.querySelectorAll('.onboarding-overlay');
        expect(overlays.length).toBeGreaterThan(0);
        const overlay = overlays[0];
        const highlight = overlay.querySelector('.onboarding-highlight');

        // Debug info if failing
        if (!overlay.classList.contains('active')) {
            console.log('API Status:', api.getStatus());
            console.log('Is Active:', api.isActive());
            console.log('Overlay classes:', overlay.className);
        }

        expect(overlay.classList.contains('active')).toBe(true);

        // Initial state: Sidebar closed, highlight should target menuToggle
        const menuToggle = document.getElementById('menuToggle');
        const ownGearBtn = document.getElementById('ownGearBtn');
        const sideMenu = document.getElementById('sideMenu');

        jest.spyOn(menuToggle, 'getBoundingClientRect').mockReturnValue({
            top: 10, left: 10, width: 40, height: 40, right: 50, bottom: 50
        });
        jest.spyOn(ownGearBtn, 'getBoundingClientRect').mockReturnValue({
            top: 100, left: 10, width: 200, height: 40, right: 210, bottom: 140
        });

        // Manually trigger resize/scroll to force update if needed, but startTutorial should do it.
        await new Promise(resolve => setTimeout(resolve, 100));

        // Verify highlight position corresponds to menuToggle (top: 10)
        const transform1 = highlight.style.transform;
        expect(transform1).toContain('translate');

        // Simulate opening sidebar
        sideMenu.removeAttribute('hidden');
        sideMenu.classList.add('open');

        // Wait for Observer
        await new Promise(resolve => setTimeout(resolve, 200));

        // Now highlight should move to ownGearBtn (top: 100)
        const transform2 = highlight.style.transform;
        expect(transform2).not.toEqual(transform1);

        const match1 = /translate\(([-0-9.]+)px,\s*([-0-9.]+)px\)/.exec(transform1);
        const match2 = /translate\(([-0-9.]+)px,\s*([-0-9.]+)px\)/.exec(transform2);

        const y1 = parseFloat(match1[2]);
        const y2 = parseFloat(match2[2]);

        expect(y2).toBeGreaterThan(y1); // moved down to 100
    });

});
