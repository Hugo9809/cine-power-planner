/**
 * Cine Power Planner Icon Helpers
 *
 * Pure ESM module for managing icon glyphs and SVG markup.
 * Provides utilities for resolving icon fonts, formatting SVG coordinates,
 * and applying glyphs to DOM elements.
 *
 * @module helpers/icons
 * @see {@link ../runtime-environment.js} for the aggregate API
 * @see {@link ../../docs/dev/architecture/runtime-environment.md} for architecture docs
 *
 * Extracted from app-core-environment.js during Vite migration (Step 24).
 */

/**
 * Creates the fallback map of icon font keys.
 * @returns {object} The frozen icon font keys map.
 */
export function createFallbackIconFontKeys() {
    return Object.freeze({
        ESSENTIAL: 'essential',
        FILM: 'film',
        GADGET: 'gadget',
        UICONS: 'uicons',
        TEXT: 'text',
    });
}

/**
 * Formats a coordinate for SVG usage (rounded to 2 decimal places).
 * @param {number} value - The coordinate value.
 * @returns {string} The formatted string (e.g., "10.5").
 */
export function formatSvgCoordinate(value) {
    if (!Number.isFinite(value)) return '0';
    const rounded = Math.round(value * 100) / 100;
    if (Number.isInteger(rounded)) return String(rounded);
    return rounded.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
}

/**
 * Wraps SVG markup with positioning attributes.
 * @param {string} markup - The inner SVG markup (path, etc.).
 * @param {number} centerX - The X center coordinate.
 * @param {number} centerY - The Y center coordinate.
 * @param {number} [size=24] - The size of the icon.
 * @returns {object} { markup, x, y }
 */
export function positionSvgMarkup(markup, centerX, centerY, size = 24) {
    if (typeof markup !== 'string') {
        return {
            markup: '',
            x: '0',
            y: '0',
        };
    }

    const trimmed = markup.trim();
    if (!trimmed) {
        return {
            markup: '',
            x: '0',
            y: '0',
        };
    }

    const half = size / 2;
    const x = formatSvgCoordinate(centerX);
    const y = formatSvgCoordinate(centerY);
    const width = formatSvgCoordinate(size);
    const height = formatSvgCoordinate(size);

    const cleaned = trimmed.replace(/<svg\b([^>]*)>/i, (match, attrs = '') => {
        let attrText = attrs.replace(/\s+x\s*=\s*"[^"]*"/gi, '').replace(/\s+y\s*=\s*"[^"]*"/gi, '').trim();
        const additions = [];
        const hasWidth = /(?:^|\s)width\s*=/i.test(attrText);
        const hasHeight = /(?:^|\s)height\s*=/i.test(attrText);
        if (!hasWidth) additions.push(`width="${width}"`);
        if (!hasHeight) additions.push(`height="${height}"`);
        additions.push(`x="-${formatSvgCoordinate(half)}"`);
        additions.push(`y="-${formatSvgCoordinate(half)}"`);
        attrText = [attrText].concat(additions).filter(Boolean).join(' ').trim();
        return attrText ? `<svg ${attrText}>` : '<svg>';
    });

    return {
        markup: cleaned,
        x,
        y,
    };
}


function toCodePointChar(value, radix) {
    const codePoint = parseInt(value, radix);
    if (!Number.isFinite(codePoint) || codePoint < 0) {
        return null;
    }

    try {
        if (typeof String.fromCodePoint === 'function') {
            return String.fromCodePoint(codePoint);
        }
    } catch (rangeError) {
        void rangeError;
    }

    if (codePoint <= 0xffff) {
        return String.fromCharCode(codePoint);
    }

    return null;
}

function normalizeGlyphChar(char) {
    if (typeof char !== 'string') {
        return '';
    }

    const trimmed = char.trim();
    if (!trimmed) {
        return '';
    }

    // Unicode escape \uXXXX
    const unicodeMatch = trimmed.match(/^(?:\\)+u([0-9A-Fa-f]{4})$/);
    if (unicodeMatch) {
        const decoded = toCodePointChar(unicodeMatch[1], 16);
        if (decoded) {
            return decoded;
        }
    }

    // Unicode escape \u{XXXXX}
    const unicodeBraceMatch = trimmed.match(/^(?:\\)+u\{([0-9A-Fa-f]+)\}$/);
    if (unicodeBraceMatch) {
        const decoded = toCodePointChar(unicodeBraceMatch[1], 16);
        if (decoded) {
            return decoded;
        }
    }

    // Hex entity &#xXXXX;
    const hexEntityMatch = trimmed.match(/^&#x([0-9A-Fa-f]+);$/i);
    if (hexEntityMatch) {
        const decoded = toCodePointChar(hexEntityMatch[1], 16);
        if (decoded) {
            return decoded;
        }
    }

    // Decimal entity &#DDD;
    const decimalEntityMatch = trimmed.match(/^&#(\d+);$/);
    if (decimalEntityMatch) {
        const decoded = toCodePointChar(decimalEntityMatch[1], 10);
        if (decoded) {
            return decoded;
        }
    }

    return trimmed;
}

/**
 * Resolves an icon glyph object into a standardized format.
 * @param {object|string} glyph - The raw glyph input.
 * @returns {object} Standardized glyph object { char, font, className, markup?, size? }.
 */
export function resolveIconGlyph(glyph) {
    const ICON_FONT_KEYS = createFallbackIconFontKeys();
    const validFonts = new Set(Object.values(ICON_FONT_KEYS).filter(Boolean));
    const fallbackFont = ICON_FONT_KEYS.UICONS;

    if (!glyph) {
        return {
            char: '',
            font: fallbackFont,
            className: '',
        };
    }

    if (glyph.markup) {
        const size = Number.isFinite(glyph.size) ? glyph.size : undefined;
        return {
            markup: glyph.markup,
            className: glyph.className || '',
            font: fallbackFont,
            size,
        };
    }

    if (typeof glyph === 'string') {
        return {
            char: normalizeGlyphChar(glyph),
            font: fallbackFont,
            className: '',
        };
    }

    if (typeof glyph === 'object') {
        const char = typeof glyph.char === 'string' ? normalizeGlyphChar(glyph.char) : '';
        // Allow any string as font, falling back to default if empty or invalid type
        const fontKey = (glyph.font && typeof glyph.font === 'string') ? glyph.font : fallbackFont;
        const className = typeof glyph.className === 'string' ? glyph.className : '';
        const size = Number.isFinite(glyph.size) ? glyph.size : undefined;

        if (glyph.markup) {
            return {
                markup: glyph.markup,
                className,
                font: fontKey,
                size,
            };
        }

        return {
            char,
            font: fontKey,
            className,
            size,
        };
    }

    return {
        char: '',
        font: fallbackFont,
        className: '',
    };
}

/**
 * Applies a glyph to a DOM element.
 * @param {HTMLElement} element - The target element.
 * @param {object|string} glyph - The glyph to apply.
 */
export function applyIconGlyph(element, glyph) {
    if (!element) return;
    const resolved = resolveIconGlyph(glyph);

    if (resolved && resolved.markup) {
        // Basic assurance that SVG has aria-hidden if not present
        // Simple regex check to avoid full parsing overhead in this tight loop
        let markup = resolved.markup;
        if (!markup.includes('aria-hidden')) {
            markup = markup.replace('<svg', '<svg aria-hidden="true"');
        }

        element.innerHTML = markup;
        if (!markup.includes('aria-hidden')) {
            element.setAttribute('aria-hidden', 'true');
        }

        if (resolved.className && element.classList) {
            resolved.className.split(/\s+/).filter(Boolean).forEach(cls => element.classList.add(cls));
        }
        element.removeAttribute('data-icon-font');
        return;
    }

    const char = (resolved && resolved.char) || '';
    element.textContent = char;
    if (char) {
        element.setAttribute('data-icon-font', resolved.font || 'uicons');
    } else {
        element.removeAttribute('data-icon-font');
    }
}
