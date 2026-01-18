/**
 * UI Color Utilities
 * 
 * Helper functions for color parsing and manipulation.
 * Extracted from app-core logic to support modular UI components.
 */

function parseRgbComponent(component) {
    if (typeof component !== 'string') return null;
    const trimmed = component.trim();
    if (!trimmed) return null;
    const numeric = Number.parseFloat(trimmed);
    if (Number.isNaN(numeric)) return null;
    return Math.max(0, Math.min(255, Math.round(numeric)));
}

export function parseColorToRgb(color) {
    if (typeof color !== 'string') return null;
    const trimmed = color.trim();
    if (!trimmed) return null;
    const hexMatch = trimmed.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (hexMatch) {
        const hex = hexMatch[1];
        if (hex.length === 3) {
            return {
                r: Number.parseInt(hex[0] + hex[0], 16),
                g: Number.parseInt(hex[1] + hex[1], 16),
                b: Number.parseInt(hex[2] + hex[2], 16),
            };
        }
        return {
            r: Number.parseInt(hex.slice(0, 2), 16),
            g: Number.parseInt(hex.slice(2, 4), 16),
            b: Number.parseInt(hex.slice(4, 6), 16),
        };
    }
    const rgbMatch = trimmed.match(/^rgba?\(([^)]+)\)$/i);
    if (rgbMatch) {
        const parts = rgbMatch[1].split(',');
        if (parts.length < 3) return null;
        const [r, g, b] = parts;
        const red = parseRgbComponent(r);
        const green = parseRgbComponent(g);
        const blue = parseRgbComponent(b);
        if ([red, green, blue].some(component => component === null)) return null;
        return { r: red, g: green, b: blue };
    }
    return null;
}

export function computeRelativeLuminance(rgb) {
    if (!rgb || typeof rgb !== 'object') return 0;
    const clamp = component => {
        const numeric = Number(component);
        if (!Number.isFinite(numeric)) return 0;
        return Math.min(1, Math.max(0, numeric / 255));
    };
    const transform = value =>
        value <= 0.03928
            ? value / 12.92
            : Math.pow((value + 0.055) / 1.055, 2.4);
    const red = transform(clamp(rgb.r));
    const green = transform(clamp(rgb.g));
    const blue = transform(clamp(rgb.b));
    return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

export function getCssVariableValue(name, fallback = '') {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
        return fallback;
    }
    try {
        const value = window.getComputedStyle(document.documentElement).getPropertyValue(name);
        return value ? value.trim() : fallback;
    } catch {
        return fallback;
    }
}
