/* global cinePinkModeAnimatedIconData */

const GLOBAL_SCOPE = (typeof globalThis !== 'undefined' ? globalThis : (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : global)));

const PINK_MODE_ANIMATED_ICON_FILES = Object.freeze([
    'src/animations/unicorn.json',
    'src/animations/pink-mode/dog.json',
    'src/animations/pink-mode/fox-2.json',
    'src/animations/pink-mode/fox-3.json',
    'src/animations/pink-mode/fox.json',
    'src/animations/pink-mode/horse.json',
    'src/animations/pink-mode/mountains.json',
    'src/animations/pink-mode/movie-camera.json',
    'src/animations/pink-mode/pinata.json',
    'src/animations/pink-mode/script.json',
    'src/animations/pink-mode/video-camera.json'
]);

function ensurePinkModeLottieRuntime() {
    if (GLOBAL_SCOPE.lottie) return Promise.resolve(GLOBAL_SCOPE.lottie);
    if (GLOBAL_SCOPE.bodymovin) return Promise.resolve(GLOBAL_SCOPE.bodymovin);

    if (document.querySelector('script[data-loader="pink-mode-lottie"]')) {
        // Already loading
        return new Promise(resolve => {
            const s = document.querySelector('script[data-loader="pink-mode-lottie"]');
            if (s.dataset.loaded === 'true') resolve(GLOBAL_SCOPE.lottie);
            else s.addEventListener('load', () => resolve(GLOBAL_SCOPE.lottie), { once: true });
        });
    }

    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'src/vendor/lottie.min.js';
        script.async = true;
        script.setAttribute('data-loader', 'pink-mode-lottie');
        script.onload = () => {
            script.dataset.loaded = 'true';
            resolve(GLOBAL_SCOPE.lottie);
        };
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

/**
 * Manages the lifecycle of Pink Mode animations, including the "rain" effect
 * and random icon spawning. Maintains the active state of the feature.
 */
class PinkModeManager {
    constructor() {
        this.active = false;
    }

    activate() {
        this.active = true;
        document.body.classList.add('pink-mode-active');
    }

    deactivate() {
        this.active = false;
        document.body.classList.remove('pink-mode-active');
    }

    triggerRain() {
        // No-op (removed feature)
    }
}

const manager = new PinkModeManager();

const HORSE_SVG_MARKUP = '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="m1 40c0-8 3-17 3-17a4.84 4.84 0 0 0-1.829-3.064 1 1 0 0 1 .45-1.716 19.438 19.438 0 0 1 4.379-.22c.579-2.317-1.19-3.963-2.782-4.938a1 1 0 0 1 .393-1.85 14.128 14.128 0 0 1 6.389.788c0-.958-1.147-2.145-2.342-3.122a1 1 0 0 1 .708-1.773 40.655 40.655 0 0 1 6.634.895 3.723 3.723 0 0 0-1.049-2.264 1 1 0 0 1 .823-1.652c6.151.378 9.226 1.916 9.226 1.916l10-1s8.472-2.311 15.954.5a1 1 0 0 1-.084 1.9c-1.455.394-2.87 1.143-2.87 2.6 0 0 4.426.738 5.675 4.114a1 1 0 0 1-1.228 1.317c-1.64-.48-4.273-.88-6.447.569Z" fill="#805333" /><path d="m30.18 42.82c1.073 2.7 2.6 9.993 3.357 13.8a2 2 0 0 1-1.964 2.38h-28.573a2 2 0 0 1-2-2v-18c0-2.55 10.03-22.11 23.99-23.87Z" fill="#a56a43" /><path d="m55.67 48.46-6.34 2.97a6 6 0 0 1-7.98-2.88l-.25-.54-.76-1.6a4.956 4.956 0 0 0-4.68-2.87c-.22.01-.44.02-.66.02a16.019 16.019 0 0 1-8.28-29.66c-1.81-2.97-3.45-8.03 2.03-12.49a2.1 2.1 0 0 1 2.5 0c4.23 3.45 4.21 7.25 3.16 10.17a16 16 0 0 1 15.91 11.36l5.31 11.31 2.92 6.22a6.008 6.008 0 0 1-2.88 7.99Z" fill="#cb8252" /><circle cx="42" cy="26" r="3" fill="#2c2f38" /><circle cx="54" cy="43" r="1" fill="#805333" /><path d="m58.55 40.47-2.92-6.22-14.53 13.76.25.54a6 6 0 0 0 7.98 2.88l6.34-2.97a6.008 6.008 0 0 0 2.88-7.99Zm-4.55 3.53a1 1 0 1 1 1-1 1 0 0 1-1 1Z" fill="#cf976a" /><circle cx="41" cy="25" r="1.25" fill="#ecf0f1" /></svg>';


// Create pink/unicorn variants by replacing brown colors with pink/purple shades and adding a horn
const HORN_MARKUP = '<path d="M44 19 L56 5 L49 22 Z" fill="#ffd700" />';
const UNICORN_BASE_MARKUP = HORSE_SVG_MARKUP.replace('</svg>', HORN_MARKUP + '</svg>');

const UNICORN_1_MARKUP = UNICORN_BASE_MARKUP
    .replace(/#805333/g, '#d63384') // Deep pink
    .replace(/#a56a43/g, '#e83e8c') // Pink
    .replace(/#cb8252/g, '#fd7e14') // Orange-pink
    .replace(/#cf976a/g, '#ffc0cb'); // Light pink

const UNICORN_2_MARKUP = UNICORN_BASE_MARKUP
    .replace(/#805333/g, '#6f42c1') // Purple
    .replace(/#a56a43/g, '#d63384') // Deep pink
    .replace(/#cb8252/g, '#e83e8c') // Pink
    .replace(/#cf976a/g, '#e0cffc'); // Light purple

const UNICORN_3_MARKUP = UNICORN_BASE_MARKUP
    .replace(/#805333/g, '#0dcaf0') // Cyan/Blueish for variety
    .replace(/#a56a43/g, '#6f42c1') // Purple
    .replace(/#cb8252/g, '#d63384') // Deep pink
    .replace(/#cf976a/g, '#9ec5fe'); // Light blue

const PINK_MODE_TOGGLE_SEQUENCE = [
    { className: 'icon-svg pink-mode-icon', markup: UNICORN_1_MARKUP, lottiePath: 'src/animations/horn.json' },
    { className: 'icon-svg pink-mode-icon', markup: UNICORN_2_MARKUP, lottiePath: 'src/animations/unicorn.json' },
    { className: 'icon-svg pink-mode-icon', markup: UNICORN_3_MARKUP, lottiePath: 'src/animations/rainbow.json' }
];

// Export interface expected by pink-mode-support.js
const icons = {
    off: { className: 'icon-svg pink-mode-icon', markup: HORSE_SVG_MARKUP },
    onSequence: PINK_MODE_TOGGLE_SEQUENCE
};

// ESM Exports
export const pinkModeIcons = icons;
export const ensureSvgHasAriaHidden = (markup) => markup; // Stub
export const setPinkModeIconSequence = () => { }; // Stub
export const loadPinkModeIconsFromFiles = () => Promise.resolve(); // Stub
export const ensurePinkModeLottieRuntimeExport = ensurePinkModeLottieRuntime;
export const resolvePinkModeLottieRuntime = () => GLOBAL_SCOPE.lottie;
export const startPinkModeAnimatedIcons = () => manager.activate();
export const stopPinkModeAnimatedIcons = () => manager.deactivate();
export const triggerPinkModeIconRain = () => { };
export const startPinkModeIconPreload = () => { };
export const PINK_MODE_ICON_INTERVAL_MS = 30000;
export const PINK_MODE_ICON_ANIMATION_CLASS = 'pink-mode-icon-pop';
export const PINK_MODE_ICON_ANIMATION_RESET_DELAY = 450;
export const PINK_MODE_ICON_FALLBACK_MARKUP = [];

// Expose class for debugging
export { PinkModeManager };
export { PINK_MODE_ANIMATED_ICON_FILES };
