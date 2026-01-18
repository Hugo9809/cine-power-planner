/**
 * @fileoverview UTILITY MODULE: Static Theme
 * 
 * Applies static theme preferences (Dark Mode, Pink Mode, Accessibility settings)
 * to pages immediately upon load, preventing flash of incorrect theme.
 * 
 * @module modules/static-theme
 */

const DEFAULT_ACCENT = '#001589';
const HIGH_CONTRAST_ACCENT = '#ffffff';
let storageErrorLogged = false;

function safeGet(key, scope) {
    try {
        if (scope && scope.localStorage) {
            return scope.localStorage.getItem(key);
        }
        if (typeof window !== 'undefined' && window.localStorage) {
            return window.localStorage.getItem(key);
        }
    } catch (err) {
        if (!storageErrorLogged) {
            console.warn('Unable to read localStorage preference', err);
            storageErrorLogged = true;
        }
    }
    return null;
}

function updateThemeColor(isDark, documentObj) {
    if (!documentObj) return;
    const meta = documentObj.querySelector('meta[name="theme-color"]');
    if (meta) {
        meta.setAttribute('content', isDark ? '#1c1c1e' : '#f9f9f9');
    }
}

function applyAccent(color, root, body) {
    if (!root) return;

    const highContrastActive =
        root.classList.contains('high-contrast') ||
        (body && body.classList.contains('high-contrast'));
    const accentValue = highContrastActive ? HIGH_CONTRAST_ACCENT : color;

    root.style.setProperty('--accent-color', accentValue);
    if (highContrastActive) {
        root.style.removeProperty('--link-color');
    } else {
        root.style.setProperty('--link-color', color);
    }
    root.style.setProperty('--logo-background-color', accentValue);
    root.style.setProperty('--logo-accent-color', accentValue);

    if (body) {
        body.style.setProperty('--accent-color', accentValue);
        if (highContrastActive) {
            body.style.removeProperty('--link-color');
        } else {
            body.style.setProperty('--link-color', color);
        }
        body.style.setProperty('--logo-background-color', accentValue);
        body.style.setProperty('--logo-accent-color', accentValue);
    }
}

function resolveThemeVariant({ darkEnabled, pinkEnabled }) {
    if (pinkEnabled) {
        return darkEnabled ? 'pink-dark' : 'pink-light';
    }
    return darkEnabled ? 'dark' : 'light';
}

function applyThemeVariantAttributes(darkEnabled, pinkEnabled, root, body) {
    const theme = resolveThemeVariant({ darkEnabled, pinkEnabled });
    if (root && typeof root.setAttribute === 'function') {
        root.setAttribute('data-theme', theme);
    }
    if (body && typeof body.setAttribute === 'function') {
        body.setAttribute('data-theme', theme);
    }
}

export function applyStaticTheme(scope = window) {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    const body = document.body;

    // High Contrast
    const highContrastEnabled = safeGet('highContrast', scope) === 'true';
    if (root) root.classList.toggle('high-contrast', highContrastEnabled);
    if (body) body.classList.toggle('high-contrast', highContrastEnabled);

    // Reduced Motion
    let storedReduceMotion = safeGet('reduceMotion', scope);
    if (
        storedReduceMotion === null &&
        scope &&
        typeof scope.matchMedia === 'function'
    ) {
        storedReduceMotion = scope.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'true'
            : 'false';
    }
    const reduceMotionEnabled = storedReduceMotion === 'true';
    if (root) root.classList.toggle('reduce-motion', reduceMotionEnabled);
    if (body) body.classList.toggle('reduce-motion', reduceMotionEnabled);

    // Relaxed Spacing
    const relaxedSpacingEnabled = safeGet('relaxedSpacing', scope) === 'true';
    if (root) root.classList.toggle('relaxed-spacing', relaxedSpacingEnabled);
    if (body) body.classList.toggle('relaxed-spacing', relaxedSpacingEnabled);

    // Pink Mode
    let storedPinkMode = safeGet('cameraPowerPlanner_pinkMode', scope);
    if (storedPinkMode === null || storedPinkMode === undefined || storedPinkMode === '') {
        storedPinkMode = safeGet('pinkMode', scope);
    }
    const pinkModeEnabled = storedPinkMode === 'true';
    if (root) root.classList.toggle('pink-mode', pinkModeEnabled);
    if (body) body.classList.toggle('pink-mode', pinkModeEnabled);

    // Font Size
    const storedFontSize = safeGet('fontSize', scope);
    if (storedFontSize && root) {
        root.style.fontSize = storedFontSize + 'px';
    }

    // Font Family
    const storedFontFamily = safeGet('fontFamily', scope);
    if (storedFontFamily && root) {
        root.style.setProperty('--font-family', storedFontFamily);
    }

    // Dark Mode
    let storedDarkMode = safeGet('darkMode', scope);
    if (storedDarkMode === null && scope && typeof scope.matchMedia === 'function') {
        storedDarkMode = scope.matchMedia('(prefers-color-scheme: dark)').matches ? 'true' : 'false';
    }
    const darkModeEnabled = storedDarkMode === 'true';
    if (root) {
        root.classList.toggle('dark-mode', darkModeEnabled);
        root.classList.toggle('light-mode', !darkModeEnabled);
    }
    if (body) {
        body.classList.toggle('dark-mode', darkModeEnabled);
        body.classList.toggle('light-mode', !darkModeEnabled);
    }
    updateThemeColor(darkModeEnabled, document);
    applyThemeVariantAttributes(darkModeEnabled, pinkModeEnabled, root, body);

    // Accent Color
    const storedAccent = safeGet('accentColor', scope);
    const accentColor = storedAccent || DEFAULT_ACCENT;
    if (pinkModeEnabled) {
        if (root) {
            root.style.removeProperty('--accent-color');
            root.style.removeProperty('--link-color');
            root.style.removeProperty('--logo-background-color');
            root.style.removeProperty('--logo-accent-color');
        }
        if (body) {
            body.style.removeProperty('--accent-color');
            body.style.removeProperty('--link-color');
            body.style.removeProperty('--logo-background-color');
            body.style.removeProperty('--logo-accent-color');
        }
    } else {
        applyAccent(accentColor, root, body);
    }
}
