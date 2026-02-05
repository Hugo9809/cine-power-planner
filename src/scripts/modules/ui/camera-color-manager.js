/**
 * Camera Color Manager
 * Handles camera letter color preferences (A, B, C, D, E)
 * Manages storage, validation, default generation, and UI input application
 */

const CAMERA_LETTERS = ['A', 'B', 'C', 'D', 'E'];
const CAMERA_COLOR_STORAGE_KEY_SESSION = 'cameraPowerPlanner_cameraColors';
let cachedCameraLetterColors = null;

/**
 * Normalize color string to hex format
 * @param {string} value - Raw color string
 * @returns {string} Normalized #RRGGBB hex string or empty string
 */
function normalizeCameraColorValue(value) {
    if (typeof value !== 'string') {
        return '';
    }
    const trimmed = value.trim();
    if (!trimmed) {
        return '';
    }
    if (/^#[0-9a-f]{6}$/i.test(trimmed)) {
        return trimmed.toLowerCase();
    }
    if (/^[0-9a-f]{6}$/i.test(trimmed)) {
        return `#${trimmed.toLowerCase()}`;
    }
    return '';
}

/**
 * Generate a randomish default color for a letter
 * @param {string} letter - Camera letter
 * @returns {string} Generated color string
 */
function generateDefaultCameraColor(letter) {
    if (letter !== 'E') {
        return '';
    }
    const generateChannel = () => {
        let value = 0;
        if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
            const array = new Uint8Array(1);
            crypto.getRandomValues(array);
            value = array[0] / 255;
        } else {
            value = Math.random();
        }
        const channel = Math.floor(value * 200) + 28;
        return Math.max(24, Math.min(232, channel));
    };
    const components = [generateChannel(), generateChannel(), generateChannel()];
    return `#${components.map(component => component.toString(16).padStart(2, '0')).join('')}`;
}

/**
 * Get the default color map for all camera letters
 * @returns {Object} Map of letter to color string
 */
function getDefaultCameraLetterColors() {
    const defaults = {
        A: '#d32f2f',
        B: '#1e88e5',
        C: '#fdd835',
        D: '#43a047',
        E: '#7b1fa2',
    };
    const generated = generateDefaultCameraColor('E');
    if (generated) {
        defaults.E = generated;
    }
    return defaults;
}

/**
 * Load camera colors from local storage
 * @returns {Object} Color map
 */
function loadCameraLetterColors() {
    if (cachedCameraLetterColors) {
        return cachedCameraLetterColors;
    }
    const defaults = getDefaultCameraLetterColors();
    let stored = null;
    try {
        const raw = localStorage.getItem(CAMERA_COLOR_STORAGE_KEY_SESSION);
        if (raw) {
            stored = JSON.parse(raw);
        }
    } catch (error) {
        console.warn('Failed to read stored camera colors', error);
        stored = null;
    }
    const resolved = { ...defaults };
    if (stored && typeof stored === 'object') {
        CAMERA_LETTERS.forEach(letter => {
            const incoming = stored[letter] || stored[letter.toLowerCase()];
            const normalized = normalizeCameraColorValue(incoming);
            if (normalized) {
                resolved[letter] = normalized;
            }
        });
    } else {
        try {
            localStorage.setItem(CAMERA_COLOR_STORAGE_KEY_SESSION, JSON.stringify(resolved));
        } catch (persistError) {
            console.warn('Unable to persist default camera colors', persistError);
        }
    }
    cachedCameraLetterColors = resolved;
    return resolved;
}

/**
 * Safe wrapper for loading colors
 * @returns {Object} Color map
 */
function getCameraLetterColorsSafeSession() {
    return loadCameraLetterColors();
}

/**
 * Apply new color settings and persist them
 * @param {Object} newColors - Map of new colors to apply
 * @returns {Object} Updated color map
 */
function applyCameraLetterColors(newColors = {}) {
    const current = { ...loadCameraLetterColors() };
    let changed = false;
    CAMERA_LETTERS.forEach(letter => {
        const incoming = newColors[letter] || newColors[letter.toLowerCase()];
        const normalized = normalizeCameraColorValue(incoming);
        if (normalized && current[letter] !== normalized) {
            current[letter] = normalized;
            changed = true;
        }
    });
    if (!changed) {
        return current;
    }
    cachedCameraLetterColors = current;
    try {
        localStorage.setItem(CAMERA_COLOR_STORAGE_KEY_SESSION, JSON.stringify(current));
    } catch (storeError) {
        console.warn('Failed to persist camera color preferences', storeError);
    }
    if (typeof document !== 'undefined'
        && typeof document.dispatchEvent === 'function'
        && typeof CustomEvent === 'function') {
        try {
            document.dispatchEvent(new CustomEvent('camera-colors-changed'));
        } catch (dispatchError) {
            console.warn('Failed to broadcast camera color change', dispatchError);
        }
    }
    return current;
}

/**
 * Find all camera color input elements in the DOM
 * @returns {Array} List of objects {letter, element}
 */
function getCameraColorInputElements() {
    if (typeof document === 'undefined') {
        return [];
    }
    return CAMERA_LETTERS.map(letter => {
        const id = `cameraColor${letter}`;
        let element = null;
        try {
            element = typeof window !== 'undefined' && window[id]
                ? window[id]
                : document.getElementById(id);
        } catch (error) {
            void error;
            element = null;
        }
        return element ? { letter, element } : null;
    }).filter(Boolean);
}

/**
 * Update input element values based on current state
 */
function updateCameraColorInputsFromState() {
    const colors = getCameraLetterColorsSafeSession();
    getCameraColorInputElements().forEach(entry => {
        if (!entry || !entry.element) {
            return;
        }
        const value = colors[entry.letter] || '';
        if (value) {
            entry.element.value = value;
        }
    });
}

/**
 * Collect current values from input elements
 * @returns {Object} Color map from inputs
 */
function collectCameraColorInputValues() {
    const result = {};
    getCameraColorInputElements().forEach(entry => {
        if (!entry || !entry.element) return;
        const normalized = normalizeCameraColorValue(entry.element.value || '');
        if (normalized) {
            result[entry.letter] = normalized;
        }
    });
    return result;
}

export const CameraColorManager = {
    CAMERA_LETTERS,
    CAMERA_COLOR_STORAGE_KEY_SESSION,
    normalizeCameraColorValue,
    generateDefaultCameraColor,
    getDefaultCameraLetterColors,
    loadCameraLetterColors,
    getCameraLetterColorsSafeSession,
    applyCameraLetterColors,
    getCameraColorInputElements,
    updateCameraColorInputsFromState,
    collectCameraColorInputValues,
};
