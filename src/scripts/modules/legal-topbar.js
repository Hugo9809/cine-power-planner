/**
 * @fileoverview UTILITY MODULE: Legal Top Bar
 * 
 * Manages the top bar interactions on legal/static pages, including:
 * - Theme toggling (Dark/Light mode)
 * - Pink mode toggling
 * - Language selection
 * - Accessibility (ARIA) updates
 * - Theme color meta tag synchronization
 * 
 * @module modules/legal-topbar
 */

const DEFAULT_ACCENT = '#001589';
const HIGH_CONTRAST_ACCENT = '#ffffff';
let storageErrorLogged = false;

function getRoot() {
    return document.documentElement || document.getElementsByTagName('html')[0];
}

function getBody() {
    return document.body || document.getElementsByTagName('body')[0];
}

/**
 * Safely reads from localStorage.
 */
function safeGet(key) {
    try {
        if (typeof window !== 'undefined' && window.localStorage) {
            return window.localStorage.getItem(key);
        }
    } catch (error) {
        if (!storageErrorLogged) {
            console.warn('Unable to read localStorage preference', error);
            storageErrorLogged = true;
        }
    }
    return null;
}

/**
 * Safely writes to localStorage, preferring global helper if available.
 */
function safeSet(key, value, scope = window) {
    // Try using the global helper if it exists (for app-wide consistency)
    if (scope && typeof scope.safeSetLocalStorage === 'function') {
        try {
            scope.safeSetLocalStorage(key, value);
            return;
        } catch {
            // Fallback to direct write if helper fails
        }
    }

    // Fallback to direct localStorage usage
    try {
        if (scope && scope.localStorage) {
            scope.localStorage.setItem(key, value);
        }
    } catch (error) {
        if (!storageErrorLogged) {
            console.warn('Unable to store localStorage preference', error);
            storageErrorLogged = true;
        }
    }
}

function updateThemeColor(isDarkMode) {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
        meta.setAttribute('content', isDarkMode ? '#1c1c1e' : '#f9f9f9');
    }
}

function clearAccentStyles(root, body) {
    if (!root) return;
    root.style.removeProperty('--accent-color');
    root.style.removeProperty('--link-color');
    root.style.removeProperty('--logo-background-color');
    root.style.removeProperty('--logo-accent-color');
    if (body) {
        body.style.removeProperty('--accent-color');
        body.style.removeProperty('--link-color');
        body.style.removeProperty('--logo-background-color');
        body.style.removeProperty('--logo-accent-color');
    }
}

function applyAccentStyles(color, root, body) {
    if (!root) return;

    const effectiveRoot = root;
    const effectiveBody = body;

    const highContrastActive =
        (effectiveRoot && effectiveRoot.classList.contains('high-contrast')) ||
        (effectiveBody && effectiveBody.classList.contains('high-contrast'));

    const accentValue = highContrastActive ? HIGH_CONTRAST_ACCENT : color;

    effectiveRoot.style.setProperty('--accent-color', accentValue);
    if (highContrastActive) {
        effectiveRoot.style.removeProperty('--link-color');
    } else {
        effectiveRoot.style.setProperty('--link-color', color);
    }
    effectiveRoot.style.setProperty('--logo-background-color', accentValue);
    effectiveRoot.style.setProperty('--logo-accent-color', accentValue);

    if (effectiveBody) {
        effectiveBody.style.setProperty('--accent-color', accentValue);
        if (highContrastActive) {
            effectiveBody.style.removeProperty('--link-color');
        } else {
            effectiveBody.style.setProperty('--link-color', color);
        }
        effectiveBody.style.setProperty('--logo-background-color', accentValue);
        effectiveBody.style.setProperty('--logo-accent-color', accentValue);
    }
}

function refreshAccent(root, body) {
    if (!root) return;
    const pinkModeActive = root.classList.contains('pink-mode') || (body && body.classList.contains('pink-mode'));
    if (pinkModeActive) {
        clearAccentStyles(root, body);
        return;
    }
    const storedAccent = safeGet('accentColor');
    const accent = storedAccent || DEFAULT_ACCENT;
    applyAccentStyles(accent, root, body);
}

function setAriaPressed(control, isPressed) {
    if (control) {
        control.setAttribute('aria-pressed', isPressed ? 'true' : 'false');
    }
}

function resolveSafeDestination(rawValue, currentLocation) {
    if (!rawValue || typeof rawValue !== 'string') {
        return null;
    }

    const trimmed = rawValue.trim();
    if (!trimmed) {
        return null;
    }

    const lowerTrimmed = trimmed.toLowerCase();
    // Block dangerous protocols and protocol-relative URLs
    if (
        lowerTrimmed.startsWith('javascript:') ||
        lowerTrimmed.startsWith('data:') ||
        lowerTrimmed.startsWith('vbscript:') ||
        lowerTrimmed.startsWith('file:') ||
        lowerTrimmed.startsWith('//')
    ) {
        return null;
    }

    try {
        if (!currentLocation || typeof currentLocation.href !== 'string') {
            return trimmed.charAt(0) === '/' ? trimmed : null;
        }

        const resolvedUrl = new URL(trimmed, currentLocation.href);
        // Allow only http/https, same protocol, same origin
        if (
            !(resolvedUrl.protocol === "http:" || resolvedUrl.protocol === "https:") ||
            resolvedUrl.protocol !== currentLocation.protocol ||
            resolvedUrl.origin !== currentLocation.origin
        ) {
            return null;
        }

        return resolvedUrl.href;
    } catch (error) {
        void error;
        return null;
    }
}

export function initTopBarControls(scope = window) {
    if (typeof document === 'undefined') return;

    const root = getRoot();
    const body = getBody();
    if (!root) {
        return;
    }

    const darkModeToggle = document.getElementById('darkModeToggle');
    const pinkModeToggle = document.getElementById('pinkModeToggle');
    const languageSelect = document.getElementById('languageSelect');

    if (darkModeToggle && root && body) {
        const darkModeActive = root.classList.contains('dark-mode') || body.classList.contains('dark-mode');
        setAriaPressed(darkModeToggle, darkModeActive);

        // Remove existing listeners if this is a re-init? No, simple addEventListener adds.
        // We'll assume one-time init or idempotent environments.
        // For strict robustness we might want to cloneNode to strip old listeners, 
        // but that breaks references. We'll stick to simple attachment.

        darkModeToggle.onclick = function (event) {
            event.preventDefault();
            const currentlyDark = root.classList.contains('dark-mode') || body.classList.contains('dark-mode');
            const nextDark = !currentlyDark;
            root.classList.toggle('dark-mode', nextDark);
            body.classList.toggle('dark-mode', nextDark);
            root.classList.toggle('light-mode', !nextDark);
            body.classList.toggle('light-mode', !nextDark);
            safeSet('darkMode', nextDark ? 'true' : 'false', scope);
            setAriaPressed(darkModeToggle, nextDark);
            updateThemeColor(nextDark);
        };
    }

    if (pinkModeToggle && root && body) {
        const pinkModeActive = root.classList.contains('pink-mode') || body.classList.contains('pink-mode');
        setAriaPressed(pinkModeToggle, pinkModeActive);

        pinkModeToggle.onclick = function (event) {
            event.preventDefault();
            const currentlyPink = root.classList.contains('pink-mode') || body.classList.contains('pink-mode');
            const nextPink = !currentlyPink;
            root.classList.toggle('pink-mode', nextPink);
            body.classList.toggle('pink-mode', nextPink);
            safeSet('pinkMode', nextPink ? 'true' : 'false', scope);
            setAriaPressed(pinkModeToggle, nextPink);
            if (nextPink) {
                clearAccentStyles(root, body);
            } else {
                refreshAccent(root, body);
            }
        };
    }

    if (languageSelect) {
        const currentValue = languageSelect.getAttribute('data-current-value');
        if (currentValue) {
            languageSelect.value = currentValue;
        }

        languageSelect.onchange = function (event) {
            const target = event.target;
            if (!target) return;
            const selectedOption = target.selectedOptions && target.selectedOptions[0];
            const destination = selectedOption ? selectedOption.value : target.value;
            if (destination) {
                const safeDestination = resolveSafeDestination(destination, scope.location);
                if (safeDestination) {
                    scope.location.assign(safeDestination);
                }
            }
        };
    }

    refreshAccent(root, body);
}
