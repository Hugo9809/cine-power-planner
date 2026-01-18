/**
 * @jest-environment jsdom
 */
import {
    cineCorePinkModeSupport,
    pinkModeIcons,
    ensurePinkModeLottieRuntime,
    startPinkModeAnimatedIcons,
    stopPinkModeAnimatedIcons,
    getPinkModeIconIndex
} from '../../../../src/scripts/modules/core/pink-mode.js';

describe('Pink Mode Core', () => {
    beforeEach(() => {
        document.body.className = '';
        jest.clearAllMocks();
    });

    describe('pinkModeIcons', () => {
        it('should have an off state with markup', () => {
            expect(pinkModeIcons.off).toBeDefined();
            expect(typeof pinkModeIcons.off.markup).toBe('string');
        });

        it('should have an onSequence array', () => {
            expect(Array.isArray(pinkModeIcons.onSequence)).toBe(true);
            expect(pinkModeIcons.onSequence.length).toBeGreaterThan(0);
        });
    });

    describe('ensurePinkModeLottieRuntime', () => {
        it('should resolve immediately if global lottie exists', async () => {
            global.lottie = { loadAnimation: jest.fn() };
            const result = await ensurePinkModeLottieRuntime();
            expect(result).toBe(global.lottie);
            delete global.lottie;
        });

        // Simulating script injection is tricky in JSDOM without more setup, 
        // but we can test the fallback/null case.
    });

    describe('start/stopPinkModeAnimatedIcons', () => {
        it('should add pink-mode-active class on start', () => {
            startPinkModeAnimatedIcons();
            expect(document.body.classList.contains('pink-mode-active')).toBe(true);
        });

        it('should remove pink-mode-active class on stop', () => {
            document.body.classList.add('pink-mode-active');
            stopPinkModeAnimatedIcons();
            expect(document.body.classList.contains('pink-mode-active')).toBe(false);
        });
    });

    describe('cineCorePinkModeSupport API', () => {
        it('should export the expected aggregate API', () => {
            expect(cineCorePinkModeSupport.pinkModeIcons).toBe(pinkModeIcons);
            expect(typeof cineCorePinkModeSupport.startPinkModeAnimatedIcons).toBe('function');
            expect(cineCorePinkModeSupport.PINK_MODE_ICON_INTERVAL_MS).toBe(30000);
        });
    });
});
